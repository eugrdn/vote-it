import {fingerprint} from './fingerprint';
import {Firebase} from '../Firebase';
import * as Models from '~/typings/models';

type AdditionalInfo = {
  displayName: string;
  polls: Models.CustomUser['polls'];
};

export class Auth {
  constructor(private firebase: Firebase, private _signing = false) {}

  onAuthStateChanged = this.firebase.auth.onAuthStateChanged.bind(this.firebase.auth);

  // TODO: sync if previously user was signed not anonymously
  async signupAnonymously() {
    const customUser = await this.getAnonymousUser();

    await this.signout();

    const credentials = await this.firebase.auth.signInAnonymously();
    if (credentials.user) {
      await this.saveCustomUser(credentials.user.uid, customUser);
    }
    if (customUser) {
      await this.firebase.firestore
        .collection('users')
        .doc(customUser.id)
        .delete();
    }
  }

  async signup(email: string, password: string, {displayName}: AdditionalInfo) {
    this.signing = true;

    const existedUser = this.getFirebaseUser();
    const anonymous = await this.getAnonymousUser();

    const user: Partial<Models.User> = {
      ...existedUser,
      ...anonymous,
    };

    await this.signout();

    const credentials = await this.firebase.auth.createUserWithEmailAndPassword(email, password);
    if (credentials.user) {
      await Promise.all([
        this.saveCustomUser(credentials.user.uid, user),
        credentials.user.updateProfile({displayName}),
        this.firebase.firestore
          .collection('users')
          .doc(user.id)
          .delete(),
      ]);
    }

    this.signing = false;
  }

  async signout() {
    return this.firebase.auth.signOut();
  }

  async login(email: string, password: string) {
    return await this.firebase.auth.signInWithEmailAndPassword(email, password);
  }

  async getSignedUser(id: string, isAnonymous: boolean): Promise<Models.User | undefined> {
    const customUser = isAnonymous ? await this.getAnonymousUser() : await this.getCustomUser(id);
    const firebaseUser = this.getFirebaseUser();
    if (customUser && firebaseUser) {
      return {...customUser, ...firebaseUser};
    }
    return undefined;
  }

  set signing(status: boolean) {
    this._signing = status;
  }

  get signing() {
    return this._signing;
  }

  private getFirebaseUser(): Models.FirebaseUser | undefined {
    return this.firebase.auth.currentUser || undefined;
  }

  private async getCustomUser(id: string) {
    return await this.firebase.getQueryValue<Models.CustomUser>(fs =>
      fs.collection('users').doc(id),
    );
  }

  private async getAnonymousUser(tries = 1): Promise<Models.CustomUser | undefined> {
    const murmur = await this.getOrCreateFingerprint();
    if (murmur) {
      const [user] = await this.firebase.getQueryValue<Models.CustomUser[]>(fs =>
        fs
          .collection('users')
          .where('fingerprint', '==', murmur)
          .limit(1),
      )!;

      return !user && tries < 2 ? await this.getAnonymousUser(tries + 1) : user; // TODO: remove hack
    }
    return undefined;
  }

  private async getOrCreateFingerprint() {
    const stored = sessionStorage.getItem('fingerprint');
    if (stored) {
      return stored;
    }

    const murmur = await fingerprint();
    if (murmur) {
      sessionStorage.setItem('fingerprint', murmur);
      return murmur;
    }

    return Promise.reject();
  }

  private async saveCustomUser(id: string, user?: Partial<Models.CustomUser>) {
    const userRef = this.firebase.firestore.collection('users').doc(id);
    await userRef.set({
      id,
      ...(await this.persistDataBetweenUsers(user)),
    } as Models.CustomUser);
  }

  private async persistDataBetweenUsers(
    data?: Partial<Models.CustomUser>,
  ): Promise<Partial<Models.CustomUser>> {
    return {
      fingerprint: (data && data.fingerprint) || (await this.getOrCreateFingerprint()),
      polls: (data && data.polls) || {created: [], part: []},
      votes: (data && data.votes) || {},
    };
  }
}

import {fingerprint} from './fingerprint';
import {Firebase} from '../Firebase';
import * as Models from '~/typings/models';

type AdditionalInfo = {
  displayName: string;
  polls: Models.CustomUser['polls'];
};

export class Auth {
  constructor(private firebase: Firebase) {}

  private signing = false;

  onAuthStateChanged = this.firebase.auth.onAuthStateChanged.bind(this.firebase.auth);

  // TODO: sync if previously user was signed not anonymously
  async signupAnonymously() {
    const user = await this.getAnonymousUser();

    await this.signout();

    const credentials = await this.firebase.auth.signInAnonymously();
    if (credentials.user) {
      await this.saveCustomUser(credentials.user.uid, user);
    }

    if (user) {
      await this.firebase.database.ref(`users/${user.id}`).remove();
    }
  }

  async signup(email: string, password: string, {displayName}: AdditionalInfo) {
    this.setSigning(true);

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
        this.firebase.database.ref(`users/${user.id}`).remove(),
      ]);
    }

    this.setSigning(false);
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

  setSigning(status: boolean) {
    this.signing = status;
  }

  getSigning() {
    return this.signing;
  }

  private getFirebaseUser(): Models.FirebaseUser | undefined {
    return this.firebase.auth.currentUser || undefined;
  }

  private async getCustomUser(id: string) {
    return this.firebase.getPathValueOnce<Models.CustomUser>(`/users/${id}`);
  }

  private async getAnonymousUserRef(murmur: string) {
    // TODO: change for optimized query after migration to Firestore
    const users = await this.firebase.getPathValueOnce<Models.CustomUsers>('/users');
    if (users) {
      const anonUser = Object.values(users).find(v => v.fingerprint === murmur);
      if (anonUser) {
        return this.firebase.database.ref('/users').child(anonUser.id).ref;
      }
    }
    return undefined;
  }

  private async getAnonymousUser(tries = 1): Promise<Models.CustomUser | undefined> {
    const murmur = await this.getOrCreateFingerprint();
    if (murmur) {
      const userWithFingerprintRef = await this.getAnonymousUserRef(murmur);
      if (userWithFingerprintRef) {
        const value = await this.firebase.getRefValueOnce<Models.CustomUser>(
          userWithFingerprintRef,
        );
        return !value && tries < 2 ? await this.getAnonymousUser(tries++) : value; // TODO: remove hack
      }
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
    const userRef = this.firebase.database.ref('users').child(id);
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

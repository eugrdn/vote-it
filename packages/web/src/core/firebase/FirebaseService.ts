import Firebase from 'firebase/app';
import {config} from './config';
import * as Models from '~/typings/models';
import {getOrCreateFingerprint} from '~/utils/fingerprint';

export type Error = firebase.FirebaseError;
export class FirebaseService {
  public auth: Firebase.auth.Auth;
  public firestore: Firebase.firestore.Firestore;

  constructor(firebase: typeof Firebase) {
    const appInitialized = firebase.apps.length;
    const app = appInitialized ? firebase.app() : firebase.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();
  }

  getFirebaseUser(): Maybe<Models.FirebaseUser> {
    return this.auth.currentUser || undefined;
  }

  async getUser(): Promise<Maybe<Models.User>> {
    const firebaseUser = this.getFirebaseUser();
    if (firebaseUser) {
      const {uid, isAnonymous} = firebaseUser;
      const customUser = isAnonymous
        ? await this.getCustomUserByFingerprint()
        : await this.getCustomUserById(uid);

      if (customUser) {
        return {...customUser, ...firebaseUser};
      }
    }
    return undefined;
  }

  async getCustomUserByFingerprint(tries = 1): Promise<Maybe<Models.CustomUser>> {
    const murmur = await getOrCreateFingerprint();
    if (murmur) {
      const data = await this.getQueryValue<Models.CustomUser[]>(fs =>
        fs
          .collection('users')
          .where('fingerprint', '==', murmur)
          .limit(1),
      );
      const user = data && data[0];

      return !user && tries < 2 ? await this.getCustomUserByFingerprint(tries + 1) : user; // TODO: remove hack (return user)
    }
    return undefined;
  }

  async getCustomUserById(id: string) {
    return await this.getQueryValue<Models.CustomUser>(fs => fs.collection('users').doc(id));
  }

  async createCustomUser(
    {uid: id, isAnonymous}: Models.FirebaseUser,
    prevUser?: Partial<Models.CustomUser>,
  ) {
    const prevAnonUser = prevUser && prevUser.isAnonymous;
    await this.firestore
      .collection('users')
      .doc(id)
      .set({
        id,
        isAnonymous,
        fingerprint: isAnonymous
          ? (prevAnonUser && prevUser!.fingerprint) || (await getOrCreateFingerprint())
          : null,
        polls: (prevAnonUser && prevUser!.polls) || {created: [], part: []},
        votes: (prevAnonUser && prevUser!.votes) || {},
      } as Models.CustomUser);
  }

  async deleteUser(id: string) {
    await this.firestore
      .collection('users')
      .doc(id)
      .delete();
  }

  async getQueryValue<T>(
    querySelector: (
      firestore: Firebase.firestore.Firestore,
    ) => Firebase.firestore.Query | Firebase.firestore.DocumentReference,
  ): Promise<T extends Array<any> ? Maybe<T | []> : Maybe<T>> {
    const snapshot = await querySelector(this.firestore).get();
    return this.getSnapshotData(snapshot);
  }

  getSnapshotData<T = any>(
    snapshot: Firebase.firestore.DocumentSnapshot | Firebase.firestore.QuerySnapshot,
  ): T {
    if ('docs' in snapshot) {
      return (snapshot.docs.map(v => v.data()) as any) || undefined;
    }
    return (snapshot.data() as any) || undefined;
  }

  path(...props: string[]) {
    return new Firebase.firestore.FieldPath(...props);
  }
}

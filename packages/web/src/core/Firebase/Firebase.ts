import firebase, {auth, firestore} from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {config} from './config';
import {Maybe} from '~/typings/common';

export class Firebase {
  public auth: auth.Auth;
  public firestore: firestore.Firestore;

  constructor() {
    const appInitialized = firebase.apps.length;
    const app = appInitialized ? firebase.app() : firebase.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();
  }

  path(...props: string[]) {
    return new firestore.FieldPath(...props);
  }

  async getQueryValue<T>(
    querySelector: (
      firestore: firestore.Firestore,
    ) => firestore.Query | firestore.DocumentReference,
  ): Promise<T extends Array<any> ? T | [] : Maybe<T>> {
    const snapshot = await querySelector(this.firestore).get();
    return this.getSnapshotData(snapshot);
  }

  getSnapshotData<T = any>(snapshot: firestore.DocumentSnapshot | firestore.QuerySnapshot): T {
    if ('docs' in snapshot) {
      return snapshot.docs.map(v => v.data()) as any;
    }
    return snapshot.data() as any;
  }
}

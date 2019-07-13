import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {config} from './config';

export class Firebase {
  public auth: firebase.auth.Auth;
  public database: firebase.database.Database;

  constructor() {
    const appInitialized = firebase.apps.length;
    const app = appInitialized ? firebase.app() : firebase.initializeApp(config);

    this.auth = app.auth();
    this.database = app.database();
  }

  async getPathValueOnce<T>(path: string) {
    return await this.getRefValueOnce<T>(this.database.ref(path));
  }

  async getRefValueOnce<T>(ref: firebase.database.Reference | firebase.database.Query) {
    try {
      const snapshot = await ref.once('value');
      const value = await snapshot.val();
      return value as T;
    } catch (error) {
      console.error(error.message);
    }
    return undefined;
  }
}

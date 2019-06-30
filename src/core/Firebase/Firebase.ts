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
}

export default Firebase;

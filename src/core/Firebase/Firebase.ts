import app from 'firebase';
import {config} from './config';

export class Firebase {
  public auth: app.auth.Auth;
  public database: app.database.Database;

  constructor() {
    const appInitialized = app.apps.length;
    const firebase = appInitialized ? app.app() : app.initializeApp(config);

    this.auth = firebase.auth();
    this.database = firebase.database();
  }
}

export default Firebase;

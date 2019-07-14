import admin from 'firebase-admin';
import {database} from 'firebase-functions';

export default database
  .ref('/users/{uid}')
  .onDelete((_, context) => admin.auth().deleteUser(context.params.uid));

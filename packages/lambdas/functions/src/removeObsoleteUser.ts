import admin from 'firebase-admin';
import {firestore} from 'firebase-functions';

export default firestore
  .document('users/{uid}')
  .onDelete((_, context) => admin.auth().deleteUser(context.params.uid));

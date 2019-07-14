import admin from 'firebase-admin';

const serviceAccountKey = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
  databaseURL: 'https://voteit-app.firebaseio.com',
});

import removeObsoleteUser from './removeObsoleteUser';

export {removeObsoleteUser};

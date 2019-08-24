import admin from 'firebase-admin';

const projectId = process.env.GCLOUD_PROJECT;

admin.initializeApp({
  credential: admin.credential.cert(require(`../../${projectId}-keys.json`)),
  databaseURL: `https://${projectId}.firebaseio.com`,
});

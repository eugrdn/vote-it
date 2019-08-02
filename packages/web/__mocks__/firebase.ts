import firebasemock from 'firebase-mock';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const mockAuth = new firebasemock.MockAuthentication();
const mockFirestore = new firebasemock.MockFirestore();

export const mockFirebase: firebase.app.App = new firebasemock.MockFirebaseSdk(
  null,
  () => mockAuth,
  () => mockFirestore,
  null,
  null,
);

mockAuth.autoFlush();
mockFirestore.autoFlush();

export default mockFirebase;

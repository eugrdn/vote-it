import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {AuthService} from './auth';
import {FirebaseService} from './firebase';

export * from './auth';
export * from './firebase';

const firebase = new FirebaseService(firebaseApp);
const auth = new AuthService(firebase);

export {firebase, auth};

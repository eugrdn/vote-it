import {AuthService} from './auth';
import {FirebaseService} from './firebase';

export * from './auth';
export * from './firebase';

const firebase = new FirebaseService();
const auth = new AuthService(firebase);

export {firebase, auth};

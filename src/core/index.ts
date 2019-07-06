import {Auth} from './Auth';
import {Firebase} from './Firebase';

export * from './Auth';
export * from './Firebase';

const firebase = new Firebase();
const auth = new Auth(firebase);
export {firebase, auth};

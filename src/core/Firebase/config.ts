
import {Env} from '~/utils';

export const config = {
  apiKey: Env.getPublicVar('apiKey'),
  authDomain: Env.getPublicVar('authDomain'),
  databaseURL: Env.getPublicVar('databaseURL'),
  projectId: Env.getPublicVar('projectId'),
  storageBucket: Env.getPublicVar('storageBucket'),
  messagingSenderId: Env.getPublicVar('messagingSenderId'),
};

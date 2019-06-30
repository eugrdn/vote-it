import {Env} from '~/utils';

export const config = {
  apiKey: Env.getPublicRuntimeVariable('API_KEY'),
  authDomain: Env.getPublicRuntimeVariable('AUTH_DOMAIN'),
  databaseURL: Env.getPublicRuntimeVariable('DATABASE_URL'),
  projectId: Env.getPublicRuntimeVariable('PROJECT_ID'),
  storageBucket: Env.getPublicRuntimeVariable('STORAGE_BUCKET'),
  messagingSenderId: Env.getPublicRuntimeVariable('MESSAGING_SENDER_ID'),
};

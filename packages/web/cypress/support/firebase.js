import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {attachCustomCommands} from 'cypress-firebase';
import config from './firebase.config.json';

firebase.initializeApp(config);

attachCustomCommands({Cypress, cy, firebase});

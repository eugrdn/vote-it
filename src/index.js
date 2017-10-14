import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware
} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import registerServiceWorker from './registerServiceWorker';
import state from './state';
import router from './router';
import {
  setState,
  setClientId,
  authorizer
} from './actions/vote-it.actions';
import {getClientId} from './utils/utils';
import './index.css';

const socket = io(`${window.location.protocol}//${window.location.hostname}:8080`);

const store = createStore(
  state,
  applyMiddleware(authorizer(socket))
);

socket.on('state', (state) => 
  store.dispatch(setState(state)));

store.dispatch(setClientId(getClientId()));

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('root')
);
registerServiceWorker();

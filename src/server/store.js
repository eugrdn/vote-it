const createStore = require('redux').createStore;
const state = require('./reducer');

module.exports = createStore(state);

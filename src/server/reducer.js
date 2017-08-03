const core = require('./core');

function reducer(state = {}, action) {
  switch (action.type) {
    case 'init_state':
      return core.initState(action.payload);
    case 'vote':
      return core.vote(state, action.payload, action.clientId);
    default:
      return state;
  }
}

module.exports = reducer;
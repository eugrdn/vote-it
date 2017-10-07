const core = require('./core');

function reducer(state = {}, action) {
  switch (action.type) {
    case 'init_state':
      return core.initState(action.payload);
    case 'vote':
      returnSet = core.vote(state, action.payload, action.clientId);

      /** Some debugging statements to understand the working of changeset
      console.log(returnSet);
      console.log(state);
      console.log("==========");
      */

      // merge changes from returnSet into state
      Object.keys(returnSet.topics).map(key => {
        state.topics[key].votes += returnSet.topics[key].votes;
      });
      /** Some debugging statements to understand the working of changeset
      console.log(state);
      console.log("==========");
      */
      returnSet.voters.forEach(voter => {
        voterId = voter.id;
        const stateVoter = state.voters.find(stateVoter => stateVoter.id === voterId);

        if (!stateVoter) {
          state.voters.push(voter)
        }
        else {
          stateVoter.vote = voter.vote;
        }

      });
      /** Some debugging statements to understand the working of changeset
      console.log(state);
      console.log("==========\n\n");
      */
      return state;
    default:
      return state;
  }
}

module.exports = reducer;

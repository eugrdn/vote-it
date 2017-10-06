import {
  SET_STATE,
  SET_CLIENT_ID,
  VOTE
} from './actions/vote-it.actions';

function reducer(state = { topics: {}, client: {} }, action) {
  switch (action.type) {
    case SET_STATE:
      return {
        ...state,
        topics: { ...action.payload.topics },
        voters: [ ...action.payload.voters ]
      };
    case SET_CLIENT_ID:
      return { ...state, client: { id: action.payload } };
    case VOTE:
      return {
        ...state,
        topics: {
          ...state.topics,
          [action.payload]: { title: state.topics[action.payload].title, votes: state.topics[action.payload].votes++ }
        },
        client: {
          ...state.client,
          vote: action.payload
        }
      };
    default:
      return state;
  }
}

export default reducer;
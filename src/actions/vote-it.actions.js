export const SET_STATE = 'set_state';
export const setState = state => ({
  type: SET_STATE,
  payload: state
});

export const SET_CLIENT_ID = 'set_client_id';
export const setClientId = clientId => ({
  type: SET_CLIENT_ID,
  payload: clientId
});

export const VOTE = 'vote';
export const vote = topicId => ({
  type: VOTE,
  payload: topicId,
  remote: true
});

export const authorizer = socket => store => next => action => {
  if (action.remote) {
    const clientId = store.getState().client.id;
    socket.emit('action', {...action, clientId});
  }
  return next(action);
};

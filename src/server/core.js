function initState(topics) {
  return { topics: initTopics(topics), voters: [] };
}

function initTopics(topics) {
  return topics.reduce((prev, curr, index) => {
    prev[index + 1] = { title: curr, votes: 0 };
    return prev;
  }, {});
}

// return a changeset to merge with state
function vote(state, topicId, voterId) {
  returnSet = {'topics': {}, 'voters': []}
  const voter = state.voters.find(voter => voter.id === voterId);
  if (!voter) {

    if (!(topicId in returnSet.topics))
      returnSet.topics[topicId] = {'votes': state.topics[topicId].votes};

    returnSet.topics[topicId].votes++;
    returnSet.voters.push({ id: voterId, vote: topicId });
  } else if (voter.vote !== topicId) {
    returnSet = revote(state, topicId, voter.vote);
    returnSet.voters.push({ id: voterId, vote: topicId });
  }
  return returnSet;
}

// return a changeset to merge with state
function revote(state, currTopicId, prevTopicId) {
  returnSet = {'topics': {}, 'voters': []}
  Object.keys(state.topics).map(key => {

    if (!(key in returnSet.topics))
      returnSet.topics[key] = {'votes': 0};

    if (key === currTopicId) {
      returnSet.topics[key].votes++;
    } else if (key === prevTopicId) {
      returnSet.topics[key].votes--;
    }
  });
  return returnSet;
}

module.exports = {
  initState: initState,
  vote: vote
};

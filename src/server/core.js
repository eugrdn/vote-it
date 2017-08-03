function initState(topics) {
  return { topics: initTopics(topics), voters: [] };
}

function initTopics(topics) {
  return topics.reduce((prev, curr, index) => {
    prev[index + 1] = { title: curr, votes: 0 };
    return prev;
  }, {});
}

function vote(state, topicId, voterId) {
  const voter = state.voters.find(voter => voter.id === voterId);
  if (!voter) {
    state.topics[topicId].votes++;
    state.voters.push({ id: voterId, vote: topicId });
  } else if (voter.vote !== topicId) {
    revote(state, topicId, voter.vote);
    voter.vote = topicId;
  }
  return state;
}

function revote(state, currTopicId, prevTopicId) {
  Object.keys(state.topics).map(key => {
    if (key === currTopicId) {
      state.topics[key].votes++;
    } else if (key === prevTopicId) {
      state.topics[key].votes--;
    }
  });
}

module.exports = {
  initState: initState,
  vote: vote
};
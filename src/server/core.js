function nextState(prevState, topics = [], voters = []) {
  return {...prevState, topics, voters};
}

function initState(topics) {
  return nextState({}, initTopics(topics));
}

function initTopics(topics) {
  return topics.reduce(
    (prev, curr, index) => ({...prev, [index + 1]: {title: curr, votes: 0}}),
    {}
  );
}

function vote(state, topicId, voterId) {
  const voter = state.voters.find(voter => voter.id === voterId);
  let topics, voters;

  if (!voter) {
    topics = {
      ...state.topics,
      [topicId]: {
        ...state.topics[topicId],
        votes: state.topics[topicId].votes + 1
      }
    };
    voters = state.voters.concat({id: voterId, vote: topicId});
  } else if (voter.vote !== topicId) {
    topics = revote(state.topics, topicId, voter.vote);
    voters = state.voters.map(v =>
      (v === voter ? {...voter, vote: topicId} : v));
  }

  return nextState(state, topics, voters);
}

function revote(topics, currTopicId, prevTopicId) {
  return {
    ...topics,
    [currTopicId]: {
      ...topics[currTopicId],
      votes: topics[currTopicId].votes + 1
    },
    [prevTopicId]: {
      ...topics[prevTopicId],
      votes: topics[prevTopicId].votes - 1
    }
  };
}

module.exports = {initState, vote};

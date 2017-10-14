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
    const topics = Object.assign({}, state.topics, {
      [topicId]: Object.assign({}, state.topics[topicId], {
        votes: state.topics[topicId].votes + 1,
      }),
    });

    const voters = state.voters.concat({
      id: voterId,
      vote: topicId,
    });

    return Object.assign({}, state, {
      topics,
      voters,
    })
  } else if (voter.vote !== topicId) {
    return Object.assign({}, state, {
      topics: revote(state.topics, topicId, voter.vote),
      voters: state.voters.map(i => (i === voter)
        ? Object.assign({}, voter, { vote: topicId })
        : i
      ),
    })
  }
  return state;
}

function revote(topics, currTopicId, prevTopicId) {
  return Object.assign({}, topics, {
    [currTopicId]: Object.assign({}, topics[currTopicId], {
      votes: topics[currTopicId].votes + 1,
    }),
    [prevTopicId]: Object.assign({}, topics[prevTopicId], {
      votes: topics[prevTopicId].votes - 1,
    })
  })
}

module.exports = {
  initState: initState,
  vote: vote
};
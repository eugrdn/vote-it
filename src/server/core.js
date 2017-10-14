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
    return Object.assign({}, revote(state, topicId, voter.vote), {
      voters: state.voters.map(i => {
        if (i === voter) {
          return Object.assign({}, voter, {
            vote: topicId,
          });
        }

        return i;
      })
    })
  }
  return state;
}

function revote(state, currTopicId, prevTopicId) {
  const topics = Object.assign({}, state.topics, {
    [currTopicId]: Object.assign({}, state.topics[currTopicId], {
      votes: state.topics[currTopicId].votes + 1,
    }),
    [prevTopicId]: Object.assign({}, state.topics[prevTopicId], {
      votes: state.topics[prevTopicId].votes - 1,
    })
  });

  return Object.assign({}, state, {
    topics,
  });
}

module.exports = {
  initState: initState,
  vote: vote
};
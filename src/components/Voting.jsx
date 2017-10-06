import React from 'react';
import { connect } from 'react-redux';

import { vote } from '../actions/vote-it.actions';

const VoteBtn = ({ id, vote, title, hasVoted, topicsCount }) =>
  <button className='vote__btn' disabled={hasVoted} onClick={() => vote(id)}>{`${title}`}</button>;

const VotingContainer = props => (
  <div id="fullscreen-wrapper">
    <div className='voting'>
      {Object.keys(props.topics).map((id, index) => {
        const topic = props.topics[id];
        const voterInfo = props.voters
          .filter(x => x.id === props.client.id)[0]
        let hasVoted = false;
        if (voterInfo) {
          hasVoted = voterInfo.vote === id
        }
        return <VoteBtn key={topic.title + index} id={id} hasVoted={hasVoted} vote={props.vote} title={hasVoted ? topic.title + '!' : topic.title} />;
      })}
    </div>
  </div>
);

export default connect(state => ({
  topics: state.topics,
  client: state.client,
  voters: state.voters,
}), dispatch => ({
  vote: topicId => dispatch(vote(topicId))
}))(VotingContainer);

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
        const hasVoted = props.clientVote === id;
        return <VoteBtn key={topic.title + index} id={id} hasVoted={hasVoted} vote={props.vote} title={hasVoted ? topic.title + '!' : topic.title} />;
      })}
    </div>
  </div>
);

export default connect(state => ({
  topics: state.topics,
  clientVote: state.client.vote
}), dispatch => ({
  vote: topicId => dispatch(vote(topicId))
}))(VotingContainer);

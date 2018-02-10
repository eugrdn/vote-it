import React from 'react';
import {connect} from 'react-redux';
import {vote} from '../../actions/vote-it.actions';

const VoteBtn = ({id, vote, title, hasVoted, topicsCount}) => (
  <button className="vote__btn" onClick={() => vote(id)} disabled={hasVoted}>
    {title}
  </button>
);

const VotingPage = props => (
  <div id="fullscreen-wrapper">
    <div className="voting">
      {Object.keys(props.topics).map((id, index) => {
        const topic = props.topics[id];
        const voterInfo = props.voters.find(x => x.id === props.client.id);
        const hasVoted = voterInfo && voterInfo.vote === id;

        return (
          <VoteBtn
            key={topic.title + index}
            id={id}
            hasVoted={hasVoted}
            vote={props.vote}
            title={hasVoted ? topic.title + '!' : topic.title}
          />
        );
      })}
    </div>
  </div>
);

export default connect(
  ({topics, client, voters}) => ({topics, client, voters}),
  dispatch => ({vote: topicId => dispatch(vote(topicId))})
)(VotingPage);

import React from 'react';
import { connect } from 'react-redux';

const ResultsContainer = props => (
  <div className='voting-result'>
    <h4 className='voting-title'>Here are the results!</h4>
    <br />
    <ul className='voting-list' style={{ listStyleType: 'none', listStylePosition: 'inside' }}>
      {props.topics.map(({ title, votes }) => <li className='voting-item' key={title}>{`${title}:`} <b>{calcPercent(votes, props.votesSum)}%</b></li>)}
    </ul>
    <small className='all-votes'>Total : <b>{`${props.votesSum}`}</b></small>
  </div>
);

const calcPercent = (curr, all) => curr ? (curr / all).toPrecision(2) * 100 : 0;

const allVotesSelector = topics => {
  return topics.reduce((prev, curr) => {
    return prev + curr.votes
  }, 0);
}

const mapStateToProps = ({ topics }) => {
  const values = Object.values(topics);
  return {
    topics: values,
    votesSum: allVotesSelector(values)
  };
}

export default connect(mapStateToProps)(ResultsContainer);

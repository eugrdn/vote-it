import styled from 'styled-components';

export const VoteButton = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  color: #fff;
  font-size: 3em;
  cursor: pointer;

  :nth-child(odd) {
    background-color: #482979;
  }

  :nth-child(even):active {
    color: #652877;
  }

  :nth-child(even) {
    background-color: #d82271;
  }

  :nth-child(odd):active {
    color: #c92272;
  }

  :hover {
    opacity: 0.8;
  }

  :disabled {
    background-color: #fff;
    color: #000;
    text-decoration: underline;
    cursor: default;
  }

  :focus {
    outline: none;
  }
`;

export const MediaContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100wh;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

import Corner from 'react-github-corner';
import styled from 'styled-components';

const eugrdnProfile = 'https://github.com/eugrdn/vote-it';

export const GithubCorner = styled(Corner).attrs({
  href: eugrdnProfile,
  svgStyle: {mixBlendMode: 'darken'},
  octoColor: '#fff',
})``;

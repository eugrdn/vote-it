import Corner from 'react-github-corner';
import styled from 'styled-components';
import {Env} from '~/utils';

export const GithubCorner = styled(Corner).attrs({
  href: Env.getPublicVar('githubLink'),
  svgStyle: {mixBlendMode: 'darken'},
  octoColor: '#fff',
})``;

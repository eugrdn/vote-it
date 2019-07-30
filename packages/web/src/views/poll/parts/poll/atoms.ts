import {Button, Grid} from 'semantic-ui-react';
import styled, {css} from 'styled-components';
import {CopyToBuffer} from '~/components/common';

export const CopyLink = CopyToBuffer;

export const PollInfoColumn = styled(Grid.Column).attrs({
  mobile: 16,
  tablet: 5,
  computer: 5,
  widescreen: 5,
  largeScreen: 5,
})``;

export const PollStatisticColumn = styled(Grid.Column).attrs({
  mobile: 16,
  tablet: 8,
  computer: 11,
  widescreen: 11,
  largeScreen: 11,
})``;

export const GoToPollLink = styled(Button).attrs({
  as: 'a',
  primary: true,
  target: '_blank',
})`
  font-size: 1.4rem;
  display: block !important;
  margin-bottom: 20px;
  ${props =>
    props.isMobile &&
    css`
      text-align: center;
    `}
`;

import {Button, Container, Grid, Header, Segment} from 'semantic-ui-react';
import styled, {css} from 'styled-components';

export const HomeSegment = styled(Segment).attrs({
  vertical: true,
  padded: 'very',
  size: 'massive',
})`
  border: none;
  min-height: 630px;
  display: flex !important;
  flex-direction: column;
  border: 0;
`;

export const HomeContainer = styled(Container).attrs({
  textAlign: 'center',
})`
  font-size: 3rem;
  flex: 1;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
`;

export const CreatePollLink = styled(Button).attrs({
  as: 'a',
  primary: true,
})`
  margin-top: 17px;

  ${({isMobile}) =>
    isMobile
      ? css`
          color: pink;
        `
      : css`
          color: red;
          mix-blend-mode: difference;
        `}
`;

export const BenefitSegment = styled(Segment).attrs({
  vertical: true,
  padded: true,
  size: 'huge',
})`
  background-color: #fff !important;
`;

export const BenefitRow = styled(Grid.Row).attrs({
  textAlign: 'center',
})`
  padding: 0 !important;
`;

export const BenefitColumn = styled(Grid.Column).attrs({
  mobile: 16,
  tablet: 8,
  computer: 8,
  widescreen: 8,
  largeScreen: 8,
})``;

export const BenefitTitle = styled(Header).attrs({
  as: 'h3',
  size: 'large',
})`
  font-size: 1.9rem;
`;

export const BenefitTextCelled = styled(BenefitTitle)`
  padding: 20px !important;
`;

export const Footer = styled(Segment).attrs({
  vertical: true,
  padded: true,
  size: 'huge',
})``;

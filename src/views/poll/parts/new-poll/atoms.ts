import styled from 'styled-components';
import {Header} from 'semantic-ui-react';

export const BlockHeader = styled(Header).attrs({
  as: 'h3',
  size: 'huge',
})`
  font-size: 1.6rem;
`;

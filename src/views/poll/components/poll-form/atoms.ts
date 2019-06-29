import styled from 'styled-components';
import {Button, Form} from 'semantic-ui-react';

export const AddButton = styled(Button).attrs({
  content: 'Add variant',
})``;

export const RemoveButton = styled(Button).attrs({
  icon: 'remove circle',
  basic: true,
})``;

export const PrivateGroupField = styled(Form.Group).attrs({
  unstackable: true,
  inline: true,
})`
  display: flex !important;
  justify-content: space-between;
  width: 170px;
`;

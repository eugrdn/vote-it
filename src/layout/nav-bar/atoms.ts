import {Menu, Sidebar} from 'semantic-ui-react';
import styled from 'styled-components';

export const AuthButton = styled(Menu.Item)`
  margin-right: 10px;
  ::before {
    width: 0 !important;
  }
`;

export const FullHeightMenu = styled(Menu).attrs({vertical: true, fluid: true})`
  height: 100%;
`;

const SIDEBAR_HEIGHT = 54;

export const FullHeightPusher = styled(Sidebar.Pusher)`
  min-height: 100%;
`;

export const SidebarMenuMarginTopStub = styled(Menu.Item)`
  height: ${SIDEBAR_HEIGHT}px;
`;

export const SidebarToggler = styled(Menu.Item)`
  ::before {
    width: 0 !important;
  }
`;

export const HomeMenu = styled(Menu).attrs({
  size: 'huge',
  secondary: true,
  pointing: true,
  borderless: true,
  inverted: true,
})`
  padding-top: 1em !important;
  border: 0 !important;
`;

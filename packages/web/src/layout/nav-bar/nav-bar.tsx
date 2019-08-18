import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Container, Icon, Menu, Sidebar} from 'semantic-ui-react';
import * as Atoms from './atoms';
import {AuthButton} from './components';
import {MenuItem, NavMap} from '~/constants';
import {Page} from '~/components/styled';

type NavBarMobileProps = NavMap & {
  onPusherClick(): void;
  onToggle(): void;
  visible: boolean;
};

export const NavBarMobile: React.FC<NavBarMobileProps> = ({
  children,
  onPusherClick,
  onToggle,
  visible,
  leftItems,
  rightItems,
}) => (
  <Sidebar.Pushable>
    <Sidebar animation="overlay" width="thin" icon="labeled" items={leftItems} visible={visible}>
      <Atoms.FullHeightMenu>
        <Atoms.SidebarMenuMarginTopStub />
        {leftItems.map(renderLink)}
      </Atoms.FullHeightMenu>
    </Sidebar>
    <Atoms.FullHeightPusher dimmed={visible} onClick={onPusherClick}>
      <Menu fixed="top">
        <Atoms.SidebarToggler onClick={onToggle}>
          <Icon name="sidebar" size="big" />
        </Atoms.SidebarToggler>
        <Menu.Menu position="right">
          {rightItems.map(v => (
            <AuthButton key={v.type} {...v} />
          ))}
        </Menu.Menu>
      </Menu>
      <Page>{children}</Page>
    </Atoms.FullHeightPusher>
  </Sidebar.Pushable>
);

type NavBarDesktopProps = NavMap & {
  sticky: boolean;
};

export const NavBarDesktop: React.FC<NavBarDesktopProps> = ({
  children,
  leftItems,
  rightItems,
  sticky,
}) => {
  if (sticky) {
    return (
      <>
        <Menu size="huge" fixed="top">
          {leftItems.map(renderLink)}
          <Menu.Menu position="right">
            {rightItems.map(v => (
              <AuthButton key={v.type} {...v} />
            ))}
          </Menu.Menu>
        </Menu>
        <Page>{children}</Page>
      </>
    );
  }

  return (
    <>
      <Container>
        <Atoms.HomeMenu>
          {leftItems.map(renderLink)}
          <Menu.Menu position="right">
            {rightItems.map(v => (
              <AuthButton key={v.type} {...v} inverted />
            ))}
          </Menu.Menu>
        </Atoms.HomeMenu>
      </Container>
      {children}
    </>
  );
};

const renderLink = ({href, asHref, type, ...item}: MenuItem) => {
  const {asPath} = useRouter();
  const active = asPath === href;

  return (
    <Link key={type} href={href!} as={asHref} passHref>
      <Menu.Item as="a" {...item} active={active} />
    </Link>
  );
};

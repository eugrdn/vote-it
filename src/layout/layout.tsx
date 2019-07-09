import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Responsive} from 'semantic-ui-react';
import {NavBarDesktop, NavBarMobile} from './nav-bar';
import {getWidthFactory} from './utils/getWidthFactory';
import {Href, NavMap, MenuItem} from '~/constants';
import {MobileDetect} from '~/typings/nextjs';
import {GithubCorner} from '~/components/styled';
import {useAuth} from '~/hooks/common';
import {User} from '~/typings/models';

type AppLayoutProps = {md: MobileDetect};

const isAuthRequired = (user?: User) => ({auth}: MenuItem) =>
  user && !user.isAnonymous ? auth === undefined || auth : !auth;

export const AppLayout: React.FC<AppLayoutProps> = ({children, md: {isMobile}}) => {
  const {
    asPath,
    query: {id},
  } = useRouter();
  const [user] = useAuth();

  const map: NavMap = {
    leftItems: NavMap.leftItems.filter(isAuthRequired(user)),
    rightItems: NavMap.rightItems.filter(isAuthRequired(user)),
  };
  const isVotePage = asPath === Href.Vote.replace('[id]', id);
  const getWidth = getWidthFactory(isMobile);

  const layouts = [MobileLayout, DesktopLayout];

  return (
    <>
      {layouts.map(Layout => (
        <Layout key={Layout.toString()} withNav={!isVotePage} getWidth={getWidth} navMap={map}>
          {children}
        </Layout>
      ))}
    </>
  );
};

type DeviceLayoutProps = {
  getWidth(): number;
  withNav: boolean;
  navMap: NavMap;
};

const MobileLayout: React.FC<DeviceLayoutProps> = ({children, getWidth, withNav, navMap}) => {
  const [isOpened, setOpened] = useState(false);

  const handlePusher = () => {
    if (isOpened) {
      setOpened(false);
    }
  };

  const handleToggle = () => setOpened(!isOpened);

  const jsx = withNav ? (
    <NavBarMobile
      {...navMap}
      onPusherClick={handlePusher}
      onToggle={handleToggle}
      visible={isOpened}
    >
      {children}
    </NavBarMobile>
  ) : (
    children
  );

  return (
    <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
      {jsx}
    </Responsive>
  );
};

const DesktopLayout: React.FC<DeviceLayoutProps> = ({children, getWidth, withNav, navMap}) => {
  const {asPath} = useRouter();
  const isHomePage = asPath === Href.Home;
  const jsx = withNav ? (
    <NavBarDesktop {...navMap} sticky={!isHomePage}>
      {children}
    </NavBarDesktop>
  ) : (
    children
  );

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      {jsx}
      {isHomePage && <GithubCorner />}
    </Responsive>
  );
};

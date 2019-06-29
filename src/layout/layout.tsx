import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {Responsive} from 'semantic-ui-react';
import {NavBarDesktop, NavBarMobile} from './nav-bar';
import {getWidthFactory} from './utils/getWidthFactory';
import {Href, SiteMap} from '~/constants';
import {MobileDetect} from '~/typings/nextjs';
import {GithubCorner} from '~/components/styled';

type AppLayoutProps = {md: MobileDetect};

export const AppLayout: React.FC<AppLayoutProps> = ({children, md: {isMobile}}) => {
  const {
    asPath,
    query: {id},
  } = useRouter();
  const isVotePage = asPath === Href.Vote.replace('$id', id);
  const getWidth = getWidthFactory(isMobile);

  return (
    <>
      <MobileLayout withNav={!isVotePage} getWidth={getWidth}>
        {children}
      </MobileLayout>
      <DesktopLayout withNav={!isVotePage} getWidth={getWidth}>
        {children}
      </DesktopLayout>
    </>
  );
};

type DeviceLayoutProps = {
  getWidth(): number;
  withNav: boolean;
};

const MobileLayout: React.FC<DeviceLayoutProps> = ({children, getWidth, withNav}) => {
  const [isOpened, setOpened] = useState(false);

  const handlePusher = () => {
    if (isOpened) {
      setOpened(false);
    }
  };

  const handleToggle = () => setOpened(!isOpened);

  const jsx = withNav ? (
    <NavBarMobile
      {...SiteMap}
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

const DesktopLayout: React.FC<DeviceLayoutProps> = ({children, getWidth, withNav}) => {
  const {asPath} = useRouter();
  const isHomePage = asPath === Href.Home;
  const jsx = withNav ? (
    <NavBarDesktop {...SiteMap} sticky={!isHomePage}>
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

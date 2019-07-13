import {Responsive} from 'semantic-ui-react';

export const getWidthFactory = (isMobile: boolean) => () => {
  const isSSR = typeof window === 'undefined';
  const ssrValue = isMobile ? Responsive.onlyMobile.maxWidth : Responsive.onlyTablet.minWidth;

  return isSSR ? Number(ssrValue) : window.innerWidth;
};

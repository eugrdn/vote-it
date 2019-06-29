import {MenuItemProps} from 'semantic-ui-react';

export type MenuItem = Partial<MenuItemProps> & {
  href?: string;
  asHref?: string;
  key: string;
};

export type SiteMap = {
  leftItems: MenuItem[];
  rightItems: MenuItem[];
};

/**
 * Next.js Link props:
 * href - path to file inside pages directory + querystring
 * as - path to show in the browser
 */

export enum Href {
  Home = '/',
  Polls = '/polls',
  Poll = '/poll/$id',
  Vote = '/poll/$id/vote',
}

export const NEW_PAGE_ID = 'new';

export const SiteMap: SiteMap = {
  leftItems: [
    {href: Href.Home, asHref: Href.Home, content: 'Home', key: 'home'},
    {href: Href.Polls, asHref: Href.Polls, content: 'Polls', key: 'polls'},
  ],
  rightItems: [{content: 'Log In', key: 'login'}, {content: 'Sign Up', key: 'signup'}],
};

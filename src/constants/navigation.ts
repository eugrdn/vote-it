import {MenuItemProps} from 'semantic-ui-react';

export type MenuItem = Partial<MenuItemProps> & {
  href?: string;
  asHref?: string;
  type: string;
  auth?: boolean;
};

export type NavMap = {
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

export const NavMap: NavMap = {
  leftItems: [
    {type: 'home', content: 'Home', href: Href.Home, asHref: Href.Home},
    {type: 'polls', content: 'Polls', href: Href.Polls, asHref: Href.Polls},
  ],
  rightItems: [
    {type: 'login', content: 'Log In', auth: false},
    {type: 'signup', content: 'Sign Up', auth: false},
    {type: 'signout', content: 'Sign Out', auth: true},
  ],
};

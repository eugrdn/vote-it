import React from 'react';
import NextLink from 'next/link';
import {Button} from 'semantic-ui-react';
import {Href} from '~/constants';

type LinkProps = {
  id: string;
  href: Href;
  icon: string;
};

export const Link: React.FC<LinkProps> = ({id, href, icon}) => (
  <NextLink href={href} as={href.replace('[id]', id)} passHref>
    <Button as="a" icon={icon} />
  </NextLink>
);

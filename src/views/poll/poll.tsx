import React from 'react';
import {useRouter} from 'next/router';
import {NEW_PAGE_ID} from '~/constants';
import {Poll, NewPoll} from './parts';
import {FromSSR} from '~/typings/nextjs';

type PollPageProps = {
  fromSSR: FromSSR;
};

export const PollPage: React.FC<PollPageProps> = ({
  fromSSR: {
    md: {isMobile},
  },
}) => {
  const {
    query: {id},
  } = useRouter();

  return id === NEW_PAGE_ID ? <NewPoll /> : <Poll pollId={id} isMobile={isMobile} />;
};

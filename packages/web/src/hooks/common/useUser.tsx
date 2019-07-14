import {useEffect, useState} from 'react';
import {useAuth} from './useAuth';
import {useDatabase} from '../common';
import * as Models from '~/typings/models';
import {UpdateRemote} from '~/typings/common';

type MaybeUser = Models.User | undefined;

type UpdateFns = {
  updateCustomUserRemote: UpdateRemote<Models.CustomUser>;
  updateCreatedPolls: UpdateRemote<Models.Id[]>;
  updateParticipatedPolls: UpdateRemote<Models.Id[]>;
  updateVoteForPoll: UpdateRemote<Record<Models.Id, Models.Id>>;
};

type Utils = {
  getVotedValue(user: Models.User, pollId: string): string | undefined;
  hasPoll(user: Models.User, pollId: string): boolean;
  hasAccess(user: Models.User, poll: Models.Poll): boolean;
};

function getVotedValue(user: Models.User, pollId: string) {
  return user.votes && user.votes[pollId];
}

function hasPoll(user: Models.User, pollId: string) {
  if (user.polls) {
    const {created, part} = user.polls;
    return (created || part).some(poll => poll === pollId);
  }
  return false;
}

function hasAccess(user: Models.User, poll: Models.Poll) {
  return !poll.private || hasPoll(user, poll.id);
}

export function useUser(): [MaybeUser, UpdateFns, Utils] {
  const [customUser, setCustomUser] = useState<MaybeUser>();
  const [user] = useAuth();
  const database = useDatabase();
  const userRef = user && database.ref(`/users/${user.id}`);

  const updateFns: UpdateFns = {
    updateCustomUserRemote: user => userRef!.update(user),
    updateCreatedPolls: ids => userRef!.child(`/polls/created`).update(ids),
    updateParticipatedPolls: ids => userRef!.child(`/polls/part`).update(ids),
    updateVoteForPoll: votes => userRef!.child(`/votes`).update(votes),
  };

  const utils: Utils = {
    getVotedValue,
    hasPoll,
    hasAccess,
  };

  useEffect(() => {
    userRef && userRef.on('value', snapshot => setCustomUser(snapshot.val()));

    return () => userRef && userRef.off();
  }, [user && user.id]);

  return [customUser, updateFns, utils];
}

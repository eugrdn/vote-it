import {useEffect, useState} from 'react';
import {useAuth} from './useAuth';
import {useDatabase} from '../common';
import {Maybe, UpdateRemote} from '~/typings/common';
import * as Models from '~/typings/models';

type MaybeUser = Maybe<Models.User>;

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
  const db = useDatabase();
  const userRef = user && db.firestore.collection('users').doc(user.id);

  const updateFns: UpdateFns = {
    updateCustomUserRemote: user => userRef!.update(user),
    updateCreatedPolls: ids => userRef!.update(db.path('polls', 'created'), ids),
    updateParticipatedPolls: ids => userRef!.update(db.path('polls', 'part'), ids),
    updateVoteForPoll: votes => userRef!.update('votes', votes),
  };

  const utils: Utils = {
    getVotedValue,
    hasPoll,
    hasAccess,
  };

  useEffect(
    () =>
      userRef &&
      userRef.onSnapshot(snapshot => setCustomUser(db.getSnapshotData<MaybeUser>(snapshot))),
    [user && user.id],
  );

  return [customUser, updateFns, utils];
}

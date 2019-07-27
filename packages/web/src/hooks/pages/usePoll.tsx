import {useEffect, useState} from 'react';
import {useDatabase} from '../common';
import {Poll, Option} from '~/typings/models';
import {Maybe, UpdateRemote} from '~/typings/common';

type MaybePoll = Maybe<Poll>;

type UpdateFns = {
  updatePollRemote: UpdateRemote<Poll>;
  updateOptionRemote: UpdateRemote<Option>;
};

type Utils = {
  getOptionsAsList(): Option[];
};

export function usePoll(pollId: string): [MaybePoll, UpdateFns, Utils] {
  const db = useDatabase();
  const [poll, setPoll] = useState<MaybePoll>();
  const pollRef = db.firestore.collection('polls').doc(pollId);

  const updateFns: UpdateFns = {
    updatePollRemote: poll => pollRef.update(poll),
    updateOptionRemote: option =>
      pollRef.update(db.path('options', option.id!, 'votes'), option.votes),
  };

  const utils: Utils = {
    getOptionsAsList: () => (poll ? Object.values(poll.options) : []),
  };

  useEffect(
    () =>
      pollRef.onSnapshot(snapshot => {
        setPoll(db.getSnapshotData<MaybePoll>(snapshot));
      }),
    [pollId],
  );

  return [poll, updateFns, utils];
}

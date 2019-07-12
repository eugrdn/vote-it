import {useEffect, useState} from 'react';
import {useDatabase} from '../common';
import {Poll, Option} from '~/typings/models';
import {UpdateRemote} from '~/typings/common';

type MaybePoll = Poll | undefined;

type UpdateFns = {
  updatePollRemote: UpdateRemote<Poll>;
  updateOptionRemote: UpdateRemote<Option>;
};

type Utils = {
  getOptionsAsList(): Option[];
};

export function usePoll(pollId: string): [MaybePoll, UpdateFns, Utils] {
  const database = useDatabase();
  const [poll, setPoll] = useState<MaybePoll>();
  const pollRef = database.ref(`/polls/${pollId}`);

  const updateFns: UpdateFns = {
    updatePollRemote: poll => pollRef.update(poll),
    updateOptionRemote: option => pollRef.child(`/options/${option.id}`).update(option),
  };

  const utils: Utils = {
    getOptionsAsList: () => (poll ? Object.values(poll.options) : []),
  };

  useEffect(() => {
    pollRef.on('value', snapshot => setPoll(snapshot.val()));

    return () => pollRef.off();
  }, [pollId]);

  return [poll, updateFns, utils];
}

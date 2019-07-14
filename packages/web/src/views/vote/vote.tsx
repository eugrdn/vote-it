import React from 'react';
import {useRouter} from 'next/router';
import * as Atoms from './atoms';
import {usePoll} from '~/hooks/pages';
import {useUser} from '~/hooks/common';

// TODO animation after render and click
export const VotePage: React.SFC<{}> = () => {
  const router = useRouter();
  const [poll, {updateOptionRemote}, {getOptionsAsList}] = usePoll(router.query.id.toString());
  const [user, {updateVoteForPoll}, {hasAccess, getVotedValue}] = useUser();
  const canVote = user && poll && hasAccess(user, poll); // TODO: use 404
  const vote = canVote && getVotedValue(user!, poll!.id);
  
  const handleVote = (id: string) => async () => {
    const incOptionVotes = updateOptionRemote({id, votes: poll!.options[id].votes + 1});
    const decOptionVotes =
      vote && (updateOptionRemote({id: vote, votes: poll!.options[vote].votes - 1}) as any);
    const updateUserVotes = updateVoteForPoll({...user!.votes, [poll!.id]: id});

    await Promise.all([incOptionVotes, decOptionVotes, updateUserVotes]);
  };

  return (
    <Atoms.MediaContainer>
      {getOptionsAsList().map(({id, title}) => (
        <Atoms.VoteButton
          disabled={!canVote || id === vote}
          key={id}
          title={title}
          onClick={handleVote(id)}
        >
          {title}
        </Atoms.VoteButton>
      ))}
    </Atoms.MediaContainer>
  );
};

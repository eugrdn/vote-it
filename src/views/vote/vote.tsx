import React from 'react';
import {useRouter} from 'next/router';
import {usePoll} from '~/hooks/pages';
import * as Atoms from './atoms';

// TODO animation after render and click
export const VotePage: React.SFC<{}> = () => {
  const router = useRouter();
  const [poll, {updateOptionRemote}, {getOptionsAsList}] = usePoll(router.query.id);

  const handleVote = (id: string) => () => {
    const incVotes = poll!.options[id].votes + 1;
    updateOptionRemote({id, votes: incVotes});
  };

  return (
    <Atoms.MediaContainer>
      {getOptionsAsList().map(({id, title}) => (
        <Atoms.VoteButton key={id} title={title} onClick={handleVote(id)}>
          {title}
        </Atoms.VoteButton>
      ))}
    </Atoms.MediaContainer>
  );
};

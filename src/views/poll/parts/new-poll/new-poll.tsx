import React, {useState} from 'react';
import Router from 'next/router';
import {Container, Grid, Modal} from 'semantic-ui-react';
import * as Atoms from './atoms';
import {PollForm} from '../../components';
import {Href} from '~/constants';
import {useDatabase, useUser} from '~/hooks/common';
import {Poll} from '~/typings/models';

export const NewPoll: React.FC<{}> = () => {
  const database = useDatabase();
  const [user, {updateCreatedPolls, updateParticipatedPolls}] = useUser();
  const [error, setError] = useState<Error | null>(null);

  async function handleSubmit(poll: Poll) {
    const pollId = poll.id;
    const pollsRef = database.ref(`/polls`);
    const newPollRef = pollsRef.child(poll.id);
    const {created = [], part = []} = (user && user.polls) || {};

    try {
      await Promise.all([
        newPollRef.set(poll),
        updateCreatedPolls(created.concat(pollId)),
        updateParticipatedPolls(part.concat(pollId)),
      ]);
      await Router.push(Href.Poll.replace('[id]', pollId));
    } catch (error) {
      error.stack = pollId;
      setError(error);
    }
  }

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8} largeScreen={8}>
            <Atoms.BlockHeader>Poll Info</Atoms.BlockHeader>
            <PollForm onSubmit={handleSubmit} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal size="small" open={!!error} onClose={() => setError(null)}>
        <Modal.Header>{error && error.stack}</Modal.Header>
        <Modal.Content>
          <p>{error && error.message}</p>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

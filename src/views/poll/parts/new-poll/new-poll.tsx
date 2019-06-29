import Router from 'next/router';
import React, {useState} from 'react';
import {Container, Grid, Modal} from 'semantic-ui-react';
import * as Atoms from './atoms';
import {PollForm} from '../../components';
import {Href} from '~/constants';
import {useFirebase} from '~/hooks/common';
import {Poll} from '~/typings/models';

export const NewPoll: React.FC<{}> = () => {
  const {database} = useFirebase();
  const [error, setError] = useState<Error | null>(null);

  async function handleSubmit(poll: Poll) {
    const pollsRef = database.ref(`/polls`);
    const newPollRef = pollsRef.child(poll.id);

    try {
      await newPollRef.set(poll);
      Router.push(Href.Poll.replace('$id', poll.id));
    } catch (error) {
      error.stack = poll.id;
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

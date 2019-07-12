import React, {useEffect, useState} from 'react';
import {Container} from 'semantic-ui-react';
import {Table} from './components';
import {Poll} from '~/typings/models';
import {useDatabase} from '~/hooks/common';

export const PollsPage: React.FC<{}> = () => {
  const database = useDatabase();
  const [polls, setPolls] = useState<Poll[]>([]);
  const pollRef = database.ref('/polls');

  useEffect(() => {
    pollRef.on('value', snapshot => setPolls(Object.values(snapshot.val())));

    return () => pollRef.off();
  }, []);

  // TODO: made on server after Firestore integration
  const publicPolls = polls.filter(v => !v.private);
  return (
    <Container>
      <Table polls={publicPolls} />
    </Container>
  );
};

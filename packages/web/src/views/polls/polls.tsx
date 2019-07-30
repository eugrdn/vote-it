import React, {useEffect, useState} from 'react';
import {Container} from 'semantic-ui-react';
import {Table} from './components';
import {Poll} from '~/typings/models';
import {useDatabase} from '~/hooks/common';

export const PollsPage: React.FC<{}> = () => {
  const db = useDatabase();
  const [polls, setPolls] = useState<Poll[]>([]);

  async function updatePolls() {
    const publicPolls = await db.getQueryValue<Poll[]>(fs =>
      fs.collection('polls').where('private', '==', false),
    );
    setPolls(publicPolls);
  }

  useEffect(() => {
    updatePolls();
  }, []);

  return (
    <Container>
      <Table polls={polls} />
    </Container>
  );
};

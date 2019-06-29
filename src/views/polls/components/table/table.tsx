import React from 'react';
import {Table as STable} from 'semantic-ui-react';
import {Link} from '../';
import {Poll} from '~/typings/models';
import {Href} from '~/constants';

type PollsTableProps = {
  polls: Poll[];
};

export const Table: React.FC<PollsTableProps> = ({polls}) => (
  <STable textAlign="center" stackable celled padded selectable definition>
    <STable.Header>
      <STable.Row>
        <STable.HeaderCell width={2} />
        <STable.HeaderCell width={10}>Topic</STable.HeaderCell>
        <STable.HeaderCell width={2}>Views</STable.HeaderCell>
        <STable.HeaderCell width={2}>Votes</STable.HeaderCell>
      </STable.Row>
    </STable.Header>

    <STable.Body>
      {polls.map(({id, topic, views, options}) => {
        const optionsList = Object.values(options);
        const optionsPreview = `${optionsList
          .map(v => v.title)
          .join(', ')
          .substring(0, 25)}...`;
        const totalVotes = optionsList.reduce((acc, v) => acc + v.votes, 0);

        return (
          <STable.Row key={id}>
            <STable.Cell collapsing>
              <Link id={id} href={Href.Poll} icon="info" />
              <Link id={id} href={Href.Vote} icon="send" />
            </STable.Cell>
            <STable.Cell textAlign="left">
              {topic}
              &nbsp; &nbsp; &nbsp;
              {optionsPreview}
            </STable.Cell>
            <STable.Cell>{views}</STable.Cell>
            <STable.Cell> {totalVotes}</STable.Cell>
          </STable.Row>
        );
      })}
    </STable.Body>
  </STable>
);

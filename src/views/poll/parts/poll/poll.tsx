import React, {useEffect} from 'react';
import Link from 'next/link';
import {Container, Grid, Header, Icon, Segment, Statistic} from 'semantic-ui-react';
import * as Atoms from './atoms';
import {PollForm} from '../../components';
import {usePoll} from '~/hooks/pages';
import {useWindow} from '~/hooks/common';
import {Href} from '~/constants';
import {url} from '~/utils';

type PollPageProps = {
  pollId: string;
  isMobile: boolean;
};

export const Poll: React.FC<PollPageProps> = ({pollId, isMobile}) => {
  const [poll, {updatePollRemote}, {getOptionsAsList}] = usePoll(pollId);
  const window = useWindow();

  useEffect(() => {
    if (poll) {
      updatePollRemote({id: poll.id, views: poll.views + 1});
    }
  }, [poll && poll.id]);

  if (poll) {
    const href = Href.Vote.replace('[id]', poll.id);
    const linkToVote = window ? `${url(window)}${href}` : '';
    const optionsList = getOptionsAsList();
    const totalVotes = optionsList.reduce((acc, v) => acc + v.votes, 0);

    return (
      <Container>
        <Grid>
          <Atoms.PollInfoColumn>
            <Grid.Row>
              <Link href={Href.Vote} as={href} passHref>
                <Atoms.GoToPollLink isMobile={isMobile}>
                  Vote it!
                  <Icon name="send" />
                </Atoms.GoToPollLink>
              </Link>
              <Atoms.CopyLink value={linkToVote} />
              &nbsp;
              <Header as="h3">Poll Info</Header>
              <PollForm poll={poll} readonly="no-options" />
            </Grid.Row>
          </Atoms.PollInfoColumn>

          <Atoms.PollStatisticColumn>
            <Grid.Row>
              <Segment textAlign="center" padded>
                <Header as="h3">Statistic</Header>
                <Container>
                  <Statistic.Group widths="two">
                    <Statistic>
                      <Statistic.Value>
                        <Icon name="send" />
                        {totalVotes}
                      </Statistic.Value>
                      <Statistic.Label>Total votes</Statistic.Label>
                    </Statistic>
                    <Statistic>
                      <Statistic.Value>
                        <Icon name="eye" />
                        {poll.views}
                      </Statistic.Value>
                      <Statistic.Label>Total views</Statistic.Label>
                    </Statistic>
                  </Statistic.Group>
                  &nbsp;
                  <Statistic.Group horizontal>
                    <Header as="h3">Variants</Header>
                    {optionsList.map(({id, title, votes}) => (
                      <Statistic key={id}>
                        <Statistic.Value>{votes}</Statistic.Value>
                        <Statistic.Label>{title}</Statistic.Label>
                      </Statistic>
                    ))}
                  </Statistic.Group>
                </Container>
              </Segment>
            </Grid.Row>
          </Atoms.PollStatisticColumn>
        </Grid>
      </Container>
    );
  }

  return null;
};

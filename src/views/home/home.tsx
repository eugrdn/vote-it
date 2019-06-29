import React from 'react';
import Link from 'next/link';
import {Container, Divider, Grid, Header, Icon} from 'semantic-ui-react';
import * as Atoms from './atoms';
import {wrapTextWithEmoji} from './utils';
import {Href, NEW_PAGE_ID} from '~/constants';
import {FromSSR} from '~/typings/nextjs';

type HomePageProps = {
  fromSSR: FromSSR;
};

export const HomePage: React.FC<HomePageProps> = ({
  fromSSR: {
    md: {isMobile},
  },
}) => (
  <>
    <Atoms.HomeSegment>
      <Atoms.HomeContainer>
        <Header as="h2" size="small" inverted>
          Have an opinion?
        </Header>
        <Header as="h1" size="large" inverted>
          Vote it!
        </Header>
        <Link href={Href.Poll} as={Href.Poll.replace('$id', NEW_PAGE_ID)} passHref>
          <Atoms.CreatePollLink isMobile={isMobile}>
            Create a poll
            <Icon name="arrow right" />
          </Atoms.CreatePollLink>
        </Link>
      </Atoms.HomeContainer>
    </Atoms.HomeSegment>

    <Atoms.BenefitSegment>
      <Container fluid>
        <Grid {...(!isMobile && {celled: 'internally'})}>
          <Atoms.BenefitRow>
            <Atoms.BenefitColumn>
              <Atoms.BenefitTextCelled>
                {wrapTextWithEmoji('Create poll instantly!', ':bulb:', ':rocket:')}
              </Atoms.BenefitTextCelled>
            </Atoms.BenefitColumn>
            <Atoms.BenefitColumn>
              <Atoms.BenefitTextCelled>
                {wrapTextWithEmoji(
                  'Share link with friends!',
                  ':couple:',
                  ':two_women_holding_hands:',
                )}
              </Atoms.BenefitTextCelled>
            </Atoms.BenefitColumn>
          </Atoms.BenefitRow>
          <Atoms.BenefitRow>
            <Atoms.BenefitColumn>
              <Atoms.BenefitTextCelled>
                {wrapTextWithEmoji(
                  'Get real-time results and statistic!',
                  ':eyes:',
                  ':chart_with_upwards_trend:',
                )}
              </Atoms.BenefitTextCelled>
            </Atoms.BenefitColumn>
            <Atoms.BenefitColumn>
              <Atoms.BenefitTextCelled>
                {wrapTextWithEmoji('Explore and join other polls!', ':earth_africa:', ':pray:')}
              </Atoms.BenefitTextCelled>
            </Atoms.BenefitColumn>
          </Atoms.BenefitRow>
        </Grid>
      </Container>
    </Atoms.BenefitSegment>

    <Divider fitted />

    <Atoms.BenefitSegment textAlign="center">
      <Container>
        <Atoms.BenefitTitle>A tool that helps create the right choice</Atoms.BenefitTitle>
        &nbsp;
        <Container>
          <p>
            This is an Open Source tool. It's in the developing stage and actively looking for new
            contributors.
          </p>
          <p>
            If you have an idea of how to make it better or found a bug don't hesitate to add a
            ticket in GitHub.
          </p>
          <p>New features are coming!</p>
        </Container>
      </Container>
    </Atoms.BenefitSegment>

    <Atoms.Footer />
  </>
);

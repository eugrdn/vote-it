import React from 'react';
import MobileDetect from 'mobile-detect';
import App, {AppContext, Container} from 'next/app';
import Head from 'next/head';
import {CustomProps, FromSSR} from '../src/typings/nextjs';
import {Href} from '~/constants';
import {AppLayout} from '~/layout';
import {GradientBackground} from '~/components/styled';
import {FirebaseProvider, AuthProvider} from '~/hooks/common';

class MyApp extends App<CustomProps> {
  static async getInitialProps({Component, ctx}: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    let fromSSR: FromSSR = {md: {deviceInfo: {}}} as any;

    if (ctx.req) {
      const md = new MobileDetect(ctx.req.headers['user-agent']!);

      fromSSR = {
        md: {
          isMobile: !!md.mobile(),
          deviceInfo: {
            mobile: md.mobile(),
            tablet: md.tablet(),
            os: md.os(),
            userAgent: md.userAgent(),
          },
        },
      };
    }

    return {pageProps, fromSSR};
  }

  render() {
    const {
      Component,
      pageProps,
      fromSSR,
      router: {asPath},
    } = this.props;

    const isHomePage = asPath === Href.Home;
    const LayoutWrapper = isHomePage ? GradientBackground : React.Fragment;

    return (
      <Container>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
          />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>
        <FirebaseProvider>
          <AuthProvider>
            <LayoutWrapper>
              <AppLayout md={fromSSR.md}>
                <Component {...pageProps} fromSSR={fromSSR} />
              </AppLayout>
            </LayoutWrapper>
          </AuthProvider>
        </FirebaseProvider>
      </Container>
    );
  }
}

export default MyApp;

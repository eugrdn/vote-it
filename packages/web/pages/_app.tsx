import React from 'react';
import MobileDetect from 'mobile-detect';
import App, {AppContext, Container} from 'next/app';
import Head from 'next/head';
import {CustomProps, FromSSR} from '~/typings/nextjs';
import {Href} from '~/constants';
import {AppLayout} from '~/layout';
import {GradientBackground} from '~/components/styled';
import {FirebaseProvider, AuthProvider} from '~/hooks/common';
import 'semantic-ui-css/semantic.min.css';

class VoteItApp extends App<CustomProps> {
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
          <title>Vote it!</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <link rel="icon" type="image/png" sizes="16x16" href="./static/icons/icon-16x16.png" />
          <link rel="icon" type="image/png" sizes="24x24" href="./static/icons/icon-24x24.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="./static/icons/icon-32x32.png" />
          <link rel="icon" type="image/png" sizes="64x64" href="./static/icons/icon-64x64.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="./static/icons/icon-128x128.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="./static/icons/icon-256x256.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="./static/icons/icon-512x512.png"
          />
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

export default VoteItApp;

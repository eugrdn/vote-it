const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withAssets = require('./next/withAssets');
const withAliases = require('./next/withAliases');

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  require('dotenv').config();
}

const config = {
  experimental: {
    autoExport: true,
    dynamicRouting: true,
  },
  target: 'serverless',
  publicRuntimeConfig: 0, // TODO: update after https://github.com/zeit/next.js/issues/7909 resolution
  env: {
    APP_ID: process.env.APP_ID,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
  },
};

module.exports = withPlugins([withAliases, withCSS, withAssets], config);

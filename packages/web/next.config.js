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
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  },
};

module.exports = withPlugins([withAliases, withCSS, withAssets], config);

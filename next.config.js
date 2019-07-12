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
  publicRuntimeConfig: {
    appId: process.env.APP_ID,
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    githubLink: process.env.GITHUB_LINK,
  },
};

module.exports = withPlugins([withAliases, withCSS, withAssets], config);

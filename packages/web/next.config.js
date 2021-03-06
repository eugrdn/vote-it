const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
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
  target: "experimental-serverless-trace",
  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
  },
};

module.exports = withPlugins([withAliases, withCSS, withAssets], config);

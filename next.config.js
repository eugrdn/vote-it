const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  require('dotenv').config();
}

const withAssetRelocator = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack(config, options) {
      const {isServer} = options;

      if (isServer) {
        config.node = Object.assign({}, config.node, {
          __dirname: false,
          __filename: false,
        });

        config.module.rules.unshift({
          test: /\.(m?js|node)$/,
          parser: {amd: false},
          use: {
            loader: '@zeit/webpack-asset-relocator-loader',
            options: {
              outputAssetBase: 'assets',
              existingAssetNames: [],
              wrapperCompatibility: true,
              escapeNonAnalyzableRequires: true,
            },
          },
        });
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  });

module.exports = withAssetRelocator({
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve('./src'),
    };
    return config;
  },
  experimental: {
    autoExport: true,
    dynamicRouting: true,
  },
  publicRuntimeConfig: {
    APP_ID: process.env.APP_ID,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  },
});

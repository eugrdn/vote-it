const path = require('path');
const makeWith = require('./makeWithWrapper');

const withAliases = makeWith({
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, '../src'),
    };
  },
});

module.exports = withAliases;

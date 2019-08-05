const cypressFirebasePlugin = require('cypress-firebase').plugin;

module.exports = (on, config) => {
  on('task', {
    device(...fixtures) {
      return fixtures.reduce((config, fixture) => {
        config[fixture] = require('../fixtures/device/' + fixture + '.js');
        return config;
      }, {});
    },
  });

  return cypressFirebasePlugin(config);
};

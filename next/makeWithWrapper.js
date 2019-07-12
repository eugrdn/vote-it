const makeWithWrapper = (customConfig = {}) => (nextConfig = {}) => ({
  ...nextConfig,
  ...customConfig,
  ...(typeof customConfig.webpack === 'function' && {
    webpack(config, options) {
      customConfig.webpack(config, options);

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  }),
});

module.exports = makeWithWrapper;

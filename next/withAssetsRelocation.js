const makeWith = require('./makeWithWrapper');

const withAssetRelocation = makeWith({
  webpack(config, options) {
    const {isServer} = options;

    if (isServer) {
      config.node = {...config.node, __dirname: false, __filename: false};

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
  },
});

module.exports = withAssetRelocation;

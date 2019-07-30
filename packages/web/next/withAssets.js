const path = require('path');
const makeWith = require('./makeWithWrapper');

const withAssets = makeWith({
  webpack(config, {isServer}) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });

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
  },
});

module.exports = withAssets;

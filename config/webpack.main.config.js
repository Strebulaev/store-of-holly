const path = require('path');
const { dependencies } = require('../package.json');

module.exports = {
  mode: 'development',
  target: 'electron-main',
  entry: {
    main: path.join(__dirname, '../src/main/main.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist/main'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [...Object.keys(dependencies || {})],
  resolve: {
    extensions: ['.js', '.json', '.node', '.ts'],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
};

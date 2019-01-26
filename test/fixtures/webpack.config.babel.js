import { join } from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SuppressChunksPlugin from '../../src';

const entries = {
  one: './bar.js',
  two: './foo.js'
};

const output = {
  filename: '[name].js',
  path: join(__dirname, '/output')
};

export const webpackConfig1 = {
  context: __dirname,
  entry: {
    main: './index.js',
    ...entries
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'css-loader'
      }
    ]
  },

  output,

  plugins: [new SuppressChunksPlugin(Object.keys(entries))]
};

export const webpackConfig2 = {
  context: __dirname,
  entry: {
    main: './index.js',
    ...entries
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1'
        })
      }
    ]
  },

  output,

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new SuppressChunksPlugin([{ name: 'one', match: /\.js$/ }, 'two'])
  ]
};

export const webpackConfig3 = {
  ...webpackConfig2,

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new SuppressChunksPlugin([{ name: 'one', match: /\.js$/, keep: true }])
  ]
};

export const webpackConfig4 = {
  ...webpackConfig2,

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new SuppressChunksPlugin(['one', 'two'], { filter: /\.js$/ })
  ]
};

export default {};

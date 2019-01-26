import { join } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
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
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
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
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  output,
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new SuppressChunksPlugin([{ name: 'one', match: /\.js$/ }, 'two'])
  ]
};

export const webpackConfig3 = {
  ...webpackConfig2,

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new SuppressChunksPlugin([{ name: 'one', match: /\.js$/, keep: true }])
  ]
};

export const webpackConfig4 = {
  ...webpackConfig2,

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new SuppressChunksPlugin(['one', 'two'], { filter: /\.js$/ })
  ]
};

export default {};

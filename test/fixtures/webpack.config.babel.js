import { join } from 'path';
import SuppressChunksPlugin from '../../src';

const entries = {
  one: './bar.js',
  two: './foo.js',
};

export default {
  context: __dirname,
  entry: {
    main: './index.js',
    ...entries,
  },

  output: {
    filename: '[name].js',
    path: join(__dirname, '/output'),
  },

  plugins: [new SuppressChunksPlugin(Object.keys(entries))],
};

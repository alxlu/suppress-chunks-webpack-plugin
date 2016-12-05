/* eslint-env node, mocha */
import webpack from 'webpack';
import del from 'del';
import { expect } from 'chai';
import { join } from 'path';
import { readdir } from 'fs';
import webpackConfig from './fixtures/webpack.config.babel';

const outputDir = join(__dirname, 'fixtures/output');

describe('SuppressEntryChunksPlugin', () => {
  beforeEach((done) => {
    del(outputDir).then(() => done());
  });

  it('suppresses the desired chunks', (done) => {
    webpack(webpackConfig, (err) => {
      if (err) {
        return done(err);
      }

      // eslint-disable-next-line no-shadow
      return readdir(outputDir, (err, files) => {
        if (err) {
          return done(err);
        }
        expect(files).to.contain('main.js');
        expect(files).to.not.contain('foo.js');
        expect(files).to.not.contain('bar.js');
        return done();
      });
    });
  });

  afterEach((done) => {
    del(outputDir).then(() => done());
  });
});

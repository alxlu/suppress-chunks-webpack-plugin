/* eslint-env node, mocha */
import webpack from 'webpack';
import del from 'del';
import { expect } from 'chai';
import { join } from 'path';
import { readdir } from 'fs';
import {
  webpackConfig1,
  webpackConfig2,
  webpackConfig3,
  webpackConfig4
} from './fixtures/webpack.config.babel';

const outputDir = join(__dirname, 'fixtures/output');

describe('SuppressEntryChunksPlugin', () => {
  beforeEach(done => {
    del(outputDir).then(() => done());
  });

  it('suppresses the desired chunks', done => {
    webpack(webpackConfig1, err => {
      if (err) {
        return done(err);
      }

      // eslint-disable-next-line no-shadow
      return readdir(outputDir, (err, files) => {
        if (err) {
          return done(err);
        }
        expect(files).to.deep.equal(['main.js']);
        return done();
      });
    });
  });

  it('can filter files output by the chunks', done => {
    webpack(webpackConfig2, err => {
      if (err) {
        return done(err);
      }

      // eslint-disable-next-line no-shadow
      return readdir(outputDir, (err, files) => {
        if (err) {
          return done(err);
        }
        expect(files).to.deep.equal(['main.js', 'one.css']);
        return done();
      });
    });
  });

  it('can invert the match selection if keep = true', done => {
    webpack(webpackConfig3, err => {
      if (err) {
        return done(err);
      }

      // eslint-disable-next-line no-shadow
      return readdir(outputDir, (err, files) => {
        if (err) {
          return done(err);
        }
        expect(files).to.deep.equal(['main.js', 'one.js', 'two.js']);
        return done();
      });
    });
  });

  it('can use a global filter', done => {
    webpack(webpackConfig4, err => {
      if (err) {
        return done(err);
      }

      // eslint-disable-next-line no-shadow
      return readdir(outputDir, (err, files) => {
        if (err) {
          return done(err);
        }
        expect(files).to.deep.equal(['main.js', 'one.css']);
        return done();
      });
    });
  });

  afterEach(done => {
    del(outputDir).then(() => done());
  });
});

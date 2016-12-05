import 'core-js/modules/es7.array.includes';

export default class SuppressEntryChunksPlugin {
  constructor(files) {
    this.files = Array.isArray(files) ? files : [files];
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      compilation.chunks.forEach((chunk) => {
        // if (this.files.skip.indexOf(chunk.name) >= 0) {
        if (this.files.includes(chunk.name)) {
          // eslint-disable-next-line no-param-reassign
          chunk.files.forEach(file => delete compilation.assets[file]);
        }
      });
      callback();
    });
  }
}

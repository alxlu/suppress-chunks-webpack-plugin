/* @flow */
import 'core-js/modules/es7.array.includes';

type F = Array<Object> | Array<string> | string;
type O = { filter: string | Array<string>; keep: boolean };

export default class SuppressEntryChunksPlugin {
  filter: Array<string>;
  keep: boolean;
  files: Array<{ name: string; extension: string | void}>;
  constructor(files: F, { filter, keep }: O = { filter: [], keep: false }) {
    const fileList: Array<any> = Array.isArray(files) ? files : [files];
    this.filter = Array.isArray(filter) ? filter : [filter];
    this.files = fileList.map((file) => {
      if (typeof file === 'string') {
        return { name: file, extension: void 0 };
      }
      return file;
    });
    this.keep = keep;
  }

  apply(compiler: Object) {
    compiler.plugin('emit', (compilation, callback) => {
      compilation.chunks.forEach((chunk) => {
        if (this.files.map(file => file.name).includes(chunk.name)) {
          // eslint-disable-next-line no-param-reassign
          chunk.files.forEach(file => delete compilation.assets[file]);
        }
      });
      callback();
    });
  }
}

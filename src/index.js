/* @flow */

type F = Array<Object> | Array<string> | string;
type O = { filter: string | null, keep: boolean };

export default class SuppressEntryChunksPlugin {
  filter: string | null;
  keep: boolean;
  files: Array<{ name: string, match: string | null, keep: boolean }>;
  constructor(files: F, { filter, keep }: O = { filter: null, keep: false }) {
    const fileList: Array<any> = Array.isArray(files) ? files : [files];
    this.filter = filter;
    this.files = fileList.map(file => {
      if (typeof file === 'string') {
        return { name: file, match: null, keep: false };
      }
      return { match: null, keep: false, ...file };
    });
    this.keep = keep;
  }

  apply(compiler: Object) {
    compiler.hooks.emit.tapAsync(
      this.constructor.name,
      (compilation, callback) => {
        compilation.chunks.forEach(chunk => {
          if (this.files.map(file => file.name).includes(chunk.name)) {
            const { match, keep } = this.files.find(f => f.name === chunk.name);

            chunk.files
              .filter(file => {
                if (match !== null) {
                  const regexp = new RegExp(match);
                  return keep ? !regexp.test(file) : regexp.test(file);
                } else if (this.filter !== null) {
                  const regexp = new RegExp(this.filter);
                  return this.keep ? !regexp.test(file) : regexp.test(file);
                }
                return true;
              })
              .forEach(file => {
                // eslint-disable-next-line no-param-reassign
                chunk.files = chunk.files.filter(f => f !== file);
                // eslint-disable-next-line no-param-reassign
                delete compilation.assets[file];
              });
          }
        });
        callback();
      }
    );
  }
}

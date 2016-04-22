// dependencies
import Plugin from 'abigail-plugin';
import chalk from 'chalk';
import stringRaw from 'string-raw';
import meta from 'abigail/package.json';
import flattenDeep from 'lodash.flattendeep';

// @class Exit
export default class Exit extends Plugin {
  static output = chalk.magenta(stringRaw`

              _ |_ . _  _ .|
             (_||_)|(_)(_|||    ${chalk.grey(`v${meta.version}`)}
             _/                 ${chalk.grey.inverse('a minimal task runner.')}

                    ${chalk.white.underline('github.com/abigailjs/abigail#usage')}
  `);

  /**
  * @method pluginWillAttach
  * @returns {undefined}
  */
  pluginWillAttach() {
    let strictCode = 0;
    const isStrict = this.opts.value === 'strict' || this.opts.strict;
    if (isStrict) {
      this.opts.process.stderr.on('data', () => {
        strictCode = 1;
      });
    }

    const task = this.getProps().task || [];
    if (task.length) {
      this.subscribe('task-end', (results) => {
        const scripts = flattenDeep(results);
        const code = scripts.reduce((prev, current) => prev > 0 || current.exitCode > 0 ? 1 : 0, 0);
        this.subscribe('exit', () => this.opts.process.exit(code || strictCode), true);
      }, true);
      return;
    }

    this.opts.process.stdout.write(this.constructor.output);
    this.opts.process.stdout.write('\n');
    this.opts.process.exit(1);
  }
}

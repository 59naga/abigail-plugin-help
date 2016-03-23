// dependencies
import Plugin from 'abigail-plugin';
import chalk from 'chalk';
import meta from 'abigail/package.json';
import flattenDeep from 'lodash.flattendeep';

// @class Exit
export default class Exit extends Plugin {
  static output = chalk.magenta(String.raw`

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
    this.code = 1;
    this._handleExit = () => this.opts.process.exit(this.code);

    const task = this.parent.task || [];
    if (task.length) {
      this.parent.once('task-end', (results) => {
        const scripts = flattenDeep(results);
        this.code = scripts.reduce((prev, current) => prev > 0 || current.exitCode > 0 ? 1 : 0, 0);
        this.parent.once('exit', this._handleExit);
      });
      return;
    }

    this.opts.process.stdout.write(this.constructor.output);
    this.opts.process.stdout.write('\n');
    this.opts.process.exit(this.code);
  }

  /**
  * @method abort
  * @returns {undefined}
  */
  abort() {
    super.abort();

    if (this._handleExit) {
      this.parent.removeListener('exit', this._handleExit);
    }
  }
}

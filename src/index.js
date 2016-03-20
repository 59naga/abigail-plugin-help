// dependencies
import chalk from 'chalk';
import meta from 'abigail/package.json';
import Plugin from 'abigail-plugin';

// main
export default class Help extends Plugin {
  static output = chalk.magenta(String.raw`

              _ |_ . _  _ .|
             (_||_)|(_)(_|||    ${chalk.grey(`v${meta.version}`)}
             _/                 ${chalk.grey.inverse('a minimal task runner.')}

                       ${chalk.white.underline('github.com/59naga/abigail#usage')}
  `);

  /**
  * @method pluginWillAttach
  * @returns {undefined}
  */
  pluginWillAttach() {
    this.parent.removeAllListeners();

    this.opts.process.stdout.write(Help.output);
    this.opts.process.stdout.write('\n');
    this.opts.process.exit(1);
  }
}

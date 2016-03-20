// dependencies
import AsyncEmitter from 'carrack';
import sinon from 'sinon';
import assert from 'power-assert';
import meta from 'abigail/package.json';

// target
import Help from '../src';

// specs
describe('Help', () => {
  it('should be remove the parent of listeners, exit in 1', () => {
    const emitter = new AsyncEmitter;
    const process = {
      cwd: () => process.cwd(),
      exit: sinon.spy(),
      stdout: {
        write: sinon.spy(),
      },
    };

    // eslint-disable-next-line no-unused-vars
    const help = new Help(emitter, { process });

    return emitter.emit('beforeImmediate').then(() => {
      assert(process.stdout.write.args[0][0].match(`v${meta.version}`));
      assert(process.stdout.write.callCount === 2);
      assert(process.exit.calledOnce);
      assert(process.exit.calledWith(1));
    });
  });
});

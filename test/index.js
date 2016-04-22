// dependencies
import AsyncEmitter from 'carrack';
import sinon from 'sinon';
import assert from 'power-assert';
import meta from 'abigail/package.json';

// target
import Exit from '../src';

// fixture
const createProcess = () => {
  const stderr = new AsyncEmitter;
  stderr.write = sinon.spy((data) => {
    stderr.emit('data', data);
  });
  return {
    cwd: () => process.cwd(),
    exit: sinon.spy(),
    stdout: {
      write: sinon.spy(),
    },
    stderr,
  };
};

// specs
describe('Exit', () => {
  describe('plugin lifecycle', () => {
    it('if there is no task, it should be exit in 1', () => {
      const emitter = new AsyncEmitter;
      const process = createProcess();

      // eslint-disable-next-line no-unused-vars
      const exit = new Exit(emitter, true, { process });

      return emitter.emit('attach-plugins').then(() => {
        assert(process.stdout.write.args[0][0].match(`v${meta.version}`));
        assert(process.stdout.write.callCount === 2);
        assert(process.exit.calledOnce);
        assert(process.exit.args[0][0] === 1);
      });
    });

    it('if the exit code of the task is all 0, it should be exit in 0', () => {
      const emitter = new AsyncEmitter;
      const process = createProcess();
      // eslint-disable-next-line no-unused-vars
      const exit = new Exit(emitter, true, { process });

      exit.setProps({
        task: [[[
          { main: { raw: 'echo foo' } },
        ]]],
      });

      return emitter.emit('attach-plugins')
      .then(() => emitter.emit('task-end', [{ exitCode: 0 }]))
      .then(() => emitter.emit('exit'))
      .then(() => {
        assert(process.exit.calledOnce);
        assert(process.exit.args[0][0] === 0);
      });
    });

    it('unless the exit code of the task is all 0, it should be exit in 1', () => {
      const emitter = new AsyncEmitter;
      const process = createProcess();
      // eslint-disable-next-line no-unused-vars
      const exit = new Exit(emitter, true, { process });

      exit.setProps({
        task: [[[
          { main: { raw: 'echo foo' } },
        ]]],
      });

      return emitter.emit('attach-plugins')
      .then(() => emitter.emit('task-end', [{ exitCode: 1 }]))
      .then(() => emitter.emit('exit'))
      .then(() => {
        assert(process.exit.calledOnce);
        assert(process.exit.args[0][0] === 1);
      });
    });

    it('if abort is executed, it should stop listen of exit', () => {
      const emitter = new AsyncEmitter;
      const process = createProcess();
      const exit = new Exit(emitter, true, { process });

      exit.setProps({
        task: [[[
          { main: { raw: 'echo foo' } },
        ]]],
      });

      return emitter.emit('attach-plugins')
      .then(() => emitter.emit('task-end', [{ exitCode: 0 }]))
      .then(() => exit.abort())
      .then(() => emitter.emit('exit'))
      .then(() => {
        assert(process.exit.calledOnce === false);
      });
    });

    it('if strict is true, it should be exit in 1 when receive stderr', () => {
      const emitter = new AsyncEmitter;
      const process = createProcess();
      const exit = new Exit(emitter, 'strict', { process });

      exit.setProps({
        task: [[[
          { main: { raw: 'echo foo' } },
        ]]],
      });

      return emitter.emit('attach-plugins')
      .then(() => emitter.emit('task-end', [{ exitCode: 0 }]))
      .then(() => process.stderr.write('module not found in webpack'))
      .then(() => emitter.emit('exit'))
      .then(() => {
        assert(process.exit.callCount === 1);
        assert(process.exit.args[0][0] === 1);
      });
    });
  });
});

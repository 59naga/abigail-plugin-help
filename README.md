Abigail Exit Plugin
---

<p align="right">
  <a href="https://npmjs.org/package/abigail-plugin-exit">
    <img src="https://img.shields.io/npm/v/abigail-plugin-exit.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/abigailjs/abigail-plugin-exit">
    <img src="http://img.shields.io/travis/abigailjs/abigail-plugin-exit.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/abigailjs/abigail-plugin-exit/coverage">
    <img src="https://img.shields.io/codeclimate/github/abigailjs/abigail-plugin-exit.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/abigailjs/abigail-plugin-exit">
    <img src="https://img.shields.io/codeclimate/coverage/github/abigailjs/abigail-plugin-exit.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/abigailjs/abigail-plugin-exit">
    <img src="https://img.shields.io/gemnasium/abigailjs/abigail-plugin-exit.svg?style=flat-square">
  </a>
</p>

No installation
---

> abigail built-in plugin

Usage
---
if the task is not specified and this plugin is enabled, it to exit in 1.

```bash
abby && echo pass || echo fail
#
#              _ |_ . _  _ .|
#             (_||_)|(_)(_|||    v1.0.0
#             _/                 a minimal task runner.
#
#                    github.com/abigailjs/abigail#usage
# fail
```

moreover. unless the task exit code are all 0, it to exit in 1.

```bash
abby test lint --no-watch && echo pass || echo fail
# ...
# +    1 ms @_@ task end test, lint. exit code 0, 1.
# +    1 ms @_@; i'm terribly sorry...
# fail
```

the latter is turned off by the [abigail-plugin-watch](https://github.com/abigailjs/abigail-plugin-watch#usage).

## switch to strict mode

if specify `--exit strict`, it exits in 1 when detect `stderr`.

```bash
abby webpack --parse raw --no-watch --exit strict
# +    1 ms @_@ task start build.
# ERROR in Entry module not found: Error: Cannot resolve module 'babel' in /Users/59naga/Downloads/boilerplate-browser-babel
# +    1 ms @_@ task end build. exit code 1.
# +    1 ms @_@; i'm terribly sorry...

# without `strict` becomes exit in 0
abby webpack --parse raw --no-watch
# ...
# +    1 ms @_@ task end build. exit code 0.
```

use `abigail.plugins.exit` field in `package.json`
---

```js
{
  // ...
  "abigail": {
    "plugins": {
      "exit": "strict"
    }
  }
}
```

See also
---
* [abigailjs/abigail](https://github.com/abigailjs/abigail#usage)
* [abigailjs/abigail-plugin](https://github.com/abigailjs/abigail-plugin#usage)

Development
---
Requirement global
* NodeJS v5.7.0
* Npm v3.7.1

```bash
git clone https://github.com/abigailjs/abigail-plugin-exit
cd abigail-plugin-exit
npm install

npm test
```

License
---
[MIT](http://abigailjs.mit-license.org/)

<h1 align="left">sevl</h1>

[![npm version][npm-src]][npm-href]
[![types][types-src]][types-href]
[![size][size-src]][size-href]
[![coverage][coverage-src]][coverage-href]
[![vulnerabilities][vulnerabilities-src]][vulnerabilities-href]
[![dependencies][dep-src]][dep-href]
[![devDependencies][devDep-src]][devDep-href]
[![License][license-src]][license-href]

> small .env loader

## Installation
```bash
$ npm i sevl
```

## Usage
```js
import sevl from 'sevl';

sevl() //asyncronously imports .env to process.env
```

### `sevl(config: Config)`
#### `Config`
|              | default       | description                      |
|:-------------|:--------------|:---------------------------------|
| `cwd`        | process.cwd() | current work dir                 |
| `bufferSize` | 4069          | buffer size of stream            |

## Licence
MIT License, see [LICENSE](./LICENSE)

[npm-src]: https://badgen.net/npm/v/sevl
[npm-href]: https://www.npmjs.com/package/sevl
[size-src]: https://badgen.net/packagephobia/install/sevl
[size-href]: https://packagephobia.com/result?p=sevl
[types-src]: https://badgen.net/npm/types/sevl
[types-href]: https://www.npmjs.com/package/sevl
[coverage-src]: https://coveralls.io/repos/github/sovrin/sevl/badge.svg?branch=master
[coverage-href]: https://coveralls.io/github/sovrin/sevl?branch=master
[vulnerabilities-src]: https://snyk.io/test/github/sovrin/sevl/badge.svg
[vulnerabilities-href]: https://snyk.io/test/github/sovrin/sevl
[dep-src]: https://badgen.net/david/dep/sovrin/sevl
[dep-href]: https://badgen.net/david/dep/sovrin/sevl
[devDep-src]: https://badgen.net/david/dev/sovrin/sevl
[devDep-href]: https://badgen.net/david/dev/sovrin/sevl
[license-src]: https://badgen.net/github/license/sovrin/sevl
[license-href]: LICENSE

# deno-path-from-file-url

[![Npm Version][package_version_badge]][package_link]
[![MIT License][license_badge]][license_link]
[![Coverage][coverage_badge]][coverage_link]

[coverage_badge]: https://img.shields.io/codecov/c/github/fisker/deno-path-from-file-url.svg?style=flat-square
[coverage_link]: https://app.codecov.io/gh/fisker/deno-path-from-file-url
[license_badge]: https://img.shields.io/npm/l/deno-path-from-file-url.svg?style=flat-square
[license_link]: https://github.com/fisker/deno-path-from-file-url/blob/main/license
[package_version_badge]: https://img.shields.io/npm/v/deno-path-from-file-url.svg?style=flat-square
[package_link]: https://www.npmjs.com/package/deno-path-from-file-url

> Convert file URLs to paths.

The functionality is bundled from [`@std/path`](https://jsr.io/@std/path).

## Install

```sh
yarn add deno-path-from-file-url
```

## Usage

```js
import assert from 'node:assert'
import fromFileUrl from 'deno-path-from-file-url'

assert.equal(fromFileUrl('file:///home/foo'), '\\home\\foo')
assert.equal(fromFileUrl('file:///C:/Users/foo'), 'C:\\Users\\foo')
assert.equal(fromFileUrl('file://localhost/home/foo'), '\\home\\foo')
assert.equal(fromFileUrl('file:///home/foo'), '/home/foo')
```

For POSIX-specific functions:

```js
import assert from 'node:assert'
import fromFileUrl from 'deno-path-from-file-url/posix'

assert.equal(fromFileUrl('file:///home/foo'), '/home/foo')
```

For Windows-specific functions:

```js
import assert from 'node:assert'
import fromFileUrl from 'deno-path-from-file-url/windows'

assert.equal(fromFileUrl('file:///home/foo'), '\\home\\foo')
```

## Motivation

Prettier need this functionality, can't use [`node:url`.`fileURLToPath()`](https://nodejs.org/api/url.html#urlfileurltopathurl-options), can't install `@std/path` either since Prettier supports install from GitHub and not all NPM clients support `jsr:` protocol.

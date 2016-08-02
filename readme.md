# js-lang-exception

[![Recent Version][npm-badge]][npm-url]
[![Travis CI - Build Status][travis-badge]][travis-url]
[![Coveralls - Code Coverage Status][cov-badge]][cov-url]
[![David - Dependencies][dep-badge]][dep-url]
[![David - DevDependencies][dev-dep-badge]][dev-dep-url]
[![Doclets][doclets-badge]][doclets-url]
[![Gitter - Repository Chat][chat-badge]][chat-url]

## Synopsis

An extendable, testable and intuitively usable **error-handling Exception class** built on the standard, 
built-in Error object. Written in [UMD][umd-link].

Compatible with **ECMAScript 6**.

## Install

```
npm install js-lang-exception
```

## Usage - Include/Initialization

 - AMD (e.g.: RequireJS)
 
 ```javascript
 define(['js-lang-exception'], function(Exception) {        
     // you can now use Exception
 });
 ```
 
 - CommonJS (e.g.: NodeJS)
 
 ```javascript
 var Exception = require('js-lang-exception');
 
 // you can now use Exception
  ```
 
 - Browser
 
 ```javascript
 // load the source from "node_modules/js-lang-exception/dist/js-lang-exception.js" - for development
 // or from "node_modules/js-lang-exception/dist/js-lang-exception.min.js" - for production
 
 var Exception = js_lang_exception; // it is available in the global namespace
 
 // you can now use Exception
  ```
 
## Usage - After Initialization

## Documentation

Check the source 
[here](https://github.com/jsopenstd/js-lang-exception/blob/master/src/js-lang-exception.js)
since it's well structured and documented. Also you can find the rendered jsDoc documentation on 
[Doclets.io](https://doclets.io/jsopenstd/js-lang-exception/master). 

Also, check the [unit tests](https://github.com/jsopenstd/js-lang-exception/blob/master/tests/tests.js) 
in order to grasp the full-fledged capabilities.

Have fun! ;)

## Issues

If you find any bugs and other issues, check the
[GSDC Guide - Issues](https://github.com/openstd/general-software-development-contribution-guide#issues)
section on how to submit issues in a standardized way on
[the project's issues page](https://github.com/jsopenstd/js-lang-exception/issues).

In case you have any suggestions regarding the project (features, additional capabilities, etc.), check the
[GSDC Guide - Suggestions](https://github.com/openstd/general-software-development-contribution-guide#suggestions)
section on how to submit suggestions in an easy, standardized way on
[the project's issues page](https://github.com/jsopenstd/js-lang-exception/issues).

## Contribution

In order to contribute to this project, check the
[GSDC Guide](https://github.com/openstd/general-software-development-contribution-guide)
for an easy, standardized way on how to contribute to projects.

## Support

If you **by any means** find this project useful,
[consider supporting the organization](https://github.com/jsopenstd/jsopenstd/blob/master/support.md).

There are multiple options to support the project and the developers.
Any means of support is beneficial and helpful.

## License

[MIT](license.md) @ Richard King

[npm-badge]:     https://img.shields.io/npm/v/js-lang-exception.svg
[npm-url]:       https://www.npmjs.com/package/js-lang-exception

[travis-badge]:  https://travis-ci.org/jsopenstd/js-lang-exception.svg?branch=master
[travis-url]:    https://travis-ci.org/jsopenstd/js-lang-exception

[cov-badge]:     https://coveralls.io/repos/github/jsopenstd/js-lang-exception/badge.svg?branch=master
[cov-url]:       https://coveralls.io/github/jsopenstd/js-lang-exception

[dep-badge]:     https://david-dm.org/jsopenstd/js-lang-exception.svg
[dep-url]:       https://david-dm.org/jsopenstd/js-lang-exception

[dev-dep-badge]: https://david-dm.org/jsopenstd/js-lang-exception/dev-status.svg
[dev-dep-url]:   https://david-dm.org/jsopenstd/js-lang-exception#info=devDependencies

[doclets-badge]: https://img.shields.io/badge/style-on_doclets-brightgreen.svg?style=flat-square&label=docs
[doclets-url]:   https://doclets.io/jsopenstd/js-lang-exception/master   

[chat-badge]:    https://badges.gitter.im/jsopenstd/js-lang-exception.svg
[chat-url]:      https://gitter.im/jsopenstd/js-lang-exception?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge

[partial-link]:  https://github.com/jsopenstd/jsopenstd/blob/master/readme.md#partial 
[umd-link]:      https://github.com/jsopenstd/jsopenstd/blob/master/readme.md#umd 

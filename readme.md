# js-lang-exception

[![Recent Version][npm-badge]][npm-url]
[![Travis CI - Build Status][travis-badge]][travis-url]
[![Coveralls - Code Coverage Status][cov-badge]][cov-url]
[![David - Dependencies][dep-badge]][dep-url]
[![David - DevDependencies][dev-dep-badge]][dev-dep-url]
[![Doclets][doclets-badge]][doclets-url]
[![Gitter - Repository Chat][chat-badge]][chat-url]

## Synopsis

An extendable, testable and intuitively usable **error-handling Exception class** built and based on the standard, 
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

 - General usage:
 
 ```javascript
 // similar to the ordinary Error
 throw new Exception();
 
 // with a custom message
 throw new Exception('With a custom message');
 
 // custom message with arguments
 throw new Exception(['With a custom message and one argument: {}', 1]);
 throw new Exception(['With 2 arguments: {}, {}', 1, 2]);
 throw new Exception(['With multiple arguments: {} + {} = {}', 20, 22, 42]);
  
 // custom message with arguments - with direct indexing
 // will be "With directly addressed arguments: {3} - {2} - {1}"
 // **NOTE** - array indexing starts with 0 after the message, not 1,
 // so here the {2} will be 3, {1} will be 2 and lastly {0} will be the number 1 from the array 
 throw new Exception(['With directly addressed arguments: {2} - {1} - {0}', 1, 2, 3]);
 
 // custom message + custom ID
 throw new Exception('With another message', 42);
 throw new Exception('With another message', 1001);
 ```
 
 - Advanced usage:
 
 ```javascript
 // custom message without arguments + custom ID + custom data
 throw new Exception('With another nice message', 1404, {
     custom : false,
     data   : 1492
 });
 
 // **NOTE** - if an array is passed with the custom message only,
 // it will be just as if it would be passed as a string, chill and wonder ;)
 throw new Exception(['With another nice message'], 1404, {
     custom : false,
     data   : 1492
 });
 
 // custom message with arguments + custom ID + custom data
 throw new Exception(['With another nice message with: {}, {} and {}', 1, 2, 3], 1404, {
     custom : false,
     data   : 1492
 });
 
 // custom message + custom data - ignoring custom ID by passing **null** as an argument for the ID
 throw new Exception('With a message.', null, {custom : 'data'});
 
 // custom ID + custom data - ignoring custom message by passing **null** as an argument for the message
 throw new Exception(null, 1984, {custom : 'data'});
 
 // custom data - ignoring both custom message and custom ID
 throw new Exception(null, null, {custom : 'data'});
 ```
 
 - Advanced usage with custom exceptions
 
 ```javascript
 // subclassing - **ES5**
 function CustomException() {
     // call with the default values
     Exception.call(this);
      
     // also can be called with custom arguments
     // Exception.call(this, 'Custom message', 1001, {custom : 'data'});
 }
 
 CustomException.prototype = Object.create(Exception.prototype);
 CustomException.constructor = CustomException;
 
 try {
     throw new CustomException();
 } catch (e) {
     // check whether custom message, custom ID and custom data was passed
     console.log(e.hasMessage());
     console.log(e.hasID());
     console.log(e.hasData());
     
     // get custom message, ID and data
     console.log(e.getMessage());
     console.log(e.getID());
     console.log(e.getData());
     
     // you can check them, these will be all === true
     console.log(e instanceof CustomException);
     console.log(e instanceof Exception);
     console.log(e instanceof Error);
 }
 ```
 
 ```javascript
  // subclassing - **ES6**
  class CustomException extends Exception {
      constructor() {
          // call with the default values
          super();
  
          // also can be called with custom arguments
          // super('Custom message', 1001, {custom : 'data'});
      }
  }
  
  try {
      throw new CustomException();
  } catch (e) {
      // check whether custom message, custom ID and custom data was passed
      console.log(e.hasMessage());
      console.log(e.hasID());
      console.log(e.hasData());
      
      // get custom message, ID and data
      console.log(e.getMessage());
      console.log(e.getID());
      console.log(e.getData());
      
      // you can check them, these will be all === true
      console.log(e instanceof CustomException);
      console.log(e instanceof Exception);
      console.log(e instanceof Error);
  }
  ```

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

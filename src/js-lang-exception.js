/*
 | ---------------------------------------------------------------------------------------------------------------------
 | An extendable, testable and intuitively usable **error-handling Exception class**
 | built and based on the standard, **built-in Error** object.
 | ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * More information on [JavaScript Open Standards]{@link https://github.com/jsopenstd/jsopenstd}.
 *
 * @namespace js.lang
 *
 * @version 1.0.0
 *
 * @author Richard King <richrdkng@gmail.com> [GitHub]{@link https://github.com/richrdkng}
 * @license [MIT]{@link https://github.com/jsopenstd/js-partial-foreach/blob/master/license.md}
 */

/**
 * UMD - [returnExports.js pattern]{@link https://github.com/umdjs/umd/blob/master/templates/returnExports.js}
 * For more information and license, check the link below:
 * [UMD GitHub Repository]{@link https://github.com/umdjs/umd}
 */
(function(root, factory) {
    // AMD
    /* istanbul ignore next: ignore coverage test for UMD */
    if (typeof define === 'function' && define.amd) {
        define([], factory);

    // CommonJS
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();

    // Browser
    } else {
        root.js_lang_exception = factory();
    }
}(this, function() {
    'use strict';

    /**
     * @private
     * @typedef {Object} Message
     *
     * @property {string} raw
     * @property {string} formatted
     * @property {Array}  args
     */

    /**
     * An extendable, testable and intuitively usable **error-handling Exception class** built and based
     * on the standard, **built-in Error** object.
     *
     * A custom message can be used for the Exception, with easy message formatting capabilities similar to Python's
     * **'{}'.format()** function by using a string message containing '{}' and providing additional data to fill the
     * string with.
     *
     * A custom ID and also additional, custom data can be set with the exception for further identification and usage.
     *
     * @public
     * @class Exception
     * @memberOf js.lang
     *
     * @param {string|Array|null} [message] - The custom message of the exception.
     *
     *                                        If it is a string, no additional formatting will be applied to
     *                                        the custom message.
     *
     *                                        If it is an array, the first element of the array will be used as the
     *                                        source message, that will be used for additional formatting.
     *                                        The following elements in the array will be used for filling up the
     *                                        custom source message. To index custom arguments, use '{}' or '{#}'.
     *
     *                                        To leave the message with the default value or in case of
     *                                        inheritance (extending the Exception), unchanged, set it to **null**.
     *
     * @param {int|null} [id] - A custom ID for the Exception.
     *
     *                          To leave the message with the default value or in case of inheritance
     *                          (extending the Exception), unchanged, set it to **null**.
     *
     * @param {*|null} [data] - Custom data, which will be stored and can be used. If it is **null or undefined**,
     *                          it will be skipped and will not be stored.
     *
     *                          To leave the message with the default value or in case of inheritance
     *                          (extending the Exception), unchanged, set it to **null**.
     *
     * @param {boolean} [throwImmediately=true] - Sets whether the Exception should be thrown immediately
     *                                            after the instantiation. The Exception by default is automatically
     *                                            thrown after instantiation.
     *
     *                                            **This option is mostly used for unit testing and
     *                                            debugging purposes.**
     *
     * @example
     * throw new Exception();
     *
     * @example
     * throw new Exception('With a custom message');
     *
     * @example
     * // custom message with arguments
     * throw new Exception(['With a custom message and one argument: {}', 1]);
     * throw new Exception(['With 2 arguments: {}, {}', 1, 2]);
     * throw new Exception(['With multiple arguments: {} + {} = {}', 20, 22, 42]);
     *
     * // custom message with arguments - with direct indexing
     * // will be "With directly addressed arguments: {3} - {2} - {1}"
     * // **NOTE** - array indexing starts with 0 after the message, not 1,
     * // so here the {2} will be 3, {1} will be 2 and lastly {0} will be the number 1 from the array
     * throw new Exception(['With directly addressed arguments: {2} - {1} - {0}', 1, 2, 3]);
     *
     * @example
     * // custom message + custom ID
     * throw new Exception('With another message', 42);
     * throw new Exception('With another message', 1001);
     *
     * @example
     * // custom message without arguments + custom ID + custom data
     * throw new Exception('With another nice message', 1404, {
     *     custom : false,
     *     data   : 1492
     * });
     *
     * // **NOTE** - if an array is passed with the custom message only,
     * // it will be just as if it would be passed as a string, chill and wonder ;)
     * throw new Exception(['With another nice message'], 1404, {
     *     custom : false,
     *     data   : 1492
     * });
     *
     * @example
     * // custom message with arguments + custom ID + custom data
     * throw new Exception(['With another nice message with: {}, {} and {}', 1, 2, 3], 1404, {
     *     custom : false,
     *     data   : 1492
     * });
     *
     * @example
     * // subclassing - ES5
     * function CustomException() {
     *     // call with the default values
     *     Exception.call(this);
     *
     *     // also can be called with custom arguments
     *     Exception.call(this, 'Custom message', 1001, {custom : 'data'});
     * }
     *
     * CustomException.prototype = Object.create(Exception.prototype);
     * CustomException.constructor = CustomException;
     *
     * try {
     *     throw new CustomException();
     *
     * } catch (e) {
     *     // check whether custom message, custom ID and custom data was passed
     *     console.log(e.hasMessage());
     *     console.log(e.hasID());
     *     console.log(e.hasData());
     *
     *     // get custom message, ID and data
     *     console.log(e.getMessage());
     *     console.log(e.getID());
     *     console.log(e.getData());
     *
     *     // you can check them, these will be all === true
     *     console.log(e instanceof CustomException);
     *     console.log(e instanceof Exception);
     *     console.log(e instanceof Error);
     * }
     *
     * @example
     * // subclassing - ES6
     * class CustomException extends Exception {
     *     constructor() {
     *         // call with the default values
     *         super();
     *
     *         // also can be called with custom arguments
     *         super('Custom message', 1001, {custom : 'data'});
     *     }
     * }
     *
     * try {
     *     throw new CustomException();
     *
     * } catch (e) {
     *     // check whether custom message, custom ID and custom data was passed
     *     console.log(e.hasMessage());
     *     console.log(e.hasID());
     *     console.log(e.hasData());
     *
     *     // get custom message, ID and data
     *     console.log(e.getMessage());
     *     console.log(e.getID());
     *     console.log(e.getData());
     *
     *     // you can check them, these will be all === true
     *     console.log(e instanceof CustomException);
     *     console.log(e instanceof Exception);
     *     console.log(e instanceof Error);
     * }
     */
    function Exception(message, id, data, throwImmediately) {

            /**
             * @private
             * @type {Message}
             */
        var _message = {
                raw       : '',
                formatted : '',
                args      : []
            },

            /**
             * @private
             * @type {number|null}
             */
            _id = null,

            /**
             * @private
             * @type {*|null}
             */
            _data = null,

            /**
             * @private
             * @type {boolean}
             */
            _throw = true;

        if (typeof message === 'string') {
            _message.raw = message;

        } else if (Object.prototype.toString.call(message) === '[object Array]') {
            _message.raw  = message[0];
            _message.args = message.splice(1);
        }

        if (typeof id === 'number' &&
            id === id && // NaN guard
            id > -Infinity &&
            id < Infinity ) {

            _id = id;
        }

        if (data !== null &&
            typeof data !== 'undefined') {

            _data = data;
        }

        this._message = _message;
        this._id      = _id;
        this._data    = _data;

        if (throwImmediately === false) {
            _throw = false;
        }

        if (_throw) {
            this.throw();
        }
    }

    // inherit from the built-in Error object.
    Exception.prototype = Object.create(Error.prototype);
    Exception.prototype.constructor = Exception;

    /**
     * Returns whether the Exception has a custom message, which was set during the instantiation of the Exception.
     *
     * @public
     * @instance
     * @function hasMessage
     * @memberOf js.lang.Exception
     *
     * @returns {boolean} Whether the Exception has a custom message or not.
     */
    Exception.prototype.hasMessage = function() {
        return this._message.formatted !== '';
    };

    /**
     * Returns the formatted message of the Exception, which was set during the instantiation of the Exception.
     *
     * @public
     * @instance
     * @function getMessage
     * @memberOf js.lang.Exception
     *
     * @returns {string} The formatted message of the Exception.
     */
    Exception.prototype.getMessage = function() {
        return this._message.formatted;
    };

    /**
     * Returns whether the Exception has a custom ID, which was set during the instantiation of the Exception.
     *
     * @public
     * @instance
     * @function hasID
     * @memberOf js.lang.Exception
     *
     * @returns {boolean} Whether the Exception has a custom ID or not.
     */
    Exception.prototype.hasID = function() {
        return this._id !== null;
    };

    /**
     * Returns the ID of the Exception, which was set during the instantiation of the Exception.
     *
     * @public
     * @instance
     * @function getID
     * @memberOf js.lang.Exception
     *
     * @returns {number} The custom ID of the Exception.
     */
    Exception.prototype.getID = function() {
        return this._id;
    };

    /**
     * Returns whether the Exception has custom data passed with during instantiation.
     *
     * @public
     * @instance
     * @function hasData
     * @memberOf js.lang.Exception
     *
     * @returns {boolean} Whether the Exception has custom data or not.
     */
    Exception.prototype.hasData = function() {
        return this._data !== null;
    };

    /**
     * Returns the additional data, which was passed to the Exception during instantiation.
     *
     * @public
     * @instance
     * @function getData
     * @memberOf js.lang.Exception
     *
     * @returns {*} The custom data.
     */
    Exception.prototype.getData = function() {
        return this._data;
    };

    /**
     * Throws the Exception with the given arguments.
     *
     * **This function is useful mostly for unit testing and debugging purposes. The Exception will be thrown
     * automatically during instantiation by default and this function should not be called in most cases.**
     *
     * @public
     * @instance
     * @function throw
     * @memberOf js.lang.Exception
     *
     * @returns {void}
     */
    Exception.prototype.throw = function() {
        var msg = this._message;

        msg.formatted = this.format(msg.raw, msg.args);

        if (this.hasMessage()) {
            if (this.hasID()) {
                this.stack = (new Error(this.getMessage(), this.getID())).stack;
            } else {
                this.stack = (new Error(this.getMessage())).stack;
            }

        }

        this.stack = (new Error()).stack;
    };

    /**
     * A helper function to format Exception messages with {} placeholders similar to Python's .format() function.
     *
     * @protected
     * @instance
     * @function format
     * @memberOf js.lang.Exception
     *
     * @param {string} message - The message to format. To help the formatting, optionally it can with {}.
     * @param {Array}  data    - The data from which the formatted message is generated.
     *
     * @returns {string} The formatted string.
     */
    Exception.prototype.format = function(message, data) {
        var pattern = /(\{)(\d*)(\})/g,
            index   = 0;

        return message.replace(pattern, function(match, left, num, right) {
            /* istanbul ignore next: ignore this condition since RegExp doesn't catch it, if '{' and '}' not present */
            if (left === '{' && right === '}') {
                if (num !== '') {
                    return data[num];
                }

                return data[index++];
            }

            /* istanbul ignore next: ignore this line since at the current state, it is not possible to reach */
            return match;
        });
    };

    return Exception;
}));

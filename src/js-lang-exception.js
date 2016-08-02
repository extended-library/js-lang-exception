/*
 | ---------------------------------------------------------------------------------------------------------------------
 | An extendable, testable and intuitively usable **error-handling Exception class**
 | built and based on the standard, **built-in Error** object.
 | ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * -
 *
 * @namespace js.lang
 *
 * @version 0.0.0
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
     * A private function to format Exception messages.
     *
     * @private
     * @function format
     *
     * @param {string} message
     * @param {Array}  data
     *
     * @returns {string}
     */
    function format(message, data) {
        var pattern = /(\{)(\d*)(\})/g,
            index   = 0;

        return message.replace(pattern, function(match, left, num, right) {
            /* istanbul ignore next: ignore this condition since RegExp doesn't catch it, if "{" and "}" not present */
            if (left === '{' && right === '}') {
                if (num !== '') {
                    return data[+num]; // cast to number
                } else {
                    return data[index++];
                }
            } else {
                return match;
            }
        });
    }

    function isPresent(object) {
        return object !== null && typeof object !== 'undefined';
    }

    function isString(object) {
        return typeof object === 'string';
    }

    function isArray(object) {
        return Object.prototype.toString.call(object) === '[object Array]';
    }

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
     * @public
     * @class Exception
     * @memberOf js.lang
     *
     * @param {string|Array|null} [message=null]
     * @param {int|null}          [id=null]
     * @param {*|null}            [data=null]
     * @param {boolean}           [throwImmediately=true]
     */
    function Exception(message, id, data, throwImmediately) {

            /**
             * @private
             * @type {Message}
             */
        var _message = {
                raw       : '',
                formatted : '',
                args      : [],
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
            _throw = typeof throwImmediately === 'boolean' ? throwImmediately : true;

        if (isPresent(message)) {
            if (isString(message)) {
                _message.raw = message;

            } else if (isArray(message)) {
                _message.raw  = message[0];
                _message.args = message.splice(1);
            }
        }

        if (typeof id === 'number'
            && id === id // NaN guard
            && id > -Infinity
            && id < Infinity ) {

            _id = id;
        }

        if (isPresent(data)) {
            _data = data;
        }

        this._message = _message;
        this._id      = _id;
        this._data    = _data;


        if (_throw) {
            this.throw();
        }
    }

    Exception.prototype = Object.create(Error.prototype);
    Exception.prototype.constructor = Exception;

    /**
     * @public
     * @instance
     * @function hasMessage
     * @memberOf js.lang.Exception
     *
     * @returns {boolean}
     */
    Exception.prototype.hasMessage = function() {
        return this._message.formatted !== '';
    };

    /**
     * @public
     * @instance
     * @function getMessage
     * @memberOf js.lang.Exception
     *
     * @returns {string}
     */
    Exception.prototype.getMessage = function() {
        return this._message.formatted;
    };

    /**
     * @public
     * @instance
     * @function hasID
     * @memberOf js.lang.Exception
     *
     * @returns {boolean}
     */
    Exception.prototype.hasID = function() {
        return this._id !== null;
    };

    /**
     * @public
     * @instance
     * @function getID
     * @memberOf js.lang.Exception
     *
     * @returns {number}
     */
    Exception.prototype.getID = function() {
        return this._id;
    };

    /**
     * @public
     * @instance
     * @function hasData
     * @memberOf js.lang.Exception
     *
     * @returns {boolean}
     */
    Exception.prototype.hasData = function() {
        return this._data !== null;
    };

    /**
     * @public
     * @instance
     * @function getData
     * @memberOf js.lang.Exception
     *
     * @returns {*|null}
     */
    Exception.prototype.getData = function() {
        return this._data;
    };

    /**
     * @public
     * @instance
     * @function throw
     * @memberOf js.lang.Exception
     *
     * @returns {void}
     */
    Exception.prototype.throw = function() {
        var msg = this._message;

        msg.formatted = format(msg.raw, msg.args);

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
     * @protected
     * @instance
     * @function format
     * @memberOf js.lang.Exception
     *
     * @returns {string}
     */
    Exception.prototype.format = function() {

    };

    return Exception;
}));

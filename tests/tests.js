'use strict';

var assert    = require('assert'),
    vars      = require('./variables'),
    Exception = require(vars.path);

module.exports = {
    'Exception' : {
        'default cases' : {
            'check proper Error inheritance' : function() {
                var exception = new Exception(null, null, null, false);

                assert(exception instanceof Error);

                try {
                    throw new Exception();

                } catch (e) {
                    assert(e instanceof Error);
                }
            },

            'empty call' : function() {
                try {
                    throw new Exception();

                } catch (exception) {
                    assert(exception.hasMessage() === false);
                    assert(exception.hasID()      === false);
                    assert(exception.hasData()    === false);
                }
            },

            'custom message - simple' : function() {
                try {
                    throw new Exception('An exception');

                } catch (e) {
                    assert(e.hasMessage() === true);
                    assert(e.getMessage() === 'An exception');

                    assert(e.hasID()   === false);
                    assert(e.hasData() === false);
                }
            },

            'custom message - advanced' : {
                'simple formatting - no argument' : function() {
                    try {
                        throw new Exception(['Another exception']);

                    } catch (e) {
                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Another exception');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }
                },
                'simple formatting - one argument' : function() {
                    try {
                        throw new Exception(['Another exception for: {}', 1]);

                    } catch (e) {
                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Another exception for: 1');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }

                    try {
                        throw new Exception(['Another exception for: {}', 'this case']);

                    } catch (e) {
                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Another exception for: this case');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }
                },
                'simple formatting - multiple arguments' : function() {
                    try {
                        throw new Exception(['Exception: {} {} {}', 1, 2, 3]);

                    } catch (e) {
                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Exception: 1 2 3');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }

                    try {
                        throw new Exception(['Exception: {2} {1} {0}', 1, 2, 3]);

                    } catch (e) {
                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Exception: 3 2 1');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }

                    try {
                        throw new Exception(['Exception: {0} {0} {0}', 1, 2, 3]);

                    } catch (e) {
                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Exception: 1 1 1');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }

                    try {
                        throw new Exception(['Exception: {2} {} {}', 1, 2, 3]);

                    } catch (e) {
                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Exception: 3 1 2');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }

                    try {
                        throw new Exception(['Exception: {} {2} {}', 1, 2, 3]);

                    } catch (e) {
                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Exception: 1 3 2');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }

                    try {
                        throw new Exception(['Exception: {} {} {1}', 1, 2, 3]);

                    } catch (e) {
                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Exception: 1 2 2');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }

                    try {
                        throw new Exception(['Exception: {1} {2} {}', 1, 2, 3]);

                    } catch (e) {
                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Exception: 2 3 1');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }
                }
            },
            'custom message with custom, valid ID' : function() {
                try {
                    throw new Exception('Exception with #0', 0);

                } catch (e) {
                    assert(e.hasMessage() === true);
                    assert(e.getMessage() === 'Exception with #0');

                    assert(e.hasID() === true);
                    assert(e.getID() === 0);

                    assert(e.hasData() === false);
                }

                try {
                    throw new Exception('Exception with #1001', 1001);

                } catch (e) {
                    assert(e.hasMessage() === true);
                    assert(e.getMessage() === 'Exception with #1001');

                    assert(e.hasID() === true);
                    assert(e.getID() === 1001);

                    assert(e.hasData() === false);
                }
            },
            'custom message with custom, invalid ID' : function() {
                try {
                    throw new Exception('Exception', NaN);

                } catch (e) {
                    assert(e.hasMessage() === true);
                    assert(e.getMessage() === 'Exception');

                    assert(e.hasID()   === false);
                    assert(e.hasData() === false);
                }

                try {
                    throw new Exception('Exception', -Infinity);

                } catch (e) {
                    assert(e.hasMessage() === true);
                    assert(e.getMessage() === 'Exception');

                    assert(e.hasID()   === false);
                    assert(e.hasData() === false);
                }

                try {
                    throw new Exception('Exception', +Infinity);

                } catch (e) {
                    assert(e.hasMessage() === true);
                    assert(e.getMessage() === 'Exception');

                    assert(e.hasID()   === false);
                    assert(e.hasData() === false);
                }
            },

            'unit-testing capabilities' : function() {
                assert.throws(
                    function() {
                        throw new Exception();
                    },
                    Exception
                );

                // also works with Error
                assert.throws(
                    function() {
                        throw new Exception();
                    },
                    Error
                );

                // with custom Exception
                class CustomException extends Exception {}

                assert.throws(
                    function() {
                        throw new CustomException();
                    },
                    CustomException
                );

                assert.throws(
                    function() {
                        throw new CustomException();
                    },
                    Exception
                );

                assert.throws(
                    function() {
                        throw new CustomException();
                    },
                    Error
                );

                // another method with throwImmediately=false
                class AnotherCustomException extends Exception {}

                var testableException = new AnotherCustomException(null, null, null, false);

                assert.throws(
                    function() {
                        throw testableException;
                    },
                    AnotherCustomException
                );

                assert.throws(
                    function() {
                        throw testableException;
                    },
                    AnotherCustomException
                );

                assert.throws(
                    function() {
                        throw testableException;
                    },
                    Exception
                );

                assert.throws(
                    function() {
                        throw testableException;
                    },
                    Error
                );
            }
        },
        'extended cases' : {
            'subclassing Exception - Object.create()' : function() {
                function CustomException() {
                    Exception.call(this);
                }

                CustomException.prototype = Object.create(Exception.prototype);
                CustomException.constructor = CustomException;

                try {
                    throw new CustomException();

                } catch (e) {
                    assert(e.hasMessage() === false);
                    assert(e.hasID()      === false);
                    assert(e.hasData()    === false);

                    assert(e instanceof CustomException);
                    assert(e instanceof Exception);
                    assert(e instanceof Error);
                }
            },

            'subclassing Exception - ES6' : {

                // useful for easy structuring end unit-testing exceptions
                'empty extension' : function() {
                    class EmptyCustomException extends Exception {}

                    try {
                        throw new EmptyCustomException();

                    } catch (e) {
                        assert(e instanceof EmptyCustomException);
                        assert(e instanceof Exception);
                        assert(e instanceof Error);
                    }
                },

                'embedded message' : function() {
                    class CustomWithEmbeddedMessageException extends Exception {
                        constructor() {
                            super('The embedded message');
                        }
                    }

                    try {
                        throw new CustomWithEmbeddedMessageException();

                    } catch (e) {
                        assert(e instanceof CustomWithEmbeddedMessageException);
                        assert(e instanceof Exception);
                        assert(e instanceof Error);

                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'The embedded message');

                        assert(e.hasID()   === false);
                        assert(e.hasData() === false);
                    }
                },

                'embedded message with ID' : function() {
                    class CustomWithEmbeddedMessageWithIDException extends Exception {
                        constructor() {
                            super('Embedded message', 42);
                        }
                    }

                    try {
                        throw new CustomWithEmbeddedMessageWithIDException();

                    } catch (e) {
                        assert(e instanceof CustomWithEmbeddedMessageWithIDException);
                        assert(e instanceof Exception);
                        assert(e instanceof Error);

                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Embedded message');

                        assert(e.hasID() === true);
                        assert(e.getID() === 42);

                        assert(e.hasData() === false);
                    }
                },

                'embedded message with ID and custom data' : function() {
                    var customData = {
                        a : 1,
                        b : 'abc',
                        c : [
                            1, 2, 3, '4', true, null
                        ],
                        d : {
                            'funky-name'   : false,
                            'followThe'    : 1,
                            'WhItE rAbBiT' : 0
                        }
                    };

                    class CustomWithEmbeddedMessageWithIDAndDataException extends Exception {
                        constructor() {
                            super('Another embedded message', 1408, customData);
                        }
                    }

                    try {
                        throw new CustomWithEmbeddedMessageWithIDAndDataException();

                    } catch (e) {
                        assert(e instanceof CustomWithEmbeddedMessageWithIDAndDataException);
                        assert(e instanceof Exception);
                        assert(e instanceof Error);

                        assert(e.hasMessage() === true);
                        assert(e.getMessage() === 'Another embedded message');

                        assert(e.hasID() === true);
                        assert(e.getID() === 1408);

                        assert(e.hasData() === true);
                        assert.deepStrictEqual(e.getData(), customData);
                    }
                }
            }
        },
        'edge cases' : {

            // This use-case is useful for unit testing and debugging purposes
            'empty call - throwImmediately=false' : function() {
                var e = new Exception(null, null, null, false);

                assert(e.hasMessage() === false);
                assert(e.hasID()      === false);
                assert(e.hasData()    === false);
            },

            'custom invalid message' : function() {
                try {
                    throw new Exception(false);

                } catch (e) {
                    assert(e.hasMessage() === false);
                    assert(e.hasID()      === false);
                    assert(e.hasData()    === false);
                }

                try {
                    throw new Exception(1);

                } catch (e) {
                    assert(e.hasMessage() === false);
                    assert(e.hasID()      === false);
                    assert(e.hasData()    === false);
                }

                try {
                    throw new Exception({});

                } catch (e) {
                    assert(e.hasMessage() === false);
                    assert(e.hasID()      === false);
                    assert(e.hasData()    === false);
                }
            },

            'custom malformed message' : function() {
                try {
                    throw new Exception(['A malformed exception message {']);

                } catch (e) {
                    assert(e.hasMessage() === true);
                    assert(e.getMessage() === 'A malformed exception message {');

                    assert(e.hasID()      === false);
                    assert(e.hasData()    === false);
                }

                try {
                    throw new Exception(['A malformed exception message { }']);

                } catch (e) {
                    assert(e.hasMessage() === true);
                    assert(e.getMessage() === 'A malformed exception message { }');

                    assert(e.hasID()      === false);
                    assert(e.hasData()    === false);
                }

                try {
                    throw new Exception(['A malformed exception message { ]']);

                } catch (e) {
                    assert(e.hasMessage() === true);
                    assert(e.getMessage() === 'A malformed exception message { ]');

                    assert(e.hasID()      === false);
                    assert(e.hasData()    === false);
                }
            }
        }
    }
};

//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;

/* Package-scope variables */
var PersistentMinimongo2;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/frozeman_persistent-minimongo2/localforage.js                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/*!                                                                                                                 // 1
    localForage -- Offline Storage, Improved                                                                        // 2
    Version 1.2.6                                                                                                   // 3
    https://mozilla.github.io/localForage                                                                           // 4
    (c) 2013-2015 Mozilla, Apache License 2.0                                                                       // 5
*/                                                                                                                  // 6
(function() {                                                                                                       // 7
var define, requireModule, require, requirejs;                                                                      // 8
                                                                                                                    // 9
(function() {                                                                                                       // 10
  var registry = {}, seen = {};                                                                                     // 11
                                                                                                                    // 12
  define = function(name, deps, callback) {                                                                         // 13
    registry[name] = { deps: deps, callback: callback };                                                            // 14
  };                                                                                                                // 15
                                                                                                                    // 16
  requirejs = require = requireModule = function(name) {                                                            // 17
  requirejs._eak_seen = registry;                                                                                   // 18
                                                                                                                    // 19
    if (seen[name]) { return seen[name]; }                                                                          // 20
    seen[name] = {};                                                                                                // 21
                                                                                                                    // 22
    if (!registry[name]) {                                                                                          // 23
      throw new Error("Could not find module " + name);                                                             // 24
    }                                                                                                               // 25
                                                                                                                    // 26
    var mod = registry[name],                                                                                       // 27
        deps = mod.deps,                                                                                            // 28
        callback = mod.callback,                                                                                    // 29
        reified = [],                                                                                               // 30
        exports;                                                                                                    // 31
                                                                                                                    // 32
    for (var i=0, l=deps.length; i<l; i++) {                                                                        // 33
      if (deps[i] === 'exports') {                                                                                  // 34
        reified.push(exports = {});                                                                                 // 35
      } else {                                                                                                      // 36
        reified.push(requireModule(resolve(deps[i])));                                                              // 37
      }                                                                                                             // 38
    }                                                                                                               // 39
                                                                                                                    // 40
    var value = callback.apply(this, reified);                                                                      // 41
    return seen[name] = exports || value;                                                                           // 42
                                                                                                                    // 43
    function resolve(child) {                                                                                       // 44
      if (child.charAt(0) !== '.') { return child; }                                                                // 45
      var parts = child.split("/");                                                                                 // 46
      var parentBase = name.split("/").slice(0, -1);                                                                // 47
                                                                                                                    // 48
      for (var i=0, l=parts.length; i<l; i++) {                                                                     // 49
        var part = parts[i];                                                                                        // 50
                                                                                                                    // 51
        if (part === '..') { parentBase.pop(); }                                                                    // 52
        else if (part === '.') { continue; }                                                                        // 53
        else { parentBase.push(part); }                                                                             // 54
      }                                                                                                             // 55
                                                                                                                    // 56
      return parentBase.join("/");                                                                                  // 57
    }                                                                                                               // 58
  };                                                                                                                // 59
})();                                                                                                               // 60
                                                                                                                    // 61
define("promise/all",                                                                                               // 62
  ["./utils","exports"],                                                                                            // 63
  function(__dependency1__, __exports__) {                                                                          // 64
    "use strict";                                                                                                   // 65
    /* global toString */                                                                                           // 66
                                                                                                                    // 67
    var isArray = __dependency1__.isArray;                                                                          // 68
    var isFunction = __dependency1__.isFunction;                                                                    // 69
                                                                                                                    // 70
    /**                                                                                                             // 71
      Returns a promise that is fulfilled when all the given promises have been                                     // 72
      fulfilled, or rejected if any of them become rejected. The return promise                                     // 73
      is fulfilled with an array that gives all the values in the order they were                                   // 74
      passed in the `promises` array argument.                                                                      // 75
                                                                                                                    // 76
      Example:                                                                                                      // 77
                                                                                                                    // 78
      ```javascript                                                                                                 // 79
      var promise1 = RSVP.resolve(1);                                                                               // 80
      var promise2 = RSVP.resolve(2);                                                                               // 81
      var promise3 = RSVP.resolve(3);                                                                               // 82
      var promises = [ promise1, promise2, promise3 ];                                                              // 83
                                                                                                                    // 84
      RSVP.all(promises).then(function(array){                                                                      // 85
        // The array here would be [ 1, 2, 3 ];                                                                     // 86
      });                                                                                                           // 87
      ```                                                                                                           // 88
                                                                                                                    // 89
      If any of the `promises` given to `RSVP.all` are rejected, the first promise                                  // 90
      that is rejected will be given as an argument to the returned promises's                                      // 91
      rejection handler. For example:                                                                               // 92
                                                                                                                    // 93
      Example:                                                                                                      // 94
                                                                                                                    // 95
      ```javascript                                                                                                 // 96
      var promise1 = RSVP.resolve(1);                                                                               // 97
      var promise2 = RSVP.reject(new Error("2"));                                                                   // 98
      var promise3 = RSVP.reject(new Error("3"));                                                                   // 99
      var promises = [ promise1, promise2, promise3 ];                                                              // 100
                                                                                                                    // 101
      RSVP.all(promises).then(function(array){                                                                      // 102
        // Code here never runs because there are rejected promises!                                                // 103
      }, function(error) {                                                                                          // 104
        // error.message === "2"                                                                                    // 105
      });                                                                                                           // 106
      ```                                                                                                           // 107
                                                                                                                    // 108
      @method all                                                                                                   // 109
      @for RSVP                                                                                                     // 110
      @param {Array} promises                                                                                       // 111
      @param {String} label                                                                                         // 112
      @return {Promise} promise that is fulfilled when all `promises` have been                                     // 113
      fulfilled, or rejected if any of them become rejected.                                                        // 114
    */                                                                                                              // 115
    function all(promises) {                                                                                        // 116
      /*jshint validthis:true */                                                                                    // 117
      var Promise = this;                                                                                           // 118
                                                                                                                    // 119
      if (!isArray(promises)) {                                                                                     // 120
        throw new TypeError('You must pass an array to all.');                                                      // 121
      }                                                                                                             // 122
                                                                                                                    // 123
      return new Promise(function(resolve, reject) {                                                                // 124
        var results = [], remaining = promises.length,                                                              // 125
        promise;                                                                                                    // 126
                                                                                                                    // 127
        if (remaining === 0) {                                                                                      // 128
          resolve([]);                                                                                              // 129
        }                                                                                                           // 130
                                                                                                                    // 131
        function resolver(index) {                                                                                  // 132
          return function(value) {                                                                                  // 133
            resolveAll(index, value);                                                                               // 134
          };                                                                                                        // 135
        }                                                                                                           // 136
                                                                                                                    // 137
        function resolveAll(index, value) {                                                                         // 138
          results[index] = value;                                                                                   // 139
          if (--remaining === 0) {                                                                                  // 140
            resolve(results);                                                                                       // 141
          }                                                                                                         // 142
        }                                                                                                           // 143
                                                                                                                    // 144
        for (var i = 0; i < promises.length; i++) {                                                                 // 145
          promise = promises[i];                                                                                    // 146
                                                                                                                    // 147
          if (promise && isFunction(promise.then)) {                                                                // 148
            promise.then(resolver(i), reject);                                                                      // 149
          } else {                                                                                                  // 150
            resolveAll(i, promise);                                                                                 // 151
          }                                                                                                         // 152
        }                                                                                                           // 153
      });                                                                                                           // 154
    }                                                                                                               // 155
                                                                                                                    // 156
    __exports__.all = all;                                                                                          // 157
  });                                                                                                               // 158
define("promise/asap",                                                                                              // 159
  ["exports"],                                                                                                      // 160
  function(__exports__) {                                                                                           // 161
    "use strict";                                                                                                   // 162
    var browserGlobal = (typeof window !== 'undefined') ? window : {};                                              // 163
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;           // 164
    var local = (typeof global !== 'undefined') ? global : (this === undefined? window:this);                       // 165
                                                                                                                    // 166
    // node                                                                                                         // 167
    function useNextTick() {                                                                                        // 168
      return function() {                                                                                           // 169
        process.nextTick(flush);                                                                                    // 170
      };                                                                                                            // 171
    }                                                                                                               // 172
                                                                                                                    // 173
    function useMutationObserver() {                                                                                // 174
      var iterations = 0;                                                                                           // 175
      var observer = new BrowserMutationObserver(flush);                                                            // 176
      var node = document.createTextNode('');                                                                       // 177
      observer.observe(node, { characterData: true });                                                              // 178
                                                                                                                    // 179
      return function() {                                                                                           // 180
        node.data = (iterations = ++iterations % 2);                                                                // 181
      };                                                                                                            // 182
    }                                                                                                               // 183
                                                                                                                    // 184
    function useSetTimeout() {                                                                                      // 185
      return function() {                                                                                           // 186
        local.setTimeout(flush, 1);                                                                                 // 187
      };                                                                                                            // 188
    }                                                                                                               // 189
                                                                                                                    // 190
    var queue = [];                                                                                                 // 191
    function flush() {                                                                                              // 192
      for (var i = 0; i < queue.length; i++) {                                                                      // 193
        var tuple = queue[i];                                                                                       // 194
        var callback = tuple[0], arg = tuple[1];                                                                    // 195
        callback(arg);                                                                                              // 196
      }                                                                                                             // 197
      queue = [];                                                                                                   // 198
    }                                                                                                               // 199
                                                                                                                    // 200
    var scheduleFlush;                                                                                              // 201
                                                                                                                    // 202
    // Decide what async method to use to triggering processing of queued callbacks:                                // 203
    if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {                       // 204
      scheduleFlush = useNextTick();                                                                                // 205
    } else if (BrowserMutationObserver) {                                                                           // 206
      scheduleFlush = useMutationObserver();                                                                        // 207
    } else {                                                                                                        // 208
      scheduleFlush = useSetTimeout();                                                                              // 209
    }                                                                                                               // 210
                                                                                                                    // 211
    function asap(callback, arg) {                                                                                  // 212
      var length = queue.push([callback, arg]);                                                                     // 213
      if (length === 1) {                                                                                           // 214
        // If length is 1, that means that we need to schedule an async flush.                                      // 215
        // If additional callbacks are queued before the queue is flushed, they                                     // 216
        // will be processed by this flush that we are scheduling.                                                  // 217
        scheduleFlush();                                                                                            // 218
      }                                                                                                             // 219
    }                                                                                                               // 220
                                                                                                                    // 221
    __exports__.asap = asap;                                                                                        // 222
  });                                                                                                               // 223
define("promise/config",                                                                                            // 224
  ["exports"],                                                                                                      // 225
  function(__exports__) {                                                                                           // 226
    "use strict";                                                                                                   // 227
    var config = {                                                                                                  // 228
      instrument: false                                                                                             // 229
    };                                                                                                              // 230
                                                                                                                    // 231
    function configure(name, value) {                                                                               // 232
      if (arguments.length === 2) {                                                                                 // 233
        config[name] = value;                                                                                       // 234
      } else {                                                                                                      // 235
        return config[name];                                                                                        // 236
      }                                                                                                             // 237
    }                                                                                                               // 238
                                                                                                                    // 239
    __exports__.config = config;                                                                                    // 240
    __exports__.configure = configure;                                                                              // 241
  });                                                                                                               // 242
define("promise/polyfill",                                                                                          // 243
  ["./promise","./utils","exports"],                                                                                // 244
  function(__dependency1__, __dependency2__, __exports__) {                                                         // 245
    "use strict";                                                                                                   // 246
    /*global self*/                                                                                                 // 247
    var RSVPPromise = __dependency1__.Promise;                                                                      // 248
    var isFunction = __dependency2__.isFunction;                                                                    // 249
                                                                                                                    // 250
    function polyfill() {                                                                                           // 251
      var local;                                                                                                    // 252
                                                                                                                    // 253
      if (typeof global !== 'undefined') {                                                                          // 254
        local = global;                                                                                             // 255
      } else if (typeof window !== 'undefined' && window.document) {                                                // 256
        local = window;                                                                                             // 257
      } else {                                                                                                      // 258
        local = self;                                                                                               // 259
      }                                                                                                             // 260
                                                                                                                    // 261
      var es6PromiseSupport =                                                                                       // 262
        "Promise" in local &&                                                                                       // 263
        // Some of these methods are missing from                                                                   // 264
        // Firefox/Chrome experimental implementations                                                              // 265
        "resolve" in local.Promise &&                                                                               // 266
        "reject" in local.Promise &&                                                                                // 267
        "all" in local.Promise &&                                                                                   // 268
        "race" in local.Promise &&                                                                                  // 269
        // Older version of the spec had a resolver object                                                          // 270
        // as the arg rather than a function                                                                        // 271
        (function() {                                                                                               // 272
          var resolve;                                                                                              // 273
          new local.Promise(function(r) { resolve = r; });                                                          // 274
          return isFunction(resolve);                                                                               // 275
        }());                                                                                                       // 276
                                                                                                                    // 277
      if (!es6PromiseSupport) {                                                                                     // 278
        local.Promise = RSVPPromise;                                                                                // 279
      }                                                                                                             // 280
    }                                                                                                               // 281
                                                                                                                    // 282
    __exports__.polyfill = polyfill;                                                                                // 283
  });                                                                                                               // 284
define("promise/promise",                                                                                           // 285
  ["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],                                // 286
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __exports__) {
    "use strict";                                                                                                   // 288
    var config = __dependency1__.config;                                                                            // 289
    var configure = __dependency1__.configure;                                                                      // 290
    var objectOrFunction = __dependency2__.objectOrFunction;                                                        // 291
    var isFunction = __dependency2__.isFunction;                                                                    // 292
    var now = __dependency2__.now;                                                                                  // 293
    var all = __dependency3__.all;                                                                                  // 294
    var race = __dependency4__.race;                                                                                // 295
    var staticResolve = __dependency5__.resolve;                                                                    // 296
    var staticReject = __dependency6__.reject;                                                                      // 297
    var asap = __dependency7__.asap;                                                                                // 298
                                                                                                                    // 299
    var counter = 0;                                                                                                // 300
                                                                                                                    // 301
    config.async = asap; // default async is asap;                                                                  // 302
                                                                                                                    // 303
    function Promise(resolver) {                                                                                    // 304
      if (!isFunction(resolver)) {                                                                                  // 305
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');  // 306
      }                                                                                                             // 307
                                                                                                                    // 308
      if (!(this instanceof Promise)) {                                                                             // 309
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      }                                                                                                             // 311
                                                                                                                    // 312
      this._subscribers = [];                                                                                       // 313
                                                                                                                    // 314
      invokeResolver(resolver, this);                                                                               // 315
    }                                                                                                               // 316
                                                                                                                    // 317
    function invokeResolver(resolver, promise) {                                                                    // 318
      function resolvePromise(value) {                                                                              // 319
        resolve(promise, value);                                                                                    // 320
      }                                                                                                             // 321
                                                                                                                    // 322
      function rejectPromise(reason) {                                                                              // 323
        reject(promise, reason);                                                                                    // 324
      }                                                                                                             // 325
                                                                                                                    // 326
      try {                                                                                                         // 327
        resolver(resolvePromise, rejectPromise);                                                                    // 328
      } catch(e) {                                                                                                  // 329
        rejectPromise(e);                                                                                           // 330
      }                                                                                                             // 331
    }                                                                                                               // 332
                                                                                                                    // 333
    function invokeCallback(settled, promise, callback, detail) {                                                   // 334
      var hasCallback = isFunction(callback),                                                                       // 335
          value, error, succeeded, failed;                                                                          // 336
                                                                                                                    // 337
      if (hasCallback) {                                                                                            // 338
        try {                                                                                                       // 339
          value = callback(detail);                                                                                 // 340
          succeeded = true;                                                                                         // 341
        } catch(e) {                                                                                                // 342
          failed = true;                                                                                            // 343
          error = e;                                                                                                // 344
        }                                                                                                           // 345
      } else {                                                                                                      // 346
        value = detail;                                                                                             // 347
        succeeded = true;                                                                                           // 348
      }                                                                                                             // 349
                                                                                                                    // 350
      if (handleThenable(promise, value)) {                                                                         // 351
        return;                                                                                                     // 352
      } else if (hasCallback && succeeded) {                                                                        // 353
        resolve(promise, value);                                                                                    // 354
      } else if (failed) {                                                                                          // 355
        reject(promise, error);                                                                                     // 356
      } else if (settled === FULFILLED) {                                                                           // 357
        resolve(promise, value);                                                                                    // 358
      } else if (settled === REJECTED) {                                                                            // 359
        reject(promise, value);                                                                                     // 360
      }                                                                                                             // 361
    }                                                                                                               // 362
                                                                                                                    // 363
    var PENDING   = void 0;                                                                                         // 364
    var SEALED    = 0;                                                                                              // 365
    var FULFILLED = 1;                                                                                              // 366
    var REJECTED  = 2;                                                                                              // 367
                                                                                                                    // 368
    function subscribe(parent, child, onFulfillment, onRejection) {                                                 // 369
      var subscribers = parent._subscribers;                                                                        // 370
      var length = subscribers.length;                                                                              // 371
                                                                                                                    // 372
      subscribers[length] = child;                                                                                  // 373
      subscribers[length + FULFILLED] = onFulfillment;                                                              // 374
      subscribers[length + REJECTED]  = onRejection;                                                                // 375
    }                                                                                                               // 376
                                                                                                                    // 377
    function publish(promise, settled) {                                                                            // 378
      var child, callback, subscribers = promise._subscribers, detail = promise._detail;                            // 379
                                                                                                                    // 380
      for (var i = 0; i < subscribers.length; i += 3) {                                                             // 381
        child = subscribers[i];                                                                                     // 382
        callback = subscribers[i + settled];                                                                        // 383
                                                                                                                    // 384
        invokeCallback(settled, child, callback, detail);                                                           // 385
      }                                                                                                             // 386
                                                                                                                    // 387
      promise._subscribers = null;                                                                                  // 388
    }                                                                                                               // 389
                                                                                                                    // 390
    Promise.prototype = {                                                                                           // 391
      constructor: Promise,                                                                                         // 392
                                                                                                                    // 393
      _state: undefined,                                                                                            // 394
      _detail: undefined,                                                                                           // 395
      _subscribers: undefined,                                                                                      // 396
                                                                                                                    // 397
      then: function(onFulfillment, onRejection) {                                                                  // 398
        var promise = this;                                                                                         // 399
                                                                                                                    // 400
        var thenPromise = new this.constructor(function() {});                                                      // 401
                                                                                                                    // 402
        if (this._state) {                                                                                          // 403
          var callbacks = arguments;                                                                                // 404
          config.async(function invokePromiseCallback() {                                                           // 405
            invokeCallback(promise._state, thenPromise, callbacks[promise._state - 1], promise._detail);            // 406
          });                                                                                                       // 407
        } else {                                                                                                    // 408
          subscribe(this, thenPromise, onFulfillment, onRejection);                                                 // 409
        }                                                                                                           // 410
                                                                                                                    // 411
        return thenPromise;                                                                                         // 412
      },                                                                                                            // 413
                                                                                                                    // 414
      'catch': function(onRejection) {                                                                              // 415
        return this.then(null, onRejection);                                                                        // 416
      }                                                                                                             // 417
    };                                                                                                              // 418
                                                                                                                    // 419
    Promise.all = all;                                                                                              // 420
    Promise.race = race;                                                                                            // 421
    Promise.resolve = staticResolve;                                                                                // 422
    Promise.reject = staticReject;                                                                                  // 423
                                                                                                                    // 424
    function handleThenable(promise, value) {                                                                       // 425
      var then = null,                                                                                              // 426
      resolved;                                                                                                     // 427
                                                                                                                    // 428
      try {                                                                                                         // 429
        if (promise === value) {                                                                                    // 430
          throw new TypeError("A promises callback cannot return that same promise.");                              // 431
        }                                                                                                           // 432
                                                                                                                    // 433
        if (objectOrFunction(value)) {                                                                              // 434
          then = value.then;                                                                                        // 435
                                                                                                                    // 436
          if (isFunction(then)) {                                                                                   // 437
            then.call(value, function(val) {                                                                        // 438
              if (resolved) { return true; }                                                                        // 439
              resolved = true;                                                                                      // 440
                                                                                                                    // 441
              if (value !== val) {                                                                                  // 442
                resolve(promise, val);                                                                              // 443
              } else {                                                                                              // 444
                fulfill(promise, val);                                                                              // 445
              }                                                                                                     // 446
            }, function(val) {                                                                                      // 447
              if (resolved) { return true; }                                                                        // 448
              resolved = true;                                                                                      // 449
                                                                                                                    // 450
              reject(promise, val);                                                                                 // 451
            });                                                                                                     // 452
                                                                                                                    // 453
            return true;                                                                                            // 454
          }                                                                                                         // 455
        }                                                                                                           // 456
      } catch (error) {                                                                                             // 457
        if (resolved) { return true; }                                                                              // 458
        reject(promise, error);                                                                                     // 459
        return true;                                                                                                // 460
      }                                                                                                             // 461
                                                                                                                    // 462
      return false;                                                                                                 // 463
    }                                                                                                               // 464
                                                                                                                    // 465
    function resolve(promise, value) {                                                                              // 466
      if (promise === value) {                                                                                      // 467
        fulfill(promise, value);                                                                                    // 468
      } else if (!handleThenable(promise, value)) {                                                                 // 469
        fulfill(promise, value);                                                                                    // 470
      }                                                                                                             // 471
    }                                                                                                               // 472
                                                                                                                    // 473
    function fulfill(promise, value) {                                                                              // 474
      if (promise._state !== PENDING) { return; }                                                                   // 475
      promise._state = SEALED;                                                                                      // 476
      promise._detail = value;                                                                                      // 477
                                                                                                                    // 478
      config.async(publishFulfillment, promise);                                                                    // 479
    }                                                                                                               // 480
                                                                                                                    // 481
    function reject(promise, reason) {                                                                              // 482
      if (promise._state !== PENDING) { return; }                                                                   // 483
      promise._state = SEALED;                                                                                      // 484
      promise._detail = reason;                                                                                     // 485
                                                                                                                    // 486
      config.async(publishRejection, promise);                                                                      // 487
    }                                                                                                               // 488
                                                                                                                    // 489
    function publishFulfillment(promise) {                                                                          // 490
      publish(promise, promise._state = FULFILLED);                                                                 // 491
    }                                                                                                               // 492
                                                                                                                    // 493
    function publishRejection(promise) {                                                                            // 494
      publish(promise, promise._state = REJECTED);                                                                  // 495
    }                                                                                                               // 496
                                                                                                                    // 497
    __exports__.Promise = Promise;                                                                                  // 498
  });                                                                                                               // 499
define("promise/race",                                                                                              // 500
  ["./utils","exports"],                                                                                            // 501
  function(__dependency1__, __exports__) {                                                                          // 502
    "use strict";                                                                                                   // 503
    /* global toString */                                                                                           // 504
    var isArray = __dependency1__.isArray;                                                                          // 505
                                                                                                                    // 506
    /**                                                                                                             // 507
      `RSVP.race` allows you to watch a series of promises and act as soon as the                                   // 508
      first promise given to the `promises` argument fulfills or rejects.                                           // 509
                                                                                                                    // 510
      Example:                                                                                                      // 511
                                                                                                                    // 512
      ```javascript                                                                                                 // 513
      var promise1 = new RSVP.Promise(function(resolve, reject){                                                    // 514
        setTimeout(function(){                                                                                      // 515
          resolve("promise 1");                                                                                     // 516
        }, 200);                                                                                                    // 517
      });                                                                                                           // 518
                                                                                                                    // 519
      var promise2 = new RSVP.Promise(function(resolve, reject){                                                    // 520
        setTimeout(function(){                                                                                      // 521
          resolve("promise 2");                                                                                     // 522
        }, 100);                                                                                                    // 523
      });                                                                                                           // 524
                                                                                                                    // 525
      RSVP.race([promise1, promise2]).then(function(result){                                                        // 526
        // result === "promise 2" because it was resolved before promise1                                           // 527
        // was resolved.                                                                                            // 528
      });                                                                                                           // 529
      ```                                                                                                           // 530
                                                                                                                    // 531
      `RSVP.race` is deterministic in that only the state of the first completed                                    // 532
      promise matters. For example, even if other promises given to the `promises`                                  // 533
      array argument are resolved, but the first completed promise has become                                       // 534
      rejected before the other promises became fulfilled, the returned promise                                     // 535
      will become rejected:                                                                                         // 536
                                                                                                                    // 537
      ```javascript                                                                                                 // 538
      var promise1 = new RSVP.Promise(function(resolve, reject){                                                    // 539
        setTimeout(function(){                                                                                      // 540
          resolve("promise 1");                                                                                     // 541
        }, 200);                                                                                                    // 542
      });                                                                                                           // 543
                                                                                                                    // 544
      var promise2 = new RSVP.Promise(function(resolve, reject){                                                    // 545
        setTimeout(function(){                                                                                      // 546
          reject(new Error("promise 2"));                                                                           // 547
        }, 100);                                                                                                    // 548
      });                                                                                                           // 549
                                                                                                                    // 550
      RSVP.race([promise1, promise2]).then(function(result){                                                        // 551
        // Code here never runs because there are rejected promises!                                                // 552
      }, function(reason){                                                                                          // 553
        // reason.message === "promise2" because promise 2 became rejected before                                   // 554
        // promise 1 became fulfilled                                                                               // 555
      });                                                                                                           // 556
      ```                                                                                                           // 557
                                                                                                                    // 558
      @method race                                                                                                  // 559
      @for RSVP                                                                                                     // 560
      @param {Array} promises array of promises to observe                                                          // 561
      @param {String} label optional string for describing the promise returned.                                    // 562
      Useful for tooling.                                                                                           // 563
      @return {Promise} a promise that becomes fulfilled with the value the first                                   // 564
      completed promises is resolved with if the first completed promise was                                        // 565
      fulfilled, or rejected with the reason that the first completed promise                                       // 566
      was rejected with.                                                                                            // 567
    */                                                                                                              // 568
    function race(promises) {                                                                                       // 569
      /*jshint validthis:true */                                                                                    // 570
      var Promise = this;                                                                                           // 571
                                                                                                                    // 572
      if (!isArray(promises)) {                                                                                     // 573
        throw new TypeError('You must pass an array to race.');                                                     // 574
      }                                                                                                             // 575
      return new Promise(function(resolve, reject) {                                                                // 576
        var results = [], promise;                                                                                  // 577
                                                                                                                    // 578
        for (var i = 0; i < promises.length; i++) {                                                                 // 579
          promise = promises[i];                                                                                    // 580
                                                                                                                    // 581
          if (promise && typeof promise.then === 'function') {                                                      // 582
            promise.then(resolve, reject);                                                                          // 583
          } else {                                                                                                  // 584
            resolve(promise);                                                                                       // 585
          }                                                                                                         // 586
        }                                                                                                           // 587
      });                                                                                                           // 588
    }                                                                                                               // 589
                                                                                                                    // 590
    __exports__.race = race;                                                                                        // 591
  });                                                                                                               // 592
define("promise/reject",                                                                                            // 593
  ["exports"],                                                                                                      // 594
  function(__exports__) {                                                                                           // 595
    "use strict";                                                                                                   // 596
    /**                                                                                                             // 597
      `RSVP.reject` returns a promise that will become rejected with the passed                                     // 598
      `reason`. `RSVP.reject` is essentially shorthand for the following:                                           // 599
                                                                                                                    // 600
      ```javascript                                                                                                 // 601
      var promise = new RSVP.Promise(function(resolve, reject){                                                     // 602
        reject(new Error('WHOOPS'));                                                                                // 603
      });                                                                                                           // 604
                                                                                                                    // 605
      promise.then(function(value){                                                                                 // 606
        // Code here doesn't run because the promise is rejected!                                                   // 607
      }, function(reason){                                                                                          // 608
        // reason.message === 'WHOOPS'                                                                              // 609
      });                                                                                                           // 610
      ```                                                                                                           // 611
                                                                                                                    // 612
      Instead of writing the above, your code now simply becomes the following:                                     // 613
                                                                                                                    // 614
      ```javascript                                                                                                 // 615
      var promise = RSVP.reject(new Error('WHOOPS'));                                                               // 616
                                                                                                                    // 617
      promise.then(function(value){                                                                                 // 618
        // Code here doesn't run because the promise is rejected!                                                   // 619
      }, function(reason){                                                                                          // 620
        // reason.message === 'WHOOPS'                                                                              // 621
      });                                                                                                           // 622
      ```                                                                                                           // 623
                                                                                                                    // 624
      @method reject                                                                                                // 625
      @for RSVP                                                                                                     // 626
      @param {Any} reason value that the returned promise will be rejected with.                                    // 627
      @param {String} label optional string for identifying the returned promise.                                   // 628
      Useful for tooling.                                                                                           // 629
      @return {Promise} a promise that will become rejected with the given                                          // 630
      `reason`.                                                                                                     // 631
    */                                                                                                              // 632
    function reject(reason) {                                                                                       // 633
      /*jshint validthis:true */                                                                                    // 634
      var Promise = this;                                                                                           // 635
                                                                                                                    // 636
      return new Promise(function (resolve, reject) {                                                               // 637
        reject(reason);                                                                                             // 638
      });                                                                                                           // 639
    }                                                                                                               // 640
                                                                                                                    // 641
    __exports__.reject = reject;                                                                                    // 642
  });                                                                                                               // 643
define("promise/resolve",                                                                                           // 644
  ["exports"],                                                                                                      // 645
  function(__exports__) {                                                                                           // 646
    "use strict";                                                                                                   // 647
    function resolve(value) {                                                                                       // 648
      /*jshint validthis:true */                                                                                    // 649
      if (value && typeof value === 'object' && value.constructor === this) {                                       // 650
        return value;                                                                                               // 651
      }                                                                                                             // 652
                                                                                                                    // 653
      var Promise = this;                                                                                           // 654
                                                                                                                    // 655
      return new Promise(function(resolve) {                                                                        // 656
        resolve(value);                                                                                             // 657
      });                                                                                                           // 658
    }                                                                                                               // 659
                                                                                                                    // 660
    __exports__.resolve = resolve;                                                                                  // 661
  });                                                                                                               // 662
define("promise/utils",                                                                                             // 663
  ["exports"],                                                                                                      // 664
  function(__exports__) {                                                                                           // 665
    "use strict";                                                                                                   // 666
    function objectOrFunction(x) {                                                                                  // 667
      return isFunction(x) || (typeof x === "object" && x !== null);                                                // 668
    }                                                                                                               // 669
                                                                                                                    // 670
    function isFunction(x) {                                                                                        // 671
      return typeof x === "function";                                                                               // 672
    }                                                                                                               // 673
                                                                                                                    // 674
    function isArray(x) {                                                                                           // 675
      return Object.prototype.toString.call(x) === "[object Array]";                                                // 676
    }                                                                                                               // 677
                                                                                                                    // 678
    // Date.now is not available in browsers < IE9                                                                  // 679
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility      // 680
    var now = Date.now || function() { return new Date().getTime(); };                                              // 681
                                                                                                                    // 682
                                                                                                                    // 683
    __exports__.objectOrFunction = objectOrFunction;                                                                // 684
    __exports__.isFunction = isFunction;                                                                            // 685
    __exports__.isArray = isArray;                                                                                  // 686
    __exports__.now = now;                                                                                          // 687
  });                                                                                                               // 688
requireModule('promise/polyfill').polyfill();                                                                       // 689
}());(function (global, factory) {                                                                                  // 690
    if (typeof define === 'function' && define.amd) {                                                               // 691
        define('localforageSerializer', ['exports', 'module'], factory);                                            // 692
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {                                   // 693
        factory(exports, module);                                                                                   // 694
    } else {                                                                                                        // 695
        var mod = {                                                                                                 // 696
            exports: {}                                                                                             // 697
        };                                                                                                          // 698
        factory(mod.exports, mod);                                                                                  // 699
        global.localforageSerializer = mod.exports;                                                                 // 700
    }                                                                                                               // 701
})(this, function (exports, module) {                                                                               // 702
    'use strict';                                                                                                   // 703
                                                                                                                    // 704
    (function () {                                                                                                  // 705
        'use strict';                                                                                               // 706
                                                                                                                    // 707
        // Sadly, the best way to save binary data in WebSQL/localStorage is serializing                            // 708
        // it to Base64, so this is how we store it to prevent very strange errors with less                        // 709
        // verbose ways of binary <-> string data storage.                                                          // 710
        var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';                        // 711
                                                                                                                    // 712
        var BLOB_TYPE_PREFIX = '~~local_forage_type~';                                                              // 713
        var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;                                               // 714
                                                                                                                    // 715
        var SERIALIZED_MARKER = '__lfsc__:';                                                                        // 716
        var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;                                                    // 717
                                                                                                                    // 718
        // OMG the serializations!                                                                                  // 719
        var TYPE_ARRAYBUFFER = 'arbf';                                                                              // 720
        var TYPE_BLOB = 'blob';                                                                                     // 721
        var TYPE_INT8ARRAY = 'si08';                                                                                // 722
        var TYPE_UINT8ARRAY = 'ui08';                                                                               // 723
        var TYPE_UINT8CLAMPEDARRAY = 'uic8';                                                                        // 724
        var TYPE_INT16ARRAY = 'si16';                                                                               // 725
        var TYPE_INT32ARRAY = 'si32';                                                                               // 726
        var TYPE_UINT16ARRAY = 'ur16';                                                                              // 727
        var TYPE_UINT32ARRAY = 'ui32';                                                                              // 728
        var TYPE_FLOAT32ARRAY = 'fl32';                                                                             // 729
        var TYPE_FLOAT64ARRAY = 'fl64';                                                                             // 730
        var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;                     // 731
                                                                                                                    // 732
        // Get out of our habit of using `window` inline, at least.                                                 // 733
        var globalObject = this;                                                                                    // 734
                                                                                                                    // 735
        // Abstracts constructing a Blob object, so it also works in older                                          // 736
        // browsers that don't support the native Blob constructor. (i.e.                                           // 737
        // old QtWebKit versions, at least).                                                                        // 738
        function _createBlob(parts, properties) {                                                                   // 739
            parts = parts || [];                                                                                    // 740
            properties = properties || {};                                                                          // 741
                                                                                                                    // 742
            try {                                                                                                   // 743
                return new Blob(parts, properties);                                                                 // 744
            } catch (err) {                                                                                         // 745
                if (err.name !== 'TypeError') {                                                                     // 746
                    throw err;                                                                                      // 747
                }                                                                                                   // 748
                                                                                                                    // 749
                var BlobBuilder = globalObject.BlobBuilder || globalObject.MSBlobBuilder || globalObject.MozBlobBuilder || globalObject.WebKitBlobBuilder;
                                                                                                                    // 751
                var builder = new BlobBuilder();                                                                    // 752
                for (var i = 0; i < parts.length; i += 1) {                                                         // 753
                    builder.append(parts[i]);                                                                       // 754
                }                                                                                                   // 755
                                                                                                                    // 756
                return builder.getBlob(properties.type);                                                            // 757
            }                                                                                                       // 758
        }                                                                                                           // 759
                                                                                                                    // 760
        // Serialize a value, afterwards executing a callback (which usually                                        // 761
        // instructs the `setItem()` callback/promise to be executed). This is how                                  // 762
        // we store binary data with localStorage.                                                                  // 763
        function serialize(value, callback) {                                                                       // 764
            var valueString = '';                                                                                   // 765
            if (value) {                                                                                            // 766
                valueString = value.toString();                                                                     // 767
            }                                                                                                       // 768
                                                                                                                    // 769
            // Cannot use `value instanceof ArrayBuffer` or such here, as these                                     // 770
            // checks fail when running the tests using casper.js...                                                // 771
            //                                                                                                      // 772
            // TODO: See why those tests fail and use a better solution.                                            // 773
            if (value && (value.toString() === '[object ArrayBuffer]' || value.buffer && value.buffer.toString() === '[object ArrayBuffer]')) {
                // Convert binary arrays to a string and prefix the string with                                     // 775
                // a special marker.                                                                                // 776
                var buffer;                                                                                         // 777
                var marker = SERIALIZED_MARKER;                                                                     // 778
                                                                                                                    // 779
                if (value instanceof ArrayBuffer) {                                                                 // 780
                    buffer = value;                                                                                 // 781
                    marker += TYPE_ARRAYBUFFER;                                                                     // 782
                } else {                                                                                            // 783
                    buffer = value.buffer;                                                                          // 784
                                                                                                                    // 785
                    if (valueString === '[object Int8Array]') {                                                     // 786
                        marker += TYPE_INT8ARRAY;                                                                   // 787
                    } else if (valueString === '[object Uint8Array]') {                                             // 788
                        marker += TYPE_UINT8ARRAY;                                                                  // 789
                    } else if (valueString === '[object Uint8ClampedArray]') {                                      // 790
                        marker += TYPE_UINT8CLAMPEDARRAY;                                                           // 791
                    } else if (valueString === '[object Int16Array]') {                                             // 792
                        marker += TYPE_INT16ARRAY;                                                                  // 793
                    } else if (valueString === '[object Uint16Array]') {                                            // 794
                        marker += TYPE_UINT16ARRAY;                                                                 // 795
                    } else if (valueString === '[object Int32Array]') {                                             // 796
                        marker += TYPE_INT32ARRAY;                                                                  // 797
                    } else if (valueString === '[object Uint32Array]') {                                            // 798
                        marker += TYPE_UINT32ARRAY;                                                                 // 799
                    } else if (valueString === '[object Float32Array]') {                                           // 800
                        marker += TYPE_FLOAT32ARRAY;                                                                // 801
                    } else if (valueString === '[object Float64Array]') {                                           // 802
                        marker += TYPE_FLOAT64ARRAY;                                                                // 803
                    } else {                                                                                        // 804
                        callback(new Error('Failed to get type for BinaryArray'));                                  // 805
                    }                                                                                               // 806
                }                                                                                                   // 807
                                                                                                                    // 808
                callback(marker + bufferToString(buffer));                                                          // 809
            } else if (valueString === '[object Blob]') {                                                           // 810
                // Conver the blob to a binaryArray and then to a string.                                           // 811
                var fileReader = new FileReader();                                                                  // 812
                                                                                                                    // 813
                fileReader.onload = function () {                                                                   // 814
                    // Backwards-compatible prefix for the blob type.                                               // 815
                    var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);                    // 816
                                                                                                                    // 817
                    callback(SERIALIZED_MARKER + TYPE_BLOB + str);                                                  // 818
                };                                                                                                  // 819
                                                                                                                    // 820
                fileReader.readAsArrayBuffer(value);                                                                // 821
            } else {                                                                                                // 822
                try {                                                                                               // 823
                    callback(JSON.stringify(value));                                                                // 824
                } catch (e) {                                                                                       // 825
                    console.error("Couldn't convert value into a JSON string: ", value);                            // 826
                                                                                                                    // 827
                    callback(null, e);                                                                              // 828
                }                                                                                                   // 829
            }                                                                                                       // 830
        }                                                                                                           // 831
                                                                                                                    // 832
        // Deserialize data we've inserted into a value column/field. We place                                      // 833
        // special markers into our strings to mark them as encoded; this isn't                                     // 834
        // as nice as a meta field, but it's the only sane thing we can do whilst                                   // 835
        // keeping localStorage support intact.                                                                     // 836
        //                                                                                                          // 837
        // Oftentimes this will just deserialize JSON content, but if we have a                                     // 838
        // special marker (SERIALIZED_MARKER, defined above), we will extract                                       // 839
        // some kind of arraybuffer/binary data/typed array out of the string.                                      // 840
        function deserialize(value) {                                                                               // 841
            // If we haven't marked this string as being specially serialized (i.e.                                 // 842
            // something other than serialized JSON), we can just return it and be                                  // 843
            // done with it.                                                                                        // 844
            if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {                               // 845
                return JSON.parse(value);                                                                           // 846
            }                                                                                                       // 847
                                                                                                                    // 848
            // The following code deals with deserializing some kind of Blob or                                     // 849
            // TypedArray. First we separate out the type of data we're dealing                                     // 850
            // with from the data itself.                                                                           // 851
            var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);                                  // 852
            var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);                    // 853
                                                                                                                    // 854
            var blobType;                                                                                           // 855
            // Backwards-compatible blob type serialization strategy.                                               // 856
            // DBs created with older versions of localForage will simply not have the blob type.                   // 857
            if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {                              // 858
                var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);                                       // 859
                blobType = matcher[1];                                                                              // 860
                serializedString = serializedString.substring(matcher[0].length);                                   // 861
            }                                                                                                       // 862
            var buffer = stringToBuffer(serializedString);                                                          // 863
                                                                                                                    // 864
            // Return the right type based on the code/type set during                                              // 865
            // serialization.                                                                                       // 866
            switch (type) {                                                                                         // 867
                case TYPE_ARRAYBUFFER:                                                                              // 868
                    return buffer;                                                                                  // 869
                case TYPE_BLOB:                                                                                     // 870
                    return _createBlob([buffer], { type: blobType });                                               // 871
                case TYPE_INT8ARRAY:                                                                                // 872
                    return new Int8Array(buffer);                                                                   // 873
                case TYPE_UINT8ARRAY:                                                                               // 874
                    return new Uint8Array(buffer);                                                                  // 875
                case TYPE_UINT8CLAMPEDARRAY:                                                                        // 876
                    return new Uint8ClampedArray(buffer);                                                           // 877
                case TYPE_INT16ARRAY:                                                                               // 878
                    return new Int16Array(buffer);                                                                  // 879
                case TYPE_UINT16ARRAY:                                                                              // 880
                    return new Uint16Array(buffer);                                                                 // 881
                case TYPE_INT32ARRAY:                                                                               // 882
                    return new Int32Array(buffer);                                                                  // 883
                case TYPE_UINT32ARRAY:                                                                              // 884
                    return new Uint32Array(buffer);                                                                 // 885
                case TYPE_FLOAT32ARRAY:                                                                             // 886
                    return new Float32Array(buffer);                                                                // 887
                case TYPE_FLOAT64ARRAY:                                                                             // 888
                    return new Float64Array(buffer);                                                                // 889
                default:                                                                                            // 890
                    throw new Error('Unkown type: ' + type);                                                        // 891
            }                                                                                                       // 892
        }                                                                                                           // 893
                                                                                                                    // 894
        function stringToBuffer(serializedString) {                                                                 // 895
            // Fill the string into a ArrayBuffer.                                                                  // 896
            var bufferLength = serializedString.length * 0.75;                                                      // 897
            var len = serializedString.length;                                                                      // 898
            var i;                                                                                                  // 899
            var p = 0;                                                                                              // 900
            var encoded1, encoded2, encoded3, encoded4;                                                             // 901
                                                                                                                    // 902
            if (serializedString[serializedString.length - 1] === '=') {                                            // 903
                bufferLength--;                                                                                     // 904
                if (serializedString[serializedString.length - 2] === '=') {                                        // 905
                    bufferLength--;                                                                                 // 906
                }                                                                                                   // 907
            }                                                                                                       // 908
                                                                                                                    // 909
            var buffer = new ArrayBuffer(bufferLength);                                                             // 910
            var bytes = new Uint8Array(buffer);                                                                     // 911
                                                                                                                    // 912
            for (i = 0; i < len; i += 4) {                                                                          // 913
                encoded1 = BASE_CHARS.indexOf(serializedString[i]);                                                 // 914
                encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);                                             // 915
                encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);                                             // 916
                encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);                                             // 917
                                                                                                                    // 918
                /*jslint bitwise: true */                                                                           // 919
                bytes[p++] = encoded1 << 2 | encoded2 >> 4;                                                         // 920
                bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;                                                  // 921
                bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;                                                   // 922
            }                                                                                                       // 923
            return buffer;                                                                                          // 924
        }                                                                                                           // 925
                                                                                                                    // 926
        // Converts a buffer to a string to store, serialized, in the backend                                       // 927
        // storage library.                                                                                         // 928
        function bufferToString(buffer) {                                                                           // 929
            // base64-arraybuffer                                                                                   // 930
            var bytes = new Uint8Array(buffer);                                                                     // 931
            var base64String = '';                                                                                  // 932
            var i;                                                                                                  // 933
                                                                                                                    // 934
            for (i = 0; i < bytes.length; i += 3) {                                                                 // 935
                /*jslint bitwise: true */                                                                           // 936
                base64String += BASE_CHARS[bytes[i] >> 2];                                                          // 937
                base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];                                // 938
                base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];                           // 939
                base64String += BASE_CHARS[bytes[i + 2] & 63];                                                      // 940
            }                                                                                                       // 941
                                                                                                                    // 942
            if (bytes.length % 3 === 2) {                                                                           // 943
                base64String = base64String.substring(0, base64String.length - 1) + '=';                            // 944
            } else if (bytes.length % 3 === 1) {                                                                    // 945
                base64String = base64String.substring(0, base64String.length - 2) + '==';                           // 946
            }                                                                                                       // 947
                                                                                                                    // 948
            return base64String;                                                                                    // 949
        }                                                                                                           // 950
                                                                                                                    // 951
        var localforageSerializer = {                                                                               // 952
            serialize: serialize,                                                                                   // 953
            deserialize: deserialize,                                                                               // 954
            stringToBuffer: stringToBuffer,                                                                         // 955
            bufferToString: bufferToString                                                                          // 956
        };                                                                                                          // 957
                                                                                                                    // 958
        module.exports = localforageSerializer;                                                                     // 959
    }).call(typeof window !== 'undefined' ? window : self);                                                         // 960
});                                                                                                                 // 961
(function (global, factory) {                                                                                       // 962
    if (typeof define === 'function' && define.amd) {                                                               // 963
        define('asyncStorage', ['exports', 'module'], factory);                                                     // 964
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {                                   // 965
        factory(exports, module);                                                                                   // 966
    } else {                                                                                                        // 967
        var mod = {                                                                                                 // 968
            exports: {}                                                                                             // 969
        };                                                                                                          // 970
        factory(mod.exports, mod);                                                                                  // 971
        global.asyncStorage = mod.exports;                                                                          // 972
    }                                                                                                               // 973
})(this, function (exports, module) {                                                                               // 974
    // Some code originally from async_storage.js in                                                                // 975
    // [Gaia](https://github.com/mozilla-b2g/gaia).                                                                 // 976
    'use strict';                                                                                                   // 977
                                                                                                                    // 978
    (function () {                                                                                                  // 979
        'use strict';                                                                                               // 980
                                                                                                                    // 981
        var globalObject = this;                                                                                    // 982
        // Initialize IndexedDB; fall back to vendor-prefixed versions if needed.                                   // 983
        var indexedDB = indexedDB || this.indexedDB || this.webkitIndexedDB || this.mozIndexedDB || this.OIndexedDB || this.msIndexedDB;
                                                                                                                    // 985
        // If IndexedDB isn't available, we get outta here!                                                         // 986
        if (!indexedDB) {                                                                                           // 987
            return;                                                                                                 // 988
        }                                                                                                           // 989
                                                                                                                    // 990
        var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';                                         // 991
        var supportsBlobs;                                                                                          // 992
                                                                                                                    // 993
        // Abstracts constructing a Blob object, so it also works in older                                          // 994
        // browsers that don't support the native Blob constructor. (i.e.                                           // 995
        // old QtWebKit versions, at least).                                                                        // 996
        function _createBlob(parts, properties) {                                                                   // 997
            parts = parts || [];                                                                                    // 998
            properties = properties || {};                                                                          // 999
            try {                                                                                                   // 1000
                return new Blob(parts, properties);                                                                 // 1001
            } catch (e) {                                                                                           // 1002
                if (e.name !== 'TypeError') {                                                                       // 1003
                    throw e;                                                                                        // 1004
                }                                                                                                   // 1005
                var BlobBuilder = globalObject.BlobBuilder || globalObject.MSBlobBuilder || globalObject.MozBlobBuilder || globalObject.WebKitBlobBuilder;
                var builder = new BlobBuilder();                                                                    // 1007
                for (var i = 0; i < parts.length; i += 1) {                                                         // 1008
                    builder.append(parts[i]);                                                                       // 1009
                }                                                                                                   // 1010
                return builder.getBlob(properties.type);                                                            // 1011
            }                                                                                                       // 1012
        }                                                                                                           // 1013
                                                                                                                    // 1014
        // Transform a binary string to an array buffer, because otherwise                                          // 1015
        // weird stuff happens when you try to work with the binary string directly.                                // 1016
        // It is known.                                                                                             // 1017
        // From http://stackoverflow.com/questions/14967647/ (continues on next line)                               // 1018
        // encode-decode-image-with-base64-breaks-image (2013-04-21)                                                // 1019
        function _binStringToArrayBuffer(bin) {                                                                     // 1020
            var length = bin.length;                                                                                // 1021
            var buf = new ArrayBuffer(length);                                                                      // 1022
            var arr = new Uint8Array(buf);                                                                          // 1023
            for (var i = 0; i < length; i++) {                                                                      // 1024
                arr[i] = bin.charCodeAt(i);                                                                         // 1025
            }                                                                                                       // 1026
            return buf;                                                                                             // 1027
        }                                                                                                           // 1028
                                                                                                                    // 1029
        // Fetch a blob using ajax. This reveals bugs in Chrome < 43.                                               // 1030
        // For details on all this junk:                                                                            // 1031
        // https://github.com/nolanlawson/state-of-binary-data-in-the-browser#readme                                // 1032
        function _blobAjax(url) {                                                                                   // 1033
            return new Promise(function (resolve, reject) {                                                         // 1034
                var xhr = new XMLHttpRequest();                                                                     // 1035
                xhr.open('GET', url);                                                                               // 1036
                xhr.withCredentials = true;                                                                         // 1037
                xhr.responseType = 'arraybuffer';                                                                   // 1038
                                                                                                                    // 1039
                xhr.onreadystatechange = function () {                                                              // 1040
                    if (xhr.readyState !== 4) {                                                                     // 1041
                        return;                                                                                     // 1042
                    }                                                                                               // 1043
                    if (xhr.status === 200) {                                                                       // 1044
                        return resolve({                                                                            // 1045
                            response: xhr.response,                                                                 // 1046
                            type: xhr.getResponseHeader('Content-Type')                                             // 1047
                        });                                                                                         // 1048
                    }                                                                                               // 1049
                    reject({ status: xhr.status, response: xhr.response });                                         // 1050
                };                                                                                                  // 1051
                xhr.send();                                                                                         // 1052
            });                                                                                                     // 1053
        }                                                                                                           // 1054
                                                                                                                    // 1055
        //                                                                                                          // 1056
        // Detect blob support. Chrome didn't support it until version 38.                                          // 1057
        // In version 37 they had a broken version where PNGs (and possibly                                         // 1058
        // other binary types) aren't stored correctly, because when you fetch                                      // 1059
        // them, the content type is always null.                                                                   // 1060
        //                                                                                                          // 1061
        // Furthermore, they have some outstanding bugs where blobs occasionally                                    // 1062
        // are read by FileReader as null, or by ajax as 404s.                                                      // 1063
        //                                                                                                          // 1064
        // Sadly we use the 404 bug to detect the FileReader bug, so if they                                        // 1065
        // get fixed independently and released in different versions of Chrome,                                    // 1066
        // then the bug could come back. So it's worthwhile to watch these issues:                                  // 1067
        // 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916                                      // 1068
        // FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836                               // 1069
        //                                                                                                          // 1070
        function _checkBlobSupportWithoutCaching(idb) {                                                             // 1071
            return new Promise(function (resolve, reject) {                                                         // 1072
                var blob = _createBlob([''], { type: 'image/png' });                                                // 1073
                var txn = idb.transaction([DETECT_BLOB_SUPPORT_STORE], 'readwrite');                                // 1074
                txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');                                        // 1075
                txn.oncomplete = function () {                                                                      // 1076
                    // have to do it in a separate transaction, else the correct                                    // 1077
                    // content type is always returned                                                              // 1078
                    var blobTxn = idb.transaction([DETECT_BLOB_SUPPORT_STORE], 'readwrite');                        // 1079
                    var getBlobReq = blobTxn.objectStore(DETECT_BLOB_SUPPORT_STORE).get('key');                     // 1080
                    getBlobReq.onerror = reject;                                                                    // 1081
                    getBlobReq.onsuccess = function (e) {                                                           // 1082
                                                                                                                    // 1083
                        var storedBlob = e.target.result;                                                           // 1084
                        var url = URL.createObjectURL(storedBlob);                                                  // 1085
                                                                                                                    // 1086
                        _blobAjax(url).then(function (res) {                                                        // 1087
                            resolve(!!(res && res.type === 'image/png'));                                           // 1088
                        }, function () {                                                                            // 1089
                            resolve(false);                                                                         // 1090
                        }).then(function () {                                                                       // 1091
                            URL.revokeObjectURL(url);                                                               // 1092
                        });                                                                                         // 1093
                    };                                                                                              // 1094
                };                                                                                                  // 1095
            })['catch'](function () {                                                                               // 1096
                return false; // error, so assume unsupported                                                       // 1097
            });                                                                                                     // 1098
        }                                                                                                           // 1099
                                                                                                                    // 1100
        function _checkBlobSupport(idb) {                                                                           // 1101
            if (typeof supportsBlobs === 'boolean') {                                                               // 1102
                return Promise.resolve(supportsBlobs);                                                              // 1103
            }                                                                                                       // 1104
            return _checkBlobSupportWithoutCaching(idb).then(function (value) {                                     // 1105
                supportsBlobs = value;                                                                              // 1106
                return supportsBlobs;                                                                               // 1107
            });                                                                                                     // 1108
        }                                                                                                           // 1109
                                                                                                                    // 1110
        // encode a blob for indexeddb engines that don't support blobs                                             // 1111
        function _encodeBlob(blob) {                                                                                // 1112
            return new Promise(function (resolve, reject) {                                                         // 1113
                var reader = new FileReader();                                                                      // 1114
                reader.onerror = reject;                                                                            // 1115
                reader.onloadend = function (e) {                                                                   // 1116
                    var base64 = btoa(e.target.result || '');                                                       // 1117
                    resolve({                                                                                       // 1118
                        __local_forage_encoded_blob: true,                                                          // 1119
                        data: base64,                                                                               // 1120
                        type: blob.type                                                                             // 1121
                    });                                                                                             // 1122
                };                                                                                                  // 1123
                reader.readAsBinaryString(blob);                                                                    // 1124
            });                                                                                                     // 1125
        }                                                                                                           // 1126
                                                                                                                    // 1127
        // decode an encoded blob                                                                                   // 1128
        function _decodeBlob(encodedBlob) {                                                                         // 1129
            var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));                                        // 1130
            return _createBlob([arrayBuff], { type: encodedBlob.type });                                            // 1131
        }                                                                                                           // 1132
                                                                                                                    // 1133
        // is this one of our fancy encoded blobs?                                                                  // 1134
        function _isEncodedBlob(value) {                                                                            // 1135
            return value && value.__local_forage_encoded_blob;                                                      // 1136
        }                                                                                                           // 1137
                                                                                                                    // 1138
        // Open the IndexedDB database (automatically creates one if one didn't                                     // 1139
        // previously exist), using any options set in the config.                                                  // 1140
        function _initStorage(options) {                                                                            // 1141
            var self = this;                                                                                        // 1142
            var dbInfo = {                                                                                          // 1143
                db: null                                                                                            // 1144
            };                                                                                                      // 1145
                                                                                                                    // 1146
            if (options) {                                                                                          // 1147
                for (var i in options) {                                                                            // 1148
                    dbInfo[i] = options[i];                                                                         // 1149
                }                                                                                                   // 1150
            }                                                                                                       // 1151
                                                                                                                    // 1152
            return new Promise(function (resolve, reject) {                                                         // 1153
                var openreq = indexedDB.open(dbInfo.name, dbInfo.version);                                          // 1154
                openreq.onerror = function () {                                                                     // 1155
                    reject(openreq.error);                                                                          // 1156
                };                                                                                                  // 1157
                openreq.onupgradeneeded = function (e) {                                                            // 1158
                    // First time setup: create an empty object store                                               // 1159
                    openreq.result.createObjectStore(dbInfo.storeName);                                             // 1160
                    if (e.oldVersion <= 1) {                                                                        // 1161
                        // added when support for blob shims was added                                              // 1162
                        openreq.result.createObjectStore(DETECT_BLOB_SUPPORT_STORE);                                // 1163
                    }                                                                                               // 1164
                };                                                                                                  // 1165
                openreq.onsuccess = function () {                                                                   // 1166
                    dbInfo.db = openreq.result;                                                                     // 1167
                    self._dbInfo = dbInfo;                                                                          // 1168
                    resolve();                                                                                      // 1169
                };                                                                                                  // 1170
            });                                                                                                     // 1171
        }                                                                                                           // 1172
                                                                                                                    // 1173
        function getItem(key, callback) {                                                                           // 1174
            var self = this;                                                                                        // 1175
                                                                                                                    // 1176
            // Cast the key to a string, as that's all we can set as a key.                                         // 1177
            if (typeof key !== 'string') {                                                                          // 1178
                globalObject.console.warn(key + ' used as a key, but it is not a string.');                         // 1179
                key = String(key);                                                                                  // 1180
            }                                                                                                       // 1181
                                                                                                                    // 1182
            var promise = new Promise(function (resolve, reject) {                                                  // 1183
                self.ready().then(function () {                                                                     // 1184
                    var dbInfo = self._dbInfo;                                                                      // 1185
                    var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);  // 1186
                    var req = store.get(key);                                                                       // 1187
                                                                                                                    // 1188
                    req.onsuccess = function () {                                                                   // 1189
                        var value = req.result;                                                                     // 1190
                        if (value === undefined) {                                                                  // 1191
                            value = null;                                                                           // 1192
                        }                                                                                           // 1193
                        if (_isEncodedBlob(value)) {                                                                // 1194
                            value = _decodeBlob(value);                                                             // 1195
                        }                                                                                           // 1196
                        resolve(value);                                                                             // 1197
                    };                                                                                              // 1198
                                                                                                                    // 1199
                    req.onerror = function () {                                                                     // 1200
                        reject(req.error);                                                                          // 1201
                    };                                                                                              // 1202
                })['catch'](reject);                                                                                // 1203
            });                                                                                                     // 1204
                                                                                                                    // 1205
            executeCallback(promise, callback);                                                                     // 1206
            return promise;                                                                                         // 1207
        }                                                                                                           // 1208
                                                                                                                    // 1209
        // Iterate over all items stored in database.                                                               // 1210
        function iterate(iterator, callback) {                                                                      // 1211
            var self = this;                                                                                        // 1212
                                                                                                                    // 1213
            var promise = new Promise(function (resolve, reject) {                                                  // 1214
                self.ready().then(function () {                                                                     // 1215
                    var dbInfo = self._dbInfo;                                                                      // 1216
                    var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);  // 1217
                                                                                                                    // 1218
                    var req = store.openCursor();                                                                   // 1219
                    var iterationNumber = 1;                                                                        // 1220
                                                                                                                    // 1221
                    req.onsuccess = function () {                                                                   // 1222
                        var cursor = req.result;                                                                    // 1223
                                                                                                                    // 1224
                        if (cursor) {                                                                               // 1225
                            var value = cursor.value;                                                               // 1226
                            if (_isEncodedBlob(value)) {                                                            // 1227
                                value = _decodeBlob(value);                                                         // 1228
                            }                                                                                       // 1229
                            var result = iterator(value, cursor.key, iterationNumber++);                            // 1230
                                                                                                                    // 1231
                            if (result !== void 0) {                                                                // 1232
                                resolve(result);                                                                    // 1233
                            } else {                                                                                // 1234
                                cursor['continue']();                                                               // 1235
                            }                                                                                       // 1236
                        } else {                                                                                    // 1237
                            resolve();                                                                              // 1238
                        }                                                                                           // 1239
                    };                                                                                              // 1240
                                                                                                                    // 1241
                    req.onerror = function () {                                                                     // 1242
                        reject(req.error);                                                                          // 1243
                    };                                                                                              // 1244
                })['catch'](reject);                                                                                // 1245
            });                                                                                                     // 1246
                                                                                                                    // 1247
            executeCallback(promise, callback);                                                                     // 1248
                                                                                                                    // 1249
            return promise;                                                                                         // 1250
        }                                                                                                           // 1251
                                                                                                                    // 1252
        function setItem(key, value, callback) {                                                                    // 1253
            var self = this;                                                                                        // 1254
                                                                                                                    // 1255
            // Cast the key to a string, as that's all we can set as a key.                                         // 1256
            if (typeof key !== 'string') {                                                                          // 1257
                globalObject.console.warn(key + ' used as a key, but it is not a string.');                         // 1258
                key = String(key);                                                                                  // 1259
            }                                                                                                       // 1260
                                                                                                                    // 1261
            var promise = new Promise(function (resolve, reject) {                                                  // 1262
                var dbInfo;                                                                                         // 1263
                self.ready().then(function () {                                                                     // 1264
                    dbInfo = self._dbInfo;                                                                          // 1265
                    return _checkBlobSupport(dbInfo.db);                                                            // 1266
                }).then(function (blobSupport) {                                                                    // 1267
                    if (!blobSupport && value instanceof Blob) {                                                    // 1268
                        return _encodeBlob(value);                                                                  // 1269
                    }                                                                                               // 1270
                    return value;                                                                                   // 1271
                }).then(function (value) {                                                                          // 1272
                    var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');                         // 1273
                    var store = transaction.objectStore(dbInfo.storeName);                                          // 1274
                                                                                                                    // 1275
                    // The reason we don't _save_ null is because IE 10 does                                        // 1276
                    // not support saving the `null` type in IndexedDB. How                                         // 1277
                    // ironic, given the bug below!                                                                 // 1278
                    // See: https://github.com/mozilla/localForage/issues/161                                       // 1279
                    if (value === null) {                                                                           // 1280
                        value = undefined;                                                                          // 1281
                    }                                                                                               // 1282
                                                                                                                    // 1283
                    var req = store.put(value, key);                                                                // 1284
                    transaction.oncomplete = function () {                                                          // 1285
                        // Cast to undefined so the value passed to                                                 // 1286
                        // callback/promise is the same as what one would get out                                   // 1287
                        // of `getItem()` later. This leads to some weirdness                                       // 1288
                        // (setItem('foo', undefined) will return `null`), but                                      // 1289
                        // it's not my fault localStorage is our baseline and that                                  // 1290
                        // it's weird.                                                                              // 1291
                        if (value === undefined) {                                                                  // 1292
                            value = null;                                                                           // 1293
                        }                                                                                           // 1294
                                                                                                                    // 1295
                        resolve(value);                                                                             // 1296
                    };                                                                                              // 1297
                    transaction.onabort = transaction.onerror = function () {                                       // 1298
                        var err = req.error ? req.error : req.transaction.error;                                    // 1299
                        reject(err);                                                                                // 1300
                    };                                                                                              // 1301
                })['catch'](reject);                                                                                // 1302
            });                                                                                                     // 1303
                                                                                                                    // 1304
            executeCallback(promise, callback);                                                                     // 1305
            return promise;                                                                                         // 1306
        }                                                                                                           // 1307
                                                                                                                    // 1308
        function removeItem(key, callback) {                                                                        // 1309
            var self = this;                                                                                        // 1310
                                                                                                                    // 1311
            // Cast the key to a string, as that's all we can set as a key.                                         // 1312
            if (typeof key !== 'string') {                                                                          // 1313
                globalObject.console.warn(key + ' used as a key, but it is not a string.');                         // 1314
                key = String(key);                                                                                  // 1315
            }                                                                                                       // 1316
                                                                                                                    // 1317
            var promise = new Promise(function (resolve, reject) {                                                  // 1318
                self.ready().then(function () {                                                                     // 1319
                    var dbInfo = self._dbInfo;                                                                      // 1320
                    var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');                         // 1321
                    var store = transaction.objectStore(dbInfo.storeName);                                          // 1322
                                                                                                                    // 1323
                    // We use a Grunt task to make this safe for IE and some                                        // 1324
                    // versions of Android (including those used by Cordova).                                       // 1325
                    // Normally IE won't like `.delete()` and will insist on                                        // 1326
                    // using `['delete']()`, but we have a build step that                                          // 1327
                    // fixes this for us now.                                                                       // 1328
                    var req = store['delete'](key);                                                                 // 1329
                    transaction.oncomplete = function () {                                                          // 1330
                        resolve();                                                                                  // 1331
                    };                                                                                              // 1332
                                                                                                                    // 1333
                    transaction.onerror = function () {                                                             // 1334
                        reject(req.error);                                                                          // 1335
                    };                                                                                              // 1336
                                                                                                                    // 1337
                    // The request will be also be aborted if we've exceeded our storage                            // 1338
                    // space.                                                                                       // 1339
                    transaction.onabort = function () {                                                             // 1340
                        var err = req.error ? req.error : req.transaction.error;                                    // 1341
                        reject(err);                                                                                // 1342
                    };                                                                                              // 1343
                })['catch'](reject);                                                                                // 1344
            });                                                                                                     // 1345
                                                                                                                    // 1346
            executeCallback(promise, callback);                                                                     // 1347
            return promise;                                                                                         // 1348
        }                                                                                                           // 1349
                                                                                                                    // 1350
        function clear(callback) {                                                                                  // 1351
            var self = this;                                                                                        // 1352
                                                                                                                    // 1353
            var promise = new Promise(function (resolve, reject) {                                                  // 1354
                self.ready().then(function () {                                                                     // 1355
                    var dbInfo = self._dbInfo;                                                                      // 1356
                    var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');                         // 1357
                    var store = transaction.objectStore(dbInfo.storeName);                                          // 1358
                    var req = store.clear();                                                                        // 1359
                                                                                                                    // 1360
                    transaction.oncomplete = function () {                                                          // 1361
                        resolve();                                                                                  // 1362
                    };                                                                                              // 1363
                                                                                                                    // 1364
                    transaction.onabort = transaction.onerror = function () {                                       // 1365
                        var err = req.error ? req.error : req.transaction.error;                                    // 1366
                        reject(err);                                                                                // 1367
                    };                                                                                              // 1368
                })['catch'](reject);                                                                                // 1369
            });                                                                                                     // 1370
                                                                                                                    // 1371
            executeCallback(promise, callback);                                                                     // 1372
            return promise;                                                                                         // 1373
        }                                                                                                           // 1374
                                                                                                                    // 1375
        function length(callback) {                                                                                 // 1376
            var self = this;                                                                                        // 1377
                                                                                                                    // 1378
            var promise = new Promise(function (resolve, reject) {                                                  // 1379
                self.ready().then(function () {                                                                     // 1380
                    var dbInfo = self._dbInfo;                                                                      // 1381
                    var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);  // 1382
                    var req = store.count();                                                                        // 1383
                                                                                                                    // 1384
                    req.onsuccess = function () {                                                                   // 1385
                        resolve(req.result);                                                                        // 1386
                    };                                                                                              // 1387
                                                                                                                    // 1388
                    req.onerror = function () {                                                                     // 1389
                        reject(req.error);                                                                          // 1390
                    };                                                                                              // 1391
                })['catch'](reject);                                                                                // 1392
            });                                                                                                     // 1393
                                                                                                                    // 1394
            executeCallback(promise, callback);                                                                     // 1395
            return promise;                                                                                         // 1396
        }                                                                                                           // 1397
                                                                                                                    // 1398
        function key(n, callback) {                                                                                 // 1399
            var self = this;                                                                                        // 1400
                                                                                                                    // 1401
            var promise = new Promise(function (resolve, reject) {                                                  // 1402
                if (n < 0) {                                                                                        // 1403
                    resolve(null);                                                                                  // 1404
                                                                                                                    // 1405
                    return;                                                                                         // 1406
                }                                                                                                   // 1407
                                                                                                                    // 1408
                self.ready().then(function () {                                                                     // 1409
                    var dbInfo = self._dbInfo;                                                                      // 1410
                    var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);  // 1411
                                                                                                                    // 1412
                    var advanced = false;                                                                           // 1413
                    var req = store.openCursor();                                                                   // 1414
                    req.onsuccess = function () {                                                                   // 1415
                        var cursor = req.result;                                                                    // 1416
                        if (!cursor) {                                                                              // 1417
                            // this means there weren't enough keys                                                 // 1418
                            resolve(null);                                                                          // 1419
                                                                                                                    // 1420
                            return;                                                                                 // 1421
                        }                                                                                           // 1422
                                                                                                                    // 1423
                        if (n === 0) {                                                                              // 1424
                            // We have the first key, return it if that's what they                                 // 1425
                            // wanted.                                                                              // 1426
                            resolve(cursor.key);                                                                    // 1427
                        } else {                                                                                    // 1428
                            if (!advanced) {                                                                        // 1429
                                // Otherwise, ask the cursor to skip ahead n                                        // 1430
                                // records.                                                                         // 1431
                                advanced = true;                                                                    // 1432
                                cursor.advance(n);                                                                  // 1433
                            } else {                                                                                // 1434
                                // When we get here, we've got the nth key.                                         // 1435
                                resolve(cursor.key);                                                                // 1436
                            }                                                                                       // 1437
                        }                                                                                           // 1438
                    };                                                                                              // 1439
                                                                                                                    // 1440
                    req.onerror = function () {                                                                     // 1441
                        reject(req.error);                                                                          // 1442
                    };                                                                                              // 1443
                })['catch'](reject);                                                                                // 1444
            });                                                                                                     // 1445
                                                                                                                    // 1446
            executeCallback(promise, callback);                                                                     // 1447
            return promise;                                                                                         // 1448
        }                                                                                                           // 1449
                                                                                                                    // 1450
        function keys(callback) {                                                                                   // 1451
            var self = this;                                                                                        // 1452
                                                                                                                    // 1453
            var promise = new Promise(function (resolve, reject) {                                                  // 1454
                self.ready().then(function () {                                                                     // 1455
                    var dbInfo = self._dbInfo;                                                                      // 1456
                    var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);  // 1457
                                                                                                                    // 1458
                    var req = store.openCursor();                                                                   // 1459
                    var keys = [];                                                                                  // 1460
                                                                                                                    // 1461
                    req.onsuccess = function () {                                                                   // 1462
                        var cursor = req.result;                                                                    // 1463
                                                                                                                    // 1464
                        if (!cursor) {                                                                              // 1465
                            resolve(keys);                                                                          // 1466
                            return;                                                                                 // 1467
                        }                                                                                           // 1468
                                                                                                                    // 1469
                        keys.push(cursor.key);                                                                      // 1470
                        cursor['continue']();                                                                       // 1471
                    };                                                                                              // 1472
                                                                                                                    // 1473
                    req.onerror = function () {                                                                     // 1474
                        reject(req.error);                                                                          // 1475
                    };                                                                                              // 1476
                })['catch'](reject);                                                                                // 1477
            });                                                                                                     // 1478
                                                                                                                    // 1479
            executeCallback(promise, callback);                                                                     // 1480
            return promise;                                                                                         // 1481
        }                                                                                                           // 1482
                                                                                                                    // 1483
        function executeCallback(promise, callback) {                                                               // 1484
            if (callback) {                                                                                         // 1485
                promise.then(function (result) {                                                                    // 1486
                    callback(null, result);                                                                         // 1487
                }, function (error) {                                                                               // 1488
                    callback(error);                                                                                // 1489
                });                                                                                                 // 1490
            }                                                                                                       // 1491
        }                                                                                                           // 1492
                                                                                                                    // 1493
        var asyncStorage = {                                                                                        // 1494
            _driver: 'asyncStorage',                                                                                // 1495
            _initStorage: _initStorage,                                                                             // 1496
            iterate: iterate,                                                                                       // 1497
            getItem: getItem,                                                                                       // 1498
            setItem: setItem,                                                                                       // 1499
            removeItem: removeItem,                                                                                 // 1500
            clear: clear,                                                                                           // 1501
            length: length,                                                                                         // 1502
            key: key,                                                                                               // 1503
            keys: keys                                                                                              // 1504
        };                                                                                                          // 1505
                                                                                                                    // 1506
        module.exports = asyncStorage;                                                                              // 1507
    }).call(typeof window !== 'undefined' ? window : self);                                                         // 1508
});                                                                                                                 // 1509
(function (global, factory) {                                                                                       // 1510
    if (typeof define === 'function' && define.amd) {                                                               // 1511
        define('localStorageWrapper', ['exports', 'module'], factory);                                              // 1512
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {                                   // 1513
        factory(exports, module);                                                                                   // 1514
    } else {                                                                                                        // 1515
        var mod = {                                                                                                 // 1516
            exports: {}                                                                                             // 1517
        };                                                                                                          // 1518
        factory(mod.exports, mod);                                                                                  // 1519
        global.localStorageWrapper = mod.exports;                                                                   // 1520
    }                                                                                                               // 1521
})(this, function (exports, module) {                                                                               // 1522
    'use strict';                                                                                                   // 1523
                                                                                                                    // 1524
    var _systemImportTransformerGlobalIdentifier = typeof window !== 'undefined' ? window : self;                   // 1525
                                                                                                                    // 1526
    // If IndexedDB isn't available, we'll fall back to localStorage.                                               // 1527
    // Note that this will have considerable performance and storage                                                // 1528
    // side-effects (all data will be serialized on save and only data that                                         // 1529
    // can be converted to a string via `JSON.stringify()` will be saved).                                          // 1530
    (function () {                                                                                                  // 1531
        'use strict';                                                                                               // 1532
                                                                                                                    // 1533
        var globalObject = this;                                                                                    // 1534
        var serializer = null;                                                                                      // 1535
        var localStorage = null;                                                                                    // 1536
                                                                                                                    // 1537
        // If the app is running inside a Google Chrome packaged webapp, or some                                    // 1538
        // other context where localStorage isn't available, we don't use                                           // 1539
        // localStorage. This feature detection is preferred over the old                                           // 1540
        // `if (window.chrome && window.chrome.runtime)` code.                                                      // 1541
        // See: https://github.com/mozilla/localForage/issues/68                                                    // 1542
        try {                                                                                                       // 1543
            // If localStorage isn't available, we get outta here!                                                  // 1544
            // This should be inside a try catch                                                                    // 1545
            if (!this.localStorage || !('setItem' in this.localStorage)) {                                          // 1546
                return;                                                                                             // 1547
            }                                                                                                       // 1548
            // Initialize localStorage and create a variable to use throughout                                      // 1549
            // the code.                                                                                            // 1550
            localStorage = this.localStorage;                                                                       // 1551
        } catch (e) {                                                                                               // 1552
            return;                                                                                                 // 1553
        }                                                                                                           // 1554
                                                                                                                    // 1555
        // Config the localStorage backend, using options set in the config.                                        // 1556
        function _initStorage(options) {                                                                            // 1557
            var self = this;                                                                                        // 1558
            var dbInfo = {};                                                                                        // 1559
            if (options) {                                                                                          // 1560
                for (var i in options) {                                                                            // 1561
                    dbInfo[i] = options[i];                                                                         // 1562
                }                                                                                                   // 1563
            }                                                                                                       // 1564
                                                                                                                    // 1565
            dbInfo.keyPrefix = dbInfo.name + '/';                                                                   // 1566
                                                                                                                    // 1567
            self._dbInfo = dbInfo;                                                                                  // 1568
                                                                                                                    // 1569
            return new Promise(function (resolve, reject) {                                                         // 1570
                if (typeof _systemImportTransformerGlobalIdentifier.define === 'function' && _systemImportTransformerGlobalIdentifier.define.amd) {
                    _systemImportTransformerGlobalIdentifier.require(['localforageSerializer'], resolve, reject);   // 1572
                } else if (typeof module !== 'undefined' && (module.exports && typeof require !== 'undefined') || typeof module !== 'undefined' && (module.component && (_systemImportTransformerGlobalIdentifier.require && _systemImportTransformerGlobalIdentifier.require.loader === 'component'))) {
                    resolve(require('./../utils/serializer'));                                                      // 1574
                } else {                                                                                            // 1575
                    resolve(_systemImportTransformerGlobalIdentifier['localforageSerializer']);                     // 1576
                }                                                                                                   // 1577
            }).then(function (lib) {                                                                                // 1578
                serializer = lib;                                                                                   // 1579
                return Promise.resolve();                                                                           // 1580
            });                                                                                                     // 1581
        }                                                                                                           // 1582
                                                                                                                    // 1583
        // Remove all keys from the datastore, effectively destroying all data in                                   // 1584
        // the app's key/value store!                                                                               // 1585
        function clear(callback) {                                                                                  // 1586
            var self = this;                                                                                        // 1587
            var promise = self.ready().then(function () {                                                           // 1588
                var keyPrefix = self._dbInfo.keyPrefix;                                                             // 1589
                                                                                                                    // 1590
                for (var i = localStorage.length - 1; i >= 0; i--) {                                                // 1591
                    var key = localStorage.key(i);                                                                  // 1592
                                                                                                                    // 1593
                    if (key.indexOf(keyPrefix) === 0) {                                                             // 1594
                        localStorage.removeItem(key);                                                               // 1595
                    }                                                                                               // 1596
                }                                                                                                   // 1597
            });                                                                                                     // 1598
                                                                                                                    // 1599
            executeCallback(promise, callback);                                                                     // 1600
            return promise;                                                                                         // 1601
        }                                                                                                           // 1602
                                                                                                                    // 1603
        // Retrieve an item from the store. Unlike the original async_storage                                       // 1604
        // library in Gaia, we don't modify return values at all. If a key's value                                  // 1605
        // is `undefined`, we pass that value to the callback function.                                             // 1606
        function getItem(key, callback) {                                                                           // 1607
            var self = this;                                                                                        // 1608
                                                                                                                    // 1609
            // Cast the key to a string, as that's all we can set as a key.                                         // 1610
            if (typeof key !== 'string') {                                                                          // 1611
                globalObject.console.warn(key + ' used as a key, but it is not a string.');                         // 1612
                key = String(key);                                                                                  // 1613
            }                                                                                                       // 1614
                                                                                                                    // 1615
            var promise = self.ready().then(function () {                                                           // 1616
                var dbInfo = self._dbInfo;                                                                          // 1617
                var result = localStorage.getItem(dbInfo.keyPrefix + key);                                          // 1618
                                                                                                                    // 1619
                // If a result was found, parse it from the serialized                                              // 1620
                // string into a JS object. If result isn't truthy, the key                                         // 1621
                // is likely undefined and we'll pass it straight to the                                            // 1622
                // callback.                                                                                        // 1623
                if (result) {                                                                                       // 1624
                    result = serializer.deserialize(result);                                                        // 1625
                }                                                                                                   // 1626
                                                                                                                    // 1627
                return result;                                                                                      // 1628
            });                                                                                                     // 1629
                                                                                                                    // 1630
            executeCallback(promise, callback);                                                                     // 1631
            return promise;                                                                                         // 1632
        }                                                                                                           // 1633
                                                                                                                    // 1634
        // Iterate over all items in the store.                                                                     // 1635
        function iterate(iterator, callback) {                                                                      // 1636
            var self = this;                                                                                        // 1637
                                                                                                                    // 1638
            var promise = self.ready().then(function () {                                                           // 1639
                var keyPrefix = self._dbInfo.keyPrefix;                                                             // 1640
                var keyPrefixLength = keyPrefix.length;                                                             // 1641
                var length = localStorage.length;                                                                   // 1642
                                                                                                                    // 1643
                for (var i = 0; i < length; i++) {                                                                  // 1644
                    var key = localStorage.key(i);                                                                  // 1645
                    if (key.indexOf(keyPrefix) !== 0) {                                                             // 1646
                        continue;                                                                                   // 1647
                    }                                                                                               // 1648
                    var value = localStorage.getItem(key);                                                          // 1649
                                                                                                                    // 1650
                    // If a result was found, parse it from the serialized                                          // 1651
                    // string into a JS object. If result isn't truthy, the                                         // 1652
                    // key is likely undefined and we'll pass it straight                                           // 1653
                    // to the iterator.                                                                             // 1654
                    if (value) {                                                                                    // 1655
                        value = serializer.deserialize(value);                                                      // 1656
                    }                                                                                               // 1657
                                                                                                                    // 1658
                    value = iterator(value, key.substring(keyPrefixLength), i + 1);                                 // 1659
                                                                                                                    // 1660
                    if (value !== void 0) {                                                                         // 1661
                        return value;                                                                               // 1662
                    }                                                                                               // 1663
                }                                                                                                   // 1664
            });                                                                                                     // 1665
                                                                                                                    // 1666
            executeCallback(promise, callback);                                                                     // 1667
            return promise;                                                                                         // 1668
        }                                                                                                           // 1669
                                                                                                                    // 1670
        // Same as localStorage's key() method, except takes a callback.                                            // 1671
        function key(n, callback) {                                                                                 // 1672
            var self = this;                                                                                        // 1673
            var promise = self.ready().then(function () {                                                           // 1674
                var dbInfo = self._dbInfo;                                                                          // 1675
                var result;                                                                                         // 1676
                try {                                                                                               // 1677
                    result = localStorage.key(n);                                                                   // 1678
                } catch (error) {                                                                                   // 1679
                    result = null;                                                                                  // 1680
                }                                                                                                   // 1681
                                                                                                                    // 1682
                // Remove the prefix from the key, if a key is found.                                               // 1683
                if (result) {                                                                                       // 1684
                    result = result.substring(dbInfo.keyPrefix.length);                                             // 1685
                }                                                                                                   // 1686
                                                                                                                    // 1687
                return result;                                                                                      // 1688
            });                                                                                                     // 1689
                                                                                                                    // 1690
            executeCallback(promise, callback);                                                                     // 1691
            return promise;                                                                                         // 1692
        }                                                                                                           // 1693
                                                                                                                    // 1694
        function keys(callback) {                                                                                   // 1695
            var self = this;                                                                                        // 1696
            var promise = self.ready().then(function () {                                                           // 1697
                var dbInfo = self._dbInfo;                                                                          // 1698
                var length = localStorage.length;                                                                   // 1699
                var keys = [];                                                                                      // 1700
                                                                                                                    // 1701
                for (var i = 0; i < length; i++) {                                                                  // 1702
                    if (localStorage.key(i).indexOf(dbInfo.keyPrefix) === 0) {                                      // 1703
                        keys.push(localStorage.key(i).substring(dbInfo.keyPrefix.length));                          // 1704
                    }                                                                                               // 1705
                }                                                                                                   // 1706
                                                                                                                    // 1707
                return keys;                                                                                        // 1708
            });                                                                                                     // 1709
                                                                                                                    // 1710
            executeCallback(promise, callback);                                                                     // 1711
            return promise;                                                                                         // 1712
        }                                                                                                           // 1713
                                                                                                                    // 1714
        // Supply the number of keys in the datastore to the callback function.                                     // 1715
        function length(callback) {                                                                                 // 1716
            var self = this;                                                                                        // 1717
            var promise = self.keys().then(function (keys) {                                                        // 1718
                return keys.length;                                                                                 // 1719
            });                                                                                                     // 1720
                                                                                                                    // 1721
            executeCallback(promise, callback);                                                                     // 1722
            return promise;                                                                                         // 1723
        }                                                                                                           // 1724
                                                                                                                    // 1725
        // Remove an item from the store, nice and simple.                                                          // 1726
        function removeItem(key, callback) {                                                                        // 1727
            var self = this;                                                                                        // 1728
                                                                                                                    // 1729
            // Cast the key to a string, as that's all we can set as a key.                                         // 1730
            if (typeof key !== 'string') {                                                                          // 1731
                globalObject.console.warn(key + ' used as a key, but it is not a string.');                         // 1732
                key = String(key);                                                                                  // 1733
            }                                                                                                       // 1734
                                                                                                                    // 1735
            var promise = self.ready().then(function () {                                                           // 1736
                var dbInfo = self._dbInfo;                                                                          // 1737
                localStorage.removeItem(dbInfo.keyPrefix + key);                                                    // 1738
            });                                                                                                     // 1739
                                                                                                                    // 1740
            executeCallback(promise, callback);                                                                     // 1741
            return promise;                                                                                         // 1742
        }                                                                                                           // 1743
                                                                                                                    // 1744
        // Set a key's value and run an optional callback once the value is set.                                    // 1745
        // Unlike Gaia's implementation, the callback function is passed the value,                                 // 1746
        // in case you want to operate on that value only after you're sure it                                      // 1747
        // saved, or something like that.                                                                           // 1748
        function setItem(key, value, callback) {                                                                    // 1749
            var self = this;                                                                                        // 1750
                                                                                                                    // 1751
            // Cast the key to a string, as that's all we can set as a key.                                         // 1752
            if (typeof key !== 'string') {                                                                          // 1753
                globalObject.console.warn(key + ' used as a key, but it is not a string.');                         // 1754
                key = String(key);                                                                                  // 1755
            }                                                                                                       // 1756
                                                                                                                    // 1757
            var promise = self.ready().then(function () {                                                           // 1758
                // Convert undefined values to null.                                                                // 1759
                // https://github.com/mozilla/localForage/pull/42                                                   // 1760
                if (value === undefined) {                                                                          // 1761
                    value = null;                                                                                   // 1762
                }                                                                                                   // 1763
                                                                                                                    // 1764
                // Save the original value to pass to the callback.                                                 // 1765
                var originalValue = value;                                                                          // 1766
                                                                                                                    // 1767
                return new Promise(function (resolve, reject) {                                                     // 1768
                    serializer.serialize(value, function (value, error) {                                           // 1769
                        if (error) {                                                                                // 1770
                            reject(error);                                                                          // 1771
                        } else {                                                                                    // 1772
                            try {                                                                                   // 1773
                                var dbInfo = self._dbInfo;                                                          // 1774
                                localStorage.setItem(dbInfo.keyPrefix + key, value);                                // 1775
                                resolve(originalValue);                                                             // 1776
                            } catch (e) {                                                                           // 1777
                                // localStorage capacity exceeded.                                                  // 1778
                                // TODO: Make this a specific error/event.                                          // 1779
                                if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {   // 1780
                                    reject(e);                                                                      // 1781
                                }                                                                                   // 1782
                                reject(e);                                                                          // 1783
                            }                                                                                       // 1784
                        }                                                                                           // 1785
                    });                                                                                             // 1786
                });                                                                                                 // 1787
            });                                                                                                     // 1788
                                                                                                                    // 1789
            executeCallback(promise, callback);                                                                     // 1790
            return promise;                                                                                         // 1791
        }                                                                                                           // 1792
                                                                                                                    // 1793
        function executeCallback(promise, callback) {                                                               // 1794
            if (callback) {                                                                                         // 1795
                promise.then(function (result) {                                                                    // 1796
                    callback(null, result);                                                                         // 1797
                }, function (error) {                                                                               // 1798
                    callback(error);                                                                                // 1799
                });                                                                                                 // 1800
            }                                                                                                       // 1801
        }                                                                                                           // 1802
                                                                                                                    // 1803
        var localStorageWrapper = {                                                                                 // 1804
            _driver: 'localStorageWrapper',                                                                         // 1805
            _initStorage: _initStorage,                                                                             // 1806
            // Default API, from Gaia/localStorage.                                                                 // 1807
            iterate: iterate,                                                                                       // 1808
            getItem: getItem,                                                                                       // 1809
            setItem: setItem,                                                                                       // 1810
            removeItem: removeItem,                                                                                 // 1811
            clear: clear,                                                                                           // 1812
            length: length,                                                                                         // 1813
            key: key,                                                                                               // 1814
            keys: keys                                                                                              // 1815
        };                                                                                                          // 1816
                                                                                                                    // 1817
        module.exports = localStorageWrapper;                                                                       // 1818
    }).call(typeof window !== 'undefined' ? window : self);                                                         // 1819
});                                                                                                                 // 1820
(function (global, factory) {                                                                                       // 1821
    if (typeof define === 'function' && define.amd) {                                                               // 1822
        define('webSQLStorage', ['exports', 'module'], factory);                                                    // 1823
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {                                   // 1824
        factory(exports, module);                                                                                   // 1825
    } else {                                                                                                        // 1826
        var mod = {                                                                                                 // 1827
            exports: {}                                                                                             // 1828
        };                                                                                                          // 1829
        factory(mod.exports, mod);                                                                                  // 1830
        global.webSQLStorage = mod.exports;                                                                         // 1831
    }                                                                                                               // 1832
})(this, function (exports, module) {                                                                               // 1833
    'use strict';                                                                                                   // 1834
                                                                                                                    // 1835
    var _systemImportTransformerGlobalIdentifier = typeof window !== 'undefined' ? window : self;                   // 1836
                                                                                                                    // 1837
    /*                                                                                                              // 1838
     * Includes code from:                                                                                          // 1839
     *                                                                                                              // 1840
     * base64-arraybuffer                                                                                           // 1841
     * https://github.com/niklasvh/base64-arraybuffer                                                               // 1842
     *                                                                                                              // 1843
     * Copyright (c) 2012 Niklas von Hertzen                                                                        // 1844
     * Licensed under the MIT license.                                                                              // 1845
     */                                                                                                             // 1846
    (function () {                                                                                                  // 1847
        'use strict';                                                                                               // 1848
                                                                                                                    // 1849
        var globalObject = this;                                                                                    // 1850
        var serializer = null;                                                                                      // 1851
        var openDatabase = this.openDatabase;                                                                       // 1852
                                                                                                                    // 1853
        // If WebSQL methods aren't available, we can stop now.                                                     // 1854
        if (!openDatabase) {                                                                                        // 1855
            return;                                                                                                 // 1856
        }                                                                                                           // 1857
                                                                                                                    // 1858
        // Open the WebSQL database (automatically creates one if one didn't                                        // 1859
        // previously exist), using any options set in the config.                                                  // 1860
        function _initStorage(options) {                                                                            // 1861
            var self = this;                                                                                        // 1862
            var dbInfo = {                                                                                          // 1863
                db: null                                                                                            // 1864
            };                                                                                                      // 1865
                                                                                                                    // 1866
            if (options) {                                                                                          // 1867
                for (var i in options) {                                                                            // 1868
                    dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];                // 1869
                }                                                                                                   // 1870
            }                                                                                                       // 1871
                                                                                                                    // 1872
            var dbInfoPromise = new Promise(function (resolve, reject) {                                            // 1873
                // Open the database; the openDatabase API will automatically                                       // 1874
                // create it for us if it doesn't exist.                                                            // 1875
                try {                                                                                               // 1876
                    dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
                } catch (e) {                                                                                       // 1878
                    return self.setDriver(self.LOCALSTORAGE).then(function () {                                     // 1879
                        return self._initStorage(options);                                                          // 1880
                    }).then(resolve)['catch'](reject);                                                              // 1881
                }                                                                                                   // 1882
                                                                                                                    // 1883
                // Create our key/value table if it doesn't exist.                                                  // 1884
                dbInfo.db.transaction(function (t) {                                                                // 1885
                    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' (id INTEGER PRIMARY KEY, key unique, value)', [], function () {
                        self._dbInfo = dbInfo;                                                                      // 1887
                        resolve();                                                                                  // 1888
                    }, function (t, error) {                                                                        // 1889
                        reject(error);                                                                              // 1890
                    });                                                                                             // 1891
                });                                                                                                 // 1892
            });                                                                                                     // 1893
                                                                                                                    // 1894
            return new Promise(function (resolve, reject) {                                                         // 1895
                if (typeof _systemImportTransformerGlobalIdentifier.define === 'function' && _systemImportTransformerGlobalIdentifier.define.amd) {
                    _systemImportTransformerGlobalIdentifier.require(['localforageSerializer'], resolve, reject);   // 1897
                } else if (typeof module !== 'undefined' && (module.exports && typeof require !== 'undefined') || typeof module !== 'undefined' && (module.component && (_systemImportTransformerGlobalIdentifier.require && _systemImportTransformerGlobalIdentifier.require.loader === 'component'))) {
                    resolve(require('./../utils/serializer'));                                                      // 1899
                } else {                                                                                            // 1900
                    resolve(_systemImportTransformerGlobalIdentifier['localforageSerializer']);                     // 1901
                }                                                                                                   // 1902
            }).then(function (lib) {                                                                                // 1903
                serializer = lib;                                                                                   // 1904
                return dbInfoPromise;                                                                               // 1905
            });                                                                                                     // 1906
        }                                                                                                           // 1907
                                                                                                                    // 1908
        function getItem(key, callback) {                                                                           // 1909
            var self = this;                                                                                        // 1910
                                                                                                                    // 1911
            // Cast the key to a string, as that's all we can set as a key.                                         // 1912
            if (typeof key !== 'string') {                                                                          // 1913
                globalObject.console.warn(key + ' used as a key, but it is not a string.');                         // 1914
                key = String(key);                                                                                  // 1915
            }                                                                                                       // 1916
                                                                                                                    // 1917
            var promise = new Promise(function (resolve, reject) {                                                  // 1918
                self.ready().then(function () {                                                                     // 1919
                    var dbInfo = self._dbInfo;                                                                      // 1920
                    dbInfo.db.transaction(function (t) {                                                            // 1921
                        t.executeSql('SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                            var result = results.rows.length ? results.rows.item(0).value : null;                   // 1923
                                                                                                                    // 1924
                            // Check to see if this is serialized content we need to                                // 1925
                            // unpack.                                                                              // 1926
                            if (result) {                                                                           // 1927
                                result = serializer.deserialize(result);                                            // 1928
                            }                                                                                       // 1929
                                                                                                                    // 1930
                            resolve(result);                                                                        // 1931
                        }, function (t, error) {                                                                    // 1932
                                                                                                                    // 1933
                            reject(error);                                                                          // 1934
                        });                                                                                         // 1935
                    });                                                                                             // 1936
                })['catch'](reject);                                                                                // 1937
            });                                                                                                     // 1938
                                                                                                                    // 1939
            executeCallback(promise, callback);                                                                     // 1940
            return promise;                                                                                         // 1941
        }                                                                                                           // 1942
                                                                                                                    // 1943
        function iterate(iterator, callback) {                                                                      // 1944
            var self = this;                                                                                        // 1945
                                                                                                                    // 1946
            var promise = new Promise(function (resolve, reject) {                                                  // 1947
                self.ready().then(function () {                                                                     // 1948
                    var dbInfo = self._dbInfo;                                                                      // 1949
                                                                                                                    // 1950
                    dbInfo.db.transaction(function (t) {                                                            // 1951
                        t.executeSql('SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {               // 1952
                            var rows = results.rows;                                                                // 1953
                            var length = rows.length;                                                               // 1954
                                                                                                                    // 1955
                            for (var i = 0; i < length; i++) {                                                      // 1956
                                var item = rows.item(i);                                                            // 1957
                                var result = item.value;                                                            // 1958
                                                                                                                    // 1959
                                // Check to see if this is serialized content                                       // 1960
                                // we need to unpack.                                                               // 1961
                                if (result) {                                                                       // 1962
                                    result = serializer.deserialize(result);                                        // 1963
                                }                                                                                   // 1964
                                                                                                                    // 1965
                                result = iterator(result, item.key, i + 1);                                         // 1966
                                                                                                                    // 1967
                                // void(0) prevents problems with redefinition                                      // 1968
                                // of `undefined`.                                                                  // 1969
                                if (result !== void 0) {                                                            // 1970
                                    resolve(result);                                                                // 1971
                                    return;                                                                         // 1972
                                }                                                                                   // 1973
                            }                                                                                       // 1974
                                                                                                                    // 1975
                            resolve();                                                                              // 1976
                        }, function (t, error) {                                                                    // 1977
                            reject(error);                                                                          // 1978
                        });                                                                                         // 1979
                    });                                                                                             // 1980
                })['catch'](reject);                                                                                // 1981
            });                                                                                                     // 1982
                                                                                                                    // 1983
            executeCallback(promise, callback);                                                                     // 1984
            return promise;                                                                                         // 1985
        }                                                                                                           // 1986
                                                                                                                    // 1987
        function setItem(key, value, callback) {                                                                    // 1988
            var self = this;                                                                                        // 1989
                                                                                                                    // 1990
            // Cast the key to a string, as that's all we can set as a key.                                         // 1991
            if (typeof key !== 'string') {                                                                          // 1992
                globalObject.console.warn(key + ' used as a key, but it is not a string.');                         // 1993
                key = String(key);                                                                                  // 1994
            }                                                                                                       // 1995
                                                                                                                    // 1996
            var promise = new Promise(function (resolve, reject) {                                                  // 1997
                self.ready().then(function () {                                                                     // 1998
                    // The localStorage API doesn't return undefined values in an                                   // 1999
                    // "expected" way, so undefined is always cast to null in all                                   // 2000
                    // drivers. See: https://github.com/mozilla/localForage/pull/42                                 // 2001
                    if (value === undefined) {                                                                      // 2002
                        value = null;                                                                               // 2003
                    }                                                                                               // 2004
                                                                                                                    // 2005
                    // Save the original value to pass to the callback.                                             // 2006
                    var originalValue = value;                                                                      // 2007
                                                                                                                    // 2008
                    serializer.serialize(value, function (value, error) {                                           // 2009
                        if (error) {                                                                                // 2010
                            reject(error);                                                                          // 2011
                        } else {                                                                                    // 2012
                            var dbInfo = self._dbInfo;                                                              // 2013
                            dbInfo.db.transaction(function (t) {                                                    // 2014
                                t.executeSql('INSERT OR REPLACE INTO ' + dbInfo.storeName + ' (key, value) VALUES (?, ?)', [key, value], function () {
                                    resolve(originalValue);                                                         // 2016
                                }, function (t, error) {                                                            // 2017
                                    reject(error);                                                                  // 2018
                                });                                                                                 // 2019
                            }, function (sqlError) {                                                                // 2020
                                // The transaction failed; check                                                    // 2021
                                // to see if it's a quota error.                                                    // 2022
                                if (sqlError.code === sqlError.QUOTA_ERR) {                                         // 2023
                                    // We reject the callback outright for now, but                                 // 2024
                                    // it's worth trying to re-run the transaction.                                 // 2025
                                    // Even if the user accepts the prompt to use                                   // 2026
                                    // more storage on Safari, this error will                                      // 2027
                                    // be called.                                                                   // 2028
                                    //                                                                              // 2029
                                    // TODO: Try to re-run the transaction.                                         // 2030
                                    reject(sqlError);                                                               // 2031
                                }                                                                                   // 2032
                            });                                                                                     // 2033
                        }                                                                                           // 2034
                    });                                                                                             // 2035
                })['catch'](reject);                                                                                // 2036
            });                                                                                                     // 2037
                                                                                                                    // 2038
            executeCallback(promise, callback);                                                                     // 2039
            return promise;                                                                                         // 2040
        }                                                                                                           // 2041
                                                                                                                    // 2042
        function removeItem(key, callback) {                                                                        // 2043
            var self = this;                                                                                        // 2044
                                                                                                                    // 2045
            // Cast the key to a string, as that's all we can set as a key.                                         // 2046
            if (typeof key !== 'string') {                                                                          // 2047
                globalObject.console.warn(key + ' used as a key, but it is not a string.');                         // 2048
                key = String(key);                                                                                  // 2049
            }                                                                                                       // 2050
                                                                                                                    // 2051
            var promise = new Promise(function (resolve, reject) {                                                  // 2052
                self.ready().then(function () {                                                                     // 2053
                    var dbInfo = self._dbInfo;                                                                      // 2054
                    dbInfo.db.transaction(function (t) {                                                            // 2055
                        t.executeSql('DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {     // 2056
                            resolve();                                                                              // 2057
                        }, function (t, error) {                                                                    // 2058
                                                                                                                    // 2059
                            reject(error);                                                                          // 2060
                        });                                                                                         // 2061
                    });                                                                                             // 2062
                })['catch'](reject);                                                                                // 2063
            });                                                                                                     // 2064
                                                                                                                    // 2065
            executeCallback(promise, callback);                                                                     // 2066
            return promise;                                                                                         // 2067
        }                                                                                                           // 2068
                                                                                                                    // 2069
        // Deletes every item in the table.                                                                         // 2070
        // TODO: Find out if this resets the AUTO_INCREMENT number.                                                 // 2071
        function clear(callback) {                                                                                  // 2072
            var self = this;                                                                                        // 2073
                                                                                                                    // 2074
            var promise = new Promise(function (resolve, reject) {                                                  // 2075
                self.ready().then(function () {                                                                     // 2076
                    var dbInfo = self._dbInfo;                                                                      // 2077
                    dbInfo.db.transaction(function (t) {                                                            // 2078
                        t.executeSql('DELETE FROM ' + dbInfo.storeName, [], function () {                           // 2079
                            resolve();                                                                              // 2080
                        }, function (t, error) {                                                                    // 2081
                            reject(error);                                                                          // 2082
                        });                                                                                         // 2083
                    });                                                                                             // 2084
                })['catch'](reject);                                                                                // 2085
            });                                                                                                     // 2086
                                                                                                                    // 2087
            executeCallback(promise, callback);                                                                     // 2088
            return promise;                                                                                         // 2089
        }                                                                                                           // 2090
                                                                                                                    // 2091
        // Does a simple `COUNT(key)` to get the number of items stored in                                          // 2092
        // localForage.                                                                                             // 2093
        function length(callback) {                                                                                 // 2094
            var self = this;                                                                                        // 2095
                                                                                                                    // 2096
            var promise = new Promise(function (resolve, reject) {                                                  // 2097
                self.ready().then(function () {                                                                     // 2098
                    var dbInfo = self._dbInfo;                                                                      // 2099
                    dbInfo.db.transaction(function (t) {                                                            // 2100
                        // Ahhh, SQL makes this one soooooo easy.                                                   // 2101
                        t.executeSql('SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                            var result = results.rows.item(0).c;                                                    // 2103
                                                                                                                    // 2104
                            resolve(result);                                                                        // 2105
                        }, function (t, error) {                                                                    // 2106
                                                                                                                    // 2107
                            reject(error);                                                                          // 2108
                        });                                                                                         // 2109
                    });                                                                                             // 2110
                })['catch'](reject);                                                                                // 2111
            });                                                                                                     // 2112
                                                                                                                    // 2113
            executeCallback(promise, callback);                                                                     // 2114
            return promise;                                                                                         // 2115
        }                                                                                                           // 2116
                                                                                                                    // 2117
        // Return the key located at key index X; essentially gets the key from a                                   // 2118
        // `WHERE id = ?`. This is the most efficient way I can think to implement                                  // 2119
        // this rarely-used (in my experience) part of the API, but it can seem                                     // 2120
        // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so                                  // 2121
        // the ID of each key will change every time it's updated. Perhaps a stored                                 // 2122
        // procedure for the `setItem()` SQL would solve this problem?                                              // 2123
        // TODO: Don't change ID on `setItem()`.                                                                    // 2124
        function key(n, callback) {                                                                                 // 2125
            var self = this;                                                                                        // 2126
                                                                                                                    // 2127
            var promise = new Promise(function (resolve, reject) {                                                  // 2128
                self.ready().then(function () {                                                                     // 2129
                    var dbInfo = self._dbInfo;                                                                      // 2130
                    dbInfo.db.transaction(function (t) {                                                            // 2131
                        t.executeSql('SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                            var result = results.rows.length ? results.rows.item(0).key : null;                     // 2133
                            resolve(result);                                                                        // 2134
                        }, function (t, error) {                                                                    // 2135
                            reject(error);                                                                          // 2136
                        });                                                                                         // 2137
                    });                                                                                             // 2138
                })['catch'](reject);                                                                                // 2139
            });                                                                                                     // 2140
                                                                                                                    // 2141
            executeCallback(promise, callback);                                                                     // 2142
            return promise;                                                                                         // 2143
        }                                                                                                           // 2144
                                                                                                                    // 2145
        function keys(callback) {                                                                                   // 2146
            var self = this;                                                                                        // 2147
                                                                                                                    // 2148
            var promise = new Promise(function (resolve, reject) {                                                  // 2149
                self.ready().then(function () {                                                                     // 2150
                    var dbInfo = self._dbInfo;                                                                      // 2151
                    dbInfo.db.transaction(function (t) {                                                            // 2152
                        t.executeSql('SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {             // 2153
                            var keys = [];                                                                          // 2154
                                                                                                                    // 2155
                            for (var i = 0; i < results.rows.length; i++) {                                         // 2156
                                keys.push(results.rows.item(i).key);                                                // 2157
                            }                                                                                       // 2158
                                                                                                                    // 2159
                            resolve(keys);                                                                          // 2160
                        }, function (t, error) {                                                                    // 2161
                                                                                                                    // 2162
                            reject(error);                                                                          // 2163
                        });                                                                                         // 2164
                    });                                                                                             // 2165
                })['catch'](reject);                                                                                // 2166
            });                                                                                                     // 2167
                                                                                                                    // 2168
            executeCallback(promise, callback);                                                                     // 2169
            return promise;                                                                                         // 2170
        }                                                                                                           // 2171
                                                                                                                    // 2172
        function executeCallback(promise, callback) {                                                               // 2173
            if (callback) {                                                                                         // 2174
                promise.then(function (result) {                                                                    // 2175
                    callback(null, result);                                                                         // 2176
                }, function (error) {                                                                               // 2177
                    callback(error);                                                                                // 2178
                });                                                                                                 // 2179
            }                                                                                                       // 2180
        }                                                                                                           // 2181
                                                                                                                    // 2182
        var webSQLStorage = {                                                                                       // 2183
            _driver: 'webSQLStorage',                                                                               // 2184
            _initStorage: _initStorage,                                                                             // 2185
            iterate: iterate,                                                                                       // 2186
            getItem: getItem,                                                                                       // 2187
            setItem: setItem,                                                                                       // 2188
            removeItem: removeItem,                                                                                 // 2189
            clear: clear,                                                                                           // 2190
            length: length,                                                                                         // 2191
            key: key,                                                                                               // 2192
            keys: keys                                                                                              // 2193
        };                                                                                                          // 2194
                                                                                                                    // 2195
        module.exports = webSQLStorage;                                                                             // 2196
    }).call(typeof window !== 'undefined' ? window : self);                                                         // 2197
});                                                                                                                 // 2198
(function (global, factory) {                                                                                       // 2199
    if (typeof define === 'function' && define.amd) {                                                               // 2200
        define('localforage', ['exports', 'module'], factory);                                                      // 2201
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {                                   // 2202
        factory(exports, module);                                                                                   // 2203
    } else {                                                                                                        // 2204
        var mod = {                                                                                                 // 2205
            exports: {}                                                                                             // 2206
        };                                                                                                          // 2207
        factory(mod.exports, mod);                                                                                  // 2208
        global.localforage = mod.exports;                                                                           // 2209
    }                                                                                                               // 2210
})(this, function (exports, module) {                                                                               // 2211
    'use strict';                                                                                                   // 2212
                                                                                                                    // 2213
    var _systemImportTransformerGlobalIdentifier = typeof window !== 'undefined' ? window : self;                   // 2214
                                                                                                                    // 2215
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
                                                                                                                    // 2217
    (function () {                                                                                                  // 2218
        'use strict';                                                                                               // 2219
                                                                                                                    // 2220
        // Custom drivers are stored here when `defineDriver()` is called.                                          // 2221
        // They are shared across all instances of localForage.                                                     // 2222
        var CustomDrivers = {};                                                                                     // 2223
                                                                                                                    // 2224
        var DriverType = {                                                                                          // 2225
            INDEXEDDB: 'asyncStorage',                                                                              // 2226
            LOCALSTORAGE: 'localStorageWrapper',                                                                    // 2227
            WEBSQL: 'webSQLStorage'                                                                                 // 2228
        };                                                                                                          // 2229
                                                                                                                    // 2230
        var DefaultDriverOrder = [DriverType.INDEXEDDB, DriverType.WEBSQL, DriverType.LOCALSTORAGE];                // 2231
                                                                                                                    // 2232
        var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'];     // 2233
                                                                                                                    // 2234
        var DefaultConfig = {                                                                                       // 2235
            description: '',                                                                                        // 2236
            driver: DefaultDriverOrder.slice(),                                                                     // 2237
            name: 'localforage',                                                                                    // 2238
            // Default DB size is _JUST UNDER_ 5MB, as it's the highest size                                        // 2239
            // we can use without a prompt.                                                                         // 2240
            size: 4980736,                                                                                          // 2241
            storeName: 'keyvaluepairs',                                                                             // 2242
            version: 1.0                                                                                            // 2243
        };                                                                                                          // 2244
                                                                                                                    // 2245
        // Check to see if IndexedDB is available and if it is the latest                                           // 2246
        // implementation; it's our preferred backend library. We use "_spec_test"                                  // 2247
        // as the name of the database because it's not the one we'll operate on,                                   // 2248
        // but it's useful to make sure its using the right spec.                                                   // 2249
        // See: https://github.com/mozilla/localForage/issues/128                                                   // 2250
        var driverSupport = (function (self) {                                                                      // 2251
            // Initialize IndexedDB; fall back to vendor-prefixed versions                                          // 2252
            // if needed.                                                                                           // 2253
            var indexedDB = indexedDB || self.indexedDB || self.webkitIndexedDB || self.mozIndexedDB || self.OIndexedDB || self.msIndexedDB;
                                                                                                                    // 2255
            var result = {};                                                                                        // 2256
                                                                                                                    // 2257
            result[DriverType.WEBSQL] = !!self.openDatabase;                                                        // 2258
            result[DriverType.INDEXEDDB] = !!(function () {                                                         // 2259
                // We mimic PouchDB here; just UA test for Safari (which, as of                                     // 2260
                // iOS 8/Yosemite, doesn't properly support IndexedDB).                                             // 2261
                // IndexedDB support is broken and different from Blink's.                                          // 2262
                // This is faster than the test case (and it's sync), so we just                                    // 2263
                // do this. *SIGH*                                                                                  // 2264
                // http://bl.ocks.org/nolanlawson/raw/c83e9039edf2278047e9/                                         // 2265
                //                                                                                                  // 2266
                // We test for openDatabase because IE Mobile identifies itself                                     // 2267
                // as Safari. Oh the lulz...                                                                        // 2268
                if (typeof self.openDatabase !== 'undefined' && self.navigator && self.navigator.userAgent && /Safari/.test(self.navigator.userAgent) && !/Chrome/.test(self.navigator.userAgent)) {
                    return false;                                                                                   // 2270
                }                                                                                                   // 2271
                try {                                                                                               // 2272
                    return indexedDB && typeof indexedDB.open === 'function' &&                                     // 2273
                    // Some Samsung/HTC Android 4.0-4.3 devices                                                     // 2274
                    // have older IndexedDB specs; if this isn't available                                          // 2275
                    // their IndexedDB is too old for us to use.                                                    // 2276
                    // (Replaces the onupgradeneeded test.)                                                         // 2277
                    typeof self.IDBKeyRange !== 'undefined';                                                        // 2278
                } catch (e) {                                                                                       // 2279
                    return false;                                                                                   // 2280
                }                                                                                                   // 2281
            })();                                                                                                   // 2282
                                                                                                                    // 2283
            result[DriverType.LOCALSTORAGE] = !!(function () {                                                      // 2284
                try {                                                                                               // 2285
                    return self.localStorage && 'setItem' in self.localStorage && self.localStorage.setItem;        // 2286
                } catch (e) {                                                                                       // 2287
                    return false;                                                                                   // 2288
                }                                                                                                   // 2289
            })();                                                                                                   // 2290
                                                                                                                    // 2291
            return result;                                                                                          // 2292
        })(this);                                                                                                   // 2293
                                                                                                                    // 2294
        var isArray = Array.isArray || function (arg) {                                                             // 2295
            return Object.prototype.toString.call(arg) === '[object Array]';                                        // 2296
        };                                                                                                          // 2297
                                                                                                                    // 2298
        function callWhenReady(localForageInstance, libraryMethod) {                                                // 2299
            localForageInstance[libraryMethod] = function () {                                                      // 2300
                var _args = arguments;                                                                              // 2301
                return localForageInstance.ready().then(function () {                                               // 2302
                    return localForageInstance[libraryMethod].apply(localForageInstance, _args);                    // 2303
                });                                                                                                 // 2304
            };                                                                                                      // 2305
        }                                                                                                           // 2306
                                                                                                                    // 2307
        function extend() {                                                                                         // 2308
            for (var i = 1; i < arguments.length; i++) {                                                            // 2309
                var arg = arguments[i];                                                                             // 2310
                                                                                                                    // 2311
                if (arg) {                                                                                          // 2312
                    for (var key in arg) {                                                                          // 2313
                        if (arg.hasOwnProperty(key)) {                                                              // 2314
                            if (isArray(arg[key])) {                                                                // 2315
                                arguments[0][key] = arg[key].slice();                                               // 2316
                            } else {                                                                                // 2317
                                arguments[0][key] = arg[key];                                                       // 2318
                            }                                                                                       // 2319
                        }                                                                                           // 2320
                    }                                                                                               // 2321
                }                                                                                                   // 2322
            }                                                                                                       // 2323
                                                                                                                    // 2324
            return arguments[0];                                                                                    // 2325
        }                                                                                                           // 2326
                                                                                                                    // 2327
        function isLibraryDriver(driverName) {                                                                      // 2328
            for (var driver in DriverType) {                                                                        // 2329
                if (DriverType.hasOwnProperty(driver) && DriverType[driver] === driverName) {                       // 2330
                    return true;                                                                                    // 2331
                }                                                                                                   // 2332
            }                                                                                                       // 2333
                                                                                                                    // 2334
            return false;                                                                                           // 2335
        }                                                                                                           // 2336
                                                                                                                    // 2337
        var LocalForage = (function () {                                                                            // 2338
            function LocalForage(options) {                                                                         // 2339
                _classCallCheck(this, LocalForage);                                                                 // 2340
                                                                                                                    // 2341
                this.INDEXEDDB = DriverType.INDEXEDDB;                                                              // 2342
                this.LOCALSTORAGE = DriverType.LOCALSTORAGE;                                                        // 2343
                this.WEBSQL = DriverType.WEBSQL;                                                                    // 2344
                                                                                                                    // 2345
                this._config = extend({}, DefaultConfig, options);                                                  // 2346
                this._driverSet = null;                                                                             // 2347
                this._ready = false;                                                                                // 2348
                this._dbInfo = null;                                                                                // 2349
                                                                                                                    // 2350
                // Add a stub for each driver API method that delays the call to the                                // 2351
                // corresponding driver method until localForage is ready. These stubs                              // 2352
                // will be replaced by the driver methods as soon as the driver is                                  // 2353
                // loaded, so there is no performance impact.                                                       // 2354
                for (var i = 0; i < LibraryMethods.length; i++) {                                                   // 2355
                    callWhenReady(this, LibraryMethods[i]);                                                         // 2356
                }                                                                                                   // 2357
                                                                                                                    // 2358
                this.setDriver(this._config.driver);                                                                // 2359
            }                                                                                                       // 2360
                                                                                                                    // 2361
            // The actual localForage object that we expose as a module or via a                                    // 2362
            // global. It's extended by pulling in one of our other libraries.                                      // 2363
                                                                                                                    // 2364
            // Set any config values for localForage; can be called anytime before                                  // 2365
            // the first API call (e.g. `getItem`, `setItem`).                                                      // 2366
            // We loop through options so we don't overwrite existing config                                        // 2367
            // values.                                                                                              // 2368
                                                                                                                    // 2369
            LocalForage.prototype.config = function config(options) {                                               // 2370
                // If the options argument is an object, we use it to set values.                                   // 2371
                // Otherwise, we return either a specified config value or all                                      // 2372
                // config values.                                                                                   // 2373
                if (typeof options === 'object') {                                                                  // 2374
                    // If localforage is ready and fully initialized, we can't set                                  // 2375
                    // any new configuration values. Instead, we return an error.                                   // 2376
                    if (this._ready) {                                                                              // 2377
                        return new Error("Can't call config() after localforage " + 'has been used.');              // 2378
                    }                                                                                               // 2379
                                                                                                                    // 2380
                    for (var i in options) {                                                                        // 2381
                        if (i === 'storeName') {                                                                    // 2382
                            options[i] = options[i].replace(/\W/g, '_');                                            // 2383
                        }                                                                                           // 2384
                                                                                                                    // 2385
                        this._config[i] = options[i];                                                               // 2386
                    }                                                                                               // 2387
                                                                                                                    // 2388
                    // after all config options are set and                                                         // 2389
                    // the driver option is used, try setting it                                                    // 2390
                    if ('driver' in options && options.driver) {                                                    // 2391
                        this.setDriver(this._config.driver);                                                        // 2392
                    }                                                                                               // 2393
                                                                                                                    // 2394
                    return true;                                                                                    // 2395
                } else if (typeof options === 'string') {                                                           // 2396
                    return this._config[options];                                                                   // 2397
                } else {                                                                                            // 2398
                    return this._config;                                                                            // 2399
                }                                                                                                   // 2400
            };                                                                                                      // 2401
                                                                                                                    // 2402
            // Used to define a custom driver, shared across all instances of                                       // 2403
            // localForage.                                                                                         // 2404
                                                                                                                    // 2405
            LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {     // 2406
                var promise = new Promise(function (resolve, reject) {                                              // 2407
                    try {                                                                                           // 2408
                        var driverName = driverObject._driver;                                                      // 2409
                        var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');
                        var namingError = new Error('Custom driver name already in use: ' + driverObject._driver);  // 2411
                                                                                                                    // 2412
                        // A driver name should be defined and not overlap with the                                 // 2413
                        // library-defined, default drivers.                                                        // 2414
                        if (!driverObject._driver) {                                                                // 2415
                            reject(complianceError);                                                                // 2416
                            return;                                                                                 // 2417
                        }                                                                                           // 2418
                        if (isLibraryDriver(driverObject._driver)) {                                                // 2419
                            reject(namingError);                                                                    // 2420
                            return;                                                                                 // 2421
                        }                                                                                           // 2422
                                                                                                                    // 2423
                        var customDriverMethods = LibraryMethods.concat('_initStorage');                            // 2424
                        for (var i = 0; i < customDriverMethods.length; i++) {                                      // 2425
                            var customDriverMethod = customDriverMethods[i];                                        // 2426
                            if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== 'function') {
                                reject(complianceError);                                                            // 2428
                                return;                                                                             // 2429
                            }                                                                                       // 2430
                        }                                                                                           // 2431
                                                                                                                    // 2432
                        var supportPromise = Promise.resolve(true);                                                 // 2433
                        if ('_support' in driverObject) {                                                           // 2434
                            if (driverObject._support && typeof driverObject._support === 'function') {             // 2435
                                supportPromise = driverObject._support();                                           // 2436
                            } else {                                                                                // 2437
                                supportPromise = Promise.resolve(!!driverObject._support);                          // 2438
                            }                                                                                       // 2439
                        }                                                                                           // 2440
                                                                                                                    // 2441
                        supportPromise.then(function (supportResult) {                                              // 2442
                            driverSupport[driverName] = supportResult;                                              // 2443
                            CustomDrivers[driverName] = driverObject;                                               // 2444
                            resolve();                                                                              // 2445
                        }, reject);                                                                                 // 2446
                    } catch (e) {                                                                                   // 2447
                        reject(e);                                                                                  // 2448
                    }                                                                                               // 2449
                });                                                                                                 // 2450
                                                                                                                    // 2451
                promise.then(callback, errorCallback);                                                              // 2452
                return promise;                                                                                     // 2453
            };                                                                                                      // 2454
                                                                                                                    // 2455
            LocalForage.prototype.driver = function driver() {                                                      // 2456
                return this._driver || null;                                                                        // 2457
            };                                                                                                      // 2458
                                                                                                                    // 2459
            LocalForage.prototype.ready = function ready(callback) {                                                // 2460
                var self = this;                                                                                    // 2461
                                                                                                                    // 2462
                var promise = new Promise(function (resolve, reject) {                                              // 2463
                    self._driverSet.then(function () {                                                              // 2464
                        if (self._ready === null) {                                                                 // 2465
                            self._ready = self._initStorage(self._config);                                          // 2466
                        }                                                                                           // 2467
                                                                                                                    // 2468
                        self._ready.then(resolve, reject);                                                          // 2469
                    })['catch'](reject);                                                                            // 2470
                });                                                                                                 // 2471
                                                                                                                    // 2472
                promise.then(callback, callback);                                                                   // 2473
                return promise;                                                                                     // 2474
            };                                                                                                      // 2475
                                                                                                                    // 2476
            LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {                // 2477
                var self = this;                                                                                    // 2478
                                                                                                                    // 2479
                if (typeof drivers === 'string') {                                                                  // 2480
                    drivers = [drivers];                                                                            // 2481
                }                                                                                                   // 2482
                                                                                                                    // 2483
                this._driverSet = new Promise(function (resolve, reject) {                                          // 2484
                    var driverName = self._getFirstSupportedDriver(drivers);                                        // 2485
                    var error = new Error('No available storage method found.');                                    // 2486
                                                                                                                    // 2487
                    if (!driverName) {                                                                              // 2488
                        self._driverSet = Promise.reject(error);                                                    // 2489
                        reject(error);                                                                              // 2490
                        return;                                                                                     // 2491
                    }                                                                                               // 2492
                                                                                                                    // 2493
                    self._dbInfo = null;                                                                            // 2494
                    self._ready = null;                                                                             // 2495
                                                                                                                    // 2496
                    if (isLibraryDriver(driverName)) {                                                              // 2497
                        var driverPromise;                                                                          // 2498
                        switch (driverName) {                                                                       // 2499
                            case self.INDEXEDDB:                                                                    // 2500
                                driverPromise = new Promise(function (resolve, reject) {                            // 2501
                                    if (typeof _systemImportTransformerGlobalIdentifier.define === 'function' && _systemImportTransformerGlobalIdentifier.define.amd) {
                                        _systemImportTransformerGlobalIdentifier.require(['asyncStorage'], resolve, reject);
                                    } else if (typeof module !== 'undefined' && (module.exports && typeof require !== 'undefined') || typeof module !== 'undefined' && (module.component && (_systemImportTransformerGlobalIdentifier.require && _systemImportTransformerGlobalIdentifier.require.loader === 'component'))) {
                                        resolve(require('./drivers/indexeddb'));                                    // 2505
                                    } else {                                                                        // 2506
                                        resolve(_systemImportTransformerGlobalIdentifier['asyncStorage']);          // 2507
                                    }                                                                               // 2508
                                });                                                                                 // 2509
                                break;                                                                              // 2510
                            case self.LOCALSTORAGE:                                                                 // 2511
                                driverPromise = new Promise(function (resolve, reject) {                            // 2512
                                    if (typeof _systemImportTransformerGlobalIdentifier.define === 'function' && _systemImportTransformerGlobalIdentifier.define.amd) {
                                        _systemImportTransformerGlobalIdentifier.require(['localStorageWrapper'], resolve, reject);
                                    } else if (typeof module !== 'undefined' && (module.exports && typeof require !== 'undefined') || typeof module !== 'undefined' && (module.component && (_systemImportTransformerGlobalIdentifier.require && _systemImportTransformerGlobalIdentifier.require.loader === 'component'))) {
                                        resolve(require('./drivers/localstorage'));                                 // 2516
                                    } else {                                                                        // 2517
                                        resolve(_systemImportTransformerGlobalIdentifier['localStorageWrapper']);   // 2518
                                    }                                                                               // 2519
                                });                                                                                 // 2520
                                break;                                                                              // 2521
                            case self.WEBSQL:                                                                       // 2522
                                driverPromise = new Promise(function (resolve, reject) {                            // 2523
                                    if (typeof _systemImportTransformerGlobalIdentifier.define === 'function' && _systemImportTransformerGlobalIdentifier.define.amd) {
                                        _systemImportTransformerGlobalIdentifier.require(['webSQLStorage'], resolve, reject);
                                    } else if (typeof module !== 'undefined' && (module.exports && typeof require !== 'undefined') || typeof module !== 'undefined' && (module.component && (_systemImportTransformerGlobalIdentifier.require && _systemImportTransformerGlobalIdentifier.require.loader === 'component'))) {
                                        resolve(require('./drivers/websql'));                                       // 2527
                                    } else {                                                                        // 2528
                                        resolve(_systemImportTransformerGlobalIdentifier['webSQLStorage']);         // 2529
                                    }                                                                               // 2530
                                });                                                                                 // 2531
                                break;                                                                              // 2532
                        }                                                                                           // 2533
                        driverPromise.then(function (driver) {                                                      // 2534
                            self._extend(driver);                                                                   // 2535
                            resolve();                                                                              // 2536
                        });                                                                                         // 2537
                    } else if (CustomDrivers[driverName]) {                                                         // 2538
                        self._extend(CustomDrivers[driverName]);                                                    // 2539
                        resolve();                                                                                  // 2540
                    } else {                                                                                        // 2541
                        self._driverSet = Promise.reject(error);                                                    // 2542
                        reject(error);                                                                              // 2543
                    }                                                                                               // 2544
                });                                                                                                 // 2545
                                                                                                                    // 2546
                function setDriverToConfig() {                                                                      // 2547
                    self._config.driver = self.driver();                                                            // 2548
                }                                                                                                   // 2549
                this._driverSet.then(setDriverToConfig, setDriverToConfig);                                         // 2550
                                                                                                                    // 2551
                this._driverSet.then(callback, errorCallback);                                                      // 2552
                return this._driverSet;                                                                             // 2553
            };                                                                                                      // 2554
                                                                                                                    // 2555
            LocalForage.prototype.supports = function supports(driverName) {                                        // 2556
                return !!driverSupport[driverName];                                                                 // 2557
            };                                                                                                      // 2558
                                                                                                                    // 2559
            LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {                         // 2560
                extend(this, libraryMethodsAndProperties);                                                          // 2561
            };                                                                                                      // 2562
                                                                                                                    // 2563
            // Used to determine which driver we should use as the backend for this                                 // 2564
            // instance of localForage.                                                                             // 2565
                                                                                                                    // 2566
            LocalForage.prototype._getFirstSupportedDriver = function _getFirstSupportedDriver(drivers) {           // 2567
                if (drivers && isArray(drivers)) {                                                                  // 2568
                    for (var i = 0; i < drivers.length; i++) {                                                      // 2569
                        var driver = drivers[i];                                                                    // 2570
                                                                                                                    // 2571
                        if (this.supports(driver)) {                                                                // 2572
                            return driver;                                                                          // 2573
                        }                                                                                           // 2574
                    }                                                                                               // 2575
                }                                                                                                   // 2576
                                                                                                                    // 2577
                return null;                                                                                        // 2578
            };                                                                                                      // 2579
                                                                                                                    // 2580
            LocalForage.prototype.createInstance = function createInstance(options) {                               // 2581
                return new LocalForage(options);                                                                    // 2582
            };                                                                                                      // 2583
                                                                                                                    // 2584
            return LocalForage;                                                                                     // 2585
        })();                                                                                                       // 2586
                                                                                                                    // 2587
        var localForage = new LocalForage();                                                                        // 2588
                                                                                                                    // 2589
        module.exports = localForage;                                                                               // 2590
    }).call(typeof window !== 'undefined' ? window : self);                                                         // 2591
});                                                                                                                 // 2592
                                                                                                                    // 2593
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/frozeman_persistent-minimongo2/persistent-minimongo.js                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
/**                                                                                                                 // 1
Packages                                                                                                            // 2
                                                                                                                    // 3
@module Packages                                                                                                    // 4
*/                                                                                                                  // 5
                                                                                                                    // 6
/**                                                                                                                 // 7
The PersistentMinimongo2 package                                                                                    // 8
                                                                                                                    // 9
@class PersistentMinimongo2                                                                                         // 10
@constructor                                                                                                        // 11
*/                                                                                                                  // 12
                                                                                                                    // 13
                                                                                                                    // 14
                                                                                                                    // 15
/**                                                                                                                 // 16
If the localstorage goes over 4.8 MB, trim the collections.                                                         // 17
                                                                                                                    // 18
@property capLocalStorageSize                                                                                       // 19
*/                                                                                                                  // 20
var capLocalStorageSize = 4.8;                                                                                      // 21
                                                                                                                    // 22
/**                                                                                                                 // 23
If the localstorage goes over `capLocalStorageSize`, trim the current collection,                                   // 24
which wanted to add a new entry, by 50 entries.                                                                     // 25
                                                                                                                    // 26
@property trimCollectionBy                                                                                          // 27
*/                                                                                                                  // 28
var trimCollectionBy = 50;                                                                                          // 29
                                                                                                                    // 30
                                                                                                                    // 31
                                                                                                                    // 32
PersistentMinimongo2 = function (collection, dbname) {                                                              // 33
    var self = this;                                                                                                // 34
    if (! (self instanceof PersistentMinimongo2))                                                                   // 35
            throw new Error('use "new" to construct a PersistentMinimongo2');                                       // 36
                                                                                                                    // 37
    self.key = 'minimongo__' + collection._name;                                                                    // 38
    self.col = collection;                                                                                          // 39
    self.stats = { added: 0, removed: 0, changed: 0 };                                                              // 40
    self.list = [];                                                                                                 // 41
                                                                                                                    // 42
    persisters.push(self);                                                                                          // 43
                                                                                                                    // 44
    // config                                                                                                       // 45
    self.store = localforage.createInstance({                                                                       // 46
        name        : 'persistent-minimongo2-' + (dbname || 'db'),                                                  // 47
        version     : 1.0,                                                                                          // 48
        // size        : 4980736, // Size of database, in bytes. WebSQL-only for now.                               // 49
        storeName   : 'minimongo',                                                                                  // 50
        description : 'frozeman:persistent-minimongo2 data store'                                                   // 51
    });                                                                                                             // 52
                                                                                                                    // 53
    // load from storage                                                                                            // 54
    self.refresh(true);                                                                                             // 55
                                                                                                                    // 56
    self.col.find({}).observe({                                                                                     // 57
        added: function (doc) {                                                                                     // 58
                                                                                                                    // 59
            // Check if the localstorage is to big and reduce the current collection by 50 items                    // 60
            if(self.store.driver() === 'localStorageWrapper')                                                       // 61
                self.capCollection();                                                                               // 62
                                                                                                                    // 63
                                                                                                                    // 64
            // add document id to tracking list and store                                                           // 65
            if (!_.contains(self.list, doc._id)) {                                                                  // 66
                self.list.push(doc._id);                                                                            // 67
                                                                                                                    // 68
                // store copy of document into db, if not already there                                             // 69
                var key = self._makeDataKey(doc._id);                                                               // 70
                self.store.setItem(key, doc, function(err, value) {                                                 // 71
                    if(!err) {                                                                                      // 72
                        ++self.stats.added;                                                                         // 73
                    }                                                                                               // 74
                });                                                                                                 // 75
                                                                                                                    // 76
                // update the list                                                                                  // 77
                self.store.setItem(self.key, self.list, function(err, value) {});                                   // 78
            }                                                                                                       // 79
        },                                                                                                          // 80
                                                                                                                    // 81
        removed: function (doc) {                                                                                   // 82
                                                                                                                    // 83
            // if not in list, nothing to do                                                                        // 84
            if(!_.contains(self.list, doc._id))                                                                     // 85
                return;                                                                                             // 86
                                                                                                                    // 87
                                                                                                                    // 88
            // remove document copy from local storage                                                              // 89
            self.store.removeItem(self._makeDataKey(doc._id), function(err) {                                       // 90
                if(!err) {                                                                                          // 91
                    ++self.stats.removed;                                                                           // 92
                }                                                                                                   // 93
            });                                                                                                     // 94
                                                                                                                    // 95
            // remove from list                                                                                     // 96
            self.list = _.without(self.list, doc._id);                                                              // 97
                                                                                                                    // 98
            // if tracking list is empty, delete; else store updated copy                                           // 99
            if(self.list.length === 0) {                                                                            // 100
                self.store.removeItem(self.key, function(){});                                                      // 101
            } else {                                                                                                // 102
                self.store.setItem(self.key, self.list, function(){});                                              // 103
            }                                                                                                       // 104
                                                                                                                    // 105
        },                                                                                                          // 106
                                                                                                                    // 107
        changed: function (newDoc, oldDoc) {                                                                        // 108
            // update document in local storage                                                                     // 109
            self.store.setItem(self._makeDataKey(newDoc._id), newDoc, function(err, value) {                        // 110
                if(!err) {                                                                                          // 111
                    ++self.stats.changed;                                                                           // 112
                }                                                                                                   // 113
            });                                                                                                     // 114
        }                                                                                                           // 115
    });                                                                                                             // 116
};                                                                                                                  // 117
                                                                                                                    // 118
PersistentMinimongo2.prototype = {                                                                                  // 119
    constructor: PersistentMinimongo2,                                                                              // 120
    _getStats: function () {                                                                                        // 121
        return this.stats;                                                                                          // 122
    },                                                                                                              // 123
    _getKey: function () {                                                                                          // 124
        return this.key;                                                                                            // 125
    },                                                                                                              // 126
    _makeDataKey: function (id) {                                                                                   // 127
        return this.key + '__' + id;                                                                                // 128
    },                                                                                                              // 129
    /**                                                                                                             // 130
    Refresh the local storage                                                                                       // 131
                                                                                                                    // 132
    @method refresh                                                                                                 // 133
    @return {String}                                                                                                // 134
    */                                                                                                              // 135
    refresh: function (init) {                                                                                      // 136
        var self = this;                                                                                            // 137
        self.store.getItem(self.key, function(err, list) {                                                          // 138
            if(!err) {                                                                                              // 139
                                                                                                                    // 140
                self.list = list || [];                                                                             // 141
                self.stats.added = 0;                                                                               // 142
                                                                                                                    // 143
                if (!! list) {                                                                                      // 144
                    var length = list.length;                                                                       // 145
                    var count = 0;                                                                                  // 146
                    var newList = [];                                                                               // 147
                    _.each(list, function (id) {                                                                    // 148
                        self.store.getItem(self._makeDataKey(id), function(err, doc) {                              // 149
                            if(!err) {                                                                              // 150
                                if(!! doc) {                                                                        // 151
                                    var id = doc._id;                                                               // 152
                                    var foundDoc = self.col.findOne({_id: id});                                     // 153
                                                                                                                    // 154
                                    if(foundDoc) {                                                                  // 155
                                        delete doc._id;                                                             // 156
                                        self.col.update({_id: id}, {$set: doc});                                    // 157
                                    } else {                                                                        // 158
                                        id = self.col.insert(doc);                                                  // 159
                                    }                                                                               // 160
                                                                                                                    // 161
                                    newList.push(id);                                                               // 162
                                }                                                                                   // 163
                            }                                                                                       // 164
                            count++;                                                                                // 165
                        });                                                                                         // 166
                    });                                                                                             // 167
                                                                                                                    // 168
                    // do only after all items where checked                                                        // 169
                    var intervalId = setInterval(function() {                                                       // 170
                        if(count >= length) {                                                                       // 171
                            clearInterval(intervalId);                                                              // 172
                                                                                                                    // 173
                            self.list = newList;                                                                    // 174
                                                                                                                    // 175
                            // if not initializing, check for deletes                                               // 176
                            if(! init) {                                                                            // 177
                                                                                                                    // 178
                                self.col.find({}).forEach(function (doc) {                                          // 179
                                    if(! _.contains(self.list, doc._id))                                            // 180
                                        self.col.remove({ _id: doc._id });                                          // 181
                                });                                                                                 // 182
                            }                                                                                       // 183
                                                                                                                    // 184
                            // if initializing, save cleaned list (if changed)                                      // 185
                            if(init && length !== self.list.length) {                                               // 186
                                // if tracking list is empty, delete; else store updated copy                       // 187
                                if(self.list.length === 0) {                                                        // 188
                                    self.store.removeItem(self.key, function(){});                                  // 189
                                } else {                                                                            // 190
                                    self.store.setItem(self.key, self.list, function(){});                          // 191
                                }                                                                                   // 192
                            }                                                                                       // 193
                        }                                                                                           // 194
                    }, 1);                                                                                          // 195
                                                                                                                    // 196
                }                                                                                                   // 197
            }                                                                                                       // 198
        });                                                                                                         // 199
    },                                                                                                              // 200
    /**                                                                                                             // 201
    Gets the current localstorage size in MB                                                                        // 202
                                                                                                                    // 203
    @method localStorageSize                                                                                        // 204
    @return {String} total localstorage size in MB                                                                  // 205
    */                                                                                                              // 206
    localStorageSize: function() {                                                                                  // 207
                                                                                                                    // 208
        // function toSizeMB(info) {                                                                                // 209
        //   info.size = toMB(info.size).toFixed(2) + ' MB';                                                        // 210
        //   return info;                                                                                           // 211
        // }                                                                                                        // 212
                                                                                                                    // 213
        // var sizes = Object.keys(localStorage).map(toSize).map(toSizeMB);                                         // 214
        // console.table(sizes);                                                                                    // 215
                                                                                                                    // 216
        var size = 0;                                                                                               // 217
        if(localStorage) {                                                                                          // 218
            _.each(Object.keys(localStorage), function(key){                                                        // 219
                size += localStorage[key].length * 2 / 1024 / 1024;                                                 // 220
            });                                                                                                     // 221
        }                                                                                                           // 222
                                                                                                                    // 223
        return size;                                                                                                // 224
    },                                                                                                              // 225
    /**                                                                                                             // 226
    Check if the localstorage is to big and reduce the current collection by 50 items                               // 227
                                                                                                                    // 228
    @method localStorageSize                                                                                        // 229
    @return {String}                                                                                                // 230
    */                                                                                                              // 231
    capCollection: function(){                                                                                      // 232
        var _this = this;                                                                                           // 233
                                                                                                                    // 234
        if(_this.localStorageSize() > capLocalStorageSize) {                                                        // 235
            console.log(_this.localStorageSize(), _this.col.find({}).count());                                      // 236
            // find the first 50 entries and remove them                                                            // 237
            _.each(_this.col.find({}, {limit: trimCollectionBy}).fetch(), function(item){                           // 238
                _this.col.remove(item._id);                                                                         // 239
            });                                                                                                     // 240
        }                                                                                                           // 241
    }                                                                                                               // 242
};                                                                                                                  // 243
                                                                                                                    // 244
var persisters = [];                                                                                                // 245
var lpTimer = null;                                                                                                 // 246
                                                                                                                    // 247
// React on manual local storage changes                                                                            // 248
// Meteor.startup(function () {                                                                                     // 249
//     $(window).bind('storage', function (e) {                                                                     // 250
//         console.log('STORAGE');                                                                                  // 251
//         Meteor.clearTimeout(lpTimer);                                                                            // 252
//         lpTimer = Meteor.setTimeout(function () {                                                                // 253
//             _.each(persisters, function (lp) {                                                                   // 254
//                 lp.refresh(false);                                                                               // 255
//             });                                                                                                  // 256
//         }, 250);                                                                                                 // 257
//     });                                                                                                          // 258
// });                                                                                                              // 259
                                                                                                                    // 260
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['frozeman:persistent-minimongo2'] = {}, {
  PersistentMinimongo2: PersistentMinimongo2
});

})();

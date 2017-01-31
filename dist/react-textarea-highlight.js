(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactTextareaHighlight"] = factory(require("react"));
	else
		root["ReactTextareaHighlight"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* eslint no-return-assign:0 no-param-reassign:0 */
	// this should be the entry point to your library
	var TextAreaHighlight = __webpack_require__(1);
	
	module.exports = TextAreaHighlight;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* eslint no-return-assign:0 no-param-reassign:0 */
	// this should be the entry point to your library
	var React = __webpack_require__(3);
	
	var pick = function pick(object, keys) {
	  return keys.reduce(function (memo, key) {
	    memo[key] = object[key];
	    return memo;
	  }, {});
	};
	
	var omit = function omit(object, excludedKeys) {
	  return pick(object, Object.keys(object).filter(function (key) {
	    return !excludedKeys.includes(key);
	  }));
	};
	
	var ColoredMarker = function ColoredMarker(_ref) {
	  var highlight = _ref.highlight,
	      color = _ref.color,
	      children = _ref.children;
	  return React.createElement(
	    'mark',
	    { style: { backgroundColor: highlight, color: color } },
	    children
	  );
	};
	process.env.NODE_ENV !== "production" ? ColoredMarker.propTypes = {
	  highlight: React.PropTypes.string,
	  color: React.PropTypes.string,
	  children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string])
	} : void 0;
	
	var CSS_PROPERTIES = ['line-height', 'color', 'word-spacing', 'padding', 'margin', 'font-style', 'font-variant', 'font-weight', 'font-stretch', 'font-size', 'line-height', 'font-family', 'font-feature-settings', 'font-kerning'];
	
	var TextAreaHighlight = function (_React$Component) {
	  _inherits(TextAreaHighlight, _React$Component);
	
	  function TextAreaHighlight(props) {
	    _classCallCheck(this, TextAreaHighlight);
	
	    var _this = _possibleConstructorReturn(this, (TextAreaHighlight.__proto__ || Object.getPrototypeOf(TextAreaHighlight)).call(this, props));
	
	    _this.state = { value: props.value || '' };
	    _this.onInput = _this.onInput.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    _this.onScroll = _this.onScroll.bind(_this);
	    _this.updateScrollPosition = _this.updateScrollPosition.bind(_this);
	    _this.wrap = _this.wrap.bind(_this);
	    return _this;
	  }
	
	  _createClass(TextAreaHighlight, [{
	    key: 'onInput',
	    value: function onInput(e) {
	      var rawValue = e.target.value;
	      var onInput = this.props.onInput;
	
	
	      this.setState({ value: rawValue }, this.updateScrollPosition);
	      return onInput(e);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.value) {
	        // eslint-disable-next-line
	        this.setState({ value: this.props.value });
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.value !== this.state.value) {
	        this.setState({ value: nextProps.value });
	        this.updateScrollPosition();
	      }
	    }
	  }, {
	    key: 'onKeyDown',
	    value: function onKeyDown(e) {
	      var onKeyDown = this.props.onKeyDown;
	
	      this.updateScrollPosition();
	      return onKeyDown(e);
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll(e) {
	      var onScroll = this.props.onScroll;
	
	      this.updateScrollPosition();
	      return onScroll(e);
	    }
	  }, {
	    key: 'updateScrollPosition',
	    value: function updateScrollPosition() {
	      var _this2 = this;
	
	      if (this.overlay && this.textarea) {
	        this.overlay.scrollTop = this.textarea.scrollTop;
	      }
	      setTimeout(function () {
	        return _this2.overlay.scrollTop = _this2.textarea.scrollTop;
	      }, 4, this);
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap(text) {
	      if (!this.textarea) {
	        return '';
	      }
	      var _props = this.props,
	          breakOn = _props.breakOn,
	          Wrapper = _props.wrapIn,
	          withColor = _props.withColor,
	          withHighlight = _props.withHighlight;
	      // yeah, had misaligned overlay content when new line was the only thing
	
	      var textToWrap = text.endsWith('\n') ? text + '\n' : text;
	      return textToWrap.split(breakOn).map(function (string, index) {
	        var highlight = withHighlight(string);
	        return React.createElement(
	          Wrapper,
	          {
	            key: index,
	            highlight: highlight,
	            color: withColor(string, highlight)
	          },
	          string
	        );
	      }, this);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      return React.createElement(
	        'div',
	        { className: 'rth-container' },
	        React.createElement('textarea', _extends({
	          'data-gramm': true,
	          className: 'text-default',
	          ref: function ref(textarea) {
	            if (!_this3.styles) {
	              var styles = pick(document.defaultView.getComputedStyle(textarea), CSS_PROPERTIES);
	              _this3.styles = styles;
	            }
	            _this3.updateScrollPosition();
	            _this3.textarea = textarea;
	          }
	        }, omit(this.props, ['breakOn', 'withColor', 'wrapIn', 'withHighlight', 'value']), {
	          value: this.state.value,
	          onInput: this.onInput,
	          onKeyDown: this.onKeyDown,
	          onScroll: this.onScroll
	        })),
	        React.createElement(
	          'div',
	          {
	            className: 'rth-overlay',
	            ref: function ref(overlay) {
	              return _this3.overlay = overlay;
	            }
	          },
	          React.createElement(
	            'span',
	            {
	              className: 'rth-overlay-text text-default',
	              style: this.styles
	            },
	            this.wrap(this.state.value)
	          )
	        )
	      );
	    }
	  }]);
	
	  return TextAreaHighlight;
	}(React.Component);
	
	process.env.NODE_ENV !== "production" ? TextAreaHighlight.propTypes = {
	  value: React.PropTypes.string,
	  onInput: React.PropTypes.func,
	  onKeyDown: React.PropTypes.func,
	  onScroll: React.PropTypes.func,
	  breakOn: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(RegExp)]),
	  wrapIn: React.PropTypes.func,
	  withHighlight: React.PropTypes.func,
	  withColor: React.PropTypes.func
	} : void 0;
	
	TextAreaHighlight.defaultProps = {
	  onInput: function onInput() {},
	  onKeyDown: function onKeyDown() {},
	  onScroll: function onScroll() {},
	  breakOn: /\b/,
	  wrapIn: ColoredMarker,
	  withHighlight: function withHighlight(_word) {
	    return 'transparent';
	  },
	  withColor: function withColor(_word, _bgColor) {
	    return 'transparent';
	  }
	};
	
	module.exports = TextAreaHighlight;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-textarea-highlight.js.map
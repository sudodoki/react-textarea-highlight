'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.includes');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-return-assign:0, react/no-danger:0 */


var pick = function pick(object, keys) {
  return keys.reduce(function (memo, key) {
    // eslint-disable-next-line no-param-reassign
    memo[key] = object[key];
    return memo;
  }, {});
};

var omit = function omit(object, excludedKeys) {
  return pick(object, Object.keys(object).filter(function (key) {
    return !(0, _lodash2.default)(excludedKeys, key);
  }));
};

var TextAreaHighlight = function (_Component) {
  _inherits(TextAreaHighlight, _Component);

  function TextAreaHighlight(props) {
    _classCallCheck(this, TextAreaHighlight);

    var _this = _possibleConstructorReturn(this, (TextAreaHighlight.__proto__ || Object.getPrototypeOf(TextAreaHighlight)).call(this, props));

    _this.state = {
      value: props.value
    };
    _this._handleInputChange = _this._handleInputChange.bind(_this);
    _this._handleScroll = _this._handleScroll.bind(_this);
    _this._handleRegexHighlight = _this._handleRegexHighlight.bind(_this);
    _this._handleArrayHighlight = _this._handleArrayHighlight.bind(_this);
    return _this;
  }

  _createClass(TextAreaHighlight, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.value });
        this.backdrop.scrollTop = this.textarea.scrollTop;
      }
    }
  }, {
    key: '_handleInputChange',
    value: function _handleInputChange(event) {
      var onChange = this.props.onChange;

      this.setState({ value: event.target.value });
      return onChange(event);
    }
  }, {
    key: '_handleScroll',
    value: function _handleScroll(event) {
      var onScroll = this.props.onScroll;

      var scrollTop = event.target.scrollTop;
      this.backdrop.scrollTop = scrollTop;
      return onScroll(event);
    }
  }, {
    key: '_handleRegexHighlight',
    value: function _handleRegexHighlight(input, payload) {
      var OPEN_MARK = '<' + this.props.wrapIn + '>';
      var CLOSE_MARK = '</' + this.props.wrapIn + '>';
      return input.replace(payload, OPEN_MARK + '$&' + CLOSE_MARK);
    }
  }, {
    key: '_handleArrayHighlight',
    value: function _handleArrayHighlight(input, payload) {
      var offset = 0;
      var wrapIn = this.props.wrapIn;
      var OPEN_MARK = '<' + wrapIn + '>';
      var CLOSE_MARK = '</' + wrapIn + '>';

      payload.forEach(function (element) {
        // insert open tag
        var open = element[0] + offset;

        if (element[2]) {
          var OPEN_MARK_WITH_CLASS = '<' + wrapIn + ' class=' + element[2] + '>';
          // eslint-disable-next-line no-param-reassign
          input = input.slice(0, open) + OPEN_MARK_WITH_CLASS + input.slice(open);
          offset += OPEN_MARK_WITH_CLASS.length;
        } else {
          // eslint-disable-next-line no-param-reassign
          input = input.slice(0, open) + OPEN_MARK + input.slice(open);
          offset += OPEN_MARK.length;
        }

        // insert close tag
        var close = element[1] + offset;

        // eslint-disable-next-line no-param-reassign
        input = input.slice(0, close) + CLOSE_MARK + input.slice(close);
        offset += CLOSE_MARK.length;
      }, this);
      return input;
    }
  }, {
    key: 'getHighlights',
    value: function getHighlights() {
      var CLOSE_MARK = '</' + this.props.wrapIn + '>';

      // escape HTML
      var highlightedMarkup = this.state.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      var payload = this.props.highlight(highlightedMarkup);

      if (payload) {
        switch (payload.constructor.name) {
          case 'Array':
            highlightedMarkup = this._handleArrayHighlight(highlightedMarkup, payload);
            break;
          case 'RegExp':
            highlightedMarkup = this._handleRegexHighlight(highlightedMarkup, payload);
            break;
          default:
            throw new TypeError('props.highlight did not return RegExp or Array');
        }
      }

      // this keeps scrolling aligned when input ends with a newline
      highlightedMarkup = highlightedMarkup.replace(new RegExp('\\n(' + CLOSE_MARK + ')?$'), '\n\n$1');

      return highlightedMarkup;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var defaultClass = 'rth-container';
      var className = this.props.className ? [this.props.className, defaultClass].join(' ') : defaultClass;
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'div',
          { className: 'rth-backdrop', ref: function ref(backdrop) {
              return _this2.backdrop = backdrop;
            } },
          _react2.default.createElement('div', {
            className: 'rth-highlights rth-content',
            dangerouslySetInnerHTML: { __html: this.getHighlights() }
          })
        ),
        _react2.default.createElement('textarea', _extends({
          'data-gramm': true,
          ref: function ref(textarea) {
            return _this2.textarea = textarea;
          }
        }, omit(this.props, ['highlight', 'wrapIn', 'value']), {
          className: 'rth-input rth-content',
          onChange: this._handleInputChange,
          onScroll: this._handleScroll,
          value: this.state.value
        }))
      );
    }
  }]);

  return TextAreaHighlight;
}(_react.Component);

process.env.NODE_ENV !== "production" ? TextAreaHighlight.propTypes = {
  value: _react.PropTypes.string,
  className: _react.PropTypes.string,
  highlight: _react.PropTypes.func,
  wrapIn: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  onScroll: _react.PropTypes.func
} : void 0;

TextAreaHighlight.defaultProps = {
  value: '',
  highlight: function highlight() {
    return [];
  },
  wrapIn: 'mark',
  onChange: function onChange() {},
  onScroll: function onScroll() {}
};

module.exports = TextAreaHighlight;
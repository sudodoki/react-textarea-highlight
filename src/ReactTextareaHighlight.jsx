/* eslint no-return-assign:0, react/no-danger:0 */
import React, { PropTypes, Component } from 'react';
import includes from 'lodash.includes';

const pick = (object, keys) =>
  keys.reduce((memo, key) => {
    // eslint-disable-next-line no-param-reassign
    memo[key] = object[key];
    return memo;
  }, {});

const omit = (object, excludedKeys) =>
  pick(object, Object.keys(object).filter(key => !includes(excludedKeys, key)));

class TextAreaHighlight extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this._handleRegexHighlight = this._handleRegexHighlight.bind(this);
    this._handleArrayHighlight = this._handleArrayHighlight.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
      this.backdrop.scrollTop = this.textarea.scrollTop;
    }
  }
  _handleInputChange(event) {
    const { onChange } = this.props;
    this.setState({ value: event.target.value });
    return onChange(event);
  }

  _handleScroll(event) {
    const { onScroll } = this.props;
    const scrollTop = event.target.scrollTop;
    this.backdrop.scrollTop = scrollTop;
    return onScroll(event);
  }

  _handleRegexHighlight(input, payload) {
    const OPEN_MARK = `<${this.props.wrapIn}>`;
    const CLOSE_MARK = `</${this.props.wrapIn}>`;
    return input.replace(payload, `${OPEN_MARK}$&${CLOSE_MARK}`);
  }

  _handleArrayHighlight(input, payload) {
    let offset = 0;
    const wrapIn = this.props.wrapIn;
    const OPEN_MARK = `<${wrapIn}>`;
    const CLOSE_MARK = `</${wrapIn}>`;

    payload.forEach(function (element) {
      // insert open tag
      const open = element[0] + offset;

      if (element[2]) {
        const OPEN_MARK_WITH_CLASS = `<${wrapIn} class=${element[2]}>`;
        // eslint-disable-next-line no-param-reassign
        input = input.slice(0, open) + OPEN_MARK_WITH_CLASS + input.slice(open);
        offset += OPEN_MARK_WITH_CLASS.length;
      } else {
        // eslint-disable-next-line no-param-reassign
        input = input.slice(0, open) + OPEN_MARK + input.slice(open);
        offset += OPEN_MARK.length;
      }

      // insert close tag
      const close = element[1] + offset;

      // eslint-disable-next-line no-param-reassign
      input = input.slice(0, close) + CLOSE_MARK + input.slice(close);
      offset += CLOSE_MARK.length;
    }, this);
    return input;
  }

  getHighlights() {
    const CLOSE_MARK = `</${this.props.wrapIn}>`;

    // escape HTML
    let highlightedMarkup = this.state.value.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const payload = this.props.highlight(highlightedMarkup);

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
    highlightedMarkup = highlightedMarkup.replace(new RegExp(`\\n(${CLOSE_MARK})?$`), '\n\n$1');

    return highlightedMarkup;
  }

  render() {
    const defaultClass = 'rth-container';
    const className = this.props.className ? [this.props.className, defaultClass].join(' ') : defaultClass;
    return (
      <div className={className}>
        <div className="rth-backdrop" ref={backdrop => this.backdrop = backdrop}>
          <div
            className="rth-highlights rth-content"
            dangerouslySetInnerHTML={{ __html: this.getHighlights() }}
          />
        </div>
        <textarea
          data-gramm
          ref={textarea => this.textarea = textarea}
          {...omit(this.props, ['highlight', 'wrapIn', 'value'])}
          className="rth-input rth-content"
          onChange={this._handleInputChange}
          onScroll={this._handleScroll}
          value={this.state.value}
        />
      </div>
    );
  }
}

TextAreaHighlight.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  highlight: PropTypes.func,
  wrapIn: PropTypes.string,
  onChange: PropTypes.func,
  onScroll: PropTypes.func
};

TextAreaHighlight.defaultProps = {
  value: '',
  highlight: () => [],
  wrapIn: 'mark',
  onChange: () => {},
  onScroll: () => {}
};

module.exports = TextAreaHighlight;

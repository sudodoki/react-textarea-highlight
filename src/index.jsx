/* eslint no-return-assign:0 no-param-reassign:0 */
// this should be the entry point to your library
const React = require('react');

const pick = (object, keys) =>
  keys.reduce((memo, key) => {
    memo[key] = object[key];
    return memo;
  }, {});

const omit = (object, excludedKeys) =>
  pick(object, Object.keys(object).filter(key => !excludedKeys.includes(key)));

const ColoredMarker = ({ highlight, color, children }) =>
  <mark style={{ backgroundColor: highlight, color }}>{children}</mark>;
ColoredMarker.propTypes = {
  highlight: React.PropTypes.string,
  color: React.PropTypes.string,
  children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string])
};

const CSS_PROPERTIES = [
  'line-height',
  'color',
  'word-spacing',
  'padding',
  'margin',
  'font-style',
  'font-variant',
  'font-weight',
  'font-stretch',
  'font-size',
  'line-height',
  'font-family',
  'font-feature-settings',
  'font-kerning'
];

class TextAreaHighlight extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value || '' };
    this.onInput = this.onInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.updateScrollPosition = this.updateScrollPosition.bind(this);
    this.wrap = this.wrap.bind(this);
  }

  onInput(e) {
    const rawValue = e.target.value;
    const { onInput } = this.props;

    this.setState({ value: rawValue }, this.updateScrollPosition);
    return onInput(e);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
      this.updateScrollPosition();
    }
  }

  onKeyDown(e) {
    const { onKeyDown } = this.props;
    this.updateScrollPosition();
    return onKeyDown(e);
  }

  onScroll(e) {
    const { onScroll } = this.props;
    this.updateScrollPosition();
    return onScroll(e);
  }

  updateScrollPosition() {
    if (this.overlay && this.textarea) {
      this.overlay.scrollTop = this.textarea.scrollTop;
    }
    setTimeout(() => this.overlay.scrollTop = this.textarea.scrollTop, 4, this);
  }

  wrap(text) {
    const {
      breakOn,
      wrapIn: Wrapper,
      withColor,
      withHighlight
    } = this.props;
    // yeah, had misaligned overlay content when new line was the only thing
    const textToWrap = text.endsWith('\n')
      ? `${text}\n`
      : text;
    return textToWrap
      .split(breakOn)
      .map((string, index) => {
        const highlight = withHighlight(string);

        return (
          <Wrapper
            key={index}
            highlight={highlight}
            color={withColor(string, highlight)}
          >{string}</Wrapper>
        );
      });
  }

  render() {
    return (
      <div className="rth-container">
        {/* data-gramm is to prevent Grammarly plugin to bring havoc to the things */}
        <textarea
          data-gramm
          className="text-default"
          ref={(textarea) => {
            if (!this.styles) {
              const styles = pick(document.defaultView.getComputedStyle(textarea), CSS_PROPERTIES);
              this.styles = styles;
            }
            this.updateScrollPosition();
            this.textarea = textarea;
          }}
          {...omit(this.props, ['breakOn', 'withColor', 'wrapIn', 'withHighlight', 'value'])}
          value={this.state.value}
          onInput={this.onInput}
          onKeyDown={this.onKeyDown}
          onScroll={this.onScroll}
        />
        <div
          className="rth-overlay"
          ref={overlay => this.overlay = overlay}
        >
          <span
            className="rth-overlay-text text-default"
            style={this.styles}
          >{this.wrap(this.state.value)}</span>
        </div>

      </div>
    );
  }
}

TextAreaHighlight.propTypes = {
  value: React.PropTypes.string,
  onInput: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  onScroll: React.PropTypes.func,
  breakOn: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(RegExp)]),
  wrapIn: React.PropTypes.func,
  withHighlight: React.PropTypes.func,
  withColor: React.PropTypes.func
};

TextAreaHighlight.defaultProps = {
  onInput: () => {},
  onKeyDown: () => {},
  onScroll: () => {},
  breakOn: /\b/,
  wrapIn: ColoredMarker,
  withHighlight: _word => 'transparent',
  withColor: (_word, _bgColor) => 'transparent'
};

module.exports = TextAreaHighlight;

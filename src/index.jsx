/* eslint no-return-assign:0 no-param-reassign:0 */
// this should be the entry point to your library
const React = require('react');

const pick = (object, keys) =>
  keys.reduce((memo, key) => {
    memo[key] = object[key];
    return memo;
  }, {});

const CSS_PROPERTIES = [
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

  constructor() {
    super();
    this.state = { value: '' };
    this.onInput = this.onInput.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.updateScrollPosition = this.updateScrollPosition.bind(this);
    this.wrap = this.wrap.bind(this);
  }

  onInput(e) {
    const rawValue = e.target.value;
    const { onInput } = this.props;

    this.setState({ value: rawValue }, this.updateScrollPosition);
    return onInput(e);
  }

  onKeyUp(e) {
    const { onKeyUp } = this.props;

    this.updateScrollPosition();
    return onKeyUp(e);
  }
  updateScrollPosition() {
    if (this.overlay && this.textarea) {
      this.overlay.scrollTop = this.textarea.scrollTop;
    }
    setTimeout(() => this.overlay.scrollTop = this.textarea.scrollTop, 4, this);
  }

  // yeah, had misaligned overlay content when new line was the only thing
  wrap(text) {
    if (text.endsWith("\n")) {
      return text + "\n";
    } else {
      return text;
    }
  }

  render() {
    return (
      <div className="rth-container">
        <textarea
          className="text-default"
          ref={(textarea) => {
            if (!this.styles) {
              const styles = pick(document.defaultView.getComputedStyle(textarea), CSS_PROPERTIES);
              this.styles = styles;
            }
            this.updateScrollPosition();
            this.textarea = textarea;
          }}
          {...this.props}
          onInput={this.onInput}
          onKeyUp={this.onKeyUp}
        />
        <div
          className="rth-overlay"
          contentEditable
          ref={overlay => this.overlay = overlay}
          onFocus={() => this.textarea.focus()}
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
  onInput: React.PropTypes.func,
  onKeyUp: React.PropTypes.func,
};

TextAreaHighlight.defaultProps = {
  onInput: () => {},
  onKeyUp: () => {},
};

module.exports = TextAreaHighlight;

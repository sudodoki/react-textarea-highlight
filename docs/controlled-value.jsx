import React from 'react';
import Page from './controlled-value.md';
import TextArea from '../src/index';

class HighlightLanguagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Hello! What does this song need?' };
    this.addMoreCowbell = this.addMoreCowbell.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }
  addMoreCowbell() {
    this.setState({ value: `${this.state.value} COWBELL COWBELL COWBELL` });
  }
  updateValue(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    return (
      <div className="highlighter">
        <Page {...this.props} />
        <button onClick={this.addMoreCowbell}>Add more cowbell</button>
        <TextArea
          value={this.state.value}
          onChange={this.updateValue}
          highlight={() => /cowbell/ig}
        />
      </div>
    );
  }
}

module.exports = HighlightLanguagePage;

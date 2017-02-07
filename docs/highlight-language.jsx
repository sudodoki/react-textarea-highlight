import React from 'react';
import Page from './highlight-language.md';
import TextArea from '../src/index';

import './highlight-language.css';

const KEYWORDS = ['select', 'from', 'where'];
const COLUMNS = ['column', 'col'];
const is = values => word => (word ? values.includes(word.toLowerCase()) : false);
const isSignificant = is(KEYWORDS.concat(COLUMNS));
const isKeyword = is(KEYWORDS);
const isColumn = is(COLUMNS);

const stringToIndexedWords = (string) => {
  const result = [];
  const hasWord = /([a-zA-Z']+)/g;
  let execution = hasWord.exec(string);

  while (execution != null) {
    const match = execution[1];
    result.push([execution.index, execution.index + match.length, match]);
    execution = hasWord.exec(string);
  }
  return result;
};

function doHighlight(input) {
  const wordsVec = stringToIndexedWords(input);
  return wordsVec
    .filter(([_1, _2, word]) => isSignificant(word))
    .map(([start, end, word]) => {
      if (isKeyword(word)) { return [start, end, 'keyword']; }
      if (isColumn(word)) { return [start, end, 'column']; }
      return [start, end];
    });
}

const HighlightLanguagePage = props =>
  (
    <div className="highlighter">
      <Page {...props} />
      {/* color is passed but not used */}
      <TextArea className="language-highlight" highlight={doHighlight} />
    </div>
  );


module.exports = HighlightLanguagePage;

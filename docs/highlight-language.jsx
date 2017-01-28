import React from 'react';
import classnames from 'classnames';
import Page from './highlight-language.md';
import TextArea from '../src/index';

import './highlight-language.css';

const KEYWORDS = ['select', 'from', 'where'];
const COLUMNS = ['column', 'col'];
const is = values => word => (word ? values.includes(word.toLowerCase()) : false);
const isKeyword = is(KEYWORDS);
const isColumn = is(COLUMNS);

const Wrapper = ({ children }) => {
  if (!children) { return null; }
  const className = classnames({
    keyword: isKeyword(children),
    column: isColumn(children)
  });

  return <span className={className}>{children}</span>;
};
Wrapper.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string])
};

const HighlightLanguagePage = props =>
  (
    <div className="highlighter">
      <Page {...props} />
      <TextArea wrapIn={Wrapper} withColor={() => 'red'} />
    </div>
  );


module.exports = HighlightLanguagePage;

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

const Wrapper = ({ children, color }) => {
  if (!children) { return null; }
  const className = classnames('highlight-wrapper', {
    keyword: isKeyword(children),
    column: isColumn(children)
  });

  return <span style={{color}} className={className}>{children}</span>;
};
Wrapper.propTypes = {
  color: React.PropTypes.string,
  children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string])
};

const HighlightLanguagePage = props =>
  (
    <div className="highlighter">
      <Page {...props} />
      {/* color is passed but not used */}
      <TextArea wrapIn={Wrapper} />
    </div>
  );


module.exports = HighlightLanguagePage;

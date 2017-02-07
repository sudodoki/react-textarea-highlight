/* eslint-disable global-require, import/no-unresolved, react/no-multi-comp */
import React from 'react';
import ReactDOM from 'react-dom';
import GithubCorner from 'react-github-corner';
import { Catalog, CodeSpecimen, ReactSpecimen } from 'catalog';

import 'purecss/build/pure.css';
import './main.css';
import '../style.css';

// Add your documentation imports here. These are available to
// React specimen. Do NOT pass React here as Catalog does that.
const documentationImports = {};
const title = `${NAME} v${VERSION}`; // eslint-disable-line no-undef
const project = `${USER}/${NAME}`; // eslint-disable-line no-undef
const TextArea = require('../src/index');

const WrappedTextArea = (Content, props) => pageProps => (
  <div className="container">
    <Content {...pageProps} />
    <TextArea {...props} />
  </div>
);
const isFooBar = () => /(foo)|(bar)/ig;

const pages = [
  {
    path: '/',
    title: 'Introduction',
    component: require('../README.md')
  },
  {
    path: '/api',
    title: 'API',
    component: require('../README.md')
  },
  {
    path: '/censor',
    title: 'Demo: Censor',
    component: WrappedTextArea(require('./censor.md'), { highlight: isFooBar, className: 'censor' })
  },
  {
    path: '/highlight-language',
    title: 'Demo: Language Highlight',
    component: require('./highlight-language')
  },
  {
    path: '/controlled-value',
    title: 'Demo: Controlled Value',
    component: require('./controlled-value')
  }
];

// Catalog - logoSrc="../images/logo.png"
ReactDOM.render(
  <div>
    <GithubCorner
      href={`https://github.com/${project}`}
      bannerColor="#fff"
      octoColor="#000"
      width={80}
      height={80}
      direction="right"
    />
    <Catalog
      imports={documentationImports}
      pages={pages}
      specimens={{
        javascript: props => <CodeSpecimen {...props} lang="javascript" />,
        js: props => <CodeSpecimen {...props} lang="javascript" />,
        jsx: props => <ReactSpecimen {...props} />
      }}
      title={title}
    />
  </div>,
  document.getElementById('app')
);

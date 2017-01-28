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
const isFooBar = word => ['foo', 'bar'].includes(word);
const letterColors = [
  '#ffb6c1', '#e9ffe6', '#d3ffce', '#ffe4e1', '#b5bde5',
  '#8cf0e6', '#96f08c', '#8cf0b4', '#b48cf0', '#f0b48c',
  '#1d285e', '#545950', '#d5d5d4', '#8900ff', '#3399ff',
  '#0a3a60', '#e6d3d5', '#6f8797', '#a49ca5', '#cfe9dc',
  '#9ed1c7', '#d19ea8', '#b85151', '#640c64', '#640c64',
  '#fff0f5'
];
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
    component: WrappedTextArea(require('./censor.md'), { withHighlight: word => (isFooBar(word) ? 'black' : 'transparent') })
  },
  {
    path: '/alphabet',
    title: 'Demo: Rainbow Alphabet',
    component: WrappedTextArea(require('./alphabet.md'), {
      breakOn: '',
      withColor: letter => letterColors[letter.toLowerCase().charCodeAt(0) - 97] || 'transparent'
    })
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

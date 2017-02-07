# React Textarea highlight [![build status](https://secure.travis-ci.org/sudodoki/react-textarea-highlight.svg)](http://travis-ci.org/sudodoki/react-textarea-highlight) [![bitHound Score](https://www.bithound.io/github/sudodoki/react-textarea-highlight/badges/score.svg)](https://www.bithound.io/github/sudodoki/react-textarea-highlight) [![Dependency Status](https://david-dm.org/sudodoki/react-textarea-highlight.svg)](https://david-dm.org/sudodoki/react-textarea-highlight)

## Installation

```
npm i sudodoki/react-textarea-highlight
```

## Usage

See [examples](http://sudodoki.github.io/react-textarea-highlight)

## TODO

+ [x] Controlled value
+ [ ] Browser support list
+ [ ] Describe API
+ [ ] Add example umbrella page for direct link
+ [ ] publish
+ [x] ~Proxy dblclick and scroll from div to textarea~ fixed via css thanks to @shvaikalesh
+ [ ] 🤔 less awkward styling and description of how to do it
+ [ ] 🤔 Consider not wrapping everything, but only highlighted things
+ [ ] 🤔 Consider passing position if it's necessary using https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter
+ [ ] `.split(/\b/)` and unicode

## Known issues

+ Multiple spaces

## Credits

Initially it was something on its own. But now it's actually fork of [keustma/react-highlighted-textarea](https://github.com/keustma/react-highlighted-textarea)

Some other interesting places to look at this problems solution:
+ [keustma/react-highlighted-textarea](https://github.com/keustma/react-highlighted-textarea)
+ [lonekorean/highlight-within-textarea](https://github.com/lonekorean/highlight-within-textarea)
+ [phil3903/react-textarea-highlighter](https://github.com/phil3903/react-textarea-highlighter)
+ [Contenteditable presentation](https://wsd.events/2015/11/28/pres/contenteditable.pdf) by [@kigorw](https://github.com/kigorw)

This repo is based on [react-component-boilerplate](https://github.com/survivejs/react-component-boilerplate).

# Censor

```js
const isFooBar = () => /(foo)|(bar)/ig;
<TextArea
  className="censor"
  highlight={isFooBar}
/>
```

Using `withHighlight` to achieve ███ reducted effect for words 'foo' and 'bar' in this case.
Try it below:

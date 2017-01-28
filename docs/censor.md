# Censor

```js
const isFooBar = (word) => ['foo', 'bar'].includes(word);
<TextArea
  withHighlight={(word) => isFooBar(word) ? 'black' : 'transparent'}
/>
```

Using `withHighlight` to achieve ███ reducted effect for words 'foo' and 'bar' in this case.
Try it below:

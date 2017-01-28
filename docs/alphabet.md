# Rainbow Alphabet

```js
const letterColors = [
  '#ffb6c1', '#e9ffe6', '#d3ffce', '#ffe4e1', '#b5bde5',
  '#8cf0e6', '#96f08c', '#8cf0b4', '#b48cf0', '#f0b48c',
  '#1d285e', '#545950', '#d5d5d4', '#8900ff', '#3399ff',
  '#0a3a60', '#e6d3d5', '#6f8797', '#a49ca5', '#cfe9dc',
  '#9ed1c7', '#d19ea8', '#b85151', '#640c64', '#640c64',
  '#fff0f5'
];
<TextArea
  breakOn=''
  withColor={
    letter =>
      letterColors[letter.toLowerCase().charCodeAt(0) - 97] ||
      'transparent'
  }
/>
```

Using different `breakOn` to split by letters and not words and having different `withColor` for each letter to produce rainbow alphabet.

Try it below:

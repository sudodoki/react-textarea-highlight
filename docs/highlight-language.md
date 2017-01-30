# Highlighting Language

There's possibly more than 1 way to do things.
```
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

<TextArea wrapIn={Wrapper} />
```

With a bit of CSS code above would produce textarea that would highlight words 'select', 'col', 'column', 'from', 'where'.
Check the result below:

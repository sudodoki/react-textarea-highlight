# Hey from MD

There's possibly more than 1 way to do things.
```
const Wrapper = ({ children }) => {
  const className = classnames({
    keyword: isKeyword(children),
    column: isColumn(children)
  });
  return <span className={className}>{children}</span>;
};
Wrapper.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string])
};

<TextArea wrapIn={Wrapper} />
```

With a bit of CSS code above would produce textarea that would highlight words 'select', 'col', 'column', 'from', 'where'.
Check the result below:

# React Prevention 🚫

A layer that stops events from [propagating](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) and/or prevents the [default](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) behaviour of an element.

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![code style: prettier](https://img.shields.io/badge/license-MIT-green.svg)

## Why

- it looks good
- some libraries don't allow you to handle the events, this is the last resort

## Examples

### Event prevention

You can list any event you want to be affected as props. Even just one!

```jsx
<div onClick={this.wontHappen}>
    <Prevention click dblClick mouseDown>
        <Button onClick={this.willHappen}>Click Me</Button>
    </Prevention>
</div>
```

### Inline elements

You can turn the wrapper into an inline element with the `inline` prop.

```jsx
<span onClick={this.wontHappen}>
    <Prevention click inline>
        <span onClick={this.willHappen}>Click Me</span>
    </Prevention>
</span>
```

### Allow some behaviours

You can use the `allowPropagation` or `allowDefault` props.

```jsx
<div onClick={this.willHappenToo}>
    <Prevention click allowPropagation>
        <Button onClick={this.willHappen}>Click Me</Button>
    </Prevention>
</div>
```

## Props

- Any camelCase event to affect. {`boolean`} Example: click, onClick, dblClick, onDblClick...
- `allowPropagation` {`boolean`} Allows the default behaviour of the child components
- `allowDefault` {`boolean`} Allows propagation to the parent components
- `inline` {`boolean`} Turns the wrapping element into a span
- `style` {`Object`} Adds CSS rules to the wrapper

## License

See LICENSE file.

## Contributing

Feel free to contribute to the project. Main takeaways:

- only PR code passing `eslint` and `prettier` checks
- don't break API whenever possible (breaking API will require a new major version)
- create an issue first if you're about to embark a long journey so we can discuss about it
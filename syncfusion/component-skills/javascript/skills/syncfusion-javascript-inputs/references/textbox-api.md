# API Reference – Syncfusion TypeScript TextBox

## Table of Contents

1. [Properties](#properties)
2. [Methods](#methods)
3. [Events](#events)
4. [Event Argument Types](#event-argument-types)

---

## Properties

### appendTemplate

| Detail | Value |
|---|---|
| Type | `string \| HTMLElement \| Function` |
| Default | `null` |

Content to append after the input element (suffix). Accepts HTML string, element, or template function.

```ts
let textBox: TextBox = new TextBox({
  appendTemplate: '<span class="e-input-group-icon e-search-icon"></span>'
});
textBox.appendTo('#element');
```

---

### autocomplete

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `'on'` |

Specifies the autocomplete attribute value for the underlying `<input>` element. Common values: `'on'`, `'off'`, `'name'`, `'email'`, etc.

```ts
let textBox: TextBox = new TextBox({
  autocomplete: 'off'
});
textBox.appendTo('#element');
```

---

### cssClass

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `''` |

Space-separated CSS class names added to the root element. Used to apply custom styles, size variants (`e-small`, `e-bigger`), style modes (`e-filled`, `e-outline`), validation states (`e-error`, `e-warning`, `e-success`), and corner style (`e-corner`).

```ts
let textBox: TextBox = new TextBox({
  cssClass: 'e-outline e-small'
});
textBox.appendTo('#element');
```

---

### enablePersistence

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Persists the component's state (value) in browser `localStorage` between page reloads when set to `true`.

```ts
let textBox: TextBox = new TextBox({
  enablePersistence: true
});
textBox.appendTo('#element');
```

---

### enableRtl

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Enables right-to-left layout when `true`.

```ts
let textBox: TextBox = new TextBox({
  placeholder: 'اسم',
  enableRtl: true,
  floatLabelType: 'Auto'
});
textBox.appendTo('#element');
```

---

### enabled

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `true` |

Enables or disables the TextBox. When `false`, the input is non-interactive and visually dimmed.

```ts
let textBox: TextBox = new TextBox({
  enabled: false
});
textBox.appendTo('#element');
```

---

### floatLabelType

| Detail | Value |
|---|---|
| Type | `FloatLabelType` (`'Never' \| 'Always' \| 'Auto'`) |
| Default | `'Never'` |

Controls the floating label behavior.

| Value | Description |
|---|---|
| `'Never'` | Label never floats; acts as a static placeholder |
| `'Always'` | Label is always floated above the input |
| `'Auto'` | Label floats when the input receives focus or has a value |

```ts
let textBox: TextBox = new TextBox({
  placeholder: 'Enter name',
  floatLabelType: 'Auto'
});
textBox.appendTo('#element');
```

---

### htmlAttributes

| Detail | Value |
|---|---|
| Type | `{ [key: string]: string }` |
| Default | `{}` |

Key-value pairs of HTML attributes to add to the underlying `<input>` element.

```ts
let textBox: TextBox = new TextBox({
  htmlAttributes: { maxlength: '20', 'data-role': 'search-input' }
});
textBox.appendTo('#element');
```

---

### locale

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `''` |

Locale code for internationalization (e.g., `'de'`, `'fr'`, `'ar'`). Affects placeholder text and directional behavior.

```ts
let textBox: TextBox = new TextBox({
  locale: 'de'
});
textBox.appendTo('#element');
```

---

### multiline

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Renders the TextBox as a `<textarea>` element when `true`, enabling multi-line text input.

```ts
let textBox: TextBox = new TextBox({
  multiline: true,
  placeholder: 'Enter description'
});
textBox.appendTo('#element');
```

---

### placeholder

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

Hint text displayed when the TextBox has no value. When `floatLabelType` is `'Never'`, it acts as a permanent watermark.

```ts
let textBox: TextBox = new TextBox({
  placeholder: 'Enter your email'
});
textBox.appendTo('#element');
```

---

### prependTemplate

| Detail | Value |
|---|---|
| Type | `string \| HTMLElement \| Function` |
| Default | `null` |

Content to prepend before the input element (prefix). Accepts HTML string, element, or template function.

```ts
let textBox: TextBox = new TextBox({
  prependTemplate: '<span class="e-input-group-icon e-user-icon"></span>'
});
textBox.appendTo('#element');
```

---

### readonly

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Makes the TextBox read-only when `true`. The user can focus the input and copy text, but cannot edit it.

```ts
let textBox: TextBox = new TextBox({
  value: 'Readonly value',
  readonly: true
});
textBox.appendTo('#element');
```

---

### showClearButton

| Detail | Value |
|---|---|
| Type | `boolean` |
| Default | `false` |

Shows a clear (×) button inside the TextBox when `true`. Clicking it clears the input value.

```ts
let textBox: TextBox = new TextBox({
  placeholder: 'Enter text',
  showClearButton: true
});
textBox.appendTo('#element');
```

---

### type

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `'text'` |

Specifies the HTML `type` attribute of the underlying `<input>` element. Common values: `'text'`, `'password'`, `'email'`, `'number'`, `'tel'`.

```ts
let textBox: TextBox = new TextBox({
  placeholder: 'Password',
  type: 'password'
});
textBox.appendTo('#element');
```

---

### value

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

The current value of the TextBox. Can be set at initialization or updated programmatically.

```ts
let textBox: TextBox = new TextBox({
  value: 'Hello World'
});
textBox.appendTo('#element');

// Update value programmatically
textBox.value = 'New Value';
```

---

### width

| Detail | Value |
|---|---|
| Type | `string \| number` |
| Default | `null` |

Specifies the width of the TextBox. Accepts a number (treated as pixels) or a string CSS value (e.g., `'300px'`, `'50%'`).

```ts
let textBox: TextBox = new TextBox({
  placeholder: 'Fixed width',
  width: '300px'
});
textBox.appendTo('#element');
```

---

## Methods

### addAttributes(attrs)

Adds one or more HTML attributes to the underlying `<input>` element dynamically.

| Parameter | Type | Description |
|---|---|---|
| `attrs` | `{ [key: string]: string }` | Key-value pairs of attributes to add |

```ts
textBox.addAttributes({ 'aria-label': 'Search input', maxlength: '50' });
```

---

### addIcon(position, icons)

Adds one or more icon buttons to the TextBox at the specified position.

| Parameter | Type | Description |
|---|---|---|
| `position` | `string` | `'append'` (after input) or `'prepend'` (before input) |
| `icons` | `string \| string[]` | CSS class name(s) for the icon(s) |

```ts
textBox.addIcon('append', 'e-search-icon');
// Or multiple icons:
textBox.addIcon('append', ['e-date-icon', 'e-clear-icon']);
```

---

### appendTo(selector)

Mounts the TextBox component into the target DOM element.

| Parameter | Type | Description |
|---|---|---|
| `selector` | `string \| HTMLElement` | CSS selector string or DOM element |

```ts
textBox.appendTo('#my-input');
```

---

### dataBind()

Forces the component to synchronize its data-bound properties. Useful after manual property changes that need to be reflected in the DOM.

```ts
textBox.value = 'Updated';
textBox.dataBind();
```

---

### destroy()

Removes the TextBox component from the DOM and cleans up all event listeners and internal state. After calling `destroy()`, the original `<input>` element is restored.

```ts
textBox.destroy();
```

---

### focusIn()

Programmatically sets focus to the TextBox input.

```ts
textBox.focusIn();
```

---

### focusOut()

Programmatically removes focus from the TextBox input.

```ts
textBox.focusOut();
```

---

### getPersistData()

Returns a JSON string of the component's persistable state (the `value` property). Used internally by the persistence mechanism.

```ts
const state: string = textBox.getPersistData();
```

---

### getRootElement()

Returns the root DOM element of the TextBox component (the wrapper element, not the raw `<input>`).

```ts
const root: HTMLElement = textBox.getRootElement();
```

---

### refresh()

Refreshes the component to re-render and re-apply layout calculations. Useful when the container size changes.

```ts
textBox.refresh();
```

---

### removeAttributes(attrs)

Removes one or more HTML attributes from the underlying `<input>` element.

| Parameter | Type | Description |
|---|---|---|
| `attrs` | `string[]` | Array of attribute names to remove |

```ts
textBox.removeAttributes(['maxlength', 'aria-label']);
```

---

## Events

### blur

Fires when the TextBox loses focus.

| Detail | Value |
|---|---|
| Event Argument | `FocusOutEventArgs` |

```ts
let textBox: TextBox = new TextBox({
  blur: (args: FocusOutEventArgs) => {
    console.log('Blurred. Value:', args.value);
  }
});
textBox.appendTo('#element');
```

---

### change

Fires when the value of the TextBox changes and the component loses focus (committed change).

| Detail | Value |
|---|---|
| Event Argument | `ChangedEventArgs` |

```ts
let textBox: TextBox = new TextBox({
  change: (args: ChangedEventArgs) => {
    console.log('Changed. New value:', args.value, '| Previous:', args.previousValue);
  }
});
textBox.appendTo('#element');
```

---

### created

Fires after the TextBox component is fully created and rendered.

```ts
let textBox: TextBox = new TextBox({
  created: () => {
    console.log('TextBox created');
  }
});
textBox.appendTo('#element');
```

---

### destroyed

Fires after the TextBox component is destroyed.

```ts
let textBox: TextBox = new TextBox({
  destroyed: () => {
    console.log('TextBox destroyed');
  }
});
textBox.appendTo('#element');
```

---

### focus

Fires when the TextBox receives focus.

| Detail | Value |
|---|---|
| Event Argument | `FocusInEventArgs` |

```ts
let textBox: TextBox = new TextBox({
  focus: (args: FocusInEventArgs) => {
    console.log('Focused. Value:', args.value);
  }
});
textBox.appendTo('#element');
```

---

### input

Fires on every keystroke or value change while the user is typing (fires continuously, unlike `change` which fires on commit).

| Detail | Value |
|---|---|
| Event Argument | `InputEventArgs` |

```ts
let textBox: TextBox = new TextBox({
  input: (args: InputEventArgs) => {
    console.log('Input event. Current value:', args.value);
  }
});
textBox.appendTo('#element');
```

---

## Event Argument Types

### ChangedEventArgs

| Property | Type | Description |
|---|---|---|
| `value` | `string` | The current (new) value |
| `previousValue` | `string` | The previous value before the change |
| `container` | `HTMLElement` | The TextBox wrapper element |
| `event` | `Event` | The native DOM event |
| `isInteracted` | `boolean` | Whether the change was triggered by user interaction |

---

### FocusInEventArgs

| Property | Type | Description |
|---|---|---|
| `value` | `string` | Current value at time of focus |
| `container` | `HTMLElement` | The TextBox wrapper element |
| `event` | `FocusEvent` | The native focus DOM event |

---

### FocusOutEventArgs

| Property | Type | Description |
|---|---|---|
| `value` | `string` | Current value at time of blur |
| `container` | `HTMLElement` | The TextBox wrapper element |
| `event` | `FocusEvent` | The native blur DOM event |

---

### InputEventArgs

| Property | Type | Description |
|---|---|---|
| `value` | `string` | Current value during input |
| `previousValue` | `string` | Value before the current input |
| `container` | `HTMLElement` | The TextBox wrapper element |
| `event` | `Event` | The native input DOM event |
| `isInteracted` | `boolean` | Whether triggered by user interaction |

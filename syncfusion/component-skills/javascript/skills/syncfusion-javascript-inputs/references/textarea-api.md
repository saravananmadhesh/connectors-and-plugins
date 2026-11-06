# TextArea API Reference

Complete API surface for the Syncfusion EJ2 TypeScript TextArea component (`@syncfusion/ej2-inputs`).

Source: https://ej2.syncfusion.com/documentation/api/textarea/index-default

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Event Argument Interfaces](#event-argument-interfaces)
- [Type Definitions](#type-definitions)

---

## Properties

### adornmentFlow
**Type:** `AdornmentsDirection`  
**Default:** `'Horizontal'`

Specifies the adornment direction of the textarea. Controls the flow of the textarea and adornment sections (horizontal vs vertical).

- `'Horizontal'` — prepend on left, append on right.
- `'Vertical'` — prepend above, append below.

```typescript
let textareaObj: TextArea = new TextArea({
    adornmentFlow: 'Vertical'
});
```

---

### adornmentOrientation
**Type:** `AdornmentsDirection`  
**Default:** `'Horizontal'`

Specifies the adornment orientation. Controls the direction of adornment items relative to each other within their region.

- `'Horizontal'` — items in a row.
- `'Vertical'` — items stacked in a column.

```typescript
let textareaObj: TextArea = new TextArea({
    adornmentOrientation: 'Vertical'
});
```

---

### appendTemplate
**Type:** `string | Function`  
**Default:** `null`

Specifies the HTML template to append inside the TextArea wrapper. Accepts an HTML string or a function returning an HTML string. Updates dynamically when the property value changes.

```typescript
let textareaObj: TextArea = new TextArea({
    appendTemplate: '<span class="e-icons e-save"></span>'
});
```

---

### cols
**Type:** `number`

Specifies the visible width of the textarea, measured in average character widths.

```typescript
let textareaObj: TextArea = new TextArea({
    cols: 40
});
```

---

### cssClass
**Type:** `string`  
**Default:** `''`

Specifies the CSS class value appended to the wrapper of the TextArea. Use built-in classes (`e-outline`, `e-filled`, `e-small`, `e-bigger`, `e-static-clear`) or custom classes.

```typescript
let textareaObj: TextArea = new TextArea({
    cssClass: 'e-outline'
});
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enables or disables persisting the TextArea state between page reloads. When enabled, the `value` state is persisted in browser storage.

```typescript
let textareaObj: TextArea = new TextArea({
    enablePersistence: true
});
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enables or disables rendering the component in right-to-left (RTL) direction.

```typescript
let textareaObj: TextArea = new TextArea({
    enableRtl: true
});
```

---

### enabled
**Type:** `boolean`  
**Default:** `true`

Specifies whether the TextArea allows user interaction. Set to `false` to disable the TextArea.

```typescript
let textareaObj: TextArea = new TextArea({
    enabled: false
});
```

---

### floatLabelType
**Type:** `FloatLabelType`  
**Default:** `'Never'`

Specifies the floating label behavior. Possible values:

- `'Never'` — placeholder never floats.
- `'Always'` — placeholder always floats above.
- `'Auto'` — placeholder floats when focused or when a value is entered; returns to position when unfocused and empty.

```typescript
let textareaObj: TextArea = new TextArea({
    floatLabelType: 'Auto',
    placeholder: 'Enter your comments'
});
```

---

### htmlAttributes
**Type:** `{ [key: string]: string }`  
**Default:** `{}`

Adds extra HTML attributes to the `<textarea>` element. If both a property and an equivalent HTML attribute are set, the property value takes precedence.

```typescript
let textareaObj: TextArea = new TextArea({
    htmlAttributes: { 'aria-label': 'Comments', 'data-id': 'field-1' }
});
```

---

### locale
**Type:** `string`  
**Default:** `''`

Overrides the global culture and localization value for this component. Default global culture is `'en-US'`.

```typescript
let textareaObj: TextArea = new TextArea({
    locale: 'de-DE'
});
```

---

### maxLength
**Type:** `number`

Specifies the maximum number of characters allowed in the TextArea.

```typescript
let textareaObj: TextArea = new TextArea({
    maxLength: 300
});
```

---

### placeholder
**Type:** `string`  
**Default:** `null`

Specifies the text shown as a hint/placeholder until the user focuses or enters a value. Works with `floatLabelType` for floating label behavior.

```typescript
let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    floatLabelType: 'Auto'
});
```

---

### prependTemplate
**Type:** `string | Function`  
**Default:** `null`

Specifies the HTML template to prepend inside the TextArea wrapper. Accepts an HTML string or a function returning an HTML string. Updates dynamically when the property value changes.

```typescript
let textareaObj: TextArea = new TextArea({
    prependTemplate: '<span class="e-icons e-bold"></span>'
});
```

---

### readonly
**Type:** `boolean`  
**Default:** `false`

Specifies whether the TextArea allows users to change the text. When `true`, the content is displayed but cannot be edited.

```typescript
let textareaObj: TextArea = new TextArea({
    value: 'Read-only content',
    readonly: true
});
```

---

### resizeMode
**Type:** `Resize`  
**Default:** `'Both'`

Specifies the resize behavior. Possible values:

- `'Vertical'` — resize vertically only.
- `'Horizontal'` — resize horizontally only.
- `'Both'` — resize both vertically and horizontally (default).
- `'None'` — resizing disabled.

```typescript
let textareaObj: TextArea = new TextArea({
    resizeMode: 'Vertical'
});
```

---

### rows
**Type:** `number`

Specifies the visible height of the textarea, measured in lines.

```typescript
let textareaObj: TextArea = new TextArea({
    rows: 5
});
```

---

### showClearButton
**Type:** `boolean`  
**Default:** `false`

Specifies whether a clear button is displayed inside the TextArea.

```typescript
let textareaObj: TextArea = new TextArea({
    showClearButton: true
});
```

---

### value
**Type:** `string`  
**Default:** `null`

Sets the content of the TextArea.

```typescript
let textareaObj: TextArea = new TextArea({
    value: 'Initial text content'
});
```

---

### width
**Type:** `number | string`  
**Default:** `null`

Specifies the width of the TextArea component. Accepts a number (pixels) or a string (e.g., `'100%'`, `'500px'`).

```typescript
let textareaObj: TextArea = new TextArea({
    width: 500        // 500px
    // or
    // width: '100%'
});
```

---

## Methods

### addAttributes
Adds multiple HTML attributes as key-value pairs to the TextArea element.

**Signature:** `addAttributes(attributes: { [key: string]: string }): void`

```typescript
textareaObj.addAttributes({ 'aria-label': 'Comments', 'data-id': '1' });
```

---

### addEventListener
Adds a handler to the given event listener.

**Signature:** `addEventListener(eventName: string, handler: Function): void`

```typescript
textareaObj.addEventListener('input', (args) => { console.log(args); });
```

---

### appendTo
Appends the control within the given HTML element.

**Signature:** `appendTo(selector?: string | HTMLElement): void`

```typescript
textareaObj.appendTo('#default');
textareaObj.appendTo(document.getElementById('default'));
```

---

### dataBind
Applies all pending property changes immediately to the component.

**Signature:** `dataBind(): void`

```typescript
textareaObj.cssClass = 'e-outline';
textareaObj.dataBind();
```

---

### destroy
Removes the component from the DOM and detaches all related event handlers. Restores the initial `<textarea>` element.

**Signature:** `destroy(): void`

```typescript
textareaObj.destroy();
```

---

### focusIn
Sets focus to the TextArea for interaction.

**Signature:** `focusIn(): void`

```typescript
textareaObj.focusIn();
```

---

### focusOut
Removes focus from the TextArea.

**Signature:** `focusOut(): void`

```typescript
textareaObj.focusOut();
```

---

### getPersistData
Gets the properties maintained in the persisted state.

**Signature:** `getPersistData(): string`

Returns: `string` — JSON string of persisted properties.

```typescript
let data: string = textareaObj.getPersistData();
```

---

### getRootElement
Returns the root element of the component.

**Signature:** `getRootElement(): HTMLElement`

```typescript
let root: HTMLElement = textareaObj.getRootElement();
```

---

### refresh
Applies all pending property changes and re-renders the component.

**Signature:** `refresh(): void`

```typescript
textareaObj.refresh();
```

---

### removeAttributes
Removes multiple attributes by name from the TextArea element.

**Signature:** `removeAttributes(attributes: string[]): void`

```typescript
textareaObj.removeAttributes(['aria-label', 'data-id']);
```

---

### removeEventListener
Removes a handler from the given event listener.

**Signature:** `removeEventListener(eventName: string, handler: Function): void`

```typescript
textareaObj.removeEventListener('input', myHandler);
```

---

### Inject
Dynamically injects required modules to the component.

**Signature:** `static Inject(...moduleList: Function[]): void`

---

## Events

### blur
**Type:** `EmitType<FocusOutEventArgs>`

Triggers when the TextArea loses focus.

```typescript
let textareaObj: TextArea = new TextArea({
    blur: (args: FocusOutEventArgs) => { /* handle blur */ }
});
```

---

### change
**Type:** `EmitType<ChangedEventArgs>`

Triggers when the content of TextArea has changed and the TextArea loses focus.

```typescript
let textareaObj: TextArea = new TextArea({
    change: (args: ChangedEventArgs) => {
        console.log(args.value);
    }
});
```

---

### created
**Type:** `EmitType<Object>`

Triggers when the TextArea component is created.

```typescript
let textareaObj: TextArea = new TextArea({
    created: () => { /* component ready */ }
});
```

---

### destroyed
**Type:** `EmitType<Object>`

Triggers when the TextArea component is destroyed.

```typescript
let textareaObj: TextArea = new TextArea({
    destroyed: () => { /* cleanup */ }
});
```

---

### focus
**Type:** `EmitType<FocusInEventArgs>`

Triggers when the TextArea gains focus.

```typescript
let textareaObj: TextArea = new TextArea({
    focus: (args: FocusInEventArgs) => { /* handle focus */ }
});
```

---

### input
**Type:** `EmitType<InputEventArgs>`

Triggers each time the value of the TextArea changes.

```typescript
let textareaObj: TextArea = new TextArea({
    input: (args: InputEventArgs) => {
        console.log(args.value);
    }
});
```

---

## Event Argument Interfaces

### ChangedEventArgs
Provided in the `change` event.

| Property | Type | Description |
|---|---|---|
| `value` | `string` | The current value of the TextArea |
| `previousValue` | `string` | The previous value before the change |
| `event` | `Event` | The original browser event |
| `isInteraction` | `boolean` | Whether the change was due to user interaction |

---

### InputEventArgs
Provided in the `input` event.

| Property | Type | Description |
|---|---|---|
| `value` | `string` | The current value of the TextArea |
| `previousValue` | `string` | The previous value |
| `event` | `Event` | The original browser event |

---

### FocusInEventArgs
Provided in the `focus` event.

| Property | Type | Description |
|---|---|---|
| `event` | `FocusEvent` | The original focus browser event |
| `value` | `string` | The current value of the TextArea |

---

### FocusOutEventArgs
Provided in the `blur` event.

| Property | Type | Description |
|---|---|---|
| `event` | `FocusEvent` | The original blur browser event |
| `value` | `string` | The current value of the TextArea |

---

## Type Definitions

### FloatLabelType
```typescript
type FloatLabelType = 'Never' | 'Always' | 'Auto';
```

### Resize
```typescript
type Resize = 'Vertical' | 'Horizontal' | 'Both' | 'None';
```

### AdornmentsDirection
```typescript
type AdornmentsDirection = 'Horizontal' | 'Vertical';
```

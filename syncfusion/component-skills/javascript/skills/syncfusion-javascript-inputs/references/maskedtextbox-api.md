# API Reference — Syncfusion TypeScript MaskedTextBox

Complete API surface for `MaskedTextBox` from `@syncfusion/ej2-inputs`.

**Import:**
```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';
```

---

## Properties

### appendTemplate `string | Function`
Specifies HTML template string for custom elements to append after the MaskedTextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change.

**Default:** `null`

```typescript
let mask = new MaskedTextBox({
    mask: '000-000-0000',
    appendTemplate: '<span class="e-icons e-search"></span>'
});
```

---

### cssClass `string`
CSS class(es) added to the root element for custom styling.

**Default:** `null`

```typescript
let mask = new MaskedTextBox({ mask: '00000', cssClass: 'my-custom-class' });
```

---

### customCharacters `{ [x: string]: Object }`
Maps non-standard mask characters to their allowed input values (comma-separated string per key).

**Default:** `null`

```typescript
let mask = new MaskedTextBox({
    mask: '00:00 >PM',
    customCharacters: { P: 'P,A,p,a', M: 'M,m' }
});
```

---

### enablePersistence `boolean`
When `true`, persists the `value` state in browser local storage across page reloads.

**Default:** `false`

---

### enableRtl `boolean`
Renders the component in right-to-left direction.

**Default:** `false`

---

### enabled `boolean`
When `false`, disables the MaskedTextBox — prevents user interaction.

**Default:** `true`

---

### floatLabelType `FloatLabelType`
Controls floating label behavior. Possible values: `'Never'` | `'Always'` | `'Auto'`

- `'Never'` — placeholder stays inline (default)
- `'Always'` — label always floats above input
- `'Auto'` — floats on focus or when value is present

**Default:** `'Never'`

---

### htmlAttributes `{ [key: string]: string }`
Additional HTML attributes applied directly to the input element (e.g., `name`, `tabindex`, `readonly`, `type`). Component-level properties take precedence over equivalent HTML attributes.

**Default:** `{}`

```typescript
let mask = new MaskedTextBox({
    mask: '000-000',
    htmlAttributes: { name: 'phone', tabindex: '-1' }
});
```

---

### locale `string`
Overrides the global culture/localization value for this component.

**Default:** `''` (uses global `'en-US'`)

---

### mask `string`
Defines the mask pattern. Each character constrains input at that position. Accepts standard mask elements, custom characters, and regex patterns wrapped in `[...]`.

When empty, the component behaves as a plain text input.

**Default:** `null`

```typescript
let mask = new MaskedTextBox({ mask: '(000) 000-0000' });
```

---

### placeholder `string`
Hint text shown when the MaskedTextBox is empty. Acts as a floating label based on `floatLabelType`.

**Default:** `null`

---

### prependTemplate `string | Function`
Specifies HTML template string for custom elements to prepend before the MaskedTextBox input. Supports icons, buttons, or any valid HTML. Updates dynamically on property change.

**Default:** `null`

```typescript
let mask = new MaskedTextBox({
    mask: '000-000-0000',
    prependTemplate: '<span class="e-icons e-user"></span>'
});
```

---

### promptChar `string`
The symbol displayed at empty mask positions to indicate where input is expected.

**Default:** `'_'`

```typescript
let mask = new MaskedTextBox({ mask: '000-000-0000', promptChar: '#' });
```

---

### readonly `boolean`
When `true`, displays the value but prevents user changes.

**Default:** `false`

---

### showClearButton `boolean`
When `true`, shows an X icon to clear the input.

**Default:** `false`

---

### value `string`
The raw value (no mask literals, no prompt characters). Set this to pre-fill the input. Read this to get the clean submitted value.

**Default:** `null`

```typescript
let mask = new MaskedTextBox({ mask: '(999) 9999-999', value: '8674321756' });
```

---

### width `number | string`
Width of the MaskedTextBox. Accepts pixels (number) or CSS string (`'250px'`, `'50%'`).

**Default:** `null`

---

## Methods

### addEventListener(eventName: string, handler: Function): void
Adds an event handler for the specified event name.

```typescript
mask.addEventListener('change', (args) => { console.log(args); });
```

---

### appendTo(selector?: string | HTMLElement): void
Appends the control to the specified HTML element or selector.

```typescript
mask.appendTo('#mask');
```

---

### dataBind(): void
Applies all pending property changes immediately to the component.

```typescript
mask.value = '1234567890';
mask.dataBind();
```

---

### destroy(): void
Removes the component from the DOM and detaches all event handlers. Restores the original input element.

```typescript
mask.destroy();
```

---

### focusIn(): void
Sets keyboard focus on the MaskedTextBox.

```typescript
mask.focusIn();
```

---

### focusOut(): void
Removes focus from the MaskedTextBox.

```typescript
mask.focusOut();
```

---

### getMaskedValue(): string
Returns the current value with mask literals included (formatted display value).

```typescript
const formatted = mask.getMaskedValue();
// For mask '000-000-0000' with value '8001234567': returns '800-123-4567'
```

---

### getPersistData(): string
Returns the properties to be maintained in the persisted state (as a JSON string).

---

### getRootElement(): HTMLElement
Returns the root DOM element of the component.

---

### refresh(): void
Re-renders the component, applying all pending property changes.

```typescript
mask.value = '9995551234';
mask.refresh();
```

---

### removeEventListener(eventName: string, handler: Function): void
Removes a previously added event handler.

```typescript
mask.removeEventListener('change', changeHandler);
```

---

### Inject(moduleList: Function[]): void
Static method. Dynamically injects required modules into the component.

```typescript
MaskedTextBox.Inject(/* module */);
```

---

## Events

### blur `EmitType<MaskBlurEventArgs>`
Fires when the MaskedTextBox loses focus.

**`MaskBlurEventArgs` properties:**
- `value: string` — raw value at time of blur
- `maskedValue: string` — formatted value at time of blur
- `event: FocusEvent` — original DOM event

---

### change `EmitType<MaskChangeEventArgs>`
Fires when the value changes.

**`MaskChangeEventArgs` properties:**
- `value: string` — raw value (no literals or prompt chars)
- `maskedValue: string` — value with mask formatting
- `event: Event` — original DOM event

---

### created `EmitType<Object>`
Fires when the MaskedTextBox component is created and rendered.

---

### destroyed `EmitType<Object>`
Fires when the MaskedTextBox component is destroyed.

---

### focus `EmitType<MaskFocusEventArgs>`
Fires when the MaskedTextBox gains focus.

**`MaskFocusEventArgs` properties:**
- `selectionStart: number` — cursor start position (writable)
- `selectionEnd: number` — cursor end position (writable)
- `value: string` — current raw value
- `maskedValue: string` — current formatted value
- `event: FocusEvent` — original DOM event

---

## Types

### FloatLabelType
```typescript
type FloatLabelType = 'Never' | 'Always' | 'Auto';
```

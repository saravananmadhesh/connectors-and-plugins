# API Reference — Syncfusion JavaScript RadioButton

> Source: https://ej2.syncfusion.com/documentation/api/radio-button/index-default

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
  - [appendTo](#appendtoselector)
  - [click](#click)
  - [dataBind](#databind)
  - [destroy](#destroy)
  - [focusIn](#focusin)
  - [getRootElement](#getrootelement)
  - [getSelectedValue](#getselectedvalue)
  - [refresh](#refresh)
  - [addEventListener](#addeventlistenereventname-handler)
  - [removeEventListener](#removeeventlistenereventname-handler)
  - [Inject](#injectmodulelist)
- [Events](#events)
  - [change](#change-emittypechangeargs)
  - [created](#created-emittypeevent)

---

## Properties

### checked `boolean`
Specifies whether the RadioButton is in the checked (selected) state. When `true`, an inner circle is rendered inside the RadioButton.

```typescript
let rb: RadioButton = new RadioButton({ label: 'Option 1', name: 'group', checked: true });
rb.appendTo('#element');
```

**Defaults to:** `false`

---

### cssClass `string`
Defines one or more CSS class names (space-separated) applied to the RadioButton element. Used to apply custom styles, semantic color variants, or size modifications.

```typescript
// Small size
let rb1: RadioButton = new RadioButton({ label: 'Small', name: 'size', cssClass: 'e-small' });
rb1.appendTo('#element1');

// Custom color (requires matching CSS rule)
let rb2: RadioButton = new RadioButton({ label: 'Primary', name: 'color', cssClass: 'e-primary' });
rb2.appendTo('#element2');
```

**Defaults to:** `''`

---

### disabled `boolean`
When `true`, the RadioButton is rendered in a disabled (non-interactive) state. Disabled RadioButtons are grayed out and cannot be selected by the user. Their `value` is **not submitted** during form submission.

```typescript
let rb: RadioButton = new RadioButton({ label: 'Disabled', name: 'group', disabled: true });
rb.appendTo('#element');
```

**Defaults to:** `false`

---

### enableHtmlSanitizer `boolean`
When `true`, sanitizes any untrusted HTML strings before rendering them in the component to prevent XSS attacks. Affects the `label` property if it contains HTML content.

**Defaults to:** `true`

---

### enablePersistence `boolean`
When `true`, persists the component's state (e.g., checked state) between page reloads using browser `localStorage`.

```typescript
let rb: RadioButton = new RadioButton({ label: 'Option 1', name: 'group', enablePersistence: true });
rb.appendTo('#element');
```

**Defaults to:** `false`

---

### enableRtl `boolean`
When `true`, renders the RadioButton in right-to-left direction. The label appears to the right of the circle in RTL layout (which is the left side visually).

```typescript
let rb: RadioButton = new RadioButton({ label: 'RTL Option', name: 'group', enableRtl: true });
rb.appendTo('#element');
```

**Defaults to:** `false`

---

### htmlAttributes `{ [key: string]: string }`
Specifies additional HTML attributes to apply to the underlying `<input>` element. If both a property and an equivalent HTML attribute are configured, the property value takes precedence.

```typescript
let rb: RadioButton = new RadioButton({
  label: 'Required Option',
  name: 'group',
  htmlAttributes: { required: 'required', 'data-testid': 'radio-opt1' }
});
rb.appendTo('#element');
```

**Defaults to:** `{}`

---

### label `string`
Defines the caption text displayed alongside the RadioButton. This is the accessible name of the control and is announced by screen readers.

```typescript
let rb: RadioButton = new RadioButton({ label: 'Accept Terms', name: 'agreement' });
rb.appendTo('#element');
```

**Defaults to:** `''`

---

### labelPosition `RadioLabelPosition`
Controls the position of the label relative to the RadioButton circle.

| Value      | Description                                      |
|------------|--------------------------------------------------|
| `'Before'` | Label is positioned to the **left** of the circle |
| `'After'`  | Label is positioned to the **right** of the circle (default) |

```typescript
let rb: RadioButton = new RadioButton({
  label: 'Left Label',
  name: 'group',
  labelPosition: 'Before'
});
rb.appendTo('#element');
```

**Defaults to:** `'After'`

---

### locale `string`
Overrides the global culture and localization value for this component instance. When not set, defaults to the global culture (`'en-US'`).

**Defaults to:** `''`

---

### name `string`
Defines the `name` attribute for the underlying `<input type="radio">` element. All RadioButtons sharing the same `name` value are treated as a group — only one can be selected at a time. The `name` is also used to reference the submitted form data after form submission.

```typescript
// Both RadioButtons are in the "payment" group
let rb1: RadioButton = new RadioButton({ label: 'Credit Card', name: 'payment', value: 'credit' });
let rb2: RadioButton = new RadioButton({ label: 'Net Banking', name: 'payment', value: 'netbanking' });
rb1.appendTo('#radio1');
rb2.appendTo('#radio2');
```

**Defaults to:** `''`

---

### value `string`
Defines the `value` attribute for the underlying `<input type="radio">` element. This value is submitted as part of the form data when the RadioButton is checked. If the RadioButton is disabled, its value is **not** sent on form submit.

```typescript
let rb: RadioButton = new RadioButton({
  label: 'Cash on Delivery',
  name: 'payment',
  value: 'cashondelivery'
});
rb.appendTo('#element');
```

**Defaults to:** `''`

---

## Methods

### appendTo(selector?)
Mounts the RadioButton component into the target DOM element.

| Parameter             | Type                    | Description                              |
|-----------------------|-------------------------|------------------------------------------|
| `selector` (optional) | `string \| HTMLElement` | CSS selector string or DOM element reference |

**Returns:** `void`

```typescript
let rb: RadioButton = new RadioButton({ label: 'Option 1', name: 'group' });
rb.appendTo('#element');
// or
rb.appendTo(document.getElementById('element') as HTMLElement);
```

---

### click()
Programmatically triggers a click on the RadioButton element (native method). Simulates the user clicking the button.

**Returns:** `void`

```typescript
let rb: RadioButton = new RadioButton({ label: 'Option 1', name: 'group' });
rb.appendTo('#element');
rb.click(); // programmatically select
```

---

### dataBind()
Applies all pending property changes to the component immediately without a full re-render. Use this for lightweight single-property updates.

**Returns:** `void`

```typescript
rb.disabled = true;
rb.dataBind(); // applies the disabled state immediately
```

---

### destroy()
Destroys the RadioButton — removes event listeners, clears internal state, and cleans up DOM modifications.

**Returns:** `void`

```typescript
rb.destroy();
```

Always call `destroy()` when removing the component from the page to prevent memory leaks.

---

### focusIn()
Programmatically sets keyboard focus to the RadioButton's native element.

**Returns:** `void`

```typescript
rb.focusIn();
```

---

### getRootElement()
Returns the root HTML element of the RadioButton component.

**Returns:** `HTMLElement`

```typescript
let rootEl: HTMLElement = rb.getRootElement();
console.log(rootEl); // the wrapper element
```

---

### getSelectedValue()
Returns the `value` attribute of the currently checked RadioButton in the group. Use this to programmatically read which option is selected without querying the DOM.

**Returns:** `string`

```typescript
let rb1: RadioButton = new RadioButton({ label: 'Credit Card', name: 'payment', value: 'credit', checked: true });
rb1.appendTo('#radio1');
let rb2: RadioButton = new RadioButton({ label: 'Net Banking', name: 'payment', value: 'netbanking' });
rb2.appendTo('#radio2');

// Get the currently selected value
let selected: string = rb1.getSelectedValue();
console.log(selected); // 'credit'
```

---

### refresh()
Applies all pending property changes and fully re-renders the component. Use this when multiple structural properties have changed and a complete re-render is needed.

**Returns:** `void`

```typescript
rb.label = 'Updated Label';
rb.refresh();
```

> Use `dataBind()` for single lightweight updates; use `refresh()` when multiple properties change at once.

---

### addEventListener(eventName, handler)
Registers an event listener on the component.

| Parameter   | Type       | Description                     |
|-------------|------------|---------------------------------|
| `eventName` | `string`   | Name of the event to listen for |
| `handler`   | `Function` | Callback function               |

**Returns:** `void`

```typescript
import { RadioButton, ChangeEventArgs } from '@syncfusion/ej2-buttons';

rb.addEventListener('change', (args: ChangeEventArgs): void => {
  console.log('RadioButton changed');
});
```

---

### removeEventListener(eventName, handler)
Removes a previously registered event listener.

| Parameter   | Type       | Description                              |
|-------------|------------|------------------------------------------|
| `eventName` | `string`   | Name of the event to remove              |
| `handler`   | `Function` | The exact handler function to remove     |

**Returns:** `void`

```typescript
function onChange(args: ChangeEventArgs) { console.log('changed'); }
rb.addEventListener('change', onChange);
rb.removeEventListener('change', onChange);
```

---

### Inject(moduleList)
Dynamically injects required feature modules into the component. The RadioButton has no optional feature modules — this method is inherited from the base class and is generally not required.

| Parameter    | Type         | Description              |
|--------------|--------------|--------------------------|
| `moduleList` | `Function[]` | Array of module classes  |

**Returns:** `void`

---

## Events

### change `EmitType<ChangeArgs>`
Triggers when the RadioButton state has been changed by user interaction (clicking or keyboard navigation).

```typescript
import { RadioButton, ChangeEventArgs } from '@syncfusion/ej2-buttons';

let rb: RadioButton = new RadioButton({
  label: 'Option 1',
  name: 'group',
  value: 'opt1',
  change: (args: ChangeEventArgs) => {
    console.log('Changed — event:', args.event);
  }
});
rb.appendTo('#element');
```

**ChangeArgs properties:**

| Property | Type    | Description                                        |
|----------|---------|----------------------------------------------------|
| `event`  | `Event` | The native DOM event that triggered the change     |

> Access the selected value via `(args.event.target as HTMLInputElement).value`.

---

### created `EmitType<Event>`
Triggers once the RadioButton component has finished rendering and is ready for interaction.

```typescript
let rb: RadioButton = new RadioButton({
  label: 'Option 1',
  name: 'group',
  created: () => {
    console.log('RadioButton is ready');
  }
});
rb.appendTo('#element');
```

---

## Usage Notes

- Always call `appendTo()` after creating the instance — the component is not rendered until mounted.
- Always set the `name` property to group RadioButtons — without it, multiple buttons can appear selected simultaneously in some browsers.
- Use `getSelectedValue()` to programmatically read the currently selected value in a group without querying the DOM.
- The `value` of a `disabled` RadioButton is never sent on HTML form submission.
- `beforeChange` from EJ1 has no equivalent in EJ2 — use `change` with conditional logic instead.
- `htmlAttributes` values are overridden by equivalent component properties if both are set.

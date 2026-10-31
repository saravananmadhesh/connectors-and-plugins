# Label and Size — Syncfusion JavaScript RadioButton

This reference covers how to configure the RadioButton's label text, label position, and component size.

---

## Label

Use the `label` property to define the caption displayed alongside the RadioButton. This eliminates the need to manually add a `<label>` element in HTML.

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let radiobutton: RadioButton = new RadioButton({ label: 'My RadioButton', name: 'group' });
radiobutton.appendTo('#element');
```

**Default:** `''` (empty string — no label rendered)

---

## Label Position

Use the `labelPosition` property to place the label **before** (left) or **after** (right) the RadioButton circle.

| Value      | Description                            |
|------------|----------------------------------------|
| `'Before'` | Label appears to the **left** of the circle |
| `'After'`  | Label appears to the **right** of the circle (default) |

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Label on the left
let rb1: RadioButton = new RadioButton({
  label: 'Left Side Label',
  name: 'position',
  labelPosition: 'Before'
});
rb1.appendTo('#radiobutton1');

// Label on the right (default)
let rb2: RadioButton = new RadioButton({
  label: 'Right Side Label',
  name: 'position',
  checked: true
});
rb2.appendTo('#radiobutton2');
```

```html
<input id="radiobutton1" type="radio" />
<input id="radiobutton2" type="radio" />
```

**Default:** `'After'`

---

## Size

Two size options are available: **default** and **small**.

To render a smaller RadioButton, add the `e-small` CSS class using the `cssClass` property:

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Small RadioButton
let smallRb: RadioButton = new RadioButton({
  label: 'Small',
  name: 'size',
  checked: true,
  cssClass: 'e-small'
});
smallRb.appendTo('#radiobutton1');

// Default size RadioButton
let defaultRb: RadioButton = new RadioButton({
  label: 'Default',
  name: 'size'
});
defaultRb.appendTo('#radiobutton2');
```

```html
<input id="radiobutton1" type="radio" />
<input id="radiobutton2" type="radio" />
```



---

## Summary

| Property        | Type     | Purpose                              | Default   |
|-----------------|----------|--------------------------------------|-----------|
| `label`         | `string` | Caption text shown next to the button | `''`      |
| `labelPosition` | `string` | `'Before'` or `'After'`             | `'After'` |
| `cssClass`      | `string` | `'e-small'` for reduced size        | `''`      |

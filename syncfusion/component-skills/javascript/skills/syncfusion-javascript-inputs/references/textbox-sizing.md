# Sizing – Syncfusion TypeScript TextBox

## Overview

The TextBox supports three size variants controlled via the `cssClass` property:

| Size | cssClass value | Description |
|---|---|---|
| Normal | _(none)_ | Default size |
| Small | `'e-small'` | Compact, smaller height |
| Bigger | `'e-bigger'` | Larger height and font |

---

## Normal Size (Default)

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let normalTextBox: TextBox = new TextBox({
  placeholder: 'Enter the text',
  floatLabelType: 'Never'
});
normalTextBox.appendTo('#normal');

// Normal with floating label
let normalFloatTextBox: TextBox = new TextBox({
  placeholder: 'Enter the text',
  floatLabelType: 'Auto'
});
normalFloatTextBox.appendTo('#normalFloat');

// Normal with icon
let normalIconTextBox: TextBox = new TextBox({
  placeholder: 'Enter the text',
  floatLabelType: 'Auto',
  created: function () {
    normalIconTextBox.addIcon('append', 'e-date-icon');
  }
});
normalIconTextBox.appendTo('#normalIcon');
```

---

## Small Size

Add `cssClass: 'e-small'` for a compact variant useful in dense UIs or toolbars.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let smallTextBox: TextBox = new TextBox({
  placeholder: 'Enter the text',
  floatLabelType: 'Never',
  cssClass: 'e-small'
});
smallTextBox.appendTo('#small');

// Small with floating label
let smallFloatTextBox: TextBox = new TextBox({
  placeholder: 'Enter the text',
  floatLabelType: 'Auto',
  cssClass: 'e-small'
});
smallFloatTextBox.appendTo('#smallFloat');

// Small with icon
let smallIconTextBox: TextBox = new TextBox({
  placeholder: 'Enter the text',
  floatLabelType: 'Auto',
  cssClass: 'e-small',
  created: function () {
    smallIconTextBox.addIcon('append', 'e-date-icon');
  }
});
smallIconTextBox.appendTo('#smallIcon');
```

---

## Bigger Size

Add `cssClass: 'e-bigger'` for a more prominent, larger variant useful on touch/mobile interfaces.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let biggerTextBox: TextBox = new TextBox({
  placeholder: 'Enter the text',
  floatLabelType: 'Auto',
  cssClass: 'e-bigger'
});
biggerTextBox.appendTo('#bigger');
```

---

## Combining Size with Other Classes

`cssClass` accepts space-separated class names, so size classes combine cleanly with other classes:

```ts
// Small + outlined
let smallOutlined: TextBox = new TextBox({
  placeholder: 'Small Outlined',
  floatLabelType: 'Auto',
  cssClass: 'e-small e-outline'
});
smallOutlined.appendTo('#smallOutlined');

// Small + validation state
let smallError: TextBox = new TextBox({
  placeholder: 'Small Error',
  cssClass: 'e-small e-error'
});
smallError.appendTo('#smallError');
```

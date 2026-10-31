# Adornments in TextArea

## Table of Contents
- [Overview](#overview)
- [prependTemplate and appendTemplate](#prependtemplate-and-appendtemplate)
- [adornmentFlow](#adornmentflow)
- [adornmentOrientation](#adornmentorientation)
- [Full Example with Orientation Controls](#full-example-with-orientation-controls)
- [Common Adornment Patterns](#common-adornment-patterns)

---

## Overview

Adornments let you inject custom HTML content before or after the TextArea using the `prependTemplate` and `appendTemplate` properties. Use them to add:
- Visual indicators (icons for context, edit, comment)
- Formatting tools (bold, italic, underline buttons)
- Content actions (save, clear, submit buttons)
- Validation/status indicators (character count, error icons)

Control layout using `adornmentFlow` and `adornmentOrientation`.

---

## prependTemplate and appendTemplate

Both properties accept an HTML string or a function returning an HTML string. They render their content inside the TextArea wrapper — `prependTemplate` before the textarea, `appendTemplate` after.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Add a comment',
    cssClass: 'e-outline',
    floatLabelType: 'Auto',
    // Icons displayed before the textarea
    prependTemplate: '<span class="e-icons e-bold"></span><span class="e-input-separator"></span><span class="e-icons e-italic"></span>',
    // Action buttons displayed after the textarea
    appendTemplate: '<span class="e-input-separator"></span><span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>'
});
textareaObj.appendTo('#default');
```

The `e-input-separator` class adds a visual divider between adornment items.

---

## adornmentFlow

`adornmentFlow` controls where the adornment sections appear relative to the TextArea:

| Value | Behavior |
|---|---|
| `Horizontal` | `prependTemplate` appears on the left, `appendTemplate` on the right. **Default.** |
| `Vertical` | `prependTemplate` appears above the TextArea, `appendTemplate` below. |

Uses the `AdornmentsDirection` type from `@syncfusion/ej2-inputs`.

```typescript
import { AdornmentsDirection, TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Add a comment',
    adornmentFlow: 'Vertical' as AdornmentsDirection,
    prependTemplate: '<span class="e-icons e-bold"></span>',
    appendTemplate: '<span class="e-icons e-save"></span>'
});
textareaObj.appendTo('#default');
```

---

## adornmentOrientation

`adornmentOrientation` controls how items **within** each adornment section are arranged:

| Value | Behavior |
|---|---|
| `Horizontal` | Items in the adornment are laid out in a row. **Default.** |
| `Vertical` | Items in the adornment are stacked in a column. |

Uses the `AdornmentsDirection` type.

```typescript
import { AdornmentsDirection, TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Add a comment',
    adornmentOrientation: 'Vertical' as AdornmentsDirection,
    prependTemplate: '<span class="e-icons e-bold"></span><span class="e-icons e-italic"></span>',
    appendTemplate: '<span class="e-icons e-save"></span><span class="e-icons e-trash"></span>'
});
textareaObj.appendTo('#default');
```

---

## Full Example with Orientation Controls

This example shows how to dynamically update adornment flow and orientation using DropDownList:

```typescript
import { AdornmentsDirection, TextArea } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Add a comment',
    cssClass: 'e-outline',
    resizeMode: 'None',
    floatLabelType: 'Auto',
    appendTemplate: '<span class="e-input-separator"></span><span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>',
    prependTemplate: '<span class="e-icons e-bold"></span><span class="e-input-separator"></span><span class="e-icons e-italic"></span><span class="e-input-separator"></span>'
});
textareaObj.appendTo('#icontemplate');

// Dropdown to change adornmentFlow
let flowDropdown: DropDownList = new DropDownList({
    index: 0,
    popupHeight: '200px',
    change: () => {
        textareaObj.adornmentFlow = flowDropdown.value as AdornmentsDirection;
        textareaObj.dataBind();
    }
});
flowDropdown.appendTo('#flow-orientation');

// Dropdown to change adornmentOrientation
let orientDropdown: DropDownList = new DropDownList({
    index: 0,
    popupHeight: '200px',
    change: () => {
        textareaObj.adornmentOrientation = orientDropdown.value as AdornmentsDirection;
        textareaObj.dataBind();
    }
});
orientDropdown.appendTo('#orient-orientation');
```

After changing `adornmentFlow` or `adornmentOrientation` programmatically, call `dataBind()` to apply the changes immediately.

---

## Common Adornment Patterns

| Use Case | Template Example |
|---|---|
| Icon indicator | `'<span class="e-icons e-edit"></span>'` |
| Formatting toolbar | `'<span class="e-icons e-bold"></span><span class="e-input-separator"></span><span class="e-icons e-italic"></span>'` |
| Save + delete actions | `'<span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>'` |
| Text label prefix | `'<span>Comment:</span>'` |
| Separator only | `'<span class="e-input-separator"></span>'` |

---

## Notes

- `prependTemplate` and `appendTemplate` default to `null` (no adornment).
- Both properties support dynamic updates — change the property and call `dataBind()` to re-render.
- `adornmentFlow` and `adornmentOrientation` both accept only `'Horizontal'` or `'Vertical'` (the `AdornmentsDirection` type).
- Use the `e-input-separator` CSS class for visual dividers between adornment items.

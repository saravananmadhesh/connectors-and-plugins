# Adornments — Syncfusion TypeScript MaskedTextBox

Adornments let you inject custom HTML elements before or after the masked input using `prependTemplate` and `appendTemplate`. Use them to add icons, prefix/suffix labels, or action buttons — without affecting mask validation or float label behavior.

## Table of Contents
- [Overview](#overview)
- [prependTemplate](#prependtemplate)
- [appendTemplate](#appendtemplate)
- [Combined Example](#combined-example)
- [Common Use Cases](#common-use-cases)

---

## Overview

| Property | Position | Purpose |
|---|---|---|
| `prependTemplate` | Before the input | Prefix icon, country code, static label |
| `appendTemplate` | After the input | Action button, send icon, unit suffix |

Both properties accept:
- An HTML string
- A `Function` that returns HTML

They update dynamically when the property changes and do not interfere with mask validation.

---

## prependTemplate

Renders custom HTML before the masked input field:

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox({
    mask: '0000-000-000',
    placeholder: 'Enter phone number',
    floatLabelType: 'Auto',
    prependTemplate: '<span class="e-icons e-user" title="User"></span>' +
                     '<span class="e-input-separator"></span>'
});
mask.appendTo('#mask');
```

The `e-input-separator` class adds a visual divider between the icon and the input.

---

## appendTemplate

Renders custom HTML after the masked input field:

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox({
    mask: '0000-000-000',
    placeholder: 'Enter phone number',
    floatLabelType: 'Auto',
    appendTemplate: '<span class="e-input-separator"></span>' +
                    '<span class="e-icons e-send"></span>'
});
mask.appendTo('#mask');
```

---

## Combined Example

Use both together for a fully adorned input:

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

let maskObj: MaskedTextBox = new MaskedTextBox({
    mask: '0000-000-000',
    promptChar: '#',
    placeholder: 'Enter phone number',
    floatLabelType: 'Auto',
    prependTemplate: '<span id="user" class="e-icons e-user" title="User"></span>' +
                     '<span class="e-input-separator"></span>',
    appendTemplate: '<span class="e-input-separator"></span>' +
                    '<span id="sendIcon" class="e-icons e-send"></span>'
});
maskObj.appendTo('#mask');
```

---

## Common Use Cases

| Use Case | Template Example |
|---|---|
| User icon prefix | `prependTemplate: '<span class="e-icons e-user"></span>'` |
| Lock icon (password-style) | `prependTemplate: '<span class="e-icons e-lock"></span>'` |
| Country code prefix | `prependTemplate: '<span class="e-input-group-icon">+1</span>'` |
| Send / submit button | `appendTemplate: '<span class="e-icons e-send"></span>'` |
| Copy button | `appendTemplate: '<button class="e-btn e-small">Copy</button>'` |
| Unit suffix (e.g. kg) | `appendTemplate: '<span class="e-input-group-icon">kg</span>'` |
| Separator only | `'<span class="e-input-separator"></span>'` |

> Adornments are purely visual — they do not affect `value`, `getMaskedValue()`, or any mask validation logic.

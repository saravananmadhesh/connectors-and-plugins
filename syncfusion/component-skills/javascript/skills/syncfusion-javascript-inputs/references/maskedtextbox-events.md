# Events and Interaction — Syncfusion TypeScript MaskedTextBox

## Table of Contents
- [change Event](#change-event)
- [focus Event](#focus-event)
- [blur Event](#blur-event)
- [created and destroyed Events](#created-and-destroyed-events)
- [Cursor Position Control in focus](#cursor-position-control-in-focus)
- [addEventListener and removeEventListener](#addeventlistener-and-removeeventlistener)

---

## change Event

Fires when the value of the MaskedTextBox changes (on input). Provides `MaskChangeEventArgs`:

```typescript
import { MaskedTextBox, MaskChangeEventArgs } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    placeholder: 'Phone Number',
    floatLabelType: 'Always',
    change: (args: MaskChangeEventArgs) => {
        console.log('Raw value:', args.value);        // digits only
        console.log('Masked value:', args.maskedValue); // formatted
        console.log('Is complete:', args.maskedValue.indexOf(mask.promptChar) === -1);
    }
});
mask.appendTo('#mask');
```

**`MaskChangeEventArgs` properties:**
- `value` — raw value (no mask literals, no prompt chars)
- `maskedValue` — value with mask formatting applied
- `event` — the original DOM event

---

## focus Event

Fires when the MaskedTextBox gains focus. Provides `MaskFocusEventArgs`:

```typescript
import { MaskedTextBox, MaskFocusEventArgs } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox({
    mask: '00000-00000',
    placeholder: 'Zip+4',
    floatLabelType: 'Always',
    focus: (args: MaskFocusEventArgs) => {
        console.log('Focused. Selection:', args.selectionStart, '-', args.selectionEnd);
        console.log('Masked value at focus:', args.maskedValue);
    }
});
mask.appendTo('#mask');
```

**`MaskFocusEventArgs` properties:**
- `selectionStart` — cursor start position (writable — change to reposition cursor)
- `selectionEnd` — cursor end position (writable — change to set selection)
- `maskedValue` — current masked display value
- `value` — current raw value
- `event` — the original DOM event

---

## blur Event

Fires when the MaskedTextBox loses focus. Provides `MaskBlurEventArgs`:

```typescript
import { MaskedTextBox, MaskBlurEventArgs } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    blur: (args: MaskBlurEventArgs) => {
        console.log('Blurred. Value:', args.value);
        console.log('Masked value:', args.maskedValue);
    }
});
mask.appendTo('#mask');
```

**`MaskBlurEventArgs` properties:**
- `value` — raw value at time of blur
- `maskedValue` — formatted value at time of blur
- `event` — the original DOM event

---

## created and destroyed Events

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    created: () => {
        console.log('MaskedTextBox initialized');
    },
    destroyed: () => {
        console.log('MaskedTextBox destroyed');
    }
});
mask.appendTo('#mask');
```

---

## Cursor Position Control in focus

By default, focusing the MaskedTextBox selects all content. Use the `focus` event's `selectionStart` and `selectionEnd` to customize cursor behavior:

### Position cursor at start

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '00000-00000',
    value: '83929-4343',
    placeholder: 'Cursor at start',
    floatLabelType: 'Always',
    focus: (args) => {
        args.selectionEnd = args.selectionStart = 0;
    }
});
mask.appendTo('#mask');
```

### Position cursor at end

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '00000-00000',
    value: '83929-3213',
    placeholder: 'Cursor at end',
    floatLabelType: 'Always',
    focus: (args) => {
        args.selectionStart = args.selectionEnd = args.maskedValue.length;
    }
});
mask.appendTo('#mask');
```

### Position cursor at a specific index

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '+1 000-000-0000',
    value: '234-432-432',
    placeholder: 'Cursor at position 3',
    floatLabelType: 'Always',
    focus: (args) => {
        args.selectionStart = 3;
        args.selectionEnd = 3;
    }
});
mask.appendTo('#mask');
```

> **Note:** When a MaskedTextBox is fully filled with mask characters, `selectionStart` and `selectionEnd` reset to `0` on focus — this is standard HTML5 input behavior.

---

## addEventListener and removeEventListener

Attach and detach event handlers dynamically:

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000'
});
mask.appendTo('#mask');

// Add handler
const changeHandler = (args: object) => {
    console.log('Value changed');
};
mask.addEventListener('change', changeHandler);

// Remove handler later
mask.removeEventListener('change', changeHandler);
```

# Max Length in TextArea

## Overview

Use the `maxLength` property to enforce a maximum character limit on the TextArea. When the user reaches the limit, further input is blocked automatically.

## Setting maxLength

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    maxLength: 200
});
textareaObj.appendTo('#default');
```

## Combining with Floating Label and Outline

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Feedback (max 500 chars)',
    floatLabelType: 'Auto',
    cssClass: 'e-outline',
    maxLength: 500,
    resizeMode: 'Vertical',
    rows: 4
});
textareaObj.appendTo('#default');
```

## Tracking Character Count with `input` Event

To show a live character count, combine `maxLength` with the `input` event:

```typescript
import { TextArea, InputEventArgs } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    maxLength: 200,
    input: (args: InputEventArgs) => {
        const remaining = 200 - (args.value ? args.value.length : 0);
        document.getElementById('charCount').textContent = `${remaining} characters remaining`;
    }
});
textareaObj.appendTo('#default');
```

## Notes

- `maxLength` maps directly to the HTML `maxlength` attribute on the underlying `<textarea>` element.
- The browser enforces the limit natively — no custom logic is needed to block input.
- `maxLength` does not display a visible counter by default; implement a counter using the `input` event if needed.
- To enforce length server-side as well, always validate in the form submit handler or with `FormValidator`.

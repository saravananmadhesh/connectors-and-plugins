# Getting Started with Syncfusion TypeScript TextArea

## Table of Contents
- [Dependencies](#dependencies)
- [Installation and CSS Setup](#installation-and-css-setup)
- [Basic Initialization](#basic-initialization)
- [Setting and Getting Values](#setting-and-getting-values)
- [Reading Value from Events](#reading-value-from-events)

---

## Dependencies

```
@syncfusion/ej2-inputs
  └── @syncfusion/ej2-base
```

Install via npm:

```bash
npm install @syncfusion/ej2-inputs
```

---

## Installation and CSS Setup

Import the required CSS styles for the TextArea. Use the Material theme or any other built-in theme:

```css
/* styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/textarea/index.css";
```

For CDN-based setup in `index.html`:

```html
<link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
<link href="https://cdn.syncfusion.com/ej2/ej2-inputs/styles/material.css" rel="stylesheet" />
```

---

## Basic Initialization

**HTML** — place a `<textarea>` element with an `id`:

```html
<textarea id="default"></textarea>
```

**TypeScript** — import and initialize the TextArea:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea();
textareaObj.appendTo('#default');
```

With placeholder and floating label:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    floatLabelType: 'Auto'
});
textareaObj.appendTo('#default');
```

---

## Setting and Getting Values

### Set value at initialization

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    value: 'Initial comment text'
});
textareaObj.appendTo('#default');
```

You can also set the value directly in the HTML element:

```html
<textarea id="default">Initial comment text</textarea>
```

### Set value programmatically after render

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea();
textareaObj.appendTo('#default');

// Set value after render
textareaObj.value = 'Updated comments';
```

### Get value programmatically

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea();
textareaObj.appendTo('#default');

document.getElementById('getBtn').onclick = function () {
    let currentValue: string = textareaObj.value;
    console.log('Current value:', currentValue);
};
```

---

## Reading Value from Events

### Using the `change` event (fires on focus-out with a changed value)

```typescript
import { TextArea, ChangedEventArgs } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    change: (args: ChangedEventArgs) => {
        console.log('Changed value:', args.value);
    }
});
textareaObj.appendTo('#default');
```

### Using the `input` event (fires on every keystroke)

```typescript
import { TextArea, InputEventArgs } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Type here...',
    input: (args: InputEventArgs) => {
        console.log('Current value:', args.value);
    }
});
textareaObj.appendTo('#default');
```

---

## Gotchas

- The `change` event fires only on focus-out when the value has changed. Use `input` for real-time updates.
- `appendTo` accepts both a CSS selector string (`'#default'`) and an `HTMLElement`.
- The TextArea wraps the native `<textarea>` element — always target a `<textarea>` tag in HTML, not a `<div>` or `<input>`.

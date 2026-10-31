# Multiline – Syncfusion TypeScript TextBox

## Table of Contents
- [Create Multiline TextBox](#create-multiline-textbox)
- [Floating Label on Multiline](#floating-label-on-multiline)
- [Auto Resize](#auto-resize)
- [Disable Resize](#disable-resize)
- [Limit Text Length](#limit-text-length)
- [Character Count](#character-count)

---

## Create Multiline TextBox

Set `multiline: true` to convert the TextBox into a multiline input (renders as a `<textarea>`). This is ideal for address, description, comments, and other long-form text.

> The multiline TextBox allows vertical resizing only by default.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let textareaObject: TextBox = new TextBox({
  placeholder: 'Enter your address',
  value: 'Mr. Dodsworth Dodsworth, System Analyst, Studio 103, The Business Center'
});

textareaObject.appendTo('#default');
```

You can also target a `<textarea>` HTML element directly — the component will use it as the underlying element automatically when it is a textarea.

---

## Floating Label on Multiline

Use `floatLabelType` with multiline just as with single-line inputs. All three modes (`Auto`, `Always`, `Never`) are supported.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

// Auto – floats on focus or value entry
let floatTypeAuto: TextBox = new TextBox({
  placeholder: 'Enter your address',
  floatLabelType: 'Auto'
});
floatTypeAuto.appendTo('#multiline-auto');

// Always – label always floats above
let floatTypeAlways: TextBox = new TextBox({
  placeholder: 'Enter your address',
  floatLabelType: 'Always'
});
floatTypeAlways.appendTo('#multiline-always');

// Never – label stays as placeholder (default)
let floatTypeNever: TextBox = new TextBox({
  placeholder: 'Enter your address',
  floatLabelType: 'Never'
});
floatTypeNever.appendTo('#multiline-never');
```

---

## Auto Resize

Create an auto-resizing textarea by calculating the textarea height in the `created` event (for the initial value) and in the `input` event (for dynamic changes).

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let autoResize: TextBox = new TextBox({
  placeholder: 'Enter your address',
  floatLabelType: 'Auto',
  value: 'Mr. Dodsworth Dodsworth, System Analyst, Studio 103, The Business Center',
  created: (args: any) => {
    autoResize.addAttributes({ rows: '1' });
    autoResize.element.style.height = 'auto';
    autoResize.element.style.height = (autoResize.element.scrollHeight - 7) + 'px';
  },
  input: (args: any) => {
    args.event.currentTarget.style.height = 'auto';
    args.event.currentTarget.style.height = (args.event.currentTarget.scrollHeight) + 'px';
  }
});

autoResize.appendTo('#default');
```

**How it works:**
- `created` sets initial rows to `1` via `addAttributes()` then expands to fit the content.
- `input` recalculates height on every keystroke so the textarea grows or shrinks dynamically.

---

## Disable Resize

By default the multiline TextBox is resizable. Disable resizing with CSS:

```css
textarea.e-input,
.e-float-input textarea,
.e-float-input.e-control-wrapper textarea,
.e-input-group textarea,
.e-input-group.e-control-wrapper textarea {
  resize: none;
}
```

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let disableResize: TextBox = new TextBox({
  placeholder: 'Enter your address',
  floatLabelType: 'Auto'
});

disableResize.appendTo('#default');
```

---

## Limit Text Length

Use the `addAttributes()` method to set a `maxlength` attribute, limiting how many characters can be entered.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

// TextBox with a static maxlength
let maxLength: TextBox = new TextBox({
  placeholder: 'Enter your address',
  floatLabelType: 'Auto'
});
maxLength.appendTo('#default');

// TextBox where maxlength is added dynamically via button
let addAttr: TextBox = new TextBox({
  placeholder: 'Enter your address',
  floatLabelType: 'Auto'
});
addAttr.appendTo('#attr');

let button: Button = new Button({});
button.appendTo('#button');

document.getElementById('button').onclick = (): void => {
  addAttr.addAttributes({ maxlength: '15' });
};
```

---

## Character Count

Show a live character count in the `input` event by reading `args.value`.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let countChar: TextBox = new TextBox({
  placeholder: 'Enter your address',
  floatLabelType: 'Auto',
  input: (args: any) => {
    const word = args.value;
    const addressCount = word.length;
    const counter = document.getElementById('numbercount');
    if (counter) {
      counter.textContent = addressCount + '/25';
    }
  }
});

countChar.appendTo('#default');
```

Add a `<span id="numbercount"></span>` element next to the TextBox in your HTML to display the count.

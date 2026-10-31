# Adornments – Syncfusion TypeScript TextBox

## Table of Contents
- [Overview](#overview)
- [prependTemplate – Content Before Input](#prependtemplate--content-before-input)
- [appendTemplate – Content After Input](#appendtemplate--content-after-input)
- [Password Visibility Toggle](#password-visibility-toggle)
- [Delete / Clear Icon Pattern](#delete--clear-icon-pattern)

---

## Overview

Adornments let you inject custom HTML content **before** or **after** the TextBox input using the `prependTemplate` and `appendTemplate` properties. They do not affect the TextBox value or float label behaviour.

**Common uses:**
- **Visual context** – user icon for name field, envelope icon for email
- **Action buttons** – password show/hide toggle, delete/clear icon
- **Unit indicators** – currency symbols, domain extensions (`.com`)
- **Validation status** – error or success icons

---

## prependTemplate – Content Before Input

Set `prependTemplate` to an HTML string to render elements to the left of the input.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let prependTextbox: TextBox = new TextBox({
  placeholder: 'Enter your Name',
  floatLabelType: 'Auto',
  cssClass: 'e-prepend-textbox',
  prependTemplate: '<span class="e-icons e-user"></span><span class="e-input-separator"></span>'
});
prependTextbox.appendTo('#prepend');
```

---

## appendTemplate – Content After Input

Set `appendTemplate` to add elements to the right of the input.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let appendTextbox: TextBox = new TextBox({
  placeholder: 'Enter the Mail Address',
  floatLabelType: 'Auto',
  appendTemplate: '<span>.com</span>'
});
appendTextbox.appendTo('#append');
```

---

## Password Visibility Toggle

Use `appendTemplate` to inject an eye icon and toggle the TextBox `type` property between `'password'` and `'text'` on click.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let appendTextbox: TextBox = new TextBox({
  placeholder: 'Password',
  floatLabelType: 'Auto',
  cssClass: 'e-eye-icon',
  type: 'password',
  appendTemplate: '<span class="e-input-separator"></span><span id="text-icon" class="e-icons e-eye"></span>',
  created: () => {
    const textIcon = document.querySelector('#text-icon') as HTMLElement;
    if (textIcon) {
      textIcon.addEventListener('click', () => {
        if (appendTextbox.type === 'password') {
          appendTextbox.type = 'text';
          textIcon.className = 'e-icons e-eye-slash';
        } else {
          appendTextbox.type = 'password';
          textIcon.className = 'e-icons e-eye';
        }
        appendTextbox.dataBind();
      });
    }
  }
});
appendTextbox.appendTo('#append');
```

**Key points:**
- Wire up DOM listeners inside the `created` callback — the template elements are rendered by then.
- Call `dataBind()` after changing `type` programmatically to sync the component.

---

## Delete / Clear Icon Pattern

Combine `prependTemplate` and `appendTemplate` with event listeners in `created` to build a full-featured input with action icons.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let iconTextbox: TextBox = new TextBox({
  placeholder: 'Enter the Mail Address',
  floatLabelType: 'Auto',
  cssClass: 'e-icon-textbox',
  prependTemplate: '<span class="e-icons e-people"></span><span class="e-input-separator"></span>',
  appendTemplate: '<span>.com</span><span class="e-input-separator"></span><span id="delete-text" class="e-icons e-trash"></span>',
  created: () => {
    const deleteIcon = document.querySelector('#delete-text') as HTMLElement;
    if (deleteIcon) {
      deleteIcon.addEventListener('click', () => {
        iconTextbox.value = '';
        iconTextbox.dataBind();
      });
    }
  }
});
iconTextbox.appendTo('#iconTextbox');
```

**Notes:**
- Always attach event listeners inside `created` to ensure the injected HTML elements exist in the DOM.
- Set `value = ''` and call `dataBind()` to clear the input programmatically.

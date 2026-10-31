# Adornments — Syncfusion Angular TextArea

Adornments allow you to attach custom content (icons, buttons, labels) before or after the TextArea. Layout direction is controlled separately from the inner arrangement of items.

## Table of Contents
- [Overview](#overview)
- [Prepend and Append Templates](#prepend-and-append-templates)
- [Adornment Flow](#adornment-flow)
- [Adornment Orientation](#adornment-orientation)
- [Common Use Cases](#common-use-cases)

---

## Overview

| Property | Type | Default | Purpose |
|---|---|---|---|
| `prependTemplate` | `string \| object` | `null` | Content rendered **before** the textarea |
| `appendTemplate` | `string \| object` | `null` | Content rendered **after** the textarea |
| `adornmentFlow` | `AdornmentsDirection` | `'Horizontal'` | Where adornments appear around the textarea |
| `adornmentOrientation` | `AdornmentsDirection` | `'Horizontal'` | How items inside each adornment are arranged |

`AdornmentsDirection` accepts only: `'Horizontal'` or `'Vertical'`

---

## Prepend and Append Templates

Use inline HTML strings as templates to add content before or after the textarea:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea
      id="adorned"
      placeholder="Enter your message"
      [rows]="4"
      [prependTemplate]="prependContent"
      [appendTemplate]="appendContent">
    </ejs-textarea>
  `
})
export class App {
  prependTemplate: string = '<span class="e-icons e-edit"></span>';
  appendTemplate: string = '<button class="e-btn e-primary">Submit</button>';
}
```

---

## Adornment Flow

`adornmentFlow` controls **where** adornments are placed relative to the textarea:

- **`'Horizontal'`** (default): Prepend on the **left**, append on the **right**
- **`'Vertical'`**: Prepend **above**, append **below**

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <!-- Toolbar above, actions below -->
    <ejs-textarea
      id="vertical-flow"
      placeholder="Write something..."
      [rows]="5"
      adornmentFlow="Vertical"
      [prependTemplate]="toolbar"
      [appendTemplate]="actions">
    </ejs-textarea>
  `
})
export class App {
  toolbar: string = `
    <div>
      <button class="e-btn e-small">Bold</button>
      <button class="e-btn e-small">Italic</button>
    </div>`;
  actions: string = `
    <div>
      <button class="e-btn e-primary">Save</button>
      <button class="e-btn">Cancel</button>
    </div>`;
}
```

---

## Adornment Orientation

`adornmentOrientation` controls how **items inside** each adornment are arranged:

- **`'Horizontal'`** (default): Items displayed in a **row**
- **`'Vertical'`**: Items displayed in a **column**

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <!-- Append items stacked vertically on the right -->
    <ejs-textarea
      id="oriented"
      placeholder="Enter content"
      [rows]="5"
      adornmentFlow="Horizontal"
      adornmentOrientation="Vertical"
      [appendTemplate]="sideActions">
    </ejs-textarea>
  `
})
export class App {
  sideActions: string = `
    <div>
      <button class="e-btn e-small e-icon-btn"><span class="e-icons e-save"></span></button>
      <button class="e-btn e-small e-icon-btn"><span class="e-icons e-delete"></span></button>
    </div>`;
}
```

---

## Common Use Cases

### Visual Indicator (Edit Icon)

```typescript
prependTemplate: string = '<span class="e-icons e-edit" style="padding: 8px;"></span>';
```

```html
<ejs-textarea
  id="with-icon"
  placeholder="Edit notes"
  [prependTemplate]="prependTemplate"
  [rows]="3">
</ejs-textarea>
```

### Formatting Toolbar Above + Submit Below

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea
      id="editor"
      placeholder="Compose your message..."
      [rows]="6"
      adornmentFlow="Vertical"
      adornmentOrientation="Horizontal"
      [prependTemplate]="formatBar"
      [appendTemplate]="submitBar">
    </ejs-textarea>
  `
})
export class App {
  formatBar: string = `
    <div style="display:flex;gap:4px;padding:4px;">
      <button class="e-btn e-small">B</button>
      <button class="e-btn e-small">I</button>
      <button class="e-btn e-small">U</button>
    </div>`;
  submitBar: string = `
    <div style="display:flex;justify-content:flex-end;padding:4px;">
      <button class="e-btn e-primary">Send</button>
    </div>`;
}
```

### Character Count Display (Append)

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextAreaModule, InputEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule, FormsModule],
  selector: 'app-root',
  template: `
    <ejs-textarea
      id="counted"
      placeholder="Max 300 characters"
      [maxLength]="300"
      [rows]="4"
      adornmentFlow="Vertical"
      [appendTemplate]="counter"
      (input)="onInput($event)">
    </ejs-textarea>
  `
})
export class App {
  charCount: number = 0;
  get counter(): string {
    return `<span style="font-size:12px;color:#666;">${this.charCount}/300</span>`;
  }
  onInput(args: InputEventArgs) {
    this.charCount = (args.value as string)?.length ?? 0;
  }
}
```

# Getting Started — Syncfusion Angular TextArea

## Table of Contents
- [Dependencies](#dependencies)
- [Installation](#installation)
- [CSS Reference](#css-reference)
- [Basic Implementation](#basic-implementation)
- [Getting and Setting Values](#getting-and-setting-values)

---

## Dependencies

The TextArea component requires the following package:

```
|-- @syncfusion/ej2-angular-inputs
    |-- @syncfusion/ej2-angular-base
    |-- @syncfusion/ej2-inputs
        |-- @syncfusion/ej2-base
```

---

## Installation

Use the Angular CLI `ng add` command to install and auto-configure the package:

```bash
ng add @syncfusion/ej2-angular-inputs
```

This automatically:
- Adds `@syncfusion/ej2-angular-inputs` and peer dependencies to `package.json`
- Registers the default Syncfusion Material theme in `angular.json`

For legacy ngcc (Angular ≤15):
```bash
npm add @syncfusion/ej2-angular-inputs@32.1.19-ngcc
```

---

## CSS Reference

Import theme styles in `styles.css`. Ensure the order matches the dependency chain:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/textarea/index.css";
```

Other available themes: `material.css`, `bootstrap5.css`, `tailwind3.css`, `fluent2.css`, `fabric.css`.

---

## Basic Implementation

### Standalone Component (Angular 19+)

```typescript
// src/app/app.ts
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `<ejs-textarea id="default"></ejs-textarea>`
})
export class App {}
```

### With Placeholder and Rows

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea
      id="comments"
      placeholder="Enter your comments here"
      [rows]="5">
    </ejs-textarea>
  `
})
export class App {}
```

---

## Getting and Setting Values

### Set Initial Value via `value` Property

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `<ejs-textarea id="default" value="Initial content"></ejs-textarea>`
})
export class App {}
```

### Two-Way Binding with `ngModel`

Use `[(ngModel)]` for reactive value synchronization:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule, FormsModule],
  selector: 'app-root',
  template: `
    <ejs-textarea id="default" [(ngModel)]="comment"></ejs-textarea>
    <p>Current value: {{ comment }}</p>
  `
})
export class App {
  comment: string = 'Initial comment';
}
```

### Retrieve Value Programmatically

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule, FormsModule],
  selector: 'app-root',
  template: `
    <ejs-textarea id="default" [(ngModel)]="value"></ejs-textarea>
    <button (click)="getValue()">Get Value</button>
  `
})
export class App {
  value: string = '';

  getValue() {
    console.log('Current value:', this.value);
  }
}
```

### Retrieve Value from `change` Event

The `change` event fires when the value changes and the textarea loses focus:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule, ChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `<ejs-textarea id="default" (change)="onChange($event)"></ejs-textarea>`
})
export class App {
  onChange(args: ChangedEventArgs) {
    console.log('New value:', args.value);
  }
}
```

> **Note:** In Angular 19 and below, use `app.component.ts`. In Angular 20+, the CLI generates `app.ts` (no `.component.` suffix).

# Getting Started — Syncfusion Angular CheckBox

## Table of Contents
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Adding CSS](#adding-css)
- [Basic CheckBox Setup](#basic-checkbox-setup)
- [CheckBox States](#checkbox-states)

---

## Prerequisites

Ensure your environment meets the [System Requirements for Syncfusion Angular UI Components](https://ej2.syncfusion.com/angular/documentation/system-requirement).

This guide supports **Angular 19+** using the **standalone component** architecture (default since Angular 19). For Angular 18 and below using NgModules, import `CheckBoxModule` into your `AppModule` instead.

---

## Dependencies

The CheckBox component relies on the following packages:

```
@syncfusion/ej2-angular-buttons
  └── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-buttons
        └── @syncfusion/ej2-base
```

---

## Installation

Use the Angular CLI schematic for automatic setup (recommended):

```bash
ng add @syncfusion/ej2-angular-buttons
```

This command:
- Adds `@syncfusion/ej2-angular-buttons` and peer dependencies to `package.json`
- Registers the default Syncfusion Material theme in `angular.json`

To install manually:

```bash
npm install @syncfusion/ej2-angular-buttons --save
```

---

## Adding CSS

Import theme styles in your global `styles.css`. The Material theme is added automatically by `ng add`:

```css
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
```

> Import order matters — `ej2-base` must come before `ej2-buttons`.

Other available themes: `fabric.css`, `bootstrap5.css`, `fluent.css`, `tailwind.css`.

---

## Basic CheckBox Setup

In a standalone Angular component, import `CheckBoxModule` in the `imports` array:

```typescript
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-checkbox label="Default"></ejs-checkbox>
    </div>`
})
export class AppComponent { }
```

Bootstrap the app in `main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

Run the application:

```bash
ng serve
```

---

## CheckBox States

The CheckBox supports three visual states: **checked**, **unchecked**, and **indeterminate**.

### Checked and Unchecked

Use the `checked` property to set the initial state:

```typescript
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ul>
        <li><ejs-checkbox label="Checked State" [checked]="true"></ejs-checkbox></li>
        <li><ejs-checkbox label="Unchecked State"></ejs-checkbox></li>
      </ul>
    </div>`
})
export class AppComponent { }
```

### Indeterminate State

The indeterminate state visually masks the actual value (shows a dash instead of a tick). It can only be set **programmatically** — not through user interaction:

```typescript
@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ul>
      <li><ejs-checkbox label="Checked" [checked]="true"></ejs-checkbox></li>
      <li><ejs-checkbox label="Unchecked"></ejs-checkbox></li>
      <li><ejs-checkbox label="Indeterminate" [indeterminate]="true"></ejs-checkbox></li>
    </ul>`
})
export class AppComponent { }
```

> **Tip:** Use `indeterminate` for a "Select All" parent checkbox when only some child checkboxes are selected.

### Disabled State

Use the `disabled` property to prevent user interaction. Disabled checkboxes are **not submitted** in form data:

```typescript
@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-checkbox label="Disabled" [disabled]="true"></ejs-checkbox>`
})
export class AppComponent { }
```

# Getting Started — Syncfusion Angular DropDownButton

## Table of Contents
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Create Angular Application](#create-angular-application)
- [Install Syncfusion Package](#install-syncfusion-package)
- [Add CSS Reference](#add-css-reference)
- [Add DropDownButton Component](#add-dropdownbutton-component)
- [Run the Application](#run-the-application)

---

## Prerequisites

Ensure your environment meets [Syncfusion Angular system requirements](https://ej2.syncfusion.com/angular/documentation/system-requirement). This guide targets **Angular 21** with the standalone component architecture (default since Angular 19).

---

## Dependencies

The `DropDownButton` component requires these packages:

```
@syncfusion/ej2-angular-splitbuttons
  └── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-splitbuttons
        └── @syncfusion/ej2-base
        └── @syncfusion/ej2-popups
        └── @syncfusion/ej2-buttons
```

---

## Create Angular Application

Install the Angular CLI and create a new project:

```bash
npm install -g @angular/cli
ng new syncfusion-angular-app
cd syncfusion-angular-app
```

During setup, choose your stylesheet format (CSS or SCSS) and SSR preferences.

---

## Install Syncfusion Package

Use `ng add` to install and auto-configure the DropDownButton package:

```bash
ng add @syncfusion/ej2-angular-splitbuttons
```

This command:
- Adds `@syncfusion/ej2-angular-splitbuttons` and peer dependencies to `package.json`
- Imports the DropDownButton component into your app
- Registers the default Syncfusion Material theme in `angular.json`

For Angular 12+ (Ivy-compatible packages):
```bash
ng add @syncfusion/ej2-angular-splitbuttons
```

For legacy Angular ≤15 (ngcc package):
```bash
npm add @syncfusion/ej2-angular-splitbuttons@32.1.19-ngcc
```

---

## Add CSS Reference

The Material theme is added automatically via `ng add`. To manually add component-specific styles in `styles.css`:

```css
@import "@syncfusion/ej2-material3-theme/styles/drop-down-button/index.css";
```

> Import order matters — follow the dependency sequence above.

---

## Add DropDownButton Component

In `src/app/app.ts` (Angular 20+) or `src/app/app.component.ts` (Angular ≤19):

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button ejs-dropdownbutton [items]="items" content="Clipboard"></button>
    </div>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

Key points:
- The directive is `ejs-dropdownbutton` applied to a `<button>` element
- `[items]` binds the `ItemModel[]` array defining popup actions
- `content` sets the button label text
- Import `DropDownButtonModule` in the `imports` array (standalone architecture)

---

## Run the Application

```bash
ng serve
```

Open `http://localhost:4200` in your browser. The DropDownButton appears with the three popup actions.

---

## Minimal Working Example

```typescript
import { Component } from '@angular/core';
import { DropDownButtonModule, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [DropDownButtonModule],
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <button ejs-dropdownbutton [items]="items" content="Clipboard"></button>
    </div>
  `
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

Bootstrap entry (`main.ts`):
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

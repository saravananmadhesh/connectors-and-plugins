# Getting Started — Syncfusion Angular MultiSelect Dropdown

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Basic Setup](#basic-setup)
- [Popup Configuration](#popup-configuration)
- [Angular Version Notes](#angular-version-notes)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Ensure the environment meets the [Syncfusion Angular system requirements](https://ej2.syncfusion.com/angular/documentation/system-requirement). The MultiSelect package requires:

```
@syncfusion/ej2-angular-dropdowns
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-data
  ├── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-dropdowns
      ├── @syncfusion/ej2-inputs
      ├── @syncfusion/ej2-lists
      ├── @syncfusion/ej2-popups
      │   └── @syncfusion/ej2-buttons
      └── @syncfusion/ej2-notifications
```

---

## Installation

The recommended way to add Syncfusion to an Angular project is `ng add`, which installs the package, sets up the module, and registers the default Material theme in `angular.json` automatically:

```bash
ng add @syncfusion/ej2-angular-dropdowns
```

For manual install (no automatic setup):

```bash
npm install @syncfusion/ej2-angular-dropdowns
```

**For Angular 15 and below (ngcc packages):**
```bash
npm install @syncfusion/ej2-angular-dropdowns@32.1.19-ngcc
```
> ngcc support was fully removed in Angular 16. Use Ivy packages for Angular 16+.

---

## CSS Imports

Import Syncfusion styles in order of dependency. Add to your global `styles.css` (or `styles.scss`):

```css
/* styles.css */
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/multi-select/index.css";
```

**Available themes:** `material3`, `material`, `bootstrap5`, `tailwind`, `fluent2`, `fabric`

Replace `material3` with the theme that matches your application.

**SCSS import alternative:**
```scss
/* styles.scss */
@import 'node_modules/@syncfusion/ej2-base/styles/material3.scss';
@import 'node_modules/@syncfusion/ej2-dropdowns/styles/material3.scss';
@import 'node_modules/@syncfusion/ej2-angular-dropdowns/styles/material3.scss';
```

> The import order matters — base styles must come before component-specific styles.

---

## Basic Setup

### Standalone Component (Angular 19+, recommended)

Import `MultiSelectModule` directly in the component's `imports` array. No NgModule required.

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  selector: 'app-root',
  template: `
    <ejs-multiselect
      id="sports"
      [dataSource]="sports"
      placeholder="Select sports"
      [(value)]="selected">
    </ejs-multiselect>
  `
})
export class AppComponent implements OnInit {
  public sports: string[] = [];
  public selected: string[] = [];

  ngOnInit(): void {
    this.sports = ['Cricket', 'Football', 'Hockey', 'Tennis', 'Basketball'];
    this.selected = ['Cricket', 'Hockey']; // pre-selected values
  }
}
```

### NgModule-based Component (Angular 18 and below)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  imports: [MultiSelectModule],
  // ...
})
export class AppModule {}
```

---

## Popup Configuration

Control the popup's dimensions using `popupHeight` and `popupWidth`:

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="items"
      popupHeight="300px"
      popupWidth="400px"
      placeholder="Select items">
    </ejs-multiselect>
  `
})
export class AppComponent {
  public items: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
}
```

- `popupHeight` — constrains the popup list height; adds a scrollbar when items overflow
- `popupWidth` — defaults to match the input element width; set explicitly to override
- Both accept CSS units: `px`, `%`, `em`, `rem`

---

## Angular Version Notes

| Angular Version | Architecture | File Convention |
|---|---|---|
| Angular 20+ | Standalone default | `app.ts`, `app.html`, `app.css` |
| Angular 19 | Standalone default | `app.component.ts`, etc. |
| Angular 12–18 | NgModule default | `app.module.ts` required |

> All examples in this skill use standalone architecture (Angular 19+). For NgModule-based apps, move imports from the component's `imports` array to `AppModule`.

---

## Troubleshooting

**No styles applied / component unstyled:**
- Verify CSS import order (base → buttons → inputs → lists → popups → dropdowns → angular-dropdowns)
- Check that `angular.json` styles array includes the theme, OR that `styles.css` has the imports
- Confirm the theme name matches (e.g., `material3` not `material-3`)

**`ejs-multiselect` is not a known element:**
- Ensure `MultiSelectModule` is in the component's `imports` array (standalone) or `AppModule` imports
- Run `ng add @syncfusion/ej2-angular-dropdowns` to auto-configure if starting fresh

**Peer dependency warnings during install:**
- Use `ng add` instead of `npm install` to resolve peer dependencies automatically
- For Angular 16+, ensure you are NOT using ngcc-tagged packages

# Getting Started — Syncfusion Angular Switch

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [CSS / Theme Imports](#css--theme-imports)
- [Standalone Component Setup (Angular 19+)](#standalone-component-setup-angular-19)
- [NgModule Setup](#ngmodule-setup)
- [Basic Switch](#basic-switch)
- [Setting ON / OFF Labels](#setting-on--off-labels)
- [Running the Application](#running-the-application)

---

## Prerequisites

- Angular 12+ (Angular 19+ recommended — standalone by default)
- Node.js 16+

See [System Requirements](https://ej2.syncfusion.com/angular/documentation/system-requirement).

---

## Installation

Use the Angular CLI schematic for automatic setup:

```bash
ng add @syncfusion/ej2-angular-buttons
```

This command:
- Adds `@syncfusion/ej2-angular-buttons` and peer dependencies to `package.json`
- Imports the Switch module in your application
- Registers the default Syncfusion Material theme in `angular.json`

**Manual install (if preferred):**
```bash
npm install @syncfusion/ej2-angular-buttons
```

**Dependencies:**
```
@syncfusion/ej2-angular-buttons
  └── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-buttons
        └── @syncfusion/ej2-base
```

---

## CSS / Theme Imports

Add theme styles to `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/switch/index.css";
```

**Available themes:** `material`, `bootstrap5`, `tailwind`, `fluent`, `highcontrast`

Replace `material` with your preferred theme name. Import order must match the dependency sequence (`ej2-base` before `ej2-buttons`).

For SCSS, use:
```scss
@import '../node_modules/@syncfusion/ej2-base/styles/material.scss';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material.scss';
```

---

## Standalone Component Setup (Angular 19+)

Angular 19+ uses standalone components by default.

```typescript
// src/app/app.ts
import { Component } from '@angular/core';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [SwitchModule],
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-switch [checked]="true"></ejs-switch>
    </div>
  `
})
export class AppComponent {}
```

```typescript
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

---

## NgModule Setup

For projects using Angular Modules:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SwitchModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ejs-switch [checked]="true"></ejs-switch>`
})
export class AppComponent {}
```

---

## Basic Switch

Render a Switch in the checked state:

```html
<!-- Checked by default -->
<ejs-switch [checked]="true"></ejs-switch>

<!-- Unchecked by default -->
<ejs-switch [checked]="false"></ejs-switch>

<!-- Dynamic binding -->
<ejs-switch [checked]="isEnabled"></ejs-switch>
```

```typescript
export class AppComponent {
  isEnabled = true;
}
```

---

## Setting ON / OFF Labels

Use `onLabel` and `offLabel` to display text inside the Switch:

```html
<ejs-switch [checked]="true" onLabel="ON" offLabel="OFF"></ejs-switch>
```

> **Note:** Switch does **not** display text labels in Material themes. Labels are visible in Bootstrap, Tailwind, and other non-Material themes. Avoid long custom text as it will be clipped.

---

## Running the Application

```bash
ng serve
```

Navigate to `http://localhost:4200`. The Switch component renders immediately once CSS is loaded correctly.

**Troubleshooting:**
- If the Switch has no styling, confirm the CSS imports are in `styles.css` (global) not a component stylesheet.
- Ensure `@syncfusion/ej2-base` styles are imported **before** `@syncfusion/ej2-buttons` styles.

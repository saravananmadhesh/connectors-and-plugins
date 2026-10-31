# Getting Started — Syncfusion Angular Button

## Table of Contents
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Set Up the Angular Application](#set-up-the-angular-application)
- [Install Syncfusion Angular Buttons Package](#install-syncfusion-angular-buttons-package)
- [Import CSS Styles](#import-css-styles)
- [Add the Button Component](#add-the-button-component)
- [Run the Application](#run-the-application)
- [Change Button Type](#change-button-type)

---

## Prerequisites

Ensure your environment meets the Syncfusion Angular system requirements:
- **Angular 12+** (Angular 21 recommended, standalone architecture is default from Angular 19+)
- **Node.js** (LTS version recommended)
- **Angular CLI** installed globally

---

## Dependencies

The `ejs-button` directive requires the following packages:

```
@syncfusion/ej2-angular-buttons
  └── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-buttons
        └── @syncfusion/ej2-base
```

---

## Set Up the Angular Application

Install Angular CLI globally:

```bash
npm install -g @angular/cli
```

Create a new Angular application:

```bash
ng new syncfusion-angular-app
```

During setup, select your preferred stylesheet format (CSS or SCSS). Navigate into the project:

```bash
cd syncfusion-angular-app
```

> **Angular version note:** In Angular 20+, the CLI generates `src/app/app.ts`, `app.html`, and `app.css` (no `.component.` suffix). In Angular 19 and below, the files are `app.component.ts`, `app.component.html`, and `app.component.css`.

---

## Install Syncfusion Angular Buttons Package

Use the `ng add` command — it installs the package, imports it, and registers the default Material theme automatically:

```bash
ng add @syncfusion/ej2-angular-buttons
```

This command:
- Adds `@syncfusion/ej2-angular-buttons` and peer dependencies to `package.json`
- Imports `ButtonModule` in your application
- Registers the default Syncfusion Material theme in `angular.json`

For applications using legacy Angular compatibility compiler (ngcc) with Angular 15 and below:

```bash
npm add @syncfusion/ej2-angular-buttons@32.1.19-ngcc
```

> Starting from Angular 16, ngcc support has been removed. Use Ivy-compatible packages.

---

## Import CSS Styles

The Material theme is added automatically by `ng add`. To style only the Button component explicitly:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/button/index.css";
```

---

## Add the Button Component

Use `ejs-button` as an attribute directive on a `<button>` element. Import `ButtonModule` in your standalone component:

```typescript
// src/app/app.ts (Angular 20+) or src/app/app.component.ts (Angular 19 and below)
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <!-- Render a default Button -->
      <button ejs-button>Button</button>
    </div>
  `
})
export class AppComponent { }
```

Bootstrap your standalone component in `main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

---

## Run the Application

```bash
ng serve
```

Open `http://localhost:4200` in a browser to see the button rendered.

---

## Change Button Type

Use the `cssClass` property to apply predefined styles. Use the `content` property to set the button label in the template:

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <!-- Flat button with content set via property binding -->
      <button ejs-button cssClass="e-flat" content="Flat Button"></button>

      <!-- Or pass text directly inside the element -->
      <button ejs-button cssClass="e-primary">Primary</button>
    </div>
  `
})
export class AppComponent { }
```

> **Gotcha:** When using the `ejs-button` directive, button text can be provided as inner text OR via the `content` property. When both are present, the `content` property takes precedence.

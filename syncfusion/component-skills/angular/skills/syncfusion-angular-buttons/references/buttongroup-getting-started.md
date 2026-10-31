# Getting Started — Syncfusion Angular ButtonGroup

## Table of Contents
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Angular Standalone Setup](#angular-standalone-setup)
- [CSS Theme Imports](#css-theme-imports)
- [Basic ButtonGroup](#basic-buttongroup)
- [Vertical Orientation](#vertical-orientation)
- [Running the Application](#running-the-application)

---

## Dependencies

The ButtonGroup relies on the following packages:

```
@syncfusion/ej2-angular-buttons
  └── @syncfusion/ej2-angular-base
@syncfusion/ej2-angular-splitbuttons  (required for nesting DropDownButton/SplitButton)
  └── @syncfusion/ej2-splitbuttons
      ├── @syncfusion/ej2-base
      ├── @syncfusion/ej2-popups
      └── @syncfusion/ej2-buttons
```

---

## Installation

Use the Angular CLI `ng add` command — it installs the package, registers the theme in `angular.json`, and imports the module automatically:

```bash
ng add @syncfusion/ej2-angular-buttons
```

> Supports Angular 21 (standalone by default) and recent Angular versions. For Angular 12–18 (ngcc/legacy), use: `npm add @syncfusion/ej2-angular-buttons@32.1.19-ngcc`

---

## Angular Standalone Setup

In Angular 21, components are standalone by default. Import `ButtonModule` directly in your component's `imports` array — no NgModule needed:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class='e-btn-group'>
      <button ejs-button>HTML</button>
      <button ejs-button>CSS</button>
      <button ejs-button>JavaScript</button>
    </div>`
})
export class AppComponent { }
```

**`src/main.ts`** — bootstrap the standalone app:
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

> In Angular 19 and below, files are named `app.component.ts` / `app.component.html`. In Angular 20+, the CLI generates `app.ts` / `app.html` (no `.component.` suffix).

---

## CSS Theme Imports

Add the following imports to `src/styles.css`. The order matters — it follows the component dependency chain:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/button-group/index.css";
```

> The Material theme is added automatically when using `ng add`. You can also use CDN, CRG, SCSS, or Theme Studio.

---

## Basic ButtonGroup

The ButtonGroup is a **CSS component** — wrap `ejs-button` elements in a `div` with the `.e-btn-group` class:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group'>
        <button ejs-button>HTML</button>
        <button ejs-button>CSS</button>
        <button ejs-button>JavaScript</button>
      </div>
    </div>`
})
export class AppComponent { }
```

**Result:** Three buttons rendered side by side as a single grouped unit with shared borders.

---

## Vertical Orientation

By default the ButtonGroup is horizontal. Add the `e-vertical` CSS class to the container to stack buttons top-to-bottom:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group e-vertical'>
        <button ejs-button>HTML</button>
        <button ejs-button>CSS</button>
        <button ejs-button>JavaScript</button>
      </div>
    </div>`
})
export class AppComponent { }
```

> `e-vertical` does **not** support nesting the SplitButton component inside the group.

---

## Running the Application

```bash
ng serve
```

The app runs at `http://localhost:4200` by default.

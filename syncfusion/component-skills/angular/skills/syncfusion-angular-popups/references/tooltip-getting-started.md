# Getting Started with Syncfusion Angular Tooltip

## Table of Contents
- [Prerequisites & Dependencies](#prerequisites--dependencies)
- [Installation](#installation)
- [CSS Theme Imports](#css-theme-imports)
- [Basic Single Tooltip](#basic-single-tooltip)
- [Multi-Target Tooltip](#multi-target-tooltip)
- [Module-Based Setup (Angular ≤18)](#module-based-setup-angular-18)

---

## Prerequisites & Dependencies

Ensure your project meets [Syncfusion Angular system requirements](https://ej2.syncfusion.com/angular/documentation/system-requirement).

**Package dependency tree:**
```
@syncfusion/ej2-angular-popups
  ├── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-popups
        ├── @syncfusion/ej2-base
        └── @syncfusion/ej2-buttons
```

---

## Installation

Use the Angular CLI schematic for automatic setup (imports, themes, peer dependencies):

```bash
ng add @syncfusion/ej2-angular-popups
```

This command:
1. Adds `@syncfusion/ej2-angular-popups` and peer packages to `package.json`
2. Imports `TooltipModule` in your app
3. Registers the default Material theme in `angular.json`

**Manual install (if needed):**
```bash
npm install @syncfusion/ej2-angular-popups
```

---

## CSS Theme Imports

After installation, add theme styles to `src/styles.css`. Import in dependency order:

```css
/* Material 3 theme (recommended) */
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/tooltip/index.css";
```

Other available themes: `material.css`, `fabric.css`, `bootstrap5.css`, `bootstrap5.3.css`, `fluent.css`, `fluent2.css`, `tailwind.css`, `tailwind3.css`, `highcontrast.css`.

For SCSS:
```scss
@import "node_modules/@syncfusion/ej2-base/styles/material3.scss";
@import "node_modules/@syncfusion/ej2-angular-buttons/styles/material3.scss";
@import "node_modules/@syncfusion/ej2-angular-popups/styles/material3.scss";
```

---

## Basic Single Tooltip

### Angular 19+ (Standalone — Default)

```typescript
// src/app/app.ts
import { Component, ViewEncapsulation } from '@angular/core';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip id="tooltip" content="Tooltip content">
      Hover Me
    </ejs-tooltip>
  `
})
export class App {}
```

```typescript
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import 'zone.js';
bootstrapApplication(App).catch(err => console.error(err));
```

> **Note:** Use `ViewEncapsulation.None` so Syncfusion's global CSS classes are not scoped to the component shadow DOM.

### Tooltip Content from `title` Attribute

If no `content` property is set, the tooltip displays the target element's `title` attribute:

```html
<ejs-tooltip>
  <button title="Save your file">Save</button>
</ejs-tooltip>
```

---

## Multi-Target Tooltip

A single `ejs-tooltip` instance can show tooltips for many child elements using the `target` property. The tooltip content comes from each matched element's `title` attribute.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip id="details" target=".e-info" position="RightCenter">
      <div id="container">
        <label>Name: <input class="e-info" type="text" title="Your full name" /></label><br/>
        <label>Email: <input class="e-info" type="email" title="Valid email address" /></label><br/>
        <label>Phone: <input type="text" title="Not targeted" /></label>
      </div>
    </ejs-tooltip>
  `
})
export class App {}
```

> The `target` property accepts a CSS selector. Only elements matching the selector inside the tooltip's host receive tooltips. The outer element ID (`details`) is the container; `.e-info` is the target selector.

---

## Module-Based Setup (Angular ≤18)

For non-standalone (NgModule) apps:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TooltipModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip content="Hello from Tooltip">
      <button>Hover me</button>
    </ejs-tooltip>
  `
})
export class AppComponent {}
```

---

## See Also

- [Content](./content.md) — HTML, template, AJAX content
- [Position & Dimensions](./position-and-dimension.md) — 12 positions, offsets, dimensions
- [Open Modes](./open-mode.md) — Hover, Click, Focus, Custom, Sticky

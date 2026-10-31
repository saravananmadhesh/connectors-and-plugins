# Getting Started with Syncfusion Angular Speed Dial

## Table of Contents
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Adding CSS](#adding-css)
- [Rendering the Component](#rendering-the-component)
- [Standalone vs NgModule](#standalone-vs-ngmodule)

---

## Prerequisites

Ensure your Angular environment meets the [Syncfusion Angular system requirements](https://ej2.syncfusion.com/angular/documentation/system-requirement). This guide targets **Angular 19+** using the standalone component architecture (the default since Angular 19).

---

## Dependencies

The Speed Dial component is part of the `@syncfusion/ej2-angular-buttons` package:

```
@syncfusion/ej2-angular-buttons
  ├── @syncfusion/ej2-angular-base
  ├── @syncfusion/ej2-base
  └── @syncfusion/ej2-buttons
```

---

## Installation

Use Angular CLI's `ng add` for automatic setup (adds package, registers theme in `angular.json`):

```bash
ng add @syncfusion/ej2-angular-buttons
```

Or install manually:

```bash
npm install @syncfusion/ej2-angular-buttons
```

---

## Adding CSS

Import the required theme styles in `styles.css` (or `styles.scss`):

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/speeddial/index.css";
```

> Import order matters — `ej2-base` must come before `ej2-buttons`.

---

## Rendering the Component

### Standalone Architecture (Angular 19+)

Import `SpeedDialModule` directly in your component's `imports` array:

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      content="Edit"
      target="#targetElement"
      [items]="items">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { text: 'Cut' },
    { text: 'Copy' },
    { text: 'Paste' }
  ];
}
```

Bootstrap in `main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

---

## Standalone vs NgModule

| Feature | Standalone (Angular 19+) | NgModule |
|---|---|---|
| Import location | `@Component({ imports: [SpeedDialModule] })` | `AppModule.imports` |
| `standalone: true` | Required | Not used |
| Default since | Angular 19 | Pre-Angular 19 |

### NgModule approach (Angular 18 and below)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SpeedDialModule } from '@syncfusion/ej2-angular-buttons';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SpeedDialModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## Key Points

- The `target` attribute should point to a container element with `position: relative`
- Without `target`, Speed Dial positions itself relative to the browser viewport
- `items` is an array of `SpeedDialItemModel` objects
- The `ejs-speeddial` directive is applied to a `<button>` element

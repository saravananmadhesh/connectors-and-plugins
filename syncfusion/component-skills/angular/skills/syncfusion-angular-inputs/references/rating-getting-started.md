# Getting Started with Syncfusion Angular Rating

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [CSS Reference](#css-reference)
- [Basic Usage](#basic-usage)
- [Setting Initial Value](#setting-initial-value)
- [Running the Application](#running-the-application)

---

## Prerequisites

Create an Angular application using the Angular CLI:

```bash
ng new my-app
cd my-app
```

---

## Installation

Install the Syncfusion inputs package that includes the Rating component:

```bash
npm install @syncfusion/ej2-angular-inputs --save
```

> The `--save` flag adds the package to the `dependencies` section of `package.json`.

---

## CSS Reference

Add the required CSS imports to `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/rating/index.css";
```

> Three CSS files are needed: `ej2-base` for core styles, `ej2-angular-inputs` for rating styles, and `ej2-popups` for tooltip styles.

---

## Basic Usage

Import `RatingModule` in your module or component:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RatingModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

Add the `ejs-rating` component to your template `src/app.component.html`:

```html
<input ejs-rating id="rating"/>
```

This renders a 5-star rating with no initial selection and a tooltip on hover.

---

## Setting Initial Value

Use the `value` property to set a pre-selected rating:

```html
<!-- src/app.component.html -->
<div class="wrap">
  <input ejs-rating id="rating" [value]="3"/>
</div>
```

- `value` is a decimal ranging from `min` (default `0`) to `itemsCount` (default `5`).
- Example: `[value]="3.5"` with `[precision]="PrecisionType.Half"` shows a half-star at position 4.

---

## Running the Application

```bash
ng serve
```

The application opens in your browser at `http://localhost:4200`. The rating component is interactive by default — click a star to select a rating, hover to see tooltips.

---

## Gotchas

- Always import `RatingModule` in your NgModule or component (for standalone components).
- Ensure the CSS imports are included in `src/styles.css`.
- The `id` attribute is recommended for the rating component to function correctly.
- `@syncfusion/ej2-popups` CSS is required even if tooltips are disabled, to avoid layout issues.

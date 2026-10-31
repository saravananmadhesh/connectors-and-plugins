# Getting Started — Syncfusion Angular ColorPicker

## Table of Contents
- [Prerequisites](#prerequisites)
- [Create an Angular Application](#create-an-angular-application)
- [Install the Package](#install-the-package)
- [Add CSS References](#add-css-references)
- [Add the ColorPicker Component](#add-the-colorpicker-component)
- [Run the Application](#run-the-application)

---

## Prerequisites

- Node.js (LTS recommended)
- An Angular project using Vite or Angular CLI

---

## Create an Angular Application

**Using Vite (recommended):**

```bash
# TypeScript
npm create vite@latest my-app -- --template angular
cd my-app
npm run dev
```

**Using Angular CLI:**

```bash
npm install -g @angular/cli
ng new my-app --routing=false --style=css
cd my-app
ng serve
```

---

## Install the Package

All Syncfusion EJ2 packages are published on npmjs.com under the `@syncfusion` org.

```bash
npm install @syncfusion/ej2-angular-inputs --save
```

The `--save` flag ensures the package is added to `dependencies` in `package.json`.

---

## Add CSS References

Add the following imports in `src/styles.css`. These cover the ColorPicker and all its dependencies (buttons, popups, split buttons):

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/color-picker/index.css";
```

Then import `styles.css` in `angular.json` or ensure it is referenced in the Vite project.

> The order of CSS imports matters — base styles must come before component styles.

---

## Add the ColorPicker Component

Use `ColorPickerModule` from `@syncfusion/ej2-angular-inputs` and render the component in your app template.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  standalone: true,
  imports: [BrowserModule, ColorPickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```ts
import { Component } from '@angular/core';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div id="container">
      <div class="wrap">
        <h4>Choose Color</h4>
        <ejs-input ejs-colorpicker type="color" id="colorpicker"></ejs-input>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {}
```

This renders a SplitButton. Clicking it opens the ColorPicker popup with the Picker (HSV) panel and Apply/Cancel buttons.

---

## Run the Application

```bash
npm run dev   # Vite
# or
ng serve      # Angular CLI
```

Open the URL shown in the terminal (e.g., `http://localhost:4200` or `http://localhost:5173`).

---

## What Renders by Default

- A **SplitButton** showing the currently selected color
- Clicking opens a popup with the **Picker** (HSV gradient + hue/opacity sliders)
- Default color: `#008000ff` (green, fully opaque)
- **Apply** button confirms the selection; **Cancel** discards it
- A **mode switcher** button toggles between Picker and Palette views

To change any of this behavior, see `references/modes-and-value.md` (modes/inline), `references/ui-customization.md` (hiding buttons), or `references/palette-features.md` (palette customization).

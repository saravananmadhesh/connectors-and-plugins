# Getting Started with Angular TreeMap

This refined version keeps your original section order, corrects a few technical issues, and provides Angular-ready examples that align with current Syncfusion TreeMap usage patterns.

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1: Create an Angular Application](#step-1-create-an-angular-application)
  - [Step 2: Install Syncfusion TreeMap Package](#step-2-install-syncfusion-treemap-package)
- [Module Setup](#module-setup)
  - [Standalone Component (Recommended)](#standalone-component-recommended)
  - [NgModule Setup](#ngmodule-setup)
- [Basic Component Creation](#basic-component-creation)
- [Adding Hierarchy with Levels](#adding-hierarchy-with-levels)
- [Styling Leaf Items](#styling-leaf-items)
- [Running the Application](#running-the-application)
- [Common Setup Issues](#common-setup-issues)
  - [Issue: "Cannot find module" error](#issue-cannot-find-module-error)
  - [Issue: Styles not loading](#issue-styles-not-loading)
  - [Issue: ViewEncapsulation warning](#issue-viewencapsulation-warning)

## Prerequisites

Before setting up the TreeMap component, ensure the following are installed:

- Node.js (LTS version recommended)
- npm
- Angular CLI

## Installation

### Step 1: Create an Angular Application

Create a new Angular application using Angular CLI:

```bash
ng new my-treemap-app
cd my-treemap-app
```

### Step 2: Install Syncfusion TreeMap Package

Install the TreeMap package from npm:

```bash
npm install @syncfusion/ej2-angular-treemap --save
```

> Note: In modern npm versions, `--save` is optional, but keeping it is harmless.

## Module Setup

### Standalone Component (Recommended)

For standalone components, import `TreeMapModule` directly into the component.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeMapModule],
  template: `<ejs-treemap id="treemap-container"></ejs-treemap>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {}
```

### NgModule Setup

For traditional NgModule-based applications, import `TreeMapModule` in the root module.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TreeMapModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

> Important correction: You generally do **not** need to import both `TreeMapModule` and `TreeMapAllModule` together. Use `TreeMapModule` unless you have a specific reason to pull in the aggregate module.

## Basic Component Creation

Create a simple TreeMap component with minimal configuration:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-treemap
      id="treemap-container"
      style="display: block;"
      height="350px"
      [dataSource]="data"
      weightValuePath="GDP"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = [
    { Country: 'United States', GDP: 25460 },
    { Country: 'China', GDP: 17734 },
    { Country: 'Japan', GDP: 4909 },
    { Country: 'Germany', GDP: 3846 },
    { Country: 'India', GDP: 3287 }
  ];

  public leafItemSettings = {
    labelPath: 'Country'
  };
}
```

This renders a simple TreeMap showing country sizes proportional to their GDP values.

## Adding Hierarchy with Levels

For multi-level hierarchical grouping, configure the `levels` property as an array of level definitions.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-treemap
      id="treemap-container"
      style="display: block;"
      height="350px"
      [dataSource]="data"
      weightValuePath="Sales"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = [
    { Region: 'North America', Company: 'Tech Corp', Product: 'Software', Sales: 15000 },
    { Region: 'North America', Company: 'Tech Corp', Product: 'Hardware', Sales: 12000 },
    { Region: 'Europe', Company: 'Global Inc', Product: 'Software', Sales: 10000 },
    { Region: 'Europe', Company: 'Global Inc', Product: 'Services', Sales: 8000 }
  ];

  public levels = [
    {
      groupPath: 'Region',
      headerFormat: '${Region}',
      border: { color: '#000000', width: 0.5 }
    },
    {
      groupPath: 'Company',
      headerFormat: '${Company}',
      border: { color: '#000000', width: 0.5 }
    }
  ];

  public leafItemSettings = {
    labelPath: 'Product',
    border: { color: '#000000', width: 0.5 }
  };
}
```

> Important correction: Using `[levels]="levels"` is the safest and clearest Angular pattern here. It avoids relying on nested configuration markup when a direct object-array configuration is already supported and documented.

## Styling Leaf Items

Customize the appearance of leaf items (lowest-level rectangles) using `leafItemSettings`:

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  labelFormat: '${Product}: ${Sales}',
  fill: '#008cba',
  border: { color: '#000000', width: 2 },
  labelPosition: 'Center',
  showLabels: true,
  opacity: 0.9
};
```

**Common `leafItemSettings` properties:**

- `labelPath`: Field used as the item label
- `labelFormat`: Format string for the label text
- `fill`: Background color for leaf items
- `border`: Border color and width
- `labelPosition`: Label alignment such as `TopLeft`, `TopCenter`, `Center`, and so on
- `showLabels`: Shows or hides labels
- `opacity`: Opacity from `0` to `1`
- `colorMapping`: Applies conditional coloring rules to leaf items
- `labelStyle`: Customizes label text appearance

> Important correction: Use `labelFormat` for formatted labels. Do not replace it with a generic `format` property in this section.

## Running the Application

Start the development server:

```bash
ng serve
```

Then open the Angular app in your browser, typically at:

```text
http://localhost:4200/
```

## Common Setup Issues

### Issue: "Cannot find module" error

**Cause:** The Syncfusion TreeMap package is missing or the dependency install was interrupted.

**Solution:**

```bash
npm install @syncfusion/ej2-angular-treemap
```

If the problem still exists, refresh local dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

If you are on Windows PowerShell, use:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Issue: Styles not loading

**Cause:** A Syncfusion theme has not been added globally.

**Solution:** Add a global Syncfusion theme import in `src/styles.css` or `src/styles.scss`:

```css
@import '@syncfusion/ej2-angular-treemap/styles/material.css';
```

You can also use another supported theme such as `material3.css`, `fluent.css`, `fluent2.css`, `bootstrap5.css`, `tailwind.css`, or `highcontrast.css`.

> Best practice: Add the theme once at the global styles level. Do not import the same theme repeatedly in multiple components.

### Issue: ViewEncapsulation warning

**Cause:** `ViewEncapsulation.None` is often copied into examples even when it is not strictly required.

**Solution:** Keep `ViewEncapsulation.None` only if you want your component-level style overrides to target Syncfusion’s global CSS classes more easily. It is **not** mandatory just to render the TreeMap.

Minimal example without changing encapsulation:

```typescript
import { Component } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeMapModule],
  template: `<ejs-treemap id="treemap-container"></ejs-treemap>`
})
export class AppComponent {}
```

---

## Final Technical Review Summary

- The original structure was good, but importing both `TreeMapModule` and `TreeMapAllModule` together was unnecessary.
- The hierarchy example is more reliable when written with `[levels]="levels"` instead of nested level markup.
- `labelFormat` is the correct property name for formatted leaf labels.
- Theme CSS should be loaded globally to avoid rendering and styling confusion.
- `ViewEncapsulation.None` is optional, not a hard requirement.


# Getting Started with Angular DropDownList

## Table of Contents
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Create Angular Application](#create-angular-application)
- [Install Syncfusion Package](#install-syncfusion-package)
- [Import CSS Styles](#import-css-styles)
- [Add DropDownList Component](#add-dropdownlist-component)
- [Bind Data Source](#bind-data-source)
- [Configure Popup](#configure-popup)
- [Two-Way Binding](#two-way-binding)
- [Run the Application](#run-the-application)

---

## Prerequisites

- Node.js (latest LTS)
- Angular CLI
- Angular 12+ (Ivy compiled; Angular 19+ uses standalone components by default)

Verify system requirements: [Syncfusion Angular System Requirements](https://ej2.syncfusion.com/angular/documentation/system-requirement)

---

## Dependencies

The `@syncfusion/ej2-angular-dropdowns` package pulls in all required peer dependencies automatically:

```
@syncfusion/ej2-angular-dropdowns
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-data
  ├── @syncfusion/ej2-angular-base
  └── @syncfusion/ej2-dropdowns
      ├── @syncfusion/ej2-lists
      ├── @syncfusion/ej2-inputs
      ├── @syncfusion/ej2-navigations
      ├── @syncfusion/ej2-notifications
      └── @syncfusion/ej2-popups
          └── @syncfusion/ej2-buttons
```

---

## Create Angular Application

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Create new application (CSS stylesheet)
ng new syncfusion-angular-app

# Or with SCSS
ng new syncfusion-angular-app --style=scss

# Navigate into the project
cd syncfusion-angular-app
```

> **Angular 19+ note:** The CLI generates `src/app/app.ts`, `app.html`, `app.css` (no `.component.` suffixes). Angular 18 and below use `app.component.ts`, `app.component.html`.

---

## Install Syncfusion Package

Use `ng add` for automatic setup — it installs the package, registers imports, and adds the default Material theme to `angular.json`:

```bash
ng add @syncfusion/ej2-angular-dropdowns
```

This command automatically:
- Adds `@syncfusion/ej2-angular-dropdowns` and peer dependencies to `package.json`
- Imports `DropDownListModule` in your application
- Registers the default Syncfusion Material theme in `angular.json`

**Manual install (if needed):**
```bash
npm install @syncfusion/ej2-angular-dropdowns
```

**For applications on Angular 15 and below (ngcc/non-Ivy):**
```bash
npm add @syncfusion/ej2-angular-dropdowns@32.1.19-ngcc
```
> Starting from Angular 16, ngcc support is removed. Use the standard Ivy package for Angular 16+.

---

## Import CSS Styles

After `ng add`, Material theme is registered automatically. To manually import only DropDownList-relevant styles:

**styles.css** (global stylesheet):
```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/drop-down-list/index.css";
```

> Import order matters — follow the dependency sequence above. Available themes: `material`, `material3`, `bootstrap5`, `fluent`, `tailwind`.

---

## Add DropDownList Component

**Angular 19+ (Standalone — default):**

```typescript
// src/app/app.ts
import { Component, OnInit } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `<ejs-dropdownlist placeholder="Select an item"></ejs-dropdownlist>`
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
```

**Angular 18 and below (NgModule):**

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DropDownListModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ejs-dropdownlist placeholder="Select an item"></ejs-dropdownlist>`
})
export class AppComponent {}
```

---

## Bind Data Source

Pass data through the `[dataSource]` property. Accepts primitive arrays or object arrays:

```typescript
import { Component, OnInit } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      id="ddl"
      [dataSource]="sports"
      placeholder="Select a sport">
    </ejs-dropdownlist>
  `
})
export class AppComponent implements OnInit {
  public sports: string[] = [];

  ngOnInit(): void {
    this.sports = [
      'Badminton', 'Basketball', 'Cricket',
      'Football', 'Golf', 'Hockey', 'Tennis'
    ];
  }
}
```

For object arrays, map columns using `[fields]`:

```typescript
template: `
  <ejs-dropdownlist
    [dataSource]="sports"
    [fields]="fields"
    placeholder="Select a sport">
  </ejs-dropdownlist>
`

public sports = [
  { id: 1, name: 'Cricket' },
  { id: 2, name: 'Football' },
  { id: 3, name: 'Tennis' }
];
public fields = { text: 'name', value: 'id' };
```

---

## Configure Popup

Control popup dimensions with `[popupHeight]` and `[popupWidth]`:

```html
<ejs-dropdownlist
  [dataSource]="sports"
  popupHeight="250px"
  popupWidth="300px"
  placeholder="Select a sport">
</ejs-dropdownlist>
```

- Default popup height: `300px`
- Default popup width: matches input element width
- Accepts CSS strings (`"250px"`, `"50%"`) or numbers (pixels)

---

## Two-Way Binding

Use `[(value)]` for two-way binding of the selected value:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="sports"
      [(value)]="selectedSport"
      placeholder="Select a sport">
    </ejs-dropdownlist>
    <p>Selected: {{ selectedSport }}</p>
  `
})
export class AppComponent {
  public sports = ['Cricket', 'Football', 'Tennis'];
  public selectedSport: string = 'Cricket'; // pre-selects "Cricket"
}
```

Changing `selectedSport` in code automatically updates the dropdown, and selecting in the UI updates `selectedSport`.

---

## Run the Application

```bash
ng serve
```

Open `http://localhost:4200` in your browser. The DropDownList should render with the configured data source.

---

## See Also

- [Data Binding](data-binding.md) — local, remote, and async data sources
- [Filtering](filtering.md) — enabling search within the dropdown
- [Forms](disabled-items-and-forms.md) — template-driven and reactive form integration

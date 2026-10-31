# Getting Started with Angular MultiColumn ComboBox

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [CSS Theme Imports](#css-theme-imports)
- [Basic Component Setup](#basic-component-setup)
- [Binding Data Source with Fields and Columns](#binding-data-source-with-fields-and-columns)
- [Popup Dimensions](#popup-dimensions)
- [Running the Application](#running-the-application)

## Prerequisites

- Angular 12 or later (standalone components supported from Angular 14+; default from Angular 19+)
- Node.js and npm installed

## Installation

Use the Angular CLI schematic for automatic setup:

```bash
ng add @syncfusion/ej2-angular-multicolumn-combobox
```

This command:
- Adds `@syncfusion/ej2-angular-multicolumn-combobox` and peer dependencies to `package.json`
- Imports `MultiColumnComboBoxModule` into your application
- Registers the default Syncfusion Material theme in `angular.json`

**Dependencies installed:**
```
@syncfusion/ej2-angular-multicolumn-combobox
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-data
  ├── @syncfusion/ej2-angular-base
  ├── @syncfusion/ej2-grids
  ├── @syncfusion/ej2-lists
  ├── @syncfusion/ej2-inputs
  ├── @syncfusion/ej2-popups
  └── @syncfusion/ej2-buttons
```

For manual npm install:
```bash
npm install @syncfusion/ej2-angular-multicolumn-combobox
```

## CSS Theme Imports

Import styles in `src/styles.css` (or `styles.scss`). Component-specific imports:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/multicolumn-combobox/index.css";
```

> Import order matters — follow the dependency sequence above.

Replace `material3` with your preferred theme: `material`, `bootstrap5`, `tailwind`, `fluent2`, etc.

## Basic Component Setup

In a standalone Angular component (Angular 19+), import `MultiColumnComboBoxModule`:

```typescript
import { Component } from '@angular/core';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';

@Component({
  imports: [MultiColumnComboBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-multicolumncombobox id='multicolumn'></ejs-multicolumncombobox>`
})
export class AppComponent {}
```

The `<ejs-multicolumncombobox>` selector renders the component. Without data, it renders an empty input.

## Binding Data Source with Fields and Columns

Populate with data using `[dataSource]`. Define column display using `<e-columns>` / `<e-column>` child directives. Map which data fields represent the display text and the stored value using `[fields]`:

```typescript
import { Component } from '@angular/core';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';

@Component({
  imports: [MultiColumnComboBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-multicolumncombobox
      id='multicolumn'
      [dataSource]='employeeData'
      [fields]='fields'
      [placeholder]='waterMark'>
      <e-columns>
        <e-column field='EmpID' header='Employee ID' width='100'></e-column>
        <e-column field='Name' header='Name' width='90'></e-column>
        <e-column field='Designation' header='Designation' width='100'></e-column>
        <e-column field='Country' header='Country' width='90'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public employeeData: Object[] = [
    { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead', Country: 'England' },
    { EmpID: 1002, Name: 'Robert', Designation: 'Developer', Country: 'USA' },
    { EmpID: 1003, Name: 'Michael', Designation: 'HR', Country: 'Russia' },
    { EmpID: 1004, Name: 'Steven Buchanan', Designation: 'Product Manager', Country: 'Ukraine' },
    { EmpID: 1005, Name: 'Margaret Peacock', Designation: 'Developer', Country: 'Egypt' }
  ];
  // text: field shown in the input after selection; value: hidden key stored
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Select an employee';
}
```

**Key points:**
- `fields.text` — the field whose value appears in the input box after selection
- `fields.value` — the field stored as the component's underlying value
- `<e-column field='...' header='...' width='...'>` — defines what appears in each popup column

## Popup Dimensions

By default, popup width matches the component width and height is `300px`. Customize with `popupHeight` and `popupWidth`:

```html
<ejs-multicolumncombobox
  id='multicolumn'
  [dataSource]='employeeData'
  [fields]='fields'
  popupWidth='500px'
  popupHeight='250px'>
  <e-columns>
    <e-column field='EmpID' header='Employee ID' width='80'></e-column>
    <e-column field='Name' header='Name' width='80'></e-column>
    <e-column field='Designation' header='Designation' width='100'></e-column>
    <e-column field='Country' header='Country' width='80'></e-column>
  </e-columns>
</ejs-multicolumncombobox>
```

## Running the Application

```bash
ng serve --open
```

The component renders in the browser with the configured data and columns in a dropdown popup.

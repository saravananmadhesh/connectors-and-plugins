## Getting Started

This section explains how to create and render the Syncfusion Angular Spreadsheet component with package setup, CSS references, standalone component configuration, basic rendering, and initial data binding.

### Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Setup Angular Project](#setup-angular-project)
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Basic Spreadsheet Setup](#basic-spreadsheet-setup)
- [Bind Data to Spreadsheet](#bind-data-to-spreadsheet)
- [Key Components](#key-components)
- [Placeholders](#placeholders)
- [Notes](#notes)
- [Troubleshooting](#troubleshooting)

### When to Use This Skill

Use this skill when you need to:
- Set up the Syncfusion Angular Spreadsheet component in an Angular project.
- Install the required Angular Spreadsheet package.
- Add required Syncfusion CSS references.
- Render a basic Spreadsheet UI.
- Bind local JSON/object-array data to the Spreadsheet.
- Start from a standalone Angular component using inline templates.

### Setup Angular Project

Use this section only when creating a new Angular project. If the workspace already contains an Angular project, skip this section and install only the Spreadsheet package.

```bash
npm install -g @angular/cli
ng new spreadsheet-app
cd spreadsheet-app
ng serve
```

### Installation

Before generating Spreadsheet code, ensure the required npm package is installed. If the workspace contains an existing Angular project and does not already have `@syncfusion/ej2-angular-spreadsheet` installed, run:

```bash
npm install @syncfusion/ej2-angular-spreadsheet --save
```

**Note:** Do not execute installation commands if the workspace does not contain an Angular project or no `package.json` file exists.

### CSS Imports

Install Syncfusion Tailwind3 theme package via npm:

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

Add the required Syncfusion Spreadsheet style reference in `src/styles.css`. Use the theme that matches your app (tailwind3, material3, bootstrap5, fluent2, etc.).

```css
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/spreadsheet/index.css';
```

**Important:** Use one Syncfusion theme consistently across the application. This getting-started reference uses `Tailwind 3` theme. Do not mix `Tailwind 3` theme with other Syncfusion theme files in the same setup unless the project intentionally supports multiple themes.

### Basic Spreadsheet Setup

Use this minimal standalone component when the request is only to initialize or render an empty Spreadsheet.

**src/app/app.component.ts**

```ts
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `<ejs-spreadsheet></ejs-spreadsheet>`
})
export class AppComponent { }
```

**src/main.ts**

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### Bind Data to Spreadsheet

Use this version when the Spreadsheet should be initialized with local JSON/object-array data.

**src/app/app.component.ts**

```ts
import { Component } from '@angular/core';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
    <ejs-spreadsheet>
      <e-sheets>
        <e-sheet name="Sheet1">
          <e-ranges>
            <e-range [dataSource]="data" startCell="A1"></e-range>
          </e-ranges>
        </e-sheet>
      </e-sheets>
    </ejs-spreadsheet>
  `
})
export class AppComponent {
  public data: object[] = [
    { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, ShipCity: 'Reims' },
    { OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, ShipCity: 'Münster' },
    { OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, ShipCity: 'Lyon' }
  ];
}
```

### Key Components

- **SpreadsheetAllModule**: Angular module that provides Spreadsheet directives and feature support for the standalone component.
- **ejs-spreadsheet**: Main Spreadsheet component selector.
- **e-sheets**: Container for one or more worksheet definitions.
- **e-sheet**: Defines an individual worksheet.
- **e-ranges**: Container for one or more data ranges inside a sheet.
- **e-range**: Binds a local or remote data source to a sheet. Use `startCell` to control where the data begins.

### Placeholders

- `[FEATURE_FLAGS]`: Optional Spreadsheet feature flags. Add only when disabling or customizing features. Examples: `[allowEditing]="false"`, `[showRibbon]="false"`, `[showFormulaBar]="false"`.
- `[SHEET_NAME]`: Sheet name. Examples: `'Sheet1'`, `'Sales'`.
- `[DATA_SOURCE]`: Initial local data source. Example: `[{ Product: 'Laptop', Price: 1200 }]`.
- `[START_CELL]`: Cell where the bound data should start. Examples: `'A1'`, `'A2'`.

### Notes

- Use standalone Angular components with `standalone: true` and the `imports` array.
- Import `SpreadsheetAllModule` in the standalone component imports array.
- Add Syncfusion CSS imports in `src/styles.css`.
- This getting-started reference uses the `tailwind3.css` theme consistently.
- Use `ejs-spreadsheet` alone for basic empty rendering.
- Use `e-sheets`, `e-sheet`, `e-ranges`, and `e-range` when binding initial data.
- Use `startCell` when the data should begin at a specific cell.
- Use the Spreadsheet `created` event for post-initialization code that depends on the Spreadsheet instance.
- If the Spreadsheet appears collapsed or not visible, set a height for the parent container or Spreadsheet host area.

### Troubleshooting

**Spreadsheet not rendering**
- Verify that `@syncfusion/ej2-angular-spreadsheet` is installed.
- Confirm that `SpreadsheetAllModule` is imported in the standalone component.
- Confirm that `bootstrapApplication(AppComponent)` is configured in `src/main.ts` for standalone Angular apps.

**Styles are missing**
- Confirm all required Syncfusion CSS files are imported in `src/styles.css`.
- Ensure all Syncfusion CSS imports use the same theme name, such as `tailwind3.css`.
- Do not duplicate the same Syncfusion CSS imports in multiple global style files.

**Data is not displayed**
- Confirm that `data` is an array of objects.
- Ensure `e-range` is placed inside `e-ranges`, which is inside `e-sheet`.
- Use `startCell` when the data should start from a specific cell.

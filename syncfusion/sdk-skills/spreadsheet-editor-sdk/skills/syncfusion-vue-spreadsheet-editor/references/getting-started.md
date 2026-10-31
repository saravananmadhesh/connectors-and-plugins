## Getting Started

This section explains how to create and render the Syncfusion Vue Spreadsheet component with package setup, CSS references, basic rendering, and initial data binding.

### Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Setup Vue Project](#setup-vue-project)
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
- Set up the Syncfusion Vue Spreadsheet component in a Vue project.
- Install the required Vue Spreadsheet package.
- Add required Syncfusion CSS references.
- Render a basic Spreadsheet UI.
- Bind local JSON/object-array data to the Spreadsheet.

### Setup Vue Project

Use this section only when creating a new Vue project. If the workspace already contains a Vue project, skip this section and install only the Spreadsheet package.

#### Vue Project Setup (Vite - Recommended)

```bash
npm create vite@latest spreadsheet-app -- --template vue
cd spreadsheet-app
npm install
npm run dev
```

### Installation

Before generating Spreadsheet code, ensure the required npm package is installed. If the workspace contains an existing Vue project and does not already have `@syncfusion/ej2-vue-spreadsheet` installed, run:

```bash
npm install @syncfusion/ej2-vue-spreadsheet --save
```

**Note:** Do not execute installation commands if the workspace does not contain a Vue project or no `package.json` file exists.

### CSS Imports

Install Syncfusion Tailwind3 theme package via npm:

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

Add the required Syncfusion Spreadsheet style reference in `<style>` section of `src/App.vue`. Use the theme that matches your app (tailwind3, material3, bootstrap5, fluent2, etc.).

```css
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/spreadsheet/index.css";
```

**Important:** Use one Syncfusion theme consistently across the application. This getting-started reference uses `Tailwind 3` theme. Do not mix `Tailwind 3` theme with other Syncfusion theme files in the same setup unless the project intentionally supports multiple themes.

### Basic Spreadsheet Setup

Use this minimal version when the request is only to initialize or render an empty Spreadsheet.

**src/App.vue**

```vue
<template>
  <ejs-spreadsheet></ejs-spreadsheet>
</template>

<script>
import { SpreadsheetComponent } from '@syncfusion/ej2-vue-spreadsheet';

export default {
  name: 'App',
  components: {
    'ejs-spreadsheet': SpreadsheetComponent
  }
};
</script>
```

### Bind Data to Spreadsheet

Use this version when the Spreadsheet should be initialized with local JSON/object-array data.

**src/App.vue**

```vue
<template>
  <ejs-spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range :dataSource="data" startCell="A1"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</template>

<script>
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RangesDirective,
  RangeDirective
} from '@syncfusion/ej2-vue-spreadsheet';

export default {
  name: 'App',
  components: {
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheets': SheetsDirective,
    'e-sheet': SheetDirective,
    'e-ranges': RangesDirective,
    'e-range': RangeDirective
  },
  data() {
    return {
      data: [
        { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, ShipCity: 'Reims' },
        { OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, ShipCity: 'Münster' },
        { OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, ShipCity: 'Lyon' }
      ]
    };
  }
};
</script>
```

### Key Components

- **ejs-spreadsheet**: Main Spreadsheet component selector.
- **e-sheets**: Container for one or more worksheet definitions.
- **e-sheet**: Defines an individual worksheet.
- **e-ranges**: Container for one or more data ranges inside a sheet.
- **e-range**: Binds a local or remote data source to a sheet. Use `startCell` to control where the data begins.

### Placeholders

- `[FEATURE_FLAGS]`: Optional Spreadsheet feature flags. Add only when disabling or customizing features. Examples: `:allowEditing="false"`, `:allowOpen="false"`, `:allowSave="false"`, `:showRibbon="false"`, `:showFormulaBar="false"`.
- `[SHEET_NAME]`: Sheet name. Examples: `'Sheet1'`, `'Sales'`.
- `[DATA_SOURCE]`: Initial local data source. Example: `[{ Product: 'Laptop', Price: 1200 }]`.
- `[START_CELL]`: Cell where the bound data should start. Examples: `'A1'`, `'A2'`.

### Notes

- Add Syncfusion CSS imports in `src/App.vue` or the project's global stylesheet.
- This getting-started reference uses the `tailwind3.css` theme consistently.
- Use `ejs-spreadsheet` alone for basic empty rendering.
- Use `e-sheets`, `e-sheet`, `e-ranges`, and `e-range` when binding initial data.
- Use `startCell` when the data should begin at a specific cell.
- If the Spreadsheet appears collapsed or not visible, set a height for the parent container or Spreadsheet host area.

### Troubleshooting

**Spreadsheet not rendering**
- Verify that `@syncfusion/ej2-vue-spreadsheet` is installed.
- Confirm that `ejs-spreadsheet` is used inside a Vue component template.

**Styles are missing**
- Confirm all required Syncfusion CSS files are imported.
- Ensure all Syncfusion CSS imports use the same theme name, such as `tailwind3.css`.
- Do not duplicate the same Syncfusion CSS imports in multiple global style files.

**Data is not displayed**
- Confirm that `data` is an array of objects.
- Ensure `e-range` is placed inside `e-ranges`, which is inside `e-sheet`.
- Use `startCell` when the data should start from a specific cell.

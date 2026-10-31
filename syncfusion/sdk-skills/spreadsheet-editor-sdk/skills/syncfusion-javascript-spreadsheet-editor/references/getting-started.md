## Getting Started

This section explains how to create and render the Syncfusion JavaScript Spreadsheet control with package setup, CSS references, basic rendering, and initial data binding.

### Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Setup JavaScript Project](#setup-javascript-project)
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [HTML Container](#html-container)
- [Basic Spreadsheet Setup](#basic-spreadsheet-setup)
- [Bind Data to Spreadsheet](#bind-data-to-spreadsheet)
- [Key APIs](#key-apis)
- [Placeholders](#placeholders)
- [Notes](#notes)
- [Troubleshooting](#troubleshooting)

### When to Use This Skill

Use this skill when you need to:
- Set up the Syncfusion JavaScript Spreadsheet control in a plain web project.
- Install the required Spreadsheet package.
- Add required Syncfusion CSS references.
- Render a basic Spreadsheet UI into an HTML container.
- Bind local JSON/object-array data to the Spreadsheet.

### Setup JavaScript Project

Use this section only when creating a new JavaScript Spreadsheet project. If the workspace already contains a JavaScript project, skip this section and install only the Spreadsheet package.

Clone the Syncfusion quick-start project and navigate into the project folder:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-spreadsheet
cd ej2-spreadsheet
npm install
npm start
```

### Installation

Before generating Spreadsheet code, ensure the required npm package is installed. If the workspace contains an existing JavaScript project and does not already have `@syncfusion/ej2-spreadsheet` installed, run:

```bash
npm install @syncfusion/ej2-spreadsheet --save
```

**Note:** Do not execute installation commands if the workspace does not contain a JavaScript project or no `package.json` file exists.

### CSS Imports

Install Syncfusion Tailwind3 theme package via npm:

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

Add the required Syncfusion Spreadsheet style reference in `src/styles/styles.css`. Use the theme that matches your app (tailwind3, material3, bootstrap5, fluent2, etc.).

```css
@import '../../node_modules/@syncfusion/ej2-tailwind3-theme/styles/spreadsheet/index.css';
```

**Important:** Use one Syncfusion theme consistently across the application. This getting-started reference uses `Tailwind 3` theme. Do not mix `Tailwind 3` theme with other Syncfusion theme files in the same setup unless the project intentionally supports multiple themes.

**Note**: The stylesheet is already included through the Webpack entry configuration. No additional CSS import is required in any of the code snippets in this topic.

### HTML Container

Add a target element for rendering the Spreadsheet control.

```html
<div id="spreadsheet"></div>
```

### Basic Spreadsheet Setup

Use this minimal version when the request is only to initialize or render an empty Spreadsheet.

**src/app/app.ts**

```ts
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet();
spreadsheet.appendTo('#spreadsheet');
```

### Bind Data to Spreadsheet

Use this version when the Spreadsheet should be initialized with local JSON/object-array data.

**src/app/app.ts**

```ts
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const data: object[] = [
  { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, ShipCity: 'Reims' },
  { OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, ShipCity: 'Münster' },
  { OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, ShipCity: 'Lyon' }
];

const spreadsheet: Spreadsheet = new Spreadsheet({
  sheets: [
    {
      name: 'Sheet1',
      ranges: [
        {
          dataSource: data,
          startCell: 'A1'
        }
      ]
    }
  ]
});

spreadsheet.appendTo('#spreadsheet');
```

### Key APIs

- **Spreadsheet**: Main class used to create and configure the Spreadsheet control.
- **appendTo(selector)**: Renders the Spreadsheet into the matching DOM element.
- **sheets**: Defines one or more worksheets.
- **ranges**: Defines data ranges inside a worksheet.
- **dataSource**: Binds local or remote data to the range.
- **startCell**: Defines where the bound data should start.

### Placeholders

- `[SHEET_NAME]`: Sheet name. Examples: `'Sheet1'`, `'Sales'`.
- `[DATA_SOURCE]`: Initial local data source. Example: `[{ Product: 'Laptop', Price: 1200 }]`.
- `[START_CELL]`: Cell where the bound data should start. Examples: `'A1'`, `'A2'`.
- `[CONTAINER_ID]`: HTML element ID where Spreadsheet should be rendered. Example: `'#spreadsheet'`.

### Notes

- Add the target HTML container before calling `appendTo`.
- This getting-started reference uses the `tailwind3.css` theme consistently.
- Use `new Spreadsheet()` alone for basic empty rendering.
- Use `sheets`, `ranges`, `dataSource`, and `startCell` when binding initial data.
- Use the Spreadsheet `created` event for post-initialization code that depends on the fully rendered Spreadsheet instance.
- If the Spreadsheet appears collapsed or not visible, set a height for the parent container or Spreadsheet host area.

### Troubleshooting

**Spreadsheet not rendering**
- Verify that `@syncfusion/ej2-spreadsheet` is installed.
- Confirm that the HTML container exists before calling `appendTo`.
- Confirm that the selector passed to `appendTo` matches the container ID.

**Styles are missing**
- Confirm all required Syncfusion CSS files are imported.
- Ensure all Syncfusion CSS imports use the same theme name, such as `tailwind3.css`.
- Do not duplicate the same Syncfusion CSS imports in multiple global style files.

**Data is not displayed**
- Confirm that `dataSource` is an array of objects.
- Ensure `ranges` is configured inside a sheet.
- Use `startCell` when the data should start from a specific cell.

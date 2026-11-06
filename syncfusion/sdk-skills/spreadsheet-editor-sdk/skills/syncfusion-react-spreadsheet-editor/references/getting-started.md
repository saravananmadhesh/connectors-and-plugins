## Getting Started with React Spreadsheet

This section explains how to create and render the Syncfusion React Spreadsheet component with basic rendering and initial data binding.

### Table of Contents
- [Setup Project](#setup-project)
- [Install Syncfusion Spreadsheet Package](#install-syncfusion-spreadsheet-package)
- [Add CSS References](#add-css-references)
- [Basic Spreadsheet Setup](#basic-spreadsheet-setup)
- [Bind Data to Spreadsheet](#bind-data-to-spreadsheet)
- [Key Components](#key-components)
- [Placeholders](#placeholders)
- [Notes](#notes)
- [Troubleshooting](#troubleshooting)

### Setup Project

Use this section only when creating a new React project. If the workspace already contains a React app, skip this section and install only the Spreadsheet package.

#### Using Vite (Recommended)

Vite provides faster development environments with smaller bundle sizes compared to traditional tools.

```bash
npm create vite@latest spreadsheet-app -- --template react-ts
cd spreadsheet-app
npm install
npm run dev
```

#### Using Create React App

For traditional React app setup:

```bash
npx create-react-app spreadsheet-app --template typescript
cd spreadsheet-app
npm start
```

#### Using Next.js

For Next.js projects:

```bash
npx create-next-app@latest spreadsheet-app
cd spreadsheet-app
npm run dev
```

### Install Syncfusion Spreadsheet Package

Before generating Spreadsheet code, ensure the required npm package is installed. If the workspace contains an existing React project and does not already have `@syncfusion/ej2-react-spreadsheet` installed, run:

```bash
npm install @syncfusion/ej2-react-spreadsheet --save
```

**Note:** Do not execute this installation if the workspace does not contain a React project or no `package.json` file exists.

### Add CSS References

Install Syncfusion Tailwind3 theme package via npm:

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

For Vite or Create React App, Add the required Syncfusion Spreadsheet style reference in `src/index.css`. Use the theme that matches your app (tailwind3, material3, bootstrap5, fluent2, etc.).

```css
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/spreadsheet/index.css';
```

For Next.js App Router, add the same Syncfusion Spreadsheet style reference in `src/app/globals.css`. Because `globals.css` is inside `src/app`, adjust the relative path as required by the project structure. A common App Router path is shown below:

```css
@import '../../node_modules/@syncfusion/ej2-tailwind3-theme/styles/spreadsheet/index.css';
```

**Important:** Use one Syncfusion theme consistently across the application. This getting-started reference uses `Tailwind 3` theme. Do not mix `Tailwind 3` theme with other Syncfusion theme files in the same setup unless the project intentionally supports multiple themes.

### Basic Spreadsheet Setup

#### Minimal Spreadsheet Component

Use this minimal version when the request is only to initialize or render an empty Spreadsheet. This code works in both `src/App.jsx` and `src/App.tsx`.

```jsx
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function App() {
  return <SpreadsheetComponent />;
}

export default App;
```

#### Next.js App Router Example

For Next.js App Router, render the Spreadsheet from a client component. Use this pattern in `src/app/page.tsx` or in a separate client component imported by the page.

```tsx
'use client';

import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

export default function Page() {
  return (
    <SpreadsheetComponent />
  );
}
```

### Bind Data to Spreadsheet

Use this version when the Spreadsheet should be initialized with local JSON data.

#### App.jsx

```jsx
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RangesDirective,
  RangeDirective
} from '@syncfusion/ej2-react-spreadsheet';

function App() {
  const defaultData = [
    { Product: 'Laptop', Price: 1200, Quantity: 5, Total: '=B2*C2' },
    { Product: 'Mouse', Price: 25, Quantity: 20, Total: '=B3*C3' },
    { Product: 'Keyboard', Price: 80, Quantity: 10, Total: '=B4*C4' }
  ];

  return (
    <SpreadsheetComponent>
      <SheetsDirective>
        <SheetDirective name="Sheet1">
          <RangesDirective>
            <RangeDirective dataSource={defaultData} startCell="A1" />
          </RangesDirective>
        </SheetDirective>
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}

export default App;
```

#### App.tsx

```tsx
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RangesDirective,
  RangeDirective
} from '@syncfusion/ej2-react-spreadsheet';

function App() {
  const defaultData: object[] = [
    { Product: 'Laptop', Price: 1200, Quantity: 5, Total: '=B2*C2' },
    { Product: 'Mouse', Price: 25, Quantity: 20, Total: '=B3*C3' },
    { Product: 'Keyboard', Price: 80, Quantity: 10, Total: '=B4*C4' }
  ];

  return (
    <SpreadsheetComponent>
      <SheetsDirective>
        <SheetDirective name="Sheet1">
          <RangesDirective>
            <RangeDirective dataSource={defaultData} startCell="A1" />
          </RangesDirective>
        </SheetDirective>
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}

export default App;
```

#### Next.js App Router Data Binding Example

```tsx
'use client';

import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RangesDirective,
  RangeDirective
} from '@syncfusion/ej2-react-spreadsheet';

export default function Page() {
  const defaultData: object[] = [
    { Product: 'Laptop', Price: 1200, Quantity: 5, Total: '=B2*C2' },
    { Product: 'Mouse', Price: 25, Quantity: 20, Total: '=B3*C3' },
    { Product: 'Keyboard', Price: 80, Quantity: 10, Total: '=B4*C4' }
  ];

  return (
    <SpreadsheetComponent>
      <SheetsDirective>
        <SheetDirective name="Sheet1">
          <RangesDirective>
            <RangeDirective dataSource={defaultData} startCell="A1" />
          </RangesDirective>
        </SheetDirective>
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}
```

### Key Components

- **SpreadsheetComponent**: Main Spreadsheet container used to render the spreadsheet UI.
- **SheetsDirective**: Wrapper for one or more worksheet definitions.
- **SheetDirective**: Defines an individual worksheet, including its name and ranges.
- **RangesDirective**: Wrapper for one or more data ranges inside a sheet.
- **RangeDirective**: Binds a local or remote data source to the sheet. Use `startCell` to control where the data begins.

### Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[FEATURE_FLAGS]` | Optional Spreadsheet feature flags. Add only when disabling or customizing features. | `allowEditing={false}`, `showRibbon={false}`, `showFormulaBar={false}` |
| `[SHEET_NAME]` | Sheet name. | `'Sheet1'`, `'Sales'` |
| `[DATA_SOURCE]` | Initial local data source. | `[{ Product: 'Laptop', Price: 1200 }]` |
| `[START_CELL]` | Cell where the bound data should start. | `'A1'`, `'A2'` |

### Notes

- For Vite or Create React App, add Syncfusion CSS imports in `src/index.css`.
- For Next.js App Router, add Syncfusion CSS imports in `src/app/globals.css` and ensure `globals.css` is imported by `src/app/layout.tsx`.
- This getting-started reference uses the `tailwind3.css` theme consistently.
- Use `SpreadsheetComponent` alone for basic empty rendering.
- Use `SheetsDirective`, `SheetDirective`, `RangesDirective`, and `RangeDirective` when binding initial data.
- Use `startCell` when the data should begin at a specific cell.
- Choose the code block based on the requested output: use `jsx` for `App.jsx` and `tsx` for `App.tsx` or Next.js App Router files.
- If the Spreadsheet appears collapsed or not visible, set a height for the parent container or the Spreadsheet host area.

### Troubleshooting

**Spreadsheet not rendering**
- Verify that `@syncfusion/ej2-react-spreadsheet` is installed.
- Confirm that the component is imported from `@syncfusion/ej2-react-spreadsheet`.
- In Next.js App Router, render the Spreadsheet inside a client component by adding `'use client';` at the top of the component file.

**Styles are missing**
- Confirm all required Syncfusion CSS files are imported in `src/index.css` for Vite/CRA or `src/app/globals.css` for Next.js.
- Ensure all Syncfusion CSS imports use the same theme name, such as `tailwind3.css`.
- For Next.js App Router, confirm that `src/app/layout.tsx` imports `./globals.css`.

**Data is not displayed**
- Confirm that `dataSource` is an array of objects.
- Ensure `RangeDirective` is placed inside `RangesDirective`, which is inside `SheetDirective`.
- Use `startCell` when the data should start from a specific cell.

# Getting Started with Pivot View

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Dependencies and Packages](#dependencies-and-packages)
- [Installation Methods](#installation-methods)
- [Setup Development Environment](#setup-development-environment)
- [Import Syncfusion CSS Styles](#import-syncfusion-css-styles)
- [Browser Compatibility](#browser-compatibility)
- [Initialize Pivot View Component](#initialize-pivot-view-component)
- [Assign Sample Data](#assign-sample-data)
- [Configure Fields (Rows, Columns, Values, Filters)](#configure-fields-rows-columns-values-filters)
- [Apply Number Formatting](#apply-number-formatting)
- [Enable Module Features](#enable-module-features)
- [Run the Application](#run-the-application)
- [Troubleshooting](#troubleshooting)

## Overview

This guide walks through creating a basic Pivot View (Pivot Table) component in TypeScript applications using Syncfusion Essential JS 2. The Pivot View enables interactive data analysis through aggregation, grouping, filtering, and visualization capabilities.

## Prerequisites

Ensure the following software is installed on your machine:

- **Git** - [Download](https://git-scm.com/install)
- **Node.js** (v14.15.0 or higher) - [Download](https://nodejs.org/en)
- **Visual Studio Code** - [Download](https://code.visualstudio.com)
- **Webpack** (configured via webpack-cli)

## Dependencies and Packages

The Pivot View component requires several Syncfusion packages for full functionality:

```javascript
|-- @syncfusion/ej2-pivotview (main package)
    |-- @syncfusion/ej2-base (core utilities)
    |-- @syncfusion/ej2-data (data management)
    |-- @syncfusion/ej2-excel-export (Excel export)
        |-- @syncfusion/ej2-file-utils
        |-- @syncfusion/ej2-compression
    |-- @syncfusion/ej2-pdf-export (PDF export)
        |-- @syncfusion/ej2-file-utils
        |-- @syncfusion/ej2-compression
    |-- @syncfusion/ej2-inputs
    |-- @syncfusion/ej2-buttons
    |-- @syncfusion/ej2-splitbuttons
    |-- @syncfusion/ej2-dropdowns
    |-- @syncfusion/ej2-lists
    |-- @syncfusion/ej2-popups
    |-- @syncfusion/ej2-navigations
    |-- @syncfusion/ej2-grids
```

## Installation Methods

### Method 1: Using npm (Recommended)

Install the complete Syncfusion package:

```bash
npm install @syncfusion/ej2
```

Or install only the Pivot View package:

```bash
npm install @syncfusion/ej2-pivotview
```

### Method 2: Using Quickstart Template

Clone the pre-configured quickstart project:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
npm install
```

The quickstart template includes webpack configuration and is ready to use.

## Setup Development Environment

1. **Create project directory or clone quickstart:**

```bash
# Option 1: Clone quickstart
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart

# Option 2: Create new project
mkdir pivot-view-app
cd pivot-view-app
npm init -y
```

2. **Install dependencies:**

```bash
npm install @syncfusion/ej2-pivotview --save
```

3. **Create source files:**

```
project-root/
├── src/
│   ├── app.ts
│   ├── datasource.ts
│   └── styles/
│       └── styles.css
├── index.html
├── package.json
└── webpack.config.js
```

## Import Syncfusion CSS Styles

Themes for Syncfusion JavaScript controls can be applied using CSS or SASS files from the [npm theme packages](https://ej2.syncfusion.com/documentation/appearance/theme#theme-packages), CDN, CRG, or [Theme Studio](https://ej2.syncfusion.com/documentation/appearance/theme-studio). For more information, refer to the [themes documentation](https://ej2.syncfusion.com/documentation/appearance/theme).

The following example demonstrates the installation of the `Tailwind 3` theme package from npm. Each component in this theme package includes an `index.css` file that automatically loads all required dependency styles.

To install the [Tailwind 3](https://www.npmjs.com/package/@syncfusion/ej2-tailwind3-theme) theme package, use the following command:

```bash
npm install @syncfusion/ej2-tailwind3-theme --save
```

Import the required theme styles in the `~/src/styles/styles.css` file:

```css
@import '../../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css';
```

**Available theme packages:**
- `@syncfusion/ej2-tailwind3-theme` (Tailwind 3 - default)
- `@syncfusion/ej2-material-theme` (Material)
- `@syncfusion/ej2-bootstrap5-theme` (Bootstrap 5)
- `@syncfusion/ej2-fluent-theme` (Fluent)
- `@syncfusion/ej2-fabric-theme` (Fabric)
- `@syncfusion/ej2-high-contrast-theme` (High Contrast)

## Browser Compatibility

The Pivot View supports all modern browsers. For Internet Explorer 11, polyfills are required:

```html
<!-- Add polyfills for IE11 -->
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
```

**Supported browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11 (with polyfills)

## Initialize Pivot View Component

### Step 1: Create HTML Container

Add a div element in `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Pivot View TypeScript</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./src/styles/styles.css" />
</head>
<body>
    <!-- Pivot View container -->
    <div id="PivotTable"></div>
</body>
</html>
```

### Step 2: Import and Initialize in TypeScript

Create `app.ts`:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

// Initialize empty Pivot View
let pivotTableObj: PivotView = new PivotView();
pivotTableObj.appendTo('#PivotTable');
```

## Assign Sample Data

Create a data source in `datasource.ts`:

```typescript
// datasource.ts
export let pivotData: Object[] = [
    { Sold: 31, Amount: 52824, Country: 'France', Products: 'Mountain Bikes', Year: 'FY 2015', Quarter: 'Q1' },
    { Sold: 51, Amount: 86904, Country: 'France', Products: 'Mountain Bikes', Year: 'FY 2015', Quarter: 'Q2' },
    { Sold: 90, Amount: 153360, Country: 'France', Products: 'Mountain Bikes', Year: 'FY 2015', Quarter: 'Q3' },
    { Sold: 25, Amount: 42600, Country: 'France', Products: 'Mountain Bikes', Year: 'FY 2015', Quarter: 'Q4' },
    { Sold: 27, Amount: 46008, Country: 'France', Products: 'Mountain Bikes', Year: 'FY 2016', Quarter: 'Q1' },
    { Sold: 49, Amount: 83496, Country: 'Germany', Products: 'Road Bikes', Year: 'FY 2015', Quarter: 'Q1' },
    { Sold: 59, Amount: 100548, Country: 'Germany', Products: 'Road Bikes', Year: 'FY 2015', Quarter: 'Q2' },
    { Sold: 70, Amount: 119280, Country: 'Germany', Products: 'Road Bikes', Year: 'FY 2015', Quarter: 'Q3' },
    { Sold: 82, Amount: 139752, Country: 'Germany', Products: 'Road Bikes', Year: 'FY 2016', Quarter: 'Q1' }
];
```

Bind data to Pivot View in `app.ts`:

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[]
    }
});
pivotTableObj.appendTo('#PivotTable');
```

## Configure Fields (Rows, Columns, Values, Filters)

Organize data fields into the four axes to create a structured pivot table:

### Understanding the Four Axes

- **rows** - Fields displayed as row headers (vertical grouping)
- **columns** - Fields displayed as column headers (horizontal grouping)
- **values** - Numeric fields to aggregate (Sum, Count, Average, etc.)
- **filters** - Master filters applied to all data

### Field Properties

Each field requires:
- `name` - Field name from data source (case-sensitive)
- `caption` - Display name (optional)
- `type` - Aggregation type for values (Sum, Count, Avg, etc.)

### Example Configuration

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        
        // Row axis - vertical grouping
        rows: [
            { name: 'Country' },
            { name: 'Products' }
        ],
        
        // Column axis - horizontal grouping
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        
        // Values axis - aggregated measures
        values: [
            { name: 'Sold', caption: 'Units Sold', type: 'Sum' },
            { name: 'Amount', caption: 'Sold Amount', type: 'Sum' }
        ],
        
        // Filter axis - master filter
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Result:** Creates a pivot table with Countries and Products as rows, Years and Quarters as columns, and aggregated Sold/Amount values in cells.

## Apply Number Formatting

Format numeric values for better readability:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        
        // Format settings
        formatSettings: [
            { name: 'Amount', format: 'C0' },  // Currency, no decimals
            { name: 'Sold', format: 'N0' }     // Number, no decimals
        ]
    },
    height: 350
});
```

**Common format codes:**
- `C0` - Currency without decimals ($1,234)
- `C2` - Currency with 2 decimals ($1,234.56)
- `N0` - Number without decimals (1,234)
- `N2` - Number with 2 decimals (1,234.56)
- `P0` - Percentage without decimals (12%)
- `P2` - Percentage with 2 decimals (12.34%)

## Enable Module Features

Inject optional modules to extend functionality:

### Enable Grouping Bar

```typescript
import { PivotView, IDataSet, GroupingBar } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

// Inject module
PivotView.Inject(GroupingBar);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    showGroupingBar: true,  // Enable grouping bar
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Enable Field List

```typescript
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

// Inject module
PivotView.Inject(FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    showFieldList: true,  // Enable field list
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Enable Calculated Fields

```typescript
import { PivotView, IDataSet, CalculatedField, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

// Inject modules
PivotView.Inject(CalculatedField, FieldList);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [
            { name: 'Sold' },
            { name: 'Total', caption: 'Total Units', type: 'CalculatedField' }
        ],
        calculatedFieldSettings: [
            { name: 'Total', formula: '"Sum(Amount)"+"Sum(Sold)"' }
        ]
    },
    showFieldList: true,
    allowCalculatedField: true,  // Enable calculated field dialog
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Available Modules

- `GroupingBar` - Drag-and-drop field management
- `FieldList` - Interactive field list panel
- `CalculatedField` - Create custom calculated fields
- `Toolbar` - Toolbar with action buttons
- `PivotChart` - Chart visualization
- `ExcelExport` - Export to Excel
- `PDFExport` - Export to PDF
- `ConditionalFormatting` - Value-based formatting
- `NumberFormatting` - Number format dialog

## Run the Application

If using the quickstart template:

```bash
npm start
```

The application will compile and open in your browser at `http://localhost:8080`.

**Expected output:** A fully functional pivot table with your configured rows, columns, values, and any enabled features (grouping bar, field list, etc.).

## Troubleshooting

### Pivot Table Not Rendering

**Issue:** Empty container, no pivot table visible

**Solutions:**
1. Verify the div ID matches: `<div id="PivotTable"></div>` and `appendTo('#PivotTable')`
2. Check that Syncfusion CSS is imported correctly
3. Ensure dataSource is assigned: `dataSource: pivotData as IDataSet[]`
4. Check browser console for errors

### Module Features Not Working

**Issue:** Field list, grouping bar, or other features don't appear

**Solutions:**
1. Verify module injection: `PivotView.Inject(FieldList, GroupingBar);`
2. Check that the feature is enabled: `showFieldList: true`
3. Ensure modules are imported: `import { PivotView, FieldList } from '@syncfusion/ej2-pivotview';`

### Data Not Displaying

**Issue:** Pivot table renders but shows no data

**Solutions:**
1. Verify field names match data source exactly (case-sensitive)
2. Check that at least one field is in rows, columns, and values
3. Ensure data source is not empty
4. Verify data format matches IDataSet interface

### Formatting Not Applied

**Issue:** formatSettings not working

**Solutions:**
1. Verify the field name in formatSettings matches the value field name exactly
2. Formatting only works on numeric fields in the values axis
3. Check format code syntax: `{ name: 'Amount', format: 'C0' }`

### Webpack Build Errors

**Issue:** Build fails or module not found errors

**Solutions:**
1. Run `npm install` to ensure all dependencies are installed
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check webpack.config.js configuration
4. Ensure Node.js version is v14.15.0 or higher

### IE11 Compatibility Issues

**Issue:** Pivot table doesn't work in Internet Explorer 11

**Solutions:**
1. Add ES6 polyfill: `<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>`
2. Ensure polyfills are loaded before Syncfusion scripts
3. Consider recommending modern browsers to users

---

**Next Steps:**
- Explore data binding options (JSON, CSV, remote sources)
- Add filtering and sorting capabilities
- Enable drill-down operations
- Integrate pivot charts for visualization
- Configure export features (Excel, PDF)

# Getting Started with Syncfusion JavaScript Grid

## Table of Contents
- [Installation](#installation)
- [Setup for Local Development](#setup-for-local-development)
- [Adding Syncfusion Grid Packages](#adding-syncfusion-grid-packages)
- [CSS References](#css-references)
- [Basic Grid Setup](#basic-grid-setup)
- [Module Injection](#module-injection)
- [First Grid Example](#first-grid-example)

## When to Use This Reference

- Set up grid component for the first time
- Install required packages and dependencies
- Configure development environment and build tools
- Create basic grid implementation with sample data
- Understand module injection and CSS requirements

## Installation

The Syncfusion EJ2 Grid is available through the npm package registry. Before installation, ensure you have Node.js and npm installed on your machine.

### Install via npm

```bash
npm install @syncfusion/ej2-grids --save
```

The `--save` flag adds the package to your project's `package.json` dependencies.

### Verify Installation

After installation, verify that the package is included in your `package.json`:

```json
{
  "dependencies": {
    "@syncfusion/ej2-grids": "latest"
  }
}
```

## Setup for Local Development

### Using Vite (Recommended)

Vite provides faster development environments with smaller bundle sizes compared to traditional tools.

```bash
npm create vite@latest my-grid-app -- --template vanilla-ts
cd my-grid-app
npm run dev
```

### Using TypeScript with npm

For traditional TypeScript project setup:

```bash
mkdir my-grid-app
cd my-grid-app
npm init -y
npm install typescript ts-node @types/node --save-dev
npm install @syncfusion/ej2-grids
```

### Using Webpack

For Webpack-based TypeScript projects:

```bash
npm install webpack webpack-cli webpack-dev-server typescript ts-loader --save-dev
npm install @syncfusion/ej2-grids
```

## Adding Syncfusion Grid Packages

Install the grid package along with required dependencies:

```bash
npm install @syncfusion/ej2-grids @syncfusion/ej2-base --save
```

## CSS References

> **CSS Quick Reference:** Always import **all** required Syncfusion CSS files in your main CSS file or HTML. Each feature depends on a specific package's CSS:
> - **Pager** (page number buttons, navigation) → `@syncfusion/ej2-grids/styles/material3.css` — **missing this is the most common cause of unstyled pagers**
> - **Toolbar** → `@syncfusion/ej2-navigations/styles/material3.css`
> - **Filter/Edit inputs** → `@syncfusion/ej2-inputs/styles/material3.css`
> - **Dialog editing, filter menus** → `@syncfusion/ej2-popups/styles/material3.css`

The Grid component requires CSS files for styling. Add the following imports to your main CSS file or HTML file:

### Material 3 Theme (Default)

```css
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';  
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';  
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';  
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/material3.css';  
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';  
@import '../node_modules/@syncfusion/ej2-navigations/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-notifications/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-grids/styles/material3.css';
```

Or link CSS in your HTML:

```html
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-base/styles/material3.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-buttons/styles/material3.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-calendars/styles/material3.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-dropdowns/styles/material3.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-inputs/styles/material3.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-navigations/styles/material3.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-popups/styles/material3.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-notifications/styles/material3.css" />
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-grids/styles/material3.css" />
```

### Other Available Themes

- Bootstrap: `bootstrap.css`
- Fabric: `fabric.css`
- Bootstrap 5: `bootstrap5.css`
- Material: `material.css`
- Tailwind CSS: `tailwind.css`

## Basic Grid Setup

### Minimal Grid Component

```ts
import { Grid } from '@syncfusion/ej2-grids';

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#grid');
```

### HTML Container

Create an HTML element to hold the grid:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@syncfusion/ej2-grids/styles/material3.css" />
</head>
<body>
  <div id="grid"></div>
  <script src="app.ts"></script>
</body>
</html>
```

## Module Injection

JavaScript Grid features are modular and require injection to enable them. This reduces bundle size by loading only needed features.

### Inject Services

```ts
import { Grid, Page, Sort, Filter, Group, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, Group);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true
});

grid.appendTo('#grid');
```

### Common Modules

| Module | Purpose | Import |
|--------|---------|--------|
| `Page` | Enable paging | `import { Page } from '@syncfusion/ej2-grids'` |
| `Sort` | Enable sorting | `import { Sort } from '@syncfusion/ej2-grids'` |
| `Filter` | Enable filtering | `import { Filter } from '@syncfusion/ej2-grids'` |
| `Group` | Enable grouping | `import { Group } from '@syncfusion/ej2-grids'` |
| `Edit` | Enable editing | `import { Edit } from '@syncfusion/ej2-grids'` |
| `Aggregate` | Enable aggregates | `import { Aggregate } from '@syncfusion/ej2-grids'` |
| `ExcelExport` | Enable Excel export | `import { ExcelExport } from '@syncfusion/ej2-grids'` |
| `PdfExport` | Enable PDF export | `import { PdfExport } from '@syncfusion/ej2-grids'` |
| `Scroll` | Virtual scrolling | Built-in |

## First Grid Example

```ts
import { Grid, Page, Sort, Filter, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, Toolbar);

const data = [
  {
    OrderID: 10248,
    CustomerID: 'VINET',
    EmployeeID: 5,
    OrderDate: new Date(1996, 6, 4),
    Freight: 32.38,
    ShipCountry: 'France'
  },
  {
    OrderID: 10249,
    CustomerID: 'TOMSP',
    EmployeeID: 6,
    OrderDate: new Date(1996, 6, 5),
    Freight: 11.61,
    ShipCountry: 'Germany'
  },
  {
    OrderID: 10250,
    CustomerID: 'HANAR',
    EmployeeID: 4,
    OrderDate: new Date(1996, 6, 8),
    Freight: 65.83,
    ShipCountry: 'Brazil'
  }
];

const grid = new Grid({
  dataSource: data,
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  pageSettings: { pageSize: 10 },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, textAlign: 'Right' },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date', format: 'yMd' },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2', textAlign: 'Right' },
    { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
  ]
});

grid.appendTo('#grid');
```
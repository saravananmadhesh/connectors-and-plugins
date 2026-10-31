# Getting Started with TypeScript TreeGrid

## Table of Contents
- [When to Use This Reference](#when-to-use-this-reference)
- [Dependencies](#dependencies)
- [Set Up Development Environment](#set-up-development-environment)
- [Add Syncfusion JavaScript Packages](#add-syncfusion-javascript-packages)
- [Import CSS Styles](#import-css-styles)
- [Add TreeGrid Component](#add-treegrid-component)
- [Data Binding Approaches](#data-binding-approaches)
- [Module Injection](#module-injection)
- [Enable Core Features](#enable-core-features)
- [Run the Application](#run-the-application)
- [Handle Errors](#handle-errors)

## When to Use This Reference

Use this reference when:
- Setting up a new TreeGrid project from scratch with TypeScript/JavaScript
- Configuring data source and column mappings
- Enabling core features like paging, sorting, and filtering
- Integrating TreeGrid into a TypeScript quickstart environment
- Troubleshooting initialization and configuration errors

## Dependencies

The TreeGrid component requires the following npm packages:

```
@syncfusion/ej2-treegrid
├── @syncfusion/ej2-grids
│   ├── @syncfusion/ej2-base
│   ├── @syncfusion/ej2-data
│   └── @syncfusion/ej2-popups
```

Install the complete package suite: `@syncfusion/ej2` or individual packages.

## Set Up Development Environment

Clone the Syncfusion quickstart project and install dependencies:

```bash
git clone github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
npm install
```

The quickstart is pre-configured with webpack and includes `@syncfusion/ej2` in `package.json`.

## Add Syncfusion JavaScript Packages

The quickstart includes Syncfusion packages. If using individual packages, install TreeGrid:

```bash
npm install @syncfusion/ej2-treegrid
```

## Import CSS Styles

Add the theme CSS to `~/src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2/material.css";
```

Available themes: `material.css`, `bootstrap.css`, `fabric.css`, `highcontrast.css`.

## Add TreeGrid Component

### TypeScript Setup (index.ts)

Define hierarchical data with parent-child relationships using `childMapping`:

```typescript
import { TreeGrid } from '@syncfusion/ej2-treegrid';

let sampleData: Object[] = [
  {
    taskID: 1,
    taskName: 'Planning',
    startDate: new Date('02/03/2017'),
    endDate: new Date('02/07/2017'),
    progress: 100,
    duration: 5,
    priority: 'Normal',
    approved: false,
    subtasks: [
      { taskID: 2, taskName: 'Plan timeline', duration: 5, progress: 100 },
      { taskID: 3, taskName: 'Plan budget', duration: 5, progress: 100 }
    ]
  },
  {
    taskID: 6,
    taskName: 'Design',
    startDate: new Date('02/10/2017'),
    endDate: new Date('02/14/2017'),
    duration: 3,
    progress: 86,
    priority: 'High',
    approved: false,
    subtasks: [
      { taskID: 7, taskName: 'Software Specification', duration: 3, progress: 60 },
      { taskID: 8, taskName: 'Develop prototype', duration: 3, progress: 100 }
    ]
  }
];

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  childMapping: 'subtasks',
  treeColumnIndex: 1,
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 70, textAlign: 'Right' },
    { field: 'taskName', headerText: 'Task Name', width: 200, textAlign: 'Left' },
    { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
    { field: 'endDate', headerText: 'End Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
    { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
    { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
  ],
  height: 380
});

treeGridObj.appendTo('#TreeGrid');
```

**Key Properties:**
- `dataSource`: Hierarchical data with parent-child nesting
- `childMapping`: Property name containing child records (e.g., 'subtasks')
- `treeColumnIndex`: Column index where expand/collapse arrows appear
- `columns`: Field mappings and display configuration

### HTML Setup (index.html)

Add a div element to render the TreeGrid:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>TreeGrid</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body>
    <div id="TreeGrid"></div>
</body>
</html>
```

## Data Binding Approaches

### Hierarchical Data (childMapping)

For data with nested child properties:

```typescript
let hierarchicalData: Object[] = [
  {
    taskID: 1,
    taskName: 'Planning',
    subtasks: [
      { taskID: 2, taskName: 'Identify Requirements' },
      { taskID: 3, taskName: 'Prepare Budget' }
    ]
  }
];

let treeGrid = new TreeGrid({
  dataSource: hierarchicalData,
  childMapping: 'subtasks',
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90 },
    { field: 'taskName', headerText: 'Task Name', width: 150 }
  ]
});
```

### Flat Data (idMapping + parentIdMapping)

For self-referencing data using parent ID relationships:

```typescript
let flatData: Object[] = [
  { taskID: 1, parentID: null, taskName: 'Planning' },
  { taskID: 2, parentID: 1, taskName: 'Sub-task 1' },
  { taskID: 3, parentID: 1, taskName: 'Sub-task 2' },
  { taskID: 4, parentID: 2, taskName: 'Child of Sub-task 1' }
];

let treeGrid = new TreeGrid({
  dataSource: flatData,
  idMapping: 'taskID',
  parentIdMapping: 'parentID',
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90 },
    { field: 'taskName', headerText: 'Task Name', width: 150 }
  ]
});
```

**Use `childMapping` for nested arrays; use `idMapping + parentIdMapping` for flat structures with parent references.**

## Module Injection

TreeGrid requires specific modules for features to work. Inject using `TreeGrid.Inject()`:

```typescript
import { TreeGrid, Page, Sort, Filter, ExcelExport, PdfExport } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Page, Sort, Filter, ExcelExport, PdfExport);

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  childMapping: 'subtasks',
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  columns: [...]
});
```

**Available Modules:**
- `Page`: Enable paging feature
- `Sort`: Enable sorting on column headers
- `Filter`: Enable filter bar
- `ExcelExport`: Export to Excel format
- `PdfExport`: Export to PDF format

## Enable Core Features

### Enable Paging

```typescript
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Page);

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  childMapping: 'subtasks',
  treeColumnIndex: 1,
  allowPaging: true,
  pageSettings: { pageSize: 7 },
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
    { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
    { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
    { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
  ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Enable Sorting

```typescript
import { TreeGrid, Sort, Page } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Sort, Page);

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sortData,
  childMapping: 'subtasks',
  treeColumnIndex: 1,
  allowSorting: true,
  sortSettings: { columns: [{ field: 'Category', direction: 'Ascending' }] },
  allowPaging: true,
  columns: [
    { field: 'Category', headerText: 'Category', width: 150 },
    { field: 'orderName', headerText: 'Order Name', width: 170 },
    { field: 'orderDate', headerText: 'Order Date', width: 130, type: 'date', format: 'yMd' },
    { field: 'price', headerText: 'Price', width: 100, format: 'C0' }
  ],
  height: 260
});

treeGridObj.appendTo('#TreeGrid');
```

### Enable Filtering

```typescript
import { TreeGrid, Filter, Page, Sort } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Filter, Page, Sort);

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  childMapping: 'subtasks',
  treeColumnIndex: 1,
  allowFiltering: true,
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
    { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
    { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
    { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
  ],
  pageSettings: { pageSize: 11 },
  allowPaging: true,
  allowSorting: true
});

treeGridObj.appendTo('#TreeGrid');
```

## Run the Application

Start the development server:

```bash
npm run start
```

The application compiles and runs in the browser at the configured local server address.

## Handle Errors

Use the `actionFailure` event to capture and display configuration errors:

```typescript
import { TreeGrid, Edit } from '@syncfusion/ej2-treegrid';

TreeGrid.Inject(Edit);

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  childMapping: 'subtasks',
  treeColumnIndex: 1,
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
    { field: 'taskName', headerText: 'Task Name', width: 180 },
    { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
    { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
  ],
  height: 270,
  actionFailure: (e: any) => {
    let span: HTMLElement = document.createElement('span');
    treeGridObj.element.parentNode.insertBefore(span, treeGridObj.element);
    span.style.color = '#FF0000';
  }
});

treeGridObj.appendTo('#TreeGrid');
```

**Common Errors:**
- `isPrimaryKey` not configured for CRUD operations
- `childMapping` and `idMapping` enabled simultaneously (use one or the other)
- `paging` with `virtualization` (incompatible combination)
- `dataSource` or `columns` not mapped (required for rendering)
- `treeColumnIndex` value exceeds total column count


# Getting Started with Syncfusion Gantt Chart

## Table of Contents
- [Dependencies](#dependencies)
- [Setup & Installation](#setup--installation)
- [Basic Gantt Initialization](#basic-gantt-initialization)
- [taskFields Mapping](#taskfields-mapping)
- [Module Injection](#module-injection)
- [Enabling Editing, Filtering, Sorting](#enabling-editing-filtering-sorting)
- [Error Handling](#error-handling)

---

## Dependencies

Install the Gantt package (includes all required sub-packages):

```bash
npm install @syncfusion/ej2-gantt
```

Key peer dependencies bundled with `@syncfusion/ej2-gantt`:
```
@syncfusion/ej2-base, ej2-data, ej2-grids, ej2-treegrid,
ej2-inputs, ej2-calendars, ej2-dropdowns, ej2-popups,
ej2-navigations, ej2-richtexteditor, ej2-excel-export, ej2-pdf-export
```

Or install the full suite:
```bash
npm install @syncfusion/ej2
```

---

## Setup & Installation

### Project Setup

Initialize a new TypeScript project or use an existing one:

```bash
npm init -y
npm install @syncfusion/ej2-gantt
npm install --save-dev typescript webpack webpack-cli ts-loader
```

### Import CSS theme

Install the **Tailwind 3** theme package using the following command:

```bash
npm install @syncfusion/ej2-tailwind3-theme --save
```

Then add the following CSS reference to the `~/src/styles/styles.css`:

```css
@import "./node_modules/@syncfusion/ej2-tailwind3-theme/styles/gantt/index.css";
```
For other themes, replace `ej2-tailwind3-theme` with your chosen theme package: `ej2-material3-theme`, `ej2-bootstrap5-theme`, `ej2-fluent-theme`.

---

## Basic Gantt Initialization

**app.ts:**
```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: [
        {
            TaskID: 1,
            TaskName: 'Project Initiation',
            StartDate: new Date('04/02/2024'),
            EndDate: new Date('04/21/2024'),
            subtasks: [
                { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2024'), Duration: 0, Progress: 50 },
                { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2024'), Duration: 4, Progress: 50 },
                { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2024'), Duration: 4, Predecessor: '2FS', Progress: 50 }
            ]
        }
    ],
    height: '450px',
    taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    }
});
gantt.appendTo('#Gantt');
```

**index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Syncfusion Gantt Chart</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <div id="Gantt"></div>
</body>
</html>
```

Run the app:
```bash
npm start
```

---

## taskFields Mapping

Map your data source fields to Gantt using `taskFields`:

```typescript
taskFields: {
    id: 'TaskID',             // Unique task identifier (required)
    name: 'TaskName',         // Task display name
    startDate: 'StartDate',   // Task start date
    endDate: 'EndDate',       // Task end date
    duration: 'Duration',     // Duration (in days by default)
    progress: 'Progress',     // Percentage complete (0-100)
    dependency: 'Predecessor',// Dependency string e.g. '2FS', '3SS+2d'
    child: 'subtasks',        // Child records field (hierarchical data)
    parentID: 'ParentId',     // Parent ID field (flat/self-referential data)
    resourceInfo: 'resources',// Resource assignments
    work: 'Work',             // Work hours field
    notes: 'Notes',           // Task notes
    baselineStartDate: 'BaselineStartDate',
    baselineEndDate: 'BaselineEndDate',
    indicators: 'Indicators', // Data markers / indicators
    segments: 'Segments',     // Split task segments
    constraintType: 'ConstraintType',
    constraintDate: 'ConstraintDate',
    manual: 'IsManual'        // Manual scheduling flag (for Custom taskMode)
}
```

> **Tip:** Only map the fields you actually use. Unmapped fields are ignored.

---

## Module Injection

Gantt uses a modular architecture. Inject only the modules you need:

```typescript
import {
    Gantt,
    Edit,           // Cell/Dialog/Taskbar editing
    Filter,         // Filtering
    Sort,           // Sorting
    Toolbar,        // Toolbar with built-in actions
    Selection,      // Row/cell selection
    DayMarkers,     // Event markers, holidays
    Reorder,        // Column reordering
    Resize,         // Column resizing
    ColumnMenu,     // Column header menu
    ExcelExport,    // Excel export
    PdfExport,      // PDF export
    VirtualScroll,  // Virtual scrolling for large data
    ContextMenu,    // Right-click context menu
    UndoRedo        // Undo and redo actions
} from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Filter, Sort, Toolbar, Selection, DayMarkers, Reorder, Resize, ExcelExport, PdfExport);
```

> Injecting unused modules adds unnecessary bundle weight — only inject what the feature requires.

---

## Enabling Editing, Filtering, Sorting

```typescript
import { Gantt, Edit, Filter, Sort, Toolbar } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Filter, Sort, Toolbar);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', child: 'subtasks'
    },
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search'],
    editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        mode: 'Auto'   // 'Auto' = cell edit | 'Dialog' = dialog edit
    },
    allowSorting: true,
    allowFiltering: true
});
gantt.appendTo('#Gantt');
```

---

## Error Handling

Use the `actionFailure` event to catch and display runtime errors:

```typescript
let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', child: 'subtasks'
    },
    height: '450px',
    actionFailure(args: any) {
        let span = document.createElement('span');
        gantt.element.parentNode.insertBefore(span, gantt.element);
        span.style.color = '#FF0000';
        span.innerHTML = args.error[0];
    }
});
gantt.appendTo('#Gantt');
```

**Common actionFailure scenarios:**
| Cause | Fix |
|-------|-----|
| Invalid `duration` value (non-numeric) | Ensure duration is a number |
| Invalid dependency string (e.g. `'2XY'`) | Use valid format: `'2FS'`, `'3SS+2d'` |
| `isPrimaryKey` not mapped | Map `taskFields.id` or set `isPrimaryKey: true` on a column |
| Invalid date format in timeline | Use valid date format strings |
| `hasChildMapping` missing for load-on-demand | Map `taskFields.hasChildMapping` |
| Invalid day in eventMarkers | Provide a valid `day` value in each event marker |

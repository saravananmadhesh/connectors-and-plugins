# State Persistence in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Enable Persistence](#enable-persistence)
- [Get / Set Persisted State](#get--set-persisted-state)
- [Prevent Specific Properties from Persisting](#prevent-specific-properties-from-persisting)
- [Persist Header Template and Header Text](#persist-header-template-and-header-text)

---

## Overview

State persistence saves the Gantt's model state in `localStorage`, so it survives browser refreshes and page navigation.

## Enable Persistence

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    enablePersistence: true    // saves state in localStorage
});
gantt.appendTo('#Gantt');
```

**Persisted state includes**: Filtering, Sorting, Columns (width, visibility, order).

**Not persisted**: Column templates, formatters, header text customizations, value accessors.

---

## Get / Set Persisted State

The localStorage key is `"gantt" + element ID` (e.g., `"ganttGantt"` for `#Gantt`):

```typescript
// Get the persisted Gantt model
const value = window.localStorage.getItem('ganttGantt');
const model = JSON.parse(value);

// Set/override the persisted Gantt model
window.localStorage.setItem('ganttGantt', JSON.stringify(model));
```

---

## Prevent Specific Properties from Persisting

Use `addOnPersist` override in `dataBound` to exclude specific keys:

```typescript
let gantt: Gantt = new Gantt({
    enablePersistence: true,
    dataBound: function () {
        const cloned = this.addOnPersist;
        this.addOnPersist = function (key: string[]) {
            key = key.filter((item) => item !== 'columns');  // exclude 'columns'
            return cloned.call(this, key);
        };
    }
});
```

**Available persistence keys**: `'columns'`, `'filterSettings'`, `'sortSettings'`, `'searchSettings'`


---

## Persist Header Template and Header Text

By default, column template, header text, header template, column formatter, and value accessor are **not persisted** even when `enablePersistence` is `true`, since these are typically defined at the application level.

To restore these properties, clone the column state using `Object.assign`, then manually re-apply the non-persisted properties when restoring via `getPersistData()` and `gantt.treeGrid.setProperties()`:

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    columns: [
        { field: 'TaskID', headerText: 'Task ID', width: 120 },
        { field: 'TaskName', headerText: 'Task Name', width: 150, headerTemplate: '#customertemplate' },
        { field: 'StartDate', headerText: 'Start Date', width: 150 },
        { field: 'Duration', headerText: 'Duration', width: 150 },
        { field: 'Progress', headerText: 'Progress', width: 150 }
    ],
    enablePersistence: true
});
gantt.appendTo('#Gantt');

document.getElementById('restore').addEventListener('click', () => {
    let savedProperties: any = JSON.parse(gantt.getPersistData());

    // Clone current column state (includes template, headerTemplate, etc.)
    const gridColumnsState = Object.assign([], gantt.ganttColumns);

    savedProperties.columns.forEach((col: any) => {
        // Re-apply non-persisted properties from the live column state
        const match = gridColumnsState.find((c: any) => c.field === col.field);
        if (match) {
            col.headerText     = match.headerText;      // restore custom header text
            col.template       = match.template;        // restore cell template
            col.headerTemplate = match.headerTemplate;  // restore header template
        }
    });

    // Apply the merged state back to the Gantt
    gantt.treeGrid.setProperties(savedProperties);
});
```

> Use `gantt.getPersistData()` to retrieve the currently persisted JSON string. Merge application-level column properties before calling `setProperties` to avoid losing custom templates after restore.

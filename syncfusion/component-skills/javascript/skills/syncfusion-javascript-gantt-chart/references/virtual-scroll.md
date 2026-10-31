# Virtual Scrolling in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Row Virtualization](#row-virtualization)
- [Timeline Virtualization](#timeline-virtualization)
- [Get Filtered Data with Virtual Scrolling](#get-filtered-data-when-virtual-scrolling-is-enabled)
- [Limitations](#limitations)
- [Key Properties](#key-properties)

---

## Overview

Virtual scrolling renders only the rows and timeline cells visible in the viewport, enabling large datasets with high performance.

**Module required**: `VirtualScroll`

## Row Virtualization

Renders a large number of tasks with only the visible rows in the DOM:

```typescript
import { Gantt, Selection, VirtualScroll } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection, VirtualScroll);

let gantt: Gantt = new Gantt({
    dataSource: virtualData,      // large dataset
    treeColumnIndex: 1,
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', parentID: 'parentID'
    },
    enableVirtualization: true,   // enable row virtualization
    columns: [
        { field: 'TaskID' },
        { field: 'TaskName' },
        { field: 'StartDate' },
        { field: 'Duration' },
        { field: 'Progress' }
    ],
    allowSelection: true,
    gridLines: 'Both',
    height: '450px',
    splitterSettings: { columnIndex: 2 },
    labelSettings: { taskLabel: 'Progress' }
});
gantt.appendTo('#Gantt');
```

---

## Timeline Virtualization

Renders timeline cells on-demand during horizontal scrolling for large timespans:

```typescript
let gantt: Gantt = new Gantt({
    enableVirtualization: true,
    enableTimelineVirtualization: true,   // on-demand horizontal timeline rendering
    taskFields: { /* ... */ }
});
```

> Timeline virtualization initially renders 3x the chart viewport width; remaining cells load during horizontal scroll.

---

## Get Filtered Data When Virtual Scrolling is Enabled

When virtual scrolling is enabled, the DOM only renders visible rows — so `args.rows` from filter events doesn't reflect the full filtered dataset. Use `gantt.treeGrid.filterModule.filteredResult` in `actionComplete` to get the accurate filtered record count, and `gantt.flatData` for the total dataset count:

```typescript
import { Gantt, Selection, VirtualScroll, Sort, Filter } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection, VirtualScroll, Sort, Filter);

let filteredCount: number = 0;
let datasetCount: number;

let gantt: Gantt = new Gantt({
    dataSource: virtualData,
    treeColumnIndex: 1,
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', parentID: 'parentID'
    },
    enableVirtualization: true,
    allowSorting: true,
    allowFiltering: true,
    columns: [
        { field: 'TaskID' }, { field: 'TaskName' },
        { field: 'StartDate' }, { field: 'Duration' }, { field: 'Progress' }
    ],
    allowSelection: true,
    gridLines: 'Both',
    height: '450px',
    splitterSettings: { columnIndex: 2 },
    labelSettings: { taskLabel: 'Progress' },
    created: function () {
        datasetCount = gantt.flatData.length;    // total records in the dataset
        console.log('Total records:', datasetCount);
    },
    actionComplete: function (args: any) {
        if (args.requestType === 'filtering' && args.rows != null) {
            // filteredResult gives the true filtered count regardless of virtual rendering
            filteredCount = gantt.treeGrid.filterModule.filteredResult.length;
            console.log(`Dataset: ${datasetCount}, Filtered: ${filteredCount}`);
        }
    }
});
gantt.appendTo('#Gantt');
```

---

## Limitations

- **Browser element height limit**: Maximum records are capped by the browser's DOM height constraint.
- **Cell selection not persisted**: Selection state is lost on scroll due to on-demand rendering.
- **Height must be in pixels**: The Gantt `height` property must be set in pixels (not `%`) when virtual scrolling is enabled.
- **Row count depends on height**: The number of rendered rows is determined by the `height` property value.
- **Multi-taskbar not supported**: Virtual scroll does not support multi-taskbar in Resource View.

---

## Key Properties

| Property | Description |
|----------|-------------|
| `enableVirtualization` | Enable row virtualization |
| `enableTimelineVirtualization` | Enable on-demand horizontal timeline rendering |

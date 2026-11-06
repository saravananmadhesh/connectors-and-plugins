# Loading Animation in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Indicator Types](#indicator-types)
- [Usage](#usage)

## Overview

The loading indicator displays a visual overlay while the Gantt is fetching data or performing operations like sorting and filtering. Two indicator types are available: **Spinner** (default) and **Shimmer**.

## Indicator Types

| Type | Description |
|------|-------------|
| `Spinner` | Default. Classic spinner animation. |
| `Shimmer` | Skeleton shimmer effect — recommended with virtual scrolling for a smoother UX. |

## Usage

```typescript
import { Gantt, Sort, Selection, VirtualScroll, Filter } from '@syncfusion/ej2-gantt';

Gantt.Inject(Sort, Selection, VirtualScroll, Filter);

let gantt: Gantt = new Gantt({
    dataSource: virtualData,
    height: '450px',
    allowSorting: true,
    allowFiltering: true,
    enableVirtualization: true,
    loadingIndicator: { indicatorType: 'Shimmer' },   // or 'Spinner'
    taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: 'parentID'
    },
    columns: [
        { field: 'TaskID' },
        { field: 'TaskName' },
        { field: 'StartDate' },
        { field: 'Duration' },
        { field: 'Progress' }
    ]
});
gantt.appendTo('#Gantt');
```

> The Shimmer indicator is especially useful with `enableVirtualization: true` because it provides visual feedback while new rows are being rendered during scroll.

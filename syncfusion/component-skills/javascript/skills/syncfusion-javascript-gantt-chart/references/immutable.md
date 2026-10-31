# Immutable Mode in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Requirements](#requirements)
- [Basic Usage](#basic-usage)
- [Limitations](#limitations)

## Overview

Immutable mode optimizes re-rendering performance by using object reference and deep compare techniques. Only modified or newly added rows are re-rendered — unchanged rows are skipped entirely.

## Requirements

- Must provide an `isPrimaryKey` column so Gantt can identify which rows changed.
- `enableImmutableMode: true` on the Gantt.

## Basic Usage

```typescript
import { Gantt, Toolbar, Edit } from '@syncfusion/ej2-gantt';

Gantt.Inject(Toolbar, Edit);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    enableImmutableMode: true,    // enable immutable optimization
    taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: 'ParentID'
    },
    columns: [
        { field: 'TaskID', isPrimaryKey: true },   // required for immutable mode
        { field: 'TaskName' },
        { field: 'StartDate' },
        { field: 'Duration' },
        { field: 'Progress' }
    ],
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Indent', 'Outdent'],
    editSettings: {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    }
});
gantt.appendTo('#Gantt');
```

---

## Limitations

The following features are **not supported** when `enableImmutableMode` is `true`:

| Feature | Status |
|---------|--------|
| Column reordering | ❌ Not supported |
| Virtualization | ❌ Not supported |

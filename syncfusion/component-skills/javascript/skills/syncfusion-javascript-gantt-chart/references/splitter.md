# Splitter in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Position Configuration](#position-configuration)
- [View Modes](#view-modes)
- [Dynamic Splitter Positioning](#dynamic-splitter-positioning)
- [Splitter Events](#splitter-events)

## Overview

The splitter divides the TreeGrid (left) and Chart (right) panels. By default, both panels are visible with equal width.

## Position Configuration

Set `splitterSettings.position` (px or %) or `splitterSettings.columnIndex` to align the splitter to a column edge:

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    splitterSettings: {
        position: '50%'          // percentage: '50%' | pixel: '300px'
        // columnIndex: 2        // align splitter after column index 2 (mutually exclusive with position)
    }
});
gantt.appendTo('#Gantt');
```

> If both `position` and `columnIndex` are defined, `position` takes precedence.

---

## View Modes

Show only the TreeGrid or only the Chart panel:

```typescript
splitterSettings: {
    view: 'Default'   // 'Default' (both) | 'Grid' (TreeGrid only) | 'Chart' (Chart only)
}
```

| View | Description |
|------|-------------|
| `'Default'` | Both TreeGrid and Chart visible |
| `'Grid'` | Only TreeGrid visible (data-focused) |
| `'Chart'` | Only Chart visible (timeline-focused) |

---

## Dynamic Splitter Positioning

```typescript
// Set splitter position programmatically
gantt.setSplitterPosition('30%', 'percentage');  // 'percentage' | 'position' | 'columnIndex'
gantt.setSplitterPosition('300px', 'position');
gantt.setSplitterPosition(2, 'columnIndex');
```

---

## Splitter Events

| Event | Description |
|-------|-------------|
| `splitterResizeStart` | Fires when user starts dragging the splitter |
| `splitterResizing` | Fires continuously during splitter drag |
| `splitterResized` | Fires when splitter drag ends |

# Scrolling in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Set Width and Height](#set-width-and-height)
- [Responsive with Parent Container](#responsive-with-parent-container)
- [Scroll to a Date](#scroll-to-a-date)
- [Set Vertical Scroll Position](#set-vertical-scroll-position)

## Overview

Scrollbars appear when content exceeds the Gantt element's dimensions. The vertical scrollbar appears when rows exceed the height; the horizontal scrollbar when column widths exceed the grid pane.

## Set Width and Height

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '350px',    // pixel value (default: 'auto')
    width: '600px',     // pixel value (default: 'auto')
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' }
});
gantt.appendTo('#Gantt');
```

## Responsive with Parent Container

Set `100%` to make the Gantt fill its parent. The parent element must have an explicit height:

```typescript
let gantt: Gantt = new Gantt({
    height: '100%',
    width: '100%'
});
```

```css
/* Parent container must have explicit height */
#ganttContainer {
    height: 500px;
    width: 100%;
}
```

---

## Scroll to a Date

Horizontally scroll the chart timeline to a specific date:

```typescript
import { Gantt, Edit, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Selection);

let gantt: Gantt = new Gantt({ /* config */ });
gantt.appendTo('#Gantt');

// Scroll to a specific date
gantt.scrollToDate('05/27/2019');
```

---

## Set Vertical Scroll Position

Programmatically set the vertical scroll position (top offset in pixels):

```typescript
gantt.ganttChartModule.scrollObject.setScrollTop(300);
```

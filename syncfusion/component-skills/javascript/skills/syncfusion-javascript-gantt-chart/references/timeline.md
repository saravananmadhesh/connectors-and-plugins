# Timeline & Zooming in Syncfusion Gantt Chart

## Table of Contents
- [Timeline View Modes](#timeline-view-modes)
- [Top Tier and Bottom Tier](#top-tier-and-bottom-tier)
- [Timeline Cell Width](#timeline-cell-width)
- [Timeline View Dates](#timeline-view-dates)
- [Week Start Day](#week-start-day)
- [Show/Hide Weekends](#showhide-weekends)
- [Auto Timescale Update](#auto-timescale-update)
- [Timeline Tooltip](#timeline-tooltip)
- [Timeline Template](#timeline-template)
- [Zooming](#zooming)
- [Infinite Timeline Scrolling](#infinite-timeline-scrolling)

## Timeline View Modes

Set the overall timeline view with `timelineSettings.timelineViewMode`:

| Mode | Top Tier | Bottom Tier |
|------|----------|-------------|
| `'Hour'` | Hours | Minutes |
| `'Day'` | Days | Hours |
| `'Week'` | Weeks | Days |
| `'Month'` | Months | Weeks |
| `'Year'` | Years | Months |

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    timelineSettings: {
        timelineViewMode: 'Week'    // 'Hour' | 'Day' | 'Week' | 'Month' | 'Year'
    }
});
gantt.appendTo('#Gantt');
```

---

## Top Tier and Bottom Tier

Customize each timeline tier independently with `unit`, `format`, `count`, and `formatter`:

```typescript
timelineSettings: {
    topTier: {
        unit: 'Month',      // timeline unit
        format: 'MMM',      // date format string
        count: 3            // combine 3 months as one cell (quarterly)
    },
    bottomTier: {
        unit: 'Day',
        format: 'dd',
        count: 1
    },
    timelineUnitSize: 33    // width of each bottom tier cell in px
}
```

### Custom Formatter

Use `formatter` to return completely custom text for each timeline cell:

```typescript
timelineSettings: {
    topTier: {
        unit: 'Month',
        count: 3,
        formatter: (date: Date) => {
            const month = date.getMonth();
            if (month <= 2) return 'Q1';
            if (month <= 5) return 'Q2';
            if (month <= 8) return 'Q3';
            return 'Q4';
        }
    },
    bottomTier: {
        unit: 'Month',
        format: 'MMM'
    }
}
```

**Tier unit options**: `'Hour'` | `'Day'` | `'Week'` | `'Month'` | `'Year'`

---

## Timeline Cell Width

Control the width of each bottom-tier cell using `timelineUnitSize` (top-tier is calculated automatically):

```typescript
timelineSettings: {
    timelineUnitSize: 200   // pixel width per bottom-tier cell (default varies)
}
```

---

## Timeline View Dates

Lock the visible timeline range independently from `projectStartDate`/`projectEndDate`:

```typescript
let gantt: Gantt = new Gantt({
    taskFields: { /* ... */ },
    timelineSettings: {
        viewStartDate: new Date('04/03/2019'),  // start of visible range
        viewEndDate: new Date('04/07/2019')     // end of visible range
    },
    projectStartDate: new Date('03/31/2019'),   // full project range (for CPM, baselines)
    projectEndDate: new Date('04/13/2019')
});
```

**Auto-behavior when not set:**
- `viewStartDate` auto → uses `projectStartDate` or earliest task start
- `viewEndDate` auto → uses `projectEndDate` or max task end (extended to fill width)

> `ZoomToFit` uses `projectStartDate`/`projectEndDate` to fit all tasks.

---

## Week Start Day

Customize the first day of the week (default: `0` = Sunday):

```typescript
timelineSettings: {
    timelineViewMode: 'Week',
    weekStartDay: 1    // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
}
```

---

## Show/Hide Weekends

Remove weekend days from the timeline to focus on working days:

```typescript
timelineSettings: {
    showWeekend: false  // hide Saturday and Sunday from timeline
}
```

> **Limitations**: Not compatible with baselines, manual task mode, non-working hours exclusion, or holidays.

---

## Auto Timescale Update

Control whether the timeline auto-expands when tasks are dragged beyond the current range:

```typescript
import { Gantt, Edit } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit);

timelineSettings: {
    updateTimescaleView: false   // disable auto-expand (default: true)
}
```

---

## Timeline Tooltip

Show a tooltip when hovering over timeline cells:

```typescript
timelineSettings: {
    showTooltip: true   // default: true
}
```

---

## Timeline Template

Fully customize timeline cells with an HTML template. Available context properties: `date`, `value`, `tier` (`'top'` or `'bottom'`).

```typescript
// In HTML: <script id="TimelineTemplates" type="text/x-template">
//   <div class="timeline-cell ${tier}">
//     <span>${value}</span>
//   </div>
// </script>

let gantt: Gantt = new Gantt({
    timelineTemplate: '#TimelineTemplates',
    timelineSettings: {
        topTier: { unit: 'Week', format: 'dd/MM/yyyy' },
        bottomTier: { unit: 'Day', count: 1 },
        timelineUnitSize: 100
    }
});
```

---

## Zooming

Zoom in/out to see the project at different time scales (minute to decade).

**Module required**: `Toolbar`

```typescript
import { Gantt, Toolbar } from '@syncfusion/ej2-gantt';

Gantt.Inject(Toolbar);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', dependency: 'Predecessor', parentID: 'parentID' },
    toolbar: ['ZoomIn', 'ZoomOut', 'ZoomToFit'],
    projectStartDate: new Date('03/24/2019'),
    projectEndDate: new Date('04/28/2019')
});
gantt.appendTo('#Gantt');
```

### Zoom Methods

```typescript
gantt.zoomIn();         // increase timeline cell width / switch to finer unit
gantt.zoomOut();        // decrease timeline cell width / switch to coarser unit
gantt.fitToProject();   // fit all tasks within visible chart area
```

### Custom Zooming Levels

Override the default zoom levels with `zoomingLevels`. Set after `dataBound`:

```typescript
import { Gantt, Toolbar, ZoomTimelineSettings } from '@syncfusion/ej2-gantt';

Gantt.Inject(Toolbar);

const customZoomingLevels: ZoomTimelineSettings[] = [
    {
        topTier: { unit: 'Month', format: 'MMM, yy', count: 1 },
        bottomTier: { unit: 'Week', format: 'dd', count: 1 },
        timelineUnitSize: 33, level: 0,
        timelineViewMode: 'Month', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
        bottomTier: { unit: 'Day', format: 'd', count: 1 },
        timelineUnitSize: 66, level: 3,
        timelineViewMode: 'Week', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    },
    {
        topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
        bottomTier: { unit: 'Hour', format: 'hh a', count: 12 },
        timelineUnitSize: 66, level: 5,
        timelineViewMode: 'Day', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
    }
];

let gantt: Gantt = new Gantt({
    toolbar: ['ZoomIn', 'ZoomOut', 'ZoomToFit'],
    dataBound: () => {
        gantt.zoomingLevels = customZoomingLevels;
    }
});
```

---

## Infinite Timeline Scrolling

Enable infinite horizontal scrolling so the Gantt timeline can dynamically extend the visible timeline range as the user navigates.

Set `enableInfiniteTimelineScroll` to `true`.

**Key behaviors**

- In the forward direction, the timeline automatically extends when the user scrolls horizontally (or uses the forward scroll arrow).
- In the backward direction, the timeline extends only when the user clicks the backward scroll arrow (dragging the scrollbar backward does not trigger extension).
- Infinite scrolling extends only the visible timeline range and does not modify the project dates (`projectStartDate` / `projectEndDate`).

```typescript
import { Gantt } from '@syncfusion/ej2-gantt';

let gantt: Gantt = new Gantt({
    dataSource: infiniteTimelineScrollData,
    height: '430px',
    enableInfiniteTimelineScroll: true,
    taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        parentID: 'ParentID'
    },
    treeColumnIndex: 1,
    columns: [
        { field: 'TaskID', width: 80 },
        { field: 'TaskName', headerText: 'Job Name', width: 250, clipMode: 'EllipsisWithTooltip' },
        { field: 'StartDate' },
        { field: 'Duration' },
        { field: 'Progress' },
        { field: 'Predecessor' }
    ],
    timelineSettings: {
        viewStartDate: new Date('12/29/2025'),
        viewEndDate: new Date('04/27/2026')
    },
    labelSettings: {
        leftLabel: 'TaskID',
        rightLabel: 'TaskName'
    }
});

gantt.appendTo('#Gantt');
```

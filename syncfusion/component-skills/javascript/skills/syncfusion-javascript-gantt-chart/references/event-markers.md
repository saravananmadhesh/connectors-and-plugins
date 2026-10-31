# Event Markers in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Basic Setup](#basic-setup)
- [Event Marker Properties](#event-marker-properties)
- [Handling Overlapping Markers](#handling-overlapping-markers)
- [CSS Customization](#css-customization)

## Overview

Event markers highlight important project milestones or key dates as vertical lines in the chart area, with optional labels.

**Module required**: `DayMarkers`

## Basic Setup

```typescript
import { Gantt, DayMarkers } from '@syncfusion/ej2-gantt';

Gantt.Inject(DayMarkers);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: {
        id: 'TaskID', name: 'TaskName', startDate: 'StartDate',
        duration: 'Duration', progress: 'Progress', child: 'subtasks'
    },
    eventMarkers: [
        {
            day: '04/10/2019',
            label: 'Project approval and kick-off',
            cssClass: 'e-custom-event-marker'
        }
    ]
});
gantt.appendTo('#Gantt');
```

---

## Event Marker Properties

| Property | Type | Description |
|----------|------|-------------|
| `day` | string \| Date | Date for the vertical marker line |
| `label` | string | Label text displayed beside the marker |
| `cssClass` | string | CSS class to style the marker |

---

## Handling Overlapping Markers

When markers fall on the same or consecutive dates and zoom is applied, they may visually overlap. Adjust positions in `dataBound` and `actionComplete`:

```typescript
import { Gantt, DayMarkers, Toolbar } from '@syncfusion/ej2-gantt';

Gantt.Inject(DayMarkers, Toolbar);

function updateEventMarkerPositions() {
    let top = 100;
    const labels = document.getElementsByClassName('e-span-label');
    const arrows = document.getElementsByClassName('e-gantt-right-arrow');
    for (let i = 0; i < labels.length; i++) {
        (labels[i] as HTMLElement).style.top = top + 'px';
        (arrows[i] as HTMLElement).style.top = (top + 10) + 'px';
        top += 35;
    }
}

let gantt: Gantt = new Gantt({
    eventMarkers: [
        { day: new Date('04/09/2019'), label: 'Research phase' },
        { day: new Date('04/10/2019'), label: 'Design phase' },
        { day: new Date('05/23/2019'), label: 'Production phase' },
        { day: new Date('06/20/2019'), label: 'Sales and marketing' }
    ],
    toolbar: ['ZoomIn', 'ZoomOut', 'ZoomToFit'],
    dataBound: () => {
        updateEventMarkerPositions();
        gantt.fitToProject();
    },
    actionComplete: () => {
        updateEventMarkerPositions();
    }
});
```

---

## CSS Customization

```css
/* Custom event marker line */
.e-custom-event-marker .e-span-label {
    color: #ff0000;
    font-weight: bold;
}

/* Override marker line color */
.e-custom-event-marker .e-event-markers {
    border-left-color: #ff0000;
}
```

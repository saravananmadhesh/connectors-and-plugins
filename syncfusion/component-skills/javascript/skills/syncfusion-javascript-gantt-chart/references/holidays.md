# Holidays in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Basic Setup](#basic-setup)
- [Holiday Properties](#holiday-properties)
- [CSS Customization](#css-customization)

## Overview

Holidays mark non-working days in the project timeline. They are highlighted in the chart area with optional labels.

**Module required**: `DayMarkers`

## Basic Setup

```typescript
import { Gantt, DayMarkers } from '@syncfusion/ej2-gantt';

Gantt.Inject(DayMarkers);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    holidays: [
        {
            from: '04/04/2019',
            to: '04/05/2019',
            label: 'Public holidays',
            cssClass: 'e-custom-holiday'
        },
        {
            from: '04/12/2019',
            to: '04/12/2019',
            label: 'Public holiday',
            cssClass: 'e-custom-holiday'
        }
    ]
});
gantt.appendTo('#Gantt');
```

---

## Holiday Properties

| Property | Type | Description |
|----------|------|-------------|
| `from` | string \| Date | Start date of the holiday range |
| `to` | string \| Date | End date of the holiday range (same as `from` for single-day holiday) |
| `label` | string | Label text displayed on the highlighted area |
| `cssClass` | string | Custom CSS class for styling the holiday band |

---

## CSS Customization

```css
/* Custom holiday band style */
.e-custom-holiday {
    background-color: rgba(255, 200, 0, 0.3);
}

/* Holiday label text */
.e-custom-holiday .e-holiday-label {
    color: #b8860b;
    font-weight: bold;
}
```

> **Note**: Holiday highlighting does not exclude the holiday days from task duration calculation unless combined with `workWeek` (which defines working days) or `dayWorkingTime` settings.

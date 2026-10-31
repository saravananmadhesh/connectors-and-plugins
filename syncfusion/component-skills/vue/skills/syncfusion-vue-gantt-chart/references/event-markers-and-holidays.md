# Event Markers and Holidays

## Table of Contents
- [Event Markers Overview](#event-markers-overview)
- [Defining Event Markers](#defining-event-markers)
- [EventMarker Properties](#eventmarker-properties)
- [Holidays Overview](#holidays-overview)
- [Defining Holidays](#defining-holidays)
- [Holiday Properties](#holiday-properties)
- [Highlight Weekends](#highlight-weekends)
- [DayMarkers Module](#daymarkers-module)

## Event Markers Overview

Event markers are vertical lines drawn on the Gantt timeline at specific dates to highlight project milestones, deadlines, or any significant dates. They appear in the chart panel as vertical colored lines with optional labels.

## Defining Event Markers

```vue
<ejs-gantt :eventMarkers="eventMarkers" :taskFields="taskFields" height="450px" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [DayMarkers]);

const eventMarkers = [
  {
    day: new Date('2024-03-01'),
    label: 'Project Kickoff',
    cssClass: 'e-custom-event-marker'
  },
  {
    day: '04/15/2024',             // string date also accepted
    label: 'Phase 1 Deadline',
    cssClass: 'deadline-marker'
  },
  {
    day: new Date('2024-06-30'),
    label: 'Go Live'
  }
];
</script>
```

> ⚠️ **DayMarkers module required** for event markers and holidays to render.

## EventMarker Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `day` | Date \| string | ✅ | The date position on the timeline for the vertical line |
| `label` | string | — | Text label displayed at the top of the marker line |
| `cssClass` | string | — | Custom CSS class for styling the marker line |

### Styling via CSS

```css
/* Custom event marker line color */
.e-gantt .e-custom-event-marker {
  border-left: 2px dashed #e74c3c !important;
}

/* Custom marker label */
.e-gantt .e-custom-event-marker .e-gantt-label {
  color: #e74c3c;
  font-weight: bold;
}
```

## Holidays Overview

Holidays are date ranges (single-day or multi-day) that are visually highlighted in the Gantt chart panel as shaded background regions. They do not count as working time in duration calculations.

## Defining Holidays

```vue
<ejs-gantt :holidays="holidays" :taskFields="taskFields" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [DayMarkers]);

const holidays = [
  {
    from: new Date('2024-12-25'),
    to: new Date('2024-12-25'),
    label: 'Christmas',
    cssClass: 'e-christmas-holiday'
  },
  {
    from: new Date('2024-01-01'),
    to: new Date('2024-01-01'),
    label: "New Year's Day"
  },
  {
    from: new Date('2024-07-04'),
    to: new Date('2024-07-04'),
    label: 'Independence Day'
  }
];
</script>
```

### Multi-day holiday range

```js
{
  from: new Date('2024-12-24'),
  to: new Date('2024-12-26'),
  label: 'Holiday Break',
  cssClass: 'holiday-range'
}
```

## Holiday Properties

| Property | Type | Required | Description |
|---|---|---|---|
| `from` | Date \| string | ✅ | Start date of the holiday |
| `to` | Date \| string | ✅ | End date of the holiday (same as `from` for single day) |
| `label` | string | — | Text label shown in the holiday region |
| `cssClass` | string | — | Custom CSS class for the highlighted region |

### Styling holidays

```css
/* Default holiday highlight — override color */
.e-gantt .e-holiday {
  background-color: rgba(255, 193, 7, 0.2) !important;
}

/* Custom holiday class */
.e-gantt .e-christmas-holiday {
  background-color: rgba(220, 53, 69, 0.15) !important;
}
```

## Highlight Weekends

Automatically shade Saturdays and Sundays (or custom non-working days):

```vue
<ejs-gantt :highlightWeekends="true" ...></ejs-gantt>
```

This also requires the `DayMarkers` module.

> **Note:** `highlightWeekends` shades the weekend columns in the chart panel but does NOT exclude them from duration calculations. To exclude weekends from scheduling, configure `workWeek` instead.

## DayMarkers Module

The `DayMarkers` module is required for all three features — event markers, holidays, and weekend highlights:

```js
import { provide } from 'vue';
import { DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [DayMarkers]);
```

### Complete example with all three features

```vue
<template>
  <ejs-gantt
    :dataSource="data"
    :taskFields="taskFields"
    :eventMarkers="eventMarkers"
    :holidays="holidays"
    :highlightWeekends="true"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { provide } from 'vue';
import { GanttComponent as EjsGantt, DayMarkers } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [DayMarkers]);

const taskFields = { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration' };

const eventMarkers = [
  { day: new Date('2024-04-01'), label: 'Q2 Start' }
];

const holidays = [
  { from: new Date('2024-05-27'), to: new Date('2024-05-27'), label: 'Memorial Day' }
];

const data = [
  { TaskID: 1, TaskName: 'Planning', StartDate: new Date('2024-03-25'), Duration: 14 }
];
</script>
```

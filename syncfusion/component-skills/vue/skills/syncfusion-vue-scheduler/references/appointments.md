# Appointments and Events

## Table of Contents
- [Overview](#overview)
- [Event Types](#event-types)
  - [Normal Events](#normal-events)
  - [Spanned Events](#spanned-events)
  - [All-Day Events](#all-day-events)
- [Event Fields](#event-fields)
  - [Built-in Fields](#built-in-fields)
  - [Field Mapping](#field-mapping)
  - [Field Settings](#field-settings)
- [Recurring Events](#recurring-events)
  - [Recurrence Rules](#recurrence-rules-icalendar-format)
  - [Recurrence Properties](#recurrence-properties)
  - [Common Recurrence Patterns](#common-recurrence-patterns)
  - [Recurrence Exceptions](#recurrence-exceptions)
  - [Editing Recurrence Occurrences](#editing-recurrence-occurrences)
  - [Edit Following Events](#edit-following-events)
- [Custom Fields](#custom-fields)
- [Drag and Drop](#drag-and-drop)
  - [Multi-Drag Selection](#multi-drag-selection)
  - [Drag Events](#drag-events)
  - [Disable Drag Action](#disable-the-drag-action)
  - [Preventing Drag on Specific Targets](#preventing-drag-and-drop-on-specific-targets)
  - [Disable Scrolling on Drag](#disable-scrolling-on-drag-action)
  - [Setting Drag Time Interval](#setting-drag-time-interval)
  - [External Source Drag and Drop](#drag-and-drop-items-from-external-source)
  - [Opening Editor on Drag Stop](#opening-the-editor-window-on-drag-stop)
- [Inline Appointment](#inline-appointment)
- [Appointment Resizing](#appointment-resizing)
  - [Disable Scrolling on Resize](#disable-scrolling-on-resize-action)
  - [Setting Resize Time Interval](#setting-resize-time-interval)

## Overview

Appointments (events) in the Scheduler represent items scheduled for specific time periods. Events can be categorized as:
- **Normal events** - Standard appointments within a single day
- **Spanned events** - Appointments lasting more than 24 hours
- **All-day events** - Full-day appointments (holidays, birthdays)
- **Recurring events** - Events that repeat based on recurrence rules

## Event Types

### Normal Events

Standard events created for a specific time interval within a single day.

```vue
<script setup>
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Team Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 30)
    }
  ]
};
</script>
```

### Spanned Events

Appointments spanning more than 24 hours, typically displayed in the all-day row.

```vue
<script setup>
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Conference',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 17, 12, 30), // Spans 2+ days
      IsAllDay: false
    }
  ],
  spannedEventPlacement: 'AllDayRow' // or 'TimeSlot'
};
</script>
```

**Spanned Event Placement Options:**
- `AllDayRow` (default) - Display in all-day row
- `TimeSlot` - Display in work cells across days

### All-Day Events

Events for entire days without specific start/end times.

```vue
<script setup>
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Company Holiday',
      StartTime: new Date(2024, 0, 15),
      EndTime: new Date(2024, 0, 16),
      IsAllDay: true
    }
  ]
};
</script>
```

**Hide All-Day Row:**
```css
.e-schedule .e-date-header-wrap .e-schedule-table thead {
  display: none;
}
```

**Expand All-Day Row on Load:**
```vue
<template>
  <ejs-schedule ref="scheduleObj" :dataBound="dataBound"></ejs-schedule>
</template>

<script setup>
import { ref } from "vue";

const scheduleObj = ref(null);
let initialLoad = true;

const dataBound = () => {
  if (initialLoad) {
    setTimeout(() => {
      const allDaySection = scheduleObj.value.ej2Instances.element
        .querySelector('.e-all-day-appointment-section');
      if (allDaySection) allDaySection.click();
    }, 0);
    initialLoad = false;
  }
};
</script>
```

## Event Fields

### Built-in Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string/number | Recommended | Unique identifier for CRUD operations |
| `subject` | string | No | Event title/summary |
| `startTime` | Date | Yes | Event start time |
| `endTime` | Date | Yes | Event end time |
| `isAllDay` | boolean | No | Whether event spans entire day |
| `location` | string | No | Event location |
| `description` | string | No | Event details/notes |
| `startTimezone` | string | No | Start timezone (IANA format) |
| `endTimezone` | string | No | End timezone (IANA format) |
| `recurrenceRule` | string | No | Recurrence pattern (iCalendar format) |
| `recurrenceID` | number | No | Parent event ID for edited occurrences |
| `recurrenceException` | string | No | Excluded dates for recurring events |
| `isReadonly` | boolean | No | Prevents editing when true |
| `isBlock` | boolean | No | Blocks time slot, prevents event creation |

### Field Mapping

Map custom field names to scheduler fields:

```vue
<script setup>
const eventSettings = {
  dataSource: customAppointments,
  fields: {
    id: 'EventId',
    subject: { name: 'Title' },
    startTime: { name: 'From' },
    endTime: { name: 'To' },
    location: { name: 'Place' },
    description: { name: 'Notes' },
    isAllDay: { name: 'FullDay' },
    startTimezone: { name: 'StartTZ' },
    endTimezone: { name: 'EndTZ' }
  }
};
</script>
```

### Field Settings

Configure field options (default values, titles, validation):

```vue
<script setup>
const eventSettings = {
  fields: {
    subject: { 
      name: 'Subject', 
      title: 'Event Title',
      default: 'Add Title',
      validation: { required: true }
    },
    location: { 
      name: 'Location', 
      default: 'Conference Room' 
    }
  }
};
</script>
```

## Recurring Events

### Recurrence Rules (iCalendar Format)

Recurring events use iCalendar recurrence rules (RRULE).

**Basic Structure:**
```
FREQ=<DAILY|WEEKLY|MONTHLY|YEARLY>;INTERVAL=<n>;COUNT=<n>|UNTIL=<date>
```

### Recurrence Properties

| Property | Description | Example |
|----------|-------------|---------|
| `FREQ` | Frequency (DAILY, WEEKLY, MONTHLY, YEARLY) | `FREQ=DAILY` |
| `INTERVAL` | Interval between occurrences | `INTERVAL=2` (every 2 days) |
| `COUNT` | Number of occurrences | `COUNT=10` |
| `UNTIL` | End date (ISO format) | `UNTIL=20241231T235959Z` |
| `BYDAY` | Days of week (MO, TU, WE, TH, FR, SA, SU) | `BYDAY=MO,WE,FR` |
| `BYMONTHDAY` | Day of month (1-31) | `BYMONTHDAY=15` |
| `BYMONTH` | Month (1-12) | `BYMONTH=6` |
| `BYSETPOS` | Week position (1-5, -1 for last) | `BYSETPOS=2` (2nd occurrence) |

### Common Recurrence Patterns

**Daily (Every Day):**
```javascript
RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=10'
```

**Weekly (Monday, Wednesday, Friday):**
```javascript
RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=10'
```

**Monthly (15th of Every Month):**
```javascript
RecurrenceRule: 'FREQ=MONTHLY;BYMONTHDAY=15;INTERVAL=1;COUNT=12'
```

**Monthly (2nd Friday):**
```javascript
RecurrenceRule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;COUNT=12'
```

**Yearly (June 15th):**
```javascript
RecurrenceRule: 'FREQ=YEARLY;BYMONTHDAY=15;BYMONTH=6;INTERVAL=1;COUNT=5'
```

**Until Date:**
```javascript
RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20241231T235959Z'
```

### Recurrence Exceptions

Exclude specific occurrences from a recurring series:

```vue
<script setup>
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Daily Standup',
      StartTime: new Date(2024, 0, 15, 9, 0),
      EndTime: new Date(2024, 0, 15, 9, 30),
      RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=10',
      RecurrenceException: '20240117T090000Z,20240119T090000Z' // Skip Jan 17 & 19
    }
  ]
};
</script>
```

**Note**: Exception dates must be in UTC ISO format without hyphens: `YYYYMMDDTHHmmssZ`

### Editing Recurrence Occurrences

Edit a single occurrence from a recurring series:

```vue
<script setup>
const eventSettings = {
  dataSource: [
    // Parent recurring event
    {
      Id: 1,
      Subject: 'Team Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=10',
      RecurrenceException: '20240117T100000Z' // Exclude edited date
    },
    // Edited occurrence as new event
    {
      Id: 2,
      Subject: 'Team Meeting (Rescheduled)',
      StartTime: new Date(2024, 0, 17, 14, 0), // Different time
      EndTime: new Date(2024, 0, 17, 15, 0),
      RecurrenceID: 1 // Points to parent event ID
    }
  ]
};
</script>
```

### Edit Following Events

Enable editing current and following occurrences:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings"></ejs-schedule>
</template>

<script setup>
const eventSettings = {
  editFollowingEvents: true,
  dataSource: [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 0),
      RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20240120T100000Z'
    },
    {
      Id: 2,
      Subject: 'Meeting (Updated)',
      StartTime: new Date(2024, 0, 17, 10, 0),
      EndTime: new Date(2024, 0, 17, 11, 0),
      RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;UNTIL=20240120T100000Z',
      FollowingID: 1 // Points to parent
    }
  ]
};
</script>
```

## Custom Fields

Add custom fields beyond built-in fields:

```vue
<script setup>
const eventSettings = {
  dataSource: [
    {
      Id: 1,
      Subject: 'Client Meeting',
      StartTime: new Date(2024, 0, 15, 10, 0),
      EndTime: new Date(2024, 0, 15, 11, 30),
      // Custom fields
      Priority: 'High',
      Status: 'Confirmed',
      Attendees: ['John', 'Jane', 'Bob'],
      MeetingRoom: 'Conference A'
    }
  ]
};
</script>
```

Custom fields are accessible in templates, events, and editor customizations.

## Drag and Drop

Enable drag-and-drop for events:

```vue
<template>
  <ejs-schedule 
    :allowDragAndDrop="true"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Day, Week, Month, DragAndDrop } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [Day, Week, Month, DragAndDrop]);
</script>

> Note: Drag-and-drop is not applicable in the **Agenda**, **Month-Agenda**, and **Year** views by default; inject and enable modules only when needed.
```

### Multi-Drag Selection

Drag multiple events simultaneously:

```vue
<template>
  <ejs-schedule 
    :allowDragAndDrop="true"
    :allowMultiDrag="true"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>
```

**Usage**: Hold `Ctrl` key and click events to select multiple, then drag.

### Drag Events

Handle drag events for validation or custom behavior:

**Vue 3 (Composition API):**
```vue
<template>
  <ejs-schedule 
    :dragStart="onDragStart"
    :drag="onDrag"
    :dragStop="onDragStop">
  </ejs-schedule>
</template>

<script setup>
const onDragStart = (args) => {
  console.log('Drag started:', args.data);
  // Cancel drag if needed
  // args.cancel = true;
};

const onDrag = (args) => {
  console.log('Dragging...', args.data);
};

const onDragStop = (args) => {
  console.log('Drag stopped:', args.data);
  // Modify event before saving
  args.data.Location = 'Updated Location';
};
</script>
```

**Vue 2 (Options API):**
```vue
<template>
  <ejs-schedule 
    :dragStart="onDragStart"
    :drag="onDrag"
    :dragStop="onDragStop">
  </ejs-schedule>
</template>

<script>
export default {
  methods: {
    onDragStart(args) {
      console.log('Drag started:', args.data);
    },
    onDrag(args) {
      console.log('Dragging...', args.data);
    },
    onDragStop(args) {
      console.log('Drag stopped:', args.data);
      args.data.Location = 'Updated Location';
    }
  }
}
</script>
```

### Disable the Drag Action

By default, events can be dragged across applicable views. To disable dragging set `false` to the `allowDragAndDrop` property.

```vue
<template>
  <ejs-schedule :height="height" :selectedDate="selectedDate" :allowDragAndDrop="allowDragAndDrop"
    :eventSettings="eventSettings"></ejs-schedule>
</template>

<script setup>
const height = '550px';
const allowDragAndDrop = false;
const eventSettings = { dataSource: scheduleData };
const selectedDate = new Date(2018, 1, 15);
</script>
```

### Preventing Drag and Drop on Specific Targets

Use `dragStart` event's `excludeSelectors` to prevent dragging when the source/target matches CSS selectors (for example the all-day row).

```js
const onDragStart = function (args) {
  args.excludeSelectors = 'e-header-cells,e-header-day,e-header-date,e-all-day-cells';
}
```

### Disable Scrolling on Drag Action

To stop the view from auto-scrolling while dragging, set `args.scroll = { enable: false }` in `dragStart`.

```js
const onDragStart = function (args) {
  args.scroll = { enable: false };
}
```

### Setting Drag Time Interval

Change the dragging snap interval via `args.interval` inside `dragStart`.

```js
const onDragStart = function (args) {
  args.interval = 10; // minutes
}
```

### Drag and Drop Items from External Source

You can create events from external controls (tree, list). Handle the external control's drag stop, build an event object and call Scheduler's `addEvent`.

```vue
<!-- simplified: external drag -> addEvent on drop -->
<script setup>
import { ref } from 'vue';
const ScheduleObj = ref(null);

const onTreeDragStop = function (event) {
  const scheduleObj = ScheduleObj.value.ej2Instances;
  if (event.target.classList.contains('e-work-cells')) {
    const cellData = scheduleObj.getCellDetails(event.target);
    const eventData = { Subject: event.draggedNodeData.text, StartTime: cellData.startTime, EndTime: cellData.endTime };
    scheduleObj.addEvent(eventData);
  }
}
</script>
```

### Opening the Editor Window on Drag Stop

If you want to open the editor on drop and only save when user clicks Save, cancel the drop and call `openEditor` in `dragStop`.

**Vue 3:**
```vue
<script setup>
import { ref } from 'vue';
const scheduleObj = ref(null);

const onDragStop = (args) => {
  args.cancel = true;
  scheduleObj.value.ej2Instances.openEditor(args.data, 'Save');
};
</script>
```

**Vue 2:**
```js
methods: {
  onDragStop(args) {
    args.cancel = true;
    this.$refs.scheduleObj.ej2Instances.openEditor(args.data, 'Save');
  }
}
```

## Inline Appointment

Enable `allowInline` to add/edit subjects inline (single cell/appointment). Note that `showQuickInfo` will be turned off when `allowInline` is `true`.

**Vue 3 (Composition API):**
```vue
<template>
  <ejs-schedule 
    :allowInline="true" 
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
const eventSettings = {
  dataSource: appointmentData
};
</script>
```

**Vue 2 (Options API):**
```vue
<template>
  <ejs-schedule 
    :allowInline="true" 
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script>
export default {
  data() {
    return {
      eventSettings: {
        dataSource: appointmentData
      }
    };
  }
}
</script>
```

## Appointment Resizing

Inject the `Resize` module and set `allowResizing` to enable resizing. To disable resizing set `allowResizing=false`.

**Enable Resizing with Module Injection (Vue 3):**
```vue
<template>
  <ejs-schedule 
    :allowResizing="true"
    :resizeStart="onResizeStart"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Day, Week, Month, Resize } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [Day, Week, Month, Resize]);

const eventSettings = { dataSource: appointmentData };
</script>
```

**Disable Resizing:**
```vue
<template>
  <ejs-schedule :allowResizing="false"></ejs-schedule>
</template>
```

### Disable Scrolling on Resize Action

Use `resizeStart` event and set `args.scroll = { enable: false }` to prevent auto-scrolling during resize operations.

**Vue 3:**
```vue
<script setup>
const onResizeStart = (args) => {
  args.scroll = { enable: false };
};
</script>
```

**Vue 2:**
```js
methods: {
  onResizeStart(args) {
    args.scroll = { enable: false };
  }
}
```

### Setting Resize Time Interval

Change `args.interval` inside `resizeStart` to alter the resize snap interval (in minutes).

```vue
<script setup>
const onResizeStart = (args) => {
  args.interval = 15; // Resize in 15-minute increments
};
</script>
```

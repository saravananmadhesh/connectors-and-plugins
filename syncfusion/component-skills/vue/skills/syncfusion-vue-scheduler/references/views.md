# Views and View Modes

## Table of Contents
- [Overview](#overview)
- [Available Views](#available-views)
- [Setting Views](#setting-views)
- [View-Specific Configuration](#view-specific-configuration)
- [Day View](#day-view)
- [Week View](#week-view)
- [Work Week View](#work-week-view)
- [Month View](#month-view)
- [Year View](#year-view)
- [Agenda View](#agenda-view)
- [Timeline Views](#timeline-views)
- [Max Event Stack](#max-event-stack)
- [View Navigation](#view-navigation)

## Overview

The Scheduler provides multiple view modes to display appointments in different formats. By default, the Week view is active. Each view can be configured independently with unique settings for date format, working hours, timescale, and more.

## Available Views

| View Name | Description | Module Required |
|-----------|-------------|-----------------|
| `Day` | Displays a single day or multiple days | `Day` |
| `Week` | Shows 7 days (Sunday to Saturday) | `Week` |
| `WorkWeek` | Shows working days only (Mon-Fri by default) | `WorkWeek` |
| `Month` | Displays entire month | `Month` |
| `Year` | Displays all months of a year | `Year` |
| `Agenda` | List view of upcoming appointments | `Agenda` |
| `MonthAgenda` | Month view with agenda list | `MonthAgenda` |
| `TimelineDay` | Horizontal timeline for day(s) | `TimelineViews` |
| `TimelineWeek` | Horizontal timeline for week | `TimelineViews` |
| `TimelineWorkWeek` | Horizontal timeline for work week | `TimelineViews` |
| `TimelineMonth` | Horizontal timeline for month | `TimelineMonth` |
| `TimelineYear` | Horizontal timeline for year | `TimelineYear` |

## Setting Views

### Setting Current View

Use the `currentView` property to set the active view on load:

```vue
<template>
  <ejs-schedule 
    :currentView="currentView"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Week } from '@syncfusion/ej2-vue-schedule';

const currentView = 'Week';

provide('schedule', [Week]);
</script>
```

### Configuring Multiple Views

Define specific views using the `views` property:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view option="Week"></e-view>
      <e-view option="TimelineWeek"></e-view>
      <e-view option="Month"></e-view>
      <e-view option="TimelineMonth"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Week, Month, TimelineViews, TimelineMonth } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [Week, Month, TimelineViews, TimelineMonth]);
</script>
```

### Setting Default Active View

Use `isSelected` within view configuration:

```vue
<e-views>
  <e-view option="Week"></e-view>
  <e-view option="Month" :isSelected="true"></e-view>
</e-views>
```

## View-Specific Configuration

Each view can have unique settings using view properties:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view 
        option="Week" 
        dateFormat="dd-MMM-yyyy"
        startHour="09:00"
        endHour="18:00">
      </e-view>
      <e-view 
        option="Month" 
        :showWeekend="false" 
        :readonly="true">
      </e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Week, Month } from '@syncfusion/ej2-vue-schedule';

const showWeekend = false;

provide('schedule', [Week, Month]);
</script>
```

### Common View Properties

| Property | Type | Description | Applicable Views |
|----------|------|-------------|------------------|
| `option` | string | View name (Day, Week, Month, etc.) | All views |
| `isSelected` | boolean | Sets as active view | All views |
| `dateFormat` | string | Date header format | All views |
| `readonly` | boolean | Prevents CRUD operations | All views |
| `showWeekend` | boolean | Show/hide weekends | All views |
| `interval` | number | Number of days/weeks/months to display | All except Agenda, MonthAgenda |
| `displayName` | string | Custom view name in header | All except Agenda, MonthAgenda |
| `startHour` | string | Start time (e.g., "09:00") | Day, Week, WorkWeek, Timeline Day/Week/WorkWeek |
| `endHour` | string | End time (e.g., "18:00") | Day, Week, WorkWeek, Timeline Day/Week/WorkWeek |
| `workDays` | number[] | Working days (0=Sun, 1=Mon, etc.) | All except Agenda |
| `timeScale` | object | Timescale configuration | Day, Week, WorkWeek, Timeline Day/Week/WorkWeek |
| `showWeekNumber` | boolean | Display week numbers | Day, Week, WorkWeek, Month |
| `cellTemplate` | string/function | Custom work cell template | All except Agenda |
| `dateHeaderTemplate` | string/function | Custom date header template | All views |
| `eventTemplate` | string/function | Custom event template | All views |
| `resourceHeaderTemplate` | string/function | Custom resource header template | All views |
| `allowVirtualScrolling` | boolean | Enable virtual scrolling | Agenda, Timeline views |
| `headerRows` | array | Custom header rows | Timeline views only |
| `group` | object | Resource grouping options | All views |
| `maxEventStack` | number | Limits the number of events displayed per row; excess events are shown as `+N more` | Day, Week, WorkWeek (with timescale enabled) |

## Day View

Displays a single day with all appointments. Extend to multiple days using `interval`:

### Basic Day View

```vue
<template>
  <ejs-schedule :currentView="currentView" :eventSettings="eventSettings">
    <e-views>
      <e-view 
        option="Day" 
        startHour="09:30" 
        endHour="18:00"
        :timeScale="timeScale">
      </e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Day } from '@syncfusion/ej2-vue-schedule';

const currentView = 'Day';
const timeScale = { enable: true, slotCount: 5 };

provide('schedule', [Day]);
</script>
```

### Multi-Day View

Display multiple consecutive days:

```vue
<e-views>
  <e-view 
    option="Day" 
    :interval="3" 
    displayName="3 Days">
  </e-view>
</e-views>
```

## Week View

Displays 7 days (Sunday to Saturday) with appointments:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view 
        option="Week" 
        startHour="08:00" 
        endHour="20:00"
        :showWeekend="true">
      </e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Week } from '@syncfusion/ej2-vue-schedule';

const showWeekend = true;

provide('schedule', [Week]);
</script>
```

### Multi-Week View

Display multiple consecutive weeks:

```vue
<e-views>
  <e-view 
    option="Week" 
    :interval="2" 
    displayName="2 Weeks"
    :showWeekend="false">
  </e-view>
</e-views>
```

### Change First Day of Week

Use `firstDayOfWeek` property (0=Sunday, 1=Monday, etc.):

```vue
<template>
  <ejs-schedule 
    :firstDayOfWeek="1"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="Week"></e-view>
    </e-views>
  </ejs-schedule>
</template>
```

## Work Week View

Displays only working days (Monday to Friday by default):

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view 
        option="WorkWeek"
        :workDays="workDays">
      </e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { WorkWeek } from '@syncfusion/ej2-vue-schedule';

const workDays = [1, 2, 3, 4, 5]; // Monday to Friday

provide('schedule', [WorkWeek]);
</script>
```

### Custom Working Days

Define custom working days (e.g., Tuesday, Wednesday, Friday):

```vue
<script setup>
const workDays = [2, 3, 5]; // Tue, Wed, Fri
</script>
```

## Month View

Displays all days of a month with appointments:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view 
        option="Month" 
        :showWeekend="true"
        :showWeekNumber="true">
      </e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Month } from '@syncfusion/ej2-vue-schedule';

const showWeekend = true;

provide('schedule', [Month]);
</script>
```

### Multi-Month View

Display multiple consecutive months:

```vue
<e-views>
  <e-view 
    option="Month" 
    :interval="2" 
    displayName="2 Months">
  </e-view>
</e-views>
```

### Month View Features

- **+ more indicator**: Displays count of hidden appointments on each cell
- **Click date**: Navigate to Day view for that specific date
- **All-day appointments**: Created by default when adding through Month view
- **Week numbers**: Enable with `showWeekNumber` property

### Hide Weekend in Month View

```vue
<e-views>
  <e-view 
    option="Month" 
    :showWeekend="false">
  </e-view>
</e-views>
```

## Year View

Displays all months of a year in a grid format:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view option="Year"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Year } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [Year]);
</script>
```

### Year View Features

- Displays 12 months in a grid
- Shows appointment indicators on dates with events
- Click on date to navigate to Day view
- Supports `firstDayOfWeek` and `showWeekend` properties

### Custom Year Orientation

Year view displays in horizontal or vertical orientation based on available space.

## Agenda View

List view displaying upcoming appointments chronologically:

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view 
        option="Agenda" 
        :allowVirtualScrolling="true">
      </e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Agenda } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [Agenda]);
</script>
```

### Agenda View Configuration

**Set number of days to display:**

```vue
<template>
  <ejs-schedule 
    :agendaDaysCount="14"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="Agenda"></e-view>
    </e-views>
  </ejs-schedule>
</template>
```

**Enable virtual scrolling for performance:**

```vue
<e-views>
  <e-view 
    option="Agenda" 
    :allowVirtualScrolling="true">
  </e-view>
</e-views>
```

### Agenda View Features

- Displays upcoming appointments in list format
- No past appointments shown
- Grouped by date
- Supports virtual scrolling for large datasets
- Click appointment to view details

**Hide empty days:**

Use the `hideEmptyAgendaDays` property to hide days that have no appointments. Set `hideEmptyAgendaDays=true` to omit empty days from the agenda list.

```vue
<ejs-schedule :hideEmptyAgendaDays="true" :agendaDaysCount="14"></ejs-schedule>
```

## Timeline Views

Horizontal timeline views display time slots and resources horizontally.

### Timeline Day

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view 
        option="TimelineDay" 
        startHour="08:00" 
        endHour="20:00"
        :interval="3"
        displayName="3 Days Timeline">
      </e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { TimelineViews } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [TimelineViews]);
</script>
```

### Timeline Week

```vue
<e-views>
  <e-view 
    option="TimelineWeek"
    :interval="2"
    displayName="2 Weeks Timeline">
  </e-view>
</e-views>
```

### Timeline Work Week

```vue
<e-views>
  <e-view 
    option="TimelineWorkWeek"
    :workDays="[1, 2, 3, 4, 5]">
  </e-view>
</e-views>
```

### Timeline Month

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view option="TimelineMonth"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { TimelineMonth } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [TimelineMonth]);
</script>
```

### Timeline Year

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view option="TimelineYear"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { TimelineYear } from '@syncfusion/ej2-vue-schedule';

provide('schedule', [TimelineYear]);
</script>
```

### Timeline View Features

- **Horizontal orientation**: Time flows left to right
- **Excellent for resources**: Shows multiple resources vertically
- **Custom header rows**: Add year, month, week labels
- **Virtual scrolling**: Enable for large date ranges
- **Timescale customization**: Configure intervals and slots
 - **Row auto height**: Use `rowAutoHeight=true` to automatically adjust row height based on overlapping events (useful for Timeline Year and similar views).

### Timeline with Custom Header Rows

```vue
<template>
  <ejs-schedule :eventSettings="eventSettings">
    <e-views>
      <e-view 
        option="TimelineMonth"
        :headerRows="headerRows">
      </e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { TimelineMonth } from '@syncfusion/ej2-vue-schedule';

const headerRows = [
  { option: 'Year' },
  { option: 'Month' },
  { option: 'Date' }
];

provide('schedule', [TimelineMonth]);
</script>
```

## Max Event Stack

The `maxEventStack` view property limits how many events are rendered inside a single day cell. When the count exceeds the limit, the remaining events are collapsed into a `+N more` indicator. This keeps the cell layout compact and is especially useful when many overlapping or concurrent events exist in Day, Week, or WorkWeek views.

> **Note:** The `maxEventStack` property is only applicable to **Day**, **Week**, and **WorkWeek** views, and only when the `timeScale` option is enabled.

### Setting a Static Limit per View

Apply a fixed limit to each eligible view through the `e-view` directive:

```vue
<template>
  <ejs-schedule
    :selectedDate="selectedDate"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="Day" :maxEventStack="2"></e-view>
      <e-view option="Week" :maxEventStack="3"></e-view>
      <e-view option="WorkWeek" :maxEventStack="2"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { Day, Week, WorkWeek } from '@syncfusion/ej2-vue-schedule';

const selectedDate = new Date(2024, 0, 15);
const eventSettings = {
  dataSource: [
    { Id: 1, Subject: 'Standup',     StartTime: new Date(2024, 0, 15, 9, 0),  EndTime: new Date(2024, 0, 15, 9, 30) },
    { Id: 2, Subject: 'Design Sync', StartTime: new Date(2024, 0, 15, 10, 0), EndTime: new Date(2024, 0, 15, 11, 0) },
    { Id: 3, Subject: 'Code Review', StartTime: new Date(2024, 0, 15, 10, 30),EndTime: new Date(2024, 0, 15, 11, 30) },
    { Id: 4, Subject: 'Lunch',       StartTime: new Date(2024, 0, 15, 12, 0),EndTime: new Date(2024, 0, 15, 13, 0) }
  ]
};

provide('schedule', [Day, Week, WorkWeek]);
</script>
```

Setting `maxEventStack` to `0` (zero) removes the limit and shows all events. Any positive integer collapses overflow events into a `+N more` indicator.

## View Navigation

### Programmatic Navigation

Change view using component reference:

```vue
<template>
  <button @click="changeView">Switch to Month View</button>
  <ejs-schedule ref="scheduleObj" :eventSettings="eventSettings">
    <e-views>
      <e-view option="Week"></e-view>
      <e-view option="Month"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { ref } from "vue";
import { provide } from "vue";
import { Week, Month } from '@syncfusion/ej2-vue-schedule';

const scheduleObj = ref(null);

const changeView = () => {
  scheduleObj.value.ej2Instances.currentView = 'Month';
};

provide('schedule', [Week, Month]);
</script>
```

### Navigate to Specific Date

```vue
<script setup>
const navigateToDate = () => {
  const targetDate = new Date(2024, 5, 15);
  scheduleObj.value.ej2Instances.selectedDate = targetDate;
};
</script>
```

### Navigate Using Methods

```vue
<script setup>
// Navigate to today
const goToToday = () => {
  scheduleObj.value.ej2Instances.showToday();
};

// Navigate to specific date in specific view
const goToDate = () => {
  scheduleObj.value.ej2Instances.changeView('Day', new Date(2024, 5, 15));
};
</script>
```

## Best Practices

1. **Import required view modules** - Only import views you'll use to reduce bundle size
2. **Use view-specific configuration** - Customize each view independently for better UX
3. **Enable virtual scrolling** - For Agenda and Timeline views with large datasets
4. **Set appropriate working hours** - Configure `startHour` and `endHour` for Day/Week/Timeline views
5. **Customize timescale** - Adjust slot intervals based on scheduling needs
6. **Use interval property** - Display multiple days/weeks/months for extended planning
7. **Consider mobile responsiveness** - Some views work better on smaller screens (Agenda vs. Month)
8. **Test view transitions** - Ensure smooth navigation between different views
9. **Optimize header rows** - Use custom headers for Timeline views with resources
10. **Handle readonly mode** - Set specific views as readonly when needed for display-only scenarios

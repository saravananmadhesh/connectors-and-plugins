# Recurrence Editor and Calendar Modes

## Table of Contents
- [Recurrence Editor](#recurrence-editor)
- [Calendar Mode](#calendar-mode)
- [Working Days Configuration](#working-days-configuration)
- [Scheduler Styling and Theming](#scheduler-styling-and-theming)
- [Performance Tips](#performance-tips)
- [Best Practices](#best-practices)

## Recurrence Editor

The Recurrence Editor is a standalone component for managing recurring event rules. It generates iCalendar-compliant recurrence rule strings:

### Basic Standalone Usage:

```vue
<template>
  <div>
    <label>Rule Output:</label>
    <div class="rule-output">{{ recurrenceRule }}</div>
    
    <ejs-recurrenceeditor 
      :selectedType="selectedType"
      @change="onRuleChange">
    </ejs-recurrenceeditor>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RecurrenceEditorComponent as EjsRecurrenceeditor } from '@syncfusion/ej2-vue-schedule';

const selectedType = 1; // Weekly
const recurrenceRule = ref('Select Rule');

const onRuleChange = (args) => {
  recurrenceRule.value = args.value || 'Select Rule';
};
</script>
```

### Customize Repeat Options:

```vue
<script setup>
import { RecurrenceEditorComponent as EjsRecurrenceeditor } from '@syncfusion/ej2-vue-schedule';
import { onMounted, ref } from "vue";

const editorObj = ref(null);

onMounted(() => {
  // Show only specific repeat options
  editorObj.value.frequencies = ['none', 'daily', 'weekly', 'monthly'];
});
</script>
```

### Customize End Type Options:

```vue
<script setup>
const onMounted = () => {
  editorObj.value.endTypes = ['until', 'count']; // Remove 'never' option
};
</script>
```

### Set Predefined Recurrence Rule:

```vue
<script setup>
const onMounted = () => {
  // Set rule for "Every 2 days for 8 occurrences"
  editorObj.value.setRecurrenceRule('FREQ=DAILY;INTERVAL=2;COUNT=8');
};
</script>
```

### Generate Dates from Recurrence Rule:

```vue
<script setup>
const generateRecurrenceDates = () => {
  const dates = editorObj.value.getRecurrenceDates(
    new Date(2024, 0, 1, 10, 0),              // Start date
    'FREQ=DAILY;INTERVAL=1',                  // Rule
    '20240108T114224Z,20240110T114224Z',      // Exclude dates
    10,                                        // Max count
    new Date(2024, 0, 1)                      // View date
  );
  
  return dates.map(date => new Date(date).toString());
};
</script>
```

**Recurrence Editor Properties**:
- `frequencies` - Available repeat options
- `endTypes` - Available end options (never, until, count)
- `firstDayOfWeek` - Week start day
- `startDate` - Recurrence start date
- `dateFormat` - Custom date format
- `enableRtl` - RTL mode

## Calendar Mode

Switch between Gregorian and Islamic calendar systems:

### Gregorian Calendar (Default):

```vue
<template>
  <ejs-schedule 
    calendarMode="Gregorian"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>
```

### Islamic Calendar:

```vue
<template>
  <ejs-schedule 
    calendarMode="Islamic"
    :enableRtl="true"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { loadCldr, setCulture, L10n } from '@syncfusion/ej2-base';
import { Calendar, Islamic } from '@syncfusion/ej2-calendars';
import { ScheduleComponent as EjsSchedule, Day, Week, Month, Agenda } from '@syncfusion/ej2-vue-schedule';

// Load Islamic calendar CLDR data
import arNumberData from '@syncfusion/ej2-cldr-data/main/ar/numbers.json';
import arTimeZoneData from '@syncfusion/ej2-cldr-data/main/ar/timeZoneNames.json';
import arGregorian from '@syncfusion/ej2-cldr-data/main/ar/ca-gregorian.json';
import arIslamic from '@syncfusion/ej2-cldr-data/main/ar/ca-islamic.json';
import arNumberingSystem from '@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json';
import localeText from './locale.json';

// Setup Islamic calendar
Calendar.Inject(Islamic);
loadCldr(arNumberData, arTimeZoneData, arGregorian, arIslamic, arNumberingSystem);
L10n.load(localeText);
setCulture('ar');

provide('schedule', [Day, Week, Month, Agenda]);
</script>
```

**Calendar Modes**:
- **Gregorian**: Solar calendar (default), 365-366 days per year
- **Islamic**: Lunar calendar, 354-355 days per year, months begin with new moon

## Working Days Configuration

Configure working days, working hours, and custom time ranges:

### Set Custom Working Days:

```vue
<template>
  <ejs-schedule 
    :workDays="[1, 3, 5]"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="Week"></e-view>
      <e-view option="WorkWeek"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
import { provide } from "vue";
import { ScheduleComponent as EjsSchedule, ViewDirective as EView, 
         ViewsDirective as EViews, Week, WorkWeek } from '@syncfusion/ej2-vue-schedule';

// Day mapping: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday
// This example sets Monday, Wednesday, Friday as working days
const workDays = [1, 3, 5];

provide('schedule', [Week, WorkWeek]);
</script>
```

### Hide Weekend Days:

```vue
<template>
  <ejs-schedule 
    :workDays="[1, 3, 4, 5]"
    :showWeekend="false"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="Day"></e-view>
      <e-view option="Week"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
const showWeekend = false;  // Hide Sunday, Tuesday, Saturday
</script>
```

### Set Working Hours:

```vue
<template>
  <ejs-schedule 
    :workHours="workHours"
    :eventSettings="eventSettings">
    <e-views>
      <e-view option="Day"></e-view>
      <e-view option="Week"></e-view>
    </e-views>
  </ejs-schedule>
</template>

<script setup>
const workHours = {
  highlight: true,
  start: '11:00',
  end: '20:00'
};
</script>
```

### Display Custom Time Range:

```vue
<template>
  <ejs-schedule 
    startHour="07:00"
    endHour="18:00"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>
```

### Show Week Numbers:

```vue
<template>
  <ejs-schedule 
    :showWeekNumber="true"
    weekRule="FirstFourDayWeek"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
// weekRule options: 'FirstDay', 'FirstFourDayWeek', 'FirstFullWeek'
const showWeekNumber = true;
const weekRule = 'FirstFourDayWeek';
</script>
```

### Set First Day of Week:

```vue
<template>
  <ejs-schedule 
    :firstDayOfWeek="3"
    :eventSettings="eventSettings">
  </ejs-schedule>
</template>

<script setup>
// 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, etc.
const firstDayOfWeek = 3;  // Start week on Wednesday
</script>
```

**Working Days Properties**:
- `workDays` - Array of working day numbers
- `workHours` - Start/end times and highlight flag
- `showWeekend` - Show/hide non-working days
- `showWeekNumber` - Display week numbers
- `weekRule` - Rule for week number calculation
- `firstDayOfWeek` - First day of the week
- `startHour`/`endHour` - Custom visible time range

## Scheduler Styling and Theming

Customize Scheduler appearance using CSS or Syncfusion Theme Studio:

### Built-in Themes:

```vue
<style>
/* Material3 (default) */
@import "@syncfusion/ej2-schedule/styles/material3.css";

/* Alternative themes */
@import "@syncfusion/ej2-schedule/styles/bootstrap5.css";
@import "@syncfusion/ej2-schedule/styles/fluent.css";
@import "@syncfusion/ej2-schedule/styles/tailwind.css";
</style>
```

### Styling Work Cells:

```vue
<style>
/* Vertical view work cells */
.e-schedule .e-vertical-view .e-work-cells {
  background-color: #f5f5f5;
}

/* Timeline view work cells */
.e-schedule .e-timeline-view .e-work-cells {
  border: 1px solid #ddd;
}

/* Month view work cells */
.e-schedule .e-month-view .e-work-cells {
  padding: 5px;
}
</style>
```

### Styling Appointments:

```vue
<style>
/* All appointments */
.e-schedule .e-appointment {
  border-radius: 4px;
  font-size: 13px;
}

/* Block appointments */
.e-schedule .e-block-appointment {
  opacity: 0.5;
  background-color: #d3d3d3 !important;
}

/* Selected appointment */
.e-schedule .e-appointment.e-appointment-border {
  border: 2px solid #1E90FF;
  box-shadow: 0 0 4px rgba(30, 144, 255, 0.5);
}
</style>
```

### Styling Working Days and Hours:

```vue
<style>
/* Working hour cells in vertical views */
.e-schedule .e-vertical-view .e-work-hours {
  background-color: #fffacd;
}

/* All-day cells */
.e-schedule .e-vertical-view .e-all-day-cells {
  background-color: #f0f0f0;
}

/* Working day cells in month view */
.e-schedule .e-month-view .e-work-days {
  background-color: #ffffff;
}
</style>
```

### Styling Resource Cells:

```vue
<style>
/* Resource cells in timeline views */
.e-schedule .e-timeline-view .e-resource-cells {
  background-color: #f9f9f9;
  padding: 8px;
}

/* Parent resource nodes */
.e-schedule .e-timeline-view .e-parent-node {
  font-weight: bold;
}

/* Child resource nodes */
.e-schedule .e-timeline-view .e-child-node {
  padding-left: 20px;
}
</style>
```

### Custom Theme Variables:

```vue
<style>
/* Override theme colors */
:root {
  --e-schedule-background: #ffffff;
  --e-schedule-border-color: #e0e0e0;
  --e-appointment-bg: #3f51b5;
  --e-appointment-text: #ffffff;
  --e-work-hours-bg: #fffacd;
}
</style>
```

**CSS Selectors Guide**:
- `.e-schedule .e-vertical-view .e-work-cells` - Vertical view work cells
- `.e-schedule .e-month-view .e-work-cells` - Month view cells
- `.e-schedule .e-timeline-view .e-work-cells` - Timeline view cells
- `.e-schedule .e-appointment` - Event appointments
- `.e-schedule .e-work-hours` - Working hour cells
- `.e-schedule .e-resource-cells` - Resource cells
- Use Theme Studio for visual customization: https://ej2.syncfusion.com/themestudio/

## Performance Tips

1. **Virtual Scrolling** - Enable for >1000 events
2. **includeFiltersInQuery** - Reduce data transfer from server
3. **Lazy Loading** - Load events on demand
4. **Debounce Actions** - Avoid rapid API calls
5. **Minimize Templates** - Complex templates impact rendering
6. **Use indexes** - On event ID field for faster queries
7. **Batch Operations** - Group multiple CRUD operations
8. **Cache Resources** - Store resource data locally when possible

## Best Practices

1. **Test with real data** - Verify performance with production-like datasets
2. **Optimize queries** - Use server-side filtering and pagination
3. **Implement caching** - Cache frequently accessed data
4. **Monitor performance** - Track rendering and API response times
5. **Use appropriate views** - Choose views based on data density
6. **Enable features selectively** - Only enable needed advanced features
7. **Handle errors gracefully** - Implement proper error handling
8. **Document customizations** - Maintain documentation for custom features

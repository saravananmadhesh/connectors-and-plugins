# Advanced Patterns (Vue 3)

## Table of Contents
- [Custom Range Validation](#custom-range-validation)
- [Disabled Date Ranges](#disabled-date-ranges)
- [Range With Business Days](#range-with-business-days)
- [Range Analytics](#range-analytics)

---

## Custom Range Validation

Implement complex validation logic:

```vue
<template>
  <div style="padding: 20px">
    <ejs-daterangepicker
      :value="selectedRange"
      @change="validateAdvanced"
    ></ejs-daterangepicker>
    
    <p v-if="validation.error" style="color: red">
      {{ validation.error }}
    </p>
    <div v-if="validation.info" style="color: green">
      <p>✓ {{ validation.info }}</p>
      <p>Duration: {{ validation.duration }} days</p>
      <p>Weekdays: {{ validation.weekdays }} | Weekends: {{ validation.weekends }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
const validation = reactive({
  error: '',
  info: '',
  duration: 0,
  weekdays: 0,
  weekends: 0
});

const validateAdvanced = (args) => {
  validation.error = '';
  validation.info = '';
  
  if (!args.startDate || !args.endDate) {
    validation.error = 'Select both start and end dates';
    return;
  }
  
  // Calculate duration
  const duration = Math.floor((args.endDate - args.startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // Count weekdays and weekends
  let weekdays = 0;
  let weekends = 0;
  const current = new Date(args.startDate);
  
  while (current <= args.endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekends++;
    } else {
      weekdays++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  // Validation rules
  const minDays = 1;
  const maxDays = 180;
  
  if (duration < minDays) {
    validation.error = `Range must be at least ${minDays} day`;
    selectedRange.value = null;
    return;
  }
  
  if (duration > maxDays) {
    validation.error = `Range cannot exceed ${maxDays} days`;
    selectedRange.value = null;
    return;
  }
  
  // Success
  validation.info = 'Range is valid';
  validation.duration = duration;
  validation.weekdays = weekdays;
  validation.weekends = weekends;
  selectedRange.value = { startDate: args.startDate, endDate: args.endDate };
};
</script>
```

---

## Disabled Date Ranges

Disable specific date ranges:

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
    @renderDayCell="disableDateRanges"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);

// Define disabled ranges
const disabledRanges = ref([
  { start: new Date(2026, 11, 20), end: new Date(2026, 11, 26) }, // Holiday period
  { start: new Date(2026, 6, 1), end: new Date(2026, 6, 5) }      // Maintenance window
]);

const disableDateRanges = (args) => {
  disabledRanges.value.forEach(range => {
    if (args.date >= range.start && args.date <= range.end) {
      args.isDisabled = true;
    }
  });
};
</script>
```

---

## Range With Business Days

Filter for business days only:

```vue
<template>
  <div style="padding: 20px">
    <ejs-daterangepicker
      :value="selectedRange"
      @renderDayCell="filterBusinessDays"
    ></ejs-daterangepicker>
    
    <p>Business days only (Monday-Friday)</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);

const filterBusinessDays = (args) => {
  const dayOfWeek = args.date.getDay();
  // 0 = Sunday, 6 = Saturday
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    args.isDisabled = true;
  }
};
</script>
```

---

## Range Analytics

Analyze selected ranges:

```vue
<template>
  <div style="padding: 20px">
    <ejs-daterangepicker
      :value="selectedRange"
      @change="analyzeRange"
    ></ejs-daterangepicker>
    
    <div v-if="analytics.data" style="margin-top: 20px; border: 1px solid #ccc; padding: 10px">
      <h4>Range Analytics</h4>
      <p>Duration: {{ analytics.data.duration }} days</p>
      <p>Start: {{ analytics.data.startDate }}</p>
      <p>End: {{ analytics.data.endDate }}</p>
      <p>Weekdays: {{ analytics.data.weekdays }}</p>
      <p>Weekends: {{ analytics.data.weekends }}</p>
      <p>Months Spanned: {{ analytics.data.months }}</p>
      <p>Season: {{ analytics.data.season }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
const analytics = reactive({
  data: null
});

const analyzeRange = (args) => {
  if (!args.startDate || !args.endDate) return;
  
  const duration = Math.floor((args.endDate - args.startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // Count weekdays/weekends
  let weekdays = 0;
  let weekends = 0;
  const current = new Date(args.startDate);
  
  while (current <= args.endDate) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekends++;
    } else {
      weekdays++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  // Calculate months spanned
  const months = (args.endDate.getFullYear() - args.startDate.getFullYear()) * 12 +
                 (args.endDate.getMonth() - args.startDate.getMonth()) + 1;
  
  // Determine season
  const startMonth = args.startDate.getMonth();
  const seasons = {
    'Winter': [11, 0, 1],
    'Spring': [2, 3, 4],
    'Summer': [5, 6, 7],
    'Fall': [8, 9, 10]
  };
  
  let season = 'Unknown';
  for (const [name, months] of Object.entries(seasons)) {
    if (months.includes(startMonth)) {
      season = name;
      break;
    }
  }
  
  analytics.data = {
    duration: duration,
    startDate: args.startDate.toLocaleDateString(),
    endDate: args.endDate.toLocaleDateString(),
    weekdays: weekdays,
    weekends: weekends,
    months: months,
    season: season
  };
  
  selectedRange.value = { startDate: args.startDate, endDate: args.endDate };
};
</script>
```

---

## Next Steps

- For events and methods, read `references/daterangepicker-events-and-methods.md`.
- For customization, read `references/daterangepicker-customization-and-styling.md`.
- For API reference, read `references/daterangepicker-api-reference.md`.

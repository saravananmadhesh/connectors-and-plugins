# Time Range & Selection (Vue 3)

## Table of Contents
- [Single Time Selection](#single-time-selection)
- [Time Ranges](#time-ranges)
- [Step Intervals](#step-intervals)

---

## Single Time Selection

Select a single time:

```vue
<template>
  <ejs-timepicker
    :value="selectedTime"
    @change="onTimeChange"
  ></ejs-timepicker>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedTime = ref(new Date());

const onTimeChange = (args) => {
  selectedTime.value = args.value;
};
</script>
```

---

## Time Ranges

Restrict selection to a time range:

```vue
<template>
  <div style="padding: 20px">
    <label>Available Hours (9 AM - 5 PM):</label>
    <ejs-timepicker
      :value="selectedTime"
      :min="minTime"
      :max="maxTime"
    ></ejs-timepicker>
    
    <p>Selected: {{ formatTime(selectedTime) }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedTime = ref(new Date(2026, 0, 1, 14, 0)); // 2:00 PM
const minTime = ref(new Date(2026, 0, 1, 9, 0));      // 9 AM
const maxTime = ref(new Date(2026, 0, 1, 17, 0));     // 5 PM

const formatTime = (time) => {
  return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};
</script>
```

---

## Step Intervals

Set time step intervals:

```vue
<template>
  <div style="padding: 20px">
    <label>15-Minute Intervals:</label>
    <ejs-timepicker
      :value="selectedTime"
      :step="15"
    ></ejs-timepicker>
    
    <label>30-Minute Intervals:</label>
    <ejs-timepicker
      :value="selectedTime"
      :step="30"
    ></ejs-timepicker>
    
    <label>Hourly Intervals:</label>
    <ejs-timepicker
      :value="selectedTime"
      :step="60"
    ></ejs-timepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedTime = ref(new Date());
</script>
```

---

## Next Steps

- For events and methods, read `references/timepicker-events-and-methods.md`.
- For customization, read `references/timepicker-customization-and-styling.md`.
- For advanced patterns, read `references/timepicker-advanced-patterns.md`.

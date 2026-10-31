# TimePicker Getting Started (Vue 3)

## Table of Contents
- [Installation](#installation)
- [CSS Import](#css-import)
- [Basic Setup](#basic-setup)
- [Common Scenarios](#common-scenarios)

---

## Installation

Install the Syncfusion TimePicker package:

```bash
npm install @syncfusion/ej2-vue-calendars --save
```

---

## CSS Import

Import CSS in `main.js`:

```javascript
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/timepicker/index.css";
```

---

## Basic Setup

Create a TimePicker component:

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
  console.log('Time changed:', args.value);
};
</script>
```

---

## Common Scenarios

### Scenario 1: Work Start Time

```vue
<template>
  <div style="padding: 20px">
    <h3>Work Schedule</h3>
    
    <label>Start Time:</label>
    <ejs-timepicker
      :value="startTime"
      :min="minTime"
      :max="maxTime"
      @change="onStartChange"
    ></ejs-timepicker>
    
    <p v-if="startTime">
      Start: {{ formatTime(startTime) }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const startTime = ref(new Date(2026, 0, 1, 9, 0));
const minTime = ref(new Date(2026, 0, 1, 6, 0));  // 6 AM
const maxTime = ref(new Date(2026, 0, 1, 22, 0)); // 10 PM

const onStartChange = (args) => {
  startTime.value = args.value;
};

const formatTime = (time) => {
  return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};
</script>
```

### Scenario 2: Duration Selection

```vue
<template>
  <div style="padding: 20px">
    <h3>Select Duration</h3>
    
    <label>Duration (hours:minutes):</label>
    <ejs-timepicker
      :value="duration"
      format="HH:mm"
      @change="onDurationChange"
    ></ejs-timepicker>
    
    <p v-if="duration">
      Total minutes: {{ totalMinutes }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const duration = ref(new Date(2026, 0, 1, 1, 30)); // 1 hour 30 minutes

const totalMinutes = computed(() => {
  if (!duration.value) return 0;
  return duration.value.getHours() * 60 + duration.value.getMinutes();
});

const onDurationChange = (args) => {
  duration.value = args.value;
};
</script>
```

### Scenario 3: Business Hours Range

```vue
<template>
  <div style="padding: 20px">
    <h3>Select Available Time</h3>
    
    <label>Available (9 AM - 5 PM):</label>
    <ejs-timepicker
      :value="availableTime"
      :min="businessStart"
      :max="businessEnd"
      :step="30"
    ></ejs-timepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const availableTime = ref(new Date(2026, 0, 1, 14, 0)); // 2:00 PM
const businessStart = ref(new Date(2026, 0, 1, 9, 0));  // 9 AM
const businessEnd = ref(new Date(2026, 0, 1, 17, 0));   // 5 PM
</script>
```

---

## Next Steps

- For time format and display, read `references/timepicker-time-format-and-display.md`.
- For time range selection, read `references/timepicker-time-range-and-selection.md`.
- For customization, read `references/timepicker-customization-and-styling.md`.

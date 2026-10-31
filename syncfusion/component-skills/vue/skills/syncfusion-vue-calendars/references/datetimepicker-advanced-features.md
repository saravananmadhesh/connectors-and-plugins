# Advanced Features (Vue 3)

## Table of Contents
- [DateTime Range Validation](#datetime-range-validation)
- [Business Hours](#business-hours)
- [Timezone Support](#timezone-support)

---

## DateTime Range Validation

Validate selected date-times:

```vue
<template>
  <div style="padding: 20px">
    <ejs-datetimepicker
      :value="selectedDateTime"
      :min="minDateTime"
      :max="maxDateTime"
      @change="validateDateTime"
    ></ejs-datetimepicker>
    
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());
const minDateTime = ref(new Date(2026, 0, 1, 9, 0, 0));
const maxDateTime = ref(new Date(2026, 11, 31, 17, 0, 0));
const error = ref('');

const validateDateTime = (args) => {
  if (!args.value) {
    error.value = 'Please select a date and time';
    return;
  }
  error.value = '';
  selectedDateTime.value = args.value;
};
</script>
```

---

## Business Hours

Restrict to business hours:

```vue
<template>
  <ejs-datetimepicker
    :value="selectedDateTime"
    @renderDayCell="filterBusinessHours"
  ></ejs-datetimepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());
const BUSINESS_START = 9;    // 9 AM
const BUSINESS_END = 17;     // 5 PM
const WEEKEND_DAYS = [0, 6]; // Sunday, Saturday

const filterBusinessHours = (args) => {
  const hour = args.date.getHours();
  const day = args.date.getDay();
  
  // Disable weekends
  if (WEEKEND_DAYS.includes(day)) {
    args.isDisabled = true;
  }
  
  // Disable outside business hours
  if (hour < BUSINESS_START || hour >= BUSINESS_END) {
    args.isDisabled = true;
  }
};
</script>
```

---

## Timezone Support

Handle timezones:

```vue
<template>
  <div style="padding: 20px">
    <label>Timezone:</label>
    <select v-model="selectedTimezone">
      <option value="UTC">UTC</option>
      <option value="America/New_York">Eastern</option>
      <option value="America/Chicago">Central</option>
      <option value="America/Denver">Mountain</option>
      <option value="America/Los_Angeles">Pacific</option>
    </select>
    
    <ejs-datetimepicker
      :value="selectedDateTime"
    ></ejs-datetimepicker>
    
    <p>Selected: {{ formatWithTimezone() }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());
const selectedTimezone = ref('UTC');

const formatWithTimezone = () => {
  if (!selectedDateTime.value) return '';
  
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: selectedTimezone.value,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  return formatter.format(selectedDateTime.value);
};
</script>
```

---

## Next Steps

- For accessibility, read `references/datetimepicker-accessibility.md`.
- For API reference, read `references/datetimepicker-api-reference.md`.

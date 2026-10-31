# DateRangePicker Getting Started (Vue 3)

## Table of Contents
- [Installation](#installation)
- [CSS Import](#css-import)
- [Basic Setup](#basic-setup)
- [Common Scenarios](#common-scenarios)

---

## Installation

Install the Syncfusion DateRangePicker package via npm:

```bash
npm install @syncfusion/ej2-vue-calendars --save
```

---

## CSS Import

Import the necessary CSS files in `main.js` or component:

```javascript
// main.js
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/daterangepicker/index.css";
```

Available themes: `material3`, `bootstrap5`, `bootstrap4`, `fluent`, `fabric`, `highcontrast`, `tailwind`

---

## Basic Setup

Create a simple DateRangePicker component:

```vue
<template>
  <div style="padding: 20px">
    <h3>Date Range Picker</h3>
    
    <ejs-daterangepicker
      :value="dateRange"
      @change="onRangeChange"
    ></ejs-daterangepicker>
    
    <p v-if="dateRange">
      Selected: {{ formatDateRange(dateRange) }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const dateRange = ref(null);

const formatDateRange = (range) => {
  if (!range || !range.startDate || !range.endDate) return 'No range selected';
  return `${range.startDate.toDateString()} to ${range.endDate.toDateString()}`;
};

const onRangeChange = (args) => {
  dateRange.value = {
    startDate: args.startDate,
    endDate: args.endDate
  };
  console.log('Range changed:', args);
};
</script>
```

---

## Common Scenarios

### Scenario 1: Booking Window (Next 30 Days)

```vue
<template>
  <ejs-daterangepicker
    :value="bookingRange"
    :min="today"
    :max="in30Days"
    @change="onBookingChange"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const today = new Date();
const bookingRange = ref({
  startDate: new Date(),
  endDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days later
});
const in30Days = ref(new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000));

const onBookingChange = (args) => {
  console.log('Booking range:', args.startDate, args.endDate);
};
</script>
```

### Scenario 2: Date Range Validation

```vue
<template>
  <div style="padding: 20px">
    <ejs-daterangepicker
      :value="reportRange"
      @change="validateRange"
    ></ejs-daterangepicker>
    
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="reportRange && !error">
      Days: {{ durationDays }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const reportRange = ref(null);
const error = ref('');

const durationDays = computed(() => {
  if (!reportRange.value || !reportRange.value.startDate || !reportRange.value.endDate) return 0;
  const diff = reportRange.value.endDate - reportRange.value.startDate;
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
});

const validateRange = (args) => {
  if (!args.startDate || !args.endDate) {
    error.value = 'Please select both start and end dates';
    return;
  }
  
  if (args.startDate > args.endDate) {
    error.value = 'Start date cannot be after end date';
    return;
  }
  
  const maxDays = 90;
  const duration = Math.floor((args.endDate - args.startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  if (duration > maxDays) {
    error.value = `Date range cannot exceed ${maxDays} days`;
    reportRange.value = null;
    return;
  }
  
  error.value = '';
  reportRange.value = { startDate: args.startDate, endDate: args.endDate };
};
</script>
```

### Scenario 3: Predefined Ranges

```vue
<template>
  <div style="padding: 20px">
    <div style="margin-bottom: 10px">
      <button @click="selectLastWeek">Last 7 Days</button>
      <button @click="selectLastMonth">Last Month</button>
      <button @click="selectLastQuarter">Last Quarter</button>
      <button @click="selectCustom">Custom Range</button>
    </div>
    
    <ejs-daterangepicker
      :value="selectedRange"
    ></ejs-daterangepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
const today = new Date();

const selectLastWeek = () => {
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 7);
  selectedRange.value = {
    startDate: startDate,
    endDate: new Date(today)
  };
};

const selectLastMonth = () => {
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 1);
  selectedRange.value = {
    startDate: startDate,
    endDate: new Date(today)
  };
};

const selectLastQuarter = () => {
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 3);
  selectedRange.value = {
    startDate: startDate,
    endDate: new Date(today)
  };
};

const selectCustom = () => {
  // Open range picker for custom selection
  console.log('Custom range selection activated');
};
</script>
```

---

## Next Steps

- For date range selection, read `references/daterangepicker-date-range-selection.md`.
- For formatting, read `references/daterangepicker-date-range-formatting.md`.
- For advanced patterns, read `references/daterangepicker-advanced-patterns.md`.

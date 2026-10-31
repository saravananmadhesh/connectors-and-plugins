# Date Range Selection (Vue 3)

## Table of Contents
- [Basic Range Selection](#basic-range-selection)
- [Programmatic Selection](#programmatic-selection)
- [Range Validation](#range-validation)
- [Predefined Ranges](#predefined-ranges)

---

## Basic Range Selection

Select date ranges with start and end dates:

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
    @change="onRangeSelected"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref({
  startDate: new Date(2026, 0, 1),
  endDate: new Date(2026, 0, 31)
});

const onRangeSelected = (args) => {
  selectedRange.value = {
    startDate: args.startDate,
    endDate: args.endDate
  };
  console.log('Range selected:', args);
};
</script>
```

---

## Programmatic Selection

Set ranges programmatically:

```vue
<template>
  <div style="padding: 20px">
    <div style="margin-bottom: 10px">
      <button @click="setToday">Today</button>
      <button @click="setThisWeek">This Week</button>
      <button @click="setThisMonth">This Month</button>
    </div>
    
    <ejs-daterangepicker
      ref="rangePickerRef"
      :value="selectedRange"
    ></ejs-daterangepicker>
    
    <p v-if="selectedRange">
      Start: {{ selectedRange.startDate?.toDateString() }}<br>
      End: {{ selectedRange.endDate?.toDateString() }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const rangePickerRef = ref(null);
const selectedRange = ref(null);
const today = new Date();

const setToday = () => {
  selectedRange.value = {
    startDate: new Date(today),
    endDate: new Date(today)
  };
};

const setThisWeek = () => {
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // Sunday
  
  const end = new Date(start);
  end.setDate(end.getDate() + 6); // Saturday
  
  selectedRange.value = {
    startDate: start,
    endDate: end
  };
};

const setThisMonth = () => {
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  selectedRange.value = {
    startDate: start,
    endDate: end
  };
};
</script>
```

---

## Range Validation

Validate selected ranges:

```vue
<template>
  <div style="padding: 20px">
    <ejs-daterangepicker
      :value="selectedRange"
      @change="validateRange"
    ></ejs-daterangepicker>
    
    <p v-if="validation.error" style="color: red">
      {{ validation.error }}
    </p>
    <p v-else-if="selectedRange" style="color: green">
      ✓ Valid range: {{ validation.durationDays }} days
    </p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
const validation = reactive({
  error: '',
  durationDays: 0
});

const validateRange = (args) => {
  validation.error = '';
  
  if (!args.startDate || !args.endDate) {
    validation.error = 'Please select both start and end dates';
    selectedRange.value = null;
    return;
  }
  
  if (args.startDate > args.endDate) {
    validation.error = 'Start date cannot be after end date';
    selectedRange.value = null;
    return;
  }
  
  const duration = Math.floor((args.endDate - args.startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  if (duration < 1) {
    validation.error = 'Range must be at least 1 day';
    selectedRange.value = null;
    return;
  }
  
  if (duration > 365) {
    validation.error = 'Range cannot exceed 365 days';
    selectedRange.value = null;
    return;
  }
  
  validation.durationDays = duration;
  selectedRange.value = {
    startDate: args.startDate,
    endDate: args.endDate
  };
};
</script>
```

---

## Predefined Ranges

Offer common date range options:

```vue
<template>
  <div style="padding: 20px">
    <h4>Quick Ranges:</h4>
    <div style="margin-bottom: 10px">
      <button @click="selectRange('today')">Today</button>
      <button @click="selectRange('yesterday')">Yesterday</button>
      <button @click="selectRange('lastWeek')">Last 7 Days</button>
      <button @click="selectRange('lastMonth')">Last 30 Days</button>
      <button @click="selectRange('thisMonth')">This Month</button>
      <button @click="selectRange('lastMonth')">Last Month</button>
      <button @click="selectRange('thisQuarter')">This Quarter</button>
      <button @click="selectRange('thisYear')">This Year</button>
    </div>
    
    <ejs-daterangepicker
      :value="selectedRange"
    ></ejs-daterangepicker>
    
    <p v-if="selectedRange">
      {{ formatRangeDisplay() }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
const today = new Date();

const getRangeForPreset = (preset) => {
  const ranges = {
    today: {
      startDate: new Date(today),
      endDate: new Date(today)
    },
    yesterday: {
      startDate: new Date(today.getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(today.getTime() - 24 * 60 * 60 * 1000)
    },
    lastWeek: {
      startDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(today)
    },
    lastMonth: {
      startDate: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(today)
    },
    thisMonth: {
      startDate: new Date(today.getFullYear(), today.getMonth(), 1),
      endDate: new Date(today)
    },
    thisQuarter: {
      startDate: new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1),
      endDate: new Date(today)
    },
    thisYear: {
      startDate: new Date(today.getFullYear(), 0, 1),
      endDate: new Date(today)
    }
  };
  return ranges[preset];
};

const selectRange = (preset) => {
  selectedRange.value = getRangeForPreset(preset);
};

const formatRangeDisplay = () => {
  if (!selectedRange.value) return '';
  const start = selectedRange.value.startDate.toLocaleDateString();
  const end = selectedRange.value.endDate.toLocaleDateString();
  const days = Math.floor((selectedRange.value.endDate - selectedRange.value.startDate) / (1000 * 60 * 60 * 24)) + 1;
  return `${start} to ${end} (${days} days)`;
};
</script>
```

---

## Next Steps

- For date range formatting, read `references/daterangepicker-date-range-formatting.md`.
- For advanced patterns, read `references/daterangepicker-advanced-patterns.md`.
- For customization, read `references/daterangepicker-customization-and-styling.md`.

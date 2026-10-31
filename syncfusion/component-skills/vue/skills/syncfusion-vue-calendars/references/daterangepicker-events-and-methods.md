# Events & Methods (Vue 3)

## Table of Contents
- [Events](#events)
- [Methods](#methods)
- [Template Refs](#template-refs)

---

## Events

### Range Selection Events

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
    @change="onRangeChange"
    @created="onCreated"
    @destroyed="onDestroyed"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);

const onRangeChange = (args) => {
  console.log('Range changed:', {
    startDate: args.startDate,
    endDate: args.endDate,
    text: args.text
  });
};

const onCreated = (args) => {
  console.log('DateRangePicker created');
};

const onDestroyed = (args) => {
  console.log('DateRangePicker destroyed');
};
</script>
```

### Day Cell Events

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
    @renderDayCell="onRenderDayCell"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);

const onRenderDayCell = (args) => {
  // Highlight holidays
  const holidays = [1, 7, 25]; // Day numbers
  if (holidays.includes(args.date.getDate())) {
    args.element.style.backgroundColor = '#FFE6E6';
  }
};
</script>
```

---

## Methods

Access methods via template refs:

```vue
<template>
  <div style="padding: 20px">
    <ejs-daterangepicker
      ref="rangePickerRef"
      :value="selectedRange"
    ></ejs-daterangepicker>
    
    <button @click="navigateToPreviousMonth">← Previous</button>
    <button @click="navigateToNextMonth">Next →</button>
    <button @click="setProperties">Update</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const rangePickerRef = ref(null);
const selectedRange = ref(null);

const navigateToPreviousMonth = () => {
  const prev = new Date(selectedRange.value?.startDate || new Date());
  prev.setMonth(prev.getMonth() - 1);
  rangePickerRef.value?.navigateTo('Month', prev);
};

const navigateToNextMonth = () => {
  const next = new Date(selectedRange.value?.endDate || new Date());
  next.setMonth(next.getMonth() + 1);
  rangePickerRef.value?.navigateTo('Month', next);
};

const setProperties = () => {
  rangePickerRef.value?.setProperties({
    locale: 'es'
  });
};
</script>
```

---

## Template Refs

Use refs to access component methods:

```vue
<template>
  <div>
    <ejs-daterangepicker
      ref="rangePickerRef"
      :value="selectedRange"
    ></ejs-daterangepicker>
    
    <button @click="openCalendar">Open Calendar</button>
    <button @click="clearSelection">Clear</button>
    <button @click="showSelectedRange">Show Range</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const rangePickerRef = ref(null);
const selectedRange = ref(null);

const openCalendar = () => {
  rangePickerRef.value?.show();
};

const clearSelection = () => {
  selectedRange.value = null;
};

const showSelectedRange = () => {
  if (selectedRange.value) {
    alert(`${selectedRange.value.startDate.toDateString()} to ${selectedRange.value.endDate.toDateString()}`);
  }
};
</script>
```

---

## Next Steps

- For customization, read `references/daterangepicker-customization-and-styling.md`.
- For advanced patterns, read `references/daterangepicker-advanced-patterns.md`.
- For API reference, read `references/daterangepicker-api-reference.md`.

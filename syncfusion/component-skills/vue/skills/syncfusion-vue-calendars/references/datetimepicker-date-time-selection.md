# Date-Time Selection (Vue 3)

## Table of Contents
- [Basic Date-Time Selection](#basic-date-time-selection)
- [Separate Date and Time](#separate-date-and-time)
- [Time Constraints](#time-constraints)

---

## Basic Date-Time Selection

Select date and time together:

```vue
<template>
  <ejs-datetimepicker
    :value="selectedDateTime"
    format="MM/dd/yyyy HH:mm"
    @change="onDateTimeChange"
  ></ejs-datetimepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());

const onDateTimeChange = (args) => {
  selectedDateTime.value = args.value;
};
</script>
```

---

## Separate Date and Time

Use separate pickers for date and time:

```vue
<template>
  <div style="padding: 20px">
    <label>Date:</label>
    <ejs-datepicker
      :value="selectedDate"
      @change="onDateChange"
    ></ejs-datepicker>
    
    <label>Time:</label>
    <ejs-timepicker
      :value="selectedTime"
      @change="onTimeChange"
    ></ejs-timepicker>
    
    <p>Combined: {{ combinedDateTime }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DatePickerComponent, TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const selectedTime = ref(new Date());

const combinedDateTime = computed(() => {
  if (!selectedDate.value || !selectedTime.value) return '';
  const combined = new Date(
    selectedDate.value.getFullYear(),
    selectedDate.value.getMonth(),
    selectedDate.value.getDate(),
    selectedTime.value.getHours(),
    selectedTime.value.getMinutes()
  );
  return combined.toLocaleString();
});

const onDateChange = (args) => {
  selectedDate.value = args.value;
};

const onTimeChange = (args) => {
  selectedTime.value = args.value;
};
</script>
```

---

## Time Constraints

Limit selectable times:

```vue
<template>
  <ejs-datetimepicker
    :value="selectedDateTime"
    :min="minDateTime"
    :max="maxDateTime"
  ></ejs-datetimepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());

const minDateTime = ref(new Date(2026, 0, 1, 9, 0, 0));   // 9:00 AM
const maxDateTime = ref(new Date(2026, 0, 31, 17, 0, 0)); // 5:00 PM
</script>
```

---

## Next Steps

- For time configuration, read `references/datetimepicker-time-configuration.md`.
- For customization, read `references/datetimepicker-styling-and-customization.md`.

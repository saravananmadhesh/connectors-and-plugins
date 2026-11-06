# DateTimePicker Getting Started (Vue 3)

## Table of Contents
- [Installation](#installation)
- [CSS Import](#css-import)
- [Basic Setup](#basic-setup)
- [Common Scenarios](#common-scenarios)

---

## Installation

Install the Syncfusion DateTimePicker package:

```bash
npm install @syncfusion/ej2-vue-calendars --save
```

---

## CSS Import

Import CSS in `main.js`:

```javascript
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/datetimepicker/index.css";
```

---

## Basic Setup

Create a DateTimePicker component:

```vue
<template>
  <ejs-datetimepicker
    :value="selectedDateTime"
    @change="onDateTimeChange"
  ></ejs-datetimepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());

const onDateTimeChange = (args) => {
  selectedDateTime.value = args.value;
  console.log('DateTime changed:', args.value);
};
</script>
```

---

## Common Scenarios

### Scenario 1: Appointment Booking

```vue
<template>
  <div style="padding: 20px">
    <h3>Book Appointment</h3>
    
    <ejs-datetimepicker
      :value="appointmentTime"
      :min="now"
      :max="inThreeDays"
      @change="onAppointmentChange"
    ></ejs-datetimepicker>
    
    <p v-if="appointmentTime">
      Appointment: {{ appointmentTime.toLocaleString() }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const now = new Date();
const appointmentTime = ref(new Date());
const inThreeDays = ref(new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000));

const onAppointmentChange = (args) => {
  appointmentTime.value = args.value;
};
</script>
```

### Scenario 2: Task Deadline with Time

```vue
<template>
  <div style="padding: 20px">
    <h3>Set Task Deadline</h3>
    
    <ejs-datetimepicker
      :value="taskDeadline"
      :min="now"
      @change="onDeadlineChange"
    ></ejs-datetimepicker>
    
    <p v-if="taskDeadline">
      Deadline: {{ formatDeadline(taskDeadline) }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const now = new Date();
const taskDeadline = ref(new Date());

const onDeadlineChange = (args) => {
  taskDeadline.value = args.value;
};

const formatDeadline = (date) => {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>
```

### Scenario 3: Event Scheduling

```vue
<template>
  <div style="padding: 20px">
    <h3>Schedule Event</h3>
    
    <label>Start Time:</label>
    <ejs-datetimepicker
      :value="eventStart"
      @change="onStartChange"
    ></ejs-datetimepicker>
    
    <label>End Time:</label>
    <ejs-datetimepicker
      :value="eventEnd"
      :min="eventStart"
      @change="onEndChange"
    ></ejs-datetimepicker>
    
    <p v-if="eventStart && eventEnd">
      Duration: {{ durationMinutes }} minutes
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const eventStart = ref(new Date());
const eventEnd = ref(new Date(eventStart.value.getTime() + 60 * 60 * 1000)); // 1 hour later

const durationMinutes = computed(() => {
  if (!eventStart.value || !eventEnd.value) return 0;
  return Math.round((eventEnd.value - eventStart.value) / (1000 * 60));
});

const onStartChange = (args) => {
  eventStart.value = args.value;
};

const onEndChange = (args) => {
  eventEnd.value = args.value;
};
</script>
```

---

## Next Steps

- For date-time selection, read `references/datetimepicker-date-time-selection.md`.
- For time configuration, read `references/datetimepicker-time-configuration.md`.
- For customization, read `references/datetimepicker-styling-and-customization.md`.

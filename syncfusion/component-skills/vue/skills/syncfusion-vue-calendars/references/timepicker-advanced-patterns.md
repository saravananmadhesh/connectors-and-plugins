# Advanced Patterns (Vue 3)

## Table of Contents
- [Duration Calculation](#duration-calculation)
- [Business Hours Validation](#business-hours-validation)
- [Time Slot Filtering](#time-slot-filtering)

---

## Duration Calculation

Calculate time duration:

```vue
<template>
  <div style="padding: 20px">
    <label>Start Time:</label>
    <ejs-timepicker
      :value="startTime"
      @change="onStartChange"
    ></ejs-timepicker>
    
    <label>End Time:</label>
    <ejs-timepicker
      :value="endTime"
      @change="onEndChange"
    ></ejs-timepicker>
    
    <p v-if="startTime && endTime">
      Duration: {{ durationMinutes }} minutes
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const startTime = ref(new Date(2026, 0, 1, 9, 0));
const endTime = ref(new Date(2026, 0, 1, 17, 0));

const durationMinutes = computed(() => {
  if (!startTime.value || !endTime.value) return 0;
  const diff = endTime.value - startTime.value;
  return Math.floor(diff / (1000 * 60));
});

const onStartChange = (args) => {
  startTime.value = args.value;
};

const onEndChange = (args) => {
  endTime.value = args.value;
};
</script>
```

---

## Business Hours Validation

Validate against business hours:

```vue
<template>
  <div style="padding: 20px">
    <ejs-timepicker
      :value="selectedTime"
      @change="validateBusinessHours"
    ></ejs-timepicker>
    
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-else-if="selectedTime" style="color: green">✓ Valid time</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedTime = ref(new Date());
const error = ref('');

const BUSINESS_START = 9;  // 9 AM
const BUSINESS_END = 17;   // 5 PM

const validateBusinessHours = (args) => {
  if (!args.value) return;
  
  const hour = args.value.getHours();
  
  if (hour < BUSINESS_START) {
    error.value = `Time must be after ${BUSINESS_START}:00 AM`;
    selectedTime.value = null;
  } else if (hour >= BUSINESS_END) {
    error.value = `Time must be before ${BUSINESS_END}:00 PM`;
    selectedTime.value = null;
  } else {
    error.value = '';
    selectedTime.value = args.value;
  }
};
</script>
```

---

## Time Slot Filtering

Filter available time slots:

```vue
<template>
  <div style="padding: 20px">
    <h3>Available Slots (30-min intervals)</h3>
    
    <select v-model="selectedSlot" @change="onSlotChange">
      <option v-for="slot in availableSlots" :key="slot" :value="slot">
        {{ formatTime(slot) }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedSlot = ref(null);

const BUSINESS_START = 9;   // 9 AM
const BUSINESS_END = 17;    // 5 PM
const SLOT_INTERVAL = 30;   // 30 minutes
const BOOKED_SLOTS = [10.5, 13, 14, 15.5]; // Booked times (decimal hours)

const availableSlots = computed(() => {
  const slots = [];
  for (let hour = BUSINESS_START; hour < BUSINESS_END; hour++) {
    for (let minute = 0; minute < 60; minute += SLOT_INTERVAL) {
      const decimalHour = hour + minute / 60;
      if (!BOOKED_SLOTS.includes(decimalHour)) {
        const date = new Date(2026, 0, 1, hour, minute);
        slots.push(date);
      }
    }
  }
  return slots;
});

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const onSlotChange = (event) => {
  selectedSlot.value = event.target.value;
};
</script>
```

---

## Next Steps

- For API reference, read `references/timepicker-api-reference.md`.
- For customization, read `references/timepicker-customization-and-styling.md`.

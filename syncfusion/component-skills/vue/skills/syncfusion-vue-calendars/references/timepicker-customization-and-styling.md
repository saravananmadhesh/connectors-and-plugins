# Customization & Styling (Vue 3)

## Table of Contents
- [Theme Application](#theme-application)
- [CSS Customization](#css-customization)
- [Responsive Design](#responsive-design)

---

## Theme Application

Apply themes to TimePicker:

```vue
<template>
  <ejs-timepicker
    :value="selectedTime"
  ></ejs-timepicker>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

// Import theme
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-buttons/styles/material3.css';
import '@syncfusion/ej2-inputs/styles/material3.css';
import '@syncfusion/ej2-popups/styles/material3.css';
import '@syncfusion/ej2-calendars/styles/material3.css';

const selectedTime = ref(new Date());
</script>
```

Available themes: `material3`, `bootstrap5`, `bootstrap4`, `fluent`, `fabric`, `highcontrast`, `tailwind`

---

## CSS Customization

Customize with scoped styles:

```vue
<template>
  <ejs-timepicker
    :value="selectedTime"
    class="custom-timepicker"
  ></ejs-timepicker>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedTime = ref(new Date());
</script>

<style scoped>
.custom-timepicker :deep(.e-input-group) {
  border-radius: 8px;
  border: 2px solid #1976d2;
}

.custom-timepicker :deep(.e-input) {
  padding: 12px;
  font-size: 16px;
}

.custom-timepicker :deep(.e-timepicker) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
```

---

## Responsive Design

Make responsive for mobile:

```vue
<template>
  <div class="timepicker-container">
    <ejs-timepicker
      :value="selectedTime"
    ></ejs-timepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedTime = ref(new Date());
</script>

<style scoped>
.timepicker-container {
  width: 100%;
  max-width: 300px;
}

@media (max-width: 600px) {
  .timepicker-container :deep(.e-input) {
    font-size: 16px; /* Prevent zoom */
  }
}
</style>
```

---

## Next Steps

- For advanced patterns, read `references/timepicker-advanced-patterns.md`.
- For API reference, read `references/timepicker-api-reference.md`.

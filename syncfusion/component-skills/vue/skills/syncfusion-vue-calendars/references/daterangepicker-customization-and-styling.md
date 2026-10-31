# Customization & Styling (Vue 3)

## Table of Contents
- [Theme Application](#theme-application)
- [CSS Customization](#css-customization)
- [Custom Colors](#custom-colors)
- [Responsive Design](#responsive-design)

---

## Theme Application

Apply themes to DateRangePicker:

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

// Import theme
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-buttons/styles/material3.css';
import '@syncfusion/ej2-inputs/styles/material3.css';
import '@syncfusion/ej2-popups/styles/material3.css';
import '@syncfusion/ej2-calendars/styles/material3.css';

const selectedRange = ref(null);
</script>
```

Available themes: `material3`, `bootstrap5`, `bootstrap4`, `fluent`, `fabric`, `highcontrast`, `tailwind`

---

## CSS Customization

Customize styling with scoped styles:

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
    class="custom-range-picker"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
</script>

<style scoped>
.custom-range-picker :deep(.e-input-group) {
  border-radius: 8px;
  border: 2px solid #1976d2;
}

.custom-range-picker :deep(.e-input) {
  padding: 12px;
  font-size: 16px;
}

.custom-range-picker :deep(.e-calendar) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-range-picker :deep(.e-startdate),
.custom-range-picker :deep(.e-enddate) {
  background-color: #E3F2FD;
}

.custom-range-picker :deep(.e-selected) {
  background-color: #1976d2;
  color: white;
}
</style>
```

---

## Custom Colors

Customize range colors:

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
    class="custom-colors"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
</script>

<style scoped>
.custom-colors :deep(.e-startdate) {
  background-color: #4CAF50 !important;
  color: white !important;
}

.custom-colors :deep(.e-enddate) {
  background-color: #FF9800 !important;
  color: white !important;
}

.custom-colors :deep(.e-in-range) {
  background-color: #B3E5FC !important;
}
</style>
```

---

## Responsive Design

Make responsive for mobile:

```vue
<template>
  <div class="range-picker-container">
    <ejs-daterangepicker
      :value="selectedRange"
    ></ejs-daterangepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
</script>

<style scoped>
.range-picker-container {
  width: 100%;
  max-width: 500px;
}

@media (max-width: 600px) {
  .range-picker-container :deep(.e-input) {
    font-size: 16px; /* Prevent zoom */
  }
  
  .range-picker-container :deep(.e-calendar) {
    max-width: 100%;
  }
}
</style>
```

---

## Next Steps

- For advanced patterns, read `references/daterangepicker-advanced-patterns.md`.
- For events and methods, read `references/daterangepicker-events-and-methods.md`.
- For API reference, read `references/daterangepicker-api-reference.md`.

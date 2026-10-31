# Customization & Styling (Vue 3)

## Table of Contents
- [Theme Application](#theme-application)
- [CSS Customization](#css-customization)
- [Input Field Styling](#input-field-styling)
- [Responsive Design](#responsive-design)

---

## Theme Application

Apply Syncfusion themes to your DatePicker:

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

// Import theme in main.js or here
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-buttons/styles/material3.css';
import '@syncfusion/ej2-inputs/styles/material3.css';
import '@syncfusion/ej2-popups/styles/material3.css';
import '@syncfusion/ej2-calendars/styles/material3.css';

const selectedDate = ref(new Date());
</script>
```

Available themes: `material3`, `bootstrap5`, `bootstrap4`, `fluent`, `fabric`, `highcontrast`, `tailwind`

---

## CSS Customization

Apply custom CSS to style the DatePicker:

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    class="custom-datepicker"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>

<style scoped>
.custom-datepicker :deep(.e-input-group) {
  border: 2px solid #1976d2;
  border-radius: 8px;
}

.custom-datepicker :deep(.e-input) {
  font-size: 16px;
  padding: 10px;
}

.custom-datepicker :deep(.e-calendar) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
```

---

## Input Field Styling

Customize the input field appearance:

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    class="styled-input"
    placeholder="Select a date..."
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>

<style scoped>
.styled-input :deep(.e-input) {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 12px;
  font-size: 14px;
}

.styled-input :deep(.e-input:focus) {
  background-color: white;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}
</style>
```

---

## Responsive Design

Make DatePicker responsive:

```vue
<template>
  <div class="datepicker-container">
    <ejs-datepicker
      :value="selectedDate"
    ></ejs-datepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>

<style scoped>
.datepicker-container {
  width: 100%;
  max-width: 400px;
}

@media (max-width: 600px) {
  .datepicker-container :deep(.e-input) {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}
</style>
```

---

## Next Steps

- For date formats, read `references/datepicker-date-formats-and-input.md`.
- For validation, read `references/datepicker-date-range-and-validation.md`.
- For accessibility, read `references/datepicker-accessibility-and-keyboard.md`.

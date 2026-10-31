# Styling & Customization (Vue 3)

## Table of Contents
- [Theme Application](#theme-application)
- [CSS Customization](#css-customization)
- [Custom Layouts](#custom-layouts)

---

## Theme Application

Apply themes:

```vue
<template>
  <ejs-datetimepicker
    :value="selectedDateTime"
  ></ejs-datetimepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

// Import theme
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-buttons/styles/material3.css';
import '@syncfusion/ej2-inputs/styles/material3.css';
import '@syncfusion/ej2-popups/styles/material3.css';
import '@syncfusion/ej2-calendars/styles/material3.css';

const selectedDateTime = ref(new Date());
</script>
```

---

## CSS Customization

Customize with scoped styles:

```vue
<template>
  <ejs-datetimepicker
    :value="selectedDateTime"
    class="custom-datetime"
  ></ejs-datetimepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());
</script>

<style scoped>
.custom-datetime :deep(.e-input-group) {
  border-radius: 8px;
  border: 2px solid #1976d2;
}

.custom-datetime :deep(.e-input) {
  padding: 12px;
  font-size: 16px;
}
</style>
```

---

## Custom Layouts

Create responsive layouts:

```vue
<template>
  <div class="datetime-container">
    <ejs-datetimepicker
      :value="selectedDateTime"
    ></ejs-datetimepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());
</script>

<style scoped>
.datetime-container {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}

@media (max-width: 600px) {
  .datetime-container :deep(.e-input) {
    font-size: 16px;
  }
}
</style>
```

---

## Next Steps

- For advanced features, read `references/datetimepicker-advanced-features.md`.
- For accessibility, read `references/datetimepicker-accessibility.md`.
- For API reference, read `references/datetimepicker-api-reference.md`.

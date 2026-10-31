# Date Range Formatting (Vue 3)

## Table of Contents
- [Format Configuration](#format-configuration)
- [Start Date Format](#start-date-format)
- [End Date Format](#end-date-format)
- [Separator Customization](#separator-customization)

---

## Format Configuration

Set date format for range picker:

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
    :startDateFormat="'M/dd/yyyy'"
    :endDateFormat="'M/dd/yyyy'"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
</script>
```

---

## Start Date Format

Format the start date:

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
    :startDateFormat="'yyyy-MM-dd'"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
</script>
```

---

## End Date Format

Format the end date:

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
    :endDateFormat="'MMMM dd, yyyy'"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
</script>
```

---

## Separator Customization

Customize the separator between dates:

```vue
<template>
  <ejs-daterangepicker
    :value="selectedRange"
    :separator="' ~ '"
  ></ejs-daterangepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateRangePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedRange = ref(null);
</script>
```

---

## Common Format Examples

| Format | Example |
|--------|---------|
| `'M/d/y'` | 1/1/26 |
| `'M/dd/yyyy'` | 1/01/2026 |
| `'MM/dd/yyyy'` | 01/01/2026 |
| `'dd/MM/yyyy'` | 01/01/2026 |
| `'yyyy-MM-dd'` | 2026-01-01 |
| `'MMMM dd, yyyy'` | January 01, 2026 |
| `'ddd, MMM d, yyyy'` | Wed, Jan 1, 2026 |

---

## Next Steps

- For advanced patterns, read `references/daterangepicker-advanced-patterns.md`.
- For customization, read `references/daterangepicker-customization-and-styling.md`.
- For API reference, read `references/daterangepicker-api-reference.md`.

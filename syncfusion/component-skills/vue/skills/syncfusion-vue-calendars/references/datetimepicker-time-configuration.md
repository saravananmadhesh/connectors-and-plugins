# Time Configuration (Vue 3)

## Table of Contents
- [Hour Format](#hour-format)
- [Time Step Configuration](#time-step-configuration)
- [Interval Selection](#interval-selection)

---

## Hour Format

Configure 12-hour or 24-hour format:

```vue
<template>
  <div style="padding: 20px">
    <label>24-Hour Format:</label>
    <ejs-datetimepicker
      :value="selectedDateTime"
      format="MM/dd/yyyy HH:mm"
    ></ejs-datetimepicker>
    
    <label>12-Hour Format:</label>
    <ejs-datetimepicker
      :value="selectedDateTime"
      format="MM/dd/yyyy hh:mm a"
    ></ejs-datetimepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());
</script>
```

Format Codes:
- `HH` - 24-hour (00-23)
- `hh` - 12-hour (01-12)
- `mm` - Minutes (00-59)
- `ss` - Seconds (00-59)
- `a` - AM/PM

---

## Time Step Configuration

Set minute step interval:

```vue
<template>
  <ejs-datetimepicker
    :value="selectedDateTime"
    :step="30"
  ></ejs-datetimepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());
</script>
```

The `:step` prop sets minute intervals (default: 1).

---

## Interval Selection

Allow quick time selection by intervals:

```vue
<template>
  <div style="padding: 20px">
    <label>30-Minute Intervals:</label>
    <ejs-datetimepicker
      :value="selectedDateTime"
      :step="30"
      format="MM/dd/yyyy hh:mm a"
    ></ejs-datetimepicker>
    
    <label>15-Minute Intervals:</label>
    <ejs-datetimepicker
      :value="selectedDateTime"
      :step="15"
      format="MM/dd/yyyy hh:mm a"
    ></ejs-datetimepicker>
    
    <label>Hourly:</label>
    <ejs-datetimepicker
      :value="selectedDateTime"
      :step="60"
      format="MM/dd/yyyy hh:mm a"
    ></ejs-datetimepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());
</script>
```

---

## Next Steps

- For events and methods, read `references/datetimepicker-events-and-methods.md`.
- For customization, read `references/datetimepicker-styling-and-customization.md`.
- For advanced features, read `references/datetimepicker-advanced-features.md`.

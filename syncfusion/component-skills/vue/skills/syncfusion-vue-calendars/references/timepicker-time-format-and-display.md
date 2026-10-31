# Time Format & Display (Vue 3)

## Table of Contents
- [Format Configuration](#format-configuration)
- [12-Hour vs 24-Hour](#12-hour-vs-24-hour)
- [Custom Format Patterns](#custom-format-patterns)

---

## Format Configuration

Set the time display format:

```vue
<template>
  <div style="padding: 20px">
    <label>24-Hour Format:</label>
    <ejs-timepicker
      :value="selectedTime"
      format="HH:mm:ss"
    ></ejs-timepicker>
    
    <label>12-Hour Format:</label>
    <ejs-timepicker
      :value="selectedTime"
      format="hh:mm a"
    ></ejs-timepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedTime = ref(new Date());
</script>
```

---

## 12-Hour vs 24-Hour

Compare format options:

```vue
<template>
  <div style="padding: 20px">
    <table style="border-collapse: collapse; width: 100%">
      <tr>
        <th style="border: 1px solid #ccc; padding: 8px">Format</th>
        <th style="border: 1px solid #ccc; padding: 8px">Example</th>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px">HH:mm</td>
        <td style="border: 1px solid #ccc; padding: 8px">14:30</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px">hh:mm a</td>
        <td style="border: 1px solid #ccc; padding: 8px">02:30 PM</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px">HH:mm:ss</td>
        <td style="border: 1px solid #ccc; padding: 8px">14:30:45</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px">hh:mm:ss a</td>
        <td style="border: 1px solid #ccc; padding: 8px">02:30:45 PM</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
</script>
```

---

## Custom Format Patterns

Create custom time formats:

```vue
<template>
  <ejs-timepicker
    :value="selectedTime"
    :format="customFormat"
  ></ejs-timepicker>
</template>

<script setup>
import { ref } from 'vue';
import { TimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedTime = ref(new Date());

// Custom format patterns
const customFormat = ref('HH:mm'); // 24-hour format with minutes only
</script>
```

Format Placeholders:
- `HH` - 24-hour (00-23)
- `hh` - 12-hour (01-12)
- `mm` - Minutes (00-59)
- `ss` - Seconds (00-59)
- `a` - AM/PM
- `tt` - AM/PM (uppercase)

---

## Next Steps

- For time range selection, read `references/timepicker-time-range-and-selection.md`.
- For events and methods, read `references/timepicker-events-and-methods.md`.
- For customization, read `references/timepicker-customization-and-styling.md`.

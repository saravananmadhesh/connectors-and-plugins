# Accessibility (Vue 3)

## WCAG Compliance

```vue
<template>
  <div>
    <label for="datetime-input">
      Select Date and Time:
    </label>
    
    <ejs-datetimepicker
      id="datetime-input"
      :value="selectedDateTime"
      aria-label="Date and time selection"
      aria-describedby="datetime-help"
    ></ejs-datetimepicker>
    
    <p id="datetime-help" class="sr-only">
      Enter a date and time or use the calendar picker
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
```

---

## Keyboard Navigation

- Tab: Focus input
- Alt+Down: Open calendar
- Arrow keys: Navigate dates/times
- Enter: Select
- Escape: Close

---

## Screen Reader Support

```vue
<template>
  <div role="region" aria-label="DateTime Picker">
    <ejs-datetimepicker
      :value="selectedDateTime"
      @change="announceSelection"
    ></ejs-datetimepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DateTimePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDateTime = ref(new Date());

const announceSelection = (args) => {
  if (args.value) {
    const announcement = `Date and time selected: ${args.value.toLocaleString()}`;
    console.log(announcement);
  }
};
</script>
```

---

## Next Steps

- For API reference, read `references/datetimepicker-api-reference.md`.
- For advanced features, read `references/datetimepicker-advanced-features.md`.

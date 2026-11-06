# Accessibility & Keyboard Navigation (Vue 3)

## Table of Contents
- [WCAG 2.1 Compliance](#wcag-21-compliance)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Screen Reader Support](#screen-reader-support)
- [Live Regions](#live-regions)

---

## WCAG 2.1 Compliance

Ensure your DatePicker meets accessibility standards:

```vue
<template>
  <div>
    <label for="datepicker-input">Select a date:</label>
    <ejs-datepicker
      id="datepicker-input"
      ref="datePickerRef"
      :value="selectedDate"
      aria-label="Date picker input"
      aria-describedby="datepicker-help"
      @change="onChange"
    ></ejs-datepicker>
    <p id="datepicker-help" class="sr-only">
      Enter date in MM/DD/YYYY format or use the calendar picker
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const datePickerRef = ref(null);
const selectedDate = ref(new Date());

const onChange = (args) => {
  selectedDate.value = args.value;
  // Announce to screen readers
  announceToScreenReader(`Date selected: ${args.value.toDateString()}`);
};

const announceToScreenReader = (message) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => announcement.remove(), 1000);
};
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

## Keyboard Shortcuts

Users can navigate without a mouse:

| Shortcut | Action |
|----------|--------|
| Tab | Focus input |
| Alt+Down Arrow | Open calendar |
| Escape | Close calendar |
| Arrow Up/Down/Left/Right | Navigate calendar cells |
| Home | First day of month |
| End | Last day of month |
| Page Up | Previous month |
| Page Down | Next month |
| Ctrl+Page Up | Previous year |
| Ctrl+Page Down | Next year |
| Enter/Space | Select focused date |

### Example: Keyboard Navigation

```vue
<template>
  <div style="padding: 20px">
    <label for="keyboard-datepicker">Date (Keyboard Accessible):</label>
    <ejs-datepicker
      id="keyboard-datepicker"
      ref="datePickerRef"
      :value="selectedDate"
      @keydown="handleKeydown"
    ></ejs-datepicker>
    
    <div id="nav-help" style="margin-top: 10px; font-size: 12px; color: #666">
      <p>Keyboard Help:</p>
      <ul>
        <li>Tab to focus</li>
        <li>Alt+Down to open calendar</li>
        <li>Arrow keys to navigate</li>
        <li>Enter to select</li>
        <li>Esc to close</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const datePickerRef = ref(null);
const selectedDate = ref(new Date());

const handleKeydown = (event) => {
  // Custom keyboard handling if needed
  console.log('Key pressed:', event.key, event.altKey ? '(with Alt)' : '');
};
</script>
```

---

## Screen Reader Support

Ensure screen readers announce calendar information:

```vue
<template>
  <div>
    <label for="sr-datepicker">
      Select date (Screen Reader Enabled):
    </label>
    
    <ejs-datepicker
      id="sr-datepicker"
      ref="datePickerRef"
      :value="selectedDate"
      aria-label="Date selection picker"
      aria-expanded="false"
      @change="onDateChange"
    ></ejs-datepicker>
    
    <!-- Status announcement region -->
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      id="sr-announcement"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const datePickerRef = ref(null);
const selectedDate = ref(new Date());

const onDateChange = (args) => {
  selectedDate.value = args.value;
  announceSelection(args.value);
};

const announceSelection = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const announcement = date.toLocaleDateString('en-US', options);
  
  const region = document.getElementById('sr-announcement');
  if (region) {
    region.textContent = `Date selected: ${announcement}`;
  }
};
</script>
```

---

## Live Regions

Use ARIA live regions for dynamic announcements:

```vue
<template>
  <div style="padding: 20px">
    <ejs-datepicker
      :value="selectedDate"
      @change="handleDateChange"
    ></ejs-datepicker>
    
    <!-- Live region for announcements -->
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      id="live-region"
      class="sr-only"
    ></div>
    
    <!-- Alert region for errors -->
    <div
      role="alert"
      aria-live="assertive"
      id="error-region"
      v-if="error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const error = ref('');

const handleDateChange = (args) => {
  if (!args.value) {
    error.value = 'Invalid date. Please try again.';
    announceError();
    return;
  }
  
  error.value = '';
  selectedDate.value = args.value;
  announceDateSelected(args.value);
};

const announceDateSelected = (date) => {
  const region = document.getElementById('live-region');
  if (region) {
    region.textContent = `Date successfully selected: ${date.toDateString()}`;
  }
};

const announceError = () => {
  const region = document.getElementById('error-region');
  if (region) {
    region.textContent = error.value;
  }
};
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

#error-region {
  color: red;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid red;
  border-radius: 4px;
}
</style>
```

---

## Best Practices

1. ✅ Use `<label>` with `for` attribute for all inputs
2. ✅ Provide `aria-label` or `aria-labelledby` for clarity
3. ✅ Use `aria-describedby` for help text
4. ✅ Implement live regions for dynamic changes
5. ✅ Ensure sufficient color contrast (WCAG AA minimum)
6. ✅ Test with screen readers (NVDA, JAWS, VoiceOver)
7. ✅ Verify keyboard navigation works fully
8. ✅ Announce validation errors with `role="alert"`

---

## Next Steps

- For globalization, read `references/datepicker-globalization-and-localization.md`.
- For customization, read `references/datepicker-customization-and-styling.md`.
- For API reference, read `references/datepicker-api-reference.md`.

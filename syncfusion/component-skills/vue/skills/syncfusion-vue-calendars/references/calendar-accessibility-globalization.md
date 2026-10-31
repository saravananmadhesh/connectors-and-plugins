# Accessibility & Globalization (Vue 3)

## Table of Contents
- [WCAG 2.1 Compliance](#wcag-21-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Labels & Roles](#aria-labels--roles)
- [Screen Reader Support](#screen-reader-support)
- [Localization](#localization)
- [RTL Support](#rtl-support)
- [Accessibility Best Practices](#accessibility-best-practices)

---

## WCAG 2.1 Compliance

The Syncfusion Calendar component is built with WCAG 2.1 Level AA compliance:

- **Perceivable:** Clear visual contrast, sufficient color differentiation
- **Operable:** Full keyboard navigation support, no keyboard traps
- **Understandable:** Clear labeling, predictable behavior
- **Robust:** Semantic HTML, ARIA attributes, assistive technology support

### Basic Accessible Calendar

```vue
<template>
  <div style="padding: 20px">
    <label for="calendar-picker" style="display: block; margin-bottom: 10px">
      <strong>Select a date:</strong>
    </label>
    <ejs-calendar
      id="calendar-picker"
      :value="selectedDate"
      :aria-label="'Calendar date picker'"
      @change="onChange"
    ></ejs-calendar>
    <output aria-live="polite" aria-atomic="true">
      Selected date: {{ selectedDate?.toDateString() }}
    </output>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const onChange = (args) => {
  selectedDate.value = args.value;
};
</script>
```

---

## Keyboard Navigation

The Calendar supports full keyboard navigation for accessibility.

### Supported Keys

| Key | Action |
|-----|--------|
| **Arrow Up** | Move to same date in previous week |
| **Arrow Down** | Move to same date in next week |
| **Arrow Left** | Move to previous day |
| **Arrow Right** | Move to next day |
| **Home** | Move to first day of month |
| **End** | Move to last day of month |
| **Page Up** | Move to previous month |
| **Page Down** | Move to next month |
| **Ctrl + Page Up** | Move to previous year |
| **Ctrl + Page Down** | Move to next year |
| **Enter/Space** | Select focused date |
| **Escape** | Close calendar (if in picker) |

### Keyboard Navigation Example

```vue
<template>
  <div style="padding: 20px">
    <h3>Use keyboard to navigate</h3>
    <ejs-calendar
      ref="calendarRef"
      :value="selectedDate"
      @change="onChange"
    ></ejs-calendar>
    
    <p aria-live="polite">
      Use arrow keys to navigate dates. Press Enter to select.
    </p>
    <p>Selected: {{ selectedDate?.toDateString() }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const calendarRef = ref(null);
const selectedDate = ref(new Date());

const onChange = (args) => {
  selectedDate.value = args.value;
};

// Calendar has built-in keyboard support
// No additional configuration needed
</script>
```

---

## ARIA Labels & Roles

The Calendar component includes semantic ARIA attributes for screen readers.

### Adding Custom ARIA Labels

```vue
<template>
  <div style="padding: 20px">
    <h2 id="calendar-title">Date Selection</h2>
    <p id="calendar-description">
      Use the calendar below to select a date. Navigate with arrow keys and press Enter to select.
    </p>
    
    <ejs-calendar
      :value="selectedDate"
      :aria-labelledby="'calendar-title'"
      :aria-describedby="'calendar-description'"
      @change="onChange"
      role="group"
    ></ejs-calendar>
    
    <div role="status" aria-live="polite" aria-atomic="true">
      <p>Currently selected: {{ selectedDate?.toDateString() }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const onChange = (args) => {
  selectedDate.value = args.value;
};
</script>
```

### ARIA Attributes Reference

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-label` | Describe component purpose | "Select a date from calendar" |
| `aria-labelledby` | Reference heading/label element | `aria-labelledby="calendar-title"` |
| `aria-describedby` | Additional description | `aria-describedby="help-text"` |
| `aria-live` | Announce dynamic changes | `aria-live="polite"` |
| `aria-atomic` | Include full content in announcements | `aria-atomic="true"` |
| `role` | Define semantic role | `role="group"` or `role="region"` |
| `aria-disabled` | Indicate disabled state | `aria-disabled="true"` |

---

## Screen Reader Support

Configure the calendar for optimal screen reader experience.

### Announcement Region

```vue
<template>
  <div style="padding: 20px">
    <h2>Date Picker with Screen Reader Support</h2>
    
    <ejs-calendar
      :value="selectedDate"
      @change="announceSelection"
    ></ejs-calendar>
    
    <!-- Live region for announcements -->
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
      id="announcement-region"
    >
      {{ announcement }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const announcement = ref('');

const announceSelection = (args) => {
  selectedDate.value = args.value;
  const dateStr = args.value.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  announcement.value = `Date selected: ${dateStr}`;
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

### Multi-Selection with Announcements

```vue
<template>
  <ejs-calendar
    :isMultiSelection="true"
    :values="selectedDates"
    @change="handleDateSelection"
  ></ejs-calendar>
  
  <div role="status" aria-live="assertive">
    {{ selectionMessage }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDates = ref([]);
const selectionMessage = ref('');

const handleDateSelection = (args) => {
  if (args.values) {
    selectedDates.value = args.values;
    selectionMessage.value = `${args.values.length} dates selected`;
  }
};
</script>
```

---

## Localization

Configure the calendar for different languages and regions.

### Locale Configuration

```vue
<template>
  <div style="padding: 20px">
    <div style="margin-bottom: 10px">
      <button @click="setLocale('en')">English</button>
      <button @click="setLocale('es')">Español</button>
      <button @click="setLocale('fr')">Français</button>
      <button @click="setLocale('de')">Deutsch</button>
    </div>
    
    <ejs-calendar
      :value="selectedDate"
      :locale="currentLocale"
    ></ejs-calendar>
    
    <p>Current locale: {{ currentLocale }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const currentLocale = ref('en');

const setLocale = (locale) => {
  currentLocale.value = locale;
};
</script>
```

### Custom Locale Strings

```vue
<template>
  <ejs-calendar
    :value="selectedDate"
    locale="custom"
  ></ejs-calendar>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';
import { registerLocale } from '@syncfusion/ej2-base';

const selectedDate = ref(new Date());

// Register custom locale
registerLocale({
  'custom': {
    'calendar': {
      'today': 'Hoy',
      'days': ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      'months': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      'shortMonths': ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      'eras': ['AC', 'DC']
    }
  }
});
</script>
```

### Supported Locales

Common supported locales: `en`, `es`, `fr`, `de`, `it`, `ja`, `ko`, `zh`, `ar`, `he`, `pt`, `ru`, and many more.

---

## RTL Support

Enable right-to-left display for Arabic, Hebrew, Persian, and other RTL languages.

### Enable RTL

```vue
<template>
  <div dir="rtl">
    <ejs-calendar
      :value="selectedDate"
      :enableRtl="true"
      locale="ar"
    ></ejs-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

### RTL with Custom Locale

```vue
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <button @click="isRTL = !isRTL">Toggle RTL</button>
    
    <ejs-calendar
      :value="selectedDate"
      :enableRtl="isRTL"
      :locale="currentLocale"
    ></ejs-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const isRTL = ref(false);
const currentLocale = ref('en');
</script>
```

---

## Accessibility Best Practices

### 1. Always Use Labels

```vue
<!-- ✅ Good -->
<label for="date-picker">Select a date:</label>
<ejs-calendar id="date-picker"></ejs-calendar>

<!-- ❌ Avoid -->
<ejs-calendar></ejs-calendar>
```

### 2. Provide Context with aria-describedby

```vue
<ejs-calendar
  :aria-describedby="'date-format-help'"
></ejs-calendar>
<small id="date-format-help">Format: MM/DD/YYYY</small>
```

### 3. Announce Changes to Screen Readers

```vue
<ejs-calendar @change="handleChange"></ejs-calendar>

<div role="status" aria-live="polite">
  {{ announcement }}
</div>

<script setup>
const announcement = ref('');

const handleChange = (args) => {
  announcement.value = `Date changed to ${args.value.toDateString()}`;
};
</script>
```

### 4. Ensure Sufficient Color Contrast

- Use high contrast themes for light/dark modes
- Test with contrast checkers (WCAG AA minimum 4.5:1)
- Don't rely on color alone to convey information

### 5. Support Keyboard-Only Navigation

- Ensure all functionality is keyboard accessible
- Provide visible focus indicators
- Test with keyboard navigation only (no mouse)

### 6. Test with Screen Readers

- NVDA (free, Windows)
- JAWS (commercial, Windows)
- VoiceOver (built-in, macOS/iOS)
- TalkBack (built-in, Android)

---

## Next Steps

- For styling and themes, read `references/calendar-styling-customization.md`.
- For event handling, read `references/calendar-events-methods.md`.
- For date selection patterns, read `references/calendar-date-selection.md`.

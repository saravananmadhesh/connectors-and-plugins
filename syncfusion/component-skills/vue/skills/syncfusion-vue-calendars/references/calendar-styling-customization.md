# Styling & Customization (Vue 3)

## Table of Contents
- [Theme Selection](#theme-selection)
- [CSS Class Customization](#css-class-customization)
- [Custom Day Cell Rendering](#custom-day-cell-rendering)
- [RTL Support](#rtl-support)
- [Responsive Design](#responsive-design)

---

## Theme Selection

Syncfusion provides multiple built-in themes. Import the desired theme CSS in your component or globally.

### Available Themes

- **material3** — Material Design 3 (modern, default)
- **bootstrap5** — Bootstrap 5 theme
- **bootstrap4** — Bootstrap 4 theme
- **fluent** — Microsoft Fluent Design
- **fabric** — Microsoft Fabric theme
- **highcontrast** — High contrast for accessibility
- **tailwind** — Tailwind CSS theme

### Importing a Theme

```vue
<script setup>
// Import Material Design 3 theme
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-calendars/styles/material3.css';

import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';
</script>

<template>
  <ejs-calendar :value="new Date()"></ejs-calendar>
</template>
```

### Theme Switching at Runtime

```vue
<template>
  <div style="padding: 20px">
    <div style="margin-bottom: 10px">
      <button @click="switchTheme('material3')">Material 3</button>
      <button @click="switchTheme('bootstrap5')">Bootstrap 5</button>
      <button @click="switchTheme('fluent')">Fluent</button>
    </div>
    
    <ejs-calendar :value="selectedDate"></ejs-calendar>
    <p>Current theme: {{ currentTheme }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const currentTheme = ref('material3');

const switchTheme = (themeName) => {
  // Remove old theme stylesheet
  const oldLink = document.querySelector(`link[data-theme-css]`);
  if (oldLink) oldLink.remove();
  
  // Add new theme stylesheet
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://cdn.syncfusion.com/ej2/dist/ej2.${themeName}.css`;
  link.setAttribute('data-theme-css', 'true');
  document.head.appendChild(link);
  
  currentTheme.value = themeName;
};
</script>
```

---

## CSS Class Customization

Apply custom CSS classes to modify calendar appearance.

### Global Style Customization

```vue
<template>
  <div style="padding: 20px">
    <ejs-calendar
      :value="selectedDate"
      class="custom-calendar"
    ></ejs-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>

<style>
.custom-calendar :deep(.e-calendar) {
  border: 2px solid #1976d2;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-calendar :deep(.e-header) {
  background-color: #1976d2;
  color: white;
  font-weight: bold;
}

.custom-calendar :deep(.e-day-header) {
  background-color: #e3f2fd;
  font-weight: bold;
}

.custom-calendar :deep(.e-cell) {
  padding: 10px;
}

.custom-calendar :deep(.e-cell.e-today) {
  background-color: #fff3e0;
  font-weight: bold;
}

.custom-calendar :deep(.e-cell.e-selected) {
  background-color: #1976d2;
  color: white;
  border-radius: 4px;
}
</style>
```

### CSS Class Reference

Common Syncfusion Calendar classes:
- `.e-calendar` — Main calendar container
- `.e-header` — Header (navigation area)
- `.e-day-header` — Day name headers (Mon, Tue, etc.)
- `.e-cell` — Individual day cell
- `.e-selected` — Selected date cell
- `.e-today` — Today's date cell
- `.e-disabled` — Disabled date cell
- `.e-other-month` — Dates from adjacent months

---

## Custom Day Cell Rendering

Use the `renderDayCell` event to completely customize how day cells appear.

### Example: Styled Event Markers

```vue
<template>
  <div style="padding: 20px">
    <ejs-calendar
      :value="selectedDate"
      @renderDayCell="onRenderDayCell"
    ></ejs-calendar>
    
    <style scoped>
    :deep(.e-event-day) {
      position: relative;
    }
    
    :deep(.e-event-day::after) {
      content: '•';
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      color: #d32f2f;
      font-size: 18px;
    }
    </style>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const eventDates = ref([
  new Date(2026, 6, 4),
  new Date(2026, 6, 15),
  new Date(2026, 6, 22),
]);

const onRenderDayCell = (args) => {
  const dateStr = args.date.toDateString();
  const hasEvent = eventDates.value.some(d => d.toDateString() === dateStr);
  
  if (hasEvent) {
    args.cellElement.classList.add('e-event-day');
  }
};
</script>
```

### Example: Holiday Styling

```vue
<template>
  <ejs-calendar
    :value="selectedDate"
    @renderDayCell="highlightHolidays"
  ></ejs-calendar>
  
  <style scoped>
  :deep(.e-holiday) {
    background-color: #ffcdd2;
    color: #c62828;
    font-weight: bold;
  }
  </style>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const holidays = [
  { date: new Date(2026, 0, 1), name: 'New Year' },
  { date: new Date(2026, 6, 4), name: 'Independence Day' },
  { date: new Date(2026, 11, 25), name: 'Christmas' },
];

const highlightHolidays = (args) => {
  const dateStr = args.date.toDateString();
  const holiday = holidays.find(h => h.date.toDateString() === dateStr);
  
  if (holiday) {
    args.cellElement.classList.add('e-holiday');
    args.cellElement.title = holiday.name;
  }
};
</script>
```

### Example: Gradient Background for Range

```vue
<template>
  <ejs-calendar
    :value="selectedDate"
    @renderDayCell="highlightRangeGradient"
  ></ejs-calendar>
  
  <style scoped>
  :deep(.e-in-range) {
    background: linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%);
  }
  
  :deep(.e-range-start) {
    background-color: #1976d2;
    color: white;
    border-radius: 50% 0 0 50%;
  }
  
  :deep(.e-range-end) {
    background-color: #1976d2;
    color: white;
    border-radius: 0 50% 50% 0;
  }
  </style>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const rangeStart = ref(new Date(2026, 6, 5));
const rangeEnd = ref(new Date(2026, 6, 15));

const highlightRangeGradient = (args) => {
  const cellDate = args.date;
  
  if (cellDate >= rangeStart.value && cellDate <= rangeEnd.value) {
    args.cellElement.classList.add('e-in-range');
    
    if (cellDate.toDateString() === rangeStart.value.toDateString()) {
      args.cellElement.classList.add('e-range-start');
    }
    if (cellDate.toDateString() === rangeEnd.value.toDateString()) {
      args.cellElement.classList.add('e-range-end');
    }
  }
};
</script>
```

---

## RTL Support

Enable right-to-left (RTL) support for Arabic, Hebrew, and other RTL languages.

### Enable RTL

```vue
<template>
  <div dir="rtl">
    <ejs-calendar
      :value="selectedDate"
      :enableRtl="true"
    ></ejs-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

### RTL with Localization

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
import { registerLocale } from '@syncfusion/ej2-base';

// Register Arabic locale (requires locale library)
registerLocale({
  'ar': {
    'calendar': {
      'today': 'اليوم'
      // ... other locale strings
    }
  }
});

const selectedDate = ref(new Date());
</script>
```

---

## Responsive Design

Make the calendar responsive to different screen sizes.

### CSS Media Queries

```vue
<template>
  <div style="padding: 20px">
    <ejs-calendar
      :value="selectedDate"
      class="responsive-calendar"
    ></ejs-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>

<style scoped>
.responsive-calendar {
  max-width: 100%;
}

/* Mobile (< 600px) */
@media (max-width: 599px) {
  .responsive-calendar :deep(.e-calendar) {
    font-size: 12px;
  }
  
  .responsive-calendar :deep(.e-cell) {
    padding: 8px;
  }
}

/* Tablet (600px - 1024px) */
@media (min-width: 600px) and (max-width: 1024px) {
  .responsive-calendar :deep(.e-cell) {
    padding: 10px;
  }
}

/* Desktop (> 1024px) */
@media (min-width: 1025px) {
  .responsive-calendar :deep(.e-cell) {
    padding: 12px;
  }
}
</style>
```

### Container Query Approach

```vue
<template>
  <div class="calendar-container">
    <ejs-calendar
      :value="selectedDate"
    ></ejs-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>

<style scoped>
.calendar-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.calendar-container :deep(.e-calendar) {
  width: 100%;
}
</style>
```

---

## Next Steps

- For date selection patterns, read `references/calendar-date-selection.md`.
- For event handling, read `references/calendar-events-methods.md`.
- For calendar views, read `references/calendar-calendar-views.md`.

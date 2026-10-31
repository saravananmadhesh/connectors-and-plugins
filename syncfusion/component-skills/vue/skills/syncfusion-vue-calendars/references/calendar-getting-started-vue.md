# Getting Started with Calendar (Vue 3)

## Table of Contents
- [Installation](#installation)
- [Quick App Example](#quick-app-example)
- [CSS / Themes](#css--themes)
- [Using Template Refs and Methods](#using-template-refs-and-methods)
- [Events and Handlers](#events-and-handlers)
- [Troubleshooting](#troubleshooting)

---

## Installation

Install the Vue Calendar package and base utilities:

```bash
npm install @syncfusion/ej2-vue-calendars @syncfusion/ej2-base
```

Add the theme CSS (import once in `main.js` or global CSS):

```js
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-calendars/styles/material3.css';

createApp(App).mount('#app');
```

---

## Quick App Example

```vue
<template>
  <div style="padding: 20px">
    <h2>Vue Calendar</h2>
    <ejs-calendar
      :value="selectedDate"
      @change="onChange"
    ></ejs-calendar>
    <p>Selected: {{ selectedDate?.toDateString() }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const onChange = (args) => {
  selectedDate.value = args.value || args;
};
</script>
```

### Reactive vs Static

- **Reactive (Recommended):** pass `:value` and update it via the `@change` event using `ref()`.
- **Static:** omit `:value` and read selected date via event callbacks or template refs.

---

## CSS / Themes

- Import one theme only (material3, bootstrap5, fluent, etc.) to avoid style conflicts.
- When using CSS modules or scoped styles, ensure global imports occur before component styles.
- Available themes: `material3`, `bootstrap5`, `bootstrap4`, `fluent`, `fabric`, `highcontrast`, `tailwind`.

**Theme import example:**
```js
// For Bootstrap 5 theme
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/calendar/index.css";
```

---

## Using Template Refs and Methods

You can obtain a component reference to call imperative methods (navigate, focus, etc.).

```vue
<template>
  <div>
    <ejs-calendar ref="calendarRef" />
    <button @click="goToNext">Go to July 2026</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const calendarRef = ref(null);

const goToNext = () => {
  if (calendarRef.value) {
    // navigateTo(view: CalendarView, date: Date)
    // Both arguments are required
    calendarRef.value.navigateTo('Month', new Date(2026, 6, 1));
  }
};
</script>
```

### Available Methods

- `navigateTo(view, date)` — Navigate to a specific view and date
- `currentView()` — Get the current calendar view
- `addDate(dates)` — Add dates to multi-selection (when `isMultiSelection={true}`)
- `removeDate(dates)` — Remove dates from multi-selection
- `destroy()` — Destroy the component instance
- `getPersistData()` — Get persisted component state

**Note:** Method names and available APIs are listed in the API reference file.

---

## Events and Handlers

### Available Events

- **`change`** — User changed the active/selected date. Receives args with `value`.
- **`created`** — Fired after the component is initialized.
- **`destroyed`** — Fired when the component is removed.
- **`renderDayCell`** — Hook to customize day cells before rendering.
- **`navigated`** — Fired after navigation between views.

### Event Examples

```vue
<template>
  <ejs-calendar
    :value="selectedDate"
    @change="onChange"
    @created="onCreated"
    @destroyed="onDestroyed"
  ></ejs-calendar>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const onChange = (args) => {
  console.log('Selected:', args.value);
  selectedDate.value = args.value;
};

const onCreated = () => {
  console.log('Calendar initialized');
};

const onDestroyed = () => {
  console.log('Calendar destroyed, cleanup resources');
};
</script>
```

---

## Troubleshooting

### "Styles not applied"
- Check import paths and ensure the CSS is included in the bundle.
- Verify the theme name matches the CSS file: `material3.css`, `bootstrap5.css`, etc.
- Clear browser cache and rebuild the project.

### "Change not firing"
- Ensure `@change` prop is supplied to the component.
- For reactive components, ensure `:value` is updated from state in the change handler.
- Check browser console for errors.

### "Cannot find module"
- Reinstall packages: `npm install`
- Clear `node_modules` if necessary: `rm -rf node_modules && npm install`
- Verify package names in `package.json`.

### "Methods not available"
- Ensure the component is mounted before calling methods via template ref.
- Check that template ref name matches the JavaScript variable name.
- Use `ref.value` to access the component instance in methods.

---

## Next Steps

- Read `references/calendar-date-selection.md` for single/multiple/range selection patterns.
- Read `references/calendar-events-methods.md` for advanced event handling.
- Explore `references/calendar-styling-customization.md` for theme and style customization.

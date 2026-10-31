# Getting Started with DatePicker (Vue 3)

## Table of Contents
- [Installation](#installation)
- [CSS Theme Import](#css-theme-import)
- [Component Import](#component-import)
- [Basic Template Setup](#basic-template-setup)
- [Functional Component with Composition API](#functional-component-with-composition-api)
- [Running Your Application](#running-your-application)

---

## Installation

Install the Syncfusion Vue Calendar package using npm:

```bash
npm install @syncfusion/ej2-vue-calendars --save
```

The `--save` flag adds the package to your `package.json` dependencies.

> **Note:** The DatePicker component is part of the `@syncfusion/ej2-vue-calendars` package. Installing this package provides access to DatePicker, Calendar, DateRangePicker, DateTimePicker, and TimePicker components.

### Verify Installation

After installation, verify the package was added to your project:

```bash
npm list @syncfusion/ej2-vue-calendars
```

You should see the package listed with its version.

---

## CSS Theme Import

The DatePicker requires CSS styles for proper rendering. Import the theme CSS in your main `main.js` or in the component.

### Available Themes

Syncfusion provides several built-in themes:
- **material3** - Material Design 3 (default, modern)
- **bootstrap5** - Bootstrap 5 theme
- **bootstrap4** - Bootstrap 4 theme
- **fluent** - Microsoft Fluent Design
- **fabric** - Microsoft Fabric theme
- **highcontrast** - High contrast for accessibility
- **tailwind** - Tailwind CSS theme

### Import CSS in main.js (Recommended)

```js
// main.js
import { createApp } from 'vue';
import App from './App.vue';

// Import Material 3 theme CSS
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-buttons/styles/material3.css';
import '@syncfusion/ej2-inputs/styles/material3.css';
import '@syncfusion/ej2-popups/styles/material3.css';
import '@syncfusion/ej2-calendars/styles/material3.css';

createApp(App).mount('#app');
```

**Why these files?**
- `ej2-base` - Base styles required by all components
- `ej2-buttons` - Buttons used in DatePicker (calendar navigation, today button)
- `ej2-inputs` - Input field styles for the date textbox
- `ej2-popups` - Popup wrapper for the calendar
- `ej2-calendars` - DatePicker and calendar specific styles

### Alternative: Import in Component

If you prefer to keep CSS imports in components:

```vue
<script setup>
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-buttons/styles/material3.css';
import '@syncfusion/ej2-inputs/styles/material3.css';
import '@syncfusion/ej2-popups/styles/material3.css';
import '@syncfusion/ej2-calendars/styles/material3.css';

import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';
</script>
```

### Alternative: Import in CSS File

Add to your `App.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/datepicker/index.css";
```

Then import the CSS file in your component:

```vue
<script setup>
import './App.css';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';
</script>
```

---

## Component Import

Import the `DatePickerComponent` from the package:

```vue
<script setup>
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';
</script>
```

You can also import related types if using TypeScript:

```vue
<script setup lang="ts">
import { DatePickerComponent, DatePickerChangeEventArgs } from '@syncfusion/ej2-vue-calendars';
</script>
```

---

## Basic Template Setup

The simplest DatePicker requires only the component tag:

```vue
<template>
  <ejs-datepicker></ejs-datepicker>
</template>

<script setup>
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';
</script>
```

This creates a functional date picker with:
- Input field for date entry
- Dropdown calendar button
- Today button in the calendar
- Today's date as default

---

## Functional Component with Composition API

Here's a complete example using Vue 3 Composition API:

```vue
<template>
  <div style="padding: 20px; max-width: 400px">
    <h2>Date Picker Example</h2>
    
    <label for="dtp" style="display: block; margin-bottom: 10px">
      <strong>Select a date:</strong>
    </label>
    
    <ejs-datepicker
      id="dtp"
      :value="selectedDate"
      placeholder="Enter date"
      @change="onDateChange"
    ></ejs-datepicker>
    
    <div style="margin-top: 20px">
      <p><strong>Selected Date:</strong> {{ formattedDate }}</p>
      <p><strong>ISO Format:</strong> {{ isoFormat }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

// Reactive state
const selectedDate = ref(new Date());

// Computed properties
const formattedDate = computed(() => {
  return selectedDate.value?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const isoFormat = computed(() => {
  return selectedDate.value?.toISOString().split('T')[0];
});

// Event handler
const onDateChange = (args) => {
  selectedDate.value = args.value;
  console.log('Date changed to:', args.value);
};
</script>

<style scoped>
div {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
```

### With TypeScript

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { DatePickerComponent, DatePickerChangeEventArgs } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref<Date | null>(new Date());

const formattedDate = computed((): string => {
  return selectedDate.value?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) || '';
});

const onDateChange = (args: DatePickerChangeEventArgs): void => {
  selectedDate.value = args.value;
};
</script>
```

---

## Running Your Application

### Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another available port).

### Production Build

```bash
npm run build
```

This generates optimized files in the `dist` folder.

### Testing the DatePicker

1. Open the running application in your browser
2. Click the input field or dropdown button
3. Select a date from the calendar
4. Verify the date appears in the input field
5. Check that event handlers are triggered

---

## Common Issues & Solutions

### "Styles not applied"
- Ensure all CSS files are imported in the correct order
- Check that theme paths are correct
- Clear browser cache and rebuild: `npm run build`
- Verify theme name matches CSS file: `material3.css`, `bootstrap5.css`, etc.

### "Component not found"
- Verify `@syncfusion/ej2-vue-calendars` is installed
- Ensure import path is correct: `from '@syncfusion/ej2-vue-calendars'`
- Check that component name matches: `DatePickerComponent` or `ejs-datepicker`

### "Change event not firing"
- Ensure `@change="handler"` is properly bound
- Verify handler function is defined in `<script setup>`
- Check browser console for JavaScript errors

### "Calendar dropdown not opening"
- Ensure ej2-popups CSS is imported
- Check that ej2-buttons CSS is included
- Verify input field is not disabled
- Test in different browsers

---

## Next Steps

- Read `references/datepicker-date-formats-and-input.md` for format configuration
- Read `references/datepicker-date-range-and-validation.md` for validation patterns
- Read `references/datepicker-customization-and-styling.md` for styling
- Read `references/datepicker-globalization-and-localization.md` for i18n support

---

## Complete Minimal Example (Copy & Paste Ready)

**App.vue:**
```vue
<template>
  <div style="padding: 40px; font-family: Arial">
    <h1>Vue DatePicker Demo</h1>
    
    <ejs-datepicker
      :value="myDate"
      placeholder="Pick a date..."
      @change="handleChange"
    ></ejs-datepicker>
    
    <p>{{ myDate }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';
import '@syncfusion/ej2-base/styles/material3.css';
import '@syncfusion/ej2-buttons/styles/material3.css';
import '@syncfusion/ej2-inputs/styles/material3.css';
import '@syncfusion/ej2-popups/styles/material3.css';
import '@syncfusion/ej2-calendars/styles/material3.css';

const myDate = ref(new Date());

const handleChange = (args) => {
  myDate.value = args.value;
};
</script>
```

**main.js:**
```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

Save and run `npm run dev` to start!

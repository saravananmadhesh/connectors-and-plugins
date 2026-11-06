# Date Views & Navigation (Vue 3)

## Table of Contents
- [Month, Year, Decade Views](#month-year-decade-views)
- [Depth and Start View Control](#depth-and-start-view-control)
- [Programmatic Navigation](#programmatic-navigation)
- [View Transitions](#view-transitions)

---

## Month, Year, Decade Views

The DatePicker supports three calendar views for quick date selection.

### Month View (Default)

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    :start="'Month'"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

Month view displays a traditional calendar with all days of the current month.

### Year View

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    :start="'Year'"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

Year view shows all 12 months for quick month selection within a year.

### Decade View

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    :start="'Decade'"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

Decade view displays 10 consecutive years for quick year selection.

---

## Depth and Start View Control

Control which view the datepicker opens in and how deep users can navigate.

### Start View

Use `:start` to define the opening view:

```vue
<template>
  <div style="padding: 20px">
    <h4>Open in Year View</h4>
    <ejs-datepicker
      :value="selectedDate"
      :start="'Year'"
    ></ejs-datepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

Valid values: `"Month"`, `"Year"`, `"Decade"`

### Depth View

Use `:depth` to limit deepest navigation level:

```vue
<template>
  <div style="padding: 20px">
    <h4>Max Depth: Year View</h4>
    <ejs-datepicker
      :value="selectedDate"
      :depth="'Year'"
    ></ejs-datepicker>
    <p>Cannot navigate to Decade view</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

Valid values: `"Month"`, `"Year"`, `"Decade"`

### Combined: Start and Depth

```vue
<template>
  <div style="padding: 20px">
    <h4>Year Selector (Start Year, Max Depth Year)</h4>
    <ejs-datepicker
      :value="selectedDate"
      :start="'Year'"
      :depth="'Year'"
    ></ejs-datepicker>
    <p>Users can only select months within the current year</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

---

## Programmatic Navigation

Use template refs to navigate programmatically.

```vue
<template>
  <div style="padding: 20px">
    <ejs-datepicker
      ref="datePickerRef"
      :value="selectedDate"
    ></ejs-datepicker>
    
    <div style="margin-top: 15px">
      <button @click="navigateToPreviousMonth">← Previous</button>
      <button @click="navigateToNextMonth">Next →</button>
      <button @click="navigateToYearView">View Years</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const datePickerRef = ref(null);
const selectedDate = ref(new Date());

const navigateToPreviousMonth = () => {
  const prev = new Date(selectedDate.value);
  prev.setMonth(prev.getMonth() - 1);
  if (datePickerRef.value) {
    datePickerRef.value.navigateTo('Month', prev);
  }
};

const navigateToNextMonth = () => {
  const next = new Date(selectedDate.value);
  next.setMonth(next.getMonth() + 1);
  if (datePickerRef.value) {
    datePickerRef.value.navigateTo('Month', next);
  }
};

const navigateToYearView = () => {
  if (datePickerRef.value) {
    datePickerRef.value.navigateTo('Year', selectedDate.value);
  }
};
</script>
```

---

## View Transitions

Navigation flow between views:

```
Month → Year (click month/year header)
        ↓
      Year → Decade (click year header in Year view)
             ↓
          Decade (cannot go deeper)
```

When selecting dates:
- In Month view: Click a date to select it
- In Year view: Click a month to navigate to Month view for that month
- In Decade view: Click a year to navigate to Year view for that year

---

## Next Steps

- For date validation, read `references/datepicker-date-range-and-validation.md`.
- For formatting, read `references/datepicker-date-formats-and-input.md`.
- For customization, read `references/datepicker-customization-and-styling.md`.

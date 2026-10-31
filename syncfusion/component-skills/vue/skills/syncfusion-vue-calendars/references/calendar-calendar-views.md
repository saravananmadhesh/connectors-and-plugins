# Calendar Views (Vue 3)

## Table of Contents
- [Month View](#month-view)
- [Year View](#year-view)
- [Decade View](#decade-view)
- [View Navigation](#view-navigation)
- [Depth and Start View Control](#depth-and-start-view-control)
- [Programmatic Navigation](#programmatic-navigation)

---

## Month View

The default calendar view showing all days in the current month.

```vue
<template>
  <div style="padding: 20px">
    <h3>Month View (Default)</h3>
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
  selectedDate.value = args.value;
};
</script>
```

**Features:**
- Displays 7 columns (Sun-Sat) and up to 6 rows
- Click any day to select it
- Navigate to adjacent months with prev/next arrows
- Weekday headers and week numbers (optional)

---

## Year View

Displays all 12 months of the current year for quick month selection.

```vue
<template>
  <div style="padding: 20px">
    <h3>Year View</h3>
    <ejs-calendar
      :value="selectedDate"
      :start="'Year'"
      @change="onMonthSelected"
    ></ejs-calendar>
    <p>Selected month: {{ selectedDate?.toLocaleString('en-US', { month: 'long', year: 'numeric' }) }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const onMonthSelected = (args) => {
  selectedDate.value = args.value;
};
</script>
```

**Features:**
- Display all 12 months in a 4x3 grid
- Click any month to navigate to that month's calendar
- Useful for quick month selection
- Use `:start="'Year'"` to open in Year view

---

## Decade View

Displays 10 years for quick year selection.

```vue
<template>
  <div style="padding: 20px">
    <h3>Decade View</h3>
    <ejs-calendar
      :value="selectedDate"
      :start="'Decade'"
      @change="onYearSelected"
    ></ejs-calendar>
    <p>Selected year: {{ selectedDate?.getFullYear() }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const onYearSelected = (args) => {
  selectedDate.value = args.value;
};
</script>
```

**Features:**
- Displays 10 consecutive years in a 4x3 grid (one cell empty)
- Click any year to navigate to that year's calendar
- Useful for quickly jumping to a specific year
- Use `:start="'Decade'"` to open in Decade view

---

## View Navigation

Users can navigate between views by clicking arrows or the view header.

```vue
<template>
  <div style="padding: 20px">
    <h3>View Navigation</h3>
    <ejs-calendar
      :value="selectedDate"
      @navigated="onNavigated"
    ></ejs-calendar>
    <p>Current view: {{ currentView }}</p>
    <p>Navigation: Click the month/year header to zoom out, arrows to move within view</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const currentView = ref('Month');

const onNavigated = (args) => {
  // The component tracks internal view state
  console.log('Navigation event:', args);
};
</script>
```

**Navigation Flow:**
```
Month → Year (click month/year header)
  ↓     ↓
 Year → Decade (click year header in Year view)
        ↓
     Decade → (Cannot go deeper)
```

---

## Depth and Start View Control

Control which view the calendar opens in and how deep users can navigate.

### Start View

Use `:start` prop to open the calendar in a specific view:

```vue
<template>
  <div style="padding: 20px">
    <h3>Start in Year View</h3>
    <ejs-calendar
      :value="selectedDate"
      :start="'Year'"
      @change="onChange"
    ></ejs-calendar>
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

**Valid values for `:start`:**
- `"Month"` (default) — Open in Month view
- `"Year"` — Open in Year view
- `"Decade"` — Open in Decade view

### Depth View

Use `:depth` prop to limit how deep users can navigate:

```vue
<template>
  <div style="padding: 20px">
    <h3>Limited Depth (Year Maximum)</h3>
    <ejs-calendar
      :value="selectedDate"
      :depth="'Year'"
      @change="onChange"
    ></ejs-calendar>
    <small>Users cannot navigate to Decade view</small>
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

**Valid values for `:depth`:**
- `"Month"` (default) — Allow Month, Year, Decade (deepest: Month)
- `"Year"` — Allow Year, Decade (deepest: Year)
- `"Decade"` — Only Decade (deepest: Decade)

### Combined Example: Start and Depth

```vue
<template>
  <div style="padding: 20px">
    <h3>Year Selector (Year View, Max Depth Year)</h3>
    <ejs-calendar
      :value="selectedDate"
      :start="'Year'"
      :depth="'Year'"
      @change="onChange"
    ></ejs-calendar>
    <p>Selected: {{ selectedDate?.getFullYear() }}</p>
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

## Programmatic Navigation

Use template refs and the `navigateTo()` method to navigate programmatically.

```vue
<template>
  <div style="padding: 20px">
    <ejs-calendar
      ref="calendarRef"
      :value="selectedDate"
      @change="onChange"
    ></ejs-calendar>
    
    <div style="margin-top: 20px">
      <button @click="goToView('Month')">Month View</button>
      <button @click="goToView('Year')">Year View</button>
      <button @click="goToView('Decade')">Decade View</button>
    </div>
    
    <div style="margin-top: 10px">
      <button @click="goToDate">Go to Jan 2026</button>
    </div>
    
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

const goToView = (view) => {
  if (calendarRef.value) {
    // navigateTo requires both view AND date
    calendarRef.value.navigateTo(view, selectedDate.value);
  }
};

const goToDate = () => {
  if (calendarRef.value) {
    calendarRef.value.navigateTo('Month', new Date(2026, 0, 1));
  }
};
</script>
```

### Example: Navigation Buttons

```vue
<template>
  <div style="padding: 20px">
    <div style="margin-bottom: 10px">
      <button @click="previousMonth">← Previous</button>
      <button @click="nextMonth">Next →</button>
    </div>
    
    <ejs-calendar
      ref="calendarRef"
      :value="selectedDate"
      @change="onChange"
    ></ejs-calendar>
    
    <p>{{ selectedDate?.toLocaleString('en-US', { month: 'long', year: 'numeric' }) }}</p>
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

const previousMonth = () => {
  const newDate = new Date(selectedDate.value);
  newDate.setMonth(newDate.getMonth() - 1);
  if (calendarRef.value) {
    calendarRef.value.navigateTo('Month', newDate);
  }
};

const nextMonth = () => {
  const newDate = new Date(selectedDate.value);
  newDate.setMonth(newDate.getMonth() + 1);
  if (calendarRef.value) {
    calendarRef.value.navigateTo('Month', newDate);
  }
};
</script>
```

### Example: Quick Navigation (Year Leap)

```vue
<template>
  <div>
    <button @click="goToDecade">View Decades</button>
    <button @click="goToYear">View Years</button>
    <button @click="goToMonth">View Months</button>
    <button @click="fastForward">+5 Years</button>
    
    <ejs-calendar
      ref="calendarRef"
      :value="selectedDate"
    ></ejs-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const calendarRef = ref(null);
const selectedDate = ref(new Date());

const goToDecade = () => {
  if (calendarRef.value) {
    calendarRef.value.navigateTo('Decade', selectedDate.value);
  }
};

const goToYear = () => {
  if (calendarRef.value) {
    calendarRef.value.navigateTo('Year', selectedDate.value);
  }
};

const goToMonth = () => {
  if (calendarRef.value) {
    calendarRef.value.navigateTo('Month', selectedDate.value);
  }
};

const fastForward = () => {
  const newDate = new Date(selectedDate.value);
  newDate.setFullYear(newDate.getFullYear() + 5);
  if (calendarRef.value) {
    calendarRef.value.navigateTo('Month', newDate);
  }
};
</script>
```

---

## Next Steps

- For date selection patterns, read `references/calendar-date-selection.md`.
- For event handling, read `references/calendar-events-methods.md`.
- For styling and themes, read `references/calendar-styling-customization.md`.

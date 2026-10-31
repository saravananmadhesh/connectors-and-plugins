# Events and Methods (Vue 3)

## Table of Contents
- [Calendar Events](#calendar-events)
- [Event Handlers (Examples)](#event-handlers-examples)
- [Calendar Methods](#calendar-methods)
- [Using Template Refs for Imperative Control](#using-template-refs-for-imperative-control)
- [Advanced: renderDayCell Hook](#advanced-renderdaycell-hook)

---

## Calendar Events

### change

Fired when the user selects a date or the selected date changes programmatically.

**Handler signature:**
```typescript
(args: { value: Date; values?: Date[] }) => void
```

**Example:**
```vue
<template>
  <ejs-calendar @change="onChange"></ejs-calendar>
</template>

<script setup>
const onChange = (args) => {
  console.log('Selected date:', args.value);
};
</script>
```

### created

Fired after the Calendar component is initialized and rendered.

**Handler signature:**
```typescript
() => void
```

**Use case:** Initialize component-dependent logic, fetch data for the selected month, etc.

```vue
<script setup>
const onCreated = () => {
  console.log('Calendar initialized');
};
</script>

<template>
  <ejs-calendar @created="onCreated"></ejs-calendar>
</template>
```

### destroyed

Fired when the component is about to be removed from the DOM (cleanup phase).

**Handler signature:**
```typescript
() => void
```

**Use case:** Cleanup timers, event listeners, or external resources.

```vue
<script setup>
const onDestroyed = () => {
  console.log('Calendar destroyed, cleanup resources');
};
</script>

<template>
  <ejs-calendar @destroyed="onDestroyed"></ejs-calendar>
</template>
```

### navigated

Fired after the view navigates (e.g., Month → Year view).

**Handler signature:**
```typescript
(args: any) => void
```

**Example:**
```vue
<script setup>
const onNavigated = (args) => {
  console.log('Navigation event:', args);
};
</script>

<template>
  <ejs-calendar @navigated="onNavigated"></ejs-calendar>
</template>
```

### renderDayCell

Hook for customizing individual day cells before they are rendered. Allows you to:
- Disable specific dates
- Add custom styling
- Add visual indicators (badges, highlights)

**Handler signature:**
```typescript
(args: { date: Date; cellElement: HTMLElement; isDisabled?: boolean }) => void
```

**See the [Advanced: renderDayCell Hook](#advanced-renderdaycell-hook) section below for detailed examples.**

---

## Event Handlers (Examples)

### Example 1: Track Selection and Display

```vue
<template>
  <div style="padding: 20px">
    <ejs-calendar @change="onChange"></ejs-calendar>
    <h4>Event Log:</h4>
    <ul>
      <li v-for="(log, i) in eventLog" :key="i">
        {{ log }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const eventLog = ref([]);

const onChange = (args) => {
  selectedDate.value = args.value;
  eventLog.value.unshift(`Selected: ${args.value.toDateString()} at ${new Date().toLocaleTimeString()}`);
  if (eventLog.value.length > 10) {
    eventLog.value.pop(); // Keep last 10 events
  }
};
</script>
```

### Example 2: Multi-Event Tracking

```vue
<template>
  <div>
    <ejs-calendar
      :value="selectedDate"
      @change="onChange"
      @created="onCreated"
      @navigated="onNavigated"
    ></ejs-calendar>
    <p>Status: {{ status }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const status = ref('Idle');

const onChange = (args) => {
  selectedDate.value = args.value;
  status.value = `Selected: ${args.value.toDateString()}`;
};

const onCreated = () => {
  status.value = 'Calendar initialized';
};

const onNavigated = (args) => {
  status.value = `Navigated to new view`;
};
</script>
```

---

## Calendar Methods

### navigateTo(view, date)

Navigate to a specific view and date.

**Signature:**
```typescript
navigateTo(view: 'Month' | 'Year' | 'Decade', date: Date): void
```

**Both arguments are required.**

**Example:**
```vue
<template>
  <div>
    <ejs-calendar ref="calendarRef"></ejs-calendar>
    <button @click="goToJuly2026">Go to July 2026</button>
    <button @click="switchToYear">Switch to Year View</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const calendarRef = ref(null);

const goToJuly2026 = () => {
  if (calendarRef.value) {
    calendarRef.value.navigateTo('Month', new Date(2026, 6, 1));
  }
};

const switchToYear = () => {
  if (calendarRef.value) {
    calendarRef.value.navigateTo('Year', new Date(2026, 0, 1));
  }
};
</script>
```

### currentView()

Get the current calendar view.

**Signature:**
```typescript
currentView(): 'Month' | 'Year' | 'Decade'
```

**Example:**
```vue
<script setup>
const getCurrentView = () => {
  if (calendarRef.value) {
    const view = calendarRef.value.currentView();
    console.log('Current view:', view);
    return view;
  }
};
</script>

<template>
  <button @click="getCurrentView">Get Current View</button>
</template>
```

### addDate(dates)

Add dates to multi-selection (only works when `isMultiSelection={true}`).

**Signature:**
```typescript
addDate(dates: Date[]): void
```

**Example:**
```vue
<template>
  <div>
    <ejs-calendar
      ref="calendarRef"
      :isMultiSelection="true"
      :values="selectedDates"
    ></ejs-calendar>
    <button @click="addHolidays">Add Holidays</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const calendarRef = ref(null);
const selectedDates = ref([]);

const addHolidays = () => {
  if (calendarRef.value) {
    const holidays = [
      new Date(2026, 6, 4),   // Independence Day
      new Date(2026, 11, 25), // Christmas
    ];
    calendarRef.value.addDate(holidays);
  }
};
</script>
```

### removeDate(dates)

Remove dates from multi-selection (only works when `isMultiSelection={true}`).

**Signature:**
```typescript
removeDate(dates: Date[]): void
```

**Example:**
```vue
<script setup>
const removeSelectedDate = () => {
  if (calendarRef.value && selectedDates.value.length > 0) {
    const lastDate = selectedDates.value[selectedDates.value.length - 1];
    calendarRef.value.removeDate([lastDate]);
  }
};
</script>

<template>
  <button @click="removeSelectedDate">Remove Last Date</button>
</template>
```

### destroy()

Destroy the component instance and cleanup resources.

**Signature:**
```typescript
destroy(): void
```

**Example:**
```vue
<script setup>
const cleanupCalendar = () => {
  if (calendarRef.value) {
    calendarRef.value.destroy();
    console.log('Calendar destroyed');
  }
};
</script>

<template>
  <button @click="cleanupCalendar">Destroy Calendar</button>
</template>
```

### getPersistData()

Get persisted component state (for state persistence/saving).

**Signature:**
```typescript
getPersistData(): string
```

**Example:**
```vue
<script setup>
import { ref } from 'vue';

const saveState = () => {
  if (calendarRef.value) {
    const state = calendarRef.value.getPersistData();
    localStorage.setItem('calendarState', state);
    console.log('State saved');
  }
};

const loadState = () => {
  const state = localStorage.getItem('calendarState');
  console.log('Saved state:', state);
};
</script>

<template>
  <button @click="saveState">Save State</button>
  <button @click="loadState">Load State</button>
</template>
```

---

## Using Template Refs for Imperative Control

Template refs allow you to directly access component methods and properties.

```vue
<template>
  <div style="padding: 20px">
    <ejs-calendar
      ref="calendarRef"
      :value="selectedDate"
      @change="onChange"
    ></ejs-calendar>
    
    <div style="margin-top: 20px">
      <button @click="navigateMonths(-1)">← Previous Month</button>
      <button @click="navigateMonths(1)">Next Month →</button>
      <button @click="resetCalendar">Reset</button>
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

const navigateMonths = (direction) => {
  if (calendarRef.value) {
    const newDate = new Date(selectedDate.value);
    newDate.setMonth(newDate.getMonth() + direction);
    calendarRef.value.navigateTo('Month', newDate);
  }
};

const resetCalendar = () => {
  selectedDate.value = new Date();
};
</script>
```

---

## Advanced: renderDayCell Hook

The `renderDayCell` event allows complete control over how individual day cells are rendered. Use this to:
- Disable dates
- Add custom classes
- Add visual indicators
- Implement complex selection logic

### Example 1: Disable Weekends

```vue
<template>
  <ejs-calendar
    :value="selectedDate"
    @renderDayCell="onRenderDayCell"
  ></ejs-calendar>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const onRenderDayCell = (args) => {
  // 0 = Sunday, 6 = Saturday
  if (args.date.getDay() === 0 || args.date.getDay() === 6) {
    args.isDisabled = true;
  }
};
</script>
```

### Example 2: Holiday Highlighting

```vue
<template>
  <ejs-calendar
    :value="selectedDate"
    @renderDayCell="highlightHolidays"
  ></ejs-calendar>

  <style scoped>
  :deep(.e-holiday) {
    background-color: #ffecb3;
    color: #d32f2f;
    font-weight: bold;
  }
  </style>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

// Define holiday dates
const holidays = [
  new Date(2026, 0, 1),   // New Year
  new Date(2026, 6, 4),   // Independence Day
  new Date(2026, 11, 25), // Christmas
];

const highlightHolidays = (args) => {
  const dateStr = args.date.toDateString();
  const isHoliday = holidays.some(h => h.toDateString() === dateStr);
  
  if (isHoliday) {
    args.cellElement.classList.add('e-holiday');
  }
};
</script>
```

### Example 3: Range Highlighting

```vue
<template>
  <ejs-calendar
    :value="selectedDate"
    @renderDayCell="highlightRange"
  ></ejs-calendar>

  <style scoped>
  :deep(.e-in-range) {
    background-color: #e3f2fd;
  }
  :deep(.e-range-start),
  :deep(.e-range-end) {
    background-color: #1976d2;
    color: white;
  }
  </style>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const rangeStart = ref(new Date(2026, 6, 5));
const rangeEnd = ref(new Date(2026, 6, 15));

const highlightRange = (args) => {
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

### Example 4: Disable Past Dates with Styling

```vue
<template>
  <ejs-calendar
    :value="selectedDate"
    @renderDayCell="disableAndStylePast"
  ></ejs-calendar>

  <style scoped>
  :deep(.e-past-date) {
    opacity: 0.5;
    text-decoration: line-through;
  }
  </style>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const disableAndStylePast = (args) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (args.date < today) {
    args.isDisabled = true;
    args.cellElement.classList.add('e-past-date');
  }
};
</script>
```

---

## Next Steps

- For date selection patterns, read `references/calendar-date-selection.md`.
- For calendar views and navigation, read `references/calendar-calendar-views.md`.
- For styling and themes, read `references/calendar-styling-customization.md`.

# Date Selection Patterns (Vue 3)

## Table of Contents
- [Single Date Selection](#single-date-selection)
- [Multiple Date Selection](#multiple-date-selection)
- [Date Range Selection](#date-range-selection)
- [Min/Max Date Constraints](#minmax-date-constraints)
- [Disabling Specific Dates](#disabling-specific-dates)
- [Reading Selection State](#reading-selection-state)

---

## Single Date Selection

The default Calendar behavior. User clicks a date, and it becomes selected.

```vue
<template>
  <div style="padding: 20px">
    <h3>Pick a single date</h3>
    <ejs-calendar
      :value="selectedDate"
      @change="onChange"
    ></ejs-calendar>
    <p>You picked: {{ selectedDate?.toDateString() }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const onChange = (args) => {
  console.log('Selected date:', args.value);
  selectedDate.value = args.value;
};
</script>
```

**Key point:** The `:value` prop holds a single `Date` object. Update via the `@change` event handler.

---

## Multiple Date Selection

Use the `:isMultiSelection="true"` and `:values` props to enable native multiple date selection. The `@change` event returns `args.values` (array) when multi-selection is active.

```vue
<template>
  <div style="padding: 20px">
    <h3>Pick multiple dates</h3>
    <ejs-calendar
      :isMultiSelection="true"
      :values="selectedDates"
      @change="onChange"
    ></ejs-calendar>
    <p>Selected dates:</p>
    <ul>
      <li v-for="(d, i) in selectedDates" :key="i">
        {{ d.toDateString() }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDates = ref([
  new Date(2026, 10, 5),
  new Date(2026, 10, 12),
]);

const onChange = (args) => {
  // args.values contains the updated Date[] array
  if (args.values) {
    selectedDates.value = args.values;
  }
};
</script>
```

**Key points:**
- Set `:isMultiSelection="true"` to enable the built-in multi-date selection mode.
- Use the `:values` prop (not `:value`) to provide the initial selection array.
- In the `@change` handler, read `args.values` to get the full updated array.
- To add/remove dates imperatively, use the `addDate()` and `removeDate()` methods via a template ref.

### Programmatic Date Management

```vue
<template>
  <div>
    <ejs-calendar
      ref="calendarRef"
      :isMultiSelection="true"
      :values="selectedDates"
      @change="onChange"
    ></ejs-calendar>
    <button @click="addCustomDate">Add Dec 25</button>
    <button @click="removeLastDate">Remove Last</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const calendarRef = ref(null);
const selectedDates = ref([new Date(2026, 10, 5)]);

const onChange = (args) => {
  if (args.values) {
    selectedDates.value = args.values;
  }
};

const addCustomDate = () => {
  if (calendarRef.value) {
    calendarRef.value.addDate([new Date(2026, 11, 25)]);
  }
};

const removeLastDate = () => {
  if (calendarRef.value && selectedDates.value.length > 0) {
    const lastDate = selectedDates.value[selectedDates.value.length - 1];
    calendarRef.value.removeDate([lastDate]);
  }
};
</script>
```

---

## Date Range Selection

For selecting a date range (start–end), use conditional state to track both dates.

```vue
<template>
  <div style="padding: 20px">
    <h3>Select a date range</h3>
    <ejs-calendar
      :value="startDate"
      @change="onChange"
    ></ejs-calendar>
    <p>
      Start: {{ startDate?.toDateString() }}<br>
      End: {{ endDate?.toDateString() }}
    </p>
    <button @click="resetRange">Reset</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const startDate = ref(null);
const endDate = ref(null);

const onChange = (args) => {
  if (!startDate.value || (startDate.value && endDate.value)) {
    // First click or reset: set start date
    startDate.value = args.value;
    endDate.value = null;
  } else {
    // Second click: set end date
    const start = startDate.value;
    const end = args.value;
    if (end < start) {
      startDate.value = end;
      endDate.value = start;
    } else {
      startDate.value = start;
      endDate.value = end;
    }
  }
};

const resetRange = () => {
  startDate.value = null;
  endDate.value = null;
};
</script>
```

**Key points:**
- Track start and end dates as separate ref values.
- On first click, set the start date and clear end date.
- On second click, set the end date and ensure start < end (swap if needed).
- Reset both refs to clear the range.

### Enhanced: Visual Range Highlighting

For a more polished UX with visual range highlighting, use the `renderDayCell` hook (see calendar-events-methods.md).

---

## Min/Max Date Constraints

Restrict selectable dates to a given range.

```vue
<template>
  <div style="padding: 20px">
    <h3>Constrained Date Selection</h3>
    <ejs-calendar
      :value="selectedDate"
      :min="minDate"
      :max="maxDate"
      @change="onChange"
    ></ejs-calendar>
    <p>Selected: {{ selectedDate?.toDateString() }}</p>
    <small>Allowed range: {{ minDate.toDateString() }} to {{ maxDate.toDateString() }}</small>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date(2026, 5, 15)); // June 15, 2026
const minDate = ref(new Date(2026, 5, 1));      // June 1, 2026
const maxDate = ref(new Date(2026, 5, 30));     // June 30, 2026

const onChange = (args) => {
  selectedDate.value = args.value;
};
</script>
```

**How it works:**
- Dates before `:min` or after `:max` are automatically disabled in the calendar UI.
- User cannot click disabled dates.
- The component prevents out-of-range selections.

---

## Disabling Specific Dates

Disable individual dates or patterns using the `renderDayCell` event hook.

```vue
<template>
  <div style="padding: 20px">
    <h3>Disable Specific Dates</h3>
    <ejs-calendar
      :value="selectedDate"
      @change="onChange"
      @renderDayCell="onRenderDayCell"
    ></ejs-calendar>
    <p>Selected: {{ selectedDate?.toDateString() }}</p>
    <small>Weekends (Sat/Sun) are disabled</small>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const onChange = (args) => {
  selectedDate.value = args.value;
};

const onRenderDayCell = (args) => {
  // Disable weekends
  if (args.date.getDay() === 0 || args.date.getDay() === 6) {
    args.isDisabled = true;
  }
};
</script>
```

### Example: Disable Past Dates

```vue
<script setup>
const disablePastDates = (args) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (args.date < today) {
    args.isDisabled = true;
  }
};
</script>

<template>
  <ejs-calendar
    @renderDayCell="disablePastDates"
  ></ejs-calendar>
</template>
```

### Example: Disable Custom List

```vue
<script setup>
import { ref } from 'vue';

const disabledDates = ref([
  new Date(2026, 6, 4),   // Independence Day
  new Date(2026, 6, 11),  // Arbitrary blocked date
  new Date(2026, 11, 25), // Christmas
]);

const disableCustomDates = (args) => {
  const dateStr = args.date.toDateString();
  const isDisabled = disabledDates.value.some(
    d => d.toDateString() === dateStr
  );
  if (isDisabled) {
    args.isDisabled = true;
  }
};
</script>

<template>
  <ejs-calendar
    @renderDayCell="disableCustomDates"
  ></ejs-calendar>
</template>
```

---

## Reading Selection State

Access the selected date(s) directly from component state or via template refs.

### From Ref State (Recommended)

```vue
<script setup>
import { ref, computed } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const dateInfo = computed(() => {
  if (!selectedDate.value) return 'No date selected';
  return `${selectedDate.value.toDateString()} (${selectedDate.value.toLocaleString('en-US', { weekday: 'long' })})`;
});
</script>

<template>
  <div>
    <ejs-calendar :value="selectedDate" @change="onChange"></ejs-calendar>
    <p>{{ dateInfo }}</p>
  </div>
</template>
```

### From Template Ref (For Uncontrolled Components)

```vue
<script setup>
import { ref } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const calendarRef = ref(null);

const getCurrentSelection = () => {
  if (calendarRef.value) {
    // Read the current value property
    const selected = calendarRef.value.value;
    console.log('Currently selected:', selected);
    return selected;
  }
};
</script>

<template>
  <div>
    <ejs-calendar ref="calendarRef"></ejs-calendar>
    <button @click="getCurrentSelection">Get Selection</button>
  </div>
</template>
```

### Multi-Selection State

```vue
<script setup>
import { ref, computed } from 'vue';
import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDates = ref([]);

const dateCount = computed(() => selectedDates.value.length);

const formattedDates = computed(() => {
  return selectedDates.value
    .map(d => d.toDateString())
    .join(', ');
});
</script>

<template>
  <div>
    <ejs-calendar
      :isMultiSelection="true"
      :values="selectedDates"
      @change="(args) => { if (args.values) selectedDates = args.values; }"
    ></ejs-calendar>
    <p>{{ dateCount }} dates selected</p>
    <p>{{ formattedDates }}</p>
  </div>
</template>
```

---

## Next Steps

- For event tracking and lifecycle management, read `references/calendar-events-methods.md`.
- For calendar views and navigation, read `references/calendar-calendar-views.md`.
- For styling and themes, read `references/calendar-styling-customization.md`.

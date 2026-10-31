# Date Range & Validation (Vue 3)

## Table of Contents
- [Min/Max Date Constraints](#minmax-date-constraints)
- [Disabling Specific Dates](#disabling-specific-dates)
- [Input Validation Patterns](#input-validation-patterns)
- [Date Range Restrictions](#date-range-restrictions)

---

## Min/Max Date Constraints

Restrict the date picker to a range by setting `:min` and `:max` props.

```vue
<template>
  <div style="padding: 20px">
    <h3>Date Range Constraint</h3>
    
    <p>Allowed: June 1 - June 30, 2026</p>
    
    <ejs-datepicker
      :value="selectedDate"
      :min="minDate"
      :max="maxDate"
      @change="onDateChange"
    ></ejs-datepicker>
    
    <p v-if="selectedDate">
      Selected: {{ selectedDate.toDateString() }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const minDate = ref(new Date(2026, 5, 1));   // June 1, 2026
const maxDate = ref(new Date(2026, 5, 30));  // June 30, 2026
const selectedDate = ref(new Date(2026, 5, 15)); // June 15, 2026

const onDateChange = (args) => {
  selectedDate.value = args.value;
};
</script>
```

**How it works:**
- Dates before `:min` are disabled (grayed out)
- Dates after `:max` are disabled (grayed out)
- User cannot select disabled dates
- Keyboard navigation skips disabled dates

---

## Disabling Specific Dates

Disable individual dates or patterns using the `renderDayCell` event hook.

### Example 1: Disable Weekends

```vue
<template>
  <div style="padding: 20px">
    <h3>Weekdays Only</h3>
    
    <ejs-datepicker
      :value="selectedDate"
      @renderDayCell="disableWeekends"
    ></ejs-datepicker>
    
    <p>Weekends (Sat/Sun) are disabled</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const disableWeekends = (args) => {
  // 0 = Sunday, 6 = Saturday
  if (args.date.getDay() === 0 || args.date.getDay() === 6) {
    args.isDisabled = true;
  }
};
</script>
```

### Example 2: Disable Past Dates

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    @renderDayCell="disablePastDates"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const disablePastDates = (args) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (args.date < today) {
    args.isDisabled = true;
  }
};
</script>
```

### Example 3: Disable Custom Holiday List

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    @renderDayCell="disableHolidays"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const holidays = ref([
  new Date(2026, 0, 1),   // New Year
  new Date(2026, 6, 4),   // Independence Day
  new Date(2026, 11, 25), // Christmas
]);

const disableHolidays = (args) => {
  const dateStr = args.date.toDateString();
  const isHoliday = holidays.value.some(h => h.toDateString() === dateStr);
  
  if (isHoliday) {
    args.isDisabled = true;
  }
};
</script>
```

---

## Input Validation Patterns

Validate date input with custom logic.

### Example 1: Prevent Future Dates

```vue
<template>
  <div style="padding: 20px">
    <ejs-datepicker
      :value="selectedDate"
      @change="validateNotFuture"
    ></ejs-datepicker>
    
    <p v-if="validationError" style="color: red">
      {{ validationError }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const validationError = ref('');

const validateNotFuture = (args) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (args.value > today) {
    validationError.value = 'Future dates are not allowed';
    selectedDate.value = today;
  } else {
    validationError.value = '';
    selectedDate.value = args.value;
  }
};
</script>
```

### Example 2: Minimum Age Verification

```vue
<template>
  <div style="padding: 20px">
    <h3>Age 18+ Required</h3>
    
    <ejs-datepicker
      :value="selectedDate"
      @change="validateAge"
    ></ejs-datepicker>
    
    <p v-if="validationError" style="color: red">
      {{ validationError }}
    </p>
    <p v-else-if="selectedDate">
      Age: {{ calculateAge }} years
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(null);
const validationError = ref('');
const MIN_AGE = 18;

const calculateAge = computed(() => {
  if (!selectedDate.value) return 0;
  const today = new Date();
  let age = today.getFullYear() - selectedDate.value.getFullYear();
  const monthDiff = today.getMonth() - selectedDate.value.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.value.getDate())) {
    age--;
  }
  return age;
});

const validateAge = (args) => {
  if (!args.value) {
    validationError.value = '';
    return;
  }
  
  const age = calculateAge.value;
  if (age < MIN_AGE) {
    validationError.value = `You must be at least ${MIN_AGE} years old`;
    selectedDate.value = null;
  } else {
    validationError.value = '';
    selectedDate.value = args.value;
  }
};
</script>
```

### Example 3: Date Range Validation

```vue
<template>
  <div style="padding: 20px">
    <h3>Date Range Validation</h3>
    
    <label>Start Date:</label>
    <ejs-datepicker
      :value="startDate"
      @change="onStartChange"
    ></ejs-datepicker>
    
    <label>End Date:</label>
    <ejs-datepicker
      :value="endDate"
      :min="startDate"
      @change="onEndChange"
    ></ejs-datepicker>
    
    <p v-if="validationError" style="color: red">
      {{ validationError }}
    </p>
    <p v-else-if="startDate && endDate">
      Duration: {{ durationDays }} days
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const startDate = ref(new Date());
const endDate = ref(new Date());
const validationError = ref('');

const durationDays = computed(() => {
  if (!startDate.value || !endDate.value) return 0;
  const diff = endDate.value - startDate.value;
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
});

const onStartChange = (args) => {
  startDate.value = args.value;
  if (endDate.value && args.value > endDate.value) {
    validationError.value = 'Start date cannot be after end date';
  } else {
    validationError.value = '';
  }
};

const onEndChange = (args) => {
  endDate.value = args.value;
  if (startDate.value && args.value < startDate.value) {
    validationError.value = 'End date cannot be before start date';
  } else {
    validationError.value = '';
  }
};
</script>
```

---

## Date Range Restrictions

Limit user selection to specific date windows.

### Example 1: Current Month Only

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    :min="monthStart"
    :max="monthEnd"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const today = new Date();
const monthStart = ref(new Date(today.getFullYear(), today.getMonth(), 1));
const monthEnd = ref(new Date(today.getFullYear(), today.getMonth() + 1, 0));
const selectedDate = ref(new Date());
</script>
```

### Example 2: Booking Window (Next 30 Days)

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    :min="tomorrow"
    :max="in30Days"
  ></ejs-datepicker>
  
  <p>Available: Next 30 days</p>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const today = new Date();
const tomorrow = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));

const in30Days = ref(new Date());
in30Days.value.setDate(in30Days.value.getDate() + 30);

const selectedDate = ref(tomorrow.value);
</script>
```

### Example 3: Business Days Only

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    @renderDayCell="filterBusinessDays"
  ></ejs-datepicker>
  
  <p>Business days only (Mon-Fri)</p>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const filterBusinessDays = (args) => {
  const dayOfWeek = args.date.getDay();
  // 0 = Sunday, 6 = Saturday
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    args.isDisabled = true;
  }
};
</script>
```

---

## Next Steps

- For date masking and strict mode, read `references/datepicker-date-masking-and-strict-mode.md`.
- For customization, read `references/datepicker-customization-and-styling.md`.
- For accessibility, read `references/datepicker-accessibility-and-keyboard.md`.

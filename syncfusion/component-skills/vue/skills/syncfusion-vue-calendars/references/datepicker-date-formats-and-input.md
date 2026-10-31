# Date Formats & Input (Vue 3)

## Table of Contents
- [Format Configuration](#format-configuration)
- [Date String Parsing](#date-string-parsing)
- [Locale-Specific Formats](#locale-specific-formats)
- [Custom Format Examples](#custom-format-examples)
- [Format Placeholders](#format-placeholders)

---

## Format Configuration

Use the `:format` prop to control how dates appear in the input field.

```vue
<template>
  <div style="padding: 20px">
    <h3>Date Format Examples</h3>
    
    <h4>Format: dd/MM/yyyy (European)</h4>
    <ejs-datepicker
      :value="today"
      format="dd/MM/yyyy"
    ></ejs-datepicker>
    
    <h4>Format: MM/dd/yyyy (US)</h4>
    <ejs-datepicker
      :value="today"
      format="MM/dd/yyyy"
    ></ejs-datepicker>
    
    <h4>Format: yyyy-MM-dd (ISO)</h4>
    <ejs-datepicker
      :value="today"
      format="yyyy-MM-dd"
    ></ejs-datepicker>
    
    <h4>Format: MMMM dd, yyyy (Long)</h4>
    <ejs-datepicker
      :value="today"
      format="MMMM dd, yyyy"
    ></ejs-datepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const today = ref(new Date(2026, 6, 15)); // July 15, 2026
</script>
```

**Output Examples:**
- `dd/MM/yyyy` → "15/07/2026"
- `MM/dd/yyyy` → "07/15/2026"
- `yyyy-MM-dd` → "2026-07-15"
- `MMMM dd, yyyy` → "July 15, 2026"

---

## Date String Parsing

The DatePicker automatically parses date strings based on the configured format.

```vue
<template>
  <div style="padding: 20px">
    <h4>Input Validation & Parsing</h4>
    
    <label>Enter date (dd/MM/yyyy):</label>
    <ejs-datepicker
      :value="selectedDate"
      format="dd/MM/yyyy"
      placeholder="15/07/2026"
      @change="onDateChange"
    ></ejs-datepicker>
    
    <p v-if="selectedDate">
      Parsed as: {{ selectedDate.toDateString() }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(null);

const onDateChange = (args) => {
  selectedDate.value = args.value;
  console.log('Parsed date:', args.value);
};
</script>
```

### Valid Input Examples (for format "dd/MM/yyyy")
- ✅ "15/07/2026" — fully specified
- ✅ "15/07" — assumes current year
- ✅ "15" — assumes current month and year
- ❌ "2026-07-15" — wrong format
- ❌ "July 15, 2026" — wrong format

---

## Locale-Specific Formats

The DatePicker can use locale-specific date formats automatically.

```vue
<template>
  <div style="padding: 20px">
    <h3>Locale-Specific Formats</h3>
    
    <h4>English (en)</h4>
    <ejs-datepicker
      :value="today"
      locale="en"
    ></ejs-datepicker>
    
    <h4>Spanish (es)</h4>
    <ejs-datepicker
      :value="today"
      locale="es"
    ></ejs-datepicker>
    
    <h4>French (fr)</h4>
    <ejs-datepicker
      :value="today"
      locale="fr"
    ></ejs-datepicker>
    
    <h4>German (de)</h4>
    <ejs-datepicker
      :value="today"
      locale="de"
    ></ejs-datepicker>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const today = ref(new Date());
</script>
```

**Format by Locale:**
- `en` (English) → "7/15/2026" or "15/7/2026" (depends on region)
- `es` (Spanish) → "15/7/2026"
- `fr` (French) → "15/07/2026"
- `de` (German) → "15.07.2026"

---

## Custom Format Examples

### Example 1: Date with Weekday

```vue
<template>
  <ejs-datepicker
    :value="new Date()"
    format="dddd, MMMM dd, yyyy"
  ></ejs-datepicker>
</template>

<script setup>
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';
</script>
```

**Output:** "Wednesday, July 15, 2026"

### Example 2: Short Month Format

```vue
<template>
  <ejs-datepicker
    :value="new Date()"
    format="dd-MMM-yyyy"
  ></ejs-datepicker>
</template>
```

**Output:** "15-Jul-2026"

### Example 3: Time-Included Format

```vue
<template>
  <ejs-datepicker
    :value="new Date()"
    format="MM/dd/yyyy hh:mm a"
  ></ejs-datepicker>
</template>
```

**Output:** "07/15/2026 02:30 PM"

### Example 4: Custom Separator

```vue
<template>
  <ejs-datepicker
    :value="new Date()"
    format="yyyy.MM.dd"
  ></ejs-datepicker>
</template>
```

**Output:** "2026.07.15"

---

## Format Placeholders

Complete reference of format placeholder characters:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| **y** | Year (2-4 digits) | yy = 26, yyyy = 2026 |
| **M** | Month | M = 7, MM = 07, MMM = Jul, MMMM = July |
| **d** | Day | d = 5, dd = 05 |
| **E** | Weekday | E = Wed, EEEE = Wednesday |
| **h** | Hour (12-hour) | h = 2, hh = 02 |
| **H** | Hour (24-hour) | H = 14, HH = 14 |
| **m** | Minute | m = 5, mm = 05 |
| **s** | Second | s = 9, ss = 09 |
| **a** | AM/PM | a = PM |

### Complete Format Example

```vue
<template>
  <ejs-datepicker
    :value="new Date(2026, 6, 15, 14, 30, 45)"
    format="yyyy-MM-dd hh:mm:ss a"
  ></ejs-datepicker>
</template>
```

**Output:** "2026-07-15 02:30:45 PM"

---

### Dynamic Format Switching

```vue
<template>
  <div style="padding: 20px">
    <div style="margin-bottom: 15px">
      <label>
        <input
          v-model="selectedFormat"
          type="radio"
          value="MM/dd/yyyy"
        >
        MM/dd/yyyy
      </label>
      <label>
        <input
          v-model="selectedFormat"
          type="radio"
          value="dd/MM/yyyy"
        >
        dd/MM/yyyy
      </label>
      <label>
        <input
          v-model="selectedFormat"
          type="radio"
          value="yyyy-MM-dd"
        >
        yyyy-MM-dd
      </label>
    </div>
    
    <ejs-datepicker
      :value="selectedDate"
      :format="selectedFormat"
    ></ejs-datepicker>
    
    <p>Format: {{ selectedFormat }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const selectedFormat = ref('MM/dd/yyyy');
</script>
```

---

## Next Steps

- For date validation, read `references/datepicker-date-range-and-validation.md`.
- For customization, read `references/datepicker-customization-and-styling.md`.
- For internationalization, read `references/datepicker-globalization-and-localization.md`.

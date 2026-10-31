# Date Masking & Strict Mode (Vue 3)

## Table of Contents
- [Masking Behavior and Configuration](#masking-behavior-and-configuration)
- [Strict vs Loose Validation](#strict-vs-loose-validation)
- [Error Handling](#error-handling)
- [Input Sanitization](#input-sanitization)

---

## Masking Behavior and Configuration

Date masking guides user input by showing placeholder characters and enforcing format rules.

### Default Masking (Strict Mode)

```vue
<template>
  <div style="padding: 20px">
    <h3>Default Masking (Strict Mode Enabled)</h3>
    
    <label>Date (MM/DD/YYYY):</label>
    <ejs-datepicker
      :value="selectedDate"
      format="MM/dd/yyyy"
      placeholder="mm/dd/yyyy"
    ></ejs-datepicker>
    
    <p>Try typing: 1234567 (auto-formats to 12/34/567...)</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

**How Strict Masking Works:**
- User types digit by digit
- Separators (/, -, .) are added automatically
- Field advances to next segment after max digits
- Invalid characters are rejected
- Format strictly enforced

### Disabled Masking (Loose Mode)

```vue
<template>
  <div style="padding: 20px">
    <h3>Loose Masking (Strict Mode Disabled)</h3>
    
    <ejs-datepicker
      :value="selectedDate"
      format="MM/dd/yyyy"
      :strictMode="false"
      placeholder="Enter any date format"
    ></ejs-datepicker>
    
    <p>Accepts: "12/15/2026", "2026-12-15", "15 Dec 2026", etc.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

---

## Strict vs Loose Validation

### Strict Mode (Default: `strictMode={true}`)

```vue
<template>
  <div style="padding: 20px">
    <h3>Strict Mode Validation</h3>
    
    <ejs-datepicker
      :value="selectedDate"
      format="dd/MM/yyyy"
      :strictMode="true"
      @change="handleChange"
    ></ejs-datepicker>
    
    <p v-if="error" style="color: red">{{ error }}</p>
    <p>Format: dd/MM/yyyy only</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const error = ref('');

const handleChange = (args) => {
  if (!args.value) {
    error.value = 'Invalid date format. Use dd/MM/yyyy';
  } else {
    error.value = '';
    selectedDate.value = args.value;
  }
};
</script>
```

**Strict Mode Behavior:**
- ✅ Accepts only the specified format
- ✅ Rejects invalid characters
- ✅ Zero-pads month/day automatically
- ❌ Rejects "12-15-2026" if format is "MM/dd/yyyy"
- ❌ Rejects "2026/12/15" unless format specifies it

### Loose Mode (`strictMode={false}`)

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    format="MM/dd/yyyy"
    :strictMode="false"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>
```

**Loose Mode Behavior:**
- ✅ Accepts multiple date formats
- ✅ Parses "12/15/2026", "2026-12-15", "15 Dec 2026"
- ✅ More flexible user input
- ⚠️ May parse ambiguous dates unexpectedly
- ⚠️ Less consistent input experience

**Comparison Table:**

| Aspect | Strict | Loose |
|--------|--------|-------|
| Format enforced | Yes | No |
| Multiple formats | No | Yes |
| Auto-formatting | Yes | No |
| Validation strict | Yes | No |
| User flexibility | Low | High |
| Recommended for | Production | Forms |

---

## Error Handling

Handle validation errors and user feedback.

### Example 1: Validation with User Feedback

```vue
<template>
  <div style="padding: 20px">
    <label>Select date:</label>
    <ejs-datepicker
      :value="selectedDate"
      format="MM/dd/yyyy"
      :strictMode="true"
      placeholder="MM/DD/YYYY"
      @change="validateInput"
    ></ejs-datepicker>
    
    <div v-if="status" :style="{ color: status.isError ? 'red' : 'green' }">
      {{ status.message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
const status = ref(null);

const validateInput = (args) => {
  if (!args.value) {
    status.value = {
      isError: true,
      message: '⚠️ Please enter a valid date (MM/DD/YYYY)'
    };
    return;
  }
  
  if (args.value > new Date()) {
    status.value = {
      isError: true,
      message: '⚠️ Cannot select future dates'
    };
    selectedDate.value = null;
    return;
  }
  
  status.value = {
    isError: false,
    message: `✅ Date accepted: ${args.value.toDateString()}`
  };
  selectedDate.value = args.value;
};
</script>
```

### Example 2: Try-Catch Parsing

```vue
<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const safeParseDate = (args) => {
  try {
    if (!args.value) {
      throw new Error('No date selected');
    }
    
    // Validate date is not too far in past/future
    const year = args.value.getFullYear();
    if (year < 1900 || year > 2100) {
      throw new Error(`Year ${year} is out of range`);
    }
    
    selectedDate.value = args.value;
    console.log('Date parsed successfully:', args.value);
  } catch (error) {
    console.error('Date parsing error:', error.message);
    selectedDate.value = null;
  }
};
</script>
```

---

## Input Sanitization

Ensure clean date input by sanitizing user entry.

### Example 1: Remove Extra Characters

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    format="MM/dd/yyyy"
    @change="sanitizeInput"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

const sanitizeInput = (args) => {
  if (!args.value) return;
  
  // Trim whitespace
  let input = args.value.toString().trim();
  
  // Remove common extra characters
  input = input.replace(/[^0-9/\-\.]/g, '');
  
  // Parse cleaned input
  try {
    const parsed = new Date(input);
    if (!isNaN(parsed.getTime())) {
      selectedDate.value = parsed;
    }
  } catch (e) {
    console.error('Could not parse sanitized input:', input);
  }
};
</script>
```

### Example 2: Date Range Validation

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    :min="minDate"
    :max="maxDate"
    @change="validateRange"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const minDate = ref(new Date(2026, 0, 1));
const maxDate = ref(new Date(2026, 11, 31));
const selectedDate = ref(new Date());

const validateRange = (args) => {
  if (!args.value) return;
  
  if (args.value < minDate.value) {
    console.warn('Date before minimum');
    selectedDate.value = minDate.value;
  } else if (args.value > maxDate.value) {
    console.warn('Date after maximum');
    selectedDate.value = maxDate.value;
  } else {
    selectedDate.value = args.value;
  }
};
</script>
```

---

## Best Practices

1. **Prefer Strict Mode** for production forms to ensure consistent input
2. **Provide Clear Placeholders** to guide users on expected format
3. **Use Masked Input** to auto-format as users type
4. **Validate Early** to give immediate feedback
5. **Handle Errors Gracefully** with user-friendly messages
6. **Test Edge Cases** like leap years, month boundaries, etc.

---

## Next Steps

- For customization, read `references/datepicker-customization-and-styling.md`.
- For date formats, read `references/datepicker-date-formats-and-input.md`.
- For accessibility, read `references/datepicker-accessibility-and-keyboard.md`.

# Vue Composition API Patterns — Syncfusion Vue MaskedTextBox

## Table of Contents
- [Reactive State Management](#reactive-state-management)
- [Event Handling](#event-handling)
- [Computed Properties](#computed-properties)
- [Advanced Patterns](#advanced-patterns)

---

## Reactive State Management

Use Vue's reactive data for state management:

```vue
<template>
  <div>
    <ejs-maskedtextbox
      mask="(999) 999-9999"
      v-model="phoneNumber"
      placeholder="Phone">
    </ejs-maskedtextbox>

    <p>Current: {{ phoneNumber }}</p>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { ref } from 'vue';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  setup() {
    const phoneNumber = ref('');

    return {
      phoneNumber
    }
  }
}
</script>
```

---

## Event Handling

Handle input changes with events:

```vue
<template>
  <div>
    <ejs-maskedtextbox
      mask="99/99/9999"
      placeholder="MM/DD/YYYY"
      @change="handleDateChange"
      @focus="onFocus"
      @blur="onBlur">
    </ejs-maskedtextbox>

    <p v-if="isFocused">Editing date...</p>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { ref } from 'vue';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  setup() {
    const isFocused = ref(false);

    const handleDateChange = (event) => {
      console.log('Date changed:', event.value);
    };

    const onFocus = () => {
      isFocused.value = true;
    };

    const onBlur = () => {
      isFocused.value = false;
    };

    return {
      isFocused,
      handleDateChange,
      onFocus,
      onBlur
    }
  }
}
</script>
```

---

## Computed Properties

Use computed properties for derived values:

```vue
<template>
  <div>
    <ejs-maskedtextbox
      mask="(999) 999-9999"
      v-model="phone"
      placeholder="Phone">
    </ejs-maskedtextbox>

    <p>{{ formattedPhone }}</p>
    <p>{{ isValidPhone ? '✓ Valid' : '✗ Invalid' }}</p>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { ref, computed } from 'vue';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  setup() {
    const phone = ref('');

    const isValidPhone = computed(() => {
      return phone.value && !phone.value.includes('#');
    });

    const formattedPhone = computed(() => {
      return phone.value ? `Phone: ${phone.value}` : 'Enter phone number';
    });

    return {
      phone,
      isValidPhone,
      formattedPhone
    }
  }
}
</script>
```

---

## Advanced Patterns

### Form State Management

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-field">
      <label>Phone:</label>
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        v-model="formState.phone"
        @blur="validateField('phone')">
      </ejs-maskedtextbox>
      <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
    </div>

    <div class="form-field">
      <label>Date:</label>
      <ejs-maskedtextbox
        mask="99/99/9999"
        v-model="formState.date"
        @blur="validateField('date')">
      </ejs-maskedtextbox>
      <span v-if="errors.date" class="error">{{ errors.date }}</span>
    </div>

    <button type="submit" :disabled="!isFormValid">Submit</button>
  </form>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { ref, reactive, computed } from 'vue';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  setup() {
    const formState = reactive({
      phone: '',
      date: ''
    });

    const errors = reactive({
      phone: '',
      date: ''
    });

    const isFormValid = computed(() => {
      return !formState.phone.includes('#') &&
             !formState.date.includes('#') &&
             formState.phone &&
             formState.date;
    });

    const validateField = (field) => {
      if (!formState[field] || formState[field].includes('#')) {
        errors[field] = `${field} is required`;
      } else {
        errors[field] = '';
      }
    };

    const submitForm = () => {
      validateField('phone');
      validateField('date');

      if (isFormValid.value) {
        console.log('Form submitted:', formState);
      }
    };

    return {
      formState,
      errors,
      isFormValid,
      validateField,
      submitForm
    }
  }
}
</script>

<style scoped>
.form-field {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.error {
  color: #d83b01;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

button {
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

### Custom Hook Pattern

```vue
<template>
  <div>
    <ejs-maskedtextbox
      :mask="mask"
      v-model="value"
      @change="handleChange">
    </ejs-maskedtextbox>

    <p>{{ displayValue }}</p>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { ref, computed } from 'vue';

// Reusable composition function
function useMaskedInput(initialMask = '') {
  const value = ref('');
  const mask = ref(initialMask);

  const isComplete = computed(() => {
    return value.value && !value.value.includes('#');
  });

  const displayValue = computed(() => {
    return isComplete.value ? `Value: ${value.value}` : 'Incomplete';
  });

  const handleChange = (event) => {
    console.log('Changed:', event.value);
  };

  return {
    value,
    mask,
    isComplete,
    displayValue,
    handleChange
  }
}

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  setup() {
    return useMaskedInput('(999) 999-9999');
  }
}
</script>
```

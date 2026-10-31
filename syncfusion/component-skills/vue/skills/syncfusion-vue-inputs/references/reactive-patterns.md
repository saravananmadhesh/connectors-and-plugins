# Reactive Patterns and Two-Way Binding - Vue 3

## Overview

Vue 3 Composition API provides powerful reactive patterns for managing component state. This guide covers the best practices for working with Syncfusion input components.

---

## Two-Way Binding with v-model

### Basic v-model Binding

```vue
<template>
  <div class="binding-demo">
    <!-- Text Input -->
    <TextBoxComponent v-model="username" placeholder="Enter username" />
    <p>Username: {{ username }}</p>

    <!-- Numeric Input -->
    <NumericTextBoxComponent v-model="age" :min="0" :max="120" />
    <p>Age: {{ age }}</p>

    <!-- CheckBox -->
    <CheckBoxComponent v-model="isActive" label="Active Status" />
    <p>Active: {{ isActive }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  TextBoxComponent,
  NumericTextBoxComponent,
  CheckBoxComponent
} from '@syncfusion/ej2-vue-inputs';

const username = ref('');
const age = ref(18);
const isActive = ref(false);
</script>
```

### Custom v-model Modifiers

```vue
<template>
  <div class="modifiers-demo">
    <!-- Lazy modifier - update on blur instead of input -->
    <TextBoxComponent
      v-model.lazy="lazyInput"
      placeholder="Updates on blur"
    />
    <p>Lazy: {{ lazyInput }}</p>

    <!-- Number modifier - coerce string to number -->
    <NumericTextBoxComponent
      v-model.number="numericValue"
      placeholder="Auto-converted to number"
    />
    <p>Type: {{ typeof numericValue }}</p>

    <!-- Trim modifier - remove whitespace -->
    <TextBoxComponent
      v-model.trim="trimmedInput"
      placeholder="Whitespace removed"
    />
    <p>Trimmed: "{{ trimmedInput }}"</p>

    <!-- Combined modifiers -->
    <TextBoxComponent
      v-model.lazy.trim="combinedInput"
      placeholder="Lazy and trimmed"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  TextBoxComponent,
  NumericTextBoxComponent
} from '@syncfusion/ej2-vue-inputs';

const lazyInput = ref('');
const numericValue = ref(0);
const trimmedInput = ref('');
const combinedInput = ref('');
</script>
```

---

## Reactive State Management

### Using ref() for Primitive Values

```vue
<template>
  <div class="ref-demo">
    <div class="field-group">
      <label>Email:</label>
      <TextBoxComponent
        v-model="email"
        type="email"
        placeholder="Enter email"
      />
    </div>

    <div class="field-group">
      <label>Score:</label>
      <NumericTextBoxComponent
        v-model="score"
        :min="0"
        :max="100"
        @blur="updateStatus"
      />
    </div>

    <div class="status">
      <p v-if="score >= 80" class="excellent">Excellent!</p>
      <p v-else-if="score >= 60" class="good">Good</p>
      <p v-else class="needs-improvement">Needs Improvement</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  TextBoxComponent,
  NumericTextBoxComponent
} from '@syncfusion/ej2-vue-inputs';

const email = ref('');
const score = ref(0);

const updateStatus = () => {
  console.log(`Score updated: ${score.value}`);
};
</script>

<style scoped>
.status p {
  font-weight: 600;
  margin: 10px 0;
}

.excellent {
  color: #28a745;
}

.good {
  color: #ffc107;
}

.needs-improvement {
  color: #dc3545;
}
</style>
```

### Using reactive() for Objects

```vue
<template>
  <div class="reactive-demo">
    <div class="form-group">
      <label>First Name:</label>
      <TextBoxComponent v-model="user.firstName" />
    </div>

    <div class="form-group">
      <label>Last Name:</label>
      <TextBoxComponent v-model="user.lastName" />
    </div>

    <div class="form-group">
      <label>Email:</label>
      <TextBoxComponent v-model="user.email" type="email" />
    </div>

    <div class="form-group">
      <label>Age:</label>
      <NumericTextBoxComponent v-model="user.age" :min="0" :max="150" />
    </div>

    <div class="display">
      <h3>User Profile</h3>
      <p><strong>Full Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
    </div>

    <button @click="resetUser">Reset</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import {
  TextBoxComponent,
  NumericTextBoxComponent
} from '@syncfusion/ej2-vue-inputs';

const user = reactive({
  firstName: '',
  lastName: '',
  email: '',
  age: 0
});

const resetUser = () => {
  user.firstName = '';
  user.lastName = '';
  user.email = '';
  user.age = 0;
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.display {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
```

---

## Computed Properties

### Derived State with computed()

```vue
<template>
  <div class="computed-demo">
    <div class="calculator">
      <!-- Inputs -->
      <div class="input-group">
        <label>Base Price:</label>
        <NumericTextBoxComponent
          v-model="price"
          :decimals="2"
          :min="0"
        />
      </div>

      <div class="input-group">
        <label>Tax Rate (%):</label>
        <NumericTextBoxComponent
          v-model="taxRate"
          :decimals="2"
          :min="0"
          :max="100"
        />
      </div>

      <div class="input-group">
        <label>Discount (%):</label>
        <NumericTextBoxComponent
          v-model="discountPercent"
          :decimals="2"
          :min="0"
          :max="100"
        />
      </div>

      <!-- Computed Results -->
      <div class="summary">
        <div class="summary-row">
          <span>Discount Amount:</span>
          <span>{{ formatCurrency(discountAmount) }}</span>
        </div>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>{{ formatCurrency(subtotal) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax Amount:</span>
          <span>{{ formatCurrency(taxAmount) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>{{ formatCurrency(total) }}</span>
        </div>
      </div>

      <!-- Status -->
      <div class="status">
        <p v-if="total > 1000" class="high-value">High Value Order</p>
        <p v-if="discountPercent > 20" class="high-discount">Large Discount Applied</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const price = ref(100);
const taxRate = ref(8);
const discountPercent = ref(10);

// Computed properties
const discountAmount = computed(() => {
  return price.value * (discountPercent.value / 100);
});

const subtotal = computed(() => {
  return price.value - discountAmount.value;
});

const taxAmount = computed(() => {
  return subtotal.value * (taxRate.value / 100);
});

const total = computed(() => {
  return subtotal.value + taxAmount.value;
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};
</script>

<style scoped>
.calculator {
  max-width: 400px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.summary {
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-row.total {
  font-weight: 600;
  font-size: 1.1rem;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 10px;
}

.status p {
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
}

.high-value {
  background-color: #d4edda;
  color: #155724;
}

.high-discount {
  background-color: #fff3cd;
  color: #856404;
}
</style>
```

---

## Watchers for Side Effects

### Basic watch()

```vue
<template>
  <div class="watch-demo">
    <div class="form-group">
      <label>Search:</label>
      <TextBoxComponent
        v-model="searchQuery"
        placeholder="Type to search..."
      />
    </div>

    <div class="results">
      <p v-if="isSearching" class="searching">Searching...</p>
      <ul v-else>
        <li v-for="result in searchResults" :key="result">
          {{ result }}
        </li>
      </ul>
    </div>

    <div class="log">
      <h4>Search History:</h4>
      <ul>
        <li v-for="(query, index) in searchHistory" :key="index">
          {{ query }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const searchQuery = ref('');
const searchResults = ref([]);
const isSearching = ref(false);
const searchHistory = ref([]);

// Watch for search query changes
watch(
  searchQuery,
  async (newQuery) => {
    if (newQuery.length === 0) {
      searchResults.value = [];
      return;
    }

    // Add to history
    if (newQuery.length > 2) {
      searchHistory.value.unshift(newQuery);
      if (searchHistory.value.length > 5) {
        searchHistory.value.pop();
      }
    }

    // Simulate API call
    isSearching.value = true;
    setTimeout(() => {
      searchResults.value = [
        `Result for "${newQuery}" 1`,
        `Result for "${newQuery}" 2`,
        `Result for "${newQuery}" 3`
      ];
      isSearching.value = false;
    }, 500);
  },
  { debounce: 300 } // Debounce to avoid excessive API calls
);
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.results {
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.searching {
  color: #ffc107;
  font-style: italic;
}

.results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.results li {
  padding: 8px;
  margin: 5px 0;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.results li:hover {
  background-color: #e7f3ff;
}

.log {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.log h4 {
  margin: 0 0 10px 0;
}

.log ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.log li {
  padding: 5px;
  color: #666;
}
</style>
```

### watchEffect() for Automatic Dependencies

```typescript
import { ref, watchEffect } from 'vue';

const firstName = ref('');
const lastName = ref('');
const fullName = ref('');

// watchEffect automatically tracks dependencies
watchEffect(() => {
  fullName.value = `${firstName.value} ${lastName.value}`.trim();
});

// Equivalent manual watch:
watch(
  [firstName, lastName],
  ([newFirst, newLast]) => {
    fullName.value = `${newFirst} ${newLast}`.trim();
  }
);
```

---

## Advanced Patterns

### Form State Management

```vue
<template>
  <div class="form-state-demo">
    <form @submit.prevent="submitForm">
      <TextBoxComponent v-model="form.email" type="email" />
      <TextBoxComponent v-model="form.password" type="password" />
      <button 
        type="submit"
        :disabled="!hasChanges || isSubmitting"
      >
        {{ isSubmitting ? 'Submitting...' : 'Submit' }}
      </button>
    </form>

    <div v-if="hasChanges" class="unsaved-warning">
      You have unsaved changes!
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const form = ref({ email: '', password: '' });
const originalForm = ref({ email: '', password: '' });
const isSubmitting = ref(false);

// Track if form has changes
const hasChanges = computed(() => {
  return (
    form.value.email !== originalForm.value.email ||
    form.value.password !== originalForm.value.password
  );
});

// Warn user on page leave if unsaved
watch(
  hasChanges,
  (newVal) => {
    if (newVal) {
      window.addEventListener('beforeunload', preventUnload);
    } else {
      window.removeEventListener('beforeunload', preventUnload);
    }
  }
);

const preventUnload = (e) => {
  e.preventDefault();
  e.returnValue = '';
};

const submitForm = async () => {
  isSubmitting.value = true;
  try {
    // Submit to server
    const response = await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    if (response.ok) {
      originalForm.value = { ...form.value };
      window.removeEventListener('beforeunload', preventUnload);
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>
```

---

## Best Practices

1. **Use ref() for Primitives**
   - Simpler syntax
   - Better for simple values
   - Less overhead

2. **Use reactive() for Objects**
   - Better for complex objects
   - Preserve object reactivity
   - Easier destructuring

3. **Leverage Computed Properties**
   - Automatically cached
   - Reactive to dependencies
   - Self-documenting code

4. **Use Watchers Carefully**
   - Prefer computed when possible
   - Watch side effects only
   - Remember to cleanup

5. **Performance Considerations**
   - Avoid unnecessary watchers
   - Use debounce for frequent updates
   - Memoize expensive computations


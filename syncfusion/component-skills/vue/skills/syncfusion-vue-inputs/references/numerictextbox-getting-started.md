# NumericTextBox Getting Started - Vue 3

## Table of Contents

1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [Quick Start](#quick-start)
4. [Formatting](#formatting)
5. [Validation](#validation)
6. [Spin Buttons](#spin-buttons)
7. [Accessibility](#accessibility)

---

## Installation

Install the NumericTextBox component:

```bash
npm install @syncfusion/ej2-vue-inputs @syncfusion/ej2-base
```

---

## Basic Setup

```vue
<template>
  <div class="numeric-input-container">
    <label>Enter Amount:</label>
    <NumericTextBoxComponent
      v-model="amount"
      :min="0"
      :max="10000"
      :step="1"
      @change="onChange"
    />
    <p>Value: {{ amount }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/numerictextbox/index.css";

const amount = ref(0);

const onChange = (args) => {
  console.log('Value changed to:', args.value);
};
</script>

<style scoped>
.numeric-input-container {
  max-width: 400px;
  padding: 20px;
}
</style>
```

---

## Quick Start

### Minimal NumericTextBox

```vue
<template>
  <NumericTextBoxComponent v-model="quantity" />
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const quantity = ref(1);
</script>
```

### With Currency Format

```vue
<template>
  <NumericTextBoxComponent
    v-model="price"
    :format="'c2'"
    :min="0"
  />
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const price = ref(99.99);
</script>
```

---

## Formatting

### Currency Format

Display as currency (e.g., $100.00):

```vue
<template>
  <div>
    <h3>Price Input</h3>
    <NumericTextBoxComponent
      v-model="price"
      :format="'c2'"
      placeholder="Enter price"
    />
    <p>Formatted: {{ formattedPrice }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const price = ref(100);

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price.value);
});
</script>
```

---

### Percentage Format

Display as percentage:

```vue
<template>
  <NumericTextBoxComponent
    v-model="discountPercent"
    :format="'p0'"
    :min="0"
    :max="100"
  />
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const discountPercent = ref(10);
</script>
```

---

### Custom Format

```vue
<template>
  <NumericTextBoxComponent
    v-model="value"
    format="### ##0.00"
  />
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const value = ref(1234.56);
</script>
```

---

## Validation

### Min and Max Values

```vue
<template>
  <div>
    <label>Rating (1-5):</label>
    <NumericTextBoxComponent
      v-model="rating"
      :min="1"
      :max="5"
      :step="1"
      @blur="validateRating"
    />
    <span v-if="error" class="error">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const rating = ref(3);
const error = ref('');

const validateRating = () => {
  if (rating.value < 1 || rating.value > 5) {
    error.value = 'Rating must be between 1 and 5';
    rating.value = Math.max(1, Math.min(5, rating.value));
  } else {
    error.value = '';
  }
};
</script>

<style scoped>
.error {
  color: #dc3545;
  font-size: 12px;
}
</style>
```

---

### Step Increment

```vue
<template>
  <div>
    <label>Quantity (Step: 5):</label>
    <NumericTextBoxComponent
      v-model="quantity"
      :step="5"
      :min="0"
      :max="100"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const quantity = ref(0);
</script>
```

---

## Spin Buttons

### Enable Spin Buttons

```vue
<template>
  <NumericTextBoxComponent
    v-model="count"
    :showSpinButton="true"
    :step="1"
    :min="0"
  />
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const count = ref(0);
</script>
```

---

### Custom Step with Spin Buttons

```vue
<template>
  <div>
    <label>Adjust Step Size:</label>
    <NumericTextBoxComponent
      v-model="value"
      :showSpinButton="true"
      :step="step"
      @stepUp="onStepUp"
      @stepDown="onStepDown"
    />
    <p>Step Size: {{ step }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const value = ref(0);
const step = ref(1);

const onStepUp = () => {
  console.log('Stepped up');
};

const onStepDown = () => {
  console.log('Stepped down');
};
</script>
```

---

## Accessibility

### Labels and ARIA

```vue
<template>
  <div class="form-group">
    <label for="amount">Transaction Amount</label>
    <NumericTextBoxComponent
      id="amount"
      v-model="amount"
      aria-label="Transaction Amount"
      aria-describedby="amount-help"
      :format="'c2'"
    />
    <small id="amount-help">Enter amount in USD</small>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const amount = ref(0);
</script>
```

---

## Complete Example: Multi-Field Form

```vue
<template>
  <div class="invoice-form">
    <h2>Invoice Calculator</h2>
    
    <form @submit.prevent="submitInvoice">
      <div class="form-group">
        <label>Unit Price:</label>
        <NumericTextBoxComponent
          v-model="unitPrice"
          :format="'c2'"
          :min="0"
        />
      </div>

      <div class="form-group">
        <label>Quantity:</label>
        <NumericTextBoxComponent
          v-model="quantity"
          :step="1"
          :min="1"
        />
      </div>

      <div class="form-group">
        <label>Discount (%):</label>
        <NumericTextBoxComponent
          v-model="discountPercent"
          :format="'p0'"
          :min="0"
          :max="100"
        />
      </div>

      <div class="summary">
        <p><strong>Subtotal:</strong> {{ formatCurrency(subtotal) }}</p>
        <p><strong>Discount:</strong> {{ formatCurrency(discountAmount) }}</p>
        <p><strong>Total:</strong> {{ formatCurrency(total) }}</p>
      </div>

      <button type="submit">Generate Invoice</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const unitPrice = ref(100);
const quantity = ref(1);
const discountPercent = ref(0);

const subtotal = computed(() => unitPrice.value * quantity.value);

const discountAmount = computed(() => {
  return subtotal.value * (discountPercent.value / 100);
});

const total = computed(() => {
  return subtotal.value - discountAmount.value;
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const submitInvoice = () => {
  console.log({
    unitPrice: unitPrice.value,
    quantity: quantity.value,
    discountPercent: discountPercent.value,
    total: total.value
  });
  alert(`Invoice Total: ${formatCurrency(total.value)}`);
};
</script>

<style scoped>
.invoice-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

.summary {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
}

.summary p {
  margin: 8px 0;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>
```


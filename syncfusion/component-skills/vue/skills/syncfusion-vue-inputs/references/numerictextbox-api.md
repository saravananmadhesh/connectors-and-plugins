# NumericTextBox API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | number | null | The numeric value of the input |
| `min` | number | Number.MIN_VALUE | Minimum value allowed |
| `max` | number | Number.MAX_VALUE | Maximum value allowed |
| `step` | number | 1 | Increment/decrement step value |
| `decimals` | number | 0 | Number of decimal places |
| `format` | string | 'n2' | Format string (e.g., 'n2' for 2 decimals) |
| `currency` | string | 'USD' | Currency code (requires currency format) |
| `placeholder` | string | - | Placeholder text |
| `readonly` | boolean | false | Make input read-only |
| `enabled` | boolean | true | Enable or disable the component |
| `locale` | string | 'en-US' | Localization language |
| `showSpinButton` | boolean | true | Show increment/decrement buttons |
| `spinUpIconClass` | string | - | Custom CSS class for up button |
| `spinDownIconClass` | string | - | Custom CSS class for down button |
| `strictMode` | boolean | false | Strictly enforce min/max constraints |
| `validateDecimalOnType` | boolean | false | Validate decimals while typing |
| `showClearButton` | boolean | false | Show clear button |
| `cssClass` | string | - | Custom CSS class for styling |
| `htmlAttributes` | object | - | HTML attributes for the input |
| `floatLabelType` | string | 'Never' | Float label behavior: 'Never', 'Always', 'Auto' |
| `title` | string | - | Tooltip text |

---

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `increment()` | - | void | Increment value by step |
| `decrement()` | - | void | Decrement value by step |
| `getValue()` | - | number | Get current numeric value |
| `setValue(value)` | number | void | Set numeric value |
| `changeValue(value)` | number | void | Change value and trigger change event |
| `addValidator(rule)` | object | void | Add custom validation rule |
| `removeValidator()` | - | void | Remove validation rules |
| `destroy()` | - | void | Destroy the component |
| `focusIn()` | - | void | Set focus on the component |
| `focusOut()` | - | void | Remove focus from the component |
| `enable()` | - | void | Enable the component |
| `disable()` | - | void | Disable the component |

---

## Events

### Value Change Events

```typescript
// Value changed
onChange = (args: ChangeEventArgs) => {
  console.log(args.value);          // New numeric value
  console.log(args.previousValue);  // Previous value
  console.log(args.isInteracted);   // User interaction flag
};

// Input event (while typing)
onInput = (args: InputEventArgs) => {
  console.log(args.value);  // Current value
};

// Focus event
onFocus = (args: FocusEventArgs) => {
  console.log('NumericTextBox focused');
};

// Blur event
onBlur = (args: BlurEventArgs) => {
  console.log('NumericTextBox blurred');
  console.log(args.value);  // Final value
};
```

### Validation Events

```typescript
// Custom validation
onBeforeValidate = (args: BeforeValidateEventArgs) => {
  // args.cancel = true; // Cancel validation
};

// Invalid value
onInvalid = (args: InvalidEventArgs) => {
  console.log('Invalid value:', args.value);
};
```

---

## Vue 3 Template Binding

```vue
<template>
  <div class="numeric-demo">
    <!-- Basic binding -->
    <NumericTextBoxComponent
      v-model="amount"
      :min="0"
      :max="1000000"
      :step="100"
      :decimals="2"
      :format="'c2'"
      placeholder="Enter amount"
      @change="onChange"
      @blur="onBlur"
    />

    <!-- With validation -->
    <NumericTextBoxComponent
      v-model="discount"
      :min="0"
      :max="100"
      :step="0.5"
      :decimals="2"
      :strictMode="true"
      @input="onInput"
    />

    <!-- Display value -->
    <p>Amount: {{ amount }}</p>
    <p>Discount: {{ discount }}%</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const amount = ref(0);
const discount = ref(0);

const onChange = (args) => {
  console.log(`Value changed: ${args.previousValue} -> ${args.value}`);
};

const onBlur = (args) => {
  console.log(`Final value: ${args.value}`);
};

const onInput = (args) => {
  console.log(`Input: ${args.value}`);
};
</script>
```

---

## Format Specifications

### Standard Format Strings

```typescript
// Decimal formats
'n0'   // 1234
'n1'   // 1234.5
'n2'   // 1234.56
'n3'   // 1234.567

// Currency formats (requires locale)
'c'    // $1,234.00 (USD)
'c2'   // $1,234.56
'c0'   // $1,234

// Percentage formats
'p'    // 123400.00%
'p0'   // 123400%
'p2'   // 1234.00%

// Scientific notation
'e'    // 1.23e+3
'e2'   // 1.23e+03
```

### Custom Format Examples

```typescript
// Thousands separator
format: 'n2' // 1,234.56

// Currency with symbol
format: 'c2', locale: 'en-US'  // $1,234.56
format: 'c2', locale: 'de-DE'  // 1.234,56 €
format: 'c2', locale: 'fr-FR'  // 1 234,56 €

// Percentage
format: 'p0'  // Shows as percentage
```

---

## Complete API Example

```vue
<template>
  <div class="form-group">
    <!-- Price Input -->
    <label>Product Price:</label>
    <NumericTextBoxComponent
      v-model="price"
      :min="0"
      :max="999999"
      :decimals="2"
      :format="'c2'"
      :locale="'en-US'"
      :showSpinButton="true"
      placeholder="Enter price"
      @change="onPriceChange"
    />

    <!-- Discount Input -->
    <label>Discount (%):</label>
    <NumericTextBoxComponent
      v-model="discount"
      :min="0"
      :max="100"
      :decimals="2"
      :step="0.5"
      :strictMode="true"
      placeholder="Enter discount"
      @change="onDiscountChange"
    />

    <!-- Tax Input -->
    <label>Tax (%):</label>
    <NumericTextBoxComponent
      v-model="tax"
      :min="0"
      :max="50"
      :decimals="2"
      :step="0.25"
      placeholder="Enter tax rate"
      @change="onTaxChange"
    />

    <!-- Summary -->
    <div class="summary">
      <p>Price: {{ formattedPrice }}</p>
      <p>After Discount: {{ discountedPrice }}</p>
      <p>Total (with Tax): {{ totalPrice }}</p>
    </div>

    <!-- Action Buttons -->
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const price = ref(100);
const discount = ref(10);
const tax = ref(8);

const formattedPrice = computed(() => {
  return price.value.toFixed(2);
});

const discountedPrice = computed(() => {
  return (price.value * (1 - discount.value / 100)).toFixed(2);
});

const totalPrice = computed(() => {
  const afterDiscount = price.value * (1 - discount.value / 100);
  return (afterDiscount * (1 + tax.value / 100)).toFixed(2);
});

const onPriceChange = (args) => {
  console.log(`Price changed: ${args.value}`);
};

const onDiscountChange = (args) => {
  console.log(`Discount changed: ${args.value}%`);
};

const onTaxChange = (args) => {
  console.log(`Tax changed: ${args.value}%`);
};

const increment = () => {
  price.value += 10;
};

const decrement = () => {
  if (price.value > 0) {
    price.value -= 10;
  }
};

const reset = () => {
  price.value = 100;
  discount.value = 10;
  tax.value = 8;
};
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: 600;
}

.summary {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  margin: 5px;
}
</style>
```


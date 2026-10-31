# Steps and Configuration

## Table of Contents
- [Step Definition Patterns](#step-definition-patterns)
- [Adding Steps](#adding-steps)
- [Step Properties](#step-properties)
- [Setting Active Step](#setting-active-step)
- [Step Status](#step-status)
- [Disabled Steps](#disabled-steps)
- [Optional Steps](#optional-steps)
- [Read-Only Mode](#read-only-mode)
- [CSS Class Customization](#css-class-customization)

## Step Definition Patterns

Syncfusion Vue Stepper uses a reactive steps array for defining steps.

### Basic Step Structure

Each step object has the following possible properties:

```typescript
interface Step {
  label?: string;        // Step label text
  iconCss?: string;      // Icon CSS class
  text?: string;         // Text content (number, letter, etc.)
  status?: string;       // 'NotStarted' | 'InProgress' | 'Completed'
  disabled?: boolean;    // Prevent interaction with this step
  optional?: boolean;    // Mark as optional step
  cssClass?: string;     // Custom CSS class for styling
  isValid?: boolean | null; // true: valid, false: invalid, null: pending
}
```

## Adding Steps

### Using Reactive Array with ref()

```vue
<script setup>
import { ref } from 'vue';

// Create reactive steps array
const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
  { label: 'Step 4' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

### Adding Steps Dynamically

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' }
]);

const addStep = () => {
  steps.value.push({
    label: `Step ${steps.value.length + 1}`
  });
};

const removeStep = () => {
  steps.value.pop();
};
</script>

<template>
  <div>
    <ejs-stepper :steps="steps" />
    <button @click="addStep">Add Step</button>
    <button @click="removeStep">Remove Step</button>
  </div>
</template>
```

## Step Properties

Each step can be customized with various properties:

### Icon CSS

Display an icon for each step using the `iconCss` property:

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

### Label

Display descriptive text below or beside the step indicator using the `label` property:

```vue
<script setup>
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

### Text Content

Display text instead of icons using the `text` property (useful for numbered steps or indicators):

```vue
<script setup>
const steps = ref([
  { text: '1', label: 'Account' },
  { text: '2', label: 'Profile' },
  { text: '3', label: 'Verification' },
  { text: '4', label: 'Complete' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

**Note:** When both `label` and `text` are defined, the `label` is typically displayed as secondary text.

### Combined Example

```vue
<script setup>
const steps = ref([
  { 
    iconCss: 'sf-icon-home', 
    label: 'Shipping Address',
    text: '1'
  },
  { 
    iconCss: 'sf-icon-creditcard', 
    label: 'Payment Method',
    text: '2'
  },
  { 
    iconCss: 'sf-icon-check', 
    label: 'Review Order',
    text: '3'
  }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

## Setting Active Step

Control which step is currently active using the reactive `activeStep` property:

```vue
<script setup>
import { ref } from 'vue';

const activeStep = ref(1);
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" :activeStep="activeStep" />
</template>
```

**Usage:** The `activeStep` is zero-indexed. In the example above, "Delivery" (index 1) is the active step.

### Dynamic Active Step

```vue
<script setup>
import { ref } from 'vue';

const activeStep = ref(0);
const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const goToStep = (index) => {
  activeStep.value = index;
};

const nextStep = () => {
  if (activeStep.value < steps.value.length - 1) {
    activeStep.value++;
  }
};

const previousStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--;
  }
};
</script>

<template>
  <div>
    <ejs-stepper :steps="steps" :activeStep="activeStep" />
    
    <button @click="previousStep">Previous</button>
    <button @click="nextStep">Next</button>
    
    <div>
      <button @click="goToStep(0)">Step 1</button>
      <button @click="goToStep(1)">Step 2</button>
      <button @click="goToStep(2)">Step 3</button>
    </div>
  </div>
</template>
```

## Step Status

Define the completion status of each step using the `status` property. Valid values: `'NotStarted'`, `'InProgress'`, `'Completed'`.

### Setting Status

```vue
<script setup>
const steps = ref([
  { 
    iconCss: 'sf-icon-cart', 
    label: 'Cart',
    status: 'Completed'
  },
  { 
    iconCss: 'sf-icon-transport', 
    label: 'Delivery',
    status: 'InProgress'
  },
  { 
    iconCss: 'sf-icon-payment', 
    label: 'Payment',
    status: 'NotStarted'
  }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

### Dynamic Status Update

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1', status: 'NotStarted' },
  { label: 'Step 2', status: 'NotStarted' },
  { label: 'Step 3', status: 'NotStarted' }
]);

const updateStepStatus = (stepIndex, newStatus) => {
  steps.value[stepIndex].status = newStatus;
};

const markStepComplete = (stepIndex) => {
  updateStepStatus(stepIndex, 'Completed');
};

const markStepInProgress = (stepIndex) => {
  updateStepStatus(stepIndex, 'InProgress');
};
</script>

<template>
  <div>
    <ejs-stepper :steps="steps" />
    
    <button @click="markStepComplete(0)">Complete Step 1</button>
    <button @click="markStepInProgress(1)">Start Step 2</button>
  </div>
</template>
```

## Disabled Steps

Prevent user interaction with specific steps using the `disabled` property:

```vue
<script setup>
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { 
    iconCss: 'sf-icon-payment', 
    label: 'Payment', 
    disabled: true
  },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

**Use Case:** Disable payment step until shipping address is confirmed.

### Disable Multiple Steps

```vue
<script setup>
import { computed, ref } from 'vue';

const completedSteps = ref([0]); // Only first step completed
const allSteps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
  { label: 'Step 4' }
]);

// Compute which steps should be disabled
const steps = computed(() => {
  return allSteps.value.map((step, index) => ({
    ...step,
    disabled: !completedSteps.value.includes(index - 1) && index > 0
  }));
});

const completeStep = (stepIndex) => {
  completedSteps.value.push(stepIndex);
};
</script>

<template>
  <div>
    <ejs-stepper :steps="steps" />
    <button @click="completeStep(0)">Complete Step 1</button>
  </div>
</template>
```

## Optional Steps

Mark steps as optional to indicate they don't need to be completed:

```vue
<script setup>
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { 
    iconCss: 'sf-icon-gift', 
    label: 'Gift Wrap', 
    optional: true
  },
  { iconCss: 'sf-icon-payment', label: 'Payment' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

**Visual Indicator:** Optional steps display an "optional" label depending on the step type.

## Read-Only Mode

Disable all user interactions with the Stepper using the `readOnly` property:

```vue
<script setup>
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" :readOnly="true" />
</template>
```

**Use Case:** Display stepper as a progress indicator without allowing step changes.

## CSS Class Customization

Apply custom CSS classes to steps for additional styling:

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { 
    iconCss: 'sf-icon-cart', 
    label: 'Cart',
    cssClass: 'step-active'
  },
  { 
    iconCss: 'sf-icon-transport', 
    label: 'Delivery',
    cssClass: 'step-completed'
  },
  { 
    iconCss: 'sf-icon-payment', 
    label: 'Payment',
    cssClass: 'step-pending'
  }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>

<style scoped>
:deep(.step-active) {
  background-color: #007bff;
  color: white;
}

:deep(.step-completed) {
  background-color: #28a745;
  color: white;
}

:deep(.step-pending) {
  background-color: #f5f5f5;
  color: #666;
}
</style>
```

## Validation States

Mark steps as valid or invalid to show validation results:

```vue
<script setup>
const steps = ref([
  { 
    iconCss: 'sf-icon-cart', 
    label: 'Cart',
    isValid: true
  },
  { 
    iconCss: 'sf-icon-transport', 
    label: 'Delivery',
    isValid: false
  },
  { 
    iconCss: 'sf-icon-payment', 
    label: 'Payment',
    isValid: null
  }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

**Values:**
- `true` - Shows success/checkmark indicator
- `false` - Shows error/cross indicator
- `null` - Default state, no validation indicator

### Dynamic Validation

```vue
<script setup>
import { ref } from 'vue';

const formData = ref({
  email: '',
  phone: '',
  address: ''
});

const steps = ref([
  { label: 'Contact', isValid: null },
  { label: 'Address', isValid: null },
  { label: 'Review', isValid: null }
]);

const validateEmail = (value) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  steps.value[0].isValid = isValid;
  return isValid;
};

const validatePhone = (value) => {
  const isValid = /^\d{10,}$/.test(value);
  steps.value[1].isValid = isValid;
  return isValid;
};

const handleEmailInput = (e) => {
  formData.value.email = e.target.value;
  validateEmail(e.target.value);
};

const handlePhoneInput = (e) => {
  formData.value.phone = e.target.value;
  validatePhone(e.target.value);
};
</script>

<template>
  <div>
    <ejs-stepper :steps="steps" />
    
    <input 
      @input="handleEmailInput"
      placeholder="Enter email"
      type="email"
    />
    <input 
      @input="handlePhoneInput"
      placeholder="Enter phone"
      type="tel"
    />
  </div>
</template>
```

## Troubleshooting

**Issue: Steps not appearing**
- ✅ Ensure `steps` prop is a reactive ref()
- ✅ Verify step array is not empty
- ✅ Check parent `ejs-stepper` component is rendered
- ✅ Inspect DevTools to confirm steps data structure

**Issue: Active step not updating**
- ✅ Verify `activeStep` is wrapped in ref()
- ✅ Ensure activeStep index is valid (0 to steps.length - 1)
- ✅ Update via `activeStep.value = newIndex`
- ✅ Check browser DevTools for console errors

**Issue: Disabled steps still clickable**
- ✅ Verify `disabled: true` is set on step object
- ✅ Check CSS isn't overriding disabled styles
- ✅ If using `readOnly`, ensure entire stepper isn't read-only
- ✅ Ensure Syncfusion CSS is properly imported

**Issue: cssClass not applying**
- ✅ Use `:deep()` selector in scoped styles
- ✅ Verify CSS class names match exactly
- ✅ Check Syncfusion CSS isn't overriding custom styles
- ✅ Ensure styles are in correct CSS scope


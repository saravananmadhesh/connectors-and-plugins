# Events and Interactions

## Table of Contents
- [Event Types](#event-types)
- [Created Event](#created-event)
- [Step Changed Event](#step-changed-event)
- [Step Changing Event](#step-changing-event)
- [Step Click Event](#step-click-event)
- [Before Step Render Event](#before-step-render-event)
- [Event Handling Patterns](#event-handling-patterns)

## Event Types

The Stepper component triggers five main events during its lifecycle and user interactions:

| Event | When It Fires | Purpose |
|-------|---------------|---------|
| `created` | Component initialization complete | Setup, initialization logic |
| `stepChanged` | After step has changed | Update UI, load content |
| `stepChanging` | Before step is about to change | Validate, prevent transitions |
| `stepClick` | User clicks a step | Track interactions, analytics |
| `beforeStepRender` | Before rendering each step | Customize step appearance |

## Created Event

Fires when the Stepper component has finished rendering and is ready for interaction.

### Basic Usage

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);

const handleCreated = () => {
  console.log('Stepper component created and ready');
};
</script>

<template>
  <ejs-stepper 
    ref="stepperRef"
    :steps="steps" 
    @created="handleCreated"
  />
</template>
```

### Practical Example: Initialization

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const handleCreated = () => {
  if (stepperRef.value) {
    console.log('Stepper initialized with', steps.value.length, 'steps');
    // Perform setup logic
  }
};
</script>

<template>
  <ejs-stepper 
    ref="stepperRef"
    :steps="steps"
    @created="handleCreated"
  />
</template>
```

## Step Changed Event

Fires after the active step has successfully changed.

### Event Arguments

```typescript
interface StepperChangedEventArgs {
  activeStep: number;     // Index of the new active step
  previousStep: number;   // Index of the previous step
  isInteracted: boolean;  // true if user interacted, false if programmatic
  name: string;          // Event name: "stepChanged"
  event?: Event;         // DOM event object
  element?: HTMLElement; // The changed step element
}
```

### Basic Usage

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Cart' },
  { label: 'Delivery' },
  { label: 'Payment' }
]);

const handleStepChanged = (args) => {
  console.log(`Step changed from ${args.previousStep} to ${args.activeStep}`);
};
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    @stepChanged="handleStepChanged"
  />
</template>
```

### Practical Example: Load Content Based on Step

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Cart' },
  { label: 'Delivery' },
  { label: 'Payment' }
]);

const stepContent = ref('');
const contents = [
  'Review your shopping cart',
  'Enter shipping address',
  'Select payment method'
];

const handleStepChanged = (args) => {
  stepContent.value = contents[args.activeStep] || '';
};
</script>

<template>
  <div>
    <ejs-stepper 
      :steps="steps"
      @stepChanged="handleStepChanged"
    />
    <div class="content-panel">
      <p>{{ stepContent }}</p>
    </div>
  </div>
</template>
```

### Loading Data on Step Change

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([...]);
const stepData = ref(null);
const isLoading = ref(false);

const loadStepData = async (stepIndex) => {
  isLoading.value = true;
  try {
    // Fetch data for the step
    const response = await fetch(`/api/step/${stepIndex}`);
    stepData.value = await response.json();
  } catch (error) {
    console.error('Failed to load step data:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleStepChanged = (args) => {
  loadStepData(args.activeStep);
};
</script>

<template>
  <div>
    <ejs-stepper 
      :steps="steps"
      @stepChanged="handleStepChanged"
    />
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="stepData">{{ stepData }}</div>
  </div>
</template>
```

## Step Changing Event

Fires **before** the step is about to change. Cancel the navigation to prevent the change.

### Event Arguments

```typescript
interface StepperChangingEventArgs {
  activeStep: number;     // Index of the step being changed to
  previousStep: number;   // Index of the current step
  cancel: boolean;        // Set to true to prevent the change
  isInteracted: boolean;  // true if user interacted, false if programmatic
  name: string;          // Event name: "stepChanging"
  event?: Event;         // DOM event object
  element?: HTMLElement; // The step element being changed to
}
```

### Basic Usage

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Cart' },
  { label: 'Delivery' },
  { label: 'Payment' }
]);

const handleStepChanging = (args) => {
  console.log(`Attempting to change from ${args.previousStep} to ${args.activeStep}`);
};
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    @stepChanging="handleStepChanging"
  />
</template>
```

### Practical Example: Validation Before Transition

```vue
<script setup>
import { ref } from 'vue';

const formData = ref({
  email: '',
  address: '',
  payment: ''
});

const steps = ref([
  { label: 'Contact Info' },
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Review' }
]);

const handleStepChanging = (args) => {
  if (args.previousStep === 0 && !formData.value.email) {
    alert('Please enter your email address');
    args.cancel = true;
    return;
  }
  if (args.previousStep === 1 && !formData.value.address) {
    alert('Please enter your shipping address');
    args.cancel = true;
    return;
  }
  if (args.previousStep === 2 && !formData.value.payment) {
    alert('Please select a payment method');
    args.cancel = true;
    return;
  }
};
</script>

<template>
  <div>
    <ejs-stepper 
      :steps="steps"
      @stepChanging="handleStepChanging"
    />
    
    <input 
      v-model="formData.email"
      placeholder="Email"
      type="email"
    />
    <input 
      v-model="formData.address"
      placeholder="Address"
    />
    <select v-model="formData.payment">
      <option value="">Select Payment</option>
      <option value="credit">Credit Card</option>
      <option value="paypal">PayPal</option>
    </select>
  </div>
</template>
```

### Complex Validation Pattern

```vue
<script setup>
import { ref } from 'vue';

const formErrors = ref({});

const validateStep = (stepIndex, formData) => {
  const validations = [
    { field: 'email', errorMsg: 'Email is required', validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { field: 'address', errorMsg: 'Address is required', validator: (v) => v.length > 0 },
    { field: 'payment', errorMsg: 'Payment method is required', validator: (v) => v.length > 0 }
  ];
  
  if (stepIndex < validations.length) {
    const validation = validations[stepIndex];
    const isValid = validation.validator(formData[validation.field] || '');
    
    if (!isValid) {
      formErrors.value[validation.field] = validation.errorMsg;
      return false;
    } else {
      delete formErrors.value[validation.field];
      return true;
    }
  }
  return true;
};

const handleStepChanging = (args) => {
  if (!validateStep(args.previousStep, formData.value)) {
    args.cancel = true;
  }
};
</script>
```

## Step Click Event

Fires when the user clicks on a step.

### Event Arguments

```typescript
interface StepperClickEventArgs {
  activeStep: number;    // Index of the clicked step
  name: string;         // Event name: "stepClick"
  event?: Event;        // DOM event object
  element?: HTMLElement; // The clicked step element
}
```

### Basic Usage

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const handleStepClick = (args) => {
  console.log(`User clicked on step ${args.activeStep}`);
};
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    @stepClick="handleStepClick"
  />
</template>
```

### Practical Example: Analytics Tracking

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Cart' },
  { label: 'Delivery' },
  { label: 'Payment' }
]);

// Simple analytics object
const analytics = {
  track: (event, data) => {
    console.log('Analytics:', event, data);
    // In production, send to analytics service
  }
};

const handleStepClick = (args) => {
  analytics.track('step_clicked', {
    stepIndex: args.activeStep,
    timestamp: new Date().toISOString()
  });
};
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    @stepClick="handleStepClick"
  />
</template>
```

## Before Step Render Event

Fires before each step is rendered, allowing you to customize the step appearance.

### Event Arguments

```typescript
interface StepperRenderingEventArgs {
  activeStep: number;    // Index of the step being rendered
  name: string;         // Event name: "beforeStepRender"
  element?: HTMLElement; // The step element being rendered
}
```

### Basic Usage

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' }
]);

const handleBeforeStepRender = (args) => {
  console.log(`Rendering step ${args.activeStep}`);
};
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    @beforeStepRender="handleBeforeStepRender"
  />
</template>
```

### Practical Example: Dynamic Styling

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Start' },
  { label: 'Middle 1' },
  { label: 'Middle 2' },
  { label: 'Complete' }
]);

const handleBeforeStepRender = (args) => {
  if (args.element) {
    // Add custom classes based on step index
    if (args.activeStep === 0) {
      args.element.classList.add('first-step');
    } else if (args.activeStep === steps.value.length - 1) {
      args.element.classList.add('last-step');
    } else {
      args.element.classList.add('middle-step');
    }
  }
};
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    @beforeStepRender="handleBeforeStepRender"
  />
</template>

<style scoped>
:deep(.first-step) {
  background-color: #e3f2fd;
}

:deep(.last-step) {
  background-color: #f3e5f5;
}

:deep(.middle-step) {
  background-color: #f5f5f5;
}
</style>
```

## Event Handling Patterns

### Pattern 1: Multiple Events Combined

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const status = ref('');

const handleCreated = () => {
  status.value = 'Stepper ready';
};

const handleStepChanging = (args) => {
  status.value = `Validating transition from step ${args.previousStep}...`;
};

const handleStepChanged = (args) => {
  status.value = `Now on step ${args.activeStep}`;
};
</script>

<template>
  <div>
    <ejs-stepper
      :steps="steps"
      @created="handleCreated"
      @stepChanging="handleStepChanging"
      @stepChanged="handleStepChanged"
    />
    <p>Status: {{ status }}</p>
  </div>
</template>
```

### Pattern 2: Conditional Event Handling

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const completedSteps = ref(0);

const handleStepClick = (args) => {
  // Only allow clicking completed steps or next step
  if (args.activeStep > completedSteps.value + 1) {
    // Revert to current step
    stepperRef.value.activeStep = completedSteps.value;
  }
};

const handleStepChanged = (args) => {
  completedSteps.value = args.activeStep;
};
</script>

<template>
  <ejs-stepper 
    ref="stepperRef"
    :steps="steps"
    @stepClick="handleStepClick"
    @stepChanged="handleStepChanged"
  />
</template>
```

### Pattern 3: Preventing Backward Navigation

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([...]);

const handleStepChanging = (args) => {
  // Prevent users from going back
  if (args.activeStep < args.previousStep) {
    args.cancel = true;
    alert('You cannot go back in this wizard');
  }
};
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    @stepChanging="handleStepChanging"
  />
</template>
```

### Pattern 4: Debounced Event Handling

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([...]);
let debounceTimer = null;

const handleStepChanging = (args) => {
  // Debounce validation to prevent rapid changes
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    validateStep(args.previousStep);
  }, 300);
};
</script>

<template>
  <ejs-stepper 
    :steps="steps"
    @stepChanging="handleStepChanging"
  />
</template>
```

## Troubleshooting

**Issue: Event handler not firing**
- ✅ Verify event name uses kebab-case in template (`@step-changed`, `@step-changing`)
- ✅ Ensure handler function is properly defined in script setup
- ✅ Check that the event trigger condition is met
- ✅ Verify component is mounted and visible

**Issue: Cancel not working in stepChanging**
- ✅ Verify `args.cancel = true` is set in handler
- ✅ Check that step is not disabled
- ✅ Ensure linear mode isn't conflicting with custom logic
- ✅ Verify event is firing with console.log()

**Issue: Args is undefined**
- ✅ Ensure handler receives args parameter
- ✅ Verify event object structure matches documentation
- ✅ Check Syncfusion version compatibility

**Issue: Event fires multiple times**
- ✅ Check for duplicate event handlers
- ✅ Verify handler logic isn't triggering re-renders
- ✅ Use conditional checks to prevent recursive updates
- ✅ Check component isn't re-mounting unnecessarily


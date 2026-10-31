# Linear Flow and Validation

## Table of Contents
- [Linear Stepper](#linear-stepper)
- [Non-Linear Navigation](#non-linear-navigation)
- [Step Validation States](#step-validation-states)
- [Combining Linear Flow with Validation](#combining-linear-flow-with-validation)
- [Resetting Stepper](#resetting-stepper)

## Linear Stepper

Linear steppers enforce sequential navigation, requiring users to complete each step before advancing to the next one. This is ideal for guided workflows like wizards.

### Enabling Linear Mode

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
  { label: 'Step 4' }
]);

const isLinear = ref(true);
</script>

<template>
  <ejs-stepper :steps="steps" :linear="isLinear" />
</template>
```

**Behavior:**
- Users can only advance to the next step
- Users cannot skip steps
- Users cannot navigate to completed steps unless they go backward sequentially
- Each step must be marked as valid to proceed

### Linear Checkout Flow Example

```vue
<script setup>
import { ref } from 'vue';

const formData = ref({
  email: '',
  address: '',
  payment: ''
});

const steps = ref([
  { label: 'Email' },
  { label: 'Address' },
  { label: 'Payment' },
  { label: 'Review' }
]);

const handleStepChanging = (args) => {
  // Validate current step before allowing transition
  if (args.previousStep === 0 && !formData.value.email) {
    alert('Please enter your email');
    args.cancel = true;
    return;
  }
  if (args.previousStep === 1 && !formData.value.address) {
    alert('Please enter your address');
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
      :linear="true"
      @stepChanging="handleStepChanging"
    />
    
    <div>
      <input 
        v-model="formData.email"
        placeholder="Enter email"
        type="email"
      />
      <input 
        v-model="formData.address"
        placeholder="Enter address"
      />
      <select v-model="formData.payment">
        <option value="">Select Payment</option>
        <option value="credit">Credit Card</option>
        <option value="paypal">PayPal</option>
      </select>
    </div>
  </div>
</template>
```

## Non-Linear Navigation

Non-linear steppers allow users to navigate freely between steps without enforcing order.

### Enabling Non-Linear Mode

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Contact' },
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Review' }
]);

const isLinear = ref(false);
</script>

<template>
  <ejs-stepper :steps="steps" :linear="isLinear" />
</template>
```

**Behavior (Default):**
- Users can click any step to jump to it
- Users can go forward and backward freely
- No forced step order
- Ideal for forms where all steps are independent

### Non-Linear Example: Multi-Tab Form

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { iconCss: 'sf-icon-user', label: 'Personal Info' },
  { iconCss: 'sf-icon-building', label: 'Company Details' },
  { iconCss: 'sf-icon-settings', label: 'Preferences' },
  { iconCss: 'sf-icon-save', label: 'Review & Submit' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" :linear="false" />
</template>
```

### Switching Between Modes Dynamically

```vue
<script setup>
import { ref } from 'vue';

const isLinear = ref(true);
const stepperRef = ref(null);
const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const toggleLinearMode = () => {
  isLinear.value = !isLinear.value;
  // Reset stepper when switching modes
  if (stepperRef.value) {
    stepperRef.value.activeStep = 0;
  }
};
</script>

<template>
  <div>
    <label>
      <input 
        type="checkbox" 
        :checked="isLinear"
        @change="toggleLinearMode"
      />
      Linear Mode
    </label>

    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      :linear="isLinear"
    />
  </div>
</template>
```

## Step Validation States

Mark steps as valid or invalid to indicate completion status:

### Validation Properties

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { 
    label: 'Completed', 
    isValid: true
  },
  { 
    label: 'Error', 
    isValid: false
  },
  { 
    label: 'Pending', 
    isValid: null
  }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

**Values:**
- `true` - Step is valid, shows checkmark/success icon
- `false` - Step has error, shows cross/error icon
- `null` - Step is pending, shows default indicator

### Dynamic Validation Based on User Input

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Email', isValid: null },
  { label: 'Address', isValid: null },
  { label: 'Payment', isValid: null }
]);

const formData = ref({
  email: '',
  address: '',
  payment: ''
});

const validateEmail = (value) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  steps.value[0].isValid = isValid;
  return isValid;
};

const validateAddress = (value) => {
  const isValid = value.length > 0;
  steps.value[1].isValid = isValid;
  return isValid;
};

const handleEmailInput = (e) => {
  formData.value.email = e.target.value;
  validateEmail(e.target.value);
};

const handleAddressInput = (e) => {
  formData.value.address = e.target.value;
  validateAddress(e.target.value);
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
      @input="handleAddressInput"
      placeholder="Enter address"
    />
  </div>
</template>
```

## Combining Linear Flow with Validation

Enforce sequential navigation only for valid steps:

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const stepValidation = ref([
  { label: 'Step 1', isValid: null },
  { label: 'Step 2', isValid: null },
  { label: 'Step 3', isValid: null }
]);

const handleStepChanging = (args) => {
  // Only allow transition if current step is valid
  const currentValidation = stepValidation.value[args.previousStep];
  
  if (currentValidation.isValid === false) {
    alert('Please fix the errors in the current step');
    args.cancel = true;
  }
};

const validateStep = (stepIndex) => {
  stepValidation.value[stepIndex].isValid = true;
};

const invalidateStep = (stepIndex) => {
  stepValidation.value[stepIndex].isValid = false;
};
</script>

<template>
  <div>
    <ejs-stepper 
      ref="stepperRef"
      :steps="stepValidation"
      :linear="true"
      @stepChanging="handleStepChanging"
    />

    <button @click="validateStep(stepperRef.activeStep || 0)">
      Complete Step
    </button>
    <button @click="invalidateStep(stepperRef.activeStep || 0)">
      Mark Error
    </button>
  </div>
</template>
```

### Real-World Example: Form with Field-Level Validation

```vue
<script setup>
import { ref, computed } from 'vue';

const stepperRef = ref(null);

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: ''
});

const steps = ref([
  { label: 'Personal', isValid: null },
  { label: 'Contact', isValid: null },
  { label: 'Address', isValid: null },
  { label: 'Review', isValid: null }
]);

// Validation rules
const validators = {
  personal: () => {
    return formData.value.firstName.length > 0 && 
           formData.value.lastName.length > 0;
  },
  contact: () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.value.email) && 
           formData.value.phone.length >= 10;
  },
  address: () => {
    return formData.value.address.length > 0 && 
           formData.value.city.length > 0;
  }
};

const handleStepChanging = (args) => {
  const previousStepValidators = [
    validators.personal,
    validators.contact,
    validators.address
  ];

  if (args.previousStep < previousStepValidators.length) {
    const validator = previousStepValidators[args.previousStep];
    if (!validator()) {
      steps.value[args.previousStep].isValid = false;
      alert('Please fill all required fields');
      args.cancel = true;
      return;
    }
  }

  steps.value[args.previousStep].isValid = true;
};
</script>

<template>
  <div>
    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      :linear="true"
      @stepChanging="handleStepChanging"
    />

    <div class="form-section">
      <input 
        v-model="formData.firstName"
        placeholder="First Name"
      />
      <input 
        v-model="formData.lastName"
        placeholder="Last Name"
      />
      <input 
        v-model="formData.email"
        placeholder="Email"
        type="email"
      />
      <input 
        v-model="formData.phone"
        placeholder="Phone"
        type="tel"
      />
      <input 
        v-model="formData.address"
        placeholder="Address"
      />
      <input 
        v-model="formData.city"
        placeholder="City"
      />
    </div>
  </div>
</template>
```

## Resetting Stepper

Use the component ref to reset the stepper to its initial state:

### Basic Reset

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const handleReset = () => {
  if (stepperRef.value) {
    stepperRef.value.reset();
  }
};
</script>

<template>
  <div>
    <ejs-stepper ref="stepperRef" :steps="steps" />
    <button @click="handleReset">Reset Stepper</button>
  </div>
</template>
```

### Reset with Form Clear

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const formData = ref({
  field1: '',
  field2: '',
  field3: ''
});

const steps = ref([
  { label: 'Information' },
  { label: 'Details' },
  { label: 'Confirm' }
]);

const handleResetWizard = () => {
  // Reset stepper
  if (stepperRef.value) {
    stepperRef.value.reset();
  }
  
  // Clear form data
  formData.value = {
    field1: '',
    field2: '',
    field3: ''
  };
  
  // Show confirmation
  alert('Wizard has been reset');
};
</script>

<template>
  <div>
    <ejs-stepper ref="stepperRef" :steps="steps" :linear="true" />
    
    <input v-model="formData.field1" placeholder="Field 1" />
    <input v-model="formData.field2" placeholder="Field 2" />
    <input v-model="formData.field3" placeholder="Field 3" />
    
    <button @click="handleResetWizard">Reset All</button>
  </div>
</template>
```

## Best Practices

**Linear Mode:**
- ✅ Use for guided workflows and wizards
- ✅ Combine with validation on `stepChanging` event
- ✅ Provide clear validation feedback
- ✅ Allow optional steps with `optional: true` property

**Non-Linear Mode:**
- ✅ Use for independent form sections
- ✅ Ideal for settings or configuration panels
- ✅ Allows users to review and edit any section
- ✅ Useful for multi-tab forms

**Validation:**
- ✅ Use `isValid: true` for completed steps
- ✅ Use `isValid: false` for steps with errors
- ✅ Use `isValid: null` for pending steps
- ✅ Update validation as user fills form
- ✅ Provide helpful error messages


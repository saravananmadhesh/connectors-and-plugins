# Methods and Advanced Usage

## Table of Contents
- [Component Methods](#component-methods)
- [Accessing Methods via Template Ref](#accessing-methods-via-template-ref)
- [Advanced Patterns](#advanced-patterns)
- [Performance Optimization](#performance-optimization)
- [Common Gotchas](#common-gotchas)

## Component Methods

The Syncfusion Stepper component provides several methods for programmatic control:

### nextStep()

Moves to the next step in the stepper.

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const goNext = () => {
  if (stepperRef.value) {
    stepperRef.value.nextStep();
  }
};
</script>

<template>
  <div>
    <ejs-stepper ref="stepperRef" :steps="steps" />
    <button @click="goNext">Next</button>
  </div>
</template>
```

### previousStep()

Moves to the previous step in the stepper.

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const goPrevious = () => {
  if (stepperRef.value) {
    stepperRef.value.previousStep();
  }
};
</script>

<template>
  <div>
    <ejs-stepper ref="stepperRef" :steps="steps" />
    <button @click="goPrevious">Previous</button>
  </div>
</template>
```

### reset()

Resets the stepper to its initial state (activeStep = 0).

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
    console.log('Stepper reset to first step');
  }
};
</script>

<template>
  <div>
    <ejs-stepper ref="stepperRef" :steps="steps" />
    <button @click="handleReset">Reset</button>
  </div>
</template>
```

## Accessing Methods via Template Ref

### Programmatic Navigation

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const currentStep = ref(0);
const steps = ref([
  { label: 'Information' },
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Review' }
]);

const goToStep = (stepIndex) => {
  if (stepperRef.value) {
    currentStep.value = stepIndex;
    stepperRef.value.activeStep = stepIndex;
  }
};

const nextDisabled = () => currentStep.value === steps.value.length - 1;
const prevDisabled = () => currentStep.value === 0;
</script>

<template>
  <div class="navigation-container">
    <ejs-stepper ref="stepperRef" :steps="steps" :activeStep="currentStep" />

    <div class="controls">
      <button :disabled="prevDisabled()" @click="stepperRef.previousStep()">
        Previous
      </button>
      <span>{{ currentStep + 1 }} / {{ steps.length }}</span>
      <button :disabled="nextDisabled()" @click="stepperRef.nextStep()">
        Next
      </button>
    </div>

    <div class="step-buttons">
      <button 
        v-for="(step, index) in steps"
        :key="index"
        @click="goToStep(index)"
        :class="{ active: currentStep === index }"
      >
        {{ index + 1 }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.navigation-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.step-buttons {
  display: flex;
  gap: 8px;
}

.step-buttons button {
  width: 40px;
  height: 40px;
  border: 2px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  background: white;
}

.step-buttons button.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}
</style>
```

### Dynamic Step Control with State

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const currentStepIndex = ref(0);

const steps = ref([
  { label: 'Login', completed: false },
  { label: 'OTP Verification', completed: false },
  { label: 'Set Password', completed: false },
  { label: 'Profile Setup', completed: false },
  { label: 'Confirmation', completed: false }
]);

const canNavigateNext = ref(true);
const canNavigatePrevious = ref(false);

const validateAndAdvance = async () => {
  // Simulate validation
  console.log(`Validating step ${currentStepIndex.value}...`);
  
  if (stepperRef.value) {
    stepperRef.value.nextStep();
    steps.value[currentStepIndex.value].completed = true;
    currentStepIndex.value++;
    
    canNavigatePrevious.value = currentStepIndex.value > 0;
    canNavigateNext.value = currentStepIndex.value < steps.value.length - 1;
  }
};

const goBack = () => {
  if (stepperRef.value && currentStepIndex.value > 0) {
    stepperRef.value.previousStep();
    currentStepIndex.value--;
    canNavigatePrevious.value = currentStepIndex.value > 0;
    canNavigateNext.value = true;
  }
};

const startOver = () => {
  if (stepperRef.value) {
    stepperRef.value.reset();
    currentStepIndex.value = 0;
    canNavigatePrevious.value = false;
    canNavigateNext.value = true;
    steps.value.forEach(step => step.completed = false);
  }
};
</script>

<template>
  <div class="stepper-control">
    <ejs-stepper ref="stepperRef" :steps="steps" :linear="true" />

    <div class="progress-info">
      <p>Step {{ currentStepIndex + 1 }} of {{ steps.length }}</p>
      <div class="progress-bar">
        <div 
          :style="{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }"
          class="progress-fill"
        ></div>
      </div>
    </div>

    <div class="button-group">
      <button 
        @click="goBack"
        :disabled="!canNavigatePrevious"
      >
        ← Back
      </button>
      <button 
        @click="validateAndAdvance"
        :disabled="!canNavigateNext"
      >
        Next →
      </button>
      <button @click="startOver">Start Over</button>
    </div>
  </div>
</template>

<style scoped>
.stepper-control {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.progress-info {
  margin: 20px 0;
}

.progress-bar {
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  transition: width 0.3s ease;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.button-group button {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background: white;
  transition: all 0.2s;
}

.button-group button:hover:not(:disabled) {
  background: #f0f0f0;
}

.button-group button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

## Advanced Patterns

### Conditional Navigation Based on Validation

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const formData = ref({
  email: '',
  password: '',
  confirmPassword: ''
});

const steps = ref([
  { label: 'Credentials', isValid: null },
  { label: 'Verification', isValid: null },
  { label: 'Complete', isValid: null }
]);

const validateCurrentStep = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(formData.value.email);
  const isPasswordValid = formData.value.password.length >= 8;
  const passwordsMatch = formData.value.password === formData.value.confirmPassword;

  return isEmailValid && isPasswordValid && passwordsMatch;
};

const handleStepChanging = (args) => {
  if (args.previousStep === 0) {
    if (!validateCurrentStep()) {
      steps.value[0].isValid = false;
      alert('Please enter valid credentials');
      args.cancel = true;
      return;
    }
    steps.value[0].isValid = true;
  }
};

const proceedIfValid = () => {
  if (validateCurrentStep()) {
    stepperRef.value.nextStep();
  } else {
    alert('Please complete the form correctly');
  }
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

    <div class="form-container">
      <input 
        v-model="formData.email"
        placeholder="Email"
        type="email"
      />
      <input 
        v-model="formData.password"
        placeholder="Password"
        type="password"
      />
      <input 
        v-model="formData.confirmPassword"
        placeholder="Confirm Password"
        type="password"
      />
    </div>

    <button @click="proceedIfValid">Continue</button>
  </div>
</template>
```

### Multi-Step Form with Auto-Save

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const isSaving = ref(false);

const formData = ref({
  personalInfo: { name: '', email: '' },
  address: { street: '', city: '' },
  preferences: { newsletter: false, notifications: true }
});

const steps = ref([
  { label: 'Personal', status: 'pending' },
  { label: 'Address', status: 'pending' },
  { label: 'Preferences', status: 'pending' }
]);

const saveStepData = async (stepIndex) => {
  isSaving.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    steps.value[stepIndex].status = 'success';
    console.log(`Step ${stepIndex} saved successfully`);
  } catch (error) {
    steps.value[stepIndex].status = 'error';
    console.error(`Failed to save step ${stepIndex}`);
  } finally {
    isSaving.value = false;
  }
};

const handleStepChanged = async (args) => {
  await saveStepData(args.previousStep);
};
</script>

<template>
  <div>
    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      @stepChanged="handleStepChanged"
    />

    <div v-if="isSaving" class="saving">Saving...</div>

    <!-- Step content would be here -->
  </div>
</template>

<style scoped>
.saving {
  padding: 10px;
  background: #e3f2fd;
  border-radius: 4px;
  color: #1565c0;
  text-align: center;
}
</style>
```

## Performance Optimization

### Lazy Loading Content

```vue
<script setup>
import { ref, computed } from 'vue';

const stepperRef = ref(null);
const activeStep = ref(0);
const loadedSteps = ref(new Set([0])); // Always load first step

const steps = ref([
  { label: 'Overview', content: 'Overview content' },
  { label: 'Details', content: 'Details content' },
  { label: 'Advanced', content: 'Advanced content' }
]);

const getStepContent = (index) => {
  if (!loadedSteps.value.has(index)) {
    return 'Loading...';
  }
  return steps.value[index].content;
};

const handleStepChanging = (args) => {
  // Pre-load the next step
  if (args.previousStep < steps.value.length - 1) {
    loadedSteps.value.add(args.previousStep + 1);
  }
};
</script>

<template>
  <ejs-stepper 
    ref="stepperRef"
    :steps="steps"
    @stepChanging="handleStepChanging"
  >
    <template v-slot:stepTemplate="{ data, index }">
      <div class="step">
        {{ data.label }}
        <div class="content">
          {{ getStepContent(index) }}
        </div>
      </div>
    </template>
  </ejs-stepper>
</template>
```

### Virtual Scrolling for Many Steps

```vue
<script setup>
import { ref, computed } from 'vue';

const steps = ref(
  Array.from({ length: 100 }, (_, i) => ({
    label: `Step ${i + 1}`,
    index: i
  }))
);

const visibleStepCount = 10;
const scrollOffset = ref(0);

const visibleSteps = computed(() => {
  const start = Math.floor(scrollOffset.value / 50);
  const end = start + visibleStepCount;
  return steps.value.slice(start, end);
});

const handleScroll = (e) => {
  scrollOffset.value = e.target.scrollLeft;
};
</script>

<template>
  <div class="virtual-stepper" @scroll="handleScroll">
    <ejs-stepper :steps="visibleSteps" />
  </div>
</template>

<style scoped>
.virtual-stepper {
  overflow-x: auto;
  height: 100%;
}
</style>
```

## Common Gotchas

### Gotcha #1: Template Ref Access Before Component Initialization

**Problem:**
```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);

// ❌ This won't work - ref is not initialized yet
stepperRef.value.nextStep();
</script>
```

**Solution:**
```vue
<script setup>
import { ref, onMounted } from 'vue';

const stepperRef = ref(null);

onMounted(() => {
  // ✅ Now ref is available
  if (stepperRef.value) {
    stepperRef.value.nextStep();
  }
});
</script>
```

### Gotcha #2: Modifying Steps Array Without Reactivity

**Problem:**
```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' }
]);

// ❌ Direct mutation won't trigger updates
steps.value[0].label = 'Updated Step';
steps.value.push({ label: 'Step 3' });
</script>
```

**Solution:**
```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' }
]);

// ✅ Use proper Vue reactivity patterns
steps.value[0] = { ...steps.value[0], label: 'Updated Step' };
steps.value = [...steps.value, { label: 'Step 3' }];

// Or use array methods
steps.value.splice(0, 1, { label: 'Updated Step' });
steps.value.push({ label: 'Step 3' });
</script>
```

### Gotcha #3: Forgetting activeStep Binding

**Problem:**
```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' }
]);

const activeStep = ref(0);

const goNext = () => {
  activeStep.value++;
  // ❌ Component won't update without binding
};
</script>

<template>
  <!-- ❌ Missing :activeStep binding -->
  <ejs-stepper :steps="steps" />
  <button @click="goNext">Next</button>
</template>
```

**Solution:**
```vue
<template>
  <!-- ✅ Include :activeStep binding -->
  <ejs-stepper :steps="steps" :activeStep="activeStep" />
  <button @click="goNext">Next</button>
</template>
```

### Gotcha #4: Event Handler Cancellation

**Problem:**
```vue
<script setup>
const handleStepChanging = (args) => {
  // ❌ args.cancel might not prevent navigation if not checked
  if (!validateStep()) {
    args.cancel = true;
  }
  // But function continues executing
};
</script>
```

**Solution:**
```vue
<script setup>
const handleStepChanging = (args) => {
  // ✅ Return early after setting cancel
  if (!validateStep()) {
    args.cancel = true;
    return;
  }
  // Additional logic only for valid steps
};
</script>
```

### Gotcha #5: Performance with Large Step Lists

**Problem:**
```vue
<script setup>
// ❌ Creating large arrays without optimization
const steps = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    label: `Step ${i}`,
    content: `Very long content for step ${i}...`.repeat(100)
  }))
);
</script>

<template>
  <!-- Rendering all 10k steps will slow down UI -->
  <ejs-stepper :steps="steps" />
</template>
```

**Solution:**
```vue
<script setup>
import { ref } from 'vue';

// ✅ Use pagination or virtual scrolling
const pageSize = 50;
const currentPage = ref(0);
const allSteps = Array.from({ length: 10000 }, (_, i) => ({
  label: `Step ${i}`
}));

const visibleSteps = ref(allSteps.slice(0, pageSize));

const nextPage = () => {
  currentPage.value++;
  const start = currentPage.value * pageSize;
  visibleSteps.value = allSteps.slice(start, start + pageSize);
};
</script>
```

## Best Practices

**Method Usage:**
- ✅ Always check if ref exists before calling methods
- ✅ Use in `onMounted` or event handlers, not during render
- ✅ Combine with validation before navigation
- ✅ Use reset() to clear state between workflows

**Advanced Patterns:**
- ✅ Implement validation in `stepChanging` event
- ✅ Auto-save data on `stepChanged` event
- ✅ Use computed properties for conditional logic
- ✅ Implement proper error handling

**Performance:**
- ✅ Lazy load content for steps
- ✅ Use virtual scrolling for large step lists
- ✅ Debounce event handlers if needed
- ✅ Optimize re-renders with proper key bindings


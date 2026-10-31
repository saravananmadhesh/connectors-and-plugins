# Advanced Patterns

## Table of Contents
- [Multi-Step Form Wizards](#multi-step-form-wizards)
- [Conditional Step Flow](#conditional-step-flow)
- [Wizard with Side Effects](#wizard-with-side-effects)
- [Progress Tracking](#progress-tracking)
- [State Management Patterns](#state-management-patterns)
- [Error Recovery](#error-recovery)

## Multi-Step Form Wizards

Complete multi-step form implementation with data persistence.

### Basic Wizard Pattern

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const currentStep = ref(0);

const wizardData = ref({
  account: { email: '', password: '' },
  profile: { firstName: '', lastName: '', phone: '' },
  address: { street: '', city: '', state: '', zip: '' },
  review: null
});

const steps = ref([
  { label: 'Account', isValid: null },
  { label: 'Profile', isValid: null },
  { label: 'Address', isValid: null },
  { label: 'Review', isValid: null }
]);

const validateAccount = () => {
  const { email, password } = wizardData.value.account;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 8;
  steps.value[0].isValid = isValid;
  return isValid;
};

const validateProfile = () => {
  const { firstName, lastName, phone } = wizardData.value.profile;
  const isValid = firstName.length > 0 && lastName.length > 0 && phone.length >= 10;
  steps.value[1].isValid = isValid;
  return isValid;
};

const validateAddress = () => {
  const { street, city, state, zip } = wizardData.value.address;
  const isValid = street && city && state && zip;
  steps.value[2].isValid = isValid;
  return isValid;
};

const handleStepChanging = (args) => {
  const validators = [validateAccount, validateProfile, validateAddress];
  
  if (args.previousStep < validators.length) {
    if (!validators[args.previousStep]()) {
      args.cancel = true;
      return;
    }
  }
};

const submitWizard = () => {
  if (!validateAddress()) {
    alert('Please complete the form');
    return;
  }
  
  wizardData.value.review = {
    ...wizardData.value.account,
    ...wizardData.value.profile,
    ...wizardData.value.address,
    submittedAt: new Date().toISOString()
  };
  
  console.log('Form submitted:', wizardData.value.review);
};
</script>

<template>
  <div class="wizard-container">
    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      :linear="true"
      @stepChanging="handleStepChanging"
    />

    <div class="wizard-content">
      <!-- Account Step -->
      <div v-if="currentStep === 0" class="step-content">
        <h3>Create Your Account</h3>
        <input 
          v-model="wizardData.account.email"
          placeholder="Email"
          type="email"
        />
        <input 
          v-model="wizardData.account.password"
          placeholder="Password"
          type="password"
        />
      </div>

      <!-- Profile Step -->
      <div v-if="currentStep === 1" class="step-content">
        <h3>Profile Information</h3>
        <input 
          v-model="wizardData.profile.firstName"
          placeholder="First Name"
        />
        <input 
          v-model="wizardData.profile.lastName"
          placeholder="Last Name"
        />
        <input 
          v-model="wizardData.profile.phone"
          placeholder="Phone"
          type="tel"
        />
      </div>

      <!-- Address Step -->
      <div v-if="currentStep === 2" class="step-content">
        <h3>Shipping Address</h3>
        <input 
          v-model="wizardData.address.street"
          placeholder="Street"
        />
        <input 
          v-model="wizardData.address.city"
          placeholder="City"
        />
        <input 
          v-model="wizardData.address.state"
          placeholder="State"
        />
        <input 
          v-model="wizardData.address.zip"
          placeholder="ZIP Code"
        />
      </div>

      <!-- Review Step -->
      <div v-if="currentStep === 3" class="step-content">
        <h3>Review Your Information</h3>
        <div class="review-section">
          <h4>Account</h4>
          <p>Email: {{ wizardData.account.email }}</p>
        </div>
        <div class="review-section">
          <h4>Profile</h4>
          <p>Name: {{ wizardData.profile.firstName }} {{ wizardData.profile.lastName }}</p>
          <p>Phone: {{ wizardData.profile.phone }}</p>
        </div>
        <div class="review-section">
          <h4>Address</h4>
          <p>{{ wizardData.address.street }}</p>
          <p>{{ wizardData.address.city }}, {{ wizardData.address.state }} {{ wizardData.address.zip }}</p>
        </div>
      </div>
    </div>

    <div class="wizard-buttons">
      <button 
        @click="stepperRef.previousStep()"
        :disabled="currentStep === 0"
      >
        Previous
      </button>
      <button 
        v-if="currentStep < steps.length - 1"
        @click="stepperRef.nextStep()"
      >
        Next
      </button>
      <button 
        v-if="currentStep === steps.length - 1"
        @click="submitWizard"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<style scoped>
.wizard-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.step-content input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.review-section {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.review-section h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.review-section p {
  margin: 4px 0;
  color: #666;
}

.wizard-buttons {
  display: flex;
  gap: 10px;
}

.wizard-buttons button {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.wizard-buttons button:hover:not(:disabled) {
  background: #f0f0f0;
}

.wizard-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

## Conditional Step Flow

Branch the workflow based on user choices.

### Conditional Navigation Example

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const userType = ref('individual'); // 'individual' or 'business'
const steps = ref([
  { label: 'Account Type' },
  { label: 'Personal Info' },
  { label: 'Business Info', visible: true },
  { label: 'Review' }
]);

const accountData = ref({
  type: 'individual',
  personalName: '',
  businessName: ''
});

const visibleSteps = ref([
  { label: 'Account Type' },
  { label: 'Personal Info' },
  { label: 'Review' }
]);

const handleStepChanged = (args) => {
  if (args.activeStep === 0) {
    // Update visible steps based on account type
    if (accountData.value.type === 'business') {
      visibleSteps.value = [
        { label: 'Account Type' },
        { label: 'Business Info' },
        { label: 'Review' }
      ];
    } else {
      visibleSteps.value = [
        { label: 'Account Type' },
        { label: 'Personal Info' },
        { label: 'Review' }
      ];
    }
  }
};

const selectAccountType = (type) => {
  accountData.value.type = type;
  userType.value = type;
};
</script>

<template>
  <div>
    <ejs-stepper 
      ref="stepperRef"
      :steps="visibleSteps"
      @stepChanged="handleStepChanged"
    />

    <div class="conditional-content">
      <div v-if="userType === 'individual'">
        <h3>Personal Information</h3>
        <input 
          v-model="accountData.personalName"
          placeholder="Full Name"
        />
      </div>
      <div v-else>
        <h3>Business Information</h3>
        <input 
          v-model="accountData.businessName"
          placeholder="Business Name"
        />
      </div>
    </div>

    <div class="type-selector">
      <button 
        @click="selectAccountType('individual')"
        :class="{ active: userType === 'individual' }"
      >
        Individual
      </button>
      <button 
        @click="selectAccountType('business')"
        :class="{ active: userType === 'business' }"
      >
        Business
      </button>
    </div>
  </div>
</template>

<style scoped>
.type-selector {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.type-selector button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.type-selector button.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}
</style>
```

## Wizard with Side Effects

Handle async operations during wizard progression.

### Async Step Processing

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const isProcessing = ref(false);
const stepStatus = ref(['pending', 'pending', 'pending']);

const steps = ref([
  { label: 'Upload Documents' },
  { label: 'Processing' },
  { label: 'Verification' }
]);

const handleStepChanging = async (args) => {
  if (args.previousStep === 0) {
    // Process documents
    isProcessing.value = true;
    stepStatus.value[0] = 'processing';
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      stepStatus.value[0] = 'success';
    } catch (error) {
      stepStatus.value[0] = 'error';
      args.cancel = true;
      return;
    } finally {
      isProcessing.value = false;
    }
  }
};

const handleStepChanged = async (args) => {
  if (args.activeStep === 1) {
    // Start verification process
    isProcessing.value = true;
    stepStatus.value[1] = 'processing';
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      stepStatus.value[1] = 'success';
    } catch (error) {
      stepStatus.value[1] = 'error';
    } finally {
      isProcessing.value = false;
    }
  }
};
</script>

<template>
  <div>
    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      @stepChanging="handleStepChanging"
      @stepChanged="handleStepChanged"
    />

    <div v-if="isProcessing" class="processing">
      <p>Processing... Please wait</p>
      <div class="spinner"></div>
    </div>

    <div v-for="(status, index) in stepStatus" :key="index" class="status">
      <span>{{ steps[index].label }}: </span>
      <span :class="status">{{ status }}</span>
    </div>
  </div>
</template>

<style scoped>
.processing {
  text-align: center;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 4px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.status {
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
}

.status .processing {
  color: #ff9800;
}

.status .success {
  color: #4CAF50;
  font-weight: bold;
}

.status .error {
  color: #f44336;
}
</style>
```

## Progress Tracking

Display detailed progress information during wizard workflow.

```vue
<script setup>
import { ref, computed } from 'vue';

const stepperRef = ref(null);
const currentStep = ref(0);
const completedSteps = ref(new Set());

const steps = ref([
  { label: 'Step 1', description: 'Initial setup' },
  { label: 'Step 2', description: 'Configure settings' },
  { label: 'Step 3', description: 'Review changes' },
  { label: 'Step 4', description: 'Finalize' }
]);

const progressPercentage = computed(() => {
  return Math.round(((completedSteps.value.size + 1) / steps.value.length) * 100);
});

const handleStepChanged = (args) => {
  currentStep.value = args.activeStep;
  completedSteps.value.add(args.previousStep);
};

const getStepProgress = (index) => {
  if (completedSteps.value.has(index)) return 'completed';
  if (index === currentStep.value) return 'current';
  return 'pending';
};
</script>

<template>
  <div class="progress-wrapper">
    <div class="progress-bar">
      <div 
        :style="{ width: `${progressPercentage}%` }"
        class="progress-fill"
      ></div>
    </div>
    <div class="progress-text">{{ progressPercentage }}% Complete</div>

    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      @stepChanged="handleStepChanged"
    >
      <template v-slot:stepTemplate="{ data, index }">
        <div :class="['step-indicator', getStepProgress(index)]">
          <div class="step-number">{{ index + 1 }}</div>
          <div>
            <div class="step-label">{{ data.label }}</div>
            <div class="step-description">{{ data.description }}</div>
          </div>
        </div>
      </template>
    </ejs-stepper>
  </div>
</template>

<style scoped>
.progress-wrapper {
  padding: 20px;
}

.progress-bar {
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 4px;
}

.step-indicator.completed {
  background: #e8f5e9;
  color: #2e7d32;
}

.step-indicator.current {
  background: #e3f2fd;
  color: #1565c0;
}

.step-indicator.pending {
  background: #f5f5f5;
  color: #999;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.step-label {
  font-weight: 600;
  font-size: 14px;
}

.step-description {
  font-size: 12px;
  opacity: 0.8;
}
</style>
```

## State Management Patterns

Advanced state handling with Pinia or Composition API.

```vue
<script setup>
import { ref, computed } from 'vue';

// Local composition pattern
const useWizardState = () => {
  const currentStep = ref(0);
  const formData = ref({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const isStepValid = computed(() => {
    if (currentStep.value === 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (
        emailRegex.test(formData.value.email) &&
        formData.value.password.length >= 8
      );
    }
    return true;
  });

  const goToStep = (stepIndex) => {
    currentStep.value = stepIndex;
  };

  const nextStep = () => {
    if (isStepValid.value) {
      currentStep.value++;
    }
  };

  return {
    currentStep,
    formData,
    isStepValid,
    goToStep,
    nextStep
  };
};

const { currentStep, formData, isStepValid, goToStep, nextStep } = useWizardState();

const steps = ref([
  { label: 'Credentials' },
  { label: 'Confirmation' }
]);
</script>

<template>
  <div>
    <ejs-stepper :steps="steps" :activeStep="currentStep" />
    
    <input v
-model="formData.email" placeholder="Email" />
    <input v-model="formData.password" placeholder="Password" type="password" />
    
    <button @click="nextStep" :disabled="!isStepValid">
      Next
    </button>
  </div>
</template>
```

## Error Recovery

Handle errors and provide recovery paths.

```vue
<script setup>
import { ref } from 'vue';

const stepperRef = ref(null);
const errorMessage = ref('');
const retryCount = ref(0);
const maxRetries = ref(3);

const steps = ref([
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' }
]);

const handleStepChanged = async (args) => {
  try {
    errorMessage.value = '';
    
    // Simulate operation that might fail
    const random = Math.random();
    if (random < 0.3) {
      throw new Error('Operation failed');
    }
    
    retryCount.value = 0;
  } catch (error) {
    errorMessage.value = error.message;
    retryCount.value++;
    
    if (retryCount.value >= maxRetries.value) {
      alert('Maximum retries reached');
      stepperRef.value.previousStep();
    }
  }
};

const retry = () => {
  if (stepperRef.value) {
    // Reset to previous step for retry
    stepperRef.value.previousStep();
  }
};

const skipStep = () => {
  errorMessage.value = '';
  retryCount.value = 0;
  if (stepperRef.value) {
    stepperRef.value.nextStep();
  }
};
</script>

<template>
  <div>
    <ejs-stepper 
      ref="stepperRef"
      :steps="steps"
      @stepChanged="handleStepChanged"
    />

    <div v-if="errorMessage" class="error-container">
      <p class="error-message">{{ errorMessage }}</p>
      <p class="retry-info">Retry attempt: {{ retryCount }} / {{ maxRetries }}</p>
      <div class="error-actions">
        <button @click="retry" :disabled="retryCount >= maxRetries">
          Retry
        </button>
        <button @click="skipStep">Skip</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-container {
  padding: 16px;
  background: #ffebee;
  border: 1px solid #ef5350;
  border-radius: 4px;
  margin-top: 16px;
}

.error-message {
  color: #c62828;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.retry-info {
  color: #d32f2f;
  margin: 0 0 12px 0;
  font-size: 14px;
}

.error-actions {
  display: flex;
  gap: 10px;
}

.error-actions button {
  padding: 8px 16px;
  border: 1px solid #ef5350;
  background: white;
  color: #c62828;
  border-radius: 4px;
  cursor: pointer;
}

.error-actions button:hover:not(:disabled) {
  background: #ffebee;
}

.error-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

## Best Practices

**Wizard Design:**
- ✅ Keep steps focused and manageable
- ✅ Provide clear validation feedback
- ✅ Allow users to review before submission
- ✅ Save form progress when possible

**Performance:**
- ✅ Lazy load content for later steps
- ✅ Debounce validation checks
- ✅ Use computed properties for derived state
- ✅ Optimize re-renders

**User Experience:**
- ✅ Show progress clearly
- ✅ Provide help text for each step
- ✅ Allow going back to correct mistakes
- ✅ Handle errors gracefully with recovery options

**Accessibility:**
- ✅ Use semantic step labels
- ✅ Provide keyboard navigation
- ✅ Announce step changes
- ✅ Include ARIA attributes


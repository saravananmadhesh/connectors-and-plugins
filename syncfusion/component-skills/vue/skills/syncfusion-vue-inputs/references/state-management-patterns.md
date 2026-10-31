# State Management Patterns - Vue 3 Inputs

Comprehensive patterns for managing complex input component state in Vue 3 Composition API.

---

## 1. Simple Form State

### Basic Setup
```vue
<script setup>
import { ref } from 'vue';

const formData = ref({
  firstName: '',
  lastName: '',
  email: ''
});

const handleSubmit = () => {
  console.log('Form data:', formData.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <TextBoxComponent v-model="formData.firstName" placeholder="First Name" />
    <TextBoxComponent v-model="formData.lastName" placeholder="Last Name" />
    <TextBoxComponent v-model="formData.email" type="email" placeholder="Email" />
    <button type="submit">Submit</button>
  </form>
</template>
```

---

## 2. Form State with Validation

### Reactive Validation State
```vue
<script setup>
import { ref, reactive, computed } from 'vue';

const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive({
  email: '',
  password: '',
  confirmPassword: ''
});

const validationRules = {
  email: [
    (value) => !value ? 'Email is required' : '',
    (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : ''
  ],
  password: [
    (value) => !value ? 'Password is required' : '',
    (value) => value.length < 8 ? 'Password must be at least 8 characters' : '',
    (value) => !/[A-Z]/.test(value) ? 'Must contain uppercase letter' : '',
    (value) => !/[0-9]/.test(value) ? 'Must contain digit' : ''
  ],
  confirmPassword: [
    (value) => !value ? 'Confirm password is required' : '',
    (value) => value !== form.value.password ? 'Passwords do not match' : ''
  ]
};

const validateField = (fieldName) => {
  const value = form.value[fieldName];
  const rules = validationRules[fieldName];
  
  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      errors[fieldName] = error;
      return false;
    }
  }
  
  errors[fieldName] = '';
  return true;
};

const isFormValid = computed(() => {
  return Object.keys(validationRules).every(fieldName => 
    validateField(fieldName)
  );
});

const handleBlur = (fieldName) => {
  validateField(fieldName);
};
</script>

<template>
  <form @submit.prevent="$emit('submit', form)">
    <div class="form-group">
      <TextBoxComponent
        v-model="form.email"
        type="email"
        placeholder="Email"
        @blur="() => handleBlur('email')"
      />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>

    <div class="form-group">
      <TextBoxComponent
        v-model="form.password"
        type="password"
        placeholder="Password"
        @blur="() => handleBlur('password')"
      />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>

    <div class="form-group">
      <TextBoxComponent
        v-model="form.confirmPassword"
        type="password"
        placeholder="Confirm Password"
        @blur="() => handleBlur('confirmPassword')"
      />
      <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
    </div>

    <button type="submit" :disabled="!isFormValid">Sign Up</button>
  </form>
</template>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.error {
  color: #dc3545;
  font-size: 0.85rem;
  display: block;
  margin-top: 5px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

---

## 3. Dynamic Form with Add/Remove Fields

### Adding/Removing Input Groups
```vue
<script setup>
import { ref } from 'vue';
import { nanoid } from 'nanoid';

const formItems = ref([
  { id: nanoid(), skill: '', level: 'Beginner' }
]);

const addSkill = () => {
  formItems.value.push({
    id: nanoid(),
    skill: '',
    level: 'Beginner'
  });
};

const removeSkill = (id) => {
  const index = formItems.value.findIndex(item => item.id === id);
  if (index > -1) {
    formItems.value.splice(index, 1);
  }
};

const handleSubmit = () => {
  console.log('Skills:', formItems.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="item in formItems" :key="item.id" class="skill-row">
      <TextBoxComponent
        v-model="item.skill"
        placeholder="Skill name"
      />

      <SelectComponent
        v-model="item.level"
        :dataSource="['Beginner', 'Intermediate', 'Expert']"
      />

      <button type="button" @click="removeSkill(item.id)" class="delete-btn">
        Remove
      </button>
    </div>

    <button type="button" @click="addSkill" class="add-btn">
      Add Skill
    </button>

    <button type="submit" class="submit-btn">Submit</button>
  </form>
</template>

<style scoped>
.skill-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.delete-btn {
  padding: 8px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

---

## 4. State Persistence

### Saving and Loading State
```vue
<script setup>
import { ref, watch } from 'vue';

const STORAGE_KEY = 'form_data';

const formData = ref({
  name: '',
  email: '',
  message: ''
});

// Load from localStorage on mount
const loadState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      formData.value = JSON.parse(stored);
    } catch (e) {
      console.error('Error loading saved data:', e);
    }
  }
};

// Watch for changes and save
watch(formData, (newValue) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
}, { deep: true });

// Clear saved data
const clearSavedData = () => {
  localStorage.removeItem(STORAGE_KEY);
  formData.value = { name: '', email: '', message: '' };
};

// Call on mount
loadState();
</script>

<template>
  <form>
    <TextBoxComponent v-model="formData.name" placeholder="Name" />
    <TextBoxComponent v-model="formData.email" type="email" placeholder="Email" />
    <TextAreaComponent v-model="formData.message" placeholder="Message" />

    <div class="actions">
      <button type="button" @click="clearSavedData">Clear Saved Data</button>
      <p class="info">Your data is automatically saved to your browser</p>
    </div>
  </form>
</template>

<style scoped>
.actions {
  margin-top: 20px;
}

.info {
  font-size: 0.85rem;
  color: #666;
  margin-top: 10px;
}
</style>
```

---

## 5. Dependent Fields State

### Cascading Input Values
```vue
<script setup>
import { ref, computed, watch } from 'vue';

const country = ref('');
const state = ref('');
const city = ref('');

const states = {
  'USA': ['California', 'Texas', 'Florida', 'New York'],
  'Canada': ['Ontario', 'Quebec', 'British Columbia'],
  'Mexico': ['Mexico City', 'Jalisco', 'Veracruz']
};

const cities = {
  'California': ['Los Angeles', 'San Francisco', 'San Diego'],
  'Texas': ['Houston', 'Dallas', 'Austin'],
  'Ontario': ['Toronto', 'Ottawa', 'Mississauga'],
  'Quebec': ['Montreal', 'Quebec City', 'Gatineau']
};

const availableStates = computed(() => {
  return states[country.value] || [];
});

const availableCities = computed(() => {
  return cities[state.value] || [];
});

// Reset dependent fields when parent changes
watch(country, () => {
  state.value = '';
  city.value = '';
});

watch(state, () => {
  city.value = '';
});
</script>

<template>
  <div class="cascade-form">
    <SelectComponent
      v-model="country"
      :dataSource="Object.keys(states)"
      placeholder="Select Country"
    />

    <SelectComponent
      v-model="state"
      :dataSource="availableStates"
      placeholder="Select State"
      :disabled="!country"
    />

    <SelectComponent
      v-model="city"
      :dataSource="availableCities"
      placeholder="Select City"
      :disabled="!state"
    />

    <div class="result">
      <p>Country: {{ country }}</p>
      <p>State: {{ state }}</p>
      <p>City: {{ city }}</p>
    </div>
  </div>
</template>

<style scoped>
.cascade-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
}

.result {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.result p {
  margin: 5px 0;
}
</style>
```

---

## 6. Multi-Step Form State

### Complex Multi-Step Process
```vue
<script setup>
import { ref, computed } from 'vue';

const currentStep = ref(0);
const steps = ref([
  { title: 'Personal Info', completed: false },
  { title: 'Contact', completed: false },
  { title: 'Address', completed: false },
  { title: 'Review', completed: false }
]);

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: ''
});

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return formData.value.firstName && formData.value.lastName;
  }
  if (currentStep.value === 1) {
    return formData.value.email && formData.value.phone;
  }
  if (currentStep.value === 2) {
    return formData.value.address && formData.value.city;
  }
  return true;
});

const nextStep = () => {
  if (canProceed.value && currentStep.value < steps.value.length - 1) {
    steps.value[currentStep.value].completed = true;
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const submit = () => {
  console.log('Form completed:', formData.value);
};
</script>

<template>
  <div class="multi-step-form">
    <!-- Progress -->
    <div class="progress-bar">
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="['progress-item', { active: index === currentStep, completed: step.completed }]"
      >
        {{ step.title }}
      </div>
    </div>

    <!-- Step 0: Personal Info -->
    <div v-if="currentStep === 0" class="step">
      <h3>Personal Information</h3>
      <TextBoxComponent v-model="formData.firstName" placeholder="First Name" />
      <TextBoxComponent v-model="formData.lastName" placeholder="Last Name" />
    </div>

    <!-- Step 1: Contact -->
    <div v-if="currentStep === 1" class="step">
      <h3>Contact Information</h3>
      <TextBoxComponent v-model="formData.email" type="email" placeholder="Email" />
      <TextBoxComponent v-model="formData.phone" placeholder="Phone" />
    </div>

    <!-- Step 2: Address -->
    <div v-if="currentStep === 2" class="step">
      <h3>Address</h3>
      <TextBoxComponent v-model="formData.address" placeholder="Street Address" />
      <TextBoxComponent v-model="formData.city" placeholder="City" />
    </div>

    <!-- Step 3: Review -->
    <div v-if="currentStep === 3" class="step">
      <h3>Review Your Information</h3>
      <div class="review">
        <p><strong>Name:</strong> {{ formData.firstName }} {{ formData.lastName }}</p>
        <p><strong>Email:</strong> {{ formData.email }}</p>
        <p><strong>Phone:</strong> {{ formData.phone }}</p>
        <p><strong>Address:</strong> {{ formData.address }}, {{ formData.city }}</p>
      </div>
    </div>

    <!-- Navigation -->
    <div class="navigation">
      <button @click="prevStep" :disabled="currentStep === 0">Previous</button>
      <button
        v-if="currentStep < steps.length - 1"
        @click="nextStep"
        :disabled="!canProceed"
      >
        Next
      </button>
      <button v-else @click="submit" class="submit-btn">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.multi-step-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.progress-bar {
  display: flex;
  margin-bottom: 30px;
}

.progress-item {
  flex: 1;
  padding: 10px;
  text-align: center;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  color: #999;
}

.progress-item.active {
  border-color: #007bff;
  color: #007bff;
  background-color: #e7f3ff;
}

.progress-item.completed {
  border-color: #28a745;
  color: #28a745;
  background-color: #d4edda;
}

.step {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.review {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.navigation {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn {
  background-color: #28a745;
}
</style>
```


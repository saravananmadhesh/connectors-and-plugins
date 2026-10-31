# Accessibility Guide - Vue 3 Syncfusion Inputs

Comprehensive accessibility patterns for Syncfusion input components using Vue 3.

---

## 1. Basic Accessibility Setup

### ARIA Attributes
```vue
<template>
  <!-- Labeled input -->
  <label for="email-input">Email Address</label>
  <TextBoxComponent
    id="email-input"
    v-model="email"
    type="email"
    placeholder="enter@example.com"
    aria-label="Email Address"
    aria-describedby="email-help"
  />
  <p id="email-help" class="help-text">We'll never share your email</p>

  <!-- Required field -->
  <TextBoxComponent
    v-model="name"
    placeholder="Name"
    :required="true"
    aria-required="true"
    aria-label="Your name (required)"
  />

  <!-- Invalid input -->
  <TextBoxComponent
    v-model="password"
    type="password"
    :aria-invalid="passwordError ? 'true' : 'false'"
    aria-describedby="password-error"
  />
  <p v-if="passwordError" id="password-error" class="error-text">
    {{ passwordError }}
  </p>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const name = ref('');
const password = ref('');
const passwordError = ref('');
</script>

<style scoped>
.help-text {
  font-size: 0.85rem;
  color: #666;
  margin-top: 5px;
}

.error-text {
  color: #dc3545;
  font-size: 0.85rem;
}
</style>
```

---

## 2. Keyboard Navigation

### Proper Tab Order and Focus Management
```vue
<template>
  <form @keydown.escape="resetForm">
    <!-- First Name - Focus First -->
    <div class="form-group">
      <label for="first-name">First Name</label>
      <TextBoxComponent
        ref="firstNameInput"
        id="first-name"
        v-model="firstName"
        placeholder="First Name"
        @keydown.tab="focusNext"
      />
    </div>

    <!-- Last Name -->
    <div class="form-group">
      <label for="last-name">Last Name</label>
      <TextBoxComponent
        ref="lastNameInput"
        id="last-name"
        v-model="lastName"
        placeholder="Last Name"
        @keydown.shift.tab="focusPrev"
        @keydown.tab="focusNext"
      />
    </div>

    <!-- Checkbox -->
    <div class="form-group">
      <CheckBoxComponent
        id="terms"
        v-model="agreeToTerms"
        label="I agree to the terms"
      />
    </div>

    <!-- Submit Button - Last in Tab Order -->
    <button
      type="submit"
      @keydown.enter="submitForm"
      @keydown.space="submitForm"
    >
      Submit (Enter or Space)
    </button>

    <!-- Skip Link (for screen reader users) -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const agreeToTerms = ref(false);

const firstNameInput = ref(null);
const lastNameInput = ref(null);

const focusNext = () => {
  lastNameInput.value.$el.focus();
};

const focusPrev = () => {
  firstNameInput.value.$el.focus();
};

const resetForm = () => {
  firstName.value = '';
  lastName.value = '';
  agreeToTerms.value = false;
  firstNameInput.value.$el.focus();
};

const submitForm = () => {
  console.log('Form submitted');
};
</script>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}
</style>
```

---

## 3. Screen Reader Support

### Descriptive Labels and Live Regions
```vue
<template>
  <div class="search-component">
    <!-- Search Input with Label -->
    <label for="search-input" class="visually-hidden">
      Search for products
    </label>
    <TextBoxComponent
      id="search-input"
      v-model="searchQuery"
      placeholder="Search products"
      type="search"
      aria-label="Search for products"
      aria-describedby="search-instructions"
      @input="performSearch"
    />
    <p id="search-instructions" class="visually-hidden">
      Type at least 3 characters to see search results
    </p>

    <!-- Live Region for Results -->
    <div
      v-if="searchPerformed"
      role="region"
      aria-live="polite"
      aria-label="Search results"
    >
      <p v-if="noResults" class="no-results">
        No products found matching "{{ searchQuery }}"
      </p>
      <ul v-else class="results-list">
        <li v-for="result in results" :key="result.id">
          <a :href="result.url">{{ result.name }}</a>
        </li>
      </ul>
    </div>

    <!-- Loading Indicator -->
    <div
      v-if="isSearching"
      role="status"
      aria-live="polite"
      class="loading"
    >
      Searching...
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const results = ref([]);
const isSearching = ref(false);
const searchPerformed = ref(false);

const noResults = computed(() => searchPerformed.value && results.value.length === 0);

const performSearch = async () => {
  if (searchQuery.value.length < 3) {
    searchPerformed.value = false;
    return;
  }

  isSearching.value = true;
  searchPerformed.value = true;

  try {
    const response = await fetch(`/api/search?q=${searchQuery.value}`);
    results.value = await response.json();
  } catch (error) {
    console.error('Search error:', error);
    results.value = [];
  } finally {
    isSearching.value = false;
  }
};
</script>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.results-list {
  list-style: none;
  padding: 0;
  margin-top: 15px;
}

.results-list li {
  margin-bottom: 10px;
}

.results-list a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.results-list a:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.no-results {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  color: #666;
}

.loading {
  padding: 15px;
  color: #666;
  font-style: italic;
}
</style>
```

---

## 4. Color Contrast and Visual Indicators

### High Contrast Mode Support
```vue
<template>
  <div class="form-with-indicators">
    <!-- Error State with Multiple Indicators -->
    <div class="form-group">
      <label for="email">Email</label>
      <TextBoxComponent
        id="email"
        v-model="email"
        type="email"
        :aria-invalid="hasEmailError ? 'true' : 'false'"
        @blur="validateEmail"
      />
      <!-- Visual indicator (icon + text) -->
      <div v-if="hasEmailError" class="error-indicator">
        <span aria-hidden="true" class="error-icon">✗</span>
        <span>Invalid email format</span>
      </div>
      <!-- Success indicator -->
      <div v-else-if="email" class="success-indicator">
        <span aria-hidden="true" class="success-icon">✓</span>
        <span>Email valid</span>
      </div>
    </div>

    <!-- Warning State -->
    <div class="form-group">
      <label for="password">Password</label>
      <TextBoxComponent
        id="password"
        v-model="password"
        type="password"
        :aria-describedby="passwordWarning ? 'password-warning' : undefined"
      />
      <div v-if="passwordWarning" id="password-warning" class="warning-indicator">
        <span aria-hidden="true" class="warning-icon">⚠</span>
        <span>Weak password</span>
      </div>
    </div>

    <!-- Disabled State -->
    <TextBoxComponent
      v-model="disabledField"
      disabled
      placeholder="This field is disabled"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const email = ref('');
const password = ref('');
const disabledField = ref('');

const hasEmailError = ref(false);
const passwordWarning = computed(() => password.value.length < 8 && password.value.length > 0);

const validateEmail = () => {
  hasEmailError.value = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) && email.value.length > 0;
};
</script>

<style scoped>
.form-with-indicators {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.error-indicator {
  margin-top: 5px;
  padding: 8px;
  background-color: #f8d7da;
  color: #721c24;
  border: 2px solid #f5c6cb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.success-indicator {
  margin-top: 5px;
  padding: 8px;
  background-color: #d4edda;
  color: #155724;
  border: 2px solid #c3e6cb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.warning-indicator {
  margin-top: 5px;
  padding: 8px;
  background-color: #fff3cd;
  color: #856404;
  border: 2px solid #ffeeba;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-icon {
  font-weight: bold;
}

.success-icon {
  font-weight: bold;
}

.warning-icon {
  font-weight: bold;
}
</style>
```

---

## 5. Form Validation Feedback

### Accessible Error Messages
```vue
<template>
  <form @submit.prevent="submitForm" novalidate>
    <!-- Input with Error -->
    <div class="form-group">
      <label for="username">Username</label>
      <TextBoxComponent
        id="username"
        v-model="username"
        :aria-invalid="usernameErrors.length > 0"
        aria-describedby="username-errors"
        @blur="validateUsername"
      />
      <div
        v-if="usernameErrors.length > 0"
        id="username-errors"
        role="alert"
      >
        <ul class="error-list">
          <li v-for="(error, index) in usernameErrors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Multiple Error Messages -->
    <div class="form-group">
      <label for="password">Password</label>
      <TextBoxComponent
        id="password"
        v-model="password"
        type="password"
        :aria-invalid="passwordErrors.length > 0"
        aria-describedby="password-errors password-requirements"
        @input="validatePassword"
      />
      <div id="password-requirements" class="requirements">
        <p>Password must:</p>
        <ul>
          <li :class="{ met: hasUpperCase }">Contain uppercase letter</li>
          <li :class="{ met: hasLowerCase }">Contain lowercase letter</li>
          <li :class="{ met: hasNumber }">Contain number</li>
          <li :class="{ met: hasMinLength }">Be at least 8 characters</li>
        </ul>
      </div>
      <div
        v-if="passwordErrors.length > 0"
        id="password-errors"
        role="alert"
      >
        <p class="error-message">{{ passwordErrors[0] }}</p>
      </div>
    </div>

    <!-- Submit -->
    <button type="submit" :disabled="hasErrors">Submit</button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';

const username = ref('');
const password = ref('');
const usernameErrors = ref([]);
const passwordErrors = ref([]);

const hasUpperCase = computed(() => /[A-Z]/.test(password.value));
const hasLowerCase = computed(() => /[a-z]/.test(password.value));
const hasNumber = computed(() => /[0-9]/.test(password.value));
const hasMinLength = computed(() => password.value.length >= 8);

const hasErrors = computed(() => usernameErrors.value.length > 0 || passwordErrors.value.length > 0);

const validateUsername = () => {
  usernameErrors.value = [];
  
  if (!username.value) {
    usernameErrors.value.push('Username is required');
  } else if (username.value.length < 3) {
    usernameErrors.value.push('Username must be at least 3 characters');
  } else if (!/^[a-zA-Z0-9_-]+$/.test(username.value)) {
    usernameErrors.value.push('Username can only contain letters, numbers, underscores, and hyphens');
  }
};

const validatePassword = () => {
  passwordErrors.value = [];
  
  if (!password.value) {
    passwordErrors.value.push('Password is required');
  } else if (!hasMinLength.value) {
    passwordErrors.value.push('Password must be at least 8 characters');
  } else if (!hasUpperCase.value) {
    passwordErrors.value.push('Password must contain uppercase letter');
  } else if (!hasLowerCase.value) {
    passwordErrors.value.push('Password must contain lowercase letter');
  } else if (!hasNumber.value) {
    passwordErrors.value.push('Password must contain number');
  }
};

const submitForm = () => {
  validateUsername();
  validatePassword();

  if (!hasErrors.value) {
    console.log('Form submitted:', { username: username.value, password: password.value });
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.error-list {
  list-style: none;
  padding: 12px;
  margin: 8px 0 0 0;
  background-color: #f8d7da;
  color: #721c24;
  border: 2px solid #f5c6cb;
  border-radius: 4px;
}

.error-list li {
  padding: 4px 0;
}

.error-list li:before {
  content: '✗ ';
  font-weight: bold;
  margin-right: 5px;
}

.requirements {
  margin-top: 8px;
  padding: 12px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.requirements p {
  margin: 0 0 8px 0;
  font-weight: 600;
}

.requirements ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.requirements li {
  padding: 4px 0;
  color: #999;
}

.requirements li.met {
  color: #28a745;
  font-weight: 600;
}

.requirements li.met:before {
  content: '✓ ';
  font-weight: bold;
}

.requirements li:not(.met):before {
  content: '○ ';
  margin-right: 4px;
}

.error-message {
  margin: 8px 0 0 0;
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border: 2px solid #f5c6cb;
  border-radius: 4px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

---

## Accessibility Checklist

- ✅ All inputs have associated `<label>` elements or `aria-label`
- ✅ Use `aria-describedby` for additional help text
- ✅ Use `aria-invalid` for error states
- ✅ Provide `aria-live` regions for dynamic content
- ✅ Ensure proper color contrast ratios (4.5:1 for text)
- ✅ Include multiple visual indicators (not just color)
- ✅ Use `role="alert"` for error messages
- ✅ Support keyboard navigation (Tab, Enter, Escape)
- ✅ Avoid relying on color alone to convey information
- ✅ Provide sufficient white space and clear visual hierarchy
- ✅ Test with screen readers (NVDA, JAWS, VoiceOver)
- ✅ Validate proper heading hierarchy
- ✅ Ensure form fields are focusable and visible when focused


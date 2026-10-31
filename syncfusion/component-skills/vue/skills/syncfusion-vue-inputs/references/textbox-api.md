# TextBox API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | string | '' | The text value of the input |
| `placeholder` | string | - | Placeholder text |
| `readonly` | boolean | false | Make input read-only |
| `disabled` | boolean | false | Disable the input |
| `type` | string | 'text' | Input type (text, email, password, url, tel, search, date, time, etc.) |
| `maxLength` | number | - | Maximum character length |
| `minLength` | number | - | Minimum character length |
| `pattern` | string | - | Regex pattern for validation |
| `required` | boolean | false | Mark as required field |
| `floatLabelType` | string | 'Never' | Float label behavior: 'Never', 'Always', 'Auto' |
| `floatLabelPlacement` | string | 'Auto' | Float label placement: 'Auto' or 'Outside' |
| `cssClass` | string | - | Custom CSS class for styling |
| `htmlAttributes` | object | - | HTML attributes for the input |
| `showClearButton` | boolean | false | Show clear button |
| `enabled` | boolean | true | Enable or disable the component |
| `multiline` | boolean | false | Enable multiline text (use TextArea for better support) |
| `enableRtl` | boolean | false | Enable RTL mode |
| `locale` | string | 'en-US' | Localization language |

---

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `focus()` | - | void | Set focus on input |
| `blur()` | - | void | Remove focus from input |
| `select()` | - | void | Select all text |
| `setSelectionRange(start, end)` | number, number | void | Select text range |
| `getValue()` | - | string | Get current value |
| `setValue(value)` | string | void | Set value |
| `enable()` | - | void | Enable the component |
| `disable()` | - | void | Disable the component |
| `addValidator(rule)` | object | void | Add validation rule |
| `removeValidator()` | - | void | Remove validation rules |
| `destroy()` | - | void | Destroy component |

---

## Events

### Text Input Events

```typescript
// Value changed
onChange = (args: ChangeEventArgs) => {
  console.log(args.value);          // New text value
  console.log(args.previousValue);  // Previous value
};

// Input event (while typing)
onInput = (args: InputEventArgs) => {
  console.log(args.value);  // Current text
};

// Focus event
onFocus = (args: FocusEventArgs) => {
  console.log('TextBox focused');
};

// Blur event
onBlur = (args: BlurEventArgs) => {
  console.log('TextBox blurred');
};
```

### Action Events

```typescript
// Key down
onKeyDown = (args: KeyEventArgs) => {
  console.log(args.keyCode);  // Key code
  console.log(args.key);      // Key character
};

// Key up
onKeyUp = (args: KeyEventArgs) => {
  console.log(args.key);
};

// Key press
onKeyPress = (args: KeyEventArgs) => {
  console.log(args.key);
};

// Clear button clicked
onClear = () => {
  console.log('Clear button clicked');
};
```

---

## Vue 3 Template Binding

```vue
<template>
  <div class="textbox-demo">
    <!-- Basic TextBox -->
    <TextBoxComponent
      v-model="username"
      placeholder="Enter username"
      @change="onChange"
      @input="onInput"
    />

    <!-- TextBox with validation -->
    <TextBoxComponent
      v-model="email"
      type="email"
      placeholder="Enter email"
      :required="true"
      @blur="onBlur"
    />

    <!-- ReadOnly TextBox -->
    <TextBoxComponent
      v-model="displayText"
      placeholder="Display text"
      :readonly="true"
    />

    <!-- Display values -->
    <p>Username: {{ username }}</p>
    <p>Email: {{ email }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const username = ref('');
const email = ref('');
const displayText = ref('Read-only text');

const onChange = (args) => {
  console.log(`Value changed: ${args.value}`);
};

const onInput = (args) => {
  console.log(`Input: ${args.value}`);
};

const onBlur = (args) => {
  console.log(`Blurred: ${args.value}`);
};
</script>
```

---

## Input Type Specifications

```typescript
// Text types
type: 'text'      // Standard text
type: 'email'     // Email validation
type: 'password'  // Masked password
type: 'url'       // URL validation
type: 'tel'       // Telephone number
type: 'search'    // Search input
type: 'number'    // Numeric input

// Date/Time types
type: 'date'      // Date picker
type: 'time'      // Time picker
type: 'datetime-local'  // DateTime picker
type: 'month'     // Month picker
type: 'week'      // Week picker

// Color type
type: 'color'     // Color picker
```

---

## Validation Rules

```typescript
// Required validation
{
  required: true,
  message: 'This field is required'
}

// Min/Max length
{
  minLength: 3,
  message: 'Minimum 3 characters required'
}

{
  maxLength: 20,
  message: 'Maximum 20 characters allowed'
}

// Pattern validation
{
  pattern: /^[a-zA-Z0-9]+$/,
  message: 'Only alphanumeric characters allowed'
}

// Email validation
{
  type: 'email',
  message: 'Invalid email format'
}

// URL validation
{
  type: 'url',
  message: 'Invalid URL format'
}

// Custom validation
{
  validator: (value) => value.startsWith('user_'),
  message: 'Username must start with "user_"'
}
```

---

## Complete API Example

```vue
<template>
  <div class="form-container">
    <!-- Username Field -->
    <div class="form-group">
      <label for="username">Username:</label>
      <TextBoxComponent
        id="username"
        v-model="form.username"
        placeholder="Enter username (min 3 characters)"
        :maxLength="20"
        @blur="validateUsername"
        @input="checkUsernameAvailability"
      />
      <span v-if="usernameError" class="error">{{ usernameError }}</span>
      <span v-if="usernameAvailable" class="success">Username available!</span>
    </div>

    <!-- Email Field -->
    <div class="form-group">
      <label for="email">Email:</label>
      <TextBoxComponent
        id="email"
        v-model="form.email"
        type="email"
        placeholder="Enter email address"
        :required="true"
        @blur="validateEmail"
      />
      <span v-if="emailError" class="error">{{ emailError }}</span>
    </div>

    <!-- Password Field -->
    <div class="form-group">
      <label for="password">Password:</label>
      <TextBoxComponent
        id="password"
        v-model="form.password"
        type="password"
        placeholder="Enter password"
        :required="true"
        @blur="validatePassword"
      />
      <span v-if="passwordError" class="error">{{ passwordError }}</span>
    </div>

    <!-- URL Field -->
    <div class="form-group">
      <label for="website">Website:</label>
      <TextBoxComponent
        id="website"
        v-model="form.website"
        type="url"
        placeholder="Enter website URL (optional)"
        @blur="validateUrl"
      />
      <span v-if="urlError" class="error">{{ urlError }}</span>
    </div>

    <!-- Bio (Multiline) -->
    <div class="form-group">
      <label for="bio">Bio:</label>
      <TextBoxComponent
        id="bio"
        v-model="form.bio"
        placeholder="Enter your bio (max 200 characters)"
        :maxLength="200"
        :multiline="true"
      />
      <span class="char-count">{{ form.bio.length }}/200</span>
    </div>

    <!-- Submit Button -->
    <button @click="submitForm" :disabled="!isFormValid">
      Submit
    </button>

    <!-- Display Data -->
    <div v-if="submitted" class="success-message">
      <h3>Form submitted successfully!</h3>
      <pre>{{ JSON.stringify(form, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const form = ref({
  username: '',
  email: '',
  password: '',
  website: '',
  bio: ''
});

const usernameError = ref('');
const usernameAvailable = ref(false);
const emailError = ref('');
const passwordError = ref('');
const urlError = ref('');
const submitted = ref(false);

const isFormValid = computed(() => {
  return form.value.username && 
         form.value.email && 
         form.value.password && 
         !usernameError.value && 
         !emailError.value && 
         !passwordError.value &&
         !urlError.value;
});

const validateUsername = () => {
  if (form.value.username.length < 3) {
    usernameError.value = 'Username must be at least 3 characters';
    usernameAvailable.value = false;
  } else if (form.value.username.length > 20) {
    usernameError.value = 'Username must be less than 20 characters';
    usernameAvailable.value = false;
  } else {
    usernameError.value = '';
  }
};

const checkUsernameAvailability = () => {
  // Simulate API call
  if (form.value.username.length >= 3) {
    usernameAvailable.value = Math.random() > 0.5;
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email) {
    emailError.value = 'Email is required';
  } else if (!emailRegex.test(form.value.email)) {
    emailError.value = 'Invalid email format';
  } else {
    emailError.value = '';
  }
};

const validatePassword = () => {
  if (form.value.password.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
  } else if (form.value.password.length > 50) {
    passwordError.value = 'Password must be less than 50 characters';
  } else {
    passwordError.value = '';
  }
};

const validateUrl = () => {
  if (form.value.website) {
    try {
      new URL(form.value.website);
      urlError.value = '';
    } catch {
      urlError.value = 'Invalid URL format';
    }
  } else {
    urlError.value = '';
  }
};

const submitForm = () => {
  if (isFormValid.value) {
    submitted.value = true;
    console.log('Form submitted:', form.value);
  }
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
}

.error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
}

.success {
  color: #28a745;
  font-size: 0.875rem;
  margin-top: 5px;
}

.char-count {
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 5px;
}

button {
  padding: 10px 20px;
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

button:hover:not(:disabled) {
  background-color: #0056b3;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}
</style>
```


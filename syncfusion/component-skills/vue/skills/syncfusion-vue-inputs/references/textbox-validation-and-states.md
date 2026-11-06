# Validation and States — Syncfusion Vue TextBox

## Table of Contents
- [Input Validation](#input-validation)
- [Form States](#form-states)
- [Disabled and Read-Only](#disabled-and-read-only)
- [Examples](#examples)

---

## Input Validation

Validate textbox input:

```vue
<template>
  <div class="validation-demo">
    <div class="form-group">
      <label for="email-val">Email Validation:</label>
      <ejs-textbox
        id="email-val"
        v-model="email"
        type="email"
        @blur="validateEmail"
        :class="{ 'has-error': emailError, 'has-success': emailValid }"
        placeholder="Enter email">
      </ejs-textbox>
      <p v-if="emailError" class="error-text">{{ emailError }}</p>
      <p v-if="emailValid" class="success-text">✓ Valid email</p>
    </div>

    <div class="form-group">
      <label for="min-length">Min Length (5 characters):</label>
      <ejs-textbox
        id="min-length"
        v-model="minText"
        @input="validateMinLength"
        :class="{ 'has-error': minLengthError }"
        placeholder="Type at least 5 chars">
      </ejs-textbox>
      <p v-if="minLengthError" class="error-text">{{ minLengthError }}</p>
    </div>

    <div class="form-group">
      <label for="max-length">Max Length (10 characters):</label>
      <ejs-textbox
        id="max-length"
        v-model="maxText"
        maxlength="10"
        placeholder="Max 10 chars">
      </ejs-textbox>
      <p class="info-text">{{ maxText.length }}/10</p>
    </div>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  data() {
    return {
      email: '',
      emailError: '',
      emailValid: false,
      minText: '',
      minLengthError: '',
      maxText: ''
    }
  },
  methods: {
    validateEmail() {
      this.emailError = '';
      this.emailValid = false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!this.email) {
        this.emailError = 'Email is required';
      } else if (!emailRegex.test(this.email)) {
        this.emailError = 'Invalid email format';
      } else {
        this.emailValid = true;
      }
    },
    validateMinLength() {
      this.minLengthError = '';
      if (this.minText.length < 5 && this.minText.length > 0) {
        this.minLengthError = `Minimum 5 characters required (${this.minText.length}/5)`;
      }
    }
  }
}
</script>

<style scoped>
.validation-demo {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

:deep(.e-textbox.has-error) {
  border-color: #dc3545 !important;
}

:deep(.e-textbox.has-success) {
  border-color: #28a745 !important;
}

.error-text {
  margin-top: 5px;
  font-size: 12px;
  color: #dc3545;
}

.success-text {
  margin-top: 5px;
  font-size: 12px;
  color: #28a745;
}

.info-text {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Form States

Different form states:

```vue
<template>
  <div class="form-states">
    <fieldset>
      <legend>Textbox States</legend>

      <div class="state">
        <label for="normal">Normal State:</label>
        <ejs-textbox
          id="normal"
          placeholder="Normal textbox">
        </ejs-textbox>
      </div>

      <div class="state">
        <label for="focused">Focused State:</label>
        <ejs-textbox
          id="focused"
          autofocus
          placeholder="Auto-focused">
        </ejs-textbox>
      </div>

      <div class="state">
        <label for="filled">Filled State:</label>
        <ejs-textbox
          id="filled"
          value="Filled with content"
          placeholder="Filled textbox">
        </ejs-textbox>
      </div>

      <div class="state">
        <label for="success">Success State:</label>
        <ejs-textbox
          id="success"
          css-class="has-success"
          placeholder="Valid input">
        </ejs-textbox>
      </div>

      <div class="state">
        <label for="error">Error State:</label>
        <ejs-textbox
          id="error"
          css-class="has-error"
          placeholder="Invalid input">
        </ejs-textbox>
      </div>

      <div class="state">
        <label for="warning">Warning State:</label>
        <ejs-textbox
          id="warning"
          css-class="has-warning"
          placeholder="Warning input">
        </ejs-textbox>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  }
}
</script>

<style scoped>
fieldset {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

.state {
  margin-bottom: 15px;
}

.state:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

:deep(.has-success.e-textbox) {
  border-color: #28a745;
  background: #f0fff4;
}

:deep(.has-error.e-textbox) {
  border-color: #dc3545;
  background: #fff5f5;
}

:deep(.has-warning.e-textbox) {
  border-color: #ffc107;
  background: #fffbf0;
}
</style>
```

---

## Disabled and Read-Only

Disable or make textbox read-only:

```vue
<template>
  <div class="disabled-readonly-demo">
    <fieldset>
      <legend>Disabled and Read-Only States</legend>

      <div class="state">
        <label for="enabled">Enabled (Default):</label>
        <ejs-textbox
          id="enabled"
          value="Fully interactive"
          placeholder="Can be edited">
        </ejs-textbox>
      </div>

      <div class="state">
        <label for="disabled">Disabled:</label>
        <ejs-textbox
          id="disabled"
          value="Cannot interact"
          :enabled="false"
          placeholder="Not editable">
        </ejs-textbox>
      </div>

      <div class="state">
        <label for="readonly">Read-Only:</label>
        <ejs-textbox
          id="readonly"
          value="View only content"
          readonly
          placeholder="View only">
        </ejs-textbox>
      </div>

      <div class="state">
        <label for="toggle">Toggle Disabled:</label>
        <ejs-textbox
          id="toggle"
          v-model="toggleValue"
          :enabled="isEnabled"
          placeholder="Toggle state below">
        </ejs-textbox>
        <button @click="isEnabled = !isEnabled" class="state-toggle">
          {{ isEnabled ? 'Disable' : 'Enable' }} Field
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  data() {
    return {
      toggleValue: '',
      isEnabled: true
    }
  }
}
</script>

<style scoped>
fieldset {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

.state {
  margin-bottom: 15px;
}

.state:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.state-toggle {
  margin-top: 8px;
  padding: 8px 16px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.state-toggle:hover {
  background: #106ebe;
}

:deep(.e-textbox:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

---

## Examples

### Complete Validation and States Demo

```vue
<template>
  <div class="validation-states-complete">
    <h3>Validation and States Guide</h3>

    <div class="real-form-section">
      <h4>Real-World Form Example</h4>

      <form @submit.prevent="submitForm" class="form">
        <fieldset>
          <legend>User Registration</legend>

          <div class="form-group">
            <label for="reg-email">
              Email <span class="required">*</span>
            </label>
            <ejs-textbox
              id="reg-email"
              v-model="form.email"
              type="email"
              @blur="validateField('email')"
              :class="getFieldClass('email')"
              placeholder="user@example.com"
              aria-required="true">
            </ejs-textbox>
            <p v-if="form.errors.email" class="error">{{ form.errors.email }}</p>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="reg-first">
                First Name <span class="required">*</span>
              </label>
              <ejs-textbox
                id="reg-first"
                v-model="form.firstName"
                @blur="validateField('firstName')"
                :class="getFieldClass('firstName')"
                placeholder="John"
                aria-required="true">
              </ejs-textbox>
              <p v-if="form.errors.firstName" class="error">
                {{ form.errors.firstName }}
              </p>
            </div>

            <div class="form-group">
              <label for="reg-last">
                Last Name <span class="required">*</span>
              </label>
              <ejs-textbox
                id="reg-last"
                v-model="form.lastName"
                @blur="validateField('lastName')"
                :class="getFieldClass('lastName')"
                placeholder="Doe"
                aria-required="true">
              </ejs-textbox>
              <p v-if="form.errors.lastName" class="error">
                {{ form.errors.lastName }}
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="reg-username">
              Username <span class="required">*</span>
            </label>
            <ejs-textbox
              id="reg-username"
              v-model="form.username"
              @input="validateField('username')"
              :class="getFieldClass('username')"
              placeholder="johndoe"
              aria-required="true">
            </ejs-textbox>
            <p v-if="form.errors.username" class="error">
              {{ form.errors.username }}
            </p>
            <p v-if="form.validated.username && !form.errors.username" class="success">
              ✓ Username available
            </p>
          </div>

          <div class="form-group">
            <label for="reg-pass">
              Password <span class="required">*</span>
            </label>
            <ejs-textbox
              id="reg-pass"
              v-model="form.password"
              type="password"
              @input="validateField('password')"
              :class="getFieldClass('password')"
              placeholder="Enter password"
              aria-required="true">
            </ejs-textbox>
            <p v-if="form.errors.password" class="error">
              {{ form.errors.password }}
            </p>
            <div class="strength-bar">
              <div 
                class="strength-fill"
                :class="passwordStrength"
                :style="{ width: passwordStrengthPercent + '%' }">
              </div>
            </div>
            <p class="strength-text">{{ passwordStrength }}</p>
          </div>

          <div class="form-group">
            <label for="reg-confirm">
              Confirm Password <span class="required">*</span>
            </label>
            <ejs-textbox
              id="reg-confirm"
              v-model="form.confirmPassword"
              type="password"
              @input="validateField('confirmPassword')"
              :class="getFieldClass('confirmPassword')"
              placeholder="Confirm password"
              aria-required="true">
            </ejs-textbox>
            <p v-if="form.errors.confirmPassword" class="error">
              {{ form.errors.confirmPassword }}
            </p>
          </div>

          <button type="submit" :disabled="!isFormValid">
            {{ isSubmitting ? 'Registering...' : 'Register' }}
          </button>
        </fieldset>
      </form>

      <div v-if="submitSuccess" class="success-message">
        ✓ Registration successful!
      </div>
    </div>

    <div class="state-showcase">
      <h4>State Showcase</h4>

      <div class="showcase-grid">
        <div class="showcase-item">
          <h5>Empty State</h5>
          <ejs-textbox placeholder="Empty"></ejs-textbox>
        </div>

        <div class="showcase-item">
          <h5>Filled State</h5>
          <ejs-textbox value="Filled content"></ejs-textbox>
        </div>

        <div class="showcase-item">
          <h5>Focused State</h5>
          <ejs-textbox placeholder="Click to focus" ref="focusDemo"></ejs-textbox>
        </div>

        <div class="showcase-item">
          <h5>Valid State</h5>
          <ejs-textbox
            value="valid@email.com"
            css-class="valid-state">
          </ejs-textbox>
        </div>

        <div class="showcase-item">
          <h5>Invalid State</h5>
          <ejs-textbox
            value="invalid input"
            css-class="invalid-state">
          </ejs-textbox>
        </div>

        <div class="showcase-item">
          <h5>Disabled State</h5>
          <ejs-textbox
            value="Disabled"
            :enabled="false">
          </ejs-textbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  data() {
    return {
      form: {
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        errors: {
          email: '',
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirmPassword: ''
        },
        validated: {
          email: false,
          firstName: false,
          lastName: false,
          username: false,
          password: false,
          confirmPassword: false
        }
      },
      isSubmitting: false,
      submitSuccess: false
    }
  },
  computed: {
    passwordStrength() {
      if (this.form.password.length < 8) return 'weak';
      if (!/[a-z]/.test(this.form.password)) return 'weak';
      if (!/[A-Z]/.test(this.form.password)) return 'medium';
      if (!/[0-9]/.test(this.form.password)) return 'medium';
      if (!/[!@#$%^&*]/.test(this.form.password)) return 'medium';
      return 'strong';
    },
    passwordStrengthPercent() {
      if (this.passwordStrength === 'weak') return 33;
      if (this.passwordStrength === 'medium') return 66;
      return 100;
    },
    isFormValid() {
      return Object.keys(this.form.errors).every(key => !this.form.errors[key]) &&
             this.form.email && this.form.firstName && this.form.lastName &&
             this.form.username && this.form.password && this.form.confirmPassword;
    }
  },
  methods: {
    validateField(field) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

      switch(field) {
        case 'email':
          if (!this.form.email) {
            this.form.errors.email = 'Email is required';
          } else if (!emailRegex.test(this.form.email)) {
            this.form.errors.email = 'Invalid email format';
          } else {
            this.form.errors.email = '';
            this.form.validated.email = true;
          }
          break;
        case 'firstName':
          if (!this.form.firstName) {
            this.form.errors.firstName = 'First name is required';
          } else {
            this.form.errors.firstName = '';
            this.form.validated.firstName = true;
          }
          break;
        case 'lastName':
          if (!this.form.lastName) {
            this.form.errors.lastName = 'Last name is required';
          } else {
            this.form.errors.lastName = '';
            this.form.validated.lastName = true;
          }
          break;
        case 'username':
          if (!this.form.username) {
            this.form.errors.username = 'Username is required';
          } else if (this.form.username.length < 3) {
            this.form.errors.username = 'Username must be at least 3 characters';
          } else if (!usernameRegex.test(this.form.username)) {
            this.form.errors.username = 'Username can only contain letters, numbers, and underscore';
          } else {
            this.form.errors.username = '';
            this.form.validated.username = true;
          }
          break;
        case 'password':
          if (!this.form.password) {
            this.form.errors.password = 'Password is required';
          } else if (this.form.password.length < 8) {
            this.form.errors.password = 'Password must be at least 8 characters';
          } else {
            this.form.errors.password = '';
            this.form.validated.password = true;
          }
          break;
        case 'confirmPassword':
          if (!this.form.confirmPassword) {
            this.form.errors.confirmPassword = 'Please confirm password';
          } else if (this.form.confirmPassword !== this.form.password) {
            this.form.errors.confirmPassword = 'Passwords do not match';
          } else {
            this.form.errors.confirmPassword = '';
            this.form.validated.confirmPassword = true;
          }
          break;
      }
    },
    getFieldClass(field) {
      if (this.form.errors[field]) return 'invalid-field';
      if (this.form.validated[field]) return 'valid-field';
      return '';
    },
    submitForm() {
      Object.keys(this.form).forEach(key => {
        if (key !== 'errors' && key !== 'validated') {
          this.validateField(key);
        }
      });

      if (this.isFormValid) {
        this.isSubmitting = true;
        setTimeout(() => {
          this.submitSuccess = true;
          setTimeout(() => {
            this.submitSuccess = false;
            this.form = {
              email: '',
              firstName: '',
              lastName: '',
              username: '',
              password: '',
              confirmPassword: '',
              errors: { email: '', firstName: '', lastName: '', username: '', password: '', confirmPassword: '' },
              validated: { email: false, firstName: false, lastName: false, username: false, password: false, confirmPassword: false }
            };
            this.isSubmitting = false;
          }, 2000);
        }, 1000);
      }
    }
  }
}
</script>

<style scoped>
.validation-states-complete {
  padding: 20px;
  max-width: 900px;
}

h3 {
  margin-bottom: 30px;
}

h4 {
  margin: 0 0 15px 0;
  border-bottom: 2px solid #0078d4;
  padding-bottom: 8px;
}

h5 {
  margin: 0 0 10px 0;
}

.real-form-section,
.state-showcase {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

form {
  max-width: 600px;
}

fieldset {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

.form-group:last-child {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.required {
  color: #dc3545;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

:deep(.invalid-field.e-textbox) {
  border-color: #dc3545 !important;
  background: #fff5f5;
}

:deep(.valid-field.e-textbox) {
  border-color: #28a745 !important;
  background: #f0fff4;
}

.error {
  margin-top: 5px;
  font-size: 12px;
  color: #dc3545;
}

.success {
  margin-top: 5px;
  font-size: 12px;
  color: #28a745;
}

.strength-bar {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  margin-top: 5px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.strength-fill.weak {
  background: #dc3545;
}

.strength-fill.medium {
  background: #ffc107;
}

.strength-fill.strong {
  background: #28a745;
}

.strength-text {
  margin-top: 4px;
  font-size: 11px;
  color: #666;
  text-transform: capitalize;
}

button {
  width: 100%;
  padding: 12px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover:not(:disabled) {
  background: #106ebe;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
  text-align: center;
  font-weight: bold;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.showcase-item {
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

:deep(.valid-state.e-textbox) {
  border-color: #28a745;
}

:deep(.invalid-state.e-textbox) {
  border-color: #dc3545;
}
</style>
```

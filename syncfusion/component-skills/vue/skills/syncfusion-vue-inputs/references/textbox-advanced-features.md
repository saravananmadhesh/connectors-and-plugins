# Advanced Features — Syncfusion Vue TextBox

## Table of Contents
- [Input Masking](#input-masking)
- [Custom Validation](#custom-validation)
- [Auto-Expansion](#auto-expansion)
- [Examples](#examples)

---

## Input Masking

Apply input masks:

```vue
<template>
  <div class="masking-demo">
    <fieldset>
      <legend>Input Masking Examples</legend>

      <div class="example">
        <label for="phone-mask">Phone Number (###-###-####):</label>
        <ejs-textbox
          id="phone-mask"
          v-model="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890">
        </ejs-textbox>
      </div>

      <div class="example">
        <label for="date-mask">Date (MM/DD/YYYY):</label>
        <ejs-textbox
          id="date-mask"
          v-model="date"
          pattern="[0-1][0-9]/[0-3][0-9]/[0-9]{4}"
          placeholder="01/01/2023">
        </ejs-textbox>
      </div>

      <div class="example">
        <label for="credit-mask">Credit Card (#### #### #### ####):</label>
        <ejs-textbox
          id="credit-mask"
          v-model="creditCard"
          pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
          placeholder="1234 5678 9012 3456">
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
  },
  data() {
    return {
      phone: '',
      date: '',
      creditCard: ''
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

.example {
  margin-bottom: 15px;
}

.example:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}
</style>
```

---

## Custom Validation

Implement custom validation:

```vue
<template>
  <div class="validation-demo">
    <div class="example">
      <label for="email-val">Email with Custom Validation:</label>
      <ejs-textbox
        id="email-val"
        v-model="email"
        @blur="validateEmail"
        :class="{ invalid: emailError }"
        placeholder="user@example.com">
      </ejs-textbox>
      <p v-if="emailError" class="error">{{ emailError }}</p>
      <p v-if="emailValid" class="success">✓ Valid email</p>
    </div>

    <div class="example">
      <label for="username-val">Username (3-20 characters):</label>
      <ejs-textbox
        id="username-val"
        v-model="username"
        @input="validateUsername"
        :class="{ invalid: usernameError }"
        placeholder="Enter username">
      </ejs-textbox>
      <p v-if="usernameError" class="error">{{ usernameError }}</p>
      <p v-if="usernameValid" class="success">✓ Valid username</p>
    </div>

    <div class="example">
      <label for="url-val">Website URL:</label>
      <ejs-textbox
        id="url-val"
        v-model="url"
        @blur="validateUrl"
        :class="{ invalid: urlError }"
        placeholder="https://example.com">
      </ejs-textbox>
      <p v-if="urlError" class="error">{{ urlError }}</p>
      <p v-if="urlValid" class="success">✓ Valid URL</p>
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
      username: '',
      usernameError: '',
      usernameValid: false,
      url: '',
      urlError: '',
      urlValid: false
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
    validateUsername() {
      this.usernameError = '';
      this.usernameValid = false;
      
      if (this.username.length < 3) {
        this.usernameError = 'Username must be at least 3 characters';
      } else if (this.username.length > 20) {
        this.usernameError = 'Username must be max 20 characters';
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.username)) {
        this.usernameError = 'Username can only contain letters, numbers, and underscore';
      } else {
        this.usernameValid = true;
      }
    },
    validateUrl() {
      this.urlError = '';
      this.urlValid = false;
      
      try {
        new URL(this.url);
        this.urlValid = true;
      } catch (e) {
        this.urlError = 'Invalid URL format';
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

.example {
  margin-bottom: 20px;
}

.example:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

:deep(.e-textbox.invalid) {
  border-color: #dc3545 !important;
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
</style>
```

---

## Auto-Expansion

Auto-expanding textbox:

```vue
<template>
  <div class="auto-expand-demo">
    <fieldset>
      <legend>Auto-Expanding TextBox</legend>

      <div class="example">
        <label for="auto-expand">Type to expand:</label>
        <ejs-textbox
          id="auto-expand"
          v-model="expandingText"
          multiline
          rows="1"
          :style="{ height: calculatedHeight + 'px' }"
          placeholder="Start typing and I will expand...">
        </ejs-textbox>
      </div>

      <div class="example">
        <label for="fixed-expand">Fixed expansion (max 5 rows):</label>
        <ejs-textbox
          id="fixed-expand"
          v-model="fixedExpandText"
          multiline
          rows="1"
          :style="{ height: Math.min(calculatedHeightFixed, 150) + 'px' }"
          @input="limitRows"
          placeholder="Expands up to 5 rows">
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
  },
  data() {
    return {
      expandingText: '',
      fixedExpandText: ''
    }
  },
  computed: {
    calculatedHeight() {
      return Math.max(36, this.expandingText.split('\n').length * 24);
    },
    calculatedHeightFixed() {
      return Math.max(36, this.fixedExpandText.split('\n').length * 24);
    }
  },
  methods: {
    limitRows() {
      const lines = this.fixedExpandText.split('\n');
      if (lines.length > 5) {
        this.fixedExpandText = lines.slice(0, 5).join('\n');
      }
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

.example {
  margin-bottom: 20px;
}

.example:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

:deep(.e-textbox) {
  transition: height 0.2s ease;
}
</style>
```

---

## Examples

### Complete Advanced Features Demo

```vue
<template>
  <div class="advanced-complete">
    <h3>Advanced TextBox Features</h3>

    <div class="features-section">
      <h4>Advanced Input Masking</h4>

      <div class="masking-examples">
        <div class="mask-item">
          <label for="mask-phone">Phone:</label>
          <ejs-textbox
            id="mask-phone"
            v-model="masks.phone"
            placeholder="(555) 123-4567">
          </ejs-textbox>
          <p class="mask-hint">Format: (XXX) XXX-XXXX</p>
        </div>

        <div class="mask-item">
          <label for="mask-ssn">Social Security:</label>
          <ejs-textbox
            id="mask-ssn"
            v-model="masks.ssn"
            placeholder="123-45-6789">
          </ejs-textbox>
          <p class="mask-hint">Format: XXX-XX-XXXX</p>
        </div>

        <div class="mask-item">
          <label for="mask-zip">Zip Code:</label>
          <ejs-textbox
            id="mask-zip"
            v-model="masks.zip"
            placeholder="12345-6789">
          </ejs-textbox>
          <p class="mask-hint">Format: XXXXX or XXXXX-XXXX</p>
        </div>
      </div>
    </div>

    <div class="validation-section">
      <h4>Smart Validation</h4>

      <form @submit.prevent="handleSubmit" class="validation-form">
        <div class="form-group">
          <label for="val-email">Email:</label>
          <ejs-textbox
            id="val-email"
            v-model="validation.email"
            type="email"
            @blur="validateField('email')"
            :class="{ invalid: validation.emailError }"
            placeholder="user@example.com">
          </ejs-textbox>
          <p v-if="validation.emailError" class="error-msg">
            {{ validation.emailError }}
          </p>
          <p v-else-if="validation.emailValid" class="success-msg">
            ✓ Valid email
          </p>
        </div>

        <div class="form-group">
          <label for="val-pass">Password (min 8 characters):</label>
          <ejs-textbox
            id="val-pass"
            v-model="validation.password"
            type="password"
            @input="validateField('password')"
            :class="{ invalid: validation.passwordError }"
            placeholder="Enter password">
          </ejs-textbox>
          <p v-if="validation.passwordError" class="error-msg">
            {{ validation.passwordError }}
          </p>
          <p v-else-if="validation.passwordValid" class="success-msg">
            ✓ Strong password
          </p>
          <div class="strength-bar">
            <div 
              class="strength-fill" 
              :class="passwordStrength"
              :style="{ width: passwordStrengthPercent + '%' }">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="val-confirm">Confirm Password:</label>
          <ejs-textbox
            id="val-confirm"
            v-model="validation.confirmPassword"
            type="password"
            @input="validateField('confirm')"
            :class="{ invalid: validation.confirmError }"
            placeholder="Confirm password">
          </ejs-textbox>
          <p v-if="validation.confirmError" class="error-msg">
            {{ validation.confirmError }}
          </p>
          <p v-else-if="validation.confirmValid" class="success-msg">
            ✓ Passwords match
          </p>
        </div>

        <button type="submit" :disabled="!isFormValid">Submit</button>
      </form>
    </div>

    <div class="expansion-section">
      <h4>Auto-Expanding Content</h4>

      <div class="expand-demo">
        <label for="expand-notes">Notes (auto-expands):</label>
        <ejs-textbox
          id="expand-notes"
          v-model="expandableText"
          multiline
          rows="2"
          :style="{ height: expandHeight + 'px' }"
          placeholder="Start typing... this field expands automatically"
          @input="calculateHeight">
        </ejs-textbox>
        <p class="expand-info">Lines: {{ lineCount }}, Height: {{ expandHeight }}px</p>
      </div>

      <div class="expand-demo">
        <label for="expand-limited">Limited Expansion (max 10 lines):</label>
        <ejs-textbox
          id="expand-limited"
          v-model="limitedText"
          multiline
          rows="2"
          :style="{ height: Math.min(limitedHeight, 240) + 'px' }"
          placeholder="Expands up to 10 rows"
          @input="calculateLimitedHeight">
        </ejs-textbox>
        <p class="expand-info">Lines: {{ limitedLineCount }}/10</p>
      </div>
    </div>

    <div class="formatting-section">
      <h4>Text Formatting & Transformation</h4>

      <div class="format-example">
        <label for="format-upper">Uppercase Transform:</label>
        <ejs-textbox
          id="format-upper"
          v-model="formatting.uppercase"
          placeholder="Type to see uppercase">
        </ejs-textbox>
        <p class="result">Result: {{ formatting.uppercase.toUpperCase() }}</p>
      </div>

      <div class="format-example">
        <label for="format-lower">Lowercase Transform:</label>
        <ejs-textbox
          id="format-lower"
          v-model="formatting.lowercase"
          placeholder="Type to see lowercase">
        </ejs-textbox>
        <p class="result">Result: {{ formatting.lowercase.toLowerCase() }}</p>
      </div>

      <div class="format-example">
        <label for="format-trim">Auto-Trim Spaces:</label>
        <ejs-textbox
          id="format-trim"
          v-model.trim="formatting.trimmed"
          placeholder="Spaces are trimmed automatically">
        </ejs-textbox>
        <p class="result">Length: {{ formatting.trimmed.length }}</p>
      </div>

      <div class="format-example">
        <label for="format-remove">Remove Numbers:</label>
        <ejs-textbox
          id="format-remove"
          :value="formatting.noNumbers"
          @input="formatting.noNumbers = removeNumbers($event.target.value)"
          placeholder="Numbers are removed">
        </ejs-textbox>
        <p class="result">Result: {{ formatting.noNumbers }}</p>
      </div>
    </div>

    <div v-if="submitSuccess" class="success-banner">
      ✓ Form submitted successfully!
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
      masks: {
        phone: '',
        ssn: '',
        zip: ''
      },
      validation: {
        email: '',
        emailError: '',
        emailValid: false,
        password: '',
        passwordError: '',
        passwordValid: false,
        confirmPassword: '',
        confirmError: '',
        confirmValid: false
      },
      expandableText: '',
      limitedText: '',
      formatting: {
        uppercase: '',
        lowercase: '',
        trimmed: '',
        noNumbers: ''
      },
      submitSuccess: false,
      expandHeight: 60,
      limitedHeight: 60
    }
  },
  computed: {
    lineCount() {
      return this.expandableText.split('\n').length;
    },
    limitedLineCount() {
      return this.limitedText.split('\n').length;
    },
    passwordStrength() {
      if (this.validation.password.length < 8) return 'weak';
      if (!/[a-z]/.test(this.validation.password)) return 'weak';
      if (!/[A-Z]/.test(this.validation.password)) return 'medium';
      if (!/[0-9]/.test(this.validation.password)) return 'medium';
      if (!/[!@#$%^&*]/.test(this.validation.password)) return 'medium';
      return 'strong';
    },
    passwordStrengthPercent() {
      if (this.passwordStrength === 'weak') return 33;
      if (this.passwordStrength === 'medium') return 66;
      return 100;
    },
    isFormValid() {
      return this.validation.emailValid && 
             this.validation.passwordValid && 
             this.validation.confirmValid;
    }
  },
  methods: {
    validateField(field) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      switch(field) {
        case 'email':
          if (!this.validation.email) {
            this.validation.emailError = 'Email is required';
            this.validation.emailValid = false;
          } else if (!emailRegex.test(this.validation.email)) {
            this.validation.emailError = 'Invalid email format';
            this.validation.emailValid = false;
          } else {
            this.validation.emailError = '';
            this.validation.emailValid = true;
          }
          break;
        case 'password':
          if (this.validation.password.length < 8) {
            this.validation.passwordError = 'Password must be at least 8 characters';
            this.validation.passwordValid = false;
          } else {
            this.validation.passwordError = '';
            this.validation.passwordValid = true;
          }
          break;
        case 'confirm':
          if (this.validation.confirmPassword !== this.validation.password) {
            this.validation.confirmError = 'Passwords do not match';
            this.validation.confirmValid = false;
          } else if (!this.validation.confirmPassword) {
            this.validation.confirmError = 'Please confirm password';
            this.validation.confirmValid = false;
          } else {
            this.validation.confirmError = '';
            this.validation.confirmValid = true;
          }
          break;
      }
    },
    calculateHeight() {
      this.expandHeight = Math.max(60, this.lineCount * 24);
    },
    calculateLimitedHeight() {
      this.limitedHeight = Math.max(60, this.limitedLineCount * 24);
    },
    removeNumbers(value) {
      return value.replace(/[0-9]/g, '');
    },
    handleSubmit() {
      if (this.isFormValid) {
        this.submitSuccess = true;
        setTimeout(() => {
          this.submitSuccess = false;
          this.validation = {
            email: '',
            emailError: '',
            emailValid: false,
            password: '',
            passwordError: '',
            passwordValid: false,
            confirmPassword: '',
            confirmError: '',
            confirmValid: false
          };
        }, 2000);
      }
    }
  }
}
</script>

<style scoped>
.advanced-complete {
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

.features-section,
.validation-section,
.expansion-section,
.formatting-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.masking-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.mask-item label,
.format-example label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.mask-hint {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}

.validation-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

:deep(.e-textbox.invalid) {
  border-color: #dc3545 !important;
}

.error-msg {
  margin-top: 5px;
  font-size: 12px;
  color: #dc3545;
}

.success-msg {
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

button {
  padding: 12px 24px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}

button:hover:not(:disabled) {
  background: #106ebe;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.expand-demo {
  margin-bottom: 20px;
}

.expand-demo:last-child {
  margin-bottom: 0;
}

.expand-demo label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.expand-info {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}

.format-example {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
}

.format-example:last-child {
  margin-bottom: 0;
}

.result {
  margin-top: 8px;
  padding: 8px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
}

.success-banner {
  margin-top: 20px;
  padding: 15px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
  text-align: center;
  font-weight: bold;
}
</style>
```

# Form Validation — Syncfusion Vue MaskedTextBox

## Table of Contents
- [Basic Validation](#basic-validation)
- [Form Integration](#form-integration)
- [Custom Validators](#custom-validators)
- [Error Messages](#error-messages)
- [Examples](#examples)

---

## Basic Validation

Validate input when mask is complete:

```vue
<template>
  <div>
    <ejs-maskedtextbox
      mask="(999) 999-9999"
      placeholder="Phone Number"
      @blur="validatePhone"
      :readonly="false">
    </ejs-maskedtextbox>
    <p v-if="phoneError" class="error">{{ phoneError }}</p>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  data() {
    return {
      phoneError: ''
    }
  },
  methods: {
    validatePhone(event) {
      const value = event.value;
      if (!value || value.includes('#')) {
        this.phoneError = 'Phone number is required';
      } else {
        this.phoneError = '';
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: #d83b01;
  font-size: 12px;
  margin-top: 5px;
}
</style>
```

---

## Form Integration

Integrate with Vue form handling:

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="phone">Phone Number:</label>
      <ejs-maskedtextbox
        id="phone"
        mask="(999) 999-9999"
        v-model="formData.phone"
        placeholder="(555) 555-5555"
        @blur="validatePhone"
        required>
      </ejs-maskedtextbox>
      <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
    </div>

    <div class="form-group">
      <label for="ssn">Social Security Number:</label>
      <ejs-maskedtextbox
        id="ssn"
        mask="999-99-9999"
        v-model="formData.ssn"
        placeholder="123-45-6789"
        @blur="validateSSN"
        required>
      </ejs-maskedtextbox>
      <span v-if="errors.ssn" class="error">{{ errors.ssn }}</span>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  data() {
    return {
      formData: {
        phone: '',
        ssn: ''
      },
      errors: {
        phone: '',
        ssn: ''
      }
    }
  },
  methods: {
    validatePhone() {
      if (!this.formData.phone || this.formData.phone.includes('#')) {
        this.errors.phone = 'Phone number is required';
      } else {
        this.errors.phone = '';
      }
    },
    validateSSN() {
      if (!this.formData.ssn || this.formData.ssn.includes('#')) {
        this.errors.ssn = 'SSN is required';
      } else {
        this.errors.ssn = '';
      }
    },
    submitForm() {
      this.validatePhone();
      this.validateSSN();
      
      if (!this.errors.phone && !this.errors.ssn) {
        console.log('Form submitted:', this.formData);
      }
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.error {
  color: #d83b01;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

button {
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #106ebe;
}
</style>
```

---

## Custom Validators

Create custom validation functions:

```vue
<template>
  <div>
    <ejs-maskedtextbox
      mask="(999) 999-9999"
      v-model="phone"
      placeholder="Phone Number"
      @blur="validateCustom">
    </ejs-maskedtextbox>
    <p v-if="validationMessage" :class="validationClass">
      {{ validationMessage }}
    </p>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  data() {
    return {
      phone: '',
      validationMessage: '',
      validationClass: ''
    }
  },
  methods: {
    validateCustom() {
      // Check if complete
      if (this.phone.includes('#')) {
        this.validationMessage = 'Phone number incomplete';
        this.validationClass = 'error';
        return;
      }
      
      // Check for common invalid patterns
      if (this.phone.startsWith('(555)')) {
        this.validationMessage = 'This is a reserved number';
        this.validationClass = 'error';
        return;
      }
      
      this.validationMessage = '✓ Valid phone number';
      this.validationClass = 'success';
    }
  }
}
</script>

<style scoped>
p {
  margin-top: 8px;
  font-size: 12px;
}

.error {
  color: #d83b01;
}

.success {
  color: #107c10;
}
</style>
```

---

## Error Messages

Display contextual error messages:

```vue
<template>
  <div class="validation-demo">
    <div class="input-group">
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        v-model="phone"
        placeholder="Phone Number"
        @blur="validate"
        @focus="clearError">
      </ejs-maskedtextbox>
      <div v-if="error" class="error-container">
        <span class="error-icon">⚠️</span>
        <span class="error-text">{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  data() {
    return {
      phone: '',
      error: ''
    }
  },
  methods: {
    validate() {
      if (!this.phone || this.phone.includes('#')) {
        this.error = 'Please enter a complete phone number';
      } else {
        this.error = '';
      }
    },
    clearError() {
      this.error = '';
    }
  }
}
</script>

<style scoped>
.input-group {
  margin-bottom: 20px;
}

.error-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #fde7e9;
  border: 1px solid #d83b01;
  border-radius: 4px;
  margin-top: 8px;
}

.error-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.error-text {
  color: #d83b01;
  font-size: 12px;
}
</style>
```

---

## Examples

### Complete Validation Demo

```vue
<template>
  <div class="validation-demo">
    <h3>Complete Form Validation</h3>
    
    <form @submit.prevent="submitForm">
      <div class="form-field">
        <label>Phone:</label>
        <ejs-maskedtextbox
          mask="(999) 999-9999"
          v-model="formData.phone"
          @blur="validateField('phone')"
          placeholder="(555) 555-5555">
        </ejs-maskedtextbox>
        <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
      </div>

      <div class="form-field">
        <label>Date:</label>
        <ejs-maskedtextbox
          mask="99/99/9999"
          v-model="formData.date"
          @blur="validateField('date')"
          placeholder="MM/DD/YYYY">
        </ejs-maskedtextbox>
        <span v-if="errors.date" class="field-error">{{ errors.date }}</span>
      </div>

      <button type="submit" :disabled="!isFormValid">
        {{ isFormValid ? 'Submit' : 'Complete All Fields' }}
      </button>
    </form>

    <div v-if="submitMessage" class="submit-message">
      {{ submitMessage }}
    </div>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  data() {
    return {
      formData: {
        phone: '',
        date: ''
      },
      errors: {
        phone: '',
        date: ''
      },
      submitMessage: ''
    }
  },
  computed: {
    isFormValid() {
      return !this.formData.phone.includes('#') &&
             !this.formData.date.includes('#') &&
             this.formData.phone &&
             this.formData.date;
    }
  },
  methods: {
    validateField(field) {
      if (!this.formData[field] || this.formData[field].includes('#')) {
        this.errors[field] = `${field} is required`;
      } else {
        this.errors[field] = '';
      }
    },
    submitForm() {
      if (this.isFormValid) {
        this.submitMessage = '✓ Form submitted successfully!';
        console.log('Submitted:', this.formData);
      }
    }
  }
}
</script>

<style scoped>
.validation-demo {
  padding: 20px;
  max-width: 400px;
}

.form-field {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.field-error {
  color: #d83b01;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
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
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-message {
  margin-top: 20px;
  padding: 10px;
  background: #d4edda;
  color: #107c10;
  border-radius: 4px;
  text-align: center;
}
</style>
```

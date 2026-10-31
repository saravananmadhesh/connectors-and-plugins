# Form Integration Guide - Vue 3

## Overview

This guide demonstrates how to integrate Syncfusion Vue Input components into forms with validation, error handling, and submission.

---

## Basic Form Integration

```vue
<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <!-- Text Input -->
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <TextBoxComponent
          id="firstName"
          v-model="form.firstName"
          placeholder="Enter first name"
          @blur="validateField('firstName')"
        />
        <span v-if="errors.firstName" class="error-message">
          {{ errors.firstName }}
        </span>
      </div>

      <!-- Email Input -->
      <div class="form-group">
        <label for="email">Email:</label>
        <TextBoxComponent
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter email address"
          @blur="validateField('email')"
        />
        <span v-if="errors.email" class="error-message">
          {{ errors.email }}
        </span>
      </div>

      <!-- Numeric Input -->
      <div class="form-group">
        <label for="age">Age:</label>
        <NumericTextBoxComponent
          id="age"
          v-model="form.age"
          :min="18"
          :max="120"
          placeholder="Enter age"
          @blur="validateField('age')"
        />
        <span v-if="errors.age" class="error-message">
          {{ errors.age }}
        </span>
      </div>

      <!-- Checkbox -->
      <div class="form-group">
        <CheckBoxComponent
          v-model="form.agreeToTerms"
          label="I agree to the terms and conditions"
          @change="validateField('agreeToTerms')"
        />
        <span v-if="errors.agreeToTerms" class="error-message">
          {{ errors.agreeToTerms }}
        </span>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        :disabled="!isFormValid"
        class="submit-btn"
      >
        Submit
      </button>
    </form>

    <!-- Form Submission Result -->
    <div v-if="submitted" class="success-message">
      <h3>Form Submitted Successfully!</h3>
      <pre>{{ JSON.stringify(form, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import { CheckBoxComponent } from '@syncfusion/ej2-vue-inputs';

// Form data
const form = ref({
  firstName: '',
  email: '',
  age: null,
  agreeToTerms: false
});

// Validation errors
const errors = reactive({
  firstName: '',
  email: '',
  age: '',
  agreeToTerms: ''
});

const submitted = ref(false);

// Validation rules
const validationRules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]*$/
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  age: {
    required: true,
    min: 18,
    max: 120
  },
  agreeToTerms: {
    required: true
  }
};

// Validation functions
const validateField = (fieldName) => {
  const value = form.value[fieldName];
  const rules = validationRules[fieldName];
  
  // Required validation
  if (rules.required && !value) {
    errors[fieldName] = `${fieldName} is required`;
    return false;
  }

  // String validations
  if (typeof value === 'string') {
    // Min length
    if (rules.minLength && value.length < rules.minLength) {
      errors[fieldName] = `Minimum ${rules.minLength} characters required`;
      return false;
    }

    // Max length
    if (rules.maxLength && value.length > rules.maxLength) {
      errors[fieldName] = `Maximum ${rules.maxLength} characters allowed`;
      return false;
    }

    // Pattern
    if (rules.pattern && !rules.pattern.test(value)) {
      errors[fieldName] = `Invalid ${fieldName} format`;
      return false;
    }
  }

  // Numeric validations
  if (typeof value === 'number') {
    if (rules.min && value < rules.min) {
      errors[fieldName] = `Value must be at least ${rules.min}`;
      return false;
    }

    if (rules.max && value > rules.max) {
      errors[fieldName] = `Value must be at most ${rules.max}`;
      return false;
    }
  }

  errors[fieldName] = '';
  return true;
};

// Check if form is valid
const isFormValid = computed(() => {
  return (
    form.value.firstName &&
    form.value.email &&
    form.value.age &&
    form.value.agreeToTerms &&
    !Object.values(errors).some(e => e)
  );
});

// Submit form
const submitForm = () => {
  // Validate all fields
  let isValid = true;
  Object.keys(validationRules).forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (isValid) {
    submitted.value = true;
    console.log('Form submitted:', form.value);
    
    // Send to server
    sendFormData();
  }
};

const sendFormData = async () => {
  try {
    const response = await fetch('/api/form/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    });

    if (response.ok) {
      console.log('Form submitted successfully');
    } else {
      alert('Error submitting form');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

form {
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.error-message {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 5px;
}

.submit-btn {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  margin-top: 30px;
  padding: 20px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}

.success-message h3 {
  margin: 0 0 15px 0;
}

.success-message pre {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
```

---

## Advanced Form with Multiple Input Types

```vue
<template>
  <div class="advanced-form-container">
    <form @submit.prevent="submitForm" novalidate>
      <!-- Product Information -->
      <fieldset>
        <legend>Product Information</legend>

        <div class="form-row">
          <div class="form-group">
            <label for="productName">Product Name:</label>
            <TextBoxComponent
              id="productName"
              v-model="form.productName"
              placeholder="Enter product name"
              @blur="validateField('productName')"
            />
            <span v-if="errors.productName" class="error">
              {{ errors.productName }}
            </span>
          </div>

          <div class="form-group">
            <label for="sku">SKU:</label>
            <TextBoxComponent
              id="sku"
              v-model="form.sku"
              placeholder="Enter SKU"
              @blur="validateField('sku')"
            />
            <span v-if="errors.sku" class="error">{{ errors.sku }}</span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="price">Price ($):</label>
            <NumericTextBoxComponent
              id="price"
              v-model="form.price"
              :min="0"
              :decimals="2"
              :format="'c2'"
              placeholder="Enter price"
              @blur="validateField('price')"
            />
            <span v-if="errors.price" class="error">{{ errors.price }}</span>
          </div>

          <div class="form-group">
            <label for="quantity">Quantity:</label>
            <NumericTextBoxComponent
              id="quantity"
              v-model="form.quantity"
              :min="1"
              :decimals="0"
              placeholder="Enter quantity"
              @blur="validateField('quantity')"
            />
            <span v-if="errors.quantity" class="error">
              {{ errors.quantity }}
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <TextBoxComponent
            id="description"
            v-model="form.description"
            :multiline="true"
            placeholder="Enter product description"
          />
        </div>
      </fieldset>

      <!-- Product Features -->
      <fieldset>
        <legend>Features</legend>

        <CheckBoxComponent
          v-model="form.features.isNew"
          label="New Product"
          @change="validateField('features')"
        />

        <CheckBoxComponent
          v-model="form.features.isFeatured"
          label="Featured Product"
          @change="validateField('features')"
        />

        <CheckBoxComponent
          v-model="form.features.isOnSale"
          label="On Sale"
          @change="validateField('features')"
        />
      </fieldset>

      <!-- Summary -->
      <div class="form-summary">
        <div class="summary-item">
          <span>Subtotal:</span>
          <span>{{ formatCurrency(form.price * form.quantity) }}</span>
        </div>
        <div class="summary-item">
          <span>Discount:</span>
          <span>-{{ formatCurrency(calculateDiscount()) }}</span>
        </div>
        <div class="summary-item total">
          <span>Total:</span>
          <span>{{ formatCurrency(calculateTotal()) }}</span>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="reset" class="btn-reset">Reset</button>
        <button 
          type="submit" 
          :disabled="!isFormValid"
          class="btn-submit"
        >
          Submit
        </button>
      </div>
    </form>

    <!-- Messages -->
    <div v-if="submitted" class="message message-success">
      Form submitted successfully!
    </div>
    <div v-if="error" class="message message-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import {
  TextBoxComponent,
  NumericTextBoxComponent,
  CheckBoxComponent
} from '@syncfusion/ej2-vue-inputs';

const form = ref({
  productName: '',
  sku: '',
  price: 0,
  quantity: 1,
  description: '',
  features: {
    isNew: false,
    isFeatured: false,
    isOnSale: false
  }
});

const errors = reactive({
  productName: '',
  sku: '',
  price: '',
  quantity: '',
  features: ''
});

const submitted = ref(false);
const error = ref('');

const validationRules = {
  productName: {
    required: true,
    minLength: 3,
    maxLength: 100
  },
  sku: {
    required: true,
    pattern: /^[A-Z0-9\-]+$/
  },
  price: {
    required: true,
    min: 0.01
  },
  quantity: {
    required: true,
    min: 1
  }
};

const validateField = (fieldName) => {
  const value = form.value[fieldName];
  const rules = validationRules[fieldName];

  if (!rules) return true;

  if (rules.required && !value) {
    errors[fieldName] = `${fieldName} is required`;
    return false;
  }

  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      errors[fieldName] = `Minimum ${rules.minLength} characters`;
      return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors[fieldName] = `Maximum ${rules.maxLength} characters`;
      return false;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors[fieldName] = `Invalid ${fieldName} format`;
      return false;
    }
  }

  if (typeof value === 'number') {
    if (rules.min && value < rules.min) {
      errors[fieldName] = `Value must be at least ${rules.min}`;
      return false;
    }
  }

  errors[fieldName] = '';
  return true;
};

const isFormValid = computed(() => {
  return (
    form.value.productName &&
    form.value.sku &&
    form.value.price &&
    form.value.quantity &&
    !Object.values(errors).some(e => e)
  );
});

const calculateDiscount = () => {
  if (form.value.features.isOnSale) {
    return form.value.price * form.value.quantity * 0.1; // 10% discount
  }
  return 0;
};

const calculateTotal = () => {
  const subtotal = form.value.price * form.value.quantity;
  return subtotal - calculateDiscount();
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const submitForm = async () => {
  let isValid = true;
  Object.keys(validationRules).forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (isValid) {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.value)
      });

      if (response.ok) {
        submitted.value = true;
        error.value = '';
      } else {
        error.value = 'Error submitting form. Please try again.';
      }
    } catch (err) {
      error.value = 'Network error. Please check your connection.';
    }
  }
};
</script>

<style scoped>
.advanced-form-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
}

form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

fieldset {
  margin-bottom: 25px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 0.95rem;
}

.error {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 4px;
}

.form-summary {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.summary-item.total {
  font-size: 1.1rem;
  font-weight: 600;
  border-top: 1px solid #ddd;
  padding-top: 8px;
  margin-top: 8px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-reset {
  background-color: #6c757d;
  color: white;
}

.btn-reset:hover {
  background-color: #5a6268;
}

.btn-submit {
  background-color: #28a745;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background-color: #218838;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  font-weight: 500;
}

.message-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
```

---

## Form Best Practices

1. **Real-time Validation**
   - Validate on blur and input
   - Show immediate feedback
   - Don't overwhelm with errors

2. **Clear Error Messages**
   - Be specific about what's wrong
   - Suggest how to fix it
   - Use consistent formatting

3. **Accessibility**
   - Use proper labels
   - Associate labels with inputs
   - Support keyboard navigation

4. **User Experience**
   - Disable submit button when invalid
   - Show progress/status
   - Confirm sensitive actions

5. **Security**
   - Validate on both client and server
   - Sanitize user input
   - Use HTTPS for sensitive data
   - Implement CSRF protection


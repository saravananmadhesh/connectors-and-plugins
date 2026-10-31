# TextBox Getting Started - Vue 3

## Table of Contents

1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [Floating Labels](#floating-labels)
4. [Icons and Adornments](#icons-and-adornments)
5. [Validation](#validation)
6. [Accessibility](#accessibility)

---

## Installation

```bash
npm install @syncfusion/ej2-vue-inputs @syncfusion/ej2-base
```

---

## Basic Setup

```vue
<template>
  <div class="textbox-container">
    <label for="username">Username:</label>
    <TextBoxComponent
      id="username"
      v-model="username"
      type="text"
      placeholder="Enter your username"
      @change="onTextChange"
    />
    <p>Input: {{ username }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/textbox/index.css";

const username = ref('');

const onTextChange = (args) => {
  console.log('Username changed to:', args.value);
};
</script>

<style scoped>
.textbox-container {
  max-width: 400px;
  padding: 20px;
}
</style>
```

---

## Quick Start

### Minimal TextBox

```vue
<template>
  <TextBoxComponent v-model="name" />
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const name = ref('');
</script>
```

### With Placeholder

```vue
<template>
  <TextBoxComponent
    v-model="email"
    type="email"
    placeholder="Enter your email"
  />
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const email = ref('');
</script>
```

---

## Floating Labels

Enable floating label that animates up when input is focused or has value:

```vue
<template>
  <div class="textbox-group">
    <TextBoxComponent
      v-model="fullName"
      :floatLabelType="'Auto'"
      placeholder="Full Name"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const fullName = ref('');
</script>
```

### Float Label Types

```vue
<template>
  <div>
    <!-- Floats on focus -->
    <TextBoxComponent
      v-model="input1"
      :floatLabelType="'Focus'"
      placeholder="Focus to float"
    />

    <!-- Always floats -->
    <TextBoxComponent
      v-model="input2"
      :floatLabelType="'Always'"
      placeholder="Always floated"
    />

    <!-- Floats on focus or has value -->
    <TextBoxComponent
      v-model="input3"
      :floatLabelType="'Auto'"
      placeholder="Auto float"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
</script>
```

---

## Icons and Adornments

### Icon with Text

```vue
<template>
  <div class="input-with-icon">
    <TextBoxComponent
      v-model="email"
      type="email"
      placeholder="Email"
      class="email-input"
    />
    <span class="input-icon">📧</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const email = ref('');
</script>

<style scoped>
.input-with-icon {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.email-input {
  padding-right: 40px;
}
</style>
```

---

## Validation

### Real-Time Validation

```vue
<template>
  <div class="validation-container">
    <TextBoxComponent
      v-model="email"
      type="email"
      placeholder="Enter email"
      @blur="validateEmail"
    />
    <span v-if="emailError" class="error">{{ emailError }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const email = ref('');
const emailError = ref('');

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value && !emailRegex.test(email.value)) {
    emailError.value = 'Invalid email address';
  } else {
    emailError.value = '';
  }
};
</script>

<style scoped>
.error {
  color: #dc3545;
  font-size: 12px;
  display: block;
  margin-top: 5px;
}
</style>
```

### Min/Max Length

```vue
<template>
  <div>
    <TextBoxComponent
      v-model="password"
      type="password"
      placeholder="Password (8-20 chars)"
      maxlength="20"
    />
    <p>{{ password.length }} / 20</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const password = ref('');
</script>
```

---

## Accessibility

### ARIA Labels

```vue
<template>
  <div class="form-group">
    <label for="search">Search:</label>
    <TextBoxComponent
      id="search"
      v-model="searchTerm"
      aria-label="Search products"
      aria-describedby="search-help"
      placeholder="Search..."
    />
    <small id="search-help">Enter product name or SKU</small>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const searchTerm = ref('');
</script>
```

---

## Complete Example: Login Form

```vue
<template>
  <div class="login-container">
    <h2>Login</h2>
    
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <TextBoxComponent
          v-model="username"
          :floatLabelType="'Auto'"
          placeholder="Username"
          required
        />
      </div>

      <div class="form-group">
        <TextBoxComponent
          v-model="password"
          type="password"
          :floatLabelType="'Auto'"
          placeholder="Password"
          required
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

const username = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);
const successMessage = ref('');

const handleLogin = async () => {
  error.value = '';
  successMessage.value = '';

  if (!username.value || !password.value) {
    error.value = 'Please enter both username and password';
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    if (response.ok) {
      successMessage.value = 'Login successful!';
      username.value = '';
      password.value = '';
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } else {
      error.value = 'Invalid username or password';
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.';
    console.error('Login error:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  padding: 10px;
  border-radius: 4px;
  margin-top: 15px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
```


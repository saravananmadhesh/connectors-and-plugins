# TextArea Getting Started - Vue 3

## Table of Contents

1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [Floating Labels](#floating-labels)
4. [Auto Resize](#auto-resize)
5. [Character Count](#character-count)
6. [Validation](#validation)
7. [Accessibility](#accessibility)

---

## Installation

```bash
npm install @syncfusion/ej2-vue-inputs @syncfusion/ej2-base
```

---

## Basic Setup

```vue
<template>
  <div class="textarea-container">
    <label for="message">Message:</label>
    <TextAreaComponent
      id="message"
      v-model="message"
      placeholder="Enter your message"
      :rows="4"
      @change="onChange"
    />
    <p>{{ message.length }} characters</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/textarea/index.css";

const message = ref('');

const onChange = (args) => {
  console.log('TextArea changed:', args.value);
};
</script>

<style scoped>
.textarea-container {
  max-width: 500px;
  padding: 20px;
}
</style>
```

---

## Quick Start

### Minimal TextArea

```vue
<template>
  <TextAreaComponent
    v-model="feedback"
    placeholder="Your feedback"
    :rows="5"
  />
</template>

<script setup>
import { ref } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';

const feedback = ref('');
</script>
```

### With Columns

```vue
<template>
  <TextAreaComponent
    v-model="content"
    :rows="6"
    :cols="40"
    placeholder="Write content here"
  />
</template>

<script setup>
import { ref } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';

const content = ref('');
</script>
```

---

## Floating Labels

```vue
<template>
  <div>
    <!-- Auto float -->
    <TextAreaComponent
      v-model="comment"
      :floatLabelType="'Auto'"
      placeholder="Add a comment"
      :rows="4"
    />

    <!-- Always float -->
    <TextAreaComponent
      v-model="description"
      :floatLabelType="'Always'"
      placeholder="Product description"
      :rows="4"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';

const comment = ref('');
const description = ref('');
</script>
```

---

## Auto Resize

Enable automatic resize as user types:

```vue
<template>
  <div class="auto-resize-demo">
    <label>Auto-resizing TextArea:</label>
    <TextAreaComponent
      v-model="autoResizeText"
      placeholder="Type to auto-resize"
      :autoResize="true"
      :rows="3"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';

const autoResizeText = ref('');
</script>

<style scoped>
.auto-resize-demo {
  max-width: 500px;
}

.auto-resize-demo :deep(.e-textarea) {
  resize: none;
  overflow: hidden;
}
</style>
```

---

## Character Count

### Display Character Count

```vue
<template>
  <div class="char-count-demo">
    <label>Comment (Max 500 chars):</label>
    <TextAreaComponent
      v-model="comment"
      placeholder="Write your comment"
      :maxLength="500"
      :rows="4"
    />
    <div class="char-counter">
      <span :class="{ warning: comment.length > 450 }">
        {{ comment.length }} / 500
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';

const comment = ref('');

const percentUsed = computed(() => {
  return Math.round((comment.value.length / 500) * 100);
});
</script>

<style scoped>
.char-counter {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.char-counter .warning {
  color: #ff9800;
  font-weight: bold;
}
</style>
```

### Character Counter with Progress Bar

```vue
<template>
  <div class="counter-with-progress">
    <TextAreaComponent
      v-model="reviewText"
      placeholder="Write your product review (min 50, max 1000 chars)"
      :maxLength="1000"
      :rows="5"
    />

    <div class="progress-container">
      <div class="progress-bar" :style="{ width: percentUsed + '%' }"></div>
    </div>

    <div class="counter-info">
      <span :class="charCountClass">
        {{ reviewText.length }} / 1000
      </span>
      <span v-if="reviewText.length < 50" class="hint">
        ({{ 50 - reviewText.length }} more characters needed)
      </span>
      <span v-if="reviewText.length >= 50" class="valid">
        ✓ Valid
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';

const reviewText = ref('');

const percentUsed = computed(() => {
  return (reviewText.value.length / 1000) * 100;
});

const charCountClass = computed(() => {
  if (reviewText.value.length < 50) return 'insufficient';
  if (reviewText.value.length > 900) return 'warning';
  return 'valid';
});
</script>

<style scoped>
.counter-with-progress {
  max-width: 500px;
}

.progress-container {
  margin: 12px 0;
  background-color: #f0f0f0;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  background-color: #007bff;
  height: 100%;
  transition: width 0.2s ease;
}

.counter-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-top: 8px;
}

.insufficient {
  color: #dc3545;
}

.warning {
  color: #ff9800;
}

.valid {
  color: #28a745;
}

.hint {
  color: #666;
}
</style>
```

---

## Validation

### Required Field Validation

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="bio">Bio (Required):</label>
      <TextAreaComponent
        id="bio"
        v-model="bio"
        placeholder="Tell us about yourself"
        :rows="4"
        required
      />
      <span v-if="bioError" class="error">{{ bioError }}</span>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';

const bio = ref('');
const bioError = ref('');

const submitForm = () => {
  bioError.value = '';

  if (!bio.value.trim()) {
    bioError.value = 'Bio is required';
    return;
  }

  if (bio.value.length < 20) {
    bioError.value = 'Bio must be at least 20 characters';
    return;
  }

  console.log('Form submitted:', { bio: bio.value });
  alert('Form submitted successfully!');
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

---

## Accessibility

### ARIA Labels and Descriptions

```vue
<template>
  <div class="form-group">
    <label for="feedback">Feedback:</label>
    <TextAreaComponent
      id="feedback"
      v-model="userFeedback"
      aria-label="User feedback"
      aria-describedby="feedback-help"
      placeholder="Share your feedback"
      :rows="4"
    />
    <small id="feedback-help">
      Please be specific and constructive. Max 500 characters.
    </small>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';

const userFeedback = ref('');
</script>
```

---

## Complete Example: Contact Form

```vue
<template>
  <div class="contact-form">
    <h2>Contact Us</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
        />
      </div>

      <div class="form-group">
        <label for="subject">Subject:</label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          required
        />
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <TextAreaComponent
          id="message"
          v-model="form.message"
          :floatLabelType="'Auto'"
          placeholder="Your message"
          :rows="6"
          :maxLength="1000"
        />
        <div class="char-count">
          {{ form.message.length }} / 1000
        </div>
      </div>

      <div v-if="formError" class="error-message">
        {{ formError }}
      </div>

      <div class="actions">
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
        <button type="reset" @click="resetForm">
          Clear
        </button>
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { TextAreaComponent } from '@syncfusion/ej2-vue-inputs';

const isSubmitting = ref(false);
const formError = ref('');
const successMessage = ref('');

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const submitForm = async () => {
  formError.value = '';
  successMessage.value = '';

  // Validate form
  if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
    formError.value = 'All fields are required';
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      successMessage.value = 'Message sent successfully! We\'ll get back to you soon.';
      resetForm();
    } else {
      formError.value = 'Failed to send message. Please try again.';
    }
  } catch (error) {
    formError.value = 'An error occurred. Please try again later.';
    console.error('Submit error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
  formError.value = '';
};
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  padding: 12px;
  border-radius: 4px;
  margin-top: 20px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 25px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #0056b3;
}

button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button[type="reset"] {
  background-color: #6c757d;
  color: white;
}

button[type="reset"]:hover {
  background-color: #5a6268;
}
</style>
```


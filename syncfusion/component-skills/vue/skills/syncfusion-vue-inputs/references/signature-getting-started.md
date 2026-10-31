# Signature Getting Started - Vue 3

## Installation

```bash
npm install @syncfusion/ej2-vue-inputs @syncfusion/ej2-base
```

---

## Basic Setup

```vue
<template>
  <div class="signature-container">
    <h2>Digital Signature</h2>
    <SignatureComponent
      ref="signatureRef"
      :width="500"
      :height="300"
      @change="onSignatureChange"
    />
    <div class="actions">
      <button @click="clear">Clear</button>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SignatureComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/signature/index.css";

const signatureRef = ref(null);
const signatureData = ref('');

const onSignatureChange = (args) => {
  signatureData.value = args.base64String;
};

const clear = () => {
  signatureRef.value?.clear();
};

const save = () => {
  const base64 = signatureRef.value?.getSignature();
  console.log('Signature saved:', base64);
};
</script>

<style scoped>
.signature-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-child {
  background-color: #6c757d;
  color: white;
}

button:last-child {
  background-color: #007bff;
  color: white;
}
</style>
```

---

## Complete Example: Document Signing

```vue
<template>
  <div class="document-signing">
    <h2>Electronic Document Signature</h2>

    <div class="document-preview">
      <h3>Document to Sign</h3>
      <div class="document-content">
        <h4>Terms and Conditions Agreement</h4>
        <p>
          By signing below, you agree to the terms and conditions outlined in this document.
          Please read carefully before proceeding.
        </p>
        <p class="terms-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
          [Document content here]
        </p>
      </div>
    </div>

    <div class="signature-form">
      <div class="form-group">
        <label>Signer Name:</label>
        <input v-model="signerName" type="text" placeholder="Full name" />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="signerEmail" type="email" placeholder="Email address" />
      </div>

      <div class="form-group">
        <label>Signature:</label>
        <SignatureComponent
          ref="signatureRef"
          :width="500"
          :height="250"
        />
        <p class="help-text">Click and draw your signature in the box above</p>
      </div>

      <div class="form-group">
        <label>
          <input v-model="agreeTerms" type="checkbox" />
          I agree to sign this document electronically
        </label>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="actions">
        <button @click="signDocument" :disabled="isSignging">
          {{ isSignging ? 'Signing...' : 'Sign Document' }}
        </button>
        <button @click="clearSignature" type="button" class="secondary">
          Clear Signature
        </button>
        <button @click="cancel" type="button" class="secondary">
          Cancel
        </button>
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { SignatureComponent } from '@syncfusion/ej2-vue-inputs';

const signatureRef = ref(null);
const signerName = ref('');
const signerEmail = ref('');
const agreeTerms = ref(false);
const isSignging = ref(false);
const error = ref('');
const successMessage = ref('');

const isSignatureEmpty = computed(() => {
  return !signatureRef.value || !signatureRef.value?.getSignature();
});

const signDocument = async () => {
  error.value = '';
  successMessage.value = '';

  // Validation
  if (!signerName.value.trim()) {
    error.value = 'Please enter signer name';
    return;
  }

  if (!signerEmail.value.trim()) {
    error.value = 'Please enter email address';
    return;
  }

  if (isSignatureEmpty.value) {
    error.value = 'Please provide your signature';
    return;
  }

  if (!agreeTerms.value) {
    error.value = 'You must agree to sign the document';
    return;
  }

  isSignging.value = true;

  try {
    const signatureImage = signatureRef.value?.getSignature();

    // Simulate API call to save signed document
    await new Promise(resolve => setTimeout(resolve, 1500));

    const response = await fetch('/api/sign-document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        signerName: signerName.value,
        signerEmail: signerEmail.value,
        signature: signatureImage,
        timestamp: new Date().toISOString()
      })
    });

    if (response.ok) {
      successMessage.value = 'Document signed successfully!';
      setTimeout(() => {
        resetForm();
      }, 2000);
    } else {
      error.value = 'Failed to sign document. Please try again.';
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again later.';
    console.error('Signing error:', err);
  } finally {
    isSignging.value = false;
  }
};

const clearSignature = () => {
  signatureRef.value?.clear();
};

const cancel = () => {
  resetForm();
};

const resetForm = () => {
  signerName.value = '';
  signerEmail.value = '';
  agreeTerms.value = false;
  error.value = '';
  successMessage.value = '';
  signatureRef.value?.clear();
};
</script>

<style scoped>
.document-signing {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
}

.document-preview {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  max-height: 300px;
  overflow-y: auto;
}

.document-content h4 {
  margin-top: 0;
}

.terms-text {
  color: #666;
  font-size: 12px;
  line-height: 1.6;
}

.signature-form {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input[type="checkbox"] {
  margin-right: 8px;
}

.help-text {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  padding: 12px;
  border-radius: 4px;
  margin-top: 15px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 25px;
  flex-wrap: wrap;
}

button {
  flex: 1;
  min-width: 150px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

button:not(.secondary) {
  background-color: #28a745;
  color: white;
}

button:not(.secondary):hover:not(:disabled) {
  background-color: #218838;
}

button:not(.secondary):disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button.secondary {
  background-color: #6c757d;
  color: white;
}

button.secondary:hover {
  background-color: #5a6268;
}
</style>
```

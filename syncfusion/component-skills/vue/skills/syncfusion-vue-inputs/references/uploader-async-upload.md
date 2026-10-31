# Uploader Async Upload - Vue 3

## Overview

Async upload allows files to be uploaded to a server without page refresh. The Vue Uploader component handles the HTTP requests automatically.

---

## Basic Async Configuration

```vue
<template>
  <UploaderComponent
    :asyncSettings="asyncSettings"
    :multiple="true"
    :autoUpload="true"
    @success="onSuccess"
  />
</template>

<script setup>
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';
import { reactive } from 'vue';

const asyncSettings = reactive({
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
});

const onSuccess = (args) => {
  console.log('File uploaded:', args.file.name);
};
</script>
```

---

## Server Endpoints

### Save Endpoint

Receives file data and returns success response:

**POST /api/upload/save**

**Request:**
- Form data with file(s)
- Custom headers (if configured)

**Response (JSON):**
```json
{ "success": true }
```

---

### Remove Endpoint

Receives file name(s) to delete:

**POST /api/upload/remove**

**Request:**
- Form data: `SelectedFiles=filename.pdf`

**Response (JSON):**
```json
{ "success": true }
```

---

## Auto Upload vs. Manual Upload

### Auto Upload (Immediate)

```vue
<template>
  <UploaderComponent
    :asyncSettings="asyncSettings"
    :autoUpload="true"
  />
</template>

<script setup>
const asyncSettings = {
  saveUrl: '/api/upload/save'
};
</script>
```

**Behavior:** Files upload immediately upon selection.

---

### Manual Upload (User-Triggered)

```vue
<template>
  <div>
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      :autoUpload="false"
    />
    <button @click="uploadAll">Upload All</button>
    <button @click="clearAll">Clear All</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);

const asyncSettings = {
  saveUrl: '/api/upload/save'
};

const uploadAll = () => {
  uploaderRef.value?.upload();
};

const clearAll = () => {
  uploaderRef.value?.clearAll();
};
</script>
```

**Behavior:** Files are selected but not uploaded until user clicks "Upload".

---

## Multiple vs. Single File Upload

### Multiple Files

```vue
<UploaderComponent
  :asyncSettings="asyncSettings"
  :multiple="true"
/>
```

User can select multiple files at once.

---

### Single File

```vue
<UploaderComponent
  :asyncSettings="asyncSettings"
  :multiple="false"
/>
```

User can only select one file at a time.

---

## Sequential Upload

Upload files one at a time instead of in parallel:

```vue
<template>
  <UploaderComponent
    :asyncSettings="asyncSettings"
    :sequentialUpload="true"
    @success="onSuccess"
  />
</template>

<script setup>
const asyncSettings = {
  saveUrl: '/api/upload/save'
};

const onSuccess = (args) => {
  console.log(`File ${args.file.name} uploaded`);
  // Next file will upload automatically
};
</script>
```

---

## Preloaded Files

Display files that already exist on the server:

```vue
<template>
  <UploaderComponent
    :asyncSettings="asyncSettings"
    :files="preloadedFiles"
  />
</template>

<script setup>
import { ref } from 'vue';

const asyncSettings = {
  removeUrl: '/api/upload/remove'
};

const preloadedFiles = ref([
  {
    name: 'document.pdf',
    size: 1024000,
    type: 'pdf'
  },
  {
    name: 'image.jpg',
    size: 2048000,
    type: 'jpg'
  }
]);
</script>
```

---

## Custom Headers

Add authentication tokens or other headers via the `uploading` event:

```vue
<template>
  <UploaderComponent
    :asyncSettings="asyncSettings"
    @uploading="onUploading"
  />
</template>

<script setup>
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const asyncSettings = {
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
};

const onUploading = (args) => {
  // Add authorization header
  args.customFormData = [
    {
      key: 'authorization',
      value: `Bearer ${getAuthToken()}`
    },
    {
      key: 'userId',
      value: getCurrentUserId()
    }
  ];
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const getCurrentUserId = () => {
  return localStorage.getItem('userId');
};
</script>
```

---

## Handle Upload Events

```vue
<template>
  <div>
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      @uploading="onUploading"
      @success="onSuccess"
      @failure="onFailure"
      @progress="onProgress"
      @beforeUpload="onBeforeUpload"
    />
    <div v-if="uploadProgress" class="progress">
      <div class="progress-bar" :style="{ width: uploadProgress + '%' }">
        {{ uploadProgress }}%
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);
const uploadProgress = ref(0);

const asyncSettings = reactive({
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
});

const onBeforeUpload = (args) => {
  console.log('Before upload:', args.file.name);
  // Validate file before upload
  if (args.file.size > 50 * 1024 * 1024) {
    args.cancel = true;
    console.error('File too large');
  }
};

const onUploading = (args) => {
  console.log('Uploading:', args.file.name);
};

const onProgress = (args) => {
  uploadProgress.value = Math.round(args.percentComplete);
  console.log(`Progress: ${uploadProgress.value}%`);
};

const onSuccess = (args) => {
  uploadProgress.value = 0;
  console.log('Upload successful:', args.file.name);
};

const onFailure = (args) => {
  uploadProgress.value = 0;
  console.error('Upload failed:', args.statusText);
};
</script>

<style scoped>
.progress {
  margin-top: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  height: 20px;
  overflow: hidden;
}

.progress-bar {
  background-color: #007bff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  transition: width 0.3s ease;
}
</style>
```

---

## Error Handling

```vue
<template>
  <div>
    <UploaderComponent
      :asyncSettings="asyncSettings"
      @failure="onFailure"
    />
    <div v-if="errorMessage" class="error-banner">
      ⚠️ {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const asyncSettings = {
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
};

const errorMessage = ref('');

const onFailure = (args) => {
  const fileName = args.file?.name || 'Unknown file';
  const statusText = args.statusText || 'Upload failed';
  
  errorMessage.value = `Failed to upload ${fileName}: ${statusText}`;
  
  // Auto-clear error after 5 seconds
  setTimeout(() => {
    errorMessage.value = '';
  }, 5000);
};
</script>

<style scoped>
.error-banner {
  margin-top: 15px;
  padding: 12px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  color: #721c24;
}
</style>
```

---

## Complete Example: Form with Async Upload

```vue
<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Name:</label>
        <input v-model="form.name" type="text" required />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label>Resume:</label>
        <UploaderComponent
          ref="uploaderRef"
          :asyncSettings="asyncSettings"
          :multiple="false"
          :autoUpload="false"
          @success="onUploadSuccess"
        />
      </div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Submitting...' : 'Submit' }}
      </button>
    </form>

    <div v-if="successMessage" class="success-message">
      ✓ {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);
const isSubmitting = ref(false);
const successMessage = ref('');

const form = reactive({
  name: '',
  email: '',
  resumeUploaded: false
});

const asyncSettings = {
  saveUrl: '/api/upload/save'
};

const onUploadSuccess = (args) => {
  form.resumeUploaded = true;
  console.log('Resume uploaded:', args.file.name);
};

const submitForm = async () => {
  if (!form.resumeUploaded) {
    alert('Please upload your resume first');
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch('/api/submit-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email
      })
    });

    if (response.ok) {
      successMessage.value = 'Application submitted successfully!';
      form.name = '';
      form.email = '';
      form.resumeUploaded = false;
      uploaderRef.value?.clearAll();
    } else {
      alert('Submission failed. Please try again.');
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('An error occurred. Please try again.');
  } finally {
    isSubmitting.value = false;
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
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success-message {
  margin-top: 20px;
  padding: 12px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
}
</style>
```


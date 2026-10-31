# Uploader Getting Started - Vue 3

## Table of Contents

1. [Installation](#installation)
2. [License Registration](#license-registration)
3. [Basic Setup](#basic-setup)
4. [Quick Start](#quick-start)
5. [Async Upload Configuration](#async-upload-configuration)
6. [Drop Area Setup](#drop-area-setup)
7. [Event Handling](#event-handling)
8. [Styling](#styling)

---

## Installation

Install the Syncfusion Vue Uploader component via npm:

```bash
npm install @syncfusion/ej2-vue-inputs @syncfusion/ej2-base
```

Verify installation:
```bash
npm list @syncfusion/ej2-vue-inputs
```

---

## License Registration

If you're using Syncfusion components in a licensed project, register your license key in your main.ts/main.js:

```typescript
// main.ts
import { registerLicense } from '@syncfusion/ej2-base';

// Replace with your actual license key
registerLicense('YOUR_LICENSE_KEY_HERE');

import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

**⚠️ Security Note:** Never commit license keys to version control. Use environment variables:

```typescript
const licenseKey = import.meta.env.VITE_SYNCFUSION_LICENSE;
registerLicense(licenseKey);
```

---

## Basic Setup

Create a basic Vue 3 SFC (Single File Component) with the Uploader:

```vue
<template>
  <div class="app-container">
    <h1>File Uploader</h1>
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      @success="onSuccess"
      @failure="onFailure"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/uploader/index.css";

// Component reference for imperative method calls
const uploaderRef = ref(null);

// Server endpoints for upload/remove operations
const asyncSettings = {
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
};

// Success handler
const onSuccess = (args) => {
  console.log('File uploaded successfully:', args.file.name);
};

// Failure handler
const onFailure = (args) => {
  console.error('Upload failed:', args.file.name, args.statusText);
};
</script>

<style scoped>
.app-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
```

---

## Quick Start

### Minimal Uploader

For a minimal uploader setup with auto-upload:

```vue
<template>
  <div>
    <h2>Upload Files</h2>
    <UploaderComponent
      :asyncSettings="{ saveUrl: '/api/upload/save' }"
      :autoUpload="true"
      :multiple="true"
    />
  </div>
</template>

<script setup>
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/uploader/index.css";
</script>
```

### Manual Upload

For manual upload (user clicks "Upload" button):

```vue
<template>
  <div>
    <h2>Upload Files</h2>
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="{ saveUrl: '/api/upload/save' }"
      :autoUpload="false"
      @selected="onFilesSelected"
    />
    <button @click="uploadAll" class="upload-btn">Upload All Files</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);
const selectedCount = ref(0);

const onFilesSelected = (args) => {
  selectedCount.value = args.filesData.length;
  console.log(`${args.filesData.length} files selected`);
};

const uploadAll = () => {
  if (uploaderRef.value) {
    uploaderRef.value.upload();
  }
};
</script>
```

---

## Async Upload Configuration

Configure async upload with `saveUrl` and `removeUrl`:

```vue
<template>
  <UploaderComponent
    ref="uploaderRef"
    :asyncSettings="asyncSettings"
    :autoUpload="false"
    :multiple="true"
    @success="onSuccess"
    @failure="onFailure"
    @beforeUpload="onBeforeUpload"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);

// Async settings with server URLs
const asyncSettings = reactive({
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
});

const onSuccess = (args) => {
  console.log('Upload completed:', {
    operation: args.operation,
    fileName: args.file.name,
    status: args.statusCode
  });
};

const onFailure = (args) => {
  console.error('Upload failed:', {
    operation: args.operation,
    fileName: args.file.name,
    statusText: args.statusText
  });
};

const onBeforeUpload = (args) => {
  // Add custom headers before upload
  args.customFormData = [
    {
      key: 'authorization',
      value: `Bearer ${getAuthToken()}`
    }
  ];
};

const getAuthToken = () => {
  // Retrieve from secure session store, not hardcoded
  return localStorage.getItem('authToken');
};
</script>
```

---

## Drop Area Setup

Configure the drop area for drag-and-drop upload:

```vue
<template>
  <div class="uploader-wrapper">
    <div ref="dropAreaRef" class="drop-zone">
      <p>Drag and drop files here</p>
    </div>
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      :dropArea="dropAreaRef"
      @selected="onFilesSelected"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const dropAreaRef = ref(null);
const uploaderRef = ref(null);

const asyncSettings = {
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
};

const onFilesSelected = (args) => {
  console.log('Files selected via drop zone:', args.filesData.length);
};

// Pass the drop area element to UploaderComponent
onMounted(() => {
  if (uploaderRef.value && dropAreaRef.value) {
    uploaderRef.value.dropArea = dropAreaRef.value;
  }
});
</script>

<style scoped>
.drop-zone {
  border: 2px dashed #ccc;
  padding: 40px;
  text-align: center;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.drop-zone:hover {
  border-color: #007bff;
  background-color: #f0f8ff;
}
</style>
```

---

## Event Handling

Handle all Uploader events in Vue 3:

```vue
<template>
  <div>
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      @selected="onSelected"
      @uploading="onUploading"
      @success="onSuccess"
      @failure="onFailure"
      @removing="onRemoving"
      @progress="onProgress"
      @pausing="onPausing"
      @resuming="onResuming"
      @created="onCreated"
    />
    <div v-if="status" class="status-message">{{ status }}</div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);
const status = ref('');

const asyncSettings = {
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
};

const eventLog = reactive({
  events: []
});

const logEvent = (eventName, details) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${eventName}:`, details);
  eventLog.events.push({ eventName, timestamp, details });
};

const onSelected = (args) => {
  status.value = `${args.filesData.length} files selected`;
  logEvent('selected', { fileCount: args.filesData.length });
};

const onUploading = (args) => {
  status.value = `Uploading: ${args.file.name}`;
  logEvent('uploading', { fileName: args.file.name });
};

const onSuccess = (args) => {
  status.value = `Success: ${args.file.name}`;
  logEvent('success', { fileName: args.file.name, statusCode: args.statusCode });
};

const onFailure = (args) => {
  status.value = `Error: ${args.file.name}`;
  logEvent('failure', { fileName: args.file.name, statusText: args.statusText });
};

const onRemoving = (args) => {
  logEvent('removing', { fileName: args.filesData[0]?.name });
};

const onProgress = (args) => {
  logEvent('progress', { 
    fileName: args.file.name, 
    percentComplete: args.percentComplete 
  });
};

const onPausing = (args) => {
  status.value = `Paused: ${args.file.name}`;
  logEvent('pausing', { fileName: args.file.name });
};

const onResuming = (args) => {
  status.value = `Resuming: ${args.file.name}`;
  logEvent('resuming', { fileName: args.file.name });
};

const onCreated = () => {
  logEvent('created', { message: 'Uploader component created' });
};
</script>

<style scoped>
.status-message {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f0f0f0;
}
</style>
```

---

## Styling

### Global Styles

Import theme styles in your main app file or component:

```vue
<script setup>
import "@syncfusion/ej2-material3-theme/styles/uploader/index.css";
</script>
```

### Custom Styling

Override component styles with scoped styles:

```vue
<template>
  <div class="custom-uploader">
    <UploaderComponent ref="uploaderRef" />
  </div>
</template>

<style scoped>
.custom-uploader :deep(.e-upload) {
  border: 2px solid #007bff;
  border-radius: 8px;
}

.custom-uploader :deep(.e-upload .e-file-select) {
  background-color: #007bff;
  color: white;
}

.custom-uploader :deep(.e-upload .e-file-select:hover) {
  background-color: #0056b3;
}
</style>
```

**Note:** Use `:deep()` to style child components in scoped styles.

---

## Complete Working Example

```vue
<template>
  <div class="uploader-app">
    <div class="header">
      <h1>Vue 3 File Uploader</h1>
      <p>Upload files with drag-and-drop support</p>
    </div>

    <div class="uploader-section">
      <div ref="dropZoneRef" class="drop-zone">
        <div class="drop-zone-content">
          <p class="drop-zone-icon">📁</p>
          <p class="drop-zone-text">Drag files here or click to browse</p>
        </div>
      </div>

      <UploaderComponent
        ref="uploaderRef"
        :asyncSettings="asyncSettings"
        :dropArea="dropZoneRef"
        :multiple="true"
        :autoUpload="false"
        :buttons="{ browse: 'Browse Files', upload: 'Upload', clear: 'Clear' }"
        @selected="onSelected"
        @success="onSuccess"
        @failure="onFailure"
        @progress="onProgress"
      />
    </div>

    <div v-if="uploadStatus" class="status-panel">
      <h3>Status</h3>
      <p class="status-message">{{ uploadStatus }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/uploader/index.css";

const uploaderRef = ref(null);
const dropZoneRef = ref(null);
const uploadStatus = ref('');

const asyncSettings = {
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
};

const onSelected = (args) => {
  uploadStatus.value = `${args.filesData.length} file(s) selected. Ready to upload.`;
};

const onSuccess = (args) => {
  uploadStatus.value = `✓ ${args.file.name} uploaded successfully!`;
};

const onFailure = (args) => {
  uploadStatus.value = `✗ Failed to upload ${args.file.name}: ${args.statusText}`;
};

const onProgress = (args) => {
  const progress = Math.round(args.percentComplete);
  uploadStatus.value = `Uploading ${args.file.name}... ${progress}%`;
};
</script>

<style scoped>
.uploader-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.uploader-section {
  margin-bottom: 30px;
}

.drop-zone {
  border: 3px dashed #007bff;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.drop-zone:hover {
  border-color: #0056b3;
  background-color: #e7f3ff;
}

.drop-zone-icon {
  font-size: 48px;
  margin: 0;
}

.drop-zone-text {
  margin: 10px 0 0 0;
  color: #666;
}

.status-panel {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
}

.status-message {
  color: #333;
  margin: 0;
}
</style>
```

---

## Next Steps

- Configure **async upload** settings for your backend: [references/uploader-async-upload.md](uploader-async-upload.md)
- Set up **chunk upload** for large files: [references/uploader-chunk-upload.md](uploader-chunk-upload.md)
- Add **file validation**: [references/uploader-validation.md](uploader-validation.md)
- Customize **templates**: [references/uploader-template-customization.md](uploader-template-customization.md)

# File Upload Events in Vue Modern Rich Text Editor

## Table of Contents

- [Overview](#overview)
- [Supported File Types](#supported-file-types)
- [Configuration](#configuration)
- [Event Handling](#event-handling)
- [Examples](#examples)
- [API References](#api-references)

---

## Overview

The Modern Rich Text Editor provides comprehensive file upload functionality for images and other media with a complete event lifecycle. Handle files at different stages:

- **Before Upload** — `fileSelected` event for validation
- **During Upload** — `fileUploading` event for customization
- **After Upload** — `fileUploadSuccess` or `fileUploadFailed` events
- **Removal** — `fileRemoving` event for cleanup

---

## Supported File Types

### Image Types

Default allowed image types:
- `.jpg`, `.jpeg` — JPEG images
- `.png` — PNG images
- `.gif` — Animated GIFs
- `.bmp` — Bitmap images
- `.webp` — WebP images
- `.svg` — SVG images (vector)

### Configuration

```typescript
const imageSettings = {
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
  maxFileSize: 30000000  // 30MB in bytes
};
```

---

## Configuration

### Image Settings

```typescript
const imageSettings = ref({
  // File type restrictions
  allowedTypes: ['.jpg', '.png', '.gif'],
  
  // Maximum file size (in bytes)
  maxFileSize: 5000000,  // 5MB
  
  // Upload URL (server endpoint)
  url: 'https://your-api.com/upload',
  
  // Save URL (for database storage)
  saveUrl: 'https://your-api.com/save',
  
  // Remove URL (for deletion)
  removeUrl: 'https://your-api.com/remove'
});
```

---

## Event Handling

### Complete Event Lifecycle Example

```vue
<template>
  <div>
    <ejs-richtexteditor-ui
      :imageSettings="imageSettings"
      @fileSelected="onFileSelected"
      @fileUploading="onFileUploading"
      @fileUploadSuccess="onFileUploadSuccess"
      @fileUploadFailed="onFileUploadFailed"
      @fileRemoving="onFileRemoving">
    </ejs-richtexteditor-ui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const imageSettings = ref({
  allowedTypes: ['.jpg', '.png', '.gif'],
  maxFileSize: 5000000
});

// Stage 1: File Selection - Validate before upload
const onFileSelected = (args) => {
  console.log('Files selected:', args.files);
  
  // Validate file count
  if (args.files.length > 5) {
    console.warn('Too many files selected');
    args.cancel = true;
    return;
  }
  
  // Validate file size
  for (const file of args.files) {
    if (file.size > imageSettings.value.maxFileSize) {
      console.warn(`File ${file.name} exceeds size limit`);
      args.cancel = true;
    }
  }
};

// Stage 2: Uploading - Customize upload data
const onFileUploading = (args) => {
  console.log(`Uploading: ${args.file.name}`);
  
  // Add custom headers or form data
  if (args.customFormData) {
    args.customFormData.append('userId', 'user123');
    args.customFormData.append('timestamp', new Date().toISOString());
  }
};

// Stage 3: Upload Success - Handle successful upload
const onFileUploadSuccess = (args) => {
  console.log(`Upload successful: ${args.file.name}`);
  console.log('Response:', args.response);
  
  // Handle server response
  if (args.statusCode === 200) {
    const imageUrl = args.response.imageUrl;
    console.log('Image URL:', imageUrl);
  }
};

// Stage 4: Upload Failed - Handle errors
const onFileUploadFailed = (args) => {
  console.error(`Upload failed for ${args.file.name}`);
  console.error('Error:', args.error);
  
  // Show user-friendly error messages
  if (args.statusCode === 413) {
    alert('File is too large');
  } else if (args.statusCode === 415) {
    alert('File type not supported');
  } else {
    alert(`Upload failed: ${args.error.message}`);
  }
};

// Stage 5: Removing - Confirm before deletion
const onFileRemoving = (args) => {
  console.log(`Removing file: ${args.file.name}`);
  
  // Confirm before deletion
  const confirmed = confirm(`Delete ${args.file.name}?`);
  if (!confirmed) {
    args.cancel = true;
  }
};
</script>
```

---

## Examples

### Example 1: Simple Image Upload

```vue
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :imageSettings="imageSettings"
    placeholder="Insert images using the Image button...">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = ref({
  items: ['Image']
});

const imageSettings = ref({
  allowedTypes: ['.jpg', '.png', '.gif'],
  maxFileSize: 30000000
});
</script>
```

### Example 2: Upload with Validation

```vue
<template>
  <ejs-richtexteditor-ui
    :imageSettings="imageSettings"
    @fileSelected="validateFiles"
    @fileUploadSuccess="handleSuccess"
    @fileUploadFailed="handleError">
  </ejs-richtexteditor-ui>
</template>

<script setup>
const imageSettings = ref({
  allowedTypes: ['.jpg', '.png'],
  maxFileSize: 5000000  // 5MB
});

const validateFiles = (args) => {
  args.files.forEach(file => {
    // Check file type
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!imageSettings.value.allowedTypes.includes(ext)) {
      args.cancel = true;
    }
    
    // Check file size
    if (file.size > imageSettings.value.maxFileSize) {
      args.cancel = true;
    }
  });
};

const handleSuccess = (args) => {
  console.log(`${args.file.name} uploaded successfully`);
};

const handleError = (args) => {
  console.error(`Failed to upload ${args.file.name}`);
};
</script>
```

---

## API References

### FileSelectedEventArgs

Event arguments fired when a file is selected for upload.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fileselectedeventargs`

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `files` | `File[]` | Selected file objects |
| `cancel` | `boolean` | Set to true to cancel upload |

**Usage Example:**

```vue
<script setup>
const onFileSelected = (args) => {
  console.log('Files selected:', args.files);
  
  // Validate file size
  for (const file of args.files) {
    if (file.size > 5000000) {
      console.warn(`File ${file.name} exceeds size limit`);
      args.cancel = true;
    }
  }
};
</script>
```

---

### FileUploadingEventArgs

Event arguments fired during file upload.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fileuploadingeventargs`

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `file` | `File` | Current file being uploaded |
| `cancel` | `boolean` | Set to true to cancel upload |
| `customFormData` | `FormData` | Add custom data to form |

**Usage Example:**

```vue
<script setup>
const onFileUploading = (args) => {
  console.log(`Uploading: ${args.file.name}`);
  
  // Add custom headers or data
  if (args.customFormData) {
    args.customFormData.append('userId', 'user123');
    args.customFormData.append('timestamp', new Date().toISOString());
  }
};
</script>
```

---

### FileUploadSuccessEventArgs

Event arguments fired when file upload succeeds.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fileuploadsuccesseventargs`

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `file` | `File` | Uploaded file object |
| `response` | `any` | Server response |
| `statusCode` | `number` | HTTP status code |

**Usage Example:**

```vue
<script setup>
const onFileUploadSuccess = (args) => {
  console.log(`Upload successful: ${args.file.name}`);
  console.log('Response:', args.response);
  
  // Handle server response
  if (args.statusCode === 200) {
    const imageUrl = args.response.imageUrl;
    console.log('Image URL:', imageUrl);
  }
};
</script>
```

---

### FileUploadFailedEventArgs

Event arguments fired when file upload fails.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fileuploadfailedeventargs`

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `file` | `File` | Failed file object |
| `error` | `Error` | Error details |
| `statusCode` | `number` | HTTP status code |

**Usage Example:**

```vue
<script setup>
const onFileUploadFailed = (args) => {
  console.error(`Upload failed for ${args.file.name}`);
  console.error('Error:', args.error);
  console.error('Status code:', args.statusCode);
  
  // Show user-friendly error message
  if (args.statusCode === 413) {
    alert('File is too large');
  } else if (args.statusCode === 415) {
    alert('File type not supported');
  }
};
</script>
```

---

### FileRemovingEventArgs

Event arguments fired before a file is removed.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fileremovingeventargs`

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `file` | `File` | File to be removed |
| `cancel` | `boolean` | Set to true to prevent removal |
| `imageUrl` | `string` | URL of image being removed |

**Usage Example:**

```vue
<script setup>
const onFileRemoving = (args) => {
  console.log(`Removing file: ${args.file.name}`);
  
  // Confirm before deletion
  const confirmed = confirm(`Delete ${args.file.name}?`);
  if (!confirmed) {
    args.cancel = true;
  }
};
</script>
```

---

## Related Documentation

- [Images](image.md)
- [Editor Events](editor-events.md)
- [Getting Started](getting-started.md)

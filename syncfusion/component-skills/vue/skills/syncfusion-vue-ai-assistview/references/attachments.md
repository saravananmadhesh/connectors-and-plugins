````markdown
# File Attachments in AI AssistView

## Table of Contents
- [Overview](#overview)
- [Enabling Attachments](#enabling-attachments)
- [Attachment Settings](#attachment-settings)
- [File Validation](#file-validation)
- [Attachment Templates](#attachment-templates)
- [Upload Configuration](#upload-configuration)
- [Attachment Events](#attachment-events)
- [Working with Attached Files](#working-with-attached-files)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Overview

The AI AssistView component supports file attachments, allowing users to upload files along with their prompts. This is useful for scenarios where users need to provide documents, images, or other files for AI processing.

### Key Features
- Multiple file upload support
- File type restrictions
- File size validation
- Custom upload endpoints
- Real-time upload progress
- Event-driven architecture
- Attached files in prompt data

## Enabling Attachments

### Basic Setup

Enable file attachments by setting the `enableAttachments` property to `true`:

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :enable-attachments="true"
      :attachment-settings="attachmentSettings"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
  removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
};

const onPromptRequest = (args) => {
  console.log('Attached files:', args.attachedFiles);
  
  setTimeout(() => {
    aiassist.value.addPromptResponse('Received your message with attachments');
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

## Attachment Settings

Configure file upload behavior using the `attachmentSettings` property.

### saveUrl (string)

Specifies the URL to save uploaded files to the server.

**Required:** Yes (when enableAttachments is true)

```javascript
const attachmentSettings = {
  saveUrl: 'https://your-api.com/api/files/upload'
};
```

### removeUrl (string)

Specifies the URL to remove files from the server when a user deletes an attachment.

**Required:** Yes (when enableAttachments is true)

```javascript
const attachmentSettings = {
  saveUrl: 'https://your-api.com/api/files/upload',
  removeUrl: 'https://your-api.com/api/files/delete'
};
```

### allowedFileTypes (string)

Specifies the allowed file types for attachments. Use file extensions separated by commas.

**Default:** All file types allowed

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  allowedFileTypes: '.pdf,.doc,.docx,.txt'  // Only documents
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Document received');
  }, 1000);
};
</script>
```

### Common File Type Patterns

```javascript
// Documents only
allowedFileTypes: '.pdf,.doc,.docx,.txt,.rtf'

// Images only
allowedFileTypes: '.jpg,.jpeg,.png,.gif,.svg,.webp'

// Spreadsheets
allowedFileTypes: '.xls,.xlsx,.csv'

// Code files
allowedFileTypes: '.js,.ts,.jsx,.tsx,.vue,.html,.css'

// Archives
allowedFileTypes: '.zip,.rar,.7z,.tar,.gz'

// Mixed content
allowedFileTypes: '.pdf,.jpg,.png,.doc,.docx,.txt'
```

### maxFileSize (number)

Specifies the maximum file size allowed for attachments in bytes.

**Default:** No limit

```javascript
const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  maxFileSize: 5242880  // 5MB in bytes (5 * 1024 * 1024)
};
```

### Size Conversion Helper

```javascript
// Helper function to convert MB to bytes
const mbToBytes = (mb) => mb * 1024 * 1024;

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  maxFileSize: mbToBytes(10)  // 10MB limit
};
```

### Common Size Limits

```javascript
// 1 MB
maxFileSize: 1048576

// 5 MB
maxFileSize: 5242880

// 10 MB
maxFileSize: 10485760

// 25 MB
maxFileSize: 26214400

// 50 MB
maxFileSize: 52428800
```

### maximumCount (number)

Specifies the maximum number of attachments allowed per prompt. Must be a positive integer.

**Default:** No limit

```javascript
const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  maximumCount: 3  // Allow up to 3 files per prompt
};
```

### Complete Configuration Example

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  // Upload endpoints
  saveUrl: 'https://your-api.com/api/upload',
  removeUrl: 'https://your-api.com/api/remove',
  
  // File restrictions
  allowedFileTypes: '.pdf,.jpg,.png,.doc,.docx,.txt',
  maxFileSize: 10485760,  // 10MB
  maximumCount: 5         // Max 5 files
};

const onPromptRequest = (args) => {
  console.log('Attached files:', args.attachedFiles);
  
  setTimeout(() => {
    const fileCount = args.attachedFiles?.length || 0;
    aiassist.value.addPromptResponse(
      `Received ${fileCount} file(s) with your message`
    );
  }, 1000);
};
</script>
```

## File Validation

### Client-Side Validation

Validate files before upload using the `beforeAttachmentUpload` event:

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
    :before-attachment-upload="onBeforeUpload"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove'
};

const onBeforeUpload = (args) => {
  const file = args.filesData[0];
  
  // Validate file size (5MB max)
  if (file.size > 5242880) {
    args.cancel = true;
    alert('File too large. Maximum size is 5MB.');
    return;
  }
  
  // Validate file type
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    args.cancel = true;
    alert('Invalid file type. Only PDF and images allowed.');
    return;
  }
  
  console.log('File validation passed:', file.name);
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Files uploaded successfully');
  }, 1000);
};
</script>
```

### Advanced Validation

```javascript
const onBeforeUpload = (args) => {
  const file = args.filesData[0];
  
  // Check file extension
  const allowedExtensions = ['.pdf', '.jpg', '.png', '.doc', '.docx'];
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  
  if (!allowedExtensions.includes(fileExtension)) {
    args.cancel = true;
    alert(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`);
    return;
  }
  
  // Check file size
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    args.cancel = true;
    alert(`File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`);
    return;
  }
  
  // Check file name
  if (file.name.length > 255) {
    args.cancel = true;
    alert('File name too long (max 255 characters)');
    return;
  }
  
  // Check for special characters in filename
  const invalidChars = /[<>:"/\\|?*]/g;
  if (invalidChars.test(file.name)) {
    args.cancel = true;
    alert('File name contains invalid characters');
    return;
  }
  
  console.log('All validations passed');
};
```

### Validation with User Feedback

```vue
<template>
  <div>
    <div v-if="validationError" class="error-message">
      {{ validationError }}
    </div>
    
    <ejs-aiassistview
      ref="aiassist"
      :enable-attachments="true"
      :attachment-settings="attachmentSettings"
      :before-attachment-upload="onBeforeUpload"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);
const validationError = ref('');

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove'
};

const onBeforeUpload = (args) => {
  validationError.value = '';
  const file = args.filesData[0];
  
  // Size validation
  if (file.size > 5242880) {
    args.cancel = true;
    validationError.value = `File "${file.name}" is too large (max 5MB)`;
    setTimeout(() => validationError.value = '', 5000);
    return;
  }
  
  // Type validation
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    args.cancel = true;
    validationError.value = `File type not allowed. Only PDF and images are accepted.`;
    setTimeout(() => validationError.value = '', 5000);
    return;
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response');
  }, 1000);
};
</script>

<style scoped>
.error-message {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}
</style>
```
## Attachment Templates

### attachmentTemplate Property

Control how attachments appear inside message bubbles after sending.

### Template Example

```vue
<template>
  <ejs-aiassistview
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";

const attachmentTemplate = (context) => {
  return `
    <div class="e-attached-file-temp">
      <div class="attached-file-name">${context.selectedFile.name}</div>
      <div class="attached-file-type">${context.selectedFile.type}</div>
    </div>
  `;
};

const attachmentSettings = {
  saveUrl: "https://services.syncfusion.com/js/production/api/FileUploader/Save",
  removeUrl: "https://services.syncfusion.com/js/production/api/FileUploader/Remove",
  attachmentTemplate: attachmentTemplate,
};
</script>
```

## Upload Configuration

### Custom Upload Endpoints

Configure your backend endpoints for file handling:

```javascript
const attachmentSettings = {
  // Production endpoint
  saveUrl: 'https://api.yourapp.com/v1/files/upload',
  removeUrl: 'https://api.yourapp.com/v1/files/delete',
  
  // With authentication
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'X-API-Key': apiKey
  }
};
```

### Backend Implementation Example (Node.js/Express)

```javascript
// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific file types
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    success: true,
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
    fileSize: req.file.size
  });
});

// Remove endpoint
app.post('/api/remove', (req, res) => {
  const { fileName } = req.body;
  const filePath = path.join(__dirname, 'uploads', fileName);
  
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete file' });
    }
    res.json({ success: true });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Using Syncfusion Demo Service

For development and testing, you can use Syncfusion's demo upload service:

```javascript
const attachmentSettings = {
  saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
  removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
};
```

**Note:** This is for demo purposes only. Use your own backend in production.

## Attachment Events

### beforeAttachmentUpload Event

Triggered before an attachment upload is initiated. This event allows you to validate files, cancel uploads, or add custom metadata.

**Event Type:** `EmitType<BeforeUploadEventArgs>`

**Event Arguments (BeforeUploadEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `filesData` | File[] | Array of file objects to be uploaded |
| `cancel` | boolean | Set to true to cancel the upload |
| `customFormData` | object | Custom data to send with upload request |

**Basic Implementation:**

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
    :before-attachment-upload="onBeforeUpload"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove'
};

const onBeforeUpload = (args) => {
  const file = args.filesData[0];
  
  console.log('Before upload:');
  console.log('- File name:', file.name);
  console.log('- File size:', file.size, 'bytes');
  console.log('- File type:', file.type);
  
  // Add custom metadata to upload request
  args.customFormData = {
    userId: 'user123',
    timestamp: Date.now(),
    category: 'document',
    source: 'aiassistview'
  };
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response');
  }, 1000);
};
</script>
```

**Validation Pattern - Cancel Upload:**

```javascript
const onBeforeUpload = (args) => {
  const file = args.filesData[0];
  
  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    args.cancel = true;  // ← Cancels the upload
    alert(`File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`);
    return;
  }
  
  // Validate file type
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword'];
  if (!allowedTypes.includes(file.type)) {
    args.cancel = true;
    alert('File type not allowed. Please use: PDF, JPG, PNG, or DOC');
    return;
  }
  
  // If all validations pass, upload proceeds
  console.log('✅ File validation passed');
};
```

**Advanced - Server-side Upload with Metadata:**

```javascript
const onBeforeUpload = (args) => {
  const file = args.filesData[0];
  
  // Add comprehensive metadata
  args.customFormData = {
    userId: getCurrentUserId(),
    sessionId: getSessionId(),
    uploadedAt: new Date().toISOString(),
    originalName: file.name,
    fileHash: generateFileHash(file),
    source: 'ai-assistant-chat',
    version: '1.0'
  };
  
  // Log upload attempt
  logUploadEvent({
    action: 'upload_initiated',
    file: file.name,
    size: file.size,
    type: file.type,
    timestamp: Date.now()
  });
};
```

---

### attachmentUploadSuccess Event

Triggered when an attachment upload completes successfully.

**Event Type:** `EmitType<object>`

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `file` | object | Uploaded file information (name, size, type) |
| `statusText` | string | Upload status message (usually "Success") |
| `operation` | string | Operation type ("upload") |

**Basic Implementation:**

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
    :attachment-upload-success="onUploadSuccess"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove'
};

const onUploadSuccess = (args) => {
  console.log('✅ Upload successful!');
  console.log('File:', args.file.name);
  console.log('Status:', args.statusText);
  
  // Show success notification
  showNotification(`${args.file.name} uploaded successfully`, 'success');
  
  // Update file count
  updateAttachmentCount();
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response');
  }, 1000);
};
</script>
```

**Update UI After Upload:**

```javascript
import { ref } from 'vue';

const uploadedFiles = ref([]);

const onUploadSuccess = (args) => {
  // Add to uploaded files list
  uploadedFiles.value.push({
    name: args.file.name,
    size: args.file.size,
    uploadedAt: new Date(),
    status: 'completed'
  });
  
  // Update UI
  console.log(`Total files: ${uploadedFiles.value.length}`);
  
  // Trigger file processing if needed
  processUploadedFile(args.file.name);
};
```

---

### attachmentUploadFailure Event

Triggered when an attachment upload fails.

**Event Type:** `EmitType<object>`

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `file` | object | File that failed to upload |
| `statusText` | string | Error message or code |
| `operation` | string | Operation type ("upload") |

**Common Error Codes:**
- `413` - File too large (Payload Too Large)
- `415` - Unsupported Media Type
- `403` - Forbidden (permission denied)
- `500` - Server error
- `400` - Bad request
- `0` - Network error / timeout

**Basic Implementation:**

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
    :attachment-upload-failure="onUploadFailure"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove'
};

const onUploadFailure = (args) => {
  console.error('❌ Upload failed!');
  console.error('File:', args.file.name);
  console.error('Error:', args.statusText);
  
  // Show error notification
  showNotification(
    `Failed to upload ${args.file.name}: ${args.statusText}`,
    'error'
  );
  
  // Log error for debugging
  logUploadError({
    fileName: args.file.name,
    error: args.statusText,
    timestamp: Date.now()
  });
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response');
  }, 1000);
};
</script>
```

**Error Handling & Retry:**

```javascript
const failedUploads = ref([]);

const onUploadFailure = (args) => {
  // Store failed upload for retry
  failedUploads.value.push({
    file: args.file,
    error: args.statusText,
    attempts: 1,
    timestamp: Date.now()
  });
  
  // Check if retryable error
  const isRetryable = ['500', '503', '0'].includes(args.statusText);
  
  if (isRetryable && failedUploads.value.length <= 3) {
    console.log('Retrying upload in 2 seconds...');
    setTimeout(() => {
      // Implement retry logic
    }, 2000);
  } else {
    showNotification(`Upload failed: ${args.statusText}`, 'error');
  }
};
```

---

### attachmentRemoving Event

Triggered when an attachment is being removed from the upload queue — fires **before** the file is detached from the prompt, so you can confirm with the user, cancel the removal, or log the action.

**Event Type:** `EmitType<RemovingEventArgs>`

**Event Arguments (RemovingEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Defines whether the current action can be prevented. |
| `currentRequest` | `XMLHttpRequest` | Returns the XMLHttpRequest instance that is associated with the remove action. |
| `customFormData` | `{ [key: string]: Object }[]` | Defines the additional data with key and value pair format that will be submitted to the remove action. |
| `event` | `MouseEvent \| TouchEvent \| KeyboardEventArgs` | Returns the original event arguments. |
| `filesData` | [FileInfo[]](https://ej2.syncfusion.com/documentation/api/uploader/fileinfo) | Returns the list of files' details that will be removed. |
| `postRawFile` | `boolean` | Defines whether the selected raw file is sent to the server remove action. Set `true` to send the raw file, or `false` to send only the file name. |

**Basic Implementation (Composition API):**

```vue
<template>
   <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <ejs-aiassistview id="aiAssistView" ref="aiassist" :attachmentRemoving="attachmentRemoving" :promptRequest="onPromptRequest" :enableAttachments="true" :attachmentSettings="attachmentSettings"
    ></ejs-aiassistview>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { enableRipple } from '@syncfusion/ej2-base';
import { AIAssistViewComponent as EjsAiassistview } from '@syncfusion/ej2-vue-interactive-chat';

enableRipple(true);

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
  removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
};

const onPromptRequest = () => {
  setTimeout(() => {
    const aiAssistInstance = aiassist.value?.ej2Instances;
    const defaultResponse =
      'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
    aiAssistInstance.addPromptResponse(defaultResponse);
  }, 1000);
};

const attachmentRemoving = () => {
  // Your required action here
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-interactive-chat/styles/tailwind3.css";
</style>
```

**Basic Implementation (Options API):**

```vue
<template>
  <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <ejs-aiassistview id="aiAssistView" ref="aiassist" :attachmentRemoving="attachmentRemoving" :promptRequest="onPromptRequest" :enableAttachments="true" :attachmentSettings="attachmentSettings"
    ></ejs-aiassistview>
  </div>
</template>

<script>
import { enableRipple } from '@syncfusion/ej2-base';
import { AIAssistViewComponent } from '@syncfusion/ej2-vue-interactive-chat';

enableRipple(true);

export default {
  components: {
    'ejs-aiassistview': AIAssistViewComponent
  },
  data() {
    return {
      attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
      }
    };
  },
  methods: {
    onPromptRequest() {
      setTimeout(() => {
        const aiAssistInstance = this.$refs.aiassist.ej2Instances;
        const defaultResponse =
          'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        aiAssistInstance.addPromptResponse(defaultResponse);
      }, 1000);
    },
    attachmentRemoving() {
      // your code will be here
    }
  }
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-interactive-chat/styles/tailwind3.css";
</style>
```

**Cancel the Removal:**

```javascript
const attachmentRemoving = (args) => {
  const file = args.filesData[0];
  if (file.size > 5 * 1024 * 1024) {
    // Keep large attachments so users don't lose them by accident
    args.cancel = true;
    console.log('Removal blocked: file exceeds 5 MB');
  }
};
```

---

### attachmentRemoved Event

Triggered when an attachment is removed from the upload queue.

**Event Type:** `EmitType<object>`

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `file` | object | Removed file information |
| `operation` | string | Operation type ("remove") |

**Basic Implementation:**

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
    :attachment-removed="onAttachmentRemoved"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove'
};

const onAttachmentRemoved = (args) => {
  console.log('📋 File removed:', args.file.name);
  
  // Update UI or state
  updateAttachmentCount();
  
  // Log removal
  logEvent({
    action: 'attachment_removed',
    fileName: args.file.name,
    timestamp: Date.now()
  });
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response');
  }, 1000);
};
</script>
```

**Manage Attachment List:**

```javascript
import { ref } from 'vue';

const attachments = ref([]);

const onAttachmentRemoved = (args) => {
  // Remove from local list
  attachments.value = attachments.value.filter(
    file => file.name !== args.file.name
  );
  
  // Call server to clean up
  deleteFileFromServer(args.file.name).then(() => {
    console.log(`${args.file.name} deleted from server`);
  });
  
  // Update UI
  updateAttachmentUI();
};
```

---

### Complete Event Handler Example

```vue
<template>
  <div>
    <div class="attachment-status">
      <p>Uploaded files: {{ uploadedFiles.length }}</p>
      <p v-if="failedUploads.length > 0" class="error">
        Failed uploads: {{ failedUploads.length }}
      </p>
    </div>

    <ejs-aiassistview
      ref="aiassist"
      :enable-attachments="true"
      :attachment-settings="attachmentSettings"
      :before-attachment-upload="onBeforeUpload"
      :attachment-upload-success="onUploadSuccess"
      :attachment-upload-failure="onUploadFailure"
      :attachment-removed="onAttachmentRemoved"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";

const aiassist = ref(null);
const uploadedFiles = ref([]);
const failedUploads = ref([]);

const attachmentSettings = {
  saveUrl: 'https://api.example.com/upload',
  removeUrl: 'https://api.example.com/remove',
  allowedFileTypes: '.pdf,.jpg,.png,.doc,.docx',
  maxFileSize: 10485760,
  maximumCount: 5
};

// Before upload - validate and add metadata
const onBeforeUpload = (args) => {
  const file = args.filesData[0];
  
  // Validation
  if (file.size > attachmentSettings.maxFileSize) {
    args.cancel = true;
    alert('File exceeds maximum size');
    return;
  }
  
  // Add metadata
  args.customFormData = {
    sessionId: getSessionId(),
    uploadedAt: new Date().toISOString()
  };
};

// Upload succeeded
const onUploadSuccess = (args) => {
  uploadedFiles.value.push({
    name: args.file.name,
    status: 'success',
    uploadedAt: new Date()
  });
  
  // Remove from failed if retry was successful
  failedUploads.value = failedUploads.value.filter(
    f => f.file.name !== args.file.name
  );
};

// Upload failed
const onUploadFailure = (args) => {
  failedUploads.value.push({
    file: args.file.name,
    error: args.statusText,
    timestamp: Date.now()
  });
};

// Attachment removed
const onAttachmentRemoved = (args) => {
  uploadedFiles.value = uploadedFiles.value.filter(
    f => f.name !== args.file.name
  );
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response');
  }, 1000);
};

function getSessionId() {
  return sessionStorage.getItem('sessionId') || 'unknown';
}
</script>

<style scoped>
.attachment-status {
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 10px;
}

.error {
  color: #dc3545;
}
</style>
```

### attachmentClick Event

Triggered when an attachment is clicked (for preview or download).

**Event Arguments:**
- `file` (object) - The clicked file information
- `originalEvent` (Event) - The original click event

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
    :attachment-click="onAttachmentClick"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove'
};

const onAttachmentClick = (args) => {
  console.log('Attachment clicked:', args.file.name);
  
  // Open file in new tab or trigger download
  const fileUrl = args.file.url || `/files/${args.file.name}`;
  window.open(fileUrl, '_blank');
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response');
  }, 1000);
};
</script>
```

## Working with Attached Files

### Accessing Attached Files in Prompt Request

```javascript
const onPromptRequest = (args) => {
  // Access attached files
  const attachedFiles = args.attachedFiles;
  
  if (attachedFiles && attachedFiles.length > 0) {
    console.log('Number of files:', attachedFiles.length);
    
    attachedFiles.forEach((file, index) => {
      console.log(`File ${index + 1}:`, {
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.url
      });
    });
    
    // Process files with AI
    processFilesWithAI(args.prompt, attachedFiles).then(response => {
      aiassist.value.addPromptResponse(response);
    });
  } else {
    // No files attached
    setTimeout(() => {
      aiassist.value.addPromptResponse('Response to: ' + args.prompt);
    }, 1000);
  }
};

const processFilesWithAI = async (prompt, files) => {
  // Send files to AI service for processing
  const formData = new FormData();
  formData.append('prompt', prompt);
  
  files.forEach((file, index) => {
    formData.append(`file${index}`, file);
  });
  
  const response = await fetch('/api/ai/process-with-files', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  return data.response;
};
```

### Displaying File Information

```vue
<template>
  <div>
    <div v-if="currentFiles.length > 0" class="files-info">
      <h4>Attached Files:</h4>
      <ul>
        <li v-for="(file, index) in currentFiles" :key="index">
          {{ file.name }} ({{ formatFileSize(file.size) }})
        </li>
      </ul>
    </div>
    
    <ejs-aiassistview
      ref="aiassist"
      :enable-attachments="true"
      :attachment-settings="attachmentSettings"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);
const currentFiles = ref([]);

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove'
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
};

const onPromptRequest = (args) => {
  currentFiles.value = args.attachedFiles || [];
  
  setTimeout(() => {
    const fileNames = currentFiles.value.map(f => f.name).join(', ');
    aiassist.value.addPromptResponse(
      `Received ${currentFiles.value.length} file(s): ${fileNames}`
    );
  }, 1000);
};
</script>

<style scoped>
.files-info {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #e3f2fd;
  border-radius: 5px;
}

.files-info h4 {
  margin-top: 0;
}

.files-info ul {
  margin-bottom: 0;
}
</style>
```

### Pre-populating Attachments in Prompts

```javascript
const addPromptWithFiles = () => {
  const promptData = {
    prompt: 'Please analyze this document',
    response: 'Analyzing the document...',
    attachedFiles: [
      {
        name: 'report.pdf',
        size: 1024000,
        type: 'application/pdf',
        url: '/files/report.pdf'
      },
      {
        name: 'data.xlsx',
        size: 512000,
        type: 'application/vnd.ms-excel',
        url: '/files/data.xlsx'
      }
    ]
  };
  
  aiassist.value.addPromptResponse(promptData);
};
```

## Complete Examples

### Full Configuration with All Events

```vue
<template>
  <div id="container" style="height: 600px; width: 700px;">
    <div v-if="uploadStatus" class="status-message" :class="uploadStatus.type">
      {{ uploadStatus.message }}
    </div>
    
    <ejs-aiassistview
      ref="aiassist"
      :enable-attachments="true"
      :attachment-settings="attachmentSettings"
      :before-attachment-upload="onBeforeUpload"
      :attachment-upload-success="onUploadSuccess"
      :attachment-upload-failure="onUploadFailure"
      :attachment-removed="onAttachmentRemoved"
      :attachment-click="onAttachmentClick"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);
const uploadStatus = ref(null);

const attachmentSettings = {
  saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
  removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
  allowedFileTypes: '.pdf,.jpg,.png,.doc,.docx,.txt',
  maxFileSize: 10485760,  // 10MB
  maximumCount: 5
};

const showStatus = (message, type = 'info') => {
  uploadStatus.value = { message, type };
  setTimeout(() => uploadStatus.value = null, 5000);
};

const onBeforeUpload = (args) => {
  const file = args.filesData[0];
  
  // Validate file size
  if (file.size > 10485760) {
    args.cancel = true;
    showStatus(`File too large: ${file.name} (max 10MB)`, 'error');
    return;
  }
  
  // Validate file type
  const allowedExtensions = ['.pdf', '.jpg', '.png', '.doc', '.docx', '.txt'];
  const ext = '.' + file.name.split('.').pop().toLowerCase();
  
  if (!allowedExtensions.includes(ext)) {
    args.cancel = true;
    showStatus(`Invalid file type: ${file.name}`, 'error');
    return;
  }
  
  showStatus(`Uploading ${file.name}...`, 'info');
};

const onUploadSuccess = (args) => {
  showStatus(`✅ ${args.file.name} uploaded successfully`, 'success');
};

const onUploadFailure = (args) => {
  showStatus(`❌ Failed to upload ${args.file.name}`, 'error');
};

const onAttachmentRemoved = (args) => {
  showStatus(`🗑️ ${args.file.name} removed`, 'info');
};

const onAttachmentClick = (args) => {
  console.log('Opening file:', args.file.name);
  // Open file in new tab or download
  if (args.file.url) {
    window.open(args.file.url, '_blank');
  }
};

const onPromptRequest = (args) => {
  const fileCount = args.attachedFiles?.length || 0;
  
  setTimeout(() => {
    if (fileCount > 0) {
      const fileNames = args.attachedFiles.map(f => f.name).join(', ');
      aiassist.value.addPromptResponse(
        `Received your message with ${fileCount} file(s): ${fileNames}`
      );
    } else {
      aiassist.value.addPromptResponse('Response to: ' + args.prompt);
    }
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";

.status-message {
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 14px;
}

.status-message.info {
  background-color: #e3f2fd;
  color: #1976d2;
  border: 1px solid #90caf9;
}

.status-message.success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #81c784;
}

.status-message.error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ef9a9a;
}
</style>
```

### Document Analysis with AI

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
    :prompt-suggestions="suggestions"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const suggestions = [
  "Analyze this document",
  "Summarize the key points",
  "Extract important data",
  "Translate to Spanish"
];

const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  allowedFileTypes: '.pdf,.doc,.docx,.txt',
  maxFileSize: 20971520  // 20MB
};

const onPromptRequest = async (args) => {
  if (!args.attachedFiles || args.attachedFiles.length === 0) {
    aiassist.value.addPromptResponse(
      'Please attach a document to analyze.'
    );
    return;
  }
  
  try {
    // Send to AI service for analysis
    const formData = new FormData();
    formData.append('prompt', args.prompt);
    
    args.attachedFiles.forEach(file => {
      formData.append('files', file);
    });
    
    const response = await fetch('/api/ai/analyze-document', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    aiassist.value.addPromptResponse(data.analysis);
  } catch (error) {
    aiassist.value.addPromptResponse(
      'Error analyzing document: ' + error.message
    );
  }
};
</script>
```

## Best Practices

### 1. Always Configure saveUrl and removeUrl

```javascript
// ✅ Good: Proper configuration
const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove'
};

// ❌ Bad: Missing URLs
const attachmentSettings = {
  enableAttachments: true  // Won't work without URLs
};
```

### 2. Implement File Validation

```javascript
const onBeforeUpload = (args) => {
  const file = args.filesData[0];
  
  // ✅ Good: Comprehensive validation
  if (file.size > maxSize) {
    args.cancel = true;
    showError('File too large');
    return;
  }
  
  if (!isAllowedType(file.type)) {
    args.cancel = true;
    showError('Invalid file type');
    return;
  }
};
```

### 3. Handle Upload Errors Gracefully

```javascript
const onUploadFailure = (args) => {
  // ✅ Good: User-friendly error handling
  console.error('Upload failed:', args.statusText);
  
  let message = 'Upload failed. ';
  if (args.statusText.includes('timeout')) {
    message += 'Connection timeout. Please try again.';
  } else if (args.statusText.includes('size')) {
    message += 'File too large.';
  } else {
    message += 'Please try again later.';
  }
  
  alert(message);
};
```

### 4. Set Appropriate File Size Limits

```javascript
// ✅ Good: Reasonable limits based on use case
const attachmentSettings = {
  saveUrl: '/upload',
  removeUrl: '/remove',
  maxFileSize: 10485760,  // 10MB for documents
  allowedFileTypes: '.pdf,.doc,.docx'
};

// For images
const imageSettings = {
  maxFileSize: 5242880,  // 5MB for images
  allowedFileTypes: '.jpg,.png,.gif'
};
```

### 5. Validate on Both Client and Server

```javascript
// Client-side validation
const onBeforeUpload = (args) => {
  // Quick client-side check
  if (args.filesData[0].size > maxSize) {
    args.cancel = true;
    return;
  }
};

// Server-side validation (Node.js example)
app.post('/upload', upload.single('file'), (req, res) => {
  // Always validate on server too
  if (!req.file) {
    return res.status(400).json({ error: 'No file' });
  }
  
  if (req.file.size > MAX_SIZE) {
    return res.status(400).json({ error: 'File too large' });
  }
  
  res.json({ success: true });
});
```

### 6. Provide Upload Progress Feedback

```javascript
const onBeforeUpload = (args) => {
  showStatus('Uploading...', 'info');
};

const onUploadSuccess = (args) => {
  showStatus('Upload complete!', 'success');
};
```

### 7. Clean Up Files on Server

```javascript
// Remove files when conversation is deleted or after processing
const cleanupFiles = async (fileIds) => {
  for (const fileId of fileIds) {
    await fetch('/api/remove', {
      method: 'POST',
      body: JSON.stringify({ fileId })
    });
  }
};
```

### 8. Secure File Uploads

```javascript
// Add authentication headers
const attachmentSettings = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'X-CSRF-Token': csrfToken
  }
};

// Validate on server
app.post('/upload', authenticate, (req, res) => {
  // Only authenticated users can upload
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // ... process upload
});
```

### 9. Limit Number of Attachments

```javascript
const attachmentSettings = {
  saveUrl: '/upload',
  removeUrl: '/remove',
  maximumCount: 3  // Prevent abuse
};
```

### 10. Use Appropriate File Type Restrictions

```javascript
// ✅ Good: Specific to use case
const documentSettings = {
  allowedFileTypes: '.pdf,.doc,.docx,.txt'
};

const imageSettings = {
  allowedFileTypes: '.jpg,.jpeg,.png,.gif,.webp'
};

// ❌ Bad: Too permissive
const tooOpenSettings = {
  allowedFileTypes: '*'  // Security risk
};
```

---

## Security Considerations

### 1. Validate File Contents

Don't trust file extensions. Validate actual file contents on the server.

### 2. Scan for Malware

Implement virus scanning for uploaded files.

### 3. Store Files Securely

Don't serve uploaded files directly from upload directory. Use secure URLs.

### 4. Implement Rate Limiting

Limit number of uploads per user per time period.

### 5. Use HTTPS

Always use HTTPS for file uploads to protect data in transit.

````
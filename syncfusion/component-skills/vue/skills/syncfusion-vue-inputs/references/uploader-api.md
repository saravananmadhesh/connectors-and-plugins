# Uploader API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `asyncSettings` | object | - | Configuration for async upload with `saveUrl` and `removeUrl` |
| `autoUpload` | boolean | true | Auto-upload files after selection |
| `multiple` | boolean | true | Allow multiple file selection |
| `allowedExtensions` | string | - | Comma-separated allowed file extensions (e.g., ".pdf,.doc") |
| `maxFileSize` | number | - | Maximum file size in bytes |
| `minFileSize` | number | - | Minimum file size in bytes |
| `maxFilesCount` | number | - | Maximum number of files allowed |
| `sequentialUpload` | boolean | false | Upload files one at a time instead of parallel |
| `buttons` | object | - | Custom button labels: `{ browse, upload, clear }` |
| `dropArea` | HTMLElement \| string | - | Element or selector for drag-drop area |
| `dropEffect` | string | 'Copy' | Drag-drop effect: 'Copy', 'Move', or 'Link' |
| `directoryUpload` | boolean | false | Enable folder/directory upload |
| `showFileList` | boolean | true | Show list of selected/uploaded files |
| `template` | string \| function | - | Custom file list template |
| `cssClass` | string | - | Custom CSS class for styling |
| `enabled` | boolean | true | Enable or disable the component |
| `files` | array | - | Pre-loaded files to display |
| `locale` | string | 'en-US' | Localization language |
| `htmlAttributes` | object | - | HTML attributes for the component |

---

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `upload()` | - | void | Upload all selected files |
| `remove(file)` | string \| object | void | Remove a specific file |
| `cancel(file)` | string \| object | void | Cancel uploading a file |
| `pause(file)` | string \| object | void | Pause file upload |
| `resume(file)` | string \| object | void | Resume paused file upload |
| `retry(file)` | string \| object | void | Retry failed file upload |
| `clearAll()` | - | void | Clear all selected files |
| `getFilesData()` | - | array | Get data of all selected files |
| `bytesToSize(bytes)` | number | string | Convert bytes to human-readable format |
| `createFileList(files)` | array | void | Create file list from array |
| `sortFileList(order)` | string | void | Sort file list by name or size |

---

## Events

### upload Events

```typescript
// When files are selected
onSelected = (args: SelectedEventArgs) => {
  console.log(args.filesData);  // Array of selected files
  console.log(args.event);      // Browser event
};

// Before upload begins
onBeforeUpload = (args: BeforeUploadEventArgs) => {
  args.customFormData = [{ key: 'userId', value: '123' }];
  // args.cancel = true; // To cancel upload
};

// During upload
onUploading = (args: UploadingEventArgs) => {
  console.log(args.file.name);  // File being uploaded
};

// Upload progress
onProgress = (args: ProgressEventArgs) => {
  console.log(args.percentComplete);  // Progress percentage
};

// Upload completed successfully
onSuccess = (args: SuccessEventArgs) => {
  console.log(args.file.name);
  console.log(args.statusCode);  // 200 for success
};

// Upload failed
onFailure = (args: FailureEventArgs) => {
  console.log(args.statusText);  // Error message
};
```

### Chunk Upload Events

```typescript
// Chunk upload started
onChunkUploading = (args: ChunkUploadingEventArgs) => {
  console.log(args.currentChunkIndex);
  console.log(args.totalChunks);
};

// Chunk uploaded successfully
onChunkSuccess = (args: ChunkSuccessEventArgs) => {
  console.log(args.chunkIndex);
};

// Chunk upload failed
onChunkFailure = (args: ChunkFailureEventArgs) => {
  console.log(args.chunkIndex);
  console.log(args.errorDetails);
};
```

### File Removal Events

```typescript
// Before file removal
onBeforeRemove = (args: BeforeRemoveEventArgs) => {
  // args.cancel = true; // Prevent removal
};

// During file removal
onRemoving = (args: RemovingEventArgs) => {
  console.log(args.filesData);  // Files being removed
};

// File change event
onChange = (args: ChangeEventArgs) => {
  console.log(args.filesData);
};

// Pause event
onPausing = (args: PausingEventArgs) => {
  console.log(args.file.name);
};

// Resume event
onResuming = (args: ResumingEventArgs) => {
  console.log(args.file.name);
};

// Component created
onCreated = () => {
  console.log('Uploader component created');
};
```

---

## Vue 3 Template Binding

### Event Binding

```vue
<template>
  <UploaderComponent
    @uploading="onUploading"
    @progress="onProgress"
    @success="onSuccess"
    @failure="onFailure"
    @selected="onSelected"
    @removing="onRemoving"
    @chunkSuccess="onChunkSuccess"
    @created="onCreated"
  />
</template>

<script setup>
const onUploading = (args) => {};
const onProgress = (args) => {};
const onSuccess = (args) => {};
const onFailure = (args) => {};
const onSelected = (args) => {};
const onRemoving = (args) => {};
const onChunkSuccess = (args) => {};
const onCreated = () => {};
</script>
```

---

## AsyncSettings Configuration

```typescript
interface AsyncSettings {
  saveUrl: string;           // Server URL to save files
  removeUrl: string;         // Server URL to remove files
  chunkSize?: number;        // Chunk size in bytes (default: 64000)
  retryCount?: number;       // Retry count on failure (default: 3)
  retryAfterDelay?: number;  // Delay between retries in ms (default: 600)
}
```

### Example

```typescript
const asyncSettings = {
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove',
  chunkSize: 102400,  // 100KB chunks
  retryCount: 5,
  retryAfterDelay: 1000
};
```

---

## Complete API Example

```vue
<template>
  <div class="api-demo">
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      :autoUpload="false"
      :multiple="true"
      :maxFileSize="10485760"
      :allowedExtensions="'.pdf,.doc,.docx,.xls,.xlsx'"
      :buttons="{ browse: 'Select Files', upload: 'Upload', clear: 'Clear' }"
      @uploading="onUploading"
      @progress="onProgress"
      @success="onSuccess"
      @failure="onFailure"
      @selected="onSelected"
      @beforeUpload="onBeforeUpload"
      @removing="onRemoving"
    />

    <div class="actions">
      <button @click="uploadFiles">Upload All</button>
      <button @click="pauseUpload">Pause</button>
      <button @click="resumeUpload">Resume</button>
      <button @click="cancelUpload">Cancel</button>
      <button @click="getFilesInfo">Get Files Info</button>
    </div>

    <div class="info">
      <p>Selected Files: {{ fileCount }}</p>
      <p>Total Size: {{ totalSize }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);
const fileCount = ref(0);
const totalSize = ref(0);

const asyncSettings = reactive({
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove',
  chunkSize: 102400,
  retryCount: 3
});

const onSelected = (args) => {
  fileCount.value = args.filesData.length;
  totalSize.value = args.filesData.reduce((sum, f) => sum + f.size, 0);
};

const onBeforeUpload = (args) => {
  args.customFormData = [
    { key: 'userId', value: '12345' }
  ];
};

const onUploading = (args) => {
  console.log(`Uploading: ${args.file.name}`);
};

const onProgress = (args) => {
  console.log(`Progress: ${args.percentComplete}%`);
};

const onSuccess = (args) => {
  console.log(`Success: ${args.file.name}`);
};

const onFailure = (args) => {
  console.error(`Failed: ${args.file.name}`);
};

const onRemoving = (args) => {
  console.log(`Removing: ${args.filesData[0]?.name}`);
};

const uploadFiles = () => {
  uploaderRef.value?.upload();
};

const pauseUpload = () => {
  uploaderRef.value?.pause();
};

const resumeUpload = () => {
  uploaderRef.value?.resume();
};

const cancelUpload = () => {
  uploaderRef.value?.cancel();
};

const getFilesInfo = () => {
  const files = uploaderRef.value?.getFilesData();
  console.log('Files:', files);
};
</script>
```


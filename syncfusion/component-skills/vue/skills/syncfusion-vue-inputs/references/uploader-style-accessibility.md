# Style and Accessibility — Syncfusion Vue Uploader

## Table of Contents
- [Custom Styling](#custom-styling)
- [Accessibility Features](#accessibility-features)
- [WCAG Compliance](#wcag-compliance)
- [Examples](#examples)

---

## Custom Styling

Customize the uploader appearance:

```vue
<template>
  <div class="custom-styling">
    <fieldset>
      <legend>Custom Styled Uploaders</legend>

      <div class="style-section">
        <h4>Modern Blue Theme</h4>
        <label class="uploader-modern">
          <input type="file" multiple class="hidden-input">
          <span class="upload-icon">📤</span>
          <span class="upload-text">Click to upload files</span>
        </label>
      </div>

      <div class="style-section">
        <h4>Minimalist Style</h4>
        <label class="uploader-minimal">
          <input type="file" multiple class="hidden-input">
          <span class="minimal-text">Choose files</span>
        </label>
      </div>

      <div class="style-section">
        <h4>Card Style</h4>
        <label class="uploader-card">
          <input type="file" multiple class="hidden-input">
          <div class="card-content">
            <div class="card-icon">☁️</div>
            <div class="card-title">Upload Files</div>
            <div class="card-subtitle">Drag and drop or click</div>
          </div>
        </label>
      </div>

      <div class="style-section">
        <h4>Button Style</h4>
        <label class="uploader-button">
          <input type="file" multiple class="hidden-input">
          <span class="button-icon">📎</span>
          <span>Attach Files</span>
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'CustomStyling'
}
</script>

<style scoped>
fieldset {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

h4 {
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #666;
}

.style-section {
  margin-bottom: 20px;
}

.style-section:last-child {
  margin-bottom: 0;
}

.hidden-input {
  display: none;
}

/* Modern Theme */
.uploader-modern {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background: linear-gradient(135deg, #0078d4, #00b294);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
}

.uploader-modern:hover {
  transform: translateY(-2px);
}

.upload-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 16px;
  font-weight: bold;
}

/* Minimalist */
.uploader-minimal {
  display: inline-block;
  padding: 8px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}

.uploader-minimal:hover {
  background: #f5f5f5;
  border-color: #999;
}

.minimal-text {
  color: #333;
}

/* Card Style */
.uploader-card {
  display: block;
  padding: 30px;
  background: white;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
}

.uploader-card:hover {
  border-color: #0078d4;
  background: #f0f7ff;
}

.card-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.card-subtitle {
  font-size: 12px;
  color: #666;
}

/* Button Style */
.uploader-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.uploader-button:hover {
  background: #106ebe;
}

.button-icon {
  font-size: 16px;
}
</style>
```

---

## Accessibility Features

Implement WCAG 2.2 compliant uploader:

```vue
<template>
  <div class="accessibility-features">
    <h4>Accessibility Features</h4>

    <div class="upload-wrapper">
      <label
        for="accessible-file-input"
        class="upload-button"
        :class="{ focused: isFocused }">
        <span class="upload-icon" aria-hidden="true">📁</span>
        <span>Choose Files</span>
      </label>
      <input
        id="accessible-file-input"
        type="file"
        @change="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
        multiple
        accept=".pdf,.doc,.docx,.jpg,.png"
        aria-describedby="upload-help upload-status"
        class="sr-only">
      
      <div id="upload-help" class="help-text">
        Select PDF, Word documents, or images. Maximum 5 files, 10MB each.
      </div>
    </div>

    <div
      id="upload-status"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class="status-region">
      {{ statusMessage }}
    </div>

    <div v-if="selectedFiles.length > 0" class="files-list" role="list">
      <h5 id="files-heading">Selected Files ({{ selectedFiles.length }}):</h5>
      <div
        v-for="(file, index) in selectedFiles"
        :key="index"
        role="listitem"
        class="file-item">
        <div class="file-info">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatSize(file.size) }}</span>
        </div>
        <button
          @click="removeFile(index)"
          :aria-label="`Remove ${file.name}`"
          class="btn-remove">
          Remove
        </button>
      </div>

      <button
        @click="uploadFiles"
        :disabled="isUploading"
        class="btn-upload"
        :aria-busy="isUploading">
        {{ isUploading ? 'Uploading files...' : `Upload ${selectedFiles.length} file(s)` }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccessibilityFeatures',
  data() {
    return {
      isFocused: false,
      isUploading: false,
      selectedFiles: [],
      statusMessage: 'No files selected'
    }
  },
  methods: {
    onChange(event) {
      const newFiles = Array.from(event.target.files);
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      this.statusMessage = `${this.selectedFiles.length} file(s) selected. Ready to upload.`;
    },
    removeFile(index) {
      const name = this.selectedFiles[index].name;
      this.selectedFiles.splice(index, 1);
      this.statusMessage = `${name} removed. ${this.selectedFiles.length} file(s) remaining.`;
    },
    async uploadFiles() {
      this.isUploading = true;
      this.statusMessage = 'Upload started...';
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.isUploading = false;
      this.statusMessage = `Upload complete. ${this.selectedFiles.length} file(s) uploaded successfully.`;
      this.selectedFiles = [];
    },
    formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
  }
}
</script>

<style scoped>
h4 { margin: 0 0 15px 0; }
h5 { margin: 0 0 8px 0; font-size: 13px; }

.upload-wrapper {
  margin-bottom: 15px;
}

.upload-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.upload-button:hover {
  background: #106ebe;
}

.upload-button.focused {
  outline: 3px solid #0078d4;
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.help-text {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

.status-region {
  padding: 8px 12px;
  background: #f0f7ff;
  border-left: 3px solid #0078d4;
  border-radius: 3px;
  font-size: 13px;
  margin-bottom: 12px;
  min-height: 36px;
}

.files-list {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 4px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background: white;
  border-radius: 3px;
  margin-bottom: 6px;
}

.file-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.file-name {
  font-size: 13px;
  font-weight: bold;
}

.file-size {
  font-size: 11px;
  color: #666;
}

.btn-remove {
  padding: 4px 10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.btn-remove:focus {
  outline: 2px solid #0078d4;
  outline-offset: 2px;
}

.btn-upload {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.btn-upload:focus {
  outline: 3px solid #0078d4;
  outline-offset: 2px;
}

.btn-upload:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
```

---

## WCAG Compliance

Full WCAG 2.2 compliance example:

```vue
<template>
  <div class="wcag-compliant">
    <h4>WCAG 2.2 Compliant Uploader</h4>

    <div class="upload-region">
      <h5 id="upload-title">Upload Documents</h5>
      <p id="upload-desc" class="description">
        Upload PDF, Word, or image files. Maximum 10MB per file.
      </p>

      <div
        class="drop-zone"
        :class="{ dragging: isDragging, 'has-error': errorMessage }"
        role="button"
        tabindex="0"
        :aria-labelledby="'upload-title'"
        :aria-describedby="'upload-desc upload-error'"
        @click="$refs.fileInput.click()"
        @keydown.enter="$refs.fileInput.click()"
        @keydown.space.prevent="$refs.fileInput.click()"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="onDrop">
        <span class="drop-icon" aria-hidden="true">📤</span>
        <span class="drop-text">Click or drop files here</span>
        <input
          ref="fileInput"
          type="file"
          @change="onFileChange"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.png"
          class="sr-only"
          :aria-invalid="!!errorMessage">
      </div>

      <div
        id="upload-error"
        role="alert"
        aria-live="assertive"
        class="error-region">
        {{ errorMessage }}
      </div>
    </div>

    <div v-if="files.length > 0" class="file-list-region">
      <h5 id="files-list-title">Selected Files ({{ files.length }})</h5>
      <ul aria-labelledby="'files-list-title'">
        <li v-for="(file, index) in files" :key="index" class="file-entry">
          <span class="entry-name" :aria-label="`File: ${file.name}`">
            {{ file.name }}
          </span>
          <span class="entry-size">{{ formatSize(file.size) }}</span>
          <button
            @click="removeFile(index)"
            :aria-label="`Remove ${file.name}`"
            class="btn-remove">
            Remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WCAGCompliant',
  data() {
    return {
      isDragging: false,
      files: [],
      errorMessage: ''
    }
  },
  methods: {
    onFileChange(event) {
      this.validateAndAdd(Array.from(event.target.files));
    },
    onDrop(event) {
      this.isDragging = false;
      this.validateAndAdd(Array.from(event.dataTransfer.files));
    },
    validateAndAdd(newFiles) {
      this.errorMessage = '';
      const valid = [];
      const maxSize = 10 * 1024 * 1024;
      const allowedExts = ['.pdf', '.doc', '.docx', '.jpg', '.png'];
      
      for (let file of newFiles) {
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedExts.includes(ext)) {
          this.errorMessage = `Invalid file type: ${file.name}`;
          continue;
        }
        if (file.size > maxSize) {
          this.errorMessage = `File too large: ${file.name} (max 10MB)`;
          continue;
        }
        valid.push(file);
      }
      
      this.files = [...this.files, ...valid];
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
  }
}
</script>

<style scoped>
h4 { margin: 0 0 15px 0; }
h5 { margin: 0 0 8px 0; font-size: 14px; }

.upload-region {
  margin-bottom: 20px;
}

.description {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: #666;
}

.sr-only {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background: #f9f9f9;
  border: 2px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.drop-zone:focus {
  outline: 3px solid #0078d4;
  outline-offset: 2px;
  border-color: #0078d4;
  background: #f0f7ff;
}

.drop-zone.dragging {
  background: #e3f2fd;
  border-color: #0078d4;
  border-style: solid;
}

.drop-zone.has-error {
  border-color: #dc3545;
}

.drop-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.drop-text {
  font-size: 14px;
  color: #666;
}

.error-region {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 3px;
  font-size: 13px;
  min-height: 20px;
}

.file-list-region {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
}

.file-list-region ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-entry {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 8px;
  background: white;
  border-radius: 3px;
  margin-bottom: 6px;
  font-size: 13px;
}

.entry-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.entry-size {
  color: #666;
  font-size: 11px;
}

.btn-remove {
  padding: 4px 10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
}

.btn-remove:focus {
  outline: 2px solid #0078d4;
  outline-offset: 2px;
}
</style>
```

---

## Examples

### Complete Style & Accessibility Demo

```vue
<template>
  <div class="style-accessibility-complete">
    <h3>Style and Accessibility</h3>

    <div class="demo-card">
      <h4>Accessible File Upload</h4>
      
      <div class="upload-controls">
        <label class="upload-label" :class="{ focused: focused }">
          <input
            type="file"
            @change="onChange"
            @focus="focused = true"
            @blur="focused = false"
            multiple
            accept="image/*,.pdf"
            aria-label="Choose files to upload"
            class="file-input">
          <span class="upload-icon" aria-hidden="true">📁</span>
          <span class="upload-text">Choose Files</span>
        </label>
      </div>

      <p class="help" id="file-help">
        Accepted formats: Images and PDFs. Max size: 5MB per file.
      </p>

      <div class="status" role="status" aria-live="polite">
        {{ status }}
      </div>

      <div v-if="files.length > 0" class="files-container">
        <h5>Selected ({{ files.length }}):</h5>
        <ul>
          <li v-for="(file, i) in files" :key="i">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">{{ formatSize(file.size) }}</span>
            <button @click="remove(i)" :aria-label="`Remove ${file.name}`" class="remove-btn">
              ×
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StyleAccessibilityComplete',
  data() {
    return {
      focused: false,
      files: [],
      status: 'Ready to upload'
    }
  },
  methods: {
    onChange(event) {
      const newFiles = Array.from(event.target.files);
      this.files = [...this.files, ...newFiles];
      this.status = `${this.files.length} file(s) selected`;
    },
    remove(index) {
      this.files.splice(index, 1);
      this.status = `File removed. ${this.files.length} file(s) remaining.`;
    },
    formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
  }
}
</script>

<style scoped>
.style-accessibility-complete {
  padding: 20px;
  max-width: 600px;
}

h3 { margin-bottom: 20px; }
h4 { margin: 0 0 12px 0; color: #0078d4; }
h5 { margin: 0 0 8px 0; font-size: 13px; }

.demo-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 20px;
}

.upload-controls {
  margin-bottom: 12px;
}

.upload-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  border: 2px solid transparent;
}

.upload-label:hover { background: #106ebe; }

.upload-label.focused {
  outline: 3px solid #0078d4;
  outline-offset: 2px;
}

.file-input {
  position: absolute;
  left: -10000px;
}

.help {
  margin: 0 0 12px 0;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

.status {
  padding: 8px 12px;
  background: #f0f7ff;
  border-left: 3px solid #0078d4;
  border-radius: 3px;
  font-size: 13px;
  margin-bottom: 12px;
  min-height: 20px;
}

.files-container {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 3px;
}

.files-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.files-container li {
  display: grid;
  grid-template-columns: 1fr auto 30px;
  gap: 8px;
  align-items: center;
  padding: 6px 8px;
  background: white;
  border-radius: 3px;
  margin-bottom: 4px;
  font-size: 12px;
}

.file-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  color: #666;
  font-size: 11px;
}

.remove-btn {
  width: 24px;
  height: 24px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
}

.remove-btn:focus {
  outline: 2px solid #0078d4;
  outline-offset: 2px;
}
</style>
```

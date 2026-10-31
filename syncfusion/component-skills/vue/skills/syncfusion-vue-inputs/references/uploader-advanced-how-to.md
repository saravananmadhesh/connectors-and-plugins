# Advanced How-To — Syncfusion Vue Uploader

## Table of Contents
- [Image Preview](#image-preview)
- [Programmatic Upload](#programmatic-upload)
- [Custom Buttons](#custom-buttons)
- [Examples](#examples)

---

## Image Preview

Preview images before upload:

```vue
<template>
  <div class="image-preview">
    <h4>Image Preview Before Upload</h4>

    <input
      type="file"
      @change="handleFiles"
      accept="image/*"
      multiple
      class="file-input">

    <div v-if="previews.length > 0" class="preview-grid">
      <div v-for="(preview, index) in previews" :key="index" class="preview-card">
        <img :src="preview.url" :alt="preview.name" class="preview-image">
        <div class="preview-info">
          <p class="preview-name">{{ preview.name }}</p>
          <p class="preview-size">{{ formatSize(preview.size) }}</p>
        </div>
        <button @click="removePreview(index)" class="btn-remove">×</button>
      </div>
    </div>

    <button v-if="previews.length > 0" @click="uploadAll" class="btn-upload">
      Upload All ({{ previews.length }})
    </button>
  </div>
</template>

<script>
export default {
  name: 'ImagePreview',
  data() {
    return {
      previews: []
    }
  },
  methods: {
    handleFiles(event) {
      const files = Array.from(event.target.files);
      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previews.push({
              name: file.name,
              size: file.size,
              url: e.target.result,
              file
            });
          };
          reader.readAsDataURL(file);
        }
      });
    },
    removePreview(index) {
      this.previews.splice(index, 1);
    },
    uploadAll() {
      console.log('Uploading', this.previews.length, 'files');
      alert(`Uploading ${this.previews.length} files...`);
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
h4 { margin: 0 0 12px 0; }

.file-input {
  margin-bottom: 15px;
  padding: 6px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  width: 100%;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 15px;
}

.preview-card {
  position: relative;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}

.preview-info {
  padding: 8px;
}

.preview-name {
  margin: 0 0 4px 0;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-size {
  margin: 0;
  font-size: 11px;
  color: #666;
}

.btn-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
}

.btn-upload {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}
</style>
```

---

## Programmatic Upload

Trigger upload programmatically:

```vue
<template>
  <div class="programmatic-upload">
    <h4>Programmatic Upload</h4>

    <div class="controls">
      <button @click="triggerFileSelect" class="btn-primary">
        Select File
      </button>
      <input
        ref="fileInput"
        type="file"
        @change="onFileSelected"
        class="sr-only">
      
      <button @click="startUpload" :disabled="!selectedFile || isUploading" class="btn-success">
        {{ isUploading ? 'Uploading...' : 'Upload' }}
      </button>
      
      <button @click="cancelUpload" :disabled="!isUploading" class="btn-danger">
        Cancel
      </button>
    </div>

    <div v-if="selectedFile" class="file-info">
      <h5>Selected File:</h5>
      <p>{{ selectedFile.name }} ({{ formatSize(selectedFile.size) }})</p>
    </div>

    <div v-if="isUploading" class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <p>{{ progress }}% - {{ statusText }}</p>
    </div>

    <div v-if="uploadResult" class="result-section">
      <h5>Upload Result:</h5>
      <pre>{{ JSON.stringify(uploadResult, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgrammaticUpload',
  data() {
    return {
      selectedFile: null,
      isUploading: false,
      progress: 0,
      statusText: '',
      uploadResult: null,
      uploadInterval: null
    }
  },
  methods: {
    triggerFileSelect() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.uploadResult = null;
    },
    async startUpload() {
      if (!this.selectedFile) return;
      
      this.isUploading = true;
      this.progress = 0;
      this.statusText = 'Uploading...';
      
      // Simulate upload with progress
      this.uploadInterval = setInterval(() => {
        this.progress += 10;
        if (this.progress >= 100) {
          clearInterval(this.uploadInterval);
          this.completeUpload();
        }
      }, 200);
    },
    completeUpload() {
      this.isUploading = false;
      this.statusText = 'Complete!';
      this.uploadResult = {
        fileName: this.selectedFile.name,
        size: this.selectedFile.size,
        url: `https://example.com/uploads/${this.selectedFile.name}`,
        uploadedAt: new Date().toISOString()
      };
    },
    cancelUpload() {
      clearInterval(this.uploadInterval);
      this.isUploading = false;
      this.progress = 0;
      this.statusText = 'Cancelled';
    },
    formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
  },
  beforeUnmount() {
    clearInterval(this.uploadInterval);
  }
}
</script>

<style scoped>
h4 { margin: 0 0 15px 0; }
h5 { margin: 0 0 8px 0; font-size: 13px; }
p { margin: 0 0 8px 0; font-size: 13px; }

.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

.sr-only {
  position: absolute;
  left: -10000px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
}

button:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-primary { background: #0078d4; color: white; }
.btn-success { background: #28a745; color: white; }
.btn-danger { background: #dc3545; color: white; }

.file-info {
  padding: 12px;
  background: #f0f7ff;
  border-radius: 3px;
  margin-bottom: 12px;
}

.progress-section {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 3px;
  margin-bottom: 12px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: #0078d4;
  transition: width 0.2s;
}

.result-section {
  padding: 12px;
  background: #d4edda;
  border-radius: 3px;
}

.result-section pre {
  margin: 0;
  font-size: 11px;
  white-space: pre-wrap;
}
</style>
```

---

## Custom Buttons

Custom upload button configurations:

```vue
<template>
  <div class="custom-buttons">
    <h4>Custom Button Styles</h4>

    <div class="button-grid">
      <div class="button-card">
        <h5>Browse Only</h5>
        <label class="btn-browse">
          <input type="file" class="hidden">
          <span>📁 Browse</span>
        </label>
      </div>

      <div class="button-card">
        <h5>Upload Button</h5>
        <label class="btn-upload-style">
          <input type="file" class="hidden">
          <span>⬆️ Upload File</span>
        </label>
      </div>

      <div class="button-card">
        <h5>Icon Button</h5>
        <label class="btn-icon">
          <input type="file" class="hidden">
          <span class="icon">+</span>
        </label>
      </div>

      <div class="button-card">
        <h5>Text Link</h5>
        <label class="btn-link">
          <input type="file" class="hidden">
          <span>Click to attach</span>
        </label>
      </div>

      <div class="button-card">
        <h5>Rounded Button</h5>
        <label class="btn-rounded">
          <input type="file" class="hidden">
          <span>Choose File</span>
        </label>
      </div>

      <div class="button-card">
        <h5>Outlined Button</h5>
        <label class="btn-outlined">
          <input type="file" class="hidden">
          <span>Select Files</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomButtons'
}
</script>

<style scoped>
h4 { margin: 0 0 15px 0; }
h5 { margin: 0 0 10px 0; font-size: 13px; text-align: center; }

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
}

.button-card {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
  text-align: center;
}

.hidden {
  position: absolute;
  left: -10000px;
}

/* Browse Button */
.btn-browse {
  display: inline-block;
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.btn-browse:hover {
  background: #106ebe;
}

/* Upload Style */
.btn-upload-style {
  display: inline-block;
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.btn-upload-style:hover {
  background: #218838;
}

/* Icon Button */
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #0078d4;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
}

.btn-icon:hover {
  background: #106ebe;
}

/* Text Link */
.btn-link {
  color: #0078d4;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
}

/* Rounded Button */
.btn-rounded {
  display: inline-block;
  padding: 10px 24px;
  background: #6c757d;
  color: white;
  border-radius: 24px;
  cursor: pointer;
  font-weight: bold;
}

.btn-rounded:hover {
  background: #5a6268;
}

/* Outlined Button */
.btn-outlined {
  display: inline-block;
  padding: 10px 20px;
  background: transparent;
  color: #0078d4;
  border: 2px solid #0078d4;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.btn-outlined:hover {
  background: #0078d4;
  color: white;
}
</style>
```

---

## Examples

### Complete Advanced How-To

```vue
<template>
  <div class="advanced-complete">
    <h3>Advanced How-To</h3>

    <div class="features-grid">
      <div class="feature-card">
        <h4>🖼️ Image Preview</h4>
        <input type="file" accept="image/*" @change="previewImage" class="file-input">
        <img v-if="previewUrl" :src="previewUrl" class="preview-img">
        <p v-else class="placeholder">Select an image to preview</p>
      </div>

      <div class="feature-card">
        <h4>📊 Auto Upload</h4>
        <input type="file" @change="autoUpload" class="file-input">
        <p v-if="lastUploadTime" class="info">Last uploaded: {{ lastUploadTime }}</p>
      </div>

      <div class="feature-card">
        <h4>🎨 Custom Style</h4>
        <label class="custom-upload">
          <input type="file" class="hidden">
          <span class="custom-icon">⬆️</span>
          <span>Custom Upload</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvancedComplete',
  data() {
    return {
      previewUrl: null,
      lastUploadTime: null
    }
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => { this.previewUrl = e.target.result; };
        reader.readAsDataURL(file);
      }
    },
    autoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Simulate auto upload
        setTimeout(() => {
          this.lastUploadTime = new Date().toLocaleTimeString();
        }, 1000);
      }
    }
  }
}
</script>

<style scoped>
.advanced-complete {
  padding: 20px;
  max-width: 900px;
}

h3 { margin-bottom: 20px; }
h4 { margin: 0 0 12px 0; font-size: 14px; color: #0078d4; }
p { margin: 8px 0 0 0; font-size: 12px; }

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.feature-card {
  padding: 20px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.file-input {
  width: 100%;
  padding: 6px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  margin-bottom: 10px;
}

.preview-img {
  max-width: 100%;
  max-height: 150px;
  border-radius: 3px;
  display: block;
  margin-top: 8px;
}

.placeholder {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 3px;
  margin: 8px 0 0 0;
}

.info {
  color: #28a745;
  font-weight: bold;
  text-align: center;
}

.custom-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  background: linear-gradient(135deg, #0078d4, #00b294);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.custom-upload:hover {
  opacity: 0.9;
}

.custom-icon {
  font-size: 24px;
}

.hidden {
  position: absolute;
  left: -10000px;
}
</style>
```

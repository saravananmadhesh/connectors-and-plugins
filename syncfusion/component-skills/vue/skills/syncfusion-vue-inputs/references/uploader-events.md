# Events — Syncfusion Vue Uploader

## Table of Contents
- [Upload Events](#upload-events)
- [File Selection Events](#file-selection-events)
- [Progress Events](#progress-events)
- [Examples](#examples)

---

## Upload Events

Handle upload lifecycle events:

```vue
<template>
  <div class="upload-events">
    <fieldset>
      <legend>Upload Events</legend>

      <div class="upload-area">
        <input
          type="file"
          @change="handleFileSelect"
          multiple
          class="file-input">
        <p>Selected files: {{ selectedFiles.length }}</p>
      </div>

      <button @click="simulateUpload" :disabled="selectedFiles.length === 0" class="btn-upload">
        Simulate Upload
      </button>

      <div class="event-log">
        <h4>Event Log:</h4>
        <ul>
          <li v-for="(event, index) in eventLog" :key="index" :class="event.type">
            <span class="event-time">{{ event.time }}</span>
            <span class="event-type">{{ event.type }}</span>
            <span class="event-msg">{{ event.message }}</span>
          </li>
        </ul>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'UploadEvents',
  data() {
    return {
      selectedFiles: [],
      eventLog: []
    }
  },
  methods: {
    handleFileSelect(event) {
      this.selectedFiles = Array.from(event.target.files);
      this.logEvent('selected', `${this.selectedFiles.length} file(s) selected`);
    },
    
    async simulateUpload() {
      this.logEvent('uploading', `Starting upload of ${this.selectedFiles.length} file(s)`);
      
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i];
        this.logEvent('progress', `Uploading ${file.name} (${i+1}/${this.selectedFiles.length})`);
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const success = Math.random() > 0.2;
        if (success) {
          this.logEvent('success', `${file.name} uploaded successfully`);
        } else {
          this.logEvent('failure', `${file.name} upload failed`);
        }
      }
      
      this.logEvent('complete', 'All uploads completed');
    },
    
    logEvent(type, message) {
      this.eventLog.unshift({
        type,
        message,
        time: new Date().toLocaleTimeString()
      });
      if (this.eventLog.length > 20) {
        this.eventLog = this.eventLog.slice(0, 20);
      }
    }
  }
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

.upload-area {
  padding: 20px;
  background: #f9f9f9;
  border: 2px dashed #ccc;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 12px;
}

.file-input {
  display: block;
  margin: 0 auto 10px;
}

.btn-upload {
  width: 100%;
  padding: 10px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 15px;
}

.btn-upload:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.event-log {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 4px;
}

.event-log h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
}

.event-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
}

.event-log li {
  padding: 6px 8px;
  margin-bottom: 3px;
  border-radius: 3px;
  font-size: 12px;
  display: flex;
  gap: 8px;
  background: white;
}

.event-log li.selected { background: #e3f2fd; }
.event-log li.uploading { background: #fff3cd; }
.event-log li.progress { background: #d1ecf1; }
.event-log li.success { background: #d4edda; }
.event-log li.failure { background: #f8d7da; }
.event-log li.complete { background: #d4edda; font-weight: bold; }

.event-time {
  color: #999;
  font-family: monospace;
  min-width: 80px;
}

.event-type {
  font-weight: bold;
  min-width: 70px;
  color: #0078d4;
}

.event-msg {
  flex: 1;
}
</style>
```

---

## File Selection Events

Handle file selection and validation:

```vue
<template>
  <div class="selection-events">
    <h4>File Selection Events</h4>

    <div class="file-input-wrapper">
      <label class="file-label">
        <input
          type="file"
          @change="onFileChange"
          accept=".pdf,.doc,.docx"
          multiple
          class="file-input-hidden">
        <span class="file-label-text">Choose Files</span>
      </label>
      <span v-if="selectedFile" class="file-info">
        {{ selectedFile.name }} ({{ formatSize(selectedFile.size) }})
      </span>
    </div>

    <div v-if="validationError" class="error">
      ✗ {{ validationError }}
    </div>

    <div v-if="selectedFile" class="file-details">
      <h5>File Details:</h5>
      <p><strong>Name:</strong> {{ selectedFile.name }}</p>
      <p><strong>Type:</strong> {{ selectedFile.type || 'Unknown' }}</p>
      <p><strong>Size:</strong> {{ formatSize(selectedFile.size) }}</p>
      <p><strong>Last Modified:</strong> {{ formatDate(selectedFile.lastModified) }}</p>
    </div>

    <div v-if="fileHistory.length > 0" class="history">
      <h5>Selection History:</h5>
      <ul>
        <li v-for="(item, index) in fileHistory" :key="index">
          <span class="time">{{ item.time }}</span>
          <span class="name">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectionEvents',
  data() {
    return {
      selectedFile: null,
      validationError: '',
      fileHistory: []
    }
  },
  methods: {
    onFileChange(event) {
      this.validationError = '';
      const file = event.target.files[0];
      
      if (!file) {
        this.selectedFile = null;
        return;
      }
      
      // Validate file
      const validExtensions = ['.pdf', '.doc', '.docx'];
      const extension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!validExtensions.includes(extension)) {
        this.validationError = `Invalid file type. Only ${validExtensions.join(', ')} are allowed.`;
        event.target.value = '';
        return;
      }
      
      const maxSize = 10 * 1024 * 1024; // 10 MB
      if (file.size > maxSize) {
        this.validationError = `File too large. Max size is ${this.formatSize(maxSize)}.`;
        event.target.value = '';
        return;
      }
      
      this.selectedFile = file;
      this.fileHistory.unshift({
        name: file.name,
        time: new Date().toLocaleTimeString()
      });
      if (this.fileHistory.length > 5) {
        this.fileHistory = this.fileHistory.slice(0, 5);
      }
    },
    formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString();
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

h5 {
  margin: 12px 0 6px 0;
  font-size: 13px;
}

.file-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.file-label {
  cursor: pointer;
}

.file-input-hidden {
  display: none;
}

.file-label-text {
  display: inline-block;
  padding: 8px 16px;
  background: #0078d4;
  color: white;
  border-radius: 3px;
  font-weight: bold;
  font-size: 13px;
}

.file-label:hover .file-label-text {
  background: #106ebe;
}

.file-info {
  font-size: 13px;
  color: #666;
}

.error {
  padding: 8px 12px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 3px;
  font-size: 13px;
  margin-bottom: 12px;
}

.file-details {
  padding: 12px;
  background: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 12px;
}

.file-details p {
  margin: 0 0 4px 0;
  font-size: 12px;
}

.history {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

.history ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history li {
  padding: 4px 0;
  font-size: 12px;
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.history li:last-child {
  border-bottom: none;
}

.time {
  color: #999;
  font-family: monospace;
  min-width: 80px;
}

.name {
  color: #333;
}
</style>
```

---

## Progress Events

Track upload progress:

```vue
<template>
  <div class="progress-events">
    <h4>Upload Progress Tracking</h4>

    <div class="upload-controls">
      <input
        type="file"
        @change="handleFiles"
        multiple
        class="file-input">
      <button
        @click="startUpload"
        :disabled="isUploading || files.length === 0"
        class="btn-upload">
        {{ isUploading ? 'Uploading...' : 'Start Upload' }}
      </button>
    </div>

    <div v-if="files.length > 0" class="files-list">
      <div v-for="(file, index) in files" :key="index" class="file-item">
        <div class="file-header">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-status" :class="file.status">
            {{ getStatusText(file.status) }}
          </span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: file.progress + '%' }">
          </div>
        </div>
        <div class="file-meta">
          <span>{{ file.progress }}%</span>
          <span>{{ formatSize(file.size) }}</span>
        </div>
      </div>
    </div>

    <div v-if="overallProgress > 0" class="overall-progress">
      <h5>Overall Progress: {{ overallProgress }}%</h5>
      <div class="progress-bar overall">
        <div class="progress-fill" :style="{ width: overallProgress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressEvents',
  data() {
    return {
      files: [],
      isUploading: false
    }
  },
  computed: {
    overallProgress() {
      if (this.files.length === 0) return 0;
      const total = this.files.reduce((sum, f) => sum + f.progress, 0);
      return Math.round(total / this.files.length);
    }
  },
  methods: {
    handleFiles(event) {
      this.files = Array.from(event.target.files).map(file => ({
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'pending'
      }));
    },
    async startUpload() {
      this.isUploading = true;
      
      for (let file of this.files) {
        file.status = 'uploading';
        await this.simulateFileUpload(file);
        
        const success = Math.random() > 0.15;
        file.status = success ? 'success' : 'failure';
        file.progress = success ? 100 : file.progress;
      }
      
      this.isUploading = false;
    },
    simulateFileUpload(file) {
      return new Promise(resolve => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15;
          if (progress >= 100) {
            progress = 100;
            file.progress = 100;
            clearInterval(interval);
            resolve();
          } else {
            file.progress = Math.round(progress);
          }
        }, 200);
      });
    },
    getStatusText(status) {
      const map = {
        pending: 'Pending',
        uploading: 'Uploading...',
        success: '✓ Complete',
        failure: '✗ Failed'
      };
      return map[status] || status;
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
h4 {
  margin: 0 0 15px 0;
}

h5 {
  margin: 15px 0 6px 0;
  font-size: 13px;
}

.upload-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

.file-input {
  flex: 1;
  padding: 6px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
}

.btn-upload {
  padding: 8px 16px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.btn-upload:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.files-list {
  margin-bottom: 15px;
}

.file-item {
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 8px;
}

.file-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.file-name {
  font-weight: bold;
  font-size: 13px;
}

.file-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 3px;
  background: #e0e0e0;
}

.file-status.uploading {
  background: #fff3cd;
  color: #856404;
}

.file-status.success {
  background: #d4edda;
  color: #155724;
}

.file-status.failure {
  background: #f8d7da;
  color: #721c24;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #0078d4, #00b294);
  transition: width 0.3s ease;
}

.progress-bar.overall {
  height: 12px;
}

.file-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #666;
}

.overall-progress {
  padding: 12px;
  background: #f0f7ff;
  border-radius: 4px;
}
</style>
```

---

## Examples

### Complete Events Demo

```vue
<template>
  <div class="events-complete">
    <h3>Uploader Events</h3>

    <div class="demo-section">
      <h4>Comprehensive Event Tracking</h4>
      
      <div class="uploader-area">
        <input
          type="file"
          @change="onSelect"
          @click="onClick"
          multiple
          class="file-input">
      </div>

      <div v-if="files.length > 0" class="files-display">
        <div v-for="(file, index) in files" :key="index" class="file-row">
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatSize(file.size) }}</span>
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress" :style="{ width: file.progress + '%' }"></div>
            </div>
            <span class="progress-text">{{ file.progress }}%</span>
          </div>
          <button @click="removeFile(index)" class="btn-remove">×</button>
        </div>
      </div>

      <div class="action-buttons">
        <button @click="uploadAll" :disabled="isUploading || files.length === 0" class="btn-primary">
          Upload All
        </button>
        <button @click="clearAll" :disabled="files.length === 0" class="btn-clear">
          Clear All
        </button>
      </div>

      <div class="event-stream">
        <h5>Event Stream:</h5>
        <div class="stream-content">
          <div v-for="(event, idx) in eventStream" :key="idx" :class="['event-item', event.level]">
            <span class="event-time">{{ event.time }}</span>
            <span class="event-name">{{ event.name }}</span>
            <span class="event-msg">{{ event.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsComplete',
  data() {
    return {
      files: [],
      isUploading: false,
      eventStream: []
    }
  },
  methods: {
    onClick() {
      this.logEvent('click', 'File input clicked', 'info');
    },
    onSelect(event) {
      const newFiles = Array.from(event.target.files);
      this.files = newFiles.map(f => ({
        name: f.name,
        size: f.size,
        progress: 0
      }));
      this.logEvent('select', `${newFiles.length} file(s) selected`, 'info');
    },
    async uploadAll() {
      this.isUploading = true;
      this.logEvent('uploading', 'Upload started', 'info');
      
      for (let i = 0; i < this.files.length; i++) {
        await this.uploadFile(this.files[i], i + 1, this.files.length);
      }
      
      this.isUploading = false;
      this.logEvent('complete', 'All files uploaded', 'success');
    },
    async uploadFile(file, current, total) {
      this.logEvent('progress', `Uploading ${file.name} (${current}/${total})`, 'info');
      
      for (let p = 0; p <= 100; p += 10) {
        await new Promise(r => setTimeout(r, 100));
        file.progress = p;
      }
      
      const success = Math.random() > 0.1;
      if (success) {
        this.logEvent('success', `${file.name} uploaded successfully`, 'success');
      } else {
        this.logEvent('failure', `${file.name} upload failed`, 'error');
      }
    },
    removeFile(index) {
      const name = this.files[index].name;
      this.files.splice(index, 1);
      this.logEvent('remove', `${name} removed from list`, 'warning');
    },
    clearAll() {
      this.files = [];
      this.logEvent('clear', 'All files cleared', 'warning');
    },
    logEvent(name, message, level = 'info') {
      this.eventStream.unshift({
        name,
        message,
        level,
        time: new Date().toLocaleTimeString()
      });
      if (this.eventStream.length > 30) {
        this.eventStream = this.eventStream.slice(0, 30);
      }
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
.events-complete {
  padding: 20px;
  max-width: 900px;
}

h3 { margin-bottom: 20px; }
h4 { margin: 0 0 15px 0; border-bottom: 2px solid #0078d4; padding-bottom: 6px; }
h5 { margin: 15px 0 8px 0; font-size: 13px; }

.demo-section {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.uploader-area {
  padding: 30px;
  background: #f9f9f9;
  border: 2px dashed #ccc;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
}

.file-input {
  font-size: 14px;
}

.files-display {
  margin-bottom: 15px;
}

.file-row {
  display: grid;
  grid-template-columns: 1fr auto 200px 30px;
  gap: 10px;
  align-items: center;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 3px;
  margin-bottom: 6px;
}

.file-name {
  font-size: 13px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  font-size: 11px;
  color: #666;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 6px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #0078d4;
  transition: width 0.2s;
}

.progress-text {
  font-size: 11px;
  color: #666;
  min-width: 35px;
  text-align: right;
}

.btn-remove {
  width: 24px;
  height: 24px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary { background: #0078d4; color: white; }
.btn-clear { background: #dc3545; color: white; }

.event-stream {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 4px;
}

.stream-content {
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border-radius: 3px;
}

.event-item {
  padding: 6px 10px;
  font-size: 12px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.event-item.info { background: #e3f2fd; }
.event-item.success { background: #d4edda; }
.event-item.warning { background: #fff3cd; }
.event-item.error { background: #f8d7da; }

.event-time {
  color: #999;
  font-family: monospace;
  min-width: 80px;
}

.event-name {
  font-weight: bold;
  min-width: 80px;
  color: #0078d4;
}

.event-msg {
  flex: 1;
}
</style>
```

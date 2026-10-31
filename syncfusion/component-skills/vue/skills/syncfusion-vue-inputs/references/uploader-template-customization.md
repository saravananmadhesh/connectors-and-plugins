# Uploader Template Customization - Vue 3

## Overview

Template customization allows you to create fully custom file list displays. Instead of using the default file list template, you can design your own layout with Vue components.

---

## Basic Template Customization

```vue
<template>
  <div class="uploader-custom-template">
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      :autoUpload="false"
      :template="customTemplate"
      @selected="onSelected"
      @success="onSuccess"
      @removing="onRemoving"
    />

    <!-- Custom Template -->
    <template #custom-file-list>
      <div v-for="file in fileList" :key="file.name" class="custom-file-item">
        <div class="file-icon">
          <i :class="getFileIcon(file.name)"></i>
        </div>
        <div class="file-info">
          <p class="file-name">{{ file.name }}</p>
          <p class="file-size">{{ formatBytes(file.size) }}</p>
          <p class="file-status">{{ file.status }}</p>
        </div>
        <div class="file-progress" v-if="file.isUploading">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: file.progress + '%' }"
            ></div>
          </div>
          <p class="progress-text">{{ file.progress }}%</p>
        </div>
        <div class="file-actions">
          <button 
            @click="pauseFile(file)" 
            v-if="file.isUploading"
            class="btn-pause"
          >
            ⏸
          </button>
          <button 
            @click="removeFile(file)" 
            class="btn-remove"
          >
            ✕
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);
const fileList = ref([]);

const asyncSettings = reactive({
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
});

// Template string (used as fallback)
const customTemplate = `
  <div class="e-file-select-wrap">
    <button class="e-file-select-btn e-btn">Browse</button>
  </div>
`;

const getFileIcon = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase();
  const icons = {
    'pdf': 'fa fa-file-pdf',
    'doc': 'fa fa-file-word',
    'docx': 'fa fa-file-word',
    'xls': 'fa fa-file-excel',
    'xlsx': 'fa fa-file-excel',
    'ppt': 'fa fa-file-powerpoint',
    'pptx': 'fa fa-file-powerpoint',
    'txt': 'fa fa-file-text',
    'jpg': 'fa fa-image',
    'png': 'fa fa-image',
    'gif': 'fa fa-image',
    'zip': 'fa fa-file-archive',
    'rar': 'fa fa-file-archive'
  };
  return icons[ext] || 'fa fa-file';
};

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const onSelected = (args) => {
  args.filesData.forEach((file) => {
    fileList.value.push({
      name: file.name,
      size: file.size,
      status: 'Ready',
      progress: 0,
      isUploading: false
    });
  });
};

const onSuccess = (args) => {
  const file = fileList.value.find(f => f.name === args.file.name);
  if (file) {
    file.status = 'Uploaded';
    file.isUploading = false;
    file.progress = 100;
  }
};

const onRemoving = (args) => {
  fileList.value = fileList.value.filter(
    f => f.name !== args.filesData[0].name
  );
};

const pauseFile = (file) => {
  file.isUploading = false;
  file.status = 'Paused';
};

const removeFile = (file) => {
  const index = fileList.value.indexOf(file);
  if (index > -1) {
    fileList.value.splice(index, 1);
  }
};
</script>

<style scoped>
.uploader-custom-template {
  padding: 20px;
}

.custom-file-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  margin: 10px 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.file-icon {
  font-size: 32px;
  color: #007bff;
  width: 40px;
  text-align: center;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  margin: 0;
  font-weight: 600;
  word-break: break-word;
}

.file-size {
  margin: 5px 0 0 0;
  font-size: 0.85rem;
  color: #666;
}

.file-status {
  margin: 3px 0 0 0;
  font-size: 0.8rem;
  color: #999;
}

.file-progress {
  flex: 0 0 150px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s ease;
}

.progress-text {
  margin: 0;
  font-size: 0.75rem;
  text-align: center;
  color: #666;
}

.file-actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 6px 10px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

button:hover {
  background-color: #f0f0f0;
  border-color: #999;
}

.btn-pause:hover {
  color: #ffc107;
}

.btn-remove:hover {
  color: #dc3545;
  border-color: #dc3545;
}
</style>
```

---

## Advanced Template with Drag and Drop

```vue
<template>
  <div class="uploader-advanced">
    <!-- Upload Area -->
    <div 
      class="upload-zone"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      :class="{ 'is-dragging': isDragging }"
    >
      <div class="upload-prompt" v-if="fileList.length === 0">
        <i class="fa fa-cloud-upload"></i>
        <p>Drag and drop files here or click to browse</p>
      </div>
    </div>

    <!-- File List -->
    <div v-if="fileList.length > 0" class="file-list-container">
      <div class="list-header">
        <span>{{ fileList.length }} files selected</span>
        <button @click="clearAll" class="btn-clear-all">Clear All</button>
      </div>

      <div class="file-cards">
        <div v-for="file in fileList" :key="file.id" class="file-card">
          <!-- File Header -->
          <div class="card-header">
            <div class="file-type-badge" :style="{ backgroundColor: getFileColor(file.name) }">
              {{ getFileExtension(file.name).toUpperCase() }}
            </div>
            <div class="card-title">
              <h4>{{ file.name }}</h4>
              <p>{{ formatBytes(file.size) }}</p>
            </div>
            <button @click="removeFile(file)" class="btn-close">✕</button>
          </div>

          <!-- Progress Bar -->
          <div v-if="file.isUploading" class="card-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: file.progress + '%' }"></div>
            </div>
            <div class="progress-info">
              <span>{{ file.progress }}%</span>
              <span v-if="file.speed">{{ file.speed }} MB/s</span>
            </div>
          </div>

          <!-- File Status -->
          <div v-if="!file.isUploading" class="card-status" :class="`status-${file.status.toLowerCase()}`">
            <i :class="getStatusIcon(file.status)"></i>
            <span>{{ file.status }}</span>
          </div>

          <!-- File Actions -->
          <div class="card-actions">
            <button 
              @click="uploadFile(file)"
              v-if="file.status === 'Ready'"
              class="btn-upload"
            >
              Upload
            </button>
            <button 
              @click="pauseFile(file)"
              v-if="file.isUploading"
              class="btn-pause"
            >
              Pause
            </button>
            <button 
              @click="resumeFile(file)"
              v-if="file.status === 'Paused'"
              class="btn-resume"
            >
              Resume
            </button>
          </div>
        </div>
      </div>

      <!-- Upload Summary -->
      <div class="upload-summary">
        <div class="summary-stat">
          <span class="label">Total Size:</span>
          <span class="value">{{ formatBytes(totalSize) }}</span>
        </div>
        <div class="summary-stat">
          <span class="label">Uploaded:</span>
          <span class="value">{{ uploadedCount }} / {{ fileList.length }}</span>
        </div>
        <button @click="uploadAll" class="btn-upload-all">Upload All</button>
      </div>
    </div>

    <!-- UploaderComponent (hidden, used for backend integration) -->
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      :autoUpload="false"
      style="display: none"
      @progress="onProgress"
      @success="onSuccess"
      @failure="onFailure"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);
const fileList = ref([]);
const isDragging = ref(false);
let fileIdCounter = 0;

const asyncSettings = reactive({
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
});

const totalSize = computed(() => {
  return fileList.value.reduce((sum, f) => sum + f.size, 0);
});

const uploadedCount = computed(() => {
  return fileList.value.filter(f => f.status === 'Uploaded').length;
});

// File type colors
const fileColorMap = {
  'pdf': '#FF6B6B',
  'doc': '#4ECDC4',
  'docx': '#4ECDC4',
  'xls': '#95E1D3',
  'xlsx': '#95E1D3',
  'ppt': '#FFA07A',
  'pptx': '#FFA07A',
  'jpg': '#FFD93D',
  'png': '#FFD93D',
  'zip': '#A8DADC',
  'rar': '#A8DADC'
};

const getFileExtension = (fileName) => {
  return fileName.split('.').pop().toLowerCase();
};

const getFileColor = (fileName) => {
  const ext = getFileExtension(fileName);
  return fileColorMap[ext] || '#999';
};

const getFileIcon = (fileName) => {
  const ext = getFileExtension(fileName);
  const icons = {
    'pdf': 'fa fa-file-pdf',
    'doc': 'fa fa-file-word',
    'docx': 'fa fa-file-word',
    'xls': 'fa fa-file-excel',
    'xlsx': 'fa fa-file-excel',
    'ppt': 'fa fa-file-powerpoint',
    'pptx': 'fa fa-file-powerpoint',
    'txt': 'fa fa-file-text',
    'jpg': 'fa fa-image',
    'png': 'fa fa-image',
    'gif': 'fa fa-image',
    'zip': 'fa fa-file-archive',
    'rar': 'fa fa-file-archive'
  };
  return icons[ext] || 'fa fa-file';
};

const getStatusIcon = (status) => {
  const icons = {
    'Ready': 'fa fa-circle-o',
    'Uploading': 'fa fa-spinner fa-spin',
    'Uploaded': 'fa fa-check-circle',
    'Failed': 'fa fa-exclamation-circle',
    'Paused': 'fa fa-pause-circle'
  };
  return icons[status] || 'fa fa-file';
};

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Drag and drop handlers
const onDragOver = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const onDragLeave = () => {
  isDragging.value = false;
};

const onDrop = (e) => {
  e.preventDefault();
  isDragging.value = false;

  const files = e.dataTransfer.files;
  addFiles(files);
};

const addFiles = (fileObjects) => {
  for (const file of fileObjects) {
    fileList.value.push({
      id: ++fileIdCounter,
      file: file,
      name: file.name,
      size: file.size,
      status: 'Ready',
      progress: 0,
      isUploading: false,
      speed: 0
    });
  }
};

const removeFile = (file) => {
  const index = fileList.value.findIndex(f => f.id === file.id);
  if (index > -1) {
    fileList.value.splice(index, 1);
  }
};

const clearAll = () => {
  fileList.value = [];
};

const uploadFile = (file) => {
  file.status = 'Uploading';
  file.isUploading = true;
  
  // Simulate upload
  const interval = setInterval(() => {
    if (file.progress >= 100) {
      clearInterval(interval);
      file.isUploading = false;
      file.status = 'Uploaded';
    } else {
      file.progress += Math.random() * 30;
      file.progress = Math.min(file.progress, 100);
      file.speed = (Math.random() * 2).toFixed(2);
    }
  }, 500);
};

const uploadAll = () => {
  fileList.value.forEach(file => {
    if (file.status === 'Ready') {
      uploadFile(file);
    }
  });
};

const pauseFile = (file) => {
  file.isUploading = false;
  file.status = 'Paused';
};

const resumeFile = (file) => {
  uploadFile(file);
};

const onProgress = (args) => {
  const file = fileList.value.find(f => f.name === args.file.name);
  if (file) {
    file.progress = args.percentComplete;
  }
};

const onSuccess = (args) => {
  const file = fileList.value.find(f => f.name === args.file.name);
  if (file) {
    file.status = 'Uploaded';
    file.isUploading = false;
    file.progress = 100;
  }
};

const onFailure = (args) => {
  const file = fileList.value.find(f => f.name === args.file.name);
  if (file) {
    file.status = 'Failed';
    file.isUploading = false;
  }
};
</script>

<style scoped>
.uploader-advanced {
  padding: 20px;
  max-width: 600px;
}

.upload-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  background-color: #f9f9f9;
  transition: all 0.3s;
  cursor: pointer;
}

.upload-zone.is-dragging {
  border-color: #007bff;
  background-color: #e7f3ff;
}

.upload-prompt i {
  font-size: 48px;
  color: #007bff;
  margin-bottom: 10px;
}

.upload-prompt p {
  color: #666;
  margin: 10px 0 0 0;
}

.file-list-container {
  margin-top: 20px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.btn-clear-all {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.file-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.file-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.file-type-badge {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
}

.card-title {
  flex: 1;
  min-width: 0;
}

.card-title h4 {
  margin: 0 0 3px 0;
  word-break: break-word;
}

.card-title p {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
}

.btn-close {
  padding: 4px 8px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #ccc;
}

.btn-close:hover {
  color: #dc3545;
}

.card-progress {
  margin-bottom: 10px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #666;
}

.card-status {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  text-align: center;
}

.card-status i {
  margin-right: 5px;
}

.status-ready {
  background-color: #e7f3ff;
  color: #004085;
}

.status-uploading {
  background-color: #fff3cd;
  color: #856404;
}

.status-uploaded {
  background-color: #d4edda;
  color: #155724;
}

.status-failed {
  background-color: #f8d7da;
  color: #721c24;
}

.status-paused {
  background-color: #e2e3e5;
  color: #383d41;
}

.card-actions {
  display: flex;
  gap: 8px;
}

button {
  flex: 1;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

button:hover {
  background-color: #0056b3;
}

.btn-pause {
  background-color: #ffc107;
}

.btn-pause:hover {
  background-color: #e0a800;
}

.btn-resume {
  background-color: #28a745;
}

.btn-resume:hover {
  background-color: #218838;
}

.upload-summary {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.summary-stat {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-stat .label {
  font-weight: 600;
}

.summary-stat .value {
  color: #666;
}

.btn-upload-all {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #28a745;
  font-weight: 600;
}

.btn-upload-all:hover {
  background-color: #218838;
}
</style>
```

---

## Template Best Practices

1. **Keep it Simple**
   - Don't overcomplicate the template
   - Focus on essential information
   - Maintain good performance

2. **Show Progress Clearly**
   - Use progress bars for uploads
   - Show percentage and speed
   - Indicate current file being processed

3. **Provide Clear Actions**
   - Upload, pause, resume, and remove buttons
   - Disable buttons when not applicable
   - Show status clearly

4. **Handle Edge Cases**
   - Empty file list
   - Large number of files
   - Failed uploads
   - Paused uploads

5. **Maintain Responsiveness**
   - Use responsive layout
   - Adapt to different screen sizes
   - Ensure mobile-friendly design


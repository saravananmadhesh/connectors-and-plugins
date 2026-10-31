# Sequential Upload — Syncfusion Vue Uploader

## Table of Contents
- [Sequential Configuration](#sequential-configuration)
- [Parallel vs Sequential](#parallel-vs-sequential)
- [Upload Queue](#upload-queue)
- [Examples](#examples)

---

## Sequential Configuration

Upload files one at a time:

```vue
<template>
  <div class="sequential-config">
    <fieldset>
      <legend>Sequential Upload</legend>

      <div class="upload-mode">
        <label>
          <input
            type="radio"
            v-model="uploadMode"
            value="sequential">
          Sequential (one at a time)
        </label>
        <label>
          <input
            type="radio"
            v-model="uploadMode"
            value="parallel">
          Parallel (simultaneous)
        </label>
      </div>

      <div class="upload-area">
        <input
          type="file"
          @change="handleFiles"
          multiple
          class="file-input">
        <p>Selected: {{ files.length }} files</p>
      </div>

      <button
        @click="startUpload"
        :disabled="isUploading || files.length === 0"
        class="btn-upload">
        {{ isUploading ? 'Uploading...' : `Start ${uploadMode} upload` }}
      </button>

      <div v-if="files.length > 0" class="queue">
        <h4>Upload Queue ({{ uploadMode }}):</h4>
        <div
          v-for="(file, index) in files"
          :key="index"
          :class="['queue-item', file.status]">
          <span class="queue-index">#{{ index + 1 }}</span>
          <span class="queue-name">{{ file.name }}</span>
          <span class="queue-status">{{ getStatusText(file.status) }}</span>
          <div class="queue-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: file.progress + '%' }"></div>
            </div>
            <span class="progress-text">{{ file.progress }}%</span>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'SequentialUpload',
  data() {
    return {
      uploadMode: 'sequential',
      files: [],
      isUploading: false
    }
  },
  methods: {
    handleFiles(event) {
      this.files = Array.from(event.target.files).map(f => ({
        name: f.name,
        size: f.size,
        progress: 0,
        status: 'pending'
      }));
    },
    async startUpload() {
      this.isUploading = true;
      
      if (this.uploadMode === 'sequential') {
        await this.sequentialUpload();
      } else {
        await this.parallelUpload();
      }
      
      this.isUploading = false;
    },
    async sequentialUpload() {
      for (let file of this.files) {
        file.status = 'uploading';
        await this.simulateUpload(file);
        file.status = 'success';
        file.progress = 100;
      }
    },
    async parallelUpload() {
      const uploads = this.files.map(async (file) => {
        file.status = 'uploading';
        await this.simulateUpload(file);
        file.status = 'success';
        file.progress = 100;
      });
      await Promise.all(uploads);
    },
    simulateUpload(file) {
      return new Promise(resolve => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (progress >= 100) {
            file.progress = 100;
            clearInterval(interval);
            resolve();
          } else {
            file.progress = progress;
          }
        }, 200);
      });
    },
    getStatusText(status) {
      const map = {
        pending: '⏳ Waiting',
        uploading: '⬆️ Uploading',
        success: '✓ Done'
      };
      return map[status] || status;
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

.upload-mode {
  display: flex;
  gap: 15px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
}

.upload-mode label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  cursor: pointer;
}

.upload-area {
  padding: 20px;
  background: #f9f9f9;
  border: 2px dashed #ccc;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 12px;
}

.upload-area p {
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #666;
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

.queue h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
}

.queue-item {
  display: grid;
  grid-template-columns: 30px 1fr auto 200px;
  gap: 10px;
  align-items: center;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 3px;
  margin-bottom: 6px;
  font-size: 12px;
}

.queue-item.uploading {
  background: #fff3cd;
  border-left: 3px solid #ffc107;
}

.queue-item.success {
  background: #d4edda;
  border-left: 3px solid #28a745;
}

.queue-index {
  font-weight: bold;
  color: #0078d4;
}

.queue-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.queue-status {
  font-size: 11px;
  font-weight: bold;
}

.queue-progress {
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

.progress-fill {
  height: 100%;
  background: #0078d4;
  transition: width 0.2s;
}

.progress-text {
  min-width: 35px;
  text-align: right;
  font-size: 11px;
}
</style>
```

---

## Parallel vs Sequential

Compare upload strategies:

```vue
<template>
  <div class="parallel-sequential">
    <h4>Parallel vs Sequential</h4>

    <div class="comparison-grid">
      <div class="comparison-card">
        <h5>Sequential Upload</h5>
        <ul>
          <li>✓ One file at a time</li>
          <li>✓ Lower server load</li>
          <li>✓ Easier error handling</li>
          <li>✗ Slower for multiple files</li>
        </ul>
        <p class="use-case">Best for: Limited bandwidth, API rate limits</p>
      </div>

      <div class="comparison-card">
        <h5>Parallel Upload</h5>
        <ul>
          <li>✓ Multiple files simultaneously</li>
          <li>✓ Faster total upload time</li>
          <li>✓ Better for batch uploads</li>
          <li>✗ Higher server load</li>
        </ul>
        <p class="use-case">Best for: Fast networks, bulk uploads</p>
      </div>
    </div>

    <div class="demo-controls">
      <input
        type="file"
        @change="onFilesSelected"
        multiple
        class="file-input">
      <p>Selected: {{ files.length }} files</p>

      <div class="strategy-buttons">
        <button @click="uploadSequential" :disabled="isUploading" class="btn-sequential">
          Sequential
        </button>
        <button @click="uploadParallel" :disabled="isUploading" class="btn-parallel">
          Parallel
        </button>
      </div>

      <div v-if="lastStrategy" class="result">
        <p>Last strategy: <strong>{{ lastStrategy }}</strong></p>
        <p>Time taken: <strong>{{ elapsedTime }}ms</strong></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParallelSequential',
  data() {
    return {
      files: [],
      isUploading: false,
      lastStrategy: '',
      elapsedTime: 0
    }
  },
  methods: {
    onFilesSelected(e) {
      this.files = Array.from(e.target.files);
    },
    async uploadSequential() {
      if (this.files.length === 0) return;
      this.isUploading = true;
      this.lastStrategy = 'Sequential';
      const start = Date.now();
      
      for (let file of this.files) {
        await this.simulateUpload(file);
      }
      
      this.elapsedTime = Date.now() - start;
      this.isUploading = false;
    },
    async uploadParallel() {
      if (this.files.length === 0) return;
      this.isUploading = true;
      this.lastStrategy = 'Parallel';
      const start = Date.now();
      
      await Promise.all(this.files.map(f => this.simulateUpload(f)));
      
      this.elapsedTime = Date.now() - start;
      this.isUploading = false;
    },
    simulateUpload(file) {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`Uploaded ${file.name}`);
          resolve();
        }, 1000);
      });
    }
  }
}
</script>

<style scoped>
h4 { margin: 0 0 15px 0; }
h5 { margin: 0 0 8px 0; color: #0078d4; }
p { margin: 0 0 8px 0; font-size: 13px; }

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.comparison-card {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
  border-left: 4px solid #0078d4;
}

.comparison-card ul {
  margin: 8px 0;
  padding-left: 20px;
  font-size: 12px;
  line-height: 1.6;
}

.use-case {
  margin-top: 8px;
  padding: 6px;
  background: white;
  border-radius: 3px;
  font-size: 11px;
  color: #666;
  font-style: italic;
}

.demo-controls {
  padding: 15px;
  background: #f0f7ff;
  border-radius: 4px;
}

.file-input {
  margin-bottom: 8px;
}

.strategy-buttons {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.strategy-buttons button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.strategy-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-sequential { background: #0078d4; color: white; }
.btn-parallel { background: #28a745; color: white; }

.result {
  padding: 10px;
  background: white;
  border-radius: 3px;
}

.result p {
  margin: 0 0 4px 0;
  font-size: 12px;
}
</style>
```

---

## Upload Queue

Manage upload queue with priorities:

```vue
<template>
  <div class="upload-queue">
    <h4>Upload Queue Management</h4>

    <div class="queue-controls">
      <input
        type="file"
        @change="addToQueue"
        multiple
        class="file-input">
      <button @click="processQueue" :disabled="isProcessing" class="btn-process">
        {{ isProcessing ? 'Processing...' : 'Process Queue' }}
      </button>
      <button @click="clearQueue" class="btn-clear">Clear</button>
    </div>

    <div v-if="queue.length > 0" class="queue-stats">
      <p>Total: <strong>{{ queue.length }}</strong></p>
      <p>Pending: <strong>{{ pendingCount }}</strong></p>
      <p>Uploading: <strong>{{ uploadingCount }}</strong></p>
      <p>Completed: <strong>{{ completedCount }}</strong></p>
    </div>

    <div v-if="queue.length > 0" class="queue-list">
      <h5>Queue:</h5>
      <div
        v-for="(item, index) in queue"
        :key="item.id"
        :class="['queue-row', item.status]">
        <span class="queue-pos">{{ index + 1 }}</span>
        <span class="queue-name">{{ item.name }}</span>
        <span class="queue-priority" :class="`priority-${item.priority}`">
          {{ item.priority }}
        </span>
        <span class="queue-status">{{ item.status }}</span>
        <div class="queue-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: item.progress + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadQueue',
  data() {
    return {
      queue: [],
      isProcessing: false,
      nextId: 1
    }
  },
  computed: {
    pendingCount() {
      return this.queue.filter(q => q.status === 'pending').length;
    },
    uploadingCount() {
      return this.queue.filter(q => q.status === 'uploading').length;
    },
    completedCount() {
      return this.queue.filter(q => q.status === 'success' || q.status === 'failed').length;
    }
  },
  methods: {
    addToQueue(event) {
      const newItems = Array.from(event.target.files).map((file, idx) => ({
        id: this.nextId++,
        name: file.name,
        priority: ['high', 'medium', 'low'][idx % 3],
        progress: 0,
        status: 'pending'
      }));
      this.queue = [...this.queue, ...newItems];
    },
    async processQueue() {
      this.isProcessing = true;
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const sorted = [...this.queue].sort((a, b) => 
        priorityOrder[a.priority] - priorityOrder[b.priority]
      );
      
      for (let item of sorted) {
        const queueItem = this.queue.find(q => q.id === item.id);
        if (queueItem && queueItem.status === 'pending') {
          queueItem.status = 'uploading';
          await this.simulateUpload(queueItem);
          queueItem.status = 'success';
          queueItem.progress = 100;
        }
      }
      
      this.isProcessing = false;
    },
    simulateUpload(item) {
      return new Promise(resolve => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 20;
          item.progress = progress;
          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 150);
      });
    },
    clearQueue() {
      this.queue = [];
    }
  }
}
</script>

<style scoped>
h4 { margin: 0 0 12px 0; }
h5 { margin: 0 0 8px 0; font-size: 13px; }

.queue-controls {
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

button {
  padding: 6px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
}

button:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-process { background: #0078d4; color: white; }
.btn-clear { background: #dc3545; color: white; }

.queue-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 10px;
  background: #f0f7ff;
  border-radius: 3px;
  margin-bottom: 12px;
}

.queue-stats p {
  margin: 0;
  font-size: 12px;
  text-align: center;
}

.queue-list {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 3px;
}

.queue-row {
  display: grid;
  grid-template-columns: 30px 1fr 80px 80px 150px;
  gap: 8px;
  align-items: center;
  padding: 6px;
  background: white;
  border-radius: 3px;
  margin-bottom: 4px;
  font-size: 12px;
}

.queue-row.uploading {
  background: #fff3cd;
}

.queue-row.success {
  background: #d4edda;
}

.queue-row.failed {
  background: #f8d7da;
}

.queue-pos {
  font-weight: bold;
  color: #0078d4;
}

.queue-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.queue-priority {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  text-align: center;
  font-weight: bold;
}

.priority-high { background: #dc3545; color: white; }
.priority-medium { background: #ffc107; color: #333; }
.priority-low { background: #6c757d; color: white; }

.queue-status {
  font-size: 11px;
  color: #666;
}

.progress-bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #0078d4;
  transition: width 0.2s;
}
</style>
```

---

## Examples

### Complete Sequential Upload Demo

```vue
<template>
  <div class="sequential-complete">
    <h3>Sequential Upload</h3>

    <div class="uploader">
      <div class="header">
        <h4>Batch File Upload</h4>
        <p>Files will be uploaded one at a time to ensure reliability</p>
      </div>

      <div class="upload-section">
        <input
          type="file"
          @change="onFilesSelected"
          multiple
          class="file-input">
        <button @click="uploadAll" :disabled="isUploading || files.length === 0" class="btn-primary">
          {{ isUploading ? `Uploading ${currentIndex}/${files.length}...` : 'Upload All' }}
        </button>
      </div>

      <div v-if="files.length > 0" class="files-list">
        <div
          v-for="(file, index) in files"
          :key="index"
          :class="['file-row', { 'current': index === currentIndex && isUploading }]">
          <span class="file-pos">{{ index + 1 }}</span>
          <div class="file-info">
            <div class="file-name">{{ file.name }}</div>
            <div class="file-size">{{ formatSize(file.size) }}</div>
          </div>
          <span class="file-status" :class="file.status">
            {{ getStatus(file.status) }}
          </span>
          <div class="file-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: file.progress + '%' }"></div>
            </div>
            <span>{{ file.progress }}%</span>
          </div>
        </div>
      </div>

      <div v-if="completedCount > 0" class="summary">
        <p>Upload complete: {{ completedCount }}/{{ files.length }} files</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SequentialComplete',
  data() {
    return {
      files: [],
      isUploading: false,
      currentIndex: -1
    }
  },
  computed: {
    completedCount() {
      return this.files.filter(f => f.status === 'success').length;
    }
  },
  methods: {
    onFilesSelected(e) {
      this.files = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: f.size,
        progress: 0,
        status: 'pending'
      }));
    },
    async uploadAll() {
      this.isUploading = true;
      
      for (let i = 0; i < this.files.length; i++) {
        this.currentIndex = i;
        this.files[i].status = 'uploading';
        await this.simulateUpload(this.files[i]);
        this.files[i].status = 'success';
        this.files[i].progress = 100;
      }
      
      this.currentIndex = -1;
      this.isUploading = false;
    },
    simulateUpload(file) {
      return new Promise(resolve => {
        let p = 0;
        const interval = setInterval(() => {
          p += 10;
          file.progress = p;
          if (p >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 150);
      });
    },
    getStatus(status) {
      const map = {
        pending: '⏳ Queued',
        uploading: '⬆️ Uploading',
        success: '✓ Done'
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
.sequential-complete {
  padding: 20px;
  max-width: 800px;
}

h3 { margin-bottom: 20px; }
h4 { margin: 0 0 4px 0; color: #0078d4; }
p { margin: 0 0 12px 0; font-size: 12px; color: #666; }

.uploader {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 20px;
}

.header {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.upload-section {
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

.btn-primary {
  padding: 8px 20px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.files-list {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 3px;
  margin-bottom: 12px;
}

.file-row {
  display: grid;
  grid-template-columns: 30px 1fr 100px 150px;
  gap: 10px;
  align-items: center;
  padding: 8px;
  background: white;
  border-radius: 3px;
  margin-bottom: 6px;
}

.file-row.current {
  background: #fff3cd;
  border-left: 3px solid #ffc107;
}

.file-pos {
  font-weight: bold;
  color: #0078d4;
}

.file-name {
  font-size: 13px;
  font-weight: bold;
}

.file-size {
  font-size: 11px;
  color: #666;
}

.file-status {
  font-size: 11px;
  text-align: center;
  font-weight: bold;
}

.file-status.pending { color: #6c757d; }
.file-status.uploading { color: #ffc107; }
.file-status.success { color: #28a745; }

.file-progress {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #0078d4;
  transition: width 0.2s;
}

.summary {
  padding: 10px;
  background: #d4edda;
  border-radius: 3px;
  text-align: center;
  font-weight: bold;
  color: #155724;
}
</style>
```

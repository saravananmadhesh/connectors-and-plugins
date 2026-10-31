# File Source — Syncfusion Vue Uploader

## Table of Contents
- [Clipboard Paste](#clipboard-paste)
- [Directory Upload](#directory-upload)
- [Drag and Drop](#drag-and-drop)
- [Examples](#examples)

---

## Clipboard Paste

Upload files via clipboard paste:

```vue
<template>
  <div class="clipboard-upload">
    <h4>Clipboard Paste Upload</h4>
    <p>Copy an image to clipboard, then click the area and press Ctrl+V</p>

    <div
      class="paste-area"
      tabindex="0"
      @paste="handlePaste"
      @click="focusArea">
      <p v-if="!pastedImage">📋 Click here and paste an image (Ctrl+V)</p>
      <img v-else :src="pastedImage" alt="Pasted" class="preview-img">
    </div>

    <div v-if="pastedImage" class="actions">
      <button @click="uploadImage" class="btn-upload">Upload Pasted Image</button>
      <button @click="clearPasted" class="btn-clear">Clear</button>
    </div>

    <div v-if="uploadStatus" class="status">
      {{ uploadStatus }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClipboardUpload',
  data() {
    return {
      pastedImage: null,
      uploaded: false,
      uploadStatus: ''
    }
  },
  methods: {
    focusArea() {
      document.querySelector('.paste-area').focus();
    },
    handlePaste(event) {
      const items = event.clipboardData.items;
      for (let item of items) {
        if (item.type.indexOf('image') === 0) {
          const file = item.getAsFile();
          const reader = new FileReader();
          reader.onload = (e) => {
            this.pastedImage = e.target.result;
            this.uploadStatus = 'Image pasted from clipboard!';
          };
          reader.readAsDataURL(file);
          event.preventDefault();
          return;
        }
      }
      this.uploadStatus = 'No image found in clipboard';
    },
    uploadImage() {
      this.uploadStatus = 'Uploading...';
      setTimeout(() => {
        this.uploaded = true;
        this.uploadStatus = '✓ Image uploaded successfully!';
      }, 1500);
    },
    clearPasted() {
      this.pastedImage = null;
      this.uploadStatus = '';
      this.uploaded = false;
    }
  }
}
</script>

<style scoped>
h4 { margin: 0 0 8px 0; }
p { margin: 0 0 12px 0; font-size: 12px; color: #666; }

.paste-area {
  width: 100%;
  min-height: 200px;
  padding: 20px;
  background: #f9f9f9;
  border: 2px dashed #0078d4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  margin-bottom: 12px;
  outline: none;
}

.paste-area:focus {
  border-color: #106ebe;
  background: #f0f7ff;
}

.paste-area p {
  margin: 0;
  color: #0078d4;
  font-weight: bold;
}

.preview-img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 3px;
}

.actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.btn-upload { background: #0078d4; color: white; }
.btn-clear { background: #dc3545; color: white; }

.status {
  padding: 8px 12px;
  background: #d4edda;
  color: #155724;
  border-radius: 3px;
  font-size: 13px;
}
</style>
```

---

## Directory Upload

Upload entire directories:

```vue
<template>
  <div class="directory-upload">
    <h4>Directory Upload</h4>
    <p>Select an entire folder to upload all files</p>

    <div class="upload-controls">
      <label class="file-label">
        <input
          type="file"
          webkitdirectory
          directory
          multiple
          @change="handleDirectory"
          class="file-input-hidden">
        <span class="file-btn">📁 Choose Directory</span>
      </label>
    </div>

    <div v-if="directoryFiles.length > 0" class="files-summary">
      <h5>Directory Contents:</h5>
      <p><strong>Files:</strong> {{ directoryFiles.length }}</p>
      <p><strong>Total Size:</strong> {{ formatSize(totalSize) }}</p>
      
      <div class="file-tree">
        <div v-for="file in directoryFiles.slice(0, 10)" :key="file.name" class="tree-item">
          <span class="file-icon">📄</span>
          <span class="file-path">{{ file.webkitRelativePath || file.name }}</span>
          <span class="file-size">{{ formatSize(file.size) }}</span>
        </div>
        <p v-if="directoryFiles.length > 10" class="more-files">
          + {{ directoryFiles.length - 10 }} more files...
        </p>
      </div>

      <button @click="uploadDirectory" class="btn-upload">
        Upload All {{ directoryFiles.length }} Files
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DirectoryUpload',
  data() {
    return {
      directoryFiles: []
    }
  },
  computed: {
    totalSize() {
      return this.directoryFiles.reduce((sum, f) => sum + f.size, 0);
    }
  },
  methods: {
    handleDirectory(event) {
      this.directoryFiles = Array.from(event.target.files);
    },
    uploadDirectory() {
      alert(`Uploading ${this.directoryFiles.length} files...`);
    },
    formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
      return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
    }
  }
}
</script>

<style scoped>
h4 { margin: 0 0 8px 0; }
h5 { margin: 0 0 8px 0; font-size: 13px; }
p { margin: 0 0 12px 0; font-size: 12px; color: #666; }

.upload-controls {
  margin-bottom: 15px;
}

.file-label { cursor: pointer; }

.file-input-hidden { display: none; }

.file-btn {
  display: inline-block;
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border-radius: 3px;
  font-weight: bold;
}

.file-label:hover .file-btn {
  background: #106ebe;
}

.files-summary {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.files-summary p {
  margin: 0 0 4px 0;
  font-size: 13px;
}

.file-tree {
  max-height: 250px;
  overflow-y: auto;
  background: white;
  border-radius: 3px;
  padding: 8px;
  margin: 8px 0;
}

.tree-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 0;
  font-size: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.tree-item:last-child {
  border-bottom: none;
}

.file-icon { font-size: 14px; }

.file-path {
  flex: 1;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  color: #999;
  font-size: 11px;
}

.more-files {
  margin: 8px 0 0 0;
  padding: 6px;
  text-align: center;
  color: #666;
  font-style: italic;
  font-size: 11px;
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

## Drag and Drop

Custom drag and drop area:

```vue
<template>
  <div class="drag-drop">
    <h4>Drag and Drop Upload</h4>

    <div
      class="drop-area"
      :class="{ 'drag-over': isDragging }"
      @dragenter.prevent="onDragEnter"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop">
      <div v-if="droppedFiles.length === 0">
        <p class="drop-icon">📁</p>
        <p class="drop-text">Drag files here or click to select</p>
        <input
          type="file"
          @change="onFileSelect"
          multiple
          class="file-input-hidden"
          ref="fileInput">
        <button @click="$refs.fileInput.click()" class="btn-browse">
          Browse Files
        </button>
      </div>
      <div v-else>
        <p class="success-icon">✓</p>
        <p class="success-text">{{ droppedFiles.length }} file(s) ready to upload</p>
      </div>
    </div>

    <div v-if="droppedFiles.length > 0" class="files-preview">
      <h5>Selected Files:</h5>
      <div v-for="(file, index) in droppedFiles" :key="index" class="file-preview">
        <span class="preview-name">{{ file.name }}</span>
        <span class="preview-size">{{ formatSize(file.size) }}</span>
        <button @click="removeFile(index)" class="btn-remove">×</button>
      </div>

      <button @click="uploadFiles" class="btn-upload">Upload All</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DragDropUpload',
  data() {
    return {
      isDragging: false,
      droppedFiles: []
    }
  },
  methods: {
    onDragEnter(e) {
      this.isDragging = true;
    },
    onDragOver(e) {
      this.isDragging = true;
    },
    onDragLeave(e) {
      this.isDragging = false;
    },
    onDrop(e) {
      this.isDragging = false;
      const files = Array.from(e.dataTransfer.files);
      this.droppedFiles = [...this.droppedFiles, ...files];
    },
    onFileSelect(e) {
      const files = Array.from(e.target.files);
      this.droppedFiles = [...this.droppedFiles, ...files];
    },
    removeFile(index) {
      this.droppedFiles.splice(index, 1);
    },
    uploadFiles() {
      alert(`Uploading ${this.droppedFiles.length} files...`);
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
h5 { margin: 0 0 8px 0; font-size: 13px; }

.drop-area {
  padding: 40px 20px;
  background: #f9f9f9;
  border: 2px dashed #ccc;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
  transition: all 0.2s;
}

.drop-area.drag-over {
  background: #e3f2fd;
  border-color: #0078d4;
  border-style: solid;
}

.drop-icon {
  font-size: 48px;
  margin: 0 0 12px 0;
}

.drop-text {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
}

.success-icon {
  font-size: 48px;
  color: #28a745;
  margin: 0 0 8px 0;
}

.success-text {
  margin: 0;
  color: #28a745;
  font-weight: bold;
  font-size: 14px;
}

.file-input-hidden { display: none; }

.btn-browse {
  padding: 8px 20px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.files-preview {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: white;
  border-radius: 3px;
  margin-bottom: 4px;
  font-size: 12px;
}

.preview-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preview-size {
  color: #666;
  font-size: 11px;
}

.btn-remove {
  width: 20px;
  height: 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
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
</style>
```

---

## Examples

### Complete File Source Demo

```vue
<template>
  <div class="file-source-complete">
    <h3>File Source Methods</h3>

    <div class="source-grid">
      <div class="source-card">
        <h4>📋 Clipboard</h4>
        <div
          class="mini-drop"
          tabindex="0"
          @paste="onPaste"
          @click="$event.target.focus()">
          {{ clipMessage }}
        </div>
      </div>

      <div class="source-card">
        <h4>📁 Directory</h4>
        <label class="file-label">
          <input
            type="file"
            webkitdirectory
            @change="onDirSelect"
            class="hidden-input">
          <span class="mini-btn">Choose Folder</span>
        </label>
        <p v-if="dirCount" class="info">{{ dirCount }} files</p>
      </div>

      <div class="source-card">
        <h4>🖱️ Drag & Drop</h4>
        <div
          class="mini-drop"
          :class="{ active: isDragging }"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="onFileDrop">
          {{ dropMessage }}
        </div>
      </div>

      <div class="source-card">
        <h4>📄 File Picker</h4>
        <label class="file-label">
          <input
            type="file"
            @change="onFilePick"
            multiple
            class="hidden-input">
          <span class="mini-btn">Choose Files</span>
        </label>
        <p v-if="fileCount" class="info">{{ fileCount }} files</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileSourceComplete',
  data() {
    return {
      clipMessage: 'Click & paste (Ctrl+V)',
      dropMessage: 'Drop files here',
      isDragging: false,
      dirCount: 0,
      fileCount: 0
    }
  },
  methods: {
    onPaste(e) {
      const items = e.clipboardData.items;
      for (let item of items) {
        if (item.type.indexOf('image') === 0) {
          this.clipMessage = '✓ Image pasted!';
          return;
        }
      }
      this.clipMessage = 'No image in clipboard';
    },
    onDirSelect(e) {
      this.dirCount = e.target.files.length;
    },
    onFileDrop(e) {
      this.isDragging = false;
      this.dropMessage = `✓ ${e.dataTransfer.files.length} files dropped`;
    },
    onFilePick(e) {
      this.fileCount = e.target.files.length;
    }
  }
}
</script>

<style scoped>
.file-source-complete {
  padding: 20px;
  max-width: 900px;
}

h3 { margin-bottom: 20px; }
h4 { margin: 0 0 10px 0; font-size: 14px; }

.source-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.source-card {
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.mini-drop {
  padding: 20px;
  background: white;
  border: 2px dashed #ccc;
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  outline: none;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-drop:focus,
.mini-drop.active {
  border-color: #0078d4;
  background: #f0f7ff;
  color: #0078d4;
}

.file-label {
  cursor: pointer;
  display: block;
}

.hidden-input { display: none; }

.mini-btn {
  display: block;
  padding: 8px 12px;
  background: #0078d4;
  color: white;
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
}

.info {
  margin: 8px 0 0 0;
  font-size: 11px;
  color: #28a745;
  font-weight: bold;
}
</style>
```

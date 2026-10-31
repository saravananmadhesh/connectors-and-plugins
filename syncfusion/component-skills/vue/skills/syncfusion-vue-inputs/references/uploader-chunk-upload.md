# Uploader Chunk Upload - Vue 3

## Overview

Chunk upload divides large files into smaller segments and uploads them sequentially or in parallel. This approach is beneficial for:
- Uploading large files that may timeout as a single request
- Resuming interrupted uploads from the last successful chunk
- Reducing memory usage on both client and server
- Better progress tracking with granular feedback

---

## Basic Chunk Upload Configuration

```vue
<template>
  <div class="uploader-demo">
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      :autoUpload="false"
      :showFileList="true"
      @chunking="onChunking"
      @chunkUploading="onChunkUploading"
      @chunkSuccess="onChunkSuccess"
      @chunkFailure="onChunkFailure"
      @success="onSuccess"
      @failure="onFailure"
    />

    <div class="actions">
      <button @click="uploadChunked">Upload Files</button>
      <button @click="pauseUpload">Pause</button>
      <button @click="resumeUpload">Resume</button>
      <button @click="cancelUpload">Cancel</button>
    </div>

    <div class="progress-info">
      <div v-if="uploadProgress">
        <p>File: {{ uploadProgress.fileName }}</p>
        <p>Progress: {{ uploadProgress.percent }}%</p>
        <p>Chunk: {{ uploadProgress.currentChunk }} / {{ uploadProgress.totalChunks }}</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: uploadProgress.percent + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);
const uploadProgress = ref(null);

// Chunk size: 512KB (configurable based on server and network)
const asyncSettings = reactive({
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove',
  chunkSize: 524288  // 512KB in bytes
});

const onChunking = (args) => {
  // Called when file is about to be split into chunks
  console.log('File chunking started:', args.fileData.name);
  console.log('Total chunks:', Math.ceil(args.fileData.size / asyncSettings.chunkSize));
};

const onChunkUploading = (args) => {
  // Called for each chunk upload
  uploadProgress.value = {
    fileName: args.fileData.name,
    currentChunk: args.currentChunkIndex + 1,
    totalChunks: args.totalChunks,
    percent: Math.round(((args.currentChunkIndex + 1) / args.totalChunks) * 100)
  };
  
  console.log(
    `Uploading ${args.fileData.name}: ` +
    `Chunk ${args.currentChunkIndex + 1}/${args.totalChunks}`
  );
};

const onChunkSuccess = (args) => {
  // Called when each chunk uploads successfully
  console.log(`Chunk ${args.chunkIndex + 1} uploaded successfully`);
};

const onChunkFailure = (args) => {
  // Called when chunk upload fails
  console.error(`Chunk ${args.chunkIndex + 1} failed:`, args.error);
  
  // Optionally implement retry logic
  if (!args.cancel) {
    console.log(`Retrying chunk ${args.chunkIndex + 1}...`);
  }
};

const onSuccess = (args) => {
  // Called when all chunks of a file are uploaded
  console.log(`File uploaded successfully: ${args.file.name}`);
  uploadProgress.value = null;
};

const onFailure = (args) => {
  // Called when file upload fails
  console.error(`File upload failed: ${args.file.name}`);
  uploadProgress.value = null;
};

const uploadChunked = () => {
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
</script>

<style scoped>
.uploader-demo {
  padding: 20px;
}

.actions {
  margin: 20px 0;
}

button {
  padding: 8px 16px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.progress-info {
  margin-top: 20px;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;
}

.progress-fill {
  height: 100%;
  background-color: #28a745;
  transition: width 0.3s ease;
}
</style>
```

---

## Advanced Chunk Configuration

```typescript
// Fine-tuned chunk settings for different scenarios
const chunkSettings = {
  // For large files over 100MB
  largeFile: {
    chunkSize: 1048576,  // 1MB
    retryCount: 5,
    retryAfterDelay: 2000,
    resumable: true
  },

  // For mobile networks (slower connections)
  mobileNetwork: {
    chunkSize: 262144,   // 256KB
    retryCount: 10,
    retryAfterDelay: 3000,
    resumable: true
  },

  // For fast networks
  fastNetwork: {
    chunkSize: 2097152,  // 2MB
    retryCount: 2,
    retryAfterDelay: 500,
    resumable: false
  },

  // For video uploads
  videoUpload: {
    chunkSize: 5242880,  // 5MB
    retryCount: 3,
    retryAfterDelay: 1500,
    resumable: true
  }
};
```

---

## Resumable Upload Implementation

```vue
<template>
  <div class="resumable-upload">
    <!-- Upload Input -->
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      :autoUpload="false"
      @chunkFailure="onChunkFailure"
      @chunkSuccess="onChunkSuccess"
    />

    <!-- Controls -->
    <div class="controls">
      <button @click="startUpload">Start Upload</button>
      <button @click="pauseUpload" :disabled="!isUploading">Pause</button>
      <button @click="resumeUpload" :disabled="!isPaused">Resume</button>
      <button @click="cancelUpload" :disabled="!isUploading && !isPaused">
        Cancel
      </button>
    </div>

    <!-- Upload Status -->
    <div class="status">
      <p>Status: {{ currentStatus }}</p>
      <p v-if="pausedAt">
        Paused at: Chunk {{ pausedAt + 1 }}
      </p>
      <p v-if="errorInfo">
        Error: {{ errorInfo }}
      </p>
    </div>

    <!-- Resume Info -->
    <div v-if="hasResumeData" class="resume-info">
      <p>Incomplete uploads found!</p>
      <p>File: {{ resumeData.fileName }}</p>
      <p>Last uploaded chunk: {{ resumeData.lastChunk }}</p>
      <button @click="resumeFromCheckpoint">
        Resume from Chunk {{ resumeData.lastChunk + 1 }}
      </button>
      <button @click="clearResumeData">Clear and Start Over</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);
const isUploading = ref(false);
const isPaused = ref(false);
const pausedAt = ref(null);
const errorInfo = ref(null);

const resumeData = ref({
  fileName: '',
  lastChunk: 0,
  totalChunks: 0,
  uploadId: ''
});

const hasResumeData = ref(false);

const asyncSettings = reactive({
  saveUrl: '/api/upload/save-chunk',
  removeUrl: '/api/upload/remove',
  chunkSize: 524288  // 512KB
});

const currentStatus = computed(() => {
  if (isUploading.value) return 'Uploading...';
  if (isPaused.value) return 'Paused';
  return 'Ready';
});

// Check for incomplete uploads on component mount
onMounted(() => {
  checkResumeData();
});

const checkResumeData = async () => {
  try {
    const response = await fetch('/api/upload/check-resume');
    const data = await response.json();
    
    if (data.hasIncompleteUpload) {
      resumeData.value = data.uploadInfo;
      hasResumeData.value = true;
    }
  } catch (error) {
    console.error('Error checking resume data:', error);
  }
};

const onChunkSuccess = (args) => {
  console.log(`Chunk ${args.chunkIndex} uploaded successfully`);
  
  // Save resume checkpoint
  saveResumeCheckpoint(args.chunkIndex);
};

const onChunkFailure = (args) => {
  errorInfo.value = `Chunk ${args.chunkIndex} failed: ${args.error}`;
  console.error(errorInfo.value);
};

const saveResumeCheckpoint = async (chunkIndex) => {
  try {
    await fetch('/api/upload/save-checkpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uploadId: resumeData.value.uploadId,
        lastChunk: chunkIndex
      })
    });
  } catch (error) {
    console.error('Error saving checkpoint:', error);
  }
};

const startUpload = () => {
  isUploading.value = true;
  isPaused.value = false;
  errorInfo.value = null;
  uploaderRef.value?.upload();
};

const pauseUpload = () => {
  isPaused.value = true;
  isUploading.value = false;
  uploaderRef.value?.pause();
};

const resumeUpload = () => {
  isUploading.value = true;
  isPaused.value = false;
  uploaderRef.value?.resume();
};

const resumeFromCheckpoint = () => {
  // Resume upload from last successful chunk
  startUpload();
};

const cancelUpload = () => {
  isUploading.value = false;
  isPaused.value = false;
  uploaderRef.value?.cancel();
};

const clearResumeData = () => {
  hasResumeData.value = false;
  resumeData.value = {
    fileName: '',
    lastChunk: 0,
    totalChunks: 0,
    uploadId: ''
  };
};
</script>

<style scoped>
.resumable-upload {
  padding: 20px;
  max-width: 500px;
}

.controls {
  margin: 20px 0;
}

button {
  padding: 8px 16px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status,
.resume-info {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.resume-info {
  background-color: #fff3cd;
  border-color: #ffc107;
}
</style>
```

---

## Server-Side Chunk Handler Example

```python
# Flask example for handling chunked uploads

from flask import Flask, request, jsonify
import os
import hashlib

app = Flask(__name__)
UPLOAD_DIR = 'uploads'
CHUNK_DIR = 'chunks'

@app.route('/api/upload/save-chunk', methods=['POST'])
def save_chunk():
    """Handle individual chunk uploads"""
    file = request.files.get('UploadFiles')
    chunk_index = request.form.get('chunkIndex')
    chunk_count = request.form.get('chunkCount')
    upload_id = request.form.get('uploadId', 'temp')
    
    try:
        # Create chunk directory
        chunk_path = os.path.join(CHUNK_DIR, upload_id)
        os.makedirs(chunk_path, exist_ok=True)
        
        # Save chunk
        chunk_file = os.path.join(chunk_path, f'chunk_{chunk_index}')
        file.save(chunk_file)
        
        # If all chunks received, combine them
        if int(chunk_index) == int(chunk_count) - 1:
            final_file = os.path.join(UPLOAD_DIR, file.filename)
            combine_chunks(chunk_path, final_file, int(chunk_count))
            
            # Clean up chunks
            import shutil
            shutil.rmtree(chunk_path)
            
            return jsonify({
                'status': 'success',
                'message': 'File uploaded successfully'
            })
        
        return jsonify({
            'status': 'success',
            'message': f'Chunk {chunk_index} saved'
        })
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

def combine_chunks(chunk_path, final_file, chunk_count):
    """Combine all chunks into final file"""
    with open(final_file, 'wb') as final:
        for i in range(chunk_count):
            chunk_file = os.path.join(chunk_path, f'chunk_{i}')
            with open(chunk_file, 'rb') as chunk:
                final.write(chunk.read())

@app.route('/api/upload/check-resume', methods=['GET'])
def check_resume():
    """Check for incomplete uploads"""
    # Query database or file system for incomplete uploads
    incomplete = find_incomplete_uploads()
    
    if incomplete:
        return jsonify({
            'hasIncompleteUpload': True,
            'uploadInfo': {
                'uploadId': incomplete['id'],
                'fileName': incomplete['fileName'],
                'lastChunk': incomplete['lastChunk'],
                'totalChunks': incomplete['totalChunks']
            }
        })
    
    return jsonify({'hasIncompleteUpload': False})

@app.route('/api/upload/save-checkpoint', methods=['POST'])
def save_checkpoint():
    """Save upload progress checkpoint"""
    data = request.json
    upload_id = data.get('uploadId')
    last_chunk = data.get('lastChunk')
    
    try:
        # Save checkpoint to database
        update_checkpoint(upload_id, last_chunk)
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
```

---

## Chunk Upload Best Practices

1. **Choose appropriate chunk size**
   - Small chunks (256KB): Better for mobile/unstable networks
   - Large chunks (2-5MB): Better for fast, stable connections
   - Adjust based on network conditions

2. **Implement retry logic**
   - Retry failed chunks automatically
   - Implement exponential backoff for retries
   - Limit retry attempts to prevent infinite loops

3. **Resume capability**
   - Save upload progress to database
   - Implement checkpoint system
   - Allow users to resume interrupted uploads

4. **Monitor progress**
   - Track chunk-level progress for accurate feedback
   - Provide meaningful status messages
   - Show pause/resume options

5. **Security considerations**
   - Validate file types and sizes
   - Implement upload authentication
   - Generate unique upload IDs for tracking
   - Validate chunk integrity with checksums


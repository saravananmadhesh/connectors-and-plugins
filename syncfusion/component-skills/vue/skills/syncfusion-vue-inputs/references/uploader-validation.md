# Uploader Validation - Vue 3

## Overview

File validation ensures only appropriate files are uploaded. Syncfusion Uploader provides multiple validation strategies:
- File type validation (extension-based)
- File size validation (min/max)
- File count validation
- Custom validation logic
- Server-side validation

---

## Basic Validation Configuration

```vue
<template>
  <div class="uploader-validation">
    <!-- Uploader with validation -->
    <UploaderComponent
      ref="uploaderRef"
      :asyncSettings="asyncSettings"
      :autoUpload="false"
      :allowedExtensions="'.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'"
      :maxFileSize="10485760"
      :maxFilesCount="5"
      @selected="onSelected"
      @beforeUpload="onBeforeUpload"
      @failure="onFailure"
    />

    <!-- Upload Button -->
    <button @click="uploadFiles" :disabled="selectedFiles.length === 0">
      Upload ({{ selectedFiles.length }} files)
    </button>

    <!-- Validation Messages -->
    <div v-if="validationErrors.length > 0" class="error-messages">
      <h4>Validation Errors:</h4>
      <ul>
        <li v-for="(error, index) in validationErrors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>

    <!-- File List -->
    <div class="file-list">
      <h4>Selected Files:</h4>
      <div v-for="file in selectedFiles" :key="file.name" class="file-item">
        <span>{{ file.name }}</span>
        <span class="file-size">{{ formatBytes(file.size) }}</span>
        <span v-if="file.valid" class="badge badge-success">Valid</span>
        <span v-else class="badge badge-danger">Invalid</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const uploaderRef = ref(null);
const selectedFiles = ref([]);
const validationErrors = ref([]);

const asyncSettings = reactive({
  saveUrl: '/api/upload/save',
  removeUrl: '/api/upload/remove'
});

// Validation rules
const validationRules = {
  maxFileSize: 10485760,      // 10MB
  minFileSize: 1024,          // 1KB
  maxFilesCount: 5,
  allowedExtensions: [
    '.pdf', '.doc', '.docx',
    '.xls', '.xlsx',
    '.ppt', '.pptx',
    '.txt', '.csv'
  ],
  maxTotalSize: 52428800      // 50MB total
};

const onSelected = (args) => {
  selectedFiles.value = [];
  validationErrors.value = [];

  args.filesData.forEach((file) => {
    const validationResult = validateFile(file);
    
    selectedFiles.value.push({
      name: file.name,
      size: file.size,
      valid: validationResult.isValid
    });

    if (!validationResult.isValid) {
      validationErrors.value.push(...validationResult.errors);
    }
  });

  // Check total file count
  if (selectedFiles.value.length > validationRules.maxFilesCount) {
    validationErrors.value.push(
      `Maximum ${validationRules.maxFilesCount} files allowed`
    );
  }

  // Check total size
  const totalSize = selectedFiles.value.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > validationRules.maxTotalSize) {
    validationErrors.value.push(
      `Total file size exceeds ${formatBytes(validationRules.maxTotalSize)}`
    );
  }
};

const validateFile = (file) => {
  const errors = [];
  let isValid = true;

  // Check file extension
  const fileExt = '.' + file.name.split('.').pop().toLowerCase();
  if (!validationRules.allowedExtensions.includes(fileExt)) {
    errors.push(`${file.name}: File type not allowed`);
    isValid = false;
  }

  // Check file size
  if (file.size > validationRules.maxFileSize) {
    errors.push(
      `${file.name}: File size exceeds ${formatBytes(validationRules.maxFileSize)}`
    );
    isValid = false;
  }

  if (file.size < validationRules.minFileSize) {
    errors.push(
      `${file.name}: File size is less than ${formatBytes(validationRules.minFileSize)}`
    );
    isValid = false;
  }

  // Custom validation: check for malicious content (basic check)
  if (isExecutableFile(file.name)) {
    errors.push(`${file.name}: Executable files are not allowed`);
    isValid = false;
  }

  return { isValid, errors };
};

const isExecutableFile = (fileName) => {
  const executableExtensions = ['.exe', '.bat', '.cmd', '.com', '.pif'];
  const fileExt = '.' + fileName.split('.').pop().toLowerCase();
  return executableExtensions.includes(fileExt);
};

const onBeforeUpload = (args) => {
  // Final validation before sending to server
  const file = args.fileData;
  
  // Validate again before upload
  const validation = validateFile(file);
  if (!validation.isValid) {
    args.cancel = true;
    alert(`Cannot upload: ${validation.errors.join(', ')}`);
  }

  // Add metadata
  args.customFormData = [
    { key: 'uploadedBy', value: 'User123' },
    { key: 'uploadDate', value: new Date().toISOString() }
  ];
};

const onFailure = (args) => {
  validationErrors.value.push(`Upload failed: ${args.statusText}`);
};

const uploadFiles = () => {
  // Check if there are any validation errors
  if (validationErrors.value.length > 0) {
    alert('Please fix validation errors before uploading');
    return;
  }

  uploaderRef.value?.upload();
};

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
</script>

<style scoped>
.uploader-validation {
  padding: 20px;
  max-width: 600px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 15px 0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

.error-messages {
  margin: 15px 0;
  padding: 15px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  color: #721c24;
}

.error-messages h4 {
  margin: 0 0 10px 0;
}

.error-messages ul {
  margin: 0;
  padding-left: 20px;
}

.error-messages li {
  margin: 5px 0;
}

.file-list {
  margin-top: 20px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.file-size {
  font-size: 0.85rem;
  color: #666;
  margin: 0 10px;
}

.badge {
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-success {
  background-color: #d4edda;
  color: #155724;
}

.badge-danger {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
```

---

## Advanced Validation Scenarios

### MIME Type Validation

```typescript
// Validate by MIME type instead of extension
const mimeTypeRules = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  documents: ['application/pdf', 'application/msword', 'text/plain'],
  spreadsheets: ['application/vnd.ms-excel', 'text/csv'],
  videos: ['video/mp4', 'video/webm', 'video/ogg']
};

const validateMimeType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};
```

### Image-Specific Validation

```typescript
// Validate image dimensions
const validateImageDimensions = (file, minWidth, minHeight, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const isValid = 
          img.width >= minWidth && img.width <= maxWidth &&
          img.height >= minHeight && img.height <= maxHeight;
        
        resolve({
          isValid,
          width: img.width,
          height: img.height
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

// Usage in Vue component
const onSelected = async (args) => {
  for (const file of args.filesData) {
    if (file.type.startsWith('image/')) {
      const result = await validateImageDimensions(
        file,
        100, 100,    // min width, height
        2000, 2000   // max width, height
      );
      
      if (!result.isValid) {
        console.error(
          `Image dimensions ${result.width}x${result.height} ` +
          `are outside allowed range`
        );
      }
    }
  }
};
```

### Duplicate File Detection

```typescript
// Detect duplicate files using file hash
const calculateFileHash = async (file) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Track uploaded files
const uploadedFileHashes = ref(new Set());

const onSelected = async (args) => {
  const duplicates = [];

  for (const file of args.filesData) {
    const hash = await calculateFileHash(file);
    
    if (uploadedFileHashes.value.has(hash)) {
      duplicates.push(file.name);
    } else {
      uploadedFileHashes.value.add(hash);
    }
  }

  if (duplicates.length > 0) {
    alert(`Duplicate files detected: ${duplicates.join(', ')}`);
  }
};
```

### Server-Side Validation

```python
# Flask example for server-side validation

@app.route('/api/upload/save', methods=['POST'])
def save_upload():
    file = request.files['UploadFiles']
    
    try:
        # 1. Validate file extension
        allowed_extensions = {'.pdf', '.doc', '.docx', '.txt', '.csv'}
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext not in allowed_extensions:
            return jsonify({
                'error': f'File type {file_ext} not allowed'
            }), 400
        
        # 2. Validate file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        max_file_size = 10 * 1024 * 1024  # 10MB
        if file_size > max_file_size:
            return jsonify({
                'error': f'File size exceeds {max_file_size} bytes'
            }), 400
        
        # 3. Validate MIME type
        mime_type = mimetypes.guess_type(file.filename)[0]
        allowed_mimes = {
            'application/pdf',
            'application/msword',
            'text/plain',
            'text/csv'
        }
        
        if mime_type not in allowed_mimes:
            return jsonify({
                'error': f'MIME type {mime_type} not allowed'
            }), 400
        
        # 4. Scan for malware (using ClamAV or similar)
        if not scan_file_for_malware(file):
            return jsonify({
                'error': 'File failed security scan'
            }), 400
        
        # 5. Store file
        filename = secure_filename(file.filename)
        filepath = os.path.join('uploads', filename)
        file.save(filepath)
        
        return jsonify({
            'status': 'success',
            'message': 'File uploaded successfully'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def scan_file_for_malware(file):
    """Scan file using ClamAV"""
    # Implement virus scanning here
    # For now, return True
    return True
```

---

## Validation Best Practices

1. **Client-Side Validation**
   - Validate file type, size, and format immediately
   - Provide instant feedback to users
   - Reduce server load by catching invalid files early

2. **Server-Side Validation**
   - Never rely solely on client-side validation
   - Always re-validate on server
   - Validate file contents, not just extensions
   - Implement malware scanning

3. **Error Messages**
   - Provide clear, specific error messages
   - Suggest corrective actions
   - List all validation failures at once

4. **Performance**
   - Cache validation results when appropriate
   - Use Web Workers for heavy validation tasks
   - Implement batch validation for multiple files

5. **Security**
   - Validate file MIME types
   - Scan for malware
   - Check file signatures (magic numbers)
   - Implement upload rate limiting
   - Use secure file storage


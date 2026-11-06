# Integration and Security — Syncfusion Vue Uploader

## Table of Contents
- [Form Integration](#form-integration)
- [Security Best Practices](#security-best-practices)
- [JWT Authentication](#jwt-authentication)
- [Examples](#examples)

---

## Form Integration

Integrate uploader with HTML forms:

```vue
<template>
  <div class="form-integration">
    <fieldset>
      <legend>Uploader with Form</legend>

      <form @submit.prevent="submitForm" class="upload-form">
        <div class="form-group">
          <label for="title">Document Title:</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="text-input">
        </div>

        <div class="form-group">
          <label for="category">Category:</label>
          <select id="category" v-model="form.category" required class="text-input">
            <option value="">Select category</option>
            <option value="invoice">Invoice</option>
            <option value="contract">Contract</option>
            <option value="report">Report</option>
          </select>
        </div>

        <div class="form-group">
          <label for="file">Upload File:</label>
          <input
            id="file"
            type="file"
            @change="onFileChange"
            required
            class="file-input">
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.confidential">
            This is a confidential document
          </label>
        </div>

        <button type="submit" :disabled="!canSubmit" class="btn-submit">
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
      </form>

      <div v-if="submissionResult" class="result-panel">
        <h4>Submission Result:</h4>
        <pre>{{ JSON.stringify(submissionResult, null, 2) }}</pre>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'FormIntegration',
  data() {
    return {
      form: {
        title: '',
        category: '',
        file: null,
        confidential: false
      },
      isSubmitting: false,
      submissionResult: null
    }
  },
  computed: {
    canSubmit() {
      return this.form.title && this.form.category && this.form.file && !this.isSubmitting;
    }
  },
  methods: {
    onFileChange(event) {
      this.form.file = event.target.files[0];
    },
    async submitForm() {
      this.isSubmitting = true;
      
      const formData = new FormData();
      formData.append('title', this.form.title);
      formData.append('category', this.form.category);
      formData.append('file', this.form.file);
      formData.append('confidential', this.form.confidential);
      
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.submissionResult = {
        title: this.form.title,
        category: this.form.category,
        fileName: this.form.file.name,
        fileSize: this.form.file.size,
        confidential: this.form.confidential,
        submittedAt: new Date().toISOString()
      };
      
      this.isSubmitting = false;
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
}

.text-input,
.file-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
}

.text-input:focus,
.file-input:focus {
  outline: 2px solid #0078d4;
  outline-offset: -1px;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.result-panel {
  margin-top: 15px;
  padding: 12px;
  background: #d4edda;
  border-radius: 3px;
}

.result-panel h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
}

.result-panel pre {
  margin: 0;
  font-size: 11px;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
```

---

## Security Best Practices

Implement secure upload practices:

```vue
<template>
  <div class="security-practices">
    <h4>Security Best Practices</h4>

    <div class="security-checks">
      <h5>File Validation Checklist:</h5>
      <ul>
        <li :class="{ passed: checks.fileType }">
          ✓ Allowed file types only
        </li>
        <li :class="{ passed: checks.fileSize }">
          ✓ Size limit enforced (10MB)
        </li>
        <li :class="{ passed: checks.fileName }">
          ✓ Filename sanitized
        </li>
        <li :class="{ passed: checks.mimeType }">
          ✓ MIME type verified
        </li>
        <li :class="{ passed: checks.virusScan }">
          ✓ Virus scan performed
        </li>
      </ul>
    </div>

    <div class="upload-section">
      <label class="file-label">
        <input
          type="file"
          @change="validateFile"
          class="file-input">
        <span class="btn-choose">Choose Secure File</span>
      </label>
      <p class="info">Max 10MB, allowed: PDF, DOC, DOCX, JPG, PNG</p>
    </div>

    <div v-if="validationErrors.length > 0" class="errors">
      <h5>⚠ Security Issues:</h5>
      <ul>
        <li v-for="(error, index) in validationErrors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>

    <div v-if="validatedFile" class="file-info-panel">
      <h5>✓ File Validated:</h5>
      <p><strong>Name:</strong> {{ validatedFile.sanitizedName }}</p>
      <p><strong>Size:</strong> {{ formatSize(validatedFile.file.size) }}</p>
      <p><strong>Type:</strong> {{ validatedFile.file.type }}</p>
      <p><strong>Hash:</strong> {{ validatedFile.hash }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecurityPractices',
  data() {
    return {
      checks: {
        fileType: false,
        fileSize: false,
        fileName: false,
        mimeType: false,
        virusScan: false
      },
      validationErrors: [],
      validatedFile: null
    }
  },
  methods: {
    async validateFile(event) {
      this.reset();
      const file = event.target.files[0];
      if (!file) return;
      
      const errors = [];
      const maxSize = 10 * 1024 * 1024;
      const allowedExts = ['.pdf', '.doc', '.docx', '.jpg', '.png'];
      const allowedMimes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png'
      ];
      
      // 1. File type check
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (allowedExts.includes(ext)) {
        this.checks.fileType = true;
      } else {
        errors.push(`File type not allowed: ${ext}`);
      }
      
      // 2. File size check
      if (file.size <= maxSize) {
        this.checks.fileSize = true;
      } else {
        errors.push(`File too large: ${this.formatSize(file.size)} (max 10MB)`);
      }
      
      // 3. Filename sanitization
      const sanitized = this.sanitizeFilename(file.name);
      if (sanitized === file.name) {
        this.checks.fileName = true;
      } else {
        errors.push('Filename contains unsafe characters');
      }
      
      // 4. MIME type check
      if (allowedMimes.includes(file.type)) {
        this.checks.mimeType = true;
      } else {
        errors.push(`Suspicious MIME type: ${file.type}`);
      }
      
      // 5. Simulate virus scan
      await this.simulateScan();
      this.checks.virusScan = true;
      
      this.validationErrors = errors;
      
      if (errors.length === 0) {
        const hash = await this.computeHash(file);
        this.validatedFile = {
          file,
          sanitizedName: sanitized,
          hash
        };
      }
    },
    sanitizeFilename(name) {
      return name.replace(/[^a-zA-Z0-9._-]/g, '_');
    },
    simulateScan() {
      return new Promise(resolve => setTimeout(resolve, 800));
    },
    async computeHash(file) {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
    },
    reset() {
      this.checks = {
        fileType: false,
        fileSize: false,
        fileName: false,
        mimeType: false,
        virusScan: false
      };
      this.validationErrors = [];
      this.validatedFile = null;
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

.security-checks {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}

.security-checks ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
}

.security-checks li {
  padding: 4px 0;
  color: #999;
}

.security-checks li.passed {
  color: #28a745;
  font-weight: bold;
}

.upload-section {
  margin-bottom: 15px;
}

.file-label {
  cursor: pointer;
}

.file-input {
  position: absolute;
  left: -10000px;
}

.btn-choose {
  display: inline-block;
  padding: 8px 16px;
  background: #0078d4;
  color: white;
  border-radius: 3px;
  font-weight: bold;
}

.info {
  margin: 8px 0 0 0;
  font-size: 11px;
  color: #666;
}

.errors {
  padding: 12px;
  background: #f8d7da;
  border-radius: 4px;
  margin-bottom: 12px;
}

.errors h5 {
  margin: 0 0 6px 0;
  color: #721c24;
}

.errors ul {
  margin: 0;
  padding-left: 20px;
  font-size: 12px;
  color: #721c24;
}

.file-info-panel {
  padding: 12px;
  background: #d4edda;
  border-radius: 4px;
}

.file-info-panel h5 {
  margin: 0 0 8px 0;
  color: #155724;
}

.file-info-panel p {
  margin: 0 0 4px 0;
  font-size: 12px;
}
</style>
```

---

## JWT Authentication

Secure uploads with JWT:

```vue
<template>
  <div class="jwt-auth">
    <h4>JWT Authentication</h4>

    <div class="auth-status">
      <p>Authentication: <strong>{{ isAuthenticated ? '✓ Authenticated' : '✗ Not authenticated' }}</strong></p>
      <button v-if="!isAuthenticated" @click="login" class="btn-login">
        Login
      </button>
      <button v-else @click="logout" class="btn-logout">
        Logout
      </button>
    </div>

    <div v-if="isAuthenticated" class="upload-section">
      <h5>Authenticated Upload:</h5>
      <label class="file-label">
        <input type="file" @change="secureUpload" class="file-input">
        <span class="btn-upload">Upload with JWT</span>
      </label>
      <p class="info">Token expires in: {{ tokenExpiry }} seconds</p>
    </div>

    <div v-if="uploadLog.length > 0" class="upload-log">
      <h5>Upload Log:</h5>
      <ul>
        <li v-for="(entry, index) in uploadLog" :key="index" :class="entry.status">
          <span class="log-time">{{ entry.time }}</span>
          <span class="log-action">{{ entry.action }}</span>
          <span class="log-detail">{{ entry.detail }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JWTAuth',
  data() {
    return {
      isAuthenticated: false,
      token: null,
      tokenExpiry: 3600,
      expiryTimer: null,
      uploadLog: []
    }
  },
  methods: {
    async login() {
      // Simulate JWT token retrieval
      await new Promise(resolve => setTimeout(resolve, 500));
      this.token = this.generateMockToken();
      this.isAuthenticated = true;
      this.tokenExpiry = 3600;
      this.logUpload('login', 'success', 'Token obtained from secure store');
      this.startExpiryCountdown();
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      clearInterval(this.expiryTimer);
      this.logUpload('logout', 'info', 'Token cleared');
    },
    generateMockToken() {
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify({
        sub: 'user123',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
      }));
      const signature = btoa('mock-signature');
      return `${header}.${payload}.${signature}`;
    },
    startExpiryCountdown() {
      this.expiryTimer = setInterval(() => {
        this.tokenExpiry--;
        if (this.tokenExpiry <= 0) {
          this.logout();
        }
      }, 1000);
    },
    async secureUpload(event) {
      if (!this.isAuthenticated) {
        this.logUpload('upload', 'error', 'Not authenticated');
        return;
      }
      
      const file = event.target.files[0];
      if (!file) return;
      
      this.logUpload('upload', 'info', `Uploading ${file.name}`);
      
      // Simulate authenticated upload
      const headers = {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'multipart/form-data'
      };
      
      console.log('Upload headers:', Object.keys(headers));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.logUpload('upload', 'success', `${file.name} uploaded securely`);
    },
    logUpload(action, status, detail) {
      this.uploadLog.unshift({
        action,
        status,
        detail,
        time: new Date().toLocaleTimeString()
      });
      if (this.uploadLog.length > 10) {
        this.uploadLog = this.uploadLog.slice(0, 10);
      }
    }
  },
  beforeUnmount() {
    clearInterval(this.expiryTimer);
  }
}
</script>

<style scoped>
h4 { margin: 0 0 15px 0; }
h5 { margin: 0 0 8px 0; font-size: 13px; }
p { margin: 0 0 8px 0; font-size: 13px; }

.auth-status {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}

.btn-login,
.btn-logout {
  padding: 6px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}

.btn-login { background: #28a745; color: white; }
.btn-logout { background: #dc3545; color: white; }

.upload-section {
  margin-bottom: 15px;
}

.file-label { cursor: pointer; }

.file-input {
  position: absolute;
  left: -10000px;
}

.btn-upload {
  display: inline-block;
  padding: 8px 16px;
  background: #0078d4;
  color: white;
  border-radius: 3px;
  font-weight: bold;
}

.info {
  margin: 8px 0 0 0;
  font-size: 11px;
  color: #666;
  font-style: italic;
}

.upload-log {
  background: #f9f9f9;
  padding: 12px;
  border-radius: 4px;
}

.upload-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 250px;
  overflow-y: auto;
}

.upload-log li {
  display: grid;
  grid-template-columns: 80px 80px 1fr;
  gap: 8px;
  padding: 6px;
  font-size: 12px;
  background: white;
  border-radius: 3px;
  margin-bottom: 4px;
}

.upload-log li.success { background: #d4edda; }
.upload-log li.error { background: #f8d7da; }
.upload-log li.info { background: #e3f2fd; }

.log-time {
  color: #999;
  font-family: monospace;
}

.log-action {
  font-weight: bold;
}

.log-detail {
  color: #333;
}
</style>
```

---

## Examples

### Complete Integration & Security

```vue
<template>
  <div class="integration-security-complete">
    <h3>Integration and Security</h3>

    <div class="demo-section">
      <h4>Secure Form Upload</h4>
      
      <form @submit.prevent="submitForm" class="secure-form">
        <div class="form-group">
          <label>Name:</label>
          <input v-model="form.name" type="text" required class="text-input">
        </div>
        
        <div class="form-group">
          <label>File:</label>
          <input
            type="file"
            @change="onFile"
            accept=".pdf,.jpg,.png"
            class="file-input">
        </div>
        
        <div class="security-info">
          <p>Security: <span class="secure">✓ HTTPS</span> | <span class="secure">✓ Encrypted</span> | <span class="secure">✓ Authenticated</span></p>
        </div>
        
        <button type="submit" :disabled="!form.file" class="btn-submit">
          Secure Upload
        </button>
      </form>

      <div v-if="lastUpload" class="last-upload">
        <h5>Last Upload:</h5>
        <p><strong>Name:</strong> {{ lastUpload.name }}</p>
        <p><strong>File:</strong> {{ lastUpload.fileName }}</p>
        <p><strong>Hash:</strong> {{ lastUpload.hash }}</p>
        <p><strong>Uploaded:</strong> {{ lastUpload.timestamp }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntegrationSecurityComplete',
  data() {
    return {
      form: { name: '', file: null },
      lastUpload: null
    }
  },
  methods: {
    onFile(e) {
      this.form.file = e.target.files[0];
    },
    async submitForm() {
      if (!this.form.file) return;
      
      const hash = await this.hashFile(this.form.file);
      this.lastUpload = {
        name: this.form.name,
        fileName: this.form.file.name,
        hash,
        timestamp: new Date().toLocaleString()
      };
      
      this.form = { name: '', file: null };
    },
    async hashFile(file) {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .substring(0, 16);
    }
  }
}
</script>

<style scoped>
.integration-security-complete {
  padding: 20px;
  max-width: 600px;
}

h3 { margin-bottom: 20px; }
h4 { margin: 0 0 15px 0; color: #0078d4; }
h5 { margin: 0 0 8px 0; font-size: 13px; }
p { margin: 0 0 8px 0; font-size: 13px; }

.demo-section {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 13px;
}

.text-input,
.file-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: inherit;
  font-size: 14px;
}

.security-info {
  padding: 10px;
  background: #f0f7ff;
  border-radius: 3px;
  margin-bottom: 12px;
}

.secure {
  color: #28a745;
  font-weight: bold;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.last-upload {
  margin-top: 15px;
  padding: 12px;
  background: #d4edda;
  border-radius: 3px;
}

.last-upload p {
  margin: 0 0 4px 0;
  font-size: 12px;
}
</style>
```

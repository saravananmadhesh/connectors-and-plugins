# Open and Save — Syncfusion Vue Signature

## Table of Contents
- [Save as Image](#save-as-image)
- [Save as Blob](#save-as-blob)
- [Load Signature](#load-signature)
- [Examples](#examples)

---

## Save as Image

Save signature as PNG, JPEG, or SVG:

```vue
<template>
  <div class="save-image">
    <fieldset>
      <legend>Save Signature as Image</legend>

      <div class="canvas-wrapper">
        <canvas
          ref="canvas"
          @mousedown="start"
          @mousemove="draw"
          @mouseup="stop"
          class="signature-canvas">
        </canvas>
      </div>

      <div class="button-group">
        <button @click="clearCanvas" class="btn-clear">Clear</button>
        <button @click="saveAsPng" class="btn-save">Save PNG</button>
        <button @click="saveAsJpeg" class="btn-save">Save JPEG</button>
        <button @click="saveAsSvg" class="btn-save">Save SVG</button>
      </div>

      <div v-if="lastSaved" class="preview-panel">
        <h4>Last Saved Preview:</h4>
        <img :src="lastSaved" alt="Saved" class="preview-img">
        <p>Format: <strong>{{ lastFormat }}</strong></p>
        <p>Size: <strong>{{ lastSize }} bytes</strong></p>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'SaveAsImage',
  data() {
    return {
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      strokes: [],
      lastSaved: null,
      lastFormat: '',
      lastSize: 0
    }
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    },
    start(e) {
      this.isDrawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
      this.strokes = [];
    },
    draw(e) {
      if (!this.isDrawing) return;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      this.strokes.push([this.lastX, this.lastY, x, y]);
      this.lastX = x;
      this.lastY = y;
    },
    stop() {
      this.isDrawing = false;
    },
    clearCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.strokes = [];
      this.lastSaved = null;
    },
    saveAsPng() {
      this.saveImage('image/png', 'png');
    },
    saveAsJpeg() {
      this.saveImage('image/jpeg', 'jpeg');
    },
    saveAsSvg() {
      const canvas = this.$refs.canvas;
      const svg = this.strokesToSvg(canvas.width, canvas.height);
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      this.lastSaved = url;
      this.lastFormat = 'SVG';
      this.lastSize = blob.size;
      this.downloadFile(url, 'signature.svg');
    },
    saveImage(mimeType, ext) {
      const canvas = this.$refs.canvas;
      const dataUrl = canvas.toDataURL(mimeType);
      this.lastSaved = dataUrl;
      this.lastFormat = ext.toUpperCase();
      
      const base64Length = dataUrl.split(',')[1].length;
      this.lastSize = Math.round(base64Length * 0.75);
      
      this.downloadFile(dataUrl, `signature.${ext}`);
    },
    strokesToSvg(width, height) {
      let paths = '';
      this.strokes.forEach(([x1, y1, x2, y2]) => {
        paths += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" stroke-linecap="round"/>`;
      });
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${paths}</svg>`;
    },
    downloadFile(dataUrl, filename) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      link.click();
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

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 12px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
  background: white;
}

.button-group {
  display: flex;
  gap: 6px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

button {
  flex: 1;
  min-width: 80px;
  padding: 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
}

.btn-clear { background: #dc3545; color: white; }
.btn-save { background: #0078d4; color: white; }

button:hover { opacity: 0.85; }

.preview-panel {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

.preview-panel h4 {
  margin: 0 0 8px 0;
  font-size: 13px;
}

.preview-img {
  max-width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  margin-bottom: 8px;
}

.preview-panel p {
  margin: 4px 0 0 0;
  font-size: 12px;
}
</style>
```

---

## Save as Blob

Convert signature to Blob for upload:

```vue
<template>
  <div class="save-blob">
    <h4>Save as Blob</h4>

    <div class="canvas-wrapper">
      <canvas
        ref="canvas"
        @mousedown="start"
        @mousemove="draw"
        @mouseup="stop"
        class="signature-canvas">
      </canvas>
    </div>

    <div class="info-panel">
      <p>Blob: <strong>{{ blobInfo.exists ? 'Created' : 'Not created' }}</strong></p>
      <p>Size: <strong>{{ blobInfo.size }} bytes</strong></p>
      <p>Type: <strong>{{ blobInfo.type }}</strong></p>
    </div>

    <div class="button-group">
      <button @click="clearCanvas" class="btn-clear">Clear</button>
      <button @click="createBlob" class="btn-primary">Create Blob</button>
      <button @click="uploadBlob" :disabled="!blobInfo.exists" class="btn-save">
        Upload to Server
      </button>
    </div>

    <div v-if="uploadStatus" :class="['upload-status', uploadStatus]">
      {{ uploadStatus === 'success' ? '✓ Upload successful' : '✗ Upload failed' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaveAsBlob',
  data() {
    return {
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      blobInfo: { exists: false, size: 0, type: '' },
      currentBlob: null,
      uploadStatus: ''
    }
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    },
    start(e) {
      this.isDrawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
    },
    draw(e) {
      if (!this.isDrawing) return;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      this.lastX = x;
      this.lastY = y;
    },
    stop() {
      this.isDrawing = false;
    },
    clearCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.blobInfo = { exists: false, size: 0, type: '' };
      this.currentBlob = null;
      this.uploadStatus = '';
    },
    createBlob() {
      this.$refs.canvas.toBlob((blob) => {
        this.currentBlob = blob;
        this.blobInfo = {
          exists: true,
          size: blob.size,
          type: blob.type
        };
      }, 'image/png');
    },
    async uploadBlob() {
      if (!this.currentBlob) return;
      
      const formData = new FormData();
      formData.append('signature', this.currentBlob, 'signature.png');
      
      // Simulate upload
      this.uploadStatus = '';
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        this.uploadStatus = 'success';
        setTimeout(() => { this.uploadStatus = ''; }, 3000);
      } catch (e) {
        this.uploadStatus = 'error';
      }
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 12px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
  background: white;
}

.info-panel {
  padding: 12px;
  background: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 12px;
}

.info-panel p {
  margin: 0 0 4px 0;
  font-size: 13px;
}

.info-panel p:last-child {
  margin-bottom: 0;
}

.button-group {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

button {
  flex: 1;
  padding: 8px;
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

.btn-clear { background: #dc3545; color: white; }
.btn-primary { background: #0078d4; color: white; }
.btn-save { background: #28a745; color: white; }

.upload-status {
  padding: 10px;
  border-radius: 3px;
  text-align: center;
  font-weight: bold;
}

.upload-status.success {
  background: #d4edda;
  color: #155724;
}

.upload-status.error {
  background: #f8d7da;
  color: #721c24;
}
</style>
```

---

## Load Signature

Load existing signature from base64 or URL:

```vue
<template>
  <div class="load-signature">
    <h4>Load Signature</h4>

    <div class="canvas-wrapper">
      <canvas
        ref="canvas"
        class="signature-canvas">
      </canvas>
    </div>

    <div class="form-group">
      <label>Load from Base64:</label>
      <textarea
        v-model="base64Input"
        rows="3"
        placeholder="Paste base64 data URL here..."
        class="text-input">
      </textarea>
      <button @click="loadFromBase64" class="btn-load">Load from Base64</button>
    </div>

    <div class="form-group">
      <label>Load from File:</label>
      <input
        type="file"
        accept="image/*"
        @change="loadFromFile"
        class="file-input">
    </div>

    <div class="form-group">
      <label>Sample Signatures:</label>
      <div class="sample-buttons">
        <button @click="loadSample('simple')" class="btn-sample">Simple</button>
        <button @click="loadSample('cursive')" class="btn-sample">Cursive</button>
        <button @click="loadSample('initials')" class="btn-sample">Initials</button>
      </div>
    </div>

    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadSignature',
  data() {
    return {
      base64Input: '',
      errorMessage: ''
    }
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
    },
    loadFromBase64() {
      this.errorMessage = '';
      if (!this.base64Input) {
        this.errorMessage = 'Please enter base64 data';
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        const ctx = this.$refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.onerror = () => {
        this.errorMessage = 'Invalid base64 data';
      };
      img.src = this.base64Input;
    },
    loadFromFile(event) {
      this.errorMessage = '';
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const ctx = this.$refs.canvas.getContext('2d');
          ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    loadSample(type) {
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      ctx.fillStyle = '#000';
      
      const samples = {
        simple: { text: 'John Doe', x: 50, y: 100, font: '30px cursive' },
        cursive: { text: 'Jane Smith', x: 30, y: 100, font: 'italic 32px cursive' },
        initials: { text: 'JS', x: 80, y: 120, font: 'bold 60px serif' }
      };
      
      const sample = samples[type];
      ctx.font = sample.font;
      ctx.fillText(sample.text, sample.x, sample.y);
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 15px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  background: white;
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

.text-input {
  width: 100%;
  padding: 6px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-family: monospace;
  font-size: 11px;
  margin-bottom: 6px;
}

.file-input {
  width: 100%;
  padding: 4px;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
}

.btn-load { background: #0078d4; color: white; }
.btn-sample { background: #6c757d; color: white; margin-right: 4px; }

button:hover { opacity: 0.85; }

.sample-buttons {
  margin-top: 4px;
}

.error {
  margin-top: 10px;
  padding: 8px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 3px;
  font-size: 12px;
}
</style>
```

---

## Examples

### Complete Open/Save Workflow

```vue
<template>
  <div class="open-save-complete">
    <h3>Open and Save Signature</h3>

    <div class="workflow">
      <div class="step">
        <h4>1. Sign or Load</h4>
        <canvas
          ref="canvas"
          @mousedown="start"
          @mousemove="draw"
          @mouseup="stop"
          class="signature-canvas">
        </canvas>
        <div class="step-actions">
          <button @click="clearCanvas" class="btn-clear">Clear</button>
          <button @click="loadDemo" class="btn-load">Load Demo</button>
        </div>
      </div>

      <div class="step">
        <h4>2. Choose Format</h4>
        <div class="format-options">
          <label>
            <input
              type="radio"
              v-model="format"
              value="png"> PNG
          </label>
          <label>
            <input
              type="radio"
              v-model="format"
              value="jpeg"> JPEG
          </label>
          <label>
            <input
              type="radio"
              v-model="format"
              value="svg"> SVG
          </label>
        </div>
        
        <label class="option-toggle">
          <input
            type="checkbox"
            v-model="includeBackground">
          Include background
        </label>
      </div>

      <div class="step">
        <h4>3. Save</h4>
        <div class="save-buttons">
          <button @click="downloadFile" class="btn-save">Download File</button>
          <button @click="copyToClipboard" class="btn-secondary">Copy Data URL</button>
          <button @click="uploadToServer" class="btn-primary">Upload to Server</button>
        </div>
      </div>
    </div>

    <div v-if="result" class="result-panel">
      <h4>Result:</h4>
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpenSaveComplete',
  data() {
    return {
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      format: 'png',
      includeBackground: true,
      result: ''
    }
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    },
    start(e) {
      this.isDrawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
    },
    draw(e) {
      if (!this.isDrawing) return;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      this.lastX = x;
      this.lastY = y;
    },
    stop() {
      this.isDrawing = false;
    },
    clearCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (this.includeBackground) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      this.result = '';
    },
    loadDemo() {
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      if (this.includeBackground) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      }
      ctx.fillStyle = '#000';
      ctx.font = 'italic 30px cursive';
      ctx.fillText('Demo Signature', 50, 100);
    },
    getDataUrl() {
      return this.$refs.canvas.toDataURL(`image/${this.format}`);
    },
    downloadFile() {
      const dataUrl = this.getDataUrl();
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `signature.${this.format}`;
      link.click();
      this.result = `Downloaded as signature.${this.format}\nData URL length: ${dataUrl.length} chars`;
    },
    async copyToClipboard() {
      try {
        const dataUrl = this.getDataUrl();
        await navigator.clipboard.writeText(dataUrl);
        this.result = 'Data URL copied to clipboard!';
      } catch (e) {
        this.result = 'Copy failed: ' + e.message;
      }
    },
    async uploadToServer() {
      this.result = 'Uploading...';
      await new Promise(resolve => setTimeout(resolve, 1500));
      const dataUrl = this.getDataUrl();
      this.result = `Upload successful!\nFormat: ${this.format}\nSize: ${Math.round(dataUrl.length * 0.75)} bytes`;
    }
  }
}
</script>

<style scoped>
.open-save-complete {
  padding: 20px;
  max-width: 900px;
}

h3 {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #0078d4;
}

.workflow {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.step {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: crosshair;
  margin-bottom: 8px;
}

.step-actions,
.save-buttons {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.format-options {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.format-options label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  cursor: pointer;
}

.option-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  margin-top: 10px;
  cursor: pointer;
}

button {
  flex: 1;
  min-width: 80px;
  padding: 6px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}

.btn-clear { background: #dc3545; color: white; }
.btn-load { background: #6c757d; color: white; }
.btn-save { background: #0078d4; color: white; }
.btn-secondary { background: #17a2b8; color: white; }
.btn-primary { background: #28a745; color: white; }

button:hover { opacity: 0.85; }

.result-panel {
  padding: 15px;
  background: #f0f7ff;
  border-radius: 4px;
  border-left: 4px solid #0078d4;
}

.result-panel pre {
  margin: 0;
  white-space: pre-wrap;
  font-size: 12px;
  font-family: monospace;
}
</style>
```

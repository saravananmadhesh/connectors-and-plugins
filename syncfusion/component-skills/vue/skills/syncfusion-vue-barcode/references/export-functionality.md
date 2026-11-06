# Export Functionality

## Table of Contents
- [Overview](#overview)
- [Export as Image](#export-as-image)
- [Export as Base64 String](#export-as-base64-string)
- [File Formats](#file-formats)
- [Composition API Examples](#composition-api-examples)
- [Options API Examples](#options-api-examples)
- [Error Handling](#error-handling)
- [Practical Examples](#practical-examples)

## Overview

Syncfusion barcode components support exporting generated barcodes as:
- **Images:** PNG, JPG, SVG formats for saving and printing
- **Base64 strings:** For embedding in documents or databases
- **Browser downloads:** Automatic file download on user action

## Export as Image

### Basic Image Export

The `exportImage()` method exports barcode as image file and triggers browser download.

**Syntax:**
```javascript
componentInstance.exportImage(filename, imageType);
```

**Parameters:**
- `filename` (string): Name for downloaded file (without extension)
- `imageType` (string): Format - 'PNG', 'JPG', or 'SVG'

### Export to PNG

```vue
<template>
  <div>
    <ejs-barcodegenerator
      id="barcode"
      ref="barcodeControl"
      type="Code128"
      value="EXPORT-TEST-001"
      width="200px"
      height="150px"
    ></ejs-barcodegenerator>
    <button @click="exportToPNG">Download as PNG</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const barcodeControl = ref(null);

const exportToPNG = () => {
  if (barcodeControl.value) {
    const instance = barcodeControl.value.ej2_instances[0];
    instance.exportImage('barcode', 'PNG');
  }
};
</script>
```

### Export to JPG

```vue
<template>
  <div>
    <ejs-qrcodegenerator
      id="qrcode"
      ref="qrcodeControl"
      value="https://www.example.com"
      width="200px"
      height="200px"
    ></ejs-qrcodegenerator>
    <button @click="exportToJPG">Download as JPG</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const qrcodeControl = ref(null);

const exportToJPG = () => {
  if (qrcodeControl.value) {
    const instance = qrcodeControl.value.ej2_instances[0];
    instance.exportImage('qrcode', 'JPG');
  }
};
</script>
```

### Export to SVG

SVG format is ideal for scalable graphics and printing.

```vue
<template>
  <div>
    <ejs-datamatrixgenerator
      id="datamatrix"
      ref="dmControl"
      value="SHIPMENT-2024-001"
      width="200px"
      height="200px"
    ></ejs-datamatrixgenerator>
    <button @click="exportToSVG">Download as SVG</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';

const dmControl = ref(null);

const exportToSVG = () => {
  if (dmControl.value) {
    const instance = dmControl.value.ej2_instances[0];
    instance.exportImage('datamatrix', 'SVG');
  }
};
</script>
```

## Export as Base64 String

### Basic Base64 Export

The `exportAsBase64Image()` method returns barcode as Base64-encoded string (async method).

**Syntax:**
```javascript
const base64String = await componentInstance.exportAsBase64Image(imageType);
```

**Use cases:**
- Embedding barcodes in emails
- Storing barcodes in databases
- Embedding in PDF documents
- API responses with image data

### Export QR Code as Base64

```vue
<template>
  <div>
    <ejs-qrcodegenerator
      id="qrcode"
      ref="qrcodeControl"
      value="https://www.example.com"
      width="200px"
      height="200px"
    ></ejs-qrcodegenerator>
    <button @click="getBase64">Get Base64 String</button>
    <textarea v-if="base64String" :value="base64String" readonly></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const qrcodeControl = ref(null);
const base64String = ref('');

const getBase64 = async () => {
  if (qrcodeControl.value) {
    const instance = qrcodeControl.value.ej2_instances[0];
    base64String.value = await instance.exportAsBase64Image('PNG');
    console.log('Base64:', base64String.value);
  }
};
</script>
```

### Store Base64 in Database

```vue
<template>
  <div>
    <ejs-barcodegenerator
      id="barcode"
      ref="barcodeControl"
      type="Code128"
      :value="productId"
      width="200px"
      height="150px"
    ></ejs-barcodegenerator>
    <button @click="saveBarcodeToServer">Save to Server</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const barcodeControl = ref(null);
const productId = ref('PRODUCT-123');

const saveBarcodeToServer = async () => {
  if (barcodeControl.value) {
    const instance = barcodeControl.value.ej2_instances[0];
    const base64Image = await instance.exportAsBase64Image('PNG');
    
    // Send to server
    const response = await fetch('/api/barcodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: productId.value,
        barcodeImage: base64Image,
        timestamp: new Date().toISOString()
      })
    });
    
    if (response.ok) {
      console.log('Barcode saved successfully');
    }
  }
};
</script>
```

## File Formats

### PNG (Recommended for Web)

- **Advantages:** Lossless compression, supports transparency, widely supported
- **Best for:** Web display, email, digital documents
- **File size:** Medium (typically 1-5 KB for barcodes)

```javascript
instance.exportImage('barcode', 'PNG');
```

### JPG (Best for Print)

- **Advantages:** High compression, compatible with all systems
- **Best for:** Printing, archival, smaller file size
- **File size:** Small (typically 0.5-2 KB for barcodes)

```javascript
instance.exportImage('barcode', 'JPG');
```

### SVG (Best for Scaling)

- **Advantages:** Scalable vector format, excellent for print, smallest file size
- **Best for:** Print media, responsive designs, archival quality
- **File size:** Smallest (typically 0.2-1 KB for barcodes)

```javascript
instance.exportImage('barcode', 'SVG');
```

## Composition API Examples

### Standard Export with Ref

```vue
<template>
  <div class="export-demo">
    <ejs-qrcodegenerator
      id="qrcode"
      ref="qrcodeRef"
      value="https://www.syncfusion.com"
      width="200px"
      height="200px"
    ></ejs-qrcodegenerator>
    <div class="button-group">
      <button @click="exportPNG">Export PNG</button>
      <button @click="exportJPG">Export JPG</button>
      <button @click="exportSVG">Export SVG</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const qrcodeRef = ref(null);

const getComponentInstance = () => {
  return qrcodeRef.value?.ej2_instances[0];
};

const exportPNG = () => {
  getComponentInstance()?.exportImage('qrcode', 'PNG');
};

const exportJPG = () => {
  getComponentInstance()?.exportImage('qrcode', 'JPG');
};

const exportSVG = () => {
  getComponentInstance()?.exportImage('qrcode', 'SVG');
};
</script>

<style scoped>
  .button-group {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }

  button {
    padding: 10px 20px;
    background: #0078d4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background: #106ebe;
  }
</style>
```

## Options API Examples

### Standard Export with Options API

```vue
<template>
  <div class="export-demo">
    <ejs-barcodegenerator
      id="barcode"
      type="Code128"
      value="ABC-123-XYZ"
      width="200px"
      height="150px"
    ></ejs-barcodegenerator>
    <button @click="downloadBarcode">Download</button>
  </div>
</template>

<script>
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
  components: {
    'ejs-barcodegenerator': BarcodeGeneratorComponent
  },
  methods: {
    downloadBarcode() {
      const element = document.getElementById('barcode');
      const instance = element.ej2_instances[0];
      instance.exportImage('barcode', 'PNG');
    }
  }
};
</script>
```

## Error Handling

### Safe Export with Error Handling

```vue
<template>
  <div>
    <ejs-qrcodegenerator
      id="qrcode"
      ref="qrcodeControl"
      value="https://www.example.com"
      width="200px"
      height="200px"
    ></ejs-qrcodegenerator>
    <button @click="safeExport">Export Safely</button>
    <p v-if="message" :class="messageType">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const qrcodeControl = ref(null);
const message = ref('');
const messageType = ref('');

const safeExport = async () => {
  try {
    if (!qrcodeControl.value) {
      throw new Error('Component not initialized');
    }

    const instance = qrcodeControl.value.ej2_instances[0];
    if (!instance) {
      throw new Error('Component instance not found');
    }

    instance.exportImage('qrcode', 'PNG');
    message.value = 'Export successful!';
    messageType.value = 'success';
  } catch (error) {
    message.value = `Export failed: ${error.message}`;
    messageType.value = 'error';
    console.error('Export error:', error);
  }

  setTimeout(() => {
    message.value = '';
  }, 3000);
};
</script>

<style scoped>
  p {
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
  }

  .success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
</style>
```

## Practical Examples

### Complete Export Demo with Multiple Options

```vue
<template>
  <div class="export-container">
    <h2>Barcode Export System</h2>
    
    <div class="input-section">
      <input 
        v-model="barcodeValue" 
        placeholder="Enter barcode value"
      />
      <select v-model="selectedFormat">
        <option value="PNG">PNG</option>
        <option value="JPG">JPG</option>
        <option value="SVG">SVG</option>
      </select>
    </div>

    <div class="display-section">
      <ejs-qrcodegenerator
        id="barcode"
        ref="barcodeRef"
        :value="barcodeValue"
        width="250px"
        height="250px"
      ></ejs-qrcodegenerator>
    </div>

    <div class="export-section">
      <button @click="downloadBarcode" class="btn-export">
        Download {{ selectedFormat }}
      </button>
      <button @click="copyBase64" class="btn-secondary">
        Copy Base64
      </button>
    </div>

    <div v-if="statusMessage" :class="['status', statusType]">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const barcodeRef = ref(null);
const barcodeValue = ref('https://www.example.com');
const selectedFormat = ref('PNG');
const statusMessage = ref('');
const statusType = ref('');

const downloadBarcode = () => {
  try {
    const instance = barcodeRef.value?.ej2_instances[0];
    if (instance) {
      instance.exportImage(`barcode-${Date.now()}`, selectedFormat.value);
      statusMessage.value = `Downloaded as ${selectedFormat.value}`;
      statusType.value = 'success';
    }
  } catch (error) {
    statusMessage.value = 'Download failed: ' + error.message;
    statusType.value = 'error';
  }
  setTimeout(() => { statusMessage.value = ''; }, 3000);
};

const copyBase64 = async () => {
  try {
    const instance = barcodeRef.value?.ej2_instances[0];
    if (instance) {
      const base64 = await instance.exportAsBase64Image(selectedFormat.value);
      await navigator.clipboard.writeText(base64);
      statusMessage.value = 'Base64 copied to clipboard!';
      statusType.value = 'success';
    }
  } catch (error) {
    statusMessage.value = 'Copy failed: ' + error.message;
    statusType.value = 'error';
  }
  setTimeout(() => { statusMessage.value = ''; }, 3000);
};
</script>

<style scoped>
  .export-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
  }

  .input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
  }

  input, select {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .display-section {
    text-align: center;
    padding: 30px;
    background: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .export-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  button {
    flex: 1;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  .btn-export {
    background: #0078d4;
    color: white;
  }

  .btn-export:hover {
    background: #106ebe;
  }

  .btn-secondary {
    background: #e7e7e7;
    color: #333;
  }

  .btn-secondary:hover {
    background: #d0d0d0;
  }

  .status {
    padding: 12px;
    border-radius: 4px;
    text-align: center;
  }

  .status.success {
    background: #d4edda;
    color: #155724;
  }

  .status.error {
    background: #f8d7da;
    color: #721c24;
  }
</style>
```

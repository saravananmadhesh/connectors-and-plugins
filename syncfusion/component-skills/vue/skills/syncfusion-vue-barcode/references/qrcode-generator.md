# QR Code Generator Component

The QRCodeGenerator creates 2D QR codes for data sharing, URLs, contact information, and more in Vue applications.

## Overview

QR codes are two-dimensional barcodes that encode data in a grid of dark and light squares. They can store URLs, contact info, WiFi credentials, calendar events, and plain text.

### Key Characteristics

- **Versions 1-40:** Determine data capacity (Version 1 = 21×21 modules, Version 40 = 177×177 modules)
- **Auto version selection:** Component automatically chooses appropriate version for data length
- **High error correction:** Can be read even if 30% of code is damaged
- **Common use cases:** URLs, contact sharing, WiFi setup, product information, event registration

## Component Basics

### Import and Register

**Composition API:**
```vue
<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

**Options API:**
```javascript
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
  components: {
    'ejs-qrcodegenerator': QRCodeGeneratorComponent
  }
}
```

## Basic Implementation

### Minimal QR Code

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "150px";
const mode = "SVG";
const value = "https://www.syncfusion.com";
</script>
```

### QR Code with SVG Rendering

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "250px";
const height = "250px";
const mode = "SVG";
const value = "https://www.example.com";
</script>
```

SVG mode provides better quality for scaling and is recommended for most use cases.

## QR Code Versions and Data Capacity

Versions determine encoded data capacity:

| Version | Modules | Numeric Capacity | Alphanumeric | Byte |
|---------|---------|------------------|--------------|------|
| 1 | 21×21 | 41 | 25 | 17 |
| 5 | 37×37 | 154 | 93 | 65 |
| 10 | 57×57 | 346 | 209 | 146 |
| 20 | 97×97 | 1,239 | 749 | 524 |
| 40 | 177×177 | 7,089 | 4,296 | 3,057 |

Component automatically selects the appropriate version for your data.

## Customizing the Barcode Color

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :foreColor="foreColor"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "150px";
const mode = "SVG";
const foreColor = "red";
const value = "Syncfusion";
</script>
```

## Customizing the Text

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :displayText="displayText"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "150px";
const mode = "SVG";
const displayText = { text: 'text' };
const value = "Syncfusion";
</script>
```

## Enhancing QR Codes with Icons

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :logo="logo"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "150px";
const mode = "SVG";
const logo = { imageSource: 'https://www.syncfusion.com/web-stories/wp-content/uploads/sites/2/2022/02/cropped-Syncfusion-logo.png' };
const value = "Syncfusion";
</script>
```

## Data Encoding

### URL Encoding

Best for sharing links and web resources.

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "200px";
const mode = "SVG";
const value = "https://www.my-app.com/product/12345?ref=email";
</script>
```

### Contact Information (vCard)

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "200px";
const mode = "SVG";
const value = ref(`BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:Syncfusion
TEL:+1-555-1234
EMAIL:john.doe@example.com
END:VCARD`);
</script>
```

### WiFi Connection

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

// WiFi string format: WIFI:T:WPA;S:SSID;P:PASSWORD;;
const width = "200px";
const height = "200px";
const mode = "SVG";
const value = ref('WIFI:T:WPA;S:MyNetwork;P:MyPassword123;;');
</script>
```

### Plain Text

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "200px";
const mode = "SVG";
const value = "Hello, Syncfusion!";
</script>
```

## Dynamic QR Code Generation

### User Input Example

```vue
<template>
  <div class="qr-generator">
    <div class="input-section">
      <label>Enter URL or Text:</label>
      <input 
        v-model="qrData" 
        placeholder="https://example.com"
        @input="updateQR"
      />
    </div>
    <div class="qr-section">
      <ejs-qrcodegenerator
        id="barcode"
        ref="barcodeControl"
        :width="width"
        :height="height"
        :value="value"
        :mode="mode"
      ></ejs-qrcodegenerator>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "250px";
const height = "250px";
const mode = "SVG";
const qrData = ref('https://www.example.com');
const value = ref(qrData.value || 'No data');

const updateQR = () => {
  value.value = qrData.value || 'No data';
  console.log('QR code updated for:', qrData.value);
};
</script>

<style scoped>
  .qr-generator {
    padding: 30px;
    max-width: 500px;
    margin: 0 auto;
  }

  .input-section {
    margin-bottom: 30px;
  }

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  .qr-section {
    display: flex;
    justify-content: center;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
  }
</style>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | - | Unique component identifier |
| `value` | string | - | **Required:** Data to encode |
| `width` | string | '100%' | Component width |
| `height` | string | '100px' | Component height |
| `mode` | string | 'SVG' | Render mode ('SVG' or 'Canvas') |
| `foreColor` | string | - | Foreground color of the barcode |
| `displayText` | object | - | Display text settings |
| `logo` | object | - | Logo/icon settings |
| `errorCorrectionLevel` | string | 'Medium' | Error correction level |

## Configuration Examples

### Large QR Code with Canvas

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "400px";
const height = "400px";
const mode = "Canvas";
const value = "https://www.example.com/product/12345";
</script>
```

### Responsive QR Code

```vue
<template>
  <div class="responsive-qr">
    <ejs-qrcodegenerator
      id="barcode"
      ref="barcodeControl"
      :width="width"
      :height="height"
      :value="value"
      :mode="mode"
    ></ejs-qrcodegenerator>
  </div>
</template>

<style scoped>
  .responsive-qr {
    max-width: 300px;
    margin: 0 auto;
  }
</style>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "100%";
const height = "300px";
const mode = "SVG";
const value = "https://www.example.com";
</script>
```

## Common Use Cases

### 1. Product Landing Page QR Code

```vue
<template>
  <div class="product-qr">
    <h2>Product Information</h2>
    <p>Scan to view product details:</p>
    <ejs-qrcodegenerator
      id="barcode"
      ref="barcodeControl"
      :width="width"
      :height="height"
      :value="value"
      :mode="mode"
    ></ejs-qrcodegenerator>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "250px";
const height = "250px";
const mode = "SVG";
const value = ref('https://my-store.com/product/ABC123');
</script>
```

### 2. Event Registration QR Code

```vue
<template>
  <div class="event-qr">
    <h3>{{ eventName }}</h3>
    <ejs-qrcodegenerator
      id="barcode"
      ref="barcodeControl"
      :width="width"
      :height="height"
      :value="value"
      :mode="mode"
    ></ejs-qrcodegenerator>
    <p>Scan to register</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "200px";
const mode = "SVG";
const eventName = ref('Tech Conference 2024');
const value = ref('https://events.example.com/register/tech-2024');
</script>
```

## Troubleshooting

### QR Code Too Complex

**Issue:** Data too large for default version

**Solution:** Component automatically handles this by increasing version. If you need fixed size, shorten data:

```vue
<template>
  <ejs-qrcodegenerator
    id="barcode"
    ref="barcodeControl"
    :width="width"
    :height="height"
    :value="value"
    :mode="mode"
  ></ejs-qrcodegenerator>
</template>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

// Use URL shortener for long URLs
const width = "200px";
const height = "200px";
const mode = "SVG";
const value = ref('https://short.link/abc123');
</script>
```

### Scanner Not Reading Code

**Solution:** Ensure adequate contrast:
- Use SVG mode for better clarity
- Increase code size (minimum 200px×200px recommended)
- Ensure surrounding whitespace (quiet zone)

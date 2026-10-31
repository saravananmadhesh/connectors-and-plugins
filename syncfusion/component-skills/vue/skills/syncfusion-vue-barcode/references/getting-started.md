# Getting Started with Vue Barcode Component

## Installation

### Install Syncfusion Vue Barcode Package

```bash
npm install @syncfusion/ej2-vue-barcode-generator --save
```

or using Yarn:

```bash
yarn add @syncfusion/ej2-vue-barcode-generator
```

### Dependencies

The barcode generator component requires the following dependencies:

```javascript
|-- @syncfusion/ej2-vue-barcode-generator
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-data
    |-- @syncfusion/ej2-navigations
    |-- @syncfusion/ej2-inputs
    |-- @syncfusion/ej2-popups
    |-- @syncfusion/ej2-buttons
    |-- @syncfusion/ej2-lists
    |-- @syncfusion/ej2-splitbuttons
    |-- @syncfusion/ej2-barcode-generator
    |-- @syncfusion/ej2-vue-base
```

These dependencies are automatically installed with the main package.

## Vue Project Setup

### Vue 2 Setup with Vue-CLI

```bash
npm install -g @vue/cli
vue create quickstart
cd quickstart
npm run serve
```

Choose "Default ([Vue 2] babel, eslint)" when prompted.

### Vue 3 Setup with Vite

```bash
npm create vite@latest quickstart -- --template vue
cd quickstart
npm install
npm run dev
```

## Importing the Component

### Composition API (Vue 3 / Vue 2 with setup)

```vue
<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

### Options API (Vue 2 / Vue 3 Options)

```vue
<script>
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
  components: {
    'ejs-qrcodegenerator': QRCodeGeneratorComponent
  }
}
</script>
```

## Basic Barcode Implementation

### Minimal QR Code Example

```vue
<template>
  <div class="barcode-container">
    <ejs-qrcodegenerator
      id="qrcode"
      :value="barcodeValue"
      width="200px"
      height="200px"
    ></ejs-qrcodegenerator>
  </div>
</template>

<style scoped>
  .barcode-container {
    padding: 20px;
  }
</style>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const barcodeValue = "https://www.syncfusion.com";
</script>
```

### Minimal Barcode Example

```vue
<template>
  <div class="barcode-container">
    <ejs-barcodegenerator
      id="barcode"
      value="SYNCFUSION"
      type="Code128"
      width="200px"
      height="150px"
    ></ejs-barcodegenerator>
  </div>
</template>

<script setup>
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

## CSS Styling

### Basic Container Styling

```vue
<style scoped>
  .barcode-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
  }
</style>
```

### Responsive Container

```vue
<style scoped>
  .barcode-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
</style>
```

## Complete Setup Example

```vue
<template>
  <div class="app">
    <h1>Barcode Generator</h1>
    <div class="barcode-section">
      <h2>QR Code</h2>
      <ejs-qrcodegenerator
        id="qrcode"
        value="https://www.example.com"
        width="200px"
        height="200px"
        mode="SVG"
      ></ejs-qrcodegenerator>
    </div>
  </div>
</template>

<style scoped>
  .app {
    padding: 40px 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 40px;
  }

  .barcode-section {
    background: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  h2 {
    color: #555;
    margin-bottom: 20px;
  }
</style>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

## Common Setup Issues

### Issue: Component Not Rendered

**Symptom:** Barcode doesn't appear after setup

**Solution:**
- Verify package is installed: `npm list @syncfusion/ej2-vue-barcode-generator`
- Ensure correct component name is imported
- Check Vue version compatibility (Vue 2.7+, Vue 3+)
- Verify `id` attribute is present on component

### Issue: Import Errors

**Symptom:** Cannot find module error

**Solution:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Verify exact import path matches your package version
- Check for TypeScript vs JavaScript setup differences

### Issue: Component Displays but No Barcode

**Symptom:** Component renders but barcode content is empty

**Solution:**
- Ensure `value` prop is provided
- Verify `value` contains valid data for selected type
- Check browser console for warnings
- Try explicit dimension props: `width="200px"` and `height="150px"`

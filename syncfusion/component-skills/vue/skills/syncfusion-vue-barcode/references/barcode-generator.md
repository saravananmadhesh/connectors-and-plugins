# Barcode Generator Component

## Table of Contents
- [Overview](#overview)
- [Component Basics](#component-basics)
- [Barcode Types](#barcode-types)
- [Implementation](#implementation)
- [Props Reference](#props-reference)
- [Examples](#examples)
- [Edge Cases](#edge-cases)

## Overview

The BarcodeGenerator component creates linear (1D) barcodes in Vue applications. It supports multiple barcode standards and encoding formats for product identification, inventory tracking, and data labeling.

## Component Basics

### Import and Register

**Composition API:**
```vue
<script setup>
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

**Options API:**
```javascript
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
  components: {
    'ejs-barcodegenerator': BarcodeGeneratorComponent
  }
}
```

## Barcode Types

The BarcodeGenerator supports these 1D barcode types:

### Code39
Character set: 0-9, A-Z (uppercase), space, -, +, ., $, /, %

```vue
<template>
  <ejs-barcodegenerator
    type="Code39"
    value="SYNCFUSION"
    width="200px"
    height="150px"
  ></ejs-barcodegenerator>
</template>
```

**Use cases:** Inventory tracking, shelf labels, simple identification

### Code128
Encodes full ASCII character set (0-127). Automatically selects optimal encoding (A, B, or C).

```vue
<template>
  <ejs-barcodegenerator
    type="Code128"
    value="Syncfusion-2024"
    width="200px"
    height="150px"
  ></ejs-barcodegenerator>
</template>
```

**Use cases:** Complex data, shipping labels, professional barcodes

### Code93
10% shorter than Code39. Encodes uppercase letters, numbers, and special chars.

```vue
<template>
  <ejs-barcodegenerator
    type="Code93"
    value="PRODUCT-789"
    width="200px"
    height="150px"
  ></ejs-barcodegenerator>
</template>
```

**Use cases:** Compact applications, library barcodes

### Code32
Numeric-only, used in pharmaceuticals and health sector.

```vue
<template>
  <ejs-barcodegenerator
    type="Code32"
    value="123456789"
    width="200px"
    height="150px"
  ></ejs-barcodegenerator>
</template>
```

**Use cases:** Pharmaceutical labeling, health products

### Code11
Used primarily for telecommunications industry.

```vue
<template>
  <ejs-barcodegenerator
    type="Code11"
    value="12345678"
    width="200px"
    height="150px"
  ></ejs-barcodegenerator>
</template>
```

### Codabar
Used in blood bank labeling, library cards, and package tracking.

```vue
<template>
  <ejs-barcodegenerator
    type="Codabar"
    value="12345678"
    width="200px"
    height="150px"
  ></ejs-barcodegenerator>
</template>
```

**Use cases:** Medical supplies, express shipping, parking tickets

## Implementation

### Basic Barcode

```vue
<template>
  <div>
    <ejs-barcodegenerator
      id="barcode"
      ref="barcodeControl"
      type="Code128"
      value="SYNCFUSION"
      width="200px"
      height="150px"
      displayText="{ visibility: true }"
    ></ejs-barcodegenerator>
  </div>
</template>

<script setup>
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

</script>
```

### Dynamic Barcode with User Input

```vue
<template>
  <div>
    <div class="input-group">
      <input 
        v-model="barcodeValue" 
        placeholder="Enter barcode data"
        @input="updateBarcode"
      />
      <select v-model="selectedType">
        <option value="Code128">Code128</option>
        <option value="Code39">Code39</option>
        <option value="Code93">Code93</option>
        <option value="Codabar">Codabar</option>
      </select>
    </div>
    <ejs-barcodegenerator
      id="barcode"
      ref="barcodeControl"
      :type="selectedType"
      :value="barcodeValue"
      width="250px"
      height="150px"
      displayText="{ visibility: true }"
    ></ejs-barcodegenerator>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const barcodeValue = ref('PRODUCT123');
const selectedType = ref('Code128');
const barcodeControl = ref(null);

const updateBarcode = () => {
  // Component automatically updates when value changes
  console.log('Barcode updated to:', barcodeValue.value);
};
</script>
```

### Barcode with Display Text

```vue
<template>
  <ejs-barcodegenerator
    type="Code128"
    value="SYNC-2024-001"
    width="250px"
    height="150px"
    displayText="{ visibility: true }"
  ></ejs-barcodegenerator>
</template>
```

The `displayText` prop shows the encoded value below the barcode for clarity.

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | - | Unique component identifier. |
| `type` | string | - | **Required:** Barcode type (`Code39`, `Code128`, `Code93`, `Code32`, `Code11`, `Codabar`, `Ean8`, `Ean13`, `UpcA`, `UpcE`). |
| `value` | string | - | **Required:** Data to encode. |
| `width` | string | '100%' | Barcode width (e.g., `'200px'`, `'100%'`). |
| `height` | string | '100px' | Barcode height. |
| `mode` | 'SVG' \| 'Canvas' | 'SVG' | Rendering mode. |
| `displayText` | DisplayTextModel | `{ visibility: true }` | Displays the human‑readable text. |
| `margin` | MarginModel | `{ left: 10, right: 10, top: 10, bottom: 10 }` | Margin around the barcode. |
| `foreColor` | string | '#000000' | Barcode line color. |
| `backgroundColor` | string | '#ffffff' | Background color of barcode. |

## Examples

### Example 1: Product Barcode System

```vue
<template>
  <div class="product-barcode">
    <h2>{{ productName }}</h2>
    <ejs-barcodegenerator
      :type="barcodeType"
      :value="productId"
      width="200px"
      height="150px"
      :displayText="{ visibility: true }"
    ></ejs-barcodegenerator>
    <p>{{ productId }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const productName = ref('Premium Widget');
const productId = ref('WIDGET-2024-0001');
const barcodeType = ref('Code128');
</script>

<style scoped>
.product-barcode {
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
```

### Example 2: Batch Barcode Generation

```vue
<template>
  <div class="barcode-batch">
    <h2>Generated Barcodes</h2>

    <div class="batch-grid">
      <div 
        v-for="item in barcodeList" 
        :key="item.id" 
        class="barcode-card"
      >
        <h3>{{ item.name }}</h3>

        <ejs-barcodegenerator
          :type="barcodeType"
          :value="item.code"
          width="150px"
          height="120px"
          :displayText="{ visibility: true }"
        ></ejs-barcodegenerator>

        <p>{{ item.code }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const barcodeType = ref('Code128');

const barcodeList = ref([
  { id: 1, name: 'Item A', code: 'ITEM-001' },
  { id: 2, name: 'Item B', code: 'ITEM-002' },
  { id: 3, name: 'Item C', code: 'ITEM-003' }
]);
</script>

<style scoped>
.batch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.barcode-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}
</style>
```

## Edge Cases

### Invalid Data for Barcode Type

**Issue:** Code39 doesn't support certain characters.

**Solution:** Validate input before setting value:

```javascript
const isValidCode39 = (value) => {
  const code39Chars = /^[A-Z0-9 \-\.+$/%]*$/;
  return code39Chars.test(value);
};

const updateBarcodeValue = (newValue) => {
  if (isValidCode39(newValue)) {
    barcodeValue.value = newValue;
  } else {
    console.warn('Invalid characters for Code39');
  }
};
```

### Empty or Null Value

**Issue:** Barcode fails to render with empty value.

**Solution:** Provide default value and validate:

```vue
<template>
  <ejs-barcodegenerator
    :type="barcodeType"
    :value="barcodeValue || 'NO-DATA'"
    width="200px"
    height="150px"
  ></ejs-barcodegenerator>
</template>
```

### Very Long Barcode Values

**Issue:** Extended data may make barcode unreadable.

**Solution:** Test readability with your scanner and adjust width if needed:

```vue
<template>
  <ejs-barcodegenerator
    :type="barcodeType"
    :value="longValue"
    :width="longValue.length > 20 ? '400px' : '200px'"
    height="150px"
    :displayText="{ visibility: true }"
  ></ejs-barcodegenerator>
</template>
```

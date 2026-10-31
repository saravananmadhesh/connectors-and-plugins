# Data Matrix Generator Component

The DataMatrixGenerator creates 2D Data Matrix barcodes for industrial applications, shipping labels, and high-capacity data encoding in Vue applications.

## Overview

Data Matrix is a 2D barcode technology that stores data in a grid of dark and light squares. It offers high data density and excellent error correction, making it ideal for small or damaged surfaces.

### Key Characteristics

- **Compact size:** Can store data in very small areas (e.g., electronics components)
- **High data density:** Encodes 100+ alphanumeric characters
- **Error correction:** Reed-Solomon error correction enables reading even with partial damage
- **Industrial use:** Standard in manufacturing, healthcare, aerospace, and logistics
- **Data types:** Numeric, alphanumeric, and byte (binary) data

## Component Basics

### Import and Register

**Composition API:**
```vue
<script setup>
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

**Options API:**
```javascript
import { DataMatrixGeneratorComponent } from '@syncfusion/ej2-vue-barcode-generator';

export default {
  components: {
    'ejs-datamatrixgenerator': DataMatrixGeneratorComponent
  }
}
```

## Basic Implementation

### Minimal Data Matrix

```vue
<template>
  <ejs-datamatrixgenerator
    id="datamatrix"
    value="SYNCFUSION2024"
    width="200px"
    height="200px"
  ></ejs-datamatrixgenerator>
</template>

<script setup>
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

### Data Matrix with SVG Rendering
### Data Matrix with Custom Color

```vue
<template>
  <ejs-datamatrixgenerator
    value="COLORFUL-DM"
    width="200px"
    height="200px"
    foreColor="red"
  ></ejs-datamatrixgenerator>
</template>

<script setup>
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

### Data Matrix with Custom Display Text

```vue
<template>
  <ejs-datamatrixgenerator
    value="DISPLAY-TEXT-EXAMPLE"
    width="200px"
    height="200px"
    :displayText="{ text: 'Custom Text Below' }"
  ></ejs-datamatrixgenerator>
</template>

<script setup>
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

```vue
<template>
  <ejs-datamatrixgenerator
    value="SHIPMENT-DOC-2024-001"
    width="250px"
    height="250px"
    mode="SVG"
  ></ejs-datamatrixgenerator>
</template>

<script setup>
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

## Data Matrix Sizes and Capacity

Data Matrix supports various sizes with corresponding data capacities:

| Size | Modules | Numeric | Alphanumeric | Byte |
|------|---------|---------|--------------|------|
| 10×10 | 10×10 | 6 | 3 | 2 |
| 12×12 | 12×12 | 10 | 6 | 4 |
| 14×14 | 14×14 | 16 | 10 | 7 |
| 16×16 | 16×16 | 24 | 16 | 11 |
| 26×26 | 26×26 | 90 | 60 | 40 |
| 32×32 | 32×32 | 180 | 120 | 84 |
| 36×36 | 36×36 | 240 | 160 | 112 |

Component automatically selects appropriate size for data.

## Data Encoding

### Product Identification

```vue
<template>
  <ejs-datamatrixgenerator
    id="productDM"
    value="PROD-2024-ABC123-001"
    width="200px"
    height="200px"
  ></ejs-datamatrixgenerator>
</template>

<script setup>
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';
</script>
```

### Shipment and Logistics

```vue
<template>
  <div class="shipping-label">
    <h3>Shipping Label</h3>
    <ejs-datamatrixgenerator
      :value="shipmentCode"
      width="150px"
      height="150px"
    ></ejs-datamatrixgenerator>
    <p>{{ shipmentCode }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';

const shipmentCode = ref('SHIP-2024-001-USPS-TX');
</script>
```

### Healthcare and Pharmaceutical

```vue
<template>
  <ejs-datamatrixgenerator
    :value="medicineCode"
    width="180px"
    height="180px"
  ></ejs-datamatrixgenerator>
</template>

<script setup>
import { ref } from 'vue';
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';

// Pharmaceutical NDC code format
const medicineCode = ref('0069-4220-68');
</script>
```

## Dynamic Data Matrix Generation

### User Input Example

```vue
<template>
  <div class="dm-generator">
    <div class="input-section">
      <label>Enter Data:</label>
      <input 
        v-model="dmData" 
        placeholder="Enter data to encode"
        @input="updateDataMatrix"
      />
      <p class="info">Characters: {{ dmData.length }}</p>
    </div>
    <div class="dm-display">
      <ejs-datamatrixgenerator
        id="dynamicDM"
        :value="dmData || 'NO-DATA'"
        width="250px"
        height="250px"
        mode="SVG"
      ></ejs-datamatrixgenerator>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';

const dmData = ref('SYNCFUSION');

const updateDataMatrix = () => {
  console.log('Data Matrix updated:', dmData.value);
};
</script>

<style scoped>
  .dm-generator {
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

  .info {
    margin-top: 8px;
    color: #666;
    font-size: 14px;
  }

  .dm-display {
    display: flex;
    justify-content: center;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
  }
</style>
```

### Batch Data Matrix Generation

```vue
<template>
  <div class="dm-batch">
    <h2>Generated Data Matrix Codes</h2>
    <div class="batch-grid">
      <div v-for="item in itemList" :key="item.id" class="dm-card">
        <h4>{{ item.label }}</h4>
        <ejs-datamatrixgenerator
          :value="item.code"
          width="150px"
          height="150px"
        ></ejs-datamatrixgenerator>
        <p class="code-text">{{ item.code }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';

const itemList = ref([
  { id: 1, label: 'Item A', code: 'SKU-2024-001' },
  { id: 2, label: 'Item B', code: 'SKU-2024-002' },
  { id: 3, label: 'Item C', code: 'SKU-2024-003' },
  { id: 4, label: 'Item D', code: 'SKU-2024-004' }
]);
</script>

<style scoped>
  .batch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .dm-card {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
  }

  .code-text {
    margin-top: 10px;
    font-size: 12px;
    color: #666;
    word-break: break-all;
  }
</style>
```

## Props Reference

| Prop         | Type    | Default   | Description                                      |
|--------------|---------|-----------|--------------------------------------------------|
| `id`         | string  | -         | Unique component identifier                      |
| `value`      | string  | -         | **Required:** Data to encode                     |
| `width`      | string  | '100%'    | Component width                                  |
| `height`     | string  | '100px'   | Component height                                 |
| `mode`       | string  | 'SVG'     | Render mode ('SVG' or 'Canvas')                  |
| `foreColor`  | string  | '#000000' | Barcode color (CSS color value)                  |
| `displayText`| object  | -         | Customize text below barcode (`{ text: '' }`)     |

## Industrial Applications

### Manufacturing Component Labeling

```vue
<template>
  <div class="component-label">
    <h3>Component Serial</h3>
    <ejs-datamatrixgenerator
      :value="serialNumber"
      width="120px"
      height="120px"
    ></ejs-datamatrixgenerator>
    <p>{{ serialNumber }}</p>
    <p class="date">Date: {{ manufacturingDate }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DataMatrixGeneratorComponent as EjsDatamatrixgenerator } from '@syncfusion/ej2-vue-barcode-generator';

const serialNumber = ref('SN-2024-00001-AA');
const manufacturingDate = ref('2024-03-21');
</script>

<style scoped>
  .component-label {
    padding: 15px;
    border: 2px solid #333;
    text-align: center;
    font-family: monospace;
  }

  .date {
    font-size: 12px;
    margin-top: 8px;
  }
</style>
```

## Performance Considerations

### Large Data Handling

**Issue:** Data Matrix with large data sets may be slow to generate.

**Solution:** Limit data size or generate in batches:

```javascript
// Recommended maximum: 200 characters
const dmData = ref('SYNC-2024-001'); // ~13 characters, optimal

// For larger data, use chunking:
const generateInChunks = async (dataArray) => {
  for (const data of dataArray) {
    // Generate one at a time
    await new Promise(resolve => setTimeout(resolve, 10));
    // Process...
  }
};
```

### Canvas vs SVG Performance

**SVG:** Better for print and scaling, slightly slower rendering  
**Canvas:** Faster rendering, better for real-time updates

```vue
<template>
  <!-- Use Canvas for real-time updates -->
  <ejs-datamatrixgenerator
    :value="dynamicValue"
    width="200px"
    height="200px"
    mode="Canvas"
  ></ejs-datamatrixgenerator>

  <!-- Use SVG for print/export -->
  <ejs-datamatrixgenerator
    :value="staticValue"
    width="200px"
    height="200px"
    mode="SVG"
  ></ejs-datamatrixgenerator>
</template>
```

## Troubleshooting

### Data Too Large

**Issue:** Data exceeds maximum capacity for smallest size.

**Solution:** Component automatically increases size. If you need fixed dimensions, shorten data:

```javascript
const limitDataLength = (data, maxLength = 100) => {
  return data.substring(0, maxLength);
};
```

### Scanner Recognition Issues

**Solution:** Ensure adequate contrast and size:
- Minimum 8×8 modules (100px×100px recommended)
- High contrast background
- Avoid rotating or skewing the code
- Use SVG mode for print media

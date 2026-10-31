# Styling and Rendering Modes

SVG and Canvas modes provide different rendering characteristics for barcode components. Choose the right mode for your use case for optimal performance and quality.

## Rendering Modes

### SVG Mode

SVG (Scalable Vector Graphics) renders barcodes as vector graphics using the `<svg>` element.

**Advantages:**
- Scalable without quality loss
- Excellent for printing and PDFs
- Smaller file size for export
- Better for responsive designs
- Easy to manipulate with CSS/JavaScript

**Disadvantages:**
- Slightly slower initial rendering for large quantities
- Not ideal for real-time high-frequency updates

**Best for:**
- Print documents
- Web archives
- Scalable applications
- Export/download functionality
- Professional output

### Canvas Mode

Canvas renders barcodes as raster graphics using the `<canvas>` element.

**Advantages:**
- Faster initial rendering
- Better performance for real-time updates
- More efficient for large batches
- Good browser compatibility

**Disadvantages:**
- Fixed resolution (pixelated when scaled large)
- Larger file size for export
- Not ideal for print quality

**Best for:**
- Real-time data updates
- High-frequency barcode generation
- Performance-critical applications
- Screen display only

## Mode Selection

### Set Rendering Mode

```vue
<template>
  <div class="mode-demo">
    <!-- SVG Mode (Recommended) -->
    <div>
      <h3>SVG Mode (Vector)</h3>
      <ejs-qrcodegenerator
        id="barcode"
        ref="barcodeControl"
        :width="width"
        :height="height"
        :value="value"
        :mode="mode"
      ></ejs-qrcodegenerator>
    </div>

    <!-- Canvas Mode (Performance) -->
    <div>
      <h3>Canvas Mode (Raster)</h3>
      <ejs-qrcodegenerator
        id="barcode"
        ref="barcodeControl"
        :width="width"
        :height="height"
        :value="value"
        :mode="canvasMode"
      ></ejs-qrcodegenerator>
    </div>
  </div>
</template>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "200px";
const mode = "SVG";
const canvasMode = "Canvas";
const value = "https://www.example.com";
</script>
```

## Dimensions and Sizing

### Basic Sizing

```vue
<template>
  <div class="sizing-examples">
    <!-- Small Barcode -->
    <ejs-barcodegenerator
      id="barcode"
      ref="barcodeControl"
      :width="smallWidth"
      :height="smallHeight"
      :type="type"
      :value="smallValue"
      :mode="mode"
    ></ejs-barcodegenerator>

    <!-- Medium Barcode -->
    <ejs-barcodegenerator
      id="barcode"
      ref="barcodeControl"
      :width="mediumWidth"
      :height="mediumHeight"
      :type="type"
      :value="mediumValue"
      :mode="mode"
    ></ejs-barcodegenerator>

    <!-- Large Barcode -->
    <ejs-barcodegenerator
      id="barcode"
      ref="barcodeControl"
      :width="largeWidth"
      :height="largeHeight"
      :type="type"
      :value="largeValue"
      :mode="mode"
    ></ejs-barcodegenerator>
  </div>
</template>

<script setup>
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const smallWidth = "100px";
const smallHeight = "100px";
const mediumWidth = "200px";
const mediumHeight = "150px";
const largeWidth = "400px";
const largeHeight = "300px";
const type = "Code128";
const smallValue = "SMALL";
const mediumValue = "MEDIUM";
const largeValue = "LARGE";
const mode = "SVG";
</script>
```

### Responsive Sizing

Use percentage width for responsive layouts:

```vue
<template>
  <div class="responsive-container">
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
  .responsive-container {
    width: 100%;
    max-width: 400px;
    aspect-ratio: 1;
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

### Minimum Recommended Sizes

For optimal scanning and readability:

| Component | Minimum Width | Minimum Height | Recommended | Print Quality |
|-----------|--------------|-----------------|-------------|---------------|
| BarcodeGenerator | 100px | 80px | 200px | 300px |
| QRCodeGenerator | 100px | 100px | 200px | 300px |
| DataMatrixGenerator | 80px | 80px | 150px | 250px |

```javascript
// Recommended sizes for different purposes
const sizes = {
  screenDisplay: { width: "150px", height: "150px" },
  webEmbed: { width: "200px", height: "200px" },
  printLabel: { width: "300px", height: "300px" },
  invoice: { width: "100px", height: "100px" },
  productBox: { width: "250px", height: "250px" }
};
```

## CSS Styling

### Container Styling

```vue
<template>
  <div class="barcode-display">
    <ejs-barcodegenerator
      id="barcode"
      ref="barcodeControl"
      :width="width"
      :height="height"
      :type="type"
      :value="value"
      :mode="mode"
    ></ejs-barcodegenerator>
  </div>
</template>

<style scoped>
  .barcode-display {
    padding: 20px;
    border: 2px solid #333;
    border-radius: 8px;
    background: white;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
</style>

<script setup>
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "150px";
const type = "Code128";
const value = "STYLED-BARCODE";
const mode = "SVG";
</script>
```

### Grid Layout

```vue
<template>
  <div class="barcode-grid">
    <div v-for="item in items" :key="item.id" class="barcode-item">
      <h4>{{ item.name }}</h4>
      <ejs-barcodegenerator
        :id="'barcode-' + item.id"
        :type="barcodeType"
        :value="item.code"
        :width="width"
        :height="height"
        :mode="mode"
      ></ejs-barcodegenerator>
      <p>{{ item.code }}</p>
    </div>
  </div>
</template>

<style scoped>
  .barcode-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    padding: 20px;
  }

  .barcode-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .barcode-item h4 {
    margin: 0 0 10px 0;
    font-size: 14px;
  }

  .barcode-item p {
    margin: 10px 0 0 0;
    font-size: 12px;
    color: #666;
    word-break: break-all;
  }
</style>

<script setup>
import { ref } from 'vue';
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const barcodeType = ref('Code128');
const width = "150px";
const height = "120px";
const mode = "SVG";
const items = ref([
  { id: 1, name: 'Item A', code: 'PROD-001' },
  { id: 2, name: 'Item B', code: 'PROD-002' },
  { id: 3, name: 'Item C', code: 'PROD-003' }
]);
</script>
```

## Color and Appearance

### SVG Color Styling

For SVG barcodes, you can apply CSS styling to the container:

```vue
<template>
  <div class="custom-barcode">
    <ejs-barcodegenerator
      id="barcode"
      ref="barcodeControl"
      :width="width"
      :height="height"
      :type="type"
      :value="value"
      :mode="mode"
    ></ejs-barcodegenerator>
  </div>
</template>

<style scoped>
  .custom-barcode {
    background: linear-gradient(to bottom, #f0f0f0, #ffffff);
    padding: 20px;
    border: 2px solid #333;
    border-radius: 8px;
    display: inline-block;
  }
</style>

<script setup>
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "150px";
const type = "Code128";
const value = "CUSTOM-BARCODE";
const mode = "SVG";
</script>
```

### Dark Mode Support

```vue
<template>
  <div :class="['barcode-container', { 'dark-mode': isDarkMode }]">
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
  .barcode-container {
    padding: 30px;
    background: white;
    border-radius: 8px;
    transition: background-color 0.3s;
  }

  .barcode-container.dark-mode {
    background: #1e1e1e;
  }
</style>

<script setup>
import { ref } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "200px";
const height = "200px";
const mode = "SVG";
const value = "https://www.example.com";
const isDarkMode = ref(false);
</script>
```

## Print Styling

### Print-Optimized Barcode

```vue
<template>
  <div class="print-section">
    <h1 class="no-print">Product Label</h1>
    <div class="label">
      <h2>{{ productName }}</h2>
      <ejs-barcodegenerator
        id="barcode"
        ref="barcodeControl"
        :width="width"
        :height="height"
        :type="barcodeType"
        :value="barcode"
        :mode="mode"
      ></ejs-barcodegenerator>
      <p class="barcode-text">{{ barcode }}</p>
      <p class="date">Date: {{ currentDate }}</p>
    </div>
    <button @click="print" class="no-print">Print Label</button>
  </div>
</template>

<style scoped>
  .label {
    width: 4in;
    height: 6in;
    padding: 0.25in;
    border: 1px solid #999;
    text-align: center;
    page-break-after: avoid;
    background: white;
  }

  .no-print {
    display: block;
  }

  .barcode-text {
    font-family: monospace;
    font-size: 12px;
    margin-top: 10px;
  }

  .date {
    font-size: 10px;
    color: #666;
    margin-top: 5px;
  }

  @media print {
    .no-print {
      display: none;
    }

    body {
      margin: 0;
      padding: 0;
    }

    .label {
      margin: 0;
      border: none;
      box-shadow: none;
    }
  }
</style>

<script setup>
import { ref } from 'vue';
import { BarcodeGeneratorComponent as EjsBarcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const productName = ref('Premium Widget');
const barcode = ref('PROD-2024-001');
const barcodeType = ref('Code128');
const width = "250px";
const height = "200px";
const mode = "SVG";
const currentDate = ref(new Date().toLocaleDateString());

const print = () => {
  window.print();
};
</script>
```

## Responsive Design

### Mobile-Friendly Barcodes

```vue
<template>
  <div class="responsive-barcode-container">
    <h1>Scan Barcode</h1>
    <div class="barcode-wrapper">
      <ejs-qrcodegenerator
        id="barcode"
        ref="barcodeControl"
        :width="width"
        :height="height"
        :value="value"
        :mode="mode"
      ></ejs-qrcodegenerator>
    </div>
    <p>Point camera at barcode to scan</p>
  </div>
</template>

<style scoped>
  .responsive-barcode-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  .barcode-wrapper {
    width: 100%;
    max-width: 400px;
    margin: 30px auto;
    aspect-ratio: 1;
    padding: 20px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    .barcode-wrapper {
      max-width: 100%;
      padding: 15px;
    }
  }
</style>

<script setup>
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const width = "100%";
const height = "300px";
const mode = "SVG";
const value = "https://m.example.com/product";
</script>
```

## Performance Optimization

### SVG vs Canvas Comparison

```vue
<template>
  <div class="performance-demo">
    <h2>Rendering Performance</h2>
    
    <div class="benchmark">
      <div class="svg-batch">
        <h3>SVG Mode ({{ svgCount }} codes)</h3>
        <div class="batch-container">
          <ejs-qrcodegenerator
            v-for="i in displayCount"
            :key="`svg-${i}`"
            :id="`barcode-svg-${i}`"
            :width="width"
            :height="height"
            :value="`SVG-CODE-${i}`"
            :mode="svgMode"
          ></ejs-qrcodegenerator>
        </div>
        <p>Render time: {{ svgRenderTime }}ms</p>
      </div>

      <div class="canvas-batch">
        <h3>Canvas Mode ({{ canvasCount }} codes)</h3>
        <div class="batch-container">
          <ejs-qrcodegenerator
            v-for="i in displayCount"
            :key="`canvas-${i}`"
            :id="`barcode-canvas-${i}`"
            :width="width"
            :height="height"
            :value="`CANVAS-CODE-${i}`"
            :mode="canvasMode"
          ></ejs-qrcodegenerator>
        </div>
        <p>Render time: {{ canvasRenderTime }}ms</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .benchmark {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-top: 30px;
  }

  .svg-batch, .canvas-batch {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
  }

  .batch-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    gap: 10px;
    margin: 20px 0;
  }

  p {
    font-weight: 600;
    color: #0078d4;
  }
</style>

<script setup>
import { ref, onMounted } from 'vue';
import { QRCodeGeneratorComponent as EjsQrcodegenerator } from '@syncfusion/ej2-vue-barcode-generator';

const svgCount = ref(10);
const canvasCount = ref(10);
const displayCount = ref(5);
const svgRenderTime = ref(0);
const canvasRenderTime = ref(0);
const width = "80px";
const height = "80px";
const svgMode = "SVG";
const canvasMode = "Canvas";

onMounted(() => {
  // Simulate rendering times (in real scenario, measure actual render times)
  svgRenderTime.value = 45;
  canvasRenderTime.value = 28;
});
</script>
```

## Best Practices

1. **Use SVG for:** Print, PDF export, scaling, archival
2. **Use Canvas for:** Real-time updates, high-frequency generation, screen-only display
3. **Sizes:** Minimum 100px for QR codes, 150px for printing
4. **Color:** Ensure high contrast (dark barcodes on light backgrounds)
5. **Testing:** Test barcode scanability with actual scanners
6. **Whitespace:** Leave at least 10% margin around barcode (quiet zone)

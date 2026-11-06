# Fine-Tuning Adjustments

## Overview

Fine-tuning allows precise control over image properties to achieve specific desired effects. Unlike filters which apply preset effects, fine-tuning lets you adjust individual parameters.

## Brightness Adjustment

Increase or decrease image brightness:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Increase brightness by 30 units
imageEditor.finetuneImage('Brightness', 30);

// Decrease brightness by 20 units
imageEditor.finetuneImage('Brightness', -20);

// Reset brightness (value 0)
imageEditor.finetuneImage('Brightness', 0);
```

**Brightness Range:** Typically -100 to +100
- **Negative values:** Darken the image
- **Positive values:** Brighten the image
- **Zero:** Original brightness

## Contrast Adjustment

Modify the difference between light and dark areas:

```javascript
// Increase contrast (make darks darker, lights lighter)
imageEditor.finetuneImage('Contrast', 25);

// Decrease contrast (flatten the image)
imageEditor.finetuneImage('Contrast', -25);

// Reset contrast
imageEditor.finetuneImage('Contrast', 0);
```

**Contrast Range:** Typically -100 to +100
- **Low contrast:** Muted, flat appearance
- **High contrast:** Dramatic, punchy appearance
- **Zero:** Original contrast

## Saturation Adjustment

Control color intensity and vibrancy:

```javascript
// Increase saturation (more vivid colors)
imageEditor.finetuneImage('Saturation', 40);

// Decrease saturation (more muted colors)
imageEditor.finetuneImage('Saturation', -40);

// Set to very negative for near-grayscale
imageEditor.finetuneImage('Saturation', -100);

// Reset saturation
imageEditor.finetuneImage('Saturation', 0);
```

**Saturation Range:** Typically -100 to +100
- **Highly negative:** Grayscale effect
- **Highly positive:** Over-saturated, vivid
- **Zero:** Original saturation

## Hue Adjustment

Shift colors around the color wheel:

```javascript
// Shift hue (rotate colors on color wheel)
imageEditor.finetuneImage('Hue', 30);
```

**Hue Range:** Typically -180 to +180
- Shifts the color palette without changing brightness or saturation

## Opacity Adjustment

Control overall image transparency:

```javascript
// Reduce opacity (make more transparent)
imageEditor.finetuneImage('Opacity', 50);

// Reset opacity to full (100)
imageEditor.finetuneImage('Opacity', 100);
```

## Advanced Fine-Tuning Options

### Blur

Apply blur effect:

```javascript
imageEditor.finetuneImage('Blur', 5);
```

### Sharpen

Enhance edges and details:

```javascript
imageEditor.finetuneImage('Sharpen', 3);
```

### Exposure

Adjust overall exposure:

```javascript
// Increase exposure (brighter overall)
imageEditor.finetuneImage('Exposure', 20);

// Decrease exposure (darker overall)
imageEditor.finetuneImage('Exposure', -20);
```

## Combining Adjustments

Apply multiple fine-tuning adjustments sequentially:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// 1. Increase brightness
imageEditor.finetuneImage('Brightness', 20);

// 2. Increase contrast
imageEditor.finetuneImage('Contrast', 15);

// 3. Increase saturation
imageEditor.finetuneImage('Saturation', 25);

// Result: Brighter, more contrasty, more vivid image
```

## Real-Time Adjustment Example

```vue
<template>
  <div>
    <div>
      <label>
        Brightness: {{ brightness }}
        <input v-model.number="brightness" type="range" min="-100" max="100" @change="applyAdjustments">
      </label>
      <label>
        Contrast: {{ contrast }}
        <input v-model.number="contrast" type="range" min="-100" max="100" @change="applyAdjustments">
      </label>
      <label>
        Saturation: {{ saturation }}
        <input v-model.number="saturation" type="range" min="-100" max="100" @change="applyAdjustments">
      </label>
      <button @click="resetAdjustments">Reset All</button>
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px" 
      width="100%"
      :created="onCreated"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);
const brightness = ref(0);
const contrast = ref(0);
const saturation = ref(0);

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const applyAdjustments = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  
  // Reset to original first
  imageEditor.reset();
  
  // Apply adjustments
  if (brightness.value !== 0) {
    imageEditor.finetuneImage('Brightness', brightness.value);
  }
  if (contrast.value !== 0) {
    imageEditor.finetuneImage('Contrast', contrast.value);
  }
  if (saturation.value !== 0) {
    imageEditor.finetuneImage('Saturation', saturation.value);
  }
};

const resetAdjustments = () => {
  brightness.value = 0;
  contrast.value = 0;
  saturation.value = 0;
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.reset();
};
</script>

<style>
label {
  display: block;
  margin: 10px 0;
}

input[type="range"] {
  width: 300px;
  margin-left: 10px;
}
</style>
```

## Complete Fine-Tune Example with Presets

```vue
<template>
  <div>
    <div>
      <button @click="applyPreset('brightened')">Brightened</button>
      <button @click="applyPreset('highcontrast')">High Contrast</button>
      <button @click="applyPreset('vibrant')">Vibrant</button>
      <button @click="applyPreset('muted')">Muted</button>
      <button @click="applyPreset('overexposed')">Overexposed</button>
      <button @click="resetAll">Reset</button>
    </div>
    <ejs-imageeditor ref="imageEditorObj" height="500px" width="100%"></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);

const presets = {
  brightened: [
    { type: 'Brightness', value: 30 }
  ],
  highcontrast: [
    { type: 'Contrast', value: 50 },
    { type: 'Brightness', value: 10 }
  ],
  vibrant: [
    { type: 'Saturation', value: 40 },
    { type: 'Contrast', value: 15 }
  ],
  muted: [
    { type: 'Saturation', value: -30 },
    { type: 'Brightness', value: 10 }
  ],
  overexposed: [
    { type: 'Brightness', value: 50 },
    { type: 'Saturation', value: -20 }
  ]
};

const applyPreset = (presetName) => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.reset();
  
  const adjustments = presets[presetName] || [];
  adjustments.forEach(adj => {
    imageEditor.finetuneImage(adj.type, adj.value);
  });
};

const resetAll = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.reset();
};
</script>

<style>
button {
  margin: 5px;
  padding: 8px 12px;
}
</style>
```

## Adjustment Value Ranges

| Adjustment | Min | Max | Default | Effect |
|-----------|-----|-----|---------|--------|
| **Brightness** | -100 | +100 | 0 | Darken/Lighten |
| **Contrast** | -100 | +100 | 0 | Flatten/Punch |
| **Saturation** | -100 | +100 | 0 | Grayscale/Vivid |
| **Hue** | -180 | +180 | 0 | Color shift |
| **Blur** | 0 | 20 | 0 | Sharpness reduction |
| **Sharpen** | 0 | 10 | 0 | Edge enhancement |
| **Exposure** | -100 | +100 | 0 | Overall brightness |

## History and Undo

All fine-tuning adjustments are tracked:

```javascript
// Apply adjustment
imageEditor.finetuneImage('Brightness', 30);

// Undo adjustment
imageEditor.undo();

// Redo adjustment
imageEditor.redo();
```

## Best Practices

1. **Start with resets:** Always reset before applying new adjustments
2. **Preview:** View results before finalizing
3. **Moderation:** Use moderate values for natural results
4. **Order:** Brightness before contrast usually gives better results
5. **Combine wisely:** Extreme values on multiple adjustments can degrade quality

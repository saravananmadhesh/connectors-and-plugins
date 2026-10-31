# Filters and Effects

## Available Filters

The Image Editor includes predefined filters for common image enhancements:

| Filter | Effect | Use Case |
|--------|--------|----------|
| **Chrome** | Bright, vivid colors | Modern, energetic look |
| **Cold** | Cool blue tones | Winter, calm mood |
| **Warm** | Warm orange/yellow tones | Sunset, cozy feel |
| **Grayscale** | Black and white | Professional, classic |
| **Sepia** | Brown vintage tones | Retro, nostalgic look |
| **Invert** | Negative/inverted colors | Artistic, high contrast |

## Applying Filters

Use the `applyImageFilter()` method with the filter type:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Apply Chrome filter
imageEditor.applyImageFilter('Chrome');

// Apply Cold filter
imageEditor.applyImageFilter('Cold');

// Apply Warm filter
imageEditor.applyImageFilter('Warm');

// Apply Grayscale filter
imageEditor.applyImageFilter('Grayscale');

// Apply Sepia filter
imageEditor.applyImageFilter('Sepia');

// Apply Invert filter
imageEditor.applyImageFilter('Invert');
```

## Filter Parameters

Pass filter options as the first parameter:

```javascript
import { ImageFilterOption } from "@syncfusion/ej2-vue-image-editor";

const imageEditor = imageEditorObj.value?.ej2Instances;

// Using ImageFilterOption enum
imageEditor.applyImageFilter(ImageFilterOption.Chrome);
imageEditor.applyImageFilter(ImageFilterOption.Cold);
imageEditor.applyImageFilter(ImageFilterOption.Warm);
imageEditor.applyImageFilter(ImageFilterOption.Grayscale);
imageEditor.applyImageFilter(ImageFilterOption.Sepia);
imageEditor.applyImageFilter(ImageFilterOption.Invert);
```

## Filter Examples

### Chrome Filter (Vivid Enhancement)

```javascript
imageEditor.applyImageFilter('Chrome');
```

**Result:** Increases saturation and vibrancy, making colors pop.

### Cold Filter (Blue Tones)

```javascript
imageEditor.applyImageFilter('Cold');
```

**Result:** Adds cool blue tones, creates calm/cool atmosphere.

### Warm Filter (Orange/Yellow Tones)

```javascript
imageEditor.applyImageFilter('Warm');
```

**Result:** Adds warm orange/yellow tones, creates cozy/sunset feel.

### Grayscale Filter (Black & White)

```javascript
imageEditor.applyImageFilter('Grayscale');
```

**Result:** Converts image to black and white, removes all color.

### Sepia Filter (Vintage)

```javascript
imageEditor.applyImageFilter('Sepia');
```

**Result:** Applies brown vintage tones, creates nostalgic look.

### Invert Filter (Negative)

```javascript
imageEditor.applyImageFilter('Invert');
```

**Result:** Inverts all colors (like a photo negative).

## Combining Filters

Apply multiple filters sequentially:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// 1. Apply Chrome first
imageEditor.applyImageFilter('Chrome');

// 2. Then convert to Grayscale
imageEditor.applyImageFilter('Grayscale');

// Note: Filters are cumulative but applying the same
// filter twice or different color filters will override
```

**Important:** Applying two color-based filters sequentially may override the first one. For complex effects, combine filters with fine-tuning adjustments.

## Resetting Filters

### Reset to Original

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Reload the original image
imageEditor.reset();
```

### Using Undo

If you want to undo the last filter application:

```javascript
imageEditor.undo();
```

## Complete Filter Example

```vue
<template>
  <div>
    <div>
      <button @click="applyChrome">Chrome</button>
      <button @click="applyCold">Cold</button>
      <button @click="applyWarm">Warm</button>
      <button @click="applyGrayscale">Grayscale</button>
      <button @click="applySepia">Sepia</button>
      <button @click="applyInvert">Invert</button>
      <button @click="resetFilter">Reset</button>
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px" 
      width="100%"
      :toolbar="['Filter', 'Undo', 'Redo']"
      :created="onCreated"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const applyChrome = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.applyImageFilter('Chrome');
};

const applyCold = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.applyImageFilter('Cold');
};

const applyWarm = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.applyImageFilter('Warm');
};

const applyGrayscale = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.applyImageFilter('Grayscale');
};

const applySepia = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.applyImageFilter('Sepia');
};

const applyInvert = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.applyImageFilter('Invert');
};

const resetFilter = () => {
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

## Filter Toolbar Integration

The toolbar provides built-in filter access:

```vue
<template>
  <ejs-imageeditor
    :toolbar="['Filter', 'Undo', 'Redo']"
  ></ejs-imageeditor>
</template>
```

When users click "Filter", a menu appears with all filter options.

## Filter + Fine-Tuning Combination

Combine filters with adjustments for better control:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// 1. Apply Sepia for vintage look
imageEditor.applyImageFilter('Sepia');

// 2. Increase brightness for clarity
imageEditor.finetuneImage('Brightness', 20);

// 3. Reduce saturation for muted tones
imageEditor.finetuneImage('Saturation', -15);
```

## Filter History

All filter applications are tracked in undo/redo history (16-step limit):

```javascript
// Apply filter
imageEditor.applyImageFilter('Sepia');

// Undo filter
imageEditor.undo();

// Redo filter
imageEditor.redo();
```

## Best Practices

1. **Preview before saving:** Always preview filter results before exporting
2. **Combine wisely:** Filters + fine-tuning create professional results
3. **Undo/Redo:** Use history to experiment with different filters
4. **Performance:** Filters are applied instantly without re-encoding
5. **Accessibility:** Provide alternative to color-based filters (add text labels)

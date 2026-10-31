# Signature API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundColor` | string | '#FFFFFF' | Canvas background color |
| `strokeColor` | string | '#000000' | Stroke/drawing color |
| `lineWidth` | number | 2 | Stroke width |
| `lineWidthRange` | array | [1, 3] | Min and max line width |
| `saveWithBackground` | boolean | false | Include background in saved image |
| `readonly` | boolean | false | Prevent drawing |
| `disabled` | boolean | false | Disable component |
| `width` | string \| number | '100%' | Canvas width |
| `height` | string \| number | '200px' | Canvas height |
| `cssClass` | string | - | Custom CSS class |
| `enableRtl` | boolean | false | Enable RTL mode |

---

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `save()` | - | string | Save signature as image URL |
| `getSignature()` | - | string | Get signature as data URL |
| `clear()` | - | void | Clear the canvas |
| `isEmpty()` | - | boolean | Check if signature is empty |
| `setBackgroundColor(color)` | string | void | Set background color |
| `setStrokeColor(color)` | string | void | Set stroke color |
| `setLineWidth(width)` | number | void | Set line width |
| `undo()` | - | void | Undo last stroke |
| `redo()` | - | void | Redo last stroke |

---

## Events

```typescript
// When signature changes
onChange = (args: ChangeEventArgs) => {
  console.log('Signature changed');
};

// When user starts drawing
onBeginDraw = () => {
  console.log('Drawing started');
};

// When user stops drawing
onEndDraw = (args: EndDrawEventArgs) => {
  console.log('Drawing ended');
};

// When signature is cleared
onClear = () => {
  console.log('Signature cleared');
};
```

---

## Complete Example

```vue
<template>
  <div class="signature-demo">
    <div class="form-section">
      <h2>Signature Capture</h2>

      <!-- Signature Pad -->
      <SignatureComponent
        ref="signaturePad"
        :backgroundColor="'#FFFFFF'"
        :strokeColor="drawColor"
        :lineWidth="lineWidth"
        :width="'100%'"
        :height="'300px'"
        @change="onSignatureChange"
        @endDraw="onEndDraw"
        @clear="onClear"
      />

      <!-- Controls -->
      <div class="controls">
        <div class="control-group">
          <label>Line Width:</label>
          <RangeSliderComponent
            v-model="lineWidthRange"
            :min="1"
            :max="10"
            @change="updateLineWidth"
          />
          <span>{{ lineWidth }}px</span>
        </div>

        <div class="control-group">
          <label>Pen Color:</label>
          <ColorPickerComponent
            v-model="drawColor"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="actions">
        <button @click="clearSignature">Clear</button>
        <button @click="undoStroke">Undo</button>
        <button @click="redoStroke">Redo</button>
        <button @click="saveSignature" :disabled="isEmpty">
          Save Signature
        </button>
      </div>

      <!-- Preview -->
      <div v-if="signatureImage" class="preview">
        <h3>Signature Preview</h3>
        <img :src="signatureImage" alt="Signature" />
      </div>

      <!-- Status -->
      <div v-if="saveSuccess" class="success-message">
        Signature saved successfully!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import {
  SignatureComponent,
  RangeSliderComponent,
  ColorPickerComponent
} from '@syncfusion/ej2-vue-inputs';

const signaturePad = ref(null);
const signatureImage = ref('');
const isEmpty = ref(true);
const saveSuccess = ref(false);
const drawColor = ref('#000000');
const lineWidthRange = ref([2]);
const lineWidth = ref(2);

const onSignatureChange = () => {
  console.log('Signature changed');
};

const onEndDraw = () => {
  const isEmptyNow = signaturePad.value?.isEmpty();
  isEmpty.value = isEmptyNow;
};

const onClear = () => {
  isEmpty.value = true;
  signatureImage.value = '';
};

const updateLineWidth = (args) => {
  lineWidth.value = args.value[0];
  signaturePad.value?.setLineWidth(lineWidth.value);
};

const clearSignature = () => {
  signaturePad.value?.clear();
  isEmpty.value = true;
};

const undoStroke = () => {
  signaturePad.value?.undo();
};

const redoStroke = () => {
  signaturePad.value?.redo();
};

const saveSignature = async () => {
  try {
    const dataUrl = signaturePad.value?.getSignature();
    signatureImage.value = dataUrl;

    // Send to server
    const response = await fetch('/api/signatures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signature: dataUrl })
    });

    if (response.ok) {
      saveSuccess.value = true;
      setTimeout(() => {
        saveSuccess.value = false;
      }, 3000);
    }
  } catch (error) {
    console.error('Error saving signature:', error);
  }
};
</script>

<style scoped>
.signature-demo {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.form-section {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0 0 30px 0;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

button {
  flex: 1;
  min-width: 100px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.preview {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.preview h3 {
  margin: 0 0 15px 0;
}

.preview img {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  padding: 10px;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
}

@media (max-width: 600px) {
  .controls {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
  }

  button {
    min-width: auto;
  }
}
</style>
```


# ColorPicker API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | string | '#000000' | Color value (hex format) |
| `mode` | string | 'Palette' | Color selection mode: 'Palette' or 'Gradient' |
| `modeSwitcher` | boolean | false | Allow switching between modes |
| `inline` | boolean | false | Inline color picker |
| `showButtons` | boolean | true | Show OK and Cancel buttons |
| `presetColors` | array | - | Predefined color palette |
| `columns` | number | 10 | Columns in color palette |
| `opacity` | boolean | false | Enable opacity/alpha channel |
| `disabled` | boolean | false | Disable the component |
| `cssClass` | string | - | Custom CSS class |
| `enableRtl` | boolean | false | Enable RTL mode |

---

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getValue()` | - | string | Get current color value |
| `setValue(value)` | string | void | Set color value |
| `open()` | - | void | Open color picker |
| `close()` | - | void | Close color picker |
| `refresh()` | - | void | Refresh component |
| `destroy()` | - | void | Destroy component |

---

## Events

```typescript
onChange = (args: ChangeEventArgs) => {
  console.log(args.value);        // New color
  console.log(args.previousValue); // Previous color
  console.log(args.hex);          // Hex value
  console.log(args.rgba);         // RGBA value
};

onOpen = () => {
  console.log('ColorPicker opened');
};

onClose = () => {
  console.log('ColorPicker closed');
};
```

---

## Complete Example

```vue
<template>
  <div class="colorpicker-demo">
    <div class="picker-section">
      <label>Select Color:</label>
      <ColorPickerComponent
        v-model="selectedColor"
        :mode="'Palette'"
        :inline="false"
        :showButtons="true"
        @change="onColorChange"
      />
    </div>

    <div class="preview" :style="{ backgroundColor: selectedColor }">
      Preview
    </div>

    <div class="color-info">
      <p>Color: {{ selectedColor }}</p>
      <p>RGB: {{ hexToRgb(selectedColor) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

const selectedColor = ref('#FF5733');

const onColorChange = (args) => {
  console.log('Color changed to:', args.value);
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'Invalid';
};
</script>

<style scoped>
.colorpicker-demo {
  padding: 20px;
}

.picker-section {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}

.preview {
  width: 200px;
  height: 150px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
```


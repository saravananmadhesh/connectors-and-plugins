# Modes and Value — Syncfusion Vue ColorPicker

## Table of Contents
- [Color Modes](#color-modes)
- [Getting and Setting Color Value](#getting-and-setting-color-value)
- [Color Formats](#color-formats)
- [Mode Switching](#mode-switching)
- [Examples](#examples)

---

## Color Modes

The ColorPicker supports multiple color modes:

| Mode | Format | Example |
|------|--------|---------|
| **Palette** | Predefined colors | Classic color palette |
| **Gradient** | Linear/Radial gradients | Smooth color transitions |
| **Picker** | RGB/HSV selector | Precise color selection |

### Palette Mode

```vue
<template>
  <div>
    <ejs-colorpicker
      mode="Palette"
      :show-buttons="true">
    </ejs-colorpicker>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  }
}
</script>
```

### Gradient Mode

```vue
<template>
  <div>
    <ejs-colorpicker
      mode="Gradient"
      :show-buttons="true">
    </ejs-colorpicker>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  }
}
</script>
```

### Picker Mode

```vue
<template>
  <div>
    <ejs-colorpicker
      mode="Picker"
      :show-buttons="true">
    </ejs-colorpicker>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  }
}
</script>
```

---

## Getting and Setting Color Value

Use the `value` property to get/set the selected color:

```vue
<template>
  <div>
    <div class="controls">
      <label>
        Color Hex:
        <input
          v-model="selectedColor"
          type="text"
          placeholder="#FF0000"
          @input="updateColor">
      </label>
    </div>

    <ejs-colorpicker
      :value="selectedColor"
      @change="onColorChange">
    </ejs-colorpicker>

    <div class="preview" :style="{ backgroundColor: selectedColor }"></div>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  },
  data() {
    return {
      selectedColor: '#ff0000'
    }
  },
  methods: {
    onColorChange(event) {
      this.selectedColor = event.value;
      console.log('Color changed:', event.value);
    },
    updateColor() {
      // Validate hex color format
      if (/^#[0-9A-F]{6}$/i.test(this.selectedColor)) {
        console.log('Valid color:', this.selectedColor);
      }
    }
  }
}
</script>

<style scoped>
.controls {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input {
  padding: 8px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.preview {
  width: 100px;
  height: 100px;
  margin-top: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
}
</style>
```

**Property:** `value` — `string`, hex color format (e.g., `#FF0000`)

---

## Color Formats

The ColorPicker can work with different color formats:

```vue
<template>
  <div class="format-demo">
    <div class="format-group">
      <h4>Hex Format</h4>
      <ejs-colorpicker value="#ff0000"></ejs-colorpicker>
      <p>Output: {{ hexValue }}</p>
    </div>

    <div class="format-group">
      <h4>RGB Format</h4>
      <ejs-colorpicker
        value="#ff0000"
        @change="updateRgb">
      </ejs-colorpicker>
      <p>Output: {{ rgbValue }}</p>
    </div>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  },
  data() {
    return {
      hexValue: '#ff0000',
      rgbValue: 'rgb(255, 0, 0)'
    }
  },
  methods: {
    updateRgb(event) {
      const hex = event.value;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      this.rgbValue = `rgb(${r}, ${g}, ${b})`;
      this.hexValue = hex;
    }
  }
}
</script>

<style scoped>
.format-demo {
  display: flex;
  gap: 30px;
}

.format-group {
  flex: 1;
}

p {
  margin-top: 10px;
  font-family: monospace;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
}
</style>
```

---

## Mode Switching

Allow users to switch between modes dynamically:

```vue
<template>
  <div>
    <div class="mode-selector">
      <button
        v-for="m in modes"
        :key="m"
        :class="{ active: currentMode === m }"
        @click="currentMode = m">
        {{ m }}
      </button>
    </div>

    <ejs-colorpicker
      :mode="currentMode"
      :show-buttons="true"
      @change="onColorChange">
    </ejs-colorpicker>

    <p>Selected Color: {{ selectedColor }}</p>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  },
  data() {
    return {
      modes: ['Palette', 'Gradient', 'Picker'],
      currentMode: 'Palette',
      selectedColor: '#ff0000'
    }
  },
  methods: {
    onColorChange(event) {
      this.selectedColor = event.value;
    }
  }
}
</script>

<style scoped>
.mode-selector {
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

button.active {
  background: #0078d4;
  color: white;
  border-color: #0078d4;
}

button:hover {
  border-color: #0078d4;
}

p {
  margin-top: 20px;
  font-weight: bold;
}
</style>
```

---

## Examples

### Complete Color Picker with Multiple Modes

```vue
<template>
  <div class="color-picker-demo">
    <h3>Advanced Color Picker</h3>
    
    <div class="picker-container">
      <ejs-colorpicker
        :mode="selectedMode"
        :value="selectedColor"
        :show-buttons="true"
        :allow-custom="true"
        @change="handleColorChange">
      </ejs-colorpicker>
    </div>

    <div class="color-info">
      <p><strong>Hex:</strong> {{ selectedColor }}</p>
      <p><strong>RGB:</strong> {{ rgbValue }}</p>
      <p><strong>Mode:</strong> {{ selectedMode }}</p>
    </div>

    <div class="preview" :style="{ backgroundColor: selectedColor }"></div>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  },
  data() {
    return {
      selectedColor: '#ff0000',
      selectedMode: 'Palette',
      rgbValue: 'rgb(255, 0, 0)'
    }
  },
  methods: {
    handleColorChange(event) {
      this.selectedColor = event.value;
      this.updateRgb();
    },
    updateRgb() {
      const hex = this.selectedColor;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      this.rgbValue = `rgb(${r}, ${g}, ${b})`;
    }
  }
}
</script>

<style scoped>
.color-picker-demo {
  padding: 20px;
}

.picker-container {
  margin: 20px 0;
}

.color-info {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
}

.color-info p {
  margin: 5px 0;
  font-family: monospace;
}

.preview {
  width: 150px;
  height: 150px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
}
</style>
```

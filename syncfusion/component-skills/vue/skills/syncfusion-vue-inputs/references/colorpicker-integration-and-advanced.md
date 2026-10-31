# Integration and Advanced — Syncfusion Vue ColorPicker

## Table of Contents
- [Form Integration](#form-integration)
- [Event Handling](#event-handling)
- [Two-Way Binding](#two-way-binding)
- [Advanced Patterns](#advanced-patterns)
- [Dynamic Color Swatches](#dynamic-color-swatches)

---

## Form Integration

Integrate ColorPicker with forms:

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="theme-color">Theme Color:</label>
      <ejs-colorpicker
        id="theme-color"
        v-model="formData.themeColor"
        :show-buttons="true"
        required>
      </ejs-colorpicker>
    </div>

    <div class="form-group">
      <label for="accent-color">Accent Color:</label>
      <ejs-colorpicker
        id="accent-color"
        v-model="formData.accentColor"
        :show-buttons="true">
      </ejs-colorpicker>
    </div>

    <button type="submit">Save Colors</button>
  </form>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  },
  data() {
    return {
      formData: {
        themeColor: '#0078d4',
        accentColor: '#107c10'
      }
    }
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.formData);
      // Send to server
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

button {
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background: #106ebe;
}
</style>
```

---

## Event Handling

Respond to color picker events:

```vue
<template>
  <div>
    <ejs-colorpicker
      @open="onOpen"
      @close="onClose"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      :show-buttons="true">
    </ejs-colorpicker>

    <div class="event-log">
      <h4>Event Log:</h4>
      <ul>
        <li v-for="(event, index) in events" :key="index">
          {{ event }}
        </li>
      </ul>
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
      events: []
    }
  },
  methods: {
    onOpen(event) {
      this.logEvent('Opened');
    },
    onClose(event) {
      this.logEvent('Closed');
    },
    onChange(event) {
      this.logEvent(`Color changed: ${event.value}`);
    },
    onFocus(event) {
      this.logEvent('Focused');
    },
    onBlur(event) {
      this.logEvent('Blurred');
    },
    logEvent(message) {
      const timestamp = new Date().toLocaleTimeString();
      this.events.unshift(`[${timestamp}] ${message}`);
      if (this.events.length > 10) {
        this.events.pop();
      }
    }
  }
}
</script>

<style scoped>
.event-log {
  margin-top: 30px;
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
}

.event-log ul {
  margin: 0;
  padding-left: 20px;
  max-height: 200px;
  overflow-y: auto;
}

.event-log li {
  margin: 5px 0;
  font-family: monospace;
  font-size: 12px;
}
</style>
```

---

## Two-Way Binding

Use `v-model` for reactive color binding:

```vue
<template>
  <div>
    <div class="binding-demo">
      <ejs-colorpicker v-model="selectedColor"></ejs-colorpicker>
      
      <div class="preview" :style="{ backgroundColor: selectedColor }"></div>
      
      <p>Current Color: {{ selectedColor }}</p>
      
      <button @click="resetColor">Reset Color</button>
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
      selectedColor: '#ff0000'
    }
  },
  methods: {
    resetColor() {
      this.selectedColor = '#ff0000';
    }
  }
}
</script>

<style scoped>
.binding-demo {
  padding: 20px;
}

.preview {
  width: 200px;
  height: 150px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

button {
  padding: 10px 20px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

---

## Advanced Patterns

### Color Converter Component

```vue
<template>
  <div class="color-converter">
    <h3>Color Format Converter</h3>
    
    <ejs-colorpicker
      v-model="hexColor"
      @change="updateFormats">
    </ejs-colorpicker>

    <div class="formats">
      <div class="format-box">
        <strong>HEX:</strong>
        <code>{{ hexColor }}</code>
      </div>
      <div class="format-box">
        <strong>RGB:</strong>
        <code>{{ rgbColor }}</code>
      </div>
      <div class="format-box">
        <strong>HSL:</strong>
        <code>{{ hslColor }}</code>
      </div>
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
      hexColor: '#ff0000',
      rgbColor: 'rgb(255, 0, 0)',
      hslColor: 'hsl(0, 100%, 50%)'
    }
  },
  methods: {
    updateFormats() {
      this.hexToRgb();
      this.hexToHsl();
    },
    hexToRgb() {
      const r = parseInt(this.hexColor.slice(1, 3), 16);
      const g = parseInt(this.hexColor.slice(3, 5), 16);
      const b = parseInt(this.hexColor.slice(5, 7), 16);
      this.rgbColor = `rgb(${r}, ${g}, ${b})`;
    },
    hexToHsl() {
      const r = parseInt(this.hexColor.slice(1, 3), 16) / 255;
      const g = parseInt(this.hexColor.slice(3, 5), 16) / 255;
      const b = parseInt(this.hexColor.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      this.hslColor = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }
  },
  mounted() {
    this.updateFormats();
  }
}
</script>

<style scoped>
.color-converter {
  padding: 20px;
}

.formats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.format-box {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
}

.format-box strong {
  display: block;
  margin-bottom: 10px;
  color: #333;
}

.format-box code {
  font-family: monospace;
  font-size: 14px;
  word-break: break-all;
}
</style>
```

---

## Dynamic Color Swatches

```vue
<template>
  <div class="dynamic-swatches">
    <h3>Dynamic Color Swatches</h3>
    
    <div class="swatch-manager">
      <button @click="addSwatch">+ Add Color</button>
      
      <div class="swatches">
        <div
          v-for="(swatch, index) in swatches"
          :key="index"
          class="swatch-item">
          <ejs-colorpicker
            v-model="swatch.color"
            mode="Palette">
          </ejs-colorpicker>
          <input v-model="swatch.name" type="text" placeholder="Color name">
          <button @click="removeSwatch(index)" class="remove-btn">×</button>
        </div>
      </div>
    </div>

    <div class="swatch-preview">
      <h4>Preview:</h4>
      <div class="preview-grid">
        <div
          v-for="swatch in swatches"
          :key="swatch.name"
          class="preview-item"
          :style="{ backgroundColor: swatch.color }">
          {{ swatch.name }}
        </div>
      </div>
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
      swatches: [
        { name: 'Primary', color: '#0078d4' },
        { name: 'Secondary', color: '#107c10' }
      ]
    }
  },
  methods: {
    addSwatch() {
      this.swatches.push({
        name: `Color ${this.swatches.length + 1}`,
        color: '#ff0000'
      });
    },
    removeSwatch(index) {
      this.swatches.splice(index, 1);
    }
  }
}
</script>

<style scoped>
.dynamic-swatches {
  padding: 20px;
}

.swatch-manager {
  margin-bottom: 30px;
}

button {
  padding: 10px 20px;
  margin-bottom: 15px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.swatch-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.remove-btn {
  width: 30px;
  height: 30px;
  padding: 0;
  background: #d83b01;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.swatch-preview {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 15px;
}

.preview-item {
  height: 80px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
</style>
```

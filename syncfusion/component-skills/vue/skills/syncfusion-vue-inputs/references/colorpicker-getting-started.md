# ColorPicker Getting Started - Vue 3

## Installation

```bash
npm install @syncfusion/ej2-vue-inputs @syncfusion/ej2-base
```

---

## Basic Setup

```vue
<template>
  <div class="colorpicker-container">
    <label>Select Color:</label>
    <ColorPickerComponent
      v-model="selectedColor"
      @change="onColorChange"
    />
    <div class="color-preview" :style="{ backgroundColor: selectedColor }"></div>
    <p>Selected: {{ selectedColor }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';
import "@syncfusion/ej2-material3-theme/styles/color-picker/index.css";

const selectedColor = ref('#FF0000');

const onColorChange = (args) => {
  console.log('Color changed to:', args.value);
};
</script>

<style scoped>
.color-preview {
  width: 100px;
  height: 100px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin: 10px 0;
}
</style>
```

---

## Quick Start

### Inline ColorPicker

```vue
<template>
  <ColorPickerComponent
    v-model="color"
    :inline="true"
    type="color"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

const color = ref('#007bff');
</script>
```

### Input Type ColorPicker

```vue
<template>
  <ColorPickerComponent
    v-model="color"
    type="input"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

const color = ref('#007bff');
</script>
```

---

## Modes

### Palette Mode

```vue
<template>
  <div>
    <h3>Palette Colors</h3>
    <ColorPickerComponent
      v-model="color"
      :mode="'Palette'"
      :presetColors="presetColors"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

const color = ref('#FF0000');

const presetColors = ref([
  '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF',
  '#000000', '#FFFFFF', '#808080'
]);
</script>
```

### Picker Mode

```vue
<template>
  <ColorPickerComponent
    v-model="color"
    :mode="'Picker'"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

const color = ref('#007bff');
</script>
```

---

## Complete Example: Theme Color Selector

```vue
<template>
  <div class="theme-selector">
    <h2>Select Theme Color</h2>

    <div class="color-options">
      <div
        v-for="color in themeColors"
        :key="color.id"
        class="color-option"
        :class="{ active: selectedTheme === color.id }"
        @click="selectTheme(color.id)"
      >
        <div
          class="color-swatch"
          :style="{ backgroundColor: color.hex }"
        ></div>
        <p>{{ color.name }}</p>
      </div>
    </div>

    <div class="custom-color">
      <label>Custom Color:</label>
      <ColorPickerComponent
        v-model="customColor"
        :mode="'Picker'"
        type="input"
      />
      <div class="preview" :style="{ backgroundColor: customColor }"></div>
    </div>

    <div class="actions">
      <button @click="applyTheme">Apply Theme</button>
      <button @click="resetTheme">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

const selectedTheme = ref(1);
const customColor = ref('#007bff');

const themeColors = ref([
  { id: 1, name: 'Blue', hex: '#007bff' },
  { id: 2, name: 'Green', hex: '#28a745' },
  { id: 3, name: 'Red', hex: '#dc3545' },
  { id: 4, name: 'Purple', hex: '#6f42c1' },
  { id: 5, name: 'Orange', hex: '#fd7e14' }
]);

const selectTheme = (id) => {
  selectedTheme.value = id;
  const theme = themeColors.value.find(t => t.id === id);
  customColor.value = theme.hex;
};

const applyTheme = () => {
  const theme = themeColors.value.find(t => t.id === selectedTheme.value);
  localStorage.setItem('themeColor', theme.hex);
  alert(`Theme applied: ${theme.name}`);
};

const resetTheme = () => {
  selectedTheme.value = 1;
  customColor.value = '#007bff';
  localStorage.removeItem('themeColor');
};
</script>

<style scoped>
.theme-selector {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
}

.color-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.color-option {
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.color-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.color-option.active {
  border: 3px solid #333;
  background-color: #f0f0f0;
}

.color-swatch {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin: 0 auto 10px;
  border: 1px solid #ddd;
}

.color-option p {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
}

.custom-color {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.custom-color label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}

.preview {
  width: 100%;
  height: 80px;
  border-radius: 4px;
  margin-top: 10px;
  border: 1px solid #ddd;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

button:first-child {
  background-color: #007bff;
  color: white;
}

button:first-child:hover {
  background-color: #0056b3;
}

button:last-child {
  background-color: #6c757d;
  color: white;
}

button:last-child:hover {
  background-color: #5a6268;
}
</style>
```

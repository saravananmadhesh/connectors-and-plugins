# Palette Features — Syncfusion Vue ColorPicker

## Table of Contents
- [Palette Overview](#palette-overview)
- [Predefined Palettes](#predefined-palettes)
- [Custom Palette](#custom-palette)
- [Palette with Columns](#palette-with-columns)
- [Examples](#examples)

---

## Palette Overview

The Palette mode displays a predefined grid of colors. Users can quickly select from commonly used colors.

---

## Predefined Palettes

The ColorPicker includes several built-in color palettes:

```vue
<template>
  <div>
    <div class="palette-selector">
      <button
        v-for="palette in palettes"
        :key="palette"
        :class="{ active: selectedPalette === palette }"
        @click="selectedPalette = palette">
        {{ palette }}
      </button>
    </div>

    <ejs-colorpicker
      mode="Palette"
      :palette="selectedPalette"
      :show-buttons="true">
    </ejs-colorpicker>
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
      palettes: ['material', 'bootstrap', 'fabric', 'tailwind'],
      selectedPalette: 'material'
    }
  }
}
</script>

<style scoped>
.palette-selector {
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
}
</style>
```

---

## Custom Palette

Create your own color palette:

```vue
<template>
  <div>
    <h3>Custom Color Palette</h3>
    
    <ejs-colorpicker
      mode="Palette"
      :palette="customColors"
      :show-buttons="true"
      @change="onColorChange">
    </ejs-colorpicker>

    <p>Selected: {{ selectedColor }}</p>
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
      selectedColor: '#FF0000',
      // Define custom colors
      customColors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']
    }
  },
  methods: {
    onColorChange(event) {
      this.selectedColor = event.value;
    }
  }
}
</script>
```

**Property:** `palette` — `string` or `string[]`

---

## Palette with Columns

Control how many color swatches appear per row:

```vue
<template>
  <div>
    <div class="column-selector">
      <label>
        Columns:
        <select v-model.number="columns">
          <option>4</option>
          <option>6</option>
          <option>8</option>
          <option>10</option>
        </select>
      </label>
    </div>

    <ejs-colorpicker
      mode="Palette"
      :columns="columns"
      :show-buttons="true"
      :palette="customColors">
    </ejs-colorpicker>
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
      columns: 6,
      customColors: [
        '#FF0000', '#FF7F00', '#FFFF00', '#00FF00',
        '#0000FF', '#4B0082', '#9400D3', '#FFB6C1',
        '#FFA500', '#00CED1', '#696969', '#C0C0C0'
      ]
    }
  }
}
</script>

<style scoped>
.column-selector {
  margin-bottom: 20px;
}

select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
```

**Property:** `columns` — `number`, default is `10`

---

## Examples

### Brand Color Palette

```vue
<template>
  <div class="brand-palette">
    <h3>Brand Color Picker</h3>
    
    <ejs-colorpicker
      mode="Palette"
      :palette="brandColors"
      :columns="5"
      :show-buttons="true"
      @change="handleBrandColorChange">
    </ejs-colorpicker>

    <div class="selected-color" :style="{ backgroundColor: selectedBrandColor }">
      <p>{{ selectedBrandColor }}</p>
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
      selectedBrandColor: '#0078D4',
      // Microsoft brand color palette
      brandColors: [
        '#0078D4', // Blue
        '#107C10', // Green
        '#FFB900', // Yellow
        '#D83B01', // Orange
        '#E81123', // Red
        '#AC193D', // Maroon
        '#5B4B8A', // Purple
        '#00B4EF', // Cyan
        '#00BCF2', // Light Blue
        '#5D00B7'  // Deep Purple
      ]
    }
  },
  methods: {
    handleBrandColorChange(event) {
      this.selectedBrandColor = event.value;
    }
  }
}
</script>

<style scoped>
.brand-palette {
  padding: 20px;
}

.selected-color {
  width: 200px;
  height: 100px;
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.selected-color p {
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
</style>
```

### Theme Color Selector

```vue
<template>
  <div class="theme-selector">
    <h3>Select Theme Colors</h3>
    
    <div class="theme-row">
      <label>Primary Color:</label>
      <ejs-colorpicker
        mode="Palette"
        :palette="themeColors"
        :columns="5"
        :show-buttons="true"
        @change="updatePrimaryColor">
      </ejs-colorpicker>
    </div>

    <div class="theme-row">
      <label>Secondary Color:</label>
      <ejs-colorpicker
        mode="Palette"
        :palette="themeColors"
        :columns="5"
        :show-buttons="true"
        @change="updateSecondaryColor">
      </ejs-colorpicker>
    </div>

    <div class="theme-preview">
      <div
        class="primary-box"
        :style="{ backgroundColor: primaryColor }">
        Primary
      </div>
      <div
        class="secondary-box"
        :style="{ backgroundColor: secondaryColor }">
        Secondary
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
      primaryColor: '#0078D4',
      secondaryColor: '#107C10',
      themeColors: [
        '#0078D4', '#107C10', '#FFB900', '#D83B01',
        '#E81123', '#AC193D', '#5B4B8A', '#00B4EF',
        '#00BCF2', '#5D00B7'
      ]
    }
  },
  methods: {
    updatePrimaryColor(event) {
      this.primaryColor = event.value;
    },
    updateSecondaryColor(event) {
      this.secondaryColor = event.value;
    }
  }
}
</script>

<style scoped>
.theme-selector {
  padding: 20px;
}

.theme-row {
  margin: 20px 0;
  display: flex;
  gap: 20px;
  align-items: center;
}

.theme-preview {
  margin-top: 40px;
  display: flex;
  gap: 20px;
}

.primary-box,
.secondary-box {
  width: 150px;
  height: 100px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
```

# UI Customization — Syncfusion Vue ColorPicker

## Table of Contents
- [Show/Hide UI Elements](#showhide-ui-elements)
- [Custom Buttons](#custom-buttons)
- [CSS Styling](#css-styling)
- [Input Field Customization](#input-field-customization)
- [Positioning](#positioning)

---

## Show/Hide UI Elements

Control which UI elements are displayed:

```vue
<template>
  <div>
    <div class="controls">
      <label>
        <input v-model="showButtons" type="checkbox">
        Show Buttons
      </label>
      <label>
        <input v-model="showPreview" type="checkbox">
        Show Preview
      </label>
      <label>
        <input v-model="showModeSwitch" type="checkbox">
        Show Mode Switch
      </label>
    </div>

    <ejs-colorpicker
      :show-buttons="showButtons"
      :show-preview="showPreview"
      :show-mode-switch="showModeSwitch"
      mode="Palette">
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
      showButtons: true,
      showPreview: true,
      showModeSwitch: true
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
  margin: 10px 0;
  cursor: pointer;
}

input[type="checkbox"] {
  margin-right: 10px;
}
</style>
```

**Properties:**
- `showButtons` — Display Apply/Cancel buttons
- `showPreview` — Display color preview
- `showModeSwitch` — Display mode switcher (Palette/Gradient/Picker)

---

## Custom Buttons

Customize button text and appearance:

```vue
<template>
  <div>
    <ejs-colorpicker
      :show-buttons="true"
      value="#ff0000"
      @change="onColorChange"
      @before-close="onBeforeClose">
      <template v-slot:buttons>
        <button class="custom-apply" @click="applyColor">Confirm</button>
        <button class="custom-cancel" @click="cancelColor">Discard</button>
      </template>
    </ejs-colorpicker>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  },
  methods: {
    onColorChange(event) {
      console.log('Color changed:', event.value);
    },
    onBeforeClose(event) {
      console.log('Color picker closing');
    },
    applyColor() {
      console.log('Color applied');
    },
    cancelColor() {
      console.log('Color canceled');
    }
  }
}
</script>

<style scoped>
.custom-apply,
.custom-cancel {
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.custom-apply {
  background-color: #0078d4;
  color: white;
}

.custom-cancel {
  background-color: #d83b01;
  color: white;
}

.custom-apply:hover {
  background-color: #106ebe;
}

.custom-cancel:hover {
  background-color: #a82e00;
}
</style>
```

---

## CSS Styling

Customize appearance with CSS classes:

```vue
<template>
  <div class="custom-colorpicker">
    <ejs-colorpicker
      mode="Palette"
      :show-buttons="true"
      css-class="e-custom-picker">
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

<style scoped>
.e-custom-picker {
  /* Customize picker container */
}

.e-custom-picker .e-preview {
  /* Customize preview area */
}

.e-custom-picker .e-palette {
  /* Customize palette area */
}

.e-custom-picker .e-color-tile {
  /* Customize individual color tiles */
  border-radius: 8px;
  margin: 2px;
}

.e-custom-picker .e-button {
  /* Customize buttons */
  border-radius: 4px;
}
</style>
```

---

## Input Field Customization

Customize the color input field:

```vue
<template>
  <div>
    <div class="input-wrapper">
      <label>Hex Color:</label>
      <ejs-colorpicker
        :value="hexColor"
        placeholder="Enter hex color"
        :show-buttons="true"
        @change="onColorChange">
      </ejs-colorpicker>
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
      hexColor: '#ff0000'
    }
  },
  methods: {
    onColorChange(event) {
      this.hexColor = event.value;
      console.log('Color:', event.value);
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.e-colorpicker {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
```

---

## Positioning

Control color picker popup position:

```vue
<template>
  <div>
    <div class="position-selector">
      <label>
        Position:
        <select v-model="popupPosition">
          <option>TopCenter</option>
          <option>TopLeft</option>
          <option>TopRight</option>
          <option>BottomCenter</option>
          <option>BottomLeft</option>
          <option>BottomRight</option>
        </select>
      </label>
    </div>

    <ejs-colorpicker
      :popup-position="popupPosition"
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
  },
  data() {
    return {
      popupPosition: 'BottomCenter'
    }
  }
}
</script>

<style scoped>
.position-selector {
  margin-bottom: 20px;
}

select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 10px;
}
</style>
```

**Property:** `popupPosition` — `string`
- `'TopCenter'` | `'TopLeft'` | `'TopRight'`
- `'BottomCenter'` | `'BottomLeft'` | `'BottomRight'`

---

## Complete Example

```vue
<template>
  <div class="advanced-colorpicker">
    <h3>Advanced Color Picker UI</h3>
    
    <div class="settings">
      <label>
        <input v-model="showButtons" type="checkbox">
        Show Apply/Cancel Buttons
      </label>
      <label>
        <input v-model="showPreview" type="checkbox">
        Show Color Preview
      </label>
      <label>
        <input v-model="showModeSwitch" type="checkbox">
        Show Mode Switcher
      </label>
    </div>

    <ejs-colorpicker
      :show-buttons="showButtons"
      :show-preview="showPreview"
      :show-mode-switch="showModeSwitch"
      mode="Palette"
      :columns="6"
      :popup-position="popupPosition"
      @change="handleColorChange">
    </ejs-colorpicker>

    <div class="info">
      <p><strong>Selected Color:</strong> {{ selectedColor }}</p>
      <div class="preview" :style="{ backgroundColor: selectedColor }"></div>
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
      showButtons: true,
      showPreview: true,
      showModeSwitch: true,
      popupPosition: 'BottomCenter',
      selectedColor: '#ff0000'
    }
  },
  methods: {
    handleColorChange(event) {
      this.selectedColor = event.value;
    }
  }
}
</script>

<style scoped>
.advanced-colorpicker {
  padding: 20px;
}

.settings {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.settings label {
  display: block;
  margin: 8px 0;
  cursor: pointer;
}

.info {
  margin-top: 30px;
}

.preview {
  width: 150px;
  height: 100px;
  margin-top: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
```

# Color Range — Syncfusion Vue Range Slider

## Table of Contents
- [Color Configuration](#color-configuration)
- [Track Color](#track-color)
- [Examples](#examples)

---

## Color Configuration

Configure colors for the range slider:

```vue
<template>
  <div class="color-config">
    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[30, 70]"
      css-class="color-range"
      placeholder="Color range">
    </ejs-rangeslider>
  </div>
</template>

<script>
import { RangeSliderComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-rangeslider': RangeSliderComponent
  }
}
</script>

<style scoped>
:deep(.e-rangeslider.color-range) {
  --track-color: #0078d4;
  --handle-color: #106ebe;
}
</style>
```

---

## Track Color

Customize track appearance:

```vue
<template>
  <div class="track-color-demo">
    <div class="example">
      <h4>Temperature Range</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[20, 30]"
        css-class="temp-range"
        placeholder="Temperature">
      </ejs-rangeslider>
    </div>

    <div class="example">
      <h4>Success Range (Green)</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[40, 80]"
        css-class="success-range"
        placeholder="Success">
      </ejs-rangeslider>
    </div>

    <div class="example">
      <h4>Warning Range (Orange)</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[30, 60]"
        css-class="warning-range"
        placeholder="Warning">
      </ejs-rangeslider>
    </div>

    <div class="example">
      <h4>Danger Range (Red)</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[20, 40]"
        css-class="danger-range"
        placeholder="Danger">
      </ejs-rangeslider>
    </div>
  </div>
</template>

<script>
import { RangeSliderComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-rangeslider': RangeSliderComponent
  }
}
</script>

<style scoped>
.track-color-demo {
  padding: 20px;
}

.example {
  margin-bottom: 30px;
}

.example h4 {
  margin-bottom: 12px;
}

:deep(.e-rangeslider.temp-range .e-range-active) {
  background: linear-gradient(to right, #4bb0f7, #ff6b9d);
}

:deep(.e-rangeslider.success-range .e-range-active) {
  background: #28a745;
}

:deep(.e-rangeslider.warning-range .e-range-active) {
  background: #ffc107;
}

:deep(.e-rangeslider.danger-range .e-range-active) {
  background: #dc3545;
}
</style>
```

---

## Examples

### Complete Color Customization Demo

```vue
<template>
  <div class="color-demo">
    <h3>Range Slider Color Configuration</h3>

    <div class="color-selector">
      <h4>Select Color Theme:</h4>
      <div class="color-buttons">
        <button
          v-for="color in colorThemes"
          :key="color.name"
          @click="selectedTheme = color.name"
          :class="{ active: selectedTheme === color.name }"
          :style="{ backgroundColor: color.primary }">
          {{ color.name }}
        </button>
      </div>
    </div>

    <div class="preview">
      <h4>Preview</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[30, 70]"
        :css-class="'slider-' + selectedTheme"
        placeholder="Range">
      </ejs-rangeslider>
      <p class="theme-info">
        Theme: {{ selectedTheme }} | Primary: {{ getCurrentTheme().primary }}
      </p>
    </div>

    <div class="examples">
      <h4>Use Cases</h4>

      <div class="use-case">
        <label>Price Filter (Primary):</label>
        <ejs-rangeslider
          :min="0"
          :max="1000"
          :value="[100, 900]"
          css-class="primary"
          placeholder="Price">
        </ejs-rangeslider>
      </div>

      <div class="use-case">
        <label>Success Metric (Green):</label>
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="[50, 100]"
          css-class="success"
          placeholder="Success">
        </ejs-rangeslider>
      </div>

      <div class="use-case">
        <label>Warning Zone (Orange):</label>
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="[40, 80]"
          css-class="warning"
          placeholder="Warning">
        </ejs-rangeslider>
      </div>

      <div class="use-case">
        <label>Critical Zone (Red):</label>
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="[10, 30]"
          css-class="danger"
          placeholder="Danger">
        </ejs-rangeslider>
      </div>
    </div>
  </div>
</template>

<script>
import { RangeSliderComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-rangeslider': RangeSliderComponent
  },
  data() {
    return {
      selectedTheme: 'primary',
      colorThemes: [
        { name: 'primary', primary: '#0078d4', secondary: '#106ebe' },
        { name: 'success', primary: '#28a745', secondary: '#1e7e34' },
        { name: 'danger', primary: '#dc3545', secondary: '#c82333' },
        { name: 'warning', primary: '#ffc107', secondary: '#e0a800' },
        { name: 'info', primary: '#17a2b8', secondary: '#138496' }
      ]
    }
  },
  methods: {
    getCurrentTheme() {
      return this.colorThemes.find(t => t.name === this.selectedTheme);
    }
  }
}
</script>

<style scoped>
.color-demo {
  padding: 20px;
  max-width: 600px;
}

.color-selector,
.preview,
.examples {
  margin-bottom: 30px;
}

h4 {
  margin: 15px 0;
}

.color-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

button.active {
  outline: 3px solid #333;
  outline-offset: 2px;
}

.theme-info {
  margin-top: 12px;
  font-size: 12px;
  color: #666;
}

.use-case {
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

:deep(.e-rangeslider.slider-primary .e-range-active) {
  background: #0078d4;
}

:deep(.e-rangeslider.slider-success .e-range-active) {
  background: #28a745;
}

:deep(.e-rangeslider.slider-danger .e-range-active) {
  background: #dc3545;
}

:deep(.e-rangeslider.slider-warning .e-range-active) {
  background: #ffc107;
}

:deep(.e-rangeslider.slider-info .e-range-active) {
  background: #17a2b8;
}

:deep(.e-rangeslider.primary .e-range-active) {
  background: #0078d4;
}

:deep(.e-rangeslider.success .e-range-active) {
  background: #28a745;
}

:deep(.e-rangeslider.warning .e-range-active) {
  background: #ffc107;
}

:deep(.e-rangeslider.danger .e-range-active) {
  background: #dc3545;
}
</style>
```

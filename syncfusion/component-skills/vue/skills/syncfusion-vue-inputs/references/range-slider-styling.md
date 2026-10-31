# Styling — Syncfusion Vue Range Slider

## Table of Contents
- [CSS Customization](#css-customization)
- [Size and Appearance](#size-and-appearance)
- [Theme Integration](#theme-integration)
- [Examples](#examples)

---

## CSS Customization

Apply custom styles:

```vue
<template>
  <div class="custom-styling">
    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[30, 70]"
      css-class="custom-slider"
      placeholder="Custom styled">
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
:deep(.e-rangeslider.custom-slider) {
  height: 8px;
}

:deep(.e-rangeslider.custom-slider .e-handle) {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.e-rangeslider.custom-slider .e-range-active) {
  background: linear-gradient(to right, #667eea, #764ba2);
}
</style>
```

---

## Size and Appearance

Control slider size:

```vue
<template>
  <div class="size-demo">
    <div class="example">
      <h4>Small Slider</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[30, 70]"
        css-class="small-slider">
      </ejs-rangeslider>
    </div>

    <div class="example">
      <h4>Medium Slider (Default)</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[30, 70]">
      </ejs-rangeslider>
    </div>

    <div class="example">
      <h4>Large Slider</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[30, 70]"
        css-class="large-slider">
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
.size-demo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.example {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.example h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

:deep(.e-rangeslider.small-slider) {
  height: 4px;
}

:deep(.e-rangeslider.small-slider .e-handle) {
  height: 16px;
  width: 16px;
}

:deep(.e-rangeslider.large-slider) {
  height: 12px;
}

:deep(.e-rangeslider.large-slider .e-handle) {
  height: 32px;
  width: 32px;
}
</style>
```

---

## Theme Integration

Use Syncfusion themes:

```vue
<template>
  <div>
    <div class="theme-selector">
      <button
        v-for="theme in themes"
        :key="theme"
        @click="currentTheme = theme"
        :class="{ active: currentTheme === theme }">
        {{ theme }}
      </button>
    </div>

    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[30, 70]"
      :css-class="'theme-' + currentTheme">
    </ejs-rangeslider>
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
      themes: ['material', 'bootstrap', 'fabric'],
      currentTheme: 'material'
    }
  }
}
</script>

<style scoped>
.theme-selector {
  margin-bottom: 20px;
}

button {
  padding: 8px 12px;
  margin-right: 8px;
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

## Examples

### Complete Styling Demo

```vue
<template>
  <div class="styling-demo">
    <h3>Range Slider Styling Examples</h3>

    <div class="style-options">
      <h4>Select Style:</h4>
      <div class="button-group">
        <button
          v-for="style in styleOptions"
          :key="style"
          @click="selectedStyle = style"
          :class="{ active: selectedStyle === style }">
          {{ style }}
        </button>
      </div>
    </div>

    <div class="preview">
      <h4>Preview</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[30, 70]"
        :css-class="'style-' + selectedStyle">
      </ejs-rangeslider>
    </div>

    <div class="examples">
      <h4>Examples</h4>

      <div class="example-item">
        <label>Gradient Style:</label>
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="[25, 75]"
          css-class="gradient">
        </ejs-rangeslider>
      </div>

      <div class="example-item">
        <label>Soft Style:</label>
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="[30, 70]"
          css-class="soft">
        </ejs-rangeslider>
      </div>

      <div class="example-item">
        <label>Bold Style:</label>
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="[35, 65]"
          css-class="bold">
        </ejs-rangeslider>
      </div>

      <div class="example-item">
        <label>Minimal Style:</label>
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="[40, 60]"
          css-class="minimal">
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
      selectedStyle: 'default',
      styleOptions: ['default', 'gradient', 'soft', 'bold', 'minimal']
    }
  }
}
</script>

<style scoped>
.styling-demo {
  padding: 20px;
  max-width: 600px;
}

.style-options,
.preview,
.examples {
  margin-bottom: 25px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
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

.example-item {
  margin-bottom: 20px;
}

.example-item:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

:deep(.e-rangeslider.style-gradient .e-range-active) {
  background: linear-gradient(to right, #667eea, #764ba2);
}

:deep(.e-rangeslider.style-soft) {
  opacity: 0.8;
}

:deep(.e-rangeslider.style-soft .e-range-active) {
  background: #a0d8ff;
}

:deep(.e-rangeslider.style-bold .e-handle) {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}

:deep(.e-rangeslider.style-minimal) {
  height: 2px;
}

:deep(.e-rangeslider.style-minimal .e-handle) {
  height: 12px;
  width: 12px;
}

:deep(.e-rangeslider.gradient .e-range-active) {
  background: linear-gradient(to right, #667eea, #764ba2);
}

:deep(.e-rangeslider.soft .e-range-active) {
  background: #a0d8ff;
}

:deep(.e-rangeslider.bold .e-range-active) {
  background: #ff6b6b;
}

:deep(.e-rangeslider.minimal) {
  height: 2px;
}

:deep(.e-rangeslider.minimal .e-handle) {
  height: 14px;
  width: 14px;
}
</style>
```

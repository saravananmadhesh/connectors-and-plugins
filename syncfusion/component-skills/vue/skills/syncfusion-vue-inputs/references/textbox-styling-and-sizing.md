# Styling and Sizing — Syncfusion Vue TextBox

## Table of Contents
- [Size Variants](#size-variants)
- [CSS Customization](#css-customization)
- [Theme Styling](#theme-styling)
- [Examples](#examples)

---

## Size Variants

Different textbox sizes:

```vue
<template>
  <div class="sizing-demo">
    <fieldset>
      <legend>TextBox Size Variants</legend>

      <div class="size-group">
        <label for="small-text">Small Size:</label>
        <ejs-textbox
          id="small-text"
          css-class="e-small"
          placeholder="Small textbox">
        </ejs-textbox>
      </div>

      <div class="size-group">
        <label for="normal-text">Normal Size (Default):</label>
        <ejs-textbox
          id="normal-text"
          placeholder="Normal textbox">
        </ejs-textbox>
      </div>

      <div class="size-group">
        <label for="large-text">Large Size:</label>
        <ejs-textbox
          id="large-text"
          css-class="e-lg"
          placeholder="Large textbox">
        </ejs-textbox>
      </div>

      <div class="size-group">
        <label for="xlarge-text">Extra Large Size:</label>
        <ejs-textbox
          id="xlarge-text"
          css-class="e-xlg"
          placeholder="Extra large textbox">
        </ejs-textbox>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  }
}
</script>

<style scoped>
fieldset {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

.size-group {
  margin-bottom: 15px;
}

.size-group:last-child {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

:deep(.e-small.e-textbox) {
  height: 28px;
  padding: 4px 8px;
}

:deep(.e-lg.e-textbox) {
  height: 42px;
  padding: 8px 12px;
  font-size: 16px;
}

:deep(.e-xlg.e-textbox) {
  height: 48px;
  padding: 10px 14px;
  font-size: 18px;
}
</style>
```

---

## CSS Customization

Customize textbox styling:

```vue
<template>
  <div class="custom-styling">
    <h4>Custom Styled TextBoxes</h4>

    <div class="style-example">
      <h5>Rounded Corners</h5>
      <ejs-textbox
        placeholder="Rounded textbox"
        css-class="rounded-style">
      </ejs-textbox>
    </div>

    <div class="style-example">
      <h5>Outlined Style</h5>
      <ejs-textbox
        placeholder="Outlined textbox"
        css-class="outlined-style">
      </ejs-textbox>
    </div>

    <div class="style-example">
      <h5>Filled Style</h5>
      <ejs-textbox
        placeholder="Filled textbox"
        css-class="filled-style">
      </ejs-textbox>
    </div>

    <div class="style-example">
      <h5>Gradient Style</h5>
      <ejs-textbox
        placeholder="Gradient textbox"
        css-class="gradient-style">
      </ejs-textbox>
    </div>

    <div class="style-example">
      <h5>Shadow Style</h5>
      <ejs-textbox
        placeholder="Shadow textbox"
        css-class="shadow-style">
      </ejs-textbox>
    </div>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  }
}
</script>

<style scoped>
.custom-styling {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.custom-styling h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.style-example {
  margin-bottom: 20px;
}

.style-example:last-child {
  margin-bottom: 0;
}

.style-example h5 {
  margin: 0 0 8px 0;
}

:deep(.rounded-style.e-textbox) {
  border-radius: 12px;
}

:deep(.outlined-style.e-textbox) {
  border: 2px solid #0078d4;
  border-radius: 4px;
  background: white;
}

:deep(.filled-style.e-textbox) {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
}

:deep(.gradient-style.e-textbox) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px;
}

:deep(.gradient-style.e-textbox::placeholder) {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.shadow-style.e-textbox) {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

:deep(.shadow-style.e-textbox:focus) {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
</style>
```

---

## Theme Styling

Apply theme colors:

```vue
<template>
  <div class="theme-styling">
    <h4>Theme Variants</h4>

    <div class="theme-selector">
      <button
        v-for="theme in themes"
        :key="theme"
        @click="selectedTheme = theme"
        :class="{ active: selectedTheme === theme }">
        {{ theme }}
      </button>
    </div>

    <div :class="'theme-' + selectedTheme" class="theme-example">
      <label>Username:</label>
      <ejs-textbox placeholder="Enter username"></ejs-textbox>

      <label>Email:</label>
      <ejs-textbox type="email" placeholder="Enter email"></ejs-textbox>

      <label>Password:</label>
      <ejs-textbox type="password" placeholder="Enter password"></ejs-textbox>

      <button>Sign In</button>
    </div>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  data() {
    return {
      themes: ['Light', 'Dark', 'Blue', 'Green'],
      selectedTheme: 'Light'
    }
  }
}
</script>

<style scoped>
.theme-styling {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.theme-styling h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.theme-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.theme-selector button {
  padding: 8px 16px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.theme-selector button.active {
  background: #0078d4;
  color: white;
  border-color: #0078d4;
}

.theme-example {
  padding: 20px;
  border-radius: 8px;
}

.theme-Light {
  background: #ffffff;
  color: #333;
}

.theme-Dark {
  background: #1e1e1e;
  color: #ffffff;
}

.theme-Blue {
  background: #e3f2fd;
  color: #0d47a1;
}

.theme-Green {
  background: #e8f5e9;
  color: #1b5e20;
}

.theme-example label {
  display: block;
  margin-bottom: 8px;
  margin-top: 12px;
  font-weight: bold;
}

.theme-example label:first-child {
  margin-top: 0;
}

.theme-example button {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.theme-example button:hover {
  background: #106ebe;
}

.theme-Dark :deep(.e-textbox) {
  background: #2d2d2d;
  color: white;
  border-color: #444;
}

.theme-Blue :deep(.e-textbox) {
  background: white;
  color: #0d47a1;
  border-color: #2196f3;
}

.theme-Green :deep(.e-textbox) {
  background: white;
  color: #1b5e20;
  border-color: #4caf50;
}
</style>
```

---

## Examples

### Complete Styling and Sizing Demo

```vue
<template>
  <div class="styling-sizing-complete">
    <h3>Styling and Sizing Guide</h3>

    <div class="responsive-section">
      <h4>Responsive Sizing</h4>

      <div class="responsive-grid">
        <div class="device">
          <h5>Mobile (320px)</h5>
          <div class="mobile-preview">
            <ejs-textbox
              placeholder="Mobile textbox"
              css-class="responsive-small">
            </ejs-textbox>
          </div>
        </div>

        <div class="device">
          <h5>Tablet (768px)</h5>
          <div class="tablet-preview">
            <ejs-textbox
              placeholder="Tablet textbox"
              css-class="responsive-medium">
            </ejs-textbox>
          </div>
        </div>

        <div class="device">
          <h5>Desktop (1024px+)</h5>
          <div class="desktop-preview">
            <ejs-textbox
              placeholder="Desktop textbox"
              css-class="responsive-large">
            </ejs-textbox>
          </div>
        </div>
      </div>
    </div>

    <div class="width-section">
      <h4>Width Variants</h4>

      <div class="width-example">
        <label>Full Width:</label>
        <ejs-textbox
          placeholder="100% width"
          css-class="full-width">
        </ejs-textbox>
      </div>

      <div class="width-example">
        <label>Half Width (inline):</label>
        <div class="inline-group">
          <ejs-textbox
            placeholder="Left 50%"
            css-class="half-width">
          </ejs-textbox>
          <ejs-textbox
            placeholder="Right 50%"
            css-class="half-width">
          </ejs-textbox>
        </div>
      </div>

      <div class="width-example">
        <label>Third Width (inline):</label>
        <div class="inline-group">
          <ejs-textbox
            placeholder="1/3"
            css-class="third-width">
          </ejs-textbox>
          <ejs-textbox
            placeholder="1/3"
            css-class="third-width">
          </ejs-textbox>
          <ejs-textbox
            placeholder="1/3"
            css-class="third-width">
          </ejs-textbox>
        </div>
      </div>

      <div class="width-example">
        <label>Fixed Width (300px):</label>
        <ejs-textbox
          placeholder="Fixed width"
          css-class="fixed-width">
        </ejs-textbox>
      </div>
    </div>

    <div class="border-section">
      <h4>Border and Outline Styles</h4>

      <div class="border-grid">
        <div class="border-item">
          <h5>No Border</h5>
          <ejs-textbox
            placeholder="No border"
            css-class="no-border">
          </ejs-textbox>
        </div>

        <div class="border-item">
          <h5>Thin Border</h5>
          <ejs-textbox
            placeholder="Thin border"
            css-class="thin-border">
          </ejs-textbox>
        </div>

        <div class="border-item">
          <h5>Bold Border</h5>
          <ejs-textbox
            placeholder="Bold border"
            css-class="bold-border">
          </ejs-textbox>
        </div>

        <div class="border-item">
          <h5>Dashed Border</h5>
          <ejs-textbox
            placeholder="Dashed border"
            css-class="dashed-border">
          </ejs-textbox>
        </div>
      </div>
    </div>

    <div class="color-section">
      <h4>Color Variants</h4>

      <div class="color-grid">
        <div class="color-item">
          <label>Primary:</label>
          <ejs-textbox
            placeholder="Primary color"
            css-class="color-primary">
          </ejs-textbox>
        </div>

        <div class="color-item">
          <label>Success:</label>
          <ejs-textbox
            placeholder="Success color"
            css-class="color-success">
          </ejs-textbox>
        </div>

        <div class="color-item">
          <label>Warning:</label>
          <ejs-textbox
            placeholder="Warning color"
            css-class="color-warning">
          </ejs-textbox>
        </div>

        <div class="color-item">
          <label>Danger:</label>
          <ejs-textbox
            placeholder="Danger color"
            css-class="color-danger">
          </ejs-textbox>
        </div>
      </div>
    </div>

    <div class="focus-section">
      <h4>Focus States</h4>

      <div class="focus-example">
        <label>Default Focus:</label>
        <ejs-textbox
          placeholder="Focus to see effect"
          css-class="focus-default">
        </ejs-textbox>
      </div>

      <div class="focus-example">
        <label>Glow Focus:</label>
        <ejs-textbox
          placeholder="Focus for glow effect"
          css-class="focus-glow">
        </ejs-textbox>
      </div>

      <div class="focus-example">
        <label>Highlight Focus:</label>
        <ejs-textbox
          placeholder="Focus for highlight"
          css-class="focus-highlight">
        </ejs-textbox>
      </div>
    </div>

    <div class="advanced-section">
      <h4>Advanced Styling</h4>

      <div class="advanced-item">
        <h5>Icon with Textbox</h5>
        <div class="icon-textbox">
          <span class="icon">🔍</span>
          <ejs-textbox placeholder="Search..." css-class="with-icon"></ejs-textbox>
        </div>
      </div>

      <div class="advanced-item">
        <h5>Textbox with Counter</h5>
        <div class="counter-textbox">
          <ejs-textbox
            v-model="charCount"
            maxlength="50"
            placeholder="Type text (0/50)">
          </ejs-textbox>
          <span class="counter">{{ charCount.length }}/50</span>
        </div>
      </div>

      <div class="advanced-item">
        <h5>Textbox with Addon</h5>
        <div class="addon-group">
          <span class="addon">$</span>
          <ejs-textbox placeholder="0.00" type="number"></ejs-textbox>
          <span class="addon">.00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-textbox': TextBoxComponent
  },
  data() {
    return {
      charCount: ''
    }
  }
}
</script>

<style scoped>
.styling-sizing-complete {
  padding: 20px;
  max-width: 1000px;
}

h3 {
  margin-bottom: 30px;
}

h4 {
  margin: 0 0 15px 0;
  border-bottom: 2px solid #0078d4;
  padding-bottom: 8px;
}

h5 {
  margin: 0 0 10px 0;
}

.responsive-section,
.width-section,
.border-section,
.color-section,
.focus-section,
.advanced-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.device {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.device h5 {
  font-size: 12px;
  color: #666;
  margin: 0 0 10px 0;
}

.mobile-preview {
  width: 100%;
}

.tablet-preview {
  width: 100%;
}

.desktop-preview {
  width: 100%;
}

.width-example {
  margin-bottom: 15px;
}

.width-example label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.inline-group {
  display: flex;
  gap: 10px;
}

:deep(.full-width.e-textbox) {
  width: 100%;
}

:deep(.half-width.e-textbox) {
  width: 100%;
}

.inline-group :deep(.half-width.e-textbox) {
  width: calc(50% - 5px);
}

.inline-group :deep(.third-width.e-textbox) {
  width: calc(33.333% - 7px);
}

:deep(.fixed-width.e-textbox) {
  width: 300px;
}

.border-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.border-item {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
}

:deep(.no-border.e-textbox) {
  border: none;
  background: #f0f0f0;
}

:deep(.thin-border.e-textbox) {
  border: 1px solid #999;
}

:deep(.bold-border.e-textbox) {
  border: 3px solid #0078d4;
}

:deep(.dashed-border.e-textbox) {
  border: 2px dashed #0078d4;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.color-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 12px;
}

:deep(.color-primary.e-textbox:focus) {
  border-color: #0078d4;
  box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.1);
}

:deep(.color-success.e-textbox:focus) {
  border-color: #28a745;
  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
}

:deep(.color-warning.e-textbox:focus) {
  border-color: #ffc107;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.1);
}

:deep(.color-danger.e-textbox:focus) {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.focus-example {
  margin-bottom: 15px;
}

.focus-example label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

:deep(.focus-glow.e-textbox:focus) {
  box-shadow: 0 0 20px rgba(0, 120, 212, 0.4);
  border-color: #0078d4;
}

:deep(.focus-highlight.e-textbox:focus) {
  background: #fff3cd;
  border-color: #ffc107;
}

.advanced-item {
  margin-bottom: 20px;
}

.advanced-item:last-child {
  margin-bottom: 0;
}

.icon-textbox {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.icon {
  font-size: 18px;
}

:deep(.with-icon.e-textbox) {
  flex: 1;
  border: none;
}

.counter-textbox {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
}

.counter {
  font-size: 12px;
  color: #666;
}

.addon-group {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.addon {
  padding: 8px 12px;
  background: #f5f5f5;
  color: #666;
  font-weight: bold;
}

:deep(.addon-group .e-textbox) {
  border: none;
  flex: 1;
}
</style>
```

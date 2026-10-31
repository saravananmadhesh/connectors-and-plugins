# Accessibility — Syncfusion Vue Range Slider

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Examples](#examples)

---

## WCAG 2.2 Compliance

Ensure accessibility standards:

```vue
<template>
  <div class="accessible-slider">
    <label for="price-range">Price Range (USD 0-1000):</label>
    <ejs-rangeslider
      id="price-range"
      :min="0"
      :max="1000"
      :value="[250, 750]"
      aria-label="Price range slider from 0 to 1000 dollars"
      aria-describedby="slider-help">
    </ejs-rangeslider>
    <small id="slider-help">Drag the handles or use arrow keys to adjust the price range</small>
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
label {
  display: block;
  font-weight: bold;
  margin-bottom: 12px;
}

small {
  display: block;
  color: #666;
  margin-top: 8px;
  font-size: 12px;
}
</style>
```

---

## Keyboard Navigation

Support keyboard interactions:

```vue
<template>
  <div class="keyboard-slider">
    <label>Volume Control (Keyboard Accessible):</label>
    
    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[30, 70]"
      placeholder="Volume">
    </ejs-rangeslider>

    <p class="instructions">
      Arrow Keys: Move slider | Shift+Arrow: Large step | Tab: Focus between handles
    </p>
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
label {
  display: block;
  font-weight: bold;
  margin-bottom: 12px;
}

.instructions {
  margin-top: 12px;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Screen Reader Support

Provide context for screen readers:

```vue
<template>
  <div class="screen-reader-slider">
    <fieldset>
      <legend>Adjust Brightness</legend>
      
      <label for="brightness">Brightness Level (0-100%):</label>
      <ejs-rangeslider
        id="brightness"
        :min="0"
        :max="100"
        :value="[50]"
        aria-label="Brightness level slider from 0 to 100 percent"
        aria-describedby="brightness-status"
        @change="updateBrightnessStatus">
      </ejs-rangeslider>

      <div id="brightness-status" aria-live="polite" aria-atomic="true">
        <p>Brightness: {{ brightnessLevel }}%</p>
      </div>
    </fieldset>
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
      brightnessLevel: 50
    }
  },
  methods: {
    updateBrightnessStatus(event) {
      this.brightnessLevel = event.value;
    }
  }
}
</script>

<style scoped>
fieldset {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 4px;
}

legend {
  font-weight: bold;
  padding: 0 8px;
}

label {
  display: block;
  margin-bottom: 12px;
  font-weight: bold;
}

#brightness-status {
  margin-top: 12px;
  font-size: 14px;
}

#brightness-status p {
  margin: 0;
}
</style>
```

---

## Examples

### Accessible Range Slider Form

```vue
<template>
  <div class="accessible-slider-form">
    <h2>Display Settings</h2>

    <form @submit.prevent="saveSettings">
      <fieldset>
        <legend>Accessibility Settings</legend>

        <div class="setting-group">
          <label for="text-size">Text Size: {{ textSize }}%</label>
          <ejs-rangeslider
            id="text-size"
            :min="80"
            :max="200"
            :value="[100]"
            :step="10"
            aria-label="Text size adjustment from 80 to 200 percent"
            aria-describedby="text-size-help"
            @change="updateTextSize">
          </ejs-rangeslider>
          <small id="text-size-help">Adjust text size for better readability</small>
        </div>

        <div class="setting-group">
          <label for="contrast">Contrast: {{ contrastLevel }}%</label>
          <ejs-rangeslider
            id="contrast"
            :min="0"
            :max="100"
            :value="[50]"
            aria-label="Contrast level from 0 to 100 percent"
            aria-describedby="contrast-help"
            @change="updateContrast">
          </ejs-rangeslider>
          <small id="contrast-help">Increase contrast for better visibility</small>
        </div>

        <div class="setting-group">
          <label for="spacing">Line Spacing: {{ spacing }}</label>
          <ejs-rangeslider
            id="spacing"
            :min="1"
            :max="3"
            :value="[1.5]"
            :step="0.5"
            aria-label="Line spacing adjustment"
            aria-describedby="spacing-help"
            @change="updateSpacing">
          </ejs-rangeslider>
          <small id="spacing-help">Adjust line spacing for comfort</small>
        </div>

        <button type="submit">Save Settings</button>
      </fieldset>
    </form>

    <div class="preview">
      <h3 style="font-size: ${textSize}%">Preview</h3>
      <p :style="{ fontSize: textSize + '%', lineHeight: spacing }">
        This is how your text will appear with the current settings.
      </p>
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
      textSize: 100,
      contrastLevel: 50,
      spacing: 1.5
    }
  },
  methods: {
    updateTextSize(event) {
      this.textSize = event.value;
    },
    updateContrast(event) {
      this.contrastLevel = event.value;
    },
    updateSpacing(event) {
      this.spacing = event.value;
    },
    saveSettings() {
      console.log('Settings saved:', {
        textSize: this.textSize,
        contrast: this.contrastLevel,
        spacing: this.spacing
      });
    }
  }
}
</script>

<style scoped>
.accessible-slider-form {
  max-width: 500px;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

fieldset {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}

legend {
  font-weight: bold;
  font-size: 16px;
  padding: 0 8px;
}

.setting-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

small {
  display: block;
  color: #666;
  margin-top: 5px;
  font-size: 12px;
}

button {
  width: 100%;
  padding: 12px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
}

button:hover {
  background: #106ebe;
}

.preview {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.preview h3 {
  margin-top: 0;
}

.preview p {
  margin: 10px 0;
}
</style>
```

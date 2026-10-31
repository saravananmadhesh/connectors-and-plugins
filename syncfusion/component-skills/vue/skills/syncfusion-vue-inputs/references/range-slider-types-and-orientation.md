# Types and Orientation — Syncfusion Vue Range Slider

## Table of Contents
- [Slider Types](#slider-types)
- [Orientation](#orientation)
- [Configuration](#configuration)
- [Examples](#examples)

---

## Slider Types

Range slider types:

```vue
<template>
  <div class="types-demo">
    <div class="example">
      <h4>Range Slider (Default)</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[30, 70]"
        type="Range">
      </ejs-rangeslider>
      <p>Two handles for min and max selection</p>
    </div>

    <div class="example">
      <h4>Min Range Slider</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[40]"
        type="MinRange">
      </ejs-rangeslider>
      <p>Single handle for minimum value</p>
    </div>

    <div class="example">
      <h4>Max Range Slider</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[60]"
        type="MaxRange">
      </ejs-rangeslider>
      <p>Single handle for maximum value</p>
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
.types-demo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.example {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.example h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.example p {
  margin: 10px 0 0 0;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Orientation

Horizontal and vertical orientation:

```vue
<template>
  <div class="orientation-demo">
    <div class="horizontal">
      <h4>Horizontal (Default)</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[30, 70]"
        orientation="Horizontal">
      </ejs-rangeslider>
    </div>

    <div class="vertical">
      <h4>Vertical</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[30, 70]"
        orientation="Vertical">
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
.orientation-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.horizontal {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.vertical {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h4 {
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
}

:deep(.e-rangeslider-vertical) {
  height: 250px;
}
</style>
```

---

## Configuration

Configure slider behavior:

```vue
<template>
  <div class="config-demo">
    <div class="config-panel">
      <h4>Configuration Options</h4>

      <div class="option">
        <label>Slider Type:</label>
        <select v-model="sliderConfig.type">
          <option value="Range">Range</option>
          <option value="MinRange">MinRange</option>
          <option value="MaxRange">MaxRange</option>
        </select>
      </div>

      <div class="option">
        <label>Orientation:</label>
        <select v-model="sliderConfig.orientation">
          <option value="Horizontal">Horizontal</option>
          <option value="Vertical">Vertical</option>
        </select>
      </div>

      <div class="option">
        <label>
          <input type="checkbox" v-model="sliderConfig.enabled"> Enabled
        </label>
      </div>
    </div>

    <div class="preview">
      <h4>Preview</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="sliderConfig.type === 'Range' ? [30, 70] : [50]"
        :type="sliderConfig.type"
        :orientation="sliderConfig.orientation"
        :enabled="sliderConfig.enabled">
      </ejs-rangeslider>
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
      sliderConfig: {
        type: 'Range',
        orientation: 'Horizontal',
        enabled: true
      }
    }
  }
}
</script>

<style scoped>
.config-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.config-panel,
.preview {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.option {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="checkbox"] {
  margin-right: 8px;
}

:deep(.e-rangeslider-vertical) {
  height: 250px;
  margin: 0 auto;
}
</style>
```

---

## Examples

### Complete Type and Orientation Demo

```vue
<template>
  <div class="complete-demo">
    <h3>Range Slider Types and Orientations</h3>

    <div class="demo-section">
      <h4>Horizontal Range Sliders</h4>

      <div class="example">
        <label>Price Range ($0-$1000):</label>
        <ejs-rangeslider
          :min="0"
          :max="1000"
          :value="[200, 800]"
          type="Range"
          orientation="Horizontal">
        </ejs-rangeslider>
      </div>

      <div class="example">
        <label>Minimum Budget ($0-$5000):</label>
        <ejs-rangeslider
          :min="0"
          :max="5000"
          :value="[1500]"
          type="MinRange"
          orientation="Horizontal">
        </ejs-rangeslider>
      </div>

      <div class="example">
        <label>Maximum Discount (0-100%):</label>
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="[70]"
          type="MaxRange"
          orientation="Horizontal">
        </ejs-rangeslider>
      </div>
    </div>

    <div class="demo-section">
      <h4>Vertical Range Sliders</h4>

      <div class="vertical-container">
        <div class="vertical-example">
          <label>Volume Control:</label>
          <ejs-rangeslider
            :min="0"
            :max="100"
            :value="[30, 70]"
            type="Range"
            orientation="Vertical">
          </ejs-rangeslider>
        </div>

        <div class="vertical-example">
          <label>Brightness Min:</label>
          <ejs-rangeslider
            :min="0"
            :max="100"
            :value="[30]"
            type="MinRange"
            orientation="Vertical">
          </ejs-rangeslider>
        </div>

        <div class="vertical-example">
          <label>Brightness Max:</label>
          <ejs-rangeslider
            :min="0"
            :max="100"
            :value="[80]"
            type="MaxRange"
            orientation="Vertical">
          </ejs-rangeslider>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>Interactive Configuration</h4>

      <div class="config">
        <div class="option">
          <label>Type:</label>
          <select v-model="interactive.type">
            <option value="Range">Range</option>
            <option value="MinRange">MinRange</option>
            <option value="MaxRange">MaxRange</option>
          </select>
        </div>

        <div class="option">
          <label>Orientation:</label>
          <select v-model="interactive.orientation">
            <option value="Horizontal">Horizontal</option>
            <option value="Vertical">Vertical</option>
          </select>
        </div>
      </div>

      <div class="interactive-slider">
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="interactive.type === 'Range' ? [30, 70] : [50]"
          :type="interactive.type"
          :orientation="interactive.orientation">
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
      interactive: {
        type: 'Range',
        orientation: 'Horizontal'
      }
    }
  }
}
</script>

<style scoped>
.complete-demo {
  padding: 20px;
  max-width: 800px;
}

h4 {
  margin: 25px 0 15px 0;
  font-size: 16px;
  border-bottom: 2px solid #0078d4;
  padding-bottom: 8px;
}

h4:first-of-type {
  margin-top: 0;
}

.demo-section {
  margin-bottom: 30px;
}

.example {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #f9f9f9;
}

.example label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.vertical-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.vertical-example {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vertical-example label {
  margin-bottom: 15px;
  font-weight: bold;
}

:deep(.e-rangeslider-vertical) {
  height: 200px;
}

.config {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 20px;
}

.option label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.interactive-slider {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: #f9f9f9;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

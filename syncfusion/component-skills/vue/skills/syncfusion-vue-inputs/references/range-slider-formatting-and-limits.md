# Formatting and Limits — Syncfusion Vue Range Slider

## Table of Contents
- [Min and Max Values](#min-and-max-values)
- [Formatting](#formatting)
- [Limits](#limits)
- [Examples](#examples)

---

## Min and Max Values

Set range boundaries:

```vue
<template>
  <div>
    <label>Price Range ($0-$1000):</label>
    <ejs-rangeslider
      :min="0"
      :max="1000"
      :value="[200, 800]"
      placeholder="Price range">
    </ejs-rangeslider>

    <label>Temperature Range (0-100°C):</label>
    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[20, 30]"
      placeholder="Temperature range">
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
label {
  display: block;
  margin: 20px 0 10px 0;
  font-weight: bold;
}
</style>
```

---

## Formatting

Format displayed values:

```vue
<template>
  <div class="formatting-demo">
    <div class="format-example">
      <h4>Currency Format</h4>
      <ejs-rangeslider
        :min="0"
        :max="1000"
        :value="[250, 750]"
        :tooltip="{ isVisible: true, format: 'c0' }"
        placeholder="Price">
      </ejs-rangeslider>
      <p>Selected: ${{ selectedRange[0] }} - ${{ selectedRange[1] }}</p>
    </div>

    <div class="format-example">
      <h4>Percentage Format</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[25, 75]"
        placeholder="Percentage">
      </ejs-rangeslider>
      <p>Selected: {{ selectedRange[0] }}% - {{ selectedRange[1] }}%</p>
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
      selectedRange: [25, 75]
    }
  }
}
</script>

<style scoped>
.formatting-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.format-example {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.format-example h4 {
  margin-top: 0;
}

.format-example p {
  margin-bottom: 0;
  color: #666;
}
</style>
```

---

## Limits

Apply range limits:

```vue
<template>
  <div>
    <label>Price Range (Min $100, Max $5000):</label>
    <ejs-rangeslider
      :min="100"
      :max="5000"
      :value="[500, 4000]"
      :step="50"
      placeholder="Price">
    </ejs-rangeslider>

    <div class="limit-display">
      <p><strong>Minimum Allowed:</strong> $100</p>
      <p><strong>Maximum Allowed:</strong> $5000</p>
      <p><strong>Selected:</strong> ${{ selected[0] }} - ${{ selected[1] }}</p>
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
      selected: [500, 4000]
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
}

.limit-display {
  margin-top: 20px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.limit-display p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
```

---

## Examples

### Complete Formatting and Limits Demo

```vue
<template>
  <div class="limits-demo">
    <h3>Range Slider Formatting and Limits</h3>

    <div class="config">
      <h4>Configuration</h4>

      <div class="config-group">
        <label>Min Value:</label>
        <input v-model.number="config.min" type="number">
      </div>

      <div class="config-group">
        <label>Max Value:</label>
        <input v-model.number="config.max" type="number">
      </div>

      <div class="config-group">
        <label>Step:</label>
        <input v-model.number="config.step" type="number" :min="1">
      </div>
    </div>

    <div class="slider-section">
      <h4>Dynamic Range Slider</h4>
      <ejs-rangeslider
        :key="config.min + '-' + config.max"
        :min="config.min"
        :max="config.max"
        :step="config.step"
        :value="computedValue"
        @change="handleChange"
        placeholder="Range">
      </ejs-rangeslider>

      <div class="value-display">
        <p><strong>Selected Range:</strong></p>
        <p>{{ currentValue[0] }} to {{ currentValue[1] }}</p>
      </div>
    </div>

    <div class="presets">
      <h4>Preset Configurations</h4>

      <button @click="loadPreset('price')">Price Range ($0-$1000)</button>
      <button @click="loadPreset('percentage')">Percentage (0-100%)</button>
      <button @click="loadPreset('temperature')">Temperature (-40-50°C)</button>
      <button @click="loadPreset('time')">Time (0-24 hours)</button>
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
      config: {
        min: 0,
        max: 100,
        step: 1
      },
      currentValue: [25, 75],
      presets: {
        price: { min: 0, max: 1000, step: 10, value: [100, 900] },
        percentage: { min: 0, max: 100, step: 1, value: [25, 75] },
        temperature: { min: -40, max: 50, step: 1, value: [0, 30] },
        time: { min: 0, max: 24, step: 1, value: [9, 17] }
      }
    }
  },
  computed: {
    computedValue() {
      return this.currentValue;
    }
  },
  methods: {
    handleChange(event) {
      this.currentValue = event.value;
    },
    loadPreset(name) {
      const preset = this.presets[name];
      this.config = {
        min: preset.min,
        max: preset.max,
        step: preset.step
      };
      this.currentValue = preset.value;
    }
  }
}
</script>

<style scoped>
.limits-demo {
  padding: 20px;
  max-width: 600px;
}

.config,
.slider-section,
.presets {
  margin-bottom: 25px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.config-group {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="number"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.value-display {
  margin-top: 15px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.value-display p {
  margin: 5px 0;
}

.presets {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.presets h4 {
  margin-bottom: 10px;
}

button {
  padding: 10px;
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

# Tooltips and Ticks — Syncfusion Vue Range Slider

## Table of Contents
- [Tooltips](#tooltips)
- [Ticks](#ticks)
- [Combined Usage](#combined-usage)
- [Examples](#examples)

---

## Tooltips

Show value tooltips:

```vue
<template>
  <div>
    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[30, 70]"
      :tooltip="{ isVisible: true }">
    </ejs-rangeslider>

    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[25, 75]"
      :tooltip="{ isVisible: true, placement: 'Top' }">
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
```

---

## Ticks

Add tick marks:

```vue
<template>
  <div>
    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[30, 70]"
      :ticks="{ placement: 'Both', largeStep: 20, smallStep: 5 }">
    </ejs-rangeslider>

    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[40, 60]"
      :ticks="{ placement: 'Before', largeStep: 10 }">
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
```

---

## Combined Usage

Use tooltips and ticks together:

```vue
<template>
  <div class="combined-demo">
    <div class="example">
      <h4>Price Range with Ticks and Tooltips</h4>
      <ejs-rangeslider
        :min="0"
        :max="1000"
        :value="[250, 750]"
        :step="50"
        :tooltip="{ isVisible: true, format: 'c0' }"
        :ticks="{ placement: 'Both', largeStep: 250 }">
      </ejs-rangeslider>
    </div>

    <div class="example">
      <h4>Percentage with Ticks and Tooltips</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[25, 75]"
        :tooltip="{ isVisible: true }"
        :ticks="{ placement: 'Below', largeStep: 25 }">
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
.combined-demo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

.example {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.example h4 {
  margin-top: 0;
  margin-bottom: 20px;
}
</style>
```

---

## Examples

### Complete Tooltips and Ticks Demo

```vue
<template>
  <div class="tooltips-ticks-demo">
    <h3>Tooltips and Ticks Configuration</h3>

    <div class="config-panel">
      <h4>Configuration</h4>

      <div class="config-group">
        <label>
          <input type="checkbox" v-model="config.showTooltip"> Show Tooltips
        </label>
      </div>

      <div class="config-group">
        <label>
          <input type="checkbox" v-model="config.showTicks"> Show Ticks
        </label>
      </div>

      <div class="config-group">
        <label>Ticks Placement:</label>
        <select v-model="config.tickPlacement" :disabled="!config.showTicks">
          <option value="Before">Before</option>
          <option value="After">After</option>
          <option value="Both">Both</option>
        </select>
      </div>

      <div class="config-group">
        <label>Tooltip Placement:</label>
        <select v-model="config.tooltipPlacement" :disabled="!config.showTooltip">
          <option value="Before">Before</option>
          <option value="After">After</option>
        </select>
      </div>
    </div>

    <div class="preview">
      <h4>Preview</h4>
      <ejs-rangeslider
        :min="0"
        :max="100"
        :value="[30, 70]"
        :tooltip="config.showTooltip ? { isVisible: true, placement: config.tooltipPlacement } : {}"
        :ticks="config.showTicks ? { placement: config.tickPlacement, largeStep: 20, smallStep: 5 } : {}">
      </ejs-rangeslider>
    </div>

    <div class="examples">
      <h4>Common Configurations</h4>

      <div class="use-case">
        <label>Financial Range (Currency Format):</label>
        <ejs-rangeslider
          :min="0"
          :max="10000"
          :value="[2500, 7500]"
          :tooltip="{ isVisible: true, format: 'c0' }"
          :ticks="{ placement: 'Both', largeStep: 2500 }">
        </ejs-rangeslider>
      </div>

      <div class="use-case">
        <label>Percentage (with Ticks):</label>
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="[25, 75]"
          :tooltip="{ isVisible: true }"
          :ticks="{ placement: 'Below', largeStep: 25 }">
        </ejs-rangeslider>
      </div>

      <div class="use-case">
        <label>Rating Scale (1-10):</label>
        <ejs-rangeslider
          :min="1"
          :max="10"
          :value="[3, 8]"
          :tooltip="{ isVisible: true }"
          :ticks="{ placement: 'Both', largeStep: 1 }">
        </ejs-rangeslider>
      </div>

      <div class="use-case">
        <label>Age Range (Simplified):</label>
        <ejs-rangeslider
          :min="0"
          :max="100"
          :value="[18, 65]"
          :step="5"
          :tooltip="{ isVisible: true }"
          :ticks="{ placement: 'Both', largeStep: 10 }">
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
      config: {
        showTooltip: true,
        tooltipPlacement: 'After',
        showTicks: true,
        tickPlacement: 'Both'
      }
    }
  }
}
</script>

<style scoped>
.tooltips-ticks-demo {
  padding: 20px;
  max-width: 600px;
}

.config-panel,
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

.config-group {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="checkbox"] {
  margin-right: 8px;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select:disabled {
  background: #f5f5f5;
  opacity: 0.5;
}

.use-case {
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

.use-case:last-child {
  margin-bottom: 0;
}

.use-case label {
  margin-bottom: 12px;
  margin-top: 0;
}
</style>
```

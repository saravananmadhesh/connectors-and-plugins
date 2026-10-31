# RangeSlider API Reference - Vue 3

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | array | [0, 100] | Selected range [min, max] |
| `min` | number | 0 | Minimum value |
| `max` | number | 100 | Maximum value |
| `step` | number | 1 | Increment step |
| `type` | string | 'Range' | 'Range' or 'MinRange' |
| `orientation` | string | 'Horizontal' | 'Horizontal' or 'Vertical' |
| `disabled` | boolean | false | Disable the slider |
| `readonly` | boolean | false | Make read-only |
| `tooltip` | object | - | Tooltip configuration |
| `ticks` | object | - | Tick marks configuration |
| `cssClass` | string | - | Custom CSS class |
| `enableRtl` | boolean | false | Enable RTL mode |

---

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getValue()` | - | array | Get current value |
| `setValue(value)` | array | void | Set value |
| `setRange(min, max)` | number, number | void | Set min and max |
| `enable()` | - | void | Enable component |
| `disable()` | - | void | Disable component |
| `destroy()` | - | void | Destroy component |

---

## Events

```typescript
onChange = (args: ChangeEventArgs) => {
  console.log(args.value);        // [minValue, maxValue]
  console.log(args.previousValue);
};

onInput = (args: InputEventArgs) => {
  console.log(args.value);  // Real-time value
};

onCreated = () => {
  console.log('RangeSlider created');
};
```

---

## Complete Example

```vue
<template>
  <div class="rangeslider-demo">
    <div class="filter-section">
      <h3>Price Range Filter</h3>
      
      <RangeSliderComponent
        v-model="priceRange"
        :min="0"
        :max="10000"
        :step="100"
        :type="'Range'"
        @change="onPriceChange"
      />

      <div class="range-display">
        <p>Min: ${{ priceRange[0] }}</p>
        <p>Max: ${{ priceRange[1] }}</p>
        <p>Range: ${{ priceRange[1] - priceRange[0] }}</p>
      </div>

      <div class="filter-buttons">
        <button @click="resetRange">Reset</button>
        <button @click="applyFilter">Apply Filter</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RangeSliderComponent } from '@syncfusion/ej2-vue-inputs';

const priceRange = ref([1000, 5000]);

const onPriceChange = (args) => {
  console.log('Price range changed:', args.value);
};

const resetRange = () => {
  priceRange.value = [0, 10000];
};

const applyFilter = () => {
  console.log('Filter applied:', priceRange.value);
};
</script>

<style scoped>
.rangeslider-demo {
  padding: 20px;
  max-width: 400px;
}

.filter-section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

h3 {
  margin-top: 0;
}

.range-display {
  margin: 20px 0;
  padding: 15px;
  background-color: white;
  border-radius: 4px;
}

.range-display p {
  margin: 5px 0;
  font-weight: 600;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  flex: 1;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
```


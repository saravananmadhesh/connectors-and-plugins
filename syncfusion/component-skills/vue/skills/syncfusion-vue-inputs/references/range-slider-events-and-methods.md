# Events and Methods — Syncfusion Vue Range Slider

## Table of Contents
- [Event Handling](#event-handling)
- [Change Events](#change-events)
- [Methods](#methods)
- [Examples](#examples)

---

## Event Handling

Handle range slider events:

```vue
<template>
  <div>
    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[30, 70]"
      @change="handleChange"
      @created="handleCreated">
    </ejs-rangeslider>

    <p v-if="lastEvent">Last event: {{ lastEvent }}</p>
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
      lastEvent: ''
    }
  },
  methods: {
    handleChange(event) {
      this.lastEvent = `Range changed to: ${event.value}`;
    },
    handleCreated() {
      this.lastEvent = 'Range slider created';
    }
  }
}
</script>

<style scoped>
p {
  margin-top: 15px;
  font-size: 12px;
  color: #666;
}
</style>
```

---

## Change Events

Handle value changes:

```vue
<template>
  <div>
    <ejs-rangeslider
      :min="0"
      :max="100"
      :value="[25, 75]"
      @input="handleInput"
      @change="handleChangeEvent">
    </ejs-rangeslider>

    <div class="change-info">
      <p><strong>Start Value:</strong> {{ values[0] }}</p>
      <p><strong>End Value:</strong> {{ values[1] }}</p>
      <p><strong>Last Event:</strong> {{ eventType }}</p>
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
      values: [25, 75],
      eventType: 'initialized'
    }
  },
  methods: {
    handleInput(event) {
      this.values = event.value;
      this.eventType = 'input (dragging)';
    },
    handleChangeEvent(event) {
      this.values = event.value;
      this.eventType = 'change (released)';
    }
  }
}
</script>

<style scoped>
.change-info {
  margin-top: 20px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.change-info p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
```

---

## Methods

Call range slider methods:

```vue
<template>
  <div>
    <div class="controls">
      <button @click="setValues">Set Range (20-80)</button>
      <button @click="getValue">Get Current Value</button>
      <button @click="reset">Reset</button>
    </div>

    <ejs-rangeslider
      ref="rangeSlider"
      :min="0"
      :max="100"
      :value="[30, 70]">
    </ejs-rangeslider>

    <p v-if="currentValue">Current Value: {{ currentValue }}</p>
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
      currentValue: ''
    }
  },
  methods: {
    setValues() {
      this.$refs.rangeSlider.setModelValue([20, 80]);
      this.currentValue = '[20, 80]';
    },
    getValue() {
      const value = this.$refs.rangeSlider.value;
      this.currentValue = `[${value[0]}, ${value[1]}]`;
    },
    reset() {
      this.$refs.rangeSlider.setModelValue([30, 70]);
      this.currentValue = '[30, 70]';
    }
  }
}
</script>

<style scoped>
.controls {
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #106ebe;
}

p {
  margin-top: 15px;
  font-size: 14px;
}
</style>
```

---

## Examples

### Complete Event Handling Demo

```vue
<template>
  <div class="events-demo">
    <h3>Range Slider Events and Methods</h3>

    <div class="event-log">
      <h4>Event Log</h4>
      <div class="log-list">
        <div v-for="(log, index) in eventLog" :key="index" class="log-entry">
          <span class="time">{{ log.time }}</span>
          <span class="type">{{ log.type }}</span>
          <span class="value">{{ log.value }}</span>
        </div>
      </div>
      <button @click="clearLog" class="clear">Clear Log</button>
    </div>

    <div class="slider-section">
      <h4>Price Range Selector</h4>
      <ejs-rangeslider
        ref="priceSlider"
        :min="0"
        :max="1000"
        :step="10"
        :value="[100, 900]"
        @input="logInput"
        @change="logChange">
      </ejs-rangeslider>

      <div class="price-display">
        <p><strong>Min Price:</strong> ${{ selectedRange[0] }}</p>
        <p><strong>Max Price:</strong> ${{ selectedRange[1] }}</p>
        <p><strong>Range Span:</strong> ${{ selectedRange[1] - selectedRange[0] }}</p>
      </div>
    </div>

    <div class="controls">
      <h4>Quick Actions</h4>
      <button @click="setRange('budget')">Budget ($50-500)</button>
      <button @click="setRange('standard')">Standard ($200-800)</button>
      <button @click="setRange('premium')">Premium ($600-1000)</button>
      <button @click="resetRange">Reset</button>
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
      eventLog: [],
      selectedRange: [100, 900]
    }
  },
  methods: {
    logInput(event) {
      this.selectedRange = event.value;
      this.addLog('input', event.value.toString());
    },
    logChange(event) {
      this.selectedRange = event.value;
      this.addLog('change', event.value.toString());
    },
    addLog(type, value) {
      const time = new Date().toLocaleTimeString();
      this.eventLog.unshift({ time, type, value });
      if (this.eventLog.length > 10) {
        this.eventLog.pop();
      }
    },
    clearLog() {
      this.eventLog = [];
    },
    setRange(type) {
      const ranges = {
        'budget': [50, 500],
        'standard': [200, 800],
        'premium': [600, 1000]
      };
      this.$refs.priceSlider.setModelValue(ranges[type]);
      this.addLog('action', `Range set to ${type}: ${ranges[type]}`);
    },
    resetRange() {
      this.$refs.priceSlider.setModelValue([100, 900]);
      this.addLog('action', 'Range reset to [100, 900]');
    }
  }
}
</script>

<style scoped>
.events-demo {
  padding: 20px;
  max-width: 600px;
}

.event-log,
.slider-section,
.controls {
  margin-bottom: 25px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.log-list {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 10px;
  font-family: monospace;
  font-size: 12px;
}

.log-entry {
  display: flex;
  gap: 8px;
  padding: 5px;
  border-bottom: 1px solid #eee;
}

.log-entry:last-child {
  border-bottom: none;
}

.time {
  color: #666;
  min-width: 80px;
}

.type {
  color: #0078d4;
  font-weight: bold;
  min-width: 60px;
}

.value {
  color: #107c10;
}

.clear {
  padding: 8px 16px;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.price-display {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin-top: 15px;
}

.price-display p {
  margin: 5px 0;
  font-size: 14px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
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

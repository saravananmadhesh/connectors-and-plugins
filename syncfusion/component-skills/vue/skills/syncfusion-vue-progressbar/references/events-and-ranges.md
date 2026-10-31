# Events & Value Ranges

## Table of Contents
- [Value Changed Event](#value-changed-event)
  - [Basic Value Changed Handler](#basic-value-changed-handler)
  - [Modify Progress Color on Change](#modify-progress-color-on-change)
  - [Track Progress History](#track-progress-history)
- [Progress Completed Event](#progress-completed-event)
  - [Basic Completion Handler](#basic-completion-handler)
  - [Show Completion Message](#show-completion-message)
- [Value Range Configuration](#value-range-configuration)
  - [Basic Range Setup](#basic-range-setup)
  - [Percentage Calculation with Custom Range](#percentage-calculation-with-custom-range)
  - [Score/Rating Range](#scorerating-range)
- [Event Patterns](#event-patterns)
  - [Combined Events Pattern](#combined-events-pattern)
- [Event & Range Summary](#event--range-summary)

## Value Changed Event

The `valueChanged` event fires whenever the progress value changes.

### Basic Value Changed Handler

```vue
<template>
  <div class="value-changed">
    <h3>Value Changed Event</h3>

    <ejs-progressbar
      id="progressbar"
      type="Linear"
      height="60"
      :value="currentValue"
      :valueChanged="onValueChanged"
    >
    </ejs-progressbar>

    <div class="status">
      <p>Current Value: {{ currentValue }}%</p>
      <p>Change Count: {{ changeCount }}</p>
      <p>Last Change: {{ lastChangeTime }}</p>
    </div>

    <button @click="updateProgress">Update Progress</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const currentValue = ref(0);
const changeCount = ref(0);
const lastChangeTime = ref("---");

const onValueChanged = (args) => {
  changeCount.value++;
  lastChangeTime.value = new Date().toLocaleTimeString();
  console.log("Progress changed to:", args.value);
};

const updateProgress = () => {
  currentValue.value = Math.min(currentValue.value + 20, 100);
};
</script>

<style scoped>
.value-changed {
  padding: 20px;
}

.status {
  margin: 20px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.status p {
  margin: 5px 0;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

### Modify Progress Color on Change

```vue
<template>
  <div class="color-change">
    <h3>Change Color on Value Update</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="colorProgress"
      :valueChanged="onColorChange"
      :progressColor="progressColor"
    >
    </ejs-progressbar>

    <p style="margin-top: 15px; color: #666;">
      Color changes based on progress value
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const colorProgress = ref(0);

const progressColor = computed(() => {
  if (colorProgress.value < 33) return "#dc3545"; // Red
  if (colorProgress.value < 67) return "#ffc107"; // Yellow
  return "#28a745"; // Green
});

const onColorChange = (args) => {
  console.log(`Progress: ${args.value}%, Color: ${progressColor.value}`);
};

// Auto-increment for demo
setInterval(() => {
  colorProgress.value = (colorProgress.value + 10) % 110;
}, 1000);
</script>

<style scoped>
.color-change {
  padding: 20px;
}
</style>
```

### Track Progress History

```vue
<template>
  <div class="progress-history">
    <h3>Progress History Tracking</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="progValue"
      :valueChanged="onHistoryChange"
    >
    </ejs-progressbar>

    <div class="history">
      <h4>Progress History (Last 10 changes)</h4>
      <ul>
        <li v-for="(item, index) in history" :key="index">
          {{ item.time }} - {{ item.value }}%
        </li>
      </ul>
    </div>

    <div class="controls">
      <button @click="incrementProg">+10%</button>
      <button @click="decrementProg">-10%</button>
      <button @click="resetHistory">Clear History</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const progValue = ref(0);
const history = ref([]);
const MAX_HISTORY = 10;

const onHistoryChange = (args) => {
  const time = new Date().toLocaleTimeString();
  history.value.unshift({ time, value: args.value });
  
  if (history.value.length > MAX_HISTORY) {
    history.value.pop();
  }
};

const incrementProg = () => {
  progValue.value = Math.min(progValue.value + 10, 100);
};

const decrementProg = () => {
  progValue.value = Math.max(progValue.value - 10, 0);
};

const resetHistory = () => {
  history.value = [];
};
</script>

<style scoped>
.progress-history {
  padding: 20px;
}

.history {
  margin: 20px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.history h4 {
  margin-top: 0;
}

.history ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history li {
  padding: 5px;
  font-size: 13px;
  color: #333;
}

.controls {
  margin-top: 15px;
}

button {
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
```

## Progress Completed Event

The `progressCompleted` event fires when the progress reaches 100%.

### Basic Completion Handler

```vue
<template>
  <div class="completion">
    <h3>Progress Completed Event</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="completionValue"
      :progressCompleted="onCompleted"
    >
    </ejs-progressbar>

    <div class="completion-status" v-if="isCompleted">
      <p style="color: green; font-weight: bold;">✓ Progress Completed!</p>
    </div>

    <button @click="startCompletion">Start to 100%</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const completionValue = ref(0);
const isCompleted = ref(false);

const onCompleted = (args) => {
  isCompleted.value = true;
  console.log("Progress completed!", args);
};

const startCompletion = () => {
  isCompleted.value = false;
  completionValue.value = 0;
  
  const interval = setInterval(() => {
    completionValue.value += 10;
    
    if (completionValue.value >= 100) {
      completionValue.value = 100;
      clearInterval(interval);
    }
  }, 500);
};
</script>

<style scoped>
.completion {
  padding: 20px;
}

.completion-status {
  margin: 20px 0;
  padding: 10px;
  background: #d4edda;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

### Show Completion Message

```vue
<template>
  <div class="completion-message">
    <h3>Task Completion with Message</h3>

    <ejs-progressbar
      type="Circular"
      height="220px"
      width="220px"
      :value="taskProgress"
      :progressCompleted="onTaskCompleted"
      :showProgressValue="true"
    >
    </ejs-progressbar>

    <div v-if="completionMessage" class="message" :class="messageType">
      {{ completionMessage }}
    </div>

    <div class="buttons">
      <button @click="startTask">Start Task</button>
      <button @click="resetTask">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const taskProgress = ref(0);
const completionMessage = ref("");
const messageType = ref("");

const onTaskCompleted = (args) => {
  completionMessage.value = "✓ Task Completed Successfully!";
  messageType.value = "success";
};

const startTask = () => {
  completionMessage.value = "";
  taskProgress.value = 0;
  
  const interval = setInterval(() => {
    taskProgress.value += Math.random() * 20;
    
    if (taskProgress.value >= 100) {
      taskProgress.value = 100;
      clearInterval(interval);
    }
  }, 400);
};

const resetTask = () => {
  taskProgress.value = 0;
  completionMessage.value = "";
};
</script>

<style scoped>
.completion-message {
  text-align: center;
  padding: 20px;
}

.message {
  margin: 20px 0;
  padding: 15px;
  border-radius: 4px;
  font-weight: bold;
}

.message.success {
  background: #d4edda;
  color: #155724;
}

.buttons {
  margin-top: 20px;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

## Value Range Configuration

Configure minimum and maximum values for the progressbar.

### Basic Range Setup

```vue
<template>
  <div class="range-setup">
    <h3>Custom Value Range</h3>

    <!-- Default range (0-100) -->
    <div class="range-section">
      <label>Default Range (0-100)</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="50"
        :minimum="0"
        :maximum="100"
        :value="50"
      >
      </ejs-progressbar>
    </div>

    <!-- Custom range (0-50) -->
    <div class="range-section">
      <label>Custom Range (0-50), Value: 25</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="50"
        :minimum="0"
        :maximum="50"
        :value="25"
      >
      </ejs-progressbar>
    </div>

    <!-- Large range (0-1000) -->
    <div class="range-section">
      <label>Large Range (0-1000), Value: 500</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="50"
        :minimum="0"
        :maximum="1000"
        :value="500"
      >
      </ejs-progressbar>
    </div>

    <!-- Offset range (100-200) -->
    <div class="range-section">
      <label>Offset Range (100-200), Value: 150</label>
      <ejs-progressbar
        id="progressbar4"
        type="Linear"
        height="50"
        :minimum="100"
        :maximum="200"
        :value="150"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.range-setup {
  padding: 20px;
}

.range-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

### Percentage Calculation with Custom Range

```vue
<template>
  <div class="percentage-calc">
    <h3>Percentage Calculation (Custom Range)</h3>

    <div class="range-info">
      <p>Range: {{ minimum }} - {{ maximum }}</p>
      <p>Current Value: {{ currentValue }}</p>
      <p>Percentage: {{ percentage }}%</p>
    </div>

    <ejs-progressbar
      :key="currentValue"
      type="Linear"
      height="60"
      :minimum="minimum"
      :maximum="maximum"
      :value="currentValue"
      :showProgressValue="true"
      :textRender="customPercentage"
    >
    </ejs-progressbar>

    <div class="slider-control">
      <input 
        v-model.number="currentValue" 
        type="range" 
        :min="minimum" 
        :max="maximum"
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const minimum = ref(0);
const maximum = ref(500);
const currentValue = ref(250);

const percentage = computed(() => {
  const range = maximum.value - minimum.value;
  const offset = currentValue.value - minimum.value;
  return Math.round((offset / range) * 100);
});

const customPercentage = (args) => {
  const range = maximum.value - minimum.value;
  const offset = currentValue.value - minimum.value;
  const percent = Math.round((offset / range) * 100);
  args.text = `${percent}%`;
};
</script>

<style scoped>
.percentage-calc {
  padding: 20px;
}

.range-info {
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 20px;
}

.range-info p {
  margin: 5px 0;
}

.slider-control {
  margin-top: 20px;
  text-align: center;
}

input[type="range"] {
  width: 200px;
}
</style>
```

### Score/Rating Range

```vue
<template>
  <div class="score-range">
    <h3>Score/Rating Progressbar</h3>

    <ejs-progressbar
      :key="score"
      type="Circular"
      height="220px"
      width="220px"
      :minimum="0"
      :maximum="10"
      :value="score"
      :showProgressValue="true"
      :textRender="scoreFormat"
      :progressColor="scoreColor"
    >
    </ejs-progressbar>

    <div class="score-controls">
      <p>Current Score: {{ score }}/10</p>
      <p>Rating: {{ rating }}</p>
    </div>

    <input 
      v-model.number="score" 
      type="range" 
      min="0" 
      max="10"
      style="width: 200px; margin-top: 20px;"
    >
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const score = ref(7);

const rating = computed(() => {
  if (score.value < 3) return "Poor";
  if (score.value < 5) return "Fair";
  if (score.value < 7) return "Good";
  if (score.value < 9) return "Very Good";
  return "Excellent";
});

const scoreColor = computed(() => {
  if (score.value < 3) return "#dc3545";
  if (score.value < 5) return "#fd7e14";
  if (score.value < 7) return "#ffc107";
  if (score.value < 9) return "#17a2b8";
  return "#28a745";
});

const scoreFormat = (args) => {
  args.text = `${score.value}/10`;
};
</script>

<style scoped>
.score-range {
  text-align: center;
  padding: 20px;
}

.score-controls {
  margin: 20px 0;
}

.score-controls p {
  margin: 5px 0;
  font-weight: bold;
}
</style>
```

## Event Patterns

### Combined Events Pattern

```vue
<template>
  <div class="event-pattern">
    <h3>Event Pattern Demo</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="progValue"
      :valueChanged="onValueChanged"
      :progressCompleted="onCompleted"
      :showProgressValue="true"
    >
    </ejs-progressbar>

    <div class="event-log">
      <h4>Event Log</h4>
      <ul>
        <li v-for="(log, index) in eventLog" :key="index">
          {{ log }}
        </li>
      </ul>
    </div>

    <button @click="simulateProgress">Simulate Progress</button>
    <button @click="clearLog">Clear Log</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const progValue = ref(0);
const eventLog = ref([]);

const onValueChanged = (args) => {
  const time = new Date().toLocaleTimeString();
  eventLog.value.unshift(`[${time}] Value changed to ${args.value}%`);
  limitLog();
};

const onCompleted = (args) => {
  const time = new Date().toLocaleTimeString();
  eventLog.value.unshift(`[${time}] ✓ Progress completed!`);
  limitLog();
};

const limitLog = () => {
  if (eventLog.value.length > 15) {
    eventLog.value.pop();
  }
};

const simulateProgress = () => {
  progValue.value = 0;
  const interval = setInterval(() => {
    progValue.value += Math.random() * 25;
    
    if (progValue.value >= 100) {
      progValue.value = 100;
      clearInterval(interval);
    }
  }, 300);
};

const clearLog = () => {
  eventLog.value = [];
};
</script>

<style scoped>
.event-pattern {
  padding: 20px;
}

.event-log {
  margin: 20px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.event-log h4 {
  margin-top: 0;
}

.event-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-log li {
  padding: 4px;
  font-size: 12px;
  color: #333;
  border-bottom: 1px solid #ddd;
}

button {
  margin-top: 15px;
  margin-right: 10px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
```

## Event & Range Summary

| Event | Triggers | Use Case |
|-------|----------|----------|
| `valueChanged` | Any value change | Track progress, update UI |
| `progressCompleted` | Value reaches 100% | Completion notification |

| Range Feature | Purpose | Example |
|---------------|---------|---------|
| `minimum` | Start value | 0 or 100 |
| `maximum` | End value | 100, 50, 1000 |
| Custom range | Non-standard scale | 0-50, 100-200, 0-10 |
| Percentage calculation | Convert to percentage | Display % from any range |

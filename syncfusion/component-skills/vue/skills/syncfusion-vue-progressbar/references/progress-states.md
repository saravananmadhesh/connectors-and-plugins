# Progress States

## Table of Contents
- [Determinate State](#determinate-state)
  - [Basic Determinate Progress](#basic-determinate-progress)
  - [Determinate with Animation](#determinate-with-animation)
  - [Circular Determinate Progress](#circular-determinate-progress)
- [Indeterminate State](#indeterminate-state)
  - [Basic Indeterminate Progress](#basic-indeterminate-progress)
  - [Indeterminate Loading Indicator](#indeterminate-loading-indicator)
  - [Switching from Indeterminate to Determinate](#switching-from-indeterminate-to-determinate)
- [Buffer/Secondary Progress State](#buffersecondary-progress-state)
  - [Basic Buffer Progress](#basic-buffer-progress)
  - [Video Streaming with Buffer](#video-streaming-with-buffer)
  - [Circular Buffer Progress](#circular-buffer-progress)
- [State Transitions](#state-transitions)
  - [Transitioning Between States](#transitioning-between-states)
- [Choosing the Right State](#choosing-the-right-state)
  - [Use Determinate When:](#use-determinate-when)
  - [Use Indeterminate When:](#use-indeterminate-when)
  - [Use Buffer When:](#use-buffer-when)
  
## Determinate State

The determinate state is used when the exact progress amount is known. This is the default state.

### Basic Determinate Progress

```vue
<template>
  <ejs-progressbar
    id="percentage"
    type="Linear"
    height="60"
    :value="progressValue"
  >
  </ejs-progressbar>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const progressValue = 100;
</script>
```

### Determinate with Animation

```vue
<template>
  <div>
    <h3>Download Progress (Determinate)</h3>
    <ejs-progressbar
      type="Linear"
      height="60"
      :value="downloadProgress"
      :animation="animation"
      :showProgressValue="true"
    >
    </ejs-progressbar>

    <button @click="simulateDownload">Start Download</button>
    <span class="status">{{ downloadStatus }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const downloadProgress = ref(0);
const downloadStatus = ref("Ready");

const animation = {
  enable: true,
  duration: 500,
  delay: 0
};

const simulateDownload = () => {
  downloadStatus.value = "Downloading...";
  downloadProgress.value = 0;
  
  let increment = 0;
  const interval = setInterval(() => {
    increment += Math.random() * 15;
    downloadProgress.value = Math.min(increment, 100);
    
    if (downloadProgress.value >= 100) {
      clearInterval(interval);
      downloadStatus.value = "Download Complete!";
    }
  }, 500);
};
</script>

<style scoped>
button {
  padding: 8px 16px;
  margin-top: 10px;
  cursor: pointer;
}

.status {
  margin-left: 15px;
  font-weight: bold;
}
</style>
```

### Circular Determinate Progress

```vue
<template>
  <div class="progress-container">
    <h3>Task Completion</h3>
    <EjsProgressbar
      :key="taskProgress"
      type="Circular"
      height="200px"
      width="200px"
      :value="taskProgress"
      :animation="animation"
      :showProgressValue="true"
    />

    <p>{{ taskProgress }}% Complete</p>

    <div class="button-group">
      <button @click="incrementProgress">+10%</button>
      <button @click="decrementProgress">-10%</button>
      <button @click="resetProgress">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const taskProgress = ref(0);

const animation = {
  enable: true,
  duration: 1000,
  delay: 0
};

const incrementProgress = () => {
  taskProgress.value = Math.min(taskProgress.value + 10, 100);
};

const decrementProgress = () => {
  taskProgress.value = Math.max(taskProgress.value - 10, 0);
};

const resetProgress = () => {
  taskProgress.value = 0;
};
</script>

<style scoped>
.progress-container {
  text-align: center;
  padding: 20px;
}

.button-group {
  margin-top: 15px;
}

button {
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
```

## Indeterminate State

The indeterminate state is used when the exact progress amount is unknown. Useful for operations where you can't calculate total time.

### Basic Indeterminate Progress

```vue
<template>
  <ejs-progressbar
    id="indeterminate"
    type="Linear"
    height="60"
    :value="20"
    :isIndeterminate="true"
  >
  </ejs-progressbar>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>
```

### Indeterminate Loading Indicator

```vue
<template>
  <div class="loading-container">
    <h3>Loading Data...</h3>
    <div class="progress-section">
      <h4>Linear Indeterminate</h4>
      <EjsProgressbar
        :key="'linear-' + isLoading"
        id="linearPB"
        value="20"
        type="Linear"
        height="60"
        :isIndeterminate="isLoading"
      />
    </div>

    <div class="progress-section">
      <h4>Circular Indeterminate</h4>
      <EjsProgressbar
        :key="'circular-' + isLoading"
        id="circularPB"
        type="Circular"
        value="20"
        height="160px"
        width="160px"
        :isIndeterminate="isLoading"
      />
    </div>

    <button @click="startLoading">Start Loading</button>
    <button @click="stopLoading">Stop Loading</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const isLoading = ref(false);
let timer = null;

const startLoading = () => {
  isLoading.value = true;
  console.log("Loading started (indeterminate state)");

  clearTimeout(timer);
  timer = setTimeout(() => {
    isLoading.value = false;
    console.log("Loading completed");
  }, 3000);
};

const stopLoading = () => {
  clearTimeout(timer);
  isLoading.value = false;
  console.log("Loading stopped");
};
</script>

<style scoped>
.loading-container {
  padding: 20px;
  text-align: center;
}

.progress-section {
  margin: 30px 0;
}

button {
  margin: 10px 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

### Switching from Indeterminate to Determinate

```vue
<template>
  <div class="progress-container">
    <h3>API Data Loading</h3>
    
    <ejs-progressbar
      :key="dataLoaded ? 'determinate' : 'indeterminate'"
      type="Linear"
      height="60"
      :value="apiProgress"
      :isIndeterminate="!dataLoaded"
      :animation="animation"
      :showProgressValue="true"
    >
    </ejs-progressbar>

    <p v-if="!dataLoaded">Loading data from server...</p>
    <p v-else>Data loaded successfully! {{ apiProgress }}%</p>

    <button @click="fetchData">Fetch Data</button>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const apiProgress = ref(0);
const dataLoaded = ref(false);

const animation = {
  enable: true,
  duration: 800,
  delay: 0
};
const fetchData = async () => {

  dataLoaded.value = false;
  apiProgress.value = 0;
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Switch to determinate progress
  dataLoaded.value = true;

  await nextTick();
  
  // Animate to 100%
  let currentProgress = 0;
  const interval = setInterval(() => {
    currentProgress += Math.random() * 30;
    apiProgress.value = Math.min(currentProgress, 100);
    
    if (apiProgress.value >= 100) {
      clearInterval(interval);
    }
  }, 300);
};
</script>

<style scoped>
.progress-container {
  text-align: center;
  padding: 20px;
}

button {
  margin-top: 15px;
  padding: 8px 16px;
  cursor: pointer;
}

p {
  margin-top: 10px;
}
</style>
```

## Buffer/Secondary Progress State

Buffer (secondary) progress is used for scenarios where there are two progress values: primary (current) and secondary (buffered/downloaded).

### Basic Buffer Progress

```vue
<template>
  <ejs-progressbar
    type="Linear"
    height="60"
    :value="primaryProgress"
    :secondaryProgress="secondaryProgress"
  >
  </ejs-progressbar>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const primaryProgress = 40;    // Currently playing
const secondaryProgress = 60;  // Buffered
</script>
```

### Video Streaming with Buffer

```vue
<template>
  <div class="video-container">
    <h3>Video Streaming Progress</h3>
    
    <div class="video-box">
      <p>▶ Video Playing</p>
      <p class="time">{{ playTime }}s / {{ totalTime }}s</p>
    </div>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="playProgress"
      :secondaryProgress="bufferProgress"
      :animation="animation"
    >
    </ejs-progressbar>

    <div class="legend">
      <div class="legend-item">
        <span class="primary-box"></span>
        <span>Played: {{ playProgress }}%</span>
      </div>
      <div class="legend-item">
        <span class="secondary-box"></span>
        <span>Buffered: {{ bufferProgress }}%</span>
      </div>
    </div>

    <div class="controls">
      <button @click="play">Play</button>
      <button @click="pause">Pause</button>
      <button @click="resetVideo">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const playProgress = ref(0);
const bufferProgress = ref(15);
const playTime = ref(0);
const totalTime = ref(120);
let playInterval = null;

const animation = {
  enable: true,
  duration: 500,
  delay: 0
};

const play = () => {
  if (playInterval) return;
  
  playInterval = setInterval(() => {
    playProgress.value += 1;
    playTime.value += 1;
    
    // Simulate buffering ahead of playback
    if (bufferProgress.value < 95) {
      bufferProgress.value = Math.min(bufferProgress.value + Math.random() * 3, 100);
    }
    
    if (playProgress.value >= 100) {
      clearInterval(playInterval);
      playInterval = null;
    }
  }, 500);
};

const pause = () => {
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
};

const resetVideo = () => {
  pause();
  playProgress.value = 0;
  bufferProgress.value = 15;
  playTime.value = 0;
};
</script>

<style scoped>
.video-container {
  padding: 20px;
}

.video-box {
  background: #f0f0f0;
  padding: 30px;
  margin-bottom: 20px;
  text-align: center;
  border-radius: 4px;
}

.video-box p {
  margin: 5px 0;
}

.time {
  font-weight: bold;
  color: #007bff;
}

.legend {
  display: flex;
  gap: 20px;
  margin: 15px 0;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.primary-box {
  width: 20px;
  height: 20px;
  background: #0078d4;
}

.secondary-box {
  width: 20px;
  height: 20px;
  background: #d4d4d4;
}

.controls {
  text-align: center;
  margin-top: 15px;
}

button {
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
```

### Circular Buffer Progress

```vue
<template>
  <div class="download-container">
    <h3>Download Progress</h3>
    
    <ejs-progressbar
      type="Circular"
      height="200px"
      width="200px"
      :value="downloadProgress"
      :secondaryProgress="totalProgress"
      :animation="animation"
    >
    </ejs-progressbar>

    <div class="download-info">
      <p>Downloaded: {{ downloadProgress }}%</p>
      <p>Available: {{ totalProgress }}%</p>
      <p>Speed: {{ speed }}MB/s</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const downloadProgress = ref(35);
const totalProgress = ref(65);
const speed = ref(2.5);

const animation = {
  enable: true,
  duration: 800,
  delay: 0
};
</script>

<style scoped>
.download-container {
  text-align: center;
  padding: 20px;
}

.download-info {
  margin-top: 20px;
}

.download-info p {
  margin: 8px 0;
  font-size: 16px;
}
</style>
```

## State Transitions

### Transitioning Between States

```vue
<template>
  <div class="transition-container">
    <h3>Progress State Transition</h3>

    <div class="state-selector">
      <button 
        @click="setDeterminate"
        :class="{ active: currentState === 'determinate' }"
      >
        Determinate
      </button>
      <button 
        @click="setIndeterminate"
        :class="{ active: currentState === 'indeterminate' }"
      >
        Indeterminate
      </button>
      <button 
        @click="setBuffer"
        :class="{ active: currentState === 'buffer' }"
      >
        Buffer
      </button>
    </div>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="progress"
      :isIndeterminate="currentState === 'indeterminate'"
      :secondaryProgress="currentState === 'buffer' ? secondaryProg : undefined"
      :animation="animation"
    >
    </ejs-progressbar>

    <p class="description">{{ stateDescription }}</p>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const currentState = ref("determinate");
const progress = ref(50);
const secondaryProg = ref(75);

const animation = {
  enable: true,
  duration: 800,
  delay: 0
};

const stateDescription = computed(() => {
  switch (currentState.value) {
    case "determinate":
      return "Determinate: Exact progress is known (50%)";
    case "indeterminate":
      return "Indeterminate: Progress is unknown, animation shows loading activity";
    case "buffer":
      return "Buffer: Dual progress (50% played, 75% buffered)";
    default:
      return "";
  }
});

const setDeterminate = async () => {
  currentState.value = "determinate";
  progress.value = 50;
};

const setIndeterminate = async () => {
  currentState.value = "indeterminate";
};

const setBuffer = async () => {
  currentState.value = "buffer";
};
</script>

<style scoped>
.transition-container {
  padding: 20px;
}

.state-selector {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: white;
}

button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.description {
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}
</style>
```

## Choosing the Right State

### Use Determinate When:
- You know the total time/amount for the operation
- You can calculate percentage completion
- You want to show exact progress to user
- Examples: File upload/download, installation, form steps

**Best For:**
- File operations (upload, download)
- Installation processes
- Multi-step operations
- Tasks with known duration

### Use Indeterminate When:
- Operation duration is unknown
- You cannot calculate progress percentage
- Operation is processing data of unknown size
- You're waiting for an async operation to complete
- Examples: API calls, data processing, loading

**Best For:**
- Loading indicators
- API calls
- Data processing
- Initial page loads
- "Waiting for server" scenarios

### Use Buffer When:
- Multiple progress states exist simultaneously
- You have both current and ahead-of-current progress
- Showing two related metrics
- Examples: Video streaming (playback vs buffer), dual progress

**Best For:**
- Video/audio streaming
- Download with verification
- Data streaming scenarios
- Dual metric tracking

| State | Know Total? | User Expectation | Example |
|-------|------------|------------------|---------|
| Determinate | Yes | Exact time remaining | File transfer |
| Indeterminate | No | System is working | Loading data |
| Buffer | Partially | Dual metrics | Video streaming |

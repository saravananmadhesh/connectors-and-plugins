# Animation Configuration

## Table of Contents
- [Basic Animation Setup](#basic-animation-setup)
  - [Enable Animation](#enable-animation)
  - [With and Without Animation](#with-and-without-animation)
- [Duration Configuration](#duration-configuration)
  - [Various Duration Examples](#various-duration-examples)
- [Delay Configuration](#delay-configuration)
  - [Animation with Delay](#animation-with-delay)
- [Animation with Circular Progressbar](#animation-with-circular-progressbar)
- [Animation in Indeterminate State](#animation-in-indeterminate-state)
- [Progressive Animation Pattern](#progressive-animation-pattern)
- [Animation Best Practices](#animation-best-practices)
  - [Performance Optimization](#performance-optimization)
- [Animation Recommendations by Use Case](#animation-recommendations-by-use-case)
- [Disabling Animation](#disabling-animation)

## Basic Animation Setup

Animation makes progress transitions smooth and provides visual feedback. Configure animations using the `animation` property.

### Enable Animation

```vue
<template>
  <ejs-progressbar
    id="animated"
    type="Linear"
    height="60"
    :value="100"
    :animation="animation"
  >
  </ejs-progressbar>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const animation = {
  enable: true,        // Enable animation
  duration: 2000,      // Duration in milliseconds
  delay: 0             // Delay before animation starts
};
</script>
```

### With and Without Animation

```vue
<template>
  <div>
    <!-- With Animation -->
    <div>
      <h4>With Animation (2s)</h4>
      <ejs-progressbar
        id="withanimation"
        type="Linear"
        height="60"
        :value="100"
        :animation="{ enable: true, duration: 2000, delay: 0 }"
      >
      </ejs-progressbar>
    </div>

    <!-- Without Animation (instant) -->
    <div>
      <h4>Without Animation (instant)</h4>
      <ejs-progressbar
        id="withoutanimation"
        type="Linear"
        height="60"
        :value="100"
        :animation="{ enable: false }"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
div {
  margin-bottom: 20px;
}

h4 {
  margin-bottom: 10px;
}
</style>
```

## Duration Configuration

Duration controls how long the animation takes to complete.

### Various Duration Examples

```vue
<template>
  <div class="duration-container">
    <h3>Animation Duration Comparison</h3>

    <!-- Very Fast (500ms) -->
    <div class="duration-section">
      <label>Very Fast (500ms)</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="50"
        :value="animValue"
        :animation="{ enable: true, duration: 500, delay: 0 }"
      >
      </ejs-progressbar>
    </div>

    <!-- Fast (1000ms) -->
    <div class="duration-section">
      <label>Fast (1s)</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="50"
        :value="animValue"
        :animation="{ enable: true, duration: 1000, delay: 0 }"
      >
      </ejs-progressbar>
    </div>

    <!-- Normal (2000ms) -->
    <div class="duration-section">
      <label>Normal (2s)</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="50"
        :value="animValue"
        :animation="{ enable: true, duration: 2000, delay: 0 }"
      >
      </ejs-progressbar>
    </div>

    <!-- Slow (3000ms) -->
    <div class="duration-section">
      <label>Slow (3s)</label>
      <ejs-progressbar
        id="progressbar4"
        type="Linear"
        height="50"
        :value="animValue"
        :animation="{ enable: true, duration: 3000, delay: 0 }"
      >
      </ejs-progressbar>
    </div>

    <!-- Very Slow (5000ms) -->
    <div class="duration-section">
      <label>Very Slow (5s)</label>
      <ejs-progressbar
        type="Linear"
        height="50"
        :value="animValue"
        :animation="{ enable: true, duration: 5000, delay: 0 }"
      >
      </ejs-progressbar>
    </div>

    <button @click="resetAnimation">Reset All</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const animValue = ref(0);

const resetAnimation = () => {
  animValue.value = 0;
  
  // Trigger animation again
  setTimeout(() => {
    animValue.value = 100;
  }, 100);
};

// Initial trigger
resetAnimation();
</script>

<style scoped>
.duration-container {
  padding: 20px;
}

.duration-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

button {
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
```

## Delay Configuration

Delay controls when animation starts after the component is rendered or value changes.

### Animation with Delay

```vue
<template>
  <div class="delay-container">
    <h3>Animation Delay Examples</h3>

    <!-- No Delay -->
    <div class="delay-section">
      <label>Immediate (No Delay)</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="50"
        :value="delayValue"
        :animation="{ enable: true, duration: 2000, delay: 0 }"
      >
      </ejs-progressbar>
    </div>

    <!-- 500ms Delay -->
    <div class="delay-section">
      <label>500ms Delay</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="50"
        :value="delayValue"
        :animation="{ enable: true, duration: 2000, delay: 500 }"
      >
      </ejs-progressbar>
    </div>

    <!-- 1000ms Delay -->
    <div class="delay-section">
      <label>1s Delay</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="50"
        :value="delayValue"
        :animation="{ enable: true, duration: 2000, delay: 1000 }"
      >
      </ejs-progressbar>
    </div>

    <!-- 2000ms Delay -->
    <div class="delay-section">
      <label>2s Delay</label>
      <ejs-progressbar
        id="progressbar4"
        type="Linear"
        height="50"
        :value="delayValue"
        :animation="{ enable: true, duration: 2000, delay: 2000 }"
      >
      </ejs-progressbar>
    </div>

    <button @click="triggerDelayAnimation">Start All</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const delayValue = ref(0);

const triggerDelayAnimation = () => {
  delayValue.value = 0;
  
  setTimeout(() => {
    delayValue.value = 100;
  }, 100);
};

triggerDelayAnimation();
</script>

<style scoped>
.delay-container {
  padding: 20px;
}

.delay-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

button {
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
```

## Animation with Circular Progressbar

```vue
<template>
  <div class="circular-animation">
    <h3>Circular Progressbar with Animation</h3>

    <div class="circle-demo">
      <ejs-progressbar
        type="Circular"
        height="200px"
        width="200px"
        :value="circularValue"
        :animation="{ enable: true, duration: 3000, delay: 0 }"
        :showProgressValue="true"
      >
      </ejs-progressbar>
    </div>

    <p>{{ circularValue }}% Complete</p>

    <button @click="startCircularAnimation">Start</button>
    <button @click="resetCircularAnimation">Reset</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const circularValue = ref(0);

const startCircularAnimation = () => {
  if (circularValue.value < 100) {
    const increment = 10;
    const steps = (100 - circularValue.value) / increment;
    const stepDelay = 300 / steps;
    
    let step = 0;
    const interval = setInterval(() => {
      circularValue.value += increment;
      step++;
      
      if (circularValue.value >= 100) {
        clearInterval(interval);
        circularValue.value = 100;
      }
    }, stepDelay);
  }
};

const resetCircularAnimation = () => {
  circularValue.value = 0;
};
</script>

<style scoped>
.circular-animation {
  text-align: center;
  padding: 20px;
}

.circle-demo {
  margin: 30px 0;
  display: flex;
  justify-content: center;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
}

p {
  font-weight: bold;
  font-size: 18px;
}
</style>
```

## Animation in Indeterminate State

```vue
<template>
  <div class="indeterminate-animation">
    <h3>Indeterminate Animation</h3>

    <div class="indeterminate-demo">
      <ejs-progressbar
        type="Linear"
        height="60"
        :value="20"
        :isIndeterminate="true"
        :animation="{ enable: true, duration: 2000, delay: 0 }"
      >
      </ejs-progressbar>
    </div>

    <p>Animation continuously loops for indeterminate progress</p>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.indeterminate-animation {
  padding: 20px;
}

.indeterminate-demo {
  margin: 20px 0;
}

p {
  color: #666;
  margin-top: 15px;
}
</style>
```

## Progressive Animation Pattern

```vue
<template>
  <div class="progressive-animation">
    <h3>Progressive Loading Animation</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="progressValue"
      :animation="currentAnimation"
      :showProgressValue="true"
    >
    </ejs-progressbar>

    <div class="status-text">
      <p v-if="progressValue < 100">{{ progressValue }}% Loaded</p>
      <p v-else style="color: green;">Complete! ✓</p>
    </div>

    <button @click="startProgressive">Simulate Load</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const progressValue = ref(0);

const currentAnimation = {
  enable: true,
  duration: 800,
  delay: 0
};

const startProgressive = () => {
  progressValue.value = 0;
  
  const increment = () => {
    let increase = Math.random() * 30;
    progressValue.value = Math.min(progressValue.value + increase, 100);
    
    if (progressValue.value < 100) {
      setTimeout(increment, 600);
    }
  };
  
  increment();
};
</script>

<style scoped>
.progressive-animation {
  padding: 20px;
}

.status-text {
  margin: 15px 0;
  font-weight: bold;
}

button {
  padding: 8px 16px;
  cursor: pointer;
  margin-top: 15px;
}
</style>
```

## Animation Best Practices

### Performance Optimization

```vue
<template>
  <div class="optimization">
    <h3>Animation Performance Tips</h3>

    <!-- Shorter durations for frequent updates -->
    <div class="tip-section">
      <h4>Fast Updates (500ms)</h4>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="50"
        :value="fastValue"
        :animation="{ enable: true, duration: 500, delay: 0 }"
      >
      </ejs-progressbar>
    </div>

    <!-- Disable animation for very rapid updates -->
    <div class="tip-section">
      <h4>Rapid Updates (No Animation)</h4>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="50"
        :value="rapidValue"
        :animation="{ enable: false }"
      >
      </ejs-progressbar>
    </div>

    <!-- Use appropriate delay for initial load -->
    <div class="tip-section">
      <h4>Initial Load (with delay)</h4>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="50"
        :value="initialValue"
        :animation="{ enable: true, duration: 2000, delay: 500 }"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const fastValue = ref(60);
const rapidValue = ref(75);
const initialValue = ref(45);
</script>

<style scoped>
.optimization {
  padding: 20px;
}

.tip-section {
  margin-bottom: 30px;
}

.tip-section h4 {
  margin-bottom: 10px;
}
</style>
```

## Animation Recommendations by Use Case

| Use Case | Duration | Delay | Best For |
|----------|----------|-------|----------|
| File Download | 800-1000ms | 0ms | Smooth, user-friendly |
| Initial Load | 2000-3000ms | 500ms | Noticeable but not jarring |
| Value Updates | 500ms | 0ms | Responsive to rapid changes |
| Streaming | 1000ms | 0ms | Consistent buffering indication |
| Indeterminate | 2000ms | 0ms | Smooth looping animation |
| Circular Tasks | 2000-3000ms | 0ms | Prominent visual effect |

## Disabling Animation

If you need to disable animation for performance or other reasons:

```vue
<template>
  <ejs-progressbar
    type="Linear"
    height="60"
    :value="100"
    :animation="{ enable: false }"
  >
  </ejs-progressbar>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>
```

Use this when:
- Browser performance is critical
- Rapid value updates (>10 per second)
- Accessibility requirements demand no animation
- Mobile devices with limited resources

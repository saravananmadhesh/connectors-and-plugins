# Annotations & Labels

## Table of Contents
- [Progress Value Display](#progress-value-display)
  - [Basic Progress Value Display](#basic-progress-value-display)
  - [Without Value Display](#without-value-display)
- [Annotations in Circular Progressbar](#annotations-in-circular-progressbar)
  - [Module Injection Setup](#module-injection-setup)
  - [Basic Annotation with Text](#basic-annotation-with-text)
  - [Annotation with Icon and Text](#annotation-with-icon-and-text)
- [Custom Content in Annotations](#custom-content-in-annotations)
  - [HTML Content Annotation](#html-content-annotation)
  - [Annotation with Button/Link](#annotation-with-buttonlink)
- [Text Rendering & Formatting](#text-rendering--formatting)
  - [Custom Text Format](#custom-text-format)
  - [Conditional Text Formatting](#conditional-text-formatting)
- [Label Styling](#label-styling)
  - [Label Color Styling](#label-color-styling)
  - [Circular Label Styling](#circular-label-styling)
  - [Dynamic Label Updates](#dynamic-label-updates)
- [Summary: When to Use Annotations and Labels](#summary-when-to-use-annotations-and-labels)

## Progress Value Display

Use `showProgressValue` to display progress as text label or percentage.

### Basic Progress Value Display

```vue
<template>
  <div class="value-display">
    <h3>Progress Value Display</h3>

    <!-- Linear with value display -->
    <div class="display-section">
      <label>Linear with Percentage</label>
      <ejs-progressbar
        id="linear"
        type="Linear"
        height="60"
        :value="75"
        :showProgressValue="true"
        :animation="animation"
      >
      </ejs-progressbar>
    </div>

    <!-- Circular with value display -->
    <div class="display-section">
      <label>Circular with Percentage</label>
      <ejs-progressbar
        id="circular"
        type="Circular"
        height="200px"
        width="200px"
        :value="75"
        :showProgressValue="true"
        :animation="animation"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const animation = {
  enable: true,
  duration: 2000,
  delay: 0
};
</script>

<style scoped>
.value-display {
  padding: 20px;
}

.display-section {
  margin-bottom: 40px;
}

label {
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
}
</style>
```

### Without Value Display

```vue
<template>
  <div class="no-value-container">
    <h3>Progressbar without Value Display</h3>

    <ejs-progressbar
      type="Linear"
      height="50"
      :value="85"
      :showProgressValue="false"
    >
    </ejs-progressbar>

    <p>Value display disabled - no percentage shown</p>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.no-value-container {
  padding: 20px;
}

p {
  margin-top: 10px;
  color: #666;
}
</style>
```

## Annotations in Circular Progressbar

Annotations allow you to add custom content to the center of circular progressbars.

### Module Injection Setup

Before using annotations, inject the `ProgressAnnotation` service:

**Composition API:**
```vue
<script setup>
import { provide } from "vue";
import { ProgressBarComponent as EjsProgressbar, ProgressAnnotation, ProgressBarAnnotationsDirective as EProgressbarAnnotations, ProgressBarAnnotationDirective as EProgressbarAnnotation } from "@syncfusion/ej2-vue-progressbar";

provide('progressbar', [ProgressAnnotation]);
</script>
```

**Options API:**
```vue
<script>
import { ProgressBarComponent, ProgressAnnotation, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective } from "@syncfusion/ej2-vue-progressbar";

export default {
  provide: {
    progressbar: [ProgressAnnotation]
  }
}
</script>
```

### Basic Annotation with Text

```vue
<template>
  <div class="annotation-container">
    <h3>Circular Progressbar with Text Annotation</h3>

    <ejs-progressbar
      type="Circular"
      height="220px"
      width="220px"
      :value="60"
      :animation="animation"
    >
      <e-progressbar-annotations>
        <e-progressbar-annotation
          :content="percentageContent"
        >
        </e-progressbar-annotation>
      </e-progressbar-annotations>
    </ejs-progressbar>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { ProgressBarComponent as EjsProgressbar, ProgressAnnotation, ProgressBarAnnotationsDirective as EProgressbarAnnotations, ProgressBarAnnotationDirective as EProgressbarAnnotation } from "@syncfusion/ej2-vue-progressbar";

provide('progressbar', [ProgressAnnotation]);

const animation = {
  enable: true,
  duration: 2000,
  delay: 0
};

const percentageContent = '<div style="font-size:28px;font-weight:bold;color:#007bff;">60%</div>';
</script>

<style scoped>
.annotation-container {
  text-align: center;
  padding: 20px;
}
</style>
```

### Annotation with Icon and Text

```vue
<template>
  <div class="icon-annotation">
    <h3>Annotation with Icon and Text</h3>

    <ejs-progressbar
      type="Circular"
      height="220px"
      width="220px"
      :value="75"
    >
      <e-progressbar-annotations>
        <e-progressbar-annotation
          :content="iconContent"
        >
        </e-progressbar-annotation>
      </e-progressbar-annotations>
    </ejs-progressbar>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { ProgressBarComponent as EjsProgressbar, ProgressAnnotation, ProgressBarAnnotationsDirective as EProgressbarAnnotations, ProgressBarAnnotationDirective as EProgressbarAnnotation } from "@syncfusion/ej2-vue-progressbar";

provide('progressbar', [ProgressAnnotation]);

const iconContent = `
  <div style="text-align: center;">
    <div style="font-size: 40px; margin-bottom: 5px;">✓</div>
    <div style="font-size: 18px; font-weight: bold; color: #28a745;">75% Done</div>
  </div>
`;
</script>

<style scoped>
.icon-annotation {
  text-align: center;
  padding: 20px;
}
</style>
```

## Custom Content in Annotations

Add HTML content, images, or interactive elements to annotations.

### HTML Content Annotation

```vue
<template>
  <div class="html-annotation">
    <h3>Annotation with Rich HTML</h3>

    <ejs-progressbar
      type="Circular"
      height="240px"
      width="240px"
      :value="50"
      radius="100%"
      innerRadius="70%"
      :trackThickness="50"
      :progressThickness="50"
    >
      <e-progressbar-annotations>
        <e-progressbar-annotation
          :content="richContent"
        >
        </e-progressbar-annotation>
      </e-progressbar-annotations>
    </ejs-progressbar>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { ProgressBarComponent as EjsProgressbar, ProgressAnnotation, ProgressBarAnnotationsDirective as EProgressbarAnnotations, ProgressBarAnnotationDirective as EProgressbarAnnotation } from "@syncfusion/ej2-vue-progressbar";

provide('progressbar', [ProgressAnnotation]);

const richContent = `
  <div style="text-align: center;">
    <div style="font-size: 24px; font-weight: bold; color: #007bff;">50%</div>
    <div style="font-size: 12px; color: #666; margin-top: 5px;">In Progress</div>
    <div style="margin-top: 10px; font-size: 18px;">⏳</div>
  </div>
`;
</script>

<style scoped>
.html-annotation {
  text-align: center;
  padding: 20px;
}
</style>
```

### Annotation with Button/Link

```vue
<template>
  <div class="interactive-annotation">
    <h3>Annotation with Interactive Element</h3>

    <ejs-progressbar
      type="Circular"
      height="240px"
      width="240px"
      :value="progressValue"
      ref="progressRef"
    >
      <e-progressbar-annotations>
        <e-progressbar-annotation
          :content="interactiveContent"
        >
        </e-progressbar-annotation>
      </e-progressbar-annotations>
    </ejs-progressbar>

    <div style="margin-top: 20px;">
      <button @click="pauseProgress">{{ isPaused ? 'Resume' : 'Pause' }}</button>
      <button @click="resetProgress">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed } from "vue";
import { ProgressBarComponent as EjsProgressbar, ProgressAnnotation, ProgressBarAnnotationsDirective as EProgressbarAnnotations, ProgressBarAnnotationDirective as EProgressbarAnnotation } from "@syncfusion/ej2-vue-progressbar";

provide('progressbar', [ProgressAnnotation]);

const progressRef = ref(null);
const progressValue = ref(0);
const isPaused = ref(false);
let progressInterval = null;

const interactiveContent = computed(() => `
  <div style="text-align: center; cursor: pointer;">
    <div style="font-size: 32px; margin-bottom: 8px;">${isPaused.value ? '⏸' : '▶'}</div>
    <div style="font-size: 20px; font-weight: bold; color: #007bff;">${progressValue.value}%</div>
  </div>
`);

const startProgress = () => {
  if (progressInterval) return;
  
  progressInterval = setInterval(() => {
    progressValue.value = Math.min(progressValue.value + 2, 100);
    
    if (progressValue.value >= 100) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }, 500);
};

const pauseProgress = () => {
  isPaused.value = !isPaused.value;
  
  if (isPaused.value && progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  } else if (!isPaused.value) {
    startProgress();
  }
};

const resetProgress = () => {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  progressValue.value = 0;
  isPaused.value = false;
  startProgress();
};

// Auto-start
startProgress();
</script>

<style scoped>
.interactive-annotation {
  text-align: center;
  padding: 20px;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

## Text Rendering & Formatting

Customize how progress value is displayed using `textRender` callback.

### Custom Text Format

```vue
<template>
  <div class="text-render">
    <h3>Custom Text Rendering</h3>

    <!-- Default Format -->
    <div class="format-section">
      <label>Default Format</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="60"
        :value="65"
        :showProgressValue="true"
      >
      </ejs-progressbar>
    </div>

    <!-- Custom Format: "65 / 100" -->
    <div class="format-section">
      <label>Fraction Format (65 / 100)</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="60"
        :value="65"
        :showProgressValue="true"
        :textRender="fractionFormat"
      >
      </ejs-progressbar>
    </div>

    <!-- Custom Format: "Loading... 65%" -->
    <div class="format-section">
      <label>Custom Prefix Format</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="60"
        :value="65"
        :showProgressValue="true"
        :textRender="loadingFormat"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const fractionFormat = (args) => {
  args.text = `${args.text} / 100`;
};

const loadingFormat = (args) => {
  args.text = `Loading... ${args.text}`;
};
</script>

<style scoped>
.text-render {
  padding: 20px;
}

.format-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

### Conditional Text Formatting

```vue
<template>
  <div class="conditional-render">
    <h3>Conditional Text Rendering</h3>

    <ejs-progressbar
      type="Circular"
      height="220px"
      width="220px"
      :value="progressValue"
      :showProgressValue="true"
      :textRender="conditionalFormat"
    >
    </ejs-progressbar>

    <div class="progress-control">
      <input 
        v-model="progressValue" 
        type="range" 
        min="0" 
        max="100"
      >
      <span>{{ progressValue }}%</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const progressValue = ref(50);

const conditionalFormat = (args) => {
  const value = Number(progressValue.value);
  console.log(value)
  if (value < 33) {
    args.text = "Low";
  } else if (value < 67) {
    args.text = "Medium";
  } else {
    args.text = "High";
  }
};
</script>

<style scoped>
.conditional-render {
  text-align: center;
  padding: 20px;
}

.progress-control {
  margin-top: 30px;
}

input {
  width: 200px;
  margin-right: 15px;
}

span {
  font-weight: bold;
}
</style>
```

## Label Styling

Customize the appearance of progress labels.

### Label Color Styling

```vue
<template>
  <div class="label-styling">
    <h3>Label Style Customization</h3>

    <!-- White text on dark -->
    <div class="label-section">
      <label>White Text Label</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="60"
        progressColor="#1a1a1a"
        trackColor="#e9ecef"
        :value="80"
        :showProgressValue="true"
        :labelStyle="{ color: '#FFFFFF' }"
      >
      </ejs-progressbar>
    </div>

    <!-- Custom color -->
    <div class="label-section">
      <label>Custom Color Label</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="60"
        progressColor="#28a745"
        :value="70"
        :showProgressValue="true"
        :labelStyle="{ color: '#28a745', size: '16px', fontWeight: 'bold' }"
      >
      </ejs-progressbar>
    </div>

    <!-- Large bold -->
    <div class="label-section">
      <label>Large Bold Label</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="70"
        :value="90"
        :showProgressValue="true"
        :labelStyle="{ color: '#007bff', size: '24px', fontWeight: 'bold' }"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.label-styling {
  padding: 20px;
}

.label-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

### Circular Label Styling

```vue
<template>
  <div class="circular-label">
    <h3>Circular Progressbar Label Styling</h3>

    <ejs-progressbar
      type="Circular"
      height="220px"
      width="220px"
      :value="labelProgress"
      :showProgressValue="true"
      :labelStyle="{ 
        color: '#FF6B6B', 
        size: '28px', 
        fontWeight: 'bold',
        fontFamily: 'Arial'
      }"
    >
    </ejs-progressbar>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const labelProgress = 72;
</script>

<style scoped>
.circular-label {
  text-align: center;
  padding: 20px;
}
</style>
```

### Dynamic Label Updates

```vue
<template>
  <div class="dynamic-label">
    <h3>Dynamic Label Updates</h3>

    <ejs-progressbar
      :key="Math.floor(downloadProgress)"
      type="Circular"
      height="220px"
      width="220px"
      :value="downloadProgress"
      :showProgressValue="true"
      :labelStyle="labelStyle"
      :textRender="downloadFormat"
    >
    </ejs-progressbar>

    <div class="download-controls">
      <button @click="startDownload">Start Download</button>
      <button @click="pauseDownload">Pause</button>
      <button @click="resetDownload">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const downloadProgress = ref(0);
let downloadInterval = null;
const isDownloading = ref(false);

const labelStyle = computed(() => ({
  color: downloadProgress.value < 50 ? '#FF6B6B' : downloadProgress.value < 80 ? '#FFC107' : '#28a745',
  size: '20px',
  fontWeight: 'bold'
}));

const downloadFormat = (args) => {
  const value = Math.round(downloadProgress.value);
  if (value === 100) {
    args.text = "Complete!";
  } else if (value >= 80) {
    args.text = `${value}% - Finalizing`;
  } else {
    args.text = `${value}% - Downloading`;
  }
};

const startDownload = () => {
  if (isDownloading.value || downloadProgress.value === 100) return;
  
  isDownloading.value = true;
  
  downloadInterval = setInterval(() => {
    downloadProgress.value = Math.min(downloadProgress.value + Math.random() * 15, 100);
    
    if (downloadProgress.value >= 100) {
      clearInterval(downloadInterval);
      downloadInterval = null;
      isDownloading.value = false;
    }
  }, 500);
};

const pauseDownload = () => {
  if (downloadInterval) {
    clearInterval(downloadInterval);
    downloadInterval = null;
    isDownloading.value = false;
  }
};

const resetDownload = () => {
  if (downloadInterval) {
    clearInterval(downloadInterval);
  }
  downloadProgress.value = 0;
  isDownloading.value = false;
};
</script>

<style scoped>
.dynamic-label {
  text-align: center;
  padding: 20px;
}

.download-controls {
  margin-top: 20px;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

## Summary: When to Use Annotations and Labels

| Feature | Use Case | Example |
|---------|----------|---------|
| `showProgressValue` | Simple percentage display | "75%" in the label |
| `labelStyle` | Custom styling of text | Color, font size |
| `textRender` | Custom format | "Downloading... 75%" |
| Annotations | Rich content in circular | Icons, buttons, images |
| `labelStyle` + `textRender` | Styled custom format | Colored, formatted text |

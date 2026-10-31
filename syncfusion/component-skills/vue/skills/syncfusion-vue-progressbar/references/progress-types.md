# Progress Types & Shapes

## Table of Contents
- [Linear Progressbar](#linear-progressbar)
  - [Basic Linear Implementation](#basic-linear-implementation)
  - [Linear with Custom Dimensions](#linear-with-custom-dimensions)
  - [Multiple Linear Progressbars](#multiple-linear-progressbars)
- [Circular Progressbar](#circular-progressbar)
  - [Basic Circular Implementation](#basic-circular-implementation)
  - [Circular with Customization](#circular-with-customization)
- [Type Selection Guide](#type-selection-guide)
  - [Use Linear When:](#use-linear-when)
  - [Use Circular When:](#use-circular-when)
- [Dimensions & Sizing](#dimensions--sizing)
  - [Linear Sizing](#linear-sizing)
  - [Circular Sizing](#circular-sizing)
  - [Responsive Sizing](#responsive-sizing)
- [Key Differences Summary](#key-differences-summary)

## Linear Progressbar

The linear progressbar is typically used as a horizontal rectangular bar in Syncfusion examples.

### Basic Linear Implementation

```vue
<template>
  <ejs-progressbar
    id="determinate"
    type="Linear"
    height="60"
    :value="value"
    :animation="animation"
  >
  </ejs-progressbar>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const value = 100;
const animation = {
  enable: true,
  duration: 2000,
  delay: 0
};
</script>
```

### Linear with Custom Dimensions

```vue
<template>
  <div>
    <!-- Wide linear progressbar -->
    <ejs-progressbar
      id="wide-progress"
      type="Linear"
      width="90%"
      height="40"
      :value="50"
    >
    </ejs-progressbar>

    <!-- Thin linear progressbar -->
    <ejs-progressbar
      id="thin-progress"
      type="Linear"
      width="100%"
      height="8"
      :value="75"
    >
    </ejs-progressbar>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
}
</style>
```

### Multiple Linear Progressbars

```vue
<template>
  <div class="progress-container">
    <!-- Determinate Progress -->
    <div class="progress-section">
      <label>Determinate (Known Progress)</label>
      <ejs-progressbar
        id="determinate"
        type="Linear"
        height="60"
        :value="deterValue"
        :animation="animation"
      >
      </ejs-progressbar>
    </div>

    <!-- Indeterminate Progress -->
    <div class="progress-section">
      <label>Indeterminate (Unknown Progress)</label>
      <ejs-progressbar
        id="indeterminate"
        type="Linear"
        height="60"
        :value="20"
        :isIndeterminate="true"
      >
      </ejs-progressbar>
    </div>

    <!-- Buffer Progress -->
    <div class="progress-section">
      <label>Buffer Progress (Video Streaming)</label>
      <ejs-progressbar
        id="buffer"
        type="Linear"
        height="60"
        :value="40"
        :secondaryProgress="60"
        :animation="animation"
      >
      </ejs-progressbar>
    </div>

    <!-- Segmented Progress -->
    <div class="progress-section">
      <label>Segmented Progress (4 Steps)</label>
      <ejs-progressbar
        id="segmented"
        type="Linear"
        height="60"
        :value="100"
        :segmentCount="4"
        :animation="animation"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const deterValue = 100;
const animation = {
  enable: true,
  duration: 2000,
  delay: 0
};
</script>

<style scoped>
.progress-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
}

.progress-section {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
}

.progress-section label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}
</style>
```

## Circular Progressbar

The circular progressbar displays progress as a circle. Common for dashboard progress indicators and task completion.

### Basic Circular Implementation

```vue
<template>
  <ejs-progressbar
    id="circular"
    type="Circular"
    height="160px"
    width="160px"
    :value="value"
    :animation="animation"
  >
  </ejs-progressbar>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const value = 80;
const animation = {
  enable: true,
  duration: 2000,
  delay: 0
};
</script>
```

### Circular with Customization

```vue
<template>
  <div class="circle-container">
    <!-- Basic Circular -->
    <div class="circle-item">
      <label>Basic</label>
      <ejs-progressbar
        id="determinate"
        type="Circular"
        height="160px"
        width="160px"
        :value="60"
      >
      </ejs-progressbar>
    </div>

    <!-- Indeterminate Circular -->
    <div class="circle-item">
      <label>Indeterminate</label>
      <ejs-progressbar
        id="indeterminate"
        type="Circular"
        height="160px"
        width="160px"
        :value="20"
        :isIndeterminate="true"
      >
      </ejs-progressbar>
    </div>

    <!-- Buffer Circular -->
    <div class="circle-item">
      <label>Buffer</label>
      <ejs-progressbar
        id="buffer"
        type="Circular"
        height="160px"
        width="160px"
        :value="40"
        :secondaryProgress="70"
      >
      </ejs-progressbar>
    </div>

    <!-- Segmented Circular -->
    <div class="circle-item">
      <label>Segmented (8 Parts)</label>
      <ejs-progressbar
        id="segmented"
        type="Circular"
        height="160px"
        width="160px"
        :value="100"
        :segmentCount="8"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.circle-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  padding: 20px;
}

.circle-item {
  text-align: center;
}

.circle-item label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
  color: #333;
}
</style>
```

## Type Selection Guide

Choose the appropriate type based on your use case:

### Use Linear When:
- **Sequential Progress**: Tasks that flow left-to-right
- **File Operations**: Uploads, downloads, file transfers
- **Form Progress**: Multi-step forms with step-by-step progress
- **Streaming**: Video buffering or data loading
- **Space Constrained**: Limited vertical space
- **Compatibility**: Need wide browser compatibility

**Example Use Cases:**
- File upload/download progress
- Installation progress
- Form step completion
- Video buffering indicators

### Use Circular When:
- **Percentage Focus**: Emphasizing completion percentage
- **Dashboard Widgets**: Dashboard progress tiles
- **Standalone Metric**: Displaying single metric prominently
- **Centering Content**: Using annotations in center
- **Visual Prominence**: Want a focal point in UI
- **Compact Display**: Space available is square/circular

**Example Use Cases:**
- Task completion dashboard
- CPU/memory usage meters
- Progress with percentage display
- Loading indicators

## Dimensions & Sizing

### Linear Sizing

```vue
<template>
  <div class="sizing-examples">
    <!-- Full width, small height -->
    <ejs-progressbar
      id="progressbar1"
      type="Linear"
      width="100%"
      height="8"
      :value="50"
    >
    </ejs-progressbar>

    <!-- Custom width and height -->
    <ejs-progressbar
      id="progressbar2"
      type="Linear"
      width="80%"
      height="40"
      :value="75"
    >
    </ejs-progressbar>

    <!-- Responsive sizing -->
    <ejs-progressbar
      id="progressbar3"
      type="Linear"
      width="90%"
      height="30"
      :value="90"
    >
    </ejs-progressbar>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.sizing-examples {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
</style>
```

### Circular Sizing

```vue
<template>
  <div class="circular-sizes">
    <!-- Small circular -->
    <ejs-progressbar
      id="progressbar1"
      type="Circular"
      height="100px"
      width="100px"
      :value="60"
    >
    </ejs-progressbar>

    <!-- Medium circular -->
    <ejs-progressbar
      id="progressbar2"
      type="Circular"
      height="160px"
      width="160px"
      :value="75"
    >
    </ejs-progressbar>

    <!-- Large circular -->
    <ejs-progressbar
      id="progressbar3"
      type="Circular"
      height="220px"
      width="220px"
      :value="85"
    >
    </ejs-progressbar>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.circular-sizes {
  display: flex;
  gap: 30px;
  justify-content: center;
  padding: 20px;
}
</style>
```

### Responsive Sizing

```vue
<template>
  <div class="responsive-container">
    <ejs-progressbar
      type="Linear"
      :width="containerWidth"
      height="30"
      :value="progress"
    >
    </ejs-progressbar>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const containerWidth = ref("100%");
const progress = ref(65);

const updateSize = () => {
  const width = window.innerWidth;
  if (width < 480) {
    containerWidth.value = "90%";
  } else if (width < 768) {
    containerWidth.value = "80%";
  } else {
    containerWidth.value = "60%";
  }
};

onMounted(() => {
  updateSize();
  window.addEventListener("resize", updateSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSize);
});
</script>

<style scoped>
.responsive-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
```

## Key Differences Summary

| Feature | Linear | Circular |
|---------|--------|----------|
| Shape | Horizontal/Vertical | Full circle |
| Best for | Sequential progress | Percentage focus |
| Space | Horizontal | Square |
| Annotation Support | Limited | Full support |
| Segmentation | Effective | Very effective | 
| Default Use | File operations | Dashboard |

# Customization & Styling

## Table of Contents
- [Segmentation](#segmentation)
  - [Basic Segmentation](#basic-segmentation)
  - [Multi-Step Process with Segments](#multi-step-process-with-segments)
- [Thickness Customization](#thickness-customization)
  - [Basic Thickness](#basic-thickness)
  - [Different Thicknesses for Track and Progress](#different-thicknesses-for-track-and-progress)
  - [Secondary Progress Thickness](#secondary-progress-thickness)
- [Radius and Corner Radius](#radius-and-corner-radius)
  - [Circular Radius](#circular-radius)
  - [Corner Radius](#corner-radius)
- [Inner Radius](#inner-radius)
  - [Basic Inner Radius](#basic-inner-radius)
- [Color Customization](#color-customization)
  - [Basic Color Customization](#basic-color-customization)
  - [Secondary Progress Color](#secondary-progress-color)
  - [Status-Based Colors](#status-based-colors)
- [Advanced Styling](#advanced-styling)
  - [Combined Customizations](#combined-customizations)
- [Customization Summary](#customization-summary)

## Segmentation

Divide a progress bar into multiple segments to visualize sequential tasks or progress stages.

### Basic Segmentation

```vue
<template>
  <div class="segment-container">
    <h3>Segmented Progressbar</h3>

    <!-- 4 Segments (Linear) -->
    <div class="segment-section">
      <label>Linear: 4 Segments</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="60"
        :value="100"
        :segmentCount="4"
        :animation="animation"
      >
      </ejs-progressbar>
    </div>

    <!-- 6 Segments (Linear) -->
    <div class="segment-section">
      <label>Linear: 6 Segments</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="60"
        :value="100"
        :segmentCount="6"
        :animation="animation"
      >
      </ejs-progressbar>
    </div>

    <!-- 8 Segments (Circular) -->
    <div class="segment-section">
      <label>Circular: 8 Segments</label>
      <ejs-progressbar
        id="progressbar3"
        type="Circular"
        height="180px"
        width="180px"
        :value="100"
        :segmentCount="8"
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
.segment-container {
  padding: 20px;
}

.segment-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

### Multi-Step Process with Segments

```vue
<template>
  <div class="multistep-container">
    <h3>Multi-Step Process (Installation)</h3>

    <div class="step-info">
      <p>Step {{ currentStep }} of {{ totalSteps }}</p>
      <p>{{ stepNames[currentStep - 1] }}</p>
    </div>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="progress"
      :segmentCount="totalSteps"
      :animation="animation"
      :showProgressValue="true"
    >
    </ejs-progressbar>

    <div class="step-controls">
      <button @click="previousStep" :disabled="currentStep === 1">Previous</button>
      <button @click="nextStep" :disabled="currentStep === totalSteps">Next</button>
      <button @click="resetSteps">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const totalSteps = 5;
const currentStep = ref(1);

const stepNames = [
  "Preparing Installation",
  "Extracting Files",
  "Installing Components",
  "Configuring System",
  "Finalizing"
];

const animation = {
  enable: true,
  duration: 1000,
  delay: 0
};

const progress = computed(() => {
  return (currentStep.value / totalSteps) * 100;
});

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const resetSteps = () => {
  currentStep.value = 1;
};
</script>

<style scoped>
.multistep-container {
  padding: 20px;
}

.step-info {
  text-align: center;
  margin-bottom: 20px;
}

.step-info p {
  margin: 5px 0;
}

.step-info p:first-child {
  font-weight: bold;
  color: #007bff;
}

.step-controls {
  text-align: center;
  margin-top: 20px;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

## Thickness Customization

Customize the thickness of track, progress bar, and secondary progress independently.

### Basic Thickness

```vue
<template>
  <div class="thickness-container">
    <h3>Thickness Customization</h3>

    <!-- Thin Progressbar -->
    <div class="thickness-section">
      <label>Thin (8px)</label>
      <ejs-progressbar
        id="thinPB"
        type="Linear"
        height="50"
        :trackThickness="8"
        :progressThickness="8"
        :value="100"
      >
      </ejs-progressbar>
    </div>

    <!-- Medium Progressbar -->
    <div class="thickness-section">
      <label>Medium (24px)</label>
      <ejs-progressbar
        id="mediumPB"
        type="Linear"
        height="50"
        :trackThickness="24"
        :progressThickness="24"
        :value="100"
      >
      </ejs-progressbar>
    </div>

    <!-- Thick Progressbar -->
    <div class="thickness-section">
      <label>Thick (40px)</label>
      <ejs-progressbar
        id="thick"
        type="Linear"
        height="50"
        :trackThickness="40"
        :progressThickness="40"
        :value="100"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.thickness-container {
  padding: 20px;
}

.thickness-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

### Different Thicknesses for Track and Progress

```vue
<template>
  <div class="mixed-thickness">
    <h3>Mixed Thickness Example</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :trackThickness="30"
      :progressThickness="20"
      :value="75"
      :animation="animation"
    >
    </ejs-progressbar>

    <p>Track: 30px | Progress: 20px</p>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const animation = {
  enable: true,
  duration: 1500,
  delay: 0
};
</script>

<style scoped>
.mixed-thickness {
  padding: 20px;
}

p {
  margin-top: 10px;
  color: #666;
}
</style>
```

### Secondary Progress Thickness

```vue
<template>
  <div class="secondary-thickness">
    <h3>Buffer with Different Thicknesses</h3>

    <ejs-progressbar
      type="Linear"
      height="70"
      :trackThickness="30"
      :progressThickness="25"
      :secondaryProgressThickness="15"
      :value="50"
      :secondaryProgress="75"
    >
    </ejs-progressbar>

    <p>Track: 30px | Progress: 25px | Buffer: 15px</p>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.secondary-thickness {
  padding: 20px;
}

p {
  margin-top: 10px;
  color: #666;
}
</style>
```

## Radius and Corner Radius

Customize the radius for circular progressbars and corner style for all progressbars.

### Circular Radius

```vue
<template>
  <div class="radius-container">
    <h3>Circular Radius Variations</h3>

    <!-- Small radius (60%) -->
    <div class="radius-item">
      <label>Radius: 60%</label>
      <ejs-progressbar
        id="progressbar1"
        type="Circular"
        height="160px"
        width="160px"
        radius="60%"
        :value="75"
      >
      </ejs-progressbar>
    </div>

    <!-- Medium radius (80%) -->
    <div class="radius-item">
      <label>Radius: 80%</label>
      <ejs-progressbar
        id="progressbar2"
        type="Circular"
        height="160px"
        width="160px"
        radius="80%"
        :value="75"
      >
      </ejs-progressbar>
    </div>

    <!-- Full radius (100%) -->
    <div class="radius-item">
      <label>Radius: 100%</label>
      <ejs-progressbar
        id="progressbar3"
        type="Circular"
        height="160px"
        width="160px"
        radius="100%"
        :value="75"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.radius-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 20px;
}

.radius-item {
  text-align: center;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}
</style>
```

### Corner Radius

```vue
<template>
  <div class="corner-container">
    <h3>Corner Radius Styles</h3>

    <!-- Square Corners -->
    <div class="corner-section">
      <label>Square Corners</label>
      <ejs-progressbar
        id="progressbar1"
        type="Circular"
        height="180px"
        width="180px"
        cornerRadius="Square"
        :value="80"
      >
      </ejs-progressbar>
    </div>

    <!-- Rounded Corners -->
    <div class="corner-section">
      <label>Round Corners</label>
      <ejs-progressbar
        id="progressbar2"
        type="Circular"
        height="180px"
        width="180px"
        cornerRadius="Round"
        :value="80"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.corner-container {
  display: flex;
  gap: 40px;
  padding: 20px;
  justify-content: center;
}

.corner-section {
  text-align: center;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}
</style>
```

## Inner Radius

Create donut-style progressbars using inner radius for circular progressbars.

### Basic Inner Radius

```vue
<template>
  <div class="inner-radius-container">
    <h3>Inner Radius (Donut Style)</h3>

    <!-- Thin Donut -->
    <div class="donut-item">
      <label>Thin Donut (20%)</label>
      <ejs-progressbar
        id="progressbar1"
        type="Circular"
        height="200px"
        width="200px"
        radius="100%"
        innerRadius="80%"
        :trackThickness="20"
        :progressThickness="20"
        :value="65"
      >
      </ejs-progressbar>
    </div>

    <!-- Medium Donut -->
    <div class="donut-item">
      <label>Medium Donut (40%)</label>
      <ejs-progressbar
        id="progressbar2"
        type="Circular"
        height="200px"
        width="200px"
        radius="100%"
        innerRadius="60%"
        :trackThickness="30"
        :progressThickness="30"
        :value="65"
      >
      </ejs-progressbar>
    </div>

    <!-- Large Donut -->
    <div class="donut-item">
      <label>Large Donut (60%)</label>
      <ejs-progressbar
        id="progressbar3"
        type="Circular"
        height="200px"
        width="200px"
        radius="100%"
        innerRadius="40%"
        :trackThickness="40"
        :progressThickness="40"
        :value="65"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.inner-radius-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 20px;
  justify-content: center;
}

.donut-item {
  text-align: center;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}
</style>
```

## Color Customization

Customize progress, track, and secondary progress colors.

### Basic Color Customization

```vue
<template>
  <div class="color-container">
    <h3>Color Customization</h3>

    <!-- Blue -->
    <div class="color-section">
      <label>Blue Theme</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="50"
        progressColor="#007bff"
        trackColor="#e9ecef"
        :value="75"
      >
      </ejs-progressbar>
    </div>

    <!-- Green -->
    <div class="color-section">
      <label>Green Theme</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="50"
        progressColor="#28a745"
        trackColor="#e9ecef"
        :value="75"
      >
      </ejs-progressbar>
    </div>

    <!-- Red -->
    <div class="color-section">
      <label>Red Theme</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="50"
        progressColor="#dc3545"
        trackColor="#e9ecef"
        :value="75"
      >
      </ejs-progressbar>
    </div>

    <!-- Orange -->
    <div class="color-section">
      <label>Orange Theme</label>
      <ejs-progressbar
        id="progressbar4"
        type="Linear"
        height="50"
        progressColor="#fd7e14"
        trackColor="#e9ecef"
        :value="75"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.color-container {
  padding: 20px;
}

.color-section {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

### Secondary Progress Color

```vue
<template>
  <div class="secondary-color">
    <h3>Buffer with Custom Colors</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      progressColor="#E3165B"
      trackColor="#F8C7D8"
      :secondaryProgressColor="'#FFC107'"
      :value="50"
      :secondaryProgress="75"
    >
    </ejs-progressbar>

    <div class="legend">
      <span style="color: #E3165B; font-weight: bold;">■</span> Played
      <span style="color: #FFC107; font-weight: bold; margin-left: 20px;">■</span> Buffered
      <span style="color: #F8C7D8; font-weight: bold; margin-left: 20px;">■</span> Track
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.secondary-color {
  padding: 20px;
}

.legend {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
}
</style>
```

### Status-Based Colors

```vue
<template>
  <div class="status-colors">
    <h3>Status-Based Progress Colors</h3>

    <!-- Success (Green) -->
    <div class="status-section">
      <label>Success (Complete)</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="50"
        progressColor="#28a745"
        trackColor="#d4edda"
        :value="100"
      >
      </ejs-progressbar>
    </div>

    <!-- Warning (Yellow) -->
    <div class="status-section">
      <label>Warning (In Progress)</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="50"
        progressColor="#ffc107"
        trackColor="#fff3cd"
        :value="50"
      >
      </ejs-progressbar>
    </div>

    <!-- Danger (Red) -->
    <div class="status-section">
      <label>Danger (Failed)</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="50"
        progressColor="#dc3545"
        trackColor="#f8d7da"
        :value="30"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.status-colors {
  padding: 20px;
}

.status-section {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

## Advanced Styling

### Combined Customizations

```vue
<template>
  <div class="advanced-styling">
    <h3>Advanced Styling Example</h3>

    <!-- Premium Styled Progressbar -->
    <ejs-progressbar
      type="Circular"
      height="220px"
      width="220px"
      trackColor="#FFD939"
      progressColor="white"
      radius="100%"
      innerRadius="80%"
      cornerRadius="Round"
      :trackThickness="80"
      :progressThickness="10"
      :value="60"
      :animation="animation"
    >
    </ejs-progressbar>

    <h4>Configuration:</h4>
    <ul>
      <li>Type: Circular with Donut style</li>
      <li>Track Color: Gold (#FFD939)</li>
      <li>Progress Color: White</li>
      <li>Radius: 100%, Inner: 80%</li>
      <li>Corner Style: Round</li>
      <li>Track Thickness: 80px</li>
      <li>Progress Thickness: 10px</li>
    </ul>
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
.advanced-styling {
  text-align: center;
  padding: 20px;
}

h4 {
  margin-top: 20px;
  text-align: left;
}

ul {
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
  padding-left: 20px;
}

li {
  margin: 5px 0;
  color: #666;
}
</style>
```

## Customization Summary

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `segmentCount` | Number | Divide into segments | 4, 6, 8 |
| `trackThickness` | Number | Track bar width | 24, 30, 40 |
| `progressThickness` | Number | Progress bar width | 24, 30, 40 |
| `secondaryProgressThickness` | Number | Buffer width | 15, 20 |
| `radius` | String | Circular radius | "60%", "80%", "100%" |
| `innerRadius` | String | Donut hole | "40%", "60%", "80%" |
| `cornerRadius` | String | Corner style | "Auto", "Square", "Round", "Round4px"|
| `progressColor` | String | Progress color | "#007bff", "green" |
| `trackColor` | String | Track color | "#e9ecef", "gray" |
| `secondaryProgressColor` | String | Buffer color | "#FFC107", "orange" |

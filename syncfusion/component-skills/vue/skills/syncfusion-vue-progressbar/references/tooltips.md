# Tooltips

## Table of Contents
- [Basic Tooltip Configuration](#basic-tooltip-configuration)
  - [Enable Tooltip on Hover](#enable-tooltip-on-hover)
  - [Tooltip on Load](#tooltip-on-load)
  - [Tooltip Disabled](#tooltip-disabled)
- [Tooltip Format Customization](#tooltip-format-customization)
  - [Default Format](#default-format)
  - [Custom Format String](#custom-format-string)
- [Tooltip Styling](#tooltip-styling)
  - [Fill Color Customization](#fill-color-customization)
  - [Border Customization](#border-customization)
  - [Text Style Customization](#text-style-customization)
- [Circular Tooltips](#circular-tooltips)
- [Dynamic Tooltip Updates](#dynamic-tooltip-updates)
- [Tooltip Recommendations](#tooltip-recommendations)
- [Tooltip Best Practices](#tooltip-best-practices)

## Basic Tooltip Configuration

Enable tooltips on progressbars to display progress information on hover or initial load.

### Enable Tooltip on Hover

```vue
<template>
  <div class="tooltip-container">
    <h3>Tooltip on Hover</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="75"
      :animation="animation"
      :tooltip="{ enable: true, showTooltipOnHover: true }"
    >
    </ejs-progressbar>

    <p>Hover over the progressbar to see the tooltip</p>
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
.tooltip-container {
  padding: 20px;
}

p {
  margin-top: 10px;
  color: #666;
}
</style>
```

### Tooltip on Load

```vue
<template>
  <div class="tooltip-load">
    <h3>Tooltip on Load</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="50"
      :tooltip="{ enable: true, showTooltipOnHover: false }"
    >
    </ejs-progressbar>

    <p>Tooltip displays automatically on page load</p>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.tooltip-load {
  padding: 20px;
}

p {
  margin-top: 10px;
  color: #666;
}
</style>
```

### Tooltip Disabled

```vue
<template>
  <div class="tooltip-disabled">
    <h3>Tooltip Disabled</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="85"
      :tooltip="{ enable: false }"
    >
    </ejs-progressbar>

    <p>Tooltip feature is disabled</p>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.tooltip-disabled {
  padding: 20px;
}

p {
  margin-top: 10px;
  color: #666;
}
</style>
```

## Tooltip Format Customization

Customize tooltip text using format property.

### Default Format

```vue
<template>
  <div class="default-format">
    <h3>Default Tooltip Format</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="65"
      :tooltip="{ enable: true, showTooltipOnHover: true }"
    >
    </ejs-progressbar>

    <p>Default shows: "65%" or current value</p>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.default-format {
  padding: 20px;
}

p {
  margin-top: 10px;
  color: #666;
}
</style>
```

### Custom Format String

```vue
<template>
  <div class="custom-format">
    <h3>Custom Tooltip Format</h3>

    <!-- Progress: 65% -->
    <div class="format-section">
      <label>Format: "Progress: ${value}%"</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="60"
        :value="65"
        :tooltip="{ enable: true, showTooltipOnHover: true, format: 'Progress: ${value}' }"
      >
      </ejs-progressbar>
    </div>

    <!-- Completed: 80/100 -->
    <div class="format-section">
      <label>Format: "Completed: ${value}/100"</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="60"
        :value="80"
        :tooltip="{ enable: true, showTooltipOnHover: true, format: 'Completed: ${value}/100' }"
      >
      </ejs-progressbar>
    </div>

    <!-- Status Format -->
    <div class="format-section">
      <label>Format: "${value}% Complete"</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="60"
        :value="45"
        :tooltip="{ enable: true, showTooltipOnHover: true, format: '${value}% Complete' }"
      >
      </ejs-progressbar>
    </div>

    <!-- Time Format -->
    <div class="format-section">
      <label>Format: "Remaining: ${value} min"</label>
      <ejs-progressbar
        id="progressbar4"
        type="Linear"
        height="60"
        :value="30"
        :tooltip="{ enable: true, showTooltipOnHover: true, format: 'Remaining: ${value} min' }"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.custom-format {
  padding: 20px;
}

.format-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}
</style>
```

## Tooltip Styling

Customize tooltip appearance with colors, borders, and text styles.

### Fill Color Customization

```vue
<template>
  <div class="fill-color">
    <h3>Tooltip Fill Color Customization</h3>

    <!-- Blue background -->
    <div class="style-section">
      <label>Blue Tooltip</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="60"
        :value="60"
        :tooltip="{ 
          enable: true, 
          showTooltipOnHover: true,
          format: 'Progress: ${value}',
          fill: '#007bff'
        }"
      >
      </ejs-progressbar>
    </div>

    <!-- Green background -->
    <div class="style-section">
      <label>Green Tooltip</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="60"
        :value="75"
        :tooltip="{ 
          enable: true, 
          showTooltipOnHover: true,
          format: '${value}',
          fill: '#28a745'
        }"
      >
      </ejs-progressbar>
    </div>

    <!-- Orange background -->
    <div class="style-section">
      <label>Orange Tooltip</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="60"
        :value="45"
        :tooltip="{ 
          enable: true, 
          showTooltipOnHover: true,
          format: '${value}',
          fill: '#fd7e14'
        }"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.fill-color {
  padding: 20px;
}

.style-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

### Border Customization

```vue
<template>
  <div class="border-style">
    <h3>Tooltip Border Customization</h3>

    <!-- Thick border -->
    <div class="border-section">
      <label>Thick Border</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="60"
        :value="70"
        :tooltip="{ 
          enable: true, 
          showTooltipOnHover: true,
          format: '${value}',
          fill: '#f8f9fa',
          border: { color: '#007bff', width: 3 }
        }"
      >
      </ejs-progressbar>
    </div>

    <!-- Red border -->
    <div class="border-section">
      <label>Red Border</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="60"
        :value="50"
        :tooltip="{ 
          enable: true, 
          showTooltipOnHover: true,
          format: '${value}',
          fill: '#fff',
          border: { color: '#dc3545', width: 2 }
        }"
      >
      </ejs-progressbar>
    </div>

    <!-- Green border -->
    <div class="border-section">
      <label>Green Border</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="60"
        :value="85"
        :tooltip="{ 
          enable: true, 
          showTooltipOnHover: true,
          format: '${value}',
          fill: '#f0fff4',
          border: { color: '#28a745', width: 2 }
        }"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.border-style {
  padding: 20px;
}

.border-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

### Text Style Customization

```vue
<template>
  <div class="text-style">
    <h3>Tooltip Text Style Customization</h3>

    <!-- Bold white text -->
    <div class="text-section">
      <label>Bold White Text</label>
      <ejs-progressbar
        id="progressbar1"
        type="Linear"
        height="60"
        :value="65"
        :tooltip="{ 
          enable: true, 
          showTooltipOnHover: true,
          format: 'Progress: ${value}',
          fill: '#333',
          textStyle: { 
            color: '#fff', 
            fontWeight: 'bold',
            size: '14px'
          }
        }"
      >
      </ejs-progressbar>
    </div>

    <!-- Large blue text -->
    <div class="text-section">
      <label>Large Blue Text</label>
      <ejs-progressbar
        id="progressbar2"
        type="Linear"
        height="60"
        :value="80"
        :tooltip="{ 
          enable: true, 
          showTooltipOnHover: true,
          format: '${value}',
          fill: '#e8f4f8',
          textStyle: { 
            color: '#007bff', 
            size: '16px',
            fontWeight: 'bold'
          }
        }"
      >
      </ejs-progressbar>
    </div>

    <!-- Italic gray text -->
    <div class="text-section">
      <label>Italic Gray Text</label>
      <ejs-progressbar
        id="progressbar3"
        type="Linear"
        height="60"
        :value="45"
        :tooltip="{ 
          enable: true, 
          showTooltipOnHover: true,
          format: '${value}% done',
          fill: '#fff',
          textStyle: { 
            color: '#666',
            fontStyle: 'italic',
            size: '13px'
          }
        }"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.text-style {
  padding: 20px;
}

.text-section {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
```

## Circular Tooltips

```vue
<template>
  <div class="circular-tooltips">
    <h3>Circular Progressbar Tooltips</h3>

    <div class="circular-section">
      <label>Circular with Tooltip</label>
      <ejs-progressbar
        type="Circular"
        height="200px"
        width="200px"
        :value="70"
        :tooltip="{ 
          enable: true, 
          showTooltipOnHover: true,
          format: 'Completion: ${value}',
          fill: '#007bff'
        }"
      >
      </ejs-progressbar>
    </div>
  </div>
</template>

<script setup>
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";
</script>

<style scoped>
.circular-tooltips {
  padding: 20px;
  text-align: center;
}

.circular-section {
  margin-bottom: 40px;
}

label {
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
}
</style>
```

## Dynamic Tooltip Updates

```vue
<template>
  <div class="dynamic-tooltip">
    <h3>Dynamic Tooltip Updates</h3>

    <ejs-progressbar
      type="Linear"
      height="60"
      :value="downloadProgress"
      :tooltip="{ 
        enable: true, 
        showTooltipOnHover: true,
        format: tooltipText,
        fill: statusColor
      }"
    >
    </ejs-progressbar>

    <div class="download-info">
      <p>Status: {{ status }}</p>
      <p>Speed: {{ downloadProgress }}MB/s</p>
    </div>

    <div class="controls">
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

const status = computed(() => {
  if (downloadProgress.value === 0) return "Ready";
  if (downloadProgress.value < 100) return "Downloading...";
  return "Completed!";
});

const tooltipText = computed(() => {
  if (downloadProgress.value === 100) {
    return "Download Complete!";
  }
  return `Downloading: ${downloadProgress.value}MB/s`;
});

const statusColor = computed(() => {
  if (downloadProgress.value < 50) return "#FFC107";
  if (downloadProgress.value < 100) return "#007bff";
  return "#28a745";
});

const startDownload = () => {
  if (downloadInterval || downloadProgress.value === 100) return;
  
  downloadInterval = setInterval(() => {
    downloadProgress.value = Math.min(downloadProgress.value + Math.random() * 15, 100);
    
    if (downloadProgress.value >= 100) {
      clearInterval(downloadInterval);
      downloadInterval = null;
    }
  }, 500);
};

const pauseDownload = () => {
  if (downloadInterval) {
    clearInterval(downloadInterval);
    downloadInterval = null;
  }
};

const resetDownload = () => {
  if (downloadInterval) {
    clearInterval(downloadInterval);
  }
  downloadProgress.value = 0;
};
</script>

<style scoped>
.dynamic-tooltip {
  padding: 20px;
  text-align: center;
}

.download-info {
  margin: 20px 0;
}

.download-info p {
  margin: 5px 0;
  color: #666;
}

.controls {
  margin-top: 20px;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

## Tooltip Recommendations

| Scenario | Setting | Tooltip Format |
|----------|---------|-----------------|
| File Download | On Hover | "Progress: ${value}%" |
| Video Streaming | On Load | "Buffered: ${value}%" |
| Installation | On Hover | "Step: ${value}/5" |
| Data Loading | On Load | "Loading ${value}..." |
| Percentage Focus | On Hover | "${value}% Complete" |
| Status Indicator | On Load | Dynamic based on value |

## Tooltip Best Practices

1. **Use `showTooltipOnHover: true`** for less obtrusive experience
2. **Use `showTooltipOnHover: false`** for critical information that should always be visible
3. **Keep format strings concise** - short is better than long
4. **Use consistent styling** - match your app's color scheme
5. **Test accessibility** - ensure tooltip text is readable for all users
6. **Consider mobile** - tooltips may not work well on touch devices

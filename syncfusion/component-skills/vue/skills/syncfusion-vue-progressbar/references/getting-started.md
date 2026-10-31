# Getting Started with Syncfusion Vue Progressbar

## Table of Contents
- [Installation & Package Setup](#installation--package-setup)
  - [Install the Progressbar Package](#install-the-progressbar-package)
  - [System Requirements](#system-requirements)
- [Import & Register Component](#import--register-component)
  - [Composition API (Recommended for Vue 3)](#composition-api-recommended-for-vue-3)
  - [Options API (Works with Vue 2 and Vue 3)](#options-api-works-with-vue-2-and-vue-3)
- [Basic Progressbar Implementation](#basic-progressbar-implementation)
  - [Minimal Example - Composition API](#minimal-example---composition-api)
  - [Minimal Example - Options API](#minimal-example---options-api)
- [Module Injection for Annotations](#module-injection-for-annotations)
  - [Composition API with Annotations](#composition-api-with-annotations)
  - [Options API with Annotations](#options-api-with-annotations)
- [Complete Working Example](#complete-working-example)
- [Initialization Checklist](#initialization-checklist)
- [Common Initialization Issues](#common-initialization-issues)
- [Running in Development](#running-in-development)

## Installation & Package Setup

### Install the Progressbar Package

```bash
npm install @syncfusion/ej2-vue-progressbar --save
```

**Minimum Dependencies Required:**
- @syncfusion/ej2-base
- @syncfusion/ej2-data
- @syncfusion/ej2-svg-base
- @syncfusion/ej2-vue-base

These dependencies will be installed automatically with the progressbar package.

### System Requirements

Ensure your Vue project meets these minimum requirements:
- Vue 2.6+ or Vue 3+
- Node.js 16.0 or higher
- npm version supported by your installed Node.js

## Import & Register Component

### Composition API (Recommended for Vue 3)

```vue
<script setup>
import { ProgressBarComponent } from "@syncfusion/ej2-vue-progressbar";
</script>
```

### Options API (Works with Vue 2 and Vue 3)

```vue
<script>
import { ProgressBarComponent } from "@syncfusion/ej2-vue-progressbar";

export default {
  name: "App",
  components: {
    'ejs-progressbar': ProgressBarComponent
  }
}
</script>
```

## Basic Progressbar Implementation

### Minimal Example - Composition API

```vue
<template>
  <div id="container">
    <ejs-progressbar
      id="percentage"
      type="Circular"
      :value="value"
      :animation="animation"
    >
    </ejs-progressbar>
  </div>
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

<style>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
```

### Minimal Example - Options API

```vue
<template>
  <div id="container">
    <ejs-progressbar
      id="percentage"
      type="Circular"
      :value="value"
      :animation="animation"
    >
    </ejs-progressbar>
  </div>
</template>

<script>
import { ProgressBarComponent } from "@syncfusion/ej2-vue-progressbar";

export default {
  name: "App",
  components: {
    'ejs-progressbar': ProgressBarComponent
  },
  data() {
    return {
      value: 100,
      animation: {
        enable: true,
        duration: 2000,
        delay: 0
      }
    };
  }
}
</script>

<style>
#container {
  display: -webkit-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
```

## Module Injection for Annotations

If you plan to use annotations (custom content in circular progressbars), you must inject the `ProgressAnnotation` service.

### Composition API with Annotations

```vue
<script setup>
import { provide } from "vue";
import { ProgressBarComponent as EjsProgressbar, ProgressAnnotation, ProgressBarAnnotationsDirective as EProgressbarAnnotations, ProgressBarAnnotationDirective as EProgressbarAnnotation } from "@syncfusion/ej2-vue-progressbar";

// Inject the ProgressAnnotation service
provide('progressbar', [ProgressAnnotation]);
</script>
```

### Options API with Annotations

```vue
<script>
import { ProgressBarComponent, ProgressAnnotation, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective } from "@syncfusion/ej2-vue-progressbar";

export default {
  components: {
    'ejs-progressbar': ProgressBarComponent
  },
  provide: {
    progressbar: [ProgressAnnotation]
  }
}
</script>
```

## Complete Working Example

Here's a complete example combining all setup elements:

```vue
<template>
  <div id="app">
    <h2>Syncfusion Vue Progressbar - Getting Started</h2>
    
    <div id="container">
      <!-- Linear Progressbar -->
      <div class="progress-section">
        <h4>Linear Progressbar</h4>
        <ejs-progressbar
          id="linear"
          type="Linear"
          :value="linearValue"
          height="60"
          :animation="animation"
        >
        </ejs-progressbar>
      </div>

      <!-- Circular Progressbar -->
      <div class="progress-section">
        <h4>Circular Progressbar</h4>
        <ejs-progressbar
          id="circular"
          type="Circular"
          :value="circularValue"
          height="160"
          width="160"
          :animation="animation"
        >
        </ejs-progressbar>
      </div>

      <!-- Button to Update Progress -->
      <button @click="updateProgress">Update Progress</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ProgressBarComponent as EjsProgressbar } from "@syncfusion/ej2-vue-progressbar";

const linearValue = ref(0);
const circularValue = ref(0);

const animation = {
  enable: true,
  duration: 2000,
  delay: 0
};

const updateProgress = () => {
  linearValue.value = 100;
  circularValue.value = 100;
};
</script>

<style scoped>
#app {
  padding: 20px;
  font-family: Arial, sans-serif;
}

#container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  margin: 30px 0;
}

.progress-section {
  text-align: center;
}

.progress-section h4 {
  margin-bottom: 20px;
  color: #333;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
```

## Initialization Checklist

Before using the progressbar component:

- [ ] Install `@syncfusion/ej2-vue-progressbar` package
- [ ] Import `ProgressBarComponent` in your component
- [ ] Include `ejs-progressbar` tag in template
- [ ] Set required props: `type`, `value`
- [ ] Configure animation if needed
- [ ] Inject `ProgressAnnotation` if using annotations
- [ ] Test in browser to verify rendering

## Common Initialization Issues

**Issue: Progressbar not rendering**
- Solution: Check that component is registered correctly
- Solution: Ensure `value` prop is provided

**Issue: Animation not working**
- Solution: Set `animation.enable = true`
- Solution: Check that animation duration is specified
- Solution: Verify browser supports CSS animations

**Issue: Annotations not displaying**
- Solution: Inject `ProgressAnnotation` service
- Solution: Use circular type for annotations
- Solution: Check annotation content is valid HTML

## Running in Development


For a modern Vue 3 project created with Vite:

```bash
npm run dev
```

For an older Vue CLI project:

```bash
npm run serve

# Navigate to http://localhost:8080 (or your configured port)
```

Your progressbar should render immediately. Customize by adjusting props in your component template.

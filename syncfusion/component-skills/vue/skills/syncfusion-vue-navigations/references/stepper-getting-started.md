# Getting Started with Syncfusion Vue 3 Stepper

## Table of Contents
- [Installation](#installation)
- [CSS Setup](#css-setup)
- [Creating Your First Stepper](#creating-your-first-stepper)
- [Running the Application](#running-the-application)
- [Quick Configuration](#quick-configuration)

## Installation

### Step 1: Install via npm

The Stepper component is part of the `@syncfusion/ej2-vue-navigations` package. Install it using npm:

```bash
npm install @syncfusion/ej2-vue-navigations --save
npm install @syncfusion/ej2-vue-base --save
```

### Step 2: Verify Dependencies

The Stepper component depends on the following packages, which are installed automatically:

- `@syncfusion/ej2-base`
- `@syncfusion/ej2-popups`
- `@syncfusion/ej2-navigations`
- `@syncfusion/ej2-vue-base`

You can verify the installation by checking your `package.json`:

```json
{
  "dependencies": {
    "@syncfusion/ej2-vue-navigations": "^latest",
    "@syncfusion/ej2-vue-base": "^latest"
  }
}
```

## CSS Setup

### Import Required Styles

Import the necessary CSS files in your main application file (typically `src/main.js` or in your component):

```javascript
// main.js
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/stepper/index.css";
```

**Available Themes:**
- `tailwind3.css` (default, modern minimal design)
- `bootstrap5.3.css` (Bootstrap 5 styling)
- `fluent2.css` (Fluent Design System)
- `material3.css` (Material Design 3)

Choose one theme file based on your design preference. Replace `tailwind3.css` with your chosen theme.

### Alternative: CSS in SFC

Import in your Vue Single File Component:

```vue
<script setup>
import "@syncfusion/ej2-material3-theme/styles/stepper/index.css";
</script>
```

## Creating Your First Stepper

### Basic Example: Simple Checkout Flow

```vue
<script setup>
import { ref } from 'vue';
import { StepperComponent } from '@syncfusion/ej2-vue-navigations';
import "@syncfusion/ej2-material3-theme/styles/stepper/index.css";

const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);
</script>

<template>
  <div class="app-container">
    <h2>Checkout Process</h2>
    <ejs-stepper :steps="steps" />
  </div>
</template>

<style scoped>
.app-container {
  padding: 20px;
}
</style>
```

### Example with Text Instead of Icons

```vue
<script setup>
import { ref } from 'vue';

const steps = ref([
  { text: '1', label: 'Account' },
  { text: '2', label: 'Profile' },
  { text: '3', label: 'Verification' },
  { text: '4', label: 'Complete' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" />
</template>
```

### Example with Active Step

Set the initial active step using the reactive `activeStep` property:

```vue
<script setup>
import { ref } from 'vue';

const activeStep = ref(1);
const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);
</script>

<template>
  <ejs-stepper :steps="steps" :activeStep="activeStep" />
</template>
```

### Property-Based Pattern: Using Reactive Steps Array

Use the `steps` property with ref() for reactive step management:

```vue
<script setup>
import { ref } from 'vue';
import { StepperComponent } from '@syncfusion/ej2-vue-navigations';

const steps = ref([
  { iconCss: 'sf-icon-cart', label: 'Cart' },
  { iconCss: 'sf-icon-transport', label: 'Delivery' },
  { iconCss: 'sf-icon-payment', label: 'Payment' },
  { iconCss: 'sf-icon-success', label: 'Confirmation' }
]);

const activeStep = ref(0);
</script>

<template>
  <div class="app-container">
    <h2>Checkout Process</h2>
    <ejs-stepper :steps="steps" :activeStep="activeStep" />
  </div>
</template>

<style scoped>
.app-container {
  padding: 20px;
}
</style>
```

## Running the Application

### With Vite (Recommended)

```bash
npm create vite@latest my-app -- --template vue
cd my-app
npm install @syncfusion/ej2-vue-navigations --save
npm run dev
```

Open `http://localhost:5173/` in your browser.

### With Create Vue

```bash
npm create vue@latest my-app
cd my-app
npm install
npm install @syncfusion/ej2-vue-navigations --save
npm run dev
```

Open `http://localhost:5173/` in your browser.

## Quick Configuration

### Horizontal Stepper (Default)

```vue
<script setup>
const steps = ref([...]);
</script>

<template>
  <ejs-stepper :steps="steps" orientation="horizontal" />
</template>
```

### Vertical Stepper

```vue
<template>
  <ejs-stepper :steps="steps" orientation="vertical" />
</template>
```

### Linear Navigation (Step-by-Step)

```vue
<template>
  <ejs-stepper :steps="steps" :linear="true" />
</template>
```

Users must complete each step sequentially and cannot skip steps.

### Readonly Stepper (View-Only)

```vue
<template>
  <ejs-stepper :steps="steps" :readOnly="true" />
</template>
```

Users cannot interact with the stepper.

### Animation Configuration

```vue
<script setup>
const animationSettings = {
  enable: true,
  duration: 500,
  delay: 0
};
</script>

<template>
  <ejs-stepper :steps="steps" :animation="animationSettings" />
</template>
```

## Troubleshooting

**Issue: Stepper is not displaying**
- ✅ Verify CSS imports are included in your app
- ✅ Check that `@syncfusion/ej2-vue-navigations` is installed
- ✅ Ensure `StepperComponent` is imported correctly
- ✅ Verify `ejs-stepper` component tag is used in template

**Issue: Styles look different than expected**
- ✅ Verify you're using the correct theme CSS file
- ✅ Check browser DevTools for CSS conflicts
- ✅ Ensure CSS imports are in the correct order
- ✅ Check that Syncfusion CSS is imported before custom styles

**Issue: Step icons not showing**
- ✅ Install Syncfusion icon fonts or use custom CSS classes
- ✅ Verify `iconCss` property values are valid CSS class names
- ✅ Add icon CSS files to your imports if using custom icon sets
- ✅ Check that icon classes are defined in your CSS

**Issue: Component not reactive to prop changes**
- ✅ Use `ref()` to wrap step data for reactivity
- ✅ Ensure you're modifying the `.value` property when updating from script
- ✅ For reactive updates, use `steps.value = newSteps` instead of reassignment
- ✅ Test that changes to `steps` array trigger component re-render


# Spinner Customization — Vue 3 Spinner

## Table of Contents
- [Overview](#overview)
- [CSS Class Customization (cssClass)](#css-class-customization-cssclass)
- [Custom Size via width](#custom-size-via-width)
- [Custom Template](#custom-template)
- [Global Customization with setSpinner](#global-customization-with-setspinner)
- [Spinner Color via CSS](#spinner-color-via-css)
- [Positioning the Spinner Label](#positioning-the-spinner-label)
- [Overlay Backdrop Customization](#overlay-backdrop-customization)
- [Theme-Specific Customization](#theme-specific-customization)
- [Responsive Spinner](#responsive-spinner)

---

## Overview

The Spinner supports customization through:
1. `cssClass` — adds CSS class(es) to the spinner root for styling hooks
2. `width` — controls the size of the spinner icon
3. `template` — replaces the default animation with custom HTML
4. `setSpinner` — applies customizations globally across all spinners

---

## CSS Class Customization (cssClass)

Add custom class names to the spinner wrapper element:

```vue
<template>
  <div ref="ref" class="dark-bg" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const ref = ref(null);

onMounted(() => {
  if (ref.value) {
    createSpinner({
      target: ref.value,
      cssClass: 'dark-bg-spinner'
    });
    showSpinner(ref.value);
  }
});
</script>

<style scoped>
.dark-bg {
  height: 200px;
  background: #1e1e2e;
}
</style>
```

**CSS (App.css):**

```css
/* Style the spinner overlay when dark-bg-spinner class is present */
.dark-bg-spinner .e-spinner-pane {
  background-color: rgba(0, 0, 0, 0.6);
}

.dark-bg-spinner .e-spinner-inner .e-spin-material {
  stroke: #ffffff;
}
```

**Multiple classes:**

```ts
createSpinner({
  target: el,
  cssClass: 'overlay-dark compact-spinner'
});
```

---

## Custom Size via width

```vue
<template>
  <div ref="ref" class="sized" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const ref = ref(null);

onMounted(() => {
  if (ref.value) {
    createSpinner({
      target: ref.value,
      width: '56px'    // string with units
      // width: 56     // number (treated as px)
    });
    showSpinner(ref.value);
  }
});
</script>

<style scoped>
.sized { height: 200px; }
</style>
```

**Size recommendations:**

| Context | Suggested width |
|---|---|
| Inline / button | `'20px'` – `'24px'` |
| Card / panel | `'34px'` (default) |
| Full-page overlay | `'48px'` – `'64px'` |

---

## Custom Template

Replace the built-in spinner animation with your own HTML:

```vue
<template>
  <div ref="ref" class="custom" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const ref = ref(null);

onMounted(() => {
  if (ref.value) {
    createSpinner({
      target: ref.value,
      template: `
        <div class="pulse-ring"></div>
      `
    });
    showSpinner(ref.value);
  }
});
</script>

<style scoped>
.custom { height: 200px; position: relative; }
</style>
```

**App.css:**

```css
.pulse-ring {
  width: 40px;
  height: 40px;
  border: 4px solid #007bff;
  border-radius: 50%;
  animation: pulse 1s ease-out infinite;
}

@keyframes pulse {
  0%   { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.8); opacity: 0; }
}
```

**Image-based template:**

```ts
createSpinner({
  target: el,
  template: '<img src="/spinner.gif" alt="Loading" width="40" />'
});
```

**SVG template:**

```ts
createSpinner({
  target: el,
  template: `
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="16" fill="none" stroke="#007bff" stroke-width="4"
        stroke-dasharray="80" stroke-dashoffset="60">
        <animateTransform attributeName="transform" type="rotate"
          from="0 20 20" to="360 20 20" dur="1s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `
});
```

---

## Global Customization with setSpinner

Apply customizations to all spinners created after the call:

```ts
// src/main.ts
import { setSpinner } from '@syncfusion/ej2-vue-popups';

// ⚠️ Call BEFORE any createSpinner calls
setSpinner({
  type: 'Bootstrap5',
  cssClass: 'app-global-spinner'
});
```

**Global custom template:**

```ts
setSpinner({
  template: '<div class="my-app-loader"></div>'
});
```

**CSS for the global class**

```css
.app-global-spinner .e-spinner-pane { /* overrides */ }
```

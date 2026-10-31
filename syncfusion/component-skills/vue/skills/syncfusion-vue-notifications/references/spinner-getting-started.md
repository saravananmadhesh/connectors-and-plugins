# Getting Started — Vue 3 Spinner

## Table of Contents
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Basic Spinner Example](#basic-spinner-example)
- [Composition API Pattern](#composition-api-pattern)
- [Options API Pattern](#options-api-pattern)
- [Show and Hide Spinner](#show-and-hide-spinner)
- [Spinner with Label](#spinner-with-label)
- [Full-Page Overlay Spinner](#full-page-overlay-spinner)
- [Troubleshooting](#troubleshooting)

---

## Installation

The Spinner is part of the `@syncfusion/ej2-vue-popups` package.

```bash
npm install @syncfusion/ej2-vue-popups --save
```

> The `--save` flag adds the package as a project dependency in `package.json`.

---

## CSS Imports

Add the required theme CSS to your `src/main.ts` file:

```ts
// src/main.ts
import "@syncfusion/ej2-material3-theme/styles/spinner/index.css";
```

> ⚠️ Always import `ej2-base` theme **before** `ej2-vue-popups` theme.

---

## Basic Spinner Example

The Spinner is created imperatively using utility functions — not as a Vue component. In Vue 3, call these utilities from inside `onMounted` (or `<script setup>` after the template ref resolves):

```vue
<template>
  <div ref="containerRef" class="control-section" style="width: 100%; height: 200px" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const containerRef = ref(null);

onMounted(() => {
  // Step 1: Create the spinner on the target element
  createSpinner({
    target: containerRef.value
  });
  // Step 2: Show the spinner
  showSpinner(containerRef.value);
});
</script>
```

**Key points:**
- `createSpinner` must be called **before** `showSpinner`
- The `target` is a real DOM element — use a template `ref` to capture the Vue-mounted node
- In the Composition API, put spinner logic inside `onMounted`

---

## Composition API Pattern

Using `ref` for reliable element access:

```vue
<template>
  <div ref="containerRef" class="spinner-container" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-vue-popups';

const containerRef = ref(null);

onMounted(() => {
  if (containerRef.value) {
    createSpinner({ target: containerRef.value });
    showSpinner(containerRef.value);
  }
});

// Cleanup: hide spinner on unmount
onBeforeUnmount(() => {
  if (containerRef.value) {
    hideSpinner(containerRef.value);
  }
});
</script>

<style scoped>
.spinner-container {
  width: 300px;
  height: 200px;
  position: relative;
}
</style>
```

---

## Options API Pattern

If you prefer Options API, use `mounted()` and `this.$refs`:

```vue
<template>
  <div class="control-pane">
    <div ref="container" class="control-section col-lg-12 spinner-target" />
  </div>
</template>

<script>
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

export default {
  mounted() {
    // Create and show spinner after mount
    createSpinner({ target: this.$refs.container });
    showSpinner(this.$refs.container);
  }
};
</script>
```

---

## Show and Hide Spinner

Control spinner visibility using `showSpinner` and `hideSpinner`. Use Vue `ref`s for state and combine with `setTimeout` for async simulation:

```vue
<template>
  <div>
    <button :disabled="isLoading" @click="startLoading">
      {{ isLoading ? 'Loading...' : 'Load Data' }}
    </button>
    <div ref="containerRef" class="spinner-container" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-vue-popups';

const containerRef = ref(null);
const isLoading = ref(false);

onMounted(() => {
  if (containerRef.value) {
    // Create spinner once — show/hide separately
    createSpinner({ target: containerRef.value });
  }
});

const startLoading = () => {
  isLoading.value = true;
  showSpinner(containerRef.value);

  // Simulate async work
  setTimeout(() => {
    hideSpinner(containerRef.value);
    isLoading.value = false;
  }, 3000);
};
</script>

<style scoped>
.spinner-container {
  width: 300px;
  height: 200px;
  position: relative;
}
</style>
```

> ✅ `hideSpinner` hides the spinner but does **not** destroy it — you can `showSpinner` again later.

---

## Spinner with Label

Add descriptive text alongside the spinner:

```vue
<template>
  <div ref="labeledRef" class="spinner-labeled" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const labeledRef = ref(null);

onMounted(() => {
  if (labeledRef.value) {
    createSpinner({
      target: labeledRef.value,
      label: 'Loading data, please wait...',
      width: '40px'
    });
    showSpinner(labeledRef.value);
  }
});
</script>

<style scoped>
.spinner-labeled {
  height: 150px;
}
</style>
```

---

## Full-Page Overlay Spinner

Block the entire page during async operations:

```vue
<template>
  <div class="app-content">Application content here</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-vue-popups';

let timer: ReturnType<typeof setTimeout>;

onMounted(() => {
  // Use document.body as target for full-page overlay
  createSpinner({
    target: document.body,
    label: 'Loading application...'
  });
  showSpinner(document.body);

  // Hide after initialization completes
  timer = setTimeout(() => {
    hideSpinner(document.body);
  }, 2000);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>
```

---

## Troubleshooting

### Spinner not appearing
- Ensure `createSpinner` is called **before** `showSpinner`
- Confirm the target element exists in the DOM when `createSpinner` runs (use `onMounted`, not synchronous top-level script)
- Check that CSS is properly imported in `main.ts`

### Spinner appears but has no animation
- Verify both `ej2-base` and `ej2-vue-popups` CSS are imported
- Ensure `ej2-base` CSS comes **before** `ej2-vue-popups` CSS

### TypeScript error on getElementById
- Cast the result: `document.getElementById('id') as HTMLElement`
- Or use `ref<HTMLDivElement>(null)` and null-check before use

### Spinner stays visible after data loads
- Call `hideSpinner` inside a `finally` block to ensure cleanup runs on success or error
- Make sure the same `ref` value is passed to both `createSpinner` and `hideSpinner`

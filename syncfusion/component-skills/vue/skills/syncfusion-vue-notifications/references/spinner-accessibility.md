# Accessibility — Vue 3 Spinner

## Table of Contents
- [Overview](#overview)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Announcements](#screen-reader-announcements)
- [High Contrast Mode](#high-contrast-mode)
- [Keyboard Accessibility](#keyboard-accessibility)
- [Focus Management](#focus-management)
- [Accessible Spinner Pattern](#accessible-spinner-pattern)
- [WCAG 2.1 Compliance Notes](#wcag-21-compliance-notes)

---

## Overview

The Syncfusion Spinner is a visual loading indicator. Because it blocks user interaction during loading, accessibility considerations focus on:

- Communicating loading state to screen readers via ARIA live regions
- Providing meaningful labels
- Supporting high contrast mode via the `'HighContrast'` spinner type
- Managing focus appropriately when spinner appears/disappears

---

## ARIA Attributes

The Spinner renders with the following ARIA roles and attributes by default:

| Attribute | Value | Purpose |
|---|---|---|
| `role` | `"progressbar"` or not set (varies by version) | Indicates it is an indeterminate progress indicator |
| `aria-label` | Derived from the `label` property | Announces the loading message |
| `aria-busy` | Set on parent container | Signals that the region is loading |

**Best practice: manage `aria-busy` yourself** in Vue 3 by binding the attribute to a reactive ref:

```vue
<template>
  <div>
    <button :disabled="loading" @click="startLoad">Load Data</button>
    <div
      ref="ref"
      :aria-busy="loading"
      aria-label="Content area"
      class="spinner-target"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-vue-popups';

const ref = ref(null);
const loading = ref(false);

onMounted(() => {
  if (ref.value) {
    createSpinner({
      target: ref.value,
      label: 'Loading content, please wait'
    });
  }
});

const startLoad = async () => {
  loading.value = true;
  showSpinner(ref.value);

  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
  } finally {
    hideSpinner(ref.value);
    loading.value = false;
  }
};
</script>

<style scoped>
.spinner-target { min-height: 120px; position: relative; }
</style>
```

---

## Screen Reader Announcements

Use an ARIA live region to announce loading state changes to screen reader users. In Vue 3, drive the live-region text from a reactive ref:

```vue
<template>
  <div>
    <!-- Visually hidden live region for screen readers -->
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
    >
      {{ announcement }}
    </div>

    <button @click="fetchData">Fetch Data</button>
    <div ref="spinnerRef" class="spinner-area" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-vue-popups';

const spinnerRef = ref(null);
const announcement = ref('');

onMounted(() => {
  if (spinnerRef.value) {
    createSpinner({
      target: spinnerRef.value,
      label: 'Loading...'
    });
  }
});

const fetchData = async () => {
  // Announce start
  announcement.value = 'Loading data, please wait.';
  showSpinner(spinnerRef.value);

  try {
    await new Promise(resolve => setTimeout(resolve, 2500));
    announcement.value = 'Data loaded successfully.';
  } catch {
    announcement.value = 'Failed to load data. Please try again.';
  } finally {
    hideSpinner(spinnerRef.value);
  }
};
</script>

<style scoped>
.spinner-area { height: 200px; position: relative; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
</style>
```

**Key patterns:**
- `role="status"` + `aria-live="polite"` — announces changes without interrupting current speech
- `aria-live="assertive"` — use for urgent messages that should interrupt (e.g., errors)
- `aria-atomic="true"` — reads the entire region content, not just changed parts

---

## High Contrast Mode

Use `type: 'HighContrast'` for users with high contrast display settings:

```vue
<template>
  <div ref="ref" class="hc-bg" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const ref = ref(null);

onMounted(() => {
  if (ref.value) {
    createSpinner({
      target: ref.value,
      type: 'HighContrast',
      label: 'Loading...'
    });
    showSpinner(ref.value);
  }
});
</script>

<style scoped>
.hc-bg { height: 200px; background: #000; }
</style>
```

**Detect and apply high contrast automatically:**

```ts
// src/main.ts
import { setSpinner } from '@syncfusion/ej2-vue-popups';

const prefersHighContrast = window.matchMedia('(forced-colors: active)').matches;
setSpinner({
  type: prefersHighContrast ? 'HighContrast' : 'Fluent2'
});
```

Import high contrast CSS:

```css
@import '@syncfusion/ej2-base/styles/highcontrast.css';
@import '@syncfusion/ej2-vue-popups/styles/highcontrast.css';
```

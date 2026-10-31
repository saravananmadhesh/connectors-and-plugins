# Spinner Features — Vue 3 Spinner

## Table of Contents
- [Global Spinner Configuration (setSpinner)](#global-spinner-configuration-setspinner)
- [Spinner Types and Themes](#spinner-types-and-themes)
- [Spinner Size (width)](#spinner-size-width)
- [Spinner Label](#spinner-label)
- [Custom Template](#custom-template)
- [Show and Hide Control](#show-and-hide-control)
- [Multiple Spinners on a Page](#multiple-spinners-on-a-page)
- [Spinner with Async Data Fetching](#spinner-with-async-data-fetching)
- [Spinner with Reactive State](#spinner-with-reactive-state)
- [Spinner Inside a Card or Modal](#spinner-inside-a-card-or-modal)

---

## Global Spinner Configuration (setSpinner)

Use `setSpinner` to apply a default theme or CSS class to **all** spinners on the page. Call it **before** any `createSpinner` call — typically at the top of `main.ts` or in a module-level statement:

```ts
// src/main.ts
import { setSpinner } from '@syncfusion/ej2-vue-popups';

// Set global spinner type before any component creates a spinner
setSpinner({ type: 'Bootstrap5' });
```

```vue
<template>
  <div ref="containerRef" class="container" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const containerRef = ref(null);

onMounted(() => {
  // This spinner inherits the Bootstrap5 type set globally
  createSpinner({ target: containerRef.value });
  showSpinner(containerRef.value);
});
</script>

<style scoped>
.container { height: 200px; }
</style>
```

**When to use `setSpinner`:**
- Your app has a theme that doesn't match the default spinner style
- You want consistent spinner appearance without specifying `type` on every `createSpinner` call
- You want to inject a custom template across all spinners

```ts
// Global custom CSS class for all spinners
setSpinner({ cssClass: 'app-spinner' });

// Global custom template for all spinners
setSpinner({ template: '<div class="my-custom-loader"></div>' });
```

---

## Spinner Types and Themes

Set the visual theme of the spinner using the `type` property on `createSpinner` or globally via `setSpinner`. In Vue 3, use a `v-for` to render multiple targets:

```vue
<template>
  <div class="types-row">
    <div v-for="t in targets" :key="t.id" class="type-block">
      <p>{{ t.id }}</p>
      <div :ref="el => (containerRefs[t.id] = el)" class="spinner-box" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const targets = ['material', 'material3', 'bootstrap5', 'fluent2', 'tailwind3'];
const containerRefs = {};

const typeMap = {
  material: 'Material',
  material3: 'Material3',
  bootstrap5: 'Bootstrap5',
  fluent2: 'Fluent2',
  tailwind3: 'Tailwind3'
};

onMounted(() => {
  targets.forEach(id => {
    const el = containerRefs[id];
    if (el) {
      createSpinner({ target: el, type: typeMap[id] });
      showSpinner(el);
    }
  });
});
</script>

<style scoped>
.types-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.spinner-box {
  width: 80px;
  height: 80px;
}
</style>
```

**All supported `type` values:**

| Value | Description |
|---|---|
| `'Material'` | Google Material Design |
| `'Material3'` | Material Design 3 |
| `'Fabric'` | Microsoft Fabric / Office |
| `'Bootstrap'` | Bootstrap 3 |
| `'Bootstrap4'` | Bootstrap 4 |
| `'Bootstrap5'` | Bootstrap 5 |
| `'HighContrast'` | Accessibility high contrast |
| `'Tailwind'` | Tailwind CSS |
| `'Tailwind3'` | Tailwind CSS v3 |
| `'Fluent'` | Microsoft Fluent |
| `'Fluent2'` | Microsoft Fluent 2 |

---

## Spinner Size (width)

Control the size of the spinner icon via the `width` property:

```vue
<template>
  <div class="sizes-row">
    <div class="size-block">
      <p>Small (20px)</p>
      <div ref="smallRef" class="size-spinner" />
    </div>
    <div class="size-block">
      <p>Medium (34px)</p>
      <div ref="mediumRef" class="size-spinner medium" />
    </div>
    <div class="size-block">
      <p>Large (56px)</p>
      <div ref="largeRef" class="size-spinner large" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const smallRef = ref(null);
const mediumRef = ref(null);
const largeRef = ref(null);

onMounted(() => {
  if (smallRef.value) {
    createSpinner({ target: smallRef.value, width: '20px' });
    showSpinner(smallRef.value);
  }
  if (mediumRef.value) {
    createSpinner({ target: mediumRef.value, width: '34px' });
    showSpinner(mediumRef.value);
  }
  if (largeRef.value) {
    createSpinner({ target: largeRef.value, width: '56px' });
    showSpinner(largeRef.value);
  }
});
</script>

<style scoped>
.sizes-row {
  display: flex;
  gap: 40px;
  align-items: center;
}
.size-spinner { height: 60px; width: 60px; }
.size-spinner.medium { height: 80px; width: 80px; }
.size-spinner.large { height: 120px; width: 120px; }
</style>
```

> `width` accepts a string with units (`'34px'`, `'2rem'`) or a number (interpreted as pixels).

---

## Spinner Label

Display a text message alongside the spinner using the `label` property:

```vue
<template>
  <div ref="ref" class="labeled" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const ref = ref(null);

onMounted(() => {
  if (ref.value) {
    createSpinner({
      target: ref.value,
      label: 'Loading data, please wait...',
      width: '40px'
    });
    showSpinner(ref.value);
  }
});
</script>

<style scoped>
.labeled {
  height: 200px;
  position: relative;
}
</style>
```

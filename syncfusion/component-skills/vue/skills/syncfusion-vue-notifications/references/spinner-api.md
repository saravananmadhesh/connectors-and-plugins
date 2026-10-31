# API Reference — Vue 3 Spinner

> Source: `@syncfusion/ej2-vue-popups` / `@syncfusion/ej2-popups`  
> Official Docs: [https://ej2.syncfusion.com/vue/documentation/spinner/](https://ej2.syncfusion.com/vue/documentation/spinner/)

The Syncfusion Vue 3 Spinner is **not a component class** — it is a set of **utility functions** exported from `@syncfusion/ej2-vue-popups`. There is no `SpinnerComponent` class.

## Table of Contents
1. [Import Paths](#import-paths)
2. [createSpinner](#createspinner)
3. [showSpinner](#showspinner)
4. [hideSpinner](#hidespinner)
5. [setSpinner](#setspinner)
6. [SpinnerArgs Interface](#spinnerargs-interface)
7. [SetSpinnerArgs Interface](#setspinnerargs-interface)
8. [SpinnerType Values](#spinnertype-values)
9. [Quick Reference Table](#quick-reference-table)

---

## Import Paths

```ts
// Vue 3 (recommended)
import {
  createSpinner,
  showSpinner,
  hideSpinner,
  setSpinner
} from '@syncfusion/ej2-vue-popups';

// Core JavaScript/TypeScript (framework-agnostic)
import {
  createSpinner,
  showSpinner,
  hideSpinner,
  setSpinner
} from '@syncfusion/ej2-popups';
```

---

## createSpinner

Creates a spinner overlay on the specified target element.

```ts
function createSpinner(args: SpinnerArgs): void;
```

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `args` | `SpinnerArgs` | ✅ Yes | Configuration object. See [SpinnerArgs](#spinnerargs-interface). |

### Example

```vue
<template>
  <div ref="container" class="container" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createSpinner, showSpinner } from '@syncfusion/ej2-vue-popups';

const container = ref(null);

onMounted(() => {
  createSpinner({ target: container.value });
  showSpinner(container.value);
});
</script>

<style scoped>
.container { height: 200px; }
</style>
```

### With Options

```ts
createSpinner({
  target: document.getElementById('myDiv') as HTMLElement,
  width: '34px',
  label: 'Loading...',
  cssClass: 'custom-spinner',
  type: 'Bootstrap5'
});
```

---

## showSpinner

Makes the spinner visible on the target element.

```ts
function showSpinner(container: HTMLElement): void;
```

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `container` | `HTMLElement` | ✅ Yes | The DOM element where the spinner was created. |

### Example

```ts
showSpinner(document.getElementById('container') as HTMLElement);
```

---

## hideSpinner

Hides the spinner on the target element. The spinner is **not destroyed**, only hidden.

```ts
function hideSpinner(container: HTMLElement): void;
```

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `container` | `HTMLElement` | ✅ Yes | The DOM element where the spinner was created. |

### Example

```ts
hideSpinner(document.getElementById('container') as HTMLElement);
```

---

## setSpinner

Changes spinners globally across the entire page from the application level. Call **before** creating individual spinners to apply a global default.

```ts
function setSpinner(args: SetSpinnerArgs): void;
```

### Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `args` | `SetSpinnerArgs` | ✅ Yes | Global spinner configuration. See [SetSpinnerArgs](#setspinnerargs-interface). |

### Example

```ts
import { setSpinner } from '@syncfusion/ej2-vue-popups';

// Call before createSpinner calls (e.g., in main.ts)
setSpinner({ type: 'Bootstrap5', cssClass: 'global-spinner' });
```

---

## SpinnerArgs Interface

Arguments used with `createSpinner()`.

```ts
interface SpinnerArgs {
  target: HTMLElement;
  width?: string | number;
  label?: string;
  cssClass?: string;
  template?: string;
  type?: SpinnerType;
}
```

### Properties

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `target` | `HTMLElement` | ✅ Yes | — | The DOM element to render the spinner on. |
| `width` | `string \| number` | ❌ No | theme default | Width (size) of the spinner icon. E.g. `'34px'` or `34`. |
| `label` | `string` | ❌ No | — | Text label displayed alongside the spinner. |
| `cssClass` | `string` | ❌ No | `''` | One or more CSS class names added to the spinner root for custom styling. |
| `template` | `string` | ❌ No | — | Custom HTML string to replace the default spinner animation. |
| `type` | `SpinnerType` | ❌ No | auto (from theme) | Spinner visual style/theme. See [SpinnerType Values](#spinnertype-values). |

### Example with All Properties

```ts
createSpinner({
  target: document.getElementById('myElement') as HTMLElement,
  width: '50px',
  label: 'Please wait...',
  cssClass: 'e-spin-overlay',
  type: 'Material3'
});
```

---

## SetSpinnerArgs Interface

Arguments used with `setSpinner()` for global defaults.

```ts
interface SetSpinnerArgs {
  template?: string;
  cssClass?: string;
  type?: SpinnerType;
}
```

### Properties

| Property | Type | Description |
|---|---|---|
| `template` | `string` | Default template applied to all spinners created after the call. |
| `cssClass` | `string` | Default CSS class added to all spinners. |
| `type` | `SpinnerType` | Default spinner visual style. |

---

## SpinnerType Values

```ts
type SpinnerType =
  | 'Material'
  | 'Material3'
  | 'Fabric'
  | 'Bootstrap'
  | 'Bootstrap4'
  | 'Bootstrap5'
  | 'HighContrast'
  | 'Tailwind'
  | 'Tailwind3'
  | 'Fluent'
  | 'Fluent2';
```

---

## Quick Reference Table

| Function | Signature | Purpose |
|---|---|---|
| `createSpinner` | `(args: SpinnerArgs) => void` | Initialize spinner on DOM element |
| `showSpinner` | `(el: HTMLElement) => void` | Show an existing spinner |
| `hideSpinner` | `(el: HTMLElement) => void` | Hide a visible spinner |
| `setSpinner` | `(args: SetSpinnerArgs) => void` | Set global defaults for all spinners |

**`SpinnerArgs` properties:** `target` (required), `width`, `label`, `cssClass`, `template`, `type`

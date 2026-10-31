# Getting Started with Syncfusion Vue 3 Toast

## Table of Contents
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Basic Toast Component](#basic-toast-component)
- [Composition API Pattern](#composition-api-pattern)
- [Toast with Custom Target](#toast-with-custom-target)
- [Triggering Toast from a Button](#triggering-toast-from-a-button)

---

## Installation

Install the Syncfusion Vue 3 notifications package, which contains the Toast component:

```bash
npm install @syncfusion/ej2-vue-notifications --save
```

Toast depends on buttons and popups packages (installed automatically as peers):
```bash
npm install @syncfusion/ej2-vue-buttons @syncfusion/ej2-popups --save
```

---

## CSS Imports

Add all required CSS files in `src/assets/styles.css` (or your global stylesheet). In Vue 3 with Vite, CSS imports are typically added inside the SFC or `main.ts`:

```ts
// src/main.ts
import "@syncfusion/ej2-material3-theme/styles/toast/index.css";
```

Other available themes: `material.css`, `bootstrap5.css`, `fluent.css`, `fabric.css`

---

## Basic Toast Component

Import `ToastComponent` from the notifications package:

```ts
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';
```

The Toast renders hidden by default. Call `toastRef.value.show()` to display it. Use the `created` event to trigger the initial show once the component has mounted.

---

## Composition API Pattern

In Vue 3 Composition API, store the component instance with a template `ref` and use it to invoke methods like `show()` and `hide()`:

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Matt sent you a friend request"
    content="Hey, wanna dress up as wizards and ride our hoverboards?"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);

const onToastCreated = () => {
  toastRef.value?.show();
};
</script>
```

**Key points:**
- The `ref` attribute (`toastRef`) captures the component instance for imperative access
- The `created` event fires after the component mounts — call `show()` here for auto-display
- `title` renders as the toast headline; `content` as the body
- Optional chaining (`toastRef.value?.show()`) guards against undefined during initial render

---

## Options API Pattern

If you prefer Options API, capture the instance inside `mounted()` and use `this.$refs`:

```vue
<template>
  <ToastComponent
    ref="toast"
    title="Matt sent you a friend request"
    content="Hey, wanna dress up as wizards and ride our hoverboards?"
    :created="onToastCreated"
  />
</template>

<script>
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

export default {
  components: { ToastComponent },
  methods: {
    onToastCreated() {
      this.$refs.toast.show();
    }
  }
};
</script>
```

---

## Toast with Custom Target

By default, Toast renders in `document.body`. Render inside a specific container element using the `target` property — useful for modals, panels, and scoped notification areas:

```vue
<template>
  <div>
    <div id="toast_target" />
    <ToastComponent
      id="toast_target"
      ref="toastRef"
      title="Sample Toast"
      content="Rendered inside a custom container"
      target="#toast_target"
      :created="onToastCreated"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const onToastCreated = () => toastRef.value?.show();
</script>
```

> **Note:** When `target` is set, toast `position` is calculated relative to that container rather than the viewport.

---

## Triggering Toast from a Button

```vue
<template>
  <div>
    <button @click="showToast">Show Toast</button>
    <ToastComponent
      ref="toastRef"
      title="Notification"
      content="This is a toast message"
      :position="position"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });

const showToast = () => {
  toastRef.value?.show();
};
</script>
```

> React's `useRef` becomes Vue's `ref()`. React's `<button onClick={…}>` becomes Vue's `<button @click="…">`. React props like `position={{ X: 'Right', Y: 'Bottom' }}` map to `:position` bound to a `reactive` or `ref` object.

## See Also

- [Configuration options](./toast-configuration.md)
- [Positioning](./toast-position.md)
- [Toast services (ToastUtility)](./toast-services.md)

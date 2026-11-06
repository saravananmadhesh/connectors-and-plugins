# Toast API Reference (Vue 3)

**Source:** https://ej2.syncfusion.com/vue/documentation/api/toast/index-default
**Component:** `ToastComponent` from `@syncfusion/ej2-vue-notifications`

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Supporting Interfaces](#supporting-interfaces)

---

## Properties

### animation
**Type:** `ToastAnimationSettingsModel`  
**Default:** `{ show: { effect: 'FadeIn', duration: 600, easing: 'linear' }, hide: { effect: 'FadeOut', duration: 600, easing: 'linear' } }`

Specifies the animation configuration settings for showing and hiding the toast.

```vue
<template>
  <ToastComponent
    ref="toastRef"
    :animation="animation"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const animation = reactive({
  show: { effect: 'SlideBottomIn', duration: 400, easing: 'ease-out' },
  hide: { effect: 'FadeOut', duration: 300, easing: 'ease-in' }
});
</script>
```

---

### buttons
**Type:** `ButtonModelPropsModel[]`  
**Default:** `[{}]`

Collection of action buttons rendered inside the toast. Each entry uses a `model` (ButtonModel props) and optional `click` handler.

```vue
<template>
  <ToastComponent
    ref="toastRef"
    :buttons="buttons"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const buttons = [
  { model: { content: 'Undo' }, click: () => console.log('Undo') },
  { model: { content: 'Dismiss' } }
];
</script>
```

---

### content
**Type:** `string | HTMLElement | Function`  
**Default:** `null`

Content displayed in the toast body. Accepts plain text, HTML strings, DOM elements, or a Vue slot template (preferred in Vue 3).

```vue
<template>
  <ToastComponent ref="toastRef" content="File saved successfully" />
  <!-- Or via a slot: -->
  <ToastComponent ref="toastRef2">
    <template #content="{ data }">
      <p>File <strong>saved</strong></p>
    </template>
  </ToastComponent>
</template>
```

---

### cssClass
**Type:** `string`  
**Default:** `null`

One or more CSS classes (space-separated) for customizing toast appearance. Built-in semantic classes: `e-toast-success`, `e-toast-info`, `e-toast-warning`, `e-toast-danger`.

```vue
<template>
  <ToastComponent ref="toastRef" cssClass="e-toast-success" />
</template>
```

---

### enableHtmlSanitizer
**Type:** `boolean`  
**Default:** `true`

When `true`, sanitizes HTML content in `title` and `content` to prevent XSS. Set to `false` only when rendering trusted HTML content.

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Persists component state between page reloads.

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Renders the component in right-to-left direction for RTL language support.

```vue
<template>
  <ToastComponent ref="toastRef" :enableRtl="true" />
</template>
```

---

### extendedTimeout
**Type:** `number`  
**Default:** `1000`

Additional milliseconds the toast remains visible after user interaction (hover/focus). Extends display time to prevent accidental dismissal while reading.

```vue
<template>
  <ToastComponent ref="toastRef" :timeOut="3000" :extendedTimeout="5000" />
</template>
```

---

### height
**Type:** `string | number`  
**Default:** `'auto'`

Height of the toast in pixels, numbers, or percentages. Number values are treated as pixels.

```vue
<template>
  <ToastComponent ref="toastRef" :height="250" />
  <ToastComponent ref="toastRef2" height="auto" />
</template>
```

---

### icon
**Type:** `string`  
**Default:** `null`

CSS class for an icon displayed at the top-left corner of the toast. Use Syncfusion icon classes (e.g., `e-icons e-check-circle`) or any icon font class.

```vue
<template>
  <ToastComponent ref="toastRef" icon="e-icons e-check-circle" />
</template>
```

---

### locale
**Type:** `string`  
**Default:** `''`

Overrides the global culture/localization value for this component. Defaults to the application's global culture (`'en-US'`).

---

### newestOnTop
**Type:** `boolean`  
**Default:** `true`

Controls stacking order of multiple toasts. When `true`, newer toasts appear above older ones. When `false`, new toasts append below the existing stack.

```vue
<template>
  <ToastComponent ref="toastRef" :newestOnTop="false" />
</template>
```

---

### position
**Type:** `ToastPositionModel`  
**Default:** `{ X: 'Left', Y: 'Top' }`

Position of the toast within the target container. X accepts `'Left'`, `'Center'`, `'Right'`, or numeric/percentage values. Y accepts `'Top'`, `'Bottom'`, or numeric/percentage values.

```vue
<template>
  <ToastComponent ref="toastRef" :position="position" />
  <!-- Numeric positions -->
  <ToastComponent ref="toastRef2" :position="{ X: 100, Y: 50 }" />
</template>

<script setup>
import { reactive } from 'vue';
const position = reactive({ X: 'Right', Y: 'Bottom' });
</script>
```

---

### progressDirection
**Type:** `ProgressDirectionType` (`'Ltr' | 'Rtl'`)  
**Default:** `'Rtl'`

Direction of progress bar fill. `'Rtl'` fills right-to-left (default), `'Ltr'` fills left-to-right.

```vue
<template>
  <ToastComponent ref="toastRef" :showProgressBar="true" progressDirection="Ltr" />
</template>
```

---

### showCloseButton
**Type:** `boolean`  
**Default:** `false`

Shows a close button allowing users to manually dismiss the toast before timeout.

```vue
<template>
  <ToastComponent ref="toastRef" :showCloseButton="true" />
</template>
```

---

### showProgressBar
**Type:** `boolean`  
**Default:** `false`

Displays a progress bar that visually indicates remaining display time.

```vue
<template>
  <ToastComponent ref="toastRef" :showProgressBar="true" />
</template>
```

---

### target
**Type:** `HTMLElement | Element | string`  
**Default:** `null` (renders in `document.body`)

Target container element or selector where the toast renders. Toast position is calculated relative to this element.

```vue
<template>
  <ToastComponent ref="toastRef" target="#my-panel" />
  <ToastComponent ref="toastRef2" :target="panelEl" />
</template>

<script setup>
import { ref } from 'vue';
const panelEl = ref(null);
</script>
```

---

### template
**Type:** `string | Function`  
**Default:** `null`

HTML string, element ID selector, or Vue `#template` slot for fully custom toast layout. When set, overrides `title` and `content` rendering.

```vue
<template>
  <ToastComponent ref="toastRef" template="#myTemplate" />
  <ToastComponent ref="toastRef2">
    <template #template>
      <div>Custom content</div>
    </template>
  </ToastComponent>
</template>
```

---

### timeOut
**Type:** `number`  
**Default:** `5000`

Duration in milliseconds before the toast auto-dismisses. Set to `0` for a persistent toast that stays until manually closed.

```vue
<template>
  <ToastComponent ref="toastRef" :timeOut="3000" />
  <ToastComponent ref="toastRef2" :timeOut="0" :showCloseButton="true" />
</template>
```

---

### title
**Type:** `string | Function`  
**Default:** `null`

Headline text of the toast. Accepts plain text, HTML strings, or a Vue slot template.

```vue
<template>
  <ToastComponent ref="toastRef" title="Upload Complete" />
</template>
```

---

### width
**Type:** `string | number`  
**Default:** `'300'`

Width of the toast in pixels, numbers, or percentages. Number values are treated as pixels. On mobile, the default is `100%`.

```vue
<template>
  <ToastComponent ref="toastRef" :width="400" />
  <ToastComponent ref="toastRef2" width="100%" />
</template>
```

---

## Methods

### show
**Signature:** `show(toastObj?: ToastModel): void`

Displays the toast. Optionally pass a `ToastModel` object to override component-level properties for this specific invocation.

```ts
// Show with component defaults
toastRef.value?.show();

// Show with per-call overrides
toastRef.value?.show({
  title: 'Dynamic Title',
  content: 'Dynamic content',
  cssClass: 'e-toast-success',
  timeOut: 3000
});
```

---

### hide
**Signature:** `hide(element?: HTMLElement | Element | string): void`

Hides a specific toast element or all toasts when `'All'` is passed.

```ts
toastRef.value?.hide('All');
```

---

## Events

The Vue 3 Toast component supports the following events, bound with `@` syntax:

| Event | Description | Arguments |
|---|---|---|
| `beforeOpen` | Fires before the toast is shown | `ToastBeforeOpenArgs` — set `e.cancel = true` to block |
| `open` | Fires after the toast is shown | `ToastOpenArgs` |
| `click` | Fires when the toast is clicked | `ToastClickEventArgs` — set `e.clickToClose = true` to dismiss on click |
| `beforeClose` | Fires before the toast is hidden | `ToastBeforeCloseArgs` — set `e.cancel = true` to block; check `e.type` for `'swipe' \| 'timeout' \| 'close'` |
| `close` | Fires after the toast is hidden | `ToastCloseArgs` |
| `created` | Fires when the component is mounted | — |
| `destroyed` | Fires when the component is destroyed | — |
| `beforeSanitizeHtml` | Fires before HTML is sanitized | `BeforeSanitizeHtmlArgs` |

```vue
<template>
  <ToastComponent
    ref="toastRef"
    @beforeOpen="onBeforeOpen"
    @open="onOpen"
    @click="onClick"
    @beforeClose="onBeforeClose"
    @close="onClose"
    @created="onCreated"
  />
</template>

<script setup>
const onBeforeOpen = (e) => { /* e.cancel = true to block */ };
const onClick = (e) => { e.clickToClose = true; };
const onBeforeClose = (e) => {
  if (e.type === 'swipe') e.cancel = true;
};
const onCreated = () => toastRef.value?.show();
</script>
```

## See Also

- [Getting started](./toast-getting-started.md)
- [Configuration](./toast-configuration.md)
- [Positioning](./toast-position.md)

# Toast Animation (Vue 3)

Configure how toasts animate into and out of view using the `animation` property. Animations improve visual feedback and draw user attention to notifications.

## Animation Property Structure

```ts
animation: {
  show: { effect: 'FadeIn', duration: 600, easing: 'linear' },
  hide: { effect: 'FadeOut', duration: 600, easing: 'linear' }
}
```

**Defaults:** `show.effect = 'FadeIn'`, `hide.effect = 'FadeOut'`, duration 600ms, easing linear.

---

## Basic Example

```vue
<template>
  <div>
    <button @click="showToast">Show Toast</button>
    <ToastComponent
      ref="toastRef"
      title="Animated Toast"
      content="Slides in from the right"
      :position="position"
      :animation="animation"
      :showProgressBar="true"
      :created="onToastCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });
const animation = reactive({
  show: { effect: 'SlideRightIn' },
  hide: { effect: 'SlideLeftOut' }
});

const onToastCreated = () => toastRef.value?.show();
const showToast = () => toastRef.value?.show();
</script>
```

> The `Effect` enum (from `@syncfusion/ej2-base`) is optional in Vue — plain strings are accepted, so TypeScript-style casts are not required.

---

## Available Effects

These effect names can be used for both `show` and `hide` animation settings:

| Effect | Description |
|---|---|
| `FadeIn` / `FadeOut` | Opacity transition (default) |
| `FadeZoomIn` / `FadeZoomOut` | Fade combined with scale |
| `FlipLeftDownIn` / `FlipLeftDownOut` | 3D flip from left downward |
| `FlipLeftUpIn` / `FlipLeftUpOut` | 3D flip from left upward |
| `FlipRightDownIn` / `FlipRightDownOut` | 3D flip from right downward |
| `FlipRightUpIn` / `FlipRightUpOut` | 3D flip from right upward |
| `SlideBottomIn` / `SlideBottomOut` | Slides from bottom |
| `SlideRightIn` / `SlideLeftOut` | Slides from right / exits left |
| `ZoomIn` / `ZoomOut` | Scale transform |

> Not all Effects are directional pairs — mix show and hide effects freely based on desired UX (e.g., `SlideBottomIn` show with `FadeOut` hide).

---

## Changing Animation Dynamically

Update animation effects at runtime by mutating the reactive object you bound to `:animation`:

```ts
// Change show effect
animation.show = { effect: 'ZoomIn' };

// Change hide effect
animation.hide = { effect: 'ZoomOut' };
```

This is useful when you want different animations for different toast types.

---

## Controlling Duration and Easing

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Eased Animation"
    content="Custom duration and easing"
    :position="position"
    :animation="animation"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });
const animation = reactive({
  show: { effect: 'FadeIn', duration: 300, easing: 'ease-out' },
  hide: { effect: 'FadeOut', duration: 800, easing: 'ease-in' }
});
</script>
```

- `duration` — milliseconds for the animation to complete
- `easing` — CSS easing function (`'linear'`, `'ease'`, `'ease-in'`, `'ease-out'`, `'ease-in-out'`)

---

## Accessibility Note

Users who have set `prefers-reduced-motion` in their OS may experience issues with heavy animations. Consider reducing or disabling animations for these users:

```css
@media (prefers-reduced-motion: reduce) {
  .e-toast-container .e-toast {
    animation: none !important;
    transition: none !important;
  }
}
```

## See Also

- [API reference](./toast-api.md) — `animation` property
- [Getting started](./toast-getting-started.md)

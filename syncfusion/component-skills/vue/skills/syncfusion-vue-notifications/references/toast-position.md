# Toast Positioning (Vue 3)

## Table of Contents
- [Predefined Positions](#predefined-positions)
- [Custom Positions](#custom-positions)
- [Positioning Relative to a Target](#positioning-relative-to-a-target)
- [Multiple Toasts at Different Positions](#multiple-toasts-at-different-positions)

---

## Predefined Positions

Configure toast placement using the `position` property with `X` and `Y` string values. In Vue 3, bind `position` to a `reactive` object so X/Y stay reactive when changed:

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Notification"
    content="Task completed successfully"
    :position="position"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });
const onToastCreated = () => toastRef.value?.show();
</script>
```

**X values (horizontal):**
| Value | Placement |
|---|---|
| `'Left'` | Left edge of the screen/container |
| `'Center'` | Horizontally centered |
| `'Right'` | Right edge of the screen/container |

**Y values (vertical):**
| Value | Placement |
|---|---|
| `'Top'` | Top of the screen/container |
| `'Bottom'` | Bottom of the screen/container |

**Common combinations:**

| Position | X | Y |
|---|---|---|
| Top-Left | `'Left'` | `'Top'` |
| Top-Center | `'Center'` | `'Top'` |
| Top-Right | `'Right'` | `'Top'` |
| Bottom-Left | `'Left'` | `'Bottom'` |
| Bottom-Center | `'Center'` | `'Bottom'` |
| Bottom-Right (default-like) | `'Right'` | `'Bottom'` |

> **Note:** When multiple toasts are visible, position changes only apply to newly displayed toasts. Existing toasts retain their original positions. If `width="100%"`, the `X` position value has no effect.

---

## Custom Positions

For non-standard layouts, specify exact numeric or percentage coordinates:

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Custom Positioned Toast"
    content="Pinned at 100px from left, 50px from top"
    :position="position"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 100, Y: 50 });
const onToastCreated = () => toastRef.value?.show();
</script>
```

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Centered Custom Toast"
    content="At 40% from left, 80% from top"
    :position="position"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: '40%', Y: '80%' });
const onToastCreated = () => toastRef.value?.show();
</script>
```

Numeric values are interpreted as pixels. Percentage values are calculated relative to the target container (or viewport when no target is set).

---

## Positioning Relative to a Target

When `target` is set, position is calculated relative to the target element rather than the viewport:

```vue
<template>
  <div id="toast_pos_target" class="toast-container">
    <button @click="showToast">Show Toast</button>
    <ToastComponent
      ref="toastRef"
      title="Panel Notification"
      content="This toast is inside the panel"
      target="#toast_pos_target"
      :position="position"
      :created="onToastCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });
const onToastCreated = () => toastRef.value?.show();
const showToast = () => toastRef.value?.show();
</script>

<style scoped>
.toast-container {
  position: relative;
  height: 400px;
}
</style>
```

---

## Multiple Toasts at Different Positions

To show toasts simultaneously at different screen positions, create multiple `ToastComponent` instances — each with its own position configuration. A single instance can only occupy one position at a time:

```vue
<template>
  <div>
    <button @click="showBoth">Show Both</button>

    <!-- Bottom-right toast -->
    <ToastComponent
      ref="toastBottom"
      title="Warning!"
      content="There was a problem with your network connection."
      :position="positionBottom"
      :click="onClick"
    />

    <!-- Top-right toast -->
    <ToastComponent
      ref="toastTop"
      title="Info"
      content="Please check your inbox."
      :position="positionTop"
      :click="onClick"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastBottom = ref(null);
const toastTop = ref(null);

const positionBottom = reactive({ X: 'Right', Y: 'Bottom' });
const positionTop = reactive({ X: 'Right', Y: 'Top' });

const onClick = (e) => {
  e.clickToClose = true;
};

const showBoth = () => {
  toastBottom.value?.show();
  toastTop.value?.show();
};
</script>
```

**When to use multiple instances:**
- Show success (top-right) and error (bottom-right) simultaneously
- Different message types that should not compete for the same screen area
- Separate auto-dismiss timers per location

## See Also

- [Configuration options](./toast-configuration.md)
- [Multiple toasts how-to](./toast-services.md)

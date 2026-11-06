# Toast Timeout and Dismissal (Vue 3)

## Table of Contents
- [Automatic Dismissal (timeOut)](#automatic-dismissal-timeout)
- [Extended Timeout on Hover](#extended-timeout-on-hover)
- [Static Persistent Toasts](#static-persistent-toasts)
- [Click-to-Close](#click-to-close)
- [Prevent Swipe-to-Close on Mobile](#prevent-swipe-to-close-on-mobile)

---

## Automatic Dismissal (timeOut)

The `timeOut` property controls how many milliseconds a toast remains visible before auto-dismissing. The default is 5000 ms (5 seconds):

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Auto-dismiss in 3s"
    content="This toast will disappear in 3 seconds"
    :timeOut="3000"
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

You can also override `timeOut` per-call when using `show()`:

```ts
// Show a toast with a specific timeout for this invocation only
toastRef.value?.show({ timeOut: 8000 });
```

This allows a single `ToastComponent` to display different messages with different durations.

---

## Extended Timeout on Hover

`extendedTimeout` adds extra display time when a user hovers over the toast — giving them time to read or interact without the toast dismissing mid-interaction. Default is 1000 ms:

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Hover to extend"
    content="I'll stay longer while you hover"
    :timeOut="3000"
    :extendedTimeout="5000"
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

When the user stops hovering, the original `timeOut` countdown resumes from where it paused.

---

## Static Persistent Toasts

Set `timeOut={0}` to create a toast that stays on screen until the user explicitly closes it. Combine with `showCloseButton` for full manual control:

```vue
<template>
  <div>
    <button @click="showPersistent">Show Persistent Toast</button>
    <ToastComponent
      ref="toastRef"
      title="Action Required"
      content="Please review the pending changes before proceeding."
      :position="position"
      :timeOut="0"
      :showCloseButton="true"
      :buttons="buttons"
      :created="onToastCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });

const buttons = [
  { model: { content: 'Ignore' } },
  { model: { content: 'Reply' } }
];

const showPersistent = () => toastRef.value?.show({ timeOut: 0 });
const onToastCreated = () => toastRef.value?.show({ timeOut: 0 });
</script>
```

**When to use:**
- Critical alerts that must not auto-dismiss
- Action-required notifications with response buttons
- Toasts with complex content users need time to read

---

## Click-to-Close

Allow users to close a toast by clicking anywhere on it. Set `e.clickToClose = true` inside the `click` event handler:

```vue
<template>
  <div>
    <button @click="showToast">Show Toast</button>
    <ToastComponent
      ref="toastRef"
      title="Click to dismiss"
      content="Click anywhere on this toast to close it"
      :position="position"
      :click="onClick"
      :created="onToastCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });

const onClick = (e) => {
  e.clickToClose = true;
};

const onToastCreated = () => toastRef.value?.show();
const showToast = () => toastRef.value?.show();
</script>
```

**Best practice:** Use click-to-close with `timeOut={0}` so the toast does not auto-dismiss before the user can act.

---

## Prevent Swipe-to-Close on Mobile

By default, users can swipe a toast away on mobile devices. To prevent this for critical notifications, cancel swipe actions in the `beforeClose` event:

```vue
<template>
  <div>
    <button @click="showToast">Show Toast</button>
    <ToastComponent
      ref="toastRef"
      title="Matt sent you a friend request"
      content="Hey, wanna dress up as wizards and ride our hoverboards?"
      :position="position"
      :beforeClose="onBeforeClose"
      :created="onToastCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Center' });

const onBeforeClose = (e) => {
  if (e.type === 'swipe') {
    e.cancel = true; // Block swipe dismissal only
  }
  // Other close triggers (timeout, close button) proceed normally
};

const onToastCreated = () => toastRef.value?.show();
const showToast = () => toastRef.value?.show();
</script>
```

**`e.type` values in `beforeClose`:**
- `'swipe'` — mobile swipe gesture
- `'timeout'` — auto-dismiss due to `timeOut` expiry
- `'close'` — close button clicked

> Checking `e.type === 'swipe'` ensures only swipe dismissal is blocked; timeout and button-close still work normally.

## See Also

- [Configuration options](./toast-configuration.md)
- [API reference](./toast-api.md)

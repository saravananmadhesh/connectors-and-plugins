# Toast Services and Advanced Patterns (Vue 3)

## Table of Contents
- [ToastUtility — Quick Toasts](#toastutility--quick-toasts)
- [ToastUtility with ToastModel](#toastutility-with-toastmodel)
- [Prevent Duplicate Toasts](#prevent-duplicate-toasts)
- [Restrict Maximum Visible Toasts](#restrict-maximum-visible-toasts)
- [Play Audio on Toast Open](#play-audio-on-toast-open)

---

## ToastUtility — Quick Toasts

`ToastUtility.show()` displays a toast without requiring a `ToastComponent` in the template tree. Ideal for notifications triggered deep in service logic or composable functions where accessing a component ref is inconvenient.

### Predefined type toasts

Four built-in types apply automatic styling and icons:

```ts
import { ToastUtility } from '@syncfusion/ej2-vue-notifications';

// Information (blue)
ToastUtility.show('Please read the comments carefully', 'Information', 20000);

// Success (green)
ToastUtility.show('Your message has been sent successfully', 'Success', 20000);

// Warning (yellow/orange)
ToastUtility.show('There was a problem with your network connection', 'Warning', 20000);

// Error (red)
ToastUtility.show('A problem occurred while submitting data', 'Error', 20000);
```

**Signature:** `ToastUtility.show(content, type, timeOut)`

| Param | Type | Description |
|---|---|---|
| `content` | `string` | Message text |
| `type` | `'Information' \| 'Success' \| 'Error' \| 'Warning'` | Built-in style variant |
| `timeOut` | `number` | Duration in ms; `0` for persistent |

> In Vue, importing and calling `ToastUtility.show(...)` from any composable, store action, or `.ts` module is the most direct way to fire a toast. The service is framework-agnostic — you don't need a Vue component or ref to use it.

### Hiding utility toasts

`ToastUtility.show()` returns a Toast object. Call `hide('All')` on it to dismiss:

```ts
import { ToastUtility } from '@syncfusion/ej2-vue-notifications';
import { ref } from 'vue';

// Module-scope ref so any function can access the active toast
let toastObj = ref(null);

export function showInfo() {
  toastObj.value = ToastUtility.show('Loading your data...', 'Information', 0);
}

export function hideAll() {
  toastObj.value?.hide('All');
}
```

---

## ToastUtility with ToastModel

For advanced configuration, pass a full `ToastModel` object instead of type arguments:

```ts
import { ToastUtility } from '@syncfusion/ej2-vue-notifications';
import { ref } from 'vue';

let toastObj = ref(null);

export function showAdvancedToast() {
  toastObj.value = ToastUtility.show({
    title: 'File Uploaded',
    content: 'report_q4.pdf was uploaded successfully',
    timeOut: 20000,
    position: { X: 'Right', Y: 'Bottom' },
    showCloseButton: true,
    click: () => {
      console.log('Toast clicked');
    },
    buttons: [{
      model: { content: 'View File' },
      click: () => {
        toastObj.value?.hide('All');
        // navigate to file...
      }
    }]
  });
}
```

Any property available on `ToastComponent` can be passed here, including `animation`, `cssClass`, `template`, `showProgressBar`, `newestOnTop`, and all events.

---

## Prevent Duplicate Toasts

Use the `beforeOpen` event to detect and cancel toasts with duplicate content or titles, avoiding notification fatigue:

```vue
<template>
  <div>
    <button @click="showNext">Show Toast</button>
    <ToastComponent
      ref="toastRef"
      :position="position"
      :beforeOpen="onBeforeOpen"
      :close="onClose"
      :created="onToastCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive, shallowRef } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Center' });

const toasts = shallowRef([
  { title: 'Warning !', content: 'Network connection problem.', isOpen: false },
  { title: 'Success !', content: 'Message sent successfully.', isOpen: false },
  { title: 'Error !', content: 'Data submission failed.', isOpen: false },
]);
const toastFlag = ref(0);

// Mark toast as closed when it hides
const onClose = (e) => {
  for (const toast of toasts.value) {
    if (toast.title === e.options.title) {
      toast.isOpen = false;
    }
  }
};

// Cancel if a toast with the same title is already visible
const onBeforeOpen = (e) => {
  for (const toast of toasts.value) {
    if (toast.title === e.options.title) {
      if (toast.isOpen) {
        e.cancel = true; // already showing — block duplicate
      } else {
        toast.isOpen = true; // mark as now open
      }
      return;
    }
  }
};

const showNext = () => {
  toastRef.value?.show(toasts.value[toastFlag.value]);
  toastFlag.value = (toastFlag.value + 1) % toasts.value.length;
};

const onToastCreated = () => {
  toastRef.value?.show(toasts.value[toastFlag.value]);
  toastFlag.value++;
};
</script>
```

**Key events used:**
- `beforeOpen` — fires before the toast is shown; set `e.cancel = true` to block it
- `close` — fires after toast hides; reset the `isOpen` flag so the same toast can show again later

---

## Restrict Maximum Visible Toasts

Cap the number of toasts shown simultaneously to keep the UI clean. Cancel new toasts when the limit is reached using `beforeOpen`:

```vue
<template>
  <div>
    <button @click="showNext">Show Toast</button>
    <ToastComponent
      ref="toastRef"
      :position="position"
      :beforeOpen="onBeforeOpen"
      :created="onToastCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive, shallowRef } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });
const MAX_TOASTS = 3;

const toasts = shallowRef([
  { title: 'Warning !', content: 'Network connection problem.' },
  { title: 'Success !', content: 'Message sent successfully.' },
  { title: 'Error !', content: 'Data submission failed.' },
]);
const toastFlag = ref(0);

const onBeforeOpen = (e) => {
  // toastRef.value.element.childElementCount = currently visible toasts
  if (toastRef.value?.element?.childElementCount >= MAX_TOASTS) {
    e.cancel = true;
  }
};

const showNext = () => {
  toastRef.value?.show(toasts.value[toastFlag.value]);
  toastFlag.value = (toastFlag.value + 1) % toasts.value.length;
};

const onToastCreated = () => {
  toastRef.value?.show(toasts.value[toastFlag.value]);
  toastFlag.value++;
};
</script>
```

`toastRef.value.element.childElementCount` reflects how many toast elements are currently rendered inside the container — use this to gate new additions.

---

## Play Audio on Toast Open

Enhance notifications with an audio cue using the `beforeOpen` event. Use the browser's `Audio` API to play a sound file:

```vue
<template>
  <div>
    <button @click="showToastWithAudio">Show Toast</button>
    <ToastComponent
      ref="toastRef"
      title="New message"
      content="You have received a new message"
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

const showToastWithAudio = () => {
  const audio = new Audio('/sounds/notification.mp3');
  audio.play().catch(() => {
    // Browsers may block autoplay; handle gracefully
    console.warn('Audio playback blocked by browser policy');
  });
  toastRef.value?.show();
};

const onToastCreated = () => toastRef.value?.show();
</script>
```

> **Accessibility note:** Always provide text-based notification alternatives for users with hearing disabilities. Be aware that browsers have autoplay policies that may require user interaction before audio can play.

## See Also

- [Timeout and dismissal](./toast-timeout-and-dismissal.md)
- [Templates and styling](./toast-templates-and-styling.md)
- [API reference](./toast-api.md)

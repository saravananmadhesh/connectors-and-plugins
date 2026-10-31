# Toast Templates and Styling (Vue 3)

## Table of Contents
- [Semantic CSS Class Types](#semantic-css-class-types)
- [Custom Template Slot](#custom-template-slot)
- [Dynamic Templates per Show Call](#dynamic-templates-per-show-call)
- [CSS Customization](#css-customization)

---

## Semantic CSS Class Types

Apply one of four built-in semantic classes via the `cssClass` property to convey message severity without custom CSS. These classes apply predefined background colors, icons, and text styling:

| `cssClass` Value | Meaning | Example Use |
|---|---|---|
| `'e-toast-success'` | Positive / completed | "File saved successfully" |
| `'e-toast-info'` | Informational | "New message received" |
| `'e-toast-warning'` | Caution / attention required | "Unsaved changes detected" |
| `'e-toast-danger'` | Error / critical issue | "Upload failed" |

```vue
<template>
  <div>
    <button @click="showNext">Show Next Toast</button>
    <ToastComponent
      ref="toastRef"
      :position="position"
      :created="onToastCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive, shallowRef } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });

const toasts = shallowRef([
  { title: 'Warning !', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning' },
  { title: 'Success !', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success' },
  { title: 'Error !', content: 'A problem occurred while submitting your data.', cssClass: 'e-toast-danger' },
  { title: 'Information !', content: 'Please read the comments carefully.', cssClass: 'e-toast-info' },
]);
const toastFlag = ref(0);

const onToastCreated = () => {
  toastRef.value?.show(toasts.value[toastFlag.value]);
  toastFlag.value++;
};

const showNext = () => {
  toastRef.value?.show(toasts.value[toastFlag.value]);
  toastFlag.value = (toastFlag.value + 1) % toasts.value.length;
};
</script>
```

> **When passing toast config to `show()`**, properties like `cssClass`, `title`, `content` can be overridden per invocation. The component-level `cssClass` acts as the default.

---

## Custom Template Slot

Replace the default title+content layout entirely with a custom template using Vue's `#template` slot. This enables complex layouts, icons, images, and fully branded notifications.

### Template via Vue Slot (recommended for Vue 3)

```vue
<template>
  <div>
    <button @click="showToast">Show Toast</button>
    <ToastComponent
      ref="toastRef"
      :position="position"
      :extendedTimeout="0"
      :timeOut="120000"
      :created="onToastCreated"
    >
      <template #template>
        <div class="custom-toast">
          <span class="e-icons e-check-circle" />
          <div>
            <strong>Upload complete</strong>
            <p>report_q4.pdf (2.3 MB)</p>
          </div>
        </div>
      </template>
    </ToastComponent>
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
```

### Template as an HTML string

```vue
<template>
  <ToastComponent
    ref="toastRef"
    :template="htmlTemplate"
    :position="position"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Center', Y: 'Bottom' });
const htmlTemplate = `
  <div class="e-custom-toast">
    <h4>Custom Title</h4>
    <p>Custom content with <a href="#">a link</a></p>
  </div>
`;
const onToastCreated = () => toastRef.value?.show();
</script>
```

### Template as a DOM element selector

```vue
<template>
  <ToastComponent
    ref="toastRef"
    template="#templateId"
    :position="position"
    :created="onToastCreated"
  />
  <!-- Place the template element somewhere in the page -->
  <script id="templateId" type="text/x-template">
    <div class="e-custom-toast">Inline custom content</div>
  </script>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });
const onToastCreated = () => toastRef.value?.show();
</script>
```

> When a `template` is set, the built-in `title` and `content` props are ignored in rendering — the template takes full precedence.

---

## Dynamic Templates per Show Call

Pass different templates per `show()` invocation to reuse a single Toast instance for varied notification content:

```vue
<template>
  <div>
    <button @click="showToast">Show Next Toast</button>
    <ToastComponent
      ref="toastRef"
      :position="position"
      :click="onClick"
      :created="onToastCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive, shallowRef } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Right', Y: 'Bottom' });

const toasts = shallowRef([
  { template: '2 new mails received' },
  { template: 'User Guest logged in' },
  { template: 'Ticket has been reserved' },
  { template: '#templateToast' },
]);
const toastFlag = ref(0);

const onClick = (e) => {
  e.clickToClose = true;
};

const showToast = () => {
  toastRef.value?.show(toasts.value[toastFlag.value]);
  toastFlag.value = (toastFlag.value + 1) % toasts.value.length;
};

const onToastCreated = () => {
  toastRef.value?.show(toasts.value[toastFlag.value]);
  toastFlag.value++;
};
</script>
```

---

## CSS Customization

Use Syncfusion's CSS class selectors to override default toast styling:

### Toast title

```css
.e-toast-container .e-toast .e-toast-message .e-toast-title {
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 600;
}
```

### Toast content body

```css
.e-toast-container .e-toast .e-toast-message .e-toast-content {
  color: #444;
  font-size: 13px;
  font-weight: normal;
}
```

### Toast icon

```css
.e-toast-container .e-toast .e-toast-icon {
  color: #0078d4;
}
```

### Toast background

```css
.e-toast-container .e-toast {
  background-color: #1e1e2e;
  border-radius: 8px;
}
```

### Target only one toast type

```css
/* Override only success toasts */
.e-toast-container .e-toast.e-toast-success {
  background-color: #d4edda;
  border-left: 4px solid #28a745;
}
```

## See Also

- [Toast services](./toast-services.md) — `ToastUtility` predefined types
- [Getting started](./toast-getting-started.md) — CSS import paths
- [API reference](./toast-api.md)

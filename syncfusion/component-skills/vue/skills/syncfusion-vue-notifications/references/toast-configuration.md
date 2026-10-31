# Toast Configuration (Vue 3)

## Table of Contents
- [Title and Content](#title-and-content)
- [Close Button](#close-button)
- [Progress Bar](#progress-bar)
- [Stacking Order](#stacking-order)
- [Width and Height](#width-and-height)
- [Action Buttons](#action-buttons)
- [Custom Target Container](#custom-target-container)

---

## Title and Content

Use `title` for the notification headline and `content` for the message body. Both accept plain text, HTML strings, or Vue slot templates. In Vue, the content is sanitized by default; pass HTML strings through `:content` and Vue will render them safely:

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Matt sent you a friend request"
    content="Hey, wanna dress up as wizards and ride our hoverboards?"
    :position="position"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Center' });

const onToastCreated = () => toastRef.value?.show();
</script>
```

HTML content in `content` and `title` is sanitized by default (`enableHtmlSanitizer: true`). To allow raw HTML, set `:enableHtmlSanitizer="false"` (use with caution in user-generated content contexts).

> For rich templated content, prefer Vue slots — see [templates-and-styling.md](./toast-templates-and-styling.md) for `#template` slot patterns.

---

## Close Button

Enable a manual dismiss button so users can close the toast before timeout:

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="File Downloading"
    content="<div class='progress'><span style='width: 80%'></span></div>"
    :position="position"
    :showCloseButton="true"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Center' });
const onToastCreated = () => toastRef.value?.show();
</script>
```

`showCloseButton` defaults to `false`. Pair with `timeOut={0}` for persistent toasts that require explicit user dismissal.

---

## Progress Bar

Display a visual countdown bar showing remaining display time:

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Uploading"
    content="Your file is being uploaded..."
    :showProgressBar="true"
    progressDirection="Ltr"
    :timeOut="5000"
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

| Property | Type | Default | Description |
|---|---|---|---|
| `showProgressBar` | boolean | `false` | Enables the progress bar |
| `progressDirection` | `'Ltr' \| 'Rtl'` | `'Rtl'` | Direction of progress bar fill |

Use `progressDirection="Ltr"` for a left-to-right fill (empties left-to-right), and `"Rtl"` for right-to-left (default, empties right-to-left).

---

## Stacking Order

Control whether new toasts appear above or below existing ones:

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Notification"
    content="New notification received"
    :newestOnTop="true"
    :position="position"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Center' });
const onToastCreated = () => toastRef.value?.show();
</script>
```

| `newestOnTop` | Behavior |
|---|---|
| `true` (default) | New toasts appear above older ones |
| `false` | New toasts append below existing stack |

---

## Width and Height

Set custom dimensions using pixels, numbers (treated as pixels), or percentages:

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Notification"
    content="Custom sized toast"
    :width="400"
    height="auto"
    :position="position"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Center', Y: 'Bottom' });
const onToastCreated = () => toastRef.value?.show();
</script>
```

**Defaults:** `width: '300'`, `height: 'auto'`

**Full-width toast:** Set `width="100%"` — toast spans the full container width. The `position.X` value is ignored when width is 100%. Position with `position.Y` only (`'Top'` or `'Bottom'`):

```vue
<template>
  <ToastComponent
    ref="toastRef"
    content="<div class='e-custom'>System maintenance in 10 minutes</div>"
    width="100%"
    title=""
    :position="position"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Center', Y: 'Top' });
const onToastCreated = () => toastRef.value?.show();
</script>
```

> On mobile devices, the default width is `100%` of the page.

---

## Action Buttons

Add interactive buttons to toast notifications using the `buttons` property. Each button is specified with a `model` (Button component props) and an optional click handler:

```vue
<template>
  <div>
    <button @click="showToast">Show Toast</button>
    <ToastComponent
      ref="toastRef"
      title="Anjolie Stokes"
      :position="position"
      :width="230"
      :height="250"
      :buttons="buttons"
      :created="onToastCreated"
    >
      <template #template="{ data }">
        <p><img src="./avatar.png" alt="user" /></p>
      </template>
    </ToastComponent>
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

const onToastCreated = () => toastRef.value?.show();
const showToast = () => toastRef.value?.show();
</script>
```

**Button model properties** follow the Syncfusion `ButtonModel` interface — set `content`, `cssClass`, `iconCss`, `disabled`, etc.

To handle button clicks:
```ts
const buttons = [
  {
    model: { content: 'Undo' },
    click: () => {
      console.log('Undo clicked');
      toastRef.value?.hide('All');
    }
  }
];
```

---

## Custom Target Container

Render toast inside a specific DOM element instead of `document.body`:

```vue
<template>
  <ToastComponent
    ref="toastRef"
    title="Scoped Alert"
    content="This toast is inside the panel"
    target="#my-panel"
    :position="position"
    :created="onToastCreated"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ToastComponent } from '@syncfusion/ej2-vue-notifications';

const toastRef = ref(null);
const position = reactive({ X: 'Center', Y: 'Top' });
const onToastCreated = () => toastRef.value?.show();
</script>
```

Toast position (`Left`, `Right`, `Center`, `Top`, `Bottom`) is calculated relative to the target element when `target` is set.

## See Also

- [Positioning](./toast-position.md)
- [Timeout and dismissal](./toast-timeout-and-dismissal.md)
- [API reference](./toast-api.md)

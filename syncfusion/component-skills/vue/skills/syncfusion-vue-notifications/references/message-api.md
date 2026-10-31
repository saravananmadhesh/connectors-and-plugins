# API Reference — Syncfusion Vue 3 MessageComponent

Source: [https://ej2.syncfusion.com/vue/documentation/api/message/index-default](https://ej2.syncfusion.com/vue/documentation/api/message/index-default)

## Table of Contents
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Types and Enums](#types-and-enums)

---

## Import

```ts
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
```

---

## Properties

### content
**Type:** `string | function`  
**Default:** `null`

Specifies the content to be displayed in the Message component. Accepts a plain string or a function that returns content markup. For templated content in Vue 3, prefer the default slot — see `customization.md` for slot examples.

```vue
<template>
  <!-- String -->
  <MessageComponent content="Please read the comments carefully" />

  <!-- Default slot for rich content -->
  <MessageComponent>
    <div><strong>Note:</strong> Action cannot be undone.</div>
  </MessageComponent>
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

---

### cssClass
**Type:** `string`  
**Default:** `''`

Specifies one or more CSS classes (space-separated) to append to the root element of the Message component. Use for custom styling, content alignment, or appearance overrides.

```vue
<template>
  <MessageComponent content="Warning" cssClass="e-content-center rounded" severity="Warning" />
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

Built-in alignment classes: `e-content-center`, `e-content-right`.

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

When `true`, the component's state (including `visible`) is persisted across page reloads using browser storage.

```vue
<template>
  <MessageComponent content="Persistent message" :enablePersistence="true" />
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enables right-to-left rendering for RTL language support (Arabic, Hebrew, etc.).

```vue
<template>
  <MessageComponent content="مرحبا" :enableRtl="true" />
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

---

### locale
**Type:** `string`  
**Default:** `''`

Overrides the global culture and localization value for this component. Defaults to `'en-US'` when empty.

```vue
<template>
  <MessageComponent content="Message" locale="fr-FR" />
</template>
```

---

### severity
**Type:** `string | Severity`  
**Default:** `Severity.Normal`

Specifies the severity of the message, which controls the icon and color scheme. Valid values:

| Value | Description |
|-------|-------------|
| `"Normal"` | Default — neutral/general message |
| `"Success"` | Positive outcome or confirmation |
| `"Info"` | Informational content |
| `"Warning"` | Caution or potential issue |
| `"Error"` | Critical failure or error |

```vue
<template>
  <MessageComponent content="Operation failed" severity="Error" />
</template>
```

---

### showCloseIcon
**Type:** `boolean`  
**Default:** `false`

Shows a close icon that allows users to dismiss the message. When clicked (or activated via keyboard), the `closed` event fires.

```vue
<template>
  <MessageComponent
    v-if="visible"
    content="Session expiring"
    :showCloseIcon="true"
    @closed="visible = false"
  />
</template>

<script setup>
import { ref } from 'vue';
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';

const visible = ref(true);
</script>
```

---

### showIcon
**Type:** `boolean`  
**Default:** `true`

Shows or hides the severity icon displayed at the left edge of the message. Set to `false` for text-only appearance.

```vue
<template>
  <MessageComponent content="No icon" :showIcon="false" />
</template>
```

---

### variant
**Type:** `string | Variant`  
**Default:** `Variant.Text`

Specifies the visual presentation variant. Valid values:

| Value | Description |
|-------|-------------|
| `"Text"` | Subtle styling — light background with colored text (default) |
| `"Outlined"` | Colored border with transparent background |
| `"Filled"` | Bold — dark background with contrasting text |

```vue
<template>
  <MessageComponent content="Critical error" severity="Error" variant="Filled" />
</template>
```

---

### visible
**Type:** `boolean`  
**Default:** `true`

Controls the visibility of the Message component. When `false`, the message is hidden but remains mounted in the DOM.

```vue
<template>
  <MessageComponent content="Done" severity="Success" :visible="isComplete" />
</template>

<script setup>
import { ref } from 'vue';
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';

const isComplete = ref(true);
</script>
```

---

## Methods

### destroy()
**Returns:** `void`

Destroys the Message component instance — removes it from the DOM and detaches all bound events, attributes, and classes. Access the component instance through a `ref`:

```vue
<template>
  <MessageComponent ref="messageRef" content="Cleanup example" />
  <button @click="destroyMessage">Destroy</button>
</template>

<script setup>
import { ref } from 'vue';
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';

const messageRef = ref(null);

const destroyMessage = () => {
  messageRef.value?.destroy();
};
</script>
```

---

### getPersistData()
**Returns:** `string`

Returns a JSON string of the component's persisted state properties. Useful for debugging or manually saving state.

```ts
const data = messageRef.value?.getPersistData();
console.log(data);
```

---

## Events

### closed
**Type:** `EmitType<MessageCloseEventArgs>`

Fires when the Message component is closed (dismissed) by the user via the close icon. Bind with `@closed`:

```vue
<template>
  <MessageComponent
    v-if="visible"
    content="Dismissible message"
    :showCloseIcon="true"
    @closed="onClosed"
  />
</template>

<script setup>
import { ref } from 'vue';
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';

const visible = ref(true);

const onClosed = (args) => {
  console.log('Message closed', args);
  visible.value = false;
};
</script>
```

---

### created
**Type:** `EmitType<Object>`

Fires when the Message component has been successfully created and mounted. Bind with `@created`:

```vue
<template>
  <MessageComponent content="Hello" @created="onCreated" />
</template>

<script setup>
const onCreated = () => console.log('Message created');
</script>
```

---

### destroyed
**Type:** `EmitType<Event>`

Fires when the Message component is destroyed via the `destroy()` method. Bind with `@destroyed`:

```vue
<template>
  <MessageComponent content="Hello" @destroyed="onDestroyed" />
</template>

<script setup>
const onDestroyed = () => console.log('Message destroyed');
</script>
```

---

## Types and Enums

### Severity Enum

```ts
enum Severity {
  Normal  = 'Normal',
  Success = 'Success',
  Info    = 'Info',
  Warning = 'Warning',
  Error   = 'Error'
}
```

### Variant Enum

```ts
enum Variant {
  Text     = 'Text',
  Outlined = 'Outlined',
  Filled   = 'Filled'
}
```

### MessageCloseEventArgs

The argument object passed to the `closed` event handler:

| Property | Type | Description |
|----------|------|-------------|
| (event args from closed event) | `object` | Standard event arguments provided when the message is closed |

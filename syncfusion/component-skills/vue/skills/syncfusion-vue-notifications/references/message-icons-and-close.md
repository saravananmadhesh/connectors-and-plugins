# Message Icons and Close Icon (Vue 3)

## Table of Contents
- [Severity Icons](#severity-icons)
- [Disabling Severity Icons](#disabling-severity-icons)
- [Custom Severity Icons](#custom-severity-icons)
- [Close Icon](#close-icon)
- [Controlling Visibility with `visible`](#controlling-visibility-with-visible)

---

## Severity Icons

By default, `showIcon` is `true`, meaning each message displays a severity-specific icon on its left edge. The icon changes automatically based on the `severity` prop:

```vue
<template>
  <div>
    <MessageComponent content="Editing is restricted" />
    <MessageComponent content="Please read the comments carefully" severity="Info" />
    <MessageComponent content="Your message has been sent successfully" severity="Success" />
    <MessageComponent content="There was a problem with your network connection" severity="Warning" />
    <MessageComponent content="A problem occurred while submitting your data" severity="Error" />
  </div>
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

---

## Disabling Severity Icons

Set `:showIcon="false"` to hide the severity icon for a cleaner, text-only appearance:

```vue
<template>
  <div>
    <MessageComponent content="Editing is restricted" :showIcon="false" />
    <MessageComponent content="Please read the comments carefully" severity="Info" :showIcon="false" />
    <MessageComponent content="Your message has been sent successfully" severity="Success" :showIcon="false" />
    <MessageComponent content="There was a problem with your network connection" severity="Warning" :showIcon="false" />
    <MessageComponent content="A problem occurred while submitting your data" severity="Error" :showIcon="false" />
  </div>
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

---

## Custom Severity Icons

Override the default severity icon by using the `cssClass` prop to apply a custom CSS class, then target the `.e-msg-icon` selector in your stylesheet:

```vue
<template>
  <MessageComponent
    id="msg_icon"
    cssClass="custom"
    content="Essential JS 2 is a modern JavaScript UI Controls library."
  />
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

```css
/* App.css — override the icon for messages with cssClass="custom" */
.custom .e-msg-icon::before {
  content: '\e704'; /* your custom icon font character */
  font-family: 'e-icons';
}
```

This allows you to replace default icons with custom icon fonts or images that match your design system.

---

## Close Icon

The close icon lets users dismiss messages interactively. It is hidden by default. Enable it with `:showCloseIcon="true"`:

```vue
<template>
  <MessageComponent
    v-if="visible"
    content="Your session will expire in 5 minutes"
    severity="Warning"
    :showCloseIcon="true"
    :visible="visible"
    @closed="onClosed"
  />
</template>

<script setup>
import { ref } from 'vue';
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';

const visible = ref(true);

const onClosed = () => {
  visible.value = false;
};
</script>
```

The `closed` event fires when the user clicks the close icon (or presses Enter/Space while focused on it). Update the local `visible` ref in the handler so the message doesn't reappear on re-render.

### Restore a Dismissed Message

```vue
<template>
  <div>
    <ButtonComponent v-if="!visible" cssClass="e-outline e-primary" @click="visible = true">
      Show Message
    </ButtonComponent>
    <MessageComponent
      v-if="visible"
      content="Editing is restricted"
      :showCloseIcon="true"
      :visible="visible"
      @closed="onClosed"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MessageComponent, ButtonComponent } from '@syncfusion/ej2-vue-notifications';
import { ButtonComponent as Btn } from '@syncfusion/ej2-vue-buttons';

const visible = ref(true);
const onClosed = () => {
  visible.value = false;
};
</script>
```

> In Vue 3, `@closed="onClosed"` is the event-binding syntax for the `closed` emit. This replaces React's `closed={() => setVisible(false)}` prop callback.

---

## Controlling Visibility with `visible`

The `visible` prop shows or hides the entire message without unmounting it. This is useful for toggling messages in response to application state:

```vue
<template>
  <MessageComponent
    content="Operation complete"
    severity="Success"
    :visible="isOperationDone"
  />
</template>

<script setup>
import { ref } from 'vue';
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';

const isOperationDone = ref(true);
</script>
```

- `visible={true}` (default) — message is displayed
- `visible={false}` — message is hidden (but still mounted in the DOM)

### Full Example: Multiple Dismissible Messages

```vue
<template>
  <div>
    <MessageComponent
      v-if="infoVisible"
      content="Please read the comments carefully"
      severity="Info"
      :showCloseIcon="true"
      :visible="infoVisible"
      @closed="infoVisible = false"
    />
    <MessageComponent
      v-if="errorVisible"
      content="A problem occurred while submitting your data"
      severity="Error"
      :showCloseIcon="true"
      :visible="errorVisible"
      @closed="errorVisible = false"
    />
    <ButtonComponent
      cssClass="e-outline e-primary"
      @click="resetMessages"
    >
      Reset Messages
    </ButtonComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

const infoVisible = ref(true);
const errorVisible = ref(true);

const resetMessages = () => {
  infoVisible.value = true;
  errorVisible.value = true;
};
</script>
```

> Vue's `v-if` and `visible` work together: `v-if` controls mount/unmount, while `visible` toggles display. Use `v-if` for full teardown and `visible` to keep the DOM element while hiding it.

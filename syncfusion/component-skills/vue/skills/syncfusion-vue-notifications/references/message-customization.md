# Message Customization and Templates (Vue 3)

## Table of Contents
- [Content Alignment](#content-alignment)
- [Custom Appearance with cssClass](#custom-appearance-with-cssclass)
- [CSS-Only Message Rendering](#css-only-message-rendering)
- [Content Templates](#content-templates)
- [RTL Support](#rtl-support)
- [Persistence](#persistence)

---

## Content Alignment

By default, message content aligns to the left. Use built-in CSS classes via the `cssClass` prop to change alignment:

| CSS Class | Effect |
|-----------|--------|
| *(none)* | Left-aligned (default) |
| `e-content-center` | Center-aligned |
| `e-content-right` | Right-aligned |

```vue
<template>
  <div>
    <!-- Left (default) -->
    <MessageComponent content="Your license has been activated successfully" severity="Success" />

    <!-- Centered -->
    <MessageComponent
      content="The license will expire today"
      cssClass="e-content-center"
      severity="Warning"
    />

    <!-- Right-aligned -->
    <MessageComponent
      content="The license key is invalid"
      cssClass="e-content-right"
      severity="Error"
    />
  </div>
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

---

## Custom Appearance with cssClass

The `cssClass` prop appends one or more CSS classes to the message's root element. Use this to override default styles, set border-radius, change padding, or apply any custom design:

```vue
<template>
  <!-- Rounded corners -->
  <MessageComponent content="The license will expire today" cssClass="rounded" severity="Warning" />

  <!-- Square (no border-radius) -->
  <MessageComponent content="The license key is invalid" cssClass="square" severity="Error" />
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

```css
/* App.css */
.rounded {
  border-radius: 20px;
}

.square {
  border-radius: 0;
}
```

Multiple classes are space-separated:

```vue
<template>
  <MessageComponent cssClass="e-content-center rounded" severity="Info" content="Centered + rounded" />
</template>
```

---

## CSS-Only Message Rendering

The Message component can be rendered using pure HTML and CSS without any JavaScript initialization. This is ideal for static content, server-rendered HTML, or lightweight scenarios — the Vue template can be reduced to raw HTML and still inherit the component's CSS classes.

### Structure — Content Only

```html
<div class="e-message" role="alert">
  <div class="e-msg-content">Editing is restricted</div>
</div>
```

### Structure — Content with Severity Icon

```html
<div class="e-message" role="alert">
  <span class="e-msg-icon"></span>
  <div class="e-msg-content">Editing is restricted</div>
</div>
```

### Available Predefined CSS Classes

| Class | Description |
|-------|-------------|
| `e-message` | Root message wrapper (required) |
| `e-msg-icon` | Severity type icon |
| `e-msg-content` | Message content container |
| `e-msg-close-icon` | Close icon |
| `e-info` | Info severity styling |
| `e-success` | Success severity styling |
| `e-warning` | Warning severity styling |
| `e-error` | Error severity styling |
| `e-content-center` | Center-align message content |
| `e-content-right` | Right-align message content |

### Full CSS-Only Example

```html
<div class="e-message" role="alert">
  <span class="e-msg-icon"></span>
  <div class="e-msg-content">Editing is restricted</div>
</div>
<div class="e-message e-info" role="alert">
  <span class="e-msg-icon"></span>
  <div class="e-msg-content">Please read the comments carefully</div>
</div>
<div class="e-message e-success" role="alert">
  <span class="e-msg-icon"></span>
  <div class="e-msg-content">Your message has been sent successfully</div>
</div>
<div class="e-message e-warning" role="alert">
  <span class="e-msg-icon"></span>
  <div class="e-msg-content">There was a problem with your network connection</div>
</div>
<div class="e-message e-error" role="alert">
  <span class="e-msg-icon"></span>
  <div class="e-msg-content">A problem occurred while submitting your data</div>
</div>
```

In Vue, you can also render this as raw HTML in a SFC template without the `MessageComponent` wrapper:

```vue
<template>
  <div v-html="staticMessages" />
</template>
```

---

## Content Templates

The `content` prop accepts a string, a Vue render function, or use the default slot for templated content. Vue 3's slot system is the idiomatic way to render rich, interactive message bodies.

### String Content

```vue
<template>
  <MessageComponent content="Simple text message" />
</template>
```

### Default Slot Template

Use Vue's default slot to embed any markup, including other components, inside the message:

```vue
<template>
  <MessageComponent
    v-if="visible"
    severity="Success"
    @closed="visible = false"
  >
    <div>
      <h1>Merged pull request</h1>
      <p>Pull request #41 merged after a successful build</p>
      <ButtonComponent cssClass="e-link">View commit</ButtonComponent>
      <ButtonComponent cssClass="e-link" @click="visible = false">Dismiss</ButtonComponent>
    </div>
  </MessageComponent>
</template>

<script setup>
import { ref } from 'vue';
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

const visible = ref(true);
</script>
```

### Children as Content (Default Slot)

The default slot can also accept simple text:

```vue
<template>
  <MessageComponent severity="Info">
    <strong>Note:</strong> This action cannot be undone.
  </MessageComponent>
</template>
```

---

## RTL Support

Enable right-to-left text direction for RTL languages (Arabic, Hebrew, etc.) using `:enableRtl="true"`:

```vue
<template>
  <MessageComponent content="مرحبا بالعالم" severity="Info" :enableRtl="true" />
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

---

## Persistence

The `enablePersistence` prop saves the component's state (including `visible`) across page reloads using browser storage:

```vue
<template>
  <MessageComponent content="Persistent message" :enablePersistence="true" />
</template>

<script setup>
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';
</script>
```

Use this when you want dismissed messages to stay dismissed after a page reload.

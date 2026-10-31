# Message Severity Levels (Vue 3)

Severity communicates the importance and type of information in a message. The Message component uses the `severity` prop to apply distinct icons and color schemes that help users quickly understand the message context.

## Available Severity Levels

| Severity | Value | Use Case |
|----------|-------|----------|
| Normal | `"Normal"` (default) | General information, neutral messages |
| Info | `"Info"` | Informational content, tips, guidance |
| Success | `"Success"` | Confirmation, completed operations, positive outcomes |
| Warning | `"Warning"` | Caution, potential issues, non-critical problems |
| Error | `"Error"` | Critical failures, invalid input, system errors |

## Basic Usage

Set the `severity` prop to one of the five values. When omitted, `Normal` is used. In Vue 3, the value is bound as a kebab-cased attribute (`severity="Success"`) or via `:severity`:

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

## Choosing the Right Severity

- **Normal** — Neutral context that doesn't require action (e.g., a read-only notice).
- **Info** — Background information the user should know, but no action required (e.g., a tooltip-style note).
- **Success** — Confirm an action completed correctly (e.g., form submitted, file uploaded).
- **Warning** — Alert the user to something that may become a problem (e.g., session expiring soon, low disk space).
- **Error** — Signal a failure that needs immediate attention (e.g., validation failed, network unreachable).

## Combining Severity with Variant

Severity works independently of the `variant` prop. You can combine any severity with any variant:

```vue
<template>
  <!-- Filled error — maximum visual emphasis -->
  <MessageComponent content="A problem occurred" severity="Error" variant="Filled" />

  <!-- Outlined success — clear but not overwhelming -->
  <MessageComponent content="Changes saved" severity="Success" variant="Outlined" />
</template>
```

See `variants.md` for full variant documentation.

## Dynamic Severity

Severity can be controlled dynamically via a `ref` or `computed`:

```vue
<template>
  <MessageComponent
    :content="`Status: ${status}`"
    :severity="severityMap[status]"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import { MessageComponent } from '@syncfusion/ej2-vue-notifications';

const status = ref('success');

const severityMap = {
  success: 'Success',
  error: 'Error',
  info: 'Info'
};

const computedSeverity = computed(() => severityMap[status.value]);
</script>
```

> Vue's `ref` (for primitive state) and `computed` (for derived state) replace React's `useState`. The `:severity` binding (with colon) tells Vue to evaluate the expression rather than treat it as a literal string.

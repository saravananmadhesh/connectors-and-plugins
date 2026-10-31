# Editor Types

The Rich Text Editor supports three rendering modes: **Inline**, **IFrame**, and **Resizable**. These affect how the editor is embedded and interacted with in the page.

## Inline Mode

In inline mode, the editor renders without a visible border or toolbar by default. The toolbar only appears when the user selects text (or always, if configured).

### Enable Inline Mode

```vue
<template>
  <ejs-richtexteditor
    :inlineMode="inlineMode"
    :value="value"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const value = '<p>Select this text to see the inline toolbar appear.</p>';

// Toolbar appears only on selection
const inlineMode = { enable: true, onSelection: true };

// OR: toolbar always visible (not selection-triggered)
// const inlineMode = { enable: true, onSelection: false };

provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

### `inlineMode` Options

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | boolean | `false` | Activates inline mode |
| `onSelection` | boolean | `true` | `true` = toolbar appears on text selection; `false` = toolbar always visible |

### Use Cases for Inline Mode

- **Content editing in place** — edit directly inside `<article>`, `<section>`, or `<div>` containers
- **Comment editors** — compact editors in comment threads
- **CMS page builders** — click-to-edit blocks

## IFrame Mode

IFrame mode renders the editor content inside a sandboxed `<iframe>` element. This isolates styles from the parent page, making it useful for email editing or when complete style isolation is required.

### Enable IFrame Mode

```vue
<template>
  <ejs-richtexteditor
    :iframeSettings="iframeSettings"
    :value="value"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const value = '<p>This content is rendered in an isolated iframe.</p>';
const iframeSettings = { enable: true };

provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

### IFrame Attributes

You can inject attributes and resources into the iframe's `<head>` and `<body>`:

```js
const iframeSettings = {
  enable: true,
  attributes: {
    readonly: 'readonly'
  },
  resources: {
    styles: ['/custom-iframe-styles.css'],
    scripts: []
  }
};
```

### Use Cases for IFrame Mode

- **Email editor** — email clients have quirky CSS, iframe isolates your styles
- **Preview mode** — show content exactly as it renders in a separate context
- **Multi-tenant apps** — prevent tenant content styles from bleeding into the host UI

> The default mode (DIV mode) is suitable for most use cases. Use IFrame only when style isolation is explicitly needed.

## Resizable Mode

Resizable mode adds a drag handle at the bottom-right of the editor, allowing users to resize it vertically (and optionally horizontally).

### Enable Resizable Mode

```vue
<template>
  <ejs-richtexteditor
    :enableResize="true"
    :height="250"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar, Resize
} from '@syncfusion/ej2-vue-richtexteditor';

provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar, Resize]);
</script>
```

> The `Resize` module must be injected.

### Constrain Resize Dimensions

Use `minWidth`, `maxWidth`, `minHeight`, and `maxHeight` to limit how far the user can resize:

```vue
<ejs-richtexteditor
  :enableResize="true"
  :minHeight="150"
  :maxHeight="500"
  :minWidth="300"
/>
```

### Resize Events

| Event | Description |
|---|---|
| `resizing` | Fires while user is dragging the resize handle |
| `resizeStop` | Fires when the user releases the resize handle |
| `resizeStart` | Fires when the user starts dragging the resize handle |

```vue
<ejs-richtexteditor
  :enableResize="true"
  :resizeStop="onResizeStop"
/>
```

```js
const onResizeStop = (args) => {
  console.log('New width:', args.event.pageX);
};
```

## Combining Modes

Modes can be combined — for example, a resizable IFrame editor:

```vue
<ejs-richtexteditor
  :iframeSettings="{ enable: true }"
  :enableResize="true"
  :minHeight="200"
  :maxHeight="600"
/>
```

```js
provide('richtexteditor', [Toolbar, HtmlEditor, QuickToolbar, Resize]);
```

## Mode Comparison

| Feature | DIV (default) | IFrame | Inline |
|---|---|---|---|
| Style isolation | No | Yes | No |
| Toolbar position | Top | Top | Floating |
| Resize support | Yes | Yes | Limited |
| Recommended for | General use | Email, style isolation | In-place editing |

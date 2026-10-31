# Paste Cleanup

When pasting content from external sources (e.g., Microsoft Word, web pages), the Rich Text Editor can clean up the HTML before inserting it. The `pasteCleanupSettings` property controls this behavior.

## Enable Paste Cleanup

Inject `PasteCleanup`:

```js
import { PasteCleanup } from '@syncfusion/ej2-vue-richtexteditor';
provide('richtexteditor', [Toolbar, HtmlEditor, PasteCleanup]);
```

## Paste Cleanup Settings Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `prompt` | boolean | `false` | Opens a dialog on paste to choose Keep / Clean / Plain Text |
| `plainText` | boolean | `false` | Strips all tags and styles; inserts plain text only |
| `keepFormat` | boolean | `true` | Retains original formatting, filtered by `allowedStyleProps` / `deniedTags` / `deniedAttrs` |
| `deniedTags` | string[] | `null` | HTML tags to remove from pasted content |
| `deniedAttrs` | string[] | `null` | Attributes to strip from all pasted elements |
| `allowedStyleProps` | string[] | (predefined list) | Style properties to keep when `keepFormat: true` |

> The options `prompt`, `plainText`, and `keepFormat` are mutually exclusive. Enable only one at a time.

## Prompt Dialog

When `prompt: true`, pasting opens a dialog with three options:

1. **Keep** — Preserves format, subject to `deniedTags`/`deniedAttrs`/`allowedStyleProps` filtering
2. **Clean** — Removes all inline styles but keeps structural tags
3. **Plain Text** — Strips all HTML; inserts raw text only

> When `prompt: true`, the `plainText` and `keepFormat` properties are ignored.

## Example: Full Configuration

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :pasteCleanupSettings="pasteCleanupSettings"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, HtmlEditor, PasteCleanup
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = {
  items: ['Bold', 'Italic', 'Underline', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|',
    'CreateLink', 'Image', '|', 'SourceCode', '|', 'Undo', 'Redo']
};

const pasteCleanupSettings = {
  prompt: true,
  plainText: false,
  keepFormat: false,
  deniedTags: ['a'],
  deniedAttrs: ['class', 'title', 'id'],
  allowedStyleProps: ['color', 'margin', 'font-size']
};

provide('richtexteditor', [Toolbar, HtmlEditor, PasteCleanup]);
</script>
```

## Behavior Modes

### Plain Text Mode

Strips all HTML tags and styles. Only the raw text is inserted.

```js
const pasteCleanupSettings = {
  prompt: false,
  plainText: true,
  keepFormat: false
};
```

### Keep Format Mode

Retains original formatting. Combine with `allowedStyleProps` to whitelist styles.

```js
const pasteCleanupSettings = {
  prompt: false,
  plainText: false,
  keepFormat: true,
  deniedTags: ['script', 'iframe', 'style'],
  deniedAttrs: ['onclick', 'onmouseover'],
  allowedStyleProps: ['color', 'font-size', 'font-weight', 'text-align', 'margin']
};
```

### Clean Format Mode (default)

When `prompt`, `plainText`, and `keepFormat` are all `false`, inline styles are stripped but structural tags (`<p>`, `<ul>`, `<table>`) are preserved. `deniedTags` and `deniedAttrs` still apply.

```js
const pasteCleanupSettings = {
  prompt: false,
  plainText: false,
  keepFormat: false,
  deniedTags: ['span[style]'],
  deniedAttrs: ['class', 'style']
};
```

## Denied Tags Syntax

```js
deniedTags: [
  'a',                   // Remove all anchor tags
  'a[!href]',            // Remove anchors WITHOUT href attribute
  'a[href, target]'      // Remove anchors WITH both href and target attributes
]
```

## allowedStyleProps

Only applies when `keepFormat: true`. Lists the CSS properties that will be preserved.

```js
allowedStyleProps: ['color', 'margin', 'font-size', 'font-weight', 'text-align', 'padding']
```

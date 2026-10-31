# Links Reference

This reference covers link insertion, configuration, editing, removal, and link-specific quick toolbar actions in the Modern Rich Text Editor.

## Table of Contents

- [Overview](#overview)
- [Link Settings](#link-settings)
- [Link Insertion](#link-insertion)
- [Link Quick Toolbar](#link-quick-toolbar)
- [Protocol Configuration](#protocol-configuration)
- [Link Target Configuration](#link-target-configuration)
- [Programmatic Link Control](#programmatic-link-control)
- [Keyboard Shortcuts](#keyboard-shortcuts)

---

## Overview

The Modern Rich Text Editor provides comprehensive link support including automatic link creation from pasted URLs, protocol validation, target configuration, and a contextual quick toolbar for link operations.

---

## Link Settings

Configure link behavior through the `linkSettings` property:

```html
<template>
  <ejs-richtexteditor-ui
    :linkSettings="linkSettings"
    placeholder="Type something ...">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const linkSettings = {
  linkOnPaste: true,
  defaultTarget: '_blank',
  autoPrependProtocol: true,
  defaultProtocol: 'https',
  allowedProtocols: ['http', 'https', 'mailto', 'tel']
};
</script>
```

### Configuration Properties

| Property | Type | Default | Purpose |
| --- | --- | --- | --- |
| `linkOnPaste` | `boolean` | `true` | Auto-convert pasted URLs over selected text into links |
| `defaultTarget` | `string` | `'_blank'` | Default `target` attribute for new links |
| `autoPrependProtocol` | `boolean` | `true` | Prepend `defaultProtocol` to URLs missing a protocol |
| `defaultProtocol` | `string` | `'https'` | Protocol to prepend when `autoPrependProtocol` is true |
| `allowedProtocols` | `string[]` | `['http', 'https', 'mailto', 'tel']` | Whitelist of accepted URL protocols |

---

## Link Insertion

### Insert Link Dialog

Click the `Link` toolbar item to open the Insert Link dialog.

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['Link']
};
</script>
```

**Dialog Fields:**
- **URL** — The link destination (http/https URL, mailto email, tel phone number, or relative path)
- **Display Text** — Text shown as the link anchor
- **Tooltip Title** — Title attribute displayed on hover (optional)
- **Open Link in New Window** — Checkbox to set `target="_blank"`

### Paste to Link

When `linkSettings.linkOnPaste` is `true`, pasting a URL over selected text converts it into a hyperlink.

**Recognized URL patterns:**
- Full URL with protocol: `https://example.com`
- Email: `mailto:user@example.com`
- Phone: `tel:+1-234-567-8900`
- Host without protocol: `www.example.com`
- Relative path: `/page`, `?query=1`, `#section`

```html
<script setup>
const linkSettings = {
  linkOnPaste: true,
  defaultTarget: '_blank',
  autoPrependProtocol: true,
  defaultProtocol: 'https',
  allowedProtocols: ['http', 'https', 'mailto', 'tel']
};
</script>
```

---

## Link Quick Toolbar

The Link Quick Toolbar appears when the caret is positioned inside a link (`<a>` element), providing instant access to link operations.

### Available Quick Toolbar Items

| Item | Behavior |
| --- | --- |
| `Open` | Opens the link in a new tab using the link's `target` attribute (or `'_blank'` as fallback) |
| `Copy` | Copies the link `href` to the clipboard |
| `Edit` | Opens the Insert Link dialog pre-filled with the link's current properties |
| `Remove` | Unlinks the selection — removes the `<a>` wrapper but keeps the link text |
| `\|` | Visual separator between action groups |

### Default Configuration

```html
<template>
  <ejs-richtexteditor-ui :quickToolbarSettings="quickToolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const quickToolbarSettings = {
  enable: true,
  link: ['Open', 'Copy', 'Edit', 'Remove']
};
</script>
```

### Customizing Link Quick Toolbar

Reorder items or add custom actions by modifying the `link` array:

```html
<script setup>
const quickToolbarSettings = {
  enable: true,
  link: ['Open', 'Copy', '|', 'Edit', 'Remove']
};
</script>
```

### Adding Custom Link Actions

Mix built-in and custom items in the `link` array. Custom items route through `toolbarSettings.itemClicked`:

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :quickToolbarSettings="quickToolbarSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  itemClicked: (args) => {
    if (args.item && args.item.actionId === 'bookmark') {
      // Dispatch your bookmark logic
    }
  }
};

const quickToolbarSettings = {
  enable: true,
  link: [
    'Open', 'Copy',
    '|',
    {
      actionId: 'bookmark',
      id: 'bookmark',
      text: 'Bookmark',
      tooltipText: 'Bookmark this link'
    },
    '|',
    'Edit', 'Remove'
  ]
};
</script>
```

---

## Protocol Configuration

### Link on Paste Behavior

The `linkOnPaste` property controls whether pasting a URL over selected text converts it to a link or pastes as plain text.

| Value | Behavior |
| --- | --- |
| `true` (default) | Pasted URL is converted into a hyperlink with `defaultTarget`, `defaultProtocol`, and `autoPrependProtocol` settings applied |
| `false` | Pasted URL is inserted as plain text; no `<a>` element is created |

**Triggers only for URL-like payloads:**
- Full URLs with protocol: `https://example.com`
- Hosts: `www.example.com`, `example.com/path`
- Relative URLs: `/path`, `?query`, `#anchor`
- Emails: `user@example.com` (with or without `mailto:`)
- Phone numbers: `+1-234-5678` (with or without `tel:`)

```html
<script setup>
const linkSettings = {
  linkOnPaste: true
};
</script>
```

### Auto Prepend Protocol

When `autoPrependProtocol` is `true`, the editor prepends `defaultProtocol` to URLs that lack one.

| `autoPrependProtocol` | `defaultProtocol` | URL Typed | URL Stored |
| --- | --- | --- | --- |
| `true` | `'https'` | `example.com` | `https://example.com` |
| `true` | `'http'` | `example.com` | `http://example.com` |
| `false` | `any` | `example.com` | `example.com` (untouched) |
| `true` | `any` | `https://example.com` | `https://example.com` (detected) |

**Note:** Relative URLs (`/path`, `?query`, `#anchor`) are never prepended.

```html
<script setup>
const linkSettings = {
  autoPrependProtocol: true,
  defaultProtocol: 'https'
};
</script>
```

### Allowed Protocols

The `allowedProtocols` property is a whitelist applied to URL validation in:

1. The Insert Link dialog — invalid URLs are marked with an error style and the Insert button is disabled
2. The `linkOnPaste` flow — URLs with disallowed protocols fall through to plain-text paste

Relative URLs (`/foo`, `?bar=1`, `#section`) skip protocol validation.

**Built-in entries (default):**
```
['http', 'https', 'mailto', 'tel']
```

These cover the four link shapes the editor creates:
- Web URLs: `http://example.com`, `https://example.com`
- Email: `mailto:user@example.com`
- Phone: `tel:+1-234-567-8900`

```html
<script setup>
const linkSettings = {
  allowedProtocols: ['http', 'https', 'mailto', 'tel', 'ftp']
};
</script>
```

---

## Link Target Configuration

### Default Target

The `defaultTarget` property sets the `target` attribute applied to links created through the Insert Link dialog or `linkOnPaste`.

| Value | Behavior |
| --- | --- |
| `''` (empty) | No `target` attribute — link opens in current browsing context |
| `'_self'` | Opens in the same browsing context (default browser behavior) |
| `'_blank'` (default) | Opens in a new tab or window |
| `'_parent'` | Opens in the parent browsing context (for frames) |
| `'_top'` | Opens in the topmost browsing context (breaks out of frames) |

The Insert Link dialog exposes an **"Open link in new window"** checkbox. When checked, the link gets `target="_blank"`. When unchecked, it uses `linkSettings.defaultTarget`.

```html
<script setup>
const linkSettings = {
  defaultTarget: '_blank'
};
</script>
```

### Link Quick Toolbar Open Behavior

The Link Quick Toolbar's `Open` item always uses `window.open(href, target || '_blank')`. A link with no `target` attribute still opens in a new tab from the quick toolbar.

---

## Programmatic Link Control

### Using the commands() Builder

Programmatically insert and modify links using the fluent `commands()` builder:

```html
<template>
  <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
  <button @click="insertLink">Insert Link</button>
  <button @click="editLink">Edit Link</button>
  <button @click="removeLink">Remove Link</button>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const insertLink = () => {
  editor.value.ej2Instances.commands()
    .link()
    .href('https://example.com')
    .text('Example Link')
    .title('Visit Example')
    .target('_blank')
    .apply();
};

const editLink = () => {
  // Edit the current link (must be positioned inside a link)
  editor.value.ej2Instances.commands()
    .link()
    .href('https://newurl.com')
    .apply();
};

const removeLink = () => {
  // Remove the current link
  editor.value.ej2Instances.commands().unlink().apply();
};
</script>
```

### Link Command Properties

| Property | Type | Purpose |
| --- | --- | --- |
| `href` | `string` | The link destination URL |
| `text` | `string` | The anchor text displayed to the user |
| `title` | `string` | The `title` attribute (tooltip text) |
| `target` | `string` | The `target` attribute (`'_blank'`, `'_self'`, etc.) |

---

## Keyboard Shortcuts

### Insert Link

**Windows/Linux:** <kbd>Ctrl</kbd>+<kbd>K</kbd>
**macOS:** <kbd>⌘</kbd>+<kbd>K</kbd>

Opens the Insert Link dialog to create or edit a link.

---

## Complete Link Configuration Example

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :linkSettings="linkSettings"
    :quickToolbarSettings="quickToolbarSettings"
    placeholder="Type something ...">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'Link', 'Image', 'Table', '|',
    'Undo', 'Redo'
  ]
};

const linkSettings = {
  linkOnPaste: true,
  defaultTarget: '_blank',
  autoPrependProtocol: true,
  defaultProtocol: 'https',
  allowedProtocols: ['http', 'https', 'mailto', 'tel']
};

const quickToolbarSettings = {
  enable: true,
  link: ['Open', 'Copy', '|', 'Edit', 'Remove'],
  enableAppendToBody: false
};
</script>
```

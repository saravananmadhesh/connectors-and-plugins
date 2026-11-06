# Toolbar Configuration

## Table of Contents
- [Toolbar Types](#toolbar-types)
- [Expand (Default)](#expand-default)
- [MultiRow](#multirow)
- [Scrollable](#scrollable)
- [Popup](#popup)
- [Sticky / Floating Toolbar](#sticky--floating-toolbar)
- [Toolbar Position](#toolbar-position)
- [Enable / Disable Items Programmatically](#enable--disable-items-programmatically)
- [Custom Toolbar Button Templates](#custom-toolbar-button-templates)

## Toolbar Types

Configure the toolbar layout using the `type` field in `toolbarSettings`. Inject `Toolbar` in all cases.

| Type | Behavior |
|------|----------|
| `Expand` (default) | Overflowing items move to a second row, revealed by an expand arrow |
| `MultiRow` | All items displayed across multiple rows — nothing hidden |
| `Scrollable` | Single row with horizontal scroll for overflow |
| `Popup` | Overflowing items move into a popup container |

## Expand (Default)

```vue
<script setup>
const toolbarSettings = {
  type: 'Expand',
  items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
};
</script>
```

## MultiRow

Displays all toolbar items across as many rows as needed. Use when you always want all items visible.

```vue
<script setup>
const toolbarSettings = {
  type: 'MultiRow',
  items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
};
</script>
```

## Scrollable

All items on a single row with horizontal scroll. Good for narrow layouts.

```vue
<script setup>
const toolbarSettings = {
  type: 'Scrollable',
  items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|',
    'CreateLink', 'Image', '|', 'Undo', 'Redo']
};
</script>
```

## Popup

Overflowing items go into a popup. Optimal for mobile and small-screen layouts.

```vue
<template>
  <ejs-richtexteditor :toolbarSettings="toolbarSettings" />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, QuickToolbar, HtmlEditor, Table, Video, Audio, PasteCleanup
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = { type: 'Popup' };
provide('richtexteditor', [Toolbar, Link, Image, QuickToolbar, HtmlEditor, Table, Video, Audio, PasteCleanup]);
</script>
```

## Sticky / Floating Toolbar

By default, the toolbar sticks to the top of the viewport when you scroll past it (`enableFloating: true`).

### Disable floating toolbar

```vue
<script setup>
const toolbarSettings = {
  enableFloating: false
};
</script>
```

### Adjust floating toolbar offset

Use `floatingToolbarOffset` to account for a fixed page header.

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :floatingToolbarOffset="60"
  />
</template>

<script setup>
const toolbarSettings = { enableFloating: true };
</script>
```

### Toggle floating toolbar dynamically

```vue
<script setup>
import { ref } from 'vue';
const rteRef = ref(null);

const toggleFloat = (enabled) => {
  rteRef.value.ej2Instances.toolbarSettings.enableFloating = enabled;
  rteRef.value.dataBind();
};
</script>
```

## Toolbar Position

Place the toolbar at the bottom of the editor using `toolbarSettings.position`.

```vue
<script setup>
const toolbarSettings = {
  position: 'Bottom',
  items: ['Bold', 'Italic', 'Underline', '|', 'Undo', 'Redo']
};
</script>
```

## Enable / Disable Items Programmatically

```vue
<script setup>
import { ref } from 'vue';
const rteRef = ref(null);

// Disable specific items
const disableItems = () => {
  rteRef.value.ej2Instances.disableToolbarItem(['Bold', 'Italic']);
};

// Re-enable items
const enableItems = () => {
  rteRef.value.ej2Instances.enableToolbarItem(['Bold', 'Italic']);
};
</script>
```

This is commonly used when toggling preview mode in a Markdown editor — disable formatting buttons while preview is active.

## Custom Toolbar Button Templates

Add a custom button with a template string in the `items` array.

```vue
<script setup>
const toolbarSettings = {
  items: [
    'Bold', 'Italic', '|',
    {
      tooltipText: 'My Custom Action',
      template: '<button id="custom-btn" class="e-tbar-btn e-control e-btn e-icon-btn">' +
        '<span class="e-btn-icon e-icons e-your-icon-class"></span></button>'
    },
    '|', 'Undo', 'Redo'
  ]
};
</script>
```

Wire up the button click after `created`:

```vue
<template>
  <ejs-richtexteditor :toolbarSettings="toolbarSettings" :created="onCreated" />
</template>

<script setup>
const onCreated = () => {
  document.getElementById('custom-btn').onclick = () => {
    // Custom action here
    console.log('Custom toolbar button clicked');
  };
};
</script>
```

> Use `|` as a string in the `items` array to add a visual separator between toolbar groups.

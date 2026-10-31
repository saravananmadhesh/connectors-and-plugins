# Toolbar Reference

The toolbar is the primary interaction surface for formatting commands in the Modern Rich Text Editor. This reference covers toolbar configuration, layout options, floating behavior, custom items, and events.

## Table of Contents

- [Overview](#overview)
- [Toolbar Configuration](#toolbar-configuration)
- [Available Toolbar Items](#available-toolbar-items)
- [Layout Types](#layout-types)
- [Toolbar Position](#toolbar-position)
- [Floating Toolbar](#floating-toolbar)
- [Toolbar Events](#toolbar-events)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Quick Toolbar](#quick-toolbar)
- [API References](#api-references)

---

## Overview

The toolbar is configured through the `toolbarSettings` property on the `RichTextEditorUI` component. It controls which formatting commands are available, how they are laid out, and how the toolbar behaves when the editor is scrolled.

---

## Toolbar Configuration

### Basic Setup

Configure the toolbar by setting `toolbarSettings` with an `items` array containing the commands you want to expose:

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    placeholder="Type something ...">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
    'Formats', 'Alignment', 'BulletList', 'NumberedList', '|',
    'Link', 'Image', 'Table', '|',
    'Undo', 'Redo'
  ],
  type: 'Auto',
  position: 'Top',
  enableFloating: true
};
</script>
```

### Default Items

The default toolbar items are:

```
['Bold','Italic','Underline','Strikethrough','|','Formats','Alignment','BulletList','NumberedList','|','Link','Image','Table','|','Undo','Redo']
```

### Disabling the Toolbar

To disable the toolbar entirely (when driving the editor with your own UI), set `enable` to `false`:

```html
<script setup>
const toolbarSettings = {
  enable: false
};
</script>
```

---

## Available Toolbar Items

The Modern Rich Text Editor supports the following built-in toolbar items:

| Category | Items |
| --- | --- |
| **History** | `Undo`, `Redo` |
| **Text Formatting** | `Bold`, `Italic`, `Underline`, `Strikethrough`, `Subscript`, `Superscript`, `InlineCode`, `ClearFormat` |
| **Font & Color** | `FontName`, `FontSize`, `FontColor`, `BackgroundColor` |
| **Structure** | `Formats`, `Paragraph`, `Quote`, `Callout`, `CodeBlock`, `Indent`, `Outdent`, `HorizontalLine` |
| **Alignment** | `Alignment`, `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify` |
| **Lists** | `BulletFormatList`, `BulletList`, `NumberFormatList`, `NumberedList`, `Checklist` |
| **Insert** | `Link`, `Image`, `Table` |

Use the `'|'` separator to create visual divisions between groups of related items.

---

## Layout Types

### Type Configuration

The `toolbarSettings.type` property controls how overflow items are displayed when the toolbar is wider than the available space.

| Type | Behavior | Use Case |
| --- | --- | --- |
| `'Auto'` (default) | Uses `'Expanded'` on desktop/web, `'Scrollable'` on mobile | Responsive behavior without manual configuration |
| `'Expanded'` | All items remain visible; toolbar expands to accommodate them | Desktop applications with sufficient space |
| `'Scrollable'` | Items overflow horizontally; user scrolls to see more | Narrow containers or many toolbar items |
| `'MultiRow'` | Overflow items wrap onto additional rows | Limited height but flexible layout |

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
    'FontColor', 'BackgroundColor', '|',
    'Formats', 'Alignment', '|',
    'BulletList', 'NumberedList', '|',
    'Link', 'Image', 'Table', '|',
    'Undo', 'Redo'
  ],
  type: 'MultiRow'
};
</script>
```

---

## Toolbar Position

### Position Configuration

The `toolbarSettings.position` property controls whether the toolbar appears above or below the editor content.

| Value | Behavior |
| --- | --- |
| `'Top'` (default) | Toolbar appears above the editor |
| `'Bottom'` | Toolbar appears below the editor |

```html
<script setup>
const toolbarSettings = {
  items: ['Bold', 'Italic', 'Underline'],
  position: 'Bottom'
};
</script>
```

---

## Floating Toolbar

### Floating Behavior

By default, the toolbar is sticky and "floats" when the editor scrolls out of view. This keeps the toolbar accessible as the user edits a long document.

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['Bold', 'Italic', 'Underline'],
  enableFloating: true,      // Enable floating (default)
  floatingOffset: 0          // Offset from top (default)
};
</script>
```

### Floating Offset

If your page has a sticky header, use `floatingOffset` to add vertical space between the floating toolbar and the header:

```html
<script setup>
const toolbarSettings = {
  enableFloating: true,
  floatingOffset: 60  // 60px offset from top
};
</script>
```

### Disable Floating

To keep the toolbar scrolling with the editor content (not sticky), disable floating:

```html
<script setup>
const toolbarSettings = {
  enableFloating: false
};
</script>
```

---

## Toolbar Events

### itemClicked

The `itemClicked` event fires when any toolbar button is clicked, before the command is executed. Use this event to intercept built-in commands or handle custom toolbar items:

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const onItemClicked = (args) => {
  console.log('Item clicked:', args.item);
};

const toolbarSettings = {
  items: ['Bold', 'Italic', 'Underline'],
  itemClicked: onItemClicked
};
</script>
```

### updatedToolbarStatus

The `updatedToolbarStatus` event fires after the toolbar synchronizes its visual state with the current editor selection. It provides information about active formatting marks and resolved font/color values:

```html
<template>
  <div>
    <div id="ribbon">
      <button id="ribbonBold" @click="onBoldClick"><b>B</b></button>
      <button id="ribbonItalic" @click="onItalicClick"><i>I</i></button>
      <button id="ribbonUnderline" @click="onUnderlineClick"><u>U</u></button>
      <select id="ribbonHeading" @change="onHeadingChange">
        <option value="paragraph">Normal</option>
        <option value="heading1">Heading 1</option>
        <option value="heading2">Heading 2</option>
        <option value="heading3">Heading 3</option>
      </select>
      <input id="ribbonColor" type="color" title="Font color" @input="onColorChange" />
    </div>
    <ejs-richtexteditor-ui
      ref="editor"
      :toolbarSettings="toolbarSettings">
    </ejs-richtexteditor-ui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const toolbarSettings = {
  enable: false  // Disable built-in toolbar, use custom ribbon
};

const onBoldClick = () => {
  editor.value.ej2Instances.commands().bold().apply();
};

const onItalicClick = () => {
  editor.value.ej2Instances.commands().italic().apply();
};

const onUnderlineClick = () => {
  editor.value.ej2Instances.commands().underline().apply();
};

const onHeadingChange = (e) => {
  const value = e.target.value;
  if (value === 'paragraph') {
    editor.value.ej2Instances.commands().paragraph().apply();
  } else if (value === 'heading1') {
    editor.value.ej2Instances.commands().heading1().apply();
  } else if (value === 'heading2') {
    editor.value.ej2Instances.commands().heading2().apply();
  } else if (value === 'heading3') {
    editor.value.ej2Instances.commands().heading3().apply();
  }
};

const onColorChange = (e) => {
  editor.value.ej2Instances.commands().fontColor().color(e.target.value).apply();
};
</script>
```

---

## Custom Toolbar Items

### Creating Custom Items

Alongside built-in identifiers, `toolbarSettings.items` accepts custom item objects. Each custom item requires an `actionId` (unique identifier) and presentation properties like `prefixIcon`, `tooltipText`, `align`, and `cssClass`:

```html
<template>
  <ejs-richtexteditor-ui
    ref="editor"
    :toolbarSettings="toolbarSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const onItemClicked = (args) => {
  if (args.item && args.item.actionId === 'wordCount') {
    const words = editor.value.ej2Instances.getText().trim().split(/\s+/).filter(Boolean).length;
    alert('Word count: ' + words);
  }
};

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    {
      id: 'WordCount',
      actionId: 'wordCount',
      prefixIcon: 'e-icons e-numbering-list',
      tooltipText: 'Word count',
      align: 'Left'
    },
    '|', 'Undo', 'Redo'
  ],
  itemClicked: onItemClicked
};
</script>
```

### Custom Item Properties

| Property | Type | Required | Purpose |
| --- | --- | --- | --- |
| `actionId` | `string` | Yes | Stable identifier to route clicks through `itemClicked` handler |
| `id` | `string` | No | Optional ID attribute for the toolbar button |
| `text` | `string` | No | Button label text |
| `prefixIcon` | `string` | No | CSS class for leading icon |
| `suffixIcon` | `string` | No | CSS class for trailing icon |
| `tooltipText` | `string` | No | Tooltip text on hover |
| `align` | `string` | No | Button alignment (`'Left'` or `'Right'`) |
| `cssClass` | `string` | No | Custom CSS class for styling |
| `disabled` | `boolean` | No | Initial disabled state |

---

## Quick Toolbar

The Quick Toolbar is a contextual popup that appears when content is selected or when the caret enters specific elements (images, links, tables). It provides quick access to relevant commands without reaching for the main toolbar.

### Text Quick Toolbar

Opens when text is selected:

```html
<template>
  <ejs-richtexteditor-ui :quickToolbarSettings="quickToolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const quickToolbarSettings = {
  enable: true,
  text: [
    'Undo', 'Redo', '|',
    'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
    'FontColor', 'BackgroundColor', '|',
    'Formats', '|',
    'NumberedList', 'BulletList'
  ]
};
</script>
```

### Image Quick Toolbar

Opens when an image is selected:

```html
<script setup>
const quickToolbarSettings = {
  image: [
    'AltText', 'Caption', '|',
    'Align', 'Display', 'WrapText', '|',
    'Dimension', 'Replace', 'Remove'
  ]
};
</script>
```

### Link Quick Toolbar

Opens when the caret is inside a link:

```html
<script setup>
const quickToolbarSettings = {
  link: ['Open', 'Copy', 'Edit', 'Remove']
};
</script>
```

### Table Quick Toolbar

Opens when the caret is inside a table:

```html
<script setup>
const quickToolbarSettings = {
  table: [
    'Header', 'Remove', '|',
    'Row', 'Column', '|',
    'CellBackgroundColor', 'Align', 'VerticalAlign'
  ]
};
</script>
```

### Enable Append to Body

By default, the quick toolbar popup is appended to the editor container. To escape clipping inside narrow or scroll-constrained containers, set `enableAppendToBody` to `true`:

```html
<script setup>
const quickToolbarSettings = {
  enable: true,
  enableAppendToBody: true,
  text: ['Bold', 'Italic', 'Underline'],
  image: ['AltText', 'Replace', 'Remove'],
  link: ['Open', 'Edit', 'Remove'],
  table: ['Row', 'Column', 'Remove']
};
</script>
```

### Inline Editor Mode

To create an inline editor (no main toolbar, only quick toolbar on selection), disable the main toolbar:

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
  enable: false  // Disable main toolbar
};

const quickToolbarSettings = {
  enable: true,
  text: [
    'Bold', 'Italic', 'Underline', '|',
    'Formats', 'Alignment', '|',
    'NumberedList', 'BulletList', '|',
    'Undo', 'Redo'
  ]
};
</script>
```

---

## Updating Toolbar Items at Runtime

Use `updateToolbarItems()` to add, remove, or reorder toolbar items dynamically:

```html
<template>
  <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
  <button @click="updateToolbar">Update Toolbar</button>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const updateToolbar = () => {
  editor.value.updateToolbarItems([
    { action: 'add', item: 'Italic', index: 1 },
    { action: 'remove', item: 'Strikethrough' }
  ]);
};
</script>
```

---

## Keyboard Shortcuts

### Toolbar Navigation & Control

| Action | Windows/Linux | macOS | Description |
| --- | --- | --- | --- |
| **Toolbar Focus** | <kbd>Alt</kbd>+<kbd>F10</kbd> | <kbd>Option</kbd>+<kbd>F10</kbd> | Shifts focus directly to the first active toolbar item |
| **Escape** | <kbd>Esc</kbd> | <kbd>Esc</kbd> | Closes open dropdowns, popups, or dialog windows |

**Toolbar Focus Usage:**
- Press <kbd>Alt</kbd>+<kbd>F10</kbd> to move focus to the toolbar while editing
- Use arrow keys to navigate between toolbar items
- Press <kbd>Enter</kbd> or <kbd>Space</kbd> to activate the focused item
- Press <kbd>Esc</kbd> to return focus to the editor

---

## API References

### ToolbarSettings Property

The `toolbarSettings` property controls all aspects of the main toolbar.

**Location:** [ToolbarSettings API](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/toolbarsettings)

**ToolbarSettingsModel Structure:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `string[]` | Default items | Array of toolbar item identifiers and separators ('`|`') |
| `type` | `ToolbarType` | `'Auto'` | Layout type: Auto, Expanded, Scrollable, MultiRow |
| `position` | `ToolbarPosition` | `'Top'` | Toolbar position: Top or Bottom |
| `enable` | `boolean` | `true` | Enable/disable the toolbar |
| `enableFloating` | `boolean` | `true` | Enable floating toolbar on scroll |
| `floatingOffset` | `number` | `0` | Offset from top when floating |
| `itemClicked` | `function` | - | Event handler for toolbar item clicks |
| `updatedToolbarStatus` | `function` | - | Event handler for toolbar status updates |

**Complete Configuration Example:**
```typescript
const toolbarSettings = ref({
  items: [
    'Undo', 'Redo', '|',
    'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
    'FontColor', 'BackgroundColor', '|',
    'Formats', 'Alignment', '|',
    'BulletList', 'NumberedList', 'BulletFormatList', 'NumberFormatList', '|',
    'Link', 'Image', 'Table', '|',
    'FontName', 'FontSize', '|',
    'Subscript', 'Superscript', 'InlineCode', 'ClearFormat', '|',
    'Indent', 'Outdent', 'HorizontalLine'
  ],
  type: 'Scrollable',        // Or 'Expanded', 'MultiRow', 'Auto'
  position: 'Top',            // Or 'Bottom'
  enable: true,
  enableFloating: true,
  floatingOffset: 60,         // Leave space for sticky header
  itemClicked: onToolbarItemClicked,
  updatedToolbarStatus: onToolbarStatusUpdated
});
```

**Official API Reference:**
- [ToolbarSettingsModel](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/toolbarsettingsmodel)
- [ToolbarSettings](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/toolbarsettings)

---

### ToolbarType Enum

Controls how toolbar items are displayed when there's overflow.

**Location:** [ToolbarType API](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/toolbartype)

| Value | Description |
|-------|-------------|
| `'Auto'` | Automatically uses Expanded on desktop and Scrollable on mobile |
| `'Expanded'` | All items visible, toolbar expands to accommodate them |
| `'Scrollable'` | Horizontal scrolling for overflow items |
| `'MultiRow'` | Overflow items wrap to additional rows |

**Visual Comparison:**

```typescript
// Auto - Responsive (default)
type: 'Auto'

// Expanded - All items always visible
type: 'Expanded'

// Scrollable - Horizontal scroll for overflow
type: 'Scrollable'

// MultiRow - Wrap to multiple rows
type: 'MultiRow'
```

**Official API Reference:** [ToolbarType](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/toolbartype)

---

### ToolbarPosition Enum

Specifies where the toolbar is positioned relative to the editor.

**Location:** [ToolbarPosition API](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/toolbarposition)

| Value | Description |
|-------|-------------|
| `'Top'` | Toolbar appears above the editor (default) |
| `'Bottom'` | Toolbar appears below the editor |

**Official API Reference:** [ToolbarPosition](https://ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/toolbarposition)

---

## Related Documentation

- [Formatting](formatting.md)
- [Keyboard Support](keyboard-support.md)
- [Editor Events](editor-events.md)

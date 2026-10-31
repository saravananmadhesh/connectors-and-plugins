# Quick Toolbars

Quick toolbars are context-aware toolbars that appear when the user clicks on or selects elements like images, links, tables, audio, or video. They require the `QuickToolbar` module injected.

## Setup

Always inject `QuickToolbar` in the provider when using any quick toolbar feature:

```vue
<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

## Image Quick Toolbar

Appears when the user clicks on an image. Customize via `quickToolbarSettings.image`.

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :quickToolbarSettings="quickToolbarSettings"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = { items: ['Image'] };
const quickToolbarSettings = {
  image: ['Replace', 'Align', 'WrapText', 'Caption', 'Remove',
    'InsertLink', 'OpenImageLink', '|',
    'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension']
};
provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar]);
</script>
```

**Available image quick toolbar items:**
- `Replace` — Replace the selected image
- `Align` — Block-level alignment (left, center, right)
- `WrapText` — Wrap text left or right of the image
- `Caption` — Add a caption below the image
- `Remove` — Delete the image
- `InsertLink` — Attach a hyperlink to the image
- `OpenImageLink` — Open the image's link
- `EditImageLink` — Edit the image's link URL
- `RemoveImageLink` — Remove the image's link
- `Display` — Toggle inline vs block display
- `AltText` — Set alt text for accessibility
- `Dimension` — Set custom width and height

## Link Quick Toolbar

Appears when the user clicks on a hyperlink. Customize via `quickToolbarSettings.link`.

```vue
<script setup>
const quickToolbarSettings = {
  link: ['Open', 'Edit', 'UnLink']
};
</script>
```

**Available link quick toolbar items:**
- `Open` / `OpenLink` — Open the URL
- `Edit` / `EditLink` — Edit the link URL and text
- `UnLink` / `RemoveLink` — Remove the hyperlink

## Table Quick Toolbar

Appears when the user clicks inside a table. Customize via `quickToolbarSettings.table`.

```vue
<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, Table, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const quickToolbarSettings = {
  table: ['TableHeader', 'TableRows', 'TableColumns',
    'TableCellHorizontalAlign', 'TableCellVerticalAlign',
    'TableEditProperties', 'TableRemove']
};
provide('richtexteditor', [Toolbar, Link, Image, Table, HtmlEditor, QuickToolbar]);
</script>
```

**Available table quick toolbar items:**
- `TableHeader` — Toggle table header row
- `TableRows` — Insert/delete rows
- `TableColumns` — Insert/delete columns
- `TableCellHorizontalAlign` — Align cell content horizontally
- `TableCellVerticalAlign` — Align cell content vertically
- `TableEditProperties` — Edit table width, padding, spacing
- `TableRemove` — Delete the entire table

## Audio Quick Toolbar

Appears when the user clicks on an audio element. Requires `Audio` module.

```vue
<script setup>
const quickToolbarSettings = {
  audio: ['AudioReplace', 'AudioRemove', 'AudioLayoutOption']
};
</script>
```

## Video Quick Toolbar

Appears when the user clicks on a video element. Requires `Video` module.

```vue
<script setup>
const quickToolbarSettings = {
  video: ['VideoReplace', 'VideoAlign', 'VideoRemove',
    'VideoLayoutOption', 'VideoDimension']
};
</script>
```

## Disabling Quick Toolbars

To disable quick toolbars entirely, set the relevant property to an empty array or `false`:

```vue
<script setup>
// Disable image quick toolbar
const quickToolbarSettings = {
  image: []
};
</script>
```

## Full Example: Multiple Quick Toolbars

```vue
<template>
  <ejs-richtexteditor
    :toolbarSettings="toolbarSettings"
    :quickToolbarSettings="quickToolbarSettings"
    :value="value"
  />
</template>

<script setup>
import { provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, Table, Audio, Video, HtmlEditor, QuickToolbar
} from '@syncfusion/ej2-vue-richtexteditor';

const toolbarSettings = {
  items: ['Bold', 'Italic', '|', 'CreateLink', 'Image', 'CreateTable', 'Audio', 'Video', '|', 'Undo', 'Redo']
};
const quickToolbarSettings = {
  image: ['Replace', 'Align', 'Caption', 'Remove', 'AltText', 'Dimension'],
  link: ['Open', 'Edit', 'UnLink'],
  table: ['TableHeader', 'TableRows', 'TableColumns', 'TableRemove'],
  audio: ['AudioReplace', 'AudioRemove', 'AudioLayoutOption'],
  video: ['VideoReplace', 'VideoAlign', 'VideoRemove', 'VideoDimension']
};
const value = '<p>Click on an image, link, or table to see the quick toolbar.</p>';
provide('richtexteditor', [Toolbar, Link, Image, Table, Audio, Video, HtmlEditor, QuickToolbar]);
</script>
```

# Vue Rich Text Editor Properties - Core

## Table of Contents
- [Overview](#overview)
- [Core Configuration](#core-configuration)
- [Dimensions & Layout](#dimensions--layout)
- [Editor Modes & Behavior](#editor-modes--behavior)
- [Toolbar Configuration](#toolbar-configuration)
- [Font & Text Formatting](#font--text-formatting)
- [List Formatting](#list-formatting)
- [Media Insertion (Images, Audio, Video)](#media-insertion-images-audio-video)
- [Table Settings](#table-settings)
- [Paste & Clipboard](#paste--clipboard)

## Overview

Properties in the Syncfusion Vue Rich Text Editor are configured using Vue's binding syntax. All properties support reactive updates and can be bound dynamically.

**Property Binding Pattern:**
```vue
<template>
  <ejs-richtexteditor 
    :value="content"
    :toolbarSettings="toolbarConfig"
    :height="editorHeight"
    :enabled="isEnabled"
  />
</template>

<script setup>
import { ref } from 'vue';

const content = ref('<p>Initial content</p>');
const editorHeight = ref(300);
const isEnabled = ref(true);
const toolbarConfig = ref({
  items: ['Bold', 'Italic', 'Underline']
});
</script>
```

## Core Configuration

### value
**Type:** `string`  
**Default:** `null`  
**Description:** Specifies the content to be rendered in the Rich Text Editor.

```vue
<template>
  <ejs-richtexteditor :value="content" />
</template>

<script setup>
import { ref } from 'vue';

const content = ref('<p>Hello World</p>');
</script>
```

**Two-way Binding with v-model:**
```vue
<template>
  <ejs-richtexteditor v-model:value="content" />
  <div>Content: {{ content }}</div>
</template>

<script setup>
import { ref } from 'vue';

const content = ref('');
</script>
```

### valueTemplate
**Type:** `string | Function`  
**Default:** `null`  
**Description:** Specifies the template content to be rendered.

```vue
<script setup>
const valueTemplate = '<div class="custom-template"><h2>Title</h2><p>Content</p></div>';
</script>
```

### placeholder
**Type:** `string`  
**Default:** `null`  
**Description:** Placeholder text displayed when the editor is empty.

```vue
<template>
  <ejs-richtexteditor placeholder="Start typing here..." />
</template>
```

### enabled
**Type:** `boolean`  
**Default:** `true`  
**Description:** Enables or disables the entire component.

```vue
<template>
  <ejs-richtexteditor :enabled="isEditable" />
  <button @click="isEditable = !isEditable">Toggle</button>
</template>

<script setup>
import { ref } from 'vue';
const isEditable = ref(true);
</script>
```

### readonly
**Type:** `boolean`  
**Default:** `false`  
**Description:** Makes the editor read-only (content visible but not editable).

```vue
<template>
  <ejs-richtexteditor :readonly="isReadOnly" :value="content" />
</template>

<script setup>
import { ref } from 'vue';
const isReadOnly = ref(false);
const content = ref('<p>Read-only content</p>');
</script>
```

**Difference between `enabled` and `readonly`:**
- `enabled: false` - Component is completely disabled (grayed out, no interaction)
- `readonly: true` - Content is visible and selectable but not editable

### cssClass
**Type:** `string`  
**Default:** `null`  
**Description:** Adds custom CSS class(es) to the root element.

```vue
<template>
  <ejs-richtexteditor cssClass="custom-editor dark-theme" />
</template>

<style>
.custom-editor.dark-theme {
  background-color: #2d2d2d;
  color: #ffffff;
}
</style>
```

### htmlAttributes
**Type:** `{ [key: string]: string }`  
**Default:** `{}`  
**Description:** Adds custom HTML attributes to the editor element.

```vue
<template>
  <ejs-richtexteditor :htmlAttributes="attributes" />
</template>

<script setup>
const attributes = {
  title: 'Rich Text Editor',
  'data-test-id': 'rte-editor',
  role: 'textbox'
};
</script>
```

## Dimensions & Layout

### width
**Type:** `string | number`  
**Default:** `"100%"`  
**Description:** Sets the width of the editor.

```vue
<template>
  <!-- String with units -->
  <ejs-richtexteditor width="800px" />
  
  <!-- Percentage -->
  <ejs-richtexteditor width="100%" />
  
  <!-- Number (treated as pixels) -->
  <ejs-richtexteditor :width="600" />
  
  <!-- Dynamic -->
  <ejs-richtexteditor :width="dynamicWidth" />
</template>

<script setup>
import { ref } from 'vue';
const dynamicWidth = ref('90%');
</script>
```

### height
**Type:** `string | number`  
**Default:** `"auto"`  
**Description:** Sets the height of the editor.

```vue
<template>
  <ejs-richtexteditor height="400px" />
  
  <!-- Auto height based on content -->
  <ejs-richtexteditor height="auto" />
  
  <!-- Dynamic height -->
  <ejs-richtexteditor :height="editorHeight" />
</template>

<script setup>
import { ref } from 'vue';
const editorHeight = ref(300);
</script>
```

### enableResize
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables manual resizing via drag handle in bottom-right corner.

```vue
<template>
  <ejs-richtexteditor 
    :enableResize="true" 
    height="300px"
  />
</template>
```

**Use Case:** Allow users to adjust editor size for their viewing preference.

## Editor Modes & Behavior

### editorMode
**Type:** `EditorMode` (`'HTML'` | `'Markdown'`)  
**Default:** `'HTML'`  
**Description:** Determines if the editor uses HTML or Markdown mode.

```vue
<template>
  <!-- HTML Mode (WYSIWYG) -->
  <ejs-richtexteditor editorMode="HTML" />
  
  <!-- Markdown Mode -->
  <ejs-richtexteditor editorMode="Markdown" />
</template>

<script setup>
import { provide } from 'vue';
import { HtmlEditor, MarkdownEditor } from '@syncfusion/ej2-vue-richtexteditor';

// Inject appropriate service based on mode
provide('richtexteditor', [HtmlEditor]); // For HTML mode
// OR
provide('richtexteditor', [MarkdownEditor]); // For Markdown mode
</script>
```

### enterKey
**Type:** `EnterKey` (`'P'` | `'DIV'` | `'BR'`)  
**Default:** `'P'`  
**Description:** Specifies which tag is inserted when Enter key is pressed.

```vue
<template>
  <!-- Inserts <p> tags (recommended) -->
  <ejs-richtexteditor enterKey="P" />
  
  <!-- Inserts <div> tags -->
  <ejs-richtexteditor enterKey="DIV" />
  
  <!-- Inserts <br> tags -->
  <ejs-richtexteditor enterKey="BR" />
</template>
```

### shiftEnterKey
**Type:** `ShiftEnterKey` (`'BR'` | `'P'` | `'DIV'`)  
**Default:** `'BR'`  
**Description:** Specifies which tag is inserted when Shift+Enter is pressed.

```vue
<template>
  <!-- Default: Shift+Enter inserts <br> -->
  <ejs-richtexteditor shiftEnterKey="BR" />
  
  <!-- Shift+Enter inserts <p> -->
  <ejs-richtexteditor shiftEnterKey="P" />
</template>
```

**Common Pattern:**
- `enterKey="P"` + `shiftEnterKey="BR"` - Enter creates new paragraph, Shift+Enter creates line break

### enableTabKey
**Type:** `boolean`  
**Default:** `false`  
**Description:** Allows Tab key to insert tab character (instead of navigating out).

```vue
<template>
  <ejs-richtexteditor :enableTabKey="true" />
</template>
```

**Note:** When `false`, Tab key follows browser default (focus next element).

### enableAutoUrl
**Type:** `boolean`  
**Default:** `false`  
**Description:** Automatically converts URLs to hyperlinks without validation.

```vue
<template>
  <ejs-richtexteditor :enableAutoUrl="true" />
</template>
```

**When `true`:** Accepts relative/absolute URLs as-is  
**When `false`:** Prepends `https://` to URLs without protocol

### enableMarkdownAutoFormat
**Type:** `boolean`  
**Default:** `true`  
**Description:** Auto-converts Markdown syntax to HTML formatting (Markdown mode only).

```vue
<template>
  <ejs-richtexteditor 
    editorMode="Markdown"
    :enableMarkdownAutoFormat="true"
  />
</template>
```

**Examples:**
- Type `**bold**` → converts to bold text
- Type `# Heading` → converts to heading

## Toolbar Configuration

### toolbarSettings
**Type:** `ToolbarSettingsModel`  
**Default:** See below  
**Description:** Comprehensive toolbar configuration object.

**Default Value:**
```typescript
{
  enable: true,
  enableFloating: true,
  position: ToolbarPosition.Top,
  type: ToolbarType.Expand,
  items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 
          'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 
          'SourceCode', 'Undo', 'Redo'],
  itemConfigs: {}
}
```

**Properties:**
- `enable` (boolean) - Show/hide toolbar
- `enableFloating` (boolean) - Keep toolbar fixed during scroll
- `position` (`'Top'` | `'Bottom'`) - Toolbar position
- `type` (`'Expand'` | `'MultiRow'` | `'Scrollable'` | `'Popup'`) - Overflow behavior
- `items` (string[]) - Array of toolbar item names
- `itemConfigs` (object) - Custom icon configuration

**Basic Example:**
```vue
<template>
  <ejs-richtexteditor :toolbarSettings="toolbarSettings" />
</template>

<script setup>
const toolbarSettings = {
  items: ['Bold', 'Italic', '|', 'Undo', 'Redo']
};
</script>
```

**Advanced Example:**
```vue
<script setup>
const toolbarSettings = {
  enable: true,
  enableFloating: true,
  position: 'Top',
  type: 'Expand',
  items: [
    'Bold', 'Italic', 'Underline', 'StrikeThrough',
    '|',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    '|',
    'Formats', 'Alignments',
    '|',
    'OrderedList', 'UnorderedList',
    '|',
    'CreateLink', 'Image', 'CreateTable',
    '|',
    'Undo', 'Redo'
  ],
  itemConfigs: {
    bold: {
      icon: 'e-icons e-bold'
    },
    italic: {
      icon: 'e-icons e-italic'
    }
  }
};
</script>
```

**Toolbar Types:**
- **Expand:** Overflow items hidden behind expand button
- **MultiRow:** Overflow items wrap to next row
- **Scrollable:** Single row with horizontal scroll
- **Popup:** Overflow items in popup menu

### floatingToolbarOffset
**Type:** `number`  
**Default:** `0`  
**Description:** Offset from top when toolbar is floating (pixels).

```vue
<template>
  <ejs-richtexteditor 
    :toolbarSettings="{ enableFloating: true }"
    :floatingToolbarOffset="60"
  />
</template>
```

**Use Case:** Adjust toolbar position when page has fixed header.

### showTooltip
**Type:** `boolean`  
**Default:** `true`  
**Description:** Show/hide tooltips on toolbar items.

```vue
<template>
  <ejs-richtexteditor :showTooltip="false" />
</template>
```

### quickToolbarSettings
**Type:** `QuickToolbarSettingsModel`  
**Default:** See below  
**Description:** Context-aware toolbar configuration for images, links, tables.

**Default Value:**
```typescript
{
  enable: true,
  actionOnScroll: 'none',
  link: ['Open', 'Edit', 'UnLink'],
  table: ['TableHeader', 'TableRemove', '|', 'TableRows', 'TableColumns', '|', 
          'Styles', 'BackgroundColor', 'Alignments', 'TableCellVerticalAlign'],
  image: ['AltText', 'Caption', '|', 'Align', 'Display', 'WrapText', '|', 
          'InsertLink', 'OpenImageLink', 'EditImageLink', 'RemoveImageLink', '|', 
          'Dimension', 'Replace', 'Remove'],
  audio: ['AudioLayoutOption', 'AudioReplace', 'AudioRemove'],
  video: ['VideoLayoutOption', 'VideoAlign', '|', 'VideoDimension', 
          'VideoReplace', 'VideoRemove'],
  enableAppendToBody: false
}
```

**Example:**
```vue
<script setup>
const quickToolbarSettings = {
  enable: true,
  actionOnScroll: 'hide', // or 'none'
  link: ['Open', 'Edit', 'UnLink'],
  image: ['Replace', 'Align', 'Remove', 'Dimension'],
  table: ['TableRemove', 'TableRows', 'TableColumns'],
  enableAppendToBody: false
};
</script>
```

**actionOnScroll Options:**
- `'hide'` - Quick toolbar closes when scrolling
- `'none'` - Quick toolbar stays open during scroll

## Font & Text Formatting

### fontFamily
**Type:** `FontFamilyModel`  
**Default:** See code  
**Description:** Font family dropdown configuration.

```vue
<script setup>
const fontFamily = {
  default: 'Arial',
  width: '120px',
  items: [
    { text: 'Arial', value: 'Arial,sans-serif' },
    { text: 'Georgia', value: 'Georgia,serif' },
    { text: 'Courier New', value: 'Courier New,monospace' },
    { text: 'Times New Roman', value: 'Times New Roman,serif' },
    { text: 'Verdana', value: 'Verdana,sans-serif' }
  ]
};
</script>
```

### fontSize
**Type:** `FontSizeModel`  
**Default:** `{ default: '10pt', width: '35px', items: [...] }`  
**Description:** Font size dropdown configuration.

```vue
<script setup>
const fontSize = {
  default: '12pt',
  width: '40px',
  items: [
    { text: '8', value: '8pt' },
    { text: '10', value: '10pt' },
    { text: '12', value: '12pt' },
    { text: '14', value: '14pt' },
    { text: '16', value: '16pt' },
    { text: '18', value: '18pt' },
    { text: '24', value: '24pt' },
    { text: '36', value: '36pt' }
  ]
};
</script>
```

### fontColor
**Type:** `FontColorModel`  
**Default:** See code  
**Description:** Font color picker configuration.

```vue
<script setup>
const fontColor = {
  columns: 10,
  modeSwitcher: false,
  showRecentColors: true,
  colorCode: {
    Custom: [
      '#000000', '#ff0000', '#00ff00', '#0000ff',
      '#ffff00', '#ff00ff', '#00ffff', '#ffffff'
    ]
  }
};
</script>
```

### backgroundColor
**Type:** `BackgroundColorModel`  
**Default:** See code  
**Description:** Text highlight color picker configuration.

```vue
<script setup>
const backgroundColor = {
  columns: 5,
  modeSwitcher: false,
  showRecentColors: true,
  colorCode: {
    Custom: [
      '#ffff00', '#00ff00', '#00ffff', '#ff00ff',
      '#ff0000', '#0000ff', '#808080', '#000000'
    ]
  }
};
</script>
```

### format
**Type:** `FormatModel`  
**Default:** Paragraph, Heading 1-6, Preformatted  
**Description:** Block format dropdown configuration.

```vue
<script setup>
const format = {
  default: 'Paragraph',
  width: '100px',
  types: [
    { text: 'Paragraph', value: 'P' },
    { text: 'Heading 1', value: 'H1' },
    { text: 'Heading 2', value: 'H2' },
    { text: 'Heading 3', value: 'H3' },
    { text: 'Heading 4', value: 'H4' },
    { text: 'Code', value: 'Pre' },
    { text: 'Blockquote', value: 'BlockQuote' }
  ]
};
</script>
```

### lineHeight
**Type:** `LineHeightModel`  
**Default:** See code  
**Description:** Line height dropdown configuration.

```vue
<script setup>
const lineHeight = {
  default: '1.5',
  items: [
    { text: '1', value: '1' },
    { text: '1.15', value: '1.15' },
    { text: '1.5', value: '1.5' },
    { text: '2', value: '2' },
    { text: '2.5', value: '2.5' },
    { text: '3', value: '3' }
  ],
  supportAllValues: false
};
</script>
```

### formatPainterSettings
**Type:** `FormatPainterSettingsModel`  
**Default:** See code  
**Description:** Specifies which formats can be copied/applied with format painter.

```vue
<script setup>
const formatPainterSettings = {
  allowedFormats: 'bold,italic,underline,fontColor,fontSize,fontFamily'
};
</script>
```

## List Formatting

### bulletFormatList
**Type:** `BulletFormatListModel`  
**Default:** None, Disc, Circle, Square  
**Description:** Unordered list style options.

```vue
<script setup>
const bulletFormatList = {
  types: [
    { text: 'None', value: 'none' },
    { text: 'Disc', value: 'disc' },
    { text: 'Circle', value: 'circle' },
    { text: 'Square', value: 'square' },
    { text: 'Custom', value: 'customBullet', cssClass: 'e-custom-bullet' }
  ]
};
</script>
```

### numberFormatList
**Type:** `NumberFormatListModel`  
**Default:** None, Number, Lower/Upper Roman, Lower/Upper Alpha, Lower Greek  
**Description:** Ordered list style options.

```vue
<script setup>
const numberFormatList = {
  types: [
    { text: 'None', value: 'none' },
    { text: 'Number', value: 'decimal' },
    { text: 'Lower Roman', value: 'lowerRoman' },
    { text: 'Upper Roman', value: 'upperRoman' },
    { text: 'Lower Alpha', value: 'lowerAlpha' },
    { text: 'Upper Alpha', value: 'upperAlpha' },
    { text: 'Lower Greek', value: 'lowerGreek' }
  ]
};
</script>
```

## Media Insertion (Images, Audio, Video)

### insertImageSettings
**Type:** `ImageSettingsModel`  
**Default:** See code  
**Description:** Image insertion and upload configuration.

```vue
<script setup>
const insertImageSettings = {
  allowedTypes: ['.jpeg', '.jpg', '.png', '.gif', '.svg'],
  display: 'inline', // or 'block'
  width: 'auto',
  height: 'auto',
  saveFormat: 'Blob', // or 'Base64'
  saveUrl: 'https://api.example.com/upload/image',
  path: 'https://cdn.example.com/images/',
  maxFileSize: 5 * 1024 * 1024 // 5MB
};
</script>
```

**Properties Explained:**
- `allowedTypes` - File extensions allowed
- `display` - `'inline'` or `'block'` layout
- `saveFormat` - `'Blob'` (server upload) or `'Base64'` (embed in HTML)
- `saveUrl` - Server endpoint for upload
- `path` - URL path for displaying uploaded images
- `maxFileSize` - Maximum file size in bytes

**Base64 vs Blob:**
- **Base64:** Embeds image data in HTML (good for small images, no server needed)
- **Blob:** Uploads to server, stores URL reference (better for large images)

### insertAudioSettings
**Type:** `AudioSettingsModel`  
**Default:** See code  
**Description:** Audio file insertion configuration.

```vue
<script setup>
const insertAudioSettings = {
  allowedTypes: ['.mp3', '.wav', '.ogg', '.m4a'],
  layoutOption: 'Inline', // or 'Break'
  saveFormat: 'Blob',
  saveUrl: 'https://api.example.com/upload/audio',
  path: 'https://cdn.example.com/audio/',
  maxFileSize: 10 * 1024 * 1024 // 10MB
};
</script>
```

### insertVideoSettings
**Type:** `VideoSettingsModel`  
**Default:** See code  
**Description:** Video file insertion configuration.

```vue
<script setup>
const insertVideoSettings = {
  allowedTypes: ['.mp4', '.webm', '.ogg', '.mov'],
  layoutOption: 'Inline', // or 'Break'
  width: 'auto',
  height: 'auto',
  saveFormat: 'Blob',
  saveUrl: 'https://api.example.com/upload/video',
  path: 'https://cdn.example.com/videos/',
  maxFileSize: 50 * 1024 * 1024 // 50MB
};
</script>
```

### fileManagerSettings
**Type:** `FileManagerSettingsModel`  
**Default:** See code  
**Description:** File manager integration for media browsing.

```vue
<script setup>
const fileManagerSettings = {
  enable: true,
  path: '/images/',
  ajaxSettings: {
    url: 'https://api.example.com/filemanager/operations',
    getImageUrl: 'https://api.example.com/filemanager/getImage',
    uploadUrl: 'https://api.example.com/filemanager/upload'
  },
  toolbarSettings: {
    visible: true,
    items: ['Upload', 'NewFolder', 'Delete']
  }
};
</script>
```

## Table Settings

### tableSettings
**Type:** `TableSettingsModel`  
**Default:** See code  
**Description:** Table insertion and styling configuration.

```vue
<script setup>
const tableSettings = {
  width: '100%',
  minWidth: 200,
  maxWidth: null,
  resize: true,
  styles: [
    {
      text: 'Default',
      class: 'e-table-default',
      command: 'Table',
      subCommand: 'Default'
    },
    {
      text: 'Dashed Borders',
      class: 'e-dashed-borders',
      command: 'Table',
      subCommand: 'Dashed'
    },
    {
      text: 'Alternate Rows',
      class: 'e-alternate-rows',
      command: 'Table',
      subCommand: 'Alternate'
    }
  ]
};
</script>
```

## Paste & Clipboard

### pasteCleanupSettings
**Type:** `PasteCleanupSettingsModel`  
**Default:** See code  
**Description:** Controls how pasted content is cleaned/formatted.

```vue
<script setup>
const pasteCleanupSettings = {
  prompt: true, // Show dialog with cleanup options
  plainText: false, // Paste as plain text
  keepFormat: true, // Keep formatting
  deniedAttrs: ['style', 'class'], // Remove these attributes
  deniedTags: ['script', 'iframe', 'embed'], // Remove these tags
  allowedStyleProps: [
    'color', 'background-color', 'font-size', 'font-family',
    'font-weight', 'font-style', 'text-align', 'text-decoration'
  ]
};
</script>
```

**Cleanup Options:**
- `prompt: true` - Show dialog letting user choose cleanup mode
- `plainText: true` - Strip all formatting
- `keepFormat: true` - Preserve formatting
- `deniedAttrs` - Attributes to remove
- `deniedTags` - HTML tags to remove
- `allowedStyleProps` - Style properties to keep

### enableClipboardCleanup
**Type:** `boolean`  
**Default:** `true`  
**Description:** Enable/disable paste cleanup feature entirely.

```vue
<template>
  <ejs-richtexteditor :enableClipboardCleanup="false" />
</template>
```

## Complete Core Configuration Example

```vue
<template>
  <div class="editor-container">
    <ejs-richtexteditor
      ref="rteRef"
      v-model:value="content"
      :height="400"
      :width="'100%'"
      :placeholder="'Start typing...'"
      :toolbarSettings="toolbarSettings"
      :quickToolbarSettings="quickToolbarSettings"
      :insertImageSettings="insertImageSettings"
      :pasteCleanupSettings="pasteCleanupSettings"
      :enableResize="true"
      :enableAutoUrl="true"
      @created="onCreated"
      @change="onChange"
    />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup
} from '@syncfusion/ej2-vue-richtexteditor';

const rteRef = ref(null);
const content = ref('');

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
    'Formats', 'Alignments', '|',
    'OrderedList', 'UnorderedList', '|',
    'CreateLink', 'Image', '|',
    'Undo', 'Redo'
  ]
};

const quickToolbarSettings = {
  image: ['Replace', 'Align', 'Remove', 'Dimension']
};

const insertImageSettings = {
  saveUrl: 'https://api.example.com/upload',
  path: 'https://cdn.example.com/images/',
  maxFileSize: 5242880
};

const pasteCleanupSettings = {
  prompt: true,
  keepFormat: true
};

const onCreated = () => {
  console.log('Editor ready');
};

const onChange = (args) => {
  console.log('Content changed:', args.value);
};

provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup]);
</script>
```

## Property Best Practices

### Reactive Property Updates
```vue
<script setup>
import { ref, watch } from 'vue';

const isReadOnly = ref(false);
const userRole = ref('viewer');

watch(userRole, (newRole) => {
  isReadOnly.value = newRole === 'viewer';
});
</script>
```

### Conditional Configuration
```vue
<script setup>
import { computed } from 'vue';

const userRole = ref('editor');

const toolbarSettings = computed(() => {
  if (userRole.value === 'admin') {
    return {
      items: ['Bold', 'Italic', 'Image', 'CreateTable', 'SourceCode']
    };
  } else {
    return {
      items: ['Bold', 'Italic']
    };
  }
});
</script>
```

### Performance Optimization
```vue
<script setup>
// Avoid recreating objects on every render
const toolbarSettings = {
  items: ['Bold', 'Italic', 'Undo', 'Redo']
};

// Don't do this:
// :toolbarSettings="{ items: ['Bold', 'Italic'] }"
</script>
```

# Features and Configuration in Vue BlockEditor

## Table of Contents
- [Overview](#overview)
- [Drag and Drop](#drag-and-drop)
  - [Enable Drag and Drop](#enable-drag-and-drop)
  - [Drag Handle Configuration](#drag-handle-configuration)
- [Paste Cleanup](#paste-cleanup)
  - [PasteCleanupSettings](#pastecleanupsettings)
  - [Denied Tags](#denied-tags)
  - [Keep Format Options](#keep-format-options)
  - [Plain Text Mode](#plain-text-mode)
- [Undo Redo](#undo-redo)
  - [UndoRedoStack Configuration](#undoredostack-configuration)
  - [Stack Limit](#stack-limit)
- [Keyboard Configuration](#keyboard-configuration)
  - [KeyConfig Customization](#keyconfig-customization)
  - [Custom Shortcuts](#custom-shortcuts)
- [Read-Only Mode](#read-only-mode)
- [Persistence](#persistence)
  - [EnablePersistence](#enablepersistence)
- [Styling Configuration](#styling-configuration)
  - [CssClass](#cssclass)
  - [Height and Width](#height-and-width)
- [Theme Customization](#theme-customization)
  - [Default CSS Override](#default-css-override)
  - [Block Editor CSS Classes and IDs](#block-editor-css-classes-and-ids)
  - [Block Editor CSS Variables](#block-editor-css-variables)
  - [Theme Customization Example](#theme-customization-example)
  - [Using Theme Studio](#using-theme-studio)
- [Complete Examples](#complete-examples)

## Overview

The BlockEditor provides extensive configuration options for drag-and-drop, paste cleanup, undo/redo functionality, keyboard shortcuts, read-only mode, state persistence, and custom styling. These features enable you to customize the editor to match your application requirements.

## Drag and Drop

### Enable Drag and Drop

Enable dragging and dropping of blocks:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :enableDragAndDrop="true"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [{ text: 'Drag this block', type: 'Text' }]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [{ text: 'Drop it here', type: 'Text' }]
  },
  {
    id: 'block3',
    type: 'Paragraph',
    content: [{ text: 'Or here', type: 'Text' }]
  }
]);
</script>
```

### Drag Handle Configuration

Configure drag handle with block action menu:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :enableDragAndDrop="true"
      :blockActionMenuSettings="blockActionMenuSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const blockActionMenuSettings = ref({
  enable: true,
  items: ['DragHandle', 'Delete', 'Duplicate', 'MoveUp', 'MoveDown'],
  position: 'left'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [{ text: 'Hover to see drag handle', type: 'Text' }]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [{ text: 'Drag using the handle', type: 'Text' }]
  }
]);
</script>
```

## Paste Cleanup

### PasteCleanupSettings

Configure how pasted content is cleaned:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :pasteCleanupSettings="pasteCleanupSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const pasteCleanupSettings = ref({
  keepFormat: true,
  deniedTags: ['script', 'style', 'iframe'],
  deniedAttrs: ['class', 'id', 'onclick'],
  plainText: false
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Paste formatted content here to see cleanup in action',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Denied Tags

Specify which HTML tags should be removed when pasting:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :pasteCleanupSettings="pasteCleanupSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const pasteCleanupSettings = ref({
  keepFormat: true,
  deniedTags: [
    'script',
    'style',
    'iframe',
    'object',
    'embed',
    'applet',
    'meta',
    'link',
    'form',
    'input',
    'button'
  ],
  deniedAttrs: ['onclick', 'onload', 'onerror', 'class', 'id']
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Dangerous tags and attributes will be removed',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Keep Format Options

Control whether formatting is preserved when pasting:

```vue
<template>
  <div>
    <button @click="toggleKeepFormat">
      {{ keepFormat ? 'Disable' : 'Enable' }} Keep Format
    </button>
    
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :pasteCleanupSettings="pasteCleanupSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);
const keepFormat = ref(true);

const pasteCleanupSettings = ref({
  keepFormat: true,
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Paste content to test keep format setting',
        type: 'Text'
      }
    ]
  }
]);

const toggleKeepFormat = () => {
  keepFormat.value = !keepFormat.value;
  pasteCleanupSettings.value.keepFormat = keepFormat.value;
};
</script>
```

### Plain Text Mode

Strip all formatting from pasted content:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :pasteCleanupSettings="pasteCleanupSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const pasteCleanupSettings = ref({
  plainText: true, // Strip all formatting
  keepFormat: false
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Pasted content will be plain text only',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Undo Redo

### UndoRedoStack Configuration

Configure undo/redo functionality:

```vue
<template>
  <div>
    <button @click="handleUndo">Undo</button>
    <button @click="handleRedo">Redo</button>
    
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :undoRedoStack="undoRedoStack"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const undoRedoStack = ref({
  enable: true,
  limit: 30
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Make changes and use undo/redo',
        type: 'Text'
      }
    ]
  }
]);

const handleUndo = () => {
  blockEditor.value.ej2Instances.executeToolbarAction('Undo');
};

const handleRedo = () => {
  blockEditor.value.ej2Instances.executeToolbarAction('Redo');
};
</script>
```

### Stack Limit

Configure the undo/redo stack limit:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :undoRedoStack="undoRedoStack"
      :height="500"
    />
    <p>Undo/Redo stack limit: {{ undoRedoStack.limit }} actions</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const undoRedoStack = ref({
  enable: true,
  limit: 50 // Store up to 50 undo states
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Extended undo/redo history',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Keyboard Configuration

### KeyConfig Customization

Customize keyboard shortcuts:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :keyConfig="keyConfig"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const keyConfig = ref({
  'bold': 'ctrl+b',
  'italic': 'ctrl+i',
  'underline': 'ctrl+u',
  'undo': 'ctrl+z',
  'redo': 'ctrl+y',
  'save': 'ctrl+s',
  'selectAll': 'ctrl+a',
  'copy': 'ctrl+c',
  'cut': 'ctrl+x',
  'paste': 'ctrl+v'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Use keyboard shortcuts: Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+U (Underline)',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Custom Shortcuts

Add custom keyboard shortcuts:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :keyConfig="keyConfig"
      :height="500"
    />
    <p>Custom shortcuts: Ctrl+Shift+D (Duplicate), Ctrl+Shift+Delete (Clear formatting)</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const keyConfig = ref({
  'bold': 'ctrl+b',
  'italic': 'ctrl+i',
  'underline': 'ctrl+u',
  'strikethrough': 'ctrl+shift+s',
  'duplicate': 'ctrl+shift+d',
  'clearFormat': 'ctrl+shift+delete',
  'heading1': 'ctrl+alt+1',
  'heading2': 'ctrl+alt+2',
  'heading3': 'ctrl+alt+3',
  'bulletList': 'ctrl+shift+l',
  'numberedList': 'ctrl+shift+n'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Try custom shortcuts like Ctrl+Alt+1 for Heading 1',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Read-Only Mode

Enable read-only mode to prevent editing:

```vue
<template>
  <div>
    <button @click="toggleReadOnly">
      {{ isReadOnly ? 'Enable' : 'Disable' }} Editing
    </button>
    
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :readOnly="isReadOnly"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);
const isReadOnly = ref(false);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Heading1',
    content: [{ text: 'Read-Only Mode Demo', type: 'Text' }]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: 'Toggle the button to enable/disable editing',
        type: 'Text'
      }
    ]
  }
]);

const toggleReadOnly = () => {
  isReadOnly.value = !isReadOnly.value;
};
</script>
```

## Persistence

### EnablePersistence

Persist editor state across page reloads:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :enablePersistence="true"
      id="persistentEditor"
      :height="500"
    />
    <p>Your changes will be saved in localStorage</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'This content persists across page reloads',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Styling Configuration

### CssClass

Add custom CSS classes to the editor:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      cssClass="custom-editor dark-theme"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Custom styled editor',
        type: 'Text'
      }
    ]
  }
]);
</script>

<style>
.custom-editor.dark-theme {
  background-color: #1e1e1e;
  color: #d4d4d4;
}

.custom-editor.dark-theme .e-block-editor-content {
  background-color: #2d2d2d;
  color: #d4d4d4;
}
</style>
```

### Height and Width

Configure editor dimensions:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="600"
      :width="800"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Editor with custom dimensions: 800px wide, 600px tall',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Theme Customization

The Block Editor provides flexible theme customization options to help match the editor appearance with your application design. You can customize built-in themes by overriding CSS variables, targeting specific CSS classes/IDs, or create a fully customized theme using Syncfusion Theme Studio.

### Default CSS Override

The Block Editor uses CSS variables with the unified `--sf` naming convention. These variables control colors, typography, backgrounds, borders, icons, and other visual elements across the editor.

### Block Editor CSS Classes and IDs

| Selector                      | Purpose                            |
| ----------------------------- | ---------------------------------- |
| `.e-blockeditor`              | Main Block Editor element          |
| `.e-active`                   | Active Block Editor element        |
| `.e-selected`                 | Selected Block Editor element      |
| `.e-list-item`                | Dropdown or list item              |
| `.e-dropdownbase`             | Dropdown container                 |
| `.e-table-element`            | Block Editor table element         |
| `#blockeditor_contextmenu`    | Block Editor context menu          |
| `#blockeditor_code-ddl_popup` | Code block language dropdown popup |

### Block Editor CSS Variables

| Variable                               | Purpose                  |
| -------------------------------------- | ------------------------ |
| `--color-sf-content-bg-color`          | Content background       |
| `--color-sf-content-bg-color-hover`    | Hover background         |
| `--color-sf-content-bg-color-selected` | Selected background      |
| `--color-sf-content-bg-color-pressed`  | Pressed background       |
| `--color-sf-content-text-color`        | Content text color       |
| `--color-sf-content-text-color-alt1`   | Alternate text color     |
| `--color-sf-placeholder-text-color`    | Placeholder text color   |
| `--color-sf-border-light`              | Light border color       |
| `--color-sf-border`                    | Border color             |
| `--color-sf-border-hover`              | Hover border color       |
| `--color-sf-border-selected`           | Selected border color    |
| `--color-sf-primary`                   | Primary color            |
| `--color-sf-primary-bg-color`          | Primary background color |
| `--color-sf-primary-border-color`      | Primary border color     |
| `--color-sf-primary-text-color`        | Primary text color       |
| `--color-sf-icon-color`                | Icon color               |

### Theme Customization Example

The following example demonstrates how to customize the Block Editor appearance using CSS variable overrides with multiple built-in themes.

```vue
<template>
  <div id="container">
    <h2>Block Editor - Theme Customization</h2>

    <div class="theme-switcher">
      <button
        type="button"
        :class="{ active: currentTheme === 'slateLightTheme' }"
        @click="applyTheme('slateLightTheme')"
      >
        Slate Light
      </button>
      <button
        type="button"
        :class="{ active: currentTheme === 'sageGreenTheme' }"
        @click="applyTheme('sageGreenTheme')"
      >
        Sage Green
      </button>
      <button
        type="button"
        :class="{ active: currentTheme === 'darkProTheme' }"
        @click="applyTheme('darkProTheme')"
      >
        Dark Pro
      </button>
    </div>

    <ejs-blockeditor
      id="block-editor"
      :blocks="blockData"
      :users="users"
      width="100%"
      height="600px"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const ContentType = {
  Text: 'Text',
  Link: 'Link',
  Mention: 'Mention',
  Label: 'Label',
};

const currentTheme = ref('slateLightTheme');
const blockData = [
  {
    blockType: 'Heading',
    properties: { level: 1 },
    content: [{ contentType: ContentType.Text, content: 'Block Editor - All Block Types' }],
  },
  {
    blockType: 'Paragraph',
    content: [
      { contentType: ContentType.Text, content: 'This sample shows every block type used once, including a ' },
      { contentType: ContentType.Text, content: 'bold', properties: { styles: { bold: true } } },
      { contentType: ContentType.Text, content: ' word, a ' },
      {
        contentType: ContentType.Link,
        content: 'link',
        properties: {
          url: 'https://ej2.syncfusion.com/documentation/block-editor/getting-started',
        },
      },
      { contentType: ContentType.Text, content: ', a mention ' },
      { contentType: ContentType.Mention, properties: { userId: 'user1' } },
      { contentType: ContentType.Text, content: ', and a label ' },
      { contentType: ContentType.Label, properties: { labelId: 'progress' } },
      { contentType: ContentType.Text, content: '.' },
    ],
  },
  {
    blockType: 'BulletList',
    content: [{ contentType: ContentType.Text, content: 'Bullet list item' }],
  },
  {
    blockType: 'NumberedList',
    content: [{ contentType: ContentType.Text, content: 'Numbered list item' }],
  },
  {
    blockType: 'Checklist',
    properties: { isChecked: true },
    content: [{ contentType: ContentType.Text, content: 'Checklist item' }],
  },
  {
    blockType: 'Quote',
    properties: {
      children: [
        {
          blockType: 'Paragraph',
          content: [{ contentType: ContentType.Text, content: 'Quote block example.' }],
        },
      ],
    },
  },
  {
    blockType: 'Code',
    content: [
      {
        contentType: ContentType.Text,
        content: 'function greet(name) {\n  return `Hello, ${name}!`;\n}',
      },
    ],
  },
  {
    blockType: 'CollapsibleParagraph',
    content: [
      {
        contentType: ContentType.Text,
        content: 'Toggle block example',
        properties: { styles: { bold: true } },
      },
    ],
    properties: {
      isExpanded: false,
      children: [
        {
          blockType: 'Paragraph',
          content: [{ contentType: ContentType.Text, content: 'Collapsed content goes here.' }],
        },
      ],
    },
  },
  {
    blockType: 'Table',
    properties: {
      columns: [{ headerText: 'Name' }, { headerText: 'Role' }, { headerText: 'Status' }],
      rows: [
        {
          cells: [
            { blocks: [{ blockType: 'Paragraph', content: [{ contentType: ContentType.Text, content: 'Arun Kumar' }] }] },
            { blocks: [{ blockType: 'Paragraph', content: [{ contentType: ContentType.Text, content: 'Developer' }] }] },
            { blocks: [{ blockType: 'Paragraph', content: [{ contentType: ContentType.Text, content: 'Active' }] }] },
          ],
        },
        {
          cells: [
            { blocks: [{ blockType: 'Paragraph', content: [{ contentType: ContentType.Text, content: 'Divya Sharma' }] }] },
            { blocks: [{ blockType: 'Paragraph', content: [{ contentType: ContentType.Text, content: 'Designer' }] }] },
            { blocks: [{ blockType: 'Paragraph', content: [{ contentType: ContentType.Text, content: 'Active' }] }] },
          ],
        },
      ],
    },
  },
  {
    blockType: 'Divider',
  },
];

const users = [
  {
    avatarUrl: 'https://ej2.syncfusion.com/demos/src/block-editor/images/andrew.png',
    id: 'user1',
    user: 'Andrews',
  },
];

function applyTheme(themeName) {
  currentTheme.value = themeName;
  document.body.classList.remove('slateLightTheme', 'sageGreenTheme', 'darkProTheme');
  document.body.classList.add(themeName);
}

onMounted(() => {
  applyTheme('slateLightTheme');
});

watch(currentTheme, (value) => {
  document.body.classList.remove('slateLightTheme', 'sageGreenTheme', 'darkProTheme');
  document.body.classList.add(value);
});
</script>

<style>
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/blockeditor/index.css';

#container {
  margin: 20px auto;
  max-width: 1000px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  padding: 0 20px 32px;
}
</style>
```

```css
/* Theme Customization Styles */

body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background: #f4f5f7;
  color: #1f2937;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#container {
  padding: 40px 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

#loader {
  color: #008cff;
  font-size: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

h2 {
  margin: 0 0 16px;
  font-size: 2rem;
  color: inherit;
  font-weight: 600;
}

/* =====================================
   THEME SWITCHER
   ===================================== */

/* Theme button container */
.theme-switcher {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* Theme buttons */
.theme-switcher button {
  padding: 10px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  background: #fff;
  color: #303030;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Theme button hover state */
.theme-switcher button:hover {
  background-color: #f0f0f0;
  border-color: #999;
}

/* Active theme button */
.theme-switcher button.active {
  background: inherit;
  border-color: inherit;
}

/* =====================================
   SLATE LIGHT THEME
   ===================================== */

/* Block Editor appearance */
.slateLightTheme .e-blockeditor {
  /* Background Colors */
  --color-sf-content-bg-color: #f8f7f4;
  --color-sf-content-bg-color-hover: #efede7;
  --color-sf-content-bg-color-selected: #e7e5df;
  --color-sf-content-bg-color-pressed: #dcd9d2;

  /* Text Colors */
  --color-sf-content-text-color: #2f3437;
  --color-sf-content-text-color-alt1: #1f2328;
  --color-sf-placeholder-text-color: #787774;

  /* Border Colors */
  --color-sf-border-light: #e7e5df;
  --color-sf-border: #d0cdc7;
  --color-sf-border-hover: #8b8b8b;
  --color-sf-border-selected: #5f5f5f;

  /* Primary Accent */
  --color-sf-primary: #2563eb;
  --color-sf-primary-bg-color: #2563eb;
  --color-sf-primary-border-color: #2563eb;
  --color-sf-primary-text-color: #ffffff;

  /* Icons */
  --color-sf-icon-color: #6b7280;

  background: #f8f7f4 !important;
  border: 1px solid #d0cdc7;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Context menu and popup styling */
body.slateLightTheme #blockeditor_contextmenu,
body.slateLightTheme .e-content .e-dropdownbase,
body.slateLightTheme #blockeditor_code-ddl_popup {
  background: #ffffff;
  border: 1px solid #d0cdc7;
  color: #2f3437;
}

/* Dropdown items */
body.slateLightTheme #blockeditor_code-ddl_popup .e-list-item {
  background: #ffffff !important;
  color: #2f3437 !important;
}

/* Dropdown hover state */
body.slateLightTheme #blockeditor_code-ddl_popup .e-list-item:hover {
  background: #efede7 !important;
  color: #1f2328 !important;
}

/* Selected dropdown item */
body.slateLightTheme #blockeditor_code-ddl_popup .e-selected,
body.slateLightTheme #blockeditor_code-ddl_popup .e-active {
  background: #2563eb !important;
  color: #ffffff !important;
}

/* Table headers */
.slateLightTheme .e-blockeditor .e-table-element thead th {
  background: #2563eb !important;
  color: #ffffff !important;
}

/* =====================================
   SAGE GREEN THEME
   ===================================== */

/* Block Editor appearance */
.sageGreenTheme .e-blockeditor {
  /* Background Colors */
  --color-sf-content-bg-color: #f6f8f4;
  --color-sf-content-bg-color-hover: #edf2e8;
  --color-sf-content-bg-color-selected: #dfe8d5;
  --color-sf-content-bg-color-pressed: #d2dfc4;

  /* Text Colors */
  --color-sf-content-text-color: #2f3e2f;
  --color-sf-content-text-color-alt1: #243224;
  --color-sf-placeholder-text-color: #6b7a61;

  /* Border Colors */
  --color-sf-border-light: #dfe8d5;
  --color-sf-border: #c8d5b9;
  --color-sf-border-hover: #7a9b5f;
  --color-sf-border-selected: #6b8e23;

  /* Primary Accent */
  --color-sf-primary: #6b8e23;
  --color-sf-primary-bg-color: #6b8e23;
  --color-sf-primary-border-color: #6b8e23;
  --color-sf-primary-text-color: #ffffff;

  /* Icons */
  --color-sf-icon-color: #5f7d3b;

  background: #f6f8f4 !important;
  border: 1px solid #c8d5b9;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(107, 142, 35, 0.12);
}

/* Context menu and popup styling */
body.sageGreenTheme #blockeditor_contextmenu,
body.sageGreenTheme .e-content .e-dropdownbase,
body.sageGreenTheme #blockeditor_code-ddl_popup {
  background: #fbfcfa;
  border: 1px solid #c8d5b9;
  color: #2f3e2f;
}

/* Dropdown items */
body.sageGreenTheme #blockeditor_code-ddl_popup .e-list-item {
  background: #fbfcfa !important;
  color: #2f3e2f !important;
}

/* Dropdown hover state */
body.sageGreenTheme #blockeditor_code-ddl_popup .e-list-item:hover {
  background: #edf2e8 !important;
  color: #4d6530 !important;
}

/* Selected dropdown item */
body.sageGreenTheme #blockeditor_code-ddl_popup .e-selected,
body.sageGreenTheme #blockeditor_code-ddl_popup .e-active {
  background: #6b8e23 !important;
  color: #ffffff !important;
}

/* Table headers */
.sageGreenTheme .e-blockeditor .e-table-element thead th {
  background: #6b8e23 !important;
  color: #ffffff !important;
}

/* =====================================
   DARK PRO THEME
   ===================================== */

/* Block Editor appearance */
.darkProTheme .e-blockeditor {
  /* Background Colors */
  --color-sf-content-bg-color: #0d1117;
  --color-sf-content-bg-color-hover: #161b22;
  --color-sf-content-bg-color-selected: #21262d;
  --color-sf-content-bg-color-pressed: #30363d;

  /* Text Colors */
  --color-sf-content-text-color: #e6edf3;
  --color-sf-content-text-color-alt1: #ffffff;
  --color-sf-placeholder-text-color: #7d8590;

  /* Border Colors */
  --color-sf-border-light: #21262d;
  --color-sf-border: #30363d;
  --color-sf-border-hover: #58a6ff;
  --color-sf-border-selected: #58a6ff;

  /* Primary Accent */
  --color-sf-primary: #1f6feb;
  --color-sf-primary-bg-color: #1f6feb;
  --color-sf-primary-border-color: #1f6feb;
  --color-sf-primary-text-color: #ffffff;

  /* Icons */
  --color-sf-icon-color: #8b949e;

  background: #0d1117 !important;
  border: 1px solid #30363d;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55);
}

/* Context menu and popup styling */
body.darkProTheme #blockeditor_contextmenu,
body.darkProTheme .e-content .e-dropdownbase,
body.darkProTheme #blockeditor_code-ddl_popup {
  background: #161b22;
  border: 1px solid #30363d;
  color: #e6edf3;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

/* Dropdown items */
body.darkProTheme #blockeditor_code-ddl_popup .e-list-item {
  background: #161b22 !important;
  color: #e6edf3 !important;
}

/* Dropdown hover state */
body.darkProTheme #blockeditor_code-ddl_popup .e-list-item:hover {
  background: #21262d !important;
  color: #ffffff !important;
}

/* Selected dropdown item */
body.darkProTheme #blockeditor_code-ddl_popup .e-selected,
body.darkProTheme #blockeditor_code-ddl_popup .e-active {
  background: #1f6feb !important;
  color: #ffffff !important;
}

/* Table headers */
.darkProTheme .e-blockeditor .e-table-element thead th {
  background: #1f6feb !important;
  color: #ffffff !important;
}

/* Active editor elements */
.darkProTheme .e-blockeditor .e-active,
.darkProTheme .e-blockeditor .e-selected {
  color: #58a6ff !important;
}

/* Links */
.darkProTheme .e-blockeditor a {
  color: #58a6ff !important;
}
```

### Using Theme Studio

Syncfusion Theme Studio provides an advanced way to create a fully customized theme for the Block Editor and other EJ2 components.

1. Visit the [Syncfusion<sup style="font-size:70%">&reg;</sup> Theme Studio](https://ej2.syncfusion.com/themestudio/).
2. Select a base theme such as Material 3, Fluent 2, Bootstrap 5.3, or Tailwind 3.
3. Customize colors, typography, borders, and component styles.
4. Download the generated CSS file.
5. Include the generated theme in your application.

This approach ensures consistent styling across all Syncfusion components in your application.

## Complete Examples

### Comprehensive Configuration Example

A complete example with all major features configured:

```vue
<template>
  <div class="editor-container">
    <h2>Fully Configured BlockEditor</h2>
    
    <div class="controls">
      <button @click="toggleReadOnly">
        {{ isReadOnly ? 'Enable' : 'Disable' }} Editing
      </button>
      <button @click="toggleDragDrop">
        {{ dragEnabled ? 'Disable' : 'Enable' }} Drag & Drop
      </button>
      <button @click="handleUndo">Undo</button>
      <button @click="handleRedo">Redo</button>
      <button @click="exportData">Export JSON</button>
    </div>
    
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :height="600"
      :width="'100%'"
      :enableDragAndDrop="dragEnabled"
      :enablePersistence="true"
      :readOnly="isReadOnly"
      cssClass="custom-blockeditor"
      id="configuredEditor"
      :pasteCleanupSettings="pasteCleanupSettings"
      :undoRedoStack="undoRedoStack"
      :keyConfig="keyConfig"
      :blockActionMenuSettings="blockActionMenuSettings"
      :inlineToolbarSettings="inlineToolbarSettings"
      :commandMenuSettings="commandMenuSettings"
      :imageBlockSettings="imageBlockSettings"
      :codeBlockSettings="codeBlockSettings"
    />
    
    <div class="info">
      <h3>Configuration Summary:</h3>
      <ul>
        <li>Drag & Drop: {{ dragEnabled ? 'Enabled' : 'Disabled' }}</li>
        <li>Read-Only: {{ isReadOnly ? 'Yes' : 'No' }}</li>
        <li>Persistence: Enabled</li>
        <li>Undo/Redo Stack: {{ undoRedoStack.limit }} levels</li>
        <li>Paste Cleanup: Configured</li>
        <li>Custom Keyboard Shortcuts: Configured</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);
const isReadOnly = ref(false);
const dragEnabled = ref(true);

const pasteCleanupSettings = ref({
  keepFormat: true,
  deniedTags: ['script', 'style', 'iframe', 'object'],
  deniedAttrs: ['onclick', 'onload', 'onerror'],
  plainText: false
});

const undoRedoStack = ref({
  enable: true,
  limit: 30
});

const keyConfig = ref({
  'bold': 'ctrl+b',
  'italic': 'ctrl+i',
  'underline': 'ctrl+u',
  'strikethrough': 'ctrl+shift+s',
  'undo': 'ctrl+z',
  'redo': 'ctrl+y',
  'save': 'ctrl+s',
  'heading1': 'ctrl+alt+1',
  'heading2': 'ctrl+alt+2',
  'heading3': 'ctrl+alt+3'
});

const blockActionMenuSettings = ref({
  enable: true,
  items: ['DragHandle', 'Delete', 'Duplicate', 'MoveUp', 'MoveDown', 'TurnInto'],
  position: 'left',
  showTooltip: true
});

const inlineToolbarSettings = ref({
  enable: true,
  items: [
    'Bold',
    'Italic',
    'Underline',
    'Strikethrough',
    'FontColor',
    'BackgroundColor',
    'Link',
    'InlineCode',
    'ClearFormat'
  ]
});

const commandMenuSettings = ref({
  enable: true,
  trigger: '/',
  items: [
    'Paragraph',
    'Heading1',
    'Heading2',
    'Heading3',
    'BulletList',
    'NumberedList',
    'Checklist',
    'Code',
    'Quote',
    'Divider',
    'Table',
    'Image'
  ]
});

const imageBlockSettings = ref({
  saveUrl: 'https://api.example.com/upload',
  path: '/images/',
  maxFileSize: 5000000,
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],
  resize: true
});

const codeBlockSettings = ref({
  languages: [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'TypeScript', value: 'typescript' },
    { name: 'Python', value: 'python' },
    { name: 'HTML', value: 'html' },
    { name: 'CSS', value: 'css' }
  ],
  defaultLanguage: 'javascript'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Heading1',
    content: [{ text: 'Fully Configured Editor', type: 'Text' }]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: 'This editor demonstrates all major configuration options including:',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'BulletList',
    content: [{ text: 'Drag and drop functionality', type: 'Text' }]
  },
  {
    id: 'block4',
    type: 'BulletList',
    content: [{ text: 'Paste cleanup with custom rules', type: 'Text' }]
  },
  {
    id: 'block5',
    type: 'BulletList',
    content: [{ text: 'Undo/redo with 30-level history', type: 'Text' }]
  },
  {
    id: 'block6',
    type: 'BulletList',
    content: [{ text: 'Custom keyboard shortcuts', type: 'Text' }]
  },
  {
    id: 'block7',
    type: 'BulletList',
    content: [{ text: 'State persistence', type: 'Text' }]
  },
  {
    id: 'block8',
    type: 'BulletList',
    content: [{ text: 'Read-only mode toggle', type: 'Text' }]
  }
]);

const toggleReadOnly = () => {
  isReadOnly.value = !isReadOnly.value;
};

const toggleDragDrop = () => {
  dragEnabled.value = !dragEnabled.value;
};

const handleUndo = () => {
  blockEditor.value.ej2Instances.executeToolbarAction('Undo');
};

const handleRedo = () => {
  blockEditor.value.ej2Instances.executeToolbarAction('Redo');
};

const exportData = () => {
  const json = blockEditor.value.ej2Instances.getDataAsJson();
  console.log('Exported JSON:', json);
  alert('Check console for exported data');
};
</script>

<style scoped>
.editor-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.controls button {
  margin-right: 10px;
  padding: 8px 16px;
  cursor: pointer;
}

.custom-blockeditor {
  border: 2px solid #ddd;
  border-radius: 8px;
}

.info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.info h3 {
  margin-top: 0;
}

.info ul {
  margin: 0;
  padding-left: 20px;
}
</style>
```

This comprehensive guide covers all major features and configuration options in the Vue BlockEditor using the Composition API.

# Editor Menus in Vue BlockEditor

## Table of Contents
- [Overview](#overview)
- [Slash Command Menu](#slash-command-menu)
  - [Basic Configuration](#basic-configuration)
  - [Custom Commands](#custom-commands)
  - [CommandMenuSettings](#commandmenusettings)
- [Context Menu](#context-menu)
  - [Basic Context Menu](#basic-context-menu)
  - [Custom Context Menu Items](#custom-context-menu-items)
  - [ContextMenuSettings](#contextmenusettings)
- [Block Action Menu](#block-action-menu)
  - [Basic Block Actions](#basic-block-actions)
  - [Custom Actions](#custom-actions)
  - [BlockActionMenuSettings](#blockactionmenusettings)
- [Inline Toolbar](#inline-toolbar)
  - [Basic Inline Toolbar](#basic-inline-toolbar)
  - [Custom Toolbar Items](#custom-toolbar-items)
  - [InlineToolbarSettings](#inlinetoolbarsettings)
- [Transform Settings](#transform-settings)
- [Font and Background Color Settings](#font-and-background-color-settings)
- [Menu Customization](#menu-customization)
- [Menu Events](#menu-events)
- [Complete Examples](#complete-examples)

## Overview

The BlockEditor provides four types of menus to enhance editing experience: Slash Command Menu (triggered by '/'), Context Menu (right-click), Block Action Menu (block-level actions), and Inline Toolbar (text selection formatting). Each menu can be customized to fit your application needs.

## Slash Command Menu

### Basic Configuration

Enable and configure the slash command menu:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :commandMenuSettings="commandMenuSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const commandMenuSettings = ref({
  enable: true,
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
    'Divider'
  ]
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Type / to open the command menu',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Custom Commands

Add custom commands to the slash menu:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :commandMenuSettings="commandMenuSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const commandMenuSettings = ref({
  enable: true,
  items: [
    { text: 'Paragraph', value: 'Paragraph', iconCss: 'e-icons e-paragraph' },
    { text: 'Heading 1', value: 'Heading1', iconCss: 'e-icons e-h1' },
    { text: 'Heading 2', value: 'Heading2', iconCss: 'e-icons e-h2' },
    { text: 'Heading 3', value: 'Heading3', iconCss: 'e-icons e-h3' },
    { text: 'Bullet List', value: 'BulletList', iconCss: 'e-icons e-bullet-list' },
    { text: 'Numbered List', value: 'NumberedList', iconCss: 'e-icons e-numbered-list' },
    { text: 'Checklist', value: 'Checklist', iconCss: 'e-icons e-checklist' },
    { text: 'Code Block', value: 'Code', iconCss: 'e-icons e-code' },
    { text: 'Quote', value: 'Quote', iconCss: 'e-icons e-quote' },
    { text: 'Divider', value: 'Divider', iconCss: 'e-icons e-divider' },
    { text: 'Table', value: 'Table', iconCss: 'e-icons e-table' },
    { text: 'Image', value: 'Image', iconCss: 'e-icons e-image' }
  ],
  popupWidth: '250px',
  popupHeight: '400px'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: []
  }
]);
</script>
```

### CommandMenuSettings

Complete configuration options:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :commandMenuSettings="commandMenuSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const commandMenuSettings = ref({
  enable: true,
  trigger: '/',
  items: [
    'Paragraph',
    'Heading1',
    'Heading2',
    'Heading3',
    'Heading4',
    'BulletList',
    'NumberedList',
    'Checklist',
    'Code',
    'Quote',
    'Callout',
    'Divider',
    'Table',
    'Image'
  ],
  popupWidth: '300px',
  popupHeight: '450px',
  showIcons: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: []
  }
]);
</script>
```

## Context Menu

### Basic Context Menu with Built-in items

-  **Undo/Redo**: Reverses or re-applies the last action.
-  **Cut/Copy/Paste**: Standard clipboard actions for selected content.
-  **Indent**: Increases or decreases the indent level of the selected block.
-  **Link**: Allows you to add or edit a hyperlink for the selected text. When a link is present, the context menu provides options such as `Open Link`, `Edit Link`, `Copy Link`, and `Remove Link`.
-  **Table**: Provides built-in table actions such as `Insert` and `Delete`. These options appear in the context menu when the cursor is focused within a table cell and the context menu is opened

Enable the context menu with default items:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :contextMenuSettings="contextMenuSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const contextMenuSettings = ref({
  enable: true,
  items: [
    'Cut',
    'Copy',
    'Paste',
    'Delete',
    'Duplicate',
    'TurnInto',
    'MoveUp',
    'MoveDown'
  ]
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Right-click to open context menu',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Custom Context Menu Items

Add custom items to the context menu:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :contextMenuSettings="contextMenuSettings"
      :contextMenuClick="onContextMenuClick"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const contextMenuSettings = ref({
  enable: true,
  items: [
    { text: 'Cut', id: 'cut', iconCss: 'e-icons e-cut' },
    { text: 'Copy', id: 'copy', iconCss: 'e-icons e-copy' },
    { text: 'Paste', id: 'paste', iconCss: 'e-icons e-paste' },
    { separator: true },
    { text: 'Delete Block', id: 'delete', iconCss: 'e-icons e-delete' },
    { text: 'Duplicate Block', id: 'duplicate', iconCss: 'e-icons e-duplicate' },
    { separator: true },
    { text: 'Move Up', id: 'moveUp', iconCss: 'e-icons e-arrow-up' },
    { text: 'Move Down', id: 'moveDown', iconCss: 'e-icons e-arrow-down' },
    { separator: true },
    { text: 'Export as HTML', id: 'exportHtml', iconCss: 'e-icons e-export' },
    { text: 'Export as JSON', id: 'exportJson', iconCss: 'e-icons e-export' }
  ]
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Right-click for custom context menu',
        type: 'Text'
      }
    ]
  }
]);

const onContextMenuClick = (args) => {
  console.log('Context menu clicked:', args.item.id);
  
  if (args.item.id === 'exportHtml') {
    const html = blockEditor.value.ej2Instances.getDataAsHtml();
    console.log('HTML:', html);
  } else if (args.item.id === 'exportJson') {
    const json = blockEditor.value.ej2Instances.getDataAsJson();
    console.log('JSON:', json);
  }
};
</script>
```

### ContextMenuSettings

Complete context menu configuration:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :contextMenuSettings="contextMenuSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const contextMenuSettings = ref({
  enable: true,
  items: [
    'Cut',
    'Copy',
    'Paste',
    'Delete',
    'Duplicate',
    'TurnInto',
    'MoveUp',
    'MoveDown',
    'SelectAll'
  ],
  showIcons: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Context menu with all options',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Block Action Menu

### Basic Block Actions

Enable the block action menu (displayed on hover):

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
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
  items: [
    'Delete',
    'Duplicate',
    'MoveUp',
    'MoveDown',
    'TurnInto'
  ]
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Hover over this block to see action menu',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Custom Actions

Add custom actions to the block action menu:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :blockActionMenuSettings="blockActionMenuSettings"
      :blockActionMenuClick="onBlockActionClick"
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
  items: [
    { text: 'Delete', id: 'delete', iconCss: 'e-icons e-delete', tooltip: 'Delete block' },
    { text: 'Duplicate', id: 'duplicate', iconCss: 'e-icons e-duplicate', tooltip: 'Duplicate block' },
    { text: 'Move Up', id: 'moveUp', iconCss: 'e-icons e-arrow-up', tooltip: 'Move up' },
    { text: 'Move Down', id: 'moveDown', iconCss: 'e-icons e-arrow-down', tooltip: 'Move down' },
    { text: 'Comment', id: 'comment', iconCss: 'e-icons e-comment', tooltip: 'Add comment' }
  ],
  showTooltip: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Custom block actions available on hover',
        type: 'Text'
      }
    ]
  }
]);

const onBlockActionClick = (args) => {
  console.log('Block action clicked:', args.item.id);
  
  if (args.item.id === 'comment') {
    alert('Add comment feature');
  }
};
</script>
```

### BlockActionMenuSettings

Complete block action menu configuration:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
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
  items: [
    'Delete',
    'Duplicate',
    'MoveUp',
    'MoveDown',
    'TurnInto',
    'DragHandle'
  ],
  position: 'left',
  showTooltip: true,
  showIcons: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Block action menu on the left',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Inline Toolbar

### Basic Inline Toolbar

Enable the inline toolbar for text formatting:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :inlineToolbarSettings="inlineToolbarSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const inlineToolbarSettings = ref({
  enable: true,
  items: [
    'Bold',
    'Italic',
    'Underline',
    'Strikethrough',
    'Link',
    'InlineCode'
  ]
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Select this text to see the inline toolbar',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### Custom Toolbar Items

Customize inline toolbar with additional formatting options:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :inlineToolbarSettings="inlineToolbarSettings"
      :fontColorSettings="fontColorSettings"
      :backgroundColorSettings="backgroundColorSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const inlineToolbarSettings = ref({
  enable: true,
  items: [
    'Bold',
    'Italic',
    'Underline',
    'Strikethrough',
    'Subscript',
    'Superscript',
    'FontColor',
    'BackgroundColor',
    'Link',
    'InlineCode',
    'ClearFormat'
  ]
});

const fontColorSettings = ref({
  colorCode: {
    'Standard': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4'],
    'Custom': ['#f44336', '#ff5722', '#ff9800', '#ffc107', '#ffeb3b', '#cddc39', '#8bc34a', '#4caf50']
  },
  modeSwitcher: true
});

const backgroundColorSettings = ref({
  colorCode: {
    'Standard': ['#ffffff', '#fce4ec', '#f3e5f5', '#ede7f6', '#e8eaf6', '#e3f2fd', '#e1f5fe', '#e0f7fa'],
    'Custom': ['#ffebee', '#fff3e0', '#fffde7', '#f1f8e9', '#e8f5e9', '#e0f2f1', '#e1bee7', '#f8bbd0']
  },
  modeSwitcher: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Select text to access comprehensive formatting options',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

### InlineToolbarSettings

Complete inline toolbar configuration:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :inlineToolbarSettings="inlineToolbarSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const inlineToolbarSettings = ref({
  enable: true,
  items: [
    'Bold',
    'Italic',
    'Underline',
    'Strikethrough',
    'Subscript',
    'Superscript',
    'FontColor',
    'BackgroundColor',
    'Link',
    'InlineCode',
    'ClearFormat'
  ],
  showTooltip: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Full inline toolbar with all formatting options',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Transform Settings

Configure block transformation options:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :transformSettings="transformSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const transformSettings = ref({
  items: [
    'Paragraph',
    'Heading1',
    'Heading2',
    'Heading3',
    'Heading4',
    'BulletList',
    'NumberedList',
    'Checklist',
    'Quote',
    'Code'
  ],
  popupWidth: '200px',
  popupHeight: '300px'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Use context menu or block action menu to transform this block',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Font and Background Color Settings

Configure color pickers for text formatting:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :inlineToolbarSettings="inlineToolbarSettings"
      :fontColorSettings="fontColorSettings"
      :backgroundColorSettings="backgroundColorSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const inlineToolbarSettings = ref({
  enable: true,
  items: ['Bold', 'Italic', 'FontColor', 'BackgroundColor']
});

const fontColorSettings = ref({
  colorCode: {
    'Basic Colors': [
      '#000000', '#FF0000', '#00FF00', '#0000FF',
      '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'
    ],
    'Theme Colors': [
      '#1a1a1a', '#e91e63', '#9c27b0', '#673ab7',
      '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4'
    ],
    'Custom Colors': [
      '#f44336', '#ff5722', '#ff9800', '#ffc107',
      '#ffeb3b', '#cddc39', '#8bc34a', '#4caf50'
    ]
  },
  modeSwitcher: true,
  showMoreColors: true
});

const backgroundColorSettings = ref({
  colorCode: {
    'Light Colors': [
      '#ffffff', '#f5f5f5', '#eeeeee', '#e0e0e0',
      '#bdbdbd', '#9e9e9e', '#757575', '#616161'
    ],
    'Pastel Colors': [
      '#ffebee', '#fce4ec', '#f3e5f5', '#ede7f6',
      '#e8eaf6', '#e3f2fd', '#e1f5fe', '#e0f7fa'
    ]
  },
  modeSwitcher: true,
  showMoreColors: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Select text and apply colors using the inline toolbar',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Menu Customization

Comprehensive menu customization example:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :commandMenuSettings="commandMenuSettings"
      :contextMenuSettings="contextMenuSettings"
      :blockActionMenuSettings="blockActionMenuSettings"
      :inlineToolbarSettings="inlineToolbarSettings"
      :height="600"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const commandMenuSettings = ref({
  enable: true,
  trigger: '/',
  items: ['Paragraph', 'Heading1', 'Heading2', 'BulletList', 'NumberedList', 'Code', 'Quote'],
  popupWidth: '300px'
});

const contextMenuSettings = ref({
  enable: true,
  items: ['Cut', 'Copy', 'Paste', 'Delete', 'Duplicate', 'TurnInto']
});

const blockActionMenuSettings = ref({
  enable: true,
  items: ['Delete', 'Duplicate', 'MoveUp', 'MoveDown', 'DragHandle'],
  position: 'left'
});

const inlineToolbarSettings = ref({
  enable: true,
  items: ['Bold', 'Italic', 'Underline', 'Link', 'InlineCode', 'ClearFormat']
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'All menus are customized and enabled',
        type: 'Text'
      }
    ]
  }
]);
</script>
```

## Menu Events

Handle menu-related events:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :commandMenuSettings="commandMenuSettings"
      :contextMenuSettings="contextMenuSettings"
      :commandMenuClick="onCommandMenuClick"
      :contextMenuClick="onContextMenuClick"
      :blockActionMenuClick="onBlockActionClick"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const commandMenuSettings = ref({
  enable: true
});

const contextMenuSettings = ref({
  enable: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Interact with menus to trigger events',
        type: 'Text'
      }
    ]
  }
]);

const onCommandMenuClick = (args) => {
  console.log('Command menu clicked:', args.item);
};

const onContextMenuClick = (args) => {
  console.log('Context menu clicked:', args.item);
};

const onBlockActionClick = (args) => {
  console.log('Block action clicked:', args.item);
};
</script>
```

## Complete Examples

### Comprehensive Menu Configuration

A complete example with all menu types fully configured:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :commandMenuSettings="commandMenuSettings"
      :contextMenuSettings="contextMenuSettings"
      :blockActionMenuSettings="blockActionMenuSettings"
      :inlineToolbarSettings="inlineToolbarSettings"
      :transformSettings="transformSettings"
      :fontColorSettings="fontColorSettings"
      :backgroundColorSettings="backgroundColorSettings"
      :commandMenuClick="onCommandMenuClick"
      :contextMenuClick="onContextMenuClick"
      :height="700"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const commandMenuSettings = ref({
  enable: true,
  trigger: '/',
  items: [
    'Paragraph',
    'Heading1',
    'Heading2',
    'Heading3',
    'Heading4',
    'BulletList',
    'NumberedList',
    'Checklist',
    'Code',
    'Quote',
    'Callout',
    'Divider',
    'Table',
    'Image'
  ],
  popupWidth: '300px',
  popupHeight: '450px'
});

const contextMenuSettings = ref({
  enable: true,
  items: [
    'Cut',
    'Copy',
    'Paste',
    'Delete',
    'Duplicate',
    'TurnInto',
    'MoveUp',
    'MoveDown',
    'SelectAll'
  ]
});

const blockActionMenuSettings = ref({
  enable: true,
  items: ['Delete', 'Duplicate', 'MoveUp', 'MoveDown', 'TurnInto', 'DragHandle'],
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
    'Subscript',
    'Superscript',
    'FontColor',
    'BackgroundColor',
    'Link',
    'InlineCode',
    'ClearFormat'
  ],
  showTooltip: true
});

const transformSettings = ref({
  items: [
    'Paragraph',
    'Heading1',
    'Heading2',
    'Heading3',
    'BulletList',
    'NumberedList',
    'Checklist',
    'Quote',
    'Code'
  ],
  popupWidth: '200px',
  popupHeight: '300px'
});

const fontColorSettings = ref({
  colorCode: {
    'Standard': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'],
    'Custom': ['#f44336', '#ff9800', '#ffc107', '#8bc34a', '#4caf50', '#009688']
  },
  modeSwitcher: true
});

const backgroundColorSettings = ref({
  colorCode: {
    'Standard': ['#ffffff', '#fce4ec', '#f3e5f5', '#ede7f6', '#e8eaf6', '#e3f2fd'],
    'Custom': ['#ffebee', '#fff3e0', '#fffde7', '#f1f8e9', '#e8f5e9', '#e0f2f1']
  },
  modeSwitcher: true
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Heading1',
    content: [
      {
        text: 'Complete Menu System',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [
      {
        text: 'Type / for slash command menu',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block3',
    type: 'Paragraph',
    content: [
      {
        text: 'Right-click for context menu',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block4',
    type: 'Paragraph',
    content: [
      {
        text: 'Hover for block action menu',
        type: 'Text'
      }
    ]
  },
  {
    id: 'block5',
    type: 'Paragraph',
    content: [
      {
        text: 'Select text for inline toolbar',
        type: 'Text'
      }
    ]
  }
]);

const onCommandMenuClick = (args) => {
  console.log('Command menu:', args.item);
};

const onContextMenuClick = (args) => {
  console.log('Context menu:', args.item);
};
</script>
```

This comprehensive guide covers all four menu types (Slash Command, Context, Block Action, and Inline Toolbar) in the Vue BlockEditor using the Composition API.

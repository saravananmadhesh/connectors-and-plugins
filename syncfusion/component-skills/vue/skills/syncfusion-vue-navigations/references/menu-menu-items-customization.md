# Menu Items Customization

## Table of Contents
1. [Item Structure](#item-structure)
2. [Icons and Visual Elements](#icons-and-visual-elements)
3. [Item States](#item-states)
4. [Item Hierarchy](#item-hierarchy)
5. [Dynamic Item Management](#dynamic-item-management)
6. [Separators and Dividers](#separators-and-dividers)
7. [Custom Content](#custom-content)

## Item Structure

### Basic MenuItem Properties

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    // Core properties
    text: 'File',                    // Display text
    id: 'file-menu',                // Unique identifier
    
    // Visual properties
    iconCss: 'e-icons e-folder',    // Icon CSS class
    
    // Navigation
    url: '/file-operations',        // Navigation URL
    
    // State properties
    disabled: false,                // Disabled state
    
    // HTML attributes
    htmlAttributes: {
      title: 'File Operations',
      'data-test': 'file-menu'
    },
    
    // Child items
    items: [
      { text: 'New' },
      { text: 'Open' }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

## Icons and Visual Elements

### Using Syncfusion Icons

```vue
<script setup>
import { ref } from 'vue';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-icons/styles/material.css';

const items = ref([
  {
    text: 'File',
    iconCss: 'e-icons e-folder-open',
    items: [
      { text: 'New', iconCss: 'e-icons e-new' },
      { text: 'Open', iconCss: 'e-icons e-open' },
      { text: 'Save', iconCss: 'e-icons e-save' },
      { text: 'Save As', iconCss: 'e-icons e-save-as' }
    ]
  },
  {
    text: 'Edit',
    iconCss: 'e-icons e-edit',
    items: [
      { text: 'Cut', iconCss: 'e-icons e-cut' },
      { text: 'Copy', iconCss: 'e-icons e-copy' },
      { text: 'Paste', iconCss: 'e-icons e-paste' },
      { text: 'Delete', iconCss: 'e-icons e-delete' }
    ]
  },
  {
    text: 'View',
    iconCss: 'e-icons e-view',
    items: [
      { text: 'Zoom In', iconCss: 'e-icons e-plus' },
      { text: 'Zoom Out', iconCss: 'e-icons e-minus' },
      { text: 'Reset Zoom', iconCss: 'e-icons e-reload' }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>

<style scoped>
:deep(.e-menu-item) {
  padding: 10px;
}
</style>
```

### Available Icon Categories

**File Operations:**
- `e-new` - New file
- `e-open` - Open file
- `e-save` - Save file
- `e-print` - Print
- `e-export` - Export

**Editing:**
- `e-cut` - Cut
- `e-copy` - Copy
- `e-paste` - Paste
- `e-edit` - Edit
- `e-delete` - Delete

**Navigation:**
- `e-previous` - Previous
- `e-next` - Next
- `e-home` - Home
- `e-back` - Back
- `e-forward` - Forward

**Interface:**
- `e-menu` - Menu
- `e-settings` - Settings
- `e-search` - Search
- `e-upload` - Upload
- `e-download` - Download

### Custom Icons with Font Awesome

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'Social',
    iconCss: 'fas fa-share-alt',
    items: [
      { text: 'Facebook', iconCss: 'fab fa-facebook-f' },
      { text: 'Twitter', iconCss: 'fab fa-twitter' },
      { text: 'GitHub', iconCss: 'fab fa-github' }
    ]
  },
  {
    text: 'Tools',
    iconCss: 'fas fa-tools',
    items: [
      { text: 'Settings', iconCss: 'fas fa-cog' },
      { text: 'Help', iconCss: 'fas fa-question-circle' }
    ]
  }
]);
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <ejs-menu :items="items"></ejs-menu>
</template>
```

### Custom SVG Icons

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'Custom',
    htmlAttributes: {
      'data-icon': 'custom-icon'
    },
    items: []
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>

<style scoped>
:deep([data-icon="custom-icon"]::before) {
  content: '✓';
  margin-right: 8px;
}
</style>
```

## Item States

### Disabled Items

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'File',
    items: [
      { text: 'New', disabled: false },
      { text: 'Open', disabled: false },
      { text: 'Undo', disabled: true }  // Grayed out, not clickable
    ]
  }
]);

const enableUndo = () => {
  const undoItem = items.value[0].items.find(i => i.text === 'Undo');
  if (undoItem) undoItem.disabled = false;
};
</script>

<template>
  <div>
    <button @click="enableUndo">Enable Undo</button>
    <ejs-menu :items="items"></ejs-menu>
  </div>
</template>

<style scoped>
:deep(.e-menu-item.e-disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

### Hidden Items

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Advanced Options', hidden: true },
      { text: 'Exit' }
    ]
  }
]);

const toggleAdvanced = () => {
  const advancedItem = items.value[0].items.find(
    i => i.text === 'Advanced Options'
  );
  if (advancedItem) {
    advancedItem.hidden = !advancedItem.hidden;
  }
};
</script>

<template>
  <div>
    <button @click="toggleAdvanced">Toggle Advanced</button>
    <ejs-menu :items="items"></ejs-menu>
  </div>
</template>
```

### Selected/Active State

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'View', id: 'view', items: [
    { text: 'Zoom In', id: 'zoom-in' },
    { text: 'Normal', id: 'normal', selected: true },
    { text: 'Zoom Out', id: 'zoom-out' }
  ]}
]);

const handleSelect = (args) => {
  // Clear all selected states
  const clearSelected = (items) => {
    items.forEach(item => {
      item.selected = false;
      if (item.items) clearSelected(item.items);
    });
  };
  
  clearSelected(items.value);
  
  // Set selected on clicked item
  args.item.selected = true;
};
</script>

<template>
  <ejs-menu
    :items="items"
    @select="handleSelect"
  ></ejs-menu>
</template>

<style scoped>
:deep(.e-menu-item[aria-selected="true"]) {
  background-color: #007bff;
  color: white;
}
</style>
```

## Item Hierarchy

### Single Level

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { text: 'New' },
  { text: 'Open' },
  { text: 'Save' },
  { text: 'Exit' }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

### Multiple Levels

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'File',
    items: [
      {
        text: 'New',
        items: [
          { text: 'Project' },
          { text: 'Document' }
        ]
      },
      { text: 'Open' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Cut' },
      { text: 'Copy' }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

### Nested Groups

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'Format',
    items: [
      {
        text: 'Text',
        items: [
          { text: 'Bold' },
          { text: 'Italic' },
          { text: 'Underline' },
          { text: 'Strikethrough' }
        ]
      },
      {
        text: 'Paragraph',
        items: [
          { text: 'Left Align' },
          { text: 'Center' },
          { text: 'Right Align' },
          { text: 'Justify' }
        ]
      },
      {
        text: 'List',
        items: [
          { text: 'Bullet Points' },
          { text: 'Numbered List' }
        ]
      }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

## Dynamic Item Management

### Add Items

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File', id: 'file', items: [] },
  { text: 'Edit', id: 'edit', items: [] }
]);

const addItemToMenu = (parentId, newItem) => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.insertAfter([newItem], parentId);
};

const handleAddRecent = () => {
  const newItem = {
    text: 'Recent File.txt',
    id: 'recent_' + Date.now()
  };
  addItemToMenu('file', newItem);
};
</script>

<template>
  <div>
    <button @click="handleAddRecent">Add Recent File</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

### Remove Items

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File', id: 'file', items: [
    { text: 'New', id: 'new' },
    { text: 'Old Item', id: 'old' }
  ]}
]);

const removeItem = (itemId) => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.removeItems([itemId]);
};
</script>

<template>
  <div>
    <button @click="removeItem('old')">Remove Old Item</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

### Update Items

```vue
<script setup>
import { ref } from 'vue';

const menuRef = ref(null);
const items = ref([
  { text: 'File', id: 'file' },
  { text: 'Edit', id: 'edit' }
]);

const updateItem = (itemId, newProperties) => {
  const menuInstance = menuRef.value.ej2_instances[0];
  menuInstance.setItem(newProperties, itemId);
};

const renameFile = () => {
  updateItem('file', {
    text: 'File Manager',
    iconCss: 'e-icons e-folder-open'
  });
};
</script>

<template>
  <div>
    <button @click="renameFile">Rename File Menu</button>
    <ejs-menu ref="menuRef" :items="items"></ejs-menu>
  </div>
</template>
```

## Separators and Dividers

### Adding Separators

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' },
      { separator: true },  // Horizontal line
      { text: 'Recent' },
      { separator: true },
      { text: 'Exit' }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

### Conditional Separators

```vue
<script setup>
import { ref } from 'vue';

const isAuthenticated = ref(false);

const items = ref([
  {
    text: 'User',
    items: [
      { text: 'Profile' },
      { text: 'Settings' },
      {
        separator: true,
        hidden: !isAuthenticated.value
      },
      {
        text: 'Logout',
        hidden: !isAuthenticated.value
      }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

## Custom Content

### HTML Content in Items

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: '<strong>File</strong>',
    items: [
      { text: 'New <em>(Ctrl+N)</em>' },
      { text: 'Open <em>(Ctrl+O)</em>' }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>
```

### Items with Badges

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'Notifications',
    items: [
      { text: 'Messages <span class="badge">5</span>' },
      { text: 'Alerts <span class="badge">2</span>' }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>

<style scoped>
:deep(.badge) {
  background-color: #dc3545;
  color: white;
  border-radius: 12px;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 8px;
}
</style>
```

### Rich Text Items

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  {
    text: 'Actions',
    items: [
      {
        text: 'Print',
        iconCss: 'e-icons e-print',
        htmlAttributes: {
          'title': 'Print document (Ctrl+P)',
          'data-shortcut': 'Ctrl+P'
        }
      },
      {
        text: 'Export',
        iconCss: 'e-icons e-export',
        htmlAttributes: {
          'title': 'Export as PDF'
        }
      }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>

<style scoped>
:deep(.e-menu-item[data-shortcut]) {
  position: relative;
}

:deep(.e-menu-item[data-shortcut]::after) {
  content: attr(data-shortcut);
  position: absolute;
  right: 10px;
  color: #999;
  font-size: 12px;
}
</style>
```

## Complete Customization Example

```vue
<script setup>
import { ref } from 'vue';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-icons/styles/material.css';

const items = ref([
  {
    text: 'File',
    id: 'file',
    iconCss: 'e-icons e-folder',
    items: [
      { text: 'New', id: 'new', iconCss: 'e-icons e-new' },
      { text: 'Open', id: 'open', iconCss: 'e-icons e-open' },
      { text: 'Save', id: 'save', iconCss: 'e-icons e-save' },
      { separator: true },
      { text: 'Recent', id: 'recent' },
      { separator: true },
      { text: 'Exit', id: 'exit', iconCss: 'e-icons e-exit' }
    ]
  },
  {
    text: 'Edit',
    id: 'edit',
    iconCss: 'e-icons e-edit',
    items: [
      { text: 'Undo', id: 'undo', iconCss: 'e-icons e-undo', disabled: true },
      { text: 'Redo', id: 'redo', iconCss: 'e-icons e-redo', disabled: true },
      { separator: true },
      { text: 'Cut', id: 'cut', iconCss: 'e-icons e-cut' },
      { text: 'Copy', id: 'copy', iconCss: 'e-icons e-copy' },
      { text: 'Paste', id: 'paste', iconCss: 'e-icons e-paste' }
    ]
  },
  {
    text: 'Format',
    id: 'format',
    iconCss: 'e-icons e-format',
    items: [
      {
        text: 'Text',
        items: [
          { text: 'Bold', id: 'bold' },
          { text: 'Italic', id: 'italic' },
          { text: 'Underline', id: 'underline' }
        ]
      },
      {
        text: 'Paragraph',
        items: [
          { text: 'Left Align' },
          { text: 'Center' },
          { text: 'Right Align' }
        ]
      }
    ]
  }
]);
</script>

<template>
  <ejs-menu :items="items"></ejs-menu>
</template>

<style scoped>
:deep(.e-menu-item.e-disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

:deep(.e-menu-item) {
  padding: 8px 12px;
}
</style>
```

## Related Topics

- [Properties and Configuration](./properties-and-configuration.md) - MenuItem properties
- [Methods and API](./methods-api.md) - Item manipulation methods
- [Events and Callbacks](./events-and-callbacks.md) - Item event handling

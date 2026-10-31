# File Menu in Vue Ribbon Component

## Table of Contents
- [Overview](#overview)
- [Enabling File Menu](#enabling-file-menu)
- [Adding Menu Items](#adding-menu-items)
- [Submenu Support](#submenu-support)
- [Item Icons](#item-icons)
- [Show Item on Click](#show-item-on-click)
- [Custom File Menu Text](#custom-file-menu-text)
- [File Menu Events](#file-menu-events)
- [Complete Example](#complete-example)

## Overview

The File Menu provides a traditional application-level menu similar to Microsoft Office applications. It appears at the left end of the ribbon and contains commands like New, Open, Save, and Print.

**Key Features:**
- Traditional menu appearance before tabs
- Support for nested submenus
- Item icons and separators
- Custom menu item text
- Events for open, close, and item selection

## Enabling File Menu

Enable the file menu using the `RibbonFileMenu` module.

### Basic File Menu

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <!-- Tab content -->
      </e-ribbon-tab>
    </e-ribbon-tabs>
    <e-ribbon-file-menu :menuItems="fileMenuItems"></e-ribbon-file-menu>
  </ejs-ribbon>
</template>

<script setup>
import { provide } from 'vue';
import { RibbonComponent as EjsRibbon, RibbonFileMenu,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonFileMenuDirective as ERibbonFileMenu
} from '@syncfusion/ej2-vue-ribbon';

// Inject FileMenu module
provide('ribbon', [RibbonFileMenu]);

const fileMenuItems = [
  { text: 'New', iconCss: 'e-icons e-file-new' },
  { text: 'Open', iconCss: 'e-icons e-folder-open' },
  { text: 'Save', iconCss: 'e-icons e-save' }
];
</script>
```

## Adding Menu Items

Menu items are configured using the `MenuItemModel` structure.

### Simple Menu Items

```vue
<script setup>
import { provide } from 'vue';
import { RibbonFileMenu } from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonFileMenu]);

const fileMenuItems = [
  { text: 'New', iconCss: 'e-icons e-file-new' },
  { text: 'Open', iconCss: 'e-icons e-folder-open' },
  { text: 'Rename', iconCss: 'e-icons e-rename' },
  { separator: true },
  { text: 'Save', iconCss: 'e-icons e-save' },
  { text: 'Close', iconCss: 'e-icons e-close' }
];
</script>
```

### Menu Item Properties

```javascript
const menuItem = {
  text: 'Menu Text',          // Display text
  id: 'uniqueId',             // Unique identifier
  iconCss: 'e-icons e-icon',  // Icon CSS class
  separator: false,           // Show separator line
  items: []                   // Submenu items
};
```

### Separators

Add separators to visually group menu items:

```vue
<script setup>
const fileMenuItems = [
  { text: 'New', iconCss: 'e-icons e-file-new' },
  { text: 'Open', iconCss: 'e-icons e-folder-open' },
  { separator: true },  // Separator line
  { text: 'Save', iconCss: 'e-icons e-save' },
  { text: 'Save As', iconCss: 'e-icons e-save' }
];
</script>
```

## Submenu Support

Create hierarchical menus with nested items.

### Single-Level Submenu

```vue
<script setup>
const fileMenuItems = [
  { text: 'New', iconCss: 'e-icons e-file-new' },
  { 
    text: 'Open', 
    iconCss: 'e-icons e-folder-open',
    items: [
      { text: 'Recent Documents' },
      { text: 'From OneDrive' },
      { text: 'From SharePoint' }
    ]
  },
  { text: 'Save', iconCss: 'e-icons e-save' }
];
</script>
```

### Multi-Level Submenu

```vue
<script setup>
const fileMenuItems = [
  { text: 'New', iconCss: 'e-icons e-file-new' },
  { 
    text: 'Open', 
    iconCss: 'e-icons e-folder-open',
    items: [
      { text: 'Recent Documents' },
      { 
        text: 'Cloud Storage',
        items: [
          { text: 'OneDrive' },
          { text: 'SharePoint' },
          { text: 'Dropbox' }
        ]
      },
      { text: 'This PC' }
    ]
  },
  { text: 'Save', iconCss: 'e-icons e-save' }
];
</script>
```

## Item Icons

Add icons to menu items using Syncfusion icon classes or custom CSS.

### Built-in Icons

```vue
<script setup>
const fileMenuItems = [
  { text: 'New', iconCss: 'e-icons e-file-new' },
  { text: 'Open', iconCss: 'e-icons e-folder-open' },
  { text: 'Save', iconCss: 'e-icons e-save' },
  { text: 'Print', iconCss: 'e-icons e-print' },
  { text: 'Cut', iconCss: 'e-icons e-cut' },
  { text: 'Copy', iconCss: 'e-icons e-copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste' }
];
</script>
```

### Custom Icons

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-file-menu :menuItems="fileMenuItems"></e-ribbon-file-menu>
  </ejs-ribbon>
</template>

<script setup>
const fileMenuItems = [
  { text: 'Export', iconCss: 'custom-icon export-icon' },
  { text: 'Import', iconCss: 'custom-icon import-icon' }
];
</script>

<style>
.custom-icon {
  width: 16px;
  height: 16px;
  background-size: contain;
  display: inline-block;
}

.export-icon {
  background-image: url('path/to/export-icon.svg');
}

.import-icon {
  background-image: url('path/to/import-icon.svg');
}
</style>
```

## Show Item on Click

The `showItemOnClick` property determines when submenus open.

### Hover to Open (Default)

By default, submenus open on hover:

```vue
<e-ribbon-file-menu :menuItems="fileMenuItems"></e-ribbon-file-menu>
```

### Click to Open

Require click to open submenus:

```vue
<e-ribbon-file-menu :menuItems="fileMenuItems" :showItemOnClick="true"></e-ribbon-file-menu>

<script setup>
const fileMenuItems = [
  { 
    text: 'Open', 
    items: [
      { text: 'Recent Documents' },
      { text: 'From Cloud' }
    ]
  }
];
</script>
```

**Behavior:**
- `showItemOnClick: false` (default): Hover opens submenus
- `showItemOnClick: true`: Click required to open submenus

## Custom File Menu Text

Customize the File Menu button text.

### Custom Text

```vue
<e-ribbon-file-menu text="Menu" :menuItems="fileMenuItems"></e-ribbon-file-menu>
```

### Localized Text

```vue
<e-ribbon-file-menu text="Archivo" :menuItems="fileMenuItems"></e-ribbon-file-menu>
```

### Icon-Only File Menu

Leave text empty for icon-only display:

```vue
<e-ribbon-file-menu text="" :menuItems="fileMenuItems"></e-ribbon-file-menu>
```

## File Menu Events

Handle file menu interactions with events.

### Item Select Event

Triggered when a menu item is clicked:

```vue
<e-ribbon-file-menu :menuItems="fileMenuItems" @select="onItemSelect"></e-ribbon-file-menu>

<script setup>
const fileMenuItems = [
  { text: 'New', iconCss: 'e-icons e-file-new', id: 'new' },
  { text: 'Open', iconCss: 'e-icons e-folder-open', id: 'open' },
  { text: 'Save', iconCss: 'e-icons e-save', id: 'save' }
];

const onItemSelect = (args) => {
  console.log('Selected item:', args.item.text);
  console.log('Item ID:', args.item.id);
  
  if (args.item.id === 'new') {
    createNewDocument();
  } else if (args.item.id === 'open') {
    openDocument();
  } else if (args.item.id === 'save') {
    saveDocument();
  }
};

const createNewDocument = () => {
  console.log('Creating new document...');
};

const openDocument = () => {
  console.log('Opening document...');
};

const saveDocument = () => {
  console.log('Saving document...');
};
</script>
```

### Before Open Event

Triggered before the file menu opens:

```vue
<e-ribbon-file-menu :menuItems="fileMenuItems" @beforeOpen="onBeforeOpen"></e-ribbon-file-menu>

<script setup>
const onBeforeOpen = (args) => {
  console.log('File menu opening...');
  
  // Cancel opening if needed
  // args.cancel = true;
  
  // Update menu items dynamically
  checkRecentFiles();
};

const checkRecentFiles = () => {
  console.log('Checking for recent files...');
};
</script>
```

### Before Close Event

Triggered before the file menu closes:

```vue
<e-ribbon-file-menu :menuItems="fileMenuItems" @beforeClose="onBeforeClose"></e-ribbon-file-menu>

<script setup>
const onBeforeClose = (args) => {
  console.log('File menu closing...');
  
  // Cancel closing if needed
  // args.cancel = true;
};
</script>
```

### Open and Close Events

Triggered after the file menu opens or closes:

```vue
<e-ribbon-file-menu 
  :menuItems="fileMenuItems"
  @open="onOpen"
  @close="onClose">
</e-ribbon-file-menu>

<script setup>
const onOpen = () => {
  console.log('File menu opened');
};

const onClose = () => {
  console.log('File menu closed');
};
</script>
```

## Complete Example

Full example demonstrating all file menu features:

```vue
<template>
  <div>
    <ejs-ribbon ref="ribbonRef">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" :buttonSettings="cutButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" :buttonSettings="copyButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" :buttonSettings="pasteButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
        
        <e-ribbon-tab header="Insert">
          <e-ribbon-groups>
            <e-ribbon-group header="Tables">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" :buttonSettings="tableButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
      
      <e-ribbon-file-menu 
        text="File"
        :menuItems="fileMenuItems"
        :showItemOnClick="false"
        @select="onItemSelect"
        @open="onMenuOpen"
        @close="onMenuClose"
        @beforeOpen="onBeforeOpen">
      </e-ribbon-file-menu>
    </ejs-ribbon>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { RibbonComponent as EjsRibbon, RibbonFileMenu,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups, RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections, RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems, RibbonItemDirective as ERibbonItem,
         RibbonFileMenuDirective as ERibbonFileMenu
} from '@syncfusion/ej2-vue-ribbon';

// Inject FileMenu module
provide('ribbon', [RibbonFileMenu]);

const ribbonRef = ref(null);

const fileMenuItems = [
  { text: 'New', iconCss: 'e-icons e-file-new', id: 'new' },
  { 
    text: 'Open', 
    iconCss: 'e-icons e-folder-open',
    id: 'open',
    items: [
      { text: 'Recent Documents', id: 'recent' },
      { text: 'From OneDrive', id: 'onedrive' },
      { text: 'From This PC', id: 'thispc' }
    ]
  },
  { separator: true },
  { text: 'Save', iconCss: 'e-icons e-save', id: 'save' },
  { text: 'Save As', iconCss: 'e-icons e-save', id: 'saveas' },
  { separator: true },
  { text: 'Print', iconCss: 'e-icons e-print', id: 'print' },
  { 
    text: 'Share', 
    iconCss: 'e-icons e-share',
    id: 'share',
    items: [
      { text: 'Share with People', id: 'sharepeople' },
      { text: 'Email', id: 'email' },
      { text: 'Present Online', id: 'presentonline' }
    ]
  },
  { separator: true },
  { text: 'Options', iconCss: 'e-icons e-settings', id: 'options' },
  { text: 'Exit', iconCss: 'e-icons e-close', id: 'exit' }
];

const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
const copyButton = { iconCss: 'e-icons e-copy', content: 'Copy' };
const pasteButton = { iconCss: 'e-icons e-paste', content: 'Paste' };
const tableButton = { iconCss: 'e-icons e-table', content: 'Table' };

const onItemSelect = (args) => {
  console.log('Menu item selected:', args.item.text);
  
  switch (args.item.id) {
    case 'new':
      console.log('Creating new document');
      break;
    case 'open':
      console.log('Opening document');
      break;
    case 'save':
      console.log('Saving document');
      break;
    case 'print':
      console.log('Printing document');
      break;
    case 'exit':
      console.log('Exiting application');
      break;
  }
};

const onBeforeOpen = (args) => {
  console.log('File menu about to open');
  // Load recent files dynamically
};

const onMenuOpen = () => {
  console.log('File menu opened');
};

const onMenuClose = () => {
  console.log('File menu closed');
};
</script>
```

This comprehensive file menu implementation provides traditional application-level commands with full event handling and customization options.

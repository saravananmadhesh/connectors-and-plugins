---
name: syncfusion-vue-ribbon
description: "Implement the Syncfusion Vue Ribbon component for creating Office-style command interfaces with tabs, groups, and items. ALWAYS use this skill when user mentions: ribbon control, ribbon UI, Office-style interface, command bar with tabs, tabbed toolbar, ribbon menu, grouped commands, MS Office interface, ribbon navigation, ribbon items (buttons, dropdowns, galleries), file menu, backstage view, contextual tabs, ribbon layouts (classic/simplified), collapsible groups, ribbon gallery, or needs Office-like application UI immediately."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Vue Ribbon Component

The Syncfusion Vue Ribbon component provides a modern, Office-style command interface that organizes application commands into a hierarchy of tabs, groups, and collections. It supports multiple layouts, rich item types, dynamic resizing, and advanced features like file menus, backstage views, and contextual tabs.

## Component Overview

**Key Features:**
- **Hierarchical Structure:** Tabs → Groups → Collections → Items
- **8 Built-in Item Types:** Button, CheckBox, DropDown, SplitButton, ComboBox, ColorPicker, GroupButton, Gallery
- **Two Layout Modes:** Classic (multi-row) and Simplified (single-row)
- **Advanced Menus:** File Menu and Backstage View
- **Contextual Tabs:** Dynamic tabs based on context
- **Responsive Behavior:** Automatic resizing with overflow handling
- **Rich Customization:** Themes, RTL, localization, templates

## Documentation and Navigation Guide

### Getting Started and Setup
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installing the `@syncfusion/ej2-vue-ribbon` package
- Importing and registering Ribbon components and directives
- Setting up CSS theme imports
- Module injection for advanced features (FileMenu, ColorPicker, etc.)
- Creating a basic ribbon with tabs, groups, and items
- Minimal working example
- First render initialization

### Ribbon Structure: Tabs, Groups, and Collections
📄 **Read:** [references/tabs-and-groups.md](references/tabs-and-groups.md)
- Understanding the ribbon hierarchy (Tabs → Groups → Collections → Items)
- Adding tabs with the `header` property
- Creating groups and configuring headers
- Group orientation (Row vs Column)
- Group icons and launcher icons
- Collapsible groups and priority order
- Group overflow behavior
- Collections within groups

### Built-in Item Types
📄 **Read:** [references/ribbon-items.md](references/ribbon-items.md)
- Overview of 8 built-in item types
- **Button items:** Toggle buttons, icons, content
- **CheckBox items:** Checked state, label positioning
- **DropDown items:** Target, popup, customization
- **SplitButton items:** Primary action with dropdown
- **ComboBox items:** Filtering, sorting, data binding
- **ColorPicker items:** Value, palette configuration
- **GroupButton items:** Single/multiple selection modes
- **Gallery items:** Basic gallery integration (see gallery-items.md for details)
- Custom template items with `itemTemplate`
- Display options (Classic, Simplified, Overflow)
- Enabling/disabling items
- Item sizing with `allowedSizes`

### Layouts and Responsive Behavior
📄 **Read:** [references/layouts-and-resizing.md](references/layouts-and-resizing.md)
- Classic layout (multi-row format)
- Simplified layout (single-row format)
- Setting `activeLayout` property
- Item sizes: Large, Medium, Small
- `allowedSizes` and automatic resizing
- Group orientation and constraints
- Minimized state with `isMinimized`
- Layout switcher visibility
- Overflow popup handling
- Group overflow with `enableGroupOverflow`

### File Menu
📄 **Read:** [references/file-menu.md](references/file-menu.md)
- Enabling file menu with `fileMenu` property
- Menu visibility configuration
- Adding menu items with icons
- Submenu support
- `showItemOnClick` behavior
- Custom header text
- File menu events (open, close, itemSelect)
- Module injection requirements

### Backstage View
📄 **Read:** [references/backstage.md](references/backstage.md)
- Backstage view overview and use cases
- Configuring `backStageMenu` property
- Adding backstage items with content
- Content templates for items
- Footer items with `isFooter`
- Back button customization
- Width, height, and header settings
- `autoClose` behavior
- Backstage events

### Contextual Tabs
📄 **Read:** [references/contextual-tabs.md](references/contextual-tabs.md)
- When to use contextual tabs
- Adding contextual tabs with directives
- Setting `visible` property
- Selecting tabs with `isSelected`
- Dynamic management with `showTab` and `hideTab` methods
- Use cases: table tools, image tools, chart tools
- Integration with user interactions

### Gallery Items
📄 **Read:** [references/gallery-items.md](references/gallery-items.md)
- Gallery feature overview
- `RibbonGallerySettingsModel` configuration
- Organizing items into groups
- Adding gallery items with content and icons
- Item count and height settings
- Popup dimensions (`popupHeight`, `popupWidth`)
- Gallery selection events
- Item orientation (Row vs Column)
- Custom gallery templates

### Events and Methods
📄 **Read:** [references/events-and-methods.md](references/events-and-methods.md)
- Component events overview
- Tab events (`tabSelected`, `tabSelecting`)
- Launcher icon click event
- Overflow popup events
- Expand/collapse events
- Layout switched event
- Methods for tabs: `addTab`, `removeTab`, `updateTab`, `selectTab`
- Methods for groups: `addGroup`, `removeGroup`, `updateGroup`
- Methods for items: `addItem`, `removeItem`, `updateItem`, `getItem`
- Item state methods: `enableItem`, `disableItem`, `showItem`, `hideItem`
- `refreshLayout` method

### Customization and Styling
📄 **Read:** [references/customization.md](references/customization.md)
- CSS class customization with `cssClass`
- Custom icon configuration
- Theme integration
- RTL support with `enableRtl`
- Persistence with `enablePersistence`
- Localization and `locale` property
- Help pane template (`helpPaneTemplate`)
- Tab animation settings
- KeyTips support (`enableKeyTips`)
- Tooltips for items
- Width customization
- Custom styling examples

## Quick Start Example

```vue
<template>
  <ejs-ribbon :fileMenu="fileSettings">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <!-- Clipboard Group -->
          <e-ribbon-group header="Clipboard" groupIconCss="e-icons e-paste" :showLauncherIcon="true">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="SplitButton" :allowedSizes="largeSize" :splitButtonSettings="pasteSettings">
                  </e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :buttonSettings="cutButton"></e-ribbon-item>
                  <e-ribbon-item type="Button" :buttonSettings="copyButton"></e-ribbon-item>
                  <e-ribbon-item type="Button" :buttonSettings="formatButton"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>

          <!-- Font Group -->
          <e-ribbon-group header="Font" orientation="Row" :enableGroupOverflow="true">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="ComboBox" :comboBoxSettings="fontOptions"></e-ribbon-item>
                  <e-ribbon-item type="ComboBox" :comboBoxSettings="sizeOptions"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :allowedSizes="smallSize" :buttonSettings="boldButton"></e-ribbon-item>
                  <e-ribbon-item type="Button" :allowedSizes="smallSize" :buttonSettings="italicButton"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { RibbonComponent as EjsRibbon, RibbonItemSize, RibbonFileMenu,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups, RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections, RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems, RibbonItemDirective as ERibbonItem 
} from "@syncfusion/ej2-vue-ribbon";
import { provide } from "vue";

// Inject required modules
provide('ribbon', [RibbonFileMenu]);

// Define sizes
const largeSize = RibbonItemSize.Large;
const smallSize = RibbonItemSize.Small;

// File menu configuration
const fileSettings = {
  visible: true,
  menuItems: [
    { text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "open" },
    { text: "Save", iconCss: "e-icons e-save", id: "save" }
  ]
};

// Button settings
const pasteSettings = { 
  iconCss: "e-icons e-paste", 
  content: "Paste",
  items: [{ text: "Keep Source Format" }, { text: "Merge format" }, { text: "Keep text only" }]
};
const cutButton = { iconCss: "e-icons e-cut", content: "Cut" };
const copyButton = { iconCss: "e-icons e-copy", content: "Copy" };
const formatButton = { iconCss: "e-icons e-format-painter", content: "Format Painter" };
const boldButton = { iconCss: "e-icons e-bold", content: "Bold", isToggle: true };
const italicButton = { iconCss: "e-icons e-italic", content: "Italic", isToggle: true };

// ComboBox options
const fontOptions = {
  dataSource: ["Arial", "Calibri", "Georgia", "Times New Roman", "Verdana"],
  index: 1,
  width: "150px"
};
const sizeOptions = {
  dataSource: ["8", "10", "12", "14", "16", "18", "20"],
  index: 2,
  width: "65px"
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ribbon/index.css";
</style>
```

## Common Patterns

### Pattern 1: Document Editor Ribbon
```vue
// Tabs: Home, Insert, Design, Layout
// Groups: Clipboard, Font, Paragraph, Styles, Tables, Illustrations
// Items: Text formatting, styles gallery, insert options
```

### Pattern 2: Responsive Layout with Overflow
```vue
<e-ribbon-group header="Commands" :enableGroupOverflow="true" orientation="Row">
  <!-- Items automatically overflow to dropdown when space is limited -->
</e-ribbon-group>
```

### Pattern 3: Contextual Tab for Selected Objects
```vue
<e-ribbon-contextual-tabs>
  <e-ribbon-contextual-tab :visible="imageSelected" isSelected="true">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Picture Format">
        <!-- Image-specific tools -->
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </e-ribbon-contextual-tab>
</e-ribbon-contextual-tabs>
```

### Pattern 4: Gallery-Based Selection
```vue
<e-ribbon-item type="Gallery" :gallerySettings="{
  groups: [{
    header: 'Styles',
    items: [
      { content: 'Normal' },
      { content: 'Heading 1' },
      { content: 'Heading 2' }
    ]
  }]
}"></e-ribbon-item>
```

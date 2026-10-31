# Getting Started with Syncfusion Vue Ribbon Component

This guide covers the installation, setup, and basic implementation of the Syncfusion Vue Ribbon component in a Vue 3 application.

## Prerequisites

- Vue 3 application (created with Vite or Vue CLI)
- Node.js and npm/yarn installed

## Installation

Install the Syncfusion Vue Ribbon package using npm or yarn:

```bash
npm install @syncfusion/ej2-vue-ribbon --save
```

or

```bash
yarn add @syncfusion/ej2-vue-ribbon
```

## CSS Theme Import

To install the material3 theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Import the required CSS files for the Ribbon component and its dependencies. Add these imports to your component's `<style>` section or main CSS file:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ribbon/index.css";
</style>
```

**Available Themes:**
- `material.css` - Material Design
- `bootstrap5.css` - Bootstrap 5
- `tailwind.css` - Tailwind CSS
- `fluent.css` - Microsoft Fluent
- `fabric.css` - Microsoft Fabric

## Component Registration

Import and register the Ribbon component and directives in your Vue 3 component using the Composition API:

```vue
<script setup>
import { RibbonComponent as EjsRibbon, 
         RibbonTabsDirective as ERibbonTabs,
         RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups,
         RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections,
         RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems,
         RibbonItemDirective as ERibbonItem
} from "@syncfusion/ej2-vue-ribbon";
</script>
```

## Module Injection

For advanced features like FileMenu, ColorPicker, or other specialized components, inject the required modules using Vue's `provide`:

```vue
<script setup>
import { provide } from "vue";
import { RibbonFileMenu, RibbonColorPicker, RibbonBackstage, RibbonContextualTab, RibbonGallery } from "@syncfusion/ej2-vue-ribbon";

// Inject modules
provide('ribbon', [RibbonFileMenu, RibbonColorPicker, RibbonBackstage, RibbonContextualTab, RibbonGallery]);
</script>
```

### Module Reference Guide

#### **RibbonFileMenu**
**Purpose:** Enables file menu functionality  
**Use When:** You need a traditional File menu (New, Open, Save, etc.)  
**Dependencies:** None  
**Performance:** Minimal overhead

```vue
<script setup>
import { RibbonFileMenu } from "@syncfusion/ej2-vue-ribbon";
provide('ribbon', [RibbonFileMenu]);
</script>

<template>
  <e-ribbon-file-menu :menuItems="fileMenuItems"></e-ribbon-file-menu>
</template>
```

#### **RibbonColorPicker**
**Purpose:** Enables color picker items in ribbon  
**Use When:** You need color selection functionality in ribbon items  
**Dependencies:** None  
**Performance:** Minimal overhead, loads color palette on demand

```vue
<script setup>
import { RibbonColorPicker } from "@syncfusion/ej2-vue-ribbon";
provide('ribbon', [RibbonColorPicker]);
</script>

<template>
  <e-ribbon-item type="ColorPicker" :colorPickerSettings="colorSettings"></e-ribbon-item>
</template>
```

#### **RibbonBackstage**
**Purpose:** Enables backstage view for full-screen menus  
**Use When:** You need a full-screen menu overlay (like Office applications)  
**Dependencies:** None  
**Performance:** Moderate, renders full-screen DOM when opened

```vue
<script setup>
import { RibbonBackstage } from "@syncfusion/ej2-vue-ribbon";
provide('ribbon', [RibbonBackstage]);
</script>

<template>
  <e-ribbon-backstage text="File" :backStageMenu="backstageItems"></e-ribbon-backstage>
</template>
```

#### **RibbonContextualTab**
**Purpose:** Enables contextual tabs that appear based on context  
**Use When:** You need dynamic tabs (table tools, image tools, etc.)  
**Dependencies:** None  
**Performance:** Minimal, only renders visible tabs

```vue
<script setup>
import { RibbonContextualTab } from "@syncfusion/ej2-vue-ribbon";
provide('ribbon', [RibbonContextualTab]);
</script>

<template>
  <e-ribbon-contextual-tabs>
    <e-ribbon-contextual-tab :visible="tableSelected">
      <!-- Table tools -->
    </e-ribbon-contextual-tab>
  </e-ribbon-contextual-tabs>
</template>
```

#### **RibbonGallery**
**Purpose:** Enables gallery items for visual item collections  
**Use When:** You need grid-based visual selections (styles, colors, shapes, etc.)  
**Dependencies:** None  
**Performance:** Loads gallery items on demand

```vue
<script setup>
import { RibbonGallery } from "@syncfusion/ej2-vue-ribbon";
provide('ribbon', [RibbonGallery]);
</script>

<template>
  <e-ribbon-item type="Gallery" :gallerySettings="styleGallery"></e-ribbon-item>
</template>
```

#### **RibbonButton, RibbonCheckBox, RibbonComboBox, RibbonDropDown**
**Purpose:** Enable specific item types  
**Use When:** Using these item types in collections  
**Note:** Usually injected automatically; rarely need manual injection  

```vue
<script setup>
import { RibbonButton, RibbonCheckBox, RibbonComboBox, RibbonDropDown } from "@syncfusion/ej2-vue-ribbon";
provide('ribbon', [RibbonButton, RibbonCheckBox, RibbonComboBox, RibbonDropDown]);
</script>
```

### Optimal Module Injection Patterns

**For Complete Application (All Features):**
```vue
<script setup>
import { provide } from "vue";
import { 
  RibbonFileMenu, 
  RibbonColorPicker, 
  RibbonBackstage, 
  RibbonContextualTab, 
  RibbonGallery 
} from "@syncfusion/ej2-vue-ribbon";

provide('ribbon', [
  RibbonFileMenu, 
  RibbonColorPicker, 
  RibbonBackstage, 
  RibbonContextualTab, 
  RibbonGallery
]);
</script>
```

**For Minimal Application (Core Only):**
```vue
<script setup>
// No module injection needed - basic buttons, dropdowns work without it
</script>
```

**For Specific Features:**
```vue
<script setup>
import { provide } from "vue";
import { RibbonFileMenu, RibbonGallery } from "@syncfusion/ej2-vue-ribbon";

// Only inject modules you actually use
provide('ribbon', [RibbonFileMenu, RibbonGallery]);
</script>
```

### Performance Tips

1. **Only Inject Used Modules** - Don't inject modules you don't use
2. **Inject at Root Component** - Use `provide` at the top level, not in every component
3. **Lazy Loading** - Module code loads only when component initializes
4. **Module Dependencies** - Modules have minimal dependencies on each other

## Basic Ribbon Structure

### Empty Ribbon

Create a basic empty ribbon:

```vue
<template>
  <ejs-ribbon id="ribbon"></ejs-ribbon>
</template>

<script setup>
import { RibbonComponent as EjsRibbon } from "@syncfusion/ej2-vue-ribbon";
</script>
```

### Adding a Tab

Add a tab with a header:

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home"></e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { RibbonComponent as EjsRibbon,
         RibbonTabsDirective as ERibbonTabs,
         RibbonTabDirective as ERibbonTab
} from "@syncfusion/ej2-vue-ribbon";
</script>
```

### Adding a Group

Add a group within a tab:

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard" orientation="Column"></e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { RibbonComponent as EjsRibbon,
         RibbonTabsDirective as ERibbonTabs,
         RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups,
         RibbonGroupDirective as ERibbonGroup
} from "@syncfusion/ej2-vue-ribbon";
</script>
```

### Adding Items

Add items (buttons) to a group using collections:

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard" orientation="Column">
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
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { RibbonComponent as EjsRibbon,
         RibbonTabsDirective as ERibbonTabs,
         RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups,
         RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections,
         RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems,
         RibbonItemDirective as ERibbonItem
} from "@syncfusion/ej2-vue-ribbon";

// Button settings
const cutButton = { iconCss: "e-icons e-cut", content: "Cut" };
const copyButton = { iconCss: "e-icons e-copy", content: "Copy" };
const pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
</script>
```

## Complete Minimal Working Example

Here's a complete working example with multiple tabs, groups, and different item types:

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <!-- Home Tab -->
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <!-- Clipboard Group -->
          <e-ribbon-group header="Clipboard" orientation="Column">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="SplitButton" :splitButtonSettings="pasteSettings"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :buttonSettings="cutButton"></e-ribbon-item>
                  <e-ribbon-item type="Button" :buttonSettings="copyButton"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>

          <!-- Font Group -->
          <e-ribbon-group header="Font" orientation="Row">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="ComboBox" :comboBoxSettings="fontOptions"></e-ribbon-item>
                  <e-ribbon-item type="ComboBox" :comboBoxSettings="sizeOptions"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>

      <!-- Insert Tab -->
      <e-ribbon-tab header="Insert">
        <e-ribbon-groups>
          <e-ribbon-group header="Tables">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="DropDown" :dropDownSettings="tableSettings"></e-ribbon-item>
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
import { RibbonComponent as EjsRibbon,
         RibbonTabsDirective as ERibbonTabs,
         RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups,
         RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections,
         RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems,
         RibbonItemDirective as ERibbonItem
} from "@syncfusion/ej2-vue-ribbon";

// Button settings
const cutButton = { iconCss: "e-icons e-cut", content: "Cut" };
const copyButton = { iconCss: "e-icons e-copy", content: "Copy" };

// SplitButton settings
const pasteSettings = {
  iconCss: "e-icons e-paste",
  content: "Paste",
  items: [
    { text: "Keep Source Format" },
    { text: "Merge format" },
    { text: "Keep text only" }
  ]
};

// ComboBox settings
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

// DropDown settings
const tableSettings = {
  iconCss: "e-icons e-table",
  content: "Table",
  items: [
    { text: "Insert Table" },
    { text: "Draw Table" },
    { text: "Convert Table" }
  ]
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ribbon/index.css";
</style>
```

## Running the Application

Start your development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

The Ribbon component should now render in your application.

## Troubleshooting

### Issue: Component Not Rendering

**Solution:** Ensure all CSS imports are included and in the correct order (dependencies first, then Ribbon).

### Issue: Module Injection Errors

**Solution:** Make sure to use Vue's `provide` function to inject required modules like `RibbonFileMenu` or `RibbonColorPicker` before using them.

### Issue: Items Not Showing

**Solution:** Verify the hierarchy: Tab → Group → Collection → Item. Each level must be properly nested.

## Next Steps

- Explore different item types in [ribbon-items.md](ribbon-items.md)
- Learn about layouts and resizing in [layouts-and-resizing.md](layouts-and-resizing.md)
- Add a file menu using [file-menu.md](file-menu.md)
- Understand tabs and groups structure in [tabs-and-groups.md](tabs-and-groups.md)

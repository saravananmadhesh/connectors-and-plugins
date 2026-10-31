# Tabs and Groups in Vue Ribbon Component

## Table of Contents
- [Overview](#overview)
- [Understanding the Ribbon Hierarchy](#understanding-the-ribbon-hierarchy)
- [Adding Tabs](#adding-tabs)
- [Adding Groups](#adding-groups)
- [Group Orientation](#group-orientation)
- [Group Header Configuration](#group-header-configuration)
- [Group Icon Configuration](#group-icon-configuration)
- [Launcher Icon](#launcher-icon)
- [Collapsible Groups](#collapsible-groups)
- [Priority Order](#priority-order)
- [Group Overflow](#group-overflow)
- [Collections within Groups](#collections-within-groups)

## Overview

The Ribbon component uses a hierarchical structure to organize commands into logical groups. Understanding this structure is essential for creating effective ribbon interfaces.

## Understanding the Ribbon Hierarchy

The Ribbon follows a strict four-level hierarchy:

```
Ribbon
└── Tabs (e-ribbon-tabs / e-ribbon-tab)
    └── Groups (e-ribbon-groups / e-ribbon-group)
        └── Collections (e-ribbon-collections / e-ribbon-collection)
            └── Items (e-ribbon-items / e-ribbon-item)
```

**Key Concepts:**
- **Tabs:** Top-level navigation (Home, Insert, Design, etc.)
- **Groups:** Logical groupings of related commands within a tab
- **Collections:** Sub-groupings within groups for layout purposes
- **Items:** Individual controls (buttons, dropdowns, etc.)

## Adding Tabs

Tabs provide the primary navigation structure for the ribbon. Add tabs using the `e-ribbon-tabs` directive with individual `e-ribbon-tab` elements.

### Basic Tab Addition

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home"></e-ribbon-tab>
      <e-ribbon-tab header="Insert"></e-ribbon-tab>
      <e-ribbon-tab header="Design"></e-ribbon-tab>
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

### Tab Properties

The `header` property defines the text displayed in the tab. Each tab should have a unique, descriptive header that clearly indicates its purpose.

## Adding Groups

Groups organize related commands within a tab. Add groups using the `e-ribbon-groups` directive with individual `e-ribbon-group` elements.

### Basic Group Addition

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard"></e-ribbon-group>
          <e-ribbon-group header="Font"></e-ribbon-group>
          <e-ribbon-group header="Paragraph"></e-ribbon-group>
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

## Group Orientation

The `orientation` property controls how items are arranged within a group. Two options are available:

### Column Orientation (Default)

Items are arranged vertically in columns:

```vue
<e-ribbon-group header="Clipboard" orientation="Column">
  <e-ribbon-collections>
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="SplitButton" :splitButtonSettings="pasteButton"></e-ribbon-item>
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
```

**Column Rules:**
- Can have any number of collections
- Each collection can contain one large item OR up to three medium/small items
- Two large items automatically convert to medium/small items

### Row Orientation

Items are arranged horizontally in rows:

```vue
<e-ribbon-group header="Font" orientation="Row">
  <e-ribbon-collections>
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="ComboBox" :comboBoxSettings="fontStyle"></e-ribbon-item>
        <e-ribbon-item type="ComboBox" :comboBoxSettings="fontSize"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="Button" :buttonSettings="boldButton"></e-ribbon-item>
        <e-ribbon-item type="Button" :buttonSettings="italicButton"></e-ribbon-item>
        <e-ribbon-item type="Button" :buttonSettings="underlineButton"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>
```

**Row Rules:**
- Maximum of three collections
- Each collection can contain any number of items
- Items flow horizontally within each collection

## Group Header Configuration

The `header` property defines the name displayed below the group:

```vue
<e-ribbon-group header="Clipboard">
  <!-- Group content -->
</e-ribbon-group>
```

**Best Practices:**
- Use concise, descriptive names (1-2 words)
- Clearly indicate the group's purpose
- Use sentence case or title case consistently

## Group Icon Configuration

The `groupIconCss` property sets an icon for the group's overflow button. This icon appears when the group collapses due to limited space.

```vue
<e-ribbon-group header="Clipboard" groupIconCss="e-icons e-paste">
  <e-ribbon-collections>
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="Button" :buttonSettings="pasteButton"></e-ribbon-item>
        <e-ribbon-item type="Button" :buttonSettings="cutButton"></e-ribbon-item>
        <e-ribbon-item type="Button" :buttonSettings="copyButton"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>

<script setup>
const pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
const cutButton = { iconCss: "e-icons e-cut", content: "Cut" };
const copyButton = { iconCss: "e-icons e-copy", content: "Copy" };
</script>
```

**Usage:**
- Use built-in Syncfusion icons (`e-icons e-icon-name`)
- Or use custom CSS classes for custom icons
- Icon should represent the group's primary function

## Launcher Icon

The launcher icon is a small icon that appears in the bottom-right corner of a group header. It's typically used to open a dialog or panel with additional options.

### Enabling the Launcher Icon

Set `showLauncherIcon` to `true`:

```vue
<e-ribbon-group header="Clipboard" groupIconCss="e-icons e-paste" :showLauncherIcon="true">
  <e-ribbon-collections>
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="Button" :buttonSettings="cutButton"></e-ribbon-item>
        <e-ribbon-item type="Button" :buttonSettings="copyButton"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>
```

### Customizing the Launcher Icon

Use the `launcherIconCss` property on the Ribbon component to customize the icon globally:

```vue
<ejs-ribbon launcherIconCss="e-icons e-description">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <e-ribbon-groups>
        <e-ribbon-group header="Clipboard" :showLauncherIcon="true">
          <!-- Group content -->
        </e-ribbon-group>
      </e-ribbon-groups>
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>
```

### Handling Launcher Icon Clicks

Listen to the `launcherIconClick` event:

```vue
<ejs-ribbon @launcherIconClick="onLauncherClick">
  <!-- Ribbon content -->
</ejs-ribbon>

<script setup>
const onLauncherClick = (args) => {
  console.log('Launcher icon clicked for group:', args.groupId);
  // Open dialog or perform action
};
</script>
```

## Collapsible Groups

Groups can collapse into an overflow button when space is limited. Control this behavior with the `isCollapsible` property.

### Making Groups Non-Collapsible

Set `isCollapsible` to `false` to prevent a group from collapsing:

```vue
<e-ribbon-group header="Font" :isCollapsible="false">
  <e-ribbon-collections>
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="ComboBox" :comboBoxSettings="fontOptions"></e-ribbon-item>
        <e-ribbon-item type="ComboBox" :comboBoxSettings="sizeOptions"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>
```

**Use Cases:**
- Critical groups that should always be visible
- Groups with essential commands
- Preventing layout shifts for important controls

## Priority Order

The `priority` property determines the order in which groups collapse or expand during resizing.

### How Priority Works

- **Collapsing:** Higher priority values collapse first
- **Expanding:** Lower priority values expand first
- **Default:** All groups have equal priority

### Setting Priority

```vue
<e-ribbon-tab header="Home">
  <e-ribbon-groups>
    <!-- Collapses first (highest priority) -->
    <e-ribbon-group header="Clipboard" :priority="2" groupIconCss="e-icons e-paste">
      <!-- Items -->
    </e-ribbon-group>

    <!-- Collapses second -->
    <e-ribbon-group header="Editing" :priority="1" groupIconCss="e-icons e-edit">
      <!-- Items -->
    </e-ribbon-group>

    <!-- Collapses last (lowest priority) -->
    <e-ribbon-group header="Font" :priority="0" groupIconCss="e-icons e-bold">
      <!-- Items -->
    </e-ribbon-group>
  </e-ribbon-groups>
</e-ribbon-tab>
```

**Strategy:**
- Assign highest priority to least critical groups
- Assign lowest priority to most important groups
- Use 0 for essential groups that should remain visible longest

## Group Overflow

In simplified layout, groups can have dedicated overflow popups instead of collapsing into the ribbon's common overflow.

### Enabling Group Overflow

Set `enableGroupOverflow` to `true`:

```vue
<e-ribbon-group header="Font" orientation="Row" :enableGroupOverflow="true" groupIconCss="e-icons e-bold">
  <e-ribbon-collections>
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="ComboBox" :comboBoxSettings="fontStyle"></e-ribbon-item>
        <e-ribbon-item type="ComboBox" :comboBoxSettings="fontSize"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="Button" :buttonSettings="boldButton"></e-ribbon-item>
        <e-ribbon-item type="Button" :buttonSettings="italicButton"></e-ribbon-item>
        <e-ribbon-item type="Button" :buttonSettings="underlineButton"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>
```

**Behavior:**
- Items that don't fit appear in a dropdown specific to this group
- The group icon is used for the overflow button
- Provides better organization than a common overflow

## Collections within Groups

Collections are sub-groupings within groups that control item layout. They're primarily used with column-oriented groups to create visual groupings.

### Basic Collection Structure

```vue
<e-ribbon-group header="Clipboard" orientation="Column">
  <e-ribbon-collections>
    <!-- First collection: One large item -->
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="SplitButton" :allowedSizes="largeSize" :splitButtonSettings="pasteSettings">
        </e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>

    <!-- Second collection: Three small items -->
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="Button" :buttonSettings="cutButton"></e-ribbon-item>
        <e-ribbon-item type="Button" :buttonSettings="copyButton"></e-ribbon-item>
        <e-ribbon-item type="Button" :buttonSettings="formatButton"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>

<script setup>
import { RibbonItemSize } from "@syncfusion/ej2-vue-ribbon";

const largeSize = RibbonItemSize.Large;

const pasteSettings = {
  iconCss: "e-icons e-paste",
  content: "Paste",
  items: [{ text: "Keep Source Format" }, { text: "Merge format" }]
};
const cutButton = { iconCss: "e-icons e-cut", content: "Cut" };
const copyButton = { iconCss: "e-icons e-copy", content: "Copy" };
const formatButton = { iconCss: "e-icons e-format-painter", content: "Format Painter" };
</script>
```

### Collection Layout Rules

**For Column Orientation:**
- Each collection displays vertically
- Collections appear side-by-side
- Use to create visual separation between related items

**For Row Orientation:**
- Each collection displays horizontally
- Collections stack vertically (up to 3 collections)
- Use to create rows of items

## Complete Example

Here's a complete example demonstrating all group features:

```vue
<template>
  <ejs-ribbon launcherIconCss="e-icons e-settings" @launcherIconClick="onLauncherClick">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <!-- Column-oriented group with launcher icon -->
          <e-ribbon-group 
            header="Clipboard" 
            orientation="Column"
            groupIconCss="e-icons e-paste"
            :showLauncherIcon="true"
            :priority="2">
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
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>

          <!-- Row-oriented group with overflow -->
          <e-ribbon-group 
            header="Font" 
            orientation="Row"
            groupIconCss="e-icons e-bold"
            :enableGroupOverflow="true"
            :priority="1">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="ComboBox" :comboBoxSettings="fontOptions"></e-ribbon-item>
                  <e-ribbon-item type="ComboBox" :comboBoxSettings="sizeOptions"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :buttonSettings="boldButton"></e-ribbon-item>
                  <e-ribbon-item type="Button" :buttonSettings="italicButton"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>

          <!-- Non-collapsible group -->
          <e-ribbon-group 
            header="Editor"
            :isCollapsible="false"
            groupIconCss="e-icons e-edit">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :allowedSizes="largeSize" :buttonSettings="editorButton">
                  </e-ribbon-item>
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
import { RibbonComponent as EjsRibbon, RibbonItemSize,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups, RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections, RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems, RibbonItemDirective as ERibbonItem
} from "@syncfusion/ej2-vue-ribbon";

const largeSize = RibbonItemSize.Large;

const pasteSettings = {
  iconCss: "e-icons e-paste",
  content: "Paste",
  items: [{ text: "Keep Source Format" }, { text: "Merge format" }]
};
const cutButton = { iconCss: "e-icons e-cut", content: "Cut" };
const copyButton = { iconCss: "e-icons e-copy", content: "Copy" };
const boldButton = { iconCss: "e-icons e-bold", content: "Bold", isToggle: true };
const italicButton = { iconCss: "e-icons e-italic", content: "Italic", isToggle: true };
const editorButton = { iconCss: "e-icons e-edit", content: "Editor" };

const fontOptions = {
  dataSource: ["Arial", "Calibri", "Georgia"],
  index: 1,
  width: "120px"
};
const sizeOptions = {
  dataSource: ["10", "12", "14", "16"],
  index: 1,
  width: "60px"
};

const onLauncherClick = (args) => {
  console.log('Launcher clicked for group:', args.groupId);
};
</script>
```

This comprehensive structure allows for flexible, organized command interfaces that adapt to different screen sizes and user needs.

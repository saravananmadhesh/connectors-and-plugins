# Layouts and Resizing in Vue Ribbon Component

## Table of Contents
- [Overview](#overview)
- [Layout Types](#layout-types)
- [Classic Layout](#classic-layout)
- [Simplified Layout](#simplified-layout)
- [Switching Layouts](#switching-layouts)
- [Item Sizing](#item-sizing)
- [Group Overflow](#group-overflow)
- [Minimized State](#minimized-state)
- [Responsive Behavior](#responsive-behavior)

## Overview

The Ribbon component supports two primary layouts: Classic and Simplified. Classic layout displays multi-row commands with large buttons, while Simplified layout provides a single-row, compact interface. The component automatically handles responsive resizing based on available space.

## Layout Types

| Layout | Description | Use Case |
|--------|-------------|----------|
| **Classic** | Multi-row layout with large buttons | Traditional Office-style interfaces, desktop applications |
| **Simplified** | Single-row compact layout | Space-constrained UIs, modern minimalist designs |

## Classic Layout

Classic layout displays items in their full size with multi-row groups.

### Setting Classic Layout

```vue
<ejs-ribbon activeLayout="Classic">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <e-ribbon-groups>
        <e-ribbon-group header="Clipboard">
          <e-ribbon-collections>
            <e-ribbon-collection>
              <e-ribbon-items>
                <e-ribbon-item type="Button" :allowedSizes="largeSize" :buttonSettings="pasteButton">
                </e-ribbon-item>
                <e-ribbon-item type="Button" :allowedSizes="smallSize" :buttonSettings="cutButton">
                </e-ribbon-item>
                <e-ribbon-item type="Button" :allowedSizes="smallSize" :buttonSettings="copyButton">
                </e-ribbon-item>
              </e-ribbon-items>
            </e-ribbon-collection>
          </e-ribbon-collections>
        </e-ribbon-group>
      </e-ribbon-groups>
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
import { RibbonItemSize } from '@syncfusion/ej2-vue-ribbon';

const largeSize = RibbonItemSize.Large;
const smallSize = RibbonItemSize.Small;

const pasteButton = { iconCss: 'e-icons e-paste', content: 'Paste' };
const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
const copyButton = { iconCss: 'e-icons e-copy', content: 'Copy' };
</script>
```

### Classic Layout Characteristics

- Items display in full size (Large, Medium, or Small based on `allowedSizes`)
- Groups can have multiple rows via orientation
- Icons and text are prominently displayed
- Launcher icons appear at group bottom-right

## Simplified Layout

Simplified layout collapses all items into a single-row dropdown format.

### Setting Simplified Layout

```vue
<ejs-ribbon activeLayout="Simplified">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <e-ribbon-groups>
        <e-ribbon-group header="Clipboard">
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
      </e-ribbon-groups>
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>
```

### Simplified Layout Characteristics

- All items collapse into a single-row dropdown button
- Group header becomes the dropdown trigger
- Clicking the group opens a dropdown with all items
- Space-efficient for limited screen real estate
- Launcher icons appear beside group header

### Simplified Dropdown Button

In Simplified mode, each group becomes a dropdown button:

```vue
<template>
  <ejs-ribbon activeLayout="Simplified">
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <!-- This group appears as a single dropdown button -->
          <e-ribbon-group header="Font">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :buttonSettings="boldButton"></e-ribbon-item>
                  <e-ribbon-item type="Button" :buttonSettings="italicButton"></e-ribbon-item>
                  <e-ribbon-item type="Button" :buttonSettings="underlineButton"></e-ribbon-item>
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
const boldButton = { iconCss: 'e-icons e-bold', content: 'Bold', isToggle: true };
const italicButton = { iconCss: 'e-icons e-italic', content: 'Italic', isToggle: true };
const underlineButton = { iconCss: 'e-icons e-underline', content: 'Underline', isToggle: true };
</script>
```

## Switching Layouts

Enable dynamic layout switching with the built-in layout switcher.

### Default Layout Switcher

The layout switcher appears by default in the ribbon overflow:

```vue
<ejs-ribbon activeLayout="Classic">
  <!-- Layout switcher automatically appears in overflow -->
</ejs-ribbon>
```

### Hiding Layout Switcher

Disable the layout switcher when you want a fixed layout:

```vue
<ejs-ribbon activeLayout="Classic" :hideLayoutSwitcher="true">
  <e-ribbon-tabs>
    <!-- Ribbon content -->
  </e-ribbon-tabs>
</ejs-ribbon>
```

### Programmatic Layout Switching

Switch layouts programmatically using refs:

```vue
<template>
  <button @click="switchToSimplified">Switch to Simplified</button>
  <button @click="switchToClassic">Switch to Classic</button>
  
  <ejs-ribbon ref="ribbonRef" activeLayout="Classic">
    <e-ribbon-tabs>
      <!-- Ribbon content -->
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const switchToSimplified = () => {
  ribbonRef.value.activeLayout = 'Simplified';
};

const switchToClassic = () => {
  ribbonRef.value.activeLayout = 'Classic';
};
</script>
```

### Layout Switched Event

Listen for layout changes:

```vue
<ejs-ribbon activeLayout="Classic" @ribbonLayoutSwitched="onLayoutSwitched">
  <e-ribbon-tabs>
    <!-- Ribbon content -->
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onLayoutSwitched = (args) => {
  console.log('Layout changed to:', args.layout);
  // args.layout: 'Classic' or 'Simplified'
};
</script>
```

## Item Sizing

Control how items appear and resize within the ribbon.

### Allowed Sizes

Specify which sizes an item can take:

```vue
<template>
  <e-ribbon-items>
    <!-- Item can be Large only -->
    <e-ribbon-item type="Button" :allowedSizes="largeSize" :buttonSettings="editorButton">
    </e-ribbon-item>
    
    <!-- Item can be Medium or Small -->
    <e-ribbon-item type="Button" :allowedSizes="[mediumSize, smallSize]" :buttonSettings="cutButton">
    </e-ribbon-item>
    
    <!-- Item can be all three sizes -->
    <e-ribbon-item type="Button" :allowedSizes="allSizes" :buttonSettings="pasteButton">
    </e-ribbon-item>
  </e-ribbon-items>
</template>

<script setup>
import { RibbonItemSize } from '@syncfusion/ej2-vue-ribbon';

const largeSize = RibbonItemSize.Large;
const mediumSize = RibbonItemSize.Medium;
const smallSize = RibbonItemSize.Small;
const allSizes = [RibbonItemSize.Large, RibbonItemSize.Medium, RibbonItemSize.Small];

const editorButton = { iconCss: 'e-icons e-edit', content: 'Editor' };
const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
const pasteButton = { iconCss: 'e-icons e-paste', content: 'Paste' };
</script>
```

### Size Characteristics

| Size | Icon Size | Text Position | Best For |
|------|-----------|---------------|----------|
| **Large** | 32x32px | Below icon | Primary actions, high-visibility commands |
| **Medium** | 16x16px | Beside icon | Secondary actions, space-saving |
| **Small** | 16x16px | No text | Tertiary actions, maximum density |

### Active Size

Retrieve the current active size of an item:

```vue
<template>
  <button @click="checkSize">Check Paste Button Size</button>
  <ejs-ribbon ref="ribbonRef">
    <!-- Ribbon content with paste button -->
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const checkSize = () => {
  const item = ribbonRef.value.getItem('pasteButton');
  console.log('Current size:', item.activeSize);
  // Outputs: 'Large', 'Medium', or 'Small'
};
</script>
```

### Size Constraints with Group Orientation

Group orientation affects allowed sizes:

**Row-Oriented Groups:**
- Only Small size items allowed
- Forces compact horizontal layout

```vue
<e-ribbon-group header="Font" orientation="Row">
  <e-ribbon-collections>
    <e-ribbon-collection>
      <e-ribbon-items>
        <!-- Must use Small size in Row orientation -->
        <e-ribbon-item type="Button" :allowedSizes="smallSize" :buttonSettings="boldButton">
        </e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>
```

**Column-Oriented Groups:**
- Can use Large, Medium, or Small sizes
- Allows vertical stacking

```vue
<e-ribbon-group header="Clipboard" orientation="Column">
  <e-ribbon-collections>
    <e-ribbon-collection>
      <e-ribbon-items>
        <!-- Can use any size in Column orientation -->
        <e-ribbon-item type="Button" :allowedSizes="largeSize" :buttonSettings="pasteButton">
        </e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>
```

## Group Overflow

Handle groups that don't fit in the available space.

### Enable Group Overflow

Set `enableGroupOverflow` to move overflowing groups to a dropdown:

```vue
<ejs-ribbon :enableGroupOverflow="true">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <e-ribbon-groups>
        <e-ribbon-group header="Clipboard">
          <!-- Group content -->
        </e-ribbon-group>
        <e-ribbon-group header="Font">
          <!-- Group content -->
        </e-ribbon-group>
        <e-ribbon-group header="Paragraph">
          <!-- Group content -->
        </e-ribbon-group>
        <!-- If not enough space, later groups move to overflow -->
      </e-ribbon-groups>
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>
```

### Overflow Behavior

- Groups that don't fit are moved to an overflow dropdown
- Overflow button appears at the end of the ribbon
- Groups maintain full functionality in overflow
- Order: rightmost groups overflow first

### Overflow Events

Listen for overflow popup events:

```vue
<ejs-ribbon :enableGroupOverflow="true"
  @overflowPopupOpen="onOverflowOpen"
  @overflowPopupClose="onOverflowClose">
  <e-ribbon-tabs>
    <!-- Ribbon content -->
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onOverflowOpen = (args) => {
  console.log('Overflow popup opened');
  console.log('Overflowing groups:', args.items);
};

const onOverflowClose = (args) => {
  console.log('Overflow popup closed');
};
</script>
```

## Minimized State

Minimize the ribbon to save space while keeping tabs visible.

### Enable Minimized State

Set `isMinimized` to collapse the ribbon:

```vue
<ejs-ribbon :isMinimized="true">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <!-- Tab content -->
    </e-ribbon-tab>
    <e-ribbon-tab header="Insert">
      <!-- Tab content -->
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>
```

### Minimized Behavior

- Only tab headers are visible
- Click a tab to temporarily expand the ribbon
- Ribbon collapses again when clicking outside
- Saves significant vertical space

### Toggle Minimized State

Dynamically toggle between expanded and minimized:

```vue
<template>
  <button @click="toggleMinimize">Toggle Minimize</button>
  <ejs-ribbon ref="ribbonRef" :isMinimized="isMinimized">
    <e-ribbon-tabs>
      <!-- Ribbon content -->
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);
const isMinimized = ref(false);

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
};
</script>
```

### Minimize Events

Listen for ribbon expand/collapse:

```vue
<ejs-ribbon 
  @ribbonExpanding="onExpanding"
  @ribbonCollapsing="onCollapsing">
  <e-ribbon-tabs>
    <!-- Ribbon content -->
  </e-ribbon-tabs>
</ejs-ribbon>

<script setup>
const onExpanding = (args) => {
  console.log('Ribbon expanding');
  // args.cancel = true to prevent expansion
};

const onCollapsing = (args) => {
  console.log('Ribbon collapsing');
  // args.cancel = true to prevent collapse
};
</script>
```

## Responsive Behavior

The ribbon automatically adjusts to available space.

### Automatic Item Resizing

Items automatically transition through allowed sizes:

1. **Initial State:** All items at their largest allowed size
2. **Space Decreases:** Items shrink to next allowed size
3. **Further Decrease:** Items continue shrinking to smallest size
4. **Minimum Size:** Items stay at smallest allowed size

**Resize Sequence Example:**
```
Large → Medium → Small → (stays Small)
```

### Resize Priority

Items resize based on:
1. Group priority (see `priority` in [tabs-and-groups.md](tabs-and-groups.md))
2. Item position (rightmost items resize first)
3. Allowed sizes configuration

### Custom Width

Set a fixed width for the ribbon:

```vue
<ejs-ribbon width="1200px">
  <e-ribbon-tabs>
    <!-- Ribbon content -->
  </e-ribbon-tabs>
</ejs-ribbon>
```

### Responsive Example

Complete example demonstrating responsive behavior:

```vue
<template>
  <div class="container">
    <ejs-ribbon :enableGroupOverflow="true" activeLayout="Classic">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard" :priority="1">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" :allowedSizes="allSizes" :buttonSettings="pasteButton">
                    </e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" :allowedSizes="[mediumSize, smallSize]" :buttonSettings="cutButton">
                    </e-ribbon-item>
                    <e-ribbon-item type="Button" :allowedSizes="[mediumSize, smallSize]" :buttonSettings="copyButton">
                    </e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>

            <e-ribbon-group header="Font" :priority="2">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="ComboBox" :comboBoxSettings="fontOptions"></e-ribbon-item>
                    <e-ribbon-item type="Button" :allowedSizes="smallSize" :buttonSettings="boldButton">
                    </e-ribbon-item>
                    <e-ribbon-item type="Button" :allowedSizes="smallSize" :buttonSettings="italicButton">
                    </e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>

            <e-ribbon-group header="Paragraph" :priority="3">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="GroupButton" :allowedSizes="smallSize" :groupButtonSettings="alignmentButtons">
                    </e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  </div>
</template>

<script setup>
import { RibbonItemSize, RibbonGroupButtonSelection } from '@syncfusion/ej2-vue-ribbon';

const allSizes = [RibbonItemSize.Large, RibbonItemSize.Medium, RibbonItemSize.Small];
const mediumSize = RibbonItemSize.Medium;
const smallSize = RibbonItemSize.Small;

const pasteButton = { iconCss: 'e-icons e-paste', content: 'Paste' };
const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
const copyButton = { iconCss: 'e-icons e-copy', content: 'Copy' };
const boldButton = { iconCss: 'e-icons e-bold', content: 'Bold', isToggle: true };
const italicButton = { iconCss: 'e-icons e-italic', content: 'Italic', isToggle: true };

const fontOptions = {
  dataSource: ['Arial', 'Calibri', 'Georgia'],
  index: 1,
  width: '140px'
};

const alignmentButtons = {
  selection: RibbonGroupButtonSelection.Single,
  items: [
    { iconCss: 'e-icons e-align-left', selected: true },
    { iconCss: 'e-icons e-align-center' },
    { iconCss: 'e-icons e-align-right' }
  ]
};
</script>

<style>
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
</style>
```

**Responsive Behavior in This Example:**
1. **Full Width:** All groups visible, items at full size
2. **Medium Width:** Items resize (Paste: Large→Medium→Small)
3. **Small Width:** Groups with priority 3, then 2 move to overflow
4. **Very Small Width:** Only priority 1 group (Clipboard) remains visible

This comprehensive layout system provides flexibility for various screen sizes and use cases.

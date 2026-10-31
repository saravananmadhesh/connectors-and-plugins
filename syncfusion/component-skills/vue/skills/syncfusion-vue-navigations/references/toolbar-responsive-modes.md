# Responsive Modes in Vue 3 Toolbar

## Table of Contents
- [Scrollable Mode](#scrollable-mode)
- [Popup Mode](#popup-mode)
- [MultiRow Mode](#multirow-mode)
- [Extended Mode](#extended-mode)
- [Command Priority](#command-priority)
- [Text Display Options](#text-display-options)
- [Mode Comparison](#mode-comparison-table)
- [Examples](#examples)

---

## Scrollable Mode

**Scrollable** is the default overflow mode. Items display in a single line with horizontal scrolling when space is limited.

### How It Works

- All items stay visible in a horizontal row
- Left/right navigation arrows appear when items overflow
- Touch swipe and keyboard arrow keys navigate hidden items
- Arrows become disabled when reaching start/end

### Basic Scrollable Toolbar

```vue
<template>
  <ejs-toolbar overflowMode="Scrollable">
    <e-items>
      <e-item text="Cut" prefixIcon="e-cut-icon"></e-item>
      <e-item text="Copy" prefixIcon="e-copy-icon"></e-item>
      <e-item text="Paste" prefixIcon="e-paste-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Bold" prefixIcon="e-bold-icon"></e-item>
      <e-item text="Italic" prefixIcon="e-italic-icon"></e-item>
      <e-item text="Underline" prefixIcon="e-underline-icon"></e-item>
      <e-item text="Color-Picker" prefixIcon="e-color-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="A-Z Sort" prefixIcon="e-ascending-icon"></e-item>
      <e-item text="Z-A Sort" prefixIcon="e-descending-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Navigation Interactions

**Mouse clicks:**
- Click left arrow → Previous items become visible
- Click right arrow → Next items become visible
- Hold arrow continuously → Continuous scrolling

**Touch devices:**
- Swipe left → Scroll right
- Swipe right → Scroll left

**Keyboard:**
- Left arrow key → Previous item
- Right arrow key → Next item

### Limited Width Example

```vue
<template>
  <ejs-toolbar width="300px" overflowMode="Scrollable">
    <e-items>
      <e-item text="Cut" prefixIcon="e-cut-icon"></e-item>
      <e-item text="Copy" prefixIcon="e-copy-icon"></e-item>
      <e-item text="Paste" prefixIcon="e-paste-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Bold" prefixIcon="e-bold-icon"></e-item>
      <e-item text="Italic" prefixIcon="e-italic-icon"></e-item>
      <e-item text="Underline" prefixIcon="e-underline-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

With `width="300px"`, navigation arrows appear to scroll through items.

---

## Popup Mode

**Popup** mode hides overflow items in a dropdown container, keeping the toolbar compact.

### How It Works

- Items that fit in available space display normally
- Overflow items move to a popup dropdown
- Dropdown icon appears at toolbar end
- Click dropdown to view overflow items

### Basic Popup Toolbar

```vue
<template>
  <ejs-toolbar overflowMode="Popup" width="380px">
    <e-items>
      <e-item text="Cut" prefixIcon="e-cut-icon"></e-item>
      <e-item text="Copy" prefixIcon="e-copy-icon"></e-item>
      <e-item text="Paste" prefixIcon="e-paste-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Bold" prefixIcon="e-bold-icon"></e-item>
      <e-item text="Italic" prefixIcon="e-italic-icon"></e-item>
      <e-item text="Underline" prefixIcon="e-underline-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="A-Z Sort" prefixIcon="e-ascending-icon"></e-item>
      <e-item text="Z-A Sort" prefixIcon="e-descending-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

First few items stay visible; overflow items go to popup.

### Popup Display Behavior

- Popup opens on dropdown icon click
- If popup height exceeds page height, additional items are hidden
- Items in popup maintain their visual representation (icons, text)
- Pressing Escape closes the popup

---

## Command Priority

Control which items display in toolbar vs popup using `overflow` property.

### Priority Options

| Value | Behavior |
|-------|----------|
| `"Show"` | Always display in toolbar (primary priority) |
| `"Hide"` | Always display in popup (secondary priority) |
| `"None"` | Default behavior - move to popup based on space |

### Show Priority Example

Force important commands to stay visible:

```vue
<template>
  <ejs-toolbar overflowMode="Popup" width="300px">
    <e-items>
      <!-- Always visible -->
      <e-item text="Cut" prefixIcon="e-cut-icon" overflow="Show"></e-item>
      <e-item text="Copy" prefixIcon="e-copy-icon" overflow="Show"></e-item>
      <e-item text="Paste" prefixIcon="e-paste-icon" overflow="Show"></e-item>
      <e-item type="Separator"></e-item>
      
      <!-- Will move to popup -->
      <e-item text="Bold" prefixIcon="e-bold-icon"></e-item>
      <e-item text="Italic" prefixIcon="e-italic-icon"></e-item>
      <e-item text="Underline" prefixIcon="e-underline-icon"></e-item>
      
      <!-- Always in popup -->
      <e-item text="Advanced..." prefixIcon="e-more-icon" overflow="Hide"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

With `overflow="Show"`, Cut, Copy, Paste stay in toolbar even when space is limited.

### Hide Priority Example

Move less-used commands to popup:

```vue
<template>
  <ejs-toolbar overflowMode="Popup" width="400px">
    <e-items>
      <e-item text="Save" prefixIcon="e-save-icon" overflow="Show"></e-item>
      <e-item text="Print" prefixIcon="e-print-icon" overflow="Show"></e-item>
      <e-item type="Separator" overflow="Show"></e-item>
      
      <e-item text="Spell Check" overflow="Hide"></e-item>
      <e-item text="Grammar Check" overflow="Hide"></e-item>
      <e-item text="Word Count" overflow="Hide"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

Spell/Grammar/Word Count commands go to popup first.

---

## MultiRow Mode

**MultiRow** mode wraps overflow items to multiple rows. Items display in a grid-like structure.

### How It Works

- Items fill the available width
- When space exceeded, items wrap to next row
- All items remain visible (no popup)
- Toolbar height adjusts based on rows needed
- No horizontal scrolling or navigation arrows

### Basic MultiRow Toolbar

```vue
<template>
  <ejs-toolbar overflowMode="MultiRow" width="300px" height="auto">
    <e-items>
      <e-item text="Cut" prefixIcon="e-cut-icon"></e-item>
      <e-item text="Copy" prefixIcon="e-copy-icon"></e-item>
      <e-item text="Paste" prefixIcon="e-paste-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Bold" prefixIcon="e-bold-icon"></e-item>
      <e-item text="Italic" prefixIcon="e-italic-icon"></e-item>
      <e-item text="Underline" prefixIcon="e-underline-icon"></e-item>
      <e-item text="Color-Picker" prefixIcon="e-color-icon"></e-item>
      <e-item text="A-Z Sort" prefixIcon="e-ascending-icon"></e-item>
      <e-item text="Z-A Sort" prefixIcon="e-descending-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

**Result:** Items wrap into multiple rows based on width.

### MultiRow with Responsive Width

```vue
<template>
  <ejs-toolbar overflowMode="MultiRow" width="100%" height="auto">
    <e-items>
      <e-item text="New" prefixIcon="e-new-icon"></e-item>
      <e-item text="Open" prefixIcon="e-open-icon"></e-item>
      <e-item text="Save" prefixIcon="e-save-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Print" prefixIcon="e-print-icon"></e-item>
      <e-item text="Export" prefixIcon="e-export-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Undo" prefixIcon="e-undo-icon"></e-item>
      <e-item text="Redo" prefixIcon="e-redo-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

On wide screens, more items fit per row. On narrow screens, fewer items per row.

### Use Cases for MultiRow

- **Mobile-first design** - Stack items naturally on narrow screens
- **Variable width containers** - Adapts to available space
- **All items visible** - No hidden menus or dropdowns
- **Dashboard toolbars** - Multi-row command layouts

---

## Extended Mode

**Extended** mode combines scrolling and multi-row behavior. Items wrap to multiple rows with horizontal scrolling if needed.

### How It Works

- Items wrap to multiple rows when space limited
- If all rows don't fit, horizontal scroll arrows appear
- Users can scroll through rows
- Provides both vertical and horizontal overflow handling

### Basic Extended Toolbar

```vue
<template>
  <ejs-toolbar overflowMode="Extended" width="300px" height="auto">
    <e-items>
      <e-item text="Cut" prefixIcon="e-cut-icon"></e-item>
      <e-item text="Copy" prefixIcon="e-copy-icon"></e-item>
      <e-item text="Paste" prefixIcon="e-paste-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Bold" prefixIcon="e-bold-icon"></e-item>
      <e-item text="Italic" prefixIcon="e-italic-icon"></e-item>
      <e-item text="Underline" prefixIcon="e-underline-icon"></e-item>
      <e-item type="Separator"></e-item>
      <e-item text="Font Color" prefixIcon="e-color-icon"></e-item>
      <e-item text="Highlight" prefixIcon="e-highlight-icon"></e-item>
      <e-item text="A-Z Sort" prefixIcon="e-ascending-icon"></e-item>
      <e-item text="Z-A Sort" prefixIcon="e-descending-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

---

## Text Display Options

Control where button text displays using `showTextOn`.

### Display Modes

| Value | Behavior |
|-------|----------|
| `"Both"` | Text visible in toolbar AND popup |
| `"Overflow"` | Text only visible in popup |
| `"Toolbar"` | Text only visible in toolbar |

### Icon + Text in Popup Only

Show icons in toolbar, full text in popup:

```vue
<template>
  <ejs-toolbar overflowMode="Popup" width="330px">
    <e-items>
      <e-item 
        text="Cut" 
        prefixIcon="e-cut-icon" 
        showTextOn="Overflow" 
        overflow="Show"
      ></e-item>
      <e-item 
        text="Copy" 
        prefixIcon="e-copy-icon" 
        showTextOn="Overflow" 
        overflow="Show"
      ></e-item>
      <e-item 
        text="Paste" 
        prefixIcon="e-paste-icon" 
        showTextOn="Overflow" 
        overflow="Show"
      ></e-item>
      <e-item type="Separator"></e-item>
      <e-item 
        text="Bold" 
        prefixIcon="e-bold-icon" 
        showTextOn="Overflow"
      ></e-item>
      <e-item 
        text="Italic" 
        prefixIcon="e-italic-icon" 
        showTextOn="Overflow"
      ></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';
</script>
```

**Result:**
- Toolbar: Shows icons only (compact)
- Popup: Shows icons + text (informative)

---

## Mode Comparison Table

| Feature | Scrollable | Popup | MultiRow | Extended |
|---------|-----------|-------|----------|----------|
| **Wrapping** | No | No | Yes | Yes |
| **Horizontal Scroll** | Yes | No | No | Yes |
| **All Items Visible** | Yes* | No | Yes | Yes** |
| **Compact** | Yes | Most | No | Moderate |
| **Space Responsive** | No | Yes | Yes | Yes |
| **Use Arrow Keys** | Yes | No | No | Yes |
| **Good for Many Items** | No | Yes | Yes | Yes |

*With horizontal scrolling arrows
**With horizontal scroll arrows if needed

---

## Choosing the Right Mode

### Use Scrollable When:
- You want all items always accessible
- Users prefer continuous horizontal scroll
- Toolbar has moderate number of items (8-12)
- Screen width is usually large

### Use Popup When:
- You want a compact toolbar
- Important items fit in visible area
- Space is constrained (mobile, narrow panels)
- You want clean, minimal appearance

### Use MultiRow When:
- You want all items always visible
- Width is variable
- Multiple rows look natural
- Mobile-first responsive design

### Use Extended When:
- You have many items with limited width
- You want both wrapping and scrolling
- Complex toolbar with many categories
- Professional applications (editors, IDEs)

---

## Responsive Configuration Example

Dynamically change overflow mode based on screen width:

```vue
<template>
  <ejs-toolbar :overflowMode="overflowMode">
    <e-items>
      <e-item text="New" prefixIcon="e-new-icon"></e-item>
      <e-item text="Open" prefixIcon="e-open-icon"></e-item>
      <e-item text="Save" prefixIcon="e-save-icon"></e-item>
      <e-item text="Print" prefixIcon="e-print-icon"></e-item>
      <e-item text="Export" prefixIcon="e-export-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ToolbarComponent as EjsToolbar, ItemsDirective as EItems, ItemDirective as EItem } from '@syncfusion/ej2-vue-navigations';

const overflowMode = ref('Popup');

const handleResize = () => {
  if (window.innerWidth < 768) {
    overflowMode.value = 'Popup';  // Mobile: Compact popup
  } else if (window.innerWidth < 1024) {
    overflowMode.value = 'MultiRow';  // Tablet: Wrap items
  } else {
    overflowMode.value = 'Scrollable';  // Desktop: Continuous scroll
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});
</script>
```

---

## Summary

Responsive modes enable flexible toolbar layouts:
- **Scrollable** - All items always accessible with horizontal scroll
- **Popup** - Compact dropdown for overflow items
- **MultiRow** - Items wrap to multiple rows naturally
- **Extended** - Combines wrapping with horizontal scroll

Choose the mode that best fits your application's layout and user experience needs.

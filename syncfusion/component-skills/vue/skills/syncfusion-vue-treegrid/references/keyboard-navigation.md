# Keyboard Navigation and Accessibility

## Table of Contents
- [When to Use](#when-to-use)
- [Accessibility Compliance Standards](#accessibility-compliance-standards)
- [Default Keyboard Shortcuts](#default-keyboard-shortcuts)
- [WAI-ARIA Attributes Reference](#wai-aria-attributes-reference)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Enable/Disable Keyboard Navigation](#enable-or-disable-keyboard-navigation)
- [Custom Keyboard Handlers](#custom-keyboard-handlers)

## When to Use

Use keyboard navigation and accessibility features when you need to:
- **Screen reader support** - Allow users with visual impairments to use the grid
- **Power user efficiency** - Enable navigation without mouse
- **Compliance requirements** - Meet Section 508, WCAG 2.2, ADA standards
- **Assistive technology** - Support speech software and AT devices
- **Mobile/tablet devices** - Limited mouse pointer availability
- **Keyboard-only workflows** - Users who never touch the mouse
- **Reduce RSI injuries** - Minimize mouse usage for accessibility
- **ARIA compliance** - Meet WAI-ARIA patterns for treegrid
- **International standards** - Right-to-Left support and language compliance

## Accessibility Compliance Standards

The TreeGrid component meets international accessibility standards:

| Standard | Support | Status |
|----------|---------|--------|
| WCAG 2.2 | Full/Partial | ✅ Intermediate |
| Section 508 | Full | ✅ Yes |
| ADA Compliance | Full | ✅ Yes |
| Screen Reader Support | Partial | ✅ Intermediate |
| Right-To-Left (RTL) | Full | ✅ Yes |
| Color Contrast | Full | ✅ Yes |
| Mobile Device Support | Full | ✅ Yes |
| Keyboard Navigation | Full | ✅ Yes |
| Accessibility Checker | Full | ✅ Validated |
| Axe-core Validation | Full | ✅ Validated |

## WAI-ARIA Attributes Reference

### Core ARIA Attributes

The TreeGrid follows WAI-ARIA treegrid pattern.

| Attribute | Usage | Purpose |
|-----------|-------|---------|
| `role="treegrid"` | Root container | Convey hierarchical data grid semantics to assistive technology |
| `aria-selected` | On rows/cells | Reflect selection state (single or multi-select) for screen readers |
| `aria-expanded` | On expandable rows | Show if node is expanded or collapsed, aid hierarchy navigation |
| `aria-sort` | On column headers | Indicate current sort order (ascending, descending, none) |
| `aria-busy` | During loading | Indicate loading state for improved accessibility feedback |
| `aria-invalid` | On cells with errors | Mark invalid user input in form fields |
| `aria-grabbed` | On draggable items | Provide info for users dragging elements |
| `aria-owns` | On parent elements | Establish control relationships between elements |
| `aria-label` | On controls | Provide accessible name for close buttons and icons |
| `aria-labelledby` | On grid | Reference heading IDs describing the grid purpose |
| `aria-describedby` | On grid | Reference description IDs for detailed explanation |

## Keyboard Shortcuts

For quick lookup, here's a consolidated table of ALL keyboard shortcuts:

| Category | Key Combination | Action |
|----------|-----------------|--------|
| **NAVIGATION** | ↓ DownArrow | Move cell focus downward to next row |
| | ↑ UpArrow | Move cell focus upward to previous row |
| | ← LeftArrow | Move cell focus to the left (previous column) |
| | → RightArrow | Move cell focus to the right (next column) |
| | Home | Jump to first cell in the grid |
| | End | Jump to last cell in the grid |
| | Ctrl + Home | Jump to first row in the grid |
| | Ctrl + End | Jump to last row in the grid |
| | Tab | Move cell selection to the right |
| | Shift + Tab | Move cell selection to the left |
| **SELECTION** | Shift + ↓ | Extend row/cell selection downwards |
| | Shift + ↑ | Extend row/cell selection upwards |
| | Shift + ← | Extend cell selection to the left |
| | Shift + → | Extend cell selection to the right |
| | Ctrl + A | Select all rows/cells |
| | Esc | Deselect all rows/cells and exit edit mode |
| **HIERARCHY** | Ctrl + Shift + ↓ | Expand the selected group/parent row |
| | Ctrl + ↓ | Expand all visible groups/parents |
| | Ctrl + Shift + ↑ | Collapse the selected group/parent row |
| | Ctrl + ↑ | Collapse all visible groups/parents |
| **SORTING** | Enter (on header) | Sort column ascending |
| | Shift + Enter (on header) | Clear sort for focused column |
| | Ctrl + Enter (on header) | Apply multi-sorting on column |
| **PAGING** | PageDown | Go to next page |
| | PageUp | Go to previous page |
| | Ctrl + Alt + PageDown | Go to last page |
| | Ctrl + Alt + PageUp | Go to first page |
| | Alt + PageDown | Go to next page (alt variant) |
| | Alt + PageUp | Go to previous page (alt variant) |
| **EDITING** | Enter | Move down / Complete editing / Sort (on header) |
| | Shift + Enter | Move up / Clear sort (on header) |
| | Ctrl + P | Print the TreeGrid |

---

## Enable or Disable Keyboard Navigation

Control keyboard support programmatically:

```vue
<template>
  <div>
    <button @click="toggleKeyboard" style="margin-bottom: 10px;">
      {{ keyboardEnabled ? '🔇 Disable' : '🔊 Enable' }} Keyboard Navigation
    </button>

    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      :allowKeyboard="keyboardEnabled">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const gridInstance = ref(null);
const keyboardEnabled = ref(true);
const data = ref([...]);

const toggleKeyboard = () => {
  keyboardEnabled.value = !keyboardEnabled.value;
};

provide('treegrid', []);
</script>
```

## Custom Keyboard Handlers

Handle specific key presses:

```vue
<template>
  <div>
    <p style="padding: 10px; background: #e8f4f8; border-radius: 4px;">
      Last Action: {{ lastAction }}
    </p>

    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      :allowKeyboard="true"
      @keyPressed="onCustomKeyPress">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const gridInstance = ref(null);
const lastAction = ref('None');
const data = ref([...]);

const onCustomKeyPress = (args) => {
  const key = args.key;
  const selected = gridInstance.value?.getSelectedRecords?.() || [];

  // Custom shortcuts
  if (key === 'd' && args.ctrlKey) {
    // Ctrl+D to duplicate selected row
    lastAction.value = `Duplicate pressed for ${selected.length} rows`;
  } else if (key === 'Delete') {
    // Delete to remove selected
    lastAction.value = `Delete pressed for ${selected.length} rows`;
  } else if (key === ' ') {
    // Space to expand/collapse
    if (selected.length > 0) {
      lastAction.value = `Toggle expand/collapse for row ${selected[0].taskID}`;
    }
  }
};

provide('treegrid', []);
</script>
```
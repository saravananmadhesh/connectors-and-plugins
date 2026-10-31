# Responsive and Popup Modes in Syncfusion TypeScript Toolbar

## Table of Contents
- [Overview](#overview)
- [Scrollable Mode](#scrollable-mode)
- [Popup Mode](#popup-mode)
- [MultiRow Mode](#multirow-mode)
- [Extended Mode](#extended-mode)
- [Priority-Based Overflow](#priority-based-overflow)
- [Scroll Step Customization](#scroll-step-customization)
- [Text Mode for Buttons](#text-mode-for-buttons)
- [Mode Comparison](#mode-comparison)

## Overview

The Toolbar supports two display modes when content exceeds the available space:

1. **Scrollable** (default) - Horizontal scrolling with arrow navigation
2. **Popup** - Dropdown menu containing overflow items

Use the `overflowMode` property to select the appropriate behavior for your layout.

## Scrollable Mode

**Scrollable** is the default overflow mode. Items display in a single line with horizontal scrolling enabled.

### Features

- **Navigation Arrows**: Left/right arrows appear at toolbar edges to reveal hidden commands
- **Touch Support**: Swipe gestures supported for touch devices
- **Continuous Scroll**: Hold arrow for continuous scrolling
- **Smart Disable**: Navigation arrows disable when reaching first/last command

### Scrollable Configuration

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    width: 600,                          // Trigger with constrained width
    overflowMode: 'Scrollable',          // Explicit declaration (default)
    items: [
        { type: 'Button', prefixIcon: 'e-cut-icon tb-icons', text: 'Cut' },
        { type: 'Button', prefixIcon: 'e-copy-icon tb-icons', text: 'Copy' },
        { type: 'Button', prefixIcon: 'e-paste-icon tb-icons', text: 'Paste' },
        { type: 'Separator' },
        { type: 'Button', prefixIcon: 'e-bold-icon tb-icons', text: 'Bold' },
        { type: 'Button', prefixIcon: 'e-underline-icon tb-icons', text: 'Underline' },
        { type: 'Button', prefixIcon: 'e-italic-icon tb-icons', text: 'Italic' },
        { type: 'Button', prefixIcon: 'e-color-icon tb-icons', text: 'Color' },
        { type: 'Separator' },
        { type: 'Button', prefixIcon: 'e-ascending-icon tb-icons', text: 'Sort A-Z' },
        { type: 'Button', prefixIcon: 'e-descending-icon tb-icons', text: 'Sort Z-A' },
        { type: 'Button', prefixIcon: 'e-clear-icon tb-icons', text: 'Clear' }
    ]
});

toolbar.appendTo('#element');
```

### Scrollable Interaction Modes

**Arrow Click Navigation:**
- Single click: Scroll by one item
- Hold: Continuous scrolling to reveal more items

**Touch Swipe:**
- Swipe left: Reveal items on the right
- Swipe right: Reveal items on the left

**Keyboard (via tabIndex):**
- Tab to navigation arrow
- Enter: Single scroll
- Hold Enter: Continuous scroll

### Right-to-Left (RTL) Navigation

In RTL mode, arrow directions reverse:
- Right arrow → scroll left
- Left arrow → scroll right

```typescript
let toolbar: Toolbar = new Toolbar({
    width: 300,
    enableRtl: true,              // Enable RTL mode
    overflowMode: 'Scrollable',
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        // ... more items
    ]
});
toolbar.appendTo('#element');
```

## Popup Mode

**Popup** mode displays overflow items in a dropdown menu instead of scrolling.

### Features

- **Dropdown Menu**: All overflow items in a single popup
- **Space Efficient**: No navigation arrows visible
- **Priority Control**: Use `overflow` property to control item placement
- **Height Management**: Overflow popup respects page height

### Popup Configuration

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    width: 380,                    // Constrain width to trigger popup
    overflowMode: 'Popup',        // Use popup for overflow
    items: [
        { type: 'Button', prefixIcon: 'e-cut-icon tb-icons', text: 'Cut', overflow: 'Show' },
        { type: 'Button', prefixIcon: 'e-copy-icon tb-icons', text: 'Copy', overflow: 'Show' },
        { type: 'Button', prefixIcon: 'e-paste-icon tb-icons', text: 'Paste', overflow: 'Show' },
        { type: 'Separator' },
        { type: 'Button', prefixIcon: 'e-bold-icon tb-icons', text: 'Bold' },
        { type: 'Button', prefixIcon: 'e-italic-icon tb-icons', text: 'Italic' },
        { type: 'Button', prefixIcon: 'e-underline-icon tb-icons', text: 'Underline' },
        { type: 'Separator' },
        { type: 'Button', prefixIcon: 'e-ascending-icon tb-icons', text: 'A-Z Sort', overflow: 'Show' },
        { type: 'Button', prefixIcon: 'e-descending-icon tb-icons', text: 'Z-A Sort', overflow: 'Show' }
    ]
});

toolbar.appendTo('#element');
```

### Popup Button Access

Users access popup via dropdown button at the toolbar end:

```html
<div id="element"></div>
<!-- Toolbar renders with dropdown icon for overflow items -->
```

## MultiRow Mode

**MultiRow** mode displays overflow items as inline rows, expanding the toolbar vertically when content exceeds available horizontal space.

### Features

- **Flexible Layout**: Items wrap to next row when space is insufficient
- **Vertical Expansion**: Toolbar height expands automatically as needed
- **Continuous Item Access**: All items accessible without scrolling or popups
- **Responsive Design**: Adapts naturally to container width changes
- **Touch Friendly**: No navigation buttons or popups required

### MultiRow Configuration

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    width: 300,                    // Constrain width to trigger wrapping
    overflowMode: 'MultiRow',      // Use multi-row layout
    items: [
        { text: 'Cut', prefixIcon: 'e-cut-icon tb-icons' },
        { text: 'Copy', prefixIcon: 'e-copy-icon tb-icons' },
        { text: 'Paste', prefixIcon: 'e-paste-icon tb-icons' },
        { type: 'Separator' },
        { text: 'Bold', prefixIcon: 'e-bold-icon tb-icons' },
        { text: 'Italic', prefixIcon: 'e-italic-icon tb-icons' },
        { text: 'Underline', prefixIcon: 'e-underline-icon tb-icons' },
        { type: 'Separator' },
        { text: 'Sort A-Z', prefixIcon: 'e-ascending-icon tb-icons' },
        { text: 'Sort Z-A', prefixIcon: 'e-descending-icon tb-icons' }
    ]
});

toolbar.appendTo('#element');
```

### MultiRow Layout Behavior

**Result:**
- **Row 1:** Cut, Copy, Paste (fits available width)
- **Row 2:** Bold, Italic, Underline (wraps to new row)
- **Row 3:** Sort A-Z, Sort Z-A (continues wrapping)

### Responsive Multi-Row Example

```typescript
let toolbar: Toolbar = new Toolbar({
    width: '100%',           // Full width
    overflowMode: 'MultiRow',
    items: [
        // Primary row items
        { text: 'Save', overflow: 'Show' },
        { text: 'Save As', overflow: 'Show' },
        { type: 'Separator' },
        
        // Secondary row items
        { text: 'Undo', overflow: 'None' },
        { text: 'Redo', overflow: 'None' },
        { type: 'Separator' },
        
        // Additional options
        { text: 'Format', overflow: 'None' },
        { text: 'Styles', overflow: 'None' }
    ]
});

toolbar.appendTo('#element');

// On screen resize, toolbar automatically reorganizes items
window.addEventListener('resize', () => {
    toolbar.refresh();  // Trigger re-layout
});
```

### Use Cases for MultiRow Mode

- **Rich Text Editor**: Multiple formatting toolbar rows
- **Image Editor**: Separate rows for transform, effects, and export tools
- **Mobile Responsive**: Natural wrapping on smaller screens
- **Dashboard Controls**: Stacked toolbar rows for feature organization

### MultiRow with Separators

Use separators to organize items into logical groups:

```typescript
items: [
    // File operations
    { text: 'New', prefixIcon: 'e-new-icon tb-icons' },
    { text: 'Open', prefixIcon: 'e-open-icon tb-icons' },
    { text: 'Save', prefixIcon: 'e-save-icon tb-icons' },
    { type: 'Separator' },
    
    // Editing
    { text: 'Undo', prefixIcon: 'e-undo-icon tb-icons' },
    { text: 'Redo', prefixIcon: 'e-redo-icon tb-icons' },
    { type: 'Separator' },
    
    // Formatting
    { text: 'Bold', prefixIcon: 'e-bold-icon tb-icons' },
    { text: 'Italic', prefixIcon: 'e-italic-icon tb-icons' }
]
```

## Extended Mode

**Extended** mode hides overflow items in a collapsible next row, with expand/collapse icons to toggle visibility.

### Features

- **Compact Default**: Overflow items hidden in collapsed state
- **Expand Icons**: Click icons to show/hide overflow items
- **Keyboard Support**: Accessible expand/collapse functionality
- **Smart Hiding**: Items hidden only when insufficient space
- **Page Height Aware**: Hides items if popup would exceed page height

### Extended Configuration

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    width: 350,                    // Width causing some items to overflow
    overflowMode: 'Extended',      // Use extended collapse mode
    items: [
        { text: 'Cut', prefixIcon: 'e-cut-icon tb-icons' },
        { text: 'Copy', prefixIcon: 'e-copy-icon tb-icons' },
        { text: 'Paste', prefixIcon: 'e-paste-icon tb-icons' },
        { type: 'Separator' },
        { text: 'Bold', prefixIcon: 'e-bold-icon tb-icons' },
        { text: 'Italic', prefixIcon: 'e-italic-icon tb-icons' },
        { text: 'Underline', prefixIcon: 'e-underline-icon tb-icons' },
        { text: 'Color', prefixIcon: 'e-color-icon tb-icons' },
        { type: 'Separator' },
        { text: 'Sort A-Z', prefixIcon: 'e-ascending-icon tb-icons' },
        { text: 'Sort Z-A', prefixIcon: 'e-descending-icon tb-icons' }
    ]
});

toolbar.appendTo('#element');
```

### Extended Mode Behavior

**Default (Collapsed):**
- Visible items: Cut, Copy, Paste, Bold, Italic, Underline
- Hidden items: Color, Sort A-Z, Sort Z-A (in collapsed next row)
- Expand icon appears at the right end

**After Click Expand:**
- Hidden items reveal in next row
- Collapse icon replaces expand icon
- Click collapse to hide items again

### Expand/Collapse Interaction

Users can:
- **Click expand icon** → Show overflow items
- **Click collapse icon** → Hide overflow items
- **Press Enter on icon** → Toggle expanded state
- **Keyboard Tab** → Navigate to expand icon, then Enter to toggle

### Extended with Item Priorities

```typescript
let toolbar: Toolbar = new Toolbar({
    width: 400,
    overflowMode: 'Extended',
    items: [
        // Primary items (always visible in first row)
        { text: 'Save', prefixIcon: 'e-save-icon tb-icons', overflow: 'Show' },
        { text: 'Print', prefixIcon: 'e-print-icon tb-icons', overflow: 'Show' },
        { type: 'Separator', overflow: 'Show' },
        
        // Secondary items (expand row on demand)
        { text: 'Undo', prefixIcon: 'e-undo-icon tb-icons', overflow: 'Hide' },
        { text: 'Redo', prefixIcon: 'e-redo-icon tb-icons', overflow: 'Hide' },
        { type: 'Separator' },
        
        // Normal items (may appear in expanded row if space limited)
        { text: 'Format', prefixIcon: 'e-format-icon tb-icons' },
        { text: 'Styles', prefixIcon: 'e-style-icon tb-icons' }
    ]
});

toolbar.appendTo('#element');
```

### Use Cases for Extended Mode

- **Compact Editor Toolbar**: Hide less-used formatting options
- **Dashboard**: Extra controls revealed on demand
- **Mobile Toolbars**: Minimize screen space usage by default
- **Progressive Disclosure**: Basic tools visible, advanced options collapsed

### Extended Mode CSS Customization

```css
/* Style expand/collapse icons */
.e-toolbar .e-overflow-button {
    background-color: #007bff;
}

.e-toolbar .e-overflow-button:hover {
    background-color: #0056b3;
}

/* Style expanded row */
.e-toolbar .e-overflowbutton.e-active ~ .e-toolbar-items {
    display: flex;
    flex-wrap: wrap;
}
```

## Priority-Based Overflow

Use the `overflow` property on items to control which items appear on the toolbar vs. popup.

### Overflow Property Values

| Value | Behavior |
|-------|----------|
| `'Show'` | Item always appears on toolbar (primary priority) |
| `'Hide'` | Item always appears in popup (secondary priority) |
| `'None'` | No priority; moves to popup as space is needed (default) |

### Priority Example

```typescript
let toolbar: Toolbar = new Toolbar({
    width: 400,
    overflowMode: 'Popup',
    items: [
        // Primary (always visible)
        { text: 'Save', overflow: 'Show' },
        { text: 'Save All', overflow: 'Show' },
        { type: 'Separator', overflow: 'Show' },
        
        // Secondary (in popup by default)
        { text: 'Undo', overflow: 'Hide' },
        { text: 'Redo', overflow: 'Hide' },
        { type: 'Separator', overflow: 'Hide' },
        
        // No priority (moves to popup if space limited)
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
    ]
});
toolbar.appendTo('#element');
```

**Result:**
- Save, Save All always visible
- Undo, Redo initially in popup
- Cut, Copy, Paste move to popup if space runs out

### Always-in-Popup Items

Use `showAlwaysInPopup` property to keep specific items permanently in popup:

```typescript
let toolbar: Toolbar = new Toolbar({
    width: 600,
    overflowMode: 'Popup',
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' },
        { type: 'Separator' },
        { text: 'Advanced Options', showAlwaysInPopup: true },  // Always in popup
        { text: 'More Settings', showAlwaysInPopup: true }
    ]
});
toolbar.appendTo('#element');
```

**Note:** `showAlwaysInPopup` is ignored if `overflow: 'Show'` is set.

## Scroll Step Customization

The `scrollStep` property controls how many pixels the toolbar scrolls per arrow click (Scrollable mode only).

### Scroll Step Configuration

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    width: 400,
    overflowMode: 'Scrollable',
    scrollStep: 50,              // Scroll 50px per click (default: varies)
    items: [
        { prefixIcon: 'e-cut-icon tb-icons', text: 'Cut' },
        { prefixIcon: 'e-copy-icon tb-icons', text: 'Copy' },
        // ... 10+ more items to trigger scrolling
    ]
});

toolbar.appendTo('#element');
```

### Scroll Step Values

- **Small:** 30-50px per click (fine-grained control)
- **Medium:** 75-100px per click (standard)
- **Large:** 150-200px per click (quick navigation)

**Recommendation:** Match to typical item width:
- If items are ~80px wide, use `scrollStep: 160` (2 items per click)
- If items are ~100px wide, use `scrollStep: 200` (2 items per click)

## Mode Comparison

| Feature | Scrollable | Popup | MultiRow | Extended |
|---------|-----------|-------|----------|----------|
| **Space Used** | More (navigation arrows) | Less (dropdown arrow only) | More (vertical expansion) | Medium (expand/collapse icon) |
| **Item Visibility** | All items visible (scrollable) | Some items in dropdown | All items visible (wrapped) | Primary items visible; rest collapsible |
| **Navigation** | Arrow clicks, swipe, tab | Dropdown button click | Natural wrapping | Expand icon click or keyboard |
| **User Interaction** | Continuous scrolling | Single popup access | No scrolling needed | Toggle expand/collapse |
| **Layout** | Single horizontal line | Single line + popup | Multiple rows | Primary row + collapsible row |
| **Mobile** | Touch swipe supported | Touch-friendly | Touch-friendly | Touch-friendly |
| **RTL Support** | ✓ Arrows reverse | ✓ Supported | ✓ Wrapping reverses | ✓ Supported |
| **Best For** | Many items, frequent access | Space-limited, occasional access | Responsive layouts, many items | Compact UI, progressive disclosure |

### Choose Scrollable When:
- Items require frequent access
- Mobile/touch devices are primary users
- Maximum visibility preferred
- Horizontal space is available

### Choose Popup When:
- Limited horizontal space
- Items rarely accessed
- Cleaner, minimal UI preferred
- Mobile space is constrained

### Choose MultiRow When:
- Toolbar can expand vertically
- All items need equal visibility
- Responsive design required
- Rich text editor or similar use case

### Choose Extended When:
- Space optimization critical
- Advanced options used occasionally
- Progressive disclosure needed
- Compact mobile layouts

## Responsive Behavior

### Dynamic Mode Switching (CSS Media Queries)

Toolbar automatically switches mode based on width configuration:

```typescript
let toolbar: Toolbar = new Toolbar({
    width: '100%',                // Responsive width
    overflowMode: 'Scrollable',   // Default
    items: [
        // ... toolbar items
    ]
});

toolbar.appendTo('#element');

// On smaller screens, use CSS to trigger mode
// Option: Programmatically change overflowMode
if (window.innerWidth < 600) {
    toolbar.overflowMode = 'Popup';
    toolbar.refresh();
}
```

### Responsive Example with Media Query

```typescript
// TypeScript
let toolbar: Toolbar = new Toolbar({
    width: '100%',
    overflowMode: 'Scrollable',
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        // ...
    ]
});

toolbar.appendTo('#element');

// Listen for window resize
window.addEventListener('resize', () => {
    if (window.innerWidth < 600 && toolbar.overflowMode === 'Scrollable') {
        toolbar.overflowMode = 'Popup';
        toolbar.refresh();
    } else if (window.innerWidth >= 600 && toolbar.overflowMode === 'Popup') {
        toolbar.overflowMode = 'Scrollable';
        toolbar.refresh();
    }
});
```

---

**Quick Summary:**
- **Default:** Scrollable mode with navigation arrows
- **Constrained space:** Set `overflowMode: 'Popup'`
- **Item priority:** Use `overflow: 'Show'` / `'Hide'` / `'None'`
- **Scroll distance:** Customize with `scrollStep` property
- **Mobile:** Both modes support touch; Popup is space-efficient

## Text Mode for Buttons

The `showTextOn` property controls button text visibility in Toolbar vs. Popup modes, helping optimize space while keeping functionality visible.

### Text Mode Values

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    width: 350,
    overflowMode: 'Popup',
    items: [
        { 
            text: 'Cut', 
            prefixIcon: 'e-cut-icon tb-icons',
            showTextOn: 'Toolbar'  // Text only on main toolbar
        },
        { 
            text: 'Copy', 
            prefixIcon: 'e-copy-icon tb-icons',
            showTextOn: 'Popup'    // Text only in popup dropdown
        },
        { 
            text: 'Paste', 
            prefixIcon: 'e-paste-icon tb-icons',
            showTextOn: 'Both'     // Text on both toolbar and popup
        },
        { type: 'Separator' },
        { 
            text: 'Bold', 
            prefixIcon: 'e-bold-icon tb-icons'
            // Default: no text mode specified
        }
    ]
});

toolbar.appendTo('#element');
```

### Using CSS Classes for Text Display

```html
<!-- Text only visible in popup -->
<div class='e-popup-text'>
    <button class='e-btn e-tbar-btn'>
        <span class="e-cut-icon tb-icons e-icons"></span>
        <span>Cut</span>
    </button>
</div>

<!-- Text only visible on toolbar -->
<div class='e-toolbar-text'>
    <button class='e-btn e-tbar-btn'>
        <span class="e-copy-icon tb-icons e-icons"></span>
        <span>Copy</span>
    </button>
</div>
```

| showTextOn | Display Behavior | Use Case |
|-----------|------------------|----------|
| `Toolbar` | Icon + text on toolbar, icon-only in popup | Primary commands that need labels |
| `Popup` | Icon-only on toolbar, text in popup | Secondary commands; saves toolbar space |
| `Both` | Text displayed in both locations | Commands needing clarity everywhere |
| Not set (default) | Behavior depends on button configuration | Follows standard rendering |

### Space Optimization Example

```typescript
// Toolbar with limited space
let compactToolbar: Toolbar = new Toolbar({
    width: 300,  // Limited width
    overflowMode: 'Popup',
    items: [
        // Primary tools always show text
        { text: 'Save', prefixIcon: 'e-save-icon tb-icons', showTextOn: 'Toolbar' },
        { text: 'Undo', prefixIcon: 'e-undo-icon tb-icons', showTextOn: 'Toolbar' },
        { type: 'Separator' },
        // Secondary tools: icon-only on toolbar, text in popup
        { text: 'Format', prefixIcon: 'e-format-icon tb-icons', showTextOn: 'Popup' },
        { text: 'Styles', prefixIcon: 'e-style-icon tb-icons', showTextOn: 'Popup' },
        { text: 'Templates', prefixIcon: 'e-template-icon tb-icons', showTextOn: 'Popup' }
    ]
});

compactToolbar.appendTo('#element');
```

Result:
- **Toolbar displays:** Save, Undo (with text), Format, Styles, Templates (icon-only)
- **Popup shows:** Format, Styles, Templates (with full text labels for clarity)
- **Total space saved:** ~40% reduction while maintaining usability



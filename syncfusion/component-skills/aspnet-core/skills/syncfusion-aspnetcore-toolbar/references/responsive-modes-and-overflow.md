# Responsive Modes and Overflow Handling

## Table of Contents
- [Overview](#overview)
- [Scrollable Mode](#scrollable-mode)
- [Popup Mode](#popup-mode)
- [MultiRow Mode](#multirow-mode)
- [Extended Mode](#extended-mode)
- [Overflow Priority System](#overflow-priority-system)
- [ShowAlwaysInPopup Property](#showalwaysinpopup-property)
- [ShowTextOn Property](#showtexton-property)
- [Responsive Behavior Examples](#responsive-behavior-examples)

## Overview

The Toolbar component automatically handles overflow when content exceeds available width. Two responsive modes control how overflowing items are displayed:

- **Scrollable** (default): Displays all items in a single line with horizontal scrolling and navigation arrows
- **Popup**: Moves overflowing items to a dropdown popup menu while keeping frequently used items visible

Responsive modes are essential for adapting toolbars to different screen sizes and container widths. The `overflowMode` property selects the behavior.

## Scrollable Mode

Scrollable is the default overflow mode and is ideal for toolbars that need to show all commands at once with minimal interaction.

### Characteristics

- Items display in a **single horizontal line**
- **Navigation arrows** appear at left and right edges when items overflow
- Users can **click arrows** or **drag/swipe** to view hidden items
- Items maintain their order; scrolling reveals hidden commands
- Smooth continuous scrolling with long press on arrows
- Full keyboard and touch support

### How Scrollable Mode Works

When the toolbar width is insufficient to display all items:

1. Items are arranged in a single line within the container
2. Left navigation arrow appears (initially disabled if at start)
3. Right navigation arrow appears (initially disabled if at end)
4. Clicking arrows reveals hidden items to the left or right
5. Once reaching the first or last item, the corresponding arrow disables
6. Touch swipe on desktop or touch swipe on mobile reveals hidden items

### Configuration

```html
<ejs-toolbar id="scrollableToolbar" overflowMode="Scrollable" width="400px">
    <e-toolbar-items>
        <e-toolbar-item text="Cut" prefixIcon="e-cut-icon"></e-toolbar-item>
        <e-toolbar-item text="Copy" prefixIcon="e-copy-icon"></e-toolbar-item>
        <e-toolbar-item text="Paste" prefixIcon="e-paste-icon"></e-toolbar-item>
        <e-toolbar-item type="Separator"></e-toolbar-item>
        <e-toolbar-item text="Bold" prefixIcon="e-bold-icon"></e-toolbar-item>
        <e-toolbar-item text="Italic" prefixIcon="e-italic-icon"></e-toolbar-item>
        <e-toolbar-item text="Underline" prefixIcon="e-underline-icon"></e-toolbar-item>
        <e-toolbar-item text="Color Picker" prefixIcon="e-color-icon"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

With a width of 400px, this toolbar displays approximately 4-5 items before requiring scroll. Navigation arrows enable users to see remaining items.

### Scroll Interaction Patterns

**Mouse Interaction**:
- Click left arrow: Scrolls left to reveal hidden items
- Click right arrow: Scrolls right to reveal hidden items
- Hold arrow: Continuous scrolling
- Hover over arrow: Visual feedback

**Touch Interaction**:
- Swipe left on items: Reveals items to the right
- Swipe right on items: Reveals items to the left
- Touch and hold arrow: Continuous scrolling

**Keyboard**:
- Arrow keys: Navigate between items
- Tab key: Navigate to next tabbable item (if tabIndex set)

### Scroll Step Customization

Control scroll distance using the `scrollStep` property:

```html
<ejs-toolbar id="customScrollToolbar" overflowMode="Scrollable" scrollStep="80">
    <!-- items -->
</ejs-toolbar>
```

`scrollStep="80"` means each arrow click scrolls 80 pixels. Increase for larger jumps, decrease for finer control.

### Scrollable Mode Example

```html
<ejs-toolbar id="fullScrollableExample" overflowMode="Scrollable" width="500px" scrollStep="100">
    <e-toolbar-items>
        <!-- File operations -->
        <e-toolbar-item text="New" prefixIcon="e-new-icon" tooltipText="New"></e-toolbar-item>
        <e-toolbar-item text="Open" prefixIcon="e-open-icon" tooltipText="Open"></e-toolbar-item>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon" tooltipText="Save"></e-toolbar-item>
        <e-toolbar-item text="Print" prefixIcon="e-print-icon" tooltipText="Print"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Edit operations -->
        <e-toolbar-item text="Undo" prefixIcon="e-undo-icon" tooltipText="Undo"></e-toolbar-item>
        <e-toolbar-item text="Redo" prefixIcon="e-redo-icon" tooltipText="Redo"></e-toolbar-item>
        <e-toolbar-item text="Find" prefixIcon="e-find-icon" tooltipText="Find"></e-toolbar-item>
        <e-toolbar-item text="Replace" prefixIcon="e-replace-icon" tooltipText="Replace"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Formatting -->
        <e-toolbar-item text="Bold" prefixIcon="e-bold-icon" tooltipText="Bold"></e-toolbar-item>
        <e-toolbar-item text="Italic" prefixIcon="e-italic-icon" tooltipText="Italic"></e-toolbar-item>
        <e-toolbar-item text="Underline" prefixIcon="e-underline-icon" tooltipText="Underline"></e-toolbar-item>
        <e-toolbar-item text="Strikethrough" prefixIcon="e-strikethrough-icon" tooltipText="Strikethrough"></e-toolbar-item>
        <e-toolbar-item text="Color" prefixIcon="e-color-icon" tooltipText="Color"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

## Popup Mode

Popup mode moves overflowing items to a dropdown menu, keeping the toolbar compact while maintaining access to all commands.

### Characteristics

- Most-used items **stay visible** on the toolbar
- Overflowing items move to a **dropdown popup**
- Users open popup via **dropdown arrow** at toolbar end
- Items can have **priority** to stay visible (primary) or move to popup (secondary)
- Text visibility customizable per item
- Ideal for space-constrained interfaces

### How Popup Mode Works

1. Toolbar measures available width
2. Items with `overflow="show"` priority stay visible (primary)
3. Remaining items move to popup (secondary priority)
4. If primary items still overflow, they move to popup top
5. Dropdown arrow appears to access popup items
6. Clicking arrow opens/closes popup menu

### Configuration

```html
<ejs-toolbar id="popupToolbar" overflowMode="Popup">
    <e-toolbar-items>
        <!-- Primary items (stay visible) -->
        <e-toolbar-item text="New" prefixIcon="e-new-icon" overflow="show"></e-toolbar-item>
        <e-toolbar-item text="Open" prefixIcon="e-open-icon" overflow="show"></e-toolbar-item>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon" overflow="show"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Secondary items (go to popup) -->
        <e-toolbar-item text="Print" prefixIcon="e-print-icon" overflow="hide"></e-toolbar-item>
        <e-toolbar-item text="Export" prefixIcon="e-export-icon" overflow="hide"></e-toolbar-item>
        <e-toolbar-item text="Properties" prefixIcon="e-properties-icon" overflow="hide"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

### Overflow Priority System

Control item visibility with the `overflow` property:

| Value | Behavior | Use Case |
|-------|----------|----------|
| `show` | **Always visible** on toolbar with primary priority | Most-used commands (Save, Open, New) |
| `hide` | **Always in popup** with secondary priority | Less-used commands (Export, Properties) |
| `none` (default) | **Normal order**; moves to popup as space fills | General commands |

If primary (`show`) items exceed available space, they move to popup top, maintaining their order before secondary items.

### Example: Tiered Toolbar

```html
<ejs-toolbar id="tieredToolbar" overflowMode="Popup" width="400px">
    <e-toolbar-items>
        <!-- Tier 1: Always visible -->
        <e-toolbar-item text="New" prefixIcon="e-new-icon" overflow="show" tooltipText="New"></e-toolbar-item>
        <e-toolbar-item text="Open" prefixIcon="e-open-icon" overflow="show" tooltipText="Open"></e-toolbar-item>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon" overflow="show" tooltipText="Save"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Tier 2: Visible if space allows, else popup -->
        <e-toolbar-item text="Undo" prefixIcon="e-undo-icon" overflow="none"></e-toolbar-item>
        <e-toolbar-item text="Redo" prefixIcon="e-redo-icon" overflow="none"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Tier 3: Always in popup -->
        <e-toolbar-item text="Print" prefixIcon="e-print-icon" overflow="hide" tooltipText="Print"></e-toolbar-item>
        <e-toolbar-item text="Export" prefixIcon="e-export-icon" overflow="hide" tooltipText="Export"></e-toolbar-item>
        <e-toolbar-item text="Properties" prefixIcon="e-properties-icon" overflow="hide" tooltipText="Properties"></e-toolbar-item>
        <e-toolbar-item text="Settings" prefixIcon="e-settings-icon" overflow="hide" tooltipText="Settings"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

At 400px width:
- Items with `overflow="show"` (New, Open, Save) stay visible
- Items with `overflow="none"` (Undo, Redo) may be visible or move to popup depending on space
- Items with `overflow="hide"` (Print, Export, Properties, Settings) go to popup

## MultiRow Mode

MultiRow mode displays overflowing toolbar items as inline rows of the toolbar, allowing multiple rows of commands to be visible simultaneously.

### Characteristics

- Overflowing items display in a **second (or more) row**
- All items remain **visible and accessible**
- Rows wrap automatically based on available width
- No dropdown menu or hidden items
- Ideal for wide display areas with room for multiple rows
- Touch-friendly with no scrolling required

### Configuration

```html
<ejs-toolbar id="multirowToolbar" overflowMode="MultiRow">
    <e-toolbar-items>
        <!-- Row 1 items -->
        <e-toolbar-item text="New" prefixIcon="e-new-icon"></e-toolbar-item>
        <e-toolbar-item text="Open" prefixIcon="e-open-icon"></e-toolbar-item>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Row 2 items (wrap to next row if needed) -->
        <e-toolbar-item text="Print" prefixIcon="e-print-icon"></e-toolbar-item>
        <e-toolbar-item text="Export" prefixIcon="e-export-icon"></e-toolbar-item>
        <e-toolbar-item text="Settings" prefixIcon="e-settings-icon"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

### MultiRow Example

```html
<ejs-toolbar id="dashboardToolbar" overflowMode="MultiRow" width="100%">
    <e-toolbar-items>
        <!-- File operations (Row 1) -->
        <e-toolbar-item text="New" prefixIcon="e-new-icon" tooltipText="New"></e-toolbar-item>
        <e-toolbar-item text="Open" prefixIcon="e-open-icon" tooltipText="Open"></e-toolbar-item>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon" tooltipText="Save"></e-toolbar-item>
        <e-toolbar-item text="Print" prefixIcon="e-print-icon" tooltipText="Print"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Formatting (Row 2) -->
        <e-toolbar-item text="Bold" prefixIcon="e-bold-icon" tooltipText="Bold"></e-toolbar-item>
        <e-toolbar-item text="Italic" prefixIcon="e-italic-icon" tooltipText="Italic"></e-toolbar-item>
        <e-toolbar-item text="Underline" prefixIcon="e-underline-icon" tooltipText="Underline"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Layout (Row 3) -->
        <e-toolbar-item text="Align Left" prefixIcon="e-align-left-icon" tooltipText="Align Left"></e-toolbar-item>
        <e-toolbar-item text="Align Center" prefixIcon="e-align-center-icon" tooltipText="Align Center"></e-toolbar-item>
        <e-toolbar-item text="Align Right" prefixIcon="e-align-right-icon" tooltipText="Align Right"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

All items are visible across multiple rows, ensuring full access to all commands without navigation or menus.

## Extended Mode

Extended mode hides overflowing toolbar items in the next row and displays them only when expand icons are clicked. If the popup content overflows the height of the page, remaining elements are hidden.

### Characteristics

- Overflowing items move to a **collapsible row** below the main toolbar
- **Expand/collapse icons** control visibility of the second row
- Compact toolbar appearance when collapsed
- Items in collapsed row move up to main row when primary items are hidden
- If popup overflows page height, remaining elements are **automatically hidden**
- Ideal for space-constrained interfaces with many commands

### Configuration

```html
<ejs-toolbar id="extendedToolbar" overflowMode="Extended">
    <e-toolbar-items>
        <!-- Primary items (always visible) -->
        <e-toolbar-item text="New" prefixIcon="e-new-icon"></e-toolbar-item>
        <e-toolbar-item text="Open" prefixIcon="e-open-icon"></e-toolbar-item>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon"></e-toolbar-item>
        
        <!-- Extended items (hidden until expanded) -->
        <e-toolbar-item text="Print" prefixIcon="e-print-icon"></e-toolbar-item>
        <e-toolbar-item text="Export" prefixIcon="e-export-icon"></e-toolbar-item>
        <e-toolbar-item text="Properties" prefixIcon="e-properties-icon"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

### Extended Mode Behavior

Initial state:
- Shows primary items with expand icon at the end
- Collapsed row with secondary items hidden

Expanded state:
- Shows both primary and secondary items
- Collapse icon available to hide secondary row
- Auto-collapse if no space

### Extended Mode Example

```html
<ejs-toolbar id="compactToolbar" overflowMode="Extended" width="500px">
    <e-toolbar-items>
        <!-- Primary toolbar items -->
        <e-toolbar-item text="Cut" prefixIcon="e-cut-icon" overflow="show" tooltipText="Cut"></e-toolbar-item>
        <e-toolbar-item text="Copy" prefixIcon="e-copy-icon" overflow="show" tooltipText="Copy"></e-toolbar-item>
        <e-toolbar-item text="Paste" prefixIcon="e-paste-icon" overflow="show" tooltipText="Paste"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Extended row items -->
        <e-toolbar-item text="Bold" prefixIcon="e-bold-icon" tooltipText="Bold"></e-toolbar-item>
        <e-toolbar-item text="Italic" prefixIcon="e-italic-icon" tooltipText="Italic"></e-toolbar-item>
        <e-toolbar-item text="Underline" prefixIcon="e-underline-icon" tooltipText="Underline"></e-toolbar-item>
        <e-toolbar-item text="Strikethrough" prefixIcon="e-strikethrough-icon" tooltipText="Strikethrough"></e-toolbar-item>
        <e-toolbar-item text="Color" prefixIcon="e-color-icon" tooltipText="Font Color"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

Toolbar displays with expand/collapse icon. Users can toggle visibility of formatting items without popup menus or scrolling.

### Important: Page Height Overflow

In Extended mode, if the popup content overflows the page height, remaining elements are automatically hidden:

```html
<!-- When visible overflow items exceed viewport height -->
<ejs-toolbar id="tallPopupToolbar" overflowMode="Extended">
    <e-toolbar-items>
        <!-- If extended row would go off-screen, items are hidden -->
        <!-- Users can scroll within the extended row or it auto-collapses -->
    </e-toolbar-items>
</ejs-toolbar>
```

This prevents toolbar from creating unusable overflow that extends beyond the visible screen.

## Overflow Priority System

### Default Priority (none)

When `overflow` is not specified or set to `none`, items move to popup in the order they're defined:

```html
<!-- Items move to popup in this order: Bold, Italic, Underline -->
<e-toolbar-item text="Bold" prefixIcon="e-bold-icon"></e-toolbar-item>
<e-toolbar-item text="Italic" prefixIcon="e-italic-icon"></e-toolbar-item>
<e-toolbar-item text="Underline" prefixIcon="e-underline-icon"></e-toolbar-item>
```

### Primary Priority (show)

Primary items always display on the toolbar:

```html
<e-toolbar-item text="Save" prefixIcon="e-save-icon" overflow="show"></e-toolbar-item>
```

If primary items overflow available space, they still move to popup but maintain top position.

### Secondary Priority (hide)

Secondary items always move to popup:

```html
<e-toolbar-item text="Settings" prefixIcon="e-settings-icon" overflow="hide"></e-toolbar-item>
```

These appear after any default priority items in the popup.

### Mixed Priority Example

```html
<ejs-toolbar id="mixedPriorityToolbar" overflowMode="Popup" width="300px">
    <e-toolbar-items>
        <!-- Always visible (primary) -->
        <e-toolbar-item text="New" overflow="show"></e-toolbar-item>
        <e-toolbar-item text="Open" overflow="show"></e-toolbar-item>
        <e-toolbar-item text="Save" overflow="show"></e-toolbar-item>
        
        <!-- Normal priority (visible if space allows) -->
        <e-toolbar-item text="Undo"></e-toolbar-item>
        <e-toolbar-item text="Redo"></e-toolbar-item>
        
        <!-- Always in popup (secondary) -->
        <e-toolbar-item text="Print" overflow="hide"></e-toolbar-item>
        <e-toolbar-item text="Export" overflow="hide"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

Popup contains: [Undo (if overflow), Redo (if overflow), Print, Export]

## ShowAlwaysInPopup Property

The `showAlwaysInPopup` property forces an item to remain permanently in the popup, even if space is available on the toolbar. This is useful for less-used or advanced features:

```html
<e-toolbar-item text="Advanced Settings" prefixIcon="e-settings-icon" 
                showAlwaysInPopup="true" overflow="hide"></e-toolbar-item>
```

**Important**: `showAlwaysInPopup` is **not applicable** when `overflow="show"` (always-visible items cannot be forced to popup).

### Use Case: Hidden Features

```html
<ejs-toolbar id="appToolbar" overflowMode="Popup">
    <e-toolbar-items>
        <!-- Common operations -->
        <e-toolbar-item text="New" overflow="show"></e-toolbar-item>
        <e-toolbar-item text="Open" overflow="show"></e-toolbar-item>
        <e-toolbar-item text="Save" overflow="show"></e-toolbar-item>
        
        <!-- Advanced/hidden features -->
        <e-toolbar-item text="Developer Tools" showAlwaysInPopup="true" 
                       overflow="hide"></e-toolbar-item>
        <e-toolbar-item text="Diagnostic Report" showAlwaysInPopup="true" 
                       overflow="hide"></e-toolbar-item>
        <e-toolbar-item text="Reset to Defaults" showAlwaysInPopup="true" 
                       overflow="hide"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

Advanced features only appear in the popup menu, reducing toolbar clutter.

## ShowTextOn Property

The `showTextOn` property controls button text visibility across toolbar and popup:

| Value | Behavior | When to Use |
|-------|----------|-----------|
| `Both` (default) | Text visible in **both toolbar and popup** | Standard buttons |
| `Toolbar` | Text visible **only on toolbar** | Space-constrained toolbars |
| `Overflow` | Text visible **only in popup** | Icon-only toolbar with descriptive popup |

### Text Visibility Example

```html
<ejs-toolbar id="textVisibilityToolbar" overflowMode="Popup" width="350px">
    <e-toolbar-items>
        <!-- Text in both places (default) -->
        <e-toolbar-item text="Save" prefixIcon="e-save-icon" 
                       showTextOn="Both"></e-toolbar-item>
        
        <!-- Text only in toolbar (compact toolbar, descriptive popup) -->
        <e-toolbar-item text="Print" prefixIcon="e-print-icon" 
                       showTextOn="Toolbar"></e-toolbar-item>
        
        <!-- Text only in popup (icon-only toolbar, full details in popup) -->
        <e-toolbar-item text="Export" prefixIcon="e-export-icon" 
                       showTextOn="Overflow"></e-toolbar-item>
        
        <!-- Icon-only (no text anywhere) -->
        <e-toolbar-item text="Settings" prefixIcon="e-settings-icon" 
                       showTextOn="Overflow" tooltipText="Settings"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

Behavior:
- **Toolbar**: "Save" with text, "Print" with text, "Export" and "Settings" icons only
- **Popup**: All items show full text for clarity

### Icon-Only Toolbar Pattern

For compact toolbars showing only icons:

```html
<ejs-toolbar id="iconOnlyToolbar" width="200px">
    <e-toolbar-items>
        <e-toolbar-item text="Cut" prefixIcon="e-cut-icon" 
                       showTextOn="Overflow" tooltipText="Cut (Ctrl+X)"></e-toolbar-item>
        <e-toolbar-item text="Copy" prefixIcon="e-copy-icon" 
                       showTextOn="Overflow" tooltipText="Copy (Ctrl+C)"></e-toolbar-item>
        <e-toolbar-item text="Paste" prefixIcon="e-paste-icon" 
                       showTextOn="Overflow" tooltipText="Paste (Ctrl+V)"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

Users see compact icon buttons with tooltip hints, but full text labels appear in the popup menu.

## Responsive Behavior Examples

### Responsive Table Editor Toolbar

```html
<ejs-toolbar id="tableEditorToolbar" overflowMode="Popup" width="100%">
    <e-toolbar-items>
        <!-- Essential file operations (always visible) -->
        <e-toolbar-item text="New" prefixIcon="e-new-icon" overflow="show"></e-toolbar-item>
        <e-toolbar-item text="Open" prefixIcon="e-open-icon" overflow="show"></e-toolbar-item>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon" overflow="show"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Formatting (visible if space) -->
        <e-toolbar-item text="Bold" prefixIcon="e-bold-icon" showTextOn="Overflow"></e-toolbar-item>
        <e-toolbar-item text="Italic" prefixIcon="e-italic-icon" showTextOn="Overflow"></e-toolbar-item>
        <e-toolbar-item text="Underline" prefixIcon="e-underline-icon" showTextOn="Overflow"></e-toolbar-item>
        
        <!-- Advanced features (popup only) -->
        <e-toolbar-item text="Insert Table" prefixIcon="e-table-icon" 
                       overflow="hide" showAlwaysInPopup="true"></e-toolbar-item>
        <e-toolbar-item text="Insert Chart" prefixIcon="e-chart-icon" 
                       overflow="hide" showAlwaysInPopup="true"></e-toolbar-item>
        <e-toolbar-item text="Insert Image" prefixIcon="e-image-icon" 
                       overflow="hide" showAlwaysInPopup="true"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

On wide screens: All buttons visible with text
On narrow screens: Icons on toolbar, popup contains formatting and advanced features with full text

### Mobile-Friendly Dashboard Filter Toolbar

**Toolbar:**
```html
<ejs-toolbar id="filterToolbar" overflowMode="Popup" width="100%" scrollStep="150">
    <e-toolbar-items>
        <!-- Always visible filters -->
        <e-toolbar-item type="Input" align="Left" template="#statusFilter"></e-toolbar-item>
        
        <!-- Secondary filters to popup -->
        <e-toolbar-item type="Input" overflow="hide" template="#dateFilter"></e-toolbar-item>
        
        <!-- Action buttons -->
        <e-toolbar-item text="Reset" prefixIcon="e-reset-icon" align="Right"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

**Template Definitions:**
```html
<div id="statusFilter">
    <ejs-dropdownlist id="statusFilter" dataSource="@ViewBag.Statuses" 
                     width="120px" placeholder="Status"></ejs-dropdownlist>
</div>

<div id="dateFilter">
    <ejs-dropdownlist id="dateFilter" dataSource="@ViewBag.Dates" 
                     width="120px" placeholder="Date Range"></ejs-dropdownlist>
</div>
```

Provides responsive filtering with essential controls always accessible and advanced options in popup.

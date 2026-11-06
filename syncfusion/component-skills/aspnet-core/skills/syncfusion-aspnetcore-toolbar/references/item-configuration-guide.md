# Item Configuration Guide for ASP.NET Core Toolbar

## Table of Contents
- [Overview](#overview)
- [Button Items](#button-items)
- [Separator Items](#separator-items)
- [Input Items](#input-items)
- [Tab Key Navigation](#tab-key-navigation)
- [Item Properties Reference](#item-properties-reference)
- [Complete Examples](#complete-examples)

## Overview

The Toolbar renders items by defining an array of items. Items can be constructed with different built-in command types or custom item templates. Each item type serves a specific purpose:

- **Button**: Default type for clickable commands with text, icons, and tooltips
- **Separator**: Visual divider between logical groups of commands
- **Input**: Container for embedded form controls (textboxes, dropdowns, etc.)
- **Custom**: Template-based items for complex controls

Items are rendered within `<e-toolbar-items>` collection using `<e-toolbar-item>` TagHelper elements.

## Button Items

Button is the default command type and the most commonly used item type. Buttons can display text, icons, or both, and are used to trigger actions or commands.

### Basic Button

The simplest button item requires only `text`:

```html
<e-toolbar-item text="Cut"></e-toolbar-item>
```

### Button with Prefix Icon

Add an icon before the text using the `prefixIcon` property:

```html
<e-toolbar-item text="Cut" prefixIcon="e-cut-icon tb-icons"></e-toolbar-item>
```

The icon class must correspond to a valid icon font class. Syncfusion provides built-in icon sets; custom icons can be added via CSS:

```css
.e-cut-icon::before {
    content: "\e700";  /* Icon unicode character */
}
```

### Button with Suffix Icon

Add an icon after the text using the `suffixIcon` property:

```html
<e-toolbar-item text="Sort" suffixIcon="e-dropdown-icon"></e-toolbar-item>
```

**Note**: If both `prefixIcon` and `suffixIcon` are specified, only `prefixIcon` is displayed.

### Button Width

Control button width with the `width` property:

```html
<e-toolbar-item text="Wide Button" width="120px"></e-toolbar-item>
```

Width can be specified in pixels (e.g., `120px`) or percentage (e.g., `25%`). If not specified, button width adjusts to content.

### Button with Tooltip

Add hover tooltips using the `tooltipText` property:

```html
<e-toolbar-item text="Bold" prefixIcon="e-bold-icon" tooltipText="Make text bold (Ctrl+B)"></e-toolbar-item>
```

Tooltips appear on mouse hover and provide helpful context about button functions.

### Button Identification

Optionally assign an ID to a button for programmatic access:

```html
<e-toolbar-item id="saveButton" text="Save" prefixIcon="e-save-icon" tooltipText="Save document"></e-toolbar-item>
```

If no ID is provided, an auto-generated ID is assigned. The ID is used in event handlers and JavaScript references.

### Button Item Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `text` | `string` | Display text for the button | `text="Copy"` |
| `id` | `string` | Unique identifier (auto-generated if omitted) | `id="copyBtn"` |
| `prefixIcon` | `string` | CSS class for icon before text | `prefixIcon="e-icons e-copy"` |
| `suffixIcon` | `string` | CSS class for icon after text | `suffixIcon="e-dropdown"` |
| `width` | `string` | Button width in px or % | `width="100px"` |
| `tooltipText` | `string` | Hover tooltip text | `tooltipText="Copy selection"` |
| `cssClass` | `string` | Additional CSS classes | `cssClass="primary-btn"` |
| `align` | `enum` | Item alignment (Left, Center, Right) | `align="Right"` |
| `showTextOn` | `enum` | Text visibility (Both, Overflow, Toolbar) | `showTextOn="Toolbar"` |

### Complete Button Example

```html
<ejs-toolbar id="buttonToolbar">
    <e-toolbar-items>
        <e-toolbar-item id="cutBtn" text="Cut" prefixIcon="e-cut-icon" 
                       tooltipText="Cut (Ctrl+X)" width="90px"></e-toolbar-item>
        
        <e-toolbar-item id="copyBtn" text="Copy" prefixIcon="e-copy-icon" 
                       tooltipText="Copy (Ctrl+C)"></e-toolbar-item>
        
        <e-toolbar-item id="pasteBtn" text="Paste" prefixIcon="e-paste-icon" 
                       tooltipText="Paste (Ctrl+V)"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <e-toolbar-item id="printBtn" text="Print" prefixIcon="e-print-icon" 
                       tooltipText="Print document" align="Right"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

## Separator Items

Separators are visual dividers that group related commands together. They add vertical lines between logical command groups without any interactive functionality.

### Basic Separator

Specify `type="Separator"` to create a dividing line:

```html
<e-toolbar-item type="Separator"></e-toolbar-item>
```

### Separator Behavior

**Important constraints**:
- Separators at the beginning or end of the toolbar are **not visible**
- Separators between commands display as vertical dividing lines
- Multiple consecutive separators collapse into a single visible line
- Separators do not consume toolbar width in scrollable mode

### Separator Example

```html
<ejs-toolbar id="separatorToolbar">
    <e-toolbar-items>
        <!-- File operations -->
        <e-toolbar-item text="New" prefixIcon="e-new-icon"></e-toolbar-item>
        <e-toolbar-item text="Open" prefixIcon="e-open-icon"></e-toolbar-item>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon"></e-toolbar-item>
        
        <!-- Separator: groups file operations from editing -->
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Editing operations -->
        <e-toolbar-item text="Undo" prefixIcon="e-undo-icon"></e-toolbar-item>
        <e-toolbar-item text="Redo" prefixIcon="e-redo-icon"></e-toolbar-item>
        
        <!-- Separator: groups editing from formatting -->
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Formatting operations -->
        <e-toolbar-item text="Bold" prefixIcon="e-bold-icon"></e-toolbar-item>
        <e-toolbar-item text="Italic" prefixIcon="e-italic-icon"></e-toolbar-item>
        <e-toolbar-item text="Underline" prefixIcon="e-underline-icon"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

## Input Items

Input items are containers for embedding form controls within the toolbar. They're used for inputs, selections, or configurations that require user interaction beyond simple button clicks.

### Input Item Type

Set `type="Input"` to create an input container:

```html
<e-toolbar-item type="Input" template="#inputTemplate"></e-toolbar-item>
```

### NumericTextBox

NumericTextBox provides formatted numeric input with increment/decrement controls:

**Toolbar Item:**
```html
<e-toolbar-item type="Input" template="#zoomLevel"></e-toolbar-item>
```

**Template Definition:**
```html
<div id="zoomLevel">
    <ejs-numerictextbox id="zoomLevel" format="n0" min="50" max="200" 
                       step="10" value="100" width="80px" 
                       placeholder="Zoom %"></ejs-numerictextbox>
</div>
```

**NumericTextBox properties**:
- `format`: Number format (e.g., `n2` for 2 decimal places)
- `min` / `max`: Range boundaries
- `step`: Increment value for spinner buttons
- `value`: Initial value
- `width`: Control width

### DropDownList

DropDownList provides selection from predefined options:

**Toolbar Item:**
```html
<e-toolbar-item type="Input" template="#fontSelector"></e-toolbar-item>
```

**Template Definition:**
```html
<div id="fontSelector">
    <ejs-dropdownlist id="fontSelector" dataSource="@ViewBag.Fonts" 
                     fields="@(new { text = "text", value = "value" })" 
                     value="Arial" width="120px">
    </ejs-dropdownlist>
</div>
```

**DropDownList properties**:
- `dataSource`: Array of options
- `fields`: Map object properties to display and value fields
- `value`: Initially selected value
- `width`: Dropdown width
- `placeholder`: Placeholder text when no selection

**Code-Behind**:

```csharp
public void OnGet()
{
    ViewBag.Fonts = new List<dynamic>()
    {
        new { text = "Arial", value = "Arial" },
        new { text = "Times New Roman", value = "TimesNewRoman" },
        new { text = "Courier New", value = "CourierNew" },
        new { text = "Verdana", value = "Verdana" }
    };
}
```

### RadioButton

RadioButton provides mutually exclusive options:

**Toolbar Items:**
```html
<e-toolbar-item type="Input" template="#viewModeList"></e-toolbar-item>
<e-toolbar-item type="Input" template="#viewModeGrid"></e-toolbar-item>
```

**Template Definitions:**
```html
<div id="viewModeList">
    <ejs-radiobutton id="viewMode" label="List View" name="view" 
                    value="list" checked="true"></ejs-radiobutton>
</div>

<div id="viewModeGrid">
    <ejs-radiobutton id="viewMode2" label="Grid View" name="view" 
                    value="grid"></ejs-radiobutton>
</div>
```

**RadioButton properties**:
- `label`: Display label text
- `name`: Group name for mutually exclusive options
- `value`: Button value
- `checked`: Initially selected state

### Complete Input Items Example

**Toolbar:**
```html
<ejs-toolbar id="inputToolbar">
    <e-toolbar-items>
        <!-- Font selector -->
        <e-toolbar-item type="Input" template="#fontFamily"></e-toolbar-item>
        
        <!-- Font size -->
        <e-toolbar-item type="Input" template="#fontSize"></e-toolbar-item>
        
        <!-- Separator -->
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- View mode selector -->
        <e-toolbar-item type="Input" template="#listView"></e-toolbar-item>
        <e-toolbar-item type="Input" template="#gridView"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

**Template Definitions:**
```html
<div id="fontFamily">
    <span style="margin: 0 10px;">Font:</span>
    <ejs-dropdownlist id="fontFamily" dataSource="@ViewBag.Fonts" 
                     width="120px">
    </ejs-dropdownlist>
</div>

<div id="fontSize">
    <span style="margin: 0 10px;">Size:</span>
    <ejs-numerictextbox id="fontSize" format="n0" value="12" 
                       min="8" max="72" width="60px">
    </ejs-numerictextbox>
</div>

<div id="listView">
    <ejs-radiobutton id="listView" label="List" name="viewMode" 
                    value="list" checked="true"></ejs-radiobutton>
</div>

<div id="gridView">
    <ejs-radiobutton id="gridView" label="Grid" name="viewMode" 
                    value="grid"></ejs-radiobutton>
</div>
```

## Tab Key Navigation

By default, toolbar items are navigable using arrow keys. Enable Tab key navigation using the `tabIndex` property on individual items.

### TabIndex Property

Set `tabIndex` to a positive integer to include the item in the tab order:

```html
<e-toolbar-item text="First Item" tabIndex="1"></e-toolbar-item>
<e-toolbar-item text="Second Item" tabIndex="2"></e-toolbar-item>
```

### TabIndex Behavior

- **Positive value** (1, 2, 3...): Item is included in tab order, navigated in ascending order
- **Zero**: Item is included in tab order based on DOM element order
- **Negative value**: Item is excluded from tab order

### Tab Navigation Example

```html
<ejs-toolbar id="tabbableToolbar">
    <e-toolbar-items>
        <e-toolbar-item text="Item 1" tabIndex="1"></e-toolbar-item>
        <e-toolbar-item text="Item 2" tabIndex="2"></e-toolbar-item>
        <e-toolbar-item text="Item 3" tabIndex="3"></e-toolbar-item>
        <e-toolbar-item text="Item 4" tabIndex="4"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    // Test keyboard navigation:
    // Press Tab to move forward through items (Item 1 -> Item 2 -> Item 3 -> Item 4)
    // Press Shift+Tab to move backward
    // Press Arrow keys to navigate within the toolbar
</script>
```

### Tab Order with Zero

When all items have `tabIndex="0"`, navigation follows DOM element order:

```html
<e-toolbar-item text="First in DOM" tabIndex="0"></e-toolbar-item>
<e-toolbar-item text="Second in DOM" tabIndex="0"></e-toolbar-item>
<e-toolbar-item text="Third in DOM" tabIndex="0"></e-toolbar-item>
```

Pressing Tab navigates: First → Second → Third → (leaves toolbar) → (returns to First)

## Item Properties Reference

### Common Item Properties

All item types support these common properties:

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `text` | `string` | Display text | `text="Save"` |
| `id` | `string` | Unique identifier | `id="saveItem"` |
| `type` | `enum` | Item type: Button (default), Separator, Input | `type="Separator"` |
| `cssClass` | `string` | Additional CSS classes | `cssClass="custom-btn"` |
| `align` | `enum` | Alignment: Left (default), Center, Right | `align="Right"` |
| `tabIndex` | `number` | Tab order (positive/zero/negative) | `tabIndex="1"` |
| `overflow` | `enum` | Overflow behavior: none (default), show, hide | `overflow="show"` |
| `showAlwaysInPopup` | `bool` | Always visible in popup | `showAlwaysInPopup="true"` |

### Button-Specific Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `prefixIcon` | `string` | Icon class before text | `prefixIcon="e-icons e-cut"` |
| `suffixIcon` | `string` | Icon class after text | `suffixIcon="e-dropdown"` |
| `width` | `string` | Button width | `width="100px"` |
| `tooltipText` | `string` | Hover tooltip | `tooltipText="Cut (Ctrl+X)"` |
| `showTextOn` | `enum` | Text visibility: Both, Overflow, Toolbar | `showTextOn="Overflow"` |

### Input Item Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `type` | `enum` | Must be "Input" for input containers | `type="Input"` |
| `template` | `string` | Template ID for custom content | `template="#myTemplate"` |

Content is specified using the `template` property with a template ID or inline template definition.

## Complete Examples

### Multi-functional Toolbar

```html
<ejs-toolbar id="multiToolbar">
    <e-toolbar-items>
        <!-- File operations -->
        <e-toolbar-item text="New" prefixIcon="e-new-icon" tooltipText="New" tabIndex="1"></e-toolbar-item>
        <e-toolbar-item text="Open" prefixIcon="e-open-icon" tooltipText="Open" tabIndex="2"></e-toolbar-item>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon" tooltipText="Save" tabIndex="3"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Edit operations -->
        <e-toolbar-item text="Undo" prefixIcon="e-undo-icon" tooltipText="Undo" tabIndex="4"></e-toolbar-item>
        <e-toolbar-item text="Redo" prefixIcon="e-redo-icon" tooltipText="Redo" tabIndex="5"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Format operations -->
        <e-toolbar-item text="Bold" prefixIcon="e-bold-icon" tooltipText="Bold" tabIndex="6"></e-toolbar-item>
        <e-toolbar-item text="Italic" prefixIcon="e-italic-icon" tooltipText="Italic" tabIndex="7"></e-toolbar-item>
        <e-toolbar-item text="Underline" prefixIcon="e-underline-icon" tooltipText="Underline" tabIndex="8"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Formatting options -->
        <e-toolbar-item type="Input" template="#toolbarFont"></e-toolbar-item>
        <e-toolbar-item type="Input" template="#toolbarZoom"></e-toolbar-item>
        
        <!-- Right-aligned items -->
        <e-toolbar-item text="Help" prefixIcon="e-help-icon" tooltipText="Help" align="Right" tabIndex="9"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

**Template Definitions:**
```html
<div id="toolbarFont">
    <ejs-dropdownlist id="toolbarFontFamily" dataSource="@ViewBag.Fonts" width="120px"></ejs-dropdownlist>
</div>

<div id="toolbarZoom">
    <ejs-numerictextbox id="toolbarZoomLevel" format="n0" value="100" min="50" max="200" step="10" width="80px"></ejs-numerictextbox>
</div>
```

This example demonstrates all item types working together with proper tab navigation, separators, alignment, and input controls.

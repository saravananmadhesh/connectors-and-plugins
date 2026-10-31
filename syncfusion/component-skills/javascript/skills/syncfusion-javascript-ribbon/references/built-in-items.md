# Built-in Items

This guide covers all 8 built-in Ribbon item types: Button, CheckBox, DropDown, SplitButton, ComboBox, ColorPicker, GroupButton, and Gallery. Each type has unique configuration options and use cases.

## Table of Contents

- [Item Types Overview](#item-types-overview)
- [Button Items](#button-items)
- [CheckBox Items](#checkbox-items)
- [DropDown Items](#dropdown-items)
- [SplitButton Items](#splitbutton-items)
- [ComboBox Items](#combobox-items)
- [ColorPicker Items](#colorpicker-items)
- [GroupButton Items](#groupbutton-items)
- [Template Items](#template-items)
- [Item Size Configuration](#item-size-configuration)
- [Choosing the Right Item Type](#choosing-the-right-item-type)

## Item Types Overview

The Ribbon supports 8 built-in item types:

| Type | Purpose | Module Required |
|------|---------|-----------------|
| Button | Single-action commands | No (default) |
| CheckBox | Toggle options on/off | No (default) |
| DropDown | Select from list of options | No (default) |
| SplitButton | Primary action + menu | No (default) |
| ComboBox | Editable dropdown with filtering | No (default) |
| ColorPicker | Color selection | Yes (RibbonColorPicker) |
| GroupButton | Single/multiple selection from group | No (default) |
| Template | Custom HTML content | No (default) |

## Button Items

Buttons perform single actions when clicked.

### Basic Button

```typescript
import { RibbonItemType } from "@syncfusion/ej2-ribbon";

let tabs = [{
    header: "Home",
    groups: [{
        header: "Actions",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Save",
                    iconCss: "e-icons e-save"
                }
            }]
        }]
    }]
}];
```

### Button with Click Event

```typescript
{
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "New Document",
        iconCss: "e-icons e-file-new",
        clicked: (args) => {
            console.log("New Document clicked");
            // Your action here
        }
    }
}
```

### Button Properties

- `content` (string): Button text
- `iconCss` (string): Icon CSS class
- `cssClass` (string): Custom CSS for styling
- `isPrimary` (boolean): Apply primary button styling
- `disabled` (boolean): Disable the button
- `clicked` (function): Click event handler

### Icon-Only Button

```typescript
{
    type: RibbonItemType.Button,
    buttonSettings: {
        iconCss: "e-icons e-bold",
        cssClass: "icon-only-button"
    }
}
```

## CheckBox Items

CheckBoxes toggle boolean options on/off.

### Basic CheckBox

```typescript
{
    type: RibbonItemType.CheckBox,
    checkBoxSettings: {
        label: "Show Ruler",
        checked: true
    }
}
```

### CheckBox with Label Position

```typescript
{
    type: RibbonItemType.CheckBox,
    checkBoxSettings: {
        label: "Enable Spell Check",
        checked: false,
        labelPosition: "Before" // "Before" or "After"
    }
}
```

### CheckBox with Change Event

```typescript
{
    type: RibbonItemType.CheckBox,
    checkBoxSettings: {
        label: "Auto Save",
        checked: true,
        change: (args) => {
            console.log("Auto Save:", args.checked);
            // Enable/disable auto save
        }
    }
}
```

### CheckBox Properties

- `label` (string): Label text
- `checked` (boolean): Initial checked state
- `labelPosition` (string): "Before" or "After" the checkbox
- `cssClass` (string): Custom CSS class
- `disabled` (boolean): Disable the checkbox
- `change` (function): Change event handler

## DropDown Items

DropDowns display a menu of selectable options.

### Basic DropDown

```typescript
{
    type: RibbonItemType.DropDown,
    dropDownSettings: {
        content: "Paste Options",
        iconCss: "e-icons e-paste",
        items: [
            { text: "Keep Source Formatting" },
            { text: "Merge Formatting" },
            { text: "Keep Text Only" }
        ]
    }
}
```

### DropDown with Icons

```typescript
{
    type: RibbonItemType.DropDown,
    dropDownSettings: {
        content: "Table",
        iconCss: "e-icons e-table",
        items: [
            { text: "Insert Table", iconCss: "e-icons e-table" },
            { text: "Draw Table", iconCss: "e-icons e-edit" },
            { text: "Excel Spreadsheet", iconCss: "e-icons e-excel" }
        ]
    }
}
```

### DropDown with Select Event

```typescript
{
    type: RibbonItemType.DropDown,
    dropDownSettings: {
        content: "Insert",
        items: [
            { text: "Insert Above", id: "above" },
            { text: "Insert Below", id: "below" }
        ],
        select: (args) => {
            console.log("Selected:", args.item.text);
            // Handle selection
        }
    }
}
```

### DropDown Properties

- `content` (string): Button text
- `iconCss` (string): Button icon
- `items` (array): Menu items with text, id, iconCss
- `cssClass` (string): Custom CSS class
- `disabled` (boolean): Disable the dropdown
- `select` (function): Item selection handler
- `beforeOpen` (function): Before menu opens
- `beforeClose` (function): Before menu closes

## SplitButton Items

SplitButtons combine a primary action button with a dropdown menu.

### Basic SplitButton

```typescript
{
    type: RibbonItemType.SplitButton,
    splitButtonSettings: {
        content: "Paste",
        iconCss: "e-icons e-paste",
        items: [
            { text: "Keep Source Formatting" },
            { text: "Merge Formatting" },
            { text: "Keep Text Only" }
        ]
    }
}
```

### SplitButton with Click Events

```typescript
{
    type: RibbonItemType.SplitButton,
    splitButtonSettings: {
        content: "Undo",
        iconCss: "e-icons e-undo",
        items: [
            { text: "Undo Last Action" },
            { text: "Undo All" }
        ],
        click: (args) => {
            console.log("Primary button clicked - Undo");
            // Perform default undo
        },
        select: (args) => {
            console.log("Menu item selected:", args.item.text);
            // Handle specific undo option
        }
    }
}
```

### SplitButton Properties

- `content` (string): Button text
- `iconCss` (string): Button icon
- `items` (array): Menu items
- `click` (function): Primary button click handler
- `select` (function): Menu item selection handler
- `cssClass` (string): Custom CSS class
- `disabled` (boolean): Disable the button

## ComboBox Items

ComboBoxes provide editable dropdowns with filtering capabilities.

### Basic ComboBox

```typescript
{
    type: RibbonItemType.ComboBox,
    comboBoxSettings: {
        dataSource: ["Arial", "Times New Roman", "Verdana", "Calibri", "Segoe UI"],
        width: "150px",
        index: 0 // Default selection
    }
}
```

### ComboBox with Object Data

```typescript
{
    type: RibbonItemType.ComboBox,
    comboBoxSettings: {
        dataSource: [
            { id: "8", value: "8 pt" },
            { id: "10", value: "10 pt" },
            { id: "12", value: "12 pt" },
            { id: "14", value: "14 pt" }
        ],
        fields: { text: "value", value: "id" },
        width: "80px",
        value: "12"
    }
}
```

### ComboBox with Filtering

```typescript
{
    type: RibbonItemType.ComboBox,
    comboBoxSettings: {
        dataSource: ["Arial", "Times New Roman", "Verdana", "Georgia", "Impact"],
        allowFiltering: true,
        filterType: "Contains", // "Contains", "StartsWith", "EndsWith"
        placeholder: "Select font...",
        width: "150px"
    }
}
```

### ComboBox with Change Event

```typescript
{
    type: RibbonItemType.ComboBox,
    comboBoxSettings: {
        dataSource: ["8", "10", "12", "14", "16", "18", "20"],
        width: "65px",
        change: (args) => {
            console.log("Font size changed to:", args.value);
            // Apply font size
        }
    }
}
```

### ComboBox Properties

- `dataSource` (array): Data items (strings or objects)
- `fields` (object): Mapping for text and value (for objects)
- `width` (string): ComboBox width
- `index` (number): Default selected index
- `value` (string/number): Default selected value
- `placeholder` (string): Placeholder text
- `allowFiltering` (boolean): Enable filtering
- `filterType` (string): Filter mode
- `change` (function): Selection change handler

## ColorPicker Items

ColorPicker items allow users to select colors. **Requires RibbonColorPicker module injection.**

### Module Injection

```typescript
import { Ribbon, RibbonColorPicker } from "@syncfusion/ej2-ribbon";

// Inject ColorPicker module
Ribbon.Inject(RibbonColorPicker);
```

### Basic ColorPicker

```typescript
{
    type: RibbonItemType.ColorPicker,
    colorPickerSettings: {
        value: "#ff0000"
    }
}
```

### ColorPicker with Label

```typescript
{
    type: RibbonItemType.ColorPicker,
    colorPickerSettings: {
        value: "#000000",
        label: "Font Color",
        iconCss: "e-icons e-font-color"
    }
}
```

### ColorPicker with Change Event

```typescript
{
    type: RibbonItemType.ColorPicker,
    colorPickerSettings: {
        value: "#ffff00",
        label: "Highlight",
        change: (args) => {
            console.log("Color changed to:", args.currentValue.hex);
            // Apply color
        }
    }
}
```

### ColorPicker with Custom Palette

```typescript
{
    type: RibbonItemType.ColorPicker,
    colorPickerSettings: {
        value: "#000000",
        mode: "Palette", // "Palette" or "Picker"
        presetColors: {
            "custom1": ["#ff0000", "#00ff00", "#0000ff"],
            "custom2": ["#ffff00", "#ff00ff", "#00ffff"]
        },
        showButtons: true // Show Apply/Cancel buttons
    }
}
```

### ColorPicker Properties

- `value` (string): Initial color (hex, rgb, or color name)
- `label` (string): Label text
- `iconCss` (string): Label icon
- `mode` (string): "Palette" or "Picker"
- `presetColors` (object): Custom color palettes
- `showButtons` (boolean): Show Apply/Cancel buttons
- `modeSwitcher` (boolean): Allow switching between Palette/Picker
- `change` (function): Color change handler

## GroupButton Items

GroupButton items allow single or multiple selection from a group of options.

### Single Selection GroupButton

```typescript
{
    type: RibbonItemType.GroupButton,
    groupButtonSettings: {
        selection: "Single",
        items: [
            { iconCss: "e-icons e-align-left", content: "Left" },
            { iconCss: "e-icons e-align-center", content: "Center" },
            { iconCss: "e-icons e-align-right", content: "Right" }
        ]
    }
}
```

### Multiple Selection GroupButton

```typescript
{
    type: RibbonItemType.GroupButton,
    groupButtonSettings: {
        selection: "Multiple",
        items: [
            { iconCss: "e-icons e-bold", content: "Bold" },
            { iconCss: "e-icons e-italic", content: "Italic" },
            { iconCss: "e-icons e-underline", content: "Underline" }
        ]
    }
}
```

### GroupButton with Selected Items

```typescript
{
    type: RibbonItemType.GroupButton,
    groupButtonSettings: {
        selection: "Multiple",
        items: [
            { iconCss: "e-icons e-bold", selected: true },
            { iconCss: "e-icons e-italic", selected: false },
            { iconCss: "e-icons e-underline", selected: true }
        ]
    }
}
```

### GroupButton with Click Event

```typescript
{
    type: RibbonItemType.GroupButton,
    groupButtonSettings: {
        selection: "Single",
        items: [
            { content: "Left", id: "left" },
            { content: "Center", id: "center" },
            { content: "Right", id: "right" }
        ],
        clicked: (args) => {
            console.log("Clicked item:", args.item.id);
            // Apply alignment
        }
    }
}
```

### GroupButton Properties

- `selection` (string): "Single" or "Multiple"
- `items` (array): Button items with iconCss, content, id, selected
- `clicked` (function): Button click handler
- `cssClass` (string): Custom CSS class

## Template Items

Template items allow custom HTML content.

### Basic Template

```typescript
{
    type: RibbonItemType.Template,
    itemTemplate: '<label style="margin-right: 10px;">Custom Label</label>'
}
```

### Template with Input Element

```typescript
{
    type: RibbonItemType.Template,
    itemTemplate: '<input type="text" id="searchBox" placeholder="Search..." style="width: 200px;" />'
}
```

### Template with Custom Components

```typescript
{
    type: RibbonItemType.Template,
    itemTemplate: '<div class="custom-slider"><input type="range" min="0" max="100" value="50" /></div>'
}
```

## Item Size Configuration

Control item display sizes (Large, Medium, Small) for different layouts.

### Setting Allowed Sizes

```typescript
{
    type: RibbonItemType.Button,
    allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium,
    buttonSettings: {
        content: "Save",
        iconCss: "e-icons e-save"
    }
}
```

### Setting Active Size

```typescript
{
    type: RibbonItemType.Button,
    activeSize: RibbonItemSize.Large,
    buttonSettings: {
        content: "Print",
        iconCss: "e-icons e-print"
    }
}
```

**Size characteristics:**
- **Large**: Icon + text, most visible
- **Medium**: Icon + text, compact
- **Small**: Icon only, minimal space

## Item State Management - Enable/Disable/Show/Hide

Control individual ribbon item states dynamically.

### Disabling and Enabling Items

Disable items to prevent user interaction:

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        groups: [{
            header: "Editing",
            collections: [{
                items: [{
                    id: "save-btn",
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Save",
                        iconCss: "e-icons e-save"
                    }
                }, {
                    id: "undo-btn",
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Undo",
                        iconCss: "e-icons e-undo"
                    }
                }]
            }]
        }]
    }]
});

ribbon.appendTo("#ribbon");

// Disable Save button when no changes
ribbon.disableItem("save-btn");

// Enable it when changes exist
ribbon.enableItem("save-btn");

// Disable Undo when history is empty
ribbon.disableItem("undo-btn");
```

**Use cases:** Enable/disable based on selection state, document state, or permissions.

### Hiding and Showing Items

Completely hide items from the UI:

```typescript
// Hide advanced features
ribbon.hideItem("advanced-option");

// Show item conditionally
ribbon.showItem("advanced-option");
```

### State Synchronization Example

```typescript
let hasSelection = false;
let hasSavedChanges = false;

// Update ribbon state based on document state
function updateItemStates() {
    if (!hasSelection) {
        ribbon.disableItem("bold");
        ribbon.disableItem("italic");
        ribbon.disableItem("underline");
        ribbon.hideItem("advanced-format");
    } else {
        ribbon.enableItem("bold");
        ribbon.enableItem("italic");
        ribbon.enableItem("underline");
        ribbon.showItem("advanced-format");
    }
    
    if (hasSavedChanges) {
        ribbon.enableItem("save-btn");
    } else {
        ribbon.disableItem("save-btn");
    }
}

// Listen for selection changes
document.addEventListener("selectionchange", () => {
    hasSelection = document.getSelection().toString().length > 0;
    updateItemStates();
});
```

---

## Choosing the Right Item Type

| Scenario | Recommended Item Type |
|----------|----------------------|
| Single action command | **Button** |
| Toggle feature on/off | **CheckBox** |
| Select one from many options | **DropDown** |
| Common action + alternatives | **SplitButton** |
| Editable text selection | **ComboBox** |
| Color selection | **ColorPicker** |
| Multiple related toggles | **GroupButton** (Multiple) |
| Single selection from group | **GroupButton** (Single) |
| Custom UI element | **Template** |

## Complete Example

```typescript
import { Ribbon, RibbonTabModel, RibbonItemType, RibbonColorPicker } from "@syncfusion/ej2-ribbon";

// Inject ColorPicker module
Ribbon.Inject(RibbonColorPicker);

let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Cut",
                    iconCss: "e-icons e-cut"
                }
            }]
        }]
    }, {
        header: "Font",
        collections: [{
            items: [{
                type: RibbonItemType.ComboBox,
                comboBoxSettings: {
                    dataSource: ["Arial", "Times New Roman", "Verdana"],
                    width: "150px",
                    index: 0
                }
            }, {
                type: RibbonItemType.ComboBox,
                comboBoxSettings: {
                    dataSource: ["8", "10", "12", "14", "16"],
                    width: "65px",
                    index: 2
                }
            }]
        }, {
            items: [{
                type: RibbonItemType.GroupButton,
                groupButtonSettings: {
                    selection: "Multiple",
                    items: [
                        { iconCss: "e-icons e-bold" },
                        { iconCss: "e-icons e-italic" },
                        { iconCss: "e-icons e-underline" }
                    ]
                }
            }]
        }, {
            items: [{
                type: RibbonItemType.ColorPicker,
                colorPickerSettings: {
                    value: "#000000"
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

This example demonstrates Button, ComboBox, GroupButton, and ColorPicker items working together in a text formatting interface.

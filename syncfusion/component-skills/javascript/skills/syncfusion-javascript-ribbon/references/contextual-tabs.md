# Contextual Tabs

This guide covers Contextual Tabs in the Ribbon, which appear dynamically based on selected objects or context (e.g., Table Tools, Picture Tools). **Contextual Tabs require the RibbonContextualTab module.**

## Table of Contents

- [Contextual Tabs Overview](#contextual-tabs-overview)
- [Module Injection](#module-injection)
- [Basic Contextual Tab Setup](#basic-contextual-tab-setup)
- [Controlling Tab Visibility](#controlling-tab-visibility)
- [Setting Selected Tab](#setting-selected-tab)
- [Multiple Contextual Tab Groups](#multiple-contextual-tab-groups)
- [Dynamic Show/Hide](#dynamic-showhide)
- [Common Use Cases](#common-use-cases)
- [Complete Examples](#complete-examples)

## Contextual Tabs Overview

Contextual Tabs appear when users select specific objects, providing relevant tools:

**Examples:**
- **Table Tools**: When user selects a table (Design, Layout tabs)
- **Picture Tools**: When user selects an image (Format tab)
- **Chart Tools**: When user selects a chart (Design, Format tabs)
- **Drawing Tools**: When user selects a shape (Format tab)

**Key features:**
- Appear dynamically based on selection
- Grouped visually with a header label
- Can contain multiple tabs
- Automatically hidden when object is deselected
- Distinct visual styling (usually colored header)

**Benefits:**
- Reduces clutter by showing tools only when needed
- Context-specific commands immediately accessible
- Familiar pattern from Microsoft Office applications

## Module Injection

Contextual Tabs require the `RibbonContextualTab` module:

```typescript
import { Ribbon, RibbonContextualTab } from "@syncfusion/ej2-ribbon";

// Inject ContextualTab module
Ribbon.Inject(RibbonContextualTab);
```

**Important:** Always inject `RibbonContextualTab` before creating a Ribbon with contextual tabs.

## Basic Contextual Tab Setup

Create a simple contextual tab:

```typescript
import { Ribbon, RibbonContextualTab, RibbonTabModel } from "@syncfusion/ej2-ribbon";

Ribbon.Inject(RibbonContextualTab);

let ribbon: Ribbon = new Ribbon({
    tabs: [
        // Regular tabs
        {
            header: "Home",
            groups: [/* groups */]
        }
    ],
    contextualTabs: [{
        visible: false, // Initially hidden
        isSelected: false,
        tabs: [{
            header: "Table Design",
            groups: [{
                header: "Table Styles",
                collections: [{
                    items: [{
                        type: RibbonItemType.Button,
                        buttonSettings: {
                            content: "Apply Style",
                            iconCss: "e-icons e-table"
                        }
                    }]
                }]
            }]
        }]
    }]
});

ribbon.appendTo("#ribbon");
```

**Key points:**
- Contextual tabs defined in `contextualTabs` array
- Each contextual tab group has `visible` property
- Contains `tabs` array with regular tab structure

## Controlling Tab Visibility

Show or hide contextual tabs based on user interactions:

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        groups: [/* groups */]
    }],
    contextualTabs: [{
        id: "table-tools",
        visible: false, // Initially hidden
        tabs: [{
            header: "Table Design",
            groups: [/* groups */]
        }]
    }]
});

ribbon.appendTo("#ribbon");

// Show contextual tab when table is selected
function onTableSelected() {
    ribbon.contextualTabs[0].visible = true;
    ribbon.dataBind(); // Apply changes
}

// Hide contextual tab when table is deselected
function onTableDeselected() {
    ribbon.contextualTabs[0].visible = false;
    ribbon.dataBind();
}
```

**Dynamic visibility:**

```typescript
// Toggle visibility
function toggleTableTools(show: boolean) {
    let contextualTab = ribbon.contextualTabs.find(ct => ct.id === "table-tools");
    if (contextualTab) {
        contextualTab.visible = show;
        ribbon.dataBind();
    }
}
```

## Setting Selected Tab

Automatically select a contextual tab when it becomes visible:

```typescript
let ribbon: Ribbon = new Ribbon({
    contextualTabs: [{
        visible: false,
        isSelected: true, // Auto-select when visible
        tabs: [{
            header: "Table Design",
            groups: [/* groups */]
        }]
    }]
});
```

**Key points:**
- `isSelected: true` automatically switches to this tab when visible
- Useful for immediate access to context-specific tools
- User can still switch back to regular tabs

## Multiple Contextual Tab Groups

Create multiple contextual tab groups for different contexts:

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [
        { header: "Home", groups: [] },
        { header: "Insert", groups: [] }
    ],
    contextualTabs: [
        // Table Tools
        {
            id: "table-tools",
            visible: false,
            isSelected: true,
            tabs: [{
                header: "Table Design",
                groups: [{
                    header: "Styles",
                    collections: [/* items */]
                }]
            }, {
                header: "Table Layout",
                groups: [{
                    header: "Rows & Columns",
                    collections: [/* items */]
                }]
            }]
        },
        // Picture Tools
        {
            id: "picture-tools",
            visible: false,
            isSelected: true,
            tabs: [{
                header: "Picture Format",
                groups: [{
                    header: "Adjust",
                    collections: [/* items */]
                }, {
                    header: "Picture Styles",
                    collections: [/* items */]
                }]
            }]
        },
        // Chart Tools
        {
            id: "chart-tools",
            visible: false,
            isSelected: true,
            tabs: [{
                header: "Chart Design",
                groups: [/* groups */]
            }, {
                header: "Chart Format",
                groups: [/* groups */]
            }]
        }
    ]
});
```

**Managing multiple groups:**

```typescript
function showContextualTools(toolType: string) {
    // Hide all contextual tabs
    ribbon.contextualTabs.forEach(ct => ct.visible = false);
    
    // Show specific contextual tab
    let contextualTab = ribbon.contextualTabs.find(ct => ct.id === toolType);
    if (contextualTab) {
        contextualTab.visible = true;
    }
    
    ribbon.dataBind();
}

// Usage
showContextualTools("table-tools");
showContextualTools("picture-tools");
```

## Dynamic Show/Hide

Implement dynamic show/hide based on application state:

```typescript
// Show table tools when table selected
document.addEventListener("tableSelected", (event) => {
    let contextualTab = ribbon.contextualTabs.find(ct => ct.id === "table-tools");
    if (contextualTab) {
        contextualTab.visible = true;
        ribbon.dataBind();
    }
});

// Hide table tools when table deselected
document.addEventListener("tableDeselected", (event) => {
    let contextualTab = ribbon.contextualTabs.find(ct => ct.id === "table-tools");
    if (contextualTab) {
        contextualTab.visible = false;
        ribbon.dataBind();
    }
});

// Show picture tools when image selected
document.addEventListener("imageSelected", (event) => {
    // Hide other contextual tabs
    ribbon.contextualTabs.forEach(ct => ct.visible = false);
    
    // Show picture tools
    let contextualTab = ribbon.contextualTabs.find(ct => ct.id === "picture-tools");
    if (contextualTab) {
        contextualTab.visible = true;
        ribbon.dataBind();
    }
});
```

## Common Use Cases

### Use Case 1: Table Tools

```typescript
{
    id: "table-tools",
    visible: false,
    isSelected: true,
    tabs: [{
        header: "Table Design",
        groups: [{
            header: "Table Style Options",
            collections: [{
                items: [{
                    type: RibbonItemType.CheckBox,
                    checkBoxSettings: {
                        label: "Header Row",
                        checked: true
                    }
                }, {
                    type: RibbonItemType.CheckBox,
                    checkBoxSettings: {
                        label: "Banded Rows"
                    }
                }]
            }]
        }, {
            header: "Table Styles",
            collections: [{
                items: [{
                    type: RibbonItemType.Gallery,
                    gallerySettings: {
                        groups: [{
                            header: "Styles",
                            items: [
                                { content: "Light 1" },
                                { content: "Light 2" },
                                { content: "Dark 1" }
                            ]
                        }]
                    }
                }]
            }]
        }]
    }, {
        header: "Table Layout",
        groups: [{
            header: "Rows & Columns",
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Insert Above",
                        iconCss: "e-icons e-insert-row-above"
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Insert Below",
                        iconCss: "e-icons e-insert-row-below"
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Delete Row",
                        iconCss: "e-icons e-delete-row"
                    }
                }]
            }]
        }]
    }]
}
```

### Use Case 2: Picture Tools

```typescript
{
    id: "picture-tools",
    visible: false,
    isSelected: true,
    tabs: [{
        header: "Picture Format",
        groups: [{
            header: "Adjust",
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Brightness",
                        iconCss: "e-icons e-brightness"
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Contrast",
                        iconCss: "e-icons e-contrast"
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Crop",
                        iconCss: "e-icons e-crop"
                    }
                }]
            }]
        }, {
            header: "Picture Styles",
            collections: [{
                items: [{
                    type: RibbonItemType.Gallery,
                    gallerySettings: {
                        groups: [{
                            header: "Styles",
                            items: [
                                { content: "Simple Frame" },
                                { content: "Rounded Corners" },
                                { content: "Shadow" }
                            ]
                        }]
                    }
                }]
            }]
        }, {
            header: "Size",
            collections: [{
                items: [{
                    type: RibbonItemType.ComboBox,
                    comboBoxSettings: {
                        dataSource: ["100%", "75%", "50%", "25%"],
                        placeholder: "Scale",
                        width: "80px"
                    }
                }]
            }]
        }]
    }]
}
```

### Use Case 3: Chart Tools

```typescript
{
    id: "chart-tools",
    visible: false,
    isSelected: true,
    tabs: [{
        header: "Chart Design",
        groups: [{
            header: "Type",
            collections: [{
                items: [{
                    type: RibbonItemType.DropDown,
                    dropDownSettings: {
                        content: "Change Chart Type",
                        iconCss: "e-icons e-chart",
                        items: [
                            { text: "Column" },
                            { text: "Line" },
                            { text: "Pie" },
                            { text: "Bar" }
                        ]
                    }
                }]
            }]
        }, {
            header: "Chart Styles",
            collections: [{
                items: [{
                    type: RibbonItemType.Gallery,
                    gallerySettings: {
                        groups: [{
                            header: "Styles",
                            items: [
                                { content: "Style 1" },
                                { content: "Style 2" },
                                { content: "Style 3" }
                            ]
                        }]
                    }
                }]
            }]
        }]
    }, {
        header: "Chart Format",
        groups: [{
            header: "Current Selection",
            collections: [{
                items: [{
                    type: RibbonItemType.ComboBox,
                    comboBoxSettings: {
                        dataSource: ["Chart Area", "Plot Area", "Legend", "Axis"],
                        placeholder: "Select element",
                        width: "150px"
                    }
                }]
            }]
        }]
    }]
}
```

## Complete Examples

### Example 1: Document Editor with Contextual Tabs

```typescript
import { Ribbon, RibbonContextualTab, RibbonTabModel, RibbonItemType, RibbonGallery } from "@syncfusion/ej2-ribbon";

Ribbon.Inject(RibbonContextualTab, RibbonGallery);

let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Paste",
                    iconCss: "e-icons e-paste"
                }
            }]
        }]
    }]
}, {
    header: "Insert",
    groups: [{
        header: "Tables",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Table",
                    iconCss: "e-icons e-table",
                    clicked: () => {
                        insertTable();
                        showTableTools();
                    }
                }
            }]
        }]
    }, {
        header: "Illustrations",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Picture",
                    iconCss: "e-icons e-image",
                    clicked: () => {
                        insertPicture();
                        showPictureTools();
                    }
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    tabs: tabs,
    contextualTabs: [{
        id: "table-tools",
        visible: false,
        isSelected: true,
        tabs: [{
            header: "Table Design",
            groups: [{
                header: "Table Styles",
                collections: [{
                    items: [{
                        type: RibbonItemType.Gallery,
                        gallerySettings: {
                            groups: [{
                                header: "Light",
                                items: [
                                    { content: "Light 1", cssClass: "table-light-1" },
                                    { content: "Light 2", cssClass: "table-light-2" }
                                ]
                            }]
                        }
                    }]
                }]
            }]
        }, {
            header: "Table Layout",
            groups: [{
                header: "Rows & Columns",
                collections: [{
                    items: [{
                        type: RibbonItemType.Button,
                        buttonSettings: {
                            content: "Insert Above",
                            iconCss: "e-icons e-insert-row-above"
                        }
                    }]
                }]
            }]
        }]
    }],
    {
        id: "picture-tools",
        visible: false,
        isSelected: true,
        tabs: [{
            header: "Picture Format",
            groups: [{
                header: "Adjust",
                collections: [{
                    items: [{
                        type: RibbonItemType.Button,
                        buttonSettings: {
                            content: "Crop",
                            iconCss: "e-icons e-crop"
                        }
                    }]
                }]
            }]
        }]
    }]
});

ribbon.appendTo("#ribbon");

function insertTable() {
    console.log("Inserting table...");
}

function insertPicture() {
    console.log("Inserting picture...");
}

function showTableTools() {
    ribbon.contextualTabs.forEach(ct => ct.visible = false);
    let tableTools = ribbon.contextualTabs.find(ct => ct.id === "table-tools");
    if (tableTools) {
        tableTools.visible = true;
        ribbon.dataBind();
    }
}

function showPictureTools() {
    ribbon.contextualTabs.forEach(ct => ct.visible = false);
    let pictureTools = ribbon.contextualTabs.find(ct => ct.id === "picture-tools");
    if (pictureTools) {
        pictureTools.visible = true;
        ribbon.dataBind();
    }
}

// Hide contextual tabs when clicking outside
document.addEventListener("click", (event) => {
    let target = event.target as HTMLElement;
    if (!target.closest(".selected-object")) {
        ribbon.contextualTabs.forEach(ct => ct.visible = false);
        ribbon.dataBind();
    }
});
```

This example demonstrates a document editor with contextual tabs for tables and pictures, showing dynamic visibility control based on user actions.

# Layouts and Display Modes

This guide covers Ribbon layout modes (Classic and Simplified), item sizing, group behavior, minimized state, and layout switching.

## Table of Contents

- [Layout Overview](#layout-overview)
- [Classic Layout](#classic-layout)
- [Simplified Layout](#simplified-layout)
- [Setting Active Layout](#setting-active-layout)
- [Item Sizes](#item-sizes)
- [Defining Allowed Sizes](#defining-allowed-sizes)
- [Setting Active Size](#setting-active-size)
- [Item Orientation](#item-orientation)
- [Group Icons](#group-icons)
- [Launcher Icons](#launcher-icons)
- [Group Collapsible State](#group-collapsible-state)
- [Group Overflow](#group-overflow)
- [Minimized State](#minimized-state)
- [Layout Switcher](#layout-switcher)
- [Tab Animations](#tab-animations)
- [Hide Layout Switcher](#hide-layout-switcher)
- [Complete Examples](#complete-examples)

## Layout Overview

The Ribbon supports two layout modes:

| Layout | Description | Use Case |
|--------|-------------|----------|
| **Classic** | Multi-row display with large, medium, and small items | Traditional Office-style ribbons, desktop apps |
| **Simplified** | Single-row compact display | Space-constrained UIs, mobile, modern apps |

Both layouts share the same tab and group structure but differ in visual presentation and item sizing behavior.

## Classic Layout

The Classic layout displays items in multiple rows with different sizes:

```typescript
import { Ribbon } from "@syncfusion/ej2-ribbon";

let ribbon: Ribbon = new Ribbon({
    activeLayout: "Classic", // Default layout
    tabs: [{
        header: "Home",
        groups: [{
            header: "Clipboard",
            collections: [{
                items: [/* items */]
            }]
        }]
    }]
});

ribbon.appendTo("#ribbon");
```

**Characteristics:**
- Items displayed in multiple rows
- Supports Large, Medium, and Small item sizes
- Groups have visible headers at the bottom
- More vertical space, highly visible commands
- Traditional Microsoft Office appearance

## Simplified Layout

The Simplified layout displays items in a single compact row:

```typescript
let ribbon: Ribbon = new Ribbon({
    activeLayout: "Simplified",
    tabs: [{
        header: "Home",
        groups: [{
            header: "Clipboard",
            groupIconCss: "e-icons e-paste", // Icon for overflow
            collections: [{
                items: [/* items */]
            }]
        }]
    }]
});
```

**Characteristics:**
- Single-row compact display
- Items sized Medium or Small only (no Large)
- Groups collapse to icons with popups
- Minimal vertical space
- Modern, streamlined appearance

## Setting Active Layout

Switch between layouts programmatically:

### At Initialization

```typescript
let ribbon: Ribbon = new Ribbon({
    activeLayout: "Simplified",
    tabs: []
});
```

### Dynamically

```typescript
// Switch to Classic layout
ribbon.activeLayout = "Classic";

// Switch to Simplified layout
ribbon.activeLayout = "Simplified";

// Or use setProperties
ribbon.setProperties({ activeLayout: "Simplified" });
```

### With User Interaction

```typescript
// Add a button to toggle layouts
{
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "Switch Layout",
        clicked: () => {
            ribbon.activeLayout = ribbon.activeLayout === "Classic" ? "Simplified" : "Classic";
        }
    }
}
```

## Item Sizes

The Ribbon supports three item sizes:

| Size | Classic Layout | Simplified Layout | Description |
|------|----------------|-------------------|-------------|
| **Large** | Icon (32x32) + Text below | Not supported | Most prominent display |
| **Medium** | Icon (20x20) + Text right | Icon (20x20) + Text right | Balanced visibility |
| **Small** | Icon only (16x16) | Icon only (16x16) | Compact display |

## Defining Allowed Sizes

Control which sizes an item can use:

```typescript
import { RibbonItemSize } from "@syncfusion/ej2-ribbon";

{
    type: RibbonItemType.Button,
    allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
    buttonSettings: {
        content: "Save",
        iconCss: "e-icons e-save"
    }
}
```

**Allowed sizes options:**

```typescript
// Allow all sizes
allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small

// Large and Medium only
allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium

// Medium and Small only (best for Simplified layout)
allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small

// Fixed at Large only
allowedSizes: RibbonItemSize.Large
```

**Key points:**
- Items transition between allowed sizes based on available space
- In Simplified layout, Large size is automatically downgraded to Medium
- Use to maintain consistent sizing for important items

## Setting Active Size

Set the initial size for an item:

```typescript
{
    type: RibbonItemType.Button,
    activeSize: RibbonItemSize.Large, // Start at Large
    allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
    buttonSettings: {
        content: "Print",
        iconCss: "e-icons e-print"
    }
}
```

**Use cases:**
- Emphasize important commands (Large)
- Consistent sizing for related items
- Override automatic size transitions

## Item Orientation

Control how items are arranged within collections:

```typescript
{
    header: "Clipboard",
    orientation: "Row", // "Row" or "Column"
    collections: [{
        items: [
            { type: RibbonItemType.Button, buttonSettings: { content: "Cut" } },
            { type: RibbonItemType.Button, buttonSettings: { content: "Copy" } }
        ]
    }]
}
```

**Orientation options:**

- **`Row` (default)**: Items arranged horizontally
- **`Column`**: Items arranged vertically

**Example with Column orientation:**

```typescript
{
    header: "Font",
    orientation: "Column",
    collections: [{
        items: [
            { type: RibbonItemType.ComboBox, comboBoxSettings: { dataSource: ["Arial", "Verdana"], width: "120px" } },
            { type: RibbonItemType.ComboBox, comboBoxSettings: { dataSource: ["8", "10", "12"], width: "60px" } }
        ]
    }]
}
```

## Group Icons

Add icons to groups for identification in Simplified layout:

```typescript
{
    header: "Clipboard",
    groupIconCss: "e-icons e-paste",
    collections: [/* items */]
}
```

**Key points:**
- Icons appear when groups are collapsed in Simplified layout
- Helps users identify groups in overflow popups
- Use clear, recognizable icons

## Launcher Icons

Add launcher icons to open dialogs with more options:

```typescript
{
    header: "Font",
    showLauncherIcon: true,
    collections: [/* items */]
}
```

**With click handler:**

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        groups: [{
            header: "Font",
            id: "font-group",
            showLauncherIcon: true,
            collections: []
        }]
    }],
    launcherIconClick: (args) => {
        if (args.groupId === "font-group") {
            // Open Font dialog
            console.log("Open Font settings dialog");
        }
    }
});
```

## Group Collapsible State

Define group collapse behavior and priority:

```typescript
{
    header: "Clipboard",
    isCollapsible: true, // Allow collapsing
    priority: 1, // Collapse order (lower = collapses first)
    groupIconCss: "e-icons e-paste",
    collections: [/* items */]
}
```

**Collapse priority:**

```typescript
let tabs = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        isCollapsible: true,
        priority: 3, // Collapses last
        collections: []
    }, {
        header: "Font",
        isCollapsible: true,
        priority: 2, // Collapses second
        collections: []
    }, {
        header: "Styles",
        isCollapsible: true,
        priority: 1, // Collapses first
        collections: []
    }, {
        header: "Critical",
        isCollapsible: false, // Never collapses
        collections: []
    }]
}];
```

**Behavior:**
- Groups with lower priority collapse first
- Non-collapsible groups always remain expanded
- Collapsed groups show icon and open popup on click

## Group Overflow

Enable overflow popups for groups:

```typescript
{
    header: "Tables",
    enableGroupOverflow: true,
    collections: [/* many items */]
}
```

**Key points:**
- When enabled, groups can move to overflow dropdown
- Useful for responsive designs with many groups
- Overflowed groups accessible via dropdown button

## Minimized State

Collapse the Ribbon to show only tab headers:

```typescript
let ribbon: Ribbon = new Ribbon({
    isMinimized: true, // Start in minimized state
    tabs: []
});
```

**Toggle minimized state:**

```typescript
// Minimize
ribbon.isMinimized = true;

// Expand
ribbon.isMinimized = false;

// Toggle
ribbon.isMinimized = !ribbon.isMinimized;
```

**Behavior:**
- Only tab headers visible when minimized
- Clicking a tab temporarily expands that tab
- Tab auto-hides after clicking an item or clicking elsewhere
- Saves vertical space when Ribbon not actively used

## Layout Switcher

Show/hide the built-in layout switcher button:

```typescript
let ribbon: Ribbon = new Ribbon({
    hideLayoutSwitcher: false, // Show switcher (default)
    tabs: []
});
```

**Hide layout switcher:**

```typescript
let ribbon: Ribbon = new Ribbon({
    hideLayoutSwitcher: true, // Hide switcher
    tabs: []
});
```

**Key points:**
- Layout switcher appears in the top-right corner
- Allows users to toggle between Classic and Simplified
- Hide when you want to control layout programmatically only

## Tab Animations

Customize tab transition animations using the tabAnimation property:

```typescript
let ribbon: Ribbon = new Ribbon({
    activeLayout: "Classic",
    tabAnimation: {
        previous: { effect: "SlideLeftIn", duration: 600 },
        next: { effect: "SlideRightIn", duration: 600 }
    },
    tabs: []
});
```

**Available effects:** SlideLeftIn, SlideLeftOut, FadeIn, FadeOut, ZoomIn, ZoomOut, None. Set effect to "None" to disable animations.

---

## Hide Layout Switcher

Hide the built-in layout switcher button for programmatic control:

```typescript
let ribbon: Ribbon = new Ribbon({
    activeLayout: "Classic",
    hideLayoutSwitcher: true,
    tabs: []
});
```

**Use cases:** Lock layout mode, provide custom switcher UI, mobile-optimized single layout.

---

## Complete Examples

### Example 1: Responsive Ribbon with Size Transitions

```typescript
import { Ribbon, RibbonTabModel, RibbonItemType, RibbonItemSize } from "@syncfusion/ej2-ribbon";

let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        isCollapsible: true,
        priority: 2,
        groupIconCss: "e-icons e-paste",
        showLauncherIcon: true,
        collections: [{
            items: [{
                type: RibbonItemType.SplitButton,
                allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
                splitButtonSettings: {
                    content: "Paste",
                    iconCss: "e-icons e-paste",
                    items: [
                        { text: "Keep Source Format" },
                        { text: "Merge Format" }
                    ]
                }
            }]
        }, {
            items: [{
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
                buttonSettings: {
                    content: "Cut",
                    iconCss: "e-icons e-cut"
                }
            }, {
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
                buttonSettings: {
                    content: "Copy",
                    iconCss: "e-icons e-copy"
                }
            }]
        }]
    }, {
        header: "Font",
        isCollapsible: true,
        priority: 1, // Collapses first
        groupIconCss: "e-icons e-font",
        showLauncherIcon: true,
        orientation: "Column",
        collections: [{
            items: [{
                type: RibbonItemType.ComboBox,
                comboBoxSettings: {
                    dataSource: ["Arial", "Times New Roman", "Verdana"],
                    width: "150px"
                }
            }, {
                type: RibbonItemType.ComboBox,
                comboBoxSettings: {
                    dataSource: ["8", "10", "12", "14", "16"],
                    width: "65px"
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    activeLayout: "Classic",
    hideLayoutSwitcher: false,
    tabs: tabs,
    launcherIconClick: (args) => {
        console.log("Launcher clicked:", args.groupId);
    }
});

ribbon.appendTo("#ribbon");
```

### Example 2: Simplified Layout Optimized

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Actions",
        groupIconCss: "e-icons e-save",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                activeSize: RibbonItemSize.Medium, // Optimized for Simplified
                allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
                buttonSettings: {
                    content: "Save",
                    iconCss: "e-icons e-save"
                }
            }, {
                type: RibbonItemType.Button,
                activeSize: RibbonItemSize.Medium,
                allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
                buttonSettings: {
                    content: "Undo",
                    iconCss: "e-icons e-undo"
                }
            }, {
                type: RibbonItemType.Button,
                activeSize: RibbonItemSize.Medium,
                allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
                buttonSettings: {
                    content: "Redo",
                    iconCss: "e-icons e-redo"
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    activeLayout: "Simplified",
    isMinimized: false,
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

### Example 3: Layout Toggle with User Control

```typescript
let tabs: RibbonTabModel[] = [{
    header: "View",
    groups: [{
        header: "Layout",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Classic Layout",
                    iconCss: "e-icons e-layout",
                    clicked: () => {
                        ribbon.activeLayout = "Classic";
                    }
                }
            }, {
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Simplified Layout",
                    iconCss: "e-icons e-minimize",
                    clicked: () => {
                        ribbon.activeLayout = "Simplified";
                    }
                }
            }]
        }]
    }, {
        header: "Display",
        collections: [{
            items: [{
                type: RibbonItemType.CheckBox,
                checkBoxSettings: {
                    label: "Minimize Ribbon",
                    checked: false,
                    change: (args) => {
                        ribbon.isMinimized = args.checked;
                    }
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    activeLayout: "Classic",
    hideLayoutSwitcher: true, // Hide built-in switcher, use custom buttons
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

These examples demonstrate responsive layouts, size transitions, collapse priorities, and user-controlled layout switching.

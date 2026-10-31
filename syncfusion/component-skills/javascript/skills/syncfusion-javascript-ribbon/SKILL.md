---
name: syncfusion-javascript-ribbon
description: Use this skill ALWAYS when the user needs to implement, configure, or troubleshoot Syncfusion JavaScript Ribbon control. The Ribbon provides a Microsoft Office-style command interface with tabs, groups, and various item types. Immediately apply this skill for ribbon layouts, built-in items (buttons, dropdowns, galleries), file menus, backstage views, contextual tabs, keytips, tooltips, resizing behavior, and event handling.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion JavaScript Ribbon Control

## Overview

The Syncfusion JavaScript Ribbon control is a hierarchical navigation component that organizes commands into:

- **Tabs**: Top-level categories (Home, Insert, View)
- **Groups**: Related command sets within tabs (Clipboard, Font, Tables)
- **Collections**: Organizing containers within groups
- **Items**: Individual controls (buttons, dropdowns, galleries, etc.)

**Key Features**:
- 8 built-in item types with rich configuration options
- 2 layout modes: Classic (multi-row) and Simplified (single-row)
- Advanced features: File Menu, Backstage, Contextual Tabs, Gallery items
- Keyboard navigation with customizable keytips
- Automatic responsive resizing with overflow handling
- Extensive event system for user interactions
- Module-based architecture for selective feature loading

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installing Ribbon package
- Basic ribbon setup and initialization
- Module injection (default and selective modules)
- Creating tabs, groups, collections, and items
- CSS imports and theme configuration
- First working example with multiple tabs

### Ribbon Architecture
📄 **Read:** [references/tabs-and-groups.md](references/tabs-and-groups.md)
- Adding tabs with custom headers
- Defining groups with headers and icons
- Group orientation (Row vs Column layout)
- Adding collections and organizing items
- Group launcher icons (showLauncherIcon, launcherIconCss for customization)
- Collapsible groups and priority order
- Group overflow behavior

### Built-in Items
📄 **Read:** [references/built-in-items.md](references/built-in-items.md)
- Button items (standard and toggle buttons)
- CheckBox items (labels, checked state, label position)
- DropDown items (target content, item customization, popup on demand)
- SplitButton items (primary action + dropdown menu)
- ComboBox items (data binding, filtering, templates)
- ColorPicker items (color selection with presets)
- GroupButton items (single/multiple selection)
- Comparing item types and when to use each

### Gallery Items
📄 **Read:** [references/gallery-items.md](references/gallery-items.md)
- Gallery overview and use cases
- Organizing items into groups
- Defining item content, icons, and attributes
- Customizing gallery item appearance (cssClass)
- Disabling specific gallery items
- Setting group headers and item dimensions
- Configuring displayed item count
- Pre-selecting items (selectedItemIndex)
- Setting popup dimensions
- Custom templates for items and popup

### Layouts and Display
📄 **Read:** [references/layouts.md](references/layouts.md)
- Classic layout (multi-row display)
- Simplified layout (single-row display)
- Defining item sizes (Large, Medium, Small)
- Setting allowed sizes for items
- Item orientation (Row vs Column)
- Group icons and customization
- Enabling launcher icons
- Group collapsible state and priority
- Enabling group overflow popup
- Minimized state (collapse/expand)
- Showing/hiding layout switcher
- Tab animation configurations

**Note:** For handling layout changes, see the ribbonLayoutSwitched event in [references/events-and-api.md](references/events-and-api.md)

### File Menu
📄 **Read:** [references/file-menu.md](references/file-menu.md)
- File menu visibility and configuration
- Adding menu items with icons
- Submenu on click (showItemOnClick)
- Customizing file menu header text
- Menu item templates
- File menu events (beforeOpen, select, close)

### Backstage Menu
📄 **Read:** [references/backstage.md](references/backstage.md)
- Backstage overview and use cases
- Adding backstage items with content
- Footer items (isFooter property)
- Adding separators between items
- Back button customization (text, icon)
- Setting backstage target element
- Using templates for custom layouts
- Configuring width and height
- Backstage events (item click, open, close)

### Contextual Tabs
📄 **Read:** [references/contextual-tabs.md](references/contextual-tabs.md)
- Contextual tabs overview
- Controlling tab visibility
- Adding contextual tabs dynamically
- Setting selected contextual tabs (isSelected)
- Use cases (table editing, image editing, chart tools)

### Keytips
📄 **Read:** [references/keytips.md](references/keytips.md)
- Enabling keytip navigation
- Assigning keytips to tabs, groups, and items
- Keytip display (Alt + Windows/Command keys)
- Customizing keytip content
- Keytip navigation flow

### Tooltips and Help Pane
📄 **Read:** [references/tooltip-and-help.md](references/tooltip-and-help.md)
- Adding tooltip titles to items
- Setting tooltip content with descriptions
- Adding icons to tooltips
- Customizing tooltip appearance (cssClass)
- Configuring help pane template
- Help pane positioning and content

### Resizing Behavior
📄 **Read:** [references/resizing.md](references/resizing.md)
- Automatic resizing in Classic mode
- Automatic resizing in Simplified mode
- Defining constant item sizes (allowedSizes)
- Setting initial item size (activeSize)
- Understanding item size transitions

### Events and API
📄 **Read:** [references/events-and-api.md](references/events-and-api.md)
- Tab selection events (tabSelected, tabSelecting)
- Ribbon expand/collapse events
- Layout switched event (ribbonLayoutSwitched - responds to Classic/Simplified mode changes)
- Launcher icon click events
- Overflow popup events (open, close)
- Button, CheckBox, and DropDown item events
- SplitButton, ColorPicker, and Gallery events
- ComboBox filtering and selection events
- Common API methods (addTab, removeTab, addGroup, addItem, etc.)
- Advanced API methods (selectTab, getItem, getRootElement, refreshLayout, updateTab/Group/Item/Collection)

## Quick Start Example

```typescript
import { Ribbon, RibbonTabModel, RibbonItemType, RibbonFileMenu } from "@syncfusion/ej2-ribbon";
import { MenuItemModel } from "@syncfusion/ej2-navigations";

// Inject required modules
Ribbon.Inject(RibbonFileMenu);

// Define tabs with groups and items
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        collections: [{
            items: [{
                type: RibbonItemType.SplitButton,
                splitButtonSettings: {
                    iconCss: "e-icons e-paste",
                    content: "Paste",
                    items: [
                        { text: "Keep Source Format" },
                        { text: "Merge Format" },
                        { text: "Keep Text Only" }
                    ]
                }
            }]
        }, {
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Cut",
                    iconCss: "e-icons e-cut"
                }
            }, {
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Copy",
                    iconCss: "e-icons e-copy"
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
                type: RibbonItemType.DropDown,
                dropDownSettings: {
                    iconCss: "e-icons e-table",
                    content: "Table",
                    items: [
                        { text: "Insert Table" },
                        { text: "Draw Table" }
                    ]
                }
            }]
        }]
    }]
}];

// Define file menu items
let fileMenuItems: MenuItemModel[] = [
    { text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "open" },
    { text: "Save", iconCss: "e-icons e-save", id: "save" }
];

// Create Ribbon instance
let ribbon: Ribbon = new Ribbon({
    tabs: tabs,
    fileMenu: {
        menuItems: fileMenuItems,
        visible: true
    }
});

// Render to element
ribbon.appendTo("#ribbon");
```

## Common Patterns

### Adding a New Tab Dynamically

```typescript
// Add a new tab to existing ribbon
ribbon.addTab({
    header: "View",
    groups: [{
        header: "Views",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Print Layout",
                    iconCss: "e-icons e-print"
                }
            }]
        }]
    }]
});
```

### Switching Between Layouts

```typescript
// Switch to Simplified layout
ribbon.activeLayout = "Simplified";

// Switch to Classic layout
ribbon.activeLayout = "Classic";
```

### Handling Item Click Events

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Actions",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Save",
                    iconCss: "e-icons e-save",
                    clicked: () => {
                        console.log("Save button clicked");
                        // Your save logic here
                    }
                }
            }]
        }]
    }]
}];
```

### Enabling Contextual Tabs

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: tabs,
    contextualTabs: [{
        visible: true,
        isSelected: true,
        tabs: [{
            header: "Table Design",
            groups: [{
                header: "Styles",
                collections: [{
                    items: [{
                        type: RibbonItemType.Gallery,
                        gallerySettings: {
                            groups: [{
                                header: "Table Styles",
                                items: [
                                    { content: "Light" },
                                    { content: "Dark" }
                                ]
                            }]
                        }
                    }]
                }]
            }]
        }]
    }]
});
```

## Key Properties

- `tabs`: Array of tab configurations (required)
- `activeLayout`: "Classic" | "Simplified" (default: "Classic")
- `fileMenu`: File menu configuration with menu items
- `backStageMenu`: Backstage configuration with items and content
- `contextualTabs`: Array of contextual tab configurations
- `enableKeyTips`: Enable/disable keytip navigation (default: false)
- `isMinimized`: Show only tab headers when true (default: false)
- `hideLayoutSwitcher`: Show/hide layout switcher button (default: false)
- `helpPaneTemplate`: Custom template for help pane on the right
- `launcherIconCss`: CSS class for group launcher icons
- `selectedTab`: Index of currently selected tab (default: 0)

## Common Use Cases

### Use Case 1: Document Editor Ribbon

When user needs a full-featured document editor with text formatting:
- Create Home tab with Font, Paragraph, and Styles groups
- Use ComboBox for font family and size selection
- Add GroupButton for text formatting (bold, italic, underline)
- Include ColorPicker for text and highlight colors
- Implement Insert tab with Tables and Pictures groups
- Add File menu for New, Open, Save operations

### Use Case 2: Data Grid Application

When user needs a data-focused ribbon interface:
- Create Home tab with basic operations (Add, Edit, Delete)
- Add Data tab with Import/Export, Filter, and Sort groups
- Use Gallery items for predefined data templates
- Implement View tab with display options (grid styles, zoom)
- Add contextual tabs for when rows are selected
- Use Simplified layout for compact display

### Use Case 3: Design Tool with Contextual Tabs

When user needs object-specific commands:
- Create base tabs for general tools (Home, Insert, View)
- Add contextual tabs for selected objects (Image Tools, Shape Tools)
- Use Gallery for style presets and templates
- Implement backstage for file operations and settings
- Enable keytips for keyboard power users
- Add help pane with undo/redo buttons

### Use Case 4: Mobile-Responsive Application

When user needs ribbon to work on smaller screens:
- Use Simplified layout as default
- Enable group overflow popups (enableGroupOverflow: true)
- Set item priorities for intelligent collapsing
- Define allowedSizes for critical items
- Use minimized state for maximum content space
- Implement overflow popup events for analytics

### Use Case 5: Keyboard-Driven Workflow

When user prioritizes keyboard navigation:
- Enable keytips (enableKeyTips: true)
- Assign logical keytips to all tabs, groups, and items
- Add tooltips with keyboard shortcut hints
- Implement tab selection events for keyboard feedback
- Use CheckBox items for toggleable options
- Add help pane with keyboard shortcut reference

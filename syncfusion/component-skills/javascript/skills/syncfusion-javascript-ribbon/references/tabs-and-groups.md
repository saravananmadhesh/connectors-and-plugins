# Tabs and Groups

This guide covers the hierarchical structure of Ribbon tabs and groups, including tab configuration, group organization, orientation, launcher icons, and collapse behavior.

## Table of Contents

- [Ribbon Architecture](#ribbon-architecture)
- [Adding Tabs](#adding-tabs)
- [Tab Properties](#tab-properties)
- [Adding Groups](#adding-groups)
- [Group Headers and Icons](#group-headers-and-icons)
- [Group Orientation](#group-orientation)
- [Collections within Groups](#collections-within-groups)
- [Group Launcher Icons](#group-launcher-icons)
- [Collapsible Groups](#collapsible-groups)
- [Group Overflow Behavior](#group-overflow-behavior)
- [State Management - Enable/Disable/Show/Hide](#state-management---enabledisableshowhi)
- [Dynamic Tab and Group Management](#dynamic-tab-and-group-management)

## Ribbon Architecture

The Ribbon follows a 4-level hierarchy:

```
Ribbon
└── Tabs (Home, Insert, View)
    └── Groups (Clipboard, Font, Tables)
        └── Collections (organizing containers)
            └── Items (buttons, dropdowns, etc.)
```

Each level serves a specific purpose:
- **Tabs**: Top-level categories for organizing functionality
- **Groups**: Related command sets within a tab
- **Collections**: Visual groupings within a group
- **Items**: Individual interactive controls

## Adding Tabs

Define tabs in the `tabs` property of the Ribbon configuration:

```typescript
import { Ribbon, RibbonTabModel } from "@syncfusion/ej2-ribbon";

let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: []
}, {
    header: "Insert",
    groups: []
}, {
    header: "View",
    groups: []
}];

let ribbon: Ribbon = new Ribbon({
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

**Key points:**
- The `header` property defines the tab's display text
- Tabs appear in the order they are defined
- At least one tab is required

## Tab Properties

Tabs support several properties for customization:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    id: "home-tab",
    cssClass: "custom-tab",
    groups: []
}];
```

**Available properties:**

- `header` (string, required): Display text for the tab
- `id` (string): Unique identifier for the tab
- `cssClass` (string): Custom CSS class for styling
- `groups` (array, required): Array of groups within the tab

## Adding Groups

Groups organize related commands within a tab:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        collections: []
    }, {
        header: "Font",
        collections: []
    }, {
        header: "Paragraph",
        collections: []
    }]
}];
```

**Key points:**
- Each group has a `header` property for display text
- Groups appear side-by-side within a tab
- Groups visually separate related commands

## Group Headers and Icons

Customize group appearance with headers and icons:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        groupIconCss: "e-icons e-paste",
        collections: []
    }, {
        header: "Font",
        groupIconCss: "e-icons e-font",
        collections: []
    }]
}];
```

**Key points:**
- `header`: Text displayed at the bottom of the group
- `groupIconCss`: Icon CSS class for the group (visible in Simplified layout)
- Icons help users identify groups in collapsed state

## Group Orientation

Control how items are arranged within a group using the `orientation` property:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        orientation: "Row", // Items arranged horizontally
        collections: [{
            items: [/* items */]
        }]
    }, {
        header: "Font",
        orientation: "Column", // Items arranged vertically
        collections: [{
            items: [/* items */]
        }]
    }]
}];
```

**Orientation options:**

- **`Row` (default)**: Items arranged horizontally (left to right)
- **`Column`**: Items arranged vertically (top to bottom)

**When to use:**
- `Row`: Most common, good for toolbar-style layouts
- `Column`: Good for stacked controls or vertical space utilization

## Collections within Groups

Collections are containers for items within a group. They provide additional organizational structure:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        collections: [{
            // First collection - Paste button
            items: [{
                type: RibbonItemType.SplitButton,
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
            // Second collection - Cut and Copy buttons
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
}];
```

**Key points:**
- Collections visually separate related items within a group
- Each collection contains an `items` array
- Collections are displayed side-by-side or stacked based on orientation
- Use collections to create logical sub-groupings

## Group Launcher Icons

Add a launcher icon to open dialogs or additional options:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        showLauncherIcon: true,
        collections: []
    }, {
        header: "Font",
        showLauncherIcon: true,
        collections: []
    }]
}];

let ribbon: Ribbon = new Ribbon({
    tabs: tabs,
    launcherIconClick: (args) => {
        console.log("Launcher icon clicked for group:", args.groupId);
        // Open dialog or panel here
    }
});
```

**Key points:**
- `showLauncherIcon: true` displays a small arrow icon in the group header
- Use `launcherIconClick` event to handle clicks
- Launcher icons typically open dialogs with more options for that group

### Customizing Launcher Icon Appearance

Customize the launcher icon using `launcherIconCss`:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Paragraph",
        showLauncherIcon: true,
        launcherIconCss: "e-icons e-paragraph-dialog", // Custom CSS class for launcher icon
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: { content: "Left" }
            }]
        }]
    }, {
        header: "Font",
        showLauncherIcon: true,
        launcherIconCss: "e-icons e-font-dialog", // Custom icon
        collections: []
    }]
}];

let ribbon: Ribbon = new Ribbon({
    tabs: tabs,
    launcherIconClick: (args) => {
        console.log("Launcher clicked for group:", args.groupId);
    }
});
```

**Launcher icon properties:**
- `launcherIconCss` (string): CSS class for the launcher icon
- `showLauncherIcon` (boolean): Whether to show the launcher icon
- `launcherIconKeyTip` (string): KeyTip text for keyboard navigation

**Icon sources:**
- Syncfusion built-in: `e-icons e-[name]`
- Font Awesome: `fa fa-[name]`
- Custom CSS classes with background images
- Material Icons: `material-icons` class

## Collapsible Groups

Groups can be made collapsible to save space when the Ribbon is minimized:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        isCollapsible: true,
        priority: 1, // Collapses first when space is limited
        collections: []
    }, {
        header: "Font",
        isCollapsible: true,
        priority: 2, // Collapses second
        collections: []
    }, {
        header: "Styles",
        isCollapsible: false, // Never collapses
        collections: []
    }]
}];
```

**Collapse properties:**

- `isCollapsible` (boolean): Whether the group can collapse (default: true)
- `priority` (number): Collapse order (lower priority collapses first)

**Behavior:**
- When space is limited, groups collapse based on priority
- Collapsed groups show only their icon (groupIconCss)
- Users can click collapsed groups to open a popup with items

## Group Overflow Behavior

Enable group overflow to display groups in a popup when space is limited:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        enableGroupOverflow: true,
        collections: []
    }]
}];
```

**Key points:**
- `enableGroupOverflow: true` allows the group to move to an overflow popup
- Useful for responsive designs with many groups
- Groups in overflow are accessible via a dropdown button

## State Management - Enable/Disable/Show/Hide

Control the enabled/disabled and visible/hidden state of tabs and groups dynamically.

### Disabling and Enabling Tabs

Disable tabs to prevent interaction while keeping them visible:

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        id: "home-tab",
        groups: []
    }, {
        header: "Advanced",
        id: "advanced-tab",
        groups: []
    }]
});

ribbon.appendTo("#ribbon");

// Disable the Advanced tab
ribbon.disableTab("advanced-tab");

// Enable the Advanced tab
ribbon.enableTab("advanced-tab");
```

**Use cases:** Permission-based feature access, disabling features when conditions aren't met.

### Hiding and Showing Tabs

Completely hide tabs from the UI:

```typescript
// Hide a regular tab
ribbon.hideTab("advanced-tab", false);

// Show a regular tab
ribbon.showTab("advanced-tab", false);

// Hide a contextual tab
ribbon.hideTab("table-design", true);

// Show a contextual tab
ribbon.showTab("table-design", true);
```

### Disabling and Enabling Groups

Disable specific groups within a tab:

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        groups: [{
            header: "Clipboard",
            id: "clipboard",
            collections: []
        }, {
            header: "Font",
            id: "font",
            collections: []
        }]
    }]
});

ribbon.appendTo("#ribbon");

// Disable the Font group when no text is selected
ribbon.disableGroup("font");

// Enable it when text is selected
ribbon.enableGroup("font");
```

### Hiding and Showing Groups

Hide groups from the UI:

```typescript
ribbon.hideGroup("font");
ribbon.showGroup("font");
```

### Permission-Based Example

```typescript
function applyUserPermissions(role: "viewer" | "editor" | "admin") {
    const editGroups = ["clipboard", "font", "paragraph"];
    const adminGroups = ["permissions", "audit"];
    
    if (role === "viewer") {
        editGroups.forEach(g => ribbon.disableGroup(g));
        adminGroups.forEach(g => ribbon.hideGroup(g));
    } else if (role === "editor") {
        editGroups.forEach(g => ribbon.enableGroup(g));
        adminGroups.forEach(g => ribbon.hideGroup(g));
    } else {
        editGroups.forEach(g => ribbon.enableGroup(g));
        adminGroups.forEach(g => ribbon.showGroup(g));
    }
}
```

---

## Dynamic Tab and Group Management

Add, remove, or update tabs and groups programmatically:

### Adding a Tab

```typescript
ribbon.addTab({
    header: "Design",
    groups: [{
        header: "Themes",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Theme Gallery",
                    iconCss: "e-icons e-palette"
                }
            }]
        }]
    }]
});
```

### Removing a Tab

```typescript
ribbon.removeTab("home-tab"); // Remove by ID
```

### Adding a Group

```typescript
ribbon.addGroup("home-tab", {
    header: "New Group",
    collections: []
});
```

### Removing a Group

```typescript
ribbon.removeGroup("clipboard-group"); // Remove by ID
```

### Selecting a Tab

```typescript
// Set selected tab by index
ribbon.selectedTab = 1; // Select second tab

// Or use setProperties
ribbon.setProperties({ selectedTab: 2 });
```

## Complete Example

```typescript
import { Ribbon, RibbonTabModel, RibbonItemType } from "@syncfusion/ej2-ribbon";

let tabs: RibbonTabModel[] = [{
    header: "Home",
    id: "home-tab",
    groups: [{
        header: "Clipboard",
        id: "clipboard-group",
        orientation: "Row",
        showLauncherIcon: true,
        isCollapsible: true,
        priority: 1,
        groupIconCss: "e-icons e-paste",
        collections: [{
            items: [{
                type: RibbonItemType.SplitButton,
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
    }, {
        header: "Font",
        id: "font-group",
        orientation: "Column",
        showLauncherIcon: true,
        groupIconCss: "e-icons e-font",
        collections: [{
            items: [{
                type: RibbonItemType.ComboBox,
                comboBoxSettings: {
                    dataSource: ["Arial", "Times New Roman", "Verdana"],
                    width: "150px"
                }
            }]
        }]
    }]
}, {
    header: "Insert",
    id: "insert-tab",
    groups: [{
        header: "Tables",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Table",
                    iconCss: "e-icons e-table"
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    tabs: tabs,
    launcherIconClick: (args) => {
        console.log("Launcher clicked:", args.groupId);
    }
});

ribbon.appendTo("#ribbon");
```

This example demonstrates:
- Multiple tabs with IDs
- Groups with headers, icons, and launcher icons
- Different orientations (Row vs Column)
- Collapsible groups with priorities
- Collections organizing items within groups

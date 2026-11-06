# Getting Started with Syncfusion JavaScript Ribbon

This guide covers installation, basic setup, module injection, and creating your first Ribbon control.

## Table of Contents

- [Installation](#installation)
- [Module Injection](#module-injection)
- [CSS References](#css-references)
- [Basic Ribbon Setup](#basic-ribbon-setup)
- [Creating Tabs and Groups](#creating-tabs-and-groups)
- [Adding Items](#adding-items)
- [Complete Example](#complete-example)

## Installation

Install the Ribbon package from npm:

```bash
npm install @syncfusion/ej2-ribbon --save
```

The `@syncfusion/ej2-ribbon` package includes the Ribbon control and all its dependencies.

## Module Injection

The Ribbon control uses a modular architecture. Some features require explicit module injection before use.

### Default Modules (Always Available)

The following item types are available by default without injection:

- **RibbonButton** - Button items
- **RibbonCheckBox** - CheckBox items
- **RibbonDropDown** - DropDown items
- **RibbonSplitButton** - SplitButton items
- **RibbonComboBox** - ComboBox items
- **RibbonGroupButton** - GroupButton items

### Selective Modules (Require Injection)

For advanced features, inject the required modules:

```typescript
import { Ribbon, RibbonColorPicker, RibbonGallery, RibbonFileMenu, RibbonBackstage, RibbonContextualTab, RibbonKeyTip } from "@syncfusion/ej2-ribbon";

// Inject required modules
Ribbon.Inject(RibbonColorPicker, RibbonGallery, RibbonFileMenu, RibbonBackstage, RibbonContextualTab, RibbonKeyTip);
```

**Module Reference:**

- **RibbonColorPicker** - For ColorPicker items
- **RibbonGallery** - For Gallery items
- **RibbonFileMenu** - For File menu functionality
- **RibbonBackstage** - For Backstage view
- **RibbonContextualTab** - For contextual tabs
- **RibbonKeyTip** - For keytip navigation

**When to inject modules:**
- Inject only the modules you need to reduce bundle size
- Inject before creating the Ribbon instance
- Inject once at application startup

## CSS References

To install the fluent2 theme package, use the following command:

```bash
npm install @syncfusion/ej2-fluent2-theme --save
```

Import the required CSS files for the Ribbon control and its dependencies:

```css

@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/ribbon/index.css";
```

**Available themes:**
- `material.css` - Material theme
- `bootstrap5.css` - Bootstrap 5 theme
- `fabric.css` - Fabric theme
- `tailwind.css` - Tailwind CSS theme
- `fluent.css` - Fluent theme
- `material3.css` - Material 3 theme

Replace `material` with your preferred theme name in all imports.

## Basic Ribbon Setup

Create a Ribbon instance with minimal configuration:

```typescript
import { Ribbon } from "@syncfusion/ej2-ribbon";

// Create Ribbon instance
let ribbon: Ribbon = new Ribbon({
    tabs: []
});

// Render to DOM element
ribbon.appendTo("#ribbon");
```

**HTML:**

```html
<div id="ribbon"></div>
```

This creates an empty Ribbon control. Now let's add tabs, groups, and items.

## Creating Tabs and Groups

Tabs organize the Ribbon into logical sections. Each tab contains groups of related commands.

```typescript
import { Ribbon, RibbonTabModel } from "@syncfusion/ej2-ribbon";

let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        collections: []
    }, {
        header: "Font",
        collections: []
    }]
}, {
    header: "Insert",
    groups: [{
        header: "Tables",
        collections: []
    }]
}];

let ribbon: Ribbon = new Ribbon({
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

**Key points:**
- Each tab has a `header` (display text)
- Each group has a `header` (display text)
- `collections` contain the items (currently empty)

## Adding Items

Items are the interactive controls in the Ribbon. Add items to collections within groups.

```typescript
import { Ribbon, RibbonTabModel, RibbonItemType } from "@syncfusion/ej2-ribbon";

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
            }, {
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Copy",
                    iconCss: "e-icons e-copy"
                }
            }, {
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Paste",
                    iconCss: "e-icons e-paste"
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

**Key points:**
- Each item has a `type` (Button, CheckBox, DropDown, etc.)
- Item settings are specific to the type (e.g., `buttonSettings` for buttons)
- Items are arranged horizontally within a collection

## Complete Example

Here's a complete example with multiple tabs, groups, and item types:

```typescript
import { Ribbon, RibbonTabModel, RibbonItemType } from "@syncfusion/ej2-ribbon";

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
    }, {
        header: "Font",
        collections: [{
            items: [{
                type: RibbonItemType.ComboBox,
                comboBoxSettings: {
                    dataSource: ["Arial", "Times New Roman", "Verdana", "Segoe UI"],
                    width: "150px",
                    index: 0
                }
            }, {
                type: RibbonItemType.ComboBox,
                comboBoxSettings: {
                    dataSource: ["8", "10", "12", "14", "16", "18", "20"],
                    width: "65px",
                    index: 2
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
                        { text: "Draw Table" },
                        { text: "Convert Text to Table" }
                    ]
                }
            }]
        }]
    }, {
        header: "Illustrations",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Pictures",
                    iconCss: "e-icons e-image"
                }
            }, {
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Shapes",
                    iconCss: "e-icons e-rectangle"
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

This example creates a Ribbon with:
- 2 tabs: Home and Insert
- Home tab with Clipboard (SplitButton, Buttons) and Font (ComboBoxes) groups
- Insert tab with Tables (DropDown) and Illustrations (Buttons) groups

## State Persistence

Enable automatic state persistence to save the ribbon's state between page reloads:

```typescript
let ribbon: Ribbon = new Ribbon({
    enablePersistence: true,  // Save state to browser storage
    activeLayout: "Classic",
    isMinimized: false,
    selectedTab: 0,
    tabs: []
});

ribbon.appendTo("#ribbon");
```

**What gets persisted:**
- Currently active layout (Classic or Simplified)
- Selected tab index
- Minimized/expanded state
- Any custom user preferences

**Storage:** Uses browser's localStorage by default.

---

## Right-to-Left (RTL) Support

Enable RTL layout for languages like Arabic, Hebrew, and Persian:

```typescript
let ribbon: Ribbon = new Ribbon({
    enableRtl: true,  // Enable RTL rendering
    activeLayout: "Classic",
    tabs: []
});

ribbon.appendTo("#ribbon");
```

**RTL behavior:**
- All ribbon elements flip horizontally
- Tab navigation right-to-left
- Menu items displayed RTL
- Icon positions reversed

**CSS support:** Make sure theme CSS supports RTL (most Syncfusion themes do).

---

## Localization

Set the ribbon's locale for multi-language support:

```typescript
let ribbon: Ribbon = new Ribbon({
    locale: "ar-AE",  // Arabic (UAE)
    tabs: []
});

ribbon.appendTo("#ribbon");
```

**Common locales:**
- `en-US` - English (United States)
- `de-DE` - German
- `fr-FR` - French
- `es-ES` - Spanish
- `ar-AE` - Arabic
- `he-IL` - Hebrew
- `zh-CN` - Chinese (Simplified)
- `ja-JP` - Japanese

**Localized components:** Locale affects all child components (menus, dialogs, tooltips).

---

## Help Pane Template

Add custom help or status content to the right side of the ribbon header:

```typescript
let ribbon: Ribbon = new Ribbon({
    helpPaneTemplate: '<div class="help-container"><p>Press F1 for help</p></div>',
    tabs: []
});

ribbon.appendTo("#ribbon");
```

**helpPaneTemplate types:**
- **String:** HTML string rendered directly
- **HTMLElement:** DOM element reference
- **Function:** Returns HTML string or element dynamically

**Common use cases:**
- Contextual help text
- Search box
- User profile widget
- Status indicators
- Support links

**Positioning:** Always appears on the right side of the ribbon header row.

**Note:** The help pane template is independent from the ribbon's tabs and groups. See the `tooltip-and-help.md` reference guide for detailed configuration examples.

---

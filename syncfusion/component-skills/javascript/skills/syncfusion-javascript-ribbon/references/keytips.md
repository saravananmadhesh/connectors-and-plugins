# Keytips

This guide covers Keytips in the Ribbon, which provide keyboard navigation shortcuts for accessing ribbon commands without using the mouse. **Keytips require the RibbonKeyTip module.**

## Table of Contents

- [Keytips Overview](#keytips-overview)
- [Module Injection](#module-injection)
- [Enabling Keytips](#enabling-keytips)
- [Assigning Keytips to Tabs](#assigning-keytips-to-tabs)
- [Assigning Keytips to Groups](#assigning-keytips-to-groups)
- [Assigning Keytips to Items](#assigning-keytips-to-items)
- [Keytip Display and Navigation](#keytip-display-and-navigation)
- [Customizing Keytip Content](#customizing-keytip-content)
- [Best Practices](#best-practices)
- [Layout Switcher Keytip](#layout-switcher-keytip)
- [Complete Examples](#complete-examples)

## Keytips Overview

Keytips provide keyboard shortcuts for ribbon navigation, similar to Microsoft Office applications:

**Benefits:**
- Keyboard-only navigation without mouse
- Faster access to commands for power users
- Accessibility improvement for keyboard users
- Familiar interaction pattern from Office apps

**How it works:**
1. User presses **Alt** key (Windows) or **Alt + Windows** key
2. Keytips appear on tabs, groups, and items
3. User presses the corresponding key to navigate
4. Sub-keytips appear for selected elements
5. User continues navigation until reaching desired command

**Example flow:**
```
Alt → H (Home tab) → C (Clipboard group) → C (Copy button)
```

## Module Injection

Keytips require the `RibbonKeyTip` module:

```typescript
import { Ribbon, RibbonKeyTip } from "@syncfusion/ej2-ribbon";

// Inject KeyTip module
Ribbon.Inject(RibbonKeyTip);
```

**Important:** Always inject `RibbonKeyTip` before creating a Ribbon with keytips.

## Enabling Keytips

Enable keytips in the Ribbon configuration:

```typescript
import { Ribbon, RibbonKeyTip } from "@syncfusion/ej2-ribbon";

Ribbon.Inject(RibbonKeyTip);

let ribbon: Ribbon = new Ribbon({
    enableKeyTips: true, // Enable keytip navigation
    tabs: []
});

ribbon.appendTo("#ribbon");
```

**Key points:**
- `enableKeyTips: true` activates keytip functionality
- Keytips display when user presses Alt key
- Disabled by default to avoid clutter

## Assigning Keytips to Tabs

Assign keytips to tabs using the `keyTip` property:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    keyTip: "H", // Alt + H
    groups: []
}, {
    header: "Insert",
    keyTip: "N", // Alt + N (N for iNsert)
    groups: []
}, {
    header: "View",
    keyTip: "V", // Alt + V
    groups: []
}];

let ribbon: Ribbon = new Ribbon({
    enableKeyTips: true,
    tabs: tabs
});
```

**Best practices for tab keytips:**
- Use first letter when possible (Home → H, View → V)
- Use alternative letter if first is taken (Insert → N for iNsert)
- Keep consistent with Microsoft Office conventions
- Use single uppercase letters

## Assigning Keytips to Groups

Assign keytips to groups for direct navigation:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    keyTip: "H",
    groups: [{
        header: "Clipboard",
        keyTip: "C", // H → C (Home, Clipboard)
        collections: []
    }, {
        header: "Font",
        keyTip: "F", // H → F (Home, Font)
        collections: []
    }, {
        header: "Paragraph",
        keyTip: "P", // H → P (Home, Paragraph)
        collections: []
    }]
}];
```

**Keytip navigation flow:**
1. Press Alt → Tab keytips appear
2. Press H → Group keytips appear in Home tab
3. Press C → Item keytips appear in Clipboard group

## Assigning Keytips to Items

Assign keytips to individual items:

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    keyTip: "H",
    groups: [{
        header: "Clipboard",
        keyTip: "C",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                keyTip: "C", // H → C → C (Copy)
                buttonSettings: {
                    content: "Copy",
                    iconCss: "e-icons e-copy"
                }
            }, {
                type: RibbonItemType.Button,
                keyTip: "X", // H → C → X (Cut)
                buttonSettings: {
                    content: "Cut",
                    iconCss: "e-icons e-cut"
                }
            }, {
                type: RibbonItemType.Button,
                keyTip: "V", // H → C → V (Paste)
                buttonSettings: {
                    content: "Paste",
                    iconCss: "e-icons e-paste"
                }
            }]
        }]
    }]
}];
```

**Multi-level navigation:**
```
Alt → H (Home) → C (Clipboard) → C (Copy command executed)
Alt → H (Home) → C (Clipboard) → X (Cut command executed)
```

## Keytip Display and Navigation

Understanding keytip behavior:

### Activation

```
Windows: Alt key
Mac: Alt + Windows/Command key
```

### Navigation Levels

**Level 1: Tab Keytips**
```
Press Alt → Shows tab keytips (H, N, V)
```

**Level 2: Group Keytips**
```
Press H → Shows group keytips within Home tab (C, F, P)
```

**Level 3: Item Keytips**
```
Press C → Shows item keytips within Clipboard group (C, X, V)
```

**Level 4: Command Execution**
```
Press V → Executes Paste command
```

### Escape Navigation

```
Esc key: Go back one level or exit keytip mode
```

## Customizing Keytip Content

Customize keytip text and styling:

### Multi-Character Keytips

```typescript
{
    header: "Advanced Options",
    keyTip: "AO", // Two-character keytip
    groups: []
}
```

**Use cases:**
- When single characters are exhausted
- For clarity (AO = Advanced Options)
- Mnemonic combinations

### Keytip Styling

Apply custom CSS classes:

```typescript
let ribbon: Ribbon = new Ribbon({
    enableKeyTips: true,
    cssClass: "custom-keytips",
    tabs: []
});
```

**CSS:**

```css
.custom-keytips .e-ribbon-keytip {
    background-color: #0078d4;
    color: white;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 3px;
}
```

## Best Practices

### 1. Logical Key Assignment

```typescript
// Good: Use first letter
{ header: "Home", keyTip: "H" }
{ header: "View", keyTip: "V" }

// Good: Use mnemonic when first letter taken
{ header: "Insert", keyTip: "N" } // iNsert

// Avoid: Random letters
{ header: "Home", keyTip: "Q" } // Not intuitive
```

### 2. Consistent with Microsoft Office

```typescript
// Office-style keytips
let tabs = [
    { header: "Home", keyTip: "H" },
    { header: "Insert", keyTip: "N" },
    { header: "Page Layout", keyTip: "P" },
    { header: "References", keyTip: "S" },
    { header: "Mailings", keyTip: "M" },
    { header: "Review", keyTip: "R" },
    { header: "View", keyTip: "W" }
];
```

### 3. Unique Keytips per Level

```typescript
// Good: Unique keytips within Home tab
{
    header: "Home",
    keyTip: "H",
    groups: [
        { header: "Clipboard", keyTip: "C" },
        { header: "Font", keyTip: "F" },
        { header: "Paragraph", keyTip: "P" }
    ]
}

// Avoid: Duplicate keytips in same level
{
    header: "Home",
    keyTip: "H",
    groups: [
        { header: "Clipboard", keyTip: "C" },
        { header: "Chart", keyTip: "C" } // Conflict!
    ]
}
```

### 4. Common Command Shortcuts

```typescript
// Standard command keytips
{ content: "Copy", keyTip: "C" }
{ content: "Cut", keyTip: "X" }
{ content: "Paste", keyTip: "V" }
{ content: "Bold", keyTip: "B" }
{ content: "Italic", keyTip: "I" }
{ content: "Underline", keyTip: "U" }
{ content: "Save", keyTip: "S" }
{ content: "Print", keyTip: "P" }
```

## Layout Switcher Keytip

Assign a keytip to the layout switcher button:

```typescript
let ribbon: Ribbon = new Ribbon({
    enableKeyTips: true,
    layoutSwitcherKeyTip: "Y",  // Alt + Y to toggle layout
    activeLayout: "Classic",
    tabs: []
});

ribbon.appendTo("#ribbon");
```

**Navigation:** Press Alt to show keytips, then press Y to switch between Classic and Simplified layouts. Keytip appears on the layout switcher button.

**Recommended keys:** Y, L (Layout), M (Mode), V (View if not used for View tab).

---

## Complete Examples

### Example 1: Full Keytip Navigation

```typescript
import { Ribbon, RibbonKeyTip, RibbonTabModel, RibbonItemType } from "@syncfusion/ej2-ribbon";

Ribbon.Inject(RibbonKeyTip);

let tabs: RibbonTabModel[] = [{
    header: "Home",
    keyTip: "H",
    groups: [{
        header: "Clipboard",
        keyTip: "C",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                keyTip: "C",
                buttonSettings: {
                    content: "Copy",
                    iconCss: "e-icons e-copy",
                    clicked: () => console.log("Copy executed via keytip")
                }
            }, {
                type: RibbonItemType.Button,
                keyTip: "X",
                buttonSettings: {
                    content: "Cut",
                    iconCss: "e-icons e-cut",
                    clicked: () => console.log("Cut executed via keytip")
                }
            }, {
                type: RibbonItemType.Button,
                keyTip: "V",
                buttonSettings: {
                    content: "Paste",
                    iconCss: "e-icons e-paste",
                    clicked: () => console.log("Paste executed via keytip")
                }
            }]
        }]
    }, {
        header: "Font",
        keyTip: "F",
        collections: [{
            items: [{
                type: RibbonItemType.ComboBox,
                keyTip: "FF",
                comboBoxSettings: {
                    dataSource: ["Arial", "Times New Roman", "Verdana"],
                    width: "150px"
                }
            }]
        }, {
            items: [{
                type: RibbonItemType.GroupButton,
                keyTip: "B",
                groupButtonSettings: {
                    selection: "Multiple",
                    items: [
                        { iconCss: "e-icons e-bold", content: "Bold" },
                        { iconCss: "e-icons e-italic", content: "Italic" },
                        { iconCss: "e-icons e-underline", content: "Underline" }
                    ]
                }
            }]
        }]
    }]
}, {
    header: "Insert",
    keyTip: "N",
    groups: [{
        header: "Tables",
        keyTip: "T",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                keyTip: "T",
                buttonSettings: {
                    content: "Table",
                    iconCss: "e-icons e-table",
                    clicked: () => console.log("Insert table via keytip")
                }
            }]
        }]
    }, {
        header: "Illustrations",
        keyTip: "I",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                keyTip: "P",
                buttonSettings: {
                    content: "Picture",
                    iconCss: "e-icons e-image",
                    clicked: () => console.log("Insert picture via keytip")
                }
            }, {
                type: RibbonItemType.Button,
                keyTip: "S",
                buttonSettings: {
                    content: "Shape",
                    iconCss: "e-icons e-rectangle",
                    clicked: () => console.log("Insert shape via keytip")
                }
            }]
        }]
    }]
}, {
    header: "View",
    keyTip: "V",
    groups: [{
        header: "Views",
        keyTip: "V",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                keyTip: "P",
                buttonSettings: {
                    content: "Print Layout",
                    iconCss: "e-icons e-print"
                }
            }, {
                type: RibbonItemType.Button,
                keyTip: "W",
                buttonSettings: {
                    content: "Web Layout",
                    iconCss: "e-icons e-web"
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    enableKeyTips: true,
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

**Navigation examples:**
- **Copy**: Alt → H → C → C
- **Bold**: Alt → H → F → B
- **Insert Table**: Alt → N → T → T
- **Print Layout**: Alt → V → V → P

### Example 2: Complex Keytip Hierarchy

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    keyTip: "H",
    groups: [{
        header: "Clipboard",
        keyTip: "CL",
        collections: [{
            items: [{
                type: RibbonItemType.SplitButton,
                keyTip: "P",
                splitButtonSettings: {
                    content: "Paste",
                    iconCss: "e-icons e-paste",
                    items: [
                        { text: "Paste", id: "paste" },
                        { text: "Paste Special", id: "paste-special" }
                    ],
                    click: () => console.log("Paste via keytip"),
                    select: (args) => console.log("Paste option:", args.item.text)
                }
            }]
        }]
    }, {
        header: "Editing",
        keyTip: "ED",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                keyTip: "FD",
                buttonSettings: {
                    content: "Find",
                    iconCss: "e-icons e-search"
                }
            }, {
                type: RibbonItemType.Button,
                keyTip: "R",
                buttonSettings: {
                    content: "Replace",
                    iconCss: "e-icons e-replace"
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    enableKeyTips: true,
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

These examples demonstrate comprehensive keytip implementation with single and multi-character keytips, logical grouping, and Office-style navigation patterns.

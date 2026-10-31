# Tooltips and Help Pane

This guide covers tooltips for ribbon items and the help pane template for displaying help content in the Ribbon header.

## Table of Contents

- [Tooltips Overview](#tooltips-overview)
- [Adding Tooltip Titles](#adding-tooltip-titles)
- [Adding Tooltip Content](#adding-tooltip-content)
- [Tooltip Icons](#tooltip-icons)
- [Tooltip Styling](#tooltip-styling)
- [Help Pane Overview](#help-pane-overview)
- [Configuring Help Pane Template](#configuring-help-pane-template)
- [Help Pane Positioning](#help-pane-positioning)
- [Complete Examples](#complete-examples)

## Tooltips Overview

Tooltips provide additional information when users hover over ribbon items:

**Benefits:**
- Explain command purpose without cluttering UI
- Display keyboard shortcuts
- Provide usage hints
- Improve discoverability of features

**Tooltip components:**
- **Title**: Brief command name
- **Content**: Detailed description
- **Icon**: Optional visual indicator
- **CSS Class**: Custom styling

## Adding Tooltip Titles

Add simple tooltip titles to items:

```typescript
{
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "Save",
        iconCss: "e-icons e-save"
    },
    tooltipSettings: {
        title: "Save Document"
    }
}
```

**Title-only tooltip:**

```typescript
{
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "Cut",
        iconCss: "e-icons e-cut"
    },
    tooltipSettings: {
        title: "Cut (Ctrl+X)"
    }
}
```

**Key points:**
- Title appears as bold text at top of tooltip
- Keep titles brief (2-5 words)
- Include keyboard shortcuts when applicable

## Adding Tooltip Content

Add detailed descriptions to tooltips:

```typescript
{
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "Paste",
        iconCss: "e-icons e-paste"
    },
    tooltipSettings: {
        title: "Paste (Ctrl+V)",
        content: "Insert content from the clipboard into your document at the cursor position."
    }
}
```

**Rich content:**

```typescript
{
    type: RibbonItemType.SplitButton,
    splitButtonSettings: {
        content: "Format Painter",
        iconCss: "e-icons e-format-painter"
    },
    tooltipSettings: {
        title: "Format Painter",
        content: "<p>Copy formatting from one place and apply it to another.</p>" +
                 "<p><strong>Single click:</strong> Apply once</p>" +
                 "<p><strong>Double click:</strong> Apply multiple times</p>"
    }
}
```

**Key points:**
- Content provides detailed explanation
- Supports HTML formatting
- Use for complex commands that need explanation
- Keep content concise (1-3 sentences)

## Tooltip Icons

Add icons to tooltips for visual context:

```typescript
{
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "Help",
        iconCss: "e-icons e-help"
    },
    tooltipSettings: {
        title: "Get Help",
        content: "Access documentation, tutorials, and support resources.",
        iconCss: "e-icons e-help-circle"
    }
}
```

**Warning tooltip:**

```typescript
{
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "Delete",
        iconCss: "e-icons e-delete"
    },
    tooltipSettings: {
        title: "Delete",
        content: "This action cannot be undone. Are you sure?",
        iconCss: "e-icons e-warning"
    }
}
```

**Icon options:**
- `e-icons e-info`: Information
- `e-icons e-help-circle`: Help
- `e-icons e-warning`: Warning
- `e-icons e-check-circle`: Success
- Custom icon CSS classes

## Tooltip Styling

Customize tooltip appearance with CSS classes:

```typescript
{
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "Premium Feature",
        iconCss: "e-icons e-star"
    },
    tooltipSettings: {
        title: "Premium Feature",
        content: "This feature is available to Premium subscribers only.",
        cssClass: "premium-tooltip"
    }
}
```

**CSS:**

```css
.premium-tooltip {
    background-color: #ffd700;
    color: #000;
    border: 2px solid #ffaa00;
}

.premium-tooltip .e-tip-content {
    font-weight: 500;
}
```

**Custom styling examples:**

```typescript
// Error tooltip
{
    tooltipSettings: {
        title: "Error",
        content: "Unable to save document. Check permissions.",
        cssClass: "error-tooltip"
    }
}

// Info tooltip
{
    tooltipSettings: {
        title: "Tip",
        content: "Use Ctrl+Z to undo your last action.",
        cssClass: "info-tooltip"
    }
}
```

**CSS:**

```css
.error-tooltip {
    background-color: #f44336;
    color: white;
}

.info-tooltip {
    background-color: #2196f3;
    color: white;
}
```

## Help Pane Overview

The Help Pane displays custom content in the Ribbon header, typically on the right side:

**Common uses:**
- Undo/Redo buttons
- Search box
- User profile
- Quick actions
- Application status

**Key features:**
- Custom HTML template
- Right-side positioning (by default)
- Always visible in Ribbon header
- Independent of tabs and groups

## helpPaneTemplate Property

### Property Definition

```typescript
helpPaneTemplate: string | HTMLElement | Function
```

**Type:** `string | HTMLElement | Function`  
**Default:** `''` (empty string)  
**Description:** Specifies the template content for the help pane of the Ribbon. The help pane appears on the right side of the ribbon header row, providing a dedicated area for custom controls and content that should be always visible alongside the ribbon tabs.

### Property Overview

The `helpPaneTemplate` property accepts three types of input:

1. **String (HTML):** Raw HTML string for template content
2. **HTMLElement:** DOM element reference
3. **Function:** Function that returns HTML string or DOM element

### Using helpPaneTemplate

#### Basic String Template

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    helpPaneTemplate: '<div><button class="e-btn">Help</button></div>'
});

ribbon.appendTo("#ribbon");
```

#### String with Inline Styles

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    helpPaneTemplate: '<div style="padding: 5px; color: #333;">' +
                      '  <span class="e-icons e-info"></span> Help' +
                      '</div>'
});
```

#### HTMLElement Reference

```typescript
// Create template element
const helpElement = document.createElement('div');
helpElement.innerHTML = '<button class="e-btn">Support</button>';
helpElement.style.padding = '5px';

let ribbon: Ribbon = new Ribbon({
    tabs: [],
    helpPaneTemplate: helpElement
});

ribbon.appendTo("#ribbon");
```

#### Function Template

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    helpPaneTemplate: () => {
        const template = document.createElement('div');
        template.innerHTML = '<button class="e-btn e-icon-btn">' +
                           '  <span class="e-icons e-help"></span>' +
                           '</button>';
        return template;
    }
});
```

### Property Characteristics

| Feature | Behavior |
|---------|----------|
| **Position** | Right side of Ribbon header row |
| **Visibility** | Always visible (not affected by tabs) |
| **Width** | Adjusts based on content |
| **Responsiveness** | Adapts to available space |
| **Interaction** | Independent from Ribbon tabs and groups |
| **Styling** | Inherits Ribbon theme by default |

### Limitations and Considerations

- Help pane content does NOT have access to Ribbon context
- Very long content may overflow - use CSS overflow handling
- Content must be manually styled for theme consistency
- Dynamic updates require manual DOM manipulation

## Configuring Help Pane Template

Add custom content to the help pane:

### Basic Help Pane

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    helpPaneTemplate: '<div class="help-pane">' +
                      '  <button class="e-btn e-icon-btn">' +
                      '    <span class="e-icons e-help"></span>' +
                      '  </button>' +
                      '</div>'
});

ribbon.appendTo("#ribbon");
```

### Undo/Redo Buttons

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    helpPaneTemplate: '<div class="help-pane" style="display: flex; gap: 5px;">' +
                      '  <button id="undoBtn" class="e-btn e-icon-btn" onclick="undo()">' +
                      '    <span class="e-icons e-undo"></span>' +
                      '  </button>' +
                      '  <button id="redoBtn" class="e-btn e-icon-btn" onclick="redo()">' +
                      '    <span class="e-icons e-redo"></span>' +
                      '  </button>' +
                      '</div>'
});
```

### Search Box

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    helpPaneTemplate: '<div class="help-pane">' +
                      '  <input type="text" class="e-input" placeholder="Search commands..." style="width: 200px;" />' +
                      '</div>'
});
```

### User Profile

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    helpPaneTemplate: '<div class="help-pane" style="display: flex; align-items: center; gap: 10px;">' +
                      '  <img src="avatar.jpg" alt="User" style="width: 32px; height: 32px; border-radius: 50%;" />' +
                      '  <span>John Doe</span>' +
                      '  <button class="e-btn e-icon-btn">' +
                      '    <span class="e-icons e-settings"></span>' +
                      '  </button>' +
                      '</div>'
});
```

### Multiple Components

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    helpPaneTemplate: '<div class="help-pane" style="display: flex; align-items: center; gap: 15px;">' +
                      '  <div class="undo-redo">' +
                      '    <button class="e-btn e-icon-btn" onclick="undo()">' +
                      '      <span class="e-icons e-undo"></span>' +
                      '    </button>' +
                      '    <button class="e-btn e-icon-btn" onclick="redo()">' +
                      '      <span class="e-icons e-redo"></span>' +
                      '    </button>' +
                      '  </div>' +
                      '  <input type="text" class="e-input" placeholder="Search..." style="width: 150px;" />' +
                      '  <button class="e-btn e-icon-btn">' +
                      '    <span class="e-icons e-help"></span>' +
                      '  </button>' +
                      '</div>'
});
```

**Styling for positioning:**

```css
.help-pane {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 15px;
}
```

## Complete Examples

### Example 1: Tooltips with Keyboard Shortcuts

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
                },
                tooltipSettings: {
                    title: "Cut (Ctrl+X)",
                    content: "Remove the selected content and copy it to the clipboard."
                }
            }, {
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Copy",
                    iconCss: "e-icons e-copy"
                },
                tooltipSettings: {
                    title: "Copy (Ctrl+C)",
                    content: "Copy the selected content to the clipboard."
                }
            }, {
                type: RibbonItemType.SplitButton,
                splitButtonSettings: {
                    content: "Paste",
                    iconCss: "e-icons e-paste",
                    items: [
                        { text: "Keep Source Formatting" },
                        { text: "Merge Formatting" },
                        { text: "Keep Text Only" }
                    ]
                },
                tooltipSettings: {
                    title: "Paste (Ctrl+V)",
                    content: "Insert content from the clipboard. Click the arrow for more paste options.",
                    iconCss: "e-icons e-info"
                }
            }]
        }]
    }, {
        header: "Font",
        collections: [{
            items: [{
                type: RibbonItemType.GroupButton,
                groupButtonSettings: {
                    selection: "Multiple",
                    items: [
                        { iconCss: "e-icons e-bold", content: "Bold" },
                        { iconCss: "e-icons e-italic", content: "Italic" },
                        { iconCss: "e-icons e-underline", content: "Underline" }
                    ]
                },
                tooltipSettings: {
                    title: "Text Formatting",
                    content: "<p><strong>Bold (Ctrl+B):</strong> Make text bold</p>" +
                             "<p><strong>Italic (Ctrl+I):</strong> Italicize text</p>" +
                             "<p><strong>Underline (Ctrl+U):</strong> Underline text</p>"
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

### Example 2: Help Pane with Undo/Redo and Search

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        groups: [{
            header: "Editing",
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Find",
                        iconCss: "e-icons e-search"
                    },
                    tooltipSettings: {
                        title: "Find (Ctrl+F)",
                        content: "Search for text in your document."
                    }
                }]
            }]
        }]
    }],
    helpPaneTemplate: '<div class="help-pane" style="display: flex; align-items: center; gap: 15px;">' +
                      '  <div class="undo-redo-group">' +
                      '    <button id="undoBtn" class="e-btn e-icon-btn" title="Undo (Ctrl+Z)" onclick="performUndo()">' +
                      '      <span class="e-icons e-undo"></span>' +
                      '    </button>' +
                      '    <button id="redoBtn" class="e-btn e-icon-btn" title="Redo (Ctrl+Y)" onclick="performRedo()">' +
                      '      <span class="e-icons e-redo"></span>' +
                      '    </button>' +
                      '  </div>' +
                      '  <input id="searchBox" type="text" class="e-input" placeholder="Search commands..." style="width: 200px;" />' +
                      '  <button class="e-btn e-icon-btn" title="Help" onclick="showHelp()">' +
                      '    <span class="e-icons e-help"></span>' +
                      '  </button>' +
                      '</div>'
});

ribbon.appendTo("#ribbon");

// Global functions for help pane
function performUndo() {
    console.log("Undo action");
}

function performRedo() {
    console.log("Redo action");
}

function showHelp() {
    console.log("Show help dialog");
}

// Add search functionality
document.getElementById("searchBox")?.addEventListener("input", (e) => {
    let searchTerm = (e.target as HTMLInputElement).value;
    console.log("Search:", searchTerm);
});
```

### Example 3: User Profile in Help Pane

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        groups: []
    }],
    helpPaneTemplate: '<div class="help-pane-profile" style="display: flex; align-items: center; gap: 10px; padding: 0 15px;">' +
                      '  <div class="user-actions" style="display: flex; gap: 5px;">' +
                      '    <button class="e-btn e-icon-btn" title="Undo" onclick="performUndo()">' +
                      '      <span class="e-icons e-undo"></span>' +
                      '    </button>' +
                      '    <button class="e-btn e-icon-btn" title="Redo" onclick="performRedo()">' +
                      '      <span class="e-icons e-redo"></span>' +
                      '    </button>' +
                      '  </div>' +
                      '  <div style="width: 1px; height: 24px; background: #ddd; margin: 0 5px;"></div>' +
                      '  <div class="user-profile" style="display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="showUserMenu()">' +
                      '    <img src="https://via.placeholder.com/32" alt="User" style="width: 32px; height: 32px; border-radius: 50%;" />' +
                      '    <span style="font-size: 14px;">John Doe</span>' +
                      '    <span class="e-icons e-chevron-down" style="font-size: 12px;"></span>' +
                      '  </div>' +
                      '</div>'
});

ribbon.appendTo("#ribbon");

function performUndo() {
    console.log("Undo");
}

function performRedo() {
    console.log("Redo");
}

function showUserMenu() {
    console.log("Show user dropdown menu");
}
```

### Example 4: Comprehensive Tooltips and Help Pane

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Document",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Save",
                    iconCss: "e-icons e-save",
                    isPrimary: true
                },
                tooltipSettings: {
                    title: "Save (Ctrl+S)",
                    content: "Save changes to the current document.",
                    iconCss: "e-icons e-save",
                    cssClass: "primary-tooltip"
                }
            }, {
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Save As",
                    iconCss: "e-icons e-save-as"
                },
                tooltipSettings: {
                    title: "Save As",
                    content: "Save a copy of the document with a new name or location.",
                    iconCss: "e-icons e-info"
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    tabs: tabs,
    helpPaneTemplate: '<div style="display: flex; align-items: center; gap: 10px; padding: 0 15px;">' +
                      '  <button class="e-btn e-icon-btn" title="Undo" onclick="performUndo()">' +
                      '    <span class="e-icons e-undo"></span>' +
                      '  </button>' +
                      '  <button class="e-btn e-icon-btn" title="Redo" onclick="performRedo()">' +
                      '    <span class="e-icons e-redo"></span>' +
                      '  </button>' +
                      '  <div style="width: 1px; height: 20px; background: #ddd; margin: 0 10px;"></div>' +
                      '  <span id="statusText" style="font-size: 13px; color: #666;">Ready</span>' +
                      '</div>'
});

ribbon.appendTo("#ribbon");

function performUndo() {
    document.getElementById("statusText")!.textContent = "Undone";
    setTimeout(() => {
        document.getElementById("statusText")!.textContent = "Ready";
    }, 2000);
}

function performRedo() {
    document.getElementById("statusText")!.textContent = "Redone";
    setTimeout(() => {
        document.getElementById("statusText")!.textContent = "Ready";
    }, 2000);
}
```

These examples demonstrate comprehensive tooltip and help pane implementations with keyboard shortcuts, rich content, user profiles, and status indicators.

---
name: syncfusion-javascript-toolbar
description: Implement Syncfusion TypeScript Toolbar control for creating command-based navigation interfaces. Use this skill whenever the user needs to build toolbars, add toolbar items (buttons, separators, inputs), configure responsive modes (scrollable/popup), handle toolbar events, customize styling, add tooltips/icons, implement RTL support, or ensure accessibility compliance. This is the primary skill for all Toolbar component implementation questions.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Navigation Components"
---

# Implementing Syncfusion TypeScript Toolbar

## Overview

The Syncfusion TypeScript Toolbar is a navigation component that displays a group of command buttons arranged horizontally. It's built on Essential JS 2 and provides professional-grade toolbar functionality with responsive behavior, template support, and rich customization options.

## Key Features at a Glance

- **Multiple Overflow Modes**: Scrollable, Popup, MultiRow, and Extended modes for flexible content management
- **Responsive Design**: Automatically adapts to different screen sizes with multiple layout options
- **Multiple Item Types**: Buttons, separators, and input components (NumericTextBox, DropDownList, etc.)
- **Template Support**: Render toolbars from HTML elements or item collections
- **Rich Customization**: CSS styling, icons, tooltips, and templates
- **Keyboard Support**: Full keyboard navigation and accessibility compliance
- **RTL Support**: Right-to-left language support built-in
- **Event Handling**: beforeCreate, clicked, keyDown events with comprehensive event arguments
- **Theme Integration**: Works with Fluent2 and other theme systems
- **Security Features**: HTML sanitization and XSS protection for user-provided content

## When to Use This Skill

Choose Syncfusion Toolbar when you need:
- Command button interfaces for editors, document tools, or application menus
- Responsive navigation that adapts to mobile/desktop sizes
- Professional-grade toolbar with customizable icons and styling
- Accessibility-compliant navigation components
- Template-based toolbar rendering
- Item state management (enable/disable, toggle states)
- Tooltip support for toolbar items

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)

Start here for your first Toolbar implementation:
- Installation and NPM package setup
- Dependency configuration for TypeScript
- CSS imports and theme setup
- Basic Toolbar initialization with items
- First working code example
- Using webpack configuration

### Item Configuration
📄 **Read:** [references/item-configuration.md](references/item-configuration.md)

Learn how to structure and configure individual toolbar items:
- Button items with text, icons, and prefixIcon/suffixIcon
- Separator items for visual grouping
- Input items for integrated components (NumericTextBox, DropDownList)
- Item alignment and positioning
- Item IDs and dynamic item access
- Width and sizing properties

### Responsive and Popup Modes
📄 **Read:** [references/responsive-and-popup.md](references/responsive-and-popup.md)

Handle toolbar overflow and responsive behavior:
- Scrollable mode with navigation arrows and touch swipe
- Popup mode for compact layouts
- Display mode switching based on available space
- Scroll step customization for arrow-based scrolling
- Touch and keyboard interaction patterns
- Responsive width configuration

### Templates and Customization
📄 **Read:** [references/template-and-customization.md](references/template-and-customization.md)

Create custom toolbar layouts and styling:
- HTML template-based toolbar rendering
- Item-level template customization
- CSS class application for styling
- Custom button templates with HTML content
- Advanced layout patterns and examples
- Style integration with themes

### Interactivity and Commands
📄 **Read:** [references/interactivity-and-commands.md](references/interactivity-and-commands.md)

Handle user interactions and command execution:
- Click event handling patterns
- Command customization and execution
- Toggle button implementation
- Enable/disable items programmatically
- Event binding and event arguments
- Item state management

### Advanced Features
📄 **Read:** [references/advanced-features.md](references/advanced-features.md)

Implement advanced toolbar functionality:
- Font Awesome icon integration
- Tooltip configuration for toolbar items
- Right-to-left (RTL) language support
- Keyboard navigation patterns
- Accessibility (WAI-ARIA) compliance
- Links within toolbar items
- Multi-row toolbar layouts

### Styling and Accessibility
📄 **Read:** [references/styling-and-accessibility.md](references/styling-and-accessibility.md)

Master styling and accessibility implementation:
- CSS structure for toolbar customization
- Theme classes (toolbar, items, buttons, icons)
- Color and appearance customization
- WCAG compliance requirements
- Keyboard navigation implementation
- Screen reader support and ARIA attributes
- Best practices for accessible toolbars

### Complete API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)

Comprehensive reference for all Toolbar APIs:
- ToolbarModel properties table (12+ properties with examples)
- ItemModel properties table (15+ properties with examples)
- Event reference (beforeCreate, clicked, created, destroyed, keyDown)
- Event arguments documentation (BeforeCreateArgs, ClickEventArgs, KeyDownEventArgs)
- Enumerations reference (ItemType, ItemAlign, OverflowOption, OverflowMode, DisplayMode)
- Quick configuration patterns for common scenarios

## Quick Start Example

Here's a minimal working example to get you started immediately:

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

// Create a basic toolbar with button items
let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' },
        { type: 'Separator' },
        { text: 'Bold' },
        { text: 'Italic' },
        { text: 'Underline' }
    ]
});

// Render to DOM element
toolbar.appendTo('#element');
```

HTML container:
```html
<!DOCTYPE html>
<html>
<head>
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id="element"></div>
    <script src="app.js"></script>
</body>
</html>
```

## Common Patterns

### Pattern 1: Toolbar with Icons

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { prefixIcon: 'e-icons e-cut', text: 'Cut' },
        { prefixIcon: 'e-icons e-copy', text: 'Copy' },
        { prefixIcon: 'e-icons e-paste', text: 'Paste' },
        { type: 'Separator' },
        { prefixIcon: 'e-icons e-bold', text: 'Bold' }
    ]
});
toolbar.appendTo('#element');
```

### Pattern 2: Responsive Toolbar (Scrollable)

```typescript
let toolbar: Toolbar = new Toolbar({
    width: 600,
    overflowMode: 'Scrollable',
    items: [
        { text: 'Cut', prefixIcon: 'e-cut-icon' },
        { text: 'Copy', prefixIcon: 'e-copy-icon' },
        { text: 'Paste', prefixIcon: 'e-paste-icon' },
        // ... more items
    ]
});
toolbar.appendTo('#element');
```

### Pattern 3: Item Alignment Control

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { type: 'Separator' },
        { text: 'Save', align: 'Right' },  // Push to right side
        { text: 'Help', align: 'Right' }
    ]
});
toolbar.appendTo('#element');
```

### Pattern 4: Event Handling

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { id: 'cut-btn', text: 'Cut' },
        { id: 'copy-btn', text: 'Copy' }
    ],
    clicked: (args: ClickEventArgs) => {
        console.log(`Item ${args.item.id} clicked`);
    }
});
toolbar.appendTo('#element');
```

## Key Properties Reference

| Property | Type | Purpose |
|----------|------|---------|
| `items` | ItemModel[] | Array of toolbar items to display |
| `width` | Number/String | Toolbar width (px or percentage) |
| `overflowMode` | 'Scrollable' \| 'Popup' | How to handle overflow content |
| `scrollStep` | Number | Pixels to scroll on arrow click (Scrollable mode) |
| `enableRtl` | Boolean | Enable right-to-left layout for RTL languages |
| `clicked` | Function | Event handler for item clicks |

## Common Use Cases

**Use Case 1: Text Editor Toolbar**
- Display Cut, Copy, Paste, Bold, Italic, Underline buttons
- Use icons with prefixIcon property
- Add separators for visual grouping
- Implement click handlers for each command

**Use Case 2: Mobile-Responsive Toolbar**
- Set Popup overflowMode for mobile
- Configure scrollable mode for desktop
- Use responsive width (percentage-based)
- Test on different screen sizes

**Use Case 3: Customized Appearance**
- Apply CSS classes with theme colors
- Use Font Awesome icons for modern appearance
- Add tooltips for accessibility
- Style specific toolbar items differently

## Installation Prerequisites

**Required packages:**
```bash
npm install @syncfusion/ej2-navigations
npm install @syncfusion/ej2-base
npm install @syncfusion/ej2-buttons
npm install @syncfusion/ej2-popups
```

**For TypeScript projects**, ensure webpack and TypeScript are properly configured (node v14.15.0 or higher recommended).

---

**Note:** For additional details on any topic, refer to the specific reference file linked in the navigation guide above. Each reference provides complete code examples, edge cases, and troubleshooting guidance.

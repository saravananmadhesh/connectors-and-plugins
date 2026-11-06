# Getting Started with Syncfusion TypeScript Tab

## Table of Contents
- [Installation and Dependencies](#installation-and-dependencies)
- [Setting Up Development Environment](#setting-up-development-environment)
- [Package Installation](#package-installation)
- [CSS Setup](#css-setup)
- [Basic Initialization](#basic-initialization)
- [HTML Element Initialization](#html-element-initialization)

## Installation and Dependencies

Before starting, ensure Node.js v14.15.0 or higher is installed on your system.

### Required Packages

The following packages are required for Tab component:

```
@syncfusion/ej2-navigations    (Main Tab package)
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-buttons
  └── @syncfusion/ej2-popups
```

## Setting Up Development Environment

### Step 1: Clone Quickstart Repository

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
```

This provides a pre-configured webpack setup with TypeScript support.

### Step 2: Install Dependencies

```bash
npm install
```

This command installs all required packages including the Syncfusion Tab component.

## Package Installation

### Using @syncfusion/ej2 (All Controls)

Install the complete Syncfusion package:

```bash
npm install @syncfusion/ej2
```

### Using @syncfusion/ej2-navigations (Tab Only)

For a lighter installation with only Tab component:

```bash
npm install @syncfusion/ej2-navigations @syncfusion/ej2-base @syncfusion/ej2-buttons @syncfusion/ej2-popups
```

## CSS Setup

### Importing Styles

Add CSS imports to your `src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/tab/index.css";
```

### Available Themes

- `fluent2.css` (Default)
- `material.css`
- `bootstrap5.css`
- `highcontrast.css`
- `tailwind.css`

Choose based on your design requirements.

## Basic Initialization

### Step 1: Create HTML Structure

Create `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Syncfusion Tab - TypeScript</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <div style="margin: 50px;">
        <div id="element"></div>
    </div>
</body>
</html>
```

### Step 2: Create TypeScript Component

Create `src/app/app.ts`:

```typescript
import { Tab } from '@syncfusion/ej2-navigations';

let tabObj: Tab = new Tab({
    items: [
        {
            header: { 'text': 'Twitter' },
            content: 'Twitter is an online social networking service that enables users to send and read short 140-character ' +
            'messages called "tweets". Registered users can read and post tweets, but those who are unregistered can only read ' +
            'them. Users access Twitter through the website interface, SMS or mobile device app.'
        },
        {
            header: { 'text': 'Facebook' },
            content: 'Facebook is an online social networking service headquartered in Menlo Park, California. Its website was ' +
            'launched on February 4, 2004, by Mark Zuckerberg with his Harvard College roommates and fellow students.'
        },
        {
            header: { 'text': 'WhatsApp' },
            content: 'WhatsApp Messenger is a proprietary cross-platform instant messaging client for smartphones that operates ' +
            'under a subscription business model.'
        }
    ]
});

tabObj.appendTo('#element');
```

### Step 3: Run Application

```bash
npm start
```

Your Tab component will render with three tabs: Twitter, Facebook, and WhatsApp.

## HTML Element Initialization

### Alternative: Initialize from HTML

Instead of JSON items, render from existing HTML elements.

### Step 1: Create HTML Markup

```html
<div id="element">
    <div class="e-tab-header">
        <div>Twitter</div>
        <div>Facebook</div>
        <div>WhatsApp</div>
    </div>
    <div class="e-content">
        <div>Twitter content here...</div>
        <div>Facebook content here...</div>
        <div>WhatsApp content here...</div>
    </div>
</div>
```

**HTML Structure Rules:**
- Root element: any container element
- Header wrapper: class `e-tab-header`
- Header items: direct children of `e-tab-header`
- Content wrapper: class `e-content`
- Content items: direct children of `e-content`

### Step 2: Initialize Component

```typescript
import { Tab } from '@syncfusion/ej2-navigations';

let tab: Tab = new Tab();
tab.appendTo('#element');
```

The component automatically maps header items to content items by position.

## Quick Reference

| Task | Code |
|------|------|
| Import Tab | `import { Tab } from '@syncfusion/ej2-navigations';` |
| Create with JSON | `new Tab({ items: [...] })` |
| Create from HTML | `new Tab()` (from HTML markup) |
| Append to DOM | `tabObj.appendTo('#element');` |
| Select tab | `tabObj.select(index);` |
| Get selected index | `tabObj.selectedItem` |

## Troubleshooting

### Tab Not Rendering
- Verify Tab component is appended with `appendTo('#element')`
- Check CSS imports are loaded
- Ensure target element with matching ID exists in HTML

### Styling Issues
- Verify correct theme CSS is imported
- Check CSS import paths relative to your project
- Clear browser cache and rebuild

### TypeScript Errors
- Ensure `@types` packages are installed
- Check TypeScript compiler settings in `tsconfig.json`
- Verify import statements use correct package name

## Next Steps
- Read [tab-structure-and-content.md](./tab-structure-and-content.md) to learn about tab items and selection
- Explore [customization-and-styling.md](./customization-and-styling.md) for styling options
- Check [responsive-adaptive-modes.md](./responsive-adaptive-modes.md) for mobile-friendly layouts

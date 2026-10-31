# Getting Started with Menu

## Table of Contents
- [Add Syncfusion Packages](#add-syncfusion-packages)
- [Import CSS Styles](#import-css-styles)
- [Add Menu to HTML](#add-menu-to-html)
- [Initialize Menu with TypeScript](#initialize-menu-with-typescript)
- [Run the Application](#run-the-application)

## Add Syncfusion Packages

Install the required Syncfusion packages using npm:

```bash
npm install
```

The packages are already configured in `package.json`. For individual installation:

```bash
npm install @syncfusion/ej2-navigations
```

## Import CSS Styles

Add the following CSS imports to `src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/menu/index.css";
```

Alternatively, use CDN links in your HTML `<head>`:

```html
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
```

## Add Menu to HTML

Add an unordered list (`<ul>`) with an `id` attribute to your `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Syncfusion Menu</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='loader'>LOADING....</div>
    <div id='container'>
        <ul id="menu"></ul>
    </div>
</body>
</html>
```

## Initialize Menu with TypeScript

Create or update `src/app/app.ts` with the following code:

```typescript
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Define menu items
let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        items: [
            { text: 'Open' },
            { text: 'Save' },
            { text: 'Exit' }
        ]
    },
    {
        text: 'Edit',
        items: [
            { text: 'Cut' },
            { text: 'Copy' },
            { text: 'Paste' }
        ]
    },
    {
        text: 'View',
        items: [
            { text: 'Toolbar' },
            { text: 'Sidebar' }
        ]
    },
    {
        text: 'Tools',
        items: [
            { text: 'Spelling & Grammar' },
            { text: 'Customize' },
            { text: 'Options' }
        ]
    },
    { text: 'Go' },
    { text: 'Help' }
];

// Initialize Menu component
let menuObj: Menu = new Menu({ items: menuItems }, '#menu');
```

### Menu Initialization Parameters

```typescript
// Minimal initialization
let menuObj: Menu = new Menu({}, '#menu');

// With items
let menuObj: Menu = new Menu({ items: menuItems }, '#menu');

// With target selector (CSS selector, ID, or class)
let menuObj: Menu = new Menu(settings, '#menu');
```

## Run the Application

Start the development server:

```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`. You should see a basic menu with File, Edit, View, and Tools items, each with sub-items.

### What You've Built

- ✅ A functional Menu component
- ✅ Multi-level nested items (File > Open, Save, etc.)
- ✅ Interactive menu with hover effects
- ✅ Ripple effects on click
- ✅ Proper styling with Fluent2 theme

## Next Steps

- **Add Icons**: See menu-items-and-hierarchy.md for adding icons to menu items
- **Handle Events**: See working-with-events.md for click handling and event tracking
- **Customize Style**: See customization-and-styling.md for animations and themes
- **Bind Data**: See data-binding.md for loading menu items from JSON data
- **API Details**: See api-reference.md for complete property and method documentation

## Troubleshooting

### Menu doesn't appear
- Ensure CSS imports are included
- Verify the target element ID matches (`#menu`)
- Check browser console for errors

### Styling looks wrong
- Confirm all CSS files are imported
- Clear browser cache
- Verify Fluent2 theme is loaded

### Events not firing
- Check that event handlers are defined before initialization
- Verify syntax for event callback functions

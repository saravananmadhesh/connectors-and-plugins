# Getting Started with ContextMenu

## Table of Contents
- [Dependencies](#dependencies)
- [Development Environment Setup](#development-environment-setup)
- [Add Syncfusion Packages](#add-syncfusion-packages)
- [Import CSS Styles](#import-css-styles)
- [Add ContextMenu to Project](#add-contextmenu-to-project)
- [Run the Application](#run-the-application)
- [Rendering Items with Separator](#rendering-items-with-separator)

## Dependencies

The ContextMenu component requires the following packages:

```
|-- @syncfusion/ej2-navigations
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-data
    |-- @syncfusion/ej2-lists
    |-- @syncfusion/ej2-inputs
    |-- @syncfusion/ej2-popups
        |-- @syncfusion/ej2-buttons
```

These dependencies handle navigation, base functionality, data management, list rendering, input handling, popup management, and button functionality.

## Development Environment Setup

### Clone the Quickstart Repository

Open command prompt and run:

```bash
git clone url
cd ej2-quickstart
```

### Node Version Requirement

- Node.js v14.15.0 or higher
- npm (comes with Node.js)

For more information, refer to the [webpack documentation](url).

## Add Syncfusion Packages

The quickstart application includes the `@syncfusion/ej2` package in `package.json`. Install all dependencies:

```bash
npm install
```

If you prefer individual packages instead of the complete `@syncfusion/ej2` package, you can install only the ContextMenu package and its dependencies:

```bash
npm install @syncfusion/ej2-navigations
```

## Import CSS Styles

Add Syncfusion CSS styles to your `~/src/styles/styles.css` file:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/context-menu/index.css";
```

Available themes: `bootstrap5.css`, `fabric.css`, `fluent.css`, `fluent2.css`, `highcontrast.css`, `material.css`, `material3.css`, `tailwind.css`

## Add ContextMenu to Project

### HTML Structure

Add the following HTML to `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Syncfusion ContextMenu</title>
</head>
<body>
    <!-- Context Menu Wrapper -->
    <div>
        <!-- Target element for ContextMenu -->
        <div id="contextmenutarget" style="border: 1px solid #ccc; padding: 20px; width: 300px; height: 200px;">
            Right-click here to open the ContextMenu
        </div>
        <!-- ContextMenu will be rendered here -->
        <ul id="contextmenu"></ul>
    </div>
</body>
</html>
```

### TypeScript Implementation

Create or update `src/index.ts`:

```typescript
import { ContextMenu } from '@syncfusion/ej2-navigations';

// Define menu items
const menuItems = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' },
  { separator: true },
  { text: 'Link', url: 'url' },
  { text: 'Share' }
];

// Initialize ContextMenu
const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target'
});

// Append to target element
contextMenu.appendTo('#contextmenu');
```

### CSS for Target Element

Optional styling in `src/styles/styles.css`:

```css
#target {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  cursor: context-menu;
  user-select: none;
}
```

## Run the Application

### Development Mode

Start the webpack development server:

```bash
npm start
```

The application will be available at: `http://localhost:8080`

### Production Build

Create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Debugging

Enable source maps in webpack config to debug TypeScript code directly in the browser's developer tools.

## Rendering Items with Separator

Separators visually group related menu items:

```typescript
const menuItems = [
  // File operations
  { text: 'New' },
  { text: 'Open' },
  { text: 'Save' },
  { separator: true },  // Visual separator
  
  // Edit operations
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' },
  { separator: true },
  
  // View operations
  { text: 'Zoom In' },
  { text: 'Zoom Out' }
];

const contextMenu = new ContextMenu({
  items: menuItems,
  target: '#target'
});

contextMenu.appendTo('#contextmenu');
```

### Result

Separators appear as horizontal lines between menu item groups, providing visual organization without being selectable.

## See Also

- [Menu Structure & Templates](./menu-structure.md) - Create multilevel menus
- [Menu Items Management](./menu-items.md) - Add/remove items dynamically
- [Styling & Appearance](./styling.md) - Customize look and feel
- [API Reference](./api-reference.md) - Complete property documentation

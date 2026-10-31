# Getting Started with Syncfusion Sidebar

Learn how to set up and initialize your first Sidebar component in TypeScript.

## Table of Contents

- [Dependencies](#dependencies)
- [Project Setup](#project-setup)
- [CSS Imports](#css-imports)
- [Basic HTML Structure](#basic-html-structure)
- [TypeScript Initialization](#typescript-initialization)
- [Running Your Application](#running-your-application)
- [Complete Working Example](#complete-working-example)
- [HTML for Complete Example](#html-for-complete-example)
- [Troubleshooting Setup Issues](#troubleshooting-setup-issues)
- [Next Steps](#next-steps)

## Dependencies

The Sidebar control requires the following packages:

```
@syncfusion/ej2-navigations
  ├── @syncfusion/ej2-base
  ├── @syncfusion/ej2-build
  ├── @syncfusion/ej2-lists
  ├── @syncfusion/ej2-data
  ├── @syncfusion/ej2-inputs
        └── @syncfusion/ej2-splitbuttons
  ├── @syncfusion/ej2-popups
        └── @syncfusion/ej2-buttons
  
```

## Project Setup

### 1. Clone the Quickstart Template

Clone the Syncfusion JavaScript (Essential JS 2) quickstart project:

```bash
git clone url
cd ej2-quickstart
```

### 2. Install Dependencies

Install npm packages:

```bash
npm install
```

This installs all required dependencies including the `@syncfusion/ej2` package.

## CSS Imports

Add Sidebar and base styles to your `src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/sidebar/index.css";
```

> **Tip**: Use the [Custom Resource Generator (CRG)](url) to generate optimized combined styles.

## Basic HTML Structure

Create the sidebar with HTML elements. The Sidebar typically uses an `<aside>` tag with a next sibling `<div>` for main content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Sidebar Example</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id="container">
        <!-- Sidebar element -->
        <aside id="sidebar">
            <div class="title">Sidebar Content</div>
            <p>Navigation menu goes here</p>
        </aside>
        
        <!-- Main content - automatically targeted by sidebar -->
        <div>
            <div class="title">Main Content</div>
            <p>Your page content goes here</p>
        </div>
    </div>
    <script src="app.ts"></script>
</body>
</html>
```

## TypeScript Initialization

Import the Sidebar component and initialize it in your TypeScript file:

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

// Basic initialization with default settings
let sidebar: Sidebar = new Sidebar();
sidebar.appendTo('#sidebar');
```

### With Configuration

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    width: '280px',              // Sidebar width
    type: 'Push',                // Expand type
    showBackdrop: false,         // No overlay background
    isOpen: false                // Start closed
});
sidebar.appendTo('#sidebar');

// Toggle sidebar on button click
document.querySelector('#toggle')?.addEventListener('click', () => {
    sidebar.toggle();
});
```

## Running Your Application

Use the npm start command to run the application:

```bash
npm start
```

The application compiles and opens in your browser at `http://localhost:3000`.

## Complete Working Example

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

// Initialize sidebar
let sidebar: Sidebar = new Sidebar({
    width: '280px',
    type: 'Push',
    showBackdrop: false
});
sidebar.appendTo('#sidebar');

// Initialize toggle button
let toggleBtn: Button = new Button({ 
    content: 'Toggle Sidebar',
    isPrimary: true 
}, '#toggleBtn');

// Event listeners
document.querySelector('#open')?.addEventListener('click', () => {
    sidebar.show();
    console.log('Sidebar opened');
});

document.querySelector('#close')?.addEventListener('click', () => {
    sidebar.hide();
    console.log('Sidebar closed');
});

document.querySelector('#toggle')?.addEventListener('click', () => {
    sidebar.toggle();
});
```

## HTML for Complete Example

```html
<div id="container">
    <aside id="sidebar">
        <div class="title">Navigation</div>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
        </ul>
        <button id="close" class="e-btn">Close</button>
    </aside>
    
    <div>
        <div class="title">Main</div>
        <button id="open" class="e-btn">Open</button>
        <button id="toggle" class="e-btn">Toggle</button>
        <p>Content area</p>
    </div>
</div>
```

## Troubleshooting Setup Issues

**Issue**: Styles not loading
- **Solution**: Verify CSS import paths match your node_modules location
- **Solution**: Check browser console for 404 errors on CSS files

**Issue**: Sidebar not appearing
- **Solution**: Ensure the sidebar has a valid width property
- **Solution**: Check that the HTML element with id="sidebar" exists in your DOM

**Issue**: TypeScript compilation errors
- **Solution**: Update tsconfig.json with proper module settings
- **Solution**: Ensure @syncfusion/ej2-navigations types are installed

## Next Steps

Now that your sidebar is initialized:
1. Explore **Sidebar Types and Positions** to change expand behavior
2. Learn **Open and Close Methods** for programmatic control
3. Check **Styling and Theming** to customize appearance
4. See **Content Integration** for list/tree view examples

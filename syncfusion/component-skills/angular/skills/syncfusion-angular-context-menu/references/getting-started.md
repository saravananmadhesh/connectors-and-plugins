# Getting Started with Syncfusion Angular ContextMenu

## Table of Contents
- [Installation and Dependencies](#installation-and-dependencies)
- [Angular Environment Setup](#angular-environment-setup)
- [Creating Your First ContextMenu](#creating-your-first-contextmenu)
- [Target Element Configuration](#target-element-configuration)
- [Basic Menu Item Structure](#basic-menu-item-structure)

## Installation and Dependencies

### Required Packages

The ContextMenu component requires the following Syncfusion packages:

```
@syncfusion/ej2-angular-navigations
    ├── @syncfusion/ej2-angular-base
    └── @syncfusion/ej2-navigations
        ├── @syncfusion/ej2-base
        ├── @syncfusion/ej2-data
        ├── @syncfusion/ej2-lists
        ├── @syncfusion/ej2-inputs
        ├── @syncfusion/ej2-splitbuttons
        └── @syncfusion/ej2-popups
            └── @syncfusion/ej2-buttons
```

### Installation Command

Install the package using npm:

```bash
npm install @syncfusion/ej2-angular-navigations
```

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/context-menu/index.css";
```

## Angular Environment Setup

### Prerequisites

- Node.js and npm installed
- Angular CLI installed globally

```bash
npm install -g @angular/cli
```

### Creating a New Angular Application

Generate a new Angular application with Angular CLI:

```bash
ng new syncfusion-angular-app
```

When prompted, configure:
- Routing: Choose as needed for your project
- Stylesheet format: CSS or SCSS

For modern Angular (21+) which uses standalone architecture:

```bash
ng new syncfusion-angular-app --style=scss
```

### Navigate to Project Directory

```bash
cd syncfusion-angular-app
```

> **Angular 21 Standalone Architecture:** Standalone components are the default in Angular 21+. This guide uses standalone architecture. Components no longer require NgModule declarations.

## Creating Your First ContextMenu

### Basic Component Setup

Create a new component with the ContextMenu:

```typescript
import { Component } from '@angular/core';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <!-- Target element -->
      <div id="target">Right click / Touch hold to open the ContextMenu</div>
      
      <!-- ContextMenu component -->
      <ejs-contextmenu 
        id='contextmenu' 
        target='#target' 
        [items]='menuItems'>
      </ejs-contextmenu>
    </div>
  `,
  styles: [`
    #target {
      height: 200px;
      width: 300px;
      border: 1px solid #ccc;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: context-menu;
      background-color: #f5f5f5;
    }
  `]
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'Back' },
    { text: 'Forward' },
    { text: 'Refresh' },
    { separator: true },
    { text: 'Save As...' },
    { text: 'Print' }
  ];
}
```

### Standalone Bootstrap

Configure the main entry point:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### Running the Application

Start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. Right-click or touch-hold the target area to see the context menu appear.

## Target Element Configuration

### Single Target Element

Configure a single element as the context menu trigger:

```typescript
<ejs-contextmenu 
  target='#myElement' 
  [items]='menuItems'>
</ejs-contextmenu>
```

### Multiple Target Elements (Same Class)

Use CSS selectors to target multiple elements:

```typescript
<div class="target-area">Right click me</div>
<div class="target-area">Or me</div>

<ejs-contextmenu 
  target='.target-area' 
  [items]='menuItems'>
</ejs-contextmenu>
```

### Nested Target Elements

Target nested elements using descendant selectors:

```typescript
<div id="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
</div>

<ejs-contextmenu 
  target='#container .item' 
  [items]='menuItems'>
</ejs-contextmenu>
```

### Dynamic Target Assignment

Assign target via component property:

```typescript
@Component({
  template: `
    <ejs-contextmenu 
      [target]='targetElement' 
      [items]='menuItems'>
    </ejs-contextmenu>
  `
})
export class AppComponent {
  public targetElement = '#target';
}
```

## Basic Menu Item Structure

### MenuItem Properties

Each menu item is defined using the `MenuItemModel` interface:

```typescript
import { MenuItemModel } from '@syncfusion/ej2-navigations';

public menuItems: MenuItemModel[] = [
  {
    text: 'Cut',           // Display text
    iconCss: 'e-cut-icon', // Icon CSS class
    id: 'cut-item'         // Unique identifier
  },
  {
    text: 'Copy',
    iconCss: 'e-copy-icon'
  },
  {
    separator: true        // Separator line
  },
  {
    text: 'View',
    items: [               // Nested sub-items
      { text: 'Large Icons' },
      { text: 'Small Icons' }
    ]
  }
];
```

### Simple Text Items

Basic menu items with just text:

```typescript
public menuItems: MenuItemModel[] = [
  { text: 'New' },
  { text: 'Open' },
  { text: 'Save' }
];
```

### Items with Icons

Add visual icons using CSS classes:

```typescript
public menuItems: MenuItemModel[] = [
  { text: 'Cut', iconCss: 'e-cm-icons e-cut' },
  { text: 'Copy', iconCss: 'e-cm-icons e-copy' },
  { text: 'Paste', iconCss: 'e-cm-icons e-paste' }
];
```

### Items with Separators

Use separators to group related items:

```typescript
public menuItems: MenuItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { separator: true },      // Separator line
  { text: 'Save' },
  { text: 'Print' }
];
```

### Nested Multi-Level Menus

Create hierarchical menus with sub-items:

```typescript
public menuItems: MenuItemModel[] = [
  {
    text: 'File',
    items: [
      { text: 'New' },
      { text: 'Open' },
      { text: 'Save' }
    ]
  },
  {
    text: 'Edit',
    items: [
      { text: 'Cut' },
      { text: 'Copy' },
      { text: 'Paste' }
    ]
  }
];
```

### Complete Example with All Features

```typescript
import { Component } from '@angular/core';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContextMenuModule],
  template: `
    <div class="e-section-control">
      <div id="target">Right click / Touch hold</div>
      <ejs-contextmenu 
        id='contextmenu' 
        target='#target' 
        [items]='menuItems'>
      </ejs-contextmenu>
    </div>
  `
})
export class AppComponent {
  public menuItems: MenuItemModel[] = [
    { text: 'New', iconCss: 'e-icons e-new' },
    { text: 'Open', iconCss: 'e-icons e-open' },
    { separator: true },
    {
      text: 'View',
      items: [
        { text: 'Large Icons' },
        { text: 'Small Icons' }
      ]
    },
    { separator: true },
    { text: 'Refresh', iconCss: 'e-icons e-refresh' }
  ];
}
```

## Common Issues & Solutions

**Issue:** Context menu doesn't appear on right-click
- **Solution:** Verify the `target` element exists in DOM and the selector is correct

**Issue:** Styling looks different from Syncfusion samples
- **Solution:** Import Syncfusion CSS files (usually auto-imported, but check in styles.css)

**Issue:** Menu items not displaying icons
- **Solution:** Ensure `iconCss` uses valid Syncfusion icon classes (e.g., `e-icons e-cut`)

**Issue:** Sub-menus not appearing
- **Solution:** Verify nested items are properly defined in the `items` property

**Issue:** "Cannot find module @syncfusion/ej2-angular-navigations"
- **Solution:** Run `npm install @syncfusion/ej2-angular-navigations` and verify package.json

---

**Next:** Proceed to [references/menu-items-management.md](../menu-items-management.md) to learn how to dynamically add, remove, and manage menu items.

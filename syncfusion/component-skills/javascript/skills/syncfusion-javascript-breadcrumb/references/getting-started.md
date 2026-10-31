# Getting Started with Breadcrumb

## Table of Contents
- [Installation](#installation)
- [Basic Implementation](#basic-implementation)
- [Creating Items Array](#creating-items-array)
- [DOM Integration](#dom-integration)
- [Minimal Working Example](#minimal-working-example)
- [Styling and Themes](#styling-and-themes)

## Installation

### Package Setup

The Breadcrumb component is part of the Syncfusion EJ2 library. Install the necessary packages:

```bash
npm install @syncfusion/ej2-navigations
npm install @syncfusion/ej2-base
```

### Importing Components

```typescript
import { Breadcrumb } from '@syncfusion/ej2-navigations';
```

For specific modules or features, import additional dependencies:

```typescript
import { Breadcrumb, BreadcrumbClickEventArgs } from '@syncfusion/ej2-navigations';
```

## Basic Implementation

### Component Initialization

The most basic breadcrumb requires:
1. A container HTML element with an ID
2. Items array with navigation data
3. Component instantiation with configuration

```typescript
// Step 1: Create breadcrumb instance with items
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' }
  ]
});

// Step 2: Attach to DOM
breadcrumb.appendTo('#breadcrumb-container');
```

### HTML Setup

Create a container element where the breadcrumb will render:

```html
<nav id="breadcrumb-container"></nav>
```

The component automatically generates the breadcrumb structure inside this container.

## Creating Items Array

### Item Structure

Each breadcrumb item is a `BreadcrumbItemModel` with the following properties:

```typescript
const items = [
  {
    id: 'home',                    // Unique identifier
    text: 'Home',                  // Display text
    url: '/',                      // Navigation URL
    disabled: false,               // Item state
    iconCss: 'e-icons e-home'      // Icon CSS class
  },
  {
    id: 'category',
    text: 'Category',
    url: '/category',
    disabled: false
  }
];
```

### Creating Dynamic Items

```typescript
// Create items from array data
const navigationPath = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Settings', link: '/settings' },
  { label: 'Profile', link: '/settings/profile' }
];

const items = navigationPath.map((item, index) => ({
  id: `item-${index}`,
  text: item.label,
  url: item.link,
  disabled: false
}));

const breadcrumb = new Breadcrumb({ items });
```

### Items with Icons

```typescript
const itemsWithIcons = [
  { text: 'Home', url: '/', iconCss: 'e-icons e-home' },
  { text: 'Documents', url: '/docs', iconCss: 'e-icons e-folder' },
  { text: 'Reports', url: '/docs/reports', iconCss: 'e-icons e-file' }
];

const breadcrumb = new Breadcrumb({ items: itemsWithIcons });
```

### Disabled Items

Disable specific items to prevent navigation:

```typescript
const items = [
  { text: 'Home', url: '/', disabled: false },
  { text: 'Current', url: '/current', disabled: true }  // Current page
];
```

## DOM Integration

### Using appendTo()

Attach the breadcrumb to a specific DOM element:

```typescript
// Using element ID
breadcrumb.appendTo('#breadcrumb');

// Using HTMLElement
const container = document.getElementById('breadcrumb');
breadcrumb.appendTo(container);

// Using selector
breadcrumb.appendTo('nav.breadcrumb-container');
```

### Creating Multiple Instances

```typescript
// Breadcrumb 1
const breadcrumb1 = new Breadcrumb({
  items: [...],
  maxItems: 4
});
breadcrumb1.appendTo('#breadcrumb-1');

// Breadcrumb 2
const breadcrumb2 = new Breadcrumb({
  items: [...],
  maxItems: 3
});
breadcrumb2.appendTo('#breadcrumb-2');
```

## Minimal Working Example

Complete example with HTML, CSS, and TypeScript:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@syncfusion/ej2-fluent2-theme/styles/breadcrumb/index.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    .example-section {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="example-section">
      <h2>Basic Breadcrumb</h2>
      <nav id="breadcrumb"></nav>
    </div>
  </div>

  <script type="module">
    import { Breadcrumb } from '@syncfusion/ej2-navigations';

    // Create breadcrumb with navigation items
    const breadcrumb = new Breadcrumb({
      items: [
        { text: 'Home', url: '/' },
        { text: 'Services', url: '/services' },
        { text: 'Consulting', url: '/services/consulting' }
      ],
      enableNavigation: true
    });

    // Attach to DOM
    breadcrumb.appendTo('#breadcrumb');

    // Handle click events
    breadcrumb.itemClick = (args) => {
      console.log('Navigating to:', args.item.text, args.item.url);
    };
  </script>
</body>
</html>
```

## Styling and Themes

### Theme CSS Imports

Import the appropriate theme stylesheet before using the breadcrumb:

```typescript
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/breadcrumb/index.css";
```

### Base CSS

Always include the base CSS:

```html
<link rel="stylesheet" href="node_modules/@syncfusion/ej2-fluent2-theme/styles/breadcrumb/index.css">
```

### Custom Styling

Apply custom CSS classes through the `cssClass` property:

```typescript
const breadcrumb = new Breadcrumb({
  items: [...],
  cssClass: 'custom-breadcrumb'
});
```

```css
.custom-breadcrumb {
  background-color: #f5f5f5;
  padding: 10px 15px;
  border-radius: 4px;
}

.custom-breadcrumb .e-breadcrumb-item {
  font-weight: 500;
}
```

### RTL Support

Enable right-to-left rendering for RTL languages:

```typescript
const breadcrumb = new Breadcrumb({
  items: [...],
  enableRtl: true
});
```

---

**Next:** Configure items with properties and customize their behavior using [component-properties.md](component-properties.md).

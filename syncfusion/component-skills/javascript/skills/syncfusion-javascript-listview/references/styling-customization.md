# Styling and Customization

## Table of Contents
- [Theme Selection](#theme-selection)
- [CSS Classes](#css-classes)
- [CSS Customization Guide](#css-customization-guide)
- [Custom Styling](#custom-styling)
- [RTL Support](#rtl-support)
- [Responsive Design](#responsive-design)
- [Dark Mode](#dark-mode)

## Theme Selection

### Built-in Themes

```typescript
import { ListView } from '@syncfusion/ej2-lists';

// Material Theme (Default)
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';

// Or use other themes by replacing imports:
// import '@syncfusion/ej2-base/styles/fluent2.css';
// import '@syncfusion/ej2-lists/styles/fluent2.css';

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

### Available Theme Options

```typescript
const themes = [
    'material.css',      // Google Material Design (Default)
    'fluent2.css',       // Microsoft Fluent 2
    'bootstrap.css',     // Bootstrap Theme
    'bootstrap5.css',    // Bootstrap 5
    'fabric.css',        // Office Fabric
    'tailwind.css'       // Tailwind CSS
];

// Switch theme dynamically
function switchTheme(themeName) {
    const baseLink = document.getElementById('base-theme');
    const listLink = document.getElementById('list-theme');
    
    baseLink.href = `node_modules/@syncfusion/ej2-base/styles/${themeName}`;
    listLink.href = `node_modules/@syncfusion/ej2-lists/styles/${themeName}`;
}
```

### Theme CSS Links in HTML

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Base Theme -->
    <link id="base-theme" href="node_modules/@syncfusion/ej2-base/styles/material.css" rel="stylesheet" />
    <!-- ListView Theme -->
    <link id="list-theme" href="node_modules/@syncfusion/ej2-lists/styles/material.css" rel="stylesheet" />
</head>
<body>
    <div id="listview"></div>
</body>
</html>
```

## CSS Classes

### Built-in ListView Classes

```css
/* Root container */
.e-listview { }

/* List item */
.e-list-item { }

/* Selected item */
.e-list-item.e-active { }

/* Disabled item */
.e-list-item.e-disabled { }

/* List item text */
.e-list-item-text { }

/* List item description */
.e-list-item-description { }

/* Group header */
.e-list-group-header { }

/* Header container */
.e-list-header { }

/* Icon element */
.e-icon { }

/* Checkbox element */
.e-checkbox { }

/* List item with avatar */
.e-list-item.e-has-avatar { }
```

### Applying Custom Classes

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    htmlAttributes: {
        class: 'my-custom-listview'
    }
});

listView.appendTo('#listview');
```

### CSS Class Targeting

```css
/* Custom styling */
.my-custom-listview .e-list-item {
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
}

.my-custom-listview .e-list-item.e-active {
    background-color: #e8f4f8;
    border-left: 4px solid #0078d4;
    padding-left: 11px;
}

.my-custom-listview .e-list-item:hover {
    background-color: #f5f5f5;
    transition: background-color 0.2s;
}
```

## CSS Customization Guide

The following CSS styles provide exact patterns to modify the ListView control's appearance based on user preferences.

### Customizing ListView Container

Use the following CSS to customize the ListView control's main container:

```css
.e-listview {
    border: 5px solid rgb(173, 255, 47);
    border-radius: 8px;
    background-color: #fafafa;
}
```

### Customizing List Items

Use the following CSS to customize the items displayed in the ListView:

```css
.e-listview .e-list-item {
    text-align: center;
    color: pink;
    background-color: #2fa1ff;
    padding: 12px;
    margin: 2px 0;
}
```

### Customizing ListView Header

Use the following CSS to customize the header section of the ListView control:

```css
.e-listview .e-list-header {
    color: #2fa1ff;
    justify-content: center;
    background-color: #f5f5f5;
    padding: 12px;
    font-weight: 600;
}
```

### Customizing Group Header

Use the following CSS to customize the category group header styling:

```css
.e-listview .e-list-group-item {
    color: rgb(173, 255, 47);
    background-color: maroon;
    text-align: end;
    padding: 10px;
    font-weight: 600;
}
```

### Customizing Hover State

#### Hover State with Checkbox Selected

Use this CSS to customize the hover state when a checkbox is checked:

```css
.e-listview .e-list-item.e-hover.e-active.e-checklist {
    color: rgb(83, 5, 79);
    background-color: rgb(173, 255, 47);
    transition: all 0.2s ease;
}
```

#### Basic Hover State

Use this CSS to customize the hover state for list items:

```css
.e-listview .e-list-item.e-hover {
    color: red;
    background-color: rgb(173, 255, 47);
    cursor: pointer;
    transition: background-color 0.2s ease;
}
```

### Customizing Selected Item State

#### Selected Item with Checkbox

Use this CSS to customize the selected state when a checkbox is checked:

```css
.e-listview .e-list-item.e-checklist.e-focused.e-active {
    color: rgb(83, 5, 79);
    background-color: rgb(0, 15, 100);
    border-left: 4px solid rgb(173, 255, 47);
}
```

#### Basic Selected Item

Use this CSS to customize the selected list item:

```css
.e-listview .e-list-item.e-active {
    color: red;
    background-color: aqua;
    border-left: 4px solid #ff0000;
    font-weight: 500;
}
```

## Custom Styling

### Inline Styles

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    template: `
        <div style="
            padding: 12px;
            border-radius: 4px;
            background-color: #f9f9f9;
            margin: 2px 0;
        ">
            ${text}
        </div>
    `
});

listView.appendTo('#listview');
```

### Custom Container Styles

```typescript
// JavaScript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

// Apply custom styles
const container = document.getElementById('listview');
container.style.maxWidth = '400px';
container.style.margin = '0 auto';
container.style.borderRadius = '8px';
container.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
```

### Themed Item Styling

```css
/* Light theme */
.light-theme .e-list-item {
    background-color: #ffffff;
    color: #333333;
}

.light-theme .e-list-item.e-active {
    background-color: #e3f2fd;
    color: #1976d2;
}

/* Dark theme */
.dark-theme .e-list-item {
    background-color: #424242;
    color: #ffffff;
}

.dark-theme .e-list-item.e-active {
    background-color: #1976d2;
    color: #ffffff;
}
```

### Status-Based Styling

```typescript
const items = [
    { id: '1', text: 'Completed', status: 'done' },
    { id: '2', text: 'In Progress', status: 'pending' },
    { id: '3', text: 'Not Started', status: 'failed' }
];

const listView = new ListView({
    dataSource: items,
    fields: { id: 'id', text: 'text' },
    template: `
        <div class="status-item status-${status}">
            <span class="status-indicator"></span>
            <span>${text}</span>
        </div>
    `
});

listView.appendTo('#listview');

// CSS
const css = `
    .status-item {
        display: flex;
        align-items: center;
        padding: 10px;
    }

    .status-done {
        border-left: 4px solid #4CAF50;
        background-color: #f1f8f5;
    }

    .status-done .status-indicator {
        background-color: #4CAF50;
    }

    .status-pending {
        border-left: 4px solid #FF9800;
        background-color: #fff3f0;
    }

    .status-pending .status-indicator {
        background-color: #FF9800;
    }

    .status-failed {
        border-left: 4px solid #f44336;
        background-color: #fef1f0;
    }

    .status-failed .status-indicator {
        background-color: #f44336;
    }

    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 10px;
    }
`;
```

## RTL Support

### Enable RTL

```typescript
import { ListView, enableRtl } from '@syncfusion/ej2-lists';

// Enable RTL globally
enableRtl(true);

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    enableRtl: true
});

listView.appendTo('#listview');
```

### RTL in HTML

```html
<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="utf-8" />
    <title>ListView RTL</title>
    <link href="styles/material.css" rel="stylesheet" />
</head>
<body>
    <div id="listview"></div>
</body>
</html>
```

### RTL CSS Adjustments

```css
[dir="rtl"] .e-listview {
    direction: rtl;
    text-align: right;
}

[dir="rtl"] .e-list-item {
    text-align: right;
    padding-right: 15px;
    padding-left: 5px;
}

[dir="rtl"] .e-icon {
    margin-left: 10px;
    margin-right: 0;
}
```

## Responsive Design

### Media Queries

```css
/* Desktop */
.e-listview {
    max-width: 800px;
    font-size: 14px;
}

/* Tablet */
@media (max-width: 768px) {
    .e-listview {
        max-width: 100%;
        font-size: 13px;
    }

    .e-list-item {
        padding: 12px 10px;
    }
}

/* Mobile */
@media (max-width: 480px) {
    .e-listview {
        max-width: 100%;
        font-size: 12px;
    }

    .e-list-item {
        padding: 10px 8px;
    }

    .e-list-item-description {
        display: none;
    }
}
```

### Dynamic Height

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    height: window.innerWidth > 768 ? '600px' : 'auto'
});

listView.appendTo('#listview');

// Update height on window resize
window.addEventListener('resize', () => {
    listView.height = window.innerWidth > 768 ? '600px' : 'auto';
    listView.refresh();
});
```

### Responsive Grid Layout

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    template: `
        <div class="grid-item">
            <div class="grid-content">${text}</div>
        </div>
    `
});

listView.appendTo('#listview');

// CSS
const css = `
    @media (min-width: 1024px) {
        .e-listview {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
        }
        .grid-item {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
        }
    }

    @media (max-width: 1023px) and (min-width: 768px) {
        .e-listview {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
    }

    @media (max-width: 767px) {
        .e-listview {
            display: block;
        }
    }
`;
```

## Grid Layout Customization

The ListView component can be customized to display items in a grid layout instead of a traditional list by applying CSS styling and templates.

### Basic Grid Layout

```typescript
import { ListView } from '@syncfusion/ej2-lists';

// Simple numeric data for grid items
const data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const listView = new ListView({
    dataSource: data,
    template: '<img src="url" alt="item" style="width: 100%; height: 100%; object-fit: cover;" />'
});

listView.appendTo('#listview');
```

### Grid Layout CSS

```css
/* Create grid layout with 3 columns */
#listview .e-list-item {
    height: 100px;
    width: 100px;
    float: left;
    margin: 5px;
    border-radius: 4px;
    overflow: hidden;
}

/* Remove default list item padding */
#listview {
    padding: 0;
}

/* Responsive grid - 2 columns on mobile */
@media (max-width: 768px) {
    #listview .e-list-item {
        height: 80px;
        width: 80px;
    }
}
```

### Advanced Grid with Data Objects

```typescript
const gridData = [
    { id: 1, title: 'Product 1', image: 'product1.jpg', price: '$99' },
    { id: 2, title: 'Product 2', image: 'product2.jpg', price: '$149' },
    { id: 3, title: 'Product 3', image: 'product3.jpg', price: '$199' }
];

const listView = new ListView({
    dataSource: gridData,
    fields: { id: 'id', text: 'title' },
    template: `
        <div class="grid-card">
            <img src="${'${image}'}" alt="${'${title}'}" />
            <div class="card-info">
                <h4>${'${title}'}</h4>
                <p>${'${price}'}</p>
            </div>
        </div>
    `
});

listView.appendTo('#grid-view');
```

### Grid Layout CSS with Cards

```css
#grid-view .e-list-item {
    height: auto;
    width: 150px;
    float: left;
    margin: 10px;
    padding: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease;
}

#grid-view .e-list-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.grid-card {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.grid-card img {
    width: 100%;
    height: 120px;
    object-fit: cover;
}

.card-info {
    padding: 10px;
    flex-grow: 1;
}

.card-info h4 {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
}

.card-info p {
    margin: 4px 0 0 0;
    font-size: 10px;
    color: #666;
}
```

### Grid Operations

#### Add Item to Grid

```typescript
function addGridItem() {
    const newItem = {
        id: gridData.length + 1,
        title: `Product ${gridData.length + 1}`,
        image: 'new-product.jpg',
        price: '$249'
    };
    
    gridData.push(newItem);
    listView.addItem(newItem);
}
```

#### Remove Item from Grid

```typescript
function removeGridItem(itemIndex) {
    gridData.splice(itemIndex, 1);
    const items = document.querySelectorAll('#grid-view .e-list-item');
    listView.removeItem(items[itemIndex]);
}
```

#### Filter Grid Items

```typescript
function filterGrid(filterPrice) {
    const filtered = gridData.filter(item => {
        const price = parseInt(item.price.replace('$', ''));
        return price <= filterPrice;
    });
    
    listView.dataSource = filtered;
    listView.dataBind();
}
```

See the main SKILL.md for references to other customization topics.

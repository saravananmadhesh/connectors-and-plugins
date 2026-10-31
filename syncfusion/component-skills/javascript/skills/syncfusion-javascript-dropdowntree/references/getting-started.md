# Getting Started with Dropdown Tree

## Table of Contents
- [Dependencies](#dependencies)
- [Installation](#installation)
- [CSS Setup](#css-setup)
- [Basic Initialization](#basic-initialization)
- [TypeScript Example](#typescript-example)
- [ES5 Example](#es5-example)
- [Verify Installation](#verify-installation)

---

## Dependencies

The Dropdown Tree control requires the following dependencies. These are automatically installed when you add the Syncfusion packages:

```
@syncfusion/ej2-dropdowns
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
├── @syncfusion/ej2-inputs
├── @syncfusion/ej2-lists
├── @syncfusion/ej2-navigations
└── @syncfusion/ej2-popups
    └── @syncfusion/ej2-buttons
```

---

## Installation

### 1. Clone the Quickstart Project

To get started quickly, clone the Syncfusion Essential JS 2 quickstart project:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
```

### 2. Install Dependencies

Run npm install to install the required packages:

```bash
npm install
```

The quickstart project includes the `@syncfusion/ej2` package which contains all Syncfusion controls including Dropdown Tree.

### 3. Alternative: Install Individual Package

If you prefer to install only the Dropdown Tree package:

```bash
npm install @syncfusion/ej2-dropdowns
```

---

## CSS Setup

### Import Theme CSS

The Dropdown Tree requires CSS files for styling. Import them in your `src/styles/styles.css` file:

```css
/* Core theme - you can use fluent2, bootstrap5, material, fabric, or tailwind */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/drop-down-tree/index.css";
```

### Available Themes

Replace `fluent2` with one of these options:
- `bootstrap5` - Bootstrap 5 theme
- `material` - Material Design theme
- `fabric` - Fabric Design (Office) theme
- `tailwind` - Tailwind CSS theme
- `bootstrap` - Bootstrap 4 theme

### Custom URL-based CSS

Alternatively, reference CSS from CDN in `index.html`:

```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2.min.css" />
```

---

## Basic Initialization

### HTML Setup

Create an input element in `index.html` that will be converted to a Dropdown Tree:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dropdown Tree - Getting Started</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles/styles.css" />
</head>
<body>
    <div id="container" style="margin: 20px auto; width: 300px;">
        <!-- Element that will render the Dropdown Tree -->
        <input type="text" id="ddtElement" />
    </div>
    <script src="index.js"></script>
</body>
</html>
```

### TypeScript Initialization

In your TypeScript file (`src/index.ts`), import the control and initialize it:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let DropDownTreeObj: DropDownTree = new DropDownTree();
DropDownTreeObj.appendTo('#ddtElement');
```

This creates a basic Dropdown Tree with default settings (empty data source, single selection mode).

---

## TypeScript Example

### Simple List Data

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

// Define simple local data
let localData: { [key: string]: Object }[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

// Initialize with data
let DropDownTreeObj: DropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        id: 'id',
        text: 'name',
        value: 'id'
    },
    placeholder: 'Select an item'
});

DropDownTreeObj.appendTo('#ddtElement');
```

### Hierarchical Data

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

// Define hierarchical data with nested structure
let hierarchicalData: { [key: string]: Object }[] = [
    {
        code: 'AF',
        name: 'Africa',
        countries: [
            { code: 'NGA', name: 'Nigeria' },
            { code: 'EGY', name: 'Egypt' },
            { code: 'ZAF', name: 'South Africa' }
        ]
    },
    {
        code: 'AS',
        name: 'Asia',
        expanded: true,
        countries: [
            { code: 'CHN', name: 'China' },
            { code: 'IND', name: 'India', selected: true },
            { code: 'JPN', name: 'Japan' }
        ]
    },
    {
        code: 'EU',
        name: 'Europe',
        countries: [
            { code: 'DNK', name: 'Denmark' },
            { code: 'FIN', name: 'Finland' },
            { code: 'AUT', name: 'Austria' }
        ]
    }
];

let DropDownTreeObj: DropDownTree = new DropDownTree({
    fields: {
        dataSource: hierarchicalData,
        value: 'code',
        text: 'name',
        child: 'countries'  // Key for nested children
    },
    placeholder: 'Select a country'
});

DropDownTreeObj.appendTo('#ddtElement');
```

### Self-Referential Data

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

// Define self-referential data (parent-child by ID reference)
let selfRefData: { [key: string]: Object }[] = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles' },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music' },
    { id: 7, name: 'Sales and Events', hasChild: true },
    { id: 8, pid: 7, name: '100 Albums - $5 Each' },
    { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' },
    { id: 10, pid: 7, name: 'CD Deals' }
];

let DropDownTreeObj: DropDownTree = new DropDownTree({
    fields: {
        dataSource: selfRefData,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid',  // Parent reference field
        hasChildren: 'hasChild'
    },
    placeholder: 'Select a category'
});

DropDownTreeObj.appendTo('#ddtElement');
```

---

## ES5 Example

For projects not using TypeScript, you can use ES5 syntax:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dropdown Tree - ES5</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/20.4.38/ej2.min.css" />
</head>
<body>
    <div id="container">
        <input type="text" id="ddtElement" />
    </div>

    <script src="https://cdn.syncfusion.com/ej2/20.4.38/ej2.umd.min.js"></script>
    <script>
        // Define data
        var localData = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' }
        ];

        // Initialize Dropdown Tree
        var ddtree = new ej.dropdowns.DropDownTree({
            fields: {
                dataSource: localData,
                id: 'id',
                text: 'name',
                value: 'id'
            },
            placeholder: 'Select an item'
        });

        ddtree.appendTo('#ddtElement');
    </script>
</body>
</html>
```

---

## Verify Installation

### 1. Check npm Packages

Verify the Dropdown Tree package is installed:

```bash
npm list @syncfusion/ej2-dropdowns
```

Expected output shows the installed version.

### 2. Build and Run

Build your project and run it:

```bash
npm start
```

Navigate to `http://localhost:4200` (or your configured port). You should see the Dropdown Tree rendered with data.

### 3. Test Interaction

In the rendered Dropdown Tree:
- Click the input field to open the popup
- The dropdown should display your data items
- Click an item to select it
- The selected value appears in the input field

### 4. Check Browser Console

Open browser DevTools (F12) → Console. Verify:
- No errors about missing `@syncfusion/ej2-dropdowns`
- CSS loads properly (check Network tab for .css files)
- DropDownTree object is created successfully

---

## Troubleshooting

### "Cannot find module '@syncfusion/ej2-dropdowns'"

**Solution**: Run `npm install` to ensure all dependencies are installed.

### Dropdown Tree not displaying

**Solution**: Verify:
1. CSS is imported correctly in styles.css
2. HTML element with id matches the appendTo() parameter
3. Data source is not empty (or control shows empty popup)

### Styles not applied

**Solution**: Check that:
1. Theme CSS is included before your app CSS
2. CSS file path is correct relative to your HTML
3. Browser cache is cleared (Ctrl+Shift+Delete)

### Data not displaying

**Solution**: Verify:
1. `fields` property correctly maps to your data structure
2. `dataSource` array contains objects matching field names
3. For hierarchical data, child field name matches your data structure

---

## Next Steps

Now that Dropdown Tree is installed and working:

1. **Data Binding**: Learn how to bind local, remote, and lazy-loaded data in [data-binding.md](data-binding.md)
2. **Checkboxes**: Enable multi-select with checkboxes in [checkbox-features.md](checkbox-features.md)
3. **Templates**: Customize appearance with templates in [templates-and-customization.md](templates-and-customization.md)
4. **Localization**: Support multiple languages in [localization-and-accessibility.md](localization-and-accessibility.md)

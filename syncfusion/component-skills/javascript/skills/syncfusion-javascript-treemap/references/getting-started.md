# Getting Started with TypeScript and JavaScript TreeMap

This guide covers setting up the Syncfusion TreeMap component for both TypeScript and JavaScript implementations. Learn how to install the package, create basic hierarchies, style leaf items, and resolve common setup issues.

- [prerequisites](#prerequisites)
- [installation](#installation)
  - [step-1-install-syncfusion-treemap-package](#step-1-install-syncfusion-treemap-package)
  - [step-2-add-theme-styles](#step-2-add-theme-styles)
- [basic-component-creation](#basic-component-creation)
- [adding-hierarchy-with-levels](#adding-hierarchy-with-levels)
- [styling-leaf-items](#styling-leaf-items)
- [running-in-development](#running-in-development)
- [common-setup-issues](#common-setup-issues)
  - [issue-cannot-find-module-error](#issue-cannot-find-module-error)
  - [issue-styles-not-loading](#issue-styles-not-loading)
  - [issue-component-renders-blank](#issue-component-renders-blank)

## Prerequisites

Before setting up the TreeMap component, ensure the following are installed:

- Node.js (LTS version recommended)
- npm
- A code editor (VS Code recommended)
- Basic knowledge of TypeScript or JavaScript

## Installation

### Step 1: Install Syncfusion TreeMap Package

Install the TreeMap package from npm:

```bash
npm install @syncfusion/ej2-treemap --save
```

This installs the core TreeMap component that works with both TypeScript and JavaScript.

## Basic Component Creation

### TypeScript Implementation

Create a simple TreeMap component with minimal configuration:

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
    { Country: 'United States', GDP: 25460 },
    { Country: 'China', GDP: 17734 },
    { Country: 'Japan', GDP: 4909 },
    { Country: 'Germany', GDP: 3846 },
    { Country: 'India', GDP: 3287 }
];

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'GDP',
    leafItemSettings: {
        labelPath: 'Country'
    }
});

treeMap.appendTo('#treemap-container');
```

### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 350px;"></div>
```

### JavaScript Implementation

```javascript
var data = [
    { Country: 'United States', GDP: 25460 },
    { Country: 'China', GDP: 17734 },
    { Country: 'Japan', GDP: 4909 },
    { Country: 'Germany', GDP: 3846 },
    { Country: 'India', GDP: 3287 }
];

var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'GDP',
    leafItemSettings: {
        labelPath: 'Country'
    }
});

treeMap.appendTo('#treemap-container');
```

This renders a simple TreeMap showing country sizes proportional to their GDP values.

## Adding Hierarchy with Levels

For multi-level hierarchical grouping, configure the `levels` property as an array of level definitions.

### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
    { Region: 'North America', Company: 'Tech Corp', Product: 'Software', Sales: 15000 },
    { Region: 'North America', Company: 'Tech Corp', Product: 'Hardware', Sales: 12000 },
    { Region: 'Europe', Company: 'Global Inc', Product: 'Software', Sales: 10000 },
    { Region: 'Europe', Company: 'Global Inc', Product: 'Services', Sales: 8000 }
];

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    levels: [
        {
            groupPath: 'Region',
            headerFormat: '${Region}',
            border: { color: '#000000', width: 0.5 }
        },
        {
            groupPath: 'Company',
            headerFormat: '${Company}',
            border: { color: '#000000', width: 0.5 }
        }
    ],
    leafItemSettings: {
        labelPath: 'Product',
        border: { color: '#000000', width: 0.5 }
    }
});

treeMap.appendTo('#treemap-container');
```

### JavaScript Implementation

```javascript
var data = [
    { Region: 'North America', Company: 'Tech Corp', Product: 'Software', Sales: 15000 },
    { Region: 'North America', Company: 'Tech Corp', Product: 'Hardware', Sales: 12000 },
    { Region: 'Europe', Company: 'Global Inc', Product: 'Software', Sales: 10000 },
    { Region: 'Europe', Company: 'Global Inc', Product: 'Services', Sales: 8000 }
];

var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    levels: [
        {
            groupPath: 'Region',
            headerFormat: '${Region}',
            border: { color: '#000000', width: 0.5 }
        },
        {
            groupPath: 'Company',
            headerFormat: '${Company}',
            border: { color: '#000000', width: 0.5 }
        }
    ],
    leafItemSettings: {
        labelPath: 'Product',
        border: { color: '#000000', width: 0.5 }
    }
});

treeMap.appendTo('#treemap-container');
```

The `levels` array defines the hierarchy, where each level contains a `groupPath` to determine the grouping field.

## Styling Leaf Items

Customize the appearance of leaf items (lowest-level rectangles) using `leafItemSettings`:

### TypeScript Configuration

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    leafItemSettings: {
        labelPath: 'Product',
        labelFormat: '${Product}: ${Sales}',
        fill: '#008cba',
        border: { color: '#000000', width: 2 },
        labelPosition: 'Center',
        showLabels: true,
        opacity: 0.9
    }
});

treeMap.appendTo('#treemap-container');
```

### JavaScript Configuration

```javascript
var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Sales',
    leafItemSettings: {
        labelPath: 'Product',
        labelFormat: '${Product}: ${Sales}',
        fill: '#008cba',
        border: { color: '#000000', width: 2 },
        labelPosition: 'Center',
        showLabels: true,
        opacity: 0.9
    }
});

treeMap.appendTo('#treemap-container');
```

**Common `leafItemSettings` properties:**

| Property | Description |
|----------|-------------|
| `labelPath` | Field used as the item label |
| `labelFormat` | Format string for the label text (e.g., `${Product}: ${Sales}`) |
| `fill` | Background color for leaf items |
| `border` | Object with `color` and `width` for item borders |
| `labelPosition` | Label alignment: `TopLeft`, `TopCenter`, `Center`, `BottomCenter`, `BottomRight` |
| `showLabels` | Shows or hides labels (`true` or `false`) |
| `opacity` | Opacity from `0` (transparent) to `1` (opaque) |
| `colorMapping` | Array of conditional coloring rules based on data values |
| `labelStyle` | Object customizing label text appearance (font size, color, etc.) |

## Running in Development

### For TypeScript Projects

If using a bundler like Webpack, Vite, or esbuild:

```bash
# Start development server (bundler-specific)
npm start
# or
npm run dev
```

### For Browser-Based JavaScript

Create an HTML file with CDN links:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>TreeMap Demo</title>
</head>
<body>
    <div id="treemap-container" style="width: 100%; height: 500px;"></div>
    
    <script src="https://cdn.syncfusion.com/ej2/latest/dist/ej2.min.js"></script>
    <script>
        var data = [
            { Country: 'United States', GDP: 25460 },
            { Country: 'China', GDP: 17734 }
        ];
        
        var treeMap = new ej.treemap.TreeMap({
            dataSource: data,
            weightValuePath: 'GDP',
            leafItemSettings: { labelPath: 'Country' }
        });
        
        treeMap.appendTo('#treemap-container');
    </script>
</body>
</html>
```

Open the HTML file in your browser to view the TreeMap.

## Common Setup Issues

### Issue: "Cannot find module" error

**Cause:** The Syncfusion TreeMap package is missing or the dependency install was interrupted.

**Solution:**

```bash
npm install @syncfusion/ej2-treemap
```

If the problem still exists, refresh local dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Issue: Component renders blank

**Cause:** The DOM container element is missing or has no dimensions.

**Solution:** Ensure the container div exists and has explicit width and height:

```html
<!-- Must exist in HTML before TreeMap.appendTo() is called -->
<div id="treemap-container" style="width: 100%; height: 500px;"></div>
```

Verify that:
- The container `id` attribute matches the `appendTo()` parameter
- The container has non-zero width and height
- Theme CSS is loaded before the TreeMap script runs
- The data is not empty or malformed

---

## Next Steps

- Read `color-mapping.md` to apply data-driven color schemes
- Read `levels-and-layout.md` to customize hierarchical layouts
- Read `labels-tooltips-legend.md` to add labels and interactive elements
- Read `drilldown-and-navigation.md` to enable interactive drilldown


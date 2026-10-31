# Getting Started with Dashboard Layout

## Table of Contents
- [Installation](#installation)
- [Basic Setup](#basic-setup)
- [HTML Attributes Method](#html-attributes-method)
- [Script Method](#script-method)
- [Configuration Options](#configuration-options)
- [Running Your Application](#running-your-application)

## Installation

Install the Syncfusion Dashboard Layout package via npm:

```bash
npm install @syncfusion/ej2-layouts
```

## Basic Setup

### 1. Import CSS Styles

In your main CSS file or application entry point, import the theme:

```css
@import "../../node_modules/@syncfusion/ej2-base/styles/fluent2.css";
@import "../../node_modules/@syncfusion/ej2-layouts/styles/fluent2.css";
```

Available themes: `fluent2`, `bootstrap5`, `material`, `highcontrast`

### 2. Import TypeScript Module

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
```

## HTML Attributes Method

Define panels directly in HTML using data attributes. This approach is ideal for static layouts:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Layout</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id="dashboard_inline">
        <!-- Panel with data attributes for positioning -->
        <div id="panel_one" class="e-panel" data-row="0" data-col="0" data-sizeX="1" data-sizeY="1">
            <div class="e-panel-container">
                <div class="content">Panel 1</div>
            </div>
        </div>
        
        <div id="panel_two" class="e-panel" data-row="0" data-col="1" data-sizeX="2" data-sizeY="2">
            <div class="e-panel-container">
                <div class="content">Panel 2</div>
            </div>
        </div>
    </div>

    <script src="app.ts"></script>
</body>
</html>
```

Initialize with TypeScript:

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

let dashboard: DashboardLayout = new DashboardLayout({
    columns: 5
});
dashboard.appendTo('#dashboard_inline');
```

**Key HTML Attributes:**
- `data-row`: Panel row position (0-indexed)
- `data-col`: Panel column position (0-indexed)
- `data-sizeX`: Panel width in cells
- `data-sizeY`: Panel height in cells

## Script Method

Define panels programmatically for dynamic layouts:

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard: DashboardLayout = new DashboardLayout({
    cellSpacing: [10, 10],      // [horizontalSpacing, verticalSpacing] in pixels
    columns: 5,                 // Total grid columns
    panels: [
        {
            'sizeX': 1,
            'sizeY': 1,
            'row': 0,
            'col': 0,
            content: '<div class="content">Panel 0</div>'
        },
        {
            'sizeX': 3,
            'sizeY': 2,
            'row': 0,
            'col': 1,
            content: '<div class="content">Panel 1</div>'
        },
        {
            'sizeX': 1,
            'sizeY': 3,
            'row': 0,
            'col': 4,
            content: '<div class="content">Panel 2</div>'
        },
        {
            'sizeX': 1,
            'sizeY': 1,
            'row': 1,
            'col': 0,
            content: '<div class="content">Panel 3</div>'
        }
    ]
});

dashboard.appendTo('#dashboard_layout');
```

**Panel Properties at Initialization:**
- `sizeX`: Panel width (required)
- `sizeY`: Panel height (required)
- `row`: Starting row position (required)
- `col`: Starting column position (required)
- `content`: HTML string or DOM element
- `id`: Unique identifier (optional but recommended)

## Configuration Options

### Essential Properties

```typescript
const dashboard = new DashboardLayout({
    // Grid configuration
    columns: 6,                 // Number of columns in the grid
    cellSpacing: [10, 10],      // [horizontal, vertical] spacing in pixels
    cellAspectRatio: 100 / 75,  // Width/height ratio of grid cells
    
    // Interaction features
    allowDragging: true,        // Enable panel dragging
    allowResizing: true,        // Enable panel resizing
    allowFloating: true,        // Auto-fill empty spaces
    
    // Responsive behavior
    mediaQuery: '(max-width: 600px)',  // Stack panels at breakpoint
    
    // Persistence
    enablePersistence: false,   // Save state to localStorage
    
    // Display options
    showGridLines: false,       // Show grid guide lines
    enableRtl: false,           // Right-to-left layout
    
    // Content security
    enableHtmlSanitizer: true,  // Sanitize HTML in content
    
    // Panels data
    panels: []
});
```

### Default Values

| Property | Default |
|----------|---------|
| `columns` | 12 |
| `cellSpacing` | [20, 20] |
| `cellAspectRatio` | 1 |
| `allowDragging` | true |
| `allowResizing` | true |
| `allowFloating` | false |
| `enablePersistence` | false |
| `showGridLines` | false |
| `enableRtl` | false |

## Running Your Application

### With Webpack

```bash
npm run dev
```

### With SystemJS

Include SystemJS configuration in your HTML:

```html
<script src="url"></script>
<script src="systemjs.config.js"></script>
```

### Complete Example HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Layout Demo</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <style>
        #dashboard {
            margin: 20px;
        }
        .e-panel .e-panel-container .content {
            padding: 20px;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div id="dashboard"></div>

    <script>
        import { DashboardLayout } from '@syncfusion/ej2-layouts';
        
        let dashboard = new DashboardLayout({
            cellSpacing: [10, 10],
            columns: 5,
            panels: [
                { sizeX: 1, sizeY: 1, row: 0, col: 0, content: '<div class="content">0</div>' },
                { sizeX: 3, sizeY: 2, row: 0, col: 1, content: '<div class="content">1</div>' },
                { sizeX: 1, sizeY: 3, row: 0, col: 4, content: '<div class="content">2</div>' }
            ]
        });
        dashboard.appendTo('#dashboard');
    </script>
</body>
</html>
```

## Next Steps

- **Configure panels**: See [panel-configuration.md](panel-configuration.md)
- **Enable interactions**: See [dragging-and-moving.md](dragging-and-moving.md) and [resizing-panels.md](resizing-panels.md)
- **Add responsiveness**: See [floating-and-responsive.md](floating-and-responsive.md)
- **Save layouts**: See [persistence-and-state.md](persistence-and-state.md)

# Panel Configuration

## Table of Contents
- [Panel Properties](#panel-properties)
- [Positioning Panels](#positioning-panels)
- [Panel Headers](#panel-headers)
- [Panel Content](#panel-content)
- [Styling and CSS Classes](#styling-and-css-classes)
- [Sizing Constraints](#sizing-constraints)
- [Examples](#examples)

## Panel Properties

Each panel in the Dashboard Layout is configured with the following properties:

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `id` | string | Unique identifier for the panel | "panel_1" |
| `row` | number | Starting row position (0-indexed) | 0 |
| `col` | number | Starting column position (0-indexed) | 1 |
| `sizeX` | number | Panel width in grid cells | 2 |
| `sizeY` | number | Panel height in grid cells | 3 |
| `header` | string \| HTMLElement \| Function | Panel header content | "My Panel" |
| `content` | string \| HTMLElement \| Function | Panel body content | "<div>Content</div>" |
| `cssClass` | string | CSS class to apply to panel | "custom-panel" |
| `enabled` | boolean | Enable/disable the panel | true |
| `minSizeX` | number | Minimum width when resizing | 1 |
| `maxSizeX` | number | Maximum width when resizing | 4 |
| `minSizeY` | number | Minimum height when resizing | 1 |
| `maxSizeY` | number | Maximum height when resizing | 5 |
| `zIndex` | number | Stacking order | 1 |

## Positioning Panels

### Basic Positioning

Panels are positioned using a grid coordinate system:

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    cellSpacing: [10, 10],
    panels: [
        // Panel at row 0, col 0, 1 cell wide × 1 cell tall
        {
            'row': 0,
            'col': 0,
            'sizeX': 1,
            'sizeY': 1,
            content: '<div class="content">Position (0, 0)</div>'
        },
        // Panel at row 0, col 1, 2 cells wide × 2 cells tall
        {
            'row': 0,
            'col': 1,
            'sizeX': 2,
            'sizeY': 2,
            content: '<div class="content">Position (0, 1)</div>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

### Position Mapping

For a dashboard with 5 columns:
- Valid `col` values: 0, 1, 2, 3, 4
- `row` can be any positive integer
- `sizeX` can be 1-5 (but shouldn't exceed available space)
- `sizeY` can be any positive integer

## Panel Headers

Headers provide titles and additional UI elements for panels:

### Simple Header Text

```typescript
{
    'id': 'panel_1',
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 0,
    'header': 'Sales Chart',
    content: '<canvas id="chart"></canvas>'
}
```

### HTML Header

```typescript
{
    'id': 'panel_2',
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 2,
    'header': '<div class="panel-title">Analytics Dashboard</div><span class="refresh-btn">🔄</span>',
    content: '<div id="analytics"></div>'
}
```

### Header with DOM Element

```typescript
const headerElement = document.createElement('div');
headerElement.innerHTML = '<h3>Revenue Report</h3>';
headerElement.className = 'custom-header';

const panel = {
    'id': 'panel_3',
    'sizeX': 3,
    'sizeY': 2,
    'row': 2,
    'col': 0,
    'header': headerElement,
    content: '<table id="revenue-table"></table>'
};
```

### Header as Template Function

```typescript
const headerTemplate = () => {
    const div = document.createElement('div');
    div.textContent = `Panel ${Date.now()}`;
    return div;
};

const panel = {
    'id': 'dynamic_panel',
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 0,
    'header': headerTemplate,
    content: '<p>Dynamic content</p>'
};
```

## Panel Content

Content is the main body area of a panel:

### String Content

```typescript
{
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 0,
    content: '<div class="chart"><canvas></canvas></div>'
}
```

### DOM Element Content

```typescript
const contentDiv = document.createElement('div');
contentDiv.className = 'chart-container';
contentDiv.innerHTML = '<svg id="chart"></svg>';

const panel = {
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 0,
    content: contentDiv
};
```

### Template Function Content

```typescript
const contentTemplate = () => {
    const ul = document.createElement('ul');
    ul.innerHTML = `
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    `;
    return ul;
};

const panel = {
    'sizeX': 1,
    'sizeY': 2,
    'row': 0,
    'col': 0,
    content: contentTemplate
};
```

## Styling and CSS Classes

### Using cssClass Property

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        {
            'id': 'panel_1',
            'sizeX': 2,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'cssClass': 'premium-panel highlight-border',
            content: '<div>Premium Widget</div>'
        },
        {
            'id': 'panel_2',
            'sizeX': 2,
            'sizeY': 2,
            'row': 0,
            'col': 2,
            'cssClass': 'standard-panel',
            content: '<div>Standard Widget</div>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

### CSS Styling

```css
/* Target specific panel by class */
.premium-panel {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.premium-panel .e-panel-header {
    background: #667eea;
    color: white;
    font-weight: bold;
}

.standard-panel {
    background: #f5f5f5;
    border: 1px solid #ddd;
}

/* Target all panels */
.e-dashboard-layout .e-panel {
    transition: box-shadow 0.3s ease;
}

.e-dashboard-layout .e-panel:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

/* Panel content styling */
.e-panel .e-panel-container .content {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.highlight-border .e-panel-header {
    border-bottom: 3px solid #ff6b6b;
}
```

## Sizing Constraints

Control minimum and maximum panel sizes:

### Without Constraints

```typescript
{
    'id': 'flexible_panel',
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 0,
    content: '<div>Can resize to any size</div>'
}
```

### With Min/Max Constraints

```typescript
{
    'id': 'constrained_panel',
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 2,
    'minSizeX': 1,    // Cannot shrink below 1 cell wide
    'maxSizeX': 4,    // Cannot grow beyond 4 cells wide
    'minSizeY': 1,    // Cannot shrink below 1 cell tall
    'maxSizeY': 3,    // Cannot grow beyond 3 cells tall
    content: '<div>Resize within limits</div>'
}
```

### Practical Example

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    allowResizing: true,
    panels: [
        {
            'id': 'widget_small',
            'sizeX': 1,
            'sizeY': 1,
            'row': 0,
            'col': 0,
            'minSizeX': 1,
            'maxSizeX': 2,
            'minSizeY': 1,
            'maxSizeY': 1,
            content: '<div>Small fixed-height widget</div>'
        },
        {
            'id': 'widget_large',
            'sizeX': 3,
            'sizeY': 2,
            'row': 0,
            'col': 2,
            'minSizeX': 2,
            'maxSizeX': 4,
            'minSizeY': 2,
            'maxSizeY': 4,
            content: '<div>Flexible widget</div>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

## Examples

### Complete Panel Configuration Example

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 6,
    cellSpacing: [15, 15],
    allowDragging: true,
    allowResizing: true,
    panels: [
        {
            'id': 'revenue_panel',
            'row': 0,
            'col': 0,
            'sizeX': 2,
            'sizeY': 2,
            'header': '<h3>Revenue</h3>',
            'cssClass': 'revenue-widget',
            'minSizeX': 1,
            'maxSizeX': 3,
            content: '<div class="chart"><canvas id="revenue-chart"></canvas></div>'
        },
        {
            'id': 'users_panel',
            'row': 0,
            'col': 2,
            'sizeX': 2,
            'sizeY': 2,
            'header': '<h3>Active Users</h3>',
            'cssClass': 'users-widget',
            'minSizeX': 1,
            'maxSizeX': 3,
            content: '<div class="metric"><span class="value">1,234</span></div>'
        },
        {
            'id': 'tasks_panel',
            'row': 0,
            'col': 4,
            'sizeX': 2,
            'sizeY': 2,
            'header': '<h3>Tasks</h3>',
            'cssClass': 'tasks-widget',
            content: '<ul id="task-list"><li>Loading...</li></ul>'
        },
        {
            'id': 'details_panel',
            'row': 2,
            'col': 0,
            'sizeX': 6,
            'sizeY': 2,
            'header': '<h3>Detailed Analytics</h3>',
            'cssClass': 'details-widget full-width',
            'minSizeX': 3,
            content: '<table id="analytics-table"></table>'
        }
    ]
});

dashboard.appendTo('#dashboard_container');
```

### Dynamic Panel with Unique ID and Styles

```typescript
function createPanel(id, title, row, col, sizeX, sizeY, content) {
    return {
        'id': id,
        'row': row,
        'col': col,
        'sizeX': sizeX,
        'sizeY': sizeY,
        'header': `<h4>${title}</h4>`,
        'cssClass': `panel-${sizeX}x${sizeY}`,
        'minSizeX': 1,
        'maxSizeX': sizeX + 1,
        content: content
    };
}

const panels = [
    createPanel('panel_1', 'Widget 1', 0, 0, 2, 2, '<div>Content 1</div>'),
    createPanel('panel_2', 'Widget 2', 0, 2, 2, 2, '<div>Content 2</div>'),
    createPanel('panel_3', 'Widget 3', 0, 4, 2, 2, '<div>Content 3</div>')
];

const dashboard = new DashboardLayout({
    columns: 6,
    panels: panels
});

dashboard.appendTo('#dashboard');
```

## Disabled Panels

```typescript
{
    'id': 'disabled_panel',
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 0,
    'enabled': false,  // Panel will not be interactive
    'cssClass': 'disabled-state',
    content: '<div>Coming Soon</div>'
}
```

## Next Steps

- **Enable dragging**: See [dragging-and-moving.md](dragging-and-moving.md)
- **Enable resizing**: See [resizing-panels.md](resizing-panels.md)
- **Handle events**: See [events-handling.md](events-handling.md)
- **Complete API reference**: See [api-reference.md](api-reference.md)

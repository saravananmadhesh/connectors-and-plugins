# Floating and Responsive Layouts

## Table of Contents
- [Panel Floating](#panel-floating)
- [Responsive Design with Media Query](#responsive-design-with-media-query)
- [Cell Aspect Ratio](#cell-aspect-ratio)
- [RTL Support](#rtl-support)
- [Examples](#examples)

## Panel Floating

The floating feature automatically moves panels upward to fill empty spaces in the dashboard grid, optimizing space usage.

### Enable Floating

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 6,
    cellSpacing: [10, 10],
    allowFloating: true,  // Enable floating
    panels: [
        { 'sizeX': 2, 'sizeY': 2, 'row': 1, 'col': 0, content: '<div>Panel 1</div>' },
        { 'sizeX': 2, 'sizeY': 2, 'row': 2, 'col': 2, content: '<div>Panel 2</div>' },
        { 'sizeX': 2, 'sizeY': 2, 'row': 3, 'col': 4, content: '<div>Panel 3</div>' }
    ]
});

dashboard.appendTo('#dashboard');
```

With floating enabled, panels in rows 1, 2, and 3 will automatically move up to fill row 0, 0, and 1 respectively.

### Disable Floating (Default)

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    allowFloating: false,  // Panels stay in defined positions
    panels: [...]
});
```

### Toggle Floating at Runtime

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 5,
    allowFloating: false,
    panels: [
        { 'sizeX': 2, 'sizeY': 2, 'row': 1, 'col': 0, content: '<div>Panel 1</div>' },
        { 'sizeX': 2, 'sizeY': 2, 'row': 2, 'col': 2, content: '<div>Panel 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');

const toggleBtn = new Button({
    cssClass: 'e-primary',
    content: 'Enable Floating',
    isToggle: true
});
toggleBtn.appendTo('#toggle-float');

let isFloating = false;

document.getElementById('toggle-float').addEventListener('click', () => {
    isFloating = !isFloating;
    dashboard.allowFloating = isFloating;
    
    toggleBtn.content = isFloating ? 'Disable Floating' : 'Enable Floating';
});
```

### Before and After Floating

**Before (panels in original positions):**
```
[Panel 1]  [        ]
[        ]  [Panel 2]
[        ]  [        ] [Panel 3]
```

**After (floating enabled):**
```
[Panel 1]  [Panel 2]
[        ]  [        ] [Panel 3]
[        ]  [        ]
```

## Responsive Design with Media Query

The `mediaQuery` property stacks panels vertically when the specified screen resolution is met:

### Basic Media Query

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    mediaQuery: '(max-width: 600px)',  // Stack on screens ≤ 600px
    panels: [
        { 'sizeX': 3, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'sizeX': 3, 'sizeY': 2, 'row': 0, 'col': 3, content: '<div>Panel 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');
```

### Multiple Breakpoints

Create multiple DashboardLayout instances for different breakpoints:

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

// Desktop layout (≥ 1200px)
const desktopDashboard = new DashboardLayout({
    columns: 6,
    cellSpacing: [20, 20],
    panels: [
        { 'sizeX': 3, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Widget 1</div>' },
        { 'sizeX': 3, 'sizeY': 2, 'row': 0, 'col': 3, content: '<div>Widget 2</div>' }
    ]
});

// Mobile layout (< 600px)
const mobileDashboard = new DashboardLayout({
    columns: 1,
    cellSpacing: [10, 10],
    mediaQuery: '(max-width: 599px)',
    panels: [
        { 'sizeX': 1, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Widget 1</div>' },
        { 'sizeX': 1, 'sizeY': 2, 'row': 2, 'col': 0, content: '<div>Widget 2</div>' }
    ]
});
```

### Common Breakpoints

```typescript
// Small phones (< 480px)
mediaQuery: '(max-width: 479px)'

// Phones (480px - 767px)
mediaQuery: '(min-width: 480px) and (max-width: 767px)'

// Tablets (768px - 1024px)
mediaQuery: '(min-width: 768px) and (max-width: 1024px)'

// Large screens (> 1025px)
mediaQuery: '(min-width: 1025px)'
```

### Responsive with CSS Media Queries

Combine DashboardLayout with CSS media queries for additional control:

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    mediaQuery: '(max-width: 768px)',
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

```css
@media (max-width: 768px) {
    #dashboard .e-panel {
        min-height: 200px;
    }
    
    #dashboard .e-panel-container .content {
        font-size: 14px;
        padding: 10px;
    }
}

@media (max-width: 480px) {
    #dashboard .e-panel-container .content {
        font-size: 12px;
        padding: 5px;
    }
}
```

## Cell Aspect Ratio

The `cellAspectRatio` property controls the width-to-height ratio of grid cells:

### Default Aspect Ratio

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    cellAspectRatio: 1,  // Square cells (width = height)
    panels: [...]
});
```

### Custom Aspect Ratio

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    cellAspectRatio: 16 / 9,  // Widescreen cells
    panels: [...]
});
```

### Common Aspect Ratios

```typescript
// Square
cellAspectRatio: 1

// 16:9 widescreen
cellAspectRatio: 16 / 9  // ≈ 1.78

// 4:3 standard
cellAspectRatio: 4 / 3  // ≈ 1.33

// 3:2
cellAspectRatio: 3 / 2  // 1.5

// Tall/narrow
cellAspectRatio: 1 / 2  // 0.5

// Very wide
cellAspectRatio: 21 / 9  // ≈ 2.33
```

### Aspect Ratio Example

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    cellSpacing: [15, 15],
    cellAspectRatio: 16 / 9,  // Widescreen layout
    panels: [
        {
            'sizeX': 3,
            'sizeY': 1,
            'row': 0,
            'col': 0,
            'header': 'Chart Panel',
            content: '<canvas id="chart"></canvas>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, and other RTL languages:

### Enable RTL

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    enableRtl: true,  // Enable RTL layout
    panels: [
        { 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>لوحة 1</div>' },
        { 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>لوحة 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');
```

### RTL with CSS

```html
<div id="dashboard" dir="rtl"></div>
```

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    enableRtl: true,
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

## Examples

### Example 1: Floating with Toggle Button

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 6,
    cellSpacing: [10, 10],
    allowFloating: false,
    cellAspectRatio: 100 / 75,
    panels: [
        { 'sizeX': 2, 'sizeY': 2, 'row': 1, 'col': 0, content: '<div class="content">0</div>' },
        { 'sizeX': 2, 'sizeY': 2, 'row': 2, 'col': 2, content: '<div class="content">1</div>' },
        { 'sizeX': 2, 'sizeY': 2, 'row': 3, 'col': 4, content: '<div class="content">2</div>' }
    ]
});

dashboard.appendTo('#dashboard_default');

const resetPanels = dashboard.serialize();
resetPanels.forEach((panel, index) => {
    panel.content = `<div class="content">${index}</div>`;
});

const toggleBtn = new Button({
    cssClass: 'e-flat e-primary e-outline',
    content: 'Enable Floating',
    isToggle: true
});
toggleBtn.appendTo('#toggle');

document.getElementById('toggle').addEventListener('click', () => {
    if (toggleBtn.content === 'Disable Floating and Reset') {
        toggleBtn.content = 'Enable Floating';
        dashboard.allowFloating = false;
        dashboard.panels = resetPanels;
    } else {
        toggleBtn.content = 'Disable Floating and Reset';
        dashboard.allowFloating = true;
    }
});
```

### Example 2: Responsive Dashboard

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 6,
    cellSpacing: [15, 15],
    mediaQuery: '(max-width: 768px)',
    allowFloating: true,
    panels: [
        {
            'sizeX': 3,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'header': 'Revenue',
            content: '<div class="chart">Revenue Chart</div>'
        },
        {
            'sizeX': 3,
            'sizeY': 2,
            'row': 0,
            'col': 3,
            'header': 'Users',
            content: '<div class="metric">User Count</div>'
        },
        {
            'sizeX': 3,
            'sizeY': 2,
            'row': 2,
            'col': 0,
            'header': 'Tasks',
            content: '<div class="list">Task List</div>'
        },
        {
            'sizeX': 3,
            'sizeY': 2,
            'row': 2,
            'col': 3,
            'header': 'Analytics',
            content: '<div class="analytics">Analytics Data</div>'
        }
    ]
});

dashboard.appendTo('#dashboard');

// Apply responsive CSS
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        dashboard.columns = 2;
    } else if (window.innerWidth < 1024) {
        dashboard.columns = 3;
    } else {
        dashboard.columns = 6;
    }
});
```

### Example 3: Custom Aspect Ratio

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 8,
    cellSpacing: [20, 20],
    cellAspectRatio: 16 / 9,  // Widescreen cells
    allowFloating: true,
    panels: [
        {
            'sizeX': 4,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'header': 'Main Dashboard',
            content: '<div>Main Content (16:9)</div>'
        },
        {
            'sizeX': 4,
            'sizeY': 2,
            'row': 0,
            'col': 4,
            'header': 'Secondary',
            content: '<div>Secondary Content (16:9)</div>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

### Example 4: RTL Dashboard

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 6,
    enableRtl: true,
    allowFloating: true,
    panels: [
        {
            'sizeX': 2,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'header': 'اللوحة الأولى',
            content: '<div>محتوى اللوحة الأولى</div>'
        },
        {
            'sizeX': 2,
            'sizeY': 2,
            'row': 0,
            'col': 2,
            'header': 'اللوحة الثانية',
            content: '<div>محتوى اللوحة الثانية</div>'
        }
    ]
});

dashboard.appendTo('#dashboard-rtl');
```

## Next Steps

- **Enable persistence**: See [persistence-and-state.md](persistence-and-state.md)
- **Handle events**: See [events-handling.md](events-handling.md)
- **Manage panels**: See [panel-manipulation.md](panel-manipulation.md)
- **Complete API reference**: See [api-reference.md](api-reference.md)

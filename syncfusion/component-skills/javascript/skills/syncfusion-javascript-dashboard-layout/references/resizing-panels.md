# Resizing Panels

## Table of Contents
- [Enable/Disable Resizing](#enabledisable-resizing)
- [Configurable Resize Handles](#configurable-resize-handles)
- [Resize Events](#resize-events)
- [Event Arguments](#event-arguments)
- [Programmatic Resizing](#programmatic-resizing)
- [Examples](#examples)

## Enable/Disable Resizing

### Enable Resizing (Default)

By default, panels can be resized from the south-east corner:

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,  // Enable resizing (default)
    panels: [
        { 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Resize me!</div>' },
        { 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Resize me too!</div>' }
    ]
});

dashboard.appendTo('#dashboard');
```

### Disable Resizing

Prevent users from resizing panels:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: false,  // Disable resizing
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

## Configurable Resize Handles

The `resizableHandles` property defines which directions panels can be resized:

### Available Resize Directions

| Handle | Direction | CSS Class |
|--------|-----------|-----------|
| South-East | ↘ (diagonal) | `e-south-east` |
| South | ↓ (down) | `e-south` |
| East | → (right) | `e-east` |
| West | ← (left) | `e-west` |
| North | ↑ (up) | `e-north` |
| South-West | ↙ (diagonal) | `e-south-west` |
| North-East | ↗ (diagonal) | `e-north-east` |
| North-West | ↖ (diagonal) | `e-north-west` |

### Single Direction (Default)

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,
    resizableHandles: ['e-south-east'],  // Only bottom-right corner
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

### Multiple Directions

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,
    resizableHandles: ['e-south-east', 'e-east', 'e-south'],
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

### All Directions

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,
    resizableHandles: [
        'e-south-east',
        'e-south',
        'e-east',
        'e-west',
        'e-north',
        'e-south-west',
        'e-north-east',
        'e-north-west'
    ],
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

### Practical Example

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 6,
    cellSpacing: [10, 10],
    allowResizing: true,
    resizableHandles: ['e-south-east', 'e-east', 'e-west', 'e-north', 'e-south'],
    panels: [
        {
            'id': 'widget_1',
            'sizeX': 2,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'header': 'Resizable Widget',
            content: '<div>Resize from any edge or corner</div>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

## Resize Events

Resize operations trigger three events during the lifecycle:

### Listening to Resize Events

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,
    
    // Triggered when resize starts
    resizeStart: onResizeStart,
    
    // Triggered continuously while resizing
    resize: onResize,
    
    // Triggered when resize completes
    resizeStop: onResizeStop,
    
    panels: [...]
});

function onResizeStart(args) {
    console.log('Resize started on element:', args.element);
    console.log('Is user interaction:', args.isInteracted);
}

function onResize(args) {
    console.log('Resizing in progress');
    console.log('Current element:', args.element);
    console.log('Panel data:', args.panels);
}

function onResizeStop(args) {
    console.log('Resize completed');
    console.log('Final panel data:', args.panels);
}

dashboard.appendTo('#dashboard');
```

### Programmatic Resize Handling

When using `resizePanel()` method, only `resizeStop` is triggered:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,
    
    resizeStop: (args) => {
        if (!args.isInteracted) {
            console.log('Resize was programmatic');
        } else {
            console.log('Resize was user interaction');
        }
    },
    
    panels: [...]
});
```

## Event Arguments

### ResizeArgs

All three resize events (resizeStart, resize, resizeStop) provide ResizeArgs:

```typescript
resizeStart: (args: ResizeArgs) => {
    console.log(args.element);      // HTMLElement being resized
    console.log(args.event);        // MouseEvent or TouchEvent
    console.log(args.isInteracted); // true if user interaction
    console.log(args.panels);       // Array of modified panel models
}
```

**ResizeArgs Properties:**
- `element`: The DOM element being resized
- `event`: The original mouse or touch event
- `isInteracted`: Boolean indicating user interaction vs programmatic resize
- `panels`: Array of panel models with current dimensions

## Programmatic Resizing

Use the `resizePanel()` method to resize panels programmatically:

### Basic Programmatic Resize

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'panel_1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'panel_2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');

// Resize panel_1 to 3x3
dashboard.resizePanel('panel_1', 3, 3);

// Resize panel_2 to 1x1
dashboard.resizePanel('panel_2', 1, 1);
```

### Resize in Event Handler

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    created: onDashboardCreated,
    panels: [
        { 'id': 'panel_1', 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'panel_2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 1, content: '<div>Panel 2</div>' }
    ]
});

function onDashboardCreated() {
    // Dashboard is created; now resize panels
    this.resizePanel('panel_1', 2, 2);
    this.resizePanel('panel_2', 3, 3);
}

dashboard.appendTo('#dashboard');
```

### Resize with Constraints

Even programmatic resizes respect min/max constraints:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    created: onDashboardCreated,
    panels: [
        {
            'id': 'constrained_panel',
            'sizeX': 2,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'minSizeX': 1,
            'maxSizeX': 3,
            'minSizeY': 1,
            'maxSizeY': 3,
            content: '<div>Resize me (with limits)</div>'
        }
    ]
});

function onDashboardCreated() {
    // This respects min/max constraints
    this.resizePanel('constrained_panel', 5, 5);  // Will be clamped to maxSizeX/Y
}

dashboard.appendTo('#dashboard');
```

## Examples

### Example 1: Basic Resizing with All Directions

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    cellSpacing: [10, 10],
    allowResizing: true,
    resizableHandles: ['e-south-east', 'e-east', 'e-west', 'e-north', 'e-south'],
    
    resizeStart: (args) => {
        console.log('Starting resize on:', args.element.id);
    },
    
    resizeStop: (args) => {
        console.log('Resize complete on:', args.element.id);
        console.log('New dimensions:', args.panels);
    },
    
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');
```

### Example 2: Constrained Resizing

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 6,
    allowResizing: true,
    resizableHandles: ['e-south-east', 'e-east'],
    
    panels: [
        {
            'id': 'small_widget',
            'sizeX': 1,
            'sizeY': 1,
            'row': 0,
            'col': 0,
            'minSizeX': 1,
            'maxSizeX': 2,
            'minSizeY': 1,
            'maxSizeY': 1,
            content: '<div>Small (fixed height)</div>'
        },
        {
            'id': 'large_widget',
            'sizeX': 3,
            'sizeY': 2,
            'row': 0,
            'col': 2,
            'minSizeX': 2,
            'maxSizeX': 4,
            'minSizeY': 1,
            'maxSizeY': 4,
            content: '<div>Large (flexible)</div>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

### Example 3: Programmatic Resize on Button Click

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

let dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'panel_1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Resizable Panel</div>' }
    ]
});

dashboard.appendTo('#dashboard');

// Setup buttons
const expandBtn = new Button({ content: 'Expand' });
expandBtn.appendTo('#expand-btn');

const shrinkBtn = new Button({ content: 'Shrink' });
shrinkBtn.appendTo('#shrink-btn');

// Button click handlers
document.getElementById('expand-btn').addEventListener('click', () => {
    dashboard.resizePanel('panel_1', 4, 4);
});

document.getElementById('shrink-btn').addEventListener('click', () => {
    dashboard.resizePanel('panel_1', 1, 1);
});
```

### Example 4: Resize with Event Logging

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const resizeLog = [];

const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,
    resizableHandles: ['e-south-east', 'e-east', 'e-south'],
    
    resizeStart: (args) => {
        const log = {
            type: 'resizeStart',
            timestamp: new Date(),
            panelId: args.element.id,
            isInteracted: args.isInteracted
        };
        resizeLog.push(log);
        console.log('Resize started:', log);
    },
    
    resize: (args) => {
        console.log('Resizing...', args.panels.length, 'panels affected');
    },
    
    resizeStop: (args) => {
        const log = {
            type: 'resizeStop',
            timestamp: new Date(),
            panelId: args.element.id,
            newDimensions: args.panels.map(p => ({
                id: p.id,
                sizeX: p.sizeX,
                sizeY: p.sizeY
            }))
        };
        resizeLog.push(log);
        console.log('Resize completed:', log);
    },
    
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');

// View resize history
console.log('Full resize history:', resizeLog);
```

### Example 5: Responsive Resize Based on Screen Size

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 6,
    created: onDashboardCreated,
    panels: [
        { 'id': 'main_widget', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Main</div>' },
        { 'id': 'side_widget', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Side</div>' }
    ]
});

function onDashboardCreated() {
    const width = window.innerWidth;
    
    if (width < 768) {
        // Small screens: make panels full-width
        this.resizePanel('main_widget', 6, 2);
        this.resizePanel('side_widget', 6, 2);
    } else if (width < 1024) {
        // Medium screens: half-width panels
        this.resizePanel('main_widget', 3, 2);
        this.resizePanel('side_widget', 3, 2);
    }
}

dashboard.appendTo('#dashboard');

// Handle window resize
window.addEventListener('resize', () => {
    // Could trigger resizePanel calls on resize
});
```

## Next Steps

- **Handle events**: See [events-handling.md](events-handling.md)
- **Add drag and resize together**: See [dragging-and-moving.md](dragging-and-moving.md)
- **Configure panels**: See [panel-configuration.md](panel-configuration.md)
- **Complete API reference**: See [api-reference.md](api-reference.md)

# Dragging and Moving Panels

## Table of Contents
- [Enable/Disable Dragging](#enabledisable-dragging)
- [Customizing Drag Handlers](#customizing-drag-handlers)
- [Drag Events](#drag-events)
- [Panel Collision and Reordering](#panel-collision-and-reordering)
- [Event Arguments](#event-arguments)
- [Examples](#examples)

## Enable/Disable Dragging

### Enable Dragging (Default)

Dragging is enabled by default. When enabled, users can click anywhere on a panel to drag and reorder it:

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,  // Enable dragging (default)
    panels: [
        { 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0, content: '<div>Drag me!</div>' },
        { 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 1, content: '<div>Drag me too!</div>' }
    ]
});

dashboard.appendTo('#dashboard');
```

### Disable Dragging

Prevent users from rearranging panels:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: false,  // Disable dragging
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

## Customizing Drag Handlers

The `draggableHandle` property restricts dragging to specific elements within a panel. This is useful when panels contain interactive content:

### Drag Only from Header

Restrict dragging to the panel header:

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 6,
    allowDragging: true,
    draggableHandle: '.e-panel-header',  // Only header can be dragged
    panels: [
        {
            'id': 'panel_1',
            'sizeX': 3,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'header': '<div class="panel-header">Header - Drag me!</div>',
            content: `
                <div class="panel-body">
                    <input type="text" placeholder="This won't trigger drag">
                    <button>Click me</button>
                </div>
            `
        },
        {
            'id': 'panel_2',
            'sizeX': 3,
            'sizeY': 2,
            'row': 0,
            'col': 3,
            'header': '<div class="panel-header">Drag this header</div>',
            content: '<canvas id="chart"></canvas>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

### Drag from Custom Icon

Use a specific icon or element as drag handler:

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    allowDragging: true,
    draggableHandle: '.drag-icon',  // Only elements with drag-icon class
    panels: [
        {
            'id': 'panel_with_icon',
            'sizeX': 2,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'header': `
                <div class="panel-header">
                    <span class="drag-icon">≡</span>
                    <span class="title">My Widget</span>
                </div>
            `,
            content: '<div>Click the ≡ icon to drag this panel</div>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

### Multiple Drag Handlers

Specify multiple elements that can trigger dragging:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    draggableHandle: '.drag-handle, .panel-title',  // Any element matching selector
    panels: [...]
});
```

## Drag Events

Drag events are triggered at different stages of a drag operation:

### Listening to Drag Events

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    
    // Triggered when drag starts
    dragStart: onDragStart,
    
    // Triggered continuously while dragging
    drag: onDrag,
    
    // Triggered when drag completes
    dragStop: onDragStop,
    
    panels: [...]
});

function onDragStart(args) {
    console.log('Drag started on element:', args.element);
    console.log('Panel ID:', args.element.id);
}

function onDrag(args) {
    console.log('Dragging in progress');
    console.log('Element:', args.element);
    console.log('Target below:', args.target);
}

function onDragStop(args) {
    console.log('Drag completed');
    console.log('Modified panels:', args.panels);
}

dashboard.appendTo('#dashboard');
```

### Preventing Drag Operations

Cancel a drag operation before it starts:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    
    dragStart: (args) => {
        // Prevent dragging if panel has certain class
        if (args.element.classList.contains('locked')) {
            args.cancel = true;  // Cancel the drag operation
            console.log('This panel is locked');
        }
    },
    
    panels: [
        {
            'id': 'locked_panel',
            'sizeX': 2,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'cssClass': 'locked',
            content: '<div>Cannot drag this panel</div>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

## Panel Collision and Reordering

When dragging a panel, if it collides with other panels, those panels are automatically pushed to make space:

### Automatic Panel Pushing

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    cellSpacing: [10, 10],
    allowDragging: true,
    allowFloating: false,  // Panels don't float up
    panels: [
        {
            'id': 'panel_0',
            'sizeX': 1,
            'sizeY': 1,
            'row': 0,
            'col': 0,
            content: '<div class="content">0</div>'
        },
        {
            'id': 'panel_1',
            'sizeX': 3,
            'sizeY': 2,
            'row': 0,
            'col': 1,
            content: '<div class="content">1</div>'
        },
        {
            'id': 'panel_2',
            'sizeX': 1,
            'sizeY': 3,
            'row': 0,
            'col': 4,
            content: '<div class="content">2</div>'
        }
    ],
    
    // Track panel changes after drag
    dragStop: (args) => {
        console.log('New panel positions:', args.panels.map(p => ({
            id: p.id,
            row: p.row,
            col: p.col
        })));
    }
});

dashboard.appendTo('#dashboard');
```

### With Floating Enabled

When `allowFloating` is true, panels automatically move up to fill empty spaces:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    allowFloating: true,  // Panels float to fill gaps
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

## Event Arguments

### DragStartArgs

Fired when a drag operation begins:

```typescript
dragStart: (args: DragStartArgs) => {
    console.log(args.element);    // HTMLElement being dragged
    console.log(args.event);      // MouseEvent or TouchEvent
    console.log(args.cancel);     // Set to true to cancel drag
}
```

### DraggedEventArgs

Fired continuously during dragging:

```typescript
drag: (args: DraggedEventArgs) => {
    console.log(args.element);    // HTMLElement being dragged
    console.log(args.target);     // HTMLElement below current position
    console.log(args.event);      // MouseEvent or TouchEvent
}
```

### DragStopArgs

Fired when drag completes:

```typescript
dragStop: (args: DragStopArgs) => {
    console.log(args.element);    // HTMLElement that was dragged
    console.log(args.target);     // Drop target HTMLElement
    console.log(args.event);      // MouseEvent or TouchEvent
    console.log(args.panels);     // Array of modified panel models
    console.log(args.cancel);     // Set to true to cancel drop
}
```

## Examples

### Example 1: Basic Dragging with Events

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    cellSpacing: [10, 10],
    allowDragging: true,
    
    dragStart: (args) => {
        console.log(`Started dragging panel: ${args.element.id}`);
        args.element.style.opacity = '0.7';
    },
    
    drag: (args) => {
        // Could update UI indicators here
    },
    
    dragStop: (args) => {
        console.log(`Dropped panel: ${args.element.id}`);
        args.element.style.opacity = '1';
        console.log('New layout:', args.panels);
    },
    
    panels: [
        { 'id': 'p1', 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0, content: '<div>1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 1, content: '<div>2</div>' },
        { 'id': 'p3', 'sizeX': 1, 'sizeY': 1, 'row': 1, 'col': 0, content: '<div>3</div>' }
    ]
});

dashboard.appendTo('#dashboard');
```

### Example 2: Restricted Dragging with Custom Handles

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 6,
    allowDragging: true,
    draggableHandle: '.drag-handle',
    
    panels: [
        {
            'id': 'chart_panel',
            'sizeX': 3,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'header': `
                <div class="panel-header">
                    <span class="drag-handle">◉◉◉</span>
                    <h4>Sales Chart</h4>
                    <button class="close-btn">×</button>
                </div>
            `,
            content: '<canvas id="chart"></canvas>'
        },
        {
            'id': 'data_panel',
            'sizeX': 3,
            'sizeY': 2,
            'row': 0,
            'col': 3,
            'header': `
                <div class="panel-header">
                    <span class="drag-handle">◉◉◉</span>
                    <h4>Data Table</h4>
                </div>
            `,
            content: '<table id="data-table"></table>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

### Example 3: Preventing Drag on Specific Panels

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    
    dragStart: (args) => {
        // List of panels that should not be dragged
        const lockedPanels = ['header_panel', 'footer_panel'];
        
        if (lockedPanels.includes(args.element.id)) {
            args.cancel = true;
        }
    },
    
    panels: [
        {
            'id': 'header_panel',
            'sizeX': 5,
            'sizeY': 1,
            'row': 0,
            'col': 0,
            'cssClass': 'locked',
            content: '<h2>Dashboard Header</h2>'
        },
        {
            'id': 'widget_1',
            'sizeX': 2,
            'sizeY': 2,
            'row': 1,
            'col': 0,
            content: '<div>Draggable Widget</div>'
        }
    ]
});

dashboard.appendTo('#dashboard');
```

### Example 4: Drag with Floating Enabled

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    cellSpacing: [10, 10],
    allowDragging: true,
    allowFloating: true,  // Enable floating
    
    dragStop: (args) => {
        // Log all panel positions after floating adjustment
        console.log('Panels after floating:');
        args.panels.forEach(panel => {
            console.log(`${panel.id}: row ${panel.row}, col ${panel.col}`);
        });
    },
    
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 1, 'col': 0, content: '<div>1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 2, 'col': 2, content: '<div>2</div>' },
        { 'id': 'p3', 'sizeX': 2, 'sizeY': 2, 'row': 3, 'col': 4, content: '<div>3</div>' }
    ]
});

dashboard.appendTo('#dashboard');
```

## Next Steps

- **Configure resizing**: See [resizing-panels.md](resizing-panels.md)
- **Handle all events**: See [events-handling.md](events-handling.md)
- **Manage panels dynamically**: See [panel-manipulation.md](panel-manipulation.md)
- **Complete API reference**: See [api-reference.md](api-reference.md)

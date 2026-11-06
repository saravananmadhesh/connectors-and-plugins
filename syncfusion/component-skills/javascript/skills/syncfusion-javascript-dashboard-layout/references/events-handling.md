# Events Handling

## Table of Contents
- [Lifecycle Events](#lifecycle-events)
- [Drag Events](#drag-events)
- [Resize Events](#resize-events)
- [Change Event](#change-event)
- [Event Arguments Reference](#event-arguments-reference)
- [Examples](#examples)

## Lifecycle Events

Lifecycle events are triggered when the DashboardLayout component is created or destroyed:

### Created Event

Triggered when the DashboardLayout is created and initialized:

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    
    created: onDashboardCreated,
    
    panels: [...]
});

function onDashboardCreated() {
    console.log('Dashboard has been created and initialized');
    // Perform initialization tasks here
}

dashboard.appendTo('#dashboard');
```

### Destroyed Event

Triggered when the DashboardLayout is destroyed:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    
    destroyed: onDashboardDestroyed,
    
    panels: [...]
});

function onDashboardDestroyed() {
    console.log('Dashboard has been destroyed');
    // Cleanup code here
}

dashboard.appendTo('#dashboard');

// Later: Destroy dashboard
dashboard.destroy();
```

## Drag Events

Three events are triggered during a drag operation: dragStart, drag, and dragStop.

### DragStart Event

Triggered when a user begins dragging a panel:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    
    dragStart: (args) => {
        console.log('Drag started');
        console.log('Element:', args.element);
        console.log('Panel ID:', args.element.id);
        
        // Cancel drag if needed
        if (args.element.classList.contains('locked')) {
            args.cancel = true;
        }
    },
    
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

### Drag Event

Triggered continuously while dragging:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    
    drag: (args) => {
        console.log('Dragging...');
        console.log('Element:', args.element);
        console.log('Target:', args.target);
    },
    
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

### DragStop Event

Triggered when the drag operation completes:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    
    dragStop: (args) => {
        console.log('Drag completed');
        console.log('Modified panels:', args.panels);
        
        // Can cancel drop if needed
        if (someCondition) {
            args.cancel = true;
        }
    },
    
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

## Resize Events

Three events are triggered during a resize operation: resizeStart, resize, and resizeStop.

### ResizeStart Event

Triggered when a user begins resizing a panel:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,
    
    resizeStart: (args) => {
        console.log('Resize started');
        console.log('Element:', args.element);
        console.log('Is user interaction:', args.isInteracted);
    },
    
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

### Resize Event

Triggered continuously while resizing:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,
    
    resize: (args) => {
        console.log('Resizing...');
        console.log('Current panels:', args.panels);
    },
    
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

### ResizeStop Event

Triggered when the resize operation completes:

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,
    
    resizeStop: (args) => {
        console.log('Resize completed');
        console.log('Final panel dimensions:', args.panels);
        console.log('Was user interaction:', args.isInteracted);
    },
    
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

## Change Event

Triggered whenever panel positions are changed (due to drag, resize, or programmatic updates):

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    
    change: (args) => {
        console.log('Panel positions changed');
        // Update other UI elements based on new layout
    },
    
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

## Event Arguments Reference

### DragStartArgs

```typescript
interface DragStartArgs {
    element: HTMLElement;      // Panel element being dragged
    event: MouseEvent | TouchEvent;  // Original mouse/touch event
    cancel: boolean;           // Set to true to cancel drag
}
```

### DraggedEventArgs

```typescript
interface DraggedEventArgs {
    element: HTMLElement;      // Panel element being dragged
    target: HTMLElement;       // Element below drag position
    event: MouseEvent | TouchEvent;  // Original mouse/touch event
}
```

### DragStopArgs

```typescript
interface DragStopArgs {
    element: HTMLElement;      // Panel element that was dragged
    target: HTMLElement;       // Drop target element
    event: MouseEvent | TouchEvent;  // Original mouse/touch event
    panels: PanelModel[];      // Array of modified panels
    cancel: boolean;           // Set to true to cancel drop
}
```

### ResizeArgs

```typescript
interface ResizeArgs {
    element: HTMLElement;      // Panel element being resized
    event: MouseEvent | TouchEvent;  // Original mouse/touch event
    isInteracted: boolean;     // true = user, false = programmatic
    panels: PanelModel[];      // Array of modified panels
}
```

### ChangeEventArgs

```typescript
interface ChangeEventArgs {
    addedPanels: PanelModel[];        // Panels newly added to the layout
    changedPanels: PanelModel[];      // Panels with changed positions
    removedPanels: PanelModel[];      // Panels removed from the layout
    isInteracted: boolean;            // true if triggered by user action, false if programmatic
}
```

The `change` event provides detailed information about what changed in the layout, making it easy to track additions, removals, and repositioning.

## Examples

### Example 1: Complete Event Handling

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    allowResizing: true,
    
    created: () => {
        console.log('✓ Dashboard created');
    },
    
    dragStart: (args) => {
        console.log('→ Drag started:', args.element.id);
    },
    
    drag: (args) => {
        console.log('→ Dragging:', args.element.id);
    },
    
    dragStop: (args) => {
        console.log('✓ Drag stopped:', args.element.id);
        args.panels.forEach(p => {
            console.log(`  ${p.id}: row ${p.row}, col ${p.col}`);
        });
    },
    
    resizeStart: (args) => {
        console.log('→ Resize started:', args.element.id);
    },
    
    resize: (args) => {
        console.log('→ Resizing:', args.element.id);
    },
    
    resizeStop: (args) => {
        console.log('✓ Resize stopped:', args.element.id);
        args.panels.forEach(p => {
            console.log(`  ${p.id}: ${p.sizeX}x${p.sizeY}`);
        });
    },
    
    change: (args) => {
        console.log('⟳ Layout changed');
    },
    
    destroyed: () => {
        console.log('✗ Dashboard destroyed');
    },
    
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');
```

### Example 2: Prevent Locked Panels from Dragging

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    
    dragStart: (args) => {
        const panelId = args.element.id;
        const lockedPanels = ['header_panel', 'footer_panel'];
        
        if (lockedPanels.includes(panelId)) {
            args.cancel = true;
            console.log(`Panel ${panelId} is locked and cannot be dragged`);
        }
    },
    
    panels: [
        {
            'id': 'header_panel',
            'sizeX': 5,
            'sizeY': 1,
            'row': 0,
            'col': 0,
            'cssClass': 'locked-panel',
            content: '<h2>Dashboard Header (Locked)</h2>'
        },
        {
            'id': 'widget_panel',
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

### Example 3: Limit Maximum Panel Size

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const MAX_SIZE = 5;

const dashboard = new DashboardLayout({
    columns: 6,
    allowResizing: true,
    
    resizeStop: (args) => {
        args.panels.forEach(panel => {
            if (panel.sizeX > MAX_SIZE || panel.sizeY > MAX_SIZE) {
                // Revert to previous size
                args.cancel = true;
                console.log(`Panel exceeded max size of ${MAX_SIZE}x${MAX_SIZE}`);
            }
        });
    },
    
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

### Example 4: Log Layout Changes

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const layoutHistory = [];

const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    allowResizing: true,
    
    dragStop: (args) => {
        logLayoutChange('drag', args.panels);
    },
    
    resizeStop: (args) => {
        logLayoutChange('resize', args.panels);
    },
    
    change: (args) => {
        // Could also track change events
    },
    
    panels: [...]
});

function logLayoutChange(type, panels) {
    const entry = {
        timestamp: new Date().toISOString(),
        type: type,
        layout: panels.map(p => ({
            id: p.id,
            row: p.row,
            col: p.col,
            sizeX: p.sizeX,
            sizeY: p.sizeY
        }))
    };
    
    layoutHistory.push(entry);
    console.log('Layout history:', layoutHistory);
}

dashboard.appendTo('#dashboard');
```

### Example 5: Programmatic Resize Indicator

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    allowResizing: true,
    
    resizeStart: (args) => {
        if (!args.isInteracted) {
            console.log('Resize started programmatically');
            args.element.style.opacity = '0.8';
        } else {
            console.log('Resize started by user');
        }
    },
    
    resizeStop: (args) => {
        console.log('Resize interaction:', args.isInteracted ? 'User' : 'Programmatic');
        args.element.style.opacity = '1';
    },
    
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

### Example 6: Auto-Save on Changes

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const STORAGE_KEY = 'dashboardAutoSave';
let autoSaveTimeout = null;

const dashboard = new DashboardLayout({
    columns: 5,
    allowDragging: true,
    allowResizing: true,
    
    dragStop: (args) => {
        scheduleAutoSave();
    },
    
    resizeStop: (args) => {
        scheduleAutoSave();
    },
    
    panels: [...]
});

function scheduleAutoSave() {
    // Cancel previous timeout
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
    
    // Auto-save after 2 seconds of inactivity
    autoSaveTimeout = setTimeout(() => {
        const layout = dashboard.serialize();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
        console.log('Layout auto-saved to localStorage');
    }, 2000);
}

dashboard.appendTo('#dashboard');
```

### Example 7: Tracking Layout Changes with ChangeEventArgs

Track exactly what changed in the dashboard using `ChangeEventArgs`:

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 6,
    allowDragging: true,
    allowResizing: true,
    panels: [
        { 'id': 'sales', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, header: 'Sales', content: '<div>Sales Chart</div>' },
        { 'id': 'revenue', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, header: 'Revenue', content: '<div>Revenue Chart</div>' }
    ],
    change: (args: ChangeEventArgs) => {
        console.log('=== Layout Change Detected ===');
        
        // Track additions
        if (args.addedPanels && args.addedPanels.length > 0) {
            console.log('✓ Added panels:');
            args.addedPanels.forEach(panel => {
                console.log(`  - ${panel.id} at (${panel.row}, ${panel.col})`);
            });
        }
        
        // Track repositioning
        if (args.changedPanels && args.changedPanels.length > 0) {
            console.log('→ Repositioned panels:');
            args.changedPanels.forEach(panel => {
                console.log(`  - ${panel.id} → (${panel.row}, ${panel.col}) [${panel.sizeX}x${panel.sizeY}]`);
            });
        }
        
        // Track removals
        if (args.removedPanels && args.removedPanels.length > 0) {
            console.log('✗ Removed panels:');
            args.removedPanels.forEach(panel => {
                console.log(`  - ${panel.id}`);
            });
        }
        
        // Determine interaction type
        const source = args.isInteracted ? '(User Action)' : '(Programmatic)';
        console.log(`Source: ${source}`);
        console.log('');
    }
});

dashboard.appendTo('#dashboard');

// Add button for testing
const addBtn = new Button({ content: 'Add Widget' });
addBtn.appendTo('#add-btn');

let counter = 3;
document.getElementById('add-btn').addEventListener('click', () => {
    // Adding panel triggers 'change' event
    dashboard.addPanel({
        'id': `widget_${counter}`,
        'sizeX': 2,
        'sizeY': 2,
        'row': 2,
        'col': 0,
        header: `Widget ${counter}`,
        content: `<div>Widget ${counter}</div>`
    });
    counter++;
});

// Move button for testing
const moveBtn = new Button({ content: 'Move First Panel' });
moveBtn.appendTo('#move-btn');

document.getElementById('move-btn').addEventListener('click', () => {
    // Moving panel triggers 'change' event
    dashboard.movePanel('sales', 2, 2);
});
```

**Output:**
```
=== Layout Change Detected ===
✓ Added panels:
  - widget_3 at (2, 0)
Source: (User Action)

=== Layout Change Detected ===
→ Repositioned panels:
  - sales → (2, 2) [2x2]
Source: (User Action)
```

---

## Next Steps

- **Handle all interactions**: See [dragging-and-moving.md](dragging-and-moving.md) and [resizing-panels.md](resizing-panels.md)
- **Save state**: See [persistence-and-state.md](persistence-and-state.md)
- **Complete API reference**: See [api-reference.md](api-reference.md)

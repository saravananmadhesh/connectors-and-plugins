# Complete API Reference

## Table of Contents
- [DashboardLayout Properties](#dashboardlayout-properties)
- [Panel Properties](#panel-properties)
- [Methods](#methods)
- [Events](#events)
- [Event Arguments](#event-arguments)
- [Enumerations](#enumerations)
- [Cross-Reference Guide](#cross-reference-guide)

---

## DashboardLayout Properties

### allowDragging

**Type:** `boolean` | **Default:** `true`

Enable or disable panel dragging and reordering.

```typescript
const dashboard = new DashboardLayout({
    allowDragging: true,  // Users can drag panels
    panels: [...]
});
```

---

### allowFloating

**Type:** `boolean` | **Default:** `false`

Enable automatic floating of panels upward to fill empty grid cells.

```typescript
const dashboard = new DashboardLayout({
    allowFloating: true,
    panels: [...]
});
```

---

### allowResizing

**Type:** `boolean` | **Default:** `true`

Enable or disable panel resizing with handles.

```typescript
const dashboard = new DashboardLayout({
    allowResizing: true,
    resizableHandles: ['e-south-east'],
    panels: [...]
});
```

---

### cellAspectRatio

**Type:** `number` | **Default:** `1`

Define the width-to-height ratio of grid cells.

```typescript
// Square cells (1:1)
cellAspectRatio: 1

// Widescreen cells (16:9)
cellAspectRatio: 16 / 9

// Tall cells (2:3)
cellAspectRatio: 2 / 3
```

---

### cellSpacing

**Type:** `number[]` | **Default:** `[20, 20]`

Define spacing between panels: `[horizontal, vertical]` in pixels.

```typescript
const dashboard = new DashboardLayout({
    cellSpacing: [10, 10],  // 10px horizontal, 10px vertical
    panels: [...]
});
```

---

### columns

**Type:** `number` | **Default:** `12`

Define the total number of grid columns.

```typescript
const dashboard = new DashboardLayout({
    columns: 6,  // 6-column layout
    panels: [...]
});
```

Panel `col` values must be between 0 and `columns - 1`.

---

### draggableHandle

**Type:** `string` | **Default:** `undefined`

CSS selector for elements that trigger dragging (e.g., '.e-panel-header').

```typescript
draggableHandle: '.e-panel-header'  // Drag only from header
```

---

### enableHtmlSanitizer

**Type:** `boolean` | **Default:** `true`

Enable/disable HTML sanitization for security. Recommended: `true`.

---

### enablePersistence

**Type:** `boolean` | **Default:** `false`

Enable automatic state persistence to browser localStorage.

```typescript
const dashboard = new DashboardLayout({
    enablePersistence: true,  // Auto-save/restore state
    panels: [...]
});
```

When `true`, panel positions and sizes are saved after reload.

---

### enableRtl

**Type:** `boolean` | **Default:** `false`

Enable right-to-left (RTL) layout for RTL languages.

```typescript
const dashboard = new DashboardLayout({
    enableRtl: true,  // RTL layout
    panels: [...]
});
```

---

### mediaQuery

**Type:** `string` | **Default:** `undefined`

CSS media query for responsive stacking (e.g., `'(max-width: 768px)'`).

```typescript
mediaQuery: '(max-width: 768px)'  // Stack on small screens
```

---

### panels

**Type:** `PanelModel[]` | **Default:** `[]`

Array of panel configuration objects.

```typescript
const dashboard = new DashboardLayout({
    panels: [
        {
            'id': 'panel_1',
            'sizeX': 2,
            'sizeY': 2,
            'row': 0,
            'col': 0,
            'header': 'Panel 1',
            content: '<div>Content</div>'
        }
    ]
});
```

See [Panel Properties](#panel-properties) for detailed panel configuration.

---

### resizableHandles

**Type:** `string[]` | **Default:** `['e-south-east']`

Array of resize handle directions: `'e-south-east'`, `'e-south'`, `'e-east'`, `'e-west'`, `'e-north'`, `'e-south-west'`, `'e-north-east'`, `'e-north-west'`.

```typescript
resizableHandles: ['e-south-east', 'e-east', 'e-south']
```

---

### showGridLines

**Type:** `boolean` | **Default:** `false`

Show grid guide lines for design and layout visualization.

---

## Panel Properties

### id

**Type:** `string`

Unique identifier for the panel. Required for programmatic access.

```typescript
{
    'id': 'my_panel',
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 0,
    content: '<div>Panel content</div>'
}
```

---

### row

**Type:** `number` | **Default:** `0`

Starting row position (0-indexed).

```typescript
{
    'row': 0,  // First row
    'col': 0,
    'sizeX': 2,
    'sizeY': 2,
    content: '<div>Content</div>'
}
```

---

### col

**Type:** `number` | **Default:** `0`

Starting column position (0-indexed). Must be `< columns`.

---

### sizeX

**Type:** `number` | **Default:** `1`

Panel width in grid cells. Maximum limited by `columns - col`.

---

### sizeY

**Type:** `number` | **Default:** `1`

Panel height in grid cells.

---

### header

**Type:** `string | HTMLElement | Function` | **Default:** `undefined`

Panel header content. Example: `header: '<h4>Panel Title</h4>'`

---

### content

**Type:** `string | HTMLElement | Function` | **Default:** `''`

Panel body content. Example: `content: '<div>Panel Content</div>'`

---

### cssClass

**Type:** `string` | **Default:** `''`

CSS class(es) to apply to panel element. Example: `cssClass: 'premium-panel'`

---

### enabled

**Type:** `boolean` | **Default:** `true`

Enable or disable the panel (non-interactive when false).

---

### minSizeX

**Type:** `number` | **Default:** `undefined`

Minimum width in cells when resizing. Example: `minSizeX: 1`

---

### maxSizeX

**Type:** `number` | **Default:** `undefined`

Maximum width in cells when resizing. Example: `maxSizeX: 4`

---

### minSizeY

**Type:** `number` | **Default:** `undefined`

Minimum height in cells when resizing. Example: `minSizeY: 1`

---

### maxSizeY

**Type:** `number` | **Default:** `undefined`

Maximum height in cells when resizing. Example: `maxSizeY: 3`

---

### zIndex

**Type:** `number` | **Default:** `undefined`

Stacking order (z-index) of the panel. Higher values appear on top.

---

## Methods

### appendChild(selector)

Appends the control to the specified HTML element.

**Parameters:**
- `selector` (string | HTMLElement, optional): Target element selector or element

**Returns:** void

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [...]
});

dashboard.appendTo('#dashboard_container');
// Or: dashboard.appendTo(document.getElementById('dashboard_container'));
```

---

### addPanel(panel)

Add a new panel to the dashboard layout.

**Parameters:**
- `panel` (PanelModel): Panel configuration object

**Returns:** void

**See also:** [Panel Manipulation](./panel-manipulation.md) for detailed examples with UI controls

```typescript
dashboard.addPanel({
    'id': 'new_panel',
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 0,
    content: '<div>New Panel</div>'
});
```

---

### removePanel(id)

Remove a panel by its ID.

**Parameters:**
- `id` (string): Panel identifier

**Returns:** void

**See also:** [Panel Manipulation](./panel-manipulation.md) for detailed examples

```typescript
dashboard.removePanel('panel_1');
```

---

### removeAll()

Remove all panels from the dashboard.

**Parameters:** None

**Returns:** void

**See also:** [Panel Manipulation](./panel-manipulation.md) for detailed examples

```typescript
dashboard.removeAll();
```

---

### serialize()

Return the current panel configuration array.

**Parameters:** None

**Returns:** PanelModel[]

**See also:** [Persistence and State](./persistence-and-state.md) for save/restore patterns

```typescript
const layout = dashboard.serialize();
localStorage.setItem('dashboardLayout', JSON.stringify(layout));
```

---

### movePanel(id, row, col)

Move a panel to a specific position.

**Parameters:**
- `id` (string): Panel identifier
- `row` (number): Target row position (0-indexed)
- `col` (number): Target column position (0-indexed)

**Returns:** void

**See also:** [Moving Panels Programmatically](./moving-panels.md) for priority-based arrangements and layout restoration

```typescript
dashboard.movePanel('panel_1', 2, 1);
```

---

### updatePanel(panel)

Update an existing panel configuration.

**Parameters:**
- `panel` (PanelModel): Updated panel configuration

**Returns:** void

```typescript
dashboard.updatePanel({
    'id': 'panel_1',
    'sizeX': 3,
    'sizeY': 3,
    header: 'Updated Header',
    content: '<div>Updated Content</div>'
});
```

---

### resizePanel(id, sizeX, sizeY)

Resize a panel to specified dimensions.

**Parameters:**
- `id` (string): Panel identifier
- `sizeX` (number): New width in grid cells
- `sizeY` (number): New height in grid cells

**Returns:** void

**See also:** [Resizing Panels](./resizing-panels.md) for constrained resizing and event handling

```typescript
dashboard.resizePanel('panel_1', 3, 4);
```

---

### dataBind()

Apply pending property changes to the component.

**Parameters:** None

**Returns:** void

```typescript
dashboard.panels = [newPanel1, newPanel2];
dashboard.dataBind();  // Apply changes
```

---

### refresh()

Refresh the dashboard layout.

**Parameters:** None

**Returns:** void

```typescript
dashboard.refresh();  // Recompute layout after external changes
```

---

### destroy()

Destroy the DashboardLayout component and cleanup resources.

**Parameters:** None

**Returns:** void

```typescript
dashboard.destroy();
```

---

### getRootElement()

Get the root HTML element of the component.

**Parameters:** None

**Returns:** HTMLElement

```typescript
const rootElement = dashboard.getRootElement();
```

---

### addEventListener(eventName, handler)

Add an event listener to the component.

**Parameters:**
- `eventName` (string): Event name to listen to
- `handler` (Function): Event handler function

**Returns:** void

```typescript
dashboard.addEventListener('change', () => {
    console.log('Layout changed');
});
```

---

### removeEventListener(eventName, handler)

Remove an event listener from the component.

**Parameters:**
- `eventName` (string): Event name
- `handler` (Function): Event handler to remove

**Returns:** void

```typescript
const handler = () => console.log('Layout changed');
dashboard.removeEventListener('change', handler);
```

---

### refreshDraggableHandle()

Update the draggable handle configuration (useful after dynamically modifying the DOM).

**Parameters:** None

**Returns:** void

```typescript
// After dynamically adding elements with draggable handles
dashboard.refreshDraggableHandle();
```

---

### Inject(moduleList)

Dynamically inject required modules into the component.

**Parameters:**
- `moduleList` (Function[]): Array of module constructors

**Returns:** void

```typescript
import { Inject } from '@syncfusion/ej2-layouts';

DashboardLayout.Inject([Inject]);
```

---

## Events

### created

**Type:** `EmitType<Object>`

Fired when DashboardLayout is created.

```typescript
const dashboard = new DashboardLayout({
    created: () => {
        console.log('Dashboard created');
    },
    panels: [...]
});
```

---

### destroyed

**Type:** `EmitType<Object>`

Fired when DashboardLayout is destroyed.

```typescript
const dashboard = new DashboardLayout({
    destroyed: () => {
        console.log('Dashboard destroyed');
    },
    panels: [...]
});

dashboard.destroy();  // Triggers destroyed event
```

---

### dragStart

**Type:** `EmitType<DragStartArgs>`

Fired when panel drag starts.

```typescript
const dashboard = new DashboardLayout({
    dragStart: (args: DragStartArgs) => {
        console.log('Drag started:', args.element.id);
        if (shouldPreventDrag(args.element)) {
            args.cancel = true;
        }
    },
    panels: [...]
});
```

---

### drag

**Type:** `EmitType<DraggedEventArgs>`

Fired continuously during dragging.

```typescript
const dashboard = new DashboardLayout({
    drag: (args: DraggedEventArgs) => {
        console.log('Dragging:', args.element.id);
    },
    panels: [...]
});
```

---

### dragStop

**Type:** `EmitType<DragStopArgs>`

Fired when drag completes.

```typescript
const dashboard = new DashboardLayout({
    dragStop: (args: DragStopArgs) => {
        console.log('Drag stopped:', args.element.id);
        console.log('Modified panels:', args.panels);
    },
    panels: [...]
});
```

---

### resizeStart

**Type:** `EmitType<ResizeArgs>`

Fired when panel resize starts.

```typescript
const dashboard = new DashboardLayout({
    resizeStart: (args: ResizeArgs) => {
        console.log('Resize started:', args.element.id);
        console.log('Is user interaction:', args.isInteracted);
    },
    panels: [...]
});
```

---

### resize

**Type:** `EmitType<ResizeArgs>`

Fired continuously during resizing.

```typescript
const dashboard = new DashboardLayout({
    resize: (args: ResizeArgs) => {
        console.log('Resizing:', args.element.id);
    },
    panels: [...]
});
```

---

### resizeStop

**Type:** `EmitType<ResizeArgs>`

Fired when resize completes.

```typescript
const dashboard = new DashboardLayout({
    resizeStop: (args: ResizeArgs) => {
        console.log('Resize stopped:', args.element.id);
        console.log('New dimensions:', args.panels);
    },
    panels: [...]
});
```

---

### change

**Type:** `EmitType<ChangeEventArgs>`

Fired when panel positions change.

```typescript
const dashboard = new DashboardLayout({
    change: (args: ChangeEventArgs) => {
        console.log('Layout changed');
    },
    panels: [...]
});
```

---

## Event Arguments

### DragStartArgs

Argument for `dragStart` event, fired when drag begins.

```typescript
{
    element: HTMLElement;           // Panel being dragged
    event: MouseEvent | TouchEvent;  // Original mouse or touch event
    cancel: boolean;                // Set to true to cancel drag operation
}
```

**Example:** [Dragging and Moving Panels](./dragging-and-moving.md) - Preventing specific panels from dragging

---

### DraggedEventArgs

Argument for `drag` event, fired continuously during dragging.

```typescript
{
    element: HTMLElement;           // Panel being dragged
    target: HTMLElement;            // Element below current drag position
    event: MouseEvent | TouchEvent;  // Original mouse or touch event
}
```

**Example:** [Dragging and Moving Panels](./dragging-and-moving.md) - Logging drag position

---

### DragStopArgs

Argument for `dragStop` event, fired when drag completes.

```typescript
{
    element: HTMLElement;           // Panel that was dragged
    target: HTMLElement;            // Drop target element
    event: MouseEvent | TouchEvent;  // Original mouse or touch event
    panels: PanelModel[];           // Updated panels array after drag
    cancel: boolean;                // Set to true to cancel drag operation
}
```

**Example:** [Dragging and Moving Panels](./dragging-and-moving.md) - Handling drag completion

---

### ResizeArgs

Argument for `resizeStart`, `resize`, and `resizeStop` events.

```typescript
{
    element: HTMLElement;           // Panel being resized
    event: MouseEvent | TouchEvent;  // Original mouse or touch event
    isInteracted: boolean;          // true for user interaction, false for programmatic
    panels: PanelModel[];           // Updated panels array after resize
}
```

**Example:** [Resizing Panels](./resizing-panels.md) - Constraining resize operations

---

### ChangeEventArgs

Argument for `change` event, fired when panel positions or layout changes.

```typescript
interface ChangeEventArgs {
    addedPanels: PanelModel[];        // Panels added to the layout
    changedPanels: PanelModel[];      // Panels with changed positions
    removedPanels: PanelModel[];      // Panels removed from the layout
    isInteracted: boolean;            // true if triggered by user interaction
}
```

**Example:** [Events Handling](./events-handling.md) - Responding to layout changes

```typescript
const dashboard = new DashboardLayout({
    change: (args: ChangeEventArgs) => {
        console.log('Layout changed');
        
        if (args.addedPanels?.length) {
            console.log('Added panels:', args.addedPanels);
        }
        if (args.changedPanels?.length) {
            console.log('Changed panels:', args.changedPanels);
        }
        if (args.removedPanels?.length) {
            console.log('Removed panels:', args.removedPanels);
        }
        console.log('User interaction:', args.isInteracted);
    },
    panels: [...]
});
```

---

## Enumerations

### Resize Handle Directions

Available values for `resizableHandles`:

- `'e-south-east'` - Bottom-right corner (↘)
- `'e-south'` - Bottom edge (↓)
- `'e-east'` - Right edge (→)
- `'e-west'` - Left edge (←)
- `'e-north'` - Top edge (↑)
- `'e-south-west'` - Bottom-left corner (↙)
- `'e-north-east'` - Top-right corner (↗)
- `'e-north-west'` - Top-left corner (↖)

---

## Cross-Reference Guide

For detailed examples and practical implementations, refer to these reference guides:

### Core Setup & Configuration
- **[Getting Started](./getting-started.md)** - Installation, setup, and first application
- **[Panel Configuration](./panel-configuration.md)** - Panel properties and positioning

### User Interactions
- **[Dragging and Moving Panels](./dragging-and-moving.md)** - Drag events and custom handlers
- **[Moving Panels Programmatically](./moving-panels.md)** - movePanel() method, layout reorganization
- **[Resizing Panels](./resizing-panels.md)** - Resize operations and constraints

### Panel Management
- **[Dynamic Panel Management](./panel-manipulation.md)** - addPanel(), removePanel(), updatePanel()

### Advanced Features
- **[Floating and Responsive Design](./floating-and-responsive.md)** - allowFloating, mediaQuery, responsive layouts
- **[Persistence and State](./persistence-and-state.md)** - serialize(), save/restore, localStorage
- **[Events Handling](./events-handling.md)** - All event types and event arguments

---

## Best Practices

1. **Always use panel IDs**: Makes referencing and updating panels easier
2. **Set min/max sizes**: Prevents unusable layouts after user resizing
   - Use `minSizeX`, `maxSizeX`, `minSizeY`, `maxSizeY`
3. **Use enablePersistence**: Automatically saves user layout preferences to localStorage
4. **Handle change event**: Respond to layout modifications
5. **Sanitize user content**: Keep `enableHtmlSanitizer: true` for security
6. **Test responsive layouts**: Use `mediaQuery` for mobile/tablet scenarios
7. **Optimize performance**: Limit panel count (< 50 for smooth performance)
8. **Use CSS classes**: Apply consistent styling with `cssClass` property
9. **Consider accessibility**: Use descriptive headers and ARIA labels
10. **Call refresh()**: After external DOM modifications, refresh the layout
11. **Use appendTo() correctly**: Ensure target element exists before appending
12. **Listen to lifecycle events**: Use `created` and `destroyed` events for cleanup

# Resizing and Floating Panels

## Table of Contents
- [Overview](#overview)
- [Enabling Resizing](#enabling-resizing)
- [Resize Events](#resize-events)
- [Event Arguments Reference](#event-arguments-reference)
- [Programmatic Resizing](#programmatic-resizing)
- [Size Constraints](#size-constraints)
- [Floating Behavior](#floating-behavior)
- [Advanced Examples](#advanced-examples)

## Overview

The Dashboard Layout component supports resizing panels to help users customize their dashboard layout. Resizing is **disabled by default** and must be explicitly enabled with the `allowResizing` property. When enabled, users can drag resize handles at panel edges to change panel dimensions.

### Key Features

- **Disabled by Default:** `allowResizing` is false by default (enable explicitly)
- **Customizable Handles:** Six directional resize handles (e-south-east, e-east, e-west, e-north, e-south, e-south-west)
- **Size Constraints:** Enforce minimum and maximum panel sizes with `minSizeX`, `maxSizeX`, `minSizeY`, `maxSizeY`
- **Event Tracking:** Three lifecycle events: `resizeStart`, `resize`, `resizeStop`
- **Floating Integration:** Panels auto-reposition when `allowFloating` is true
- **Touch Support:** Works on mobile with touch events
- **Floating Panels:** Panels automatically move upward to fill empty spaces

## Enabling Resizing

### Basic Resizing

Enable resizing with all default resize handles:

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-resizable',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [allowResizing]="true"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class ResizableDashboardComponent {
  public panels = [
    { sizeX: 2, sizeY: 1, row: 0, col: 0, content: '<div>Resize me</div>' },
    { sizeX: 1, sizeY: 2, row: 0, col: 2, content: '<div>Or me</div>' }
  ];
}
```

### Disable Resizing

Prevent users from resizing panels:

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [allowResizing]="false"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class StaticSizeDashboardComponent {
  public panels = [
    { sizeX: 2, sizeY: 1, row: 0, col: 0, content: '<div>Cannot resize</div>' }
  ];
}
```

## Resize Handles

### Available Resize Directions

The `resizableHandles` property accepts an array of handle positions:

| Handle | Position | Direction |
|--------|----------|-----------|
| `e-south-east` | Bottom-right | Resize width and height |
| `e-east` | Right edge | Resize width only |
| `e-west` | Left edge | Resize width only (from left) |
| `e-north` | Top edge | Resize height only (from top) |
| `e-south` | Bottom edge | Resize height only |
| `e-south-west` | Bottom-left | Resize width (from left) and height |

### Custom Resize Handles

Restrict resizing to specific directions:

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [allowResizing]="true"
      [resizableHandles]="['e-south-east', 'e-east']"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class CustomHandlesComponent {
  // Only bottom-right and right edge resize handles visible
  public panels = [
    { sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'Resize from bottom-right or right' }
  ];
}
```

### All Resize Handles Example

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [allowResizing]="true"
      [resizableHandles]="['e-south-east', 'e-east', 'e-west', 'e-north', 'e-south', 'e-south-west']"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class AllHandlesComponent {
  public panels = [
    { sizeX: 2, sizeY: 2, row: 0, col: 0, content: 'Fully resizable from all sides' }
  ];
}
```

## Resize Events

The Dashboard Layout provides three lifecycle events for resize operations:

- **resizeStart** - Fires when user begins resizing
- **resize** - Fires continuously while resizing
- **resizeStop** - Fires when resize ends

### resizeStart Event

Triggered when a panel is about to be resized.

**ResizeArgs Properties:**
- `element: HTMLElement` - The cell element being resized
- `event: MouseEvent | TouchEvent` - The original mouse or touch event
- `isInteracted: boolean` - Whether triggered by user interaction (true) or programmatically (false)
- `panels: PanelModel[]` - Current panels that may be affected by the resize

```typescript
@Component({
  template: `
    <div class="status">{{ status }}</div>
    <ejs-dashboardlayout 
      [allowResizing]="true"
      [panels]="panels"
      (resizeStart)="onResizeStart($event)">
    </ejs-dashboardlayout>
  `
})
export class ResizeStartExampleComponent {
  public status = 'Ready';
  public panels = [
    { id: 'p1', sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'Panel 1', header: 'P1' }
  ];
  
  onResizeStart(args: any) {
    console.log('Resize started');
    console.log('Element:', args.element);
    console.log('Is user interaction:', args.isInteracted);
    this.status = `Starting resize on panel`;
  }
}
```

### resize Event

Triggered continuously while the user is resizing a panel.

**ResizeArgs Properties:** (same as resizeStart)
- `element: HTMLElement` - The cell element being resized
- `event: MouseEvent | TouchEvent` - The original mouse or touch event
- `isInteracted: boolean` - Whether triggered by user interaction
- `panels: PanelModel[]` - Updated panels array showing current resize state

**Note:** This event fires frequently during resizing. Use throttling for expensive operations.

```typescript
@Component({
  template: `
    <div class="size-display">{{ sizeInfo }}</div>
    <ejs-dashboardlayout 
      [allowResizing]="true"
      [columns]="5"
      [panels]="panels"
      (resize)="onResize($event)">
    </ejs-dashboardlayout>
  `
})
export class ResizeExampleComponent {
  public sizeInfo = 'Not resizing';
  private resizeThrottle: any;
  public panels = [
    { id: 'p1', sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'Panel', header: 'Panel 1' }
  ];
  
  onResize(args: any) {
    // Throttle updates to avoid performance issues
    clearTimeout(this.resizeThrottle);
    this.resizeThrottle = setTimeout(() => {
      if (args.panels && args.panels.length > 0) {
        const panel = args.panels[0];
        this.sizeInfo = `Panel size: ${panel.sizeX} x ${panel.sizeY} cells`;
      }
    }, 100);
  }
}
```

### resizeStop Event

Triggered when the resize operation ends.

**ResizeArgs Properties:** (same as resize)
- `element: HTMLElement` - The cell element that was resized
- `event: MouseEvent | TouchEvent` - The actual event (typically mouseup or touchend)
- `isInteracted: boolean` - Whether triggered by user interaction
- `panels: PanelModel[]` - Final panels array after resize completes

```typescript
@Component({
  template: `
    <div class="history">{{ history }}</div>
    <ejs-dashboardlayout 
      [allowResizing]="true"
      [columns]="5"
      [panels]="panels"
      (resizeStop)="onResizeStop($event)"
      (change)="onChange($event)">
    </ejs-dashboardlayout>
  `
})
export class ResizeStopExampleComponent {
  public history = '';
  public panels: any = [
    { id: 'p1', sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'P1', header: 'Panel 1' },
    { id: 'p2', sizeX: 1, sizeY: 1, row: 0, col: 2, content: 'P2', header: 'Panel 2' }
  ];
  
  onResizeStop(args: any) {
    console.log('Resize completed');
    console.log(`${args.panels.length} panels affected`);
    
    args.panels.forEach(panel => {
      console.log(`Panel ${panel.id}: ${panel.sizeX} x ${panel.sizeY} cells`);
    });
    
    this.history = `Resize complete. ${args.panels.length} panels updated`;
  }
  
  onChange(args: any) {
    console.log('Layout change event after resize');
  }
}
```

### Complete Resize Event Handler Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { DashboardLayoutComponent, DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-resize-events-full',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <div class="container">
      <div class="event-log">
        <h4>Resize Events</h4>
        <div *ngFor="let event of events" class="log-entry" [class.start]="event.includes('START')" [class.stop]="event.includes('STOP')">
          {{ event }}
        </div>
      </div>
      <ejs-dashboardlayout
        #dashboard
        [columns]="5"
        [allowResizing]="true"
        [resizableHandles]="['e-south-east', 'e-east']"
        [panels]="panels"
        (resizeStart)="onResizeStart($event)"
        (resize)="onResize($event)"
        (resizeStop)="onResizeStop($event)">
      </ejs-dashboardlayout>
    </div>
  `,
  styles: [`
    .container { display: flex; gap: 20px; }
    .event-log {
      width: 250px;
      max-height: 400px;
      overflow-y: auto;
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 4px;
    }
    .log-entry {
      font-size: 12px;
      padding: 4px 8px;
      margin: 2px 0;
      border-radius: 2px;
    }
    .start { background: #c8e6c9; }
    .stop { background: #ffccbc; }
  `]
})
export class ResizeEventsFullComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  
  public events: string[] = [];
  
  public panels: any = [
    { id: 'p1', sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'Panel 1', header: 'P1' },
    { id: 'p2', sizeX: 1, sizeY: 2, row: 0, col: 2, content: 'Panel 2', header: 'P2' }
  ];
  
  onResizeStart(args: any) {
    const time = new Date().toLocaleTimeString();
    this.events.unshift(`[${time}] START resize`);
    if (this.events.length > 20) this.events.pop();
  }
  
  onResize(args: any) {
    if (this.events[0]?.includes('Resizing')) {
      const elapsed = (Date.now() - this.resizeStartTime) / 1000;
      this.events[0] = `Resizing... (${elapsed.toFixed(1)}s)`;
    }
  }
  
  onResizeStop(args: any) {
    const time = new Date().toLocaleTimeString();
    this.events.unshift(`[${time}] STOP resize - ${args.panels.length} panels affected`);
    if (this.events.length > 20) this.events.pop();
  }
  
  private resizeStartTime: number = Date.now();
}
```

## Event Arguments Reference

### ResizeArgs Complete Structure

All resize events (resizeStart, resize, resizeStop) use the `ResizeArgs` interface:

```typescript
interface ResizeArgs {
  element: HTMLElement;          // The panel element being resized
  event: MouseEvent | TouchEvent; // The native browser event
  isInteracted: boolean;          // true if user-triggered, false if programmatic
  panels: PanelModel[];           // Array of panels affected by resize
}
```

**Usage Example:**

```typescript
onResizeEvent(args: any) {
  // Check source of resize
  if (args.isInteracted) {
    console.log('User is resizing');
  } else {
    console.log('Resize triggered programmatically');
  }
  
  // Get affected panels
  args.panels.forEach(panel => {
    console.log(`Panel ${panel.id}: ${panel.sizeX}x${panel.sizeY}`);
  });
  
  // Access the resized element
  const element = args.element;
  const rect = element.getBoundingClientRect();
  console.log(`Element position: ${rect.width}x${rect.height}`);
}
```

## Programmatic Resizing

### Using resizePanel() Method

Resize panels programmatically without user interaction:

```typescript
export class ProgrammaticResizeComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  
  // Resize panel 'panel-1' to 3 cells wide and 2 cells tall
  resizePanel() {
    this.dashboard?.resizePanel('panel-1', 3, 2);
  }
  
  // Resize to minimum size
  minimizePanel() {
    this.dashboard?.resizePanel('panel-1', 1, 1);
  }
  
  // Resize to maximum allowed by constraints
  maximizePanel() {
    // Panel must have maxSizeX and maxSizeY set
    this.dashboard?.resizePanel('panel-1', 5, 4);
  }
}
```

**resizePanel() Signature:**
```typescript
resizePanel(panelId: string, newSizeX: number, newSizeY: number): void
```

**Parameters:**
- `panelId` (string) - The ID of the panel to resize
- `newSizeX` (number) - New width in cells
- `newSizeY` (number) - New height in cells
- **Returns:** void (no return value)

**Notes:**
- Respects minimum and maximum size constraints
- Triggers `resizeStart`, `resize`, and `resizeStop` events with `isInteracted: false`
- Activates floating if `allowFloating` is true
- Raises errors if panel ID doesn't exist

## Size Constraints

### Understanding Panel Size Limits

Each panel can have minimum and maximum size limits enforced during resizing:

| Property | Type | Default | Purpose |
|---|---|---|---|
| `minSizeX` | number | 1 | Minimum width in cells (minimum 1) |
| `minSizeY` | number | 1 | Minimum height in cells (minimum 1) |
| `maxSizeX` | number | null | Maximum width in cells (null = no limit) |
| `maxSizeY` | number | null | Maximum height in cells (null = no limit) |

### Applying Size Constraints

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [allowResizing]="true"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class SizeConstraintsComponent {
  public panels = [
    {
      id: 'panel-1',
      sizeX: 2,
      sizeY: 1,
      row: 0,
      col: 0,
      content: 'Panel 1',
      minSizeX: 1,
      maxSizeX: 4,
      minSizeY: 1,
      maxSizeY: 3
    },
    {
      id: 'panel-2',
      sizeX: 1,
      sizeY: 2,
      row: 0,
      col: 2,
      content: 'Panel 2',
      minSizeX: 1,
      minSizeY: 1
      // No maxSizeX/maxSizeY = can grow to grid edges
    }
  ];
}
```

### Enforcing Constraints During Resize

When a user resizes a panel:
1. New size is validated against `minSizeX`, `minSizeY`, `maxSizeX`, `maxSizeY`
2. If new size violates constraints, resize stops at the boundary
3. Resized panel may push other panels if `allowFloating` is false
4. Panels reposition upward if `allowFloating` is true

```typescript
onResize(args: any) {
  args.panels.forEach(panel => {
    // Check if size is at constraint boundary
    if (panel.sizeX === panel.maxSizeX) {
      console.log(`Panel ${panel.id} at maximum width`);
    }
    if (panel.sizeX === panel.minSizeX) {
      console.log(`Panel ${panel.id} at minimum width`);
    }
  });
}
```

## Floating Behavior

### Understanding Floating

When `allowFloating` is true, panels automatically move upward to fill empty spaces created by resizing or dragging.

### Floating with Resizing

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [allowResizing]="true"
      [allowFloating]="true"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class FloatingResizeComponent {
  public panels = [
    { id: 'p1', sizeX: 2, sizeY: 2, row: 0, col: 0, content: 'Panel 1' },
    { id: 'p2', sizeX: 1, sizeY: 1, row: 0, col: 2, content: 'Panel 2' },
    { id: 'p3', sizeX: 1, sizeY: 1, row: 0, col: 3, content: 'Panel 3' },
    { id: 'p4', sizeX: 2, sizeY: 1, row: 1, col: 0, content: 'Panel 4' }
  ];
  
  // If user shrinks Panel 1 from 2x2 to 1x1:
  // - Panel 2 and 3 will float left to fill the gap
  // - Panel 4 will float up to row 0, column 2
}
```

### Fixed Layout (No Floating)

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [allowResizing]="true"
      [allowFloating]="false"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class FixedLayoutComponent {
  // Panels maintain their row/col positions even with gaps
  // Gaps remain empty until panels are moved
  public panels = [
    { id: 'p1', sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'P1' },
    { id: 'p2', sizeX: 1, sizeY: 1, row: 0, col: 2, content: 'P2' } // Gap at col 1
  ];
}
```

## Advanced Examples

### Example 1: Constrained Dashboard

Create a dashboard where panels have specific size limits:

```typescript
@Component({
  selector: 'app-constrained-dashboard',
  standalone: true,
  imports: [DashboardLayoutModule, CommonModule],
  template: `
    <div class="dashboard-container">
      <h3>Constrained Resize Example</h3>
      <div class="constraints-info">
        <p>Panel 1: Width 1-4, Height 1-2</p>
        <p>Panel 2: Width 1-3, Height 1-3</p>
      </div>
      <ejs-dashboardlayout
        [columns]="6"
        [allowResizing]="true"
        [cellSpacing]="[10, 10]"
        [panels]="constrainedPanels"
        (resizeStart)="onConstraintedResizeStart($event)"
        (resizeStop)="onConstraintedResizeStop($event)">
      </ejs-dashboardlayout>
    </div>
  `,
  styles: [`
    .constraints-info {
      background: #e3f2fd;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
    }
  `]
})
export class ConstrainedDashboardComponent {
  public constrainedPanels = [
    {
      id: 'constrained-p1',
      sizeX: 2,
      sizeY: 1,
      row: 0,
      col: 0,
      header: 'Limited Panel',
      content: 'Width: 1-4 cells, Height: 1-2 cells',
      minSizeX: 1,
      maxSizeX: 4,
      minSizeY: 1,
      maxSizeY: 2
    },
    {
      id: 'constrained-p2',
      sizeX: 2,
      sizeY: 1,
      row: 0,
      col: 2,
      header: 'Another Limited Panel',
      content: 'Width: 1-3 cells, Height: 1-3 cells',
      minSizeX: 1,
      maxSizeX: 3,
      minSizeY: 1,
      maxSizeY: 3
    }
  ];
  
  onConstraintedResizeStart(args: any) {
    console.log('Starting resize with constraints');
  }
  
  onConstraintedResizeStop(args: any) {
    console.log('Resize stopped - constraints enforced');
  }
}
```


# Dragging and Dropping Panels

## Table of Contents
- [Overview](#overview)
- [Enabling Drag-Drop](#enabling-drag-drop)
- [Drag Events](#drag-events)
- [Event Arguments](#event-arguments)
- [Customizing Drag Handles](#customizing-drag-handles)
- [Programmatic Panel Movement](#programmatic-panel-movement)
- [Performance Considerations](#performance-considerations)

## Overview

The Dashboard Layout provides intuitive drag-and-drop functionality that allows users to reorder panels within the dashboard. Dragging is enabled by default, but can be controlled with the `allowDragging` property. When dragging, visual feedback shows where the panel will be placed, and colliding panels automatically adjust their positions based on the `allowFloating` setting.

### Key Features

- **Enabled by Default:** `allowDragging` is true by default
- **Visual Feedback:** Placeholder shows where panel will land
- **Collision Handling:** Panels automatically push out of the way
- **Touch Support:** Works on mobile devices (touch events)
- **Customizable Handles:** Restrict dragging to specific elements via CSS selector
- **Event Tracking:** Listen to drag lifecycle events with full event arguments
- **Floating Support:** Panels auto-reposition to fill gaps when `allowFloating` is true

## Enabling Drag-Drop

### Basic Drag-Drop (Enabled by Default)

Drag-drop is **enabled by default**. No configuration needed:

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-draggable',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class DraggableDashboardComponent {
  public panels = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: '<div>Drag me</div>' },
    { sizeX: 1, sizeY: 1, row: 0, col: 1, content: '<div>Or me</div>' }
  ];
}
```

### Explicitly Enable Drag-Drop

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [allowDragging]="true"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class ExplicitlyDraggableComponent {
  public panels = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: '<div>Draggable</div>' }
  ];
}
```

### Disable Drag-Drop

Prevent users from dragging panels:

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [allowDragging]="false"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class StaticDashboardComponent {
  public panels = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: '<div>Cannot drag</div>' }
  ];
}
```

## Drag Events

The Dashboard Layout triggers three events during drag operations, plus a change event after drag completes:

- **dragStart** - Before drag begins (cancellable)
- **drag** - During drag (fires frequently)
- **dragStop** - When drag ends (with final panel positions)
- **change** - After layout modification from any source

## Event Arguments

### dragStart Event

Triggered when a panel is about to be dragged.

**DragStartArgs Properties:**
- `cancel: boolean` - Set to true to prevent the drag operation
- `element: HTMLElement` - The cell element being dragged
- `event: MouseEvent | TouchEvent` - The original mouse or touch event

```typescript
@Component({
  template: `
    <div class="status">{{ status }}</div>
    <ejs-dashboardlayout 
      [panels]="panels"
      (dragStart)="onDragStart($event)">
    </ejs-dashboardlayout>
  `
})
export class DragStartExampleComponent {
  public status = 'Ready';
  public panels = [
    { id: 'panel-1', sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Panel 1', header: 'P1' },
    { id: 'panel-2', sizeX: 1, sizeY: 1, row: 0, col: 1, content: 'Panel 2', header: 'P2' }
  ];
  
  onDragStart(args: any) {
    console.log('Panel drag started');
    console.log('Element:', args.element);
    console.log('Event type:', args.event.type); // 'mousedown' or 'touchstart'
    
    // Prevent dragging specific panels
    if (args.element.classList.contains('locked')) {
      args.cancel = true;
      this.status = 'This panel cannot be dragged';
    } else {
      this.status = `Dragging panel from column ${args.element.dataset.col}`;
    }
  }
}
```

### drag Event

Triggered continuously while the user is dragging a panel.

**DraggedEventArgs Properties:**
- `element: HTMLElement` - The cell element being dragged
- `event: MouseEvent | TouchEvent` - The original mouse or touch event
- `target: HTMLElement` - The element below the cell element being dragged (potential drop target)

**Note:** This event fires frequently (60+ times per second on modern browsers). Use throttling for expensive operations.

```typescript
@Component({
  template: `
    <div class="position">{{ dragPosition }}</div>
    <ejs-dashboardlayout 
      [panels]="panels"
      (drag)="onDrag($event)">
    </ejs-dashboardlayout>
  `
})
export class DragExampleComponent {
  public dragPosition = 'Not dragging';
  private dragThrottle: any;
  public panels = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Panel' }
  ];
  
  onDrag(args: any) {
    // Throttle updates to avoid performance issues
    clearTimeout(this.dragThrottle);
    this.dragThrottle = setTimeout(() => {
      const rect = args.element.getBoundingClientRect();
      this.dragPosition = `X: ${args.event.clientX}, Y: ${args.event.clientY}`;
      
      if (args.target) {
        console.log('Over target:', args.target.className);
      }
    }, 50); // Update every 50ms instead of 60+ times per second
  }
}
```

**Performance Guidelines:**
```typescript
// ❌ AVOID: Heavy computation on every drag event
onDrag(args: any) {
  this.expensiveCalculation();  // Called 60+ times per second!
  this.updateDatabase();         // Will cause performance issues
}

// ✅ BETTER: Use throttling with reasonable intervals
private dragThrottle: any;

onDrag(args: any) {
  clearTimeout(this.dragThrottle);
  this.dragThrottle = setTimeout(() => {
    this.lightweightUpdate(args);
  }, 100); // Update at most every 100ms
}
```

### dragStop Event

Triggered when the dragged panel is dropped.

**DragStopArgs Properties:**
- `cancel: boolean` - Set to true to prevent the drop operation (reverts to original position)
- `element: HTMLElement` - The current drag element being dropped
- `event: MouseEvent | TouchEvent` - The actual event (typically mouseup or touchend)
- `panels: PanelModel[]` - Model values of panels that have been modified (their positions changed during drag)
- `target: HTMLElement` - The current target element (where the panel is being dropped)

```typescript
@Component({
  template: `
    <div class="history">{{ history }}</div>
    <ejs-dashboardlayout 
      [panels]="panels"
      (dragStop)="onDragStop($event)"
      (change)="onChange($event)">
    </ejs-dashboardlayout>
  `
})
export class DragStopExampleComponent {
  public history = '';
  public panels: any = [
    { id: 'panel-1', sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'P1', header: 'Panel 1' },
    { id: 'panel-2', sizeX: 1, sizeY: 1, row: 0, col: 1, content: 'P2', header: 'Panel 2' },
    { id: 'panel-3', sizeX: 1, sizeY: 1, row: 1, col: 0, content: 'P3', header: 'Panel 3' }
  ];
  
  onDragStop(args: any) {
    console.log('Drop event triggered');
    console.log('Dropped element:', args.element);
    console.log('Drop target:', args.target);
    
    // Check which panels were affected
    console.log(`${args.panels.length} panels were repositioned`);
    args.panels.forEach(panel => {
      console.log(`Panel ${panel.id}: row ${panel.row}, col ${panel.col}`);
    });
    
    // Optionally prevent the drop
    if (args.target && args.target.id === 'protected-zone') {
      args.cancel = true;
      this.history = 'Drop cancelled - target is protected';
    } else {
      this.history = `Dropped panel. ${args.panels.length} panels repositioned`;
    }
  }
  
  onChange(args: any) {
    console.log('Change event triggered after drag');
    console.log('Added panels:', args.addedPanels?.length || 0);
    console.log('Changed panels:', args.changedPanels?.length || 0);
    console.log('Removed panels:', args.removedPanels?.length || 0);
  }
}
```

### Complete Drag Event Handler Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { DashboardLayoutComponent, DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-drag-events-full',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <div class="container">
      <div class="event-log">
        <h4>Drag Event Timeline</h4>
        <div *ngFor="let event of events" class="log-entry" [class.drag-start]="event.includes('START')" [class.drag-stop]="event.includes('STOP')">
          {{ event }}
        </div>
      </div>
      <ejs-dashboardlayout
        #dashboard
        [columns]="5"
        [panels]="panels"
        [allowFloating]="true"
        (dragStart)="onDragStart($event)"
        (drag)="onDrag($event)"
        (dragStop)="onDragStop($event)"
        (change)="onChange($event)">
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
    .drag-start { background: #c8e6c9; }
    .drag-stop { background: #ffccbc; }
  `]
})
export class DragEventsFullComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  
  public events: string[] = [];
  public dragStartTime: number = 0;
  private dragEventThrottle: any;
  
  public panels: any = [
    { id: 'p1', sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Panel 1', header: 'P1' },
    { id: 'p2', sizeX: 2, sizeY: 1, row: 0, col: 1, content: 'Panel 2', header: 'P2' },
    { id: 'p3', sizeX: 1, sizeY: 1, row: 0, col: 3, content: 'Panel 3', header: 'P3' },
    { id: 'p4', sizeX: 1, sizeY: 2, row: 1, col: 0, content: 'Panel 4', header: 'P4' }
  ];
  
  onDragStart(args: any) {
    const time = new Date().toLocaleTimeString();
    this.dragStartTime = Date.now();
    this.events.unshift(`[${time}] START drag`);
    
    if (this.events.length > 20) {
      this.events.pop();
    }
  }
  
  onDrag(args: any) {
    // Throttle to every 5 events to avoid spamming log
    clearTimeout(this.dragEventThrottle);
    this.dragEventThrottle = setTimeout(() => {
      const elapsed = Date.now() - this.dragStartTime;
      this.events[0] = `[${elapsed}ms] Dragging...`;
    }, 100);
  }
  
  onDragStop(args: any) {
    const time = new Date().toLocaleTimeString();
    const duration = Date.now() - this.dragStartTime;
    const movedCount = args.panels?.length || 0;
    this.events.unshift(`[${time}] STOP drag - ${movedCount} panels moved (${duration}ms)`);
    
    if (this.events.length > 20) {
      this.events.pop();
    }
  }
  
  onChange(args: any) {
    const time = new Date().toLocaleTimeString();
    const details = `add:${args.addedPanels?.length || 0} chg:${args.changedPanels?.length || 0} rm:${args.removedPanels?.length || 0}`;
    this.events.unshift(`[${time}] CHANGE event (${details})`);
    
    if (this.events.length > 20) {
      this.events.pop();
    }
  }
}
```

## Customizing Drag Handles

### Restrict Dragging to Header Only

By default, dragging works from anywhere on the panel. Restrict it to the header using the `draggableHandle` property with a CSS selector:

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [draggableHandle]="'.e-panel-header'"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class DragHeaderOnlyComponent {
  public panels = [
    { 
      sizeX: 2, 
      sizeY: 1, 
      row: 0, 
      col: 0, 
      header: 'Click here to drag',
      content: '<div>Content area cannot drag</div>'
    }
  ];
}
```

**Supported CSS Selectors:**
- `.e-panel-header` - Syncfusion's default panel header class
- `#custom-handle` - ID-based selector
- `.custom-class` - Custom class selector
- `[data-draggable]` - Attribute selector

```typescript
// ✅ Examples of valid draggableHandle values
'#drag-button'
'.drag-handle'
'.panel-toolbar .btn-drag'
'[data-handle="true"]'
'.header-icon'
```

### Custom Drag Handle Element

```typescript
@Component({
  selector: 'app-custom-drag',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [draggableHandle]="'.drag-icon'"
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `,
  styles: [`
    .e-panel-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .drag-icon {
      cursor: grab;
      font-size: 18px;
    }
    .drag-icon:active {
      cursor: grabbing;
    }
  `]
})
export class CustomDragHandleComponent {
  public panels = [
    {
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0,
      header: '<span class="drag-icon">⋮⋮</span> Panel Title',
      content: 'Only the ⋮⋮ icon can drag this panel'
    }
  ];
}
```

## Programmatic Panel Movement

Move panels programmatically without user interaction using the `movePanel()` method or the `change` event.

### Moving Panels with movePanel()

```typescript
export class ProgrammaticMoveComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  
  // Move panel 'panel-1' to row 1, column 2
  movePanel() {
    this.dashboard?.movePanel('panel-1', 1, 2);
  }
}
```

**Note:** The `movePanel()` method triggers the layout recalculation and floating behavior (if `allowFloating` is enabled). Modified panels are reported in the `dragStop` or `change` events.

## Performance Considerations

### Drag Event Frequency

The `drag` event fires approximately **60+ times per second** on modern browsers during active dragging. Avoid expensive operations in the `drag` handler:

```typescript
// Performance DO's and DON'Ts

// ❌ DON'T: Database updates
onDrag(args: any) {
  this.saveToDatabase(args); // Terrible performance
}

// ❌ DON'T: Complex calculations
onDrag(args: any) {
  for (let i = 0; i < 1000000; i++) {
    Math.sqrt(i);
  }
}

// ✅ DO: Use throttling/debouncing
private dragThrottle: any;

onDrag(args: any) {
  clearTimeout(this.dragThrottle);
  this.dragThrottle = setTimeout(() => {
    this.lightweightUpdate();
  }, 100);
}

// ✅ DO: Cache values
private cachedPositions: any = {};

onDrag(args: any) {
  const key = `${args.element.id}`;
  this.cachedPositions[key] = {
    x: args.event.clientX,
    y: args.event.clientY
  };
}
```

### Event Order During Drag

1. **dragStart** - User begins dragging → Fires once
2. **drag** - User moving mouse/finger → Fires 60+ times per second
3. **dragStop** - User releases → Fires once
4. **change** - Layout updated → Fires once with complete panel changes


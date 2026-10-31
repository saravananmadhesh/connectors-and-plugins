# Moving Panels Programmatically

## Overview

The Dashboard Layout component provides the ability to move panels to different positions programmatically using the `movePanel()` method. This allows you to change panel positions without user interaction, enabling dynamic dashboard reorganization based on user preferences, data changes, or application logic.

## movePanel() Method

### Method Signature

```typescript
movePanel(id: string, row: number, col: number): void
```

### Parameters

- **id** - The unique identifier of the panel to move
- **row** - The target row position (0-based index)
- **col** - The target column position (0-based index)

## Basic Usage

### Moving a Panel to a New Position

```typescript
import { Component, ViewChild } from '@angular/core';
import { DashboardLayoutComponent, DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-move-panel',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <div class="controls">
      <button (click)="moveTopLeft()">Move to Top-Left</button>
      <button (click)="moveBottomRight()">Move to Bottom-Right</button>
    </div>
    <ejs-dashboardlayout #dashboard [columns]="5" [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class MovePanelComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  
  public panels: any = [
    { id: 'panel-1', sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Panel 1' },
    { id: 'panel-2', sizeX: 1, sizeY: 1, row: 0, col: 1, content: 'Panel 2' },
    { id: 'panel-3', sizeX: 1, sizeY: 1, row: 0, col: 2, content: 'Panel 3' }
  ];
  
  moveTopLeft() {
    this.dashboard?.movePanel('panel-3', 0, 0);
  }
  
  moveBottomRight() {
    this.dashboard?.movePanel('panel-1', 2, 4);
  }
}
```

## Movement Tracking with Events

### Listen to Layout Changes

When a panel is moved, the `change` event is triggered:

```typescript
@Component({
  template: `
    <div class="change-log">{{ lastChange }}</div>
    <div class="controls">
      <button (click)="rearrangePanels()">Rearrange</button>
    </div>
    <ejs-dashboardlayout 
      #dashboard 
      [panels]="panels"
      (change)="onLayoutChanged($event)">
    </ejs-dashboardlayout>
  `
})
export class ChangeEventComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  
  public lastChange = 'Awaiting changes...';
  public panels: any = [
    { id: 'p1', sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Panel 1' },
    { id: 'p2', sizeX: 1, sizeY: 1, row: 0, col: 1, content: 'Panel 2' }
  ];
  
  rearrangePanels() {
    this.dashboard?.movePanel('p1', 1, 1);
  }
  
  onLayoutChanged(args: any) {
    this.lastChange = `Layout changed at ${new Date().toLocaleTimeString()}`;
  }
}
```

## Programmatic Reordering

### Swap Panel Positions

```typescript
swapPanels(panelId1: string, panelId2: string) {
  const p1 = this.panels.find(p => p.id === panelId1);
  const p2 = this.panels.find(p => p.id === panelId2);
  
  if (p1 && p2) {
    // Store original positions
    const temp = { row: p1.row, col: p1.col };
    
    // Move panels
    this.dashboard?.movePanel(panelId1, p2.row, p2.col);
    this.dashboard?.movePanel(panelId2, temp.row, temp.col);
    
    // Update local state
    p1.row = p2.row;
    p1.col = p2.col;
    p2.row = temp.row;
    p2.col = temp.col;
  }
}
```

### Reset to Default Layout

```typescript
resetLayout() {
  const defaultLayout = [
    { id: 'p1', row: 0, col: 0 },
    { id: 'p2', row: 0, col: 1 },
    { id: 'p3', row: 0, col: 2 }
  ];
  
  defaultLayout.forEach(layout => {
    this.dashboard?.movePanel(layout.id, layout.row, layout.col);
  });
}
```

## Practical Examples

### Example: Circular Panel Rotation

Move panels in a circular pattern:

```typescript
circulatePanels() {
  const positions = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 0 }
  ];
  
  this.panels.forEach((panel, index) => {
    const nextIndex = (index + 1) % positions.length;
    const nextPos = positions[nextIndex];
    this.dashboard?.movePanel(panel.id, nextPos.row, nextPos.col);
  });
}
```

### Example: Sort Panels by Priority

```typescript
sortByPriority(priority: 'high' | 'medium' | 'low') {
  let row = 0;
  let col = 0;
  
  // Define priority order
  const panelPriority: { [key: string]: number } = {
    'critical': 0,
    'important': 1,
    'optional': 2
  };
  
  // Sort and position panels
  const sorted = this.panels.sort((a, b) => 
    (panelPriority[a.priority] || 999) - (panelPriority[b.priority] || 999)
  );
  
  sorted.forEach(panel => {
    this.dashboard?.movePanel(panel.id, row, col);
    col++;
    if (col >= 5) {
      col = 0;
      row++;
    }
  });
}
```

## Best Practices

### 1. Validate Target Positions

Always ensure target positions are valid before moving:

```typescript
isValidPosition(row: number, col: number, columns: number = 5): boolean {
  return row >= 0 && col >= 0 && col < columns;
}

safeMovePanel(panelId: string, row: number, col: number) {
  if (this.isValidPosition(row, col)) {
    this.dashboard?.movePanel(panelId, row, col);
  }
}
```

### 2. Track Panel Positions

Maintain an updated record of panel positions:

```typescript
private panelPositions: Map<string, { row: number; col: number }> = new Map();

moveAndTrack(panelId: string, row: number, col: number) {
  this.dashboard?.movePanel(panelId, row, col);
  this.panelPositions.set(panelId, { row, col });
}
```

### 3. Save State After Moving

Persist the new layout configuration:

```typescript
moveAndPersist(panelId: string, row: number, col: number) {
  this.dashboard?.movePanel(panelId, row, col);
  
  const state = this.dashboard?.serialize();
  localStorage.setItem('dashboardLayout', JSON.stringify(state));
}
```

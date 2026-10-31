# Adding and Removing Panels Dynamically

## Table of Contents
- [Overview](#overview)
- [Adding Panels](#adding-panels)
- [Removing Panels](#removing-panels)
- [Bulk Operations](#bulk-operations)
- [Advanced Examples](#advanced-examples)
- [Best Practices](#best-practices)

## Overview

Dashboard layouts often need dynamic panel management. Users may want to add new widgets, remove old ones, or manage panels programmatically. The Dashboard Layout provides public methods to handle these operations efficiently.

### Key Methods

- `addPanel(panel)` - Add single panel to dashboard
- `removePanel(id)` - Remove panel by ID
- `removeAll()` - Remove all panels at once

## Adding Panels

### Basic Usage

Use the `addPanel()` method to add a new panel to the dashboard at runtime:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DashboardLayoutComponent, DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-dynamic-dashboard',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <button (click)="onAddPanel()">Add Panel</button>
    <ejs-dashboardlayout #dashboard [columns]="5" [panels]="panels"></ejs-dashboardlayout>
  `
})
export class DynamicDashboardComponent {
  @ViewChild('dashboard') dashboardRef?: DashboardLayoutComponent;
  
  public panelCount = 0;
  public panels: any = [];

  onAddPanel() {
    const newPanel = {
      id: `panel-${this.panelCount}`,
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: this.panelCount % 5,
      header: `<div>Panel ${this.panelCount}</div>`,
      content: `<div class="content">New Panel ${this.panelCount}</div>`
    };
    
    this.dashboardRef?.addPanel(newPanel);
    this.panelCount++;
  }
}
```

### Panel Configuration

When adding a panel, provide all required properties:

```typescript
{
  id: 'unique-id',           // REQUIRED: Must be unique across all panels
  sizeX: 1,                  // REQUIRED: Width in cells
  sizeY: 1,                  // REQUIRED: Height in cells
  row: 0,                    // REQUIRED: Starting row position
  col: 0,                    // REQUIRED: Starting column position
  header: '<div>Title</div>', // Optional: Panel header
  content: '<div>...</div>'   // Optional: Panel content
}
```

### Auto-Positioning New Panels

Add panels with automatic position calculation:

```typescript
addPanelAtNextPosition() {
  const nextCol = this.panels.length % 5;
  const nextRow = Math.floor(this.panels.length / 5);
  
  const newPanel = {
    id: `panel-${this.panels.length}`,
    sizeX: 1,
    sizeY: 1,
    row: nextRow,
    col: nextCol,
    content: `<div>Panel ${this.panels.length}</div>`
  };
  
  this.dashboardRef?.addPanel(newPanel);
  this.panels.push(newPanel);
}
```

## Removing Panels

### Remove Single Panel

Use `removePanel()` with the panel ID:

```typescript
removePanelById(panelId: string) {
  this.dashboardRef?.removePanel(panelId);
  
  // Also update local array if tracking panels
  this.panels = this.panels.filter(p => p.id !== panelId);
}
```

### Remove Panel with UI Confirmation

Add user confirmation before removal:

```typescript
@Component({
  template: `
    <button (click)="onRemovePanel('panel-1')">Remove Panel 1</button>
    <ejs-dashboardlayout #dashboard [panels]="panels"></ejs-dashboardlayout>
  `
})
export class RemovePanelComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  
  onRemovePanel(panelId: string) {
    const confirmed = confirm(`Remove panel ${panelId}?`);
    if (confirmed) {
      this.dashboard?.removePanel(panelId);
    }
  }
}
```

### Dynamic Removal with Dropdown

```typescript
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  standalone: true,
  imports: [DashboardLayoutModule, ButtonModule, DropDownListModule],
  template: `
    <div class="controls">
      <label>Select Panel to Remove:</label>
      <ejs-dropdownlist 
        #dropdown
        [dataSource]="panelIds"
        placeholder="Choose panel">
      </ejs-dropdownlist>
      <button ejs-button (click)="removeSelected()">Remove</button>
    </div>
    <ejs-dashboardlayout #dashboard [panels]="panels"></ejs-dashboardlayout>
  `
})
export class RemoveWithDropdownComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  @ViewChild('dropdown') dropdown?: any;
  
  public panels: any = [
    { id: 'sales', sizeX: 1, sizeY: 1, row: 0, col: 0, header: 'Sales' },
    { id: 'revenue', sizeX: 1, sizeY: 1, row: 0, col: 1, header: 'Revenue' },
    { id: 'growth', sizeX: 1, sizeY: 1, row: 0, col: 2, header: 'Growth' }
  ];
  
  get panelIds(): string[] {
    return this.panels.map(p => p.id);
  }
  
  removeSelected() {
    const selectedId = this.dropdown?.value;
    if (selectedId) {
      this.dashboard?.removePanel(selectedId);
      this.panels = this.panels.filter(p => p.id !== selectedId);
    }
  }
}
```

## Bulk Operations

### Remove All Panels

Clear the entire dashboard:

```typescript
clearDashboard() {
  this.dashboardRef?.removeAll();
  this.panels = [];
}
```

### Reset to Default Panels

Clear and reinitialize with default layout:

```typescript
resetToDefault() {
  this.dashboardRef?.removeAll();
  this.panels = this.getDefaultPanels();
  this.panels.forEach(panel => {
    this.dashboardRef?.addPanel(panel);
  });
}

getDefaultPanels() {
  return [
    { id: 'default-1', sizeX: 2, sizeY: 1, row: 0, col: 0, header: 'Dashboard' },
    { id: 'default-2', sizeX: 1, sizeY: 2, row: 0, col: 2, header: 'Metrics' },
    { id: 'default-3', sizeX: 2, sizeY: 1, row: 1, col: 0, header: 'Reports' }
  ];
}
```

### Batch Add Multiple Panels

```typescript
addMultiplePanels(panelConfigs: any[]) {
  panelConfigs.forEach((config, index) => {
    const panel = {
      id: `batch-panel-${index}`,
      sizeX: 1,
      sizeY: 1,
      row: Math.floor(index / 5),
      col: index % 5,
      ...config // Spread custom properties
    };
    this.dashboardRef?.addPanel(panel);
  });
}

// Usage
const configs = [
  { header: 'Panel A', content: '<div>A</div>' },
  { header: 'Panel B', content: '<div>B</div>' },
  { header: 'Panel C', content: '<div>C</div>' }
];
this.addMultiplePanels(configs);
```

## Best Practices

### 1. Unique Panel IDs

Always ensure panel IDs are unique across all panels:

```typescript
addPanel(config: any) {
  const panel = { id: `panel-${Date.now()}`, ...config };
  this.dashboardRef?.addPanel(panel);
}
```

### 2. Track Panels in Component

Maintain a local array to track panels for easier management:

```typescript
public panels: any = [];

addPanel(config: any) {
  const panel = { id: `panel-${this.panels.length}`, ...config };
  this.dashboardRef?.addPanel(panel);
  this.panels.push(panel);  // Keep in sync
}

removePanel(panelId: string) {
  this.dashboardRef?.removePanel(panelId);
  this.panels = this.panels.filter(p => p.id !== panelId);
}
```

### 3. Update Local Array After Removal

Always keep your component's panel array in sync with dashboard state:

```typescript
onRemovePanel(panelId: string) {
  this.dashboardRef?.removePanel(panelId);
  this.panels = this.panels.filter(p => p.id !== panelId);
}
```

## Advanced Method Examples

### updatePanel - Update Panel Properties Dynamically

Update an existing panel without removing and re-adding it:

```typescript
// Update panel header and content dynamically
updatePanelContent() {
  const updatedPanel = {
    id: 'panel1',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'Updated Panel Title',
    content: '<div class="updated-content">New content here</div>'
  };
  
  this.dashboardRef?.updatePanel('panel1', updatedPanel);
}
```

**Use Cases:**
- Update panel content dynamically based on user actions
- Change panel headers based on data updates
- Modify panel styling or configuration without full removal

### refreshDraggableHandle - Refresh Drag Selector

Refresh the draggable handle selector after DOM modifications:

```typescript
// Refresh draggable handle after external DOM changes
onDOMModified() {
  // Your DOM modifications here (e.g., dynamically added elements)
  this.dashboardRef?.refreshDraggableHandle();
}
```

**When to Use:**
- After external DOM modifications
- When draggableHandle CSS selector changes dynamically
- After adding/removing panel elements externally

### destroy - Component Cleanup

Properly destroy the component and cleanup resources:

```typescript
ngOnDestroy() {
  if (this.dashboardRef) {
    this.dashboardRef.destroy();
  }
}
```

**Important:** Always call destroy in your component's ngOnDestroy lifecycle to prevent memory leaks and properly clean up resources.


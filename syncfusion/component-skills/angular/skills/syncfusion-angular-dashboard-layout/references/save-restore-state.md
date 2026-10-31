# Saving and Restoring Dashboard State

## Table of Contents
- [Overview](#overview)
- [Persistence Configuration](#persistence-configuration)
- [Serializing Panel State](#serializing-panel-state)
- [Restoring Saved State](#restoring-saved-state)
- [localStorage Integration](#localstorage-integration)
- [Advanced Scenarios](#advanced-scenarios)

## Overview

The Dashboard Layout can save and restore panel arrangements, enabling users to customize their layout and have it remembered across sessions. Two approaches are available:

1. **Automatic Persistence** - Enable `enablePersistence` for automatic state management
2. **Manual Serialization** - Use `serialize()` method for custom state management

### Key Features

- **Automatic Persistence:** Save/restore state automatically with `enablePersistence` property
- **Manual Control:** Use `serialize()` to explicitly capture layout state
- **State Structure:** Returns array of `PanelModel` objects with complete panel configuration
- **Storage Flexibility:** Save to localStorage, database, or server
- **Complete State:** Captures all panel positions, sizes, constraints, and properties

## Persistence Configuration

### Enable Automatic Persistence

The `enablePersistence` property automatically saves and restores component state:

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-persistent',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [enablePersistence]="true"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class PersistentDashboardComponent {
  public panels = [
    { id: 'p1', sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'Panel 1' },
    { id: 'p2', sizeX: 1, sizeY: 1, row: 0, col: 2, content: 'Panel 2' }
  ];
}
```

**Behavior:**
- First load: Uses initial panels array
- Subsequent loads: Restores previously saved state from browser storage
- State updates automatically when user moves/resizes panels
- State format: Stored as JSON in browser's session/persistent storage

## Serializing Panel State

### Understanding serialize() Method

The `serialize()` method captures the current layout state and returns it as an array of `PanelModel` objects:

```typescript
// Returns: PanelModel[]
const state = dashboard.serialize();
```

### serialize() Return Type and Structure

The method returns an array where each element is a `PanelModel` with current state:

```typescript
interface PanelModel {
  col: number;                               // Current column position
  content: string | HTMLElement | Function;  // Panel content
  cssClass: string;                          // CSS classes (default '')
  enabled: boolean;                          // Whether panel is enabled (default true)
  header: string | HTMLElement | Function;   // Panel header
  id: string;                                // Unique identifier (default '')
  maxSizeX: number | null;                   // Maximum width constraint (default null)
  maxSizeY: number | null;                   // Maximum height constraint (default null)
  minSizeX: number;                          // Minimum width constraint (default 1)
  minSizeY: number;                          // Minimum height constraint (default 1)
  row: number;                               // Current row position
  sizeX: number;                             // Current width in cells
  sizeY: number;                             // Current height in cells
  zIndex: number;                            // Layer order (default 1000)
}
```

### Capturing Current State Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { DashboardLayoutComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-save-state',
  template: `
    <button (click)="saveState()">Save Layout</button>
    <button (click)="loadState()">Load Layout</button>
    
    <ejs-dashboardlayout
      #dashboard
      [columns]="5"
      [allowDragging]="true"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class SaveStateComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  
  public panels: any = [
    { id: 'p1', sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'Panel 1' }
  ];
  
  saveState() {
    // Capture current layout state
    const state = this.dashboard?.serialize();
    if (state) {
      localStorage.setItem('dashboard-state', JSON.stringify(state));
    }
  }
  
  loadState() {
    const savedState = localStorage.getItem('dashboard-state');
    if (savedState) {
      this.dashboard!.panels = JSON.parse(savedState);
    }
  }
}
```

## Restoring Saved State

### Setting Panels from Serialized State

Restore a previously saved layout by setting the panels array:

```typescript
@Component({
  selector: 'app-restore-state',
  template: `
    <button (click)="restoreSavedLayout()">Restore Previous Layout</button>
    <ejs-dashboardlayout
      #dashboard
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class RestoreStateComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  
  public panels: any = [
    { id: 'p1', sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'Panel 1' }
  ];
  
  restoreSavedLayout() {
    const savedState = localStorage.getItem('dashboard-state');
    if (savedState && this.dashboard) {
      this.dashboard.panels = JSON.parse(savedState);
    }
  }
}
```

## localStorage Integration

### Automatic Save with enablePersistence

The simplest approach uses the built-in `enablePersistence`:

```typescript
@Component({
  selector: 'app-auto-persist',
  template: `
    <p>Rearrange panels or refresh the page - your layout will be restored automatically</p>
    <ejs-dashboardlayout 
      id="dashboardPersist"
      [columns]="5"
      [enablePersistence]="true"
      [allowDragging]="true"
      [allowResizing]="true"
      [panels]="initialPanels">
    </ejs-dashboardlayout>
  `
})
export class AutoPersistComponent {
  public initialPanels = [
    { id: 'p1', sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'Panel 1' },
    { id: 'p2', sizeX: 1, sizeY: 2, row: 0, col: 2, content: 'Panel 2' }
  ];
}
```

**What happens:**
1. User loads page - initial panels shown
2. User moves/resizes panels
3. Automatic save triggered by `change` event
4. State stored in browser storage
5. User refreshes page - saved state restored automatically

## Advanced Scenarios

### Scenario 1: Multiple Dashboard Instances

Each dashboard maintains separate state:

```typescript
@Component({
  selector: 'app-multi-dashboard',
  template: `
    <div>
      <h3>Dashboard A</h3>
      <button (click)="saveDashboardA()">Save A</button>
      <ejs-dashboardlayout
        #dashA
        [columns]="5"
        [panels]="panelsA">
      </ejs-dashboardlayout>
    </div>
    
    <div>
      <h3>Dashboard B</h3>
      <button (click)="saveDashboardB()">Save B</button>
      <ejs-dashboardlayout
        #dashB
        [columns]="5"
        [panels]="panelsB">
      </ejs-dashboardlayout>
    </div>
  `
})
export class MultiDashboardComponent {
  @ViewChild('dashA') dashboardA?: DashboardLayoutComponent;
  @ViewChild('dashB') dashboardB?: DashboardLayoutComponent;
  
  public panelsA = [
    { id: 'a1', sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'A-Panel-1' }
  ];
  
  public panelsB = [
    { id: 'b1', sizeX: 2, sizeY: 1, row: 0, col: 0, content: 'B-Panel-1' }
  ];
  
  saveDashboardA() {
    const stateA = this.dashboardA?.serialize();
    localStorage.setItem('dashboard-a-state', JSON.stringify(stateA));
  }
  
  saveDashboardB() {
    const stateB = this.dashboardB?.serialize();
    localStorage.setItem('dashboard-b-state', JSON.stringify(stateB));
  }
}
```

### Scenario 2: User-Specific Layout Preferences

Store layouts per user:

```typescript
@Component({
  selector: 'app-user-layout',
  template: `
    <button (click)="saveUserLayout()">Save My Layout</button>
    <button (click)="loadUserLayout()">Load My Layout</button>
    <ejs-dashboardlayout
      #dashboard
      [columns]="5"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class UserLayoutComponent {
  @ViewChild('dashboard') dashboard?: DashboardLayoutComponent;
  
  private userId = 'user-123';
  public panels: any = [];
  
  saveUserLayout() {
    if (this.dashboard) {
      const state = this.dashboard.serialize();
      // Save to backend API
      console.log(`Saved layout for user ${this.userId}`, state);
    }
  }
  
  loadUserLayout() {
    // Load from backend API
    console.log(`Loaded layout for user ${this.userId}`);
  }
}
```


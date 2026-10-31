# Grid Lines and Visual Representation

## Overview

The Dashboard Layout component provides a visual grid system that shows the cell divisions within the layout. By enabling grid lines, you can see how the dashboard is divided into cells, making it easier to understand panel positioning and sizing during the initial design phase. Grid lines are especially helpful when building and debugging dashboard layouts.

## Enabling Grid Lines

Grid lines are controlled using the `showGridLines` property. When enabled, grid lines display the cell structure of the dashboard layout, making it easy to visualize panel positions and dimensions.

### Basic Grid Lines Configuration

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-grid-lines',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <div class="controls">
      <button (click)="toggleGridLines()">
        {{ showGridLines ? 'Hide' : 'Show' }} Grid Lines
      </button>
    </div>
    <ejs-dashboardlayout 
      [columns]="5"
      [cellSpacing]="[10, 10]"
      [showGridLines]="showGridLines"
      [panels]="panels">
    </ejs-dashboardlayout>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100vh; }
  `]
})
export class GridLinesComponent {
  public showGridLines = true;
  
  public panels: any = [
    { sizeX: 3, sizeY: 2, row: 0, col: 1, content: '<div class="content">Panel 1</div>' },
    { sizeX: 1, sizeY: 3, row: 0, col: 4, content: '<div class="content">Panel 2</div>' },
    { sizeX: 2, sizeY: 1, row: 2, col: 2, content: '<div class="content">Panel 3</div>' }
  ];
  
  toggleGridLines() {
    this.showGridLines = !this.showGridLines;
  }
}
```

## Understanding the Grid System

### Grid Structure

The Dashboard Layout divides the available space into a grid:

- **Columns**: Set by the `columns` property (e.g., 5 columns)
- **Rows**: Automatically calculated based on panel positions
- **Cells**: Individual units in the grid (width = total width / columns)
- **Spacing**: Defined by `cellSpacing` property [horizontal, vertical]

### Grid Visualization

When grid lines are enabled, you can see:
- Vertical lines separating columns
- Horizontal lines separating rows
- The exact boundaries of each cell
- How panels span across cells

### Example with Grid Lines

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-visual-grid',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [cellSpacing]="[10, 10]"
      [showGridLines]="true"
      [panels]="panels">
    </ejs-dashboardlayout>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100vh; }
  `]
})
export class VisualGridComponent {
  public panels: any = [
    // Panel spanning 1 column, 1 row
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: '<div>1x1</div>' },
    
    // Panel spanning 3 columns, 2 rows
    { sizeX: 3, sizeY: 2, row: 0, col: 1, content: '<div>3x2</div>' },
    
    // Panel spanning 1 column, 3 rows
    { sizeX: 1, sizeY: 3, row: 0, col: 4, content: '<div>1x3</div>' },
    
    // Panel spanning 2 columns, 1 row
    { sizeX: 2, sizeY: 1, row: 2, col: 0, content: '<div>2x1</div>' },
    
    // Panel spanning 2 columns, 1 row
    { sizeX: 2, sizeY: 1, row: 2, col: 2, content: '<div>2x1</div>' }
  ];
}
```

## Use Cases for Grid Lines

### 1. Dashboard Design Phase

Enable grid lines during initial design to visualize layout structure:

```typescript
public showGridLines = !this.isProduction;  // Show only in development
```

### 2. Panel Positioning Help

Display grid lines when users are adding or configuring panels:

```typescript
enableDesignMode() {
  this.showGridLines = true;
  this.editMode = true;
}

exitDesignMode() {
  this.showGridLines = false;
  this.editMode = false;
}
```

### 3. Responsive Debugging

Show grid lines to verify responsive layout changes:

```typescript
@HostListener('window:resize')
onResize() {
  const isMobile = window.innerWidth < 600;
  this.showGridLines = isMobile;  // Show grid on mobile for debugging
}
```

## Grid Line Styling

While grid lines are built-in, you can customize the overall dashboard appearance:

```css
/* Dashboard background */
.e-dashboardlayout.e-control {
  background-color: #f5f5f5;
}

/* Panel styling to make grid visible */
.e-dashboardlayout.e-control .e-panel {
  background-color: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

## Best Practices

### 1. Use Grid Lines for Layout Debugging

Enable grid lines when troubleshooting panel positioning issues:

```typescript
if (panelNotDisplaying) {
  this.showGridLines = true;  // Enable to see cell structure
  console.log('Grid lines enabled for debugging');
}
```

### 2. Disable in Production

Typically hide grid lines in production environments:

```typescript
public showGridLines = !environment.production;
```

### 3. Provide User Toggle

Allow power users to toggle grid lines:

```typescript
toggleGridVisibility(show: boolean) {
  this.showGridLines = show;
  // Optionally save preference
  localStorage.setItem('gridLinesVisible', show.toString());
}
```

### 4. Document Grid System

Include grid line information in dashboards you design:

```typescript
// Column layout: 5 columns
// Each column is 20% of dashboard width
// With 10px spacing between columns
public gridInfo = {
  columns: 5,
  spacing: [10, 10],
  cellWidth: '20%'
};
```

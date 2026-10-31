# Configuring Cell Spacing

## Overview

Cell spacing controls the distance between panels in the Dashboard Layout. The `cellSpacing` property defines the spacing between each panel in both horizontal and vertical directions. Proper spacing improves visual clarity and makes dashboards easier to read and interact with.

## Cell Spacing Property

### Syntax

```typescript
cellSpacing: [number, number]  // [horizontal, vertical]
```

- **First value**: Horizontal spacing in pixels (spacing between columns)
- **Second value**: Vertical spacing in pixels (spacing between rows)

## Basic Configuration

### Default Spacing

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-cell-spacing',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [cellSpacing]="[10, 10]"
      [panels]="panels">
    </ejs-dashboardlayout>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100vh; }
  `]
})
export class CellSpacingComponent {
  public panels: any = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: '<div class="content">0</div>' },
    { sizeX: 3, sizeY: 2, row: 0, col: 1, content: '<div class="content">1</div>' },
    { sizeX: 1, sizeY: 3, row: 0, col: 4, content: '<div class="content">2</div>' },
    { sizeX: 1, sizeY: 1, row: 1, col: 0, content: '<div class="content">3</div>' },
    { sizeX: 2, sizeY: 1, row: 2, col: 0, content: '<div class="content">4</div>' },
    { sizeX: 1, sizeY: 1, row: 2, col: 2, content: '<div class="content">5</div>' },
    { sizeX: 1, sizeY: 1, row: 2, col: 3, content: '<div class="content">6</div>' }
  ];
}
```

## Spacing Variations

### No Spacing (Compact Layout)

Panels placed directly adjacent to each other:

```typescript
public cellSpacing: number[] = [0, 0];
```

### Small Spacing (Tight Layout)

Minimal spacing for compact dashboards:

```typescript
public cellSpacing: number[] = [5, 5];
```

### Default Spacing (Recommended)

Balanced spacing for most dashboards:

```typescript
public cellSpacing: number[] = [10, 10];  // Most common
```

### Large Spacing (Spacious Layout)

Generous spacing for clean, readable dashboards:

```typescript
public cellSpacing: number[] = [20, 20];
```

### Asymmetric Spacing

Different horizontal and vertical spacing:

```typescript
public cellSpacing: number[] = [15, 5];  // More horizontal spacing
```

## Dynamic Spacing Adjustment

### Change Spacing at Runtime

```typescript
@Component({
  selector: 'app-dynamic-spacing',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <div class="controls">
      <button (click)="setSpacing(0, 0)">No Spacing</button>
      <button (click)="setSpacing(10, 10)">Default (10px)</button>
      <button (click)="setSpacing(20, 20)">Large (20px)</button>
    </div>
    <ejs-dashboardlayout 
      [columns]="5"
      [cellSpacing]="currentSpacing"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class DynamicSpacingComponent {
  public currentSpacing: number[] = [10, 10];
  
  public panels: any = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Panel 1' },
    { sizeX: 1, sizeY: 1, row: 0, col: 1, content: 'Panel 2' },
    { sizeX: 1, sizeY: 1, row: 0, col: 2, content: 'Panel 3' }
  ];
  
  setSpacing(horizontal: number, vertical: number) {
    this.currentSpacing = [horizontal, vertical];
  }
}
```

## Responsive Spacing

### Adjust Spacing Based on Screen Size

```typescript
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-responsive-spacing',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [columns]="columns"
      [cellSpacing]="cellSpacing"
      [panels]="panels">
    </ejs-dashboardlayout>
  `
})
export class ResponsiveSpacingComponent {
  public cellSpacing: number[] = [10, 10];
  public columns = 5;
  public panels: any = [];
  
  @HostListener('window:resize')
  onResize() {
    this.updateSpacing();
  }
  
  private updateSpacing() {
    const width = window.innerWidth;
    
    if (width < 600) {
      // Mobile: reduced spacing
      this.cellSpacing = [5, 5];
      this.columns = 2;
    } else if (width < 1024) {
      // Tablet: medium spacing
      this.cellSpacing = [10, 10];
      this.columns = 3;
    } else {
      // Desktop: larger spacing
      this.cellSpacing = [20, 20];
      this.columns = 5;
    }
  }
}
```

## Spacing with Different Panel Sizes

### Large Panels with Small Spacing

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [columns]="3"
      [cellSpacing]="[5, 5]"
      [panels]="largePanels">
    </ejs-dashboardlayout>
  `
})
export class LargePanelComponent {
  public largePanels: any = [
    { sizeX: 3, sizeY: 2, row: 0, col: 0, content: 'Wide Panel' },
    { sizeX: 3, sizeY: 1, row: 2, col: 0, content: 'Full Width Panel' }
  ];
}
```

### Small Panels with Large Spacing

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [columns]="5"
      [cellSpacing]="[20, 20]"
      [panels]="smallPanels">
    </ejs-dashboardlayout>
  `
})
export class SmallPanelComponent {
  public smallPanels: any = [
    { sizeX: 1, sizeY: 1, row: 0, col: 0, content: 'Small 1' },
    { sizeX: 1, sizeY: 1, row: 0, col: 1, content: 'Small 2' },
    { sizeX: 1, sizeY: 1, row: 0, col: 2, content: 'Small 3' }
  ];
}
```

## Practical Examples

### Example: Compact Dashboard

Minimize spacing for information-dense layouts:

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [columns]="6"
      [cellSpacing]="[3, 3]"
      [cellAspectRatio]="100/80"
      [panels]="manyPanels">
    </ejs-dashboardlayout>
  `
})
export class CompactDashboardComponent {
  public manyPanels: any = Array.from({ length: 12 }, (_, i) => ({
    id: `p${i}`,
    sizeX: 1,
    sizeY: 1,
    row: Math.floor(i / 6),
    col: i % 6,
    content: `<div>Panel ${i}</div>`
  }));
}
```

### Example: Executive Dashboard

Use larger spacing for executive summaries:

```typescript
@Component({
  template: `
    <ejs-dashboardlayout 
      [columns]="3"
      [cellSpacing]="[25, 25]"
      [panels]="executivePanels">
    </ejs-dashboardlayout>
  `
})
export class ExecutiveDashboardComponent {
  public executivePanels: any = [
    { 
      id: 'kpis', 
      sizeX: 3, 
      sizeY: 1, 
      row: 0, 
      col: 0, 
      header: 'Key Metrics',
      content: '<div>KPI Data</div>' 
    },
    { 
      id: 'revenue', 
      sizeX: 2, 
      sizeY: 2, 
      row: 1, 
      col: 0, 
      header: 'Revenue',
      content: '<div>Revenue Chart</div>' 
    },
    { 
      id: 'growth', 
      sizeX: 1, 
      sizeY: 2, 
      row: 1, 
      col: 2, 
      header: 'Growth',
      content: '<div>Growth Gauge</div>' 
    }
  ];
}
```

## Best Practices for Cell Spacing

### 1. Maintain Consistency

Use consistent spacing throughout the dashboard for visual harmony:

```typescript
const STANDARD_SPACING = [12, 12];
const COMPACT_SPACING = [8, 8];
const SPACIOUS_SPACING = [16, 16];

// Choose one and stick with it
public cellSpacing = STANDARD_SPACING;
```

### 2. Consider Panel Content

Adjust spacing based on the content type:

```typescript
// Text-heavy content: larger spacing
public textDashboardSpacing = [15, 15];

// Charts and visualizations: smaller spacing
public chartDashboardSpacing = [10, 10];

// Metrics only: minimal spacing
public metricsDashboardSpacing = [5, 5];
```

### 3. Test for Readability

Ensure spacing doesn't make panels too far apart:

```typescript
// Too small (≤ 2px): panels feel cramped
// Optimal (8-15px): good balance
// Too large (≥ 30px): panels feel disconnected

public cellSpacing = [12, 12];  // Recommended
```

### 4. Account for Drag-and-Drop

Use adequate spacing for better drag-and-drop interaction:

```typescript
if (this.allowDragging) {
  this.cellSpacing = [12, 12];  // At least 10px for drag targets
} else {
  this.cellSpacing = [8, 8];   // Can use smaller spacing
}
```

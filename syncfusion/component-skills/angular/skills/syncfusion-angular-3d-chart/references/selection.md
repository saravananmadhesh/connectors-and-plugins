# Selection

Enable and configure point and series selection in 3D charts.

## Table of Contents

- [Enable Selection](#enable-selection)
  - [Basic Point Selection](#basic-point-selection)
- [Selection Modes](#selection-modes)
  - [Single Point Selection](#single-point-selection)
  - [Series Selection](#series-selection)
  - [Cluster Selection](#cluster-selection)
  - [Multiple Point Selection](#multiple-point-selection)
- [Selection Examples](#selection-examples)
  - [Point Selection with Styling](#point-selection-with-styling)
  - [Series Selection](#series-selection)
- [Selection Styling](#selection-styling)
  - [Custom Selection Colors](#custom-selection-colors)
- [Selection Events](#selection-events)
  - [Handle Selection Changes](#handle-selection-changes)
  - [Track Selected Items](#track-selected-items)
- [Highlight on Hover](#highlight-on-hover)
  - [Enable Highlight](#enable-highlight)
- [Programmatic Selection](#programmatic-selection)
  - [Select by Index](#select-by-index)
- [Common Selection Patterns](#common-selection-patterns)
  - [Pattern 1: Single Selection with Details](#pattern-1-single-selection-with-details)
  - [Pattern 2: Multi-Selection for Comparison](#pattern-2-multi-selection-for-comparison)
  - [Pattern 3: Series-Level Actions](#pattern-3-series-level-actions)
- [Accessibility Considerations](#accessibility-considerations)
- [Performance Notes](#performance-notes)

## Enable Selection

### Basic Point Selection

```typescript
import { Component } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <ejs-chart3d>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" type="Column" [selectionMode]="'Point'">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class SelectionComponent {
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 }
  ];
}
```

## Selection Modes

### Single Point Selection

Select one point at a time:

```typescript
selectionMode = 'Point'
```

### Series Selection

Select entire series:

```typescript
selectionMode = 'Series'
```

### Cluster Selection

Select all points in a cluster:

```typescript
selectionMode = 'Cluster'
```

### Multiple Point Selection

Select multiple points (Ctrl+Click):

```typescript
selectionMode = 'MultiPointSelect'
```

## Selection Examples

### Point Selection with Styling

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Column"
          [selectionMode]="'Point'"
          [selectedDataIndexes]="selectedIndices">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class PointSelectionComponent {
  primaryXAxis = {
        valueType: 'Category'
  }

  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 },
    { x: 'C', y: 60 }
  ];

  selectedIndices = [{ series: 0, point: 1 }];  // Select point B
}
```

### Series Selection

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="series1" 
          xName="x" 
          yName="y" 
          type="Column"
          name="Series 1"
          [selectionMode]="'Series'">
        </e-chart3d-series>
        <e-chart3d-series 
          [dataSource]="series2" 
          xName="x" 
          yName="y" 
          type="Column"
          name="Series 2"
          [selectionMode]="'Series'">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class SeriesSelectionComponent {
  series1 = [{ x: 'A', y: 40 }];
  series2 = [{ x: 'A', y: 35 }];
  primaryXAxis = {
        valueType: 'Category'
  }
}
```

## Selection Styling

### Custom Selection Colors

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Column"
          [selectionMode]="'Point'"
          [selectionStyle]="selectionStyle">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class SelectionStyleComponent {
  primaryXAxis = {
        valueType: 'Category'
  }
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 }
  ];

  selectionStyle = {
    fill: '#ff0000',      // Selected color
    opacity: 0.8,
    border: { color: '#333', width: 2 }
  };
}
```

## Selection Events

### Handle Selection Changes

```typescript
@Component({
  template: `
    <ejs-chart3d (pointRender)="onPointSelect($event)" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Column"
          [selectionMode]="'Point'">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class SelectionEventComponent {
  primaryXAxis = {
        valueType: 'Category'
  }
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 }
  ];

  onPointSelect(args: any) {
    console.log('Selected point:', args);
  }
}
```

### Track Selected Items

```typescript
@Component({
  template: `
    <div>
      <div>Selected: {{ selectedItems }}</div>
      <ejs-chart3d (pointRender)="trackSelection($event)" [primaryXAxis]='primaryXAxis'>
        <e-chart3d-series-collection>
          <e-chart3d-series 
            [dataSource]="data" 
            xName="x" 
            yName="y" 
            type="Column"
            [selectionMode]="'MultiPointSelect'">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class TrackSelectionComponent {
  primaryXAxis = {
        valueType: 'Category'
  }
  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 },
    { x: 'C', y: 60 }
  ];

  selectedItems = '';

  trackSelection(args: any) {
    if (args.selected) {
      this.selectedItems = `Point ${args.data.x}: ${args.data.y}`;
    }
  }
}
```

## Highlight on Hover

### Enable Highlight

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          type="Column"
          [highlight]="highlight">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class HighlightComponent {
  primaryXAxis = {
        valueType: 'Category'
  }
  data = [{ x: 'A', y: 40 }];

  highlight = {
    enable: true,
    color: 'rgba(200, 200, 200, 0.5)'  // Highlight color on hover
  };
}
```

## Programmatic Selection

### Select by Index

```typescript
@Component({
  template: `
    <div>
      <button (click)="selectPoint(1)">Select Point B</button>
      <button (click)="clearSelection()">Clear Selection</button>
      
      <ejs-chart3d #chart>
        <e-chart3d-series-collection>
          <e-chart3d-series 
            [dataSource]="data" 
            xName="x" 
            yName="y" 
            type="Column"
            [selectionMode]="'Point'">
          </e-chart3d-series>
        </e-chart3d-series-collection>
      </ejs-chart3d>
    </div>
  `
})
export class ProgrammaticSelectionComponent {
  @ViewChild('chart') chart!: Chart3DComponent;

  primaryXAxis = {
        valueType: 'Category'
  }

  data = [
    { x: 'A', y: 40 },
    { x: 'B', y: 50 },
    { x: 'C', y: 60 }
  ];

  selectPoint(index: number) {
    if (this.chart) {
      this.chart.selection([{ series: 0, point: index }]);
    }
  }

  clearSelection() {
    if (this.chart) {
      this.chart.selection([]);
    }
  }
}
```

## Common Selection Patterns

### Pattern 1: Single Selection with Details

Show details for selected point:

```typescript
selectionMode = 'Point';

onSelect(args: any) {
  this.selectedData = args.data;
  this.showDetailsPanel = true;
}
```

### Pattern 2: Multi-Selection for Comparison

Allow selecting multiple points:

```typescript
selectionMode = 'MultiPointSelect';
selectedPoints: any[] = [];

onSelect(args: any) {
  if (args.selected) {
    this.selectedPoints.push(args.data);
  }
}
```

### Pattern 3: Series-Level Actions

Act on entire series:

```typescript
selectionMode = 'Series';

onSeriesSelect(args: any) {
  console.log(`Series ${args.series.name} selected`);
}
```

## Accessibility Considerations

Selection should be:
- **Keyboard accessible:** Tab/Arrow keys to navigate
- **Visible:** Clear visual feedback
- **Announced:** Screen reader compatible
- **Intuitive:** Follow standard UI patterns

## Performance Notes

- Keep selection styling simple
- Avoid complex calculations on selection
- Cache selected indices
- Consider debouncing selection events for large datasets

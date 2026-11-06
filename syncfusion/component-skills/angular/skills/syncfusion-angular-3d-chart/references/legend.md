# Legend

Configure and customize chart legends for series identification.

## Table of Contents

- [Enable Legend](#enable-legend)
  - [Basic Legend](#basic-legend)
  - [Disable Legend](#disable-legend)
- [Legend Positioning](#legend-positioning)
  - [Position Options](#position-options)
  - [Example Positions](#example-positions)
- [Legend Customization](#legend-customization)
  - [Custom Legend Height and Width](#custom-legend-height-and-width)
  - [Legend Padding and Margin](#legend-padding-and-margin)
- [Legend Styling](#legend-styling)
  - [Background and Border](#background-and-border)
  - [Shape and Icon Customization](#shape-and-icon-customization)
- [Legend Label Formatting](#legend-label-formatting)
  - [Custom Labels](#custom-labels)
- [Legend Interactions](#legend-interactions)
  - [Enable Legend Selection](#enable-legend-selection)
- [Legend with Multiple Series](#legend-with-multiple-series)
  - [Multi-Series Chart](#multi-series-chart)
- [Legend Wrapping](#legend-wrapping)
  - [Arrange Legend Items in Columns](#arrange-legend-items-in-columns)
- [Common Legend Patterns](#common-legend-patterns)
  - [Pattern 1 Top Legend with Multiple Series](#pattern-1-top-legend-with-multiple-series)
  - [Pattern 2 Right Legend Default](#pattern-2-right-legend-default)
  - [Pattern 3 Bottom Legend with Horizontal Layout](#pattern-3-bottom-legend-with-horizontal-layout)
- [Accessibility Considerations](#accessibility-considerations)
- [Performance Notes](#performance-notes)
- [Legend with Data Labels](#legend-with-data-labels)


## Enable Legend

### Basic Legend

```typescript
import { Component } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <ejs-chart3d [legendSettings]="legend" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="series1" xName="x" yName="y" name="Series 1" type="Column">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="series2" xName="x" yName="y" name="Series 2" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class LegendComponent {
  series1 = [{ x: 'A', y: 40 }];
  series2 = [{ x: 'A', y: 35 }];

  legend = {
    visible: true
  };

  primaryXAxis = {
        valueType: 'Category'
  }
}
```

### Disable Legend

```typescript
legend = {
  visible: false
};
```

## Legend Positioning

### Position Options

Available positions for the legend:

- **`'Right'`**: Right side (default)
- **`'Left'`**: Left side
- **`'Top'`**: Top
- **`'Bottom'`**: Bottom
- **`'Custom'`**: Custom position

### Example Positions

```typescript
// Right side (default)
legend = {
  visible: true,
  position: 'Right'
};

// Top side
legend = {
  visible: true,
  position: 'Top'
};

// Bottom side
legend = {
  visible: true,
  position: 'Bottom'
};

// Left side
legend = {
  visible: true,
  position: 'Left'
};
```

## Legend Customization

### Custom Legend Height and Width

```typescript
@Component({
  template: `
    <ejs-chart3d [legendSettings]="legend" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" name="Data" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class CustomLegendComponent {
  primaryXAxis = {
        valueType: 'Category'
  }

  data = [{ x: 'A', y: 40 }];

  legend = {
    visible: true,
    width: '200px',
    height: '100px',
    position: 'Right'
  };
}
```

### Legend Padding and Margin

```typescript
legend = {
  visible: true,
  padding: 10,
  margin: { left: 10, right: 10, top: 10, bottom: 10 }
};
```

## Legend Styling

### Background and Border

```typescript
@Component({
  template: `
    <ejs-chart3d [legendSettings]="legend" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="x" yName="y" name="Series" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class StyledLegendComponent {
  primaryXAxis = {
        valueType: 'Category'
  }

  data = [{ x: 'A', y: 40 }];

  legend = {
    visible: true,
    background: '#f9f9f9',
    border: { color: '#999', width: 1 },
    textStyle: {
      fontFamily: 'Arial',
      fontStyle: 'Normal',
      fontWeight: '400',
      size: '14px',
      color: '#333'
    }
  };
}
```

### Shape and Icon Customization

```typescript
legend = {
  visible: true,
  shape: 'Rectangle',  // Circle, Rectangle, Triangle, Diamond
  shapeWidth: 10,
  shapeHeight: 10
};
```

## Legend Label Formatting

### Custom Labels

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="series1" xName="x" yName="y" name="Q1 Sales" type="Column">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="series2" xName="x" yName="y" name="Q2 Sales" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class CustomLabelComponent {
  primaryXAxis = {
        valueType: 'Category'
  }
  series1 = [{ x: 'A', y: 40 }];
  series2 = [{ x: 'A', y: 35 }];
}
```

The series `name` property is used as the legend label. To change, update the name:

```typescript
<e-chart3d-series 
  [dataSource]="series1" 
  xName="x" 
  yName="y" 
  name="First Quarter" 
  type="Column">
</e-chart3d-series>
```

## Legend Interactions

### Enable Legend Selection

Click legend items to toggle series visibility:

```typescript
@Component({
  template: `
    <ejs-chart3d [legendSettings]="legend" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="series1" 
          xName="x" 
          yName="y" 
          name="Series 1" 
          type="Column">
        </e-chart3d-series>
        <e-chart3d-series 
          [dataSource]="series2" 
          xName="x" 
          yName="y" 
          name="Series 2" 
          type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class InteractiveLegendComponent {
  primaryXAxis = {
        valueType: 'Category'
  }
  series1 = [{ x: 'A', y: 40 }];
  series2 = [{ x: 'A', y: 35 }];

  legend = {
    visible: true,
    toggleVisibility: true  // Click to toggle series
  };
}
```

## Legend with Multiple Series

### Multi-Series Chart

```typescript
@Component({
  template: `
    <ejs-chart3d [legendSettings]="legend" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="month" yName="sales2023" name="2023 Sales" type="Column">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="month" yName="sales2024" name="2024 Sales" type="Column">
        </e-chart3d-series>
        <e-chart3d-series [dataSource]="data" xName="month" yName="forecast" name="Forecast" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class MultiSeriesLegendComponent {
  primaryXAxis = {
        valueType: 'Category'
  }
  data = [
    { month: 'Jan', sales2023: 40, sales2024: 45, forecast: 50 },
    { month: 'Feb', sales2023: 35, sales2024: 42, forecast: 48 }
  ];

  legend = {
    visible: true,
    position: 'Bottom'
  };
}
```

## Legend Wrapping

### Arrange Legend Items in Columns

```typescript
legend = {
  visible: true,
  position: 'Right',
  width: '150px'  // Wrap items when width is limited
};
```

## Common Legend Patterns

### Pattern 1: Top Legend with Multiple Series

For wide charts:

```typescript
legend = {
  visible: true,
  position: 'Top'
};
```

### Pattern 2: Right Legend (Default)

Standard layout:

```typescript
legend = {
  visible: true,
  position: 'Right'
};
```

### Pattern 3: Bottom Legend with Horizontal Layout

For dashboard layouts:

```typescript
legend = {
  visible: true,
  position: 'Bottom'
};
```

## Accessibility Considerations

Legend should:
- **Be labeled:** Clear series names
- **Have contrast:** 4.5:1 minimum ratio
- **Be interactive:** Keyboard accessible
- **Be positioned:** Logically near chart

## Performance Notes

- Keep legend labels concise
- Limit number of series (8-10 maximum for clarity)
- Use simple shapes and styling
- Consider hiding legend on mobile with toggle

## Legend with Data Labels

Show both legend and data labels for clarity:

```typescript
@Component({
  template: `
    <ejs-chart3d [legendSettings]="legend" [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="x" 
          yName="y" 
          name="Series" 
          type="Column"
          [marker]="marker">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class CombinedLegendComponent {
  primaryXAxis = {
        valueType: 'Category'
  }
  data = [{ x: 'A', y: 40 }];

  legend = { visible: true };
  marker = { dataLabel: { visible: true } };
}
```

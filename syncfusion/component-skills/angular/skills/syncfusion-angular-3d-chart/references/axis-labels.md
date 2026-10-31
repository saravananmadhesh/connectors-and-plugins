# Axis Labels

This guide covers formatting, positioning, and customizing axis labels in 3D charts.

## Table of Contents

- [Label Formatting](#label-formatting)
  - [Basic Label Format](#basic-label-format)
  - [Label Format Patterns](#label-format-patterns)
  - [Decimal Places](#decimal-places)
  - [Percentage Format](#percentage-format)
  - [Currency Format](#currency-format)
- [Label Positioning](#label-positioning)
  - [Label Rotation](#label-rotation)
  - [Label Positioning Options](#label-positioning-options)
  - [Vertical Positioning](#vertical-positioning)
- [Custom Label Templates](#custom-label-templates)
  - [Template-based Labels](#template-based-labels)
  - [DateTime Label Formats](#datetime-label-formats)
- [Label Styling](#label-styling)
  - [Color and Font](#color-and-font)
  - [Grid Line Styling](#grid-line-styling)
- [Label Display Options](#label-display-options)
  - [Hide Labels](#hide-labels)
  - [Label Count](#label-count)
  - [Interval Control](#interval-control)
- [Common Label Patterns](#common-label-patterns)
  - [Pattern Currency Display](#pattern-currency-display)
  - [Pattern Percentage Display](#pattern-percentage-display)
  - [Pattern Abbreviated Large Numbers](#pattern-abbreviated-large-numbers)
  - [Pattern Date Range on Category Axis](#pattern-date-range-on-category-axis)
- [Accessibility Considerations](#accessibility-considerations)
- [Performance Tips](#performance-tips)

## Label Formatting

### Basic Label Format

Format axis labels with custom patterns:

```typescript
import { Component } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-axis-labels',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <ejs-chart3d [primaryYAxis]="yAxis" [primaryXAxis]="xAxis">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="month" yName="sales" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class AxisLabelsComponent {
  data = [
    { month: 'Jan', sales: 1000 },
    { month: 'Feb', sales: 1500 }
  ];

  yAxis = {
    labelFormat: '${value}',  // Add currency symbol
    title: 'Sales'
  };

  xAxis = {
    valueType: 'Category'
  };
}
```

### Label Format Patterns

| Pattern | Example | Result |
|---------|---------|--------|
| `${value}` | 1000 | $1000 |
| `{value}%` | 50 | 50% |
| `{value}K` | 1000 | 1000K |
| `{value:N2}` | 1000 | 1000.00 |
| `Value: {value}` | 500 | Value: 500 |

### Decimal Places

```typescript
yAxis = {
  labelFormat: '{value:N2}'  // 2 decimal places
};
```

### Percentage Format

```typescript
yAxis = {
  labelFormat: '{value}%',
  minimum: 0,
  maximum: 100,
  interval: 20
};
```

### Currency Format

```typescript
yAxis = {
  labelFormat: '${value}'  // Dollar symbol
  // OR
  labelFormat: '€{value}'  // Euro symbol
};
```

## Label Positioning

### Label Rotation

Rotate labels to avoid overlap (useful for long category names):

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]="xAxis">
      ...
    </ejs-chart3d>
  `
})
export class RotatedLabelsComponent {
  xAxis = {
    valueType: 'Category',
    labelRotationAngle: 45,  // Degrees
    title: 'Categories'
  };
}
```

### Label Positioning Options

```typescript
xAxis = {
  labelRotationAngle: 45,      // Rotation angle
  labelIntersectAction: 'Trim', // How to handle overlap
  placeNextToAxisLine: true     // Position next to axis
};
```

**labelIntersectAction Options:**
- `'Trim'`: Trim labels
- `'Rotate'`: Automatically rotate
- `'Hide'`: Hide overlapping labels
- `'Wrap'`: Wrap text to multiple lines
- `'MultipleRows'`: Show in multiple rows

### Vertical Positioning

Position labels above or below the axis:

```typescript
xAxis = {
  labelPosition: 'Inside',   // Inside the chart
  // OR
  labelPosition: 'Outside'   // Outside the chart
};
```

## Custom Label Templates

### Template-based Labels

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]="xAxis">
      <e-chart3d-series-collection>
        <e-chart3d-series [dataSource]="data" xName="date" yName="sales" type="Column">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class CustomLabelsComponent {
  data = [
    { date: new Date(2024, 0, 1), sales: 40 },
    { date: new Date(2024, 1, 1), sales: 50 }
  ];

  xAxis = {
    valueType: 'DateTime',
    intervalType: 'Months',
    labelFormat: 'MMM yyyy',  // January 2024 style
    title: 'Time Period'
  };
}
```

### DateTime Label Formats

| Format | Result |
|--------|--------|
| `MMM` | Jan |
| `MMMM` | January |
| `dd` | 01 |
| `dd/MM/yyyy` | 01/01/2024 |
| `MMM yyyy` | Jan 2024 |
| `yyyy-MM-dd` | 2024-01-01 |

## Label Styling

### Color and Font

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryYAxis]="yAxis">
      ...
    </ejs-chart3d>
  `
})
export class StyledLabelsComponent {
  yAxis = {
    labelStyle: {
      fontFamily: 'Arial',
      fontStyle: 'Normal',
      fontWeight: '600',
      size: '14px',
      color: '#0066cc'
    }
  };
}
```

### Grid Line Styling

```typescript
yAxis = {
  majorGridLines: {
    width: 1,
    color: '#d3d3d3',
    dashArray: '5,5'  // Dashed lines
  },
  minorGridLines: {
    width: 1,
    color: '#f0f0f0'
  }
};
```

## Label Display Options

### Hide Labels

```typescript
xAxis = {
  visible: true,
  labelVisible: false  // Hide all labels
};
```

### Label Count

Control how many labels display:

```typescript
xAxis = {
  desiredIntervals: 5,  // Approximate number of labels
  valueType: 'Category'
};
```

### Interval Control

```typescript
yAxis = {
  valueType: 'Double',
  interval: 10,           // Major label interval
  minorTicksPerInterval: 4 // Minor ticks between labels
};
```

## Common Label Patterns

### Pattern: Currency Display

For financial data:

```typescript
yAxis = {
  labelFormat: '${value}',
  title: 'Amount'
};
```

### Pattern: Percentage Display

For ratio/proportion data:

```typescript
yAxis = {
  labelFormat: '{value}%',
  minimum: 0,
  maximum: 100
};
```

### Pattern: Abbreviated Large Numbers

For millions/billions:

```typescript
yAxis = {
  labelFormat: '{value}M',  // Millions
  // OR
  labelFormat: '{value}B'   // Billions
};
```

### Pattern: Date Range on Category Axis

For time-based categories:

```typescript
xAxis = {
  valueType: 'DateTime',
  intervalType: 'Months',
  interval: 1,
  labelFormat: 'MMM yyyy'
};
```

## Accessibility Considerations

Labels should be:
- **Clear:** Use descriptive, readable text
- **Contrasted:** Ensure sufficient color contrast
- **Readable:** Font size ≥ 12px
- **Meaningful:** Format numbers appropriately for context

## Performance Tips

- Reduce label count for dense data using `desiredIntervals`
- Use `labelIntersectAction` to prevent overlap
- Avoid long custom templates
- Use simple number formats over complex processing

# Data Labels

## Table of Contents

- [Overview](#overview)
  - [API Reference](#api-reference)
- [Enable Data Labels](#enable-data-labels)
  - [Basic Data Labels](#basic-data-labels)
  - [Data Label Configuration](#data-label-configuration)
- [Label Positioning](#label-positioning)
  - [Position Options](#position-options)
  - [Example Top-Positioned Labels](#example-top-positioned-labels)
  - [Example Auto-Positioned Labels](#example-auto-positioned-labels)
- [Label Formatting](#label-formatting)
  - [Format Numeric Values](#format-numeric-values)
  - [Decimal Places](#decimal-places)
- [Custom Templates](#custom-templates)
  - [HTML Template](#html-template)
  - [Conditional Formatting](#conditional-formatting)
- [Visibility Control](#visibility-control)
  - [Hide Specific Labels](#hide-specific-labels)
  - [Show Labels Only for MaxMin Values](#show-labels-only-for-maxmin-values)
- [Data Label Styling](#data-label-styling)
  - [Font and Color](#font-and-color)
  - [Background and Border](#background-and-border)
- [Common Patterns](#common-patterns)
  - [Pattern 1 Simple Value Labels](#pattern-1-simple-value-labels)
  - [Pattern 2 Currency Values](#pattern-2-currency-values)
  - [Pattern 3 Percentage Labels](#pattern-3-percentage-labels)
  - [Pattern 4 Combined Labels](#pattern-4-combined-labels)
- [Performance Considerations](#performance-considerations)
- [Accessibility Notes](#accessibility-notes)


## Overview

### API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)


Data labels display values directly on chart points, making exact values immediately visible without hovering.

## Enable Data Labels

### Basic Data Labels

Enable labels for all data points:

```typescript
import { Component } from '@angular/core';
import { Chart3DAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-data-labels',
  standalone: true,
  imports: [Chart3DAllModule],
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="month" 
          yName="sales" 
          type="Column"
          [marker]="marker">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class DataLabelsComponent {
  data = [
    { month: 'Jan', sales: 40 },
    { month: 'Feb', sales: 50 },
    { month: 'Mar', sales: 45 }
  ];

  marker = {
    dataLabel: { visible: true }
  };

  primaryXAxis = {
    valueType: 'Category'
  }
}
```

### Data Label Configuration

```typescript
marker = {
  dataLabel: {
    visible: true,
    position: 'Top',      // Position
    font: { size: '14px' } // Font size
  }
};
```

## Label Positioning

### Position Options

Available positions for data labels:

- **`'Top'`**: Above the point
- **`'Bottom'`**: Below the point
- **`'Left'`**: Left of the point
- **`'Right'`**: Right of the point
- **`'Middle'`**: Center of the point
- **`'Auto'`**: Automatically chosen

### Example: Top-Positioned Labels

```typescript
marker = {
  dataLabel: {
    visible: true,
    position: 'Top'
  }
};
```

### Example: Auto-Positioned Labels

```typescript
marker = {
  dataLabel: {
    visible: true,
    position: 'Auto'  // Optimally placed to avoid overlap
  }
};
```

## Label Formatting

### Format Numeric Values

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
          [marker]="marker">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class FormattedLabelsComponent {
  data = [
    { x: 'A', y: 1000 },
    { x: 'B', y: 1500 }
  ];

  primaryXAxis = {
    valueType: 'Category'
  }

  marker = {
    dataLabel: {
      visible: true,
      format: '${value}',  // Currency
      // OR
      format: '{value}%',  // Percentage
      // OR
      format: '{value}K'   // Thousands
    }
  };
}
```

### Decimal Places

```typescript
marker = {
  dataLabel: {
    visible: true,
    format: '{value:N2}'  // 2 decimal places
  }
};
```

## Custom Templates

### HTML Template

Create custom label appearance:

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
          [marker]="marker">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class TemplateLabelsComponent {
  data = [
    { x: 'A', y: 100, category: 'High' },
    { x: 'B', y: 50, category: 'Medium' }
  ];

  primaryXAxis = {
    valueType: 'Category'
  }

  marker = {
    dataLabel: {
      visible: true,
      template: '<div><b>${x}</b>: ${y}</div>'
    }
  };
}
```

### Conditional Formatting

Display labels only for specific values:

```typescript
marker = {
  dataLabel: {
    visible: true,
    format: '{value}',
    // Only show labels for values > 50
    textMappingName: 'category'
  }
};
```

## Visibility Control

### Hide Specific Labels

```typescript
data = [
  { month: 'Jan', sales: 40, showLabel: true },
  { month: 'Feb', sales: 50, showLabel: false },
  { month: 'Mar', sales: 45, showLabel: true }
];

marker = {
  dataLabel: {
    visible: true
  }
};
```

### Show Labels Only for Max/Min Values

```typescript
@Component({
  template: `
    <ejs-chart3d [primaryXAxis]='primaryXAxis'>
      <e-chart3d-series-collection>
        <e-chart3d-series 
          [dataSource]="data" 
          xName="month" 
          yName="sales" 
          type="Column"
          [marker]="marker">
        </e-chart3d-series>
      </e-chart3d-series-collection>
    </ejs-chart3d>
  `
})
export class MinMaxLabelsComponent {
  data = [
    { month: 'Jan', sales: 40 },
    { month: 'Feb', sales: 80 },  // Max
    { month: 'Mar', sales: 45 },
    { month: 'Apr', sales: 20 }   // Min
  ];

  primaryXAxis = {
    valueType: 'Category'
  }

  marker = {
    dataLabel: {
      visible: true,
      format: '{value}',
      name: 'sales'
    }
  };
}
```

## Data Label Styling

### Font and Color

```typescript
marker = {
  dataLabel: {
    visible: true,
    font: {
      fontFamily: 'Arial',
      fontStyle: 'Normal',
      fontWeight: '600',
      size: '14px',
      color: '#0066cc'
    }
  }
};
```

### Background and Border

```typescript
marker = {
  dataLabel: {
    visible: true,
    border: {
      color: '#999',
      width: 1
    },
    fill: '#fff9e6',
    opacity: 0.8
  }
};
```

## Common Patterns

### Pattern 1: Simple Value Labels

For bar and column charts showing quantities:

```typescript
marker = {
  dataLabel: {
    visible: true,
    position: 'Top',
    format: '{value}'
  }
};
```

### Pattern 2: Currency Values

For financial data:

```typescript
marker = {
  dataLabel: {
    visible: true,
    position: 'Top',
    format: '${value}',
    font: { size: '12px' }
  }
};
```

### Pattern 3: Percentage Labels

For composition charts:

```typescript
marker = {
  dataLabel: {
    visible: true,
    position: 'Middle',
    format: '{value}%'
  }
};
```

### Pattern 4: Combined Labels

Show both category and value:

```typescript
marker = {
  dataLabel: {
    visible: true,
    format: '${x}: ${value}',
    position: 'Top'
  }
};
```

## Performance Considerations

- **Many Points:** Hide labels or use sparse positioning
- **Small Charts:** Use smaller font sizes
- **Dense Data:** Use Auto position for collision avoidance
- **Mobile:** Consider label visibility at smaller screen sizes

## Accessibility Notes

Data labels improve readability by:
- Eliminating need to read axis values
- Making exact values clear
- Supporting users with vision challenges

Ensure:
- Sufficient contrast ratio (4.5:1 minimum)
- Font size readable (12px minimum)
- Labels don't overlap critically

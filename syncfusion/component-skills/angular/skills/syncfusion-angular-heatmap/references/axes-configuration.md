# Axes Configuration

**API Reference:** [references/api-reference.md](references/api-reference.md)

## Table of Contents

- [Axis Types Overview](#axis-types-overview)
- [Category Axes](#category-axes)
  - [Basic Category Setup](#basic-category-setup)
  - [Categorical with Many Labels](#categorical-with-many-labels)
- [Numeric Axes](#numeric-axes)
  - [Basic Numeric Setup](#basic-numeric-setup)
  - [Numeric Axis with Custom Ranges](#numeric-axis-with-custom-ranges)
- [DateTime Axes](#datetime-axes)
  - [Basic DateTime Setup](#basic-datetime-setup)
  - [DateTime with Different Intervals](#datetime-with-different-intervals)
  - [DateTime Label Formats](#datetime-label-formats)
- [Axis Customization](#axis-customization)
  - [Axis Titles and Labels](#axis-titles-and-labels)
  - [Axis Intervals and Ranges](#axis-intervals-and-ranges)
  - [Axis Label Styling](#axis-label-styling)
- [Inverted and Opposed Axes](#inverted-and-opposed-axes)
  - [Inverted Axes](#inverted-axes)
  - [Opposed Axes](#opposed-axes)
- [Axis Edge Cases](#axis-edge-cases)
  - [Missing Data Points](#missing-data-points)
  - [Very Long Labels](#very-long-labels)
  - [High-Cardinality Axes](#high-cardinality-axes)

## Axis Types Overview

HeatMap supports three axis types to handle different data scenarios:

| Axis Type | Use Case | Example Data |
|-----------|----------|--------------|
| **Category** | Categorical, text labels | Products, regions, quarters |
| **Numeric** | Numeric indices | Row/column numbers |
| **DateTime** | Time-based data | Dates, times, months |

## Category Axes

Use Labels type for product names, regions, quarters, or Object text categories.

### Basic Category Setup

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, LegendService, TooltipService, AdaptorService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [LegendService, TooltipService, AdaptorService],
    template: `
        <ejs-heatmap 
            id='container' 
            style="display:block;" 
            [dataSource]='dataSource' 
            [xAxis]='xAxis' 
            [yAxis]='yAxis'>
        </ejs-heatmap>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    // 12 Outer Arrays (X-Axis) x 6 Inner Values (Y-Axis)
    public dataSource: number[][] = [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79],
        [56, 69, 21, 86, 3, 33],
        [45, 7, 53, 81, 95, 79],
        [60, 77, 74, 68, 88, 51],
        [25, 25, 10, 12, 78, 14],
        [25, 56, 55, 58, 12, 82],
        [74, 33, 88, 23, 86, 59]
    ];

    public xAxis: Object = {
        valueType: 'Category',
        // Must match the 12 rows of the outer array
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 
                 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
    };

    public yAxis: Object = {
        valueType: 'Category',
        // Must match the 6 columns of the inner array
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    };
}
```

### Categorical with Many Labels

```typescript
xAxis: Object = {
    valueType: "Category",
    labels: [
        'Product A', 'Product B', 'Product C', 'Product D',
        'Product E', 'Product F', 'Product G', 'Product H'
    ]
};
```

## Numeric Axes

Use Numeric type for numeric indices and ranges.

### Basic Numeric Setup

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { 
    HeatMapModule, 
    LegendService, 
    TooltipService, 
    AdaptorService 
} from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [LegendService, TooltipService, AdaptorService],
    template: `
        <ejs-heatmap 
            id='container' 
            style="display:block;" 
            [dataSource]='dataSource' 
            [xAxis]='xAxis' 
            [yAxis]='yAxis'>
        </ejs-heatmap>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    // 12 rows (X-Axis: 0-11) x 6 columns (Y-Axis: 0-5)
    public dataSource: number[][] = [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79],
        [56, 69, 21, 86, 3, 33],
        [45, 7, 53, 81, 95, 79],
        [60, 77, 74, 68, 88, 51],
        [25, 25, 10, 12, 78, 14],
        [25, 56, 55, 58, 12, 82],
        [74, 33, 88, 23, 86, 59]
    ];

    public xAxis: Object = {
        valueType: "Numeric",
        minimum: 0,
        maximum: 11,
        increment: 1
    };

    public yAxis: Object = {
        valueType: "Numeric",
        minimum: 0,
        maximum: 5,
        increment: 1
    };
}
```

### Numeric Axis with Custom Ranges

```typescript
xAxis: Object = {
    valueType: 'Numeric',
    minimum: 2020,
    maximum: 2025,
    interval: 1,
    labels: ['2020', '2021', '2022', '2023', '2024', '2025']
};
```

## DateTime Axes

Use DateTime type for time-series data and temporal analysis.

### Basic DateTime Setup

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { 
    HeatMapModule, 
    LegendService, 
    TooltipService, 
    AdaptorService 
} from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [LegendService, TooltipService, AdaptorService],
    template: `
        <ejs-heatmap 
            id='container' 
            style="display:block;" 
            [dataSource]='dataSource' 
            [xAxis]='xAxis' 
            [yAxis]='yAxis'
            [titleSettings]='titleSettings' 
            [legendSettings]='legendSettings' 
            [cellSettings]='cellSettings'>
        </ejs-heatmap>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    // 11 Rows (Years 2007-2017) x 12 Columns (Months Jan-Dec)
    public dataSource: number[][] = [
        [36371, 25675, 28292, 33399, 35980, 38585, 39351, 39964, 36543, 30529, 33298, 36985],
        [34702, 27618, 31063, 34525, 36772, 35410, 38750, 39467, 35390, 34196, 35302, 35703],
        [34522, 31324, 32128, 34231, 36817, 34381, 37180, 38255, 32776, 32645, 31539, 32981],
        [32213, 28755, 29517, 31214, 33747, 33507, 35763, 36837, 32910, 33437, 30659, 31965],
        [31282, 28663, 32952, 33941, 34506, 36875, 38836, 35497, 34285, 34094, 32256, 33699],
        [31714, 29405, 33745, 32838, 33461, 35034, 36122, 37943, 34128, 30624, 32398, 33522],
        [32064, 28387, 33751, 32537, 34034, 35977, 37196, 38301, 33627, 34115, 31072, 33939],
        [32417, 27868, 30807, 33386, 35284, 36126, 39753, 40978, 35777, 35277, 31281, 35411],
        [32494, 29848, 34385, 35804, 37943, 38722, 41315, 41335, 37177, 37443, 32457, 37304],
        [34378, 29576, 30547, 35664, 36622, 38145, 40347, 41868, 38252, 36505, 29576, 36450],
        [35219, 31670, 32589, 34927, 36998, 39825, 41126, 42002, 37021, 36583, 32408, 37108]
    ];

    public titleSettings: Object = {
        text: 'Monthly Flight Traffic at JFK Airport',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontFamily: 'Segoe UI'
        }
    };

    public xAxis: Object = {
        valueType: "DateTime",
        minimum: new Date(2007, 0, 1),
        maximum: new Date(2017, 0, 1),
        intervalType: "Years",
        labelFormat: "yyyy",
        labelRotation: 45
    };

    public yAxis: Object = {
        valueType: 'Category',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    };

    public legendSettings: Object = {
        visible: false
    };

    public cellSettings: Object = {
        showLabel: false,
        border: { width: 0 },
        format: '{value} flights'
    };
}
```

### DateTime with Different Intervals

```typescript
// Daily data
xAxis: Object = {
    valueType: "DateTime",
    intervalType: 'Days',
    interval: 1,
    labelFormat: 'MMM dd'
};

// Monthly data
xAxis: Object = {
    valueType: "DateTime",
    intervalType: 'Months',
    interval: 1,
    labelFormat: 'MMM yyyy'
};

// Quarterly data
xAxis: Object = {
    valueType: "DateTime",
    intervalType: 'Quarters',
    interval: 1,
    labelFormat: 'Q# yyyy'
};

// Hourly data
xAxis: Object = {
    valueType: "DateTime",
    intervalType: 'Hours',
    interval: 6,  // Every 6 hours
    labelFormat: 'HH:mm'
};
```

### DateTime Label Formats

```typescript
// Common date format patterns
labelFormat: 'MMM dd'        // "Jan 01", "Feb 15"
labelFormat: 'dd/MM/yyyy'    // "01/01/2024"
labelFormat: 'yyyy-MM-dd'    // "2024-01-01"
labelFormat: 'HH:mm'         // "14:30", "09:15"
labelFormat: 'd MMM'         // "1 Jan", "15 Feb"
labelFormat: 'ddd'           // "Mon", "Tue", "Wed"
```

## Axis Customization

### Axis Titles and Labels

```typescript
xAxis: Object = {
    valueType: "Category",
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    title: { text: 'Months' },
    labelRotation: 45,  // Rotate labels by 45 degrees
    labelIntersectAction: 'Trim'  // Trim long labels
};

yAxis: Object = {
    valueType: "Category",
    labels: ['Region A', 'Region B', 'Region C'],
    title: { text: 'Sales Regions' }
};
```

### Axis Intervals and Ranges

```typescript
// Numeric axis with custom intervals
xAxis: Object = {
    valueType: 'Numeric',
    minimum: 0,
    maximum: 100,
    interval: 20,  // Show 0, 20, 40, 60, 80, 100
    majorGridLines: { width: 0 }
};

// DateTime axis with interval control
xAxis: Object = {
    valueType: "DateTime",
    intervalType: 'Days',
    interval: 7,  // Show every 7 days
    labelFormat: 'MMM dd'
};
```

### Axis Label Styling

```typescript
xAxis: Object = {
    valueType: "Category",
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    textStyle: {
        color: '#4472C4',
        size: '14px',
        fontFamily: 'Segoe UI'
    },
    title: {
        text: 'Quarters',
        textStyle: {
            color: '#333',
            size: '16px',
            bold: true
        }
    }
};
```

## Inverted and Opposed Axes

### Inverted Axes

Flip axis direction to show data in reverse order.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { 
    HeatMapModule, 
    LegendService, 
    TooltipService, 
    AdaptorService 
} from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [LegendService, TooltipService, AdaptorService],
    template: `
        <ejs-heatmap 
            id='container' 
            style="display:block;" 
            [dataSource]='dataSource' 
            [xAxis]='xAxis' 
            [yAxis]='yAxis'
            [titleSettings]='titleSettings' 
            [legendSettings]='legendSettings' 
            [cellSettings]='cellSettings'>
        </ejs-heatmap>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    // 11 Year Rows (X-Axis) x 12 Month Columns (Y-Axis)
    public dataSource: number[][] = [
        [36371, 25675, 28292, 33399, 35980, 38585, 39351, 39964, 36543, 30529, 33298, 36985],
        [34702, 27618, 31063, 34525, 36772, 35410, 38750, 39467, 35390, 34196, 35302, 35703],
        [34522, 31324, 32128, 34231, 36817, 34381, 37180, 38255, 32776, 32645, 31539, 32981],
        [32213, 28755, 29517, 31214, 33747, 33507, 35763, 36837, 32910, 33437, 30659, 31965],
        [31282, 28663, 32952, 33941, 34506, 36875, 38836, 35497, 34285, 34094, 32256, 33699],
        [31714, 29405, 33745, 32838, 33461, 35034, 36122, 37943, 34128, 30624, 32398, 33522],
        [32064, 28387, 33751, 32537, 34034, 35977, 37196, 38301, 33627, 34115, 31072, 33939],
        [32417, 27868, 30807, 33386, 35284, 36126, 39753, 40978, 35777, 35277, 31281, 35411],
        [32494, 29848, 34385, 35804, 37943, 38722, 41315, 41335, 37177, 37443, 32457, 37304],
        [34378, 29576, 30547, 35664, 36622, 38145, 40347, 41868, 38252, 36505, 29576, 36450],
        [35219, 31670, 32589, 34927, 36998, 39825, 41126, 42002, 37021, 36583, 32408, 37108]
    ];

    public titleSettings: Object = {
        text: 'Monthly Flight Traffic at JFK Airport',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontFamily: 'Segoe UI'
        }
    };

    public xAxis: Object = {
        valueType: "DateTime",
        minimum: new Date(2007, 0, 1),
        maximum: new Date(2017, 0, 1),
        intervalType: "Years",
        labelFormat: "yyyy",
        labelRotation: 45,
        isInversed: true // Flips the axis from Right-to-Left
    };

    public yAxis: Object = {
        valueType: 'Category',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    };

    public legendSettings: Object = {
        visible: false
    };

    public cellSettings: Object = {
        showLabel: false,
        border: { width: 0 },
        format: '{value} flights'
    };
}
```

**When to use:** 
- Right-to-left layouts or RTL languages
- Bottom-to-top progression preferred
- Data organization requires reversal

### Opposed Axes

Position axes on opposite sides (unusual but supported).

```typescript
xAxis: Object = {
    valueType: "Category",
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    opposedPosition: true  // X-axis at top
};

yAxis: Object = {
    valueType: "Category",
    labels: ['North', 'South', 'East'],
    opposedPosition: true  // Y-axis at right
};
```

**When to use:**
- Multiple heatmaps side-by-side
- Special layout requirements
- Custom UI arrangements

## Axis Edge Cases

### Missing Data Points

If your data doesn't have values for all axis combinations:

```typescript
dataSource: Object[] = [
    { Product: 'A', Quarter: 'Q1', Sales: 100 },
    { Product: 'A', Quarter: 'Q2', Sales: 120 },
    // Q3 and Q4 for Product A missing - cells will be empty
    { Product: 'B', Quarter: 'Q1', Sales: 90 },
    { Product: 'B', Quarter: 'Q2', Sales: 110 }
];
```

**Solution:** Ensure complete grid or use `valueBound` for color mapping.

### Very Long Labels

Handle long axis labels:

```typescript
xAxis: Object = {
    valueType: "Category",
    labels: ['Very Long Product Name 1', 'Very Long Product Name 2'],
    labelRotation: 45,
    labelIntersectAction: 'Trim',
    labelStyle: { size: '12px' }
};
```

### High-Cardinality Axes

For many unique categories:

```typescript
// 100+ products - consider aggregation instead
// Or use numeric axis with categorical legend
yAxis: Object = {
    valueType: 'Numeric',
    minimum: 0,
    maximum: 99,
    interval: 10,
    labels: [...productNames]  // Explicitly map numbers to products
};
```


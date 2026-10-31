# Axes and Ranges Configuration in Syncfusion Angular Bullet Chart

## Table of Contents

- [Axis Customization](#axis-customization)
  - [Tick Lines Customization](#tick-lines-customization)
  - [Tick Placement Options](#tick-placement-options)
- [Label Formatting](#label-formatting)
  - [Standard Number Format](#standard-number-format)
  - [Grouping Separator](#grouping-separator)
  - [Custom Label Format](#custom-label-format)
- [Label Positioning](#label-positioning)
  - [Label Position Relative to Range](#label-position-relative-to-range)
  - [Opposed Position](#opposed-position)
  - [Label Style Customization](#label-style-customization)
- [Category Labels](#category-labels)
  - [Basic Category Labels](#basic-category-labels)
  - [Category Label Customization](#category-label-customization)
  - [Use Range Color for Labels](#use-range-color-for-labels)
- [Ranges Definition](#ranges-definition)
  - [Basic Range Setup](#basic-range-setup)
  - [How Ranges Work](#how-ranges-work)
- [Range Customization](#range-customization)
  - [Color and Opacity](#color-and-opacity)
  - [Real-World Range Examples](#real-world-range-examples)
    - [Sales Performance Ranges](#sales-performance-ranges)
    - [Employee Rating Ranges](#employee-rating-ranges)
    - [Budget Utilization Ranges](#budget-utilization-ranges)
- [Complete Axis and Ranges Example](#complete-axis-and-ranges-example)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)

## Axis Customization

The Bullet Chart axis represents the quantitative scale used to measure values. Customize the axis to meet your visualization needs.

### Tick Lines Customization

#### Major Tick Lines

Customize the appearance of major tick marks:

```typescript
<ejs-bulletchart 
    [majorTickLines]='majorTickConfig'>
</ejs-bulletchart>

// Component properties
public majorTickConfig = {
    width: 2,           // Thickness of tick line
    height: 8,          // Length of tick mark
    color: '#333333',   // Color of tick
    useRangeColor: false
};
```

#### Minor Tick Lines

Configure smaller tick marks between major ticks:

```typescript
public minorTickConfig = {
    width: 1,
    height: 4,
    color: '#999999',
    useRangeColor: false
};

template = `<ejs-bulletchart 
    [minorTickLines]='minorTickConfig'>
</ejs-bulletchart>`
```

### Tick Placement Options

Control whether ticks appear inside or outside the chart range:

```typescript
// TickPosition: 'Inside' or 'Outside' (default is 'Outside')
<ejs-bulletchart 
    tickPosition='Inside'>
</ejs-bulletchart>
```

**Example: Inside Ticks**

```typescript
<ejs-bulletchart 
    tickPosition='Inside'
    [majorTickLines]='{ width: 2, height: 8, color: "#333" }'
    [minorTickLines]='{ width: 1, height: 4, color: "#ccc" }'>
</ejs-bulletchart>
```

---

## Label Formatting

### Standard Number Format

Format axis labels using standard format codes:

```typescript
<ejs-bulletchart 
    labelFormat='n1'>
</ejs-bulletchart>
```

**Common Format Codes:**

| Format | Example Input | Output | Description |
|--------|---------------|--------|-------------|
| `n0` | 1000 | 1,000 | Integer with separator |
| `n1` | 1000 | 1,000.0 | 1 decimal place |
| `n2` | 1000 | 1,000.00 | 2 decimal places |
| `c0` | 1000 | $1,000 | Currency format |
| `c2` | 1000 | $1,000.00 | Currency with 2 decimals |
| `p0` | 0.5 | 50% | Percentage format |
| `p2` | 0.5 | 50.00% | Percentage with 2 decimals |

### Grouping Separator

Add thousand separators to axis labels:

```typescript
<ejs-bulletchart 
    labelFormat='n0'
    [enableGroupSeparator]='true'>
</ejs-bulletchart>
```

### Custom Label Format

Create custom formats with placeholders:

```typescript
// Use ${value} placeholder for the axis value
<ejs-bulletchart 
[labelFormat]='labelFormat'>
</ejs-bulletchart>
  export class AppComponent{
        public labelFormat: string = '${value}K';
  }

// This will convert 25 to "25K"
```

**More Custom Format Examples:**

```typescript
// Revenue format: "$1,000" becomes "$1K"
labelFormat = 'US$${value}K'

// Percentage format: "0.5" becomes "50%"
labelFormat = '${value}%'

// Score format: "85" becomes "85/100"
labelFormat = '${value}/100'
```

---

## Label Positioning

### Label Position Relative to Range

Place axis labels inside or outside the chart area:

```typescript
// 'Inside' or 'Outside' (default)
<ejs-bulletchart 
    labelPosition='Inside'>
</ejs-bulletchart>
```

### Opposed Position

Place axis on the opposite side:

```typescript
// Places axis labels on right side (for horizontal orientation)
<ejs-bulletchart 
    [opposedPosition]='true'>
</ejs-bulletchart>
```

### Label Style Customization

Customize the appearance of axis labels:

```typescript
public labelStyle = {
    color: '#333333',
    fontFamily: 'Arial',
    fontSize: '12px',
    fontWeight: '500',
    fontStyle: 'Normal',
    opacity: 1
};

template = `<ejs-bulletchart 
    [labelStyle]='labelStyle'>
</ejs-bulletchart>`
```

---

## Category Labels

Display labels for each bullet chart (e.g., product names, regions, quarters):

### Basic Category Labels

```typescript
public data = [
    { category: 'Q1 2024', value: 25000, target: 30000 },
    { category: 'Q2 2024', value: 28000, target: 30000 },
    { category: 'Q3 2024', value: 35000, target: 30000 }
];

template = `<ejs-bulletchart 
    [dataSource]='data'
    valueField='value'
    targetField='target'
    categoryField='category'>
</ejs-bulletchart>`
```

### Category Label Customization

Customize the style of category labels:

```typescript
public categoryLabelStyle = {
    color: '#444444',
    fontFamily: 'Segoe UI',
    fontSize: '13px',
    fontWeight: 'Bold',
    fontStyle: 'Normal'
};

template = `<ejs-bulletchart 
    [categoryLabelStyle]='categoryLabelStyle'>
</ejs-bulletchart>`
```

### Use Range Color for Labels

Apply colors from ranges to category labels:

```typescript
public categoryLabelStyle = {
    useRangeColor: true  // Labels inherit range colors
};
```

---

## Ranges Definition

Ranges represent quality zones in the Bullet Chart (e.g., Poor, Satisfactory, Good).

### Basic Range Setup

Define ranges using the `ranges` property:

```typescript
public ranges = [
    { 
        end: 50,                    // Range end value
        color: '#ffe0b2',          // Background color
        opacity: 0.6                // Transparency
    },
    { 
        end: 100,
        color: '#fff9c4',
        opacity: 0.6
    },
    { 
        end: 150,
        color: '#c8e6c9',
        opacity: 0.6
    }
];

template = `<ejs-bulletchart 
    [minimum]='0'
    [maximum]='150'
    [ranges]='ranges'>
</ejs-bulletchart>`
```

### How Ranges Work

1. The chart minimum value is the start of the first range (default 0)
2. Each range's `end` property defines where that range ends
3. The next range starts where the previous one ended
4. Ranges are typically ordered: Poor → Satisfactory → Good

**Example Range Structure:**

```typescript
// If minimum is 0 and maximum is 100:
ranges = [
    { end: 33, color: '#ff0000' },    // 0-33: Poor (Red)
    { end: 66, color: '#ffff00' },    // 33-66: Fair (Yellow)
    { end: 100, color: '#00ff00' }    // 66-100: Good (Green)
];
```

---

## Range Customization

### Color and Opacity

Customize range appearance:

```typescript
public ranges = [
    {
        end: 50,
        color: '#ff6b6b',           // Dark red
        opacity: 0.8                // 80% opacity
    },
    {
        end: 100,
        color: '#ffd93d',           // Bright yellow
        opacity: 0.7
    },
    {
        end: 150,
        color: '#6bcf7f',           // Green
        opacity: 0.9
    }
];
```

### Real-World Range Examples

#### Sales Performance Ranges

```typescript
// Sales targets in thousands
public salesRanges = [
    { end: 20000, color: '#ff4444' },      // Below $20K: Poor
    { end: 30000, color: '#ffbb44' },      // $20-30K: Fair
    { end: 50000, color: '#44bb44' }       // $30-50K: Good
];
```

#### Employee Rating Ranges

```typescript
// Scores out of 100
public ratingRanges = [
    { end: 60, color: '#ffcccc' },   // Below 60: Needs Improvement
    { end: 80, color: '#ffffcc' },   // 60-80: Satisfactory
    { end: 100, color: '#ccffcc' }   // 80-100: Excellent
];
```

#### Budget Utilization Ranges

```typescript
// Percentage utilization
public budgetRanges = [
    { end: 50, color: '#ff6b6b' },   // Under 50%: Under-utilized
    { end: 100, color: '#ffd93d' },  // 50-100%: Optimal
    { end: 150, color: '#ff4444' }   // Over 100%: Over-budget
];
```

---

## Complete Axis and Ranges Example

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `<ejs-bulletchart 
        id='bulletChart'
        [dataSource]='chartData'
        valueField='value'
        targetField='target'
        categoryField='category'
        [minimum]='0'
        [maximum]='100'
        title='Department Performance'
        [ranges]='ranges'
        labelFormat='n0'
        [enableGroupSeparator]='true'
        labelPosition='Outside'
        tickPosition='Outside'
        [majorTickLines]='majorTicks'
        [minorTickLines]='minorTicks'
        [labelStyle]='axisLabelStyle'
        [categoryLabelStyle]='categoryStyle'>
    </ejs-bulletchart>`
})
export class AppComponent implements OnInit {
    public chartData: any;
    public ranges: any;
    public majorTicks: any;
    public minorTicks: any;
    public axisLabelStyle: any;
    public categoryStyle: any;

    ngOnInit(): void {
        // Data with categories
        this.chartData = [
            { category: 'Sales', value: 75, target: 80 },
            { category: 'Marketing', value: 65, target: 75 },
            { category: 'Operations', value: 85, target: 80 },
            { category: 'HR', value: 70, target: 75 }
        ];

        // Define performance ranges
        this.ranges = [
            { end: 50, color: '#ffcccc', opacity: 0.8 },   // Below 50: Poor
            { end: 80, color: '#ffffcc', opacity: 0.8 },   // 50-80: Fair
            { end: 100, color: '#ccffcc', opacity: 0.8 }   // 80-100: Good
        ];

        // Major tick configuration
        this.majorTicks = {
            width: 2,
            height: 8,
            color: '#333333'
        };

        // Minor tick configuration
        this.minorTicks = {
            width: 1,
            height: 4,
            color: '#cccccc'
        };

        // Axis label styling
        this.axisLabelStyle = {
            color: '#666666',
            fontFamily: 'Arial',
            fontSize: '11px'
        };

        // Category label styling
        this.categoryStyle = {
            color: '#333333',
            fontWeight: 'Bold',
            fontSize: '12px'
        };
    }
}
```

## Best Practices

1. **Use meaningful range divisions** - Align ranges with business goals
2. **Keep label formats readable** - Don't over-complicate custom formats
3. **Ensure good color contrast** - Make ranges visually distinct
4. **Test label overflow** - Ensure long labels don't clutter the chart
5. **Match range colors to meaning** - Red for poor, Green for good
6. **Document range meanings** - Add legend or documentation for users
7. **Use opacity for layering** - Slightly transparent ranges allow visibility

## Common Patterns

**Pattern 1: Three-Zone Performance**
```typescript
ranges = [
    { end: 33 },    // Poor
    { end: 66 },    // Fair
    { end: 100 }    // Good
];
```

**Pattern 2: Traffic Light Colors**
```typescript
ranges = [
    { end: 50, color: '#ff0000' },      // Red: Poor
    { end: 100, color: '#ffff00' },     // Yellow: Fair
    { end: 150, color: '#00ff00' }      // Green: Good
];
```

**Pattern 3: Budget Zones**
```typescript
ranges = [
    { end: 75 },     // Under budget
    { end: 100 },    // On budget
    { end: 125 }     // Over budget
];
```

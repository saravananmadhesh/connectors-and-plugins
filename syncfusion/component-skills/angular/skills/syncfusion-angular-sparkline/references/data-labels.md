# Data Labels in Sparklines

Data labels display numeric values directly on or near the sparkline, improving readability without requiring tooltips.

## Table of Contents

- [Enabling Data Labels](#enabling-data-labels)
  - [Display Labels on All Points](#display-labels-on-all-points)
  - [Display Labels on Specific Points](#display-labels-on-specific-points)
  - [Label Display Options](#label-display-options)
- [Customizing Label Appearance](#customizing-label-appearance)
  - [Basic Styling](#basic-styling)
  - [Advanced Customization](#advanced-customization)
  - [Label Properties Reference](#label-properties-reference)
- [Formatting Label Text](#formatting-label-text)
  - [Default Label Behavior](#default-label-behavior)
  - [Custom Format with X and Y Values](#custom-format-with-x-and-y-values)
  - [Format String Examples](#format-string-examples)
  - [Conditional Formatting](#conditional-formatting)
- [Real-World Examples](#real-world-examples)
  - [Sales Dashboard](#sales-dashboard)
  - [KPI Tracking](#kpi-tracking)
  - [Financial Data](#financial-data)
- [Combining Labels with Markers](#combining-labels-with-markers)
- [Label Positioning](#label-positioning)
- [Edge Cases and Troubleshooting](#edge-cases-and-troubleshooting)
  - [Issue: Labels Overlapping](#issue-labels-overlapping)
  - [Issue: Labels Cut Off](#issue-labels-cut-off)
  - [Issue: Format Not Applied](#issue-format-not-applied)
  - [Issue: Labels Don't Display on Negative Values](#issue-labels-dont-display-on-negative-values)
- [Performance Considerations](#performance-considerations)


## Enabling Data Labels

### Display Labels on All Points

Show a label for every data point:

```typescript
import { SparklineModule } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core';

@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<ejs-sparkline 
    id='sparkline-container'
    [dataSource]="data"
    type="Column"
    [dataLabelSettings]="{ visible: ['All'] }"
    height="120px"
    width="250px">
  </ejs-sparkline>`
})
export class AppComponent {
  data = [2, 6, 4, 8, 5, 1, 7]
}
```

**Output:** Each column displays its numeric value.

### Display Labels on Specific Points

Show labels only for important data points:

```typescript
@Component({
  template: `<ejs-sparkline 
    [dataSource]="data"
    type="Line"
    [dataLabelSettings]="{ 
      visible: ['Start', 'End', 'High', 'Low'] 
    }">
  </ejs-sparkline>`
})
export class SpecificLabelsComponent {
  data = [10, 25, 15, 30, 20]
}
```

**Output:** Labels appear only on start, end, highest, and lowest values.

### Label Display Options

Available label options:

| Option | Purpose |
|--------|---------|
| `All` | Label all data points |
| `Start` | Label first point |
| `End` | Label last point |
| `High` | Label highest value |
| `Low` | Label lowest value |
| `Negative` | Label negative values (financial data) |

```typescript
// Show multiple label types
[dataLabelSettings]="{ 
  visible: ['High', 'Low', 'Negative'] 
}"
```

## Customizing Label Appearance

### Basic Styling

Change label colors and styling:

```typescript
@Component({
  template: `<ejs-sparkline 
    [dataSource]="data"
    type="Column"
    [dataLabelSettings]="{ 
      visible: ['All'],
      fill: '#1E88E5',           // Label background color
      border: { color: '#0D47A1' } // Border color
    }">
  </ejs-sparkline>`
})
export class StyledLabelsComponent {
  data = [50, 100, 75, 150, 120]
}
```

### Advanced Customization

Customize text style, opacity, and border:

```typescript
dataLabelSettings = {
  visible: ['High', 'Low'],
  fill: '#FFF9E6',
  opacity: 0.9,
  border: {
    color: '#FF6F00',
    width: 2
  },
  textStyle: {
    color: '#1A1A1A',
    fontFamily: 'Arial',
    fontSize: '12px',
    fontWeight: 'bold'
  }
}
```

### Label Properties Reference

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `visible` | Array | [] | Which points to label |
| `fill` | string | '#FFFFFF' | Background color |
| `opacity` | number | 1 | Transparency (0-1) |
| `border.color` | string | - | Border color |
| `border.width` | number | 0 | Border thickness |
| `textStyle.color` | string | '#000000' | Text color |
| `textStyle.fontSize` | string | '12px' | Font size |
| `textStyle.fontFamily` | string | 'Segoe UI' | Font name |
| `textStyle.fontWeight` | string | 'normal' | Font weight (bold, normal) |

## Formatting Label Text

### Default Label Behavior

By default, labels display only the Y value:

```typescript
[dataLabelSettings]="{ visible: ['All'] }"
// Displays: "10", "25", "15", "30", "20"
```

### Custom Format with X and Y Values

Display both X-axis label and Y value:

```typescript
@Component({
  template: `<ejs-sparkline 
    [dataSource]="data"
    xName="month"
    yName="sales"
    valueType="Category"
    type="Column"
    [dataLabelSettings]="dataLabelSettings">
  </ejs-sparkline>`
})
export class FormattedLabelsComponent {
  data = [
        { month: 'Jan', sales: 50 },
        { month: 'Feb', sales: 100 },
        { month: 'Mar', sales: 75 }
      ]
      dataLabelSettings = { 
        visible: ['All'],
        format: '${month}: ${sales}k'
      }
}
```

**Output:** Labels show "Jan: 50k", "Feb: 100k", "Mar: 75k"

### Format String Examples

```typescript
// Display Y value with currency
format: '${y}'

// Display X and Y with units
format: '${x}: ${y}%'

// Display Y value rounded
format: '${y:.1f}'  // Single decimal place

// Display X label only
format: '${x}'

// Custom text with values
format: 'Sales: ${y}K in ${x}'
```

### Conditional Formatting

Format labels based on values (high/low colors):

```typescript
@Component({
  template: `<ejs-sparkline 
    [dataSource]="data"
    type="Column"
    [dataLabelSettings]="labelSettings">
  </ejs-sparkline>`
})
export class ConditionalLabelsComponent {
  data = [10, 50, 30, 100, 20]
  
  labelSettings = {
    visible: ['All']
  }
}
```

## Real-World Examples

### Sales Dashboard

Display sales figures with labels on high/low points:

```typescript
@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<div>
    <h3>Monthly Sales Trend</h3>
    <ejs-sparkline 
      [dataSource]="monthlySales"
      xName="month"
      yName="amount"
      valueType="Category"
      type="Column"
      [dataLabelSettings]="{ 
        visible: ['High', 'Low'],
        fill: '#FFF',
        border: { color: '#FF6F00' }
      }"
      [markerSettings]="{ 
        visible: ['High', 'Low'],
        fill: '#FF6F00'
      }">
    </ejs-sparkline>
  </div>`
})
export class SalesDashboardComponent {
  monthlySales = [
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 7500 },
    { month: 'Mar', amount: 4200 },
    { month: 'Apr', amount: 9800 },  // High
    { month: 'May', amount: 3500 }   // Low
  ]
}
```

### KPI Tracking

Show labeled values for quick metric reading:

```typescript
@Component({
  template: `<div class="metrics">
    <ejs-sparkline 
      [dataSource]="cpuUsage"
      [dataLabelSettings]="{ 
        visible: ['End'],
        textStyle: { fontSize: '14px', fontWeight: 'bold' }
      }"
      type="Area">
    </ejs-sparkline>
  </div>`
})
export class KPITrackerComponent {
  cpuUsage = [20, 35, 45, 52, 58, 65, 72]
}
```

### Financial Data

Display formatted currency with data labels:

```typescript
@Component({
  template: `<ejs-sparkline 
    [dataSource]="quarterlyProfit"
    xName="quarter"
    yName="profit"
    type="Line"
    [dataLabelSettings]="{ 
      visible: ['All'],
      format: '${y}K',
      fill: '#E8F5E9',
      border: { color: '#4CAF50' }
    }">
  </ejs-sparkline>`
})
export class FinancialComponent {
  quarterlyProfit = [
    { quarter: 'Q1', profit: 250 },
    { quarter: 'Q2', profit: 380 },
    { quarter: 'Q3', profit: 290 },
    { quarter: 'Q4', profit: 450 }
  ]
}
```

## Combining Labels with Markers

Use labels and markers together for clear data point emphasis:

```typescript
@Component({
  template: `<ejs-sparkline 
    [dataSource]="data"
    type="Line"
    [markerSettings]="{ 
      visible: ['High', 'Low'],
      fill: '#E74C3C',
      size: 8
    }"
    [dataLabelSettings]="{ 
      visible: ['High', 'Low'],
      fill: '#FFF',
      border: { color: '#E74C3C' }
    }">
  </ejs-sparkline>`
})
export class MarkerAndLabelComponent {
  data = [10, 25, 15, 35, 20]
}
```

**Output:** High and low points display both markers and numeric labels.

## Label Positioning

Labels automatically position above or beside sparkline elements. For sparkline types:
- **Line/Area** - Labels appear above the line
- **Column** - Labels appear on top of columns
- **Pie** - Labels appear on pie slices
- **WinLoss** - Labels appear above bars

## Edge Cases and Troubleshooting

### Issue: Labels Overlapping

**Cause:** Too many labels on a small sparkline or large font size.

**Solution:**
1. Use specific label types instead of 'All':
```typescript
[dataLabelSettings]="{ visible: ['High', 'Low'] }"
```
2. Reduce font size:
```typescript
textStyle: { fontSize: '10px' }
```
3. Increase sparkline dimensions:
```typescript
height="150px"
width="300px"
```

### Issue: Labels Cut Off

**Cause:** Insufficient container space.

**Solution:** Add padding to the sparkline container or increase its height:
```html
<div style="padding: 20px; height: 200px;">
  <ejs-sparkline [dataSource]="data"></ejs-sparkline>
</div>
```

### Issue: Format Not Applied

**Cause:** Format string syntax error or `xName`/`yName` not defined.

**Solution:** Verify correct syntax:
```typescript
// ✓ Correct
format: '${x}: ${y}k'

// ✗ Wrong
format: '{x}: {y}k'  // Missing $
```

And ensure data properties are mapped:
```typescript
xName="month"  // Must match object property name
yName="value"  // Must match object property name
```

### Issue: Labels Don't Display on Negative Values

**Cause:** Using 'Negative' without negative data.

**Solution:** Ensure data contains negative values:
```typescript
// ✓ Has negatives
data = [10, -5, 15, -3, 8]

// ✗ No negatives
data = [10, 5, 15, 3, 8]
```

## Performance Considerations

- **'All' labels** - Slower with dense data (500+ points)
- **Specific labels** - Better performance; use 'High', 'Low', 'Start', 'End'
- **Format strings** - Simple formats are faster
- **Large fonts** - Can impact rendering on mobile devices

For sparklines with 1000+ points, limit labels to essential points (High, Low, Start, End).

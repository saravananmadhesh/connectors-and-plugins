# Sparkline Types

## Table of Contents

- [Overview](#overview)
- [Line Type](#line-type)
  - [When to Use Line Type](#when-to-use-line-type)
  - [Example: Stock Price Trend](#example-stock-price-trend)
  - [Customizing Line Appearance](#customizing-line-appearance)
- [Column Type](#column-type)
  - [When to Use Column Type](#when-to-use-column-type)
  - [Example: Daily Website Visits](#example-daily-website-visits)
  - [Customizing Column Appearance](#customizing-column-appearance)
- [Area Type](#area-type)
  - [When to Use Area Type](#when-to-use-area-type)
  - [Example: Monthly Revenue](#example-monthly-revenue)
- [Pie Type](#pie-type)
  - [When to Use Pie Type](#when-to-use-pie-type)
  - [Example: Market Share Distribution](#example-market-share-distribution)
  - [Understanding Pie Sparkline Data](#understanding-pie-sparkline-data)
- [Win-Loss Type](#win-loss-type)
  - [When to Use Win-Loss Type](#when-to-use-win-loss-type)
  - [Example: Test Results](#example-test-results)
  - [Simple Win-Loss with Primitives](#simple-win-loss-with-primitives)
- [Type Comparison](#type-comparison)
- [Selecting the Right Type](#selecting-the-right-type)
  - [Decision Guide](#decision-guide)
  - [Examples by Scenario](#examples-by-scenario)
  - [Performance Considerations](#performance-considerations)

## Overview

The Sparkline component supports five visualization types, each optimized for different data patterns and use cases. The type is set using the `type` property.

**Supported Types:**
- `Line` - Sequential trend visualization (default)
- `Column` - Discrete value comparison
- `Area` - Filled area with trend emphasis
- `Pie` - Proportional/compositional data
- `WinLoss` - Binary outcomes (pass/fail, win/loss)

## Line Type

Line sparklines display sequential data as a continuous line, ideal for showing trends over time.

### When to Use Line Type
- **Time series data** - Stock prices, temperatures, sensor readings
- **Trend analysis** - Sales growth, website traffic, performance metrics
- **Smooth progression** - Data with continuous values

### Example: Stock Price Trend

```typescript
import { SparklineModule } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core';

@Component({
  imports: [SparklineModule],
  standalone: true,
  selector: 'app-container',
  template: `<ejs-sparkline 
    id='line-sparkline'
    valueType='Category'
    [dataSource]="stockPrices"
    xName="day"
    yName="price"
    type="Line"
    height="100px"
    width="200px">
  </ejs-sparkline>`
})
export class AppComponent {
  stockPrices = [
    { day: 'Mon', price: 150 },
    { day: 'Tue', price: 152 },
    { day: 'Wed', price: 149 },
    { day: 'Thu', price: 155 },
    { day: 'Fri', price: 158 },
    { day: 'Sat', price: 156 },
    { day: 'Sun', price: 160 }
  ]
}
```

**Output:** A line showing the price trend across the week.

### Customizing Line Appearance

```typescript
@Component({
  template: `<ejs-sparkline 
    [dataSource]="data"
    type="Line"
    [lineWidth]="2"
   >
  </ejs-sparkline>`
})
export class LineSparklineComponent {
  data = [2, 6, 4, 8, 5, 1, 7]
}
```

**Key Properties:**
- `lineWidth` - Line thickness (default: 1)

## Column Type

Column sparklines display data as vertical bars, effective for comparing discrete values or highlighting variations.

### When to Use Column Type
- **Value comparison** - Sales by region, visits per day
- **Discrete data** - Different products, categories, locations
- **Highlighting peaks and valleys** - Easy to see spikes and dips

### Example: Daily Website Visits

```typescript
@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<ejs-sparkline 
    id='column-sparkline'
    [dataSource]="dailyVisits"
    xName="day"
    yName="visits"
    type="Column"
    height="80px"
    width="180px">
  </ejs-sparkline>`
})
export class ColumnSparklineComponent {
  dailyVisits = [
    { day: 1, visits: 120 },
    { day: 2, visits: 150 },
    { day: 3, visits: 110 },
    { day: 4, visits: 200 },
    { day: 5, visits: 180 },
    { day: 6, visits: 220 },
    { day: 7, visits: 200 }
  ]
}
```

**Output:** Vertical bars showing visitor count each day.

### Customizing Column Appearance

```typescript
@Component({
  template: `<ejs-sparkline 
    [dataSource]="data"
    type="Column"
    [fill]="'#4472C4'"
    [rangeBandSettings]="{ 
      start: 0, 
      end: 50, 
      color: '#F0F0F0' 
    }">
  </ejs-sparkline>`
})
export class CustomColumnComponent {
  data = [50, 120, 90, 130, 160, 140, 110]
}
```

## Area Type

Area sparklines combine a line with a filled area below, creating emphasis on trends while showing magnitude.

### When to Use Area Type
- **Revenue/profit trends** - Shows total volume and direction
- **Cumulative data** - Network traffic, memory usage over time
- **Magnitude emphasis** - When magnitude matters as much as trend

### Example: Monthly Revenue

```typescript
@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<ejs-sparkline 
    [dataSource]="monthlyRevenue"
    xName="month"
    yName="revenue"
    valueType='Category'
    type="Area"
    height="100px"
    width="250px"
    [fill]="'rgba(68, 114, 196, 0.3)'">
  </ejs-sparkline>`
})
export class AreaSparklineComponent {
  monthlyRevenue = [
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 7000 },
    { month: 'Mar', revenue: 6500 },
    { month: 'Apr', revenue: 8200 },
    { month: 'May', revenue: 9500 },
    { month: 'Jun', revenue: 8800 }
  ]
}
```

**Output:** A filled area chart showing revenue growth.

## Pie Type

Pie sparklines visualize proportional data, showing how parts relate to a whole.

### When to Use Pie Type
- **Market share** - Product distribution, market segments
- **Composition** - Budget allocation, resource distribution
- **Proportion visualization** - Percentage breakdowns

### Example: Market Share Distribution

```typescript
@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<ejs-sparkline 
    [dataSource]="marketShare"
    xName="product"
    yName="share"
    type="Pie"
    valueType='Category'
    height="120px"
    width="120px">
  </ejs-sparkline>`
})
export class PieSparklineComponent {
  marketShare = [
    { product: 'A', share: 30 },
    { product: 'B', share: 25 },
    { product: 'C', share: 20 },
    { product: 'D', share: 15 },
    { product: 'E', share: 10 }
  ]
}
```

**Output:** A compact pie chart showing market distribution.

### Understanding Pie Sparkline Data

For Pie sparklines, the `yName` values represent proportions. The values are automatically converted to percentages:
- If your data is [30, 25, 20, 15, 10], they sum to 100 and display as percentages directly
- If they don't sum to 100, they're normalized internally

## Win-Loss Type

Win-Loss (or WinLoss) sparklines display binary outcomes as a series of positive and negative values, ideal for tracking success/failure patterns.

### When to Use Win-Loss Type
- **Success/failure tracking** - Pass/fail tests, win/loss records
- **Binary outcomes** - Up/down stock movements, on/off states
- **Pattern recognition** - Quick visual identification of success streaks

### Example: Test Results

```typescript
@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<ejs-sparkline 
    [dataSource]="testResults"
    xName="test"
    yName="result"
    type="WinLoss"
    height="80px"
    width="200px">
  </ejs-sparkline>`
})
export class WinLossSparklineComponent {
  // Positive = Win (1), Negative = Loss (0 or -1)
  testResults = [
    { test: 1, result: 1 },
    { test: 2, result: 1 },
    { test: 3, result: -1 },
    { test: 4, result: 1 },
    { test: 5, result: 1 },
    { test: 6, result: -1 },
    { test: 7, result: 1 }
  ]
}
```

**Output:** Columns showing wins (positive) and losses (negative).

### Simple Win-Loss with Primitives

```typescript
// 1 = Win, -1 = Loss
dataSource = [1, 1, -1, 1, 1, -1, 1]

<ejs-sparkline 
  [dataSource]="dataSource"
  type="WinLoss">
</ejs-sparkline>
```

## Type Comparison

| Type | Best For | Data Pattern | Visual |
|------|----------|---|---------|
| **Line** | Trends over time | Sequential, continuous | Continuous line |
| **Column** | Comparing values | Discrete categories | Vertical bars |
| **Area** | Magnitude + trend | Sequential, cumulative | Filled line area |
| **Pie** | Proportions | Parts of a whole | Colored pie slices |
| **WinLoss** | Binary outcomes | Pass/fail, win/loss | Positive/negative bars |

## Selecting the Right Type

### Decision Guide

**Q1: Is your data continuous over time?**
- **Yes** → Use `Line` (smooth trend) or `Area` (emphasize magnitude)
- **No** → Go to Q2

**Q2: Is it about proportions or composition?**
- **Yes** → Use `Pie`
- **No** → Go to Q3

**Q3: Is your data binary (win/loss, pass/fail)?**
- **Yes** → Use `WinLoss`
- **No** → Go to Q4

**Q4: Are you comparing discrete values?**
- **Yes** → Use `Column`
- **Default** → Use `Line`

### Examples by Scenario

| Scenario | Type | Reason |
|----------|------|--------|
| Stock price daily | Line | Continuous trend |
| Sales by region | Column | Discrete comparison |
| Network traffic | Area | Cumulative, volume matters |
| Budget breakdown | Pie | Proportional composition |
| Test pass/fail | WinLoss | Binary outcomes |
| Temperature daily | Line | Continuous trend |
| Product market share | Pie | Parts of whole |
| Success rate trend | Area | Trend + magnitude |

### Performance Considerations

- **Line** - Fast rendering, large datasets (1000+ points)
- **Column** - Fast, 50-500 values
- **Area** - Fast, similar to Line
- **Pie** - Best with 3-10 slices
- **WinLoss** - Very fast, typically 5-50 points

For sparklines with 1000+ data points, prefer `Column` or `Line` types for better performance.

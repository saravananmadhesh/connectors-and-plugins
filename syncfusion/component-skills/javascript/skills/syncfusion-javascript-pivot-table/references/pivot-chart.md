# Pivot Chart in Pivot View

## Table of Contents
1. [Overview](#overview)
2. [Enabling Pivot Chart](#enabling-pivot-chart)
3. [Chart Types](#chart-types)
4. [Accumulation Charts](#accumulation-charts)
5. [Chart Configuration](#chart-configuration)
6. [Display Options](#display-options)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)

## Overview

The Pivot Chart helps users visualize aggregated pivot data in graphical formats. It provides drill down/up operations, over 21 chart types, and various display settings for series, axes, legends, export, print, and tooltips. The main purpose is to present pivot table data in an easy-to-understand visual format.

**Key Features:**
- 21+ chart types including Line, Column, Bar, Area, and more
- 4 accumulation chart types: Pie, Doughnut, Funnel, Pyramid
- Interactive drill down/up operations
- Simultaneous table and chart display
- Export to PDF and image formats
- Field list and grouping bar integration

## Enabling Pivot Chart

To use the Pivot Chart, inject the `PivotChart` module and configure the `displayOption` property:

```typescript
import { PivotView, IDataSet, PivotChart } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource';

PivotView.Inject(PivotChart);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    displayOption: { view: 'Chart' },
    chartSettings: { chartSeries: { type: 'Column' } },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Chart Types

The Pivot Chart offers 21 different chart types for visualizing data:

### Standard Chart Types

| Chart Type | Description | Best Use Case |
|------------|-------------|---------------|
| Line | Connects data points with lines | Trends over time |
| Column | Vertical bars for each data point | Comparing values across categories |
| Area | Filled area under line chart | Volume trends over time |
| Bar | Horizontal bars | Comparing categories with long names |
| StepLine | Stepped line connecting points | Process flows, stage transitions |
| StepArea | Filled stepped area | Cumulative stage analysis |
| Spline | Smooth curved line | Smooth trend visualization |
| SplineArea | Filled smooth curved area | Smooth volume trends |
| Scatter | Individual points without lines | Distribution analysis |
| Bubble | Points with varying sizes | 3-dimensional data comparison |
| Pareto | Combination of column and line | 80/20 rule analysis |

### Stacking Chart Types

| Chart Type | Description | Best Use Case |
|------------|-------------|---------------|
| StackingLine | Multiple line series stacked | Multi-series trend comparison |
| StackingColumn | Stacked vertical bars | Part-to-whole comparison |
| StackingArea | Stacked filled areas | Cumulative contribution over time |
| StackingBar | Stacked horizontal bars | Horizontal part-to-whole analysis |
| StackingColumn100 | 100% stacked columns | Percentage contribution by category |
| StackingBar100 | 100% stacked bars | Horizontal percentage distribution |
| StackingArea100 | 100% stacked areas | Percentage trends over time |
| StackingLine100 | 100% stacked lines | Percentage trend comparison |

### Polar and Radar Charts

| Chart Type | Description | Best Use Case |
|------------|-------------|---------------|
| Polar | Circular chart with radial axes | Cyclical data patterns |
| Radar | Spider/web chart | Multi-dimensional comparison |

### Changing Chart Type

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }]
    },
    displayOption: { view: 'Chart' },
    chartSettings: { chartSeries: { type: 'Bar' } },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Default:** Line chart is displayed by default.

## Accumulation Charts

Pivot Chart supports four accumulation chart types for part-to-whole analysis:

### Available Accumulation Types

| Type | Description | Best Use Case |
|------|-------------|---------------|
| Pie | Circular chart divided into slices | Simple part-to-whole comparison |
| Doughnut | Pie chart with center hole | Part-to-whole with emphasis on center |
| Funnel | Inverted pyramid shape | Process stages, conversion rates |
| Pyramid | Pyramid shape | Hierarchical data, population distribution |

### Using Accumulation Charts

```typescript
import { PivotView, IDataSet, PivotChart } from '@syncfusion/ej2-pivotview';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { pivotData } from './datasource';

PivotView.Inject(PivotChart);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        columns: [{ name: 'Year' }, { name: 'Products' }],
        rows: [{ name: 'Country' }, { name: 'Quarter' }],
        formatSettings: [{ name: 'Amount', format: 'C' }],
        values: [{ name: 'Amount' }, { name: 'Sold' }],
        filters: []
    },
    displayOption: { view: 'Chart' },
    chartSettings: { chartSeries: { type: 'Pie' } },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');

// Dropdown to change chart type
let chartTypesDropDown: DropDownList = new DropDownList({
    floatLabelType: 'Auto',
    change: function (args: ChangeEventArgs) {
        pivotTableObj.chartSettings.chartSeries.type = args.value as any;
    }
});
chartTypesDropDown.appendTo('#charttypes');
```

## Chart Configuration

### Chart Settings Properties

Configure chart appearance and behavior using the `chartSettings` property:

```typescript
chartSettings: {
    chartSeries: {
        type: 'Column',
        enableTooltip: true
    },
    title: 'Sales Analysis',
    titleStyle: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        size: '16px'
    },
    legendSettings: {
        visible: true,
        position: 'Bottom'
    },
    primaryXAxis: {
        title: 'Countries',
        labelRotation: 45
    },
    primaryYAxis: {
        title: 'Sales Amount',
        labelFormat: 'C0'
    },
    border: {
        color: '#cccccc',
        width: 1
    },
    background: 'white'
}
```

### Multiple Axes

Enable multiple axes to display different value fields with separate Y-axes:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sales Amount' }
        ],
        rows: [{ name: 'Country' }]
    },
    displayOption: { view: 'Chart' },
    chartSettings: {
        chartSeries: { type: 'Column' },
        enableMultipleAxis: true
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Display Options

Control the visibility of grid and chart using the `displayOption` property:

### View Modes

| View Mode | Description |
|-----------|-------------|
| Table | Display only pivot table |
| Chart | Display only pivot chart |
| Both | Display both table and chart |

### Primary View Configuration

When displaying both table and chart, specify which view appears first:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }, { name: 'Amount' }],
        rows: [{ name: 'Country' }]
    },
    displayOption: {
        view: 'Both',
        primary: 'Chart'
    },
    chartSettings: { chartSeries: { type: 'Column' } },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

**Options for primary:**
- `Table`: Pivot table appears first
- `Chart`: Pivot chart appears first

## Common Patterns

### Pattern 1: Sales Dashboard with Multiple Charts

```typescript
// Dropdown to switch between chart types dynamically
import { DropDownList } from '@syncfusion/ej2-dropdowns';

PivotView.Inject(PivotChart);

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: salesData as IDataSet[],
        columns: [{ name: 'Year' }, { name: 'Quarter' }],
        values: [
            { name: 'Sales', type: 'Sum' },
            { name: 'Quantity', type: 'Sum' }
        ],
        rows: [{ name: 'Region' }],
        formatSettings: [{ name: 'Sales', format: 'C0' }]
    },
    displayOption: { view: 'Chart' },
    chartSettings: {
        chartSeries: { type: 'StackingColumn' },
        title: 'Regional Sales Performance'
    },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');

let chartTypeDropdown: DropDownList = new DropDownList({
    dataSource: ['Column', 'Bar', 'Line', 'Area', 'StackingColumn'],
    change: (e) => {
        pivotTableObj.chartSettings.chartSeries.type = e.value as any;
    }
});
chartTypeDropdown.appendTo('#chartType');
```

### Pattern 2: Market Share Analysis with Pie Chart

```typescript
// Pie chart for market share visualization
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: marketData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Revenue', type: 'Sum' }],
        rows: [{ name: 'Company' }],
        formatSettings: [{ name: 'Revenue', format: 'C0' }]
    },
    displayOption: { view: 'Chart' },
    chartSettings: {
        chartSeries: { type: 'Pie' },
        title: 'Market Share by Company',
        legendSettings: {
            visible: true,
            position: 'Right'
        }
    },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 3: Trend Analysis with Line Chart

```typescript
// Line chart for trend analysis over time
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: salesTrend as IDataSet[],
        columns: [{ name: 'Product' }],
        values: [{ name: 'Sales', type: 'Sum' }],
        rows: [{ name: 'Year' }, { name: 'Month' }],
        formatSettings: [{ name: 'Sales', format: 'C0' }]
    },
    displayOption: { view: 'Chart' },
    chartSettings: {
        chartSeries: { type: 'Line' },
        title: 'Monthly Sales Trends',
        primaryXAxis: { title: 'Time Period' },
        primaryYAxis: { title: 'Sales Amount' }
    },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

### Pattern 4: Comparison with Multiple Axes

```typescript
// Multiple axes for different value scales
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: performanceData as IDataSet[],
        columns: [{ name: 'Year' }],
        values: [
            { name: 'Revenue', caption: 'Revenue ($M)', type: 'Sum' },
            { name: 'UnitsSold', caption: 'Units (K)', type: 'Sum' }
        ],
        rows: [{ name: 'Region' }],
        formatSettings: [{ name: 'Revenue', format: 'C0' }]
    },
    displayOption: { view: 'Chart' },
    chartSettings: {
        chartSeries: { type: 'Column' },
        enableMultipleAxis: true,
        title: 'Revenue vs Units Sold'
    },
    height: 400
});
pivotTableObj.appendTo('#PivotTable');
```

## Troubleshooting

### Chart Not Displaying

**Issue:** Pivot chart doesn't appear.

**Solution:**
- Inject PivotChart module: `PivotView.Inject(PivotChart)`
- Set `displayOption.view` to 'Chart' or 'Both'
- Ensure values are configured in dataSourceSettings
- Check console for JavaScript errors

### Wrong Chart Type Displayed

**Issue:** Chart type doesn't match configuration.

**Solution:**
- Verify `chartSettings.chartSeries.type` is set correctly
- Check spelling of chart type (case-sensitive)
- For accumulation charts, use: 'Pie', 'Doughnut', 'Funnel', 'Pyramid'
- Refresh after changing chart type dynamically

### Multiple Axes Not Working

**Issue:** Multiple Y-axes don't appear.

**Solution:**
- Set `enableMultipleAxis: true` in chartSettings
- Ensure you have multiple value fields configured
- Verify value fields have different scales or units
- Check that chart type supports multiple axes (Column, Bar, Line, Area)

### Chart Data Incorrect

**Issue:** Chart displays wrong values or missing data.

**Solution:**
- Verify dataSourceSettings configuration matches requirements
- Check that aggregation types are correctly set
- Ensure field names in values match data source
- Apply appropriate filters if data seems incomplete

### Legend Not Visible

**Issue:** Chart legend is not showing.

**Solution:**
- Set `legendSettings.visible: true` in chartSettings
- Configure legend position: 'Top', 'Bottom', 'Left', 'Right'
- Check if chart has multiple series (legend shows for multiple series)
- Verify legend settings:
  ```typescript
  legendSettings: {
      visible: true,
      position: 'Bottom',
      height: '10%'
  }
  ```

### Performance Issues with Large Data

**Issue:** Chart rendering is slow with large datasets.

**Solution:**
- Enable virtual scrolling in pivot table
- Apply filters to reduce data points
- Use aggregated data instead of raw data
- Consider paging for very large datasets
- Simplify chart type (Line instead of Scatter for large datasets)

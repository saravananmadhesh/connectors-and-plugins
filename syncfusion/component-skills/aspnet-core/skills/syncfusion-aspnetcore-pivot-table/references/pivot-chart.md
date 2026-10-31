# Pivot Chart in ASP.NET Core Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Pivot Chart](#enable-pivot-chart)
- [Display Options](#display-options)
- [Chart Types](#chart-types)
- [Accumulation Charts](#accumulation-charts)
- [Chart Configuration](#chart-configuration)
- [Drill Down in Charts](#drill-down-in-charts)
- [Data Binding](#data-binding)
- [Chart Customization](#chart-customization)
- [Best Practices](#best-practices)

## Overview

Pivot Chart helps users visualize aggregated values in a clear and graphical format. It provides essential options like drill down/drill up operations, 21 chart types, 4 accumulation chart types, and various display settings for series, axes, legends, export, and print. The main purpose is to present Pivot Table data in an easy-to-understand and interactive way.

**Key Features:**
- 21 chart types (Line, Column, Area, Bar, Spline, Polar, Radar, etc.)
- 4 accumulation chart types (Pie, Doughnut, Funnel, Pyramid)
- Drill down and drill up on row headers
- Display table only, chart only, or both via `DisplayOption`
- Full customization of series, axes, legend, tooltips via `ChartSettings`
- Export and print capabilities
- Smart axis label placement

**Requirements:**
- Must inject `PivotChartService` through module
- Works with both relational and OLAP data
- Supports all data binding methods

## Enable Pivot Chart

Enable pivot chart by setting `DisplayOption` tag helper with `View` attribute set to `Chart`:

```html
<ejs-pivotview id="pivotview" height="500" width="100%" showToolbar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Units Sold"></e-field>
        </e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Chart"></e-displayOption>
    <e-chartSettings>
        <e-chartSeries type="Column"></e-chartSeries>
    </e-chartSettings>
</ejs-pivotview>
```

**In your controller or page:**
```csharp
@{
    // ViewBag.DataSource = your data source
}
```

## Display Options

Control visibility and order of table and chart using the `DisplayOption` tag helper:

```html
<e-displayOption view="Both"></e-displayOption>
<e-displayOption view="Chart"></e-displayOption>
<e-displayOption view="Table"></e-displayOption>
```

| View | Display | Usage |
|------|---------|-------|
| **Table** | Pivot table only | Data analysis with table details |
| **Chart** | Chart only | Executive summary visualization |
| **Both** (default) | Both table and chart | Combined analysis view |

### Primary Component

When displaying both, specify which appears first using `primary` attribute:

```html
<ejs-pivotview id="pivotview" height="600" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Both" primary="Chart"></e-displayOption>
</ejs-pivotview>
```

**Primary Options:**
- `Grid` (default) - Table appears first, chart below
- `Chart` - Chart appears first, table below

## Chart Types

### All 21 Chart Type Series

Pivot Chart supports 21 different chart types organized into categories:

#### Comparison Charts (6 types)
Used for comparing values across different categories:

| Type | Use Case | Properties |
|------|----------|-----------|
| **Column** | Vertical bars for category comparison | Default; best for side-by-side comparison |
| **Bar** | Horizontal bars for category comparison | Ideal for long category names |
| **StackingColumn** | Stacked vertical bars showing totals | Shows composition and totals |
| **StackingColumn100** | 100% stacked columns (proportional) | Shows relative percentages |
| **StackingBar** | Stacked horizontal bars | Horizontal version of stacked column |
| **StackingBar100** | 100% stacked bars (proportional) | Horizontal version of 100% stacked |

#### Trend Charts (6 types)
Show data progression and trends over time:

| Type | Use Case | Properties |
|------|----------|-----------|
| **Line** | Points connected by lines | Default; ideal for trend analysis |
| **Spline** | Smooth curved lines between points | Smoother appearance than line |
| **StepLine** | Step-like line chart for discrete changes | Shows sudden changes |
| **Area** | Filled area between line and axis | Emphasizes magnitude |
| **StackingArea** | Stacked areas showing composition | Shows how parts contribute to total |
| **StackingArea100** | 100% stacked areas (proportional) | Shows relative contribution percentages |

#### Distribution Charts (3 types)
Show mathematical distribution and relationships:

| Type | Use Case | Properties |
|------|----------|-----------|
| **Scatter** | Scatter plot for correlation analysis | Shows relationship between variables |
| **Bubble** | Bubble chart with 3 dimensions | Represents three data dimensions |
| **Pareto** | Combination of column and line | 80/20 analysis (80% of problems from 20% of causes) |

#### Composition Charts (6 types - Accumulation Charts section)
Show part-to-whole relationships:

- **Pie** - Classic pie chart
- **Doughnut** - Pie with center hole
- **Funnel** - Funnel chart for conversion
- **Pyramid** - Pyramid chart for hierarchies

#### Specialized Charts (2 types)
Advanced analytical charts:

| Type | Use Case | Properties |
|------|----------|----------|
| **Polar** | Polar coordinate system | Multi-dimensional comparison |
| **Radar** | Radar/web chart | Multi-variable performance metrics |

### Set Chart Type

```html
<ejs-pivotview id="pivotview" height="500" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Chart"></e-displayOption>
    <e-chartSettings>
        <e-chartSeries type="Bar"></e-chartSeries>
    </e-chartSettings>
</ejs-pivotview>
```

### Chart Type Reference Table

| Type (value) | Display Name | Category |
|-------------|-------------|----------|
| `Column` | Column Chart | Comparison (Default) |
| `Bar` | Bar Chart | Comparison |
| `Line` | Line Chart | Trend |
| `Area` | Area Chart | Trend |
| `Spline` | Spline Chart | Trend |
| `SplineArea` | Spline Area Chart | Trend |
| `StepLine` | Step Line Chart | Trend |
| `StepArea` | Step Area Chart | Trend |
| `StackingColumn` | Stacked Column Chart | Comparison |
| `StackingColumn100` | 100% Stacked Column Chart | Comparison |
| `StackingBar` | Stacked Bar Chart | Comparison |
| `StackingBar100` | 100% Stacked Bar Chart | Comparison |
| `StackingArea` | Stacked Area Chart | Trend |
| `StackingArea100` | 100% Stacked Area Chart | Trend |
| `Scatter` | Scatter Chart | Distribution |
| `Bubble` | Bubble Chart | Distribution |
| `Pareto` | Pareto Chart | Distribution |
| `Polar` | Polar Chart | Specialized |
| `Radar` | Radar Chart | Specialized |

## Accumulation Charts

Pivot Chart supports 4 accumulation chart types for showing part-to-whole relationships:

### Pie Chart

Classic pie chart showing percentage distribution:

```html
<ejs-pivotview id="pivotview" height="500" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Chart"></e-displayOption>
    <e-chartSettings>
        <e-chartSeries type="Pie"></e-chartSeries>
    </e-chartSettings>
</ejs-pivotview>
```

### Doughnut Chart

Pie chart with a center hole:

```html
<e-chartSettings>
    <e-chartSeries type="Doughnut"></e-chartSeries>
</e-chartSettings>
```

### Funnel Chart

Funnel visualization for conversion analysis:

```html
<e-chartSettings>
    <e-chartSeries type="Funnel"></e-chartSeries>
</e-chartSettings>
```

### Pyramid Chart

Pyramid chart for hierarchical data:

```html
<e-chartSettings>
    <e-chartSeries type="Pyramid"></e-chartSeries>
</e-chartSettings>
```

### Drill Down/Up in Accumulation Charts

Accumulation charts support drill down and drill up operations through row headers:

```html
<ejs-pivotview id="pivotview" height="500" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="State"></e-field>
        </e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Chart"></e-displayOption>
    <e-chartSettings>
        <e-chartSeries type="Pie"></e-chartSeries>
    </e-chartSettings>
</ejs-pivotview>
```

**Drill Operations:**
- Click pie slice → context menu appears
- **Expand**: Drill down to next hierarchy level
- **Collapse**: Drill up to parent level

### Column Headers and Delimiters

In accumulation charts with hierarchical columns, specify which column to display using `columnHeader` attribute on `e-chartSettings` along with `columnDelimiter`:

```html
<ejs-pivotview id="PivotView" height="500">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-chartSettings title="Sales Analysis" columnHeader="@(new string[] { "FY 2016-Q2" })" columnDelimiter="-">
        <e-chartSeries type="Doughnut"></e-chartSeries>
    </e-chartSettings>
    <e-displayOption view="Chart"></e-displayOption>
</ejs-pivotview>
```

**Explanation:**
- `columnHeader="@(new string[] { "FY 2016-Q2" })"` - Specifies which column combination to display (e.g., Year "FY 2016" and Quarter "Q2")
- `columnDelimiter="-"` - Character that separates the hierarchical column levels in the header
- `title="Sales Analysis"` - Chart title label

**Example Column Hierarchy:**
```
Column 1: FY 2016
  Sub-column: Q1, Q2, Q3, Q4

Column 2: FY 2017
  Sub-column: Q1, Q2, Q3, Q4
```

To display FY 2017-Q3: `columnHeader="@(new string[] { "FY 2017-Q3" })"`

### Label Customization

Control data label visibility and positioning in accumulation charts:

```html
<e-chartSettings title="Sales Analysis" enableSmartLabels="false">
    <e-chartSeries type="Pyramid">
        <e-datalabel position="@ViewBag.position"></e-datalabel>
    </e-chartSeries>
</e-chartSettings>
```

**Label Options:**
- `Position="Inside"` - Label inside chart point
- `Position="Outside"` - Label outside chart point (default)
- `enableSmartLabels="true"` on `e-chartSettings` - Smart arrangement to prevent overlapping

### Start and End Angle

Draw pie/doughnut charts within specific angle range (semi-pie support):

```html
<ejs-pivotview id="pivotview" height="500" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Chart"></e-displayOption>
    <e-chartSettings>
        <e-chartSeries type="Pie" startAngle="0" endAngle="180"></e-chartSeries>
    </e-chartSettings>
</ejs-pivotview>
```

**Angle Configurations:**
- `startAngle="0" endAngle="360"` (default) - Full pie/doughnut
- `startAngle="0" endAngle="180"` - Semi-pie (top half)
- `startAngle="180" endAngle="360"` - Semi-pie (bottom half)
- `startAngle="0" endAngle="270"` - 3/4 pie

## Chart Configuration

### Series Customization

You can customize the series in the pivot chart by using the `e-chartSeries` property inside `e-chartSettings`. Any changes you make to the `e-chartSeries` property will apply to all series in the chart.

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    <e-chartSettings enableMultipleAxis="true">
        <e-chartSeries type="Column" enableTooltip="true">
            <e-border color="#000" width="2"></e-border>
        </e-chartSeries>
    </e-chartSettings>
    <e-displayOption view="Chart"></e-displayOption>
</ejs-pivotview>
```

**Configuration Explanation:**
- `<e-chartSeries type="Column" enableTooltip="true">` - Column chart with tooltips on hover
- `<e-border color="#000" width="2">` - Series border styling with black color and 2px width
- `enableMultipleAxis="true"` - Enable multiple Y-axes to compare different measure scales
- `<e-formatsettings>` - Formats the Amount field as currency (C0) with grouping enabled

### Axis Customization

Customize chart axes with titles and other formatting options:

```html
<ejs-pivotview id="PivotView" height="500">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-chartSettings>
        <e-chartSeries type="Column"></e-chartSeries>
        <e-primaryXAxis title="Year"></e-primaryXAxis>
        <e-primaryYAxis title="Sales Amount"></e-primaryYAxis>
    </e-chartSettings>
    <e-displayOption view="Chart"></e-displayOption>
</ejs-pivotview>
```

**Explanation:**
- `<e-primaryXAxis title="Year">` - Configure horizontal axis with title label
- `<e-primaryYAxis title="Sales Amount">` - Configure vertical axis with title label
- Both axes help users understand what data is represented

### Multiple Axes Support

Switch between single and multiple axes for different measures:

```html
<ejs-pivotview id="pivotview" height="500" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values>
            <e-field name="Sales"></e-field>
            <e-field name="Profit"></e-field>
        </e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Chart"></e-displayOption>
    <e-chartSettings enableMultipleAxis="true">
        <e-chartSeries type="Column"></e-chartSeries>
    </e-chartSettings>
</ejs-pivotview>
```

### Chart Tooltip Customization

```html
<e-chartSettings>
    <e-chartSeries type="Column"></e-chartSeries>
    <e-tooltip template="#chartTooltip"></e-tooltip>
</e-chartSettings>

<script id="chartTooltip" type="text/x-template">
    <div>${x}: ${y}</div>
</script>
```

### Chart Legend Configuration

```html
<ejs-pivotview id="PivotView" height="300" load="onLoad">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
    </e-datasourcesettings>
    <e-displayOption view="Chart"></e-displayOption>    
</ejs-pivotview>

<script>
    var pivotObj;
    function onLoad(args) {
        pivotObj = document.getElementById("PivotView").ej2_instances[0];
        pivotObj.chartSettings = {
            legendSettings: { position: "Right" },
            chartSeries: { type: "Column", legendShape: "Pentagon" }
        };
    }
</script>
```

## Drill Down in Charts

### Enable Drill Down in Charts

```html
<ejs-pivotview id="pivotview" height="500" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="State"></e-field>
            <e-field name="City"></e-field>
        </e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Chart"></e-displayOption>
    <e-chartSettings>
        <e-chartSeries type="Column"></e-chartSeries>
    </e-chartSettings>
</ejs-pivotview>
```

**User Interaction:**
- Click on chart element (bar, pie slice, etc.)
- Drills to next hierarchy level automatically
- Click "Country" label to drill back up

## Data Binding

Data automatically binds from pivot table aggregation:

```html
<!-- Data binding is automatic - no manual configuration needed -->
<ejs-pivotview id="pivotview" height="500" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Chart"></e-displayOption>
    <e-chartSettings>
        <e-chartSeries type="Column"></e-chartSeries>
    </e-chartSettings>
</ejs-pivotview>
```

## Chart Customization

### Series Customization

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
    </e-datasourcesettings>
    <e-chartSettings enableMultipleAxis="true">
        <e-chartSeries type="Column" enableTooltip="true">
            <e-border color="#000" width="2"></e-border>
        </e-chartSeries>
    </e-chartSettings>
    <e-displayOption view="Chart"></e-displayOption>
</ejs-pivotview>
```

### Axis Label Customization

```html
<e-chartSettings enableSmartLabels="true">
    <e-chartSeries type="Column"></e-chartSeries>
</e-chartSettings>
```

### Export Chart

Charts are included in PDF/Excel exports automatically:

```html
<ejs-pivotview id="pivotview" height="500" width="100%" showToolbar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-toolbarItems>
        <e-toolbarItem name="ExcelExport"></e-toolbarItem>
        <e-toolbarItem name="PdfExport"></e-toolbarItem>
    </e-toolbarItems>
    
    <e-displayOption view="Both"></e-displayOption>
    <e-chartSettings>
        <e-chartSeries type="Column"></e-chartSeries>
    </e-chartSettings>
</ejs-pivotview>
```

## Common Display Patterns

**Pattern 1: Table + Chart side-by-side**
```html
<e-displayOption view="Both"></e-displayOption>
```

**Pattern 2: Toggle between table and chart**
```html
<e-displayOption view="Both" primary="Table"></e-displayOption>
<!-- Users can switch using toolbar -->
```

**Pattern 3: Executive dashboard (chart primary)**
```html
<e-displayOption view="Both" primary="Chart"></e-displayOption>
```

## Best Practices

✓ **Choose Appropriate Chart Type**: Match chart type to data story (comparison, trend, distribution, composition)
✓ **Limit Chart Data**: Too many categories make charts unreadable; use Grouping Bar to refine
✓ **Use Multiple Axes**: When comparing different scales in different measures
✓ **Label Optimization**: Use smart labels for accumulation charts to prevent overlap
✓ **Color Consistency**: Maintain consistent color scheme with company branding
✓ **Drill-Down Hierarchy**: Support 2-3 hierarchy levels for interactive exploration
✓ **Export Inclusion**: Include charts in exports for complete reporting
✓ **Performance**: Charts update automatically with filtering; avoid large datasets (100K+ aggregated rows)
```

## Important Notes

- Data comes from **pivot aggregation**, not raw records
- Charts update when **pivot changes** (filter, sort, drill)
- **Multiple axes** useful for comparing different scales
- **Drill-down** available on chart data points
- Works with **all data sources** (JSON, CSV, SQL, OLAP)

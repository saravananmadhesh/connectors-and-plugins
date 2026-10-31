---
name: syncfusion-aspnetmvc-heatmap-chart
description: Implement HeatMap and Bubble HeatMap visualizations in Syncfusion ASP.NET MVC. Create two-dimensional data visualizations with gradient/fixed colors, configure axes, bind data, customize appearance, and add interactive features. Master data label positioning, legend configuration, tooltip customization, cell selection, and event handling.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "HeatMaps"
---

# Implementing HeatMap in Syncfusion ASP.NET MVC

The HeatMap control visualizes two-dimensional data where values are represented in gradient or fixed colors. It supports multiple axes types, data binding patterns, legends, tooltips, cell selection, and custom styling for professional data visualization.

## When to Use This Skill

Use this skill when you need to:
- Create color-coded two-dimensional data visualizations
- Display data matrices with gradient or custom color representations
- Implement data exploration with cell selection and tooltips
- Configure different axis types (Categorical, Numeric, DateTime)
- Bind array or JSON data to a HeatMap
- Create Bubble HeatMaps for three-variable visualization
- Handle HeatMap events and user interactions
- Export or print HeatMap visualizations

## Documentation and Navigation Guide

### Getting Started with HeatMap
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation via NuGet package
- Project setup and namespace configuration
- Required script references
- Creating your first HeatMap
- Minimal working example with sample data

### Working with Data
📄 **Read:** [references/working-with-data.md](references/working-with-data.md)
- Array-table data binding patterns
- Array-cell data binding approach
- JSON-table data structure and mapping
- JSON-cell data configuration
- Data source initialization and updates
- Handling large datasets efficiently

### Configuring Axes
📄 **Read:** [references/axis-configuration.md](references/axis-configuration.md)
- Category axis for string labels
- Numeric axis for number values
- DateTime axis for temporal data
- Axis label formatting and customization
- Inverted and opposed axis positioning
- Multi-level labels and label rotation

### Legend and Color Palettes
📄 **Read:** [references/legend-and-palette.md](references/legend-and-palette.md)
- Legend positioning and visibility
- Built-in color palettes
- Gradient color schemes
- Fixed color assignment
- Custom palette creation
- Legend interaction and styling

### Data Labels and Display
📄 **Read:** [references/data-labels.md](references/data-labels.md)
- Enabling and disabling data labels
- Label positioning strategies
- Label value formatting
- Custom label content
- Label styling and appearance
- Handling label overlap

### Tooltips and Interactivity
📄 **Read:** [references/tooltips.md](references/tooltips.md)
- Enabling tooltip functionality
- Tooltip content formatting
- Template customization
- Tooltip styling and appearance
- Interactive tooltip positioning
- Custom tooltip templates

### Appearance and Rendering
📄 **Read:** [references/appearance-and-rendering.md](references/appearance-and-rendering.md)
- Cell styling and customization
- Title and subtitle configuration
- Responsive chart sizing
- SVG and Canvas rendering modes
- Theme application
- Dimension configuration

### Selection and Interaction
📄 **Read:** [references/selection-and-interaction.md](references/selection-and-interaction.md)
- Cell selection modes
- Multiple cell selection
- Selection styling
- Clearing selections programmatically
- Cell click events
- Selection change events

### Bubble HeatMap Visualization
📄 **Read:** [references/bubble-heatmap.md](references/bubble-heatmap.md)
- Bubble HeatMap overview and use cases
- Size and color mapping
- Three-variable visualization patterns
- Bubble sector types
- Creating bubble representations
- Styling bubble elements

### Event Handling and Callbacks
📄 **Read:** [references/events.md](references/events.md)
- Available HeatMap events
- Cell click and selection events
- Data loading events
- Render completion events
- Tooltip show/hide events
- Custom event handlers
- Event parameter structure

## Quick Start Example

```csharp
@Html.EJS().HeatMap("container")
    .Title(title => 
    {
        title.Text("Sales Trend");
    })
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "2006", "2007", "2008", "2009", "2010" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "Jan", "Feb", "Mar", "Apr" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource(GetSalesData())
    .CellSettings(cellSettings =>
    {
        cellSettings.ShowLabel(true);
        cellSettings.Format("0.0");
    })
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.HeatMap.LegendPosition.Right);
    })
    .Render()
```

## Common Patterns

### Pattern 1: Basic Category HeatMap
Display categorical data with category axes on both dimensions:

```csharp
@Html.EJS().HeatMap("container")
    .XAxis(xaxis =>
    {
        xaxis.Labels(new List<string> { "A", "B", "C" });
        xaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .YAxis(yaxis =>
    {
        yaxis.Labels(new List<string> { "Q1", "Q2", "Q3", "Q4" });
        yaxis.ValueType(Syncfusion.EJ2.HeatMap.ValueType.Category);
    })
    .DataSource(Model.SalesData)
    .Render()
```

### Pattern 2: JSON Table Binding
Bind JSON data structured as table format:

```csharp
.DataSource(new HeatMapData 
{ 
    IsJsonData = true,
    AdaptorType = Syncfusion.EJ2.HeatMap.AdaptorType.Table,
    Data = Model.JsonTableData
})
```

### Pattern 3: Array Cell Binding
Bind row/column/value triplets:

```csharp
.DataSource(new HeatMapData
{
    AdaptorType = Syncfusion.EJ2.HeatMap.AdaptorType.Cell,
    Data = Model.CellDataArray
})
```

### Pattern 4: With Tooltips and Labels
Complete visualization with all interactive features:

```csharp
@Html.EJS().HeatMap("container")
    .DataSource(Model)
    .CellSettings(cell => cell.ShowLabel(true))
    .Tooltip(tooltip => 
    {
        tooltip.Visible(true);
        tooltip.Format("{value}");
    })
    .Legend(legend => legend.Visible(true))
    .Render()
```

## Key Properties

| Property | Type | Purpose | Common Values |
|----------|------|---------|----------------|
| `DataSource` | Object | Data to visualize | Array, JSON object |
| `ValueType` | ValueType | Axis data type | Category, Numeric, DateTime |
| `CellSettings` | CellSettings | Cell appearance | ShowLabel, Format |
| `Legend` | Legend | Legend configuration | Visible, Position, Type |
| `Tooltip` | Tooltip | Tooltip display | Visible, Format, Template |
| `Palette` | List<string> | Color palette | Predefined or custom colors |
| `SelectionMode` | SelectionMode | Selection behavior | Cell, Series, None |
| `RenderingMode` | RenderingMode | Rendering engine | SVG, Canvas, Auto |

## Common Use Cases

**Sales Performance Dashboard**: Display sales by region and time period with gradient coloring to identify trends and outliers.

**Correlation Matrix**: Visualize relationships between multiple variables using color intensity to represent correlation strength.

**User Activity Heatmap**: Show user engagement patterns across time periods with interactive tooltips for detailed analysis.

**Inventory Status Grid**: Monitor stock levels across products and warehouses with color-coded alerts for low inventory.

**Temperature/Weather Visualization**: Display temperature variations across locations and time with gradient color schemes.

**Website Traffic Analysis**: Show visitor patterns by page and hour with bubble HeatMap for three-variable analysis.

**Student Performance Matrix**: Visualize grades across subjects and classes with selection for detailed analysis.

HeatMap provides powerful two-dimensional data visualization capabilities for analysis, exploration, and presentation of complex datasets.

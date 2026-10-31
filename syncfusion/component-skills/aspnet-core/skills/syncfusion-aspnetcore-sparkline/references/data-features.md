# Data Features & Customization

## Table of Contents
- [Data Source Binding](#data-source-binding)
- [Marker Configuration](#marker-configuration)
- [Customizing Markers](#customizing-markers)
- [Data Labels](#data-labels)
- [Customizing Data Labels](#customizing-data-labels)
- [Range Bands](#range-bands)
- [Multiple Range Bands](#multiple-range-bands)
- [Complete Example: Combined Features](#complete-example-combined-features)

## Data Source Binding

Data binding connects your data model to the sparkline for visualization.

**Basic data model:**

```csharp
public class SalesData
{
    public int Month { get; set; }
    public string MonthName { get; set; }
    public double Revenue { get; set; }
}

public static List<SalesData> GetSalesData()
{
    List<SalesData> data = new List<SalesData>();
    data.Add(new SalesData() { Month = 1, MonthName = "Jan", Revenue = 15000 });
    data.Add(new SalesData() { Month = 2, MonthName = "Feb", Revenue = 18000 });
    data.Add(new SalesData() { Month = 3, MonthName = "Mar", Revenue = 16500 });
    data.Add(new SalesData() { Month = 4, MonthName = "Apr", Revenue = 22000 });
    data.Add(new SalesData() { Month = 5, MonthName = "May", Revenue = 25000 });
    data.Add(new SalesData() { Month = 6, MonthName = "Jun", Revenue = 28000 });
    return data;
}
```

**Binding to sparkline:**

```cshtml
<!-- Controller/PageModel passes data -->
@{ ViewBag.Sales = SalesData.GetSalesData(); }

<!-- Sparkline binds to xName and yName properties -->
<ejs-sparkline id="salesSparkline" 
    type="Line"
    dataSource="ViewBag.Sales"
    xName="MonthName" 
    yName="Revenue"
    height="80">
</ejs-sparkline>
```

**Key points:**
- `dataSource` - Collection of data objects
- `xName` - Property name for X-axis labels
- `yName` - Property name for Y-axis values (must be numeric)
- Data objects can have any property names

## Marker Configuration

Markers highlight specific data points on the sparkline. Enable markers with the `markerSettings` element.

**Marker visibility options:**

- **All** - Shows marker at every point
- **Start** - Only at first point
- **End** - Only at last point
- **High** - Only at highest value point
- **Low** - Only at lowest value point
- **Negative** - Only at negative value points

**Example: Markers on all points:**

```cshtml
<ejs-sparkline id="sparklineAllMarkers" 
    type="Line"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-markersettings visible="All"></e-sparkline-markersettings>
</ejs-sparkline>
```

**Example: Markers on high and low points:**

```cshtml
<ejs-sparkline id="sparklineSpecialMarkers" 
    type="Line"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-markersettings visible="High,Low"></e-sparkline-markersettings>
</ejs-sparkline>
```

**Example: Start and end point markers:**

```cshtml
<ejs-sparkline id="sparklineEndMarkers" 
    type="Area"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-markersettings visible="Start,End"></e-sparkline-markersettings>
</ejs-sparkline>
```

## Customizing Markers

Markers can be styled independently based on their type (All, High, Low, etc.).

**Marker properties:**
- `fill` - Color (hex or named color)
- `border` - Border configuration (color, width)
- `opacity` - Transparency (0-1)
- `size` - Marker diameter in pixels

**Example: Customize all markers:**

```cshtml
<ejs-sparkline id="customMarkerSparkline" 
    type="Line"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-markersettings visible="All">
    </e-sparkline-markersettings>
</ejs-sparkline>
```

**Example: Customize specific marker types:**

```cshtml
<ejs-sparkline id="specialMarkersStyled" 
    type="Line"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-markersettings visible="High,Low">
        <e-sparklinemarkersettings-border color="#bb2d3b" width="2"></e-sparklinemarkersettings-border>
    </e-sparkline-markersettings>
</ejs-sparkline>
```

## Data Labels

Data labels display the actual data values on or near each data point, improving readability.

**Data label visibility options:**
- **All** - Shows label for every point
- **Start** - Only at first point
- **End** - Only at last point
- **High** - Only at highest value point
- **Low** - Only at lowest value point
- **Negative** - Only at negative value points

**Example: Enable data labels for all points:**

```cshtml
<ejs-sparkline id="sparklineWithLabels" 
    type="Column"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-datalabelsettings visible="All"></e-sparkline-datalabelsettings>
</ejs-sparkline>
```

**Example: Show only start and end values:**

```cshtml
<ejs-sparkline id="sparklineEndLabels" 
    type="Area"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-datalabelsettings visible="Start,End"></e-sparkline-datalabelsettings>
</ejs-sparkline>
```

## Customizing Data Labels

Customize data label appearance and format.

**Label properties:**
- `fill` - Background color
- `border` - Border styling
- `opacity` - Transparency
- `textStyle.color` - Text color
- `format` - Display format (e.g., "${yval}")

**Example: Style data labels with custom format:**

```cshtml
<ejs-sparkline id="customLabels" 
    type="Column"
    dataSource="ViewBag.SalesData"
    xName="Month" 
    yName="Revenue"
    height="80">
    <e-sparkline-datalabelsettings 
        visible="All"
        format="${yval}">
        <e-sparklinedatalabelsettings-border color="#333333" width="1"></e-sparklinedatalabelsettings-border>
        <e-sparklinedatalabelsettings-textstyle color="#000000"></e-sparklinedatalabelsettings-textstyle>
    </e-sparkline-datalabelsettings>
</ejs-sparkline>
```

**Example: Format displaying month and revenue:**

```cshtml
<e-sparkline-datalabelsettings 
    visible="All"
    format="${xval}: ${yval}">
</e-sparkline-datalabelsettings>
```

**Format tokens:**
- `${xval}` - X-axis value
- `${yval}` - Y-axis value
- Custom text: `"Sales ${yval}K"`

## Range Bands

Range bands highlight a specific range of values on the Y-axis, useful for showing target ranges or alert zones.

**Range band properties:**
- `startRange` - Lower bound value
- `endRange` - Upper bound value
- `color` - Band fill color
- `opacity` - Band transparency (0-1)

**Example: Single range band:**

```cshtml
<ejs-sparkline id="sparklineWithBand" 
    type="Line"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80">
    <e-sparkline-rangebandsettings>
        <e-sparkline-rangebandsetting startRange="20000000" endRange="21000000" color="#FF5733" opacity="0.3"></e-sparkline-rangebandsetting>
    </e-sparkline-rangebandsettings>
</ejs-sparkline>
```

**Use cases for range bands:**
- Highlight target performance zone (green band)
- Show alert range (red band for values exceeding threshold)
- Display acceptable operating range
- Mark seasonal variations

## Multiple Range Bands

Combine multiple bands to show different value zones (normal, warning, critical).

**Example: Three-zone indicator with range bands:**

```cshtml
<ejs-sparkline id="multiRangeSparkline" 
    type="Column"
    dataSource="ViewBag.PerformanceData"
    xName="Period" 
    yName="Score"
    height="80">
    <e-sparkline-rangebandsettings>
        <!-- Critical Zone: Red (0-40) -->
        <e-sparkline-rangebandsetting startRange="0" endRange="40" color="#dc3545" opacity="0.2"></e-sparkline-rangebandsetting>
        <!-- Warning Zone: Yellow (40-70) -->
        <e-sparkline-rangebandsetting startRange="40" endRange="70" color="#ffc107" opacity="0.2"></e-sparkline-rangebandsetting>
        <!-- Good Zone: Green (70-100) -->
        <e-sparkline-rangebandsetting startRange="70" endRange="100" color="#28a745" opacity="0.2"></e-sparkline-rangebandsetting>
    </e-sparkline-rangebandsettings>
</ejs-sparkline>
```

**Example: Financial target bands:**

```cshtml
<ejs-sparkline id="budgetSparkline" 
    type="Area"
    dataSource="ViewBag.BudgetData"
    xName="Month" 
    yName="Spending"
    height="80">
    <e-sparkline-rangebandsettings>
        <!-- Below Budget (good) -->
        <e-sparkline-rangebandsetting startRange="0" endRange="85000" color="#90EE90" opacity="0.2"></e-sparkline-rangebandsetting>
        <!-- At Budget (acceptable) -->
        <e-sparkline-rangebandsetting startRange="85000" endRange="100000" color="#FFD700" opacity="0.2"></e-sparkline-rangebandsetting>
        <!-- Over Budget (alert) -->
        <e-sparkline-rangebandsetting startRange="100000" endRange="150000" color="#FF6B6B" opacity="0.2"></e-sparkline-rangebandsetting>
    </e-sparkline-rangebandsettings>
</ejs-sparkline>
```

## Complete Example: Combined Features

```cshtml
<ejs-sparkline id="advancedSparkline" 
    type="Column"
    dataSource="ViewBag.SalesData"
    xName="Month" 
    yName="Revenue"
    height="100">
    <!-- Markers on high and low -->
    <e-sparkline-markersettings visible="High,Low">
        <e-sparklinemarkersettings-border color="#bb2d3b" width="2"></e-sparklinemarkersettings-border>
    </e-sparkline-markersettings>
    
    <!-- Data labels for all points -->
    <e-sparkline-datalabelsettings visible="All" format="${yval}K"></e-sparkline-datalabelsettings>
    
    <!-- Range bands for target zones -->
    <e-sparkline-rangebandsettings>
        <e-sparkline-rangebandsetting startRange="15000" endRange="25000" color="#28a745" opacity="0.15"></e-sparkline-rangebandsetting>
    </e-sparkline-rangebandsettings>
</ejs-sparkline>
```

This creates a comprehensive sparkline with visual indicators for high/low points, labeled values, and target range highlighting.

# Start Angle and Rendering Position

Guide to configuring the starting angle and rendering position of polar charts using the StartAngle property.

## Table of Contents
- [Overview](#overview)
- [Available Angles](#available-angles)
- [Implementation](#implementation)
- [Use Cases](#use-cases)
- [Visual Comparison](#visual-comparison)
- [Best Practices](#best-practices)

## Overview

The `StartAngle` property allows you to change the rendering position of the polar chart by rotating where the first data point appears. This is useful for aligning the chart with specific orientations or conventions.

**Default Value:** `Rotate270` (starts at the top, 12 o'clock position)

## Available Angles

The polar chart supports four start angle positions:

| Angle | Position | Degrees | Description |
|-------|----------|---------|-------------|
| `Rotate0` | Right | 0° | First point at 3 o'clock |
| `Rotate90` | Bottom | 90° | First point at 6 o'clock |
| `Rotate180` | Left | 180° | First point at 9 o'clock |
| `Rotate270` | Top | 270° | First point at 12 o'clock (default) |

### Visual Representation

```
        Rotate270 (270°)
              Top
               ↑
               |
Rotate180 ←----+----→ Rotate0
 (180°)        |        (0°)
   Left        |       Right
               |
               ↓
           Rotate90 (90°)
            Bottom
```

## Implementation

### Basic Usage

**XAML:**
```xml
<chart:SfPolarChart StartAngle="Rotate0">
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.SecondaryAxis>
    
    <chart:SfPolarChart.Series>
        <chart:PolarAreaSeries ItemsSource="{Binding Data}"
                               XBindingPath="Category"
                               YBindingPath="Value"/>
    </chart:SfPolarChart.Series>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
SfPolarChart chart = new SfPolarChart();
chart.StartAngle = ChartPolarAngle.Rotate0;

// Configure axes and series
chart.PrimaryAxis = new CategoryAxis();
chart.SecondaryAxis = new NumericalAxis();

PolarAreaSeries series = new PolarAreaSeries
{
    ItemsSource = viewModel.Data,
    XBindingPath = "Category",
    YBindingPath = "Value"
};

chart.Series.Add(series);
```

### All Angle Options

**Rotate0 (Right - 3 o'clock):**
```xml
<chart:SfPolarChart StartAngle="Rotate0">
    <!-- Chart starts from right side -->
</chart:SfPolarChart>
```

**Rotate90 (Bottom - 6 o'clock):**
```xml
<chart:SfPolarChart StartAngle="Rotate90">
    <!-- Chart starts from bottom -->
</chart:SfPolarChart>
```

**Rotate180 (Left - 9 o'clock):**
```xml
<chart:SfPolarChart StartAngle="Rotate180">
    <!-- Chart starts from left side -->
</chart:SfPolarChart>
```

**Rotate270 (Top - 12 o'clock - Default):**
```xml
<chart:SfPolarChart StartAngle="Rotate270">
    <!-- Chart starts from top (default) -->
</chart:SfPolarChart>
```

## Use Cases

### Rotate270 (Top - Default)

**When to use:**
- **Compass directions:** North starts at the top (most intuitive)
- **Clock representations:** 12 o'clock at the top
- **General data visualization:** Standard orientation
- **Map-based data:** Aligns with geographic north

**Example - Compass Data:**
```xml
<chart:SfPolarChart Header="Wind Direction Analysis"
                    StartAngle="Rotate270">
    <chart:PolarLineSeries ItemsSource="{Binding WindData}"
                           XBindingPath="Direction"
                           YBindingPath="Speed"/>
    <!-- North appears at top -->
</chart:SfPolarChart>
```

### Rotate0 (Right)

**When to use:**
- **Mathematical conventions:** 0° is typically at the right in mathematics
- **Trigonometric data:** Standard mathematical polar coordinates
- **Technical/scientific charts:** Engineering conventions
- **Phase diagrams:** Electrical engineering

**Example - Phase Analysis:**
```xml
<chart:SfPolarChart Header="Signal Phase Diagram"
                    StartAngle="Rotate0">
    <chart:PolarLineSeries ItemsSource="{Binding PhaseData}"
                           XBindingPath="Phase"
                           YBindingPath="Amplitude"/>
    <!-- 0° phase at right -->
</chart:SfPolarChart>
```

### Rotate90 (Bottom)

**When to use:**
- **Seasonal data:** Starting with winter at bottom, summer at top
- **Custom orientations:** Specific business or domain requirements
- **Inverted displays:** When bottom-up view is more intuitive

**Example - Seasonal Analysis:**
```xml
<chart:SfPolarChart Header="Seasonal Sales Pattern"
                    StartAngle="Rotate90">
    <chart:PolarAreaSeries ItemsSource="{Binding SeasonalData}"
                           XBindingPath="Season"
                           YBindingPath="Sales"/>
    <!-- First season (e.g., Winter) at bottom -->
</chart:SfPolarChart>
```

### Rotate180 (Left)

**When to use:**
- **Mirrored displays:** When left-to-right flow is desired
- **Alternative orientations:** Domain-specific conventions
- **Comparison charts:** Mirroring another chart for comparison

**Example - Comparative Analysis:**
```xml
<Grid>
    <Grid.ColumnDefinitions>
        <ColumnDefinition/>
        <ColumnDefinition/>
    </Grid.ColumnDefinitions>
    
    <!-- Standard chart -->
    <chart:SfPolarChart Grid.Column="0"
                        Header="2025 Data"
                        StartAngle="Rotate0">
        <chart:PolarAreaSeries ItemsSource="{Binding Data2025}"/>
    </chart:SfPolarChart>
    
    <!-- Mirrored chart -->
    <chart:SfPolarChart Grid.Column="1"
                        Header="2026 Data"
                        StartAngle="Rotate180">
        <chart:PolarAreaSeries ItemsSource="{Binding Data2026}"/>
    </chart:SfPolarChart>
</Grid>
```

## Visual Comparison

### Side-by-Side Example

Here's an example showing all four start angles:

```xml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition/>
        <RowDefinition/>
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition/>
        <ColumnDefinition/>
    </Grid.ColumnDefinitions>
    
    <!-- Rotate270 (Default - Top) -->
    <chart:SfPolarChart Grid.Row="0" Grid.Column="0"
                        Header="Rotate270 (Top)"
                        StartAngle="Rotate270"
                        GridLineType="Polygon">
        <chart:PolarAreaSeries ItemsSource="{Binding Data}"
                               XBindingPath="Direction"
                               YBindingPath="Value"/>
    </chart:SfPolarChart>
    
    <!-- Rotate0 (Right) -->
    <chart:SfPolarChart Grid.Row="0" Grid.Column="1"
                        Header="Rotate0 (Right)"
                        StartAngle="Rotate0"
                        GridLineType="Polygon">
        <chart:PolarAreaSeries ItemsSource="{Binding Data}"
                               XBindingPath="Direction"
                               YBindingPath="Value"/>
    </chart:SfPolarChart>
    
    <!-- Rotate90 (Bottom) -->
    <chart:SfPolarChart Grid.Row="1" Grid.Column="0"
                        Header="Rotate90 (Bottom)"
                        StartAngle="Rotate90"
                        GridLineType="Polygon">
        <chart:PolarAreaSeries ItemsSource="{Binding Data}"
                               XBindingPath="Direction"
                               YBindingPath="Value"/>
    </chart:SfPolarChart>
    
    <!-- Rotate180 (Left) -->
    <chart:SfPolarChart Grid.Row="1" Grid.Column="1"
                        Header="Rotate180 (Left)"
                        StartAngle="Rotate180"
                        GridLineType="Polygon">
        <chart:PolarAreaSeries ItemsSource="{Binding Data}"
                               XBindingPath="Direction"
                               YBindingPath="Value"/>
    </chart:SfPolarChart>
</Grid>
```

### Data Order Matters

The start angle determines where the **first data point** in your collection appears:

```csharp
// Data collection
public ObservableCollection<DirectionData> Data { get; set; } = new()
{
    new DirectionData { Direction = "North", Value = 80 },    // First point
    new DirectionData { Direction = "East", Value = 75 },     // Second point
    new DirectionData { Direction = "South", Value = 85 },    // Third point
    new DirectionData { Direction = "West", Value = 70 }      // Fourth point
};
```

- **Rotate270 (Top):** "North" appears at top
- **Rotate0 (Right):** "North" appears at right
- **Rotate90 (Bottom):** "North" appears at bottom
- **Rotate180 (Left):** "North" appears at left

## Best Practices

### Choosing the Right Start Angle

1. **Match User Expectations:**
   ```xml
   <!-- Compass/Geographic data: Use Rotate270 (top) -->
   <chart:SfPolarChart StartAngle="Rotate270">
       <chart:PolarLineSeries ItemsSource="{Binding CompassData}"/>
   </chart:SfPolarChart>
   
   <!-- Mathematical/Scientific: Use Rotate0 (right) -->
   <chart:SfPolarChart StartAngle="Rotate0">
       <chart:PolarLineSeries ItemsSource="{Binding MathData}"/>
   </chart:SfPolarChart>
   ```

2. **Consider Your Domain:**
   - **Geography/Navigation:** Rotate270 (North at top)
   - **Mathematics/Engineering:** Rotate0 (0° at right)
   - **Custom:** Choose what makes sense for your users

3. **Be Consistent:**
   - Use the same start angle across related charts
   - Document your choice if it's non-standard
   - Consider adding a label or legend to clarify orientation

### Data Organization

1. **Order Data Logically:**
   ```csharp
   // Good: Logical compass order
   new[] { "North", "East", "South", "West" }
   
   // Good: Clockwise hours
   new[] { "12AM", "3AM", "6AM", "9AM", "12PM", "3PM", "6PM", "9PM" }
   
   // Avoid: Random order
   new[] { "South", "North", "West", "East" }  // Confusing
   ```

2. **Match Start Angle to Data:**
   - If data starts with "North", use Rotate270
   - If data starts with "0°", use Rotate0
   - Align start angle with first data point's meaning

### Visual Clarity

1. **Add Labels:**
   ```xml
   <!-- Make orientation clear with labels -->
   <chart:SfPolarChart StartAngle="Rotate0">
       <chart:SfPolarChart.PrimaryAxis>
           <chart:CategoryAxis ShowGridLines="True"/>
       </chart:SfPolarChart.PrimaryAxis>
   </chart:SfPolarChart>
   ```

2. **Use Polygon Grid for Clarity:**
   ```xml
   <!-- Polygon grid makes orientation more obvious -->
   <chart:SfPolarChart StartAngle="Rotate270"
                       GridLineType="Polygon">
       <!-- Polygon grid shows clear directional lines -->
   </chart:SfPolarChart>
   ```

3. **Consider Adding Title/Description:**
   ```xml
   <chart:SfPolarChart Header="Wind Data (North at Top)"
                       StartAngle="Rotate270">
       <!-- Title clarifies orientation -->
   </chart:SfPolarChart>
   ```

### Performance

- **No performance impact:** Changing start angle is a visual transformation only
- **Use freely:** No overhead regardless of angle chosen

## Complete Example

Here's a comprehensive example showing practical usage:

```xml
<chart:SfPolarChart Header="Plant Distribution by Compass Direction"
                    StartAngle="Rotate270"
                    GridLineType="Polygon">
    
    <!-- Category axis with compass directions -->
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis>
            <chart:CategoryAxis.LabelStyle>
                <chart:LabelStyle FontSize="12"/>
            </chart:CategoryAxis.LabelStyle>
        </chart:CategoryAxis>
    </chart:SfPolarChart.PrimaryAxis>
    
    <!-- Numerical axis for counts -->
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis Header="Tree Count">
            <chart:NumericalAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="0"/>
            </chart:NumericalAxis.LabelStyle>
        </chart:NumericalAxis>
    </chart:SfPolarChart.SecondaryAxis>
    
    <!-- Legend -->
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend/>
    </chart:SfPolarChart.Legend>
    
    <!-- Series -->
    <chart:SfPolarChart.Series>
        <chart:PolarAreaSeries ItemsSource="{Binding TreeData}"
                               XBindingPath="Direction"
                               YBindingPath="Count"
                               Label="Trees"
                               ShowDataLabels="True"/>
    </chart:SfPolarChart.Series>
    
</chart:SfPolarChart>
```

**Data Model:**
```csharp
public class TreeData
{
    public string Direction { get; set; }  // "North", "NorthEast", "East", etc.
    public int Count { get; set; }
}

// ViewModel - Order matters!
public ObservableCollection<TreeData> TreeData { get; set; } = new()
{
    new TreeData { Direction = "North", Count = 80 },      // Appears at top with Rotate270
    new TreeData { Direction = "NorthEast", Count = 85 },
    new TreeData { Direction = "East", Count = 78 },
    new TreeData { Direction = "SouthEast", Count = 82 },
    new TreeData { Direction = "South", Count = 75 },
    new TreeData { Direction = "SouthWest", Count = 88 },
    new TreeData { Direction = "West", Count = 80 },
    new TreeData { Direction = "NorthWest", Count = 83 }
};
```

## Summary

**Key Points:**
- **StartAngle Property:** Controls where the first data point appears
- **Four Options:** Rotate0 (right), Rotate90 (bottom), Rotate180 (left), Rotate270 (top/default)
- **Default:** Rotate270 (top) - standard for compass/geographic data
- **Mathematical:** Rotate0 (right) - standard for scientific data
- **Data Order:** First item in collection appears at start angle position
- **Best Practice:** Match start angle to user expectations and data semantics

Choose the start angle that makes your polar chart most intuitive for your users!

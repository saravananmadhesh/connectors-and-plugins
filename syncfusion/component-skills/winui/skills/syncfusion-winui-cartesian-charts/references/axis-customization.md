# Axis Customization

## Table of Contents
- [Axis Labels](#axis-labels)
- [Axis Header](#axis-header)
- [Axis Line](#axis-line)
- [Grid Lines](#grid-lines)
- [Tick Lines](#tick-lines)
- [Axis Padding](#axis-padding)
- [Axis Positioning](#axis-positioning)
- [Auto-Scrolling](#auto-scrolling)

## Axis Labels

Axis labels display the values along the axis to help users interpret the data.

### Label Rotation

Rotate labels to prevent overlapping:

**XAML:**
```xaml
<chart:CategoryAxis LabelRotation="45"/>
```

**C#:**
```csharp
CategoryAxis axis = new CategoryAxis();
axis.LabelRotation = 45; // Degrees
```

Common angles: 0 (horizontal), 45 (diagonal), 90 (vertical), -45 (negative diagonal)

### Label Formatting

Format numeric and date labels:

**Numeric Formatting:**
```xaml
<chart:NumericalAxis>
    <chart:NumericalAxis.LabelStyle>
        <chart:LabelStyle LabelFormat="C0"/> <!-- Currency, no decimals -->
    </chart:NumericalAxis.LabelStyle>
</chart:NumericalAxis>
```

**Date Formatting:**
```xaml
<chart:DateTimeAxis>
    <chart:DateTimeAxis.LabelStyle>
        <chart:LabelStyle LabelFormat="MMM-yyyy"/>
    </chart:DateTimeAxis.LabelStyle>
</chart:DateTimeAxis>
```

**Common Format Strings:**
- `"C0"` - Currency: $1,234
- `"C2"` - Currency with decimals: $1,234.56
- `"N0"` - Number: 1,234
- `"N2"` - Number with decimals: 1,234.56
- `"P0"` - Percentage: 50%
- `"P2"` - Percentage with decimals: 50.25%
- `"0.00"` - Fixed 2 decimals: 1234.56
- `"#,##0"` - Thousands separator: 1,234

### Label Style Customization

**XAML:**
```xaml
<chart:NumericalAxis>
    <chart:NumericalAxis.LabelStyle>
        <chart:LabelStyle FontSize="14" 
                         Foreground="DarkBlue"
                         FontFamily="Segoe UI"/>
    </chart:NumericalAxis.LabelStyle>
</chart:NumericalAxis>
```

**C#:**
```csharp
axis.LabelStyle = new LabelStyle
{
    FontSize = 14,
    Foreground = new SolidColorBrush(Colors.DarkBlue),
    FontFamily = new FontFamily("Segoe UI"),
};
```

## Axis Header

Add a title to describe what the axis represents:

**XAML:**
```xaml
<chart:CategoryAxis Header="Product Categories"/>

<chart:NumericalAxis Header="Revenue (Million $)"/>
```

**C#:**
```csharp
CategoryAxis xAxis = new CategoryAxis();
xAxis.Header = "Product Categories";

NumericalAxis yAxis = new NumericalAxis();
yAxis.Header = "Revenue (Million $)";
```

### Header Template

Create custom header appearance:

**XAML:**
```xaml
<chart:NumericalAxis>
    <chart:NumericalAxis.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <TextBlock Text="💰 " FontSize="16"/>
                <TextBlock Text="Revenue" 
                          FontWeight="Bold" 
                          FontSize="14"
                          Foreground="Green"/>
            </StackPanel>
        </DataTemplate>
    </chart:NumericalAxis.HeaderTemplate>
</chart:NumericalAxis>
```

### Header Style

**XAML:**
```xaml
<chart:NumericalAxis Header="Sales">
    <chart:NumericalAxis.HeaderStyle>
        <chart:LabelStyle FontSize="16"
                         Foreground="DarkGreen"/>
    </chart:NumericalAxis.HeaderStyle>
</chart:NumericalAxis>
```

**C#:**
```csharp
NumericalAxis axis = new NumericalAxis();
axis.Header = "Sales";
axis.HeaderStyle = new LabelStyle
{
    FontSize = 16,
    Foreground = new SolidColorBrush(Colors.DarkGreen)
};
```

## Axis Line

The axis line is the main line along which labels and tick marks appear.

### Styling

**XAML:**
```xaml
<chart:NumericalAxis>
    <chart:NumericalAxis.AxisLineStyle>
        <Style TargetType="Line">
            <Setter Property="Stroke" Value="DarkGray"/>
            <Setter Property="StrokeDashArray" Value="5,3"/>
        </Style>
    </chart:NumericalAxis.AxisLineStyle>
</chart:NumericalAxis>
```

**C#:**
```csharp
Style axisLineStyle = new Style(typeof(Line));
axisLineStyle.Setters.Add(new Setter(Line.StrokeProperty, new SolidColorBrush(Colors.DarkGray)));
axisLineStyle.Setters.Add(new Setter(Line.StrokeThicknessProperty, 2));

axis.AxisLineStyle = axisLineStyle;
```

## Grid Lines

Grid lines help users trace values from series to axes.

### Major Grid Lines

**Visibility:**
```xaml
<chart:NumericalAxis ShowMajorGridLines="True"/> <!-- Default -->
```

**Styling:**
```xaml
<chart:NumericalAxis>
    <chart:NumericalAxis.MajorGridLineStyle>
        <Style TargetType="Line">
            <Setter Property="Stroke" Value="LightGray"/>
            <Setter Property="StrokeThickness" Value="1"/>
            <Setter Property="StrokeDashArray" Value="3,3"/>
        </Style>
    </chart:NumericalAxis.MajorGridLineStyle>
</chart:NumericalAxis>
```

### Minor Grid Lines

Minor grid lines appear between major grid lines for finer granularity:

**Enable Minor Grid Lines:**
```xaml
<chart:NumericalAxis ShowMinorGridLines="True" 
                    MinorTicksPerInterval="4"/>
```

**Styling:**
```xaml
<chart:NumericalAxis ShowMinorGridLines="True" 
                    MinorTicksPerInterval="4">
    <chart:NumericalAxis.MinorGridLineStyle>
        <Style TargetType="Line">
            <Setter Property="Stroke" Value="LightGray"/>
            <Setter Property="StrokeThickness" Value="0.5"/>
            <Setter Property="StrokeDashArray" Value="2,2"/>
            <Setter Property="Opacity" Value="0.5"/>
        </Style>
    </chart:NumericalAxis.MinorGridLineStyle>
</chart:NumericalAxis>
```

### Hide All Grid Lines

```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis ShowMajorGridLines="False"/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis ShowMajorGridLines="False"/>
    </chart:SfCartesianChart.YAxes>
</chart:SfCartesianChart>
```

## Tick Lines

Tick marks appear at each label position along the axis. Minor tick lines can be added by defining the `MinorTicksPerInterval` property.

### Major Tick Lines

**Styling:**
```xaml
<chart:NumericalAxis>
    <chart:NumericalAxis.MajorTickStyle>
        <Style TargetType="Line">
            <Setter Property="Stroke" Value="Black"/>
            <Setter Property="StrokeThickness" Value="1.5"/>
        </Style>
    </chart:NumericalAxis.MajorTickStyle>
</chart:NumericalAxis>
```

**C#:**
```csharp
Style majorTickStyle = new Style(typeof(Line));
majorTickStyle.Setters.Add(new Setter(Line.StrokeProperty, new SolidColorBrush(Colors.Black)));
majorTickStyle.Setters.Add(new Setter(Line.StrokeThicknessProperty, 1.5));

axis.MajorTickStyle = majorTickStyle;
```

**Tick Line Size:**
```xaml
<chart:NumericalAxis TickLineSize="10"/>
```

**C#:**
```csharp
axis.TickLineSize = 10;
```

### Minor Tick Lines

```xaml
<chart:NumericalAxis MinorTicksPerInterval="4"
                    MinorTickLineSize="5">
    <chart:NumericalAxis.MinorTickStyle>
        <Style TargetType="Line">
            <Setter Property="Stroke" Value="Gray"/>
            <Setter Property="StrokeThickness" Value="0.8"/>
        </Style>
    </chart:NumericalAxis.MinorTickStyle>
</chart:NumericalAxis>
```

**C#:**
```csharp
Style minorTickStyle = new Style(typeof(Line));
minorTickStyle.Setters.Add(new Setter(Line.StrokeProperty, new SolidColorBrush(Colors.Gray)));
minorTickStyle.Setters.Add(new Setter(Line.StrokeThicknessProperty, 0.8));

axis.MinorTicksPerInterval = 4;
axis.MinorTickLineSize = 5;
axis.MinorTickStyle = minorTickStyle;
```

## Axis Padding

Control spacing between axis and plot area:

### PlotOffset

Add padding at the start and end of the axis:

**XAML:**
```xaml
<chart:CategoryAxis PlotOffsetStart="20" 
                   PlotOffsetEnd="20"/>
```

**C#:**
```csharp
CategoryAxis axis = new CategoryAxis();
axis.PlotOffsetStart = 20;
axis.PlotOffsetEnd = 20;
```

### Range Padding

Automatically add padding around data range:

**XAML:**
```xaml
<chart:NumericalAxis RangePadding="Round"/>
```

**RangePadding Options:**
- `None` - No padding, range matches data exactly
- `Round` - Extends range to nearest nice number
- `Normal` - Adds small padding (default for most axes)
- `Additional` - Adds extra padding beyond Round
- `RoundStart` - Rounds only the start value
- `RoundEnd` - Rounds only the end value
- `PrependInterval` - Adds one interval before minimum
- `AppendInterval` - Adds one interval after maximum

**Example with Different Padding:**
```xaml
<!-- No padding - tight fit -->
<chart:NumericalAxis RangePadding="None"/>

<!-- Round to nice numbers (e.g., 47-93 becomes 40-100) -->
<chart:NumericalAxis RangePadding="Round"/>

<!-- Extra spacing -->
<chart:NumericalAxis RangePadding="Additional"/>
```

## Axis Positioning

### Inversed Axis

Reverse the axis direction:

**XAML:**
```xaml
<chart:NumericalAxis IsInversed="True"/>
```

**C#:**
```csharp
NumericalAxis axis = new NumericalAxis();
axis.IsInversed = true;
```

**Use Cases:**
- Ranking charts (1st place at top)
- Depth measurements (deeper = higher Y value, but display top-to-bottom)
- Right-to-left data flow

### Opposed Position

Move axis to opposite side:

**XAML:**
```xaml
<!-- Y-axis on right side instead of left -->
<chart:NumericalAxis OpposedPosition="True"/>
```

**C#:**
```csharp
NumericalAxis axis = new NumericalAxis();
axis.OpposedPosition = true;
```

**Effect:**
- X-axis: Moves from bottom to top
- Y-axis: Moves from left to right

**Use Case:** Multiple Y-axes with different scales

## Auto-Scrolling

Automatically scroll to show latest data (useful for real-time charts):

**XAML:**
```xaml
<chart:DateTimeAxis AutoScrollingDelta="10" 
                   AutoScrollingDeltaType="Minutes"
                   AutoScrollingMode="End"/>
```

**C#:**
```csharp
DateTimeAxis axis = new DateTimeAxis();
axis.AutoScrollingDelta = 10;
axis.AutoScrollingDeltaType = DateTimeIntervalType.Minutes;
axis.AutoScrollingMode = ChartAutoScrollingMode.End;
```

**Properties:**
- **AutoScrollingDelta** - Number of units to display
- **AutoScrollingDeltaType** - Unit type (Days, Hours, Minutes, etc.)
- **AutoScrollingMode** - `Start` or `End` (which side shows latest data)

**Example: Real-Time Monitoring**
```xaml
<chart:DateTimeAxis AutoScrollingDelta="5"
                   AutoScrollingDeltaType="Seconds"
                   AutoScrollingMode="End">
    <chart:DateTimeAxis.LabelStyle>
        <chart:LabelStyle LabelFormat="HH:mm:ss"/>
    </chart:DateTimeAxis.LabelStyle>
</chart:DateTimeAxis>
```

Shows only the last 5 seconds of data, continuously scrolling as new data arrives.

## Complete Customization Example

**Highly Styled Chart:**
```xaml
<chart:SfCartesianChart>
    
    <!-- X-Axis: Fully customized -->
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis Header="Product Categories"
                           LabelRotation="45"
                           ShowMajorGridLines="False"
                           TickLineSize="8"
                           PlotOffsetStart="10"
                           PlotOffsetEnd="10">
            
            <chart:CategoryAxis.HeaderStyle>
                <chart:LabelStyle FontSize="16"
                                 FontWeight="Bold"
                                 Foreground="#2E86AB"/>
            </chart:CategoryAxis.HeaderStyle>
            
            <chart:CategoryAxis.LabelStyle>
                <chart:LabelStyle FontSize="12" 
                                 Foreground="#333333"/>
            </chart:CategoryAxis.LabelStyle>
            
            <chart:CategoryAxis.AxisLineStyle>
                <Style TargetType="Line">
                    <Setter Property="Stroke" Value="#CCCCCC"/>
                    <Setter Property="StrokeThickness" Value="1"/>
                </Style>
            </chart:CategoryAxis.AxisLineStyle>
            
            <chart:CategoryAxis.MajorTickStyle>
                <Style TargetType="Line">
                    <Setter Property="Stroke" Value="#666666"/>
                    <Setter Property="StrokeThickness" Value="1"/>
                </Style>
            </chart:CategoryAxis.MajorTickStyle>
            
        </chart:CategoryAxis>
    </chart:SfCartesianChart.XAxes>
    
    <!-- Y-Axis: Fully customized -->
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis Header="Revenue ($)"
                            RangePadding="Round"
                            MinorTicksPerInterval="4">
            
            <chart:NumericalAxis.HeaderStyle>
                <chart:LabelStyle FontSize="16"
                                 FontWeight="Bold"
                                 Foreground="#06A77D"/>
            </chart:NumericalAxis.HeaderStyle>
            
            <chart:NumericalAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="C0" 
                                 FontSize="12"
                                 Foreground="#333333"/>
            </chart:NumericalAxis.LabelStyle>
            
            <chart:NumericalAxis.MajorGridLineStyle>
                <Style TargetType="Line">
                    <Setter Property="Stroke" Value="#E0E0E0"/>
                    <Setter Property="StrokeThickness" Value="1"/>
                </Style>
            </chart:NumericalAxis.MajorGridLineStyle>
            
            <chart:NumericalAxis.MinorGridLineStyle>
                <Style TargetType="Line">
                    <Setter Property="Stroke" Value="#F0F0F0"/>
                    <Setter Property="StrokeThickness" Value="0.5"/>
                </Style>
            </chart:NumericalAxis.MinorGridLineStyle>
            
        </chart:NumericalAxis>
    </chart:SfCartesianChart.YAxes>
    
</chart:SfCartesianChart>
```

## Best Practices

### Label Readability
- Use rotation (45° or 90°) when labels are long or numerous
- Format numbers consistently (e.g., all currency or all percentages)
- Keep font sizes readable (minimum 10-12pt)

### Grid Lines
- Use subtle colors (light gray) to avoid visual clutter
- Consider hiding X-axis grid lines for cleaner categorical charts
- Use dashed lines to differentiate from data lines

### Headers
- Always provide descriptive headers with units (e.g., "Temperature (°C)")
- Use consistent styling across all axes
- Consider icons or colors for quick recognition

### Performance
- Disable unnecessary features (minor grid lines, tick lines) for large datasets
- Use appropriate intervals to avoid rendering too many labels
- Consider auto-scrolling for real-time data instead of rendering entire history

## Troubleshooting

**Labels cut off:**
- Increase PlotOffset/PlotOffsetEnd
- Rotate labels
- Use shorter label formats

**Grid lines not visible:**
- Check ShowMajorGridLines is True
- Verify grid line color contrasts with background
- Check StrokeThickness is adequate

**Auto-scrolling not working:**
- Ensure data has DateTime type for DateTimeAxis
- Verify AutoScrollingDelta and AutoScrollingDeltaType are set
- Check that new data is being added to ItemsSource

**Tick lines overlapping labels:**
- Adjust TickLineSize (for major ticks) or MinorTickLineSize (for minor ticks)
- Customize tick line styles to reduce visual prominence
- Increase label offset using PlotOffsetStart/PlotOffsetEnd

# Data Labels

## Table of Contents
- [Overview](#overview)
- [Enabling Data Labels](#enabling-data-labels)
- [Label Context](#label-context)
- [Customization](#customization)
- [Custom Templates](#custom-templates)
- [Label Position](#label-position)
- [Rotation](#rotation)
- [Connector Lines](#connector-lines)
- [Applying Series Fill](#applying-series-fill)
- [Best Practices](#best-practices)

## Overview

Data labels display values directly on chart segments, making it easy to read exact values without relying solely on visual proportions. Each label can show various data contexts like percentages, actual values, or custom content.

**Key Components:**
- **Label** - Text displaying the value at (X, Y) position
- **Connector Line** - Optional line connecting label to segment

## Enabling Data Labels

Use the **ShowDataLabels** property to enable labels on series:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ShowDataLabels="True"
                       ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

PieSeries series = new PieSeries();
series.ShowDataLabels = true;

chart.Series.Add(series);
```

**Default Behavior:**
- Labels show Y values (numeric data)
- Positioned inside segments
- Use default font and color

## Label Context

The **Context** property in DataLabelSettings defines what value to display:

### Context Options

1. **YValue** (default) - Shows the numeric value
2. **Percentage** - Shows percentage of total
3. **XValue** - Shows X-axis value
4. **DataLabelItem** - Use the value of the `ChartDataLabel.Item` property. This allows supplying a custom object or pre-formatted text for the label.
5. **DateTime** - Display the DateTime value when the underlying series uses date/time values for X or Y.

### Percentage Labels

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ShowDataLabels="True"
                       ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate">
            <chart:PieSeries.DataLabelSettings>
                <chart:CircularDataLabelSettings Context="Percentage"/>
            </chart:PieSeries.DataLabelSettings>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.ShowDataLabels = true;
series.DataLabelSettings = new CircularDataLabelSettings()
{
    Context = LabelContext.Percentage
};

chart.Series.Add(series);
```

### Category Name Labels

**XAML:**
```xml
<chart:PieSeries ShowDataLabels="True">
    <chart:PieSeries.DataLabelSettings>
        <chart:CircularDataLabelSettings Context="DataLabelItem"/>
    </chart:PieSeries.DataLabelSettings>
</chart:PieSeries>
```

### Y Value Labels (Default)

```xml
<chart:PieSeries ShowDataLabels="True">
    <chart:PieSeries.DataLabelSettings>
        <chart:CircularDataLabelSettings Context="YValue"/>
    </chart:PieSeries.DataLabelSettings>
</chart:PieSeries>
```

## Customization

Customize label appearance using DataLabelSettings properties:

### Complete Styling Example

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ShowDataLabels="True"
                       ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate">
            <chart:PieSeries.DataLabelSettings>
                <chart:CircularDataLabelSettings Position="Outside"
                                               Foreground="White"
                                               FontSize="11"
                                               FontFamily="Calibri"
                                               BorderBrush="Black"
                                               BorderThickness="1"
                                               Margin="1"
                                               FontStyle="Italic"
                                               Background="#1E88E5"
                                               Context="Percentage"/>
            </chart:PieSeries.DataLabelSettings>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.ShowDataLabels = true;
series.DataLabelSettings = new CircularDataLabelSettings()
{
    Position = CircularSeriesLabelPosition.Outside,
    Foreground = new SolidColorBrush(Colors.White),
    BorderBrush = new SolidColorBrush(Colors.Black),
    Background = new SolidColorBrush(Color.FromArgb(255, 30, 136, 229)),
    BorderThickness = new Thickness(1),
    Margin = new Thickness(1),
    FontStyle = FontStyle.Italic,
    FontFamily = new FontFamily("Calibri"),
    FontSize = 11,
    Context = LabelContext.Percentage
};

chart.Series.Add(series);
```

### Available Styling Properties

- **Foreground** - Text color
- **FontSize** - Text size
- **FontFamily** - Font typeface
- **FontStyle** - Normal, Italic, Oblique
- **Background** - Label background color
- **BorderBrush** - Border color
- **BorderThickness** - Border width
- **Margin** - Spacing around label
- **Padding** - Internal spacing

### Simple Styling Examples

**Colored background:**
```xml
<chart:CircularDataLabelSettings Background="Orange"
                               Foreground="White"/>
```

**Bordered labels:**
```xml
<chart:CircularDataLabelSettings BorderBrush="Black"
                               BorderThickness="2"
                               Background="White"/>
```

## Custom Templates

Create completely custom label layouts using **ContentTemplate**:

**XAML:**
```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <DataTemplate x:Key="labelTemplate">
            <StackPanel Margin="10" Orientation="Vertical">
                <Ellipse Height="15"
                        Width="15"
                        Fill="Cyan"
                        Stroke="#4a4a4a"
                        StrokeThickness="2"/>
                <TextBlock HorizontalAlignment="Center"
                          FontSize="12"
                          Foreground="Black"
                          Text="{Binding Item.Product}"/>
            </StackPanel>
        </DataTemplate>
    </Grid.Resources>

    <chart:SfCircularChart>
        <chart:SfCircularChart.Series>
            <chart:PieSeries ShowDataLabels="True"
                           ItemsSource="{Binding Data}"
                           XBindingPath="Product"
                           YBindingPath="SalesRate">
                <chart:PieSeries.DataLabelSettings>
                    <chart:CircularDataLabelSettings Position="Inside"
                                                   ContentTemplate="{StaticResource labelTemplate}"
                                                   Context="DataLabelItem"/>
                </chart:PieSeries.DataLabelSettings>
            </chart:PieSeries>
        </chart:SfCircularChart.Series>
    </chart:SfCircularChart>
</Grid>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.ShowDataLabels = true;
series.DataLabelSettings = new CircularDataLabelSettings()
{
    Position = CircularSeriesLabelPosition.Inside,
    Context = LabelContext.DataLabelItem,
    ContentTemplate = grid.Resources["labelTemplate"] as DataTemplate
};

chart.Series.Add(series);
```

### Template Binding Context

The binding context available inside `ContentTemplate` depends on the selected `Context` value:

| Context | Binding Value |
|---------|---------------|
| `YValue` | Numeric Y value |
| `XValue` | X-axis/category value (string or numeric) |
| `Percentage` | Percentage string (e.g., "35.8%") |
| `DataLabelItem` | The value set on `ChartDataLabel.Item` (object or string); use `Item`/`Item.PropertyName` to access model fields |
| `DateTime` | DateTime value |

Examples:

```xml
<!-- When Context="YValue" -->
<TextBlock Text="{Binding}"/>

<!-- When Context="DataLabelItem" and Item is provided in template -->
<TextBlock Text="{Binding Item.Product}"/>
```

### Advanced Template Examples

**Value with icon:**
```xml
<DataTemplate x:Key="valueWithIcon">
    <StackPanel Orientation="Horizontal">
        <SymbolIcon Symbol="Accept" Foreground="Green"/>
        <TextBlock Text="{Binding Item.Value}"
                  Margin="5,0,0,0"
                  FontWeight="Bold"/>
    </StackPanel>
</DataTemplate>
```

**Multi-line template:**
```xml
<DataTemplate x:Key="multiLine">
    <StackPanel>
        <TextBlock Text="{Binding Item.Category}"
                  FontSize="10"
                  Foreground="Gray"/>
        <TextBlock Text="{Binding Item.Value}"
                  FontSize="14"
                  FontWeight="Bold"/>
    </StackPanel>
</DataTemplate>
```

## Label Position

Control label placement using the **Position** property:

### Position Options

1. **Inside** - Labels inside segments
2. **Outside** - Labels just outside segments
3. **OutsideExtended** - Labels outside with connector lines

### Inside Position

**XAML:**
```xml
<chart:PieSeries ShowDataLabels="True">
    <chart:PieSeries.DataLabelSettings>
        <chart:CircularDataLabelSettings Position="Inside"
                                       Context="Percentage"/>
    </chart:PieSeries.DataLabelSettings>
</chart:PieSeries>
```

**Best for:** Large segments, simple labels

### Outside Position

**XAML:**
```xml
<chart:PieSeries ShowDataLabels="True">
    <chart:PieSeries.DataLabelSettings>
        <chart:CircularDataLabelSettings Position="Outside"
                                       Context="Percentage"/>
    </chart:PieSeries.DataLabelSettings>
</chart:PieSeries>
```

**Best for:** Small segments, better readability

### OutsideExtended Position

**XAML:**
```xml
<chart:PieSeries ShowDataLabels="True">
    <chart:PieSeries.DataLabelSettings>
        <chart:CircularDataLabelSettings Position="OutsideExtended"
                                       ShowConnectorLine="True"
                                       Context="Percentage"/>
    </chart:PieSeries.DataLabelSettings>
</chart:PieSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CircularDataLabelSettings()
{
    Position = CircularSeriesLabelPosition.OutsideExtended,
    ShowConnectorLine = true,
    Context = LabelContext.Percentage
};
```

**Best for:** Many segments, avoiding overlap

## Rotation

Rotate labels using the **Rotation** property (angle in degrees):

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ShowDataLabels="True">
            <chart:PieSeries.DataLabelSettings>
                <chart:CircularDataLabelSettings Context="Percentage"
                                               Position="Outside"
                                               Rotation="335"/>
            </chart:PieSeries.DataLabelSettings>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
series.DataLabelSettings = new CircularDataLabelSettings()
{
    Context = LabelContext.Percentage,
    Position = CircularSeriesLabelPosition.Outside,
    Rotation = 335  // Degrees clockwise
};
```

**Common Rotations:**
- `0` - Horizontal (default)
- `45` - Slight angle
- `90` - Vertical
- `335` - Slight counter-angle (same as -25)

## Connector Lines

Connector lines link labels to their segments, especially useful for OutsideExtended position.

### Enabling Connector Lines

**XAML:**
```xml
<chart:PieSeries ShowDataLabels="True">
    <chart:PieSeries.DataLabelSettings>
        <chart:CircularDataLabelSettings ShowConnectorLine="True"
                                       Position="OutsideExtended"
                                       Context="Percentage"/>
    </chart:PieSeries.DataLabelSettings>
</chart:PieSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CircularDataLabelSettings()
{
    ShowConnectorLine = true,
    Position = CircularSeriesLabelPosition.OutsideExtended,
    Context = LabelContext.Percentage
};
```

### Connector Height

Control the connector line length with **ConnectorHeight**:

**XAML:**
```xml
<chart:CircularDataLabelSettings ShowConnectorLine="True"
                               ConnectorHeight="80"
                               Position="Outside"/>
```

**C#:**
```csharp
series.DataLabelSettings = new CircularDataLabelSettings()
{
    ShowConnectorLine = true,
    ConnectorHeight = 80,  // Pixels
    Position = CircularSeriesLabelPosition.Outside
};
```

### Connector Line Style

Customize connector appearance with **ConnectorLineStyle**:

**XAML:**
```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <Style TargetType="Path" x:Key="lineStyle">
            <Setter Property="StrokeDashArray" Value="10,7,5"/>
            <Setter Property="Stroke" Value="Black"/>
            <Setter Property="StrokeThickness" Value="2"/>
        </Style>
    </Grid.Resources>
    
    <chart:SfCircularChart>
        <chart:SfCircularChart.Series>
            <chart:PieSeries ShowDataLabels="True">
                <chart:PieSeries.DataLabelSettings>
                    <chart:CircularDataLabelSettings Position="Outside"
                                                   Context="Percentage"
                                                   ShowConnectorLine="True"
                                                   ConnectorHeight="40"
                                                   ConnectorLineStyle="{StaticResource lineStyle}"/>
                </chart:PieSeries.DataLabelSettings>
            </chart:PieSeries>
        </chart:SfCircularChart.Series>
    </chart:SfCircularChart>
</Grid>
```

**C#:**
```csharp
series.DataLabelSettings = new CircularDataLabelSettings()
{
    ShowConnectorLine = true,
    ConnectorHeight = 40,
    ConnectorLineStyle = grid.Resources["lineStyle"] as Style
};
```

### Connector Line Type

Specify connector shape with **ConnectorType**:

**Options:**
- **Line** - Curved line (default)
- **Bezier** - Smooth bezier curve
- **StraightLine** - Straight line

**XAML:**
```xml
<!-- Bezier curve -->
<chart:CircularDataLabelSettings ConnectorType="Bezier"
                               ConnectorHeight="40"
                               ShowConnectorLine="True"/>

<!-- Straight line -->
<chart:CircularDataLabelSettings ConnectorType="StraightLine"
                               ConnectorHeight="40"
                               ShowConnectorLine="True"/>
```

**C#:**
```csharp
// Bezier curve
series.DataLabelSettings = new CircularDataLabelSettings()
{
    ShowConnectorLine = true,
    ConnectorHeight = 40,
    ConnectorType = ConnectorMode.Bezier
};

// Straight line
series.DataLabelSettings = new CircularDataLabelSettings()
{
    ShowConnectorLine = true,
    ConnectorHeight = 40,
    ConnectorType = ConnectorMode.StraightLine
};
```

## Applying Series Fill

Use **UseSeriesPalette** to match label background with segment color:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ShowDataLabels="True">
            <chart:PieSeries.DataLabelSettings>
                <chart:CircularDataLabelSettings UseSeriesPalette="True"
                                               ShowConnectorLine="True"
                                               ConnectorHeight="40"
                                               Position="Outside"/>
            </chart:PieSeries.DataLabelSettings>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
series.DataLabelSettings = new CircularDataLabelSettings()
{
    UseSeriesPalette = true,
    ShowConnectorLine = true,
    ConnectorHeight = 40,
    Position = CircularSeriesLabelPosition.Outside
};
```

**Result:** Each label background matches its segment color. Useful for color-coded information.

## Best Practices

### Label Content

1. **Keep it concise** - Show essential information only
2. **Use percentages** - More meaningful than raw values for proportions
3. **Consider context** - Match label type to user needs
4. **Avoid redundancy** - Don't show same info in label and legend

### Positioning

1. **Inside for large segments** - When segments are big enough
2. **Outside for small segments** - Better readability
3. **OutsideExtended for many segments** - Prevents overlap
4. **Use connector lines** - With outside extended position

### Styling

1. **Ensure contrast** - Label text must be readable on segment color
2. **Consistent sizing** - Use same font size across all labels
3. **Match theme** - Coordinate with overall chart design
4. **Don't over-style** - Keep labels clean and simple

### Performance

1. **Avoid complex templates** - Keep ContentTemplate simple
2. **Limit animations** - In custom templates
3. **Test with real data** - Ensure labels don't overlap

### Accessibility

1. **Readable font size** - Minimum 10-12pt
2. **High contrast** - Between text and background
3. **Clear formatting** - Use appropriate number formatting
4. **Consider tooltips** - As alternative/supplement to labels

## Common Scenarios

### Scenario 1: Percentage Labels Outside

```xml
<chart:PieSeries ShowDataLabels="True"
               ItemsSource="{Binding Data}"
               XBindingPath="Product"
               YBindingPath="Sales">
    <chart:PieSeries.DataLabelSettings>
        <chart:CircularDataLabelSettings Position="OutsideExtended"
                                       Context="Percentage"
                                       ShowConnectorLine="True"
                                       ConnectorHeight="50"
                                       ConnectorType="Bezier"
                                       Foreground="Black"
                                       FontSize="12"
                                       FontFamily="Bold"/>
    </chart:PieSeries.DataLabelSettings>
</chart:PieSeries>
```

### Scenario 2: Value Labels with Series Colors

```xml
<chart:PieSeries ShowDataLabels="True"
               ItemsSource="{Binding Data}"
               XBindingPath="Category"
               YBindingPath="Amount">
    <chart:PieSeries.DataLabelSettings>
        <chart:CircularDataLabelSettings Position="Outside"
                                       Context="YValue"
                                       UseSeriesPalette="True"
                                       ShowConnectorLine="True"
                                       Foreground="White"
                                       FontSize="11"
                                       FontFamily="SemiBold"/>
    </chart:PieSeries.DataLabelSettings>
</chart:PieSeries>
```

### Scenario 3: Category Names Inside

```xml
<chart:PieSeries ShowDataLabels="True"
               ItemsSource="{Binding Data}"
               XBindingPath="Product"
               YBindingPath="Count">
    <chart:PieSeries.DataLabelSettings>
        <chart:CircularDataLabelSettings Position="Inside"
                                       Context="DataLabelItem"
                                       Foreground="White"
                                       FontSize="14"
                                       FontFamily="Bold"/>
    </chart:PieSeries.DataLabelSettings>
</chart:PieSeries>
```

### Scenario 4: Custom Template with Multiple Values

```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <DataTemplate x:Key="customLabel">
            <StackPanel Background="White"
                       Padding="5"
                       BorderBrush="Gray"
                       BorderThickness="1">
                <TextBlock Text="{Binding Item.Product}"
                          FontSize="10"
                          Foreground="Gray"/>
                <TextBlock Text="{Binding Item.Sales}"
                          FontSize="14"
                          FontWeight="Bold"
                          Foreground="Black"/>
            </StackPanel>
        </DataTemplate>
    </Grid.Resources>
    
    <chart:SfCircularChart>
        <chart:SfCircularChart.Series>
            <chart:PieSeries ShowDataLabels="True"
                           ItemsSource="{Binding Data}">
                <chart:PieSeries.DataLabelSettings>
                    <chart:CircularDataLabelSettings Position="OutsideExtended"
                                                   ShowConnectorLine="True"
                                                   ContentTemplate="{StaticResource customLabel}"/>
                </chart:PieSeries.DataLabelSettings>
            </chart:PieSeries>
        </chart:SfCircularChart.Series>
    </chart:SfCircularChart>
</Grid>
```
# Data Labels in Polar Charts

Complete guide to displaying and customizing data labels in Syncfusion WinUI Polar Chart, including formatting, styling, and connector lines.

## Table of Contents
- [Overview](#overview)
- [Enabling Data Labels](#enabling-data-labels)
- [Label Context](#label-context)
- [Customization](#customization)
- [Data Label Templates](#data-label-templates)
- [Label Formatting](#label-formatting)
- [Label Rotation](#label-rotation)
- [Using Series Palette](#using-series-palette)
- [Connector Lines](#connector-lines)
- [Best Practices](#best-practices)

## Overview

Data labels display values related to chart data points, making it easier to read exact values directly from the chart. Each data label can show:
- **Label:** The value displayed at the data point
- **Connector line:** A line connecting the label to its data point (optional)

## Enabling Data Labels

Enable data labels using the `ShowDataLabels` property on the series.

### Basic Implementation

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:PolarAreaSeries ShowDataLabels="True"
                           ItemsSource="{Binding Data}"
                           XBindingPath="Product"
                           YBindingPath="SalesRate"/>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
PolarAreaSeries series = new PolarAreaSeries();
series.ShowDataLabels = true;
series.ItemsSource = data;
series.XBindingPath = "Product";
series.YBindingPath = "SalesRate";
```

**Default:** Data labels are hidden (`ShowDataLabels = false`)

## Label Context

The `Context` property determines what value is displayed in the data label.

### Context Options

| Context Value | Description | Example Output |
|--------------|-------------|----------------|
| `YValue` | Y-axis value (default) | 85 |
| `XValue` | X-axis value | North |
| `Percentage` | Percentage of total | 25% |
| `DataLabelItem` | Use the `ChartDataLabel.Item` value (custom item content) | custom object/text |
| `DateTime` | Date/time value (when underlying value is a DateTime) | 2025-12-18 |

### Setting Context

**XAML:**
```xml
<chart:PolarAreaSeries ShowDataLabels="True"
                       ItemsSource="{Binding PlantDetails}"
                       XBindingPath="Direction"
                       YBindingPath="Tree">
    <chart:PolarAreaSeries.DataLabelSettings>
        <chart:PolarDataLabelSettings Context="Percentage"/>
    </chart:PolarAreaSeries.DataLabelSettings>
</chart:PolarAreaSeries>
```

**C# Code:**
```csharp
PolarAreaSeries series = new PolarAreaSeries();
series.ShowDataLabels = true;
series.DataLabelSettings = new PolarDataLabelSettings() 
{
    Context = LabelContext.Percentage 
};
```

### Context Examples

**YValue Context (Most Common):**
```xml
<chart:PolarDataLabelSettings Context="YValue"/>
<!-- Shows: 85, 92, 78, etc. -->
```

**Percentage Context:**
```xml
<chart:PolarDataLabelSettings Context="Percentage"/>
<!-- Shows: 23.5%, 18.2%, etc. -->
```

**XValue Context:**
```xml
<chart:PolarDataLabelSettings Context="XValue"/>
<!-- Shows: North, South, East, etc. -->
```

## Customization

Customize data label appearance using various properties.

### Basic Styling

**XAML:**
```xml
<chart:PolarAreaSeries ItemsSource="{Binding PlantDetails}"
                       XBindingPath="Direction"
                       YBindingPath="Tree"
                       ShowDataLabels="True">
    <chart:PolarAreaSeries.DataLabelSettings>
        <chart:PolarDataLabelSettings Foreground="White"
                                      FontSize="12"
                                      BorderBrush="White"
                                      BorderThickness="1"
                                      Margin="1"
                                      FontStyle="Italic"
                                      FontFamily="Calibri"
                                      Background="#1E88E5"/>
    </chart:PolarAreaSeries.DataLabelSettings>
</chart:PolarAreaSeries>
```

**C# Code:**
```csharp
series.DataLabelSettings = new PolarDataLabelSettings()
{
    Foreground = new SolidColorBrush(Colors.White),
    BorderBrush = new SolidColorBrush(Colors.White),
    Background = new SolidColorBrush(Color.FromArgb(255, 30, 136, 229)),
    BorderThickness = new Thickness(1),
    Margin = new Thickness(1),
    FontStyle = FontStyle.Italic,
    FontFamily = new FontFamily("Calibri"),
    FontSize = 12
};
```

### Available Styling Properties

| Property | Type | Description |
|----------|------|-------------|
| `Foreground` | Brush | Text color |
| `Background` | Brush | Background color |
| `BorderBrush` | Brush | Border color |
| `BorderThickness` | Thickness | Border width |
| `Margin` | Thickness | Outer spacing |
| `FontSize` | double | Text size |
| `FontFamily` | FontFamily | Font family |
| `FontStyle` | FontStyle | Italic |

### Example: Styled Labels

```xml
<!-- Clean white labels -->
<chart:PolarDataLabelSettings Foreground="White"
                              Background="#2196F3"
                              BorderBrush="White"
                              BorderThickness="2"
                              FontSize="13"
                              FontStyle="Italic"
                              Margin="3"/>

<!-- Dark labels with transparency -->
<chart:PolarDataLabelSettings Foreground="White"
                              Background="#80000000"
                              FontSize="11"
                              Margin="2"/>

<!-- No background, just text -->
<chart:PolarDataLabelSettings Foreground="Black"
                              FontSize="12"
                              FontStyle="Italic"
                              Background="Transparent"/>
```

## Data Label Templates

For complete customization, use the `ContentTemplate` property.

### Basic Template

**XAML:**
```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <DataTemplate x:Key="dataLabelTemplate">
            <Grid>
                <!-- Background Circle -->
                <Ellipse Width="30"
                         Height="30"
                         Fill="White"
                         Stroke="#0078DE"
                         StrokeThickness="2"/>
                <!-- Label Text -->
                <TextBlock HorizontalAlignment="Center"
                           VerticalAlignment="Center"
                           FontFamily="Segoe UI"
                           FontSize="12"
                           Foreground="#FF585858"
                           Text="{Binding}"
                           TextWrapping="Wrap"/>
            </Grid>
        </DataTemplate>
    </Grid.Resources>
    
    <chart:SfPolarChart>
        <chart:PolarAreaSeries ShowDataLabels="True">
            <chart:PolarAreaSeries.DataLabelSettings>
                <chart:PolarDataLabelSettings Context="YValue"
                                              ContentTemplate="{StaticResource dataLabelTemplate}"/>
            </chart:PolarAreaSeries.DataLabelSettings>
        </chart:PolarAreaSeries>
    </chart:SfPolarChart>
</Grid>
```

**C# Code:**
```csharp
series.DataLabelSettings = new PolarDataLabelSettings()
{
    Context = LabelContext.YValue,
    ContentTemplate = grid.Resources["dataLabelTemplate"] as DataTemplate
};
```

### Template Binding Context

The binding context for `ContentTemplate` is the value specified by the `Context` property. Common bindings:

| Context | Binding Value |
|---------|---------------|
| `YValue` | Numeric Y value |
| `XValue` | X-axis label string |
| `Percentage` | Percentage string (e.g., "35.8%") |
| `DataLabelItem` | The value set on `ChartDataLabel.Item` (object or string) |
| `DateTime` | DateTime value |

Use `{Binding}` in the template to access the bound value.

### Advanced Template Examples

**Template with Icon:**
```xml
<DataTemplate x:Key="iconLabelTemplate">
    <StackPanel Orientation="Horizontal" Spacing="4">
        <FontIcon Glyph="&#xE734;" FontSize="10" Foreground="Green"/>
        <TextBlock Text="{Binding}" FontSize="11"/>
    </StackPanel>
</DataTemplate>
```

**Template with Background:**
```xml
<DataTemplate x:Key="styledLabelTemplate">
    <Border Background="#FF6347"
            BorderBrush="White"
            BorderThickness="2"
            CornerRadius="10"
            Padding="8,4">
        <TextBlock Text="{Binding}"
                   Foreground="White"
                   FontSize="12"
                   HorizontalAlignment="Center"/>
    </Border>
</DataTemplate>
```

**Template with Multiple Elements:**
```xml
<DataTemplate x:Key="detailedLabelTemplate">
    <StackPanel Background="#E3F2FD"
                Padding="6,4"
                CornerRadius="4">
        <TextBlock Text="{Binding}"
                   FontSize="13"
                   Foreground="#0D47A1"
                   HorizontalAlignment="Center"/>
        <Rectangle Height="1"
                   Fill="#1976D2"
                   Margin="0,2,0,0"/>
        <TextBlock Text="Units"
                   FontSize="9"
                   Foreground="#1976D2"
                   HorizontalAlignment="Center"/>
    </StackPanel>
</DataTemplate>
```

## Label Formatting

Use the `Format` property to apply number or date formatting to labels.

### Basic Format

**XAML:**
```xml
<chart:PolarLineSeries ShowDataLabels="True">
    <chart:PolarLineSeries.DataLabelSettings>
        <chart:PolarDataLabelSettings Format="#.0"/>
    </chart:PolarLineSeries.DataLabelSettings>
</chart:PolarLineSeries>
```

**C# Code:**
```csharp
series.DataLabelSettings = new PolarDataLabelSettings()
{
    Format = "#.0"
};
```

### Common Format Strings

**Numeric Formats:**
```xml
<!-- One decimal place -->
<chart:PolarDataLabelSettings Format="0.0"/>
<!-- Output: 85.3 -->

<!-- Two decimal places -->
<chart:PolarDataLabelSettings Format="0.00"/>
<!-- Output: 85.32 -->

<!-- Thousands separator -->
<chart:PolarDataLabelSettings Format="#,##0"/>
<!-- Output: 1,234 -->

<!-- Percentage -->
<chart:PolarDataLabelSettings Format="0%"/>
<!-- Output: 85% -->

<!-- Currency -->
<chart:PolarDataLabelSettings Format="C"/>
<!-- Output: $85.32 -->

<!-- Currency, no decimals -->
<chart:PolarDataLabelSettings Format="C0"/>
<!-- Output: $85 -->
```

**Custom Formats:**
```xml
<!-- Add prefix -->
<chart:PolarDataLabelSettings Format="'$'#,##0"/>
<!-- Output: $1,234 -->

<!-- Add suffix -->
<chart:PolarDataLabelSettings Format="#,##0' units'"/>
<!-- Output: 1,234 units -->

<!-- Prefix and suffix -->
<chart:PolarDataLabelSettings Format="'Total: '#,##0' items'"/>
<!-- Output: Total: 1,234 items -->
```

## Label Rotation

Rotate data labels using the `Rotation` property.

### Basic Rotation

**XAML:**
```xml
<chart:PolarLineSeries ShowDataLabels="True"
                       ItemsSource="{Binding PlantDetails}"
                       XBindingPath="Direction"
                       YBindingPath="Tree">
    <chart:PolarLineSeries.DataLabelSettings>
        <chart:PolarDataLabelSettings Rotation="-45"/>
    </chart:PolarLineSeries.DataLabelSettings>
</chart:PolarLineSeries>
```

**C# Code:**
```csharp
series.DataLabelSettings = new PolarDataLabelSettings()
{
    Rotation = -45
};
```

### Rotation Values

- **0°** - Horizontal (default)
- **45° or -45°** - Diagonal
- **90° or -90°** - Vertical
- Any value from **-360 to 360**

### Use Cases

**Horizontal (0°):**
```xml
<chart:PolarDataLabelSettings Rotation="0"/>
<!-- Best for: Short values, ample space -->
```

**Diagonal (-45°):**
```xml
<chart:PolarDataLabelSettings Rotation="-45"/>
<!-- Best for: Medium values, avoiding overlap -->
```

**Vertical (90°):**
```xml
<chart:PolarDataLabelSettings Rotation="90"/>
<!-- Best for: Tight spaces, long values -->
```

## Using Series Palette

Apply the series fill color to data label backgrounds using `UseSeriesPalette`.

### Basic Implementation

**XAML:**
```xml
<chart:PolarLineSeries ShowDataLabels="True"
                       ItemsSource="{Binding PlantDetails}"
                       XBindingPath="Direction"
                       YBindingPath="Tree">
    <chart:PolarLineSeries.DataLabelSettings>
        <chart:PolarDataLabelSettings UseSeriesPalette="True"/>
    </chart:PolarLineSeries.DataLabelSettings>
</chart:PolarLineSeries>
```

**C# Code:**
```csharp
series.DataLabelSettings = new PolarDataLabelSettings()
{
    UseSeriesPalette = true,
};
```

**Effect:** The data label background will match the series fill color automatically.

### Example: Multiple Series with Palette

```xml
<chart:SfPolarChart>
    <!-- Series 1 - Red -->
    <chart:PolarAreaSeries Fill="Red" ShowDataLabels="True">
        <chart:PolarAreaSeries.DataLabelSettings>
            <chart:PolarDataLabelSettings UseSeriesPalette="True"/>
        </chart:PolarAreaSeries.DataLabelSettings>
    </chart:PolarAreaSeries>
    
    <!-- Series 2 - Blue -->
    <chart:PolarAreaSeries Fill="Blue" ShowDataLabels="True">
        <chart:PolarAreaSeries.DataLabelSettings>
            <chart:PolarDataLabelSettings UseSeriesPalette="True"/>
        </chart:PolarAreaSeries.DataLabelSettings>
    </chart:PolarAreaSeries>
</chart:SfPolarChart>
<!-- Labels will be Red and Blue respectively -->
```

## Connector Lines

Connector lines connect data labels to their data points, useful when labels are positioned away from points.

### Enabling Connector Lines

**XAML:**
```xml
<chart:PolarLineSeries ShowDataLabels="True"
                       ItemsSource="{Binding PlantDetails}"
                       XBindingPath="Direction"
                       YBindingPath="Tree">
    <chart:PolarLineSeries.DataLabelSettings>
        <chart:PolarDataLabelSettings ShowConnectorLine="True"
                                      ConnectorHeight="25"
                                      ConnectorRotation="45"/>
    </chart:PolarLineSeries.DataLabelSettings>
</chart:PolarLineSeries>
```

**C# Code:**
```csharp
series.DataLabelSettings = new PolarDataLabelSettings()
{
    ShowConnectorLine = true,
    ConnectorHeight = 25,
    ConnectorRotation = 45
};
```

### Connector Line Properties

| Property | Type | Description |
|----------|------|-------------|
| `ShowConnectorLine` | bool | Show/hide connector line |
| `ConnectorHeight` | double | Height/length of connector |
| `ConnectorRotation` | double | Rotation angle of connector |
| `ConnectorLineStyle` | Style | Style for the line |

### Customizing Connector Line Style

**XAML:**
```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <Style x:Key="connectorStyle" TargetType="Path">
            <Setter Property="Stroke" Value="Red"/>
            <Setter Property="StrokeDashArray" Value="3,2"/>
        </Style>
    </Grid.Resources>
    
    <chart:SfPolarChart>
        <chart:PolarLineSeries ShowDataLabels="True">
            <chart:PolarLineSeries.DataLabelSettings>
                <chart:PolarDataLabelSettings ShowConnectorLine="True"
                                              ConnectorHeight="30"
                                              ConnectorLineStyle="{StaticResource connectorStyle}"/>
            </chart:PolarLineSeries.DataLabelSettings>
        </chart:PolarLineSeries>
    </chart:SfPolarChart>
</Grid>
```

### Connector Line Examples

**Short Connector:**
```xml
<chart:PolarDataLabelSettings ShowConnectorLine="True"
                              ConnectorHeight="15"/>
```

**Long Connector with Rotation:**
```xml
<chart:PolarDataLabelSettings ShowConnectorLine="True"
                              ConnectorHeight="40"
                              ConnectorRotation="30"/>
```

**Dashed Connector:**
```xml
<Style x:Key="dashedConnector" TargetType="Path">
    <Setter Property="Stroke" Value="Gray"/>
    <Setter Property="StrokeDashArray" Value="5,3"/>
</Style>

<chart:PolarDataLabelSettings ShowConnectorLine="True"
                              ConnectorLineStyle="{StaticResource dashedConnector}"/>
```

## Best Practices

### When to Use Data Labels

**Use data labels when:**
- Dataset is small (< 15 data points)
- Exact values are important
- Chart is for presentation or reports
- Users need to read specific values

**Don't use data labels when:**
- Dataset is large (> 20 data points) - causes clutter
- Trends are more important than exact values
- Interactive tooltips are available
- Space is limited

### Styling Guidelines

1. **Ensure Readability:**
   ```xml
   <!-- Good contrast -->
   <chart:PolarDataLabelSettings Foreground="White"
                                 Background="#2196F3"
                                 FontSize="12"/>
   
   <!-- Poor contrast - avoid -->
   <chart:PolarDataLabelSettings Foreground="LightGray"
                                 Background="White"/>
   ```

2. **Appropriate Font Size:**
   ```xml
   <!-- Too small - hard to read -->
   <chart:PolarDataLabelSettings FontSize="8"/>
   
   <!-- Good size -->
   <chart:PolarDataLabelSettings FontSize="11"/>
   
   <!-- Too large - dominates chart -->
   <chart:PolarDataLabelSettings FontSize="18"/>
   ```

3. **Consistent Styling:**
   - Use the same font across all series
   - Maintain consistent colors within an application
   - Use `UseSeriesPalette` for automatic color coordination

### Formatting Best Practices

1. **Match Data Precision:**
   ```xml
   <!-- Temperature data -->
   <chart:PolarDataLabelSettings Format="0.0°C"/>
   
   <!-- Currency -->
   <chart:PolarDataLabelSettings Format="C0"/>
   
   <!-- Percentages -->
   <chart:PolarDataLabelSettings Format="0%"/>
   ```

2. **Add Units When Appropriate:**
   ```xml
   <chart:PolarDataLabelSettings Format="#,##0' units'"/>
   <chart:PolarDataLabelSettings Format="0.0' kg'"/>
   <chart:PolarDataLabelSettings Format="$#,##0"/>
   ```

3. **Avoid Over-Precision:**
   ```xml
   <!-- Too many decimals -->
   <chart:PolarDataLabelSettings Format="0.0000"/>
   
   <!-- Appropriate -->
   <chart:PolarDataLabelSettings Format="0.0"/>
   ```

### Performance Considerations

1. **Limit label count:**
   - Consider hiding labels for large datasets
   - Use tooltips instead for detailed data

2. **Avoid complex templates:**
   - Simple templates perform better
   - Complex visuals can slow rendering

3. **Use appropriate context:**
   - Choose the most meaningful context
   - Avoid showing redundant information

## Complete Example

Here's a comprehensive example combining multiple features:

```xml
<chart:SfPolarChart Header="Sales Performance Analysis"
                    GridLineType="Polygon">
    
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.SecondaryAxis>
    
    <chart:SfPolarChart.Series>
        <chart:PolarAreaSeries ItemsSource="{Binding SalesData}"
                               XBindingPath="Quarter"
                               YBindingPath="Revenue"
                               Label="Revenue"
                               ShowDataLabels="True">
            <chart:PolarAreaSeries.DataLabelSettings>
                <chart:PolarDataLabelSettings Context="YValue"
                                              Format="C0"
                                              Foreground="White"
                                              Background="#1976D2"
                                              BorderBrush="White"
                                              BorderThickness="2"
                                              FontSize="12"
                                              Margin="4"
                                              Rotation="-15"
                                              ShowConnectorLine="True"
                                              ConnectorHeight="20"/>
            </chart:PolarAreaSeries.DataLabelSettings>
        </chart:PolarAreaSeries>
    </chart:SfPolarChart.Series>
    
</chart:SfPolarChart>
```

## Summary

**Key Points:**
- **Enable:** Set `ShowDataLabels="True"` on series
- **Context:** Choose YValue, XValue, or Percentage
- **Styling:** Customize fonts, colors, borders, margins
- **Templates:** Full control with `ContentTemplate`
- **Format:** Use .NET format strings for numbers/dates
- **Rotation:** Angle labels to avoid overlap
- **UseSeriesPalette:** Match label color to series automatically
- **Connector Lines:** Connect labels to data points visually

Use data labels strategically to enhance chart readability without cluttering the visualization!

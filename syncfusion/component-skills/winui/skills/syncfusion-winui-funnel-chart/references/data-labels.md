# Data Labels

## Table of Contents
- [Overview](#overview)
- [Enabling Data Labels](#enabling-data-labels)
- [Label Context](#label-context)
- [Styling Data Labels](#styling-data-labels)
- [Custom Templates](#custom-templates)
- [Format Strings](#format-strings)
- [Label Rotation](#label-rotation)
- [Best Practices](#best-practices)

## Overview

Data labels display values directly on funnel segments, improving readability and eliminating the need to reference tooltips or legends for specific values.

## Enabling Data Labels

Set the `ShowDataLabels` property to `true`:

### XAML
```xml
<chart:SfFunnelChart x:Name="chart"
                     ShowDataLabels="True"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
</chart:SfFunnelChart>
```

### C#
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.ShowDataLabels = true;
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
this.Content = chart;
```

**Default behavior:** Labels display Y-values on each segment.

## Label Context

The `Context` property controls what data is displayed in labels. It accepts the `LabelContext` values which determine the binding context passed to the data label (and to `ContentTemplate`).

### Available Context Options
- `YValue` (default) - Display the actual numeric data value (Y value)
- `Percentage` - Display the value as a percentage of the total (useful for conversion funnels)
- `XValue` - Display the category name or X value
- `DataLabelItem` - Use the `ChartDataLabel.Item` value (allows arbitrary content supplied via the `ChartDataLabel.Item` property)
- `DateTime` - Display the DateTime value (when the underlying X/Y value is a date/time)

**Notes:**
- The default context is `YValue`.
- `Percentage` typically expects numeric Y-values and may be used with `Format` to control percent formatting.
- `DataLabelItem` is useful when you supply a custom object or pre-formatted text to `ChartDataLabel.Item`.

### Display Y-Values (Default)
```xml
<chart:SfFunnelChart ShowDataLabels="True"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.DataLabelSettings>
        <chart:FunnelDataLabelSettings Context="YValue" />
    </chart:SfFunnelChart.DataLabelSettings>
</chart:SfFunnelChart>
```

### Display Percentages
```xml
<chart:SfFunnelChart ShowDataLabels="True"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.DataLabelSettings>
        <chart:FunnelDataLabelSettings Context="Percentage" />
    </chart:SfFunnelChart.DataLabelSettings>
</chart:SfFunnelChart>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.ShowDataLabels = true;
chart.DataLabelSettings = new FunnelDataLabelSettings()
{
    Context = LabelContext.Percentage
};
this.Content = chart;
```

### Display Category Names
```xml
<chart:FunnelDataLabelSettings Context="XValue" />
```

**Use cases:**
- **YValue** - Show actual counts or amounts
- **Percentage** - Emphasize proportions and conversion rates
- **XValue** - Label segments directly (useful when legend is disabled)

## Styling Data Labels

Customize label appearance using these properties:

### Available Properties
- `Foreground` - Text color
- `Background` - Label background color
- `BorderBrush` - Border color
- `BorderThickness` - Border width
- `FontSize` - Text size
- `FontFamily` - Font typeface
- `FontStyle` - Italic
- `Margin` - Spacing around label

### Complete Styling Example
```xml
<chart:SfFunnelChart ShowDataLabels="True"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.DataLabelSettings>
        <chart:FunnelDataLabelSettings Foreground="White"
                                      FontSize="16"
                                      FontFamily="Calibri"
                                      BorderBrush="White"
                                      BorderThickness="1"
                                      Margin="1"
                                      FontStyle="Italic"
                                      Background="#1E88E5" />
    </chart:SfFunnelChart.DataLabelSettings>
</chart:SfFunnelChart>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.ShowDataLabels = true;
chart.DataLabelSettings = new FunnelDataLabelSettings()
{
    Foreground = new SolidColorBrush(Colors.White),
    BorderBrush = new SolidColorBrush(Colors.White),
    Background = new SolidColorBrush(Color.FromArgb(255, 30, 136, 229)),
    BorderThickness = new Thickness(1),
    Margin = new Thickness(1),
    FontStyle = FontStyle.Italic,
    FontFamily = new FontFamily("Calibri"),
    FontSize = 16
};
this.Content = chart;
```

### Subtle Labels
```xml
<chart:FunnelDataLabelSettings Foreground="#333333"
                              FontSize="14"
                              Background="Transparent"
                              BorderThickness="0"/>
```

### Bold Emphasized Labels
```xml
<chart:FunnelDataLabelSettings Foreground="White"
                              FontSize="18"
                              Background="#FF5722"
                              BorderBrush="#D84315"
                              BorderThickness="2"
                              Margin="2"/>
```

### Minimal Style
```xml
<chart:FunnelDataLabelSettings Foreground="Black"
                              FontSize="12"
                              Background="White"
                              BorderBrush="#E0E0E0"
                              BorderThickness="1"
                              Margin="4"/>
```

## Custom Templates

Create fully custom data label layouts using `ContentTemplate`:

### Basic Custom Template
```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <DataTemplate x:Key="dataLabelTemplate">
            <StackPanel Orientation="Vertical">
                <Path Grid.Row="0"
                      Stretch="Uniform"
                      Fill="LightGreen"
                      Width="15"
                      Height="15"
                      Margin="0,0,0,0"
                      RenderTransformOrigin="0.5,0.5"
                      Data="M11.771002,1.993L5.0080013,14.284 10.752002,14.284 6.6450019,22.804 17.900003,11.921 11.655003,11.921 18.472004,1.993z M10.593002,0L22.256004,0 15.440003,9.9280005 22.827004,9.9280005 0,32 7.5790019,16.277 1.637001,16.277z">
                    <Path.RenderTransform>
                        <TransformGroup>
                            <RotateTransform Angle="0" />
                            <ScaleTransform ScaleX="1" ScaleY="1" />
                        </TransformGroup>
                    </Path.RenderTransform>
                </Path>
                <TextBlock Grid.Row="1"
                           Text="{Binding}"
                           FontSize="12"
                           Foreground="White"/>
            </StackPanel>
        </DataTemplate>
    </Grid.Resources>
    
    <chart:SfFunnelChart x:Name="chart"
                         ShowDataLabels="True"
                         ItemsSource="{Binding Data}"
                         XBindingPath="Category"
                         YBindingPath="Value">
        
        <chart:SfFunnelChart.DataLabelSettings>
            <chart:FunnelDataLabelSettings Context="YValue"
                                          ContentTemplate="{StaticResource dataLabelTemplate}" />
        </chart:SfFunnelChart.DataLabelSettings>
    </chart:SfFunnelChart>
</Grid>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.ShowDataLabels = true;
chart.DataLabelSettings = new FunnelDataLabelSettings()
{
    Context = LabelContext.YValue,
    ContentTemplate = this.grid.Resources["dataLabelTemplate"] as DataTemplate
};
this.Content = chart;
```

### Label with Badge
```xml
<DataTemplate x:Key="badgeTemplate">
    <Border Background="#FF6B6B"
            CornerRadius="12"
            Padding="8,4">
        <TextBlock Text="{Binding}"
                   Foreground="White"
                   FontSize="11"/>
    </Border>
</DataTemplate>
```

### Label with Icon and Value
```xml
<DataTemplate x:Key="iconValueTemplate">
    <StackPanel Orientation="Horizontal" Background="#2C3E50" Padding="6,3">
        <SymbolIcon Symbol="Accept"
                    Foreground="#4CAF50"
                    Margin="0,0,4,0"/>
        <TextBlock Text="{Binding}"
                   Foreground="White"
                   FontSize="13"
                   VerticalAlignment="Center"/>
    </StackPanel>
</DataTemplate>
```

### Multi-Line Label
```xml
<DataTemplate x:Key="multiLineTemplate">
    <StackPanel Background="White" Padding="8,6">
        <TextBlock Text="{Binding}"
                   FontSize="16"
                   Foreground="#333333"
                   HorizontalAlignment="Center"/>
        <TextBlock Text="conversions"
                   FontSize="10"
                   Foreground="#666666"
                   HorizontalAlignment="Center"
                   Margin="0,2,0,0"/>
    </StackPanel>
</DataTemplate>
```

**Important:** The binding context for `ContentTemplate` is the value determined by the `Context` property (for example: `YValue`, `Percentage`, `XValue`, `DataLabelItem`, or `DateTime`).

## Format Strings

Use the `Format` property to control number formatting:

### Decimal Places
```xml
<chart:SfFunnelChart ShowDataLabels="True"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.DataLabelSettings>
        <chart:FunnelDataLabelSettings Format="#.000" Foreground="White" />
    </chart:SfFunnelChart.DataLabelSettings>
</chart:SfFunnelChart>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.ShowDataLabels = true;
chart.DataLabelSettings = new FunnelDataLabelSettings()
{
    Format = "#.000",
    Foreground = new SolidColorBrush(Colors.White)
};
this.Content = chart;
```

### Common Format Patterns

#### No Decimal Places
```xml
<chart:FunnelDataLabelSettings Format="#" />
```
**Example:** 1234 → "1234"

#### Two Decimal Places
```xml
<chart:FunnelDataLabelSettings Format="#.00" />
```
**Example:** 1234.5 → "1234.50"

#### Thousands Separator
```xml
<chart:FunnelDataLabelSettings Format="#,##0" />
```
**Example:** 1234 → "1,234"

#### Currency
```xml
<chart:FunnelDataLabelSettings Format="$#,##0.00" />
```
**Example:** 1234.5 → "$1,234.50"

#### Percentage (when Context="Percentage")
```xml
<chart:FunnelDataLabelSettings Context="Percentage" Format="#.0%" />
```
**Example:** 0.855 → "85.5%"

#### Scientific Notation
```xml
<chart:FunnelDataLabelSettings Format="0.00E+00" />
```
**Example:** 12345 → "1.23E+04"

#### Custom Suffix
```xml
<chart:FunnelDataLabelSettings Format="#,##0' units'" />
```
**Example:** 1234 → "1,234 units"

## Label Rotation

Rotate labels for better positioning using the `Rotation` property:

### 45-Degree Rotation
```xml
<chart:SfFunnelChart ShowDataLabels="True"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.DataLabelSettings>
        <chart:FunnelDataLabelSettings Rotation="45"
                                      BorderBrush="White"
                                      BorderThickness="1"
                                      Background="#1E88E5"/>
    </chart:SfFunnelChart.DataLabelSettings>
</chart:SfFunnelChart>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.ShowDataLabels = true;
chart.DataLabelSettings = new FunnelDataLabelSettings()
{
    Rotation = 45,
    BorderBrush = new SolidColorBrush(Colors.White),
    Background = new SolidColorBrush(Color.FromArgb(255, 30, 136, 229)),
    BorderThickness = new Thickness(1)
};
this.Content = chart;
```

### Common Rotation Angles
```xml
<!-- Vertical text -->
<chart:FunnelDataLabelSettings Rotation="90" />

<!-- Diagonal -->
<chart:FunnelDataLabelSettings Rotation="45" />

<!-- Slight tilt -->
<chart:FunnelDataLabelSettings Rotation="15" />

<!-- Inverted -->
<chart:FunnelDataLabelSettings Rotation="180" />
```

**Use cases:**
- Long values that need more space
- Artistic/stylistic design requirements
- Avoiding overlap in narrow segments

## Best Practices

### 1. Choose Appropriate Context
- **Sales/Revenue data:** Use `YValue` with currency formatting
- **Conversion rates:** Use `Percentage` for clarity
- **Process stages:** Consider `XValue` when legend is not visible

### 2. Readability First
- Ensure sufficient contrast between label and background
- Use readable font sizes (minimum 11-12px)
- Avoid overly decorative fonts for data

### 3. Formatting
- Be consistent across all charts in your application
- Round values appropriately (avoid excessive decimal places)
- Include units when helpful (%, $, units, etc.)

### 4. Performance
- Simple text labels are faster than complex templates
- Avoid heavy graphics in templates for many segments
- Test with maximum expected data volume

### 5. Accessibility
- Maintain high contrast ratios (WCAG AA: 4.5:1 minimum)
- Don't rely solely on color to convey information
- Consider text size for users with visual impairments

## Common Patterns

### Conversion Funnel Labels
```xml
<chart:FunnelDataLabelSettings Context="Percentage"
                              Format="#.0%"
                              Foreground="White"
                              FontSize="14"
                              Background="Transparent"/>
```

### Sales Dashboard Labels
```xml
<chart:FunnelDataLabelSettings Context="YValue"
                              Format="$#,##0"
                              Foreground="#2C3E50"
                              FontSize="15"
                              Background="White"
                              BorderBrush="#3498DB"
                              BorderThickness="2"
                              Margin="4"/>
```

### Minimal Professional Labels
```xml
<chart:FunnelDataLabelSettings Context="YValue"
                              Format="#,##0"
                              Foreground="#555555"
                              FontSize="13"
                              Background="Transparent"
                              BorderThickness="0"/>
```

### Highlighted Key Metrics
```xml
<chart:FunnelDataLabelSettings Context="YValue"
                              Format="#,##0' leads'"
                              Foreground="White"
                              FontSize="16"
                              Background="#E74C3C"
                              BorderBrush="#C0392B"
                              BorderThickness="2"
                              Margin="6"/>
```

## Troubleshooting

### Labels Not Appearing
- Verify `ShowDataLabels="True"` is set on the chart
- Check if label color matches segment color (adjust `Foreground`)
- Ensure data values are not null or zero

### Labels Overlapping
- Reduce `FontSize`
- Use `Rotation` to angle labels
- Consider disabling labels on smaller segments
- Adjust segment spacing with `GapRatio`

### Format Not Applied
- Ensure `Context` is set appropriately for the format
- Check format string syntax
- Verify data type is numeric for number formats

### Custom Template Not Displaying
- Verify template is defined in Resources
- Check binding context matches `Context` property value
- Ensure `ContentTemplate` reference is correct

### Poor Readability
- Increase contrast between label and background
- Add a `Background` color to labels
- Use `BorderBrush` and `BorderThickness` for definition
- Adjust `FontSize` for better visibility

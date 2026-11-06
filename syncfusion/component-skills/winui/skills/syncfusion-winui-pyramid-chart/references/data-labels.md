# Data Labels

## Table of Contents
- [Overview](#overview)
- [Enabling Data Labels](#enabling-data-labels)
- [Label Context](#label-context)
- [Customization Properties](#customization-properties)
- [Custom Templates](#custom-templates)
- [Label Formatting](#label-formatting)
- [Label Rotation](#label-rotation)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

---

## Overview

Data labels display values or information directly on pyramid chart segments, improving data readability and eliminating the need to reference axes or tooltips. They provide immediate visual context for each segment's value.

**When to use data labels:**
- When exact values are important
- For presentations and reports
- When you have a small number of segments (5-10)
- To reduce dependence on tooltips or legends

---

## Enabling Data Labels

Set the `ShowDataLabels` property to `true` to display data labels on segments.

### XAML

```xml
<chart:SfPyramidChart x:Name="chart"
                      ShowDataLabels="True"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
</chart:SfPyramidChart>
```

### C#

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.ShowDataLabels = true;
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";

this.Content = chart;
```

**Default behavior:**
- Labels display the Y-value (numeric value) from `YBindingPath`
- Labels are positioned inside segments
- Default font and color are used

---

## Label Context

The `Context` property determines what information is displayed in the data label.

### Available Context Options

| Value | Display | Example |
|-------|---------|---------|
| **YValue** | Numeric Y value (default) | "402" |
| **Percentage** | Percentage of total | "35.8%" |
| **XValue** | X-axis category label | "Cheese" |
| **DataLabelItem** | Use the `ChartDataLabel.Item` value (custom item content) | custom object/text |
| **DateTime** | Date/time value (when underlying value is a DateTime) | "2025-12-18" |

### Setting Context

**XAML:**
```xml
<chart:SfPyramidChart ShowDataLabels="True"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
    
    <chart:SfPyramidChart.DataLabelSettings>
        <chart:PyramidDataLabelSettings Context="Percentage"/>
    </chart:SfPyramidChart.DataLabelSettings>
    
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.ShowDataLabels = true;

chart.DataLabelSettings = new PyramidDataLabelSettings
{
    Context = LabelContext.Percentage
};

this.Content = chart;
```

### Context Examples

**YValue (Default):**
```xml
<chart:PyramidDataLabelSettings Context="YValue"/>
<!-- Displays: 250, 402, 65, 206, etc. -->
```

**Percentage:**
```xml
<chart:PyramidDataLabelSettings Context="Percentage"/>
<!-- Displays: 22.3%, 35.8%, 5.8%, 18.4%, etc. -->
```

**XValue:**
```xml
<chart:PyramidDataLabelSettings Context="XValue"/>
<!-- Displays: Sweet treats, Cheese, Vegetables, etc. -->
```

**DataLabelItem:**
```xml
<chart:PyramidDataLabelSettings Context="DataLabelItem"/>
<!-- Displays value from ChartDataLabel.Item -->
```

**DateTime:**
```xml
<chart:PyramidDataLabelSettings Context="DateTime"/>
<!-- Displays: 2025-12-18, 2026-03-01, etc. -->
```

---

## Customization Properties

Customize the appearance of data labels using various properties of `PyramidDataLabelSettings`.

### Visual Properties

| Property | Type | Description |
|----------|------|-------------|
| **Foreground** | Brush | Text color |
| **Background** | Brush | Label background color |
| **BorderBrush** | Brush | Border color |
| **BorderThickness** | Thickness | Border width |
| **FontSize** | double | Text size |
| **FontFamily** | FontFamily | Font type |
| **FontStyle** | FontStyle | Italic |
| **Margin** | Thickness | Spacing around label |

### Example: Styled Data Labels

**XAML:**
```xml
<chart:SfPyramidChart ShowDataLabels="True"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
    
    <chart:SfPyramidChart.DataLabelSettings>
        <chart:PyramidDataLabelSettings Foreground="White"
                                        FontSize="16"
                                        FontFamily="Calibri"
                                        BorderBrush="White"
                                        BorderThickness="1"
                                        Margin="1"
                                        FontStyle="Italic"
                                        Background="#1E88E5"/>
    </chart:SfPyramidChart.DataLabelSettings>
    
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.ShowDataLabels = true;

chart.DataLabelSettings = new PyramidDataLabelSettings
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

### Common Styling Patterns

**High Contrast Labels:**
```xml
<chart:PyramidDataLabelSettings Foreground="Black"
                                Background="White"
                                BorderBrush="Black"
                                BorderThickness="2"
                                FontSize="14"/>
```

**Transparent Background:**
```xml
<chart:PyramidDataLabelSettings Foreground="White"
                                Background="Transparent"
                                FontSize="18"/>
```

**Subtle Labels:**
```xml
<chart:PyramidDataLabelSettings Foreground="#666666"
                                Background="Transparent"
                                FontSize="12"/>
```

---

## Custom Templates

Create fully customized data label layouts using the `ContentTemplate` property.

### Basic Custom Template

**XAML:**
```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <DataTemplate x:Key="dataLabelTemplate">
            <StackPanel Orientation="Vertical">
                <!-- Icon -->
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
                            <TransformGroup.Children>
                                <RotateTransform Angle="0"/>
                                <ScaleTransform ScaleX="1" ScaleY="1"/>
                            </TransformGroup.Children>
                        </TransformGroup>
                    </Path.RenderTransform>
                </Path>
                
                <!-- Value Text -->
                <TextBlock Grid.Row="1"
                           Text="{Binding}"
                           FontSize="12"
                           Foreground="White"/>
            </StackPanel>
        </DataTemplate>
    </Grid.Resources>
    
    <chart:SfPyramidChart ShowDataLabels="True"
                          ItemsSource="{Binding Data}"
                          XBindingPath="Category"
                          YBindingPath="Value">
        
        <chart:SfPyramidChart.DataLabelSettings>
            <chart:PyramidDataLabelSettings Context="YValue"
                                            ContentTemplate="{StaticResource dataLabelTemplate}"/>
        </chart:SfPyramidChart.DataLabelSettings>
        
    </chart:SfPyramidChart>
</Grid>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.ShowDataLabels = true;

chart.DataLabelSettings = new PyramidDataLabelSettings
{
    Context = LabelContext.YValue,
    ContentTemplate = this.grid.Resources["dataLabelTemplate"] as DataTemplate
};

this.Content = chart;
```

### Advanced Template with Multiple Elements

```xml
<DataTemplate x:Key="advancedTemplate">
    <Border Background="#CC000000"
            CornerRadius="4"
            Padding="8,4">
        <StackPanel Orientation="Vertical">
            <!-- Value with currency symbol -->
            <TextBlock FontSize="16"
                       Foreground="White"
                       HorizontalAlignment="Center">
                <Run Text="$"/>
                <Run Text="{Binding}"/>
            </TextBlock>
            
            <!-- Separator -->
            <Rectangle Height="1"
                       Fill="White"
                       Margin="0,2"/>
            
            <!-- Secondary info -->
            <TextBlock Text="Revenue"
                       FontSize="10"
                       Foreground="LightGray"
                       HorizontalAlignment="Center"/>
        </StackPanel>
    </Border>
</DataTemplate>
```

### Template Binding Context

The binding context for `ContentTemplate` is determined by the `Context` property:

| Context | Binding Value |
|---------|---------------|
| **YValue** | Numeric Y value |
| **Percentage** | Percentage string (e.g., "35.8%") |
| **XValue** | X-axis label string |
| **DataLabelItem** | The value set on `ChartDataLabel.Item` (object or string) |
| **DateTime** | DateTime value |

**Example binding:**
```xml
<!-- When Context="YValue" -->
<TextBlock Text="{Binding}"/>  <!-- Displays: 402 -->

<!-- Format in template -->
<TextBlock>
    <Run Text="Value: "/>
    <Run Text="{Binding}"/>
</TextBlock>
```

---

## Label Formatting

Use the `Format` property to apply custom formatting to numeric labels.

### Numeric Formatting

**XAML:**
```xml
<chart:SfPyramidChart ShowDataLabels="True">
    <chart:SfPyramidChart.DataLabelSettings>
        <chart:PyramidDataLabelSettings Format="#.000"
                                        Foreground="White"/>
    </chart:SfPyramidChart.DataLabelSettings>
</chart:SfPyramidChart>
```

**C#:**
```csharp
chart.DataLabelSettings = new PyramidDataLabelSettings
{
    Format = "#.000",
    Foreground = new SolidColorBrush(Colors.White)
};
```

### Format String Examples

| Format | Input | Output |
|--------|-------|--------|
| `"#.00"` | 402 | "402.00" |
| `"#.000"` | 250 | "250.000" |
| `"#,##0"` | 1500 | "1,500" |
| `"0.##"` | 65.5 | "65.5" |
| `"C"` | 402 | "$402.00" (currency) |
| `"N2"` | 402 | "402.00" (number) |
| `"P"` | 0.25 | "25%" (percent) |

### Currency Formatting

```xml
<chart:PyramidDataLabelSettings Format="C"
                                Foreground="Green"/>
<!-- Displays: $250.00, $402.00, $65.00 -->
```

### Percentage Formatting (Custom)

```xml
<chart:PyramidDataLabelSettings Context="Percentage"
                                Format="0.0"
                                Foreground="White"/>
<!-- Displays: 22.3%, 35.8%, 5.8% -->
```

### Scientific Notation

```xml
<chart:PyramidDataLabelSettings Format="E2"/>
<!-- Displays: 2.50E+02, 4.02E+02, etc. -->
```

---

## Label Rotation

Rotate data labels using the `Rotation` property to improve readability in tight spaces.

### XAML

```xml
<chart:SfPyramidChart ShowDataLabels="True">
    <chart:SfPyramidChart.DataLabelSettings>
        <chart:PyramidDataLabelSettings Rotation="45"
                                        BorderBrush="White"
                                        BorderThickness="1"
                                        Background="#1E88E5"/>
    </chart:SfPyramidChart.DataLabelSettings>
</chart:SfPyramidChart>
```

### C#

```csharp
chart.DataLabelSettings = new PyramidDataLabelSettings
{
    Rotation = 45,
    BorderBrush = new SolidColorBrush(Colors.White),
    Background = new SolidColorBrush(Color.FromArgb(255, 30, 136, 229)),
    BorderThickness = new Thickness(1)
};
```

### Rotation Angles

| Angle | Effect |
|-------|--------|
| **0** | Horizontal (default) |
| **45** | Diagonal lean |
| **90** | Vertical |
| **-45** | Opposite diagonal |
| **180** | Upside down |

**Best Practices:**
- Use 45° or -45° for diagonal text when space is limited
- Use 90° for vertical labels on small segments
- Keep rotation consistent across all labels
- Test readability with different angles

---

## Complete Examples

### Example 1: Percentage Labels with Styling

```xml
<chart:SfPyramidChart Header="Market Share Distribution"
                      ShowDataLabels="True"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Company"
                      YBindingPath="Share">
    
    <chart:SfPyramidChart.DataLabelSettings>
        <chart:PyramidDataLabelSettings Context="Percentage"
                                        Foreground="White"
                                        FontSize="18"
                                        Background="Transparent"/>
    </chart:SfPyramidChart.DataLabelSettings>
    
</chart:SfPyramidChart>
```

### Example 2: Currency-Formatted Labels

```xml
<chart:SfPyramidChart ShowDataLabels="True"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Product"
                      YBindingPath="Revenue">
    
    <chart:SfPyramidChart.DataLabelSettings>
        <chart:PyramidDataLabelSettings Context="YValue"
                                        Format="C0"
                                        Foreground="DarkGreen"
                                        Background="LightGreen"
                                        BorderBrush="Green"
                                        BorderThickness="2"
                                        FontSize="14"
                                        Margin="5"/>
    </chart:SfPyramidChart.DataLabelSettings>
    
</chart:SfPyramidChart>
```

### Example 3: Custom Template with Icons

```xml
<chart:SfPyramidChart x:Name="chart">
    <chart:SfPyramidChart.Resources>
        <DataTemplate x:Key="iconTemplate">
            <Border Background="#99000000"
                    CornerRadius="6"
                    Padding="10,5">
                <StackPanel Orientation="Horizontal" Spacing="5">
                    <!-- Star icon -->
                    <Viewbox Width="16" Height="16">
                        <Path Fill="Gold"
                              Data="M 0,4 L 2,8 L 7,8 L 3,11 L 4,16 L 0,12 L -4,16 L -3,11 L -7,8 L -2,8 Z"/>
                    </Viewbox>
                    
                    <!-- Value -->
                    <TextBlock Text="{Binding}"
                               Foreground="White"
                               FontSize="14"
                               VerticalAlignment="Center"/>
                </StackPanel>
            </Border>
        </DataTemplate>
    </chart:SfPyramidChart.Resources>
    
    <chart:SfPyramidChart.DataLabelSettings>
        <chart:PyramidDataLabelSettings ContentTemplate="{StaticResource iconTemplate}"/>
    </chart:SfPyramidChart.DataLabelSettings>
</chart:SfPyramidChart>
```

### Example 4: C# Complete Configuration

```csharp
SfPyramidChart chart = new SfPyramidChart
{
    Header = "Quarterly Revenue",
    ShowDataLabels = true
};

// Configure data labels
chart.DataLabelSettings = new PyramidDataLabelSettings
{
    Context = LabelContext.YValue,
    Format = "C0",  // Currency without decimals
    Foreground = new SolidColorBrush(Colors.White),
    Background = new SolidColorBrush(Color.FromArgb(200, 0, 0, 0)),
    BorderBrush = new SolidColorBrush(Colors.White),
    BorderThickness = new Thickness(1),
    FontSize = 16,
    FontFamily = new FontFamily("Segoe UI"),
    Margin = new Thickness(5),
    Rotation = 0
};

// Data binding
chart.SetBinding(SfPyramidChart.ItemsSourceProperty,
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Quarter";
chart.YBindingPath = "Revenue";

this.Content = chart;
```

---

## Best Practices

### When to Use Data Labels

**✓ Use data labels when:**
- Exact values are critical
- You have 3-10 segments
- Creating static reports or presentations
- Screen space allows clear label display

**✗ Avoid data labels when:**
- You have many segments (>10)
- Labels would overlap or clutter
- Approximate values are sufficient
- Tooltips provide adequate information

### Readability Tips

1. **Font Size:** Use 12-18px for optimal readability
2. **Contrast:** Ensure high contrast between label and background
3. **Background:** Use semi-transparent backgrounds for labels on gradient segments
4. **Spacing:** Add margin to prevent labels touching segment edges
5. **Rotation:** Only rotate when necessary; horizontal text is easiest to read

### Performance Considerations

- Custom templates are slightly slower than default labels
- Simple templates perform better than complex ones
- Minimize binding complexity in templates
- For many segments, consider showing labels on hover instead

### Common Patterns

**Minimal Style (Clean):**
```xml
<chart:PyramidDataLabelSettings Foreground="White"
                                Background="Transparent"
                                FontSize="14"/>
```

**High Visibility:**
```xml
<chart:PyramidDataLabelSettings Foreground="Black"
                                Background="White"
                                BorderBrush="Black"
                                BorderThickness="2"/>
```

**Modern Subtle:**
```xml
<chart:PyramidDataLabelSettings Foreground="#EEEEEE"
                                Background="#33000000"
                                FontSize="13"                                
                                Margin="3"/>
```

---

## Troubleshooting

**Labels not showing:**
- Verify `ShowDataLabels="True"` is set
- Check that YBindingPath data is not null
- Ensure font color contrasts with segment colors

**Labels overlap or cut off:**
- Reduce font size
- Use rotation to angle labels
- Consider showing fewer labels
- Increase chart size

**Format not applying:**
- Format only works with numeric contexts (YValue, Percentage)
- Verify format string syntax
- Check that data type is numeric

**Custom template not working:**
- Ensure DataTemplate has x:Key
- Verify ContentTemplate reference matches resource key
- Check binding context in template

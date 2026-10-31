# Legend

Legend displays a list of series data points in the chart, helping users identify which series corresponds to which visual element.

## Basic Usage

Enable legend by adding a ChartLegend instance:

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCartesianChart.Legend>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries Label="Q1 Sales"
                       ItemsSource="{Binding Q1Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
    
    <chart:ColumnSeries Label="Q2 Sales"
                       ItemsSource="{Binding Q2Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
ChartLegend legend = new ChartLegend();
chart.Legend = legend;

ColumnSeries series1 = new ColumnSeries();
series1.Label = "Q1 Sales";
series1.ItemsSource = viewModel.Q1Data;
series1.XBindingPath = "Product";
series1.YBindingPath = "Sales";
chart.Series.Add(series1);
```

## Series Labels

Each series needs a **Label** property to appear in the legend:

```xaml
<chart:LineSeries Label="Temperature"
                 ItemsSource="{Binding Data}"
                 XBindingPath="Time"
                 YBindingPath="Temp"/>
```

Without Label, the series legend label won't appear in the legend.

## Legend Title

Add a header to the legend:

**XAML:**
```xaml
<chart:SfCartesianChart.Legend>
    <chart:ChartLegend>
        <chart:ChartLegend.Header>
            <TextBlock Text="Product Lines" 
                      FontWeight="Bold"
                      FontSize="14"
                      Margin="0,0,0,10"/>
        </chart:ChartLegend.Header>
    </chart:ChartLegend>
</chart:SfCartesianChart.Legend>
```

**C#:**
```csharp
ChartLegend legend = new ChartLegend();
TextBlock header = new TextBlock
{
    Text = "Product Lines",
    FontWeight = FontWeights.Bold,
    FontSize = 14,
    Margin = new Thickness(0, 0, 0, 10)
};
legend.Header = header;
chart.Legend = legend;
```

## Legend Placement

Control where the legend appears:

```xaml
<chart:ChartLegend Placement="Top"/>
```

**Placement Options:**
- `Left` - Left side of chart
- `Top` - Above chart
- `Right` - Right side of chart (default)
- `Bottom` - Below chart

**Example:**
```xaml
<chart:SfCartesianChart.Legend>
    <chart:ChartLegend Placement="Bottom"/>
</chart:SfCartesianChart.Legend>
```

## Legend Icon

Customize the icon shape using the `LegendIcon` property on each series:

```xaml
<chart:ColumnSeries Label="Sales"
                   LegendIcon="Circle"
                   ItemsSource="{Binding Data}"
                   XBindingPath="Month"
                   YBindingPath="Value"/>
```

**LegendIcon Options:**
- `SeriesType` - Matches series type (default)
- `Circle`
- `Rectangle`
- `Diamond`
- `Triangle`
- `Pentagon`
- `Hexagon`

**Icon Size:**
Control icon dimensions on the ChartLegend:

```xaml
<chart:ChartLegend IconWidth="20" IconHeight="20"/>
```

### Custom Legend Icon

Create fully custom icons using the `LegendIconTemplate` property on each series:

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Resources>
        <DataTemplate x:Key="iconTemplate">
            <Ellipse Height="15" 
                     Width="15" 
                     Fill="White" 
                     Stroke="#4a4a4a" 
                     StrokeThickness="2"/>
        </DataTemplate>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCartesianChart.Legend>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries Label="Gold" 
                       ItemsSource="{Binding Data}"
                       LegendIconTemplate="{StaticResource iconTemplate}"
                       XBindingPath="Year"
                       YBindingPath="Value"/>
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();
chart.Legend = new ChartLegend();

ColumnSeries series = new ColumnSeries()
{
    ItemsSource = viewModel.Data,
    XBindingPath = "Year",
    YBindingPath = "Value",
    LegendIconTemplate = chart.Resources["iconTemplate"] as DataTemplate,
    Label = "Gold"
};

chart.Series.Add(series);
```

**Custom Icon Examples:**

Rectangle icon:
```xaml
<DataTemplate x:Key="rectangleIcon">
    <Rectangle Height="12" Width="12" Fill="Blue"/>
</DataTemplate>
```

Star icon using Path:
```xaml
<DataTemplate x:Key="starIcon">
    <Path Data="M 10,0 L 12,8 L 20,8 L 14,12 L 16,20 L 10,15 L 4,20 L 6,12 L 0,8 L 8,8 Z"
          Fill="Gold" 
          Stretch="Uniform"
          Height="15" 
          Width="15"/>
</DataTemplate>
```

## Legend Visibility

Toggle legend visibility:

```xaml
<chart:ChartLegend IsVisible="{Binding ShowLegend}"/>
```

**C#:**
```csharp
legend.IsVisible = true; // or false
```

## Toggle Series Visibility

Enable automatic series visibility toggling when clicking legend items using the `ToggleSeriesVisibility` property. By default, this property is `False`.

**XAML:**
```xaml
<chart:SfCartesianChart.Legend>
    <chart:ChartLegend ToggleSeriesVisibility="True"/>
</chart:SfCartesianChart.Legend>
```

**C#:**
```csharp
ChartLegend legend = new ChartLegend();
legend.ToggleSeriesVisibility = true;
chart.Legend = legend;
```

When enabled, clicking a legend item will automatically show/hide the corresponding series without requiring manual event handling.

## Legend Item Template

Customize the entire appearance of each legend item using the `ItemTemplate` property. This allows complete control over how legend items are displayed, including layout, styling, and content.

### Basic ItemTemplate

The binding context for `ItemTemplate` is `LegendItem`, which provides access to series information.

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Resources>
        <DataTemplate x:Key="legendTemplate" x:DataType="chart:LegendItem">
            <StackPanel Orientation="Horizontal" Margin="5">
                <Ellipse Width="15" Height="15" 
                        Fill="{Binding IconBrush}"
                        Margin="0,0,5,0"/>
                <TextBlock Text="{Binding Label}" 
                          VerticalAlignment="Center"
                          FontSize="12"/>
            </StackPanel>
        </DataTemplate>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.Legend>
        <chart:ChartLegend ItemTemplate="{StaticResource legendTemplate}"/>
    </chart:SfCartesianChart.Legend>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries Label="Sales" 
                       ItemsSource="{Binding Data}"
                       XBindingPath="Month"
                       YBindingPath="Value"/>
</chart:SfCartesianChart>
```

**C#:**
```csharp
ChartLegend legend = new ChartLegend();
legend.ItemTemplate = chart.Resources["legendTemplate"] as DataTemplate;
chart.Legend = legend;
```

### Available Binding Properties

The `LegendItem` class provides the following properties for data binding:

| Property | Type | Description |
|----------|------|-------------|
| `Label` | string | The series label text |
| `IconBrush` | Brush | The color brush for the legend icon |
| `Item` | object | Reference to the underlying data model |

**Note:** The `Item` property provides access to the actual data point, allowing you to bind to custom properties in your data model.

### Vertical Layout Template

Stack icon and label vertically:

```xaml
<DataTemplate x:Key="verticalTemplate" x:DataType="chart:LegendItem">
    <StackPanel Orientation="Vertical" 
                Margin="10" 
                HorizontalAlignment="Center">
        <Ellipse Height="15" 
                 Width="15" 
                 Fill="{Binding IconBrush}" 
                 Stroke="#4a4a4a" 
                 StrokeThickness="2"
                 Margin="0,0,0,5"/>
        <TextBlock HorizontalAlignment="Center" 
                   FontSize="12"
                   Foreground="Black" 
                   FontWeight="SemiBold" 
                   Text="{Binding Label}"/>
    </StackPanel>
</DataTemplate>
```

### Card-Style Template

Create card-style legend items with background:

```xaml
<DataTemplate x:Key="cardTemplate" x:DataType="chart:LegendItem">
    <Border Background="White" 
            BorderBrush="#E0E0E0" 
            BorderThickness="1"
            CornerRadius="4"
            Padding="10,5"
            Margin="5">
        <StackPanel Orientation="Horizontal">
            <Rectangle Width="20" 
                      Height="20" 
                      Fill="{Binding IconBrush}"
                      RadiusX="2"
                      RadiusY="2"
                      Margin="0,0,8,0"/>
            <TextBlock Text="{Binding Label}" 
                      VerticalAlignment="Center"
                      FontSize="13"
                      FontWeight="Medium"/>
        </StackPanel>
    </Border>
</DataTemplate>
```

### Template with Data Binding

Access underlying data model properties using the `Item` property:

```xaml
<DataTemplate x:Key="dataTemplate" x:DataType="chart:LegendItem">
    <StackPanel Orientation="Horizontal" Margin="8">
        <Ellipse Width="12" 
                Height="12" 
                Fill="{Binding IconBrush}"
                Margin="0,0,8,0"/>
        <StackPanel>
            <TextBlock Text="{Binding Label}" 
                      FontWeight="Bold"
                      FontSize="12"/>
            <TextBlock Text="{Binding Item.Category}" 
                      FontSize="10"
                      Foreground="Gray"
                      Margin="0,2,0,0"/>
        </StackPanel>
    </StackPanel>
</DataTemplate>
```

**Note:** Replace `Item.Category` with actual properties from your data model.

### Rich Template with Icons

Include custom icons and styling:

```xaml
<DataTemplate x:Key="richTemplate" x:DataType="chart:LegendItem">
    <Grid Margin="10,5">
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="Auto"/>
            <ColumnDefinition Width="*"/>
        </Grid.ColumnDefinitions>
        
        <Border Grid.Column="0" 
                Background="{Binding IconBrush}"
                Width="24"
                Height="24"
                CornerRadius="12"
                Margin="0,0,10,0">
            <TextBlock Text="●" 
                      FontSize="16"
                      Foreground="White"
                      HorizontalAlignment="Center"
                      VerticalAlignment="Center"/>
        </Border>
        
        <StackPanel Grid.Column="1" VerticalAlignment="Center">
            <TextBlock Text="{Binding Label}" 
                      FontSize="14"
                      FontWeight="SemiBold"/>
            <TextBlock Text="Series Data" 
                      FontSize="10"
                      Foreground="#666666"
                      Margin="0,2,0,0"/>
        </StackPanel>
    </Grid>
</DataTemplate>
```

### Complete Example with ItemTemplate

```xaml
<chart:SfCartesianChart Header="Sales Report">
    <chart:SfCartesianChart.Resources>
        <DataTemplate x:Key="customLegend" x:DataType="chart:LegendItem">
            <Border Background="#F5F5F5" 
                    BorderBrush="{Binding IconBrush}" 
                    BorderThickness="0,0,0,3"
                    Padding="12,8"
                    Margin="5">
                <StackPanel Orientation="Horizontal">
                    <Rectangle Width="16" 
                              Height="16" 
                              Fill="{Binding IconBrush}"
                              Margin="0,0,10,0"/>
                    <TextBlock Text="{Binding Label}" 
                              VerticalAlignment="Center"
                              FontSize="13"
                              FontWeight="SemiBold"
                              Foreground="#333333"/>
                </StackPanel>
            </Border>
        </DataTemplate>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.Legend>
        <chart:ChartLegend ItemTemplate="{StaticResource customLegend}"
                          Placement="Bottom"/>
    </chart:SfCartesianChart.Legend>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries Label="Q1 Sales" 
                       ItemsSource="{Binding Q1Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
    
    <chart:ColumnSeries Label="Q2 Sales" 
                       ItemsSource="{Binding Q2Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();
chart.Header = "Sales Report";

ChartLegend legend = new ChartLegend();
legend.ItemTemplate = chart.Resources["customLegend"] as DataTemplate;
legend.Placement = LegendPlacement.Bottom;
chart.Legend = legend;

// Add axes
chart.XAxes.Add(new CategoryAxis());
chart.YAxes.Add(new NumericalAxis());

// Add series
ColumnSeries series1 = new ColumnSeries()
{
    Label = "Q1 Sales",
    ItemsSource = viewModel.Q1Data,
    XBindingPath = "Product",
    YBindingPath = "Sales"
};
chart.Series.Add(series1);

this.Content = chart;
```

### Best Practices for ItemTemplate

1. **Always specify x:DataType** - Use `x:DataType="chart:LegendItem"` for compiled bindings
2. **Keep it simple** - Overly complex templates can impact performance
3. **Use appropriate sizing** - Ensure template fits within legend area
4. **Consider Placement** - Horizontal templates work better with Bottom/Top placement
5. **Test with multiple series** - Ensure template looks good with varying label lengths
6. **Use IconBrush** - Bind to `IconBrush` to maintain series color consistency

## Background Customization

Customize the legend's background appearance using styling properties:

**XAML:**
```xaml
<chart:SfCartesianChart.Legend>
    <chart:ChartLegend Background="LightGray" 
                       BorderBrush="Black" 
                       BorderThickness="2" 
                       CornerRadius="8">
    </chart:ChartLegend>
</chart:SfCartesianChart.Legend>
```

**C#:**
```csharp
ChartLegend legend = new ChartLegend()
{
    Background = new SolidColorBrush(Colors.LightGray),
    BorderBrush = new SolidColorBrush(Colors.Black),
    BorderThickness = new Thickness(2),
    CornerRadius = new CornerRadius(8)
};
chart.Legend = legend;
```

**Available Properties:**
- `Background` - Background color of the legend
- `BorderBrush` - Border color of the legend
- `BorderThickness` - Border width of the legend
- `CornerRadius` - Corner radius for rounded edges

**Styling Examples:**

Rounded legend with shadow effect:
```xaml
<chart:ChartLegend Background="White" 
                   BorderBrush="#E0E0E0" 
                   BorderThickness="1" 
                   CornerRadius="12"
                   Padding="15">
</chart:ChartLegend>
```

Dark themed legend:
```xaml
<chart:ChartLegend Background="#2D2D2D" 
                   BorderBrush="#404040" 
                   BorderThickness="1" 
                   CornerRadius="4"
                   Foreground="White">
</chart:ChartLegend>
```

## Spacing and Margins
Checkbox for Legend

Enable checkboxes for each legend item to control series visibility:

**XAML:**
```xaml
<chart:SfCartesianChart.Legend>
    <chart:ChartLegend CheckBoxVisibility="Visible"/>
</chart:SfCartesianChart.Legend>
```

**C#:**
```csharp
ChartLegend legend = new ChartLegend()
{
    CheckBoxVisibility = Visibility.Visible
};
chart.Legend = legend;
```

Checkboxes provide a visual indicator of series visibility state and allow users to toggle series on/off.

## Best Practices

- Always set **Label** property on series for legend entries
- Use **Placement="Bottom"** for charts with many series
- Keep legend labels concise (10-15 characters max)
- Use **LegendIcon** property on series to differentiate visually
- Enable **ToggleSeriesVisibility** for interactive series toggling
- Use **CheckBoxVisibility** when explicit visual indicators are needed
- Customize background for better contrast with chart area
- Use **LegendIconTemplate** for brand-specific or complex icons
```xaml
<chart:ChartLegend IconVisibility="Visible" IconWidth="30" IconHeight="30"/>
```

## Complete Example

```xaml
<chart:SfCartesianChart Header="Sales Dashboard">
    
    <chart:SfCartesianChart.Legend>
        <chart:ChartLegend Placement="Bottom"
                          IconType="Circle"
                          IconWidth="20"
                          IconHeight="20"
                          ItemMargin="15,5"
                          ToggleSeriesVisibility="True">
            <chart:ChartLegend.Header>
                <TextBlock Text="Quarters" 
                          FontWeight="Bold"
                          Margin="0,0,0,10"/>
            </chart:ChartLegend.Header>
        </chart:ChartLegend>
    </chart:SfCartesianChart.Legend>

    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries Label="Q1" 
                       ItemsSource="{Binding Q1Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
    
    <chart:ColumnSeries Label="Q2" 
                       ItemsSource="{Binding Q2Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
    
    <chart:ColumnSeries Label="Q3" 
                       ItemsSource="{Binding Q3Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
    
</chart:SfCartesianChart>
```

## Best Practices

- Always set **Label** property on series for legend entries
- Use **Placement="Bottom"** for horizontal charts with many series
- Keep legend labels concise (10-15 characters max)
- Use **IconType** to differentiate series visually
- Enable **ToggleSeriesVisibility** for interactive series toggling

## Common Use Cases

**Toggle Series Visibility:**
``Enable Interactive Legend:**
```xaml
<chart:SfCartesianChart.Legend>
    <chart:ChartLegend ToggleSeriesVisibility="True"/>
</chart:SfCartesianChart.Legend>
```

**Legend with Checkboxes:**
```xaml
<chart:SfCartesianChart.Legend>
    <chart:ChartLegend CheckBoxVisibility="Visible"/>
</chart:SfCartesianChart.Legend>
```

**Custom Icon for Series:**
```xaml
<chart:ColumnSeries Label="Sales"
                   LegendIcon="Circle"
                   ItemsSource="{Binding Data}"
                   XBindingPath="Month"
                   YBindingPath="Value"/>
```

## Troubleshooting

**Legend not showing:**
- Ensure Legend property is set on chart
- Verify each series has a Label property

**Legend items missing:**
- Check that series Label is not empty
- Confirm series is added to Series collection

**Legend overlapping chart:**
- Adjust Placement property
- Use appropriate Margin on legend

**Icons not matching series:**
- Set LegendIcon="SeriesType" on each series for automatic matching
- Use LegendIconTemplate property on series for custom icons

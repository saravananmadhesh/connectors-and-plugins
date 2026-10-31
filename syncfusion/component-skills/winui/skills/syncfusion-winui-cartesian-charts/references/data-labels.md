# Data Labels in WinUI Cartesian Charts

Data labels are used to display values related to a chart segment. Values from data point(x, y) or other custom properties from a data source can be displayed.

**Official Documentation:** [Syncfusion WinUI Cartesian Charts - Data Labels](https://help.syncfusion.com/winui/cartesian-charts/datalabels)

---

## Table of Contents
- [Overview](#overview)
- [Enable Data Label](#enable-data-label)
- [Context](#context)
  - [Available Context Types](#available-context-types)
  - [YValue (Default)](#1-yvalue-default)
  - [XValue](#2-xvalue)
  - [Percentage](#3-percentage)
  - [DataLabelItem](#4-datalabelitem)
  - [DateTime](#5-datetime)
  - [Context Comparison Table](#context-comparison-table)
- [Positioning](#positioning)
- [Customization](#customization)
- [Template](#template)
- [Formatting](#formatting)
- [Rotation](#rotation)
- [Alignment](#alignment)
- [Connector Lines](#connector-lines)
- [Series Palette](#series-palette)
- [Troubleshooting Tips](#troubleshooting-tips)

## Overview

Each data label can be represented by the following:

- **Label** - displays the segment label content at the (X, Y) point
- **Connector line** - used to connect the (X, Y) point and the label element

**Key Features:**
- Display X, Y, or custom values via Context property
- Multiple positioning options (Inner, Outer, Center)
- Customizable appearance (fonts, colors, backgrounds)
- Template support for complex layouts
- Connector lines for outer labels
- Rotation and alignment options
- Format strings for number and date formatting

---

## Enable Data Label

The `ShowDataLabels` property of series is used to enable the data labels.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>

    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>

    <chart:SfCartesianChart.Series>
        <chart:ColumnSeries ItemsSource="{Binding Data}" 
                           XBindingPath="Category"
                           YBindingPath="Value" 
                           ShowDataLabels="True"/>
    </chart:SfCartesianChart.Series>

</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

ColumnSeries series = new ColumnSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Category",
    YBindingPath = "Value",
    ShowDataLabels = true
};

chart.Series.Add(series);
this.Content = chart;
```

---

## Context

To customize the content of data labels, you need to define the `DataLabelSettings` of the series and set the `Context` property of `CartesianDataLabelSettings` to define the value to be displayed as label content.

> **Important Note:** The binding context for the `ContentTemplate` property of `DataLabelSettings` is the `Context` value. This defines what value is displayed in the data label, such as the X value or any other value from the underlying model object. By default, the value of `Context` is `YValue`.

### Available Context Types

The `Context` property uses the `LabelContext` enumeration to determine what value is displayed in the label. The following options are available:

#### 1. YValue (Default)

Displays the **Y-axis value** of the data point. This is the most commonly used context for displaying numerical values.

**XAML:**
```xml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Category"
                   YBindingPath="Value"
                   ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Context="YValue" 
                                          Position="Outer"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Context = LabelContext.YValue,
    Position = DataLabelPosition.Outer
};
```

**Use Case:** When you want to display the actual data values (e.g., sales figures, quantities, measurements).

---

#### 2. XValue

Displays the **X-axis value** of the data point. Useful when you want to show category names or X-coordinate values on the labels.

**XAML:**
```xml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Category"
                   YBindingPath="Value"
                   ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Context="XValue" 
                                          Position="Outer"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Context = LabelContext.XValue,
    Position = DataLabelPosition.Outer
};
```

**Use Case:** When you want to display category names, dates, or X-axis values on data labels instead of Y values.

---

#### 3. Percentage

Displays the **percentage contribution** of each data point relative to the total sum of all points in the series. This is particularly useful for accumulation series or when showing relative proportions.

**XAML:**
```xml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Category"
                   YBindingPath="Value"
                   ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Context="Percentage" 
                                          Position="Outer"
                                          Format="P0"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Context = LabelContext.Percentage,
    Position = DataLabelPosition.Outer,
    Format = "P0" // Formats as percentage
};
```

**Use Case:** When displaying market share, distribution percentages, or relative proportions of data points.

---

#### 4. DataLabelItem

Provides access to the **full data item** (`ChartDataLabel.Item` property), allowing you to display any property from the underlying data object. This is the most flexible option for custom data label content.

**XAML:**
```xml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Resources>
        <DataTemplate x:Key="customLabelTemplate">
            <StackPanel Orientation="Vertical" Background="LightBlue" Padding="5">
                <TextBlock Text="{Binding Item.Category}" 
                          FontWeight="Bold"
                          Foreground="Black"/>
                <TextBlock Text="{Binding Item.Value}" 
                          Foreground="DarkBlue"/>
            </StackPanel>
        </DataTemplate>
    </chart:SfCartesianChart.Resources>
    
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Value"
                       ShowDataLabels="True">
        <chart:ColumnSeries.DataLabelSettings>
            <chart:CartesianDataLabelSettings Context="DataLabelItem"
                                              ContentTemplate="{StaticResource customLabelTemplate}"/>
        </chart:ColumnSeries.DataLabelSettings>
    </chart:ColumnSeries>
</chart:SfCartesianChart>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Context = LabelContext.DataLabelItem,
    ContentTemplate = this.Resources["customLabelTemplate"] as DataTemplate
};
```

**Use Case:** When you need to display multiple properties from your data model, such as showing both category and value, or accessing custom properties not bound to X or Y axes.

---

#### 5. DateTime

Displays **DateTime values** from the data point. This is specifically used when working with DateTime-based data on the X-axis.

**XAML:**
```xml
<chart:LineSeries ItemsSource="{Binding Data}"
                 XBindingPath="Date"
                 YBindingPath="Value"
                 ShowDataLabels="True">
    <chart:LineSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Context="DateTime" 
                                          Format="MMM dd, yyyy"
                                          Position="Outer"/>
    </chart:LineSeries.DataLabelSettings>
</chart:LineSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Context = LabelContext.DateTime,
    Format = "MMM dd, yyyy",
    Position = DataLabelPosition.Outer
};
```

**Use Case:** When displaying time-series data and you want to show the date or time value on each data label.

---

### Context Comparison Table

| Context Type | What It Displays | Common Use Case | Works With Format |
|-------------|------------------|-----------------|-------------------|
| **YValue** | Y-axis value of the data point | Numerical values, measurements, quantities | ✅ Yes (number formats) |
| **XValue** | X-axis value of the data point | Category names, X-coordinates | ✅ Yes (depends on data type) |
| **Percentage** | Percentage contribution of the data point | Market share, distribution charts | ✅ Yes (percentage formats) |
| **DataLabelItem** | Full data object | Custom multi-property labels | ✅ Yes (via ContentTemplate) |
| **DateTime** | DateTime values from data point | Time-series data labels | ✅ Yes (date/time formats) |

---

### Complete Example with Different Context Types

**ViewModel:**
```csharp
public class SalesData
{
    public string Category { get; set; }
    public double Value { get; set; }
    public DateTime Date { get; set; }
    public string Region { get; set; }
}

public class ViewModel
{
    public ObservableCollection<SalesData> Data { get; set; }
    
    public ViewModel()
    {
        Data = new ObservableCollection<SalesData>
        {
            new SalesData { Category = "Product A", Value = 25, Date = new DateTime(2024, 1, 1), Region = "North" },
            new SalesData { Category = "Product B", Value = 35, Date = new DateTime(2024, 2, 1), Region = "South" },
            new SalesData { Category = "Product C", Value = 40, Date = new DateTime(2024, 3, 1), Region = "East" }
        };
    }
}
```

**XAML:**
```xml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>

    <!-- Series 1: Showing YValue -->
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Value"
                       ShowDataLabels="True"
                       Label="Y Values">
        <chart:ColumnSeries.DataLabelSettings>
            <chart:CartesianDataLabelSettings Context="YValue"
                                              Position="Outer"
                                              Format="N0"/>
        </chart:ColumnSeries.DataLabelSettings>
    </chart:ColumnSeries>

    <!-- Series 2: Showing Percentage -->
    <chart:LineSeries ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value"
                     ShowDataLabels="True"
                     Label="Percentages">
        <chart:LineSeries.DataLabelSettings>
            <chart:CartesianDataLabelSettings Context="Percentage"
                                              Position="Auto"
                                              Format="P1"/>
        </chart:LineSeries.DataLabelSettings>
    </chart:LineSeries>
</chart:SfCartesianChart>
```

## Positioning

The `Position` property of `CartesianDataLabelSettings` controls where data labels appear relative to data points. The positioning behavior may vary based on the series type for optimal readability.

### Available Position Options

The `DataLabelPosition` enumeration provides the following options:

#### 1. Auto (Automatic)

The chart automatically determines the best position for data labels based on the series type and available space. This is recommended when you want the chart to optimize label placement for readability.

**XAML:**
```xaml
<chart:LineSeries ShowDataLabels="True">
    <chart:LineSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Position="Auto"/>
    </chart:LineSeries.DataLabelSettings>
</chart:LineSeries>
```

**When to use:** Line, spline, and scatter series where labels need smart positioning to avoid overlapping with data points.

---

#### 2. Inner

Positions data labels **inside** the data point or segment area. For column/bar series, labels appear within the column/bar bounds.

**XAML:**
```xaml
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Position="Inner" 
                                          Foreground="White"
                                          Background="Transparent"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Position = DataLabelPosition.Inner,
    Foreground = new SolidColorBrush(Colors.White),
    Background = new SolidColorBrush(Colors.Transparent)
};
```

**When to use:** Large columns/bars where labels fit comfortably inside. Ensure sufficient contrast between label and segment colors.

**Note:** For small segments, inner labels may not be visible. Use `Outer` position instead.

---

#### 3. Outer

Positions data labels **outside** the data point or segment area. For column series, labels appear above the column top; for bar series, to the right of the bar end.

**XAML:**
```xaml
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Position="Outer" 
                                          Foreground="Black"
                                          Background="LightYellow"
                                          BorderBrush="Gray"
                                          BorderThickness="1"
                                          Margin="3"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Position = DataLabelPosition.Outer,
    Foreground = new SolidColorBrush(Colors.Black),
    Background = new SolidColorBrush(Colors.LightYellow),
    BorderBrush = new SolidColorBrush(Colors.Gray),
    BorderThickness = new Thickness(1),
    Margin = new Thickness(3)
};
```

**When to use:** Most column/bar charts, especially when segments are small or when you want labels to stand out clearly.

**Tip:** Combine with `ShowConnectorLine="True"` for better visual connection between label and data point.

---

#### 4. Center

Positions data labels at the **center** of the data point or segment. For column/bar series, labels appear in the middle of the column/bar height.

**XAML:**
```xaml
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Position="Center" 
                                          Foreground="White"
                                          FontWeight="Bold"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Position = DataLabelPosition.Center,
    Foreground = new SolidColorBrush(Colors.White),
    FontWeight = Windows.UI.Text.FontWeights.Bold
};
```

**When to use:** When you want labels centered within segments, providing a balanced look for medium to large segments.

---

### Position Comparison Table

| Position | Location | Best For | Requires Connector Line |
|----------|----------|----------|------------------------|
| **Auto** | Automatically determined | Line, Spline, Scatter series | Optional |
| **Inner** | Inside segment | Large columns/bars with good contrast | No |
| **Outer** | Outside segment | Most column/bar charts, small segments | Recommended |
| **Center** | Center of segment | Medium/large segments, balanced look | No |

---

### Position Examples by Series Type

**Column Series - All Positions:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>

    <!-- Inner Position -->
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Value1"
                       ShowDataLabels="True"
                       Label="Inner Labels">
        <chart:ColumnSeries.DataLabelSettings>
            <chart:CartesianDataLabelSettings Position="Inner" 
                                              Foreground="White"
                                              FontSize="11"/>
        </chart:ColumnSeries.DataLabelSettings>
    </chart:ColumnSeries>

    <!-- Outer Position with Connector Line -->
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Value2"
                       ShowDataLabels="True"
                       Label="Outer Labels">
        <chart:ColumnSeries.DataLabelSettings>
            <chart:CartesianDataLabelSettings Position="Outer" 
                                              ShowConnectorLine="True"
                                              ConnectorHeight="20"
                                              Foreground="Black"
                                              FontSize="11"/>
        </chart:ColumnSeries.DataLabelSettings>
    </chart:ColumnSeries>

    <!-- Center Position -->
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Value3"
                       ShowDataLabels="True"
                       Label="Center Labels">
        <chart:ColumnSeries.DataLabelSettings>
            <chart:CartesianDataLabelSettings Position="Center" 
                                              Foreground="White"
                                              FontWeight="Bold"
                                              FontSize="11"/>
        </chart:ColumnSeries.DataLabelSettings>
    </chart:ColumnSeries>
</chart:SfCartesianChart>
```

**Line Series - Auto Position:**
```xaml
<chart:LineSeries ItemsSource="{Binding Data}"
                 XBindingPath="Month"
                 YBindingPath="Sales"
                 ShowDataLabels="True">
    <chart:LineSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Position="Auto"
                                          Background="White"
                                          BorderBrush="DarkBlue"
                                          BorderThickness="1"
                                          Foreground="DarkBlue"
                                          FontSize="10"
                                          Margin="2"/>
    </chart:LineSeries.DataLabelSettings>
</chart:LineSeries>
```

## Customization

Customize data label appearance using various styling properties.

### Basic Styling Properties

**XAML:**
```xaml
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Position="Outer" 
                                          Foreground="White" 
                                          FontSize="12" 
                                          FontFamily="Calibri" 
                                          FontStyle="Italic"
                                          BorderBrush="Black" 
                                          BorderThickness="1" 
                                          Margin="2"
                                          Background="#1E88E5"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Position = DataLabelPosition.Outer,
    Foreground = new SolidColorBrush(Colors.White),
    FontSize = 12,
    FontFamily = new FontFamily("Calibri"),
    FontStyle = FontStyles.Italic,
    BorderBrush = new SolidColorBrush(Colors.Black),
    BorderThickness = new Thickness(1),
    Margin = new Thickness(2),
    Background = new SolidColorBrush(Color.FromArgb(255, 30, 136, 229))
};
```

### Styling Properties

| Property | Description | Example Value |
|----------|-------------|---------------|
| **Foreground** | Text color | `Colors.White` |
| **Background** | Label background | `Colors.Blue` |
| **FontSize** | Text size | `12` |
| **FontFamily** | Font typeface | `"Calibri"` |
| **FontStyle** | Normal/Italic | `FontStyles.Italic` |
| **BorderBrush** | Border color | `Colors.Black` |
| **BorderThickness** | Border width | `1` |
| **Margin** | Spacing around label | `2` |

### Complete Styled Example

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Series>
        <chart:ColumnSeries ItemsSource="{Binding Data}" 
                           XBindingPath="Month"
                           YBindingPath="Sales" 
                           ShowDataLabels="True">
            <chart:ColumnSeries.DataLabelSettings>
                <chart:CartesianDataLabelSettings Position="Outer" 
                                                  Context="YValue"
                                                  Foreground="DarkBlue" 
                                                  FontSize="14" 
                                                  FontFamily="Segoe UI"
                                                  FontStyle="Italic"
                                                  BorderBrush="SteelBlue" 
                                                  BorderThickness="2" 
                                                  Margin="5"
                                                  Background="LightCyan"
                                                  Format="#,##0"/>
            </chart:ColumnSeries.DataLabelSettings>
        </chart:ColumnSeries>
    </chart:SfCartesianChart.Series>
</chart:SfCartesianChart>
```

## Template

The appearance of the data label can be customized using the `ContentTemplate` property of `CartesianDataLabelSettings`.

### Basic Template Example

**XAML:**
```xml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Resources>
        <DataTemplate x:Key="dataLabelTemplate">
            <StackPanel Orientation="Vertical">
                <Path Grid.Row="0" 
                      Stretch="Uniform"
                      Fill="#1E88E5"                              
                      Width="15"
                      Height="15"
                      Margin="0,0,0,0"                              
                      RenderTransformOrigin="0.5,0.5"
                      Data="M22.5,15.8899993896484L37.5,30.8899993896484 7.5,30.8899993896484 22.5,15.8899993896484z">
                    <Path.RenderTransform>
                        <TransformGroup>
                            <TransformGroup.Children>
                                <RotateTransform Angle="0" />
                                <ScaleTransform ScaleX="1" ScaleY="1" />
                            </TransformGroup.Children>
                        </TransformGroup>
                    </Path.RenderTransform>
                </Path>
                <TextBlock Grid.Row="1"
                           Text="{Binding}" 
                           FontSize="11"
                           Foreground="Black"/>
            </StackPanel>
        </DataTemplate>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>

    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Value"
                       ShowDataLabels="True">
        <chart:ColumnSeries.DataLabelSettings>
            <chart:CartesianDataLabelSettings Position="Outer"
                                              Context="YValue"
                                              ContentTemplate="{StaticResource dataLabelTemplate}"/>
        </chart:ColumnSeries.DataLabelSettings>
    </chart:ColumnSeries>
</chart:SfCartesianChart>
```

> **Important Note:** The binding context for the `ContentTemplate` is the `Context` property value, which is used to customize the content of data labels. This property defines the value displayed in the data label, such as the X value or any other value from the underlying model object. By default, the value of `Context` is `YValue`.

### Simple Custom Template

**XAML:**
```xml
<chart:SfCartesianChart.Resources>
    <DataTemplate x:Key="simpleLabelTemplate">
        <Border Background="Orange" 
                CornerRadius="4" 
                BorderThickness="1" 
                BorderBrush="Black"
                Padding="5">
            <TextBlock Text="{Binding}" 
                      Foreground="White"
                      FontStyle="Italic"
                      FontSize="11"/>
        </Border>
    </DataTemplate>
</chart:SfCartesianChart.Resources>

<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Position="Outer"
                                          Context="YValue"
                                          ContentTemplate="{StaticResource simpleLabelTemplate}"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

## Formatting

Use the `Format` property to apply number or date formatting to labels.

### Number Formatting

**XAML:**
```xaml
<!-- Currency format -->
<chart:CartesianDataLabelSettings Format="C" Context="YValue"/>

<!-- Fixed decimal places -->
<chart:CartesianDataLabelSettings Format="N2" Context="YValue"/>

<!-- Percentage -->
<chart:CartesianDataLabelSettings Format="P0" Context="YValue"/>

<!-- Custom format -->
<chart:CartesianDataLabelSettings Format="#,##0.00" Context="YValue"/>
```

### Common Format Strings

| Format | Description | Example Input | Output |
|--------|-------------|---------------|--------|
| `"C"` | Currency | 1234.56 | $1,234.56 |
| `"C0"` | Currency (no decimals) | 1234.56 | $1,235 |
| `"N2"` | Number (2 decimals) | 1234.567 | 1,234.57 |
| `"P0"` | Percentage (no decimals) | 0.85 | 85% |
| `"P1"` | Percentage (1 decimal) | 0.856 | 85.6% |
| `"#,##0"` | Thousands separator | 1234567 | 1,234,567 |
| `"0.000"` | Fixed 3 decimals | 12.5 | 12.500 |

### Date Formatting

For DateTimeAxis or date values:

```xaml
<!-- Date formats -->
<chart:CartesianDataLabelSettings Format="MM/dd/yyyy" Context="XValue"/>
<chart:CartesianDataLabelSettings Format="MMM dd" Context="XValue"/>
<chart:CartesianDataLabelSettings Format="yyyy-MM-dd HH:mm" Context="XValue"/>
```

### Example with Different Formats

**XAML:**
```xaml
<chart:SfCartesianChart>
    <!-- Currency labels -->
    <chart:ColumnSeries ShowDataLabels="True">
        <chart:ColumnSeries.DataLabelSettings>
            <chart:CartesianDataLabelSettings Format="C0" 
                                              Position="Outer"/>
        </chart:ColumnSeries.DataLabelSettings>
    </chart:ColumnSeries>
    
    <!-- Percentage labels -->
    <chart:LineSeries ShowDataLabels="True">
        <chart:LineSeries.DataLabelSettings>
            <chart:CartesianDataLabelSettings Format="P1" 
                                              Position="Auto"/>
        </chart:LineSeries.DataLabelSettings>
    </chart:LineSeries>
</chart:SfCartesianChart>
```

## Rotation

Rotate data labels to prevent overlapping or for better visual alignment.

### Setting Rotation

**XAML:**
```xaml
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Rotation="45" 
                                          Position="Outer"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Rotation = 45,
    Position = DataLabelPosition.Outer
};
```

### Common Rotation Angles

- **0°** - Horizontal (default)
- **45°** - Diagonal (common for column charts)
- **90°** - Vertical
- **-45°** - Diagonal (opposite direction)
- **-90°** - Vertical (opposite direction)

### Example with Rotation

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Month"
                       YBindingPath="Value"
                       ShowDataLabels="True">
        <chart:ColumnSeries.DataLabelSettings>
            <chart:CartesianDataLabelSettings Position="Outer"
                                              Rotation="-45"
                                              Foreground="DarkBlue"
                                              FontSize="10"/>
        </chart:ColumnSeries.DataLabelSettings>
    </chart:ColumnSeries>
</chart:SfCartesianChart>
```

## Alignment

Control label alignment within the data point area using `BarLabelAlignment`, `HorizontalAlignment`, and `VerticalAlignment`.

### BarLabelAlignment

For column and bar series, position labels at Top, Middle, or Bottom of segments.

**XAML:**
```xaml
<!-- Top of column -->
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings BarLabelAlignment="Top"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>

<!-- Middle of column -->
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings BarLabelAlignment="Middle"
                                          Foreground="White"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>

<!-- Bottom of column -->
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings BarLabelAlignment="Bottom"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

### HorizontalAlignment and VerticalAlignment

Fine-tune label positioning:

**XAML:**
```xaml
<chart:CartesianDataLabelSettings HorizontalAlignment="Center"
                                  VerticalAlignment="Top"/>
```

## Connector Lines

Connector lines connect data labels (especially outer labels) to their data points.

### Enabling Connector Lines

**XAML:**
```xaml
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Position="Outer" 
                                          ShowConnectorLine="True"
                                          ConnectorHeight="40"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    Position = DataLabelPosition.Outer,
    ShowConnectorLine = true,
    ConnectorHeight = 40
};
```

### Customizing Connector Lines

**XAML:**
```xaml
<chart:SfCartesianChart.Resources>
    <Style TargetType="Path" x:Key="connectorStyle">
        <Setter Property="Stroke" Value="Blue"/>
        <Setter Property="StrokeThickness" Value="2"/>
        <Setter Property="StrokeDashArray" Value="5,2"/>
    </Style>
</chart:SfCartesianChart.Resources>

<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Position="Outer" 
                                          ShowConnectorLine="True"
                                          ConnectorHeight="30"
                                          ConnectorLineStyle="{StaticResource connectorStyle}"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

### Connector Line Properties

- **ShowConnectorLine** - Enable/disable connector line
- **ConnectorHeight** - Length of connector line
- **ConnectorLineStyle** - Custom style for line appearance

## Series Palette

The `UseSeriesPalette` property applies the series interior color to the data label background. When enabled, each data label's background will match its corresponding data point's color from the series palette.

### Enabling Series Palette

**XAML:**
```xaml
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings UseSeriesPalette="True"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

**C#:**
```csharp
series.DataLabelSettings = new CartesianDataLabelSettings()
{
    UseSeriesPalette = true
};
```

### Complete Example with Series Palette

**XAML:**
```xaml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Resources>
        <BrushCollection x:Key="customBrushes">
            <SolidColorBrush Color="#4472C4"/>
            <SolidColorBrush Color="#ED7D31"/>
            <SolidColorBrush Color="#A5A5A5"/>
            <SolidColorBrush Color="#FFC000"/>
        </BrushCollection>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:SfCartesianChart.Series>
        <chart:ColumnSeries ItemsSource="{Binding Data}"
                           XBindingPath="Category"
                           YBindingPath="Value"
                           ShowDataLabels="True"
                           PaletteBrushes="{StaticResource customBrushes}">
            <chart:ColumnSeries.DataLabelSettings>
                <chart:CartesianDataLabelSettings UseSeriesPalette="True"
                                                  Position="Outer"/>
            </chart:ColumnSeries.DataLabelSettings>
        </chart:ColumnSeries>
    </chart:SfCartesianChart.Series>
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

// Create custom palette
List<Brush> customBrushes = new List<Brush>
{
    new SolidColorBrush(Color.FromArgb(255, 68, 114, 196)),
    new SolidColorBrush(Color.FromArgb(255, 237, 125, 49)),
    new SolidColorBrush(Color.FromArgb(255, 165, 165, 165)),
    new SolidColorBrush(Color.FromArgb(255, 255, 192, 0))
};

ColumnSeries series = new ColumnSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Category",
    YBindingPath = "Value",
    ShowDataLabels = true,
    PaletteBrushes = customBrushes
};

series.DataLabelSettings = new CartesianDataLabelSettings()
{
    UseSeriesPalette = true,
    Position = DataLabelPosition.Outer
};

chart.Series.Add(series);
this.Content = chart;
```

## Troubleshooting Tips

### Labels Not Showing

**Problem:** Data labels not visible.

**Solutions:**
1. Verify `ShowDataLabels="True"`
2. Check foreground color (not same as background)
3. Ensure data values are valid (not null or NaN)
4. Check position (try different positions)

```xaml
<!-- Correct setup -->
<chart:ColumnSeries ShowDataLabels="True">
    <chart:ColumnSeries.DataLabelSettings>
        <chart:CartesianDataLabelSettings Position="Outer"
                                          Foreground="Black"/>
    </chart:ColumnSeries.DataLabelSettings>
</chart:ColumnSeries>
```

### Labels Overlapping

**Problem:** Data labels overlap each other.

**Solutions:**
1. Apply rotation
2. Change position (Inner to Outer or vice versa)
3. Reduce font size
4. Use connector lines with outer position
5. Reduce number of data points displayed

```xaml
<!-- Solution 1: Rotation -->
<chart:CartesianDataLabelSettings Rotation="45"/>

<!-- Solution 2: Outer position with connectors -->
<chart:CartesianDataLabelSettings Position="Outer"
                                  ShowConnectorLine="True"
                                  ConnectorHeight="30"/>
```

### Format Not Applied

**Problem:** Format string not formatting labels.

**Solutions:**
1. Verify Context is set correctly
2. Check format string syntax
3. Ensure data type matches format

```xaml
<!-- Correct: Format with proper context -->
<chart:CartesianDataLabelSettings Context="YValue"
                                  Format="N2"/>
```

### Template Not Binding

**Problem:** Custom template not displaying data.

**Solution:** Ensure binding context is correct. The binding context is the value specified by Context property.

```xaml
<!-- Correct binding in template -->
<DataTemplate>
    <TextBlock Text="{Binding}"/> <!-- Binds to Context value -->
</DataTemplate>
```

### Inner Labels Not Visible

**Problem:** Inner positioned labels not visible in small segments.

**Solutions:**
1. Use outer position
2. Reduce font size
3. Change foreground color to contrast with segment

```xaml
<!-- Solution: Outer position -->
<chart:CartesianDataLabelSettings Position="Outer"/>

<!-- Or: Contrast color for inner -->
<chart:CartesianDataLabelSettings Position="Inner"
                                  Foreground="White"
                                  FontSize="10"/>
```

### Performance Issues

**Problem:** Chart slow with many data labels.

**Solutions:**
1. Disable labels if not essential
2. Show labels only for significant points
3. Reduce number of data points
4. Simplify label templates

```csharp
// Filter data to show fewer labels
var significantData = allData.Where(d => d.Value > threshold).ToList();
```

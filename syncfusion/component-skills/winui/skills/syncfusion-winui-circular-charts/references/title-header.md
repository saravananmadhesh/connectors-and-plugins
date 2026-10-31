# Title and Header

## Overview

The chart title (header) provides context and identifies what the chart represents. It's one of the first elements users see and helps them understand the data being presented.

**Key Features:**
- Simple text or complex UIElement support
- Alignment options (left, center, right)
- Full customization with styles and formatting
- Can include icons, borders, and decorations

## Basic Title

### Simple Text Title

Use the **Header** property to set a basic text title:

**XAML:**
```xml
<chart:SfCircularChart Header="Product Sales Distribution">
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();
chart.Header = "Product Sales Distribution";

PieSeries series = new PieSeries();
chart.Series.Add(series);
```

**Result:** Simple text header displayed above the chart

## Custom Header with UIElement

Create rich headers using any UIElement:

### TextBlock Header

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <TextBlock Text="Sales by Product Category"
                  Margin="10"
                  FontFamily="Verdana"
                  FontSize="18"
                  Foreground="DarkBlue"/>
    </chart:SfCircularChart.Header>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

TextBlock header = new TextBlock()
{
    Text = "Sales by Product Category",
    Margin = new Thickness(10),
    FontFamily = new FontFamily("Verdana"),
    FontSize = 18,
    Foreground = new SolidColorBrush(Colors.DarkBlue)
};

chart.Header = header;
```

### Header with Border

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <Border BorderThickness="0.5"
               BorderBrush="Black"
               Margin="10"
               CornerRadius="5"
               Background="LightGray"
               Padding="10">
            <TextBlock Text="Q4 Revenue Analysis"
                      FontFamily="Verdana"
                      FontSize="16"
                      FontWeight="Bold"
                      Foreground="DarkSlateGray"/>
        </Border>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```

**C#:**
```csharp
Border headerBorder = new Border()
{
    BorderThickness = new Thickness(0.5),
    BorderBrush = new SolidColorBrush(Colors.Black),
    Margin = new Thickness(10),
    CornerRadius = new CornerRadius(5),
    Background = new SolidColorBrush(Colors.LightGray),
    Padding = new Thickness(10)
};

TextBlock headerText = new TextBlock()
{
    Text = "Q4 Revenue Analysis",
    FontFamily = new FontFamily("Verdana"),
    FontSize = 16,
    FontWeight = FontWeights.Bold,
    Foreground = new SolidColorBrush(Colors.DarkSlateGray)
};

headerBorder.Child = headerText;
chart.Header = headerBorder;
```

### Header with Icon

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <StackPanel Orientation="Horizontal"
                   HorizontalAlignment="Center"
                   Margin="10">
            <SymbolIcon Symbol="Calendar"
                       Foreground="DodgerBlue"
                       Margin="0,0,10,0"/>
            <TextBlock Text="Market Share Analysis"
                      FontSize="16"
                      FontWeight="SemiBold"
                      Foreground="DarkBlue"
                      VerticalAlignment="Center"/>
        </StackPanel>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```

### Multi-line Header

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <StackPanel Margin="10">
            <TextBlock Text="Annual Sales Performance"
                      FontSize="18"
                      FontWeight="Bold"
                      HorizontalAlignment="Center"/>
            <TextBlock Text="Fiscal Year 2024"
                      FontSize="12"
                      Foreground="Gray"
                      HorizontalAlignment="Center"
                      Margin="0,5,0,0"/>
        </StackPanel>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```

## Header Alignment

Control horizontal alignment using **HorizontalHeaderAlignment**:

### Center Alignment (Default)

**XAML:**
```xml
<chart:SfCircularChart Header="Centered Title"
                     HorizontalHeaderAlignment="Center"/>
```

### Left Alignment

**XAML:**
```xml
<chart:SfCircularChart Header="Left Aligned Title"
                     HorizontalHeaderAlignment="Left"/>
```

**C#:**
```csharp
chart.Header = "Left Aligned Title";
chart.HorizontalHeaderAlignment = HorizontalAlignment.Left;
```

### Right Alignment

**XAML:**
```xml
<chart:SfCircularChart Header="Right Aligned Title"
                     HorizontalHeaderAlignment="Right"/>
```

**C#:**
```csharp
chart.Header = "Right Aligned Title";
chart.HorizontalHeaderAlignment = HorizontalAlignment.Right;
```

### Alignment with Custom Header

**XAML:**
```xml
<chart:SfCircularChart HorizontalHeaderAlignment="Right">
    <chart:SfCircularChart.Header>
        <Border BorderThickness="0.5"
               BorderBrush="Black"
               Margin="10"
               CornerRadius="5"
               Padding="8">
            <TextBlock Text="Right Aligned Header"
                      HorizontalTextAlignment="Center"
                      FontFamily="Verdana"
                      FontSize="14"
                      Foreground="Blue"/>
        </Border>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```

## Header Styling Patterns

### Modern Card Style

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <Border Background="White"
               BorderBrush="#E0E0E0"
               BorderThickness="1"
               CornerRadius="8"
               Padding="15,10"
               Margin="10">
            <TextBlock Text="Sales Dashboard"
                      FontSize="16"
                      FontWeight="SemiBold"
                      Foreground="#424242"/>
        </Border>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```

### Colored Header Bar

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <Border Background="#2196F3"
               Padding="12,8"
               Margin="0,0,0,10">
            <TextBlock Text="Revenue Distribution"
                      FontSize="16"
                      FontWeight="Bold"
                      Foreground="White"/>
        </Border>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```

### Minimal Header

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <TextBlock Text="Product Analysis"
                  FontSize="14"
                  FontWeight="Normal"
                  Foreground="#616161"
                  Margin="5"/>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```

### Header with Subtitle

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <StackPanel Margin="10">
            <TextBlock Text="Market Share"
                      FontSize="20"
                      FontWeight="Bold"
                      HorizontalAlignment="Center"/>
            <TextBlock Text="Technology Sector Q3 2024"
                      FontSize="12"
                      Foreground="#757575"
                      HorizontalAlignment="Center"
                      Margin="0,2,0,0"/>
        </StackPanel>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```

### Header with Gradient Background

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <Border CornerRadius="5" Padding="15,10" Margin="10">
            <Border.Background>
                <LinearGradientBrush StartPoint="0,0" EndPoint="1,0">
                    <GradientStop Color="#667eea" Offset="0"/>
                    <GradientStop Color="#764ba2" Offset="1"/>
                </LinearGradientBrush>
            </Border.Background>
            <TextBlock Text="Performance Metrics"
                      FontSize="18"
                      FontWeight="Bold"
                      Foreground="White"/>
        </Border>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```

## Best Practices

### Content

1. **Concise and clear** - Keep titles brief but descriptive
2. **Context specific** - Include relevant time periods, metrics, or categories
3. **Avoid redundancy** - Don't repeat information shown in legend or labels
4. **Consistent naming** - Use similar title patterns across related charts

### Styling

1. **Readable fonts** - Use clear, sans-serif fonts for headers
2. **Appropriate size** - 14-20px typically works well
3. **Sufficient contrast** - Ensure title stands out but doesn't dominate
4. **Match theme** - Coordinate with overall application design

### Positioning

1. **Top placement** - Headers naturally go above the chart
2. **Alignment choice** - Center for formal reports, left for dashboards
3. **Adequate spacing** - Use margins to separate from chart content
4. **Responsive design** - Ensure header scales appropriately

### Accessibility

1. **Clear language** - Use plain, understandable terms
2. **Sufficient size** - Minimum 12pt for readability
3. **High contrast** - Between text and background
4. **Semantic structure** - Use proper heading levels if nesting charts

## Common Scenarios

### Scenario 1: Simple Dashboard Title

```xml
<chart:SfCircularChart Header="Monthly Sales"
                     HorizontalHeaderAlignment="Left">
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding MonthlySales}"
                       XBindingPath="Month"
                       YBindingPath="Revenue"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 2: Report-Style Header

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <StackPanel Margin="15">
            <TextBlock Text="Quarterly Revenue Analysis"
                      FontSize="20"
                      FontWeight="Bold"
                      HorizontalAlignment="Center"/>
            <TextBlock Text="Q4 2024 - All Regions"
                      FontSize="12"
                      Foreground="Gray"
                      HorizontalAlignment="Center"
                      Margin="0,5,0,0"/>
        </StackPanel>
    </chart:SfCircularChart.Header>
    
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCircularChart.Legend>
</chart:SfCircularChart>
```

### Scenario 3: Branded Header

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <Border Background="#1976D2"
               Padding="15,10">
            <StackPanel Orientation="Horizontal">
                <Image Source="/Assets/logo.png"
                      Width="24"
                      Height="24"
                      Margin="0,0,10,0"/>
                <TextBlock Text="Company Performance Dashboard"
                          FontSize="16"
                          FontWeight="SemiBold"
                          Foreground="White"
                          VerticalAlignment="Center"/>
            </StackPanel>
        </Border>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```

### Scenario 4: Dynamic Header with Binding

**ViewModel:**
```csharp
public class ChartViewModel
{
    public string ChartTitle => $"Sales Report - {DateTime.Now:MMMM yyyy}";
}
```

**XAML:**
```xml
<chart:SfCircularChart Header="{Binding ChartTitle}">
    <chart:SfCircularChart.DataContext>
        <local:ChartViewModel/>
    </chart:SfCircularChart.DataContext>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 5: Minimal Style with Emphasis

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Header>
        <TextBlock FontSize="16" Margin="10,10,10,5">
            <Run Text="Market Distribution"
                FontWeight="Bold"
                Foreground="#212121"/>
            <Run Text=" • "
                Foreground="#9E9E9E"/>
            <Run Text="2024"
                FontWeight="Normal"
                Foreground="#757575"/>
        </TextBlock>
    </chart:SfCircularChart.Header>
</chart:SfCircularChart>
```
# Title Customization

The funnel chart title (header) provides context for your data visualization. This guide covers setting simple string titles and creating custom styled headers.

## Setting a Basic Title

Use the `Header` property to add a title to your funnel chart:

### XAML
```xml
<chart:SfFunnelChart x:Name="chart"
                     Header="PRODUCT SALES"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
</chart:SfFunnelChart>
```

### C#
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.Header = "PRODUCT SALES";
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
this.Content = chart;
```

**Result:** A simple text title appears at the top of the chart with default styling.

## Custom Title with Styling

The `Header` property accepts any `UIElement`, allowing complete customization:

### Styled Title with Border

```xml
<chart:SfFunnelChart ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.Header>
        <Border BorderThickness="2"
                BorderBrush="Black"
                Margin="10"
                CornerRadius="5">
            <TextBlock FontSize="14"
                       Text="PRODUCT SALES"
                       Margin="5"/>
        </Border>
    </chart:SfFunnelChart.Header>
</chart:SfFunnelChart>
```

**C# equivalent:**
```csharp
SfFunnelChart chart = new SfFunnelChart();

Border border = new Border()
{
    BorderThickness = new Thickness(2),
    BorderBrush = new SolidColorBrush(Colors.Black),
    Margin = new Thickness(10),
    CornerRadius = new CornerRadius(5)
};

TextBlock textBlock = new TextBlock()
{
    Text = "PRODUCT SALES",
    Margin = new Thickness(5),
    FontSize = 14
};

border.Child = textBlock;
chart.Header = border;
this.Content = chart;
```

### Title with Background Color

```xml
<chart:SfFunnelChart.Header>
    <Border BorderThickness="2"
            Background="LightBlue"
            BorderBrush="Black"
            Margin="10"
            CornerRadius="5">
        <TextBlock FontSize="14"
                   Text="SALES PIPELINE"
                   Margin="5"/>
    </Border>
</chart:SfFunnelChart.Header>
```

### Title with Icon

```xml
<chart:SfFunnelChart.Header>
    <StackPanel Orientation="Horizontal" Margin="10">
        <SymbolIcon Symbol="Chart" Margin="0,0,8,0"/>
        <TextBlock Text="CONVERSION FUNNEL"
                   FontSize="16"/>
    </StackPanel>
</chart:SfFunnelChart.Header>
```

## Title Alignment

Control the horizontal position of the title using `HorizontalHeaderAlignment`:

### Left Alignment
```xml
<chart:SfFunnelChart HorizontalHeaderAlignment="Left"
                     Header="SALES DATA">
</chart:SfFunnelChart>
```

### Center Alignment (Default)
```xml
<chart:SfFunnelChart HorizontalHeaderAlignment="Center"
                     Header="SALES DATA">
</chart:SfFunnelChart>
```

### Right Alignment
```xml
<chart:SfFunnelChart HorizontalHeaderAlignment="Right"
                     Header="SALES DATA">
</chart:SfFunnelChart>
```

### Complete Example with Alignment

```xml
<chart:SfFunnelChart x:Name="chart"
                     HorizontalHeaderAlignment="Right"
                     ShowDataLabels="True"
                     Height="388" Width="500"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.Header>
        <Border BorderThickness="2"
                Background="LightBlue"
                BorderBrush="Black"
                Margin="10"
                CornerRadius="5">
            <TextBlock FontSize="14"
                       Text="PRODUCT SALES"
                       Margin="5"/>
        </Border>
    </chart:SfFunnelChart.Header>
    
    <chart:SfFunnelChart.DataContext>
        <model:ChartViewModel />
    </chart:SfFunnelChart.DataContext>
    
    <chart:SfFunnelChart.Legend>
        <chart:ChartLegend />
    </chart:SfFunnelChart.Legend>
</chart:SfFunnelChart>
```

**C# equivalent:**
```csharp
public sealed partial class MainPage : Page
{
    public MainPage()
    {
        this.InitializeComponent();
        
        SfFunnelChart chart = new SfFunnelChart();
        ChartViewModel viewModel = new ChartViewModel();
        chart.DataContext = viewModel;
        chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
        chart.HorizontalHeaderAlignment = HorizontalAlignment.Right;
        chart.XBindingPath = "Category";
        chart.YBindingPath = "Value";
        chart.Height = 388;
        chart.Width = 500;
        
        Border border = new Border()
        {
            BorderThickness = new Thickness(2),
            BorderBrush = new SolidColorBrush(Colors.Black),
            Background = new SolidColorBrush(Colors.LightBlue),
            Margin = new Thickness(10),
            CornerRadius = new CornerRadius(5)
        };
        
        TextBlock textBlock = new TextBlock()
        {
            Text = "PRODUCT SALES",
            Margin = new Thickness(5),
            FontSize = 14
        };
        
        border.Child = textBlock;
        chart.Header = border;
        chart.Legend = new ChartLegend();
        chart.ShowDataLabels = true;
        
        this.Content = chart;
    }
}
```

## Advanced Title Layouts

### Multi-line Title

```xml
<chart:SfFunnelChart.Header>
    <StackPanel Margin="10">
        <TextBlock Text="Q4 Sales Performance"
                   FontSize="18"
                   HorizontalAlignment="Center"/>
        <TextBlock Text="October - December 2025"
                   FontSize="12"
                   Foreground="Gray"
                   HorizontalAlignment="Center"/>
    </StackPanel>
</chart:SfFunnelChart.Header>
```

### Title with Subtitle and Metadata

```xml
<chart:SfFunnelChart.Header>
    <Grid Margin="10">
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="*"/>
            <ColumnDefinition Width="Auto"/>
        </Grid.ColumnDefinitions>
        
        <StackPanel Grid.Column="0">
            <TextBlock Text="Sales Conversion Funnel"
                       FontSize="16"/>
            <TextBlock Text="Current Quarter"
                       FontSize="11"
                       Foreground="DarkGray"/>
        </StackPanel>
        
        <TextBlock Grid.Column="1"
                   Text="Last Updated: Today"
                   FontSize="10"
                   VerticalAlignment="Bottom"
                   Foreground="Gray"/>
    </Grid>
</chart:SfFunnelChart.Header>
```

### Title with Gradient Background

```xml
<chart:SfFunnelChart.Header>
    <Border CornerRadius="8" Padding="12,8" Margin="10">
        <Border.Background>
            <LinearGradientBrush StartPoint="0,0" EndPoint="1,0">
                <GradientStop Color="#667eea" Offset="0"/>
                <GradientStop Color="#764ba2" Offset="1"/>
            </LinearGradientBrush>
        </Border.Background>
        <TextBlock Text="ANNUAL PERFORMANCE"
                   FontSize="16"
                   Foreground="White"/>
    </Border>
</chart:SfFunnelChart.Header>
```

## Common Title Patterns

### Corporate Style
```xml
<chart:SfFunnelChart.Header>
    <Border Background="#2C3E50" Padding="15,8" CornerRadius="4">
        <TextBlock Text="QUARTERLY RESULTS"
                   FontSize="15"
                   Foreground="White"
                   CharacterSpacing="100"/>
    </Border>
</chart:SfFunnelChart.Header>
```

### Minimal Style
```xml
<chart:SfFunnelChart.Header>
    <TextBlock Text="Sales Pipeline"
               FontSize="20"
               Foreground="#333333"
               Margin="0,10,0,15"/>
</chart:SfFunnelChart.Header>
```

### Dashboard Style
```xml
<chart:SfFunnelChart.Header>
    <Grid Margin="10,10,10,5">
        <Rectangle Fill="#f0f0f0" RadiusX="6" RadiusY="6"/>
        <TextBlock Text="CONVERSION METRICS"
                   FontSize="13"
                   Foreground="#444444"
                   Margin="12,6"
                   VerticalAlignment="Center"/>
    </Grid>
</chart:SfFunnelChart.Header>
```

## Dynamic Titles

Set titles dynamically based on data or user selection:

```csharp
public void UpdateChartTitle(string period)
{
    chart.Header = $"Sales Funnel - {period}";
}

// Or with custom styling
public void UpdateStyledTitle(string title, string subtitle)
{
    var stackPanel = new StackPanel() { Margin = new Thickness(10) };
    
    var mainTitle = new TextBlock()
    {
        Text = title,
        FontSize = 18,
        HorizontalAlignment = HorizontalAlignment.Center
    };
    
    var subTitle = new TextBlock()
    {
        Text = subtitle,
        FontSize = 12,
        Foreground = new SolidColorBrush(Colors.Gray),
        HorizontalAlignment = HorizontalAlignment.Center
    };
    
    stackPanel.Children.Add(mainTitle);
    stackPanel.Children.Add(subTitle);
    
    chart.Header = stackPanel;
}
```

## Best Practices

1. **Keep titles concise** - Aim for 3-8 words for clarity
2. **Use ALL CAPS sparingly** - Reserve for emphasis in corporate contexts
3. **Consider context** - Include time periods or data source when relevant
4. **Maintain readability** - Ensure good contrast between text and background
5. **Align with design system** - Match your application's visual style
6. **Test responsiveness** - Ensure titles work at different window sizes

## Troubleshooting

### Title Not Displaying
- Ensure `Header` property is set
- Check for null values
- Verify UIElement is properly constructed

### Title Overlapping Chart
- Adjust `Margin` on the header element
- Reduce `FontSize` if necessary
- Consider chart dimensions

### Alignment Not Working
- Use `HorizontalHeaderAlignment` on the chart, not on the header content
- For complex layouts, use Grid or StackPanel inside the header

### Title Cut Off
- Increase chart `Width`
- Reduce title font size or content length
- Add appropriate margins

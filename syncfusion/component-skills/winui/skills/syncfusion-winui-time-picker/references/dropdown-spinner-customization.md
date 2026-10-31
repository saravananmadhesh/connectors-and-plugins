# Dropdown Spinner Customization in WinUI TimePicker

Comprehensive guide for customizing the dropdown spinner in the Syncfusion WinUI TimePicker control, including cell sizing, styling, templates, and column customization.

## Table of Contents
- [Overview](#overview)
- [Cell Size Customization](#cell-size-customization)
- [Styling All Cells](#styling-all-cells)
- [Cell Template Customization](#cell-template-customization)
- [Conditional Cell Styling](#conditional-cell-styling)
- [Customizing Individual Columns](#customizing-individual-columns)
- [Advanced Examples](#advanced-examples)
- [Performance Considerations](#performance-considerations)
- [Troubleshooting](#troubleshooting)

## Overview

The dropdown spinner is the core selection interface where users scroll through hour, minute, and meridiem values.

**Customizable Elements:**
- **Cell Size** - Width and height of individual cells
- **Cell Style** - Appearance of all cells (font, color, background)
- **Cell Template** - Custom content layout for cells
- **Template Selector** - Conditional templates for specific cells
- **Column Configuration** - Per-column customization (headers, intervals, size)

## Cell Size Customization

Control the dimensions of cells in the dropdown spinner.

### Basic Cell Sizing

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    ItemWidth="100"
    ItemHeight="50" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.ItemWidth = 100;
timePicker.ItemHeight = 50;
```

### Default Values

| Property | Default Value |
|----------|---------------|
| `ItemWidth` | 80 |
| `ItemHeight` | 40 |

### Width Constraints

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    MinItemWidth="70"
    MaxItemWidth="120"
    ItemWidth="100" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.MinItemWidth = 70;
timePicker.MaxItemWidth = 120;
timePicker.ItemWidth = 100;
```

### Default Constraint Values

| Property | Default Value |
|----------|---------------|
| `MinItemWidth` | 0 |
| `MaxItemWidth` | Infinity |

### Width Enforcement

If `ItemWidth` is outside the min/max range, it's clamped:

```csharp
timePicker.MinItemWidth = 80;
timePicker.MaxItemWidth = 120;
timePicker.ItemWidth = 150; // Will be clamped to 120

timePicker.ItemWidth = 50; // Will be clamped to 80
```

### Visual Impact of Sizing

**Small Cells (60x30):**
```
┌─────┬─────┬──────┐
│  10 │  25 │  AM  │
│→ 11←│→ 30←│→ PM ←│
│  12 │  35 │  AM  │
└─────┴─────┴──────┘
```

**Default Cells (80x40):**
```
┌─────────┬─────────┬──────────┐
│    10   │    25   │    AM    │
│  → 11 ← │  → 30 ← │  → PM ←  │
│    12   │    35   │    AM    │
└─────────┴─────────┴──────────┘
```

**Large Cells (120x60):**
```
┌──────────────┬──────────────┬──────────────┐
│      10      │      25      │      AM      │
│   →  11  ←   │   →  30  ←   │   →  PM  ←   │
│      12      │      35      │      AM      │
└──────────────┴──────────────┴──────────────┘
```

### Touch-Friendly Sizing

```csharp
// Recommended for touch interfaces
timePicker.ItemWidth = 100;
timePicker.ItemHeight = 60; // Larger tap targets
```

### Compact Sizing

```csharp
// Minimal space usage
timePicker.ItemWidth = 60;
timePicker.ItemHeight = 32;
timePicker.MinItemWidth = 50;
```

## Styling All Cells

Apply consistent styling to all spinner cells using `ItemContainerStyle`.

### Basic Cell Styling

**XAML:**
```xml
<editors:SfTimePicker x:Name="sfTimePicker">
    <editors:SfTimePicker.ItemContainerStyle>
        <Style TargetType="editors:SpinnerItem">
            <Setter Property="Foreground" Value="Red"/>
            <Setter Property="FontStyle" Value="Italic"/>
        </Style>
    </editors:SfTimePicker.ItemContainerStyle>
</editors:SfTimePicker>
```

### Common Style Properties

**Font Properties:**
```xml
<editors:SfTimePicker>
    <editors:SfTimePicker.ItemContainerStyle>
        <Style TargetType="editors:SpinnerItem">
            <Setter Property="FontFamily" Value="Segoe UI"/>
            <Setter Property="FontSize" Value="16"/>
            <Setter Property="FontWeight" Value="SemiBold"/>
            <Setter Property="FontStyle" Value="Normal"/>
        </Style>
    </editors:SfTimePicker.ItemContainerStyle>
</editors:SfTimePicker>
```

**Color Properties:**
```xml
<editors:SfTimePicker>
    <editors:SfTimePicker.ItemContainerStyle>
        <Style TargetType="editors:SpinnerItem">
            <Setter Property="Foreground" Value="#2196F3"/>
            <Setter Property="Background" Value="Transparent"/>
        </Style>
    </editors:SfTimePicker.ItemContainerStyle>
</editors:SfTimePicker>
```

**Alignment Properties:**
```xml
<editors:SfTimePicker>
    <editors:SfTimePicker.ItemContainerStyle>
        <Style TargetType="editors:SpinnerItem">
            <Setter Property="HorizontalContentAlignment" Value="Center"/>
            <Setter Property="VerticalContentAlignment" Value="Center"/>
        </Style>
    </editors:SfTimePicker.ItemContainerStyle>
</editors:SfTimePicker>
```

### Selected Item Styling

```xml
<editors:SfTimePicker>
    <editors:SfTimePicker.ItemContainerStyle>
        <Style TargetType="editors:SpinnerItem">
            <!-- Default state -->
            <Setter Property="Foreground" Value="Gray"/>
            <Setter Property="FontSize" Value="14"/>
            
            <!-- Selected state -->
            <Setter Property="Background" Value="Transparent"/>
            <Style.Triggers>
                <!-- Note: Visual states may need template modification -->
            </Style.Triggers>
        </Style>
    </editors:SfTimePicker.ItemContainerStyle>
</editors:SfTimePicker>
```

### Complete Style Example

```xml
<editors:SfTimePicker ItemWidth="100" ItemHeight="50">
    <editors:SfTimePicker.ItemContainerStyle>
        <Style TargetType="editors:SpinnerItem">
            <Setter Property="FontFamily" Value="Consolas"/>
            <Setter Property="FontSize" Value="18"/>
            <Setter Property="FontWeight" Value="Bold"/>
            <Setter Property="Foreground" Value="{ThemeResource SystemAccentColor}"/>
            <Setter Property="HorizontalContentAlignment" Value="Center"/>
            <Setter Property="VerticalContentAlignment" Value="Center"/>
            <Setter Property="Margin" Value="2"/>
        </Style>
    </editors:SfTimePicker.ItemContainerStyle>
</editors:SfTimePicker>
```

## Cell Template Customization

Create custom layouts for spinner cells using `ItemTemplate`.

### Basic Item Template

**XAML:**
```xml
<editors:SfTimePicker ItemWidth="100" ItemHeight="50">
    <editors:SfTimePicker.ItemTemplate>
        <DataTemplate>
            <Border 
                BorderBrush="{ThemeResource SystemAccentColor}"
                BorderThickness="1"
                CornerRadius="4"
                Padding="8">
                <TextBlock 
                    Text="{Binding DisplayText}"
                    FontSize="16"
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center" />
            </Border>
        </DataTemplate>
    </editors:SfTimePicker.ItemTemplate>
</editors:SfTimePicker>
```

### Template DataContext

The `DataContext` is [`DateTimeFieldItemInfo`](https://help.syncfusion.com/cr/winui/Syncfusion.UI.Xaml.Editors.DateTimeFieldItemInfo.html) with properties:
- `DisplayText` - Formatted text to display
- `DateTime` - DateTimeOffset value for the cell
- `Field` - DateTimeField type (Hour12, Minute, Meridiem, etc.)

### Gradient Background Template

```xml
<editors:SfTimePicker ItemWidth="100" ItemHeight="50">
    <editors:SfTimePicker.ItemTemplate>
        <DataTemplate>
            <Grid>
                <Grid.Background>
                    <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                        <GradientStop Color="#E3F2FD" Offset="0"/>
                        <GradientStop Color="#BBDEFB" Offset="1"/>
                    </LinearGradientBrush>
                </Grid.Background>
                <TextBlock 
                    Text="{Binding DisplayText}"
                    FontSize="16"
                    FontWeight="SemiBold"
                    Foreground="#1976D2"
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center" />
            </Grid>
        </DataTemplate>
    </editors:SfTimePicker.ItemTemplate>
</editors:SfTimePicker>
```

### Circular Cell Template

```xml
<editors:SfTimePicker ItemWidth="60" ItemHeight="60">
    <editors:SfTimePicker.ItemTemplate>
        <DataTemplate>
            <Grid>
                <Ellipse 
                    Width="50"
                    Height="50"
                    Fill="{ThemeResource SystemAccentColorLight2}"
                    Stroke="{ThemeResource SystemAccentColor}"
                    StrokeThickness="2" />
                <TextBlock 
                    Text="{Binding DisplayText}"
                    FontSize="14"
                    FontWeight="Bold"
                    Foreground="{ThemeResource SystemAccentColor}"
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center" />
            </Grid>
        </DataTemplate>
    </editors:SfTimePicker.ItemTemplate>
</editors:SfTimePicker>
```

### Shadow Effect Template

```xml
<editors:SfTimePicker ItemWidth="90" ItemHeight="50">
    <editors:SfTimePicker.ItemTemplate>
        <DataTemplate>
            <Border 
                Background="White"
                CornerRadius="8"
                Padding="12,8">
                <Border.Shadow>
                    <ThemeShadow />
                </Border.Shadow>
                <TextBlock 
                    Text="{Binding DisplayText}"
                    FontSize="16"
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center" />
            </Border>
        </DataTemplate>
    </editors:SfTimePicker.ItemTemplate>
</editors:SfTimePicker>
```

## Conditional Cell Styling

Apply different templates to specific cells using `ItemTemplateSelector`.

### Creating Template Selector

**C# Template Selector:**
```csharp
public class TimeItemTemplateSelector : DataTemplateSelector
{
    public DataTemplate DefaultTemplate { get; set; }
    public DataTemplate AlarmTemplate { get; set; }
    public DataTemplate SleepTemplate { get; set; }
    public DataTemplate GroupMeetingTemplate { get; set; }

    protected override DataTemplate SelectTemplateCore(
        object item, 
        DependencyObject container)
    {
        DateTimeFieldItemInfo dateTimeField = item as DateTimeFieldItemInfo;
        
        if (dateTimeField.Field == DateTimeField.Hour12)
        {
            switch (dateTimeField.DateTime.Value.Hour)
            {
                case 2:
                case 22:
                    return SleepTemplate as DataTemplate;
                    
                case 5:
                case 17:
                    return AlarmTemplate as DataTemplate;
                    
                case 10:
                case 14:
                    return GroupMeetingTemplate as DataTemplate;
            }
        }

        return DefaultTemplate as DataTemplate;
    }
}
```

### XAML with Template Selector

```xml
<Grid>
    <Grid.Resources>
        <!-- Icon Path Data -->
        <x:String x:Key="alarm">M9.6840663,27.625012C9.9398422,27.624013...</x:String>
        <x:String x:Key="groupMeeting">M16.485048,11.615066C13.010075...</x:String>
        <x:String x:Key="sleep">M2,20.001007L2,22.999999 30,22.999999...</x:String>

        <!-- Default Template -->
        <DataTemplate x:Key="defaultTemplate">
            <TextBlock Text="{Binding DisplayText}" />
        </DataTemplate>

        <!-- Alarm Template -->
        <DataTemplate x:Key="alarmTemplate">
            <Grid>
                <TextBlock
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center"
                    Text="{Binding DisplayText}" />
                <Path
                    Width="18"
                    Height="18"
                    Margin="3"
                    HorizontalAlignment="Right"
                    VerticalAlignment="Top"
                    Data="{StaticResource alarm}"
                    Fill="{ThemeResource SystemBaseHighColor}"
                    Stretch="Uniform" />
            </Grid>
        </DataTemplate>

        <!-- Group Meeting Template -->
        <DataTemplate x:Key="groupMeetingTemplate">
            <Grid>
                <TextBlock
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center"
                    Text="{Binding DisplayText}" />
                <Path
                    Width="18"
                    Height="18"
                    Margin="3"
                    HorizontalAlignment="Right"
                    VerticalAlignment="Top"
                    Data="{StaticResource groupMeeting}"
                    Fill="{ThemeResource SystemBaseHighColor}"
                    Stretch="Uniform" />
            </Grid>
        </DataTemplate>

        <!-- Sleep Template -->
        <DataTemplate x:Key="sleepTemplate">
            <Grid>
                <TextBlock
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center"
                    Text="{Binding DisplayText}" />
                <Path
                    Width="18"
                    Height="18"
                    Margin="3"
                    HorizontalAlignment="Right"
                    VerticalAlignment="Top"
                    Data="{StaticResource sleep}"
                    Fill="{ThemeResource SystemBaseHighColor}"
                    Stretch="Uniform" />
            </Grid>
        </DataTemplate>

        <!-- Template Selector -->
        <local:TimeItemTemplateSelector
            x:Key="selector"
            AlarmTemplate="{StaticResource alarmTemplate}"
            DefaultTemplate="{StaticResource defaultTemplate}"
            GroupMeetingTemplate="{StaticResource groupMeetingTemplate}"
            SleepTemplate="{StaticResource sleepTemplate}" />
    </Grid.Resources>

    <editors:SfTimePicker 
        ItemTemplateSelector="{StaticResource selector}"
        ItemWidth="100"
        ItemHeight="50"
        x:Name="sfTimePicker"/>
</Grid>
```

### Business Hours Template Selector

```csharp
public class BusinessHoursTemplateSelector : DataTemplateSelector
{
    public DataTemplate BusinessHoursTemplate { get; set; }
    public DataTemplate NonBusinessHoursTemplate { get; set; }

    protected override DataTemplate SelectTemplateCore(
        object item, 
        DependencyObject container)
    {
        DateTimeFieldItemInfo dateTimeField = item as DateTimeFieldItemInfo;
        
        if (dateTimeField.Field == DateTimeField.Hour12 ||
            dateTimeField.Field == DateTimeField.Hour24)
        {
            int hour = dateTimeField.DateTime.Value.Hour;
            
            // Business hours: 9 AM - 5 PM
            if (hour >= 9 && hour < 17)
            {
                return BusinessHoursTemplate;
            }
            else
            {
                return NonBusinessHoursTemplate;
            }
        }

        return BusinessHoursTemplate;
    }
}
```

```xml
<!-- Business Hours Template -->
<DataTemplate x:Key="businessHoursTemplate">
    <Border Background="#E8F5E9">
        <TextBlock 
            Text="{Binding DisplayText}"
            Foreground="#2E7D32"
            FontWeight="SemiBold"
            HorizontalAlignment="Center"
            VerticalAlignment="Center" />
    </Border>
</DataTemplate>

<!-- Non-Business Hours Template -->
<DataTemplate x:Key="nonBusinessHoursTemplate">
    <TextBlock 
        Text="{Binding DisplayText}"
        Foreground="Gray"
        FontStyle="Italic"
        HorizontalAlignment="Center"
        VerticalAlignment="Center" />
</DataTemplate>
```

## Customizing Individual Columns

Use `TimeFieldPrepared` event to customize each column separately.

### Basic Column Customization

```csharp
sfTimePicker.TimeFieldPrepared += SfTimePicker_TimeFieldPrepared;

private void SfTimePicker_TimeFieldPrepared(
    object sender, 
    DateTimeFieldPreparedEventArgs e)
{
    if (e.Column != null)
    {
        if (e.Column.Field == DateTimeField.Hour12)
        {
            e.Column.Header = "Hr";
            e.Column.ItemHeight = 60;
            e.Column.ItemWidth = 100;
        }
        else if (e.Column.Field == DateTimeField.Minute)
        {
            e.Column.Header = "Min";
            e.Column.ItemHeight = 40;
            e.Column.ItemWidth = 100;
        }
        else if (e.Column.Field == DateTimeField.Meridiem)
        {
            e.Column.Header = "AM/PM";
            e.Column.ItemHeight = 60;
            e.Column.ItemWidth = 100;
        }
        
        e.Column.ShowHeader = true;
    }
}
```

### Custom Time Intervals

```csharp
using System.Globalization;
using System.Collections.ObjectModel;

private void SfTimePicker_TimeFieldPrepared(
    object sender, 
    DateTimeFieldPreparedEventArgs e)
{
    if (e.Column != null)
    {
        // 5-minute intervals
        if (e.Column.Field == DateTimeField.Minute)
        {
            e.Column.ItemsSource = GetMinutesWithInterval(5, e.Column.Format);
        }
        
        // 15-minute intervals
        if (e.Column.Field == DateTimeField.Second)
        {
            e.Column.ItemsSource = GetSecondsWithInterval(15, e.Column.Format);
        }
    }
}

private static ObservableCollection<string> GetMinutesWithInterval(
    int interval, 
    string pattern)
{
    ObservableCollection<string> minutes = new ObservableCollection<string>();
    NumberFormatInfo provider = new NumberFormatInfo();
    
    for (int i = 0; i < 60; i += interval)
    {
        if (i > 9 || pattern == "%m" || pattern == "{minute.integer}")
        {
            minutes.Add(i.ToString(provider));
        }
        else
        {
            minutes.Add("0" + i.ToString(provider));
        }
    }
    
    return minutes;
}

private static ObservableCollection<string> GetSecondsWithInterval(
    int interval, 
    string pattern)
{
    ObservableCollection<string> seconds = new ObservableCollection<string>();
    NumberFormatInfo provider = new NumberFormatInfo();
    
    for (int i = 0; i < 60; i += interval)
    {
        if (i > 9 || pattern == "%s" || pattern == "{second.integer}")
        {
            seconds.Add(i.ToString(provider));
        }
        else
        {
            seconds.Add("0" + i.ToString(provider));
        }
    }
    
    return seconds;
}
```

### Column-Specific Sizes

```csharp
private void SfTimePicker_TimeFieldPrepared(
    object sender, 
    DateTimeFieldPreparedEventArgs e)
{
    if (e.Column != null)
    {
        switch (e.Column.Field)
        {
            case DateTimeField.Hour12:
                e.Column.ItemWidth = 80;
                e.Column.ItemHeight = 50;
                e.Column.Header = "Hour";
                break;
                
            case DateTimeField.Minute:
                e.Column.ItemWidth = 80;
                e.Column.ItemHeight = 40;
                e.Column.Header = "Minute";
                break;
                
            case DateTimeField.Meridiem:
                e.Column.ItemWidth = 100;
                e.Column.ItemHeight = 50;
                e.Column.Header = "Period";
                break;
        }
        
        e.Column.ShowHeader = true;
    }
}
```

### Hide Specific Columns

```csharp
// Hide seconds column
private void SfTimePicker_TimeFieldPrepared(
    object sender, 
    DateTimeFieldPreparedEventArgs e)
{
    if (e.Column?.Field == DateTimeField.Second)
    {
        e.Column.ItemsSource = new ObservableCollection<string> { "00" };
        e.Column.ShowHeader = false;
        e.Column.ItemWidth = 0; // Hide visually
    }
}
```

## Advanced Examples

### Multi-Style Spinner

```csharp
// Different styles for different columns
sfTimePicker.TimeFieldPrepared += (sender, e) =>
{
    if (e.Column != null)
    {
        var style = new Style(typeof(SpinnerItem));
        
        if (e.Column.Field == DateTimeField.Hour12)
        {
            style.Setters.Add(new Setter(Control.FontSizeProperty, 20));
            style.Setters.Add(new Setter(Control.ForegroundProperty, new SolidColorBrush(Colors.Blue)));
        }
        else if (e.Column.Field == DateTimeField.Minute)
        {
            style.Setters.Add(new Setter(Control.FontSizeProperty, 16));
            style.Setters.Add(new Setter(Control.ForegroundProperty, new SolidColorBrush(Colors.Green)));
        }
        else if (e.Column.Field == DateTimeField.Meridiem)
        {
            style.Setters.Add(new Setter(Control.FontSizeProperty, 18));
            style.Setters.Add(new Setter(Control.ForegroundProperty, new SolidColorBrush(Colors.Red)));
        }
        
        // Note: Setting ItemContainerStyle per column may require custom implementation
    }
};
```

### Quarter Hour Intervals

```csharp
// Only show :00, :15, :30, :45
sfTimePicker.TimeFieldPrepared += (sender, e) =>
{
    if (e.Column?.Field == DateTimeField.Minute)
    {
        e.Column.ItemsSource = new ObservableCollection<string> 
        { 
            "00", "15", "30", "45" 
        };
    }
};
```

### Even Hours Only

```csharp
// Show only even hours
sfTimePicker.TimeFieldPrepared += (sender, e) =>
{
    if (e.Column?.Field == DateTimeField.Hour12)
    {
        e.Column.ItemsSource = new ObservableCollection<string> 
        { 
            "02", "04", "06", "08", "10", "12" 
        };
    }
};
```

### Time Slot Picker

```csharp
// Specific time slots only
sfTimePicker.TimeFieldPrepared += (sender, e) =>
{
    if (e.Column?.Field == DateTimeField.Hour12)
    {
        // Class times: 9 AM, 12 PM, 3 PM, 6 PM
        e.Column.ItemsSource = new ObservableCollection<string> 
        { 
            "09", "12", "03", "06" 
        };
    }
    
    if (e.Column?.Field == DateTimeField.Minute)
    {
        e.Column.ItemsSource = new ObservableCollection<string> { "00" };
    }
};
```

## Performance Considerations

### Best Practices

✅ **Do:**
- Keep templates simple and lightweight
- Use built-in controls in templates
- Cache resources and converters
- Limit use of expensive visual effects
- Use static resources for repeated elements

❌ **Don't:**
- Load images for every cell
- Perform heavy calculations in templates
- Use complex data binding expressions
- Create animations for many cells
- Use transparent layers excessively

### Template Optimization

```xml
<!-- Good: Simple and efficient -->
<DataTemplate>
    <TextBlock Text="{Binding DisplayText}" FontSize="16" />
</DataTemplate>

<!-- Avoid: Too complex -->
<DataTemplate>
    <Grid>
        <Grid.Background>
            <ImageBrush ImageSource="background.png" />
        </Grid.Background>
        <Border>
            <Border.Effect>
                <DropShadowEffect />
            </Border.Effect>
            <TextBlock Text="{Binding DisplayText}">
                <TextBlock.RenderTransform>
                    <RotateTransform />
                </TextBlock.RenderTransform>
            </TextBlock>
        </Border>
    </Grid>
</DataTemplate>
```

### ItemsSource Performance

```csharp
// Good: Create once, reuse
private ObservableCollection<string> minuteIntervals;

public void Initialize()
{
    minuteIntervals = GetMinutesWithInterval(15, "{minute.integer}");
    
    sfTimePicker.TimeFieldPrepared += (s, e) =>
    {
        if (e.Column?.Field == DateTimeField.Minute)
        {
            e.Column.ItemsSource = minuteIntervals; // Reuse
        }
    };
}

// Avoid: Create every time
sfTimePicker.TimeFieldPrepared += (s, e) =>
{
    if (e.Column?.Field == DateTimeField.Minute)
    {
        e.Column.ItemsSource = GetMinutesWithInterval(15, e.Column.Format); // Recreated
    }
};
```

## Troubleshooting

### Issue: Custom Template Not Showing

**Problem:** ItemTemplate doesn't apply

**Solutions:**
1. **Verify DataTemplate structure:**
   ```xml
   <editors:SfTimePicker.ItemTemplate>
       <DataTemplate>
           <TextBlock Text="{Binding DisplayText}" />
       </DataTemplate>
   </editors:SfTimePicker.ItemTemplate>
   ```

2. **Check binding path:**
   ```xml
   <!-- Correct -->
   <TextBlock Text="{Binding DisplayText}" />
   
   <!-- Incorrect -->
   <TextBlock Text="{Binding Text}" />
   ```

3. **Set cell size:**
   ```xml
   <editors:SfTimePicker ItemWidth="100" ItemHeight="50">
       <editors:SfTimePicker.ItemTemplate>
           <!-- Template -->
       </editors:SfTimePicker.ItemTemplate>
   </editors:SfTimePicker>
   ```

### Issue: ItemTemplateSelector Not Working

**Problem:** Conditional templates don't apply

**Solutions:**
1. **Check field type:**
   ```csharp
   if (dateTimeField.Field == DateTimeField.Hour12) // Correct field
   ```

2. **Verify template resources:**
   ```xml
   <local:TimeItemTemplateSelector
       DefaultTemplate="{StaticResource defaultTemplate}"
       AlarmTemplate="{StaticResource alarmTemplate}" />
   ```

3. **Return default template:**
   ```csharp
   protected override DataTemplate SelectTemplateCore(...)
   {
       // Always return a template
       return DefaultTemplate ?? base.SelectTemplateCore(item, container);
   }
   ```

### Issue: TimeFieldPrepared Not Firing

**Problem:** Event handler not called

**Solutions:**
1. **Subscribe to event:**
   ```csharp
   sfTimePicker.TimeFieldPrepared += Handler;
   ```

2. **Check event signature:**
   ```csharp
   private void SfTimePicker_TimeFieldPrepared(
       object sender, 
       DateTimeFieldPreparedEventArgs e) // Correct signature
   ```

3. **Verify dropdown opened:**
   ```csharp
   // Event fires when dropdown opens
   sfTimePicker.IsOpen = true;
   ```

### Issue: Custom Intervals Not Displaying

**Problem:** ItemsSource for column not working

**Solutions:**
1. **Use ObservableCollection:**
   ```csharp
   e.Column.ItemsSource = new ObservableCollection<string>(); // Not List<>
   ```

2. **Check field type:**
   ```csharp
   if (e.Column?.Field == DateTimeField.Minute) // Check for null
   ```

3. **Verify format parameter:**
   ```csharp
   GetMinutesWithInterval(5, e.Column.Format); // Use column format
   ```

### Issue: Cell Size Not Applied

**Problem:** ItemWidth/ItemHeight ignored

**Solutions:**
1. **Check min/max constraints:**
   ```csharp
   timePicker.MinItemWidth = 0;
   timePicker.MaxItemWidth = double.PositiveInfinity;
   timePicker.ItemWidth = 100;
   ```

2. **Set before opening dropdown:**
   ```csharp
   timePicker.ItemWidth = 100;
   timePicker.ItemHeight = 50;
   // Then open dropdown
   ```

3. **Check parent size:**
   ```xml
   <Grid Width="400"> <!-- Ensure enough space -->
       <editors:SfTimePicker ItemWidth="100" />
   </Grid>
   ```

## See Also

- [Time Restrictions](time-restrictions.md) - Custom intervals with TimeFieldPrepared
- [Dropdown Customization](dropdown-customization.md) - Dropdown container
- [Dropdown Header Customization](dropdown-header-customization.md) - Header and column headers
- [Getting Started](getting-started.md) - Basic TimePicker setup

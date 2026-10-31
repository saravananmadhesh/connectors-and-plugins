# Spinner Customization in WinUI DatePicker

Complete guide for customizing the dropdown date spinner cells, appearance, and column behavior in the Syncfusion WinUI DatePicker control.

## Table of Contents
- [Cell Size Customization](#cell-size-customization)
- [Cell Styling](#cell-styling)
- [Cell Templates](#cell-templates)
- [Conditional Cell Appearance](#conditional-cell-appearance)
- [Column Customization](#column-customization)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)

## Cell Size Customization

### ItemWidth and ItemHeight

Set the dimensions of spinner cells:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    ItemWidth="100"
    ItemHeight="50" />
```

```csharp
datePicker.ItemWidth = 100;
datePicker.ItemHeight = 50;
```

**Default values:**
- `ItemWidth`: `80`
- `ItemHeight`: `40`

### Width Constraints

Restrict cell width with minimum and maximum values:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    MinItemWidth="70"
    MaxItemWidth="120"
    ItemWidth="100" />
```

```csharp
datePicker.MinItemWidth = 70;
datePicker.MaxItemWidth = 120;
datePicker.ItemWidth = 100;
```

**Default values:**
- `MinItemWidth`: `0`
- `MaxItemWidth`: `Infinity`

**Constraint behavior:** `ItemWidth` must be within `MinItemWidth` and `MaxItemWidth`. If not, the closest valid value is used.

### Size Examples

**Compact Cells:**
```xml
<editors:SfDatePicker 
    ItemWidth="60"
    ItemHeight="30" />
```

**Large Touch-Friendly Cells:**
```xml
<editors:SfDatePicker 
    ItemWidth="100"
    ItemHeight="60" />
```

**Variable Width with Constraints:**
```xml
<editors:SfDatePicker 
    MinItemWidth="80"
    MaxItemWidth="150"
    ItemWidth="120"
    ItemHeight="45" />
```

## Cell Styling

### ItemContainerStyle Property

Apply custom styling to all spinner cells:

```xml
<editors:SfDatePicker x:Name="datePicker">
    <editors:SfDatePicker.ItemContainerStyle>
        <Style TargetType="editors:SpinnerItem">
            <Setter Property="Foreground" Value="Red" />
            <Setter Property="FontStyle" Value="Italic" />
            <Setter Property="FontSize" Value="16" />
            <Setter Property="FontWeight" Value="SemiBold" />
        </Style>
    </editors:SfDatePicker.ItemContainerStyle>
</editors:SfDatePicker>
```

**DataContext:** The `DataContext` of `ItemContainerStyle` is [`SpinnerItem`](https://help.syncfusion.com/cr/winui/Syncfusion.UI.Xaml.Editors.SpinnerItem.html).

### Styling Examples

**Bold Blue Text:**
```xml
<editors:SfDatePicker.ItemContainerStyle>
    <Style TargetType="editors:SpinnerItem">
        <Setter Property="Foreground" Value="Blue" />
        <Setter Property="FontWeight" Value="Bold" />
    </Style>
</editors:SfDatePicker.ItemContainerStyle>
```

**Custom Background:**
```xml
<editors:SfDatePicker.ItemContainerStyle>
    <Style TargetType="editors:SpinnerItem">
        <Setter Property="Background" Value="LightBlue" />
        <Setter Property="Foreground" Value="DarkBlue" />
        <Setter Property="CornerRadius" Value="4" />
        <Setter Property="Margin" Value="2" />
    </Style>
</editors:SfDatePicker.ItemContainerStyle>
```

**Hover Effects:**
```xml
<editors:SfDatePicker.ItemContainerStyle>
    <Style TargetType="editors:SpinnerItem">
        <Setter Property="FontSize" Value="14" />
        <Style.Triggers>
            <Trigger Property="IsPointerOver" Value="True">
                <Setter Property="Background" Value="LightYellow" />
            </Trigger>
        </Style.Triggers>
    </Style>
</editors:SfDatePicker.ItemContainerStyle>
```

## Cell Templates

### ItemTemplate Property

Customize the content and layout of spinner cells:

```xml
<editors:SfDatePicker x:Name="datePicker">
    <editors:SfDatePicker.ItemTemplate>
        <DataTemplate>
            <Border 
                BorderBrush="Gray"
                BorderThickness="1"
                CornerRadius="4"
                Padding="4">
                <TextBlock 
                    Text="{Binding DisplayText}"
                    FontSize="14"
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center" />
            </Border>
        </DataTemplate>
    </editors:SfDatePicker.ItemTemplate>
</editors:SfDatePicker>
```

**DataContext:** The `DataContext` of `ItemTemplate` is `SpinnerItem`.

### Template with Icons

```xml
<editors:SfDatePicker.ItemTemplate>
    <DataTemplate>
        <StackPanel Orientation="Horizontal" HorizontalAlignment="Center">
            <FontIcon 
                FontFamily="Segoe MDL2 Assets"
                Glyph="&#xE163;"
                FontSize="12"
                Margin="0,0,4,0" />
            <TextBlock 
                Text="{Binding DisplayText}"
                VerticalAlignment="Center" />
        </StackPanel>
    </DataTemplate>
</editors:SfDatePicker.ItemTemplate>
```

### Styled Template

```xml
<editors:SfDatePicker.ItemTemplate>
    <DataTemplate>
        <Grid>
            <Rectangle 
                Fill="{ThemeResource SystemAccentColorLight3}"
                Opacity="0.1"
                RadiusX="4"
                RadiusY="4" />
            <TextBlock 
                Text="{Binding DisplayText}"
                FontWeight="SemiBold"
                HorizontalAlignment="Center"
                VerticalAlignment="Center"
                Foreground="{ThemeResource SystemAccentColor}" />
        </Grid>
    </DataTemplate>
</editors:SfDatePicker.ItemTemplate>
```

## Conditional Cell Appearance

### ItemTemplateSelector Property

Apply different templates based on cell data:

**C# TemplateSelector:**
```csharp
public class DateItemTemplateSelector : DataTemplateSelector
{
    public DataTemplate DefaultTemplate { get; set; }
    public DataTemplate BirthdayTemplate { get; set; }
    public DataTemplate GiftTemplate { get; set; }
    public DataTemplate AwardTemplate { get; set; }

    protected override DataTemplate SelectTemplateCore(object item, 
        DependencyObject container)
    {
        DateTimeFieldItemInfo dateTimeField = item as DateTimeFieldItemInfo;
        
        if (dateTimeField.Field == DateTimeField.Day)
        {
            switch (dateTimeField.DateTime.Value.Day)
            {
                case 2:
                    return BirthdayTemplate;
                case 7:
                    return GiftTemplate;
                case 12:
                    return AwardTemplate;
                case 17:
                    return BirthdayTemplate;
                case 20:
                    return GiftTemplate;
                case 26:
                    return AwardTemplate;
            }
        }
        
        return base.SelectTemplateCore(item, container);
    }
}
```

**XAML Resources:**
```xml
<Grid>
    <Grid.Resources>
        <x:String x:Key="birthday">M24.188005,24.530994C24.999008...</x:String>
        <x:String x:Key="gift">M14.072999,21.71989L14.173005...</x:String>
        <x:String x:Key="award">M6.4050484,19.617198L3.7509956...</x:String>
        
        <DataTemplate x:Key="defaultTemplate">
            <TextBlock Text="{Binding DisplayText}" />
        </DataTemplate>
        
        <DataTemplate x:Key="birthdayTemplate">
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
                    VerticalAlignment="Bottom"
                    Data="{StaticResource birthday}"
                    Fill="{ThemeResource SystemBaseHighColor}"
                    Stretch="Uniform" />
            </Grid>
        </DataTemplate>
        
        <DataTemplate x:Key="giftTemplate">
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
                    VerticalAlignment="Bottom"
                    Data="{StaticResource gift}"
                    Fill="{ThemeResource SystemBaseHighColor}"
                    Stretch="Uniform" />
            </Grid>
        </DataTemplate>
        
        <DataTemplate x:Key="awardTemplate">
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
                    VerticalAlignment="Bottom"
                    Data="{StaticResource award}"
                    Fill="{ThemeResource SystemBaseHighColor}"
                    Stretch="Uniform" />
            </Grid>
        </DataTemplate>

        <local:DateItemTemplateSelector
            x:Key="selector"
            AwardTemplate="{StaticResource awardTemplate}"
            BirthdayTemplate="{StaticResource birthdayTemplate}"
            DefaultTemplate="{StaticResource defaultTemplate}"
            GiftTemplate="{StaticResource giftTemplate}" />
    </Grid.Resources>
    
    <editors:SfDatePicker 
        Name="datePicker"
        ItemTemplateSelector="{StaticResource selector}"
        Width="150"
        Height="30" />
</Grid>
```

### Highlighting Specific Dates

```csharp
public class HighlightDateSelector : DataTemplateSelector
{
    public DataTemplate NormalTemplate { get; set; }
    public DataTemplate HighlightTemplate { get; set; }
    
    private HashSet<int> highlightDays = new HashSet<int> { 5, 10, 15, 20, 25 };

    protected override DataTemplate SelectTemplateCore(object item, 
        DependencyObject container)
    {
        DateTimeFieldItemInfo dateInfo = item as DateTimeFieldItemInfo;
        
        if (dateInfo?.Field == DateTimeField.Day && 
            dateInfo.DateTime.HasValue)
        {
            if (highlightDays.Contains(dateInfo.DateTime.Value.Day))
            {
                return HighlightTemplate;
            }
        }
        
        return NormalTemplate ?? base.SelectTemplateCore(item, container);
    }
}
```

## Column Customization

### DateFieldPrepared Event

Customize individual spinner columns (day, month, year):

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    DateFieldPrepared="DatePicker_DateFieldPrepared" />
```

```csharp
private void DatePicker_DateFieldPrepared(object sender, 
    DateTimeFieldPreparedEventArgs e)
{
    if (e.Column != null)
    {
        if (e.Column.Field == DateTimeField.Day)
        {
            e.Column.Format = "ddd dd";  // e.g., "Mon 22"
            e.Column.ShowHeader = true;
            e.Column.Header = "Day";
            e.Column.ItemHeight = 60;
            e.Column.ItemWidth = 100;
            e.Column.ShouldLoop = true;  // Enable looping
        }
        else if (e.Column.Field == DateTimeField.MonthName)
        {
            e.Column.ShowHeader = true;
            e.Column.Header = "Month";
            e.Column.ItemHeight = 40;
            e.Column.ItemWidth = 75;
            e.Column.ShouldLoop = true;
        }
        else if (e.Column.Field == DateTimeField.Year)
        {
            e.Column.Format = "yy";  // Two-digit year
            e.Column.ShowHeader = true;
            e.Column.Header = "Year";
            e.Column.ItemHeight = 80;
            e.Column.ItemWidth = 75;
            e.Column.ShouldLoop = true;
        }
    }
}
```

### Column Properties

| Property | Type | Description |
|----------|------|-------------|
| `Field` | `DateTimeField` | Column type (Day, Month, Year) |
| `Format` | `string` | Display format for values |
| `Header` | `object` | Header text for column |
| `ShowHeader` | `bool` | Show/hide column header |
| `ItemWidth` | `double` | Width of cells in column |
| `ItemHeight` | `double` | Height of cells in column |
| `ShouldLoop` | `bool` | Enable infinite scrolling |

### Format Options per Field

**Day Field:**
- `"d"`: Day number (1, 2, 3)
- `"dd"`: Zero-padded day (01, 02, 03)
- `"ddd dd"`: Day name + number (Mon 22)

**Month Field:**
- `"M"`: Month number (1, 2, 3)
- `"MM"`: Zero-padded month (01, 02, 03)
- `"MMM"`: Abbreviated name (Jan, Feb)
- `"MMMM"`: Full name (January, February)

**Year Field:**
- `"yy"`: Two-digit year (26)
- `"yyyy"`: Four-digit year (2026)

### Column Looping

Enable infinite scrolling with `ShouldLoop`:

```csharp
private void DatePicker_DateFieldPrepared(object sender, 
    DateTimeFieldPreparedEventArgs e)
{
    if (e.Column != null)
    {
        // Enable looping for all columns
        e.Column.ShouldLoop = true;
    }
}
```

**Behavior:**
- `ShouldLoop = true`: Continuous scrolling (1→31→1...)
- `ShouldLoop = false`: Stops at boundaries

## Advanced Patterns

### Pattern 1: Uniform Styling
```xml
<editors:SfDatePicker 
    ItemWidth="90"
    ItemHeight="50">
    <editors:SfDatePicker.ItemContainerStyle>
        <Style TargetType="editors:SpinnerItem">
            <Setter Property="FontSize" Value="16" />
            <Setter Property="FontWeight" Value="SemiBold" />
            <Setter Property="Foreground" Value="DarkBlue" />
        </Style>
    </editors:SfDatePicker.ItemContainerStyle>
</editors:SfDatePicker>
```

### Pattern 2: Column-Specific Sizing
```csharp
private void DatePicker_DateFieldPrepared(object sender, 
    DateTimeFieldPreparedEventArgs e)
{
    if (e.Column != null)
    {
        switch (e.Column.Field)
        {
            case DateTimeField.Day:
                e.Column.ItemWidth = 60;
                e.Column.ItemHeight = 40;
                break;
            case DateTimeField.MonthName:
                e.Column.ItemWidth = 100;
                e.Column.ItemHeight = 40;
                e.Column.Format = "{month.full}";
                break;
            case DateTimeField.Year:
                e.Column.ItemWidth = 80;
                e.Column.ItemHeight = 40;
                break;
        }
    }
}
```

### Pattern 3: Highlighted Weekends
```csharp
public class WeekendTemplateSelector : DataTemplateSelector
{
    public DataTemplate WeekdayTemplate { get; set; }
    public DataTemplate WeekendTemplate { get; set; }

    protected override DataTemplate SelectTemplateCore(object item, 
        DependencyObject container)
    {
        DateTimeFieldItemInfo info = item as DateTimeFieldItemInfo;
        
        if (info?.DateTime.HasValue == true)
        {
            var dayOfWeek = info.DateTime.Value.DayOfWeek;
            if (dayOfWeek == DayOfWeek.Saturday || dayOfWeek == DayOfWeek.Sunday)
            {
                return WeekendTemplate;
            }
        }
        
        return WeekdayTemplate ?? base.SelectTemplateCore(item, container);
    }
}
```

### Pattern 4: Custom Column Headers
```csharp
private void DatePicker_DateFieldPrepared(object sender, 
    DateTimeFieldPreparedEventArgs e)
{
    if (e.Column != null)
    {
        e.Column.ShowHeader = true;
        
        switch (e.Column.Field)
        {
            case DateTimeField.Day:
                e.Column.Header = "📅 Day";
                break;
            case DateTimeField.MonthName:
                e.Column.Header = "📆 Month";
                break;
            case DateTimeField.Year:
                e.Column.Header = "🗓 Year";
                break;
        }
    }
}
```

## Troubleshooting

### Issue: ItemTemplate Not Applied
**Cause:** Missing DataTemplate wrapper  
**Solution:** Ensure proper template structure:
```xml
<editors:SfDatePicker.ItemTemplate>
    <DataTemplate>
        <!-- Content here -->
    </DataTemplate>
</editors:SfDatePicker.ItemTemplate>
```

### Issue: Column Customization Not Working
**Cause:** Event not subscribed  
**Solution:** Verify event subscription:
```xml
<editors:SfDatePicker DateFieldPrepared="DatePicker_DateFieldPrepared" />
```

### Issue: ItemWidth Constraints Ignored
**Cause:** ItemWidth outside Min/Max range  
**Solution:** Ensure valid range:
```csharp
datePicker.MinItemWidth = 50;
datePicker.ItemWidth = 80;  // Must be >= 50
datePicker.MaxItemWidth = 120;  // Must be >= 80
```

### Issue: Template Selector Not Switching
**Cause:** Incorrect DataContext type checking  
**Solution:** Verify type casting:
```csharp
DateTimeFieldItemInfo info = item as DateTimeFieldItemInfo;
if (info != null && info.Field == DateTimeField.Day)
{
    // Your logic
}
```

### Issue: Performance with Complex Templates
**Cause:** Heavy templates in virtualized list  
**Solution:** Simplify templates or use ItemContainerStyle:
```xml
<!-- Better performance -->
<editors:SfDatePicker.ItemContainerStyle>
    <Style TargetType="editors:SpinnerItem">
        <Setter Property="Foreground" Value="Blue" />
    </Style>
</editors:SfDatePicker.ItemContainerStyle>
```

## Next Steps

- **Dropdown Header:** Customize dropdown header area
- **Dropdown Customization:** Configure dropdown button and behavior
- **Date Restriction:** Block specific dates and date ranges

## Related Resources

- [GitHub Examples - Spinner Customization](https://github.com/SyncfusionExamples/syncfusion-winui-tools-datepicker-examples/tree/main/Samples/SpinnerCustomUI)
- [Dropdown Header Guide](dropdown-header-customization.md)
- [Getting Started](getting-started.md)

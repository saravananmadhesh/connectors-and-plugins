# UI Customization in WinUI Calendar

## Table of Contents
- [Overview](#overview)
- [Hide Out-of-Scope Dates](#hide-out-of-scope-dates)
- [Custom Cell Templates](#custom-cell-templates)
- [Theme Key Customization](#theme-key-customization)
- [Special Date Highlighting](#special-date-highlighting)
- [Styling Properties](#styling-properties)
- [Corner Radius](#corner-radius)

## Overview

The WinUI Calendar (SfCalendar) control provides extensive UI customization options:
- Hide leading/trailing dates from adjacent months
- Custom templates for date cells
- Theme-based color customization
- Special date highlighting with icons or colors
- Border and corner radius styling

## Hide Out-of-Scope Dates

Control the visibility of dates that fall outside the current month (leading and trailing dates).

### OutOfScopeVisibility Property

**Values:**
- `Enabled` (default) - Show dates from previous/next months (grayed out)
- `Hidden` - Hide dates from adjacent months completely

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     OutOfScopeVisibility="Hidden" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.OutOfScopeVisibility = OutOfScopeVisibility.Hidden;
```

**Use Cases:**
- Cleaner month view without distractions
- Focus on current month only
- Prevent confusion about which month is displayed
- Print-friendly calendar views

## Custom Cell Templates

Create fully custom cell appearances using `CalendarItem.ContentTemplate`.

### Basic Custom Template

The `DataContext` of the template is the `CalendarItem` which provides:
- `DisplayText` - The text to display (date number, month name, etc.)
- `Date` - The DateTimeOffset value
- `ItemType` - Day, Month, Year, or Decade

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar">
    <calendar:SfCalendar.Resources>
        <Style TargetType="calendar:CalendarItem">
            <Setter Property="ContentTemplate">
                <Setter.Value>
                    <DataTemplate>
                        <Grid MinWidth="40" MinHeight="40">
                            <ContentControl
                                HorizontalAlignment="Center"
                                VerticalAlignment="Center"
                                Content="{Binding DisplayText}" />
                        </Grid>
                    </DataTemplate>
                </Setter.Value>
            </Setter>
        </Style>
    </calendar:SfCalendar.Resources>
</calendar:SfCalendar>
```

## Special Date Highlighting

Highlight specific dates with custom icons, colors, or badges.

### Example: Event Indicators

Create a converter to identify special dates and return visual indicators.

**EventDataConverter.cs:**
```csharp
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Media;
using System.Collections.Generic;
using System.Linq;
using Windows.UI;

public class EventDataConverter : IValueConverter
{
    Dictionary<DateTimeOffset, string> SpecialDates;
    
    public EventDataConverter()
    {
        SpecialDates = new Dictionary<DateTimeOffset, string>();
        
        // Define special dates
        SpecialDates.Add(new DateTimeOffset(new DateTime(2026, 3, 10)), "SingleEvent");
        SpecialDates.Add(new DateTimeOffset(new DateTime(2026, 3, 15)), "MultipleEvents");
        SpecialDates.Add(new DateTimeOffset(new DateTime(2026, 3, 25)), "Holiday");
    }
    
    public object Convert(object value, Type targetType, object parameter, string language)
    {
        DateTime date = (DateTime)value;
        DateTimeOffset searchDate = new DateTimeOffset(date);
        
        if (SpecialDates.ContainsKey(searchDate))
        {
            string eventType = SpecialDates[searchDate];
            
            switch (eventType)
            {
                case "SingleEvent":
                    return new List<Brush>() { new SolidColorBrush(Colors.DeepPink) };
                case "MultipleEvents":
                    return new List<Brush>() {
                        new SolidColorBrush(Colors.Violet),
                        new SolidColorBrush(Colors.Orange)
                    };
                case "Holiday":
                    return new List<Brush>() { new SolidColorBrush(Colors.Red) };
            }
        }
        
        return null;
    }
    
    public object ConvertBack(object value, Type targetType, object parameter, string language)
    {
        return null;
    }
}
```

**XAML with Event Indicators:**
```xml
<Grid>
    <Grid.Resources>
        <local:EventDataConverter x:Key="EventDataConverterKey" />
        
        <DataTemplate x:Key="customTemplate">
            <ItemsControl ItemsSource="{Binding Path=Date, Converter={StaticResource EventDataConverterKey}}">
                <ItemsControl.ItemTemplate>
                    <DataTemplate>
                        <Ellipse MinHeight="4" MinWidth="4" Margin="2" Fill="{Binding}" />
                    </DataTemplate>
                </ItemsControl.ItemTemplate>
                <ItemsControl.ItemsPanel>
                    <ItemsPanelTemplate>
                        <StackPanel Orientation="Horizontal" />
                    </ItemsPanelTemplate>
                </ItemsControl.ItemsPanel>
            </ItemsControl>
        </DataTemplate>
    </Grid.Resources>
    
    <calendar:SfCalendar CornerRadius="14">
        <calendar:SfCalendar.Resources>
            <Style TargetType="calendar:CalendarItem">
                <Setter Property="CornerRadius" Value="14" />
                <Setter Property="HorizontalContentAlignment" Value="Stretch" />
                <Setter Property="VerticalContentAlignment" Value="Stretch" />
                <Setter Property="ContentTemplate">
                    <Setter.Value>
                        <DataTemplate>
                            <Grid MinWidth="40" MinHeight="40">
                                <!-- Date Number -->
                                <ContentControl
                                    HorizontalAlignment="Center"
                                    VerticalAlignment="Center"
                                    Margin="2"
                                    Content="{Binding DisplayText}" />
                                
                                <!-- Event Dots at Bottom -->
                                <ContentControl
                                    Margin="3"
                                    HorizontalAlignment="Center"
                                    VerticalAlignment="Bottom"
                                    Content="{Binding Date}"
                                    ContentTemplate="{StaticResource customTemplate}" />
                            </Grid>
                        </DataTemplate>
                    </Setter.Value>
                </Setter>
            </Style>
        </calendar:SfCalendar.Resources>
    </calendar:SfCalendar>
</Grid>
```

**Result:** Dates with events show colored dots at the bottom of the cell.

## Theme Key Customization

Customize colors and styling using built-in theme keys without creating custom templates.

### Available Theme Keys

| Key | Description |
|-----|-------------|
| `SyncfusionCalendarNavigationButtonForeground` | Navigation button color |
| `SyncfusionCalendarWeekItemForeground` | Day name header color |
| `SyncfusionCalendarTodayItemForeground` | Today's date text color |
| `SyncfusionCalendarItemBackground` | Date cell background |
| `SyncfusionCalendarItemBorderBrush` | Date cell border |
| `SyncfusionCalendarTodayItemBackground` | Today's cell background |
| `SyncfusionCalendarTodayItemBorderBrush` | Today's cell border |
| `SyncfusionCalendarItemOutOfScopeForeground` | Out-of-scope date color |
| `SyncfusionCalendarItemMargin` | Cell margin (Thickness) |
| `SyncfusionSubtitleAltFontSize` | Header font size |
| `SyncfusionBodyFontSize` | Date cell font size |
| `SyncfusionControlThemeFontFamily` | Calendar font family |

### Theme Key Example

**XAML:**
```xml
<calendar:SfCalendar CornerRadius="6">
    <calendar:SfCalendar.Resources>
        <ResourceDictionary>
            <!-- Navigation and week day colors -->
            <SolidColorBrush x:Key="SyncfusionCalendarNavigationButtonForeground"
                             Color="#FF248D92" />
            <SolidColorBrush x:Key="SyncfusionCalendarWeekItemForeground"
                             Color="#FF248D92" />
            
            <!-- Today's date styling -->
            <SolidColorBrush x:Key="SyncfusionCalendarTodayItemForeground"
                             Color="{ThemeResource SystemBaseHighColor}" />
            <SolidColorBrush x:Key="SyncfusionCalendarTodayItemBackground"
                             Color="#FF9BC5ED" />
            <SolidColorBrush x:Key="SyncfusionCalendarTodayItemBorderBrush"
                             Color="#FF9BC5ED" />
            
            <!-- Regular date cell styling -->
            <SolidColorBrush x:Key="SyncfusionCalendarItemBackground"
                             Color="{ThemeResource SystemChromeMediumLowColor}" />
            <SolidColorBrush x:Key="SyncfusionCalendarItemBorderBrush"
                             Color="{ThemeResource SystemChromeMediumLowColor}" />
            
            <!-- Out-of-scope dates -->
            <SolidColorBrush x:Key="SyncfusionCalendarItemOutOfScopeForeground"
                             Color="SlateGray" Opacity="0.5" />
            
            <!-- Sizing and spacing -->
            <Thickness x:Key="SyncfusionCalendarItemMargin">1</Thickness>
            <x:Double x:Key="SyncfusionSubtitleAltFontSize">16</x:Double>
            <x:Double x:Key="SyncfusionBodyFontSize">13</x:Double>
            <FontFamily x:Key="SyncfusionControlThemeFontFamily">Segoe UI</FontFamily>
            
            <!-- Corner radius for cells -->
            <Style TargetType="calendar:CalendarItem">
                <Setter Property="CornerRadius" Value="5" />
                <Setter Property="HorizontalContentAlignment" Value="Stretch" />
                <Setter Property="VerticalContentAlignment" Value="Stretch" />
            </Style>
        </ResourceDictionary>
    </calendar:SfCalendar.Resources>
</calendar:SfCalendar>
```

## Corner Radius

Apply rounded corners to the calendar and individual date cells.

### Calendar Corner Radius

**XAML:**
```xml
<calendar:SfCalendar CornerRadius="10" />
```

**C#:**
```csharp
sfCalendar.CornerRadius = new CornerRadius(10);
```

### Cell Corner Radius

Apply corner radius to individual date cells via style:

**XAML:**
```xml
<calendar:SfCalendar>
    <calendar:SfCalendar.Resources>
        <Style TargetType="calendar:CalendarItem">
            <Setter Property="CornerRadius" Value="14" />
        </Style>
    </calendar:SfCalendar.Resources>
</calendar:SfCalendar>
```

### Different Corner Radius

```xml
<!-- Rounded top only -->
<calendar:SfCalendar CornerRadius="10,10,0,0" />

<!-- Fully rounded corners -->
<calendar:SfCalendar CornerRadius="20" />

<!-- Asymmetric corners -->
<calendar:SfCalendar CornerRadius="5,10,15,20" />
```

## Best Practices

1. **Performance:** Keep custom templates simple to maintain smooth scrolling
2. **Accessibility:** Ensure sufficient color contrast for readability
3. **Touch Targets:** Minimum 40x40 pixels for touch-friendly interfaces
4. **Consistency:** Match your app's overall design language
5. **Theme Support:** Test customizations with Light and Dark themes
6. **Responsive Design:** Consider different screen sizes and orientations

## Troubleshooting

### Issue: Custom Template Not Applying
**Solution:** Ensure the Style `TargetType="calendar:CalendarItem"` is set correctly

### Issue: Theme Keys Not Working
**Solution:** Place theme key resources inside `calendar:SfCalendar.Resources` 

### Issue: Corner Radius Not Visible
**Solution:** Check that parent container isn't clipping the calendar

### Issue: Special Dates Not Highlighting
**Solution:** Verify converter logic and binding paths are correct

## Related Topics

- [Getting Started](getting-started.md) - Basic setup
- [Selection](selection.md) - Selection highlighting
- [Localization](localization-formatting.md) - Format customization

## Code Examples

Download working samples:
- [UI Customization Examples on GitHub](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples/blob/main/Samples/CustomUI)
- [Formatting Examples on GitHub](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples/blob/main/Samples/Formatting)

# UI Customization for Calendar DateRange Picker

This guide covers customization options for the drop-down calendar, including alignment, sizing, custom templates, and theme customization.

## Table of Contents
- [Drop-down Alignment](#drop-down-alignment)
- [Drop-down Sizing](#drop-down-sizing)
- [Custom Calendar Item Templates](#custom-calendar-item-templates)
- [Theme Key Customization](#theme-key-customization)
- [CalendarItem Style Customization](#calendaritem-style-customization)
- [Styling Special Dates](#styling-special-dates)

## Drop-down Alignment

### DropDownPlacement Property

Change the alignment of the drop-down calendar using the `DropDownPlacement` property.

**Available Options:**
- `Bottom` (default) - Below the control
- `Top` - Above the control
- `Left` - To the left of the control
- `Right` - To the right of the control
- `Center` - Centered on the control
- `Full` - Full screen overlay

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    DropDownPlacement="Right" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.DropDownPlacement = FlyoutPlacementMode.Right;
```

### Smart Positioning

The control automatically adjusts drop-down placement when there's insufficient space in the specified direction.

**Example:**
```csharp
// If set to Bottom but no space below, automatically shifts to Top
sfCalendarDateRangePicker.DropDownPlacement = FlyoutPlacementMode.Bottom;
```

### Use Cases by Placement

- **Bottom** - Standard desktop layouts, forms
- **Top** - Controls near bottom of screen
- **Right** - Left-aligned forms, RTL layouts
- **Left** - Right-aligned forms
- **Center** - Modal-style date selection
- **Full** - Mobile or touch-focused interfaces

## Drop-down Sizing

### DropDownHeight Property

Control the height of the drop-down calendar using `DropDownHeight`.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    DropDownHeight="500" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.DropDownHeight = 500;
```

**Default value:** `Auto` - Automatically resizes based on content

### Auto-sizing Behavior

When `DropDownHeight` is set to `Auto`, the drop-down resizes based on:
- Calendar view (month, year, decade, century)
- Preset items panel visibility
- Week numbers visibility
- Submit buttons visibility

### Custom Height Examples

```csharp
// Compact view
sfCalendarDateRangePicker.DropDownHeight = 350;

// Standard view
sfCalendarDateRangePicker.DropDownHeight = 450;

// Expanded view (with presets)
sfCalendarDateRangePicker.DropDownHeight = 500;

// Auto-size
sfCalendarDateRangePicker.DropDownHeight = double.NaN; // Auto
```

## Custom Calendar Item Templates

### Using AttachedFlyout and DropDownFlyout

Customize individual calendar items by using `FlyoutBase.AttachedFlyout` with the `DropDownFlyout` control.

### Step 1: Create Event Data Converter

Create a converter class to define special dates and their styling.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using Windows.UI;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Media;

public class EventDataConverter : IValueConverter
{
    Dictionary<DateTimeOffset, string> SpecialDates;
    
    public EventDataConverter()
    {
        SpecialDates = new Dictionary<DateTimeOffset, string>();
        
        // Define special dates with template types
        SpecialDates.Add(DateTimeOffset.Now.AddDays(1), "SingleEvent_1");
        SpecialDates.Add(DateTimeOffset.Now.AddDays(5), "SingleEvent_2");
        SpecialDates.Add(DateTimeOffset.Now.AddDays(7), "DoubleEvent_1");
        SpecialDates.Add(DateTimeOffset.Now.AddDays(9), "DoubleEvent_2");
        SpecialDates.Add(DateTimeOffset.Now.AddDays(12), "TripleEvent_1");
    }
    
    public object Convert(object value, Type targetType, object parameter, string language)
    {
        DateTimeOffset dateTimeOffset = SpecialDates.Keys.FirstOrDefault(
            x => x.Date == (DateTime)value
        );
        
        if (dateTimeOffset != DateTimeOffset.MinValue)
        {
            string template = SpecialDates[dateTimeOffset];
            
            switch (template)
            {
                case "SingleEvent_1":
                    return new List<Brush>() { 
                        new SolidColorBrush(Colors.DeepPink) 
                    };
                    
                case "SingleEvent_2":
                    return new List<Brush>() { 
                        new SolidColorBrush(Colors.Cyan) 
                    };
                    
                case "DoubleEvent_1":
                    return new List<Brush>() { 
                        new SolidColorBrush(Colors.Violet),
                        new SolidColorBrush(Colors.Orange) 
                    };
                    
                case "DoubleEvent_2":
                    return new List<Brush>() { 
                        new SolidColorBrush(Colors.Gold),
                        new SolidColorBrush(Colors.Green) 
                    };
                    
                case "TripleEvent_1":
                    return new List<Brush>() { 
                        new SolidColorBrush(Colors.Green),
                        new SolidColorBrush(Colors.DeepSkyBlue),
                        new SolidColorBrush(Colors.Orange) 
                    };
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

### Step 2: Create DataTemplate

Define a `DataTemplate` to visualize special dates.

```xaml
<Grid>
    <Grid.Resources>
        <local:EventDataConverter x:Key="EventDataConverterKey" />
        
        <!-- Template for event indicators -->
        <DataTemplate x:Key="customTemplate">
            <ItemsControl ItemsSource="{Binding Path=Date, Converter={StaticResource EventDataConverterKey}}">
                <ItemsControl.ItemTemplate>
                    <DataTemplate>
                        <Ellipse MinHeight="4" 
                                 MinWidth="4" 
                                 Margin="2" 
                                 Fill="{Binding}"/>
                    </DataTemplate>
                </ItemsControl.ItemTemplate>
                <ItemsControl.ItemsPanel>
                    <ItemsPanelTemplate>
                        <StackPanel Orientation="Horizontal"/>
                    </ItemsPanelTemplate>
                </ItemsControl.ItemsPanel>
            </ItemsControl>
        </DataTemplate>
    </Grid.Resources>
    
    <!-- Calendar DateRange Picker with custom template -->
    <calendar:SfCalendarDateRangePicker
        x:Name="calendarDateRangePicker"
        MinWidth="180"
        HorizontalAlignment="Center"
        VerticalAlignment="Center">
        
        <FlyoutBase.AttachedFlyout>
            <editors:DropDownFlyout>
                <calendar:SfCalendar 
                    SelectionMode="Range"
                    SelectedRange="{x:Bind calendarDateRangePicker.SelectedRange, Mode=TwoWay}">
                    
                    <calendar:SfCalendar.Resources>
                        <ResourceDictionary>
                            <!-- Theme customization -->
                            <SolidColorBrush x:Key="SyncfusionCalendarItemOutOfScopeForeground"
                                             Color="SlateGray" Opacity="0.5" />
                            <SolidColorBrush x:Key="SyncfusionCalendarWeekItemForeground"
                                             Color="{ThemeResource SystemBaseMediumLowColor}" />
                            <x:Double x:Key="SyncfusionSubtitleAltFontSize">16</x:Double>
                            <Thickness x:Key="SyncfusionCalendarItemMargin">1</Thickness>
                            <x:Double x:Key="SyncfusionBodyFontSize">13</x:Double>
                            
                            <!-- Custom CalendarItem style -->
                            <Style TargetType="calendar:CalendarItem">
                                <Setter Property="CornerRadius" Value="14"/>
                                <Setter Property="HorizontalContentAlignment" Value="Stretch"/>
                                <Setter Property="VerticalContentAlignment" Value="Stretch"/>
                                <Setter Property="ContentTemplate">
                                    <Setter.Value>
                                        <DataTemplate>
                                            <Grid MinWidth="40" MinHeight="40">
                                                <!-- Date number -->
                                                <ContentControl
                                                    HorizontalAlignment="Center"
                                                    VerticalAlignment="Center"
                                                    Margin="2"
                                                    Content="{Binding DisplayText}"/>
                                                
                                                <!-- Event indicators -->
                                                <ContentControl
                                                    Margin="3"
                                                    HorizontalAlignment="Center"
                                                    VerticalAlignment="Bottom"
                                                    Content="{Binding Date}"
                                                    ContentTemplate="{StaticResource customTemplate}"/>
                                            </Grid>
                                        </DataTemplate>
                                    </Setter.Value>
                                </Setter>
                            </Style>
                        </ResourceDictionary>
                    </calendar:SfCalendar.Resources>
                </calendar:SfCalendar>
            </editors:DropDownFlyout>
        </FlyoutBase.AttachedFlyout>
    </calendar:SfCalendarDateRangePicker>
</Grid>
```

### Required Namespaces

```xaml
xmlns:calendar="using:Syncfusion.UI.Xaml.Calendar"
xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
xmlns:local="using:YourNamespace"
```

## Theme Key Customization

### Available Theme Keys

Customize colors and fonts using resource dictionary theme keys:

| Theme Key | Description |
|-----------|-------------|
| `SyncfusionCalendarNavigationButtonForeground` | Navigation button foreground color |
| `SyncfusionCalendarWeekItemForeground` | Day-of-week names foreground color |
| `SyncfusionCalendarTodayItemForeground` | Today's date foreground color |
| `SyncfusionCalendarItemBackground` | Date cell background color |
| `SyncfusionCalendarItemBorderBrush` | Date cell border color |
| `SyncfusionCalendarTodayItemBackground` | Today's date background color |
| `SyncfusionCalendarTodayItemBorderBrush` | Today's date border color |
| `SyncfusionCalendarItemOutOfScopeForeground` | Out-of-scope dates foreground color |
| `SyncfusionCalendarItemMargin` | Margin for calendar items |
| `SyncfusionSubtitleAltFontSize` | Font size for header region |
| `SyncfusionBodyFontSize` | Font size for calendar items |
| `SyncfusionControlThemeFontFamily` | Font family for the calendar |

### Complete Theme Customization Example

```xaml
<calendar:SfCalendarDateRangePicker
    x:Name="calendarDateRangePicker"
    MinWidth="180"
    HorizontalAlignment="Center"
    VerticalAlignment="Top">
    
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <calendar:SfCalendar 
                SelectionMode="Range" 
                SelectedRange="{x:Bind calendarDateRangePicker.SelectedRange, Mode=TwoWay}">
                
                <calendar:SfCalendar.Resources>
                    <ResourceDictionary>
                        <!-- Navigation and headers -->
                        <SolidColorBrush x:Key="SyncfusionCalendarNavigationButtonForeground"
                                         Color="#FF248D92" />
                        
                        <!-- Week day names -->
                        <SolidColorBrush x:Key="SyncfusionCalendarWeekItemForeground"
                                         Color="#FF248D92" />
                        
                        <!-- Today's date -->
                        <SolidColorBrush x:Key="SyncfusionCalendarTodayItemForeground"
                                         Color="{ThemeResource SystemBaseHighColor}" />
                        <SolidColorBrush x:Key="SyncfusionCalendarTodayItemBackground"
                                         Color="#FF9BC5ED" />
                        <SolidColorBrush x:Key="SyncfusionCalendarTodayItemBorderBrush"
                                         Color="#FF9BC5ED" />
                        
                        <!-- Regular date cells -->
                        <SolidColorBrush x:Key="SyncfusionCalendarItemBackground"
                                         Color="{ThemeResource SystemListLowColor}" />
                        <SolidColorBrush x:Key="SyncfusionCalendarItemBorderBrush"
                                         Color="{ThemeResource SystemListLowColor}"/>
                        
                        <!-- Out of scope dates -->
                        <SolidColorBrush x:Key="SyncfusionCalendarItemOutOfScopeForeground"
                                         Color="SlateGray" Opacity="0.5" />
                        
                        <!-- Spacing and sizing -->
                        <Thickness x:Key="SyncfusionCalendarItemMargin">1</Thickness>
                        <x:Double x:Key="SyncfusionBodyFontSize">13</x:Double>
                        <x:Double x:Key="SyncfusionSubtitleAltFontSize">16</x:Double>
                        <FontFamily x:Key="SyncfusionControlThemeFontFamily">SimSun</FontFamily>
                        
                        <!-- CalendarItem style -->
                        <Style TargetType="calendar:CalendarItem">
                            <Setter Property="CornerRadius" Value="5"/>
                            <Setter Property="HorizontalContentAlignment" Value="Stretch"/>
                            <Setter Property="VerticalContentAlignment" Value="Stretch"/>
                            <Setter Property="ContentTemplate">
                                <Setter.Value>
                                    <DataTemplate>
                                        <Grid MinWidth="40" MinHeight="40">
                                            <ContentControl
                                                HorizontalAlignment="Center"
                                                VerticalAlignment="Center"
                                                Margin="3"
                                                Content="{Binding DisplayText}"/>
                                        </Grid>
                                    </DataTemplate>
                                </Setter.Value>
                            </Setter>
                        </Style>
                    </ResourceDictionary>
                </calendar:SfCalendar.Resources>
            </calendar:SfCalendar>
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</calendar:SfCalendarDateRangePicker>
```

## CalendarItem Style Customization

### Basic Style Modification

```xaml
<Style TargetType="calendar:CalendarItem">
    <!-- Rounded corners -->
    <Setter Property="CornerRadius" Value="10"/>
    
    <!-- Alignment -->
    <Setter Property="HorizontalContentAlignment" Value="Center"/>
    <Setter Property="VerticalContentAlignment" Value="Center"/>
    
    <!-- Padding and margin -->
    <Setter Property="Padding" Value="5"/>
    <Setter Property="Margin" Value="2"/>
    
    <!-- Size constraints -->
    <Setter Property="MinWidth" Value="40"/>
    <Setter Property="MinHeight" Value="40"/>
</Style>
```

### Advanced Content Template

```xaml
<Style TargetType="calendar:CalendarItem">
    <Setter Property="ContentTemplate">
        <Setter.Value>
            <DataTemplate>
                <Grid>
                    <!-- Background with gradient -->
                    <Grid.Background>
                        <LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
                            <GradientStop Color="Transparent" Offset="0"/>
                            <GradientStop Color="#10000000" Offset="1"/>
                        </LinearGradientBrush>
                    </Grid.Background>
                    
                    <!-- Date number -->
                    <TextBlock 
                        Text="{Binding DisplayText}"
                        FontSize="14"
                        FontWeight="SemiBold"
                        HorizontalAlignment="Center"
                        VerticalAlignment="Center"/>
                </Grid>
            </DataTemplate>
        </Setter.Value>
    </Setter>
</Style>
```

## Styling Special Dates

### Highlighting Holidays

```csharp
// In code-behind or ViewModel
public Dictionary<DateTime, string> Holidays = new Dictionary<DateTime, string>
{
    { new DateTime(2026, 1, 1), "New Year" },
    { new DateTime(2026, 7, 4), "Independence Day" },
    { new DateTime(2026, 12, 25), "Christmas" }
};
```

```xaml
<DataTemplate x:Key="holidayTemplate">
    <Grid>
        <!-- Red background for holidays -->
        <Border Background="#20FF0000" CornerRadius="5">
            <StackPanel>
                <TextBlock 
                    Text="{Binding DisplayText}"
                    FontWeight="Bold"
                    Foreground="Red"
                    HorizontalAlignment="Center"/>
                <TextBlock 
                    Text="🎉"
                    FontSize="10"
                    HorizontalAlignment="Center"/>
            </StackPanel>
        </Border>
    </Grid>
</DataTemplate>
```

### Weekend Styling

```xaml
<Style TargetType="calendar:CalendarItem">
    <Setter Property="ContentTemplate">
        <Setter.Value>
            <DataTemplate>
                <Grid>
                    <!-- Different color for weekends using converter -->
                    <Border 
                        Background="{Binding Date, Converter={StaticResource WeekendConverter}}"
                        CornerRadius="5"
                        Padding="5">
                        <TextBlock 
                            Text="{Binding DisplayText}"
                            HorizontalAlignment="Center"
                            VerticalAlignment="Center"/>
                    </Border>
                </Grid>
            </DataTemplate>
        </Setter.Value>
    </Setter>
</Style>
```

## Common Customization Patterns

### Pattern 1: Compact Calendar

```csharp
sfCalendarDateRangePicker.DropDownHeight = 320;
```

```xaml
<calendar:SfCalendar.Resources>
    <x:Double x:Key="SyncfusionBodyFontSize">11</x:Double>
    <x:Double x:Key="SyncfusionSubtitleAltFontSize">14</x:Double>
    <Thickness x:Key="SyncfusionCalendarItemMargin">0.5</Thickness>
</calendar:SfCalendar.Resources>
```

### Pattern 2: Large Touch-Friendly Calendar

```csharp
sfCalendarDateRangePicker.DropDownHeight = 550;
```

```xaml
<Style TargetType="calendar:CalendarItem">
    <Setter Property="MinWidth" Value="50"/>
    <Setter Property="MinHeight" Value="50"/>
    <Setter Property="ContentTemplate">
        <Setter.Value>
            <DataTemplate>
                <Grid>
                    <TextBlock 
                        Text="{Binding DisplayText}"
                        FontSize="18"
                        HorizontalAlignment="Center"
                        VerticalAlignment="Center"/>
                </Grid>
            </DataTemplate>
        </Setter.Value>
    </Setter>
</Style>
```

### Pattern 3: Dark Theme

```xaml
<SolidColorBrush x:Key="SyncfusionCalendarNavigationButtonForeground" Color="White" />
<SolidColorBrush x:Key="SyncfusionCalendarWeekItemForeground" Color="LightGray" />
<SolidColorBrush x:Key="SyncfusionCalendarItemBackground" Color="#202020" />
<SolidColorBrush x:Key="SyncfusionCalendarTodayItemBackground" Color="#404040" />
```

## Best Practices

1. **Maintain readability** - Ensure sufficient contrast between text and background
2. **Keep cell sizes consistent** - Use MinWidth and MinHeight for uniform appearance
3. **Test touch targets** - Ensure cells are at least 40x40 pixels for touch interfaces
4. **Use theme resources** - Leverage system theme colors for automatic light/dark mode support
5. **Optimize converters** - Cache frequently used data in converters for better performance

## Next Steps

- **Localization** - Support different languages and calendar types in [localization-formatting.md](localization-formatting.md)
- **Navigation** - Control view navigation in [navigation.md](navigation.md)
- **Date Restrictions** - Implement date range restrictions in [date-restrictions.md](date-restrictions.md)

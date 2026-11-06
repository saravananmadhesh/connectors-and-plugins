# UI Customization

## Table of Contents
- [Overview](#overview)
- [Clear Button](#clear-button)
- [Drop-Down Alignment](#drop-down-alignment)
- [Drop-Down Size](#drop-down-size)
- [Out-of-Scope Visibility](#out-of-scope-visibility)
- [Custom Item Templates](#custom-item-templates)
- [Theme Customization](#theme-customization)
- [Advanced CalendarItem Styling](#advanced-calendaritem-styling)
- [Complete Examples](#complete-examples)
- [Troubleshooting](#troubleshooting)

## Overview

The `SfCalendarDatePicker` provides extensive UI customization options to match your application's design. You can customize the text editor, drop-down calendar alignment and size, date cell appearance, and apply theme-based styling.

**Customization Areas:**
- Clear button visibility
- Drop-down placement and dimensions
- Leading/trailing date visibility
- Individual date cell templates
- Theme colors and styles
- Custom event markers

## Clear Button

Control the visibility of the clear button in the text editor.

### Show Clear Button (Default)

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowClearButton="True" />
```

```csharp
sfCalendarDatePicker.ShowClearButton = true;
```

### Hide Clear Button

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowClearButton="False" />
```

```csharp
sfCalendarDatePicker.ShowClearButton = false;
```

**Use Case:** Hide the clear button when date selection is required and null values are not allowed.

## Drop-Down Alignment

Control where the drop-down calendar appears relative to the control.

### DropDownPlacement Options

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    DropDownPlacement="Right" />
```

```csharp
sfCalendarDatePicker.DropDownPlacement = FlyoutPlacementMode.Right;
```

**Available Options:**
- `Auto` (default) - Automatically determines placement
- `Top` - Above the control
- `Bottom` - Below the control
- `Left` - To the left
- `Right` - To the right
- `TopEdgeAlignedLeft` - Top edge, left-aligned
- `TopEdgeAlignedRight` - Top edge, right-aligned
- `BottomEdgeAlignedLeft` - Bottom edge, left-aligned
- `BottomEdgeAlignedRight` - Bottom edge, right-aligned
- `LeftEdgeAlignedTop` - Left edge, top-aligned
- `LeftEdgeAlignedBottom` - Left edge, bottom-aligned
- `RightEdgeAlignedTop` - Right edge, top-aligned
- `RightEdgeAlignedBottom` - Right edge, bottom-aligned

### Smart Placement

The control automatically adjusts placement if there's insufficient space:

```csharp
// Request right placement, but will shift if no space
sfCalendarDatePicker.DropDownPlacement = FlyoutPlacementMode.Right;
```

## Drop-Down Size

Customize the dimensions of the drop-down calendar.

### DropDownWidth

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    DropDownWidth="400" />
```

```csharp
sfCalendarDatePicker.DropDownWidth = 400;
```

### DropDownHeight

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    DropDownHeight="500" />
```

```csharp
sfCalendarDatePicker.DropDownHeight = 500;
```

### Both Dimensions

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    DropDownWidth="400"
    DropDownHeight="450" />
```

**Default Value:** `NaN` (auto-sized based on content)

**Use Case:** Increase size for better visibility on large screens or touch devices.

## Out-of-Scope Visibility

Control whether dates outside the current month are visible.

### Show Out-of-Scope Dates (Default)

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    OutOfScopeVisibility="Enabled" />
```

```csharp
sfCalendarDatePicker.OutOfScopeVisibility = OutOfScopeVisibility.Enabled;
```

**Behavior:** Leading and trailing dates from adjacent months are visible but dimmed.

### Hide Out-of-Scope Dates

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    OutOfScopeVisibility="Hidden" />
```

```csharp
sfCalendarDatePicker.OutOfScopeVisibility = OutOfScopeVisibility.Hidden;
```

**Behavior:** Only dates within the current month are displayed.

**Use Case:** Cleaner appearance when you want focus only on the current month.

## Custom Item Templates

Create custom appearances for date cells to highlight events, holidays, or special dates.

### EventDataConverter Pattern

Create a converter to map dates to visual markers:

```csharp
public class EventDataConverter : IValueConverter
{
    Dictionary<DateTimeOffset, string> SpecialDates;
    
    public EventDataConverter()
    {
        SpecialDates = new Dictionary<DateTimeOffset, string>();
        
        // Add special dates
        SpecialDates.Add(DateTimeOffset.Now.AddDays(1), "SingleEvent");
        SpecialDates.Add(DateTimeOffset.Now.AddDays(5), "DoubleEvent");
        SpecialDates.Add(DateTimeOffset.Now.AddDays(7), "TripleEvent");
    }
    
    public object Convert(object value, Type targetType, object parameter, string language)
    {
        DateTimeOffset dateTimeOffset = SpecialDates.Keys.FirstOrDefault(
            x => x.Date == (DateTime)value);
        
        if (dateTimeOffset != DateTimeOffset.MinValue)
        {
            string template = SpecialDates[dateTimeOffset];
            
            switch (template)
            {
                case "SingleEvent":
                    return new List<Brush> { new SolidColorBrush(Colors.DeepPink) };
                case "DoubleEvent":
                    return new List<Brush> 
                    { 
                        new SolidColorBrush(Colors.Violet), 
                        new SolidColorBrush(Colors.Orange) 
                    };
                case "TripleEvent":
                    return new List<Brush> 
                    { 
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

### DataTemplate for Custom Cells

```xml
<Grid>
    <Grid.Resources>
        <local:EventDataConverter x:Key="EventDataConverterKey" />
        
        <DataTemplate x:Key="customTemplate">
            <ItemsControl ItemsSource="{Binding Path=Date, Converter={StaticResource EventDataConverterKey}}">
                <ItemsControl.ItemTemplate>
                    <DataTemplate>
                        <Ellipse MinHeight="4" MinWidth="4" Margin="2" Fill="{Binding}"/>
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
    
    <calendar:SfCalendarDatePicker
        x:Name="calendarDatePicker"
        MinWidth="180"
        HorizontalAlignment="Center"
        VerticalAlignment="Top">
        <FlyoutBase.AttachedFlyout>
            <editors:DropDownFlyout>
                <calendar:SfCalendar SelectedDate="{x:Bind calendarDatePicker.SelectedDate, Mode=TwoWay}">
                    <calendar:SfCalendar.Resources>
                        <ResourceDictionary>
                            <Style TargetType="calendar:CalendarItem">
                                <Setter Property="CornerRadius" Value="14"/>
                                <Setter Property="HorizontalContentAlignment" Value="Stretch"/>
                                <Setter Property="VerticalContentAlignment" Value="Stretch"/>
                                <Setter Property="ContentTemplate">
                                    <Setter.Value>
                                        <DataTemplate>
                                            <Grid MinWidth="40" MinHeight="40">
                                                <ContentControl
                                                    HorizontalAlignment="Center"
                                                    VerticalAlignment="Center"
                                                    Margin="2"
                                                    Content="{Binding DisplayText}"/>
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
    </calendar:SfCalendarDatePicker>
</Grid>
```

## Theme Customization

Customize calendar appearance using theme resource keys.

### Available Theme Keys

| Key | Description |
|-----|-------------|
| `SyncfusionCalendarNavigationButtonForeground` | Navigation button text color |
| `SyncfusionCalendarWeekItemForeground` | Day names (Mon, Tue, etc.) color |
| `SyncfusionCalendarTodayItemForeground` | Today's date text color |
| `SyncfusionCalendarItemBackground` | Date cell background color |
| `SyncfusionCalendarItemBorderBrush` | Date cell border color |
| `SyncfusionCalendarTodayItemBackground` | Today's date background color |
| `SyncfusionCalendarTodayItemBorderBrush` | Today's date border color |
| `SyncfusionCalendarItemOutOfScopeForeground` | Out-of-scope dates text color |
| `SyncfusionCalendarItemMargin` | Margin around date cells |
| `SyncfusionSubtitleAltFontSize` | Header font size |
| `SyncfusionBodyFontSize` | Date cell font size |
| `SyncfusionControlThemeFontFamily` | Calendar font family |

### Theme Customization Example

```xml
<calendar:SfCalendarDatePicker
    x:Name="calendarDatePicker"
    MinWidth="180"
    HorizontalAlignment="Center"
    VerticalAlignment="Top">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <calendar:SfCalendar SelectedDate="{x:Bind calendarDatePicker.SelectedDate, Mode=TwoWay}">
                <calendar:SfCalendar.Resources>
                    <ResourceDictionary>
                        <!-- Navigation and header colors -->
                        <SolidColorBrush x:Key="SyncfusionCalendarNavigationButtonForeground"
                                         Color="#FF248D92" />
                        <SolidColorBrush x:Key="SyncfusionCalendarWeekItemForeground"
                                         Color="#FF248D92" />
                        
                        <!-- Today item styling -->
                        <SolidColorBrush x:Key="SyncfusionCalendarTodayItemForeground"
                                         Color="{ThemeResource SystemBaseHighColor}" />
                        <SolidColorBrush x:Key="SyncfusionCalendarTodayItemBackground"
                                         Color="#FF9BC5ED" />
                        <SolidColorBrush x:Key="SyncfusionCalendarTodayItemBorderBrush"
                                         Color="#FF9BC5ED" />
                        
                        <!-- Regular item styling -->
                        <SolidColorBrush x:Key="SyncfusionCalendarItemBackground"
                                         Color="{ThemeResource SystemListLowColor}" />
                        <SolidColorBrush x:Key="SyncfusionCalendarItemBorderBrush"
                                         Color="{ThemeResource SystemListLowColor}"/>
                        
                        <!-- Out-of-scope dates -->
                        <SolidColorBrush x:Key="SyncfusionCalendarItemOutOfScopeForeground"
                                         Color="SlateGray" Opacity="0.5" />
                        
                        <!-- Spacing and typography -->
                        <Thickness x:Key="SyncfusionCalendarItemMargin">1</Thickness>
                        <x:Double x:Key="SyncfusionBodyFontSize">13</x:Double>
                        <x:Double x:Key="SyncfusionSubtitleAltFontSize">16</x:Double>
                        <FontFamily x:Key="SyncfusionControlThemeFontFamily">Segoe UI</FontFamily>
                    </ResourceDictionary>
                </calendar:SfCalendar.Resources>
            </calendar:SfCalendar>
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</calendar:SfCalendarDatePicker>
```

## Advanced CalendarItem Styling

Customize individual calendar item appearance.

### Corner Radius

```xml
<Style TargetType="calendar:CalendarItem">
    <Setter Property="CornerRadius" Value="5"/>
</Style>
```

### Content Alignment

```xml
<Style TargetType="calendar:CalendarItem">
    <Setter Property="HorizontalContentAlignment" Value="Stretch"/>
    <Setter Property="VerticalContentAlignment" Value="Stretch"/>
</Style>
```

### Custom Content Template

```xml
<Style TargetType="calendar:CalendarItem">
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
```

## Complete Examples

### Example 1: Compact Calendar with Custom Colors

```xml
<calendar:SfCalendarDatePicker
    x:Name="calendarDatePicker"
    DropDownWidth="280"
    DropDownHeight="320"
    OutOfScopeVisibility="Hidden">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <calendar:SfCalendar SelectedDate="{x:Bind calendarDatePicker.SelectedDate, Mode=TwoWay}">
                <calendar:SfCalendar.Resources>
                    <ResourceDictionary>
                        <SolidColorBrush x:Key="SyncfusionCalendarNavigationButtonForeground" 
                                         Color="#2196F3" />
                        <SolidColorBrush x:Key="SyncfusionCalendarTodayItemBackground" 
                                         Color="#4CAF50" />
                        <x:Double x:Key="SyncfusionBodyFontSize">12</x:Double>
                    </ResourceDictionary>
                </calendar:SfCalendar.Resources>
            </calendar:SfCalendar>
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</calendar:SfCalendarDatePicker>
```

### Example 2: Large Touch-Friendly Calendar

```xml
<calendar:SfCalendarDatePicker
    x:Name="calendarDatePicker"
    DropDownWidth="450"
    DropDownHeight="550">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <calendar:SfCalendar SelectedDate="{x:Bind calendarDatePicker.SelectedDate, Mode=TwoWay}">
                <calendar:SfCalendar.Resources>
                    <ResourceDictionary>
                        <Thickness x:Key="SyncfusionCalendarItemMargin">3</Thickness>
                        <x:Double x:Key="SyncfusionBodyFontSize">16</x:Double>
                        <x:Double x:Key="SyncfusionSubtitleAltFontSize">18</x:Double>
                        <Style TargetType="calendar:CalendarItem">
                            <Setter Property="CornerRadius" Value="8"/>
                            <Setter Property="ContentTemplate">
                                <Setter.Value>
                                    <DataTemplate>
                                        <Grid MinWidth="50" MinHeight="50">
                                            <ContentControl
                                                HorizontalAlignment="Center"
                                                VerticalAlignment="Center"
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
</calendar:SfCalendarDatePicker>
```

### Example 3: Dark Theme Calendar

```xml
<calendar:SfCalendarDatePicker x:Name="calendarDatePicker">
    <FlyoutBase.AttachedFlyout>
        <editors:DropDownFlyout>
            <calendar:SfCalendar SelectedDate="{x:Bind calendarDatePicker.SelectedDate, Mode=TwoWay}">
                <calendar:SfCalendar.Resources>
                    <ResourceDictionary>
                        <SolidColorBrush x:Key="SyncfusionCalendarNavigationButtonForeground" 
                                         Color="#FFFFFF" />
                        <SolidColorBrush x:Key="SyncfusionCalendarWeekItemForeground" 
                                         Color="#CCCCCC" />
                        <SolidColorBrush x:Key="SyncfusionCalendarTodayItemBackground" 
                                         Color="#2196F3" />
                        <SolidColorBrush x:Key="SyncfusionCalendarTodayItemForeground" 
                                         Color="#FFFFFF" />
                        <SolidColorBrush x:Key="SyncfusionCalendarItemBackground" 
                                         Color="#1E1E1E" />
                        <SolidColorBrush x:Key="SyncfusionCalendarItemOutOfScopeForeground" 
                                         Color="#666666" />
                    </ResourceDictionary>
                </calendar:SfCalendar.Resources>
            </calendar:SfCalendar>
        </editors:DropDownFlyout>
    </FlyoutBase.AttachedFlyout>
</calendar:SfCalendarDatePicker>
```

## Troubleshooting

### Issue: Custom theme not applying

**Solution:** Ensure resources are defined within the Calendar's ResourceDictionary inside the AttachedFlyout:

```xml
<FlyoutBase.AttachedFlyout>
    <editors:DropDownFlyout>
        <calendar:SfCalendar>
            <calendar:SfCalendar.Resources>
                <!-- Theme keys here -->
            </calendar:SfCalendar.Resources>
        </calendar:SfCalendar>
    </editors:DropDownFlyout>
</FlyoutBase.AttachedFlyout>
```

### Issue: Drop-down size not changing

**Solution:** Check that DropDownWidth/Height are set on the SfCalendarDatePicker, not the inner SfCalendar:

```xml
<calendar:SfCalendarDatePicker 
    DropDownWidth="400"
    DropDownHeight="450" />
```

### Issue: Custom template not displaying

**Solution:** Verify DataTemplate is bound to correct properties and CalendarItem style is applied:

```xml
<Style TargetType="calendar:CalendarItem">
    <Setter Property="ContentTemplate">
        <Setter.Value>
            <DataTemplate>
                <!-- Template content -->
            </DataTemplate>
        </Setter.Value>
    </Setter>
</Style>
```

### Issue: Out-of-scope dates still visible

**Solution:** Set OutOfScopeVisibility on the SfCalendarDatePicker control:

```csharp
sfCalendarDatePicker.OutOfScopeVisibility = OutOfScopeVisibility.Hidden;
```

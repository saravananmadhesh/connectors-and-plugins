# Header Customization

This reference provides comprehensive guidance on customizing the scheduler header, including view header and date header settings.

## Overview

The WinUI Scheduler header consists of:
- **View Header** - Displays day/date information at the top
- **Date Header** - Shows dates in timeline and day-based views

Headers can be customized in appearance, height, format, and template.

## View Header Settings

### View Header Height

Control the height of the view header:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.ViewHeaderSettings>
        <scheduler:ViewHeaderSettings Height="60" />
    </scheduler:SfScheduler.ViewHeaderSettings>
</scheduler:SfScheduler>
```

```csharp
Schedule.ViewHeaderSettings.Height = 60; // Default is 50
```

**Values:**
- `50` - Default height
- `0` - Hide view header
- `60-100` - Larger header for more content
- Adjust based on content complexity

### Date Format

Customize the date display format in the header:

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.ViewHeaderSettings>
        <scheduler:ViewHeaderSettings DateFormat="ddd MM/dd" />
    </scheduler:SfScheduler.ViewHeaderSettings>
</scheduler:SfScheduler>
```

```csharp
// Week View - Show day and date
Schedule.ViewHeaderSettings.DateFormat = "ddd MM/dd";
// Output: "Mon 06/15"

// Day View - Show full date
Schedule.ViewHeaderSettings.DateFormat = "dddd, MMMM dd, yyyy";
// Output: "Monday, June 15, 2026"

// Month View - Show month and year
Schedule.ViewHeaderSettings.DateFormat = "MMMM yyyy";
// Output: "June 2026"

// Timeline View - Compact format
Schedule.ViewHeaderSettings.DateFormat = "MM/dd";
// Output: "06/15"
```

**Common Format Strings:**
- `"ddd MM/dd"` - Abbreviated day and date (e.g., "Mon 06/15")
- `"dddd, MMM dd"` - Full day name and abbreviated month (e.g., "Monday, Jun 15")
- `"MM/dd/yyyy"` - Numeric date (e.g., "06/15/2026")
- `"MMMM dd"` - Month name and day (e.g., "June 15")

### Day Format

Customize the day-of-week display:

```csharp
// Full day names
Schedule.ViewHeaderSettings.DayFormat = "dddd";
// Output: "Monday", "Tuesday", etc.

// Abbreviated day names (default)
Schedule.ViewHeaderSettings.DayFormat = "ddd";
// Output: "Mon", "Tue", etc.

// Single letter
Schedule.ViewHeaderSettings.DayFormat = "ddd";
// Then substring in template: "M", "T", etc.
```

### Hide View Header

```csharp
Schedule.ViewHeaderSettings.Height = 0;
```

**Use When:**
- Minimalist design needed
- Space is very limited
- Custom header is provided separately

## View Header Template

### Custom Header Template

```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week">
    <scheduler:SfScheduler.ViewHeaderSettings>
        <scheduler:ViewHeaderSettings>
            <scheduler:ViewHeaderSettings.ViewHeaderTemplate>
                <DataTemplate>
                    <Grid Background="LightSteelBlue">
                        <StackPanel Margin="5">
                            <TextBlock Text="{Binding DateText}" 
                                      FontWeight="Bold"
                                      FontSize="14"
                                      HorizontalAlignment="Center"/>
                            <TextBlock Text="{Binding DayText}" 
                                      FontSize="11"
                                      HorizontalAlignment="Center"
                                      Foreground="DarkSlateGray"/>
                        </StackPanel>
                    </Grid>
                </DataTemplate>
            </scheduler:ViewHeaderSettings.ViewHeaderTemplate>
        </scheduler:ViewHeaderSettings>
    </scheduler:SfScheduler.ViewHeaderSettings>
</scheduler:SfScheduler>
```

**DataContext Properties:**
- `DateText` - Formatted date string
- `DayText` - Day of week string
- `Date` - DateTime object

### Advanced Custom Header

```xml
<scheduler:SfScheduler.ViewHeaderSettings>
    <scheduler:ViewHeaderSettings Height="80">
        <scheduler:ViewHeaderSettings.ViewHeaderTemplate>
            <DataTemplate>
                <Border Background="{StaticResource HeaderBackgroundBrush}"
                       BorderBrush="{StaticResource HeaderBorderBrush}"
                       BorderThickness="0,0,1,1">
                    <Grid>
                        <Grid.RowDefinitions>
                            <RowDefinition Height="*"/>
                            <RowDefinition Height="*"/>
                        </Grid.RowDefinitions>
                        
                        <!-- Day of Week -->
                        <TextBlock Grid.Row="0"
                                  Text="{Binding DayText}"
                                  FontSize="16"
                                  FontWeight="SemiBold"
                                  HorizontalAlignment="Center"
                                  VerticalAlignment="Center"
                                  Foreground="{StaticResource HeaderForeground}"/>
                        
                        <!-- Date -->
                        <Ellipse Grid.Row="1"
                                Width="30" Height="30"
                                Fill="{StaticResource AccentBrush}"
                                HorizontalAlignment="Center"
                                VerticalAlignment="Center"/>
                        
                        <TextBlock Grid.Row="1"
                                  Text="{Binding Date, Converter={StaticResource DayNumberConverter}}"
                                  FontSize="14"
                                  FontWeight="Bold"
                                  Foreground="White"
                                  HorizontalAlignment="Center"
                                  VerticalAlignment="Center"/>
                    </Grid>
                </Border>
            </DataTemplate>
        </scheduler:ViewHeaderSettings.ViewHeaderTemplate>
    </scheduler:ViewHeaderSettings>
</scheduler:SfScheduler.ViewHeaderSettings>
```

## Day Header (Month View)

### Day Format in Month View

```csharp
// Show full day names
Schedule.ViewHeaderSettings.DayFormat = "dddd";

// Show abbreviated (default)
Schedule.ViewHeaderSettings.DayFormat = "ddd";
```

### Month View Header Height

```csharp
Schedule.ViewHeaderSettings.Height = 40;
```

## Time Ruler Header

### Time Ruler Text

For Day, Week, and Timeline views, time ruler shows hours:

```csharp
// Customize time format in time ruler
Schedule.DaysViewSettings.TimeRulerFormat = "h tt"; // "2 PM"
Schedule.TimelineViewSettings.TimeRulerFormat = "HH:mm"; // "14:00"
```

See [day-week-views.md](day-week-views.md) and [timeline-views.md](timeline-views.md) for details.

## Common Patterns

### Pattern 1: Minimal Header (Day View)

```csharp
Schedule.ViewType = SchedulerViewType.Day;
Schedule.ViewHeaderSettings.Height = 0; // Hide header
// Display date separately in custom UI
```

### Pattern 2: Large Header with Full Date (Week View)

```csharp
Schedule.ViewType = SchedulerViewType.Week;
Schedule.ViewHeaderSettings.Height = 70;
Schedule.ViewHeaderSettings.DateFormat = "dddd, MMMM dd";
// Output: "Monday, June 15"
```

### Pattern 3: Compact Timeline Header

```csharp
Schedule.ViewType = SchedulerViewType.TimelineWeek;
Schedule.ViewHeaderSettings.Height = 40;
Schedule.ViewHeaderSettings.DateFormat = "ddd dd";
// Output: "Mon 15"
```

### Pattern 4: Custom Header with Indicators

```xml
<scheduler:SfScheduler.ViewHeaderSettings>
    <scheduler:ViewHeaderSettings Height="60">
        <scheduler:ViewHeaderSettings.ViewHeaderTemplate>
            <DataTemplate>
                <Grid>
                    <StackPanel>
                        <TextBlock Text="{Binding DayText}" 
                                  FontWeight="Bold"
                                  HorizontalAlignment="Center"/>
                        <TextBlock Text="{Binding DateText}" 
                                  HorizontalAlignment="Center"/>
                        <!-- Show appointment count indicator -->
                        <Ellipse Width="8" Height="8" 
                                Fill="Red"
                                HorizontalAlignment="Right"
                                Margin="0,2,5,0"
                                Visibility="{Binding HasAppointments, Converter={StaticResource BoolToVisibilityConverter}}"/>
                    </StackPanel>
                </Grid>
            </DataTemplate>
        </scheduler:ViewHeaderSettings.ViewHeaderTemplate>
    </scheduler:ViewHeaderSettings>
</scheduler:SfScheduler.ViewHeaderSettings>
```

### Pattern 5: Today Highlighting

```xml
<scheduler:SfScheduler.ViewHeaderSettings>
    <scheduler:ViewHeaderSettings>
        <scheduler:ViewHeaderSettings.ViewHeaderTemplate>
            <DataTemplate>
                <Grid>
                    <Grid.Background>
                        <SolidColorBrush Color="{Binding IsToday, Converter={StaticResource TodayColorConverter}}"/>
                    </Grid.Background>
                    <StackPanel>
                        <TextBlock Text="{Binding DayText}" 
                                  FontWeight="{Binding IsToday, Converter={StaticResource TodayFontWeightConverter}}"
                                  Foreground="{Binding IsToday, Converter={StaticResource TodayForegroundConverter}}"
                                  HorizontalAlignment="Center"/>
                        <TextBlock Text="{Binding DateText}" 
                                  HorizontalAlignment="Center"/>
                    </StackPanel>
                </Grid>
            </DataTemplate>
        </scheduler:ViewHeaderSettings.ViewHeaderTemplate>
    </scheduler:ViewHeaderSettings>
</scheduler:SfScheduler.ViewHeaderSettings>
```

## Resource Header

For resource grouping, see [resource-grouping.md](resource-grouping.md):

```csharp
Schedule.ResourceHeaderSettings.Size = 150;
```

## Best Practices

### Format Selection
- Use abbreviated day names for compact views
- Use full day names when space permits
- Include month in date format for Week view
- Use consistent formats across views

### Height
- Set height based on content needs
- Larger heights for multi-line content
- Consider mobile screen sizes
- Test with longest day names (Wednesday, etc.)

### Customization
- Use templates for complex layouts
- Maintain consistent styling with app theme
- Highlight current date/day
- Ensure readability (sufficient contrast)

### Responsiveness
- Adjust header height for different screen sizes
- Use adaptive formats (abbreviated on small screens)
- Test with different culture settings

## Troubleshooting

### Header Text Cut Off

**Problem:** Day or date text is truncated.

**Solutions:**
- Increase `ViewHeaderSettings.Height`
- Use shorter date format
- Reduce font size in template
- Check container width constraints

### Date Format Not Applied

**Problem:** Custom date format doesn't show.

**Solutions:**
- Verify `DateFormat` property is set
- Check format string syntax
- Ensure culture settings support format
- Test with simple format first (e.g., "MM/dd")

### Custom Template Not Showing

**Problem:** Custom ViewHeaderTemplate doesn't display.

**Solutions:**
- Verify DataTemplate syntax
- Check binding paths (DateText, DayText, Date)
- Ensure template has proper root element
- Test with simple template first

### Header Too Tall/Short

**Problem:** Header height is incorrect.

**Solutions:**
- Set explicit `Height` value
- Check if parent container constrains height
- Verify row definition in custom template
- Test without custom template

### Wrong Day Names

**Problem:** Day names in wrong language.

**Solutions:**
- Check application culture settings
- Verify `CultureInfo.CurrentCulture`
- Use `CultureInfo.CurrentUICulture` for UI strings
- Test with explicit culture setting

### Today Not Highlighted

**Problem:** Current day doesn't stand out.

**Solutions:**
- Implement custom template with IsToday binding
- Use value converters for conditional styling
- Set different background/foreground for today
- Add visual indicators (border, color, icon)

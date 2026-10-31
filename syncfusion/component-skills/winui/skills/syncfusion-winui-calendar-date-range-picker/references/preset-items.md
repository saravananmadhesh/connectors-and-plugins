# Preset Items for Calendar DateRange Picker

This guide covers how to add predefined date ranges (presets) to the drop-down calendar, allowing users to quickly select common date ranges like "This Week", "This Month", or "Last Month".

## Table of Contents
- [Showing Preset Items](#showing-preset-items)
- [Creating Preset Collection](#creating-preset-collection)
- [Preset Template](#preset-template)
- [Handling Preset Selection](#handling-preset-selection)
- [Hiding Calendar on Preset Selection](#hiding-calendar-on-preset-selection)
- [Preset Position](#preset-position)

## Showing Preset Items

### Preset and PresetTemplate Properties

Display a collection of preset date ranges using the `Preset` and `PresetTemplate` properties.

- **Preset** - Collection of preset items to display
- **PresetTemplate** - DataTemplate defining how preset items are rendered

## Creating Preset Collection

### ViewModel with Preset Collection

Create a ViewModel with an observable collection of preset labels.

```csharp
using System.Collections.ObjectModel;

public class ViewModel
{
    public ObservableCollection<string> PresetCollection { get; set; }
    
    public ViewModel()
    {
        PresetCollection = new ObservableCollection<string>();
        PresetCollection.Add("This Week");
        PresetCollection.Add("This Month");
        PresetCollection.Add("Last Month");
        PresetCollection.Add("This Year");
        PresetCollection.Add("Custom Range");
    }
}
```

### Binding Preset Collection

**XAML:**
```xaml
<Grid>
    <Grid.DataContext>
        <local:ViewModel x:Name="viewModel" />
    </Grid.DataContext>
    
    <calendar:SfCalendarDateRangePicker 
        x:Name="sfCalendarDateRangePicker"
        Height="35"
        Width="200"
        Preset="{x:Bind viewModel.PresetCollection, Mode=TwoWay}">
        
        <calendar:SfCalendarDateRangePicker.PresetTemplate>
            <DataTemplate>
                <ListBox ItemsSource="{Binding}" 
                         SelectionChanged="ListBox_SelectionChanged" />
            </DataTemplate>
        </calendar:SfCalendarDateRangePicker.PresetTemplate>
    </calendar:SfCalendarDateRangePicker>
</Grid>
```

## Preset Template

### Basic ListBox Template

The simplest preset template uses a `ListBox` to display items.

```xaml
<calendar:SfCalendarDateRangePicker.PresetTemplate>
    <DataTemplate>
        <ListBox ItemsSource="{Binding}" 
                 SelectionChanged="ListBox_SelectionChanged" />
    </DataTemplate>
</calendar:SfCalendarDateRangePicker.PresetTemplate>
```

### Custom Styled Template

Create a more visually appealing preset panel.

```xaml
<calendar:SfCalendarDateRangePicker.PresetTemplate>
    <DataTemplate>
        <ListBox ItemsSource="{Binding}"
                 SelectionChanged="ListBox_SelectionChanged"
                 Background="Transparent"
                 BorderThickness="0">
            <ListBox.ItemTemplate>
                <DataTemplate>
                    <Border Background="{ThemeResource SystemControlBackgroundListLowBrush}"
                            CornerRadius="5"
                            Padding="12,8"
                            Margin="0,2">
                        <TextBlock Text="{Binding}" 
                                   FontSize="14"
                                   Foreground="{ThemeResource SystemControlForegroundBaseHighBrush}"/>
                    </Border>
                </DataTemplate>
            </ListBox.ItemTemplate>
        </ListBox>
    </DataTemplate>
</calendar:SfCalendarDateRangePicker.PresetTemplate>
```

### Icon-Based Template

Add icons to preset items for better visual recognition.

```xaml
<calendar:SfCalendarDateRangePicker.PresetTemplate>
    <DataTemplate>
        <ListBox ItemsSource="{Binding}"
                 SelectionChanged="ListBox_SelectionChanged">
            <ListBox.ItemTemplate>
                <DataTemplate>
                    <StackPanel Orientation="Horizontal" Spacing="10">
                        <FontIcon Glyph="&#xE787;" FontSize="16"/>
                        <TextBlock Text="{Binding}" VerticalAlignment="Center"/>
                    </StackPanel>
                </DataTemplate>
            </ListBox.ItemTemplate>
        </ListBox>
    </DataTemplate>
</calendar:SfCalendarDateRangePicker.PresetTemplate>
```

## Handling Preset Selection

### SelectionChanged Event Handler

Calculate date ranges based on the selected preset.

```csharp
private void ListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    ListBox listBox = sender as ListBox;
    if (listBox.SelectedItem == null) return;
    
    string selectedPreset = listBox.SelectedItem.ToString();
    DateTimeOffset todayDate = DateTimeOffset.Now;
    
    switch (selectedPreset)
    {
        case "This Week":
            CalculateThisWeek(todayDate);
            break;
            
        case "This Month":
            CalculateThisMonth(todayDate);
            break;
            
        case "Last Month":
            CalculateLastMonth(todayDate);
            break;
            
        case "This Year":
            CalculateThisYear(todayDate);
            break;
            
        case "Custom Range":
            // Keep calendar open for custom selection
            sfCalendarDateRangePicker.SelectedRange = null;
            break;
    }
}
```

### Calculate This Week

```csharp
private void CalculateThisWeek(DateTimeOffset todayDate)
{
    // Calculate start of week based on FirstDayOfWeek setting
    int daysToSubtract = (int)todayDate.DayOfWeek - (int)sfCalendarDateRangePicker.FirstDayOfWeek;
    if (daysToSubtract < 0) daysToSubtract += 7;
    
    DateTimeOffset startDate = todayDate.AddDays(-daysToSubtract);
    DateTimeOffset endDate = startDate.AddDays(6);
    
    sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, endDate);
}
```

### Calculate This Month

```csharp
private void CalculateThisMonth(DateTimeOffset todayDate)
{
    // First day of current month
    DateTimeOffset startDate = todayDate.AddDays(-(todayDate.Day - 1));
    
    // Last day of current month
    int daysInMonth = DateTime.DaysInMonth(startDate.Year, startDate.Month);
    DateTimeOffset endDate = startDate.AddDays(daysInMonth - 1);
    
    sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, endDate);
}
```

### Calculate Last Month

```csharp
private void CalculateLastMonth(DateTimeOffset todayDate)
{
    // First day of last month
    DateTimeOffset startDate = todayDate.AddMonths(-1).AddDays(-(todayDate.Day - 1));
    
    // Last day of last month
    int daysInMonth = DateTime.DaysInMonth(startDate.Year, startDate.Month);
    DateTimeOffset endDate = startDate.AddDays(daysInMonth - 1);
    
    sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, endDate);
}
```

### Calculate This Year

```csharp
private void CalculateThisYear(DateTimeOffset todayDate)
{
    // January 1st of current year
    DateTimeOffset startDate = todayDate.AddMonths(-(todayDate.Month - 1)).AddDays(-(todayDate.Day - 1));
    
    // December 31st of current year
    DateTimeOffset endDate = startDate.AddMonths(11);
    int daysInDecember = DateTime.DaysInMonth(endDate.Year, 12);
    endDate = endDate.AddDays(daysInDecember - 1);
    
    sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, endDate);
}
```

### Complete Handler Implementation

```csharp
private void ListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    ListBox listBox = sender as ListBox;
    if (listBox.SelectedItem == null) return;
    
    DateTimeOffset todayDate = DateTimeOffset.Now;
    string selectedPreset = listBox.SelectedItem.ToString();
    
    if (selectedPreset == "This Week")
    {
        int daysToSubtract = (int)todayDate.DayOfWeek - (int)sfCalendarDateRangePicker.FirstDayOfWeek;
        if (daysToSubtract < 0) daysToSubtract += 7;
        
        DateTimeOffset startDate = todayDate.AddDays(-daysToSubtract);
        sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, startDate.AddDays(6));
    }
    else if (selectedPreset == "This Month")
    {
        DateTimeOffset startDate = todayDate.AddDays(-(todayDate.Date.Day - 1));
        int daysToAdd = DateTime.DaysInMonth(startDate.Year, startDate.Month) - 1;
        DateTimeOffset lastDate = startDate.AddDays(daysToAdd);
        sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, lastDate);
    }
    else if (selectedPreset == "Last Month")
    {
        DateTimeOffset startDate = todayDate.AddMonths(-1).AddDays(-(todayDate.Date.Day - 1));
        int daysToAdd = DateTime.DaysInMonth(startDate.Year, startDate.Month) - 1;
        DateTimeOffset lastDate = startDate.AddDays(daysToAdd);
        sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, lastDate);
    }
    else if (selectedPreset == "This Year")
    {
        DateTimeOffset startDate = todayDate.AddMonths(-(todayDate.Month - 1)).AddDays(-(todayDate.Date.Day - 1));
        int daysToAdd = DateTime.DaysInMonth(startDate.Year, startDate.Month) - 1;
        DateTimeOffset lastDateInLastMonth = startDate.AddMonths(11).AddDays(daysToAdd);
        sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, lastDateInLastMonth);
    }
    else if (selectedPreset == "Custom Range")
    {
        sfCalendarDateRangePicker.SelectedRange = null;
    }
}
```

## Hiding Calendar on Preset Selection

### ShowCalendar Property

Control calendar visibility when presets are selected using the `ShowCalendar` property.

```csharp
private void ListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    ListBox listBox = sender as ListBox;
    if (listBox.SelectedItem == null) return;
    
    string selectedPreset = listBox.SelectedItem.ToString();
    DateTimeOffset todayDate = DateTimeOffset.Now;
    
    if (selectedPreset == "Custom Range")
    {
        // Show calendar for custom range selection
        sfCalendarDateRangePicker.SelectedRange = null;
        sfCalendarDateRangePicker.ShowCalendar = true;
    }
    else
    {
        // Hide calendar for preset selections
        sfCalendarDateRangePicker.ShowCalendar = false;
        
        // Calculate and set the range
        if (selectedPreset == "This Week")
        {
            // Calculate this week range
            int daysToSubtract = (int)todayDate.DayOfWeek - (int)sfCalendarDateRangePicker.FirstDayOfWeek;
            if (daysToSubtract < 0) daysToSubtract += 7;
            
            DateTimeOffset startDate = todayDate.AddDays(-daysToSubtract);
            sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, startDate.AddDays(6));
        }
        else if (selectedPreset == "This Month")
        {
            DateTimeOffset startDate = todayDate.AddDays(-(todayDate.Date.Day - 1));
            int daysToAdd = DateTime.DaysInMonth(startDate.Year, startDate.Month) - 1;
            DateTimeOffset lastDate = startDate.AddDays(daysToAdd);
            sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, lastDate);
        }
        // ... other presets
    }
}
```

### Use Cases

**ShowCalendar = false:**
- Quick preset selection without calendar clutter
- Mobile interfaces with limited space
- Predefined periods only (no custom ranges)

**ShowCalendar = true:**
- Allow custom range selection alongside presets
- Visual confirmation of selected range
- Complex scenarios requiring date visibility

## Preset Position

### PresetPosition Property

Control where preset items appear in the drop-down.

**Available Options:**
- `Left` (default) - Preset panel on the left side
- `Right` - Preset panel on the right side
- `Top` - Preset panel above calendar
- `Bottom` - Preset panel below calendar

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    Preset="{x:Bind viewModel.PresetCollection}"
    PresetPosition="Right">
    <!-- PresetTemplate -->
</calendar:SfCalendarDateRangePicker>
```

**C#:**
```csharp
sfCalendarDateRangePicker.PresetPosition = PresetPosition.Right;
```

## Advanced Preset Patterns

### Pattern 1: Business Quarters

```csharp
public class QuarterViewModel
{
    public ObservableCollection<string> PresetCollection { get; set; }
    
    public QuarterViewModel()
    {
        PresetCollection = new ObservableCollection<string>();
        PresetCollection.Add("Q1 2026");
        PresetCollection.Add("Q2 2026");
        PresetCollection.Add("Q3 2026");
        PresetCollection.Add("Q4 2026");
        PresetCollection.Add("Custom");
    }
}
```

```csharp
private void ListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    string selectedPreset = (sender as ListBox).SelectedItem.ToString();
    
    if (selectedPreset.StartsWith("Q"))
    {
        int year = int.Parse(selectedPreset.Substring(3));
        int quarter = int.Parse(selectedPreset.Substring(1, 1));
        
        int startMonth = (quarter - 1) * 3 + 1;
        DateTimeOffset startDate = new DateTimeOffset(new DateTime(year, startMonth, 1));
        DateTimeOffset endDate = startDate.AddMonths(3).AddDays(-1);
        
        sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, endDate);
        sfCalendarDateRangePicker.ShowCalendar = false;
    }
}
```

### Pattern 2: Relative Date Ranges

```csharp
public class RelativeViewModel
{
    public ObservableCollection<string> PresetCollection { get; set; }
    
    public RelativeViewModel()
    {
        PresetCollection = new ObservableCollection<string>();
        PresetCollection.Add("Today");
        PresetCollection.Add("Yesterday");
        PresetCollection.Add("Last 7 Days");
        PresetCollection.Add("Last 30 Days");
        PresetCollection.Add("Last 90 Days");
    }
}
```

```csharp
private void ListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    DateTimeOffset today = DateTimeOffset.Now.Date;
    string selectedPreset = (sender as ListBox).SelectedItem.ToString();
    
    switch (selectedPreset)
    {
        case "Today":
            sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(today, today);
            break;
            
        case "Yesterday":
            DateTimeOffset yesterday = today.AddDays(-1);
            sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(yesterday, yesterday);
            break;
            
        case "Last 7 Days":
            sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(today.AddDays(-6), today);
            break;
            
        case "Last 30 Days":
            sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(today.AddDays(-29), today);
            break;
            
        case "Last 90 Days":
            sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(today.AddDays(-89), today);
            break;
    }
    
    sfCalendarDateRangePicker.ShowCalendar = false;
}
```

### Pattern 3: Named Periods

```csharp
public class NamedPeriodViewModel
{
    public ObservableCollection<string> PresetCollection { get; set; }
    
    public NamedPeriodViewModel()
    {
        PresetCollection = new ObservableCollection<string>();
        PresetCollection.Add("Spring Break");
        PresetCollection.Add("Summer Vacation");
        PresetCollection.Add("Holiday Season");
        PresetCollection.Add("Custom Range");
    }
}
```

## Best Practices

1. **Order logically** - Place most commonly used presets at the top
2. **Include "Custom Range"** - Always provide an option for custom date selection
3. **Hide calendar** - Set `ShowCalendar = false` for preset selections to reduce clutter
4. **Validate ranges** - Ensure calculated ranges respect MinDate/MaxDate restrictions
5. **Clear labels** - Use descriptive, unambiguous preset names
6. **Responsive design** - Consider preset position based on available screen space

## Common Issues and Solutions

### Issue: Preset selection doesn't update SelectedRange

**Problem:** Clicking a preset doesn't change the selected range.

**Solution:** Ensure the SelectionChanged event is properly wired:
```xaml
<ListBox ItemsSource="{Binding}" 
         SelectionChanged="ListBox_SelectionChanged" />
```

### Issue: Calendar remains visible after preset selection

**Problem:** Calendar doesn't hide when preset is selected.

**Solution:** Set `ShowCalendar = false` in the handler:
```csharp
sfCalendarDateRangePicker.ShowCalendar = false;
```

### Issue: Week calculation incorrect

**Problem:** "This Week" preset doesn't align with FirstDayOfWeek.

**Solution:** Account for FirstDayOfWeek setting:
```csharp
int daysToSubtract = (int)todayDate.DayOfWeek - (int)sfCalendarDateRangePicker.FirstDayOfWeek;
if (daysToSubtract < 0) daysToSubtract += 7;
```

## Next Steps

- **Week Numbers** - Display week numbers in the calendar in [week-numbers.md](week-numbers.md)
- **UI Customization** - Style preset items in [ui-customization.md](ui-customization.md)
- **Date Restrictions** - Validate preset ranges against restrictions in [date-restrictions.md](date-restrictions.md)

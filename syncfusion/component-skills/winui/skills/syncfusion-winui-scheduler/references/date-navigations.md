# Date Navigation

This reference provides comprehensive guidance on date navigation in the WinUI Scheduler for moving between dates and time periods.

## Overview

The Scheduler provides multiple ways to navigate between dates, including programmatic navigation, forward/backward buttons, and navigation events.

## Display Date

### Setting Display Date

The `DisplayDate` property controls which date the scheduler displays:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="Week"
                      DisplayDate="2026-06-15" />
```

```csharp
// Set to specific date
Schedule.DisplayDate = new DateTime(2026, 6, 15);

// Set to today
Schedule.DisplayDate = DateTime.Today;

// Set to first day of current month
Schedule.DisplayDate = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);
```

**Behavior by View:**
- **Day View**: Shows the specified date
- **Week View**: Shows the week containing the specified date
- **WorkWeek View**: Shows the work week containing the specified date
- **Month View**: Shows the month containing the specified date
- **Timeline Views**: Shows timeline starting from the specified date

### Get Display Date

```csharp
var currentDate = Schedule.DisplayDate;
Debug.WriteLine($"Currently displaying: {currentDate:MMMM dd, yyyy}");
```

## Forward and Backward Navigation

### Forward Navigation

Move to the next time period:

```csharp
Schedule.Forward();
```

**Behavior by View:**
- **Day View**: Next day
- **Week View**: Next week (7 days)
- **WorkWeek View**: Next work week
- **Month View**: Next month
- **TimelineDay**: Next day
- **TimelineWeek**: Next week
- **TimelineWorkWeek**: Next work week
- **TimelineMonth**: Next month

### Backward Navigation

Move to the previous time period:

```csharp
Schedule.Backward();
```

**Behavior:** Same as `Forward()` but in reverse direction.

### Navigation Buttons

```xml
<StackPanel Orientation="Horizontal">
    <Button Content="Previous" Click="PreviousButton_Click" />
    <Button Content="Today" Click="TodayButton_Click" />
    <Button Content="Next" Click="NextButton_Click" />
</StackPanel>

<scheduler:SfScheduler x:Name="Schedule" ViewType="Week" />
```

```csharp
private void PreviousButton_Click(object sender, RoutedEventArgs e)
{
    Schedule.Backward();
}

private void TodayButton_Click(object sender, RoutedEventArgs e)
{
    Schedule.DisplayDate = DateTime.Today;
}

private void NextButton_Click(object sender, RoutedEventArgs e)
{
    Schedule.Forward();
}
```

## Programmatic Navigation

### Navigate to Specific Date

```csharp
// Jump to specific date
public void NavigateToDate(DateTime date)
{
    Schedule.DisplayDate = date;
}

// Examples:
NavigateToDate(new DateTime(2026, 12, 25)); // Christmas
NavigateToDate(DateTime.Today.AddDays(7));  // One week from now
NavigateToDate(DateTime.Today.AddMonths(1)); // Next month
```

### Navigate Relative to Current Date

```csharp
// Next day
Schedule.DisplayDate = Schedule.DisplayDate.AddDays(1);

// Previous week
Schedule.DisplayDate = Schedule.DisplayDate.AddDays(-7);

// Next month
Schedule.DisplayDate = Schedule.DisplayDate.AddMonths(1);

// Jump to first day of month
var currentMonth = Schedule.DisplayDate;
Schedule.DisplayDate = new DateTime(currentMonth.Year, currentMonth.Month, 1);

// Jump to last day of month
var lastDay = new DateTime(currentMonth.Year, currentMonth.Month, 
                          DateTime.DaysInMonth(currentMonth.Year, currentMonth.Month));
Schedule.DisplayDate = lastDay;
```

## View Changed Event

### Detecting Navigation

The `ViewChanged` event fires when the displayed date range changes:

```csharp
Schedule.ViewChanged += (s, e) =>
{
    // e.OldVisibleDates - Previous date range
    // e.NewVisibleDates - New date range
    // e.OldViewType - Previous view type
    // e.NewViewType - Current view type
    
    var oldRange = $"{e.OldVisibleDates.First():MMM dd} - {e.OldVisibleDates.Last():MMM dd}";
    var newRange = $"{e.NewVisibleDates.First():MMM dd} - {e.NewVisibleDates.Last():MMM dd}";
    
    Debug.WriteLine($"View changed from {oldRange} to {newRange}");
};
```

### Load Appointments on Navigation

```csharp
Schedule.ViewChanged += async (s, e) =>
{
    var startDate = e.NewVisibleDates.First();
    var endDate = e.NewVisibleDates.Last();
    
    // Load appointments for new date range
    var appointments = await LoadAppointmentsAsync(startDate, endDate);
    
    Schedule.ItemsSource = appointments;
};
```

### Update Header on Navigation

```csharp
private TextBlock dateRangeText;

Schedule.ViewChanged += (s, e) =>
{
    var start = e.NewVisibleDates.First();
    var end = e.NewVisibleDates.Last();
    
    if (Schedule.ViewType == SchedulerViewType.Day)
    {
        dateRangeText.Text = start.ToString("MMMM dd, yyyy");
    }
    else if (Schedule.ViewType == SchedulerViewType.Month)
    {
        dateRangeText.Text = start.ToString("MMMM yyyy");
    }
    else
    {
        dateRangeText.Text = $"{start:MMM dd} - {end:MMM dd, yyyy}";
    }
};
```

## Visible Dates

### Get Visible Date Range

```csharp
// Get all visible dates
Schedule.ViewChanged += (s, e) =>
{
    foreach (var date in e.NewVisibleDates)
    {
        Debug.WriteLine($"Visible: {date:MM/dd/yyyy}");
    }
};
```

**Visible Dates by View:**
- **Day**: Single date
- **Week**: 7 dates
- **WorkWeek**: Working days (typically 5)
- **Month**: All dates in month grid (28-42 dates including leading/trailing)
- **Timeline Views**: Dates based on view and interval

### Check if Date is Visible

```csharp
public bool IsDateVisible(DateTime date)
{
    // Trigger ViewChanged to get visible dates
    var visibleDates = GetVisibleDates();
    return visibleDates.Any(d => d.Date == date.Date);
}

private List<DateTime> GetVisibleDates()
{
    // Store visible dates from ViewChanged event
    // Return cached list
    return _cachedVisibleDates;
}
```

## Common Patterns

### Pattern 1: Date Range Display with Navigation

```xml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>
    
    <StackPanel Grid.Row="0" Orientation="Horizontal" HorizontalAlignment="Center">
        <Button Content="◀" Click="PreviousButton_Click" Margin="5"/>
        <TextBlock x:Name="DateRangeText" 
                   VerticalAlignment="Center" 
                   FontSize="18"
                   MinWidth="200"
                   TextAlignment="Center"/>
        <Button Content="▶" Click="NextButton_Click" Margin="5"/>
        <Button Content="Today" Click="TodayButton_Click" Margin="5"/>
    </StackPanel>
    
    <scheduler:SfScheduler x:Name="Schedule" 
                          Grid.Row="1"
                          ViewType="Week"/>
</Grid>
```

```csharp
private void UpdateDateRangeDisplay()
{
    // This would be called from ViewChanged event
    var displayDate = Schedule.DisplayDate;
    
    switch (Schedule.ViewType)
    {
        case SchedulerViewType.Day:
            DateRangeText.Text = displayDate.ToString("dddd, MMMM dd, yyyy");
            break;
            
        case SchedulerViewType.Week:
        case SchedulerViewType.WorkWeek:
            var weekStart = displayDate.AddDays(-(int)displayDate.DayOfWeek);
            var weekEnd = weekStart.AddDays(6);
            DateRangeText.Text = $"{weekStart:MMM dd} - {weekEnd:MMM dd, yyyy}";
            break;
            
        case SchedulerViewType.Month:
            DateRangeText.Text = displayDate.ToString("MMMM yyyy");
            break;
    }
}
```

### Pattern 2: Jump to Date Picker

```xml
<CalendarDatePicker x:Name="DatePicker" 
                   DateChanged="DatePicker_DateChanged"
                   Header="Jump to Date"/>

<scheduler:SfScheduler x:Name="Schedule" ViewType="Week"/>
```

```csharp
private void DatePicker_DateChanged(CalendarDatePicker sender, CalendarDatePickerDateChangedEventArgs args)
{
    if (args.NewDate.HasValue)
    {
        Schedule.DisplayDate = args.NewDate.Value.DateTime;
    }
}
```

### Pattern 3: Month Selector

```xml
<ComboBox x:Name="MonthSelector" 
         SelectionChanged="MonthSelector_SelectionChanged"
         Header="Select Month"/>

<scheduler:SfScheduler x:Name="Schedule" ViewType="Month"/>
```

```csharp
private void InitializeMonthSelector()
{
    var months = new List<MonthItem>();
    var baseDate = DateTime.Today;
    
    // Show 12 months (6 back, current, 5 forward)
    for (int i = -6; i <= 5; i++)
    {
        var month = baseDate.AddMonths(i);
        months.Add(new MonthItem 
        { 
            Date = month,
            Display = month.ToString("MMMM yyyy") 
        });
    }
    
    MonthSelector.ItemsSource = months;
    MonthSelector.SelectedIndex = 6; // Current month
}

private void MonthSelector_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    if (MonthSelector.SelectedItem is MonthItem item)
    {
        Schedule.DisplayDate = item.Date;
    }
}
```

### Pattern 4: Keyboard Navigation

```csharp
private void Schedule_KeyDown(object sender, KeyRoutedEventArgs e)
{
    switch (e.Key)
    {
        case VirtualKey.Left:
            Schedule.Backward();
            e.Handled = true;
            break;
            
        case VirtualKey.Right:
            Schedule.Forward();
            e.Handled = true;
            break;
            
        case VirtualKey.Home:
            Schedule.DisplayDate = DateTime.Today;
            e.Handled = true;
            break;
            
        case VirtualKey.PageUp:
            Schedule.DisplayDate = Schedule.DisplayDate.AddMonths(-1);
            e.Handled = true;
            break;
            
        case VirtualKey.PageDown:
            Schedule.DisplayDate = Schedule.DisplayDate.AddMonths(1);
            e.Handled = true;
            break;
    }
}
```

### Pattern 5: Lazy Load Appointments on Navigation

```csharp
private ScheduleAppointmentCollection _allAppointments;
private DateTime _loadedStart;
private DateTime _loadedEnd;

Schedule.ViewChanged += async (s, e) =>
{
    var newStart = e.NewVisibleDates.First();
    var newEnd = e.NewVisibleDates.Last();
    
    // Check if we need to load more appointments
    if (newStart < _loadedStart || newEnd > _loadedEnd)
    {
        // Load additional appointments
        var appointments = await LoadAppointmentsAsync(newStart, newEnd);
        
        // Merge with existing
        foreach (var apt in appointments)
        {
            if (!_allAppointments.Contains(apt))
            {
                _allAppointments.Add(apt);
            }
        }
        
        _loadedStart = newStart;
        _loadedEnd = newEnd;
    }
};
```

## First Day of Week

### Setting First Day

Controls which day starts the week (affects Week and WorkWeek views):

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="Week"
                      FirstDayOfWeek="Monday" />
```

```csharp
// Start week on Sunday (US default)
Schedule.FirstDayOfWeek = DayOfWeek.Sunday;

// Start week on Monday (Europe, ISO 8601)
Schedule.FirstDayOfWeek = DayOfWeek.Monday;

// Start week on Saturday (Middle East)
Schedule.FirstDayOfWeek = DayOfWeek.Saturday;
```

**Impact:**
- Changes week column order
- Affects Forward/Backward navigation in Week view
- Determines first column in view

## View Type Navigation

### Switch Between Views

```csharp
// Switch to Day view and show specific date
Schedule.ViewType = SchedulerViewType.Day;
Schedule.DisplayDate = selectedDate;

// Switch to Month view
Schedule.ViewType = SchedulerViewType.Month;

// Switch to Week view maintaining current date
var currentDate = Schedule.DisplayDate;
Schedule.ViewType = SchedulerViewType.Week;
Schedule.DisplayDate = currentDate;
```

### View Type Changed Event

```csharp
Schedule.ViewChanged += (s, e) =>
{
    if (e.OldViewType != e.NewViewType)
    {
        Debug.WriteLine($"View changed from {e.OldViewType} to {e.NewViewType}");
        
        // Update UI based on new view
        UpdateNavigationButtons(e.NewViewType);
    }
};
```

## Best Practices

### User Experience
- Always provide Today button for quick navigation
- Show current date range clearly
- Use intuitive icons (◀▶ or ⬅️➡️) for prev/next
- Support keyboard navigation (arrow keys, Home, Page Up/Down)

### Performance
- Load appointments incrementally on navigation
- Cache loaded appointments to avoid redundant fetches
- Use ViewChanged event to trigger data loading
- Consider virtual scrolling for large date ranges

### Date Display
- Format dates based on user's culture
- Show enough context (month and day, not just day)
- Highlight current date
- Indicate selected/focused date

### Navigation Speed
- Forward/Backward should feel responsive
- Avoid loading delays when possible
- Show loading indicator if data fetch takes time
- Cache nearby date ranges

## Troubleshooting

### Forward/Backward Not Working

**Problem:** Navigation buttons don't change the view.

**Solutions:**
- Check if `DisplayDate` property is being overridden
- Verify ViewChanged event isn't preventing navigation
- Ensure scheduler is not disabled
- Check for data binding conflicts

### Display Date Not Updating

**Problem:** Setting `DisplayDate` doesn't change the view.

**Solutions:**
- Ensure ViewType is set before DisplayDate
- Check if date is valid (not DateTime.MinValue)
- Verify no two-way binding conflicts
- Check for exceptions in ViewChanged event

### View Changed Event Not Firing

**Problem:** ViewChanged event doesn't trigger.

**Solutions:**
- Verify event handler is properly attached
- Check if navigation is actually occurring
- Ensure DisplayDate is changing
- Verify ViewType changes trigger the event

### Wrong Week Displayed

**Problem:** Week view shows unexpected week.

**Solutions:**
- Check `FirstDayOfWeek` setting
- Verify `DisplayDate` falls in expected week
- Consider week calculation differences (ISO 8601 vs US)
- Check culture settings

### Visible Dates Incorrect

**Problem:** `NewVisibleDates` doesn't match expected dates.

**Solutions:**
- Check view type (Month includes leading/trailing dates)
- Verify `WorkDays` settings for WorkWeek view
- Consider time zone differences
- Check if `ShowLeadingAndTrailingDates` affects Month view

### Navigation Jumps Unexpectedly

**Problem:** Forward/Backward navigation jumps multiple periods.

**Solutions:**
- Check if event handlers call navigation methods
- Verify no duplicate event subscriptions
- Ensure no auto-refresh logic conflicts
- Check for async operations completing late

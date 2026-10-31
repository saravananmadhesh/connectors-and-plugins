# Date Selection and Restriction

## Table of Contents
- [Overview](#overview)
- [Basic Date Selection](#basic-date-selection)
- [Date Range Restrictions](#date-range-restrictions)
- [Blocking Specific Dates](#blocking-specific-dates)
- [Dynamic Date Blocking](#dynamic-date-blocking)
- [Selection Highlight Modes](#selection-highlight-modes)
- [Selection Shape](#selection-shape)
- [Common Patterns](#common-patterns)
- [Edge Cases and Validation](#edge-cases-and-validation)
- [Troubleshooting](#troubleshooting)

## Overview

The `SfCalendarDatePicker` provides comprehensive date restriction capabilities to control which dates users can select. This includes date range limits, specific date blocking, and dynamic blocking logic.

**Restriction Methods:**
- Min/Max date range
- BlackoutDates collection
- Dynamic blocking with CalendarItemPrepared event
- Custom validation with SelectedDateChanging event

## Basic Date Selection

### SelectedDate Property

Get or set the currently selected date:

```csharp
// Set date
sfCalendarDatePicker.SelectedDate = new DateTimeOffset(new DateTime(2024, 3, 15));

// Get date
DateTimeOffset? selectedDate = sfCalendarDatePicker.SelectedDate;
```

**XAML:**
```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    SelectedDate="2024-03-15" />
```

**Default Behavior:** If not set, `SelectedDate` defaults to the current system date.

## Date Range Restrictions

### MinDate and MaxDate

Restrict date selection to a specific range:

```csharp
// Set minimum date
sfCalendarDatePicker.MinDate = new DateTimeOffset(new DateTime(2024, 1, 1));

// Set maximum date
sfCalendarDatePicker.MaxDate = new DateTimeOffset(new DateTime(2024, 12, 31));
```

**XAML:**
```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDate="2024-01-01"
    MaxDate="2024-12-31" />
```

**Default Values:**
- `MinDate`: 1/1/1920
- `MaxDate`: 12/31/2120

**Important Rules:**
- Dates outside the range are automatically disabled (blackout)
- `MinDate` must not be greater than `MaxDate`
- When `MinDisplayMode="Year"` and `MinDate` is mid-month, the start date begins from the minimum date

### Current Year Only

```csharp
int currentYear = DateTime.Now.Year;
sfCalendarDatePicker.MinDate = new DateTimeOffset(new DateTime(currentYear, 1, 1));
sfCalendarDatePicker.MaxDate = new DateTimeOffset(new DateTime(currentYear, 12, 31));
```

### Future Dates Only

```csharp
sfCalendarDatePicker.MinDate = DateTimeOffset.Now;
sfCalendarDatePicker.MaxDate = DateTimeOffset.Now.AddYears(5);
```

### Past Dates Only

```csharp
sfCalendarDatePicker.MinDate = DateTimeOffset.Now.AddYears(-100);
sfCalendarDatePicker.MaxDate = DateTimeOffset.Now;
```

## Blocking Specific Dates

### BlackoutDates Collection

Block specific dates from selection:

**ViewModel:**
```csharp
public class ViewModel
{
    public DateTimeOffsetCollection BlockedDates { get; set; }
    
    public ViewModel()
    {
        BlockedDates = new DateTimeOffsetCollection();
        
        // Add specific dates
        BlockedDates.Add(new DateTimeOffset(new DateTime(2024, 1, 1)));  // New Year
        BlockedDates.Add(new DateTimeOffset(new DateTime(2024, 7, 4)));  // Independence Day
        BlockedDates.Add(new DateTimeOffset(new DateTime(2024, 12, 25))); // Christmas
    }
}
```

**XAML:**
```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    BlackoutDates="{Binding BlockedDates}">
    <calendar:SfCalendarDatePicker.DataContext>
        <local:ViewModel/>
    </calendar:SfCalendarDatePicker.DataContext>
</calendar:SfCalendarDatePicker>
```

**Code-Behind:**
```csharp
sfCalendarDatePicker.DataContext = new ViewModel();
sfCalendarDatePicker.BlackoutDates = (sfCalendarDatePicker.DataContext as ViewModel).BlockedDates;
```

### Adding Multiple Dates

```csharp
var blockedDates = new DateTimeOffsetCollection();

// Block specific holidays
var holidays = new List<DateTime>
{
    new DateTime(2024, 1, 1),   // New Year's Day
    new DateTime(2024, 7, 4),   // Independence Day
    new DateTime(2024, 11, 28), // Thanksgiving
    new DateTime(2024, 12, 25)  // Christmas
};

foreach (var holiday in holidays)
{
    blockedDates.Add(new DateTimeOffset(holiday));
}

sfCalendarDatePicker.BlackoutDates = blockedDates;
```

## Dynamic Date Blocking

### CalendarItemPrepared Event

Block dates based on custom logic:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    CalendarItemPrepared="SfCalendarDatePicker_CalendarItemPrepared" />
```

### Blocking Weekend Days

```csharp
private void SfCalendarDatePicker_CalendarItemPrepared(
    object sender, 
    CalendarItemPreparedEventArgs e)
{
    // Block Saturdays and Sundays
    if (e.ItemInfo.ItemType == CalendarItemType.Day &&
        (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Saturday ||
         e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday))
    {
        e.ItemInfo.IsBlackout = true;
    }
}
```

### Blocking Specific Day of Week

```csharp
private void SfCalendarDatePicker_CalendarItemPrepared(
    object sender, 
    CalendarItemPreparedEventArgs e)
{
    // Block all Mondays
    if (e.ItemInfo.ItemType == CalendarItemType.Day &&
        e.ItemInfo.Date.DayOfWeek == DayOfWeek.Monday)
    {
        e.ItemInfo.IsBlackout = true;
    }
}
```

### Blocking Date Ranges

```csharp
private void SfCalendarDatePicker_CalendarItemPrepared(
    object sender, 
    CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        // Block dates between Christmas and New Year
        var date = e.ItemInfo.Date.Date;
        var christmas = new DateTime(date.Year, 12, 25);
        var newYear = new DateTime(date.Year + 1, 1, 1);
        
        if (date >= christmas && date < newYear)
        {
            e.ItemInfo.IsBlackout = true;
        }
    }
}
```

### Custom Display Text

Change the text displayed for specific dates:

```csharp
private void SfCalendarDatePicker_CalendarItemPrepared(
    object sender, 
    CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        // Mark weekend days with "X"
        if (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Saturday ||
            e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday)
        {
            e.ItemInfo.IsBlackout = true;
            e.ItemInfo.DisplayText = "X";
        }
        
        // Mark holidays with special text
        if (IsHoliday(e.ItemInfo.Date))
        {
            e.ItemInfo.IsBlackout = true;
            e.ItemInfo.DisplayText = "H";
        }
    }
}

private bool IsHoliday(DateTimeOffset date)
{
    var holidays = new List<DateTime>
    {
        new DateTime(2024, 1, 1),
        new DateTime(2024, 12, 25)
    };
    
    return holidays.Contains(date.Date);
}
```

## Selection Highlight Modes

Control how today and selected dates are highlighted:

### Outline Mode (Default)

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    SelectionHighlightMode="Outline" />
```

```csharp
sfCalendarDatePicker.SelectionHighlightMode = SelectionHighlightMode.Outline;
```

**Appearance:** Shows border outline around selected date.

### Filled Mode

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    SelectionHighlightMode="Filled" />
```

```csharp
sfCalendarDatePicker.SelectionHighlightMode = SelectionHighlightMode.Filled;
```

**Appearance:** Fills background of selected date.

## Selection Shape

Customize the shape of date cell borders:

### Circle Shape (Default)

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    SelectionShape="Circle" />
```

```csharp
sfCalendarDatePicker.SelectionShape = SelectionShape.Circle;
```

### Rectangle Shape

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    SelectionShape="Rectangle" />
```

```csharp
sfCalendarDatePicker.SelectionShape = SelectionShape.Rectangle;
```

### Combined Styling

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    SelectionHighlightMode="Filled"
    SelectionShape="Rectangle" />
```

## Common Patterns

### Pattern 1: Age Verification (18+)

```csharp
// User must be at least 18 years old
DateTime eighteenYearsAgo = DateTime.Now.AddYears(-18);
sfCalendarDatePicker.MaxDate = new DateTimeOffset(eighteenYearsAgo);

// Reasonable minimum (100 years ago)
sfCalendarDatePicker.MinDate = DateTimeOffset.Now.AddYears(-100);
```

### Pattern 2: Booking System (30 Days Advance)

```csharp
// Bookings start tomorrow
sfCalendarDatePicker.MinDate = DateTimeOffset.Now.AddDays(1);

// Book up to 30 days in advance
sfCalendarDatePicker.MaxDate = DateTimeOffset.Now.AddDays(30);

// Block weekends
sfCalendarDatePicker.CalendarItemPrepared += (s, e) =>
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day &&
        (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Saturday ||
         e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday))
    {
        e.ItemInfo.IsBlackout = true;
    }
};
```

### Pattern 3: Business Days Only

```csharp
sfCalendarDatePicker.CalendarItemPrepared += (s, e) =>
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        // Block weekends
        bool isWeekend = e.ItemInfo.Date.DayOfWeek == DayOfWeek.Saturday ||
                        e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday;
        
        // Block company holidays
        bool isHoliday = IsCompanyHoliday(e.ItemInfo.Date);
        
        if (isWeekend || isHoliday)
        {
            e.ItemInfo.IsBlackout = true;
        }
    }
};
```

### Pattern 4: Seasonal Restrictions

```csharp
sfCalendarDatePicker.CalendarItemPrepared += (s, e) =>
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        // Only allow summer months (June-August)
        int month = e.ItemInfo.Date.Month;
        if (month < 6 || month > 8)
        {
            e.ItemInfo.IsBlackout = true;
        }
    }
};
```

### Pattern 5: Validation with SelectedDateChanging

```csharp
sfCalendarDatePicker.SelectedDateChanging += (s, e) =>
{
    if (e.NewDate.HasValue)
    {
        // Prevent selection of blackout dates entered via keyboard
        if (IsBlackoutDate(e.NewDate.Value))
        {
            e.Cancel = true;
            ShowValidationMessage("This date is not available for selection.");
        }
        
        // Custom business rule
        if (!IsValidBusinessDate(e.NewDate.Value))
        {
            e.Cancel = true;
            ShowValidationMessage("Please select a valid business date.");
        }
    }
};
```

## Edge Cases and Validation

### Handling Null Selection

```csharp
sfCalendarDatePicker.SelectedDateChanged += (s, e) =>
{
    if (e.NewDate == null)
    {
        // Handle null selection
        Console.WriteLine("No date selected");
    }
    else
    {
        // Process valid date
        Console.WriteLine($"Date selected: {e.NewDate.Value}");
    }
};
```

### MinDate Greater Than Current MaxDate

```csharp
// Incorrect - will cause issues
sfCalendarDatePicker.MinDate = new DateTimeOffset(new DateTime(2024, 12, 1));
sfCalendarDatePicker.MaxDate = new DateTimeOffset(new DateTime(2024, 1, 1));

// Correct - ensure MinDate < MaxDate
DateTime minDate = new DateTime(2024, 1, 1);
DateTime maxDate = new DateTime(2024, 12, 31);

if (minDate < maxDate)
{
    sfCalendarDatePicker.MinDate = new DateTimeOffset(minDate);
    sfCalendarDatePicker.MaxDate = new DateTimeOffset(maxDate);
}
```

### Selected Date Outside Range

```csharp
// If SelectedDate is set before MinDate/MaxDate, it may be outside range
// Always set range first, then selected date
sfCalendarDatePicker.MinDate = new DateTimeOffset(new DateTime(2024, 1, 1));
sfCalendarDatePicker.MaxDate = new DateTimeOffset(new DateTime(2024, 12, 31));

// Now set selected date within range
DateTime selectedDate = new DateTime(2024, 6, 15);
if (selectedDate >= sfCalendarDatePicker.MinDate.Value.DateTime &&
    selectedDate <= sfCalendarDatePicker.MaxDate.Value.DateTime)
{
    sfCalendarDatePicker.SelectedDate = new DateTimeOffset(selectedDate);
}
```

## Troubleshooting

### Issue: BlackoutDates not blocking dates

**Solution:** Ensure dates are added correctly to the collection:

```csharp
var blockedDates = new DateTimeOffsetCollection();
blockedDates.Add(new DateTimeOffset(new DateTime(2024, 1, 1)));
sfCalendarDatePicker.BlackoutDates = blockedDates;
```

### Issue: Dynamic blocking not working

**Solution:** Verify `CalendarItemPrepared` event is attached and checking correct `ItemType`:

```csharp
sfCalendarDatePicker.CalendarItemPrepared += (s, e) =>
{
    // Must check ItemType
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        e.ItemInfo.IsBlackout = true;
    }
};
```

### Issue: User can type blackout dates

**Solution:** Use `SelectedDateChanging` event to validate keyboard input:

```csharp
sfCalendarDatePicker.SelectedDateChanging += (s, e) =>
{
    if (e.NewDate.HasValue && IsBlackoutDate(e.NewDate.Value))
    {
        e.Cancel = true;
    }
};
```

### Issue: Selection highlight not visible

**Solution:** Check `SelectionHighlightMode` and `SelectionShape` are set:

```csharp
sfCalendarDatePicker.SelectionHighlightMode = SelectionHighlightMode.Filled;
sfCalendarDatePicker.SelectionShape = SelectionShape.Circle;
```

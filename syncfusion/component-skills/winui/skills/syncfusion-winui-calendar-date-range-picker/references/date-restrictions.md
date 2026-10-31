# Date Restrictions for Calendar DateRange Picker

This guide covers how to restrict date range selection using minimum/maximum dates, blackout dates, dynamic restrictions, and range duration limits.

## Table of Contents
- [Minimum and Maximum Dates](#minimum-and-maximum-dates)
- [BlackoutDates Collection](#blackoutdates-collection)
- [Dynamic Date Restrictions](#dynamic-date-restrictions)
- [Range Duration Limits](#range-duration-limits)
- [Combining Restrictions](#combining-restrictions)

## Minimum and Maximum Dates

### MinDate and MaxDate Properties

Restrict selectable dates to a specific range using `MinDate` and `MaxDate` properties.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker x:Name="sfCalendarDateRangePicker" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.MinDate = new DateTimeOffset(new DateTime(2026, 3, 6));
sfCalendarDateRangePicker.MaxDate = new DateTimeOffset(new DateTime(2026, 3, 24));
```

**Default values:**
- `MinDate` = January 1, 1920
- `MaxDate` = December 31, 2120

### Behavior

- Dates **before MinDate** are disabled (grayed out and non-selectable)
- Dates **after MaxDate** are disabled (grayed out and non-selectable)
- Only dates within the MinDate-MaxDate range can be selected

### Common Patterns

#### Pattern 1: Future Dates Only

```csharp
// Allow only future dates
sfCalendarDateRangePicker.MinDate = DateTimeOffset.Now;
sfCalendarDateRangePicker.MaxDate = DateTimeOffset.Now.AddYears(2);
```

**Use case:** Booking systems, appointment scheduling

#### Pattern 2: Past Dates Only

```csharp
// Allow only historical dates
sfCalendarDateRangePicker.MaxDate = DateTimeOffset.Now;
sfCalendarDateRangePicker.MinDate = DateTimeOffset.Now.AddYears(-10);
```

**Use case:** Historical data selection, report generation

#### Pattern 3: Current Month Only

```csharp
// Restrict to current month
var now = DateTimeOffset.Now;
var firstDay = new DateTimeOffset(new DateTime(now.Year, now.Month, 1));
var lastDay = firstDay.AddMonths(1).AddDays(-1);

sfCalendarDateRangePicker.MinDate = firstDay;
sfCalendarDateRangePicker.MaxDate = lastDay;
```

**Use case:** Monthly timesheet entry, current month events

#### Pattern 4: Rolling Window

```csharp
// 90-day window starting today
sfCalendarDateRangePicker.MinDate = DateTimeOffset.Now;
sfCalendarDateRangePicker.MaxDate = DateTimeOffset.Now.AddDays(90);
```

**Use case:** Short-term bookings, limited availability periods

### MinDate/MaxDate Validation

```csharp
// Ensure MinDate <= MaxDate
if (sfCalendarDateRangePicker.MinDate > sfCalendarDateRangePicker.MaxDate)
{
    throw new InvalidOperationException("MinDate cannot be greater than MaxDate");
}
```

### Interaction with MinDisplayMode

When `MinDisplayMode` is set to `Year` and `MinDate` has a day component, the selection starts from the minimum date rather than the first day of the month.

**Example:**
```csharp
sfCalendarDateRangePicker.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendarDateRangePicker.MinDate = new DateTimeOffset(new DateTime(2026, 1, 15));

// User selects January 2026
// SelectedRange.StartDate = January 15, 2026 (not January 1)
```

## BlackoutDates Collection

### Using BlackoutDates

Block specific dates from selection using the `BlackoutDates` collection.

**Create ViewModel:**
```csharp
using System.Collections.ObjectModel;
using Syncfusion.UI.Xaml.Calendar;

public class ViewModel
{
    public DateTimeOffsetCollection BlockedDates { get; set; }
    
    public ViewModel()
    {
        BlockedDates = new DateTimeOffsetCollection();
        
        // Add specific dates to block
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 1, 17)));
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 1, 4)));
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 2, 5)));
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 2, 6)));
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 11)));
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 12)));
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 23)));
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 4, 14)));
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 5, 19)));
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 6, 29)));
    }
}
```

**XAML Binding:**
```xaml
<calendar:SfCalendarDateRangePicker 
    BlackoutDates="{Binding BlockedDates}"
    x:Name="sfCalendarDateRangePicker">
    <calendar:SfCalendarDateRangePicker.DataContext>
        <local:ViewModel />
    </calendar:SfCalendarDateRangePicker.DataContext>
</calendar:SfCalendarDateRangePicker>
```

**C# Code-Behind:**
```csharp
sfCalendarDateRangePicker.DataContext = new ViewModel();
sfCalendarDateRangePicker.BlackoutDates = (sfCalendarDateRangePicker.DataContext as ViewModel).BlockedDates;
```

### BlackoutDates Behavior

- Blackout dates appear **grayed out** in the calendar
- Blackout dates **cannot be selected** as part of a range
- If a range includes blackout dates, they are **skipped** in the selection
- Users can select ranges that span across blackout dates (blackout dates excluded)

### Dynamic BlackoutDates Management

```csharp
// Add dates dynamically
public void BlockHoliday(DateTime holiday)
{
    var viewModel = sfCalendarDateRangePicker.DataContext as ViewModel;
    viewModel.BlockedDates.Add(new DateTimeOffset(holiday));
}

// Remove dates
public void UnblockDate(DateTime date)
{
    var viewModel = sfCalendarDateRangePicker.DataContext as ViewModel;
    var dateToRemove = viewModel.BlockedDates.FirstOrDefault(d => d.Date == date);
    if (dateToRemove != DateTimeOffset.MinValue)
    {
        viewModel.BlockedDates.Remove(dateToRemove);
    }
}

// Clear all blackout dates
public void ClearBlackoutDates()
{
    var viewModel = sfCalendarDateRangePicker.DataContext as ViewModel;
    viewModel.BlockedDates.Clear();
}
```

### Common BlackoutDates Patterns

#### Pattern 1: Company Holidays

```csharp
public class HolidayViewModel
{
    public DateTimeOffsetCollection BlockedDates { get; set; }
    
    public HolidayViewModel()
    {
        BlockedDates = new DateTimeOffsetCollection();
        
        // 2026 US Federal Holidays
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 1, 1)));   // New Year's Day
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 1, 19)));  // MLK Day
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 2, 16)));  // Presidents Day
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 5, 25)));  // Memorial Day
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 7, 4)));   // Independence Day
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 9, 7)));   // Labor Day
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 11, 26))); // Thanksgiving
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 12, 25))); // Christmas
    }
}
```

#### Pattern 2: Blocked Date Ranges

```csharp
// Block a continuous range of dates
public void BlockDateRange(DateTime startDate, DateTime endDate)
{
    var viewModel = sfCalendarDateRangePicker.DataContext as ViewModel;
    
    for (DateTime date = startDate; date <= endDate; date = date.AddDays(1))
    {
        viewModel.BlockedDates.Add(new DateTimeOffset(date));
    }
}

// Example: Block first week of January
BlockDateRange(new DateTime(2026, 1, 1), new DateTime(2026, 1, 7));
```

## Dynamic Date Restrictions

### ItemPrepared Event

Use the `ItemPrepared` event to dynamically block dates based on custom logic.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    ItemPrepared="SfCalendarDateRangePicker_ItemPrepared" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.ItemPrepared += SfCalendarDateRangePicker_ItemPrepared;
```

### Block Weekend Dates

```csharp
private void SfCalendarDateRangePicker_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    // Block all weekend days
    if (e.ItemInfo.ItemType == CalendarItemType.Day &&
        (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Saturday ||
         e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday))
    {
        e.ItemInfo.IsBlackout = true;
    }
}
```

### Block Specific Weekdays

```csharp
private void SfCalendarDateRangePicker_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        // Block Mondays and Fridays
        if (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Monday ||
            e.ItemInfo.Date.DayOfWeek == DayOfWeek.Friday)
        {
            e.ItemInfo.IsBlackout = true;
        }
    }
}
```

### Block Past Dates Dynamically

```csharp
private void SfCalendarDateRangePicker_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        // Block dates before today
        if (e.ItemInfo.Date < DateTime.Now.Date)
        {
            e.ItemInfo.IsBlackout = true;
        }
    }
}
```

### Block Based on Business Rules

```csharp
private void SfCalendarDateRangePicker_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        DateTime date = e.ItemInfo.Date.DateTime;
        
        // Block last day of every month
        if (date.Day == DateTime.DaysInMonth(date.Year, date.Month))
        {
            e.ItemInfo.IsBlackout = true;
        }
        
        // Block 13th of every month (if you're superstitious)
        if (date.Day == 13)
        {
            e.ItemInfo.IsBlackout = true;
        }
    }
}
```

### Custom Display Text for Blocked Dates

Use `ItemInfo.DisplayText` to show custom text for specific dates.

```csharp
private void SfCalendarDateRangePicker_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        // Block weekends and show "X"
        if (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Saturday ||
            e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday)
        {
            e.ItemInfo.IsBlackout = true;
            e.ItemInfo.DisplayText = "X";
        }
    }
}
```

### Block Dates Based on External Data

```csharp
// Assume you have a list of unavailable dates from a database
private List<DateTime> unavailableDates = new List<DateTime>();

private void SfCalendarDateRangePicker_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        DateTime date = e.ItemInfo.Date.DateTime;
        
        if (unavailableDates.Contains(date))
        {
            e.ItemInfo.IsBlackout = true;
            e.ItemInfo.DisplayText = "N/A";
        }
    }
}

// Load unavailable dates
public async Task LoadUnavailableDatesAsync()
{
    unavailableDates = await GetUnavailableDatesFromDatabase();
}
```

## Range Duration Limits

### MinDatesCountInRange and MaxDatesCountInRange

Restrict the number of days that can be selected in a range.

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.MinDatesCountInRange = 5;
sfCalendarDateRangePicker.MaxDatesCountInRange = 10;
```

**Default values:**
- `MinDatesCountInRange` = 0 (no minimum)
- `MaxDatesCountInRange` = null (no maximum)

### Behavior

- Users **cannot select** a range with fewer days than `MinDatesCountInRange`
- Users **cannot select** a range with more days than `MaxDatesCountInRange`
- The calendar prevents completing a selection that violates these constraints

### Common Duration Limit Patterns

#### Pattern 1: Hotel Booking (3-14 nights)

```csharp
sfCalendarDateRangePicker.MinDatesCountInRange = 3;  // Minimum 3-night stay
sfCalendarDateRangePicker.MaxDatesCountInRange = 14; // Maximum 14-night stay
```

#### Pattern 2: Rental Period (7-30 days)

```csharp
sfCalendarDateRangePicker.MinDatesCountInRange = 7;  // Minimum 1 week
sfCalendarDateRangePicker.MaxDatesCountInRange = 30; // Maximum 30 days
```

#### Pattern 3: Short-Term Selection (1-7 days)

```csharp
sfCalendarDateRangePicker.MinDatesCountInRange = 1;  // At least 1 day
sfCalendarDateRangePicker.MaxDatesCountInRange = 7;  // Maximum 1 week
```

#### Pattern 4: No Minimum, Maximum Only

```csharp
sfCalendarDateRangePicker.MinDatesCountInRange = 0;   // No minimum
sfCalendarDateRangePicker.MaxDatesCountInRange = 90;  // Maximum 3 months
```

### Validation with Display Modes

When using `MinDisplayMode` above `Month`, adjust `MinDatesCountInRange` accordingly:

```csharp
// For month-level selection (MinDisplayMode = Year)
sfCalendarDateRangePicker.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendarDateRangePicker.MinDatesCountInRange = 28; // At least 28 days (1 month minimum)
```

**Why 28?** The shortest month has 28 days. Setting `MinDatesCountInRange = 28` ensures at least one month is selected.

### Range Duration Validation Example

```csharp
sfCalendarDateRangePicker.SelectedDateRangeChanged += (sender, e) =>
{
    if (e.RangeStartNewValue.HasValue && e.RangeEndNewValue.HasValue)
    {
        TimeSpan duration = e.RangeEndNewValue.Value - e.RangeStartNewValue.Value;
        int days = duration.Days + 1;
        
        // Additional custom validation
        if (days < 3)
        {
            ShowMessage("Please select at least 3 days.");
        }
        else if (days > 30)
        {
            ShowMessage("Selection cannot exceed 30 days.");
        }
        else
        {
            ShowMessage($"Selected {days} days");
        }
    }
};
```

## Combining Restrictions

### Complex Restriction Scenarios

Combine multiple restriction types for sophisticated date range validation.

#### Example 1: Booking System

```csharp
// Configuration
sfCalendarDateRangePicker.MinDate = DateTimeOffset.Now.AddDays(2); // 2-day advance booking
sfCalendarDateRangePicker.MaxDate = DateTimeOffset.Now.AddMonths(6); // 6 months ahead
sfCalendarDateRangePicker.MinDatesCountInRange = 2; // Minimum 2 nights
sfCalendarDateRangePicker.MaxDatesCountInRange = 14; // Maximum 14 nights

// Block weekends
sfCalendarDateRangePicker.ItemPrepared += (sender, e) =>
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day &&
        (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Saturday ||
         e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday))
    {
        e.ItemInfo.IsBlackout = true;
    }
};

// Block holidays
var holidays = new DateTimeOffsetCollection();
holidays.Add(new DateTimeOffset(new DateTime(2026, 12, 25))); // Christmas
sfCalendarDateRangePicker.BlackoutDates = holidays;
```

#### Example 2: Restricted Date Window with Blackouts

```csharp
// Only current quarter
var now = DateTime.Now;
var quarterStart = new DateTime(now.Year, ((now.Month - 1) / 3) * 3 + 1, 1);
var quarterEnd = quarterStart.AddMonths(3).AddDays(-1);

sfCalendarDateRangePicker.MinDate = new DateTimeOffset(quarterStart);
sfCalendarDateRangePicker.MaxDate = new DateTimeOffset(quarterEnd);

// Maximum 1 week selection
sfCalendarDateRangePicker.MaxDatesCountInRange = 7;

// Block specific maintenance dates
var maintenanceDates = new DateTimeOffsetCollection();
maintenanceDates.Add(new DateTimeOffset(quarterStart.AddDays(15)));
maintenanceDates.Add(new DateTimeOffset(quarterStart.AddDays(16)));
sfCalendarDateRangePicker.BlackoutDates = maintenanceDates;
```

## Best Practices

1. **Validate business rules** - Combine restrictions to enforce complex business logic
2. **Provide feedback** - Use `Description` property to explain restrictions to users
3. **Test edge cases** - Verify behavior at min/max boundaries and with blackout dates
4. **Performance** - For large BlackoutDates collections, consider using ItemPrepared instead
5. **Clear error messages** - Help users understand why certain dates can't be selected
6. **Dynamic updates** - Refresh restrictions when underlying data changes

## Common Issues and Solutions

### Issue: BlackoutDates not visible

**Problem:** Blackout dates don't appear grayed out.

**Solution:** Ensure dates are added correctly to the collection:
```csharp
// Correct: Add with DateTimeOffset
BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 15)));

// Incorrect: Don't add DateTime directly
// BlockedDates.Add(new DateTime(2026, 3, 15)); // Wrong type
```

### Issue: ItemPrepared event not firing

**Problem:** ItemPrepared event doesn't execute.

**Solution:** Ensure event is attached before opening the calendar:
```csharp
sfCalendarDateRangePicker.ItemPrepared += Handler;
// Event must be attached before calendar drop-down opens
```

### Issue: Range duration limits not enforced

**Problem:** Users can select ranges outside the specified duration.

**Solution:** Verify both start and end values:
```csharp
// Check the actual selected range
var duration = (selectedRange.EndDate - selectedRange.StartDate).Days + 1;
Debug.WriteLine($"Duration: {duration} days");
```

## Next Steps

- **Preset Items** - Add predefined date ranges in [preset-items.md](preset-items.md)
- **Week Numbers** - Display week numbers in [week-numbers.md](week-numbers.md)
- **UI Customization** - Customize appearance of blackout dates in [ui-customization.md](ui-customization.md)

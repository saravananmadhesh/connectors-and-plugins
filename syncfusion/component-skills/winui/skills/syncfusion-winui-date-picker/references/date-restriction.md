# Date Restriction in WinUI DatePicker

Complete guide for restricting date selection in the Syncfusion WinUI DatePicker control, including date ranges, blackout dates, and dynamic date blocking.

## Table of Contents
- [Overview](#overview)
- [Date Range Restrictions](#date-range-restrictions)
- [Blackout Dates](#blackout-dates)
- [Dynamic Date Blocking](#dynamic-date-blocking)
- [Immediate Date Selection](#immediate-date-selection)
- [Canceling Date Changes](#canceling-date-changes)
- [Validation Patterns](#validation-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

The DatePicker provides multiple methods to restrict date selection:
1. **MinDate/MaxDate:** Restrict to a date range
2. **BlackoutDates:** Block specific dates
3. **DateFieldItemPrepared:** Dynamically disable dates (e.g., weekends)
4. **SelectedDateChanging:** Validate and cancel invalid selections

## Date Range Restrictions

### Setting Minimum and Maximum Dates

Use `MinDate` and `MaxDate` to restrict selectable date range:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    MinDate="2026-01-01"
    MaxDate="2026-12-31"
    Header="Select date within 2026" />
```

```csharp
datePicker.MinDate = new DateTimeOffset(new DateTime(2026, 1, 1));
datePicker.MaxDate = new DateTimeOffset(new DateTime(2026, 12, 31));
```

**Default values:**
- `MinDate`: January 1, 1921
- `MaxDate`: December 31, 2121

### Common Date Range Patterns

**Future Dates Only:**
```csharp
datePicker.MinDate = DateTimeOffset.Now;
datePicker.MaxDate = new DateTimeOffset(DateTime.Now.AddYears(1));
```

**Past Dates Only (Birth Date):**
```csharp
datePicker.MinDate = new DateTimeOffset(new DateTime(1920, 1, 1));
datePicker.MaxDate = DateTimeOffset.Now;
```

**Current Month Only:**
```csharp
var today = DateTime.Today;
datePicker.MinDate = new DateTimeOffset(new DateTime(today.Year, today.Month, 1));
datePicker.MaxDate = new DateTimeOffset(new DateTime(today.Year, today.Month, 
    DateTime.DaysInMonth(today.Year, today.Month)));
```

**Next 30 Days:**
```csharp
datePicker.MinDate = DateTimeOffset.Now;
datePicker.MaxDate = new DateTimeOffset(DateTime.Now.AddDays(30));
```

**Relative to Another Date:**
```csharp
// End date must be after start date
endDatePicker.MinDate = startDatePicker.SelectedDate ?? DateTimeOffset.Now;
```

## Blackout Dates

### Using BlackoutDates Collection

Block specific dates from selection:

```csharp
// Create ViewModel with blocked dates
public class ViewModel
{
    public DateTimeOffsetCollection BlockedDates { get; set; }
    
    public ViewModel()
    {
        BlockedDates = new DateTimeOffsetCollection();
        
        // Add holidays
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 1, 1)));  // New Year
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 7, 4)));  // Independence Day
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 12, 25))); // Christmas
    }
}
```

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    BlackoutDates="{Binding BlockedDates}">
    <editors:SfDatePicker.DataContext>
        <local:ViewModel />
    </editors:SfDatePicker.DataContext>
</editors:SfDatePicker>
```

**Code-behind:**
```csharp
datePicker.DataContext = new ViewModel();
datePicker.BlackoutDates = (datePicker.DataContext as ViewModel).BlockedDates;
```

### Adding Blackout Dates Dynamically

```csharp
// Initialize collection
datePicker.BlackoutDates = new DateTimeOffsetCollection();

// Add dates from database
var unavailableDates = await GetUnavailableDatesAsync();
foreach (var date in unavailableDates)
{
    datePicker.BlackoutDates.Add(new DateTimeOffset(date));
}

// Add single date
datePicker.BlackoutDates.Add(new DateTimeOffset(DateTime.Today.AddDays(5)));
```

### Removing Blackout Dates

```csharp
// Remove specific date
var dateToRemove = new DateTimeOffset(new DateTime(2026, 12, 25));
datePicker.BlackoutDates.Remove(dateToRemove);

// Clear all blackout dates
datePicker.BlackoutDates.Clear();
```

### Common Blackout Patterns

**Block All Holidays:**
```csharp
public DateTimeOffsetCollection GetUSHolidays(int year)
{
    var holidays = new DateTimeOffsetCollection();
    holidays.Add(new DateTimeOffset(new DateTime(year, 1, 1)));   // New Year
    holidays.Add(new DateTimeOffset(new DateTime(year, 7, 4)));   // Independence
    holidays.Add(new DateTimeOffset(new DateTime(year, 11, 25))); // Thanksgiving (approximate)
    holidays.Add(new DateTimeOffset(new DateTime(year, 12, 25))); // Christmas
    return holidays;
}
```

**Block Date Range:**
```csharp
// Block vacation period
var startDate = new DateTime(2026, 8, 1);
var endDate = new DateTime(2026, 8, 15);

datePicker.BlackoutDates = new DateTimeOffsetCollection();
for (var date = startDate; date <= endDate; date = date.AddDays(1))
{
    datePicker.BlackoutDates.Add(new DateTimeOffset(date));
}
```

## Dynamic Date Blocking

### Using DateFieldItemPrepared Event

Block dates based on custom logic at runtime:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    DateFieldItemPrepared="DatePicker_DateFieldItemPrepared" />
```

```csharp
private void DatePicker_DateFieldItemPrepared(object sender, 
    DateTimeFieldItemPreparedEventArgs e)
{
    if (e.ItemInfo.DateTime.HasValue)
    {
        // Disable based on custom logic
        if (ShouldDisableDate(e.ItemInfo.DateTime.Value))
        {
            e.ItemInfo.IsEnabled = false;
        }
    }
}
```

### Blocking Weekends

```csharp
private void DatePicker_DateFieldItemPrepared(object sender, 
    DateTimeFieldItemPreparedEventArgs e)
{
    if (e.ItemInfo.DateTime.HasValue)
    {
        var dayOfWeek = e.ItemInfo.DateTime.Value.DayOfWeek;
        
        // Disable Saturday and Sunday
        if (dayOfWeek == DayOfWeek.Saturday || dayOfWeek == DayOfWeek.Sunday)
        {
            e.ItemInfo.IsEnabled = false;
        }
    }
}
```

### Blocking Specific Weekdays

```csharp
// Block Mondays and Fridays
private void DatePicker_DateFieldItemPrepared(object sender, 
    DateTimeFieldItemPreparedEventArgs e)
{
    if (e.ItemInfo.DateTime.HasValue)
    {
        var dayOfWeek = e.ItemInfo.DateTime.Value.DayOfWeek;
        
        if (dayOfWeek == DayOfWeek.Monday || dayOfWeek == DayOfWeek.Friday)
        {
            e.ItemInfo.IsEnabled = false;
        }
    }
}
```

### Blocking Based on Business Rules

```csharp
private void DatePicker_DateFieldItemPrepared(object sender, 
    DateTimeFieldItemPreparedEventArgs e)
{
    if (e.ItemInfo.DateTime.HasValue)
    {
        var date = e.ItemInfo.DateTime.Value.DateTime;
        
        // Block if no appointments available
        if (!HasAvailableAppointments(date))
        {
            e.ItemInfo.IsEnabled = false;
        }
        
        // Block if too far in future
        if (date > DateTime.Today.AddMonths(3))
        {
            e.ItemInfo.IsEnabled = false;
        }
        
        // Block dates before today
        if (date < DateTime.Today)
        {
            e.ItemInfo.IsEnabled = false;
        }
    }
}

private bool HasAvailableAppointments(DateTime date)
{
    // Check database or service
    return appointmentService.GetAvailableSlots(date).Any();
}
```

### Combining Multiple Restrictions

```csharp
private void DatePicker_DateFieldItemPrepared(object sender, 
    DateTimeFieldItemPreparedEventArgs e)
{
    if (e.ItemInfo.DateTime.HasValue)
    {
        var date = e.ItemInfo.DateTime.Value;
        var dayOfWeek = date.DayOfWeek;
        
        // Disable if:
        // 1. Weekend
        // 2. Holiday
        // 3. Fully booked
        
        bool isWeekend = dayOfWeek == DayOfWeek.Saturday || 
                        dayOfWeek == DayOfWeek.Sunday;
        bool isHoliday = holidays.Contains(date.Date);
        bool isFullyBooked = GetBookingCount(date.Date) >= maxBookingsPerDay;
        
        if (isWeekend || isHoliday || isFullyBooked)
        {
            e.ItemInfo.IsEnabled = false;
        }
    }
}
```

## Immediate Date Selection

### Hiding Submit Buttons

Remove OK/Cancel buttons for immediate date selection:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    ShowSubmitButtons="False" />
```

```csharp
datePicker.ShowSubmitButtons = false;
```

**Behavior:**
- Date is selected immediately when user scrolls spinner
- No need to click OK button
- Changes apply in real-time
- Better for quick date selection scenarios

**Use cases:**
- Dashboard filters
- Quick date pickers
- Single-click date selection
- Mobile-friendly interfaces

## Canceling Date Changes

### Using SelectedDateChanging Event

Validate and cancel invalid date selections before they're applied:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    SelectedDateChanging="DatePicker_SelectedDateChanging" />
```

```csharp
private void DatePicker_SelectedDateChanging(object sender, 
    Syncfusion.UI.Xaml.Editors.DateChangingEventArgs e)
{
    var oldDate = e.OldDate;
    var newDate = e.NewDate;
    
    // Validate new date
    if (newDate.HasValue)
    {
        // Cancel if date is in the past
        if (newDate.Value.Date < DateTime.Today)
        {
            e.Cancel = true;
            ShowMessage("Cannot select past dates");
            return;
        }
        
        // Cancel if date is a blackout date entered via keyboard
        if (IsBlackoutDate(newDate.Value))
        {
            e.Cancel = true;
            ShowMessage("This date is not available");
            return;
        }
        
        // Cancel if date conflicts with another booking
        if (HasConflict(newDate.Value))
        {
            e.Cancel = true;
            ShowMessage("This date conflicts with existing booking");
            return;
        }
    }
}
```

**Event properties:**
- `OldDate`: Previous selected date
- `NewDate`: Proposed new date
- `Cancel`: Set to `true` to reject the change

**Important:** `SelectedDateChanging` fires **before** `SelectedDateChanged`.

### Validation with User Confirmation

```csharp
private async void DatePicker_SelectedDateChanging(object sender, 
    DateChangingEventArgs e)
{
    if (e.NewDate.HasValue)
    {
        var selectedDate = e.NewDate.Value.DateTime;
        
        // Check if weekend
        if (selectedDate.DayOfWeek == DayOfWeek.Saturday || 
            selectedDate.DayOfWeek == DayOfWeek.Sunday)
        {
            var result = await ShowConfirmationDialog(
                "Weekend Selected",
                "You selected a weekend date. Weekend appointments have limited availability. Continue?");
            
            if (result != ContentDialogResult.Primary)
            {
                e.Cancel = true;
            }
        }
    }
}
```

## Validation Patterns

### Pattern 1: Range Validation
```csharp
private void ValidateDateRange(DateTimeOffset? selectedDate)
{
    if (!selectedDate.HasValue) return;
    
    var date = selectedDate.Value.DateTime;
    var minAllowed = DateTime.Today.AddDays(7);  // 7 days notice required
    var maxAllowed = DateTime.Today.AddMonths(6); // Max 6 months ahead
    
    if (date < minAllowed)
    {
        ShowError($"Minimum {7} days notice required");
        datePicker.SelectedDate = minAllowed;
    }
    else if (date > maxAllowed)
    {
        ShowError($"Cannot book more than 6 months in advance");
        datePicker.SelectedDate = maxAllowed;
    }
}
```

### Pattern 2: Dependency Validation
```csharp
// Ensure end date is after start date
private void StartDatePicker_SelectedDateChanged(object sender, 
    DependencyPropertyChangedEventArgs e)
{
    if (startDatePicker.SelectedDate.HasValue)
    {
        // Update end date minimum
        endDatePicker.MinDate = startDatePicker.SelectedDate.Value.AddDays(1);
        
        // Reset end date if it's now invalid
        if (endDatePicker.SelectedDate.HasValue && 
            endDatePicker.SelectedDate < startDatePicker.SelectedDate)
        {
            endDatePicker.SelectedDate = null;
        }
    }
}
```

### Pattern 3: Real-time Availability Check
```csharp
private async void DatePicker_SelectedDateChanged(object sender, 
    DependencyPropertyChangedEventArgs e)
{
    if (e.NewDateTime.HasValue)
    {
        var date = e.NewDateTime.Value.DateTime;
        
        // Check availability asynchronously
        var available = await CheckAvailabilityAsync(date);
        
        if (!available)
        {
            ShowWarning("Limited availability on this date");
            // Optionally suggest alternative dates
            var alternatives = await GetAlternativeDatesAsync(date);
            ShowAlternatives(alternatives);
        }
    }
}
```

## Troubleshooting

### Issue: Blackout Dates Can Be Entered via Keyboard
**Cause:** BlackoutDates only blocks dropdown selection, not text input  
**Solution:** Use `SelectedDateChanging` event to validate:
```csharp
private void DatePicker_SelectedDateChanging(object sender, DateChangingEventArgs e)
{
    if (e.NewDate.HasValue && datePicker.BlackoutDates.Contains(e.NewDate.Value))
    {
        e.Cancel = true;
        ShowError("This date is not available");
    }
}
```

### Issue: MinDate/MaxDate Not Working
**Cause:** Dates might be set in wrong order or as null  
**Solution:** Verify dates are valid and MinDate < MaxDate:
```csharp
if (minDate < maxDate)
{
    datePicker.MinDate = minDate;
    datePicker.MaxDate = maxDate;
}
```

### Issue: DateFieldItemPrepared Not Disabling Dates
**Cause:** Event not subscribed or condition not met  
**Solution:** Debug the event:
```csharp
private void DatePicker_DateFieldItemPrepared(object sender, 
    DateTimeFieldItemPreparedEventArgs e)
{
    Debug.WriteLine($"Processing date: {e.ItemInfo.DateTime}");
    
    if (e.ItemInfo.DateTime.HasValue)
    {
        // Your disable logic
    }
}
```

### Issue: Performance Issues with Many Blackout Dates
**Cause:** Large BlackoutDates collection  
**Solution:** Use `DateFieldItemPrepared` instead for better performance:
```csharp
// Instead of adding thousands of dates to BlackoutDates,
// use dynamic checking
private void DatePicker_DateFieldItemPrepared(object sender, 
    DateTimeFieldItemPreparedEventArgs e)
{
    if (e.ItemInfo.DateTime.HasValue)
    {
        // Check against database or set
        if (blackoutDatesSet.Contains(e.ItemInfo.DateTime.Value.Date))
        {
            e.ItemInfo.IsEnabled = false;
        }
    }
}
```

## Next Steps

- **Localization and Formatting:** Customize date formats and calendar types
- **Dropdown Customization:** Modify dropdown appearance and behavior
- **Getting Started:** Basic DatePicker setup and configuration

## Related Resources

- [GitHub Examples - Date Restriction](https://github.com/SyncfusionExamples/syncfusion-winui-tools-datepicker-examples/tree/main/Samples/DateRestriction)
- [Getting Started Guide](getting-started.md)
- [Localization Guide](localization-formatting.md)

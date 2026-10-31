# Time Restrictions in WinUI TimePicker

Comprehensive guide for restricting time selection in the Syncfusion WinUI TimePicker control using MinTime, MaxTime, BlackoutTimes, and custom time intervals.

## Table of Contents
- [Overview](#overview)
- [Limiting Available Times with MinTime and MaxTime](#limiting-available-times-with-mintime-and-maxtime)
- [Blocking Specific Times with BlackoutTimes](#blocking-specific-times-with-blackouttimes)
- [Creating Custom Time Intervals](#creating-custom-time-intervals)
- [Hiding Submit Buttons](#hiding-submit-buttons)
- [Canceling Time Changes](#canceling-time-changes)
- [Validation Patterns](#validation-patterns)
- [Common Restriction Scenarios](#common-restriction-scenarios)
- [Edge Cases and Troubleshooting](#edge-cases-and-troubleshooting)

## Overview

Time restrictions allow you to control which times users can select, ensuring data validity and business rule compliance.

**Available Restriction Methods:**
1. **MinTime/MaxTime** - Define a valid time range
2. **BlackoutTimes** - Block specific times from selection
3. **Custom Intervals** - Allow only specific minute/hour increments
4. **SelectedTimeChanging** - Validate and cancel changes programmatically

## Limiting Available Times with MinTime and MaxTime

Restrict time selection to a specific range using `MinTime` and `MaxTime` properties.

### Setting Min and Max Times

**C#:**
```csharp
SfTimePicker sfTimePicker = new SfTimePicker();

// Set minimum time: 9:00 AM
sfTimePicker.MinTime = new DateTimeOffset(
    new DateTime(DateTime.Now.Year, DateTime.Now.Month, 
                 DateTime.Now.Day, 9, 0, 0));

// Set maximum time: 5:00 PM
sfTimePicker.MaxTime = new DateTimeOffset(
    new DateTime(DateTime.Now.Year, DateTime.Now.Month, 
                 DateTime.Now.Day, 17, 0, 0));
```

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    MinTime="2024-03-22T09:00:00"
    MaxTime="2024-03-22T17:00:00" />
```

### Default Values

| Property | Default Value |
|----------|---------------|
| `MinTime` | 1/1/1921 10:37:16 PM |
| `MaxTime` | 12/31/2121 10:37:16 PM |

**Note:** The date portion is ignored; only the time portion matters.

### Business Hours Example

```csharp
// Business hours: 9 AM - 5 PM
SfTimePicker timePicker = new SfTimePicker();

// Create today's date with specific time
DateTime today = DateTime.Today;

timePicker.MinTime = new DateTimeOffset(
    new DateTime(today.Year, today.Month, today.Day, 9, 0, 0));
    
timePicker.MaxTime = new DateTimeOffset(
    new DateTime(today.Year, today.Month, today.Day, 17, 0, 0));
```

### Evening Hours Example

```csharp
// Restaurant dinner service: 5 PM - 10 PM
DateTime today = DateTime.Today;

sfTimePicker.MinTime = new DateTimeOffset(
    new DateTime(today.Year, today.Month, today.Day, 17, 0, 0));
    
sfTimePicker.MaxTime = new DateTimeOffset(
    new DateTime(today.Year, today.Month, today.Day, 22, 0, 0));
```

### Overnight Hours Example

```csharp
// Night shift: 10 PM - 6 AM (next day)
// Note: Use two separate pickers or handle validation separately
DateTime today = DateTime.Today;

// Shift start picker (10 PM - 11:59 PM)
shiftStartPicker.MinTime = new DateTimeOffset(
    new DateTime(today.Year, today.Month, today.Day, 22, 0, 0));
shiftStartPicker.MaxTime = new DateTimeOffset(
    new DateTime(today.Year, today.Month, today.Day, 23, 59, 59));

// Shift end picker (12 AM - 6 AM)
shiftEndPicker.MinTime = new DateTimeOffset(
    new DateTime(today.Year, today.Month, today.Day, 0, 0, 0));
shiftEndPicker.MaxTime = new DateTimeOffset(
    new DateTime(today.Year, today.Month, today.Day, 6, 0, 0));
```

### Behavior with Restrictions

**Dropdown Spinner:**
- Only times within MinTime and MaxTime appear in the dropdown
- Spinner scrolls through valid times only

**Keyboard Input:**
- If user types a time outside the range, it's rejected
- Control reverts to previous valid time

**Programmatic Setting:**
```csharp
// This will work - within range
timePicker.SelectedTime = new DateTimeOffset(
    new DateTime(2024, 3, 22, 10, 0, 0)); // 10 AM

// This will be clamped or rejected - outside range
timePicker.SelectedTime = new DateTimeOffset(
    new DateTime(2024, 3, 22, 6, 0, 0)); // 6 AM (before 9 AM min)
```

## Blocking Specific Times with BlackoutTimes

Use `BlackoutTimes` collection to disable specific times from selection while keeping them visible.

### Basic BlackoutTimes Usage

**C# with ViewModel:**
```csharp
using System.Collections.ObjectModel;

public class ViewModel
{
    public DateTimeOffset? SelectedTime { get; set; }
    public DateTimeOffsetCollection BlackoutTimes { get; set; }
    
    public ViewModel()
    {
        SelectedTime = DateTimeOffset.Now;
        BlackoutTimes = new DateTimeOffsetCollection();
        
        // Block lunch hour (12 PM - 1 PM)
        DateTime today = DateTime.Today;
        for (int minute = 0; minute < 60; minute++)
        {
            BlackoutTimes.Add(new DateTimeOffset(
                new DateTime(today.Year, today.Month, today.Day, 12, minute, 0)));
        }
    }
}
```

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    BlackoutTimes="{Binding BlackoutTimes}"
    SelectedTime="{Binding SelectedTime}">
    <editors:SfTimePicker.DataContext>
        <local:ViewModel />
    </editors:SfTimePicker.DataContext>
</editors:SfTimePicker>
```

**Code-behind:**
```csharp
sfTimePicker.DataContext = new ViewModel();
sfTimePicker.SelectedTime = (sfTimePicker.DataContext as ViewModel).SelectedTime;
sfTimePicker.BlackoutTimes = (sfTimePicker.DataContext as ViewModel).BlackoutTimes;
```

### Blocking Multiple Time Slots

```csharp
public class ViewModel
{
    public DateTimeOffsetCollection BlackoutTimes { get; set; }
    
    public ViewModel()
    {
        BlackoutTimes = new DateTimeOffsetCollection();
        DateTime today = DateTime.Today;
        
        // Block specific hours throughout the day
        var blockedHours = new[] { 0, 1, 2, 3, 12, 22, 23 };
        
        foreach (var hour in blockedHours)
        {
            for (int minute = 0; minute < 60; minute++)
            {
                BlackoutTimes.Add(new DateTimeOffset(
                    new DateTime(today.Year, today.Month, today.Day, hour, minute, 0)));
            }
        }
    }
}
```

### Blocking Specific Minutes

```csharp
// Block specific minutes (e.g., :13, :37, :52 of every hour)
public DateTimeOffsetCollection CreateBlackoutMinutes()
{
    var blackoutTimes = new DateTimeOffsetCollection();
    DateTime today = DateTime.Today;
    var blockedMinutes = new[] { 13, 37, 52 };
    
    for (int hour = 0; hour < 24; hour++)
    {
        foreach (var minute in blockedMinutes)
        {
            blackoutTimes.Add(new DateTimeOffset(
                new DateTime(today.Year, today.Month, today.Day, hour, minute, 0)));
        }
    }
    
    return blackoutTimes;
}
```

### Blocking Existing Appointments

```csharp
// Block times where appointments already exist
public DateTimeOffsetCollection GetBlackoutTimesFromAppointments(
    List<Appointment> existingAppointments)
{
    var blackoutTimes = new DateTimeOffsetCollection();
    DateTime today = DateTime.Today;
    
    foreach (var appointment in existingAppointments)
    {
        // Block the hour of each appointment
        blackoutTimes.Add(new DateTimeOffset(
            new DateTime(today.Year, today.Month, today.Day, 
                        appointment.Time.Hour, appointment.Time.Minute, 0)));
        
        // Optionally block surrounding 30 minutes
        var startTime = appointment.Time.AddMinutes(-30);
        var endTime = appointment.Time.AddMinutes(30);
        
        for (var time = startTime; time <= endTime; time = time.AddMinutes(1))
        {
            blackoutTimes.Add(new DateTimeOffset(
                new DateTime(today.Year, today.Month, today.Day, 
                            time.Hour, time.Minute, 0)));
        }
    }
    
    return blackoutTimes;
}
```

### Dynamic BlackoutTimes

```csharp
// Update blackout times based on another selection
private void StartTimePicker_SelectedTimeChanged(
    DependencyObject d, 
    DependencyPropertyChangedEventArgs e)
{
    if (startTimePicker.SelectedTime.HasValue)
    {
        var startTime = startTimePicker.SelectedTime.Value;
        
        // Block all times before start time in end time picker
        var blackoutTimes = new DateTimeOffsetCollection();
        DateTime today = DateTime.Today;
        
        for (int hour = 0; hour <= startTime.Hour; hour++)
        {
            int maxMinute = (hour == startTime.Hour) ? startTime.Minute : 59;
            
            for (int minute = 0; minute <= maxMinute; minute++)
            {
                blackoutTimes.Add(new DateTimeOffset(
                    new DateTime(today.Year, today.Month, today.Day, hour, minute, 0)));
            }
        }
        
        endTimePicker.BlackoutTimes = blackoutTimes;
    }
}
```

### Behavior with BlackoutTimes

**In Dropdown:**
- Blackout times appear grayed out and disabled
- Cannot be selected by clicking

**Keyboard Input:**
- User can still type blackout times
- Use `SelectedTimeChanging` event to prevent this (see below)

## Creating Custom Time Intervals

Restrict selection to specific time intervals (e.g., every 5, 15, or 30 minutes).

### 5-Minute Intervals

```csharp
using System.Globalization;
using System.Collections.ObjectModel;

sfTimePicker.TimeFieldPrepared += SfTimePicker_TimeFieldPrepared;

private void SfTimePicker_TimeFieldPrepared(
    object sender, 
    DateTimeFieldPreparedEventArgs e)
{
    if (e.Column != null)
    {
        // Apply to minute column only
        if (e.Column.Field == DateTimeField.Minute)
        {
            e.Column.ItemsSource = GetMinutesWithInterval(5, e.Column.Format);
        }
    }
}

private static ObservableCollection<string> GetMinutesWithInterval(
    int interval, 
    string pattern)
{
    ObservableCollection<string> minutes = new ObservableCollection<string>();
    NumberFormatInfo provider = new NumberFormatInfo();
    
    for (int i = 0; i < 60; i += interval)
    {
        // Format with leading zero if needed
        if (i > 9 || pattern == "%m" || pattern == "{minute.integer}")
        {
            minutes.Add(i.ToString(provider));
        }
        else
        {
            minutes.Add("0" + i.ToString(provider));
        }
    }
    
    return minutes;
}
```

**Result:** Minutes show as 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55

### 15-Minute Intervals

```csharp
sfTimePicker.TimeFieldPrepared += (sender, e) =>
{
    if (e.Column?.Field == DateTimeField.Minute)
    {
        e.Column.ItemsSource = GetMinutesWithInterval(15, e.Column.Format);
    }
};
```

**Result:** Minutes show as 0, 15, 30, 45

### 30-Minute Intervals

```csharp
sfTimePicker.TimeFieldPrepared += (sender, e) =>
{
    if (e.Column?.Field == DateTimeField.Minute)
    {
        e.Column.ItemsSource = GetMinutesWithInterval(30, e.Column.Format);
    }
};
```

**Result:** Minutes show as 0, 30

### Custom Hour Intervals

```csharp
sfTimePicker.TimeFieldPrepared += (sender, e) =>
{
    if (e.Column?.Field == DateTimeField.Hour12)
    {
        // Only show even hours
        var hours = new ObservableCollection<string> 
        { 
            "02", "04", "06", "08", "10", "12" 
        };
        e.Column.ItemsSource = hours;
    }
};
```

### Business Quarter Hours

```csharp
// Common business intervals: :00, :15, :30, :45
sfTimePicker.TimeFieldPrepared += (sender, e) =>
{
    if (e.Column?.Field == DateTimeField.Minute)
    {
        var minutes = new ObservableCollection<string> 
        { 
            "00", "15", "30", "45" 
        };
        e.Column.ItemsSource = minutes;
    }
};
```

## Hiding Submit Buttons

Allow immediate time selection without clicking OK button.

### Basic Usage

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    ShowSubmitButtons="False" />
```

**C#:**
```csharp
SfTimePicker sfTimePicker = new SfTimePicker();
sfTimePicker.ShowSubmitButtons = false;
```

### Behavior

| ShowSubmitButtons | Behavior |
|-------------------|----------|
| `true` (default) | Dropdown shows OK/Cancel buttons, user must click OK to confirm |
| `false` | Time updates immediately as user scrolls spinner |

### Use Cases

**Enable Submit Buttons (true) when:**
- Users need to preview selection before confirming
- Multiple time fields are being selected together
- Cancellation option is important

**Disable Submit Buttons (false) when:**
- Quick, frequent time changes are expected
- Simplified UI is preferred
- Real-time preview of selection is needed

### Example: Real-time Preview

```csharp
sfTimePicker.ShowSubmitButtons = false;
sfTimePicker.SelectedTimeChanged += (s, e) =>
{
    if (e.NewDateTime.HasValue)
    {
        // Update preview immediately as user scrolls
        UpdatePreview(e.NewDateTime.Value);
    }
};
```

## Canceling Time Changes

Use `SelectedTimeChanging` event to validate and prevent invalid time selections.

### Basic Event Usage

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    SelectedTimeChanging="SfTimePicker_TimeChanging" />
```

**C#:**
```csharp
private void SfTimePicker_TimeChanging(
    object sender, 
    TimeChangingEventArgs e)
{
    var oldTime = e.OldTime;
    var newTime = e.NewTime;
    
    // Cancel the change
    e.Cancel = true;
}
```

### Event Properties

| Property | Type | Description |
|----------|------|-------------|
| `OldTime` | DateTimeOffset? | Previously selected time |
| `NewTime` | DateTimeOffset? | Newly selected time |
| `Cancel` | bool | Set to true to prevent the change |

### Preventing Blackout Times via Keyboard

Users can type blackout times in the editor. Prevent this:

```csharp
private void SfTimePicker_TimeChanging(
    object sender, 
    TimeChangingEventArgs e)
{
    if (e.NewTime.HasValue)
    {
        var newTime = e.NewTime.Value;
        
        // Check if new time is in blackout collection
        if (sfTimePicker.BlackoutTimes?.Contains(newTime) == true)
        {
            e.Cancel = true;
            ShowNotification("This time is not available. Please select another time.");
        }
    }
}
```

### Business Hours Validation

```csharp
private void SfTimePicker_TimeChanging(
    object sender, 
    TimeChangingEventArgs e)
{
    if (e.NewTime.HasValue)
    {
        var time = e.NewTime.Value;
        int hour = time.Hour;
        
        // Only allow 9 AM - 5 PM
        if (hour < 9 || hour >= 17)
        {
            e.Cancel = true;
            ShowNotification("Please select a time between 9 AM and 5 PM");
        }
    }
}
```

### Future Time Validation

```csharp
private void SfTimePicker_TimeChanging(
    object sender, 
    TimeChangingEventArgs e)
{
    if (e.NewTime.HasValue)
    {
        var selectedTime = e.NewTime.Value;
        var currentTime = DateTimeOffset.Now;
        
        // Combine with date picker's selected date
        var selectedDateTime = new DateTimeOffset(
            datePicker.SelectedDate.Value.Date.Add(selectedTime.TimeOfDay));
        
        if (selectedDateTime < currentTime)
        {
            e.Cancel = true;
            ShowNotification("Please select a future time");
        }
    }
}
```

### Minimum Duration Validation

```csharp
// Ensure end time is at least 30 minutes after start time
private void EndTimePicker_TimeChanging(
    object sender, 
    TimeChangingEventArgs e)
{
    if (e.NewTime.HasValue && startTimePicker.SelectedTime.HasValue)
    {
        var startTime = startTimePicker.SelectedTime.Value;
        var endTime = e.NewTime.Value;
        
        var duration = endTime - startTime;
        
        if (duration.TotalMinutes < 30)
        {
            e.Cancel = true;
            ShowNotification("End time must be at least 30 minutes after start time");
        }
    }
}
```

### Custom Interval Validation

```csharp
// Ensure time follows 15-minute intervals
private void SfTimePicker_TimeChanging(
    object sender, 
    TimeChangingEventArgs e)
{
    if (e.NewTime.HasValue)
    {
        var time = e.NewTime.Value;
        
        // Check if minutes are in 15-minute intervals
        if (time.Minute % 15 != 0)
        {
            e.Cancel = true;
            ShowNotification("Please select time in 15-minute intervals (e.g., :00, :15, :30, :45)");
        }
    }
}
```

## Validation Patterns

### Complete Appointment Validation

```csharp
public class AppointmentValidator
{
    private SfTimePicker startTimePicker;
    private SfTimePicker endTimePicker;
    private SfDatePicker datePicker;
    
    public void Initialize(
        SfDatePicker datePickerControl,
        SfTimePicker startTimePickerControl, 
        SfTimePicker endTimePickerControl)
    {
        datePicker = datePickerControl;
        startTimePicker = startTimePickerControl;
        endTimePicker = endTimePickerControl;
        
        startTimePicker.SelectedTimeChanging += ValidateStartTime;
        endTimePicker.SelectedTimeChanging += ValidateEndTime;
    }
    
    private void ValidateStartTime(object sender, TimeChangingEventArgs e)
    {
        if (!e.NewTime.HasValue) return;
        
        var startTime = e.NewTime.Value;
        
        // Rule 1: Business hours only (9 AM - 5 PM)
        if (startTime.Hour < 9 || startTime.Hour >= 17)
        {
            e.Cancel = true;
            ShowError("Start time must be between 9 AM and 5 PM");
            return;
        }
        
        // Rule 2: 15-minute intervals
        if (startTime.Minute % 15 != 0)
        {
            e.Cancel = true;
            ShowError("Start time must be in 15-minute intervals");
            return;
        }
        
        // Rule 3: Future time only
        if (IsPastTime(startTime))
        {
            e.Cancel = true;
            ShowError("Start time cannot be in the past");
            return;
        }
    }
    
    private void ValidateEndTime(object sender, TimeChangingEventArgs e)
    {
        if (!e.NewTime.HasValue || !startTimePicker.SelectedTime.HasValue) 
            return;
        
        var startTime = startTimePicker.SelectedTime.Value;
        var endTime = e.NewTime.Value;
        
        // Rule 1: End after start
        if (endTime <= startTime)
        {
            e.Cancel = true;
            ShowError("End time must be after start time");
            return;
        }
        
        // Rule 2: Minimum 30 minutes duration
        if ((endTime - startTime).TotalMinutes < 30)
        {
            e.Cancel = true;
            ShowError("Appointment must be at least 30 minutes");
            return;
        }
        
        // Rule 3: Maximum 4 hours duration
        if ((endTime - startTime).TotalHours > 4)
        {
            e.Cancel = true;
            ShowError("Appointment cannot exceed 4 hours");
            return;
        }
    }
    
    private bool IsPastTime(DateTimeOffset selectedTime)
    {
        if (!datePicker.SelectedDate.HasValue) return false;
        
        var selectedDate = datePicker.SelectedDate.Value.Date;
        var selectedDateTime = selectedDate.Add(selectedTime.TimeOfDay);
        
        return selectedDateTime < DateTime.Now;
    }
    
    private void ShowError(string message)
    {
        // Show error notification to user
    }
}
```

## Common Restriction Scenarios

### Scenario 1: Doctor's Appointment Scheduler

```csharp
// 9 AM - 5 PM, 30-minute slots, block lunch 12-1 PM
public void SetupDoctorAppointment(SfTimePicker timePicker)
{
    DateTime today = DateTime.Today;
    
    // Set business hours
    timePicker.MinTime = new DateTimeOffset(
        new DateTime(today.Year, today.Month, today.Day, 9, 0, 0));
    timePicker.MaxTime = new DateTimeOffset(
        new DateTime(today.Year, today.Month, today.Day, 17, 0, 0));
    
    // 30-minute intervals
    timePicker.TimeFieldPrepared += (s, e) =>
    {
        if (e.Column?.Field == DateTimeField.Minute)
        {
            e.Column.ItemsSource = new ObservableCollection<string> { "00", "30" };
        }
    };
    
    // Block lunch hour
    var blackoutTimes = new DateTimeOffsetCollection();
    for (int minute = 0; minute < 60; minute++)
    {
        blackoutTimes.Add(new DateTimeOffset(
            new DateTime(today.Year, today.Month, today.Day, 12, minute, 0)));
    }
    timePicker.BlackoutTimes = blackoutTimes;
}
```

### Scenario 2: Restaurant Reservation

```csharp
// Dinner service: 5 PM - 10 PM, 15-minute slots
public void SetupRestaurantReservation(SfTimePicker timePicker)
{
    DateTime today = DateTime.Today;
    
    // Dinner hours
    timePicker.MinTime = new DateTimeOffset(
        new DateTime(today.Year, today.Month, today.Day, 17, 0, 0));
    timePicker.MaxTime = new DateTimeOffset(
        new DateTime(today.Year, today.Month, today.Day, 22, 0, 0));
    
    // 15-minute intervals
    timePicker.TimeFieldPrepared += (s, e) =>
    {
        if (e.Column?.Field == DateTimeField.Minute)
        {
            e.Column.ItemsSource = new ObservableCollection<string> 
            { "00", "15", "30", "45" };
        }
    };
    
    // No submit buttons for quick selection
    timePicker.ShowSubmitButtons = false;
}
```

### Scenario 3: Gym Class Booking

```csharp
// Classes at specific times: 6 AM, 9 AM, 12 PM, 5 PM, 7 PM
public void SetupGymClassBooking(SfTimePicker timePicker)
{
    DateTime today = DateTime.Today;
    
    timePicker.TimeFieldPrepared += (s, e) =>
    {
        if (e.Column?.Field == DateTimeField.Hour12)
        {
            e.Column.ItemsSource = new ObservableCollection<string> 
            { "06", "09", "12", "05", "07" };
        }
        if (e.Column?.Field == DateTimeField.Minute)
        {
            e.Column.ItemsSource = new ObservableCollection<string> { "00" };
        }
        if (e.Column?.Field == DateTimeField.Meridiem)
        {
            // Control AM/PM based on hour
        }
    };
}
```

## Edge Cases and Troubleshooting

### Issue: BlackoutTimes Not Working

**Problem:** Users can still select blackout times by typing

**Solution:** Use SelectedTimeChanging event to enforce

```csharp
timePicker.SelectedTimeChanging += (s, e) =>
{
    if (e.NewTime.HasValue && 
        timePicker.BlackoutTimes?.Contains(e.NewTime.Value) == true)
    {
        e.Cancel = true;
    }
};
```

### Issue: Custom Intervals Not Showing

**Problem:** TimeFieldPrepared event not firing

**Solutions:**
1. **Verify event subscription:**
   ```csharp
   timePicker.TimeFieldPrepared += Handler;
   ```

2. **Check field type:**
   ```csharp
   if (e.Column?.Field == DateTimeField.Minute) // Check correct field
   ```

3. **Ensure observable collection:**
   ```csharp
   e.Column.ItemsSource = new ObservableCollection<string>(); // Not List<>
   ```

### Issue: MinTime/MaxTime Ignored

**Problem:** All times still show in dropdown

**Solution:** Ensure date portions match

```csharp
// Use same date for both
DateTime today = DateTime.Today;
timePicker.MinTime = new DateTimeOffset(new DateTime(today.Year, today.Month, today.Day, 9, 0, 0));
timePicker.MaxTime = new DateTimeOffset(new DateTime(today.Year, today.Month, today.Day, 17, 0, 0));
```

### Issue: Validation Too Strict

**Problem:** Users can't select any time

**Solution:** Debug validation logic

```csharp
timePicker.SelectedTimeChanging += (s, e) =>
{
    System.Diagnostics.Debug.WriteLine($"Attempting: {e.NewTime}");
    
    if (ValidateTime(e.NewTime))
    {
        System.Diagnostics.Debug.WriteLine("Allowed");
    }
    else
    {
        System.Diagnostics.Debug.WriteLine("Blocked");
        e.Cancel = true;
    }
};
```

### Issue: Performance with Large BlackoutTimes

**Problem:** Slow performance with many blackout times

**Solution:** Use HashSet for faster lookups

```csharp
private HashSet<DateTimeOffset> blackoutTimesSet;

public void InitializeBlackoutTimes()
{
    var blackoutCollection = new DateTimeOffsetCollection();
    blackoutTimesSet = new HashSet<DateTimeOffset>();
    
    // Add times to both
    foreach (var time in GetBlackoutTimes())
    {
        blackoutCollection.Add(time);
        blackoutTimesSet.Add(time);
    }
    
    timePicker.BlackoutTimes = blackoutCollection;
}

// Fast validation
timePicker.SelectedTimeChanging += (s, e) =>
{
    if (e.NewTime.HasValue && blackoutTimesSet.Contains(e.NewTime.Value))
    {
        e.Cancel = true;
    }
};
```

## See Also

- [Getting Started](getting-started.md) - Basic TimePicker setup
- [Localization and Formatting](localization-formatting.md) - Display formats
- [Dropdown Spinner Customization](dropdown-spinner-customization.md) - Custom column intervals

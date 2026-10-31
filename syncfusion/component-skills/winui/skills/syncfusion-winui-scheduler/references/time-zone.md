# Time Zone Support

This reference provides comprehensive guidance on time zone handling in the WinUI Scheduler for multi-timezone scheduling scenarios.

## Overview

The WinUI Scheduler supports displaying appointments in different time zones, which is essential for applications that schedule across multiple time zones (global teams, travel bookings, international events).

## Scheduler Time Zone

### Setting Scheduler Time Zone

The `TimeZone` property sets the time zone for displaying all appointments:

```csharp
// Set scheduler to display times in Pacific Time
Schedule.TimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");

// Set to Eastern Time
Schedule.TimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");

// Set to UTC
Schedule.TimeZone = TimeZoneInfo.Utc;

// Use local time zone (default)
Schedule.TimeZone = TimeZoneInfo.Local;
```

**Common Time Zone IDs:**
- `"Pacific Standard Time"` - US Pacific (UTC-8/-7)
- `"Eastern Standard Time"` - US Eastern (UTC-5/-4)
- `"Central Standard Time"` - US Central (UTC-6/-5)
- `"Mountain Standard Time"` - US Mountain (UTC-7/-6)
- `"GMT Standard Time"` - UK (UTC+0/+1)
- `"UTC"` - Coordinated Universal Time
- `"India Standard Time"` - India (UTC+5:30)

### Get All Available Time Zones

```csharp
var timeZones = TimeZoneInfo.GetSystemTimeZones();

foreach (var tz in timeZones)
{
    Debug.WriteLine($"{tz.Id}: {tz.DisplayName}");
}
```

### Display Appointments in Different Time Zone

```csharp
// Create appointment in UTC
var appointment = new ScheduleAppointment
{
    Subject = "Meeting",
    StartTime = new DateTime(2026, 6, 15, 14, 0, 0, DateTimeKind.Utc), // 2 PM UTC
    EndTime = new DateTime(2026, 6, 15, 15, 0, 0, DateTimeKind.Utc),   // 3 PM UTC
};

Schedule.ItemsSource.Add(appointment);

// View in Pacific Time
Schedule.TimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");
// Displays as 7 AM - 8 AM (UTC-7 during daylight saving)

// View in Eastern Time
Schedule.TimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time");
// Displays as 10 AM - 11 AM (UTC-4 during daylight saving)
```

## Appointment Time Zones

### StartTimeZone and EndTimeZone

Individual appointments can have their own time zones:

```csharp
var appointment = new ScheduleAppointment
{
    Subject = "Flight from LA to NYC",
    StartTime = new DateTime(2026, 6, 15, 10, 0, 0), // 10 AM Pacific
    EndTime = new DateTime(2026, 6, 15, 18, 30, 0),   // 6:30 PM Eastern
    StartTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time"),
    EndTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time")
};

Schedule.ItemsSource.Add(appointment);
```

**Use Cases:**
- Flights across time zones
- Travel itineraries
- International conference calls
- Events that span time zones

### Displaying Appointments with Custom Time Zones

When `StartTimeZone` or `EndTimeZone` is set:
- Appointment times are converted to the scheduler's time zone for display
- Original times are preserved in the appointment data
- User sees times in their local/selected time zone

## Time Zone Conversion

### Manual Time Zone Conversion

```csharp
// Convert appointment time to specific time zone
public DateTime ConvertToTimeZone(DateTime utcTime, string timeZoneId)
{
    var targetTimeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
    return TimeZoneInfo.ConvertTimeFromUtc(utcTime, targetTimeZone);
}

// Convert local time to UTC
public DateTime ConvertToUtc(DateTime localTime, string timeZoneId)
{
    var sourceTimeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
    return TimeZoneInfo.ConvertTimeToUtc(localTime, sourceTimeZone);
}

// Usage
var pacificTime = new DateTime(2026, 6, 15, 10, 0, 0);
var utcTime = ConvertToUtc(pacificTime, "Pacific Standard Time");
var easternTime = ConvertToTimeZone(utcTime, "Eastern Standard Time");
```

### Automatic Conversion Example

```csharp
// Store appointments in UTC on server
public ScheduleAppointment CreateAppointmentInUtc(string subject, DateTime localStart, DateTime localEnd, string localTimeZoneId)
{
    var timeZone = TimeZoneInfo.FindSystemTimeZoneById(localTimeZoneId);
    
    var utcStart = TimeZoneInfo.ConvertTimeToUtc(localStart, timeZone);
    var utcEnd = TimeZoneInfo.ConvertTimeToUtc(localEnd, timeZone);
    
    return new ScheduleAppointment
    {
        Subject = subject,
        StartTime = utcStart,
        EndTime = utcEnd,
        StartTimeZone = TimeZoneInfo.Utc,
        EndTimeZone = TimeZoneInfo.Utc
    };
}
```

## Daylight Saving Time (DST)

### Automatic DST Handling

`TimeZoneInfo` automatically handles daylight saving time transitions:

```csharp
// Pacific Standard Time
var pst = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");

// Winter time (UTC-8)
var winterTime = new DateTime(2026, 1, 15, 12, 0, 0, DateTimeKind.Utc);
var winterLocal = TimeZoneInfo.ConvertTimeFromUtc(winterTime, pst);
// Result: 4 AM (12 - 8)

// Summer time (UTC-7 due to DST)
var summerTime = new DateTime(2026, 6, 15, 12, 0, 0, DateTimeKind.Utc);
var summerLocal = TimeZoneInfo.ConvertTimeFromUtc(summerTime, pst);
// Result: 5 AM (12 - 7)
```

### DST Transition Handling

```csharp
// Check if DST is in effect
public bool IsDaylightSavingTime(DateTime dateTime, TimeZoneInfo timeZone)
{
    return timeZone.IsDaylightSavingTime(dateTime);
}

// Get UTC offset including DST
public TimeSpan GetUtcOffset(DateTime dateTime, TimeZoneInfo timeZone)
{
    return timeZone.GetUtcOffset(dateTime);
}
```

## Common Patterns

### Pattern 1: Time Zone Selector

```xml
<ComboBox x:Name="TimeZoneSelector" 
         SelectionChanged="TimeZoneSelector_SelectionChanged"
         Header="Display Time Zone"/>

<scheduler:SfScheduler x:Name="Schedule" ViewType="Week"/>
```

```csharp
private void InitializeTimeZoneSelector()
{
    var commonTimeZones = new List<TimeZoneInfo>
    {
        TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time"),
        TimeZoneInfo.FindSystemTimeZoneById("Mountain Standard Time"),
        TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time"),
        TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"),
        TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time"),
        TimeZoneInfo.Utc
    };
    
    TimeZoneSelector.ItemsSource = commonTimeZones;
    TimeZoneSelector.DisplayMemberPath = "DisplayName";
    TimeZoneSelector.SelectedItem = TimeZoneInfo.Local;
}

private void TimeZoneSelector_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    if (TimeZoneSelector.SelectedItem is TimeZoneInfo selectedTimeZone)
    {
        Schedule.TimeZone = selectedTimeZone;
    }
}
```

### Pattern 2: Store in UTC, Display in Local

```csharp
// When creating appointment
private ScheduleAppointment CreateAppointment(string subject, DateTime localStart, DateTime localEnd)
{
    // Convert local time to UTC for storage
    var utcStart = TimeZoneInfo.ConvertTimeToUtc(localStart, TimeZoneInfo.Local);
    var utcEnd = TimeZoneInfo.ConvertTimeToUtc(localEnd, TimeZoneInfo.Local);
    
    return new ScheduleAppointment
    {
        Subject = subject,
        StartTime = utcStart,
        EndTime = utcEnd
    };
}

// Set scheduler to display in user's local time
Schedule.TimeZone = TimeZoneInfo.Local;
```

### Pattern 3: Multi-Time Zone Conference Call

```csharp
// Create conference call spanning time zones
var call = new ScheduleAppointment
{
    Subject = "Team Sync - US & India",
    Notes = "LA: 8 AM | NYC: 11 AM | India: 8:30 PM",
    StartTime = new DateTime(2026, 6, 15, 16, 0, 0, DateTimeKind.Utc), // 8 AM Pacific
    EndTime = new DateTime(2026, 6, 15, 17, 0, 0, DateTimeKind.Utc),   // 9 AM Pacific
    StartTimeZone = TimeZoneInfo.Utc,
    EndTimeZone = TimeZoneInfo.Utc
};

Schedule.ItemsSource.Add(call);

// Each user sees the call in their local time:
// - LA user: 8 AM - 9 AM
// - NYC user: 11 AM - 12 PM
// - India user: 8:30 PM - 9:30 PM
```

### Pattern 4: Travel Itinerary

```csharp
// Flight from LA to NYC
var flight = new ScheduleAppointment
{
    Subject = "Flight AA123 - LAX to JFK",
    StartTime = new DateTime(2026, 6, 15, 10, 0, 0), // Depart LA
    EndTime = new DateTime(2026, 6, 15, 18, 30, 0),   // Arrive NYC
    StartTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time"),
    EndTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"),
    Background = new SolidColorBrush(Colors.SkyBlue)
};

// Hotel check-in (in NYC time)
var checkin = new ScheduleAppointment
{
    Subject = "Hotel Check-in",
    StartTime = new DateTime(2026, 6, 15, 20, 0, 0), // 8 PM Eastern
    EndTime = new DateTime(2026, 6, 15, 20, 30, 0),
    StartTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time"),
    EndTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Eastern Standard Time")
};

Schedule.ItemsSource.Add(flight);
Schedule.ItemsSource.Add(checkin);
```

### Pattern 5: Show Time Zone in Appointment

```csharp
// Display time zone info in appointment subject or notes
private string FormatAppointmentWithTimeZone(ScheduleAppointment appointment)
{
    var timeZone = appointment.StartTimeZone ?? TimeZoneInfo.Local;
    var abbreviation = GetTimeZoneAbbreviation(timeZone, appointment.StartTime);
    
    return $"{appointment.Subject} ({abbreviation})";
}

private string GetTimeZoneAbbreviation(TimeZoneInfo timeZone, DateTime dateTime)
{
    // Simple abbreviation lookup
    var offset = timeZone.GetUtcOffset(dateTime);
    var hours = offset.Hours;
    
    if (timeZone.Id.Contains("Pacific"))
        return timeZone.IsDaylightSavingTime(dateTime) ? "PDT" : "PST";
    else if (timeZone.Id.Contains("Eastern"))
        return timeZone.IsDaylightSavingTime(dateTime) ? "EDT" : "EST";
    else if (timeZone.Id.Contains("Central"))
        return timeZone.IsDaylightSavingTime(dateTime) ? "CDT" : "CST";
    else
        return $"UTC{(hours >= 0 ? "+" : "")}{hours}";
}
```

### Pattern 6: Time Zone Converter Tool

```xml
<Grid>
    <StackPanel>
        <TextBlock Text="Convert Time Between Zones" FontWeight="Bold"/>
        
        <TimePicker x:Name="SourceTimePicker" Header="Time"/>
        <ComboBox x:Name="SourceTimeZonePicker" Header="From Time Zone"/>
        
        <ComboBox x:Name="TargetTimeZonePicker" Header="To Time Zone"/>
        
        <Button Content="Convert" Click="ConvertButton_Click"/>
        
        <TextBlock x:Name="ResultText" FontSize="18"/>
    </StackPanel>
</Grid>
```

```csharp
private void ConvertButton_Click(object sender, RoutedEventArgs e)
{
    var sourceTime = SourceTimePicker.Time;
    var sourceDate = DateTime.Today + sourceTime;
    
    var sourceTimeZone = SourceTimeZonePicker.SelectedItem as TimeZoneInfo;
    var targetTimeZone = TargetTimeZonePicker.SelectedItem as TimeZoneInfo;
    
    var utcTime = TimeZoneInfo.ConvertTimeToUtc(sourceDate, sourceTimeZone);
    var targetTime = TimeZoneInfo.ConvertTimeFromUtc(utcTime, targetTimeZone);
    
    ResultText.Text = $"{sourceTime:hh\\:mm} {GetTimeZoneAbbreviation(sourceTimeZone, sourceDate)} = " +
                     $"{targetTime:hh:mm tt} {GetTimeZoneAbbreviation(targetTimeZone, targetTime)}";
}
```

## Best Practices

### Storage
- Store all appointment times in UTC on server/database
- Convert to local time only for display
- Preserve original time zone information
- Handle time zone changes (user relocates)

### Display
- Show time zone indicators (PST, EST, UTC+5:30)
- Allow users to select display time zone
- Highlight appointments in different time zones
- Show both local and original time in tooltips

### Conversion
- Always use `TimeZoneInfo` for conversions
- Never hardcode UTC offsets (DST changes them)
- Test around DST transition dates
- Validate time zone IDs before use

### User Experience
- Default to user's local time zone
- Make time zone selection prominent
- Show time zone in appointment editor
- Provide time zone tooltips for clarity

## Troubleshooting

### Appointments Show Wrong Times

**Problem:** Appointment times are off by several hours.

**Solutions:**
- Check if times are stored as UTC vs local
- Verify `TimeZone` property is set correctly
- Ensure `StartTimeZone` and `EndTimeZone` are appropriate
- Check DateTime.Kind (Utc, Local, Unspecified)

### DST Transition Issues

**Problem:** Appointments at DST boundaries show incorrectly.

**Solutions:**
- Use `TimeZoneInfo` for all conversions (handles DST automatically)
- Don't hardcode UTC offsets
- Test with dates before/after DST transition
- Store times in UTC to avoid ambiguity

### Time Zone ID Not Found

**Problem:** `FindSystemTimeZoneById` throws exception.

**Solutions:**
- Verify time zone ID is correct and spelled exactly
- Use `TimeZoneInfo.GetSystemTimeZones()` to get valid IDs
- Time zone IDs differ by OS (Windows vs Linux)
- Wrap in try-catch and provide fallback

### Appointments Overlap After Time Zone Change

**Problem:** Changing scheduler time zone causes overlaps.

**Solutions:**
- This is expected behavior (same appointment, different view)
- Appointments stored correctly, just displayed in new time zone
- Use resource grouping to separate overlapping appointments
- Filter by actual UTC times if needed

### Performance Issues with Time Zone Conversions

**Problem:** Scheduler is slow when changing time zones.

**Solutions:**
- Cache `TimeZoneInfo` objects (don't create repeatedly)
- Minimize conversions in rendering path
- Pre-convert appointment times when loading
- Use `DisplayDate` change to batch-convert visible appointments

### Time Zone Selector Shows Too Many Options

**Problem:** Time zone list is overwhelming.

**Solutions:**
- Show only relevant time zones (user's country/region)
- Group time zones by UTC offset
- Provide search/filter functionality
- Default to user's local time zone
- Consider storing user's preferred time zones

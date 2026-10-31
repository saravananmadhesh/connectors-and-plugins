# Date Restrictions in WinUI Calendar

Complete guide for restricting date selection in the WinUI Calendar (SfCalendar) control using MinDate, MaxDate, BlackoutDates, and dynamic blocking.

## Overview

The Calendar control provides three ways to restrict date selection:

1. **MinDate & MaxDate** - Define a valid date range
2. **BlackoutDates** - Block specific dates from a collection
3. **ItemPrepared Event** - Dynamically block dates based on logic (e.g., weekends)

Restricted dates appear disabled (grayed out) and cannot be selected by users.

## MinDate and MaxDate Properties

Restrict users to select dates within a specific range.

### Default Values

- `MinDate` = `1/1/1920`
- `MaxDate` = `12/31/2120`

Dates outside this range are automatically blocked.

### Set Date Range

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     MinDate="2026-01-01"
                     MaxDate="2026-12-31" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.MinDate = new DateTimeOffset(new DateTime(2026, 1, 1));
sfCalendar.MaxDate = new DateTimeOffset(new DateTime(2026, 12, 31));
```

**Result:** Users can only select dates in the year 2026. All other dates appear disabled.

### Common Date Range Scenarios

#### Restrict to Current Year

```csharp
DateTime now = DateTime.Now;
calendar.MinDate = new DateTimeOffset(new DateTime(now.Year, 1, 1));
calendar.MaxDate = new DateTimeOffset(new DateTime(now.Year, 12, 31));
```

#### Future Dates Only (No Past Dates)

```csharp
calendar.MinDate = DateTimeOffset.Now;
calendar.MaxDate = new DateTimeOffset(new DateTime(2099, 12, 31));
```

#### Past Dates Only (Historical)

```csharp
calendar.MinDate = new DateTimeOffset(new DateTime(1900, 1, 1));
calendar.MaxDate = DateTimeOffset.Now;
```

#### Next 30 Days Only

```csharp
calendar.MinDate = DateTimeOffset.Now;
calendar.MaxDate = DateTimeOffset.Now.AddDays(30);
```

#### Specific Month Only

```csharp
DateTime month = new DateTime(2026, 3, 1);
calendar.MinDate = new DateTimeOffset(month);
calendar.MaxDate = new DateTimeOffset(month.AddMonths(1).AddDays(-1));
```

#### This Week Only

```csharp
DateTime today = DateTime.Now;
DayOfWeek currentDay = today.DayOfWeek;
int daysToSunday = ((int)currentDay - (int)DayOfWeek.Sunday);
DateTime sunday = today.AddDays(-daysToSunday);
DateTime saturday = sunday.AddDays(6);

calendar.MinDate = new DateTimeOffset(sunday);
calendar.MaxDate = new DateTimeOffset(saturday);
```

## BlackoutDates Collection

Block specific dates from selection, even if they're within the MinDate/MaxDate range.

### Basic Usage

**C#:**
```csharp
// Create blackout dates collection
DateTimeOffsetCollection blackoutDates = new DateTimeOffsetCollection();

// Add specific dates
blackoutDates.Add(new DateTimeOffset(new DateTime(2026, 3, 25))); // Holiday
blackoutDates.Add(new DateTimeOffset(new DateTime(2026, 12, 25))); // Christmas

// Apply to calendar
calendar.BlackoutDates = blackoutDates;
```

### With ViewModel (MVVM Pattern)

**ViewModel.cs:**
```csharp
public class CalendarViewModel
{
    public DateTimeOffsetCollection BlockedDates { get; set; }
    
    public CalendarViewModel()
    {
        BlockedDates = new DateTimeOffsetCollection();
        
        // Add company holidays
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 1, 1)));  // New Year
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 7, 4)));  // Independence Day
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 12, 25))); // Christmas
        
        // Add maintenance days
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 15)));
        BlockedDates.Add(new DateTimeOffset(new DateTime(2026, 6, 15)));
    }
}
```

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar" 
                     BlackoutDates="{Binding BlockedDates}">
    <calendar:SfCalendar.DataContext>
        <local:CalendarViewModel />
    </calendar:SfCalendar.DataContext>
</calendar:SfCalendar>
```

**C# Code-Behind:**
```csharp
sfCalendar.DataContext = new CalendarViewModel();
sfCalendar.BlackoutDates = (sfCalendar.DataContext as CalendarViewModel).BlockedDates;
```

### Add/Remove BlackoutDates Dynamically

```csharp
// Add a new blackout date
calendar.BlackoutDates.Add(new DateTimeOffset(new DateTime(2026, 4, 10)));

// Remove a blackout date
DateTimeOffset dateToRemove = new DateTimeOffset(new DateTime(2026, 4, 10));
calendar.BlackoutDates.Remove(dateToRemove);

// Clear all blackout dates
calendar.BlackoutDates.Clear();

// Check if date is blocked
DateTimeOffset checkDate = new DateTimeOffset(new DateTime(2026, 4, 10));
bool isBlocked = calendar.BlackoutDates.Contains(checkDate);
```

### Load BlackoutDates from Database

```csharp
public async Task LoadBlackoutDatesAsync()
{
    // Fetch blocked dates from database
    List<DateTime> dbBlockedDates = await databaseService.GetBlockedDatesAsync();
    
    // Convert and add to calendar
    calendar.BlackoutDates.Clear();
    foreach (DateTime date in dbBlockedDates)
    {
        calendar.BlackoutDates.Add(new DateTimeOffset(date));
    }
}
```

## Dynamic Date Blocking with ItemPrepared Event

Block dates based on custom logic using the `ItemPrepared` event. This is ideal for patterns like:
- All weekends
- Every nth day
- Dates matching a rule
- Dates from external API

### Block All Weekends

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar" 
                     ItemPrepared="SfCalendar_ItemPrepared" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.ItemPrepared += SfCalendar_ItemPrepared;

private void SfCalendar_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    // Block all weekend days (Saturday and Sunday)
    if (e.ItemInfo.ItemType == CalendarItemType.Day &&
        (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Saturday ||
         e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday))
    {
        e.ItemInfo.IsBlackout = true;
    }
}
```

### Block Weekends with Custom Display Text

```csharp
private void SfCalendar_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day &&
        (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Saturday ||
         e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday))
    {
        e.ItemInfo.IsBlackout = true;
        e.ItemInfo.DisplayText = "X"; // Show "X" instead of date number
    }
}
```

### Block Specific Day of Week (Every Monday)

```csharp
private void SfCalendar_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day &&
        e.ItemInfo.Date.DayOfWeek == DayOfWeek.Monday)
    {
        e.ItemInfo.IsBlackout = true;
        e.ItemInfo.DisplayText = "Closed";
    }
}
```

### Block Every Nth Day

```csharp
private void SfCalendar_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        // Block every 3rd day (1st, 4th, 7th, 10th, etc.)
        if (e.ItemInfo.Date.Day % 3 == 1)
        {
            e.ItemInfo.IsBlackout = true;
        }
    }
}
```

### Block Past Dates (Dynamic)

```csharp
private void SfCalendar_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        // Block all dates before today
        if (e.ItemInfo.Date.Date < DateTime.Now.Date)
        {
            e.ItemInfo.IsBlackout = true;
        }
    }
}
```

### Block Based on Business Rules

```csharp
private void SfCalendar_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        DateTime date = e.ItemInfo.Date.DateTime;
        
        // Check if date is available in booking system
        if (!IsDateAvailable(date))
        {
            e.ItemInfo.IsBlackout = true;
            e.ItemInfo.DisplayText = "Booked";
        }
    }
}

private bool IsDateAvailable(DateTime date)
{
    // Check against booking database or API
    return bookingService.IsAvailable(date);
}
```

### Combine Multiple Rules

```csharp
private void SfCalendar_ItemPrepared(object sender, CalendarItemPreparedEventArgs e)
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        DateTime date = e.ItemInfo.Date.DateTime;
        
        // Block weekends
        bool isWeekend = (date.DayOfWeek == DayOfWeek.Saturday || 
                          date.DayOfWeek == DayOfWeek.Sunday);
        
        // Block holidays
        bool isHoliday = holidayList.Contains(date.Date);
        
        // Block past dates
        bool isPast = date.Date < DateTime.Now.Date;
        
        // Block fully booked dates
        bool isFullyBooked = GetAvailableSlots(date) == 0;
        
        if (isWeekend || isHoliday || isPast || isFullyBooked)
        {
            e.ItemInfo.IsBlackout = true;
            
            // Custom display text based on reason
            if (isWeekend) e.ItemInfo.DisplayText = "Weekend";
            else if (isHoliday) e.ItemInfo.DisplayText = "Holiday";
            else if (isPast) e.ItemInfo.DisplayText = "-";
            else if (isFullyBooked) e.ItemInfo.DisplayText = "Full";
        }
    }
}
```

## ItemPrepared Event Properties

The `CalendarItemPreparedEventArgs` provides:

| Property | Type | Description |
|----------|------|-------------|
| `ItemInfo.Date` | DateTimeOffset | The date being prepared |
| `ItemInfo.ItemType` | CalendarItemType | Day, Month, Year, or Decade |
| `ItemInfo.IsBlackout` | bool | Set to `true` to block the date |
| `ItemInfo.DisplayText` | string | Custom text to display in the cell |

## Combining Restriction Methods

You can use all three methods together for comprehensive date blocking:

```csharp
// 1. Set overall date range (MinDate/MaxDate)
calendar.MinDate = new DateTimeOffset(new DateTime(2026, 1, 1));
calendar.MaxDate = new DateTimeOffset(new DateTime(2026, 12, 31));

// 2. Block specific dates (BlackoutDates)
calendar.BlackoutDates.Add(new DateTimeOffset(new DateTime(2026, 12, 25))); // Christmas

// 3. Block based on logic (ItemPrepared)
calendar.ItemPrepared += (s, e) =>
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        // Block all Sundays
        if (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday)
        {
            e.ItemInfo.IsBlackout = true;
        }
    }
};
```

**Priority:**
1. Dates outside MinDate/MaxDate are blocked (cannot be overridden)
2. BlackoutDates collection blocks specific dates
3. ItemPrepared event can block additional dates dynamically

## Common Restriction Scenarios

### Scenario 1: Appointment Booking (Business Days Only)

```csharp
// No past dates, no weekends, no holidays
calendar.MinDate = DateTimeOffset.Now;

calendar.ItemPrepared += (s, e) =>
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        bool isWeekend = (e.ItemInfo.Date.DayOfWeek == DayOfWeek.Saturday || 
                          e.ItemInfo.Date.DayOfWeek == DayOfWeek.Sunday);
        bool isHoliday = companyHolidays.Contains(e.ItemInfo.Date.Date);
        
        if (isWeekend || isHoliday)
        {
            e.ItemInfo.IsBlackout = true;
        }
    }
};
```

### Scenario 2: Hotel Booking (Available Dates Only)

```csharp
calendar.ItemPrepared += async (s, e) =>
{
    if (e.ItemInfo.ItemType == CalendarItemType.Day)
    {
        bool isAvailable = await CheckRoomAvailability(e.ItemInfo.Date);
        if (!isAvailable)
        {
            e.ItemInfo.IsBlackout = true;
            e.ItemInfo.DisplayText = "Booked";
        }
    }
};
```

### Scenario 3: Event Registration (Cutoff Date)

```csharp
DateTime registrationCutoff = new DateTime(2026, 3, 31);
calendar.MaxDate = new DateTimeOffset(registrationCutoff);
```

### Scenario 4: Age Verification (18+ only)

```csharp
// Block dates less than 18 years ago
DateTime maxBirthDate = DateTime.Now.AddYears(-18);
calendar.MaxDate = new DateTimeOffset(maxBirthDate);
```

## Styling Disabled Dates

Disabled dates automatically appear grayed out, but you can customize further using the `ItemPrepared` event:

```csharp
calendar.ItemPrepared += (s, e) =>
{
    if (e.ItemInfo.IsBlackout)
    {
        // Custom styling for blocked dates
        // (styling details depend on template customization)
    }
};
```

## Best Practices

1. **Performance:** Use MinDate/MaxDate for large ranges, BlackoutDates for specific dates, ItemPrepared for complex logic
2. **User Feedback:** Use `DisplayText` to explain why dates are blocked
3. **Validation:** Always validate selected dates in code, even with restrictions
4. **Async Operations:** Be careful with async calls in ItemPrepared (can impact performance)
5. **Testing:** Test edge cases like leap years, month boundaries, and timezone issues

## Troubleshooting

### Issue: BlackoutDates Not Working
**Solution:** Ensure dates are added as `DateTimeOffset` and match exact date (time component ignored)

### Issue: ItemPrepared Blocks Wrong Dates
**Solution:** Check `ItemInfo.ItemType == CalendarItemType.Day` before blocking

### Issue: Performance Slow with ItemPrepared
**Solution:** Minimize logic in event handler, cache data, avoid async calls

### Issue: Blocked Dates Still Selectable
**Solution:** Verify `IsBlackout = true` is set correctly, check if override occurs elsewhere

## Related Topics

- [Selection](selection.md) - Date selection modes
- [Navigation](navigation.md) - Navigate between views
- [Getting Started](getting-started.md) - Basic setup

## Code Examples

Download working samples:
- [Date Restriction Examples on GitHub](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples/blob/main/Samples/Restriction)
- [Blackout Dates Examples on GitHub](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples/tree/main/Samples/BlockedDates)
- [Dynamic Blocking Examples on GitHub](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples/blob/main/Samples/Formatting)

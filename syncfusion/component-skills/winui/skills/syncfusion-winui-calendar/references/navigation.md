# Navigation in WinUI Calendar

Complete guide for navigating between views and controlling date display in the WinUI Calendar (SfCalendar) control.

## Overview

The Calendar control supports navigation between four different views:
1. **Month View** - Days of the month (default)
2. **Year View** - Months of the year
3. **Decade View** - Years in a decade
4. **Century View** - Decades in a century

Users navigate by clicking the header button or using navigation arrows. You can also control navigation programmatically.

## Display Modes

### Available Display Modes

| Mode | Description | Display |
|------|-------------|---------|
| `Month` | Shows days in a month | 1-31 (day cells) |
| `Year` | Shows months in a year | Jan-Dec (month cells) |
| `Decade` | Shows years in a decade | 2020-2029 (year cells) |
| `Century` | Shows decades in a century | 2000s-2090s (decade cells) |

### Set Initial Display Mode

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     DisplayMode="Year" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.DisplayMode = CalendarDisplayMode.Year;
```

### User Navigation Between Views

Users click the header button to move up through views:
- Month → Year → Decade → Century
- Clicking a cell navigates down (e.g., Year cell → Month view for that month)

## Bring a Date into View

Use the `SetDisplayDate` method to navigate to a specific date's month/year programmatically.

### Basic Usage

```csharp
// Navigate to January 2026
calendar.SetDisplayDate(new DateTimeOffset(new DateTime(2026, 1, 15)));
```

### With Loaded Event

**XAML:**
```xml
<calendar:SfCalendar x:Name="calendar" 
                     Loaded="calendar_Loaded" />
```

**C#:**
```csharp
private void calendar_Loaded(object sender, RoutedEventArgs e)
{
    // Navigate to specific month when calendar loads
    calendar.SetDisplayDate(new DateTimeOffset(new DateTime(2026, 6, 1)));
}
```

### Common Scenarios

```csharp
// Navigate to today
calendar.SetDisplayDate(DateTimeOffset.Now);

// Navigate to first day of current month
DateTime firstDay = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
calendar.SetDisplayDate(new DateTimeOffset(firstDay));

// Navigate to specific date
calendar.SetDisplayDate(new DateTimeOffset(new DateTime(2026, 12, 25)));

// Navigate to selected date
if (calendar.SelectedDate.HasValue)
{
    calendar.SetDisplayDate(calendar.SelectedDate.Value);
}
```

**Important:** `SetDisplayDate` only changes the displayed month/year; it doesn't select the date.

## Restrict Navigation Between Views

Control which views users can access using `MinDisplayMode` and `MaxDisplayMode` properties.

### Default Behavior

- `MinDisplayMode` = `Month` (can drill down to days)
- `MaxDisplayMode` = `Century` (can zoom out to centuries)

### Restrict to Month and Year Only

Useful when you don't want users to select specific days (e.g., credit card expiry date).

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     MinDisplayMode="Month"
                     MaxDisplayMode="Year"
                     DisplayMode="Month" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.MinDisplayMode = CalendarDisplayMode.Month;
sfCalendar.MaxDisplayMode = CalendarDisplayMode.Year;
sfCalendar.DisplayMode = CalendarDisplayMode.Month;
```

**Result:** Users can navigate between Month and Year views only. Header button is disabled when at max view.

### Restrict to Year and Decade Only

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     MinDisplayMode="Year"
                     MaxDisplayMode="Decade" />
```

**C#:**
```csharp
sfCalendar.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendar.MaxDisplayMode = CalendarDisplayMode.Decade;
```

**Use Case:** Credit card expiry picker (month/year only, no specific day).

## Selection Based on View Restrictions

Force users to select from a specific view level rather than individual dates.

### Example: Month/Year Selection Only

```xml
<calendar:SfCalendar x:Name="sfCalendar" 
                     MinDisplayMode="Year"
                     MaxDisplayMode="Decade" />
```

```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendar.MaxDisplayMode = CalendarDisplayMode.Decade;
```

**Behavior:**
- User starts in Year view (shows months)
- Can navigate to Decade view (shows years)
- Selecting a month in Year view sets that month as the selected date
- Cannot drill down to individual days

**Use Cases:**
- Credit card expiration (MM/YYYY)
- Budget planning by month
- Quarterly reports (select month/year)
- Year-only selection for age/graduation year

## Navigation Direction

Control how users scroll within a view (affects month-to-month navigation).

### Vertical Navigation (Default)

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     NavigationDirection="Vertical" />
```

**C#:**
```csharp
sfCalendar.NavigationDirection = Orientation.Vertical;
```

**Features:**
- Navigation buttons move vertically
- Mouse scroll wheel works
- Animates vertically when changing months

### Horizontal Navigation

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     NavigationDirection="Horizontal" />
```

**C#:**
```csharp
sfCalendar.NavigationDirection = Orientation.Horizontal;
```

**Features:**
- Navigation buttons move horizontally (left/right arrows)
- Mouse scroll wheel does NOT work
- Animates horizontally when changing months

**When to Use:**
- Horizontal layout designs
- Touch-optimized interfaces (swipe left/right)
- Limited vertical space

## Keyboard Navigation

The Calendar supports comprehensive keyboard shortcuts for accessibility.

### Between Elements

| Key | Action |
|-----|--------|
| `Tab` | Move to next element (forward) |
| `Shift+Tab` | Move to previous element (backward) |

### Within View (Date Cells)

| Key | Action |
|-----|--------|
| `↑` (Up Arrow) | Move up one week / Previous row |
| `↓` (Down Arrow) | Move down one week / Next row |
| `←` (Left Arrow) | Move to previous day/month/year |
| `→` (Right Arrow) | Move to next day/month/year |
| `Home` | Jump to first cell in current view |
| `End` | Jump to last cell in current view |

### Selection

| Key | Action |
|-----|--------|
| `Space` or `Enter` | Select focused date/month/year |

### Between Views

| Key | Action |
|-----|--------|
| `Ctrl+↑` | Navigate up one view level (Month → Year → Decade → Century) |
| `Ctrl+↓` | Navigate down one view level (when cell selected) |
| `PageUp` | Navigate to previous month/year/decade |
| `PageDown` | Navigate to next month/year/decade |

### Keyboard Navigation Example

```
1. User tabs to Calendar control
2. Presses Ctrl+↑ → Moves from Month to Year view
3. Presses ↓ → Moves focus to next row of months
4. Presses Enter → Selects that month, navigates back to Month view
5. Presses PageDown → Moves to next month
6. Uses arrow keys → Navigates to specific day
7. Presses Space → Selects that day
```

## Common Navigation Scenarios

### Scenario 1: Jump to Today's Month

```csharp
calendar.SetDisplayDate(DateTimeOffset.Now);
```

### Scenario 2: Navigate to Birthday Month

```csharp
DateTime birthday = new DateTime(DateTime.Now.Year, 6, 15);
calendar.SetDisplayDate(new DateTimeOffset(birthday));
```

### Scenario 3: Restrict to Current Year Only

```csharp
DateTime now = DateTime.Now;
calendar.MinDate = new DateTimeOffset(new DateTime(now.Year, 1, 1));
calendar.MaxDate = new DateTimeOffset(new DateTime(now.Year, 12, 31));
calendar.MinDisplayMode = CalendarDisplayMode.Month;
calendar.MaxDisplayMode = CalendarDisplayMode.Year;
```

### Scenario 4: Year Picker Only

```csharp
calendar.MinDisplayMode = CalendarDisplayMode.Decade;
calendar.MaxDisplayMode = CalendarDisplayMode.Century;
calendar.DisplayMode = CalendarDisplayMode.Decade;
```

**Result:** Users can only select a specific year, not month or day.

### Scenario 5: Navigate on Button Click

```xml
<StackPanel>
    <Button Content="Go to July 2026" Click="NavigateToJuly_Click" />
    <calendar:SfCalendar x:Name="calendar" />
</StackPanel>
```

```csharp
private void NavigateToJuly_Click(object sender, RoutedEventArgs e)
{
    calendar.SetDisplayDate(new DateTimeOffset(new DateTime(2026, 7, 1)));
}
```

### Scenario 6: Synchronized Navigation (Two Calendars)

```csharp
// When calendar1 navigates, update calendar2 to show next month
calendar1.DisplayDateChanged += (s, e) =>
{
    if (calendar1.DisplayDate.HasValue)
    {
        DateTime nextMonth = calendar1.DisplayDate.Value.DateTime.AddMonths(1);
        calendar2.SetDisplayDate(new DateTimeOffset(nextMonth));
    }
};
```

## Best Practices

1. **Initial Display:** Use `SetDisplayDate` on `Loaded` event for initial navigation
2. **View Restrictions:** Set `MinDisplayMode` and `MaxDisplayMode` based on selection granularity needed
3. **Keyboard Support:** Always test keyboard navigation for accessibility
4. **Navigation Direction:** Choose based on layout and available space
5. **Performance:** Use `SetDisplayDate` instead of programmatically clicking through months
6. **User Feedback:** Ensure header button shows current view level clearly

## Troubleshooting

### Issue: SetDisplayDate Doesn't Scroll to Date
**Cause:** Date is outside MinDate/MaxDate range  
**Solution:** Verify date is within allowed range

### Issue: Can't Navigate to Certain Views
**Cause:** MinDisplayMode/MaxDisplayMode restrictions  
**Solution:** Check and adjust display mode limits

### Issue: Mouse Scroll Not Working
**Cause:** NavigationDirection set to Horizontal  
**Solution:** Set `NavigationDirection="Vertical"` to enable scroll wheel

### Issue: Keyboard Navigation Not Working
**Cause:** Calendar not focused  
**Solution:** Ensure calendar has focus (click on it or use Tab key)

## Related Topics

- [Selection](selection.md) - Date selection modes and behaviors
- [Date Restrictions](date-restrictions.md) - Limit selectable dates
- [Getting Started](getting-started.md) - Initial setup and basic usage

## Code Examples

Download working samples:
- [Navigation Examples on GitHub](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples/blob/main/Samples/Restriction)

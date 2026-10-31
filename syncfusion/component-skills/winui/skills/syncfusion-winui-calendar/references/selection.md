# Selection in WinUI Calendar

## Table of Contents
- [Overview](#overview)
- [Selection Modes](#selection-modes)
- [Single Selection](#single-selection)
- [Multiple Selection](#multiple-selection)
- [Range Selection](#range-selection)
- [Selection Changed Event](#selection-changed-event)
- [Visual Customization](#visual-customization)
- [Data Binding](#data-binding)
- [Common Scenarios](#common-scenarios)

## Overview

The WinUI Calendar (SfCalendar) provides flexible date selection capabilities through the `SelectionMode` property. You can select dates interactively by clicking or programmatically through properties.

**Default Behavior:**
- `SelectedDate` = `null`
- `SelectedDates` collection = empty
- `SelectionMode` = `Single`

## Selection Modes

The `SelectionMode` property accepts four values:

| Mode | Description | Use When |
|------|-------------|----------|
| `None` | Prevents date selection | View-only calendar display |
| `Single` | Select one date at a time | Event date, birthday, deadline |
| `Multiple` | Select multiple non-contiguous dates | Vacation days, holidays, available dates |
| `Range` | Select a continuous range of dates | Date filter, booking period, report range |

## Single Selection

Select a single date at a time. This is the default mode.

### Basic Single Selection

**XAML:**
```xml
<calendar:SfCalendar Name="sfCalendar" 
                     SelectionMode="Single" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.SelectionMode = CalendarSelectionMode.Single;
```

### Programmatic Date Selection

Use the `SelectedDate` property to select a date programmatically:

```csharp
// Set selected date
sfCalendar.SelectedDate = new DateTimeOffset(new DateTime(2026, 3, 22));

// Get selected date
DateTimeOffset? selectedDate = sfCalendar.SelectedDate;

if (selectedDate.HasValue)
{
    DateTime date = selectedDate.Value.DateTime;
    Console.WriteLine($"Selected: {date:yyyy-MM-dd}");
}
```

### Using SelectedDates Collection

Even in Single mode, you can use the `SelectedDates` collection. The first date in the collection becomes the selected date.

**Important Behaviors:**
- If `SelectedDate` is set and `SelectionMode` is `Single`, then `SelectedDates` contains only that one date
- If `SelectedDates` has multiple dates but `SelectionMode` is `Single`, only the first date is selected
- Changes to `SelectedDate` automatically update `SelectedDates` and vice versa

```csharp
// Both approaches are equivalent in Single mode
sfCalendar.SelectedDate = new DateTimeOffset(new DateTime(2026, 3, 22));
// OR
sfCalendar.SelectedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 22)));
```

## Multiple Selection

Select one or more dates from any month, year, decade, or century. Dates don't need to be contiguous.

### Enable Multiple Selection

**XAML:**
```xml
<calendar:SfCalendar Name="sfCalendar" 
                     SelectionMode="Multiple" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.SelectionMode = CalendarSelectionMode.Multiple;
```

### Access Selected Dates

```csharp
// Get all selected dates
DateTimeOffsetCollection selectedDates = sfCalendar.SelectedDates;

foreach (DateTimeOffset date in selectedDates)
{
    Console.WriteLine($"Selected: {date:yyyy-MM-dd}");
}
```

### Programmatically Add Multiple Dates

```csharp
sfCalendar.SelectionMode = CalendarSelectionMode.Multiple;

// Add multiple dates
sfCalendar.SelectedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 10)));
sfCalendar.SelectedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 15)));
sfCalendar.SelectedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 20)));
sfCalendar.SelectedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 25)));
```

### Important Notes

- `SelectedDate` property holds the first date in the `SelectedDates` collection
- Setting `SelectedDate` in Multiple mode adds that date to `SelectedDates`
- `SelectedDate` value changes when the first date in the collection changes
- Users can select dates from different months/years by navigating

## Range Selection

Select a continuous range of dates. User clicks a start date, then clicks an end date. All dates in between are automatically selected.

### Enable Range Selection

**XAML:**
```xml
<calendar:SfCalendar Name="sfCalendar" 
                     SelectionMode="Range" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.SelectionMode = CalendarSelectionMode.Range;
```

### Access Selected Range

```csharp
// Get the range through SelectedDates collection
DateTimeOffsetCollection selectedDates = sfCalendar.SelectedDates;

if (selectedDates.Count > 0)
{
    DateTimeOffset startDate = selectedDates.First();
    DateTimeOffset endDate = selectedDates.Last();
    
    Console.WriteLine($"Range: {startDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd}");
    Console.WriteLine($"Total days selected: {selectedDates.Count}");
}
```

### Important Notes

- In Range mode, `SelectedDate` property is `null`
- `SelectedDates` collection contains all dates in the selected range (inclusive)
- User interaction: First click = start date, second click = end date
- Clicking a third time clears the range and starts a new selection

## Selection Changed Event

Get notified when the selected date changes through user interaction or programmatic update.

### Subscribe to Event

**XAML:**
```xml
<calendar:SfCalendar Name="sfCalendar"
                     SelectedDateChanged="SfCalendar_SelectedDateChanged" />
```

**C#:**
```csharp
sfCalendar.SelectedDateChanged += SfCalendar_SelectedDateChanged;

private void SfCalendar_SelectedDateChanged(object sender, SelectedDateChangedEventArgs e)
{
    DateTimeOffset? oldDate = e.OldDate;
    DateTimeOffset? newDate = e.NewDate;
    
    if (newDate.HasValue)
    {
        Console.WriteLine($"Selection changed from {oldDate} to {newDate.Value:yyyy-MM-dd}");
        
        // Perform validation or business logic
        ValidateSelectedDate(newDate.Value);
    }
    else
    {
        Console.WriteLine("Selection cleared");
    }
}
```

### Event Properties

| Property | Type | Description |
|----------|------|-------------|
| `OldDate` | DateTimeOffset? | Previously selected date (can be null) |
| `NewDate` | DateTimeOffset? | Currently selected date (can be null) |

### Use Cases for Event

- **Validation:** Check if selected date meets business rules
- **Cascade Updates:** Update other UI controls based on selection
- **Analytics:** Track user interactions
- **Synchronization:** Keep multiple calendars in sync

## Visual Customization

### Selection Highlight Mode

Control how selected dates and today's date are highlighted.

**Options:**
- `Outline` (default) - Border around the date
- `Filled` - Background fill for the date

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar" 
                     SelectionHighlightMode="Filled" />
```

**C#:**
```csharp
sfCalendar.SelectionHighlightMode = SelectionHighlightMode.Filled;
```

**Visual Difference:**
- **Outline:** Date has colored border, transparent background
- **Filled:** Date has colored background, contrasting text

### Selection Shape

Customize the shape of the selection indicator.

**Options:**
- `Circle` (default) - Circular selection indicator
- `Rectangle` - Rectangular selection indicator

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     SelectionShape="Rectangle" />
```

**C#:**
```csharp
sfCalendar.SelectionShape = SelectionShape.Rectangle;
```

### Combined Customization Example

```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     SelectionMode="Multiple"
                     SelectionHighlightMode="Filled"
                     SelectionShape="Rectangle" />
```

## Data Binding

Bind selected dates to a ViewModel for MVVM pattern support.

### ViewModel Setup

```csharp
using System.ComponentModel;
using Syncfusion.UI.Xaml.Calendar;

public class CalendarViewModel : INotifyPropertyChanged
{
    private DateTimeOffset? selectedDate;
    private DateTimeOffsetCollection selectedDates;
    
    public DateTimeOffset? SelectedDate
    {
        get => selectedDate;
        set
        {
            selectedDate = value;
            OnPropertyChanged(nameof(SelectedDate));
        }
    }
    
    public DateTimeOffsetCollection SelectedDates
    {
        get => selectedDates;
        set
        {
            selectedDates = value;
            OnPropertyChanged(nameof(SelectedDates));
        }
    }
    
    public CalendarViewModel()
    {
        // Initialize with default selections
        SelectedDate = DateTimeOffset.Now;
        
        SelectedDates = new DateTimeOffsetCollection();
        SelectedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 10)));
        SelectedDates.Add(new DateTimeOffset(new DateTime(2026, 3, 15)));
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

### XAML Binding (Single Selection)

```xml
<Grid>
    <Grid.DataContext>
        <local:CalendarViewModel />
    </Grid.DataContext>
    
    <calendar:SfCalendar 
        SelectionMode="Single"
        SelectedDate="{x:Bind ViewModel.SelectedDate, Mode=TwoWay}" />
</Grid>
```

### XAML Binding (Multiple Selection)

```xml
<Grid>
    <Grid.DataContext>
        <local:CalendarViewModel />
    </Grid.DataContext>
    
    <calendar:SfCalendar 
        SelectionMode="Multiple"
        SelectedDates="{x:Bind ViewModel.SelectedDates, Mode=TwoWay}" />
</Grid>
```

## Common Scenarios

### Scenario 1: Clear Selection

```csharp
// Single mode
sfCalendar.SelectedDate = null;

// Multiple/Range mode
sfCalendar.SelectedDates.Clear();
```

### Scenario 2: Pre-select Today

```csharp
sfCalendar.SelectedDate = DateTimeOffset.Now;
```

### Scenario 3: Select First Day of Month

```csharp
DateTime now = DateTime.Now;
DateTime firstDay = new DateTime(now.Year, now.Month, 1);
sfCalendar.SelectedDate = new DateTimeOffset(firstDay);
```

### Scenario 4: Select Last 7 Days (Multiple Mode)

```csharp
sfCalendar.SelectionMode = CalendarSelectionMode.Multiple;
sfCalendar.SelectedDates.Clear();

for (int i = 0; i < 7; i++)
{
    DateTimeOffset date = DateTimeOffset.Now.AddDays(-i);
    sfCalendar.SelectedDates.Add(date);
}
```

### Scenario 5: Validate Selection

```csharp
sfCalendar.SelectedDateChanged += (s, e) =>
{
    if (e.NewDate.HasValue)
    {
        // Only allow weekdays
        if (e.NewDate.Value.DayOfWeek == DayOfWeek.Saturday || 
            e.NewDate.Value.DayOfWeek == DayOfWeek.Sunday)
        {
            // Show error message
            ShowError("Please select a weekday");
            
            // Reset selection
            sfCalendar.SelectedDate = e.OldDate;
        }
    }
};
```

### Scenario 6: Sync Two Calendars

```csharp
calendar1.SelectedDateChanged += (s, e) =>
{
    calendar2.SelectedDate = e.NewDate;
};

calendar2.SelectedDateChanged += (s, e) =>
{
    calendar1.SelectedDate = e.NewDate;
};
```

## Best Practices

1. **Mode Selection:** Choose the appropriate `SelectionMode` based on your use case
2. **Null Handling:** Always check if `SelectedDate` has a value before accessing
3. **Collection Management:** Use `SelectedDates` for Multiple/Range modes instead of `SelectedDate`
4. **Event Handling:** Use `SelectedDateChanged` for validation and reactive updates
5. **Data Binding:** Use two-way binding with ViewModels for clean MVVM architecture
6. **Performance:** Avoid frequent programmatic selection changes during initialization

## Related Topics

- [Navigation](navigation.md) - Navigate between months, years, and views
- [Date Restrictions](date-restrictions.md) - Restrict selectable dates
- [Customization](customization.md) - Style selected dates with custom templates

## Code Examples

Download working samples:
- [Selection Examples on GitHub](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples/tree/main/Samples/Selection)

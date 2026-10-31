# Navigation Between Views for Calendar DateRange Picker

This guide covers view navigation, display mode restrictions, keyboard navigation, and selection strategies based on view restrictions.

## Table of Contents
- [View Navigation Overview](#view-navigation-overview)
- [Restricting Navigation Between Views](#restricting-navigation-between-views)
- [Selection Based on View Restriction](#selection-based-on-view-restriction)
- [Keyboard Navigation](#keyboard-navigation)

## View Navigation Overview

### Available Views

The CalendarDateRangePicker drop-down calendar supports four hierarchical views:

1. **Month View** (default) - Select specific dates within a month
2. **Year View** - Select months within a year
3. **Decade View** - Select years within a decade (10 years)
4. **Century View** - Select decades within a century (100 years)

### Navigating Between Views

Users can navigate between views by:

**Mouse/Touch:**
- Click the **header button** to move up one level (Month → Year → Decade → Century)
- Click a **cell** to move down one level (Century → Decade → Year → Month)
- Click **navigation arrows** (< >) to move within the current view

**Keyboard:**
- **Ctrl + Up Arrow** - Move up one view level
- **Ctrl + Down Arrow** - Move down one view level
- **Arrow keys** - Navigate between cells within current view
- **PageUp/PageDown** - Navigate between months/years/decades
- **Home/End** - Jump to first/last cell in current view

### View Hierarchy Example

```
Century View (2000-2099)
    ↓ Click decade
Decade View (2020-2029)
    ↓ Click year
Year View (2026)
    ↓ Click month
Month View (March 2026)
    ↓ Click dates
Date Range Selected
```

### Navigation in Code

While navigation is typically user-driven, you can control the initial display mode programmatically, but direct view manipulation during runtime is not supported through properties.

## Restricting Navigation Between Views

### MinDisplayMode and MaxDisplayMode

Restrict which views users can access using `MinDisplayMode` and `MaxDisplayMode` properties.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    MinDisplayMode="Month"
    MaxDisplayMode="Year" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.MinDisplayMode = CalendarDisplayMode.Month;
sfCalendarDateRangePicker.MaxDisplayMode = CalendarDisplayMode.Year;
```

**Default values:**
- `MinDisplayMode` = `Month`
- `MaxDisplayMode` = `Century`

### CalendarDisplayMode Enum

```csharp
public enum CalendarDisplayMode
{
    Month,   // Day-level selection
    Year,    // Month-level selection
    Decade,  // Year-level selection
    Century  // Decade-level selection
}
```

### Common Restriction Patterns

#### Pattern 1: Month Selection Only (Credit Card Expiry)

```csharp
// Restrict to Year and Month views only
sfCalendarDateRangePicker.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendarDateRangePicker.MaxDisplayMode = CalendarDisplayMode.Year;
sfCalendarDateRangePicker.DisplayDateFormat = "{0:MM/yyyy} - {1:MM/yyyy}";
```

**Use case:** Credit card expiration dates, fiscal periods

#### Pattern 2: Date Selection Only (No Year/Decade Navigation)

```csharp
// Only allow Month view
sfCalendarDateRangePicker.MinDisplayMode = CalendarDisplayMode.Month;
sfCalendarDateRangePicker.MaxDisplayMode = CalendarDisplayMode.Month;
```

**Use case:** Short-term date ranges, current month events

#### Pattern 3: Month to Year Navigation

```csharp
// Allow Month and Year views
sfCalendarDateRangePicker.MinDisplayMode = CalendarDisplayMode.Month;
sfCalendarDateRangePicker.MaxDisplayMode = CalendarDisplayMode.Year;
```

**Use case:** General date range selection with quick month navigation

#### Pattern 4: Year to Decade Navigation

```csharp
// Allow Year and Decade views only
sfCalendarDateRangePicker.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendarDateRangePicker.MaxDisplayMode = CalendarDisplayMode.Decade;
```

**Use case:** Multi-year planning, historical data selection

### Behavior When Restricted

When views are restricted:

1. **Header button disabled** - When at `MaxDisplayMode`, header becomes non-clickable
2. **Auto-navigation** - Selecting a cell automatically moves to the lowest available view
3. **Initial view** - Calendar opens at `MinDisplayMode`

### Example: Prevent Navigation Beyond Year

```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    MinDisplayMode="Month"
    MaxDisplayMode="Year"
    DisplayDateFormat="{}{0:MMM d, yyyy} - {1:MMM d, yyyy}" />
```

Result:
- Opens in Month view
- Header click navigates to Year view
- Header in Year view is disabled (can't go to Decade)
- Users select months, then dates within those months

## Selection Based on View Restriction

### Understanding View-Based Selection

When `MinDisplayMode` is set above `Month`, users select date ranges at the granularity of that view level.

### Month-Level Selection

**Configuration:**
```csharp
sfCalendarDateRangePicker.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendarDateRangePicker.MaxDisplayMode = CalendarDisplayMode.Decade;
sfCalendarDateRangePicker.DisplayDateFormat = "{0:MM/yyyy} - {1:MM/yyyy}";
```

**Behavior:**
- User selects **months**, not individual dates
- Start date = First day of start month
- End date = Last day of end month

**Example:**
```csharp
// User selects March 2026 to May 2026
// SelectedRange becomes:
// StartDate: March 1, 2026
// EndDate: May 31, 2026
```

### Year-Level Selection

**Configuration:**
```csharp
sfCalendarDateRangePicker.MinDisplayMode = CalendarDisplayMode.Decade;
sfCalendarDateRangePicker.MaxDisplayMode = CalendarDisplayMode.Century;
sfCalendarDateRangePicker.DisplayDateFormat = "{0:yyyy} - {1:yyyy}";
```

**Behavior:**
- User selects **years**, not months or dates
- Start date = January 1 of start year
- End date = December 31 of end year

**Example:**
```csharp
// User selects 2026 to 2028
// SelectedRange becomes:
// StartDate: January 1, 2026
// EndDate: December 31, 2028
```

### MinDate Interaction with View Selection

When `MinDisplayMode` is `Year` and `MinDate` is set, the selection starts from the minimum date, not the first day of the month.

**Example:**
```csharp
sfCalendarDateRangePicker.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendarDateRangePicker.MinDate = new DateTimeOffset(new DateTime(2026, 1, 15));

// User selects January 2026
// SelectedRange.StartDate = January 15, 2026 (not January 1)
```

### Complete Example: Month Range Selector

```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    MinDisplayMode="Year"
    MaxDisplayMode="Decade"
    DisplayDateFormat="{}{0:MMMM yyyy} - {1:MMMM yyyy}"
    PlaceholderText="Select month range" />
```

```csharp
// Handle selection
sfCalendarDateRangePicker.SelectedDateRangeChanged += (sender, e) =>
{
    if (e.RangeStartNewValue.HasValue && e.RangeEndNewValue.HasValue)
    {
        var start = e.RangeStartNewValue.Value;
        var end = e.RangeEndNewValue.Value;
        
        int monthCount = ((end.Year - start.Year) * 12) + (end.Month - start.Month) + 1;
        Debug.WriteLine($"Selected {monthCount} months");
    }
};
```

### Use Cases by Selection Level

**Date-level (MinDisplayMode = Month):**
- Hotel bookings
- Event scheduling
- Task deadlines
- Appointment ranges

**Month-level (MinDisplayMode = Year):**
- Quarterly reports
- Credit card validity
- Subscription periods
- Fiscal quarters

**Year-level (MinDisplayMode = Decade):**
- Academic periods
- Long-term contracts
- Multi-year projects
- Historical data analysis

## Keyboard Navigation

### Navigation Keys

The calendar supports comprehensive keyboard navigation for accessibility.

#### View Navigation

| Key Combination | Action |
|-----------------|--------|
| **Ctrl + Up Arrow** | Move to higher view (Month → Year → Decade → Century) |
| **Ctrl + Down Arrow** | Move to lower view (Century → Decade → Year → Month) |
| **Alt + Down Arrow** | Open drop-down calendar |
| **Escape** | Close drop-down calendar |

#### Cell Navigation

| Key | Action |
|-----|--------|
| **Arrow Keys** | Move between cells (dates, months, years, decades) |
| **Home** | Jump to first cell in current view |
| **End** | Jump to last cell in current view |
| **PageUp** | Navigate to previous period (month, year, decade) |
| **PageDown** | Navigate to next period (month, year, decade) |

#### Selection Keys

| Key | Action |
|-----|--------|
| **Space** or **Enter** | Select current cell / Confirm range |
| **Tab** | Move focus between calendar elements |
| **Shift + Tab** | Move focus backward |

### Keyboard Navigation Examples

#### Opening and Selecting with Keyboard

```
1. Press Alt + Down Arrow → Opens calendar
2. Use Arrow Keys → Navigate to start date
3. Press Space → Select start date
4. Use Arrow Keys → Navigate to end date
5. Press Space → Select end date
6. Calendar closes, range selected
```

#### Quick Month Navigation

```
1. Open calendar (Alt + Down)
2. Press Ctrl + Up → Switch to Year view
3. Use Arrow Keys → Navigate to desired month
4. Press Enter → Open that month
5. Select date range
```

#### Year-Level Navigation

```
1. Open calendar
2. Press Ctrl + Up → Year view
3. Press Ctrl + Up → Decade view
4. Press Ctrl + Up → Century view
5. Use Arrow Keys → Navigate decades
6. Press Enter → Select and drill down
```

### Keyboard Accessibility Best Practices

```csharp
// Ensure keyboard navigation is enabled
sfCalendarDateRangePicker.IsTabStop = true;
sfCalendarDateRangePicker.TabIndex = 0;

// Add keyboard event handlers for custom behavior
sfCalendarDateRangePicker.KeyDown += (sender, e) =>
{
    if (e.Key == Windows.System.VirtualKey.F4)
    {
        // F4 as alternative to open drop-down
        sfCalendarDateRangePicker.IsOpen = true;
    }
};
```

### Navigation Shortcuts Summary

**Quick Reference Card:**

```
Opening Calendar:
  Alt + ↓           Open drop-down

View Navigation:
  Ctrl + ↑          Move up (Month → Year → Decade → Century)
  Ctrl + ↓          Move down (Century → Decade → Year → Month)

Cell Navigation:
  ↑ ↓ ← →          Move between cells
  Home              First cell
  End               Last cell
  PageUp            Previous month/year/decade
  PageDown          Next month/year/decade

Selection:
  Space / Enter     Select cell
  Tab               Next element
  Shift + Tab       Previous element
  Escape            Close calendar
```

## Best Practices

1. **Match granularity to use case** - Use appropriate display modes for the level of precision needed
2. **Set appropriate display format** - Update `DisplayDateFormat` to match selection granularity
3. **Consider MinDate/MaxDate** - Be aware of how minimum dates affect view-based selection
4. **Test keyboard navigation** - Ensure all functionality is accessible via keyboard
5. **Provide visual feedback** - Make it clear which view users are in
6. **Document restrictions** - Inform users if certain navigation levels are disabled

## Common Issues and Solutions

### Issue: Can't navigate to higher views

**Problem:** Header button doesn't work.

**Solution:** Check `MaxDisplayMode` setting:
```csharp
// Allow navigation to Decade view
sfCalendarDateRangePicker.MaxDisplayMode = CalendarDisplayMode.Decade;
```

### Issue: Selection starts from wrong date

**Problem:** When selecting months, range starts mid-month.

**Solution:** This is correct behavior when `MinDate` is set. If you want selection from the first of the month, ensure `MinDate` is the first day:
```csharp
sfCalendarDateRangePicker.MinDate = new DateTimeOffset(new DateTime(2026, 1, 1));
```

### Issue: Keyboard navigation not working

**Problem:** Arrow keys don't navigate calendar cells.

**Solution:** Ensure calendar has focus:
```csharp
sfCalendarDateRangePicker.IsTabStop = true;
sfCalendarDateRangePicker.Focus(FocusState.Keyboard);
```

## Next Steps

- **Date Restrictions** - Learn how to restrict date ranges in [date-restrictions.md](date-restrictions.md)
- **Preset Items** - Add predefined date ranges in [preset-items.md](preset-items.md)
- **Week Numbers** - Display week numbers in [week-numbers.md](week-numbers.md)

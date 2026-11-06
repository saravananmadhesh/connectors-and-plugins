# Navigation Between Views

## Table of Contents
- [Overview](#overview)
- [Display Modes](#display-modes)
- [Navigation Between Views](#navigation-between-views)
- [View Restrictions](#view-restrictions)
- [Selection Based on View](#selection-based-on-view)
- [Keyboard Navigation](#keyboard-navigation)
- [Mouse Interaction](#mouse-interaction)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

The `SfCalendarDatePicker` supports multiple view modes for selecting dates at different levels of granularity. Users can navigate between month, year, decade, and century views to quickly select dates far in the past or future.

**View Hierarchy:**
1. **Month View** - Select specific day
2. **Year View** - Select specific month
3. **Decade View** - Select specific year
4. **Century View** - Select specific decade

## Display Modes

### Available Display Modes

```csharp
// Month view (default) - shows days of the month
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Month;

// Year view - shows months of the year
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Year;

// Decade view - shows years in a decade
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Decade;

// Century view - shows decades in a century
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Century;
```

**XAML:**
```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    DisplayMode="Month" />
```

### Month View

Displays the days of a specific month:

```csharp
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Month;
```

**Features:**
- Day-of-week headers (Sun, Mon, Tue, etc.)
- Current month dates
- Leading/trailing dates from adjacent months
- Today highlighting
- Selected date indication

### Year View

Displays the 12 months of a year:

```csharp
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Year;
```

**Use Case:** When users need to select a specific month (e.g., credit card expiry).

### Decade View

Displays years within a decade:

```csharp
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Decade;
```

**Use Case:** Selecting birth year or historical dates.

### Century View

Displays decades within a century:

```csharp
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Century;
```

**Use Case:** Selecting dates far in the past or future.

## Navigation Between Views

### Header Click Navigation

Users navigate between views by clicking the header:

1. Click header in **Month View** → navigates to **Year View**
2. Click header in **Year View** → navigates to **Decade View**
3. Click header in **Decade View** → navigates to **Century View**

### Programmatic Navigation

```csharp
// Navigate to year view
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Year;

// Navigate to decade view
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Decade;
```

### Auto-Navigation on Selection

When user selects an item, the calendar automatically navigates to the next lower view:

1. Select decade in **Century View** → navigates to **Decade View**
2. Select year in **Decade View** → navigates to **Year View**
3. Select month in **Year View** → navigates to **Month View**
4. Select day in **Month View** → closes drop-down (unless ShowSubmitButtons="True")

## View Restrictions

Limit navigation to specific view ranges using `MinDisplayMode` and `MaxDisplayMode`.

### MinDisplayMode

Sets the minimum (most detailed) view:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDisplayMode="Month" />
```

```csharp
// Users cannot navigate below month view
sfCalendarDatePicker.MinDisplayMode = CalendarDisplayMode.Month;

// Users cannot navigate below year view
sfCalendarDatePicker.MinDisplayMode = CalendarDisplayMode.Year;
```

**Default:** `Month`

### MaxDisplayMode

Sets the maximum (least detailed) view:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MaxDisplayMode="Decade" />
```

```csharp
// Users cannot navigate above decade view
sfCalendarDatePicker.MaxDisplayMode = CalendarDisplayMode.Decade;

// Users cannot navigate above year view
sfCalendarDatePicker.MaxDisplayMode = CalendarDisplayMode.Year;
```

**Default:** `Century`

### Combined Restrictions

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDisplayMode="Month"
    MaxDisplayMode="Decade"
    DisplayMode="Month" />
```

```csharp
sfCalendarDatePicker.MinDisplayMode = CalendarDisplayMode.Month;
sfCalendarDatePicker.MaxDisplayMode = CalendarDisplayMode.Decade;
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Month;
```

**Result:** Users can navigate between Month, Year, and Decade views only (Century view blocked).

## Selection Based on View

Restrict selection granularity for specific use cases.

### Credit Card Expiry Date (Month/Year Only)

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDisplayMode="Year"
    MaxDisplayMode="Decade"
    DisplayDateFormat="MM/yyyy" />
```

```csharp
// Only allow month and year selection
sfCalendarDatePicker.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendarDatePicker.MaxDisplayMode = CalendarDisplayMode.Decade;
sfCalendarDatePicker.DisplayDateFormat = "MM/yyyy";
```

**Behavior:**
- Opens in Year view
- User selects month
- Selection closes drop-down (no day selection)
- Editor displays: "03/2024"

### Birth Year Selection (Year Only)

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDisplayMode="Decade"
    MaxDisplayMode="Century"
    DisplayDateFormat="yyyy" />
```

```csharp
// Only allow year selection
sfCalendarDatePicker.MinDisplayMode = CalendarDisplayMode.Decade;
sfCalendarDatePicker.MaxDisplayMode = CalendarDisplayMode.Century;
sfCalendarDatePicker.DisplayDateFormat = "yyyy";
```

**Behavior:**
- Opens in Decade view
- User selects year
- Selection closes drop-down
- Editor displays: "1995"

### Quarter Selection

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDisplayMode="Year"
    MaxDisplayMode="Year"
    DisplayDateFormat="'Q'Q yyyy" />
```

```csharp
// Year view only
sfCalendarDatePicker.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendarDatePicker.MaxDisplayMode = CalendarDisplayMode.Year;
```

**Result:** User can only view and select from year view.

## Keyboard Navigation

Navigate the calendar efficiently using keyboard shortcuts.

### Navigation Shortcuts

| Shortcut | Action |
|----------|--------|
| **Tab** / **Shift+Tab** | Navigate between date cells and header elements |
| **Arrow Keys** | Navigate between calendar cells (dates, months, years) |
| **UpArrow** | Move up one row |
| **DownArrow** | Move down one row |
| **LeftArrow** | Move left one cell |
| **RightArrow** | Move right one cell |
| **Space** / **Enter** | Select current cell |
| **Ctrl+UpArrow** | Navigate up one view level (Month → Year → Decade → Century) |
| **Ctrl+DownArrow** | Navigate down one view level (Century → Decade → Year → Month) |
| **PageUp** | Previous month/year/decade (depending on current view) |
| **PageDown** | Next month/year/decade (depending on current view) |
| **Home** | Navigate to first cell in current view |
| **End** | Navigate to last cell in current view |
| **Alt+DownArrow** | Open drop-down calendar |
| **Esc** | Close drop-down calendar |

### Example: Navigate to Specific Date

```
1. Alt+DownArrow     → Open calendar (Month view)
2. Ctrl+UpArrow      → Navigate to Year view
3. Ctrl+UpArrow      → Navigate to Decade view
4. Arrow keys        → Navigate to desired year
5. Enter             → Select year (returns to Year view)
6. Arrow keys        → Navigate to desired month
7. Enter             → Select month (returns to Month view)
8. Arrow keys        → Navigate to desired day
9. Enter             → Select day (closes calendar)
```

### Fast Navigation Example

```
1. Alt+DownArrow     → Open calendar
2. Ctrl+UpArrow×2    → Navigate to Decade view
3. PageUp/PageDown   → Navigate between decades quickly
4. Enter             → Select decade
5. Enter             → Select year
6. Enter             → Select month
7. Enter             → Select day
```

## Mouse Interaction

### Click Navigation

- **Click header** - Navigate to next higher view
- **Click cell** - Select item and navigate to next lower view (or close if in Month view)
- **Click navigation arrows** - Navigate to previous/next period

### Scroll Interaction

On devices with scroll wheels:
- **Scroll in calendar** - Navigate between periods (months, years, etc.)

## Common Patterns

### Pattern 1: Full Date Selection

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDisplayMode="Month"
    MaxDisplayMode="Century"
    DisplayMode="Month" />
```

**Use Case:** Standard date selection with full navigation.

### Pattern 2: Recent Dates Only

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDisplayMode="Month"
    MaxDisplayMode="Year"
    DisplayMode="Month" />
```

**Use Case:** Selecting dates within the current or nearby years (appointments, bookings).

### Pattern 3: Historical Date Selection

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDisplayMode="Month"
    MaxDisplayMode="Century"
    DisplayMode="Decade" />
```

**Use Case:** Birth dates, historical events - start with decade view for faster navigation to past dates.

### Pattern 4: Month Picker

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDisplayMode="Year"
    MaxDisplayMode="Year"
    DisplayDateFormat="MMMM yyyy" />
```

**Use Case:** Reports, subscriptions - select month without specific day.

### Pattern 5: Year Picker

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MinDisplayMode="Decade"
    MaxDisplayMode="Decade"
    DisplayDateFormat="yyyy" />
```

**Use Case:** Year-based data, graduation year, vehicle year.

## Troubleshooting

### Issue: Cannot navigate to specific view

**Solution:** Check MinDisplayMode and MaxDisplayMode restrictions:

```csharp
// If MaxDisplayMode is Year, cannot reach Decade or Century
sfCalendarDatePicker.MaxDisplayMode = CalendarDisplayMode.Decade; // Allow up to Decade
```

### Issue: Selection not working in Year view

**Solution:** Ensure MinDisplayMode allows selection at year level:

```csharp
// To select months, MinDisplayMode must be Year or higher
sfCalendarDatePicker.MinDisplayMode = CalendarDisplayMode.Year;
```

### Issue: Calendar opens in wrong view

**Solution:** Set DisplayMode to desired initial view:

```csharp
// Open directly in Year view
sfCalendarDatePicker.DisplayMode = CalendarDisplayMode.Year;
```

### Issue: Keyboard shortcuts not working

**Solution:** Ensure control has focus:

```csharp
sfCalendarDatePicker.Focus(FocusState.Keyboard);
```

### Issue: Cannot select past/future dates

**Solution:** Check MinDate and MaxDate restrictions:

```csharp
// Ensure date range allows desired dates
sfCalendarDatePicker.MinDate = new DateTimeOffset(new DateTime(1900, 1, 1));
sfCalendarDatePicker.MaxDate = new DateTimeOffset(new DateTime(2100, 12, 31));
```

### Issue: DisplayDateFormat doesn't match selection level

**Solution:** Match format to selection level:

```csharp
// For month/year selection
sfCalendarDatePicker.MinDisplayMode = CalendarDisplayMode.Year;
sfCalendarDatePicker.DisplayDateFormat = "MM/yyyy"; // Match format

// For year-only selection
sfCalendarDatePicker.MinDisplayMode = CalendarDisplayMode.Decade;
sfCalendarDatePicker.DisplayDateFormat = "yyyy"; // Match format
```

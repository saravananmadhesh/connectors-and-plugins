# Localization and Formatting

## Table of Contents
- [Overview](#overview)
- [Calendar Types](#calendar-types)
- [Language Localization](#language-localization)
- [Editor Display Format](#editor-display-format)
- [Calendar Display Formats](#calendar-display-formats)
- [First Day of Week](#first-day-of-week)
- [Number of Weeks in View](#number-of-weeks-in-view)
- [Format Examples](#format-examples)
- [Troubleshooting](#troubleshooting)

## Overview

The `SfCalendarDatePicker` supports multiple calendar systems, languages, and date formats to accommodate global users. You can customize how dates are displayed in both the text editor and drop-down calendar.

**Localization Features:**
- Multiple calendar systems (Gregorian, Hebrew, Hijri, etc.)
- Language-specific formatting
- Customizable date formats
- Culture-specific day/week settings
- RTL (Right-to-Left) support

## Calendar Types

Change the calendar system using the `CalendarIdentifier` property.

### Supported Calendar Systems

```csharp
// Gregorian (default)
sfCalendarDatePicker.CalendarIdentifier = "GregorianCalendar";

// Hebrew
sfCalendarDatePicker.CalendarIdentifier = "HebrewCalendar";

// Hijri (Islamic)
sfCalendarDatePicker.CalendarIdentifier = "HijriCalendar";

// Korean
sfCalendarDatePicker.CalendarIdentifier = "KoreanCalendar";

// Taiwan
sfCalendarDatePicker.CalendarIdentifier = "TaiwanCalendar";

// Thai
sfCalendarDatePicker.CalendarIdentifier = "ThaiCalendar";

// UmAlQura (Saudi Arabia)
sfCalendarDatePicker.CalendarIdentifier = "UmAlQuraCalendar";

// Persian
sfCalendarDatePicker.CalendarIdentifier = "PersianCalendar";

// Julian
sfCalendarDatePicker.CalendarIdentifier = "JulianCalendar";
```

**XAML:**
```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    CalendarIdentifier="HebrewCalendar" />
```

### Calendar-Specific Behavior

**Hebrew Calendar Example:**
```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    CalendarIdentifier="HebrewCalendar"
    Language="he-IL" />
```

**Hijri Calendar Example:**
```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    CalendarIdentifier="HijriCalendar"
    Language="ar-SA" />
```

### Flow Direction

The control automatically updates flow direction based on `CalendarIdentifier`:

```csharp
// Hebrew calendar automatically sets RTL
sfCalendarDatePicker.CalendarIdentifier = "HebrewCalendar";
// FlowDirection is automatically set to RightToLeft
```

**Note:** When both `CalendarIdentifier` and `FlowDirection` are set, `FlowDirection` takes precedence.

**Important:** Japanese and Lunar type calendars are not supported.

## Language Localization

Set the language for culture-specific display using the `Language` property.

### Setting Language

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    Language="ar-SA" />
```

```csharp
// Arabic
sfCalendarDatePicker.Language = "ar-SA";

// French
sfCalendarDatePicker.Language = "fr-FR";

// German
sfCalendarDatePicker.Language = "de-DE";

// Spanish
sfCalendarDatePicker.Language = "es-ES";

// Japanese
sfCalendarDatePicker.Language = "ja-JP";

// Chinese (Simplified)
sfCalendarDatePicker.Language = "zh-CN";
```

**Default:** `en-US`

### Language with Calendar Type

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    CalendarIdentifier="HebrewCalendar"
    Language="he-IL" />
```

### RTL Support

RTL languages automatically adjust text direction:

```csharp
// Arabic with RTL
sfCalendarDatePicker.Language = "ar-SA";
sfCalendarDatePicker.CalendarIdentifier = "HijriCalendar";
```

## Editor Display Format

Control how the selected date appears in the text editor using `DisplayDateFormat`.

### Standard Format Strings

```csharp
// Short date (default)
sfCalendarDatePicker.DisplayDateFormat = "d";        // 3/15/2024

// Long date
sfCalendarDatePicker.DisplayDateFormat = "D";        // Friday, March 15, 2024

// Month and day
sfCalendarDatePicker.DisplayDateFormat = "M";        // March 15

// Month and year
sfCalendarDatePicker.DisplayDateFormat = "Y";        // March 2024

// Full date and time
sfCalendarDatePicker.DisplayDateFormat = "F";        // Friday, March 15, 2024 12:00:00 AM
```

### Custom Format Patterns

```csharp
// MM/dd/yyyy
sfCalendarDatePicker.DisplayDateFormat = "MM/dd/yyyy";   // 03/15/2024

// dd-MM-yyyy
sfCalendarDatePicker.DisplayDateFormat = "dd-MM-yyyy";   // 15-03-2024

// yyyy/MM/dd (ISO format)
sfCalendarDatePicker.DisplayDateFormat = "yyyy/MM/dd";   // 2024/03/15

// Month name with year
sfCalendarDatePicker.DisplayDateFormat = "MMMM yyyy";    // March 2024

// Short month with day and year
sfCalendarDatePicker.DisplayDateFormat = "MMM dd, yyyy"; // Mar 15, 2024
```

**XAML:**
```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    DisplayDateFormat="MM/dd/yyyy" />
```

## Calendar Display Formats

Customize how dates, months, and day names appear in the drop-down calendar.

### DayFormat

Format for day numbers in the calendar:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    DayFormat="{}{day.integer(2)}" />
```

```csharp
// Two-digit day
sfCalendarDatePicker.DayFormat = "{day.integer(2)}";     // 01, 02, ..., 31

// Single-digit day
sfCalendarDatePicker.DayFormat = "{day.integer}";        // 1, 2, ..., 31
```

### MonthFormat

Format for month names in year view:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MonthFormat="{}{month.full}" />
```

```csharp
// Full month name
sfCalendarDatePicker.MonthFormat = "{month.full}";           // January, February

// Abbreviated month name
sfCalendarDatePicker.MonthFormat = "{month.abbreviated}";    // Jan, Feb

// Abbreviated (3 characters)
sfCalendarDatePicker.MonthFormat = "{month.abbreviated(3)}"; // Jan, Feb

// Month number
sfCalendarDatePicker.MonthFormat = "{month.integer}";        // 1, 2
```

### DayOfWeekFormat

Format for day-of-week headers:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    DayOfWeekFormat="{}{dayofweek.abbreviated(3)}" />
```

```csharp
// Abbreviated (3 characters)
sfCalendarDatePicker.DayOfWeekFormat = "{dayofweek.abbreviated(3)}"; // Mon, Tue

// Full day name
sfCalendarDatePicker.DayOfWeekFormat = "{dayofweek.full}";           // Monday, Tuesday

// Single character
sfCalendarDatePicker.DayOfWeekFormat = "{dayofweek.solo.abbreviated(1)}"; // M, T

// Two characters
sfCalendarDatePicker.DayOfWeekFormat = "{dayofweek.abbreviated(2)}"; // Mo, Tu
```

### MonthHeaderFormat

Format for the month/year header in month view:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    MonthHeaderFormat="{}{month.abbreviated} {year.abbreviated}‎" />
```

```csharp
// Abbreviated month and year
sfCalendarDatePicker.MonthHeaderFormat = "{month.abbreviated} {year.abbreviated}‎"; // Mar 24

// Full month and year
sfCalendarDatePicker.MonthHeaderFormat = "{month.full} {year.full}";               // March 2024

// Month/Year numeric
sfCalendarDatePicker.MonthHeaderFormat = "{month.integer}/{year.abbreviated}";     // 3/24
```

### Combined Format Example

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    DayFormat="{}{day.integer(2)}"
    MonthFormat="{}{month.full}"
    DayOfWeekFormat="{}{dayofweek.abbreviated(3)}"
    MonthHeaderFormat="{}{month.abbreviated} {year.abbreviated}‎" />
```

### DateTimeFormatter Reference

For more formatting options, see [Microsoft DateTimeFormatter documentation](https://docs.microsoft.com/en-us/uwp/api/windows.globalization.datetimeformatting.datetimeformatter).

**Common Patterns:**
- `{day.integer}` - Day number
- `{month.integer}` - Month number
- `{year.full}` - Full year (2024)
- `{year.abbreviated}` - Abbreviated year (24)
- `{dayofweek.full}` - Full day name
- `{dayofweek.abbreviated(n)}` - Abbreviated day name (n chars)
- `{month.full}` - Full month name
- `{month.abbreviated(n)}` - Abbreviated month name (n chars)

## First Day of Week

Set which day starts the week in the calendar.

### Setting First Day

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    FirstDayOfWeek="Monday" />
```

```csharp
// Monday
sfCalendarDatePicker.FirstDayOfWeek = DayOfWeek.Monday;

// Sunday (default)
sfCalendarDatePicker.FirstDayOfWeek = DayOfWeek.Sunday;

// Saturday (common in Middle East)
sfCalendarDatePicker.FirstDayOfWeek = DayOfWeek.Saturday;
```

**Default:** `Sunday`

### Cultural Considerations

Different regions have different conventions:
- **USA, Japan:** Sunday
- **Most of Europe:** Monday
- **Middle East:** Saturday

```csharp
// European convention
sfCalendarDatePicker.FirstDayOfWeek = DayOfWeek.Monday;
sfCalendarDatePicker.Language = "de-DE";

// Middle Eastern convention
sfCalendarDatePicker.FirstDayOfWeek = DayOfWeek.Saturday;
sfCalendarDatePicker.Language = "ar-SA";
```

## Number of Weeks in View

Control how many weeks are shown in month view.

### NumberOfWeeksInView

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    NumberOfWeeksInView="4" />
```

```csharp
// Show 4 weeks (compact)
sfCalendarDatePicker.NumberOfWeeksInView = 4;

// Show 6 weeks (default, full month)
sfCalendarDatePicker.NumberOfWeeksInView = 6;

// Show 5 weeks
sfCalendarDatePicker.NumberOfWeeksInView = 5;
```

**Default:** `6`

**Use Cases:**
- `4` - Compact calendar for limited space
- `5` - Balanced view
- `6` - Full month coverage (ensures all dates visible)

## Format Examples

### Example 1: US Format

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    CalendarIdentifier="GregorianCalendar"
    Language="en-US"
    DisplayDateFormat="MM/dd/yyyy"
    FirstDayOfWeek="Sunday"
    DayOfWeekFormat="{}{dayofweek.abbreviated(3)}"
    MonthHeaderFormat="{}{month.full} {year.full}" />
```

### Example 2: European Format

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    CalendarIdentifier="GregorianCalendar"
    Language="de-DE"
    DisplayDateFormat="dd.MM.yyyy"
    FirstDayOfWeek="Monday"
    DayOfWeekFormat="{}{dayofweek.abbreviated(2)}"
    MonthHeaderFormat="{}{month.full} {year.full}" />
```

### Example 3: Middle Eastern Format

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    CalendarIdentifier="HijriCalendar"
    Language="ar-SA"
    DisplayDateFormat="dd/MM/yyyy"
    FirstDayOfWeek="Saturday"
    DayOfWeekFormat="{}{dayofweek.abbreviated(3)}"
    MonthHeaderFormat="{}{month.full} {year.full}" />
```

### Example 4: ISO 8601 Format

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    CalendarIdentifier="GregorianCalendar"
    Language="en-US"
    DisplayDateFormat="yyyy-MM-dd"
    FirstDayOfWeek="Monday"
    DayOfWeekFormat="{}{dayofweek.abbreviated(3)}"
    MonthHeaderFormat="{}{year.full}-{month.integer(2)}" />
```

### Example 5: Japanese Format

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    CalendarIdentifier="GregorianCalendar"
    Language="ja-JP"
    DisplayDateFormat="yyyy年MM月dd日"
    FirstDayOfWeek="Sunday"
    DayOfWeekFormat="{}{dayofweek.abbreviated(1)}"
    MonthHeaderFormat="{}{year.full}年{month.integer}月" />
```

## Troubleshooting

### Issue: Calendar type not changing

**Solution:** Ensure CalendarIdentifier string matches exactly:

```csharp
// Correct
sfCalendarDatePicker.CalendarIdentifier = "HebrewCalendar";

// Incorrect
sfCalendarDatePicker.CalendarIdentifier = "Hebrew"; // Won't work
```

### Issue: Language not affecting display

**Solution:** Set both Language and CalendarIdentifier for proper localization:

```csharp
sfCalendarDatePicker.Language = "ar-SA";
sfCalendarDatePicker.CalendarIdentifier = "HijriCalendar";
```

### Issue: Format string not working

**Solution:** Use proper format syntax with curly braces:

```csharp
// Correct
sfCalendarDatePicker.DayFormat = "{day.integer(2)}";

// Incorrect
sfCalendarDatePicker.DayFormat = "day.integer(2)"; // Missing braces
```

### Issue: RTL not applying

**Solution:** Set CalendarIdentifier or explicitly set FlowDirection:

```csharp
// Option 1: CalendarIdentifier sets RTL automatically
sfCalendarDatePicker.CalendarIdentifier = "HebrewCalendar";

// Option 2: Explicit FlowDirection
sfCalendarDatePicker.FlowDirection = FlowDirection.RightToLeft;
```

### Issue: DisplayDateFormat not matching input

**Solution:** Ensure format matches expected input pattern and use EditMode appropriately:

```csharp
sfCalendarDatePicker.DisplayDateFormat = "MM/dd/yyyy";
sfCalendarDatePicker.EditMode = DateTimeEditMode.Mask; // For field-by-field input
```

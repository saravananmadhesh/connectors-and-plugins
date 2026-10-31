# Localization and Formatting for Calendar DateRange Picker

This guide covers calendar types, language localization, date formatting options, and right-to-left (RTL) support.

## Table of Contents
- [Calendar Types](#calendar-types)
- [Language Localization](#language-localization)
- [Editor Display Format](#editor-display-format)
- [Calendar Display Formats](#calendar-display-formats)
- [First Day of Week](#first-day-of-week)
- [Flow Direction (RTL Support)](#flow-direction-rtl-support)

## Calendar Types

### CalendarIdentifier Property

The `CalendarIdentifier` property supports different calendar systems beyond the standard Gregorian calendar.

**Available Calendar Types:**
- `GregorianCalendar` (default)
- `JulianCalendar`
- `HebrewCalendar`
- `HijriCalendar`
- `KoreanCalendar`
- `TaiwanCalendar`
- `ThaiCalendar`
- `UmAlQuraCalendar`
- `PersianCalendar`

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    CalendarIdentifier="HebrewCalendar" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.CalendarIdentifier = "HebrewCalendar";
```

### Calendar Type Examples

#### Hebrew Calendar

```csharp
sfCalendarDateRangePicker.CalendarIdentifier = "HebrewCalendar";
sfCalendarDateRangePicker.Language = "he-IL";
```

#### Hijri Calendar

```csharp
sfCalendarDateRangePicker.CalendarIdentifier = "HijriCalendar";
sfCalendarDateRangePicker.Language = "ar-SA";
```

#### Persian Calendar

```csharp
sfCalendarDateRangePicker.CalendarIdentifier = "PersianCalendar";
sfCalendarDateRangePicker.Language = "fa-IR";
```

#### Thai Buddhist Calendar

```csharp
sfCalendarDateRangePicker.CalendarIdentifier = "ThaiCalendar";
sfCalendarDateRangePicker.Language = "th-TH";
```

### Automatic Flow Direction

When you set `CalendarIdentifier`, the control automatically updates the flow direction:
- **Right-to-left (RTL)** calendars: Hebrew, Hijri, Persian
- **Left-to-right (LTR)** calendars: Gregorian, Julian, Korean, Thai

**Note:** You can override automatic flow direction by explicitly setting the `FlowDirection` property.

### Unsupported Calendar Types

The following calendar types are **not supported**:
- Japanese Calendar
- Lunar Calendar

## Language Localization

### Language Property

Change the display language using the `Language` property. This affects day names, month names, and other localized text.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    Language="ar-AR" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.Language = "ar-AR";
```

**Default value:** `en-US`

### Common Language Codes

| Language | Code | Example |
|----------|------|---------|
| English (US) | `en-US` | January, Monday |
| Arabic | `ar-AR` | يناير، الإثنين |
| French | `fr-FR` | Janvier, Lundi |
| German | `de-DE` | Januar, Montag |
| Spanish | `es-ES` | Enero, Lunes |
| Japanese | `ja-JP` | 1月、月曜日 |
| Chinese (Simplified) | `zh-CN` | 一月，星期一 |
| Russian | `ru-RU` | Январь, Понедельник |
| Hebrew | `he-IL` | ינואר, יום שני |
| Hindi | `hi-IN` | जनवरी, सोमवार |

### Multi-Language Example

```csharp
// French localization
sfCalendarDateRangePicker.Language = "fr-FR";
sfCalendarDateRangePicker.CalendarIdentifier = "GregorianCalendar";
sfCalendarDateRangePicker.DisplayDateFormat = "{0:D} - {1:D}";
// Output: "Samedi 1 mars 2026 - Dimanche 15 mars 2026"

// Arabic localization with Hijri calendar
sfCalendarDateRangePicker.Language = "ar-SA";
sfCalendarDateRangePicker.CalendarIdentifier = "HijriCalendar";
// Automatically switches to RTL layout
```

## Editor Display Format

### DisplayDateFormat Property

Customize how the selected date range appears in the editor using the `DisplayDateFormat` property.

**Format pattern:** `{0}` = Start Date, `{1}` = End Date

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    DisplayDateFormat="{}{0:D} - {1:D}" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.DisplayDateFormat = "{0:D} - {1:D}";
```

**Default value:** `{0:d}-{1:d}`

### Standard Date Format Specifiers

| Specifier | Description | Example (en-US) |
|-----------|-------------|-----------------|
| `d` | Short date | 3/1/2026 |
| `D` | Long date | Saturday, March 1, 2026 |
| `M` or `m` | Month day | March 1 |
| `Y` or `y` | Year month | March 2026 |
| `f` | Full date, short time | Saturday, March 1, 2026 12:00 AM |
| `F` | Full date, long time | Saturday, March 1, 2026 12:00:00 AM |
| `g` | General date, short time | 3/1/2026 12:00 AM |
| `G` | General date, long time | 3/1/2026 12:00:00 AM |

### Custom Format Examples

```csharp
// Short date format
sfCalendarDateRangePicker.DisplayDateFormat = "{0:d} - {1:d}";
// Output: "3/1/2026 - 3/15/2026"

// Long date format
sfCalendarDateRangePicker.DisplayDateFormat = "{0:D} - {1:D}";
// Output: "Saturday, March 1, 2026 - Sunday, March 15, 2026"

// Month and year only
sfCalendarDateRangePicker.DisplayDateFormat = "{0:MMM yyyy} - {1:MMM yyyy}";
// Output: "Mar 2026 - Mar 2026"

// Custom format with separators
sfCalendarDateRangePicker.DisplayDateFormat = "From {0:MM/dd/yyyy} to {1:MM/dd/yyyy}";
// Output: "From 03/01/2026 to 03/15/2026"

// Day name and short date
sfCalendarDateRangePicker.DisplayDateFormat = "{0:ddd, M/d} - {1:ddd, M/d}";
// Output: "Sat, 3/1 - Sun, 3/15"
```

### Custom Date Format Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `d` | Day (1-31) | 1 |
| `dd` | Day (01-31) | 01 |
| `ddd` | Abbreviated day name | Sat |
| `dddd` | Full day name | Saturday |
| `M` | Month (1-12) | 3 |
| `MM` | Month (01-12) | 03 |
| `MMM` | Abbreviated month | Mar |
| `MMMM` | Full month name | March |
| `yy` | Year (00-99) | 26 |
| `yyyy` | Year (full) | 2026 |

## Calendar Display Formats

### Format Properties Overview

Customize the appearance of dates within the drop-down calendar:

- **DayFormat** - Day numbers in month view
- **MonthFormat** - Month names in year view
- **DayOfWeekFormat** - Day-of-week headers (Sun, Mon, etc.)
- **MonthHeaderFormat** - Month/year header in calendar

### DayFormat Property

Format day numbers in the calendar's month view.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    DayFormat="{}{day.integer(2)}" />
```

**C#:**
```csharp
sfCalendarDateRangePicker.DayFormat = "{day.integer(2)}";
```

**Format Options:**
- `{day.integer}` - Day without leading zero (1, 2, ..., 31)
- `{day.integer(2)}` - Day with leading zero (01, 02, ..., 31)

### MonthFormat Property

Format month names in the calendar's year view.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    MonthFormat="{}{month.full}" />
```

**C#:**
```csharp
sfCalendarDateRangePicker.MonthFormat = "{month.full}";
```

**Format Options:**
- `{month.abbreviated}` - Abbreviated month (Jan, Feb, Mar)
- `{month.abbreviated(3)}` - 3-letter month (Jan, Feb, Mar)
- `{month.full}` - Full month name (January, February, March)
- `{month.numeric}` - Month number (1, 2, 3)
- `{month.numeric(2)}` - Month number with leading zero (01, 02, 03)

### DayOfWeekFormat Property

Format day-of-week names in the calendar header.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    DayOfWeekFormat="{}{dayofweek.abbreviated(3)}" />
```

**C#:**
```csharp
sfCalendarDateRangePicker.DayOfWeekFormat = "{dayofweek.abbreviated(3)}";
```

**Format Options:**
- `{dayofweek.solo.abbreviated}` - Single letter (S, M, T, W, T, F, S)
- `{dayofweek.abbreviated(1)}` - Single letter (S, M, T, W, T, F, S)
- `{dayofweek.abbreviated(2)}` - Two letters (Su, Mo, Tu, We, Th, Fr, Sa)
- `{dayofweek.abbreviated(3)}` - Three letters (Sun, Mon, Tue, Wed, Thu, Fri, Sat)
- `{dayofweek.full}` - Full name (Sunday, Monday, Tuesday, etc.)

### MonthHeaderFormat Property

Format the month/year header in the calendar.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    MonthHeaderFormat="{}{month.abbreviated} {year.abbreviated}‎" />
```

**C#:**
```csharp
sfCalendarDateRangePicker.MonthHeaderFormat = "{month.abbreviated} {year.abbreviated}‎";
```

**Format Options:**
- `{month.full} {year.full}` - March 2026
- `{month.abbreviated} {year.full}` - Mar 2026
- `{month.numeric}/{year.full}` - 03/2026
- `{month.abbreviated} '{year.abbreviated}` - Mar '26

### Complete Formatting Example

```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    DayFormat="{}{day.integer(2)}"
    MonthFormat="{}{month.full}"
    DayOfWeekFormat="{}{dayofweek.abbreviated(3)}"
    MonthHeaderFormat="{}{month.abbreviated} {year.abbreviated}‎"
    DisplayDateFormat="{}{0:D} - {1:D}" />
```

**C#:**
```csharp
sfCalendarDateRangePicker.DayFormat = "{day.integer(2)}";
sfCalendarDateRangePicker.MonthFormat = "{month.full}";
sfCalendarDateRangePicker.DayOfWeekFormat = "{dayofweek.abbreviated(3)}";
sfCalendarDateRangePicker.MonthHeaderFormat = "{month.abbreviated} {year.abbreviated}‎";
sfCalendarDateRangePicker.DisplayDateFormat = "{0:D} - {1:D}";
```

### Compact Format Pattern

```csharp
// Minimal space usage
sfCalendarDateRangePicker.DayFormat = "{day.integer}";
sfCalendarDateRangePicker.MonthFormat = "{month.abbreviated(3)}";
sfCalendarDateRangePicker.DayOfWeekFormat = "{dayofweek.abbreviated(1)}";
sfCalendarDateRangePicker.MonthHeaderFormat = "{month.abbreviated} '{year.abbreviated}";
```

### Verbose Format Pattern

```csharp
// Maximum detail
sfCalendarDateRangePicker.DayFormat = "{day.integer(2)}";
sfCalendarDateRangePicker.MonthFormat = "{month.full}";
sfCalendarDateRangePicker.DayOfWeekFormat = "{dayofweek.full}";
sfCalendarDateRangePicker.MonthHeaderFormat = "{month.full} {year.full}";
```

## First Day of Week

### FirstDayOfWeek Property

Change which day appears first in the calendar's week display.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    FirstDayOfWeek="Monday" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Monday;
```

**Default value:** `Sunday`

### FirstDayOfWeek Options

```csharp
public enum FirstDayOfWeek
{
    Sunday,    // 0 - Default for US
    Monday,    // 1 - ISO 8601 standard, common in Europe
    Tuesday,   // 2
    Wednesday, // 3
    Thursday,  // 4
    Friday,    // 5
    Saturday   // 6 - Common in Middle East
}
```

### Regional Examples

```csharp
// United States, Canada
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Sunday;

// Most of Europe, ISO 8601 standard
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Monday;

// Some Middle Eastern countries
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Saturday;
```

### Use Cases

- **Business applications** - Monday start for work-week alignment
- **Religious calendars** - Saturday/Sunday based on religious practices
- **International apps** - Match user's cultural expectations
- **ISO compliance** - Monday start for ISO 8601 standard

## Flow Direction (RTL Support)

### FlowDirection Property

Control the layout direction for right-to-left (RTL) languages.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    FlowDirection="RightToLeft" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.FlowDirection = FlowDirection.RightToLeft;
```

**Options:**
- `LeftToRight` (default) - Standard left-to-right layout
- `RightToLeft` - Reversed layout for RTL languages

### Automatic vs Manual Flow Direction

**Automatic (based on CalendarIdentifier):**
```csharp
// Automatically sets RTL
sfCalendarDateRangePicker.CalendarIdentifier = "HebrewCalendar";
// FlowDirection automatically becomes RightToLeft
```

**Manual Override:**
```csharp
// Explicitly set flow direction (overrides automatic)
sfCalendarDateRangePicker.CalendarIdentifier = "HebrewCalendar";
sfCalendarDateRangePicker.FlowDirection = FlowDirection.LeftToRight;
// Hebrew calendar, but LTR layout
```

### RTL Language Examples

#### Arabic with Hijri Calendar

```csharp
sfCalendarDateRangePicker.CalendarIdentifier = "HijriCalendar";
sfCalendarDateRangePicker.Language = "ar-SA";
sfCalendarDateRangePicker.FlowDirection = FlowDirection.RightToLeft;
```

#### Hebrew Calendar

```csharp
sfCalendarDateRangePicker.CalendarIdentifier = "HebrewCalendar";
sfCalendarDateRangePicker.Language = "he-IL";
sfCalendarDateRangePicker.FlowDirection = FlowDirection.RightToLeft;
```

#### Persian Calendar

```csharp
sfCalendarDateRangePicker.CalendarIdentifier = "PersianCalendar";
sfCalendarDateRangePicker.Language = "fa-IR";
sfCalendarDateRangePicker.FlowDirection = FlowDirection.RightToLeft;
```

### RTL Layout Changes

When `FlowDirection` is set to `RightToLeft`:

1. **Drop-down button** - Appears on the left side
2. **Calendar navigation** - Previous/next buttons reversed
3. **Week layout** - Days arranged right-to-left
4. **Preset panel** - Positioned on the right side
5. **Text alignment** - Right-aligned

## Complete Localization Examples

### Example 1: French Application

```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.Language = "fr-FR";
sfCalendarDateRangePicker.CalendarIdentifier = "GregorianCalendar";
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Monday;
sfCalendarDateRangePicker.DisplayDateFormat = "{0:D} - {1:D}";
sfCalendarDateRangePicker.DayOfWeekFormat = "{dayofweek.abbreviated(3)}";
sfCalendarDateRangePicker.MonthHeaderFormat = "{month.full} {year.full}";
```

### Example 2: Arabic with Hijri Calendar

```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.CalendarIdentifier = "HijriCalendar";
sfCalendarDateRangePicker.Language = "ar-SA";
sfCalendarDateRangePicker.FlowDirection = FlowDirection.RightToLeft;
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Saturday;
sfCalendarDateRangePicker.DisplayDateFormat = "{0:D} - {1:D}";
```

### Example 3: Multi-Language Support

```csharp
// Switch language based on user preference
public void SetLanguage(string languageCode)
{
    sfCalendarDateRangePicker.Language = languageCode;
    
    // Adjust flow direction for RTL languages
    if (languageCode == "ar-SA" || languageCode == "he-IL" || languageCode == "fa-IR")
    {
        sfCalendarDateRangePicker.FlowDirection = FlowDirection.RightToLeft;
    }
    else
    {
        sfCalendarDateRangePicker.FlowDirection = FlowDirection.LeftToRight;
    }
}
```

## Best Practices

1. **Match user's culture** - Use system culture settings when possible
2. **Test RTL layouts** - Verify UI alignment with RTL languages
3. **Consider calendar systems** - Use appropriate calendar for target region
4. **Format consistency** - Keep date formats consistent across the application
5. **Week start alignment** - Match regional expectations for first day of week
6. **Localize placeholders** - Ensure placeholder text is also localized

## Next Steps

- **Navigation** - Learn about view navigation and keyboard support in [navigation.md](navigation.md)
- **Date Restrictions** - Implement min/max dates and blackout dates in [date-restrictions.md](date-restrictions.md)
- **Week Numbers** - Display week numbers with customization in [week-numbers.md](week-numbers.md)

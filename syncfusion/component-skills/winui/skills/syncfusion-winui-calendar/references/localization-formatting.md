# Localization and Formatting in WinUI Calendar

Complete guide for localizing and formatting the WinUI Calendar (SfCalendar) control for international audiences and custom display preferences.

## Overview

The Calendar control supports comprehensive localization and formatting options:
- **Calendar Types** - Gregorian, Hebrew, Hijri, Persian, etc.
- **Languages** - Any culture/language supported by Windows
- **Date Formats** - Customize day, month, week, and header displays
- **FlowDirection** - Support for RTL (Right-to-Left) languages
- **First Day of Week** - Customize week start day

## Calendar Types (CalendarIdentifier)

The Calendar control supports multiple calendar systems through the `CalendarIdentifier` property.

### Available Calendar Types

- `GregorianCalendar` (default)
- `JulianCalendar`
- `HebrewCalendar`
- `HijriCalendar`
- `KoreanCalendar`
- `TaiwanCalendar`
- `ThaiCalendar`
- `UmAlQuraCalendar`
- `PersianCalendar`

**Not Supported:** Japanese and Lunar calendars

### Set Calendar Type

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     CalendarIdentifier="HebrewCalendar" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.CalendarIdentifier = "HebrewCalendar";
```

### Calendar Type Examples

```csharp
// Hijri calendar (Islamic)
calendar.CalendarIdentifier = "HijriCalendar";

// Persian calendar
calendar.CalendarIdentifier = "PersianCalendar";

// Hebrew calendar
calendar.CalendarIdentifier = "HebrewCalendar";

// Thai Buddhist calendar
calendar.CalendarIdentifier = "ThaiCalendar";

// Back to Gregorian (default)
calendar.CalendarIdentifier = "GregorianCalendar";
```

**Important:** When `CalendarIdentifier` is set, the flow direction updates automatically based on the calendar type (e.g., Hebrew calendar automatically uses RTL).

## Language and Culture

Localize the Calendar control to display month names, day names, and formats in different languages using the `Language` property.

### Set Language

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     Language="fr-FR" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.Language = "fr-FR";
```

### Common Language Codes

| Language | Code | Display |
|----------|------|---------|
| English (US) | en-US | January, February, ... |
| French | fr-FR | janvier, février, ... |
| German | de-DE | Januar, Februar, ... |
| Spanish | es-ES | enero, febrero, ... |
| Japanese | ja-JP | 1月, 2月, ... |
| Chinese (Simplified) | zh-CN | 一月, 二月, ... |
| Arabic | ar-SA | يناير, فبراير, ... |
| Russian | ru-RU | январь, февраль, ... |
| Italian | it-IT | gennaio, febbraio, ... |
| Portuguese | pt-BR | janeiro, fevereiro, ... |

### Example: Multi-Language Support

```csharp
// French
calendar.Language = "fr-FR";

// German
calendar.Language = "de-DE";

// Spanish
calendar.Language = "es-ES";

// Japanese
calendar.Language = "ja-JP";

// Arabic (with automatic RTL)
calendar.Language = "ar-SA";
```

### Detect User's System Language

```csharp
// Use the system's current language
calendar.Language = System.Globalization.CultureInfo.CurrentCulture.Name;
```

## First Day of Week

Customize which day appears as the first column in the calendar.

### Set First Day

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar" 
                     FirstDayOfWeek="Monday" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.FirstDayOfWeek = FirstDayOfWeek.Monday;
```

### Available Values

- `Sunday` (default in most cultures)
- `Monday`
- `Tuesday`
- `Wednesday`
- `Thursday`
- `Friday`
- `Saturday`

### Cultural Defaults

```csharp
// US, Canada, Japan - Sunday
calendar.FirstDayOfWeek = FirstDayOfWeek.Sunday;

// Europe, most of world - Monday
calendar.FirstDayOfWeek = FirstDayOfWeek.Monday;

// Middle East - Saturday
calendar.FirstDayOfWeek = FirstDayOfWeek.Saturday;
```

## Flow Direction (RTL Support)

Change the layout direction for Right-to-Left languages.

### Set Flow Direction

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     FlowDirection="RightToLeft" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.FlowDirection = FlowDirection.RightToLeft;
```

**Values:**
- `LeftToRight` (default) - English, French, German, etc.
- `RightToLeft` - Arabic, Hebrew, Persian, Urdu

**Priority:** When both `CalendarIdentifier` and `FlowDirection` are set, `FlowDirection` takes precedence.

### RTL Languages Example

```csharp
// Arabic with RTL
calendar.Language = "ar-SA";
calendar.FlowDirection = FlowDirection.RightToLeft;

// Hebrew with RTL
calendar.Language = "he-IL";
calendar.FlowDirection = FlowDirection.RightToLeft;
calendar.CalendarIdentifier = "HebrewCalendar";
```

## Date Display Formats

Customize how dates, months, day names, and headers are displayed using format properties.

### Format Properties

| Property | Description | Example Default |
|----------|-------------|-----------------|
| `DayFormat` | Day number format in month view | `{day.integer}` |
| `MonthFormat` | Month name in year view | `{month.abbreviated}` |
| `DayOfWeekFormat` | Day name header | `{dayofweek.abbreviated(2)}` |
| `MonthHeaderFormat` | Header showing month/year | `{month.full} {year.full}` |

### Format Syntax

Use [DateTimeFormatter](https://docs.microsoft.com/en-us/uwp/api/windows.globalization.datetimeformatting.datetimeformatter) patterns.

**Common Patterns:**
- `{day.integer}` - 1, 2, 3, ..., 31
- `{day.integer(2)}` - 01, 02, 03, ..., 31
- `{month.abbreviated}` - Jan, Feb, Mar
- `{month.full}` - January, February, March
- `{month.solo.full}` - January, February (standalone form)
- `{dayofweek.abbreviated(1)}` - S, M, T (single letter)
- `{dayofweek.abbreviated(2)}` - Su, Mo, Tu (two letters)
- `{dayofweek.abbreviated(3)}` - Sun, Mon, Tue (three letters)
- `{dayofweek.full}` - Sunday, Monday, Tuesday
- `{year.full}` - 2026
- `{year.abbreviated}` - 26

### Customize Day Format

**XAML:**
```xml
<calendar:SfCalendar 
    DayFormat="{}{day.integer(2)}"
    x:Name="sfCalendar" />
```

**C#:**
```csharp
// Show days with leading zero (01, 02, ..., 31)
sfCalendar.DayFormat = "{day.integer(2)}";
```

### Customize Month Format

**XAML:**
```xml
<calendar:SfCalendar 
    MonthFormat="{}{month.full}"
    x:Name="sfCalendar" />
```

**C#:**
```csharp
// Show full month names in year view
sfCalendar.MonthFormat = "{month.full}";
```

### Customize Day of Week Format

**XAML:**
```xml
<calendar:SfCalendar 
    DayOfWeekFormat="{}{dayofweek.abbreviated(3)}"
    x:Name="sfCalendar" />
```

**C#:**
```csharp
// Show three-letter day names (Sun, Mon, Tue)
sfCalendar.DayOfWeekFormat = "{dayofweek.abbreviated(3)}";

// Single letter (S, M, T)
sfCalendar.DayOfWeekFormat = "{dayofweek.abbreviated(1)}";

// Full names (Sunday, Monday)
sfCalendar.DayOfWeekFormat = "{dayofweek.full}";
```

### Customize Month Header Format

**XAML:**
```xml
<calendar:SfCalendar 
    MonthHeaderFormat="{}{month.abbreviated} {year.abbreviated}"
    x:Name="sfCalendar" />
```

**C#:**
```csharp
// Show abbreviated month and 2-digit year (Mar 26)
sfCalendar.MonthHeaderFormat = "{month.abbreviated} {year.abbreviated}";

// Show full month and full year (March 2026)
sfCalendar.MonthHeaderFormat = "{month.full} {year.full}";

// Custom format (2026 - March)
sfCalendar.MonthHeaderFormat = "{year.full} - {month.full}";
```

### Complete Format Customization Example

**XAML:**
```xml
<calendar:SfCalendar 
    DayFormat="{}{day.integer(2)}"
    MonthFormat="{}{month.full}"
    DayOfWeekFormat="{}{dayofweek.abbreviated(3)}"
    MonthHeaderFormat="{}{month.abbreviated} {year.abbreviated}"
    x:Name="sfCalendar" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.DayFormat = "{day.integer(2)}";
sfCalendar.MonthFormat = "{month.full}";
sfCalendar.DayOfWeekFormat = "{dayofweek.abbreviated(3)}";
sfCalendar.MonthHeaderFormat = "{month.abbreviated} {year.abbreviated}";
```

## Number of Weeks in View

Control how many weeks are displayed in the month view.

### Set Number of Weeks

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     NumberOfWeeksInView="3" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.NumberOfWeeksInView = 3;
```

**Default:** 6 weeks (ensures all days of month are visible)

**Common Values:**
- `4` - Compact view (may not show all month days)
- `5` - Typical month display
- `6` - Ensures all month days visible (default)

**Use Cases:**
- Compact layouts: 3-4 weeks
- Standard: 5-6 weeks
- Always show full month: 6 weeks

## Common Localization Scenarios

### Scenario 1: French Canadian Calendar

```csharp
calendar.Language = "fr-CA";
calendar.FirstDayOfWeek = FirstDayOfWeek.Sunday;
calendar.MonthHeaderFormat = "{month.full} {year.full}";
```

### Scenario 2: German Business Calendar (Week starts Monday)

```csharp
calendar.Language = "de-DE";
calendar.FirstDayOfWeek = FirstDayOfWeek.Monday;
calendar.DayOfWeekFormat = "{dayofweek.abbreviated(2)}";
```

### Scenario 3: Arabic Islamic Calendar

```csharp
calendar.Language = "ar-SA";
calendar.CalendarIdentifier = "HijriCalendar";
calendar.FlowDirection = FlowDirection.RightToLeft;
calendar.FirstDayOfWeek = FirstDayOfWeek.Saturday;
```

### Scenario 4: Compact English Calendar

```csharp
calendar.Language = "en-US";
calendar.DayOfWeekFormat = "{dayofweek.abbreviated(1)}"; // S, M, T
calendar.NumberOfWeeksInView = 4; // Compact view
```

### Scenario 5: Japanese Calendar with Full Names

```csharp
calendar.Language = "ja-JP";
calendar.MonthFormat = "{month.full}";
calendar.DayOfWeekFormat = "{dayofweek.full}";
```

### Scenario 6: Multi-Language App with User Preference

```csharp
// Load from user settings
string userLanguage = userSettings.Language; // e.g., "es-ES"
calendar.Language = userLanguage;

// Adjust first day based on locale
if (userLanguage.StartsWith("en-US"))
    calendar.FirstDayOfWeek = FirstDayOfWeek.Sunday;
else
    calendar.FirstDayOfWeek = FirstDayOfWeek.Monday;
```

## Best Practices

1. **Culture Sensitivity:** Use appropriate `CalendarIdentifier` for user's culture
2. **Language Detection:** Default to system language for better UX
3. **Format Consistency:** Use format patterns that match user expectations
4. **RTL Testing:** Test layouts thoroughly with RTL languages
5. **First Day Awareness:** Set first day based on cultural norms
6. **Format Documentation:** Document custom formats for team reference

## Troubleshooting

### Issue: Language Not Changing
**Solution:** Ensure Windows language pack is installed for that locale

### Issue: RTL Not Working
**Solution:** Explicitly set `FlowDirection="RightToLeft"`

### Issue: Week Starting Wrong Day
**Solution:** Set `FirstDayOfWeek` property explicitly

### Issue: Month Names Not Localized
**Solution:** Verify `Language` property is set correctly

## Related Topics

- [Getting Started](getting-started.md) - Basic setup
- [Customization](customization.md) - Visual styling
- [Week Numbers](week-numbers.md) - Display week numbers

## Code Examples

Download working samples:
- [Formatting Examples on GitHub](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples/blob/main/Samples/Formatting)

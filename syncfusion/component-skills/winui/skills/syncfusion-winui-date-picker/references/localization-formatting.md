# Localization and Formatting in WinUI DatePicker

Complete guide for localizing the DatePicker control and customizing date display formats, including calendar types, languages, RTL support, and edit modes.

## Table of Contents
- [Calendar Types](#calendar-types)
- [Flow Direction and RTL](#flow-direction-and-rtl)
- [Language Localization](#language-localization)
- [Display Format Customization](#display-format-customization)
- [Spinner Field Formats](#spinner-field-formats)
- [Edit Modes](#edit-modes)
- [Clear Button Configuration](#clear-button-configuration)
- [Common Localization Patterns](#common-localization-patterns)
- [Troubleshooting](#troubleshooting)

## Calendar Types

### Changing Calendar Identifier

The DatePicker supports multiple calendar systems via the `CalendarIdentifier` property:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    CalendarIdentifier="HebrewCalendar" />
```

```csharp
datePicker.CalendarIdentifier = "HebrewCalendar";
```

**Default:** `GregorianCalendar`

### Supported Calendar Types

| Calendar Type | Identifier | Common Regions |
|--------------|------------|----------------|
| Gregorian | `GregorianCalendar` | Worldwide (default) |
| Hebrew | `HebrewCalendar` | Israel |
| Hijri | `HijriCalendar` | Islamic regions |
| Um Al Qura | `UmAlQuraCalendar` | Saudi Arabia |
| Persian | `PersianCalendar` | Iran, Afghanistan |
| Korean | `KoreanCalendar` | Korea |
| Taiwan | `TaiwanCalendar` | Taiwan |
| Thai | `ThaiCalendar` | Thailand |
| Julian | `JulianCalendar` | Historical |

### Calendar Examples

**Hebrew Calendar:**
```xml
<editors:SfDatePicker 
    CalendarIdentifier="HebrewCalendar"
    Language="he-IL" />
```

**Hijri Calendar:**
```xml
<editors:SfDatePicker 
    CalendarIdentifier="HijriCalendar"
    Language="ar-SA" />
```

**Persian Calendar:**
```xml
<editors:SfDatePicker 
    CalendarIdentifier="PersianCalendar"
    Language="fa-IR" />
```

**Thai Buddhist Calendar:**
```xml
<editors:SfDatePicker 
    CalendarIdentifier="ThaiCalendar"
    Language="th-TH" />
```

**Behavior:** DatePicker automatically updates flow direction based on `CalendarIdentifier` for RTL calendars.

## Flow Direction and RTL

### Setting Flow Direction

Control the layout direction explicitly:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    FlowDirection="RightToLeft" />
```

```csharp
datePicker.FlowDirection = FlowDirection.RightToLeft;
```

**Values:**
- `LeftToRight` (default): Standard left-to-right layout
- `RightToLeft`: Right-to-left layout for Arabic, Hebrew, etc.

### Automatic RTL Detection

DatePicker automatically applies RTL based on:
1. `CalendarIdentifier` (Hebrew, Hijri, Persian)
2. `Language` property (ar, he, fa cultures)

**Precedence:** If both `FlowDirection` and auto-detection apply, `FlowDirection` property wins.

### RTL Examples

**Explicit RTL:**
```xml
<editors:SfDatePicker 
    FlowDirection="RightToLeft"
    Language="ar-SA" />
```

**Auto RTL via Calendar:**
```xml
<!-- Automatically applies RTL -->
<editors:SfDatePicker 
    CalendarIdentifier="HebrewCalendar" />
```

**Override Auto RTL:**
```csharp
// Force LTR even with RTL calendar
datePicker.CalendarIdentifier = "HebrewCalendar";
datePicker.FlowDirection = FlowDirection.LeftToRight; // Override
```

## Language Localization

### Setting Language

Localize DatePicker text and formats:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    Language="ar-SA" />
```

```csharp
datePicker.Language = "ar-SA";
```

**Default:** `en-US`

### Common Language Codes

| Language | Code | Region |
|----------|------|--------|
| English (US) | `en-US` | United States |
| Arabic (Saudi) | `ar-SA` | Saudi Arabia |
| Hebrew | `he-IL` | Israel |
| French | `fr-FR` | France |
| German | `de-DE` | Germany |
| Spanish | `es-ES` | Spain |
| Chinese (Simplified) | `zh-CN` | China |
| Japanese | `ja-JP` | Japan |
| Korean | `ko-KR` | Korea |
| Persian | `fa-IR` | Iran |

### Language Effects

The `Language` property affects:
- Month names (January → Janvier in French)
- Day names (Monday → Lundi in French)
- Date format patterns
- Number formatting
- Automatic flow direction

### Dynamic Language Switching

```csharp
// Switch based on user preference
public void SetLanguage(string cultureCode)
{
    datePicker.Language = cultureCode;
    
    // Update calendar if needed
    switch (cultureCode)
    {
        case "ar-SA":
            datePicker.CalendarIdentifier = "HijriCalendar";
            break;
        case "he-IL":
            datePicker.CalendarIdentifier = "HebrewCalendar";
            break;
        case "fa-IR":
            datePicker.CalendarIdentifier = "PersianCalendar";
            break;
        default:
            datePicker.CalendarIdentifier = "GregorianCalendar";
            break;
    }
}
```

**Precedence:** When both `Language` and `FlowDirection` are set, `FlowDirection` property takes priority.

## Display Format Customization

### DisplayDateFormat Property

Customize how the date appears in the editor field:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    DisplayDateFormat="MM/dd/yyyy" />
```

```csharp
datePicker.DisplayDateFormat = "MM/dd/yyyy";
```

**Default:** `d` (short date pattern for current culture)

### Common Format Patterns

| Pattern | Example Output | Description |
|---------|----------------|-------------|
| `d` | 3/22/2026 | Short date (default) |
| `D` | Saturday, March 22, 2026 | Long date |
| `M` or `m` | March 22 | Month day |
| `Y` or `y` | March 2026 | Year month |
| `MM/dd/yyyy` | 03/22/2026 | Custom format |
| `dd-MMM-yyyy` | 22-Mar-2026 | Day-Month-Year |
| `MMMM dd, yyyy` | March 22, 2026 | Full month name |
| `yyyy.MM.dd` | 2026.03.22 | ISO-style |
| `ddd, MMM dd` | Sat, Mar 22 | Abbreviated |

### Custom Format Strings

```csharp
// Full month, day, year
datePicker.DisplayDateFormat = "MMMM dd, yyyy";
// Output: March 22, 2026

// ISO format
datePicker.DisplayDateFormat = "yyyy-MM-dd";
// Output: 2026-03-22

// European format
datePicker.DisplayDateFormat = "dd/MM/yyyy";
// Output: 22/03/2026

// With day of week
datePicker.DisplayDateFormat = "ddd, MMM dd, yyyy";
// Output: Sat, Mar 22, 2026
```

### Format Specifiers

| Specifier | Description | Example |
|-----------|-------------|---------|
| `d` | Day (1-31) | 22 |
| `dd` | Day (01-31) | 22 |
| `ddd` | Day name (abbr) | Sat |
| `dddd` | Day name (full) | Saturday |
| `M` | Month (1-12) | 3 |
| `MM` | Month (01-12) | 03 |
| `MMM` | Month name (abbr) | Mar |
| `MMMM` | Month name (full) | March |
| `yy` | Year (2 digit) | 26 |
| `yyyy` | Year (4 digit) | 2026 |

## Spinner Field Formats

### Day, Month, Year Formats

Customize individual spinner columns:

```xml
<editors:SfDatePicker 
    DayFormat="{}{day.integer}"
    MonthFormat="{}{month.full}"
    YearFormat="{}{year.abbreviated}" />
```

```csharp
datePicker.DayFormat = "{day.integer}";
datePicker.MonthFormat = "{month.full}";
datePicker.YearFormat = "{year.abbreviated}";
```

**Defaults:**
- `DayFormat`: `{day.integer}`
- `MonthFormat`: `{month.abbreviated}`
- `YearFormat`: `{year.full}`

### Day Format Options

| Format | Example | Description |
|--------|---------|-------------|
| `{day.integer}` | 1, 2, 3 | Day number (default) |
| `{day.integer(2)}` | 01, 02, 03 | Zero-padded day |

### Month Format Options

| Format | Example | Description |
|--------|---------|-------------|
| `{month.abbreviated}` | Jan, Feb | Abbreviated (default) |
| `{month.full}` | January, February | Full month name |
| `{month.numeric}` | 1, 2, 3 | Month number |
| `{month.numeric(2)}` | 01, 02, 03 | Zero-padded number |

### Year Format Options

| Format | Example | Description |
|--------|---------|-------------|
| `{year.full}` | 2026 | Full year (default) |
| `{year.abbreviated}` | 26 | Two-digit year |

### Format Examples

**Numeric Format:**
```xml
<editors:SfDatePicker 
    DayFormat="{}{day.integer(2)}"
    MonthFormat="{}{month.numeric(2)}"
    YearFormat="{}{year.full}" />
<!-- Spinner shows: 01 | 03 | 2026 -->
```

**Full Text Format:**
```xml
<editors:SfDatePicker 
    DayFormat="{}{day.integer}"
    MonthFormat="{}{month.full}"
    YearFormat="{}{year.full}" />
<!-- Spinner shows: 22 | March | 2026 -->
```

**Abbreviated Format:**
```xml
<editors:SfDatePicker 
    DayFormat="{}{day.integer}"
    MonthFormat="{}{month.abbreviated}"
    YearFormat="{}{year.abbreviated}" />
<!-- Spinner shows: 22 | Mar | 26 -->
```

## Edit Modes

### Mask Editing (Default)

Automatic validation and correction as you type:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    EditMode="Mask" />
```

```csharp
datePicker.EditMode = DateTimeEditMode.Mask;
```

**Behavior:**
- Real-time validation
- Auto-correction of invalid values
- Auto-advance to next field
- Immediate feedback

**Mask Editing Examples:**

| Input | Result | Explanation |
|-------|--------|-------------|
| Type `29` in date field, `2` in month | Year changes to next leap year | February 29 only valid in leap years |
| Type `18` in month field | `8` entered, cursor moves to next field | Month max is 12, so takes last digit |
| Type `58` in month field | `5` in month, `8` in next field | Splits between fields |
| Type `35` in date field | `3` entered | Date max is 31 for most months |

### Normal Editing (Free Form)

Validation on Enter or focus loss:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    EditMode="Normal" />
```

```csharp
datePicker.EditMode = DateTimeEditMode.Normal;
```

**Behavior:**
- Type freely without immediate validation
- Validates on Enter key or focus loss
- Invalid input reverts to previous value
- More flexible for copy/paste

### Choosing Edit Mode

**Use Mask Mode when:**
- Users need immediate feedback
- Preventing invalid input is critical
- Target audience is non-technical
- Mobile/touch input

**Use Normal Mode when:**
- Users prefer unrestricted typing
- Copy/paste of dates is common
- Technical users
- Integration with barcode scanners

### Edit Mode Comparison

```csharp
// Mask mode - strict, real-time validation
datePicker1.EditMode = DateTimeEditMode.Mask;
datePicker1.DisplayDateFormat = "MM/dd/yyyy";

// Normal mode - flexible, validates on complete
datePicker2.EditMode = DateTimeEditMode.Normal;
datePicker2.DisplayDateFormat = "MM/dd/yyyy";
```

## Clear Button Configuration

### Showing/Hiding Clear Button

Control the X button in the editor:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    ShowClearButton="True" />
```

```csharp
datePicker.ShowClearButton = true;
```

**Default:** `true` (button visible)

**Values:**
- `true`: Clear button visible (default)
- `false`: Clear button hidden

### Use Cases

**Show Clear Button:**
- Optional date fields
- Allow users to clear selection
- Forms with nullable dates

**Hide Clear Button:**
- Required date fields
- Read-only displays
- Locked selections

### Example

```xml
<!-- Optional field with clear -->
<editors:SfDatePicker 
    Header="End Date (Optional)"
    AllowNull="True"
    ShowClearButton="True" />

<!-- Required field without clear -->
<editors:SfDatePicker 
    Header="Start Date (Required)"
    AllowNull="False"
    ShowClearButton="False" />
```

## Common Localization Patterns

### Pattern 1: Multi-Language Application

```csharp
public class LocalizationService
{
    public void ApplyLocale(SfDatePicker datePicker, string locale)
    {
        switch (locale)
        {
            case "en-US":
                datePicker.Language = "en-US";
                datePicker.CalendarIdentifier = "GregorianCalendar";
                datePicker.DisplayDateFormat = "MM/dd/yyyy";
                break;
                
            case "ar-SA":
                datePicker.Language = "ar-SA";
                datePicker.CalendarIdentifier = "HijriCalendar";
                datePicker.FlowDirection = FlowDirection.RightToLeft;
                break;
                
            case "he-IL":
                datePicker.Language = "he-IL";
                datePicker.CalendarIdentifier = "HebrewCalendar";
                datePicker.FlowDirection = FlowDirection.RightToLeft;
                break;
                
            case "ja-JP":
                datePicker.Language = "ja-JP";
                datePicker.DisplayDateFormat = "yyyy年MM月dd日";
                break;
        }
    }
}
```

### Pattern 2: User Preference Based

```csharp
private void LoadUserPreferences()
{
    var userSettings = GetUserSettings();
    
    datePicker.Language = userSettings.PreferredLanguage;
    datePicker.CalendarIdentifier = userSettings.CalendarType;
    datePicker.DisplayDateFormat = userSettings.DateFormat;
    
    // Apply culture-specific settings
    if (userSettings.IsRTL)
    {
        datePicker.FlowDirection = FlowDirection.RightToLeft;
    }
}
```

### Pattern 3: Regional Format Detection

```csharp
private void ApplySystemLocale()
{
    var currentCulture = CultureInfo.CurrentCulture;
    
    datePicker.Language = currentCulture.Name;
    datePicker.DisplayDateFormat = currentCulture.DateTimeFormat.ShortDatePattern;
    
    // Determine flow direction
    if (currentCulture.TextInfo.IsRightToLeft)
    {
        datePicker.FlowDirection = FlowDirection.RightToLeft;
    }
}
```

## Troubleshooting

### Issue: Calendar Type Not Changing
**Cause:** Invalid CalendarIdentifier value  
**Solution:** Use exact identifier strings:
```csharp
// Correct
datePicker.CalendarIdentifier = "HebrewCalendar";

// Incorrect
datePicker.CalendarIdentifier = "Hebrew"; // Wrong!
```

### Issue: RTL Not Working
**Cause:** FlowDirection overriding automatic detection  
**Solution:** Remove explicit FlowDirection or set properly:
```csharp
// Let calendar auto-detect
datePicker.CalendarIdentifier = "HebrewCalendar";
// Don't set FlowDirection

// Or set explicitly
datePicker.FlowDirection = FlowDirection.RightToLeft;
```

### Issue: Custom Format Not Applied
**Cause:** Incorrect format string syntax  
**Solution:** Use valid format specifiers:
```csharp
// Correct
datePicker.DisplayDateFormat = "MM/dd/yyyy";

// Incorrect
datePicker.DisplayDateFormat = "month/day/year"; // Not valid!
```

### Issue: Spinner Format Not Showing
**Cause:** Missing `{}` escape sequence in XAML  
**Solution:** Use proper XAML syntax:
```xml
<!-- Correct -->
<editors:SfDatePicker MonthFormat="{}{month.full}" />

<!-- Incorrect -->
<editors:SfDatePicker MonthFormat="{month.full}" />
```

### Issue: Mask Editing Too Restrictive
**Cause:** Mask mode prevents certain inputs  
**Solution:** Switch to Normal mode:
```csharp
datePicker.EditMode = DateTimeEditMode.Normal;
```

## Next Steps

- **Dropdown Customization:** Modify dropdown button and placement
- **Spinner Customization:** Customize spinner cell appearance
- **Date Restriction:** Set min/max dates and blackout dates

## Related Resources

- [GitHub Examples - Localization](https://github.com/SyncfusionExamples/syncfusion-winui-tools-datepicker-examples/tree/main/Samples/Localization)
- [Date Restriction Guide](date-restriction.md)
- [Dropdown Customization](dropdown-customization.md)

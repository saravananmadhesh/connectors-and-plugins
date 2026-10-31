# Localization and Formatting in WinUI TimePicker

Comprehensive guide for localizing and formatting the Syncfusion WinUI TimePicker control, including clock types, display formats, edit modes, and language support.

## Table of Contents
- [Overview](#overview)
- [Clock Identifier - 12-Hour vs 24-Hour](#clock-identifier---12-hour-vs-24-hour)
- [Flow Direction and RTL Support](#flow-direction-and-rtl-support)
- [Language Localization](#language-localization)
- [Display Time Format](#display-time-format)
- [Edit Modes](#edit-modes)
- [Mask Editing](#mask-editing)
- [Free Form Editing](#free-form-editing)
- [Clear Button Visibility](#clear-button-visibility)
- [Format Patterns Reference](#format-patterns-reference)
- [Localization Examples](#localization-examples)
- [Troubleshooting](#troubleshooting)

## Overview

The TimePicker control supports extensive localization and formatting options to adapt to different regions, languages, and user preferences.

**Key Customization Areas:**
- **ClockIdentifier** - Switch between 12-hour and 24-hour formats
- **DisplayTimeFormat** - Customize how time is displayed
- **Language** - Localize text and date/time patterns
- **FlowDirection** - Support RTL languages
- **EditMode** - Control input validation behavior

## Clock Identifier - 12-Hour vs 24-Hour

Switch between 12-hour clock (with AM/PM) and 24-hour clock formats.

### Setting Clock Type

**XAML:**
```xml
<!-- 12-hour clock (default) -->
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    ClockIdentifier="12HourClock" />

<!-- 24-hour clock -->
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    ClockIdentifier="24HourClock" />
```

**C#:**
```csharp
// 12-hour clock
SfTimePicker timePicker = new SfTimePicker();
timePicker.ClockIdentifier = "12HourClock";

// 24-hour clock
SfTimePicker timePicker = new SfTimePicker();
timePicker.ClockIdentifier = "24HourClock";
```

### Clock Type Options

| Value | Description | Display Example | Dropdown Columns |
|-------|-------------|-----------------|------------------|
| `12HourClock` | 12-hour with AM/PM (default) | 2:30 PM | Hour (1-12), Minute, Meridiem |
| `24HourClock` | 24-hour military time | 14:30 | Hour (0-23), Minute |

### Visual Differences

**12-Hour Clock:**
```
┌───────────┬───────────┬─────────────┐
│   Hour    │  Minute   │   AM/PM     │
├───────────┼───────────┼─────────────┤
│     01    │    00     │     AM      │
│     02    │    15     │     PM      │
│  → 03 ←   │  → 30 ←   │  → PM ←     │
│     04    │    45     │     AM      │
│     12    │    59     │     PM      │
└───────────┴───────────┴─────────────┘
```

**24-Hour Clock:**
```
┌───────────┬───────────┐
│   Hour    │  Minute   │
├───────────┼───────────┤
│     00    │    00     │
│     13    │    15     │
│  → 14 ←   │  → 30 ←   │
│     15    │    45     │
│     23    │    59     │
└───────────┴───────────┘
```

### Use Cases by Region

**12-Hour Clock Regions:**
- United States
- Canada (English)
- United Kingdom
- Australia
- India

**24-Hour Clock Regions:**
- Most of Europe
- China
- Japan
- Middle East
- Military/Aviation worldwide

### Combining with DisplayTimeFormat

```xml
<!-- 24-hour with format -->
<editors:SfTimePicker 
    ClockIdentifier="24HourClock"
    DisplayTimeFormat="HH:mm" />

<!-- 12-hour with seconds -->
<editors:SfTimePicker 
    ClockIdentifier="12HourClock"
    DisplayTimeFormat="hh:mm:ss tt" />
```

## Flow Direction and RTL Support

Support right-to-left (RTL) languages like Arabic and Hebrew.

### Setting Flow Direction

**XAML:**
```xml
<!-- Left-to-Right (default) -->
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    FlowDirection="LeftToRight" />

<!-- Right-to-Left -->
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    FlowDirection="RightToLeft" />
```

**C#:**
```csharp
// RTL layout
SfTimePicker timePicker = new SfTimePicker();
timePicker.FlowDirection = FlowDirection.RightToLeft;
```

### Visual Impact

**LeftToRight (Default):**
```
┌─────────────────────────────────────┐
│  09:30 AM                    [▼]    │
└─────────────────────────────────────┘
```

**RightToLeft:**
```
┌─────────────────────────────────────┐
│    [▼]                    09:30 AM  │
└─────────────────────────────────────┘
```

### RTL Dropdown Layout

```
┌─────────────────────────────────────┐
│   AM/PM     │  Minute   │   Hour    │  ← Columns reversed
├─────────────┼───────────┼───────────┤
│     AM      │    25     │     09    │
│     PM      │    26     │     10    │
│  → AM ←     │  → 27 ←   │  → 11 ←   │
│     PM      │    28     │     12    │
│     AM      │    29     │     01    │
└─────────────┴───────────┴───────────┘
```

### Automatic RTL with Language

```csharp
// Language property automatically sets flow direction
timePicker.Language = "ar-SA"; // Arabic - Saudi Arabia
// FlowDirection automatically becomes RightToLeft
```

**Precedence:**
- If `FlowDirection` is explicitly set, it takes precedence
- If only `Language` is set, flow direction is determined automatically

## Language Localization

Localize the control for different languages and regions.

### Setting Language

**XAML:**
```xml
<!-- English (United States) - Default -->
<editors:SfTimePicker Language="en-US" />

<!-- Arabic (Saudi Arabia) -->
<editors:SfTimePicker Language="ar-SA" />

<!-- French (France) -->
<editors:SfTimePicker Language="fr-FR" />

<!-- German (Germany) -->
<editors:SfTimePicker Language="de-DE" />

<!-- Japanese (Japan) -->
<editors:SfTimePicker Language="ja-JP" />

<!-- Spanish (Spain) -->
<editors:SfTimePicker Language="es-ES" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.Language = "ar-SA"; // Arabic
```

### Language Impact

The `Language` property affects:
1. **Flow Direction** - Automatic RTL for Arabic, Hebrew, etc.
2. **AM/PM Text** - Localized meridiem indicators
3. **Number Formatting** - Regional number formats
4. **Column Order** - Adjusted for cultural preferences

### Examples by Language

**English (en-US):**
```
Display: 2:30 PM
Meridiem: AM, PM
```

**Arabic (ar-SA):**
```
Display: ٢:٣٠ م
Meridiem: ص (sabah), م (masa)
Flow: Right-to-Left
```

**French (fr-FR):**
```
Display: 14:30
Default: 24-hour clock preferred
```

**Japanese (ja-JP):**
```
Display: 午後 2:30
Meridiem: 午前 (gozen), 午後 (gogo)
```

### Complete Localization Example

```xml
<editors:SfTimePicker 
    x:Name="arabicTimePicker"
    Language="ar-SA"
    Header="وقت الموعد"
    PlaceholderText="اختر الوقت"
    Width="250" />
```

```csharp
// Arabic localization
SfTimePicker arabicPicker = new SfTimePicker();
arabicPicker.Language = "ar-SA";
arabicPicker.Header = "وقت الموعد"; // Appointment Time
arabicPicker.PlaceholderText = "اختر الوقت"; // Choose Time
// FlowDirection automatically set to RightToLeft
```

## Display Time Format

Customize how time is displayed in the text editor.

### Setting Display Format

**XAML:**
```xml
<editors:SfTimePicker 
    DisplayTimeFormat="hh:mm tt" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.DisplayTimeFormat = "hh:mm tt";
```

### Common Format Patterns

| Pattern | Description | Example Output |
|---------|-------------|----------------|
| `hh:mm tt` | 12-hour with AM/PM (default) | 02:30 PM |
| `HH:mm` | 24-hour format | 14:30 |
| `h:mm tt` | 12-hour, no leading zero | 2:30 PM |
| `H:mm` | 24-hour, no leading zero | 14:30 |
| `hh:mm:ss tt` | 12-hour with seconds | 02:30:45 PM |
| `HH:mm:ss` | 24-hour with seconds | 14:30:45 |
| `h tt` | Hour only with meridiem | 2 PM |
| `HH` | Hour only, 24-hour | 14 |
| `hh:mm` | 12-hour, no AM/PM | 02:30 |

### Format Pattern Elements

| Element | Description | Values |
|---------|-------------|--------|
| `h` | Hour (12-hour), no leading zero | 1-12 |
| `hh` | Hour (12-hour), with leading zero | 01-12 |
| `H` | Hour (24-hour), no leading zero | 0-23 |
| `HH` | Hour (24-hour), with leading zero | 00-23 |
| `m` | Minute, no leading zero | 0-59 |
| `mm` | Minute, with leading zero | 00-59 |
| `s` | Second, no leading zero | 0-59 |
| `ss` | Second, with leading zero | 00-59 |
| `tt` | AM/PM designator | AM, PM |
| `t` | First character of AM/PM | A, P |

### Advanced Format Examples

```xml
<!-- Military time with seconds -->
<editors:SfTimePicker DisplayTimeFormat="HHmm'hrs' ss'sec'" />
<!-- Output: 1430hrs 45sec -->

<!-- Verbose format -->
<editors:SfTimePicker DisplayTimeFormat="hh 'hours' mm 'minutes' tt" />
<!-- Output: 02 hours 30 minutes PM -->

<!-- Compact format -->
<editors:SfTimePicker DisplayTimeFormat="Hmm" />
<!-- Output: 1430 -->

<!-- Custom separator -->
<editors:SfTimePicker DisplayTimeFormat="hh-mm-ss tt" />
<!-- Output: 02-30-45 PM -->
```

### Format with ClockIdentifier

```csharp
// 24-hour clock should use HH format
timePicker.ClockIdentifier = "24HourClock";
timePicker.DisplayTimeFormat = "HH:mm";

// 12-hour clock should use hh format with tt
timePicker.ClockIdentifier = "12HourClock";
timePicker.DisplayTimeFormat = "hh:mm tt";
```

### Cultural Format Defaults

```csharp
// United States - 12-hour with AM/PM
timePicker.Language = "en-US";
timePicker.DisplayTimeFormat = "hh:mm tt"; // 02:30 PM

// United Kingdom - 24-hour preferred
timePicker.Language = "en-GB";
timePicker.DisplayTimeFormat = "HH:mm"; // 14:30

// France - 24-hour
timePicker.Language = "fr-FR";
timePicker.DisplayTimeFormat = "HH'h'mm"; // 14h30

// Germany - 24-hour with dots
timePicker.Language = "de-DE";
timePicker.DisplayTimeFormat = "HH.mm"; // 14.30
```

## Edit Modes

Control how user input is validated and processed.

### Available Edit Modes

| Mode | Description | Validation Timing |
|------|-------------|-------------------|
| `Mask` | Auto-correcting input (default) | Immediate, as you type |
| `Normal` | Free-form input | On Enter key or lost focus |

### Setting Edit Mode

**XAML:**
```xml
<!-- Mask editing (default) -->
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    EditMode="Mask" />

<!-- Normal editing -->
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    EditMode="Normal" />
```

**C#:**
```csharp
// Mask mode
SfTimePicker timePicker = new SfTimePicker();
timePicker.EditMode = DateTimeEditMode.Mask;

// Normal mode
timePicker.EditMode = DateTimeEditMode.Normal;
```

## Mask Editing

Immediate validation and auto-correction as user types.

### Mask Behavior

**Automatic Corrections:**

| User Input | Scenario | Result | Explanation |
|------------|----------|--------|-------------|
| `15` | In hour field (12-hour) | Hour: `1`, Minute: `5` | 15 > 12, splits digits |
| `48` | In hour field (12-hour) | Hour: `4`, Minute: `8` | 48 > 19, splits digits |
| `87` | In minute field | Minute: `8`, Next field | 87 > 59, takes first digit |
| `13-19` | In hour field (12-hour) | Hour: `3-9` | Takes last digit, moves to next |

### Field-by-Field Correction

**Hour Field (12-Hour Clock):**
```csharp
// Input: 15
// Processing:
// - 15 > 12 (invalid for 12-hour)
// - Take first digit: 1
// - Move second digit to minute: 5
// Result: 01:05
```

**Hour Field (24-Hour Clock):**
```csharp
// Input: 25
// Processing:
// - 25 > 23 (invalid for 24-hour)
// - Take first digit: 2
// - Move second digit to minute: 5
// Result: 02:05
```

**Minute Field:**
```csharp
// Input: 87
// Processing:
// - 87 > 59 (invalid for minutes)
// - Take first digit: 8
// - Cursor moves to next field
// Result: :08
```

### Mask Examples

**Example 1: Entering 2:30 PM**
```
User types: 2 → 3 → 0 → P
Field states:
1. "2" in hour → "02:"
2. "3" in minute → "02:3"
3. "0" in minute → "02:30 "
4. "P" in meridiem → "02:30 PM"
```

**Example 2: Quick Entry**
```
User types: 1430 (no separators)
Field states:
1. "14" in hour (24-hour) → "14:"
2. "30" in minute → "14:30"
```

**Example 3: Auto-correction**
```
User types: 99 in hour field
Result: "09:9" (takes first digit, moves second)
```

### Mask Mode Configuration

```xml
<editors:SfTimePicker 
    EditMode="Mask"
    DisplayTimeFormat="hh:mm tt"
    ClockIdentifier="12HourClock" />
```

### Advantages of Mask Mode

✅ **Always valid input** - No invalid times possible  
✅ **Fast entry** - Automatic field navigation  
✅ **User-friendly** - Helpful auto-corrections  
✅ **No validation errors** - Input is corrected on-the-fly

## Free Form Editing

Validation occurs after input completion.

### Normal Mode Behavior

**Validation Triggers:**
1. User presses `Enter` key
2. Control loses focus (user tabs away or clicks elsewhere)

**If input is invalid:**
- Reverts to previous valid time
- `SelectedTime` unchanged

**If input is valid:**
- Updates `SelectedTime`
- Fires `SelectedTimeChanged` event

### Normal Mode Examples

**Example 1: Valid Input**
```
User types: "2:30 PM"
User presses Enter
Result: SelectedTime = 2:30 PM ✓
```

**Example 2: Invalid Input**
```
User types: "99:99 ZZ"
User presses Enter
Result: Reverts to previous time (e.g., 10:00 AM)
```

**Example 3: Partial Input**
```
User types: "2:3"
User presses Enter
Result: May interpret as 2:03 or invalid (depends on format)
```

### Setting Normal Mode

```xml
<editors:SfTimePicker 
    EditMode="Normal"
    DisplayTimeFormat="hh:mm tt" />
```

```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.EditMode = DateTimeEditMode.Normal;
```

### Validation Example

```csharp
timePicker.EditMode = DateTimeEditMode.Normal;
timePicker.SelectedTimeChanged += (s, e) =>
{
    if (e.NewDateTime.HasValue)
    {
        // Valid time entered
        System.Diagnostics.Debug.WriteLine($"Valid time: {e.NewDateTime.Value:hh:mm tt}");
    }
    else
    {
        // Invalid input, reverted
        System.Diagnostics.Debug.WriteLine("Invalid input, kept previous time");
    }
};
```

### When to Use Normal Mode

**Use Normal Mode when:**
- Users are accustomed to free-form time entry
- Flexibility in input format is needed
- Integration with existing input patterns
- Users may paste time values

**Use Mask Mode when:**
- Data integrity is critical
- Users are not tech-savvy
- Touchscreen/mobile input
- Minimizing validation errors

## Clear Button Visibility

Show or hide the clear button (X) in the editor.

### Controlling Clear Button

**XAML:**
```xml
<!-- Show clear button (default) -->
<editors:SfTimePicker ShowClearButton="True" />

<!-- Hide clear button -->
<editors:SfTimePicker ShowClearButton="False" />
```

**C#:**
```csharp
// Show clear button
timePicker.ShowClearButton = true;

// Hide clear button
timePicker.ShowClearButton = false;
```

### Visual Comparison

**ShowClearButton="True":**
```
┌──────────────────────────────┐
│  02:30 PM    [X]  [▼]        │
└──────────────────────────────┘
       ↑
   Clear button visible
```

**ShowClearButton="False":**
```
┌──────────────────────────────┐
│  02:30 PM         [▼]        │
└──────────────────────────────┘
       
   No clear button
```

### Clear Button Behavior

**When clicked:**
- If `AllowNull = true`: Sets `SelectedTime` to `null`
- If `AllowNull = false`: Reverts to previous time or current system time

### Use Cases

**Show Clear Button when:**
- Null values are allowed (`AllowNull = true`)
- Users need quick way to clear selection
- Optional time fields

**Hide Clear Button when:**
- Time selection is required
- Simpler UI is preferred
- Null values not allowed

## Format Patterns Reference

### Complete Pattern Table

| Pattern | Output (2:05:07 PM) | Output (14:05:07) |
|---------|---------------------|-------------------|
| `h` | 2 | 2 |
| `hh` | 02 | 02 |
| `H` | 14 | 14 |
| `HH` | 14 | 14 |
| `m` | 5 | 5 |
| `mm` | 05 | 05 |
| `s` | 7 | 7 |
| `ss` | 07 | 07 |
| `t` | P | P |
| `tt` | PM | PM |
| `h:mm` | 2:05 | 2:05 |
| `hh:mm` | 02:05 | 02:05 |
| `h:mm:ss` | 2:05:07 | 2:05:07 |
| `hh:mm:ss tt` | 02:05:07 PM | 02:05:07 PM |
| `H:mm` | 14:05 | 14:05 |
| `HH:mm` | 14:05 | 14:05 |
| `HH:mm:ss` | 14:05:07 | 14:05:07 |

### Custom Separators

```csharp
// Dot separator
timePicker.DisplayTimeFormat = "HH.mm"; // 14.05

// Dash separator
timePicker.DisplayTimeFormat = "HH-mm-ss"; // 14-05-07

// No separator
timePicker.DisplayTimeFormat = "HHmm"; // 1405

// Mixed
timePicker.DisplayTimeFormat = "HH'h'mm'm'"; // 14h05m
```

### Literal Text in Patterns

Use single quotes for literal text:

```csharp
timePicker.DisplayTimeFormat = "HH 'hours and' mm 'minutes'";
// Output: 14 hours and 05 minutes

timePicker.DisplayTimeFormat = "'Time:' HH:mm";
// Output: Time: 14:05

timePicker.DisplayTimeFormat = "hh:mm tt 'today'";
// Output: 02:05 PM today
```

## Localization Examples

### Complete Multilingual Setup

```csharp
public class TimePickerLocalizationManager
{
    public static void ApplyLocalization(SfTimePicker timePicker, string culture)
    {
        switch (culture)
        {
            case "en-US": // English (United States)
                timePicker.Language = "en-US";
                timePicker.ClockIdentifier = "12HourClock";
                timePicker.DisplayTimeFormat = "hh:mm tt";
                timePicker.FlowDirection = FlowDirection.LeftToRight;
                break;
                
            case "ar-SA": // Arabic (Saudi Arabia)
                timePicker.Language = "ar-SA";
                timePicker.ClockIdentifier = "12HourClock";
                timePicker.DisplayTimeFormat = "hh:mm tt";
                // FlowDirection set automatically to RightToLeft
                break;
                
            case "fr-FR": // French (France)
                timePicker.Language = "fr-FR";
                timePicker.ClockIdentifier = "24HourClock";
                timePicker.DisplayTimeFormat = "HH'h'mm";
                timePicker.FlowDirection = FlowDirection.LeftToRight;
                break;
                
            case "de-DE": // German (Germany)
                timePicker.Language = "de-DE";
                timePicker.ClockIdentifier = "24HourClock";
                timePicker.DisplayTimeFormat = "HH:mm";
                timePicker.FlowDirection = FlowDirection.LeftToRight;
                break;
                
            case "ja-JP": // Japanese (Japan)
                timePicker.Language = "ja-JP";
                timePicker.ClockIdentifier = "12HourClock";
                timePicker.DisplayTimeFormat = "tt hh:mm";
                timePicker.FlowDirection = FlowDirection.LeftToRight;
                break;
                
            case "es-ES": // Spanish (Spain)
                timePicker.Language = "es-ES";
                timePicker.ClockIdentifier = "24HourClock";
                timePicker.DisplayTimeFormat = "HH:mm";
                timePicker.FlowDirection = FlowDirection.LeftToRight;
                break;
        }
    }
}

// Usage
TimePickerLocalizationManager.ApplyLocalization(timePicker, "fr-FR");
```

## Troubleshooting

### Issue: Format Not Displaying Correctly

**Problem:** DisplayTimeFormat doesn't match expected output

**Solutions:**
1. **Verify pattern syntax:**
   ```csharp
   // Correct
   timePicker.DisplayTimeFormat = "HH:mm";
   
   // Incorrect
   timePicker.DisplayTimeFormat = "HH-MM"; // MM is month, not minute
   ```

2. **Match with ClockIdentifier:**
   ```csharp
   // Correct pairing
   timePicker.ClockIdentifier = "24HourClock";
   timePicker.DisplayTimeFormat = "HH:mm";
   
   // Incorrect pairing
   timePicker.ClockIdentifier = "24HourClock";
   timePicker.DisplayTimeFormat = "hh:mm tt"; // tt won't show in 24-hour
   ```

### Issue: Language Not Applied

**Problem:** Language setting doesn't change the control

**Solution:** Set language before other properties

```csharp
// Correct order
timePicker.Language = "ar-SA";
timePicker.DisplayTimeFormat = "hh:mm tt";

// Better: let language determine format
timePicker.Language = "ar-SA";
// DisplayTimeFormat uses culture default
```

### Issue: RTL Not Working

**Problem:** FlowDirection not changing to RTL

**Solutions:**
1. **Set explicitly:**
   ```csharp
   timePicker.FlowDirection = FlowDirection.RightToLeft;
   ```

2. **Check language:**
   ```csharp
   timePicker.Language = "ar-SA"; // Automatically sets RTL
   ```

3. **Verify precedence:**
   ```csharp
   // FlowDirection takes precedence over Language
   timePicker.Language = "ar-SA"; // Would set RTL
   timePicker.FlowDirection = FlowDirection.LeftToRight; // Overrides to LTR
   ```

### Issue: Mask Editing Confusing Users

**Problem:** Auto-correction unexpected for users

**Solution:** Switch to Normal mode or educate users

```csharp
// Switch to Normal mode for familiar behavior
timePicker.EditMode = DateTimeEditMode.Normal;

// Or add instructional text
timePicker.Description = "Type time in HH:MM format and press Enter";
```

## See Also

- [Getting Started](getting-started.md) - Basic setup and configuration
- [Time Restrictions](time-restrictions.md) - MinTime, MaxTime, BlackoutTimes
- [Dropdown Customization](dropdown-customization.md) - Dropdown appearance

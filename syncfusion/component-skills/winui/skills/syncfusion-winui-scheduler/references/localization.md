# Localization

This reference provides comprehensive guidance on localizing the WinUI Scheduler for different languages, cultures, and regions.

## Overview

The WinUI Scheduler supports localization for:
- Date and time formats
- Day and month names
- Calendar types (Gregorian, Hijri, Japanese, etc.)
- Right-to-left (RTL) languages
- Cultural preferences

## Culture and Language

### Setting Application Culture

Set culture at application startup:

```csharp
// In App.xaml.cs
protected override void OnLaunched(LaunchActivatedEventArgs e)
{
    // Set culture for entire application
    CultureInfo.CurrentCulture = new CultureInfo("fr-FR"); // French
    CultureInfo.CurrentUICulture = new CultureInfo("fr-FR");
    
    // ... rest of initialization
}
```

**Common Culture Codes:**
- `"en-US"` - English (United States)
- `"en-GB"` - English (United Kingdom)
- `"fr-FR"` - French (France)
- `"de-DE"` - German (Germany)
- `"es-ES"` - Spanish (Spain)
- `"ja-JP"` - Japanese (Japan)
- `"zh-CN"` - Chinese (Simplified, China)
- `"ar-SA"` - Arabic (Saudi Arabia)
- `"hi-IN"` - Hindi (India)

### Scheduler Automatically Respects Culture

Once culture is set, the scheduler automatically displays:
- Day names in the specified language
- Month names in the specified language
- Date formats according to cultural preferences
- First day of week according to culture

```csharp
// Set culture
CultureInfo.CurrentCulture = new CultureInfo("de-DE");

// Scheduler automatically shows:
// - "Montag", "Dienstag", etc. (German day names)
// - "15.06.2026" date format (German standard)
// - Week starts on Monday (German preference)
```

## Date and Time Formatting

### Culture-Specific Date Formats

Date formats adjust automatically based on culture:

```csharp
// US format
CultureInfo.CurrentCulture = new CultureInfo("en-US");
// Displays: 6/15/2026 (M/d/yyyy)

// UK format
CultureInfo.CurrentCulture = new CultureInfo("en-GB");
// Displays: 15/06/2026 (d/M/yyyy)

// ISO format
CultureInfo.CurrentCulture = new CultureInfo("sv-SE");
// Displays: 2026-06-15 (yyyy-MM-dd)
```

### Custom Date Format

Override culture defaults with custom formats:

```csharp
// Custom format regardless of culture
Schedule.ViewHeaderSettings.DateFormat = "yyyy-MM-dd"; // ISO format
Schedule.DaysViewSettings.TimeRulerFormat = "HH:mm"; // 24-hour
```

### Time Format (12-hour vs 24-hour)

Depends on culture:

```csharp
// 12-hour format (US)
CultureInfo.CurrentCulture = new CultureInfo("en-US");
Schedule.DaysViewSettings.TimeRulerFormat = "h:mm tt";
// Displays: 2:00 PM

// 24-hour format (Europe)
CultureInfo.CurrentCulture = new CultureInfo("de-DE");
Schedule.DaysViewSettings.TimeRulerFormat = "HH:mm";
// Displays: 14:00
```

## Calendar Types

### Supported Calendars

Windows supports multiple calendar systems:

```csharp
// Gregorian calendar (default, Western)
var gregorian = new GregorianCalendar();

// Hijri calendar (Islamic)
var hijri = new HijriCalendar();

// Japanese calendar
var japanese = new JapaneseCalendar();

// Hebrew calendar
var hebrew = new HebrewCalendar();

// Persian calendar
var persian = new PersianCalendar();
```

### Using Different Calendar

```csharp
// Set culture with specific calendar
var cultureWithHijri = new CultureInfo("ar-SA");
cultureWithHijri.DateTimeFormat.Calendar = new HijriCalendar();

CultureInfo.CurrentCulture = cultureWithHijri;
CultureInfo.CurrentUICulture = cultureWithHijri;

// Scheduler now uses Hijri calendar dates
```

**Note:** Calendar conversion is handled by .NET's `DateTime` and `CultureInfo` classes. The scheduler displays dates according to the culture's calendar.

## Right-to-Left (RTL) Support

### Enable RTL Layout

For RTL languages (Arabic, Hebrew):

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      FlowDirection="RightToLeft" />
```

```csharp
// Programmatically set RTL
Schedule.FlowDirection = FlowDirection.RightToLeft;

// Detect language and set automatically
var language = CultureInfo.CurrentUICulture.TextInfo.IsRightToLeft;
if (language)
{
    Schedule.FlowDirection = FlowDirection.RightToLeft;
}
```

**RTL Behavior:**
- Week columns reversed (Saturday → Sunday becomes Sunday → Saturday)
- Timeline flows right to left
- UI elements mirrored
- Text alignment reversed

### Arabic Example

```csharp
// Set Arabic culture
CultureInfo.CurrentCulture = new CultureInfo("ar-SA");
CultureInfo.CurrentUICulture = new CultureInfo("ar-SA");

// Enable RTL
Schedule.FlowDirection = FlowDirection.RightToLeft;

// Scheduler displays:
// - Arabic day names (الأحد، الإثنين، etc.)
// - Arabic month names
// - Right-to-left layout
// - Hijri calendar (if configured)
```

## First Day of Week

### Culture-Specific First Day

Different cultures start the week on different days:

```csharp
// US: Sunday
var usCulture = new CultureInfo("en-US");
var firstDay = usCulture.DateTimeFormat.FirstDayOfWeek; // DayOfWeek.Sunday

// Europe: Monday
var deCulture = new CultureInfo("de-DE");
firstDay = deCulture.DateTimeFormat.FirstDayOfWeek; // DayOfWeek.Monday

// Middle East: Saturday
var saCulture = new CultureInfo("ar-SA");
firstDay = saCulture.DateTimeFormat.FirstDayOfWeek; // DayOfWeek.Saturday
```

### Override First Day of Week

```csharp
// Respect culture default
Schedule.FirstDayOfWeek = CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek;

// Or set explicitly
Schedule.FirstDayOfWeek = DayOfWeek.Monday; // ISO 8601 standard
```

## Localizing UI Strings

### Resource Files

For localizing button text, labels, and messages, use resource files:

**Strings.resw** (default - English)
```xml
<data name="NewAppointment" xml:space="preserve">
  <value>New Appointment</value>
</data>
<data name="DeleteConfirmation" xml:space="preserve">
  <value>Are you sure you want to delete this appointment?</value>
</data>
```

**Strings.de-DE.resw** (German)
```xml
<data name="NewAppointment" xml:space="preserve">
  <value>Neuer Termin</value>
</data>
<data name="DeleteConfirmation" xml:space="preserve">
  <value>Möchten Sie diesen Termin wirklich löschen?</value>
</data>
```

### Using Localized Strings

```csharp
var resourceLoader = ResourceLoader.GetForViewIndependentUse();

var newAppointmentText = resourceLoader.GetString("NewAppointment");
var deleteConfirmation = resourceLoader.GetString("DeleteConfirmation");

// Use in UI
NewButton.Content = newAppointmentText;
```

## Common Patterns

### Pattern 1: Auto-Detect User's Culture

```csharp
// In App.xaml.cs
protected override void OnLaunched(LaunchActivatedEventArgs e)
{
    // Use system's current culture
    var systemCulture = CultureInfo.CurrentCulture;
    
    // Apply to application
    CultureInfo.CurrentCulture = systemCulture;
    CultureInfo.CurrentUICulture = systemCulture;
    
    // ... rest of initialization
}
```

### Pattern 2: User-Selectable Language

```xml
<ComboBox x:Name="LanguageSelector" 
         SelectionChanged="LanguageSelector_SelectionChanged"
         Header="Language"/>

<scheduler:SfScheduler x:Name="Schedule" ViewType="Week"/>
```

```csharp
private void InitializeLanguageSelector()
{
    var languages = new List<LanguageOption>
    {
        new LanguageOption { Code = "en-US", Name = "English (US)" },
        new LanguageOption { Code = "en-GB", Name = "English (UK)" },
        new LanguageOption { Code = "fr-FR", Name = "Français (France)" },
        new LanguageOption { Code = "de-DE", Name = "Deutsch (Deutschland)" },
        new LanguageOption { Code = "es-ES", Name = "Español (España)" },
        new LanguageOption { Code = "ja-JP", Name = "日本語 (日本)" },
        new LanguageOption { Code = "ar-SA", Name = "العربية (المملكة العربية السعودية)" }
    };
    
    LanguageSelector.ItemsSource = languages;
    LanguageSelector.DisplayMemberPath = "Name";
}

private void LanguageSelector_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    if (LanguageSelector.SelectedItem is LanguageOption selected)
    {
        var culture = new CultureInfo(selected.Code);
        CultureInfo.CurrentCulture = culture;
        CultureInfo.CurrentUICulture = culture;
        
        // Set RTL if needed
        Schedule.FlowDirection = culture.TextInfo.IsRightToLeft 
            ? FlowDirection.RightToLeft 
            : FlowDirection.LeftToRight;
        
        // Set first day of week
        Schedule.FirstDayOfWeek = culture.DateTimeFormat.FirstDayOfWeek;
        
        // Refresh UI
        RefreshScheduler();
    }
}
```

### Pattern 3: Hijri Calendar Support

```csharp
private void EnableHijriCalendar()
{
    var culture = new CultureInfo("ar-SA");
    culture.DateTimeFormat.Calendar = new HijriCalendar();
    
    CultureInfo.CurrentCulture = culture;
    CultureInfo.CurrentUICulture = culture;
    
    Schedule.FlowDirection = FlowDirection.RightToLeft;
    
    // Dates automatically displayed in Hijri format
}
```

### Pattern 4: Date Format Based on User Preference

```csharp
public enum DateFormatPreference
{
    ShortDate,  // 6/15/2026
    LongDate,   // June 15, 2026
    ISO8601     // 2026-06-15
}

private void SetDateFormat(DateFormatPreference preference)
{
    switch (preference)
    {
        case DateFormatPreference.ShortDate:
            Schedule.ViewHeaderSettings.DateFormat = CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern;
            break;
            
        case DateFormatPreference.LongDate:
            Schedule.ViewHeaderSettings.DateFormat = CultureInfo.CurrentCulture.DateTimeFormat.LongDatePattern;
            break;
            
        case DateFormatPreference.ISO8601:
            Schedule.ViewHeaderSettings.DateFormat = "yyyy-MM-dd";
            break;
    }
}
```

### Pattern 5: Multi-Language Appointment Subjects

```csharp
public class LocalizedAppointment
{
    public Dictionary<string, string> Subjects { get; set; } = new();
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    public string GetLocalizedSubject()
    {
        var language = CultureInfo.CurrentUICulture.TwoLetterISOLanguageName;
        return Subjects.ContainsKey(language) 
            ? Subjects[language] 
            : Subjects["en"]; // Fallback to English
    }
}

// Usage
var appointment = new LocalizedAppointment
{
    Subjects = new Dictionary<string, string>
    {
        { "en", "Team Meeting" },
        { "fr", "Réunion d'équipe" },
        { "de", "Teambesprechung" },
        { "es", "Reunión de equipo" }
    },
    StartTime = DateTime.Now,
    EndTime = DateTime.Now.AddHours(1)
};

var scheduleAppointment = new ScheduleAppointment
{
    Subject = appointment.GetLocalizedSubject(),
    StartTime = appointment.StartTime,
    EndTime = appointment.EndTime
};
```

## Best Practices

### Culture Settings
- Detect and respect user's system culture by default
- Allow users to override language preference
- Store user's language preference
- Support common cultures for your target audience

### Date and Time
- Use culture-appropriate date formats
- Support both 12-hour and 24-hour time formats
- Display time zones clearly in multi-timezone scenarios
- Test with cultures that have different date separators

### RTL Support
- Test with Arabic and Hebrew
- Ensure all UI elements mirror properly
- Check that text alignment is correct
- Verify time flow (right-to-left in timeline)

### Calendar Systems
- Support Hijri calendar for Arabic users
- Consider Japanese calendar for Japanese market
- Provide calendar system selector if needed
- Test date conversions thoroughly

## Troubleshooting

### Day Names in Wrong Language

**Problem:** Day names not showing in expected language.

**Solutions:**
- Verify `CultureInfo.CurrentCulture` is set correctly
- Check that culture is set before scheduler initialization
- Ensure culture code is valid (e.g., "fr-FR", not "fr")
- Restart application after culture change

### Date Format Not Changing

**Problem:** Custom date format not applied.

**Solutions:**
- Check `ViewHeaderSettings.DateFormat` property
- Verify format string syntax
- Ensure no binding overrides format
- Test with simple format first (e.g., "MM/dd")

### RTL Layout Issues

**Problem:** RTL layout not working correctly.

**Solutions:**
- Set `FlowDirection = RightToLeft` on scheduler
- Verify culture's `IsRightToLeft` property
- Check parent containers for conflicting `FlowDirection`
- Test with native Arabic or Hebrew text

### First Day of Week Incorrect

**Problem:** Week starts on wrong day.

**Solutions:**
- Check culture's `FirstDayOfWeek` setting
- Explicitly set `Schedule.FirstDayOfWeek`
- Verify culture is loaded correctly
- Different cultures have different defaults

### Calendar Conversion Issues

**Problem:** Dates incorrect in non-Gregorian calendars.

**Solutions:**
- Ensure culture's calendar is set correctly
- Use `Calendar.ToDateTime()` for conversions
- Test boundary dates (year start/end)
- Verify calendar is supported on target system

### Resource Strings Not Loading

**Problem:** Localized UI strings not displaying.

**Solutions:**
- Verify resource file naming (e.g., `Strings.de-DE.resw`)
- Check resource file build action (Content)
- Ensure `ResourceLoader` uses correct resource map
- Verify culture is set before loading resources

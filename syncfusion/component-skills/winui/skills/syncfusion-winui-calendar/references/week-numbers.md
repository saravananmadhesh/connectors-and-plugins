# Week Numbers in WinUI Calendar

Complete guide for displaying and customizing week numbers in the WinUI Calendar (SfCalendar) control.

## Overview

The Calendar control can display ISO week numbers alongside the calendar dates. Week numbers appear as an additional column on the left side of the calendar, showing which week of the year each row represents.

**Features:**
- Enable/disable week number display
- Configure week calculation rules
- Customize week number format
- Custom templates for week numbers

## Enable Week Numbers

Display week numbers by setting the `ShowWeekNumbers` property to `true`.

### Basic Usage

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     ShowWeekNumbers="True" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.ShowWeekNumbers = true;
```

**Default:** `ShowWeekNumbers = false`

**Result:** A column of week numbers appears on the left side of the month view, showing week 1-52 (or 53 in some years).

## Week Calculation Rules (WeekNumberRule)

Control how the first week of the year is determined using the `WeekNumberRule` property.

### Available Rules

The `WeekNumberRule` property accepts values from the [CalendarWeekRule](https://docs.microsoft.com/en-us/dotnet/api/system.globalization.calendarweekrule) enumeration:

| Rule | Description | When Week 1 Starts |
|------|-------------|-------------------|
| `FirstDay` (default) | First week begins on first day of year | January 1 is always in week 1 |
| `FirstFourDayWeek` | First week with 4+ days in the new year | ISO 8601 standard |
| `FirstFullWeek` | First complete week in the new year | First full week after January 1 |

### FirstDay Rule

The first week of the year begins on January 1, regardless of day of week.

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     ShowWeekNumbers="True"
                     WeekNumberRule="FirstDay" />
```

**C#:**
```csharp
sfCalendar.ShowWeekNumbers = true;
sfCalendar.WeekNumberRule = CalendarWeekRule.FirstDay;
```

**Example:** If January 1, 2026 is Thursday:
- Week 1: January 1-4 (Thu-Sun)
- Week 2: January 5-11 (Mon-Sun)

### FirstFourDayWeek Rule (ISO 8601)

The first week containing at least 4 days of the new year.

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     ShowWeekNumbers="True"
                     WeekNumberRule="FirstFourDayWeek" />
```

**C#:**
```csharp
sfCalendar.ShowWeekNumbers = true;
sfCalendar.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
```

**ISO 8601 Standard:** This is the international standard for week numbering, widely used in business and Europe.

**Example:** If January 1, 2026 is Thursday:
- Previous year's last week includes Jan 1-4
- Week 1: January 5-11 (first week with 4+ days in 2026)

**Use Cases:**
- International business applications
- European business calendars
- ISO compliance requirements

### FirstFullWeek Rule

The first complete week (7 days) in the new year.

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     ShowWeekNumbers="True"
                     WeekNumberRule="FirstFullWeek" />
```

**C#:**
```csharp
sfCalendar.ShowWeekNumbers = true;
sfCalendar.WeekNumberRule = CalendarWeekRule.FirstFullWeek;
```

**Example:** If January 1, 2026 is Thursday (and week starts Sunday):
- Week 1: January 4-10 (first full Sun-Sat week)
- January 1-3 belong to previous year's last week

## Week Number Format

Customize how week numbers are displayed using the `WeekNumberFormat` property.

### Format Syntax

Use `#` as a placeholder for the week number and add prefix/suffix text.

**Default:** `WeekNumberFormat = "#"` (displays just the number)

### Basic Formatting

**XAML:**
```xml
<calendar:SfCalendar x:Name="sfCalendar"
                     ShowWeekNumbers="True"
                     WeekNumberFormat="W #" />
```

**C#:**
```csharp
sfCalendar.ShowWeekNumbers = true;
sfCalendar.WeekNumberFormat = "W #";
```

**Result:** Displays as "W 1", "W 2", "W 3", etc.

### Format Examples

```csharp
// Just the number (default)
calendar.WeekNumberFormat = "#";
// Output: 1, 2, 3, ...

// With "W" prefix
calendar.WeekNumberFormat = "W #";
// Output: W 1, W 2, W 3, ...

// With "Week" prefix
calendar.WeekNumberFormat = "Week #";
// Output: Week 1, Week 2, Week 3, ...

// With suffix
calendar.WeekNumberFormat = "# wk";
// Output: 1 wk, 2 wk, 3 wk, ...

// Localized (German)
calendar.WeekNumberFormat = "KW #";
// Output: KW 1, KW 2, KW 3, ... (Kalenderwoche)

// With brackets
calendar.WeekNumberFormat = "[#]";
// Output: [1], [2], [3], ...
```

### Complete Example

**XAML:**
```xml
<calendar:SfCalendar 
    HorizontalAlignment="Center"
    VerticalAlignment="Center"
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFourDayWeek"
    WeekNumberFormat="W #" />
```

**C#:**
```csharp
SfCalendar sfCalendar = new SfCalendar();
sfCalendar.ShowWeekNumbers = true;
sfCalendar.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
sfCalendar.WeekNumberFormat = "W #";
```

## Custom Week Number Templates

For advanced customization, use the `WeekNumberTemplate` property to create custom visual representations.

### Basic Custom Template

**XAML:**
```xml
<Grid>
    <Grid.Resources>
        <DataTemplate x:Key="WeekNumberTemplate">
            <Viewbox>
                <Grid>
                    <Ellipse Width="30" Height="30" 
                             Fill="LightBlue"
                             HorizontalAlignment="Center" 
                             VerticalAlignment="Center"
                             Margin="1" />
                    <TextBlock Text="{Binding DisplayText}" 
                               HorizontalAlignment="Center"
                               VerticalAlignment="Center" 
                               Foreground="DarkBlue"
                               FontWeight="Bold" />
                </Grid>
            </Viewbox>
        </DataTemplate>
    </Grid.Resources>
    
    <calendar:SfCalendar ShowWeekNumbers="True">
        <calendar:SfCalendar.Resources>
            <Style TargetType="calendar:CalendarItem">
                <Setter Property="ContentTemplateSelector">
                    <Setter.Value>
                        <calendar:CalendarItemTemplateSelector 
                            WeekNumberTemplate="{StaticResource WeekNumberTemplate}" />
                    </Setter.Value>
                </Setter>
            </Style>
        </calendar:SfCalendar.Resources>
    </calendar:SfCalendar>
</Grid>
```

**Result:** Week numbers appear in circular blue badges.

### Custom Week Name and Number Template

Customize both week numbers and day name headers together.

**XAML:**
```xml
<Grid>
    <Grid.Resources>
        <DataTemplate x:Key="WeekNameAndNumberTemplate">
            <Viewbox>
                <Grid>
                    <Ellipse Width="30" Height="30" 
                             Fill="WhiteSmoke"
                             HorizontalAlignment="Center" 
                             VerticalAlignment="Center"
                             Margin="1" />
                    <TextBlock Text="{Binding DisplayText}" 
                               HorizontalAlignment="Center"
                               VerticalAlignment="Center" 
                               Foreground="DeepSkyBlue"
                               FontWeight="SemiBold" />
                </Grid>
            </Viewbox>
        </DataTemplate>
    </Grid.Resources>
    
    <calendar:SfCalendar 
        WeekNumberRule="FirstFourDayWeek"
        ShowWeekNumbers="True">
        <calendar:SfCalendar.Resources>
            <Style TargetType="calendar:CalendarItem">
                <Setter Property="ContentTemplateSelector">
                    <Setter.Value>
                        <calendar:CalendarItemTemplateSelector 
                            WeekNameTemplate="{StaticResource WeekNameAndNumberTemplate}"
                            WeekNumberTemplate="{StaticResource WeekNameAndNumberTemplate}" />
                    </Setter.Value>
                </Setter>
            </Style>
        </calendar:SfCalendar.Resources>
    </calendar:SfCalendar>
</Grid>
```

## Week Numbers with Different Cultures

Week number calculation can vary by culture when combined with localization.

### ISO 8601 with European Locale

```csharp
calendar.Language = "de-DE";
calendar.ShowWeekNumbers = true;
calendar.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
calendar.FirstDayOfWeek = FirstDayOfWeek.Monday;
calendar.WeekNumberFormat = "KW #";
```

### US Style

```csharp
calendar.Language = "en-US";
calendar.ShowWeekNumbers = true;
calendar.WeekNumberRule = CalendarWeekRule.FirstDay;
calendar.FirstDayOfWeek = FirstDayOfWeek.Sunday;
calendar.WeekNumberFormat = "Week #";
```

## Common Scenarios

### Scenario 1: Business Calendar (ISO 8601)

```xml
<calendar:SfCalendar 
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFourDayWeek"
    FirstDayOfWeek="Monday"
    WeekNumberFormat="W #" />
```

**Use Case:** European business applications, project planning, agile sprints.

### Scenario 2: Simple Week Display

```xml
<calendar:SfCalendar 
    ShowWeekNumbers="True"
    WeekNumberRule="FirstDay" />
```

**Use Case:** Quick reference, casual planning.

### Scenario 3: Full Week Display

```xml
<calendar:SfCalendar 
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFullWeek"
    FirstDayOfWeek="Sunday" />
```

**Use Case:** Academic calendars, payroll systems.

### Scenario 4: Localized German Calendar

```csharp
calendar.Language = "de-DE";
calendar.ShowWeekNumbers = true;
calendar.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
calendar.FirstDayOfWeek = FirstDayOfWeek.Monday;
calendar.WeekNumberFormat = "KW #"; // Kalenderwoche
```

### Scenario 5: Project Planning Calendar

```xml
<calendar:SfCalendar 
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFourDayWeek"
    FirstDayOfWeek="Monday"
    SelectionMode="Range">
    <!-- Additional styling for project planning -->
</calendar:SfCalendar>
```

## Week Number Properties Summary

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ShowWeekNumbers` | bool | false | Enable/disable week number display |
| `WeekNumberRule` | CalendarWeekRule | FirstDay | How to calculate first week of year |
| `WeekNumberFormat` | string | "#" | Display format (use # as placeholder) |
| `WeekNumberTemplate` | DataTemplate | null | Custom template for week numbers |

## Best Practices

1. **ISO Standard:** Use `FirstFourDayWeek` for international business applications
2. **Consistency:** Match `FirstDayOfWeek` with your culture/region
3. **Format Clarity:** Use clear prefixes ("W #" or "Week #") for user understanding
4. **Localization:** Translate format strings for different languages
5. **Space Consideration:** Week numbers add extra width; ensure adequate space

## Troubleshooting

### Issue: Week Numbers Not Showing
**Solution:** Verify `ShowWeekNumbers="True"` is set

### Issue: Week 1 Starts at Wrong Time
**Solution:** Check and adjust `WeekNumberRule` to match your requirements

### Issue: Week Numbers Showing Wrong Values
**Solution:** Ensure `FirstDayOfWeek` matches your week calculation rule

### Issue: Custom Template Not Applying
**Solution:** Verify `CalendarItemTemplateSelector` is properly configured with `WeekNumberTemplate`

## Related Topics

- [Localization and Formatting](localization-formatting.md) - Language and culture settings
- [Getting Started](getting-started.md) - Basic setup
- [Customization](customization.md) - Visual styling

## Code Examples

Download working samples:
- [Week Number Examples on GitHub](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples/)

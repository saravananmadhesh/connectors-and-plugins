# Week Numbers

## Table of Contents
- [Overview](#overview)
- [Enable Week Numbers](#enable-week-numbers)
- [Week Number Rules](#week-number-rules)
- [Week Number Formatting](#week-number-formatting)
- [Custom Templates](#custom-templates)
- [Complete Customization Example](#complete-customization-example)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)

## Overview

The `SfCalendarDatePicker` can display week numbers for each week in the drop-down calendar. This feature is useful for applications that need to reference calendar weeks, such as project management, scheduling, and business planning tools.

**Week Number Features:**
- Display week numbers in calendar
- Multiple week numbering rules (ISO, US, etc.)
- Custom week number formatting
- Template customization for appearance

## Enable Week Numbers

Show week numbers by setting the `ShowWeekNumbers` property.

### Basic Usage

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    HorizontalAlignment="Center" 
    VerticalAlignment="Center"
    ShowWeekNumbers="True" />
```

```csharp
sfCalendarDatePicker.ShowWeekNumbers = true;
```

**Default:** `false`

**Visual Result:** Week numbers appear in a column on the left side of the calendar.

### With Custom Styling

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFourDayWeek"
    WeekNumberFormat="W #" />
```

## Week Number Rules

Control how the first week of the year is determined using the `WeekNumberRule` property.

### WeekNumberRule Options

```csharp
// FirstDay (default)
sfCalendarDatePicker.WeekNumberRule = CalendarWeekRule.FirstDay;

// FirstFourDayWeek (ISO 8601)
sfCalendarDatePicker.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;

// FirstFullWeek
sfCalendarDatePicker.WeekNumberRule = CalendarWeekRule.FirstFullWeek;
```

**XAML:**
```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFourDayWeek" />
```

### FirstDay Rule

**Definition:** The first week of the year begins on the first day of the year and ends before the following designated first day of the week.

```csharp
sfCalendarDatePicker.ShowWeekNumbers = true;
sfCalendarDatePicker.WeekNumberRule = CalendarWeekRule.FirstDay;
```

**Behavior:**
- Week 1 starts on January 1st
- Simple and consistent
- Used in US and some other countries

**Example (if FirstDayOfWeek = Sunday):**
- If Jan 1 is Wednesday, Week 1 = Wed, Thu, Fri, Sat
- Week 2 starts on Sunday, Jan 5

### FirstFourDayWeek Rule (ISO 8601)

**Definition:** The first week of the year is the first week with four or more days before the designated first day of the week.

```csharp
sfCalendarDatePicker.ShowWeekNumbers = true;
sfCalendarDatePicker.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
```

**Behavior:**
- Week 1 must contain at least 4 days of the new year
- ISO 8601 standard used internationally
- Week 1 always contains January 4th

**Example (if FirstDayOfWeek = Monday):**
- If Jan 1 is Friday, Week 1 = Mon Dec 29, ..., Sun Jan 4
- If Jan 1 is Monday, Week 1 = Mon Jan 1, ..., Sun Jan 7

**Use Case:** International business, European standards, ISO compliance.

### FirstFullWeek Rule

**Definition:** The first week of the year begins on the first occurrence of the designated first day of the week on or after the first day of the year.

```csharp
sfCalendarDatePicker.ShowWeekNumbers = true;
sfCalendarDatePicker.WeekNumberRule = CalendarWeekRule.FirstFullWeek;
```

**Behavior:**
- Week 1 is the first complete week of the year
- Starts on the designated FirstDayOfWeek
- Days before Week 1 may belong to Week 52/53 of previous year

**Example (if FirstDayOfWeek = Sunday):**
- If Jan 1 is Wednesday, Week 1 starts on Sunday, Jan 5
- Jan 1-4 belong to the last week of the previous year

**Use Case:** US payroll systems, some business calendars.

### Choosing the Right Rule

| Rule | Best For | Standard |
|------|----------|----------|
| FirstDay | Simple applications, US preference | US |
| FirstFourDayWeek | International business, ISO compliance | ISO 8601 |
| FirstFullWeek | Payroll systems, complete weeks | US Business |

## Week Number Formatting

Customize how week numbers are displayed using the `WeekNumberFormat` property.

### Default Format

```csharp
// Default: displays just the number
sfCalendarDatePicker.WeekNumberFormat = "#";
```

**Result:** 1, 2, 3, ..., 52

### Custom Prefix

```csharp
// Add "W" prefix
sfCalendarDatePicker.WeekNumberFormat = "W #";
```

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowWeekNumbers="True"
    WeekNumberFormat="W #" />
```

**Result:** W 1, W 2, W 3, ..., W 52

### Custom Suffix

```csharp
// Add suffix
sfCalendarDatePicker.WeekNumberFormat = "# wk";
```

**Result:** 1 wk, 2 wk, 3 wk, ..., 52 wk

### Custom Format Examples

```csharp
// Week with colon
sfCalendarDatePicker.WeekNumberFormat = "Wk: #";
// Result: Wk: 1, Wk: 2, ...

// Simple prefix
sfCalendarDatePicker.WeekNumberFormat = "Week #";
// Result: Week 1, Week 2, ...

// Brackets
sfCalendarDatePicker.WeekNumberFormat = "[#]";
// Result: [1], [2], ...

// Just numbers (default)
sfCalendarDatePicker.WeekNumberFormat = "#";
// Result: 1, 2, ...
```

**Note:** The `#` symbol represents the week number. You can add any prefix or suffix characters around it.

## Custom Templates

Customize the visual appearance of week numbers and day names using templates.

### WeekNumberTemplate and WeekNameTemplate

```xml
<Grid>
    <Grid.Resources>
        <DataTemplate x:Key="WeekNameAndNumberTemplate">
            <Viewbox>
                <Grid>
                    <Ellipse 
                        Width="30" 
                        Height="30" 
                        Fill="White"
                        HorizontalAlignment="Center" 
                        VerticalAlignment="Center"
                        Margin="1" />
                    <TextBlock 
                        Text="{Binding DisplayText}" 
                        HorizontalAlignment="Center"
                        VerticalAlignment="Center" 
                        Foreground="DeepSkyBlue"/>
                </Grid>
            </Viewbox>
        </DataTemplate>
    </Grid.Resources>
    
    <calendar:SfCalendarDatePicker 
        x:Name="sfCalendarDatePicker"
        HorizontalAlignment="Center" 
        VerticalAlignment="Center" 
        ShowWeekNumbers="True">
        <FlyoutBase.AttachedFlyout>
            <editors:DropDownFlyout>
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
            </editors:DropDownFlyout>
        </FlyoutBase.AttachedFlyout>
    </calendar:SfCalendarDatePicker>
</Grid>
```

### CalendarItemTemplateSelector

The `CalendarItemTemplateSelector` class provides properties for customizing different calendar elements:

- **WeekNumberTemplate** - Template for week number cells
- **WeekNameTemplate** - Template for day-of-week header cells
- **DayTemplate** - Template for day cells (optional)

### Custom Week Number Style

```xml
<DataTemplate x:Key="WeekNumberTemplate">
    <Grid Background="#E3F2FD" Padding="2">
        <TextBlock 
            Text="{Binding DisplayText}" 
            FontSize="11"
            FontWeight="SemiBold"
            Foreground="#1976D2"
            HorizontalAlignment="Center"
            VerticalAlignment="Center" />
    </Grid>
</DataTemplate>
```

### Custom Day Name Header Style

```xml
<DataTemplate x:Key="DayNameTemplate">
    <Grid Background="#BBDEFB" Padding="2">
        <TextBlock 
            Text="{Binding DisplayText}" 
            FontSize="12"
            FontWeight="Bold"
            Foreground="#0D47A1"
            HorizontalAlignment="Center"
            VerticalAlignment="Center" />
    </Grid>
</DataTemplate>
```

## Complete Customization Example

Full example with custom styling for week numbers and day names:

```xml
<Grid>
    <Grid.Resources>
        <!-- Week Number Template -->
        <DataTemplate x:Key="WeekNumberTemplate">
            <Border 
                Background="#E8F5E9" 
                BorderBrush="#4CAF50"
                BorderThickness="1"
                CornerRadius="4"
                Padding="4,2">
                <StackPanel Orientation="Horizontal" HorizontalAlignment="Center">
                    <TextBlock 
                        Text="W" 
                        FontSize="9"
                        FontWeight="SemiBold"
                        Foreground="#2E7D32"
                        Margin="0,0,2,0" />
                    <TextBlock 
                        Text="{Binding DisplayText}" 
                        FontSize="11"
                        FontWeight="Bold"
                        Foreground="#1B5E20" />
                </StackPanel>
            </Border>
        </DataTemplate>
        
        <!-- Day Name Template -->
        <DataTemplate x:Key="DayNameTemplate">
            <Border 
                Background="#FFF3E0" 
                Padding="4,2">
                <TextBlock 
                    Text="{Binding DisplayText}" 
                    FontSize="11"
                    FontWeight="Bold"
                    Foreground="#E65100"
                    HorizontalAlignment="Center"
                    VerticalAlignment="Center" />
            </Border>
        </DataTemplate>
    </Grid.Resources>
    
    <calendar:SfCalendarDatePicker 
        x:Name="calendarDatePicker"
        HorizontalAlignment="Center" 
        VerticalAlignment="Center"
        ShowWeekNumbers="True"
        WeekNumberRule="FirstFourDayWeek">
        <FlyoutBase.AttachedFlyout>
            <editors:DropDownFlyout>
                <calendar:SfCalendar 
                    SelectedDate="{x:Bind calendarDatePicker.SelectedDate, Mode=TwoWay}"
                    WeekNumberRule="FirstFourDayWeek"
                    ShowWeekNumbers="True">
                    <calendar:SfCalendar.Resources>
                        <Style TargetType="calendar:CalendarItem">
                            <Setter Property="ContentTemplateSelector">
                                <Setter.Value>
                                    <calendar:CalendarItemTemplateSelector 
                                        WeekNumberTemplate="{StaticResource WeekNumberTemplate}"
                                        WeekNameTemplate="{StaticResource DayNameTemplate}" />
                                </Setter.Value>
                            </Setter>
                        </Style>
                    </calendar:SfCalendar.Resources>
                </calendar:SfCalendar>
            </editors:DropDownFlyout>
        </FlyoutBase.AttachedFlyout>
    </calendar:SfCalendarDatePicker>
</Grid>
```

## Common Use Cases

### Use Case 1: ISO 8601 Week Numbers

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFourDayWeek"
    FirstDayOfWeek="Monday"
    WeekNumberFormat="W#" />
```

**Purpose:** International business, project management.

### Use Case 2: US Payroll Weeks

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFullWeek"
    FirstDayOfWeek="Sunday"
    WeekNumberFormat="Week #" />
```

**Purpose:** Payroll, timesheets, HR systems.

### Use Case 3: Manufacturing Schedule

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowWeekNumbers="True"
    WeekNumberRule="FirstDay"
    WeekNumberFormat="Wk #" />
```

**Purpose:** Production planning, inventory management.

### Use Case 4: Academic Calendar

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFourDayWeek"
    WeekNumberFormat="[#]" />
```

**Purpose:** School schedules, academic planning.

## Troubleshooting

### Issue: Week numbers not displaying

**Solution:** Ensure `ShowWeekNumbers` is set to `true`:

```csharp
sfCalendarDatePicker.ShowWeekNumbers = true;
```

### Issue: Week numbering seems incorrect

**Solution:** Check `WeekNumberRule` and `FirstDayOfWeek` combination:

```csharp
// For ISO 8601
sfCalendarDatePicker.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
sfCalendarDatePicker.FirstDayOfWeek = DayOfWeek.Monday;
```

### Issue: Custom format not applying

**Solution:** Verify format string includes `#` placeholder:

```csharp
// Correct
sfCalendarDatePicker.WeekNumberFormat = "W #";

// Incorrect
sfCalendarDatePicker.WeekNumberFormat = "W"; // Missing #
```

### Issue: Template not showing in calendar

**Solution:** Ensure template is defined in the `SfCalendar` resources within `AttachedFlyout`:

```xml
<FlyoutBase.AttachedFlyout>
    <editors:DropDownFlyout>
        <calendar:SfCalendar>
            <calendar:SfCalendar.Resources>
                <!-- Templates here -->
            </calendar:SfCalendar.Resources>
        </calendar:SfCalendar>
    </editors:DropDownFlyout>
</FlyoutBase.AttachedFlyout>
```

### Issue: Week numbers different from expected

**Solution:** Understand the impact of different rules:
- `FirstDay` - Week 1 always starts Jan 1
- `FirstFourDayWeek` - Week 1 must have 4+ days of new year
- `FirstFullWeek` - Week 1 is first complete week

Choose the rule that matches your business requirements.

### Issue: Week numbers overlap with dates

**Solution:** Adjust calendar size or template padding:

```csharp
sfCalendarDatePicker.DropDownWidth = 350; // Increase width
```

Or adjust template margins:

```xml
<DataTemplate x:Key="WeekNumberTemplate">
    <Grid Margin="2,0,4,0">
        <!-- Content -->
    </Grid>
</DataTemplate>
```

# Week Numbers for Calendar DateRange Picker

This guide covers how to display week numbers in the calendar, configure week numbering rules, format week numbers, and customize their appearance.

## Enable Week Numbers

### ShowWeekNumbers Property

Display week numbers for each week in the drop-down calendar using the `ShowWeekNumbers` property.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    HorizontalAlignment="Center"
    VerticalAlignment="Center"
    ShowWeekNumbers="True" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.ShowWeekNumbers = true;
```

**Default value:** `false`

### Visual Appearance

When enabled, week numbers appear in a column on the left side of the calendar, showing the week number for each row of dates.

## Week Number Rules

### WeekNumberRule Property

Determine how the first week of the year is calculated using the `WeekNumberRule` property.

**Available Rules:**
- `FirstDay` (default) - First week begins on January 1st
- `FirstFourDayWeek` - First week has at least 4 days in the new year
- `FirstFullWeek` - First week is the first complete week in the new year

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFullWeek" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.ShowWeekNumbers = true;
sfCalendarDateRangePicker.WeekNumberRule = CalendarWeekRule.FirstFullWeek;
```

### CalendarWeekRule Enum

```csharp
public enum CalendarWeekRule
{
    FirstDay,          // Week 1 begins on January 1
    FirstFourDayWeek,  // Week 1 is first week with ≥4 days in new year
    FirstFullWeek      // Week 1 is first complete week in new year
}
```

### Rule Comparison

**Scenario:** January 2026 starts on Thursday

| Rule | Week 1 Starts | Explanation |
|------|---------------|-------------|
| **FirstDay** | January 1 (Thu) | Week 1 begins on January 1st, regardless of day |
| **FirstFourDayWeek** | January 1 (Thu) | Week includes 4 days (Thu-Sun), qualifies as Week 1 |
| **FirstFullWeek** | January 4 (Sun)* | First complete week starts on the first occurrence of FirstDayOfWeek |

*Assumes `FirstDayOfWeek = Sunday`

### ISO 8601 Standard

For ISO 8601 compliance (used in most of Europe):

```csharp
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Monday;
sfCalendarDateRangePicker.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
sfCalendarDateRangePicker.ShowWeekNumbers = true;
```

**ISO 8601 Rules:**
- Week starts on Monday
- Week 1 contains the first Thursday of the year
- Equivalent to `FirstFourDayWeek` with `FirstDayOfWeek = Monday`

### Regional Examples

#### United States

```csharp
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Sunday;
sfCalendarDateRangePicker.WeekNumberRule = CalendarWeekRule.FirstDay;
```

#### Europe (ISO 8601)

```csharp
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Monday;
sfCalendarDateRangePicker.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
```

#### Middle East

```csharp
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Saturday;
sfCalendarDateRangePicker.WeekNumberRule = CalendarWeekRule.FirstDay;
```

## Format Week Numbers

### WeekNumberFormat Property

Customize the format of week numbers using the `WeekNumberFormat` property. Use `#` as a placeholder for the week number.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    ShowWeekNumbers="True"
    WeekNumberRule="FirstFullWeek"
    WeekNumberFormat="W #" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.ShowWeekNumbers = true;
sfCalendarDateRangePicker.WeekNumberRule = CalendarWeekRule.FirstFullWeek;
sfCalendarDateRangePicker.WeekNumberFormat = "W #";
```

**Default value:** `"#"` (just the number)

### Format Examples

```csharp
// Just the number
sfCalendarDateRangePicker.WeekNumberFormat = "#";
// Output: 1, 2, 3, ...

// With "W" prefix
sfCalendarDateRangePicker.WeekNumberFormat = "W #";
// Output: W 1, W 2, W 3, ...

// With "Week" prefix
sfCalendarDateRangePicker.WeekNumberFormat = "Week #";
// Output: Week 1, Week 2, Week 3, ...

// With parentheses
sfCalendarDateRangePicker.WeekNumberFormat = "(#)";
// Output: (1), (2), (3), ...

// With hash symbol
sfCalendarDateRangePicker.WeekNumberFormat = "# #";
// Output: # 1, # 2, # 3, ...

// Abbreviated
sfCalendarDateRangePicker.WeekNumberFormat = "Wk#";
// Output: Wk1, Wk2, Wk3, ...
```

### Localized Formats

```csharp
// German
sfCalendarDateRangePicker.Language = "de-DE";
sfCalendarDateRangePicker.WeekNumberFormat = "KW #"; // Kalenderwoche
// Output: KW 1, KW 2, KW 3, ...

// French
sfCalendarDateRangePicker.Language = "fr-FR";
sfCalendarDateRangePicker.WeekNumberFormat = "S #"; // Semaine
// Output: S 1, S 2, S 3, ...

// Spanish
sfCalendarDateRangePicker.Language = "es-ES";
sfCalendarDateRangePicker.WeekNumberFormat = "Sem #"; // Semana
// Output: Sem 1, Sem 2, Sem 3, ...
```

## Customize Week Number Templates

### WeekNumberTemplate and WeekNameTemplate

Use `CalendarItemTemplateSelector` to customize the appearance of week numbers and day-of-week headers.

**Complete Example:**

```xaml
<Grid>
    <Grid.Resources>
        <!-- Template for week numbers and day names -->
        <DataTemplate x:Key="WeekNameAndNumberTemplate">
            <Viewbox>
                <Grid>
                    <!-- Circular background -->
                    <Ellipse Width="30" 
                             Height="30" 
                             Fill="White"
                             HorizontalAlignment="Center" 
                             VerticalAlignment="Center"
                             Margin="1" />
                    
                    <!-- Text content -->
                    <TextBlock Text="{Binding DisplayText}" 
                               HorizontalAlignment="Center"
                               VerticalAlignment="Center" 
                               Foreground="DeepSkyBlue"/>
                </Grid>
            </Viewbox>
        </DataTemplate>
    </Grid.Resources>
    
    <calendar:SfCalendarDateRangePicker 
        x:Name="sfCalendarDateRangePicker"
        HorizontalAlignment="Center" 
        VerticalAlignment="Center" 
        ShowWeekNumbers="True"
        WeekNumberRule="FirstFullWeek">
        
        <FlyoutBase.AttachedFlyout>
            <editors:DropDownFlyout>
                <calendar:SfCalendar 
                    ShowWeekNumbers="{x:Bind sfCalendarDateRangePicker.ShowWeekNumbers, Mode=TwoWay}"
                    SelectedRange="{x:Bind sfCalendarDateRangePicker.SelectedRange, Mode=TwoWay}">
                    
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
    </calendar:SfCalendarDateRangePicker>
</Grid>
```

### Required Namespaces

```xaml
xmlns:calendar="using:Syncfusion.UI.Xaml.Calendar"
xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
```

### Custom Week Number Template Variations

#### Pattern 1: Colored Background

```xaml
<DataTemplate x:Key="ColoredWeekNumberTemplate">
    <Grid>
        <Rectangle Fill="CornflowerBlue" 
                   RadiusX="5" 
                   RadiusY="5"
                   Opacity="0.3"/>
        <TextBlock Text="{Binding DisplayText}"
                   FontWeight="Bold"
                   Foreground="DarkBlue"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"
                   Margin="5"/>
    </Grid>
</DataTemplate>
```

#### Pattern 2: Bordered Style

```xaml
<DataTemplate x:Key="BorderedWeekNumberTemplate">
    <Border BorderBrush="Gray"
            BorderThickness="1"
            CornerRadius="3"
            Padding="5">
        <TextBlock Text="{Binding DisplayText}"
                   FontSize="12"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"/>
    </Border>
</DataTemplate>
```

#### Pattern 3: Icon-Based

```xaml
<DataTemplate x:Key="IconWeekNumberTemplate">
    <StackPanel Orientation="Horizontal" Spacing="3">
        <FontIcon Glyph="&#xE787;" FontSize="10" Foreground="Gray"/>
        <TextBlock Text="{Binding DisplayText}"
                   FontSize="11"
                   VerticalAlignment="Center"/>
    </StackPanel>
</DataTemplate>
```

## Complete Configuration Example

### Business Calendar Setup

```csharp
// ISO 8601 compliant calendar with week numbers
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();

// Week configuration
sfCalendarDateRangePicker.ShowWeekNumbers = true;
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Monday;
sfCalendarDateRangePicker.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
sfCalendarDateRangePicker.WeekNumberFormat = "W #";

// Display configuration
sfCalendarDateRangePicker.DayOfWeekFormat = "{dayofweek.abbreviated(2)}";
sfCalendarDateRangePicker.MonthHeaderFormat = "{month.abbreviated} {year.full}";
```

### Regional Calendar Setup

```csharp
// German calendar with week numbers
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();

sfCalendarDateRangePicker.Language = "de-DE";
sfCalendarDateRangePicker.ShowWeekNumbers = true;
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Monday;
sfCalendarDateRangePicker.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
sfCalendarDateRangePicker.WeekNumberFormat = "KW #";
```

## Use Cases

### Business Applications

Week numbers are commonly used in:

1. **Project Management** - Track work weeks, sprint planning
2. **Reporting** - Weekly reports, KPI tracking
3. **Manufacturing** - Production schedules, inventory cycles
4. **Logistics** - Delivery planning, shipment tracking
5. **Retail** - Sales reporting, promotional campaigns
6. **Healthcare** - Appointment scheduling, staff rotation
7. **Education** - Academic schedules, term planning

### Industry Standards

- **ISO 8601** - International standard for date and time (FirstFourDayWeek, Monday start)
- **US Business** - Often uses FirstDay with Sunday start
- **European Business** - Typically follows ISO 8601
- **Manufacturing** - Often custom rules aligned with fiscal years

## Best Practices

1. **Match regional expectations** - Use appropriate `WeekNumberRule` for your region
2. **Align with FirstDayOfWeek** - Ensure week numbers match your week start day
3. **Clear formatting** - Use recognizable prefixes (W, Wk, Week) for clarity
4. **Consistent styling** - Match week number appearance with overall calendar theme
5. **Test year boundaries** - Verify week numbering at year transitions
6. **Document rules** - Clearly communicate which week numbering system is used

## Common Issues and Solutions

### Issue: Week numbers don't appear

**Problem:** ShowWeekNumbers is true but numbers aren't visible.

**Solution:** Ensure the property is set before the calendar is displayed:
```csharp
sfCalendarDateRangePicker.ShowWeekNumbers = true;
```

### Issue: Week 1 appears in December

**Problem:** Week numbering seems off at year end.

**Solution:** This is correct behavior for certain rules. With `FirstFourDayWeek`, the last days of December can be Week 1 of the next year if they meet the threshold. Use `FirstDay` if you want January 1st to always be Week 1:
```csharp
sfCalendarDateRangePicker.WeekNumberRule = CalendarWeekRule.FirstDay;
```

### Issue: Week numbers don't match expectations

**Problem:** Week numbers differ from other systems.

**Solution:** Verify `FirstDayOfWeek` and `WeekNumberRule` match the expected standard:
```csharp
// ISO 8601 standard
sfCalendarDateRangePicker.FirstDayOfWeek = FirstDayOfWeek.Monday;
sfCalendarDateRangePicker.WeekNumberRule = CalendarWeekRule.FirstFourDayWeek;
```

### Issue: Custom template not applying

**Problem:** WeekNumberTemplate doesn't take effect.

**Solution:** Ensure you're using `AttachedFlyout` with `DropDownFlyout` and setting the template in the inner `SfCalendar`:
```xaml
<FlyoutBase.AttachedFlyout>
    <editors:DropDownFlyout>
        <calendar:SfCalendar>
            <!-- Apply templates here -->
        </calendar:SfCalendar>
    </editors:DropDownFlyout>
</FlyoutBase.AttachedFlyout>
```

## Next Steps

- **UI Customization** - Learn more about calendar styling in [ui-customization.md](ui-customization.md)
- **Localization** - Configure regional settings in [localization-formatting.md](localization-formatting.md)
- **Getting Started** - Review basic setup in [getting-started.md](getting-started.md)

# Getting Started with Calendar DateRange Picker

This guide covers installation, basic setup, and fundamental usage of the WinUI CalendarDateRangePicker control.

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [Adding the Control](#adding-the-control)
- [Selecting Date Ranges](#selecting-date-ranges)
- [Header and Description](#header-and-description)
- [Watermark Text](#watermark-text)
- [Selection Change Notifications](#selection-change-notifications)
- [Drop-down Button Configuration](#drop-down-button-configuration)
- [Submit Buttons](#submit-buttons)
- [Control Structure](#control-structure)

## Installation and Setup

### Prerequisites

1. Create a WinUI 3 desktop app for C# and .NET 9 or later
2. Ensure your project targets Windows 10, version 1809 or later

### Install NuGet Package

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Calendar.WinUI
```

**NuGet Package Manager:**
- Search for `Syncfusion.Calendar.WinUI`
- Install the latest version

### Import Namespace

**XAML:**
```xaml
xmlns:calendar="using:Syncfusion.UI.Xaml.Calendar"
```

**C#:**
```csharp
using Syncfusion.UI.Xaml.Calendar;
```

## Adding the Control

### XAML Implementation

```xaml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:calendar="using:Syncfusion.UI.Xaml.Calendar">
    
    <Grid Name="grid">
        <calendar:SfCalendarDateRangePicker 
            Name="sfCalendarDateRangePicker"
            HorizontalAlignment="Center"
            VerticalAlignment="Center" />
    </Grid>
</Window>
```

### C# Implementation

```csharp
using Syncfusion.UI.Xaml.Calendar;

namespace GettingStarted
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Create an instance of CalendarDateRangePicker
            SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
            
            // Add to the grid
            this.Content = sfCalendarDateRangePicker;
        }
    }
}
```

## Selecting Date Ranges

### Programmatic Selection

Use the `SelectedRange` property to set or change the selected date range programmatically.

```csharp
// Set a date range
sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(
    new DateTimeOffset(new DateTime(2026, 3, 17)), 
    new DateTimeOffset(new DateTime(2026, 3, 24))
);
```

**XAML Binding:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    SelectedRange="{x:Bind ViewModel.DateRange, Mode=TwoWay}" />
```

### Clear Selection

```csharp
// Clear the selected range
sfCalendarDateRangePicker.SelectedRange = null;
```

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    SelectedRange="{x:Null}" />
```

### Interactive Selection

Users can select date ranges interactively by:

1. **Clicking the drop-down button** - Opens the calendar
2. **Selecting start date** - Click on the first date
3. **Selecting end date** - Click on the last date in the range
4. **Confirming selection** - Range is automatically set (or click OK if submit buttons are shown)

```csharp
// Access the selected range
if (sfCalendarDateRangePicker.SelectedRange != null)
{
    DateTimeOffset startDate = sfCalendarDateRangePicker.SelectedRange.StartDate;
    DateTimeOffset endDate = sfCalendarDateRangePicker.SelectedRange.EndDate;
    
    TimeSpan duration = endDate - startDate;
    Debug.WriteLine($"Selected {duration.Days + 1} days");
}
```

### SelectedRange Property Details

The `SelectedRange` property is of type `DateTimeOffsetRange`, which contains:
- **StartDate** - The beginning of the date range
- **EndDate** - The end of the date range

**Default value:** `null` (no selection)

## Header and Description

### Header Property

Display a title above the control using the `Header` property.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    Header="Select the dates"
    Width="300"
    Height="70" />
```

**C#:**
```csharp
SfCalendarDateRangePicker dateRangePicker = new SfCalendarDateRangePicker();
dateRangePicker.Header = "Select the dates";
```

### Header Template

Customize the header appearance with `HeaderTemplate`.

```xaml
<calendar:SfCalendarDateRangePicker Width="250" Height="75">
    <calendar:SfCalendarDateRangePicker.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <FontIcon FontFamily="Segoe MDL2 Assets" Glyph="&#xE163;"/>
                <TextBlock Text="Training Dates" FontSize="14" Margin="5"/>
            </StackPanel>
        </DataTemplate>
    </calendar:SfCalendarDateRangePicker.HeaderTemplate>
</calendar:SfCalendarDateRangePicker>
```

### Description Property

Add helper text below the control with the `Description` property.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    Header="Select the dates"
    Description="The range should be greater than 5 days."
    Width="300"
    Height="90" />
```

**C#:**
```csharp
dateRangePicker.Header = "Select the dates";
dateRangePicker.Description = "The range should be greater than 5 days.";
```

### Complete Example

```xaml
<calendar:SfCalendarDateRangePicker 
    Header="Vacation Period"
    Description="Select your start and end dates for vacation"
    PlaceholderText="Choose dates"
    Width="300"
    Height="90" />
```

## Watermark Text

The `PlaceholderText` property displays watermark text when no range is selected.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    Name="sfCalendarDateRangePicker"
    PlaceholderText="Select the Date"
    SelectedRange="{x:Null}" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.PlaceholderText = "Select the Date";
sfCalendarDateRangePicker.SelectedRange = null;
```

**Default value:** "Select a date range"

### Use Cases

- **Prompting users** - "Choose check-in and check-out dates"
- **Providing context** - "Select report period"
- **Offering guidance** - "Pick start and end dates"

## Selection Change Notifications

### SelectedDateRangeChanged Event

Handle the `SelectedDateRangeChanged` event to respond when the selected range changes.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    Name="sfCalendarDateRangePicker"
    SelectedDateRangeChanged="SfCalendarDateRangePicker_SelectedDateRangeChanged" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.SelectedDateRangeChanged += SfCalendarDateRangePicker_SelectedDateRangeChanged;
```

### Event Handler

```csharp
private void SfCalendarDateRangePicker_SelectedDateRangeChanged(object sender, SelectedDateRangeChangedEventArgs e)
{
    // Get old values
    DateTimeOffset? startOldValue = e.RangeStartOldValue;
    DateTimeOffset? endOldValue = e.RangeEndOldValue;
    
    // Get new values
    DateTimeOffset? startNewValue = e.RangeStartNewValue;
    DateTimeOffset? endNewValue = e.RangeEndNewValue;
    
    if (startNewValue.HasValue && endNewValue.HasValue)
    {
        TimeSpan duration = endNewValue.Value - startNewValue.Value;
        int days = duration.Days + 1;
        
        Debug.WriteLine($"New range selected: {days} days");
        Debug.WriteLine($"From: {startNewValue.Value:d}");
        Debug.WriteLine($"To: {endNewValue.Value:d}");
    }
}
```

### Event Arguments Properties

- **RangeStartOldValue** - Previously selected start date
- **RangeStartNewValue** - Currently selected start date
- **RangeEndOldValue** - Previously selected end date
- **RangeEndNewValue** - Currently selected end date

### Validation Example

```csharp
private void SfCalendarDateRangePicker_SelectedDateRangeChanged(object sender, SelectedDateRangeChangedEventArgs e)
{
    if (e.RangeStartNewValue.HasValue && e.RangeEndNewValue.HasValue)
    {
        TimeSpan duration = e.RangeEndNewValue.Value - e.RangeStartNewValue.Value;
        
        if (duration.Days < 3)
        {
            // Show warning
            var dialog = new ContentDialog
            {
                Title = "Invalid Range",
                Content = "Please select at least 3 days.",
                CloseButtonText = "OK"
            };
            dialog.ShowAsync();
        }
    }
}
```

## Drop-down Button Configuration

### Show or Hide Drop-down Button

Control the visibility of the drop-down button with the `ShowDropDownButton` property.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    ShowDropDownButton="False" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.ShowDropDownButton = false;
```

**Default value:** `true`

### Opening Drop-down Without Button

When the drop-down button is hidden, users can still open the calendar using:

- **ALT + Down Arrow** keyboard shortcut
- **Clicking the text field** (if configured)
- **Programmatically** using the `IsOpen` property

```csharp
// Open drop-down programmatically
sfCalendarDateRangePicker.IsOpen = true;
```

## Submit Buttons

### Show OK and Cancel Buttons

Display submit buttons in the drop-down using the `ShowSubmitButtons` property.

**XAML:**
```xaml
<calendar:SfCalendarDateRangePicker 
    x:Name="sfCalendarDateRangePicker"
    ShowSubmitButtons="True" />
```

**C#:**
```csharp
SfCalendarDateRangePicker sfCalendarDateRangePicker = new SfCalendarDateRangePicker();
sfCalendarDateRangePicker.ShowSubmitButtons = true;
```

**Default value:** `false`

### Behavior Differences

**When ShowSubmitButtons = false:**
- Selected range updates immediately when dates are clicked
- Drop-down closes automatically after selecting end date

**When ShowSubmitButtons = true:**
- Selected range updates only when OK button is clicked
- Users can change their selection before confirming
- Cancel button reverts to previous selection

### Use Cases

- **Submit buttons enabled** - Critical selections (booking confirmations, financial transactions)
- **Submit buttons disabled** - Quick selections (filtering, report generation)

## Control Structure

The CalendarDateRangePicker control consists of:

### Editor Section
- **Text field** - Displays selected date range
- **Placeholder text** - Shown when no range is selected
- **Drop-down button** - Opens the calendar (optional)

### Drop-down Section
- **Calendar** - Month/year/decade/century views for date selection
- **Week numbers column** - Optional week display (left side)
- **Preset items panel** - Optional list of predefined ranges (left or right side)
- **Submit buttons** - Optional OK/Cancel buttons (bottom)

### Visual Hierarchy

```
┌─────────────────────────────────────┐
│ Header Text                         │
├─────────────────────────────────────┤
│ [Start Date - End Date]        [▼]  │ ← Editor
├─────────────────────────────────────┤
│ Description text                    │
└─────────────────────────────────────┘
           ↓ (Drop-down opens)
┌─────────────────────────────────────┐
│ ┌───────┬───────────────────────┐   │
│ │Presets│  March 2026      [>]  │   │
│ │       │  Su Mo Tu We Th Fr Sa │   │
│ │Week   │   1  2  3  4  5  6  7 │   │
│ │Month  │   8  9 10 11 12 13 14 │   │
│ │Year   │  15 16 17 18 19 20 21 │   │
│ │Custom │  22 23 24 25 26 27 28 │   │
│ └───────┴───────────────────────┘   │
│           [OK]  [Cancel]            │
└─────────────────────────────────────┘
```

## Common Issues and Solutions

### Issue: SelectedRange not updating

**Problem:** Range doesn't change when set programmatically.

**Solution:** Ensure you're creating a valid DateTimeOffsetRange:
```csharp
// Correct
sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(startDate, endDate);

// Incorrect - end date must be >= start date
sfCalendarDateRangePicker.SelectedRange = new DateTimeOffsetRange(endDate, startDate);
```

### Issue: Event not firing

**Problem:** SelectedDateRangeChanged event doesn't fire.

**Solution:** Ensure the event handler is attached before setting the range:
```csharp
// Correct order
sfCalendarDateRangePicker.SelectedDateRangeChanged += Handler;
sfCalendarDateRangePicker.SelectedRange = newRange;
```

### Issue: Drop-down not opening

**Problem:** Calendar doesn't appear when clicking.

**Solution:** Check if IsEnabled is true and ShowDropDownButton configuration:
```csharp
sfCalendarDateRangePicker.IsEnabled = true;
sfCalendarDateRangePicker.ShowDropDownButton = true;
```

## Next Steps

- **UI Customization** - Learn to customize drop-down alignment, size, and appearance in [ui-customization.md](ui-customization.md)
- **Localization** - Support different languages and calendar types in [localization-formatting.md](localization-formatting.md)
- **Date Restrictions** - Implement min/max dates and blackout dates in [date-restrictions.md](date-restrictions.md)

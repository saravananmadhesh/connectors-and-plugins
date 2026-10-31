# Getting Started with Calendar Date Picker

## Table of Contents
- [Overview](#overview)
- [Installation and Setup](#installation-and-setup)
- [Creating a WinUI Application](#creating-a-winui-application)
- [Adding Calendar Date Picker](#adding-calendar-date-picker)
- [Programmatic Date Selection](#programmatic-date-selection)
- [Interactive Date Selection](#interactive-date-selection)
- [Null Value Support](#null-value-support)
- [Header and Description](#header-and-description)
- [Watermark Text](#watermark-text)
- [Date Selection Events](#date-selection-events)
- [Edit Modes](#edit-modes)
- [Drop-Down Button Configuration](#drop-down-button-configuration)
- [Submit Buttons](#submit-buttons)
- [Troubleshooting](#troubleshooting)

## Overview

The `SfCalendarDatePicker` control provides an intuitive, touch-friendly interface for selecting dates from a drop-down calendar. It supports multiple date formats, date restrictions, and validation with a built-in watermark text display.

**Key Features:**
- Visual date selection with drop-down calendar
- Text input with validation
- Multiple date format support
- Min/max date restrictions
- Blackout dates
- Localization support
- Touch-friendly interface

## Installation and Setup

### Step 1: Install NuGet Package

Install the Syncfusion.Calendar.WinUI package from NuGet:

```powershell
Install-Package Syncfusion.Calendar.WinUI
```

Or using .NET CLI:

```bash
dotnet add package Syncfusion.Calendar.WinUI
```

### Step 2: Add Namespace

Import the namespace in your XAML or C# files:

**XAML:**
```xml
xmlns:calendar="using:Syncfusion.UI.Xaml.Calendar"
```

**C#:**
```csharp
using Syncfusion.UI.Xaml.Calendar;
```

## Creating a WinUI Application

Create a WinUI 3 desktop application:

1. Open Visual Studio 2022 or 2026
2. Create new project → **"Blank App, Packaged (WinUI 3 in Desktop)"**
3. Configure project name and location
4. Select target framework (.NET 9.0 or higher)
5. Install Syncfusion.Calendar.WinUI NuGet package

## Adding Calendar Date Picker

### XAML Declaration

Add the control to your XAML page:

```xml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:calendar="using:Syncfusion.UI.Xaml.Calendar"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d">
    
    <Grid Name="grid">
        <calendar:SfCalendarDatePicker 
            x:Name="sfCalendarDatePicker"
            HorizontalAlignment="Center"
            VerticalAlignment="Center" />
    </Grid>
</Window>
```

### Code-Behind Initialization

Create the control programmatically:

```csharp
using Syncfusion.UI.Xaml.Calendar;

namespace GettingStarted
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Create Calendar Date Picker instance
            SfCalendarDatePicker sfCalendarDatePicker = new SfCalendarDatePicker();
            
            // Configure properties
            sfCalendarDatePicker.HorizontalAlignment = HorizontalAlignment.Center;
            sfCalendarDatePicker.VerticalAlignment = VerticalAlignment.Center;
            
            // Add to grid
            grid.Children.Add(sfCalendarDatePicker);
        }
    }
}
```

## Programmatic Date Selection

Set or change the selected date using the `SelectedDate` property:

```csharp
// Set specific date
sfCalendarDatePicker.SelectedDate = new DateTimeOffset(new DateTime(2024, 3, 15));

// Set to today
sfCalendarDatePicker.SelectedDate = DateTimeOffset.Now;

// Set to first day of current month
sfCalendarDatePicker.SelectedDate = new DateTimeOffset(
    new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1)
);
```

**XAML:**
```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    SelectedDate="2024-03-15" />
```

**Important:** If no value is assigned to `SelectedDate`, the control automatically assigns the current system date.

## Interactive Date Selection

Users can select dates in two ways:

### 1. Keyboard Input

Type the date directly in the text editor:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    DisplayDateFormat="MM/dd/yyyy" />
```

The control validates the input based on the `DisplayDateFormat`.

### 2. Drop-Down Calendar

Click the drop-down button or press **Alt + DownArrow** to open the calendar and select a date visually.

### Getting the Selected Date

```csharp
// Get selected date
DateTimeOffset? selectedDate = sfCalendarDatePicker.SelectedDate;

if (selectedDate.HasValue)
{
    DateTime date = selectedDate.Value.DateTime;
    Console.WriteLine($"Selected: {date:MM/dd/yyyy}");
}
```

## Null Value Support

Allow the control to have no selected date by enabling `AllowNull`:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    SelectedDate="{x:Null}"
    AllowNull="True"
    PlaceholderText="Select a date" />
```

```csharp
sfCalendarDatePicker.AllowNull = true;
sfCalendarDatePicker.SelectedDate = null;
sfCalendarDatePicker.PlaceholderText = "Select a date";
```

**Behavior:**
- When `AllowNull="True"` and `SelectedDate` is null, the placeholder text is displayed
- When `AllowNull="False"` (default), the current system date is assigned

## Header and Description

### Setting Header

Add a header to describe the field:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    Header="Date of Birth"
    Width="180" 
    Height="60" />
```

```csharp
sfCalendarDatePicker.Header = "Date of Birth";
```

### Header Customization

Customize the header appearance using `HeaderTemplate`:

```xml
<calendar:SfCalendarDatePicker Width="180" Height="75">
    <calendar:SfCalendarDatePicker.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <FontIcon FontFamily="Segoe MDL2 Assets" Glyph="&#xED55;"/>
                <TextBlock Text="Birthday Date" FontSize="14" Margin="5"/>
            </StackPanel>
        </DataTemplate>
    </calendar:SfCalendarDatePicker.HeaderTemplate>
</calendar:SfCalendarDatePicker>
```

### Description for Guidance

Provide guidance text beneath the control:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    Header="Date of Birth" 
    Width="300" 
    Height="80" 
    Description="Enter your date of birth (MM/DD/YYYY)" />
```

```csharp
sfCalendarDatePicker.Description = "Enter your date of birth (MM/DD/YYYY)";
```

## Watermark Text

Display placeholder text when no date is selected:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    PlaceholderText="Select the Date"
    SelectedDate="{x:Null}"
    AllowNull="True" />
```

```csharp
sfCalendarDatePicker.PlaceholderText = "Select the Date";
sfCalendarDatePicker.SelectedDate = null;
sfCalendarDatePicker.AllowNull = true;
```

**Note:** PlaceholderText only displays when `AllowNull="True"` and `SelectedDate` is null.

## Date Selection Events

### SelectedDateChanged Event

Notifies when the selected date changes:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    SelectedDateChanged="SfCalendarDatePicker_SelectedDateChanged" />
```

```csharp
private void SfCalendarDatePicker_SelectedDateChanged(
    object sender, 
    SelectedDateChangedEventArgs e)
{
    DateTimeOffset? oldDate = e.OldDate;
    DateTimeOffset? newDate = e.NewDate;
    
    Console.WriteLine($"Date changed from {oldDate} to {newDate}");
}
```

### SelectedDateChanging Event

Allows you to cancel date selection before it's applied:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    SelectedDateChanging="SfCalendarDatePicker_DateChanging" />
```

```csharp
private void SfCalendarDatePicker_DateChanging(
    object sender, 
    DateChangingEventArgs e)
{
    DateTimeOffset? oldDate = e.OldDate;
    DateTimeOffset? newDate = e.NewDate;
    
    // Cancel selection if date is invalid
    if (newDate.HasValue && newDate.Value.DayOfWeek == DayOfWeek.Sunday)
    {
        e.Cancel = true;
        ShowMessage("Sundays are not allowed");
    }
}
```

**Event Order:** `SelectedDateChanging` fires before `SelectedDateChanged`.

## Edit Modes

Control how date input is validated:

### Mask Mode (Default)

Each input number is automatically validated and assigned to the current field:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    EditMode="Mask" />
```

```csharp
sfCalendarDatePicker.EditMode = DateTimeEditMode.Mask;
```

**Behavior:** Focus moves to the next field after valid input.

### Normal Mode (Free Form)

Validate the entire date after user completes input:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    EditMode="Normal" />
```

```csharp
sfCalendarDatePicker.EditMode = DateTimeEditMode.Normal;
```

**Behavior:** Validation occurs when user presses Enter or control loses focus.

## Drop-Down Button Configuration

### Hide Drop-Down Button

Hide the drop-down button while keeping keyboard access:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowDropDownButton="False" />
```

```csharp
sfCalendarDatePicker.ShowDropDownButton = false;
```

**Note:** Users can still open the calendar using **Alt + DownArrow** keyboard shortcut.

## Submit Buttons

Require explicit confirmation via OK button:

```xml
<calendar:SfCalendarDatePicker 
    x:Name="sfCalendarDatePicker"
    ShowSubmitButtons="True" />
```

```csharp
sfCalendarDatePicker.ShowSubmitButtons = true;
```

**Behavior:**
- When `ShowSubmitButtons="True"`, users must click OK to apply date selection
- When `ShowSubmitButtons="False"` (default), date is applied immediately upon selection

## Troubleshooting

### Issue: Date not displaying in editor

**Solution:** Check that `DisplayDateFormat` is valid and `SelectedDate` is set:

```csharp
sfCalendarDatePicker.DisplayDateFormat = "MM/dd/yyyy";
sfCalendarDatePicker.SelectedDate = DateTimeOffset.Now;
```

### Issue: PlaceholderText not showing

**Solution:** Ensure `AllowNull="True"` and `SelectedDate` is null:

```csharp
sfCalendarDatePicker.AllowNull = true;
sfCalendarDatePicker.SelectedDate = null;
```

### Issue: Drop-down calendar not opening

**Solution:** 
- Check that `ShowDropDownButton="True"` (default)
- Try keyboard shortcut: **Alt + DownArrow**
- Ensure control is enabled and focusable

### Issue: Date validation not working

**Solution:** Use `EditMode="Mask"` for field-by-field validation or `EditMode="Normal"` for full-date validation:

```csharp
sfCalendarDatePicker.EditMode = DateTimeEditMode.Mask;
```

### Issue: Events not firing

**Solution:** Ensure event handlers are properly attached:

```csharp
sfCalendarDatePicker.SelectedDateChanged += SfCalendarDatePicker_SelectedDateChanged;
```

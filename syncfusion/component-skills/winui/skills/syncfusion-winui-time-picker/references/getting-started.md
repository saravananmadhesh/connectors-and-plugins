# Getting Started with WinUI TimePicker

Complete guide for installing and implementing the Syncfusion WinUI TimePicker (SfTimePicker) control in Windows desktop applications.

## Table of Contents
- [Installation](#installation)
- [Component Structure](#component-structure)
- [Adding TimePicker to XAML](#adding-timepicker-to-xaml)
- [Adding TimePicker in C#](#adding-timepicker-in-c)
- [Setting Selected Time Programmatically](#setting-selected-time-programmatically)
- [Interactive Time Selection](#interactive-time-selection)
- [Allowing Null Values](#allowing-null-values)
- [Header and Description](#header-and-description)
- [Header Customization](#header-customization)
- [Watermark Text](#watermark-text)
- [Time Changed Events](#time-changed-events)
- [Troubleshooting](#troubleshooting)

## Installation

### Prerequisites

**Development Environment:**
- Visual Studio 2022 or Visual Studio 2026
- WinUI 3 workload installed
- .NET 9.0 or higher

**Target Platform:**
- Windows 10 version 1809 (build 17763) or higher
- Windows 11

### Step 1: Create WinUI 3 Project

1. Open Visual Studio 2022/2026
2. Create a new project
3. Select **"Blank App, Packaged (WinUI 3 in Desktop)"**
4. Configure project name and location
5. Select target framework (.NET 9.0 or higher)

### Step 2: Install NuGet Package

Install the `Syncfusion.Editors.WinUI` package:

**Using Package Manager Console:**
```powershell
Install-Package Syncfusion.Editors.WinUI
```

**Using NuGet Package Manager:**
1. Right-click project → Manage NuGet Packages
2. Search for "Syncfusion.Editors.WinUI"
3. Click Install

## Component Structure

The SfTimePicker control consists of:

```
┌─────────────────────────────────────┐
│  [Header Text]                      │
├─────────────────────────────────────┤
│  Text Editor Input    │ [▼] Button  │  ← Input Area
├─────────────────────────────────────┤
│  [Description Text]                 │
└─────────────────────────────────────┘
         │
         ▼ (When dropdown opens)
┌─────────────────────────────────────┐
│  [Dropdown Header (optional)]       │
├───────────┬───────────┬─────────────┤
│   Hour    │  Minute   │   AM/PM     │  ← Column Headers
├───────────┼───────────┼─────────────┤
│     09    │    25     │     AM      │  ← Spinner Cells
│     10    │    26     │     PM      │
│  → 11 ←   │  → 27 ←   │  → AM ←     │  ← Selected
│     12    │    28     │     PM      │
│     01    │    29     │     AM      │
├───────────┴───────────┴─────────────┤
│        [Cancel]  [OK]               │  ← Submit Buttons
└─────────────────────────────────────┘
```

**Components:**
- **Text Editor:** Direct time input via keyboard
- **Dropdown Button:** Opens the time spinner
- **Dropdown Spinner:** Hour, minute, and meridiem columns
- **Column Headers:** Labels for each time field
- **Submit Buttons:** OK/Cancel for confirming selection

## Adding TimePicker to XAML

### Basic Implementation

**MainWindow.xaml:**
```xml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d">
    
    <Grid Name="grid">
        <!-- Adding TimePicker control -->
        <editors:SfTimePicker 
            x:Name="sfTimePicker"
            Width="250"
            Height="40" />
    </Grid>
</Window>
```

**Key Points:**
1. Import namespace: `xmlns:editors="using:Syncfusion.UI.Xaml.Editors"`
2. Use `<editors:SfTimePicker>` tag
3. Set `x:Name` for code-behind access
4. Optionally set Width and Height

### XAML with Common Properties

```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    Header="Select Time"
    PlaceholderText="Pick a time"
    Width="250"
    Height="40"
    HorizontalAlignment="Left"
    VerticalAlignment="Top"
    Margin="20" />
```

## Adding TimePicker in C#

### Programmatic Creation

**MainWindow.xaml.cs:**
```csharp
using Syncfusion.UI.Xaml.Editors;
using Microsoft.UI.Xaml;

namespace GettingStarted
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Create TimePicker instance
            SfTimePicker sfTimePicker = new SfTimePicker();
            sfTimePicker.Width = 250;
            sfTimePicker.Height = 40;
            sfTimePicker.HorizontalAlignment = HorizontalAlignment.Left;
            sfTimePicker.VerticalAlignment = VerticalAlignment.Top;
            
            // Add to grid
            grid.Children.Add(sfTimePicker);
        }
    }
}
```

### Creating with Properties

```csharp
SfTimePicker timePicker = new SfTimePicker
{
    Header = "Select Time",
    PlaceholderText = "Pick a time",
    Width = 250,
    Height = 40,
    SelectedTime = DateTimeOffset.Now
};

this.Content = timePicker;
```

## Setting Selected Time Programmatically

The `SelectedTime` property gets or sets the selected time value.

### Setting Time in XAML

```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    SelectedTime="2024-03-22T14:30:00" />
```

### Setting Time in C#

```csharp
// Set specific time
sfTimePicker.SelectedTime = new DateTimeOffset(
    new DateTime(2024, 3, 22, 14, 30, 0));

// Set current time
sfTimePicker.SelectedTime = DateTimeOffset.Now;

// Set time with specific hour and minute
sfTimePicker.SelectedTime = new DateTimeOffset(
    new DateTime(DateTime.Now.Year, DateTime.Now.Month, 
                 DateTime.Now.Day, 10, 45, 0));
```

### Default Behavior

**If `SelectedTime` is not set:**
- Control automatically displays current system time
- User can still change the selection

**Example:**
```csharp
// TimePicker without explicit SelectedTime
SfTimePicker timePicker = new SfTimePicker();
// Displays current system time by default
```

## Interactive Time Selection

Users can select time in two ways:

### Method 1: Keyboard Input

Type time directly in the editor:
```
User types: "2:30 PM"
Result: SelectedTime = 2:30 PM
```

**Supported input formats:**
- `2:30 PM` or `14:30`
- `2 30 PM` or `14 30`
- `230PM` or `1430`

### Method 2: Dropdown Spinner

1. Click dropdown button or press `Alt+Down`
2. Scroll through hour, minute, AM/PM columns
3. Click OK or press Enter to confirm

**Example with event handling:**
```csharp
sfTimePicker.SelectedTimeChanged += (sender, e) =>
{
    if (e.NewDateTime.HasValue)
    {
        var time = e.NewDateTime.Value;
        System.Diagnostics.Debug.WriteLine(
            $"Selected time: {time:hh:mm tt}");
    }
};
```

## Allowing Null Values

By default, TimePicker doesn't allow null values. Enable with `AllowNull` property.

### Enable Null Values

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    AllowNull="True"
    SelectedTime="{x:Null}"
    PlaceholderText="Select a time" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.AllowNull = true;
timePicker.SelectedTime = null;
timePicker.PlaceholderText = "Select a time";
```

### Behavior Comparison

| Scenario | AllowNull = False | AllowNull = True |
|----------|-------------------|------------------|
| SelectedTime = null | Shows current system time | Shows PlaceholderText |
| User clears input | Reverts to previous time | Sets SelectedTime to null |
| Clear button clicked | Reverts to previous time | Sets SelectedTime to null |

### Checking for Null

```csharp
if (sfTimePicker.SelectedTime.HasValue)
{
    var time = sfTimePicker.SelectedTime.Value;
    // Use time value
}
else
{
    // Handle null case
    System.Diagnostics.Debug.WriteLine("No time selected");
}
```

## Header and Description

Add contextual text above and below the control.

### Header Property

Display a title above the TimePicker:

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    Header="Select your convenient order delivery time"
    Width="300"
    Height="75" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.Header = "Select your convenient order delivery time";
timePicker.Width = 300;
timePicker.Height = 75;
```

### Description Property

Display guidance text below the TimePicker:

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    Header="Delivery Time"
    Description="Your order will be delivered on time."
    Width="300"
    Height="95" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.Header = "Delivery Time";
timePicker.Description = "Your order will be delivered on time.";
```

### Combined Example

```xml
<editors:SfTimePicker 
    Header="Appointment Time"
    Description="Select your preferred appointment time (9 AM - 5 PM)"
    PlaceholderText="Pick a time"
    Width="350"
    Height="95" />
```

## Header Customization

Customize the header appearance using `HeaderTemplate`.

### Custom Header with Icon

**XAML:**
```xml
<editors:SfTimePicker Width="250" Height="75">
    <editors:SfTimePicker.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE8DF;" />
                <TextBlock 
                    Text="Delivery Time" 
                    FontSize="14" 
                    Margin="5" />
            </StackPanel>
        </DataTemplate>
    </editors:SfTimePicker.HeaderTemplate>
</editors:SfTimePicker>
```

### Header with Styled Text

```xml
<editors:SfTimePicker Width="300" Height="80">
    <editors:SfTimePicker.HeaderTemplate>
        <DataTemplate>
            <StackPanel>
                <TextBlock 
                    Text="Meeting Time" 
                    FontSize="16"
                    FontWeight="Bold"
                    Foreground="DarkBlue" />
                <TextBlock 
                    Text="(Required)" 
                    FontSize="11"
                    Foreground="Red"
                    Margin="0,2,0,0" />
            </StackPanel>
        </DataTemplate>
    </editors:SfTimePicker.HeaderTemplate>
</editors:SfTimePicker>
```

### Header with Multiple Icons

```xml
<editors:SfTimePicker Width="280" Height="75">
    <editors:SfTimePicker.HeaderTemplate>
        <DataTemplate>
            <Grid>
                <Grid.ColumnDefinitions>
                    <ColumnDefinition Width="Auto" />
                    <ColumnDefinition Width="*" />
                    <ColumnDefinition Width="Auto" />
                </Grid.ColumnDefinitions>
                
                <FontIcon 
                    Grid.Column="0"
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE787;" 
                    Margin="0,0,8,0" />
                    
                <TextBlock 
                    Grid.Column="1"
                    Text="Start Time" 
                    VerticalAlignment="Center" />
                    
                <FontIcon 
                    Grid.Column="2"
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE946;" 
                    Foreground="Red" />
            </Grid>
        </DataTemplate>
    </editors:SfTimePicker.HeaderTemplate>
</editors:SfTimePicker>
```

## Watermark Text

Display placeholder text when no time is selected.

### Basic Placeholder

**XAML:**
```xml
<editors:SfTimePicker 
    PlaceholderText="Pick a travel time"
    SelectedTime="{x:Null}"
    AllowNull="True" />
```

**C#:**
```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.PlaceholderText = "Pick a travel time";
timePicker.SelectedTime = null;
timePicker.AllowNull = true;
```

### Contextual Placeholders

```xml
<!-- Appointment booking -->
<editors:SfTimePicker 
    Header="Appointment Time"
    PlaceholderText="Select appointment time"
    AllowNull="True" />

<!-- Meeting scheduler -->
<editors:SfTimePicker 
    Header="Meeting Start"
    PlaceholderText="When does the meeting start?"
    AllowNull="True" />

<!-- Shift time -->
<editors:SfTimePicker 
    Header="Shift Start Time"
    PlaceholderText="Enter shift start time"
    AllowNull="True" />
```

### Important Notes

1. **PlaceholderText only shows when:**
   - `SelectedTime` is `null`
   - `AllowNull` is `true`

2. **If AllowNull = false:**
   - PlaceholderText never displays
   - Control shows current system time instead

## Time Changed Events

Handle time selection changes with events.

### SelectedTimeChanged Event

Fires **after** the SelectedTime property is updated.

**XAML:**
```xml
<editors:SfTimePicker 
    x:Name="sfTimePicker"
    SelectedTimeChanged="SfTimePicker_TimeChanged" />
```

**C# Event Handler:**
```csharp
private void SfTimePicker_TimeChanged(
    DependencyObject d, 
    DependencyPropertyChangedEventArgs e)
{
    var oldTime = e.OldValue as DateTimeOffset?;
    var newTime = e.NewValue as DateTimeOffset?;
    
    if (oldTime.HasValue && newTime.HasValue)
    {
        System.Diagnostics.Debug.WriteLine(
            $"Time changed from {oldTime.Value:hh:mm tt} to {newTime.Value:hh:mm tt}");
    }
}
```

### Programmatic Event Subscription

```csharp
SfTimePicker timePicker = new SfTimePicker();
timePicker.SelectedTimeChanged += SfTimePicker_TimeChanged;

// Event handler
private void SfTimePicker_TimeChanged(
    DependencyObject d, 
    DependencyPropertyChangedEventArgs e)
{
    var timePicker = d as SfTimePicker;
    if (timePicker?.SelectedTime.HasValue == true)
    {
        var selectedTime = timePicker.SelectedTime.Value;
        // Process the new time
        UpdateAppointment(selectedTime);
    }
}
```

### Practical Example: Validation

```csharp
private void SfTimePicker_TimeChanged(
    DependencyObject d, 
    DependencyPropertyChangedEventArgs e)
{
    var newTime = e.NewValue as DateTimeOffset?;
    
    if (newTime.HasValue)
    {
        var time = newTime.Value;
        
        // Check if time is within business hours
        if (time.Hour < 9 || time.Hour >= 17)
        {
            ShowNotification("Please select a time between 9 AM and 5 PM");
        }
        
        // Check if time is in the future
        if (time < DateTimeOffset.Now)
        {
            ShowNotification("Please select a future time");
        }
    }
}
```

## Troubleshooting

### Issue: TimePicker Not Displaying

**Symptoms:** Control doesn't appear in the UI

**Solutions:**
1. **Check namespace import:**
   ```xml
   xmlns:editors="using:Syncfusion.UI.Xaml.Editors"
   ```

2. **Verify NuGet package installed:**
   - Check `Syncfusion.Editors.WinUI` in package references

3. **Set explicit dimensions:**
   ```xml
   <editors:SfTimePicker Width="250" Height="40" />
   ```

4. **Check license registration:**
   ```csharp
   Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("KEY");
   ```

### Issue: SelectedTime Not Updating

**Symptoms:** Time selection doesn't update the property

**Solutions:**
1. **Check AllowNull when setting null:**
   ```csharp
   timePicker.AllowNull = true; // Required for null
   timePicker.SelectedTime = null;
   ```

2. **Verify event handler attached:**
   ```csharp
   timePicker.SelectedTimeChanged += Handler;
   ```

3. **Check for binding issues (MVVM):**
   ```xml
   <editors:SfTimePicker 
       SelectedTime="{Binding AppointmentTime, Mode=TwoWay}" />
   ```

### Issue: PlaceholderText Not Showing

**Symptoms:** Placeholder text doesn't appear

**Solutions:**
1. **Enable AllowNull:**
   ```csharp
   timePicker.AllowNull = true; // Required
   timePicker.PlaceholderText = "Pick a time";
   ```

2. **Set SelectedTime to null:**
   ```csharp
   timePicker.SelectedTime = null;
   ```

3. **Verify order:**
   ```csharp
   // Correct order
   timePicker.AllowNull = true;
   timePicker.SelectedTime = null;
   timePicker.PlaceholderText = "Pick a time";
   ```

### Issue: Dropdown Not Opening

**Symptoms:** Clicking button doesn't open dropdown

**Solutions:**
1. **Check ShowDropDownButton:**
   ```csharp
   timePicker.ShowDropDownButton = true; // Default
   ```

2. **Try keyboard shortcut:**
   - Press `Alt + Down Arrow` to open

3. **Verify no exceptions in output:**
   - Check Visual Studio Output window for errors

4. **Check parent container:**
   - Ensure parent has enough space for dropdown

### Issue: Custom Header Not Displaying

**Symptoms:** HeaderTemplate doesn't show

**Solutions:**
1. **Don't set Header property with HeaderTemplate:**
   ```xml
   <!-- Incorrect -->
   <editors:SfTimePicker 
       Header="Text"
       HeaderTemplate="{StaticResource Template}" />
   
   <!-- Correct -->
   <editors:SfTimePicker 
       HeaderTemplate="{StaticResource Template}" />
   ```

2. **Verify DataTemplate syntax:**
   ```xml
   <editors:SfTimePicker.HeaderTemplate>
       <DataTemplate>
           <!-- Content here -->
       </DataTemplate>
   </editors:SfTimePicker.HeaderTemplate>
   ```

### Issue: Events Not Firing

**Symptoms:** Event handlers not called

**Solutions:**
1. **Verify event signature:**
   ```csharp
   private void Handler(DependencyObject d, DependencyPropertyChangedEventArgs e)
   {
       // Correct signature
   }
   ```

2. **Check subscription:**
   ```csharp
   timePicker.SelectedTimeChanged += Handler; // += not =
   ```

3. **Avoid infinite loops:**
   ```csharp
   private void Handler(DependencyObject d, DependencyPropertyChangedEventArgs e)
   {
       var picker = d as SfTimePicker;
       // Don't set SelectedTime here - causes infinite loop!
   }
   ```

## See Also

- [Time Restrictions](time-restrictions.md) - MinTime, MaxTime, BlackoutTimes
- [Localization and Formatting](localization-formatting.md) - Clock formats, display patterns
- [Dropdown Customization](dropdown-customization.md) - Button, placement, height

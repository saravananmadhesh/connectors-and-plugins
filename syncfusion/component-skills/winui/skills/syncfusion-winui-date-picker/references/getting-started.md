# Getting Started with WinUI DatePicker

Complete guide for installing, configuring, and using the Syncfusion WinUI DatePicker (SfDatePicker) control in your WinUI 3 desktop applications.

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [DatePicker Structure](#datepicker-structure)
- [Adding DatePicker to XAML](#adding-datepicker-to-xaml)
- [Adding DatePicker in C#](#adding-datepicker-in-c)
- [Selecting Dates](#selecting-dates)
- [Null Value Support](#null-value-support)
- [Placeholder Text](#placeholder-text-watermark)
- [Header and Description](#header-and-description)
- [Handling Date Selection Events](#handling-date-selection-events)
- [Basic Configuration Examples](#basic-configuration-examples)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Installation and Setup

### Step 1: Create WinUI 3 Project

1. Open Visual Studio 2022 or 2026
2. Create a new project
3. Select **"Blank App, Packaged (WinUI 3 in Desktop)"**
4. Configure project settings:
   - Project name: Your application name
   - Location: Project directory
   - Framework: .NET 9.0 or higher

Alternatively, create a **WinUI 3 app in UWP for C#** if targeting UWP.

### Step 2: Install NuGet Package

Install the Syncfusion Editors package:

**Package Manager Console:**
```powershell
Install-Package Syncfusion.Editors.WinUI
```

**NuGet Package Manager:**
1. Right-click project → Manage NuGet Packages
2. Search for "Syncfusion.Editors.WinUI"
3. Click Install

**Package:** `Syncfusion.Editors.WinUI`  
**Namespace:** `Syncfusion.UI.Xaml.Editors`

## DatePicker Structure

The DatePicker control consists of:
- **Editor Field:** Text input area displaying selected date
- **Dropdown Button:** Opens the date spinner dropdown
- **Dropdown Spinner:** Interactive date selection with day/month/year columns
- **Submit Buttons:** OK and Cancel buttons (optional)
- **Clear Button:** X button to clear selection (optional)

## Adding DatePicker to XAML

### Basic XAML Declaration

```xml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:editors="using:Syncfusion.UI.Xaml.Editors">
    
    <Grid Name="grid">
        <editors:SfDatePicker Name="sfDatePicker" />
    </Grid>
</Window>
```

**Key points:**
- Import namespace: `xmlns:editors="using:Syncfusion.UI.Xaml.Editors"`
- Use `<editors:SfDatePicker>` tag
- Assign `x:Name` for code-behind access

### XAML with Configuration

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    Header="Select Date"
    Description="Choose your preferred date"
    Width="250"
    Height="75"
    HorizontalAlignment="Center"
    VerticalAlignment="Top" />
```

## Adding DatePicker in C#

### Programmatic Creation

```csharp
using Syncfusion.UI.Xaml.Editors;

namespace GettingStarted
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
            
            // Create DatePicker instance
            SfDatePicker sfDatePicker = new SfDatePicker();
            
            // Add to layout
            this.Content = sfDatePicker;
        }
    }
}
```

### With Configuration

```csharp
SfDatePicker datePicker = new SfDatePicker
{
    Width = 250,
    Height = 75,
    HorizontalAlignment = HorizontalAlignment.Center,
    VerticalAlignment = VerticalAlignment.Top
};

// Add to grid
grid.Children.Add(datePicker);
```

## Selecting Dates

### Setting Date Programmatically

Use the `SelectedDate` property to set or get the selected date:

```csharp
// Set specific date
datePicker.SelectedDate = new DateTimeOffset(new DateTime(2026, 3, 22));

// Set to today
datePicker.SelectedDate = DateTimeOffset.Now;

// Set to null (if AllowNull = true)
datePicker.SelectedDate = null;
```

**XAML:**
```xml
<editors:SfDatePicker 
    SelectedDate="2026-03-22" />
```

**Default behavior:** If no value is assigned, DatePicker automatically uses the current system date.

### Getting Selected Date

```csharp
DateTimeOffset? selectedDate = datePicker.SelectedDate;

if (selectedDate.HasValue)
{
    DateTime date = selectedDate.Value.DateTime;
    Console.WriteLine($"Selected: {date:MM/dd/yyyy}");
}
```

### Interactive Date Selection

Users can select dates in three ways:

**1. Dropdown Spinner:**
- Click dropdown button
- Scroll day, month, and year columns
- Click OK to confirm (or Cancel to discard)

**2. Keyboard Input:**
- Click in editor field
- Type date using keyboard
- Date validates against `DisplayDateFormat`

**3. Keyboard Navigation:**
- Press `Alt + Down` to open dropdown
- Use arrow keys to navigate spinner
- Press `Enter` to select, `Esc` to cancel

## Null Value Support

Enable null values when date selection is optional:

```xml
<editors:SfDatePicker 
    Name="datePicker"
    AllowNull="True"
    SelectedDate="{x:Null}"
    PlaceholderText="Select a date" />
```

```csharp
datePicker.AllowNull = true;
datePicker.SelectedDate = null;
datePicker.PlaceholderText = "Select a date";
```

**Behavior:**
- `AllowNull = true`: DatePicker can be null, shows placeholder
- `AllowNull = false` (default): DatePicker shows current system date if no value assigned

## Placeholder Text (Watermark)

Display hint text when DatePicker is empty:

```xml
<editors:SfDatePicker 
    Name="datePicker"
    PlaceholderText="Select journey date"
    AllowNull="True"
    SelectedDate="{x:Null}" />
```

```csharp
datePicker.PlaceholderText = "Select journey date";
datePicker.AllowNull = true;
datePicker.SelectedDate = null;
```

**Requirements:**
- Must set `AllowNull = true`
- Must set `SelectedDate = null`

If `AllowNull = false`, current system date displays instead of placeholder.

## Header and Description

### Adding Header Text

Display a label above the DatePicker:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    Header="Enter your interview date"
    Width="200"
    Height="75" />
```

```csharp
datePicker.Header = "Enter your interview date";
```

### Custom Header Template

Create rich header UI with icons and styling:

```xml
<editors:SfDatePicker Width="250" Height="75">
    <editors:SfDatePicker.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal">
                <FontIcon 
                    FontFamily="Segoe MDL2 Assets" 
                    Glyph="&#xE787;" 
                    Margin="0,0,5,0" />
                <TextBlock 
                    Text="Interview Date" 
                    FontSize="14" 
                    FontWeight="SemiBold" />
            </StackPanel>
        </DataTemplate>
    </editors:SfDatePicker.HeaderTemplate>
</editors:SfDatePicker>
```

**Common header icons:**
- Calendar: `&#xE787;`
- Date: `&#xE163;`
- Clock: `&#xE121;`

### Adding Description

Provide guidance text below the control:

```xml
<editors:SfDatePicker 
    x:Name="datePicker"
    Header="Enter your interview date"
    Description="The chosen date must be within the next 5 days."
    Width="300"
    Height="75" />
```

```csharp
datePicker.Header = "Enter your interview date";
datePicker.Description = "The chosen date must be within the next 5 days.";
```

**Use cases:**
- Validation hints
- Format examples
- Date range information
- User guidance

## Handling Date Selection Events

### SelectedDateChanged Event

Fires when the selected date changes:

```xml
<editors:SfDatePicker 
    Name="datePicker"
    SelectedDateChanged="DatePicker_SelectedDateChanged" />
```

```csharp
private void DatePicker_SelectedDateChanged(DependencyObject d, 
    DependencyPropertyChangedEventArgs e)
{
    var oldDate = e.OldDateTime;
    var newDate = e.NewDateTime;
    
    if (newDate.HasValue)
    {
        Console.WriteLine($"Previously selected: {oldDate}");
        Console.WriteLine($"Newly selected: {newDate.Value:MM/dd/yyyy}");
        
        // Perform actions based on date selection
        UpdateAppointmentSchedule(newDate.Value);
    }
}
```

**Event properties:**
- `OldDateTime`: Previous selected date
- `NewDateTime`: Current selected date

### Programmatic Event Subscription

```csharp
datePicker.SelectedDateChanged += (sender, e) =>
{
    if (e.NewDateTime.HasValue)
    {
        // Handle date change
        UpdateCalendar(e.NewDateTime.Value);
    }
};
```

## Basic Configuration Examples

### Example 1: Simple Date Input
```xml
<editors:SfDatePicker 
    Header="Date of Birth"
    Width="200" />
```

### Example 2: Optional Date with Placeholder
```xml
<editors:SfDatePicker 
    Header="End Date (Optional)"
    PlaceholderText="Not specified"
    AllowNull="True"
    SelectedDate="{x:Null}" />
```

### Example 3: Pre-Selected Date
```xml
<editors:SfDatePicker 
    Header="Start Date"
    SelectedDate="2026-01-01" />
```

### Example 4: With Description
```xml
<editors:SfDatePicker 
    Header="Appointment Date"
    Description="Business days only"
    SelectedDate="{x:Bind ViewModel.AppointmentDate, Mode=TwoWay}" />
```

## Common Patterns

### Data Binding Pattern

Bind to ViewModel property:

```xml
<editors:SfDatePicker 
    SelectedDate="{x:Bind ViewModel.SelectedDate, Mode=TwoWay}" />
```

```csharp
public class ViewModel : INotifyPropertyChanged
{
    private DateTimeOffset? _selectedDate;
    
    public DateTimeOffset? SelectedDate
    {
        get => _selectedDate;
        set
        {
            _selectedDate = value;
            OnPropertyChanged(nameof(SelectedDate));
        }
    }
}
```

### Validation Pattern

Validate date on selection:

```csharp
private void DatePicker_SelectedDateChanged(DependencyObject d, 
    DependencyPropertyChangedEventArgs e)
{
    if (e.NewDateTime.HasValue)
    {
        var selected = e.NewDateTime.Value.DateTime;
        
        // Validate business rules
        if (selected < DateTime.Today)
        {
            datePicker.SelectedDate = DateTime.Today;
        }
    }
}
```

## Troubleshooting

### Issue: DatePicker Not Showing
**Cause:** Missing namespace or package reference  
**Solution:**
1. Verify `Syncfusion.Editors.WinUI` package is installed
2. Check namespace: `xmlns:editors="using:Syncfusion.UI.Xaml.Editors"`
3. Rebuild solution

### Issue: SelectedDate Not Updating
**Cause:** Incorrect data binding mode  
**Solution:** Use `Mode=TwoWay` for binding:
```xml
<editors:SfDatePicker 
    SelectedDate="{x:Bind Date, Mode=TwoWay}" />
```

### Issue: Placeholder Not Showing
**Cause:** `AllowNull = false` or `SelectedDate` has value  
**Solution:**
```csharp
datePicker.AllowNull = true;
datePicker.SelectedDate = null;
```

### Issue: Event Not Firing
**Cause:** Event handler not properly subscribed  
**Solution:** Verify event subscription:
```csharp
datePicker.SelectedDateChanged += DatePicker_SelectedDateChanged;
```

## Next Steps

- **Date Restrictions:** Learn how to set min/max dates and block specific dates
- **Formatting:** Customize date display formats and support multiple calendar types
- **Dropdown Customization:** Modify dropdown appearance and behavior
- **Spinner Customization:** Customize the date spinner UI and cell appearance

## Related Resources

- [Date Restriction Guide](date-restriction.md)
- [Localization and Formatting](localization-formatting.md)
- [Official GitHub Examples](https://github.com/SyncfusionExamples/syncfusion-winui-tools-datepicker-examples)

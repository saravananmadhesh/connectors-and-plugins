# Getting Started with WinUI Calendar

Complete guide for setting up and using the Syncfusion WinUI Calendar (SfCalendar) control in your desktop application.

## Calendar Control Structure

The Calendar control consists of:
- **Header** - Displays current view title (e.g., "March 2026")
- **Navigation Buttons** - Left/right arrows to navigate between months/years
- **Day Headers** - Column headers showing days of week (Sun, Mon, Tue, etc.)
- **Date Cells** - Individual date cells in the calendar grid
- **Week Numbers** - Optional column showing week numbers (when enabled)

## Step 1: Create WinUI 3 Desktop Application

1. Open Visual Studio 2022 or 2026
2. Click **Create a new project**
3. Search for and select **"Blank App, Packaged (WinUI 3 in Desktop)"**
4. Click **Next**
5. Configure your project:
   - **Project name:** e.g., "CalendarApp"
   - **Location:** Choose your workspace directory
   - **Solution name:** Same as project name
6. Click **Create**
7. Select target framework: **.NET 9.0 or higher**
8. Click **Create**

## Step 2: Install Syncfusion.Calendar.WinUI Package

### Using NuGet Package Manager (UI)

1. Right-click on your project in **Solution Explorer**
2. Select **Manage NuGet Packages**
3. Click **Browse** tab
4. Search for **"Syncfusion.Calendar.WinUI"**
5. Select the package from the results
6. Click **Install**
7. Accept the license agreement

### Using Package Manager Console

```powershell
Install-Package Syncfusion.Calendar.WinUI
```

### Using .NET CLI

```bash
dotnet add package Syncfusion.Calendar.WinUI
```

**Package Link:** [Syncfusion.Calendar.WinUI on NuGet](https://www.nuget.org/packages/Syncfusion.Calendar.WinUI)

## Step 3: Add Calendar Control in XAML

### Import Namespace

Open `MainWindow.xaml` and add the Syncfusion Calendar namespace to your Window element:

```xml
xmlns:calendar="using:Syncfusion.UI.Xaml.Calendar"
```

### Complete XAML Example

```xml
<Window
    x:Class="GettingStarted.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:GettingStarted"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:calendar="using:Syncfusion.UI.Xaml.Calendar"
    mc:Ignorable="d">
    
    <Grid Name="grid">
        <!-- Adding Calendar control -->
        <calendar:SfCalendar Name="sfCalendar" />
    </Grid>
</Window>
```

**Key Points:**
- The namespace prefix `calendar` can be any name you choose
- `SfCalendar` is the control name
- Use `Name` or `x:Name` attribute to reference the control in code-behind

## Step 4: Add Calendar Control in C#

### Import Namespace

Add the following using statement at the top of `MainWindow.xaml.cs`:

```csharp
using Syncfusion.UI.Xaml.Calendar;
```

### Create Calendar Programmatically

```csharp
using Syncfusion.UI.Xaml.Calendar;
using Microsoft.UI.Xaml;

namespace GettingStarted
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Creating an instance of the Calendar control
            SfCalendar sfCalendar = new SfCalendar();
            
            // Set the calendar as window content
            this.Content = sfCalendar;
        }
    }
}
```

## Basic Date Selection

### Select Date Programmatically

By default, the `SelectedDate` property is `null` and the Calendar allows single date selection.

```csharp
// Select a specific date
sfCalendar.SelectedDate = new DateTimeOffset(new DateTime(2026, 3, 22));
```

### Access Selected Date

```csharp
// Get the currently selected date
DateTimeOffset? selectedDate = sfCalendar.SelectedDate;

if (selectedDate.HasValue)
{
    DateTime date = selectedDate.Value.DateTime;
    Console.WriteLine($"Selected: {date:yyyy-MM-dd}");
}
```

### Interactive Selection

Users can select dates by:
- **Mouse:** Click on any date cell
- **Keyboard:** Use arrow keys to navigate, press Enter to select

## Selection Modes

The Calendar supports four selection modes via the `SelectionMode` property:

### 1. None - Prevent Selection

```csharp
sfCalendar.SelectionMode = CalendarSelectionMode.None;
```

Use when you want to display a calendar without allowing date selection (view-only mode).

### 2. Single - Select One Date (Default)

```xml
<calendar:SfCalendar Name="sfCalendar" 
                     SelectionMode="Single" />
```

```csharp
sfCalendar.SelectionMode = CalendarSelectionMode.Single;
sfCalendar.SelectedDate = new DateTimeOffset(new DateTime(2026, 1, 15));
```

### 3. Multiple - Select Multiple Dates

```xml
<calendar:SfCalendar Name="sfCalendar" 
                     SelectionMode="Multiple" />
```

```csharp
sfCalendar.SelectionMode = CalendarSelectionMode.Multiple;

// Access selected dates collection
DateTimeOffsetCollection selectedDates = sfCalendar.SelectedDates;
```

Users can select multiple dates from any month, year, or view.

### 4. Range - Select Date Range

```xml
<calendar:SfCalendar Name="sfCalendar" 
                     SelectionMode="Range" />
```

```csharp
sfCalendar.SelectionMode = CalendarSelectionMode.Range;
```

Users select a start date, then an end date. All dates in between are automatically selected.

## Selection Changed Event

Get notified when the user selects a different date:

### XAML

```xml
<calendar:SfCalendar Name="sfCalendar"
                     SelectedDateChanged="SfCalendar_SelectedDateChanged" />
```

### C#

```csharp
sfCalendar.SelectedDateChanged += SfCalendar_SelectedDateChanged;

private void SfCalendar_SelectedDateChanged(object sender, SelectedDateChangedEventArgs e)
{
    DateTimeOffset? oldDate = e.OldDate;
    DateTimeOffset? newDate = e.NewDate;
    
    if (newDate.HasValue)
    {
        Console.WriteLine($"Date changed from {oldDate} to {newDate.Value:yyyy-MM-dd}");
    }
}
```

**Event Properties:**
- `OldDate` - Previously selected date (can be null)
- `NewDate` - Currently selected date (can be null)

## Running Your Application

1. Press **F5** or click **Start Debugging**
2. The Calendar control appears with the current month displayed
3. Click on any date to select it
4. Use navigation buttons to move between months


## Common Issues and Solutions

### Issue: Package Not Found
**Solution:** Ensure you have internet connection and NuGet package source is configured correctly. Check NuGet.org is in your package sources.

### Issue: Namespace Not Recognized
**Solution:** 
- Verify the package is installed (check Dependencies → Packages in Solution Explorer)
- Clean and rebuild the solution
- Restart Visual Studio

### Issue: Control Not Displaying
**Solution:**
- Check that the control has proper size (use Width/Height or Grid placement)
- Verify the control is added to a visible container
- Check the XAML has no syntax errors

## Next Steps

Now that you have a basic Calendar control running, explore:

- **[Selection Features](selection.md)** - Multiple dates, ranges, programmatic selection
- **[Navigation](navigation.md)** - Move between views, restrict navigation
- **[Date Restrictions](date-restrictions.md)** - Min/max dates, blackout dates
- **[Customization](customization.md)** - Styling, templates, special dates

## Code Examples Repository

Download complete working examples:
- [Getting Started Sample](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples/tree/main/Samples/GettingStarted)
- [All Calendar Examples](https://github.com/SyncfusionExamples/syncfusion-winui-tools-calendar-examples)

## Additional Resources

- [Official Documentation](https://help.syncfusion.com/winui/calendar/getting-started)
- [API Reference](https://help.syncfusion.com/cr/winui/Syncfusion.UI.Xaml.Calendar.SfCalendar.html)
- [Syncfusion Support](https://www.syncfusion.com/support)

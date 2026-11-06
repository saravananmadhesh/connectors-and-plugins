# Getting Started with WinUI Scheduler

This reference provides comprehensive guidance on setting up and initializing the Syncfusion WinUI Scheduler component in your application.

## Installation and Package Setup

### NuGet Package Installation

The WinUI Scheduler is available as a NuGet package. Install it using one of the following methods:

**Method 1: NuGet Package Manager**
1. Right-click on your project in Solution Explorer
2. Select "Manage NuGet Packages"
3. Search for `Syncfusion.Scheduler.WinUI`
4. Install the latest version

**Method 2: Package Manager Console**
```powershell
Install-Package Syncfusion.Scheduler.WinUI
```

**Method 3: Project File**
```xml
<PackageReference Include="Syncfusion.Scheduler.WinUI" Version="xx.x.x" />
```

Replace `xx.x.x` with the desired version number.

### Prerequisites

- Windows 10 version 1809 or higher
- .NET 9.0 or later for WinUI 3 desktop apps
- Visual Studio 2022 or later with WinUI 3 workload installed

## Creating Your First WinUI Scheduler Application

### Step 1: Create a WinUI 3 Desktop Application

1. Open Visual Studio
2. Create a new project using the **WinUI 3 Desktop App for C# and .NET 5** template
3. Name your project (e.g., "SchedulerApp")

### Step 2: Import the Namespace

Add the Syncfusion Scheduler namespace to your XAML file:

**XAML (MainWindow.xaml):**
```xml
<Window
    x:Class="SchedulerApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:scheduler="using:Syncfusion.UI.Xaml.Scheduler">
    
    <!-- Scheduler will be added here -->
</Window>
```

**C# (MainWindow.xaml.cs):**
```csharp
using Syncfusion.UI.Xaml.Scheduler;
```

### Step 3: Initialize the Scheduler

Add the SfScheduler control to your window:

**XAML Approach:**
```xml
<Window
    x:Class="SchedulerApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:scheduler="using:Syncfusion.UI.Xaml.Scheduler">
    
    <Grid>
        <scheduler:SfScheduler x:Name="Schedule" ViewType="Month" />
    </Grid>
</Window>
```

**C# Approach:**
```csharp
using Syncfusion.UI.Xaml.Scheduler;

namespace SchedulerApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Create scheduler instance
            SfScheduler scheduler = new SfScheduler();
            scheduler.ViewType = SchedulerViewType.Month;
            
            // Add to window content
            this.Content = scheduler;
        }
    }
}
```

## Basic Scheduler Initialization

### Minimal Working Example

Here's a complete minimal example that displays a working scheduler:

**MainWindow.xaml:**
```xml
<Window
    x:Class="SchedulerApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:scheduler="using:Syncfusion.UI.Xaml.Scheduler">
    
    <Grid>
        <scheduler:SfScheduler x:Name="Schedule" ViewType="Week" />
    </Grid>
</Window>
```

This minimal code will display a Week view scheduler showing the current week with empty time slots ready for appointments.

### Adding Your First Appointment

Extend the basic example to include an appointment:

**MainWindow.xaml.cs:**
```csharp
using Syncfusion.UI.Xaml.Scheduler;
using System;

namespace SchedulerApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            
            // Create appointment collection
            var appointments = new ScheduleAppointmentCollection();
            
            // Add a sample appointment
            appointments.Add(new ScheduleAppointment
            {
                StartTime = DateTime.Now.Date.AddHours(10),
                EndTime = DateTime.Now.Date.AddHours(12),
                Subject = "Team Meeting",
                Location = "Conference Room A",
                Notes = "Discuss Q1 goals and objectives"
            });
            
            // Bind appointments to scheduler
            Schedule.ItemsSource = appointments;
        }
    }
}
```

**Result:** The scheduler will display a "Team Meeting" appointment from 10 AM to 12 PM today.

## ViewType Configuration

The `ViewType` property determines which view the scheduler displays. Set it during initialization:

### Available View Types

```csharp
// Day view - Shows single day with time slots
Schedule.ViewType = SchedulerViewType.Day;

// Week view - Shows 7 days of the week
Schedule.ViewType = SchedulerViewType.Week;

// WorkWeek view - Shows Monday through Friday
Schedule.ViewType = SchedulerViewType.WorkWeek;

// Month view - Shows calendar month grid
Schedule.ViewType = SchedulerViewType.Month;

// TimelineDay view - Horizontal day timeline
Schedule.ViewType = SchedulerViewType.TimelineDay;

// TimelineWeek view - Horizontal week timeline
Schedule.ViewType = SchedulerViewType.TimelineWeek;

// TimelineWorkWeek view - Horizontal workweek timeline
Schedule.ViewType = SchedulerViewType.TimelineWorkWeek;

// TimelineMonth view - Horizontal month timeline
Schedule.ViewType = SchedulerViewType.TimelineMonth;
```

**XAML Example:**
```xml
<scheduler:SfScheduler x:Name="Schedule" ViewType="Week" />
```

### Switching Views Programmatically

```csharp
// In button click or event handler
private void OnSwitchToMonthView(object sender, RoutedEventArgs e)
{
    Schedule.ViewType = SchedulerViewType.Month;
}

private void OnSwitchToTimelineView(object sender, RoutedEventArgs e)
{
    Schedule.ViewType = SchedulerViewType.TimelineWeek;
}
```

## First Day of Week Setup

Customize which day appears as the first column in the scheduler:

**XAML:**
```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="Week"
                      FirstDayOfWeek="Monday" />
```

**C#:**
```csharp
// Set Monday as first day
Schedule.FirstDayOfWeek = DayOfWeek.Monday;

// Set Sunday as first day (default)
Schedule.FirstDayOfWeek = DayOfWeek.Sunday;

// Any day can be set as first day
Schedule.FirstDayOfWeek = DayOfWeek.Wednesday;
```

**Use Case:** In many countries, Monday is considered the first day of the business week, so setting `FirstDayOfWeek` to Monday aligns the scheduler with business conventions.

## CSS Imports and Themes

WinUI Scheduler uses WinUI's built-in theming system. Themes are automatically applied based on the system settings (Light, Dark, or HighContrast).

### Automatic Theme Detection

The scheduler automatically adapts to:
- **Light Theme** - Default Windows light appearance
- **Dark Theme** - Windows dark mode
- **HighContrast Themes** - Windows accessibility high contrast themes

No additional theme imports or CSS files are required. The control will respond to system theme changes automatically.

### Manual Theme Override (Optional)

If you want to override specific theme colors:

```xml
<scheduler:SfScheduler x:Name="Schedule">
    <scheduler:SfScheduler.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="SyncfusionSchedulerBackground" Color="#FFFFFF" />
                </ResourceDictionary>
                <ResourceDictionary x:Key="Dark">
                    <SolidColorBrush x:Key="SyncfusionSchedulerBackground" Color="#1E1E1E" />
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
        </ResourceDictionary>
    </scheduler:SfScheduler.Resources>
</scheduler:SfScheduler>
```

## Complete Getting Started Example

Here's a complete, copy-paste-ready example:

**MainWindow.xaml:**
```xml
<Window
    x:Class="SchedulerApp.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:scheduler="using:Syncfusion.UI.Xaml.Scheduler">
    
    <Grid>
        <scheduler:SfScheduler x:Name="Schedule" 
                              ViewType="Week"
                              FirstDayOfWeek="Monday" />
    </Grid>
</Window>
```

**MainWindow.xaml.cs:**
```csharp
using Microsoft.UI.Xaml;
using Syncfusion.UI.Xaml.Scheduler;
using System;

namespace SchedulerApp
{
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            this.InitializeComponent();
            LoadAppointments();
        }
        
        private void LoadAppointments()
        {
            // Create appointment collection
            var appointments = new ScheduleAppointmentCollection();
            
            // Add multiple appointments
            appointments.Add(new ScheduleAppointment
            {
                StartTime = DateTime.Now.Date.AddHours(9),
                EndTime = DateTime.Now.Date.AddHours(10),
                Subject = "Morning Standup",
                Location = "Teams Meeting"
            });
            
            appointments.Add(new ScheduleAppointment
            {
                StartTime = DateTime.Now.Date.AddHours(14),
                EndTime = DateTime.Now.Date.AddHours(15),
                Subject = "Client Presentation",
                Location = "Conference Room B"
            });
            
            appointments.Add(new ScheduleAppointment
            {
                StartTime = DateTime.Now.Date.AddHours(16),
                EndTime = DateTime.Now.Date.AddHours(17),
                Subject = "Code Review",
                Location = "Development Lab"
            });
            
            // Bind to scheduler
            Schedule.ItemsSource = appointments;
        }
    }
}
```

## Common Initial Setup Patterns

### Pattern 1: Week View with Current Week

```csharp
Schedule.ViewType = SchedulerViewType.Week;
Schedule.DisplayDate = DateTime.Today; // Shows current week
Schedule.FirstDayOfWeek = DayOfWeek.Monday;
```

### Pattern 2: Day View with Today

```csharp
Schedule.ViewType = SchedulerViewType.Day;
Schedule.DisplayDate = DateTime.Today;
```

### Pattern 3: Month View with Current Month

```csharp
Schedule.ViewType = SchedulerViewType.Month;
Schedule.DisplayDate = DateTime.Today;
```

### Pattern 4: Timeline Week for Resource Planning

```csharp
Schedule.ViewType = SchedulerViewType.TimelineWeek;
Schedule.DisplayDate = DateTime.Today;
```

## Troubleshooting Common Setup Issues

### Issue 1: Scheduler Not Showing

**Problem:** The scheduler control doesn't appear in the window.

**Solution:**
- Verify the NuGet package is installed correctly
- Check that the namespace is imported: `xmlns:scheduler="using:Syncfusion.UI.Xaml.Scheduler"`
- Ensure the Grid or container has proper sizing
- Check that no licensing errors appear in the output window

### Issue 2: Appointments Not Displaying

**Problem:** Added appointments don't show up.

**Solution:**
- Verify appointment `StartTime` and `EndTime` are within the visible date range
- Check that `ItemsSource` is set correctly: `Schedule.ItemsSource = appointments;`
- Ensure appointments are added to the collection before binding
- Verify the `ViewType` is appropriate for the appointment times

### Issue 3: Wrong First Day of Week

**Problem:** Week starts on Sunday instead of Monday (or vice versa).

**Solution:**
```csharp
Schedule.FirstDayOfWeek = DayOfWeek.Monday; // Or your preferred day
```

### Issue 4: Theme Not Applied

**Problem:** Scheduler doesn't match application theme.

**Solution:**
- WinUI Scheduler automatically uses system theme
- Verify Windows theme settings (Settings > Personalization > Colors)
- For custom themes, check ResourceDictionary configuration

## Next Steps

After completing the basic setup, explore these features:

1. **Appointment Management** - Learn to create, edit, and delete appointments
2. **Custom Data Binding** - Map your business objects to appointments
3. **View Customization** - Configure time intervals, working days, and appearance
4. **Drag-and-Drop** - Enable appointment rescheduling
5. **Recurring Appointments** - Set up repeating events
6. **Resource Grouping** - Assign appointments to resources (people, rooms, equipment)

## Quick Checklist

✅ NuGet package installed (`Syncfusion.Scheduler.WinUI`)  
✅ Namespace imported in XAML and C#  
✅ SfScheduler added to layout  
✅ ViewType configured  
✅ FirstDayOfWeek set (optional)  
✅ Appointments added to ItemsSource  
✅ Application runs without errors  

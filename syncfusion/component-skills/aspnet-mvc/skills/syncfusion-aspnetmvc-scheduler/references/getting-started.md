# Getting Started with ASP.NET MVC Scheduler

This guide covers the setup and initial configuration of the Syncfusion ASP.NET MVC Scheduler component in your application.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
    - [Step 1: Install NuGet Package](#step-1-install-nuget-package)
    - [Step 2: Add Namespace Reference](#step-2-add-namespace-reference)
    - [Step 3: Add Stylesheet and Script References](#step-3-add-stylesheet-and-script-references)
    - [Step 4: Register Script Manager](#step-4-register-script-manager)
- [Basic Scheduler Implementation](#basic-scheduler-implementation)
- [Populating with Appointments](#populating-with-appointments)
- [Setting Initial Date](#setting-initial-date)
- [Setting Initial View](#setting-initial-view)
- [Configuring Available Views](#configuring-available-views)
- [Customizing Individual Views](#customizing-individual-views)
- [Working Hours Configuration](#working-hours-configuration)
- [Working Days Configuration](#working-days-configuration)
- [First Day of Week](#first-day-of-week)
- [Complete Example](#complete-example)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have:
- Visual Studio 2017 or later
- .NET Framework 4.5 or later
- ASP.NET MVC 5 application project
- Internet connection for CDN resources (or local package installation)

**System Requirements**: [ASP.NET MVC controls system requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements)

## Installation Steps

### Step 1: Install NuGet Package

The Scheduler control is available as part of the `Syncfusion.EJ2.MVC5` NuGet package.

**Using Package Manager Console:**
```bash
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

**Using NuGet Package Manager UI:**
1. Open Visual Studio → Tools → NuGet Package Manager → Manage NuGet Packages for Solution
2. Search for `Syncfusion.EJ2.MVC5`
3. Click Install

**Dependencies:**
- `Newtonsoft.Json` - JSON serialization
- `Syncfusion.Licensing` - License validation

### Step 2: Add Namespace Reference

Add the Syncfusion namespace to `Web.config` in the `Views` folder:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

This allows you to use Syncfusion controls without fully qualifying the namespace in every view.

### Step 3: Add Stylesheet and Script References

Add Syncfusion CSS and JavaScript references in `~/Views/Shared/_Layout.cshtml`:

```cshtml
<head>
    <!-- Syncfusion ASP.NET MVC controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    
    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

**Available Themes:**
- `fluent.css` - Fluent theme (Microsoft 365 style)
- `material.css` - Material design
- `bootstrap5.css` - Bootstrap 5
- `bootstrap4.css` - Bootstrap 4
- `fabric.css` - Office Fabric
- `tailwind.css` - Tailwind CSS

**Alternative Loading Methods:**
- **NPM Package**: `npm install @syncfusion/ej2-asp-mvc-base`
- **CRG (Custom Resource Generator)**: Generate custom scripts with only required components
- **Local Files**: Download and host files locally

### Step 4: Register Script Manager

Add the Syncfusion Script Manager at the end of `<body>` in `_Layout.cshtml`:

```cshtml
<body>
    @RenderBody()
    
    <!-- Syncfusion ASP.NET MVC Script Manager -->
    @Html.EJS().ScriptManager()
</body>
```

The Script Manager initializes all Syncfusion controls and handles their rendering.

## Basic Scheduler Implementation

### Minimal Scheduler Setup

Create a simple Scheduler in `~/Views/Home/Index.cshtml`:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .SelectedDate(new DateTime(2024, 1, 15))
    .Render()
)
```

**Run the Application:**
- Press `Ctrl+F5` (Windows) or `Cmd+F5` (macOS)
- The empty Scheduler will display with Week view by default

### Basic Properties Explained

| Property | Description | Default |
|----------|-------------|---------|
| `Id` ("scheduler") | Unique identifier for the control | Required |
| `Width` | Scheduler width | "auto" |
| `Height` | Scheduler height | "auto" |
| `SelectedDate` | Initially displayed date | Current date |

## Populating with Appointments

### Step 1: Create Data Model

Create an appointment model class:

```csharp
// Models/AppointmentData.cs
public class AppointmentData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
    public bool IsAllDay { get; set; }
    public string RecurrenceRule { get; set; }
}
```

### Step 2: Provide Data from Controller

```csharp
// Controllers/HomeController.cs
public class HomeController : Controller
{
    public ActionResult Index()
    {
        ViewBag.appointments = GetScheduleData();
        return View();
    }

    public List<AppointmentData> GetScheduleData()
    {
        List<AppointmentData> appData = new List<AppointmentData>();
        
        appData.Add(new AppointmentData {
            Id = 1,
            Subject = "Explosion of Betelgeuse Star",
            StartTime = new DateTime(2024, 2, 11, 9, 30, 0),
            EndTime = new DateTime(2024, 2, 11, 11, 0, 0)
        });
        
        appData.Add(new AppointmentData {
            Id = 2,
            Subject = "Thule Air Crash Report",
            StartTime = new DateTime(2024, 2, 12, 12, 0, 0),
            EndTime = new DateTime(2024, 2, 12, 14, 0, 0)
        });
        
        appData.Add(new AppointmentData {
            Id = 3,
            Subject = "Blue Moon Eclipse",
            StartTime = new DateTime(2024, 2, 13, 9, 30, 0),
            EndTime = new DateTime(2024, 2, 13, 11, 0, 0)
        });
        
        return appData;
    }
}
```

### Step 3: Bind Data to Scheduler

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.appointments })
    .SelectedDate(new DateTime(2024, 2, 15))
    .Render()
)
```

**Result:** Scheduler displays three appointments at their specified times.

## Setting Initial Date

Control which date the Scheduler displays on load:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Width("100%")
    .Height("550px")
    .SelectedDate(new DateTime(2026, 4, 15))  // Start on April 15, 2026
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Setting Initial View

Change the default view from Week to another view:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Width("100%")
    .Height("550px")
    .SelectedDate(new DateTime(2026, 4, 10))
    .CurrentView(Syncfusion.EJ2.Schedule.View.Month)  // Start with Month view
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Available Views:**
- `View.Day` - Single day
- `View.Week` - 7 days (Sunday to Saturday)
- `View.WorkWeek` - 5 days (Monday to Friday)
- `View.Month` - Calendar month
- `View.Year` - Full year
- `View.Agenda` - List of upcoming events
- `View.MonthAgenda` - Month calendar with event list
- `View.TimelineDay` - Timeline single day
- `View.TimelineWeek` - Timeline week
- `View.TimelineWorkWeek` - Timeline work week
- `View.TimelineMonth` - Timeline month
- `View.TimelineYear` - Timeline year

## Configuring Available Views

Specify which views appear in the toolbar:

```csharp
// Controller
public ActionResult Index()
{
    List<ScheduleView> viewOptions = new List<ScheduleView>()
    {
        new ScheduleView { Option = Syncfusion.EJ2.Schedule.View.Day },
        new ScheduleView { Option = Syncfusion.EJ2.Schedule.View.Week },
        new ScheduleView { Option = Syncfusion.EJ2.Schedule.View.Month },
        new ScheduleView { Option = Syncfusion.EJ2.Schedule.View.Agenda }
    };
    ViewBag.ViewOptions = viewOptions;
    return View(GetScheduleData());
}
```

```cshtml
@Html.EJS().Schedule("scheduler")
    .Width("100%")
    .Height("550px")
    .SelectedDate(new DateTime(2026, 4, 10))
    .CurrentView(Syncfusion.EJ2.Schedule.View.Week)
    .Views((List<ScheduleView>)ViewBag.ViewOptions)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Customizing Individual Views

Apply different settings to each view:

```csharp
// Controller
public ActionResult Index()
{
    List<ScheduleView> viewOptions = new List<ScheduleView>()
    {
        // Week view with custom date format
        new ScheduleView 
        { 
            Option = Syncfusion.EJ2.Schedule.View.Week,
            DateFormat = "dd-MMM-yyyy"
        },
        
        // Month view hiding weekends and read-only
        new ScheduleView 
        { 
            Option = Syncfusion.EJ2.Schedule.View.Month,
            ShowWeekend = false,
        },
        
        // Day view with custom time range
        new ScheduleView
        {
            Option = Syncfusion.EJ2.Schedule.View.Day,
            StartHour = "08:00",
            EndHour = "18:00"
        }
    };
    ViewBag.ViewOptions = viewOptions;
    return View(GetScheduleData());
}
```

## Working Hours Configuration

Set the visible time range for day-based views:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Width("100%")
    .Height("550px")
    .SelectedDate(new DateTime(2026, 4, 10))
    .StartHour("08:00")  // Start at 8 AM
    .EndHour("18:00")    // End at 6 PM
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Working Days Configuration

Define which days are considered working days:

```cshtml
@{
    int[] workingDays = new int[] { 1, 2, 3, 4, 5 };  // Monday to Friday
}

@Html.EJS().Schedule("scheduler")
    .Width("100%")
    .Height("550px")
    .SelectedDate(new DateTime(2026, 4, 10))
    .WorkDays(workingDays)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Day Values:**
- 0 = Sunday
- 1 = Monday
- 2 = Tuesday
- 3 = Wednesday
- 4 = Thursday
- 5 = Friday
- 6 = Saturday

## First Day of Week

Change the first day displayed in Week view:

```cshtml
@Html.EJS().Schedule("scheduler")
    .Width("100%")
    .Height("550px")
    .SelectedDate(new DateTime(2026, 4, 10))
    .FirstDayOfWeek(1)  // Start week on Monday (0=Sunday, 1=Monday, etc.)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Complete Example

Here's a comprehensive getting-started example:

```csharp
// Controllers/HomeController.cs
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Syncfusion.EJ2.Schedule;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        // Configure views
        List<ScheduleView> viewOptions = new List<ScheduleView>()
        {
            new ScheduleView { Option = View.Day },
            new ScheduleView { Option = View.Week },
            new ScheduleView { Option = View.WorkWeek },
            new ScheduleView { Option = View.Month }
        };
        ViewBag.ViewOptions = viewOptions;
        
        return View(GetScheduleData());
    }

    public List<AppointmentData> GetScheduleData()
    {
        List<AppointmentData> appData = new List<AppointmentData>();
        
        appData.Add(new AppointmentData
        {
            Id = 1,
            Subject = "Daily Standup",
            StartTime = new DateTime(2026, 4, 10, 9, 0, 0),
            EndTime = new DateTime(2026, 4, 10, 9, 30, 0),
            Location = "Conference Room"
        });
        
        appData.Add(new AppointmentData
        {
            Id = 2,
            Subject = "Sprint Planning",
            StartTime = new DateTime(2026, 4, 11, 10, 0, 0),
            EndTime = new DateTime(2026, 4, 11, 12, 0, 0),
            Description = "Plan sprint tasks and priorities"
        });
        
        return appData;
    }
}

public class AppointmentData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
}
```

```cshtml
@* Views/Home/Index.cshtml *@
@model List<AppointmentData>

@{
    ViewBag.Title = "Scheduler";
}

<div class="control-section">
    <h2>Meeting Scheduler</h2>
    
    @Html.EJS().Schedule("scheduler")
        .Width("100%")
        .Height("650px")
        .SelectedDate(new DateTime(2026, 4, 10))
        .CurrentView(Syncfusion.EJ2.Schedule.View.Week)
        .Views((List<ScheduleView>)ViewBag.ViewOptions)
        .StartHour("07:00")
        .EndHour("19:00")
        .WorkDays(new int[] { 1, 2, 3, 4, 5 })
        .EventSettings(e => e.DataSource(Model))
        .Render()
</div>

<style>
    .control-section {
        padding: 20px;
    }
</style>
```

## Troubleshooting

### Scheduler Not Rendering
- Verify NuGet package is installed correctly
- Check that namespace is added to Web.config
- Ensure Script Manager is placed at end of body
- Verify CSS and JS files are loading (check browser console)

### Appointments Not Showing
- Confirm `EventSettings.DataSource` is bound to model
- Check DateTime values are within visible date range
- Verify model has `Id`, `StartTime`, and `EndTime` properties
- Ensure dates are not accidentally in UTC if displaying in local time

### Styling Issues
- Check that theme CSS file is loaded before custom CSS
- Verify CDN URL is correct and accessible
- Test with different themes to isolate issues
- Clear browser cache

## Additional Resources

- **Live Examples**: [ASP.NET MVC Scheduler Demos](https://ej2.syncfusion.com/aspnetmvc/Schedule/Overview)
- **API Reference**: [Syncfusion.EJ2.Schedule Namespace](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Schedule.html)
- **GitHub Sample**: [ASP.NET MVC Getting Started](https://github.com/SyncfusionExamples/ASP-NET-MVC-Getting-Started-Examples/tree/main/Schedule)

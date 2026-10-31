# Getting Started with ASP.NET Core Scheduler

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Application Type 1: ASP.NET Core Razor Pages](#application-type-1-aspnet-core-razor-pages)
  - [Setup (Razor Pages)](#setup-razor-pages)
  - [Basic Implementation (Razor Pages)](#basic-implementation-razor-pages)
  - [Populating Appointments (Razor Pages)](#populating-appointments-razor-pages)
  - [Configuring Views (Razor Pages)](#configuring-views-razor-pages)
  - [Complete Example (Razor Pages)](#complete-example-razor-pages)
- [Application Type 2: ASP.NET Core MVC](#application-type-2-aspnet-core-mvc)
  - [Setup (MVC)](#setup-mvc)
  - [Basic Implementation (MVC)](#basic-implementation-mvc)
  - [Populating Appointments (MVC)](#populating-appointments-mvc)
  - [Configuring Views (MVC)](#configuring-views-mvc)
  - [Complete Example (MVC)](#complete-example-mvc)
- [Troubleshooting](#troubleshooting)

## Overview

The Syncfusion ASP.NET Core Scheduler is delivered through the `Syncfusion.EJ2.AspNet.Core` NuGet package and can be used in either of two application models:

- **Razor Pages** — page-based model where data and handlers live in a `PageModel` class (`Index.cshtml.cs`) and the view binds to `@model` properties.
- **MVC** — controller-based model where data is exposed through `Controller` actions using `ViewData` / `ViewBag`, and views live under `Views/`.

This document is split into two independent tracks so you can follow the path that matches your project. Pick the section that matches the application type you created in Visual Studio (or via `dotnet new`).

## Prerequisites

Before starting, ensure you have:

- Visual Studio 2019 or later (or VS Code with the C# extension)
- .NET SDK 3.1 or higher (the Syncfusion.EJ2.AspNet.Core package supports .NET 3.1+)

You can create a starter project with one of these commands:

```powershell
# Razor Pages
dotnet new webapp -n SchedulerSample

# MVC
dotnet new mvc -n SchedulerSample
```

## Installation

### Step 1: Create or Use Existing ASP.NET Core Application

You can create a new ASP.NET Core web application using:

- **Microsoft Templates:** Create a Razor Pages or MVC Project (see commands above).
- **Syncfusion Extension:** Use the Syncfusion ASP.NET Core Extension for automatic setup.

### Step 2: Install NuGet Package

Open the NuGet Package Manager Console and install the `Syncfusion.EJ2.AspNet.Core` package:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

Alternatively, use the NuGet Package Manager UI (Tools → NuGet Package Manager → Manage NuGet Packages for Solution).

**Dependencies:** This package includes:

- `Newtonsoft.Json` for JSON serialization
- `Syncfusion.Licensing` for license validation

**Alternative Methods:**

- **NPM Package:** Use `@syncfusion/ej2-asp-core-mvc` package
- **Custom Resource Generator (CRG):** Generate custom theme and script bundles
- **Local Files:** Download and reference files locally

For more details, refer to Adding Script References and Themes.

---

## Application Type 1: ASP.NET Core Razor Pages

Use this section if your project was created from `dotnet new webapp` or the Visual Studio **ASP.NET Core Web App** template.

### Setup (Razor Pages)

#### 1. Add the Tag Helper

Open `~/Pages/_ViewImports.cshtml` and register the Syncfusion EJ2 Tag Helper:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

#### 2. Add Stylesheet and Script Resources

In `~/Pages/Shared/_Layout.cshtml`, add the Syncfusion CDN references inside the `<head>` tag. When using CDNs, prefer HTTPS and Subresource Integrity (SRI) to prevent tampering:

```html
<head>
    <!-- Syncfusion ASP.NET Core controls styles (HTTPS + SRI example) -->
    <link rel="stylesheet" href="https://cdn.example.com/syncfusion/styles.min.css"
          integrity="sha384-REPLACE_WITH_ACTUAL_HASH" crossorigin="anonymous">

    <!-- Syncfusion ASP.NET Core controls scripts (HTTPS + SRI example) -->
    <script src="https://cdn.example.com/syncfusion/scripts.min.js"
            integrity="sha384-REPLACE_WITH_ACTUAL_HASH" crossorigin="anonymous"></script>
</head>
```

#### 3. Register the Script Manager

In the same `_Layout.cshtml`, add `<ejs-scripts>` at the end of the `<body>` tag:

```html
<body>
    @RenderBody()

    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

### Basic Implementation (Razor Pages)

In `~/Pages/Index.cshtml`, add the Scheduler tag helper. Razor Pages files start with `@page` and bind to a `PageModel`:

```cshtml
@page
@model IndexModel

<ejs-schedule id="schedule" width="100%" height="550">
</ejs-schedule>
```

**Result:** A blank Scheduler renders, displaying the current week by default.

### Populating Appointments (Razor Pages)

#### 1. Create an Appointment Data Model

Create `~/Models/AppointmentData.cs`:

```csharp
namespace SchedulerSample.Models
{
    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
    }
}
```

#### 2. Populate Data in the PageModel

In `~/Pages/Index.cshtml.cs`, expose the appointments as a strongly-typed property:

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using SchedulerSample.Models;

namespace SchedulerSample.Pages
{
    public class IndexModel : PageModel
    {
        public List<AppointmentData> Appointments { get; set; } = new();

        public void OnGet()
        {
            Appointments = new List<AppointmentData>
            {
                new AppointmentData
                {
                    Id = 1,
                    Subject = "Project Review",
                    StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
                    EndTime   = new DateTime(2024, 3, 28, 11, 0, 0),
                    Location  = "Conference Room A",
                    Description = "Review Q1 project status"
                },
                new AppointmentData
                {
                    Id = 2,
                    Subject = "Team Standup",
                    StartTime = new DateTime(2024, 3, 28, 14, 0, 0),
                    EndTime   = new DateTime(2024, 3, 28, 14, 30, 0),
                    Location  = "Virtual",
                    Description = "Daily standup meeting"
                }
            };
        }
    }
}
```

#### 3. Bind Data in the View

Reference the `PageModel` property using the `Model.` prefix in `~/Pages/Index.cshtml`:

```cshtml
@page
@model IndexModel

<ejs-schedule id="schedule"
              width="100%"
              height="550"
              selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-eventsettings dataSource="Model.Appointments"></e-schedule-eventsettings>
</ejs-schedule>
```

**Result:** Appointments appear on the calendar on their scheduled dates and times.

#### 4. Setting the Default Date

Use the `selectedDate` property to display a specific date instead of the system date:

```cshtml
<ejs-schedule id="schedule"
              width="100%"
              height="550"
              selectedDate="new DateTime(2024, 6, 15)">
    <e-schedule-eventsettings dataSource="Model.Appointments"></e-schedule-eventsettings>
</ejs-schedule>
```

### Configuring Views (Razor Pages)

#### Available View Types

The Scheduler supports the following views:

- **Day** – Single day view
- **Week** – 7-day week view (default)
- **WorkWeek** – 5-day working week view
- **Month** – Monthly calendar view
- **Year** – Yearly calendar view
- **Agenda** – List of upcoming appointments
- **MonthAgenda** – Month with agenda list
- **TimelineDay**, **TimelineWeek**, **TimelineWorkWeek**, **TimelineMonth**, **TimelineYear** – Horizontal timeline variants

#### Setting the Default View

Use the `currentView` property to set the active view:

```cshtml
<ejs-schedule id="schedule"
              width="100%"
              height="550"
              currentView="Month"
              selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-eventsettings dataSource="Model.Appointments"></e-schedule-eventsettings>
</ejs-schedule>
```

#### Restricting the Visible Views

Use the `e-schedule-views` collection to choose which views appear in the view switcher:

```cshtml
<ejs-schedule id="schedule"
              width="100%"
              height="550"
              currentView="Week"
              selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="Model.Appointments"></e-schedule-eventsettings>
</ejs-schedule>
```

### Complete Example (Razor Pages)

#### `~/Models/AppointmentData.cs`

```csharp
namespace SchedulerSample.Models
{
    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
    }
}
```

#### `~/Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using SchedulerSample.Models;

namespace SchedulerSample.Pages
{
    public class IndexModel : PageModel
    {
        public List<AppointmentData> Appointments { get; set; } = new();

        public void OnGet()
        {
            Appointments = new List<AppointmentData>
            {
                new AppointmentData
                {
                    Id = 1,
                    Subject = "Team Standup",
                    StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
                    EndTime   = new DateTime(2024, 3, 28, 9, 30, 0),
                    Location  = "Conference Room",
                    Description = "Daily team sync"
                },
                new AppointmentData
                {
                    Id = 2,
                    Subject = "Project Planning",
                    StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
                    EndTime   = new DateTime(2024, 3, 28, 11, 30, 0),
                    Location  = "Virtual",
                    Description = "Q2 project kickoff"
                },
                new AppointmentData
                {
                    Id = 3,
                    Subject = "Client Meeting",
                    StartTime = new DateTime(2024, 3, 29, 14, 0, 0),
                    EndTime   = new DateTime(2024, 3, 29, 15, 0, 0),
                    Location  = "Office",
                    Description = "Requirements discussion"
                }
            };
        }
    }
}
```

#### `~/Pages/Index.cshtml`

```cshtml
@page
@model IndexModel
@{
    ViewData["Title"] = "Scheduler";
}

<ejs-schedule id="schedule"
              width="100%"
              height="550"
              currentView="Week"
              selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="WorkWeek"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="Model.Appointments">
        <e-eventsettings-fields id="Id">
            <e-field-subject name="Subject"></e-field-subject>
            <e-field-starttime name="StartTime"></e-field-starttime>
            <e-field-endtime name="EndTime"></e-field-endtime>
            <e-field-location name="Location"></e-field-location>
            <e-field-description name="Description"></e-field-description>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>
```

---

## Application Type 2: ASP.NET Core MVC

Use this section if your project was created from `dotnet new mvc` or the Visual Studio **ASP.NET Core Web App (Model-View-Controller)** template.

### Setup (MVC)

#### 1. Add the Tag Helper

Open `~/Views/_ViewImports.cshtml` and register the Syncfusion EJ2 Tag Helper:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

#### 2. Add Stylesheet and Script Resources

In `~/Views/Shared/_Layout.cshtml`, add the Syncfusion CDN references inside the `<head>` tag. When using CDNs, prefer HTTPS and Subresource Integrity (SRI):

```html
<head>
    <!-- Syncfusion ASP.NET Core controls styles (HTTPS + SRI example) -->
    <link rel="stylesheet" href="https://cdn.example.com/syncfusion/styles.min.css"
          integrity="sha384-REPLACE_WITH_ACTUAL_HASH" crossorigin="anonymous">

    <!-- Syncfusion ASP.NET Core controls scripts (HTTPS + SRI example) -->
    <script src="https://cdn.example.com/syncfusion/scripts.min.js"
            integrity="sha384-REPLACE_WITH_ACTUAL_HASH" crossorigin="anonymous"></script>
</head>
```

#### 3. Register the Script Manager

In the same `_Layout.cshtml`, add `<ejs-scripts>` at the end of the `<body>` tag:

```html
<body>
    @RenderBody()

    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

### Basic Implementation (MVC)

In `~/Views/Home/Index.cshtml`, add the Scheduler tag helper. MVC views do **not** use `@page` and typically receive data through `ViewBag`/`ViewData`:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550">
</ejs-schedule>
```

**Result:** A blank Scheduler renders, displaying the current week by default.

### Populating Appointments (MVC)

#### 1. Create an Appointment Data Model

Create `~/Models/AppointmentData.cs`:

```csharp
namespace SchedulerSample.Models
{
    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
    }
}
```

#### 2. Expose Data from a Controller

In `~/Controllers/HomeController.cs`, build the list and pass it to the view through `ViewBag`:

```csharp
using Microsoft.AspNetCore.Mvc;
using SchedulerSample.Models;

namespace SchedulerSample.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var appointmentData = new List<AppointmentData>
            {
                new AppointmentData
                {
                    Id = 1,
                    Subject = "Project Review",
                    StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
                    EndTime   = new DateTime(2024, 3, 28, 11, 0, 0),
                    Location  = "Conference Room A",
                    Description = "Review Q1 project status"
                },
                new AppointmentData
                {
                    Id = 2,
                    Subject = "Team Standup",
                    StartTime = new DateTime(2024, 3, 28, 14, 0, 0),
                    EndTime   = new DateTime(2024, 3, 28, 14, 30, 0),
                    Location  = "Virtual",
                    Description = "Daily standup meeting"
                }
            };

            ViewBag.datasource = appointmentData;
            return View();
        }
    }
}
```

#### 3. Bind Data in the View

Reference the `ViewBag` value in `~/Views/Home/Index.cshtml`:

```cshtml
<ejs-schedule id="schedule"
              width="100%"
              height="550"
              selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

**Result:** Appointments appear on the calendar on their scheduled dates and times.

#### 4. Setting the Default Date

Use the `selectedDate` property to display a specific date instead of the system date:

```cshtml
<ejs-schedule id="schedule"
              width="100%"
              height="550"
              selectedDate="new DateTime(2024, 6, 15)">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

### Configuring Views (MVC)

#### Available View Types

The Scheduler supports the following views:

- **Day** – Single day view
- **Week** – 7-day week view (default)
- **WorkWeek** – 5-day working week view
- **Month** – Monthly calendar view
- **Year** – Yearly calendar view
- **Agenda** – List of upcoming appointments
- **MonthAgenda** – Month with agenda list
- **TimelineDay**, **TimelineWeek**, **TimelineWorkWeek**, **TimelineMonth**, **TimelineYear** – Horizontal timeline variants

#### Setting the Default View

Use the `currentView` property to set the active view:

```cshtml
<ejs-schedule id="schedule"
              width="100%"
              height="550"
              currentView="Month"
              selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

#### Restricting the Visible Views

Use the `e-schedule-views` collection to choose which views appear in the view switcher:

```cshtml
<ejs-schedule id="schedule"
              width="100%"
              height="550"
              currentView="Week"
              selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

### Complete Example (MVC)

#### `~/Models/AppointmentData.cs`

```csharp
namespace SchedulerSample.Models
{
    public class AppointmentData
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
    }
}
```

#### `~/Controllers/HomeController.cs`

```csharp
using Microsoft.AspNetCore.Mvc;
using SchedulerSample.Models;

namespace SchedulerSample.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var appointmentData = new List<AppointmentData>
            {
                new AppointmentData
                {
                    Id = 1,
                    Subject = "Team Standup",
                    StartTime = new DateTime(2024, 3, 28, 9, 0, 0),
                    EndTime   = new DateTime(2024, 3, 28, 9, 30, 0),
                    Location  = "Conference Room",
                    Description = "Daily team sync"
                },
                new AppointmentData
                {
                    Id = 2,
                    Subject = "Project Planning",
                    StartTime = new DateTime(2024, 3, 28, 10, 0, 0),
                    EndTime   = new DateTime(2024, 3, 28, 11, 30, 0),
                    Location  = "Virtual",
                    Description = "Q2 project kickoff"
                },
                new AppointmentData
                {
                    Id = 3,
                    Subject = "Client Meeting",
                    StartTime = new DateTime(2024, 3, 29, 14, 0, 0),
                    EndTime   = new DateTime(2024, 3, 29, 15, 0, 0),
                    Location  = "Office",
                    Description = "Requirements discussion"
                }
            };

            ViewBag.datasource = appointmentData;
            return View();
        }
    }
}
```

#### `~/Views/Home/Index.cshtml`

```cshtml
@{
    ViewData["Title"] = "Scheduler";
}

<ejs-schedule id="schedule"
              width="100%"
              height="550"
              currentView="Week"
              selectedDate="new DateTime(2024, 3, 28)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="WorkWeek"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
        <e-schedule-view option="TimelineDay"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
        <e-eventsettings-fields id="Id">
            <e-field-subject name="Subject"></e-field-subject>
            <e-field-starttime name="StartTime"></e-field-starttime>
            <e-field-endtime name="EndTime"></e-field-endtime>
            <e-field-location name="Location"></e-field-location>
            <e-field-description name="Description"></e-field-description>
        </e-eventsettings-fields>
    </e-schedule-eventsettings>
</ejs-schedule>
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Scheduler not displaying (Razor Pages) | Verify `@addTagHelper *, Syncfusion.EJ2` is in `~/Pages/_ViewImports.cshtml` |
| Scheduler not displaying (MVC) | Verify `@addTagHelper *, Syncfusion.EJ2` is in `~/Views/_ViewImports.cshtml` |
| Razor Pages — appointments not showing | Confirm the view uses `dataSource="Model.Appointments"` and `@model IndexModel` |
| MVC — appointments not showing | Confirm the controller sets `ViewBag.datasource` and the view uses `dataSource="ViewBag.datasource"` |
| CSS not applied | Confirm the stylesheet `<link>` is in the correct `<head>` location and HTTPS is used |
| Scripts not loading | Verify `<ejs-scripts>` is at the end of the `<body>` tag in `_Layout.cshtml` |
| Events not interactive | Ensure the JavaScript file is loaded from the configured CDN or local path |

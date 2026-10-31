# Getting Started with ASP.NET Core Circular Gauge

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1: Create or Open an ASP.NET Core Razor Pages Project](#step-1-create-or-open-an-aspnet-core-razor-pages-project)
  - [Step 2: Install the Syncfusion ASP.NET Core NuGet Package](#step-2-install-the-syncfusion-aspnet-core-nuget-package)
- [Project Setup](#project-setup)
  - [Step 3: Configure _ViewImports.cshtml](#step-3-configure-_viewimportscsshtml)
- #add-scripts
  - [Step 4: Update _Layout.cshtml](#step-4-update-_layoutcshtml)
- [Register Script Manager](#register-script-manager)
  - [Step 5: Add Script Manager to _Layout.cshtml](#step-5-add-script-manager-to-_layoutcshtml)
- [Create Your First Gauge](#create-your-first-gauge)
  - #step-6-add-circular-gauge-control-in-indexcshtml
  - #step-7-add-page-model-logic-in-indexcshtmlcs
  - #step-8-run-the-application
- [Add Gauge Title](#add-gauge-title)
  - #step-9-include-gauge-title
- [Add Axis and Pointers](#add-axis-and-pointers)
  - #step-10-configure-axes-and-pointers
- [Complete Getting Started Example](#complete-getting-started-example)
  - [Pages/_ViewImports.cshtml](#pages_viewimportscshtml)
  - [Pages/Shared/_Layout.cshtml](#pagesshared_layoutcshtml)
  - [Pages/Index.cshtml.cs](#pagesindexcshtmlcs)
  - [Pages/Index.cshtml](#pagesindexcshtml)
- [Troubleshooting](#troubleshooting)
- [Sample Project](#sample-project)

## Prerequisites

Before starting with the Circular Gauge component in ASP.NET Core, ensure that you have the following:

- Visual Studio with ASP.NET Core workload installed.
- .NET 8.0 or later SDK installed.
- Basic knowledge of ASP.NET Core Razor Pages.
- Internet access if you are using the CDN script reference.

## Installation

### Step 1: Create or Open an ASP.NET Core Razor Pages Project

Create a new ASP.NET Core Razor Pages application or open an existing Razor Pages project.

Recommended project type:

```text
ASP.NET Core Web App
```

Use Razor Pages for this getting started example because the sample uses the following file structure:

```text
Pages/
    _ViewImports.cshtml
    Index.cshtml
    Index.cshtml.cs
    Shared/
        _Layout.cshtml
```

### Step 2: Install the Syncfusion ASP.NET Core NuGet Package

Install the latest `Syncfusion.EJ2.AspNet.Core` package in your ASP.NET Core application.

Using Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.2.8
```

Using .NET CLI:

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core --version 33.2.8
```

Important dependencies are installed automatically with the package:

- `Syncfusion.Licensing`
- `Newtonsoft.Json`

Use the same Syncfusion version for both the NuGet package and CDN script reference to avoid version mismatch issues.

## Project Setup

### Step 3: Configure _ViewImports.cshtml

Add the Syncfusion tag helper in `~/Pages/_ViewImports.cshtml`.

```html
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

The following line is required for Syncfusion ASP.NET Core tag helpers:

```html
@addTagHelper *, Syncfusion.EJ2
```

Without this line, tags such as `<ejs-circulargauge>`, `<e-circulargauge-axes>`, and `<e-circulargauge-pointer>` will not be recognized correctly by Razor.

## Add Scripts

### Step 4: Update _Layout.cshtml

Add only the Syncfusion script reference in `~/Pages/Shared/_Layout.cshtml`.

This Circular Gauge getting started sample does not include a Syncfusion stylesheet link.

Use a complete layout file like the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>@ViewData["Title"] - Circular Gauge Demo</title>

    <!-- Syncfusion ASP.NET Core controls script -->
    https://cdn.syncfusion.com/ej2/33.2.8/dist/ej2.min.jsscript>
</head>
<body>
    <header>
        <nav>
            <a asp-area="" asp-page="/Index">Circular Gauge Demo</a>
        </nav>
    </header>

    <main role="main">
        @RenderBody()
    </main>

    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>

    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

## Register Script Manager

### Step 5: Add Script Manager to _Layout.cshtml

Add the Syncfusion script manager near the end of the `<body>` section in `~/Pages/Shared/_Layout.cshtml`.

```html
<ejs-scripts></ejs-scripts>
```

The script manager is required because Syncfusion ASP.NET Core tag helpers render initialization scripts through this script manager. If it is missing, the Circular Gauge markup may appear in the page source, but the component may not initialize correctly in the browser.

Recommended placement:

```html
<body>
    ...

    @RenderBody()

    <ejs-scripts></ejs-scripts>

    @await RenderSectionAsync("Scripts", required: false)
</body>
```

## Create Your First Gauge

### Step 6: Add Circular Gauge Control in Index.cshtml

Open `~/Pages/Index.cshtml` and add the Circular Gauge control.

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Circular Gauge";
}

<h1>ASP.NET Core Circular Gauge</h1>
<p>Basic Circular Gauge rendering example</p>

<ejs-circulargauge id="gauge" width="100%" height="450px">
</ejs-circulargauge>
```

This renders a basic Circular Gauge using the default axis, label, tick, and pointer configuration.

### Step 7: Add Page Model Logic in Index.cshtml.cs

For the first basic example, no complex server-side model is required. However, keep `Index.cshtml.cs` available so the page follows the standard Razor Pages structure.

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}
```

The `Index.cshtml` file uses the fully qualified model declaration:

```html
@model CircularGaugeGettingStarted.Pages.IndexModel
```

This is used because `_ViewImports.cshtml` does not include an `@namespace` directive.

### Step 8: Run the Application

Run the application using one of the following options:

```bash
dotnet run
```

Or press:

```text
Ctrl + F5
```

The Circular Gauge will render in the browser.

## Add Gauge Title

### Step 9: Include Gauge Title

Use the `title` property to display a title for the Circular Gauge.

Index.cshtml.cs:

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Speed";

        public void OnGet()
        {
        }
    }
}
```

Index.cshtml:

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Circular Gauge";
}

<h1>ASP.NET Core Circular Gauge</h1>
<p>Circular Gauge with title</p>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
</ejs-circulargauge>
```

The `title` property provides a clear context for the gauge. It is useful when the page contains multiple gauges or dashboard-style widgets.

## Add Axis and Pointers

### Step 10: Configure Axes and Pointers

Use `e-circulargauge-axes` to define axis settings and `e-circulargauge-pointers` to define pointer values.

Index.cshtml.cs:

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Speed";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 120;

        public double PointerValue { get; set; } = 70;

        public void OnGet()
        {
        }
    }
}
```

Index.cshtml:

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Circular Gauge";
}

<h1>ASP.NET Core Circular Gauge</h1>
<p>Circular Gauge with axis and pointer configuration</p>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue"
                              radius="90%">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

Properties used in this example:

- `startAngle="240"` sets the axis start angle.
- `endAngle="120"` sets the axis end angle.
- `minimum="@Model.MinimumValue"` sets the minimum axis value from `Index.cshtml.cs`.
- `maximum="@Model.MaximumValue"` sets the maximum axis value from `Index.cshtml.cs`.
- `radius="90%"` sets the axis radius relative to the gauge area.
- `value="@Model.PointerValue"` sets the pointer value from `Index.cshtml.cs`.

Angle reference:

- `0°` points to the right.
- `90°` points to the bottom.
- `180°` points to the left.
- `270°` points to the top.

## Complete Getting Started Example

The following files provide a complete copy-paste-ready Razor Pages example.

### Pages/_ViewImports.cshtml

```html
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

### Pages/Shared/_Layout.cshtml

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>@ViewData["Title"] - Circular Gauge Demo</title>

    <!-- Syncfusion ASP.NET Core controls script -->
    https://cdn.syncfusion.com/ej2/33.2.8/dist/ej2.min.jsscript>
</head>
<body>
    <header>
        <nav>
            <a asp-area="" asp-page="/Index">Circular Gauge Demo</a>
        </nav>
    </header>

    <main role="main">
        @RenderBody()
    </main>

    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>

    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Speed";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 200;

        public double PointerValue { get; set; } = 120;

        public void OnGet()
        {
        }
    }
}
```

### Pages/Index.cshtml

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Circular Gauge";
}

<h1>ASP.NET Core Circular Gauge</h1>
<p>Complete Circular Gauge example using Razor Pages</p>

<ejs-circulargauge id="speedGauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    background="transparent">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="@Model.MinimumValue"
                              maximum="@Model.MaximumValue"
                              radius="90%">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

This complete example keeps configuration values such as title, minimum, maximum, and pointer value in `Index.cshtml.cs`. This makes the Razor page easier to maintain and allows you to later bind values from a database, service, or API.

## Troubleshooting

If the gauge is not rendering, check the following:

1. Confirm that the Syncfusion NuGet package is installed.

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.2.8
```

2. Confirm that `_ViewImports.cshtml` contains the Syncfusion tag helper.

```html
@addTagHelper *, Syncfusion.EJ2
```

3. Confirm that `_Layout.cshtml` contains the Syncfusion script reference.

```html
https://cdn.syncfusion.com/ej2/33.2.8/dist/ej2.min.jsscript>
```

4. Confirm that `<ejs-scripts></ejs-scripts>` is placed near the end of the `<body>` section.

```html
<ejs-scripts></ejs-scripts>
```

5. Confirm that the CDN script version and NuGet package version are aligned.

Use the same version in both places:

```text
NuGet package: 33.2.8
CDN script:    33.2.8
```

6. Confirm that `Index.cshtml` uses the correct fully qualified model when `_ViewImports.cshtml` does not define an `@namespace`.

```html
@model CircularGaugeGettingStarted.Pages.IndexModel
```

7. Rebuild the application after package installation.

```bash
dotnet clean
dotnet build
dotnet run
```

If the component tag is displayed as plain HTML or is not recognized, verify `_ViewImports.cshtml` and rebuild the project.

If the page loads but the gauge does not initialize, verify that the Syncfusion script reference is loaded before `<ejs-scripts></ejs-scripts>` executes.

## Sample Project

Use the complete file structure below for a minimal working Razor Pages sample:

```text
CircularGaugeGettingStarted/
    Pages/
        _ViewImports.cshtml
        Index.cshtml
        Index.cshtml.cs
        Shared/
            _Layout.cshtml
```

Recommended implementation approach:

- Keep the Syncfusion script reference in `_Layout.cshtml`.
- Keep the Syncfusion script manager in `_Layout.cshtml`.
- Keep Syncfusion tag helper registration in `_ViewImports.cshtml`.
- Do not add `@namespace` in `_ViewImports.cshtml` for this sample.
- Use the fully qualified model name in `Index.cshtml`.
- Keep dynamic gauge values in `Index.cshtml.cs`.
- Keep the Circular Gauge markup in `Index.cshtml`.
- Keep the Syncfusion package version and CDN script version consistent.

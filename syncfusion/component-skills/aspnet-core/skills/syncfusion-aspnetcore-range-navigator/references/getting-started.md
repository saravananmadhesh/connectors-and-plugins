# Getting Started with RangeNavigator

## Table of Contents

- [Installation](#installation)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Create ASP.NET Core Application](#create-aspnet-core-application)
- [Tag Helper Registration](#tag-helper-registration)
- [Script References](#script-references)
- [Script Manager](#script-manager)
- [Basic Implementation](#basic-implementation)
- [Data Binding](#data-binding)
  - [Step 1: Prepare Data in Code-Behind](#step-1-prepare-data-in-code-behind)
  - [Step 2: Bind Data to RangeNavigator](#step-2-bind-data-to-rangenavigator)
- [Running the Application](#running-the-application)
- [Expected Result](#expected-result)
- [Troubleshooting](#troubleshooting)

## Installation

Install the Syncfusion ASP.NET Core NuGet package using the NuGet Package Manager.

**Via NuGet Package Manager UI:**
1. Open Visual Studio
2. Go to **Tools** → **NuGet Package Manager** → **Manage NuGet Packages for Solution**
3. Search for `Syncfusion.EJ2.AspNet.Core`
4. Click Install

**Via Package Manager Console:**
```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

**Alternative (using dotnet CLI):**
```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

**Note:** The package requires dependencies:
- **Newtonsoft.Json** - For JSON serialization
- **Syncfusion.Licensing** - For license key validation

These are automatically installed as NuGet package dependencies.

## Project Setup

### Prerequisites
Check [ASP.NET Core system requirements](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements) to ensure your environment is compatible.

### Create ASP.NET Core Application

**Option 1: Using Microsoft Templates**
- Follow the [official ASP.NET Core getting started guide](https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start)
- Create a Razor Pages project

**Option 2: Using Syncfusion Extension**
- Use the [Syncfusion ASP.NET Core Extension](https://ej2.syncfusion.com/aspnetcore/documentation/visual-studio-integration/create-project) for automatic project configuration

## Tag Helper Registration

Open the file `~/Pages/_ViewImports.cshtml` and add the Syncfusion tag helper import:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This registers all Syncfusion tag helpers (like `<ejs-rangenavigator>`) for use in your Razor pages and views.

## Script References

Add Syncfusion scripts to your layout file. Open `~/Pages/Shared/_Layout.cshtml` and add the script reference inside the `<head>` section:

```html
<head>
    ...
    <!-- Syncfusion EJ2 Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

**Alternative approaches:**

**Local NuGet package reference:**
```html
<script src="~/lib/syncfusion/ej2/dist/ej2.min.js"></script>
```

**Specific RangeNavigator library (if using modular bundle):**
```html
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2-rangenavigator.min.js"></script>
```

See the [Adding Script Reference](https://ej2.syncfusion.com/aspnetcore/documentation/common/adding-script-references) documentation for more options.

## Script Manager

Register the Syncfusion script manager at the end of the `<body>` section in `~/Pages/Shared/_Layout.cshtml`:

```html
<body>
    <!-- Your page content -->
    
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The script manager initializes all Syncfusion components on the page.

## Basic Implementation

Create a simple RangeNavigator in your Razor page (`~/Pages/Index.cshtml`):

```cshtml
<!-- Basic RangeNavigator tag helper -->
<ejs-rangenavigator id="rangeNavigator">
</ejs-rangenavigator>
```

This creates an empty RangeNavigator component. The next step is to add data and series configuration.

## Data Binding

### Step 1: Prepare Data in Code-Behind

Create a data model and populate it in your page model (`~/Pages/Index.cshtml.cs`):

```csharp
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    public List<RangeData> Data { get; set; }
    
    public void OnGet()
    {
        Data = GetChartData();
    }
    
    public List<RangeData> GetChartData()
    {
        return new List<RangeData>
        {
            new RangeData { x = new DateTime(2005, 1, 1), y = 21 },
            new RangeData { x = new DateTime(2005, 2, 1), y = 24 },
            new RangeData { x = new DateTime(2005, 3, 1), y = 36 },
            new RangeData { x = new DateTime(2005, 4, 1), y = 38 },
            new RangeData { x = new DateTime(2005, 5, 1), y = 54 },
            new RangeData { x = new DateTime(2005, 6, 1), y = 57 },
            new RangeData { x = new DateTime(2005, 7, 1), y = 70 }
        };
    }
}

public class RangeData
{
    public DateTime x { get; set; }
    public double y { get; set; }
}
```

### Step 2: Bind Data to RangeNavigator

In your Razor page, configure the RangeNavigator with data binding:

```cshtml
<ejs-rangenavigator id="rangeNavigator" 
    valueType="DateTime" 
    width="100%" 
    height="150px">
    
    <!-- Configure series collection -->
    <e-rangenavigator-rangenavigatorseriescollection>
        <e-rangenavigator-rangenavigatorseries 
            datasource="@Model.Data" 
            xName="x" 
            yName="y" 
            type="Area">
        </e-rangenavigator-rangenavigatorseries>
    </e-rangenavigator-rangenavigatorseriescollection>
    
</ejs-rangenavigator>
```

**Configuration breakdown:**
- `valueType="DateTime"` - Use DateTime scale (alternatives: "Double", "Logarithmic")
- `width="100%"` - Full width container
- `height="150px"` - Fixed height for the component
- `datasource="@Model.Data"` - Bind to your data list
- `xName="x"` - Property name for X-axis values (dates)
- `yName="y"` - Property name for Y-axis values (numeric)
- `type="Area"` - Series visualization type (alternatives: "Line", "StepLine")

## Running the Application

Press **Ctrl+F5** (Windows) or **Cmd+F5** (macOS) to run the application.

The RangeNavigator will render in your browser showing:
- **Area chart** displaying the data
- **Interactive thumbs** on the left and right edges for range selection
- **Draggable range slider** to select data ranges
- **Axis labels** showing date values

## Expected Result

You should see:
```
┌─────────────────────────────────────┐
│   RangeNavigator                    │
├─────────────────────────────────────┤
│        /‾‾\                  /‾‾\   │
│       /    \    Area Chart  /    \  │
│      /      \___________   /      \ │
│  ◄─────────────────────────────────►│  ← Draggable Thumbs
│  Jan      Feb    Mar    Apr   May   │
└─────────────────────────────────────┘
```

## Troubleshooting

**Issue:** Component not rendering
- **Solution:** Ensure `<ejs-scripts></ejs-scripts>` is added before closing `</body>` tag
- **Solution:** Verify `@addTagHelper *, Syncfusion.EJ2` in _ViewImports.cshtml

**Issue:** Data not displaying
- **Solution:** Verify `xName` and `yName` match your data model properties
- **Solution:** Check `valueType` matches your data type (DateTime for DateTime values)
- **Solution:** Ensure data is not null; populate in your page model's OnGet() method

**Issue:** Styles not applying
- **Solution:** Check CDN is accessible or local script reference is correct
- **Solution:** Verify no JavaScript console errors in browser developer tools

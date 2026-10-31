# Initialization & Basic Rendering

Create and render the Syncfusion Spreadsheet Editor component — the starting point for any spreadsheet integration.

> ⚠️ **IMPORTANT:** Before proceeding with any implementation, you must ensure that all required NuGet packages are installed in your project. Failure to install these packages will result in runtime errors and the Spreadsheet Editor component will not function. Follow the installation steps below to complete the setup.

## Installation

### Required NuGet Packages
The following packages **MUST** be installed for the Spreadsheet Editor to function correctly:

#### Package Details

| Package Name | Purpose |
|---|---|
| **Syncfusion.EJ2.MVC5** | ASP.NET MVC 5 wrappers for EJ2 controls |
| **Syncfusion.EJ2.Spreadsheet.AspNet.MVC5** | Spreadsheet control for ASP.NET MVC 5 |
| **Syncfusion.XlsIO.AspNet.Mvc5** | Excel file format support (XLS, XLSX) |
| **Syncfusion.Pdf.AspNet.Mvc5** | PDF export functionality |
| **Syncfusion.ExcelToPdfConverter.AspNet.Mvc5** | Convert Excel files to PDF format |
| **Syncfusion.ExcelChartToImageConverter.AspNet.Mvc5** | Convert Excel charts to image format |
| **Syncfusion.Licensing** | License management for Syncfusion components |

### Verify Installation

**CRITICAL:** After installation, you must verify that all required packages have been successfully added to your `packages.config` file. If any packages are missing, the Spreadsheet Editor will not work correctly.

Check your `packages.config` file (located in your project root) and confirm it contains all the following packages:

```xml
<package id="Syncfusion.EJ2.JavaScript" version="**.*.**" targetFramework="net481" />
<package id="Syncfusion.EJ2.MVC5" version="**.*.**" targetFramework="net481" />
<package id="Syncfusion.EJ2.Spreadsheet.AspNet.MVC5" version="**.*.**" targetFramework="net481" />
<package id="Syncfusion.ExcelChartToImageConverter.AspNet.Mvc5" version="**.*.**" targetFramework="net481" />
<package id="Syncfusion.ExcelToPdfConverter.AspNet.Mvc5" version="**.*.**" targetFramework="net481" />
<package id="Syncfusion.Licensing" version="**.*.**" targetFramework="net481" />
<package id="Syncfusion.Pdf.AspNet.Mvc5" version="**.*.**" targetFramework="net481" />
<package id="Syncfusion.XlsIO.AspNet.Mvc5" version="**.*.**" targetFramework="net481" />
```

**If packages are missing:**
- The Spreadsheet Editor component will not render
- You may encounter compile-time or runtime errors
- Feature functionality will be unavailable
- Refer to the installation methods above to complete the setup

**Version Information:**
- Replace `**.*.**` with your installed Syncfusion version number (e.g., `33.1.44`)
- All packages must be of the same version for compatibility
- Do not use unknown or invalid product versions

## Add namespace
Add `Syncfusion.EJ2` namespace reference in `Web.config` under `Views` folder.

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>

```

## Register Syncfusion Script Manager
Also, register the script manager `EJS().ScriptManager()` at the end of `<body>` in the `Layout.cshtml` file as follows.

```cshtml
<body>
...
    <!-- Syncfusion ASP.NET MVC Script Manager -->
    @Html.EJS().ScriptManager()
</body>

```

## Minimal Code

**Controller (`HomeController.cs`):**

```csharp
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Syncfusion.EJ2.Spreadsheet;

namespace YourApp.Controllers
{
    public class SpreadsheetController : Controller
    {
        public ActionResult Index()
        {
            List<object> data = new List<object>()
            {
                new { Product = "Laptop", Price = 1200, Quantity = 5, Total = "=B2*C2" },
                new { Product = "Mouse", Price = 25, Quantity = 20, Total = "=B3*C3" },
                new { Product = "Keyboard", Price = 80, Quantity = 10, Total = "=B4*C4" }
            };
            
            ViewBag.DefaultData = data;
            return View();
        }

        public ActionResult Open(OpenRequest openRequest)
        {
            return Content(Workbook.Open(openRequest));
        }
 
        public void Save(SaveSettings saveSettings)
        {
            if (saveSettings != null && saveSettings.JSONData != null)
            {
                Workbook.Save(saveSettings);
            }
        }
 
    }
}
```

**View (`Index.cshtml`):**

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet").OpenUrl("Open").SaveUrl("Save").Sheets(sheet =>
    {
        sheet.Name("Sheet1").Ranges(ranges =>
        {
            ranges.DataSource((IEnumerable<object>)ViewBag.DefaultData).Add();
        }).Add();
    }).Render()
```

**Important:** Ensure that the controller action methods (`Open` and `Save`) exist and are publicly accessible. They must be in the same controller or the full path must be specified in `OpenUrl` and `SaveUrl`.

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [FEATURE_FLAGS] | Disable features (only add if false) | allowEditing={false} |
| [SHEET_NAME] | Sheet name | 'Sheet1', 'Sales' |
| [DATA_SOURCE] | Initial data | [{Product: 'Laptop'}] |
| [START_CELL] | Data start | 'A1', 'A2' |
| [CONTAINER_ID] | HTML element ID | 'sample' |

## Cshtml Header Section (Layout.cshtml)

- Add the following Syncfusion style and script file references in the `<head>` section of your **Layout.cshtml** file. If the file already contains the below mentioned file references, do not duplicate them. 
- In below code, we have specified the Syncfusion version as **v33.1.44**. Replace this version number with your installed Syncfusion version if you are using a different release. Ensure the CDN version matches your installed NuGet package version exactly.

```cshtml
    <!-- Syncfusion ASP.NET MVC controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/tailwind3.css" />

    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>    
```

## Notes
- Include container div with height
- Container must exist before render to the DOM
- Ensure the CDN version matches your installed Syncfusion NuGet package version
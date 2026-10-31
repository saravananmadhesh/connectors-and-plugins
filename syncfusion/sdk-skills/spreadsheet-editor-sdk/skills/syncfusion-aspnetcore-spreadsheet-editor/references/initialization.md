# Initialization & Basic Rendering

Create and render the Syncfusion Spreadsheet Editor component — the starting point for any spreadsheet integration.

## Installation

Install the required Syncfusion NuGet packages using one of the following methods if the packages are not installed already:

**Method 1: Package Manager Console**

```bash

Install-Package Syncfusion.EJ2.AspNet.Core
Install-Package Syncfusion.EJ2.Spreadsheet.AspNet.Core

```

**Method 2: .NET CLI**

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
dotnet add package Syncfusion.EJ2.Spreadsheet.AspNet.Core
```

### Verify Installation
After installation, verify that the NuGet packages are added to your `.csproj` file:

```xml
<ItemGroup>
    <PackageReference Include="Syncfusion.EJ2.AspNet.Core" Version="xx.x.xx" />
    <PackageReference Include="Syncfusion.EJ2.Spreadsheet.AspNet.Core" Version="xx.x.xx" />
</ItemGroup>
```
**Important:** - If the above mentioned packages are already installed and available in the `.csproj` file, do not duplicate them.

## Minimal Code

**Controller (`HomeController.cs`):**

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Syncfusion.EJ2.Spreadsheet;

namespace YourApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
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

        public IActionResult Open(IFormCollection openRequest)
        {
            OpenRequest open = new OpenRequest();
            open.File = openRequest.Files[0];
            return Content(Workbook.Open(open));
        }
 
        public IActionResult Save(SaveSettings saveSettings)
        {
            if (saveSettings != null && saveSettings.JSONData != null)
            {
                return Workbook.Save(saveSettings);
            }
            return View();
        }
 
    }
}
```

**View (`Index.cshtml`):**

```cshtml

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" openUrl="Home/Open" saveUrl="Home/Save">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                    <e-spreadsheet-ranges>
                        <e-spreadsheet-range dataSource="ViewBag.DefaultData"></e-spreadsheet-range>
                    </e-spreadsheet-ranges>
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

```
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
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/tailwind3.css" />

    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>    
```

## Notes
- Include container div with height
- Container must exist before render to the DOM
- Ensure the CDN version matches your installed Syncfusion NuGet package version

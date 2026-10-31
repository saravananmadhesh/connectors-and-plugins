# Getting Started with ASP.NET MVC Sparkline

## Table of Contents
- [Prerequisites](#prerequisites)
- [Package Installation](#package-installation)
  - [Step 1: Open NuGet Package Manager](#step-1-open-nuget-package-manager)
  - [Step 2: Search and Install Syncfusion.EJ2.MVC5](#step-2-search-and-install-syncfusionej2mvc5)
  - [Important Note](#important-note)
- [Setup Configuration](#setup-configuration)
  - [Step 1: Add Namespace to Web.config](#step-1-add-namespace-to-webconfig)
  - [Step 2: Add Script References](#step-2-add-script-references)
  - [Step 3: Register ScriptManager](#step-3-register-scriptmanager)
- [Creating Your First Sparkline](#creating-your-first-sparkline)
  - [Step 1: Create Data Source](#step-1-create-data-source)
  - [Step 2: Add Sparkline to View](#step-2-add-sparkline-to-view)
  - [Step 3: Run Your Application](#step-3-run-your-application)
- [Data Binding](#data-binding)
  - [Understanding Data Binding Properties](#understanding-data-binding-properties)
  - [Example with Different Data Scenarios](#example-with-different-data-scenarios)
- [Verification](#verification)
  - [Verify Your Setup](#verify-your-setup)
  - [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## Prerequisites

Before implementing the Sparkline component, ensure your development environment meets these requirements:

- Visual Studio (any recent version)
- .NET Framework 4.6.1 or higher
- ASP.NET MVC 5 project
- Basic knowledge of C# and Razor syntax
- Administrator access for NuGet package installation

System requirements documentation is available on the Syncfusion website. Verify your target framework compatibility before proceeding.

## Package Installation

### Step 1: Open NuGet Package Manager

In Visual Studio:
1. Navigate to **Tools** → **NuGet Package Manager** → **Manage NuGet Packages for Solution**
2. Alternatively, right-click your project and select **Manage NuGet Packages**

### Step 2: Search and Install Syncfusion.EJ2.MVC5

1. Go to the **Browse** tab
2. Search for `Syncfusion.EJ2.MVC5`
3. Select the latest version
4. Click **Install**

Package Manager Console command:
```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version 20.0.0
```

Replace `20.0.0` with the current Syncfusion version you're using.

### Important Note

The Syncfusion.EJ2.MVC5 package has dependencies:
- **Newtonsoft.Json**: For JSON serialization
- **Syncfusion.Licensing**: For license key validation

These dependencies are automatically installed. Ensure you have an active Syncfusion license or trial license to avoid licensing warnings.

## Setup Configuration

### Step 1: Add Namespace to Web.config

Open the `Web.config` file in your `Views` folder and add the Syncfusion namespace:

```xml
<configuration>
  <system.web.webPages.razor>
    <host factoryType="System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=5.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" />
    <pages
      pageBaseType="System.Web.Mvc.WebViewPage">
      <namespaces>
        <add namespace="System.Web.Mvc" />
        <add namespace="System.Web.Mvc.Ajax" />
        <add namespace="System.Web.Mvc.Html" />
        <add namespace="System.Web.Routing" />
        <add namespace="Syncfusion.EJ2" />
      </namespaces>
    </pages>
  </system.web.webPages.razor>
</configuration>
```

### Step 2: Add Script References

In your `~/Shared/_Layout.cshtml` file, add the Syncfusion script in the `<head>` section:

```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title</title>
    
    <!-- Syncfusion EJ2 Script -->
    <script src="https://cdn.syncfusion.com/ej2/20.4.0/dist/ej2.min.js"></script>
</head>
```

Ensure you use the CDN URL that matches your installed Syncfusion version. You can also host scripts locally if your application requires offline functionality.

### Step 3: Register ScriptManager

At the end of the `<body>` section in `_Layout.cshtml`, register the Syncfusion ScriptManager:

```html
<body>
    @RenderBody()
    
    <!-- Syncfusion ScriptManager (must be at the end of body) -->
    @Html.EJS().ScriptManager()
</body>
```

The ScriptManager must be included exactly once per page layout to initialize Syncfusion components properly.

## Creating Your First Sparkline

### Step 1: Create Data Source

In your controller, prepare the data that the sparkline will visualize:

```csharp
// HomeController.cs
public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View(DataSource.GetData());
    }
}

public class DataSource
{
    public int x { get; set; }
    public string xval { get; set; }
    public double yval { get; set; }

    public static List<DataSource> GetData()
    {
        List<DataSource> data = new List<DataSource>();
        data.Add(new DataSource() { x = 0, xval = "2005", yval = 20090440 });
        data.Add(new DataSource() { x = 1, xval = "2006", yval = 20264080 });
        data.Add(new DataSource() { x = 2, xval = "2007", yval = 20434180 });
        data.Add(new DataSource() { x = 3, xval = "2008", yval = 21007310 });
        data.Add(new DataSource() { x = 4, xval = "2009", yval = 21262640 });
        data.Add(new DataSource() { x = 5, xval = "2010", yval = 21515750 });
        data.Add(new DataSource() { x = 6, xval = "2011", yval = 21766710 });
        data.Add(new DataSource() { x = 7, xval = "2012", yval = 22015580 });
        data.Add(new DataSource() { x = 8, xval = "2013", yval = 22262500 });
        data.Add(new DataSource() { x = 9, xval = "2014", yval = 22507620 });
        return data;
    }
}
```

### Step 2: Add Sparkline to View

In your view file (e.g., `~/Views/Home/Index.cshtml`), render the sparkline component:

```cshtml
<!-- Index.cshtml -->
@using Syncfusion.EJ2.Charts

@{
    ViewBag.Title = "Sparkline Getting Started";
}

<h2>Essential JS 2 for ASP.NET MVC Sparkline</h2>

@Html.EJS().Sparkline("spark")
    .XName("xval")
    .YName("yval")
    .Height("100")
    .Width("70")
    .DataSource(Model)
    .Render()
```

### Step 3: Run Your Application

Press `Ctrl+F5` (Windows) or `Cmd+F5` (macOS) to run the application. Navigate to the page containing your sparkline. You should see a small, compact line chart displaying your data.

## Data Binding

### Understanding Data Binding Properties

The sparkline component connects to data through three key properties:

**DataSource**: The array or list of objects containing your data
```csharp
.DataSource(Model)  // Pass your data collection
```

**XName**: The property name in your data model that represents X-axis values
```csharp
.XName("xval")  // Maps to the xval property in DataSource
```

**YName**: The property name in your data model that represents Y-axis values
```csharp
.YName("yval")  // Maps to the yval property in DataSource
```

### Example with Different Data Scenarios

**Scenario 1: Monthly Sales Data**
```csharp
public class SalesData
{
    public string Month { get; set; }  // e.g., "Jan", "Feb"
    public decimal Amount { get; set; }  // e.g., 1000.50
}

// In view:
@Html.EJS().Sparkline("salesChart")
    .XName("Month")
    .YName("Amount")
    .DataSource(salesDataList)
    .Render()
```

**Scenario 2: Temperature Trend Data**
```csharp
public class TemperatureData
{
    public int Day { get; set; }  // 1-31
    public double Temperature { get; set; }  // e.g., 72.5
}

// In view:
@Html.EJS().Sparkline("tempChart")
    .XName("Day")
    .YName("Temperature")
    .DataSource(temperatureList)
    .Render()
```

## Verification

### Verify Your Setup

To confirm everything is working correctly:

1. **Check for JavaScript Errors**: Open browser Developer Tools (F12) and check the Console tab for any errors
2. **Verify Component Rendering**: You should see a visible sparkline chart on your page
3. **Test Data Binding**: Confirm that the sparkline displays data from your data source
4. **Confirm Styling**: The sparkline should have appropriate sizing (width/height you specified)

### Troubleshooting

**Issue**: "Syncfusion namespace not recognized"
- **Solution**: Verify you added the namespace to `Web.config` in the Views folder

**Issue**: Sparkline not rendering
- **Solution**: Ensure ScriptManager is included in your layout at the end of the body tag

**Issue**: Data not displaying
- **Solution**: Check that XName and YName property names exactly match your data model properties (case-sensitive)

**Issue**: JavaScript errors in console
- **Solution**: Verify the CDN script URL matches your installed Syncfusion version

## Next Steps

After confirming your basic sparkline is working:

1. Choose a specific **sparkline type** (line, column, area, pie, or win-loss) based on your data
2. Add **markers** to highlight important data points
3. Enable **tooltips** for interactive data exploration
4. Customize the **appearance** to match your application design
5. Add **data labels** to display specific values
6. Configure **localization** if supporting multiple languages

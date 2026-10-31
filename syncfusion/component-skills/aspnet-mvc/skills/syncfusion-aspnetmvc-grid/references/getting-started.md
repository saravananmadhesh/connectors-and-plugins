# Getting Started with ASP.NET MVC Grid

Step-by-step setup to add the Syncfusion EJ2 Grid control to an ASP.NET MVC application.

## When to Use This

Use this reference when you need to:
- Install and configure the Syncfusion Grid component
- Set up NuGet packages and dependencies
- Add stylesheets and scripts to your application
- Initialize the grid with basic data binding
- Register license keys

## Table of Contents
- [Step 1: Install NuGet Package](#step-1-install-nuget-package)
- [Step 2: Add Namespace to Web.config](#step-2-add-namespace-to-webconfig)
- [Step 3: Add Stylesheet and Script in _Layout.cshtml](#step-3-add-stylesheet-and-script-in-_layoutcshtml)
- [Step 4: Register Script Manager](#step-4-register-script-manager)
- [Step 5: Add Grid to View](#step-5-add-grid-to-view)
- [Step 6: Bind Data in Controller](#step-6-bind-data-in-controller)
- [Step 7: Enable Common Features](#step-7-enable-common-features)
- [Column Properties Quick Reference](#column-properties-quick-reference)
- [License Key](#license-key)

## Step 1: Install NuGet Package

In Visual Studio, open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**, search for `Syncfusion.EJ2.MVC5` and install it.

Or via Package Manager Console:
```
Install-Package Syncfusion.EJ2.MVC5
```

Dependencies installed automatically:
- `Newtonsoft.Json` (JSON serialization)
- `Syncfusion.Licensing` (license validation)

## Step 2: Add Namespace to Web.config

Add the Syncfusion namespace in `Views\Web.config`:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

## Step 3: Add Stylesheet and Script in _Layout.cshtml

Add CDN links inside `<head>` of `~/Views/Shared/_Layout.cshtml`:

```cshtml
<head>
    <!-- Syncfusion ASP.NET MVC controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/29.1.33/fluent2.css" />
    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/29.1.33/dist/ej2.min.js"></script>
</head>
```

Available themes: `fluent2.css`, `bootstrap5.css`, `tailwind.css`, `material3.css`, `fabric.css`, `highcontrast.css`

## Step 4: Register Script Manager

At the end of `<body>` in `_Layout.cshtml`:

```cshtml
<body>
    @RenderBody()
    <!-- Syncfusion ASP.NET MVC Script Manager -->
    @Html.EJS().ScriptManager()
</body>
```

## Step 5: Add Grid to View

In `~/Views/Home/Index.cshtml`:

```cshtml
@using Syncfusion.EJ2

@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Columns(col =>
    {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true)
            .TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).Width("120").Add();
        col.Field("CustomerID").HeaderText("Customer Name").Width("150").Add();
        col.Field("Freight").HeaderText("Freight")
            .Format("C2").TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).Width("120").Add();
        col.Field("OrderDate").HeaderText("Order Date")
            .Format("yMd").TextAlign(Syncfusion.EJ2.Grids.TextAlign.Right).Width("130").Add();
    })
    .Render()
```

## Step 6: Bind Data in Controller

In `HomeController.cs`:

```csharp
public ActionResult Index()
{
    ViewBag.DataSource = OrdersDetails.GetAllRecords();
    return View();
}
```

Sample model:

```csharp
public class OrdersDetails
{
    public int? OrderID { get; set; }
    public string CustomerID { get; set; }
    public double? Freight { get; set; }
    public DateTime OrderDate { get; set; }
    public string ShipCity { get; set; }
    public string ShipCountry { get; set; }

    public static List<OrdersDetails> GetAllRecords()
    {
        return new List<OrdersDetails>
        {
            new OrdersDetails { OrderID = 10248, CustomerID = "VINET", Freight = 32.38, OrderDate = new DateTime(1996,7,4), ShipCity = "Reims", ShipCountry = "France" },
            new OrdersDetails { OrderID = 10249, CustomerID = "TOMSP", Freight = 11.61, OrderDate = new DateTime(1996,7,5), ShipCity = "Münster", ShipCountry = "Germany" },
            new OrdersDetails { OrderID = 10250, CustomerID = "HANAR", Freight = 65.83, OrderDate = new DateTime(1996,7,8), ShipCity = "Rio de Janeiro", ShipCountry = "Brazil" },
        };
    }
}
```

## Step 7: Enable Common Features

Add these to the grid helper for common features:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowPaging(true)
    .PageSettings(page => page.PageSize(10))
    .AllowSorting(true)
    .AllowFiltering(true)
    .AllowGrouping(true)
    .Toolbar(new List<string> { "Search" })
    .Columns(col =>
    {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("120").Add();
        col.Field("CustomerID").HeaderText("Customer Name").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
        col.Field("OrderDate").HeaderText("Order Date").Format("yMd").Width("130").Add();
    })
    .Render()
```

## Column Properties Quick Reference

| Property | Description |
|----------|-------------|
| `Field("fieldName")` | Maps to data object property |
| `HeaderText("text")` | Column header label |
| `Width("px")` | Column width |
| `Format("C2")` | Number/date format |
| `TextAlign(TextAlign.Right)` | Cell alignment |
| `IsPrimaryKey(true)` | Mark as primary key |
| `AllowEditing(false)` | Disable editing for column |

## License Key

Register your Syncfusion license key before rendering controls:

```javascript
// In _Layout.cshtml or a global JS file
ej.base.registerLicense('YOUR_LICENSE_KEY_HERE');
```

Or in `Global.asax.cs`:

```csharp
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY_HERE");
```

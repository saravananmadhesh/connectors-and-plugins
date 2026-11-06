# Getting Started with ASP.NET Core QueryBuilder

This guide covers installing, configuring, and rendering your first Syncfusion QueryBuilder component in an ASP.NET Core application using TagHelpers.

## Prerequisites

- ASP.NET Core application (Razor Pages or MVC)
- Visual Studio 2019 or later
- [System requirements for ASP.NET Core controls](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

## Step 1: Install the NuGet Package

Open the NuGet Package Manager (Tools → NuGet Package Manager → Manage NuGet Packages for Solution) and install:

```
Syncfusion.EJ2.AspNet.Core
```

Or via Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

> The package depends on **Newtonsoft.Json** for serialization and **Syncfusion.Licensing** for license validation.

## Step 2: Register the TagHelper

Open `~/Pages/_ViewImports.cshtml` and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

## Step 3: Add Stylesheet and Script References

In `~/Pages/Shared/_Layout.cshtml`, reference the theme CSS and script inside `<head>`:

```cshtml
<head>
    <!-- Syncfusion ASP.NET Core controls styles (choose your theme) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

Available themes: `fluent.css`, `material.css`, `bootstrap5.css`, `tailwind.css`, `highcontrast.css`.

## Step 4: Register Script Manager

At the end of `<body>` in `_Layout.cshtml`:

```cshtml
<body>
    ...
    <ejs-scripts></ejs-scripts>
</body>
```

## Step 5: Add QueryBuilder to Your Page

In `~/Pages/Index.cshtml`:

```cshtml
<ejs-querybuilder id="querybuilder" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="EmployeeID" label="Employee ID" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="LastName" label="Last Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Title" label="Title" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="HireDate" label="Hire Date" type="date" format="dd/MM/yyyy"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

## Render with an Initial Rule

Pass a structured rule by creating a `QueryBuilderRule` C# object and assigning it to the `rule` attribute:

```cshtml
@using Syncfusion.EJ2.QueryBuilder
@{
    QueryBuilderRule rule = new QueryBuilderRule()
    {
        Condition = "and",
        Rules = new List<QueryBuilderRule>()
        {
            new QueryBuilderRule { Label = "First Name", Field = "FirstName", Type = "string", Operator = "startswith", Value = "Nancy" },
            new QueryBuilderRule { Label = "Country", Field = "Country", Type = "string", Operator = "equal", Value = "USA" }
        }
    };
    var dataSource = EmployeeView.GetAllRecords();
}
<ejs-querybuilder id="querybuilder" width="70%" rule="rule" dataSource="dataSource">
    <e-querybuilder-columns>
        <e-querybuilder-column field="EmployeeID" label="Employee ID" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

## Binding a DataSource

You can pass a local C# collection so QueryBuilder can auto-generate columns:

**Index.cshtml.cs / Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.Employees = EmployeeView.GetAllRecords();
    return View();
}
```

**Index.cshtml:**
```cshtml
<ejs-querybuilder id="querybuilder" dataSource="@ViewBag.Employees" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

## Sample Model Class

```csharp
public class EmployeeView
{
    public int EmployeeID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Title { get; set; }
    public DateTime BirthDate { get; set; }
    public DateTime HireDate { get; set; }
    public int ReportsTo { get; set; }
    public string Address { get; set; }
    public string PostalCode { get; set; }
    public string Phone { get; set; }
    public string City { get; set; }
    public string Country { get; set; }

    public static List<EmployeeView> GetAllRecords()
    {
        return new List<EmployeeView>
        {
            new EmployeeView { EmployeeID = 1, FirstName = "Nancy", LastName = "Davolio",
                Title = "Sales Representative", HireDate = new DateTime(1992, 5, 1),
                Country = "USA", City = "Seattle" },
            new EmployeeView { EmployeeID = 2, FirstName = "Andrew", LastName = "Fuller",
                Title = "Vice President, Sales", HireDate = new DateTime(1992, 8, 14),
                Country = "USA", City = "Tacoma" },
            new EmployeeView { EmployeeID = 3, FirstName = "Janet", LastName = "Leverling",
                Title = "Sales Representative", HireDate = new DateTime(1992, 4, 1),
                Country = "USA", City = "Redmond" }
        };
    }
}
```

## See Also

- [Column Configuration](querybuilder-columns.md) — Define field types, operators, validation
- [Data Binding](querybuilder-data-binding.md) — Local and remote data sources
- [Import & Export](querybuilder-import-export.md) — Work with JSON/SQL/MongoDB rules

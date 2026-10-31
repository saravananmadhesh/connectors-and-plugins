# Getting Started with MultiColumn ComboBox

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup TagHelpers](#setup-taghelpers)
- [Add Styles and Scripts](#add-styles-and-scripts)
- [Register Script Manager](#register-script-manager)
- [Basic Component Setup](#basic-component-setup)
- [Binding Data with Fields and Columns](#binding-data-with-fields-and-columns)
- [Configuring Popup Size](#configuring-popup-size)
- [Running the Application](#running-the-application)

---

## Prerequisites

- ASP.NET Core 6.0+ project (Razor Pages or MVC)
- Visual Studio 2022+ or VS Code

System requirements: https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements

---

## Installation

Install the NuGet package via Package Manager Console:

```bash
Install-Package Syncfusion.EJ2.AspNet.Core
```

Or via .NET CLI:

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

---

## Setup TagHelpers

Open `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/_ViewImports.cshtml` (MVC) and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Styles and Scripts (Local Hosting Recommended)

**⚠️ SECURITY:** For production, host vendor scripts locally from the NuGet package instead of using CDN to mitigate supply chain risks (W012).

### Option A: Local Hosting (RECOMMENDED) ✅

In `~/Pages/Shared/_Layout.cshtml` (or `~/Views/Shared/_Layout.cshtml`), add inside `<head>`:

```html
<head>
    <!-- ✅ Serve from local NuGet package (safest) -->
    <link rel="stylesheet" href="~/lib/ej2/fluent2.css" />
</head>
```

### Option B: CDN with Subresource Integrity (SRI) ⚠️

If CDN is mandatory, use SRI hashes + HTTPS:

```html
<head>
    <!-- ⚠️ Pin version and add SRI hash for integrity verification -->
    <link rel="stylesheet" 
          href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent2.css"
          integrity="sha384-[GET_ACTUAL_HASH_FROM_CDN]"
          crossorigin="anonymous" />
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"
            integrity="sha384-[GET_ACTUAL_HASH_FROM_CDN]"
            crossorigin="anonymous"></script>
</head>
```

**Get SRI hashes from:** https://www.srihash.org/ or Syncfusion CDN documentation.

> **Tip:** Replace `21.1.37` with your installed package version. Check current version at nuget.org.

---

## Register Script Manager

At the end of `<body>` in `_Layout.cshtml`, register the script manager:

```html
<body>
    @RenderBody()
    <!-- Required: Syncfusion script manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Basic Component Setup

The minimum required setup: `dataSource`, `fields`, and at least one `<e-column>`.

**Controller (`HomeController.cs`):**

```csharp
public class Employee
{
    public int EmpID { get; set; }
    public string Name { get; set; }
    public string Designation { get; set; }
    public string Country { get; set; }
}

public IActionResult Index()
{
    ViewBag.empData = new List<Employee>
    {
        new Employee { EmpID = 1001, Name = "Andrew Fuller", Designation = "Team Lead", Country = "England" },
        new Employee { EmpID = 1002, Name = "Robert", Designation = "Developer", Country = "USA" },
        new Employee { EmpID = 1003, Name = "Michael", Designation = "HR", Country = "Russia" }
    };
    return View();
}
```

**View (`Index.cshtml`):**

```cshtml
<ejs-multicolumncombobox id="multicolumn"
    dataSource="@ViewBag.empData"
    placeholder="Select an employee">
    <e-multicolumncombobox-fields text="Name" value="EmpID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmpID" header="Employee ID" width="120"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Name" header="Name" width="120"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Country" header="Country" width="100"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

---

## Binding Data with Fields and Columns

### Fields Property

The `fields` property maps your data:

- `text` — The field shown in the input box after selection
- `value` — The hidden value bound to the component

```cshtml
<e-multicolumn-combobox-fields 
    text="Name" 
    value="EmpID">
</e-multicolumn-combobox-fields>
```

### Columns Definition

Each `<e-multicolumncombobox-column>` renders one column in the popup grid:

```cshtml
<e-multicolumncombobox-columns>
    <e-multicolumncombobox-column field="EmpID" header="Employee ID" width="90"></e-multicolumncombobox-column>
    <e-multicolumncombobox-column field="Name" header="Name" width="90"></e-multicolumncombobox-column>
    <e-multicolumncombobox-column field="Designation" header="Designation" width="90"></e-multicolumncombobox-column>
    <e-multicolumncombobox-column field="Country" header="Country" width="70"></e-multicolumncombobox-column>
</e-multicolumncombobox-columns>
```

| Property | Description |
|----------|-------------|
| `field` | Maps to data property (must match your object keys) |
| `header` | Column header text |
| `width` | Column width in pixels |

---

## Configuring Popup Size

### Default Popup Behavior

The popup defaults to `300px` height and matches the component width. Customize with `popupHeight` and `popupWidth`:

**View:**

```cshtml
<ejs-multicolumncombobox id="multicolumn"
    dataSource="@ViewBag.empData"
    popupHeight="250px"
    popupWidth="500px"
    placeholder="Select an employee">
    <e-multicolumncombobox-fields text="Name" value="EmpID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmpID" header="Employee ID" width="90"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Name" header="Name" width="90"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="90"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Country" header="Country" width="70"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

Both properties accept `string` (e.g., `'250px'`) or `number` (e.g., `250`).

### Column Width Adjustment

Ensure total column width fits in popup width:

```cshtml
<e-multicolumncombobox-columns>
    <e-multicolumncombobox-column field="EmpID" header="ID" width="80"></e-multicolumncombobox-column>
    <e-multicolumncombobox-column field="Name" header="Name" width="120"></e-multicolumncombobox-column>
    <e-multicolumncombobox-column field="Designation" header="Designation" width="120"></e-multicolumncombobox-column>
    <e-multicolumncombobox-column field="Country" header="Country" width="100"></e-multicolumncombobox-column>
    <!-- Total: 420px -->
</e-multicolumncombobox-columns>
```

---

## Running the Application

Start the development server:

**Using .NET CLI:**

```bash
dotnet run
```

**Using Visual Studio:**
- Press F5 or click "Start Debugging"
- Navigate to the view containing the MultiColumn ComboBox

---

## First Implementation Checklist

- [ ] NuGet package installed: `Syncfusion.EJ2.AspNet.Core`
- [ ] TagHelper added to `_ViewImports.cshtml`: `@addTagHelper *, Syncfusion.EJ2`
- [ ] MultiColumn ComboBox added to view with `<ejs-multicolumn-combobox>`
- [ ] dataSource populated with data via controller `ViewBag`
- [ ] `<e-multicolumn-combobox-fields>` configured with `text` and `value`
- [ ] At least one `<e-column>` defined
- [ ] placeholder text added for UX
- [ ] popupHeight and popupWidth configured appropriately
- [ ] Application runs and component renders properly

---

## Next Steps

- **Binding complex data?** → Go to [data-binding.md](multicolumn-combobox-data-binding.md)
- **Want advanced features?** → See [advanced-features.md](multicolumn-combobox-advanced-features.md)
- **Need filtering?** → Check [filtering.md](multicolumn-combobox-filtering.md)
- **Want custom templates?** → Explore [templates.md](multicolumn-combobox-templates.md)

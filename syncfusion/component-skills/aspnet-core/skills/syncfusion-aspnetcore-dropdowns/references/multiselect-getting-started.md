# Getting Started with ASP.NET Core MultiSelect

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup TagHelpers](#setup-taghelpers)
- [Add Styles and Scripts](#add-styles-and-scripts)
- [Register Script Manager](#register-script-manager)
- [Basic MultiSelect](#basic-multiselect)
- [Binding Data Source](#binding-data-source)
- [Configure Popup Size](#configure-popup-size)
- [Form Integration with MultiSelectFor](#form-integration-with-multiselectfor)
- [Data Annotations Validation](#data-annotations-validation)

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

## Basic MultiSelect

Minimal MultiSelect with a string array data source:

```cshtml
@* ~/Pages/Index.cshtml *@

@{
    var countries = new string[] { "Australia", "Brazil", "Canada", "Denmark", "France", "Germany" };
}

<ejs-multiselect id="countries"
    dataSource="@countries"
    placeholder="Select countries">
</ejs-multiselect>
```

---

## Binding Data Source

### Array of Objects

Pass complex data and map fields using `<e-multiselect-fields>`:

**Controller / PageModel:**
```csharp
// HomeController.cs or Index.cshtml.cs
public IActionResult Index()
{
    ViewBag.Games = new List<GameData>
    {
        new GameData { Id = 1, Game = "Football" },
        new GameData { Id = 2, Game = "Basketball" },
        new GameData { Id = 3, Game = "Cricket" },
        new GameData { Id = 4, Game = "Hockey" },
        new GameData { Id = 5, Game = "Tennis" }
    };
    return View();
}

public class GameData
{
    public int Id { get; set; }
    public string Game { get; set; }
}
```

**View:**
```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    mode="Box">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

### Preselecting Values

Use the `value` property to set initial selections:

```cshtml
@{
    var preSelected = new int[] { 1, 3 };
}

<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    value="@preSelected"
    placeholder="Select games">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

---

## Configure Popup Size

Control popup height and width independently:

```cshtml
<ejs-multiselect id="countries"
    dataSource="@countries"
    placeholder="Select countries"
    popupHeight="200px"
    popupWidth="300px">
</ejs-multiselect>
```

Defaults: `popupHeight="300px"`, `popupWidth="100%"` (matches input width).

---

## Form Integration with MultiSelectFor

Use `ejs-multiselect-for` to bind to a model property in forms:

**Model:**
```csharp
public class FormModel
{
    [Required(ErrorMessage = "Please select at least one game")]
    public int[] SelectedGames { get; set; }
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.Games = GetGames();
    return View(new FormModel());
}

[HttpPost]
public IActionResult Submit(FormModel model)
{
    if (ModelState.IsValid)
    {
        // model.SelectedGames contains the selected IDs
    }
    ViewBag.Games = GetGames();
    return View("Index", model);
}
```

**View:**
```cshtml
@model FormModel

<form asp-action="Submit" method="post">
    <ejs-multiselect-for id="selectedGames"
        for="SelectedGames"
        dataSource="@ViewBag.Games"
        placeholder="Select games">
        <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
    </ejs-multiselect-for>
    <span asp-validation-for="SelectedGames" class="text-danger"></span>
    <button type="submit">Submit</button>
</form>
```

> The `for` attribute binds to the model property. Selected values are posted back as an array.

---

## Data Annotations Validation

Use Data Annotations on the model for automatic validation:

**Model:**
```csharp
using System.ComponentModel.DataAnnotations;

public class ProjectModel
{
    [Required]
    public string ProjectName { get; set; }

    [Required(ErrorMessage = "Select at least one team member")]
    public string[] AssignedTo { get; set; }
}
```

**View:**
```cshtml
@model ProjectModel

<form asp-action="Create" method="post">
    <ejs-multiselect-for id="assignedTo"
        for="AssignedTo"
        dataSource="@ViewBag.TeamMembers"
        placeholder="Assign team members">
        <e-multiselect-fields text="Name" value="Id"></e-multiselect-fields>
    </ejs-multiselect-for>
    <span asp-validation-for="AssignedTo" class="text-danger"></span>
    <button type="submit">Create</button>
</form>
```

---

## See Also

- [Data Binding](data-binding.md) — Local arrays, remote APIs, complex data
- [Checkbox & Selection Modes](checkbox-and-selection.md) — Checkbox mode, Select All
- [API Reference](api.md) — Full property and event listing

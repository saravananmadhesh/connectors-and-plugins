# DateRangePicker — Getting Started

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Render DateRangePicker](#render-daterangepicker)
- [Setting Start and End Date](#setting-start-and-end-date)
- [DateRangePickerFor Model Binding](#daterangepickerfor-model-binding)

---

## Prerequisites

- ASP.NET Core 6.0 or later
- Visual Studio 2022+ or VS Code
- [Syncfusion.EJ2.AspNet.Core](https://www.nuget.org/packages/Syncfusion.EJ2.AspNet.Core/) NuGet package

---

## Installation

Open the NuGet Package Manager (Tools → NuGet Package Manager → Manage NuGet Packages for Solution), search for `Syncfusion.EJ2.AspNet.Core`, and install it. Alternatively, use the Package Manager Console:

```
Install-Package Syncfusion.EJ2.AspNet.Core
```

---

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Stylesheet and Script

In `~/Pages/Shared/_Layout.cshtml`, inside `<head>`:

```html
<head>
    <!-- Syncfusion ASP.NET Core styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
    <!-- Syncfusion ASP.NET Core scripts -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
</head>
```

---

## Register Script Manager

At the end of `<body>` in `~/Pages/Shared/_Layout.cshtml`:

```html
<body>
    ...
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Render DateRangePicker

Minimal DateRangePicker in `~/Pages/Index.cshtml`:

```cshtml
<ejs-daterangepicker id="daterangepicker"></ejs-daterangepicker>
```

DateRangePicker with a placeholder:

```cshtml
<ejs-daterangepicker id="daterangepicker" placeholder="Select a Range"></ejs-daterangepicker>
```

---

## Setting Start and End Date

Use `startDate` and `endDate` to pre-select a date range when the component renders.

**Controller (DateRangePickerController.cs):**

```csharp
public ActionResult Index()
{
    ViewBag.startDate = new DateTime(2022, 11, 09);
    ViewBag.endDate   = new DateTime(2022, 11, 21);
    return View();
}
```

**View (Index.cshtml):**

```cshtml
@{
    var startDate = new DateTime(2022, 11, 09);
    var endDate   = new DateTime(2022, 11, 21);
}
<ejs-daterangepicker id="daterangepicker"
    startDate="startDate"
    endDate="endDate">
</ejs-daterangepicker>
```

Or using `ViewBag`:

```cshtml
<ejs-daterangepicker id="daterangepicker"
    startDate="@ViewBag.startDate"
    endDate="@ViewBag.endDate">
</ejs-daterangepicker>
```

---

## DateRangePickerFor Model Binding

Use `ejs-for` to bind a `DateTime?[]` model property. The array holds `[startDate, endDate]`.

**Model:**

```csharp
using System.ComponentModel.DataAnnotations;

public class DateRangeModel
{
    [Required(ErrorMessage = "Please select a date range")]
    public DateTime?[] value { get; set; }
}
```

**Controller:**

```csharp
public ActionResult Index()
{
    var model = new DateRangeModel
    {
        value = new DateTime?[]
        {
            new DateTime(2020, 03, 03),
            new DateTime(2021, 09, 03)
        }
    };
    return View(model);
}

[HttpPost]
public ActionResult Index(DateRangeModel model)
{
    var startDate = model.value[0];
    var endDate   = model.value[1];
    // process range...
    return View(model);
}
```

**View (Index.cshtml):**

```cshtml
@model DateRangeModel

<form method="post">
    <ejs-daterangepicker id="daterangepickerFor" ejs-for="@Model.value">
    </ejs-daterangepicker>
    <span asp-validation-for="value"></span>
    <ejs-button id="submitButton" content="Submit"></ejs-button>
</form>
```

> **Note:** The `value` property posts as a `DateTime?[]` with index 0 = start date, index 1 = end date.

# DatePicker — Getting Started

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Render DatePicker](#render-datepicker)
- [Setting Value, Min, and Max](#setting-value-min-and-max)
- [DatePickerFor Model Binding](#datepickerfor-model-binding)

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

## Render DatePicker

Minimal DatePicker in `~/Pages/Index.cshtml`:

```cshtml
<ejs-datepicker id="datepicker"></ejs-datepicker>
```

DatePicker with a placeholder:

```cshtml
<ejs-datepicker id="datepicker" placeholder="Select a date"></ejs-datepicker>
```

---

## Setting Value, Min, and Max

Use `value`, `min`, and `max` to pre-select and restrict the date selection range.

**Razor Page (Index.cshtml.cs):**

```csharp
public class IndexModel : PageModel
{
    public DateTime Value { get; set; }
    public DateTime Min { get; set; }
    public DateTime Max { get; set; }

    public void OnGet()
    {
        Value = new DateTime(2025, 5, 15);
        Min   = new DateTime(2025, 5, 5);
        Max   = new DateTime(2025, 5, 27);
    }
}
```

**View (Index.cshtml):**

```cshtml
<ejs-datepicker id="datepicker"
    value="@Model.Value"
    min="@Model.Min"
    max="@Model.Max"
    placeholder="Select a date">
</ejs-datepicker>
```

- Dates before `min` and after `max` are disabled in the calendar popup.
- If the initial `value` is out of range, the model value is set to `out of range` and an error class is applied (unless `strictMode="true"` clamps it).

---

## DatePickerFor Model Binding

Use `<ejs-datepickerfor>` for strongly-typed model binding and form POST.

**Model:**

```csharp
public class AppointmentModel
{
    public DateTime? AppointmentDate { get; set; }
}
```

**Controller / Page:**

```csharp
public IActionResult OnGet()
{
    ViewBag.Model = new AppointmentModel
    {
        AppointmentDate = new DateTime(2025, 6, 10)
    };
    return Page();
}

public IActionResult OnPost(AppointmentModel model)
{
    // model.AppointmentDate contains the posted date value
    return Page();
}
```

**View:**

```cshtml
@model AppointmentModel

<form method="post">
    <ejs-datepickerfor id="datepickerfor"
        for="@Model.AppointmentDate"
        placeholder="Select appointment date">
    </ejs-datepickerfor>
    <button type="submit">Submit</button>
</form>
```

The selected date value is automatically posted back to the controller via the model property name.

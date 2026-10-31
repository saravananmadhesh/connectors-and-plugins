# Getting Started – ASP.NET Core TimePicker

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup Tag Helper](#setup-tag-helper)
- [Add Styles and Scripts](#add-styles-and-scripts)
- [Register Script Manager](#register-script-manager)
- [Render Basic TimePicker](#render-basic-timepicker)
- [Setting Value, Min, and Max](#setting-value-min-and-max)
- [Setting Time Format and Step](#setting-time-format-and-step)
- [TimePickerFor Model Binding](#timepickerfor-model-binding)

---

## Prerequisites

- ASP.NET Core web application (Razor Pages or MVC)
- Visual Studio or compatible IDE
- [System requirements for ASP.NET Core controls](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

---

## Installation

Install the NuGet package via Visual Studio (Tools → NuGet Package Manager) or Package Manager Console:

```
Install-Package Syncfusion.EJ2.AspNet.Core
```

> The `Syncfusion.EJ2.AspNet.Core` package includes dependencies on `Newtonsoft.Json` and `Syncfusion.Licensing`.

---

## Setup Tag Helper

Open `~/Pages/_ViewImports.cshtml` and register the Syncfusion EJ2 Tag Helper:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Styles and Scripts

Reference theme CSS and the EJ2 bundle script inside the `<head>` of `~/Pages/Shared/_Layout.cshtml`:

```html
<head>
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
</head>
```

> Available themes include `fluent.css`, `bootstrap5.css`, `material.css`, `tailwind.css`, and more.

---

## Register Script Manager

Add the `<ejs-scripts>` tag at the end of the `<body>` in `~/Pages/Shared/_Layout.cshtml`:

```html
<body>
    ...
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Render Basic TimePicker

Add the TimePicker tag helper to your Razor page (`~/Pages/Index.cshtml`):

```cshtml
<ejs-timepicker id="timepicker"></ejs-timepicker>
```

This renders a default TimePicker with 30-minute intervals in the system locale.

---

## Setting Value, Min, and Max

Use the `Value`, `Min`, and `Max` properties to pre-select a time and restrict the selectable range.

**Controller (HomeController.cs):**
```csharp
public ActionResult Index()
{
    ViewBag.minVal = new DateTime(2022, 05, 07, 1, 00, 00);
    ViewBag.maxVal = new DateTime(2022, 05, 07, 11, 00, 00);
    ViewBag.value  = new DateTime(2022, 05, 07, 4, 00, 00);
    return View();
}
```

**View (Index.cshtml):**
```cshtml
@{
    var minVal = new DateTime(2022, 05, 07, 1, 00, 00);
    var maxVal = new DateTime(2022, 05, 07, 11, 00, 00);
    var value  = new DateTime(2022, 05, 07, 4, 00, 00);
}
<ejs-timepicker id="timepicker" value="value" min="minVal" max="maxVal"></ejs-timepicker>
```

> If `Min` or `Max` is changed programmatically (code-behind), always update `Value` to ensure it falls within the new range.

---

## Setting Time Format and Step

Use `Format` to customize the time display string and `Step` to control the popup interval (in minutes).

```cshtml
@{
    var value = new DateTime(2022, 05, 07, 4, 00, 00);
}
<ejs-timepicker id="timepicker" format="HH:mm" step="60" value="value"></ejs-timepicker>
```

- `format="HH:mm"` — 24-hour format
- `step="60"` — 60-minute intervals in the popup list
- Default format is culture-based (e.g., `h:mm tt` for `en-US`)

Common format tokens:

| Token | Meaning |
|-------|---------|
| `HH`  | 24-hour hours (00–23) |
| `hh`  | 12-hour hours (01–12) |
| `mm`  | Minutes (00–59) |
| `ss`  | Seconds (00–59) |
| `tt`  | AM/PM meridian |

---

## TimePickerFor Model Binding

Use `ejs-timepicker` with `ejs-for` to bind to a model property and retrieve the value on form POST.

**Model:**
```csharp
namespace EJ2CoreSampleBrowser.Controllers
{
    public class TimePicker
    {
        public DateTime? value { get; set; }
    }
}
```

**Controller:**
```csharp
public ActionResult Index()
{
    return View(new TimePicker());
}

[HttpPost]
public ActionResult Index(TimePicker model)
{
    // model.value contains the submitted time
    return View(model);
}
```

**View:**
```cshtml
@model EJ2CoreSampleBrowser.Controllers.TimePicker
<form method="post">
    <ejs-timepicker id="timepickerFor" ejs-for="@Model.value"></ejs-timepicker>
    <div id="errorMessage">
        <span asp-validation-for="value"></span>
    </div>
    <div id="submitbutton">
        <ejs-button id="submitButton" content="Submit"></ejs-button>
    </div>
</form>
```

The selected time value is submitted with the form and accessible via `model.value` in the POST action.

# DateTimePicker – Getting Started

## Overview

The **DateTimePicker** is a graphical user interface control that allows users to select both a date and time value from a popup calendar/time list, or type directly into the input field. It renders using `<ejs-datetimepicker>` tag helper in ASP.NET Core.

---

## 1. Install NuGet Package

In Visual Studio: **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**, search for `Syncfusion.EJ2.AspNet.Core`, and install.

Or via Package Manager Console:
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

---

## 2. Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add:
```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## 3. Add Stylesheet and Script References

In `~/Pages/Shared/_Layout.cshtml`, add inside `<head>`:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

Add Script Manager at end of `<body>`:
```html
<ejs-scripts></ejs-scripts>
```

---

## 4. Render the DateTimePicker

Basic rendering in `~/Pages/Index.cshtml`:
```cshtml
<ejs-datetimepicker id="datetimepicker"></ejs-datetimepicker>
```

---

## 5. Setting Value, Min, and Max

Use `value`, `min`, and `max` properties to pre-select a date-time and restrict the selectable range:

```cshtml
@{
    var minVal = new DateTime(2019, 5, 5, 2, 0, 0);
    var maxVal = new DateTime(2019, 5, 25, 2, 0, 0);
    var value  = new DateTime(2019, 5, 10, 10, 0, 0);
}
<ejs-datetimepicker id="datetimepicker"
    value="value"
    min="minVal"
    max="maxVal">
</ejs-datetimepicker>
```

---

## 6. Setting Placeholder

Use the `placeholder` property to display hint text in the input:
```cshtml
<ejs-datetimepicker id="datetimepicker"
    placeholder="Select a date and time">
</ejs-datetimepicker>
```

---

## 7. DateTimePickerFor (Model Binding)

Use `<ejs-datetimepicker for="...">` to bind a model property for form POST:

**Model (`AppointmentModel.cs`):**
```csharp
public class AppointmentModel
{
    public DateTime AppointmentTime { get; set; }
}
```

**View (`Index.cshtml`):**
```cshtml
@model AppointmentModel
<form asp-action="Submit" method="post">
    <ejs-datetimepicker id="datetimepicker" for="AppointmentTime"></ejs-datetimepicker>
    <button type="submit">Submit</button>
</form>
```

**Controller:**
```csharp
[HttpPost]
public IActionResult Submit(AppointmentModel model)
{
    // model.AppointmentTime contains the selected datetime
    return View(model);
}
```

---

## 8. Open Popup on Input Focus

By default, the popup opens on icon click. To open on input focus:
```cshtml
<ejs-datetimepicker id="datetimepicker" openOnFocus="true"></ejs-datetimepicker>
```

---

## 9. Readonly State

Prevent user input while still displaying the value:
```cshtml
<ejs-datetimepicker id="datetimepicker"
    value="@DateTime.Now"
    readonly="true">
</ejs-datetimepicker>
```

---

## Key Properties Quick Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | `object` | `null` | Selected date-time value |
| `min` | `object` | `null` | Minimum selectable date-time |
| `max` | `object` | `null` | Maximum selectable date-time |
| `placeholder` | `string` | `null` | Hint text in input |
| `enabled` | `bool` | `true` | Enable/disable the component |
| `readonly` | `bool` | `false` | Read-only state |
| `openOnFocus` | `bool` | `false` | Open popup on input focus |
| `showClearButton` | `bool` | `true` | Show/hide clear icon |
| `showTodayButton` | `bool` | `true` | Show/hide today button |
| `step` | `double` | `30` | Time interval (minutes) in popup |
| `width` | `string` | `null` | Component width |
| `zIndex` | `int` | `1000` | z-index of popup |

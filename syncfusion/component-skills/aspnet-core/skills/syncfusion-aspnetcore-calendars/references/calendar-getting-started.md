# Getting Started – ASP.NET Core Calendar

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Add Script Manager](#add-script-manager)
- [Render the Calendar](#render-the-calendar)
- [Setting Value within Min and Max Dates](#setting-value-within-min-and-max-dates)
- [Common Initialization Patterns](#common-initialization-patterns)

---

## Prerequisites

- ASP.NET Core web application (Razor Pages or MVC)
- Visual Studio 2022 or later
- .NET 6 / .NET 8 SDK

---

## Installation

Open the NuGet Package Manager in Visual Studio (**Tools → NuGet Package Manager → Manage NuGet Packages for Solution**), search for **Syncfusion.EJ2.AspNet.Core**, and install it. Alternatively, use the Package Manager Console:

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

In `~/Pages/Shared/_Layout.cshtml`, add inside `<head>`:

```html
<!-- Syncfusion ASP.NET Core styles -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
<!-- Syncfusion ASP.NET Core scripts -->
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

---

## Add Script Manager

At the end of `<body>` in `~/Pages/Shared/_Layout.cshtml`:

```html
<ejs-scripts></ejs-scripts>
```

---

## Render the Calendar

Add the Calendar tag helper in `~/Pages/Index.cshtml`:

```cshtml
<ejs-calendar id="calendar"></ejs-calendar>
```

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run. The Calendar renders in the default **month view** with today highlighted.

---

## Setting Value within Min and Max Dates

Restrict selectable dates to a range using `value`, `min`, and `max` properties:

```cshtml
@{
    var minDate   = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 5);
    var maxDate   = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 27);
    var todayDate = DateTime.Now;
}

<ejs-calendar id="calendar"
    value="todayDate"
    min="minDate"
    max="maxDate">
</ejs-calendar>
```

**Behavior:**
- Dates before `min` and after `max` are disabled (grayed out)
- If `value` is outside the range, it is clamped to `min` or `max`
- `min` must always be less than or equal to `max`

---

## Common Initialization Patterns

### Basic Calendar (no pre-selected value)
```cshtml
<ejs-calendar id="calendar"></ejs-calendar>
```

### Pre-selected Date
```cshtml
@{
    var selectedDate = new DateTime(2025, 6, 15);
}
<ejs-calendar id="calendar" value="selectedDate"></ejs-calendar>
```

### Disabled Calendar
```cshtml
<ejs-calendar id="calendar" enabled="false"></ejs-calendar>
```

### Show Today Button
```cshtml
<ejs-calendar id="calendar" showTodayButton="true"></ejs-calendar>
```

### Hide Today Button
```cshtml
<ejs-calendar id="calendar" showTodayButton="false"></ejs-calendar>
```

### Custom CSS Class
```cshtml
<ejs-calendar id="calendar" cssClass="custom-calendar"></ejs-calendar>
```

### Enable State Persistence (persists selected value across page reloads)
```cshtml
<ejs-calendar id="calendar" enablePersistence="true"></ejs-calendar>
```

---

## Key Properties for Initialization

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `object` | `null` | Pre-selected date |
| `min` | `object` | `null` | Minimum selectable date |
| `max` | `object` | `null` | Maximum selectable date |
| `enabled` | `bool` | `true` | Enables or disables the Calendar |
| `showTodayButton` | `bool` | `true` | Shows or hides the Today button |
| `cssClass` | `string` | `null` | Root CSS class for custom styling |
| `enablePersistence` | `bool` | `false` | Persists selected value across reloads |

---

## Troubleshooting

**Calendar not rendering:** Ensure `@addTagHelper *, Syncfusion.EJ2` is in `_ViewImports.cshtml` and scripts/styles are correctly referenced in `_Layout.cshtml`.

**Today button not visible:** `showTodayButton` defaults to `true`. If hidden, check for CSS overrides using `.e-footer-container`.

**Min/Max not clamping:** In default (non-strict) mode, out-of-range values show an error class but do not clamp. Set `strictMode="true"` on the DatePicker if hard clamping is required.

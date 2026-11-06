# Getting Started – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script References](#add-stylesheet-and-script-references)
- [Register Script Manager](#register-script-manager)
- [Basic AutoComplete](#basic-autocomplete)
- [Custom Values](#custom-values)
- [Configure Suggestion List Popup](#configure-suggestion-list-popup)

---

## Prerequisites

- ASP.NET Core web application
- Visual Studio with .NET SDK

---

## Install NuGet Package

Install `Syncfusion.EJ2.AspNet.Core` via NuGet Package Manager or Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

---

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Stylesheet and Script References

In `~/Pages/Shared/_Layout.cshtml`, add inside `<head>`:

```cshtml
<head>
    <!-- Syncfusion ASP.NET Core styles (Fluent theme) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
    <!-- Syncfusion ASP.NET Core scripts -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
</head>
```

---

## Register Script Manager

At the end of `<body>` in `_Layout.cshtml`:

```cshtml
<body>
    ...
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Basic AutoComplete

Render an AutoComplete with a string array:

```cshtml
@{
    var sports = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf", "Gymnastics", "Hockey", "Tennis" };
}

<ejs-autocomplete id="games" dataSource="sports">
</ejs-autocomplete>
```

Render with a `ViewBag` list (from controller):

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf" };
    return View();
}
```

**View:**
```cshtml
<ejs-autocomplete id="games" dataSource="@ViewBag.data" placeholder="Select a sport">
</ejs-autocomplete>
```

---

## Custom Values

By default, `allowCustom` is `true`, allowing users to enter values not in the data source. The custom value is sent during form post.

To restrict to only predefined values, set `allowCustom="false"`:

```cshtml
@{
    var countries = new string[] { "Australia", "Canada", "India", "United States" };
}

<ejs-autocomplete id="country"
    dataSource="countries"
    placeholder="Select a country"
    allowCustom="false">
</ejs-autocomplete>
```

---

## Configure Suggestion List Popup

Use `popupHeight` and `popupWidth` to control the suggestion list dimensions:

```cshtml
@{
    var sports = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf" };
}

<ejs-autocomplete id="games"
    dataSource="sports"
    placeholder="Select a sport"
    popupHeight="250px"
    popupWidth="300px">
</ejs-autocomplete>
```

**Defaults:**
- `popupHeight`: `"300px"`
- `popupWidth`: `"100%"` (matches input width)

---

## Notes

- The tag helper name is `<ejs-autocomplete>` (lowercase, with `ejs-` prefix).
- Use `<e-autocomplete-fields>` child tag to map object properties to `value`, `groupBy`, `iconCss`.
- Use `<e-data-manager>` child tag for remote data binding.

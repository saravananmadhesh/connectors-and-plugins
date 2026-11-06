# Getting Started – ASP.NET Core SplitButton

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Add SplitButton to a View](#add-splitbutton-to-a-view)
- [Controller: Populate Items](#controller-populate-items)
- [Run the Application](#run-the-application)

---

## Prerequisites

- ASP.NET Core web application (Razor Pages or MVC)
- Visual Studio 2022 or later
- [System requirements for ASP.NET Core controls](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

---

## Install NuGet Package

Open the NuGet Package Manager in Visual Studio (**Tools → NuGet Package Manager → Manage NuGet Packages for Solution**), search for **Syncfusion.EJ2.AspNet.Core**, and install it.

Or use the Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

> The package depends on **Newtonsoft.Json** (JSON serialization) and **Syncfusion.Licensing** (license key validation).

---

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/_ViewImports.cshtml` (MVC) and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Stylesheet and Script

In `~/Pages/Shared/_Layout.cshtml` (or `~/Views/Shared/_Layout.cshtml`), add inside `<head>`:

```cshtml
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

> Use the [Themes topic](https://ej2.syncfusion.com/aspnetcore/documentation/appearance/theme) for CDN, NPM, or CRG approaches to reference styles.

---

## Register Script Manager

At the end of `<body>` in the layout file, register the Syncfusion Script Manager:

```cshtml
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Add SplitButton to a View

In `~/Pages/Index.cshtml` (or the relevant MVC view), add the `ejs-splitbutton` tag helper and bind `items` from `ViewBag`:

```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste" });
}

<ejs-splitbutton id="element" content="Paste" items="items"></ejs-splitbutton>
```

Or pass items from the controller via `ViewBag`:

```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"></ejs-splitbutton>
```

---

## Controller: Populate Items

Each popup item is an anonymous object. At minimum, set `text`. You can also set `iconCss`, `id`, `url`, `disabled`, and `separator`.

```csharp
public ActionResult Index()
{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste" });
    ViewBag.items = items;
    return View();
}
```

---

## Run the Application

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS). The SplitButton renders in the browser with:
- A primary **Paste** button on the left
- A dropdown arrow on the right that opens a popup with Cut, Copy, Paste items

> **GitHub sample:** [ASP.NET Core SplitButton Getting Started Examples](https://github.com/SyncfusionExamples/ASP-NET-Core-Getting-Started-Examples/tree/main/SplitButton/ASP.NET%20Core%20Tag%20Helper%20Examples)

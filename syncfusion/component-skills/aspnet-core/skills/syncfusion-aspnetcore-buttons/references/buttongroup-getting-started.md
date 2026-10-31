# Getting Started – ASP.NET Core ButtonGroup

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Render a Basic ButtonGroup](#render-a-basic-buttongroup)
- [Running the Application](#running-the-application)

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

> Replace `{{ site.ej2version }}` with the actual EJ2 version (e.g., `26.2.4`).

---

## Register Script Manager

At the end of `<body>` in the layout file:

```cshtml
<body>
    ...
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Render a Basic ButtonGroup

The ButtonGroup is a **pure CSS component** — wrap `<ejs-button>` elements inside a `<div>` with the `e-btn-group` class. No JavaScript initialization is needed for basic usage.

```cshtml
<div class="e-btn-group">
    <ejs-button id="btn1" content="HTML"></ejs-button>
    <ejs-button id="btn2" content="CSS"></ejs-button>
    <ejs-button id="btn3" content="JavaScript"></ejs-button>
</div>
```

This renders three buttons visually grouped together.

---

## Running the Application

Press **F5** or run:

```bash
dotnet run
```

Navigate to your application. The ButtonGroup renders with buttons displayed side-by-side.

---

## See Also

- [ButtonGroup Selection and Nesting](buttongroup-selection-and-nesting.md)
- [ButtonGroup How-To Patterns](buttongroup-how-to.md)
- [ButtonGroup Style and Appearance](buttongroup-style-and-appearance.md)
- [ButtonGroup Accessibility](buttongroup-accessibility.md)

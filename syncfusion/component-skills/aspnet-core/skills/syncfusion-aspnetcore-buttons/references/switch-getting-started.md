# Getting Started – Syncfusion ASP.NET Core Switch

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Render a Basic Switch](#render-a-basic-switch)
- [Set Text Labels on Switch](#set-text-labels-on-switch)
- [Set Initial Checked State](#set-initial-checked-state)

---

## Prerequisites

- ASP.NET Core web application
- Visual Studio with .NET SDK

System requirements: https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements

---

## Install NuGet Package

Open NuGet Package Manager in Visual Studio and install:

```
Syncfusion.EJ2.AspNet.Core
```

Or via Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

> The package depends on `Newtonsoft.Json` and `Syncfusion.Licensing`.

---

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Stylesheet and Script

In `~/Pages/Shared/_Layout.cshtml` inside `<head>`:

```cshtml
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

> Replace `{{ site.ej2version }}` with the actual EJ2 version number (e.g., `26.2.4`).

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

## Render a Basic Switch

**Tag Helper** (`~/Pages/Index.cshtml`):
```cshtml
<ejs-switch id="default"></ejs-switch>
```

This renders a minimal toggle switch with no labels.

---

## Set Text Labels on Switch

Use `onLabel` to display text when the switch is ON, and `offLabel` for when it is OFF.

**Tag Helper:**
```cshtml
<ejs-switch id="default" onLabel="ON" offLabel="OFF"></ejs-switch>
```

> **Note:** Switch does not support text labels in Material themes and does not support long custom text.

---

## Set Initial Checked State

Use the `checked` property to render the switch in an ON (checked) state by default.

**Tag Helper:**
```cshtml
<ejs-switch id="switch1" checked="true"></ejs-switch>
```

---

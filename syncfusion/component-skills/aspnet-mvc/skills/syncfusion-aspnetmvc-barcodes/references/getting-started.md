# Getting Started — Syncfusion ASP.NET MVC Barcode

Step-by-step guide to add Syncfusion Barcode components to an ASP.NET MVC application.

## Prerequisites

- ASP.NET MVC application
- Visual Studio with NuGet access
- See [Syncfusion system requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements)

## Step 1: Install NuGet Package

Open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**, search for `Syncfusion.EJ2.MVC5`, and install it.

Or use the Package Manager Console:

```
Install-Package Syncfusion.EJ2.MVC5
```

> The package includes `Newtonsoft.Json` for JSON serialization and `Syncfusion.Licensing` for license key validation.

## Step 2: Register Namespace

Open `Web.config` under the `Views` folder and add the Syncfusion namespace:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

This makes the `Html.EJS()` HTML helpers available in all views.

## Step 3: Add Stylesheet and Script References

In `~/Views/Shared/_Layout.cshtml`, add inside `<head>`:

```cshtml
<head>
    <!-- Syncfusion ASP.NET MVC controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

> Replace `{{ site.ej2version }}` with the actual EJ2 version number (e.g., `25.1.35`).

## Step 4: Register Script Manager

At the end of `<body>` in `_Layout.cshtml`:

```cshtml
<body>
    ...
    @Html.EJS().ScriptManager()
</body>
```

## Step 5: Add Barcode Components

In `~/Views/Home/Index.cshtml`, add any of the three barcode components:

### BarcodeGenerator
```cshtml
@(Html.EJS().BarcodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Value("123456789")
    .Type(Syncfusion.EJ2.BarcodeGenerator.BarcodeType.Codabar)
    .Render())
```

### QR Code Generator
```cshtml
@(Html.EJS().QRCodeGenerator("container")
    .Width("200px")
    .Height("150px")
    .Value("Syncfusion")
    .Render())
```

### DataMatrix Generator
```cshtml
@(Html.EJS().DataMatrixGenerator("container")
    .Width("200px")
    .Height("150px")
    .Value("Syncfusion")
    .Render())
```

## Run the Application

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to launch. The barcode renders in the default browser.

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| `Html.EJS()` not recognized | Missing namespace registration | Add `Syncfusion.EJ2` to `Web.config` under `Views` |
| Barcode not visible | Missing script/style CDN | Verify `_Layout.cshtml` references |
| Script manager error | `ScriptManager()` missing | Add `@Html.EJS().ScriptManager()` at end of `<body>` |
| License warning in console | No Syncfusion license key | Register license key at app startup |

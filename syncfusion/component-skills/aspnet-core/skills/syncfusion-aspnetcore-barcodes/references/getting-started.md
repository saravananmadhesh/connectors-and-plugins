# Getting Started — Syncfusion ASP.NET Core Barcode

Step-by-step guide to add Syncfusion Barcode components to an ASP.NET Core application.

## Prerequisites

- ASP.NET Core application (Razor Pages or MVC)
- Visual Studio with NuGet access
- See [Syncfusion system requirements](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

## Step 1: Install NuGet Package

Open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**, search for `Syncfusion.EJ2.AspNet.Core`, and install it.

Or use the Package Manager Console:

```
Install-Package Syncfusion.EJ2.AspNet.Core
```

> The package includes `Newtonsoft.Json` for JSON serialization and `Syncfusion.Licensing` for license key validation.

## Step 2: Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

This enables all `ejs-*` tag helpers throughout the application.

## Step 3: Add Stylesheet and Script References

In `~/Pages/Shared/_Layout.cshtml`, add inside `<head>`:

```cshtml
<head>
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

> Replace `{{ site.ej2version }}` with the actual EJ2 version number (e.g., `25.1.35`).

## Step 4: Register Script Manager

At the end of `<body>` in `_Layout.cshtml`:

```cshtml
<body>
    ...
    <ejs-scripts></ejs-scripts>
</body>
```

## Step 5: Add Barcode Components

In `~/Pages/Index.cshtml`, add any of the three barcode components:

### BarcodeGenerator
```cshtml
<ejs-barcodegenerator id="container"
    width="200px"
    height="150px"
    type="Codabar"
    value="123456789"
    mode="SVG">
</ejs-barcodegenerator>
```

### QR Code Generator
```cshtml
<ejs-qrcodegenerator id="container"
    width="200px"
    height="150px"
    value="Syncfusion">
</ejs-qrcodegenerator>
```

### DataMatrix Generator
```cshtml
<ejs-datamatrixgenerator id="container"
    width="200px"
    height="150px"
    value="Syncfusion"
    mode="SVG">
</ejs-datamatrixgenerator>
```

## Run the Application

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to launch. The barcode renders in the default browser.

## Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Tag helper not recognized | Missing `@addTagHelper` | Add to `_ViewImports.cshtml` |
| Barcode not visible | Missing script/style CDN | Verify `_Layout.cshtml` references |
| Script manager error | `<ejs-scripts>` missing | Add at end of `<body>` |
| License warning in console | No Syncfusion license key | Register license key at app startup |

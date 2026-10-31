# Getting Started with ASP.NET Core Stepper

## Table of Contents
- [Prerequisites](#prerequisites)
- [Create Web Application](#create-web-application)
- [Install NuGet Package](#install-nuget-package)
- [Add TagHelper](#add-taghelper)
- [Add Resources](#add-resources)
- [Basic Stepper](#basic-stepper)
- [Adding Steps](#adding-steps)
- [Configure Icons and Labels](#configure-icons-and-labels)

## Prerequisites

Ensure you have the following installed:
- .NET SDK 6.0 or later
- Visual Studio 2022 or Visual Studio Code
- System requirements for [ASP.NET Core controls](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

## Create Web Application

### Using Microsoft Templates

Follow Microsoft's guide to [create a Razor Pages web app](https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-8.0&tabs=visual-studio#create-a-razor-pages-web-app)

### Using Syncfusion Extension

Alternatively, use the [Syncfusion ASP.NET Core Extension](https://ej2.syncfusion.com/aspnetcore/documentation/visual-studio-integration/create-project) to create a new project with pre-configured Syncfusion controls.

## Install NuGet Package

### Via NuGet Package Manager

1. Open NuGet Package Manager in Visual Studio:
   - Tools → NuGet Package Manager → Manage NuGet Packages for Solution
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Click Install

### Via Package Manager Console

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version * (latest)
```

**Dependencies installed:**
- Newtonsoft.Json - JSON serialization
- Syncfusion.Licensing - License validation

## Add TagHelper

Open `~/Pages/_ViewImports.cshtml` and add the TagHelper reference:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This enables all Syncfusion tag helpers in your Razor pages.

## Add Resources

Add stylesheet and script resources to `~/Pages/Shared/_Layout.cshtml`:

```html
<head>
    <!-- Existing head content -->
    
    <!-- Syncfusion ASP.NET Core Stepper styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/bootstrap5.css" />

    <!-- Syncfusion ASP.NET Core Script Manager -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
</head>
```

Alternative approaches:
- [CDN reference](https://ej2.syncfusion.com/aspnetcore/documentation/common/adding-script-references#cdn-reference)
- [NPM package](https://ej2.syncfusion.com/aspnetcore/documentation/common/adding-script-references#node-package-manager-npm)
- [Custom Resource Generator](https://ej2.syncfusion.com/aspnetcore/documentation/appearance/theme)

Register the script manager at the end of `<body>`:

```html
<body>
    <!-- Existing content -->
    
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

## Basic Stepper

Create a basic stepper by adding the tag helper to your Razor page (`~/Pages/Index.cshtml`):

```html
<ejs-stepper id="stepper"></ejs-stepper>
```

This renders an empty stepper. You need to add steps to make it functional.

## Adding Steps

Define steps using the `e-stepper-step` tag helper nested within `<e-stepper-steps>` inside `<ejs-stepper>`:

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step label="Step 1"></e-stepper-step>
        <e-stepper-step label="Step 2"></e-stepper-step>
        <e-stepper-step label="Step 3"></e-stepper-step>
        <e-stepper-step label="Step 4"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run the application. The stepper renders with 4 horizontal steps in the browser.

## Configure Icons and Labels

Enhance steps with icons and descriptive text:

```html
<ejs-stepper id="stepper">
    <e-stepper-steps>
        <e-stepper-step iconCss="sf-icon-cart" label="Shopping Cart" text="Review items"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-transport" label="Shipping" text="Enter address"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-payment" label="Payment" text="Select payment method"></e-stepper-step>
        <e-stepper-step iconCss="sf-icon-success" label="Confirmation" text="Order confirmed"></e-stepper-step>
    </e-stepper-steps>
</ejs-stepper>
```

**Properties:**
- `iconCss` - CSS class for step icon (uses Syncfusion icons like `sf-icon-cart`, `sf-icon-user`, etc.)
- `label` - Primary label text displayed under or next to the step
- `text` - Secondary descriptive text for the step

**Common Syncfusion Icons:**
- `sf-icon-cart` - Shopping cart
- `sf-icon-transport` - Shipping/location
- `sf-icon-payment` - Payment
- `sf-icon-success` - Success/checkmark
- `sf-icon-user` - User profile

The stepper now displays with custom icons, making the workflow more intuitive and visually clear to users.

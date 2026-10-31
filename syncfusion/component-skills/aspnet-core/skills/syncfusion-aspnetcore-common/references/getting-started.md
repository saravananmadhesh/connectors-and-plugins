# Syncfusion ASP.NET Core - Getting Started Guide

This guide provides step-by-step instructions for getting started with Syncfusion EJ2 ASP.NET Core components using three different approaches:
1. **Razor Pages** (Visual Studio)
2. **Razor Pages** (VS Code)
3. **ASP.NET Core MVC** (HTML Helper)

---

## Prerequisites

All approaches require the following:
- .NET Core/.NET 8.0 or higher
- Visual Studio 2019/2022 or Visual Studio Code

---

## Installation

### Step 1: Install Syncfusion NuGet Package

All three approaches use the same NuGet package: **Syncfusion.EJ2.AspNet.Core**

#### Option A: Using NuGet Package Manager (Visual Studio)
1. Open NuGet Package Manager: **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**
2. Search for `Syncfusion.EJ2.AspNet.Core`. **Pick latest version**
3. Click Install

#### Option B: Using Package Manager Console
```
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.1.44
```

#### Option C: Using .NET CLI
```
dotnet add package Syncfusion.EJ2.AspNet.Core
```

---

## Approach 1: Razor Pages (Visual Studio)

### Create ASP.NET Core Razor Pages Project

1. Create a new ASP.NET Core Web App project using:
   - Microsoft Templates: ASP.NET Core Razor Pages Tutorial
   - Syncfusion Extension: Create Project via Extension

### Add Syncfusion Tag Helper

Open **`~/Pages/_ViewImports.cshtml`** and add:
```csharp
@addTagHelper *, Syncfusion.EJ2
```

### Add Stylesheet and Script Resources

In **`~/Pages/Shared/_Layout.cshtml`**, add the following in the `<head>` section:
```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent2.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

**NOTE**: Installed package version and CDN version must be same.

Register the script manager at the end of the `<body>` section:
```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

### Example: Add Calendar Control

In **`~/Pages/Index.cshtml`**, add:
```html
<div>
    <ejs-calendar id="calendar"></ejs-calendar>
</div>
```
---

## Approach 2: Razor Pages (VS Code)

### Create ASP.NET Core Web Application

1. Create a new folder and open it in VS Code
2. Accept the trust prompt when asked
3. Open the Integrated Terminal: **View → Terminal**

### Generate Razor Pages Project

Run the following command in the terminal:
```bash
dotnet new webapp -o AspNetCoreWebApp
```

Open the project in VS Code:
```bash
code -r AspNetCoreWebApp
```

### Install Syncfusion Package

In the terminal, run:
```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

### Add Syncfusion Tag Helper

Open **`~/Pages/_ViewImports.cshtml`** and add:
```csharp
@addTagHelper *, Syncfusion.EJ2
```

### Add Stylesheet and Script Resources

In **`~/Pages/Shared/_Layout.cshtml`**, add the following in the `<head>` section:
```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls style -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    <!-- Syncfusion ASP.NET Core controls script -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

**NOTE**: Installed package version and CDN version must be same.

Register the script manager at the end of the `<body>` section:
```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

### Example: Add Calendar Control

In **`~/Pages/Index.cshtml`**, add:
```html
<div>
    <ejs-calendar id="calendar"></ejs-calendar>
</div>
```

---

## Approach 3: ASP.NET Core MVC (HTML Helper)

### Create ASP.NET Core MVC Application

1. Create a new ASP.NET Core MVC project using:
   - Microsoft Templates: ASP.NET Core MVC Tutorial
   - Syncfusion Extension: Create Project via Extension

### Add Syncfusion Namespace

Open **`~/Views/_ViewImports.cshtml`** and add the namespace:
```csharp
@using Syncfusion.EJ2
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

### Add Stylesheet and Script Resources

In **`~/Views/Shared/_Layout.cshtml`**, add the following in the `<head>` section:
```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

**NOTE**: Installed package version and CDN version must be same.

Register the script manager at the end of the `<body>` section:
```html
<body>
    ...
    <!-- Syncfusion Script Manager -->
    @Html.EJS().ScriptManager()
</body>
```

### Example: Add Calendar Control

In **`~/Views/Home/Index.cshtml`**, add:
```html
<div>
   @Html.EJS().Calendar("calendar").Render()
</div>
```

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run the application. The Calendar control will render in the default web browser.

---

## Comparison of Approaches

| Feature | Razor Pages (VS) | Razor Pages (VS Code) | MVC (HTML Helper) |
|---------|------------------|-----------------------|-------------------|
| **IDE** | Visual Studio | Visual Studio Code | Visual Studio |
| **Syntax** | Tag Helper (`<ejs-calendar>`) | Tag Helper (`<ejs-calendar>`) | HTML Helper (`@Html.EJS()`) |
| **Configuration File** | `_ViewImports.cshtml` | `_ViewImports.cshtml` | `_ViewImports.cshtml` |
| **Markup Style** | XML-like | XML-like | C# method chaining |
| **Script Manager** | `<ejs-scripts>` | `<ejs-scripts>` | `@Html.EJS().ScriptManager()` |

---


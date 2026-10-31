# Getting Started with ASP.NET Core Chips

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Add Tag Helper Reference](#add-tag-helper-reference)
- [Adding CSS and Script References](#adding-css-and-script-references)
- [Register Syncfusion Script Manager](#register-syncfusion-script-manager)
- [Rendering a Single Chip](#rendering-a-single-chip)
- [Rendering a Chip List](#rendering-a-chip-list)
- [Run the Application](#run-the-application)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- .NET 6.0 or later
- Visual Studio 2022 or later (recommended)
- An ASP.NET Core web application (MVC or Razor Pages)

Create a new ASP.NET Core web app:
```bash
dotnet new webapp -n ChipsApp
cd ChipsApp
```

---

## Installation

Install the Syncfusion ASP.NET Core NuGet package:

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

Or via NuGet Package Manager:
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

Alternatively, add it to your `.csproj` file:
```xml
<ItemGroup>
    <PackageReference Include="Syncfusion.EJ2.AspNet.Core" Version="27.1.0" />
</ItemGroup>
```

Then restore packages:
```bash
dotnet restore
```

---

## Add Tag Helper Reference

Open `~/Pages/_ViewImports.cshtml` and import the Syncfusion TagHelper:

```razor
@addTagHelper *, Syncfusion.EJ2
```

For MVC projects, add it to `~/Views/_ViewImports.cshtml`:
```razor
@using ChipsApp
@namespace ChipsApp.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

---

## Adding CSS and Script References

Add the required CSS files and scripts to your `~/Pages/Shared/_Layout.cshtml` file in the `<head>`:

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/27.1.0/bootstrap5.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/27.1.0/dist/ej2.min.js"></script>
</head>
```

> **NOTE:** You can replace `bootstrap5` with other available themes: `material`, `material3`, `fabric`, `fluent2`, `tailwind`.

---

## Register Syncfusion Script Manager

Also, register the script manager `<ejs-scripts>` at the end of `<body>` in the ASP.NET Core application:

```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Rendering a Single Chip

The simplest usage — a single chip with display text:

**View (`Index.cshtml`):**
```razor
@{
    ViewData["Title"] = "Single Chip";
}

<ejs-chiplist id="chip" text="Janet Leverling"></ejs-chiplist>
```

**Controller (`ChipsController.cs`):**
```csharp
using Microsoft.AspNetCore.Mvc;

namespace ChipsApp.Controllers
{
    public class ChipsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
```

- `text` — sets the label displayed on the chip.

---

## Rendering a Chip List

To render multiple chips, use `<e-chips>` and `<e-chip>` as children:

**View (`ChipList.cshtml`):**
```razor
@{
    ViewData["Title"] = "Chip List";
}

<ejs-chiplist id="chip-list">
    <e-chips>
        <e-chip text="Andrew"></e-chip>
        <e-chip text="Janet"></e-chip>
        <e-chip text="Laura"></e-chip>
        <e-chip text="Margaret"></e-chip>
    </e-chips>
</ejs-chiplist>
```

**Controller:**
```csharp
public IActionResult ChipList()
{
    return View();
}
```

- `ejs-chiplist` — the container/wrapper component.
- `e-chips` — holds the collection of chips.
- `e-chip` — defines an individual chip item. Accepts all per-chip props (`text`, `cssClass`, `avatarText`, `leadingIconCss`, etc.).

---

## Run the Application

```bash
dotnet run
```

The app will start in development mode. Navigate to your Chips view to see the component.

For Visual Studio:
- Press `Ctrl+F5` (Windows) or `⌘+F5` (macOS) to run without debugging.
- The app will open in your default browser at `https://localhost:5001` or `http://localhost:5000`.

---

## Project Structure

Organize your project like this:

```
ChipsApp/
├── Pages/
│   ├── Shared/
│   │   └── _Layout.cshtml
│   ├── _ViewImports.cshtml
│   ├── _ViewStart.cshtml
│   └── Index.cshtml
├── Controllers/
│   └── ChipsController.cs
├── Models/
│   └── ChipModel.cs
├── wwwroot/
│   ├── css/
│   │   └── site.css
│   └── js/
│       └── site.js
├── Program.cs
├── appsettings.json
└── ChipsApp.csproj
```

---

## Complete Example: _Layout.cshtml

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - ChipsApp</title>
    
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/27.1.0/bootstrap5.css" />
    
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/27.1.0/dist/ej2.min.js"></script>
    
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <a class="navbar-brand" asp-area="" asp-page="/Index">ChipsApp</a>
            </div>
        </nav>
    </header>
    
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>

    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
    
    <script src="~/js/site.js" asp-append-version="true"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

---

## Complete Example: _ViewImports.cshtml

```razor
@using ChipsApp
@namespace ChipsApp.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Chip renders without styles | Verify CSS link is added to `_Layout.cshtml` `<head>` section |
| Tag helpers not recognized | Ensure `@addTagHelper *, Syncfusion.EJ2` is in `_ViewImports.cshtml` |
| Syncfusion package not found | Run `dotnet restore` after adding NuGet package |
| Components not interactive | Verify `<ejs-scripts></ejs-scripts>` is placed at end of `<body>` |
| "Could not find element" error | Ensure element `id` matches the `id` property in the tag helper |
| Events not firing | Check that `on-*` attributes are properly spelled and bound to handler methods |

---

## Next Steps

- Explore [Chip API Reference](chips-api.md) for all available properties
- Learn [Chip Customization](chips-customization.md) for styling options
- Check [Chip Accessibility](chips-accessibility.md) for WCAG compliance
- Review [Chip Types and Selection](chips-types-and-selection.md) for selection modes
- Study [Chip Drag and Drop](chips-drag-and-drop.md) for advanced interactions
- Discover [Chip Style](chips-style.md) for CSS customization

---

## Summary

You now have a complete, production-ready ASP.NET Core Chips setup. The component is built using Syncfusion's official tag helpers, follows ASP.NET Core conventions, and integrates seamlessly with Razor Pages or MVC projects.

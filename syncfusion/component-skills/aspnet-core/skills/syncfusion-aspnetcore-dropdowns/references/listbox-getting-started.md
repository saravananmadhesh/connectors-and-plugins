# Getting Started with ListBox

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup TagHelpers](#setup-taghelpers)
- [Add Styles and Scripts](#add-styles-and-scripts)
- [Register Script Manager](#register-script-manager)
- [Creating Your First ListBox](#creating-your-first-listbox)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

---

## ASP.NET Core Application Setup

### Create a New ASP.NET Core Application

Create a new ASP.NET Core MVC project:

```bash
dotnet new mvc -n MyListBoxApp
cd MyListBoxApp
```

Or create using Visual Studio template:
- File → New → Project
- Select "ASP.NET Core Web App (Model-View-Controller)"
- Name the project and select .NET version

---

## Prerequisites

- ASP.NET Core 6.0+ project (Razor Pages or MVC)
- Visual Studio 2022+ or VS Code

System requirements: https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements

---

## Installation

Install the NuGet package via Package Manager Console:

```bash
Install-Package Syncfusion.EJ2.AspNet.Core
```

Or via .NET CLI:

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

---

## Setup TagHelpers

Open `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/_ViewImports.cshtml` (MVC) and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

---

## Add Styles and Scripts (Local Hosting Recommended)

**⚠️ SECURITY:** For production, host vendor scripts locally from the NuGet package instead of using CDN to mitigate supply chain risks (W012).

### Option A: Local Hosting (RECOMMENDED) ✅

In `~/Pages/Shared/_Layout.cshtml` (or `~/Views/Shared/_Layout.cshtml`), add inside `<head>`:

```html
<head>
    <!-- ✅ Serve from local NuGet package (safest) -->
    <link rel="stylesheet" href="~/lib/ej2/fluent2.css" />
</head>
```

### Option B: CDN with Subresource Integrity (SRI) ⚠️

If CDN is mandatory, use SRI hashes + HTTPS:

```html
<head>
    <!-- ⚠️ Pin version and add SRI hash for integrity verification -->
    <link rel="stylesheet" 
          href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent2.css"
          integrity="sha384-[GET_ACTUAL_HASH_FROM_CDN]"
          crossorigin="anonymous" />
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"
            integrity="sha384-[GET_ACTUAL_HASH_FROM_CDN]"
            crossorigin="anonymous"></script>
</head>
```

**Get SRI hashes from:** https://www.srihash.org/ or Syncfusion CDN documentation.

> **Tip:** Replace `21.1.37` with your installed package version. Check current version at nuget.org.

---

## Register Script Manager

At the end of `<body>` in `_Layout.cshtml`, register the script manager:

```html
<body>
    @RenderBody()
    <!-- Required: Syncfusion script manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

---

## Creating Your First ListBox

### Basic ListBox with Static Data

**Controller (`HomeController.cs`):**

```csharp
public class HomeController : Controller
{
    public IActionResult Index()
    {
        // Define list items
        ViewBag.data = new List<object>
        {
            new { text = "JavaScript", id = "1" },
            new { text = "TypeScript", id = "2" },
            new { text = "React", id = "3" },
            new { text = "Vue", id = "4" },
            new { text = "Angular", id = "5" },
            new { text = "Svelte", id = "6" }
        };
        return View();
    }
}
```

**View (`Index.cshtml`):**

```cshtml
<h1>Programming Languages</h1>

<ejs-listbox id="languages"
    dataSource="@ViewBag.data">
    <e-listbox-fields text="text" value="id"></e-listbox-fields>
</ejs-listbox>
```

### ListBox with Selection Handler

Add event handling to capture selected items:

**View (`Index.cshtml`):**

```cshtml
<h1>Select a Language</h1>

<ejs-listbox id="languages"
    dataSource="@ViewBag.data"
    change="onListBoxChange">
    <e-listbox-fields text="text" value="id"></e-listbox-fields>
</ejs-listbox>

<script>
function onListBoxChange(args) {
    console.log('Selected Item Value:', args.value);
    console.log('Selected Item(s):', args.items);
}
</script>
```

### ListBox with Multiple Selection

Enable multiple item selection:

**View:**

```cshtml
<h1>Select Skills (Multiple)</h1>

<ejs-listbox id="skills"
    dataSource="@ViewBag.skills"
    change="onSelectionChange">
    <e-listbox-fields text="text" value="id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
</ejs-listbox>

<p>Selected: <span id="selectedItems"></span></p>

<script>
function onSelectionChange(args) {
    var selected = args.value;
    document.getElementById('selectedItems').textContent = selected.join(', ');
    console.log('Selected:', selected);
}
</script>
```

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.skills = new List<object>
    {
        new { text = "HTML", id = "1" },
        new { text = "CSS", id = "2" },
        new { text = "JavaScript", id = "3" },
        new { text = "TypeScript", id = "4" },
        new { text = "React", id = "5" }
    };
    return View();
}
```

---

## Running the Application

Start the development server:

**Using .NET CLI:**

```bash
dotnet run
```

**Using Visual Studio:**
- Press F5 or click "Start Debugging"
- The app opens at `https://localhost:5001/`

The browser displays your ListBox component.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| ListBox component not rendering | Verify `@addTagHelper *, Syncfusion.EJ2` in `_ViewImports.cshtml` |
| Script errors in console | Ensure `<ejs-scripts></ejs-scripts>` is included in `_Layout.cshtml` |
| No data displays in list | Confirm `ViewBag.data` is populated and `dataSource` binding is correct |
| Events not firing | Check event handler function name matches `change="onListBoxChange"` attribute |
| Styling issues | Verify CSS imports are present in `_Layout.cshtml` |
| Package not found error | Run `dotnet restore` to restore NuGet packages |

---

## Next Steps

- **Working with complex data?** → Go to [data-binding.md](listbox-data-binding.md)
- **Need item filtering?** → See [features.md](listbox-features.md)
- **Want drag & drop?** → Check [how-to-guides.md](listbox-how-to-guides.md)
- **Need custom styling?** → Explore [style-and-appearance.md](listbox-style-and-appearance.md)

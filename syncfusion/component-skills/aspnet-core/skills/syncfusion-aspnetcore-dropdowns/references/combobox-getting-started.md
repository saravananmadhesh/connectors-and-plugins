# Getting Started with ComboBox

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup TagHelpers](#setup-taghelpers)
- [Add Styles and Scripts](#add-styles-and-scripts)
- [Register Script Manager](#register-script-manager)
- [Component Implementation](#component-implementation)
- [Custom Values](#custom-values)
- [Popup Configuration](#popup-configuration)

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

## Component Implementation

### Basic ComboBox with Static Data

**Controller (`HomeController.cs`):**

```csharp
public IActionResult Index()
{
    ViewBag.sportsList = new List<string>
    {
        "Badminton",
        "Cricket",
        "Football",
        "Golf",
        "Tennis"
    };
    return View();
}
```

**View (`Index.cshtml`):**

```cshtml
<ejs-combobox id="sports-combo"
    dataSource="@ViewBag.sportsList"
    placeholder="Choose a sport...">
</ejs-combobox>
```

### ComboBox with Object Data

**Controller (`HomeController.cs`):**

```csharp
public IActionResult Index()
{
    ViewBag.gamesList = new List<object>
    {
        new { Id = "game1", Name = "Chess" },
        new { Id = "game2", Name = "Carrom" },
        new { Id = "game3", Name = "Badminton" }
    };
    return View();
}
```

**View (`Index.cshtml`):**

```cshtml
<ejs-combobox id="games-combo"
    dataSource="@ViewBag.gamesList"
    placeholder="Select or type a game...">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```

---

## Custom Values

### Enable User-Defined Values

By default, `allowCustom="true"` lets users enter values not in the dropdown list.

```cshtml
<ejs-combobox id="games-combo"
    dataSource="@ViewBag.gamesList"
    allowCustom="true"
    placeholder="Select or type a game..."
    change="onComboBoxChange">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>

<script>
function onComboBoxChange(args) {
    console.log('Selected value:', args.value);
    console.log('Custom value:', args.isCustom);
}
</script>
```

**Behavior:**
- ✅ User can select from list
- ✅ User can type and create a new value
- ✅ Custom value is submitted with form

**Example Workflow:**
1. User types "Scrabble" (not in list)
2. Presses Enter or leaves field
3. "Scrabble" becomes the selected value
4. Form submission includes "Scrabble"

---

## Popup Configuration

### Customize Dropdown Appearance

Control the popup list size and behavior:

```cshtml
<ejs-combobox id="combobox"
    dataSource="@ViewBag.largeDataset"
    placeholder="Select an item..."
    popupHeight="250px"
    popupWidth="300px"
    allowFiltering="true">
</ejs-combobox>
```

### Responsive Popup

For mobile-friendly design, use percentage-based widths:

```cshtml
<ejs-combobox id="combobox"
    dataSource="@ViewBag.sportsList"
    popupHeight="auto"
    popupWidth="100%"
    placeholder="Choose a sport...">
</ejs-combobox>
```

### Default Popup Behavior

| Property | Default | Purpose |
|----------|---------|---------|
| `popupHeight` | 300px | Dropdown height with scrollbar |
| `popupWidth` | 100% | Dropdown width (matches input width) |
| `showClearButton` | true | Show X button to clear selection |

---

## First Implementation Checklist

- [ ] NuGet package installed: `Syncfusion.EJ2.AspNet.Core`
- [ ] TagHelper added to `_ViewImports.cshtml`: `@addTagHelper *, Syncfusion.EJ2`
- [ ] Script Manager in layout: Included in `_Layout.cshtml` or per-page view
- [ ] ComboBox component added to view with `<ejs-combobox>`
- [ ] dataSource populated with data via controller `ViewBag` or model
- [ ] placeholder text added for UX
- [ ] change event handler (optional) for selection events
- [ ] Application runs: Build and run project, navigate to view
- [ ] ComboBox appears and is clickable

---

## Next Steps

- **Binding complex data?** → Go to [data-binding.md](combobox-data-binding.md)
- **Want search capability?** → See [filtering-and-search.md](combobox-filtering-and-search.md)
- **Need grouping?** → Check [grouping-and-sorting.md](combobox-grouping-and-sorting.md)
- **Want custom UI?** → Explore [templates-and-customization.md](combobox-templates-and-customization.md)

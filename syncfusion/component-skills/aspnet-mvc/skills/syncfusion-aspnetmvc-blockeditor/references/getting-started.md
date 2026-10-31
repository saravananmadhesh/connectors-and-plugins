# Getting Started — Syncfusion ASP.NET MVC Block Editor

## Prerequisites

- ASP.NET MVC 5 application (Visual Studio)
- .NET Framework 4.5+

---

## Step 1: Install NuGet Package

Open **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**, search for `Syncfusion.EJ2.MVC5`, and install it.

> The package depends on `Newtonsoft.Json` (JSON serialization) and `Syncfusion.Licensing` (license validation).

---

## Step 2: Add Namespace in Web.config

In `~/Views/Web.config`, add the Syncfusion namespace:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

---

## Step 3: Add CDN Stylesheet and Script

In `~/Views/Shared/_Layout.cshtml`, add inside `<head>`:

```html
<head>
    <!-- Syncfusion ASP.NET MVC controls styles (Fluent2 theme) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent2.css" />
    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

> Other themes are available. See [Syncfusion Themes documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/appearance/theme) for CDN, NPM, and CRG options.

---

## Step 4: Register the Script Manager

At the end of `<body>` in `_Layout.cshtml`:

```html
<body>
    ...
    @Html.EJS().ScriptManager()
</body>
```

---

## Step 5: Render the Block Editor

In `~/Views/Home/Index.cshtml`:

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor").Render()
</div>

<style>
    #blockeditor-container {
        margin: 20px auto;
    }
</style>
```

Controller (`HomeController.cs`):

```csharp
public ActionResult Index()
{
    return View();
}
```

---

## Step 6: Render with Initial Content

Define a `BlockModel` class and pass initial blocks via `ViewBag`:

```csharp
using Syncfusion.EJ2.BlockEditor;

public class BlockModel
{
    public string id { get; set; }
    public string blockType { get; set; }
    public object properties { get; set; }
    public List<object> content { get; set; }
}

public ActionResult Index()
{
    var blocks = new List<BlockModel>
    {
        new BlockModel
        {
            id = "heading-1",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object>
            {
                new { contentType = "Text", content = "Welcome to Block Editor" }
            }
        },
        new BlockModel
        {
            id = "para-1",
            blockType = "Paragraph",
            content = new List<object>
            {
                new { contentType = "Text", content = "This is a paragraph block." }
            }
        }
    };
    ViewBag.BlocksData = blocks;
    return View();
}
```

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor").Blocks((List<BlockModel>)ViewBag.BlocksData).Render()
</div>

<style>
    #blockeditor-container { margin: 20px auto; }
</style>
```

---

## Common Gotchas

**Missing namespace** — If `@Html.EJS()` is not recognized, ensure `Syncfusion.EJ2` is listed in `~/Views/Web.config` namespaces, not `~/Web.config`.

**Script manager placement** — `@Html.EJS().ScriptManager()` must be at the bottom of `<body>` (after all EJS helpers), not inside `<head>`.

**BlockModel in controller** — The `BlockModel` class must use lowercase property names (`id`, `blockType`, `content`, `properties`) to match the expected JSON serialization format.

**ViewBag cast** — When passing blocks through `ViewBag`, cast explicitly in the view: `(List<BlockModel>)ViewBag.BlocksData`.

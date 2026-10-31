# Getting Started

Setup guide for the Syncfusion ASP.NET MVC Rich Text Editor (EJ2).

## Step 1 — Install NuGet Package

Open **NuGet Package Manager** in Visual Studio (Tools → NuGet Package Manager → Manage NuGet Packages for Solution), search for `Syncfusion.EJ2.MVC5`, and install it.

```csharp
Install-Package Syncfusion.EJ2.MVC5 -Version 33.1.45
```

> `Syncfusion.EJ2.MVC5` depends on `Newtonsoft.Json` (JSON serialization) and `Syncfusion.Licensing` (license validation). Both are installed automatically.

## Step 2 — Add Namespace in Web.config

Add the `Syncfusion.EJ2` namespace in `Views/Web.config` so the HTML helpers are available in all views:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

## Step 3 — Add Stylesheet and Script in `_Layout.cshtml`

Reference the Syncfusion theme CSS and bundled JS via CDN in the `<head>` of `~/Views/Shared/_Layout.cshtml`:

```cshtml
<head>
    ...
    <!-- Syncfusion ASP.NET MVC controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.45/fluent.css" />
    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.45/dist/ej2.min.js"></script>
</head>
```

> Other available themes: `material.css`, `bootstrap5.css`, `tailwind.css`, `fluent2.css`. Replace `fluent.css` with your preferred theme.

## Step 4 — Register ScriptManager

Add the ScriptManager helper just before `</body>` in `_Layout.cshtml`. This is required for all Syncfusion EJ2 MVC controls:

```cshtml
<body>
    ...
    @Html.EJS().ScriptManager()
</body>
```

## Step 5 — Render the Rich Text Editor (Basic)

Add the RTE in your view page (`~/Views/Home/Index.cshtml`):

```cshtml
@(Html.EJS().RichTextEditor("editor").Value(ViewBag.value).Render())
```

Set the initial content in your controller:

```csharp
public class HomeController : Controller
{
    public ActionResult Index()
    {
        ViewBag.value = @"<p>The Syncfusion Rich Text Editor is a WYSIWYG editor for creating and editing rich text content.</p>";
        return View();
    }
}
```

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run. The RTE renders with a default toolbar.

> **Note:** This basic setup uses default toolbar items. To customize toolbar items, proceed to Step 6 below.

## Step 6 — Configure Custom Toolbar Items

Pass your desired toolbar items via `ViewBag` and bind using `ToolbarSettings`:

**View:**
```cshtml
@(Html.EJS().RichTextEditor("editor")
    .ToolbarSettings(e => e.Items((object)ViewBag.tools))
    .Value(ViewBag.value)
    .Render())
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.tools = new object[] {
        "Bold", "Italic", "Underline", "StrikeThrough", "|",
        "FontName", "FontSize", "FontColor", "BackgroundColor", "|",
        "Formats", "Alignments", "OrderedList", "UnorderedList",
        "Outdent", "Indent", "|",
        "CreateLink", "Image", "CreateTable", "|",
        "ClearFormat", "Print", "SourceCode", "FullScreen", "|",
        "Undo", "Redo"
    };
    ViewBag.value = "<p>Start editing...</p>";
    return View();
}
```

> **CRITICAL:** Always define toolbar items in the **Controller** and pass via `ViewBag`. The cast `(object)ViewBag.tools` is **required** for proper serialization to the client.

> Use `"|"` for vertical separator and `"-"` for horizontal separator between toolbar items.

## Common Gotchas

- **ScriptManager missing** → Controls won't initialize. Always include `@Html.EJS().ScriptManager()` at end of `<body>`.
- **Namespace not in Web.config** → `@Html.EJS()` won't resolve. Add to `Views/Web.config`, not root `Web.config`.
- **Multiple RTEs on one page** → Give each a unique ID: `RichTextEditor("editor1")`, `RichTextEditor("editor2")`.
- **License warning in output** → Register your Syncfusion license key in `Application_Start` in `Global.asax`: `Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_KEY")`.
- **Toolbar items not loading** → Make sure to pass items via `ViewBag` with the `(object)` cast. Hardcoding items directly in `.ToolbarSettings()` will not work.
- **RTE won't render with custom toolbar** → Ensure the toolbar items list is defined in the **Controller** (not View) and passed to the View as `ViewBag.tools`.

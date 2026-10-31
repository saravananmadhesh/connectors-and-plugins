# Getting Started with ASP.NET MVC Form Builder Control

The Syncfusion ASP.NET MVC Form Builder is a visual form designer. Users drag fields onto a design canvas, configure field properties, preview the result, and export the generated schema for use with the Form Renderer.

This guide uses an ASP.NET MVC application with the Syncfusion HTML Helper.

## Prerequisites

Review the [ASP.NET MVC system requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements) before creating the application.

## Create an ASP.NET MVC application

Create an ASP.NET MVC application from Microsoft Templates or the Syncfusion ASP.NET MVC Visual Studio extension.

## Install the MVC package

Install `Syncfusion.EJ2.MVC5` from the Visual Studio NuGet Package Manager or Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.MVC5
```

The package includes dependencies for JSON serialization and Syncfusion license validation.

## Add the namespace

Add the Syncfusion namespace to `Views/Web.config`:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2" />
</namespaces>
```

## Add stylesheet and script resources

Add the theme and Essential JS 2 script references inside `Views/Shared/_Layout.cshtml`:

```cshtml
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent2.css" />
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
```

Register the MVC script manager at the end of `<body>`:

```cshtml
@Html.EJS().ScriptManager()
```

## Add the Form Builder control

In `Views/Home/Index.cshtml`:

```cshtml
@using Syncfusion.EJ2.FormBuilder

@Html.EJS().FormBuilder("form-builder-control").Render()
```

The controller can return the view normally:

```csharp
public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }
}
```

## Run the application

Press `Ctrl+F5` in Visual Studio to run the application. The MVC Form Builder renders with its toolbox, design canvas, property panel, code view, and preview.

## Load an initial form schema

Pass a schema from `ViewData` to the `Schema` HTML Helper property:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.FormBuilder

<div class="control-section">
    @Html.EJS().FormBuilder("form-builder-control")
        .Schema(ViewData["formSchema"])
        .Render()
</div>
```

```csharp
public ActionResult Index()
{
    ViewData["formSchema"] = GetLoginForm();
    return View();
}

public Schema GetLoginForm()
{
    return new Schema
    {
        Version = "0.1.0",
        Properties = new Dictionary<string, BaseProperty>
        {
            ["emailAddress"] = new TextboxProperty
            {
                Id = "t1", Name = "emailAddress", Type = "string",
                Label = "Email Address", TextboxType = "email",
                Required = true, Widget = "textbox"
            }
        },
        Layout = new List<LayoutNode>
        {
            new LayoutNode { Type = "field", PropertyId = "emailAddress" }
        },
        Settings = new SchemaSettings { Name = "Login Form" }
    };
}
```

The schema contains field definitions in `Properties`, layout nodes in `Layout`, and form-wide values in `Settings`. Read [form-schema.md](form-schema.md) for the complete schema model.

## Form Builder properties

Use these HTML Helper properties on `FormBuilder`:

| Property | Type | Default | Purpose |
|---|---|---|---|
| `Locale` | `string` | `'en-US'` | Sets the locale. |
| `AllowExport` | `boolean` | `true` | Enables or disables schema export. |
| `EnablePreview` | `boolean` | `true` | Enables or disables preview. |
| `EnablePersistence` | `boolean` | `false` | Persists builder state and schema. |
| `EnableRtl` | `boolean` | `false` | Enables right-to-left rendering. |
| `Mode` | `Simple` or `Developer` | `Developer` | Selects the builder experience. |
| `FormTemplates` | model collection | `null` | Supplies reusable form templates. |
| `ToolboxCategories` | model collection | `null` | Configures toolbox categories. |
| `ToolboxItems` | model collection | `[]` | Supplies toolbox items and templates. |
| `Schema` | schema model or JSON | `null` | Loads the form schema for editing. |
| `EnableHtmlSanitizer` | `boolean` | `false` | Sanitizes HTML in custom templates. |

```cshtml
@Html.EJS().FormBuilder("form-builder-control")
    .Schema(ViewData["formSchema"])
    .AllowExport(true)
    .EnablePreview(true)
    .EnablePersistence(false)
    .EnableRtl(false)
    .Mode("Developer")
    .Render()
```

The Templates tab is available in Developer mode. Use the toolbox and property panel to build the form, then inspect the JSON code view before exporting.

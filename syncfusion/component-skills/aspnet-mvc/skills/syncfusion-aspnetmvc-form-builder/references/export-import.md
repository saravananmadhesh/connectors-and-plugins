# Exporting and Importing Schemas

The ASP.NET MVC Form Builder supports exporting the generated schema for reuse in Form Renderer and importing an existing schema for further editing.

## Export form schema

Use the **Export** button in the Form Builder toolbar to export the form definition.

## Disable export

Set `AllowExport(false)`:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.FormBuilder

@Html.EJS().FormBuilder("form-builder-control")
    .AllowExport(false)
    .Render()
```

The default value is `true`.

## Import form schema

Pass the exported schema from `ViewData` to `.Schema(...)`:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.FormBuilder

@Html.EJS().FormBuilder("form-builder-control")
    .Schema(ViewData["formSchema"])
    .Render()
```

```csharp
public ActionResult Index()
{
    ViewData["formSchema"] = GetLoginForm();
    return View();
}
```

This loads the schema so the builder can continue editing the same form definition.

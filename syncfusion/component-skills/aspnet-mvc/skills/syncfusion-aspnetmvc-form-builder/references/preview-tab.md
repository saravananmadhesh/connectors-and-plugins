# Preview Tab

The ASP.NET MVC Form Builder provides a Preview tab that shows the generated form as it will appear to end users. It also includes a JSON code preview for reviewing the schema.

## Preview the form

Switch to **Preview** to validate the current layout, labels, and field behavior before exporting or publishing the form.

## Disable preview

Set `EnablePreview(false)`:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.FormBuilder

@Html.EJS().FormBuilder("form-builder-control")
    .EnablePreview(false)
    .Render()
```

The default value is `true`.

## JSON code preview

Open the **JSON** tab to view the generated schema. The **Copy** button copies the schema JSON so it can be reused or passed to Form Renderer.

## Build and preview workflow

Use **Build** to create or edit the form, switch to **Preview** to validate it, and open **JSON** when the schema needs to be reviewed or copied.

# Templates in ASP.NET MVC Form Builder

Templates display third-party components inside ASP.NET MVC Form Builder fields. Configure `ToolboxItemSetting` objects and pass them through `.ToolboxItems(...)`.

## Add a template

Map a template to a widget with `Type` and set its template identifier with `Template`:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.FormBuilder

@{
    List<ToolboxItemSetting> toolboxItems = new List<ToolboxItemSetting>
    {
        new ToolboxItemSetting
        {
            Type = FormWidgetType.Textbox,
            Template = "#customWidgetTemplate"
        }
    };
}

@Html.EJS().FormBuilder("form-builder-control")
    .Schema(ViewData["formSchema"])
    .ToolboxItems(toolboxItems)
    .Render()

<script id="customWidgetTemplate" type="text/x-template">
    <input class="e-input"
           id="${fieldData.id}"
           name="${fieldData.name}"
           type="text"
           placeholder="${fieldData.placeholder}"
           data-field-id="${fieldData.id}" />
</script>
```

Add any number of `ToolboxItemSetting` instances to register multiple templates. The custom control renders after the field is dragged onto the canvas.

## Add template properties

Use the Form Builder instance's `setProperty` method to expose third-party component properties in the property panel. See [property-panel.md](property-panel.md).

## Export templates

The template implementation is not serialized in the exported schema. A `TemplateId` property identifies the template mapped to the corresponding element. Form Renderer requires additional configuration to render the template at runtime.

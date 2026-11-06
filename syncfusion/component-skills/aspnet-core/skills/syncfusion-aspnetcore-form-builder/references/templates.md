# Templates in ASP.NET Core Form Builder

Templates display third-party components inside ASP.NET Core Form Builder fields. Register custom controls with `e-form-builder-toolbox-items` and `e-form-builder-toolbox-item`.

## Add a template

Map a template to a widget with `type` and set the template identifier with `template`:

```cshtml
@model IndexModel

<ejs-form-builder schema="Model.FormSchema" id="form-builder-control">
    <e-form-builder-toolbox-items>
        <e-form-builder-toolbox-item type="Textbox" template="#inputTemplate">
        </e-form-builder-toolbox-item>
    </e-form-builder-toolbox-items>
</ejs-form-builder>

<script id="inputTemplate" type="text/javascript">
    <input class="e-input"
        id="form-builder-control-${fieldData.id}"
        name="${fieldData.name}"
        type="text"
        placeholder="${fieldData.placeholder}"
        data-field-id="${fieldData.id}" />
</script>
```

Add any number of toolbox items to register multiple templates. The custom control renders after the field is dragged onto the canvas.

## Add template properties

Use the Form Builder instance's `setProperty` method to expose third-party component properties in the property panel. See [property-panel.md](property-panel.md).

## Export templates

The template implementation is not serialized in the exported schema. A `templateId` property identifies the template mapped to the corresponding element. Form Renderer requires additional configuration to render the template at runtime.

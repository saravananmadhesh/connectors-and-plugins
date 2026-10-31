# Templates

## Overview

Templates can be displayed in the Form Renderer control to render third-party components within a form.

This section explains how to use templates in the Form Renderer component.

## Adding templates

Templates can be added to a form in Form Renderer by setting the `Template` property in `CustomWidgetSettings`. Map the template to a specific form field type by using the `Type` property in `CustomWidgetSettings`.

`CustomWidgetSettings` is an array property, so you can render any number of templates in the form.

The `setFieldValue` method is used to set the value of a form field programmatically. When templates are assigned, this method can be used to pass the value set in the third-party component to the Form Renderer control.

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.FormRenderer

<div>
    @Html.EJS().FormRenderer("form-renderer-control").CustomWidgetSettings(settings =>
    {
        settings.Type("textbox").Template("#inputTemplate").Add();
    }).Schema(ViewData["formSchema"]).Created("onFormRendererCreated").Render()
</div>
<script id="inputTemplate" type="text/x-template">
    <input class="e-input"
           id="${fieldData.id}"
           name="${fieldData.name}"
           type="text"
           placeholder="${fieldData.placeholder}"
           data-field-id="${fieldData.id}"/>
</script>
<script>
function onFormRendererCreated() {
    var formRendererInstance = ej.base.getComponent(
        document.getElementById('form-renderer-control'),
        'form-renderer'
    );
    if (!formRendererInstance) {
        console.error('FormRenderer instance not found!');
        return;
    }
    var rootEl = document.getElementById('form-renderer-control');

    rootEl.addEventListener('change', function (e) {
        var inputEl = e.target;
        var parentEl = inputEl.closest('[data-field-id]');
        if (!parentEl) return;

        var fieldId = parentEl.getAttribute('data-field-id');
        var value = inputEl.type === 'checkbox' ? inputEl.checked : inputEl.value;
        formRendererInstance.setFieldValue(fieldId, value);
    });

    rootEl.addEventListener('input', function (e) {
        var inputEl = e.target;
        var parentEl = inputEl.closest('[data-field-id]');
        if (!parentEl) return;

        var fieldId = parentEl.getAttribute('data-field-id');
        var value = inputEl.type === 'checkbox' ? inputEl.checked : inputEl.value;
        formRendererInstance.setFieldValue(fieldId, value);
    });

    rootEl.addEventListener('blur', function (e) {
        var inputEl = e.target;
        var parentEl = inputEl.closest('[data-field-id]');
        if (!parentEl) return;
        if (inputEl.type === 'checkbox') return;

        var fieldId = parentEl.getAttribute('data-field-id');
        formRendererInstance.setFieldValue(fieldId, inputEl.value);
    }, true);
}
</script>
```

```csharp
public partial class FormBuilderController : Controller
{
    public ActionResult Default()
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
                ["emailAddress"] = new TextboxProperty { Id = "t1", Name = "emailAddress", Type = "string", Label = "Email Address", TextboxType = "email", Required = true, Widget = "textbox", Placeholder = "Enter email address", TemplateId = "textboxtemplate" },
                ["password"] = new TextboxProperty { Id = "t2", Name = "password", Type = "string", Label = "Password", TextboxType = "password", Required = true, MinLength = 6, Widget = "textbox", Placeholder = "Enter password" },
                ["rememberMe"] = new CheckboxProperty { Id = "c1", Name = "rememberMe", Type = "boolean", Label = "Remember Me", Widget = "checkbox" },
                ["submit"] = new SubmitButtonProperty { Id = "s1", Name = "submit", Type = "button", Label = "Submit", ButtonType = "submit", Widget = "button", Style = "primary", Disabled = false }
            },
            Layout = new List<LayoutNode>
            {
                new LayoutNode { Type = "field", PropertyId = "emailAddress" },
                new LayoutNode { Type = "field", PropertyId = "password" },
                new LayoutNode { Type = "field", PropertyId = "rememberMe" },
                new LayoutNode { Type = "field", PropertyId = "submit" }
            },
            Settings = new SchemaSettings { Name = "Login Form" }
        };
    }
}
public abstract class BaseProperty
{
    [JsonProperty("id")] public string Id { get; set; }
    [JsonProperty("name")] public string Name { get; set; }
    [JsonProperty("type")] public string Type { get; set; }
    [JsonProperty("label")] public string Label { get; set; }
    [JsonProperty("widget")] public string Widget { get; set; }
    [JsonProperty("size")] public string Size { get; set; }
    [JsonProperty("placeholder")] public string Placeholder { get; set; }
    [JsonProperty("templateId")] public string TemplateId { get; set; }
}
public class TextboxProperty : BaseProperty
{
    [JsonProperty("textboxType")] public string TextboxType { get; set; }
    [JsonProperty("required")] public bool Required { get; set; }
    [JsonProperty("minLength")] public int? MinLength { get; set; }
}
public class CheckboxProperty : BaseProperty { }
public class SubmitButtonProperty : BaseProperty
{
    [JsonProperty("buttonType")] public string ButtonType { get; set; }
    [JsonProperty("style")] public string Style { get; set; }
    [JsonProperty("disabled")] public bool Disabled { get; set; }
}
public class Schema
{
    [JsonProperty("version")] public string Version { get; set; }
    [JsonProperty("properties")] public Dictionary<string, BaseProperty> Properties { get; set; }
    [JsonProperty("layout")] public List<LayoutNode> Layout { get; set; }
    [JsonProperty("settings")] public SchemaSettings Settings { get; set; }
}
public class SchemaSettings { [JsonProperty("name")] public string Name { get; set; } }
public class LayoutNode { [JsonProperty("type")] public string Type { get; set; } [JsonProperty("propertyId")] public string PropertyId { get; set; } }
```

## Adding a template to a single or specific field

You can also map a template to a single form field by using the `FieldName` and `TemplateId` properties.

- `FieldName` - This property uses the name value of the form field in the schema. If the field name in the schema matches this property during form rendering, the corresponding template is rendered.
- `TemplateId` - If the form field in the schema has a `templateId` property, assign the same value to this property. This maps the template to the corresponding form field.

> In this case, the `Type` property is not required.

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.FormRenderer

<div>
    @Html.EJS().FormRenderer("form-renderer-control").CustomWidgetSettings(settings =>
    {
        settings.TemplateId("emailTemplate").Template("#inputTemplate").Add();
        settings.FieldName("password").Template("#inputTemplate").Add();
    }).Schema(ViewData["formSchema"]).Created("onFormRendererCreated").Render()
</div>

<script id="inputTemplate" type="text/x-template">
    <input class="e-input"
            id="${fieldData.id}"
            name="${fieldData.name}"
            type="text"
            placeholder="${fieldData.placeholder}"
            data-field-id="${fieldData.id}"/>
</script>
<script>
    function onFormRendererCreated() {
        var formRendererInstance = ej.base.getComponent(
            document.getElementById('form-renderer-control'),
            'form-renderer'
        );
        if (!formRendererInstance) {
            console.error('FormRenderer instance not found!');
            return;
        }
        var rootEl = document.getElementById('form-renderer-control');

        rootEl.addEventListener('change', function (e) {
            var inputEl = e.target;
            var parentEl = inputEl.closest('[data-field-id]');
            if (!parentEl) return;

            var fieldId = parentEl.getAttribute('data-field-id');
            var value = inputEl.type === 'checkbox' ? inputEl.checked : inputEl.value;
            formRendererInstance.setFieldValue(fieldId, value);
        });

        rootEl.addEventListener('input', function (e) {
            var inputEl = e.target;
            var parentEl = inputEl.closest('[data-field-id]');
            if (!parentEl) return;

            var fieldId = parentEl.getAttribute('data-field-id');
            var value = inputEl.type === 'checkbox' ? inputEl.checked : inputEl.value;
            formRendererInstance.setFieldValue(fieldId, value);
        });

        rootEl.addEventListener('blur', function (e) {
            var inputEl = e.target;
            var parentEl = inputEl.closest('[data-field-id]');
            if (!parentEl) return;
            if (inputEl.type === 'checkbox') return;

            var fieldId = parentEl.getAttribute('data-field-id');
            formRendererInstance.setFieldValue(fieldId, inputEl.value);
        }, true);
    }
</script>
```

## Key guidance

Use custom templates when the default Syncfusion controls do not align with your UX requirements, or when you need a design-specific input while still keeping the schema and business rules declarative. Keep the schema as the source of truth and always sync the custom control back to the Form Renderer by calling `setFieldValue`.

# Templates in ASP.NET Core

## Table of Contents
- [Overview](#overview)
- [Register a widget template](#register-a-widget-template)
- [Target a field](#target-a-field)
- [Synchronize template values](#synchronize-template-values)
- [Key guidance](#key-guidance)

## Overview

In ASP.NET Core Razor Pages, register custom templates as child tag helpers of `<ejs-form-renderer>`. The template itself is a client-side script template referenced by its DOM id. Use this to replace a built-in widget with custom markup or a third-party control.

## Register a widget template

Use `<e-form-renderer-custom-widget-settings>` and one or more `<e-form-renderer-custom-widget-setting>` child tags. The `type` attribute targets a widget type; `template` refers to a script template by selector.

```cshtml
@page
@model FormRenderer.DefaultModel
@using Syncfusion.EJ2.FormRenderer

<ejs-form-renderer id="form-renderer-control"
                   schema="@Model.FormSchema"
                   created="onFormRendererCreated">
    <e-form-renderer-custom-widget-settings>
        <e-form-renderer-custom-widget-setting type="textbox"
                                               template="#inputTemplate">
        </e-form-renderer-custom-widget-setting>
    </e-form-renderer-custom-widget-settings>
</ejs-form-renderer>

<script id="inputTemplate" type="text/x-template">
    <input class="e-input"
           id="${fieldData.id}"
           name="${fieldData.name}"
           type="text"
           placeholder="${fieldData.placeholder}"
           data-field-id="${fieldData.id}" />
</script>
```

The Razor component also needs the standard Form Renderer tag helpers, stylesheet, client script, and `<ejs-scripts>` script manager described in the getting-started reference.

## Target a field

Use `fieldName` to match the field's schema `name`, or `templateId` to match the field's `templateId`. `type` is not required when targeting by either of these properties.

```cshtml
<e-form-renderer-custom-widget-settings>
    <e-form-renderer-custom-widget-setting templateId="emailTemplate"
                                           template="#inputTemplate">
    </e-form-renderer-custom-widget-setting>
    <e-form-renderer-custom-widget-setting fieldName="password"
                                           template="#inputTemplate">
    </e-form-renderer-custom-widget-setting>
</e-form-renderer-custom-widget-settings>
```

Set `TemplateId` on the corresponding C# schema property when targeting by template ID:

```csharp
["emailAddress"] = new TextboxProperty
{
    Id = "t1",
    Name = "emailAddress",
    Type = "string",
    Label = "Email Address",
    Widget = "textbox",
    TemplateId = "emailTemplate"
}
```

## Synchronize template values

Custom script-template markup does not automatically update Form Renderer state. Handle input/change events after the form is created and call `setFieldValue` with the field id and current control value. Handle checkbox values as booleans.

```html
<script>
  function onFormRendererCreated() {
    const formRenderer = ej.base.getComponent(
      document.getElementById('form-renderer-control'),
      'form-renderer'
    );
    const root = document.getElementById('form-renderer-control');

    root.addEventListener('input', (event) => {
      const input = event.target;
      const field = input.closest('[data-field-id]');
      if (!field) return;

      const fieldId = field.getAttribute('data-field-id');
      const value = input.type === 'checkbox' ? input.checked : input.value;
      formRenderer.setFieldValue(fieldId, value);
    });
  }
</script>
```

Return a focusable interactive control and preserve its current value. Keep the template's actual input synchronized with renderer state rather than only changing its DOM value.

## Key guidance

Use the ASP.NET Core custom-widget tag helpers to register templates, and keep C# schema setup, Razor markup, and client-side value synchronization in their appropriate layers.

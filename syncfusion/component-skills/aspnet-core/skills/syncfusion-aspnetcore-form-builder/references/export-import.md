# Exporting and Importing Schemas

The ASP.NET Core Form Builder supports exporting the generated schema for reuse in Form Renderer and importing an existing schema for further editing.

## Export form schema

Use the **Export** button in the Form Builder toolbar to export the form definition.

## Disable export

Set `allowExport` to `false`:

```cshtml
<ejs-form-builder id="form-builder-control"
                  allowExport="false">
</ejs-form-builder>
```

The default value is `true`.

## Import form schema

Bind the exported schema through the `schema` attribute:

```cshtml
@page
@model IndexModel
@using Syncfusion.EJ2.FormBuilder

<ejs-form-builder id="form-builder-control"
                  schema="Model.FormSchema">
</ejs-form-builder>
```

```csharp
public class IndexModel : PageModel
{
    public Schema FormSchema { get; set; }

    public void OnGet()
    {
        FormSchema = new Schema
        {
            Version = "0.1.0",
            Properties = new Dictionary<string, BaseProperty>
            {
                ["emailAddress"] = new TextboxProperty { Id = "t1", Name = "emailAddress", Type = "string", Label = "Email Address", TextboxType = "email", Required = true, Widget = "textbox" },
                ["password"] = new TextboxProperty { Id = "t2", Name = "password", Type = "string", Label = "Password", TextboxType = "password", Required = true, MinLength = 6, Widget = "textbox" },
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
```

This loads the schema so the builder can continue editing the same form definition.

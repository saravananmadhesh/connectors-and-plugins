# Getting Started with ASP.NET Core Form Builder

The Syncfusion ASP.NET Core Form Builder is a visual form designer. Users drag fields onto a design canvas, configure field properties, preview the result, and export the generated schema for use with the Form Renderer.

This guide uses an ASP.NET Core Razor Pages application.

## Prerequisites

Review the [ASP.NET Core system requirements](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements) before creating the application.

## Create an ASP.NET Core Web App

Create a Razor Pages application with Visual Studio or run:

```bash
dotnet new webapp -o RazorPagesFormBuilder
cd RazorPagesFormBuilder
```

## Install the required packages

Install the Form Builder and theme packages:

```bash
dotnet add package Syncfusion.AspNetCore.FormBuilder
dotnet add package Syncfusion.AspNetCore.Themes
```

The same packages can be installed from the Visual Studio NuGet Package Manager or Package Manager Console.

## Add ASP.NET Core tag helpers

In `Pages/_ViewImports.cshtml`:

```cshtml
@addTagHelper *, Syncfusion.AspNetCore.FormBuilder
@addTagHelper *, Syncfusion.AspNetCore.Base
```

## Add stylesheet and script resources

In `Pages/Shared/_Layout.cshtml`, add the theme stylesheet and Form Builder script inside `<head>`:

```cshtml
<link rel="stylesheet" href="_content/Syncfusion.AspNetCore.Themes/styles/fluent2.css" />
<script src="_content/Syncfusion.AspNetCore.FormBuilder/scripts/sf-formbuilder.min.js"></script>
```

Register the script manager at the end of `<body>`:

```cshtml
<ejs-scripts></ejs-scripts>
```

## Add the Form Builder

In `Pages/FormBuilder/Default.cshtml`:

```cshtml
@page
@model FormBuilder.DefaultModel
@using Syncfusion.EJ2.FormBuilder

<ejs-form-builder></ejs-form-builder>
```

The code-behind page model can start with:

```csharp
public class DefaultModel : PageModel
{
    public void OnGet()
    {
    }
}
```

## Run the application

Launch the application from Visual Studio with `Ctrl+F5`, or use:

```bash
dotnet run
```

The Form Builder renders with its toolbox, design canvas, property panel, code view, and preview.

## Load an initial form schema

Bind a C# schema model to the `schema` tag-helper attribute when the customer asks for an initial form.

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
}
```

Keep schema classes aligned with the serialized schema names. The schema contains field definitions in `Properties`, layout nodes in `Layout`, and form-wide values in `Settings`. Read [form-schema.md](form-schema.md) for the complete schema model.

## Form Builder properties

Use these ASP.NET Core tag-helper attributes on `<ejs-form-builder>`:

| Property | Type | Default | Purpose |
|---|---|---|---|
| `locale` | `string` | `'en-US'` | Sets the locale. |
| `allowExport` | `boolean` | `true` | Enables or disables schema export. |
| `enablePreview` | `boolean` | `true` | Enables or disables preview. |
| `enablePersistence` | `boolean` | `false` | Persists builder state and schema. |
| `enableRtl` | `boolean` | `false` | Enables right-to-left rendering. |
| `mode` | `Simple` or `Developer` | `Developer` | Selects the builder experience. |
| `formTemplates` | model expression | `null` | Supplies reusable form templates. |
| `toolboxCategories` | model expression | `null` | Configures toolbox categories. |
| `toolboxItems` | model expression | `[]` | Supplies toolbox items and templates. |
| `schema` | model expression or JSON | `null` | Loads the form schema for editing. |
| `enableHtmlSanitizer` | `boolean` | `false` | Sanitizes HTML in custom templates. |

Example:

```cshtml
<ejs-form-builder id="form-builder-control"
                  schema="Model.FormSchema"
                  allowExport="true"
                  enablePreview="true"
                  enablePersistence="false"
                  enableRtl="false"
                  mode="Developer"
                  toolboxCategories="Model.ToolboxItemCategories">
</ejs-form-builder>
```

The Templates tab is available in Developer mode. Use the toolbox and property panel to build the form, then inspect the JSON code view before exporting.

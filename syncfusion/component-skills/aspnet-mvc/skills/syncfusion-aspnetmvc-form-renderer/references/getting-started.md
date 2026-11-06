# Getting Started with ASP.NET MVC Form Renderer Control

## Overview

The Form Renderer is a powerful, schema-driven component that enables you to build and render complex forms with ease using a structured JSON schema definition. Instead of manually wiring every field, validator, and layout, the form is expressed as a declarative schema and then bound through the MVC HTML helper.

## Install the package

To add ASP.NET MVC controls in the application, open the NuGet Package Manager in Visual Studio, search for `Syncfusion.EJ2.MVC5`, and install it.

```bash
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

> The package includes the MVC controls and required dependencies such as `Newtonsoft.Json` and `Syncfusion.Licensing`.

## Add the namespace and theme

Add the `Syncfusion.EJ2` namespace under the `Views` section of `Web.config`:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

Then include the stylesheet and script references in `~/Views/Shared/_Layout.cshtml`:

```cshtml
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent2.css" />
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
<body>
    @Html.EJS().ScriptManager()
</body>
```

## Basic implementation

Create a schema model in C# and assign it from the controller to the view:

```csharp
public class FormRendererData
{
    public Schema GetData() => new Schema
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
```

```csharp
public class HomeController : Controller
{
    public ActionResult Index()
    {
        ViewData["formSchema"] = new FormRendererData().GetData();
        return View();
    }
}
```

Then render it in the MVC view with the HTML helper:

```cshtml
@using Syncfusion.EJ2.FormRenderer

@Html.EJS().FormRenderer("form-renderer-control")
    .Schema((ViewData["formSchema"]))
    .Render()
```

## Run the app

Press `Ctrl + F5` to run the application in the browser. The Form Renderer control will render the form defined by the schema.

## Key takeaway

The Form Renderer is best for schema-driven MVC forms where field definitions, validation, layout, and actions are expressed in one server-generated schema instead of manually hand-writing the form logic.

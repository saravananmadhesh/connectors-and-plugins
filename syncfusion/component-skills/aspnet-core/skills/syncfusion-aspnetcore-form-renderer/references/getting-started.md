# Getting Started with ASP.NET Core Form Renderer

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Create a Razor Pages app](#create-a-razor-pages-app)
- [Install NuGet packages](#install-nuget-packages)
- [Register tag helpers](#register-tag-helpers)
- [Add static assets and script manager](#add-static-assets-and-script-manager)
- [Render the Form Renderer](#render-the-form-renderer)
- [Run the application](#run-the-application)
- [Register a license](#register-a-license)

## Overview

The ASP.NET Core Form Renderer uses a JSON-based schema to describe fields, layout, validation, and actions. In Razor Pages, construct the schema in a C# page model and pass it to the `<ejs-formrenderer>` tag helper.

## Prerequisites

Check the ASP.NET Core system requirements and have Visual Studio or Visual Studio Code with the .NET SDK installed.

## Create a Razor Pages app

Create a project with Visual Studio's ASP.NET Core Web App template or use the .NET CLI:

```bash
dotnet new webapp -o RazorPagesFormRenderer
cd RazorPagesFormRenderer
```

## Install NuGet packages

Install the Form Renderer and themes packages with the .NET CLI:

```bash
dotnet add package Syncfusion.AspNetCore.FormRenderer
dotnet add package Syncfusion.AspNetCore.Themes
```

Visual Studio users can install the same NuGet packages through **Manage NuGet Packages for Solution**.

## Register tag helpers

Add the Form Renderer and base tag helpers to `Pages/_ViewImports.cshtml`:

```cshtml
@addTagHelper *, Syncfusion.AspNetCore.FormRenderer
@addTagHelper *, Syncfusion.AspNetCore.Base
```

## Add static assets and script manager

Reference the theme stylesheet and Form Renderer script in the `<head>` of `Pages/Shared/_Layout.cshtml`. Register the script manager before the closing `</body>` tag:

```cshtml
<head>
    <link rel="stylesheet" href="_content/Syncfusion.AspNetCore.Themes/styles/fluent2.css" />
    <script src="_content/Syncfusion.AspNetCore.FormRenderer/scripts/sf-formrenderer.min.js"></script>
</head>
<body>
    @RenderBody()
    <ejs-scripts></ejs-scripts>
</body>
```

## Render the Form Renderer

In a Razor page such as `Pages/FormRenderer/Default.cshtml`, import the Form Renderer namespace and bind the page model's schema:

```cshtml
@page
@model FormRenderer.DefaultModel
@using Syncfusion.EJ2.FormRenderer

<ejs-formrenderer id="registrationForm" schema="@Model.FormSchema"></ejs-formrenderer>
```

Define the schema in `Default.cshtml.cs`. The following model includes text, checkbox, and submit fields; the CLR classes describe the serialized schema shapes.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using Syncfusion.EJ2.FormRenderer;

public class DefaultModel : PageModel
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
                },
                ["rememberMe"] = new CheckboxProperty
                {
                    Id = "c1", Name = "rememberMe", Type = "boolean",
                    Label = "Remember Me", Widget = "checkbox"
                },
                ["submit"] = new SubmitButtonProperty
                {
                    Id = "s1", Name = "submit", Type = "button",
                    Label = "Submit", ButtonType = "submit",
                    Widget = "button", Style = "primary", Disabled = false
                }
            },
            Layout = new List<LayoutNode>
            {
                new LayoutNode { Type = "field", PropertyId = "emailAddress" },
                new LayoutNode { Type = "field", PropertyId = "rememberMe" },
                new LayoutNode { Type = "field", PropertyId = "submit" }
            },
            Settings = new SchemaSettings { Name = "Contact Form" }
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
}

public class TextboxProperty : BaseProperty
{
    [JsonProperty("textboxType")] public string TextboxType { get; set; }
    [JsonProperty("required")] public bool Required { get; set; }
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

public class SchemaSettings
{
    [JsonProperty("name")] public string Name { get; set; }
}

public class LayoutNode
{
    [JsonProperty("type")] public string Type { get; set; }
    [JsonProperty("propertyId")] public string PropertyId { get; set; }
}
```

The project may organize the page model and schema classes in separate files; keep the `Schema`, property, and layout classes accessible to the Razor Page.

## Run the application

Launch the ASP.NET Core app from Visual Studio with **Ctrl+F5** (Windows) or **Command+F5** (macOS). The Form Renderer opens in the default browser.

## Register a license

Register a valid Syncfusion license key in the application to prevent license validation warnings. Follow the ASP.NET Core licensing documentation for the supported registration steps.

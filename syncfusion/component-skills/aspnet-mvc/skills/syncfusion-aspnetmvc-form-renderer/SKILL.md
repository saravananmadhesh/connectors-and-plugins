---
name: syncfusion-aspnetmvc-form-renderer
description: Comprehensive guide to implementing, configuring, and customizing Syncfusion ASP.NET MVC Form Renderer forms from JSON schemas. Use when building or troubleshooting ASP.NET MVC forms, defining C# schema models, choosing supported field widgets, laying out panels and form sections, binding dropdown and checkbox options, configuring grid data sources, applying validation and conditional rules, using expressions, handling submit/change/button events, or implementing grouped actions. Check the component support matrix before applying conditional rules.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion ASP.NET MVC Form Renderer

Use this skill when a user needs to generate, troubleshoot, or extend a schema-driven ASP.NET MVC form with the Syncfusion Form Renderer component. The form schema is usually built in C# and passed to the Razor view through `ViewData`, while the actual rendering is done with the MVC HTML helper.

## When to use this skill

Use this skill when the user needs to:

- create an ASP.NET MVC app and install the Syncfusion MVC NuGet package
- define a form with `properties`, `layout`, and `settings`
- add required, pattern, minLength, maxLength, or custom validation rules
- show or hide fields based on previous answers
- build dependent dropdowns or cascaded option lists
- constrain numeric/date values from another field with `minMaxRange`
- calculate values with `expressionValue` and external references
- handle submit, reset, and custom button actions
- define grouped button actions with `allowMultiple` and `buttonsGroups`
- replace built-in widgets with custom templates in an ASP.NET MVC view or custom field rendering

## Quick start

1. Create an ASP.NET MVC app in Visual Studio and install the MVC package:

```bash
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

2. Add the `Syncfusion.EJ2` namespace under `Views` in `Web.config`:

```xml
<namespaces>
  <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

3. Add the dependent stylesheet and script resources in `~/Views/Shared/_Layout.cshtml`:

```cshtml
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent2.css" />
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
<body>
    @Html.EJS().ScriptManager()
</body>
```

4. Build the `schema` on the server and assign it to the view:

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

5. Render the form with the HTML helper in the MVC view:

```cshtml
@using Syncfusion.EJ2.FormRenderer

@Html.EJS().FormRenderer("form-renderer-control")
    .Schema((ViewData["formSchema"]))
    .Render()
```

6. Keep the schema declarative: validation, conditions, expressions, and layout live on the same schema object that the form uses.

## Documentation and navigation guide

### Getting started
Read [references/getting-started.md](references/getting-started.md)

- ASP.NET MVC project setup and HTML helper flow
- NuGet installation and theme/script registration
- server-side schema model and `ViewData` binding
- basic `schema` + `submit` example using `@Html.EJS().FormRenderer(...)`

### Form schema and field model
Read [references/form-schema.md](references/form-schema.md)

- root object structure: `version`, `properties`, `layout`, `settings`
- all supported field widgets, their data types, and the UI interactions they provide
- per-field presentation options and choosing widgets to match customer preferences
- layout examples for panels, tables, tabs, and cards, including how container children reference fields
- field IDs, names, labels, types, and common metadata

### Validation
Read [references/validations.md](references/validations.md)

- built-in rules like `required`, `minLength`, `maxLength`, and `pattern`
- custom validation with `customValidation` and `valid = ...`
- when validation runs on submit versus change

### Conditional behavior
Read [references/conditions.md](references/conditions.md)

- `visibleWhen`, `hideWhen`, `requiredWhen`, `readOnlyWhen`, `disabledWhen`
- rule schema, nested `and` / `or` groups, complete operator list, and each rule's effects
- component-by-component support matrix showing which condition types are supported or ignored
- `setValueWhen` and `choiceBasedField` configuration concepts

### Dynamic expressions
Read [references/expressions.md](references/expressions.md)

- `expressionValue` for derived values from other fields
- field references, array indexes, grouping, ternary syntax, and arithmetic/comparison/logical operators
- constants including `PI`, `TRUE`, `FALSE`, `NULL`, and `Math`
- aggregate, math, string, and date functions, including `DATEFORMAT`, with syntax and return types

### Dependent dropdowns
Read [references/dependent-dropdown.md](references/dependent-dropdown.md)

- cascading options with `choiceBasedField`
- `primaryFieldId` and `choiceMapping`
- `showAllWhenNotMapped` behavior for missing values

### Range logic based on other fields
Read [references/min-max-range.md](references/min-max-range.md)

- `minMaxRange` with `field` reference objects
- numeric and date range constraints driven by another field
- apply fixed `min` / `max` rules vs cross-field range rules

### Remote data binding
Read [references/remote-data-binding-in-components.md](references/remote-data-binding-in-components.md)

- remote option sources for dropdown, multiselect, and checkbox group fields
- URL adaptors, response `dataPath`, request headers, and dynamic search/filter values
- search, sort, filter, skip, and take query configuration

### Data grid features
Read [references/data-grid-features.md](references/data-grid-features.md)

- static and remote grid data sources
- column editing, validation, custom validation, and expressions
- conditional data sources driven by other form fields
- grid search, sort, filter, and paging configuration

### Form actions and templates
Read [references/form-actions.md](references/form-actions.md) and [references/templates.md](references/templates.md)

- `buttonType: 'submit'`, `'reset'`, and `'button'`, plus grouped button actions
- `submit` / `buttonClick` behavior and custom logic
- `submit`, `change`, `buttonClick`, `failure`, and `created` events, including their arguments and lifecycle behavior
- `allowMultiple` and `buttonsGroups` item labels, actions, styles, icons, and disabled state
- custom widget templates that replace the default rendering for a field or widget type
- keeping a focusable control connected to Form Renderer state when a custom template is used
- updating the model from a custom field template while preserving the active field focus

## Common patterns

- Keep `name` values stable because they are used as payload keys and references in expressions.
- Use `layout` objects to organize fields in panels, tables, tabs, or cards.
- When a control depends on another field, prefer `choiceBasedField` for cascading dropdown lists and `minMaxRange` for dynamic min/max limits.
- Store validation and conditional logic next to the field they affect so the schema remains easy to reason about.
- Prefer `buttonType: 'submit'` for final validation and `buttonType: 'button'` when custom action logic is required.

## Implementation checklist

When building or fixing a Form Renderer schema, confirm:

- every field has a unique `name` and `id`
- `layout` references valid `propertyId` values
- supported widgets match the field types
- conditional fields use valid `field` references and operators
- dynamic expressions reference existing field names with `{name}` syntax
- custom validation assigns `valid = true` or a string error message
- submit buttons are included when form submission is required

This skill is intended to help generate working ASP.NET MVC Form Renderer forms from the docs in this repository without inventing unsupported schema properties.

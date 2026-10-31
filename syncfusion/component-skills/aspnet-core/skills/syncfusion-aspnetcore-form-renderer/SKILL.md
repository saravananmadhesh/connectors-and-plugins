---
name: syncfusion-aspnetcore-form-renderer
description: Comprehensive guide to implementing, configuring, and customizing Syncfusion ASP.NET Core Form Renderer forms from JSON schemas. Use when building or troubleshooting Razor Pages forms, defining C# schemas and tag helpers, choosing supported field widgets, configuring layouts and templates, adding validation and conditional rules, binding remote data, configuring grid data sources and columns, using expressions, handling submit/change/button events, or implementing grouped actions. Check the component support matrix before applying conditional rules.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion ASP.NET Core Form Renderer

Use this skill when a user needs to generate, troubleshoot, or extend a schema-driven ASP.NET Core form with the Syncfusion Form Renderer component. The form schema declares field definitions, layout, validation, dynamic behavior, and submission actions; Razor Pages provide the host and C# model.

## When to use this skill

Use this skill when the user needs to:

- create an ASP.NET Core Razor Pages app and install the Form Renderer NuGet packages
- define a form with `properties`, `layout`, and `settings`
- add required, pattern, minLength, maxLength, or custom validation rules
- show or hide fields based on previous answers
- build dependent dropdowns or cascaded option lists
- constrain numeric/date values from another field with `minMaxRange`
- calculate values with `expressionValue` and external references
- handle submit, reset, and custom button actions
- define grouped button actions with `allowMultiple` and `buttonsGroups`
- replace built-in widgets with custom templates in ASP.NET Core Razor Pages

## Quick start

1. Create an ASP.NET Core Razor Pages app:

```bash
dotnet new webapp -o RazorPagesFormRenderer
cd RazorPagesFormRenderer
```

2. Install the Form Renderer and theme NuGet packages:

```bash
dotnet add package Syncfusion.AspNetCore.FormRenderer
dotnet add package Syncfusion.AspNetCore.Themes
```

3. Register the Form Renderer tag helpers in `Pages/_ViewImports.cshtml`:

```cshtml
@addTagHelper *, Syncfusion.AspNetCore.FormRenderer
@addTagHelper *, Syncfusion.AspNetCore.Base
```

4. Add the theme CSS, renderer script, and script manager in `Pages/Shared/_Layout.cshtml`:

```cshtml
<head>
    <link rel="stylesheet" href="_content/Syncfusion.AspNetCore.Themes/styles/fluent2.css" />
    <script src="_content/Syncfusion.AspNetCore.FormRenderer/scripts/sf-formrenderer.min.js"></script>
</head>
<body>
    <!-- Page content -->
    <ejs-scripts></ejs-scripts>
</body>
```

5. Render the schema from a Razor Page:

```cshtml
@page
@model FormRenderer.DefaultModel
@using Syncfusion.EJ2.FormRenderer

<ejs-form-renderer id="registrationForm" schema="@Model.FormSchema"></ejs-form-renderer>
```

Build `Model.FormSchema` in the page model using the C# schema/property classes. See the getting-started reference for the complete schema model and example.

6. Run the app from Visual Studio, or use `Ctrl+F5` to launch it without debugging.

## Documentation and navigation guide

### Getting started
Read [references/getting-started.md](references/getting-started.md)

- ASP.NET Core Razor Pages project setup
- Form Renderer and theme NuGet packages
- tag-helper registration and static asset setup
- basic `schema` + `submit` example
- render the form with the ASP.NET Core tag helper

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
- custom widget templates using ASP.NET Core custom-widget tag helpers
- all `CustomWidgetSettingModel` properties and HTML sanitizer behavior
- native or custom-component templates with a focusable control, bound value, and `setFieldValue` synchronization
- preserving the active input focus without forcing autofocus on render
- updating Form Renderer state from a custom field template

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

This skill is intended to help generate working ASP.NET Core Form Renderer forms from the docs in this repository without inventing unsupported schema properties.

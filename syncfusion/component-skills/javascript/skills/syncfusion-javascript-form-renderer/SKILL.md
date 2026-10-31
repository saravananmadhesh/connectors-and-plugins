---
name: syncfusion-javascript-form-renderer
description: Comprehensive guide to implementing, configuring, and customizing Syncfusion JavaScript Form Renderer forms from JSON schemas using the TypeScript module workflow. Use when building or troubleshooting forms, choosing supported field widgets, configuring field UI and templates, arranging panels, tables, tabs, and cards, binding dropdown, multiselect, and checkbox-group options to remote data, configuring grid data sources, conditional data, columns, expressions, validation, remote search, sorting, filters, and paging, adding built-in or custom validation, applying conditional rules, dependent dropdowns, dynamic min/max ranges, expression-driven values, or individual and grouped form actions. All implementation examples use TypeScript ES modules.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion JavaScript Form Renderer

Use this skill when a user needs to generate, troubleshoot, or extend a schema-driven form with the Syncfusion Form Renderer TypeScript module. The Form Renderer is built around a single JSON schema that declares field definitions, layout, validation, dynamic behavior, and submission actions.

## When to use this skill

Use this skill when the user needs to:

- create a TypeScript application and install the Syncfusion Form Renderer package
- define a form with `properties`, `layout`, and `settings`
- add required, pattern, minLength, maxLength, or custom validation rules
- show or hide fields based on previous answers
- build dependent dropdowns or cascaded option lists
- constrain numeric/date values from another field with `minMaxRange`
- calculate values with `expressionValue` and external references
- handle submit, reset, and custom button actions
- define grouped button actions with `allowMultiple` and `buttonsGroups`
- replace built-in widgets with custom templates using the TypeScript module API

## Quick start

1. Clone and enter the TypeScript webpack quickstart project:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-quickstart
cd ej2-quickstart
```

2. Install Form Renderer and project dependencies:

```bash
npm install @syncfusion/ej2-form-renderer --save
npm install
```

3. Install the Material 3 theme and import it from `src/styles/styles.css`:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

```css
@import "../../node_modules/@syncfusion/ej2-material3-theme/styles/material3.css";
```

4. Add the mount element to `src/index.html`:

```html
<div id="formrenderer"></div>
```

5. Initialize the vanilla TypeScript Form Renderer in `src/app/app.ts`:

```ts
import { FormRenderer, type SubmitEventArgs } from '@syncfusion/ej2-form-renderer';

const formRenderer: FormRenderer = new FormRenderer({
  schema: {
    version: '0.1.0',
    properties: {
      emailAddress: {
        id: 'textbox_email',
        name: 'emailAddress',
        type: 'string',
        label: 'Email Address',
        textboxType: 'email',
        required: true,
        widget: 'textbox'
      },
      submit: {
        id: 'submit_button',
        name: 'defaultSubmit',
        type: 'button',
        label: 'Submit',
        buttonType: 'submit',
        widget: 'button'
      }
    },
    layout: [
      { type: 'field', propertyId: 'emailAddress' },
      { type: 'field', propertyId: 'submit' }
    ],
    settings: { name: 'Contact Form' }
  },
  submit: (args: SubmitEventArgs): void => {
    console.log(args.data, args.isValid);
  }
});

formRenderer.appendTo('#formrenderer');
```

6. Run the application with `npm run start` using the TypeScript module API.

## Documentation and navigation guide

### Getting started
Read [references/getting-started.md](references/getting-started.md)

- TypeScript webpack quickstart setup and package installation
- Material 3 theme CSS setup
- basic `schema` + `submit` example
- run the app locally with `npm run start`

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
- custom widget templates using `customWidgetSettings` by widget type, field name, or template ID
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

This skill is intended to help generate working TypeScript Form Renderer implementations from the docs in this repository without inventing unsupported schema properties.

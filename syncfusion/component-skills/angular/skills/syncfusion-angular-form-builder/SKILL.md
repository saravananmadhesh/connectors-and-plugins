---
name: syncfusion-angular-form-builder
description: Comprehensive guide to implementing, configuring, and customizing Syncfusion Angular Form Builder forms. Use when creating an Angular form designer, loading an initial schema, configuring Form Builder properties, choosing toolbox fields, defining templates, editing field properties, handling drag and property-change events, previewing JSON, importing or exporting schemas, or preparing a schema for Form Renderer. Read the schema references for validation, conditions, expressions, dependent dropdowns, dynamic ranges, remote data, and Data Grid fields.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Angular Form Builder

Use this skill when a user needs to create, troubleshoot, or extend an editable Angular form with the Syncfusion Form Builder. The Form Builder is a visual designer that produces a schema-driven form definition: users can drag fields onto a canvas, configure them in the property panel, preview the result, and export the schema for use with Form Renderer.

## When to use this skill

Use this skill when the user needs to:

- create an Angular app and install the Syncfusion Form Builder package
- render a visual form designer with a toolbox, canvas, property panel, code view, and preview
- load an initial form through the `schema` property
- define fields in `properties`, arrange them in `layout`, and set form-wide `settings`
- configure Form Builder properties such as export, preview, persistence, RTL, mode, templates, and toolbox items
- choose fields from Basic, Advanced, and Layout toolbox categories
- customize field properties, add or hide property-panel entries, and refresh the designer
- define custom toolbox templates and synchronize template values with `setFieldValue`
- handle field drag-start, drag-over, drop, and property-changed events
- review, copy, import, or export a generated JSON schema
- prepare schemas containing validation, conditions, expressions, dependent dropdowns, dynamic ranges, remote data, or Data Grid fields

This skill is for designing and editing forms. Use the Form Renderer skill when the primary task is rendering a finished schema for end users, handling submitted values, or configuring renderer form actions.

## Documentation and Navigation Guide

### Component API and Events
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- All Form Builder properties, types, and defaults
- Simple and Developer modes
- `schema`, export, preview, persistence, RTL, templates, and toolbox configuration
- Field drag-start, drag-over, drop, and property-changed event payloads

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Angular setup and module registration
- Basic Form Builder usage
- Binding the form schema to the component
- Minimal working example for authoring a form

### Schema and Initial Form Setup
📄 **Read first:** [references/form-schema.md](references/form-schema.md)
- The `schema` property and root schema structure
- Field definitions in `properties` and rendering order in `layout`
- Form settings, supported widgets, and layout containers
- Matching each requested field to its documented `widget` and `type`

When a customer asks for a Form Builder with an initial form, create the Angular component setup from `references/getting-started.md`, then define the initial `schema` using `references/form-schema.md`. Read the following references when the requested schema needs the corresponding behavior:

- **Validation rules:** [references/validations.md](references/validations.md)
- **Conditional behavior:** [references/conditions.md](references/conditions.md)
- **Calculated values:** [references/expressions.md](references/expressions.md)
- **Dependent dropdowns:** [references/dependent-dropdown.md](references/dependent-dropdown.md)
- **Dynamic numeric/date/time bounds:** [references/min-max-range.md](references/min-max-range.md)
- **Remote dropdown, multiselect, or checkbox-group data:** [references/remote-data-binding-in-components.md](references/remote-data-binding-in-components.md)
- **Data Grid fields and data sources:** [references/data-grid-features.md](references/data-grid-features.md)

### Field Components Panel
📄 **Read:** [references/field-components-panel.md](references/field-components-panel.md)
- Fields and Templates tabs
- Basic, Advanced, and Layout categories
- Search/filter behavior and toolbox customizations
- Custom template libraries and `formTemplates`

### Property Panel
📄 **Read:** [references/property-panel.md](references/property-panel.md)
- When the panel appears for selected fields
- Display, Validation, Conditions, Layout, and Data tabs
- `setProperty` and `getProperty` patterns
- Auto-save and property refresh behaviors

### Preview and JSON
📄 **Read:** [references/preview-tab.md](references/preview-tab.md)
- Preview tab workflow
- Disabling preview with `enablePreview`
- JSON schema review and copy actions

### Templates
📄 **Read:** [references/templates.md](references/templates.md)
- Defining custom toolbox templates with `e-toolboxitemsetting`
- Using `templateId` during export
- Mapping third-party components to the schema

### Form Settings
📄 **Read:** [references/form-settings.md](references/form-settings.md)
- Global form title and width
- Layout-level settings like Hide Label, Size, and Float Label Type
- Applying form-wide configuration without affecting individual fields

### Export and Import
📄 **Read:** [references/export-import.md](references/export-import.md)
- Exporting the schema for Form Renderer reuse
- Importing an existing schema back into Form Builder
- Disabling export with `allowExport`

## Quick Start

1. Install the package:

```bash
ng add @syncfusion/ej2-angular-form-builder
```

2. Import the Form Builder module and bind an initial schema:

```ts
import { Component, ViewChild } from '@angular/core';
import { FormBuilderComponent, FormBuilderModule } from '@syncfusion/ej2-angular-form-builder';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormBuilderModule],
  template: `
    <ejs-form-builder #formObj [schema]="schema"></ejs-form-builder>
  `
})
export class AppComponent {
  @ViewChild('formObj') public formObj?: FormBuilderComponent;

  public schema = {
    version: '0.1.0',
    properties: {
      emailAddress: {
        id: 'textbox_1785491685456_167',
        name: 'emailAddress',
        type: 'string',
        label: 'Email Address',
        textboxType: 'email',
        required: true,
        placeholder: 'Enter your email',
        widget: 'textbox'
      }
    },
    layout: [
      { type: 'field', propertyId: 'emailAddress' }
    ],
    settings: {
      name: 'Untitled Form'
    }
  };
}
```

3. Start the Angular application with `ng serve`, then use the toolbox and property panel to edit the form. Read [references/getting-started.md](references/getting-started.md) for theme setup, application creation, and the complete initial setup.

## Common Patterns

### Customizing the toolbox
Use `toolboxCategories` to control which field types appear in the toolbox and in which category they are grouped.

```ts
public toolboxCategories = [
  {
    category: ComponentCategory.Basic,
    items: [FormWidgetType.Textbox, FormWidgetType.Textarea]
  },
  {
    category: ComponentCategory.Advanced,
    items: [FormWidgetType.Date, FormWidgetType.DateRange]
  }
];
```

### Adding a property dynamically
Use `setProperty` to add a custom property to a widget and `refresh()` to update the panel.

```ts
this.formObj?.setProperty(FormWidgetType.Textarea, {
  key: 'enableRtl',
  label: 'Enable RTL',
  type: 'boolean',
  default: false
});
```

### Registering a custom template
Define a third-party custom control in `e-toolboxitemsettings` and call `setFieldValue` when the value changes.

```ts
<e-toolboxitemsetting [type]="formType">
  <ng-template #template let-data>
    <input [value]="data.value || ''" (input)="onInputChange($event, data)" />
  </ng-template>
</e-toolboxitemsetting>
```

### Using preview and JSON output
Switch to the Preview tab to validate layout and interactions, then open the JSON tab to inspect the exported schema and copy it for use in Form Renderer.

## Common patterns

- Keep every field in `properties` and reference it from `layout` using its `propertyId`.
- Give each field a stable unique `name` and `id`; use the documented `id` and `name` references for conditions, expressions, and dependent data.
- Match each requested field's `widget` and `type` to the supported schema inventory in [references/form-schema.md](references/form-schema.md).
- Use `toolboxCategories` or `toolboxItems` to control the fields available in the visual toolbox.
- Use `formTemplates` for reusable complete schemas and custom toolbox templates for third-party controls.
- Validate the form in Preview, inspect the JSON tab, and export only after the schema and layout are correct.
- Use the API event payloads for designer interaction state; use Form Renderer events for runtime values and submission behavior.

## Implementation checklist

When building or fixing a Form Builder form, confirm:

- the Angular package and theme are installed and the Form Builder module is imported
- the `schema` value is an object, JSON string, or supported schema instance
- every field has a unique `name`, stable `id`, supported `widget`, and matching `type`
- every `layout` field node references a valid `propertyId`
- layout containers remain in `layout`, while their child fields remain in `properties`
- validation, conditions, expressions, ranges, and data sources use the documented reference shape
- custom templates update Form Builder state with `setFieldValue`
- preview and export are enabled or disabled according to the requested workflow
- drag and property-change handlers use the event names and payload members in [references/getting-started.md](references/getting-started.md)

## Typical workflows

- Start by creating the base schema and loading it into the builder.
- Use toolbox categories and predefined templates to structure the form design.
- Edit field properties in the right pane for validation, layout, and display behavior.
- Validate the final form in Preview before exporting the schema.
- Reimport the schema later to continue editing or adjust a generated form.

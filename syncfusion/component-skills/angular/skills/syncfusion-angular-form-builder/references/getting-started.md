# Getting Started with Angular Form Builder

The Syncfusion Angular Form Builder is a visual form designer. Users drag fields from the toolbox onto a design canvas, edit field properties, preview the result, and export the generated schema for use with the Form Renderer.

This guide covers Angular application setup, package and theme installation, the first visual Form Builder, and loading an initial form through the `schema` property.

## Prerequisites

- Install a supported Node.js LTS release and npm or another Node package manager.
- Ensure the Angular and Syncfusion package versions satisfy the supported Angular and Syncfusion version combinations.

## Create an Angular application

Install the Angular CLI if it is not already available:

```bash
npm install -g @angular/cli
```

Create a new application:

```bash
ng new syncfusion-angular-app
```

Navigate to the application directory:

```bash
cd syncfusion-angular-app
```

Standalone components are the default in recent Angular versions. The examples below use that architecture.

## Install the Form Builder package

Use `ng add` to install the Syncfusion Angular Form Builder package and configure the workspace:

```bash
ng add @syncfusion/ej2-angular-form-builder
```

If `ng add` is unavailable, install the package manually:

```bash
npm install @syncfusion/ej2-angular-form-builder
```

## Add a theme

Install the Material 3 theme package:

```bash
npm install @syncfusion/ej2-material3-theme
```

Add the theme stylesheet to `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/material3.css";
```

## Add the Form Builder component

Import `FormBuilderAllModule` into the standalone root component and add the Form Builder element to its template:

```ts
import { Component } from '@angular/core';
import { FormBuilderAllModule } from '@syncfusion/ej2-angular-form-builder';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormBuilderAllModule],
  template: `<div ejs-form-builder></div>`
})
export class AppComponent {
}
```

This renders the visual builder with its toolbox, design canvas, property panel, code view, and preview experience.

## Run the application

Start the Angular development server:

```bash
ng serve
```

Open the local URL reported by the CLI, typically `http://localhost:4200`, to view the Form Builder. Use another port when necessary:

```bash
ng serve --port 4201
```

## Load an initial form schema

When a customer asks for a Form Builder with an initial form, bind a schema object to the component's `schema` property. Use a template reference when the application also needs to call Form Builder methods such as `setProperty`, `getProperty`, or `refresh`.

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

The schema contains the form definition:

- `properties` defines the fields and their widget configuration.
- `layout` controls the field order and can contain layout containers.
- `settings` stores form-level values such as the form name.

For the complete widget inventory, layout container structure, and schema rules, read [form-schema.md](form-schema.md).

## Form Builder areas

The first rendered builder contains these main areas:

1. **Toolbox** — form fields that can be dragged onto the canvas.
2. **Design canvas** — the working area where fields are arranged.
3. **Right pane** — form settings or the selected field's properties.
4. **Code view** — the generated form schema.
5. **Preview** — an interactive preview of the generated form.

Use [field-components-panel.md](field-components-panel.md) for toolbox categories and templates, [property-panel.md](property-panel.md) for field configuration, and [preview-tab.md](preview-tab.md) for preview and JSON workflows.

## Next steps

- Use the toolbox to drag fields onto the canvas or add fields through the canvas context menu.
- Configure a selected field in the property panel.
- Use the Preview tab to validate the form before exporting its schema.
- Read [export-import.md](export-import.md) to reuse or continue editing a schema.

## Form Builder properties

The Angular Form Builder exposes these component properties. Use the Angular wrapper bindings with `ejs-form-builder`.

| Property | Type | Default | Purpose |
|---|---|---|---|
| `locale` | `string` | `'en-US'` | Sets the locale used by the Form Builder. |
| `allowExport` | `boolean` | `true` | Enables or disables exporting the form schema as JSON. |
| `enablePreview` | `boolean` | `true` | Enables or disables the end-user form preview. |
| `enablePersistence` | `boolean` | `false` | Persists the builder state and form schema across sessions when enabled. |
| `enableRtl` | `boolean` | `false` | Enables right-to-left rendering for RTL languages and locales. |
| `mode` | `'Simple' \| 'Developer'` | `'Developer'` | Selects the builder experience. Simple mode provides basic form creation; Developer mode exposes advanced features and full schema control. |
| `formTemplates` | `CustomFormTemplate[] \| null` | `null` | Supplies custom form templates that can be dragged onto the canvas. |
| `toolboxCategories` | `ToolboxCategory[] \| null` | `null` | Customizes which toolbox components are available and how they are grouped. |
| `toolboxItems` | `ToolboxItemSettingModel[]` | `[]` | Defines the toolbox items shown in the component palette. Use this to customize items and render custom components with templates. |
| `schema` | `Schema \| string \| Record<string, unknown> \| null` | `null` | Loads the form schema to be edited by the Form Builder. The value can be a schema object, JSON string, or `Schema` interface instance. |
| `enableHtmlSanitizer` | `boolean` | `false` | Sanitizes untrusted HTML in custom widget string or script templates when enabled. |

```html
<ejs-form-builder
  [locale]="'en-US'"
  [allowExport]="true"
  [enablePreview]="true"
  [enablePersistence]="false"
  [enableRtl]="false"
  [mode]="'Developer'"
  [schema]="schema"
  [formTemplates]="formTemplates"
  [toolboxCategories]="toolboxCategories"
  [toolboxItems]="toolboxItems"
  [enableHtmlSanitizer]="true">
</ejs-form-builder>
```

### Builder modes

`mode` accepts `Simple` or `Developer`:

- **Simple** provides a simplified interface for basic form creation.
- **Developer** provides advanced features and full control over the form schema.

The Templates tab is available in Developer mode. See [field-components-panel.md](field-components-panel.md) for toolbox and template behavior.

## Form Builder events

### `onFieldDragStarted`

Triggered when a field drag operation starts. The event arguments contain `componentName` (`string | null`), `componentType` (`string`), `sourceContainerId` (`string`), and `isNested` (`boolean`).

### `onFieldDragOver`

Triggered while a field is dragged over a valid drop target. The event arguments contain `isNested` (`boolean`).

### `onFieldDropped`

Triggered when a field is dropped onto a target container. The event arguments contain `componentName` (`string`), `isReordered` (`boolean`), `componentType` (`string`), `sourceContainerId` (`string`), and `targetContainerId` (`string`).

### `onFieldPropertyChanged`

Triggered when a form field property changes. The event arguments contain `propertyName` (`string`), `propertyValue` (`any`), and `fieldName` (`string`).

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <ejs-form-builder
      (onFieldDragStarted)="onFieldDragStarted($event)"
      (onFieldDragOver)="onFieldDragOver($event)"
      (onFieldDropped)="onFieldDropped($event)"
      (onFieldPropertyChanged)="onFieldPropertyChanged($event)">
    </ejs-form-builder>
  `
})
export class AppComponent {
  public onFieldDragStarted(args: FieldDragStartEventArgs) {
    console.log(args.componentName, args.componentType, args.sourceContainerId, args.isNested);
  }

  public onFieldDragOver(args: FieldDragOverEventArgs) {
    console.log(args.isNested);
  }

  public onFieldDropped(args: FieldDroppedEventArgs) {
    console.log(args.componentName, args.componentType, args.sourceContainerId, args.targetContainerId, args.isReordered);
  }

  public onFieldPropertyChanged(args: PropertyChangedEventArgs) {
    console.log(args.fieldName, args.propertyName, args.propertyValue);
  }
}
```

These event payloads describe builder editing state. They are separate from Form Renderer value-change and submit events.

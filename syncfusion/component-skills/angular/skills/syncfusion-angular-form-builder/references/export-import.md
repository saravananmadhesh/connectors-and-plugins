# Exporting and Importing Schemas

The Angular Form Builder supports exporting the current form definition for reuse in Form Renderer and importing a schema back into the builder for further editing.

## Exporting the form schema

Use the **Export** button in the toolbar to export the current form definition. This includes the built form structure, field configuration, and related settings needed to recreate the form elsewhere.

```ts
import { Component, ViewChild } from '@angular/core';
import { FormBuilderComponent, FormBuilderModule } from '@syncfusion/ej2-angular-form-builder';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormBuilderModule],
  template: `
    <ejs-form-builder #formObj [allowExport]="false"></ejs-form-builder>
  `
})
export class App {
  @ViewChild('formObj') public formObj?: FormBuilderComponent;
}
```

## Disabling export

Set `allowExport` to `false` when you do not want users to export the form schema.

```html
<ejs-form-builder [allowExport]="false"></ejs-form-builder>
```

The default value is `true`.

## Importing a schema

To continue editing an existing form, assign the exported schema back to the `schema` property of the Form Builder.

```ts
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
```

This loads the schema so the builder can continue editing the same form definition.

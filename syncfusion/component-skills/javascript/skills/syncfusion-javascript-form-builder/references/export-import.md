# Exporting and Importing Schemas

The TypeScript Form Builder supports exporting the generated schema for reuse in Form Renderer and importing an existing schema for further editing.

## Export form schema

Use the **Export** button in the toolbar to export the form definition.

## Disable export

Set `allowExport` to `false` in the constructor:

```ts
import { FormBuilder } from '@syncfusion/ej2-form-builder';

const formBuilder: FormBuilder = new FormBuilder({
  allowExport: false
});

formBuilder.appendTo('#formbuilder');
```

The default value is `true`.

## Import form schema

Assign the exported schema to the `schema` property in the constructor:

```ts
import { FormBuilder } from '@syncfusion/ej2-form-builder';

const formBuilder: FormBuilder = new FormBuilder({
  schema: {
    version: '0.1.0',
    properties: {
      emailAddress: {
        id: 'textbox_1785491685456_167',
        name: 'emailAddress',
        type: 'string',
        label: 'Email Address',
        textboxType: 'email',
        placeholder: 'Enter your email',
        required: true,
        widget: 'textbox'
      },
      password: {
        id: 'textbox_1785491685456_537',
        name: 'password',
        type: 'string',
        label: 'Password',
        textboxType: 'password',
        placeholder: 'Enter your Password',
        required: true,
        minLength: 6,
        widget: 'textbox'
      },
      rememberMe: {
        id: 'checkbox_1785491685456_262',
        name: 'rememberMe',
        type: 'boolean',
        label: 'Remember Me',
        widget: 'checkbox'
      },
      submit: {
        id: 'submit_button_initial',
        name: 'defaultFormsubmit',
        type: 'button',
        label: 'Submit',
        buttonType: 'submit',
        widget: 'button',
        style: 'primary',
        disabled: false
      }
    },
    layout: [
      { type: 'field', propertyId: 'emailAddress' },
      { type: 'field', propertyId: 'password' },
      { type: 'field', propertyId: 'rememberMe' },
      { type: 'field', propertyId: 'submit' }
    ],
    settings: { name: 'Untitled Form' }
  }
});

formBuilder.appendTo('#formbuilder');
```

This loads the schema so the builder can continue editing the same form definition.

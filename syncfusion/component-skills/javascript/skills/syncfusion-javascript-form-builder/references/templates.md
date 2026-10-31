# Templates in TypeScript Form Builder

Templates display third-party components inside the TypeScript Form Builder. Configure a custom control in the `toolboxItems` array and map it to a widget with `type`.

## Add a template

The template function receives field data. Call `setFieldValue` when the custom control changes:

```ts
import { FormBuilder, FormWidgetType } from '@syncfusion/ej2-form-builder';

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
        required: true,
        placeholder: 'Enter your email',
        widget: 'textbox'
      }
    },
    layout: [{ type: 'field', propertyId: 'emailAddress' }],
    settings: { name: 'Untitled Form' }
  },
  toolboxItems: [{ type: FormWidgetType.Textbox, template: inputTemplate }]
});

formBuilder.appendTo('#formbuilder');

function inputTemplate(data: any): HTMLInputElement {
  const input = document.createElement('input');
  input.type = data.fieldData.textboxType || 'text';
  input.id = data.fieldData.id;
  input.name = data.fieldData.name;
  input.placeholder = data.fieldData.placeholder;
  input.className = 'custom-input';
  input.addEventListener('change', (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    formBuilder.setFieldValue(data.fieldData.id, value);
  });
  return input;
}
```

The JavaScript version uses the same `toolboxItems` and template function without TypeScript annotations. The custom control renders after its field is dragged onto the canvas.

## Add template properties

Use `setProperty` to expose third-party component properties in the property panel. See [property-panel.md](property-panel.md).

## Export templates

The template implementation is not serialized in the exported schema. A `templateId` property in `toolboxItems` identifies the template mapped to the corresponding element. Form Renderer requires additional configuration to render the template at runtime.

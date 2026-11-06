# Property Panel

The Property Panel is the right pane of the TypeScript Form Builder. It appears when a field is selected on the design canvas. When no field is selected, the right pane displays form settings.

## When the property panel appears

The property panel opens when a field is dropped, an existing field is edited, or a widget type is switched in Developer mode. Closing the editor returns the pane to Form Settings.

## Elements in the property panel

- **Display** - labels, placeholders, defaults, layout, and styling.
- **Validation** - required, length, pattern, and custom validation settings.
- **Conditions** - conditional visibility, required, disabled, read-only, set-value, choice-based, and conditional-data rules.
- **Layout** - field size and HTML attributes.
- **Data** - data source and columns for Data Grid fields.

## Real-time auto-save

Changes are applied immediately. There is no Save button; the design canvas reflects each property change.

## Add a property

Use `setProperty` to add a built-in or template property:

```ts
import { FormBuilder, FormWidgetType } from '@syncfusion/ej2-form-builder';

const formBuilder: FormBuilder = new FormBuilder();
formBuilder.appendTo('#formbuilder');

formBuilder.setProperty(FormWidgetType.Textarea, {
  key: 'enableRtl',
  label: 'Enable RTL',
  type: 'boolean',
  default: false
});
```

## Hide a property

Use `getProperty`, set `visible` to `false`, and call `refresh()`:

```ts
import { FormBuilder, FormWidgetType } from '@syncfusion/ej2-form-builder';

const formBuilder: FormBuilder = new FormBuilder();
formBuilder.appendTo('#formbuilder');

formBuilder.getProperty(FormWidgetType.Textarea, 'label')!.visible = false;
formBuilder.refresh();
```

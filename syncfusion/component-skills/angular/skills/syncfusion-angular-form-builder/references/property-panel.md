# Property Panel

The Property Panel is the right pane of the Form Builder. It appears when a field is selected in the design canvas or when the user edits an existing item. It switches back to the Form Settings panel when the selection is cleared.

## When it appears

The panel becomes active in three situations:

1. A new field is dropped onto the canvas.
2. A user clicks the edit action on an existing field.
3. Developer mode switches the widget type of an existing field.

When the panel is closed explicitly, the right pane returns to the Form Settings panel.

## Tabs available on the property panel

The property editor varies by field type, but the panel typically contains these tabs:

- **Display** — labels, placeholders, defaults, layout, and styling.
- **Validation** — required flags, max/min length, regex, and custom validation rules.
- **Conditions** — conditional visibility, required, disable, read-only, set-value, choice-based, and conditional-data rules.
- **Layout** — field size and HTML attributes.
- **Data** — relevant only for Data Grid configurations.

## Auto-save behavior

Changes are saved immediately as they are made. There is no dedicated Save button; updates are applied in real time and reflected in the design canvas.

## Adding a custom property

You can add a built-in or custom property with the `setProperty` method.

```ts
import { Component, ViewChild } from '@angular/core';
import { FormBuilderComponent, FormBuilderModule, FormWidgetType } from '@syncfusion/ej2-angular-form-builder';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormBuilderModule],
  template: `
    <ejs-form-builder #formObj [enablePreview]="false"></ejs-form-builder>
  `
})
export class App {
  @ViewChild('formObj') public formObj?: FormBuilderComponent;

  ngAfterViewInit() {
    this.formObj?.setProperty(FormWidgetType.Textarea, {
      key: 'enableRtl',
      label: 'Enable RTL',
      type: 'boolean',
      default: false
    });
  }
}
```

## Hiding an existing property

Use `getProperty` and set the returned property's `visible` field to `false`, then call `refresh()`.

```ts
ngAfterViewInit() {
  const labelProp = this.formObj?.getProperty(FormWidgetType.Textarea, 'label');
  if (labelProp) {
    labelProp.visible = false;
  }
  this.formObj?.refresh();
}
```

This is useful when you want to suppress a built-in property from the property editor without removing the underlying field definition.

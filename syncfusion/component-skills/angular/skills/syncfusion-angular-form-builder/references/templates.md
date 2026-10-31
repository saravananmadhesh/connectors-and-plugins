# Templates in Angular Form Builder

Templates can be used to render third-party controls inside the Form Builder. This allows the form schema to include custom components while still preserving the drag-and-drop authoring experience.

## Adding templates

Use `e-toolboxitemsettings` and `e-toolboxitemsetting` to register a custom template. Bind the `type` property to a `FormWidgetType` value and define the control in a `ng-template`.

```ts
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilderComponent,
  Schema,
  FormBuilderModule,
  FormWidgetType,
  ToolboxItemSettingDirective,
  ToolboxItemSettingsDirective
} from '@syncfusion/ej2-angular-form-builder';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormBuilderModule, ToolboxItemSettingDirective, ToolboxItemSettingsDirective],
  template: `
    <ejs-form-builder [schema]="schema" #formObj>
      <e-toolboxitemsettings>
        <e-toolboxitemsetting [type]="formType">
          <ng-template #template let-data>
            <input
              [type]="data.fieldData?.textboxType || data.textboxType"
              [id]="data.fieldData?.id || data.id"
              [name]="data.fieldData?.name || data.name"
              [placeholder]="data.fieldData?.placeholder"
              class="custom-input"
              [value]="data.value || ''"
              (input)="onInputChange($event, data)"
            />
          </ng-template>
        </e-toolboxitemsetting>
      </e-toolboxitemsettings>
    </ejs-form-builder>
  `
})
export class App {
  @ViewChild('formObj') public formObj?: FormBuilderComponent;

  public formType: any = FormWidgetType.Textbox;

  public onInputChange(event: Event, data: any) {
    const value = (event.target as HTMLInputElement).value;
    if (this.formObj) {
      this.formObj.setFieldValue(data.fieldData.id, value);
    }
  }

  public schema: Schema = {
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

The template renders once the field is dropped onto the canvas.

## Adding template properties to the property panel

Template component properties can be added to the property panel by calling `setProperty` on the Form Builder instance. This is the same pattern used for built-in widget extensions.

## Exporting templates

When the schema is exported, the template implementation itself is not serialized. Instead, a `templateId` property is added so Form Renderer knows which custom template to use.

```html
<e-toolboxitemsetting [type]="formType" [templateId]="templateId"></e-toolboxitemsetting>
```

Form Renderer requires additional configuration to render custom templates at runtime.

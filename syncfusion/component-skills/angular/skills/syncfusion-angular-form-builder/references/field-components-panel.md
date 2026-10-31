# Field Components Panel

The Field Components Panel is the left pane of the Form Builder. It contains the draggable toolbox for fields and templates used to build the form.

## Tabs in the panel

The pane has two tabs:

- **Fields** — the default toolbox of form controls.
- **Templates** — a list of pre-built schemas, available in Developer mode.

A search box underneath the tab strip filters the result set by component label or type. When a search query is active, the toolbox collapses into a flat list of matching items.

## Fields tab groups

The fields tab is organized into these categories:

### Basic

| Component | Schema name |
|---|---|
| Text Box | `textbox` |
| Text Area | `textarea` |
| Checkbox | `checkbox` |
| Radio Button | `radio` |
| Number | `number` |
| Input Mask | `inputMask` |
| Dropdown List | `dropdown` |
| Multi Select | `multiselect` |
| Date | `date` |
| Button | `button` |

### Advanced

| Component | Schema name | Simple mode |
|---|---|---|
| Checkbox Group | `checkboxGroup` | Visible |
| Date / Time | `dateTime` | Visible |
| Time | `time` | Visible |
| Date Range | `dateRange` | Visible |
| Switch | `switch` | Visible |
| Rating | `rating` | Visible |
| Split Button | `splitButton` | Hidden |
| Range Slider | `rangeSlider` | Visible |
| Signature | `signature` | Hidden |
| Image Editor | `imageEditor` | Hidden |
| File Upload | `fileUpload` | Visible |
| Color Picker | `colorPicker` | Hidden |
| Rich Text Editor | `richTextEditor` | Hidden |
| Data Grid | `dataGrid` | Hidden |

### Layout

| Component | Schema name |
|---|---|
| Message | `message` |
| Panel | `panel` |
| Table | `table` |
| Tabs | `tabs` |
| Card | `card` |
| HTML | `staticHtml` |

Layout components are stored in the `layout[]` array and do not appear as field properties.

## Templates tab

The Templates tab provides ready-made schema blocks that can be dragged onto the canvas. This is useful for common scenarios such as login forms.

```ts
public formTemplates = [
  {
    id: 'login form',
    title: 'login',
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
        },
        password: {
          id: 'textbox_1785491685456_537',
          name: 'password',
          type: 'string',
          label: 'Password',
          textboxType: 'password',
          required: true,
          minLength: 6,
          placeholder: 'Enter your password',
          widget: 'textbox'
        }
      },
      layout: [
        { type: 'field', propertyId: 'emailAddress' },
        { type: 'field', propertyId: 'password' }
      ],
      settings: {
        name: 'Untitled Form'
      }
    }
  }
];
```

```html
<ejs-form-builder #formObj [formTemplates]="formTemplates"></ejs-form-builder>
```

When a template is dropped onto the canvas, the entire schema is inserted. Submit buttons inside templates are filtered out to avoid duplicates.

## Customizing the toolbox items

The toolbox can be reduced or rearranged with `toolboxCategories`.

```ts
import { Component, ViewChild } from '@angular/core';
import {
  ComponentCategory,
  FormBuilderComponent,
  FormBuilderModule,
  FormWidgetType
} from '@syncfusion/ej2-angular-form-builder';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormBuilderModule],
  template: `
    <ejs-form-builder #formObj [toolboxCategories]="toolboxCategories"></ejs-form-builder>
  `
})
export class App {
  @ViewChild('formObj') public formObj?: FormBuilderComponent;

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
}
```

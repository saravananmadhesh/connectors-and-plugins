# Templates

## Table of Contents
- [Overview](#overview)
- [Custom widget setting API](#custom-widget-setting-api)
- [Template contract](#template-contract)
- [Target a widget type](#target-a-widget-type)
- [Target one or more fields](#target-one-or-more-fields)
- [Key guidance](#key-guidance)

## Overview

The TypeScript Form Renderer accepts template functions that replace a built-in field widget with custom DOM or a third-party control. Register templates in the `customWidgetSettings` array passed to the `FormRenderer` constructor.

## Custom widget setting API

| Property | Type | Purpose |
| --- | --- | --- |
| `template` | `string | HTMLElement | Function` | Template content or a TypeScript function returning an `HTMLElement`. |
| `type` | `string` | Targets fields of the specified widget type. |
| `fieldName` | `string` | Targets the field whose schema `name` matches this value. |
| `templateId` | `string` | Targets fields whose schema `templateId` matches this value. |

Use one targeting strategy per entry: `type` for a reusable widget template, `fieldName` for one named field, or `templateId` for fields explicitly tagged for the same template.

## Template contract

For an editable field, return a real, keyboard-focusable control. Initialize its current value from `data.value` and call `setFieldValue` with `data.fieldData.id` when the user changes it. Preserve the active control's focus during updates; do not force autofocus unless requested.

Use TypeScript DOM properties and event types, and keep the rendered control connected to Form Renderer state instead of updating only local DOM state.

## Target a widget type

This example replaces textbox widgets with a custom input template:

```ts
import {
  type CustomWidgetSettingModel,
  FormRenderer,
  type Schema
} from '@syncfusion/ej2-formrenderer';

const schema: Schema = {
  version: '0.1.0',
  properties: {
    emailAddress: {
      id: 'textbox_email',
      name: 'emailAddress',
      type: 'string',
      label: 'Email Address',
      textboxType: 'email',
      widget: 'textbox'
    }
  },
  layout: [{ type: 'field', propertyId: 'emailAddress' }],
  settings: { name: 'Contact Form' }
};

let formRenderer: FormRenderer;

const inputTemplate = (data: any): HTMLElement => {
  const input: HTMLInputElement = document.createElement('input');
  input.type = data.fieldData.textboxType ?? 'text';
  input.id = data.fieldData.id;
  input.name = data.fieldData.name;
  input.value = data.value ?? '';
  input.placeholder = data.fieldData.placeholder ?? '';
  input.className = 'custom-input';
  input.addEventListener('change', (event: Event): void => {
    const target = event.target as HTMLInputElement;
    formRenderer.setFieldValue(data.fieldData.id, target.value);
  });
  return input;
};

const customWidgetSettings: CustomWidgetSettingModel[] = [
  { type: 'textbox', template: inputTemplate }
];

formRenderer = new FormRenderer({ schema, customWidgetSettings });
formRenderer.appendTo('#formrenderer');
```

## Target one or more fields

Use `fieldName` or `templateId` instead of `type` when targeting an individual field or fields with matching schema identifiers:

```ts
import type { CustomWidgetSettingModel } from '@syncfusion/ej2-formrenderer';

const passwordTemplate: CustomWidgetSettingModel['template'] = inputTemplate;
const targetedTemplates: CustomWidgetSettingModel[] = [
  { fieldName: 'emailAddress', template: inputTemplate },
  { templateId: 'password-template', template: passwordTemplate }
];
```

Add the matching `templateId` to the target field in `properties`. These entries can be passed as the `customWidgetSettings` constructor option.

## Key guidance

Use custom templates when a built-in widget does not meet the UI requirement or when integrating a third-party DOM control. Initialize the control from `data.value` and send edits through `setFieldValue`.

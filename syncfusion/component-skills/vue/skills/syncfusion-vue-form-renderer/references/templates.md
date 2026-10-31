# Templates

## Overview

Vue templates let you replace a built-in widget with custom Vue UI or a third-party component while continuing to use the Form Renderer schema and state.

## Custom widget setting API

The renderer accepts `customWidgetSettings`, an array of `CustomWidgetSettingModel` entries. Each setting can specify:

| Property | Type | Purpose |
| --- | --- | --- |
| `template` | `string \| function` | Vue template name/function supplied through the `:template` prop. |
| `type` | `string` | Widget type to target; defaults to an empty string. |
| `templateId` | `string` | Match the field's `templateId`, regardless of the `type` setting; defaults to an empty string. |
| `fieldName` | `string` | Match the field's schema `name`, regardless of the `type` setting; defaults to an empty string. |

`type` applies a template to fields of that widget type. `templateId` and `fieldName` allow narrower targeting without requiring a matching `type` value. The API does not specify precedence when multiple targeting properties are set together, so avoid relying on an undocumented precedence.

The renderer property `enableHtmlSanitizer` enables sanitization for untrusted HTML in custom string/script templates. Its default is `false`; turn it on when custom template content is not trusted.

## Input template contract

When a custom template replaces an editable field, it may render a native input or a third-party/custom Vue component. Bind the control's public value prop to `data.value` (for a native input, `:value="data.value ?? ''"`) and send user edits back through the Form Renderer ref's `setFieldValue` method using the field identifier supplied in `data.fieldData.id`.

For a custom component, use its documented value prop and update event; do not assume all Vue components use the same `v-model` contract. The actual interactive control must be keyboard-focusable, receive focus, and remain connected to Form Renderer state. Keep focus on the active control during updates; do not force autofocus on render unless explicitly requested.

## Register a template for a widget type

Use `<e-customwidgetsettings>` and `<e-customwidgetsetting>` to register a template. Bind `:type` to the widget type and `:template` to the matching named Vue slot.

Choose the targeting scope that matches the requested UI customization:

- `type`: replace the rendering for every field of that widget type.
- `fieldName`: replace the rendering for the field with that schema `name`.
- `templateId`: replace the rendering for fields whose schema declares the matching `templateId`.

Multiple settings can target different widget types. Use a shared `type` template for consistent rendering and `field-name` or `template-id` when only particular fields need custom UI.

```vue
<template>
  <ejs-formrenderer ref="formRenderer" :schema="schema">
    <e-customwidgetsettings>
      <e-customwidgetsetting :type="'textbox'" :template="'textboxTemplate'" />
    </e-customwidgetsettings>
    <template v-slot:textboxTemplate="{ data }">
      <input
        :id="`form-renderer-${data.fieldData.id}`"
        :name="data.fieldData.name"
        :type="data.fieldData.textboxType || 'text'"
        :placeholder="data.fieldData.placeholder"
        :value="data.value ?? ''"
        class="e-input"
        @input="setFieldValue(data, $event)"
      />
    </template>
  </ejs-formrenderer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  FormRendererComponent as EjsFormrenderer,
  CustomWidgetSettingsDirective as ECustomwidgetsettings,
  CustomWidgetSettingDirective as ECustomwidgetsetting
} from '@syncfusion/ej2-vue-form-renderer';

const formRenderer = ref<InstanceType<typeof EjsFormrenderer> | null>(null);
const schema = {
  version: '0.1.0',
  properties: {
    emailAddress: {
      id: 'textbox_email',
      name: 'emailAddress',
      type: 'string',
      label: 'Email Address',
      widget: 'textbox'
    }
  },
  layout: [{ type: 'field', propertyId: 'emailAddress' }],
  settings: { name: 'Contact Form' }
};

function setFieldValue(data: any, event: Event) {
  const value = (event.target as HTMLInputElement).value;
  formRenderer.value?.setFieldValue(data.fieldData.id, value);
}
</script>
```

## Apply a template to a single field

To target one field instead of every widget of a type, set `:field-name` or `:template-id` on `<e-customwidgetsetting>`. The target field's `name` or `templateId` in `properties` must match.

```vue
<e-customwidgetsettings>
  <e-customwidgetsetting :field-name="'emailAddress'" :template="'emailTemplate'" />
  <e-customwidgetsetting :template-id="'password-template'" :template="'passwordTemplate'" />
</e-customwidgetsettings>

<template v-slot:emailTemplate="{ data }">
  <input :value="data.value ?? ''" @input="setFieldValue(data, $event)" />
</template>

<template v-slot:passwordTemplate="{ data }">
  <input type="password" :value="data.value ?? ''" @input="setFieldValue(data, $event)" />
</template>
```

Use `field-name` for a one-off field customization. Use `template-id` when fields are explicitly assigned matching identifiers in the schema. A `type` target is not required when targeting by field name or template ID.

## Updating the form value from a custom template

When a template replaces an editable widget, bind the control's value from `data.value` and call the Vue component ref's `setFieldValue` method when its value changes. For a third-party Vue component, use its documented value prop and change event. Keep the actual interactive control keyboard-focusable and do not force autofocus unless requested.

```ts
function setFieldValue(data: any, event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  formRenderer.value?.setFieldValue(data.fieldData.id, target.value);
}
```

## Key guidance

Use Vue named slots through `customWidgetSettings` when the default widget does not fit the UI requirement. Keep the custom control's value and updates synchronized with Form Renderer state.

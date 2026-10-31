# Templates in Vue Form Builder

Templates display third-party components inside Vue Form Builder fields. Register a template with `e-toolboxitemsettings` and `e-toolboxitemsetting`, then map it to a widget with `:type` and `:template`.

## Add a template

Use a named Vue slot and call `setFieldValue` through the component instance when the custom control changes:

```html
<template>
  <ejs-formbuilder id="form-builder-control" ref="formObj" :schema="schema">
    <e-toolboxitemsettings>
      <e-toolboxitemsetting :type="formType" :template="'textboxTemplate'" />
    </e-toolboxitemsettings>
    <template v-slot:textboxTemplate="{ data }">
      <input
        :id="`form-builder-control-${data.fieldData?.id || data.id}`"
        class="e-input"
        :type="data.fieldData?.textboxType || data.textboxType || 'text'"
        :name="data.fieldData?.name || data.name"
        :placeholder="data.fieldData?.placeholder"
        :value="data.value || ''"
        @input="setFieldValue(data, $event)"
      />
    </template>
  </ejs-formbuilder>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import {
  FormBuilderComponent as EjsFormBuilder,
  ToolboxItemSettingsDirective as EToolboxitemsettings,
  ToolboxItemSettingDirective as EToolboxitemsetting,
  FormBuilderPlugin
} from '@syncfusion/ej2-vue-form-builder';
import { FormWidgetType } from '@syncfusion/ej2-form-builder';

provide('FormBuilderPlugin', [FormBuilderPlugin]);
const formObj = ref(null);
const formType = FormWidgetType.Textbox;
const schema = {
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
};

function setFieldValue(data: any, event: Event) {
  const value = (event.target as HTMLInputElement).value;
  formObj.value?.ej2Instances.setFieldValue(data.fieldData?.id || data.id, value);
}
</script>
```

The Options API uses the same directives and calls `this.$refs.formObj.ej2Instances.setFieldValue(...)`.

## Add template properties

Use `ej2Instances.setProperty` to expose third-party component properties in the property panel. See [property-panel.md](property-panel.md).

## Export templates

The template implementation is not serialized in the exported schema. Configure `templateId` on `e-toolboxitemsetting` so Form Renderer can identify the mapped template at runtime.

# Property Panel

The Property Panel is the right pane of the Vue Form Builder. It appears when a field is selected on the design canvas. When no field is selected, the right pane displays form settings.

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

Use `ej2Instances.setProperty` through a component ref:

```html
<template>
  <ejs-formbuilder :enablePreview="false" ref="formObj"></ejs-formbuilder>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import {
  FormBuilderComponent as EjsFormbuilder,
  FormBuilderPlugin
} from '@syncfusion/ej2-vue-form-builder';
import { FormWidgetType } from '@syncfusion/ej2-form-builder';

provide('FormBuilderPlugin', [FormBuilderPlugin]);
const formObj = ref(null);

onMounted(() => {
  formObj.value?.ej2Instances.setProperty(FormWidgetType.Textarea, {
    key: 'enableRtl',
    label: 'Enable RTL',
    type: 'boolean',
    default: false
  });
});
</script>
```

## Hide a property

Use `getProperty`, set `visible` to `false`, and call `refresh()`:

```html
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const instance = formObj.value?.ej2Instances;
  const labelProperty = instance?.getProperty(FormWidgetType.Textarea, 'label');
  if (labelProperty) {
    labelProperty.visible = false;
  }
  instance?.refresh();
});
</script>
```

The Options API uses `this.$refs.formObj.ej2Instances` for the same methods.

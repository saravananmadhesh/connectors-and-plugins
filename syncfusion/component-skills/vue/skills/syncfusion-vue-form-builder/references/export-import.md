# Exporting and Importing Schemas

The Vue Form Builder supports exporting the generated form schema for reuse in Form Renderer and importing an existing schema for further editing.

## Export form schema

Use the **Export** button in the Form Builder toolbar to export the form structure, field configuration, and related settings.

## Disable export

Set `:allowExport="false"`:

```html
<template>
  <ejs-formbuilder :allowExport="false" ref="formObj"></ejs-formbuilder>
</template>

<script setup>
import { provide } from 'vue';
import {
  FormBuilderComponent as EjsFormbuilder,
  FormBuilderPlugin
} from '@syncfusion/ej2-vue-form-builder';

provide('FormBuilderPlugin', [FormBuilderPlugin]);
</script>
```

The default value of `allowExport` is `true`.

## Import form schema

Assign an exported schema to the `:schema` prop:

```html
<template>
  <ejs-formbuilder :schema="schema" ref="formObj"></ejs-formbuilder>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import {
  FormBuilderComponent as EjsFormbuilder,
  FormBuilderPlugin
} from '@syncfusion/ej2-vue-form-builder';

provide('FormBuilderPlugin', [FormBuilderPlugin]);

const formObj = ref(null);
const schema = ref({
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
  settings: { name: 'Untitled Form' }
});
</script>
```

The Options API uses the same schema under `data()` and binds it with `:schema="schema"`.

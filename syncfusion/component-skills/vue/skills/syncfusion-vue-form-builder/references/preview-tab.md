# Preview Tab

The Vue Form Builder provides a Preview tab that shows the generated form as it will appear to end users. It also includes a JSON code preview for reviewing the form schema.

## Preview the form

Switch to **Preview** to validate the current layout, labels, and field behavior before exporting or publishing the form.

## Disable preview

Set `:enablePreview="false"`:

```html
<template>
  <ejs-formbuilder :enablePreview="false" ref="formObj"></ejs-formbuilder>
</template>

<script setup>
import { ref, provide } from 'vue';
import {
  FormBuilderComponent as EjsFormbuilder,
  FormBuilderPlugin
} from '@syncfusion/ej2-vue-form-builder';

provide('FormBuilderPlugin', [FormBuilderPlugin]);
const formObj = ref(null);
</script>
```

The default value is `true`.

## JSON code preview

Open the **JSON** tab to view the generated schema. The **Copy** button copies the schema JSON so it can be reused in another application or passed to Form Renderer.

## Build and preview workflow

Use **Build** to create or edit the form, switch to **Preview** to validate the rendered form, and open **JSON** when the schema needs to be reviewed or copied.

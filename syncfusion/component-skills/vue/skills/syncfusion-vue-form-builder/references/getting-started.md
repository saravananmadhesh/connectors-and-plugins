# Getting Started with the Vue Form Builder Component

The Syncfusion Vue Form Builder is a visual form designer. Users drag fields onto a design canvas, configure field properties, preview the result, and export the generated schema for use with the Form Renderer.

This guide uses a Vue 3 + Vite project with the Composition API or Options API.

## Prerequisites

Ensure the development environment meets the supported Vue and Syncfusion system requirements.

## Set up the Vite project

Create a Vue 3 application with JavaScript or TypeScript:

```bash
npm create vite@latest my-app -- --template vue
npm create vite@latest my-app -- --template vue-ts
```

Navigate to the project directory:

```bash
cd my-app
```

## Install the Form Builder package

```bash
npm install @syncfusion/ej2-vue-form-builder
```

With Yarn:

```bash
yarn add @syncfusion/ej2-vue-form-builder
```

## Add a theme

Install the Material 3 theme package:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Add the theme reference to `src/App.vue`:

```html
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/style/material3.css";
</style>
```

## Add the Form Builder component

Register `FormBuilderPlugin` and the `FormBuilderComponent` in `src/App.vue`:

```html
<template>
  <ejs-formbuilder></ejs-formbuilder>
</template>

<script setup>
import { provide } from 'vue';
import {
  FormBuilderComponent as EjsFormbuilder,
  FormBuilderPlugin
} from '@syncfusion/ej2-vue-form-builder';

provide('FormBuilderPlugin', [FormBuilderPlugin]);
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/style/material3.css";
</style>
```

For the Options API, register the component and plugin explicitly:

```html
<template>
  <ejs-formbuilder></ejs-formbuilder>
</template>

<script>
import {
  FormBuilderComponent,
  FormBuilderPlugin
} from '@syncfusion/ej2-vue-form-builder';

export default {
  name: 'App',
  provide: {
    FormBuilderPlugin: [FormBuilderPlugin]
  },
  components: {
    'ejs-formbuilder': FormBuilderComponent
  }
};
</script>
```

## Run the project

```bash
npm run dev
yarn run dev
```

Open the local URL reported by Vite to view the Form Builder.

## Load an initial form schema

Bind an initial schema with the `:schema` prop. The Composition API example uses a reactive `ref`:

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
    }
  },
  layout: [{ type: 'field', propertyId: 'emailAddress' }],
  settings: { name: 'Untitled Form' }
});
</script>
```

The schema contains fields in `properties`, the rendering tree in `layout`, and form-wide options in `settings`. Read [form-schema.md](form-schema.md) for the complete schema model.

## Form Builder areas

The Form Builder contains the toolbox, design canvas, right-side property panel, code view, and Preview tab. After dropping the first field, use the canvas context menu to add more fields.

See [field-components-panel.md](field-components-panel.md), [property-panel.md](property-panel.md), and [preview-tab.md](preview-tab.md) for the authoring workflow.

## Form Builder properties

The Vue Form Builder exposes these component properties through Vue props:

| Property | Type | Default | Purpose |
|---|---|---|---|
| `locale` | `string` | `'en-US'` | Sets the locale used by the Form Builder. |
| `allowExport` | `boolean` | `true` | Enables or disables exporting the form schema as JSON. |
| `enablePreview` | `boolean` | `true` | Enables or disables the end-user form preview. |
| `enablePersistence` | `boolean` | `false` | Persists the builder state and form schema across sessions when enabled. |
| `enableRtl` | `boolean` | `false` | Enables right-to-left rendering for RTL languages and locales. |
| `mode` | `'Simple' \| 'Developer'` | `'Developer'` | Selects the builder experience. |
| `formTemplates` | `CustomFormTemplate[] \| null` | `null` | Supplies custom form templates. |
| `toolboxCategories` | `ToolboxCategory[] \| null` | `null` | Customizes toolbox components and categories. |
| `toolboxItems` | `ToolboxItemSettingModel[]` | `[]` | Defines toolbox items and custom templates. |
| `schema` | `Schema \| string \| Record<string, unknown> \| null` | `null` | Loads the form schema to be edited. |
| `enableHtmlSanitizer` | `boolean` | `false` | Sanitizes untrusted HTML in custom widget templates. |

```html
<ejs-formbuilder
  locale="en-US"
  :allowExport="true"
  :enablePreview="true"
  :enablePersistence="false"
  :enableRtl="false"
  mode="Developer"
  :schema="schema"
  :formTemplates="formTemplates"
  :toolboxCategories="toolboxCategories"
  :toolboxItems="toolboxItems"
  :enableHtmlSanitizer="true">
</ejs-formbuilder>
```

`mode` accepts `Simple` or `Developer`. The Templates tab is available in Developer mode.

## Form Builder events

The Form Builder exposes these field editing events:

- `onFieldDragStarted`: `componentName`, `componentType`, `sourceContainerId`, and `isNested`.
- `onFieldDragOver`: `isNested`.
- `onFieldDropped`: `componentName`, `isReordered`, `componentType`, `sourceContainerId`, and `targetContainerId`.
- `onFieldPropertyChanged`: `propertyName`, `propertyValue`, and `fieldName`.

Use Vue event bindings when handling builder editing state:

```html
<template>
  <ejs-formbuilder
    @onFieldDragStarted="onFieldDragStarted"
    @onFieldDragOver="onFieldDragOver"
    @onFieldDropped="onFieldDropped"
    @onFieldPropertyChanged="onFieldPropertyChanged">
  </ejs-formbuilder>
</template>

<script setup lang="ts">
function onFieldDragStarted(args: FieldDragStartEventArgs) {
  console.log(args.componentName, args.componentType, args.sourceContainerId, args.isNested);
}

function onFieldDragOver(args: FieldDragOverEventArgs) {
  console.log(args.isNested);
}

function onFieldDropped(args: FieldDroppedEventArgs) {
  console.log(args.componentName, args.componentType, args.sourceContainerId, args.targetContainerId, args.isReordered);
}

function onFieldPropertyChanged(args: PropertyChangedEventArgs) {
  console.log(args.fieldName, args.propertyName, args.propertyValue);
}
</script>
```

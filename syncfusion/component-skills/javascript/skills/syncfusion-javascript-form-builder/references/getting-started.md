# Getting started with TypeScript Form Builder control

The Form Builder is a visual form designer that lets users create and customize forms by dragging fields onto a canvas. Users can configure field properties, preview the generated form, and export its schema for use with Form Renderer.

This guide uses the Syncfusion Essential JS 2 TypeScript quickstart with Webpack.

## Prerequisites

Install Git, Node.js, and Visual Studio Code or another editor.

## Set up the development environment

Clone the quickstart application and enter the project directory:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-quickstart
cd ej2-quickstart
```

## Install the Form Builder package

```bash
npm install @syncfusion/ej2-form-builder --save
npm install
```

## Add the Form Builder theme

Install the Material 3 theme:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Add the stylesheet to `src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-material3-theme/styles/material3.css";
```

## Add the Form Builder control

Add a container to `src/index.html`:

```html
<div id="formbuilder"></div>
```

Initialize the control in `src/app/app.ts`:

```ts
import { FormBuilder } from '@syncfusion/ej2-form-builder';

const formBuilder: FormBuilder = new FormBuilder();
formBuilder.appendTo('#formbuilder');
```

## Run the application

```bash
npm run start
```

The application renders the Form Builder with its toolbox, design canvas, right-side property panel, code view, and preview.

## Load an initial form schema

Pass a schema object to the `FormBuilder` constructor when the customer asks for an initial form:

```ts
import { FormBuilder } from '@syncfusion/ej2-form-builder';

const formBuilder: FormBuilder = new FormBuilder({
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
      }
    },
    layout: [{ type: 'field', propertyId: 'emailAddress' }],
    settings: { name: 'Untitled Form' }
  }
});

formBuilder.appendTo('#formbuilder');
```

The schema contains fields in `properties`, the rendering tree in `layout`, and form-wide options in `settings`. Read [form-schema.md](form-schema.md) for the complete schema model.

## Form Builder properties

The TypeScript Form Builder accepts these constructor properties:

| Property | Type | Default | Purpose |
|---|---|---|---|
| `locale` | `string` | `'en-US'` | Sets the locale used by the Form Builder. |
| `allowExport` | `boolean` | `true` | Enables or disables exporting the form schema as JSON. |
| `enablePreview` | `boolean` | `true` | Enables or disables the end-user form preview. |
| `enablePersistence` | `boolean` | `false` | Persists the builder state and form schema across sessions when enabled. |
| `enableRtl` | `boolean` | `false` | Enables right-to-left rendering. |
| `mode` | `'Simple' \| 'Developer'` | `'Developer'` | Selects the builder experience. |
| `formTemplates` | `CustomFormTemplate[] \| null` | `null` | Supplies reusable form templates. |
| `toolboxCategories` | `ToolboxCategory[] \| null` | `null` | Customizes toolbox categories and items. |
| `toolboxItems` | `ToolboxItemSettingModel[]` | `[]` | Defines toolbox items and custom templates. |
| `schema` | `Schema \| string \| Record<string, unknown> \| null` | `null` | Loads the form schema to edit. |
| `enableHtmlSanitizer` | `boolean` | `false` | Sanitizes untrusted HTML in custom templates. |

```ts
import { FormBuilder } from '@syncfusion/ej2-form-builder';

const formBuilder: FormBuilder = new FormBuilder({
  locale: 'en-US',
  allowExport: true,
  enablePreview: true,
  enablePersistence: false,
  enableRtl: false,
  mode: 'Developer',
  schema: formSchema,
  formTemplates,
  toolboxCategories,
  toolboxItems,
  enableHtmlSanitizer: true
});

formBuilder.appendTo('#formbuilder');
```

The Templates tab is available in Developer mode. Use the toolbox and property panel to build the form, then inspect the JSON code view before exporting.

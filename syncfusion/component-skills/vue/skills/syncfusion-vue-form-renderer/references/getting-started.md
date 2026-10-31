# Getting Started with Vue Form Renderer

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Create a Vite project](#create-a-vite-project)
- [Install the packages](#install-the-packages)
- [Add theme styles](#add-theme-styles)
- [Register and render the component](#register-and-render-the-component)
- [Run the app](#run-the-app)
- [Register a license](#register-a-license)

## Overview

The Vue Form Renderer creates forms from a JSON schema that describes fields, layout, validation, and actions. This walkthrough uses Vue 3 with Vite and the Options API. The Vue package can also be used with the Composition API.

## Prerequisites

- Install Node.js and npm or Yarn.
- Check that the environment meets the Syncfusion Vue UI component system requirements.

## Create a Vite project

Create a JavaScript or TypeScript Vue project:

```bash
npm create vite@latest my-app -- --template vue
npm create vite@latest my-app -- --template vue-ts
```

Yarn alternatives:

```bash
yarn create vite@latest my-app -- --template vue
yarn create vite@latest my-app -- --template vue-ts
```

If prompted, choose not to start the development server during project creation. Then enter the project directory:

```bash
cd my-app
```

The Vue CLI's `create-vue` flow is another documented project setup option.

## Install the packages

Install the Vue Form Renderer package:

```bash
npm install @syncfusion/ej2-vue-form-renderer
```

With Yarn:

```bash
yarn add @syncfusion/ej2-vue-form-renderer
```

## Add theme styles

Install the Material 3 theme package:

```bash
npm install @syncfusion/ej2-material3-theme
```

With Yarn:

```bash
yarn add @syncfusion/ej2-material3-theme
```

Import the theme in `src/App.vue`:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/material3.css";
</style>
```

## Register and render the component

Register the Form Renderer plugin and component in `src/App.vue`. Pass a unified schema to `:schema` and the submit handler to `:submit`.

```vue
<template>
  <ejs-formrenderer :schema="schema" :submit="onSubmit"></ejs-formrenderer>
</template>

<script>
import {
  FormRendererPlugin,
  FormRendererComponent
} from '@syncfusion/ej2-vue-form-renderer';

export default {
  name: 'App',
  provide: {
    FormRendererPlugin: [FormRendererPlugin]
  },
  components: {
    'ejs-formrenderer': FormRendererComponent
  },
  data() {
    return {
      schema: {
        version: '0.1.0',
        properties: {
          emailAddress: {
            id: 'textbox_email',
            name: 'emailAddress',
            type: 'string',
            label: 'Email Address',
            textboxType: 'email',
            required: true,
            widget: 'textbox'
          },
          password: {
            id: 'textbox_password',
            name: 'password',
            type: 'string',
            label: 'Password',
            textboxType: 'password',
            required: true,
            minLength: 6,
            widget: 'textbox'
          },
          rememberMe: {
            id: 'checkbox_remember',
            name: 'rememberMe',
            type: 'boolean',
            label: 'Remember Me',
            widget: 'checkbox'
          },
          submit: {
            id: 'submit_button',
            name: 'defaultSubmit',
            type: 'button',
            label: 'Submit',
            buttonType: 'submit',
            widget: 'button',
            style: 'primary',
            disabled: false
          }
        },
        layout: [
          { type: 'field', propertyId: 'emailAddress' },
          { type: 'field', propertyId: 'password' },
          { type: 'field', propertyId: 'rememberMe' },
          { type: 'field', propertyId: 'submit' }
        ],
        settings: { name: 'Untitled Form' }
      }
    };
  },
  methods: {
    onSubmit(args) {
      if (args && args.data) {
        console.log(args.data, args.isValid);
      }
    }
  }
};
</script>
```

## Run the app

Start Vite with npm:

```bash
npm run dev
```

Or with Yarn:

```bash
yarn run dev
```

Open the local URL printed by Vite.

## Register a license

Register a valid Syncfusion license key in the application to prevent license validation warnings. Follow the Syncfusion Vue licensing documentation for the supported registration steps.

# Getting Started with TypeScript Form Renderer

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Set up the project](#set-up-the-project)
- [Install packages](#install-packages)
- [Add theme styles](#add-theme-styles)
- [Add the mount element](#add-the-mount-element)
- [Initialize the Form Renderer](#initialize-the-form-renderer)
- [Run the application](#run-the-application)
- [Register a license](#register-a-license)

## Overview

The Form Renderer builds forms from a JSON schema that defines fields, layout, validation, and actions. This guide uses the Syncfusion TypeScript webpack quickstart and the ES-module `FormRenderer` class from `@syncfusion/ej2-form-renderer`.

The quickstart uses webpack configuration and requires Node.js 14.15.0 or later.

## Prerequisites

Install Git, Node.js, and a TypeScript-capable editor such as Visual Studio Code.

## Set up the project

Clone the Syncfusion webpack quickstart and enter its directory:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-quickstart
cd ej2-quickstart
```

## Install packages

Install the Form Renderer package and the remaining project dependencies:

```bash
npm install @syncfusion/ej2-form-renderer --save
npm install
```

## Add theme styles

Install the Material 3 theme:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Import it from `src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-material3-theme/styles/material3.css";
```

## Add the mount element

Add a root element in `src/index.html`:

```html
<div id="formrenderer"></div>
```

## Initialize the Form Renderer

In `src/app/app.ts`, import `FormRenderer`, provide a schema, and handle submit data. The schema's `layout` nodes reference field keys from `properties`.

```ts
import { FormRenderer, type SubmitEventArgs } from '@syncfusion/ej2-form-renderer';

const formRenderer: FormRenderer = new FormRenderer({
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
        style: 'primary'
      }
    },
    layout: [
      { type: 'field', propertyId: 'emailAddress' },
      { type: 'field', propertyId: 'password' },
      { type: 'field', propertyId: 'rememberMe' },
      { type: 'field', propertyId: 'submit' }
    ],
    settings: { name: 'Untitled Form' }
  },
  submit: (args: SubmitEventArgs): void => {
    console.log(args.data, args.isValid);
  }
});

formRenderer.appendTo('#formrenderer');
```

## Run the application

Start the webpack quickstart:

```bash
npm run start
```

## Register a license

Register a valid Syncfusion license key in the application to prevent license validation warnings. Follow the Syncfusion licensing documentation for the supported registration steps.

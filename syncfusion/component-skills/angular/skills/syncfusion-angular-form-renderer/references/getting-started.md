# Getting Started with Angular Form Renderer

## Overview

The Form Renderer is a schema-driven Angular component that builds complex forms from a JSON object. Instead of manually wiring every field and validator, the form is expressed as a declarative schema and passed through the `schema` property.

## Install the package

Use the Angular CLI to add the package:

```bash
ng add @syncfusion/ej2-angular-form-renderer
```

If the CLI command is unavailable, install it manually:

```bash
npm install @syncfusion/ej2-angular-form-renderer
```

## Add the theme

Install the Material 3 theme package:

```bash
npm install @syncfusion/ej2-material3-theme
```

Then add the stylesheet to `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/material3.css";
```

## Basic implementation

Import the component module and schema types:

```ts
import { Component } from '@angular/core';
import { FormRendererAllModule, Schema } from '@syncfusion/ej2-angular-form-renderer';
```

Then bind a schema to the component:

```ts
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormRendererAllModule],
  template: `<ejs-form-renderer [schema]="schema" (submit)="onSubmit($event)"></ejs-form-renderer>`
})
export class AppComponent {
  public schema: Schema = {
    version: '0.1.0',
    properties: {
      emailAddress: {
        id: 'textbox_1',
        name: 'emailAddress',
        type: 'string',
        label: 'Email Address',
        textboxType: 'email',
        required: true,
        widget: 'textbox'
      },
      password: {
        id: 'textbox_2',
        name: 'password',
        type: 'string',
        label: 'Password',
        textboxType: 'password',
        required: true,
        minLength: 6,
        widget: 'textbox'
      },
      submit: {
        id: 'submit_1',
        name: 'submit',
        type: 'button',
        label: 'Submit',
        buttonType: 'submit',
        widget: 'button'
      }
    },
    layout: [
      { type: 'field', propertyId: 'emailAddress' },
      { type: 'field', propertyId: 'password' },
      { type: 'field', propertyId: 'submit' }
    ],
    settings: { name: 'Untitled Form' }
  };

  public onSubmit(args: any) {
    if (args.data) {
      console.log(args.data, args.isValid);
    }
  }
}
```

## Run the app

```bash
ng serve
```

The Angular CLI reports a local URL such as http://localhost:4200. Open that URL in the browser to view the form.

## Key takeaway

The Form Renderer is best for schema-driven forms where field definitions and behavior are expressed in one JSON object rather than hand-written form logic.

# Getting Started with Angular Modern Rich Text Editor

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install the Syncfusion CLI](#install-the-syncfusion-cli)
- [Create a new Angular application using the Syncfusion CLI](#create-a-new-angular-application-using-the-syncfusion-cli)
  - [Non-interactive mode](#non-interactive-mode)
  - [Interactive mode](#interactive-mode)
- [Run the project](#run-the-project)
- [Set up the Angular environment](#set-up-the-angular-environment)
- [Create an Angular application](#create-an-angular-application)
- [Add the Syncfusion Modern Rich Text Editor package](#add-the-syncfusion-modern-rich-text-editor-package)
- [Add the CSS reference](#add-the-css-reference)
- [Add the Modern Rich Text Editor component](#add-the-modern-rich-text-editor-component)
- [Basic configuration](#basic-configuration)
  - [Set Editor content (`value`)](#set-editor-content-value)
  - [Set content format (`valueFormat`)](#set-content-format-valueformat)
  - [Configure toolbar options (`toolbarSettings`)](#configure-toolbar-options-toolbarsettings)
  - [Configure image settings (`imageSettings`)](#configure-image-settings-imagesettings)
  - [Set placeholder text](#set-placeholder-text)
  - [Configure auto-save behavior](#configure-auto-save-behavior)
  - [SlashCommandService provider](#slashcommandservice-provider)
- [API Reference](#api-reference)
  - [ValueFormat](#valueformat)

---

## Prerequisites

The Syncfusion Angular Modern Rich Text Editor is a WYSIWYG editor that enables users to create, edit, and format rich text content with features like multimedia insertion, lists, and links. This section describes how to create a basic Angular Modern Rich Text Editor component and configure its core features.

- [Node.js 24+](https://nodejs.org/en) (LTS recommended).
- Syncfusion CLI.

## Install the Syncfusion CLI

Install the Syncfusion CLI globally using the following command:

```bash
npm install -g @syncfusion/syncfusion-cli
```

## Create a new Angular application using the Syncfusion CLI

You can create an Angular application using the Syncfusion CLI. The CLI provides two ways to create a project:

### Non-interactive mode

Non-interactive mode allows you to create a project directly using a single command with the required command-line arguments.

```cmd
sf new syncfusion-angular-app --framework angular --template rich-text-editor-ui
```

In this mode, the project configuration is passed directly in the command. The above command creates an Angular application configured with the Syncfusion Modern Rich Text Editor component.

### Interactive mode

Interactive mode guides you through the project creation process with step-by-step prompts.

```cmd
sf
```

When you run the `sf` command, the CLI prompts you to select the required project configuration. To create an Angular application with the Syncfusion Modern Rich Text Editor component, select the following options:

```cmd
√ Project name? ... syncfusion-angular-app
√ Choose Framework: » Angular
√ Choose Template: » Rich Text Editor UI
√ Choose Theme: » Material3
√ Choose Style Format: » CSS
√ Would you like to integrate the Syncfusion MCP Server (AI Assistant) into this project? ... no
√ Would you like to install Syncfusion Component Skills for AI-powered development? ... no
√ Install dependencies and start app now? ... no
```

The above selections generate an Angular application configured with the Syncfusion Modern Rich Text Editor component. You can choose different values for language, theme, style format, MCP setup, and skills installation based on your project requirements.

The Syncfusion CLI creates the project with a predefined template. After the project is generated, you can customize or replace the component code based on your application requirements.

## Run the project

Once the project is created, navigate to the project directory and run the following commands in your terminal.

```cmd
cd syncfusion-angular-app
npm install
ng serve
```

## Set up the Angular environment

This guide uses the Angular CLI to manage Angular applications. It requires Node `24.13.0` or higher. For more information about Angular CLI and its features, refer the [Angular CLI](https://github.com/angular/angular-cli).

> **Note:** For information about supported Angular versions and Syncfusion package compatibility, refer to the [Version Compatibility](https://ej2.syncfusion.com/angular/documentation/upgrade/version-compatibility) documentation.

You can use the [Angular CLI](https://github.com/angular/angular-cli) to set up your Angular applications. To install the Angular CLI, use the following command.

```bash
npm install -g @angular/cli
```

## Create an Angular application

Create a new Angular application using the following Angular CLI command:

```bash
ng new my-app
```

This command will prompt you for a few settings for the new project, such as which stylesheet format to use.

By default, the Angular CLI creates a CSS-based application.

Then the CLI also displays an additional prompt asking whether to enable Server-Side Rendering (SSR) and Static Site Generation (SSG).

For this setup, when prompted for the Server-side rendering (SSR) option, choose the appropriate configuration.

Any preferred option can be selected based on the development workflow or project needs.

Next, navigate to the project folder:

```bash
cd my-app
```

## Add the Syncfusion Modern Rich Text Editor package

All available Essential JS 2 packages are published in the [npmjs.com](https://www.npmjs.com/~syncfusionorg) registry. Install the Modern Rich Text Editor component with the following command:

```bash
npm install @syncfusion/ej2-angular-richtexteditor-ui
```

## Add the CSS reference

Syncfusion provides multiple themes for the Modern Rich Text Editor component. For a complete list of available themes, refer to the [themes packages](https://ej2.syncfusion.com/angular/documentation/appearance/overview#theme-packages).

To apply the [Material 3](https://www.npmjs.com/package/@syncfusion/ej2-material3-theme) theme, install the corresponding theme package by using the following command:

```bash
npm install @syncfusion/ej2-material3-theme
```

The installed theme package includes an `index.css` file that automatically imports all the required dependency styles. Import the following stylesheet into `src/styles.css`.

```css
@import '../node_modules/@syncfusion/ej2-material3-theme/styles/richtexteditor-ui/index.css';
```

## Add the Modern Rich Text Editor component

Modify the template in the `src/app/app.ts` file to render the Modern Rich Text Editor component. Add the Angular Modern Rich Text Editor by using the `<ejs-richtexteditor-ui>` selector in the `template` section of the app.ts file.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html'
})
export class App {
}
```

```html
<ejs-richtexteditor-ui placeholder="Type something ..."></ejs-richtexteditor-ui>
```

## Basic configuration

After initializing the Modern Rich Text Editor (see above), configure the properties that define its initial content, content format, toolbar options, image handling behavior, and editing experience. These settings establish the editor's default configuration and provide a foundation for further customization based on application requirements.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public value: string = '<p>Getting started with the Rich Text Editor UI.</p>';
    public valueFormat: string = 'html';
    public hostUrl: string = 'https://services.syncfusion.com/js/production/';
    public toolbarSettings: object = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']
    };
    public imageSettings: object = {
        allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
        maxFileSize: 30000000,
        uploadUrl: this.hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: this.hostUrl + 'api/RichTextEditor/DeleteFile',
        imageUrl: this.hostUrl + 'RichTextEditor/'
    };
}
```

```html
<ejs-richtexteditor-ui
    [value]="value"
    [valueFormat]="valueFormat"
    [toolbarSettings]="toolbarSettings"
    [imageSettings]="imageSettings">
</ejs-richtexteditor-ui>
```

### Set Editor content (`value`)

Configure the [`value`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#value) property to load content when the editor is initialized. This is commonly used to display existing content for editing or to provide starter content.

```ts
public value: string = '<p>Getting started with the Rich Text Editor UI.</p>';
```

Bind it on the component template:

```html
<ejs-richtexteditor-ui [value]="value"></ejs-richtexteditor-ui>
```

### Set content format (`valueFormat`)

Before setting editor content, choose the appropriate [`valueFormat`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#valueformat). Use html when working with HTML strings and json when storing or exchanging content using the editor's structured document model.

```ts
public valueFormat: string = 'html';
```

**Supported values:**

* `'json'` — Uses the structured document model.
* `'html'` — Uses HTML string content.

> **Note**: `valueFormat` is set to **`'json'`** by default. Set it to **`'html'`** when loading editor content as an HTML string.

### Configure toolbar options (`toolbarSettings`)

Configure [`toolbarSettings.items`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarsettings#items) to display only the editing tools required by your application. Keeping the toolbar focused helps simplify the editing experience and reduces unnecessary commands.

```ts
public toolbarSettings: object = {
    items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']
};
```

See [Toolbar](toolbar.md) for the complete list of available toolbar items, layout types, and the floating toolbar.

### Configure image settings (`imageSettings`)

Configure [`imageSettings`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#imagesettings) to control how images are uploaded and validated. You can specify accepted file types, file size limits, and server endpoints used for upload and removal operations.

```ts
public hostUrl: string = 'https://services.syncfusion.com/js/production/';
public imageSettings: object = {
    allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
    maxFileSize: 30000000,
    uploadUrl: this.hostUrl + 'api/RichTextEditor/SaveFile',
    removeUrl: this.hostUrl + 'api/RichTextEditor/DeleteFile',
    imageUrl: this.hostUrl + 'RichTextEditor/'
};
```

See [Image](image.md) for the full `imageSettings` matrix, remote upload endpoints, and image quick toolbar.

### Set placeholder text

Use the [`placeholder`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#placeholder) property to display instructional text when the editor is empty. This helps users understand what content is expected before they start typing.

```html
<ejs-richtexteditor-ui placeholder="Type something."></ejs-richtexteditor-ui>
```

### Configure auto-save behavior

When `enableAutoSave` is enabled, use `saveInterval` to control how long the editor waits before automatically saving unsaved changes. The value is specified in milliseconds and is triggered after the user becomes idle.

```ts
public saveInterval: number = 1000;
```

### SlashCommandService provider

Register `SlashCommandService` as a provider on the component when you plan to enable the `/` slash-command menu:

```ts
@Component({
    imports: [RichTextEditorUIModule],
    providers: [SlashCommandService],
    // …
})
```

Without this provider, the editor renders without the slash-command capability even when `slashCommandSettings.enable` is `true`. See [Features — Slash Commands](features.md) for full configuration.
---

## API Reference

### ValueFormat

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/valueformat>

Allowed value formats.

- `'html'`: value is an HTML string.
- `'json'`: value is an `EditorDocument` object.

Members:

- `html`
- `json`

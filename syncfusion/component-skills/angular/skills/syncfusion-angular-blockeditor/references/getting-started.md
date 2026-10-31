# Getting Started with Angular Block Editor

## Prerequisites

Before you begin, ensure the following are installed:

- **Node.js** (v18 or later) — required by the Angular CLI.
- **Angular CLI** (v14 or later) — required for the standalone components used in this guide.

## Set up the Angular environment

Use the Angular CLI to set up your Angular application. The CLI requires Node.js v18 or later. To install the Angular CLI globally, run the following command:

```
npm install -g @angular/cli
```

## Create an Angular Application

1. Run the following Angular CLI command to create a new application:

    ```bash
    ng new my-app
    ```

2. When prompted for the stylesheet format, accept the default (CSS).

3. When prompted to enable Server-Side Rendering (SSR) and Static Site Generation (SSG), select No.

4. Navigate to the project folder:

    ```bash
    cd my-app
    ```

## Add Syncfusion Block Editor package

All Essential JS 2 packages are published in the [npmjs.com](https://www.npmjs.com/~syncfusionorg) registry. The `@syncfusion/ej2-angular-blockeditor` package supports Angular 14 and later. Install the Block Editor with the following command:

```bash
npm install @syncfusion/ej2-angular-blockeditor
```

If you want to seed the editor with content programmatically, also install the model package:

```bash
npm install @syncfusion/ej2-blockeditor
```

> If you see a peer-dependency warning for `@angular/core` after install, run `ng update` to align the CLI to the version targeted by the Block Editor package.

## Add a CSS reference

Syncfusion provides multiple themes for the Block Editor. For the full list, see the [themes packages](https://ej2.syncfusion.com/angular/documentation/appearance/overview#theme-packages) overview.

Install a Syncfusion theme package to provide the required styles. The following example installs the [Material 3](https://www.npmjs.com/package/@syncfusion/ej2-material3-theme) theme:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

To render the Block Editor, add the following import to your `src/styles.css` to load the editor's theme and dependency styles:

```css
@import '../node_modules/@syncfusion/ej2-material3-theme/styles/blockeditor/index.css';
```

> If you use a CSS preprocessor or a custom build pipeline, ensure that the editor's CSS is bundled into the final stylesheet before deployment.

## Add the Block Editor component

Modify the template in `src/app/app.ts` (or `src/app/app.component.ts` for older Angular CLI versions) to render the Block Editor by using the `<ejs-blockeditor>` selector:

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from "@syncfusion/ej2-angular-blockeditor";

@Component({
    imports: [BlockEditorModule],
    standalone: true,
    selector: 'app-root',
    template: `<!-- To Render BlockEditor component. -->
    <div id="container" >
        <ejs-blockeditor />
    </div>`
})

export class App {
}
```

```css
@import "node_modules/@syncfusion/ej2-tailwind3-theme/styles/blockeditor/index.css";
```

> **Note:** Angular CLI 21 and later generates the root component as `src/app/app.ts`. Earlier Angular CLI versions use `src/app/app.component.ts`. The Block Editor's selector (`ejs-blockeditor`) is identical in both layouts.

## Run the application

Run the application in the browser using the following command:

```bash
ng serve --open
```


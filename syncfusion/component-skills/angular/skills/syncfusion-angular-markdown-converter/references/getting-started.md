# Getting Started with Syncfusion Angular Markdown Converter

Step-by-step setup for adding the Syncfusion Markdown Converter to an Angular application.

## 1. Set Up Angular Environment

Install the Angular CLI if not already installed:

```bash
npm install -g @angular/cli@21.0.1
```

Create a new Angular application:

```bash
ng new my-app
```

When prompted:
- Angular routing: your preference
- Stylesheet format: your preference
- Server-Side Rendering (SSR) / Static Site Generation (SSG): select **No**

Navigate into the project:

```bash
cd my-app
```

## 2. Install Syncfusion Packages

Install both the Markdown Converter and the Rich Text Editor packages:

```bash
npm install @syncfusion/ej2-markdown-converter
npm install @syncfusion/ej2-angular-richtexteditor
```

The `ej2-markdown-converter` package provides the `MarkdownConverter` utility. The `ej2-angular-richtexteditor` package provides the `ejs-richtexteditor` component used to author Markdown content.

## 3. Add CSS References

Add the following imports to `src/styles.css`. These load the material3 theme for all required Syncfusion sub-packages:

```css
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-lists/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-richtexteditor/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/material3.css';
```

> **Note:** `ej2-layouts` is only required if you are using the Splitter component for a side-by-side preview layout.

## 4. Module Injection

The Rich Text Editor in Markdown mode requires these modules to be injected via the `providers` array in your component or root `NgModule`:

| Module | Purpose |
|--------|---------|
| `ToolbarService` | Enables the editor toolbar |
| `LinkService` | Enables hyperlink support in Markdown |
| `ImageService` | Enables image insertion |
| `MarkdownEditorService` | Activates Markdown editing mode |
| `TableService` | Enables table insertion |

```typescript
import {
  ToolbarService,
  LinkService,
  ImageService,
  MarkdownEditorService,
  TableService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  // ...
  providers: [ToolbarService, LinkService, ImageService, MarkdownEditorService, TableService]
})
export class AppComponent {}
```

## 5. Basic AppComponent

A minimal working example using the standalone component API:

```typescript
// src/app/app.component.ts
import { enableRipple, createElement } from '@syncfusion/ej2-base';
import { Component, ViewChild } from '@angular/core';
import {
  RichTextEditorModule,
  ToolbarSettingsModel,
  ContentRender,
  RichTextEditorComponent,
  MarkdownFormatter,
  ToolbarService,
  LinkService,
  ImageService,
  MarkdownEditorService,
  TableService
} from '@syncfusion/ej2-angular-richtexteditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
enableRipple(true);

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      id='mdCustom'
      #mdCustom
      [toolbarSettings]='tools'
      [editorMode]='mode'
      [formatter]='formatter'
      (created)='onCreate()'
      [value]='value'>
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, LinkService, ImageService, MarkdownEditorService, TableService]
})
export class AppComponent {
  @ViewChild('mdCustom')
  public editorObj?: RichTextEditorComponent;
  public textArea?: HTMLTextAreaElement;
  public mdsource?: HTMLElement;

  public tools: ToolbarSettingsModel = {
    items: ['Bold', 'Italic', 'StrikeThrough', '|',
      'Formats', 'OrderedList', 'UnorderedList', '|',
      'CreateLink', 'Image', '|',
      {
        tooltipText: 'Preview',
        template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
          '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
      }, 'Undo', 'Redo']
  };

  public mode: string = 'Markdown';

  public formatter: MarkdownFormatter = new MarkdownFormatter({
    listTags: { 'OL': '1., 2., 3.', 'UL': '+ ' },
    formatTags: { 'Blockquote': '> ' },
    selectionTags: { 'Bold': '__', 'Italic': '_' }
  });

  public value: string = 'Type **Markdown** here and click Preview to see the HTML output.';

  public onCreate(): void {
    this.textArea = (this.editorObj!.contentModule as ContentRender)
      .getEditPanel() as HTMLTextAreaElement;
    this.textArea.addEventListener('keyup', () => this.markDownConversion());
    this.mdsource = document.getElementById('preview-code') as HTMLElement;
    this.mdsource?.addEventListener('click', () => this.fullPreview());
  }

  public markDownConversion(): void {
    if (this.mdsource?.classList.contains('e-active')) {
      const id = this.editorObj?.getID() + 'html-view';
      const htmlPreview = this.editorObj!.element.querySelector('#' + id) as HTMLElement;
      htmlPreview.innerHTML = MarkdownConverter.toHtml(
        (this.editorObj!.contentModule as ContentRender)
          .getEditPanel() as unknown as string
      ) as string;
    }
  }

  public fullPreview(): void {
    const id = this.editorObj!.getID() + 'html-preview';
    let htmlPreview = this.editorObj!.element.querySelector('#' + id) as HTMLElement;
    if (this.mdsource!.classList.contains('e-active')) {
      this.mdsource!.classList.remove('e-active');
      this.textArea!.style.display = 'block';
      htmlPreview.style.display = 'none';
    } else {
      this.mdsource!.classList.add('e-active');
      if (!htmlPreview) {
        htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
        htmlPreview.id = id;
        this.textArea!.parentNode!.appendChild(htmlPreview);
      }
      this.textArea!.style.display = 'none';
      htmlPreview.style.display = 'block';
      htmlPreview.innerHTML = MarkdownConverter.toHtml(
        ((this.editorObj!.contentModule as ContentRender).getEditPanel() as HTMLTextAreaElement).value
      ) as string;
      this.mdsource!.parentElement!.title = 'Code View';
    }
  }
}
```

```typescript
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

## 6. Run the Application

```bash
ng serve --open
```

The browser opens with the Markdown Editor. Click **Preview** in the toolbar to see the real-time HTML output of your Markdown content.

## Common Setup Issues

- **Missing CSS:** If the editor renders unstyled, verify all `@import` lines in `styles.css` match the packages installed in `node_modules/@syncfusion`.
- **Module not found errors:** Ensure both `@syncfusion/ej2-markdown-converter` and `@syncfusion/ej2-angular-richtexteditor` are listed in `package.json` dependencies.
- **Providers not injected:** If the Markdown editor toolbar is missing, confirm all five services are in the `providers` array of your component.

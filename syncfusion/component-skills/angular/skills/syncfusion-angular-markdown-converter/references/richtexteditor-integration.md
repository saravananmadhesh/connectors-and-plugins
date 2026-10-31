# Rich Text Editor Integration

## Table of Contents
- [Overview](#overview)
- [Splitter-Based Side-by-Side Layout](#splitter-based-side-by-side-layout)
- [Rich Text Editor in Markdown Mode](#rich-text-editor-in-markdown-mode)
- [Live Preview with updateValue()](#live-preview-with-updatevalue)
- [Toolbar Configuration](#toolbar-configuration)
- [Custom Markdown Formatter](#custom-markdown-formatter)
- [Custom Preview Toggle Button](#custom-preview-toggle-button)
- [Device and Orientation Handling](#device-and-orientation-handling)
- [Full Working Example](#full-working-example)

---

## Overview

The Syncfusion Markdown Converter is designed to work alongside the Syncfusion Rich Text Editor (`ejs-richtexteditor`) in Markdown editing mode. The typical integration pattern:

1. Set the Rich Text Editor's `editorMode` to `'Markdown'`
2. Listen for editor changes (`change`, `actionComplete`, or `keyup`)
3. Call `MarkdownConverter.toHtml()` with the current textarea value
4. Inject the resulting HTML into a preview container

---

## Splitter-Based Side-by-Side Layout

Use the Syncfusion Splitter (`ejs-splitter`) to display the editor and HTML preview side by side. Install the layouts package if not already present:

```bash
npm install @syncfusion/ej2-angular-layouts
```

**Template structure:**

```html
<ejs-splitter id="splitter-rte-markdown-preview"
  #splitterInstance
  height="450px"
  width="100%"
  (resizing)="resizing()"
  (created)="updateOrientation()">
  <e-panes>
    <!-- Left pane: Markdown editor -->
    <e-pane size="50%" [resizable]="true" cssClass="pane1" min="40%">
      <ng-template #content>
        <ejs-richtexteditor
          id="markdown"
          #markdown
          [value]="value"
          height="447px"
          [toolbarSettings]="tools"
          [editorMode]="mode"
          (created)="onCreate()"
          (change)="onChange()"
          (actionComplete)="updateValue()">
        </ejs-richtexteditor>
      </ng-template>
    </e-pane>

    <!-- Right pane: HTML preview -->
    <e-pane cssClass="pane2" min="40%">
      <ng-template #content>
        <div class="heading right">
          <h6 class="title"><b>Markdown Preview</b></h6>
          <div class="splitter-default-content source-code pane2"
               style="padding: 20px;"></div>
        </div>
      </ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

**Key splitter behaviors:**
- `(resizing)="resizing()"` — calls `editorObj.refreshUI()` so the editor reflows on drag
- `(created)="updateOrientation()"` — switches splitter to vertical on mobile devices
- `min="40%"` — prevents panes from collapsing entirely

---

## Rich Text Editor in Markdown Mode

Set `editorMode` to `'Markdown'` to switch the Rich Text Editor from WYSIWYG mode to plain-text Markdown editing:

```typescript
import { EditorMode } from '@syncfusion/ej2-angular-richtexteditor';

public mode: EditorMode = 'Markdown';
```

In the template:
```html
<ejs-richtexteditor [editorMode]="mode" ...></ejs-richtexteditor>
```

In Markdown mode, the editor's content panel is a plain `<textarea>`. Access it via:
```typescript
import { ContentRender } from '@syncfusion/ej2-angular-richtexteditor';

const textarea = (this.editorObj.contentModule as ContentRender)
  .getEditPanel() as HTMLTextAreaElement;
```

---

## Live Preview with updateValue()

The `updateValue()` method reads the current textarea content and pushes the converted HTML into the preview container. Call it from `onChange` and `actionComplete` events to keep the preview in sync:

```typescript
public srcArea: HTMLElement | null = null;

public onCreate(): void {
  // Wait for the editor to fully initialize before accessing the DOM
  setTimeout(() => {
    this.editorObj!.refreshUI();
    this.textArea = (this.editorObj!.contentModule as ContentRender)
      .getEditPanel() as HTMLTextAreaElement;
    this.srcArea = document.querySelector('.source-code');
    this.updateValue(); // Render initial content
  }, 0);
}

public onChange(): void {
  this.updateValue();
}

public updateValue(): void {
  const textarea = (this.editorObj!.contentModule as ContentRender)
    .getEditPanel() as HTMLTextAreaElement;
  this.srcArea!.innerHTML = MarkdownConverter.toHtml(textarea.value) as string;
}
```

> **Why `setTimeout(..., 0)`?** The editor's `contentModule` and DOM elements are not ready synchronously inside the `created` event. A zero-delay timeout defers execution until after the current event loop cycle, guaranteeing the editor is fully rendered.

---

## Toolbar Configuration

Configure the toolbar via `toolbarSettings.items`. For Markdown mode, use standard formatting items plus any custom toolbar buttons:

```typescript
public tools: ToolbarSettingsModel = {
  enableFloating: false,
  items: [
    'Bold', 'Italic', 'StrikeThrough', '|',
    'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
    'CreateLink', 'Image', 'CreateTable', '|',
    'Undo', 'Redo'
  ]
};
```

- `enableFloating: false` — disables floating toolbar behavior, which works better in a fixed splitter layout
- `'Formats'` — applies Markdown heading levels (H1–H6)
- `'Blockquote'` — wraps selected text in `> ` syntax
- `'CreateTable'` — inserts a GFM table template

---

## Custom Markdown Formatter

`MarkdownFormatter` lets you redefine the Markdown syntax that toolbar buttons produce. This is useful when you want non-standard Markdown (e.g., `__bold__` instead of `**bold**`):

```typescript
import { MarkdownFormatter } from '@syncfusion/ej2-angular-richtexteditor';

public formatter: MarkdownFormatter = new MarkdownFormatter({
  listTags: {
    'OL': '1., 2., 3.',  // Numbered list prefix
    'UL': '+ '            // Unordered list uses + instead of -
  },
  formatTags: {
    'Blockquote': '> '
  },
  selectionTags: {
    'Bold': '__',    // Double underscore instead of **
    'Italic': '_'    // Single underscore instead of *
  }
});
```

Pass it to the editor:
```html
<ejs-richtexteditor [formatter]="formatter" ...></ejs-richtexteditor>
```

> `MarkdownConverter.toHtml()` correctly handles the custom syntax produced by `MarkdownFormatter` — no extra configuration needed.

---

## Custom Preview Toggle Button

To add a **Preview** toggle button to the toolbar (shows/hides the HTML preview in the same editor area):

**Toolbar item definition:**
```typescript
{
  tooltipText: 'Preview',
  template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
    '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
}
```

**Toggle logic:**
```typescript
public mdsource?: HTMLElement;

public onCreate(): void {
  this.textArea = (this.editorObj!.contentModule as ContentRender)
    .getEditPanel() as HTMLTextAreaElement;
  this.textArea.addEventListener('keyup', () => this.markDownConversion());
  this.mdsource = document.getElementById('preview-code') as HTMLElement;
  this.mdsource?.addEventListener('click', () => this.fullPreview());
}

public markDownConversion(): void {
  if (this.mdsource?.classList.contains('e-active')) {
    const id = this.editorObj!.getID() + 'html-view';
    const htmlPreview = this.editorObj!.element.querySelector('#' + id) as HTMLElement;
    htmlPreview.innerHTML = MarkdownConverter.toHtml(this.textArea!.value) as string;
  }
}

public fullPreview(): void {
  const id = this.editorObj!.getID() + 'html-preview';
  let htmlPreview = this.editorObj!.element.querySelector('#' + id) as HTMLElement;

  if (this.mdsource!.classList.contains('e-active')) {
    // Switch back to editor
    this.mdsource!.classList.remove('e-active');
    this.textArea!.style.display = 'block';
    htmlPreview.style.display = 'none';
  } else {
    // Switch to preview
    this.mdsource!.classList.add('e-active');
    if (!htmlPreview) {
      htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
      htmlPreview.id = id;
      this.textArea!.parentNode!.appendChild(htmlPreview);
    }
    this.textArea!.style.display = 'none';
    htmlPreview.style.display = 'block';
    htmlPreview.innerHTML = MarkdownConverter.toHtml(this.textArea!.value) as string;
    this.mdsource!.parentElement!.title = 'Code View';
  }
}
```

---

## Device and Orientation Handling

On mobile devices, the horizontal splitter layout is too narrow. Switch to vertical orientation on device detection:

```typescript
import { Browser } from '@syncfusion/ej2-base';

public updateOrientation(): void {
  if (Browser.isDevice) {
    (this.splitterObj as any).orientation = 'Vertical';
    (document.body.querySelector('.heading') as HTMLElement).style.width = 'auto';
  }
}
```

Also call `editorObj.refreshUI()` on splitter resize to keep the editor correctly sized:

```typescript
public resizing(): void {
  this.editorObj!.refreshUI();
}
```

---

## Full Working Example

Complete `app.component.ts` using Splitter + Rich Text Editor + live Markdown preview:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { Component, ViewChild } from '@angular/core';
import {
  RichTextEditorModule,
  ToolbarSettingsModel,
  RichTextEditorComponent,
  ContentRender,
  ToolbarService,
  LinkService,
  ImageService,
  MarkdownEditorService,
  TableService,
  EditorMode
} from '@syncfusion/ej2-angular-richtexteditor';
import { Browser } from '@syncfusion/ej2-base';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { SplitterComponent, SplitterModule } from '@syncfusion/ej2-angular-layouts';
enableRipple(true);

@Component({
  imports: [RichTextEditorModule, SplitterModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="sample-container markdown-preview">
      <ejs-splitter id="splitter-rte-markdown-preview"
        #splitterInstance
        height="450px"
        width="100%"
        (resizing)="resizing()"
        (created)="updateOrientation()">
        <e-panes>
          <e-pane size="50%" [resizable]="true" cssClass="pane1" min="40%">
            <ng-template #content>
              <div class="content">
                <ejs-richtexteditor
                  id="markdown"
                  #markdown
                  [value]="value"
                  height="447px"
                  [toolbarSettings]="tools"
                  saveInterval="10"
                  [editorMode]="mode"
                  (created)="onCreate()"
                  (change)="onChange()"
                  (actionComplete)="updateValue()">
                </ejs-richtexteditor>
              </div>
            </ng-template>
          </e-pane>
          <e-pane cssClass="pane2" min="40%">
            <ng-template #content>
              <div class="heading right">
                <h6 class="title"><b>Markdown Preview</b></h6>
                <div class="splitter-default-content source-code pane2"
                     style="padding: 20px;"></div>
              </div>
            </ng-template>
          </e-pane>
        </e-panes>
      </ejs-splitter>
    </div>
  `,
  providers: [ToolbarService, LinkService, ImageService, MarkdownEditorService, TableService]
})
export class AppComponent {
  @ViewChild('markdown') public editorObj?: RichTextEditorComponent;
  @ViewChild('splitterInstance') public splitterObj!: SplitterComponent;

  public textArea?: HTMLTextAreaElement;
  public srcArea: any;
  public mode: EditorMode = 'Markdown';

  public tools: ToolbarSettingsModel = {
    enableFloating: false,
    items: [
      'Bold', 'Italic', 'StrikeThrough', '|',
      'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
      'CreateLink', 'Image', 'CreateTable', '|',
      'Undo', 'Redo'
    ]
  };

  public value: string =
    'In Rich Text Editor, you click the toolbar buttons to format the words and the changes are visible immediately. ' +
    'Markdown is not like that. When you format the word in Markdown format, you need to add Markdown syntax to the word ' +
    'to indicate which words and phrases should look different from each other. ' +
    'Rich Text Editor supports markdown editing when the editorMode set as **markdown** and using both ' +
    '*keyboard interaction* and *toolbar action*, you can apply the formatting to text.';

  public resizing(): void {
    this.editorObj!.refreshUI();
  }

  public updateOrientation(): void {
    if (Browser.isDevice) {
      (this.splitterObj as any).orientation = 'Vertical';
      (document.body.querySelector('.heading') as HTMLElement).style.width = 'auto';
    }
  }

  public onCreate(): void {
    setTimeout(() => {
      this.editorObj!.refreshUI();
      this.textArea = (this.editorObj!.contentModule as ContentRender)
        .getEditPanel() as HTMLTextAreaElement;
      this.srcArea = document.querySelector('.source-code');
      this.updateValue();
    }, 0);
  }

  public onChange(): void {
    this.updateValue();
  }

  public updateValue(): void {
    this.srcArea.innerHTML = MarkdownConverter.toHtml(
      ((this.editorObj!.contentModule as ContentRender)
        .getEditPanel() as HTMLTextAreaElement).value
    ) as string;
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

# Editor Types in Syncfusion Angular Rich Text Editor

## Table of Contents
- [Choosing the Right Editor Type](#choosing-the-right-editor-type)
- [Default DIV Editor (HTML Mode)](#default-div-editor-html-mode)
- [Markdown Editor Mode](#markdown-editor-mode)
- [IFrame Editor](#iframe-editor)
- [Inline Editing](#inline-editing)
- [Resizable Editor](#resizable-editor)
- [Decision Guide](#decision-guide)

---

## Choosing the Right Editor Type

| Use case | Editor type |
|---|---|
| Standard content editing, forms | Default DIV (HTML mode) |
| Markdown content (blogs, wikis) | Markdown mode |
| Isolated CSS, no style leakage | IFrame mode |
| Edit content in-place on a page | Inline editing |
| User-resizable editor area | Resizable editor |

---

## Default DIV Editor (HTML Mode)

The default editor renders inside a `<div>` element. This is the standard use case — output is valid HTML.

The `editorMode` defaults to `'HTML'`. To explicitly set it:

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ToolbarService, HtmlEditorService,
  QuickToolbarService, ImageService, LinkService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-richtexteditor [editorMode]="'HTML'" [(value)]="content"></ejs-richtexteditor>`,
  providers: [ToolbarService, HtmlEditorService, QuickToolbarService, ImageService, LinkService]
})
export class AppComponent {
  public content: string = '<p>HTML editor content</p>';
}
```

> **Required service:** `HtmlEditorService`

---

## Markdown Editor Mode

Sets `editorMode` to `'Markdown'`. The editor outputs Markdown text. Use a library like `marked` or `showdown` to convert to HTML for preview.

**Supported Markdown tags:** `h1`–`h6`, `blockquote`, `pre`, `p`, `ol`, `ul`  
**Supported inline:** Bold, Italic, StrikeThrough, InlineCode, SubScript, SuperScript, UpperCase, LowerCase  
**Supported inserts:** Image, Link, Table

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ToolbarService, LinkService,
  ImageService, MarkdownEditorService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      [editorMode]="mode"
      [(value)]="markdownContent">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, LinkService, ImageService, MarkdownEditorService]
})
export class AppComponent {
  public mode: string = 'Markdown';
  public markdownContent: string = '# Hello\n\nThis is **Markdown** content.';
}
```

> **Required service:** `MarkdownEditorService` (instead of `HtmlEditorService`)

---

## IFrame Editor

Renders the editor inside an `<iframe>`, fully isolating it from the host page's CSS and JavaScript. Use this when:
- Parent page styles conflict with editor content styling
- You need to inject custom CSS/scripts into the editor area
- You want full CSS encapsulation

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, IFrameSettingsModel,
  ToolbarService, LinkService, ImageService,
  HtmlEditorService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-richtexteditor [iframeSettings]="iframe" [(value)]="content"></ejs-richtexteditor>`,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class AppComponent {
  public content: string = '<p>IFrame editor content</p>';
  public iframe: IFrameSettingsModel = { enable: true };
}
```

**Injecting custom CSS and scripts into the iframe:**
```typescript
public iframe: IFrameSettingsModel = {
  enable: true,
  resources: {
    scripts: ['/assets/editor-scripts.js'],
    styles: ['/assets/editor-content.css']
  }
};
```

**Applying custom attributes to the iframe body:**
```typescript
public iframe: IFrameSettingsModel = {
  enable: true,
  attributes: { 'data-theme': 'dark' }
};
```

> **Gotcha:** When using Mention inside an IFrame editor, set `mentionObj.target = rteObj.inputElement` after the RTE is created. See [smart-editing.md](smart-editing.md) for the full example.

---

## Inline Editing

Renders the editor without a visible toolbar by default. The toolbar appears as a floating popup when the user selects text (or focuses the area). Ideal for in-place editing inside a page.

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, InlineModeModel, ToolbarSettingsModel,
  ToolbarService, LinkService, ImageService,
  HtmlEditorService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      [inlineMode]="inlineMode"
      [toolbarSettings]="toolbarSettings"
      [(value)]="content">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class AppComponent {
  public content: string = '<p>Click to select text and see the toolbar appear.</p>';

  // onSelection: true → toolbar appears only when text is selected
  // onSelection: false → toolbar appears when the editor is focused
  public inlineMode: InlineModeModel = { enable: true, onSelection: true };

  public toolbarSettings: ToolbarSettingsModel = {
    items: ['Bold', 'Italic', 'Underline', 'Formats', 'Alignments', 'CreateLink']
  };
}
```

---

## Resizable Editor

Adds a drag handle at the bottom-right corner that lets users resize the editor area.

> **Required service:** `ResizeService`

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ToolbarService, LinkService,
  ImageService, ResizeService, HtmlEditorService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-richtexteditor [enableResize]="true" [(value)]="content"></ejs-richtexteditor>`,
  providers: [ToolbarService, LinkService, ImageService, ResizeService, HtmlEditorService, QuickToolbarService]
})
export class AppComponent {
  public content: string = '<p>Drag the bottom-right handle to resize.</p>';
}
```

**Constraining resize bounds (app.component.css):**
```css
.e-richtexteditor {
  min-width: 250px;
  max-width: 880px;
  min-height: 200px;
  max-height: 600px;
}
```

---

## Decision Guide

**User needs to select content to format it → Inline editing**
```typescript
public inlineMode: InlineModeModel = { enable: true, onSelection: true };
```

**App uses Tailwind/global styles that break editor content → IFrame mode**
```typescript
public iframe: IFrameSettingsModel = { enable: true };
```

**Output should be Markdown not HTML → Markdown mode**
```typescript
public mode: EditorMode = 'Markdown';
// inject MarkdownEditorService instead of HtmlEditorService
```

**User should be able to resize the editor → Resizable + ResizeService**
```typescript
[enableResize]="true"
// providers: [..., ResizeService]
```

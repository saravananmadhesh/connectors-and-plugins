# Getting Started with Syncfusion Angular Rich Text Editor

## Table of Contents
- [Installation](#installation)
- [Module Options: RichTextEditorModule vs RichTextEditorAllModule](#module-options)
- [Service Injection](#service-injection)
- [CSS Theme Imports](#css-theme-imports)
- [Standalone Component Setup](#standalone-component-setup)
- [NgModule Setup](#ngmodule-setup)
- [Basic Component with Value Binding](#basic-component-with-value-binding)

---

## Installation

```bash
npm install @syncfusion/ej2-angular-richtexteditor
```

---

## Module Options

Two module imports are available:

| Module | When to use |
|---|---|
| `RichTextEditorModule` | Use when you manually inject only the services you need (recommended for smaller bundles) |
| `RichTextEditorAllModule` | Use when you want all services available without listing them individually (convenient, larger bundle) |

---

## Service Injection

The RTE uses a modular service architecture. Only inject the services your editor needs — unused services increase bundle size unnecessarily.

```typescript
// Core services for a standard HTML editor
import {
  ToolbarService,       // Required for toolbar rendering
  HtmlEditorService,    // Required for HTML editing mode
  LinkService,          // Required for hyperlink insertion
  ImageService,         // Required for image insertion
  QuickToolbarService,  // Required for context toolbars (image, link, table)
  TableService,         // Required for table insertion
  PasteCleanupService,  // Required for paste cleanup
} from '@syncfusion/ej2-angular-richtexteditor';
```

**Full services reference:**

| Service | What it enables |
|---|---|
| `ToolbarService` | Toolbar rendering |
| `HtmlEditorService` | HTML editing mode |
| `MarkdownEditorService` | Markdown editing mode |
| `LinkService` | Hyperlink insertion |
| `ImageService` | Image insertion |
| `TableService` | Table insertion |
| `QuickToolbarService` | Floating context toolbars |
| `ResizeService` | Resizable editor handle |
| `FileManagerService` | File browser dialog |
| `PasteCleanupService` | Paste sanitization |
| `ClipboardCleanupService` | Copy/cut clipboard cleanup |
| `ImportExportService` | Word/PDF import & export |
| `AIAssistantService` | AI assistant integration |
| `EmojiPickerService` | Emoji picker |
| `SlashMenuService` | Slash command menu |
| `CodeBlockService` | Inline code block formatting |
| `AudioService` | Audio insertion |
| `VideoService` | Video insertion |
| `FormatPainterService` | Format painting |
| `AutoFormatService` | Auto Markdown-to-HTML conversion |
| `CountService` | Live character counting |

---

## CSS Theme Imports

Install the theme package that matches your application. This example uses `Material 3`:

```bash
npm install @syncfusion/ej2-material3-theme
```

Add the following stylesheet in `src/styles.css`.

```css
@import '../node_modules/@syncfusion/ej2-material3-theme/styles/rich-text-editor/index.css';
```

Replace `material3` with your preferred theme name (`tailwind3`, `bootstrap5`, `fabric`, `fluent2`, etc) install the corresponding package, and use the same theme name in the CSS import path.

---

## Standalone Component Setup

```typescript
import { Component } from '@angular/core';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import {
  ToolbarService, LinkService, ImageService,
  HtmlEditorService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-richtexteditor [(value)]="content"></ejs-richtexteditor>`,
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class AppComponent {
  public content: string = '<p>Start editing here...</p>';
}
```

> **Key:** Services go in the component `providers` array, not in `imports`.

---

## NgModule Setup

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import {
  ToolbarService, LinkService, ImageService,
  HtmlEditorService, QuickToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RichTextEditorModule],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ejs-richtexteditor [(value)]="content"></ejs-richtexteditor>`
})
export class AppComponent {
  public content: string = '<p>Start editing here...</p>';
}
```

---

## Basic Component with Value Binding

**Two-way binding (recommended for most use cases):**
```typescript
@Component({
  template: `<ejs-richtexteditor [(value)]="htmlContent"></ejs-richtexteditor>`
})
export class AppComponent {
  public htmlContent: string = '<p>Initial content</p>';
}
```

**One-way binding + change event (when you need to intercept changes):**
```typescript
import { ChangeEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `
    <ejs-richtexteditor [value]="htmlContent" (change)="onContentChange($event)">
    </ejs-richtexteditor>
  `
})
export class AppComponent {
  public htmlContent: string = '<p>Initial content</p>';

  onContentChange(args: ChangeEventArgs): void {
    // args.value contains the updated HTML string
    this.htmlContent = args.value;
    console.log('Content changed:', args.value);
  }
}
```

> The `change` event fires only when the editor loses focus **and** there were actual changes — not on every keystroke. Use `input` event for keystroke-level updates.

---

## Run the Application

```bash
ng serve --open
```

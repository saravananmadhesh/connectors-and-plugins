# Tools in Syncfusion Angular Rich Text Editor

## Table of Contents
- [Available Built-in Tools](#available-built-in-tools)
- [Text Formatting Tools](#text-formatting-tools)
- [Font and Styling Tools](#font-and-styling-tools)
- [Alignment Tools](#alignment-tools)
- [List and Indentation Tools](#list-and-indentation-tools)
- [Insert Tools](#insert-tools)
- [Other Tools](#other-tools)
- [Fullscreen Tool](#fullscreen-tool)
- [Custom Toolbar Tools](#custom-toolbar-tools)
- [Enabling and Disabling Toolbar Items](#enabling-and-disabling-toolbar-items)

---

## Available Built-in Tools

All tool names are used as strings inside `toolbarSettings.items`. Use `|` for separators.

**Default toolbar (no configuration needed):**
```
Bold | Italic | Underline | Formats | Alignments | Blockquote | OrderedList | UnorderedList | CreateLink | Image | SourceCode | Undo | Redo
```

---

## Text Formatting Tools

| Tool name | What it does |
|---|---|
| `Bold` | Bold selected text |
| `Italic` | Italicize selected text |
| `Underline` | Underline selected text |
| `StrikeThrough` | Strike through selected text |
| `ClearFormat` | Remove all formatting from selection |
| `Blockquote` | Wrap selection as a blockquote |
| `SubScript` | Subscript (lower) |
| `SuperScript` | Superscript (higher) |
| `LowerCase` | Convert selection to lowercase |
| `UpperCase` | Convert selection to uppercase |

---

## Font and Styling Tools

| Tool name | What it does |
|---|---|
| `FontName` | Font family dropdown |
| `FontSize` | Font size dropdown |
| `FontColor` | Font color picker |
| `BackgroundColor` | Background/highlight color picker |
| `Formats` | Paragraph format (Normal, H1–H6, pre, etc.) |

---

## Alignment Tools

| Tool name | What it does |
|---|---|
| `Alignments` | Combined alignment dropdown |
| `JustifyLeft` | Left align |
| `JustifyCenter` | Center align |
| `JustifyRight` | Right align |
| `JustifyFull` | Justify |

---

## List and Indentation Tools

| Tool name | What it does |
|---|---|
| `OrderedList` | Numbered list |
| `UnorderedList` | Bulleted list |
| `NumberFormatList` | Numbered list with style options |
| `BulletFormatList` | Bulleted list with style options |
| `Indent` | Increase indent |
| `Outdent` | Decrease indent |

---

## Insert Tools

| Tool name | What it does | Required service |
|---|---|---|
| `CreateLink` | Insert hyperlink | `LinkService` |
| `Image` | Insert image | `ImageService` |
| `Video` | Insert video | `VideoService` |
| `Audio` | Insert audio | `AudioService` |
| `CreateTable` | Insert table | `TableService` |
| `HorizontalLine` | Insert horizontal rule | — |
| `FileManager` | File browser dialog | `FileManagerService` |

---

## Other Tools

| Tool name | What it does |
|---|---|
| `FullScreen` | Toggle fullscreen mode |
| `Maximize` | Maximize editor |
| `Minimize` | Restore to default size |
| `Print` | Print editor content |
| `SourceCode` | Toggle HTML source view |
| `Preview` | Preview rendered content |
| `InsertCode` | Insert `<pre>` code block |
| `Undo` | Undo last action |
| `Redo` | Redo undone action |
| `ClearAll` | Clear all content |
| `FormatPainter` | Copy & apply formatting (requires `FormatPainterService`) |

---

## Fullscreen Tool

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, ToolbarSettingsModel,
  ToolbarService, HtmlEditorService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-richtexteditor [toolbarSettings]="tools"></ejs-richtexteditor>`,
  providers: [ToolbarService, HtmlEditorService]
})
export class AppComponent {
  public tools: ToolbarSettingsModel = {
    items: ['Bold', 'Italic', '|', 'FullScreen', 'SourceCode', '|', 'Undo', 'Redo']
  };
}
```

---

## Custom Toolbar Tools

Add custom buttons or HTML templates as toolbar items. Each custom item is an object in the `items` array:

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  RichTextEditorModule, RichTextEditorComponent,
  ToolbarSettingsModel, ToolbarService, HtmlEditorService, NodeSelection
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor #rte [toolbarSettings]="tools" (created)="onCreate()">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, HtmlEditorService]
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;

  public tools: ToolbarSettingsModel = {
    items: [
      'Bold', 'Italic', '|',
      {
        tooltipText: 'Insert Symbol',
        undo: true,         // Include this action in undo/redo history
        command: 'Custom',  // Marks it as custom — disables it in source view automatically
        click: () => this.onCustomToolClick(),
        template: '<button class="e-tbar-btn e-btn" style="width:100%">'
                + '<div class="e-tbar-btn-text">Ω</div></button>'
      },
      '|', 'Undo', 'Redo'
    ]
  };

  public onCreate(): void {
    // Initialize custom tool after RTE is created
  }

  public onCustomToolClick(): void {
    this.rteObj.focusIn();
    // Custom action — e.g., open a dialog, insert content
    this.rteObj.executeCommand('insertText', 'Ω');
  }
}
```

**Custom tool with dropdown (use `e-rte-elements` class to prevent focus issues):**

> When rendering any component inside a custom toolbar item (dropdown, dialog, etc.), add the `e-rte-elements` CSS class to it. This prevents the RTE from treating it as an external click and blurring incorrectly.

---

## Enabling and Disabling Toolbar Items

Use the RTE component instance methods:

```typescript
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `
    <ejs-richtexteditor #rte></ejs-richtexteditor>
    <button (click)="disableBold()">Disable Bold</button>
    <button (click)="enableBold()">Enable Bold</button>
  `
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;

  disableBold(): void {
    this.rteObj.disableToolbarItem(['Bold']);
  }

  enableBold(): void {
    this.rteObj.enableToolbarItem(['Bold']);
  }

  // Disable multiple items at once
  disableInsertTools(): void {
    this.rteObj.disableToolbarItem(['Image', 'CreateLink', 'CreateTable']);
  }
}
```

> Both `enableToolbarItem` and `disableToolbarItem` accept a single item name or an array of names.

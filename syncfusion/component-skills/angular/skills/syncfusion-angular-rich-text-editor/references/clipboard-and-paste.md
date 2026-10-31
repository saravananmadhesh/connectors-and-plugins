# Clipboard and Paste Cleanup in Syncfusion Angular Rich Text Editor

## Table of Contents
- [Overview](#overview)
- [Paste Cleanup Configuration](#paste-cleanup-configuration)
- [Paste Modes](#paste-modes)
- [Filtering Tags and Attributes](#filtering-tags-and-attributes)
- [Clipboard Cleanup (Copy/Cut)](#clipboard-cleanup-copycut)
- [afterPasteCleanup Event](#afterpastecleanup-event)

---

## Overview

The RTE provides two services for controlling clipboard behavior:

| Service | When to use |
|---|---|
| `PasteCleanupService` | Control what happens when content is **pasted** into the editor |
| `ClipboardCleanupService` | Clean up content when it is **copied or cut** from the editor |

---

## Paste Cleanup Configuration

Requires `PasteCleanupService` in providers.

```typescript
import { Component } from '@angular/core';
import {
  RichTextEditorModule, PasteCleanupSettingsModel,
  ToolbarService, HtmlEditorService, LinkService,
  ImageService, QuickToolbarService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      [pasteCleanupSettings]="pasteSettings">
    </ejs-richtexteditor>
  `,
  providers: [ToolbarService, HtmlEditorService, LinkService,
              ImageService, QuickToolbarService, PasteCleanupService]
})
export class AppComponent {
  public pasteSettings: PasteCleanupSettingsModel = {
    keepFormat: true,                          // Preserve source formatting (default: true)
    deniedTags: ['script', 'style', 'iframe'], // Remove these tags
    deniedAttrs: ['class', 'id'],              // Remove these attributes
    allowedStyleProps: ['color', 'font-size', 'font-weight'] // Only keep these CSS properties
  };
}
```

---

## Paste Modes

The three modes are mutually exclusive — set only one to `true` at a time:

### Mode 1: Prompt Dialog (let user choose)

Opens a dialog with three options: **Keep** (preserve formatting), **Clean** (remove styles), **Plain Text**.

```typescript
public pasteSettings: PasteCleanupSettingsModel = {
  prompt: true  // Show paste options dialog
};
```

> When `prompt: true`, the `plainText` and `keepFormat` settings are ignored.

### Mode 2: Always Plain Text

Strips all HTML tags and styles — pastes only raw text:

```typescript
public pasteSettings: PasteCleanupSettingsModel = {
  plainText: true,
  prompt: false,
  keepFormat: false
};
```

### Mode 3: Keep Formatting (with filters)

Preserves original formatting but applies `deniedTags`, `deniedAttrs`, and `allowedStyleProps` filters:

```typescript
public pasteSettings: PasteCleanupSettingsModel = {
  keepFormat: true,
  prompt: false,
  plainText: false,
  allowedStyleProps: ['font-size', 'color', 'font-weight', 'text-decoration']
};
```

### Mode 4: Clean Format (default fallback)

When all three (`prompt`, `plainText`, `keepFormat`) are `false`, inline styles are removed but structural tags (`<p>`, `<ul>`, `<table>`) are kept:

```typescript
public pasteSettings: PasteCleanupSettingsModel = {
  prompt: false,
  plainText: false,
  keepFormat: false
};
```

---

## Filtering Tags and Attributes

**deniedTags — remove specific HTML elements:**

```typescript
public pasteSettings: PasteCleanupSettingsModel = {
  keepFormat: true,
  deniedTags: [
    'script',         // Remove all <script> tags
    'iframe',         // Remove all <iframe> tags
    'style',          // Remove all <style> tags
    'a[!href]',       // Remove <a> tags that have NO href attribute
    'a[href, target]' // Remove <a> tags that have BOTH href AND target
  ]
};
```

**deniedAttrs — remove specific attributes from all tags:**

```typescript
public pasteSettings: PasteCleanupSettingsModel = {
  keepFormat: true,
  deniedAttrs: ['class', 'id', 'style', 'data-*']
};
```

**allowedStyleProps — whitelist specific CSS properties (only applies when keepFormat is true):**

```typescript
public pasteSettings: PasteCleanupSettingsModel = {
  keepFormat: true,
  allowedStyleProps: [
    'color', 'background-color', 'font-size', 'font-family',
    'font-weight', 'font-style', 'text-decoration', 'text-align'
  ]
};
```

---

## Clipboard Cleanup (Copy/Cut)

`ClipboardCleanupService` automatically cleans content when users **copy or cut** from the editor — removing unwanted inline styles while preserving structure.

```typescript
import {
  RichTextEditorModule, ToolbarService, HtmlEditorService,
  ClipboardCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  providers: [
    ToolbarService, HtmlEditorService,
    ClipboardCleanupService  // Adds cleanup on copy/cut
  ]
})
export class AppComponent {}
```

> No additional configuration needed — injecting the service enables it.

---

## afterPasteCleanup Event

Fires after paste cleanup is complete. Use it to inspect or further transform the pasted content:

```typescript
import { AfterPasteCleanupEventArgs } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `
    <ejs-richtexteditor
      (afterPasteCleanup)="onAfterPaste($event)">
    </ejs-richtexteditor>
  `
})
export class AppComponent {
  onAfterPaste(args: AfterPasteCleanupEventArgs): void {
    // args.value — the cleaned HTML string about to be inserted
    console.log('Pasted content after cleanup:', args.value);

    // Optionally modify args.value before insertion
    // args.value = args.value.replace(/some-pattern/g, 'replacement');
  }
}
```

---

## Quick Reference: pasteCleanupSettings

| Property | Default | Description |
|---|---|---|
| `prompt` | `false` | Show dialog letting user choose paste mode |
| `plainText` | `false` | Strip all tags, paste as plain text |
| `keepFormat` | `true` | Preserve source formatting with optional filters |
| `deniedTags` | `null` | HTML tags to remove from pasted content |
| `deniedAttrs` | `null` | HTML attributes to strip from all pasted elements |
| `allowedStyleProps` | `[]` | CSS properties to keep (only applies when `keepFormat: true`) |

# Style, Accessibility & Keyboard Support

Reference for CSS customization, style encapsulation modes, WCAG 2.2 compliance, ARIA attributes, keyboard shortcuts, and shortcut key customization.

---

## Table of Contents
- [CSS Customization](#css-customization)
  - [Placeholder text](#placeholder-text)
  - [Content area](#content-area)
  - [Toolbar appearance](#toolbar-appearance)
  - [Character count display](#character-count-display)
  - [Container border](#container-border)
  - [Highlight text programmatically](#highlight-text-programmatically)
- [Style Encapsulation Modes](#style-encapsulation-modes)
- [Accessibility Compliance](#accessibility-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Shortcuts — HTML Mode](#keyboard-shortcuts--html-mode)
  - [Toolbar navigation](#toolbar-navigation)
  - [Content editing and formatting](#content-editing-and-formatting)
  - [Inserting content](#inserting-content)
  - [Table cell navigation](#table-cell-navigation)
  - [Undo / Redo](#undo--redo)
- [Keyboard Shortcuts — Markdown Mode](#keyboard-shortcuts--markdown-mode)
- [Customizing Shortcut Keys](#customizing-shortcut-keys)

---

## CSS Customization

All CSS selectors below work in the default (non-IFrame) mode. For IFrame mode, inject styles via `iframeSettings.styles`.

### Placeholder text

```css
.e-richtexteditor .e-rte-placeholder {
    color: blue;
    font-family: monospace;
}
```

### Content area

```css
/* Font family and size */
.e-richtexteditor .e-rte-content .e-content,
.e-richtexteditor .e-source-content .e-content {
    font-size: 20px;
    font-family: 'Segoe UI';
}

/* Background and text color */
.e-richtexteditor .e-rte-content,
.e-richtexteditor .e-source-content {
    background: seashell;
    color: blue;
}
```

### Toolbar appearance

```css
/* Toolbar icon color */
.e-richtexteditor .e-rte-toolbar .e-toolbar-item .e-icons,
.e-richtexteditor .e-rte-toolbar .e-toolbar-item .e-icons:active {
    color: red;
}

/* Toolbar button color */
.e-toolbar .e-tbar-btn,
.e-toolbar .e-tbar-btn:active,
.e-toolbar .e-tbar-btn:hover {
    color: red;
}

/* Active dropdown button */
.e-richtexteditor .e-rte-toolbar .e-toolbar-item .e-dropdown-btn.e-active .e-icons,
.e-richtexteditor .e-rte-toolbar .e-toolbar-item .e-dropdown-btn.e-active .e-rte-dropdown-btn-text {
    color: red;
}

/* Expanded toolbar items */
.e-richtexteditor .e-rte-toolbar .e-toolbar-extended .e-toolbar-item .e-tbar-btn .e-icons,
.e-toolbar.e-extended-toolbar .e-toolbar-extended .e-toolbar-item .e-tbar-btn {
    color: red;
}
```

### Character count display

```css
.e-richtexteditor .e-rte-character-count {
    color: red;
    font-family: 'Segoe UI';
    font-size: 18px;
    opacity: 0.54;
    padding-bottom: 2px;
    padding-right: 14px;
}
```

### Container border

```css
.e-richtexteditor .e-rte-container {
    border: 2px solid #454bc1;
    border-radius: 4px;
}
```

### Highlight text programmatically

Use `NodeSelection` to programmatically select a text range and then call `executeCommand('backColor', ...)`:

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {
    NodeSelection,
    RichTextEditorModule,
    RichTextEditorComponent,
    ToolbarService, LinkService, ImageService,
    HtmlEditorService, QuickToolbarService,
    TableService, PasteCleanupService
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <button (click)="highlight()" class="e-btn">Highlight</button>
        <ejs-richtexteditor #rte [value]="value"></ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService,
        HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent implements AfterViewInit {
    @ViewChild('rte') rteObj!: RichTextEditorComponent;
    value = '<p>The Rich Text Editor is a WYSIWYG editor.</p>';
    private nodeSelection = new NodeSelection();

    highlight() {
        const doc = (this.rteObj as any).contentModule.getDocument();
        const p = (this.rteObj as any).contentModule.getEditPanel().querySelector('p');
        if (p?.firstChild) {
            this.nodeSelection.setSelectionText(doc, p.firstChild, p.firstChild, 4, 20);
            this.rteObj.executeCommand('backColor', 'yellow');
        }
    }
}
```

---

## Style Encapsulation Modes

The RTE offers two rendering modes that determine how global application CSS interacts with editor content.

| Mode | How to Enable | Global CSS Affects Editor? |
|------|---------------|---------------------------|
| **Non-Encapsulated (default)** | `[iframeSettings]="{ enable: false }"` | ✅ Yes — app styles bleed in |
| **Encapsulated (IFrame)** | `[iframeSettings]="{ enable: true }"` | ❌ No — editor is isolated |

**Use IFrame mode when:**
- The app has global CSS resets or typography rules that break the editor content
- You need the editor content to look the same regardless of the host page styles

**Use default (non-IFrame) mode when:**
- You want the editor content to inherit the app's font and color theme
- You need Mention, Emoji, or Slash Menu (which require direct DOM access; see `references/smart-editing.md` for the IFrame + Mention workaround)

**Injecting styles into IFrame mode:**

```typescript
@Component({
    template: `<ejs-richtexteditor [iframeSettings]="iframeSettings"></ejs-richtexteditor>`,
    providers: [IFrameService, ToolbarService, HtmlEditorService, LinkService,
        ImageService, QuickToolbarService]
})
export class AppComponent {
    iframeSettings = {
        enable: true,
        styles: [
            { href: 'url' },
            { href: '/assets/custom-editor.css' }
        ]
    };
}
```

---

## Accessibility Compliance

The RTE meets the following accessibility standards:

| Criteria | Support Level |
|----------|---------------|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| Screen Reader | ✅ Full |
| Right-to-Left | ✅ Full |
| Color Contrast | ⚠️ Partial |
| Mobile Device | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker | ⚠️ Partial |
| axe-core Validation | ✅ Full |

---

## ARIA Attributes

### Toolbar element (`role="toolbar"`)

| Attribute | Value | Description |
|-----------|-------|-------------|
| `role` | `"toolbar"` | Identifies the toolbar element |
| `aria-orientation` | `"horizontal"` (default) | Indicates toolbar layout direction |
| `aria-haspopup` | `false` → `true` in popup mode | Indicates whether toolbar has a popup |
| `aria-disabled` | `true`/`false` | Reflects disabled state |
| `aria-owns` | RTE element ID | Links the toolbar to the editor it controls |

### Editor area (`role="application"`)

| Attribute | Value | Description |
|-----------|-------|-------------|
| `role` | `"application"` | Identifies the editable content area |
| `aria-disabled` | `true`/`false` | Reflects read-only or disabled state |

---

## Keyboard Shortcuts — HTML Mode

### Toolbar navigation

| Action | Windows | Mac |
|--------|---------|-----|
| Focus toolbar | `Alt + F10` | `⌥ + F10` |
| Move to next tool | `→` | `→` |
| Move to previous tool | `←` | `←` |
| Close dropdown/dialog | `Esc` | `Esc` |
| Execute focused tool | `Enter` / `Space` | `Enter` / `Space` |

### Content editing and formatting

| Action | Windows | Mac |
|--------|---------|-----|
| Select all | `Ctrl + A` | `⌘ + A` |
| Hard line break (new paragraph) | `Enter` | `Enter` |
| Soft line break | `Shift + Enter` | `⇧ + Enter` |
| Bold | `Ctrl + B` | `⌘ + B` |
| Italic | `Ctrl + I` | `⌘ + I` |
| Underline | `Ctrl + U` | `⌘ + U` |
| Strikethrough | `Ctrl + Shift + S` | `⌘ + ⇧ + S` |
| Inline code | `Ctrl + `` ` `` ` | `⌘ + `` ` `` ` |
| Create link | `Ctrl + K` | `⌘ + K` |
| Copy format painter | `Alt + Shift + C` | `⌥ + ⌘ + C` |
| Paste format painter | `Alt + Shift + V` | `⌥ + ⌘ + V` |
| Clear format painter | `Esc` | `Esc` |
| Tab indent (when `enableTabKey: true`) | `Tab` | `Tab` |

### Inserting content

| Action | Windows | Mac |
|--------|---------|-----|
| Insert table dialog | `Ctrl + Shift + E` | `⌘ + ⇧ + E` |
| Insert image dialog | `Ctrl + Shift + I` | `⌘ + ⇧ + I` |
| Insert audio dialog | `Ctrl + Shift + A` | `⌘ + ⇧ + A` |
| Insert video dialog | `Ctrl + Alt + V` | `⌘ + ⌥ + V` |

### Table cell navigation

| Action | Windows | Mac |
|--------|---------|-----|
| Move to next cell | `Tab` | `Tab` |
| Move to previous cell | `Shift + Tab` | `⇧ + Tab` |
| Insert new row at end | `Tab` (in last cell) | `Tab` (in last cell) |

### Undo / Redo

| Action | Windows | Mac |
|--------|---------|-----|
| Undo | `Ctrl + Z` | `⌘ + Z` |
| Redo | `Ctrl + Y` | `⌘ + Y` |

---

## Keyboard Shortcuts — Markdown Mode

When `editorMode: 'Markdown'` is set, the same formatting shortcuts apply but produce Markdown syntax instead of HTML tags.

| Action | Windows | Mac |
|--------|---------|-----|
| Bold | `Ctrl + B` | `⌘ + B` |
| Italic | `Ctrl + I` | `⌘ + I` |
| Strikethrough | `Ctrl + Shift + S` | `⌘ + ⇧ + S` |
| Ordered list | `Ctrl + Shift + O` | `⌘ + ⇧ + O` |
| Unordered list | `Ctrl + Shift + U` | `⌘ + ⇧ + U` |
| Undo | `Ctrl + Z` | `⌘ + Z` |
| Redo | `Ctrl + Y` | `⌘ + Y` |

---

## Customizing Shortcut Keys

Use the `formatter` property with `HTMLFormatter` to override or add keyboard shortcuts:

```typescript
import { Component } from '@angular/core';
import {
    RichTextEditorModule, ToolbarService, LinkService, ImageService,
    HtmlEditorService, QuickToolbarService, TableService, PasteCleanupService,
    IHtmlFormatterModel, HTMLFormatter
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-richtexteditor [formatter]="formatter"></ejs-richtexteditor>`,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,
        QuickToolbarService, TableService, PasteCleanupService]
})
export class AppComponent {
    // Override: use Ctrl+Q to open Insert Link dialog instead of Ctrl+K
    private customKeys: IHtmlFormatterModel = {
        keyConfig: {
            'insert-link': 'ctrl+q'
        }
    };
    public formatter = new HTMLFormatter(this.customKeys);
}
```

**Key name reference for `keyConfig`:**

| Key Name | Default Shortcut |
|----------|-----------------|
| `bold` | `ctrl+b` |
| `italic` | `ctrl+i` |
| `underline` | `ctrl+u` |
| `strikethrough` | `ctrl+shift+s` |
| `insert-link` | `ctrl+k` |
| `undo` | `ctrl+z` |
| `redo` | `ctrl+y` |
| `copy` | `ctrl+c` |
| `cut` | `ctrl+x` |
| `paste` | `ctrl+v` |

> **Note:** Key names in `keyConfig` are case-insensitive but must match the internal action names exactly as listed above.

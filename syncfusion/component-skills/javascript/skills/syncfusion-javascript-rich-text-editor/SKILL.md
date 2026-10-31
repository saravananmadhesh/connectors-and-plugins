---
name: syncfusion-javascript-rich-text-editor
description: "Implements the Syncfusion Rich Text Editor and Markdown Editor using TypeScript (ej2-richtexteditor). Supports both HTML (WYSIWYG) and Markdown modes via editorMode on a single RichTextEditor class. Use this skill for toolbar setup, image/media/table handling, inline or iframe editing, AI assistant, smart editing, import/export, and all content editor scenarios."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "File Viewers & Editors"
---

# Implementing Syncfusion Rich Text Editor

A unified skill for implementing the Syncfusion Rich Text Editor (RTE) and Markdown Editor in TypeScript. Both editors share the **same `RichTextEditor` class and `@syncfusion/ej2-richtexteditor` package** — the only difference is the `editorMode` property and which feature module you inject.

## Editor Mode Decision Guide

> **User wants WYSIWYG / formatted HTML content?** → Use `editorMode: 'HTML'` (default), inject `HtmlEditor`
>
> **User wants markdown / plain text with preview?** → Use `editorMode: 'Markdown'`, inject `MarkdownEditor`
>
> **User wants iframe isolation?** → Add `iframeSettings: { enable: true }` to HTML mode
>
> **User wants inline editing?** → Add `inlineMode: { enable: true }` to HTML mode

## When to Use This Skill

Use this skill when the user needs to:

- **Build a rich text / WYSIWYG editor** for blog posts, comments, emails, CMS content
- **Build a markdown editor** with live preview for documentation, note-taking, developer tools
- **Customize the toolbar** — add/remove items, change layout, add custom tools
- **Insert media** — images, audio, video, file browser integration
- **Enable smart editing** — @mention, slash commands, emoji picker, mail merge
- **Add AI writing assistance** to the editor
- **Handle editor value** — get/set HTML or markdown content, auto-save, character count
- **Work with tables and links** inside the editor
- **Configure validation** — form integration, XHTML validation, read-only mode
- **Style or theme** the editor — fonts, colors, CSS customization
- **Import/export content** — Word/PDF/Markdown import and export

**Trigger keywords:** RichTextEditor, MarkdownEditor, editorMode, WYSIWYG, rich text, markdown editor, content editor, text formatting, ej2-richtexteditor, HtmlEditor, inline editor, iframe editor

---

## Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Package installation and CSS imports
- Module injection (HtmlEditor vs MarkdownEditor)
- HTML editor initialization
- Markdown editor initialization
- Toolbar configuration at setup
- Feature module reference table

### Editor Modes & Types
📄 **Read:** [references/editor-modes.md](references/editor-modes.md)
- HTML mode vs Markdown mode decision
- Iframe editor (style-isolated editing)
- Inline editing (toolbar appears on selection)
- Resizable editor
- editorMode API and switching modes

### Toolbar Configuration
📄 **Read:** [references/toolbar.md](references/toolbar.md)
- Toolbar types: Expand, MultiRow, Scrollable, Popup
- Toolbar position: Top / Bottom
- Sticky (floating) toolbar
- Quick toolbars for image, link, table, audio, video, text
- Separator usage (`|` and `-`)

### Tools (Built-in & Custom)
📄 **Read:** [references/tools.md](references/tools.md)
- Complete built-in tools catalog (text, font, alignment, lists, etc.)
- Adding and removing toolbar tools
- Creating custom toolbar commands
- Enabling / disabling toolbar items programmatically
- Text formatting, styling, fullscreen tools

### Editor Value (Get/Set/Save)
📄 **Read:** [references/editor-value.md](references/editor-value.md)
- Set initial content with `value` / `valueTemplate`
- Get HTML content: `editor.value`, `getHtml()`, `getText()`
- Change events and auto-save (`saveInterval`)
- Character count and max length
- Encoded HTML output (`enableHtmlEncode`)
- Source code editing (SourceCode tool)
- Placeholder text

### Insert Image & Media
📄 **Read:** [references/insert-image-media.md](references/insert-image-media.md)
- Insert images (URL, upload, drag-drop)
- Insert audio and video
- File browser integration
- Upload configuration (server upload, rename)
- Image/media quick toolbar

### Tables
📄 **Read:** [references/table.md](references/table.md)
- Creating tables (toolbar, programmatic)
- Table quick toolbar operations
- Cell properties, alignment, merge/split
- Table style customization

### Links
📄 **Read:** [references/link.md](references/link.md)
- Insert hyperlinks
- Link quick toolbar (Open, Edit, Remove)
- Auto-linking URLs

### Smart Editing
📄 **Read:** [references/smart-editing.md](references/smart-editing.md)
- @mention integration
- Slash menu / slash commands
- Emoji picker
- Mail merge with dynamic placeholders

### AI Assistant
📄 **Read:** [references/ai-assistant.md](references/ai-assistant.md)
- Integrating AI assistant panel
- AI assistant properties and configuration
- Customizing AI suggestions UI

### Markdown-Specific Features
📄 **Read:** [references/markdown-features.md](references/markdown-features.md)
- Supported markdown syntax (headings, lists, bold, italic, etc.)
- Custom markdown format definitions
- Live markdown preview (split-pane)
- Insert image / table in markdown mode
- Mention support in markdown mode
- Toolbar items specific to markdown

### Content Operations
📄 **Read:** [references/content-operations.md](references/content-operations.md)
- Code block support
- Text selection API
- Clipboard cleanup
- Paste cleanup (Word paste, HTML cleanup)
- Undo/redo configuration
- Execute command programmatically (`executeCommand`)
- Enter key configuration (P, BR, DIV)

### Import & Export
📄 **Read:** [references/import-export.md](references/import-export.md)
- Import Word/HTML documents into the editor
- Export editor content to Word / PDF
- Markdown import/export

### Style & Appearance
📄 **Read:** [references/style-appearance.md](references/style-appearance.md)
- CSS customization and `cssClass`
- Style encapsulation
- Adding custom Google fonts
- Spell and grammar check
- Globalization (RTL, localization)
- Tailwind CSS preflight workarounds
- Default font configuration
- Placeholder text styling

### Validation & Security
📄 **Read:** [references/validation-security.md](references/validation-security.md)
- HTML form integration with RTE
- XHTML validation and XSS prevention
- Read-only mode

### How-To Scenarios
📄 **Read:** [references/how-to.md](references/how-to.md)
- RTE inside Dialog
- RTE inside Tab control
- File attachment support
- File size restrictions
- Format code blocks
- Custom shortcut keys
- Save functionality
- Cursor position control
- Rename images on server

### Properties Reference
📄 **Read:** [references/properties.md](references/properties.md)
- Complete list of all `RichTextEditor` properties with types, defaults, and descriptions
- Sub-type details for complex model properties (toolbar, image, table, font, color, AI assistant, etc.)
- Code examples for key properties

### Methods Reference
📄 **Read:** [references/methods.md](references/methods.md)
- Complete list of all public instance methods with signatures and return types
- Parameter details and usage examples
- `executeCommand` with full `CommandName` enum and argument interfaces
- Static `Inject` method and available module list

### Events Reference
📄 **Read:** [references/events.md](references/events.md)
- Complete list of all component events with types and event argument details
- Lifecycle events: `created`, `destroyed`, `blur`, `focus`, `change`
- Upload events for images, audio, and video
- AI Assistant events: `aiAssistantPromptRequest`, `aiAssistantToolbarClick`, `aiAssistantStopRespondingClick`
- Toolbar, popup, dialog, quick toolbar, resize, and selection events

---

## Quick Start

```bash
npm install @syncfusion/ej2-angular-richtexteditor
```
```bash
npm install @syncfusion/ej2-tailwind3-theme
```
### HTML Editor (WYSIWYG)

```css
/* styles.css */
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/rich-text-editor/index.css';
```

```typescript
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|',
            'SourceCode', 'Undo', 'Redo']
  },
  value: '<p>Start editing here...</p>'
});
editor.appendTo('#editor');
```

```html
<!-- index.html -->
<div id="editor"></div>
```

### Markdown Editor

```typescript
import { RichTextEditor, Toolbar, Link, Image, MarkdownEditor } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, MarkdownEditor);

const editor = new RichTextEditor({
  editorMode: 'Markdown',
  toolbarSettings: {
    items: ['Bold', 'Italic', 'StrikeThrough', 'InlineCode', '|',
            'Formats', 'Blockquote', '|', 'OrderedList', 'UnorderedList',
            'CreateLink', 'Image', 'CreateTable', '|', 'Undo', 'Redo']
  },
  value: '## Hello Markdown\n\nStart writing here...'
});
editor.appendTo('#editor');
```

---

## Common Patterns

### Get editor value on form submit

```typescript
const form = document.getElementById('myForm');
form.addEventListener('submit', () => {
  const content = editor.value; // HTML string or Markdown string
  console.log(content);
});
```

### Auto-save content

```typescript
const editor = new RichTextEditor({
  saveInterval: 5000, // save every 5 seconds of inactivity
  change: (args) => {
    localStorage.setItem('draft', args.value);
  }
});
```

### Read-only mode

```typescript
editor.readonly = true;
```

### Programmatically set content

```typescript
editor.value = '<p>New content</p>';
editor.dataBind(); // apply the change
```

---

## Module Injection Reference

| Feature | Module to Inject |
|---------|-----------------|
| HTML editing | `HtmlEditor` |
| Markdown editing | `MarkdownEditor` |
| Toolbar | `Toolbar` |
| Hyperlinks | `Link` |
| Images | `Image` |
| Audio | `Audio` |
| Video | `Video` |
| Tables | `Table` |
| Quick toolbars | `QuickToolbar` |
| Paste cleanup | `PasteCleanup` |
| Character count | `Count` |
| Resize | `Resize` |
| File manager | `FileManager` |
| Mention | `Mention` (from ej2-dropdowns) |

> Inject only what you need — each module adds to bundle size. Always call `RichTextEditor.Inject(...)` before `new RichTextEditor(...)`.

---
name: syncfusion-javascript-headless-editor
description: Implement rich-text editing with Syncfusion JavaScript Headless Editor. Covers editor initialization, document structure, commands, extensions, node types, marks, custom extensions, content operations, keyboard shortcuts, and advanced customization patterns.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion JavaScript Headless Editor

The **Syncfusion JavaScript Headless Editor** is a powerful, extensible rich-text editing library built on ProseMirror. It provides programmatic control over document editing without bundling a UI, making it ideal for custom editor implementations, headless content systems, and embedded editing experiences.

## Overview

Use the Headless Editor when you need:
- **Programmatic control** over text editing and formatting
- **Custom UI** built to your exact specifications
- **Headless integration** into existing applications
- **Advanced document model** with nodes, marks, and extensions
- **Fine-grained event handling** and command execution

## Documentation and Navigation Guide

This skill bundles 27 reference files that map to the Syncfusion TypeScript Headless Editor documentation: 26 conceptual reference files plus 1 API reference file (sourced from the Syncfusion API documentation at `https://ej2.syncfusion.com/documentation/api/headless-editor/`). The node types are split per-node — start with [references/nodes.md](references/nodes.md) for the index. Use the navigation below to locate the right reference for a given task.

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Prerequisites (Node.js 24.13.0 or higher)
- Creating a TypeScript application with Vite
- Installing `@syncfusion/ej2-headless-editor` and the Tailwind 3 theme
- Adding the CSS reference and the main editor library
- Running the application

### HeadlessEditor Class API (Methods)
📄 **Read:** [references/editor-methods.md](references/editor-methods.md)
- Method-by-method reference for the public surface of the `HeadlessEditor` class (sourced from the Syncfusion API documentation at `https://ej2.syncfusion.com/documentation/api/headless-editor/`)
- Static factory: `HeadlessEditor.create(config)`
- `commands` property (returns `TypedCommandsFacade`)
- Instance methods: `mount`, `unmount`, `destroy`, `setOptions`, `setContent`, `setDocument`, `getDocument`, `getHtml`, `getText`, `getSelectionText`, `getSelection`, `getSelectionContext`, `getSelectedBlocks`, `getSelectedLeafNodes`, `getSelectedCells`, `saveSelection`, `restoreSelection`, `focusView`, `getFileHandler`, `setFileUploadHandler`, `can`, `chain`, `execute`, `on`, `off`

### Editor API (Lifecycle, Configuration, Events)
📄 **Read:** [references/editor-api.md](references/editor-api.md)
- Creating an editor with `HeadlessEditor.create()`
- Editor configuration (`content`, `document`, `extensions`, behavior toggles, lifecycle hooks)
- Mounting and unmounting
- Updating configuration with `setOptions()`
- Disposing an editor with `destroy()`
- Reading content (`getDocument`, `getHtml`, `getText`, `getSelectionText`)
- Setting content (`setContent`, `setDocument`)
- Selection helpers (`getSelection`, `getSelectionContext`, `getSelectedBlocks`, `getSelectedLeafNodes`, `getSelectedCells`)
- Selection snapshots (`saveSelection`, `restoreSelection`)
- Focus management (`focusView`)
- Event subscription (`on`, `off`)
- Public API: `EditorConfig`, selection helper types (`SelectedNode`, `SelectionContext`, `SelectionMark`, `SelectionNode`, `SelectionSnapshotStatus`), event payloads (`ContentChangedEventArgs`, `DocumentChangedEventArgs`, `DocumentChangeAction`), static factories (`createSnapshot`, `withStatus`) — all under `### API references`

### Document Structure & Content Model
📄 **Read:** [references/document.md](references/document.md)
- Document tree architecture (block nodes, inline nodes, marks)
- Document root identity and stability across reloads
- Content layers (block-level nodes, inline content, marks)
- Schema stability
- Document examples (paragraphs, headings, lists, links, formatted text)
- Public API: `DocumentRoot`, `EditorNode`, `TextNode`, `EditorState`, `Position`, `Mark` — under `### API references`

### Core Commands
📄 **Read:** [references/core-commands.md](references/core-commands.md)
- Command execution (`editor.commands.*`, `editor.execute`)
- Command return values
- Checking availability (`editor.can()`, `canRun()`)
- Default injectable commands (content, formatting, structure, selection)
- Content commands (`insertText`, `deleteText`, `replaceText`, `deleteRange`)
- Selection commands (`setSelection`, `clearSelection`, `selectAll`)
- Command chaining (`editor.chain()`)
- Public API: command framework types (`Command`, `CommandContext`, `PMCommandContext`, `NodeResolver`, `SelectionType`), command facades (`TypedCommandsFacade`, `TypedCanFacade`, `TypedChain`), metadata types (`CommandMeta`, `ChainResult`, `ValidationError`), `DeleteRangePayload` — all under `### API references`

### Content Operations
📄 **Read:** [references/content-operations.md](references/content-operations.md)
- Reading content (`getDocument`, `getHtml`, `getText`, `getSelectionText`)
- Setting content (`setContent`, `setDocument`)
- Updating content in-place via typed commands
- HTML import and export
- JSON serialization (round-trip)
- End-to-end example

### Clipboard & Paste
📄 **Read:** [references/clipboard.md](references/clipboard.md)
- Paste lifecycle (`beforePaste`, `afterPaste` events)
- Customizing paste (`EditorConfig.clipboard` hooks: `transformHTML`, `transformContent`)
- Clipboard security (built-in sanitizer)
- HTML sanitization (XSS vector list)
- Public API: `ClipboardContent`, `ClipboardOptions`, `ClipboardTransformContext`, `PasteContent`, `BeforePasteEventArgs`, `AfterPasteEventArgs` — under `### API references`

### File Upload
📄 **Read:** [references/file-upload.md](references/file-upload.md)
- Lifecycle overview (paste/drop → `FileHandler` → upload → node insertion)
- Editor API: `getFileHandler`, `setFileUploadHandler`
- `EditorConfig` options: `fileUploadHandler`, `beforeFileUpload`, `fileReceived`
- Lifecycle callbacks: `beforeFileUpload` (MIME/size validation), `fileReceived`
- File upload security
- Image-upload position helpers
- Public API: `FileHandler`, `PendingFileUpload`, `FileUploadHandler`, `FileUploadProgress`, `FileUploadRequest`, `FileUploadResult`, `BeforeFileUploadEventArgs`, `FileReceivedEventArgs` — under `### API references`

### Extensions & Plugin System
📄 **Read:** [references/extensions.md](references/extensions.md)
- `basicExtensions` preset
- Adding extensions alongside the preset
- Registering extensions individually
- How extensions compose
- Defining a custom extension
- Extension config fields (summary)
- Reusing extensions
- Extension lifecycle
- Registering custom extensions
- End-to-end example: document variable

### Customization (Extension Authoring Deep Dive)
📄 **Read:** [references/customization.md](references/customization.md)
- Extension config fields
- Custom nodes
- Custom marks
- Custom commands
- Custom keyboard shortcuts
- Custom input rules
- Custom plugins
- Custom DOM specifications
- Custom node views
- Custom attributes
- Layering a node view on an existing node
- Extension constraints
- Public API: schema building blocks (`AttributeDefinition`, `NodeGroup`, `NodeDefinition`, `MarkDefinition`), `NodeContent`, extension authoring types (`ExtensionConfig`, `ExtensionDefinition`, `ExtensionOptions`, `ExtensionDOMSpecs`, `NodeDOMDescriptor`, `MarkDOMDescriptor`, `DOMOutputDescriptor`, `NodeViewDescriptor`, `NodeViewConstructor`), input-rule option types (`CreateNodeRuleOptions`, `CreateLinkRuleOptions`, `CreateTextBlockRuleOptions`, `CreateWrappingRuleOptions`, `InputRuleDefinition`, `InputRuleContext`), static factory functions (`defineExtension`, `createLinkRule`, `createMarkRule`, `createTextBlockRule`, `createWrappingRule`) — all under `### API references`

### Mark Types Reference
📄 **Read:** [references/mark-types.md](references/mark-types.md)
- Built-in marks: bold, italic, underline, strikethrough
- Link mark (with URL validation, open-on-click)
- Inline code
- Font color, background color, font family, font size
- Subscript, superscript
- `toLowerCase`, `toUpperCase` case transforms
- Per-mark payload types (`SetHighlightPayload`, `SetColorPayload`, `SetFontFamilyPayload`, `SetFontSizePayload`, `SetLinkPayload`) and `LinkExtensionOptions` under each mark's `### API references`
- Generic `SetMarkPayload` under `## Generic Mark Payload`

### Advanced Features
📄 **Read:** [references/advanced-features.md](references/advanced-features.md)
- Placeholder configuration (text and dynamic)
- Text alignment (with `setTextAlign` / `unsetTextAlign` commands)
- Indentation and outdentation (`indentOutdentExtension`, Tab/Shift-Tab)
- Undo and redo (`undoRedoExtension`)
- Advanced command patterns (availability checking, multi-step formatting, set-and-move)
- Public API: `PlaceholderOptions`, `TextAlignOptions`, `UndoRedoOptions`, static factories `setTextAlignCommand`/`unsetTextAlignCommand` — all under `### API references`

### Accessibility & Security
📄 **Read:** [references/accessibility-security.md](references/accessibility-security.md)
- Accessibility overview and capabilities
- WCAG 2.2 compliance
- WAI-ARIA attributes (applying to the editor container, read-only mode, aria-labelledby)
- Keyboard accessibility (default and custom shortcuts)
- Screen reader support
- Custom node accessibility
- Security considerations (clipboard sanitization, link security, content security policy)

### Node Types Reference (Index)
📄 **Read:** [references/nodes.md](references/nodes.md)
- Overview, shared behavior, and index of every per-node file
- Per-node page template (register → attributes → configure → commands → shortcuts → input rules → API references)
- Two auto-registered keymap extensions (`listKeymapExtension`, `collapsibleKeymapExtension`)

### Block Node — Paragraph
📄 **Read:** [references/paragraph.md](references/paragraph.md)
- The default body block; auto-registered with `document`
- Attributes: `align`, `indent`, `htmlAttributes`

### Block Node — Heading
📄 **Read:** [references/heading.md](references/heading.md)
- Headings levels 1-6
- Attributes: `level`, `align`, `indent`, `htmlAttributes`
- Keyboard shortcuts (Ctrl/Cmd + Alt + 1..6) and Markdown-style input rules
- Public API: `SetHeadingPayload` under `### API references`

### Block Node — Block Quote
📄 **Read:** [references/block-quote.md](references/block-quote.md)
- The `blockquote` container; renders as `<blockquote>`
- Included in `basicExtensions` preset
- Input rule: `>` followed by space

### Block Node — Code Block
📄 **Read:** [references/code-block.md](references/code-block.md)
- Renders preformatted code as `<pre><code>`
- Language attribute; tab indentation; arrow / triple-Enter exit behavior
- Included in `basicExtensions` preset
- Public API: `CodeBlockOptions`, `IndentCodeBlockPayload`, `OutdentCodeBlockPayload` under `### API references`

### List Node — Bullet & Ordered List
📄 **Read:** [references/list.md](references/list.md)
- Bullet list (`bulletList` + `listItem`) and ordered list (`orderedList` + `listItem`)
- Attributes: `listStyleType`, `order`, `htmlAttributes`, `itemHtmlAttributes`
- Input rules: `-` / `*` / `+` for bullets, `1.` for ordered
- Public API: `ListExtensionOptions`, `ListKeymapExtensionOptions`, list-type payloads (`SetBulletListTypePayload`, `SetOrderedListTypePayload`, `ToggleBulletListPayload`, `ToggleOrderedListPayload`, `ToggleListTypePayload`) under `### API references`

### List Node — Task List
📄 **Read:** [references/task-list.md](references/task-list.md)
- Checkable to-do lists (`taskList` + `taskItem`)
- Attributes: `checked`, `nested`, `htmlAttributes`, `itemHtmlAttributes`
- Input rule: `[]` or `[ ]` followed by space
- Public API: `TaskListExtensionOptions`, `ToggleTaskCheckedPayload`, `ToggleTaskListPayload` under `### API references`

### Block Node — Horizontal Rule
📄 **Read:** [references/horizontal-rule.md](references/horizontal-rule.md)
- The leaf `horizontalRule` node; renders as `<hr>`
- Included in `basicExtensions` preset
- Input rules: `---`, `***`, or `___` on an empty line

### Block Node — Callout
📄 **Read:** [references/callout.md](references/callout.md)
- Recursive container for highlighted message boxes
- Six variants: info, warning, note, success, error, tip
- Input rules: `!!!` for info, `:::` for note
- Public API: `CalloutExtensionOptions`, `CalloutVariant` under `### API references`

### Block Node — Collapsible
📄 **Read:** [references/collapsible.md](references/collapsible.md)
- Expandable section container with `collapse` / `expand` commands
- Two trigger types: paragraph-triggered and heading-triggered
- Keyboard shortcut: Mod-Alt-[
- Public API: `CollapsibleExtensionOptions`, `CollapsePayload`, `ExpandPayload` under `### API references`

### Block Node — Table
📄 **Read:** [references/table.md](references/table.md)
- Tables (`table`, `tableRow`, `tableCell`, `tableHeader`)
- Cell selection and navigation (Tab, Shift-Tab)
- Public API: `TableOptions`, `InsertTablePayload`, cell selection types (`CellSelection`, `SelectedCell`) under `### API references`

### Block Node — Image
📄 **Read:** [references/image.md](references/image.md)
- Image node with `src`, `alt`, `width`, `height`, `title` attributes
- Drag-to-resize, alignment, link wrapping
- File upload integration
- Public API: `ImageOptions`, image resize options, image-upload payloads, image enums, `InsertImagePayload` under `### API references`

### Inline Node — Text
📄 **Read:** [references/text-node.md](references/text-node.md)
- The inline `text` node; auto-registered

### Inline Node — Hard Break
📄 **Read:** [references/hard-break.md](references/hard-break.md)
- The inline `hardBreak` node; renders as `<br>`
- Included in `basicExtensions` preset
- Keyboard shortcut: Shift + Enter

---

## Quick Start Example

### Basic Editor Setup

```ts
import './style.css';
import { HeadlessEditor, basicExtensions, placeholderExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [basicExtensions, placeholderExtension]
});

const container = document.getElementById('headless-editor');

if (container) {
    editor.mount(container);
}
```

### HTML Template (`src/index.html`)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Syncfusion TypeScript Headless Editor</title>
</head>

<body>
    <div id="container">
        <div id="headless-editor"></div>
    </div>
    <script type="module" src="/src/main.ts"></script>
</body>

</html>
```

### CSS Reference (`src/style.css`)

```css
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/headless-editor/index.css";
```

---

## Common Patterns

### Pattern 1: Read Content in Different Formats

**Get the structured document as JSON:**
```ts
const doc = editor.getDocument();
console.log(doc.type); // 'document'
doc.children.forEach((node) => console.log(node.type));
```

**Serialize to HTML:**
```ts
const html = editor.getHtml();
console.log(html); // "<p>Hello <strong>world</strong></p>"
```

**Get plain text:**
```ts
const text = editor.getText();
console.log(text); // "Hello world"
```

**Get selected text only:**
```ts
const selected = editor.getSelectionText();
if (selected) {
  console.log(`User selected: ${selected}`);
}
```

### Pattern 2: Set New Content

**Replace with HTML:**
```ts
editor.setContent('<h1>New Title</h1><p>Fresh content.</p>');
```

**Clear to empty paragraph:**
```ts
editor.setContent('');
```

**Assign structured document:**
```ts
editor.setDocument({
  type: 'document',
  attrs: {},
  children: [
    { type: 'paragraph', attrs: {}, children: [] }
  ]
});
```

### Pattern 3: Update Content In-Place

**Insert text at current selection:**
```ts
editor.commands.insertText({ text: 'Hello world' });
```

**Insert at specific offset:**
```ts
editor.commands.insertText({ text: 'Hello world', at: { offset: 0 } });
```

**Replace text in range:**
```ts
editor.commands.replaceText({
  from: { offset: 0 },
  to:   { offset: 11 },
  text: 'Updated text'
});
```

### Pattern 4: Configure Editor Behavior

**Enable read-only mode:**
```ts
const editor = HeadlessEditor.create({
    extensions: [basicExtensions],
    readOnly: true
});
```

**Update options after creation:**
```ts
editor.setOptions({
    readOnly: true,
    autoSaveSelectionOnBlur: true
});
```

**Enable markdown input rules (default):**
```ts
const editor = HeadlessEditor.create({
    extensions: [basicExtensions],
    enableInputRules: true
});
```

### Pattern 5: Lifecycle and Cleanup

**Recommended pattern for teardown:**
```ts
const editor = HeadlessEditor.create({
    extensions: [basicExtensions],
    destroyed: () => {
        console.log('Editor cleaned up');
    }
});

editor.mount(container);

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    editor.destroy();
});
```

**Note:** `destroy()` is safe to call more than once and should be called in teardown hooks.

---

## Key Concepts

### Editor Lifecycle
1. **Create** - Instantiate with `HeadlessEditor.create()`
2. **Mount** - Attach to DOM with `mount()`
3. **Interact** - Execute commands, handle events
4. **Unmount** - Detach from DOM with `unmount()`
5. **Destroy** - Clean up with `destroy()`

### Document Model
- **Root:** Single `document` node containing block-level children
- **Blocks:** Paragraphs, headings, lists, tables, code blocks, etc.
- **Inline Content:** Text nodes and marks inside blocks
- **Marks:** Formatting applied to text (bold, links, color, etc.)
- **Extensible:** Custom nodes and marks via extensions

### Command Execution
- **Return value** - Commands return `true` when a change happened and `false` otherwise
- **Example:** `editor.commands.toggleBold()`, `editor.commands.setHeading({ level: 2 })`
- **State-aware** - Commands check current selection and document state
- **Chainable** - Multiple commands can be executed in sequence

### Extension Architecture
- **Modular:** Each feature (bold, lists, tables) is an independent extension
- **Composable:** Combine extensions to build custom editors
- **Lifecycle:** Extensions have hooks for setup, teardown, and priority management
- **Customizable:** Define custom extensions with commands, shortcuts, and rules

---

## Configuration Options

| Option | Type | Default | Purpose |
|--------|------|---------|---------|
| `extensions` | Extension[] | - | Enable features such as bold, headings, lists, and tables |
| `content` | string | - | Initial HTML content |
| `document` | DocumentRoot | - | Initial document (alternative to `content`); takes precedence when both are provided |
| `autofocus` | - | - | Focus the editor automatically when it is mounted |
| `readOnly` | - | - | Render the editor in read-only mode |
| `enableInputRules` | - | `true` | Enable markdown-style autoformatting |
| `enableTabKey` | - | `true` | Enable Tab and Shift+Tab behavior |
| `autoSaveSelectionOnBlur` | - | - | Save the selection when the editor loses focus |

Structural properties such as `document`, `content`, `extensions`, and `clipboard` cannot be changed after creation. To change them, destroy the editor and create a new one.

**Lifecycle Callbacks:**

| Callback | Purpose |
|----------|---------|
| `created` | Called when editor is fully initialized |
| `destroyed` | Called when editor is destroyed |
| `contentChanged` | Called when document content changes |
| `documentChanged` | Called when the document is replaced (via `setContent` / `setDocument`) with `action: 'Replaced'` |
| `selectionChanged` | Called when selection/cursor moves |
| `focus` | Called when editor receives focus |
| `blur` | Called when editor loses focus |

---

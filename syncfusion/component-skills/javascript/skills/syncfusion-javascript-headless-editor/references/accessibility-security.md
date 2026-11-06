# Accessibility & Security

## Table of Contents

- [Accessibility Overview](#accessibility-overview)
  - [Accessibility Capabilities](#accessibility-capabilities)
- [WCAG Compliance](#wcag-compliance)
  - [Accessibility Criteria Summary](#accessibility-criteria-summary)
- [WAI-ARIA Attributes](#wai-aria-attributes)
  - [Applying ARIA to the Editor Container](#applying-aria-to-the-editor-container)
  - [Required Attributes](#required-attributes)
  - [Read-Only Mode](#read-only-mode)
  - [Using aria-labelledby](#using-aria-labelledby)
- [Keyboard Accessibility](#keyboard-accessibility)
  - [Default Keyboard Shortcuts](#default-keyboard-shortcuts)
  - [Custom Keyboard Shortcuts](#custom-keyboard-shortcuts)
- [Screen Reader Support](#screen-reader-support)
- [Custom Node Accessibility](#custom-node-accessibility)
- [Security Considerations](#security-considerations)
  - [Content Security](#content-security)
  - [Link Security](#link-security)
  - [Security best practices](#security-best-practices)

## Accessibility Overview

The Headless Editor supports keyboard interaction, focus management, semantic content, read-only content, and accessible custom nodes. The consuming application must provide the surrounding labels, roles, toolbar, and controls.

### Accessibility Capabilities

- Keyboard shortcuts through built-in and custom extensions
- Focus, blur, autofocus, and selection management
- Semantic DOM output through node and mark definitions
- Read-only editing through the `readOnly` configuration
- Custom node and node view APIs for embedded content

ARIA roles and labels are not added automatically. The consuming application must apply the appropriate attributes to the editor and its controls.

---

## WCAG Compliance

### Accessibility Criteria Summary

| Accessibility Criteria | Compatibility |
|---|---|
| WCAG 2.2 Support | Intermediate |
| Screen Reader Support | Intermediate |
| Keyboard Navigation Support | Yes |
| Focus Management Support | Yes |
| Read-only Support | Yes |
| Semantic Content Rendering | Yes |
| ARIA Roles and States | Intermediate |
| Color Contrast and Validation | No |

---

## WAI-ARIA Attributes

### Applying ARIA to the Editor Container

The Headless Editor does not add ARIA roles or labels automatically. Add the following attributes to the editable element and application controls as required.

### Required Attributes

| Attribute | Applicability |
|---|---|
| `role="textbox"` and `aria-multiline="true"` | Identify the editable multiline region. |
| `aria-label` or `aria-labelledby` | Provide an accessible name for the editor. |
| `aria-readonly="true"` | Apply when `readOnly: true` is configured. |
| `aria-describedby` | Associate instructions or validation messages. |

The following example applies the recommended attributes:

```ts
import { HeadlessEditor, basicExtensions } from '@syncfusion/ej2-headless-editor';

const readOnly = true;
const editor: HeadlessEditor = HeadlessEditor.create({
  extensions: [basicExtensions],
  readOnly
});
const container: HTMLElement | null = document.getElementById('headless-editor');

if (container) {
  editor.mount(container);
}

const editableElement = container.querySelector('.ProseMirror');
if (editableElement instanceof HTMLElement) {
	editableElement.setAttribute('role', 'textbox');
	editableElement.setAttribute('aria-label', 'Document editor');
	editableElement.setAttribute('aria-multiline', 'true');

	if (readOnly) {
		editableElement.setAttribute('aria-readonly', 'true');
	}
}
```

Use `aria-labelledby` when a visible label is available. If the editor changes to read-only mode, update `aria-readonly` with the editor state.

### Read-Only Mode

When the editor is in read-only mode, update the `aria-readonly` attribute:

```ts
import { HeadlessEditor, basicExtensions } from '@syncfusion/ej2-headless-editor';

const readOnly = true;
const editor = HeadlessEditor.create({
    extensions: [basicExtensions],
    readOnly
});

const container = document.getElementById('headless-editor');
if (container) {
    editor.mount(container);
}

const editableElement = container.querySelector('.ProseMirror');
if (editableElement instanceof HTMLElement) {
    editableElement.setAttribute('role', 'textbox');
    editableElement.setAttribute('aria-label', 'Document viewer');
    editableElement.setAttribute('aria-multiline', 'true');
    
    if (readOnly) {
        editableElement.setAttribute('aria-readonly', 'true');
    }
}
```

### Using aria-labelledby

When a visible label is available on the page:

```html
<label id="editor-label">Document editor</label>
<div id="editor" aria-labelledby="editor-label"></div>
```

---

## Keyboard Accessibility

### Default Keyboard Shortcuts

The editor supports keyboard shortcuts for formatting, headings, lists, links, undo, and redo. The default shortcut table for each feature lives in the matching per-node reference file (for example, the heading shortcuts are listed under [heading.md](heading.md) → `## Keyboard shortcuts`, and the formatting shortcuts under each mark in [mark-types.md](mark-types.md)).

### Custom Keyboard Shortcuts

```ts
import { HeadlessEditor, basicExtensions, defineExtension } from '@syncfusion/ej2-headless-editor';

const customShortcutExtension = defineExtension({
	name: 'custom-shortcuts',

	keyboardShortcuts() {
		return {
			'Mod-Alt-b': () => this.editor.commands.toggleBold()
		};
	}
});

const editor: HeadlessEditor = HeadlessEditor.create({
  extensions: [basicExtensions, customShortcutExtension]
});
```

Use `Mod` for `Ctrl` on Windows and Linux and `Cmd` on macOS.

---

## Screen Reader Support

Use semantic DOM for headings, lists, links, paragraphs, and custom nodes. For screen reader support:

- provide an accessible label for the editor container
- provide text alternatives for images and other non-text content
- expose status and validation messages to assistive technologies
- keep custom interactive content keyboard operable

Associate a visible label with the editor:

```html
<label id="editor-label">Document editor</label>
<div id="editor" aria-labelledby="editor-label"></div>
```

Use `autofocus` to set the initial caret position. Use `focus` and `blur` callbacks to respond to focus changes, and use `autoSaveSelectionOnBlur` when toolbar actions can move focus.

---

## Custom Node Accessibility

When defining custom nodes, design the DOM and interaction to be accessible:

- maintain a stable, semantic DOM structure
- provide accessible names for interactive elements
- support keyboard interaction without creating traps
- manage focus consistently with the editor
- expose changes in state or value to assistive technologies

Use `contenteditable='false'` for controls inside a custom node that should not become part of the editor text flow.

The following example defines an accessible custom block using `domSpecs` with an `aria-label`:

```ts
import { defineExtension, NodeContent, basicExtensions } from '@syncfusion/ej2-headless-editor';

const noteExtension = defineExtension({
    name: 'accessible-note',
    
    nodes() {
        return [{
            name: 'accessibleNote',
            group: 'block',
            content: NodeContent.block().oneOrMore()
        }];
    },
    
    domSpecs() {
        return {
            nodes: {
                accessibleNote: {
                    toDOM: () => ['aside', { 'aria-label': 'Note' }, 0]
                }
            }
        };
    }
});

const editor = HeadlessEditor.create({
    extensions: [basicExtensions, noteExtension]
});
```

---

## Security Considerations

The Headless Editor treats external content as untrusted input. It provides link validation; for clipboard-pipeline sanitization, see [clipboard.md](clipboard.md), and for file-upload security, see [file-upload.md](file-upload.md). Applications must also validate content and files before storing or serving them.

### Content Security

Validate content at the application and server boundaries. The editor sanitizes pasted HTML, but it is not a replacement for server-side validation of content received from users, APIs, or storage.

Use the editor's schema and extension configuration to control the content that can be inserted into the document.

### Link Security

The link command validates URLs before applying a link mark. It rejects empty values and dangerous protocols such as `javascript:`, `data:`, and `vbscript:`. Common safe protocols include `http:`, `https:`, `mailto:`, `tel:`, `ftp:`, relative paths, and in-page anchors.

```ts
import { HeadlessEditor, linkExtension } from '@syncfusion/ej2-headless-editor';

const editor: HeadlessEditor = HeadlessEditor.create({
  extensions: [linkExtension]
});

const accepted = editor.execute('setLink', {
    href: 'https://www.example.com',
    displayText: 'Open example'
});

const rejected = editor.execute('setLink', {
  href: 'javascript:alert(1)',
  displayText: 'Unsafe link'
});
```

Check the command result before reporting success. Validate or rewrite link attributes again when exporting or rendering content outside the editor.

### Security best practices

- keep the built-in clipboard sanitizer enabled
- validate initial, pasted, imported, and stored content
- enforce file type and size rules before upload and on the server
- allow only approved URL protocols
- apply a Content Security Policy in the host application
- validate final rendered HTML before displaying user content

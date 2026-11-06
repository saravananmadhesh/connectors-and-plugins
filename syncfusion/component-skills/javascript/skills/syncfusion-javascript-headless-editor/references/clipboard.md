# Clipboard

This page combines the clipboard and paste-pipeline content from `content-operations.md`, the clipboard-bound security guidance from `accessibility-security.md`, and the clipboard-related public API types and event payloads that live in this file under `## API references`.

## Table of Contents

- [Paste lifecycle](#paste-lifecycle)
- [Customizing paste](#customizing-paste)
- [Clipboard security](#clipboard-security)
  - [Built-in sanitizer behavior](#built-in-sanitizer-behavior)
  - [Application clipboard transformations](#application-clipboard-transformations)
- [HTML sanitization](#html-sanitization)
- [API references](#api-references)
  - [ClipboardContent](#clipboardcontent)
  - [ClipboardOptions](#clipboardoptions)
  - [ClipboardTransformContext](#clipboardtransformcontext)
  - [PasteContent](#pastecontent)
  - [BeforePasteEventArgs](#beforepasteeventargs)
  - [AfterPasteEventArgs](#afterpasteeventargs)

## Paste lifecycle

The Headless Editor handles paste automatically through ProseMirror's native clipboard pipeline. There is no public `editor.paste()` method. To observe or customize paste behavior, use the `beforePaste` and `afterPaste` lifecycle callbacks, the corresponding event subscriptions, or the `EditorConfig.clipboard` transformation hooks.

Copy and cut are handled by the browser and the editor's native behavior. The Headless Editor does not expose a public copy or cut API, hook, or event.

The `beforePaste` and `afterPaste` callbacks are available as named events through `editor.on(...)`:

```ts
editor.on('beforePaste', (payload) => {
  console.log('Pasting content:', payload.content);
  console.log('Paste event:', payload.event);
});

editor.on('afterPaste', (payload) => {
  console.log('Inserted at', payload.insertPosition, 'length', payload.insertedLength);
});
```

## Customizing paste

Use `EditorConfig.clipboard` to register transformation hooks. The two hooks receive a shared `ClipboardTransformContext`:

```ts
const editor = HeadlessEditor.create({
  schema,
  extensions,
  clipboard: {
    transformHTML: (html, { editor, source }) => {
      // Remove unwanted HTML before schema parsing
      return html.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '');
    },
    transformContent: ({ slice }, { editor, source }) => {
      // Drop foreign marks or restructure nodes
      return { slice };
    }
  }
});
```

> The hooks run in this order: HTML sanitizer → `transformHTML` → schema parser → `transformContent` → insertion.

## Clipboard security

The Headless Editor treats external content as untrusted input. It provides built-in clipboard sanitization, link validation, and upload lifecycle events. Applications must also validate content and files before storing or serving them.

### Built-in sanitizer behavior

The editor applies a built-in security sanitizer to clipboard HTML before any user-defined transformation. The sanitizer removes dangerous clipboard content before the HTML is passed to the schema parser.

The sanitizer is:

- **Always on.** It cannot be disabled.
- **Not configurable.** There is no public allow-list, deny-list, or set of allowed styles for the paste path. `EditorConfig.clipboard` does not expose these settings.
- **Internal.** The sanitizer itself is an implementation detail and is not part of the public API surface.
- **Paste-only.** It is applied to clipboard content entering the editor. It is **not** applied to `setContent()` or `EditorConfig.content`.

### Application clipboard transformations

Pasted HTML is sanitized before it is parsed into the editor document. The sanitizer removes dangerous elements, event-handler attributes, and unsafe URL values.

Application clipboard transformations run after the built-in sanitizer:

```ts
const editor: HeadlessEditor = HeadlessEditor.create({
  extensions: [basicExtensions],
  clipboard: {
    transformHTML: (html: string) => html.replace(/\sdata-source="external"/g, '')
  }
});
```

Use `transformHTML` only for additional product-specific rules. It must not be used to bypass the built-in sanitizer.

## HTML sanitization

The built-in sanitizer removes common XSS vectors, including:

- `script`, `style`, `iframe`, and unsafe `object` elements
- inline event attributes such as `onclick`, `onload`, and `onerror`
- `javascript:` URL values
- `data:text/html` and script-capable SVG data URLs
- styles containing `javascript:` or `expression()` values

Sanitization is applied at the clipboard boundary before the content reaches the schema parser. Sanitize initial HTML and content received from external APIs before passing it to the editor.

## API references

This section documents the clipboard-related public API surface — types, options, and event payloads.

### ClipboardContent

`ClipboardContent` — parsed clipboard content as a ProseMirror slice. Product `transformContent` hooks receive the slice that ProseMirror's schema-driven parser produced, and may return a new slice to replace it. This allows for content restructuring, node type normalization, or mark filtering after parsing but before insertion into the document.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `slice` | `PMSlice` | The parsed ProseMirror slice ready for insertion into the document. Transform hooks may modify and return a new slice to alter the inserted content. |

### ClipboardOptions

`ClipboardOptions` — clipboard transformation options exposed on `EditorConfig.clipboard`. Provides extensibility points for product-level paste policies. Headless composes a non-overridable security sanitiser ahead of `transformHTML`. Products register their paste policy (`deniedTags`, `deniedAttrs`, `allowedStyles`, `allowedTags`, etc.) by implementing one or both of these hooks to enforce content rules, normalize structure, and handle platform-specific content (e.g., Office, Google Docs).

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `transformContent` | `Object` | Transform parsed clipboard content before it is inserted. Receives the slice produced by ProseMirror's schema parser and may return a modified slice to alter insertion behavior. Use to drop foreign marks not supported by your schema, restructure node hierarchies, normalize content, or apply schema-aware filtering. |
| `transformHTML` | `Object` | Transform clipboard HTML before it is parsed into editor content. Runs after Headless's non-overridable security sanitiser, so the input is already stripped of dangerous tags, event-handler attributes, and unsafe URL protocols. Use to strip platform-specific markup, normalize HTML structure, or apply `deniedTags`/`deniedAttrs` rules at the HTML level. Return the (possibly rewritten) HTML string. |

### ClipboardTransformContext

`ClipboardTransformContext` — context passed to clipboard transform hooks. Provides the editor instance and detected source format to allow transform hooks to make context-aware decisions about clipboard content handling.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `editor` | `HeadlessEditor` | The editor instance receiving the paste operation. |

### PasteContent

`PasteContent` — clipboard content carried by paste events. This is a PM-independent view of the clipboard payload. Listeners that need the parsed document structure should read `editor.getDocument()` in the `AFTER_PASTE` handler. Post-parse transformation belongs in the `config.clipboard.transformContent` hook, not in these events.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `files` | `File[]` | Image files extracted from clipboard content. Populated when the user pastes direct image files (`image/png`, `image/jpeg`, etc.) from system clipboard, or when HTML content contains images as data URIs (automatically converted to `File` objects). Empty or `undefined` when source is plain text or HTML without embedded images. |
| `htmlContent` | `string` | HTML content from the clipboard (after Headless security sanitisation and any product `transformHTML` hook has run). |
| `text` | `string` | Plain text fallback content from the clipboard. |

### BeforePasteEventArgs

Payload for `beforePaste` — carries the parsed clipboard content ready for insertion. Set `event.cancel = true` to abort the paste.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `content` | `PasteContent` | The parsed clipboard content about to be inserted. |
| `event` | `ClipboardEvent` | The original DOM paste event. |

### AfterPasteEventArgs

Payload for `afterPaste` — describes what was actually inserted.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `content` | `PasteContent` | The content that was inserted. |
| `event` | `ClipboardEvent` | The original DOM paste event. |
| `insertPosition` | `number` | Position in document where content was inserted. |
| `insertedLength` | `number` | Number of characters/nodes inserted. |

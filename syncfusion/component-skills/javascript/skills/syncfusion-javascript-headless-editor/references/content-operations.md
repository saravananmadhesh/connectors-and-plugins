# Content Operations

## Table of Contents

- [Reading Content](#reading-content)
  - [Four Read APIs](#four-read-apis)
  - [Get Structured Document](#get-structured-document)
  - [Get HTML](#get-html)
  - [Get Plain Text](#get-plain-text)
  - [Get Selected Text](#get-selected-text)
- [Setting Content](#setting-content)
  - [Assign HTML with `setContent`](#assign-html-with-setcontent)
  - [Assign a Structured Document with `setDocument`](#assign-a-structured-document-with-setdocument)
- [Updating Content In-Place](#updating-content-in-place)
  - [Insert Text](#insert-text)
  - [Replace Text in a Range](#replace-text-in-a-range)
  - [Insert a Node](#insert-a-node)
- [HTML Import & Export](#html-import-export)
  - [Export to HTML](#export-to-html)
  - [Import from HTML](#import-from-html)
- [JSON Serialization](#json-serialization)
  - [Get Document as JSON](#get-document-as-json)
  - [Parse JSON String](#parse-json-string)
  - [Round-Trip Example](#round-trip-example)
- [End-to-End Example](#end-to-end-example)
  - [`index.ts`](#indexts)
  - [`index.html`](#indexhtml)
  - [`index.css`](#indexcss)

## Reading Content

After a Headless Editor instance is mounted, you can read the current content in different shapes. None of these APIs dispatch a transaction, so calling them from a `contentChanged` listener is safe.

### Four Read APIs

| API | Returns | When to use |
|-----|---------|------------|
| `getDocument()` | `DocumentRoot` | Persist or diff the editor state as a Syncfusion-native JSON tree. |
| `getHtml()` | `string` | Export the schema-driven HTML serialization. |
| `getText()` | `string` | Read plain text with all formatting stripped. |
| `getSelectionText()` | `string` | Read only the text inside the current selection. |

> `getDocument()` throws if the editor has been destroyed through `destroy()`. The other accessors return an empty string on error so that read paths never throw.

### Get Structured Document

Read the structured document. The returned `DocumentRoot` exposes the document tree through its `children` array:

```ts
const doc = editor.getDocument();
console.log(doc.type); // 'document'
doc.children.forEach((node) => console.log(node.type));
```

### Get HTML

Serialize the document to HTML:

```ts
const html = editor.getHtml();
console.log(html); // "<p>Hello <strong>world</strong></p>"
```

### Get Plain Text

Read the plain text of the whole document:

```ts
const text = editor.getText();
console.log(text); // "Hello world"
```

### Get Selected Text

Read only the currently selected text. Returns an empty string when the selection is collapsed to a caret:

```ts
const selected = editor.getSelectionText();
if (selected) {
  console.log(`User selected: ${selected}`);
}
```

---

## Setting Content

Use `setContent()` or `setDocument()` to assign new content to a mounted editor. Both APIs swap the document body in a single transaction through the same schema-driven parser used at create-time, so the editor instance, view, plugins, and undo stack are preserved. The replacement is a single undo step, and the selection is reset to the start of the new document.

Both APIs are all-or-nothing:

- If the input parses successfully, `contentChanged` and `documentChanged` (with `action: 'Replaced'`) fire once.
- If parsing fails, a diagnostic warning is emitted, the existing document and selection are left untouched, no events fire, and the method returns `false`.

### Assign HTML with `setContent`

`setContent()` accepts an HTML string. Pass an empty or whitespace-only string to clear the document to a single empty paragraph:

```ts
// Replace the document with HTML
editor.setContent('<h1>New Title</h1><p>Fresh content.</p>');

// Clear the document to a single empty paragraph
editor.setContent('');
```

> Use `setContent('')` to clear the editor in one transaction instead of dispatching multiple delete commands. This keeps undo/redo intact and fires `contentChanged` once.

### Assign a Structured Document with `setDocument`

`setDocument()` accepts a `DocumentRoot`, which is the same shape that `getDocument()` returns. Use it when you have a structured document round-tripped from the editor or persisted from an external store.

```ts
editor.setDocument({
  type: 'document',
  attrs: {},
  marks: [],
  schemaVersion: 1,
  children: [
    { type: 'paragraph', attrs: {}, marks: [], children: [] }
  ]
});
```

> The `setDocument()` payload is validated against the active schema. Unknown node types or marks are rejected without mutating the document.

---

## Updating Content In-Place

In-place changes are dispatched through typed commands on the command facade. The Headless Editor ships with three commands dedicated to content updates:

- `insertText` – insert plain text at the current selection or at an explicit offset.
- `replaceText` – replace the text in an offset-based range.
- `insertNode` – insert a structured `EditorNode` into a parent at a given index.

All three commands execute in a single transaction, participate in undo/redo, and honor the active selection snapshot.

### Insert Text

`insertText` accepts a `text` payload and inserts it at the current selection. `offset` values use ProseMirror document positions. They refer to positions in the document tree rather than character indexes within an individual text node. Pass an `at` payload to target a specific offset instead:

```ts
// Insert at the current selection
editor.commands.insertText({ text: 'Hello world' });

// Insert at a specific offset
editor.commands.insertText({ text: 'Hello world', at: { offset: 0 } });
```

The command is a no-op when `text` is empty.

### Replace Text in a Range

`replaceText` replaces the plain text between two offsets. Use it to update a segment of an existing paragraph or block without rebuilding the surrounding structure:

```ts
editor.commands.replaceText({
  from: { offset: 0 },
  to:   { offset: 11 },
  text: 'Updated text'
});
```

If `from.offset` is greater than or equal to `to.offset`, the command silently no-ops and the document is left untouched.

### Insert a Node

`insertNode` inserts a structured `EditorNode` into a parent at a given index. The parent is identified by its PM position (`parentPos`), the `index` is the zero-based insertion position within the parent's children, and `node` is the `EditorNode` to insert:

```ts
editor.commands.insertNode({
  parentPos: 0,
  index: 1,
  node: {
    type: 'paragraph',
    attrs: {},
    marks: [],
    children: []
  }
});
```

The command rejects payloads with a missing parent, a negative `index`, or an out-of-bounds `index`.

---

## HTML Import & Export

The Headless Editor loads HTML through a schema-driven parsing pipeline and exports HTML through a schema-driven serialization pipeline. Both directions are governed by the schema and the extensions registered with the editor, not by a fixed public allow-list of HTML tags.

### Export to HTML

`editor.getHtml()` returns the current document serialized as an HTML string:

```ts
const html = editor.getHtml();
console.log(html); // "<p>Hello <strong>world</strong></p>"
```

If an error occurs during serialization, `getHtml()` returns an empty string instead of throwing.

### Import from HTML

`editor.setContent(html)` replaces the current document with the parsed HTML in a single transaction:

```ts
// Replace the document with HTML
editor.setContent('<h1>New Title</h1><p>Fresh content.</p>');

// Reset the document to a single empty paragraph
editor.setContent('');
```

`setContent()` returns `true` when the HTML is parsed and dispatched, and `false` when parsing fails. On failure, the existing document and selection are left untouched, no events fire, and a diagnostic warning is emitted.

> If both `EditorConfig.document` (JSON) and `EditorConfig.content` (HTML) are provided, `document` takes precedence and `content` is ignored. HTML loading is not run through the clipboard sanitizer — the clipboard sanitizer is handled separately by the clipboard pipeline and does not apply to `setContent()` or `EditorConfig.content`.

---

## JSON Serialization

The Headless Editor exchanges structured content with your application through a Syncfusion-native document tree rooted at `DocumentRoot`. The same `DocumentRoot` shape is used for loading and exporting. You can provide it when creating the editor, set it on a live editor, or read it back as a JSON-serializable object.

### Get Document as JSON

`editor.getDocument()` returns the current document as a `DocumentRoot`. The returned tree uses the same public types that `setDocument()` accepts, so it can be inspected, persisted, or fed straight back into `setDocument()` on a future session:

```ts
const json = JSON.stringify(editor.getDocument(), null, 2);
```

### Parse JSON String

To load a document stored as a JSON string, parse the string into a `DocumentRoot` and assign it through the same path. The standard `JSON.parse` and `JSON.stringify` helpers are the source-supported round-trip pattern; the Headless Editor does not expose a dedicated JSON loader:

```ts
const json = '{"type":"document","schemaVersion":1,"attrs":{},"marks":[],"children":[]}';
const parsed: DocumentRoot = JSON.parse(json) as DocumentRoot;

editor.setDocument(parsed);
```

### Round-Trip Example

```ts
// Get document as JSON
const doc = editor.getDocument();
const jsonString = JSON.stringify(doc);

// Later, retrieve and restore
const restoredDoc = JSON.parse(jsonString) as DocumentRoot;
editor.setDocument(restoredDoc);
```

> `getDocument()` and `setDocument()` operate on the same `DocumentRoot` shape, so round-trips are safe.

## End-to-End Example

The full application scaffold used by the UG exercises the get / set / update content operations together. The example mounts an editor with `basicExtensions` and `placeholderExtension`, wires a button for each read and write API, and prints the result in an output region.

### `index.ts`

```ts
import { HeadlessEditor, basicExtensions, placeholderExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [basicExtensions, placeholderExtension]
});

const container = document.getElementById('headless-editor');
const output = document.getElementById('output');

function showOutput(value: unknown): void {
    if (output) {
        output.textContent = typeof value === 'string'
            ? value
            : JSON.stringify(value, null, 2);
    }
}

if (container) {
    editor.mount(container);

    editor.setContent(
        '<p>Hello world! The Headless Editor. Edit this content and try the actions below.</p><p>This is the second paragraph.</p>'
    );
}

/* Get Content */

document.getElementById('get-document')?.addEventListener('click', () => {
    showOutput(editor.getDocument());
});

document.getElementById('get-html')?.addEventListener('click', () => {
    showOutput(editor.getHtml());
});

document.getElementById('get-text')?.addEventListener('click', () => {
    showOutput(editor.getText());
});

document.getElementById('get-selection-text')?.addEventListener('click', () => {
    showOutput(editor.getSelectionText());
});

/* Set Content */

document.getElementById('set-html')?.addEventListener('click', () => {
    editor.setContent(
        '<h2>New Title</h2><p>Fresh content.</p><p>This is another paragraph.</p>'
    );
});

document.getElementById('set-document')?.addEventListener('click', () => {
    editor.setDocument({
        type: 'document',
        attrs: {},
        marks: [],
        schemaVersion: 1,
        children: [
            {
                type: 'paragraph',
                attrs: {},
                marks: [],
                children: [
                    {
                        type: 'text',
                        text: 'Content set using setDocument().',
                        attrs: {},
                        marks: []
                    }
                ]
            },
            {
                type: 'paragraph',
                attrs: {},
                marks: [],
                children: [
                    {
                        type: 'text',
                        text: 'Second paragraph.',
                        attrs: {},
                        marks: []
                    }
                ]
            }
        ]
    });
});

document.getElementById('clear-content')?.addEventListener('click', () => {
    editor.setContent('');
});

/* Update Content */

document.getElementById('insert-text')?.addEventListener('click', () => {
    editor.commands.insertText({
        text: 'Hello world'
    });
});

document.getElementById('replace-text')?.addEventListener('click', () => {
    editor.commands.replaceText({
        from: { offset: 0 },
        to: { offset: 12 },
        text: 'Updated text'
    });
});

document.getElementById('insert-node')?.addEventListener('click', () => {
    editor.commands.insertNode({
        parentPos: 0,
        index: 1,
        node: {
            type: 'paragraph',
            attrs: {},
            marks: [],
            children: [
                {
                    type: 'text',
                    text: 'Inserted paragraph.',
                    attrs: {},
                    marks: []
                }
            ]
        }
    });
});
```

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Working with Content - TypeScript Headless Editor</title>

    <link href="https://unpkg.com/@syncfusion/ej2-tailwind3-theme@35.1.37/styles/headless-editor/index.css" rel="stylesheet" />
    <link href="index.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.js"></script>
    <script src="systemjs.config.js"></script>
</head>

<body>
    <div id="container">
        <div id="headless-editor"></div>
        <div class="actions">
            <h3>Get Content</h3>
            <div class="button-group">
                <button id="get-document">Get Document</button>
                <button id="get-html">Get HTML</button>
                <button id="get-text">Get Text</button>
                <button id="get-selection-text">Get Selection Text</button>
            </div>
            <h3>Set Content</h3>
            <div class="button-group">
                <button id="set-html">Set HTML</button>
                <button id="set-document">Set Document</button>
                <button id="clear-content">Clear Content</button>
            </div>
            <h3>Update Content</h3>
            <div class="button-group">
                <button id="insert-text">Insert Text</button>
                <button id="replace-text">Replace Text</button>
                <button id="insert-node">Insert Node</button>
            </div>
        </div>
        <h3>Output</h3>
        <pre id="output"></pre>
    </div>
    <script type="module" src="index.ts"></script>
</body>

</html>
```

### `index.css`

```css
#container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

#headless-editor {
    min-height: 200px;
    margin-bottom: 20px;
}

.actions {
    margin-top: 20px;
}

.actions h3 {
    margin: 20px 0 10px;
}

.button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.button-group button {
    padding: 8px 14px;
    cursor: pointer;
}

#output {
    min-height: 120px;
    margin-top: 10px;
    padding: 15px;
    overflow: auto;
    white-space: pre-wrap;
    border: 1px solid #ddd;
}
```

# HeadlessEditor Methods

Method-by-method reference for the public surface of the `HeadlessEditor` class: the static factory, the `commands` property, and every instance method. Sourced from the Syncfusion API documentation at `https://ej2.syncfusion.com/documentation/api/headless-editor/`.

> **Source of truth.** The API documentation pages are authoritative for the method signatures, parameter descriptions, and return types. When this file conflicts with the local UG reference files, the API documentation wins for API surface; the local UG files win for conceptual explanations and example usage.

## Table of Contents

- [Overview](#overview)
- [HeadlessEditor class](#headlesseditor-class)
  - [Constructor and factory](#constructor-and-factory)
  - [Properties](#properties)
  - [Methods](#methods)

## Overview

This file documents every public method on the `HeadlessEditor` class — the static factory `HeadlessEditor.create()`, the `commands` property, and every instance method (`mount`, `destroy`, `setContent`, `getDocument`, etc.). Each method entry shows the parameter table and return type as documented on the API page.

For the supporting types that these methods consume or return (the `EditorConfig` shape, the command framework types, the payload types, the event payloads, the selection helpers, and the schema building blocks), see the matching `### API references` section in the relevant file:

- `EditorConfig` and event payloads → [editor-api.md](editor-api.md)
- Command framework types, command facades, metadata types, `DeleteRangePayload` → [core-commands.md](core-commands.md)
- `SetMarkPayload` → [mark-types.md](mark-types.md)
- Schema building blocks, `NodeContent`, extension authoring static factories (`defineExtension`, `createLinkRule`, etc.) → [customization.md](customization.md)
- Selection helper types, `createSnapshot` / `withStatus` static factories → [editor-api.md](editor-api.md)

## HeadlessEditor class

`HeadlessEditor` is Syncfusion's frameworkless rich text editor with complete command control, extension system, and event-driven architecture. The Headless Editor provides a decoupled editing engine with no DOM dependencies for initialization, full undo/redo, custom content schemas, extensible node types, and comprehensive keyboard/paste/clipboard handling. Mount into any DOM container and control via the typed command system.

```ts
// Create and mount editor
const editor = HeadlessEditor.create({ schema: mySchema });
editor.mount(document.getElementById('editor'));

// Execute typed commands
editor.commands.toggleBold();
editor.commands.setHeading({ level: 1 });
editor.commands.insertImage({ src: 'image.png' });

// Query editor state
const doc = editor.getDocument();
const selection = editor.getSelection();

// Subscribe to events
editor.on('contentChanged', (args) => console.log('Updated:', args.document));

// Cleanup
editor.destroy();
```

### Constructor and factory

#### `create(config)` (static)

Creates a fully initialized `HeadlessEditor` instance. Performs full bootstrap of the editor including schema compilation, extension loading, command registry initialization, and service layer setup. This method is called directly by applications; the constructor is not public. The returned `HeadlessEditor` is ready for immediate use but does NOT attach to the DOM. Call `mount(container)` to render the editor in the DOM. The editor can be mounted and unmounted multiple times without re-initialization.

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `EditorConfig` | The editor configuration object containing schema, extensions, event callbacks, and options. |

**Returns:** `HeadlessEditor`

### Properties

#### `commands: TypedCommandsFacade`

Typed proxy for immediate command execution: `editor.commands.toggleBold()`.

### Methods

The method documentation below uses the API-page ordering. Each method shows the parameter table and return type as documented on the API page.

#### `can()`

Returns a facade for dry-run command availability checks. Provides typed methods (`can().toggleBold()`, `can().setHeading({ level: 1 })`, etc.) that evaluate the command's `canExecute()` logic without dispatching any transaction. Useful for toolbar/menu state management and validation. A new facade instance is created per call; the cost is minimal as it wraps the command manager without extra state. Facade creation is intentionally cheap.

**Returns:** `TypedCanFacade`

#### `chain()`

Returns a facade for building and executing chained command sequences. Enables fluent API for command batching: `editor.chain().command1().command2().command3().run()`. All chained commands are collected and executed in a single atomic transaction.

Terminal methods:
- `.run()` — Execute the chain and apply the transaction.
- `.canRun()` — Check if all chained commands are available without executing.

A new `ChainBuilder` and facade are created per call, ensuring independent chains.

**Returns:** `TypedChain`

#### `destroy()`

Destroys the editor and releases all resources. Performs complete teardown in reverse bootstrap order: integration → lifecycleManager → serviceRegistry → eventBus → diagnostics. All event subscriptions are disposed, the DOM view is destroyed, and internal state is cleared. Subsequent calls to `destroy()` are safe no-ops. After calling `destroy()`, the editor instance becomes invalid and should not be used. A new editor must be created via `HeadlessEditor.create()`.

**Returns:** `void`

#### `execute(name, payload?)`

Executes a command by name with optional payload. This is the low-level untyped path. For type safety and IDE autocomplete, use `editor.commands.commandName()` instead (via the typed facade). The command's `canExecute()` is checked first. If it returns `false`, the command is not dispatched and this method returns `false`. If `canExecute` is `true`, `execute()` is called and returns `true` (assuming a transaction was dispatched).

**Returns:** `boolean`

#### `focusView()`

Programmatically focus the editor view. Useful for programmatic interaction when the editor loses focus (e.g., after a toolbar button click). The focus is placed at the current selection position.

**Returns:** `void`

#### `getDocument()`

Returns the current document as a Syncfusion-native `DocumentRoot` object. The returned `DocumentRoot` is a pure TypeScript type containing the full node tree, with all nodes having stable IDs and no ProseMirror types exposed. This snapshot reflects the current state at the time of the call. Throws `EditorLifecycleError` if the editor has been destroyed.

**Returns:** `DocumentRoot`

#### `getFileHandler()`

Returns the `FileHandler` instance for file upload operations. The `FileHandler` is lazily initialized on first access and manages the complete file lifecycle: paste/drop detection, upload ID generation, handler invocation, and event emission. This method provides low-level access for advanced use cases; most applications use `setFileUploadHandler()` instead.

**Returns:** `FileHandler`

#### `getHtml()`

Serializes the entire document to HTML. Uses the schema's `parseDOM` and serialization rules to generate valid HTML. All extension node specs and mark specs contribute to serialization via their `toDOM` specifications.

**Returns:** `string`

#### `getSelectedBlocks()`

Returns all block-level nodes that intersect the current selection. For a cursor or single selection, returns a single block. For a range spanning multiple blocks, returns all blocks in the range. Each returned node includes its live DOM element (if mounted) for toolbar positioning.

**Returns:** `SelectedNode[]`

#### `getSelectedCells()`

Returns all currently selected table cells (for `CellSelection`). For non-`CellSelection`, returns an empty array. Each cell includes its live DOM element (if mounted), row and table references, and 0-based coordinates.

**Returns:** `SelectedCell[]`

#### `getSelectedLeafNodes()`

Returns all leaf nodes (atom nodes with no children: image, horizontal rule, hard break, etc.) within the current selection range. Each returned node includes its live DOM element (if mounted) for toolbar positioning or bulk operations.

**Returns:** `SelectedNode[]`

#### `getSelection()`

Returns the current selection range as absolute document positions. Provides the `from` and `to` positions (in document offset units) and an `empty` flag indicating whether the selection is a collapsed cursor or spans text. All positions are absolute offsets relative to the document root.

**Returns:** `Object`

#### `getSelectionContext()`

Returns the formatting marks and structural nodes relevant to the current selection. Marks are limited to those present at the selection start. A mark is mixed when its attributes differ or it is absent from part of the range. Structural wrapper nodes that do not represent toolbar context are omitted.

**Returns:** `SelectionContext`

#### `getSelectionText()`

Returns the plain-text content of the current selection. Extracts text from the current selection range, preserving newlines between blocks. Returns an empty string if no text is selected (selection is collapsed) or if the editor has been destroyed.

**Returns:** `string`

#### `getText()`

Returns the plain-text content of the entire document. Strips all formatting and marks, returning only text content.

**Returns:** `string`

#### `mount(container)`

Mounts the editor into the specified DOM container element. Creates the ProseMirror editor view within the container and initializes event listeners. The container element must be a valid `HTMLElement` in the document. After mounting, the editor is interactive and ready for user input and command execution.

Autofocus behavior is controlled by `config.autofocus`:
- `true` or `'auto'` — Focuses at the last saved selection if available, otherwise at document start.
- `'start'` — Focuses at the beginning of the document.
- `'end'` — Focuses at the end of the document.
- `false` or `undefined` — No autofocus (editor container must be manually focused if needed).

The editor can be mounted, unmounted (`unmount()`), and re-mounted multiple times on the same instance.

| Parameter | Type | Description |
|-----------|------|-------------|
| `container` | `HTMLElement` | The DOM element that will contain the editor view. Must be a valid `HTMLElement` present in the document. |

**Returns:** `void`

#### `off(eventName, handler)`

Unsubscribes from a previously registered event listener. Removes the handler that was registered via `on()`. If the handler is not found or was already unsubscribed, this method is a safe no-op.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventName` | `string` | The public event name to unsubscribe from (must match the name passed to `on()`). |
| `handler` | `Object` | The exact callback function that was passed to `on()`. |

**Returns:** `void`

#### `on(eventName, handler)`

Subscribes to a public editor event. Registers an event listener that fires each time the specified event is published. The handler receives the event payload directly. Event names correspond to the config-level callbacks (e.g., `'contentChanged'`, `'focus'`, `'beforePaste'`). Multiple handlers can be registered for the same event. Call `off()` to unsubscribe.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventName` | `string` | The public event name (e.g., `'contentChanged'`, `'focus'`, `'beforePaste'`). |
| `handler` | `Object` | Callback invoked with the event payload each time the event fires. |

**Returns:** `void`

#### `restoreSelection(snapshot?)`

Applies a previously captured selection snapshot to the current editor state. Restores a saved selection from a `SelectionSnapshot`. If no snapshot is provided, uses the most recently held snapshot from `saveSelection()`. If an explicit snapshot is provided, it updates the editor's held snapshot. Success depends on snapshot freshness (stale snapshots may fail if document structure changed). Restore operations do NOT consume the snapshot — only command execution consumes. Calling `restoreSelection()` followed by a command is equivalent to a single command execution with automatic selection restoration.

**Returns:** `boolean`

#### `saveSelection()`

Captures and stores the current selection as a PM-free `SelectionSnapshot`. Creates a persistent snapshot of the current selection (text range, node selection, or cell selection) that survives DOM events like `blur`. The snapshot is retained by the editor and automatically applied before the next command execution, making toolbar button clicks (which blur the editor) safe. Multiple calls to `saveSelection()` replace the previously held snapshot. The snapshot is independent of any command chain or execution. This is essential for maintaining selection across focus changes in toolbar-based editors where clicking a toolbar button blurs the editor, causing focus loss and selection reset.

**Returns:** `SelectionSnapshot`

#### `setContent(html)`

Replaces the entire document content with the supplied HTML markup. The HTML is parsed through the same schema-driven pipeline used at create-time (`EditorConfig.content`): every `parseDOM` rule contributed by the loaded extensions is applied, then the parsed tree replaces the current document body in **one transaction**.

Because replacement is a single transaction on the live editor state:
- The editor instance, PM view, plugins, and undo stack are preserved — no destroy/re-create, no remount.
- `NodeViews` for the old document are destroyed and `NodeViews` for the new document are created by the normal PM view update.
- `contentChanged` and `documentChanged` (action `'Replaced'`) fire once.
- The replacement is a single undo step; `undo()` restores the previous content.
- The selection is reset to the start of the new document.
- All-or-nothing: when parsing fails, a diagnostic warning is emitted, the existing document and selection are left untouched, no events fire, and `false` is returned.

| Parameter | Type | Description |
|-----------|------|-------------|
| `html` | `string` | The HTML markup for the new document. An empty or whitespace-only string resets the document to a single empty paragraph. |

**Returns:** `boolean`

#### `setDocument(doc)`

Replaces the entire document content with the supplied structured document. The structured tree replaces the current document body in **one transaction**, with the same lifecycle guarantees as `setContent()`: view/plugins/undo preserved, `NodeViews` swapped by the normal PM view update, single undo step, selection reset to document start. All-or-nothing: when the document is invalid (unknown node types, unregistered marks), a diagnostic warning is emitted, the existing document and selection are left untouched, no events fire, and `false` is returned.

| Parameter | Type | Description |
|-----------|------|-------------|
| `doc` | `DocumentRoot` | The new document. The live root id is taken from the supplied document; child node ids are preserved when present and generated when absent. |

**Returns:** `boolean`

#### `setFileUploadHandler(handler)`

Registers a file upload handler for paste and drag-drop file operations. The provided handler is invoked whenever files are pasted or dropped into the editor. This method must be called before file paste/drop operations begin to have any effect. Calling it multiple times replaces the previous handler. The `FileUploadHandler` receives a file object and metadata, and must return a `Promise` resolving to the uploaded file URL or resource identifier.

| Parameter | Type | Description |
|-----------|------|-------------|
| `handler` | `FileUploadHandler` | The upload handler implementation with an `upload()` method that accepts a file request and returns a `Promise` with the uploaded URL. |

**Returns:** `void`

#### `setOptions(options)`

Updates safe editor configuration properties after initialization. Only a subset of properties can be updated after mount. Structural properties (`document`, `content`, `extensions`) require full re-initialization and cannot be changed.

Supported properties:
- `readOnly` — Update editor editability (immediately reflected if mounted).
- `autofocus` — Update autofocus behavior (applies on next mount if unmounted).
- `autoSaveSelectionOnBlur` — Update blur selection auto-save.
- `enableInputRules` — Update input rules enabled state.

Unsupported properties (structural, require re-init): `document`, `content`, `extensions`, `schema`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `Partial<...>` | Configuration properties to update. |

**Returns:** `void`

#### `unmount()`

Unmounts the editor from the DOM without destroying the editor instance. This method detaches the ProseMirror view from the DOM container but preserves all editor state (document, selection, history). The editor can be re-mounted to a container (same or different) using `mount()` without loss of state or configuration. All event listeners attached to the DOM are removed and the view is disposed. The editor instance remains valid and can be used to query state via `getDocument()`, `getSelection()`, etc.

**Returns:** `void`


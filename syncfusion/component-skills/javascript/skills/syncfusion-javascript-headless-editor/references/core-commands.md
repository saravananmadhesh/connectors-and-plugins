# Commands & Interactions

## Table of Contents

- [Command Execution](#command-execution)
  - [Method 1: The Typed Facade](#method-1-the-typed-facade)
  - [Method 2: The String Format](#method-2-the-string-format)
  - [Method 3: Command Chaining](#method-3-command-chaining)
  - [API references](#api-references)
- [Command Return Values](#command-return-values)
- [Checking Availability](#checking-availability)
- [Default Injectable Commands](#default-injectable-commands)
  - [Content commands](#content-commands)
  - [Formatting commands](#formatting-commands)
  - [Structure commands](#structure-commands)
  - [Selection commands](#selection-commands)
- [Content Commands](#content-commands)
  - [Insert Text](#insert-text)
  - [Replace Text in a Range](#replace-text-in-a-range)
  - [Insert a Node](#insert-a-node)
- [Selection Commands](#selection-commands)
  - [selectAll](#selectall)
  - [setSelection](#setselection)
  - [clearSelection](#clearselection)
- [Command Chaining](#command-chaining)
  - [API references](#api-references)

## Command Execution

A command is a named action the editor knows how to perform. Commands are the only way to change the editor's state. Every formatting toggle, every block transform, and every selection move is implemented as a command.

There are two kinds of commands in the editor:

- **Generic built-in commands:** These are not tied to any particular feature and are always available.
- **Extension commands:** These are owned by their respective extensions, such as `toggleBold` on the Bold extension and `toggleHeading` on the Heading extension.

If you are not yet familiar with the editor instance, see the **Editor** page first.

### Method 1: The Typed Facade

The typed facade is the common path. Every command is exposed as a method on `editor.commands`. The method returns `true` when a change happened, `false` otherwise.

```ts
// Select the entire document.
editor.commands.selectAll();

// Collapse the current selection to a cursor.
editor.commands.clearSelection();

// Move the cursor to a specific range.
editor.commands.setSelection({ from: 1, to: 5 });
```

### Method 2: The String Format

Use `editor.execute(name, payload)` when the command name is dynamic (for example, when it comes from a configuration or a user action).

```ts
const commandName = 'selectAll';
editor.execute(commandName);

// With a payload.
editor.execute('setSelection', { from: 1, to: 5 });
```

The string form returns the same `boolean` as the typed facade.

### Method 3: Command Chaining

Use `editor.chain()` to run several commands as one atomic step. Every step is collected, availability-checked, and dispatched together as single action.

```ts
editor.chain()
    .setSelection({ from: 1, to: 5 })
    .insertText({ text: 'Hello' })
    .run();
```

Chaining is described in brief here [Command chaining](#command-chaining).

---

### API references

#### Command

`Command` — the unit of execution in the command framework. `name` must be unique across the registry. Success is determined by whether `context.dispatch()` was called — not by a return value. Commands return `void`.

| Method | Description | Returns |
|--------|-------------|---------|
| `canExecute` | Optional guard. When defined, `CommandExecutor` calls this before `execute`. If it returns `false`, execution is blocked. | `boolean` |
| `execute` | Perform the command. Call `context.dispatch(tr)` to commit a state change. `CommandExecutor` detects dispatch via the `DispatchRecorder` — no return value needed. | `void` |

#### CommandContext

`CommandContext` — provides all required information to commands during execution. Every command's `canExecute()` and `execute()` methods receive a `CommandContext` instance. This context exposes the current editor state, selection, document, and a `dispatch` function for committing transaction changes. All types within `CommandContext` are Syncfusion-owned; no ProseMirror types are exposed.

| Property | Type | Description |
|----------|------|-------------|
| `dispatch` | `(tr: Transaction) => void` | Dispatch a transaction to apply changes to the document and selection. This is the only path for committing state changes. Internally wraps `IntegrationManager.dispatch()`. All transaction changes are validated and published to subscribers before returning. ProseMirror types are encapsulated and stay inside `src/pm/`. |
| `document` | `DocumentRoot` | The current document root and full node tree. Convenience accessor equivalent to `editorState.document`. |
| `editor` | `EditorRef` | Reference to the `HeadlessEditor` instance for accessing commands, events, or other APIs. |
| `editorState` | `EditorState` | The current Syncfusion editor state snapshot (document, selection, schema version). |
| `selection` | `Selection` | The current text, node, cell, or block selection. Convenience accessor equivalent to `editorState.selection`. |

#### PMCommandContext

`PMCommandContext` — extends the public `CommandContext` with a frozen PM state snapshot captured by the executor at the start of each command invocation.

Builtins use `ctx.pmState` to:
- Read schema: `ctx.pmState.schema`
- Fork transactions: `ctx.pmState.tr`
- Read selection: `ctx.pmState.selection`
- Read document: `ctx.pmState.doc`

This is a snapshot — not the live `IntegrationManager` state. For `ChainExecutor` it is the virtual state (reflecting all prior chain steps).

| Property | Type | Description |
|----------|------|-------------|
| `dispatch` | `(tr: Transaction) => void` | Same as `CommandContext.dispatch`. |
| `document` | `DocumentRoot` | Same as `CommandContext.document`. |
| `editor` | `EditorRef` | Same as `CommandContext.editor`. |
| `editorState` | `EditorState` | Same as `CommandContext.editorState`. |
| `pmState` | `PMEditorState` | Frozen PM state snapshot at the start of this command's execution. Use this — do NOT reach for `IntegrationManager`. |
| `selection` | `Selection` | Same as `CommandContext.selection`. |

#### NodeResolver

`NodeResolver` — stateless utility for navigating a `DocumentRoot` tree. All methods are pure: they do not mutate the document and always return a new value or `undefined`.

| Method | Description | Returns |
|--------|-------------|---------|
| `childIndexOf(parent, childNode)` | Returns the zero-based child index of `childNode` within its parent, or `-1` when not found. | `number` |
| `findFirstByType(root, nodeType)` | Finds the first node whose type matches the given `nodeType` in the document tree (depth-first, pre-order). Returns `undefined` if not found. | `EditorNode \| undefined` |
| `findNodesByType(root, nodeType)` | Collects all nodes whose type matches `nodeType`. Returns an empty array when no matches exist. | `EditorNode[]` |
| `findParent(root, target)` | Finds the parent node of `target`. Returns `undefined` when `target` is not found or is the root. | `EditorNode \| undefined` |

#### SelectionType

`SelectionType` — Discriminant for the kind of selection in the editor. Distinguishes between different selection modes:

- `Text` — Cursor or highlighted text within a node
- `Node` — Single inline node selected (e.g., image, link)
- `Cell` — Table cell or cell range selected
- `Block` — Entire block-level node selected (e.g., paragraph, heading)
- `All` — Entire document selected

#### DeleteRangePayload

`DeleteRangePayload` — payload for the `deleteRange` command.

| Property | Type | Description |
|----------|------|-------------|
| `from` | `number` | Start document position (inclusive). |
| `to` | `number` | End document position (exclusive). |

## Command Return Values

`editor.execute(...)` and `editor.commands.<name>(...)` returns a `boolean` value:

| Value | Meaning |
|-------|---------|
| `true` | A change happened. The document or selection was updated. |
| `false` | The command was unavailable for the current state or payload. Nothing was changed. |

`editor.chain().run()` returns a richer result:

```ts
const result = editor.chain().setSelection({ from: 1, to: 5 }).insertText({ text: 'Hi' }).run();

if (result.success) {
    // The chain ran and updated state.
} else if (result.reason === 'aborted') {
    // A step's availability check failed; nothing changed.
    console.log(`Aborted at ${result.failedStep}`);
} else {
    // The chain was empty.
}
```

| Result | Meaning |
|--------|---------|
| `{ success: true }` | All steps ran and one transaction was dispatched. |
| `{ success: false; reason: 'aborted'; failedStep }` | A step's availability check failed; the chain aborted and no change was made. |
| `{ success: false; reason: 'empty' }` | The chain had no steps. |

---

## Checking Availability

Use `editor.can()` to check whether a command would run successfully without changing state. This is the standard way to update toolbar and menu state.

```ts
if (editor.can().selectAll()) {
    // Enable the select-all action.
}

if (editor.can().setSelection({ from: 1, to: 5 })) {
    // Safe to position the cursor at the requested range.
}
```

`editor.can()` never mutates the document. It evaluates the same guard that a real execution would use, against the current document and selection, and returns `true` or `false`.

You can also dry-run a whole chain with `editor.chain().<a>().<b>().canRun()`.

```ts
if (editor.chain().clearSelection().setSelection({ from: 1, to: 5 }).canRun()) {
    // Safe to run the same chain.
}
```

---

## Default Injectable Commands

The following generic built-in commands are always available. Each entry lists the command name, what it does, and the payload shape. Detailed payload field descriptions live in the API reference.

### Content commands

| Command | Payload | Purpose |
|---------|---------|---------|
| `insertNode` | `InsertNodePayload` | Insert a node subtree at a parent and index. |
| `deleteNode` | `DeleteNodePayload` | Delete a node by its open/close positions. |
| `moveNode` | `MoveNodePayload` | Relocate a node subtree to a new parent and index. |
| `insertText` | `InsertTextPayload` | Insert a plain text string at the current cursor or a given position. |
| `deleteText` | `DeleteTextPayload` | Delete text in a from-to-to range. |
| `replaceText` | `ReplaceTextPayload` | Replace text in a range with a new string. |
| `deleteRange` | `DeleteRangePayload` | Delete content in a document-position range and place the cursor at the result. |

### Formatting commands

| Command | Payload | Purpose |
|---------|---------|---------|
| `toggleMark` | `ToggleMarkPayload` | Toggle an inline mark on the current selection. |
| `setMark` | `SetMarkPayload` | Apply or update an inline mark on the current selection. |
| `removeMark` | `RemoveMarkPayload` | Remove an inline mark from the current selection. |

### Structure commands

| Command | Payload | Purpose |
|---------|---------|---------|
| `toggleBlockStructure` | `ToggleBlockStructurePayload` | Wrap or unwrap a block-level structure such as `blockquote` or `callout`. |
| `duplicateNode` | `DuplicateNodePayload` | Deep-clone a node subtree and insert the copy right after the original. |
| `wrapNode` | `WrapNodePayload` | Wrap an existing node in a new container node. |
| `unwrapNode` | `UnwrapNodePayload` | Replace a container node with its children. |
| `transformNode` | `TransformNodePayload` | Change a node's type while preserving its children and attributes. |
| `splitBlock` | — | Split the current block at the selection. |

### Selection commands

| Command | Payload | Purpose |
|---------|---------|---------|
| `selectAll` | — | Select the entire document. |
| `setSelection` | `SetSelectionPayload` | Set the text selection to a from/to range. |
| `clearSelection` | — | Collapse the selection to a cursor at the anchor. |

---

## Content Commands

The Headless Editor ships with three content-update commands that have detailed examples in the content-and-data section. They all execute in a single transaction, participate in undo/redo, and honor the active selection snapshot.

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

## Selection Commands

Use selection commands to position the cursor or move the selection.

### selectAll

Select the entire document:

```ts
editor.commands.selectAll();
```

### setSelection

Set the text selection to a from/to range. `from` and `to` are document positions:

```ts
editor.commands.setSelection({ from: 1, to: 5 });
```

### clearSelection

Collapse the selection to a cursor at the anchor:

```ts
editor.commands.clearSelection();
```

---

## Command Chaining

`editor.chain()` collects commands and dispatches them as one atomic step. Every step is run through the same availability guard that a single-command execution would use.

```ts
editor.chain()
    .setSelection({ from: 1, to: 5 })
    .insertText({ text: 'Hello' })
    .run();
```

Chaining has three important rules:

- **All-or-nothing.** If any step's availability check fails, the chain aborts and **no change is made**. This is different from calling each command separately, where each call might independently change the document.
- **History commands are forbidden.** `undo` and `redo` cannot be queued inside a chain.
- **Focus is restored.** After a successful run, focus returns to the editor automatically.

A chain with no steps returns `{ success: false; reason: 'empty' }` and dispatches nothing.

You can also dry-run a whole chain with `editor.chain().<a>().<b>().canRun()`:

```ts
if (editor.chain().clearSelection().setSelection({ from: 1, to: 5 }).canRun()) {
    // Safe to run the same chain.
}
```

### API references

#### CommandMeta

`CommandMeta` — optional metadata for UI rendering, discovery, and accessibility of commands. Provides human-readable labels, descriptions, icons, keyboard shortcuts, and searchable tags for each command. Used by toolbars, menus, keyboard shortcut registries, command palettes, and accessibility systems. All fields are optional, allowing simple commands to omit metadata entirely. The `category` field is intentionally a plain string so custom categories can be introduced by extensions without modifying this interface.

| Property | Type | Description |
|----------|------|-------------|
| `category` | `string` | Semantic category for command organization and filtering. The category is a plain string intentionally allowing extensions to define custom categories beyond built-in values. Recommended built-in categories: `'formatting' \| 'structure' \| 'list' \| 'table' \| 'content' \| 'selection' \| 'history' \| 'media' \| 'collaboration' \| 'block' \| 'inline'`. Custom categories can be domain-specific (e.g., `'admonition'`, `'callout'`). |
| `description` | `string` | Longer explanation of what the command does and its effects. Used in extended help text, tooltips, and accessibility descriptions. |
| `focusAfterDispatch` | `boolean` | If `true`, automatically focus the editor after the command's transaction updates the DOM. Defaults to `true` for most interactive commands. Set to `false` for commands that should not steal focus. |
| `icon` | `string` | Icon identifier or resource for toolbar/menu rendering. Can be an icon name (e.g., `'icon-bold'`), a CSS class, a data URL, or an SVG identifier. |
| `label` | `string` | User-facing command label displayed in toolbars, menus, and dialogs. |
| `shortcut` | `string` | Keyboard shortcut hint for display in menus and help systems. Format is display-oriented (e.g., `'Ctrl+B'`, `'Cmd+I'`). This field is for documentation only; actual keybinding registration is handled separately. The shortcut string is not validated or executed. |

#### ChainResult

`ChainResult` — returned by `ChainBuilder.run()`. Distinguishes an empty chain from an aborted one so callers can react appropriately.

#### ValidationError

`ValidationError` — single reason why a schema or document validation failed. Carries the dot-path of the offending value (e.g. `nodes.paragraph.attrs.align`) so consumers can produce meaningful error messages.

| Property | Type | Description |
|----------|------|-------------|
| `message` | `string` | Short human-readable reason for the failure. |
| `path` | `string` | Dot-path to the failing field. Empty string for the whole document. |

#### TypedCommandsFacade

`TypedCommandsFacade` — Immediate command execution interface. All methods execute immediately against the current editor state and return a `boolean` indicating success. Commands that require parameters accept a payload object. Commands are only executed if they are available at the current cursor position or selection. For dry-run availability checks (without execution), use `editor.can().*` instead. For fluent chaining of multiple commands in a single transaction, use `editor.chain().*`.

The complete list of methods on `TypedCommandsFacade`:

| Method | Description | Returns |
|--------|-------------|---------|
| `addCaption(payload?)` | Add a caption to the currently selected image. | `boolean` |
| `backspaceCollapsible` | Backspace handling in collapsible sections. Returns `true` if handled. | `boolean` |
| `clearCodeBlock` | Exit code block formatting and convert to paragraph. | `boolean` |
| `clearFormatting` | Remove all inline formatting (bold, italic, color, etc.) from the selection. | `boolean` |
| `clearSelection` | Clear the current selection (cursor remains). | `boolean` |
| `collapse(payload?)` | Collapse (close) an expandable section. | `boolean` |
| `deleteCollapsible` | Delete the current collapsible section. | `boolean` |
| `deleteColumn` | Delete the current table column. | `boolean` |
| `deleteListItem` | Delete the current list item and preserve child items. | `boolean` |
| `deleteNode(payload)` | Delete a specific node by ID or position. | `boolean` |
| `deleteRange(payload)` | Delete a range of content specified by position. | `boolean` |
| `deleteRow` | Delete the current table row. | `boolean` |
| `deleteTable` | Delete the table containing the current cursor. | `boolean` |
| `deleteText(payload?)` | Delete text from the current selection. | `boolean` |
| `enterCollapsible` | Enter a collapsible section at the cursor. | `boolean` |
| `exitCode` | Exit a code block and return to normal editing. | `boolean` |
| `expand(payload?)` | Expand (open) a collapsed section. | `boolean` |
| `indent` | Increase indentation of the current block. | `boolean` |
| `indentCodeBlock` | Increase indentation level in a code block. | `boolean` |
| `indentListItem` | Increase indentation of the current list item. | `boolean` |
| `inputRuleInsert` | Insert content based on an input rule match. | `boolean` |
| `inputRuleMark` | Apply a mark based on an input rule match. | `boolean` |
| `inputRuleTransform` | Transform content based on an input rule match. | `boolean` |
| `inputRuleWrap` | Wrap content based on an input rule match. | `boolean` |
| `insertColumnAfter` | Insert a new column after the current column. | `boolean` |
| `insertColumnBefore` | Insert a new column before the current column. | `boolean` |
| `insertImage(payload?)` | Insert one or more images at the cursor position. | `boolean` |
| `insertNode(payload)` | Insert a node at the cursor position. | `boolean` |
| `insertParagraphInCell` | Insert a paragraph inside a table cell. | `boolean` |
| `insertRowAfter` | Insert a new row after the current row. | `boolean` |
| `insertRowBefore` | Insert a new row before the current row. | `boolean` |
| `insertTable(payload?)` | Insert a table at the cursor position. | `boolean` |
| `insertText(payload)` | Insert text at the cursor position. | `boolean` |
| `joinListBackward` | Join current list item with the previous list item. | `boolean` |
| `mergeCollapsibleBackward` | Merge the current collapsible with the previous one. | `boolean` |
| `mergeCollapsibleForward` | Merge the current collapsible with the next one. | `boolean` |
| `moveNode(payload)` | Move a node to a new position in the document. | `boolean` |
| `moveToNextCell` | Move selection to the next table cell. | `boolean` |
| `moveToPreviousCell` | Move selection to the previous table cell. | `boolean` |
| `outdent` | Decrease indentation of the current block. | `boolean` |
| `outdentCodeBlock` | Decrease indentation level in a code block. | `boolean` |
| `outdentListItem` | Decrease indentation of the current list item. | `boolean` |
| `redo` | Redo the last undone change. | `boolean` |
| `removeCaption` | Remove the caption from the currently selected image. | `boolean` |
| `removeImage` | Remove the currently selected image. | `boolean` |
| `replaceText(payload)` | Replace selected text with new content. | `boolean` |
| `selectAll` | Select all content in the document. | `boolean` |
| `setBulletListType(payload)` | Set the style/type of a bullet list (e.g., `disc`, `square`). | `boolean` |
| `setCellAttribute(payload)` | Set an attribute (e.g., colspan, rowspan) on the current table cell. | `boolean` |
| `setCodeBlock(payload?)` | Convert current block to a code block. | `boolean` |
| `setCodeBlockLanguage(payload)` | Set or change the language syntax highlighting in a code block. | `boolean` |
| `setColor(payload)` | Apply color to selected text (hex, rgb, or named). | `boolean` |
| `setFontFamily(payload)` | Set font family for selected text. | `boolean` |
| `setFontSize(payload)` | Set font size for selected text. | `boolean` |
| `setHardBreak` | Insert a hard line break (in code blocks or paragraphs). | `boolean` |
| `setHeading(payload)` | Convert current block to a heading (level 1–6). | `boolean` |
| `setHighlight(payload)` | Apply background highlight color to selected text. | `boolean` |
| `setHorizontalRule` | Insert a horizontal rule (divider) at the cursor position. | `boolean` |
| `setImageAlign(payload)` | Set alignment for the currently selected image (`left`, `center`, `right`). | `boolean` |
| `setImageDimension(payload)` | Set width and height for the currently selected image (in pixels). | `boolean` |
| `setImageDisplay(payload)` | Set display mode for the currently selected image (`inline`, `block`). | `boolean` |
| `setImageWrap(payload)` | Set text wrapping behavior for the currently selected image (`none`, `tight`, `square`). | `boolean` |
| `setLink(payload)` | Apply or update a hyperlink on selected text. | `boolean` |
| `setOrderedListType(payload)` | Set the style/type of an ordered list (e.g., `decimal`, `roman`). | `boolean` |
| `setParagraph` | Convert current block to a paragraph. | `boolean` |
| `setSelection(payload)` | Set the cursor/selection to a specific position or range. | `boolean` |
| `setTextAlign(payload)` | Set text alignment for the current block (`left`, `center`, `right`, `justify`). | `boolean` |
| `splitBlock` | Split the current block at the cursor position. | `boolean` |
| `splitCollapsible` | Split a collapsible section at the cursor. | `boolean` |
| `splitListItem` | Split a list item at the cursor, creating a sibling item. | `boolean` |
| `toLowerCase` | Convert selected text to lowercase. | `boolean` |
| `toUpperCase` | Convert selected text to uppercase. | `boolean` |
| `toggleBlockQuote` | Toggle block quote formatting on the current block. | `boolean` |
| `toggleBold` | Toggle bold (strong) formatting on the current selection. | `boolean` |
| `toggleBulletList(payload?)` | Toggle bullet (unordered) list for the current block. | `boolean` |
| `toggleCallout(payload?)` | Toggle callout (highlighted note) formatting on the current block. | `boolean` |
| `toggleCaption(payload?)` | Toggle a caption on the currently selected image. | `boolean` |
| `toggleCodeBlock(payload?)` | Toggle code block on current block. | `boolean` |
| `toggleCodeMark` | Toggle inline code formatting on the current selection. | `boolean` |
| `toggleCollapsible(payload?)` | Toggle collapsible (expandable) section on the current block. | `boolean` |
| `toggleHeaderColumn` | Toggle the header column status of the current column. | `boolean` |
| `toggleHeaderRow` | Toggle the header row status of the current row. | `boolean` |
| `toggleItalic` | Toggle italic (emphasis) formatting on the current selection. | `boolean` |
| `toggleOrderedList(payload?)` | Toggle ordered (numbered) list for the current block. | `boolean` |
| `toggleStrikethrough` | Toggle strikethrough formatting on the current selection. | `boolean` |
| `toggleSubscript` | Toggle subscript formatting on the current selection. | `boolean` |
| `toggleSuperscript` | Toggle superscript formatting on the current selection. | `boolean` |
| `toggleTaskChecked(payload?)` | Toggle the checked state of a task list item. | `boolean` |
| `toggleTaskList(payload?)` | Toggle task list (checklist) for the current block. | `boolean` |
| `toggleUnderline` | Toggle underline formatting on the current selection. | `boolean` |
| `undo` | Undo the last editor change. | `boolean` |
| `unsetColor` | Remove color formatting from selected text. | `boolean` |
| `unsetFontFamily` | Remove custom font family from selected text. | `boolean` |
| `unsetFontSize` | Remove custom font size from selected text. | `boolean` |
| `unsetHighlight` | Remove background highlight from selected text. | `boolean` |
| `unsetLink` | Remove hyperlink formatting from selected text. | `boolean` |
| `unsetTextAlign` | Remove custom text alignment from the current block. | `boolean` |
| `updateImage(payload)` | Update attributes of the currently selected image. | `boolean` |

#### TypedCanFacade

`TypedCanFacade` — Command availability check interface (dry-run surface). All methods mirror `TypedCommandsFacade` but execute as dry-run queries that return `boolean` without dispatching any changes to the editor state. Use this to check if a command is available before offering it in a toolbar or menu, or to enable/disable UI controls. No document changes occur. Ideal for toolbar button enable/disable logic and command availability inspection.

The complete list of methods on `TypedCanFacade` (all return `boolean`):

`addCaption`, `backspaceCollapsible`, `clearCodeBlock`, `clearFormatting`, `clearSelection`, `collapse`, `deleteCollapsible`, `deleteColumn`, `deleteListItem`, `deleteNode`, `deleteRange`, `deleteRow`, `deleteTable`, `deleteText`, `enterCollapsible`, `exitCode`, `expand`, `indent`, `indentCodeBlock`, `indentListItem`, `inputRuleInsert`, `inputRuleMark`, `inputRuleTransform`, `inputRuleWrap`, `insertColumnAfter`, `insertColumnBefore`, `insertImage`, `insertNode`, `insertParagraphInCell`, `insertRowAfter`, `insertRowBefore`, `insertTable`, `insertText`, `joinListBackward`, `mergeCollapsibleBackward`, `mergeCollapsibleForward`, `moveNode`, `moveToNextCell`, `moveToPreviousCell`, `outdent`, `outdentCodeBlock`, `outdentListItem`, `redo`, `removeCaption`, `removeImage`, `replaceText`, `selectAll`, `setBulletListType`, `setCellAttribute`, `setCodeBlock`, `setCodeBlockLanguage`, `setColor`, `setFontFamily`, `setFontSize`, `setHardBreak`, `setHeading`, `setHighlight`, `setHorizontalRule`, `setImageAlign`, `setImageDimension`, `setImageDisplay`, `setImageWrap`, `setLink`, `setOrderedListType`, `setParagraph`, `setSelection`, `setTextAlign`, `splitBlock`, `splitCollapsible`, `splitListItem`, `toLowerCase`, `toUpperCase`, `toggleBlockQuote`, `toggleBold`, `toggleBulletList`, `toggleCallout`, `toggleCaption`, `toggleCodeBlock`, `toggleCodeMark`, `toggleCollapsible`, `toggleHeaderColumn`, `toggleHeaderRow`, `toggleItalic`, `toggleOrderedList`, `toggleStrikethrough`, `toggleSubscript`, `toggleSuperscript`, `toggleTaskChecked`, `toggleTaskList`, `toggleUnderline`, `undo`, `unsetColor`, `unsetFontFamily`, `unsetFontSize`, `unsetHighlight`, `unsetLink`, `unsetTextAlign`, `updateImage`.

#### TypedChain

`TypedChain` — Fluent command chaining interface. Accumulates multiple commands and executes them in a single atomic transaction. All methods return `TypedChain` for method chaining. Use the terminal methods `.run()` and `.canRun()` to execute or check the accumulated chain. Useful for complex multi-step operations that should appear as a single undo event to the user, or for optimizing performance when multiple changes are needed. Note: `undo()` and `redo()` are intentionally NOT available on chains — they apply to history, not individual documents.

**Terminal methods:**

| Method | Description | Returns |
|--------|-------------|---------|
| `run()` | Execute the accumulated chain commands in a single atomic transaction. Runs all accumulated commands together, appearing as a single undo event to the user. Returns a result indicating success or failure of the chain execution. | `ChainResult` |
| `canRun()` | Check if the accumulated chain commands can execute without applying changes. Performs a dry-run validation of all accumulated commands without modifying editor state. Useful for enabling/disabling UI controls based on command availability. | `boolean` |

**Chainable methods (each returns `TypedChain`):**

The chainable methods on `TypedChain` mirror the methods on `TypedCommandsFacade` with the addition of a `payload` parameter where applicable. The full list:

`addCaption`, `backspaceCollapsible`, `clearCodeBlock`, `clearFormatting`, `clearSelection`, `collapse`, `deleteCollapsible`, `deleteColumn`, `deleteListItem`, `deleteNode(payload: DeleteNodePayload)`, `deleteRange(payload: DeleteRangePayload)`, `deleteRow`, `deleteTable`, `deleteText(payload: DeleteTextPayload)`, `enterCollapsible`, `exitCode`, `expand`, `indent`, `indentCodeBlock`, `indentListItem`, `inputRuleInsert(payload: InputRuleInsertPayload)`, `inputRuleMark(payload: InputRuleMarkPayload)`, `inputRuleTransform(payload: InputRuleTransformPayload)`, `inputRuleWrap(payload: InputRuleWrapPayload)`, `insertColumnAfter`, `insertColumnBefore`, `insertImage(payload: InsertImagePayload)`, `insertNode(payload: InsertNodePayload)`, `insertParagraphInCell`, `insertRowAfter`, `insertRowBefore`, `insertTable(payload: InsertTablePayload)`, `insertText(payload: InsertTextPayload)`, `joinListBackward`, `mergeCollapsibleBackward`, `mergeCollapsibleForward`, `moveNode(payload: MoveNodePayload)`, `moveToNextCell`, `moveToPreviousCell`, `outdent`, `outdentCodeBlock`, `outdentListItem`, `removeCaption`, `removeImage`, `replaceText(payload: ReplaceTextPayload)`, `selectAll`, `setBulletListType(payload: SetBulletListTypePayload)`, `setCellAttribute(payload: SetCellAttributePayload)`, `setCodeBlock`, `setCodeBlockLanguage(payload: SetCodeBlockLanguagePayload)`, `setColor(payload: SetColorPayload)`, `setFontFamily(payload: SetFontFamilyPayload)`, `setFontSize(payload: SetFontSizePayload)`, `setHardBreak`, `setHeading(payload: SetHeadingPayload)`, `setHighlight(payload: SetHighlightPayload)`, `setHorizontalRule`, `setImageAlign(payload: SetImageAlignPayload)`, `setImageDimension(payload: SetImageDimensionPayload)`, `setImageDisplay(payload: SetImageDisplayPayload)`, `setImageWrap(payload: SetImageWrapPayload)`, `setLink(payload: SetLinkPayload)`, `setMark(payload: SetMarkPayload)`, `setOrderedListType(payload: SetOrderedListTypePayload)`, `setParagraph`, `setSelection(payload: SetSelectionPayload)`, `setTextAlign(payload: SetTextAlignPayload)`, `splitBlock`, `splitCollapsible`, `splitListItem`, `toggleBlockQuote`, `toggleBold`, `toggleBulletList(payload: ToggleBulletListPayload)`, `toggleCallout(payload: ToggleCalloutPayload)`, `toggleCaption(payload: ToggleCaptionPayload)`, `toggleCodeBlock`, `toggleCodeMark`, `toggleCollapsible(payload: ToggleCollapsiblePayload)`, `toggleHeaderColumn`, `toggleHeaderRow`, `toggleItalic`, `toggleMark(payload: ToggleMarkPayload)`, `toggleOrderedList(payload: ToggleOrderedListPayload)`, `toggleStrikethrough`, `toggleSubscript`, `toggleSuperscript`, `toggleTaskChecked(payload: ToggleTaskCheckedPayload)`, `toggleTaskList(payload: ToggleTaskListPayload)`, `toggleUnderline`, `unsetColor`, `unsetFontFamily`, `unsetFontSize`, `unsetHighlight`, `unsetLink`, `unsetTextAlign`, `updateImage(payload: UpdateImagePayload)`.


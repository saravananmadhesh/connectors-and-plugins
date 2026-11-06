# Table

The `tableExtension` registers the `table`, `tableRow`, `tableCell`, and `tableHeader` block container nodes for rendering and editing tables as `<table>`, `<tr>`, `<td>`, and `<th>`.

## Table of Contents

- [Register the extension](#register-the-extension)
- [Node attributes](#node-attributes)
  - [tableCell and tableHeader](#tablecell-and-tableheader)
- [Configure table options](#configure-table-options)
- [Commands](#commands)
  - [Table structure](#table-structure)
  - [Cell content and formatting](#cell-content-and-formatting)
  - [Cell navigation](#cell-navigation)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [API references](#api-references)
  - [TableOptions](#tableoptions)
  - [InsertTablePayload](#inserttablepayload)
  - [Table internals](#table-internals)
  - [Cell selection types](#cell-selection-types)

## Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, tableExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [tableExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Node attributes

### tableCell and tableHeader

| Attribute | Description | Default |
|-----------|-------------|---------|
| `colspan` | Number of columns the cell spans. | `1` |
| `rowspan` | Number of rows the cell spans. | `1` |
| `colwidth` | Comma-separated column widths in pixels (for example, `120,200,80`). | `null` |
| `align` | Horizontal text alignment of the cell (`left`, `center`, or `right`). | `null` |
| `verticalAlign` | Vertical text alignment of the cell (`top`, `middle`, or `bottom`). | `null` |
| `backgroundColor` | CSS color value for the cell background. | `null` |
| `color` | CSS color value for the cell text. | `null` |
| `borderColor` | CSS color value for the cell border. | `null` |

## Configure table options

The `table` extension exposes options that control table behavior:

| Option | Description | Default |
|--------|-------------|---------|
| `resize` | When `true`, table columns can be resized by dragging the column separator handles in the header row. | `true` |

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, tableExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        tableExtension.configure({
            resize: true
        })
    ]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Commands

### Table structure

| Command | Description |
|---------|-------------|
| `insertTable({ rows, columns })` | Inserts a new table at the current cursor position with the specified number of `rows` and `columns` (minimum 1). Each cell is initialized with an empty paragraph. |
| `deleteTable()` | Removes the table under the cursor from the document. |
| `insertRowBefore()` | Inserts a new empty row above the current row. |
| `insertRowAfter()` | Inserts a new empty row below the current row. |
| `deleteRow()` | Removes the table row under the cursor. |
| `insertColumnBefore()` | Inserts a new empty column to the left of the current column. |
| `insertColumnAfter()` | Inserts a new empty column to the right of the current column. |
| `deleteColumn()` | Removes the table column under the cursor. |

### Cell content and formatting

| Command | Description |
|---------|-------------|
| `insertParagraphInCell()` | Inserts a new paragraph block inside the current table cell without splitting the cell structure. Bound to <kbd>Enter</kbd> inside a cell. |
| `setCellAttribute({ attribute, value })` | Sets an arbitrary attribute on the cell(s) in the current selection. Common attributes include `colspan`, `rowspan`, `colwidth`, `align`, `verticalAlign`, `backgroundColor`, `color`, and `borderColor`. |
| `toggleHeaderRow()` | Toggles the row containing the cursor between a body row and a header row. |
| `toggleHeaderColumn()` | Toggles the column containing the cursor between body cells and header cells. |

### Cell navigation

| Command | Description |
|---------|-------------|
| `moveToNextCell()` | Moves the cursor to the next table cell. If the cursor is in the last cell, a new row is appended automatically. |
| `moveToPreviousCell()` | Moves the cursor to the previous table cell. |

```ts
// Insert a 3x3 table at the cursor
editor.commands.insertTable({ rows: 3, columns: 3 });

// Add a new row below the current row
editor.commands.insertRowAfter();

// Convert the current row into a header row
editor.commands.toggleHeaderRow();

// Apply background color to the selected cells
editor.commands.setCellAttribute({ attribute: 'backgroundColor', value: '#f0f8ff' });

// Move to the next cell
editor.commands.moveToNextCell();
```

## Keyboard shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Move to Next Cell | <kbd>Tab</kbd> | <kbd>Tab</kbd> |
| Move to Previous Cell | <kbd>Shift</kbd> + <kbd>Tab</kbd> | <kbd>Shift</kbd> + <kbd>Tab</kbd> |
| Insert Paragraph in Cell | <kbd>Enter</kbd> | <kbd>Enter</kbd> |

## API references

This section documents the table-related public API surface — extension options, command payloads, and other types specific to this node.

### TableOptions

`TableOptions` — top-level configuration options consumed by the Table extension.

| Property | Type | Description |
|----------|------|-------------|
| `resize` | `boolean` | Enable or disable table column resizing via drag handles. Default `true`. When `true`, table columns can be resized by dragging the column separator handles in the header row. When `false`, column resize handles are not rendered. |

### InsertTablePayload

`InsertTablePayload` — payload for the `insertTable` command. Inserts a new table at the current cursor position. Each cell is initialized with an empty paragraph and inherits document alignment settings.

| Property | Type | Description |
|----------|------|-------------|
| `columns` | `number` | Number of columns in the new table (minimum 1). |
| `rows` | `number` | Number of rows in the new table (minimum 1). |

### Table internals

`TableService` — resolves table, row, and cell context from the headless document. All methods perform pure tree walks (no PM imports). Complex structural operations (e.g. `TableMap`, colspan-aware coordinates) are delegated to PM adapters inside `src/pm/` by commands at the PM boundary.

| Method | Description | Returns |
|--------|-------------|---------|
| `getCurrentCell(doc, selection)` | Find the `tableCell` containing the cursor/anchor of the current selection. Performs a tree walk from the document root. | `CellContext \| null` |
| `getCurrentTable(doc, selection)` | Find the table containing the cursor/anchor of the current selection. Performs a tree walk from the document root. | `TableContext \| null` |
| `getSelectedCells(doc, selection)` | Get all cells included in a `CellSelection` range. Returns an empty array when the selection is not a `CellSelection`. | `CellContext[]` |
| `resolveCellCoordinates(cellNode, tableNode)` | Resolve the (row, col) coordinates of a cell within its parent table. | `Object \| null` |

`CellContext` — resolved context for a single table cell.

| Property | Type | Description |
|----------|------|-------------|
| `cellNode` | `EditorNode` | The `tableCell` `EditorNode`. |
| `cellPath` | `number[]` | Path from the document root to the cell. |
| `col` | `number` | Zero-based column index within the row. |
| `row` | `number` | Zero-based row index within the table. |

`TableContext` — resolved context for a table node in the document.

| Property | Type | Description |
|----------|------|-------------|
| `node` | `EditorNode` | The table `EditorNode`. |

### Cell selection types

`CellSelection` — a selection spanning one or more table cells.

| Property | Type | Description |
|----------|------|-------------|
| `anchorCellPath` | `number[]` | Path to the anchor (first) cell in the selection. |
| `headCellPath` | `number[]` | Path to the head (last) cell in the selection. |
| `type` | `Cell` | Always `SelectionType.Cell`. |

`SelectedCell` — Cell-specific info for table interactions.

| Property | Type | Description |
|----------|------|-------------|
| `colIndex` | `number` | Zero-based column index of this cell within its row. |
| `dom` | `HTMLElement \| null` | Live DOM element that renders this node in the editor. |
| `node` | `EditorNode \| TextNode` | The selected `EditorNode` or `TextNode`. PM-free. |
| `pmPos` | `number` | The ProseMirror position of this node's start (0-based offset). |
| `rowIndex` | `number` | Zero-based row index of this cell within its table. |

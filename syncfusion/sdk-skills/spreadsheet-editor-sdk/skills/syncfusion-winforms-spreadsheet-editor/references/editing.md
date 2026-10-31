# Editing in Windows Forms Spreadsheet

The WinForms Spreadsheet control provides interactive editing support for cells, including programmatic edit control, cell locking, data validation, and hyperlinks.

## Cell Editing

By default, editing is enabled in the Spreadsheet. To disable editing, set the `AllowEditing` property on `SfCellGrid`.

```csharp
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    spreadsheet.ActiveGrid.AllowEditing = false;
}
```

### Begin Edit Programmatically

**Method:** `BeginEdit(bool selectAll)` on `SpreadsheetCurrentCell`

```csharp
spreadsheet.ActiveGrid.CurrentCell.BeginEdit(true);
```

### End Edit

**Method:** `ValidateAndEndEdit()` — Validates and ends edit mode.
- If `cancel` = true, remains in edit mode.
- If `validation` = true, commits value and moves to next cell.
- If `validation` = false, reverts to old value and moves to next cell.

**Method:** `EndEdit(bool commit)`
- `true` — Commits new value and ends edit.
- `false` — Reverts to old value and ends edit.

```csharp
// Validate and end edit:
spreadsheet.ActiveGrid.CurrentCell.ValidateAndEndEdit();

// Commit new value and end edit:
spreadsheet.ActiveGrid.CurrentCell.EndEdit(true);
```

## Locking or Unlocking a Cell

Use the `Locked` property on the cell's `CellStyle` to lock or unlock individual cells.

```csharp
var worksheet = spreadsheet.ActiveSheet;
var excelStyle = worksheet.Range["A2"].CellStyle;

// Unlock the cell:
excelStyle.Locked = false;

// Lock the cell:
excelStyle.Locked = true;
```

> **NOTE:** Cell locking takes effect only when the worksheet is protected. See [Protection](protection.md) for more details.

## Properties

| Property | Description |
|---|---|
| `AllowEditing` | Gets or sets whether to allow editing operations on the grid. |
| `EditorSelectionBehavior` | Gets or sets whether the editor selects all the value or moves to the last position when entering edit mode. |
| `EditTrigger` | Gets or sets the trigger options that cause cells to enter Edit Mode. |
| `IsEditing` | Gets a value indicating whether the current cell is in edit mode. |

## Methods

| Method | Description |
|---|---|
| `BeginEdit(bool selectAll)` | Begins editing of the current cell. Returns `true` if the cell enters edit mode. |
| `EndEdit(bool commit)` | Commits (true) or reverts (false) the value and ends edit mode of the current cell. |
| `ValidateAndEndEdit()` | Validates the current cell value and ends edit mode. |
| `Validate()` | Validates the current cell in SpreadsheetGrid without ending edit mode. |

## Events

| Event | Description |
|---|---|
| `CurrentCellBeginEdit` | Occurs when the current cell enters edit mode. Can be cancelled. |
| `CurrentCellValueChanged` | Occurs when the current cell value changes while in edit mode. |
| `CurrentCellValidating` | Occurs when the current cell value is about to be validated. Can be cancelled to prevent ending edit mode. |
| `CurrentCellValidated` | Occurs after the current cell value has been validated. |
| `CurrentCellEndEdit` | Occurs when the current cell leaves edit mode. |

## See Also

- [Data Validation](data-validation.md)
- [Hyperlinks](hyperlinks.md)
- [Protection](protection.md)

## Undo / Redo (HistoryManager)

The `SfSpreadsheet` exposes a `HistoryManager` that provides undo/redo support and transaction management. Use `spreadsheet.HistoryManager` to control undo/redo programmatically.

Key members:

- `BeginTransaction(string description)` — Start a named transaction.
- `CommitTransaction()` / `CommitTransaction(IRange[] ranges)` — Commit the current transaction.
- `Push(HistoryCommandBase cmd)` — Push a custom history command onto the stack.
- `Undo()` — Undo the last command.
- `Redo()` — Redo the last undone command.
- `Reset()` — Clears undo/redo stacks.

Simple example:

```csharp
// Begin a grouped edit
spreadsheet.HistoryManager.BeginTransaction("Bulk update");

// ... perform multiple worksheet/grid edits here ...

// Commit the transaction so it appears as a single undo step
spreadsheet.HistoryManager.CommitTransaction();

// Undo the transaction
spreadsheet.HistoryManager.Undo();

// Redo
spreadsheet.HistoryManager.Redo();
```

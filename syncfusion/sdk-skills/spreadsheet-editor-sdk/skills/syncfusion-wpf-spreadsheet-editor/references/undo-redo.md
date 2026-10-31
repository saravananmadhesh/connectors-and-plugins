# Undo/Redo

> Undo or redo changes made in the workbook in WPF Spreadsheet control.

---

## Overview

Supports undoing or redoing actions, allowing users to revert or reapply changes easily.

---

## Key Features
- Undo/redo at workbook level
- Multiple levels of history
- Keyboard shortcuts (Ctrl+Z, Ctrl+Y)

---

## Example

Make changes to a cell, then press Ctrl+Z to undo or Ctrl+Y to redo the action.

## Undo/Redo
```csharp
// To disable the Undo/Redo operations
spreadsheet.HistoryManager.Enabled = false;

// To perform the Undo/Redo programmatically 
spreadsheet.HistoryManager.Enabled = true;
spreadsheet.HistoryManager.Undo();
spreadsheet.HistoryManager.Redo();
```

---

## References
- [Undo/Redo Documentation](https://help.syncfusion.com/wpf/spreadsheet/undo-redo)

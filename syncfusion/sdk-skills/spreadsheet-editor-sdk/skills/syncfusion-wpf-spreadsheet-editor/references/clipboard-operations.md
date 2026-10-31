# Clipboard Operations

> Cut, copy, and paste cell content in WPF Spreadsheet control.

---

## Overview

Supports standard clipboard operations for moving or duplicating cell data within or between spreadsheets.

---

## Key Features
- Cut, copy, and paste cells, rows, columns
- Paste options: values, formulas, formatting
- Keyboard shortcuts (Ctrl+X, Ctrl+C, Ctrl+V)

---

## Example

Select a range, press Ctrl+C to copy, then Ctrl+V to paste elsewhere.

## Cut
```csharp
//To perform cut operation for selected ranges
var range = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
spreadsheet.ActiveGrid.CopyPaste.Copy(range, true);

//To perform cut operation
spreadsheet.ActiveGrid.CopyPaste.Cut();
```

## Copy
```csharp
//To perform copy operation for selected ranges
var range = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
spreadsheet.ActiveGrid.CopyPaste.Copy(range, false);

//To perform Copy operation
spreadsheet.ActiveGrid.CopyPaste.Copy();
```

## Paste
```csharp
//To perform paste operation
spreadsheet.ActiveGrid.CopyPaste.Paste();

//To perform paste operation with range and Paste Options
var range = spreadsheet.ActiveGrid.SelectedRanges;
var copyPaste = spreadsheet.ActiveGrid.CopyPaste as SpreadsheetCopyPaste;
copyPaste.Paste(range);
copyPaste.Paste(range, PasteOptions.Paste);
```

---

## References
- [Clipboard Operations Documentation](https://help.syncfusion.com/wpf/spreadsheet/clipboard)

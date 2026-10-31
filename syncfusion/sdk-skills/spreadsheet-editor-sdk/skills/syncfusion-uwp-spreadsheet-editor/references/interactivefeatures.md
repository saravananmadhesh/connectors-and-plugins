# Interactive Features — UWP Spreadsheet

> Learn about clipboard operations, undo and redo functionality, context menus, and cell comments in the Syncfusion UWP Spreadsheet (SfSpreadsheet) control.

---

## Overview

The **Interactive Features** in SfSpreadsheet enable users to perform common spreadsheet interactions such as clipboard operations, undo and redo actions, context menu customization, and working with cell comments. These features provide an Excel-like interactive experience. 

---

## Clipboard Operations

SfSpreadsheet supports standard clipboard operations with formatting, similar to Microsoft Excel. Users can perform cut, copy, and paste using keyboard shortcuts or programmatically. 

### Keyboard Shortcuts

- **Cut**: `Ctrl + X`
- **Copy**: `Ctrl + C`
- **Paste**: `Ctrl + V`

### Paste Options

The following paste options are available when performing a paste operation: 

- **Paste** – Paste with all formatting and values
- **Formula** – Paste formulas only
- **Keep Source Formatting** – Maintain original formatting
- **Value** – Paste values only
- **Format** – Paste formatting only
- **Value & Source Formatting** – Paste values with source formatting

> **Note**: When content is copied from an external source, paste options are not supported.

### Cut Operation

```csharp
// To perform Cut opearion programmatically
var range = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
spreadsheet.ActiveGrid.CopyPaste.Copy(range, true);

// Cut the selected range
spreadsheet.ActiveGrid.CopyPaste.Cut();
```

### Copy Operation

```csharp
// To perform Copy opearion programmatically
var range = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
spreadsheet.ActiveGrid.CopyPaste.Copy(range, false);

// Copy currently selected range
spreadsheet.ActiveGrid.CopyPaste.Copy();
```

### Paste Operation

```csharp
// To perform Paste opearion programmatically
// Paste to current selection
spreadsheet.ActiveGrid.CopyPaste.Paste();

// Paste with range and paste options
var range = spreadsheet.ActiveGrid.SelectedRanges;
var copyPaste = spreadsheet.ActiveGrid.CopyPaste as SpreadsheetCopyPaste;
copyPaste.Paste(range);
copyPaste.Paste(range, PasteOptions.Paste);
```

> **Tip**: Set a default paste option using the `DefaultPasteOption` property.

---

## Undo and Redo

SfSpreadsheet provides Undo and Redo functionality through the `HistoryManager`, similar to Excel. 

### Keyboard Shortcuts

- **Undo**: `Ctrl + Z`
- **Redo**: `Ctrl + Y`

### Enable or Disable Undo/Redo

```csharp
// Disable undo and redo
spreadsheet.HistoryManager.Enabled = false;
```

### Invoke Undo and Redo Programmatically

```csharp
spreadsheet.HistoryManager.Enabled = true;
spreadsheet.HistoryManager.Undo();
spreadsheet.HistoryManager.Redo();
```

---

## Context Menu

SfSpreadsheet provides a customizable context menu for worksheet cells. The context menu appears when you right-click on a cell or selected range. 

### Enable or Disable Cell Context Menu

```csharp
spreadsheet.AllowCellContextMenu = false;
```

### Customize Cell Context Menu

You can customize the cell context menu using the `CellContextMenuOpening` event. 

```csharp
//Namespace
using Syncfusion.UI.Xaml.CellGrid.Helpers;
using Syncfusion.UI.Xaml.Spreadsheet.Helpers;

spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
spreadsheet.ActiveGrid.CellContextMenuOpening += ActiveGrid_CellContextMenuOpening;
}

void ActiveGrid_CellContextMenuOpening(object sender, CellContextMenuOpeningEventArgs e)
{
    // Add a custom menu item
    MenuFlyoutItem pasteSpecial = new MenuFlyoutItem();
    pasteSpecial.Text = "Paste Special";


    spreadsheet.ActiveGrid.CellContextMenu.Items.Add(pasteSpecial);

    // Remove an existing menu item
    spreadsheet.ActiveGrid.CellContextMenu.Items.RemoveAt(2);
}
```

> **Tip**: Custom context menus can also be assigned directly to the `CellContextMenu` property of `SpreadsheetGrid`.

---

## Cell Comments

SfSpreadsheet supports cell comments to provide additional context for cell data. Comments can be customized and displayed programmatically. 

### Enable Cell Comments

```csharp
spreadsheet.ActiveGrid.ShowComment = true;
```

### Add Cell Comment

```csharp
spreadsheet.ActiveSheet.Range["E5"].AddComment().Text = "Sample Comment";
spreadsheet.ActiveGrid.InvalidateCell(5, 5);
```

> Comment appearance such as height and color can be customized using the `CellCommentOpening` event.

---

## Reference

Syncfusion Documentation – Interactive Features (UWP Spreadsheet)
https://help.syncfusion.com/document-processing/excel/spreadsheet/uwp/interactive-features

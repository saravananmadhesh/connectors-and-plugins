# Workbook and Worksheet Protection

> Protect worksheets and workbooks from unauthorized changes in WPF Spreadsheet control.

---

## Overview

Supports locking worksheet structure, window, and cells to prevent unwanted edits or structural changes.

---

## Key Features
- Protect worksheet structure and window
- Lock/unlock specific cells
- Prevent structural changes

---

## Example

Enable protection to restrict editing to certain cells or prevent adding/removing sheets.

## Worksheet Protection

### Protect / Unprotect Sheet
```csharp
// To protect the sheet with password
spreadsheet.ProtectSheet(spreadsheet.ActiveSheet, "password123");

// To protect the sheet with Protection options
spreadsheet.ProtectSheet(spreadsheet.ActiveSheet, "password123",
    ExcelSheetProtection.FormattingCells | ExcelSheetProtection.InsertingRows);

// To unprotect the sheet
spreadsheet.UnProtectSheet(spreadsheet.ActiveSheet, "password123");
```

### Protect / Unprotect Workbook
```csharp
// To protect the workbook structure and window
spreadsheet.Protect(true, true, "password123");

// To unprotect the workbook 
spreadsheet.Unprotect("password123");
```

### ExcelSheetProtection Options
```csharp
ExcelSheetProtection.LockedCells        // Allow selecting locked cells
ExcelSheetProtection.UnLockedCells      // Allow selecting unlocked cells
ExcelSheetProtection.FormattingCells    // Allow formatting cells
ExcelSheetProtection.FormattingRows     // Allow formatting rows
ExcelSheetProtection.FormattingColumns  // Allow formatting columns
ExcelSheetProtection.InsertingRows      // Allow inserting rows
ExcelSheetProtection.InsertingColumns   // Allow inserting columns
ExcelSheetProtection.InsertingHyperlinks// Allow inserting hyperlinks
ExcelSheetProtection.DeletingRows       // Allow deleting rows
ExcelSheetProtection.DeletingColumns    // Allow deleting columns
ExcelSheetProtection.Objects            // Allow editing graphic objects
```

---

## References
- [Workbook and Worksheet Protection Documentation](https://help.syncfusion.com/wpf/spreadsheet/protection)

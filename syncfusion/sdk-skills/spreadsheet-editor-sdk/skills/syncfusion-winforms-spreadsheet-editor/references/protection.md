# Protection in Windows Forms Spreadsheet

The WinForms Spreadsheet control supports both worksheet-level and workbook-level protection to prevent unauthorized changes.

## Worksheet Protection

### Protect a Worksheet

**Method:** `Protect(string password, ExcelSheetProtection options)` on `IWorksheet`

```csharp
// Protect with password:
spreadsheet.ProtectSheet(spreadsheet.ActiveSheet, "123");

```

### Unprotect a Worksheet

**Method:** `Unprotect(string password)` on `IWorksheet`

```csharp
spreadsheet.UnProtectSheet(spreadsheet.ActiveSheet, "123");
```

## Workbook Protection

### Protect Workbook Structure

Prevents inserting, deleting, moving, hiding, or renaming worksheets.

**Method:** `Protect(bool isProtectWindow, bool isProtectContent, string password)` on `IWorkbook`

```csharp
// Protect workbook structure and windows:
spreadsheet.Protect(true, true, "123");
```

### Unprotect Workbook

```csharp
spreadsheet.Unprotect("123");
```

### ExcelSheetProtection Options

| Value | Description |
|---|---|
| `All` | Protects all worksheet elements. |
| `None` | No protection. |
| `FormattingCells` | Allows users to format cells. |
| `FormattingColumns` | Allows users to format columns. |
| `FormattingRows` | Allows users to format rows. |
| `InsertingColumns` | Allows users to insert columns. |
| `InsertingRows` | Allows users to insert rows. |
| `InsertingHyperlinks` | Allows users to insert hyperlinks. |
| `DeletingColumns` | Allows users to delete columns. |
| `DeletingRows` | Allows users to delete rows. |
| `Sorting` | Allows users to sort data. |
| `FilteringCells` | Allows users to use AutoFilter. |
| `UsingPivotTables` | Allows users to use PivotTables. |
| `LockedCells` | Allows users to select locked cells. |
| `UnLockedCells` | Allows users to select unlocked cells. |


## Lock and Unlock Specific Cells

By default, all cells are locked. To allow editing of specific cells when the sheet is protected, unlock those cells first.

```csharp
// Unlock cells A1:B5 (allows editing when sheet is protected):
spreadsheet.ActiveSheet.Range["A1:B5"].CellStyle.Locked = false;

// Now protect the sheet:
spreadsheet.ProtectSheet(spreadsheet.ActiveSheet, "123", ExcelSheetProtection.All);
```

> **NOTE:** Cell locking only takes effect when the worksheet is protected. See [Editing](editing.md) for more details on cell locking.


## See Also

- [Editing](editing.md)
- [Worksheet](worksheet.md)
- [Data Validation](data-validation.md)

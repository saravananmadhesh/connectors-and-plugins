# Clipboard Operations in Windows Forms Spreadsheet

The WinForms Spreadsheet control supports Cut, Copy, and Paste clipboard operations — both through the built-in Ribbon UI and programmatically.

When performing clipboard operations in a spreadsheet control, the range used is typically of type GridRangeInfo.
However, if the range is obtained from an IRange object (for example, from the workbook instead of the selected grid range), then you must convert the IRange to GridRangeInfo before using it in clipboard operations.
The GridExcelHelper.ConvertExcelRangeToGridRange() method is used for this conversion.

```csharp

// Get a range from the worksheet using IRange
IRange range = spreadsheet.Workbook.Worksheets[0].Range["A1:B5"];

// Convert IRange to GridRangeInfo
GridRangeInfo gridRange = GridExcelHelper.ConvertExcelRangeToGridRange(range);

```

For paste operation the range is GridRangeInfoList 
```csharp

// 1. Get an IRange from the worksheet
IRange range = spreadsheet.Workbook.Worksheets[0].Range["A1:B5"];

// 2. Convert IRange to GridRangeInfo
GridRangeInfo gridRange = GridExcelHelper.ConvertExcelRangeToGridRange(range);

// 3. Create a GridRangeInfoList & add the converted range
GridRangeInfoList rangeList = new GridRangeInfoList();
rangeList.Add(gridRange);

```

## Copy Operation

```csharp
//To perform copy operation for selected ranges
var range = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
spreadsheet.ActiveGrid.CopyPaste.Copy(range, false);

//To perform Copy operation
spreadsheet.ActiveGrid.CopyPaste.Copy();
```

## Cut Operation

```csharp
//To perform cut operation for selected ranges
var range = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
spreadsheet.ActiveGrid.CopyPaste.Copy(range, true);

//To perform cut operation
spreadsheet.ActiveGrid.CopyPaste.Cut();
```

## Paste Operation

```csharp
//To perform paste operation
spreadsheet.ActiveGrid.CopyPaste.Paste();

//To perform paste operation with range and Paste Options
var copyPaste = spreadsheet.ActiveGrid.CopyPaste as SpreadsheetCopyPaste;
copyPaste.Paste(range);
copyPaste.Paste(range, PasteOptions.Paste);
```

### Paste Options (PasteSpecial)

The `SpreadsheetCopyPaste` class exposes a `PasteOptions` enum and related members to control PasteSpecial-like behaviors.

- Property: `AllowPasteOptionPopup` (bool) — Controls whether the paste options popup is shown after a paste.
- Property: `DefaultPasteOption` (`PasteOptions`) — Gets or sets the default paste option used when pasting.
- Property: `PasteDropdownItem` (`PasteDropDownItem`) — The dropdown control for paste options.

Common `PasteOptions` usage:

```csharp
var copyPaste = spreadsheet.ActiveGrid.CopyPaste as SpreadsheetCopyPaste;

// Paste using the default option
copyPaste.Paste(rangeList);

// Paste using an explicit option (e.g. values only)
copyPaste.Paste(rangeList, PasteOptions.Value);

// Programmatically change the default paste option
copyPaste.DefaultPasteOption = PasteOptions.Value;

// Disable showing the paste option popup
copyPaste.AllowPasteOptionPopup = false;
```

# Cell Comments

To enable the comment in Spreadsheet, set the ShowComment property of SpreadsheetGrid to true.

```csharp
spreadsheet.ActiveGrid.ShowComment = true;
```

To set the comments for particular cell at run time,

```csharp
spreadsheet.ActiveSheet.Range["E5"].AddComment().Text = "Sample Comment";
spreadsheet.ActiveGrid.InvalidateCell(5, 5);

```
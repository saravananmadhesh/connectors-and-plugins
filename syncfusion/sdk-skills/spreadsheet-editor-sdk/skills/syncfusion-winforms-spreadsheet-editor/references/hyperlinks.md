# Hyperlinks in Windows Forms Spreadsheet

The WinForms Spreadsheet control supports importing, creating, and editing hyperlinks. Hyperlinks provide a convenient way to navigate data within a worksheet, other worksheets in a workbook, external files, web URLs, or email addresses.

**Interface:** `IHyperLink`  
**Interface:** `IHyperlinks`  
**Enum:** `ExcelHyperLinkType`

## Supported Hyperlink Types

| Type | Enum Value | Description |
|---|---|---|
| Web URL | `ExcelHyperLinkType.Url` | Links to a web address (http/https) or email (mailto). |
| File | `ExcelHyperLinkType.File` | Links to an external file path. |
| Workbook | `ExcelHyperLinkType.Workbook` | Links to a cell or range in the same workbook. |
| UNC Path | `ExcelHyperLinkType.Unc` | Links to a UNC network path. |

## Add a URL / Email Hyperlink

```csharp
var range = spreadsheet.ActiveSheet.Range["A5"];
IHyperLink hyperlink = spreadsheet.ActiveSheet.HyperLinks.Add(range);
hyperlink.Type = ExcelHyperLinkType.Url;
hyperlink.Address = "mailto:Username@syncfusion.com";
hyperlink.TextToDisplay = "Send Mail";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5, 1));
```

## Add a File Hyperlink

```csharp
var range = spreadsheet.ActiveSheet.Range["D5"];
IHyperLink hyperlink = spreadsheet.ActiveSheet.HyperLinks.Add(range);
hyperlink.Type = ExcelHyperLinkType.File;
hyperlink.Address = @"C:\Samples\Local";
hyperlink.TextToDisplay = "File Location";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5, 4));
```

## Add a Workbook (Cell Reference) Hyperlink

```csharp
var range = spreadsheet.ActiveSheet.Range["C13"];
IHyperLink hyperlink = spreadsheet.ActiveSheet.HyperLinks.Add(range);
hyperlink.Type = ExcelHyperLinkType.Workbook;
hyperlink.Address = "Sheet2!C23";
hyperlink.TextToDisplay = "Sample";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(13, 3));
```

> **NOTE:** For workbook hyperlinks, use the format `SheetName!CellAddress` for the `Address` property.

## Edit a Hyperlink

Access the existing hyperlink via the range's `Hyperlinks` collection and update its properties.

```csharp
var hyperlink = spreadsheet.ActiveSheet.Range["A5"].Hyperlinks[0];
hyperlink.TextToDisplay = "Sample";
hyperlink.Address = "http://help.syncfusion.com";
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5, 1));
```

## Remove a Hyperlink

```csharp
spreadsheet.ActiveSheet.Range["A5"].Hyperlinks.RemoveAt(0);
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Cell(5, 1));
```

## IHyperLink Properties

| Property | Type | Description |
|---|---|---|
| `Type` | `ExcelHyperLinkType` | Gets or sets the type of the hyperlink. |
| `Address` | `string` | Gets or sets the hyperlink target address (URL, file path, or cell reference). |
| `TextToDisplay` | `string` | Gets or sets the display text shown in the cell for the hyperlink. |
| `ScreenTip` | `string` | Gets or sets the tooltip text shown when hovering over the hyperlink. |

## See Also

- [Editing](editing.md)
- [Formulas](formulas.md)

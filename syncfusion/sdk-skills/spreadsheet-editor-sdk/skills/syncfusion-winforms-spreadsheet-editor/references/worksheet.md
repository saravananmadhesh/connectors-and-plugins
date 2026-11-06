## Add a Worksheet

**Method:** `AddSheet()` on `Spreadsheet`

```csharp
spreadsheet.AddSheet();
```

To add a worksheet at a specific position:

```csharp
spreadsheet.AddSheet("Sheet4", 3);
```

## Remove a Worksheet

```csharp
spreadsheet.RemoveSheet("Sheet2");
```

## Rename a Worksheet

```csharp
//To Rename a sheet programmatically
spreadsheet.RenameSheet("ExistingSheetName", "NewSheetName");
```

## Navigate Between Worksheets

**Property:** `ActiveSheet` on `Spreadsheet`

```csharp
// Set the active sheet using the provided sheet name. If no sheet name is specified, use the default sheet names (e.g., Sheet1 for the first sheet, Sheet2 for the second sheet, and so on).
spreadsheet.SetActiveSheet("Sheet5");
```

## Access Worksheets

```csharp
// Access by index:
IWorksheet sheet = spreadsheet.Workbook.Worksheets[0];

// Access by name:
IWorksheet sheet = spreadsheet.Workbook.Worksheets["Sheet1"];

// Get total worksheet count:
int count = spreadsheet.Workbook.Worksheets.Count;
```

## Accessing the cell or range of cells

```csharp
// Access a cell by specifying cell address. 
var cell = spreadsheet.Workbook.Worksheets[0].Range["A3"];

// Access a cell by specifying cell row and column index. 
var cell1 = spreadsheet.Workbook.Worksheets[0].Range[3, 1];

// Access a cells by specifying user defined name.
var cell2 = spreadsheet.Workbook.Worksheets[0].Range["Namerange"];

// Accessing a range of cells by specifying cell's address.
var cell3 = spreadsheet.Workbook.Worksheets[0].Range["A5:C8"];

// Accessing a range of cells specifying cell row and column index.
var cell4 = spreadsheet.Workbook.Worksheets[0].Range[15, 1, 15, 3];
```

## Accessing the value of a cell
```csharp
// Access a cell value by using "Value" Property,
var cellValue = spreadsheet.Workbook.Worksheets[1].Range["A3"].Value

// Access a cell value by using "DisplayText" Property. 
var displayValue = spreadsheet.Workbook.Worksheets[1].Range[4, 1].DisplayText;
```

## Formula Bar

```csharp
spreadsheet.FormulaBarVisibility = true;
```

## Show or Hide a Worksheet

```csharp
//Hide Sheet
spreadsheet.HideSheet("Sheet2");

//Unhide Sheet
spreadsheet.UnhideSheet("Sheet2");
```

## Show or Hide Sheet Tabs

The `ShowSheetTabs` property controls the visibility of the sheet tab bar at the bottom of the Spreadsheet. When set to `false`, the entire sheet tab bar is hidden, preventing users from switching between sheets through the tab interface. The default value is `true`, which displays all worksheet tabs.

### Show Sheet Tabs

To display all the worksheet tabs in the workbook, set the `ShowSheetTabs` property to `true`:

```csharp
//Show Sheet Tabs
spreadsheet.ShowSheetTabs = true;
```

### Hide Sheet Tabs

To hide all the worksheet tabs in the workbook, set the `ShowSheetTabs` property to `false`:

```csharp
//Hide Sheet Tabs
spreadsheet.ShowSheetTabs = false;
```

## Gridlines
```csharp
//To show GridLines
spreadsheet.SetGridLinesVisibility(true);

//To hide GridLines
spreadsheet.SetGridLinesVisibility(false);
```

## Headings
```csharp
//To hide the Header cells visibility
spreadsheet.SetRowColumnHeadersVisibility(false);
```

## Zooming
```csharp
//zoom factor
spreadsheet.SetZoomFactor("Sheet1", 200);
```

### Zoom configuration and events

The `Spreadsheet` control exposes zoom-related properties and events to control and respond to zoom changes:

- `AllowZooming` (bool) — Gets or sets whether end users can perform zooming on the control.
- `SetZoomFactor(string sheetName, int zoomFactor)` — Sets the zoom level for the specified sheet (50–400; 0 = no zoom).
- `ZoomFactorChanging` — Event raised before the zoom factor changes (can be used to cancel or validate).
- `ZoomFactorChanged` — Event raised after the zoom factor has changed.

Example:

```csharp
// Disable user zooming
spreadsheet.AllowZooming = false;

// Subscribe to zoom events
spreadsheet.ZoomFactorChanging += (s, e) => {
	// cancel the zooming process
	e.Cancel = true;
};

spreadsheet.ZoomFactorChanged += (s, e) => {
	
};

// Programmatically set zoom to 150%
spreadsheet.SetZoomFactor(spreadsheet.ActiveSheet.Name, 150);
```
## Worksheet Events

| Event | Description |
|---|---|
| `WorkbookLoaded` | Occurs after a workbook is loaded into the Spreadsheet. |
| `SheetAdded` | Occurs when a new worksheet is added. |
| `SheetRemoved` | Occurs when a worksheet is removed. |
| `ActiveSheetChanged` | Occurs when the active worksheet is changed. |

## See Also

- [Getting Started](getting-started.md)
- [Editing](editing.md)
- [Protection](protection.md)

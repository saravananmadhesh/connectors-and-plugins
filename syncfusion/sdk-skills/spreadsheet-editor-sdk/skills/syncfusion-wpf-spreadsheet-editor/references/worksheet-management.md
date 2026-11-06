# Worksheet Management

> Insert, delete, rename, hide/unhide worksheets and sheet tabs; control gridlines, headings, zoom, and handle workbook/worksheet events in WPF Spreadsheet (SfSpreadsheet).

---

## Insert and Delete Worksheet

### Minimal Code
```csharp
// Insert a new sheet
spreadsheet.AddSheet();
```

### With Name and Position
```csharp
// Insert sheet with name at index
spreadsheet.AddSheet("Sheet4", 3);

// Delete a sheet by name
spreadsheet.RemoveSheet("Sheet2");
```

---

## Hide and Unhide Worksheets

### Minimal Code
```csharp
//To hide Sheet from the workbook by sheet name 
spreadsheet.HideSheet("Sheet2");
```

### Unhide
```csharp
// To Unhide the by sheet name 
spreadsheet.UnhideSheet("Sheet2");
```

---

## Hide or Unhide Sheet Tabs

### Minimal Code
```csharp
// To hide the all sheets tabs in the spreadsheet 
spreadsheet.ShowSheetTabs = false;

//To show the all sheets tabs in the spreadsheet
spreadsheet.ShowSheetTabs = true;

```

### Via XAML
```xml
<syncfusion:SfSpreadsheet x:Name="spreadsheet" ShowSheetTabs="False"/>
```

---

## Rename a Worksheet

### Interactive Rename (enters edit mode on tab)
```csharp
spreadsheet.RenameSheet("Sheet1");
```

### Programmatic Rename
```csharp
// RenameSheet(existingName, newName). If the user does not provide the new name, get it from the user.
spreadsheet.RenameSheet("Sheet1", "SalesData");
```

### Setting the ActiveSheet Programmatically

**Important:** The event subscription **must occur in the constructor** before `Create()` is called, otherwise the `WorkbookLoaded` event may not trigger.

```csharp
// In constructor: Create workbook with multiple sheets and subscribe to WorkbookLoaded event
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;

// Set the active sheet using the provided sheet name. If no sheet name is specified, use the default sheet names (e.g., Sheet1 for the first sheet, Sheet2 for the second sheet, and so on).
private void Spreadsheet_WorkbookLoaded(object sender, Syncfusion.UI.Xaml.Spreadsheet.Helpers.WorkbookLoadedEventArgs args)
{
    spreadsheet.SetActiveSheet("Sheet2");
}
```
---

## Gridlines

### Show / Hide Gridlines
```csharp
// To show GridLines in the worksheet
spreadsheet.SetGridLinesVisibility(true);

// To hide GridLines in the worksheet
spreadsheet.SetGridLinesVisibility(false);
```

---

## Row and Column Headings

### Show / Hide Headers
```csharp
// To hide row/column header cells
spreadsheet.SetRowColumnHeadersVisibility(false);

// To show row/column header cells
spreadsheet.SetRowColumnHeadersVisibility(true);
```

---

## Zooming

### Minimal Code
```csharp
// To zoom in and zoom out sheet view in the spreadsheet
spreadsheet.SetZoomFactor("Sheet1", 150);
```

### Zoom Range
```csharp
// Zoom factor between 10% and 400%
spreadsheet.SetZoomFactor("Sheet1", 75);   // zoom out
spreadsheet.SetZoomFactor("Sheet1", 200);  // zoom in
```

### Disable Zooming
```csharp
// To disable the zooming 
spreadsheet.AllowZooming = false;
```

### Zoom Event Handling

```csharp
public MainWindow()
{
    InitializeComponent();
    
    spreadsheet.ZoomFactorChanging += (s, e) => {
        // Prevent zoom above 200%
        if (e.ZoomFactor > 200)
        {
            e.Cancel = true;
        }
    };

    spreadsheet.ZoomFactorChanged += (s, e) => {
	
    };
}
```

---

## Workbook and Worksheet Events

| Event | Description |
|---|---|
| `WorkbookCreating` | Fires when the workbook is about to be created |
| `WorkbookLoaded` | Fires when the workbook is loaded |
| `WorksheetAdding` | Fires before a worksheet is added |
| `WorksheetAdded` | Fires after a worksheet is added |
| `WorksheetRemoving` | Fires before a worksheet is removed |
| `WorksheetRemoved` | Fires after a worksheet is removed |
| `WorkbookUnloaded` | Fires when the workbook is unloaded |
| `ZoomFactorChanging` | Fires when zoom factor is about to change |
| `ZoomFactorChanged` | Fires after zoom factor changes |
| `ResizingColumns` | Fires when columns are being resized |
| `ResizingRows` | Fires when rows are being resized |
| `CellCommentOpening` | Fires when a cell comment is opening |
| `CellTooltipOpening` | Fires when a cell tooltip is opening |
| `CellContextMenuOpening` | Fires when the cell context menu is opening |
| `QueryRange` | Fires when the grid queries cell range info during render |

---

## References
- [Worksheet Management Documentation](https://help.syncfusion.com/wpf/spreadsheet/worksheet-management)

# Floating Cells

> Display cell content that exceeds cell width by floating into adjacent cells in WPF Spreadsheet control.

---

## Overview

When text in a cell is longer than the cell width, it floats into adjacent empty cells, improving readability.

---

## Key Features
- Float cell content in display and edit mode
- Enhanced readability for long text

---

## Example

Enter a long text in a cell; if adjacent cells are empty, the text floats across them.

---

## Floating Cells Configuration

### Enable/Disable Floating Cells

```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;

void Spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    // By default, floating cells are enabled
    // Text that exceeds cell width will float into adjacent empty cells
    
    var sheet = spreadsheet.Workbook.Worksheets[0];
    
    // Add long text that will float
    sheet["A1"].Text = "This is a long text that will float into adjacent empty cells";
    
    // Floating happens automatically if adjacent cells (B1, C1, D1...) are empty
}
```

---

## References
- [Floating Cells Documentation](https://help.syncfusion.com/wpf/spreadsheet/floating-cells)

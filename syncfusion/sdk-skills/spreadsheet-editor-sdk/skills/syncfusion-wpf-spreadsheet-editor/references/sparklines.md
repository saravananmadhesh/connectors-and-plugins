# Sparklines

> Import excel file which contanins sparklines and display sparklines in WPF Spreadsheet control.

---

## Overview

Supports adding sparklines—miniature charts within cells—to visualize trends in a compact form.

---

## Key Features
- Line, column, and win/loss sparklines
- Excel-compatible import
- Visualize trends within a single cell

---

## Example

Insert sparklines to show trends for a data range in a single cell.

```csharp

// Namespaces
using Syncfusion.UI.Xaml.SpreadsheetHelper;
using Syncfusion.UI.Xaml.Spreadsheet.GraphicCells;

public MainWindow()
{
    InitializeComponent();

    // Register sparkline renderer 
    this.spreadsheet.AddSparklineCellRenderer(new SparklineCellRenderer());
}
```

---

## References
- [Sparklines Documentation](https://help.syncfusion.com/wpf/spreadsheet/sparklines)

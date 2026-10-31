# Cell Comments

> Add comments to cells for additional information in WPF Spreadsheet control. Also Customize the cell and tab item context menu.

---

## Overview

Allows users to insert, edit, and view comments in cells, providing context or explanations for cell values.

---

## Key Features
- Add, edit, and delete comments
- Display comments on hover or click
- Useful for collaboration and documentation

---

## Example

Right-click a cell and select 'Insert Comment' to add a note. Hover over the cell to view the comment.

## Cell Comments

```csharp
// To enable the comment in SfSpreadsheet
spreadsheet.ActiveGrid.ShowComment = true;

// To set the comments for particular cell
spreadsheet.ActiveSheet.Range["E5"].AddComment().Text = "Sample Comment";
spreadsheet.ActiveGrid.InvalidateCell(5, 5);
```

## Context menu

### TabItem Context menu

```csharp
// To disable the TabItem context menu in the spreadsheet
spreadsheet.AllowTabItemContextMenu = false;
```
### Customize TabItem Context menu
```csharp
// To Customize the TabItem Context menu in the spreadsheet
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
spreadsheet.IsCustomTabItemContextMenuEnabled = true;
spreadsheet.TabItemContextMenu = CustomTabItemContextMenu();
}

//Custom TabItem ContextMenus

public ContextMenu CustomTabItemContextMenu()
{
    var contextMenu = new System.Windows.Controls.ContextMenu();

    var insertRow = new System.Windows.Controls.MenuItem() { Header = "InsertRow" };

    var deleteRow = new System.Windows.Controls.MenuItem() { Header = "DeleteRow" };

    contextMenu.Items.Add(insertRow);
    contextMenu.Items.Add(deleteRow);
    return contextMenu;
}
```

### Cell Context menu

```csharp
// To disable the Cell Context menu in the spreadsheet
spreadsheet.AllowCellContextMenu = false;
```
### Customize Cell Context menu
```csharp
// To Customize the Cell Context menu in the spreadsheet
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
spreadsheet.ActiveGrid.CellContextMenuOpening += ActiveGrid_CellContextMenuOpening;
}

void ActiveGrid_CellContextMenuOpening(object sender, CellContextMenuOpeningEventArgs e)
{
    //Adding Customized Menu item
    var PasteSpecial = new ToolStripMenuItem(){ BackColor = Color.White, Name = "PasteSpecial"};
    PasteSpecial.Text = "PasteSpecial";
    Image paste = new Image() { Source = new BitmapImage(new Uri(@"..\..\Icon\paste.png", UriKind.Relative)) };
    PasteSpecial.Image = paste;
    PasteSpecial.Click += PasteSpecial_Click;
    spreadsheet.ActiveGrid.CellContextMenu.Items.Add(PasteSpecial);
       
    //Remove the existing Context menu
    spreadsheet.ActiveGrid.CellContextMenu.Items.RemoveAt(2);
}
```

---

## References
- [Cell Comments Documentation](https://help.syncfusion.com/wpf/spreadsheet/cell-comments)

# Table Support

## Table of Contents
- [Inserting Tables](#inserting-tables)
- [Table Quick Toolbar](#table-quick-toolbar)
- [Cell Properties and Styling](#cell-properties-and-styling)
- [Merging and Splitting Cells](#merging-and-splitting-cells)
- [Nesting Tables](#nesting-tables)
- [Table Selection and Copy/Paste](#table-selection-and-copypaste)

---

## Inserting Tables

Add `CreateTable` to the toolbar items to enable table insertion:

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] { "CreateTable", "Bold", "Italic", "Undo", "Redo" };
```

**How users insert tables:**
- **Grid picker** — hover over the grid in the toolbar dropdown to select row/column count
- **Insert Table dialog** — enter rows and columns manually (default on mobile/touch devices)

**Quick insert shortcuts (no toolbar needed):**
- Hover over a **first-row cell** → a dot (●) appears at the top → hover for a + icon → click to add a column
- Hover over a **first-column cell** → a dot (●) appears on the left → hover for a + icon → click to add a row

---

## Table Quick Toolbar

Configure the quick toolbar that appears when the user clicks inside a table:

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
    <e-richtexteditor-quicktoolbarsettings table="@ViewBag.tableTools">
    </e-richtexteditor-quicktoolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] { "CreateTable" };
ViewBag.tableTools = new[] {
    "TableHeader", "TableRows", "TableColumns", "TableCell", "-",
    "BackgroundColor", "TableRemove",
    "TableCellVerticalAlign", "Styles", "TableCellProperties"
};
```

**Quick toolbar item descriptions:**

| Item | Action |
|------|--------|
| `TableHeader` | Toggle header row on/off |
| `TableRows` | Insert row above/below, delete row |
| `TableColumns` | Insert column left/right, delete column |
| `TableCell` | Merge or split cells |
| `BackgroundColor` | Apply background color to selected cells |
| `TableRemove` | Delete the entire table |
| `TableCellVerticalAlign` | Align cell content top/middle/bottom |
| `TableCellHorizontalAlign` | Align cell content left/center/right/justify |
| `Styles` | Apply predefined table styles (Dashed border, Alternate rows) |
| `TableCellProperties` | Open cell properties dialog (dimensions, borders, padding) |

---

## Cell Properties and Styling

### Opening Cell Properties Dialog

Add `TableCellProperties` to the table quick toolbar. This opens a dialog with options for:
- **Width/Height** — set in px, %, or auto
- **Cell padding** — internal spacing
- **Horizontal alignment** — left, center, right, justify
- **Vertical alignment** — top, middle, bottom
- **Border style/width/color** — custom cell borders
- **Background color** — individual cell color

All changes show a **live preview** in the editor before applying.

```csharp
ViewBag.tableTools = new[] { "TableCellProperties" };
```

### Applying Background Color

Use `BackgroundColor` in the table quick toolbar to highlight cells. Select one or more cells and pick a color.

### Table Styles

`Styles` in the quick toolbar applies CSS class-based presets:
- **Dashed border** — replaces solid borders with dashed
- **Alternate rows** — alternating row background colors

### Setting Default Table Width

Configure the default width of newly inserted tables:

```razor
<ejs-richtexteditor id="editor">
    <e-richtexteditor-tablesettings width="100%"></e-richtexteditor-tablesettings>
</ejs-richtexteditor>
```

---

## Merging and Splitting Cells

Add `TableCell` to the table quick toolbar to access merge/split options.

- **Merge** — select multiple cells (click and drag or Shift+Arrow), then choose "Merge Cells"
- **Split horizontal** — splits a cell into two columns
- **Split vertical** — splits a cell into two rows

```csharp
ViewBag.tableTools = new[] {
    "TableHeader", "TableRows", "TableColumns", "TableCell",
    "-", "BackgroundColor", "TableRemove"
};
```

---

## Nesting Tables

Users can insert a table inside an existing table cell using the `CreateTable` toolbar item while the cursor is placed inside a cell.

Pre-populating nested table content programmatically:

```csharp
ViewBag.value = @"<table border='1' style='width:100%;border-collapse:collapse;'>
  <tr>
    <th>Department</th>
    <th>Details</th>
  </tr>
  <tr>
    <td>Engineering</td>
    <td>
      <table border='1' style='width:100%;border-collapse:collapse;'>
        <tr><th>Name</th><th>Role</th></tr>
        <tr><td>Alice</td><td>Lead</td></tr>
      </table>
    </td>
  </tr>
</table>";
```

---

## Table Selection and Copy/Paste

### Keyboard Selection

- `Shift + Arrow keys` — extend cell selection across rows/columns
- `Ctrl + A` inside a table:
  - **1st press** — selects current cell
  - **2nd press** — selects current row
  - **3rd press** — selects entire table
  - **4th press** — selects all editor content

### Selecting Whole Rows/Columns via Mouse

- Hover over the **first column** → row selection handle appears on the left → click to select the row
- Hover over the **first row** → column selection handle appears on top → click to select the column
- Hover anywhere over the table → table selection handle appears top-left → click to select entire table

### Copy/Cut/Paste Table Content

Standard keyboard shortcuts work on selected table cells:

| Action | Windows | Mac |
|--------|---------|-----|
| Copy | `Ctrl + C` | `⌘ + C` |
| Cut | `Ctrl + X` | `⌘ + X` |
| Paste | `Ctrl + V` | `⌘ + V` |

- Table structure and formatting are preserved on paste
- Cross-table paste is supported
- Compatible with content pasted from external apps (Excel, Word)

### Delete Key Shortcuts

- Press `Backspace` **immediately before** a table → selects the entire table
- Press `Delete` **immediately after** a table → selects the entire table

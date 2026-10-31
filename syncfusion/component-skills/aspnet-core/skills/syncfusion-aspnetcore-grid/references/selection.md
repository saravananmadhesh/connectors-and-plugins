# Selection — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Row Selection](#row-selection)
- [Multi-Row Selection](#multi-row-selection)
- [Cell Selection](#cell-selection)
- [Column Selection](#column-selection)
- [Checkbox Selection](#checkbox-selection)
- [Selection Mode and Type](#selection-mode-and-type)
- [Programmatic Selection](#programmatic-selection)
- [Selection Events](#selection-events)

## When to Use This

- Enable row, cell, or column selection
- Implement multi-select with checkboxes
- Handle selection events
- Support keyboard shortcuts for selection
- Implement bulk operations on selected data

---

## Overview

Selection allows users to highlight rows, cells, or columns. Configure with `<e-grid-selectionsettings>`.

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-selectionsettings mode="Row" type="Single"></e-grid-selectionsettings>
</ejs-grid>
```

---

## Row Selection

Click a row to select it. Single row selection is the default:

Select multiple rows by holding **Ctrl** and clicking, or **Shift** for a range.

---

## Multi-Row Selection

Enable multi-row selection with `type="Multiple"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-selectionsettings mode="Row" type="Multiple"></e-grid-selectionsettings>
</ejs-grid>
```

---

## Cell Selection

Switch to cell-level selection with `mode="Cell"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-selectionsettings mode="Cell" type="Multiple" cellSelectionMode="Box"></e-grid-selectionsettings>
</ejs-grid>
```

`cellSelectionMode` options: `Flow`, `Box`, `BoxWithBorder`.

---

## Column Selection

Enable column-level selection with `allowColumnSelection="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-selectionsettings allowColumnSelection="true" mode="Cell" type="Multiple"></e-grid-selectionsettings>
</ejs-grid>
```

---

## Checkbox Selection

Add a checkbox column for selection with `type="checkbox"` on a column:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-selectionsettings type="Multiple"></e-grid-selectionsettings>
    <e-grid-columns>
        <e-grid-column type="checkbox" width="50"></e-grid-column>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

> A header checkbox selects/deselects all rows. When `type="checkbox"` is defined, `selectionSettings.type` defaults to `Multiple`.

---

## Selection Mode and Type

| Property | Values | Description |
|---|---|---|
| `mode` | `Row`, `Cell`, `Both` | What can be selected |
| `type` | `Single`, `Multiple` | How many items can be selected |
| `cellSelectionMode` | `Flow`, `Box`, `BoxWithBorder` | Cell selection shape |
| `enableToggle` | `true/false` | Click selected row again to deselect |
| `persistSelection` | `true/false` | Keep selection across pages |

---

## Programmatic Selection

Use JavaScript methods to select/deselect rows:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Select row by index
grid.selectRow(2);

// Select multiple rows
grid.selectRows([0, 2, 4]);

// Select a cell
grid.selectCell({ rowIndex: 1, cellIndex: 2 });

// Deselect all
grid.clearSelection();

// Get selected records
var selected = grid.getSelectedRecords();
```

---

## Selection Events

```javascript
function rowSelected(args) {
    console.log('Selected row data:', args.data);
}

function rowDeselected(args) {
    console.log('Deselected row index:', args.rowIndex);
}
```

Available events: `rowSelecting`, `rowSelected`, `rowDeselecting`, `rowDeselected`, `cellSelecting`, `cellSelected`.

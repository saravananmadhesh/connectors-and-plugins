# Columns — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Column Types](#column-types)
- [Column Width](#column-width)
- [Column Visibility](#column-visibility)
- [Column Format](#column-format)
- [Column Template](#column-template)
- [Column Headers and Stacked Headers](#column-headers-and-stacked-headers)
- [Column Reorder](#column-reorder)

## When to Use This

- Define and configure grid columns
- Set column widths and visibility
- Apply data formatting (numbers, dates)
- Create custom column templates
- Reorder, resize, or span columns
- [Column Resizing](#column-resizing)
- [Column Chooser](#column-chooser)
- [Column Spanning](#column-spanning)
- [Foreign Key Column](#foreign-key-column)
- [Column Rendering](#column-rendering)

---

## Column Types

Specify with `type` property on `<e-grid-column>`. Supported values: `string`, `number`, `boolean`, `date`, `datetime`, `checkbox`.

> If `type` is not defined, it is inferred from the first data record. Define `type` explicitly when the first record has null/blank values.

**Boolean vs Checkbox:**
- `boolean` — binds boolean data; renders true/false text
- `checkbox` — renders a checkbox per row; enables multi-row selection automatically

---

## Column Width

Set `width` in pixels or percentage on each `<e-grid-column>`:

```cshtml
<e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
<e-grid-column field="CustomerID" headerText="Customer" width="25%"></e-grid-column>
```

- Unspecified-width columns share remaining space equally
- If total column width > grid width, a horizontal scrollbar appears
- Minimum width defaults to 10px

---

## Column Visibility

Hide a column by setting `visible="false"`:

```cshtml
<e-grid-column field="EmployeeID" headerText="Employee ID" visible="false" width="120"></e-grid-column>
```

Toggle visibility programmatically:
```javascript
grid.columns[1].visible = false;
grid.refreshColumns();
```

---

## Column Format

Use `format` to display number and date values in a readable form:

```cshtml
<e-grid-column field="Freight" headerText="Freight" format="C2" textAlign="Right" width="120"></e-grid-column>
<e-grid-column field="OrderDate" headerText="Order Date" format="yMd" width="150"></e-grid-column>
```

Common formats: `C2` (currency), `N2` (number), `P2` (percent), `yMd` (short date), `yMMMd` (medium date).

---

## Column Template

Use `<ng-template>` / `template` to render custom HTML in cells:

---

## Column Headers and Stacked Headers

Change header text with `headerText`. Create multi-level stacked headers using `<e-grid-column>` nesting:

---

## Column Reorder

Enable drag-and-drop column reordering with `allowReordering="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowReordering="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Column Resizing

Enable column width resizing by dragging header borders with `allowResizing="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowResizing="true">
```

Set `minWidth` and `maxWidth` per column to limit resize range:
```cshtml
<e-grid-column field="OrderID" minWidth="100" maxWidth="300" width="150"></e-grid-column>
```

---

## Column Chooser

Let users show/hide columns via a popup with `showColumnChooser="true"` and toolbar item `ColumnChooser`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          showColumnChooser="true"
          toolbar="@(new List<string>() { "ColumnChooser" })">
```

---

## Column Spanning

Span a column across multiple columns using `colspan` in `queryCellInfo` or header spans:

---

## Foreign Key Column

Display values from a related/foreign data source using `dataSource`, `foreignKeyField`, and `foreignKeyValue`:


Key properties:
- `dataSource` — the foreign data collection
- `foreignKeyField` — key field in the foreign data
- `foreignKeyValue` — display field from the foreign data

---

## Column Rendering

Control how columns are rendered with:
- `isPrimaryKey` — marks the primary key column (required for editing)
- `isIdentity` — marks auto-increment columns (read-only in edit)
- `allowEditing` — allow/prevent editing per column
- `allowFiltering` — enable/disable filter per column
- `allowSorting` — enable/disable sort per column
- `clipMode` — `Clip`, `Ellipsis`, `EllipsisWithTooltip` for overflow text

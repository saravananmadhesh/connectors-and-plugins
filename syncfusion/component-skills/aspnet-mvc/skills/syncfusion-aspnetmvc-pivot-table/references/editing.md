# Editing in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Editing](#enable-editing)
- [Normal Editing](#normal-editing)
- [Dialog Editing](#dialog-editing)
- [Batch Editing](#batch-editing)
- [Command Column Editing](#command-column-editing)
- [Inline Editing](#inline-editing)
- [Best Practices](#best-practices)

## Overview

Editing allows users to modify underlying raw data items for any value cell. When you double-click a value cell, a data grid opens with the raw items, where you can perform CRUD operations (Create, Read, Update, Delete). After editing, the pivot table automatically recalculates and updates aggregated values.

**Key Features:**
- Edit raw data items behind aggregated values
- Add new records directly to the pivot table
- Delete records with confirmation dialogs
- Multiple editing modes: Normal, Dialog, Batch, Command Columns
- Supports inline editing for single-item cells
- Automatic pivot table recalculation after changes

**Important:** Editing is applicable **only for relational data sources**, not OLAP data.

## Enable Editing

To enable editing, configure the `EditSettings` property in `PivotViewCellEditSettings`:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => {
        rows.Name("Country").Add();
    })
    .Columns(columns => {
        columns.Name("Year").Add();
    })
    .Values(values => {
        values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
    })).EditSettings(editSettings => editSettings.AllowEditing(true).AllowAdding(true).AllowDeleting(true).Mode(Syncfusion.EJ2.PivotView.EditMode.Normal)).Height("450").Width("100%").Render()
```

**Key Properties in EditSettings:**
- **AllowEditing(true)**: Double-click value cells to edit underlying raw data
- **AllowAdding(true)**: Show "Add" button to insert new records
- **AllowDeleting(true)**: Show "Delete" button and delete confirmation dialog
- **AllowCommandColumns(true)**: Display edit, delete, save, cancel buttons in column
- **Mode()**: Sets editing interface - Normal, Dialog, Batch, or default
- **ShowConfirmDialog(true)**: Show confirmation before saving changes
- **ShowDeleteConfirmDialog(true)**: Show confirmation before deleting records
- **AllowInlineEditing(true)**: Edit single-item cells directly without data grid

## Normal Editing

In Normal mode, users double-click a value cell and the underlying data grid opens. Users edit one row/record at a time and click **Update** to save changes. Mode defaults to Normal if not specified.

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => {
        rows.Name("Country").Add();
        rows.Name("Products").Add();
    })
    .Columns(columns => {
        columns.Name("Year").Add();
    })
    .Values(values => {
        values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        values.Name("Quantity").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
    })).EditSettings(editSettings => editSettings.AllowEditing(true).AllowAdding(true).AllowDeleting(true).Mode(Syncfusion.EJ2.PivotView.EditMode.Normal)).Height("450").Width("100%").Render()
```

**Workflow:**
1. Double-click any value cell
2. Data grid opens with raw items for that cell's context
3. Double-click grid cells to edit values or use toolbar Add/Edit buttons
4. Click **Update** button to save all changes
5. Pivot table recalculates automatically

## Dialog Editing

Dialog mode displays the selected row in a dedicated dialog window for focused editing with improved visibility. Set `Mode` to `Syncfusion.EJ2.PivotView.EditMode.Dialog`.

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => {
        rows.Name("Country").Add();
        rows.Name("Products").Add();
    })
    .Columns(columns => {
        columns.Name("Year").Add();
    })
    .Values(values => {
        values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
    })).EditSettings(editSettings => editSettings.AllowEditing(true).AllowAdding(true).AllowDeleting(true).Mode(Syncfusion.EJ2.PivotView.EditMode.Dialog)).Height("450").Width("100%").Render()
```

**Workflow:**
1. Double-click any value cell
2. Data grid opens in a separate window
3. Select a row and click Edit button (or double-click) → Dialog form opens
4. Edit form displays all fields for that record
5. Click **Save** to commit changes
6. Pivot table updates automatically

## Batch Editing

Batch mode allows users to make multiple edits in the data grid and save all changes at once. Set `Mode` to `Syncfusion.EJ2.PivotView.EditMode.Batch`.

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => {
        rows.Name("Country").Add();
        rows.Name("Products").Add();
    })
    .Columns(columns => {
        columns.Name("Year").Add();
    })
    .Values(values => {
        values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
    })).EditSettings(editSettings => editSettings
    .AllowEditing(true)
    .AllowAdding(true)
    .AllowDeleting(true)
    .Mode(Syncfusion.EJ2.PivotView.EditMode.Batch)).Height("450").Width("100%").Render()
```

**Workflow:**
1. Double-click any value cell → Data grid opens
2. Double-click individual grid cells to edit or add new rows
3. Make multiple edits/additions/deletions as needed
4. Click **Update** button to save ALL changes at once
5. Pivot table recalculates with all modifications

**Use Case:** Efficient for bulk updates and corrections when multiple cells need changes.

## Command Column Editing

Command column displays dedicated action buttons (Edit, Delete, Save, Cancel) in the last column of the data grid, eliminating toolbar buttons for streamlined interface. Set `AllowCommandColumns(true)`.

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => {
        rows.Name("Country").Add();
        rows.Name("Products").Add();
    })
    .Columns(columns => {
        columns.Name("Year").Add();
    })
    .Values(values => {
        values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
    })).EditSettings(editSettings => editSettings
    .AllowEditing(true)
    .AllowAdding(true)
    .AllowDeleting(true)
    .AllowCommandColumns(true)).Height("450").Width("100%").Render()
```

**Command Buttons:**
| Button | Action |
|--------|--------|
| **Edit** | Click to edit the row |
| **Delete** | Click to delete the row (shows confirmation) |
| **Save** | Click save after editing |
| **Cancel** | Click to discard changes |

**Key Difference:** When command columns are enabled, the toolbar Edit/Delete/Save/Cancel buttons are hidden. All actions happen via the command column buttons in each row.

## Inline Editing

Inline editing allows direct modification of value cells without opening a data grid dialog. Only available when a single raw data item matches the cell's context. Set `AllowInlineEditing(true)`.

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => {
        rows.Name("Country").Add();
    })
    .Columns(columns => {
        columns.Name("Year").Add();
    })
    .Values(values => {
        values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
    })).EditSettings(editSettings => editSettings.AllowEditing(true).AllowInlineEditing(true)).Height("450").Width("100%").Render()
```

**Behavior:**
- Works when exactly ONE raw item matches the cell context
- Double-click cell → Edit directly without data grid opening
- Press Enter to save or Escape to cancel
- Pivot table updates immediately after change

**Combined Usage:**
```html
.EditSettings(editSettings => editSettings
    .AllowEditing(true)
    .AllowAdding(true)
    .AllowDeleting(true)
    .Mode(Syncfusion.EJ2.PivotView.EditMode.Normal)
    .AllowInlineEditing(true)
    .ShowConfirmDialog(true)
    .ShowDeleteConfirmDialog(true))
```

## Best Practices

- **Relational Data Only:** Editing is not available for OLAP data sources
- **Configuration Combinations:**
  - Normal + Inline: Fallback to data grid if multiple items match
  - Batch for bulk edits: Slower data processing but efficient UI
  - Dialog for focused editing: Clear field organization and validation
  - Command columns: Mobile-friendly, no toolbar clutter
- **Confirmation Dialogs:** Enable `.ShowConfirmDialog(true)` and `.ShowDeleteConfirmDialog(true)` for critical data changes
- **Adding Records:** Set `.AllowAdding(true)` to show Add button in toolbar
- **Permission Levels:** Consider user roles - not all users should have full CRUD permissions
- **Field Visibility:** Grid shows all underlying source fields - consider which fields users need to edit
- **Recalculation Performance:** Large datasets may take time to recalculate after edits
- **Default Mode:** Normal mode is default if Mode is not specified
- **AllowCommandColumns limitation:** Cannot be combined with inline editing; choose one approach
- **Data Sync:** All changes are applied immediately upon action (Update/Save/Double-click exit)

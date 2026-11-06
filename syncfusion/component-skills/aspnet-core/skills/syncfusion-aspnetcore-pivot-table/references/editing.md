# Editing in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Cell Editing](#enable-cell-editing)
- [Normal Edit Mode](#normal-edit-mode)
- [Dialog Edit Mode](#dialog-edit-mode)
- [Batch Edit Mode](#batch-edit-mode)
- [Command Column](#command-column)
- [Inline Editing](#inline-editing)
- [Edit Settings](#edit-settings)
- [Best Practices](#best-practices)

## Overview

Edit raw data underlying pivot cells by double-clicking aggregated values. The cell editing option allows users to directly change data in the pivot table by adding, updating, or deleting raw data items. When you double-click a value cell, the raw items appear in a data grid within a new window. After editing, the pivot table automatically updates the aggregated values.

> **Note:** This feature is applicable only for relational data sources (not OLAP).

## Enable Cell Editing

Enable editing by setting `allowEditing="true"` in `<e-editSettings>`:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-editSettings allowAdding="true" allowDeleting="true" allowEditing="true" mode="Normal"></e-editSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Properties:**
- `allowEditing="true"` - Enable editing of raw data
- `allowAdding="true"` - Allow adding new rows
- `allowDeleting="true"` - Allow deleting rows
- `mode="Normal"` - Set edit mode (Normal, Dialog, or Batch)

## Normal Edit Mode

Normal edit mode (default) allows users to edit one row at a time in an editing dialog:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-editSettings allowAdding="true" allowDeleting="true" allowEditing="true" mode="Normal"></e-editSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Workflow:**
1. Double-click value cell to open editing dialog
2. Modify cell values in the dialog
3. Click "Update" button to save changes
4. Pivot table recalculates automatically

## Dialog Edit Mode

Dialog edit mode provides a focused editing environment by displaying selected row data in an exclusive dialog window:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-editSettings allowAdding="true" allowDeleting="true" allowEditing="true" mode="Dialog"></e-editSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Advantages:**
- Dedicated dialog window for clear visibility
- All fields visible and organized
- Save button in dialog (instead of toolbar)
- Better for complex data rows

## Batch Edit Mode

Batch editing enables users to make multiple changes to data grid cells and save them all at once:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-editSettings allowAdding="true" allowDeleting="true" allowEditing="true" mode="Batch"></e-editSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Workflow:**
1. Double-click cells to enter edit mode
2. Make multiple changes across rows
3. Click "Update" to save all changes at once
4. Pivot table recalculates with all updates

**Benefits:**
- Edit multiple rows efficiently
- Single save operation for all changes
- Improved performance for bulk updates

## Command Column

Command column provides dedicated action buttons within the data grid for CRUD operations:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-editSettings allowAdding="true" allowDeleting="true" allowEditing="true" allowCommandColumns="true"></e-editSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Available Command Buttons:**
- **Edit** - Edit the current row
- **Delete** - Delete the current row
- **Save** - Update the edited row
- **Cancel** - Cancel the edited state

**Important:**
- When command columns are enabled, action buttons appear in the last column of each row
- Toolbar action buttons (Edit, Delete, Update, Cancel) are not shown
- Set `allowDeleting="true"` to enable the Delete button

## Inline Editing

Inline editing allows direct editing of value cells without opening an external dialog:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-editSettings allowInlineEditing="true" allowEditing="true"></e-editSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**When to Use:**
- Single raw data item corresponds to cell value
- Quick edits without opening dialog
- Works with all edit modes (Normal, Batch, Dialog)

## Edit Settings

Comprehensive edit settings control editing behavior:

```html
<e-editSettings 
    allowAdding="true"
    allowDeleting="true"
    allowEditing="true"
    allowCommandColumns="false"
    mode="Normal"
    allowEditOnDblClick="true"
    showConfirmDialog="true"
    showDeleteConfirmDialog="true"
    allowInlineEditing="false">
</e-editSettings>
```

**Configuration Properties:**
- `allowAdding` - Enable adding new rows (true/false)
- `allowDeleting` - Enable deleting rows (true/false)
- `allowEditing` - Enable editing cells (true/false)
- `allowCommandColumns` - Show command column buttons (true/false)
- `mode` - Edit mode: Normal, Dialog, or Batch
- `allowEditOnDblClick` - Allow double-click to edit (true/false)
- `showConfirmDialog` - Show confirmation before save (true/false)
- `showDeleteConfirmDialog` - Show confirmation before delete (true/false)
- `allowInlineEditing` - Allow inline editing without dialog (true/false)

## Toolbar CRUD Buttons

When editing is enabled, toolbar displays action buttons:

| Button | Action | Mode |
|--------|--------|------|
| Add | Add new row | All modes |
| Edit | Edit selected row | Normal, Dialog |
| Delete | Delete selected row | All modes |
| Update | Save all changes | All modes |
| Cancel | Discard changes | All modes |

## Best Practices

✓ **Data Persistence:** Server must persist changes to database
✓ **Validation:** Implement server-side validation for data integrity
✓ **Normal Mode:** Use for simple row edits with few fields
✓ **Dialog Mode:** Use for complex rows with many fields
✓ **Batch Mode:** Use for bulk updates requiring multiple changes
✓ **Command Columns:** Use when space is limited in grid
✓ **Inline Editing:** Use only for single-value cells
✓ **Confirmation Dialogs:** Enable for important operations (delete, update)
✓ **Error Handling:** Catch and display server-side validation errors
✓ **Performance:** Test editing workflow with large datasets
✓ **UX:** Use clear labels and hints for better user experience
✓ **Access Control:** Implement permission checks (add, edit, delete)

❌ **Avoid:** Large numbers of fields in single row edit
❌ **Avoid:** Editing without confirmation dialogs on delete
❌ **Avoid:** No error handling or validation feedback
❌ **Avoid:** Editing without server-side persistence
❌ **Avoid:** Complex custom validation without UI feedback

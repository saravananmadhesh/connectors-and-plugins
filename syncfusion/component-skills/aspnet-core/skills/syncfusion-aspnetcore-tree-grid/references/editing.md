# Editing — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Enable Editing](#enable-editing)
- [Edit Modes](#edit-modes)
- [Toolbar with Edit Actions](#toolbar-with-edit-actions)
- [New Row Position](#new-row-position)
- [Delete Confirmation](#delete-confirmation)
- [Default Column Values on Add](#default-column-values-on-add)
- [Disable Editing Per Column](#disable-editing-per-column)
- [Validation Rules](#validation-rules)
- [Edit Types](#edit-types)
- [Template Editing](#template-editing)
- [Persisting Data to Server](#persisting-data-to-server)
- [Troubleshooting](#troubleshooting)

---

## When to Use This Skill

Use this reference when you need to:
- Enable add, edit, and delete operations on TreeGrid data
- Implement inline editing (cell, row, or batch mode)
- Use dialog-based editing for complex forms
- Configure new row position (top, bottom, child, etc.)
- Set up validation rules for edited data
- Apply default values to new rows
- Persist changes to the server
- Control which columns can be edited

---

## Enable Editing

Enable editing with `e-treegrid-editSettings`. Always define `isPrimaryKey="true"` on one column — without it, edit/delete only affects the first row.

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1">
    <e-treegrid-editSettings allowAdding="true" allowEditing="true"
                             allowDeleting="true" mode="Cell"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority"  width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Edit Modes

Set `mode` in `e-treegrid-editSettings`:

| Mode | Description |
|------|-------------|
| `Cell` | Inline cell editing — click a cell to edit |
| `Row` | Inline row editing — entire row goes into edit mode |
| `Dialog` | Opens a dialog for editing |
| `Batch` | Edit multiple cells; commit all at once |

**Row edit mode:**
```cshtml
<e-treegrid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Row"></e-treegrid-editSettings>
```

**Dialog edit mode:**
```cshtml
<e-treegrid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Dialog"></e-treegrid-editSettings>
```

**Batch edit mode:**
```cshtml
<e-treegrid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Batch"></e-treegrid-editSettings>
```

---

## Toolbar with Edit Actions

Add built-in toolbar items for CRUD operations:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1"
              toolbar="@(new List<string>() {"Add","Edit","Delete","Update","Cancel"})">
    <e-treegrid-editSettings allowAdding="true" allowEditing="true"
                             allowDeleting="true" mode="Row"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

Available built-in items: `Add`, `Edit`, `Delete`, `Update`, `Cancel`, `Search`, `ExpandAll`, `CollapseAll`, `ExcelExport`, `PdfExport`, `CsvExport`, `Print`, `Indent`, `Outdent`

---

## New Row Position

Control where a new row is inserted using `newRowPosition`:

| Value | Behavior |
|-------|----------|
| `Top` | Default. New row added at the top |
| `Bottom` | New row added at the bottom |
| `Above` | New row added above the selected row |
| `Below` | New row added below the selected row |
| `Child` | New row added as a child of the selected row |

```cshtml
<e-treegrid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true"
                         mode="Row" newRowPosition="Child"></e-treegrid-editSettings>
```

---

## Delete Confirmation

Show a confirmation dialog before deleting a record:

```cshtml
<e-treegrid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true"
                         mode="Row" showDeleteConfirmDialog="true"></e-treegrid-editSettings>
```

This works with all edit modes.

---

## Default Column Values on Add

Pre-populate column values when a new row is added:

```cshtml
<e-treegrid-columns>
    <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
    <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
    <e-treegrid-column field="Priority" headerText="Priority"  defaultValue="Normal" width="120"></e-treegrid-column>
    <e-treegrid-column field="Duration" headerText="Duration"  defaultValue="1" textAlign="Right" width="110"></e-treegrid-column>
</e-treegrid-columns>
```

---

## Disable Editing Per Column

Prevent editing for a specific column with `allowEditing="false"`:

```cshtml
<e-treegrid-column field="StartDate" headerText="Start Date" allowEditing="false"
                   format="yMd" type="date" textAlign="Right" width="120"></e-treegrid-column>
```

---

## Validation Rules

Define validation on columns to enforce data integrity:

```cshtml
<e-treegrid-columns>
    <e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="90">
        <e-treegrid-column-validationrules required="true"></e-treegrid-column-validationrules>
    </e-treegrid-column>
    <e-treegrid-column field="TaskName" headerText="Task Name" width="180">
        <e-treegrid-column-validationrules required="true" minlength="3"></e-treegrid-column-validationrules>
    </e-treegrid-column>
    <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110">
        <e-treegrid-column-validationrules min="0" max="100"></e-treegrid-column-validationrules>
    </e-treegrid-column>
</e-treegrid-columns>
```

---

## Edit Types

Customize the editor used per column with `editType`:

| editType | Editor |
|----------|--------|
| `numericedit` | Numeric text box |
| `datepickeredit` | Date picker |
| `datetimepickeredit` | DateTime picker |
| `dropdownedit` | Dropdown list |
| `booleanedit` | Checkbox |
| `defaultedit` | Default text box (default) |

```cshtml
<e-treegrid-column field="Priority" headerText="Priority" editType="dropdownedit" width="120">
    <e-treegrid-column-edit-params>
        <e-params dataSource="@priorityData" fields="@fieldParams" value="Normal"></e-params>
    </e-treegrid-column-edit-params>
</e-treegrid-column>
```

---

## Template Editing

Provide a custom edit template for a column using the `editTemplate` property in Row/Dialog modes:

```cshtml
<e-treegrid-column field="Priority" headerText="Priority" width="120"
                   editType="dropdownedit">
</e-treegrid-column>
```

For Dialog mode, you can also provide a complete dialog template via `e-treegrid-editsettings-template`.

---

## Persisting Data to Server

To persist CRUD changes server-side, handle the `actionComplete` event and call your API:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" actionComplete="onActionComplete"
              toolbar="@(new List<string>() {"Add","Edit","Delete","Update","Cancel"})">
    <e-treegrid-editSettings allowAdding="true" allowEditing="true"
                             allowDeleting="true" mode="Row"></e-treegrid-editSettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onActionComplete(args) {
        if (args.requestType === 'save' || args.requestType === 'delete') {
            fetch('/api/treegrid/update', {
                method: 'POST'
            });
        }
    }
</script>
```

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Edit/Delete only works for first row | `isPrimaryKey` not set | Set `isPrimaryKey="true"` on one column |
| Frozen rows + cell editing | Not compatible | Do not use `frozenRows`/`frozenColumns` with cell editing |
| Row template + editing | Not compatible | Do not use `rowTemplate` with editing |

# Editing in ASP.NET MVC Grid

Enable CRUD operations using `EditSettings`. Requires a primary key column (`IsPrimaryKey(true)`).

## When to Use This

Use this reference when you need to:
- Enable inline, dialog, or batch editing modes
- Configure column-level edit types and validation
- Handle server-side data persistence
- Manage command columns for edit/delete operations
- Implement custom cell templates for editing
- Control editing based on row conditions

## Table of Contents
- [Enable Editing](#enable-editing)
- [Edit Modes](#edit-modes)
- [Normal (Inline) Editing](#normal-inline-editing)
- [Dialog Editing](#dialog-editing)
- [Batch Editing](#batch-editing)
- [Disable Editing for Specific Columns](#disable-editing-for-specific-columns)
- [Cancel Edit Based on Condition](#cancel-edit-based-on-condition)
- [Edit Types](#edit-types)
- [Custom Cell Edit Template](#custom-cell-edit-template)
- [Validation](#validation)
- [Persisting Data on the Server](#persisting-data-on-the-server)
- [Command Column](#command-column)
- [External CRUD (Programmatic)](#external-crud-programmatic)
- [Delete Confirmation Dialog](#delete-confirmation-dialog)
- [Edit Template Column](#edit-template-column)
- [Update Boolean Column with Single Click](#update-boolean-column-with-single-click)

## Enable Editing

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
    })
    .EditSettings(edit => edit.AllowAdding(true).AllowEditing(true).AllowDeleting(true).Mode(Syncfusion.EJ2.Grids.EditMode.Normal))
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel" })
    .Render()
```

## Edit Modes

| Mode | Description |
|------|-------------|
| `Normal` (default) | Inline row editing — selected row enters edit state |
| `Dialog` | Opens a dialog window with all editable fields |
| `Batch` | Edit multiple cells; save all at once with `batchSave()` |

## Normal (Inline) Editing

```cshtml
.EditSettings(edit => edit.AllowAdding(true).AllowEditing(true).AllowDeleting(true).Mode(Syncfusion.EJ2.Grids.EditMode.Normal))
```

- Double-click a row or click **Edit** toolbar button to start editing
- Press **Enter** or click **Update** to save; **Escape** or **Cancel** to discard
- Add new row at bottom: `.EditSettings(edit => edit.NewRowPosition(Syncfusion.EJ2.Grids.NewRowPosition.Bottom))`
- Show persistent add-row form: `.EditSettings(edit => edit.ShowAddNewRow(true))`

## Dialog Editing

```cshtml
.EditSettings(edit => edit.AllowAdding(true).AllowEditing(true).AllowDeleting(true).Mode(Syncfusion.EJ2.Grids.EditMode.Dialog))
```

Customize the dialog using `ActionComplete` event:
```javascript
function actionComplete(args) {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        args.dialog.header = args.requestType === 'add' ? 'New Order' : 'Edit Order ' + args.rowData['OrderID'];
    }
}
```

Show/hide columns in dialog:
```javascript
function actionBegin(args) {
    if (args.requestType === 'beginEdit') {
        var grid = document.getElementById('Grid').ej2_instances[0];
        grid.getColumnByField('CustomerID').visible = true;
        grid.getColumnByField('ShipCountry').visible = false;
    }
}
```

Wizard-style dialog: use `EditSettings.Template` to define multi-step form in dialog mode.

## Batch Editing

```cshtml
.EditSettings(edit => edit.AllowAdding(true).AllowEditing(true).AllowDeleting(true).Mode(Syncfusion.EJ2.Grids.EditMode.Batch))
```

- Double-click a cell to edit; **TAB** to move to next cell
- **Update** toolbar saves all pending changes via `batchSave()`
- Show confirmation before saving: `.EditSettings(edit => edit.ShowConfirmDialog(true))`
- Update a cell programmatically: `grid.updateCell(rowIndex, 'FieldName', value)`

## Disable Editing for Specific Columns

```cshtml
col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).AllowEditing(false).Add();
```

> Columns with `IsPrimaryKey(true)` are automatically read-only in edit mode.
> Columns with `IsIdentity(true)` are read-only in both add and edit modes.

## Cancel Edit Based on Condition

```javascript
function actionBegin(args) {
    if (args.requestType === 'beginEdit' && args.rowData['Role'] === 'Admin') {
        args.cancel = true; // prevent editing Admin rows
    }
    if (args.requestType === 'delete' && args.data[0]['Role'] === 'Admin') {
        args.cancel = true; // prevent deleting Admin rows
    }
}
```

For batch mode, use `CellEdit`, `BeforeBatchAdd`, `BeforeBatchDelete` events.

## Edit Types

Configure the editor control per column using `EditType` and `Edit`:

```cshtml
col.Field("Freight").EditType("numericedit").Edit(new { @params = new { decimals = 2, format = "N2" } }).Add();
col.Field("OrderDate").EditType("datepickeredit").Edit(new { @params = new { format = "dd/MM/yyyy" } }).Add();
col.Field("Verified").EditType("booleanedit").Add();
col.Field("ShipCountry").EditType("dropdownedit").Edit(new { @params = new { dataSource = countries } }).Add();
```

| EditType | Component |
|----------|-----------|
| `stringedit` | TextBox |
| `numericedit` | NumericTextBox |
| `dropdownedit` | DropDownList |
| `booleanedit` | CheckBox |
| `datepickeredit` | DatePicker |
| `datetimepickeredit` | DateTimePicker |
| `timepickeredit` | TimePicker |

## Custom Cell Edit Template

Use a custom template for a column editor:

```cshtml
col.Field("ShipCountry").HeaderText("Ship Country")
   .Edit(new {
       create = "createFn", read = "readFn",
       destroy = "destroyFn", write = "writeFn"
   }).Add();
```

```javascript
var elem;
function createFn() { elem = document.createElement('input'); return elem; }
function writeFn(args) {
    var dropdown = new ej.dropdowns.DropDownList({
        dataSource: countries, fields: { text: 'text', value: 'value' },
        value: args.rowData[args.column.field]
    });
    dropdown.appendTo(elem);
}
function readFn() { return elem.ej2_instances[0].value; }
function destroyFn() { elem.ej2_instances[0].destroy(); }
```

## Validation

Add validation rules to columns:

```cshtml
col.Field("CustomerID")
   .ValidationRules(new { required = true, minLength = 5 }).Add();
col.Field("Freight")
   .ValidationRules(new { required = true, min = 0, max = 1000 }).Add();
```

Custom validation:
```javascript
function customValidator(args) {
    return args['value'].length >= 3; // must be at least 3 chars
}
col.ValidationRules(new { custom = new { validationFn = "customValidator", message = "Min 3 chars required" } })
```

## Persisting Data on the Server

**Controller actions:**
```csharp
public ActionResult Insert(OrdersDetails value) {
    OrdersDetails.GetAllRecords().Insert(0, value);
    return Json(value);
}
public ActionResult Update(OrdersDetails value) {
    var data = OrdersDetails.GetAllRecords().FirstOrDefault(o => o.OrderID == value.OrderID);
    if (data != null) { data.CustomerID = value.CustomerID; data.Freight = value.Freight; }
    return Json(value);
}
public ActionResult Delete(int key) {
    OrdersDetails.GetAllRecords().Remove(OrdersDetails.GetAllRecords().FirstOrDefault(o => o.OrderID == key));
    return Json(key);
}
```

Configure URL adaptors in the grid:
```cshtml
@Html.EJS().Grid("Grid")
    .DataSource(ds => ds
        .Url("/Home/DataSource").InsertUrl("/Home/Insert")
        .UpdateUrl("/Home/Update").RemoveUrl("/Home/Delete")
        .Adaptor("UrlAdaptor"))
    .EditSettings(edit => edit.AllowAdding(true).AllowEditing(true).AllowDeleting(true))
    .Render()
```

## Command Column

Add edit/delete/save/cancel buttons directly in a column:

```cshtml
col.HeaderText("Operations").Commands(cmd => {
    cmd.ButtonOption(btn => btn.Content("Edit").CssClass("e-flat")).Type("Edit").Add();
    cmd.ButtonOption(btn => btn.Content("Delete").CssClass("e-flat")).Type("Delete").Add();
    cmd.ButtonOption(btn => btn.Content("Save").CssClass("e-flat")).Type("Save").Add();
    cmd.ButtonOption(btn => btn.Content("Cancel").CssClass("e-flat")).Type("Cancel").Add();
}).Add();
```

## External CRUD (Programmatic)

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.addRecord();           // open add form
grid.startEdit();           // edit selected row
grid.deleteRecord();        // delete selected row
grid.endEdit();             // save current edit
grid.closeEdit();           // cancel current edit
grid.updateRow(2, newData); // update row at index 2
grid.setCellValue(10248, 'CustomerID', 'HANAR'); // update single cell value
```

## Delete Confirmation Dialog

```cshtml
.EditSettings(edit => edit.ShowDeleteConfirmDialog(true))
```

## Edit Template Column

When a column uses a `Template`, define the `Field` property so the edited value can be saved:

```cshtml
col.Field("ShipCountry").Template("#countryTemplate").Width("150").Add();
```

## Update Boolean Column with Single Click

Render a `CheckBox` component in a column template and handle `change` event to call `updateRow`:

```javascript
function checkboxChange(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    var rowIndex = grid.getRowIndexByPrimaryKey(args.data.OrderID);
    grid.updateRow(rowIndex, args.data);
}
```

## Show Delete Confirmation Dialog

```cshtml
.EditSettings(edit => edit.AllowDeleting(true).ShowDeleteConfirmDialog(true))
```

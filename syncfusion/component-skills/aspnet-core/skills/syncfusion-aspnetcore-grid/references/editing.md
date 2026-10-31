# Editing in ASP.NET Core Grid

## Table of Contents
- [Rules](#rules)
- [Overview](#overview)
- [Enable Editing](#enable-editing)
- [Toolbar with Edit Actions](#toolbar-with-edit-actions)
- [Edit Modes](#edit-modes)
- [Edit Types](#edit-types)
- [Command Column Editing](#command-column-editing)
- [Template Editing](#template-editing)
- [Server-Side Persistence](#server-side-persistence)

## Rules

> ⚠️ Do not use `allowEditing` directly on `<ejs-grid>`. Use `<e-grid-editSettings>` child element instead.

## When to Use This

- Enable inline, dialog, or batch editing
- Implement add, edit, and delete functionality
- Create CRUD operations within the grid
- Add edit toolbars and command columns
- Persist changes to the server

## Overview

Editing enables users to create, update, and delete records directly in the grid with multiple edit modes and validation support.

## Enable Editing

Configure `<e-grid-editSettings>` with `allowAdding`, `allowEditing`, `allowDeleting`. Set `isPrimaryKey="true"` on the key column:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" >
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" editType="numericedit" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

> Double-click a row to start editing, or use toolbar buttons. Press **Insert** to add, **Delete** to remove selected row.

## Toolbar with Edit Actions

Add edit-related toolbar items:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" editType="numericedit" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

## Edit Modes

### Inline (Normal) Mode

The selected row switches to an editable state in place. This is the **default** mode:

```cshtml
<e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Normal"></e-grid-editSettings>
```

### Dialog Mode

Opens a dialog popup for editing the selected record:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Dialog"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" editType="numericedit" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Batch Mode

Edit multiple cells across rows simultaneously; commit all changes with a single Save:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Batch"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" editType="numericedit" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

## Edit Types

Specify the input control used when editing a column with `editType`:

| `editType` | Control | Use for |
|---|---|---|
| `stringedit` | TextBox | String/text fields |
| `numericedit` | NumericTextBox | Number fields |
| `datepickeredit` | DatePicker | Date fields |
| `datetimepickeredit` | DateTimePicker | DateTime fields |
| `dropdownedit` | DropDownList | Enum/select fields |
| `booleanedit` | CheckBox | Boolean fields |
| `timepickeredit` | TimePicker | Time fields |

```cshtml
<e-grid-column field="CustomerName" headerText="Customer Name" editType="stringedit"></e-grid-column>
<e-grid-column field="Freight" headerText="Freight" editType="numericedit"></e-grid-column>
<e-grid-column field="ShipCountry" headerText="Ship Country" editType="dropdownedit"></e-grid-column>
<e-grid-column field="OrderDate" headerText="Order Date" editType="datepickeredit"></e-grid-column>
<e-grid-column field="OrderTime" headerText="Order Time" editType="datetimepickeredit"></e-grid-column>
<e-grid-column field="Verified" headerText="Verified" editType="booleanedit"></e-grid-column>
```

## Command Column Editing

Add per-row Edit/Delete/Save/Cancel buttons using a command column:

```cshtml
<e-grid-column headerText="Actions" width="150">
    <e-commands>
        <e-command type="Edit" buttonOption="@(new CommandButtonOptions() { iconCss = "e-icons e-edit", cssClass = "e-flat" })"></e-command>
        <e-command type="Delete" buttonOption="@(new CommandButtonOptions() { iconCss = "e-icons e-delete", cssClass = "e-flat" })"></e-command>
        <e-command type="Save" buttonOption="@(new CommandButtonOptions() { iconCss = "e-icons e-update", cssClass = "e-flat" })"></e-command>
        <e-command type="Cancel" buttonOption="@(new CommandButtonOptions() { iconCss = "e-icons e-cancel-icon", cssClass = "e-flat" })"></e-command>
    </e-commands>
</e-grid-column>
```

## Template Editing

Use a custom template for the edit form in Dialog mode:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true" 
          toolbar="@(new List<string>() {"Add","Edit","Delete","Update","Cancel"})">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" 
                        mode="Dialog" template="#dialogtemplate"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="ShipCountry" headerText="Ship Country" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script id="dialogtemplate" type="text/x-template">
    <div id="dialogTemp">
        <div class="form-group">
            <label for="OrderID">Order ID</label>
            <input id="OrderID" name="OrderID" type="text" disabled />
        </div>
        <div class="form-group">
            <label for="CustomerID">Customer ID</label>
            <input id="CustomerID" name="CustomerID" type="text" />
        </div>
        <div class="form-group">
            <label for="ShipCountry">Ship Country</label>
            <input id="ShipCountry" name="ShipCountry" type="text" />
        </div>
    </div>
</script>
```

## Server-Side Persistence

Handle CRUD operations server-side using action methods. The grid automatically posts data on Add, Edit, Delete:

```csharp
[HttpPost]
public ActionResult Insert([FromBody] OrdersDetails value) 
{
    OrdersDetails.GetAllRecords().Insert(0, value);
    return Json(value);
}

[HttpPost]
public ActionResult Update([FromBody] OrdersDetails value) 
{
    var data = OrdersDetails.GetAllRecords().FirstOrDefault(o => o.OrderID == value.OrderID);
    if (data != null) 
    { 
        data.CustomerID = value.CustomerID; 
        data.Freight = value.Freight; 
    }
    return Json(value);
}

[HttpPost]
public ActionResult Delete(int key) 
{
    OrdersDetails.GetAllRecords().Remove(
        OrdersDetails.GetAllRecords().FirstOrDefault(o => o.OrderID == key)
    );
    return Json(key);
}
```

Configure the grid to use these endpoints:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })"
          beforeBatchDelete="beforeBatchDelete"
          actionBegin="onActionBegin"
          actionComplete="onActionComplete">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Normal"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" editType="numericedit" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
    function onActionComplete(args) {
        if (args.requestType === 'save' || args.requestType === 'delete') {
            alert('Data saved successfully');
        }
    }
</script>
```

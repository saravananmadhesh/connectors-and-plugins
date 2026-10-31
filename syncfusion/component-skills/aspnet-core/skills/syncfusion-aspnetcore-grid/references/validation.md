# Validation in ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Built-in Validators](#built-in-validators)
- [Edit Types with Validation](#built-in-validators)
- [Custom Validation](#custom-validation)
- [Dynamic Validation Rules](#dynamic-validation-rules)
- [Server-Side Validation](#server-side-validation)

## When to Use This

- Validate user input during editing
- Apply built-in validation rules
- Create custom validation logic
- Implement dynamic validation
- Handle server-side validation

## Overview

Validation ensures data quality before saving. Define `validationRules` on columns to validate user input during editing.

## Built-in Validators

Specify validation rules using the `validationRules` property on `<e-grid-column>`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true"
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Dialog"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" 
                      validationRules="@(new { required=true })" 
                      isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" 
                      validationRules="@(new { required=true, minLength=3, maxLength=5 })" 
                      width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" editType="numericedit"
                      validationRules="@(new { required=true, min=0, max=1000 })" 
                      width="120"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" editType="datepickeredit" 
                      validationRules="@(new { required=true })" 
                      format="yMd" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Validation Rules Reference

| Rule | Data Type | Description | Example |
|------|-----------|-------------|---------|
| `required` | All | Field must have value | `required=true` |
| `minLength` | String | Min string length | `minLength=3` |
| `maxLength` | String | Max string length | `maxLength=50` |
| `min` | Number/Date | Minimum value | `min=0` |
| `max` | Number/Date | Maximum value | `max=1000` |

## Edit Types with Validation

Use appropriate `editType` with validation:

```cshtml
<!-- String with length validation -->
<e-grid-column field="CustomerName" headerText="Customer" editType="stringedit" 
              validationRules="@(new { required=true, minLength=5 })"
              width="150"></e-grid-column>

<!-- Number with range validation -->
<e-grid-column field="Quantity" headerText="Quantity" editType="numericedit" 
              validationRules="@(new { required=true, min=1, max=999 })"
              width="120"></e-grid-column>

<!-- Date with required validation -->
<e-grid-column field="ShipDate" headerText="Ship Date" editType="datepickeredit" 
              validationRules="@(new { required=true })"
              format="yMd" width="150"></e-grid-column>

<!-- Dropdown/Select with required validation -->
<e-grid-column field="ShipCountry" headerText="Ship Country" editType="dropdownedit" 
              validationRules="@(new { required=true })"
              width="150"></e-grid-column>

<!-- Boolean/Checkbox -->
<e-grid-column field="Verified" headerText="Verified" editType="booleanedit" 
              width="80"></e-grid-column>
```

## Custom Validation

Implement custom validation logic using JavaScript in the Dialog template:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" 
                        mode="Dialog" template="#dialogtemplate"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" editType="numericedit" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script id="dialogtemplate" type="text/x-template">
    <div>
        <div class="form-group">
            <label for="Freight">Freight (must be 1-1000)</label>
            <input id="Freight" name="Freight" type="number" min="1" max="1000" />
        </div>
    </div>
</script>
```

## Dynamic Validation Rules

Update validation rules programmatically based on user actions:

```html
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true"
          actionBegin="onActionBegin">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" 
                        mode="Dialog"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" 
                      validationRules="@(new { required=true })" 
                      isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" editType="numericedit" 
                      validationRules="@(new { required=true })" 
                      width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
    function onActionBegin(args) {
        if (args.requestType === 'save') {
            var freight = parseFloat(args.data.Freight);
            if (freight < 0 || freight > 5000) {
                args.cancel = true;
                alert('Freight must be between 0 and 5000');
            }
        }
    }
</script>
```

## Server-Side Validation

Validate data on the server before saving:

```csharp
[HttpPost]
public ActionResult Update([FromBody] OrdersDetails value)
{
    // Server-side validation
    if (string.IsNullOrEmpty(value.CustomerID) || value.CustomerID.Length < 3)
    {
        return BadRequest(new { error = "CustomerID must be at least 3 characters" });
    }
    
    if (value.Freight < 0 || value.Freight > 5000)
    {
        return BadRequest(new { error = "Freight must be between 0 and 5000" });
    }
    
    // Save to database
    _context.Orders.Update(value);
    _context.SaveChanges();
    
    return Json(value);
}
```

Handle server validation errors in the grid:

```html
<ejs-grid id="Grid" actionFailure="onActionFailure">
    <!-- grid columns -->
</ejs-grid>

<script>
    function onActionFailure(args) {
        if (args.error && args.error.statusCode === 400) {
            alert('Validation Error: ' + JSON.stringify(args.error));
        }
    }
</script>
```

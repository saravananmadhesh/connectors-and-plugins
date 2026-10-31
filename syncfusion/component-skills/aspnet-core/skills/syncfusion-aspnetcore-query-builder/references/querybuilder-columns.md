# Column Configuration in QueryBuilder

## Table of Contents
- [Auto-Generation](#auto-generation)
- [Labels](#labels)
- [Data Types](#data-types)
- [Operators](#operators)
- [Step (Number Fields)](#step-number-fields)
- [Format (Date and Number)](#format-date-and-number)
- [Validations](#validations)
- [Column Templates](#column-templates)

---

## Auto-Generation

Columns are automatically generated from the `DataSource` when no explicit `<e-querybuilder-columns>` definition is provided. The column type is inferred from the first record in the data source.

```cshtml
<ejs-querybuilder id="querybuilder" dataSource="@ViewBag.Employees" width="70%">
    @* No columns defined — QueryBuilder auto-generates from DataSource schema *@
</ejs-querybuilder>
```

> **Note:** When columns are auto-generated, column type is determined from the first record. If the first record has null values, type inference may be incorrect — define columns explicitly to avoid this.

---

## Labels

By default, the column label displays the `field` value. Override it with the `label` attribute:

```cshtml
<e-querybuilder-column field="EmpID" label="Employee ID" type="number"></e-querybuilder-column>
```

If both `field` and `label` are missing, the column header renders as "empty".

---

## Data Types

Supported column types:

| Type | TagHelper Value | Description |
|------|----------------|-------------|
| String | `"string"` | Text fields |
| Number | `"number"` | Integer and decimal fields |
| Date | `"date"` | Date/DateTime fields |
| Boolean | `"boolean"` | True/false fields |

```cshtml
<e-querybuilder-columns>
    <e-querybuilder-column field="Name" label="Name" type="string"></e-querybuilder-column>
    <e-querybuilder-column field="Age" label="Age" type="number"></e-querybuilder-column>
    <e-querybuilder-column field="HireDate" label="Hire Date" type="date"></e-querybuilder-column>
    <e-querybuilder-column field="IsActive" label="Active" type="boolean"></e-querybuilder-column>
</e-querybuilder-columns>
```

---

## Operators

Define which operators are available per column using the `operators` attribute. Each operator is an object with `key` (display text) and `value` (operator name).

**All supported operators by type:**

| Operator | Description | Supported Types |
|----------|-------------|-----------------|
| `startswith` | Begins with value | String |
| `endswith` | Ends with value | String |
| `contains` | Contains value | String |
| `equal` | Equals value | String, Number, Date, Boolean |
| `notequal` | Not equal to value | String, Number, Date, Boolean |
| `greaterthan` | Greater than value | Number, Date |
| `greaterthanorequal` | Greater than or equal | Number, Date |
| `lessthan` | Less than value | Number, Date |
| `lessthanorequal` | Less than or equal | Number, Date |
| `between` | Between two values | Number, Date |
| `notbetween` | Not between two values | Number, Date |
| `in` | Value in list | String, Number |
| `notin` | Value not in list | String, Number |
| `isempty` | Is empty string | String |
| `isnotempty` | Is not empty string | String |
| `isnull` | Is null | String, Number, Date |
| `isnotnull` | Is not null | String, Number, Date |

**Restricting operators for a specific column:**

```cshtml
@{
    var operators = new List<object>
    {
        new { key = "Equal", value = "equal" },
        new { key = "Contains", value = "contains" },
        new { key = "Starts With", value = "startswith" }
    };
}

<e-querybuilder-column field="Country" label="Country" type="string"
    operators="@operators">
</e-querybuilder-column>
```

---

## Step (Number Fields)

Use the `step` attribute to set the increment value on numeric textboxes:

```cshtml
<e-querybuilder-column field="Salary" label="Salary" type="number" step="500">
</e-querybuilder-column>
```

---

## Format (Date and Number)

Use the `format` attribute to control display format for date and number columns:

```cshtml
@* Date column with custom format *@
<e-querybuilder-column field="HireDate" label="Hire Date" type="date" format="MM/dd/yyyy">
</e-querybuilder-column>

@* Number column with decimal format *@
<e-querybuilder-column field="Price" label="Price" type="number" format="C2">
</e-querybuilder-column>
```

---

## Validations

Enable validations by setting `allowValidation="true"` on the QueryBuilder. Then configure per-column validation rules via `<e-querybuilder-validation>`.

```cshtml
<ejs-querybuilder id="querybuilder" allowValidation="true" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string">
            <e-querybuilder-validation isRequired="true"></e-querybuilder-validation>
        </e-querybuilder-column>
        <e-querybuilder-column field="Age" label="Age" type="number">
            <e-querybuilder-validation isRequired="true" min="0" max="150">
            </e-querybuilder-validation>
        </e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string">
            <e-querybuilder-validation isRequired="true"></e-querybuilder-validation>
        </e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

Call `validateFields()` in JavaScript to trigger validation:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
var isValid = qb.validateFields();
if (isValid) {
    console.log('Rules are valid:', qb.getRules());
}
```

**Validation properties:**

| Property | Type | Description |
|----------|------|-------------|
| `isRequired` | boolean | Operator and value must be filled |
| `min` | number | Minimum value (number fields) |
| `max` | number | Maximum value (number fields) |

---

## Column Templates

Column templates allow custom input widgets instead of the default textbox. Implement three functions: `create`, `write`, and `destroy`.

- **`create`**: Creates the DOM element for the custom widget.
- **`write`**: Wires up events and sets the initial value.
- **`destroy`**: Cleans up the widget when the rule is removed.

**Example: Dropdown as value input for a specific column:**

```cshtml
<ejs-querybuilder id="querybuilder" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="PaymentMode" label="Payment Mode" type="string"
            operators="@(new[] { new { key="Equal", value="equal"} })">
            <e-querybuilder-template create="createTemplate"
                destroy="destroyTemplate"
                write="writeTemplate">
            </e-querybuilder-template>
        </e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

<script>
    var paymentModes = ['Cash', 'Debit Card', 'Credit Card', 'Net Banking'];

    function createTemplate() {
        return document.createElement('input');
    }

    function writeTemplate(args) {
        var dropDownObj = new ej.dropdowns.DropDownList({
            dataSource: paymentModes,
            value: args.values,
            change: function(e) {
                args.ruleID; // current rule element ID
            }
        });
        dropDownObj.appendTo(args.elements);
    }

    function destroyTemplate(args) {
        var dropDown = args.elements.ej2_instances[0];
        if (dropDown) { dropDown.destroy(); }
    }
</script>
```

## See Also

- [Getting Started](querybuilder-getting-started.md) — Initial setup
- [Filtering & Rule Management](querybuilder-filtering-and-rules.md) — Add/delete/clone rules
- [API Reference](querybuilder-api.md) — QueryBuilderColumn full property list

# Columns — Syncfusion Angular Query Builder

Column definitions control how the Query Builder renders fields, which operators are available, how values are formatted, and how validation is applied.

---

## Column Definition Basics

Each `<e-column>` maps to one queryable field. The `field` property is required — it must match the key name in your dataSource.

```html
<ejs-querybuilder [dataSource]="data">
  <e-columns>
    <e-column field="EmployeeID"      label="Employee ID"       type="number"></e-column>
    <e-column field="FirstName"       label="First Name"        type="string"></e-column>
    <e-column field="IsActive"        label="Active"            type="boolean"></e-column>
    <e-column field="HireDate"        label="Hire Date"         type="date" format="dd/MM/yyyy"></e-column>
    <e-column field="TitleOfCourtesy" label="Title of Courtesy" type="string" [values]="['Mr.','Mrs.']"></e-column>
  </e-columns>
</ejs-querybuilder>
```

**Column types:**
| Type | Rendered input | Default operators |
|---|---|---|
| `string` | TextBox (or dropdown if `values` set) | startswith, endswith, contains, equal, notequal, in, notin |
| `number` | NumericTextBox | equal, notequal, greaterthan, greaterthanorequal, lessthan, lessthanorequal, between, notbetween |
| `date` | DatePicker | equal, notequal, greaterthan, lessthan, between, notbetween |
| `boolean` | RadioButton (True/False) | equal, notequal |

> If `field` is not specified, the column values render empty.

---

## Auto-Generation from DataSource

When `<e-columns>` is empty or omitted, columns are automatically generated from the bound `dataSource`:

```typescript
@Component({
  template: `<ejs-querybuilder [dataSource]="data"></ejs-querybuilder>`
})
export class App {
  public data = [
    { EmployeeID: 1, FirstName: 'Nancy', Country: 'USA' },
    { EmployeeID: 2, FirstName: 'Andrew', Country: 'UK' }
  ];
}
```

> Auto-generated column types are inferred from the **first record** in the dataSource. Always provide a non-null first record for accurate type detection.

---

## Labels

By default, the Query Builder displays the `field` value as the column label. Override it with `label`:

```html
<e-column field="emp_id" label="Employee ID" type="number"></e-column>
```

---

## Operators

Define the available operators for a column using the `operators` property. If omitted, default operators for the column's type are used.

```typescript
public customOperators = [
  { value: 'equal',       text: 'Equal' },
  { value: 'notequal',    text: 'Not Equal' },
  { value: 'contains',    text: 'Contains' },
  { value: 'startswith',  text: 'Starts With' }
];
```

```html
<e-column field="FirstName" label="First Name" type="string" [operators]="customOperators"></e-column>
```

### All Available Operators

| Operator | Description | Supported Types |
|---|---|---|
| `startswith` | Value begins with | String |
| `endswith` | Value ends with | String |
| `contains` | Value contains | String |
| `doesnotstartwith` | Does not start with | String |
| `doesnotendwith` | Does not end with | String |
| `doesnotcontain` | Does not contain | String |
| `equal` | Exactly equal | String, Number, Date, Boolean |
| `notequal` | Not equal | String, Number, Date, Boolean |
| `greaterthan` | Greater than | Date, Number |
| `greaterthanorequal` | Greater than or equal | Date, Number |
| `lessthan` | Less than | Date, Number |
| `lessthanorequal` | Less than or equal | Date, Number |
| `between` | Between two values | Date, Number |
| `notbetween` | Not between two values | Date, Number |
| `in` | One of a set of values | String, Number |
| `notin` | Not in a set of values | String, Number |
| `isempty` | Value is empty string | String |
| `isnotempty` | Value is not empty string | String |
| `isnull` | Value is null | String, Number |
| `isnotnull` | Value is not null | String, Number |

---

## Step (Number Fields)

Set the increment step for numeric inputs to make value entry easier:

```html
<e-column field="Age" label="Age" type="number" [step]="5"></e-column>
```

---

## Format (Date and Number Fields)

Apply display format to date or number columns:

```html
<!-- Date: dd/MM/yyyy -->
<e-column field="HireDate" label="Hire Date" type="date" format="dd/MM/yyyy"></e-column>

<!-- Number: 2 decimal places -->
<e-column field="Salary" label="Salary" type="number" format="n2"></e-column>
```

```typescript
// Format via columnsModel in component
public columns: ColumnsModel[] = [
  { field: 'HireDate', label: 'Hire Date', type: 'date', format: 'dd/MM/yyyy' },
  { field: 'Salary',   label: 'Salary',   type: 'number', format: 'n2' }
];
```

---

## Validation

Enable validation to show errors when rules are incomplete or out of range. Set `allowValidation` on the Query Builder and configure `validation` per column.

```html
<ejs-querybuilder [allowValidation]="true">
  <e-columns>
    <e-column field="FirstName" label="First Name" type="string"
      [validation]="{ isRequired: true }">
    </e-column>
    <e-column field="Age" label="Age" type="number"
      [validation]="{ isRequired: true, min: 18, max: 65 }">
    </e-column>
  </e-columns>
</ejs-querybuilder>
```

Trigger validation programmatically:

```typescript
@ViewChild('querybuilder') qb!: QueryBuilderComponent;

validate(): boolean {
  return this.qb.validateFields();
}
```

**Validation options:**

| Option | Type | Description |
|---|---|---|
| `isRequired` | boolean | Field/operator/value must be filled |
| `min` | number | Minimum allowed value (number fields) |
| `max` | number | Maximum allowed value (number fields) |

> Set `isRequired` for both Operator and Value fields for complete validation coverage.

---

## Predefined Values (Dropdown for String Columns)

Use `values` on a string column to render a dropdown instead of a free-text input:

```html
<e-column field="Status" label="Status" type="string"
  [values]="['Active', 'Inactive', 'Pending']">
</e-column>
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Column shows empty values | Verify `field` matches the exact key in dataSource |
| Wrong operators shown | Set `[operators]` explicitly on the column |
| Date picker not rendering | Ensure `type="date"` and CSS imports include `ej2-calendars` |
| Validation not triggering | Set `[allowValidation]="true"` on `<ejs-querybuilder>` and call `validateFields()` |
| Auto-generated types wrong | Ensure first record in dataSource has non-null values for all fields |

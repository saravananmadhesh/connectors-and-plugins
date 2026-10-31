# Data Validation in JavaScript Grid

## Table of Contents
1. [Mandatory Rules](#mandatory-rules-for-grid-validation)
2. [Built-in Validators](#built-in-validators)
3. [Custom Validation](#custom-validation)
4. [Dynamic Rules](#dynamic-rules)
5. [Error Positioning](#error-positioning)
6. [CRUD Error Handling](#crud-error-handling)
7. [Duplicate Detection](#duplicate-detection)

## When to Use This Reference

- Configure field validation rules and constraints
- Implement required field and format validation
- Create custom validation logic and messages
- Display validation errors and feedback
- Handle validation on edit and save operations

---

## Mandatory Rules for Grid Validation

### Rule 1: Use `validationRules` Property on Column Objects

```ts
// ❌ WRONG - old approach
{
  field: 'OrderID',
  edit: { params: { required: true } }
}

// ✅ CORRECT - new approach
{
  field: 'OrderID',
  validationRules: { required: true }
}
```

### Rule 2: ValidationRules Must Match Column Data Type

```ts
// ✅ Number column — use min/max
{
  field: 'Freight',
  type: 'number',
  validationRules: { required: true, min: 0, max: 10000 }
}

// ✅ String column — use minLength/maxLength, NOT min/max
{
  field: 'CustomerID',
  type: 'string',
  validationRules: { required: true, minLength: 5, maxLength: 5 }
}

// ✅ Date column — only required applies
{
  field: 'OrderDate',
  type: 'date',
  validationRules: { required: true }
}

// ❌ Wrong — min/max applied to string produces wrong validation
// { field: 'ShipName', validationRules: { min: 3 } } // WRONG!
```

### Rule 3: Enable Edit Module for Validation

Always inject the `Edit` module before using validation:

```ts
Grid.Inject(Edit, Toolbar);
```

### Rule 4: Validate Before Save in actionBegin Event

```ts
actionBegin: (args: any) => {
  if (args.requestType === 'save') {
    // Validation happens automatically here
    // Cancel save if validation fails
    if (validationFailed) {
      args.cancel = true;
    }
  }
}
```

---

## Built-in Validators

```ts
import { Grid, Edit, Toolbar, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar, Page);

const data = [
  { OrderID: 10248, CustomerID: 'ABC123', Freight: 32.38, OrderDate: new Date(1996, 6, 4) },
  { OrderID: 10249, CustomerID: 'DEF456', Freight: 11.61, OrderDate: new Date(1996, 6, 5) }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderID',
      headerText: 'Order ID',
      width: 100,
      isPrimaryKey: true,
      validationRules: { required: true, min: 1000 }
    },
    {
      field: 'CustomerID',
      headerText: 'Customer ID',
      width: 120,
      validationRules: { required: true, minLength: 3, maxLength: 10 }
    },
    {
      field: 'Freight',
      headerText: 'Freight',
      type: 'number',
      width: 120,
      validationRules: { required: true, min: 1, max: 1000 }
    },
    {
      field: 'OrderDate',
      headerText: 'Order Date',
      type: 'date',
      width: 130,
      format: 'yMd',
      validationRules: { required: true }
    }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true, allowDeleting: true },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
});

grid.appendTo('#grid');
```

| Validator | Data Type | Syntax | Purpose |
|-----------|-----------|--------|---------|
| `required` | All | `{ required: true }` | Field must have value |
| `min` | Number, Date | `{ min: 1 }` | Minimum numeric/date value |
| `max` | Number, Date | `{ max: 1000 }` | Maximum numeric/date value |
| `minLength` | String | `{ minLength: 5 }` | Min string character count |
| `maxLength` | String | `{ maxLength: 50 }` | Max string character count |
| `pattern` | String | `{ pattern: /^[0-9]+$/ }` | Regex match pattern |

---

## Custom Validation

Custom functions return `true` (valid) or `false` (invalid). Use array syntax: `{ ruleName: [customFn, 'message'] }`

```ts
import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar);

// Custom validation functions
const validateFreight = (args: any) => args.value >= 1 && args.value <= 1000;
const validateEmail = (args: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.value);
const validateMinLength = (args: any) => args.value.length >= 5;

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderID',
      headerText: 'Order ID',
      isPrimaryKey: true,
      width: 100
    },
    {
      field: 'Freight',
      headerText: 'Freight',
      type: 'number',
      width: 120,
      validationRules: {
        required: true,
        min: [validateFreight, 'Freight must be 1-1000']
      }
    },
    {
      field: 'Email',
      headerText: 'Email',
      width: 150,
      validationRules: {
        required: true,
        pattern: [validateEmail, 'Enter valid email address']
      }
    },
    {
      field: 'CustomerID',
      headerText: 'Customer ID',
      width: 120,
      validationRules: {
        required: true,
        minLength: [validateMinLength, 'Must be 5+ characters']
      }
    }
  ],
  editSettings: { mode: 'Dialog' },
  toolbar: ['Add', 'Edit', 'Update', 'Cancel']
});

grid.appendTo('#grid');
```

### Dependent Validation — Validate Based on Another Column

```ts
let selectedRole = '';

const validateSalaryByRole = (args: any) => {
  const roles: any = {
    'Manager': { min: 50000, max: 100000 },
    'Engineer': { min: 25000, max: 60000 },
    'Sales': { min: 20000, max: 45000 }
  };
  const range = roles[selectedRole];
  return range ? args.value >= range.min && args.value <= range.max : true;
};

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'Role',
      headerText: 'Role',
      width: 120,
      editType: 'dropdownedit',
      dataSource: ['Manager', 'Engineer', 'Sales'],
      edit: {
        change: (args: any) => {
          selectedRole = args.value; // Store for dependent validation
        }
      }
    },
    {
      field: 'Salary',
      headerText: 'Salary',
      type: 'number',
      width: 120,
      validationRules: {
        required: [validateSalaryByRole, 'Invalid salary for role']
      }
    }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true },
  toolbar: ['Edit', 'Update', 'Cancel']
});

grid.appendTo('#grid');
```

---

## Dynamic Rules

Add/remove validation rules at runtime:

```ts
import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar);

let gridInstance: Grid;

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderID',
      headerText: 'Order ID',
      isPrimaryKey: true,
      width: 100
    },
    {
      field: 'CustomerID',
      headerText: 'Customer ID',
      width: 120
    }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true },
  actionComplete: (args: any) => {
    const formObj = gridInstance.editModule.formObj;

    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      // Add validation rules during edit
      formObj.addRules('CustomerID', {
        required: true,
        minLength: [5, 'Must be 5+ characters']
      });
    } else if (args.requestType === 'save') {
      // Validate before save
      if (!formObj.validate()) {
        args.cancel = true; // Prevent save
      }
    }
  },
  toolbar: ['Add', 'Edit', 'Update', 'Cancel']
});

grid.appendTo('#grid');
gridInstance = grid;
```

**Key Methods:**
- `formObj.addRules(fieldName, rules)` - Add validation rules
- `formObj.removeRules(fieldName, ruleNames)` - Remove rules
- `formObj.validate()` - Trigger form validation
- `formObj.clearRules(fieldName)` - Clear all rules for field

---

## Error Positioning

Customize error message placement:

```ts
let gridInstance: Grid;

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderID',
      headerText: 'Order ID',
      isPrimaryKey: true,
      width: 100
    },
    {
      field: 'CustomerID',
      headerText: 'Customer ID',
      width: 120,
      validationRules: { required: true }
    }
  ],
  editSettings: { mode: 'Dialog' },
  actionComplete: (args: any) => {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      const formObj = gridInstance.editModule.formObj;

      // Customize error message placement
      formObj.customPlacement = (input: any, error: any) => {
        const inputEl = document.querySelector(`#${input.name}`);
        if (inputEl && error) {
          const rect = inputEl.getBoundingClientRect();
          error.style.left = (rect.left - 200) + 'px';
          error.style.top = rect.top + 'px';
          error.style.position = 'fixed';
        }
      };
    }
  },
  toolbar: ['Add', 'Edit', 'Update', 'Cancel']
});

grid.appendTo('#grid');
gridInstance = grid;
```

---

## CRUD Error Handling

Handle failed validation or server errors:

```ts
import { Grid, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Edit, Toolbar);

const dataManager = new DataManager({
  url: 'url',
  insertUrl: 'url/insert',
  updateUrl: 'url/update',
  removeUrl: 'url/delete',
  adaptor: new UrlAdaptor()
});

const grid = new Grid({
  dataSource: dataManager,
  columns: [
    {
      field: 'OrderID',
      headerText: 'Order ID',
      isPrimaryKey: true,
      width: 100,
      validationRules: { required: true }
    },
    {
      field: 'CustomerID',
      headerText: 'Customer ID',
      width: 120,
      validationRules: { required: true }
    }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true },
  actionFailure: (args: any) => {
    // Extract error from response
    if (args?.error?.[0]?.error?.json) {
      args.error[0].error.json().then((response: any) => {
        console.error('Validation Error:', response.message);
        alert('Error: ' + response.message);
      });
    } else {
      console.error('CRUD Error:', args.error);
      alert('Error occurred');
    }
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
});

grid.appendTo('#grid');
```

**Server Response Format (ASP.NET):**
```csharp
[HttpPost("insert")]
public IActionResult Insert([FromBody] Order order)
{
  // Validate on server
  if (string.IsNullOrEmpty(order.OrderID)) {
    return BadRequest(new { message = "Order ID is required" });
  }

  if (order.Freight <= 0 || order.Freight > 10000) {
    return BadRequest(new { message = "Freight must be between 1 and 10000" });
  }

  // Insert data...
  return Ok(new { message = "Success" });
}
```

---

## Duplicate Detection

Validate for unique/duplicate values:

```ts
const validateUniqueOrderID = (args: any, gridRef: Grid) => {
  const data = gridRef.dataSource as any[];
  const editData = gridRef.editModule.editModule.args?.rowData;

  return !data.some(row =>
    row['OrderID'] + '' === args.value &&
    row['OrderID'] !== editData?.['OrderID']
  );
};

let gridInstance: Grid;

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderID',
      headerText: 'Order ID',
      isPrimaryKey: true,
      width: 100,
      validationRules: { required: true }
    },
    {
      field: 'CustomerID',
      headerText: 'Customer ID',
      width: 120
    }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true },
  actionBegin: (args: any) => {
    if (args.requestType === 'save') {
      const formObj = gridInstance.editModule.formObj;

      // Add duplicate check rule
      formObj.addRules('OrderID', {
        required: true,
        min: [(arg: any) => validateUniqueOrderID(arg, gridInstance), 'OrderID already exists']
      });

      if (!formObj.validate()) {
        args.cancel = true; // Prevent save on duplicate
      }

      formObj.removeRules('OrderID', ['min']);
    }
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
});

grid.appendTo('#grid');
gridInstance = grid;
```

---

## Integration

Validation works seamlessly with:
- **Editing modes**: Inline, Dialog, Batch (all support validation)
- **Events**: 
  - `actionBegin` - Fired before action (check validation before save)
  - `actionComplete` - Fired after action (refresh UI on success)
  - `actionFailure` - Fired on error (handle validation/server errors)
- **Filtering & Sorting**: Applied to validated data only
- **Export**: Exports current grid state with validation applied
- **Selection**: Validation independent of selection mode
- **Paging**: Validation per page before moving to next page

**Key Validations at Different Stages:**
1. **Client-side** - Validation before dialog/inline edit closes
2. **Before Save** - `actionBegin` event can cancel save
3. **Server-side** - API validates and returns error if needed
4. **After Save** - `actionComplete` or `actionFailure` handles result


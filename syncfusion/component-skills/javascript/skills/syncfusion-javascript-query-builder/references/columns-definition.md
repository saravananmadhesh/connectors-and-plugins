# Column Definitions and Schema

## Table of Contents
- [Overview](#overview)
- [Column Properties](#column-properties)
- [Auto-Generation](#auto-generation)
- [Data Types](#data-types)
- [Operators](#operators)
- [Labels and Field Mapping](#labels-and-field-mapping)
- [Step and Format](#step-and-format)
- [Custom Column Configuration](#custom-column-configuration)
- [Advanced Patterns](#advanced-patterns)

## Overview

Column definitions define the schema for QueryBuilder. They map data source fields to UI elements and determine what operators and values are valid for filtering. The `columns` property accepts an array of `ColumnsModel` objects.

**Key Role:**
- Map data fields to filter options
- Define data types and validation
- Specify available operators
- Configure formatting and display
- Enable/disable filtering per column

## Column Properties

### Complete Column Model Structure

```typescript
interface ColumnsModel {
  // Identity and mapping
  field: string;              // Data field name (REQUIRED)
  label?: string;             // Display label (defaults to field)
  
  // Type information
  type?: 'string' | 'number' | 'date' | 'boolean';
  
  // Operators — array of objects with string keys
  operators?: { [key: string]: Object }[];  // Custom operators for this column
  
  // Formatting
  format?: string | FormatObject; // Date/number format (e.g., 'dd/MM/yyyy')
  step?: number;              // Increment step for number inputs
  
  // Predefined values
  values?: string[] | number[] | boolean[];  // List of valid values
  value?: string[] | number[] | string | number | boolean | Date; // Default value
  
  // Nested columns / category grouping
  columns?: ColumnsModel[];   // Sub-fields
  category?: string;          // Group related columns in field dropdown
  
  // UI templates
  template?: TemplateColumn | string | Function; // Custom value widget template
  ruleTemplate?: string | Function;              // Custom entire-rule-row template
  
  // Validation
  validation?: Validation;    // isRequired, min, max
}
```

## Auto-Generation

When `columns` property is undefined or empty, QueryBuilder automatically generates columns from the dataSource.

### Auto-Generation Example

```typescript
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
];

const qb = new QueryBuilder({
  width: '100%',
  dataSource: data
  // No columns property - auto-generates from data
});
qb.appendTo('#querybuilder');
```

**Auto-Generated Columns:**
- OrderID → number type
- CustomerID → string type
- Freight → number type

**Limitation:** Type is determined from first record only. Use explicit columns for better control.

### Inference Algorithm

```typescript
// Type inference order:
1. If value is a number → type: 'number'
2. If value is a date (ISO string) → type: 'date'
3. If value is boolean → type: 'boolean'
4. Default → type: 'string'
```

## Data Types

### String Type

Operators: `startswith`, `endswith`, `contains`, `equal`, `notequal`, `in`, `notin`

```typescript
{
  field: 'FirstName',
  label: 'First Name',
  type: 'string',
  values: ['Nancy', 'Andrew', 'Janet']  // Optional suggestions
}
```

String operators:
- **startswith** - Value begins with text
- **endswith** - Value ends with text
- **contains** - Value contains text (substring)
- **equal** - Exact match
- **notequal** - Not equal
- **in** - Value in list
- **notin** - Value not in list

### Number Type

Operators: `equal`, `notequal`, `greaterthan`, `lessthan`, `greaterthanorequal`, `lessthanorequal`, `between`, `notbetween`, `in`, `notin`

```typescript
{
  field: 'EmployeeID',
  label: 'Employee ID',
  type: 'number',
  step: 1,  // Increment by 1
  values: [1, 2, 3, 4, 5]  // Suggested values
}
```

Number operators:
- **equal** - Equals value
- **notequal** - Not equal
- **greaterthan** - Greater than
- **lessthan** - Less than
- **greaterthanorequal** - Greater than or equal
- **lessthanorequal** - Less than or equal
- **between** - Within range (e.g., 100 to 500)
- **notbetween** - Outside range
- **in** - In list of numbers
- **notin** - Not in list

### Date Type

Operators: `equal`, `notequal`, `greaterthan`, `lessthan`, `greaterthanorequal`, `lessthanorequal`, `between`, `notbetween`

```typescript
{
  field: 'HireDate',
  label: 'Hire Date',
  type: 'date',
  format: 'dd/MM/yyyy'  // Display format
}
```

Date operators:
- **equal** - On date
- **notequal** - Not on date
- **greaterthan** - After date
- **lessthan** - Before date
- **greaterthanorequal** - On or after date
- **lessthanorequal** - On or before date
- **between** - Date range
- **notbetween** - Outside date range

**Format Examples:**
- `dd/MM/yyyy` - 22/07/2001
- `yyyy-MM-dd` - 2001-07-22
- `MM/dd/yyyy` - 07/22/2001
- `dd MMM yyyy` - 22 Jul 2001

### Boolean Type

Operators: `equal`, `notequal`

```typescript
{
  field: 'IsActive',
  label: 'Active',
  type: 'boolean',
  values: ['Yes', 'No']  // Display labels
}
```

Boolean operators:
- **equal** - Is true/false
- **notequal** - Is not true/false

## Operators

### Default Operators by Type

```typescript
// String operators (default)
['startswith', 'endswith', 'contains', 'equal', 'notequal', 'in', 'notin']

// Number operators (default)
['equal', 'notequal', 'greaterthan', 'lessthan', 'between', 'notbetween']

// Date operators (default)
['equal', 'notequal', 'greaterthan', 'lessthan', 'between', 'notbetween']

// Boolean operators (default)
['equal', 'notequal']
```

### Custom Operators

Override default operators per column:

```typescript
{
  field: 'City',
  type: 'string',
  operators: [
    { key: 'equal', value: 'Is' },
    { key: 'notequal', value: 'Is not' },
    { key: 'in', value: 'In' },
    { key: 'notin', value: 'Not in' }
  ]
  // Removes startswith, endswith, contains
}
```

### Common Operator Customization

```typescript
// Restrict to specific operators
const restrictedColumn: ColumnsModel = {
  field: 'Status',
  type: 'string',
  operators: [
    { key: 'equal', value: 'Equals' },
    { key: 'notequal', value: 'Not Equals' }
  ]
};

// Add custom operator display text
const customLabelsColumn: ColumnsModel = {
  field: 'Price',
  type: 'number',
  operators: [
    { key: 'equal', value: 'Costs' },
    { key: 'lessthan', value: 'Cheaper than' },
    { key: 'greaterthan', value: 'More than' }
  ]
};
```

## Labels and Field Mapping

### Field Mapping

Field names must exactly match dataSource properties:

```typescript
// Data source
const data = [
  { EmployeeID: 1, FirstName: 'Nancy', HireDate: '2001-07-22' }
];

// Column definition - field must match exactly
const columns = [
  { field: 'EmployeeID', label: 'Employee ID' },  // ✅ Matches
  { field: 'FirstName', label: 'First Name' },    // ✅ Matches
  { field: 'FirstN', label: 'Name' }              // ❌ Won't work
];
```

### Label Display

```typescript
// Default: label = field name
{ field: 'EmployeeID' }           // Displays as "EmployeeID"

// Custom: label property
{ field: 'EmployeeID', label: 'Employee ID' }  // Displays as "Employee ID"

// Best practice: Always provide labels for user-friendly display
const userFriendlyColumns: ColumnsModel[] = [
  { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
  { field: 'FirstName', label: 'First Name', type: 'string' },
  { field: 'HireDate', label: 'Hire Date', type: 'date' },
  { field: 'IsManager', label: 'Is Manager', type: 'boolean' }
];
```

## Step and Format

### Step Property (Numbers)

Controls increment/decrement step in number inputs:

```typescript
{
  field: 'Quantity',
  type: 'number',
  step: 10  // Increment by 10
}
```

**Use Cases:**
- `step: 1` - Individual items (quantities)
- `step: 5` - Groups of 5
- `step: 100` - Large values (prices, salaries)
- `step: 0.01` - Decimals (currency)

### Format Property (Dates & Numbers)

Specifies display and parsing format:

```typescript
// Date formatting
{
  field: 'BirthDate',
  type: 'date',
  format: 'dd/MM/yyyy'
}

// Number formatting
{
  field: 'Salary',
  type: 'number',
  format: 'n2'  // 1234.56
}
```

**Date Format Examples:**
```typescript
'dd/MM/yyyy'    // 22/07/2001
'yyyy-MM-dd'    // 2001-07-22
'MM/dd/yyyy'    // 07/22/2001
'dd MMM yyyy'   // 22 Jul 2001
'dddd, MMMM d'  // Friday, July 22
```

**Number Format Examples:**
```typescript
'n'     // 1234 (no decimals)
'n2'    // 1234.56 (2 decimals)
'c'     // $1234.56 (currency)
'p'     // 1234.56% (percentage)
```

## Custom Column Configuration

### Complete Complex Example

```typescript
const advancedColumns: ColumnsModel[] = [
  {
    field: 'EmployeeID',
    label: 'ID',
    type: 'number',
    step: 1,
    values: [1, 2, 3, 4, 5],
    operators: [
      { key: 'equal', value: '=' },
      { key: 'notequal', value: '≠' },
      { key: 'in', value: 'in' }
    ]
  },
  {
    field: 'HireDate',
    label: 'Hire Date',
    type: 'date',
    format: 'dd/MM/yyyy',
    operators: [
      { key: 'between', value: 'between' },
      { key: 'equal', value: 'on' },
      { key: 'greaterthan', value: 'after' },
      { key: 'lessthan', value: 'before' }
    ]
  },
  {
    field: 'Salary',
    label: 'Annual Salary',
    type: 'number',
    format: 'c',
    step: 1000,
    operators: [
      { key: 'equal', value: '=' },
      { key: 'greaterthan', value: '>' },
      { key: 'lessthan', value: '<' },
      { key: 'between', value: 'between' }
    ]
  },
  {
    field: 'IsManager',
    label: 'Manager Status',
    type: 'boolean',
    values: ['Yes', 'No']
  }
];
```

### Column Grouping

Organize related columns with category:

```typescript
const groupedColumns: ColumnsModel[] = [
  { field: 'FirstName', label: 'First Name', type: 'string', category: 'Personal' },
  { field: 'LastName', label: 'Last Name', type: 'string', category: 'Personal' },
  { field: 'Email', label: 'Email', type: 'string', category: 'Personal' },
  { field: 'EmployeeID', label: 'Employee ID', type: 'number', category: 'Work' },
  { field: 'Department', label: 'Department', type: 'string', category: 'Work' },
  { field: 'Salary', label: 'Salary', type: 'number', category: 'Work' }
];
```

## Advanced Patterns

### Conditional Operators

Display different operators based on data type:

```typescript
function getColumnsForDataset(dataType: 'employee' | 'product' | 'order') {
  const baseColumns: ColumnsModel[] = [];
  
  if (dataType === 'employee') {
    baseColumns.push(
      { field: 'FirstName', label: 'Name', type: 'string' },
      { field: 'Salary', label: 'Salary', type: 'number' }
    );
  } else if (dataType === 'product') {
    baseColumns.push(
      { field: 'ProductName', label: 'Name', type: 'string' },
      { field: 'Price', label: 'Price', type: 'number', format: 'c' }
    );
  }
  
  return baseColumns;
}
```

### Dynamic Column Updates

Rebuild columns at runtime:

```typescript
const qb = new QueryBuilder({
  columns: getInitialColumns(),
  dataSource: data
});
qb.appendTo('#querybuilder');

// Later, update columns
function switchDataset(newDataType: string) {
  const newData = loadData(newDataType);
  const newColumns = getColumnsForDataset(newDataType);
  
  qb.columns = newColumns;
  qb.dataSource = newData;
  qb.refresh();  // Refresh to reflect changes
}
```

### Locale-Aware Columns

```typescript
function getLocalizedColumns(locale: string): ColumnsModel[] {
  const labels = {
    'en': { id: 'ID', name: 'Name', date: 'Date' },
    'es': { id: 'ID', name: 'Nombre', date: 'Fecha' },
    'fr': { id: 'ID', name: 'Nom', date: 'Date' }
  };
  
  const loc = labels[locale] || labels['en'];
  
  return [
    { field: 'EmployeeID', label: loc.id, type: 'number' },
    { field: 'FirstName', label: loc.name, type: 'string' },
    { field: 'HireDate', label: loc.date, type: 'date' }
  ];
}
```

---

**Need help?** Check [references/getting-started.md](getting-started.md) for basic setup or [references/data-binding.md](data-binding.md) for working with your data.

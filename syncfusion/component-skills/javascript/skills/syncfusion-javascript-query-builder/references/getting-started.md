# Getting Started with QueryBuilder

## Installation and Setup

### Step 1: Install Dependencies

The QueryBuilder component requires several Syncfusion packages. Install them using npm:

```bash
npm install @syncfusion/ej2-querybuilder
```

This automatically installs all required peer dependencies:
- `@syncfusion/ej2-base` - Base utilities
- `@syncfusion/ej2-buttons` - Button components
- `@syncfusion/ej2-datamanager` - Data binding
- `@syncfusion/ej2-dropdowns` - Dropdown menus
- `@syncfusion/ej2-calendars` - Date picker
- `@syncfusion/ej2-inputs` - Input fields
- `@syncfusion/ej2-popups` - Popup menus
- `@syncfusion/ej2-splitbuttons` - Split buttons

### Step 2: Import Required CSS Themes

Add CSS imports to your main style file (e.g., `styles.css`):

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/query-builder/index.css";
```

**Available Themes:**
- `material.css` - Google Material Design
- `fabric.css` - Microsoft Fabric
- `bootstrap.css` - Bootstrap theme
- `bootstrap4.css` - Bootstrap 4 theme
- `high-contrast.css` - High contrast for accessibility

### Step 3: Create HTML Container

Add a div element in your HTML file where the QueryBuilder will render:

```html
<!DOCTYPE html>
<html>
<head>
    <title>QueryBuilder Example</title>
    <link href="styles.css" rel="stylesheet">
</head>
<body>
    <div id="querybuilder"></div>
    <script src="app.js"></script>
</body>
</html>
```

## Basic Initialization

### Minimal QueryBuilder

Create a basic QueryBuilder with auto-generated columns:

```typescript
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';

// Sample data
const sampleData = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 }
];

// Create QueryBuilder - columns auto-generated from data
const queryBuilder = new QueryBuilder({
  width: '100%',
  dataSource: sampleData
});

queryBuilder.appendTo('#querybuilder');
```

**Result:** Columns are automatically created for OrderID, CustomerID, and Freight with inferred types.

### QueryBuilder with Explicit Columns

For better control, define columns explicitly:

```typescript
import { QueryBuilder, ColumnsModel } from '@syncfusion/ej2-querybuilder';

const employeeData = [
  {
    EmployeeID: 1,
    FirstName: 'Nancy',
    Title: 'Sales Representative',
    HireDate: '22/07/2001'
  },
  {
    EmployeeID: 2,
    FirstName: 'Andrew',
    Title: 'Vice President',
    HireDate: '21/04/2003'
  }
];

const columns: ColumnsModel[] = [
  { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
  { field: 'FirstName', label: 'First Name', type: 'string' },
  { field: 'Title', label: 'Title', type: 'string' },
  { field: 'HireDate', label: 'Hire Date', type: 'date', format: 'dd/MM/yyyy' }
];

const queryBuilder = new QueryBuilder({
  width: '100%',
  dataSource: employeeData,
  columns: columns
});

queryBuilder.appendTo('#querybuilder');
```

**Why explicit columns?**
- Precise control over labels and display names
- Custom operators per column
- Proper type handling
- Better formatting for dates and numbers

## Column Definition

### Required Properties

Each column definition must have:

```typescript
interface ColumnModel {
  field: string;      // Data source field name (REQUIRED)
  label?: string;     // Display label (defaults to field)
  type?: string;      // Data type: 'string', 'number', 'date', 'boolean'
}
```

### Complete Column Example

```typescript
const fullColumn: ColumnsModel = {
  field: 'HireDate',
  label: 'Hire Date',
  type: 'date',
  format: 'dd/MM/yyyy',
  step: 1,
  operators: [
    { key: 'equal', text: 'Equal' },
    { key: 'greaterthan', text: 'After' },
    { key: 'lessthan', text: 'Before' },
    { key: 'between', text: 'Between' }
  ]
};
```

### Data Types and Validation

```typescript
// String type - default operators
{ field: 'FirstName', type: 'string' }
// Supported: startswith, endswith, contains, equal, notequal, in, notin

// Number type
{ field: 'Salary', type: 'number', step: 100 }
// Supported: equal, notequal, greaterthan, lessthan, between, in, notin

// Date type
{ field: 'HireDate', type: 'date', format: 'dd/MM/yyyy' }
// Supported: equal, notequal, greaterthan, lessthan, between

// Boolean type
{ field: 'IsActive', type: 'boolean', values: ['Yes', 'No'] }
// Supported: equal, notequal
```

## QueryBuilder Properties

Essential properties for initialization:

```typescript
const queryBuilder = new QueryBuilder({
  // Container dimensions
  width: '100%',              // Width of QueryBuilder
  height: 'auto',             // Height of QueryBuilder

  // Data and columns
  dataSource: employeeData,   // Data to bind
  columns: columnDefinitions, // Column definitions

  // UI configuration
  showButtons: {
    ruleDelete: true,         // Show delete button for rules
    groupDelete: true,        // Show delete button for groups
    groupInsert: true,        // Show insert group button
    cloneRule: true,          // Show clone rule button
    cloneGroup: true,         // Show clone group button
    lockRule: true,           // Show lock rule button
    lockGroup: true           // Show lock group button
  },

  // Initial rules
  rule: {
    condition: 'and',
    rules: [
      // Rule objects here
    ]
  },

  // Drag and drop
  allowDragAndDrop: true,     // Enable drag-drop

  // Display options
  displayMode: 'Horizontal'   // 'Horizontal' or 'Vertical' layout
});
```

## Running Your First QueryBuilder

Complete working example:

```typescript
import { QueryBuilder, ColumnsModel, RuleModel } from '@syncfusion/ej2-querybuilder';

// Step 1: Sample data
const employeeData = [
  { EmployeeID: 1, FirstName: 'Nancy', Title: 'Sales Rep', City: 'Seattle' },
  { EmployeeID: 2, FirstName: 'Andrew', Title: 'VP', City: 'Tacoma' },
  { EmployeeID: 3, FirstName: 'Janet', Title: 'Sales Rep', City: 'Kirkland' }
];

// Step 2: Define columns
const columns: ColumnsModel[] = [
  { field: 'EmployeeID', label: 'ID', type: 'number' },
  { field: 'FirstName', label: 'Name', type: 'string' },
  { field: 'Title', label: 'Title', type: 'string' },
  { field: 'City', label: 'City', type: 'string' }
];

// Step 3: Create instance
const qb = new QueryBuilder({
  width: '100%',
  dataSource: employeeData,
  columns: columns
});

// Step 4: Render
qb.appendTo('#querybuilder');

// Step 5: Get rules when needed
document.getElementById('getQuery').addEventListener('click', () => {
  const rules = qb.getRules();
  console.log('Current rules:', rules);
});
```

HTML:

```html
<button id="getQuery">Get Query</button>
<div id="querybuilder"></div>
```

## Common Initialization Errors

### Error: "Column field not found in dataSource"
**Cause:** Field name in column definition doesn't match dataSource property.

**Fix:**
```typescript
// ❌ Wrong - property is 'FirstName', column field is 'FirstN'
{ field: 'FirstN', label: 'Name' }

// ✅ Correct
{ field: 'FirstName', label: 'Name' }
```

### Error: "Type is not supported"
**Cause:** Invalid column type specified.

**Fix:**
```typescript
// ❌ Invalid type
{ field: 'Date', type: 'datetime' }

// ✅ Valid types
{ field: 'Date', type: 'date' }
{ field: 'Count', type: 'number' }
{ field: 'Name', type: 'string' }
{ field: 'Active', type: 'boolean' }
```

### QueryBuilder not rendering
**Cause:** Container element not found or CSS not imported.

**Fix:**
```typescript
// Ensure CSS imports are correct
@import "node_modules/@syncfusion/ej2-querybuilder/styles/material.css";

// Verify element exists
if (document.getElementById('querybuilder') !== null) {
  qb.appendTo('#querybuilder');
}
```

## Next Steps

- **Learn columns:** See [columns-definition.md](columns-definition.md) for advanced column configuration
- **Bind data:** Check [data-binding.md](data-binding.md) for local and remote data
- **Add rules:** Read [rules-and-groups.md](rules-and-groups.md) for rule management

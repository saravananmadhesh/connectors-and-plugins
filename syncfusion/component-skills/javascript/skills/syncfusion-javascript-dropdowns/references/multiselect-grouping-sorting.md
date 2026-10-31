# Grouping & Sorting

## Table of Contents
- [Grouping Basics](#grouping-basics)
- [Group by Field](#group-by-field)
- [Group Templates](#group-templates)
- [Sorting](#sorting)
- [Custom Sort Logic](#custom-sort-logic)
- [Sorting Modes](#sorting-modes)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Grouping Basics

### Enable Grouping

Group items by a specific field in your data:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const employees = [
  { id: '1', name: 'Alice', dept: 'Engineering' },
  { id: '2', name: 'Bob', dept: 'Sales' },
  { id: '3', name: 'Charlie', dept: 'Engineering' },
  { id: '4', name: 'David', dept: 'Sales' }
];

const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: {
    text: 'name',
    value: 'id',
    groupBy: 'dept'    // Group by department field
  },
  placeholder: 'Select employees'
});

multiSelect.appendTo('#multiselect');
```

**Result:** Items grouped by department:
```
Engineering
  □ Alice
  □ Charlie
Sales
  □ Bob
  □ David
```

## Group by Field

### Simple Field Grouping

Group using any field in your data:

```typescript
const cities = [
  { id: '1', name: 'New York', state: 'NY' },
  { id: '2', name: 'Los Angeles', state: 'CA' },
  { id: '3', name: 'Buffalo', state: 'NY' },
  { id: '4', name: 'San Francisco', state: 'CA' }
];

const multiSelect = new MultiSelect({
  dataSource: cities,
  fields: {
    text: 'name',
    value: 'id',
    groupBy: 'state'   // Group by state
  }
});

multiSelect.appendTo('#multiselect');
```

**Result:**
```
CA (California)
  □ Los Angeles
  □ San Francisco
NY (New York)
  □ New York
  □ Buffalo
```

### Group Order

Groups display in data order (first occurrence):

```typescript
// Groups appear in this order: Engineering, Sales, Marketing
const employees = [
  { id: '1', name: 'Alice', dept: 'Engineering' },
  { id: '2', name: 'Bob', dept: 'Sales' },
  { id: '3', name: 'Charlie', dept: 'Engineering' },
  { id: '4', name: 'Eve', dept: 'Marketing' }
];

const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'dept' }
});
```

## Group Templates

### Basic Group Header

Customize group header display:

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'dept' },
  groupTemplate: '<span class="group-header">${dept}</span>'
});

multiSelect.appendTo('#multiselect');
```

### Enhanced Group Headers

Add icons or count to group headers:

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'dept' },
  groupTemplate: `<div class="group-item">
    <span class="dept-icon dept-${dept.toLowerCase()}"></span>
    <span class="dept-name">${dept}</span>
    <span class="item-count">(${dept})</span>
  </div>`,
  placeholder: 'Select employees'
});
```

**CSS Styling:**

```css
.group-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  padding: 8px;
  background: #f5f5f5;
}

.dept-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.dept-engineering { background: #3f51b5; }
.dept-sales { background: #ff9800; }
.dept-marketing { background: #4caf50; }

.item-count {
  margin-left: auto;
  font-size: 0.9em;
  color: #666;
}
```

### Item Template with Grouping

Customize individual items within groups:

```typescript
const employees = [
  { id: '1', name: 'Alice Johnson', dept: 'Engineering', level: 'Senior' },
  { id: '2', name: 'Bob Smith', dept: 'Sales', level: 'Junior' }
];

const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'dept' },
  groupTemplate: '<span class="group">${dept}</span>',
  itemTemplate: `<div class="item">
    <span class="name">${name}</span>
    <span class="level">${level}</span>
  </div>`,
  placeholder: 'Select employee'
});

multiSelect.appendTo('#multiselect');
```

## Sorting

### Sort Order Options

Sort items in ascending or descending order:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

// Ascending order (A → Z)
const ascending = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' },
  sortOrder: 'Ascending'
});

// Descending order (Z → A)
const descending = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' },
  sortOrder: 'Descending'
});

// No sorting (data order)
const noSort = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' }
  // sortOrder not specified - uses data order
});
```

### Default Sort

Data sorts by the text field:

```typescript
const multiSelect = new MultiSelect({
  dataSource: cities,  // Cities in random order
  fields: { text: 'name', value: 'id' },
  sortOrder: 'Ascending'  // Sorts by 'name' field
});
```

**Input:** ['New York', 'Los Angeles', 'Chicago']  
**Output:** ['Chicago', 'Los Angeles', 'New York']

## Custom Sort Logic

### Sort with Query

Use DataManager Query for custom sorting:

```typescript
import { Query } from '@syncfusion/ej2-data';
import { DataManager } from '@syncfusion/ej2-data';

const dataManager = new DataManager(employees);

const multiSelect = new MultiSelect({
  dataSource: dataManager,
  query: new Query().sortBy('name', 'Ascending'),
  fields: { text: 'name', value: 'id' }
});

multiSelect.appendTo('#multiselect');
```

### Sort by Multiple Fields

Sort by primary and secondary fields:

```typescript
import { Query } from '@syncfusion/ej2-data';

const query = new Query()
  .sortBy('dept', 'Ascending')     // Primary: department
  .sortBy('name', 'Ascending');    // Secondary: name within dept

const multiSelect = new MultiSelect({
  dataSource: new DataManager(employees),
  query: query,
  fields: { text: 'name', value: 'id', groupBy: 'dept' }
});
```

### Custom Comparison Function

Sort with custom logic:

```typescript
const items = [
  { id: '1', name: 'Apple', price: 50 },
  { id: '2', name: 'Banana', price: 30 },
  { id: '3', name: 'Orange', price: 40 }
];

// Sort by price (lowest first)
const sorted = items.sort((a, b) => a.price - b.price);

const multiSelect = new MultiSelect({
  dataSource: sorted,
  fields: { text: 'name', value: 'id' }
});
```

## Sorting Modes

### Ascending Sort

```typescript
const multiSelect = new MultiSelect({
  dataSource: ['Zebra', 'Apple', 'Mango'],
  sortOrder: 'Ascending'
});

// Result: Apple, Mango, Zebra
```

### Descending Sort

```typescript
const multiSelect = new MultiSelect({
  dataSource: ['Zebra', 'Apple', 'Mango'],
  sortOrder: 'Descending'
});

// Result: Zebra, Mango, Apple
```

### Numeric Sorting

Sort numeric fields as numbers (not strings):

```typescript
const items = [
  { id: '1', name: 'Item', priority: 10 },
  { id: '2', name: 'Item', priority: 2 },
  { id: '3', name: 'Item', priority: 20 }
];

// String sort: "10", "2", "20"
const stringSorted = items.sort((a, b) => 
  String(a.priority).localeCompare(String(b.priority))
);

// Numeric sort: 2, 10, 20
const numericSorted = items.sort((a, b) => 
  a.priority - b.priority
);

const multiSelect = new MultiSelect({
  dataSource: numericSorted,
  fields: { text: 'name', value: 'id' }
});
```

## Common Patterns

### Pattern 1: Grouped and Sorted

Combine grouping and sorting:

```typescript
const employees = [
  { id: '1', name: 'Charlie', dept: 'Sales', salary: 80000 },
  { id: '2', name: 'Alice', dept: 'Engineering', salary: 95000 },
  { id: '3', name: 'Bob', dept: 'Engineering', salary: 88000 }
];

const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'dept' },
  sortOrder: 'Ascending'  // Sort names alphabetically within groups
});

multiSelect.appendTo('#multiselect');
```

**Result:**
```
Engineering
  □ Alice
  □ Bob
Sales
  □ Charlie
```

### Pattern 2: Group with Item Count

```typescript
const departments = [
  { id: '1', name: 'Alice', dept: 'Engineering' },
  { id: '2', name: 'Bob', dept: 'Engineering' },
  { id: '3', name: 'Charlie', dept: 'Sales' }
];

// Count items per group
const groupCounts: { [key: string]: number } = {};
departments.forEach(emp => {
  groupCounts[emp.dept] = (groupCounts[emp.dept] || 0) + 1;
});

const multiSelect = new MultiSelect({
  dataSource: departments,
  fields: { text: 'name', value: 'id', groupBy: 'dept' },
  groupTemplate: `<span>\${dept} (\${groupCounts[dept]})</span>`
});
```

### Pattern 3: Hierarchy Display

```typescript
const categories = [
  { id: '1', name: 'Electronics → Laptop', category: 'Electronics' },
  { id: '2', name: 'Electronics → Phone', category: 'Electronics' },
  { id: '3', name: 'Clothing → Shirt', category: 'Clothing' }
];

const multiSelect = new MultiSelect({
  dataSource: categories,
  fields: { text: 'name', value: 'id', groupBy: 'category' },
  sortOrder: 'Ascending'
});
```

## Troubleshooting

### Issue: Items Not Grouped

**Problem:** groupBy set but items not grouped  
**Cause:** Field name incorrect or doesn't exist in data

```typescript
const employees = [
  { id: '1', name: 'Alice', department: 'Engineering' }
];

// ✗ Wrong - field is 'department', not 'dept'
const ms = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'dept' }
});

// ✓ Correct - matches actual field name
const ms = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id', groupBy: 'department' }
});
```

### Issue: Custom Sort Not Working

**Problem:** Sort applied to data but dropdown shows original order  
**Solution:** Verify sortOrder property is set

```typescript
// ✗ Wrong - no sortOrder property
const ms = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' }
});

// ✓ Correct - set sortOrder
const ms = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' },
  sortOrder: 'Ascending'
});
```

### Issue: Group Header Template Not Showing

**Problem:** groupTemplate set but custom header not displaying  
**Solution:** Ensure groupBy is configured

```typescript
// ✗ Wrong - no groupBy, so groupTemplate ignored
const ms = new MultiSelect({
  dataSource: employees,
  groupTemplate: '<span>${dept}</span>'
});

// ✓ Correct - groupBy required for groupTemplate
const ms = new MultiSelect({
  dataSource: employees,
  fields: { groupBy: 'dept' },
  groupTemplate: '<span>${dept}</span>'
});
```

## Next Steps

- **Customize Display:** See [customization-templates.md](customization-templates.md)
- **Enable Filtering:** See [filtering-search.md](filtering-search.md)
- **Create Cascading:** See [cascading-dropdowns.md](cascading-dropdowns.md)

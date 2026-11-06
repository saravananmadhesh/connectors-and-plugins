# Data Binding in MultiSelect

## Table of Contents
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Field Mapping](#field-mapping)
- [Data Formats](#data-formats)
- [Query Building](#query-building)
- [Common Issues](#common-issues)

## Local Data Binding

### Array of Strings

Simplest data binding with primitive values. Text and value are the same:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grape'];

const multiSelect = new MultiSelect({
  dataSource: fruits,
  placeholder: 'Select fruits'
});

multiSelect.appendTo('#multiselect');

// Selected values
console.log(multiSelect.value);    // ['Apple', 'Orange'] (all selections)
```

**Use Case:** Simple lists like categories, tags, or statuses

### Array of Numbers

Bind numeric data:

```typescript
const ids = [1, 2, 3, 4, 5];

const multiSelect = new MultiSelect({
  dataSource: ids,
  placeholder: 'Select ID'
});

multiSelect.appendTo('#multiselect');
```

### Array of Objects

Most common approach with field mapping:

```typescript
const employees = [
  { id: 'emp1', name: 'Alice Johnson', dept: 'Engineering', salary: 95000 },
  { id: 'emp2', name: 'Bob Smith', dept: 'Sales', salary: 75000 },
  { id: 'emp3', name: 'Charlie Brown', dept: 'Marketing', salary: 68000 }
];

const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: {
    text: 'name',        // Display text
    value: 'id',         // Selected value stored
    groupBy: 'dept',     // (Optional) Group by this field
    iconCss: 'icon'      // (Optional) Icon for each item
  },
  placeholder: 'Select employee'
});

multiSelect.appendTo('#multiselect');

// Get selected values (IDs)
const selectedIds = multiSelect.value as string[];  // ['emp1', 'emp3']

// Get full data for a selected value
const employeeData = multiSelect.getDataByValue('emp1');
// { id: 'emp1', name: 'Alice Johnson', ... }
```

## Remote Data Binding

### OData Service

Fetch data from OData endpoints:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const multiSelect = new MultiSelect({
  dataSource: dataManager,
  query: new Query().select(['CustomerID', 'ContactName']).take(10),
  fields: {
    text: 'ContactName',
    value: 'CustomerID'
  },
  placeholder: 'Select customer'
});

multiSelect.appendTo('#multiselect');
```

### RESTful API / JSON Endpoint

Fetch JSON data from custom API:

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
  crossDomain: true
});

const multiSelect = new MultiSelect({
  dataSource: dataManager,
  query: new Query().take(20),
  fields: {
    text: 'name',
    value: 'id'
  },
  placeholder: 'Select employee'
});

multiSelect.appendTo('#multiselect');
```

### Custom Data Loading

Load data based on user input or external events:

```typescript
const multiSelect = new MultiSelect({
  allowFiltering: true,
  filtering: async (e) => {
    // Fetch filtered data from API
    const response = await fetch(`/api/search?q=${e.text}`);
    const data = await response.json();
    
    // Update dropdown with filtered results
    e.updateData(data);
  }
});

multiSelect.appendTo('#multiselect');
```

## Field Mapping

### Complete Field Mapping

Map all available fields:

```typescript
const products = [
  { productId: 'P001', productName: 'Laptop', category: 'Electronics', icon: 'laptop-icon' },
  { productId: 'P002', productName: 'Mouse', category: 'Electronics', icon: 'mouse-icon' },
  { productId: 'P003', productName: 'Keyboard', category: 'Electronics', icon: 'keyboard-icon' }
];

const multiSelect = new MultiSelect({
  dataSource: products,
  fields: {
    text: 'productName',      // Display in dropdown
    value: 'productId',       // Stored as selected value
    groupBy: 'category',      // Group items by category
    iconCss: 'icon'           // Icon class for each item
  },
  placeholder: 'Select product'
});

multiSelect.appendTo('#multiselect');
```

### Critical: Field Mapping Mismatch

Always verify fields match your data structure:

```typescript
// ✗ WRONG - fields don't exist in data
const products = [{ name: 'Laptop', id: 'P001' }];
const multiSelect = new MultiSelect({
  dataSource: products,
  fields: { text: 'title', value: 'productId' }  // 'title' and 'productId' don't exist!
});

// ✓ CORRECT - fields match data keys
const multiSelect = new MultiSelect({
  dataSource: products,
  fields: { text: 'name', value: 'id' }
});
```

## Data Formats

### JSON Format

Standard JSON array of objects:

```typescript
const data = [
  { id: 1, text: 'Item 1', group: 'Group A' },
  { id: 2, text: 'Item 2', group: 'Group A' },
  { id: 3, text: 'Item 3', group: 'Group B' }
];

const multiSelect = new MultiSelect({
  dataSource: data,
  fields: { text: 'text', value: 'id', groupBy: 'group' }
});
```

### Nested Data Structure

For hierarchical data:

```typescript
const categories = [
  {
    id: 'c1',
    name: 'Electronics',
    products: [
      { id: 'p1', name: 'Laptop' },
      { id: 'p2', name: 'Phone' }
    ]
  }
];

// Note: MultiSelect doesn't directly support nested grouping
// Use field mapping with parent data at root level
const flatData = [
  { id: 'p1', name: 'Laptop', category: 'Electronics' },
  { id: 'p2', name: 'Phone', category: 'Electronics' }
];

const multiSelect = new MultiSelect({
  dataSource: flatData,
  fields: { text: 'name', value: 'id', groupBy: 'category' }
});
```

### Dynamic Data Updates

Replace data after initialization:

```typescript
let multiSelect = new MultiSelect({
  dataSource: initialData,
  fields: { text: 'name', value: 'id' }
});

multiSelect.appendTo('#multiselect');

// Later: Update data
const newData = [
  { id: 'new1', name: 'New Item 1' },
  { id: 'new2', name: 'New Item 2' }
];

multiSelect.dataSource = newData;
multiSelect.refresh();
```

## Query Building

### Query Basics

Use DataManager Query to filter and transform data:

```typescript
import { Query } from '@syncfusion/ej2-data';

const query = new Query()
  .select(['EmployeeID', 'FirstName', 'City'])  // Select specific columns
  .take(10)                                       // Limit to 10 items
  .skip(5);                                       // Skip first 5 items
```

### Filtering with Query

```typescript
const query = new Query()
  .where('City', 'equal', 'New York')                    // Exact match
  .where('Salary', 'greaterThan', 50000)                // Greater than
  .where('Name', 'startswith', 'A', true);              // Case-insensitive start with

const multiSelect = new MultiSelect({
  dataSource: dataManager,
  query: query,
  fields: { text: 'FirstName', value: 'EmployeeID' }
});
```

### Complex Queries

Combine multiple conditions:

```typescript
const query = new Query()
  .where('Department', 'equal', 'Engineering')
  .where('Salary', 'greaterThanOrEqual', 70000)
  .orderBy('Name', 'Ascending')
  .take(20);
```

## Common Issues

### Issue: Data Not Appearing in Dropdown

**Causes:**
1. Field mapping mismatch
2. Data structure incorrect
3. CSS not imported

**Solution:**

```typescript
// Debug: Log data and selected items
console.log('Data Source:', multiSelect.dataSource);
console.log('Items:', multiSelect.items);
console.log('Selected:', multiSelect.value);

// Verify field mapping
console.log('Fields Config:', multiSelect.fields);

// Try simple test data first
const testData = [
  { id: '1', name: 'Test Item' }
];
multiSelect.dataSource = testData;
multiSelect.refresh();
```

### Issue: Selected Values Not Matching

**Problem:** Selection shows but `value` property is empty  
**Cause:** Incorrect field mapping

```typescript
// ✗ Wrong
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'email' }  // 'email' doesn't exist
});

multiSelect.appendTo('#multiselect');
console.log(multiSelect.value);  // Empty or incorrect

// ✓ Correct
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' }
});
```

### Issue: Remote Data Not Loading

**Problem:** API returns data but nothing displays  
**Solution:** Verify query and adaptor

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),  // Use correct adaptor
  crossDomain: true           // Enable for CORS
});

// Add error handling
const multiSelect = new MultiSelect({
  dataSource: dataManager,
  actionFailure: (args) => {
    console.error('Data load failed:', args);
  }
});
```

### Issue: Large Dataset Performance

**Problem:** Dropdown slow with thousands of items  
**Solution:** Enable virtual scrolling

```typescript
import { MultiSelect, VirtualScroll } from '@syncfusion/ej2-dropdowns';
MultiSelect.Inject(VirtualScroll);

const multiSelect = new MultiSelect({
  dataSource: largeDataset,
  fields: { text: 'name', value: 'id' },
  enableVirtualization: true  // Enable virtual scrolling
});
```

## Next Steps

- **Work with Selection:** See [selection-modes.md](selection-modes.md)
- **Add Filtering:** See [filtering-search.md](filtering-search.md)
- **Customize Display:** See [customization-templates.md](customization-templates.md)
- **Performance:** See [virtual-scrolling.md](virtual-scrolling.md)

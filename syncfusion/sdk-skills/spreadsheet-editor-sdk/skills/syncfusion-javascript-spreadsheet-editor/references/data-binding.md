# Data Binding

Bind local or remote data to the Spreadsheet Editor. Load data into sheets and ranges using arrays, objects, or remote data sources via DataManager.

## Table of Contents

- [Minimal Code](#minimal-code)
- [Data Binding Options](#data-binding-options)
  - [Option 1: Local Data (Array of Objects)](#option-1-local-data-array-of-objects)
  - [Option 2: Remote Data (DataManager with REST/OData)](#option-2-remote-data-datamanager-with-restodata)
  - [Option 3: Custom Column Order with fieldsOrder](#option-3-custom-column-order-with-fieldsorder)
  - [Option 4: Custom Cell Content with Template](#option-4-custom-cell-content-with-template)
- [Loading Data from External Files](#loading-data-from-external-files)
  - [From JSON File](#from-json-file)
  - [From TypeScript/JavaScript File](#from-typescriptjavascript-file)
  - [From CSV File (Fetch & Parse)](#from-csv-file-fetch--parse)
  - [Dynamic File Selection & Loading](#dynamic-file-selection--loading)
- [Configuration Properties](#configuration-properties)
- [Placeholders](#placeholders)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
  - [Bind Data at Initialization](#bind-data-at-initialization)
  - [Dynamic Data Update](#dynamic-data-update)
  - [Pagination with Remote Data](#pagination-with-remote-data)

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet = new Spreadsheet({
  sheets: [{ name: 'Sheet1' }]
});

spreadsheet.appendTo('#spreadsheet');

// Bind local data to a sheet
const data = [
  { Name: 'John', Age: 30, Salary: 50000 },
  { Name: 'Jane', Age: 28, Salary: 55000 },
  { Name: 'Bob', Age: 35, Salary: 60000 }
];

spreadsheet.sheets[0].ranges = [{
  dataSource: data,
  startCell: 'A1'
}];
```

## Data Binding Options

### Option 1: Local Data (Array of Objects)

```typescript
// Most common approach — bind array of objects directly
const localData = [
  { Product: 'Laptop', Price: 1200, Quantity: 5 },
  { Product: 'Mouse', Price: 25, Quantity: 20 },
  { Product: 'Keyboard', Price: 80, Quantity: 10 }
];

spreadsheet.sheets[0].ranges = [{
  dataSource: localData,
  startCell: 'A1',
  showFieldAsHeader: true    // Auto-create headers from object keys
}];
```

### Option 2: Remote Data (DataManager with REST/OData)

```typescript
import { DataManager, Query } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  // SECURITY: Validate URL against allowlist of trusted domains before use
  url: 'url',           // Replace with actual endpoint
  adaptor: 'WebApiAdaptor'    // Options: 'WebApiAdaptor', 'ODataV4Adaptor', 'JsonAdaptor'
});

const query = new Query()
  .take([ROW_COUNT])          // Limit number of rows
  .skip([SKIP_COUNT])         // Skip rows (pagination)
  .select(['[FIELD_1]', '[FIELD_2]']);  // Select specific fields

spreadsheet.sheets[0].ranges = [{
  dataSource: dataManager,
  query: query,
  startCell: '[START_CELL]',
  showFieldAsHeader: true
}];
```

### Option 3: Custom Column Order with fieldsOrder

```typescript
// Bind data with custom field order (columns won't follow sequential field order)
const productData = [
  { ProductId: 1, ProductName: 'Laptop', Category: 'Electronics', Price: 1200, Stock: 5 },
  { ProductId: 2, ProductName: 'Mouse', Category: 'Accessories', Price: 25, Stock: 20 }
];

spreadsheet.sheets[0].ranges = [{
  dataSource: productData,
  startCell: '[START_CELL]',
  showFieldAsHeader: true,
  fieldsOrder: ['ProductName', 'Category', 'Price', 'Stock']  // Custom column order (ProductId hidden)
}];
```

### Option 4: Custom Cell Content with Template

```typescript
// Use template to format or transform cell content
const salesData = [
  { Product: 'Laptop', Amount: 1200, Status: 'Active' },
  { Product: 'Mouse', Amount: 25, Status: 'Inactive' }
];

spreadsheet.sheets[0].ranges = [{
  dataSource: salesData,
  startCell: '[START_CELL]',
  showFieldAsHeader: true,
  template: '<span style="color: ${Status === "Active" ? "green" : "red"}">${Product}</span>'
}];
```

## Loading Data from External Files

### From JSON File

**File: `data/products.json`**
```json
[
  { "Product": "Laptop", "Price": 1200, "Quantity": 5 },
  { "Product": "Mouse", "Price": 25, "Quantity": 20 },
  { "Product": "Keyboard", "Price": 80, "Quantity": 10 }
]
```

**Import and bind in TypeScript:**
```typescript
import [DATA_VARIABLE] from '[JSON_FILE_PATH]';

const spreadsheet = new Spreadsheet({
  sheets: [{ name: 'Sheet1' }]
});

spreadsheet.appendTo('#spreadsheet');

spreadsheet.sheets[0].ranges = [{
  dataSource: [DATA_VARIABLE],
  startCell: '[START_CELL]',
  showFieldAsHeader: true
}];
```

### From TypeScript/JavaScript File

**File: `data/salesData.ts`**
```typescript
export const salesData = [
  { Name: 'Product A', Sales: 1000, Quarter: 'Q1' },
  { Name: 'Product B', Sales: 1500, Quarter: 'Q1' },
  { Name: 'Product C', Sales: 2000, Quarter: 'Q2' }
];

export const employeeData = [
  { Employee: 'John', Department: 'Sales', Salary: 50000 },
  { Employee: 'Jane', Department: 'HR', Salary: 55000 }
];
```

**Import and bind:**
```typescript
import { [DATA_VARIABLE] } from '[DATA_FILE_PATH]';

spreadsheet.sheets[0].ranges = [{
  dataSource: [DATA_VARIABLE],
  startCell: '[START_CELL]',
  showFieldAsHeader: true
}];
```

### From CSV File (Fetch & Parse)

```typescript
// Fetch CSV file and parse into array of objects
async function loadCSVData(csvFilePath: string) {
  // SECURITY: Validate URL against allowlist of trusted domains before use
  const response = await fetch(csvFilePath);
  const csvText = await response.text();
  
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
  
  return data;
}

// Use the function
const csvData = await loadCSVData('[CSV_FILE_PATH]');

spreadsheet.sheets[0].ranges = [{
  dataSource: csvData,
  startCell: '[START_CELL]',
  showFieldAsHeader: true
}];
```

### Dynamic File Selection & Loading

```typescript
// Load different data files based on user selection
const dataFiles: Record<string, string> = {
  'sales': '[SALES_DATA_PATH]',
  'employees': '[EMPLOYEE_DATA_PATH]',
  'inventory': '[INVENTORY_DATA_PATH]'
};

async function loadDataByType(type: string) {
  const filePath = dataFiles[type];
  // SECURITY: Validate URL against allowlist of trusted domains before use
  const response = await fetch(filePath);
  const data = await response.json();
  
  spreadsheet.sheets[0].ranges = [{
    dataSource: data,
    startCell: '[START_CELL]',
    showFieldAsHeader: true
  }];
}

// Usage
await loadDataByType('sales');  // Loads sales data
await loadDataByType('employees');  // Loads employee data
```

## Configuration Properties

| Property | Type | Default | Description | Example |
|---|---|---|---|---|
| `dataSource` | Object[] \| DataManager | null | Data source to bind (array of objects or DataManager instance) | `[{id: 1, name: 'John'}]` |
| `startCell` | string | 'A1' | Starting cell reference for data binding | `'A1'`, `'B2'`, `'C5'` |
| `showFieldAsHeader` | boolean | true | Show/hide field names as header row | `true`, `false` |
| `query` | Query | null | External Query for data filtering and processing | `new Query().take(50).skip(0)` |
| `fieldsOrder` | string[] | null | Customize column order by specifying field names | `['Product', 'Price', 'Quantity']` |
| `template` | string \| Function | '' | Template for custom cell content (HTML string or function) | `'<span>${ProductName}</span>'` |
| `address` | string | 'A1' | Cell range address (alternative to startCell) | `'A1:D100'`, `'Sheet1!A1:D100'` |

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[DATA_SOURCE]` | Array of objects or DataManager instance | `[{id: 1, name: 'John', age: 30}]` |
| `[DATA_VARIABLE]` | Imported variable name from file | `salesData`, `productList`, `employeeData` |
| `[JSON_FILE_PATH]` | Relative path to JSON file | `'./data/products.json'`, `'../assets/sales.json'` |
| `[DATA_FILE_PATH]` | Relative path to TypeScript/JS file | `'./data/salesData'`, `'../services/dataProvider'` |
| `[CSV_FILE_PATH]` | Relative path to CSV file | `'./data/products.csv'`, `'./exports/inventory.csv'` |
| `[API_URL]` | REST API or OData endpoint URL | `'https://example.com'` |
| `[ROW_COUNT]` | Number of rows to retrieve | `100`, `500`, `1000` |
| `[SKIP_COUNT]` | Number of rows to skip (pagination) | `0`, `50`, `100` |
| `[FIELD_1]`, `[FIELD_2]` | Field names to include in query | `'Product'`, `'Price'`, `'Category'` |
| `[START_CELL]` | Cell reference where data begins | `'A1'`, `'A2'`, `'C5'` |
| `[SALES_DATA_PATH]` | Path to sales data file | `'./data/sales.json'` |
| `[EMPLOYEE_DATA_PATH]` | Path to employee data file | `'./data/employees.json'` |
| `[INVENTORY_DATA_PATH]` | Path to inventory data file | `'./data/inventory.json'` |

## Best Practices

- **Use object arrays** — Most flexible and maintainable format
- **Include headers** — Set `showFieldAsHeader: true` for automatic header generation
- **Custom column order** — Use `fieldsOrder` to control which fields display and in what order
- **Optimize large datasets** — Use DataManager with pagination (take/skip) for performance
- **Match field names** — Ensure data field names match exactly with fieldsOrder specification
- **Handle null values** — Null/undefined values display as empty cells (expected behavior)
- **Use Query for filtering** — Apply Query methods (take, skip, select, where) for remote data
- **Format cells with templates** — Use `template` property for custom cell content and formatting

## Common Scenarios

### Bind Data at Initialization
```typescript
const spreadsheet = new Spreadsheet({
  sheets: [{
    name: 'Sales',
    ranges: [{ dataSource: [DATA_SOURCE], startCell: '[START_CELL]' }]
  }]
});
```

### Dynamic Data Update
```typescript
// Update data after spreadsheet creation
spreadsheet.sheets[0].ranges = [{
  dataSource: [NEW_DATA_SOURCE],
  startCell: '[START_CELL]'
}];
```

### Pagination with Remote Data
```typescript
const query = new Query()
  .take([ROW_COUNT])
  .skip([SKIP_COUNT])
  .select(['[FIELD_1]', '[FIELD_2]']);

spreadsheet.sheets[0].ranges = [{
  dataSource: dataManager,
  query: query,
  startCell: '[START_CELL]'
}];
```

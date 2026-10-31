---
title: Query Building and Operators
---

# Querying with DataManager

## Table of Contents
- [Basic Query Methods](#basic-query-methods)
- [Where Operators](#where-operators-filtering)
- [Sorting](#sorting)
- [Paging](#paging)
- [Grouping & Aggregation](#grouping--aggregation)
- [Selection & Expansion](#selection--expansion)
- [Complex Queries](#complex-queries)

---

## Basic Query Methods

### Creating Queries

```typescript
import { DataManager, Query } from '@syncfusion/ej2-data';

const dm = new DataManager([
  { id: 1, name: 'Alice', salary: 50000, dept: 'Sales' },
  { id: 2, name: 'Bob', salary: 80000, dept: 'Engineering' },
  { id: 3, name: 'Charlie', salary: 55000, dept: 'Sales' }
]);

// New query
const query = new Query();

// Execute
dm.executeLocal(query).then(result => {
  console.log(result.result);  // All records
});
```

### from() - Table Name

```typescript
// For remote data with table specification
const query = new Query()
  .from('Orders')  // Table/collection name
  .take(10);

// REST: /api/Orders?$top=10
```

### execute() - Run Query

```typescript
const query = new Query()
  .where('Status', 'equal', 'Active')
  .take(10);

// Local execution (filters in-memory)
await dm.executeLocal(query);

// Remote execution (sends to server)
await dm.executeQuery(query);
```

---

## Where Operators (Filtering)

### Supported Operators

| Operator | SQL | Example |
|----------|-----|---------|
| `equal` | = | `.where('Status', 'equal', 'Active')` |
| `notEqual` | != | `.where('Status', 'notEqual', 'Inactive')` |
| `greaterThan` | > | `.where('Salary', 'greaterThan', 50000)` |
| `greaterThanOrEqual` | >= | `.where('Score', 'greaterThanOrEqual', 90)` |
| `lessThan` | < | `.where('Age', 'lessThan', 30)` |
| `lessThanOrEqual` | <= | `.where('Age', 'lessThanOrEqual', 65)` |
| `startsWith` | LIKE '%abc' | `.where('Name', 'startsWith', 'John')` |
| `endsWith` | LIKE 'abc%' | `.where('Email', 'endsWith', '@gmail.com')` |
| `contains` | LIKE '%abc%' | `.where('Description', 'contains', 'urgent')` |
| `in` | IN (...) | `.where('Status', 'in', ['Active', 'Pending'])` |
| `notIn` | NOT IN (...) | `.where('Status', 'notIn', ['Closed', 'Archived'])` |

### Examples

```typescript
// Equal
await dm.executeLocal(
  new Query().where('Department', 'equal', 'Sales')
);
// Selects all Sales department employees

// Greater than
await dm.executeLocal(
  new Query().where('Salary', 'greaterThan', 60000)
);
// Selects employees with salary > 60000

// String matching
await dm.executeLocal(
  new Query().where('Email', 'endsWith', '@company.com')
);
// Selects company emails

// In list
await dm.executeLocal(
  new Query().where('Status', 'in', ['Active', 'Pending', 'Review'])
);
// Selects records matching any status
```

### Conditional AND/OR

```typescript
// AND conditions (both must be true)
await dm.executeLocal(
  new Query()
    .where('Department', 'equal', 'Sales')
    .where('Salary', 'greaterThan', 50000)
);
// Sales department AND Salary > 50000

// OR conditions (either can be true)
await dm.executeLocal(
  new Query()
    .where('Department', 'equal', 'Sales')
    .or('Department', 'equal', 'Marketing')
);
// Sales OR Marketing department

// Complex AND/OR
await dm.executeLocal(
  new Query()
    .where('Department', 'equal', 'Sales')
    .where('Salary', 'greaterThan', 50000)
    .or('Department', 'equal', 'Marketing')
);
// (Sales AND Salary > 50000) OR Marketing
```

### Case Sensitivity

```typescript
// Case-insensitive comparison (database dependent)
// Most backends handle this, but check your backend

// For guaranteed case-insensitive:
const name = 'john';
const query = new Query()
  .where('Name', 'contains', name);  // Backend may handle case

// Client-side case-insensitive
dm.executeLocal(
  new Query()
    .where('Name', 'startsWith', 'John')  // Case-sensitive local
);
```

---

## Sorting

### Sort Ascending

```typescript
// Single sort
await dm.executeLocal(
  new Query()
    .sortBy('Name')  // A-Z
);

// Multiple sorts
await dm.executeLocal(
  new Query()
    .sortBy('Department')
    .sortBy('Salary')
);
// First by Department, then by Salary within each Dept
```

### Sort Descending

```typescript
// Single descending
await dm.executeLocal(
  new Query()
    .sortByDescending('Salary')  // Highest first
);

// Mixed ascending/descending
await dm.executeLocal(
  new Query()
    .sortBy('Department')
    .sortByDescending('Salary')
);
// By Department (A-Z), then by Salary (High to Low)
```

### Sorting Examples

```typescript
const dm = new DataManager([
  { id: 1, name: 'Alice', salary: 50000, hireDate: '2021-01-15' },
  { id: 2, name: 'Bob', salary: 80000, hireDate: '2020-06-20' },
  { id: 3, name: 'Charlie', salary: 55000, hireDate: '2021-03-10' }
]);

// Sort by hire date (earliest first)
dm.executeLocal(new Query().sortBy('hireDate'));
// Bob (2020-06), Alice (2021-01), Charlie (2021-03)

// Latest hires first
dm.executeLocal(new Query().sortByDescending('hireDate'));
// Charlie (2021-03), Alice (2021-01), Bob (2020-06)
```

---

## Paging

### Skip and Take

```typescript
// Skip first 10, take next 10
await dm.executeLocal(
  new Query()
    .skip(10)
    .take(10)
);
// Records 11-20

// Equivalent to:
// Page 2 of 10 items per page
const pageSize = 10;
const pageNumber = 2;
new Query()
  .skip((pageNumber - 1) * pageSize)
  .take(pageSize);
```

### Pagination Pattern

```typescript
class PaginationManager {
  private pageSize = 20;
  private totalRecords = 0;

  async fetchPage(pageNumber) {
    const dm = new DataManager({
      url: '/api/orders',
      adaptor: new UrlAdaptor()
    });

    const result = await dm.executeQuery(
      new Query()
        .skip((pageNumber - 1) * this.pageSize)
        .take(this.pageSize)
    );

    this.totalRecords = result.count;
    return {
      records: result.result,
      pageNumber: pageNumber,
      pageSize: this.pageSize,
      totalPages: Math.ceil(result.count / this.pageSize)
    };
  }

  get totalPages() {
    return Math.ceil(this.totalRecords / this.pageSize);
  }
}

// Usage
const paginationMgr = new PaginationManager();
const page1 = await paginationMgr.fetchPage(1);
console.log(`Page 1 of ${page1.totalPages}`);
```

---

## Grouping & Aggregation

### Group By

```typescript
// Group by Department
await dm.executeLocal(
  new Query()
    .group('Department')
);

// Output structure:
// [
//   { key: 'Sales', items: [...], count: 5 },
//   { key: 'Engineering', items: [...], count: 3 },
//   { key: 'HR', items: [...], count: 2 }
// ]
```

### Aggregate Functions

```typescript
// Sum aggregate
await dm.executeLocal(
  new Query()
    .aggregate('sum', 'Salary')
);

// Count
await dm.executeLocal(
  new Query()
    .aggregate('count', 'id')
);

// Average
await dm.executeLocal(
  new Query()
    .aggregate('average', 'Salary')
);

// Multiple aggregates
await dm.executeLocal(
  new Query()
    .group('Department')
    .aggregate('sum', 'Salary')
    .aggregate('count', 'id')
    .aggregate('average', 'Salary')
);

// Result: { Sum: 250000, Count: 5, Average: 50000 }
```

### Grouping with Aggregation

```typescript
const data = [
  { dept: 'Sales', name: 'Alice', salary: 50000 },
  { dept: 'Sales', name: 'Bob', salary: 60000 },
  { dept: 'Engineering', name: 'Charlie', salary: 80000 }
];

const dm = new DataManager(data);

// Sales total salary
const result = await dm.executeLocal(
  new Query()
    .where('dept', 'equal', 'Sales')
    .aggregate('sum', 'salary')
);

// Output: { Sum: 110000, Count: 2 }
```

---

## Selection & Expansion

### Select Specific Columns

```typescript
// Select only needed columns (OData)
const result = await dm.executeQuery(
  new Query()
    .select('OrderID', 'CustomerID', 'OrderDate')
    .take(10)
);

// Returns only those 3 fields
// { OrderID: 1, CustomerID: 'ABC', OrderDate: '2024-01-01' }
```

### Expand Related Data

```typescript
const dm = new DataManager({
  url: 'services.odata.org/V4/Northwind/Northwind.svc/Orders',
  adaptor: new ODataV4Adaptor()
});

// Expand related Customer record
const result = await dm.executeQuery(
  new Query()
    .from('Orders')
    .expand('Customer')  // Include related Customer
    .select('OrderID', 'Customer/CompanyName')
    .take(5)
);

// Result includes nested Customer data
// { OrderID: 1, Customer: { CompanyName: 'Acme Corp' } }
```

---

## Complex Queries

### Real-world Example 1: Sales Report

```typescript
// Get Q1 sales by region with totals
const dm = new DataManager({
  url: '/api/sales',
  adaptor: new UrlAdaptor()
});

const result = await dm.executeQuery(
  new Query()
    .where('Month', 'in', [1, 2, 3])  // January-March
    .where('Year', 'equal', 2024)
    .where('Amount', 'greaterThan', 1000)  // Minimum sale
    .group('Region')
    .aggregate('sum', 'Amount')
    .sortByDescending('Amount')
    .take(10)
);

console.log('Top 10 regions by Q1 sales:');
result.result.forEach(region => {
  console.log(`${region.key}: $${region.Sum}`);
});
```

### Real-world Example 2: Search and Filter

```typescript
// Search products
const dm = new DataManager({
  url: '/api/products',
  adaptor: new WebApiAdaptor()
});

function searchProducts(searchTerm, category, maxPrice) {
  return dm.executeQuery(
    new Query()
      .where('Name', 'contains', searchTerm)
      .where('Category', 'equal', category)
      .where('Price', 'lessThanOrEqual', maxPrice)
      .sortByDescending('Popularity')
      .skip(0)
      .take(20)
  );
}

// Usage
const results = await searchProducts('laptop', 'Electronics', 1500);
console.log(`Found ${results.count} products`);
```

### Real-world Example 3: Employee Directory with Pagination

```typescript
async function getEmployeeDirectory(pageNumber = 1, searchQuery = '') {
  const dm = new DataManager({
    url: '/api/employees',
    adaptor: new UrlAdaptor()
  });

  const pageSize = 25;
  const baseQuery = new Query()
    .select('EmployeeID', 'Name', 'Title', 'Department')
    .sortBy('Name')
    .skip((pageNumber - 1) * pageSize)
    .take(pageSize);

  // Add search filter if provided
  if (searchQuery) {
    baseQuery.where('Name', 'contains', searchQuery)
      .or('Title', 'contains', searchQuery);
  }

  const result = await dm.executeQuery(baseQuery);

  return {
    employees: result.result,
    totalCount: result.count,
    pageNumber: pageNumber,
    pageSize: pageSize,
    totalPages: Math.ceil(result.count / pageSize)
  };
}

// Get page 2 of employees with "Sales" in name or title
const page = await getEmployeeDirectory(2, 'Sales');
console.log(`Page ${page.pageNumber} of ${page.totalPages}`);
```

---

## Query Chaining

### Building Queries Step by Step

```typescript
let query = new Query();

if (filters.department) {
  query = query.where('Department', 'equal', filters.department);
}

if (filters.minSalary) {
  query = query.where('Salary', 'greaterThanOrEqual', filters.minSalary);
}

if (filters.maxSalary) {
  query = query.where('Salary', 'lessThanOrEqual', filters.maxSalary);
}

if (filters.sortBy) {
  query = query.sortBy(filters.sortBy);
}

const page = filters.pageNumber || 1;
const pageSize = filters.pageSize || 10;
query = query.skip((page - 1) * pageSize).take(pageSize);

const result = await dm.executeQuery(query);
```

---

## Performance Tips for Queries

1. **Filter server-side** (remote) when possible
2. **Limit results with take()** - always use pagination
3. **Sort on server** before downloading
4. **Select only needed columns** to reduce payload
5. **Use appropriate operators** - `in` faster than multiple `or`
6. **Avoid nested queries** - flatten to single query

---

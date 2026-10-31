---
title: Querying and Filtering in Syncfusion Angular DataManager
---

# Querying and Filtering in Syncfusion Angular DataManager

## Table of Contents

- [Overview](#overview)
- [Query Class Fundamentals](#query-class-fundamentals)
- [Filtering with where()](#filtering-with-where)
- [Sorting Operations](#sorting-operations)
- [Pagination Methods](#pagination-methods)
- [Selection and Grouping](#selection-and-grouping)
- [Search Functionality](#search-functionality)
- [Combining Operations](#combining-operations)
- [Predicate-based Filtering](#predicate-based-filtering)

---

## Overview

The **Query** class is the core tool for manipulating data. It provides methods to:

- **Filter** data by conditions
- **Sort** by one or multiple columns
- **Paginate** results
- **Group** by fields
- **Select** specific columns
- **Search** across data

All methods are chainable, allowing combination of multiple operations.

---

## Query Class Fundamentals

### Creating a Query

```typescript
import { Query } from '@syncfusion/ej2-data';

// Empty query (returns all)
const query = new Query();

// With from() - define data source
const query2 = new Query().from('table_name');

// With select() - choose columns
const query3 = new Query().select(['OrderID', 'CustomerID']);
```

### Using from() Method

```typescript
// Specifies the data source table/entity
const query = new Query()
  .from('Orders')       // Data source
  .select(['OrderID', 'CustomerID']);

// Used with remote data sources supporting multiple tables
```

---

## Filtering with where()

### Simple Equality

```typescript
import { DataManager, Query, JsonAdaptor } from '@syncfusion/ej2-data';

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'VINET', Freight: 65.83 }
];

const dm = new DataManager({ json: data, adaptor: new JsonAdaptor() });

// Filter: where CustomerID equals 'VINET'
const result = dm.executeLocal(
  new Query().where('CustomerID', 'equal', 'VINET')
);
// Result: 2 records with VINET
```

### Comparison Operators

```typescript
// Greater than
new Query().where('Freight', 'greaterThan', 50)

// Less than
new Query().where('OrderID', 'lessThan', 10250)

// Greater than or equal
new Query().where('Freight', 'greaterThanOrEqual', 30)

// Less than or equal
new Query().where('OrderID', 'lessThanOrEqual', 10249)

// Not equal
new Query().where('CustomerID', 'notEqual', 'VINET')
```

### String Operators

```typescript
// Starts with
new Query().where('CustomerID', 'startswith', 'V')

// Ends with
new Query().where('CustomerID', 'endswith', 'NET')

// Contains
new Query().where('CustomerID', 'contains', 'IN')

// Not contains
new Query().where('CustomerID', 'notcontains', 'ABC')
```

### Multiple Filters (AND)

```typescript
const result = dm.executeLocal(
  new Query()
    .where('CustomerID', 'equal', 'VINET')
    .where('Freight', 'greaterThan', 30)
);
// Both conditions must be true

// Equivalent: CustomerID = 'VINET' AND Freight > 30
```

### Multiple Filters (OR)

```typescript
const result = dm.executeLocal(
  new Query().where(
    new Predicate('CustomerID', 'equal', 'VINET')
      .or('CustomerID', 'equal', 'TOMSP')
  )
);
// Either condition can be true

// Equivalent: CustomerID = 'VINET' OR CustomerID = 'TOMSP'
```

---

## Sorting Operations

### Basic Sort (Ascending)

```typescript
// Sort by Freight ascending (smallest to largest)
const result = dm.executeLocal(
  new Query().sortBy('Freight')
);
```

### Descending Sort

```typescript
// Sort by OrderID descending (largest to smallest)
const result = dm.executeLocal(
  new Query().sortByDesc('OrderID')
);
```

### Multiple Sort Fields

```typescript
// Sort by CustomerID (ascending), then by Freight (descending)
const result = dm.executeLocal(
  new Query()
    .sortBy('CustomerID')
    .sortByDesc('Freight')
);
```

### Practical Example

```typescript
const query = new Query()
  .where('Freight', 'greaterThan', 20)
  .sortBy('CustomerID')
  .sortByDesc('Freight');

const result = dm.executeLocal(query);
```

---

## Pagination Methods

### take() - Limit Results

```typescript
// Get first 10 records
const result = dm.executeLocal(
  new Query().take(10)
);
```

### skip() - Skip Records

```typescript
// Skip first 20, get next 10
const result = dm.executeLocal(
  new Query().skip(20).take(10)
);
```

### Complete Pagination Pattern

```typescript
// Page 1: records 0-9
const page1 = dm.executeLocal(
  new Query().take(10)
);

// Page 2: records 10-19
const page2 = dm.executeLocal(
  new Query().skip(10).take(10)
);

// Page 3: records 20-29
const page3 = dm.executeLocal(
  new Query().skip(20).take(10)
);
```

---

## Selection and Grouping

### select() - Choose Columns

```typescript
// Select specific columns only
const result = dm.executeLocal(
  new Query().select(['OrderID', 'CustomerID', 'Freight'])
);
// Result objects contain only these 3 properties
```

### group() - Group by Field

```typescript
// Group records by CustomerID
const result = dm.executeLocal(
  new Query().group('CustomerID')
);

// Result: Objects grouped by CustomerID value
// [
//   { key: 'VINET', items: [...] },
//   { key: 'TOMSP', items: [...] },
//   ...
// ]
```

### aggregate() - Calculate Values

```typescript
import { AggregateType } from '@syncfusion/ej2-data';

// Calculate sum, average, count
const result = dm.executeLocal(
  new Query()
    .aggregate('sum', 'Freight')
    .aggregate('average', 'Freight')
);
```

---

## Search Functionality

### search() Method

```typescript
// Simple search across all fields
const result = dm.executeLocal(
  new Query().search('VINET', ['CustomerID', 'ShipCity'])
);
// Searches for 'VINET' in CustomerID and ShipCity fields

// Equivalent: CustomerID contains 'VINET' OR ShipCity contains 'VINET'
```

### Case-Insensitive Search

```typescript
// Search is case-insensitive by default
const result = dm.executeLocal(
  new Query().search('vinet', ['CustomerID'])
); // Matches 'VINET', 'Vinet', 'vinet'
```

---

## Combining Operations

### Complete Example: Filter, Select, Sort, Paginate

```typescript
const query = new Query()
  // Filter conditions
  .where('Freight', 'greaterThan', 20)
  .where('CustomerID', 'startswith', 'V')
  // Select specific columns
  .select(['OrderID', 'CustomerID', 'Freight'])
  // Sort
  .sortBy('Freight')
  // Pagination
  .skip(0)
  .take(10);

const result = dm.executeLocal(query);
```

### Progressive Building

```typescript
const filters = new Query()
  .where('Freight', 'greaterThan', 20)
  .where('CustomerID', 'startswith', 'V');

const sorted = filters
  .sortBy('OrderID');

const paginated = sorted
  .skip(0)
  .take(10);

const result = dm.executeLocal(paginated);
```

### Complex Multi-Field Filtering

```typescript
const result = dm.executeLocal(
  new Query()
    .where('Status', 'equal', 'Active')
    .where('Priority', 'greaterThan', 2)
    .where('AssignedTo', 'notEqual', 'Unassigned')
    .select(['ID', 'Title', 'Status', 'Priority'])
    .sortByDesc('Priority')
    .take(20)
);
```

---

## Predicate-based Filtering

### Using Predicate Class

```typescript
import { Predicate } from '@syncfusion/ej2-data';

// Single predicate
const predicate = new Predicate('CustomerID', 'equal', 'VINET');
const result = dm.executeLocal(new Query().where(predicate));

// AND combination (both must be true)
const predicate2 = new Predicate('CustomerID', 'equal', 'VINET')
  .and('Freight', 'greaterThan', 30);

// OR combination (either can be true)
const predicate3 = new Predicate('CustomerID', 'equal', 'VINET')
  .or('CustomerID', 'equal', 'TOMSP');

// Complex logic
const predicate4 = new Predicate('Status', 'equal', 'Active')
  .and('Priority', 'greaterThan', 2)
  .or('IsUrgent', 'equal', true);

const result = dm.executeLocal(new Query().where(predicate4));
```

### Nested Predicates

```typescript
const p1 = new Predicate('CustomerID', 'equal', 'VINET')
  .or('CustomerID', 'equal', 'TOMSP');

const p2 = new Predicate('Freight', 'greaterThan', 20)
  .or('Freight', 'lessThan', 10);

const combined = p1.and(p2);

const result = dm.executeLocal(new Query().where(combined));
```

---

## Remote Query Example

### Server-side Filtering and Sorting

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

// Server processes these operations
dataManager.executeQuery(
  new Query()
    .select(['OrderID', 'CustomerID', 'Freight'])
    .where('Freight', 'greaterThan', 30)
    .sortBy('OrderID')
    .take(10)
)
  .then((result) => {
    console.log('Filtered results:', result.result);
    console.log('Total count:', result.count);
  });
```

---

## Practical Example: Orders Grid

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, Query, JsonAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-orders-grid',
  template: `
    <div>
      <div>
        <label>Filter by Customer:
          <select (change)="filterCustomer($event)">
            <option value="">All</option>
            <option value="VINET">VINET</option>
            <option value="TOMSP">TOMSP</option>
          </select>
        </label>
        <label>Min Freight:
          <input type="number" [(ngModel)]="minFreight" 
                 (change)="applyFilters()">
        </label>
        <button (click)="applyFilters()">Apply</button>
      </div>
      <table>
        <thead>
          <tr>
            <th (click)="sort('OrderID')">Order ID</th>
            <th (click)="sort('CustomerID')">Customer</th>
            <th (click)="sort('Freight')">Freight</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of filteredOrders">
            <td>{{ order.OrderID }}</td>
            <td>{{ order.CustomerID }}</td>
            <td>{{ order.Freight | currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class OrdersGridComponent implements OnInit {
  public allOrders = [
    { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerID: 'VINET', Freight: 65.83 }
  ];

  public filteredOrders = [];
  public selectedCustomer = '';
  public minFreight = 0;
  public sortField = 'OrderID';

  dm = new DataManager({ json: this.allOrders, adaptor: new JsonAdaptor() });

  ngOnInit(): void {
    this.applyFilters();
  }

  filterCustomer(event: any): void {
    this.selectedCustomer = event.target.value;
    this.applyFilters();
  }

  applyFilters(): void {
    let query = new Query();

    if (this.selectedCustomer) {
      query = query.where('CustomerID', 'equal', this.selectedCustomer);
    }

    if (this.minFreight > 0) {
      query = query.where('Freight', 'greaterThan', this.minFreight);
    }

    query = query.sortBy(this.sortField);

    this.filteredOrders = this.dm.executeLocal(query);
  }

  sort(field: string): void {
    this.sortField = field;
    this.applyFilters();
  }
}
```

---

## Query Methods Reference

| Method | Purpose | Example |
|--------|---------|---------|
| `where()` | Add filter condition | `.where('id', 'equal', 5)` |
| `select()` | Choose columns | `.select(['id', 'name'])` |
| `sortBy()` | Sort ascending | `.sortBy('name')` |
| `sortByDesc()` | Sort descending | `.sortByDesc('date')` |
| `take()` | Limit results | `.take(10)` |
| `skip()` | Skip records | `.skip(20)` |
| `search()` | Search text | `.search('query', ['field1'])` |
| `group()` | Group by field | `.group('category')` |
| `aggregate()` | Calculate values | `.aggregate('sum', 'amount')` |

---

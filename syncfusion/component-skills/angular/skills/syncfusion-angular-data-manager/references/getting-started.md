---
title: Getting Started with Syncfusion Angular DataManager
---

# Getting Started with Syncfusion Angular DataManager

## Table of Contents

- [Installation](#installation)
- [Package Dependencies](#package-dependencies)
- [TypeScript Imports](#typescript-imports)
- [Creating Your First DataManager](#creating-your-first-datamanager)
- [executeLocal vs executeQuery](#executelocal-vs-executequery)
- [Handling Results](#handling-results)

---

## Installation

Install the Syncfusion data module using npm:

```bash
npm install @syncfusion/ej2-data
```

### Verify Installation

Check your package.json to confirm the package is listed:

```json
{
  "dependencies": {
    "@syncfusion/ej2-data": "^20.0.0 or higher"
  }
}
```

---

## Package Dependencies

The `@syncfusion/ej2-data` package includes:

- **DataManager** — Core data management class
- **Query** — Query builder for filtering, sorting, paging
- **Adaptors** — Multiple adaptor types (Json, OData, Rest, etc.)
- **ReturnOption** — TypeScript interface for results

### Optional Dependencies

For HTTP requests, install Angular's HTTP client:

```bash
npm install @angular/common
```

---

## TypeScript Imports

### Basic Imports for Local Data

```typescript
import { DataManager, Query, JsonAdaptor } from '@syncfusion/ej2-data';

// For results type safety
import { ReturnOption } from '@syncfusion/ej2-data';
```

### Imports for Remote Data

```typescript
import { 
  DataManager, 
  Query, 
  WebApiAdaptor,  // or ODataAdaptor, UrlAdaptor, etc.
  ReturnOption 
} from '@syncfusion/ej2-data';
```

### Complete Component Imports

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
  DataManager, 
  Query, 
  WebApiAdaptor, 
  ReturnOption 
} from '@syncfusion/ej2-data';
```

---

## Creating Your First DataManager

### Local Data (JSON Array)

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, Query, JsonAdaptor, ReturnOption } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-local-data',
  templateUrl: './local-data.component.html'
})
export class LocalDataComponent implements OnInit {
  public items: object[];

  ngOnInit(): void {
    // Step 1: Define local data
    const data = [
      { OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5 },
      { OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6 },
      { OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4 }
    ];

    // Step 2: Create DataManager
    const dataManager = new DataManager({
      json: data,
      adaptor: new JsonAdaptor()
    });

    // Step 3: Execute query
    const result = dataManager.executeLocal(new Query().take(2));
    this.items = result;
  }
}
```

### Remote Data (API Endpoint)

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, Query, WebApiAdaptor, ReturnOption } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-remote-data',
  templateUrl: './remote-data.component.html'
})
export class RemoteDataComponent implements OnInit {
  public items: object[];

  ngOnInit(): void {
    // Step 1: Create DataManager with remote URL
    const dataManager = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    // Step 2: Execute query
    dataManager.executeQuery(new Query().take(5))
      .then((e: ReturnOption) => {
        this.items = e.result;
      })
      .catch((error: any) => {
        console.error('Error:', error);
      });
  }
}
```

---

## executeLocal vs executeQuery

### executeLocal — Client-side Processing

**Use when:**
- Data is already in memory (JSON array)
- You want instant operations without server calls
- Working offline

```typescript
const data = [
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' }
];

const dm = new DataManager({ json: data, adaptor: new JsonAdaptor() });

// Returns immediately (synchronous)
const result = dm.executeLocal(
  new Query().where('id', 'greaterThan', 1)
);
// result = [{ id: 2, name: 'Product B' }, { id: 3, name: 'Product C' }]
```

### executeQuery — Server-side Processing

**Use when:**
- Data is on remote server
- You need server-side filtering/sorting
- Large datasets (pagination on server)

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

// Returns Promise (asynchronous)
dm.executeQuery(new Query().take(10))
  .then((result: ReturnOption) => {
    console.log(result.result); // Array of records
    console.log(result.count);  // Total record count
  })
  .catch((error) => console.error(error));
```

### Key Differences Table

| Aspect | executeLocal | executeQuery |
|--------|-------------|-------------|
| **Data Source** | In-memory JSON | Remote server |
| **Processing** | Client-side | Server-side |
| **Return Type** | Direct array | Promise |
| **Speed** | Instant | Network delay |
| **Best For** | Small datasets | Large datasets |
| **Offline** | Works offline | Requires connection |

---

## Handling Results

### Processing Local Results

```typescript
// Direct array result
const data = [
  { id: 1, value: 'A' },
  { id: 2, value: 'B' }
];

const dm = new DataManager({ json: data, adaptor: new JsonAdaptor() });
const result = dm.executeLocal(new Query().take(1));

console.log(result);       // [{ id: 1, value: 'A' }]
console.log(result[0].id); // 1
```

### Processing Remote Results

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

dm.executeQuery(new Query().take(10))
  .then((result: ReturnOption) => {
    // result object structure:
    // {
    //   result: [ /* array of records */ ],
    //   count: 100,  // total records on server
    //   aggregates: { /* aggregate values */ }
    // }
    
    this.items = result.result as any[];
    this.totalCount = result.count;
  })
  .catch((error) => {
    console.error('Failed to fetch data:', error);
  });
```

### Typed Results with TypeScript

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

async getProducts(): Promise<void> {
  try {
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    const result = await dm.executeQuery(new Query());
    const products = result.result as Product[];
    
    products.forEach(p => {
      console.log(`${p.name}: $${p.price}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## Error Handling

### Basic Error Handling

```typescript
dm.executeQuery(query)
  .then((result: ReturnOption) => {
    this.items = result.result;
  })
  .catch((error) => {
    console.error('Data fetch failed:', error);
  });
```

### Detailed Error Handling

```typescript
dm.executeQuery(query)
  .catch((error: any) => {
    if (error.statusCode === 404) {
      console.error('Endpoint not found');
    } else if (error.statusCode === 401) {
      console.error('Unauthorized - check authentication');
    } else if (error.statusCode === 500) {
      console.error('Server error');
    } else {
      console.error('Unknown error:', error);
    }
  });
```

---

## Complete Example: Orders Component

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, Query, WebApiAdaptor, ReturnOption } from '@syncfusion/ej2-data';

interface Order {
  OrderID: number;
  CustomerID: string;
  EmployeeID: number;
  Freight: number;
}

@Component({
  selector: 'app-orders',
  template: `
    <div>
      <h3>Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Employee</th>
            <th>Freight</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders">
            <td>{{ order.OrderID }}</td>
            <td>{{ order.CustomerID }}</td>
            <td>{{ order.EmployeeID }}</td>
            <td>{{ order.Freight | currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  public orders: Order[] = [];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const dataManager = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor(),
    });

    dataManager.executeQuery(
      new Query().select(['OrderID', 'CustomerID', 'EmployeeID', 'Freight']).take(10)
    )
      .then((result: ReturnOption) => {
        this.orders = result.result as Order[];
      })
      .catch((error) => {
        console.error('Failed to load orders:', error);
      });
  }
}
```

---

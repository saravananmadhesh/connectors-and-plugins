---
title: Data Binding in Syncfusion Angular DataManager
---

# Data Binding in Syncfusion Angular DataManager

## Table of Contents

- [Overview](#overview)
- [Local Binding (JSON)](#local-binding-json)
- [Remote Binding (URL)](#remote-binding-url)
- [Client-side vs Server-side Processing](#client-side-vs-server-side-processing)
- [Promise-based Async Operations](#promise-based-async-operations)
- [Error Handling](#error-handling)
- [Property Reference](#property-reference)

---

## Overview

Data binding in DataManager determines where your data comes from and how it's processed:

- **Local Binding:** Data exists in memory (JSON array)
- **Remote Binding:** Data fetches from a server URL

Each binding type uses different DataManager properties and methods.

---

## Local Binding (JSON)

### When to Use Local Binding

- Working with in-memory data already fetched
- Small datasets that fit in browser memory
- Quick prototyping or testing
- Offline-capable application features
- Client-side filtering/sorting for better UX

### Configuration

```typescript
import { DataManager, JsonAdaptor, Query } from '@syncfusion/ej2-data';

const orders = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 }
];

const dataManager = new DataManager({
  json: orders,              // Local data array
  adaptor: new JsonAdaptor() // Handles local operations
});
```

### Basic Operations

```typescript
// Fetch all records
const all = dataManager.executeLocal(new Query());

// Filter records
const filtered = dataManager.executeLocal(
  new Query().where('Freight', 'greaterThan', 30)
);

// Sort and paginate
const sorted = dataManager.executeLocal(
  new Query()
    .sortBy('Freight')
    .take(5)
    .skip(0)
);

// Combine operations
const result = dataManager.executeLocal(
  new Query()
    .where('CustomerID', 'equal', 'VINET')
    .select(['OrderID', 'Freight'])
    .sortBy('OrderID')
);
```

### Key Properties

| Property | Type | Purpose |
|----------|------|---------|
| `json` | `array` | Your local data array |
| `adaptor` | `JsonAdaptor` | Handles json property |

### Advantages

- ✓ No network latency
- ✓ Works offline
- ✓ Instant filtering/sorting
- ✓ Simpler error handling

### Limitations

- ✗ Limited to data already loaded
- ✗ Memory constraints for large datasets
- ✗ Must load all data at once

---

## Remote Binding (URL)

### When to Use Remote Binding

- Data stored on a server (REST API, OData, GraphQL)
- Large datasets too big for memory
- Real-time data that changes frequently
- Need server-side processing (filtering, sorting)
- Security-sensitive operations

### Configuration

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',     // API endpoint
  adaptor: new WebApiAdaptor(),               // Handles HTTP requests
  crossDomain: true
});
```

### Basic Operations

```typescript
// Fetch with promise
dataManager.executeQuery(new Query())
  .then((result) => {
    console.log(result.result); // Data array
    console.log(result.count);  // Total records
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// With filtering
dataManager.executeQuery(
  new Query().where('Freight', 'greaterThan', 50)
)
  .then((result) => {
    this.items = result.result;
  });

// With paging
dataManager.executeQuery(
  new Query().take(10).skip(0)
)
  .then((result) => {
    this.items = result.result;
    this.totalCount = result.count;
  });
```

### Key Properties

| Property | Type | Purpose |
|----------|------|---------|
| `url` | `string` | API endpoint URL |
| `adaptor` | `Adaptor` | Type of data service (WebApiAdaptor, ODataAdaptor, etc.) |
| `headers` | `object[]` | Custom HTTP headers |
| `crossDomain` | `boolean` | Enable CORS requests |
| `offline` | `boolean` | Enable offline mode |

### Supported Adaptors for Remote Binding

- **WebApiAdaptor** — ASP.NET Web API
- **ODataAdaptor** — OData v3 services
- **ODataV4Adaptor** — OData v4 endpoints
- **UrlAdaptor** — Generic REST endpoints
- **WebMethodAdaptor** — ASP.NET web methods
- **GraphQLAdaptor** — GraphQL servers
- **CustomDataAdaptor** — Custom fetch logic
- **RemoteSaveAdaptor** — Client-side queries + server CRUD

### Advantages

- ✓ Handle unlimited data volume
- ✓ Real-time data
- ✓ Server-side processing (faster, efficient)
- ✓ Secure operations on server

### Limitations

- ✗ Network delays
- ✗ Requires server connection
- ✗ More complex error handling

---

## Client-side vs Server-side Processing

### Client-side Processing (executeLocal)

**Use:  Local binding with executeLocal()**

```typescript
const dataManager = new DataManager({
  json: largeArray,
  adaptor: new JsonAdaptor()
});

// Processing happens in browser
const result = dataManager.executeLocal(
  new Query()
    .where('Status', 'equal', 'Active')
    .sortBy('Date')
    .take(10)
);
```

**Characteristics:**
- All data loaded first
- Filtering/sorting in browser
- Instant results
- Limited to memory size

---

### Server-side Processing (executeQuery)

**Use: Remote binding with executeQuery()**

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

// Request sent to server with query parameters
// Server filters, sorts, and returns only needed data
const result = await dataManager.executeQuery(
  new Query()
    .where('Status', 'equal', 'Active')
    .sortBy('Date')
    .take(10)
);
```

**Characteristics:**
- Only needed data downloaded
- Server handles heavy operations
- Better for large datasets
- More efficient bandwidth
- Scales better with size

---

## Promise-based Async Operations

### Using .then().catch()

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

dataManager.executeQuery(new Query())
  .then((result) => {
    // Success: result contains data
    this.items = result.result;
    this.totalCount = result.count;
  })
  .catch((error) => {
    // Failure: handle error
    console.error('Data fetch failed:', error);
  });
```

### Using Async/Await

```typescript
async loadData(): Promise<void> {
  try {
    const dataManager = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    const result = await dataManager.executeQuery(new Query());
    this.items = result.result;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Multiple Sequential Operations

```typescript
// Pattern: Load data, then load related data
async loadOrderAndItems(orderId: number): Promise<void> {
  try {
    const orderDm = new DataManager({
      url: `url/${orderId}`,
      adaptor: new WebApiAdaptor()
    });

    const order = await orderDm.executeQuery(new Query());
    this.order = order.result;

    // Then load related items
    const itemsDm = new DataManager({
      url: `url/${orderId}/items`,
      adaptor: new WebApiAdaptor()
    });

    const items = await itemsDm.executeQuery(new Query());
    this.items = items.result;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Parallel Operations with Promise.all

```typescript
async loadAllData(): Promise<void> {
  try {
    const ordersDm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    const customersDm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    // Load both simultaneously
    const [ordersResult, customersResult] = await Promise.all([
      ordersDm.executeQuery(new Query()),
      customersDm.executeQuery(new Query())
    ]);

    this.orders = ordersResult.result;
    this.customers = customersResult.result;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## Error Handling

### Basic Error Handling

```typescript
dataManager.executeQuery(query)
  .then((result) => {
    this.items = result.result;
  })
  .catch((error) => {
    console.error('Data fetch failed:', error);
  });
```

### HTTP Status Code Handling

```typescript
dataManager.executeQuery(query)
  .catch((error) => {
    if (error.status === 401) {
      // Handle unauthorized
      this.redirectToLogin();
    } else if (error.status === 403) {
      // Handle forbidden
      console.error('Access denied');
    } else if (error.status === 404) {
      // Handle not found
      console.error('Endpoint not found');
    } else if (error.status === 500) {
      // Handle server error
      console.error('Server error');
    } else if (error.status === 0) {
      // Handle network error
      console.error('Network connectivity issue');
    } else {
      console.error('Unknown error:', error);
    }
  });
```

### Async/Await Error Handling

```typescript
async loadData(): Promise<void> {
  try {
    const result = await dataManager.executeQuery(new Query());
    this.items = result.result;
  } catch (error: any) {
    if (error.status === 401) {
      // Redirect to login
    } else if (error.status >= 500) {
      // Show server error message
      this.errorMessage = 'Server error - please try again later';
    } else {
      // Generic error
      this.errorMessage = 'Failed to load data';
    }
  }
}
```

---

## Complete Example: Remote Data with Error Handling

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, Query, WebApiAdaptor, ReturnOption } from '@syncfusion/ej2-data';

interface Order {
  OrderID: number;
  CustomerID: string;
  Freight: number;
}

@Component({
  selector: 'app-remote-orders',
  template: `
    <div>
      <h3>Orders</h3>
      <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
      <div *ngIf="loading" class="loader">Loading...</div>
      <table *ngIf="!loading && orders.length">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Freight</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders">
            <td>{{ order.OrderID }}</td>
            <td>{{ order.CustomerID }}</td>
            <td>{{ order.Freight | currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .error { color: red; padding: 10px; background: #ffebee; }
    .loader { text-align: center; padding: 20px; }
  `]
})
export class RemoteOrdersComponent implements OnInit {
  public orders: Order[] = [];
  public loading = false;
  public errorMessage = '';

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.errorMessage = '';

    const dataManager = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    dataManager.executeQuery(
      new Query().select(['OrderID', 'CustomerID', 'Freight']).take(20)
    )
      .then((result: ReturnOption) => {
        this.orders = result.result as Order[];
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        if (error.status === 0) {
          this.errorMessage = 'Network error - check your connection';
        } else if (error.status === 404) {
          this.errorMessage = 'Service not found';
        } else {
          this.errorMessage = 'Failed to load orders';
        }
      });
  }
}
```

---

## Property Reference

| Property | Type | Local | Remote | Purpose |
|----------|------|-------|--------|---------|
| `json` | array | ✓ | ✗ | Local data array |
| `url` | string | ✗ | ✓ | Remote endpoint |
| `adaptor` | class | ✓ | ✓ | Adaptor type |
| `headers` | object[] | ✗ | ✓ | HTTP headers |
| `offline` | boolean | ✗ | ✓ | Offline support |
| `enableCache` | boolean | ✗ | ✓ | Response caching |
| `crossDomain` | boolean | ✗ | ✓ | CORS requests |

---

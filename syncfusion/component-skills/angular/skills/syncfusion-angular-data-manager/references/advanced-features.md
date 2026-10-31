---
title: Advanced Features in Syncfusion Angular DataManager
---

# Advanced Features in Syncfusion Angular DataManager

## Table of Contents

- [Overview](#overview)
- [Load on Demand](#load-on-demand)
- [Lazy Loading with Expand](#lazy-loading-with-expand)
- [Pagination Strategies](#pagination-strategies)
- [Deferred Operations](#deferred-operations)
- [Async/Await Patterns](#asyncawait-patterns)
- [Promise.all() for Parallel Operations](#promiseall-for-parallel-operations)
- [Error Handling with Status Codes](#error-handling-with-status-codes)
- [Memory Management](#memory-management)
- [State Persistence](#state-persistence)
- [Type Safety with TypeScript](#type-safety-with-typescript)

---

## Overview

Advanced features enable:
- Efficient handling of large datasets
- Complex async workflows
- Better error management
- Performance optimization
- Type-safe development

---

## Load on Demand

### Virtual Scrolling Pattern

```typescript
@Component({
  selector: 'app-virtual-scroll',
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="list">
      <div *cdkVirtualFor="let item of items">
        {{ item.OrderID }}: {{ item.CustomerID }}
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`.list { height: 500px; }`]
})
export class VirtualScrollComponent implements OnInit {
  public items: any[] = [];
  private dataManager: DataManager;

  ngOnInit(): void {
    this.dataManager = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    this.loadInitialData();
  }

  async loadInitialData(): Promise<void> {
    const result = await this.dataManager.executeQuery(
      new Query().take(50)
    );
    this.items = result.result;
  }
}
```

### Intersection Observer Pattern

```typescript
@Component({
  selector: 'app-load-on-scroll',
  template: `
    <div #endOfList></div>
    <div *ngFor="let item of items">{{ item.OrderID }}</div>
  `
})
export class LoadOnScrollComponent implements AfterViewInit, OnDestroy {
  @ViewChild('endOfList') endOfList: ElementRef;
  public items: any[] = [];
  private observer: IntersectionObserver;
  private pageIndex = 0;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.loadMore();
      }
    });

    this.observer.observe(this.endOfList.nativeElement);
  }

  async loadMore(): Promise<void> {
    const dataManager = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    const result = await dataManager.executeQuery(
      new Query()
        .skip(this.pageIndex * 50)
        .take(50)
    );

    this.items.push(...result.result);
    this.pageIndex++;
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
```

---

## Lazy Loading with Expand

### Navigation Properties

```typescript
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor()
});

// Load related Customer data
dataManager.executeQuery(
  new Query()
    .select(['OrderID', 'CustomerID', 'Freight'])
    .expand('Customer')  // Load related Customer entity
    .take(10)
)
  .then((result) => {
    result.result.forEach((order: any) => {
      console.log(order.OrderID);
      console.log(order.Customer.CustomerName);  // Related data available
    });
  });
```

### Multi-level Expand

```typescript
// Load Order -> OrderDetails -> Product data
dataManager.executeQuery(
  new Query()
    .expand('OrderDetails')
    .expand('OrderDetails.Product')  // Nested expand
    .take(5)
)
  .then((result) => {
    result.result.forEach((order: any) => {
      order.OrderDetails.forEach((detail: any) => {
        console.log(detail.Product.ProductName);
      });
    });
  });
```

---

## Pagination Strategies

### Client-side Pagination

```typescript
@Component({
  selector: 'app-pagination'
})
export class PaginationComponent {
  public allData: any[] = [];
  public pageSize = 10;
  public currentPage = 1;
  get pagedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.allData.slice(start, start + this.pageSize);
  }

  async ngOnInit(): Promise<void> {
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    const result = await dm.executeQuery(new Query());
    this.allData = result.result;
  }

  getTotal(): number {
    return Math.ceil(this.allData.length / this.pageSize);
  }
}
```

### Server-side Pagination

```typescript
async goToPage(pageNumber: number): Promise<void> {
  const pageSize = 10;
  const skip = (pageNumber - 1) * pageSize;

  const dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  const result = await dataManager.executeQuery(
    new Query()
      .skip(skip)
      .take(pageSize)
  );

  console.log('Total records:', result.count);
  console.log('Current page:', result.result);
}
```

---

## Deferred Operations

The `Deferred` object provides methods for managing asynchronous operations with `.resolve()`, `.reject()`, `.promise`, `.then()`, and `.catch()`:

### Basic Deferred Usage

```typescript
import { DataManager, Deferred } from '@syncfusion/ej2-data';

// Create a deferred object for async operation management
const deferred = new Deferred();

// Simulate async work (e.g., fetching from API)
setTimeout(() => {
  const result = {
    result: [
      { id: 1, name: 'Order 1' },
      { id: 2, name: 'Order 2' }
    ],
    count: 2
  };
  deferred.resolve(result);  // Mark operation as successful
}, 1000);

// Handle the deferred operation result
deferred.promise
  .then((result: any) => {
    console.log('Operation succeeded:', result.result);
  })
  .catch((error: any) => {
    console.error('Operation failed:', error.message);
  });
```

### Deferred with Rejection (Error Handling)

```typescript
import { DataManager, Deferred } from '@syncfusion/ej2-data';

function fetchDataWithError(shouldFail: boolean = false): Deferred {
  const deferred = new Deferred();

  setTimeout(() => {
    if (shouldFail) {
      deferred.reject(new Error('API returned 500 Server Error'));
    } else {
      deferred.resolve({ result: [{ id: 1, value: 'Success' }] });
    }
  }, 1000);

  return deferred;
}

// Handling rejected deferred
fetchDataWithError(true)
  .promise
  .then((result: any) => {
    console.log('Success:', result.result);
  })
  .catch((error: any) => {
    console.error('Error caught:', error.message);  // "API returned 500 Server Error"
  });
```

### Deferred with Query Execution

```typescript
import { DataManager, Query, WebApiAdaptor, Deferred } from '@syncfusion/ej2-data';

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

// executeQuery() returns a Deferred internally
const deferred: any = dm.executeQuery(
  new Query().where('Status', 'equal', 'Completed').take(10)
);

deferred
  .then((result: any) => {
    console.log('Query succeeded:', result.result);
    return result.result;
  })
  .catch((error: any) => {
    console.error('Query failed:', error);
  });
```

### Multiple Deferred Operations (Parallel Execution)

```typescript
import { Deferred } from '@syncfusion/ej2-data';

const deferred1 = new Deferred();
const deferred2 = new Deferred();
const deferred3 = new Deferred();

// Simulate multiple async operations
setTimeout(() => deferred1.resolve({ data: 'Result 1' }), 500);
setTimeout(() => deferred2.resolve({ data: 'Result 2' }), 700);
setTimeout(() => deferred3.resolve({ data: 'Result 3' }), 600);

// Wait for all deferred operations to complete
Promise.all([deferred1.promise, deferred2.promise, deferred3.promise])
  .then((results: any[]) => {
    console.log('All operations complete:', results);
  })
  .catch((error: any) => {
    console.error('One or more operations failed:', error);
  });
```

---

## Async/Await Patterns

### Sequential Operations

```typescript
async loadDataSequentially(): Promise<void> {
  try {
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    // Load orders
    const ordersResult = await dm.executeQuery(new Query());
    console.log('Orders loaded:', ordersResult.result.length);

    // Then load customers
    const customersResult = await dm.executeQuery(
      new Query().select(['CustomerID', 'CustomerName'])
    );
    console.log('Customers loaded:', customersResult.result.length);

  } catch (error) {
    console.error('Sequential load failed:', error);
  }
}
```

### Parallel Operations

```typescript
async loadDataParallel(): Promise<void> {
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

    console.log('Orders:', ordersResult.result);
    console.log('Customers:', customersResult.result);

  } catch (error) {
    console.error('Parallel load failed:', error);
  }
}
```

---

## Promise.all() for Parallel Operations

### Multiple Data Sources

```typescript
async loadMultipleSources(): Promise<void> {
  const sources = [
    new DataManager({ url: 'api/orders', adaptor: new WebApiAdaptor() }),
    new DataManager({ url: 'api/customers', adaptor: new WebApiAdaptor() }),
    new DataManager({ url: 'api/products', adaptor: new WebApiAdaptor() }),
    new DataManager({ url: 'api/employees', adaptor: new WebApiAdaptor() })
  ];

  try {
    const results = await Promise.all(
      sources.map(dm => dm.executeQuery(new Query().take(100)))
    );

    this.orders = results[0].result;
    this.customers = results[1].result;
    this.products = results[2].result;
    this.employees = results[3].result;

  } catch (error) {
    console.error('Multi-source load failed:', error);
  }
}
```

### Race Condition Handling

```typescript
// First data source to respond wins
async loadFatest(): Promise<any> {
  const sources = [
    new DataManager({ url: 'api1.example.com/orders', adaptor: new WebApiAdaptor() }),
    new DataManager({ url: 'api2.example.com/orders', adaptor: new WebApiAdaptor() })
  ];

  try {
    const result = await Promise.race(
      sources.map(dm => dm.executeQuery(new Query()))
    );

    return result.result;
  } catch (error) {
    console.error('All sources failed:', error);
  }
}
```

---

## Error Handling with Status Codes

### HTTP Status Code Handling

```typescript
async loadWithErrorHandling(): Promise<void> {
  const dm = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  try {
    const result = await dm.executeQuery(new Query());
    this.orders = result.result;

  } catch (error: any) {
    const status = error.status || error.statusCode || 0;

    if (status === 0) {
      console.error('Network error - check connectivity');
      this.errorMessage = 'Network connection failed';
    } else if (status === 400) {
      console.error('Bad request - invalid parameters');
      this.errorMessage = 'Invalid request data';
    } else if (status === 401) {
      console.error('Unauthorized - authentication required');
      this.errorMessage = 'Please login again';
      this.redirectToLogin();
    } else if (status === 403) {
      console.error('Forbidden - access denied');
      this.errorMessage = 'You don\'t have permission to access this';
    } else if (status === 404) {
      console.error('Not found - resource doesn\'t exist');
      this.errorMessage = 'Resource not found';
    } else if (status === 409) {
      console.error('Conflict - data conflict');
      this.errorMessage = 'Data conflict - please refresh and try again';
    } else if (status === 500) {
      console.error('Server error - try again later');
      this.errorMessage = 'Server error - please try again later';
    } else if (status >= 500) {
      console.error('Server error:', status);
      this.errorMessage = 'Server error - please try again later';
    } else {
      console.error('Unknown error:', status);
      this.errorMessage = 'An unexpected error occurred';
    }
  }
}
```

### Retry Logic with Exponential Backoff

```typescript
async loadWithRetry(maxRetries = 3): Promise<any> {
  const dm = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await dm.executeQuery(new Query());

    } catch (error: any) {
      const isRetryable = error.status === 0 || error.status >= 500;
      const isLastAttempt = attempt === maxRetries;

      if (isRetryable && !isLastAttempt) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`Retry ${attempt}/${maxRetries} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}
```

---

## Memory Management

### Garbage Collection for Large Datasets

```typescript
@Component({
  selector: 'app-large-dataset'
})
export class LargeDatasetComponent implements OnDestroy {
  private dataManager: DataManager;
  private subscription: any;

  ngOnInit(): void {
    this.dataManager = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });
  }

  loadLargeDataset(): void {
    // Load only what's visible to user (pagination)
    const pageSize = 50;

    this.dataManager.executeQuery(
      new Query().take(pageSize)
    )
      .then((result) => {
        // Keep limited data in memory
        this.data = result.result.slice(0, pageSize);
      });
  }

  ngOnDestroy(): void {
    // Clean up
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
    // Help garbage collection
    if (this.dataManager) {
      this.dataManager.clearCache();
    }
  }
}
```

### Memory-efficient Mapping

```typescript
// ❌ MEMORY INEFFICIENT - Creates large intermediate arrays
const results = data
  .map(item => ({ id: item.OrderID, name: item.CustomerID }))
  .filter(item => item.id > 10248)
  .map(item => item.name)
  .slice(0, 100);

// ✅ MEMORY EFFICIENT - Single iteration, minimal allocation
const results = [];
for (const item of data) {
  if (item.OrderID > 10248) {
    results.push(item.CustomerID);
    if (results.length >= 100) break;
  }
}
```

---

## State Persistence

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Syncfusion DataManager provides built-in state persistence using browser localStorage. Query states are automatically saved and restored across page reloads.

### Basic State Persistence

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-state-persistence',
  template: `
    <div>
      <h3>Orders (sorted by CustomerID desc)</h3>
      <ul>
        <li *ngFor="let order of orders">
          {{ order.CustomerID }} - ${{ order.Freight }}
        </li>
      </ul>
      <p>Note: Sorting state persisted. Refresh page to see state restored.</p>
    </div>
  `
})
export class StatePersistenceComponent implements OnInit {
  orders: any[] = [];

  ngOnInit(): void {
    const dataManager = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor(),
      enablePersistence: true,      // Enable state persistence
      id: 'angularOrderManager'     // Unique ID for localStorage key
    });

    // Execute query with sorting
    dataManager.executeQuery(
      new Query().sortBy('CustomerID', 'descending').take(10)
    ).then((result) => {
      this.orders = result.result;
      // Query state (sorting) automatically saved to localStorage
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
```

### Excluding Queries from Persistence

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-selective-persistence'
})
export class SelectivePersistenceComponent implements OnInit {
  products: any[] = [];

  ngOnInit(): void {
    const dataManager = new DataManager({
      url: 'url',
      adaptor: new UrlAdaptor(),
      enablePersistence: true,
      id: 'angularProductManager',
      ignoreOnPersist: ['onSortBy', 'onSearch']  // Don't persist sorting and search
    });

    // These will be persisted: filtering, grouping
    // These will NOT be persisted: sorting, search

    dataManager.executeQuery(
      new Query()
        .where('Status', 'equal', 'Active')
        .sortBy('Price', 'descending')  // Won't persist
    ).then((result) => {
      this.products = result.result;
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
}
```

### Retrieve Persisted State

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
import { Component } from '@angular/core';
import { DataManager } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-get-persisted-data',
  template: `<button (click)="getPersistedState()">Show Persisted State</button>`
})
export class GetPersistedDataComponent {
  getPersistedState(): void {
    // Retrieve the persisted query state from localStorage
    const persisted = DataManager.getPersistedData('angularOrderManager');
    console.log('Persisted state:', persisted);
    // Output: { onSortBy: [{field: 'CustomerID', direction: 'descending'}], ... }
  }
}
```

### Update Persisted State

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
import { Component } from '@angular/core';
import { DataManager, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-set-persisted-data',
  template: `<button (click)="updatePersistedState()">Update Persisted State</button>`
})
export class SetPersistedDataComponent {
  updatePersistedState(): void {
    // Create a new query to be persisted
    const newQuery = new Query()
      .where('Freight', 'greaterThan', 100)
      .sortBy('EmployeeID', 'descending');

    // Update the persisted state in localStorage
    DataManager.setPersistData(
      null,                         // event: null when not in event context
      'angularOrderManager',       // DataManager id
      newQuery                     // New query to persist
    );

    console.log('Persisted state updated');
  }
}
```

### Clear Persisted State

```typescript
import { Component } from '@angular/core';
import { DataManager } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-clear-persistence',
  template: `
    <button (click)="clearThis()">Clear This DataManager</button>
    <button (click)="clearAll()">Clear All (Logout)</button>
  `
})
export class ClearPersistenceComponent {
  clearThis(): void {
    // Remove all persisted data for this DataManager
    DataManager.clearPersistence('angularOrderManager');
    console.log('Persisted state cleared - DataManager reset to initial state');
  }

  clearAll(): void {
    // Clear persistence for multiple DataManagers on logout
    DataManager.clearPersistence('angularOrderManager');
    DataManager.clearPersistence('angularProductManager');
    console.log('All persisted states cleared');
  }
}
```

### Persistence Properties Reference

| Property | Type | Purpose |
|----------|------|---------|
| `enablePersistence` | boolean | Enable/disable state persistence |
| `id` | string | Unique identifier for localStorage key |
| `ignoreOnPersist` | string[] | Query types to exclude: `onSortBy`, `onSearch`, `onWhere`, `Grouping` |

---

## Type Safety with TypeScript

### Strongly Typed Operations

```typescript
interface Order {
  OrderID: number;
  CustomerID: string;
  EmployeeID: number;
  Freight: number;
}

async loadTypedData(): Promise<Order[]> {
  const dm = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  const result = await dm.executeQuery(new Query());
  const orders: Order[] = result.result as Order[];

  // TypeScript knows Order properties
  orders.forEach(order => {
    console.log(order.OrderID);  // ✓ Valid
    console.log(order.Freight);  // ✓ Valid
    console.log(order.InvalidField);  // ✗ Compile error
  });

  return orders;
}
```

### Generic Type Definitions

```typescript
async genericLoad<T>(url: string): Promise<T[]> {
  const dm = new DataManager({
    url: url,
    adaptor: new WebApiAdaptor()
  });

  const result = await dm.executeQuery(new Query());
  return result.result as T[];
}

// Usage
const orders = await this.genericLoad<Order>('api/orders');
const customers = await this.genericLoad<Customer>('api/customers');
```

---

## Complete Advanced Example

```typescript
@Component({
  selector: 'app-advanced-data'
})
export class AdvancedDataComponent implements OnInit, OnDestroy {
  public items: any[] = [];
  public loading = false;
  public error: string | null = null;

  constructor(private stateService: DataManagerStateService) {}

  async ngOnInit(): Promise<void> {
    // Try to restore state
    const saved = this.stateService.restoreState();
    if (saved) {
      this.items = saved.results;
      return;
    }

    // Load fresh data
    await this.loadData();
  }

  private async loadData(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const dm = new DataManager({
        url: 'url',
        adaptor: new WebApiAdaptor()
      });

      const result = await dm.executeQuery(
        new Query()
          .where('Status', 'equal', 'Active')
          .sortBy('OrderID')
          .take(100)
      );

      this.items = result.result;
      this.stateService.saveState(new Query(), this.items);

    } catch (error: any) {
      this.error = this.getErrorMessage(error.status);
    } finally {
      this.loading = false;
    }
  }

  private getErrorMessage(status: number): string {
    const messages: { [key: number]: string } = {
      0: 'Network error',
      401: 'Please login',
      403: 'Access denied',
      404: 'Not found',
      500: 'Server error'
    };

    return messages[status] || 'Unknown error';
  }

  ngOnDestroy(): void {
    this.stateService.clearState();
  }
}
```

---

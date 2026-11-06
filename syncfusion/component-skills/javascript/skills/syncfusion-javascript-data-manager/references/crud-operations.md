---
title: CRUD Operations with DataManager
---

# CRUD Operations

## Table of Contents
- [Overview](#overview)
- [Read Operations](#read-operations)
- [Create (Insert)](#create-insert)
- [Update (Edit)](#update-edit)
- [Delete (Remove)](#delete-remove)
- [Response Formats by Adaptor](#response-formats-by-adaptor)
- [Error Handling in CRUD](#error-handling-in-crud)
- [SaveChanges (Batch CRUD)](#savechanges-batch-crud)
- [Real-World CRUD Example](#real-world-crud-example)

---

## Overview

CRUD = Create, Read, Update, Delete operations on data.

**Note**: The keyField is passed as the first parameter to CRUD methods (update, remove), not configured in DataManager constructor.

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new WebApiAdaptor()
});
```

---

## Read Operations

### ExecuteQuery (Remote)

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// Read all orders
const result = await dm.executeQuery(new Query().take(100));
console.log('Orders:', result.result);
console.log('Total count:', result.count);

// Read with filter
const filtered = await dm.executeQuery(
  new Query()
    .where('Status', 'equal', 'Pending')
    .take(20)
);
```

### ExecuteLocal (Local Data)

```typescript
const data = [
  { OrderID: 1, CustomerID: 'ABC', Freight: 25 },
  { OrderID: 2, CustomerID: 'DEF', Freight: 50 },
  { OrderID: 3, CustomerID: 'ABC', Freight: 35 }
];

const dm = new DataManager(data);

// Read local with filtering
const result = await dm.executeLocal(
  new Query()
    .where('CustomerID', 'equal', 'ABC')
);

console.log('ABC orders:', result.result);
// [{ OrderID: 1, ... }, { OrderID: 3, ... }]
```

---

## Create (Insert)

### Basic Insert

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new WebApiAdaptor(),
  // ⚠️ Required
});

const newOrder = {
  CustomerID: 'CUSTOMER123',
  OrderDate: new Date(),
  Freight: 25.50
};

// Insert single record
await dm.insert('Orders', newOrder);
console.log('Order created');

// HTTP Request:
// POST /api/orders
// Body: { CustomerID: 'CUSTOMER123', OrderDate: '...', Freight: 25.50 }
```

### Batch Insert

```typescript
const newOrders = [
  { CustomerID: 'ABC', Freight: 25 },
  { CustomerID: 'DEF', Freight: 30 },
  { CustomerID: 'GHI', Freight: 35 }
];

// Insert multiple in one request
await dm.insert(newOrders, 'Orders');
console.log('3 orders created');

// HTTP Request:
// POST /api/orders (with array)
```

### Insert with Response Handling

```typescript
try {
  const result = await dm.insert(newOrder, 'Orders');
  console.log('Created with ID:', result.OrderID);  // Backend returns full object
} catch (error) {
  if (error.status === 400) {
    console.error('Invalid data format');
  } else if (error.status === 409) {
    console.error('Duplicate record');
  } else if (error.status === 500) {
    console.error('Server error');
  }
}
```

---

## Update (Edit)

### Basic Update

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new WebApiAdaptor()
});

const updatedOrder = {
  OrderID: 10248,
  CustomerID: 'UPDATED',
  Freight: 45.00
};

// Update by primary key (pass keyField as first param)
await dm.update('OrderID', updatedOrder, 'Orders');
console.log('Order updated');

// HTTP Request (depends on adaptor):
// WebApiAdaptor: PUT /api/orders(10248)
// UrlAdaptor: PUT /api/orders/10248
```

### Update Specific Fields

```typescript
// Update only changed fields
const orderChanges = {
  OrderID: 10248,
  Freight: 50.00  // Only this changed
};

await dm.update('OrderID', orderChanges, 'Orders');
```

### Batch Update

```typescript
const updates = [
  { OrderID: 10248, Status: 'Shipped' },
  { OrderID: 10249, Status: 'Shipped' },
  { OrderID: 10250, Status: 'Shipped' }
];

// Update multiple
for (const order of updates) {
  await dm.update('OrderID', order, 'Orders');
}

// Or in parallel
await Promise.all(
  updates.map(order =>
    dm.update('OrderID', order, 'Orders')
  )
);
```

### Update with Optimistic Concurrency

```typescript
// If backend supports RowVersion/ConcurrencyStamp
const order = {
  OrderID: 10248,
  Freight: 50.00,
  RowVersion: 'AQAAAA=='  // From database
};

try {
  await dm.update('OrderID', order, 'Orders');
} catch (error) {
  if (error.status === 409) {
    console.error('Concurrency conflict - record modified by another user');
    // Reload and reapply changes
  }
}
```

---

## Delete (Remove)

### Basic Delete

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new WebApiAdaptor()
});

// Delete by primary key (pass keyField as first param)
await dm.remove('OrderID', 10248, 'Orders');
console.log('Order deleted');

// HTTP Request:
// DELETE /api/orders(10248)
```

### Delete Multiple

```typescript
const orderIdsToDelete = [10248, 10249, 10250];

// Option 1: Serial deletion
for (const orderId of orderIdsToDelete) {
  await dm.remove('Orders', orderId);
}

// Option 2: Parallel deletion
await Promise.all(
  orderIdsToDelete.map(id => dm.remove('Orders', id))
);

// Option 3: Batch via backend (if supported)
// Send array to /api/orders/batch-delete
```

### Delete with Confirmation

```typescript
async function deleteOrderSafely(orderId) {
  try {
    // Option: Load before delete to confirm
    const orderToDelete = await dm.executeQuery(
      new Query().where('OrderID', 'equal', orderId)
    );

    if (!orderToDelete.result[0]) {
      console.error('Order not found');
      return false;
    }

    // Show user what will be deleted
    console.log('Deleting:', orderToDelete.result[0]);
    
    // User confirms...
    // if (!userConfirms()) return false;

    // Delete
    await dm.remove('Orders', orderId);
    console.log('Order deleted');
    return true;
  } catch (error) {
    console.error('Delete failed:', error);
    return false;
  }
}
```

---

## Response Formats by Adaptor

### WebApiAdaptor (ASP.NET)

```json
{
  "Items": [...],
  "Count": 100
}
```

```csharp
// C# Backend
public IActionResult GetOrders([FromUri]DataManagerRequest dm)
{
  var orders = GetAllOrders();
  return Ok(new DataResult { Items = orders, Count = orders.Count() });
}
```

### UrlAdaptor (Generic REST)

```json
{
  "result": [...],
  "count": 100
}
```

### ODataAdaptor (OData v3)

```json
{
  "d": {
    "results": [...],
    "__count": "100"
  }
}
```

### Custom Response Mapping

```typescript
class CustomResponseAdaptor extends CustomDataAdaptor {
  getData(args) {
    return fetch('/api/data')
      .then(r => r.json())
      .then(response => {
        // Map custom format to standard
        return {
          result: response.data.items,
          count: response.data.totalCount
        };
      });
  }
}
```

---

## Error Handling in CRUD

### By HTTP Status

```typescript
async function safeCRUD() {
  const dm = new DataManager({
    url: '/api/orders',
    adaptor: new UrlAdaptor()
  });

  try {
    await dm.insert('Orders', { CustomerID: 'ABC' });
  } catch (error) {
    switch (error.status) {
      case 400:
        console.error('Validation error:', error.statusText);
        break;
      case 401:
        console.error('Unauthorized - need login');
        redirectToLogin();
        break;
      case 403:
        console.error('Forbidden - no permission');
        break;
      case 404:
        console.error('Resource not found');
        break;
      case 409:
        console.error('Conflict - duplicate or concurrency issue');
        break;
      case 422:
        console.error('Unprocessable entity - validation failed');
        break;
      case 500:
        console.error('Server error');
        break;
      default:
        console.error('Unknown error:', error);
    }
  }
}
```

### Validation Before Submit

```typescript
function validateOrder(order) {
  if (!order.CustomerID) throw new Error('CustomerID required');
  if (order.Freight < 0) throw new Error('Freight must be positive');
  if (!order.OrderDate) throw new Error('OrderDate required');
  return true;
}

async function createOrderSafely(order) {
  try {
    validateOrder(order);  // Client-side validation
    await dm.insert('Orders', order);
    console.log('Order created');
  } catch (error) {
    console.error('Validation failed:', error.message);
  }
}
```

---

## SaveChanges (Batch CRUD)

### Batch Operations in One Request

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new RemoteSaveAdaptor(),

});

// Make local changes to data
const changes = {
  inserted: [
    { CustomerID: 'NEW1', Freight: 25 },
    { CustomerID: 'NEW2', Freight: 30 }
  ],
  changed: [
    { OrderID: 10248, Freight: 50 },
    { OrderID: 10249, Freight: 55 }
  ],
  deleted: [
    { OrderID: 10250 },
    { OrderID: 10251 }
  ]
};

// Send all changes in one request
await dm.saveChanges(changes);
console.log('All changes saved');

// HTTP Request:
// POST /api/orders with:
// { inserted: [...], changed: [...], deleted: [...] }
```

---

## Batch Operations with CRUD

```typescript
class OrderManager {
  private dm: DataManager;

  constructor(apiUrl: string) {
    this.dm = new DataManager({
      url: apiUrl,
      adaptor: new WebApiAdaptor(),
,
    });
  }

  async createOrder(order: any): Promise<any> {
    try {
      if (!order.CustomerID || !order.OrderDate) {
        throw new Error('Missing required fields');
      }
      const created = await this.dm.insert('Orders', order);
      console.log(`Order ${created.OrderID} created`);
      return created;
    } catch (error) {
      console.error('Create failed:', error);
      throw error;
    }
  }

  async getOrder(orderId: number): Promise<any> {
    const result = await this.dm.executeQuery(
      new Query().where('OrderID', 'equal', orderId)
    );
    return result.result[0];
  }

  async updateOrder(orderId: number, updates: any): Promise<void> {
    try {
      const order = await this.getOrder(orderId);
      if (!order) throw new Error('Order not found');

      const updated = { ...order, ...updates };
      await this.dm.update('Orders', updated, 'OrderID', orderId);
      console.log(`Order ${orderId} updated`);
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  }

  async deleteOrder(orderId: number): Promise<void> {
    try {
      await this.dm.remove('Orders', orderId);
      console.log(`Order ${orderId} deleted`);
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    }
  }

  async listOrders(pageNumber = 1): Promise<any> {
    const pageSize = 20;
    return this.dm.executeQuery(
      new Query()
        .skip((pageNumber - 1) * pageSize)
        .take(pageSize)
    );
  }
}

// Usage
const orderMgr = new OrderManager('api.example.com/orders');

// Create
const newOrder = await orderMgr.createOrder({
  CustomerID: 'ACME',
  OrderDate: new Date(),
  Freight: 25
});

// Read
const order = await orderMgr.getOrder(newOrder.OrderID);

// Update
await orderMgr.updateOrder(newOrder.OrderID, {
  Freight: 30,
  Status: 'Shipped'
});

// List
const orders = await orderMgr.listOrders(1);

// Delete
await orderMgr.deleteOrder(newOrder.OrderID);
```

---

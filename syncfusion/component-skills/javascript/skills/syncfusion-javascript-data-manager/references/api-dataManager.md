---
title: DataManager API Reference
---

# DataManager API Reference

## Constructor

```typescript
new DataManager(data?: any[] | IDataOptions)
```

### Parameters

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `url` | string | - | Remote API endpoint |
| `json` | any[] | - | Local array data |
| `adaptor` | Adaptor | JsonAdaptor | Data adaptor instance |
| `headers` | object | - | HTTP headers |
| `keyField` | string | - | Primary key field name passed to update() and remove() methods |
| `offline` | boolean | false | Client-side filtering |
| `enableCache` | boolean | false | Enable response caching |
| `enablePersistence` | boolean | false | Save state to localStorage |
| `id` | string | 'DataManager' | Unique identifier for persistence |
| `crossDomain` | boolean | false | Enable CORS |

### Example

```typescript
const dm = new DataManager({
  url: 'api.example.com/orders',
  adaptor: new WebApiAdaptor(),
  enableCache: true,
  enablePersistence: true
});
```

---

## Main Methods

### executeQuery(query?: Query): Promise

Executes query against remote data source.

```typescript
const result = await dm.executeQuery(
  new Query()
    .where('Status', 'equal', 'Active')
    .take(20)
);

console.log(result.result);   // Array of records
console.log(result.count);    // Total count
```

### executeLocal(query?: Query): Promise

Executes query against local data (in-memory).

```typescript
const result = await dm.executeLocal(
  new Query().where('Department', 'equal', 'Sales')
);
```

### insert(data: any, tableName: string): Promise

Insert new record(s).

```typescript
const newOrder = { CustomerID: 'ABC', Freight: 25 };
await dm.insert(newOrder, 'Orders');

// Batch insert
const orders = [{ ... }, { ... }];
await dm.insert(orders, 'Orders');
```

### update(keyField: string, value: any, tableName: string): Promise

Update existing record.

```typescript
const changes = { OrderID: 10248, Freight: 50 };
await dm.update('OrderID', changes, 'Orders');
```

### remove(keyField: string, key: any, tableName: string): Promise

Delete record by key.

```typescript
await dm.remove('OrderID', 10248, 'Orders');
```

### saveChanges(changes: any): Promise

Batch CRUD operations.

```typescript
await dm.saveChanges({
  inserted: [{ ... }],
  changed: [{ ... }],
  deleted: [{ ... }]
});
```

---

## Properties

### dataSource

```typescript
dm.dataSource.url       // Current URL
dm.dataSource.adaptor   // Current adaptor instance
dm.dataSource.headers   // Current headers
dm.dataSource.keyField  // Primary key

// Modify at runtime
dm.dataSource.headers['X-New-Header'] = 'value';
```

### adaptor

```typescript
dm.adaptor  // Access adaptor methods

// Apply middleware
dm.applyPreRequestMiddlewares([...]);
dm.applyPostRequestMiddlewares([...]);
```

### enablePersistence

```typescript
dm.enablePersistence = true;   // Enable
dm.enablePersistence = false;  // Disable
```

---

## Event Handling

### Chaining with then/catch

```typescript
dm.executeQuery(query)
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### Async/Await

```typescript
try {
  const result = await dm.executeQuery(query);
  console.log(result.result);
} catch (error) {
  console.error(error.statusText);
}
```

---

## Error Handling

### Error Object Structure

```typescript
{
  status: number;           // HTTP status code
  statusText: string;       // Status message
  responseText: string;     // Response body
  responseJSON?: any;       // Parsed JSON
}
```

### Common Errors

```typescript
try {
  await dm.executeQuery(query);
} catch (error) {
  if (error.status === 401) {
    console.log('Unauthorized');
  } else if (error.status === 404) {
    console.log('Not found');
  } else if (error.status === 500) {
    console.log('Server error');
  } else if (error.status === 0) {
    console.log('Network error');
  }
}
```

---

## Query Result Object

```typescript
{
  result: any[];           // Array of records
  count: number;           // Total matching records
  aggregates?: any;        // Aggregate results
  groupedRecords?: any[];  // Grouped data
}
```

---

## Common Patterns

### Pagination

```typescript
async function getPage(pageNumber, pageSize) {
  return dm.executeQuery(
    new Query()
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
  );
}
```

### Filtering & Sorting

```typescript
const result = await dm.executeQuery(
  new Query()
    .where('Status', 'equal', 'Active')
    .sortByDescending('Date')
);
```

### CRUD Workflow

```typescript
// Create
const created = await dm.insert(newOrder, 'Orders');

// Read
const found = await dm.executeQuery(
  new Query().where('id', 'equal', created.id)
);

// Update
await dm.update('id', { ...found, status: 'Updated' },
  'Orders');

// Delete
await dm.remove('id', created.id, 'Orders');
```

---

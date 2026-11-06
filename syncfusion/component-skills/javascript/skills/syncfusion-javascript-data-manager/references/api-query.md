---
title: Query Builder API Reference
---

# Query API Reference

## Constructor

```typescript
new Query()
```

No parameters required. Build with chaining.

```typescript
const query = new Query()
  .from('Orders')
  .select('id', 'name')
  .where('status', 'equal', 'active')
  .sortBy('date')
  .take(10);
```

---

## Core Methods

### from(table: string)

Set table/collection name.

```typescript
new Query().from('Orders')
// REST: GET /Orders
```

### select(...fields: string[])

Select specific columns.

```typescript
new Query()
  .select('OrderID', 'CustomerID', 'Freight')
  .take(10);
// Returns only those 3 fields
```

### where(field: string, operator: string, value: any)

Filter records.

```typescript
new Query()
  .where('Status', 'equal', 'Active')
  .where('Salary', 'greaterThan', 50000)
  .or('Department', 'equal', 'Sales');
```

**Operators**: equal, notEqual, greaterThan, lessThan, startsWith, endsWith, contains, in, notIn

### sortBy(field: string)

Sort ascending.

```typescript
new Query().sortBy('Name');  // A-Z
```

### sortByDescending(field: string)

Sort descending.

```typescript
new Query().sortByDescending('Salary');  // High to low
```

### skip(count: number)

Skip first N records.

```typescript
new Query().skip(10).take(10);  // Records 11-20
```

### take(count: number)

Limit results.

```typescript
new Query().take(20);  // First 20 records
```

### group(field: string)

Group by field.

```typescript
new Query().group('Department')
// Result: [{ key: 'Sales', items: [...] }, ...]
```

### aggregate(type: string, field: string)

Calculate aggregate.

```typescript
new Query().aggregate('sum', 'Salary');
// Returns: { Sum: 250000 }

// Types: sum, average, count, min, max
```

### expand(field: string)

Include related data (OData).

```typescript
new Query()
  .from('Orders')
  .expand('Customer')
// Result includes nested Customer object
```

### or(field: string, operator: string, value: any)

OR condition.

```typescript
new Query()
  .where('Status', 'equal', 'Active')
  .or('Status', 'equal', 'Pending');
```

### clone()

Create copy of query.

```typescript
const query1 = new Query().where('id', 'equal', 1);
const query2 = query1.clone().take(10);
// query1 unchanged, query2 has take(10)
```

### requiresCount()

Include total count in result.

```typescript
new Query().requiresCount().take(10);
// Result: { result: [...], count: total }
```

### toQuery()

Get query string (advanced).

```typescript
const query = new Query().where('id', 'equal', 1);
const queryStr = query.toQuery();
// Returns: "$filter=id eq 1"
```

---

## Examples

### Simple Filter

```typescript
new Query()
  .where('Department', 'equal', 'Sales')
  .take(10)
```

### Complex Filter with Multiple Conditions

```typescript
new Query()
  .where('Department', 'equal', 'Sales')
  .where('Salary', 'greaterThan', 50000)
  .where('YearsExperience', 'greaterThanOrEqual', 5)
  .or('Department', 'equal', 'Engineering')
  .sortByDescending('Salary')
  .take(20)
```

### Pagination with Sort

```typescript
const pageNumber = 2;
const pageSize = 20;

new Query()
  .sortBy('OrderDate')
  .skip((pageNumber - 1) * pageSize)
  .take(pageSize)
```

### Grouping and Aggregation

```typescript
new Query()
  .where('Year', 'equal', 2024)
  .group('Department')
  .aggregate('sum', 'Sales')
  .aggregate('count', 'id')
```

### Select Specific Fields

```typescript
new Query()
  .from('Products')
  .select('ProductID', 'ProductName', 'UnitPrice')
  .where('Discontinued', 'equal', false)
  .top(10)
```

### OData Expand (Relations)

```typescript
new Query()
  .from('Orders')
  .select('OrderID', 'Customer/CompanyName')
  .expand('Customer')
  .take(5)
```

---

## Chaining Rules

1. Start with `new Query()`
2. Add conditions: `where()`, `or()`
3. Add grouping: `group()`
4. Add sorting: `sortBy()`, `sortByDescending()`
5. Add aggregates: `aggregate()`
6. Add paging: `skip()`, `take()`
7. End with: `dm.executeQuery()` or `dm.executeLocal()`

---

## Query Operators Reference

| Operator | SQL | Example |
|----------|-----|---------|
| equal | = | `.where('id', 'equal', 5)` |
| notEqual | != | `.where('status', 'notEqual', 'deleted')` |
| greaterThan | > | `.where('price', 'greaterThan', 100)` |
| greaterThanOrEqual | >= | `.where('age', 'greaterThanOrEqual', 18)` |
| lessThan | < | `.where('stock', 'lessThan', 10)` |
| lessThanOrEqual | <= | `.where('discount', 'lessThanOrEqual', 50)` |
| startsWith | LIKE 'value%' | `.where('name', 'startsWith', 'John')` |
| endsWith | LIKE '%value' | `.where('email', 'endsWith', '@company.com')` |
| contains | LIKE '%value%' | `.where('description', 'contains', 'urgent')` |
| in | IN (...) | `.where('status', 'in', ['active', 'pending'])` |
| notIn | NOT IN (...) | `.where('status', 'notIn', ['deleted', 'archived'])` |

---

---
title: Deferred Execution and Promises
---

# Deferred API Reference

## Table of Contents
- [Overview](#overview)
- [Promise Basics](#promise-basics)
- [Promise Chain](#promise-chain)
- [Async/Await](#asyncawait)
- [Error Handling Patterns](#error-handling-patterns)
- [Timeout Pattern](#timeout-pattern)
- [Deferred Resolution](#deferred-resolution)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)
- [See Also](#see-also)

---

## Overview

Deferred handles asynchronous operations. DataManager methods return Promises for async handling.

---

## Promise Basics

### then() - Success Handler

```typescript
const query = dm.executeQuery(new Query().take(10));

query.then(result => {
  console.log('Success:', result.result);
});
```

### catch() - Error Handler

```typescript
const query = dm.executeQuery(new Query().take(10));

query.catch(error => {
  console.error('Error:', error.statusText);
});
```

### finally() - Cleanup

```typescript
const query = dm.executeQuery(new Query().take(10));

query
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => {
    console.log('Operation complete');
    hideLoadingSpinner();
  });
```

---

## Promise Chain

### Sequential Operations

```typescript
dm.executeQuery(new Query().take(10))
  .then(result => {
    console.log('Step 1: Got data');
    return processData(result.result);
  })
  .then(processed => {
    console.log('Step 2: Processed');
    return saveToDatabase(processed);
  })
  .then(saved => {
    console.log('Step 3: Saved');
    displayUI(saved);
  })
  .catch(error => console.error('Chain failed:', error));
```

### Parallel Operations

```typescript
Promise.all([
  dm.executeQuery(new Query().take(10)),
  dm.executeQuery(new Query().take(20)),
  dm.executeQuery(new Query().take(30))
])
  .then(results => {
    console.log('All queries complete');
    const [orders, customers, products] = results;
  })
  .catch(error => console.error('One failed:', error));
```

### Race (First to Complete)

```typescript
Promise.race([
  dm.executeQuery(new Query()),
  new Promise((_, reject) =>
    setTimeout(() => reject('Timeout'), 5000)
  )
])
  .then(result => console.log('Got result in time'))
  .catch(error => console.error('Timeout or error:', error));
```

---

## Async/Await

Cleaner syntax than Promise chains.

### Basic Usage

```typescript
async function loadData() {
  try {
    const result = await dm.executeQuery(new Query().take(10));
    console.log('Data:', result.result);
  } catch (error) {
    console.error('Error:', error);
  }
}

loadData();
```

### Sequential with Await

```typescript
async function complexOperation() {
  try {
    // Step 1: Fetch
    const orders = await dm.executeQuery(
      new Query().where('Status', 'equal', 'Pending')
    );
    console.log('Got orders');

    // Step 2: Process
    const processed = await processOrders(orders.result);
    console.log('Processed');

    // Step 3: Save
    const saved = await saveResults(processed);
    console.log('Saved');

    return saved;
  } catch (error) {
    console.error('Failed:', error);
    throw error;  // Propagate
  }
}
```

### Parallel with Await

```typescript
async function fetchAllData() {
  try {
    const [orders, customers, products] = await Promise.all([
      dm.executeQuery(new Query().take(100)),
      dm.executeQuery(new Query().take(50)),
      dm.executeQuery(new Query().take(500))
    ]);

    console.log('All fetched');
    return { orders, customers, products };
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
```

### Loop with Await

```typescript
async function processPages() {
  const pageSize = 20;
  let pageNum = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const result = await dm.executeQuery(
        new Query()
          .skip((pageNum - 1) * pageSize)
          .take(pageSize)
      );

      console.log(`Page ${pageNum}: ${result.result.length} items`);
      await processItems(result.result);

      hasMore = result.result.length === pageSize;
      pageNum++;
    } catch (error) {
      console.error(`Page ${pageNum} failed:`, error);
      break;
    }
  }
}
```

---

## Error Handling Patterns

### Try/Catch

```typescript
async function safeOperation() {
  try {
    const result = await dm.executeQuery(query);
    return result.result;
  } catch (error) {
    if (error.status === 401) {
      redirectToLogin();
    } else if (error.status === 404) {
      showNotFound();
    } else {
      showGenericError();
    }
    return null;
  }
}
```

### Catch Handler

```typescript
dm.executeQuery(query)
  .catch(error => {
    // Handle error
    console.error('Query failed:', error.status);
    
    // Re-throw or return fallback
    if (error.status === 500) {
      // Show error
      return [];  // Return fallback
    }
    throw error;  // Re-throw
  })
  .then(result => {
    // Can reach here with fallback result
    console.log('Result:', result);
  });
```

### Promise.allSettled (All Complete, Some May Fail)

```typescript
async function getAllDataSafely() {
  const results = await Promise.allSettled([
    dm.executeQuery(new Query().take(100)),
    dm.executeQuery(new Query().take(100)),
    dm.executeQuery(new Query().take(100))
  ]);

  const successful = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');

  console.log(`Success: ${successful.length}, Failed: ${failed.length}`);

  return {
    data: successful.map(r => r.value.result),
    errors: failed.map(r => r.reason)
  };
}
```

---

## Timeout Pattern

### Race with Timeout

```typescript
function queryWithTimeout(query, timeoutMs = 5000) {
  return Promise.race([
    dm.executeQuery(query),
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error('Query timeout')),
        timeoutMs
      )
    )
  ]);
}

// Usage
try {
  const result = await queryWithTimeout(query, 3000);
} catch (error) {
  console.error('Timed out:', error.message);
}
```

---

## Deferred Resolution

### Manually Resolve/Reject

```typescript
function queryWithManualControl() {
  return new Promise((resolve, reject) => {
    dm.executeQuery(new Query().take(10))
      .then(result => {
        if (result.result.length > 0) {
          resolve(result);
        } else {
          reject(new Error('No data'));
        }
      })
      .catch(error => {
        // Add custom logic
        reject(error);
      });
  });
}
```

---

## Common Patterns

### Retry with Exponential Backoff

```typescript
async function queryWithRetry(
  query,
  maxRetries = 3,
  baseDelay = 1000
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await dm.executeQuery(query);
    } catch (error) {
      if (attempt === maxRetries) throw error;

      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### Cancel Operation

```typescript
function queryWithCancel(query) {
  let cancelled = false;

  const promise = dm.executeQuery(query)
    .then(result => {
      if (cancelled) throw new Error('Cancelled');
      return result;
    });

  return {
    promise,
    cancel: () => { cancelled = true; }
  };
}

// Usage
const { promise, cancel } = queryWithCancel(query);
setTimeout(() => cancel(), 2000);  // Cancel after 2s
```

---

## Async Iterator Pattern

### Iterate Async Results

```typescript
async function* paginatedQuery(pageSize = 20) {
  let pageNum = 1;
  let hasMore = true;

  while (hasMore) {
    const result = await dm.executeQuery(
      new Query()
        .skip((pageNum - 1) * pageSize)
        .take(pageSize)
    );

    yield result.result;

    hasMore = result.result.length === pageSize;
    pageNum++;
  }
}

// Usage
for await (const page of paginatedQuery(20)) {
  console.log('Page:', page);
}
```

---

## Best Practices

1. **Always handle errors** - Use try/catch or catch()
2. **Use async/await** for readability over Promise chains
3. **Avoid Promise hell** - Keep chains short
4. **Set timeouts** for long operations
5. **Use Promise.all** for parallel independent queries
6. **Use Promise.allSettled** when some failures acceptable
7. **Clean up resources** in finally() block

---

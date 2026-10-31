---
title: Advanced Scenarios with DataManager
---

# Advanced Scenarios

## Table of Contents
- [Offline Mode with RemoteSaveAdaptor](#offline-mode-with-remotesaveadaptor)
- [Load-on-Demand with Deferred](#load-on-demand-with-deferred)
- [Deferred Execution (Promises)](#deferred-execution-promises)
- [Batch Operations](#batch-operations)
- [Multi-Source DataManager](#multi-source-datamanager)
- [Error Recovery & Retry Logic](#error-recovery--retry-logic)
- [Caching Strategies](#caching-strategies)
- [State Persistence](#state-persistence)
- [Real-time Sync with Polling](#real-time-sync-with-polling)

---

## Offline Mode with RemoteSaveAdaptor

### Download Once, Work Offline

```typescript
import { DataManager, RemoteSaveAdaptor, Query } from '@syncfusion/ej2-data';

// Setup for offline capability
const dm = new DataManager({
  url: '/api/products',
  adaptor: new RemoteSaveAdaptor(),
  offline: true,  // Client-side processing
  enableCache: true
});

// Step 1: Load data (stores in-memory)
async function initializeOfflineData() {
  console.log('Downloading data for offline use...');
  
  const result = await dm.executeQuery(new Query().take(10000));
  console.log(`Loaded ${result.result.length} products offline`);
  
  return result.result;
}

// Step 2: Work offline - all filtering client-side
async function filterOffline(category) {
  const result = await dm.executeLocal(
    new Query()
      .where('Category', 'equal', category)
      .where('InStock', 'equal', true)
  );
  
  return result.result;  // Instant results
}

// Step 3: Make changes locally
async function modifyProduct(id, changes) {
  const product = { ProductID: id, ...changes };
  await dm.update('ProductID', product, 'Products');
  console.log('Updated locally (not synced yet)');
}

// Step 4: Sync when online
async function syncToServer() {
  console.log('Syncing changes back to server...');
  
  const result = await dm.executeQuery(new Query());
  console.log('Synced!');
}

// Usage
await initializeOfflineData();
const electronics = await filterOffline('Electronics');
await modifyProduct(1, { Price: 99.99 });
// Now go offline...
// Later, when online again:
await syncToServer();
```

### Progressive Loading

```typescript
// Load data in batches as user scrolls
class ProgressiveLoadManager {
  private dm: DataManager;
  private batchSize = 50;
  private totalLoaded = 0;

  constructor(apiUrl: string) {
    this.dm = new DataManager({
      url: apiUrl,
      adaptor: new UrlAdaptor()
    });
  }

  async loadNextBatch() {
    const result = await this.dm.executeQuery(
      new Query()
        .skip(this.totalLoaded)
        .take(this.batchSize)
    );

    this.totalLoaded += result.result.length;
    console.log(`Loaded batch: ${this.totalLoaded}/${result.count} total`);

    return {
      items: result.result,
      hasMore: this.totalLoaded < result.count,
      total: result.count
    };
  }

  async loadAll() {
    const batches = [];
    let hasMore = true;

    while (hasMore) {
      const batch = await this.loadNextBatch();
      batches.push(...batch.items);
      hasMore = batch.hasMore;
    }

    return batches;
  }
}

// Usage
const loader = new ProgressiveLoadManager('/api/items');
const firstBatch = await loader.loadNextBatch();
console.log(`Loaded ${firstBatch.items.length} of ${firstBatch.total} items`);
```

---

## Load-on-Demand with Deferred

### Lazy Load Data on Scroll

```typescript
class LazyLoadManager {
  private dm: DataManager;
  private cache = new Map();
  private loading = false;

  constructor(apiUrl: string) {
    this.dm = new DataManager({
      url: apiUrl,
      adaptor: new UrlAdaptor()
    });
  }

  async loadPage(pageNumber: number, pageSize: number = 20) {
    const cacheKey = `page_${pageNumber}`;

    // Return from cache if available
    if (this.cache.has(cacheKey)) {
      console.log(`Serving page ${pageNumber} from cache`);
      return this.cache.get(cacheKey);
    }

    if (this.loading) return null;
    this.loading = true;

    // Deferred execution - query returns immediately
    let results;

    try {
      results = await this.dm.executeQuery(
        new Query()
          .skip((pageNumber - 1) * pageSize)
          .take(pageSize)
      );

      this.cache.set(cacheKey, results);
      console.log(`Page ${pageNumber} loaded and cached`);
      return results;
    } finally {
      this.loading = false;
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

// Usage in virtual list
class VirtualListComponent {
  private lazyMgr: LazyLoadManager;
  private visibleItems = [];

  constructor(apiUrl: string) {
    this.lazyMgr = new LazyLoadManager(apiUrl);
  }

  async onScroll(scrollPosition: number) {
    const visiblePageNumber = Math.floor(scrollPosition / 20) + 1;

    const pageData = await this.lazyMgr.loadPage(visiblePageNumber);

    if (pageData) {
      this.visibleItems = pageData.result;
      this.renderItems();
    }
  }

  renderItems() {
    console.log('Rendering', this.visibleItems.length, 'items');
  }
}
```

---

## Deferred Execution (Promises)

The `Deferred` object in DataManager provides a way to manage asynchronous operations. It allows you to control when operations complete and how to handle results using `.resolve()`, `.reject()`, `.then()`, and `.catch()` methods.

### Basic Deferred Usage

```typescript
import { Deferred } from '@syncfusion/ej2-data';

// Create a deferred object
const deferred = new Deferred();

// Simulate async operation (e.g., fetching from server)
setTimeout(() => {
  const result = { data: [1, 2, 3], count: 3 };
  deferred.resolve(result);  // Mark operation as successful
}, 1000);

// Handle result when ready
deferred.promise.then(result => {
  console.log('Result received:', result);
}).catch(error => {
  console.error('Operation failed:', error);
});
```

### Deferred with Rejection (Error Handling)

```typescript
import { Deferred } from '@syncfusion/ej2-data';

function fetchDataWithError() {
  const deferred = new Deferred();

  setTimeout(() => {
    const error = new Error('Server returned 500');
    deferred.reject(error);  // Mark operation as failed
  }, 1000);

  return deferred;
}

fetchDataWithError()
  .promise
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Failed:', error.message);  // "Server returned 500"
  });
```

### Deferred with Query Execution

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// executeQuery returns a Deferred internally
const deferred = dm.executeQuery(new Query().take(100));

deferred
  .then(result => {
    console.log('Query succeeded:', result.result);
    return result.result;
  })
  .catch(error => {
    console.error('Query failed:', error);
  });
```

### Promise Chaining with Deferred

```typescript
function step1() {
  const deferred = new Deferred();
  setTimeout(() => deferred.resolve({ step: 1, data: [1, 2, 3] }), 500);
  return deferred;
}

function step2(previousResult) {
  const deferred = new Deferred();
  setTimeout(() => {
    deferred.resolve({ 
      step: 2, 
      data: previousResult.data.map(x => x * 2)  // Process data
    });
  }, 500);
  return deferred;
}

// Chain multiple deferred operations
step1()
  .promise
  .then(res1 => {
    console.log('Step 1 complete:', res1);
    return step2(res1).promise;
  })
  .then(res2 => {
    console.log('Step 2 complete:', res2);
  })
  .catch(error => {
    console.error('Chain failed:', error);
  });
```

---

## Batch Operations

### Batch Insert/Update/Delete

```typescript
class BatchOperationManager {
  private dm: DataManager;
  private batchSize = 100;

  constructor() {
    this.dm = new DataManager({
      url: '/api/orders',
      adaptor: new RemoteSaveAdaptor(),

    });
  }

  async batchInsert(records: any[]) {
    const results = [];

    for (let i = 0; i < records.length; i += this.batchSize) {
      const batch = records.slice(i, i + this.batchSize);
      
      const result = await this.dm.insert(batch, 'Orders');
      results.push(...result);
      
      console.log(`Inserted batch ${Math.ceil(i / this.batchSize) + 1}`);
    }

    return results;
  }

  async batchUpdate(records: any[]) {
    const failures = [];

    const promises = records.map(async (record) => {
      try {
        await this.dm.update('OrderID', record, 'Orders');
      } catch (error) {
        failures.push({ record, error });
      }
    });

    await Promise.all(promises);
    return { success: records.length - failures.length, failures };
  }

  async batchDelete(ids: number[]) {
    const promises = ids.map(id => this.dm.remove('OrderID', id, 'Orders'));
    
    try {
      await Promise.allSettled(promises);
      console.log(`Deleted ${ids.length} records`);
    } catch (error) {
      console.error('Batch delete failed:', error);
    }
  }
}

// Usage
const batchMgr = new BatchOperationManager();

const newOrders = Array.from({ length: 500 }, (_, i) => ({
  CustomerID: `CUSTOMER${i}`,
  Freight: Math.random() * 100
}));

const created = await batchMgr.batchInsert(newOrders);
console.log(`Created ${created.length} orders`);
```

---

## Multi-Source DataManager

### Aggregate Data from Multiple APIs

```typescript
class AggregateDataManager {
  private dmOrders: DataManager;
  private dmCustomers: DataManager;
  private dmProducts: DataManager;

  constructor() {
    this.dmOrders = new DataManager({
      url: '/api/orders',
      adaptor: new UrlAdaptor()
    });

    this.dmCustomers = new DataManager({
      url: '/api/customers',
      adaptor: new UrlAdaptor()
    });

    this.dmProducts = new DataManager({
      url: '/api/products',
      adaptor: new UrlAdaptor()
    });
  }

  async getDashboardData() {
    // Fetch from all sources in parallel
    const [orders, customers, products] = await Promise.all([
      this.dmOrders.executeQuery(new Query().take(1000)),
      this.dmCustomers.executeQuery(new Query().take(100)),
      this.dmProducts.executeQuery(new Query().take(500))
    ]);

    return {
      orderCount: orders.count,
      customerCount: customers.count,
      productCount: products.count,
      topOrders: orders.result.slice(0, 10),
      activeCustomers: customers.result.filter(c => c.Status === 'Active')
    };
  }

  async getOrderDetails(orderId: number) {
    // Get order, customer, and products in parallel
    const orderQuery = this.dmOrders.executeQuery(
      new Query().where('OrderID', 'equal', orderId)
    );

    const customerQuery = this.dmCustomers.executeQuery(new Query());
    const productQuery = this.dmProducts.executeQuery(new Query());

    const [orderResult, customersResult, productsResult] = await Promise.all([
      orderQuery,
      customerQuery,
      productQuery
    ]);

    const order = orderResult.result[0];
    const customer = customersResult.result.find(c => c.CustomerID === order.CustomerID);
    const products = productsResult.result;

    return { order, customer, products };
  }
}
```

---

## Error Recovery & Retry Logic

### Smart Retry with Exponential Backoff

```typescript
class ResilientDataManager {
  private dm: DataManager;
  private maxRetries = 3;
  private baseDelay = 1000;

  constructor(apiUrl: string) {
    this.dm = new DataManager({
      url: apiUrl,
      adaptor: new UrlAdaptor()
    });
  }

  async executeWithRetry(query: Query) {
    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${this.maxRetries}`);
        return await this.dm.executeQuery(query);
      } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempt} failed:`, error.statusText);

        // Don't retry on client errors
        if (error.status >= 400 && error.status < 500) {
          throw error;
        }

        // Retry with exponential backoff
        if (attempt < this.maxRetries) {
          const delay = this.baseDelay * Math.pow(2, attempt - 1);
          console.log(`Waiting ${delay}ms before retry...`);
          await this.delay(delay);
        }
      }
    }

    throw lastError;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage
const resilientDm = new ResilientDataManager('/api/orders');

try {
  const result = await resilientDm.executeWithRetry(
    new Query().take(10)
  );
  console.log('Success:', result.result);
} catch (error) {
  console.error('Failed after retries:', error);
}
```

---

## Caching Strategies

### TTL-based Caching

```typescript
class CachedDataManager {
  private dm: DataManager;
  private cache = new Map<string, any>();
  private cacheTTL = 60000;  // 1 minute

  constructor(apiUrl: string) {
    this.dm = new DataManager({
      url: apiUrl,
      adaptor: new UrlAdaptor()
    });
  }

  async executeQueryWithCache(query: Query) {
    const cacheKey = query.toQuery ? query.toQuery() : JSON.stringify(query);

    // Check cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTTL) {
        console.log('Serving from cache');
        return cached.data;
      }
      
      // Cache expired
      this.cache.delete(cacheKey);
    }

    // Fetch fresh
    console.log('Fetching fresh data');
    const result = await this.dm.executeQuery(query);

    // Store in cache
    this.cache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    });

    return result;
  }

  clearCache() {
    this.cache.clear();
  }

  clearExpiredCache() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheTTL) {
        this.cache.delete(key);
      }
    }
  }
}
```

---

## State Persistence

Syncfusion DataManager provides built-in state persistence using browser localStorage. Query states are automatically saved and restored across page reloads.

### Basic State Persistence

```typescript
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'api.example.com/orders',
  adaptor: new WebApiAdaptor(),
  enablePersistence: true,      // Enable state persistence
  id: 'tsOrderManager'          // Unique ID for localStorage key
});

// Execute query with sorting
const query = new Query()
  .sortBy('CustomerID', 'descending')
  .take(10);

dataManager.executeQuery(query)
  .then((result) => {
    console.log('Orders loaded:', result.result);
    // Query state (sorting) automatically saved to localStorage
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// After page reload, the sorting state is automatically restored
```

### Excluding Queries from Persistence

```typescript
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'api.example.com/products',
  adaptor: new UrlAdaptor(),
  enablePersistence: true,
  id: 'tsProductManager',
  ignoreOnPersist: ['onSortBy', 'onSearch']  // Don't persist sorting and search
});

// These queries will be persisted: filtering, grouping
// These will NOT be persisted: sorting, search

const query = new Query()
  .where('Status', 'equal', 'Active')
  .sortBy('Price', 'descending');  // Won't persist

dataManager.executeQuery(query)
  .then((result) => {
    console.log('Filtered products:', result.result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Retrieve Persisted State

```typescript
import { DataManager } from '@syncfusion/ej2-data';

// Get the persisted query state from localStorage
function getPersistedState(): any {
  const persisted = DataManager.getPersistedData('tsOrderManager');
  console.log('Persisted state:', persisted);
  // Output: { onSortBy: [{field: 'CustomerID', direction: 'descending'}], ... }
  return persisted;
}

// Usage
const state = getPersistedState();
```

### Update Persisted State

```typescript
import { DataManager, Query } from '@syncfusion/ej2-data';

// Create a new query to be persisted
const newQuery = new Query()
  .where('Freight', 'greaterThan', 100)
  .sortBy('EmployeeID', 'descending');

// Update the persisted state in localStorage
DataManager.setPersistData(
  null,                    // event: null when not in event context
  'tsOrderManager',       // DataManager id
  newQuery               // New query to persist
);

console.log('Persisted state updated');
```

### Clear Persisted State

```typescript
import { DataManager } from '@syncfusion/ej2-data';

// Remove all persisted data for this DataManager
function clearPersistedState(): void {
  DataManager.clearPersistence('tsOrderManager');
  console.log('Persisted state cleared - DataManager reset to initial state');
}

// Clear persistence on logout
function handleLogout(): void {
  // Clear all DataManager instances
  DataManager.clearPersistence('tsOrderManager');
  DataManager.clearPersistence('tsProductManager');
  console.log('All persisted states cleared');
}

// Usage
clearPersistedState();
```

### Persistence Properties Reference

| Property | Type | Purpose |
|----------|------|---------|
| `enablePersistence` | boolean | Enable/disable state persistence |
| `id` | string | Unique identifier for localStorage key |
| `ignoreOnPersist` | string[] | Query types to exclude: `onSortBy`, `onSearch`, `onWhere`, `Grouping` |

---

## Real-time Sync with Polling

### Periodic Data Refresh

```typescript
class PollingDataManager {
  private dm: DataManager;
  private pollInterval = 5000;  // 5 seconds
  private pollTimerId: NodeJS.Timeout | null = null;
  private onUpdate: (data: any) => void;

  constructor(apiUrl: string, onUpdate: (data: any) => void) {
    this.dm = new DataManager({
      url: apiUrl,
      adaptor: new UrlAdaptor()
    });
    this.onUpdate = onUpdate;
  }

  startPolling() {
    if (this.pollTimerId) return;

    console.log('Starting data polling...');

    this.pollTimerId = setInterval(async () => {
      try {
        const result = await this.dm.executeQuery(new Query().take(100));
        this.onUpdate(result.result);
      } catch (error) {
        console.error('Poll failed:', error);
      }
    }, this.pollInterval);
  }

  stopPolling() {
    if (this.pollTimerId) {
      clearInterval(this.pollTimerId);
      this.pollTimerId = null;
      console.log('Polling stopped');
    }
  }

  setPollInterval(ms: number) {
    this.pollInterval = ms;
    this.stopPolling();
    this.startPolling();
  }
}

// Usage
function onDataUpdate(freshData: any) {
  console.log('Data updated:', freshData);
  refreshUI(freshData);
}

const poller = new PollingDataManager('/api/orders', onDataUpdate);
poller.startPolling();

// Later, stop polling
// poller.stopPolling();
```

### Manual Cache Clearing with clearCache()

Clear cached data explicitly using the `clearCache()` method:

```typescript
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor(),
  enableCache: true,
  enablePersistence: true
});

// Load and cache data
const result = await dm.executeQuery(new Query());
console.log('Data cached');

// Clear all cached data
dm.clearCache();
console.log('Cache cleared');

// Next query hits server
const freshResult = await dm.executeQuery(new Query());
console.log('Fresh data from server');
```

**Method signature:** `dm.clearCache()`

**Purpose:** Clears all cached data from memory and offline storage

**When to use:**
- After modifying offline data
- During user logout or session end
- Resetting application state
- Manually invalidating entire cache
- After critical data updates

**Real-world example - Authentication:**

```typescript
class AuthService {
  private dm: DataManager;

  constructor() {
    this.dm = new DataManager({
      url: '/api/data',
      adaptor: new UrlAdaptor(),
      enableCache: true,
      enablePersistence: true
    });
  }

  async login(username: string, password: string): Promise<void> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        console.log('Login successful');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      
      // Clear sensitive cached data before logout
      this.dm.clearCache();
      
      // Clear storage
      localStorage.clear();
      sessionStorage.clear();
      
      console.log('Logout complete - cache cleared');
      
      // Redirect to login
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  async performCriticalUpdate(data: any): Promise<void> {
    try {
      const response = await fetch('/api/data/critical', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        // Force fresh data load
        this.dm.clearCache();
        console.log('Critical update complete - cache cleared');
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  }
}
```

**DataManager with offline and caching:**

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor(),
  enableCache: true,
  enablePersistence: true,
  offline: true  // Enable offline mode
});

// Initialize with data
dm.ready.then(() => {
  console.log('Data loaded for offline support');
});

// Make changes offline
const offlineChanges = [];
offlineChanges.push(dm.update('OrderID', { OrderID: 1, Status: 'Shipped' }, 'Orders'));

// When back online, clear cache to force refresh with server-side changes
window.addEventListener('online', () => {
  dm.clearCache();
  console.log('Back online - cache cleared, ready for sync');
});

// Manual clear at critical points
function resetToServerState() {
  dm.clearCache();
  // Re-fetch from server
  dm.executeQuery(new Query()).then(result => {
    console.log('Synced with server state');
  });
}
```

**Automatic vs Manual Cache Clearing:**

```typescript
// AUTOMATIC: CRUD operations clear cache
await dm.insert(newOrder, 'Orders');         // Cache cleared automatically
await dm.update('OrderID', updatedOrder, 'Orders');  // Cache cleared
await dm.remove('OrderID', id, 'Orders');   // Cache cleared

// MANUAL: Explicit clearCache() call
dm.clearCache();  // Clear all cache at any time, any reason
```

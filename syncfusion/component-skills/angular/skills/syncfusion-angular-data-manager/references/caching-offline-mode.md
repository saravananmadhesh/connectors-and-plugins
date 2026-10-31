---
title: Caching and Offline Mode in Syncfusion Angular DataManager
---

# Caching and Offline Mode in Syncfusion Angular DataManager

## Table of Contents

- [Overview](#overview)
- [Offline Mode Configuration](#offline-mode-configuration)
- [Data Persistence with localStorage](#data-persistence-with-localstorage)
- [Cache Auto-clearing Rules](#cache-auto-clearing-rules)
- [Manual Cache Management](#manual-cache-clearing-with-clearcache)
- [Online/Offline Workflow](#onlineoffline-workflow)
- [Sync Strategies](#sync-strategies)
- [Performance Optimization](#performance-optimization)

---

## Overview

DataManager provides two key optimization features:

- **Offline Mode** — Load all data at initialization, work without server connection
- **Caching** — Reduce redundant server requests by storing responses

Both features are essential for:
- Mobile applications with intermittent connectivity
- Reducing server load
- Improving application performance
- Better user experience during network issues

---

##Offline Mode Configuration

### Enable Offline Mode

```typescript
import { DataManager, Query, WebApiAdaptor, ReturnOption } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  offline: true  // ENABLE OFFLINE MODE
});

// Data will be loaded during initialization with offline: true
// All queries will then execute locally without server calls
console.log('DataManager initialized with offline mode enabled');
```

### How Offline Mode Works

```typescript
// STEP 1: Load all data at initialization
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  offline: true
});

// STEP 2: Data is loaded during initialization
// Execute queries locally on the cached data
const query = new Query()
  .where('Freight', 'greaterThan', 50)
  .sortBy('CustomerID')
  .take(20);

// STEP 3: Queries run CLIENT-SIDE (no server calls)
dataManager.executeQuery(
  new Query()
    .where('Freight', 'greaterThan', 50)
    .sortBy('CustomerID')
    .take(20)
)
  .then((result) => {
    // Uses local data, instant result
    console.log('Filtered records:', result.result);
  });
```

### Manual Data Loading for Offline

```typescript
// For manual control, load via HTTP then use locally
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

loadDataForOffline(): void {
  this.http.get<any[]>('url')
    .subscribe((data) => {
      const dataManager = new DataManager({
        json: data,
        adaptor: new JsonAdaptor()
      });

      // All operations are client-side
      const result = dataManager.executeLocal(
        new Query().take(10)
      );
    });
}
```

---

## Data Persistence with localStorage

### Save Data to localStorage

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
async saveDataOffline(): Promise<void> {
  const dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  try {
    const result = await dataManager.executeQuery(new Query());
    
    // Save to browser storage
    localStorage.setItem(
      'cached_orders',
      JSON.stringify(result.result)
    );
    
    // Save metadata
    localStorage.setItem('cached_orders_timestamp', new Date().toISOString());
    
    console.log('Data saved for offline use');
  } catch (error) {
    console.error('Failed to cache data:', error);
  }
}
```

### Load Data from localStorage

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
loadDataFromCache(): any[] {
  const cached = localStorage.getItem('cached_orders');
  const timestamp = localStorage.getItem('cached_orders_timestamp');

  if (cached && timestamp) {
    const age = Date.now() - new Date(timestamp).getTime();
    const oneHour = 60 * 60 * 1000;

    if (age < oneHour) {
      console.log('Using cached data (fresh)');
      return JSON.parse(cached);
    } else {
      console.log('Cache expired, fetching fresh data');
      localStorage.removeItem('cached_orders');
      localStorage.removeItem('cached_orders_timestamp');
      return [];
    }
  }

  return [];
}
```

### Cache Strategy with Expiration

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
@Injectable({ providedIn: 'root' })
export class CacheService {
  private cacheKey = (name: string) => `cache_${name}`;
  private timestampKey = (name: string) => `cache_timestamp_${name}`;
  private cacheExpiry = 1 * 60 * 60 * 1000; // 1 hour

  set(name: string, data: any): void {
    localStorage.setItem(this.cacheKey(name), JSON.stringify(data));
    localStorage.setItem(this.timestampKey(name), Date.now().toString());
  }

  get(name: string): any {
    const data = localStorage.getItem(this.cacheKey(name));
    const timestamp = localStorage.getItem(this.timestampKey(name));

    if (!data || !timestamp) return null;

    const age = Date.now() - parseInt(timestamp);
    if (age > this.cacheExpiry) {
      this.remove(name);
      return null;
    }

    return JSON.parse(data);
  }

  remove(name: string): void {
    localStorage.removeItem(this.cacheKey(name));
    localStorage.removeItem(this.timestampKey(name));
  }

  clear(): void {
    localStorage.clear();
  }
}
```

---

## Cache Auto-clearing Rules

### When DataManager Clears Cache

Cache automatically clears when CRUD operations occur:

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  offline: true
});

// Data is automatically cached when offline: true is set
// No need to wait explicitly

// INSERT → Cache clears (new record added to server)
dataManager.insert({ CustomerID: 'NEW', Freight: 25 }, 'Orders')
  .then(() => {
    // Cache invalidated automatically
    console.log('Record inserted, cache cleared');
  });

// UPDATE → Cache clears
dataManager.update('OrderID', { OrderID: 10248, Freight: 50 }, 'Orders')
  .then(() => {
    console.log('Record updated, cache cleared');
  });

// DELETE → Cache clears
dataManager.remove('OrderID', 10248, 'Orders')
  .then(() => {
    console.log('Record deleted, cache cleared');
  });
```

### After CRUD, Re-fetch Fresh Data

```typescript
async performCrudAndRefresh(newRecord: any): Promise<void> {
  const dataManager = new dataManager({
    url: 'url',
    adaptor: new WebApiAdaptor(),
    offline: true
  });

  try {
    // 1. Insert new record
    await dataManager.insert(newRecord, 'Orders');
    console.log('Inserted successfully');

    // 2. Cache cleared automatically
    // 3. Manually re-fetch to get fresh data including new record
    const freshResult = await dataManager.executeQuery(new Query());
    this.orders = freshResult.result;

  } catch (error) {
    console.error('CRUD failed:', error);
  }
}
```

---

## Manual Cache Clearing with clearCache()

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Clear cached data explicitly using the `clearCache()` method:

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true,
  offline: true
});

// Data is automatically loaded and cached with offline: true

// Option 1: Clear all cache manually
dataManager.clearCache();
console.log('Cache cleared');

// Next query hits server
dataManager.executeQuery(new Query()).then((result) => {
  console.log('Fresh data from server');
});
```

**Method signature:** `dm.clearCache()`

**Purpose:** Clears cached data from offline mode or browser storage

**When to use:**
- After modifying offline data
- During user logout or session end
- Resetting application state
- Manually invalidating entire cache
- After critical system updates

**Example in Angular service:**

```typescript
@Injectable({ providedIn: 'root' })
export class OrderService {
  private dm: DataManager;

  constructor() {
    this.dm = new DataManager({
      url: '/api/orders',
      adaptor: new WebApiAdaptor(),
      enableCache: true
    });
  }

  clearAllCache(): void {
    // Clear all cached orders
    this.dm.clearCache();
    console.log('All order cache cleared');
  }

  async logout(): Promise<void> {
    // Security: Clear sensitive cached data
    this.dm.clearCache();
    // Clear other caches
    localStorage.clear();
    sessionStorage.clear();
  }

  async performCriticalUpdate(data: any): Promise<void> {
    // Make update to critical data
    await this.dm.update('OrderID', data, 'Orders');
    
    // Force all components to refresh
    this.dm.clearCache();
    
    console.log('Critical update complete - cache cleared');
  }
}
```

**Usage in component:**

```typescript
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  onLogout() {
    this.orderService.logout();
    // Redirect to login
  }

  onCriticalUpdate() {
    // After important system change
    this.orderService.clearAllCache();
    this.loadOrders(); // Reload fresh data
  }
}
```

**Difference: Automatic vs Manual Clearing:**

- **Automatic:** CRUD operations automatically clear cache
  ```typescript
  await dm.insert(newOrder, 'Orders');   // Auto-clears cache
  await dm.update('OrderID', updated, 'Orders');    // Auto-clears cache
  ```

- **Manual:** Explicit control with clearCache()
  ```typescript
  dm.clearCache();  // Explicit clear for all cache
  ```

---

## Online/Offline Workflow

### Detect Network Status

```typescript
@Injectable({ providedIn: 'root' })
export class NetworkService {
  private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  public online$ = this.onlineSubject.asObservable();

  constructor() {
    window.addEventListener('online', () => this.onlineSubject.next(true));
    window.addEventListener('offline', () => this.onlineSubject.next(false));
  }

  isOnline(): boolean {
    return this.onlineSubject.value;
  }
}
```

### Adaptive Data Loading

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
@Component({
  selector: 'app-adaptive-data',
  templateUrl: './adaptive-data.component.html'
})
export class AdaptiveDataComponent implements OnInit {
  public orders: any[] = [];
  public isOnline = true;

  constructor(
    private networkService: NetworkService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.networkService.online$.subscribe((online) => {
      this.isOnline = online;
      this.loadData();
    });
  }

  loadData(): void {
    if (this.isOnline) {
      // Online: Fetch fresh data and save for offline
      this.dataService.getOrders()
        .then((result) => {
          this.orders = result;
          localStorage.setItem('cached_orders', JSON.stringify(result));
        })
        .catch((error) => {
          console.error('Load failed:', error);
          this.loadFromCache();
        });
    } else {
      // Offline: Use cached data
      this.loadFromCache();
    }
  }

  loadFromCache(): void {
    const cached = localStorage.getItem('cached_orders');
    this.orders = cached ? JSON.parse(cached) : [];
  }
}
```

### Queue Operations While Offline

```typescript
@Injectable({ providedIn: 'root' })
export class OfflineQueueService {
  private queue: any[] = [];

  constructor(private networkService: NetworkService) {
    this.networkService.online$.subscribe((online) => {
      if (online) {
        this.processPendingOperations();
      }
    });
  }

  queueOperation(operation: any): void {
    this.queue.push({
      ...operation,
      timestamp: new Date()
    });
    console.log('Operation queued:', operation);
  }

  async processPendingOperations(): Promise<void> {
    while (this.queue.length > 0) {
      const operation = this.queue.shift();
      try {
        await this.executeOperation(operation);
        console.log('Operation completed:', operation);
      } catch (error) {
        console.error('Operation failed, re-queueing:', operation);
        this.queue.unshift(operation);
        break;
      }
    }
  }

  private async executeOperation(operation: any): Promise<any> {
    // Execute the operation (update, insert, delete)
    // Implementation depends on operation type
  }
}
```

---

## Sync Strategies

### Strategy 1: Last-Write-Wins

```typescript
class LastWriteWinsStrategy {
  async sync(localData: any[], remoteData: any[]): Promise<any[]> {
    const merged = [];

    for (const local of localData) {
      const remote = remoteData.find(r => r.id === local.id);

      if (!remote) {
        // Record exists only locally (new)
        merged.push(local);
      } else if (!local.modifiedDate || !remote.modifiedDate) {
        // Fallback to local
        merged.push(local);
      } else {
        // Use whichever was modified last
        const localModified = new Date(local.modifiedDate).getTime();
        const remoteModified = new Date(remote.modifiedDate).getTime();
        merged.push(localModified > remoteModified ? local : remote);
      }
    }

    // Add remote records not in local copy
    for (const remote of remoteData) {
      if (!merged.find(m => m.id === remote.id)) {
        merged.push(remote);
      }
    }

    return merged;
  }
}
```

### Strategy 2: Conflict Resolution

```typescript
class ConflictResolvingSync {
  async sync(localChanges: any[], dataManager: DataManager): Promise<void> {
    const conflicts: any[] = [];

    for (const change of localChanges) {
      try {
        // Try to apply change
        if (change.operation === 'insert') {
          await dataManager.insert(change.data, 'Orders');
        } else if (change.operation === 'update') {
          await dataManager.update('OrderID', change.data, 'Orders');
        } else if (change.operation === 'delete') {
          await dataManager.remove('OrderID', change.id, 'Orders');
        }
      } catch (error: any) {
        if (error.status === 409) {
          // Conflict detected
          conflicts.push({ change, error });
        }
      }
    }

    if (conflicts.length > 0) {
      console.warn('Sync conflicts:', conflicts);
      // Notify user to resolve conflicts
    }
  }
}
```

---

## Performance Optimization

### Lazy Loading with Pagination

```typescript
@Component({
  selector: 'app-lazy-load',
  template: `
    <div>
      <div *ngFor="let order of orders">{{ order.OrderID }}</div>
      <button (click)="loadMore()">Load More</button>
    </div>
  `
})
export class LazyLoadComponent {
  public orders: any[] = [];
  private pageSize = 50;
  private pageIndex = 0;

  constructor(private dataManager: DataManager) {}

  ngOnInit(): void {
    this.loadMore();
  }

  async loadMore(): Promise<void> {
    const result = await this.dataManager.executeQuery(
      new Query()
        .skip(this.pageIndex * this.pageSize)
        .take(this.pageSize)
    );

    this.orders.push(...result.result);
    this.pageIndex++;
  }
}
```

### Memory Management

```typescript
// Clean up large datasets
if (this.orders.length > 10000) {
  // Implement pagination or virtual scrolling
  this.orders = this.orders.slice(0, 5000);
}

// Use trackBy to help Angular with change detection
trackByOrderId(index: number, order: any): number {
  return order.OrderID;
}
```

---

## Complete Example

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
@Component({
  selector: 'app-offline-orders',
  template: `
    <div>
      <p>Status: {{ isOnline ? '🟢 Online' : '🔴 Offline' }}</p>
      <button (click)="syncData()">Sync Data</button>
      <table>
        <tr *ngFor="let order of orders; trackBy: trackByOrderId">
          <td>{{ order.OrderID }}</td>
          <td>{{ order.CustomerID }}</td>
        </tr>
      </table>
    </div>
  `
})
export class OfflineOrdersComponent implements OnInit {
  public orders: any[] = [];
  public isOnline = navigator.onLine;

  constructor(
    private http: HttpClient,
    private networkService: NetworkService
  ) {}

  ngOnInit(): void {
    window.addEventListener('online', () => this.onGoOnline());
    window.addEventListener('offline', () => this.onGoOffline());
    
    this.initializeData();
  }

  private async initializeData(): Promise<void> {
    if (this.isOnline) {
      await this.loadFromServer();
    } else {
      this.loadFromCache();
    }
  }

  private async loadFromServer(): Promise<void> {
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor(),
      offline: true
    });

    try {
      const result = await dm.ready;
      this.orders = result.result || [];
      this.cacheData(this.orders);
    } catch (error) {
      console.error('Load failed:', error);
      this.loadFromCache();
    }
  }

  private loadFromCache(): void {
    const cached = localStorage.getItem('orders_cache');
    this.orders = cached ? JSON.parse(cached) : [];
  }

  private cacheData(data: any[]): void {
    localStorage.setItem('orders_cache', JSON.stringify(data));
    localStorage.setItem('orders_cache_time', Date.now().toString());
  }

  async syncData(): Promise<void> {
    if (this.isOnline) {
      await this.loadFromServer();
    }
  }

  private onGoOnline(): void {
    this.isOnline = true;
    console.log('Connected to network');
    this.loadFromServer();
  }

  private onGoOffline(): void {
    this.isOnline = false;
    console.log('Disconnected from network');
    this.loadFromCache();
  }

  trackByOrderId(index: number, order: any): number {
    return order.OrderID;
  }
}
```

---

---
title: Data Persistence with localStorage
---

# DataManager Persistence

## What is Persistence?

Saves DataManager state (queries, filters, pagination) to browser localStorage so users resume from where they left off.

---

## Enable Persistence

### Basic Setup

```typescript
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor(),
  enablePersistence: true  // Enable automatic persistence
});

// User's current state automatically saved:
// - Skip/Take values (current page)
// - Where conditions (filters)
// - Sort order
// - Selected fields
```

### Configuration

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor(),
  enablePersistence: true,
  id: 'ordersList'  // Custom id (optional)
});

// Persisted data stored in localStorage as:
// localStorage['ordersList'] = { skip: 10, take: 20, where: [...], ... }
```

---

## How Persistence Works

### Automatic Persistence

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor(),
  enablePersistence: true
});

// User navigates to page 5
const result = await dm.executeQuery(
  new Query()
    .skip(80)   // Page 5: records 81-100
    .take(20)
);

// State automatically saved to localStorage

// USER CLOSES BROWSER AND COMES BACK LATER...

// On page reload, DataManager automatically loads previous state
// from localStorage and recreates the query
// Result: User sees page 5 again
```

### Manual State Management

```typescript
// Save current state
function saveState() {
  const currentQuery = new Query()
    .skip(dm.dataSource.skip || 0)
    .take(dm.dataSource.take || 10);

  localStorage.setItem('savedQuery', JSON.stringify(currentQuery));
}

// Restore state
async function restoreState() {
  const savedQuery = JSON.parse(localStorage.getItem('savedQuery'));

  if (savedQuery) {
    const result = await dm.executeQuery(savedQuery);
    console.log('Restored to previous state');
  }
}
```

---

## Persistence Scenarios

### Scenario 1: Filter State Persistence

```typescript
class OrderListManager {
  private dm: DataManager;

  constructor() {
    this.dm = new DataManager({
      url: '/api/orders',
      adaptor: new UrlAdaptor(),
      enablePersistence: true,
      id: 'orderFilters'
    });
  }

  async applyFilters(status: string, dateRange: any) {
    // Build query
    const query = new Query()
      .where('Status', 'equal', status)
      .where('OrderDate', 'greaterThanOrEqual', dateRange.start)
      .where('OrderDate', 'lessThanOrEqual', dateRange.end)
      .take(20);

    // Execute (state auto-saved)
    const result = await this.dm.executeQuery(query);
    
    console.log(`Found ${result.count} orders`);
    return result.result;
  }

  // On next visit, filters are restored automatically
}
```

### Scenario 2: Search Term Persistence

```typescript
class SearchManager {
  private dm: DataManager;
  private lastSearchTerm = '';

  constructor() {
    this.dm = new DataManager({
      url: '/api/search',
      adaptor: new UrlAdaptor(),
      enablePersistence: true,
      id: 'searchState'
    });
  }

  async search(term: string) {
    this.lastSearchTerm = term;

    const query = new Query()
      .where('Name', 'contains', term)
      .where('Status', 'equal', 'Active');

    const result = await this.dm.executeQuery(query);
    
    // State persisted: next visit shows same search
    return result.result;
  }

  getLastSearchTerm() {
    return this.lastSearchTerm;
  }
}
```

### Scenario 3: Pagination State Persistence

```typescript
class PaginatedListManager {
  private dm: DataManager;
  private pageSize = 20;

  constructor() {
    this.dm = new DataManager({
      url: '/api/items',
      adaptor: new UrlAdaptor(),
      enablePersistence: true,
      id: 'paginationState'
    });
  }

  async goToPage(pageNumber: number) {
    const skip = (pageNumber - 1) * this.pageSize;

    const query = new Query()
      .skip(skip)
      .take(this.pageSize);

    const result = await this.dm.executeQuery(query);
    
    // Page number persisted - user returns to same page
    return {
      items: result.result,
      page: pageNumber,
      totalPages: Math.ceil(result.count / this.pageSize)
    };
  }
}
```

---

## Excluding from Persistence

### Exclude Specific Queries

```typescript
// Exclude temporary/one-off queries from persistence
class PersistenceManager {
  private dm: DataManager;

  constructor() {
    this.dm = new DataManager({
      url: '/api/orders',
      adaptor: new UrlAdaptor(),
      enablePersistence: true,
      id: 'orderState'
    });
  }

  // This query will be persisted
  async getPersistentQuery() {
    return this.dm.executeQuery(
      new Query().take(20)  // Saved for next visit
    );
  }

  // Exclude from persistence (one-off report)
  async getQuickReport() {
    // Clear persistence temporarily
    this.dm.enablePersistence = false;

    const result = await this.dm.executeQuery(
      new Query()
        .where('Status', 'equal', 'Completed')
        .aggregate('sum', 'Amount')
    );

    // Re-enable persistence
    this.dm.enablePersistence = true;

    return result;
  }
}
```

---

## Clear Persistence

### Clear All Persisted State

```typescript
function clearPersistedState() {
  // Clear only DataManager persistence key
  localStorage.removeItem('ordersList');

  // Or clear all localStorage
  localStorage.clear();

  location.reload();  // Reload to reset
}

// Button click handler
document.getElementById('clearFilters').addEventListener('click', () => {
  if (confirm('Clear all filters and reset view?')) {
    clearPersistedState();
  }
});
```

### Selective Clear

```typescript
class StateManager {
  private dm: DataManager;

  constructor() {
    this.dm = new DataManager({
      url: '/api/orders',
      adaptor: new UrlAdaptor(),
      enablePersistence: true
    });
  }

  clearFilters() {
    // Clear but keep pagination
    const currentPage = this.dm.dataSource.skip / 20 + 1;
    localStorage.removeItem('orderState');
    this.dm.executeQuery(
      new Query()
        .skip((currentPage - 1) * 20)
        .take(20)
    );
  }

  clearPaginationOnly() {
    const filters = this.getCurrentFilters();
    localStorage.removeItem('orderState');
    this.dm.executeQuery(filters);  // Reapply filters
  }

  getCurrentFilters() {
    // Extract filter conditions from current state
    // Implementation depends on your filters
    return new Query().where('Status', 'equal', 'Active');
  }
}
```

---

## Persistence Patterns

### Remember User Preferences

```typescript
class UserPreferencesManager {
  private dm: DataManager;

  constructor() {
    this.dm = new DataManager({
      url: '/api/products',
      adaptor: new UrlAdaptor(),
      enablePersistence: true,
      id: `userPrefs_${getCurrentUserId()}`  // Per-user
    });
  }

  async applyUserPreferences(userId: string) {
    // Load user's preferred view
    const prefs = JSON.parse(
      localStorage.getItem(`userPrefs_${userId}`) || '{}'
    );

    const query = new Query()
      .where('Category', 'equal', prefs.category || 'All')
      .sortBy(prefs.sortField || 'Name');

    return this.dm.executeQuery(query);
  }

  saveUserPreferences(prefs: any) {
    localStorage.setItem(
      `userPrefs_${getCurrentUserId()}`,
      JSON.stringify(prefs)
    );
  }
}
```

### Multi-tab Sync

```typescript
class MultiTabManager {
  private dm: DataManager;

  constructor() {
    this.dm = new DataManager({
      url: '/api/orders',
      adaptor: new UrlAdaptor(),
      enablePersistence: true
    });

    // Listen for storage changes from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === 'orderState') {
        console.log('State changed in another tab');
        this.reloadData();
      }
    });
  }

  async reloadData() {
    // Reapply same query to sync with other tabs
    const result = await this.dm.executeQuery(
      this.dm.dataSource.last
    );
    this.refreshUI(result.result);
  }

  refreshUI(data: any[]) {
    console.log('UI refreshed with latest data');
  }
}
```

---

## Best Practices

1. **Use meaningful ids**: `id: 'dashboardState'` (not `key1`)
2. **Per-user persistence**: Include userId in key
3. **Clear on logout**: Remove persistence when user logs out
4. **Monitor storage size**: localStorage has ~5-10MB limit
5. **Handle storage quota**: Check available space before saving
6. **Version your schema**: Handle breaking changes in persisted state
7. **Don't persist sensitive data**: Avoid persisting PII or credentials

---

## Storage Quota Check

```typescript
async function checkStorageQuota() {
  if (navigator.storage && navigator.storage.estimate) {
    const estimate = await navigator.storage.estimate();
    const percentUsed = (estimate.usage / estimate.quota) * 100;

    console.log(`Storage: ${percentUsed.toFixed(2)}% used`);

    if (percentUsed > 90) {
      console.warn('Storage near quota');
      clearOldPersistence();
    }
  }
}

function clearOldPersistence() {
  // Remove old keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('old_')) {
      localStorage.removeItem(key);
    }
  }
}
```

---

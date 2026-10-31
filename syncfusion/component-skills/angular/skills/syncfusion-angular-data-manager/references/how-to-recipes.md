---
title: How-To Recipes for Syncfusion Angular DataManager
---

# How-To Recipes: Common Patterns and Solutions

## Table of Contents

- [Work in Offline Mode](#work-in-offline-mode)
- [Send Additional Parameters](#send-additional-parameters)
- [Add Custom Headers](#add-custom-headers)
- [Implement Authentication](#implement-authentication)
- [Handle Errors Gracefully](#handle-errors-gracefully)
- [Implement Search](#implement-search)
- [Sort by Multiple Fields](#sort-by-multiple-fields)
- [Group and Aggregate](#group-and-aggregate)
- [Real-time Data Updates](#real-time-data-updates)

---

## Work in Offline Mode

### Recipe: Load Data Once, Work Without Server

```typescript
// Complete implementation
@Component({
  selector: 'app-offline-recipe',
  template: `
    <button (click)="toggleOnline()">{{ isOnline ? 'Go Offline' : 'Go Online' }}</button>
    <input [(ngModel)]="filterText" placeholder="Search (works offline too)">
    <table>
      <tr *ngFor="let item of filteredItems">
        <td>{{ item.OrderID }}</td>
        <td>{{ item.CustomerID }}</td>
      </tr>
    </table>
  `
})
export class OfflineRecipeComponent implements OnInit {
  public isOnline = true;
  public filterText = '';
  public items: any[] = [];

  get filteredItems(): any[] {
    if (!this.filterText) return this.items;
    
    const dm = new DataManager({ json: this.items, adaptor: new JsonAdaptor() });
    return dm.executeLocal(
      new Query().where('CustomerID', 'contains', this.filterText)
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor(),
      offline: true  // Load all data, enable offline
    });

    try {
      // Data is loaded with offline: true
      // Execute a query to get all cached records
      const result = dm.executeLocal(new Query());
      this.items = result || [];
      console.log(`Loaded ${this.items.length} records for offline use`);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }

  toggleOnline(): void {
    this.isOnline = !this.isOnline;
    console.log(this.isOnline ? 'Online mode' : 'Offline mode');
  }
}
```

---

## Send Additional Parameters

### Recipe: Pass Custom Query Parameters to API

```typescript
// The user.created the API and wants to send custom parameters
// API expects: /api/orders?department=sales&region=north

@Component({
  selector: 'app-params-recipe'
})
export class ParamsRecipeComponent implements OnInit {
  ngOnInit(): void {
    this.loadWithParameters();
  }

  private loadWithParameters(): void {
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    const query = new Query()
      .addParams('department', 'sales')
      .addParams('region', 'north')
      .take(10);

    dm.executeQuery(query)
      .then((result) => {
        console.log('Results:', result.result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

// Result URL: /api/orders?department=sales&region=north&$take=10
```

---

## Add Custom Headers

### Recipe: Send Authorization and Custom Headers

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-headers-recipe'
})
export class HeadersRecipeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadWithHeaders();
  }

  private loadWithHeaders(): void {
    const token = this.authService.getToken();

    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    dm.executeQuery(new Query().take(10))
      .then((result) => {
        console.log('Data with headers:', result.result);
      });
  }
}

// HTTP Request headers:
// Authorization: send_token
// X-API-Version: 2.0
// X-Custom-Header: custom-value
// Accept-Language: en-US
```

---

## Implement Authentication

### Recipe: JWT Token-based Authentication

```typescript
@Injectable({ providedIn: 'root' })
export class AuthenticatedDataService {
  private token: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = this.auth.getToken();
    this.auth.tokenRefreshed$.subscribe(newToken => {
      this.token = newToken;
    });
  }

  getDataManager(url: string): DataManager {
    return new DataManager({
      url: url,
      adaptor: new WebApiAdaptor()
    });
  }

  async loadSecuredData(endpoint: string): Promise<any> {
    const dm = this.getDataManager(endpoint);

    try {
      const result = await dm.executeQuery(new Query().take(10));
      return result.result;
    } catch (error: any) {
      if (error.status === 401) {
        // Token expired, refresh and retry
        await this.auth.refreshToken();
        return this.loadSecuredData(endpoint);
      }
      throw error;
    }
  }
}

// Usage in Component
@Component({
  selector: 'app-auth-recipe'
})
export class AuthRecipeComponent implements OnInit {
  public data: any[] = [];

  constructor(private dataService: AuthenticatedDataService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.data = await this.dataService.loadSecuredData('url');
    } catch (error) {
      console.error('Failed to load secured data:', error);
    }
  }
}
```

---

## Handle Errors Gracefully

### Recipe: Comprehensive Error Handling

```typescript
@Component({
  selector: 'app-error-recipe',
  template: `
    <div *ngIf="error" class="error-box">
      <h3>{{ error.title }}</h3>
      <p>{{ error.message }}</p>
      <button (click)="retry()" *ngIf="error.retryable">Retry</button>
    </div>
    <div *ngIf="!error && loading" class="loader">Loading...</div>
    <div *ngIf="!error && !loading && items.length">
      <table>
        <tr *ngFor="let item of items">
          <td>{{ item.OrderID }}</td>
        </tr>
      </table>
    </div>
  `
})
export class ErrorRecipeComponent {
  public items: any[] = [];
  public loading = false;
  public error: any = null;

  async loadData(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const dm = new DataManager({
        url: 'url',
        adaptor: new WebApiAdaptor()
      });

      const result = await dm.executeQuery(new Query().take(10));
      this.items = result.result;

    } catch (err: any) {
      this.error = this.parseError(err);
    } finally {
      this.loading = false;
    }
  }

  private parseError(error: any): any {
    const status = error.status || 0;

    const errorMap: { [key: number]: any } = {
      0: {
        title: 'Network Error',
        message: 'Please check your internet connection',
        retryable: true
      },
      400: {
        title: 'Bad Request',
        message: 'Invalid query parameters',
        retryable: false
      },
      401: {
        title: 'Unauthorized',
        message: 'Please login again',
        retryable: false
      },
      404: {
        title: 'Not Found',
        message: 'The requested resource does not exist',
        retryable: false
      },
      500: {
        title: 'Server Error',
        message: 'The server encountered an error. Please try again later',
        retryable: true
      }
    };

    return errorMap[status] || {
      title: 'Unknown Error',
      message: `Error code: ${status}`,
      retryable: true
    };
  }

  async retry(): Promise<void> {
    await this.loadData();
  }
}
```

---

## Implement Search

### Recipe: Real-time Search Across Multiple Fields

```typescript
@Component({
  selector: 'app-search-recipe',
  template: `
    <input 
      [(ngModel)]="searchText" 
      (ngModelChange)="onSearchChange()"
      placeholder="Search orders...">
    <div *ngIf="searching" class="loader">Searching...</div>
    <table>
      <tr *ngFor="let item of searchResults">
        <td>{{ item.OrderID }}</td>
        <td>{{ item.CustomerID }}</td>
        <td>{{ item.ShipCity }}</td>
      </tr>
    </table>
    <p *ngIf="!searching && searchResults.length === 0">No results found</p>
  `
})
export class SearchRecipeComponent {
  public searchText = '';
  public searchResults: any[] = [];
  public searching = false;
  private allData: any[] = [];
  private searchTimeout: any;

  async ngOnInit(): Promise<void> {
    // Load all data once
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor(),
      offline: true
    });

    const result = await dm.ready;
    this.allData = result.result || [];
  }

  onSearchChange(): void {
    // Debounce search
    clearTimeout(this.searchTimeout);

    if (!this.searchText.trim()) {
      this.searchResults = [];
      return;
    }

    this.searching = true;

    this.searchTimeout = setTimeout(() => {
      const dm = new DataManager({
        json: this.allData,
        adaptor: new JsonAdaptor()
      });

      // Search across multiple fields
      this.searchResults = dm.executeLocal(
        new Query().search(this.searchText, [
          'CustomerID',
          'ShipCity',
          'ShipCountry'
        ])
      );

      this.searching = false;
    }, 300); // Debounce 300ms
  }
}
```

---

## Sort by Multiple Fields

### Recipe: Multi-field Sorting with User Interface

```typescript
@Component({
  selector: 'app-sort-recipe',
  template: `
    <div class="sort-controls">
      <button (click)="toggleSort('CustomerID')">
        Customer {{ getSortIndicator('CustomerID') }}
      </button>
      <button (click)="toggleSort('Freight')">
        Freight {{ getSortIndicator('Freight') }}
      </button>
      <button (click)="resetSort()">Reset</button>
    </div>
    <table>
      <tr *ngFor="let item of sortedItems">
        <td>{{ item.OrderID }}</td>
        <td>{{ item.CustomerID }}</td>
        <td>{{ item.Freight }}</td>
      </tr>
    </table>
  `
})
export class SortRecipeComponent {
  public items: any[] = [];
  private sortFields: Map<string, 'asc' | 'desc'> = new Map();

  async ngOnInit(): Promise<void> {
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    const result = await dm.executeQuery(new Query());
    this.items = result.result;
  }

  toggleSort(field: string): void {
    const current = this.sortFields.get(field);

    if (!current) {
      this.sortFields.set(field, 'asc');
    } else if (current === 'asc') {
      this.sortFields.set(field, 'desc');
    } else {
      this.sortFields.delete(field);
    }

    this.applySort();
  }

  private applySort(): void {
    const dm = new DataManager({
      json: this.items,
      adaptor: new JsonAdaptor()
    });

    let query = new Query();

    this.sortFields.forEach((direction, field) => {
      if (direction === 'asc') {
        query = query.sortBy(field);
      } else {
        query = query.sortByDescending(field);
      }
    });

    this.items = dm.executeLocal(query);
  }

  getSortIndicator(field: string): string {
    const direction = this.sortFields.get(field);
    return direction === 'asc' ? '↑' : direction === 'desc' ? '↓' : '';
  }

  resetSort(): void {
    this.sortFields.clear();
    this.loadItems();
  }

  private async loadItems(): Promise<void> {
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    const result = await dm.executeQuery(new Query());
    this.items = result.result;
  }
}
```

---

## Group and Aggregate

### Recipe: Grouping with Aggregate Calculations

```typescript
@Component({
  selector: 'app-group-recipe'
})
export class GroupRecipeComponent {
  public groupedData: any[] = [];

  async ngOnInit(): Promise<void> {
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    const result = await dm.executeQuery(new Query().group('CustomerID'));

    // Transform grouped result
    this.groupedData = result.result.map((group: any) => ({
      customerID: group.key,
      count: group.items.length,
      totalFreight: group.items.reduce((sum: number, item: any) => sum + item.Freight, 0),
      avgFreight: group.items.reduce((sum: number, item: any) => sum + item.Freight, 0) / group.items.length,
      items: group.items
    }));
  }

  // Template to display grouped data
  template = `
    <div *ngFor="let group of groupedData">
      <h4>{{ group.customerID }}</h4>
      <p>Orders: {{ group.count }}, Total: {{ group.totalFreight | currency }}, Avg: {{ group.avgFreight | currency }}</p>
      <ul>
        <li *ngFor="let item of group.items">
          Order {{ item.OrderID }}: {{ item.Freight | currency }}
        </li>
      </ul>
    </div>
  `;
}
```

---

## Real-time Data Updates

### Recipe: Polling for New Data

```typescript
@Component({
  selector: 'app-realtime-recipe'
})
export class RealtimeRecipeComponent implements OnInit, OnDestroy {
  public items: any[] = [];
  private pollInterval: any;
  private pollFrequency = 30000; // 30 seconds

  ngOnInit(): void {
    this.startPolling();
  }

  private startPolling(): void {
    this.pollInterval = setInterval(() => {
      this.refreshData();
    }, this.pollFrequency);

    // Initial load
    this.refreshData();
  }

  private async refreshData(): Promise<void> {
    const dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    try {
      const result = await dm.executeQuery(
        new Query().orderByDescending('OrderDate').take(10)
      );

      this.items = result.result;
      console.log('Data refreshed at', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Refresh failed:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }
}
```

### Recipe: WebSocket Real-time Updates

```typescript
@Component({
  selector: 'app-websocket-recipe'
})
export class WebsocketRecipeComponent implements OnInit, OnDestroy {
  public items: any[] = [];
  private ws: WebSocket;

  ngOnInit(): void {
    this.connectWebSocket();
  }

  private connectWebSocket(): void {
    this.ws = new WebSocket('url');

    this.ws.onopen = () => {
      console.log('WebSocket connected');
    };

    this.ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      this.handleUpdate(update);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleUpdate(update: any): void {
    const dm = new DataManager({
      json: this.items,
      adaptor: new JsonAdaptor()
    });

    if (update.operation === 'insert') {
      this.items.push(update.data);
    } else if (update.operation === 'update') {
      const index = this.items.findIndex(item => item.OrderID === update.data.OrderID);
      if (index >= 0) {
        this.items[index] = update.data;
      }
    } else if (update.operation === 'delete') {
      this.items = this.items.filter(item => item.OrderID !== update.id);
    }

    console.log('Data updated via WebSocket');
  }

  ngOnDestroy(): void {
    if (this.ws) {
      this.ws.close();
    }
  }
}
```

---

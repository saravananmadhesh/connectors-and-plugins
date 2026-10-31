# Advanced Tutorials & Patterns

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Real-Time Data Updates](#real-time-data-updates)
- [Master-Detail with Filtering](#master-detail-with-filtering)
- [Complex Calculations](#complex-calculations)
- [Advanced Filtering](#advanced-filtering)
- [Custom Themes](#custom-themes)
- [Performance Monitoring](#performance-monitoring)

## When to Use This Skill

Use this skill when you need to:
- **Real-time data updates** — Implement auto-refresh or WebSocket-based live data updates
- **Master-detail scenarios** — Create hierarchical grids with parent-child data relationships
- **Master-detail filtering** — Filter detail grid based on master row selection
- **Complex calculations** — Implement computed columns with custom formulas
- **Advanced filtering** — Build sophisticated multi-criteria filtering UIs
- **Custom themes** — Develop branded or custom-styled grid appearances
- **Performance optimization** — Monitor and optimize grid performance for large datasets
- **Production patterns** — Apply real-world best practices and proven patterns
- **Complex workflows** — Implement multi-step data processing and validation workflows

## Overview

This guide covers advanced patterns, real-world scenarios, and best practices for production grids.

---

## Real-Time Data Updates

### Auto-Refresh Grid Data

```typescript
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-auto-refresh-grid',
  template: `
    <div>
      <label>Refresh every:
        <select [(ngModel)]="refreshInterval" (change)="onRefreshIntervalChange()">
          <option [value]="1000">1 second</option>
          <option [value]="5000">5 seconds</option>
          <option [value]="10000">10 seconds</option>
          <option [value]="30000">30 seconds</option>
        </select>
      </label>

      <ejs-grid #grid [dataSource]="data" [allowPaging]="true">
        <e-columns>
          <!-- columns -->
        </e-columns>
      </ejs-grid>
    </div>
  `
})
export class AutoRefreshGridComponent implements OnInit, OnDestroy {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];
  refreshInterval = 5000;
  private intervalId: any;

  ngOnInit() {
    this.startAutoRefresh();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoRefresh() {
    this.intervalId = setInterval(async () => {
      try {
        const response = await fetch('/api/orders');
        this.data = await response.json();
      } catch (error) {
        console.error('Refresh error:', error);
      }
    }, this.refreshInterval);
  }

  onRefreshIntervalChange() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.startAutoRefresh();
  }
}
```

### WebSocket Real-Time Updates

```typescript
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-websocket-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" [allowPaging]="true">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `
})
export class WebSocketGridComponent implements OnInit, OnDestroy {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];
  private ws: WebSocket;

  ngOnInit() {
    this.connectWebSocket();
  }

  ngOnDestroy() {
    if (this.ws) {
      this.ws.close();
    }
  }

  connectWebSocket() {
    this.ws = new WebSocket('url');

    this.ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const index = this.data.findIndex(item => item.OrderID === newData.OrderID);
      
      if (index >= 0) {
        this.data[index] = newData;
      } else {
        this.data.push(newData);
      }
      
      this.gridInstance.refresh();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
}
```

### SignalR Real-Time Updates

```typescript
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-signalr-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" [allowPaging]="true">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `
})
export class SignalRGridComponent implements OnInit, OnDestroy {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];
  private connection: signalR.HubConnection;

  ngOnInit() {
    this.initializeSignalR();
  }

  ngOnDestroy() {
    if (this.connection) {
      this.connection.stop();
    }
  }

  initializeSignalR() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/orderHub')
      .withAutomaticReconnect()
      .build();

    this.connection.on('OrderUpdated', (updatedOrder) => {
      const index = this.data.findIndex(o => o.OrderID === updatedOrder.OrderID);
      if (index >= 0) {
        this.data[index] = updatedOrder;
        this.gridInstance.setCellValue(index, 'Freight', updatedOrder.Freight);
      }
    });

    this.connection.on('OrderAdded', (newOrder) => {
      this.gridInstance.addRecord(newOrder);
    });

    this.connection.start().catch(err => console.error('Connection error:', err));
  }
}
```

---

## Master-Detail with Filtering

### Filtered Detail Grid

```typescript
import { Component, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-master-detail-grid',
  template: `
    <ejs-grid [dataSource]="orders" (recordClick)="handleMasterRowClick($event)">
      <ng-template #detailTemplate let-data>
        <ejs-grid [dataSource]="getOrderDetails(data.OrderID)" [allowPaging]="true" [pageSettings]="{ pageSize: 5 }">
          <e-columns>
            <e-column field="ProductID" headerText="Product ID" width="100"></e-column>
            <e-column field="ProductName" headerText="Product" width="150"></e-column>
            <e-column field="Quantity" headerText="Quantity" width="100"></e-column>
            <e-column field="UnitPrice" headerText="Unit Price" width="100" format="C2"></e-column>
          </e-columns>
        </ejs-grid>
      </ng-template>
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
        <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd"></e-column>
        <e-column field="Freight" headerText="Freight" width="100" format="C2"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class MasterDetailGridComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    // Load orders data
    this.orders = [...]; // Load from service
  }

  getOrderDetails(orderId: number) {
    // Fetch and return detail data for the order
    return [];
  }

  handleMasterRowClick(args: any) {
    this.selectedOrder = args.rowData;
  }
}
```

---

## Complex Calculations

### Calculated Columns with Aggregates

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculations-grid',
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="Freight" headerText="Freight" width="100" format="C2"></e-column>
        <e-column field="Tax" headerText="Tax (10%)" width="100" format="C2"></e-column>
        <e-column field="Total" headerText="Total" width="100" format="C2"></e-column>
      </e-columns>
      <e-aggregates>
        <e-aggregate>
          <e-columns>
            <e-column field="Freight" type="Sum"></e-column>
            <e-column field="Tax" type="Sum"></e-column>
            <e-column field="Total" type="Sum"></e-column>
          </e-columns>
        </e-aggregate>
      </e-aggregates>
    </ejs-grid>
  `
})
export class CalculationsGridComponent implements OnInit {
  data: any[] = [];

  ngOnInit() {
    this.loadOrdersWithCalculations();
  }

  loadOrdersWithCalculations() {
    const orders = [...]; // Load from service
    this.data = orders.map(order => ({
      ...order,
      Tax: order.Freight * 0.1,
      Total: order.Freight + (order.Freight * 0.1)
    }));
  }
}
```

### Running Totals

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-running-total-grid',
  template: `
    <ejs-grid [dataSource]="enhancedData">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="Freight" headerText="Freight" width="100" format="C2"></e-column>
        <e-column field="RunningTotal" headerText="Running Total" width="150" format="C2"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class RunningTotalGridComponent implements OnInit {
  enhancedData: any[] = [];
  private runningTotal = 0;

  ngOnInit() {
    this.calculateRunningTotals();
  }

  calculateRunningTotals() {
    const orders = [...]; // Load from service
    this.runningTotal = 0;
    this.enhancedData = orders.map(order => {
      this.runningTotal += order.Freight;
      return {
        ...order,
        RunningTotal: this.runningTotal
      };
    });
  }
}
```

---

## Advanced Filtering

### Multi-Column Complex Filter

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Predicate, Query } from '@syncfusion/ej2-data';
import { FilterService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-complex-filter-grid',
  template: `
    <button (click)="applyAdvancedFilter()">Apply Complex Filter</button>

    <ejs-grid #grid [dataSource]="orders" [allowFiltering]="true" [filterSettings]="{ type: 'Menu' }">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" width="100" format="C2"></e-column>
        <e-column field="Status" headerText="Status" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `,
  providers: [FilterService]
})
export class ComplexFilterGridComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  orders: any[] = [];

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orders = [...]; // Load from service
  }

  applyAdvancedFilter() {
    const predicate = new Predicate('Freight', 'greaterThan', 50);
    predicate.and('Status', 'equal', 'Active');
    predicate.or('CustomerID', 'equal', 'VINET');

    this.gridInstance.query = new Query().where(predicate);
    this.gridInstance.refresh();
  }
}
```

### Date Range Filtering

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Predicate, Query } from '@syncfusion/ej2-data';
import { FilterService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-date-range-filter-grid',
  template: `
    <div>
      <label>Start Date:
        <input type="date" [(ngModel)]="startDateString" (change)="onStartDateChange()"</e-column>
      </label>
      <label>End Date:
        <input type="date" [(ngModel)]="endDateString" (change)="onEndDateChange()"</e-column>
      </label>
      <button (click)="applyDateFilter()">Apply Date Filter</button>
    </div>

    <ejs-grid #grid [dataSource]="orders" [allowFiltering]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" width="100" format="C2"></e-column>
      </e-columns>
    </ejs-grid>
  `,
  providers: [FilterService]
})
export class DateRangeFilterGridComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  orders: any[] = [];
  startDate: Date;
  endDate: Date;
  startDateString: string;
  endDateString: string;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orders = [...]; // Load from service
  }

  onStartDateChange() {
    this.startDate = new Date(this.startDateString);
  }

  onEndDateChange() {
    this.endDate = new Date(this.endDateString);
  }

  applyDateFilter() {
    if (this.startDate && this.endDate) {
      const predicate = new Predicate('OrderDate', 'greaterthanorequal', this.startDate);
      predicate.and('OrderDate', 'lessthanorequal', this.endDate);

      this.gridInstance.query = new Query().where(predicate);
      this.gridInstance.refresh();
    }
  }
}
```

---

## Custom Themes

### Dynamic Theme Switching

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switcher-grid',
  template: `
    <select [(ngModel)]="theme" (change)="applyTheme()">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="blue">Blue</option>
    </select>

    <div [ngClass]="'themed-grid-' + theme">
      <ejs-grid [dataSource]="data">
        <e-columns>
          <!-- columns -->
        </e-columns>
      </ejs-grid>
    </div>
  `,
  styles: [`
    .themed-grid-light {
      background-color: #ffffff;
      color: #000000;
    }
    
    .themed-grid-light .e-headercell {
      background-color: #f5f5f5;
      color: #000000;
    }
    
    .themed-grid-dark {
      background-color: #1e1e1e;
      color: #ffffff;
    }
    
    .themed-grid-dark .e-headercell {
      background-color: #333333;
      color: #ffffff;
    }
    
    .themed-grid-blue {
      background-color: #e3f2fd;
      color: #1565c0;
    }
    
    .themed-grid-blue .e-headercell {
      background-color: #1976d2;
      color: #ffffff;
    }
  `]
})
export class ThemeSwitcherGridComponent implements OnInit {
  data: any[] = [];
  theme = 'light';

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.data = [...]; // Load from service
  }

  applyTheme() {
    // Theme applied via ngClass binding
  }
}
```

---

## Performance Monitoring

### Measure Grid Performance

```typescript
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-performance-monitor-grid',
  template: `
    <button (click)="measureInitialLoad()">Measure Load Time</button>
    <button (click)="countDataFetches()">Show Network Metrics</button>

    <ejs-grid #grid [dataSource]="data" (actionComplete)="onActionComplete($event)">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `
})
export class PerformanceGridComponent implements OnInit, OnDestroy {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];
  private observer: PerformanceObserver;

  ngOnInit() {
    this.initializePerformanceMonitoring();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  initializePerformanceMonitoring() {
    this.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.duration}ms`);
      }
    });

    this.observer.observe({ entryTypes: ['measure'] });
  }

  measureInitialLoad() {
    performance.mark('grid-load-start');
    
    // Grid renders here
    
    performance.mark('grid-load-end');
    performance.measure('grid-load', 'grid-load-start', 'grid-load-end');
  }

  countDataFetches() {
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    console.log('Network timing:', {
      dnsLookup: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
      tcpConnect: navigationTiming.connectEnd - navigationTiming.connectStart,
      ttfb: navigationTiming.responseStart - navigationTiming.requestStart,
      download: navigationTiming.responseEnd - navigationTiming.responseStart
    });
  }

  onActionComplete(args: any) {
    console.log(`Action '${args.requestType}' completed at ${performance.now()}ms`);
  }
}
```

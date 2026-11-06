# Data Binding

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Data Source Selection Rule](#️-data-source-selection-rule--choose-the-right-approach)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [DataManager Configuration](#datamanager-configuration)
- [Dynamic Data Updates](#dynamic-data-updates)

## When to Use This Skill

Use this skill when you need to:
- **Bind local data** — Display static arrays or client-side data in the grid
- **Bind remote data** — Connect grid to REST APIs or server endpoints
- **Configure DataManager** — Set up data sources with adaptors and parameters
- **Implement dynamic updates** — Update grid data in response to user actions
- **Handle API responses** — Transform and bind API data to grid
- **Server-side operations** — Configure filtering, sorting, paging on server
- **Real-time data** — Update grid with new data from backend
- **Data source strategies** — Choose between local array and remote DataManager

## Overview

Data binding connects your data source to the grid. Syncfusion Grid supports multiple data binding approaches to handle various scenarios from static arrays to complex API integration.

## ⚠️ Data Source Selection Rule — Choose the Right Approach

**Always default to local array data unless the prompt explicitly mentions a remote API, REST endpoint, or server-side data source.**

| Scenario | Use | How |
|----------|-----|-----|
| Prompt provides sample data, static list, or does NOT mention an API | **Local array** | `[dataSource]="data"` where `data` is a plain JS array |
| Prompt explicitly mentions REST API, remote endpoint, server-side, or URL | **DataManager** | `dataManager = new DataManager({ url: '...', adaptor: new UrlAdaptor() })` |

- ✅ **Local array**: Used when data is hardcoded, provided inline, or when no remote source is mentioned. No imports from `@syncfusion/ej2-data` needed.
- ✅ **DataManager**: Used **only** when the prompt explicitly mentions connecting to a REST API, remote URL, or server-side data source.
- ❌ **Never** use `DataManager` with a remote URL when the prompt asks for local/static data — it will cause data not to load because the URL does not exist.

## Local Data Binding

Bind local array data directly to the grid:

```typescript
import { Component } from '@angular/core';

interface Employee {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  Salary: number;
}

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid [dataSource]="employees">
      <e-columns>
        <e-column field="EmployeeID" headerText="ID" width="100"></e-column>
        <e-column field="FirstName" headerText="First Name" width="120"></e-column>
        <e-column field="LastName" headerText="Last Name" width="120"></e-column>
        <e-column field="Salary" headerText="Salary" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridComponent {
  employees: Employee[] = [
    { EmployeeID: 1, FirstName: 'Nancy', LastName: 'Davolio', Salary: 60000 },
    { EmployeeID: 2, FirstName: 'Andrew', LastName: 'Fuller', Salary: 97000 },
    { EmployeeID: 3, FirstName: 'Janet', LastName: 'Leverling', Salary: 63000 }
  ];
}
```

## Remote Data Binding

### Remote DataManager Quick Checklist

> **Only use DataManager when the prompt explicitly mentions a REST API, remote endpoint, or server-side data. For local/static data use a plain array.**

1. Import `DataManager` and the appropriate adaptor from `@syncfusion/ej2-data`
2. **Always replace the `url` with the actual API endpoint** — never leave a placeholder or demo URL
3. **Match `field` names on `e-column` exactly to the JSON property names returned by the API** — any mismatch causes empty columns
4. Choose the correct adaptor based on your API response shape:
   - `UrlAdaptor` → API returns `{ result: [...], count: N }`
   - `WebApiAdaptor` → API returns a plain array or `{ value: [...], Count: N }`
5. For paging with `UrlAdaptor`, the API **must** return a `count` field with the total record count — without it the pager shows incorrect page numbers
6. Add `[loadingIndicator]="{ indicatorType: 'Spinner' }"` or `'Shimmer'` **only when** the prompt asks for a loading indicator or the scenario explicitly involves async API fetching — never add it for local data
7. With `UrlAdaptor`, all operations (filter, search, sort, page) are **automatically sent server-side** — inject `FilterService`, `SearchService`, `SortService`, `PageService` services as normal; no custom query logic needed
8. For server-side error handling use the `actionFailure` event.

Fetch data from an API or server:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-remote-grid',
  template: `
    <ejs-grid [dataSource]="dataManager">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class RemoteGridComponent implements OnInit {
  public dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });

  ngOnInit() {
    // DataManager will automatically fetch data
  }
}
```

## DataManager Configuration

### Choosing the Right Adaptor

| Adaptor | Use When | Expected API Response |
|---------|----------|-----------------------|
| `UrlAdaptor` | Your API is built to work with Syncfusion DataManager | `{ result: [...], count: N }` |
| `WebApiAdaptor` | Standard Web API returning plain arrays or OData-like responses | `{ value: [...], Count: N }` or plain array |
| `ODataAdaptor` | OData v3 service | OData XML/JSON format |
| `ODataV4Adaptor` | OData v4 service | OData v4 JSON format |
| `JsonAdaptor` | Local array already in memory | Plain JS array |

> ⚠️ **If data is not loading**, the most common causes are:
> 1. **Wrong URL** — the `url` is a placeholder or demo URL, not your real API
> 2. **Wrong adaptor** — your API returns a plain array but you are using `UrlAdaptor` (use `WebApiAdaptor` instead)
> 3. **Wrong field names** — `field` values on `<e-column>` don't match JSON property names returned by the API
> 4. **Missing `count`** — `UrlAdaptor` requires the response to include `"count"` for paging to work

Configure DataManager with custom settings for advanced scenarios:

```typescript
import { Component } from '@angular/core';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-custom-data-grid',
  template: `
    <ejs-grid [dataSource]="dataManager" [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class CustomDataGridComponent {
  public dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    pageSize: 12
  });
}
```

## Dynamic Data Updates

Update grid data dynamically by modifying the data source:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

interface Order {
  OrderID: number;
  CustomerName: string;
  TotalAmount: number;
}

@Component({
  selector: 'app-dynamic-grid',
  template: `
    <button (click)="addOrder()">Add Order</button>
    <button (click)="updateOrder()">Update First Order</button>
    <button (click)="deleteOrder()">Delete Last Order</button>
    
    <ejs-grid #grid [dataSource]="orders">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="TotalAmount" headerText="Total Amount" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class DynamicGridComponent {
  @ViewChild('grid') grid!: GridComponent;
  orders: Order[] = [
    { OrderID: 10248, CustomerName: 'VINET', TotalAmount: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', TotalAmount: 11.61 }
  ];

  addOrder() {
    const newOrder: Order = {
      OrderID: 10250,
      CustomerName: 'HANAR',
      TotalAmount: 65.83
    };
    this.orders = [...this.orders, newOrder];
  }

  updateOrder() {
    if (this.orders.length > 0) {
      this.orders[0].TotalAmount = 100;
      this.orders = [...this.orders]; // Trigger change detection
    }
  }

  deleteOrder() {
    if (this.orders.length > 0) {
      this.orders.pop();
      this.orders = [...this.orders]; // Trigger change detection
    }
  }
}
```

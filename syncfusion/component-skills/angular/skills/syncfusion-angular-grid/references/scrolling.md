# Scrolling

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Virtual Scrolling](#virtual-scrolling)
- [Infinite Scrolling](#infinite-scrolling)
- [Scrolling Events](#scrolling-events)

## When to Use This Skill

Use this skill when you need to:
- **Handle large datasets** — Efficiently display 10K+ rows with virtual scrolling
- **Virtual scrolling** — Render only visible rows for performance
- **Infinite scrolling** — Load more data as user scrolls down
- **Lazy loading** — Load data on demand during scroll
- **Scrolling events** — Hook into scroll lifecycle
- **Progressive data loading** — Implement pagination through scrolling
- **Memory optimization** — Reduce memory usage with large grids

## Overview

Scrolling modes optimize performance for large datasets. Virtual scrolling renders only visible rows, while infinite scrolling loads more data on scroll.

## Virtual Scrolling

Render only visible rows for performance:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-virtual-scroll-grid',
  template: `
    <p style="padding: 10px; color: #666;">
      Virtual Scrolling: Efficiently handles thousands of rows
    </p>
    
    <ejs-grid [dataSource]="largeDataSet" 
              [enableVirtualization]="true"
              [pageSettings]="{ pageSize: 50 }"
              height="400">
      <e-columns>
        <e-column field="EmployeeID" headerText="ID" width="100"></e-column>
        <e-column field="FirstName" headerText="First Name" width="150"></e-column>
        <e-column field="LastName" headerText="Last Name" width="150"></e-column>
        <e-column field="Email" headerText="Email" width="200"></e-column>
        <e-column field="Salary" headerText="Salary" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class VirtualScrollGridComponent {
  largeDataSet = this.generateData(5000);

  generateData(count: number) {
    const firstNames = ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven'];
    const lastNames = ['Davolio', 'Fuller', 'Leverling', 'Peacock', 'Buchanan'];
    const data = [];

    for (let i = 1; i <= count; i++) {
      data.push({
        EmployeeID: i,
        FirstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        LastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        Email: `emp${i}@example.com`,
        Salary: Math.floor(30000 + Math.random() * 70000)
      });
    }
    return data;
  }
}
```

## Infinite Scrolling

Load data dynamically as user scrolls:

```typescript
import { Component } from '@angular/core';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-infinite-scroll-grid',
  template: `
    <ejs-grid [dataSource]="dataManager" 
              [enableInfiniteScrolling]="true"
              [pageSettings]="{ pageSize: 20 }"
              height="400">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class InfiniteScrollGridComponent {
  dataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });
}
```

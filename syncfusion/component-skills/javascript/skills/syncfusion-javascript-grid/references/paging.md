---
name: paging
description: 'Paging in Syncfusion Grid: enable, configuration, customization, events, programmatic control.'
---

# Paging

## Table of Contents
- [Overview](#overview)
- [Enable Paging](#enable-paging)
- [Paging Configuration](#paging-configuration)
- [Pager Customization](#pager-customization)
- [Page Events](#page-events)
- [Programmatic Control](#programmatic-control)

## When to Use This Reference

- Enable paging to divide large datasets into pages
- Configure page size and navigation controls
- Implement custom pager templates and styling
- Handle page change events and programmatic control
- Optimize performance with server-side paging
- [Page Events](#page-events)
- [Programmatic Control](#programmatic-control)

## Overview

Paging divides large datasets into manageable pages, improving load performance and user experience. It displays a specified number of records per page with navigation controls.

> **CSS Requirement:** The Pager (page number buttons, navigation arrows, page-size dropdown) relies on `@syncfusion/ej2-grids/styles/material3.css`. If this import is missing from your CSS file, the pager will render without any styling. Always include the full set of CSS imports — see [Getting Started CSS References](getting-started.md#css-references) for the complete list.

## Enable Paging

### Basic Paging Setup

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' }
  ],
  allowPaging: true
});

grid.appendTo('#grid');
```

### Without Module Injection

The `Page` module must be injected for paging to work. Without it, the pager will not render.

```ts
// ❌ This won't work - Page module not injected
const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true
});

// ✅ This will work
Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true
});

grid.appendTo('#grid');
```

## Paging Configuration

### Configure Page Settings

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const pageSettings = {
  pageSize: 12,        // Records per page (default: 12)
  pageCount: 5,        // Pages to display in pager
  currentPage: 1,      // Currently active page
  pageSizes: [10, 20, 30, 40] // Page size options
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  allowPaging: true,
  pageSettings: pageSettings
});

grid.appendTo('#grid');
```

### Change Page Size

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const data = [...];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 20 }
});

grid.appendTo('#grid');

// Change page size programmatically
function changePageSize(size: number) {
  grid.pageSettings.pageSize = size;
}

document.getElementById('size10')?.addEventListener('click', () => changePageSize(10));
document.getElementById('size20')?.addEventListener('click', () => changePageSize(20));
document.getElementById('size50')?.addEventListener('click', () => changePageSize(50));
```

### Set Initial Page

```ts
const pageSettings = {
  pageSize: 12,
  currentPage: 2  // Start on page 2
};

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  pageSettings: pageSettings
});

grid.appendTo('#grid');
```

### Server-Side Paging

Enable server-side paging with DataManager:

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', format: 'C2', width: 120 }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 20 }
});

grid.appendTo('#grid');
```

### Server Endpoint Expectations

The server should accept these parameters and return paginated results:

```
GET /api/orders?$skip=0&$take=20

Response:
{
  "result": [
    { "OrderID": 10248, "CustomerID": "VINET", ... },
    ...
  ],
  "count": 830  // Total records available
}
```

## Pager Customization

### Hide Pager

```ts
const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  showPagerContainer: false
});

grid.appendTo('#grid');
```

### Custom Pager Template

```ts
const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  pagerTemplate: '<div class="e-pagercontainer"><div class="e-pageritem">${currentPage} of ${totalPages}</div></div>'
});

grid.appendTo('#grid');
```

## Page Events

### Page Change Event

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  actionComplete: (args: any) => {
    if (args.requestType === 'paging') {
      console.log('Current page:', grid.pageSettings.currentPage);
      console.log('Page size:', grid.pageSettings.pageSize);
    }
  }
});

grid.appendTo('#grid');
```

### Paging Events

```ts
const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  actionBegin: (args: any) => {
    if (args.requestType === 'paging') {
      console.log('Navigating to page:', args.currentPage);
    }
  },
  actionComplete: (args: any) => {
    if (args.requestType === 'paging') {
      console.log('Page changed successfully');
    }
  }
});

grid.appendTo('#grid');
```

## Programmatic Control

### Navigate to Specific Page

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true
});

grid.appendTo('#grid');

// Navigate to a specific page
function goToPage(pageNumber: number) {
  grid.goToPage(pageNumber);
}

document.getElementById('goBtn')?.addEventListener('click', () => {
  const pageInput = document.getElementById('pageInput') as HTMLInputElement;
  if (pageInput) {
    goToPage(parseInt(pageInput.value));
  }
});
```

### Get Current Page Info

```ts
const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true
});

grid.appendTo('#grid');

function getCurrentPageInfo() {
  return {
    currentPage: grid.pageSettings.currentPage,
    pageSize: grid.pageSettings.pageSize,
    totalRecords: grid.getCurrentViewRecords().length
  };
}

// Usage
console.log(getCurrentPageInfo());
// Output: { currentPage: 1, pageSize: 12, totalRecords: 12 }
```

### First and Last Page Navigation

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  pageSettings: { pageSize: 20 }
});

grid.appendTo('#grid');

function goToFirstPage() {
  grid.goToPage(1);
}

function goToLastPage() {
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / grid.pageSettings.pageSize!);
  grid.goToPage(totalPages);
}

document.getElementById('firstBtn')?.addEventListener('click', goToFirstPage);
document.getElementById('lastBtn')?.addEventListener('click', goToLastPage);
```

### Dynamic Page Navigation

```ts
const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true,
  pageSettings: { pageSize: 20 }
});

grid.appendTo('#grid');

// Navigate to previous page
function previousPage() {
  const currentPage = grid.pageSettings.currentPage || 1;
  if (currentPage > 1) {
    grid.goToPage(currentPage - 1);
  }
}

// Navigate to next page
function nextPage() {
  const currentPage = grid.pageSettings.currentPage || 1;
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / grid.pageSettings.pageSize!);
  if (currentPage < totalPages) {
    grid.goToPage(currentPage + 1);
  }
}

document.getElementById('prevBtn')?.addEventListener('click', previousPage);
document.getElementById('nextBtn')?.addEventListener('click', nextPage);
```

### Paging with Remote Data

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page);

const remoteData = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

const grid = new Grid({
  dataSource: remoteData,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  allowPaging: true,
  pageSettings: {
    pageSize: 20
  }
});

grid.appendTo('#grid');
```

### Server-Side Paging Implementation

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

let gridInstance: Grid;

const grid = new Grid({
  dataSource: [],
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 20 },
  actionBegin: (args: any) => {
    if (args.requestType === 'paging') {
      handlePageChange(args.currentPage, args.pageSize);
    }
  }
});

grid.appendTo('#grid');
gridInstance = grid;

function handlePageChange(pageNumber: number, pageSize: number) {
  // Send request to server with page number and size
  fetch(`/api/orders?page=${pageNumber}&pageSize=${pageSize}`)
    .then(response => response.json())
    .then((data: any) => {
      gridInstance.dataSource = data.result;
    })
    .catch(error => console.error('Paging error:', error));
}

// Initial load
handlePageChange(1, 20);
```

### Total Records Count

```ts
const grid = new Grid({
  dataSource: data,
  columns: [...],
  allowPaging: true
});

grid.appendTo('#grid');

function getTotalPages(): number {
  const totalRecords = data.length;
  const pageSize = grid.pageSettings.pageSize || 12;
  return Math.ceil(totalRecords / pageSize);
}

function getPageInfo() {
  return {
    currentPage: grid.pageSettings.currentPage,
    totalPages: getTotalPages(),
    totalRecords: data.length,
    pageSize: grid.pageSettings.pageSize
  };
}

console.log(getPageInfo());
```
